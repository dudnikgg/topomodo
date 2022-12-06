export interface ITodoItem {
  id: string
  text: string
  done: boolean
  pomodoros: {
    count: number,
    inSeconds: number,
    completedInSeconds: number,
  }
}

export const MAX_POMODOROS = 5