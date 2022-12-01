<script lang="ts" setup>
import { ref, computed, defineAsyncComponent } from "vue";
import { useActiveTodoStore } from "@/stores/ActiveTodoStore";
import Pomodoros from "../Pomodoros/Pomodoros.vue";

// Async CircleProgress component
const circleProgress = defineAsyncComponent(() =>
  import('../CircleProgress.vue')
)
const activeTodoStore = useActiveTodoStore();

let pomodorosIntervalId: ReturnType<typeof setInterval>;
let counter = ref(0);
let staticCounterValue = ref(0);
let counterCompletedSteps = ref(counter.value);

const prettyTime = computed<string>(() => {
  const minutes = Math.floor(counter.value / 60);
  const seconds = counter.value % 60;

  return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
});

activeTodoStore.$subscribe(() => {
  let pomodoros = activeTodoStore.activeTodo?.pomodoros ?? 0;
  // TODO: change to *25*60
  counter.value = pomodoros * 25 * 60;
  staticCounterValue.value = counter.value;
});

const startTimer = (target: HTMLButtonElement) => {
  target.dataset.action = "stopTimer"
  target.textContent = "Stop"
  pomodorosIntervalId = setInterval(() => {
    if (counter.value > 0) {
      counter.value -= 1;
      counterCompletedSteps.value = staticCounterValue.value - counter.value;
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
    <circle-progress :diameter="500" :segments="activeTodoStore.activeTodo.pomodoros">
      <div class="timer-content">
        <h4 class="timer-title">
          <template v-if="activeTodoStore.activeTodo.text">
            {{ activeTodoStore.activeTodo.text }}
          </template>
          <template v-else>
            Plan Your Task!
          </template>
        </h4>
        <time>{{ prettyTime }}</time>
        <Pomodoros :pomodoros="activeTodoStore.activeTodo.pomodoros" />
        <button type="button" class="timer-btn" data-action="startTimer" @click="toggleTimer($event)">Start</button>
      </div>
    </circle-progress>
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
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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

.timer-btn {
  margin-top: 40px;
}
</style>