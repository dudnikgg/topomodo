<script lang="ts" setup>
import { ref } from 'vue';
import { MAX_POMODOROS } from '@/types/TodoItem'

const { pomodoros } = defineProps<{
  pomodoros: number | undefined
}>()

const emit = defineEmits<{
  (event: 'set-pomodoros', ...args: Parameters<(pomodoros: number) => void>): number
  (event: 'onMouseover', ...args: Parameters<(hoveredPomodoros: number) => void>): number
  (event: 'onMouseout', ...args: Parameters<() => void>): number
}>()

const emitSetPomodoros = (pomodoros: number) => { emit('set-pomodoros', pomodoros) }
const emitOnMouseover = (hoveredPomodoros: number) => { emit('onMouseover', hoveredPomodoros) }
const emitOnMouseout = () => { emit('onMouseout') }
</script>

<template>
  <div class="pomodoros" @mouseout="emitOnMouseout">
    <div class="pomodoros-list">
      <button type="button" class="pomodoros-item" v-for="index in MAX_POMODOROS" :key="index + 1" @mouseover="emitOnMouseover(index)" @click="emitSetPomodoros(index)">
        <svg :class="{ 'js-checked': pomodoros && pomodoros >= index }">
          <use xlink:href="/tomato.svg#tomato" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style>
.pomodoros {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}

.pomodoros .pomodoros-item {
  background-color: transparent;
  border: none;
}

.pomodoros svg {
  width: 15px;
  height: 15px;
  filter: grayscale(100%);
  cursor: pointer;
}

.pomodoros svg.js-hovered {
  filter: grayscale(50%);
}

.pomodoros svg.js-checked {
  filter: grayscale(0%);
}
</style>