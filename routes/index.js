const express = require('express');
const router = express.Router();

const products = require('../data/products');
const brands = require('../data/brands');

router.get('/', (req, res) => {
  res.render('home', {
    title: 'Home',
    metaDescription: 'Etech - Solusi genset dan kelistrikan yang andal untuk kebutuhan industri, korporat, hingga rumah tangga.',
    products: products,
  });
});

router.get('/solusi-bisnis', (req, res) => {
  res.render('solusi-bisnis', {
    title: 'Solusi Bisnis',
    metaDescription: 'Layanan solusi genset dan kelistrikan untuk kebutuhan bisnis dan pemerintahan — konsultasi, pengadaan, instalasi, hingga purna jual.',
  });
});

router.get('/products', (req, res) => {
  res.render('produk', {
    title: 'Katalog Produk',
    metaDescription: 'Katalog genset dan produk kelistrikan Etech — FDL, BOGEN, BREMEN, TANEKO — untuk berbagai skala kebutuhan operasional.',
    brands: brands,
  });
});

router.get('/about', (req, res) => {
  res.render('about', {
    title: 'Tentang Etech',
    metaDescription: 'Etech - mitra energi untuk operasional Anda, menyediakan solusi genset dan kelistrikan berkualitas tinggi di seluruh Indonesia.',
  });
});

module.exports = router;

router.get('/kontak', (req, res) => {
  res.render('kontak', {
    title: 'Kontak',
    metaDescription: 'Hubungi tim Etech untuk konsultasi kebutuhan genset dan kelistrikan Anda — via WhatsApp, email, atau formulir kontak.',
  });
});