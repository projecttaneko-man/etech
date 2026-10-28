const express = require('express');
const crypto = require('crypto');
const cms = require('../services/cms');
const router = express.Router();

// ---------- Helper ----------
const absUrl = (req, u) => {
  if (!u) return undefined;
  if (/^https?:\/\//.test(u)) return u;
  return `${req.protocol}://${req.get('host')}${u.startsWith('/') ? '' : '/'}${u}`;
};

function validPreviewSignature(id, expires, sig) {
  if (!id || !expires || !sig) return false;
  if (Number(expires) < Math.floor(Date.now() / 1000)) return false;

  const expected = crypto
    .createHmac('sha256', process.env.CMS_PREVIEW_TOKEN || '')
    .update(`${id}|${expires}`)
    .digest('hex');

  const a = Buffer.from(expected);
  const b = Buffer.from(String(sig));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function renderArticle(req, res, data, isPreview) {
  const article = data.article;
  const canonical = `${req.protocol}://${req.get('host')}/wawasan/${article.slug}`;

  if (isPreview) res.set('Cache-Control', 'no-store');

  res.render('wawasan/show', {
    title: article.meta_title || article.title,
    metaDescription: article.meta_description || article.excerpt || undefined,
    metaKeywords: article.meta_keywords || undefined,
    ogImage: absUrl(req, article.thumbnail),
    ogType: 'article',
    canonical,
    publicUrl: canonical,
    article,
    related: data.related || [],
    isPreview,
    noindex: isPreview || undefined,
  });
}

// ---------- Daftar: /wawasan?category=...&page=2&search=... ----------
router.get('/', async (req, res) => {
  const { category, search } = req.query;
  const page = Math.max(1, parseInt(req.query.page, 10) || 1);
  const params = { page };
  if (category) params.category = String(category);
  if (search) params.search = String(search);

  let result = {};
  let cmsError = false;
  try {
    result = (await cms.listArticles(params)) || {};
  } catch (e) {
    cmsError = true; // sudah di-log di cms.js
  }

  res.status(cmsError ? 503 : 200).render('wawasan/index', {
    title: 'Wawasan',
    metaDescription: 'Artikel dan wawasan seputar genset dan kelistrikan dari tim Etech.',
    canonical: `${req.protocol}://${req.get('host')}/wawasan`,
    articles: result.data || [],
    meta: result.meta || { current_page: 1, last_page: 1, total: 0 },
    activeCategory: category || null,
    search: search || '',
    cmsError,
  });
});

// ---------- Preview draft: /wawasan/preview/4?expires=...&sig=... ----------
router.get('/preview/:id', async (req, res, next) => {
  try {
    const { expires, sig } = req.query;
    if (!validPreviewSignature(req.params.id, expires, sig)) {
      return res
        .status(403)
        .send('Link preview tidak valid atau sudah kedaluwarsa. Buka lagi dari admin CMS.');
    }

    const data = await cms.getPreview(req.params.id);
    if (!data || !data.article) {
      return res.status(404).render('404', { title: 'Halaman Tidak Ditemukan' });
    }
    renderArticle(req, res, data, true);
  } catch (e) { next(e); }
});

// ---------- Detail: /wawasan/distributor-genset ----------
router.get('/:slug', async (req, res, next) => {
  try {
    const data = await cms.getArticle(req.params.slug);
    if (!data || !data.article) {
      return res.status(404).render('404', { title: 'Halaman Tidak Ditemukan' });
    }
    renderArticle(req, res, data, false);
  } catch (e) { next(e); }
});

module.exports = router;  