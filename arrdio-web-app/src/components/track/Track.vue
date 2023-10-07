<script lang="ts" setup>
    import { ref } from 'vue';
import TrackInfo from './TrackInfo.vue';
    import TrackLine from './TrackLine.vue';

    defineProps({
        name: String,
        number: Number,
        color: String,
        width: Number
    })

    const trackInfoWidth = 200;
    const trackHeight = 100;

    const isDragOver = ref(false)

    function upload() {
        console.log("upload")
    }
</script>
<template>
    <div class="track" 
        :style="`height: ${trackHeight}px; width: ${width}px;`"
        @drop.prevent="
            upload();
            isDragOver = false;
        "
        @dragover.prevent="isDragOver = true"
        @dragleave.prevent="isDragOver = false"
        :class="{ 'drag-over': isDragOver }"
    >
        <TrackInfo :name="name" :number="number" :color="color"
            :style="`width: ${trackInfoWidth}px; height: ${trackHeight}px`" />
        <!-- <TrackLine :color="color" /> -->
    </div>
</template>
<style scoped>
    .track {
        display: flex;
        margin-bottom: 2px;
        z-index: 100;
    }

    .drag-over {
        background-color: #ffffff33;
    }
</style>