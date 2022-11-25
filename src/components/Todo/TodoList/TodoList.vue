<script lang="ts" setup>
import { ref, reactive } from 'vue';
import uniqeId from 'uniqid';

import TodoItem from '@/components/Todo/TodoItem/TodoItem.vue'
import type { ITodoItem } from '@/types/TodoItem'
const todos: Array<ITodoItem> = reactive([{
    id: uniqeId(),
    text: 'TODO 1',
    done: false,
    pomodoros: 2
}])

const newTodoText = ref('')

const addNewTodo = () => {
    if (newTodoText) {
        const newTodoItem: ITodoItem = {
            id: uniqeId(),
            text: newTodoText.value,
            pomodoros: 1,
            done: false
        }
        todos.push(newTodoItem)
        newTodoText.value = ''
    }

}

const toggleTodo = (id: string, isDone: boolean) => {
    const index = todos.findIndex(todo => todo.id === id)
    todos[index].done = isDone
}

const removeTodo = (id: string) => {
    const index = todos.findIndex(todo => todo.id === id)
    todos.splice(index, 1)
}

const setPomodorosTodo = (id: string, pomodoros: number) => {
    const index = todos.findIndex(todo => todo.id === id)
    todos[index].pomodoros = pomodoros
}

</script>
<template>
    <div class="todo">
        <h3 class="todo-title">Tasks - {{ todos.length }}:</h3>
        <form class="todo-form" @submit.prevent="addNewTodo" data-test="addTodoForm">
            <button type="submit" class="todo-icon" :disabled="!newTodoText" @click.prevent="addNewTodo" data-action="submit" data-test="addTodo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <use xlink:href="/all.svg#gg-math-plus" />
                </svg>
            </button>
            <input type="text" data-action="submit" placeholder="Add todo..." v-model="newTodoText" />
        </form>
        <div class="todo-list">
            <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @set-pomodoros-todo="setPomodorosTodo" @remove-todo="removeTodo" @toggle-todo="toggleTodo" data-test="todoItem" />
        </div>
    </div>
</template>
<style scoped>
.todo-form {
    display: flex;
    position: relative;
}

.todo input[data-action="submit"] {
    padding-left: 3em;
}

.todo button[data-action="submit"] {
    position: absolute;
    left: 0.7em;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 1;
    width: 31px;
    height: 30px;
    border: 1px solid var(--t-dark);
    border-radius: calc(var(--t-border-radius) / 1.2);
    background-color: var(--t-dark-green);
    display: flex;
    justify-content: center;
    align-items: center;
}

.todo button[data-action="submit"] > svg {
    width: 15px;
    height: 15px;
    color: var(--t-dark);
}
</style>