import { reactive, computed } from "vue"

export default function useTimer(options: {
  seconds: number
  completedSeconds: number
  step: number
}) {
  const timer = reactive({ ...options, isRunning: false })

  let intervalId: ReturnType<typeof setInterval>

  const prettyTime = computed<string>(() => {
    const currentValue = timer.seconds - timer.completedSeconds
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

  const startTimer = () => {
    intervalId = setInterval(() => {
      if (timer.completedSeconds < timer.seconds) {
        timer.isRunning = true
        timer.completedSeconds += timer.step
      } else {
        stopTimer()
      }
    }, 1000)
  }

  const stopTimer = () => {
    timer.isRunning = false
    clearInterval(intervalId)
  }

  const resetTimer = () => {
    timer.completedSeconds = 0
    stopTimer()
  }

  return {
    timer,
    prettyTime,
    startTimer,
    stopTimer,
    resetTimer,
  }
}
