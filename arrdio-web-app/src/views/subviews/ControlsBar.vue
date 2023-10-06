<script setup lang="ts">

</script>

<template>
  <div class="row-component controls-bar">
    <img src="@/assets/logo.svg" class="header-logo" />
    <div class="title">
      ARRDIO
    </div>
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
</style>