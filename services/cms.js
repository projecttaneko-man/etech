const BASE = (process.env.CMS_API_URL || '').replace(/\/$/, '');
const ASSET = (process.env.CMS_ASSET_URL || '').replace(/\/$/, '');
const DEBUG = process.env.CMS_DEBUG === 'true';

function fixThumb(item) {
  if (!item || !item.thumbnail || !ASSET) return item;
  if (/^https?:\/\//.test(item.thumbnail)) return item;
  const p = item.thumbnail.startsWith('/') ? item.thumbnail : '/' + item.thumbnail;
  return { ...item, thumbnail: ASSET + p };
}

async function get(path, headers = {}) {
  if (!BASE) throw new Error('CMS_API_URL belum diset di .env');

  let res;
  try {
    res = await fetch(`${BASE}${path}`, {
      headers: { Accept: 'application/json', ...headers },
      signal: AbortSignal.timeout(30000),
    });
  } catch (err) {
    console.error(`[CMS] Gagal konek ${BASE}${path} ->`, err.cause?.code || err.cause || err.message);
    throw err;
  }

  const text = await res.text();
  if (DEBUG) {
    console.log(`[CMS] ${res.status} ${BASE}${path}`);
    console.log(`[CMS] body: ${text.slice(0, 300)}`);
  }

  if (res.status === 404) {
    console.warn(`[CMS] 404: ${BASE}${path}`);
    return null;
  }
  if (!res.ok) throw new Error(`CMS API ${res.status} on ${path}`);

  try { return JSON.parse(text); }
  catch { throw new Error(`CMS API bukan JSON pada ${path}`); }
}

// Daftar artikel: terima { data, meta } maupun paginator Laravel biasa
function normalizeList(res) {
  if (!res) return { data: [], meta: { current_page: 1, last_page: 1, total: 0 } };
  const data = (Array.isArray(res) ? res : (res.data || res.articles || [])).map(fixThumb);
  const m = res.meta || res;
  return {
    data,
    meta: {
      current_page: m.current_page || 1,
      last_page: m.last_page || 1,
      total: m.total || data.length,
    },
  };
}

// Detail/preview: terima { article, related } maupun { data: {...} } maupun objek artikel langsung
function normalizeOne(res) {
  if (!res) return null;
  const article = res.article || res.data || (res.slug ? res : null);
  if (!article) return null;
  return {
    article: fixThumb(article),
    related: (res.related || []).map(fixThumb),
  };
}

function normalizeFooter(res) {
  if (!res) return null;
  const f = res.data || res;
  return {
    ...f,
    categories: f.categories || [],
    latest_articles: (f.latest_articles || []).map(fixThumb),
  };
}

module.exports = {
  listArticles: async (q = {}) => normalizeList(await get(`/articles?${new URLSearchParams(q)}`)),

  getArticle: async (slug) => normalizeOne(await get(`/articles/${encodeURIComponent(slug)}`)),

  getFooter: async () => {
    try { return normalizeFooter(await get('/footer')); } catch { return null; }
  },

  getPreview: async (id) =>
    normalizeOne(
      await get(`/preview/${encodeURIComponent(id)}`, {
        'X-Preview-Token': process.env.CMS_PREVIEW_TOKEN || '',
      })
    ),
};