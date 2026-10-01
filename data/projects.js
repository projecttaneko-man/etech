
const fs = require('fs');
const path = require('path');

const FOLDER_FOTO = path.join(__dirname, '..', 'public', 'images', 'proyek');
const EKSTENSI_FOTO = ['webp', 'jpg', 'jpeg', 'png', 'avif'];

function cariFoto(nomor) {
  for (let i = 0; i < EKSTENSI_FOTO.length; i++) {
    const nama = nomor + '.' + EKSTENSI_FOTO[i];
    if (fs.existsSync(path.join(FOLDER_FOTO, nama))) return '/images/proyek/' + nama;
  }
  return '/images/proyek/' + nomor + '.webp';
}

function P(title, summary, model, type, engine, alternator, controller) {
  return { title, summary, model, type, engine, alternator, controller };
}

const list = [
  P('PT. Nunukan Bara Sukses', '2 Unit Scania 650 kVA – Biofuel B100', 'TNK650S', 'Open Type', 'Scania DC16 072A 02-12', 'Stamford HCI 544F', 'DeepSea DSE7320'),
  P('Surabaya Siaga Bencana by PU Bina Marga, Pemerintah Kota Surabaya', '6 Unit Perkins 1000 kVA', 'TNK1000PI', 'Silent Type', 'Perkins 4008-30TAG2', 'Stamford HCI 634J', 'DeepSea DSE7320'),
  P('Pabrik Rokok Tuton, CV. Pusaka Hidup, Semarang', '1 Unit Deutz 500 kVA', 'TNK500D', 'Silent Type', 'Deutz BF8M 1015C (G3)', 'Stamford HCI 544D', 'DeepSea DSE7320'),
  P('PT. Kawasan Industri Kendal, Jawa Tengah', '1 Unit Cummins 50 kVA + Panel ATS + Trailerized', 'TNK50C', 'Silent Type Trailerized', 'Cummins 4BTA3.9G2', 'Stamford UCI 224D', 'DeepSea DSE7320'),
  P('Bp. Andy, Menteng, Jakarta', '1 Unit Perkins 180 kVA', 'TNK180PI', 'Silent Type', 'Perkins 1106A-70TAG3', 'Stamford UCI 274G', 'DeepSea DSE6020'),
  P('Kampus 3, UIN Walisongo, Semarang, by PT. Adhi Karya (PERSERO)', '1 Unit Cummins 500 kVA', 'TNK500CI', 'Silent Type', 'Cummins QSX15G8', 'Stamford HCI 544D', 'DeepSea DSE7320'),
  P('Terminal LNG Teluk Lamong, by PT. Mega Sentosa Mandiri', '1 Unit Perkins 1000 kVA + Panel ATS', 'TNK1000PI', 'Silent Type', 'Perkins 4008-30TAG2', 'Stamford HCI 634J', 'DeepSea DSE7320'),
  P('Gedung Laboratorium Seni, Institut Seni Indonesia by PT. Cipta Prima Perkasa', '1 Unit Perkins 600 kVA', 'BG600P', 'Open Type', 'Perkins 2806C-E18TAG1A', 'Stamford BOGEN BG 544E', 'ComAp IntelliLite 9'),
  P('CV. Wahana Teknik', '1 Unit Perkins 250 kVA', 'BG250P', 'Silent Type', 'Perkins 1506A-E88TAG3', 'Stamford BOGEN BG 274K', 'ComAp IntelliLite 9'),
  P('Rumah Sakit Islam (RSI) Attin, Purbalingga', '1 Unit Perkins 600 kVA', 'BG600P', 'Open Type', 'Perkins 2806C-E18TAG1A', 'Stamford BOGEN BG 544E', 'ComAp IntelliLite 9'),
  P('Keraton Puro Mangkunegaran by PT. Bhinneka Citra Prima', '1 Unit Perkins 100 kVA', 'TNK100PI', 'Silent Type', 'Perkins 1104C-44TAG2', 'Stamford UCI 274C', 'DeepSea DSE6020'),
  P('PT. Kereta Api Indonesia (KAI)', '1 Unit Scania 250 kVA', 'TNK250S', 'Open Type', 'Scania DC09 72A 02-11', 'Stamford UCD 274K', 'DeepSea DSE7320'),
  P('Residence of His Excellency Ambassador of the Republic of Korea in Indonesia', '1 Unit Perkins 80 kVA + Panel ATS & AMF', 'TNK80P', 'Silent Type', 'Perkins 1104A-44TG2', 'Stamford UCI 224G', 'DeepSea DSE6020'),
  P('UPTD Puskesmas Kec. Cipayung, Depok', '1 Unit Bremen 40 kVA + Panel ATS', 'BR40FW', 'Silent Type', 'BREMEN AF3860', 'BREMEN BR 184J', 'ComAp IntelliNano'),
  P('Gereja Atmodirono, Semarang', '1 Unit Perkins 200 kVA', 'BG200P', 'Silent Type', 'Perkins 1106A-70TAG4', 'Stamford BOGEN BG 274H', 'ComAp IntelliLite 9'),
  P('Gereja Kristus Raja, Makasar', '1 Unit Perkins 135 kVA', 'BG135P', 'Silent Type', 'Perkins 1106A-70TG1', 'Stamford BOGEN BG 274E', 'ComAp IntelliLite 9'),
  P('PT. Barata Indonesia', '1 Unit BREMEN 1250 kVA', 'BR1250FW', '20ft ISO Container', 'BREMEN S12R-PTA-C', 'BREMEN BR 634G', 'DeepSea DSE7320'),
  P('Bp. Suroji & Bp. Adam, Semarang', '1 Unit Bremen 200 kVA', 'BR200FW', 'Silent Type', 'BREMEN AS8900', 'BREMEN BR 274H', 'ComAp IntelliNano'),
  P('PT. Mustika Alam Sejahtera', '1 Unit Bremen 100 kVA', 'BR100FW', 'Silent Type', 'BREMEN AS4300', 'BREMEN BR 274C', 'ComAp IntelliNano'),
  P('PT. Handy Mandiri Steel', '1 Unit Bremen 30 kVA', 'BR30FW', 'Silent Type', 'BREMEN AF2540', 'BREMEN BR 184G', 'ComAp IntelliNano'),
  P('Kantor Kecamatan Genuk, Semarang', '1 Unit Bremen 15 kVA', 'BR15FW', 'Silent Type', 'BREMEN AF2270', 'BREMEN BR 164D', 'ComAp IntelliNano'),
  P('Universitas Airlangga, Surabaya', '1 Unit Perkins 1.000 kVA', 'TNK1000PI', 'Silent Type', 'Perkins 4008-30TAG2', 'Stamford HCI 634J', 'DeepSea DSE7320'),
  P('Pasar Johar, Semarang by PT. Benetic Multimedia', '1 Unit Perkins 1.000 kVA', 'TNK1000PI', 'Silent Type', 'Perkins 4008-30TAG2', 'Stamford HCI 634J', 'DeepSea DSE7320'),
  P('PT. Perusahaan Gas Negara (PERSERO)', '1 Unit Perkins 800 kVA', 'TNK800PI', 'Silent Type', 'Perkins 4006-23TAG3A', 'Stamford HCI 634G', 'DeepSea DSE7320'),
  P('Stadion Manahan, Solo by PT. Adhi Karya (PERSERO)', '1 Unit Perkins 650 kVA', 'TNK650P', 'Silent Type', 'Perkins 2806A-E18TAG2', 'Stamford HCI 544F', 'DeepSea DSE7320'),
  P('Rumah Sakit Wava Husada', '1 Unit Perkins 135 kVA', 'TNK135P', 'Silent Type', 'Perkins 1106A-70TG1', 'Stamford UCI 274E', 'DeepSea DSE6020'),
  P('Wisata Coban Rondo by PT. Yuwana Karya', '1 Unit Perkins 65 kVA', 'TNK65P', 'Silent Type', 'Perkins 1104A-44TG1', 'Stamford UCI 224F', 'DeepSea DSE4520'),
  P('Bp. I Made Suarjaya', '1 Unit Perkins 60 kVA', 'TNK60P', 'Silent Type', 'Perkins 1103A-33TG2', 'Stamford UCI 224E', 'DeepSea DSE4520'),
  P('Wana Wisata Baturaden, Purwokerto by PT. Yuwana Karya', '1 Unit Perkins 45 kVA', 'TNK45P', 'Silent Type', 'Perkins 1103A-33TG1', 'Stamford UCI 224D', 'DeepSea DSE4520'),
  P('Bp. Yanto, Manyaran, Semarang', '1 Unit Perkins 15 kVA', 'TNK15P', 'Silent Type', 'Perkins 403A-15G2', 'Stamford S0L1-P1', 'DeepSea DSE4520'),
  P('Berlian Jasa Terminal Indonesia (BJTI) Port by PT. Energy Putra', '1 Unit Mitsubishi 1000 kVA', 'TNK1000MI', 'Silent Type', 'Mitsubishi S12H-PTA', 'Stamford HCI 634J', 'DeepSea DSE7320'),
  P('City One Hotel, Semarang', '1 Unit Cummins 150 kVA', 'BG150C', 'Silent Type', 'Cummins 6BTAA5.9G12', 'Stamford BOGEN BG 274FS', 'ComAp IntelliLite 9'),
  P('Sekolah Tinggi Pariwisata, Nusa Dua, Bali', '1 Unit Perkins 650 kVA', 'TNK650P', 'Silent Type', 'Perkins 2806A-E18TAG2', 'Stamford HCI 544F', 'DeepSea DSE7320'),
  P('Wahana Teknik, Bandung', '1 Unit Perkins 20 kVA', 'TNK20P', 'Silent Type', 'Perkins 404A-22G1', 'Stamford S0L2-G1', 'DeepSea DSE4520'),
  P('PT. Ungaran Sari Garment, Semarang', '1 Unit Cummins 1000 kVA', 'TNK1000C2', 'Open Type', 'Cummins KTA38G5', 'Stamford HCI 634J', 'DeepSea DSE7320'),
  P('Komisi Pemilihan Umum Daerah (KPUD) Provinsi Jawa Tengah', '1 Unit Cummins 100 kVA', 'TNK100C', 'Silent Type', 'Cummins 6BT5.9G2', 'Stamford BOGEN BG 274C', 'ComAp IntelliLite 9'),
  P('CV. Jaya Permata Nusantara', '1 Unit Cummins 350 kVA', 'TNK350C', 'Open Type', 'Cummins QSG12G1', 'Stamford S4L1D-E4', 'DeepSea DSE7320'),
  P('Bp. Sofyan, Bali', '1 Unit Cummins 350 kVA', 'TNK350C', 'Silent Type', 'Cummins QSG12G1', 'Stamford S4L1D-E4', 'DeepSea DSE7320'),
  P('PT. Indocipta Mitra Sejahtera', '1 Unit Cummins 250 kVA', 'TNK250C', 'Open Type', 'Cummins 6LTAA8.9G2', 'Stamford UCDI 274K', 'DeepSea DSE7320'),
  P('Bp. Canti Firmanu', '1 Unit Cummins 250 kVA', 'TNK250C', 'Silent Type', 'Cummins 6LTAA8.9G2', 'Stamford UCDI 274K', 'DeepSea DSE7320'),
  P('PT. Gawan Mandiri Makmur', '1 Unit Cummins 180 kVA', 'TNK180C', 'Silent Type', 'Cummins 6LTA8.3G2', 'Stamford UCI 274G', 'DeepSea DSE7320'),
  P('PT. Indo Sutech Sejahtera', '1 Unit Cummins 150 kVA', 'TNK150C', 'Silent Type', 'Cummins 6BTAA5.9G12', 'Stamford UCI 274F', 'DeepSea DSE7320'),
  P('Bp. Lalu Sudi, Lombok', '1 Unit Cummins 100 kVA', 'TNK100C', 'Silent Type', 'Cummins 6BT5.9G2', 'Stamford UCI 274C', 'DeepSea DSE7320'),
  P('Bp. Riyadh', '1 Unit Cummins 60 kVA', 'BG60C', 'Silent Type', 'Cummins 4BT A3.9G2', 'Stamford UCI 224E', 'DeepSea DSE7320'),
  P('PT. Lamong Energi Indonesia', '1 Unit Cummins 50 kVA + ATS Panel', 'TNK50C', 'Silent Type', 'Cummins 4BTA3.9G2', 'Stamford UCI 224D', 'DeepSea DSE7320'),
  P('Gereja Alfa Omega, Semarang', '1 Unit Bremen 250 kVA', 'BR250FW', 'Silent Type', 'BREMEN AS8900', 'BREMEN BR 274K', 'ComAp IntelliNano'),
  P('PT. Barata Indonesia (PERSERO)', '1 Unit Bremen 100 kVA', 'BR100FW', 'Open Type', 'BREMEN AS4300', 'BREMEN BR 274C', 'ComAp IntelliNano'),
  P('PT. Anugerah Boga', '1 Unit Bremen 100 kVA', 'BR100FW', 'Silent Type', 'BREMEN AS4300', 'BREMEN BR 274C', 'ComAp IntelliNano'),
  P('Bp. Irsan', '1 Unit Bremen 15 kVA', 'BR15FW', 'Silent Type', 'BREMEN AS2270', 'BREMEN BR 164D', 'ComAp IntelliNano'),
  P('Dinas Pekerjaan Umum (PU) Kota Bandung', '2 Units Perkins 1.000 kVA', 'TNK1000PI', 'Silent Type', 'Perkins 4008-30TAG2', 'Stamford HCI 634J', 'DeepSea DSE7320'),
  P('PT. Barata Indonesia (PERSERO)', '2 Units Perkins 45 kVA', 'TNK45P', 'Open Type', 'Perkins 1103A-33TG1', 'Stamford UCI 224D', 'DeepSea DSE4520'),
  P('PT. Taruma Karya Utama', '1 Unit Perkins 650 kVA', 'TNK650P', 'Silent Type', 'Perkins 2806A-E18TAG2', 'Stamford HCI 544F', 'DeepSea DSE7320'),
  P('PT. Bangun Nusa Raya', '1 Unit Perkins 250 kVA', 'TNK250P', 'Silent Type', 'Perkins 1506A-E88TAG3', 'Stamford UCDI 274K', 'DeepSea DSE7320'),
  P('Bp. Abdulrahman', '1 Unit Perkins 150 kVA', 'TNK150P', 'Silent Type', 'Perkins 1106A-70TAG2', 'Stamford UCI 274F', 'DeepSea DSE6020'),
  P('PT. Mandiri Citra Cipta', '1 Unit Perkins 100 kVA', 'TNK100P', 'Silent Type', 'Perkins 1106A-70TG1', 'Stamford UCI 274E', 'DeepSea DSE6020')
];

const perluDicek = [
  P('PT. Pipit Mutiara Jaya', '1 Unit Perkins 20 kVA', 'TNK15P', 'Silent Type', 'Perkins 403A-15G2', 'Stamford S0L1-P1', 'DeepSea DSE4520'),
  P('PT. Sinar Adi Putratama', '1 Unit Cummins 200 kVA', 'TNK250C', 'Open Type', 'Cummins 6LTAA8.3G2', 'Stamford UCI 274H', 'DeepSea DSE7320'),
  P('PT. Rehobat', '1 Unit Cummins 200 kVA', 'TNK250C', 'Silent Type', 'Cummins 6LTAA8.3G2', 'Stamford UCI 274H', 'DeepSea DSE7320'),
  P('PT. Indo Sutech Sejahtera', '1 Unit Cummins 50 kVA', 'TNK150C', 'Silent Type', 'Cummins 6BTAA5.9G12', 'Stamford UCI 274F', 'DeepSea DSE7320'),
  P('PT. MHE Demag', '5 Units Cummins 80 kVA', 'BG60C', 'Open Type', 'Cummins 4BT A3.9G2', 'Stamford BOGEN BG 224E', 'ComAp IntelliLite 9')
];

const projects = list.map(function (p, i) {
  const nomor = String(i + 1).padStart(2, '0');
  const item = Object.assign({}, p);
  Object.defineProperty(item, 'image', {
    enumerable: true,
    get: function () { return p.image || cariFoto(nomor); }
  });
  return item;
});

function F(awalan, name, location, sector) {
  const p = projects.find(function (x) { return x.title.indexOf(awalan) === 0; });
  const item = Object.assign({}, p, { name: name, location: location, sector: sector + ' · ' + p.summary });
  Object.defineProperty(item, 'image', {
    enumerable: true,
    get: function () { return p.image; }
  });
  return item;
}

const featured = [
  F('Surabaya Siaga Bencana', 'Surabaya Siaga Bencana', 'Surabaya, Jawa Timur', 'Pemerintahan'),
  F('Pabrik Rokok Tuton', 'Pabrik Rokok Tuton', 'Semarang, Jawa Tengah', 'Industri'),
  F('Kampus 3, UIN Walisongo', 'Kampus 3 UIN Walisongo', 'Semarang, Jawa Tengah', 'Pendidikan'),
  F('Terminal LNG Teluk Lamong', 'Terminal LNG Teluk Lamong', 'Surabaya, Jawa Timur', 'Energi & Pelabuhan'),
  F('Stadion Manahan', 'Stadion Manahan', 'Solo, Jawa Tengah', 'Fasilitas Olahraga'),
  F('Pasar Johar', 'Pasar Johar', 'Semarang, Jawa Tengah', 'Komersial'),
  F('Rumah Sakit Islam (RSI) Attin', 'RSI Attin', 'Purbalingga, Jawa Tengah', 'Kesehatan'),
  F('Sekolah Tinggi Pariwisata', 'Sekolah Tinggi Pariwisata', 'Nusa Dua, Bali', 'Pendidikan')
];

module.exports = {
  projects: projects,
  featured: featured,
  perluDicek: perluDicek,
  completed: projects,
  ongoing: [],
  sectors: {}
};

if (require.main === module) {
  let belum = 0;

  projects.forEach(function (p) {
    const ada = fs.existsSync(path.join(__dirname, '..', 'public', p.image));
    if (!ada) belum++;
    console.log((ada ? '[ada]   ' : '[belum] ') + path.basename(p.image) + '   ' + p.title);
  });

  console.log('\nFoto sudah ada: ' + (projects.length - belum) + ' dari ' + projects.length);
  console.log('Folder foto   : public/images/proyek/');
}