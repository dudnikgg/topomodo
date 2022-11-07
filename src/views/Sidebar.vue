<script lang="ts" setup>
import TodoList from '@/components/Todo/TodoList/TodoList.vue'
</script>
<template>
  <div id="sidebar">
    <TodoList />
  </div>
</template>
<style scoped lang="scss">
#sidebar {
  flex-basis: 40rem;
  flex-grow: 1;
  background-color: var(--t-dark-secondary);

  padding: var(--t-paddings);
}
</style>