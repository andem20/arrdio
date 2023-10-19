<script lang="ts" setup>
import { useSettingsStore } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';

const { zoomAmount } = storeToRefs(useSettingsStore());

</script>
<template>
    <div>
        <input type="range" name="zoomSlider" id="zoomSlider" min="0" max="100" v-model="zoomAmount">
        <span>{{ zoomAmount }}</span>
    </div>
</template>
<style lang="">
    
</style>