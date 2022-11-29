<script lang="ts" setup>
import { ref, computed } from "vue";
import { useActiveTodoStore } from "@/stores/ActiveTodoStore";
import RadialProgressBar from "~/vue3-radial-progress";
import Pomodoros from "../Pomodoros/Pomodoros.vue";

const activeTodoStore = useActiveTodoStore();

let pomodorosIntervalId: ReturnType<typeof setInterval>;
let counter = ref(0);

const prettyTime = computed<string>(() => {
  const minutes = Math.floor(counter.value / 60);
  const seconds = counter.value % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

activeTodoStore.$subscribe(() => {
  let pomodoros = activeTodoStore.activeTodo?.pomodoros ?? 0;
  counter.value = pomodoros * 1 * 1;
});

const startTimer = (target: HTMLButtonElement) => {
  target.dataset.action = "stopTimer"
  target.textContent = "Stop"
  pomodorosIntervalId = setInterval(() => {
    if(counter.value > 0) {
      counter.value -= 1;
    } else {
      stopTimer(target);
    }
  }, 1000)
}

const stopTimer = (target: HTMLButtonElement) => {
  target.dataset.action = "startTimer"
  target.textContent = "Start"

  clearInterval(pomodorosIntervalId)
}

const toggleTimer = (event: Event) => {
  const target: HTMLButtonElement = event.target as HTMLButtonElement;
  if (target.dataset.action === "stopTimer") {
    stopTimer(target);
  } else if (target.dataset.action === "startTimer") {
    startTimer(target);
  }
};
</script>

<template>
  <div class="timer">
    <radial-progress-bar :diameter="500" :completed-steps="0" :total-steps="activeTodoStore.activeTodo.pomodoros">
      <div class="timer-content">
        <h4 class="timer-title">
          <template v-if="activeTodoStore.activeTodo.text">
            {{ activeTodoStore.activeTodo.text }}
          </template>
          <template v-else>
            Start doing your task!
          </template>
        </h4>
        <time>{{prettyTime}}</time>
        <Pomodoros :pomodoros="activeTodoStore.activeTodo.pomodoros" />
      </div>
      <button type="button" class="timer-btn" data-action="startTimer" @click="toggleTimer($event)">Start</button>
    </radial-progress-bar>
  </div>
</template>

<style scoped>
.timer {
  display: flex;
  align-items: center;
  justify-content: center;

  flex: 1 0 100%;
}

.timer-content {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: center;
  justify-content: center;

  text-align: center;

  width: 80%;
  height: 80%;
}

.timer-title {
  flex: 1 0 100%;
  font-size: 2em;
  margin-top: 0;
  margin-bottom: var(--t-paddings);
}

.pomodoros {
  flex: 1 0 100%;
  justify-content: center;
}

.pomodoros svg {
  width: 50px;
  height: 50px;
}

.timer time {
  flex: 1 0 100%;
  font-size: 5em;
  margin-top: 0;
  margin-bottom: calc(var(--t-paddings) / 2);
}
</style>