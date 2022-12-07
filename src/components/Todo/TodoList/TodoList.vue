<script lang="ts" setup>
import { ref } from 'vue';
import { useTodoStore } from '@/stores/TodoStore';
import TodoItem from '@/components/Todo/TodoItem/TodoItem.vue'

const todoStore = useTodoStore();
const newTodoText = ref('')

const addNewTodo = () => {
    todoStore.addTodoItem(newTodoText.value);
    newTodoText.value = ''
}
</script>
<template>
    <div class="todo">
        <h3 class="todo-title">Tasks - {{ todoStore.state.todos.length }}:</h3>
        <form class="todo-form" @submit.prevent="addNewTodo" data-test="addTodoForm">
            <button type="submit" class="todo-icon" :disabled="!newTodoText" @click.prevent="addNewTodo" data-action="submit" data-test="addTodo">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <use xlink:href="/all.svg#gg-math-plus" />
                </svg>
            </button>
            <input type="text" data-action="submit" placeholder="Add todo..." v-model="newTodoText" required />
        </form>
        <div class="todo-list">
            <TodoItem v-for="todo in todoStore.state.todos" :key="todo.id" :todo="todo" data-test="todoItem" />
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

.todo button[data-action="submit"]>svg {
    width: 15px;
    height: 15px;
    color: var(--t-dark);
}
</style>