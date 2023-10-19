<script setup lang="ts">
import Track from '../../components/track/Track.vue';
import { computed, onMounted, ref, watch } from 'vue'
import { COLORS } from '../../constants/colors';
import { useSettingsStore } from '@/stores/settings';
import { useAudioStore } from '@/stores/audio';
import { storeToRefs } from 'pinia';

const { beatWidth, timeWidth, trackWidth, zoomFactor } = storeToRefs(useSettingsStore());
const { timesignature, bars } = useSettingsStore();
const { audioManager } = useAudioStore();

const heightOffset = 30;
const widthOffset = 200;

let scrollTopBound = 0;

const playbackLine = ref<HTMLElement | null>(null);
const tracksContainer = ref<HTMLElement | null>(null);
const timelineBg = ref<HTMLElement | null>(null);
const timeline = ref<HTMLElement | null>(null);
let playbackPosition = 0;

onMounted(() => {
  scrollTopBound = tracksContainer.value!.scrollHeight - timelineBg.value!.offsetHeight;
  timeline.value!.style.width = tracksContainer.value!.scrollWidth - widthOffset + "px";
  
  window.addEventListener("resize", () => {
    scrollTopBound = tracksContainer.value!.scrollHeight - timelineBg.value!.offsetHeight;
    timeline.value!.style.width = tracksContainer.value!.scrollWidth + "px";
    timeline.value!.style.width = tracksContainer.value!.scrollWidth - widthOffset + "px";
  });
  
  tracksContainer.value!.addEventListener("scroll", () => {
    timelineBg.value!.style.top = Math.min(scrollTopBound, tracksContainer.value!.scrollTop) + 40 + "px";
    playbackLine.value!.style.top = Math.min(scrollTopBound, tracksContainer.value!.scrollTop) + 30 + "px";
  })

  watch(zoomFactor, () => {
    playbackLine.value!.style.transform = `translateX(${playbackPosition / zoomFactor.value}px)`;
  });
});

//TODO move this
let start: number | undefined, previousTimestamp: number | undefined;
let done = false;
let running = false;
let activeAnimationFrame: number;

function stepPlayback(timestamp: number) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start!;

  if (previousTimestamp !== timestamp) {
    const count = Math.min(timeWidth.value * (elapsed / 1000), trackWidth.value);
    playbackPosition = count * zoomFactor.value;
    playbackLine.value!.style.transform = `translateX(${count}px)`;
    if (count === trackWidth.value) done = true;
  }

  previousTimestamp = timestamp;

  if (!done && running) {
    activeAnimationFrame = window.requestAnimationFrame(stepPlayback);
  }
}

function startPlayback() {
  if (!running) {
    audioManager.play();
    activeAnimationFrame = window.requestAnimationFrame(stepPlayback);
  } else {
    start = undefined;
    previousTimestamp = undefined;
    audioManager.stop();
    window.cancelAnimationFrame(activeAnimationFrame);
  }

  running = !running;
}

window.addEventListener("keypress", (e: KeyboardEvent) => {
  e.preventDefault();
  
  if (e.code === "Space") {
    startPlayback();
  }
});
</script>

<template>
  <div class="row-component arrangement">
    <div class="tracks-container" ref="tracksContainer">
      <div class="playback-line-container" ref="playbackLine">
        <div class="playback-line-edge"></div>
        <div class="playback-line"></div>
      </div>
      <div class="timeline" ref="timeline">
        <div class="timeline-grid" v-for="item in Array(bars * timesignature).keys()"
        :style="`margin-top: ${item % timesignature == 0 ? 0 : heightOffset}px; height: ${item % timesignature == 0 ? '100%' : 'calc(100% - ' + heightOffset + 'px)'}; width: ${beatWidth - 1}px`">
        {{ item % timesignature ? "" : (item / timesignature) + 1 }}
      </div>
    </div>
    <Track 
      v-for="item in Array(20).keys()" 
      name="Drums" 
      :id="item" 
      :color="`#${COLORS[(item * 3) % COLORS.length].hex}`" 
    />
    <div class="timeline-background" ref="timelineBg">
      <div class="timeline-grid" v-for="item in Array(bars * timesignature).keys()"
      :style="`height: 100%; width: ${beatWidth - 1}px`">
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
  z-index: 100;
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

.playback-line-container {
  position: absolute;
  z-index: 150;
  width: 10px;
  height: calc(100% - 32px);
  left: 195px;
  top: 30px;
}

.playback-line {
  background-color: #00000055;
  height: 100%;
  width: 2px;
  display: block;
  margin-left: calc(50% - 1px);
}

.playback-line-edge {
  background-color: #00000055;
  height: 2px;
  width: 100%;
  display: block;
}

</style>