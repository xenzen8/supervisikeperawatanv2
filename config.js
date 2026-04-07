// =====================================================================
// CONFIG.JS — Konfigurasi utama aplikasi supervisi keperawatan
// Ganti APPS_SCRIPT_URL dengan URL Web App Google Apps Script Anda
// =====================================================================

const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/AKfycbyHJDmHtYvuwXZZi5QIXDSOLovUQjMTDaPtKU7MWayJjYIrZP-q2Ic3DAed-1U2mNQhaw/exec',
  APP_NAME: 'Supervisi Keperawatan Rawat Inap',
  RS_NAME: 'RS [UNAIR RUANG IRNA 5A]',
  VERSION: '2.0.0'
};

// =====================================================================
// DATA MASTER — Daftar ruangan dan staf
// =====================================================================

const MASTER = {
  ruangan: [
    'Ruang Irna 3',
    'Ruang Irna 4',
    'Ruang Irna 5',
    'Ruang Irna 6',
  ],

  staf: [
    { nama: 'Lisa Trimurti C.D., S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 3' },
    { nama: 'Dina Akmarina S., S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 3' },
    { nama: 'Nony Kristianda, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 3' },
    { nama: 'Hansa Nur Halina, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 3' },
    { nama: 'Khemal Maulana, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 4' },
    { nama: 'Norviasita Dwi Hariyani, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 4' },
    { nama: 'Nabilla Syahwa Aryanto, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 4' },
    { nama: 'Dina Akmarina S., S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 4' },
    { nama: 'Lisa Trimurti C.D., S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 4' },
    { nama: 'Nony Kristianda, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 5' },
    { nama: 'Hansa Nur Halina, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 5' },
    { nama: 'Khemal Maulana, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 5' },
    { nama: 'Norviasita Dwi Hariyani, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 5' },
    { nama: 'Nabilla Syahwa Aryanto, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 6' },
    { nama: 'Lisa Trimurti C.D., S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 6' },
    { nama: 'Dina Akmarina S., S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 6' },
    { nama: 'Nony Kristianda, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 6' },
    { nama: 'Hansa Nur Halina, S.Kep', jabatan: 'Perawat Pelaksana', ruangan: 'Ruang Irna 6' },
  ]
};

// =====================================================================
// JENIS SUPERVISI — 5 tipe supervisi tindakan keperawatan
// Setiap tipe memiliki 3 bagian: Persiapan, Pelaksanaan, Dokumentasi
// Setiap bagian memiliki bobot (%) untuk perhitungan skor total
// Section dengan sub-kategori menggunakan property "groups"
// =====================================================================

const JENIS_SUPERVISI = [
  // =================================================================
  // A. SUPERVISI PEMBERIAN OBAT SECARA INTRAVENA
  // =================================================================
  {
    id: 'obat_iv',
    kode: 'A',
    judul: 'Supervisi Pemberian Obat Secara Intravena',
    icon: '💉',
    deskripsi: 'Penilaian pemberian obat melalui akses intravena',
    sections: [
      {
        id: 'obat_iv_persiapan',
        judul: 'Persiapan',
        bobot: 25,
        items: [
          'Cuci tangan 6 langkah sesuai prosedur WHO',
          'Baca dan pahami instruksi/order dokter secara lengkap (nama obat, dosis, rute, waktu, kecepatan)',
          'Lakukan pengecekan 5 Benar (Benar Obat, Pasien, Rute, Dosis dan Waktu)',
          'Periksa kondisi obat: tanggal kadaluarsa, kejernihan larutan, keutuhan kemasan'
        ]
      },
      {
        id: 'obat_iv_pelaksanaan',
        judul: 'Pelaksanaan',
        bobot: 50,
        items: [
          'Gunakan APD yang sesuai: sarung tangan bersih (clean gloves)',
          'Lakukan identifikasi pasien dengan minimal 2 cara: tanyakan nama lengkap dan tanggal lahir',
          'Cocokkan dengan gelang identitas dan MAR',
          'Jelaskan tujuan, prosedur, dan kemungkinan efek samping kepada pasien/keluarga',
          'Posisikan pasien dengan nyaman',
          'Kaji kondisi akses IV yang sudah terpasang',
          'Desinfeksi port injeksi IV line menggunakan alcohol swab, tunggu kering (10\u201315 detik)',
          'Aspirasi sedikit untuk memastikan posisi jarum/kateter di dalam vena (tampak darah)',
          'Masukkan obat perlahan sesuai kecepatan yang dianjurkan'
        ]
      },
      {
        id: 'obat_iv_dokumentasi',
        judul: 'Dokumentasi',
        bobot: 25,
        items: [
          'Dokumentasi nama dan tanggal lahir pasien, nama obat, dosis, rute dan waktu pemberian, kondisi akses IV, respon pasien, nama serta paraf perawat',
          'Observasi pasien selama dan setelah injeksi (tanda reaksi alergi, rasa nyeri/terbakar di area insersi, perubahan tanda-tanda vital)'
        ]
      }
    ]
  },

  // =================================================================
  // B. SUPERVISI PEMASANGAN INFUS
  // =================================================================
  {
    id: 'infus',
    kode: 'B',
    judul: 'Supervisi Pemasangan Infus',
    icon: '🩹',
    deskripsi: 'Penilaian pemasangan akses intravena (IV line)',
    sections: [
      {
        id: 'infus_persiapan',
        judul: 'Persiapan',
        bobot: 25,
        items: [
          'Baca dan verifikasi instruksi dokter dalam rekam medis (nama pasien, jenis cairan, kecepatan, lama pemberian)',
          'Cuci tangan 6 langkah sesuai standar WHO',
          'Kenakan APD yang sesuai (sarung tangan bersih non-steril)',
          'Konfirmasi riwayat alergi pasien terhadap plester, antiseptik, atau latex',
          'IV catheter/abocath sesuai ukuran yang diindikasikan (Dewasa: 18G\u201320G, Lansia: 22G\u201324G, Emergensi: 14G\u201316G)',
          'Infus set steril (makro/mikro drip sesuai indikasi)',
          'Spuit 10 cc dan jarum untuk flush',
          'Cairan infus sesuai instruksi dokter (sudah dicek nama, tanggal kadaluarsa, kejernihan)',
          'Tourniquet',
          'Alcohol swab / povidone iodine',
          'Plester / tegaderm / IV fixation',
          'Perlak / alas',
          'Tiang infus',
          'Safety box (untuk pembuangan jarum)',
          'Sarung tangan bersih',
          'Label untuk identifikasi IV line dan cairan',
          'Rekam medis / Medication Administration Record (MAR)',
          'Lakukan identifikasi pasien dengan 2 cara (tanyakan nama lengkap + tanggal lahir, cocokkan dengan gelang identitas dan MAR)',
          'Jelaskan tujuan dan prosedur pemasangan infus kepada pasien/keluarga dengan bahasa yang mudah dipahami',
          'Dapatkan persetujuan pasien (informed consent verbal/tertulis sesuai kebijakan RS)',
          'Atur posisi pasien: supine atau posisi nyaman dengan lengan dalam posisi ekstensi',
          'Letakkan perlak/alas di bawah lengan pasien',
          'Pilih lokasi insersi yang sesuai'
        ],
        groups: [
          { label: 'Persiapan Perawat', count: 4 },
          { label: 'Persiapan Alat & Bahan', count: 13 },
          { label: 'Persiapan Pasien', count: 6 }
        ]
      },
      {
        id: 'infus_pelaksanaan',
        judul: 'Pelaksanaan',
        bobot: 50,
        items: [
          'Cuci tangan 6 langkah dan kenakan sarung tangan bersih',
          'Pasang infus set dan alirkan, jika sudah lancar matikan',
          'Pasang tourniquet di atas lokasi insersi',
          'Identifikasi vena dengan palpasi dan inspeksi, anjurkan pasien untuk mengepalkan tangan',
          'Desinfeksi area insersi dengan alcohol swab',
          'Buka penutup IV cath, periksa ujung jarum',
          'Masukkan IV cath dengan sudut 10\u201330 derajat',
          'Jika sudah terlihat ada darah yang keluar maka lepaskan tourniquet',
          'Sambungkan dengan infus set',
          'Buka klem infus dan atur kecepatan cairan sesuai advis dokter'
        ]
      },
      {
        id: 'infus_dokumentasi',
        judul: 'Dokumentasi',
        bobot: 25,
        items: [
          'Berikan label pada IV line (tanggal pemasangan, ukuran, dan perawat yang memasang)',
          'Dokumentasikan pemasangan pada RM pasien'
        ]
      }
    ]
  },

  // =================================================================
  // C. SUPERVISI PEMASANGAN KATETER
  // =================================================================
  {
    id: 'kateter',
    kode: 'C',
    judul: 'Supervisi Pemasangan Kateter',
    icon: '🏥',
    deskripsi: 'Penilaian pemasangan kateter urine (foley catheter)',
    sections: [
      {
        id: 'kateter_persiapan',
        judul: 'Persiapan',
        bobot: 25,
        items: [
          'Kateter foley steril sesuai ukuran (Dewasa pria: 14\u201318 Fr, Dewasa wanita: 14\u201316 Fr)',
          'Urine bag dengan saluran anti-refluks',
          'Set perawatan kateter steril (kom, kassa, pinset, duk berlubang)',
          'Aquabidest/NaCl 0,9% untuk mengisi balon (volume sesuai label kateter, umumnya 5\u201310 ml)',
          'Spuit 10 cc steril',
          'Povidone iodine atau NaCl 0,9% untuk desinfeksi',
          'Jelly/lubrikant steril (untuk pria: injeksi ke uretra; untuk wanita: oleskan ke kateter)',
          'Perlak/alas, sarung tangan bersih dan steril, plester/fixation tape',
          'Lampu penerangan/senter (terutama untuk pemasangan pada wanita)',
          'Rekam medis / MAR',
          'Identifikasi pasien dengan 2 cara (nama + tanggal lahir, cocokkan gelang)',
          'Jelaskan tujuan, prosedur, dan kemungkinan ketidaknyamanan; dapatkan persetujuan',
          'Jaga privasi: pasang sketsel/tirai',
          'Posisikan pasien sesuai jenis kelamin (Wanita: supine dorsal recumbent; Pria: supine, kaki lurus)',
          'Letakkan perlak di bawah bokong pasien'
        ],
        groups: [
          { label: 'Persiapan Alat', count: 10 },
          { label: 'Persiapan Pasien', count: 5 }
        ]
      },
      {
        id: 'kateter_pelaksanaan',
        judul: 'Pelaksanaan',
        bobot: 50,
        items: [
          'Cuci tangan 6 langkah, kenakan sarung tangan bersih untuk pembersihan awal',
          'Buka set kateter steril dengan teknik aseptik di atas troli bersih',
          'Lakukan pembersihan genitalia eksternal: wanita (dari atas ke bawah, sekali usap per kassa); pria (dari meatus melingkar ke luar)',
          'Lepas sarung tangan bersih, kenakan sarung tangan STERIL',
          'Pasang duk steril berlubang di atas genitalia',
          'Oleskan jelly steril pada ujung kateter (5\u20137 cm); untuk pria: injeksikan jelly ke uretra dengan spuit khusus',
          'Masukkan kateter perlahan sesuai anatomi (Wanita: 5\u20137 cm; Pria: 15\u201325 cm, hingga urin mengalir)',
          'Setelah urin mengalir, dorong kateter 2\u20133 cm lagi sebelum mengisi balon',
          'Isi balon dengan aquabidest/NaCl 0,9% sesuai volume label (5\u201310 ml)',
          'Tarik kateter perlahan hingga terasa tahanan (balon tertahan di leher kandung kemih)',
          'Sambungkan kateter ke urine bag; gantung urine bag di bawah level kandung kemih',
          'Fiksasi kateter dengan plester ke paha (wanita) atau abdomen bawah (pria)',
          'Rapikan pasien, buang limbah medis sesuai kategori',
          'Lepas sarung tangan, cuci tangan 6 langkah'
        ]
      },
      {
        id: 'kateter_dokumentasi',
        judul: 'Dokumentasi',
        bobot: 25,
        items: [
          'Dokumentasikan tanggal dan jam pemasangan',
          'Dokumentasikan ukuran kateter, jenis dan volume balon yang digunakan untuk mengunci',
          'Dokumentasikan warna, kejernihan, volume urine awal yang keluar',
          'Catat jumlah percobaan insersi'
        ]
      }
    ]
  },

  // =================================================================
  // D. SUPERVISI PEMASANGAN NGT
  // =================================================================
  {
    id: 'ngt',
    kode: 'D',
    judul: 'Supervisi Pemasangan NGT',
    icon: '🔧',
    deskripsi: 'Penilaian pemasangan nasogastric tube (NGT)',
    sections: [
      {
        id: 'ngt_persiapan',
        judul: 'Persiapan',
        bobot: 25,
        items: [
          'Verifikasi instruksi dokter (jenis NGT, tujuan pemasangan)',
          'Cuci tangan 6 langkah WHO',
          'Kenakan APD: sarung tangan bersih, masker',
          'Kaji riwayat alergi dan kondisi anatomi hidung pasien',
          'NGT steril sesuai ukuran (Dewasa: 14\u201318 Fr, Anak: 6\u201312 Fr sesuai usia)',
          'Spuit 20\u201350 cc (untuk konfirmasi dan feeding)',
          'Stetoskop',
          'Jelly/lubrikant steril',
          'Perlak/alas',
          'Plester/fixation tape, gunting',
          'Senter kecil',
          'Piala ginjal / nampan',
          'Sarung tangan bersih, masker',
          'Rekam medis / MAR',
          'Identifikasi pasien dengan 2 cara',
          'Jelaskan prosedur; dapatkan persetujuan',
          'Jaga privasi pasien',
          'Posisi: high Fowler (45\u201390 derajat); pasien tidak sadar: lateral decubitus kanan',
          'Kaji kepatenan kedua lubang hidung; pilih lubang yang lebih paten',
          'Ukur panjang NGT yang akan dimasukkan (NEX measurement)',
          'Tandai panjang tersebut pada NGT dengan plester kecil'
        ],
        groups: [
          { label: 'Persiapan Perawat', count: 4 },
          { label: 'Persiapan Alat', count: 10 },
          { label: 'Persiapan Pasien', count: 7 }
        ]
      },
      {
        id: 'ngt_pelaksanaan',
        judul: 'Pelaksanaan',
        bobot: 50,
        items: [
          'Cuci tangan 6 langkah, kenakan sarung tangan bersih',
          'Oleskan jelly steril pada ujung NGT sepanjang 10\u201315 cm',
          'Instruksikan pasien untuk menengadahkan kepala sedikit ke belakang saat insersi awal',
          'Masukkan NGT melalui naris yang dipilih secara perlahan dengan gerakan maju ke arah posterior (bukan ke atas)',
          'Ketika NGT mencapai nasofaring (\u00b1 15\u201320 cm), instruksikan pasien untuk menundukkan kepala (chin down) dan menelan',
          'Dorong NGT perlahan setiap pasien menelan; gunakan air dan sedotan jika pasien dapat menelan',
          'Dorong NGT hingga tanda ukuran yang telah ditentukan (NEX measurement)',
          'Konfirmasi posisi: injeksi 20\u201330 cc udara via spuit ke NGT sambil auskultasi di epigastrium (suara whoosh)',
          'Setelah posisi dikonfirmasi, fiksasi NGT dengan plester ke hidung dan pipi',
          'Tutup ujung NGT dengan clamp/penutup jika tidak langsung digunakan',
          'Rapikan pasien, buang limbah medis, cuci tangan 6 langkah'
        ]
      },
      {
        id: 'ngt_dokumentasi',
        judul: 'Dokumentasi',
        bobot: 25,
        items: [
          'Dokumentasikan tanggal dan jam pemasangan',
          'Dokumentasikan ukuran dan panjang NGT yang dimasukkan',
          'Dokumentasikan nama dan paraf perawat yang melakukan'
        ]
      }
    ]
  },

  // =================================================================
  // E. SUPERVISI TINDAKAN TTV
  // =================================================================
  {
    id: 'ttv',
    kode: 'E',
    judul: 'Supervisi Tindakan TTV',
    icon: '🩺',
    deskripsi: 'Penilaian pengukuran tanda-tanda vital (TTV)',
    sections: [
      {
        id: 'ttv_persiapan',
        judul: 'Persiapan',
        bobot: 25,
        items: [
          'Cuci tangan 6 langkah WHO sebelum kontak pasien',
          'Siapkan alat ukur yang bersih, terkalibrasi, dan berfungsi baik',
          'Pastikan kondisi lingkungan nyaman dan kondusif untuk pengukuran',
          'Termometer (digital/aksila/timpanik/frontal) \u2014 sudah dibersihkan',
          'Tensimeter (sfigmomanometer) digital atau manual + stetoskop',
          'Jam tangan/stopwatch dengan jarum detik',
          'Pulse oximeter (untuk SpO2 dan nadi)',
          'Formulir grafik TTV / rekam medis',
          'Alat tulis',
          'Tisu/cotton/alcohol swab (untuk membersihkan alat)',
          'Identifikasi pasien dengan 2 cara',
          'Jelaskan tujuan pengukuran kepada pasien'
        ],
        groups: [
          { label: 'Persiapan Perawat', count: 3 },
          { label: 'Persiapan Alat', count: 7 },
          { label: 'Persiapan Pasien', count: 2 }
        ]
      },
      {
        id: 'ttv_pelaksanaan',
        judul: 'Pelaksanaan',
        bobot: 50,
        items: [
          'Posisikan pasien dengan nyaman (duduk/berbaring) minimal 5 menit sebelum pengukuran',
          'Ukur tekanan darah: pasang manset setinggi jantung, palpasi arteri brachialis, catat nilai sistolik dan diastolik',
          'Hitung frekuensi nadi: palpasi arteri radialis selama 60 detik, catat frekuensi, irama, dan kualitas nadi',
          'Hitung frekuensi pernapasan: observasi gerakan dada selama 60 detik tanpa memberitahu pasien',
          'Ukur suhu tubuh sesuai lokasi dan jenis termometer, tunggu hingga bunyi/waktu pengukuran selesai',
          'Ukur saturasi oksigen (SpO2): pasang pulse oximeter di jari pasien, tunggu pembacaan stabil',
          'Bandingkan hasil pengukuran dengan nilai normal dan data pengukuran sebelumnya'
        ]
      },
      {
        id: 'ttv_dokumentasi',
        judul: 'Dokumentasi',
        bobot: 25,
        items: [
          'Catat semua hasil pengukuran TTV pada formulir grafik / rekam medis (TD, Nadi, RR, Suhu, SpO2)',
          'Laporkan temuan abnormal kepada DPJP / dokter jaga secara tepat waktu',
          'Dokumentasikan nama dan paraf perawat yang melakukan pengukuran'
        ]
      }
    ]
  }
];

// =====================================================================
// HELPERS
// =====================================================================

function getKategori(skor) {
  if (skor >= 86) return { label: 'Sangat Baik', cls: 'badge-success' };
  if (skor >= 71) return { label: 'Baik', cls: 'badge-info' };
  if (skor >= 56) return { label: 'Cukup', cls: 'badge-warning' };
  return { label: 'Kurang', cls: 'badge-danger' };
}

function formatTanggal(str) {
  if (!str) return '-';
  const d = new Date(str);
  return d.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
}

function hitungSkorAspek(scores) {
  const valid = scores.filter(s => s > 0);
  if (!valid.length) return 0;
  return Math.round((valid.reduce((a, b) => a + b, 0) / (valid.length * 4)) * 100);
}

function hitungSkorTotal(skor_per_aspek, bobot_list) {
  let total = 0, totalBobot = 0;
  skor_per_aspek.forEach((s, i) => {
    total += s * bobot_list[i];
    totalBobot += bobot_list[i];
  });
  return Math.round(total / totalBobot);
}

// Simpan & ambil riwayat lokal (fallback jika offline)
function simpanLokal(data) {
  const existing = JSON.parse(localStorage.getItem('supervisi_data') || '[]');
  existing.unshift(data);
  localStorage.setItem('supervisi_data', JSON.stringify(existing.slice(0, 200)));
}

function ambilLokal() {
  return JSON.parse(localStorage.getItem('supervisi_data') || '[]');
}
