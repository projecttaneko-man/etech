const BASE = process.env.CMS_API_URL;

async function get(path, headers = {}) {
  const res = await fetch(`${BASE}${path}`, {
    headers: { Accept: 'application/json', ...headers },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`CMS API ${res.status} on ${path}`);
  return res.json();
}

module.exports = {
  listArticles: (q = {}) => get(`/articles?${new URLSearchParams(q)}`),
  getArticle: (slug) => get(`/articles/${encodeURIComponent(slug)}`),
  getFooter: () => get('/footer'),
  getPreview: (id) =>
    get(`/preview/${encodeURIComponent(id)}`, {
      'X-Preview-Token': process.env.CMS_PREVIEW_TOKEN,
    }),
};