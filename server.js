require('dotenv').config();

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout');

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use('/wawasan', require('./middleware/footer'), require('./routes/wawasan'));
app.use('/', require('./routes'));

app.use((req, res) => {
  res.status(404).render('404', {
    title: 'Halaman Tidak Ditemukan',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Terjadi kesalahan pada server');
});

async function optimasiFotoProyek() {
  let sharp;
  try {
    sharp = require('sharp');
  } catch (e) {
    console.log('[foto] sharp belum terpasang (npm install sharp), optimasi dilewati');
    return;
  }

  const sumber = path.join(__dirname, 'foto-asli');
  const tujuan = path.join(__dirname, 'public', 'images', 'proyek');
  if (!fs.existsSync(sumber)) return;
  fs.mkdirSync(tujuan, { recursive: true });

  const files = fs.readdirSync(sumber).filter((f) => /\.(jpe?g|png)$/i.test(f));

  for (const f of files) {
    const dari = path.join(sumber, f);
    const ke = path.join(tujuan, path.parse(f).name + '.webp');

    if (fs.existsSync(ke) && fs.statSync(ke).mtimeMs >= fs.statSync(dari).mtimeMs) continue;

    try {
      await sharp(dari)
        .rotate()
        .resize(1200, 900, { fit: 'cover', position: 'centre' })
        .webp({ quality: 80 })
        .toFile(ke);
      console.log(`[foto] ${f} -> ${path.basename(ke)}`);
    } catch (err) {
      console.log(`[foto] gagal ${f}: ${err.message}`);
    }
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`ETECH website running at http://localhost:${PORT}`);
  optimasiFotoProyek();
});