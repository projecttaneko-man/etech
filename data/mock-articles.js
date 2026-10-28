const PER_PAGE = 3;

const base = {
  status: 'published',
  author: { name: 'Tim Etech' },
  meta_title: null,
  meta_description: null,
  meta_keywords: null,
};

const articles = [
  {
    ...base,
    id: 1,
    slug: 'distributor-genset',
    title: 'Cara Memilih Distributor Genset yang Terpercaya',
    excerpt: 'Panduan memilih distributor genset untuk kebutuhan industri.',
    content: '<p>Konten artikel contoh...</p><h2>Subjudul</h2><p>Paragraf lanjutan.</p>',
    thumbnail: '/images/proyek/10.jpg',
    category: { name: 'Genset Industri', slug: 'genset-industri' },
    published_at: '2026-10-01T09:00:00+07:00',
    views_count: 120,
    meta_keywords: 'genset, distributor genset',
  },
  {
    ...base,
    id: 2,
    slug: 'perawatan-genset-berkala',
    title: 'Jadwal Perawatan Genset Berkala',
    excerpt: 'Checklist perawatan agar genset tetap andal.',
    content: '<p>Konten artikel contoh...</p>',
    thumbnail: '/images/proyek/33.jpg',
    category: { name: 'Perawatan', slug: 'perawatan' },
    published_at: '2026-09-20T09:00:00+07:00',
    views_count: 85,
  },
  {
    ...base,
    id: 3,
    slug: 'menghitung-kapasitas-genset',
    title: 'Menghitung Kapasitas Genset untuk Pabrik',
    excerpt: 'Langkah menghitung kebutuhan kVA dengan benar.',
    content: '<p>Konten artikel contoh...</p>',
    thumbnail: '/images/proyek/23.webp',
    category: { name: 'Genset Industri', slug: 'genset-industri' },
    published_at: '2026-09-05T09:00:00+07:00',
    views_count: 64,
  },
  {
    ...base,
    id: 4,
    slug: 'panel-ats-amf',
    title: 'Mengenal Panel ATS dan AMF',
    excerpt: 'Perbedaan ATS dan AMF serta kapan masing-masing dipakai.',
    content: '<p>Konten artikel contoh...</p>',
    thumbnail: '/images/proyek/10.jpg',
    category: { name: 'Kelistrikan', slug: 'kelistrikan' },
    published_at: '2026-08-15T09:00:00+07:00',
    views_count: 40,
  },
];

function list({ page = 1, category, search } = {}) {
  let items = articles;
  if (category) items = items.filter((a) => a.category.slug === category);
  if (search) {
    const q = String(search).toLowerCase();
    items = items.filter(
      (a) => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q)
    );
  }
  const current = Math.max(1, parseInt(page, 10) || 1);
  const total = items.length;
  const last = Math.max(1, Math.ceil(total / PER_PAGE));
  return {
    data: items.slice((current - 1) * PER_PAGE, current * PER_PAGE),
    meta: { current_page: current, last_page: last, per_page: PER_PAGE, total },
  };
}

function find(slug) {
  const article = articles.find((a) => a.slug === slug);
  if (!article) return null;
  const related = articles.filter((a) => a.slug !== slug).slice(0, 3);
  return { article, related };
}

function footer() {
  const cats = {};
  articles.forEach(({ category: c }) => {
    cats[c.slug] = cats[c.slug] || { name: c.name, slug: c.slug, articles_count: 0 };
    cats[c.slug].articles_count++;
  });
  return {
    categories: Object.values(cats),
    latest_articles: articles.slice(0, 6).map(({ slug, title, thumbnail }) => ({ slug, title, thumbnail })),
  };
}

module.exports = { list, find, footer };