<template>
	<div class="arrangement-container">
		<div class="arrangement-timeline" ref="timeline">
			<TimeStamp
				v-for="i in 10"
				:key="i"
				:value="new Date((i * 5 - 5) * 1000).toISOString().substring(11, 19)"
                :style="{'margin-right': '17rem'}"
			/>
		</div>
		<div class="arrangement-grid">
			<Bar 
                :beat="i" v-for="i in barsAmount" :key="i" 
                :beatSize="beatSize"
            />
		</div>
		<div
			class="arrangement-tracks-container"
			ref="arrangement-tracks-container"
		>
			<Track :bgColor="'#EF476F'" :name="'DRUMS'" @someEvent="showEvent()" />
			<Track :bgColor="'#EAB947'" :name="'BASS'" @someEvent="showEvent()" />
			<Track :bgColor="'#0DBD8F'" :name="'KEYS'" @someEvent="showEvent()" />
			<Track :bgColor="'#118AB2'" :name="'VOCAL'" @someEvent="showEvent()" />
		</div>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Bar from './Bar.vue';
import Track from './Track.vue';
import TimeStamp from './TimeStamp.vue';

@Component({
	components: {
		Bar,
		Track,
		TimeStamp,
	},
})
export default class MainArrangement extends Vue {
	barsAmount = this.$root.$data.barAmount;
    beatSize = 50;

	mounted(): void {
		const sizeSlider = document.getElementById(
			'sizeSlider'
		) as HTMLInputElement;

		sizeSlider.addEventListener('change', () => {
			// sampleRate / (bpm / 60s) = pixels
			const scale = 1 / parseInt(sizeSlider.value);
			const sampleRate = scale * this.$root.$data.sampleRate;
			const bpm = this.$root.$data.bpm;
			this.beatSize = sampleRate / (bpm / 60);
		});
	}

	showEvent(): void {
		this.barsAmount = this.$root.$data.barAmount;
	}
}
</script>

<style scoped>
.arrangement-container {
	font-size: 0.8rem;
	min-height: calc(100vh - 16rem);
	position: relative;
	top: 13rem;
}

.arrangement-grid {
	position: absolute;
	display: flex;
	height: 100%;
	margin-left: 15rem;
	top: 2rem;
}

.arrangement-timeline {
	display: flex;
	height: 100%;
	margin-left: 15rem;
}

.arrangement-tracks-container {
	margin-top: 5rem;
}

.arrangement-tracks-container > :last-child > :nth-child(2) {
	border-bottom: 1px solid #2a3131;
}
</style>