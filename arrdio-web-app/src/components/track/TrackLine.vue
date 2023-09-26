<script lang="ts" setup>
    defineProps({
        color: String,
        offsetLeft: Number
    })
</script>
<template>
    <div class="track-line" :style="`background-color: ${color}; margin-left: ${offsetLeft}px`">
            <input type="file" name="" id="" draggable="true" style="width: 100%; height: 100px;">
        </div>
</template>
<style>
    .track-line {
        width: 3000px;
        height: 100%;
        opacity: 0.8;
    }
</style>