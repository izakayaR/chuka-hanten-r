
/* 料理図鑑：料理をタップすると、料理のイラストとその下に説明が出るポップアップ。
   ？の項目は同じ項目を3回連続でタップしたときだけ、中身をのぞける */
(function(){
const st=document.createElement('style');
st.textContent='.dish-cell[data-dish]{cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent;transition:transform .12s,border-color .12s}.dish-cell[data-dish]:active{transform:scale(.96)}.dish-cell[data-dish]:focus-visible{outline:2px solid #ffd34d;outline-offset:2px}.dish-cell.dp-wig{animation:dpWig .26s ease-in-out}@keyframes dpWig{25%{transform:translateX(-3px)}75%{transform:translateX(3px)}}'
+'.dish-pop{position:fixed;inset:0;z-index:90;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(8,3,3,.78);box-sizing:border-box}.dish-pop.show{display:flex}'
+'.dish-pop-card{position:relative;width:min(100%,360px);max-height:100%;overflow-y:auto;padding:22px 16px 16px;border:1px solid rgba(255,221,139,.6);border-radius:16px;background:linear-gradient(180deg,#2c100c,#150606);box-shadow:0 10px 36px rgba(0,0,0,.6);box-sizing:border-box;text-align:center;color:#f6ecd9;display:flex;flex-direction:column;align-items:center;gap:8px;animation:dishPop .45s cubic-bezier(.15,1.4,.35,1) both}'
+'.dish-pop .dish-stage{width:min(58vw,210px);flex:none;margin-bottom:6px}.dish-pop .dish-name{flex:none;max-width:100%;font-family:\'Zen Maru Gothic\',sans-serif;font-weight:900;font-size:clamp(18px,5.6vw,24px);line-height:1.4;letter-spacing:.05em;text-shadow:0 2px 0 #7a3410,0 0 10px rgba(255,170,60,.35);-webkit-text-stroke:0;text-wrap:balance;overflow-wrap:anywhere}.dish-pop .dish-desc{margin:0;max-width:300px}'
+'.dp-peek{padding:3px 12px;border-radius:999px;background:rgba(255,255,255,.1);border:1px dashed rgba(255,219,139,.55);font-size:11px;color:#ffe9b5}.dp-cond{font-size:11.5px;color:#d2b98a;line-height:1.5;max-width:300px}.dp-rec{font-size:11.5px;color:#ffe9b5}'
+'.dish-pop-close{margin-top:8px;padding:9px 28px;border:1px solid rgba(255,221,139,.5);border-radius:999px;background:linear-gradient(145deg,#66301a,#321511);color:#ffe9b5;font-size:14px;font-weight:700;cursor:pointer;touch-action:manipulation}';
document.head.appendChild(st);
let pop=null,tapId=null,tapN=0,tapT=0;
const TAP_GAP=1500,TAP_NEED=3;
function ensure(){if(pop)return pop;pop=document.createElement('div');pop.className='dish-pop';pop.setAttribute('role','dialog');pop.setAttribute('aria-modal','true');pop.addEventListener('click',e=>{if(e.target===pop||e.target.closest('.dish-pop-close'))close()});document.body.appendChild(pop);return pop}
function open(id){
 const d=DISHES.find(x=>x.id===id);if(!d)return;
 const rec=readDishBook()[id],el=ensure(),q=d.r>=5?3:d.r>=4?2:0,meta=[];
 if(rec){if(rec.n>0)meta.push('作った回数 '+rec.n+'回');if(rec.best>0)meta.push('最高 '+Number(rec.best).toLocaleString()+'点')}
 el.innerHTML=`<div class="dish-pop-card"><div class="dish-stage q${q}">${dishArt(d,q,false)}</div><div class="dish-rarity">${dishTrophy(d.r)}</div>${rec?'':'<div class="dp-peek">👀 のぞき見中（まだ未登録）</div>'}<h3 class="dish-name">${escapeHtml(d.n)}</h3><p class="dish-desc">${escapeHtml(d.d)}</p><div class="dp-cond">達成条件：${escapeHtml(d.h)}</div>${meta.length?`<div class="dp-rec">${meta.join('　／　')}</div>`:''}<button type="button" class="dish-pop-close">閉じる</button></div>`;
 el.setAttribute('aria-label',d.n);
 el.classList.add('show');
 const cb=el.querySelector('.dish-pop-close');if(cb)try{cb.focus({preventScroll:true})}catch(_){}
}
function close(){if(pop)pop.classList.remove('show')}
function wiggle(c){c.classList.remove('dp-wig');void c.offsetWidth;c.classList.add('dp-wig');setTimeout(()=>c.classList.remove('dp-wig'),300)}
function act(c){
 const id=c.dataset.dish;
 if(c.classList.contains('got')){tapId=null;tapN=0;open(id);return}
 /* ？の項目：同じ項目を続けてタップした回数を数える（間隔が空く／別の項目に移るとやり直し） */
 const now=Date.now();
 if(tapId===id&&now-tapT<=TAP_GAP)tapN++;else{tapId=id;tapN=1}
 tapT=now;
 if(tapN>=TAP_NEED){tapId=null;tapN=0;open(id)}else wiggle(c);
}
const grid=document.getElementById('dish-grid');if(!grid)return;
grid.addEventListener('click',e=>{const c=e.target.closest('.dish-cell[data-dish]');if(c)act(c)});
grid.addEventListener('keydown',e=>{if(e.key!=='Enter'&&e.key!==' ')return;const c=e.target.closest('.dish-cell[data-dish]');if(c){e.preventDefault();act(c)}});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&pop&&pop.classList.contains('show'))close()});
})();
