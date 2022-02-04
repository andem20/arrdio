<template>
	<div class="track-container">
		<div class="track-info-container">
			<div
				class="track-container-color"
				:style="{ backgroundColor: bgColor }"
			></div>
			<div class="track-content">
				{{ this.name }}
			</div>
		</div>
		<div
			class="track-waves"
			@drop.prevent="
				upload($event);
				setDragOver(false);
			"
			@dragover.prevent="setDragOver(true)"
			@dragleave.prevent="setDragOver(false)"
			:class="{ 'drag-over': this.isDragOver }"
			ref="track_waves_container"
		></div>
		<div class="track-height-spacer" ref="track_waves"></div>
	</div>
</template>

<script lang="ts">
import { Audio } from 'arrdio';
import { Component, Prop, Vue } from 'vue-property-decorator';
import { AudioClip } from '../../structs/AudioClip'

@Component
export default class Track extends Vue {
	@Prop() bgColor?: string;
	@Prop() name?: string;

	mounted(): void {
		this.$el
			.querySelectorAll('.track-waves > img')
			.forEach((img) =>
				img.setAttribute('style', 'background-color:' + this.bgColor + 'aa')
			);
	}

	private fileReader = new FileReader();
	private Audio?: Audio;
	private sampleRate = 44100;
	isDragOver = false;
	private audioClip?: AudioClip;

	upload(e: DragEvent): void {
		const trackWaves = this.$refs['track_waves'] as HTMLElement;
		const sizeSlider = document.getElementById(
			'sizeSlider'
		) as HTMLInputElement;
		const canvas = document.createElement('canvas');
		trackWaves.appendChild(canvas);

		const offsetLeft = (this.$refs['track_waves_container'] as HTMLElement).offsetLeft;
		const position = e.offsetX + Math.floor(window.scrollX);

		canvas.setAttribute('style', 'background-color:' + this.bgColor + 'aa');
		canvas.style.position = 'absolute';
		canvas.height = trackWaves.clientHeight;
		canvas.style.left = (position + offsetLeft) + 'px';

		if (e.dataTransfer === null) {
			console.error('Data transfer failed');
			return;
		}

		this.fileReader.readAsArrayBuffer(e.dataTransfer.files[0]);

		this.fileReader.onloadend = async () => {

			const wasm = await import('arrdio');

			this.Audio = wasm.load_data(
				new Uint8Array(this.fileReader.result as ArrayBuffer)
			);

			this.sampleRate = this.Audio.get_sample_rate();

			const width = this.Audio.get_sample_length();

			this.audioClip = new AudioClip(this.Audio, this.sampleRate, position * parseInt(sizeSlider.value), width);

			console.log(this.audioClip);

			document
				.getElementById('sizeSlider')
				?.addEventListener('change', () => this.resize(canvas));

			this.resize(canvas);
		};
	}

	resize(canvas: HTMLCanvasElement): void {
		const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

		const sizeSlider = document.getElementById(
			'sizeSlider'
		) as HTMLInputElement;
		const offsetLeft = (this.$refs['track_waves_container'] as HTMLElement).offsetLeft;

		ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

		const scale = 1 / parseInt(sizeSlider.value);
		const chunkSize = Math.floor(this.sampleRate / (scale * this.sampleRate));

		// Split positive and negative numbers
		if (this.Audio === undefined) {
			console.error('Audio is not set.');
			return;
		}

		const AudioData = this.Audio.resize(chunkSize);

		const FACTOR = 100;
		const MIDDLE = Math.floor(canvas.height / 2);

		const positive = AudioData.get_positive();
		const negative = AudioData.get_negative();

		canvas.width = Math.min(positive.length, 20000);
		canvas.style.left = Math.round((this.audioClip?.position || 0) * scale) + offsetLeft + 'px';

		for (let i = 0; i < positive.length; i++) {
			const posSample = positive[i];
			const negSample = negative[i];
			ctx.fillStyle = '#ffffff';
			if (posSample != 0)
				ctx.fillRect(i, MIDDLE, 1, Math.floor(posSample * -FACTOR));
			if (negSample != 0)
				ctx.fillRect(i, MIDDLE, 1, Math.floor(negSample * -FACTOR));
		}

		const positionEnd =  Math.ceil((canvas.offsetLeft + canvas.offsetWidth) / this.$root.$data.barSize);
		if (positionEnd > this.$root.$data.barAmount) {
			this.$root.$data.barAmount = positionEnd;
			console.log(positionEnd)
			this.$emit('someEvent');
		}
	}

	setDragOver(isDragOver: boolean): void {
		this.isDragOver = isDragOver;
	}
}
</script>

<style scoped>
.track-container {
	width: 100%;
	position: relative;
}

.track-info-container {
	position: fixed;
	z-index: 100;
	min-width: 15rem;
	height: 6rem;
	background: #404d4c;
	border-left: 1px solid #2a3131;
	border-right: 1px solid #2a3131;
	display: flex;
	border: 1px solid #2a3131;
}

.track-container-color {
	position: relative;
	height: 100%;
	width: 0.7rem;
}

.track-content {
	padding: 1rem;
}

.track-waves {
	position: fixed;
	width: 100%;
	left: 15rem;
	display: flex;
	height: 6rem;
	border-top: 1px solid #2a3131;
	background-color: #0000000a;
	z-index: 1000;
}

.track-height-spacer {
	height: 6rem;
	position: relative;
}

.drag-over {
	background-color: #ffffff33;
}
</style>