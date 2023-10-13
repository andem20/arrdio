<script lang="ts" setup>
    defineProps({
        name: String,
        id: Number,
        color: String
    })
</script>

<template>
    <div class="track-info-container">
        <div class="track-info-color" :style="`background-color: ${color}`"></div>
        <div class="track-info-content">
            {{ name + " " + id }}
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
    }
</style>track