<script setup lang="ts">
import ControlsBar from './subviews/ControlsBar.vue';
import Arrangement from './subviews/Arrangement.vue';
</script>

<template>
  <main class="main-container">
    <ControlsBar />
    <Arrangement />
  </main>
</template>

<style scoped>
  .main-container {
    height: 100vh;
    /* min-height: 800px; */
    overflow: hidden;
  }
</style>