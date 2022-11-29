export interface ITodoItem {
  id: string
  text: string
  done: boolean
  pomodoros: number
}

export const MAX_POMODOROS = 5