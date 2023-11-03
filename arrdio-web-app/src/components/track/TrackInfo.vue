<script lang="ts" setup>
import { useAnimationStore } from '@/stores/animation';
import { useAudioStore } from '@/stores/audio';
import { useSettingsStore } from '@/stores/settings';
import { storeToRefs } from 'pinia';
import { ref, watch } from 'vue';

const { id } = defineProps({
    name: String,
    id: Number,
    color: String
})

const { audioClips } = useAudioStore();
const { playbackAnimation } = useAnimationStore();
const { timeWidth } = storeToRefs(useSettingsStore());

const volumeBar = ref<HTMLElement | null>(null);

let isPlayingTrack = false;

watch(() => playbackAnimation.elapsedTime, (elapsedTime) => {
    audioClips.filter(clip => clip.track === id).forEach(clip => {
        const clipStart = clip.delay * timeWidth.value;
        const clipEnd = clipStart + clip.audioBuffer.duration * timeWidth.value;
        const playbackProgress = playbackAnimation.startX + elapsedTime * timeWidth.value;
        
        if (volumeBar !== null) {
            if (playbackProgress >= clipStart && playbackProgress <= clipEnd) {
                isPlayingTrack = true;
                const clipIndex = Math.floor(playbackProgress - clipStart);
                const volume = clip.reducedAudioBuffer![clipIndex];
                volumeBar.value!.style.width = volume * 500 + "%";
                return;
            }

            isPlayingTrack = isPlayingTrack || false;
        }

        if (!isPlayingTrack) {
            volumeBar.value!.style.width = 0 + "%";
        }
    });
});


</script>

<template>
    <div class="track-info-container">
        <div class="track-info-color" :style="`background-color: ${color}`"></div>
        <div class="track-info-content">
            <div>{{ name + " " + id }}</div>
            <div class="track-volume">
                <div class="track-volume-bar" ref="volumeBar"></div>
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