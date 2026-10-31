/* ===== イベント読み込み（index.html から読み込む唯一の追加部品） =====
   events.json を読み、「今」開催中のイベントがあるときだけ見た目の差し替えを読み込む。
   開催中がなければ見た目は何も変えない＝通常のカニのまま（獲得済みのイベント料理を図鑑に残す部品だけは常に読み込む）。URLは今までと同じ（index.html）。
   テスト用：index.html?event=イベントID で、期間・有効に関係なくそのイベントを強制表示。
   events.json が無い／読めない場合も何もしない（ゲームには影響しない）。 */
(function(){
const Q=new URLSearchParams(location.search).get('event'),V='?v=20261031b';
function add(src,next,err){const s=document.createElement('script');s.src=src+V;s.onload=next;s.onerror=err||function(){};document.head.appendChild(s)}
/* イベント限定料理の部品は常に読み込む（獲得済みの料理を、イベント終了後も図鑑に残すため） */
const dishP=new Promise(function(res){add('js/event-dishes.js',res,res)});
fetch('events.json?t='+Date.now(),{cache:'no-store'}).then(r=>r.ok?r.json():null).then(d=>{
 const list=(d&&d.events)||[],now=Date.now();let pick=null;
 for(const e of list){
  if(!e||!e.skin)continue;
  const st=Date.parse(e.start),en=Date.parse(e.end);
  const on=Q?e.id===Q:(e.enabled!==false&&now>=st&&now<en);
  if(on&&(!pick||st>Date.parse(pick.start)))pick=e}
 if(!pick)return;
 window.__EVENT=pick;
 dishP.then(function(){add('js/event-skins.js',function(){add('js/event-boss.js')})})
}).catch(function(){});
})();
