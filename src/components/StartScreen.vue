<template>
  <div class="start-screen">
    <div class="content">
      <!-- 标题 -->
      <div class="title-area">
        <h1 class="game-title">江湖人生</h1>
        <p class="subtitle">文字冒险 · 一世浮沉</p>
      </div>

      <!-- 创建角色 -->
      <div class="form">
        <!-- 名字 -->
        <div class="field">
          <label>侠客名号</label>
          <div class="input-wrap">
            <input
              v-model="name"
              type="text"
              class="text-input"
              placeholder="输入你的名字"
              maxlength="6"
            />
            <button class="icon-btn" @click="randomName" title="随机">
              <span v-html="icon('refresh', 18)"></span>
            </button>
          </div>
        </div>

        <!-- 性别 -->
        <div class="field">
          <label>性别</label>
          <div class="seg-control">
            <button
              class="seg-btn"
              :class="{ active: gender === '男' }"
              @click="gender = '男'"
            >男</button>
            <button
              class="seg-btn"
              :class="{ active: gender === '女' }"
              @click="gender = '女'"
            >女</button>
          </div>
        </div>

        <!-- 开始 -->
        <button
          class="primary-btn"
          @click="startGame"
          :disabled="!name || !gender"
        >
          踏入江湖
        </button>
      </div>

      <!-- 继续 -->
      <button v-if="hasSave" class="ghost-btn" @click="loadGame">
        继续上次的旅程
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useGameStore } from '../stores/game'
import { generateName } from '../utils/config'
import { icon } from '../utils/icons'

const emit = defineEmits(['start'])
const gameStore = useGameStore()

const name = ref('')
const gender = ref('')
const hasSave = ref(false)

onMounted(() => {
  hasSave.value = !!localStorage.getItem('jianghu_save')
  document.addEventListener('keypress', handleKeyPress)
})

function handleKeyPress() {
  if (!name.value) randomName()
  if (!gender.value) gender.value = '男'
  if (name.value && gender.value) startGame()
}

function randomName() { name.value = generateName() }

function startGame() {
  if (name.value && gender.value) emit('start', name.value, gender.value)
}

function loadGame() { gameStore.loadGame() }
</script>

<style scoped>
.start-screen {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  background: #0a0a0f;
}

.content {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 40px;
  animation: fadeUp 0.8s ease-out;
}

/* 标题 */
.title-area { text-align: center; }
.game-title {
  font-size: 36px;
  font-weight: 300;
  letter-spacing: 10px;
  color: rgba(255,255,255,0.92);
  margin-bottom: 8px;
}
.subtitle {
  font-size: 13px;
  font-weight: 300;
  color: rgba(255,255,255,0.3);
  letter-spacing: 4px;
}

/* 表单 */
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.field label {
  display: block;
  font-size: 12px;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  margin-bottom: 8px;
  letter-spacing: 1px;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.text-input {
  width: 100%;
  padding: 14px 48px 14px 16px;
  font-size: 16px;
  font-weight: 400;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  color: rgba(255,255,255,0.9);
  outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.text-input:focus {
  border-color: rgba(255,255,255,0.2);
  background: rgba(255,255,255,0.06);
}
.text-input::placeholder { color: rgba(255,255,255,0.2); }

.icon-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: rgba(255,255,255,0.3);
  cursor: pointer;
  padding: 4px;
  display: flex;
  transition: color 0.2s;
}
.icon-btn:hover { color: rgba(255,255,255,0.6); }

/* 分段控件 */
.seg-control {
  display: flex;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 12px;
  overflow: hidden;
}
.seg-btn {
  flex: 1;
  padding: 13px;
  font-size: 15px;
  font-weight: 400;
  background: transparent;
  border: none;
  color: rgba(255,255,255,0.35);
  cursor: pointer;
  transition: all 0.25s;
}
.seg-btn + .seg-btn { border-left: 1px solid rgba(255,255,255,0.06); }
.seg-btn.active {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.9);
}

/* 按钮 */
.primary-btn {
  width: 100%;
  padding: 16px;
  font-size: 16px;
  font-weight: 500;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 14px;
  color: #0a0a0f;
  cursor: pointer;
  transition: all 0.2s;
  margin-top: 8px;
  letter-spacing: 2px;
}
.primary-btn:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-1px);
}
.primary-btn:disabled {
  background: rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.2);
  cursor: not-allowed;
}

.ghost-btn {
  width: 100%;
  padding: 14px;
  font-size: 14px;
  font-weight: 400;
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

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
