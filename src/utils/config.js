/**
 * 江湖人生 - 工具函数
 */

// 像素字体配置
export const pixelFonts = {
  main: '"Press Start 2P", "Fusion Pixel", monospace',
  body: '"Noto Sans SC", "Microsoft YaHei", sans-serif'
}

// 颜色配置
export const colors = {
  primary: '#4a90d9',
  secondary: '#67c23a',
  danger: '#f56c6c',
  warning: '#e6a23c',
  bgDark: '#1a1a2e',
  bgMedium: '#16213e',
  bgLight: '#0f3460',
  textPrimary: '#e6e6e6',
  textSecondary: '#a0a0a0',
  textAccent: '#ffd700',
  martial: '#ff6b6b',
  reputation: '#4ecdc4',
  wealth: '#ffe66d',
  health: '#95e1d3',
  morality: '#aa96da',
  charm: '#f8a5c2',
  knowledge: '#7ec8e3'
}

// 属性配置（8个属性）
// iconKey 对应 icons.js 中的 SVG 图标名
export const attributeConfig = {
  martial:    { name: '武功', iconKey: 'martial',    color: colors.martial },
  knowledge:  { name: '学识', iconKey: 'knowledge',  color: colors.knowledge },
  charm:      { name: '颜值', iconKey: 'charm',      color: colors.charm },
  reputation: { name: '声望', iconKey: 'reputation', color: colors.reputation },
  wealth:     { name: '财富', iconKey: 'wealth',     color: colors.wealth },
  health:     { name: '健康', iconKey: 'health',     color: colors.health },
  morality:   { name: '道德', iconKey: 'morality',   color: colors.morality }
}

// 格式化数字
export function formatNumber(num) {
  return num.toString().padStart(3, '0')
}

// 随机整数
export function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

// 延迟函数
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 生成随机古风名字（诗经风格，不分性别）
 */
export function generateName() {
  const surnames = [
    '李', '王', '张', '刘', '陈', '杨', '赵', '黄', '周', '吴',
    '徐', '孙', '马', '胡', '朱', '郭', '何', '林', '罗', '高',
    '沈', '韩', '唐', '冯', '于', '萧', '程', '曹', '袁', '许',
    '方', '石', '谢', '庄', '温', '顾', '江', '柳'
  ]

  const chars = [
    '言', '思', '怀', '清', '素', '如', '若', '之', '亦', '以',
    '予', '自', '则', '而', '其', '且', '安', '宁', '静', '宜',
    '令', '攸', '斯', '维', '兮', '止', '正', '灵', '昭',
    '川', '林', '溪', '岳', '岚', '汀', '洲', '渚', '崖', '泉',
    '松', '柏', '竹', '荷', '兰', '桂', '梧', '桐', '桑', '榆',
    '霜', '雪', '云', '风', '雨', '霁', '露', '霞', '烟',
    '诚', '谦', '敬', '直', '简', '朴', '拙', '真', '恒', '毅',
    '敏', '达', '通', '知', '行', '守', '循', '秉', '承', '启',
    '书', '文', '礼', '乐', '诗', '辞', '章', '序', '铭', '策',
    '渊', '澄', '澈', '润', '泽', '沛', '淳', '瀚', '泓', '渺'
  ]

  const surname = surnames[randomInt(0, surnames.length - 1)]

  if (Math.random() < 0.6) {
    const c1 = chars[randomInt(0, chars.length - 1)]
    let c2 = chars[randomInt(0, chars.length - 1)]
    while (c2 === c1) c2 = chars[randomInt(0, chars.length - 1)]
    return surname + c1 + c2
  } else {
    const c = chars[randomInt(0, chars.length - 1)]
    return surname + c
  }
}
