<script lang="ts" setup>
import { ref } from 'vue'
import type { ITodoItem } from '@/types/TodoItem'
import Pomodoros from '@/components/Pomodoros/Pomodoros.vue'
const { todo } = defineProps<{
    todo: ITodoItem
}>()

// TODO: Should be in the store
const emit = defineEmits<{
    (event: 'toggleTodo', ...args: Parameters<(id: string, isDone: boolean) => void>): void
    (event: 'removeTodo', ...args: Parameters<(id: string) => void>): void
    (event: 'setPomodorosTodo', ...args: Parameters<(id: string, pomodoros: number) => void>): number
}>()

const emitTodoToggle = (todoId: string, isDone: boolean) => { console.log('asdasd'); emit('toggleTodo', todoId, isDone) }
const emitTodoRemove = (todoId: string) => { emit('removeTodo', todoId) }
const emitTodoSetPomodoros = (todoId: string, pomodoros: number) => { emit('setPomodorosTodo', todoId, pomodoros) }

</script>

<template>
    <div class="todo-item">
        <div class="l-inner">
            <div class="l-todo-top">
                <div class="l-wrapper">
                    <input type="checkbox" :id="`todoCheckbox-${todo.id}`" @click="emitTodoToggle(todo.id, !todo.done)" :class="{ 'js-checked': todo.done }"
                        data-test="toggleTodo" />
                    <label :for='`todoCheckbox-${todo.id}`' class="todo-text">
                        <span></span>
                        {{ todo.text }}
                    </label>
                </div>
            </div>
            <div class="l-todo-bottom">
                <button type="button" class="todo-plan" data-action="planTodo">Plan ToDo</button>
                <div class="todo-date">
                    <button type="button" data-action="todoDate">Date</button>
                </div>

                <Pomodoros :pomodoros="todo.pomodoros" @set-pomodoros="emitTodoSetPomodoros(todo.id, $event)"/>
            </div>
        </div>
        <button type="button" @click.prevent="emitTodoRemove(todo.id)" data-action="removeTodo" data-test="removeTodo">
            <svg viewBox="0 0 20 20" preserveAspectRatio="none" width="30" height="30">
                <use xlink:href="/all.svg#gg-trash" />
            </svg>
        </button>
    </div>
</template>
<style scoped>
.todo-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--t-dark-grey);
    border-radius: var(--t-border-radius);
    margin: 20px 0;
    padding: 0.5em 1em;
}

.todo .l-inner {
    flex: 1;
}

.l-todo-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.l-todo-bottom {
    display: flex;
    align-items: center;
    gap: 1em;
    padding-left: 50px;
}

.todo button[data-action="removeTodo"] {
    background-color: transparent;
    border: none;
}

.todo button[data-action="removeTodo"]:hover>svg {
    color: var(--t-dark-red);
}
</style>