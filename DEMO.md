# 🎬 Panduan Demo JalurAkses (untuk Juri)

> **Live:** https://jalurakses.tixo831.deno.net · DB sudah berisi data realistis (6 akun, 12 laporan, rating 4,3/5)

## Akun Demo (semua bernama sandi: `demo1234`)

| Nama | Login | Jenis pengguna |
|---|---|---|
| Budi Santoso | `budi.santoso90@gmail.com` | Tunanetra |
| Siti Rahmawati | `siti.rahmawati88@gmail.com` | Kursi Roda |
| Ahmad Fauzi | `081234567890` | Tunarungu |
| Sri Wahyuni | `sri.wahyuni65@mail.com` | Lansia |
| **Admin** | halaman Masuk → *"Masuk sebagai Admin"* → sandi `admin2026` | — |

## Isi Database Saat Ini

- **12 laporan** di lokasi nyata Surabaya (Basuki Rahmat, Tunjungan, St. Gubeng, Jembatan Merah, Monkasel, Tugu Pahlawan, UNAIR, Mayjend Sungkono…) — lengkap koordinat GPS + link Google Maps
- Status: **6 Baru · 4 Diproses · 2 Selesai** — 6 di antaranya **Terverifikasi** admin
- Dukungan warga hingga 22 dukungan per laporan · Rating kepuasan **4,3/5** (14 penilaian)
- **Pengumuman admin aktif** di Beranda

## Skenario Presentasi (±4 menit)

1. **Beranda** — pengumuman admin tampil; badge **"Server tersambung"** (backend 24/7 Deno Deploy).
2. **Rute AI** — pilih profil *Kursi Roda* → Tugu Pahlawan → Stasiun Gubeng → Analisis: 3 alternatif + skor + "mengapa rute ini" + bacakan suara. Tunjukkan jembatan Kali Mas satu-satunya titik menyeberang.
3. **Suara (Tunanetra)** — ganti profil *Tunanetra* → mikrofon selalu aktif → ucapkan *"rute ke Gubeng"* → rute muncul & dibacakan (hands-free penuh).
4. **Login warga** — masuk sebagai `budi.santoso90@gmail.com` / `demo1234` → profil otomatis Tunanetra.
5. **Lapor** — tab Laporan → isi singkat + **lampirkan GPS** → Kirim → **WhatsApp admin terbuka otomatis** dengan laporan terformat + link Google Maps.
6. **Peta sebaran & daftar** — 12 laporan dari warga lain tampil (data lintas perangkat dari server), filter status, foto, dukungan.
7. **Admin** — keluar → masuk Admin (`admin2026`) → **Dashboard**: statistik server · ubah satu laporan jadi *Diproses* · **Verifikasi** · **Periksa database server** (jumlah akun/laporan/token + **Unduh JSON**) · kirim pengumuman baru → kembali sebagai warga → notifikasi + banner pengumuman tampil.
8. **Teknis (kalau ditanya)** — GitHub `tixo831/jalurakses` (auto-deploy), Express REST + scrypt hash + token, Deno KV, Vue 3, hybrid offline-first, README = dokumentasi lengkap.

## Reset/Uji Ulang

Data hidup di server — juri boleh kirim laporan/uji semua tombol, tidak ada yang rusak. Laporan uji bisa dihapus admin kapan saja dari daftar (tombol hapus).
