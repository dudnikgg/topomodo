<script lang="ts" setup>
import PomodoroTimer from '@/components/PomodoroTimer/PomodoroTimer.vue';
</script>
<template>
    <div id="main" class="l-main">
        <h1>Topomodo</h1>
        <div class="l-container">
            <PomodoroTimer />
        </div>
    </div>
</template>
<style>
.l-main {
    flex-basis: 0;
    flex-grow: 999;
    min-width: 31.25rem; /* 500px */
    display: flex;
    flex-direction: column;

    padding: var(--t-paddings);
}

.l-main h1 {
    margin-top: 0;
    margin-bottom: 0;
}

.l-main .l-container {
    display: flex;
    justify-content: center;

    flex: 1 0 auto;
}
</style>