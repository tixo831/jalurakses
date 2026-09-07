# 🚀 Info Deploy — JalurAkses (Peta OSM Nyata)

## ✅ LINK UTAMA TERBARU
**https://l6p56v.csb.app** 🎉 (QR `qrcode.png` menunjuk ke sini)

## 🏆 Versi lomba (v8) — UI premium + Laporan Pengguna + Panel Data
- **UI baru**: header kaca (glassmorphism), navigasi pil, hero gradien, kartu interaktif
- Tab **📋 Laporan** menggantikan "Saran" & "Masukan": form (foto + **titik GPS** + profil),
  **peta sebaran laporan**, dukungan warga **"🙋 Saya alami juga"**, filter status
- **📦 Panel Admin — Terima data pengguna**: Ekspor **CSV (Excel)** / **JSON penuh**,
  kirim ringkasan via **Email/WhatsApp**, skema data terdokumentasi
- Tips perjalanan & tempat ramah pindah ke tab **Edukasi**

## 🔊 Pengingat suara otomatis (v7)
- Saat pertama & kedua kali dibuka, muncul kartu **“Aktifkan fitur aksesibilitas HP Anda”** + **suara otomatis** yang menjelaskan TalkBack/VoiceOver & panduan suara
- Sekali tekan **“🔊 Aktifkan panduan suara”** → rute dibacakan otomatis selamanya
- Tombol Google kini **menjelaskan dengan suara** cara aktivasi satu kalinya

## 📍 Pembaruan lokasi real-time (v6)
- Pilihan **“📍 Lokasi saya sekarang (GPS real-time)”** di asal & tujuan
- Titik biru + lingkaran akurasi GPS di peta, **mengikuti gerakan Anda** (rute otomatis dihitung ulang bila berpindah >60 m)
- Tombol **🎯 Pusatkan ke lokasi saya** & **🔄 Perbarui GPS**
- Perintah suara/katakan: *“rute dari sini ke Gubeng”*
- Titik Stasiun Gubeng dikembalikan ke koordinat asli (pernah digeser saat perbaikan lama)

## 🗺️ Pembaruan peta (v5) — rute kini mengikuti JALAN SUNGGUHAN
- Seluruh 19 koridor rute **ditelusuri dari data OpenStreetMap asli**
  (444 titik lengkungan: belokan, persimpangan, mengikuti trotoar & jalan
  yang benar-benar bisa dilewati pejalan — bukan garis lurus lagi).
- **Sungai Kali Mas digambar dari geometri asli** (Wonokromo → Gubeng →
  Jembatan Merah → Pelabuhan, 40 titik).
- **Deteksi penyeberangan otomatis**: setiap kali rute menyentuh sungai,
  sistem memverifikasi persis titik persilangan & menandai 🌉 jembatan —
  teruji: 10/10 penyeberangan valid, 0 rute menembus sungai tanpa jembatan.
- Jarak & waktu kini dihitung dari panjang jalan nyata.
- AI diperkuat: pengguna kursi roda otomatis dialihkan ke rute bebas tangga
  (teruji: rute 6 km tanpa tangga dipilih vs 1,7 km dengan 4 tangga).

## Link versi sebelumnya (masih hidup)
- https://xzn8c5.csb.app — v4 (peta belum OSM nyata)
- https://3t7tjh.csb.app — v2

## 🔐 Login Google & ⬆️ GitHub — menunggu Anda
1. **Google**: buka web → 🔐 Masuk → ⚙️ (panduan 7 langkah, alamat origin
   bisa disalin langsung). Sekali tempel Client ID → tiap pengguna memilih
   akun Google-nya sendiri.
2. **GitHub**: kirim **username** + **personal access token**
   (github.com → Settings → Developer settings → Personal access tokens →
   Generate, centang `repo`) → saya upload kodenya ke repo Anda + aktifkan
   GitHub Pages (link permanen `username.github.io/namarepo`).

## Akun Surge lama (arsip)
Email `jalurakses.deploy@gmail.com` · Password `JalurAkses#2026!Surabaya`


---
## v9 — Ikon SVG menggantikan semua emoticon (csy2cy)

**Live:** https://csy2cy.csb.app · QR: `qrcode.png`

- Semua emoji UI (nav, header, hero, rute, laporan, edukasi, panel admin, chat AI, toast, tooltip, marker peta) diganti **ikon SVG** via sprite `<symbol id="i-*">` (57 simbol) + helper `IC()` dan `starRow()`.
- Rating bintang kini SVG solid (`.starbar .ico`, `.stars .ico.off`), tombol tutup pakai `i-x`, marker peta laporan/jembatan = SVG inline, ilustrasi hero tanpa emoji.
- Teks chat AI & toast dibersihkan dari emoji; tersisa hanya tipografi netral (panah →, •, ✓ pada CSS marker).
- Validasi: HTML balance OK, `node --check` OK, engine test PASS 12/12 (728 pasangan × 4 profil reachable, `__live`→Gubeng, renderPlaces/renderFeedback, IC/starRow/facBadges).

Riwayat: v8 l6p56v (Laporan+ekspor+skin premium) · v7 s2xmww · v6 fdj85m · v5 xqw4vv.


---
## v10 — Warna ikon + fitur khusus Admin & Pengguna (vz8d3h)

**Live:** https://vz8d3h.csb.app · QR: `qrcode.png`

**A. Warna ikon disesuaikan**
- Ikon judul (h1/h2/h3/summary) otomatis warna brand; ikon kartu hero diberi aksen (rute=teal, laporan=kuning, edukasi=biru, kepuasan=kuning); ikon bintang rating kuning (accent); peringatan merah/cokelat (warn); CSS varian `.ico .ok/.warn/.bad/.acc/.info` — ikut mode gelap & kontras tinggi.

**B. Role & fitur khusus**
- **Login Admin**: halaman Masuk → "Masuk sebagai Admin (petugas kota)" → sandi demo `admin2026` (var `ADMIN_PASS`).
- **Fitur ADMIN**: dashboard statistik (total/Baru/Diproses/Selesai/terverifikasi/rating), ubah status + **Verifikasi** + hapus laporan (kontrol ini HANYA muncul untuk admin), kirim/hapus **pengumuman** (banner di Beranda + notifikasi pengguna), ekspor CSV/JSON/Email/WA.
- **Fitur PENGGUNA**: **Laporan Saya** (timeline status Dikirim→Diproses→Selesai, badge Terverifikasi), **poin kontribusi & level** (Perintis→Kontributor→Duta Muda→Duta Aksesibilitas; +10/laporan, +5 selesai, +2 penilaian) dengan progress bar, **notifikasi** (bel di header, badge belum-dibaca), **Rute tersimpan** (simpan hasil AI, buka ulang 1 ketukan), chip poin di profil.
- Laporan otomatis diberi `uid` perangkat; pengumuman punya status "dilihat" per perangkat.

**Validasi v10:** HTML balance OK · node --check OK · engine test **39/39 PASS** (12 inti + 27 role/notif/poin/annOUNCE/saved) · emoji berwarna tetap 0 di live.

Riwayat: v9 csy2cy (ikon SVG) · v8 l6p56v · v7 s2xmww · v6 fdj85m · v5 xqw4vv.


---
## v11 — Kirim langsung ke WhatsApp admin + koneksi HP (sl86n2)

**Live:** https://sl86n2.csb.app · QR: `qrcode.png`

**A. Laporan langsung ke link WhatsApp admin**
- Setelah "Kirim laporan" → **WhatsApp admin terbuka otomatis** (`wa.me/62…`) dengan pesan terformat: kategori, lokasi, koordinat GPS + link Google Maps, dampak, deskripsi, jumlah foto, pelapor+profil, waktu, status, ID.
- Kartu konfirmasi "Laporan tersimpan — kirim ke admin sekarang": tombol **WhatsApp Admin / Email Admin / Bagikan (WA/SMS/lain)**.
- Tombol **"WA Admin"** di setiap kartu laporan + **"Kirim ke admin"** di Laporan Saya.

**B. Kontak tujuan (Panel Admin, khusus admin)**
- Form nomor WA (validasi awal 6, 9–15 digit) & email; tersimpan `ja_contact`; kosongkan untuk kembali ke contoh (`6281234567890` / `admin@jalurakses.id`).
- Tombol ekspor "Kirim via Email/WA" otomatis mengarah ke kontak ini.

**C. Koneksi aksesibilitas HP (modal Perangkat)**
- **Notifikasi perangkat asli** (Notification API + izin): status laporan & pengumuman admin; `devNotify()` dipanggil dari `pushNotif`.
- **Bagikan native** (Web Share API) + tombol uji; fallback ke WhatsApp bila tidak didukung.
- Sudah ada: ikut mode gelap/kontras/animasi sistem, TTS, perintah suara, getar, wake lock.

**D. Sempurnaan lomba**
- Meta `description`, `theme-color` #0f766e, favicon SVG inline (rumah aksesibel).

**Validasi v11:** HTML balance OK · node --check OK · engine test **35/35 PASS** (9 inti + 14 role + 12 kirim/kontak) · emoji berwarna tetap 0.

Riwayat: v10 vz8d3h (admin+pengguna) · v9 csy2cy (ikon SVG) · v8 l6p56v · v7 s2xmww · v6 fdj85m · v5 xqw4vv.


---
## v12 — Nomor WhatsApp admin asli (zjh4fq)

**Live:** https://zjh4fq.csb.app · QR: `qrcode.png`

- `DEF_CONTACT.wa` = **6285760647775** (nomor asli admin; `d:0` → bukan lagi "contoh", toast peringatan placeholder hilang).
- Semua jalur kirim kini mengarah ke WA asli: auto-open setelah kirim laporan, tombol "WA Admin" (kartu laporan & Laporan Saya), ekspor "Kirim via WhatsApp admin".
- Placeholder form kontak admin ikut menampilkan 6285760647775.

**Validasi:** node --check OK · nomor lama 0 sisa di live · HTTP 200.

Riwayat: v11 sl86n2 (kirim WA+notif HP) · v10 vz8d3h (admin+pengguna) · v9 csy2cy (ikon SVG) · v8 l6p56v.


---
## v13 — Fitur Daftar Akun (8xsr7r)

**Live:** https://8xsr7r.csb.app · QR: `qrcode.png`

**Modal Masuk kini 2 tab: Masuk | Daftar**
- **Daftar**: nama lengkap, email/No. HP (validasi keduanya), kata sandi min. 6 (disimpan ter-hash `hashPw`), tanggal lahir (valid 1900–kini-5 th), jenis pengguna (Tunanetra / Tunarungu / Pengguna Kursi Roda / Disabilitas Fisik Lain-Lansia). Setelah daftar: **auto-login + profil aplikasi otomatis menyesuaikan jenis pengguna** (rute, tips, AI adaptif) + notifikasi sambutan.
- **Masuk**: blok "Masuk dengan akun terdaftar" (email/No. HP + kata sandi, cek hash, profil otomatis aktif kembali). Tetap tersedia: Google, masuk cepat nama, Admin (`admin2026`).
- Duplikat email/HP ditolak; field error ditandai merah; akun tersimpan `ja_accounts` (purwarupa, di perangkat).

**Validasi:** HTML balance OK · node --check OK · engine test **17/17 PASS** (3 inti + 14 akun: hash, validasi, duplikat, sandi salah, auto-profil, waLink ke 6285760647775).

Riwayat: v12 zjh4fq (WA asli) · v11 sl86n2 (kirim WA+notif) · v10 vz8d3h · v9 csy2cy.


---
## v14 — Always-on mic untuk Tunanetra (gntxkd)

**Live:** https://gntxkd.csb.app · QR: `qrcode.png`

- Profil **Tunanetra** (dipilih manual, atau otomatis dari daftar/masuk akun jenis Tunanetra) → **mikrofon selalu aktif**: terus mendengarkan (auto-restart tikap jeda), pengguna cukup bicara tanpa menekan tombol.
- **Jeda cerdas saat TTS membacakan** sesuatu (anti menangkap suara sendiri), lalu menyala otomatis kembali (`micHold`).
- Kontrol suara: **"matikan mikrofon" / "nyalakan mikrofon"**; ketuk tombol mic untuk mematikan sesi selalu-aktif.
- Status jelas: teks di modal Perangkat "Selalu aktif (profil Tunanetra)", tombol mic ber-keterangan, toast & umpan balik suara saat aktif.
- Auto-start saat load & setelah gerbang suara; penanganan izin ditolak/mikrofon tak ada.

**Validasi:** HTML balance OK · node --check OK · engine test **15/15 PASS** (alwaysMic, micHold, perintah suara on/off, applyJenisProfile→netra, 182 rute netra reachable).

Riwayat: v13 8xsr7r (daftar akun) · v12 zjh4fq (WA asli) · v11 sl86n2 · v10 vz8d3h.


---
## v14b — Dokumentasi proyek (README.md)

README.md ditulis ulang sebagai dokumentasi lomba: fitur, **tabel teknologi & peruntukan library** (sesuai ketentuan: Leaflet 1.9.4 → peta interaktif; OSM → basemap; Google Identity Services → login Google kondisional; vanilla JS tanpa framework; Dijkstra multi-kriteria buatan sendiri; Web API bawaan), arsitektur, skema data, akun demo, skenario presentasi 3 menit, pengujian, kustomisasi, keterbatasan. Live tetap https://gntxkd.csb.app.

## v15 — Framework Vue 3 (wajib lomba)

**Live:** https://5pk3z7.csb.app · QR: `qrcode.png` · Framework **Vue 3.4.21** (CDN, tanpa build step): `createApp` memount `#vapp` — mengelola navigasi tab, dialog Masuk/Daftar + Perangkat, panel AI via state reaktif; jembatan `jaUI` + fallback tanpa-Vue. README §2 diperbarui (peruntukan framework terdefinisi, sesuai ketentuan lomba).

**Validasi v15:** HTML balance OK · node --check OK · engine test 15/15 PASS (fallback tanpa Vue) · live terverifikasi berisi Vue 3 + seluruh fitur v13–v14.

Riwayat: v14 gntxkd (always-on mic) · v13 8xsr7r (daftar akun) · v12 zjh4fq · v11 sl86n2 · v10 vz8d3h.

## v16 — BACKEND (server.js) + hybrid sync (vdzflz)

**Live publik:** https://vdzflz.csb.app · **Full-stack (web+API satu origin):** jalankan `node server.js` → port 3000 (preview sandbox aktif sesi ini).

- **Backend REST Node.js murni** (tanpa dependensi): register/login (scrypt+salt, token 30 hari), admin login, CRUD laporan (status/verif/hapus khusus admin), dukungan, pengumuman, rating, statistik, penyaji frontend, CORS, batas 2,5 MB, storage data.json.
- **Frontend hybrid**: badge "Server tersambung / Mode offline"; online → akun+laporan+pengumuman+rating+aksi admin tersinkron lintas perangkat (merge laporan server); offline → localStorage penuh. Admin dapat set **URL Backend** dari Panel Admin.
- Uji: server e2e (register→login→laporan→admin→stats) ✓ · engine 9/9 sync PASS ✓ · total 60+ asersi lulus.

Riwayat: v15 5pk3z7 (Vue 3) · v14 gntxkd · v13 8xsr7r · v12 zjh4fq.

## v17 — Backend framework EXPRESS.JS

`server.js` ditulis ulang dengan **Express 4** (routing, middleware, error handler; endpoint identik v16) + `package.json` dependencies. Uji lokal & preview sandbox: register/login/laporan/admin/stats ✓ semua respons. catatan: csb.app anonim hanya statis (tidak mengeksekusi Node) → untuk 24/7 publik deploy ke host Node (Render/Railway/dsb.).

## v18 — BACKEND 24/7 LIVE (Deno Deploy) — FINAL

- **Full-stack 24/7:** https://jalurakses-api.tixo831.deno.net — Express (framework backend) + Vue 3 (framework frontend), storage Deno KV persisten, auto-deploy dari GitHub tixo831/jalurakses.
- **Mirror statis:** https://yhhdgl.csb.app — badge otomatis "Server tersambung" (API default ke Deno), data lintas perangkat.
- QR → URL full-stack. Deploy via CLI `deno deploy create --runtime-mode dynamic --entrypoint server.js --do-not-use-detected-build-config` (token console baru; catatan: wrapper `deno deploy` punya bug duplikasi argumen — jalankan via `deno run -A jsr:@deno/deploy`).
- Verifikasi live: register ✓ laporan tersimpan ✓ stats ✓ web tersaji ✓ auto-deploy push ✓.

Riwayat singkat: v17 Express · v16 backend+hybrid · v15 Vue 3 · v14 always-mic · v13 daftar akun · v12 WA asli · v11 kirim WA.

## v19 — URL PENDEK (final)

- **Live 24/7 full-stack:** https://jalurakses.tixo831.deno.net (app baru bernama `jalurakses`, dynamic mode, auto-deploy GitHub; DB Deno KV baru & bersih).
- **Backup lama:** https://jalurakses-api.tixo831.deno.net tetap hidup (DB lama berisi data uji).
- Mirror statis csb diperbarui + QR & README kini menunjuk URL pendek.

## v20 — Periksa database dari Panel Admin

- Endpoint baru `/api/admin/data` (khusus admin, token server): seluruh isi DB — akun (tanpa hash), laporan, rating, pengumuman, jumlah token aktif.
- Panel Admin (saat online): tombol **"Periksa database server"** → ringkasan + daftar akun + **Unduh database (JSON)**. Login admin kini juga mengambil token server (pengelolaan lintas perangkat).
- Live terverifikasi: 403 tanpa token ✓, isi DB tampil dengan token admin ✓.

## v21 — Data demo realistis + database persisten (repo GitHub privat)

- **Masalah ditemukan & diperbaiki**: Deno KV di org gratis tak diverifikasi ternyata tidak persisten (data hilang saat instance tidur/redeploy). Storage v3: database disimpan sebagai `data.json` di repo privat **tixo831/jalurakses-data** via GitHub API (token via env `GH_PAT`, tidak di kode; retry konflik sha antar-instance; respons menunggu write selesai).
- **Data demo untuk juri** (seed via API resmi): 6 akun warga (sandu `demo1234`), 12 laporan lokasi nyata Surabaya + GPS, status 6 Baru/4 Diproses/2 Selesai, 6 terverifikasi, dukungan hingga 22, rating 4,3/5 (14x), pengumuman admin aktif. Lihat **DEMO.md** (panduan demo + skenario 4 menit).
- **Uji persistensi**: force-redeploy 2× → data tetap utuh ✓.

## v22 — Sempurnaan final lomba

- **Fix kritis**: 7 handler aksi laporan memaksa id numerik — id laporan server berupa string sehingga dukungan/WA/share/verifikasi/hapus/ubah-status/lightbox TIDAK berfungsi untuk laporan sync server. Semua kini membandingkan `String(z.id)`.
- **Foto laporan demo**: 4 foto realistis (AI-generated, dikompres 36–58 KB) ditanam ke database — thumbnail + lightbox tampil otomatis via **lazy-load** `GET /api/reports/:id/photos` (baru untuk item server ber-foto).
- Live terverifikasi: photos endpoint ✓ frontend ter-deploy ✓ mirror csb diperbarui.

## v23 — PWA + OG preview (maksimalisasi final)

- **PWA**: `/manifest.webmanifest` + `/sw.js` (cache UI, API dilewati) — web bisa **dipasang di layar utama** (Android/iOS) & tetap terbuka offline; register SW otomatis hanya di origin deno.net.
- **OG/Twitter card** + ikon aplikasi (AI-generated 1024 → 512/192/180) — link preview cantik saat dibagikan.
- **Preconnect** unpkg & tile OSM (load lebih cepat).
- Live: manifest 200 ✓ sw.js 200 ✓ OG ✓ ikon raw 200 ✓ API sehat ✓.

## v24 — Chatbot maksimal + fix "jawaban tidak ada"

- **Akar masalah**: alias `halteTP` tidak punya POI → `findPlaces` mengembalikan `undefined` → `aiReply` TypeError → typing hilang tanpa jawaban. FIX: `.filter(Boolean)` + seluruh jalur dibungkus try/catch (fallback aman, bot TIDAK PERNAH diam lagi).
- **NLU maksimal**: fuzzy Levenshtein ≤1 (tahan typo "pahawan/gubng"), intent baru (siapa-kamu, help, ganti profil via chat + auto-mic netra, biaya, privasi, offline, pasang/PWA, GPS, toilet), memori konteks ("ke Monkasel" setelah menyebut tempat), chips 6.
- **Kuis**: reset state `answered` basi saat restore; (v-prior: typo, progres bar, skor persisten).
- **Uji real-browser (Puppeteer/Chrome headless)**: 20 asersi — semua PASS, 0 pageerror: chat crash-query ✓ profil-switch ✓ fuzzy ✓ kuis (penjelasan/jawaban ditandai/tombol) ✓ alur chat penuh ✓.
