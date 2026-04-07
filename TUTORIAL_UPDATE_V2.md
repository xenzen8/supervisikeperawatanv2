# 📋 Tutorial Update Database Google Sheets ke Versi 2.0
## (Instrumen 5 Jenis Supervisi)

---

## ⚠️ PENTING: Baca Dulu Sebelum Mulai

Versi baru mengubah **struktur kolom** di Google Sheets. Data lama **TIDAK kompatibel** dengan versi baru. Anda memiliki 2 pilihan:

| Opsi | Keterangan | Risiko |
|------|-----------|--------|
| **Opsi A** | Buat Spreadsheet baru (disarankan) | Data lama tetap aman di spreadsheet lama |
| **Opsi B** | Hapus sheet lama & buat ulang di spreadsheet yang sama | Data lama hilang |

---

## 🔧 LANGKAH 1: Backup Data Lama (Wajib)

1. Buka Google Sheets yang sudah ada (yang sekarang digunakan)
2. Klik sheet **`Data_Supervisi`** di tab bawah
3. Klik menu **File → Download → Microsoft Excel (.xlsx)**
4. Simpan file backup ini di komputer Anda
5. ✅ Data lama sudah aman

---

## 🆕 LANGKAH 2: Buat Spreadsheet Baru

> Jika Anda memilih **Opsi B** (pakai spreadsheet yang sama), lewati langkah ini dan lanjut ke Langkah 3B.

1. Buka [sheets.google.com](https://sheets.google.com)
2. Klik **➕ Blank** (Spreadsheet kosong)
3. Beri nama: **`Supervisi Keperawatan v2.0`**
4. ✅ Spreadsheet kosong siap

---

## 📝 LANGKAH 3A: Pasang Kode Apps Script (Spreadsheet Baru)

1. Di spreadsheet baru, klik menu **Ekstensi → Apps Script**
2. Halaman editor Apps Script akan terbuka di tab baru
3. **Hapus semua** kode default yang ada (biasanya `function myFunction() {}`)
4. Buka file **`Code.gs`** dari folder aplikasi di komputer Anda
5. **Salin seluruh isi** file `Code.gs` (Ctrl+A lalu Ctrl+C)
6. **Tempel** di editor Apps Script (Ctrl+V)
7. Klik tombol **💾 Simpan** (atau Ctrl+S)
8. Beri nama project: **`Supervisi RS v2`**

### Jalankan Setup Awal:

9. Di menu atas editor, pilih fungsi **`setupSheets`** dari dropdown
10. Klik tombol **▶ Run**
11. Jika muncul popup "Authorization required":
    - Klik **Review permissions**
    - Pilih akun Google Anda
    - Klik **Advanced** → **Go to Supervisi RS v2 (unsafe)**
    - Klik **Allow**
12. Tunggu sampai muncul alert: **"Setup selesai! Sheet berhasil dibuat (v2)"**
13. Klik **OK**

### Verifikasi Sheet:

14. Kembali ke tab Google Sheets (refresh jika perlu)
15. Periksa bahwa ada **3 sheet** di tab bawah:
    - ✅ **`Data_Supervisi`** — dengan 18 kolom header biru
    - ✅ **`Rekap_Bulanan`** — dengan 10 kolom header biru
    - ✅ **`Master_Staf`** — dengan 3 kolom header biru

### Verifikasi Kolom Data_Supervisi (harus urut seperti ini):

| No | Nama Kolom | Keterangan |
|----|-----------|------------|
| 1 | Timestamp | Otomatis waktu input |
| 2 | Tanggal_Supervisi | Tanggal pelaksanaan |
| 3 | Nama_Supervisor | Nama supervisor |
| 4 | Ruangan | Ruang Irna 3/4/5/6 |
| 5 | Nama_Perawat | Nama perawat yang disupervisi |
| 6 | Jabatan | Jabatan perawat |
| 7 | Shift | Pagi/Siang/Malam |
| 8 | **Jenis_Supervisi** | ⭐ BARU — Obat IV/Infus/Kateter/NGT/TTV |
| 9 | **Skor_Persiapan** | ⭐ BARU — Skor aspek persiapan (0-100) |
| 10 | **Skor_Pelaksanaan** | ⭐ BARU — Skor aspek pelaksanaan (0-100) |
| 11 | **Skor_Dokumentasi** | ⭐ BARU — Skor aspek dokumentasi (0-100) |
| 12 | Skor_Total | Skor total tertimbang (0-100) |
| 13 | Kategori | Sangat Baik/Baik/Cukup/Kurang |
| 14 | Catatan | Temuan supervisi |
| 15 | Rekomendasi | Rekomendasi tindak lanjut |
| 16 | Target_Perbaikan | Tanggal target |
| 17 | Detail_Scores | JSON detail per item |
| 18 | Status_Perbaikan | Belum/Dalam Proses/Selesai |

---

## 📝 LANGKAH 3B: Update di Spreadsheet yang Sama (Alternatif)

> Gunakan langkah ini HANYA jika Anda memilih Opsi B (tidak membuat spreadsheet baru)

1. Buka Google Sheets yang sudah ada
2. **Hapus sheet lama:**
   - Klik kanan tab **`Data_Supervisi`** → **Delete** → Konfirmasi **OK**
   - Klik kanan tab **`Rekap_Bulanan`** → **Delete** → Konfirmasi **OK**
   - (Jangan hapus `Master_Staf` jika datanya masih dipakai)
3. Klik menu **Ekstensi → Apps Script**
4. **Hapus semua** kode yang ada di editor
5. Buka file **`Code.gs`** dari folder aplikasi
6. **Salin seluruh isi** dan **tempel** di editor
7. Klik **💾 Simpan**
8. Pilih fungsi **`setupSheets`** → klik **▶ Run**
9. Tunggu alert konfirmasi → klik **OK**
10. Verifikasi 3 sheet muncul dengan kolom yang benar (lihat tabel di atas)

---

## 🚀 LANGKAH 4: Deploy sebagai Web App

### Jika Spreadsheet BARU (perlu deploy baru):

1. Di editor Apps Script, klik **Deploy → New deployment**
2. Klik ikon **⚙️** di sebelah "Select type"
3. Pilih **Web app**
4. Isi:
   - **Description:** `Supervisi RS v2.0 - 5 Jenis Supervisi`
   - **Execute as:** `Me` (akun Google Anda)
   - **Who has access:** `Anyone`
5. Klik **Deploy**
6. **SALIN URL** yang muncul
   - Format: `https://script.google.com/macros/s/XXXXXX.../exec`
   - ⚠️ URL ini BERBEDA dari URL lama!
7. Klik **Done**

### Jika Spreadsheet SAMA (perlu update deployment):

1. Di editor Apps Script, klik **Deploy → Manage deployments**
2. Klik ikon **✏️ Edit** pada deployment yang ada
3. Di bagian **Version**, pilih **New version**
4. Klik **Deploy**
5. URL tetap sama, **tidak perlu** mengubah config.js
6. Klik **Done**

---

## 🔗 LANGKAH 5: Update URL di config.js

> ⚠️ Langkah ini HANYA diperlukan jika Anda membuat Spreadsheet BARU (Langkah 3A)
> Jika menggunakan spreadsheet yang sama (Langkah 3B), lewati langkah ini.

1. Buka file **`config.js`** di editor kode Anda
2. Cari baris:
   ```javascript
   APPS_SCRIPT_URL: 'https://script.google.com/macros/s/..../exec',
   ```
3. Ganti URL tersebut dengan URL baru yang Anda salin di Langkah 4
4. **Simpan** file config.js

---

## ✅ LANGKAH 6: Test & Verifikasi

### Test 1: Buka Formulir
1. Buka file **`form.html`** di browser (atau via live server)
2. Pastikan muncul **5 kartu jenis supervisi**
3. Pilih salah satu (misal: "Pemberian Obat IV")
4. Isi semua data identitas
5. Isi semua item penilaian (klik angka 1-4)
6. Lanjut ke catatan → pratinjau → **Simpan & Kirim**
7. Pastikan muncul pesan **"Data berhasil dikirim ke Google Sheets"**

### Test 2: Cek di Google Sheets
1. Buka Google Sheets
2. Klik tab **`Data_Supervisi`**
3. Pastikan data baru masuk dengan kolom yang benar:
   - Kolom H (Jenis_Supervisi) terisi nama supervisi
   - Kolom I-K (Skor Persiapan/Pelaksanaan/Dokumentasi) terisi angka
4. Cek tab **`Rekap_Bulanan`** — harus sudah terisi otomatis

### Test 3: Cek Rekap & Dashboard
1. Buka **`rekap.html`** — data harus muncul di tabel
2. Buka **`dashboard.html`** — grafik harus tampil

---

## 🔄 LANGKAH 7: Upload ke Hosting (jika menggunakan GitHub Pages)

Jika aplikasi di-host di GitHub Pages:

1. Buka terminal/command prompt
2. Navigasi ke folder aplikasi
3. Jalankan:
   ```
   git add .
   git commit -m "Update instrumen ke 5 jenis supervisi v2.0"
   git push origin main
   ```
4. Tunggu 1-2 menit untuk deploy otomatis
5. Buka URL GitHub Pages Anda untuk verifikasi

---

## ❓ Troubleshooting

### "Data tidak masuk ke Sheets"
- Pastikan URL di `config.js` sudah benar (URL baru jika spreadsheet baru)
- Pastikan deployment Web App status: **Active**
- Pastikan "Who has access" diset ke **Anyone**
- Buka Console browser (F12) → tab Console → cek error merah

### "Error saat Run setupSheets"
- Pastikan Anda sudah mengizinkan permissions (klik Allow)
- Coba jalankan ulang fungsi `setupSheets`

### "Kolom di Sheets tidak sesuai"
- Hapus sheet `Data_Supervisi` (klik kanan tab → Delete)
- Jalankan ulang `setupSheets` di Apps Script editor

### "Data lama hilang"
- Jika sudah backup di Langkah 1, buka file Excel yang didownload
- Data lama tidak bisa diimport ke struktur baru (format berbeda)

---

## 📊 Ringkasan Perbedaan v1 vs v2

| Fitur | v1 (Lama) | v2 (Baru) |
|-------|----------|----------|
| Instrumen | 2 role (Karu/PP), 4 aspek | 5 jenis supervisi, 3 aspek |
| Aspek Penilaian | Askep, SOP, Manajemen, Dokumentasi | Persiapan, Pelaksanaan, Dokumentasi |
| Bobot | Askep 25-30%, SOP 25%, dll | Persiapan 25%, Pelaksanaan 50%, Dokumentasi 25% |
| Kolom Sheets | 18 kolom (tanpa Jenis_Supervisi) | 18 kolom (dengan Jenis_Supervisi) |
| Form Steps | 4 langkah | 5 langkah (+ pilih jenis) |
| Filter | Ruangan, Jabatan, Kategori, Status | + Jenis Supervisi |
| Radar Chart | 4 sumbu | 3 sumbu |
