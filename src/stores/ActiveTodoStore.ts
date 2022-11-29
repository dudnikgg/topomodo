import { computed, ref } from "vue"
import { defineStore } from "pinia"
import type { ITodoItem } from "@/types/TodoItem"
import { useTodoStore } from "@/stores/todoStore"

const useActiveTodoStore = defineStore("activeTodoStore", () => {
  const todoStore = useTodoStore()

  const activeTodo = ref({} as ITodoItem)

  const setActiveTodoItem = (todo: ITodoItem) => {
    activeTodo.value = todo
  }

  todoStore.$subscribe((mutation, state) => {
    activeTodo.value =
      state.todos[
        state.todos.findIndex((todo) => todo.id === activeTodo.value.id)
      ] || {}
  })

  return {
    activeTodo,
    setActiveTodoItem,
  }
})

export { useActiveTodoStore }
