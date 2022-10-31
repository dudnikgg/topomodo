<script lang="ts" setup>
import type { ITodoItem } from '@/types/TodoItem'
const { todo } = defineProps<{
    todo: ITodoItem
}>()

const emit = defineEmits<{
    (event: 'toggleTodo', ...args: Parameters<(id: string, isDone: boolean) => void>): void
    (event: 'removeTodo', ...args: Parameters<(id: string) => void>): void
}>()

const emitTodoToggle = (todoId: string, isDone: boolean) => { emit('toggleTodo', todoId, isDone) }


</script>
<template>
    <div class="c-todo__item">
        <div class="c-todo__checkbox-wrapper" @click="emitTodoToggle(todo.id, !todo.done)">
            <input type="checkbox" id="todoCheckbox-{{todo.id}}" class="c-input c-input--checkbox" :class="{ 'js-checked': todo.done }"
                 data-test="toggleTodo" />
            <label for='todoCheckbox' class="c-todo__text">
                <span></span>
                {{ todo.id }} - {{ todo.text }}
            </label>
        </div>
        <div class="c-pomodoros">
            <svg class="c-todo__tomato">
                <use xlink:href="/tomato.svg#tomato" />
            </svg>
            <svg class="c-todo__tomato">
                <use xlink:href="/tomato.svg#tomato" />
            </svg>
            <svg class="c-todo__tomato">
                <use xlink:href="/tomato.svg#tomato" />
            </svg>
            <svg class="c-todo__tomato">
                <use xlink:href="/tomato.svg#tomato" />
            </svg>
            <svg class="c-todo__tomato">
                <use xlink:href="/tomato.svg#tomato" />
            </svg>
        </div>
        <button class="c-todo__button" @click="$emit('removeTodo', todo.id)" data-test="removeTodo">x</button>
    </div>
</template>
<style scoped>
.c-todo__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--t-dark-grey);
    border-radius: var(--t-border-radius);
    margin: 20px 0;
    padding: 0.5em 1em;
}

.c-pomodoros {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.c-pomodoros svg {
    width: 20px;
    margin: 0 0.2em;
}
</style>