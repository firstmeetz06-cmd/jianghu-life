/**
 * 江湖人生 - 游戏状态管理 v3
 * 
 * 属性（7个）：武功、学识、颜值、声望、财富、健康、道德
 * 财富单位：文（千文 = 一贯 ≈ 一两银子）
 */

import { defineStore } from 'pinia'
import { getEventById, getRandomEvents } from '../data/events'
import { childhoodEvents, masterOptions, mbtiNames } from '../data/childhood'

const LIFE_STAGES = {
  baby:   { min: 0,   max: 60,  name: '幼年期', icon: '👶' },
  child:  { min: 60,  max: 180, name: '童年期', icon: '🧒' },
  youth:  { min: 180, max: 240, name: '少年期', icon: '🌱' },
  young:  { min: 240, max: 420, name: '青年期', icon: '⚔️' },
  middle: { min: 420, max: 600, name: '壮年期', icon: '🏰' },
  old:    { min: 600, max: 999, name: '老年期', icon: '🌙' }
}

const STAGE_WEIGHTS = {
  baby:   { growth: 70, unexpected: 20, emotional: 10, dungeon: 0 },
  child:  { growth: 60, unexpected: 20, emotional: 20, dungeon: 0 },
  youth:  { growth: 40, unexpected: 20, emotional: 25, dungeon: 15 },
  young:  { growth: 25, unexpected: 25, emotional: 25, dungeon: 25 },
  middle: { growth: 15, unexpected: 30, emotional: 25, dungeon: 30 },
  old:    { growth: 0,  unexpected: 30, emotional: 50, dungeon: 20 }
}

function naturalDeathChance(ageMonths) {
  const years = ageMonths / 12
  if (years < 50) return 0
  if (years < 60) return 0.02
  if (years < 70) return 0.05
  if (years < 80) return 0.10
  if (years < 90) return 0.20
  return 0.40
}

// 出生背景（财富改为千位）
const BIRTH_BACKGROUNDS = [
  { place: '江南水乡', family: '书香门第', wealth: 3000, health: 90, martial: 0, knowledge: 15, charm: 10, reputation: 5, morality: 55, desc: '你出生在江南一个书香世家。父亲是当地有名的教书先生，母亲温柔贤淑。家中虽不富裕，但藏书万卷。' },
  { place: '北方边镇', family: '将门之后', wealth: 2000, health: 95, martial: 5, knowledge: 5, charm: 5, reputation: 10, morality: 50, desc: '你出生在北方边镇一个武将之家。父亲镇守边关，母亲是将门虎女。你从小便舞枪弄棒。' },
  { place: '蜀中山村', family: '猎户人家', wealth: 1500, health: 100, martial: 3, knowledge: 0, charm: 3, reputation: 0, morality: 50, desc: '你出生在蜀中深山一个猎户家庭。父亲擅射，母亲采药为生。山中日子清苦，但你身体结实。' },
  { place: '洛阳城', family: '商贾之家', wealth: 8000, health: 85, martial: 0, knowledge: 10, charm: 12, reputation: 10, morality: 45, desc: '你出生在洛阳城一个富商之家。家中做丝绸生意，锦衣玉食。但父亲常年在外经商。' },
  { place: '岭南渔村', family: '渔家', wealth: 1200, health: 95, martial: 0, knowledge: 0, charm: 5, reputation: 0, morality: 55, desc: '你出生在岭南海边一个小渔村。父亲出海打鱼，母亲织网补衣。海风咸涩，但日落时分的晚霞很美。' },
  { place: '西域小镇', family: '行商之后', wealth: 4000, health: 80, martial: 2, knowledge: 8, charm: 8, reputation: 5, morality: 48, desc: '你出生在丝绸之路旁的一个小镇。父亲是来往东西的行商，母亲是当地胡女。你从小见多识广。' },
  { place: '京城', family: '官宦之家', wealth: 5000, health: 88, martial: 0, knowledge: 12, charm: 10, reputation: 15, morality: 52, desc: '你出生在京城一个中等官宦之家。父亲在朝为官，家教甚严。你从小饱读诗书。' },
  { place: '大理', family: '白族人家', wealth: 1800, health: 92, martial: 0, knowledge: 5, charm: 12, reputation: 0, morality: 58, desc: '你出生在大理洱海边一个白族人家。父亲种田，母亲善织。苍山雪、洱海月，是你童年最美的记忆。' },
  { place: '塞外草原', family: '牧民', wealth: 1000, health: 100, martial: 5, knowledge: 0, charm: 3, reputation: 0, morality: 45, desc: '你出生在塞外草原一个牧民家庭。父亲骑术精湛，母亲歌声嘹亮。你在马背上长大。' },
  { place: '少室山下', family: '农家', wealth: 800, health: 90, martial: 0, knowledge: 0, charm: 5, reputation: 3, morality: 55, desc: '你出生在少室山下一个普通农家。家境贫寒，但你常听到山上传来的晨钟暮鼓。' },
  { place: '峨眉山脚', family: '药农', wealth: 1500, health: 95, martial: 0, knowledge: 8, charm: 8, reputation: 2, morality: 56, desc: '你出生在峨眉山脚一个药农家庭。母亲精通草药，父亲上山采药。你从小便识得百草。' },
  { place: '洞庭湖畔', family: '渔民', wealth: 1100, health: 92, martial: 2, knowledge: 0, charm: 6, reputation: 0, morality: 50, desc: '你出生在洞庭湖畔一个渔民家庭。父亲驾船如飞，母亲腌鱼一绝。湖面辽阔，你心胸宽广。' }
]

export const useGameStore = defineStore('game', {
  state: () => ({
    gameStarted: false,
    gameOver: false,
    currentEvent: null,
    eventHistory: [],
    recentEventIds: [],
    
    // 人生大事记
    lifeMilestones: [],  // [{ stage: '少年', text: '...' }]
    
    // 反馈系统
    feedback: null,  // { text: '...', type: 'story|good|bad|neutral' }
    
    birth: { place: '', family: '', desc: '' },
    
    // 7个属性
    attributes: {
      martial: 0,
      knowledge: 0,
      charm: 0,
      reputation: 0,
      wealth: 1000,
      health: 100,
      morality: 50
    },
    
    character: {
      name: '',
      gender: '',
      age: 0,
      faction: '无门无派',
      title: '初生婴儿'
    },
    
    stats: {
      turns: 0,
      eventsCompleted: 0,
      choicesMade: 0,
      maxMartial: 0,
      maxReputation: 0,
      maxWealth: 0,
      maxKnowledge: 0,
      maxCharm: 0
    },
    
    // 幼年养成系统
    childhoodPhase: true,  // 是否在幼年阶段
    childhoodIndex: 0,     // 当前幼年事件索引
    displayedOptions: [],   // 当前显示的4个选项
    devScores: { martial: 0, knowledge: 0, craft: 0, social: 0, morality: 0 },
    mbtiScores: { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 },
    masterType: null,       // 11岁拜师方向
    mainQuest: null,        // 14岁家变主线
    mainQuestDesc: '',      // 主线描述,
    
    ending: null
  }),
  
  getters: {
    lifeStage: (state) => {
      const age = state.character.age
      if (age < 60) return 'baby'
      if (age < 180) return 'child'
      if (age < 240) return 'youth'
      if (age < 420) return 'young'
      if (age < 600) return 'middle'
      return 'old'
    },
    
    lifeStageInfo() {
      return LIFE_STAGES[this.lifeStage] || LIFE_STAGES.baby
    },
    
    stageWeights() {
      return STAGE_WEIGHTS[this.lifeStage] || STAGE_WEIGHTS.young
    },
    
    martialLevel: (state) => {
      const m = state.attributes.martial
      if (m < 10) return '手无缚鸡之力'
      if (m < 30) return '略懂拳脚'
      if (m < 60) return '武艺初成'
      if (m < 100) return '江湖高手'
      return '一代宗师'
    },
    
    knowledgeLevel: (state) => {
      const k = state.attributes.knowledge
      if (k < 10) return '目不识丁'
      if (k < 30) return '粗通文墨'
      if (k < 60) return '博学多才'
      if (k < 100) return '学富五车'
      return '当世大儒'
    },
    
    charmLevel: (state) => {
      const c = state.attributes.charm
      if (c < 10) return '平平无奇'
      if (c < 30) return '眉清目秀'
      if (c < 60) return '俊朗不凡'
      if (c < 100) return '倾国倾城'
      return '绝世容颜'
    },
    
    reputationLevel: (state) => {
      const r = state.attributes.reputation
      if (r < 10) return '默默无闻'
      if (r < 30) return '小有名气'
      if (r < 60) return '江湖闻名'
      if (r < 100) return '威震四方'
      return '武林传奇'
    },
    
    moralityLevel: (state) => {
      const m = state.attributes.morality
      if (m < 20) return '邪魔歪道'
      if (m < 40) return '亦正亦邪'
      if (m < 60) return '中立'
      if (m < 80) return '正道人士'
      return '侠义心肠'
    },
    
    healthLevel: (state) => {
      const h = state.attributes.health
      if (h <= 0) return '已故'
      if (h < 20) return '奄奄一息'
      if (h < 40) return '体弱多病'
      if (h < 60) return '偶有小恙'
      if (h < 80) return '身强体壮'
      return '精神焕发'
    },
    
    titleLevel: (state) => {
      const age = state.character.age / 12
      const m = state.attributes.martial
      const r = state.attributes.reputation
      if (age < 3) return '初生婴儿'
      if (age < 6) return '幼童'
      if (age < 15) return '稚童'
      if (m >= 80 && r >= 80) return '一代宗师'
      if (m >= 60 && r >= 60) return '武林名宿'
      if (m >= 40) return '江湖侠客'
      if (m >= 20) return '江湖新秀'
      if (r >= 50) return '江湖名人'
      return '江湖新手'
    },
    
    meetsRequirements: (state) => (requirements) => {
      if (!requirements) return true
      for (const [attr, value] of Object.entries(requirements)) {
        if ((state.attributes[attr] || 0) < value) return false
      }
      return true
    }
  },
  
  actions: {
    startGame(name, gender) {
      this.$reset()
      this.character.name = name
      this.character.gender = gender
      this.character.age = 0
      
      const bg = BIRTH_BACKGROUNDS[Math.floor(Math.random() * BIRTH_BACKGROUNDS.length)]
      this.birth = { place: bg.place, family: bg.family, desc: bg.desc }
      this.attributes = {
        martial: bg.martial,
        knowledge: bg.knowledge,
        charm: bg.charm,
        reputation: bg.reputation,
        wealth: bg.wealth,
        health: bg.health,
        morality: bg.morality
      }
      
      // 随机浮动
      for (const key of ['wealth', 'health', 'morality', 'charm', 'knowledge']) {
        const base = this.attributes[key]
        const range = Math.max(5, Math.floor(base * 0.1))
        const offset = Math.floor(Math.random() * range * 2 + 1) - range
        this.attributes[key] = Math.max(0, base + offset)
      }
      
      this.character.title = '初生婴儿'
      this.gameStarted = true
      this.childhoodPhase = true
      this.childhoodIndex = 0
      
      // 加载第一个幼年事件（0岁·降生）
      this.loadChildhoodEvent()
      
      // 记录出生大事
      this.lifeMilestones.push({ stage: '出生', text: `生于${bg.place}${bg.family}` })
    },
    
    makeChoice(choiceIndex) {
      if (!this.currentEvent || !this.currentEvent.choices[choiceIndex]) return
      
      const choice = this.currentEvent.choices[choiceIndex]
      
      // 幼年阶段使用专门的处理逻辑
      if (this.childhoodPhase) {
        return this.makeChildhoodChoice(choice)
      }
      
      if (!this.meetsRequirements(choice.requirements)) {
        return { success: false, message: '条件不满足' }
      }
      
      // 判定系统：根据属性值决定成功/失败的效果和反馈
      let effects = choice.effects || {}
      let feedbackText = choice.feedback || this.currentEvent.feedback || ''
      
      if (choice.check) {
        const checkAttr = choice.check.attr
        const attrVal = this.attributes[checkAttr] || 0
        // 从高到低找第一个满足的阈值
        const sorted = [...choice.check.thresholds].sort((a, b) => b.min - a.min)
        const matched = sorted.find(t => attrVal >= t.min) || sorted[sorted.length - 1]
        if (matched) {
          effects = { ...effects, ...matched.effects }
          if (matched.feedback) feedbackText = matched.feedback
        }
      }
      
      // 计算变化量（支持随机区间 [min, max]）
      const changes = {}
      for (const [attr, value] of Object.entries(effects)) {
        if (this.attributes[attr] !== undefined) {
          // 支持随机区间：[5, 15] 表示随机 5~15
          const actual = Array.isArray(value)
            ? Math.floor(Math.random() * (value[1] - value[0] + 1)) + value[0]
            : value
          const before = this.attributes[attr]
          this.attributes[attr] = Math.max(0, this.attributes[attr] + actual)
          const after = this.attributes[attr]
          if (before !== after) {
            changes[attr] = after - before
          }
        }
      }
      
      this.stats.choicesMade++
      this.stats.turns++
      this.stats.maxMartial = Math.max(this.stats.maxMartial, this.attributes.martial)
      this.stats.maxReputation = Math.max(this.stats.maxReputation, this.attributes.reputation)
      this.stats.maxWealth = Math.max(this.stats.maxWealth, this.attributes.wealth)
      this.stats.maxKnowledge = Math.max(this.stats.maxKnowledge, this.attributes.knowledge)
      this.stats.maxCharm = Math.max(this.stats.maxCharm, this.attributes.charm)
      
      const timeCost = 12  // 一回合一岁
      this.character.age += timeCost
      this.character.title = this.titleLevel
      
      // 记录人生大事
      this.recordMilestone(choice)
      
      // 生成反馈（优先用判定结果的 feedback，否则自动生成）
      if (!feedbackText) feedbackText = this.generateFeedback(choice, changes)
      if (feedbackText) {
        this.feedback = { text: feedbackText, changes }
      } else {
        this.feedback = null
      }
      
      // 结局检查
      const endingResult = this.checkEndings()
      if (endingResult) {
        this.triggerEnding(endingResult)
        return { success: true, ending: true }
      }
      
      // 下一事件
      if (choice.nextEvent) {
        const nextEvent = getEventById(choice.nextEvent)
        if (nextEvent) {
          this.currentEvent = nextEvent
          this.eventHistory.push(nextEvent.id)
          this.stats.eventsCompleted++
          if (nextEvent.type === 'ending') {
            this.triggerEnding(nextEvent.id)
            return { success: true, ending: true }
          }
          return { success: true }
        }
      }
      
      this.triggerRandomEvent()
      return { success: true }
    },
    
    // 自动生成反馈文字
    generateFeedback(choice, changes) {
      const parts = []
      const attrNames = {
        martial: '武功', knowledge: '学识', charm: '颜值',
        reputation: '声望', wealth: '财富', health: '健康', morality: '道德'
      }
      
      for (const [attr, val] of Object.entries(changes)) {
        const name = attrNames[attr] || attr
        if (attr === 'wealth') {
          if (val > 0) parts.push(`赚了${Math.abs(val)}文`)
          else parts.push(`花了${Math.abs(val)}文`)
        } else if (val > 0) {
          const msgs = {
            martial: ['武艺有所精进', '拳法更熟练了', '身手进步了'],
            knowledge: ['增长了见识', '学到了新知识', '学问有所长进'],
            charm: ['气质更好了', '仪态更从容了'],
            reputation: ['名声更响了', '有人开始认识你了'],
            health: ['身体恢复了些', '精神好多了'],
            morality: ['心性更正了', '品行更端正了']
          }
          const options = msgs[attr] || [`${name}提升了`]
          parts.push(options[Math.floor(Math.random() * options.length)])
        } else if (val < 0) {
          const msgs = {
            martial: ['招式还不够熟练'],
            health: ['受了些伤', '身体有些不适', '消耗了不少体力'],
            wealth: [],
            morality: ['心性有些动摇'],
            reputation: ['名声受损了']
          }
          const options = msgs[attr] || [`${name}下降了`]
          if (options.length > 0) parts.push(options[Math.floor(Math.random() * options.length)])
        }
      }
      
      if (parts.length === 0) return ''
      return parts.join('。') + '。'
    },

    // 记录人生大事
    recordMilestone(choice) {
      const stageNames = { baby:'幼年', child:'童年', youth:'少年', young:'青年', middle:'壮年', old:'老年' }
      const stage = stageNames[this.lifeStage] || ''
      const evt = this.currentEvent

      // 出生
      if (evt.id === 'birth') {
        this.lifeMilestones.push({ stage: '出生', text: `生于${this.birth.place}${this.birth.family}` })
        return
      }

      // 门派相关
      if (evt.type === 'faction' && choice.text.includes('入门') || choice.text.includes('正式') || choice.text.includes('修行') || choice.text.includes('入寺') || choice.text.includes('入山')) {
        const factionNames = { shaolin: '少林', wudang: '武当', emei: '峨眉', gaibang: '丐帮' }
        for (const [key, name] of Object.entries(factionNames)) {
          if (evt.id.includes(key)) {
            if (this.character.faction !== name) {
              this.character.faction = name
              this.lifeMilestones.push({ stage, text: `拜入${name}` })
            }
            break
          }
        }
      }

      // 感情
      if (evt.type === 'romance') {
        if (choice.text.includes('表白') || choice.text.includes('点头')) {
          this.lifeMilestones.push({ stage, text: '觅得心上人' })
        }
        if (choice.text.includes('成家') || choice.text.includes('拜堂')) {
          this.lifeMilestones.push({ stage, text: '喜结连理' })
        }
        if (choice.text.includes('背叛') || choice.text.includes('分手')) {
          this.lifeMilestones.push({ stage, text: '感情受挫' })
        }
      }

      // 武功里程碑
      if (this.attributes.martial >= 60 && this.stats.maxMartial < 60) {
        this.lifeMilestones.push({ stage, text: '武功初成' })
      }
      if (this.attributes.martial >= 100 && this.stats.maxMartial < 100) {
        this.lifeMilestones.push({ stage, text: '武功登峰造极' })
      }

      // 声望里程碑
      if (this.attributes.reputation >= 50 && this.stats.maxReputation < 50) {
        this.lifeMilestones.push({ stage, text: '名震一方' })
      }
      if (this.attributes.reputation >= 100 && this.stats.maxReputation < 100) {
        this.lifeMilestones.push({ stage, text: '天下皆知' })
      }

      // 开宗立派
      if (evt.id === 'founding_sect') {
        this.lifeMilestones.push({ stage, text: '开宗立派' })
      }

      // 重大事件
      if (evt.id === 'martial_arts_congress') {
        this.lifeMilestones.push({ stage, text: '参加武林大会' })
      }
      if (evt.id === 'duel') {
        this.lifeMilestones.push({ stage, text: '与高手对决' })
      }
    },

    // 生成结局评估
    generateEnding(endingId) {
      const a = this.attributes
      const s = this.stats
      const years = Math.floor(this.character.age / 12)

      // 死因
      const endingEvent = getEventById(endingId)
      const deathCause = endingEvent?.ending?.title || '寿终正寝'

      // 维度评分
      const dimensions = {
        martial: this.evaluateDimension('martial', a.martial),
        knowledge: this.evaluateDimension('knowledge', a.knowledge),
        reputation: this.evaluateDimension('reputation', a.reputation),
        wealth: this.evaluateDimension('wealth', a.wealth),
        morality: this.evaluateDimension('morality', a.morality),
        charm: this.evaluateDimension('charm', a.charm),
        faction: this.evaluateFaction(),
        romance: this.evaluateRomance()
      }

      // 人生传记
      const epitaph = this.generateEpitaph(deathCause, years)

      // 综合评分
      const score = this.calculateLifeScore(dimensions, years)

      return {
        title: deathCause,
        description: endingEvent?.ending?.description || '',
        score,
        birth: { ...this.birth },
        attributes: { ...a },
        character: { ...this.character },
        stats: { ...s },
        dimensions,
        epitaph,
        lifeMilestones: [...this.lifeMilestones],
        age: years
      }
    },

    evaluateDimension(attr, value) {
      const tables = {
        martial: [
          [0, '手无缚鸡之力'], [10, '略懂拳脚'], [30, '武艺初成'],
          [60, '江湖好手'], [100, '一流高手'], [150, '武林宗师'], [200, '天下无敌']
        ],
        knowledge: [
          [0, '目不识丁'], [10, '粗通文墨'], [30, '博览群书'],
          [60, '学富五车'], [100, '当世大儒']
        ],
        reputation: [
          [0, '默默无闻'], [10, '小有名气'], [30, '名震一方'],
          [60, '天下皆知'], [100, '武林传奇']
        ],
        wealth: [
          [0, '一贫如洗'], [1000, '小有积蓄'], [5000, '家境殷实'],
          [20000, '富甲一方'], [50000, '富可敌国']
        ],
        morality: [
          [0, '声名狼藉'], [20, '亦正亦邪'], [40, '平凡百姓'],
          [60, '行侠仗义'], [80, '德高望重']
        ],
        charm: [
          [0, '平平无奇'], [10, '眉清目秀'], [30, '俊朗不凡'],
          [60, '倾国倾城'], [100, '绝世容颜']
        ]
      }
      const table = tables[attr] || []
      let result = table[0]?.[1] || '未知'
      for (const [threshold, label] of table) {
        if (value >= threshold) result = label
      }
      return { value, label: result }
    },

    evaluateFaction() {
      const f = this.character.faction
      if (f === '无门无派') return { value: 0, label: '无门无派' }
      return { value: 1, label: f + '弟子' }
    },

    evaluateRomance() {
      const milestones = this.lifeMilestones.map(m => m.text)
      if (milestones.includes('喜结连理')) return { value: 3, label: '家庭美满' }
      if (milestones.includes('觅得心上人')) return { value: 2, label: '有一段情' }
      if (milestones.includes('感情受挫')) return { value: 1, label: '情路坎坷' }
      return { value: 0, label: '孤独一人' }
    },

    calculateLifeScore(dimensions, years) {
      let score = 0
      // 各维度加分
      score += dimensions.martial.value * 2
      score += Math.min(dimensions.knowledge.value, 100)
      score += Math.min(dimensions.reputation.value, 100) * 1.5
      score += Math.min(dimensions.morality.value, 100)
      score += dimensions.romance.value * 30
      score += dimensions.faction.value * 40
      // 寿命加分
      score += years * 2
      return Math.round(score)
    },

    generateEpitaph(deathCause, years) {
      const m = this.lifeMilestones
      const name = this.character.name
      const birth = this.birth

      let text = `${name}，生于${birth.place}${birth.family}。`

      // 按阶段分组
      const stageOrder = ['童年', '少年', '青年', '壮年', '老年']
      for (const stage of stageOrder) {
        const events = m.filter(e => e.stage === stage)
        if (events.length > 0) {
          text += stage + '时，'
          text += events.map(e => e.text).join('，') + '。'
        }
      }

      text += `${years}岁时${deathCause}。`

      return text
    },

    // 关闭反馈，进入下一事件
    dismissFeedback() {
      this.feedback = null
    },
    
    triggerRandomEvent() {
      const stage = this.lifeStage
      const weights = this.stageWeights
      const available = getRandomEvents(stage, this.attributes, this.character.faction)
      
      const cooldown = new Set(this.recentEventIds.slice(-8))
      let pool = available.filter(e => !cooldown.has(e.id))
      if (pool.length < 3) {
        const smallCooldown = new Set(this.recentEventIds.slice(-3))
        pool = available.filter(e => !smallCooldown.has(e.id))
      }
      if (pool.length === 0) pool = available
      
      if (pool.length === 0) {
        this.currentEvent = {
          id: 'rest_fallback',
          title: '休养生息',
          description: '你找了一处安静的地方休息了几天，恢复了精力。',
          type: 'story',
          timeCost: 1,
          category: 'growth',
          feedback: '休息了几天，感觉好多了。',
          choices: [{ text: '继续上路', effects: { health: 10 } }]
        }
        return
      }
      
      const weighted = pool.map(event => {
        const cat = event.category || 'unexpected'
        return { event, weight: weights[cat] || 10 }
      })
      
      const totalWeight = weighted.reduce((sum, w) => sum + w.weight, 0)
      let roll = Math.random() * totalWeight
      let selected = weighted[0].event
      
      for (const { event, weight } of weighted) {
        roll -= weight
        if (roll <= 0) { selected = event; break }
      }
      
      this.currentEvent = selected
      this.eventHistory.push(selected.id)
      this.recentEventIds.push(selected.id)
      if (this.recentEventIds.length > 12) {
        this.recentEventIds = this.recentEventIds.slice(-8)
      }
    },
    
    // ========== 幼年养成系统 ==========
    
    // 从8个选项中随机选4个
    getRandomOptions(options, count = 4) {
      const shuffled = [...options].sort(() => Math.random() - 0.5)
      return shuffled.slice(0, count)
    },
    
    // 加载幼年事件
    loadChildhoodEvent() {
      const evt = childhoodEvents[this.childhoodIndex]
      if (!evt) {
        this.endChildhood()
        return
      }
      
      // 特殊处理：11岁拜师
      if (evt.age === 11) {
        this.generateMasterEvent()
        return
      }
      
      // 特殊处理：14岁家变
      if (evt.age === 14) {
        this.generateTragedyEvent()
        return
      }
      
      // 从8个选项中随机选4个显示
      this.displayedOptions = this.getRandomOptions(evt.options, 4)
      
      // 构造成 currentEvent 格式供 UI 使用
      this.currentEvent = {
        id: evt.id,
        title: evt.title,
        description: evt.description,
        type: 'childhood',
        category: 'growth',
        choices: this.displayedOptions.map((opt, i) => ({
          text: opt.text,
          index: i
        }))
      }
      this.eventHistory.push(evt.id)
    },
    
    // 处理幼年选择
    makeChildhoodChoice(choice) {
      const evt = childhoodEvents[this.childhoodIndex]
      const option = this.displayedOptions[choice.index]
      if (!option) return
      
      const changes = {}
      
      // 应用属性效果
      if (option.effects) {
        for (const [attr, value] of Object.entries(option.effects)) {
          if (this.attributes[attr] !== undefined) {
            const before = this.attributes[attr]
            this.attributes[attr] = Math.max(0, this.attributes[attr] + value)
            const after = this.attributes[attr]
            if (before !== after) changes[attr] = after - before
          }
        }
      }
      
      // 应用发育积分（6-10岁）
      if (option.dev) {
        for (const [track, value] of Object.entries(option.dev)) {
          this.devScores[track] = (this.devScores[track] || 0) + value
        }
      }
      
      // 应用MBTI倾向
      if (option.mbti) {
        for (const [dim, value] of Object.entries(option.mbti)) {
          this.mbtiScores[dim] = (this.mbtiScores[dim] || 0) + value
        }
      }
      
      // 5岁选择发育方向
      if (option.direction) {
        this.devScores[option.direction] = (this.devScores[option.direction] || 0) + 3
      }
      
      // 14岁家变选择
      if (option.tragedy) {
        this.mainQuest = option.tragedy
      }
      
      // 11岁拜师：设置门派
      if (this.currentEvent?.id === 'child_11_master' && option.faction) {
        this.character.faction = option.faction
        if (option.faction !== '无门无派') {
          this.lifeMilestones.push({ stage: '少年', text: `拜入${option.faction}` })
        }
      }
      
      // 更新统计
      this.stats.choicesMade++
      this.stats.turns++
      this.character.age = evt.age * 12  // 同步年龄（月）
      this.character.title = this.titleLevel
      
      // 生成反馈
      const feedbackText = this.generateChildhoodFeedback(option, changes)
      if (feedbackText) {
        this.feedback = { text: feedbackText, changes }
      } else {
        this.feedback = null
      }
      
      // 进入下一个幼年事件
      this.childhoodIndex++
      return { success: true }
    },
    
    // 继续到下一个幼年事件（由UI调用，点击"继续"按钮后）
    nextChildhoodEvent() {
      this.feedback = null  // 清空旧反馈，否则模板不会显示新选项
      this.loadChildhoodEvent()
    },
    
    // 生成11岁拜师事件
    generateMasterEvent() {
      // 找出发育积分最高的方向
      const scores = this.devScores
      const topTrack = Object.entries(scores).sort((a, b) => b[1] - a[1])[0]
      const trackName = topTrack[0]  // martial/knowledge/craft/social/morality
      this.masterType = trackName
      
      // 从该方向的8个师父中随机选4个
      const options = masterOptions[trackName] || masterOptions.martial
      this.displayedOptions = this.getRandomOptions(options, 4)
      
      const trackLabels = {
        martial: '武道', knowledge: '文道', craft: '技道', social: '社交', morality: '修道'
      }
      
      this.currentEvent = {
        id: 'child_11_master',
        title: '拜师',
        description: `你在${trackLabels[trackName]}方面展现出了天赋。一位高人看中了你，愿意收你为徒。`,
        type: 'childhood',
        category: 'growth',
        choices: this.displayedOptions.map((opt, i) => ({
          text: opt.text,
          index: i
        }))
      }
      this.eventHistory.push('child_11_master')
      
      // 拜师选择需要特殊处理：设置门派
      this._masterOptions = this.displayedOptions
    },
    
    // 生成14岁家变事件
    generateTragedyEvent() {
      const evt = childhoodEvents.find(e => e.age === 14)
      const tragedyTypes = evt.tragedyTypes
      const tragedy = tragedyTypes[Math.floor(Math.random() * tragedyTypes.length)]
      
      this.mainQuest = tragedy.id
      this.mainQuestDesc = tragedy.mainQuest
      
      // 从8个反应中随机选4个
      this.displayedOptions = this.getRandomOptions(evt.options, 4)
      
      this.currentEvent = {
        id: 'child_14_tragedy',
        title: tragedy.title,
        description: tragedy.desc,
        type: 'childhood',
        category: 'growth',
        choices: this.displayedOptions.map((opt, i) => ({
          text: opt.text,
          index: i
        }))
      }
      this.eventHistory.push('child_14_tragedy')
      
      // 记录大事
      this.lifeMilestones.push({ stage: '少年', text: tragedy.title })
    },
    
    // 幼年反馈生成
    generateChildhoodFeedback(option, changes) {
      const parts = []
      const attrNames = {
        martial: '武功', knowledge: '学识', charm: '颜值',
        reputation: '声望', wealth: '财富', health: '健康', morality: '道德'
      }
      
      // 属性变化
      for (const [attr, val] of Object.entries(changes)) {
        const name = attrNames[attr] || attr
        if (attr === 'wealth') {
          if (val > 0) parts.push(`家中多了${Math.abs(val)}文`)
        } else if (val > 0) {
          parts.push(`${name}+${val}`)
        }
      }
      
      // 发育积分变化（6-10岁）
      if (option.dev) {
        const devNames = { martial: '武道', knowledge: '文道', craft: '技道', social: '社交', morality: '修道' }
        for (const [track, val] of Object.entries(option.dev)) {
          parts.push(`${devNames[track] || track}+${val}`)
        }
      }
      
      return parts.length > 0 ? parts.join('。') + '。' : '你做出了选择。'
    },
    
    // 幼年阶段结束，进入少年阶段
    endChildhood() {
      this.childhoodPhase = false
      
      // 计算MBTI类型
      const mbti = this.calculateMBTI()
      this.character.mbti = mbti
      this.character.mbtiName = mbtiNames[mbti] || '江湖新手'
      
      // 记录大事
      this.lifeMilestones.push({ stage: '少年', text: `性格定型：${mbti}（${mbtiNames[mbti] || ''}）` })
      if (this.masterType) {
        const trackLabels = { martial: '武道', knowledge: '文道', craft: '技道', social: '社交', morality: '修道' }
        this.lifeMilestones.push({ stage: '少年', text: `天赋方向：${trackLabels[this.masterType]}` })
      }
      if (this.mainQuestDesc) {
        this.lifeMilestones.push({ stage: '少年', text: `主线：${this.mainQuestDesc}` })
      }
      
      // 设置年龄为15岁
      this.character.age = 15 * 12
      this.character.title = this.titleLevel
      
      // 进入正常事件系统（从少年阶段开始）
      this.triggerRandomEvent()
    },
    
    // 计算MBTI类型
    calculateMBTI() {
      const s = this.mbtiScores
      return [
        s.E >= s.I ? 'E' : 'I',
        s.S >= s.N ? 'S' : 'N',
        s.T >= s.F ? 'T' : 'F',
        s.J >= s.P ? 'J' : 'P'
      ].join('')
    },
    
    checkEndings() {
      const a = this.attributes
      const s = this.stats
      const age = this.character.age
      const years = age / 12
      
      if (a.health <= 0) return years > 50 ? 'death_disease' : 'death_battle'
      if (a.wealth <= 0 && a.health < 20) return 'death_poverty'
      if (a.morality <= 5 && s.maxMartial > 50) return 'ending_demon'
      if (years >= 50 && Math.random() < naturalDeathChance(age)) return 'ending_old_age'
      if (s.maxMartial >= 90 && s.maxReputation >= 90 && years >= 40) return 'ending_legend'
      if (a.morality >= 80 && a.reputation >= 70 && a.martial >= 60 && years >= 35) return 'ending_hero'
      if (a.wealth >= 50000 && a.martial < 30 && years >= 30) return 'ending_merchant'
      return null
    },
    
    triggerEnding(endingId) {
      this.ending = this.generateEnding(endingId)
      this.gameOver = true
    },
    
    saveGame() {
      localStorage.setItem('jianghu_save', JSON.stringify({
        attributes: this.attributes,
        character: this.character,
        birth: this.birth,
        stats: this.stats,
        eventHistory: this.eventHistory,
        recentEventIds: this.recentEventIds,
        lifeMilestones: this.lifeMilestones,
        currentEventId: this.currentEvent?.id,
        timestamp: Date.now()
      }))
      return true
    },
    
    loadGame() {
      const raw = localStorage.getItem('jianghu_save')
      if (!raw) return false
      try {
        const data = JSON.parse(raw)
        this.attributes = { martial:0, knowledge:0, charm:0, reputation:0, wealth:1000, health:100, morality:50, ...data.attributes }
        this.character = data.character
        this.birth = data.birth || { place:'未知', family:'未知', desc:'' }
        this.stats = { ...this.stats, ...data.stats }
        this.eventHistory = data.eventHistory || []
        this.recentEventIds = data.recentEventIds || []
        this.lifeMilestones = data.lifeMilestones || []
        this.currentEvent = getEventById(data.currentEventId)
        this.gameStarted = true
        this.gameOver = false
        this.ending = null
        return true
      } catch(e) { return false }
    },
    
    resetGame() {
      this.$reset()
      localStorage.removeItem('jianghu_save')
    }
  }
})
