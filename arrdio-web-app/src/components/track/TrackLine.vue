<script lang="ts" setup>
    defineProps({
        color: String,
        offsetLeft: Number
    })
</script>
<template>
    <div class="track-line drag-over" :style="`background-color: ${color}; margin-left: ${offsetLeft}px; width: 100px`"></div>
</template>
<style scoped>
    .track-line {
        width: 100%;
        height: 100%;
        opacity: 0.7;
        flex-shrink: 0;
        z-index: 90;
    }
</style>