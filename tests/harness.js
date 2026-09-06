/* Harness uji JalurAkses — ekstrak engine dari index.html lalu jalankan asersi inti.
   Jalankan: node tests/harness.js */
const fs=require('fs'),os=require('os'),path=require('path'),{execSync}=require('child_process');
const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
const m=html.match(/<script>\s*(\/\*ENGINE-START\*\/[\s\S]*?)<\/script>/);
if(!m){console.error('engine tidak ditemukan');process.exit(1);}
const mock=`
const els={};const mk=()=>({innerHTML:'',textContent:'',value:'',style:{},dataset:{},files:[],classList:{add(){},remove(){},toggle(){},contains:()=>false},addEventListener(){},setAttribute(){},querySelectorAll:()=>[],firstElementChild:{style:{}},options:[]});
global.document={getElementById:i=>els[i]||(els[i]=mk()),querySelector:s=>{const k=String(s).replace(/^#/,'');return els[k]||(els[k]=mk());},querySelectorAll:()=>[],documentElement:{setAttribute(){},style:{}},createElement:mk,addEventListener(){}};
global.window={addEventListener(){},matchMedia:()=>({matches:false}),open(){}};
global.localStorage={_d:{},getItem(k){return this._d[k]??null},setItem(k,v){this._d[k]=String(v)},removeItem(k){delete this._d[k]}};
global.location={href:'http://localhost/',origin:'http://localhost',reload(){}};
global.navigator={language:'id-ID',vibrate:()=>true};
global.speechSynthesis={speak(){},cancel(){},getVoices:()=>[]};
global.fetch=()=>Promise.resolve({ok:false,json:()=>Promise.resolve({})});
global.scrollTo=()=>{};global.Blob=class{};global.FileReader=class{};global.alert=()=>{};global.confirm=()=>true;`;
const tmp=path.join(os.tmpdir(),'ja_harness.js');
fs.writeFileSync(tmp,mock+m[1]+`
let p=0,f=0;const ok=(c,n)=>{c?p++:(f++,console.log('FAIL:',n))};
ok(typeof IC==='function'&&typeof starRow==='function','helper UI');
let reach=0,total=0;
for(const prof of ['roda','netra','rungu','lansia'])for(const a of POIS)for(const b of POIS){if(a.id!==b.id){total++;const r=analyze(a.id,b.id,prof,state.prefs||{});if(r&&r.alts&&r.alts.length)reach++;}}
ok(total===728&&reach===total,'728 pasangan rute reachable ('+reach+'/'+total+')');
ensureLiveNode({lat:-7.2667,lng:112.7521,acc:10});
ok(!!analyze('__live','gubeng',state.profile,state.prefs||{}),'GPS live→Gubeng');
for(const fn of [renderFeedback,renderMyZone,renderSaved,renderBell,renderPlaces])try{fn();ok(true,fn.name)}catch(e){ok(false,fn.name+': '+e.message)}
ok(typeof waLink==='function'&&waLink({kat:'K',lok:'L',desc:'d',bobot:'S',status:'Baru',ts:Date.now(),fotos:0,nama:'x'}).startsWith('https://wa.me/'),'waLink admin');
ok(typeof alwaysMic==='function','always-on mic');
console.log('PASS='+p+' FAIL='+f);process.exit(f?1:0);`);
try{console.log(execSync('node '+tmp,{encoding:'utf8'}))}catch(e){console.log(e.stdout||e.message);process.exit(1)}
