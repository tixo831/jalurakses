/* ============================================================
   JalurAkses API — Backend REST dengan FRAMEWORK EXPRESS.JS
   Peruntukan & daftar endpoint: lihat README.md §3 "Backend"
   Framework: Express 4 (routing, middleware, body parsing)
   Keamanan: scrypt hash + salt, bearer token 30 hari, role admin
   Storage: data.json (file) — mudah diganti ke database
   ============================================================ */
const express = require('express');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, 'data.json');
const ADMIN_PASS = process.env.ADMIN_PASS || 'admin2026';

/* ---- middleware ---- */
app.use(express.json({ limit: '2.5mb' }));
/* pastikan semua tulisan KV selesai sebelum respons terkirim (data persisten) */
app.use((req, res, next) => {
  const oj = res.json.bind(res);
  res.json = (x) => (kv ? saveChain.then(() => oj(x)).catch(() => oj(x)) : oj(x));
  next();
});
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

/* ---- penyimpanan: repo GitHub privat (persisten & terversi) / data.json lokal / Deno KV ---- */
const IS_DENO = (typeof Deno !== 'undefined');
const GH_PAT = (typeof process !== 'undefined' && process.env && process.env.GH_PAT) || (IS_DENO ? Deno.env.get('GH_PAT') : '') || '';
const GH_API = 'https://api.github.com/repos/tixo831/jalurakses-data/contents/data.json';
let kv = null, db = { users: [], reports: [], tokens: {}, ratings: [], announce: null }, dataSha = null;
function blank(){ return { users: [], reports: [], tokens: {}, ratings: [], announce: null }; }
function b64(s){ const b=new TextEncoder().encode(s); let t=''; b.forEach(x=>t+=String.fromCharCode(x)); return btoa(t); }
function unb64(s){ const t=atob(s.replace(/\s|\n/g,'')); const b=Uint8Array.from(t,c=>c.charCodeAt(0)); return new TextDecoder().decode(b); }
async function ghRead(){
  const r=await fetch(GH_API,{headers:{Authorization:'Bearer '+GH_PAT,Accept:'application/vnd.github+json','User-Agent':'jalurakses'}});
  if(r.status===404)return null;
  if(!r.ok)throw new Error('ghRead '+r.status);
  const j=await r.json();dataSha=j.sha;
  return JSON.parse(unb64(j.content));
}
async function ghPut(obj,sha){
  const body=JSON.stringify({message:'data: '+new Date().toISOString(),content:b64(JSON.stringify(obj)),sha:sha||undefined});
  const r=await fetch(GH_API,{method:'PUT',headers:{Authorization:'Bearer '+GH_PAT,Accept:'application/vnd.github+json','Content-Type':'application/json','User-Agent':'jalurakses'},body});
  if(!r.ok)throw new Error('ghWrite '+r.status+' '+(await r.text()).slice(0,120));
  const j=await r.json();dataSha=j.content.sha;
}
async function ghWrite(obj){
  try{ await ghPut(obj,dataSha); }
  catch(e){ /* konflik sha antar-instance: baca ulang lalu coba sekali lagi */
    try{ await ghRead(); await ghPut(obj,dataSha); }catch(e2){ throw e2; }
  }
}
async function loadDb(){
  if(GH_PAT){try{const d=await ghRead();if(d)db=Object.assign(blank(),d);console.log('DB: GitHub (sha '+dataSha+')');}catch(e){console.log('DB: GitHub baca gagal — mulai kosong:',e.message);}}
  else if(!IS_DENO){try{db=Object.assign(blank(),JSON.parse(fs.readFileSync(DATA_FILE,'utf8')));}catch(e){}console.log('DB: data.json lokal');}
  else{try{kv=await Deno.openKv();const r=await kv.get(['db']);if(r.value)db=Object.assign(blank(),r.value);console.log('DB: Deno KV');}catch(e){kv=null;console.log('DB: memori (sementara)');}}
}
let saveChain=Promise.resolve();
function save(){
  if(GH_PAT){saveChain=saveChain.then(()=>ghWrite(db)).catch(e=>console.error('simpan gagal:',e.message));return saveChain;}
  if(kv){saveChain=saveChain.then(()=>kv.set(['db'],db)).catch(()=>{});return saveChain;}
  try{fs.writeFileSync(DATA_FILE,JSON.stringify(db));}catch(e){}
  return Promise.resolve();
}

/* ---- util akun ---- */
function hashPw(pw, salt){ return crypto.scryptSync(String(pw), salt, 32).toString('hex'); }
function newUid(){ return 'u' + Date.now().toString(36) + crypto.randomBytes(4).toString('hex'); }
function mkToken(u){
  const t = crypto.randomBytes(24).toString('hex');
  db.tokens[t] = { uid: u.uid, role: u.role || 'user', exp: Date.now() + 30 * 864e5 };
  save(); return t;
}
function authTok(req){
  const t = (req.headers.authorization || '').replace(/^Bearer /i, '');
  const k = db.tokens[t];
  return (k && k.exp > Date.now()) ? k : null;
}
function adminOnly(req, res, next){
  const k = authTok(req);
  if (!k || k.role !== 'admin') return res.status(403).json({ ok: false, error: 'Khusus admin' });
  next();
}
function pubUser(u){ return { uid: u.uid, nama: u.nama, kontak: u.kontak, jenis: u.jenis, role: u.role || 'user', created: u.created }; }
function findUser(kontak){ const k = String(kontak || '').trim().toLowerCase(); return db.users.find(u => String(u.kontak).toLowerCase() === k); }
function validKontak(k){
  k = String(k || '').trim();
  return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(k) || /^0?[0-9]{8,15}$/.test(k.replace(/[\s-]/g, '').replace(/^\+62/, '0').replace(/^62/, '0'));
}
function slimReport(r){ const c = Object.assign({}, r); delete c.photos; return c; }

/* ---- beranda: sajikan aplikasi penuh (frontend + backend satu origin) ---- */
app.get('/', (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(fs.readFileSync(path.join(__dirname, 'index.html')));
  } catch (e) {
    res.json({ name: 'JalurAkses API (Express)', status: 'ok', versi: '2.0', catatan: 'index.html tidak ditemukan — API tetap berjalan' });
  }
});
app.get('/api', (req, res) => res.json({
  name: 'JalurAkses API (Express)', status: 'ok', versi: '2.0',
  endpoints: ['/api/stats', '/api/register', '/api/login', '/api/admin/login', '/api/me', '/api/reports', '/api/reports/:id/up', '/api/reports/:id/photos', '/api/announcement', '/api/rating']
}));

/* ---- statistik (publik) ---- */
app.get('/api/stats', (req, res) => {
  const by = { Baru: 0, Diproses: 0, Selesai: 0 };
  db.reports.forEach(r => { if (by[r.status] !== undefined) by[r.status]++; });
  const avg = db.ratings.length ? +(db.ratings.reduce((a, b) => a + b, 0) / db.ratings.length).toFixed(1) : null;
  res.json({ ok: true, reports: db.reports.length, byStatus: by, verified: db.reports.filter(r => r.verif).length, users: db.users.length, ratings: db.ratings.length, ratingAvg: avg });
});

/* ---- registrasi ---- */
app.post('/api/register', (req, res) => {
  const b = req.body || {};
  const nama = String(b.nama || '').trim(), kontak = String(b.kontak || '').trim(), pass = String(b.pass || ''), tgl = String(b.tgl || ''), jenis = String(b.jenis || '');
  if (nama.length < 3) return res.status(400).json({ ok: false, error: 'Nama minimal 3 huruf' });
  if (!validKontak(kontak)) return res.status(400).json({ ok: false, error: 'Email/No. HP tidak valid' });
  if (findUser(kontak)) return res.status(409).json({ ok: false, error: 'Email/No. HP sudah terdaftar' });
  if (pass.length < 6) return res.status(400).json({ ok: false, error: 'Kata sandi minimal 6 karakter' });
  const y = +tgl.slice(0, 4); if (!tgl || y < 1900 || y > new Date().getFullYear() - 5) return res.status(400).json({ ok: false, error: 'Tanggal lahir tidak valid' });
  if (!['netra', 'rungu', 'roda', 'lansia'].includes(jenis)) return res.status(400).json({ ok: false, error: 'Jenis pengguna tidak valid' });
  const salt = crypto.randomBytes(12).toString('hex');
  const u = { uid: newUid(), nama, kontak, salt, pass: hashPw(pass, salt), tgl, jenis, role: 'user', created: Date.now() };
  db.users.push(u); save();
  res.status(201).json({ ok: true, token: mkToken(u), user: pubUser(u) });
});

/* ---- login ---- */
app.post('/api/login', (req, res) => {
  const b = req.body || {};
  const u = findUser(b.kontak);
  if (!u || hashPw(String(b.pass || ''), u.salt) !== u.pass) return res.status(401).json({ ok: false, error: 'Kontak atau kata sandi salah' });
  res.json({ ok: true, token: mkToken(u), user: pubUser(u) });
});

/* ---- login admin ---- */
app.post('/api/admin/login', (req, res) => {
  const b = req.body || {};
  if (String(b.pass || '') !== ADMIN_PASS) return res.status(401).json({ ok: false, error: 'Kata sandi admin salah' });
  const a = { uid: 'admin', role: 'admin' };
  res.json({ ok: true, token: mkToken(a), user: a });
});

/* ---- profil saya ---- */
app.get('/api/me', (req, res) => {
  const k = authTok(req); if (!k) return res.status(401).json({ ok: false, error: 'Token tidak valid' });
  if (k.role === 'admin') return res.json({ ok: true, user: { uid: 'admin', role: 'admin', nama: 'Admin JalurAkses' } });
  const u = db.users.find(x => x.uid === k.uid);
  return u ? res.json({ ok: true, user: pubUser(u) }) : res.status(401).json({ ok: false, error: 'Token tidak valid' });
});

/* ---- laporan ---- */
app.get('/api/reports', (req, res) => res.json({ ok: true, list: db.reports.map(slimReport) }));

app.post('/api/reports', (req, res) => {
  const b = req.body || {};
  const k = authTok(req);
  const r = {
    id: 's' + Date.now().toString(36) + crypto.randomBytes(3).toString('hex'),
    uid: (k && k.role !== 'admin' && db.users.find(x => x.uid === k.uid)) ? k.uid : (b.uid || newUid()),
    nama: String(b.nama || 'Anonim').slice(0, 80),
    email: String(b.email || '').slice(0, 120),
    prof: String(b.prof || '').slice(0, 60),
    kat: String(b.kat || 'Lainnya').slice(0, 60),
    lok: String(b.lok || '').slice(0, 160),
    desc: String(b.desc || '').slice(0, 2000),
    bobot: ['Ringan', 'Sedang', 'Berat'].includes(b.bobot) ? b.bobot : 'Sedang',
    gps: (b.gps && typeof b.gps.lat === 'number' && typeof b.gps.lng === 'number') ? { lat: +b.gps.lat.toFixed(6), lng: +b.gps.lng.toFixed(6), acc: Math.round(+b.gps.acc || 0) } : null,
    fotos: Math.max(0, Math.min(3, +b.fotos || 0)),
    photos: Array.isArray(b.photos) ? b.photos.slice(0, 3) : [],
    status: 'Baru', verif: false, up: 0, ts: Date.now()
  };
  db.reports.unshift(r); db.reports = db.reports.slice(0, 2000); save();
  res.status(201).json({ ok: true, report: slimReport(r) });
});

app.get('/api/reports/:id/photos', (req, res) => {
  const r = db.reports.find(x => x.id === req.params.id);
  return r ? res.json({ ok: true, photos: r.photos || [] }) : res.status(404).json({ ok: false, error: 'Laporan tidak ditemukan' });
});

app.post('/api/reports/:id/up', (req, res) => {
  const r = db.reports.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ ok: false, error: 'Laporan tidak ditemukan' });
  r.up = (r.up || 0) + 1; save();
  res.json({ ok: true, up: r.up });
});

app.patch('/api/reports/:id', adminOnly, (req, res) => {
  const r = db.reports.find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ ok: false, error: 'Laporan tidak ditemukan' });
  const b = req.body || {};
  if (['Baru', 'Diproses', 'Selesai'].includes(b.status)) r.status = b.status;
  if (typeof b.verif === 'boolean') r.verif = b.verif;
  save(); res.json({ ok: true, report: slimReport(r) });
});

app.delete('/api/reports/:id', adminOnly, (req, res) => {
  db.reports = db.reports.filter(x => x.id !== req.params.id); save();
  res.json({ ok: true });
});

/* ---- pengumuman ---- */
app.get('/api/announcement', (req, res) => res.json({ ok: true, announce: db.announce }));
app.put('/api/announcement', adminOnly, (req, res) => {
  const txt = String((req.body || {}).txt || '').trim().slice(0, 500);
  db.announce = txt ? { ts: Date.now(), txt } : null; save();
  res.json({ ok: true, announce: db.announce });
});

/* ---- admin: periksa seluruh database ---- */
app.get('/api/admin/data', adminOnly, (req, res) => {
  res.json({ ok: true, data: {
    users: db.users.map(u => ({ uid: u.uid, nama: u.nama, kontak: u.kontak, jenis: u.jenis, tgl: u.tgl, created: u.created })),
    reports: db.reports.map(slimReport),
    ratings: db.ratings,
    announce: db.announce,
    tokensAktif: Object.keys(db.tokens).length
  } });
});

/* ---- rating ---- */
app.post('/api/rating', (req, res) => {
  const v = Math.round(+(req.body || {}).v);
  if (!(v >= 1 && v <= 5)) return res.status(400).json({ ok: false, error: 'Nilai 1–5' });
  db.ratings.push(v); db.ratings = db.ratings.slice(-5000); save();
  res.status(201).json({ ok: true });
});

/* ---- PWA: manifest & service worker ---- */
const ABS='https://raw.githubusercontent.com/tixo831/jalurakses/main';
app.get('/manifest.webmanifest', (req, res) => {
  res.setHeader('Content-Type', 'application/manifest+json; charset=utf-8');
  res.json({
    name: 'JalurAkses — Navigasi Ramah Disabilitas',
    short_name: 'JalurAkses',
    start_url: '/', display: 'standalone',
    background_color: '#0f766e', theme_color: '#0f766e',
    description: 'Rute aksesibel AI, panduan suara, laporan warga — Surabaya ramah bagi semua.',
    icons: [
      { src: ABS + '/docs/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: ABS + '/docs/icon-512.png', sizes: '512x512', type: 'image/png' }
    ]
  });
});
app.get('/sw.js', (req, res) => {
  res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
  res.send("const C='jalurakses-v1';\n" +
    "self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(['/'])).then(()=>self.skipWaiting()))});\n" +
    "self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});\n" +
    "self.addEventListener('fetch',e=>{const u=new URL(e.request.url);\n" +
    " if(e.request.method!=='GET'||u.pathname.indexOf('/api')===0)return;\n" +
    " e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(res=>{const cl=res.clone();caches.open(C).then(c=>c.put(e.request,cl));return res}).catch(()=>caches.match('/'))));\n" +
    "});\n");
});

/* ---- 404 & error handler (middleware Express) ---- */
app.use((req, res) => res.status(404).json({ ok: false, error: 'Endpoint tidak ditemukan: ' + req.path }));
app.use((err, req, res, next) => res.status(500).json({ ok: false, error: 'Kesalahan server: ' + err.message }));

/* ---- start: init storage dulu, lalu listen ---- */
(async () => {
  if (IS_DENO) { try { kv = await Deno.openKv(); } catch (e) { kv = null; } }
  await loadDb();
  app.listen(PORT, '0.0.0.0', () => console.log('JalurAkses API (Express) jalan di port ' + PORT + (GH_PAT ? ' · DB: repo GitHub privat' : (kv ? ' · DB: Deno KV' : ' · DB: data.json lokal'))));
})();
