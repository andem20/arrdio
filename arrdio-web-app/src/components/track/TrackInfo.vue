<script lang="ts" setup>
import { useAudioStore } from '@/stores/audio';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';

defineProps({
    name: String,
    id: Number,
    color: String
})

const { playbackPosition } = storeToRefs(useAudioStore());

watch(playbackPosition, (position) => {
    console.log(position)
})


</script>

<template>
    <div class="track-info-container">
        <div class="track-info-color" :style="`background-color: ${color}`"></div>
        <div class="track-info-content">
            <div>{{ name + " " + id }}</div>
            <div class="track-volume">
                <div class="track-volume-bar"></div>
            </div>
        </div>
    </div>
</template>

<style lang="css">
.track-info-container {
    position: sticky;
    left: 0;
    background-color: #404D4Cee;
    color: #ffffff;
    z-index: 200;
    flex-shrink: 0;
    display: flex;
}

.track-info-color {
    width: 15px;
}

.track-info-content {
    margin-left: 5px;
    padding: 5px;
    width: calc(100% - 15px);
}

.track-volume {
    background-color: #00000022;
    margin-top: 10px;
    width: 150px;
    height: 15px;
}

.track-volume-bar {
    width: 0%;
    height: 100%;
    background-color: #00AA00;
}
</style>track