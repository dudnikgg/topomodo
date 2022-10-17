<script lang="ts" setup>
import { ref, reactive } from 'vue';

import TodoItem from '@/components/Todo/TodoItem.vue'
import type { ITodoItem } from '@/types/TodoItem'
const todos: Array<ITodoItem> = reactive([])

const newTodoText = ref('')

const addNewTodo = () => {
    if (newTodoText) {
        const newTodoItem: ITodoItem = {
            id: todos.length + 1,
            text: newTodoText.value,
            done: false
        }
        todos.push(newTodoItem)
        newTodoText.value = ''
    }

}

const toggleTodo = (id:number, done: boolean) => {
    const index = todos.findIndex(todo => todo.id === id)
    todos[index].done = done
}

const removeTodo = (id: number) => {
    const index = todos.findIndex(todo => todo.id === id)
    todos.splice(index, 1)
}

</script>
<template>
    <div class="c-todo">
        <h2 class="c-todo__title">Tasks:</h2>
        <div class="c-todo__item c-todo__item--add">
            <button class="c-todoItem__button" :disabled="!newTodoText" @click="addNewTodo" data-test="addTodo">+</button>
            <input type="text" class="c-todoItem__input" placeholder="Add new todo" @keyup.enter="addNewTodo" v-model="newTodoText" />
        </div>
        <template v-for="todo in todos">
            <TodoItem :todo="todo" @removeTodo="removeTodo" @toggleTodo="toggleTodo" data-test="todoItem"/>
        </template>
    </div>
</template>
<style scoped>

</style>