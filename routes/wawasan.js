const express = require('express');
const cms = require('../services/cms');
const router = express.Router();

// Daftar: /wawasan?category=genset-industri&page=2&search=...
router.get('/', async (req, res, next) => {
  try {
    const { page = 1, category, search } = req.query;
    const params = { page };
    if (category) params.category = category;
    if (search) params.search = search;

    const result = await cms.listArticles(params);
    res.render('wawasan/index', {
      title: 'Wawasan',
      metaDescription: 'Artikel dan wawasan seputar genset dan kelistrikan dari tim Etech.',
      articles: result.data,
      meta: result.meta,
      activeCategory: category || null,
      search: search || '',
    });
  } catch (e) { next(e); }
});

const crypto = require('crypto');

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

// Preview draft dari admin: /wawasan/preview/4?expires=...&sig=...
router.get('/preview/:id', async (req, res, next) => {
  try {
    const { expires, sig } = req.query;
    if (!validPreviewSignature(req.params.id, expires, sig)) {
      return res.status(403).send('Link preview tidak valid atau sudah kedaluwarsa. Buka lagi dari admin CMS.');
    }

    const data = await cms.getPreview(req.params.id);
    if (!data) {
      return res.status(404).render('404', { title: 'Halaman Tidak Ditemukan' });
    }

    res.render('wawasan/show', {
    title: data.article.meta_title || data.article.title,
    metaDescription: data.article.meta_description || data.article.excerpt || undefined,
    article: data.article,
    related: data.related,
    publicUrl: `${req.protocol}://${req.get('host')}/wawasan/${data.article.slug}`,
    isPreview: true,
    noindex: true,
    });
  } catch (e) { next(e); }
});

// Detail: /wawasan/distributor-genset
router.get('/:slug', async (req, res, next) => {
  try {
    const data = await cms.getArticle(req.params.slug);
    if (!data) {
      return res.status(404).render('404', { title: 'Halaman Tidak Ditemukan' });
    }
    res.render('wawasan/show', {
    title: data.article.meta_title || data.article.title,
    metaDescription: data.article.meta_description || data.article.excerpt || undefined,
    article: data.article,
    related: data.related,
    publicUrl: `${req.protocol}://${req.get('host')}/wawasan/${data.article.slug}`,
    isPreview: false,
    });
  } catch (e) { next(e); }
});

module.exports = router;