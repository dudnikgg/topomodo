export interface IPomodoros {
  count: number
  inSeconds: number
  completedInSeconds: number
}

export interface ITodoItem {
  id: string
  text: string
  done: boolean
  selected: boolean
  pomodoros: IPomodoros
}
