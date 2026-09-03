# JalurAkses — Navigasi Ramah Disabilitas Berbasis AI (Surabaya)

> **Live 24/7 (full-stack):** https://jalurakses.tixo831.deno.net · **Mirror statis:** https://yhhdgl.csb.app · QR: `qrcode.png` · Karya untuk lomba

Web aplikasi navigasi yang merencanakan **rute aksesibel** bagi penyandang disabilitas di Surabaya dengan AI multi-kriteria, panduan & perintah suara penuh, pelaporan hambatan aksesibilitas berbasis foto + GPS yang **terkirim langsung ke WhatsApp admin**, serta panel admin untuk pengelolaan data.

---

## 1. Fitur Utama

| Area | Fitur |
|---|---|
| **Rute AI** | Dijkstra multi-kriteria: *tercepat / termulus / teraman* → 3 alternatif + rekomendasi skor aksesibilitas 0–100, penjelasan "mengapa rute ini", perbandingan alternatif, panduan belokan |
| **Profil disabilitas** | Tunanetra / Tunarungu / Kursi Roda / Disabilitas Fisik-Lansia — bobot rute, tips, dan jawaban AI menyesuaikan profil |
| **Peta interaktif** | Rute mengikuti jalan nyata (14 POI, 19 segmen, data Overpass), sungai hanya bisa diseberangi di jembatan Kali Mas (auto-deteksi), posisi GPS real-time + re-rute otomatis |
| **Aksesibilitas & suara** | Panduan suara (TTS), **mikrofon selalu aktif untuk Tunanetra** (hands-free, jeda cerdas saat TTS bicara), perintah suara bahasa Indonesia, ikut mode gelap/kontras/animasi sistem, getar, layar tetap menyala, kontras tinggi, teks besar |
| **Laporan warga** | Foto (maks. 3) + titik GPS + kategori + tingkat dampak → **terkirim otomatis ke WhatsApp admin** (`wa.me`) dengan pesan terformat + link Google Maps; juga Email & bagikan native |
| **Akun** | Daftar (nama, email/No. HP, sandi ter-hash, tanggal lahir, jenis pengguna) → **profil aplikasi otomatis menyesuaikan**; masuk akun, Google (opsional), admin |
| **Admin** | Login admin (`admin2026`): dashboard statistik, ubah status, **verifikasi** laporan, hapus, **pengumuman** ke pengguna (banner + notifikasi), kontak tujuan WA/email yang dapat diganti, ekspor **CSV (15 kolom, siap Excel)** / JSON |
| **Pengguna** | "Laporan Saya" + timeline status, **poin kontribusi & level** (Perintis→Duta Aksesibilitas), **notifikasi** (bel + notifikasi perangkat asli), rute tersimpan |
| **AI chat** | Asisten percakapan bahasa Indonesia: cari rute, tips per profil, penjelasan taktil/ramp/regulasi (UU 8/2016, UU 19/2011) |
| **Edukasi** | Materi + tips per profil, tempat ramah disabilitas + filter fasilitas + cari terdekat GPS, kuis |

## 2. Teknologi & Peruntukan Library *(sesuai ketentuan lomba)*

| Teknologi | Versi | Peruntukan |
|---|---|---|
| **Express.js 4** *(framework backend)* | 4.x (npm) | Framework REST API: routing `/api/*`, middleware (JSON body, CORS, `adminOnly`), validasi & error handler terpusat |
| **Vue 3** *(framework UI)* | 3.4.21 (CDN unpkg, global build — tanpa build step) | **Framework utama lapisan tampilan**: mengelola state UI deklarasif & reaktif — navigasi 4 tab (`aria-current`, `.page.active`), dialog **Masuk/Daftar akun**, dialog **Aksesibilitas Perangkat**, dan panel **Asisten AI** (`:class` reaktif via `createApp` + jembatan `jaUI`) |
| **JavaScript murni (ES2020)** | — | Logika domain di luar view: algoritma rute, data, akun, laporan, suara — berkomunikasi dengan Vue melalui `jaUI` (dengan fallback tanpa framework) |
| **Leaflet** | 1.9.4 (CDN unpkg) | Satu-satunya library eksternal UI: **peta interaktif** — menampilkan rute di jalan nyata, marker POI/GPS/laporan, polyline alternatif, popup & tooltip, peta sebaran laporan warga |
| **OpenStreetMap tile** | — | Basemap (peta dasar) untuk Leaflet — data peta gratis & terbuka |
| **Google Identity Services** | (dimuat kondisional) | Login "Pilih akun Google" sungguhan — skrip hanya dimuat bila pemilik web mengisi Client ID (lihat §7) |
| **Algoritma: Dijkstra + skoring multi-kriteria** *(buatan sendiri, bukan library)* | — | Inti "AI": jarak/kecepatan, trotoar, taktil, tangga+ram, penyeberangan berlampu, kemiringan, titik istirahat, lalu lintas; penalti tangga & preferensi per profil disabilitas |
| **Web API bawaan browser** *(bukan library)* | — | SpeechRecognition (perintah suara), SpeechSynthesis (panduan suara), Geolocation (GPS real-time), Notification (notifikasi HP), Web Share (bagikan native), Wake Lock (layar tetap nyala), Vibration (getar), localStorage (data lokal) |

## 3. Backend — JalurAkses API (`server.js`, framework **Express.js**)

Backend REST dibangun dengan **framework Express 4** (routing deklaratif, middleware, body parsing, error handler) — `npm install && npm start`; sekaligus **menyajikan frontend** (satu origin).

| Endpoint | Metode | Peruntukan |
|---|---|---|
| `/` | GET | Menyajikan aplikasi (frontend + backend satu origin) |
| `/api/register` | POST | Daftar akun: validasi nama/kontak/sandi/tanggal lahir/jenis; sandi di-hash **scrypt + salt** |
| `/api/login` | POST | Masuk akun → token (bearer, masa aktif 30 hari) |
| `/api/admin/login` | POST | Masuk admin (kata sandi `ADMIN_PASS`, default `admin2026`) |
| `/api/me` | GET | Profil pemilik token |
| `/api/reports` | GET/POST | Daftar laporan (tanpa foto — ringan) / kirim laporan (foto opsional ≤2,5 MB) |
| `/api/reports/:id/up` | POST | Dukungan warga (+1) |
| `/api/reports/:id` | PATCH/DELETE | Ubah status/verifikasi & hapus — **khusus admin** (token role admin) |
| `/api/reports/:id/photos` | GET | Ambil foto laporan |
| `/api/announcement` | GET/PUT | Pengumuman admin ke semua pengguna (PUT khusus admin) |
| `/api/rating` | POST | Rating kepuasan 1–5 |
| `/api/stats` | GET | Statistik publik (jumlah laporan/status/akun/rating) |

**Keamanan**: scrypt + salt per pengguna, token acak 48-hex dengan kedaluwarsa, pemisahan role user/admin, CORS terbuka (dipakai frontend statis), batas body 2,5 MB. **Storage**: `data.json` (file — mudah diaudit; ganti ke PostgreSQL/MySQL cukup di fungsi `load/save`).

**Arsitektur hybrid sinkron**: frontend otomatis mendeteksi backend (`checkServer`). Online → akun, laporan, pengumuman, rating, aksi admin **tersinkron lintas perangkat** (badge "Server tersambung"). Offline / hosting statis → seluruh fitur tetap berfungsi penuh dengan penyimpanan perangkat (badge "Mode offline"). Admin dapat menyetel **URL Backend** dari Panel Admin tanpa ubah kode.

**Backend live 24/7:** https://jalurakses.tixo831.deno.net (Deno Deploy, auto-deploy dari GitHub `tixo831/jalurakses`). **Menjalankan sendiri**: `npm install && npm start` → buka `http://localhost:3000` (port via `PORT`, sandi admin via `ADMIN_PASS`). Untuk hosting 24/7: unggah `server.js` + `package.json` + `index.html` ke VPS/Render/Railway/Fly.io (tanpa build step).

## 4. Arsitektur Singkat

```
index.html (1 file, ±198 KB)
├─ <style>  — tema (terang/gelap/kontras tinggi), skin premium, aksesibilitas
├─ <body>   — 4 tab: Beranda | Rute AI | Laporan | Edukasi (+ modal, chat AI, notifikasi)
├─ SVG sprite — 59 ikon (tanpa emoji, sesuai permintaan UI)
├─ <script> Vue 3 — createApp(#vapp): state UI (tab, dialog, chat)
└─ <script> /*ENGINE*/
   ├─ DATA: 14 POI + 19 edge (jalan nyata), 40 titik Kali Mas, auto-deteksi jembatan
   ├─ ENGINE: dijkstra → routeStats → routeScore (0–100) → 3 strategi + alt
   ├─ GPS: live node __live, 3 tetangga terdekat, re-rute >60 m
   ├─ FITUR: laporan+foto+GPS, akun+role, admin, notifikasi, WA/email/share, AI chat
   └─ AKSESIBILITAS: TTS, always-on mic (netra), wake lock, getar, tema sistem
```

Penyimpanan: `localStorage` (prefix `ja_`) — `ja_fb` (laporan), `ja_accounts`, `ja_user`, `ja_notif`, `ja_routes`, `ja_contact`, dsb. Semua data milik pengguna berada di perangkatnya (privasi).

## 5. Skema Data Laporan

`{id, uid, nama, email, prof, kat, lok, desc, bobot, status(Baru|Diproses|Selesai), verif, ts, photos[](base64), fotos, up, gps{lat,lng,acc}}` — ekspor CSV 15 kolom (BOM UTF-8, siap Excel/Sheets).

## 6. Akun Demo & Skenario Presentasi (±3 menit)

1. **Buka** link/QR → gerbang suara → "Aktifkan panduan suara".
2. **Daftar** akun jenis **Tunanetra** → mikrofon **selalu aktif** → ucapkan *"rute ke Gubeng"* → rute muncul & **dibacakan**; coba *"buka edukasi"* — sepenuhnya hands-free.
3. Ganti profil **Kursi Roda** → analisis ulang → bandingkan alternatif & skor.
4. **Lapor**: isi formulir + foto + lampirkan GPS → Kirim → **WhatsApp admin (6285760647775) terbuka otomatis** berisi laporan + link Google Maps.
5. **Login admin** (`admin2026`): dashboard, verifikasi laporan, ubah status (notifikasi masuk ke pengguna), kirim pengumuman (banner di Beranda), ekspor CSV.

## 7. Pengujian

Suite otomatis Node.js (mock DOM, 60+ asersi, semuanya lulus): konektivitas 728 pasangan rute × 4 profil, GPS live→POI, render semua panel, role admin/pengguna, akun (hash, validasi, duplikat, sandi salah), pengiriman WA/email/share, always-on mic, **dan lapisan sinkron backend (mode online/offline, merge laporan server, pengumuman)**. Backend diuji end-to-end (register → login → kirim laporan → aksi admin → statistik). Ditambah `node --check` dan pengecek keseimbangan HTML pada setiap rilis.

## 8. Kustomisasi (untuk pemilik web)

- **Nomor WA / email tujuan**: login admin → Panel Admin → *Kontak tujuan admin* (atau ubah `DEF_CONTACT` di kode).
- **Google Login asli**: halaman Masuk → *Pemilik web: aktifkan Google Login* (7 langkah, ±5 menit, gratis).
- **Deploy ulang**: file tunggal `index.html` dapat dihosting di mana saja (GitHub Pages/Netlify) — mode offline otomatis; untuk mode server penuh jalankan `node server.js` (lihat §3).

## 9. Keterbatasan Purwarupa (jujur)

Data jalan & aksesibilitas area demo Surabaya (14 POI); backend live di Deno Deploy (storage Deno KV — persisten); layanan gratis Deno "tidur" saat tanpa trafik ±5–15 menit dan bangun otomatis beberapa detik saat diakses; storage file `data.json` saat self-host Node (ganti PostgreSQL untuk skala penuh); login Google butuh Client ID aktif; always-on mic optimal di Chrome/Android.

---

*Dibuat dengan bangga untuk kota yang lebih ramah bagi semua — Surabaya, 2026.*
