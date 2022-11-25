<script lang="ts" setup>
import { ref } from 'vue';
import { MAX_POMODOROS } from '@/types/TodoItem'

const { pomodoros } = defineProps<{
  pomodoros: number | undefined
}>()

const pomodorosItems = ref([])

const emit = defineEmits<{
  (event: 'set-pomodoros', ...args: Parameters<(pomodoros: number) => void>): number
}>()

const emitSetPomodoros = (pomodoros: number) => { emit('set-pomodoros', pomodoros) }

const pomodorosOnMouseover = (hoveredPomodoros: number) => {
  pomodorosItems.value.forEach((pomodoroItem: HTMLElement, index: number) => {
    if (index + 1 <= hoveredPomodoros) {
      pomodoroItem.classList.add('js-hovered')
    } else {
      pomodoroItem.classList.remove('js-hovered')
    }
  })
}
</script>

<template>
  <div class="pomodoros">
    <div class="pomodoros-list" v-for="index in MAX_POMODOROS" :key="index + 1">
      <button type="button">
        <svg ref="pomodorosItems" :class="{ 'js-checked': pomodoros && pomodoros >= index }" @mouseover="pomodorosOnMouseover(index)"
          @click="emitSetPomodoros(index)">
          <use xlink:href="/tomato.svg#tomato" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.pomodoros {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 5px;
}

.pomodoros button {
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