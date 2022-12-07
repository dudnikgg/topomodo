import { reactive } from "vue"
import { defineStore } from "pinia"

const useTimerStore = defineStore("timerStore", () => {
  const state = reactive({
    seconds: 0,
    completedSeconds: 0,
    step: 1,
    isRunning: false,
  })

  let intervalId: ReturnType<typeof setInterval>

  const startTimer = ({ seconds = 0, completedSeconds = 0, step = 1 }) => {
    state.seconds = seconds
    state.completedSeconds = completedSeconds
    state.step = step

    intervalId = setInterval(() => {
      if (state.completedSeconds < state.seconds) {
        state.isRunning = true
        state.completedSeconds += state.step
      } else {
        stopTimer()
      }
    }, 1000)
  }

  const stopTimer = () => {
    state.isRunning = false
    clearInterval(intervalId)
  }

  const resetTimer = () => {
    state.completedSeconds = 0
    stopTimer()
  }

  return {
    state,
    startTimer,
    stopTimer,
    resetTimer,
  }
})

export { useTimerStore }
