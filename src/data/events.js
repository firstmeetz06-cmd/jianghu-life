/**
 * 江湖人生 - 事件数据 v3
 * 人生阶段：baby(0-5) child(6-15) youth(16-20) young(20-35) middle(35-50) old(50+)
 * 分类：growth(成长) dungeon(副本) unexpected(意外) emotional(情感/日常/回血)
 * timeCost 单位：月（15岁前每个事件=12个月=1年）
 * feedback: 选项选完后的反馈文字
 */

export const events = [
  // ========== 幼年 0-5岁 ==========
  { id: 'baby_grow', title: '蹒跚学步', description: '你在母亲的搀扶下，迈出了人生的第一步。', type: 'story', timeCost: 12, stage: ['baby'], category: 'growth', choices: [
    { text: '咯咯笑着继续走', nextEvent: 'baby_play', effects: { health: 5 }, feedback: '你摇摇晃晃地走了几步，母亲在旁边笑得合不拢嘴。' },
    { text: '一屁股坐下啃手指', nextEvent: 'baby_play', effects: { health: 3 }, feedback: '走累了，坐在地上啃手指也很开心。' }
  ]},
  { id: 'baby_play', title: '童年玩伴', description: '你开始和邻居家的孩子们一起玩耍。捉迷藏、追蝴蝶、玩泥巴。', type: 'story', timeCost: 12, stage: ['baby'], category: 'emotional', choices: [
    { text: '和孩子们疯跑', nextEvent: 'baby_event', effects: { health: 8 }, feedback: '你跑得满头大汗，但开心极了。身体也结实了不少。' },
    { text: '一个人安静看蚂蚁', nextEvent: 'baby_event', effects: { knowledge: 3 }, feedback: '你蹲在地上看了半天蚂蚁搬家，觉得这个世界真奇妙。' }
  ]},
  { id: 'baby_event', title: '幼年趣事', description: '你渐渐长大了。有一天，一个江湖艺人路过村子，耍了一套漂亮的拳法。', type: 'story', timeCost: 12, stage: ['baby'], category: 'growth', choices: [
    { text: '跟着比划', effects: { martial: 3, health: 3 }, feedback: '你有模有样地比划了几招，虽然软绵绵的，但艺人笑着夸你有天赋。' },
    { text: '鼓掌叫好', effects: { reputation: 2, charm: 2 }, feedback: '你拍着小手叫好，甜甜的笑容让艺人多看了你几眼。' }
  ]},

  // ========== 童年 6-15岁 ==========
  { id: 'child_start', title: '启蒙', description: '你到了该读书的年纪。家里开始教你识字。', type: 'story', timeCost: 12, stage: ['child'], category: 'growth', choices: [
    { text: '认真读书', effects: { knowledge: 10, reputation: 5 }, feedback: '你日夜苦读，认识了不少字。邻居都夸你聪明好学。' },
    { text: '偷偷溜出去玩', effects: { health: 5, martial: 3 }, feedback: '你翻墙出去和小伙伴们疯跑了一天，身手倒是灵活了不少。' },
    { text: '读书也玩也', effects: { knowledge: 5, health: 3 }, feedback: '你劳逸结合，书读得不错，玩得也开心。' }
  ]},
  { id: 'child_fight', title: '和人打架', description: '村里的大孩子欺负你，把你推倒在地。', type: 'story', timeCost: 12, stage: ['child'], category: 'growth', choices: [
    { text: '打回去', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 10, effects: { martial: 5 }, feedback: '你三拳两脚就把对方打趴了。从此没人敢小看你。' },
          { min: 0, effects: { martial: 5, health: -3 }, feedback: '你虽然被打得鼻青脸肿，但也狠狠还了几拳。从此没人敢小看你。' }
        ] } },
    { text: '去找大人告状', effects: { reputation: -2, knowledge: 3 }, feedback: '你聪明地去找了对方的家长。虽然被嘲笑"告状精"，但问题解决了。' },
    { text: '忍了', effects: { morality: 3, health: -2 }, feedback: '你咬牙忍了下来。虽然委屈，但你学会了忍耐。' }
  ]},
  { id: 'child_adventure', title: '后山探险', description: '你和小伙伴偷偷跑到后山探险。山上有传说中的山洞！', type: 'story', timeCost: 12, stage: ['child'], category: 'unexpected', choices: [
    { text: '进洞看看', effects: { martial: 3, reputation: 5, health: -2 }, feedback: '你在洞里发现了一块奇怪的石头，上面刻着看不懂的符号。胆子也大了不少。' },
    { text: '在洞口看看就走', effects: { knowledge: 3 }, feedback: '你仔细观察了洞口的岩石纹理，觉得大自然真神奇。' },
    { text: '害怕，回去了', effects: { health: 3 }, feedback: '你明智地选择了安全。回家的路上还摘了些野果吃。' }
  ]},
  { id: 'child_learn_skill', title: '学一门手艺', description: '村里的匠人问你要不要学点手艺。铁匠、木匠、织布，你选哪个？', type: 'story', timeCost: 12, stage: ['child'], category: 'growth', choices: [
    { text: '学铁匠', effects: { martial: 5, health: 3, wealth: 500 }, feedback: '你跟着铁匠学打铁。虽然手上磨出了茧子，但力气大了不少，还能赚点零花钱。' },
    { text: '学木匠', effects: { knowledge: 5, charm: 3, wealth: 300 }, feedback: '你学会了做木工活。手艺人的细心让你受益匪浅。' },
    { text: '学织布', effects: { knowledge: 3, charm: 5, wealth: 400 }, feedback: '你学会了织布。手指灵巧了许多，织出来的布还挺好看。' }
  ]},
  { id: 'child_temple', title: '寺庙祈福', description: '过年了，家里带你去山上的寺庙烧香祈福。', type: 'story', timeCost: 12, stage: ['child'], category: 'emotional', choices: [
    { text: '虔诚祈福', effects: { morality: 5, health: 5 }, feedback: '你在佛前诚心祈祷。方丈摸了摸你的头，说你有慧根。' },
    { text: '偷偷溜去看和尚练功', effects: { martial: 5, reputation: 2 }, feedback: '你躲在柱子后面看和尚们练拳。偷偷学了几招，回去自己练。' },
    { text: '在寺里吃素斋', effects: { health: 8, knowledge: 2, charm: [1, 3] }, feedback: '素斋意外地好吃。清淡饮食让你气色好了不少。' }
  ]},

  // ========== 少年 16-20岁·主线 ==========
  { id: 'lazy_morning', title: '偷得浮生', description: '你躺在床上听着窗外鸟鸣，直到肚子咕咕叫才起来。', type: 'story', timeCost: 1, stage: ['youth'], category: 'growth', choices: [
    { text: '去找点吃的', nextEvent: 'village_morning', effects: { health: 10 }, feedback: '你吃了顿饱饭，精神好了不少。' },
    { text: '去村口看看', nextEvent: 'village_morning', effects: {}, feedback: '你决定出去走走看看。' }
  ]},
  { id: 'village_morning', title: '村庄清晨', description: '你走出茅屋，看到村民们已经开始忙碌。村口大槐树下，一位老者正在打拳。', type: 'encounter', timeCost: 1, stage: ['youth'], category: 'growth', choices: [
    { text: '上前请教拳法', nextEvent: 'learn_boxing', effects: { martial: 8, reputation: 5 }, feedback: '老者看你诚心，愿意教你几招。' },
    { text: '去集市逛逛', nextEvent: 'market_visit', effects: { wealth: -200 }, feedback: '你决定去集市见见世面。' },
    { text: '找个地方练功', effects: { martial: 5, health: -3 }, feedback: '你找了一处空地自己练了半天。虽然没章法，但出了一身汗。' }
  ]},
  { id: 'learn_boxing', title: '拳法启蒙', description: '老者看你诚心，教你几招基础拳法。"少年人，拳法讲究根基。"', type: 'martial', timeCost: 3, stage: ['youth'], category: 'growth', choices: [
    { text: '继续请教', nextEvent: 'advanced_teaching', effects: { martial: 12, reputation: 8 }, feedback: '老者见你天赋不错，决定多教你一些。' },
    { text: '道谢离开', effects: { reputation: 5 }, feedback: '你道谢离开，虽然只学了皮毛，但也算入门了。' }
  ]},
  { id: 'advanced_teaching', title: '进阶指导', description: '老者传授了更深层的武学心法。"记住，武学之道在于修心。"', type: 'martial', timeCost: 6, stage: ['youth'], category: 'growth', choices: [
    { text: '拜师学艺', nextEvent: 'become_disciple', effects: { martial: [10, 20], reputation: [5, 15], morality: [5, 12] }, feedback: '你正式拜老者为师。从此每日苦练，武功精进很快。', requirements: { martial: 15 } },
    { text: '独自闯荡', effects: { martial: 5, reputation: 5 }, feedback: '你决定自己去江湖闯闯。虽然功夫还浅，但勇气可嘉。' }
  ]},
  { id: 'become_disciple', title: '拜师入门', description: '老者捋须而笑："好，老夫便收你为徒。"他年轻时是江湖上有名的游侠。', type: 'faction', timeCost: 6, stage: ['youth'], category: 'growth', choices: [
    { text: '潜心修炼', effects: { martial: 20, health: -5 }, feedback: '师父教导严厉，但你的武功进步很快。' },
    { text: '想下山看看', effects: { reputation: 10 }, feedback: '你按捺不住好奇心，想去外面的世界看看。' }
  ]},
  { id: 'market_visit', title: '集市闲逛', description: '集市上人来人往，叫卖声不绝于耳。一个卖艺的正在表演胸口碎大石。', type: 'encounter', timeCost: 1, stage: ['youth','young'], category: 'emotional', choices: [
    { text: '围观喝彩', effects: { reputation: 3, health: 3, charm: [1, 3] }, feedback: '你看得热血沸腾，忍不住叫好。开朗的性格让你更有魅力。' },
    { text: '去茶馆坐坐', nextEvent: 'tea_house', effects: { wealth: -300, knowledge: 5 }, feedback: '你走进茶馆，听说书先生讲江湖故事。' },
    { text: '买点东西', effects: { wealth: -500, health: 5 }, feedback: '你买了些干粮和日用品。' }
  ]},
  { id: 'tea_house', title: '茶馆听书', description: '茶馆里说书先生正在讲江湖故事——少林武当的恩怨、魔教的崛起……', type: 'story', timeCost: 2, stage: ['youth','young','middle'], category: 'emotional', choices: [
    { text: '打听门派消息', nextEvent: 'faction_info', effects: { reputation: 10, knowledge: 5 }, feedback: '你听到了不少门派的消息，对江湖有了更深的了解。' },
    { text: '结识茶客', effects: { reputation: 5, charm: [2, 5], wealth: -300 }, feedback: '你和邻桌的茶客聊得很投机。谈吐之间气质提升了不少。' }
  ]},
  { id: 'faction_info', title: '门派消息', description: '你听说少林、武当、峨眉等名门正派正在招收弟子，魔教也在暗中活动。', type: 'story', timeCost: 1, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '前往少林', nextEvent: 'shaolin_gate', effects: { reputation: 5 }, feedback: '你踏上了前往少林的路。', requirements: { martial: 15 } },
    { text: '前往武当', nextEvent: 'wudang_gate', effects: { reputation: 5 }, feedback: '你踏上了前往武当的路。', requirements: { martial: 15 } },
    { text: '继续修炼', effects: { martial: 3 }, feedback: '你觉得还不够格，决定继续修炼。' }
  ]},
  { id: 'shaolin_gate', title: '少林山门', description: '你来到少林寺山门前，守门僧人上下打量着你。', type: 'faction', timeCost: 2, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '恳请入门', nextEvent: 'shaolin_test', effects: { reputation: 5 }, feedback: '僧人带你去见达摩院首座。', requirements: { reputation: 15 } },
    { text: '展示武艺', nextEvent: 'shaolin_demonstrate', effects: { martial: 3 }, feedback: '你当场打了一套拳法。', requirements: { martial: 25 } }
  ]},
  { id: 'shaolin_test', title: '少林考核', description: '达摩院首座让你扎了半个时辰马步。"根基尚可，留下吧。"', type: 'faction', timeCost: 6, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '正式入门', nextEvent: 'shaolin_training', effects: { martial: [12, 25], reputation: [10, 20], morality: [8, 15] }, feedback: '你正式成为少林弟子。' },
    { text: '规矩太多，告辞', effects: { reputation: 5 }, feedback: '你觉得少林规矩太多，决定离开。' }
  ]},
  { id: 'shaolin_demonstrate', title: '少林献艺', description: '你当场打了一套拳法，守门僧人微微点头。', type: 'faction', timeCost: 3, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '入寺修炼', nextEvent: 'shaolin_training', effects: { martial: 15, reputation: 10, morality: 10 }, feedback: '你进入少林修炼。' },
    { text: '再去别处看看', effects: { reputation: 10 }, feedback: '你决定再去别处看看。' }
  ]},
  { id: 'shaolin_training', title: '少林修行', description: '在少林的日子清苦但充实。每日晨钟暮鼓，练功诵经。', type: 'martial', timeCost: 12, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '继续深造', effects: { reputation: 15, morality: 10 }, check: { attr: 'martial', thresholds: [
          { min: 50, effects: { martial: 20 }, feedback: '你悟性极高，修炼进步神速，已能修炼上乘武功。' },
          { min: 0, effects: { martial: 12 }, feedback: '你勤学苦练，武功稳步提升。' }
        ] } },
    { text: '下山历练', effects: { martial: 10, reputation: 20 }, feedback: '你决定下山去江湖历练。' }
  ]},
  { id: 'wudang_gate', title: '武当山门', description: '武当山云雾缭绕，一位道童在山门前扫地。', type: 'faction', timeCost: 2, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '诚恳请求', nextEvent: 'wudang_test', effects: { reputation: 5 }, feedback: '道童引你去见掌门。', requirements: { reputation: 15 } },
    { text: '展示轻功', nextEvent: 'wudang_demonstrate', effects: { martial: 3 }, feedback: '你纵身一跃翻了几个跟头。', requirements: { martial: 25 } }
  ]},
  { id: 'wudang_test', title: '武当考核', description: '掌门让你在悬崖边站了一个时辰桩。"心性尚可，留下修行吧。"', type: 'faction', timeCost: 6, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '潜心修道', nextEvent: 'wudang_training', effects: { martial: [10, 22], reputation: [10, 18], morality: [8, 15] }, feedback: '你正式成为武当弟子。' },
    { text: '太清苦了', effects: { reputation: 5 }, feedback: '你觉得武当太清苦，决定离开。' }
  ]},
  { id: 'wudang_demonstrate', title: '武当献技', description: '你纵身一跃翻了几个跟头。道童微笑："身手不错，请进。"', type: 'faction', timeCost: 3, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '入山修行', nextEvent: 'wudang_training', effects: { martial: 15, reputation: 10, morality: 10 }, feedback: '你进入武当修炼。' },
    { text: '再去别处', effects: { reputation: 10 }, feedback: '你决定再去别处看看。' }
  ]},
  { id: 'wudang_training', title: '武当修行', description: '在武当的日子宁静致远。每日吐纳练气，修习太极。', type: 'martial', timeCost: 12, stage: ['youth','young'], category: 'dungeon', choices: [
    { text: '继续深造', effects: { reputation: 15, morality: 10, health: 10 }, check: { attr: 'martial', thresholds: [
          { min: 50, effects: { martial: 18 }, feedback: '你领悟了以柔克刚的道理，武功突飞猛进。' },
          { min: 0, effects: { martial: 10 }, feedback: '你慢慢领悟太极之道，武功有所长进。' }
        ] } },
    { text: '下山历练', effects: { martial: 10, reputation: 20 }, feedback: '你决定下山闯荡江湖。' }
  ]},

  // ========== 青年 20-35岁 ==========
  { id: 'young_adventure', title: '闯荡江湖', description: '你带着一身武功踏入真正的江湖。天下之大，何处不可去？', type: 'story', timeCost: 1, stage: ['young'], category: 'growth', choices: [
    { text: '前往繁华城镇', effects: { reputation: 5 }, feedback: '你决定去繁华城镇见见世面。' },
    { text: '游历名山大川', effects: { martial: 5, health: 5, charm: [2, 5] }, feedback: '你游历山水，心胸豁然开朗，气质也脱俗了。' },
    { text: '打听江湖消息', effects: { reputation: 8, knowledge: 3 }, feedback: '你四处打听，了解了不少江湖动态。' }
  ]},
  { id: 'city_adventure', title: '城镇历险', description: '城中鱼龙混杂。你刚进城就看到一伙地痞在欺负一个老汉。', type: 'moral', timeCost: 2, stage: ['young','middle'], category: 'unexpected', choices: [
    { text: '上前解围', effects: { reputation: 15, morality: 15 }, check: { attr: 'martial', thresholds: [
          { min: 40, effects: {}, feedback: '你三拳两脚打跑地痞，老汉感激涕零。' },
          { min: 20, effects: { health: -10 }, feedback: '你拼尽全力打跑地痞，虽然受了些伤，但老汉感激涕零。' }
        ] } },
    { text: '假装没看见', effects: { morality: -10 }, feedback: '你低头走过，心里有些不是滋味。' },
{ text: '报官处理', effects: { reputation: [3, 8], morality: [3, 8] }, feedback: '你去找了官差。虽然慢了点，但问题解决了。' },
  ]},
  { id: 'mountain_travel', title: '游历山川', description: '你登上华山之巅。云海翻涌，天地辽阔。忽然发现悬崖边有一株奇异的草药。', type: 'opportunity', timeCost: 3, stage: ['young','middle'], category: 'unexpected', choices: [
    { text: '冒险采摘', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 50, effects: { health: 20, martial: 5 }, feedback: '你身手敏捷地攀下悬崖，轻松采到灵药！' },
          { min: 30, effects: { health: 5, martial: 3 }, feedback: '你小心翼翼攀下悬崖，采到了灵药，但擦伤了不少。' },
          { min: 0, effects: { health: -15 }, feedback: '你脚下一滑摔了下去，幸好抓住了藤蔓，但受了不轻的伤。' }
        ] } },
    { text: '继续游览', effects: { health: 10, reputation: 5 }, feedback: '你决定不冒这个险，继续欣赏风景。' }
  ]},
  { id: 'seclusion', title: '闭关修炼', description: '你找了一处山洞闭关。日夜打坐运功，将所学融会贯通。', type: 'martial', timeCost: 6, stage: ['young','middle'], category: 'growth', choices: [
    { text: '出关闯荡', effects: { martial: [10, 25], reputation: [5, 15] }, feedback: '你感觉自己的武功又上了一个台阶。' },
{ text: '继续闭关', effects: { martial: [8, 18], health: [-15, -5] }, feedback: '你又闭关了一段时间。虽然武功精进，但身体有些虚弱。' },
  ]},
  { id: 'jianghu_news', title: '江湖传闻', description: '你听到几个传闻：魔教教主重出江湖、武林大会即将召开。', type: 'story', timeCost: 1, stage: ['young','middle'], category: 'dungeon', choices: [
    { text: '前往武林大会', effects: {}, check: { attr: 'reputation', thresholds: [
          { min: 50, effects: { reputation: 20 }, feedback: '你名声在外，受邀坐在贵宾席上。' },
          { min: 30, effects: { reputation: 10 }, feedback: '你挤在人群中观看，也长了不少见识。' },
          { min: 0, effects: { reputation: -3 }, feedback: '门口守卫嫌你无名之辈不让进，你只能在外围听个响。' }
        ] } },
    { text: '不去掺和', effects: {}, feedback: '你觉得还是安分点好。' }
  ]},
{ id: 'martial_arts_congress', title: '武林大会', description: '武林大会在嵩山召开，各路英雄齐聚一堂。', type: 'faction', timeCost: 3, stage: ['young','middle'], category: 'dungeon', choices: [
    { text: '参加比武', nextEvent: 'congress_duel', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 70, effects: { reputation: 15 }, feedback: '你技压群雄，闯入决赛！' },
          { min: 40, effects: { reputation: 5 }, feedback: '你顺利晋级，接下来是高手对决。' },
          { min: 0, effects: { reputation: -3, health: -5 }, feedback: '你勉强过了第一轮，接下来的对手更强。' }
        ] } },
    { text: '观战学习', nextEvent: 'congress_watch', effects: { knowledge: [3, 8] }, feedback: '你仔细观摩高手过招。' },
    { text: '结交英雄', nextEvent: 'congress_social', effects: { reputation: [5, 10], charm: [2, 5] }, feedback: '你开始和各路英雄攀谈。' }
  ]},

  // ========== 谋生 ==========
  { id: 'city_visit', title: '进城谋生', description: '你来到城镇。街上人来人往，有镖局招镖师，有悬赏告示。', type: 'encounter', timeCost: 1, stage: ['youth','young','middle'], category: 'dungeon', choices: [
    { text: '去镖局应聘', nextEvent: 'escort_job', effects: { wealth: 1000, reputation: 5 }, feedback: '你去镖局应聘，总镖头试了你的身手。', requirements: { martial: 15 } },
    { text: '看悬赏告示', nextEvent: 'bounty_board', effects: {}, feedback: '你走到告示栏前看看有什么任务。' },
    { text: '先找个地方住', effects: { wealth: -500 }, feedback: '你先找了家客栈住下。' }
  ]},
  { id: 'escort_job', title: '镖局走镖', description: '总镖头试了你身手："小伙子，跟着走一趟镖吧。"', type: 'encounter', timeCost: 3, stage: ['young','middle'], category: 'dungeon', choices: [
    { text: '接下这趟镖', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 35, effects: { wealth: 2000, reputation: 10 }, feedback: '一路平安，你顺利护镖到达，拿到了丰厚报酬。' },
          { min: 15, effects: { wealth: 1500, reputation: 5, health: -8 }, feedback: '路上遇到几个小毛贼，你击退了他们，但受了些伤。' },
          { min: 0, effects: { wealth: 500, health: -15 }, feedback: '镖被劫了大半，你拼死保住了性命。' }
        ] } },
    { text: '问问有没有更危险的', effects: { wealth: 1000, reputation: 5 }, feedback: '总镖头给你安排了条更难的路线。', requirements: { martial: 30 } }
  ]},
  { id: 'bounty_board', title: '悬赏告示', description: '告示上写着：近日有采花大盗出没，官府悬赏缉拿。', type: 'encounter', timeCost: 1, stage: ['young','middle'], category: 'dungeon', choices: [
    { text: '接下悬赏', effects: { morality: 10 }, check: { attr: 'martial', thresholds: [
          { min: 50, effects: { wealth: 5000, reputation: 20 }, feedback: '你轻松擒获采花大盗，赏金丰厚！' },
          { min: 30, effects: { wealth: 3000, reputation: 15, health: -10 }, feedback: '你经过一番苦战终于擒获大盗，但受了伤。' },
          { min: 0, effects: { reputation: -5, health: -20 }, feedback: '你打不过采花大盗，差点丧命。' }
        ] } },
    { text: '太危险了', effects: {}, feedback: '你决定不冒这个险。' }
  ]},
  { id: 'find_work', title: '谋生计', description: '你需要赚银两。城中有些活计——酒楼跑堂、码头扛包、教人拳脚。', type: 'story', timeCost: 2, stage: ['youth','young','middle'], category: 'emotional', choices: [
    { text: '去酒楼帮忙', effects: { wealth: 800, reputation: 3 }, feedback: '你在酒楼干了一个月，赚了些银两。' },
    { text: '码头扛包', effects: { wealth: 1200, health: -5 }, feedback: '你在码头扛了一个月包，虽然累但赚得多。' },
    { text: '教人拳脚', effects: { wealth: 1000, reputation: 5, martial: 3 }, feedback: '你教了几个学生，教学相长。', requirements: { martial: 20 } }
  ]},
  { id: 'village_rest', title: '村庄休养', description: '你回到村里休息了几天。村民们热情招待你。', type: 'story', timeCost: 2, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '继续休息', effects: { health: 15 }, feedback: '你好好休息了几天，精神恢复了不少。' },
    { text: '该上路了', effects: { reputation: 3 }, feedback: '你告别村民，继续赶路。' }
  ]},

  // ========== 感情 ==========
  { id: 'romance_encounter', title: '邂逅', description: '你在偶然中遇到一位令你心动的人。四目相对，似乎有千言万语。', type: 'romance', timeCost: 1, stage: ['young','middle'], category: 'emotional', choices: [
    { text: '上前搭话', nextEvent: 'romance_date', effects: { charm: [2, 5] }, feedback: '你鼓起勇气搭话，对方微微一笑。' },
    { text: '默默离开', effects: { morality: 3 }, feedback: '你犹豫了一下，最终没有开口。' }
  ]},
  { id: 'romance_develop', title: '情愫渐生', description: '你们已经相处了一段时间，彼此有了默契。', type: 'romance', timeCost: 2, stage: ['young','middle'], category: 'emotional', choices: [
    { text: '表白心意', nextEvent: 'romance_confess', effects: { charm: [2, 5] }, feedback: '你觉得时机成熟了。' },
    { text: '保持现状', effects: { health: [5, 10] }, feedback: '你们继续这样相处着，也不错。' }
  ]},

  // ========== 壮年 35-50岁 ==========
  { id: 'middle_age', title: '壮年之境', description: '多年江湖历练让你名声渐起。', type: 'story', timeCost: 1, stage: ['middle'], category: 'growth', choices: [
    { text: '开宗立派', nextEvent: 'founding_sect', effects: { reputation: 20 }, feedback: '你决定建立自己的门派。', requirements: { martial: 60, reputation: 50 } },
    { text: '继续行侠仗义', effects: { reputation: [5, 15] }, feedback: '你继续在江湖上行侠仗义。' },
    { text: '退隐幕后', effects: { wealth: 2000 }, feedback: '你决定过几天安生日子。' }
  ]},
  { id: 'founding_sect', title: '开宗立派', description: '你选了一处山清水秀之地建立门派。消息传出，不少年轻人前来拜师。', type: 'faction', timeCost: 6, stage: ['middle','old'], category: 'dungeon', choices: [
    { text: '悉心教导弟子', effects: { reputation: [15, 30], martial: [5, 15], morality: [5, 12] }, feedback: '你的门派日渐兴旺，弟子们都以你为荣。' },
    { text: '扩张门派势力', effects: { reputation: 20, wealth: -3000 }, feedback: '你花了大量银两扩张门派。' }
  ]},
  { id: 'duel', title: '高手对决', description: '一位成名高手向你下战书。"久闻大名，今日特来讨教！"', type: 'danger', timeCost: 1, stage: ['middle'], category: 'dungeon', choices: [
    { text: '全力以赴', effects: { reputation: 25 }, check: { attr: 'martial', thresholds: [
          { min: 60, effects: { martial: 15 }, feedback: '你游刃有余地击败对手，名声大振！' },
          { min: 40, effects: { martial: 15, health: -10 }, feedback: '一场恶战！你险胜对手，名声大振。' },
          { min: 0, effects: { martial: 5, health: -25 }, feedback: '对手远胜于你，你被打得落花流水，侥幸保命。' }
        ] } },
    { text: '点到为止', effects: { martial: 10, reputation: 15, morality: 10 }, feedback: '你们切磋了一番，不分胜负。惺惺相惜。' }
  ]},
  { id: 'middle_retire', title: '半隐江湖', description: '你在城中置了宅院，过着半隐居的生活。', type: 'story', timeCost: 6, stage: ['middle'], category: 'emotional', choices: [
    { text: '安心养老', effects: { health: 15, wealth: 2000 }, feedback: '你过了一段安稳日子，身体好了不少。' },
    { text: '忍不住重出江湖', effects: { reputation: 5 }, feedback: '你终究放不下江湖。' }
  ]},
  { id: 'grudge_event', title: '旧仇寻衅', description: '你年轻时得罪过的人找上门来。一群人围住你的住处。', type: 'danger', timeCost: 1, stage: ['middle','old'], category: 'unexpected', choices: [
    { text: '奋力迎战', effects: { reputation: 15 }, check: { attr: 'martial', thresholds: [
          { min: 70, effects: { martial: 10 }, feedback: '你轻松击退来犯之敌，威名远扬。' },
          { min: 45, effects: { martial: 10, health: -15 }, feedback: '你拼死击退敌人，虽然受了伤，但守住了尊严。' },
          { min: 0, effects: { health: -30 }, feedback: '你寡不敌众，被打成重伤，勉强逃走。' }
        ] } },
    { text: '化解恩怨', effects: { morality: [10, 20], reputation: [3, 10] }, feedback: '你以德报怨，化解了这段恩怨。', requirements: { reputation: 40 } },
    { text: '暂避锋芒', effects: { reputation: -10 }, feedback: '你暂时避其锋芒。' }
  ]},

  // ========== 老年 50+岁 ==========
  { id: 'old_age', title: '暮年回望', description: '你已不再年轻，鬓角染上白霜。回望一生，江湖恩怨仿佛过眼云烟。', type: 'story', timeCost: 1, stage: ['old'], category: 'emotional', choices: [
    { text: '传功弟子', nextEvent: 'pass_on_legacy', effects: { reputation: 15, morality: 10 }, feedback: '你决定将毕生所学传给后辈。' },
    { text: '归隐山林', nextEvent: 'ending_hermit', effects: {}, feedback: '你看透了江湖纷争，选择归隐。' },
    { text: '著书立说', nextEvent: 'write_book', effects: { reputation: 20, knowledge: 10 }, feedback: '你决定把一生的经历写成书。' }
  ]},
  { id: 'pass_on_legacy', title: '传功授艺', description: '你将毕生所学传授给得意弟子。看着年轻人眼中的光芒，你无比欣慰。', type: 'martial', timeCost: 6, stage: ['old'], category: 'emotional', choices: [
    { text: '安享晚年', nextEvent: 'ending_peaceful', effects: { reputation: [5, 15] }, feedback: '你功成身退，安享晚年。' },
    { text: '云游四方', nextEvent: 'ending_wanderer', effects: { reputation: 5 }, feedback: '你背上行囊，踏上最后的旅程。' }
  ]},
  { id: 'write_book', title: '著书立说', description: '你将一生的武学心得和江湖见闻写成书。', type: 'story', timeCost: 12, stage: ['old'], category: 'emotional', choices: [
    { text: '归隐田园', nextEvent: 'ending_peaceful', effects: { reputation: 15 }, feedback: '书写完了，你决定归隐。' },
    { text: '继续写续篇', nextEvent: 'ending_legend', effects: { reputation: 20 }, feedback: '你觉得还不够，决定继续写。' }
  ]},

  // ========== 随机事件·回血/日常（emotional） ==========
  { id: 'random_inn_rest', title: '客栈歇脚', description: '你走进一家客栈，点了一壶热茶几个小菜。', type: 'story', timeCost: 1, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '开间房好好睡一觉', effects: { health: 20, charm: [1, 3], wealth: -500 }, feedback: '你一觉睡到自然醒，精神焕发，气色也好了。' },
    { text: '打听附近消息', effects: { health: 8, reputation: 3 }, feedback: '你和店家聊了聊，听到不少趣事。' },
    { text: '和店家聊天', effects: { health: 10, wealth: -200 }, feedback: '店家给你加了两个菜，聊得很开心。' }
  ]},
  { id: 'random_doctor', title: '求医问药', description: '你路过一家医馆，挂着"妙手回春"的牌匾。', type: 'story', timeCost: 2, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '请大夫看看', effects: { health: 25, charm: [1, 3], wealth: -1500 }, feedback: '大夫给你开了几副药，吃了之后好多了，面色也红润了。' },
    { text: '买些药备着', effects: { health: 12, wealth: -800 }, feedback: '你买了一些常用药备着。' },
    { text: '还撑得住', effects: {}, feedback: '你觉得没什么大碍，继续赶路。' }
  ]},
  { id: 'random_hotspring', title: '温泉沐浴', description: '你在山中发现一处天然温泉，热气氤氲。', type: 'story', timeCost: 1, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '泡个痛快', effects: { health: 20, charm: [1, 4] }, feedback: '温泉泡得你浑身舒坦，皮肤也细腻了不少。' },
    { text: '泡温泉顺便练功', effects: { health: 15, martial: 3 }, feedback: '你在温泉里运功，感觉内力有所增长。' }
  ]},
  { id: 'random_meal', title: '酒楼吃饭', description: '你路过一家酒楼，饭菜香味扑鼻。', type: 'story', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '大吃一顿', effects: { health: 12, wealth: -500 }, feedback: '你点了一桌子菜，吃得心满意足。' },
    { text: '随便吃碗面', effects: { health: 8, wealth: -200 }, feedback: '一碗热汤面下肚，舒服多了。' },
    { text: '忍忍算了', effects: { health: -3 }, feedback: '你饿着肚子继续赶路。' }
  ]},
  { id: 'random_fishing', title: '湖边垂钓', description: '碧绿的湖边波光粼粼，你坐下来钓会儿鱼。', type: 'story', timeCost: 1, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '安静钓鱼', effects: { health: 15, wealth: 300 }, feedback: '你钓了几条鱼，心情平静。' },
    { text: '钓到大鱼去卖', effects: { health: 10, wealth: 800 }, feedback: '你钓到一条大鱼，卖了个好价钱。' },
    { text: '钓着钓着睡着了', effects: { health: 18 }, feedback: '你在湖边睡了一觉，醒来神清气爽。' }
  ]},
  { id: 'random_nap', title: '树下小憩', description: '一棵大树下凉风习习，你靠着树干打起了盹。', type: 'story', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '好好睡一觉', effects: { health: 10 }, feedback: '你小憩了一会儿，精神好了不少。' },
    { text: '打坐运功', effects: { health: 8, martial: 2 }, feedback: '你闭目运功，内力有所精进。' },
    { text: '继续赶路', effects: {}, feedback: '你没有停留，继续赶路。' }
  ]},
  { id: 'random_opera', title: '戏台听戏', description: '镇上搭了戏台，正在唱一出《霸王别姬》。', type: 'story', timeCost: 1, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '看完再走', effects: { health: 8, knowledge: 3, charm: [1, 3] }, feedback: '你看完了整出戏，感慨万千。戏曲的韵味让你多了几分儒雅。' },
    { text: '给戏班子打赏', effects: { health: 5, wealth: -500, reputation: 5 }, feedback: '你大方打赏，戏班子特意谢了你。' },
    { text: '不懂戏', effects: {}, feedback: '你看了一会儿看不懂，就走了。' }
  ]},
  { id: 'random_lantern', title: '花灯夜市', description: '恰逢佳节，街上挂满花灯。人来人往，处处欢声笑语。', type: 'story', timeCost: 1, stage: ['youth','young','middle'], category: 'emotional', choices: [
    { text: '逛夜市买小吃', effects: { health: 10, charm: [1, 4], wealth: -500 }, feedback: '你买了些小吃，还顺便挑了个好看的发簪。' },
    { text: '猜灯谜赢奖品', effects: { reputation: 5, wealth: 500, knowledge: 3 }, feedback: '你连猜对三个灯谜，赢了个漂亮的灯笼。' },
    { text: '看烟火表演', effects: { health: 8 }, feedback: '漫天烟火，美不胜收。' }
  ]},
  { id: 'random_temple_fair', title: '逛庙会', description: '山上寺庙办庙会，善男信女络绎不绝。', type: 'story', timeCost: 1, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '上柱香求平安', effects: { health: 10, wealth: -300 }, feedback: '你虔诚地上了一柱香。' },
    { text: '看热闹', effects: { health: 5, reputation: 2 }, feedback: '你看了一场精彩的杂耍表演。' },
    { text: '买些土特产', effects: { wealth: -800, health: 5, charm: [2, 5] }, feedback: '你买了些特产和一件漂亮的衣服。' }
  ]},
  { id: 'random_stargazing', title: '夜观星象', description: '夜晚你躺在屋顶看星星。银河横贯天际。', type: 'story', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '静静欣赏', effects: { health: 10 }, feedback: '星空很美，你的心情平静了下来。' },
    { text: '感悟天地', effects: { health: 5, martial: 3 }, feedback: '你从星空中领悟了一些武学道理。' },
    { text: '早些休息', effects: { health: 8 }, feedback: '你看了一会儿就回去睡了。' }
  ]},
  { id: 'random_cooking', title: '自己做饭', description: '你找了个地方生火做饭。手艺一般，但热乎乎的饭菜让人满足。', type: 'story', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '慢慢享用', effects: { health: 10 }, feedback: '你吃得心满意足。' },
    { text: '做多了分给旁人', effects: { health: 5, morality: 5 }, feedback: '你把多的饭菜分给了路过的旅人。' }
  ]},

  // ========== 随机事件·NPC互动（emotional） ==========
  { id: 'random_scholar', title: '偶遇书生', description: '路边一个书生摇头晃脑背诗。看到你眼睛一亮："这位兄台，可懂诗词？"', type: 'encounter', timeCost: 1, stage: ['youth','young','middle'], category: 'emotional', choices: [
    { text: '和他聊诗词', effects: { knowledge: 8, reputation: 3, charm: [2, 5] }, feedback: '你们聊得很投机，诗词歌赋让你多了几分书卷气。' },
    { text: '教他几招防身术', effects: { martial: 3, reputation: 5 }, feedback: '你教了书生几招，他感激不已。' },
    { text: '说自己是粗人', effects: { reputation: 2 }, feedback: '你笑着摆摆手，书生也不勉强。' }
  ]},
  { id: 'random_beggar', title: '乞丐搭话', description: '一个蓬头垢面的乞丐拦住你。"给口吃的吧？"但你注意到他眼神异常锐利。', type: 'encounter', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '给他些吃的', effects: { morality: 5, wealth: -200 }, feedback: '你给了他一些食物。他道了声谢就走了。' },
    { text: '观察他', effects: { martial: 3, knowledge: 2 }, feedback: '你仔细观察，发现这乞丐步法稳健，绝非普通人。' },
    { text: '不理他', effects: {}, feedback: '你绕开他继续走。' }
  ]},
  { id: 'random_merchant', title: '行商遇劫', description: '一个商人跪在路边哭泣，说货物被劫匪抢了。', type: 'moral', timeCost: 2, stage: ['youth','young','middle'], category: 'unexpected', choices: [
    { text: '帮他追回货物', effects: { reputation: 15, morality: 12, wealth: 2000 }, check: { attr: 'martial', thresholds: [
          { min: 40, effects: {}, feedback: '你轻松追上劫匪，夺回货物。商人重谢你。' },
          { min: 20, effects: { health: -10 }, feedback: '你拼力追上劫匪，夺回了货物，但受了些伤。商人重谢你。' },
          { min: 0, effects: { health: -15, wealth: 500 }, feedback: '你打不过劫匪，只抢回一小部分货物。' }
        ] } },
    { text: '给他些盘缠', effects: { morality: 8, wealth: -1000 }, feedback: '你给了他一些银两做路费。' },
    { text: '爱莫能助', effects: { morality: -3 }, feedback: '你叹了口气，继续赶路。' }
  ]},
  { id: 'random_girl', title: '小姑娘问路', description: '一个扎小辫的姑娘怯生生拉住你："大哥哥/大姐姐，去集市怎么走？"', type: 'story', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '带她去', effects: { morality: 8, health: 3 }, feedback: '你牵着她的手走到集市，她甜甜地说了声谢谢。' },
    { text: '指路给她', effects: { morality: 3 }, feedback: '你给她指了方向。' },
    { text: '给她买个糖人', effects: { morality: 5, wealth: -100, health: 5 }, feedback: '你给她买了个糖人，她开心地笑了。' }
  ]},
  { id: 'random_old_fisher', title: '老渔夫', description: '河边老渔夫正在收网。"年轻人，来帮忙搭把手？"', type: 'encounter', timeCost: 1, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '帮忙收网', effects: { health: 5, wealth: 500, morality: 3 }, feedback: '你帮老渔夫收了网，他送了你几条鱼。' },
    { text: '请教钓鱼技巧', effects: { wealth: 300, knowledge: 3 }, feedback: '老渔夫教你几招钓鱼的诀窍。' },
    { text: '聊聊天', effects: { health: 5, knowledge: 3 }, feedback: '老渔夫给你讲了不少河边的故事。' }
  ]},
  { id: 'random_monk', title: '化缘僧人', description: '一个僧人托钵化缘。"施主，可否布施一碗斋饭？"', type: 'encounter', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '布施斋饭', effects: { morality: 8, wealth: -300 }, feedback: '僧人双手合十道谢，你心中一阵暖意。' },
    { text: '请教佛法', effects: { morality: 5, health: 5 }, feedback: '僧人给你讲了一段佛法，你若有所悟。' },
    { text: '问他会不会武功', effects: { martial: 3, knowledge: 2 }, feedback: '僧人微微一笑，给你演示了一招。' }
  ]},
  { id: 'random_thief', title: '小偷被抓', description: '街上一群人围着一个小偷拳打脚踢。小偷不过十几岁，瘦得皮包骨。', type: 'moral', timeCost: 0, stage: ['youth','young','middle','old'], category: 'emotional', choices: [
    { text: '劝众人住手', effects: { morality: 10, reputation: 5 }, feedback: '你劝住了众人，把小偷交给了官差。' },
    { text: '给小偷些吃的', effects: { morality: 8, wealth: -200 }, feedback: '你悄悄塞给他一些食物。' },
    { text: '不管', effects: {}, feedback: '你没有插手。' }
  ]},
  { id: 'random_blacksmith', title: '铁匠铺', description: '你路过铁匠铺，炉火通红，铁锤叮当。', type: 'encounter', timeCost: 1, stage: ['youth','young','middle'], category: 'unexpected', choices: [
    { text: '买把兵器', effects: { martial: 8, charm: [2, 5], wealth: -1500 }, feedback: '你买了一把趁手的兵器，佩在身上英姿勃发。' },
    { text: '看他打铁', effects: { martial: 3 }, feedback: '你仔细观察铁匠的手法，领悟了一些发力的技巧。' },
    { text: '请他修修家伙', effects: { martial: 5, wealth: -500 }, feedback: '铁匠把你的兵器修得锋利无比。' }
  ]},

  // ========== 随机事件·危险（unexpected） ==========
  { id: 'random_bandit', title: '路遇劫匪', description: '山路上突然跳出几个蒙面劫匪！"留下买路财！"', type: 'danger', timeCost: 1, stage: ['young','middle'], category: 'unexpected', choices: [
    { text: '奋力抵抗', effects: { reputation: 15 }, check: { attr: 'martial', thresholds: [
          { min: 40, effects: { martial: 5 }, feedback: '你轻松制服劫匪，将他们扭送官府。' },
          { min: 20, effects: { martial: 10, health: -8 }, feedback: '你击退了劫匪，但受了些伤。' },
          { min: 0, effects: { health: -20 }, feedback: '你打不过劫匪，被打了一顿，钱财也被抢了。' }
        ] } },
    { text: '交出钱财', effects: { wealth: -2000 }, feedback: '你破财消灾。' },
    { text: '逃跑', effects: { health: -5, reputation: -5 }, feedback: '你撒腿就跑。虽然狼狈，但保住了钱财。' }
  ]},
  { id: 'random_sick', title: '染上风寒', description: '连日赶路让你染上风寒，浑身发冷。', type: 'danger', timeCost: 2, stage: ['youth','young','middle','old'], category: 'unexpected', choices: [
    { text: '找大夫看病', effects: { health: 15, wealth: -1000 }, feedback: '大夫给你开了药，吃了几天好多了。' },
    { text: '硬撑着赶路', effects: { health: -15 }, feedback: '你硬撑着走了几天，病情加重了。' },
    { text: '找个地方歇息', effects: { health: 8 }, feedback: '你找了个地方休息了几天。' }
  ]},
  { id: 'random_poison', title: '误食毒物', description: '你不小心吃了有毒的野果，肚子翻江倒海。', type: 'danger', timeCost: 1, stage: ['youth','young','middle','old'], category: 'unexpected', choices: [
    { text: '催吐', effects: { health: -10 }, feedback: '你吐了个干净，虽然难受但保住了命。' },
    { text: '找草药解毒', effects: {}, check: { attr: 'knowledge', thresholds: [
          { min: 30, effects: { knowledge: 3 }, feedback: '你准确辨认出解毒草药，药到病除。' },
          { min: 10, effects: { health: -3 }, feedback: '你找到了一些草药，效果一般但总算解了毒。' },
          { min: 0, effects: { health: -8 }, feedback: '你随便找了些草药吃，差点雪上加霜。' }
        ] } },
    { text: '硬扛过去', effects: { health: -15 }, feedback: '你硬扛了一天，差点没扛过去。' }
  ]},
  { id: 'random_cliff', title: '悬崖遇险', description: '你抄近路走悬崖小道，脚下一滑险些跌落！', type: 'danger', timeCost: 0, stage: ['youth','young','middle','old'], category: 'unexpected', choices: [
    { text: '稳住身形', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 20, effects: { martial: 3 }, feedback: '你一个鹞子翻身稳稳站住，虚惊一场。' },
          { min: 0, effects: { health: -5 }, feedback: '你勉强稳住，但还是擦伤了。' }
        ] } },
    { text: '攀岩上去', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 30, effects: { martial: 5 }, feedback: '你身手矫健地攀了上去，轻功大有长进。' },
          { min: 10, effects: { martial: 3, health: -5 }, feedback: '你艰难地攀了上去，擦破了些皮。' },
          { min: 0, effects: { health: -12 }, feedback: '你手滑摔了下来，幸好没出大事。' }
        ] } },
    { text: '退回原路', effects: { health: -3 }, feedback: '你小心翼翼地退了回去。' }
  ]},
  { id: 'random_snake', title: '毒蛇拦路', description: '一条毒蛇盘在路中间，吐着信子盯着你。', type: 'danger', timeCost: 0, stage: ['youth','young','middle','old'], category: 'unexpected', choices: [
    { text: '绕道而行', effects: {}, feedback: '你绕了一圈，安全通过。' },
    { text: '抓蛇取胆', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 30, effects: { health: 5, wealth: 500 }, feedback: '你眼疾手快抓住了蛇，蛇胆可是好东西。' },
          { min: 15, effects: { wealth: 300 }, feedback: '你费了好大劲才抓住蛇，取了蛇胆。' },
          { min: 0, effects: { health: -10 }, feedback: '蛇咬了你一口！你忍痛把它赶跑了。' }
        ] } },
    { text: '打草惊蛇', effects: { health: -3 }, feedback: '你用树枝把蛇赶走了。' }
  ]},
  { id: 'random_betrayal', title: '遭人背叛', description: '你信任的朋友竟在背后捅了你一刀，卷走了钱财。', type: 'danger', timeCost: 1, stage: ['young','middle'], category: 'unexpected', choices: [
    { text: '追讨公道', effects: { reputation: 10 }, check: { attr: 'martial', thresholds: [
          { min: 50, effects: { wealth: 2000 }, feedback: '你追上了他，狠狠教训了一顿，讨回了全部钱财。' },
          { min: 30, effects: { wealth: 1000, health: -10 }, feedback: '你追上了他，讨回了部分钱财，但挨了几拳。' },
          { min: 0, effects: { health: -15 }, feedback: '你根本追不上他，白跑一趟还扭伤了脚。' }
        ] } },
    { text: '当买个教训', effects: { knowledge: 5 }, feedback: '你长了个心眼，以后看人要更准。' },
    { text: '发誓报仇', effects: { reputation: 5 }, feedback: '你发誓一定要讨回公道。' }
  ]},

  // ========== 随机事件·童年/幼年 ==========
  { id: 'random_baby_lost', title: '走丢了', description: '你在集市上和家人走散了，害怕得大哭起来。', type: 'story', timeCost: 12, stage: ['baby','child'], category: 'emotional', choices: [
    { text: '站在原地等', effects: { morality: 3 }, feedback: '你乖乖站在原地，不一会儿家人就找来了。' },
    { text: '自己找路', effects: { martial: 1, knowledge: 2 }, feedback: '你凭着记忆找到了回家的路。' },
    { text: '大哭引来好心人', effects: { morality: 2 }, feedback: '一个好心的婶婶把你送回了家。' }
  ]},
  { id: 'random_baby_animal', title: '小动物', description: '你在院子里发现一只受伤的小鸟。', type: 'story', timeCost: 12, stage: ['baby','child'], category: 'emotional', choices: [
    { text: '小心翼翼照顾它', effects: { morality: 8, health: 3 }, feedback: '你细心照顾小鸟，它慢慢好了起来。' },
    { text: '叫大人来帮忙', effects: { morality: 5 }, feedback: '大人帮你包扎了小鸟的伤口。' },
    { text: '不管它', effects: { morality: -3 }, feedback: '你转身走了。' }
  ]},
  { id: 'random_baby_rain', title: '下雨天', description: '外面下起大雨，你被困在屋里。', type: 'story', timeCost: 12, stage: ['baby','child'], category: 'growth', choices: [
    { text: '听母亲讲故事', effects: { knowledge: 5, morality: 3 }, feedback: '母亲给你讲了一个有趣的故事。' },
    { text: '看父亲写字', effects: { knowledge: 5, charm: 2 }, feedback: '你看着父亲写字，觉得那些笔画真好看。' },
    { text: '趴在窗边看雨', effects: { health: 3 }, feedback: '你看着雨滴从屋檐落下，觉得很好看。' }
  ]},
  { id: 'random_child_teacher', title: '私塾先生', description: '私塾先生夸你功课好，奖励你一支毛笔。', type: 'story', timeCost: 12, stage: ['child'], category: 'growth', choices: [
    { text: '更加用功', effects: { knowledge: 8, reputation: 3 }, feedback: '你更加努力读书，成绩越来越好。' },
    { text: '得意洋洋', effects: { reputation: 3, charm: 2 }, feedback: '你拿着毛笔到处炫耀。' }
  ]},
  { id: 'random_child_steal', title: '偷果子', description: '你看到邻居家院子里桃子熟了，馋得直流口水。', type: 'story', timeCost: 12, stage: ['child'], category: 'emotional', choices: [
    { text: '偷偷摘几个', effects: { health: 3, morality: -5 }, feedback: '你偷偷摘了几个桃子，甜极了。' },
    { text: '问邻居要', effects: { morality: 5, reputation: 2 }, feedback: '邻居大方地给了你一篮子桃子。' },
    { text: '忍住不吃', effects: { morality: 3 }, feedback: '你咽了咽口水，忍住了。' }
  ]},
  { id: 'random_child_hurt', title: '摔了一跤', description: '你爬树时不小心摔了下来，膝盖磕破了皮。', type: 'story', timeCost: 12, stage: ['child'], category: 'unexpected', choices: [
    { text: '哭着回家找母亲', effects: { health: 5 }, feedback: '母亲心疼地给你上了药。' },
    { text: '拍拍土继续玩', effects: { health: -3, martial: 2 }, feedback: '你咬咬牙继续玩。这点小伤不算什么。' }
  ]},

  // ========== 随机事件·老年 ==========
  { id: 'random_old_rival', title: '故人来访', description: '一位年轻时的对手前来拜访。两人都已白发苍苍。', type: 'story', timeCost: 1, stage: ['old'], category: 'emotional', choices: [
    { text: '把酒言欢', effects: { health: 10, reputation: 5 }, feedback: '你们把酒言欢，回忆往昔。' },
    { text: '切磋一下', effects: { martial: 5, health: -5 }, feedback: '你们切磋了一番，虽然老了但功夫还在。' },
    { text: '往事不提', effects: { morality: 5 }, feedback: '你微微一笑，往事如烟。' }
  ]},
  { id: 'random_legacy', title: '后辈来访', description: '一群年轻人慕名前来，想听你讲当年的江湖故事。', type: 'story', timeCost: 1, stage: ['old'], category: 'emotional', choices: [
    { text: '讲述往事', effects: { reputation: 10, morality: 5 }, feedback: '你讲了当年的故事，年轻人听得入迷。' },
    { text: '指点他们武功', effects: { martial: 3, reputation: 5 }, feedback: '你给年轻人指点了几个要点。' },
    { text: '让他们回去', effects: {}, feedback: '你摆摆手，今天不想多说。' }
  ]},
  { id: 'random_illness', title: '旧伤复发', description: '年轻时留下的旧伤开始发作。', type: 'danger', timeCost: 3, stage: ['old'], category: 'unexpected', choices: [
    { text: '求医问药', effects: { health: 10, wealth: -2000 }, feedback: '大夫给你开了药方，吃了之后好了些。' },
    { text: '以武健身', effects: { health: 5, martial: -5 }, feedback: '你坚持练功，虽然旧伤疼痛但身体还行。' },
    { text: '坦然面对', effects: { morality: 10 }, feedback: '你觉得这就是岁月的代价，坦然接受。' }
  ]},



  // ========== 武林大会后续 ==========
  { id: 'congress_duel', title: '大会决赛', description: '你站在擂台上，对面是一位成名已久的高手。台下千人瞩目。', type: 'danger', timeCost: 1, stage: ['young','middle'], category: 'dungeon', choices: [
    { text: '全力一搏', effects: { reputation: [10, 25] }, check: { attr: 'martial', thresholds: [
          { min: 80, effects: { martial: [10, 20], reputation: 20 }, feedback: '你以精妙的招式击败对手，夺得大会魁首！从此名震天下。' },
          { min: 50, effects: { martial: [5, 15], health: -8 }, feedback: '一场激战，你惜败对手，但赢得了满堂喝彩。' },
          { min: 0, effects: { health: -15, reputation: -5 }, feedback: '对手远胜于你，你被打下擂台。' }
        ] } },
    { text: '认输下台', effects: { morality: 5, reputation: -3 }, feedback: '你知道差距，主动认输。有人笑你怯懦，有人说你识时务。' }
  ]},
  { id: 'congress_watch', title: '观战领悟', description: '你坐在台下，看着高手们过招。忽然领悟了一些武学奥义。', type: 'martial', timeCost: 1, stage: ['young','middle'], category: 'growth', choices: [
    { text: '默默记下', effects: { martial: [5, 15], knowledge: [3, 8] }, feedback: '你把看到的招式记在心里，回去慢慢琢磨。' },
    { text: '找高手请教', effects: { martial: [3, 10], reputation: [3, 8] }, feedback: '你趁间歇找了几位高手请教，收获颇丰。' }
  ]},
  { id: 'congress_social', title: '英雄宴', description: '大会结束后的英雄宴上，各路豪杰推杯换盏。', type: 'encounter', timeCost: 1, stage: ['young','middle'], category: 'emotional', choices: [
    { text: '豪饮结交', effects: { reputation: [10, 20], charm: [2, 5], health: -3 }, feedback: '你和几位豪杰喝得痛快，豪爽的性格让人印象深刻。' },
    { text: '少喝多聊', effects: { reputation: [5, 12], knowledge: [3, 8] }, feedback: '你酒量不大但谈吐不凡，给人留下了好印象。' },
    { text: '打听到宝物消息', nextEvent: 'congress_rumor', effects: { knowledge: 5 }, feedback: '你听到了一个关于藏宝图的传闻。' }
  ]},
  { id: 'congress_rumor', title: '藏宝图传闻', description: '有人说在西域古墓中藏有前朝武学秘籍，但去过的人都没回来。', type: 'opportunity', timeCost: 2, stage: ['young','middle'], category: 'dungeon', choices: [
    { text: '前往寻宝', effects: {}, check: { attr: 'martial', thresholds: [
          { min: 60, effects: { martial: [15, 30], knowledge: [5, 10] }, feedback: '你找到了古墓，获得了珍贵的武学秘籍！' },
          { min: 30, effects: { health: -15, knowledge: 5 }, feedback: '你在古墓中遇到了机关陷阱，受了伤，但学到了一些东西。' },
          { min: 0, effects: { health: -30 }, feedback: '古墓太危险了，你差点死在里面。' }
        ] } },
    { text: '不去冒险', effects: { knowledge: 3 }, feedback: '你觉得太危险了，命比秘籍重要。' }
  ]},

  // ========== 感情后续 ==========
  { id: 'romance_confess', title: '表白心意', description: '你鼓起勇气，向心上人表白了。', type: 'romance', timeCost: 2, stage: ['young','middle'], category: 'emotional', choices: [
    { text: '深情告白', nextEvent: 'romance_result', effects: { charm: [2, 5] }, feedback: '你说出了心中的话，等待对方的回应……' }
  ]},
  { id: 'romance_result', title: '表白结果', description: '对方沉默了许久，终于开口了。', type: 'romance', timeCost: 1, stage: ['young','middle'], category: 'emotional', choices: [
    { text: '（等待回应）', effects: {}, check: { attr: 'charm', thresholds: [
          { min: 30, effects: { health: 15 }, feedback: '对方含羞点头，答应了你。你们紧紧相拥。' },
          { min: 15, effects: { health: 5 }, feedback: '对方说需要时间考虑。但你看到了希望。' },
          { min: 0, effects: { health: -5 }, feedback: '对方婉言拒绝了你。你虽然失落，但至少不会后悔没说出口。' }
        ] } }
  ]},
  { id: 'romance_date', title: '约会', description: '你们相约在城外的桃花林散步。春风拂面，落英缤纷。', type: 'romance', timeCost: 2, stage: ['young','middle'], category: 'emotional', choices: [
    { text: '一起赏花', nextEvent: 'romance_develop', effects: { health: [8, 15], charm: [2, 5] }, feedback: '你们在花下漫步，有说有笑。感情渐渐升温。' },
    { text: '切磋武艺', effects: { martial: [3, 8], health: [5, 10] }, feedback: '你们比划了几招，发现对方武功也不错。' },
    { text: '聊人生理想', effects: { knowledge: [3, 8], health: [5, 10] }, feedback: '你们聊了很多，发现彼此志趣相投。' }
  ]},
  { id: 'romance_married', title: '喜结连理', description: '你们决定成亲了。婚礼虽然简朴，但满是幸福。', type: 'romance', timeCost: 3, stage: ['young','middle'], category: 'emotional', choices: [
    { text: '拜堂成亲', effects: { health: 20, reputation: 10 }, feedback: '你们拜了天地，从此携手同行。' }
  ]},

  // ========== 门派专属事件（有门派时触发） ==========
  { id: 'faction_daily', title: '门派修炼', description: '清晨，钟声响起。你和同门一起在练功场上晨练。', type: 'martial', timeCost: 3, stage: ['youth','young','middle'], category: 'growth', faction: true, choices: [
    { text: '认真修炼', effects: { martial: 8, health: -3, charm: [1, 2] }, feedback: '你认真练了一上午，武功有所精进，身姿也更挺拔了。' },
    { text: '请教师兄', effects: { martial: 5, reputation: 3 }, feedback: '师兄指点了你几招，你受益匪浅。' },
    { text: '偷懒歇着', effects: { health: 5, reputation: -3 }, feedback: '你找了个角落打盹。被师父发现后挨了顿训。' }
  ]},
  { id: 'faction_sparring', title: '门派切磋', description: '师父安排你和同门师兄弟切磋武艺。', type: 'martial', timeCost: 2, stage: ['youth','young'], category: 'growth', faction: true, choices: [
    { text: '全力以赴', effects: { martial: 10, reputation: 5 }, check: { attr: 'martial', thresholds: [
          { min: 40, effects: { reputation: 8 }, feedback: '你轻松取胜，同门对你刮目相看。' },
          { min: 0, effects: { health: -5 }, feedback: '你苦战落败，但学到了不少。' }
        ] } },
    { text: '点到为止', effects: { martial: 5, morality: 5 }, feedback: '你们友好切磋，互相学习。' }
  ]},
  { id: 'faction_task', title: '门派任务', description: '掌门派你下山办事——附近村庄有匪患，需要门派弟子前去平定。', type: 'encounter', timeCost: 3, stage: ['youth','young','middle'], category: 'dungeon', faction: true, choices: [
    { text: '接下任务', effects: { reputation: 10, morality: 5 }, check: { attr: 'martial', thresholds: [
          { min: 40, effects: { reputation: 10 }, feedback: '你干净利落地剿灭了匪患，村民们夹道感谢。' },
          { min: 20, effects: { health: -8 }, feedback: '你费了一番功夫才剿灭匪患，但受了些伤。' },
          { min: 0, effects: { health: -20, reputation: -5 }, feedback: '你打不过匪徒，狼狈逃回门派。' }
        ] } },
    { text: '推辞不去', effects: { reputation: -8 }, feedback: '你找了个借口推辞了。掌门不太高兴。' }
  ]},
  { id: 'faction_politics', title: '门派议事', description: '门派召开大会，讨论是否要和另一个门派结盟。大家意见不一。', type: 'story', timeCost: 1, stage: ['young','middle'], category: 'emotional', faction: true, choices: [
    { text: '支持结盟', effects: { reputation: 5, morality: 3 }, feedback: '你支持结盟的提议，掌门赞许你的大局观。' },
    { text: '反对结盟', effects: { reputation: 3 }, feedback: '你认为应该保持独立，部分师兄支持你的看法。' },
    { text: '不发表意见', effects: {}, feedback: '你默默坐在角落，没有表态。' }
  ]},
  { id: 'faction_rival', title: '门派比试', description: '隔壁门派前来挑战，指名要和你切磋。', type: 'danger', timeCost: 2, stage: ['youth','young','middle'], category: 'dungeon', faction: true, choices: [
    { text: '迎战', effects: { reputation: 10 }, check: { attr: 'martial', thresholds: [
          { min: 50, effects: { reputation: 15, martial: 8 }, feedback: '你大胜对手，为门派争了光。掌门亲自为你庆功。' },
          { min: 30, effects: { martial: 5, health: -5 }, feedback: '你苦战胜出，虽受伤但为门派赢得了荣誉。' },
          { min: 0, effects: { reputation: -10, health: -10 }, feedback: '你惨败给对手，门派颜面尽失。' }
        ] } },
    { text: '让师兄去', effects: { reputation: -3 }, feedback: '你把机会让给了师兄。有人觉得你怯战。' }
  ]},
  { id: 'faction_secret', title: '门派秘闻', description: '你在藏经阁整理典籍时，发现了一本被藏起来的武功秘籍残页。', type: 'opportunity', timeCost: 2, stage: ['youth','young'], category: 'growth', faction: true, choices: [
    { text: '偷偷修炼', effects: { martial: 15, morality: -5 }, feedback: '你偷偷修炼秘籍上的武功，进步飞速。但心中有些不安。' },
    { text: '上交掌门', effects: { reputation: 15, morality: 8 }, feedback: '掌门大加赞赏你的品行，额外传授了你几招。' },
    { text: '放回原处', effects: { morality: 3 }, feedback: '你觉得不该碰这些东西，悄悄放了回去。' }
  ]},
  { id: 'faction_herb', title: '门派采药', description: '药圃需要人手，你被派去后山采药。', type: 'story', timeCost: 2, stage: ['youth','young','middle'], category: 'emotional', faction: true, choices: [
    { text: '认真采药', effects: { knowledge: 5, health: 5, wealth: 300 }, feedback: '你采了不少好药材，还学到了一些药理知识。' },
    { text: '顺便练功', effects: { martial: 5, health: -3 }, feedback: '你在山林间练了一套轻功，身法灵活了不少。' }
  ]},


  // ========== 颜值相关事件 ==========
  { id: 'random_mirror', title: '对镜梳妆', description: '你在客栈歇脚时，偶然在铜镜中端详自己的面容。', type: 'story', timeCost: 1, stage: ['youth','young','middle'], category: 'emotional', choices: [
    { text: '好好打扮一番', effects: { charm: [3, 8], wealth: -300 }, feedback: '你整理了仪容，换了身干净衣服，整个人精神了不少。' },
    { text: '不在意容貌', effects: { morality: 3 }, feedback: '你觉得外在不重要，内心修养才是正道。' }
  ]},
  { id: 'random_beauty', title: '偶遇美容方', description: '一位老妪在路边卖自制的养颜膏，说是用百花秘方制成。', type: 'story', timeCost: 1, stage: ['youth','young','middle'], category: 'emotional', choices: [
    { text: '买来试试', effects: { charm: [4, 10], wealth: -500 }, feedback: '你用了养颜膏，皮肤果然细腻了不少。' },
    { text: '不感兴趣', effects: {}, feedback: '你觉得这是骗人的，没理会。' }
  ]},

  // ========== 无门派专属事件（没有门派时触发） ==========
  { id: 'wander_freedom', title: '自由闯荡', description: '你没有门派约束，想去哪就去哪。天下之大，何处不可去？', type: 'story', timeCost: 2, stage: ['youth','young','middle'], category: 'growth', faction: false, choices: [
    { text: '游历四方', effects: { knowledge: 8, reputation: 5 }, feedback: '你走遍了大江南北，见识大涨。' },
    { text: '找个地方练功', effects: { martial: 8, health: -3 }, feedback: '你找了一处僻静之地潜心修炼。' },
    { text: '去赌场碰运气', effects: { wealth: 2000 }, feedback: '你手气不错，赢了不少。', check: { attr: 'charm', thresholds: [
          { min: 20, effects: { wealth: 3000 }, feedback: '你手气极佳，赢了一大笔。' },
          { min: 0, effects: { wealth: -1000 }, feedback: '你运气不好，输了些钱。' }
        ] } }
  ]},
  { id: 'wander_side_job', title: '打零工', description: '你在城里找些零工糊口。搬货、跑腿、帮人写字，什么都干。', type: 'story', timeCost: 2, stage: ['youth','young','middle'], category: 'emotional', faction: false, choices: [
    { text: '去码头扛包', effects: { wealth: 1200, health: -5 }, feedback: '你在码头扛了一个月包，虽然累但赚了不少。' },
    { text: '帮人写信', effects: { wealth: 500, knowledge: 3 }, feedback: '你帮不识字的人写家书，赚了些零花钱。' },
    { text: '去酒楼帮厨', effects: { wealth: 800, health: 5 }, feedback: '你在酒楼帮了一个月厨，吃饱喝足还赚了工钱。' }
  ]},
  { id: 'wander_drink', title: '独酌', description: '夜深了，你一个人坐在酒馆角落喝酒。江湖路远，形单影只。', type: 'story', timeCost: 1, stage: ['youth','young','middle'], category: 'emotional', faction: false, choices: [
    { text: '喝个痛快', effects: { health: 8, wealth: -300 }, feedback: '你喝得微醺，心情好了不少。' },
    { text: '和邻桌搭话', effects: { reputation: 5 }, feedback: '你和邻桌的江湖人聊得很投机。' },
    { text: '早点回去休息', effects: { health: 5 }, feedback: '你没喝几口就回去睡了。' }
  ]},
  { id: 'wander_witness', title: '目击江湖', description: '你亲眼看到两个门派的弟子在街头打斗，刀光剑影。', type: 'story', timeCost: 1, stage: ['youth','young','middle'], category: 'unexpected', faction: false, choices: [
    { text: '出手帮弱势一方', effects: { morality: 10, reputation: 5 }, check: { attr: 'martial', thresholds: [
          { min: 30, effects: { reputation: 10 }, feedback: '你轻松化解了冲突，两边都对你刮目相看。' },
          { min: 0, effects: { health: -8 }, feedback: '你插手后被两边一起打，好心办坏事。' }
        ] } },
    { text: '看热闹', effects: { knowledge: 3 }, feedback: '你仔细观察了两家的招式，长了不少见识。' },
    { text: '绕道走', effects: {}, feedback: '你不想惹麻烦，绕道走了。' }
  ]},
  { id: 'wander_wander', title: '风餐露宿', description: '没有门派庇护，你在野外风餐露宿。', type: 'story', timeCost: 2, stage: ['youth','young','middle'], category: 'emotional', faction: false, choices: [
    { text: '找个破庙歇脚', effects: { health: 5 }, feedback: '你在破庙里凑合了一晚，比露宿强。' },
    { text: '露天生火', effects: { health: 3, martial: 2 }, feedback: '你生了堆火，顺便练了会儿功。' },
    { text: '找户人家借宿', effects: { morality: 3, health: 8 }, feedback: '农家人热情地收留了你一晚。' }
  ]},

  // ========== 结局 ==========
  { id: 'death_battle', title: '战死沙场', description: '你在激烈战斗中倒下。鲜血染红衣襟……', type: 'ending', timeCost: 0, ending: { title: '战死沙场', description: '你为江湖正义献出了生命。虽然英年早逝，但你的名字永远铭刻在江湖历史中。', score: 150, condition: 'health_zero' }},
  { id: 'death_disease', title: '病逝', description: '多年奔波终于压垮了身体。在一个寂静的夜晚，你安详地闭上了眼睛……', type: 'ending', timeCost: 0, ending: { title: '积劳成疾', description: '你为江湖操劳一生，最终倒在病榻上。', score: 80, condition: 'health_zero_old' }},
  { id: 'death_poverty', title: '穷困潦倒', description: '你身无分文又疾病缠身。在寒冷的冬夜，你蜷缩在破庙中……', type: 'ending', timeCost: 0, ending: { title: '穷困潦倒', description: '你一生未能解决生计问题，最终饥寒交迫而死。', score: 30, condition: 'wealth_zero' }},
  { id: 'ending_hermit', title: '归隐山林', description: '你看透了江湖纷争，选择归隐山林。茅屋数间，薄田几亩。', type: 'ending', timeCost: 0, ending: { title: '归隐山林', description: '你远离江湖，找到了内心的平静。', score: 200, condition: 'hermit' }},
  { id: 'ending_peaceful', title: '安享晚年', description: '你儿孙满堂安享晚年。', type: 'ending', timeCost: 0, ending: { title: '安享晚年', description: '你功成名就安度晚年。江湖上流传着你的故事。', score: 250, condition: 'peaceful' }},
  { id: 'ending_wanderer', title: '云游天下', description: '你背起行囊踏上最后的旅程。', type: 'ending', timeCost: 0, ending: { title: '云游天下', description: '你一生漂泊四海为家。', score: 180, condition: 'wanderer' }},
  { id: 'ending_legend', title: '武林传奇', description: '你的事迹被编成话本，在茶馆酒肆中传唱。', type: 'ending', timeCost: 0, ending: { title: '武林传奇', description: '你成为了真正的武林传奇。', score: 500, condition: 'legend' }},
  { id: 'ending_demon', title: '堕入魔道', description: '你的心被仇恨和欲望吞噬。你开始滥杀无辜……', type: 'ending', timeCost: 0, ending: { title: '堕入魔道', description: '你走上不归路。曾经的侠义之心荡然无存。', score: 10, condition: 'demon' }},
  { id: 'ending_hero', title: '一代大侠', description: '你行侠仗义一生，武功盖世德高望重。', type: 'ending', timeCost: 0, ending: { title: '一代大侠', description: '你是当之无愧的一代大侠。', score: 400, condition: 'hero' }},
  { id: 'ending_merchant', title: '富甲一方', description: '你弃武从商，生意越做越大最终富甲一方。', type: 'ending', timeCost: 0, ending: { title: '富甲一方', description: '你另辟蹊径在商场上闯出一片天。', score: 220, condition: 'merchant' }},
  { id: 'ending_old_age', title: '寿终正寝', description: '你度过了漫长而充实的一生。在子孙陪伴下安详地闭上了眼睛……', type: 'ending', timeCost: 0, ending: { title: '寿终正寝', description: '你度过了平凡而幸福的一生。', score: 100, condition: 'old_age' }}
]

export function getEventById(id) {
  return events.find(e => e.id === id)
}

export function getRandomEvents(stage, attributes, faction) {
  // 这些事件属于固定链路，只能通过 nextEvent 触发，不能随机出现
  const CHAIN_ONLY_IDS = new Set([
    // 幼年链
    'baby_grow', 'baby_play', 'baby_event',
    // 少年主线
    'lazy_morning', 'village_morning', 'learn_boxing', 'advanced_teaching', 'become_disciple',
    // 门派链
    'market_visit', 'tea_house', 'faction_info',
    'shaolin_gate', 'shaolin_test', 'shaolin_demonstrate', 'shaolin_training',
    'wudang_gate', 'wudang_test', 'wudang_demonstrate', 'wudang_training',
    // 谋生链
    'city_visit', 'escort_job', 'bounty_board',
    // 武林大会链
    'martial_arts_congress', 'congress_duel', 'congress_watch', 'congress_social', 'congress_rumor',
    // 感情链
    'romance_confess', 'romance_result', 'romance_date', 'romance_married', 'romance_develop',
    // 壮年链
    'founding_sect', 'pass_on_legacy', 'write_book',
    // 结局
    'death_battle', 'death_disease', 'death_poverty',
    'ending_hermit', 'ending_peaceful', 'ending_wanderer', 'ending_legend',
    'ending_demon', 'ending_hero', 'ending_merchant', 'ending_old_age'
  ])

  // 门派互斥：已加入某门派后，不再触发其他门派的入门事件
  const FACTION_EXCLUSIVE = {
    'shaolin_gate': '少林', 'shaolin_test': '少林', 'shaolin_demonstrate': '少林', 'shaolin_training': '少林',
    'wudang_gate': '武当', 'wudang_test': '武当', 'wudang_demonstrate': '武当', 'wudang_training': '武当',
  }

  return events.filter(event => {
    if (!event.stage) return false
    if (!event.stage.includes(stage)) return false
    if (event.type === 'ending') return false
    if (!event.category) return false

    // 排除链路专属事件
    if (CHAIN_ONLY_IDS.has(event.id)) return false

    // 门派事件过滤
    if (event.faction === true && (!faction || faction === '无门无派')) return false
    if (event.faction === false && faction && faction !== '无门无派') return false

    // 门派互斥
    if (faction && faction !== '无门无派') {
      const requiredFaction = FACTION_EXCLUSIVE[event.id]
      if (requiredFaction && requiredFaction !== faction) return false
    }

    const hasAvailableChoice = event.choices.some(c => {
      if (!c.requirements) return true
      return Object.entries(c.requirements).every(([attr, val]) => (attributes[attr] || 0) >= val)
    })
    return hasAvailableChoice
  })
}

export function getAvailableEvents(attributes) {
  return events.filter(event => event.type !== 'ending')
}

export const randomEvents = []
