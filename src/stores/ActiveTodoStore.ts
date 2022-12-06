import { ref } from "vue"
import { defineStore } from "pinia"
import type { ITodoItem } from "@/types/TodoItem"
import { useTodoStore } from "@/stores/todoStore"

const FAKE_TODO_ITEM: ITodoItem = {
  id: "1",
  text: "TODO",
  done: true,
  pomodoros: {
    count: 1,
    inSeconds: 1500,
    completedInSeconds: 0,
  },
}

const useActiveTodoStore = defineStore("activeTodoStore", () => {
  const todoStore = useTodoStore()
  // Fake todo item to show circle timer when there are no todos
  const activeTodo = ref(FAKE_TODO_ITEM)

  const toggleActiveTodoItem = (e: Event, todo: ITodoItem) => {
    const target: HTMLInputElement = e.target as HTMLInputElement

    if (todo.done || target.tagName !== "DIV") return
    activeTodo.value = todo.id === activeTodo.value.id ? FAKE_TODO_ITEM : todo
  }

  todoStore.$subscribe((mutation, state) => {
    activeTodo.value =
      state.todos[
        state.todos.findIndex((todo) => todo.id === activeTodo.value.id)
      ] || FAKE_TODO_ITEM
  })

  return {
    activeTodo,
    toggleActiveTodoItem,
  }
})

export { useActiveTodoStore }
