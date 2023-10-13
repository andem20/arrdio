<script setup lang="ts">
import Header from './subviews/Header.vue';
import Arrangement from './subviews/Arrangement.vue';
</script>

<template>
  <main class="main-container">
    <Header />
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