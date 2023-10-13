<script lang="ts" setup>
import { ref } from 'vue';
import TrackInfo from './TrackInfo.vue';
import TrackClip from './TrackClip.vue';
import { useSettingsStore } from '@/stores/settings';

const fileReader = new FileReader();

defineProps({
    name: String!,
    id: Number!,
    color: String!,
    width: Number
})

const {audioCtx } = useSettingsStore();

const trackInfoWidth = 200;
const trackHeight = 100;

const isDragOver = ref(false)

const audioClipMap = ref(new Map<number, AudioBuffer>());

function upload(e: DragEvent) {
    const file = e.dataTransfer?.files[0];

    if (!file) {
        console.error("No file present.");
        return;
    }

    if (!file!.type.includes("audio")) {
        console.error("Not a valid audio file");
        return;
    }

    fileReader.readAsArrayBuffer(file!);

    fileReader.onloadend = async () => {
        const buffer = await audioCtx.decodeAudioData(fileReader.result as ArrayBuffer);
        const targetElement = e.target as HTMLElement;
        const position = targetElement?.parentElement?.scrollLeft! + e.clientX;
        
        audioClipMap.value.set(position, buffer);
    }
}
</script>
<template>
    <div class="track" :style="`height: ${trackHeight}px; width: ${width}px;`" @drop.prevent="
        upload($event);
    isDragOver = false;
    " @dragover.prevent="isDragOver = true" @dragleave.prevent="isDragOver = false"
        :class="{ 'drag-over': isDragOver }">
        <TrackInfo :name="name" :id="id" :color="color"
            :style="`width: ${trackInfoWidth}px; height: ${trackHeight}px`" />
        <TrackClip v-for="[position, audioClip] of audioClipMap" :audioClip="audioClip" :position="position" :color="color" />
    </div>
</template>
<style scoped>
.track {
    margin-bottom: 2px;
    position: relative;
}

.drag-over {
    background-color: #ffffff33;
}
</style>