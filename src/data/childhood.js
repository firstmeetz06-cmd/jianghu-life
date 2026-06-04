/**
 * 江湖人生 - 幼年养成事件（0-15岁）
 * 
 * 设计原则：
 * - 每题8个选项，每次随机出4个
 * - 选项无对错，都是合理的性格反应
 * - 后台追踪：五维发育积分 + MBTI四维倾向
 * - 7-10岁不出现师父（村里野孩子）
 * - 11岁拜师（根据积分方向）
 * - 14岁家变（核心转折，决定主线）
 * 
 * 五维：武道/文道/技道/社交/修道
 * MBTI：E/I(社交) S/N(认知) T/F(决策) J/P(态度)
 */

export const childhoodEvents = [
  // ========== 0岁 · 降生 ==========
  {
    id: 'child_0_birth',
    age: 0,
    title: '降生',
    description: '你来到了这个世界。产婆把你抱起来，你睁开了眼睛。',
    options: [
      { text: '哇哇大哭，声震屋瓦', effects: { health: 5 }, mbti: { E: 1 } },
      { text: '安安静静，睁眼看世界', effects: { knowledge: 3 }, mbti: { I: 1, N: 1 } },
      { text: '抓住接生婆的手不放', effects: { martial: 2 }, mbti: { S: 1 } },
      { text: '对着烛光咯咯笑', effects: { charm: 3 }, mbti: { N: 1, P: 1 } },
      { text: '尿了父亲一身', effects: { health: 3 }, mbti: { P: 1 } },
      { text: '听到琴声就不哭了', effects: { knowledge: 3 }, mbti: { F: 1, N: 1 } },
      { text: '踢被子力气很大', effects: { martial: 3 }, mbti: { S: 1, T: 1 } },
      { text: '一出生就睁眼，吓了众人一跳', effects: { reputation: 2 }, mbti: { N: 1, E: 1 } }
    ]
  },

  // ========== 1岁 · 抓阄 ==========
  {
    id: 'child_1_grab',
    age: 1,
    title: '抓阄',
    description: '你满周岁了。家人在桌上摆了各种东西，看你抓什么。',
    options: [
      { text: '抓了一本书', effects: { knowledge: 5 }, mbti: { I: 1, N: 1 } },
      { text: '抓了一把小木剑', effects: { martial: 5 }, mbti: { E: 1, S: 1 } },
      { text: '抓了一锭银子', effects: { wealth: 500 }, mbti: { T: 1, J: 1 } },
      { text: '抓了一支毛笔', effects: { knowledge: 4 }, mbti: { N: 1, F: 1 } },
      { text: '抓了一面铜镜', effects: { charm: 5 }, mbti: { S: 1, P: 1 } },
      { text: '抓了一只拨浪鼓', effects: { health: 4 }, mbti: { E: 1, P: 1 } },
      { text: '抓了一块玉佩', effects: { reputation: 4 }, mbti: { J: 1, T: 1 } },
      { text: '什么都不要，就要母亲的手', effects: { morality: 5 }, mbti: { F: 1, I: 1 } }
    ]
  },

  // ========== 2岁 · 初语 ==========
  {
    id: 'child_2_first_word',
    age: 2,
    title: '初语',
    description: '你学会说第一个完整的句子了。全家人都很期待。',
    options: [
      { text: '"我要吃！"', effects: { health: 4 }, mbti: { S: 1, E: 1 } },
      { text: '"你是谁？"——指着家里的猫', effects: { knowledge: 4 }, mbti: { N: 1, T: 1 } },
      { text: '"不要！"', effects: { martial: 3 }, mbti: { T: 1, J: 1 } },
      { text: '"抱抱！"', effects: { charm: 3 }, mbti: { F: 1, E: 1 } },
      { text: '"打！"——拍了父亲一巴掌', effects: { martial: 4 }, mbti: { E: 1, S: 1 } },
      { text: '"花花！"——指着窗外', effects: { charm: 3 }, mbti: { N: 1, F: 1 } },
      { text: '"这个是我的！"——护住玩具', effects: { wealth: 200 }, mbti: { J: 1, T: 1 } },
      { text: '（沉默，指了指天上的月亮）', effects: { knowledge: 5 }, mbti: { I: 1, N: 1 } }
    ]
  },

  // ========== 3岁 · 淘气 ==========
  {
    id: 'child_3_mischief',
    age: 3,
    title: '淘气',
    description: '你满地乱跑，闯了个小祸。',
    options: [
      { text: '把母亲的胭脂涂了满墙', effects: { charm: 2 }, mbti: { N: 1, P: 1 } },
      { text: '偷吃了邻居的果子', effects: { health: 3 }, mbti: { E: 1, S: 1 } },
      { text: '把父亲的书撕了几页', effects: { martial: 2 }, mbti: { S: 1, T: 1 } },
      { text: '追着鸡跑了半个村', effects: { health: 4 }, mbti: { E: 1, S: 1 } },
      { text: '把水缸当鼓敲', effects: { martial: 2 }, mbti: { E: 1, N: 1 } },
      { text: '学大人说话有模有样', effects: { knowledge: 3 }, mbti: { N: 1, F: 1 } },
      { text: '给泥人排了一排', effects: { knowledge: 2 }, mbti: { J: 1, T: 1 } },
      { text: '抱着流浪猫不撒手', effects: { morality: 3 }, mbti: { F: 1, I: 1 } }
    ]
  },

  // ========== 4岁 · 好奇 ==========
  {
    id: 'child_4_curious',
    age: 4,
    title: '好奇',
    description: '你开始对这个世界有各种奇怪的问题。',
    options: [
      { text: '"天为什么是蓝的？"', effects: { knowledge: 4 }, mbti: { N: 1, T: 1 } },
      { text: '"为什么有的人有钱有的人没钱？"', effects: { knowledge: 3 }, mbti: { T: 1, J: 1 } },
      { text: '"我能飞吗？"', effects: { martial: 3 }, mbti: { N: 1, P: 1 } },
      { text: '"娘你年轻时好看还是现在好看？"', effects: { charm: 2 }, mbti: { F: 1, E: 1 } },
      { text: '"死了以后去哪？"', effects: { knowledge: 4 }, mbti: { I: 1, N: 1 } },
      { text: '"我能打过村口那条大黄狗吗？"', effects: { martial: 3 }, mbti: { E: 1, S: 1 } },
      { text: '"为什么姐姐不用干活？"', effects: { morality: 3 }, mbti: { T: 1, J: 1 } },
      { text: '"星星会掉下来吗？"', effects: { knowledge: 4 }, mbti: { N: 1, F: 1 } }
    ]
  },

  // ========== 5岁 · 启蒙 ==========
  {
    id: 'child_5_enlighten',
    age: 5,
    title: '启蒙',
    description: '你开始想学点什么了。村里的长辈问你对什么感兴趣。',
    type: 'direction_choice',  // 特殊类型：选择发育方向
    options: [
      { text: '想跟猎户学射箭', direction: 'martial', effects: { martial: 3 }, mbti: { S: 1, E: 1 } },
      { text: '想跟私塾先生认字', direction: 'knowledge', effects: { knowledge: 3 }, mbti: { N: 1, I: 1 } },
      { text: '想跟匠人学做东西', direction: 'craft', effects: { wealth: 300 }, mbti: { S: 1, T: 1 } },
      { text: '想跟母亲学做饭', direction: 'social', effects: { health: 3 }, mbti: { F: 1, S: 1 } },
      { text: '想跟街头艺人学杂耍', direction: 'martial', effects: { charm: 3 }, mbti: { E: 1, P: 1 } },
      { text: '想自己到处跑着玩', direction: 'social', effects: { reputation: 2 }, mbti: { P: 1, E: 1 } },
      { text: '想跟寺庙的和尚学念经', direction: 'morality', effects: { morality: 3 }, mbti: { I: 1, N: 1 } },
      { text: '想跟隔壁大孩子混', direction: 'social', effects: { reputation: 3 }, mbti: { E: 1, F: 1 } }
    ]
  },

  // ========== 6岁 · 看到有人被欺负 ==========
  {
    id: 'child_6_bully',
    age: 6,
    title: '路见不平',
    description: '你看到村里的大孩子抢了小孩的糖葫芦，小孩在哭。',
    options: [
      { text: '冲上去把糖葫芦抢回来', dev: { martial: 2 }, mbti: { E: 1, F: 1 } },
      { text: '跑去找大人帮忙', dev: { social: 2 }, mbti: { J: 1, T: 1 } },
      { text: '用自己的零花钱再买一个', dev: { morality: 2 }, mbti: { F: 1, J: 1 } },
      { text: '在旁边观察，记住那个人', dev: { knowledge: 2 }, mbti: { I: 1, T: 1 } },
      { text: '假装跟大孩子聊天，转移注意力', dev: { social: 1, knowledge: 1 }, mbti: { E: 1, N: 1 } },
      { text: '等大孩子走了，去安慰小孩', dev: { morality: 1, social: 1 }, mbti: { F: 1, I: 1 } },
      { text: '跟大孩子说"我跟你换"', dev: { social: 2 }, mbti: { E: 1, T: 1 } },
      { text: '记住这件事，回家默默练功', dev: { martial: 1, knowledge: 1 }, mbti: { I: 1, J: 1 } }
    ]
  },

  // ========== 7岁 · 弄坏篱笆 ==========
  {
    id: 'child_7_fence',
    age: 7,
    title: '闯祸',
    description: '你在村口空地练功，一脚踢坏了王大叔家的篱笆。',
    options: [
      { text: '主动去认错', dev: { morality: 2 }, mbti: { E: 1, J: 1 } },
      { text: '趁没人发现偷偷修好', dev: { craft: 2 }, mbti: { I: 1, T: 1 } },
      { text: '找朋友帮忙一起修', dev: { social: 2 }, mbti: { E: 1, F: 1 } },
      { text: '用树枝做了个新的插上', dev: { craft: 1, martial: 1 }, mbti: { S: 1, P: 1 } },
      { text: '跑回家躲起来', dev: { knowledge: 1, martial: 1 }, mbti: { I: 1, P: 1 } },
      { text: '跟王大叔说"我以后会赔你更好的"', dev: { reputation: 2 }, mbti: { E: 1, N: 1 } },
      { text: '把零花钱拿出来赔', dev: { morality: 1, craft: 1 }, mbti: { J: 1, F: 1 } },
      { text: '加倍练功，想证明自己不是只会搞破坏', dev: { martial: 2 }, mbti: { J: 1, T: 1 } }
    ]
  },

  // ========== 8岁 · 遇蛇 ==========
  {
    id: 'child_8_snake',
    age: 8,
    title: '山路惊蛇',
    description: '你上山采药时遇到一条蛇拦在路中间，吐着信子盯着你。',
    options: [
      { text: '捡起石头把蛇砸跑', dev: { martial: 2 }, mbti: { E: 1, S: 1 } },
      { text: '绕远路避开', dev: { knowledge: 1, social: 1 }, mbti: { J: 1, T: 1 } },
      { text: '趁蛇不注意悄悄溜过去', dev: { martial: 1, knowledge: 1 }, mbti: { I: 1, P: 1 } },
      { text: '蹲下来看蛇，等它自己走', dev: { knowledge: 2 }, mbti: { I: 1, N: 1 } },
      { text: '学猎户教过的方法用树枝挑开', dev: { craft: 2 }, mbti: { S: 1, T: 1 } },
      { text: '大声呼救等人来', dev: { social: 2 }, mbti: { E: 1, F: 1 } },
      { text: '把随身干粮扔远引开蛇', dev: { craft: 1, knowledge: 1 }, mbti: { N: 1, P: 1 } },
      { text: '觉得蛇胆值钱，想抓它卖', dev: { craft: 2 }, mbti: { S: 1, T: 1 } }
    ]
  },

  // ========== 9岁 · 受伤的江湖人 ==========
  {
    id: 'child_9_injured',
    age: 9,
    title: '路边奇遇',
    description: '你路过村外小道，看到一个受伤的江湖人倒在路边，身上有兵器。',
    options: [
      { text: '上前扶起来', dev: { morality: 2 }, mbti: { E: 1, F: 1 } },
      { text: '回村叫大人来帮忙', dev: { social: 2 }, mbti: { J: 1, T: 1 } },
      { text: '给他留了水和干粮就走了', dev: { morality: 1, social: 1 }, mbti: { F: 1, I: 1 } },
      { text: '在旁边守着等他自己醒', dev: { morality: 2 }, mbti: { I: 1, F: 1 } },
      { text: '看他身上有兵器，怕是坏人，绕着走', dev: { knowledge: 2 }, mbti: { T: 1, J: 1 } },
      { text: '扶到隐蔽的地方藏起来，怕被仇家找到', dev: { knowledge: 1, morality: 1 }, mbti: { N: 1, F: 1 } },
      { text: '把他身上值钱的东西拿走了', dev: { craft: 2 }, mbti: { T: 1, S: 1 } },
      { text: '用自己的衣服给他包扎伤口', dev: { morality: 1, craft: 1 }, mbti: { F: 1, S: 1 } }
    ]
  },

  // ========== 10岁 · 外乡人 ==========
  {
    id: 'child_10_stranger',
    age: 10,
    title: '来客',
    description: '村里来了个外乡人，穿着跟村里人不一样。大家议论纷纷。',
    options: [
      { text: '跑去凑热闹看', dev: { social: 2 }, mbti: { E: 1, S: 1 } },
      { text: '躲在家里不出门', dev: { knowledge: 1, martial: 1 }, mbti: { I: 1, J: 1 } },
      { text: '跟着大人一起议论', dev: { social: 1, knowledge: 1 }, mbti: { E: 1, N: 1 } },
      { text: '主动跟他打招呼', dev: { social: 2 }, mbti: { E: 1, F: 1 } },
      { text: '观察他的一举一动', dev: { knowledge: 2 }, mbti: { I: 1, T: 1 } },
      { text: '去问他从哪来', dev: { knowledge: 1, social: 1 }, mbti: { E: 1, N: 1 } },
      { text: '跟他保持距离，但注意着', dev: { knowledge: 1, martial: 1 }, mbti: { I: 1, T: 1 } },
      { text: '觉得他可能是江湖人，想跟他学东西', dev: { martial: 2 }, mbti: { N: 1, P: 1 } }
    ]
  },

  // ========== 11岁 · 拜师 ==========
  // 这个事件比较特殊，根据积分方向生成不同的师父选项
  {
    id: 'child_11_master',
    age: 11,
    title: '拜师',
    description: '你的天赋被人看中了。一位高人愿意收你为徒。',
    type: 'master_choice',
    // 具体选项在 game.js 中根据 dev 分数动态生成
    options: []  // 动态生成
  },

  // ========== 12岁 · 下山送信 ==========
  {
    id: 'child_12_delivery',
    age: 12,
    title: '独自远行',
    description: '师父派你独自下山送一封信。这是你第一次一个人出远门。',
    options: [
      { text: '拿了信就出发', dev: { martial: 2 }, mbti: { E: 1, P: 1 } },
      { text: '先问清楚收信人是谁', dev: { knowledge: 2 }, mbti: { J: 1, T: 1 } },
      { text: '一路上边走边练功', dev: { martial: 1, knowledge: 1 }, mbti: { J: 1, S: 1 } },
      { text: '半路遇到可疑的人，加快脚步', dev: { martial: 1, knowledge: 1 }, mbti: { S: 1, T: 1 } },
      { text: '忍不住偷看了信的内容', dev: { knowledge: 2 }, mbti: { N: 1, P: 1 } },
      { text: '送完信在山下逛了一圈', dev: { social: 1, knowledge: 1 }, mbti: { E: 1, P: 1 } },
      { text: '路上遇到有人问路，热心帮忙', dev: { social: 1, morality: 1 }, mbti: { E: 1, F: 1 } },
      { text: '信送到了，但你记住了路上看到的一切', dev: { knowledge: 2 }, mbti: { I: 1, N: 1 } }
    ]
  },

  // ========== 13岁 · 江湖聚会 ==========
  {
    id: 'child_13_gathering',
    age: 13,
    title: '初入江湖',
    description: '师父带你去参加一次江湖聚会。各路人物齐聚一堂。',
    options: [
      { text: '跟各路人物攀谈', dev: { social: 2 }, mbti: { E: 1, F: 1 } },
      { text: '安安静静坐在师父旁边', dev: { knowledge: 2 }, mbti: { I: 1, J: 1 } },
      { text: '偷偷学别人的招式', dev: { martial: 2 }, mbti: { I: 1, T: 1 } },
      { text: '跟同龄人比试了一番', dev: { martial: 1, social: 1 }, mbti: { E: 1, S: 1 } },
      { text: '听到了一些门派恩怨的传闻', dev: { knowledge: 2 }, mbti: { N: 1, T: 1 } },
      { text: '觉得某个人眼神不对，暗中提防', dev: { knowledge: 1, martial: 1 }, mbti: { I: 1, T: 1 } },
      { text: '吃了很多没见过的好东西', dev: { social: 1, craft: 1 }, mbti: { S: 1, P: 1 } },
      { text: '心里暗暗立下目标', dev: { martial: 1, knowledge: 1 }, mbti: { J: 1, N: 1 } }
    ]
  },

  // ========== 14岁 · 家变 ==========
  {
    id: 'child_14_tragedy',
    age: 14,
    title: '家变',
    description: '噩耗传来。家中出了大事。',
    type: 'family_tragedy',
    options: [
      { text: '发誓要查明真相', tragedy: 'investigate', mbti: { T: 1, J: 1 } },
      { text: '当场崩溃大哭', tragedy: 'grief', mbti: { F: 1, E: 1 } },
      { text: '冷静下来开始分析', tragedy: 'analyze', mbti: { T: 1, I: 1 } },
      { text: '跑去找师父求助', tragedy: 'seek_help', mbti: { E: 1, J: 1 } },
      { text: '拿起武器想去报仇', tragedy: 'revenge', mbti: { E: 1, S: 1 } },
      { text: '先安顿好家人', tragedy: 'protect', mbti: { F: 1, J: 1 } },
      { text: '默默记下了每一个细节', tragedy: 'observe', mbti: { I: 1, T: 1 } },
      { text: '跪在地上发誓：此仇必报', tragedy: 'swear', mbti: { F: 1, N: 1 } }
    ],
    // 家变类型在 game.js 中随机决定
    tragedyTypes: [
      { id: 'prison', title: '父母蒙冤', desc: '父母被官府冤枉入狱', mainQuest: '为家人伸冤' },
      { id: 'bandit', title: '山贼洗劫', desc: '山贼洗劫了家中', mainQuest: '复仇' },
      { id: 'missing', title: '父亲失踪', desc: '父亲远行后杳无音讯，只留下一封信', mainQuest: '寻找父亲' },
      { id: 'secret', title: '秘籍现世', desc: '家中发现了一本神秘的武功秘籍', mainQuest: '修炼秘籍' },
      { id: 'medicine', title: '母亲重病', desc: '母亲突然重病，需要稀世药材', mainQuest: '寻药救母' },
      { id: 'recruit', title: '门派来人', desc: '有门派来人招募弟子，但条件苛刻', mainQuest: '门派崛起' },
      { id: 'identity', title: '身世之谜', desc: '你发现了自己的身世并非表面那样', mainQuest: '探寻身世' },
      { id: 'war', title: '战乱波及', desc: '战乱波及了家乡', mainQuest: '乱世求存' }
    ]
  },

  // ========== 15岁 · 启程 ==========
  {
    id: 'child_15_depart',
    age: 15,
    title: '启程',
    description: '你离开了家乡，踏入了真正的江湖。',
    options: [
      { text: '拜别师父，独自上路', mbti: { I: 1, J: 1 } },
      { text: '带着师父的信物去找师门', mbti: { J: 1, T: 1 } },
      { text: '心中只有一个念头：查明真相', mbti: { T: 1, J: 1 } },
      { text: '在村口回头看了一眼，然后走了', mbti: { F: 1, I: 1 } },
      { text: '师父说"去吧"，你跪下磕了三个头', mbti: { F: 1, J: 1 } },
      { text: '带着年幼的弟妹一起上路', mbti: { F: 1, E: 1 } },
      { text: '一把火烧了旧居，断了退路', mbti: { T: 1, P: 1 } },
      { text: '在路上遇到一个同龄人，结伴而行', mbti: { E: 1, F: 1 } }
    ]
  }
]

// 拜师选项模板（根据积分方向动态选择）
export const masterOptions = {
  martial: [
    { text: '云游剑客——教剑法', faction: '无门无派', effects: { martial: 8 } },
    { text: '山中猎人——教弓术', faction: '无门无派', effects: { martial: 6, knowledge: 2 } },
    { text: '铁匠师傅——教硬功', faction: '无门无派', effects: { martial: 5, wealth: 300 } },
    { text: '退隐将军——教兵法', faction: '无门无派', effects: { martial: 4, knowledge: 4 } },
    { text: '少林云游僧——引荐少林', faction: '少林', effects: { martial: 6, morality: 4 } },
    { text: '武当道长——引荐武当', faction: '武当', effects: { martial: 5, knowledge: 3 } },
    { text: '丐帮长老——引荐丐帮', faction: '丐帮', effects: { martial: 5, social: 3 } },
    { text: '峨眉女侠——引荐峨眉', faction: '峨眉', effects: { martial: 4, charm: 4 } }
  ],
  knowledge: [
    { text: '落魄秀才——教诗文', faction: '无门无派', effects: { knowledge: 8 } },
    { text: '算命先生——教易理', faction: '无门无派', effects: { knowledge: 6, charm: 2 } },
    { text: '老大夫——教医术', faction: '无门无派', effects: { knowledge: 5, morality: 3 } },
    { text: '说书先生——教口才', faction: '无门无派', effects: { knowledge: 5, social: 3 } },
    { text: '唐门弟子——引荐唐门', faction: '唐门', effects: { knowledge: 6, craft: 2 } },
    { text: '书院山长——入读书院', faction: '书院', effects: { knowledge: 7, morality: 1 } },
    { text: '峨眉长老——引荐峨眉', faction: '峨眉', effects: { knowledge: 5, charm: 3 } },
    { text: '西域商人——教你经商之道', faction: '无门无派', effects: { knowledge: 4, wealth: 500 } }
  ],
  craft: [
    { text: '木匠师傅——教你手艺', faction: '无门无派', effects: { craft: 8 } },
    { text: '铁匠师傅——教你打铁', faction: '无门无派', effects: { craft: 6, martial: 2 } },
    { text: '药农——教你识药采药', faction: '无门无派', effects: { craft: 5, knowledge: 3 } },
    { text: '商人——教你做生意', faction: '无门无派', effects: { craft: 5, wealth: 500 } },
    { text: '唐门长老——引荐唐门', faction: '唐门', effects: { craft: 6, knowledge: 2 } },
    { text: '铸剑师——教你铸兵器', faction: '无门无派', effects: { craft: 5, martial: 3 } },
    { text: '药师——教你配药', faction: '无门无派', effects: { craft: 5, morality: 3 } },
    { text: '机关师——教你机关术', faction: '无门无派', effects: { craft: 6, knowledge: 2 } }
  ],
  social: [
    { text: '老乞丐——丐帮长老', faction: '丐帮', effects: { social: 6, martial: 2 } },
    { text: '戏班子班主——教你唱戏', faction: '无门无派', effects: { social: 6, charm: 2 } },
    { text: '镖局总镖头——教你走镖', faction: '无门无派', effects: { social: 5, martial: 3 } },
    { text: '茶馆老板——教你人情世故', faction: '无门无派', effects: { social: 6, knowledge: 2 } },
    { text: '媒婆——教你察言观色', faction: '无门无派', effects: { social: 5, charm: 3 } },
    { text: '官差——教你律法', faction: '无门无派', effects: { social: 5, morality: 3 } },
    { text: '说书先生——教你讲故事', faction: '无门无派', effects: { social: 5, knowledge: 3 } },
    { text: '行商——教你跑江湖', faction: '无门无派', effects: { social: 4, wealth: 400 } }
  ],
  morality: [
    { text: '寺庙方丈——入寺修行', faction: '少林', effects: { morality: 6, martial: 2 } },
    { text: '道观道长——入观修道', faction: '武当', effects: { morality: 5, knowledge: 3 } },
    { text: '游方僧人——随他云游', faction: '无门无派', effects: { morality: 6, knowledge: 2 } },
    { text: '隐居老者——学他修心', faction: '无门无派', effects: { morality: 6, knowledge: 2 } },
    { text: '峨眉师太——引荐峨眉', faction: '峨眉', effects: { morality: 5, charm: 3 } },
    { text: '义庄掌柜——教你超度', faction: '无门无派', effects: { morality: 5, knowledge: 3 } },
    { text: '山中医者——教你救人', faction: '无门无派', effects: { morality: 5, craft: 3 } },
    { text: '退隐侠客——教你侠义', faction: '无门无派', effects: { morality: 4, martial: 4 } }
  ]
}

// MBTI 类型名称映射
export const mbtiNames = {
  'INTJ': '孤高剑客',
  'INTP': '玄机道人',
  'ENTJ': '武林霸主',
  'ENTP': '江湖浪子',
  'INFJ': '隐世高人',
  'INFP': '清风剑客',
  'ENFJ': '侠义仁者',
  'ENFP': '热血游侠',
  'ISTJ': '铁面判官',
  'ISFJ': '温润如玉',
  'ESTJ': '正道领袖',
  'ESFJ': '热心肠',
  'ISTP': '独行侠',
  'ISFP': '飘逸剑客',
  'ESTP': '豪迈刀客',
  'ESFP': '风流侠客'
}

// 家变类型对应的主线描述
export const mainQuestDescriptions = {
  prison: '为家人伸冤',
  bandit: '复仇雪恨',
  missing: '寻找父亲',
  secret: '修炼秘籍',
  medicine: '寻药救母',
  recruit: '门派崛起',
  identity: '探寻身世',
  war: '乱世求存'
}
