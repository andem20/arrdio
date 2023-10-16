import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

export const useSettingsStore = defineStore('settings', () => {
  const bpm = ref(120);
  const timeWidth = ref(60); // width of a second
  const beatWidth = computed(() => timeWidth.value / (bpm.value / 60));

  return { bpm, timeWidth, beatWidth }
})
