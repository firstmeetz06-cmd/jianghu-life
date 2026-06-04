<template>
  <div class="game-container">
    <StartScreen v-if="!gameStarted" @start="handleStart" />
    <GameScreen v-else-if="!gameOver" />
    <EndingScreen v-else @restart="handleRestart" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useGameStore } from './stores/game'
import StartScreen from './components/StartScreen.vue'
import GameScreen from './components/GameScreen.vue'
import EndingScreen from './components/EndingScreen.vue'

const gameStore = useGameStore()
const gameStarted = computed(() => gameStore.gameStarted)
const gameOver = computed(() => gameStore.gameOver)

function handleStart(name, gender) { gameStore.startGame(name, gender) }
function handleRestart() { gameStore.resetGame() }
</script>

<style>
.game-container {
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  min-height: 100vh;
  position: relative;
}
</style>
