/* ===== イベント限定の料理（実績） =====
   期間限定ボスを倒したときだけ獲得できる料理を、料理図鑑・トロフィーの仕組みに足す。
   main.js / dish-art.js / dish-popup.js は変更しない。event-loader.js が常に読み込む（イベント期間外も）。
   ・未獲得のあいだは料理図鑑に出さない（？の枠も、全体の分母も数えない）
   ・一度獲得したら定義をブラウザに保存し、イベント終了後も図鑑に残る
   ・event-boss.js が開催中だけ register(def,true) で「獲得できる状態」にする */
(function(){
const KEY='chukaEventDishes_v1';
const kills=new Set();
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const readS=()=>{try{const v=JSON.parse(localStorage.getItem(KEY)||'{}');return(v&&typeof v==='object')?v:{}}catch(_){return{}}};
const writeS=o=>{try{localStorage.setItem(KEY,JSON.stringify(o))}catch(_){}};
const clean=d=>({id:String(d.id),n:String(d.n||''),d:String(d.d||''),h:String(d.h||''),r:Math.min(5,Math.max(1,Math.round(Number(d.r))||5)),e:String(d.e||'🎃'),art:String(d.art||'pumpkin')});

/* ---- 料理のイラスト（200×200）。art のキーごとに1つ。新しいイベント料理は ART にキーを足す ---- */
let _n=0;
const SPK=(x,y,s)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M0-9Q1.4-1.4 9 0Q1.4 1.4 0 9Q-1.4 1.4-9 0Q-1.4-1.4 0-9Z" fill="#fff6b8" stroke="#e8b83c" stroke-width=".8"/>`;
const ART={
 /* かぼちゃオバケの南瓜盅：くり抜いたかぼちゃを器にした蒸し料理。金の皿にのせる */
 pumpkin(d,q,small){
  const id='evp'+(++_n);
  const defs=`<defs><linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff1b0"/><stop offset=".5" stop-color="#e6b13c"/><stop offset="1" stop-color="#a8690a"/></linearGradient><radialGradient id="${id}w" cx=".5" cy=".6" r=".6"><stop offset=".6" stop-color="#f7f3eb"/><stop offset="1" stop-color="#d6ccb9"/></radialGradient><linearGradient id="${id}o" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffbe55"/><stop offset=".55" stop-color="#ff8a1f"/><stop offset="1" stop-color="#e0600f"/></linearGradient><radialGradient id="${id}f" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#fffbd0"/><stop offset=".6" stop-color="#ffd34d"/><stop offset="1" stop-color="#ff9a1f"/></radialGradient></defs>`;
  let fx='';
  if(q>=3&&!small)fx+=`<circle cx="100" cy="100" r="95" fill="none" stroke="#ffd34d" stroke-width="3" opacity=".85"/><circle cx="100" cy="100" r="99" fill="none" stroke="#ffe9a0" stroke-width="1" opacity=".6"/>`+[[22,26,1],[178,34,.8],[172,176,1.1],[24,170,.7],[100,6,.8]].map((p,i)=>`<g class="ds-tw" style="animation-delay:${i*.3}s">${SPK(p[0],p[1],p[2]*1.4)}</g>`).join('');
  else if(q===2&&!small)fx+=[[24,28,.9],[176,170,.8]].map((p,i)=>`<g class="ds-tw" style="animation-delay:${i*.5}s">${SPK(p[0],p[1],p[2]*1.2)}</g>`).join('');
  const plate=`<ellipse cx="100" cy="112" rx="88" ry="84" fill="#000" opacity=".3"/><circle cx="100" cy="100" r="90" fill="url(#${id}g)"/><circle cx="100" cy="100" r="90" fill="none" stroke="#fff3b0" stroke-width="1.6"/><circle cx="100" cy="100" r="82" fill="none" stroke="#a8690a" stroke-width="1.4" stroke-dasharray="3 3"/><circle cx="100" cy="100" r="72" fill="url(#${id}w)" stroke="#c9951e" stroke-width="2"/>`;
  const body=`<ellipse cx="100" cy="150" rx="46" ry="7" fill="#000" opacity=".14"/>`
   +[[70,28,42],[130,28,42],[100,34,46]].map(l=>`<ellipse cx="${l[0]}" cy="110" rx="${l[1]}" ry="${l[2]}" fill="url(#${id}o)" stroke="#a8420a" stroke-width="2"/>`).join('')
   +`<path d="M84 66Q74 110 84 154M116 66Q126 110 116 154" stroke="rgba(150,55,0,.35)" stroke-width="2" fill="none"/>`
   +`<ellipse cx="60" cy="90" rx="6" ry="12" fill="#fff" opacity=".3" transform="rotate(-15 60 90)"/>`
   +`<path d="M100 66Q98 54 106 47" stroke="#3c5a14" stroke-width="10" stroke-linecap="round" fill="none"/><path d="M100 66Q98 54 106 47" stroke="#86bd3f" stroke-width="6" stroke-linecap="round" fill="none"/>`
   +`<ellipse cx="86" cy="60" rx="10" ry="5" fill="#6aa22e" stroke="#3c5a14" stroke-width="1.4" transform="rotate(-28 86 60)"/><path d="M112 58q11-7 5-17" stroke="#6aa22e" stroke-width="2.2" fill="none" stroke-linecap="round"/>`
   /* 中からの灯りでくり抜かれた顔 */
   +`<g fill="url(#${id}f)" stroke="#7a2a04" stroke-width="1.8" stroke-linejoin="round"><path d="M74 101L92 101L83 84Z"/><path d="M108 101L126 101L117 84Z"/><path d="M100 104L94.5 113L105.5 113Z"/><path d="M72 119L80 119L86 129L93 120L100 131L107 120L114 129L120 119L128 119Q100 152 72 119Z"/></g>`
   +`<ellipse cx="62" cy="116" rx="6" ry="3.4" fill="#ff5a6e" opacity=".35"/><ellipse cx="138" cy="116" rx="6" ry="3.4" fill="#ff5a6e" opacity=".35"/>`;
  const sp=SPK(46,62,.9)+SPK(156,134,.8)+SPK(152,58,.7);
  const rim=`<path d="M34 70A72 72 0 0 1 84 30" stroke="#fff" stroke-width="5" stroke-linecap="round" fill="none" opacity=".6"/>`;
  const steam=small?'':`<g class="ds-steam"><path d="M80 44q-9-9 0-18t0-18"/><path d="M100 38q-9-9 0-18t0-18"/><path d="M122 44q-9-9 0-18t0-18"/></g>`;
  return `<svg class="ds-art${small?' ds-small':''}" viewBox="0 0 200 200" role="img" aria-label="${esc(d&&d.n)}" xmlns="http://www.w3.org/2000/svg">${defs}${fx}${plate}${body}${sp}${rim}${steam}</svg>`}
};
window.EVENT_DISH_ART=ART;

const API=window.EVENT_DISH={
 kills,
 idFor:eid=>'ev_'+String(eid||'event').replace(/[^A-Za-z0-9_-]/g,''),
 /* ボス撃破の瞬間に呼ぶ：図鑑に登録し、トロフィーポップアップを即表示する */
 award:id=>{kills.add(id);
  try{const d=DISHES.find(x=>x.id===id);if(!d)return;
   const had=!!readDishBook()[id];
   recordDish(d,typeof score==='number'?score:0);
   if(!had&&typeof window.__trophyTest==='function'){window.__trophyTest(id);
    const nm=document.querySelector('.trophy-pop .tp-name');if(nm&&!nm.querySelector('.tp-new')){const s=document.createElement('span');s.className='tp-new';s.textContent='NEW';nm.appendChild(s)}}
  }catch(_){}},
 /* live=true：開催中（この料理を獲得できる）／ false：保存済みの獲得済み料理を図鑑に出すだけ */
 register(def,live){
  if(typeof DISHES==='undefined')return;
  const c=clean(def),D=Object.assign({},c,{event:true,t:live?(()=>kills.has(c.id)&&typeof state!=='undefined'&&state==='play'):(()=>false)});
  const i=DISHES.findIndex(x=>x.id===c.id);if(i>=0)DISHES.splice(i,1);
  DISHES.unshift(D); /* 判定はプレイ中のみ true（結果画面の料理には出さない） */
  if(live){const s=readS();if(s[c.id]){s[c.id]=c;writeS(s)}} /* 獲得済みなら最新の名前・説明に更新 */
 }
};
if(typeof DISHES==='undefined')return; /* 設定ツール（event-admin.html）ではイラストだけ使う */

/* 獲得済みのイベント料理を復元（イベント期間外でも図鑑に残す） */
const saved=readS();for(const id of Object.keys(saved))API.register(saved[id],false);

/* 獲得した瞬間に定義を保存 */
const rd=window.recordDish;
if(typeof rd==='function')window.recordDish=function(d){const r=rd.apply(this,arguments);try{if(d&&d.event){const s=readS();s[d.id]=clean(d);writeS(s)}}catch(_){}return r};

/* 新しいプレイの開始でリセット */
const rs=window.reset;
if(typeof rs==='function')window.reset=function(){kills.clear();return rs.apply(this,arguments)};

/* 以降は dish-art.js の読み込み後（DOMContentLoaded）に、その上へ重ねる */
function setup(){
 const bookHas=()=>{try{return readDishBook()}catch(_){return{}}};
 const without=fn=>{ /* 未獲得のイベント料理を一時的に DISHES から外して実行（図鑑の表示・分母から隠す） */
  const b=bookHas(),h=[];DISHES.forEach((d,i)=>{if(d.event&&!b[d.id])h.push({d,i})});
  for(let k=h.length-1;k>=0;k--)DISHES.splice(h[k].i,1);
  try{return fn()}finally{for(const o of h)DISHES.splice(o.i,0,o.d)}};
 for(const n of['renderDishBook','dishCardMarkup']){const f=window[n];if(typeof f==='function')window[n]=function(){return without(()=>f.apply(this,arguments))}}
 const da=window.dishArt;
 if(typeof da==='function')window.dishArt=function(d,q,s){const f=d&&d.art&&ART[d.art];return f?f(d,q,s):da.apply(this,arguments)};
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();
