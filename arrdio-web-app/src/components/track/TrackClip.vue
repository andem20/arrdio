<script lang="ts" setup>
import { useSettingsStore } from '@/stores/settings';
import { onMounted, ref } from 'vue';

const { audioClip } = defineProps({
    audioClip: AudioBuffer,
    position: Number,
    color: String!,
})

const { timeWidth } = useSettingsStore();
const trackWidth = audioClip!.duration * timeWidth;

const canvas = ref<InstanceType<typeof HTMLCanvasElement> | null>(null);

onMounted(() => {
    const ctx = canvas.value?.getContext("2d");
    const chunkSize = audioClip?.sampleRate! / timeWidth;

    drawChannel(audioClip!, ctx!, chunkSize, 0);
    drawChannel(audioClip!, ctx!, chunkSize, 1);
})

function drawChannel(buffer: AudioBuffer, ctx: CanvasRenderingContext2D, chunkSize: number, channel: number) {
    ctx.beginPath();

    const data = buffer.getChannelData(channel);
    ctx.fillStyle = "#ffffff";

    for (let i = chunkSize; i <= data.length; i += chunkSize) {
        const value = data.slice(i - chunkSize, i).reduce((a, b) => a + b) / chunkSize;
        ctx.fillRect(i / chunkSize - 1, 50, 1, (value * 500) * (channel == 0 ? 1 : -1));
    }
}

</script>
<template>
    <div class="track-clip drag-over" :style="`background-color: ${color}BF; width: ${trackWidth}px; left: ${position}px`" ref="trackClip">
        <canvas ref="canvas" class="track-canvas" :width="trackWidth" height="100"></canvas>
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