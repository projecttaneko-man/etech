const express = require('express');
const router = express.Router();

const products = require('../data/products');
const brands = require('../data/brands');
const projectData = require('../data/projects');

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    metaDescription: 'Etech - Solusi genset dan kelistrikan yang andal untuk kebutuhan industri, korporat, hingga rumah tangga.',
    products: products,
    projects: projectData.featured,
  });
});

router.get('/solusi-bisnis', (req, res) => {
  res.render('solusi-bisnis', {
    title: 'Solusi Bisnis',
    metaDescription: 'Layanan solusi genset dan kelistrikan untuk kebutuhan bisnis dan pemerintahan — konsultasi, pengadaan, instalasi, hingga purna jual.',
  });
});

const PROYEK_PER_HALAMAN = 30;

router.get('/proyek', (req, res) => {
  const semua = projectData.projects;
  const total = semua.length;
  const totalPages = Math.max(1, Math.ceil(total / PROYEK_PER_HALAMAN));
  const diminta = parseInt(req.query.page, 10);
  const page = diminta >= 1 ? Math.min(diminta, totalPages) : 1;
  const mulai = (page - 1) * PROYEK_PER_HALAMAN;

  res.render('proyek', {
    title: page > 1 ? 'Proyek - Halaman ' + page : 'Proyek',
    metaDescription: 'Proyek genset Etech yang sudah dikerjakan untuk industri, pemerintahan, pendidikan, kesehatan, dan komersial.',
    currentPath: '/proyek',
    projects: semua.slice(mulai, mulai + PROYEK_PER_HALAMAN),
    page: page,
    totalPages: totalPages,
    total: total,
    from: total ? mulai + 1 : 0,
    to: Math.min(mulai + PROYEK_PER_HALAMAN, total),
  });
});

router.get('/products', (req, res) => {
  res.render('produk', {
    title: 'Katalog Produk',
    metaDescription: 'Katalog genset dan produk kelistrikan Etech — FDL, BOGEN, BREMEN, TANEKO — untuk berbagai skala kebutuhan operasional.',
    brands: brands,
  });
});

router.get('/products/:key', function (req, res, next) {
  const brand = brands.find(function (b) {
    return b.key === req.params.key.toLowerCase();
  });
  if (!brand) return next();

  const baseUrl = process.env.SITE_URL || (req.protocol + '://' + req.get('host'));

  res.render('produk-brand', {
    brand: brand,
    otherBrands: brands.filter(function (b) { return b.key !== brand.key; }),
    title: 'Genset ' + brand.name + ' | Distributor Genset ' + brand.name + ' - Etech',
    metaDescription: 'Genset ' + brand.name + ' dari Etech, distributor dan supplier genset. ' + brand.tagline + '. Konsultasi gratis via WhatsApp.',
    canonical: baseUrl + '/products/' + brand.key,
    currentPath: '/products',
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'Tentang Etech',
    metaDescription: 'Etech - mitra energi untuk operasional Anda, menyediakan solusi genset dan kelistrikan berkualitas tinggi di seluruh Indonesia.',
  });
});

router.get('/kontak', (req, res) => {
  res.render('kontak', {
    title: 'Kontak',
    metaDescription: 'Hubungi tim Etech untuk konsultasi kebutuhan genset dan kelistrikan Anda — via WhatsApp, email, atau formulir kontak.',
  });
});

module.exports = router;