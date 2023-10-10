<script setup lang="ts">
import Track from '../../components/track/Track.vue';
import { onMounted } from 'vue'
import { COLORS } from '../../constants/colors';
import { useSettingsStore } from '@/stores/settings';

const { barsWidth } = useSettingsStore();

const heightOffset = 30;
const widthOffset = 200;
const timesignature = 4;
const bars = 100;
const trackWidth = bars * timesignature * barsWidth;
let scrollTopBound = 0;

onMounted(() => {
  const tracksContainer = document.querySelector<HTMLElement>(".tracks-container");
  const tracksGrid = document.querySelector<HTMLElement>(".timeline-background");
  const timeline = document.querySelector<HTMLElement>(".timeline");
  
  if (tracksContainer && tracksGrid && timeline) {
    scrollTopBound = tracksContainer.scrollHeight - tracksGrid.offsetHeight;
    timeline.style.width = tracksContainer.scrollWidth - widthOffset + "px";
    
    window.addEventListener("resize", () => {
      scrollTopBound = tracksContainer.scrollHeight - tracksGrid.offsetHeight;
      timeline.style.width = tracksContainer.scrollWidth + "px";
      timeline.style.width = tracksContainer.scrollWidth - widthOffset + "px";
    });
    
    tracksContainer.addEventListener("scroll", () => {
      tracksGrid.style.top = Math.min(scrollTopBound, tracksContainer.scrollTop) + 40 + "px";
    })
  }
});
</script>

<template>
  <div class="row-component arrangement">
    <div class="tracks-container">
      <div class="timeline">
        <div class="timeline-grid" v-for="item in Array(bars * timesignature).keys()"
          :style="`margin-top: ${item % timesignature == 0 ? 0 : heightOffset}px; height: ${item % timesignature == 0 ? '100%' : 'calc(100% - ' + heightOffset + 'px)'}; width: ${barsWidth - 1}px`">
          {{ item % timesignature ? "" : (item / timesignature) + 1 }}
        </div>
      </div>
      <Track 
      v-for="item in Array(20).keys()" 
      name="Drums" 
      :id="item" 
      :color="`#${COLORS[(item * 3) % COLORS.length].hex}`" 
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
  height: 100%;
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
  height: 40px;
  position: sticky;
  top: 0;
  color: #ffffff;
  z-index: 1000;
  background-color: #4A5756;
}

.timeline-grid {
  border-left: 1px solid #ffffff22;
  flex-shrink: 0;
  z-index: 1;
}

.timeline-background {
  display: flex;
  height: calc(100% - 40px);
  padding-left: 200px;
  position: absolute;
  top: 40px;
  z-index: -1;
}
</style>@/stores/settings