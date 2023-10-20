import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const bpm = ref(120);
  const isSnapToGrid = ref(true);
  const maxZoom = 100;
  const zoomAmount = ref(maxZoom);
  const zoomFactor = computed(() => Math.max(0.01, zoomAmount.value / maxZoom));
  const timeWidth = computed(() => 60 / zoomFactor.value); // width of a second
  const beatWidth = computed(() => timeWidth.value / (bpm.value / 60));
  const keysPressed = new Set<string>();

  const timesignature = 4;
  const bars = 100;
  const trackWidth = computed(() => bars * timesignature * beatWidth.value);

  return { bpm, timeWidth, beatWidth, isSnapToGrid, zoomAmount, trackWidth, timesignature, bars, zoomFactor, keysPressed }
})
