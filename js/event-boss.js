/* ===== 期間限定ボスの適用（event-loader.js が、開催中のイベントがあるときだけ読み込む） =====
   main.js は変更しない。巨大カニの「見た目と表示テキスト」だけを差し替える。
   HP・スロー・得点・討伐ボーナス・フィーバー・当たり判定などのパラメーターはカニと完全に同じ。
   設定は window.__EVENT（events.json の1件）、見た目は window.EVENT_SKINS[skin]。
   討伐報酬の料理は event-dishes.js（window.EVENT_DISH）に登録する。 */
(function(){
const EV=window.__EVENT,SK=window.EVENT_SKINS&&EV&&window.EVENT_SKINS[EV.skin];
if(!EV||!SK)return;
const D=SK.defaults||{},NAME=EV.name||D.name||'ボス',LABEL=EV.label||D.label||'★',SHARD=EV.shardColor||D.shardColor||'#ffd34d';

/* 絵：drawCrab を差し替える（本体・手足・スプライトの全部がこれを通る） */
window.drawCrab=function(c,L,Wd,o){return SK.draw(c,L,Wd,o||{})};

/* 斬ったときの破片の色 */
const orgShards=window.spawnShards;
if(typeof orgShards==='function')window.spawnShards=function(f,...a){if(f&&f.k==='crab'&&f.t)f=Object.assign({},f,{t:Object.assign({},f.t,{col:SHARD})});return orgShards.call(this,f,...a)};

/* 画面に出る文言（内部の記録名「カニ」は料理図鑑などのため変更しない） */
const TXT={'巨大カニが来た！':'巨大'+NAME+'が来た！','カニに逃げられた…':NAME+'に逃げられた…','カニ 討伐！':NAME+' 討伐！'};
function relabel(){try{for(const x of texts)if(TXT[x.s])x.s=TXT[x.s]}catch(_){}}
for(const n of['spawnBoss','bossFail','bossKill']){const f=window[n];if(typeof f==='function')window[n]=function(...a){try{return f.apply(this,a)}finally{relabel()}}}

/* HPバー横の「蟹」を目印に差し替え */
const orgDraw=window.drawBoss;
if(typeof orgDraw==='function')window.drawBoss=function(...a){
 const ft=g.fillText,st=g.strokeText,sw=s=>s==='蟹'?LABEL:s;
 g.fillText=function(s,...r){return ft.call(this,sw(s),...r)};g.strokeText=function(s,...r){return st.call(this,sw(s),...r)};
 try{return orgDraw.apply(this,a)}finally{delete g.fillText;delete g.strokeText}};

/* 討伐報酬の料理（実績）：このイベントのボスを倒したプレイでだけ獲得できる。設定は events.json の dish（無ければスキンの初期値） */
function setupDish(){const DS=Object.assign({},D.dish,EV.dish),API=window.EVENT_DISH;
 if(API&&DS.enabled!==false&&DS.n){
  const did=API.idFor(EV.id);
  API.register({id:did,n:DS.n,d:DS.d,h:DS.h,r:DS.r,e:DS.e,art:DS.art},true);
  const kill=window.bossKill;
  if(typeof kill==='function')window.bossKill=function(...a){const r=kill.apply(this,a);API.award(did);return r}
  try{console.info('[event] 討伐報酬の料理を登録:',did)}catch(_){}}}
/* event-dishes.js がまだ無ければ（古いローダーがキャッシュされている場合など）ここで読み込んでから登録 */
if(window.EVENT_DISH)setupDish();else{const s=document.createElement('script');s.src='js/event-dishes.js?v=20261031c';s.onload=setupDish;document.head.appendChild(s)}

/* タイトル画面の説明文・ページタイトル */
function retitle(){
 if(EV.pageTitle||D.pageTitle)document.title=EV.pageTitle||D.pageTitle;
 const tg=EV.tagline!==undefined?EV.tagline:(D.tagline||'');
 document.querySelectorAll('.fever-line').forEach(el=>{if(el.textContent.indexOf('巨大カニ')>=0)el.innerHTML=el.innerHTML.replace('巨大カニ',tg+'巨大'+NAME)});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',retitle);else retitle();
})();
