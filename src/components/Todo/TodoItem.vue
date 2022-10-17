<script lang="ts" setup>
import type { ITodoItem } from '@/types/TodoItem'
const { todo } = defineProps<{
    todo: ITodoItem
}>()

</script>
<template>
    <div class="c-todo__item">
        <button class="c-todo__button" @click="$emit('toggleTodo', todo.id, !todo.done)" data-test="toggleTodo">{{todo.done ? '!': '✓' }}</button>
        <p class="c-todo__text">{{todo.text}}</p>
        <button class="c-todo__button" @click="$emit('removeTodo', todo.id)" data-test="removeTodo">x</button>
    </div>
</template>
<style scoped>

</style>