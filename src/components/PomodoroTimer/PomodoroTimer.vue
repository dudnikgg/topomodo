<script lang="ts" setup>
import { defineAsyncComponent, computed, watch } from "vue";
import { useActiveTodoStore } from "@/stores/ActiveTodoStore"
import useTimer from "@/composables/useTimer";
import Pomodoros from "@/components/Pomodoros/Pomodoros.vue";
// TODO: think about instead of using store for activeTodo add it to the todo props
// and timer should be in a global store because other components rely on if timer is running or not
const activeTodoStore = useActiveTodoStore()

// Async CircleProgress component
const circleProgress = defineAsyncComponent(() =>
  import('../CircleProgress.vue')
)

const timerState = computed(() => {
  return useTimer({
    seconds: activeTodoStore.activeTodo.pomodoros.inSeconds,
    step: 1,
    completedSeconds: activeTodoStore.activeTodo.pomodoros.completedInSeconds
  })
})

const timerActions = (event: Event) => {
  event.preventDefault() // just in there will be <a> or something else

  if (activeTodoStore.activeTodo.done) return
  const target = event.target as HTMLButtonElement

  switch (target.dataset.action) {
    case 'startTimer':
      timerState.value.startTimer()
      break
    case 'stopTimer':
      timerState.value.stopTimer()
      break
    case 'resetTimer':
      timerState.value.resetTimer()
      break
  }
};

// Need this to remove qoutes from a ComputedRef<string> returned from useTimer
const prettyTime = computed(() => timerState.value.prettyTime.value)
</script>

<template>
  <div class="timer">
    <circle-progress :diameter="500" :segments="activeTodoStore.activeTodo.pomodoros.count" :compleded-value="timerState.timer.completedSeconds"
      :value="timerState.timer.seconds">
      <div class="timer-content" @click="timerActions($event)">
        <time>{{ prettyTime }}</time>
        <Pomodoros :pomodorosCount="activeTodoStore.activeTodo.pomodoros.count" />
        <template v-if="!timerState.timer.isRunning">
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