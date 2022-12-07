<script lang="ts" setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/TodoStore';
import type { ITodoItem } from '@/types/TodoItem'
import Pomodoros from '@/components/Pomodoros/Pomodoros.vue'
const { todo } = defineProps<{
    todo: ITodoItem
}>()

const todoStore = useTodoStore();
const todoRef = ref() // refference to the todo item in HTML

const pomodorosOnMouseover = (hoveredPomodoros: number) => {
    todoRef.value.querySelectorAll(".pomodoros-item > svg").forEach((pomodoroItem: HTMLElement, index: number) => {
        if (index + 1 <= hoveredPomodoros) {
            pomodoroItem.classList.add('js-hovered')
        } else {
            pomodoroItem.classList.remove('js-hovered')
        }
    })
}

const pomodorosOnMouseout = () => {
    todoRef.value.querySelectorAll(".pomodoros-item > svg").forEach((pomodoroItem: HTMLElement) => {
        pomodoroItem.classList.remove('js-hovered')
    })
}

const onTodoItemClick = () => {
    todoStore.toggleActiveTodoItem(todo.id)
}
</script>

<template>
    <div class="todo-item" ref="todoRef" :class="{ 'js-active': todoStore.activeTodo.id === todo.id }" @click="onTodoItemClick">
        <div class="l-inner">
            <div class="l-todo-top">
                <div class="l-wrapper">
                    <input type="checkbox" :id="`todoCheckbox-${todo.id}`" @change="todoStore.toggleTodoItemStatus(todo.id, !todo.done)"
                        :class="{ 'js-checked': todo.done }" data-test="toggleTodo" />
                    <label :for='`todoCheckbox-${todo.id}`' class="todo-text">
                        <span></span>
                        {{ todo.text }}
                    </label>
                </div>
            </div>
            <div class="l-todo-bottom" :class="{ 'is-disabled': todoStore.activeTodo.id === todo.id || todo.done }">
                <div class="todo-date">
                    <button type="button" class="todo-estimate btn--asLink">Estimate</button>
                </div>

                <Pomodoros :pomodoros-count="todo.pomodoros.count" @set-pomodoros="todoStore.setPomodorosTodoItem(todo.id, $event)"
                    @on-mouseout="pomodorosOnMouseout" @on-mouseover="pomodorosOnMouseover" />
            </div>
        </div>
        <button type="button" class="todo-remove" @click.prevent.stop="todoStore.removeTodoItem(todo.id)" data-test="removeTodo">
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
    border: var(--t-border-width) var(--t-border-style) transparent;
    border-radius: var(--t-border-radius);
    margin: 20px 0;
    padding: 0.5em 1em;
    cursor: pointer;
}

.todo-item.js-active {
    border: var(--t-border-width) var(--t-border-style) var(--t-dark-green);
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
    padding-left: 45px;
}

.l-todo-bottom.is-disabled {
    opacity: 0.5;
    pointer-events: none;
}

.todo-remove {
    background-color: transparent;
    border: none;
}

.todo-remove:hover>svg {
    color: var(--t-dark-red);
}

/* .todo-plan.btn--asLink {

} */
</style>