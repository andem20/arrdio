<script lang="ts" setup>
import { ref } from 'vue';
import TrackInfo from './TrackInfo.vue';
import TrackClip from './TrackClip.vue';
import { useSettingsStore } from '@/stores/settings';
import { useAudioStore } from '@/stores/audio';

const fileReader = new FileReader();

const { id } = defineProps({
    name: String!,
    id: Number!,
    color: String!,
    width: Number
})

const { timeWidth, isSnapToGrid, beatWidth } = useSettingsStore();
const { audioClips, audioManager } = useAudioStore();

const trackInfoWidth = 200;
const trackHeight = 100;

const isDragOver = ref(false)
const track = ref<HTMLElement | null>(null)
const placeholderClip = ref<HTMLElement | null>(null)

function upload(e: DragEvent) {
    handleDragLeave();

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
        const buffer = await audioManager.audioCtx.decodeAudioData(fileReader.result as ArrayBuffer);
        const position = calcPosition(e);

        audioClips.push({
            audioBuffer: buffer,
            delay: (position - trackInfoWidth) / timeWidth,
            track: id!,
            position
        });
    }
}

function calcPosition(e: DragEvent) {
    const targetElement = e.target as HTMLElement;
    let position = Math.max(targetElement?.parentElement?.scrollLeft! + e.clientX, trackInfoWidth);

    if (isSnapToGrid) {
        const subBeatWidth = beatWidth / 2;
        position = trackInfoWidth + (subBeatWidth * Math.round((position - trackInfoWidth) / subBeatWidth));
    }

    return position;
}

function handleDragOver(e: DragEvent) {
    isDragOver.value = true;
    placeholderClip.value!.style.display = "block";
    placeholderClip.value!.style.left = calcPosition(e) + "px";
}

function handleDragLeave() {
    isDragOver.value = false;
    placeholderClip.value!.style.display = "none";
}
</script>
<template>
    <div class="drop-track" ref="drop-track"
        :style="`height: ${trackHeight}px; width: ${width}px; display: ${true ? 'block' : 'none'}`" @drop.prevent="
            upload($event);
        isDragOver = false;
        " @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave">
    </div>
    <div class="placeholder-clip" ref="placeholderClip"></div>
    <div class="track" :style="`height: ${trackHeight}px; width: ${width}px;`" ref="track">
        <TrackInfo :name="name" :id="id" :color="color" :style="`width: ${trackInfoWidth}px; height: ${trackHeight}px`" />
        <TrackClip v-for="audioClip of audioClips.filter(clip => clip.track === id)" :audioClip="audioClip.audioBuffer"
            :position="audioClip.position" :color="color" />
    </div>
</template>
<style scoped>
.track {
    margin-bottom: 2px;
    position: relative;
}


.drop-track {
    position: absolute;
    z-index: 10000;
}

.placeholder-clip {
    position: absolute;
    width: 100px;
    height: 100px;
    background-color: #ffffff33;
    display: none;
}
</style>