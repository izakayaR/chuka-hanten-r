
(function(){
const title=document.getElementById('title');if(!title)return;document.querySelectorAll('.bg-chara img').forEach(function(i){var p=new Image();p.src=i.dataset.alt});
function happySound(kind){try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;audioCtx=audioCtx||new AC();if(audioCtx.state==='suspended')audioCtx.resume();
const ctx=audioCtx,out=getAudioOutput(ctx),now=ctx.currentTime;
const T=kind==='run'?[[698,1047,0,.09,.13],[880,1319,.11,.09,.13],[1047,1568,.22,.09,.13],[1319,1976,.33,.22,.14],[2637,2637,.46,.25,.04]]:[[523,784,0,.12,.13],[659,988,.14,.12,.13],[784,1318,.28,.2,.14],[2093,2093,.44,.28,.04]];
T.forEach(function(t){const o=ctx.createOscillator(),g=ctx.createGain();o.type=t[4]<.1?'sine':'triangle';
o.frequency.setValueAtTime(t[0],now+t[2]);o.frequency.exponentialRampToValueAtTime(t[1],now+t[2]+t[3]*.8);
g.gain.setValueAtTime(.0001,now+t[2]);g.gain.exponentialRampToValueAtTime(t[4],now+t[2]+.012);g.gain.exponentialRampToValueAtTime(.0001,now+t[2]+t[3]);
o.connect(g);g.connect(out);o.start(now+t[2]);o.stop(now+t[2]+t[3]+.03)})}catch(_){}}
function hit(img,x,y){const r=img.getBoundingClientRect();if(x<r.left||x>r.right||y<r.top||y>r.bottom)return false;
try{const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;const g=c.getContext('2d');g.drawImage(img,0,0);
const px=Math.min(c.width-1,Math.max(0,Math.floor((x-r.left)/r.width*c.width))),py=Math.min(c.height-1,Math.max(0,Math.floor((y-r.top)/r.height*c.height)));
return g.getImageData(px,py,1,1).data[3]>40}catch(_){return true}}
title.addEventListener('click',function(e){
if(e.target.closest('button,a,input,textarea,select,label,#title-character,.title-bubble,.title-panel,.title-detail'))return;
const main=document.getElementById('title-main');if(main&&main.classList.contains('hide'))return;
const list=Array.from(title.querySelectorAll('.bg-chara')).reverse();
for(const el of list){if(el.classList.contains('pop'))continue;const img=el.querySelector('img');
if(!hit(img,e.clientX,e.clientY))continue;
if(!img.dataset.base)img.dataset.base=img.src;img.src=img.dataset.alt;el.classList.add('pop');happySound(el.classList.contains('bg-run')?'run':'walk');
setTimeout(function(){el.classList.remove('pop');img.src=img.dataset.base},1550);break}
});
})();
