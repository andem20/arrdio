<script lang="ts" setup>
import { useSettingsStore } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import { computed, onMounted, ref, watch, type PropType } from 'vue';
import type { AudioClip } from "@/stores/audio";

const { audioClip } = defineProps({
    audioClip: Object! as PropType<AudioClip>,
    color: String!,
})

const { timeWidth, zoomFactor } = storeToRefs(useSettingsStore());
const trackWidth = computed(() => audioClip!.audioBuffer.duration * timeWidth.value);

const canvas = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    if (audioClip == undefined) return;

    const ctx = canvas.value?.getContext("2d");
    const chunkSize = computed(() => audioClip.audioBuffer.sampleRate / timeWidth.value);

    canvas.value!.width = trackWidth.value;
    drawAudioClip(audioClip.audioBuffer, ctx!, chunkSize.value);
    
    watch(timeWidth, () => {
        canvas.value!.width = trackWidth.value;
        ctx?.clearRect(0, 0, canvas.value!.width, canvas.value!.height);
        drawAudioClip(audioClip.audioBuffer, ctx!, chunkSize.value);
        
    });
})

function drawAudioClip(audioClip: AudioBuffer, ctx: CanvasRenderingContext2D, chunkSize: number) {
    for (let i = 0; i < audioClip.numberOfChannels; i++) {
        drawChannel(audioClip!, ctx, chunkSize, 0);
    }
}

function drawChannel(buffer: AudioBuffer, ctx: CanvasRenderingContext2D, chunkSize: number, channel: number) {
    ctx.beginPath();
    
    const data = buffer.getChannelData(channel);
    ctx.fillStyle = "#ffffff";

    const reducedAudioBuffer: number[] = [];

    for (let i = chunkSize; i <= data.length; i += chunkSize) {
        const value = data.slice(i - chunkSize, i).reduce((a, b) => a + b) / chunkSize;
        reducedAudioBuffer.push(value);
        ctx.fillRect(i / chunkSize - 1, 50, 1, (value * 100));
    }

    audioClip!.reducedAudioBuffer = reducedAudioBuffer;
}

</script>
<template>
    <div class="track-clip drag-over" :style="`background-color: ${color}BF; width: ${trackWidth}px; left: ${200 + (audioClip!.position / zoomFactor)}px`" ref="trackClip">
        <canvas ref="canvas" class="track-canvas" :width="100" height="100"></canvas>
    </div>
</template>
<style scoped>
.track-clip {
    position: absolute;
    height: 100%;
    z-index: 90;
    top: 0px;
}
</style>