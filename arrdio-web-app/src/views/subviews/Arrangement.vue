<script setup lang="ts">
  import Track from '../../components/track/Track.vue';
</script>

<template>
  <div class="row-component arrangement">
    <Track name="Drums" :number="1" color="#00ff00" />
    <div class="timeline">
      <div class="timeline-grid" v-for="item in Array(46).keys()" :style="`margin-top: ${item % 4 ? 50 : 0}px`">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
  .arrangement {
    background-color: red;
    height: calc(100% - 200px);
    width: 100vw;
    overflow-x: auto;
  }

  .timeline {
    display: flex;
    margin-top: -100px;
    margin-left: 200px;
    height: 100%;
  }

  .timeline-grid {
    border-left: 1px solid #ffffff;
    padding-right: 50px;
  }
</style>