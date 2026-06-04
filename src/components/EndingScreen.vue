<template>
  <div class="ending">
    <div class="ending-content">
      <!-- 死因 -->
      <div class="hero">
        <span class="hero-label">终章</span>
        <h1 class="hero-title">{{ ending.title }}</h1>
        <p class="hero-sub">{{ ending.birth.place }} · {{ ending.birth.family }} · 享年{{ ending.age }}岁</p>
      </div>

      <!-- 综合评分 -->
      <div class="score-block">
        <span class="score-num">{{ ending.score }}</span>
        <span class="score-label">江湖评分</span>
      </div>

      <!-- 人生维度 -->
      <div class="card">
        <h3 class="card-title">人生维度</h3>
        <div class="dims">
          <div class="dim" v-for="(dim, key) in ending.dimensions" :key="key">
            <span class="dim-name">{{ dimLabels[key] }}</span>
            <span class="dim-label">{{ dim.label }}</span>
          </div>
        </div>
      </div>

      <!-- 人生传记 -->
      <div class="card">
        <h3 class="card-title">人生传记</h3>
        <p class="epitaph">{{ ending.epitaph }}</p>
      </div>

      <!-- 人生大事记 -->
      <div class="card" v-if="ending.lifeMilestones && ending.lifeMilestones.length">
        <h3 class="card-title">大事记</h3>
        <div class="timeline">
          <div class="tl-item" v-for="(m, i) in ending.lifeMilestones" :key="i">
            <span class="tl-stage">{{ m.stage }}</span>
            <span class="tl-text">{{ m.text }}</span>
          </div>
        </div>
      </div>

      <!-- 最终属性 -->
      <div class="card">
        <h3 class="card-title">最终属性</h3>
        <div class="attrs-grid">
          <div v-for="(cfg, key) in attributeConfig" :key="key" class="attr-cell">
            <span class="attr-icon-s" :style="{ color: cfg.color }" v-html="icon(cfg.iconKey, 16)"></span>
            <span class="attr-val-s">{{ key === 'wealth' ? fmtWealth(ending.attributes[key]) : ending.attributes[key] }}</span>
            <span class="attr-name-s">{{ cfg.name }}</span>
          </div>
        </div>
      </div>

      <!-- 按钮 -->
      <div class="btn-row">
        <button class="primary-btn" @click="$emit('restart')">
          <span v-html="icon('restart', 18)"></span>
          再入江湖
        </button>
        <button class="ghost-btn" @click="showShare = true">
          <span v-html="icon('share', 18)"></span>
          分享
        </button>
      </div>
    </div>

    <!-- 分享抽屉 -->
    <Teleport to="body">
      <Transition name="sheet">
        <div class="overlay" v-if="showShare" @click="showShare = false">
          <div class="sheet" @click.stop>
            <div class="sheet-handle"></div>
            <h3 class="sheet-title">分享结果</h3>
            <div class="share-text">
              <p>我在「江湖人生」中度过了{{ ending.age }}岁！</p>
              <p>出生：{{ ending.birth.place }} {{ ending.birth.family }}</p>
              <p>江湖评分：{{ ending.score }}分</p>
              <p>结局：{{ ending.title }}</p>
            </div>
            <button class="copy-btn" @click="copyText">
              <span v-html="icon('copy', 16)"></span>
              复制文本
            </button>
            <button class="sheet-close" @click="showShare = false">关闭</button>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { attributeConfig } from '../utils/config'
import { icon } from '../utils/icons'

const emit = defineEmits(['restart'])
const gameStore = useGameStore()
const showShare = ref(false)
const ending = computed(() => gameStore.ending)

const dimLabels = {
  martial: '武功', knowledge: '学识', reputation: '声望',
  wealth: '财富', morality: '道德', charm: '颜值',
  faction: '门派', romance: '情感'
}

function fmtWealth(val) {
  if (!val) return '0'
  if (val >= 10000) return (val / 10000).toFixed(1) + '万'
  if (val >= 1000) return (val / 1000).toFixed(1) + '贯'
  return val + '文'
}

function copyText() {
  const e = ending.value
  const t = `我在「江湖人生」中度过了${e.age}岁！\n出生：${e.birth.place} ${e.birth.family}\n江湖评分：${e.score}分\n结局：${e.title}\n\n${e.epitaph}`
  navigator.clipboard.writeText(t).catch(() => {
    const ta = document.createElement('textarea'); ta.value = t
    document.body.appendChild(ta); ta.select(); document.execCommand('copy')
    document.body.removeChild(ta)
  })
}
</script>

<style scoped>
.ending {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 32px 20px;
  background: #0a0a0f;
}
.ending-content {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fadeUp 0.8s ease-out;
}

/* 死因 */
.hero { text-align: center; }
.hero-label {
  font-size: 11px; font-weight: 500;
  color: rgba(255,255,255,0.2);
  letter-spacing: 4px;
  display: block; margin-bottom: 6px;
}
.hero-title {
  font-size: 28px; font-weight: 300;
  color: rgba(255,255,255,0.9);
  letter-spacing: 4px; margin-bottom: 6px;
}
.hero-sub {
  font-size: 13px; font-weight: 300;
  color: rgba(255,255,255,0.25);
}

/* 评分 */
.score-block { text-align: center; padding: 8px 0; }
.score-num {
  display: block;
  font-size: 52px; font-weight: 200;
  color: rgba(255,255,255,0.88);
  letter-spacing: 2px; line-height: 1;
}
.score-label {
  font-size: 11px; font-weight: 300;
  color: rgba(255,255,255,0.2);
  letter-spacing: 2px;
}

/* 卡片 */
.card {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 18px;
}
.card-title {
  font-size: 12px; font-weight: 500;
  color: rgba(255,255,255,0.3);
  letter-spacing: 1px;
  margin-bottom: 14px;
}

/* 维度 */
.dims {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.dim {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 6px 0;
}
.dim-name {
  font-size: 12px; font-weight: 400;
  color: rgba(255,255,255,0.3);
}
.dim-label {
  font-size: 13px; font-weight: 500;
  color: rgba(255,255,255,0.7);
}

/* 传记 */
.epitaph {
  font-size: 14px; font-weight: 300;
  line-height: 2;
  color: rgba(255,255,255,0.55);
}

/* 大事记时间线 */
.timeline {
  display: flex;
  flex-direction: column;
  gap: 0;
}
.tl-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(255,255,255,0.03);
}
.tl-item:last-child { border-bottom: none; }
.tl-stage {
  font-size: 11px; font-weight: 500;
  color: rgba(255,255,255,0.2);
  width: 32px;
  flex-shrink: 0;
}
.tl-text {
  font-size: 13px; font-weight: 400;
  color: rgba(255,255,255,0.6);
}

/* 属性网格 */
.attrs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
}
.attr-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 8px 0;
}
.attr-icon-s { opacity: 0.6; }
.attr-val-s {
  font-size: 15px; font-weight: 600;
  color: rgba(255,255,255,0.8);
}
.attr-name-s {
  font-size: 10px; font-weight: 300;
  color: rgba(255,255,255,0.25);
}

/* 按钮 */
.btn-row { display: flex; gap: 10px; }
.primary-btn {
  flex: 1;
  display: flex; align-items: center; justify-content: center; gap: 8px;
  padding: 16px;
  font-size: 15px; font-weight: 500;
  background: rgba(255,255,255,0.9);
  border: none; border-radius: 14px;
  color: #0a0a0f;
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 1px;
}
.primary-btn:hover { background: #fff; }
.ghost-btn {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 16px 24px;
  font-size: 14px; font-weight: 400;
  background: transparent;
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 14px;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.2s;
}
.ghost-btn:hover {
  border-color: rgba(255,255,255,0.2);
  color: rgba(255,255,255,0.6);
}

/* 弹出层 */
.overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;
  display: flex; align-items: flex-end; justify-content: center;
}
.sheet {
  width: 100%; max-width: 480px;
  background: #141419;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 12px 24px 32px;
}
.sheet-handle {
  width: 36px; height: 4px;
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
  margin: 0 auto 16px;
}
.sheet-title {
  font-size: 16px; font-weight: 600;
  color: rgba(255,255,255,0.85);
  text-align: center; margin-bottom: 16px;
}
.share-text {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
}
.share-text p {
  font-size: 14px; font-weight: 300;
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
}
.copy-btn {
  width: 100%;
  display: flex; align-items: center; justify-content: center; gap: 6px;
  padding: 14px;
  font-size: 14px; font-weight: 500;
  background: rgba(255,255,255,0.08);
  border: none; border-radius: 12px;
  color: rgba(255,255,255,0.7);
  cursor: pointer; margin-bottom: 8px;
}
.copy-btn:hover { background: rgba(255,255,255,0.12); }
.sheet-close {
  width: 100%; padding: 14px;
  font-size: 14px; font-weight: 500;
  background: transparent; border: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
}

/* 动画 */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.sheet-enter-active { transition: opacity 0.25s; }
.sheet-enter-active .sheet { transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1); }
.sheet-leave-active { transition: opacity 0.2s; }
.sheet-leave-active .sheet { transition: transform 0.2s ease-in; }
.sheet-enter-from { opacity: 0; }
.sheet-enter-from .sheet { transform: translateY(100%); }
.sheet-leave-to { opacity: 0; }
.sheet-leave-to .sheet { transform: translateY(100%); }
</style>
