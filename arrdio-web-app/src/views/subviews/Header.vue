<script setup lang="ts">
import Controls from './Controls.vue';


</script>

<template>
  <div class="row-component controls-bar">
    <img src="@/assets/logo.svg" class="header-logo" />
    <div class="title">
      ARRDIO
    </div>
    <Controls class="controls" />
  </div>
</template>

<style scoped>
  .controls-bar {
    background-color: #293233;
    height: 100px;
    display: flex;
    align-items: center;
  }

  .header-logo {
    height: 60%;
    margin-left: 2em;
  }

  .title {
    font-size: 3em;
    margin-left: 20px;
    font-weight: 100;
  }

  .controls {
    float: right;
    width: 100%;
    display:  flex;
    justify-content: center;
  }
</style>