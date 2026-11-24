
/* i18n.js — Japanese / English display-language system for Chuka Hanten R.
   Standalone add-on: it does NOT change any game logic, scoring, data, or images.
   It only translates *displayed text* at draw/display time:
     - DOM text nodes & attributes (via MutationObserver, originals are kept and restored for Japanese)
     - Canvas fillText/strokeText arguments
   Language: auto-detected from the browser/device language on first launch
   (English -> English, otherwise Japanese). A manual choice on the title screen is remembered. */
(function(){
"use strict";
var UI = {
 "中華飯店R": "Chuka Hanten R",
 "中華飯店": "Chuka Hanten",
 "食材をなぞって切り、料理人の鍋へ届けよう。中央を切るほど高得点！ブラウザで遊べる中華料理カットゲーム。": "Trace ingredients to slice them into the chef's wok. Slice the center for a higher score! A Chinese cooking slice game you can play in your browser.",
 "食材をなぞって切り、料理人の鍋へ届けよう。中央を切るほど高得点。": "Trace ingredients to slice them into the chef's wok. The closer to the center, the higher the score.",
 "スタートを": "Tap START",
 "押してね…": "to play...",
 "スタートを押してね…": "Tap START to play...",
 "上質・高級・幻の食材は基本点が高くなるよ！": "Premium, luxury and legendary ingredients are worth more base points!",
 "ニックネーム（未入力は「無名の料理人」）": "Nickname (leave blank for \"Nameless Chef\")",
 "ニックネーム（ランキングに公開・未入力は「無名の料理人」）": "Nickname (shown on the ranking; blank = \"Nameless Chef\")",
 "名前を入力": "Enter your name",
 "ゲームスタート": "START GAME",
 "食材の得点": "Ingredient Scores",
 "料理図鑑": "Dish Collection",
 "ランキング": "Ranking",
 "𝕏でシェア": "Share on X",
 "お知らせ": "News",
 "‹ タイトルへ戻る": "< Back to Title",
 "タイトルへ戻る": "Back to Title",
 "食材": "Ingredient",
 "得点（PERFECT〜GOOD）": "Score (PERFECT - GOOD)",
 "−500点・コンボ解除": "-500 pts / Combo lost",
 "切ると即終了": "Slice it and it's over",
 "をPERFECT・GREATで切るとフィーバー！": " with PERFECT / GREAT to trigger FEVER!",
 "をPERFECT・GREATで切ると": " with PERFECT / GREAT for",
 "5秒間 得点×1.5": "Score x1.5 for 5 sec",
 "が現れる！何度も斬って討伐すると": " appears! Slice it again and again to defeat it:",
 "大漁フィーバー（8秒 得点×2）": "Big Catch FEVER (Score x2 for 8 sec)",
 "残り時間＋0.5秒": "Time +0.5 sec",
 "残り時間＋1秒": "Time +1 sec",
 "切り方別の得点": "Scores by Slice Quality",
 "詳細を見る": "Show Details",
 "詳細を閉じる": "Hide Details",
 "判定倍率：PERFECT ×1.5 / GREAT ×1 / GOOD ×0.5。コンボが続くほど得点が増え（1コンボ+1%・最大+50%）、20・40・60コンボごとに5秒間 ×1.5 / ×2 / ×2.5 のボーナスが付きます。フィーバー（×1.5）と重なると掛け算になります。": "Multipliers: PERFECT x1.5 / GREAT x1 / GOOD x0.5. Combos raise your score (+1% per combo, up to +50%), and at 20 / 40 / 60 combos you get a x1.5 / x2 / x2.5 bonus for 5 sec. It multiplies with FEVER (x1.5).",
 "切った食材の組み合わせで、完成する料理が変わります。全部集めよう！": "The dishes you complete depend on the ingredients you slice. Collect them all!",
 "図鑑をリセット": "Reset Collection",
 "みんなのランキング": "Everyone's Ranking",
 "ニックネームとスコアは公開ランキングに送信されます。本名は入れないでね。": "Your nickname and score are sent to the public ranking. Please don't use your real name.",
 "自分の記録": "Your Records",
 "称号一覧": "Titles",
 "ランク": "Rank",
 "称号": "Title",
 "？？？（この称号を獲得すると読めるようになります）": "??? (Unlock this Title to reveal it)",
 "星": "Stars ",
 "評価点": "Score Needed",
 "星は、その称号で最低限もらえる数。ランク17以上は自動で★3。★3はBADなしで達成（ランク14以上は毒キノコ・爆弾にも触れない）": "Stars are the minimum you earn with that title. Rank 17+ always earns 3 stars. 3 stars requires no BAD (and at Rank 14+, never touch a Poison or Bomb Mushroom).",
 "© 2026 居酒屋R. All Rights Reserved.": "(C) 2026 Izakaya R. All Rights Reserved.",
 "𝕏 作者のXはこちら": "X - Author's X",
 "新衣装リリース！": "New Outfit Released!",
 "作者・居酒屋Rの自信作、VRoidアバター専用衣装「チャイナドレスセット01」がリリースされました！": "Izakaya R's proud creation for VRoid avatars, \"China Dress Set 01\", is now out!",
 "チャイナドレスセット01 BOOTHにて好評発売中！": "China Dress Set 01 - now on sale at BOOTH!",
 "BOOTHで見る": "View on BOOTH",
 "閉じる": "Close",
 "一時停止": "Pause",
 "一時停止中": "Paused",
 "ひと休みして、準備ができたら再開しよう。": "Take a break, and resume when you're ready.",
 "再開": "Resume",
 "最初から": "Restart",
 "サウンドをミュート": "Mute sound",
 "サウンドを再生": "Play sound",
 "料理人をタップ": "Tap the chef",
 "料理人": "Chef",
 "失敗して慌てる料理人": "The chef, panicking after a failure",
 "失敗して慌てるマリーナ": "Marina, panicking after a failure",
 "中華飯店R タイトル画像": "Chuka Hanten R title image",
 "休憩中": "RESTING",
 "アシスト": "ASSIST",
 "コンボ": "COMBO",
 "コンボ！": " COMBO!",
 "コンボ +": "Combo +",
 " ボーナス": " BONUS",
 "残り ": "Time ",
 "秒": " sec",
 "点": " pts",
 "回": "",
 "蟹": "CRAB",
 "カニ": "Crab",
 "巨大カニ": "Giant Crab",
 "巨大カニが来た！": "A Giant Crab appeared!",
 "が来た！": " appeared!",
 "カニ 討伐！": "Crab Defeated!",
 " 討伐！": " Defeated!",
 "カニに逃げられた…": "The crab got away...",
 "に逃げられた…": " got away...",
 "大漁フィーバー！得点×2": "Big Catch FEVER! Score x2",
 "大漁フィーバー": "Big Catch FEVER",
 "大漁FEVER ×2　": "Big Catch FEVER x2  ",
 "食材が金に！得点×1.5": "Ingredients turned to gold! Score x1.5",
 "フィーバー終了": "FEVER Over",
 "フィーバー": "FEVER",
 "空振りが続いた…": "Too many misses...",
 "攻撃が止まってしまった…": "Your attack stalled...",
 "時間切れ…": "Time's up...",
 "パリィ！": "PARRY!",
 "毒キノコを斬ってしまった…": "You sliced a Poison Mushroom...",
 "ギャッ！": "Gah!",
 "ミス": "MISS",
 "巨大": "Giant ",
 "ボス": "Boss",
 "ニンジン": "Carrot",
 "ネギ": "Green Onion",
 "白菜": "Napa Cabbage",
 "唐辛子": "Chili Pepper",
 "エビ": "Shrimp",
 "豚肉": "Pork",
 "シイタケ": "Shiitake",
 "ホタテ": "Scallop",
 "フカヒレ": "Shark Fin",
 "金の唐辛子": "Golden Chili",
 "毒キノコ": "Poison Mushroom",
 "爆弾キノコ": "Bomb Mushroom",
 "とうか": "Touka",
 "マリーナ": "Marina",
 "まだ記録がありません。最初の一位を目指そう！": "No records yet. Be the first to take #1!",
 "ランキングに送信中…": "Submitting to ranking...",
 "ランキングに接続できませんでした": "Could not connect to the ranking",
 "自己ベスト更新！": "New personal best!",
 "ベスト ": "Best: ",
 "ランキング圏外": "Out of ranking range",
 "人が参加中": " players in",
 "読み込み中…": "Loading...",
 "ランキングを取得できませんでした。時間をおいてもう一度ひらいてね。": "Could not load the ranking. Please try again later.",
 "位": "",
 "その言葉はニックネームに使えません": "That word can't be used in a nickname",
 "無名の料理人": "Nameless Chef",
 "調理失敗": "Cooking Failed",
 "爆弾キノコに触れてしまった……！": "You touched a Bomb Mushroom...!",
 "次は危険な食材を見送ろう。": "Next time, let the dangerous ones pass.",
 "もういちど挑戦": "Try Again",
 "鍋振りフィニッシュ！": "Wok-Toss Finish!",
 "最後のひと振りで、料理が完成。": "One last toss of the wok, and the dish is complete.",
 "料理人のカットイン": "Chef cut-in",
 "今回の得点": "Your Score",
 "称号「": "Title: \"",
 "切った食材": "Ingredients Sliced",
 "食材を切れませんでした": "You couldn't slice any ingredients",
 "最高コンボ：": "Best Combo: ",
 "次へ": "Next",
 "同時達成！ ほか": "Also completed! ",
 "品も図鑑に登録": " more dish(es) added to your collection",
 "…ほか": "...and ",
 "品": " more",
 "食材なし": "No ingredients",
 "NEW! 図鑑に登録": "NEW! Added to Collection",
 "極上": "Superb",
 "上出来": "Well Done",
 "家庭の味": "Home-Style",
 "条件：": "How: ",
 "達成条件：": "How to get: ",
 "作った回数 ": "Made: ",
 "最高 ": "Best: ",
 "👀 のぞき見中（まだ未登録）": "Peeking (not collected yet)",
 "中華飯店Rをプレイ！": "I played Chuka Hanten R!",
 "スコア": "Score: ",
 "プレイはこちら↓": "Play here:",
 "厨房の迷子": "Lost in the Kitchen",
 "えっと……まずは火をつけるところから始めようか。": "Um... shall we start by lighting the stove?",
 "見習い以前": "Not Even an Apprentice",
 "包丁も中華鍋も、まだ君には早かったようだ……！": "Knives and woks are still too much for you...!",
 "味見担当": "Chief Taste-Tester",
 "料理の腕より、味見の腕を磨いてみよう。": "Try polishing your tasting skills instead of your cooking.",
 "町内会の料理人": "Neighborhood Cook",
 "町内会なら……きっと活躍できるはずだ！": "You'd surely shine at a neighborhood party!",
 "まかない専門": "Staff-Meal Specialist",
 "お客さんに出すには、もうひと修行必要だな。": "You need a little more training before serving guests.",
 "見習い料理人": "Apprentice Chef",
 "まずは包丁の握り方から。ここから腕を磨こう！": "Start with how to hold a knife. Train from here!",
 "駆け出しの料理人": "Rookie Chef",
 "なかなか筋がいい。修行を続けよう！": "You've got talent. Keep training!",
 "街角の料理人": "Street-Corner Chef",
 "町で評判になる腕前だ！": "Skill worthy of a local reputation!",
 "熟練の料理人": "Skilled Chef",
 "食材の声が聞こえているな！": "You can hear the ingredients speaking!",
 "一流の料理人": "First-Class Chef",
 "見事な包丁さばきと火加減だ！": "Superb knife work and heat control!",
 "宮廷料理人": "Court Chef",
 "宮廷の宴席を任せられる腕だ！": "Skill fit for a royal banquet!",
 "伝説の料理人": "Legendary Chef",
 "その一皿、歴史に名を刻め！": "That dish will go down in history!",
 "神域の料理人": "God-Tier Chef",
 "もはや料理の理を超えている……！": "You've gone beyond the laws of cooking...!",
 "中華料理界の覇王": "King of Chinese Cuisine",
 "天下の厨房が、あなたにひれ伏す！": "Every kitchen in the land bows to you!",
 "天上の名料理人": "Heavenly Master Chef",
 "その香りは、雲を突き抜けて空の果てまで届く！": "Your aroma pierces the clouds and reaches the edge of the sky!",
 "雲上の調理長": "Head Chef Above the Clouds",
 "雲海を見下ろす厨房で、あなたの火はまだ燃え盛る。": "In a kitchen above the sea of clouds, your flame still blazes.",
 "雷鳴の鍋将": "Thunder Wok General",
 "一振りごとに稲妻が走り、鍋が唸りをあげる！": "With every toss, lightning crackles and the wok roars!",
 "日輪の火匠": "Sunfire Artisan",
 "その火力、もはや太陽にも負けていない！": "Your fire rivals the sun itself!",
 "星海の調理主": "Chef of the Starry Sea",
 "星々が食材になる日も近いかもしれない……！": "One day the stars themselves may be your ingredients...!",
 "宇宙の台所番": "Keeper of the Cosmic Kitchen",
 "宇宙の台所は、すでにあなたの持ち場だ！": "The cosmic kitchen is already your station!",
 "星間の調理人": "Interstellar Chef",
 "星々が、あなたの鍋のまわりを回り始めた。": "The stars have begun to orbit your wok.",
 "銀河の厨房長": "Galactic Head Chef",
 "ひと振りごとに、銀河がひとつ煮えていく。": "With every toss, another galaxy comes to a boil.",
 "時空の調理師": "Spacetime Chef",
 "過去も未来も、同じ一皿の中に煮込まれた。": "Past and future, simmered in the same dish.",
 "因果の火加減": "Master of Causal Heat",
 "結果が先にあり、原因は後から味付けされる。": "The result comes first; the cause is seasoned in later.",
 "万象の料理人": "Chef of All Creation",
 "世界のすべてが、あなたの食材に見えてきた。": "Everything in the world now looks like an ingredient to you.",
 "終焉の美食王": "Gourmet King of the End",
 "最後の晩餐は、いつもあなたの鍋から始まる。": "The last supper always begins in your wok.",
 "無限の厨房神": "Infinite Kitchen God",
 "厨房の外側など、もう存在しない。": "There is no longer an 'outside' to your kitchen.",
 "始原の料理神": "Primordial Cooking God",
 "すべての味は、あなたから始まった。": "All flavor began with you.",
 "虚無の饗宴主": "Host of the Void Banquet",
 "満たされたか？ いや、まだだ。……この無限の空腹こそが永遠なのだから": "Satisfied? No, not yet... for this endless hunger is eternity itself.",
 "創食神": "God of Food Creation",
 "さあ、この宇宙（サラ）にどんな味を盛り付けようか": "Now, what flavor shall we plate upon this universe?"
};
var dict = {};
Object.keys(UI).forEach(function(k){dict[k]=UI[k]});
if (window.I18N_EXTRA) Object.keys(window.I18N_EXTRA).forEach(function(k){dict[k]=window.I18N_EXTRA[k]});
var keys = Object.keys(dict).filter(function(k){return k.length>0}).sort(function(a,b){return b.length-a.length});
var STORE_KEY = "chukaHantenR.lang.v1";
var lang = "ja";
try{
  var saved = localStorage.getItem(STORE_KEY);
  if(saved==="en"||saved==="ja") lang = saved;
  else lang = /^en/i.test(navigator.language|| (navigator.languages&&navigator.languages[0]) || "") ? "en" : "ja";
}catch(_){
  try{ lang = /^en/i.test(navigator.language||"") ? "en" : "ja"; }catch(__){}
}
function tr(s){
  if(lang!=="en" || typeof s!=="string" || !s) return s;
  var out = s;
  for(var i=0;i<keys.length;i++){
    var k = keys[i];
    if(out.indexOf(k)>=0) out = out.split(k).join(dict[k]);
  }
  out = out.replace(/(\d[\d,]*)\s*点〜/g, "$1 pts+");
  out = out.replace(/(\d[\d,]*)\s*点/g, "$1 pts");
  out = out.replace(/(\d[\d,]*)\s*回/g, "$1");
  out = out.replace(/(\d[\d.]*)\s*秒/g, "$1 sec");
  out = out.replace(/〜/g, "-");
  out = out.replace(/「/g, "\"").replace(/」/g, "\"");
  return out;
}
window.__chrTr = tr;
window.__chrLang = function(){return lang};

/* ---- Canvas: translate at draw time only ---- */
try{
  var proto = CanvasRenderingContext2D.prototype;
  var _fill = proto.fillText, _stroke = proto.strokeText;
  proto.fillText = function(t,x,y,m){ return _fill.call(this, tr(String(t)), x, y, m); };
  proto.strokeText = function(t,x,y,m){ return _stroke.call(this, tr(String(t)), x, y, m); };
}catch(_){}

/* ---- DOM: keep originals so Japanese can be restored exactly ---- */
var origText = new WeakMap(), origAttr = new WeakMap();
var ATTRS = ["placeholder","title","aria-label","alt"];
var applying = false;
function skipEl(el){
  if(!el || el.nodeType!==1) return true;
  if(el.closest && el.closest("script,style,.entry-name,#chr-lang-toggle")) return true;
  return false;
}
function translateTextNode(n){
  if(!n || n.nodeType!==3) return;
  var p = n.parentElement;
  if(skipEl(p)) return;
  if(!origText.has(n)) origText.set(n, n.nodeValue);
  var orig = origText.get(n);
  var v = (lang==="en") ? tr(orig) : orig;
  if(n.nodeValue!==v) n.nodeValue = v;
}
function translateAttrs(el){
  if(skipEl(el)) return;
  var rec = origAttr.get(el);
  for(var i=0;i<ATTRS.length;i++){
    var a = ATTRS[i];
    if(!el.hasAttribute || !el.hasAttribute(a)) continue;
    if(!rec){ rec = {}; origAttr.set(el, rec); }
    if(!(a in rec)) rec[a] = el.getAttribute(a);
    var v = (lang==="en") ? tr(rec[a]) : rec[a];
    if(el.getAttribute(a)!==v) el.setAttribute(a, v);
  }
}
function translateRoot(root){
  if(!root) return;
  applying = true;
  try{
    if(root.nodeType===3){ translateTextNode(root); }
    else if(root.nodeType===1){
      translateAttrs(root);
      var tw = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
      var n; while((n = tw.nextNode())) translateTextNode(n);
      if(root.querySelectorAll){
        var els = root.querySelectorAll("*");
        for(var i=0;i<els.length;i++) translateAttrs(els[i]);
      }
    }
  }catch(_){}
  applying = false;
}
function applyLang(){
  document.documentElement.lang = (lang==="en" ? "en" : "ja");
  translateRoot(document.body);
  var bJ = document.getElementById("chr-lang-ja"), bE = document.getElementById("chr-lang-en");
  if(bJ && bE){
    bJ.classList.toggle("on", lang==="ja");
    bE.classList.toggle("on", lang==="en");
    bJ.setAttribute("aria-pressed", lang==="ja" ? "true" : "false");
    bE.setAttribute("aria-pressed", lang==="en" ? "true" : "false");
  }
}
function setLang(next){
  if(next!=="en" && next!=="ja") return;
  lang = next;
  try{ localStorage.setItem(STORE_KEY, next); }catch(_){}
  applyLang();
}
window.__chrSetLang = setLang;

/* ---- Observer: translate anything the game renders later ---- */
var mo = new MutationObserver(function(muts){
  if(applying || lang!=="en") return;
  for(var i=0;i<muts.length;i++){
    var m = muts[i];
    if(m.type==="characterData") translateRoot(m.target);
    else if(m.type==="attributes") translateAttrs(m.target);
    else for(var j=0;j<m.addedNodes.length;j++) translateRoot(m.addedNodes[j]);
  }
});
function startObserver(){
  if(!document.body) return;
  mo.observe(document.body, {childList:true, subtree:true, characterData:true, attributes:true, attributeFilter:ATTRS});
}

/* ---- Toggle visibility: show only on the title main screen.
        While a title detail view (scores / collection / ranking) is open,
        hide the toggle so it never covers that view's close button. ---- */
function syncToggle(){
  var t = document.getElementById("chr-lang-toggle");
  if(!t) return;
  var d = document.getElementById("title-detail");
  var open = !!(d && !d.classList.contains("hidden"));
  t.style.display = open ? "none" : "";
}
function startToggleWatcher(){
  var title = document.getElementById("title");
  if(!title) return;
  try{
    new MutationObserver(function(){ syncToggle(); })
      .observe(title, {attributes:true, attributeFilter:["class"], subtree:true});
  }catch(e){}
  syncToggle();
}

/* ---- Title-screen toggle: top-left, styled to match the existing design ---- */
function buildToggle(){
  if(document.getElementById("chr-lang-toggle")) return;
  var title = document.getElementById("title");
  if(!title) return;
  var st = document.createElement("style");
  st.textContent =
    "#chr-lang-toggle{position:fixed;left:calc(var(--sx,0px) + 10px + env(safe-area-inset-left));top:calc(var(--sy,0px) + 10px + env(safe-area-inset-top));z-index:70;display:flex;gap:0;border:1px solid rgba(255,230,164,.8);border-radius:999px;background:rgba(35,14,10,.88);box-shadow:0 4px 16px rgba(0,0,0,.35);backdrop-filter:blur(6px);overflow:hidden}" +
    "#chr-lang-toggle button{font:900 11px 'Zen Maru Gothic',sans-serif;padding:7px 12px;border:0;border-radius:0;background:transparent;color:#ffe9b5;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:transparent}" +
    "#chr-lang-toggle button.on{background:var(--gold,#f2b73c);color:#1c0f0c}";
  document.head.appendChild(st);
  var wrap = document.createElement("div");
  wrap.id = "chr-lang-toggle";
  wrap.setAttribute("role","group");
  wrap.setAttribute("aria-label","Language / 言語");
  var bJ = document.createElement("button");
  bJ.type = "button"; bJ.id = "chr-lang-ja"; bJ.textContent = "日本語";
  var bE = document.createElement("button");
  bE.type = "button"; bE.id = "chr-lang-en"; bE.textContent = "ENGLISH";
  bJ.addEventListener("click", function(e){ e.stopPropagation(); setLang("ja"); });
  bE.addEventListener("click", function(e){ e.stopPropagation(); setLang("en"); });
  wrap.appendChild(bJ); wrap.appendChild(bE);
  title.appendChild(wrap);
}
function init(){
  buildToggle();
  startObserver();
  startToggleWatcher();
  applyLang();
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded", init);
else init();
})();
