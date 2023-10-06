<script setup lang="ts">
import Track from '../../components/track/Track.vue';
import { ref, onMounted } from 'vue'
import { COLORS } from '../../constants/colors';

const heightOffset = 30;
const timesignature = 4;
const barsWidth = 30;
const bars = 200;
const trackWidth = bars * timesignature * barsWidth;

onMounted(() => {
  const timeline = document.querySelector<HTMLElement>("#timeline");
  const tracksContainer = document.querySelector<HTMLElement>(".tracks-container");
  const timelineBackground = document.querySelector<HTMLElement>(".timeline-background");
  const tracksGrid = document.querySelector<HTMLElement>(".timeline-background");
  
  if (tracksContainer && timeline && timelineBackground && tracksGrid) {
    const scrollBound = timeline.scrollWidth - timeline.clientWidth;

    tracksContainer.addEventListener("scroll", (e: Event) => {
      const element = e.target as HTMLElement;
      timeline.scrollLeft = Math.min(element.scrollLeft, scrollBound);
      timelineBackground.scrollLeft = timeline.scrollLeft;
      tracksContainer.scrollLeft = timeline.scrollLeft;
      tracksGrid.style.top = tracksContainer.scrollTop + "px";
    })

    timeline.addEventListener("scroll", (e) => {
      const element = e.target as HTMLElement;
      timeline.scrollLeft = Math.min(element.scrollLeft, scrollBound);
      tracksContainer.scrollLeft = timeline.scrollLeft;
    });
  }
});
</script>

<template>
  <div class="row-component arrangement">
    <div class="timeline" id="timeline">
      <div class="timeline-grid" v-for="item in Array(bars * timesignature).keys()"
        :style="`margin-top: ${item % timesignature == 0 ? 0 : heightOffset}px; height: ${item % timesignature == 0 ? '100%' : 'calc(100% - ' + heightOffset + 'px)'}; width: ${barsWidth - 1}px`">
        {{ item % timesignature ? "" : (item / timesignature) + 1 }}
      </div>
    </div>
    <div class="tracks-container">
      <Track 
      v-for="item in Array(15).keys()" 
      name="Drums" 
      :number="item" 
      :color="`#${COLORS[item].hex}`" 
      :width="trackWidth"
      />
      <div class="timeline-background">
        <div class="timeline-grid" v-for="item in Array(bars * timesignature).keys()"
        :style="`height: 100%; width: ${barsWidth - 1}px`">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.arrangement {
  background-color: #4A5756;
  height: calc(100% - 50px);
  /* overflow-x: auto; */
  position: relative;
  z-index: 0;
}

.tracks-container {
  overflow: auto;
  height: calc(100% - 100px);
  background-size: 51px;
  position: relative;
}

.timeline {
  display: flex;
  padding-left: 200px;
  height: 50px;
  /* overflow-x: auto; */
  overflow-x: scroll;
  color: #ffffff;
}

.timeline::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.timeline-grid {
  border-left: 1px solid #ffffff22;
  flex-shrink: 0;
  z-index: 1;
}

.timeline-background {
  display: flex;
  height: 100%;
  padding-left: 200px;
  position: absolute;
  top: 0;
  z-index: -1;
}
</style>