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
</script>
<template>
    <div :style="`height: ${trackHeight}px`">
        <TrackInfo :name="name" :number="number" :style="`width: ${trackInfoWidth}px; height: ${trackHeight}px`" />
        <TrackLine :color="color" :offset-left="trackInfoWidth" />
    </div>
</template>
<style>

</style>