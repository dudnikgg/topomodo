<script lang="ts" setup>
import { ref, reactive } from 'vue';
import uniqeId from 'uniqid';

import TodoItem from '@/components/Todo/TodoItem.vue'
import type { ITodoItem } from '@/types/TodoItem'
const todos: Array<ITodoItem> = reactive([])

const newTodoText = ref('')

const addNewTodo = () => {
    if (newTodoText) {
        const newTodoItem: ITodoItem = {
            id: uniqeId(),
            text: newTodoText.value,
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

</script>
<template>
    <div class="c-todo">
        <h3 class="c-todo__title">Tasks - {{ todos.length }}:</h3>
        <form class="c-todo__form">
            <button type="submit" class="c-todo__add c-btn c-btn--icon" :disabled="!newTodoText" @click.prevent="addNewTodo" data-test="addTodo">
                <svg class="c-todo__add--icon" id="gg-math-plus" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z" />
                </svg>
            </button>
            <input type="text" class="c-todo__input c-input" placeholder="Add todo..." v-model="newTodoText" />
        </form>
        <div class="c-todo__list">
            <TodoItem v-for="todo in todos" :key="todo.id" :todo="todo" @removeTodo="removeTodo" @toggle-todo="toggleTodo"
                data-test="todoItem" />
        </div>
    </div>
</template>
<style scoped>
.c-todo__form {
    display: flex;
    position: relative;
}

.c-todo__input {
    padding-left: 3em;
}

.c-todo__add {
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

.c-todo__add--icon {
    width: 15px;
    height: 15px;
    fill: var(--t-dark);
}
</style>