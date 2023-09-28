<script setup lang="ts">
  import Track from '../../components/track/Track.vue';
  import { ref, onMounted } from 'vue'

  const gridOffset = 30;
  const timesignature = 4;
  const bars = 20;

  onMounted(() => {
    const timeline = document.querySelector<HTMLElement>("#timeline");
    const tracksContainer = document.querySelector<HTMLElement>(".tracks-container");
    const tracksContainerBg = document.querySelector<HTMLElement>(".timeline-background");

    if (tracksContainer && timeline && tracksContainerBg) {
      tracksContainer?.addEventListener("scroll", (e: Event) => {
        timeline.scrollLeft = e.target?.scrollLeft;
        tracksContainerBg.style.left = -e.target?.scrollLeft + "px";
      })

      const scrollBound = tracksContainer.scrollWidth - tracksContainer.clientWidth;

      timeline?.addEventListener("scroll", (e) => {
        timeline.scrollLeft = Math.min(e.target?.scrollLeft, scrollBound);
        tracksContainer.scrollLeft = e.target?.scrollLeft;
      });
    }
  });
</script>

<template>
  <div class="row-component arrangement">
    <div class="timeline" id="timeline">
      <div class="timeline-grid" 
        v-for="item in Array(bars * timesignature).keys()" 
        :style="`margin-top: ${item % timesignature == 0 ? 0 : gridOffset}px; height: ${item % timesignature == 0 ? '100%' : 'calc(100% - '+ gridOffset + 'px)'}`">
        {{ item % timesignature ? "" : (item / timesignature) + 1 }}
      </div>
    </div>
    <div class="tracks-container">
      <div class="timeline-background">
        <div class="timeline-grid" 
          v-for="item in Array(bars * timesignature).keys()" 
          :style="`height: 100%`">
        </div>
      </div>
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
      <Track name="Drums" :number="1" color="#00ff00" />
    </div>
  </div>
</template>

<style scoped>
  .arrangement {
    background-color: red;
    height: calc(100% - 100px);
    /* overflow-x: auto; */
    position: relative;
  }

  .tracks-container {
    overflow: auto;
    height: calc(100% - 100px);
    background-size: 51px;
  }

  .timeline {
    display: flex;
    padding-left: 200px;
    height: 100px;
    /* overflow-x: auto; */
    overflow-x: scroll;
  }

  .timeline::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  .timeline-grid {
    border-left: 1px solid #ffffff;
    width: 50px;
    flex-shrink: 0;
  }

  .timeline-background {
    display: flex;
    height: 100vh;
    padding-left: 200px;
    position: absolute;
    left: 0;
  }
</style>