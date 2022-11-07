<script lang="ts" setup>
import { ref } from 'vue'
import type { ITodoItem } from '@/types/TodoItem'
import { MAX_POMODOROS } from '@/types/TodoItem'
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

const pomodorosItems = ref([])

const pomodorosOnMouseover = (hoveredPomodoros: number) => {
    pomodorosItems.value.forEach((pomodoroItem: HTMLElement, index: number) => {
        if (index + 1 <= hoveredPomodoros) {
            pomodoroItem.classList.add('js-hovered')
        } else {
            pomodoroItem.classList.remove('js-hovered')
        }
    })
}
</script>
<template>
    <div class="todo__item">
        <div class="todo__item--top">
            <div class="todo__checkbox-wrapper">
                <input type="checkbox" :id="`todoCheckbox-${todo.id}`" @click="emitTodoToggle(todo.id, !todo.done)" :class="{ 'js-checked': todo.done }"
                    data-test="toggleTodo" />
                <label :for='`todoCheckbox-${todo.id}`' class="todo__text">
                    <span></span>
                    {{ todo.text }}
                </label>
            </div>
            <button type="button" class="todo__delete iconButton" @click.prevent="emitTodoRemove(todo.id)" data-test="removeTodo">
                <svg>
                    <use xlink:href="/all.svg#gg-trash" />
                </svg>
            </button>
        </div>
        <div class="todo__item--bottom">
            <div class="pomodoros">
                <div class="pomodoros__item" v-for="index in MAX_POMODOROS" :key="index + 1">
                    <button type="button" class="iconButton">
                        <svg ref="pomodorosItems" :class="{ 'js-checked': todo.pomodoros && todo.pomodoros >= index }" @mouseover="pomodorosOnMouseover(index)"
                            @click="emitTodoSetPomodoros(todo.id, index)">
                            <use xlink:href="/tomato.svg#tomato" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.todo__item {
    background-color: var(--t-dark-grey);
    border-radius: var(--t-border-radius);
    margin: 20px 0;
    padding: 0.5em 1em;
}

.todo__item--top {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.todo__item--bottom {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 50px;
}

.todo__delete>svg {
    width: 30px;
    height: 30px;
}

.todo__delete:hover>svg {
    color: var(--t-dark-red);
}

.pomodoros {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
}

.pomodoros svg {
    width: 15px;
    height: 15px;
    filter: grayscale(100%);
    cursor: pointer;
}

.pomodoros svg.js-hovered {
    filter: grayscale(50%);
}

.pomodoros svg.js-checked {
    filter: grayscale(0%);
}
</style>