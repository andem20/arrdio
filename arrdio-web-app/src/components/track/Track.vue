<script lang="ts" setup>
    import TrackInfo from './TrackInfo.vue';
    import TrackLine from './TrackLine.vue';

    defineProps({
        name: String,
        number: Number,
        color: String
    })

    const trackInfoWidth = 200;
    const trackHeight = 100;
    const trackWidth = 3000;
</script>
<template>
    <div class="track" :style="`height: ${trackHeight}px; width: ${trackWidth}px;`">
        <TrackInfo :name="name" :number="number" :style="`width: ${trackInfoWidth}px; height: ${trackHeight}px`" />
        <TrackLine :color="color" />
    </div>
</template>
<style scoped>
    .track {
        display: flex;
    }
</style>