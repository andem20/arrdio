<script setup lang="ts">
import Track from '@/components/track/Track.vue';
import { onMounted, ref, watch } from 'vue'
import { COLORS } from '@/constants/colors';
import { useSettingsStore } from '@/stores/settings';
import { useAudioStore } from '@/stores/audio';
import { storeToRefs } from 'pinia';
import { useAnimationStore, type Animation, type AnimationCallback } from '@/stores/animation';

const { beatWidth, timeWidth, trackWidth, zoomAmount, zoomFactor } = storeToRefs(useSettingsStore());
const { timesignature, bars, keysPressed } = useSettingsStore();
const { playbackPosition } = storeToRefs(useAudioStore());
const { audioManager } = useAudioStore();
const { playbackAnimation, playbackLineOffset } = useAnimationStore();

const heightOffset = 30;
const widthOffset = 200;

let scrollTopBound = 0;

const playbackLine = ref<HTMLElement | null>(null);
const tracksContainer = ref<HTMLElement | null>(null);
const timelineBg = ref<HTMLElement | null>(null);
const timeline = ref<HTMLElement | null>(null);
let relativePlaybackPosition = 0;

onMounted(() => {
	scrollTopBound = tracksContainer.value!.scrollHeight - timelineBg.value!.offsetHeight;

	window.addEventListener("resize", () => {
		scrollTopBound = tracksContainer.value!.scrollHeight - timelineBg.value!.offsetHeight;
		timeline.value!.style.width = tracksContainer.value!.scrollWidth + "px";
		timeline.value!.style.width = tracksContainer.value!.scrollWidth - widthOffset + "px";
	});

	tracksContainer.value!.addEventListener("scroll", (e: Event) => {
		timelineBg.value!.style.top = Math.min(scrollTopBound, tracksContainer.value!.scrollTop) + 40 + "px";
		playbackLine.value!.style.top = Math.min(scrollTopBound, tracksContainer.value!.scrollTop) + 30 + "px";
	});

	tracksContainer.value?.addEventListener("wheel", (e: WheelEvent) => {
		if (keysPressed.has("ControlLeft" || "ControlRight")) {
			e.preventDefault();
			zoomAmount.value += e.deltaY * 0.1;
			const containerMid = tracksContainer.value!.clientWidth / 2;
			tracksContainer.value!.scrollLeft = playbackAnimation.startX / zoomFactor.value - containerMid;
		}
	});

	timeline.value?.addEventListener("click", movePlaybackLine);
	tracksContainer.value?.addEventListener("click", movePlaybackLine);

	watch(zoomFactor, () => {
		playbackLine.value!.style.left = playbackLineOffset + (playbackAnimation.startX + relativePlaybackPosition) / zoomFactor.value + "px";
	});
});

const callback: AnimationCallback = (animation: Animation) => {
	const progress = Math.min(timeWidth.value * animation.elapsedTime.value, trackWidth.value);
	relativePlaybackPosition = progress * zoomFactor.value;
	playbackLine.value!.style.left = playbackLineOffset + (animation.startX + relativePlaybackPosition) / zoomFactor.value + "px";
	animation.isDone = progress === trackWidth.value;
}

playbackAnimation.callbacks.push(callback)

function movePlaybackLine(e: MouseEvent) {
	playbackAnimation.startX = (tracksContainer.value!.scrollLeft + e.clientX - playbackLineOffset - 5) * zoomFactor.value;
	playbackLine.value!.style.left = playbackLineOffset + playbackAnimation.startX / zoomFactor.value + "px";
	playbackPosition.value = (playbackLine.value!.offsetLeft - widthOffset) / timeWidth.value;
	relativePlaybackPosition = 0;
}

window.addEventListener("keydown", (e: KeyboardEvent) => {
	e.preventDefault();

	keysPressed.add(e.code);

	if (e.code === "Space") {
		playbackAnimation.toggle(audioManager.play, audioManager.stop);
	}
});

window.addEventListener("keyup", (e: KeyboardEvent) => keysPressed.delete(e.code));
</script>

<template>
	<div class="row-component arrangement">
		<div class="tracks-container" ref="tracksContainer">
			<div class="playback-line-container" ref="playbackLine">
				<div class="playback-line-edge"></div>
				<div class="playback-line"></div>
			</div>
			<div class="timeline" ref="timeline">
				<div class="timeline-grid" v-for="item in Array(bars * timesignature).keys()"
					:style="`margin-top: ${item % timesignature == 0 ? 0 : heightOffset}px; height: ${item % timesignature == 0 ? '100%' : 'calc(100% - ' + heightOffset + 'px)'}; width: ${beatWidth - 1}px`">
					{{ item % timesignature ? "" : (item / timesignature) + 1 }}
				</div>
			</div>
			<Track v-for="item in Array(20).keys()" name="Drums" :id="item"
				:color="`#${COLORS[(item * 3) % COLORS.length].hex}`" />
			<div class="timeline-background" ref="timelineBg">
				<div class="timeline-grid" v-for="item in Array(bars * timesignature).keys()"
					:style="`height: 100%; width: ${beatWidth - 1}px`">
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.arrangement {
	background-color: #4A5756;
	height: 100%;
	position: relative;
	z-index: 0;
}

.tracks-container {
	overflow: auto;
	height: calc(100% - 100px);
	background-size: 51px;
	position: relative;
}

.timeline {
	display: flex;
	padding-left: 200px;
	height: 40px;
	position: sticky;
	top: 0;
	color: #ffffff;
	z-index: 100;
	background-color: #4A5756;
}

.timeline-grid {
	border-left: 1px solid #ffffff22;
	flex-shrink: 0;
	z-index: 1;
}

.timeline-background {
	display: flex;
	height: calc(100% - 40px);
	padding-left: 200px;
	position: absolute;
	top: 40px;
	z-index: -1;
}

.playback-line-container {
	position: absolute;
	z-index: 150;
	width: 10px;
	height: calc(100% - 32px);
	left: 195px;
	top: 30px;
}

.playback-line {
	background-color: #00000055;
	height: 100%;
	width: 2px;
	display: block;
	margin-left: calc(50% - 1px);
}

.playback-line-edge {
	background-color: #00000055;
	height: 2px;
	width: 100%;
	display: block;
}
</style>