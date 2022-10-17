<script setup lang="ts">
import Sidebar from './views/Sidebar.vue';
import Main from './views/Main.vue';
</script>

<template>
  <Sidebar />
  <Main />
</template>

<style>
#l-app {
  display: flex;
  flex-wrap: wrap;
  min-height: 100vh;
}
</style>
