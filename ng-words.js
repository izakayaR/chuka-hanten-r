/**
 * ニックネーム禁止ワードリスト（index.html と同じフォルダに置く）
 *
 * 【出典・ライセンス】
 *  NG_WORDS_JA / NG_WORDS_WORD は、次のリストを元にしています。
 *    List of Dirty, Naughty, Obscene, and Otherwise Bad Words (LDNOOBW)
 *    https://github.com/LDNOOBW/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words
 *    ライセンス：Creative Commons Attribution 4.0 International (CC BY 4.0)
 *    https://creativecommons.org/licenses/by/4.0/
 *  変更点：日本語(ja)・英語(en)リストから、ふつうの名前に使われやすい語（例：ファンタジー、嫌い、ラバー、女の子など）を
 *  除外し、英語は単語単位の判定用に整理した。除外した語は本ファイルには含まれない。
 *
 * 【ニックネーム欄で入力できなくなる条件】
 *  NG_WORDS       ：含まれていたら不可（部分一致）。自分で足す言葉はここ
 *  NG_WORDS_JA    ：含まれていたら不可（部分一致）。LDNOOBW日本語リスト
 *  NG_WORDS_WORD  ：英字の単語として入力されたときだけ不可（例：'ass' は「ass」「big ass」は不可、「class」「Mass」は可）
 *  NG_WORDS_ALLOW ：この言葉を含む部分は判定から除く（誤判定の救済用。例：'ホモサピエンス'）
 *
 * ・ひらがな／カタカナ、大文字／小文字、全角／半角、スペースや記号の混ぜ込みは同じものとして判定される
 * ・追加するときは、各配列の末尾にカンマ区切りで足す
 * ・短い言葉を NG_WORDS / NG_WORDS_JA に入れすぎると、ふつうの名前まで弾くので注意
 */

/* 自分で追加する言葉（部分一致） */
window.NG_WORDS = [
  'ばか', 'あほ', 'しね', 'ころす', 'きもい',
  'fuck', 'shit',
  '🖕',
  // 'ここに追加',
];

/* 誤判定の救済（この言葉を含む部分は無視する） */
window.NG_WORDS_ALLOW = [
  'ホモサピエンス',
  // 'ここに追加',
];

/* LDNOOBW 日本語リスト（部分一致） */
window.NG_WORDS_JA = [
  "g スポット", "s ＆ m", "sm女王", "アジアのかわいい女の子", "アスホール", "アナリングス",
  "アナル", "イラマチオ", "エッチ", "エロティズム", "エロティック", "オーガズム",
  "オカマ", "おしっこ", "おしり", "オシリ", "おしりのあな", "おっぱい",
  "オッパイ", "オナニー", "オマンコ", "おもらし", "お尻", "カント",
  "クリトリス", "グループ・セックス", "クンニリングス", "ゲイ・セックス", "ゲイボーイ", "ゴールデンシャワー",
  "コカイン", "ゴックン", "サディズム", "スウィンガー", "スカートの中", "スカトロ",
  "ストラップオン", "スラット", "セクシーな", "セクシーな 10 代", "セックス", "ソドミー",
  "ちんこ", "ディープ・スロート", "ディック", "ディルド", "デートレイプ", "デブ",
  "テレフォンセックス", "ドッグスタイル", "トップレス", "ニガー", "ヌード", "ネオ・ナチ",
  "ハードコア", "パイパン", "バイブレーター", "バック・スタイル", "パンティー", "ビッチ",
  "ファック", "フィスト", "フェティッシュ", "フェラチオ", "ふたなり", "ぶっかけ",
  "プリンス アルバート ピアス", "ベアバック", "ペニス", "ペニスバンド", "ボールギャグ", "ホモ",
  "ポルノ", "ポルノグラフィー", "ボンテージ", "マザー・ファッカー", "マスターベーション", "まんこ",
  "やりまん", "レイプ", "ローター", "淫乱", "陰毛", "革抑制",
  "騎上位", "巨根", "巨乳", "強姦犯", "玉なめ", "玉舐め",
  "緊縛", "近親相姦", "後背位", "合意の性交", "殺し方", "殺人方法",
  "児童性虐待", "射精", "手コキ", "獣姦", "女装", "新しいポルノ",
  "人妻", "性交", "正常位", "生殖器", "精液", "足フェチ",
  "足を広げる", "大陰唇", "脱衣", "茶色のシャワー", "中出し", "潮吹き女",
  "潮吹き男性", "直腸", "剃毛", "貞操帯", "奴隷", "二穴",
  "乳首", "尿道プレイ", "覗き", "売春婦", "糞", "糞尿愛好症",
  "糞便", "変態", "勃起する", "夢精", "幼児性愛者", "裸の女性",
  "乱交", "両刀", "輪姦", "肛門", "膣",
];

/* LDNOOBW 英語リスト＋日本語リスト内の英字（単語単位で判定） */
window.NG_WORDS_WORD = [
  "2 girls 1 cup", "2g1c", "acrotomophilia", "alabama hot pocket", "alaskan pipeline", "anal",
  "anilingus", "anus", "apeshit", "arsehole", "ass", "asshole",
  "assmunch", "auto erotic", "autoerotic", "babeland", "baby batter", "baby juice",
  "ball gag", "ball gravy", "ball kicking", "ball licking", "ball sack", "ball sucking",
  "bangbros", "bangbus", "bareback", "barely legal", "barenaked", "bastard",
  "bastardo", "bastinado", "bbw", "bdsm", "beaner", "beaners",
  "beastiality", "beaver cleaver", "beaver lips", "bestiality", "big black", "big breasts",
  "big knockers", "big tits", "bimbos", "birdlock", "bitch", "bitches",
  "black cock", "blonde action", "blonde on blonde action", "blow job", "blow your load", "blowjob",
  "blue waffle", "blumpkin", "bollocks", "bondage", "boner", "boob",
  "boobs", "booty call", "brown showers", "brunette action", "bukkake", "bulldyke",
  "bullet vibe", "bullshit", "bung hole", "bunghole", "busty", "buttcheeks",
  "butthole", "camel toe", "camgirl", "camslut", "camwhore", "carpet muncher",
  "carpetmuncher", "chocolate rosebuds", "circlejerk", "cleveland steamer", "clit", "clitoris",
  "clover clamps", "clusterfuck", "cock", "cocks", "coon", "coons",
  "coprolagnia", "coprophilia", "cornhole", "creampie", "cum", "cumming",
  "cumshot", "cumshots", "cunnilingus", "cunt", "darkie", "date rape",
  "daterape", "deep throat", "deepthroat", "dendrophilia", "dick", "dildo",
  "dingleberries", "dingleberry", "dirty pillows", "dirty sanchez", "dog style", "doggie style",
  "doggiestyle", "doggy style", "doggystyle", "dolcett", "domination", "dominatrix",
  "dommes", "donkey punch", "double dong", "double penetration", "dp action", "dry hump",
  "dvda", "eat my ass", "ecchi", "ejaculation", "erotic", "erotism",
  "eunuch", "fag", "faggot", "fecal", "felch", "fellatio",
  "feltch", "female squirting", "femdom", "figging", "fingerbang", "fingering",
  "fisting", "foot fetish", "footjob", "frotting", "fuck", "fuck buttons",
  "fuckin", "fucking", "fucktards", "fudge packer", "fudgepacker", "futanari",
  "g-spot", "gang bang", "gangbang", "gay sex", "genitals", "giant cock",
  "girl on top", "girls gone wild", "goatcx", "goatse", "gokkun", "golden shower",
  "goo girl", "goodpoop", "goregasm", "grope", "group sex", "guro",
  "hand job", "handjob", "hard core", "hardcore", "hentai", "homoerotic",
  "honkey", "horny", "hot carl", "hot chick", "how to kill", "how to murder",
  "huge fat", "humping", "incest", "intercourse", "jack off", "jail bait",
  "jailbait", "jelly donut", "jerk off", "jigaboo", "jiggaboo", "jiggerboo",
  "jizz", "juggs", "kike", "kinbaku", "kinkster", "kinky",
  "knobbing", "leather restraint", "leather straight jacket", "lemon party", "livesex", "lolita",
  "lovemaking", "make me come", "male squirting", "masturbate", "masturbating", "masturbation",
  "menage a trois", "milf", "missionary position", "mong", "motherfucker", "mound of venus",
  "mr hands", "muff diver", "muffdiving", "nambla", "nawashi", "negro",
  "neonazi", "nig nog", "nigga", "nigger", "nimphomania", "nipple",
  "nipples", "nsfw images", "nude", "nudity", "nutten", "nympho",
  "nymphomania", "octopussy", "omorashi", "one cup two girls", "one guy one jar", "orgasm",
  "orgy", "paedophile", "paki", "panties", "panty", "pedobear",
  "pedophile", "pegging", "penis", "phone sex", "piece of shit", "pikey",
  "piss pig", "pissing", "pisspig", "playboy", "pleasure chest", "pole smoker",
  "ponyplay", "poof", "poon", "poontang", "poop chute", "poopchute",
  "porn", "porno", "pornography", "prince albert piercing", "pthc", "pubes",
  "punany", "pussy", "queaf", "queef", "quim", "raghead",
  "raging boner", "rape", "raping", "rapist", "rectum", "reverse cowgirl",
  "rimjob", "rimming", "rosy palm", "rosy palm and her 5 sisters", "rusty trombone", "s&m",
  "sadism", "santorum", "scat", "schlong", "scissoring", "semen",
  "sex", "sexcam", "sexo", "sexual", "sexually", "shaved beaver",
  "shaved pussy", "shemale", "shibari", "shit", "shitblimp", "shitty",
  "shota", "shrimping", "skeet", "slanteye", "slut", "smut",
  "snatch", "snowballing", "sodomize", "sodomy", "spastic", "spic",
  "splooge", "splooge moose", "spooge", "spread legs", "spunk", "strap on",
  "strapon", "strappado", "strip club", "style doggy", "suicide girls", "sultry women",
  "swastika", "swinger", "tainted love", "tea bagging", "threesome", "throating",
  "thumbzilla", "tight white", "tit", "tits", "titties", "titty",
  "topless", "tosser", "towelhead", "tranny", "tribadism", "tub girl",
  "tubgirl", "tushy", "twat", "twink", "twinkie", "two girls one cup",
  "upskirt", "urethra play", "urophilia", "vagina", "venus mound", "vibrator",
  "violet wand", "vorarephilia", "voyeur", "voyeurweb", "voyuer", "vulva",
  "wank", "wet dream", "wetback", "white power", "whore", "worldsex",
  "wrapping men", "wrinkled starfish", "yaoi", "yellow showers", "yiffy", "zoophilia",
];
