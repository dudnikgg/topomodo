import { defineStore } from "pinia"
import type { ITodoItem } from "@/types/TodoItem"
import uniqeId from "uniqid"

const useTodoStore = defineStore("todoStore", {
  state: () => ({
    todos: [
      {
        id: uniqeId(),
        text: "TODO 1",
        done: false,
        pomodoros: 2,
      },
    ] as Array<ITodoItem>,
  }),

  getters: {
    completedTodos(): Array<ITodoItem> {
      return this.todos.filter((todo) => todo.done)
    },
  },

  actions: {
    addTodoItem(todo: ITodoItem) {
      this.todos.push(todo)
    },

    removeTodoItem(id: string) {
      this.todos = this.todos.filter((todo) => todo.id !== id)
    },

    toggleTodoItemStatus(id: string, isDone: boolean) {
      const index = this.todos.findIndex((todo) => todo.id === id)
      this.todos[index].done = isDone
    },

    setPomodorosTodoItem(id: string, pomodoros: number) {
      const index = this.todos.findIndex((todo) => todo.id === id)
      this.todos[index].pomodoros = pomodoros
    },
  },
})

export { useTodoStore }
