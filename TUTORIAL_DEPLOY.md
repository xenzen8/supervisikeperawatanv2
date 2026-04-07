# 📋 Tutorial Deploy Ulang — Sheet Baru untuk Versi 2.0

> Tutorial ini khusus untuk **deploy ulang dengan Spreadsheet baru** karena struktur kolom sudah berubah ke 5 jenis supervisi.

---

## LANGKAH 1: Buat Google Sheets Baru

1. Buka browser → pergi ke [sheets.new](https://sheets.new)
2. Spreadsheet kosong terbuka
3. Klik judul "Untitled spreadsheet" di kiri atas
4. Ketik nama: **`Supervisi Keperawatan v2`**
5. Tekan Enter

---

## LANGKAH 2: Buka Apps Script Editor

1. Di spreadsheet baru tadi, klik menu **Ekstensi** di bar atas
2. Klik **Apps Script**
3. Tab baru terbuka → editor Apps Script

---

## LANGKAH 3: Paste Kode Backend

1. Di editor, Anda lihat kode default:
   ```
   function myFunction() {
   }
   ```
2. **Hapus semua** kode itu → tekan **Ctrl+A** lalu **Delete**
3. Buka file `Code.gs` dari folder project Anda di komputer:
   ```
   c:\Users\aripr\Downloads\aplikasi\Code.gs
   ```
4. **Select All** isinya → **Ctrl+A** lalu **Ctrl+C** (copy)
5. Kembali ke editor Apps Script → **Ctrl+V** (paste)
6. Klik **💾 Save** (atau Ctrl+S)
7. Di kiri atas, klik nama project → ketik: **`Supervisi RS v2`** → tekan Enter

---

## LANGKAH 4: Jalankan Setup Sheet

1. Di toolbar editor, cari dropdown fungsi (biasanya tertulis `myFunction`)
2. Klik dropdown → pilih **`setupSheets`**
3. Klik tombol **▶ Run**

### Pertama kali akan minta izin:

4. Muncul popup **"Authorization required"** → klik **Review permissions**
5. Pilih **akun Google** Anda
6. Muncul halaman peringatan → klik **Advanced** (di kiri bawah)
7. Klik **Go to Supervisi RS v2 (unsafe)**
8. Klik **Allow**
9. Tunggu beberapa detik...
10. Muncul popup: **"Setup selesai! Sheet berhasil dibuat (v2)."**
11. Klik **OK**

### Verifikasi:

12. Buka tab Google Sheets (refresh kalau perlu)
13. Lihat di bawah, harus ada **3 tab sheet**:

| Tab Sheet | Isi |
|-----------|-----|
| `Data_Supervisi` | 18 kolom header biru (termasuk Jenis_Supervisi, Skor_Persiapan, Skor_Pelaksanaan, Skor_Dokumentasi) |
| `Rekap_Bulanan` | 10 kolom header biru |
| `Master_Staf` | 3 kolom header biru + 2 contoh data |

> ⚠️ Jika sheet tidak muncul, coba jalankan `setupSheets` lagi.

---

## LANGKAH 5: Deploy sebagai Web App

1. Kembali ke tab **Apps Script Editor**
2. Klik menu **Deploy** → **New deployment**
3. Klik ikon **⚙️** di sebelah "Select type"
4. Pilih **Web app**
5. Isi seperti ini:

| Setting | Nilai yang diisi |
|---------|-----------------|
| Description | `Supervisi v2.0 - 5 Jenis` |
| Execute as | **Me** |
| Who has access | **Anyone** |

6. Klik **Deploy**
7. Muncul URL → **KLIK TOMBOL COPY** di sebelah URL

```
https://script.google.com/macros/s/AKfycbx.............../exec
```

8. Klik **Done**

> ⚠️ **SIMPAN URL INI!** Anda akan membutuhkannya di langkah berikutnya.

---

## LANGKAH 6: Update URL di config.js

1. Buka file **`config.js`** di VS Code / editor Anda
2. Cari baris 7 (baris `APPS_SCRIPT_URL`):

```javascript
APPS_SCRIPT_URL: 'https://script.google.com/macros/s/XXXX_URL_LAMA_XXXX/exec',
```

3. **Hapus URL lama** di antara tanda kutip
4. **Paste URL baru** yang Anda copy di Langkah 5
5. Hasilnya seperti ini:

```javascript
const CONFIG = {
  APPS_SCRIPT_URL: 'https://script.google.com/macros/s/URL_BARU_ANDA/exec',
  APP_NAME: 'Supervisi Keperawatan Rawat Inap',
  RS_NAME: 'RS [UNAIR RUANG IRNA 5A]',
  VERSION: '2.0.0'
};
```

6. **Simpan** file (Ctrl+S)

---

## LANGKAH 7: Test Kirim Data

### 7A. Buka Formulir

1. Buka file `form.html` di browser (klik 2x atau via Live Server)
2. Harus muncul **5 kartu jenis supervisi**

### 7B. Isi Form Lengkap

3. **Klik** salah satu kartu (misal: "Pemberian Obat Secara Intravena")
4. Klik **Lanjut ke Identitas →**
5. Isi semua field:
   - Nama Supervisor: `Test Supervisor`
   - Tanggal: hari ini
   - Ruangan: pilih salah satu
   - Shift: pilih salah satu
   - Perawat: pilih salah satu
6. Klik **Lanjut ke Instrumen →**
7. **Klik angka 1-4** di setiap item penilaian (isi semua sampai tidak ada yang kosong)
8. Klik **Lanjut ke Catatan →**
9. Isi catatan (opsional) → klik **Lanjut ke Pratinjau →**
10. Periksa data → klik **Simpan & Kirim ke Google Sheets**

### 7C. Cek Hasil

11. Harus muncul: **"Data berhasil dikirim ke Google Sheets"**
12. Buka Google Sheets → klik tab **`Data_Supervisi`**
13. Periksa baris baru muncul dengan data yang benar:
    - Kolom H → nama jenis supervisi
    - Kolom I → skor persiapan
    - Kolom J → skor pelaksanaan
    - Kolom K → skor dokumentasi

**Jika data muncul → BERHASIL! 🎉**

---

## LANGKAH 8: Upload ke GitHub Pages (jika pakai hosting)

Buka PowerShell di folder project, jalankan:

```powershell
cd C:\Users\aripr\Downloads\aplikasi
git add .
git commit -m "Update ke v2.0 - 5 jenis supervisi + sheet baru"
git push
```

Tunggu 1-2 menit → buka URL GitHub Pages Anda → selesai!

---

## ❌ Troubleshooting

### Data tidak masuk ke Sheets
| Cek | Solusi |
|-----|--------|
| URL di config.js | Pastikan URL sudah diganti ke URL **BARU** dari Langkah 5 |
| Who has access | Harus **Anyone**, bukan "Only myself" |
| Cache browser | Buka di **Incognito** (Ctrl+Shift+N) atau hard refresh (Ctrl+Shift+R) |
| Console error | Tekan F12 → tab Console → cek pesan error merah |

### Error "Authorization required" saat Run
1. Klik **Review permissions** → pilih akun → **Advanced** → **Go to... (unsafe)** → **Allow**
2. Coba Run `setupSheets` lagi

### Sheet tidak muncul setelah setupSheets
1. Refresh halaman Google Sheets
2. Jika tetap tidak ada, cek tab **Execution log** di Apps Script → lihat error

### URL lama masih dipakai
1. Pastikan file `config.js` sudah disimpan setelah edit
2. Jika pakai GitHub Pages, pastikan sudah `git push` setelah edit
3. Clear cache browser atau buka di Incognito

---

## ✅ Checklist Final

- [ ] Spreadsheet baru sudah dibuat dan diberi nama
- [ ] Code.gs sudah di-paste ke Apps Script Editor
- [ ] `setupSheets` sudah dijalankan → 3 sheet muncul
- [ ] Deploy sebagai Web App → URL sudah di-copy
- [ ] URL baru sudah di-paste ke `config.js` baris `APPS_SCRIPT_URL`
- [ ] File `config.js` sudah disimpan
- [ ] Test kirim formulir → data muncul di sheet `Data_Supervisi`
- [ ] (Jika pakai GitHub) `git push` sudah dilakukan
