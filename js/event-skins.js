/* ===== 期間限定ボスの見た目（スキン）集 =====
   event-boss.js（ゲーム側）と event-admin.html（設定ツールのプレビュー）の両方が使う。
   新しいボスを足すときは EVENT_SKINS にキーを1つ追加する。
   draw(c,L,Wd,o) は main.js の drawCrab と同じ引数・同じサイズ感で描く：
     o.part='limbs'（後ろに出る手足）/ 'body'（本体）、o.mood='angry'|'hurt'、o.sweat、o.t（時間）、o.run */
(function(){
function drawPumpkin(c,L,Wd,o){
 const mood=o.mood||'angry',t=o.t||0,run=o.run||1,lw=Math.max(2,L*.02),cy=Wd*.1;
 c.save();c.lineJoin='round';c.lineCap='round';
 if(o.part!=='body'){
  /* ちいさな足 */
  for(const sd of[-1,1]){const w=Math.sin(t*9*run+(sd>0?Math.PI:0));
   c.fillStyle='#5a2f8e';c.strokeStyle='#241040';c.lineWidth=lw*.8;c.beginPath();
   c.ellipse(sd*L*.14,cy+Wd*.29+w*Wd*.02,L*.075,Wd*.06,0,0,6.2832);c.fill();c.stroke()}
  /* コウモリの羽（ぱたぱた） */
  for(const sd of[-1,1]){const fl=Math.sin(t*(5+(run>1?7:0))+(sd>0?.6:0));
   c.save();c.translate(sd*L*.28,cy-Wd*.02);c.scale(sd,1);c.rotate(-.4-fl*.38);
   c.fillStyle='#7a47b8';c.strokeStyle='#2b1250';c.lineWidth=lw*.9;c.beginPath();
   c.moveTo(0,0);c.quadraticCurveTo(L*.1,-Wd*.3,L*.25,-Wd*.27);
   c.quadraticCurveTo(L*.2,-Wd*.17,L*.215,-Wd*.1);c.quadraticCurveTo(L*.16,-Wd*.13,L*.15,-Wd*.04);
   c.quadraticCurveTo(L*.1,-Wd*.08,L*.05,Wd*.03);c.closePath();c.fill();c.stroke();
   c.strokeStyle='rgba(255,255,255,.25)';c.lineWidth=lw*.6;c.beginPath();c.moveTo(L*.02,-Wd*.02);c.lineTo(L*.2,-Wd*.2);c.moveTo(L*.03,0);c.lineTo(L*.14,-Wd*.06);c.stroke();
   c.restore()}
 }
 if(o.part!=='limbs'){
  /* かぼちゃ本体（3つの房） */
  const lobe=(x,rx,ry)=>{const gr=c.createLinearGradient(0,cy-ry,0,cy+ry);gr.addColorStop(0,'#ffbe55');gr.addColorStop(.55,'#ff8a1f');gr.addColorStop(1,'#e0600f');
   c.fillStyle=gr;c.strokeStyle='#a8420a';c.lineWidth=lw;c.beginPath();c.ellipse(x,cy,rx,ry,0,0,6.2832);c.fill();c.stroke()};
  lobe(-L*.15,L*.17,Wd*.265);lobe(L*.15,L*.17,Wd*.265);lobe(0,L*.2,Wd*.285);
  c.strokeStyle='rgba(150,55,0,.35)';c.lineWidth=lw*.8;
  for(const sd of[-1,1]){c.beginPath();c.moveTo(sd*L*.085,cy-Wd*.27);c.quadraticCurveTo(sd*L*.12,cy,sd*L*.085,cy+Wd*.27);c.stroke()}
  c.fillStyle='rgba(255,255,255,.3)';c.beginPath();c.ellipse(-L*.17,cy-Wd*.12,L*.045,Wd*.05,-.5,0,6.2832);c.fill();
  /* ヘタ・葉っぱ・つる */
  c.strokeStyle='#3c5a14';c.lineWidth=lw*3.4;c.beginPath();c.moveTo(0,cy-Wd*.26);c.quadraticCurveTo(-L*.012,cy-Wd*.37,L*.04,cy-Wd*.43);c.stroke();
  c.strokeStyle='#86bd3f';c.lineWidth=lw*2.1;c.beginPath();c.moveTo(0,cy-Wd*.26);c.quadraticCurveTo(-L*.012,cy-Wd*.37,L*.04,cy-Wd*.43);c.stroke();
  c.fillStyle='#6aa22e';c.strokeStyle='#3c5a14';c.lineWidth=lw*.8;c.save();c.translate(-L*.065,cy-Wd*.3);c.rotate(-.6);c.beginPath();c.ellipse(0,0,L*.06,Wd*.035,0,0,6.2832);c.fill();c.stroke();c.restore();
  c.strokeStyle='#6aa22e';c.lineWidth=lw*.9;c.beginPath();c.arc(L*.085,cy-Wd*.32,L*.03,3.4,.6+6.28*.78,false);c.stroke();
  /* かお */
  const ex=L*.085,ey=cy-Wd*.04,er=Wd*.078;
  c.fillStyle='rgba(255,80,110,.4)';for(const sd of[-1,1]){c.beginPath();c.ellipse(sd*L*.155,cy+Wd*.075,L*.035,Wd*.04,0,0,6.2832);c.fill()}
  for(const sd of[-1,1]){const x=sd*ex;
   if(mood==='hurt'){c.strokeStyle='#3a1206';c.lineWidth=Math.max(2.5,L*.014);c.beginPath();c.moveTo(x+sd*er*.8,ey-er*.8);c.lineTo(x-sd*er*.6,ey);c.lineTo(x+sd*er*.8,ey+er*.8);c.stroke()}
   else{c.fillStyle='#2a0f05';c.beginPath();c.ellipse(x,ey,er*.85,er*1.1,0,0,6.2832);c.fill();
    c.fillStyle='#fff';c.beginPath();c.arc(x-sd*er*.25,ey-er*.3,er*.32,0,6.3);c.fill();c.beginPath();c.arc(x+sd*er*.2,ey+er*.35,er*.14,0,6.3);c.fill();
    c.strokeStyle='#3a1206';c.lineWidth=Math.max(2.5,L*.013);c.beginPath();c.moveTo(x+sd*er*1.2,ey-er*1.55);c.lineTo(x-sd*er*.9,ey-er*.95);c.stroke()}}
  {const mw=L*.085,my=cy+Wd*.1;c.fillStyle='#3a1206';c.strokeStyle='#3a1206';c.lineWidth=Math.max(2,L*.008);c.beginPath();
   if(mood==='hurt'){c.ellipse(0,my+Wd*.03,mw*.4,Wd*.05,0,0,6.2832);c.fill();c.stroke()}
   else{c.moveTo(-mw,my);c.quadraticCurveTo(0,my+Wd*.17,mw,my);c.quadraticCurveTo(0,my+Wd*.03,-mw,my);c.closePath();c.fill();c.stroke();
    c.fillStyle='#fff3c4';for(const sd of[-1,1]){c.beginPath();c.moveTo(sd*mw*.72,my+Wd*.012);c.lineTo(sd*mw*.42,my+Wd*.012);c.lineTo(sd*mw*.57,my+Wd*.055);c.closePath();c.fill()}}}
  if(o.sweat){c.fillStyle='#bfe8ff';c.strokeStyle='#6aa5c9';c.lineWidth=1.5;const x=ex+er*2.1,y=ey-er*1.1;c.beginPath();c.moveTo(x,y);c.quadraticCurveTo(x+er*.6,y+er*.9,x,y+er*1.3);c.quadraticCurveTo(x-er*.6,y+er*.9,x,y);c.fill();c.stroke()}
 }
 c.restore()}
window.EVENT_SKINS={
 pumpkin:{
  title:'かぼちゃオバケ（ハロウィン）',
  draw:drawPumpkin,
  defaults:{name:'かぼちゃオバケ',label:'🎃',shardColor:'#ff8a1f',pageTitle:'中華飯店R ハロウィン特別版',tagline:'ハロウィン限定・'}
 }
};
})();
