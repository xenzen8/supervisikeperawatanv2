// =====================================================================
// Code.gs — Google Apps Script untuk Aplikasi Supervisi Keperawatan
// =====================================================================
// CARA SETUP:
// 1. Buka Google Sheets baru
// 2. Klik menu: Ekstensi → Apps Script
// 3. Hapus kode default, paste seluruh kode ini
// 4. Klik Deploy → New Deployment → Tipe: Web App
// 5. Execute as: Me | Who has access: Anyone
// 6. Klik Deploy → Salin URL → Tempel ke config.js di APPS_SCRIPT_URL
// =====================================================================

const SHEET_DATA      = 'Data_Supervisi';
const SHEET_REKAP     = 'Rekap_Bulanan';
const SHEET_STAF      = 'Master_Staf';

// Header kolom sheet utama (v2 — dengan Jenis_Supervisi)
const HEADERS = [
  'Timestamp', 'Tanggal_Supervisi', 'Nama_Supervisor', 'Ruangan',
  'Nama_Perawat', 'Jabatan', 'Shift', 'Jenis_Supervisi',
  'Skor_Persiapan', 'Skor_Pelaksanaan', 'Skor_Dokumentasi',
  'Skor_Total', 'Kategori',
  'Catatan', 'Rekomendasi', 'Target_Perbaikan',
  'Detail_Scores', 'Status_Perbaikan'
];

// =====================================================================
// doPost — menerima data dari form.html (via hidden form + iframe fallback)
// =====================================================================
function doPost(e) {
  try {
    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      try {
        if (e.parameter && e.parameter.payload) {
          data = JSON.parse(e.parameter.payload);
        } else {
          data = e.parameter || {};
        }
      } catch (formErr) {
        data = e.parameter || {};
      }
    }

    const result = simpanDataSupervisi(data);

    return HtmlService.createHtmlOutput(
      '<html><body><script>window.parent.postMessage("saved","*");</script>Data tersimpan.</body></html>'
    );

  } catch (err) {
    Logger.log('doPost Error: ' + err.toString());
    return HtmlService.createHtmlOutput(
      '<html><body>Error: ' + err.toString() + '</body></html>'
    );
  }
}

// =====================================================================
// doGet — mengirim data ke rekap.html dan dashboard.html
// =====================================================================
function doGet(e) {
  const action = e?.parameter?.action || 'getData';
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    if (action === 'getData') {
      const sheet = ss.getSheetByName(SHEET_DATA);
      if (!sheet || sheet.getLastRow() <= 1) {
        return jsonResponse({ data: [] });
      }
      const rows = sheet.getDataRange().getValues();
      const headers = rows[0];
      const data = rows.slice(1).map((row, idx) => {
        const obj = {};
        headers.forEach((h, i) => {
          const key = h.toLowerCase().replace(/[^a-z0-9]/g, '_');
          obj[key] = row[i] instanceof Date
            ? row[i].toISOString().split('T')[0]
            : row[i];
        });
        return {
          tanggal: obj.tanggal_supervisi,
          supervisor: obj.nama_supervisor,
          ruangan: obj.ruangan,
          nama_perawat: obj.nama_perawat,
          jabatan: obj.jabatan,
          shift: obj.shift,
          jenis_supervisi: obj.jenis_supervisi || '',
          skor_persiapan: Number(obj.skor_persiapan) || 0,
          skor_pelaksanaan: Number(obj.skor_pelaksanaan) || 0,
          skor_dokumentasi: Number(obj.skor_dokumentasi) || 0,
          skor_total: Number(obj.skor_total) || 0,
          kategori: obj.kategori,
          catatan: obj.catatan,
          rekomendasi: obj.rekomendasi,
          target_perbaikan: obj.target_perbaikan,
          status_perbaikan: obj.status_perbaikan || 'Belum Diperbaiki',
          _row_index: idx + 2
        };
      }).filter(d => d.tanggal);
      return jsonResponse({ data });
    }

    if (action === 'getStats') {
      const sheet = ss.getSheetByName(SHEET_DATA);
      if (!sheet || sheet.getLastRow() <= 1) {
        return jsonResponse({ total: 0, rata: 0 });
      }
      const rows = sheet.getDataRange().getValues().slice(1);
      const now = new Date();
      const bulanIni = rows.filter(r => {
        const t = r[1] instanceof Date ? r[1] : new Date(r[1]);
        return t.getMonth() === now.getMonth() && t.getFullYear() === now.getFullYear();
      });
      const rata = bulanIni.length
        ? Math.round(bulanIni.reduce((a,r) => a + (Number(r[11])||0), 0) / bulanIni.length)
        : 0;
      return jsonResponse({ total: rows.length, bulan: bulanIni.length, rata });
    }

    if (action === 'saveData') {
      const jsonData = e.parameter.data;
      if (!jsonData) {
        return jsonResponse({ status: 'error', message: 'Parameter data kosong.' });
      }
      try {
        const data = JSON.parse(jsonData);
        simpanDataSupervisi(data);
        return jsonResponse({ status: 'ok', message: 'Data berhasil disimpan.' });
      } catch (parseErr) {
        return jsonResponse({ status: 'error', message: 'Gagal parse data: ' + parseErr.toString() });
      }
    }

    if (action === 'updateStatus') {
      const rowIndex = parseInt(e.parameter.row);
      const newStatus = e.parameter.status || 'Selesai';
      if (!rowIndex || rowIndex < 2) {
        return jsonResponse({ status: 'error', message: 'Row index tidak valid.' });
      }
      const sheet = ss.getSheetByName(SHEET_DATA);
      if (!sheet) return jsonResponse({ status: 'error', message: 'Sheet tidak ditemukan.' });

      const sheetHeaders = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
      let statusCol = sheetHeaders.indexOf('Status_Perbaikan') + 1;

      if (statusCol === 0) {
        statusCol = sheet.getLastColumn() + 1;
        sheet.getRange(1, statusCol).setValue('Status_Perbaikan').setFontWeight('bold').setBackground('#185FA5').setFontColor('#ffffff');
      }

      sheet.getRange(rowIndex, statusCol).setValue(newStatus);
      return jsonResponse({ status: 'ok', message: 'Status berhasil diupdate ke: ' + newStatus, row: rowIndex });
    }

    if (action === 'getMasterStaf') {
      const sheet = ss.getSheetByName(SHEET_STAF);
      if (!sheet) return jsonResponse({ staf: [] });
      const rows = sheet.getDataRange().getValues().slice(1);
      const staf = rows.map(r => ({
        nama: r[0], jabatan: r[1], ruangan: r[2]
      })).filter(s => s.nama);
      return jsonResponse({ staf });
    }

    return jsonResponse({ error: 'Action tidak dikenal: ' + action });

  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

// =====================================================================
// Shared: simpan data supervisi ke sheet (v2)
// =====================================================================
function simpanDataSupervisi(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let sheet = ss.getSheetByName(SHEET_DATA);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_DATA);
    sheet.appendRow(HEADERS);
    const hRange = sheet.getRange(1, 1, 1, HEADERS.length);
    hRange.setFontWeight('bold');
    hRange.setBackground('#185FA5');
    hRange.setFontColor('#ffffff');
    sheet.setFrozenRows(1);
  }

  sheet.appendRow([
    new Date(),                              // Timestamp
    data.tanggal || '',                      // Tanggal supervisi
    data.supervisor || '',                   // Nama supervisor
    data.ruangan || '',                      // Ruangan
    data.nama_perawat || '',                 // Nama perawat
    data.jabatan || '',                      // Jabatan
    data.shift || '',                        // Shift
    data.jenis_supervisi || '',              // Jenis supervisi (BARU)
    data.skor_persiapan || 0,               // Skor Persiapan
    data.skor_pelaksanaan || 0,             // Skor Pelaksanaan
    data.skor_dokumentasi || 0,             // Skor Dokumentasi
    data.skor_total || 0,                    // Skor total
    data.kategori || '',                     // Kategori
    data.catatan || '',                      // Catatan
    data.rekomendasi || '',                  // Rekomendasi
    data.target_perbaikan || '',             // Target perbaikan
    data.detail_scores || '',                // JSON detail skor
    data.status_perbaikan || 'Belum Diperbaiki'
  ]);

  updateRekapBulanan(ss);

  return { status: 'ok' };
}

// =====================================================================
// Helper: update rekap bulanan otomatis (v2)
// =====================================================================
function updateRekapBulanan(ss) {
  const dataSheet = ss.getSheetByName(SHEET_DATA);
  if (!dataSheet || dataSheet.getLastRow() <= 1) return;

  let rekapSheet = ss.getSheetByName(SHEET_REKAP);
  if (!rekapSheet) {
    rekapSheet = ss.insertSheet(SHEET_REKAP);
    rekapSheet.appendRow([
      'Bulan', 'Jumlah_Supervisi', 'Rata_Skor_Total',
      'Rata_Persiapan', 'Rata_Pelaksanaan', 'Rata_Dokumentasi',
      'Jml_Sangat_Baik', 'Jml_Baik', 'Jml_Cukup', 'Jml_Kurang'
    ]);
    rekapSheet.getRange(1,1,1,10).setFontWeight('bold').setBackground('#185FA5').setFontColor('#ffffff');
    rekapSheet.setFrozenRows(1);
  }

  const rows = dataSheet.getDataRange().getValues().slice(1);
  const byMonth = {};

  rows.forEach(r => {
    const tgl = r[1] instanceof Date ? r[1] : new Date(r[1]);
    if (isNaN(tgl)) return;
    const key = Utilities.formatDate(tgl, Session.getScriptTimeZone(), 'yyyy-MM');
    if (!byMonth[key]) byMonth[key] = { scores: [], persiapan: [], pelaksanaan: [], dok: [], cats: {} };
    byMonth[key].scores.push(Number(r[11]) || 0);
    byMonth[key].persiapan.push(Number(r[8]) || 0);
    byMonth[key].pelaksanaan.push(Number(r[9]) || 0);
    byMonth[key].dok.push(Number(r[10]) || 0);
    const kat = r[12] || 'Tidak Diketahui';
    byMonth[key].cats[kat] = (byMonth[key].cats[kat] || 0) + 1;
  });

  const avg = arr => arr.length ? Math.round(arr.reduce((a,b)=>a+b,0)/arr.length) : 0;

  if (rekapSheet.getLastRow() > 1) {
    rekapSheet.getRange(2, 1, rekapSheet.getLastRow() - 1, 10).clearContent();
  }

  const sortedMonths = Object.keys(byMonth).sort();
  sortedMonths.forEach((month, i) => {
    const m = byMonth[month];
    rekapSheet.getRange(i + 2, 1, 1, 10).setValues([[
      month,
      m.scores.length,
      avg(m.scores),
      avg(m.persiapan),
      avg(m.pelaksanaan),
      avg(m.dok),
      m.cats['Sangat Baik'] || 0,
      m.cats['Baik'] || 0,
      m.cats['Cukup'] || 0,
      m.cats['Kurang'] || 0
    ]]);
  });
}

// =====================================================================
// Helper: JSON response
// =====================================================================
function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

// =====================================================================
// Setup awal — jalankan sekali untuk membuat semua sheet (v2)
// =====================================================================
function setupSheets() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  let s1 = ss.getSheetByName(SHEET_DATA);
  if (!s1) {
    s1 = ss.insertSheet(SHEET_DATA);
    s1.appendRow(HEADERS);
    s1.getRange(1,1,1,HEADERS.length).setFontWeight('bold').setBackground('#185FA5').setFontColor('#ffffff');
    s1.setFrozenRows(1);
    s1.setColumnWidth(1, 130);
    s1.setColumnWidth(4, 160);
    s1.setColumnWidth(5, 200);
    s1.setColumnWidth(8, 250);
    s1.setColumnWidth(14, 300);
  }

  let s2 = ss.getSheetByName(SHEET_REKAP);
  if (!s2) {
    s2 = ss.insertSheet(SHEET_REKAP);
    s2.appendRow([
      'Bulan', 'Jumlah_Supervisi', 'Rata_Skor_Total',
      'Rata_Persiapan', 'Rata_Pelaksanaan', 'Rata_Dokumentasi',
      'Jml_Sangat_Baik', 'Jml_Baik', 'Jml_Cukup', 'Jml_Kurang'
    ]);
    s2.getRange(1,1,1,10).setFontWeight('bold').setBackground('#185FA5').setFontColor('#ffffff');
    s2.setFrozenRows(1);
  }

  let s3 = ss.getSheetByName(SHEET_STAF);
  if (!s3) {
    s3 = ss.insertSheet(SHEET_STAF);
    s3.appendRow(['Nama_Perawat', 'Jabatan', 'Ruangan']);
    s3.getRange(1,1,1,3).setFontWeight('bold').setBackground('#185FA5').setFontColor('#ffffff');
    s3.setFrozenRows(1);
    const contoh = [
      ['Ns. Siti Rahayu, S.Kep', 'Perawat Pelaksana', 'Ruang Irna 3'],
      ['Ns. Budi Santoso, S.Kep', 'Perawat Pelaksana', 'Ruang Irna 4'],
    ];
    s3.getRange(2, 1, contoh.length, 3).setValues(contoh);
  }

  SpreadsheetApp.getUi().alert('Setup selesai! Sheet berhasil dibuat (v2). Silakan deploy sebagai Web App.');
}
