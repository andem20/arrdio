<script lang="ts" setup>
defineProps({
    audioClip: Uint8Array,
    position: Number,
    color: String!,
})
</script>
<template>
    <div class="track-clip drag-over" :style="`background-color: ${color}; width: 100px; left: ${position}px`">
    </div>
</template>
<style scoped>
.track-clip {
    position: absolute;
    height: 100%;
    opacity: 0.7;
    z-index: 90;
    top: 0px;
}
</style>