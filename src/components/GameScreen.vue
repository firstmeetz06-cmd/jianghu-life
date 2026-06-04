<template>
  <div class="game">
    <!-- 顶部状态栏 -->
    <header class="top-bar">
      <div class="top-left">
        <span class="player-name">{{ character.name }}</span>
        <span class="player-age">{{ formatAge(character.age) }}</span>
      </div>
      <div class="stage-pill">{{ lifeStageInfo.name }}</div>
      <span class="turn-count">第 {{ stats.turns }} 回合</span>
    </header>

    <!-- 属性面板 -->
    <div class="attrs">
      <div
        v-for="(cfg, key) in attributeConfig"
        :key="key"
        class="attr-item"
      >
        <span class="attr-icon" :style="{ color: cfg.color }" v-html="icon(cfg.iconKey, 14)"></span>
        <span class="attr-name">{{ cfg.name }}</span>
        <div class="attr-bar">
          <div class="attr-fill" :style="{ width: getAttrPct(key) + '%', background: cfg.color }"></div>
        </div>
        <span class="attr-val" :style="{ color: cfg.color }">{{ fmtAttr(key) }}</span>
      </div>
    </div>

    <!-- 事件区域 -->
    <main class="event-area" v-if="currentEvent">
      <!-- 事件卡片 -->
      <div class="event-header">
        <span class="event-tag">{{ getEventType(currentEvent.type) }}</span>
        <h2 class="event-title">{{ currentEvent.title }}</h2>
        <p class="event-desc">{{ currentEvent.description }}</p>
      </div>

      <!-- 反馈（内嵌） -->
      <div class="feedback" v-if="feedback">
        <p class="feedback-text">{{ feedback.text }}</p>
        <div class="change-tags" v-if="feedback.changes && Object.keys(feedback.changes).length">
          <span
            v-for="(val, attr) in feedback.changes"
            :key="attr"
            class="tag"
            :class="val > 0 ? 'pos' : 'neg'"
          >
            {{ attributeConfig[attr]?.name || attr }} {{ val > 0 ? '+' : '' }}{{ attr === 'wealth' ? fmtWealth(val) : val }}
          </span>
        </div>
        <button class="continue-btn" @click="dismissFeedback">
          继续
          <span v-html="icon('chevronR', 16)"></span>
        </button>
      </div>

      <!-- 选项列表 -->
      <div class="choices" v-else>
        <button
          v-for="(choice, i) in currentEvent.choices"
          :key="i"
          class="choice"
          :class="{ locked: !meetsReq(choice.requirements) }"
          :disabled="!meetsReq(choice.requirements)"
          @click="handleChoice(i)"
        >
          <span class="choice-text">{{ choice.text }}</span>
          <span class="choice-req" v-if="choice.requirements && !meetsReq(choice.requirements)">
            {{ fmtReq(choice.requirements) }}
          </span>
          <span class="choice-arrow" v-html="icon('chevronR', 16)"></span>
        </button>
      </div>
    </main>

    <!-- 底部操作栏 -->
    <footer class="bottom-bar">
      <button class="bar-btn" @click="saveGame">
        <span v-html="icon('save', 18)"></span>
        <span>存档</span>
      </button>
      <button class="bar-btn" @click="loadGameAction">
        <span v-html="icon('folder', 18)"></span>
        <span>读档</span>
      </button>
      <button class="bar-btn" @click="showHistory = true">
        <span v-html="icon('scroll', 18)"></span>
        <span>历史</span>
      </button>
    </footer>

    <!-- 历史弹窗 -->
    <Teleport to="body">
      <Transition name="sheet">
        <div class="overlay" v-if="showHistory" @click="showHistory = false">
          <div class="sheet" @click.stop>
            <div class="sheet-handle"></div>
            <h3 class="sheet-title">事件记录</h3>
            <div class="history-list">
              <div v-for="(evt, i) in eventHistory" :key="i" class="history-row">
                <span class="history-num">{{ i + 1 }}</span>
                <span>{{ getEventTitle(evt) }}</span>
              </div>
            </div>
            <button class="sheet-close" @click="showHistory = false">关闭</button>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast -->
    <Transition name="toast">
      <div class="toast" v-if="toastMsg">{{ toastMsg }}</div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/game'
import { attributeConfig } from '../utils/config'
import { getEventById } from '../data/events'
import { icon } from '../utils/icons'

const gameStore = useGameStore()
const showHistory = ref(false)
const toastMsg = ref('')

const character = computed(() => gameStore.character)
const attributes = computed(() => gameStore.attributes)
const stats = computed(() => gameStore.stats)
const currentEvent = computed(() => gameStore.currentEvent)
const eventHistory = computed(() => gameStore.eventHistory)
const lifeStageInfo = computed(() => gameStore.lifeStageInfo)
const feedback = computed(() => gameStore.feedback)

function meetsReq(req) { return gameStore.meetsRequirements(req) }

function getAttrPct(key) {
  if (key === 'wealth') return Math.min(100, (attributes.value[key] / 10000) * 100)
  return Math.min(100, attributes.value[key] || 0)
}

function fmtAttr(key) {
  if (key === 'wealth') return fmtWealth(attributes.value[key])
  return attributes.value[key] ?? 0
}

function fmtWealth(val) {
  if (val >= 10000) return (val / 10000).toFixed(1) + '万'
  if (val >= 1000) return (val / 1000).toFixed(1) + '贯'
  return val + '文'
}

function formatAge(months) {
  const y = Math.floor(months / 12), m = months % 12
  if (y === 0) return `${m}个月`
  if (m === 0) return `${y}岁`
  return `${y}岁${m}月`
}

const typeMap = { story:'剧情', encounter:'遭遇', martial:'武学', danger:'危险', opportunity:'机遇', moral:'抉择', faction:'门派', romance:'情缘', ending:'结局' }
function getEventType(t) { return typeMap[t] || '事件' }
function getEventTitle(id) { const e = getEventById(id); return e ? e.title : id }
function fmtReq(req) { return Object.entries(req).map(([a, v]) => `${attributeConfig[a]?.name || a} ≥ ${v}`).join('  ') }

function handleChoice(i) { gameStore.makeChoice(i) }
function dismissFeedback() { gameStore.dismissFeedback() }

function flash(msg) { toastMsg.value = msg; setTimeout(() => toastMsg.value = '', 2000) }
function saveGame() { if (gameStore.saveGame()) flash('已存档') }
function loadGameAction() { if (gameStore.loadGame()) flash('已读档'); else flash('没有存档') }
</script>

<style scoped>
/* ── 布局 ── */
.game {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #0a0a0f;
}

/* ── 顶部栏 ── */
.top-bar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px 20px;
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  position: sticky;
  top: 0;
  z-index: 10;
}
.top-left { display: flex; align-items: baseline; gap: 8px; flex: 1; }
.player-name {
  font-size: 17px;
  font-weight: 600;
  color: rgba(255,255,255,0.9);
}
.player-age {
  font-size: 13px;
  font-weight: 300;
  color: rgba(255,255,255,0.35);
}
.stage-pill {
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  background: rgba(255,255,255,0.06);
  padding: 3px 10px;
  border-radius: 20px;
  letter-spacing: 1px;
}
.turn-count {
  font-size: 12px;
  font-weight: 300;
  color: rgba(255,255,255,0.2);
}

/* ── 属性面板 ── */
.attrs {
  padding: 14px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.attr-item {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 20px;
}
.attr-icon {
  width: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
}
.attr-name {
  font-size: 12px;
  font-weight: 400;
  color: rgba(255,255,255,0.35);
  width: 28px;
}
.attr-bar {
  flex: 1;
  height: 4px;
  background: rgba(255,255,255,0.04);
  border-radius: 2px;
  overflow: hidden;
}
.attr-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.7;
}
.attr-val {
  font-size: 12px;
  font-weight: 500;
  width: 52px;
  text-align: right;
  font-variant-numeric: tabular-nums;
}

/* ── 事件区 ── */
.event-area {
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
}

.event-header { animation: fadeUp 0.35s ease-out; }
.event-tag {
  display: inline-block;
  font-size: 11px;
  font-weight: 500;
  color: rgba(255,255,255,0.3);
  background: rgba(255,255,255,0.04);
  padding: 3px 10px;
  border-radius: 6px;
  letter-spacing: 1px;
  margin-bottom: 12px;
}
.event-title {
  font-size: 22px;
  font-weight: 600;
  color: rgba(255,255,255,0.92);
  line-height: 1.3;
  margin-bottom: 10px;
}
.event-desc {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255,255,255,0.5);
}

/* ── 选项 ── */
.choices {
  display: flex;
  flex-direction: column;
  gap: 6px;
  animation: fadeUp 0.3s ease-out;
}
.choice {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  color: rgba(255,255,255,0.8);
  font-size: 15px;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  width: 100%;
}
.choice:hover:not(.locked) {
  background: rgba(255,255,255,0.06);
  border-color: rgba(255,255,255,0.12);
}
.choice.locked {
  opacity: 0.3;
  cursor: not-allowed;
}
.choice-text { flex: 1; }
.choice-req {
  font-size: 11px;
  font-weight: 400;
  color: rgba(239,68,68,0.6);
}
.choice-arrow {
  color: rgba(255,255,255,0.15);
  display: flex;
  flex-shrink: 0;
}

/* ── 反馈 ── */
.feedback {
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  padding: 18px;
  animation: fadeUp 0.3s ease-out;
}
.feedback-text {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.8;
  color: rgba(255,255,255,0.65);
  margin-bottom: 14px;
}
.change-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}
.tag {
  font-size: 11px;
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 8px;
}
.tag.pos {
  color: rgba(52,199,89,0.9);
  background: rgba(52,199,89,0.1);
}
.tag.neg {
  color: rgba(255,59,48,0.9);
  background: rgba(255,59,48,0.1);
}
.continue-btn {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: rgba(255,255,255,0.7);
  cursor: pointer;
  transition: all 0.2s;
}
.continue-btn:hover {
  background: rgba(255,255,255,0.12);
}

/* ── 底部栏 ── */
.bottom-bar {
  display: flex;
  gap: 0;
  padding: 10px 16px;
  padding-bottom: calc(10px + env(safe-area-inset-bottom, 0px));
  background: rgba(255,255,255,0.03);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-top: 1px solid rgba(255,255,255,0.06);
}
.bar-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px;
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  font-size: 10px;
  font-weight: 400;
  cursor: pointer;
  transition: color 0.2s;
}
.bar-btn:hover { color: rgba(255,255,255,0.6); }

/* ── 弹出层（底部抽屉） ── */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.5);
  z-index: 100;
  display: flex;
  align-items: flex-end;
  justify-content: center;
}
.sheet {
  width: 100%;
  max-width: 480px;
  max-height: 70vh;
  background: #141419;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  padding: 12px 24px 32px;
  overflow-y: auto;
}
.sheet-handle {
  width: 36px;
  height: 4px;
  background: rgba(255,255,255,0.15);
  border-radius: 2px;
  margin: 0 auto 16px;
}
.sheet-title {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255,255,255,0.85);
  text-align: center;
  margin-bottom: 16px;
}
.history-list { display: flex; flex-direction: column; }
.history-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
  font-size: 14px;
  font-weight: 300;
  color: rgba(255,255,255,0.6);
}
.history-num {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.2);
  width: 20px;
  text-align: right;
}
.sheet-close {
  width: 100%;
  padding: 14px;
  margin-top: 16px;
  font-size: 14px;
  font-weight: 500;
  background: rgba(255,255,255,0.06);
  border: none;
  border-radius: 12px;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
}
.sheet-close:hover { background: rgba(255,255,255,0.1); }

/* ── Toast ── */
.toast {
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  padding: 10px 24px;
  border-radius: 10px;
  font-size: 13px;
  font-weight: 500;
  color: rgba(255,255,255,0.8);
  z-index: 200;
}

/* ── 动画 ── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(12px); }
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

.toast-enter-active { transition: all 0.3s ease-out; }
.toast-leave-active { transition: all 0.2s ease-in; }
.toast-enter-from { opacity: 0; transform: translateX(-50%) translateY(-10px); }
.toast-leave-to { opacity: 0; transform: translateX(-50%) translateY(-10px); }
</style>
