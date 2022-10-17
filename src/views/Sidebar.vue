<script lang="ts" setup>
import TodoList from '@/components/Todo/TodoList.vue'
</script>
<template>
  <div id="l-sidebar">
    <TodoList />
  </div>
</template>
<style scoped lang="scss">
#l-sidebar {
  flex-basis: 30rem;
  flex-grow: 1;
  background-color: var(--t-dark);

  padding: var(--t-paddings);
}
</style>