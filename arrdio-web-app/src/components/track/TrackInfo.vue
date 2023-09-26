<script lang="ts" setup>
    defineProps({
        name: String,
        number: Number,
        color: String
    })
</script>

<template>
    <div class="track-info-container">
        {{ name + " " + number }}
    </div>
</template>

<style lang="css">
    .track-info-container {
        position: fixed;
        background-color: #333333ee;
        color: #ffffff;
        z-index: 1000;
    }
</style>