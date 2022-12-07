import { computed, reactive } from "vue"
import { defineStore } from "pinia"
import type { ITodoItem } from "@/types/TodoItem"
import TodoItemFactory from "@/helpers/createTodoFactory"

const FAKE_TODO_ITEMS = [
  TodoItemFactory.makeTodoItem("Buy milk"),
  TodoItemFactory.makeTodoItem("Buy bread"),
  TodoItemFactory.makeTodoItem("Buy eggs"),
]

const useTodoStore = defineStore("todoStore", () => {
  // Fake todo item to show circle timer when there are no todos
  // maybe it should be reference for active todo from todos array
  let state = reactive({ todos: FAKE_TODO_ITEMS })

  const completedTodos = computed(() => state.todos.filter((todo) => todo.done))
  const activeTodo = computed(
    () =>
      state.todos.filter((todo) => todo.selected)[0] ??
      TodoItemFactory.makeTodoItem("")
  )

  const addTodoItem = (text: ITodoItem["text"]) =>
    state.todos.push(TodoItemFactory.makeTodoItem(text))

  const removeTodoItem = (id: string) => {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  }

  const toggleTodoItemStatus = (id: string, isDone: boolean) => {
    if(activeTodo.value.id === id) activeTodo.value.selected = false
    const index = state.todos.findIndex((todo) => todo.id === id)
    state.todos[index].done = isDone
  }

  const setPomodorosTodoItem = (id: string, pomodoros: number) => {
    const index = state.todos.findIndex((todo) => todo.id === id)
    state.todos[index].pomodoros.count = pomodoros
    state.todos[index].pomodoros.inSeconds = pomodoros * 25 * 60
  }

  const toggleActiveTodoItem = (todoId: ITodoItem["id"]) => {
    const index = state.todos.findIndex((todo) => todo.id === todoId)
    if (state.todos[index].done) return

    if (state.todos[index].id === activeTodo.value.id) {
      state.todos[index].selected = false
    } else {
      activeTodo.value.selected = false
      state.todos[index].selected = true
    }
  }

  return {
    state,
    completedTodos,
    activeTodo,
    addTodoItem,
    removeTodoItem,
    toggleActiveTodoItem,
    toggleTodoItemStatus,
    setPomodorosTodoItem,
  }
})

export { useTodoStore }
