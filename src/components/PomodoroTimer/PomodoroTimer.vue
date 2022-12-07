<script lang="ts" setup>
import { defineAsyncComponent, computed } from "vue";
import Pomodoros from "@/components/Pomodoros/Pomodoros.vue";
import { useTodoStore } from "@/stores/TodoStore";
import { useTimerStore } from "@/stores/TimerStore";

// Async CircleProgress component
const circleProgress = defineAsyncComponent(() =>
  import('../CircleProgress.vue')
)

const todoStore = useTodoStore()
const timerStore = useTimerStore()

const timerActions = (event: Event) => {
  event.preventDefault() // just in there will be <a> or something else
  if (todoStore.activeTodo.text.length <= 0) return

  const target = event.target as HTMLButtonElement

  timerStore.$subscribe((mutation, timerStoreState) => {
    todoStore.activeTodo.pomodoros.inSeconds = timerStoreState.state.seconds
    todoStore.activeTodo.pomodoros.completedInSeconds = timerStoreState.state.completedSeconds
  })

  switch (target.dataset.action) {
    case 'startTimer':
      timerStore.startTimer({
        seconds: todoStore.activeTodo.pomodoros.inSeconds,
        completedSeconds: todoStore.activeTodo.pomodoros.completedInSeconds,
      })
      break
    case 'stopTimer':
      timerStore.stopTimer()
      break
    case 'resetTimer':
      timerStore.resetTimer()
      break
  }
};

const prettyTime = computed<string>(() => {
  const currentValue = todoStore.activeTodo.pomodoros.inSeconds - todoStore.activeTodo.pomodoros.completedInSeconds
  if (currentValue <= 0) {
    return "00:00"
  }
  const hours = Math.floor(currentValue / 3600)
  const minutes = Math.floor((currentValue - hours * 3600) / 60)
  const seconds = currentValue - hours * 3600 - minutes * 60

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  } else {
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`
  }
})

</script>

<template>
  <div class="timer">
    <circle-progress :diameter="500" :segments="todoStore.activeTodo.pomodoros.count" :compleded-value="timerStore.state.completedSeconds"
      :value="timerStore.state.seconds">
      <div class="timer-content" @click="timerActions($event)">
        <time>{{ prettyTime }}</time>
        <Pomodoros :pomodorosCount="todoStore.activeTodo.pomodoros.count" />
        <template v-if="!timerStore.state.isRunning">
          <button type="button" class="timer-btn btn--asLink" data-action="startTimer">Start</button>
        </template>
        <template v-else>
          <button type="button" class="timer-btn btn--asLink" data-action="stopTimer">Stop</button>
        </template>
        <button type="button" class="reset-btn btn--asLink" data-action="resetTimer">Reset</button>
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
  margin-right: 10px;
  font-size: 26px;
}

.reset-btn {
  margin-top: 40px;
  margin-left: 10px;
  font-size: 26px;
}
</style>