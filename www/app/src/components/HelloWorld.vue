<template>
  <div>
    <input type="file" name="" id="file" @change="onUpload">
    <input type="range" min="100" max="10000" value="50" id="sizeSlider" @change="updateSizeText" @mouseup="onResize">
    <span id="sizeText"></span><br>
    <canvas id="canvas" width="1000" height="200"></canvas>
  </div>
</template>

<script lang="ts">
import { Audio } from 'arrdio';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() private msg!: string;

  private fileReader = new FileReader();
  private Audio?: Audio;
  private sampleRate = 44100;

  updateSizeText(): void {
    const sizeSlider = document.getElementById('sizeSlider') as HTMLInputElement;
    const sizeText = document.getElementById('sizeText') as HTMLElement;
    sizeText.innerText = sizeSlider.value;
  }

  onUpload(): void {
    const fileInput = document.getElementById('file') as HTMLInputElement;

    if(fileInput.files !== null) {
      this.fileReader.readAsArrayBuffer(fileInput.files[0]);
  
      this.fileReader.onloadend = async () => {
        console.time('Rust')
        const wasm = await import('arrdio');
        this.Audio = wasm.load_data(new Uint8Array(this.fileReader.result as ArrayBuffer));
        console.timeEnd('Rust')
  
        this.sampleRate = this.Audio.get_sample_rate();
      }
    }
  }

  onResize(): void {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    const sizeSlider = document.getElementById('sizeSlider') as HTMLInputElement;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    const secondSize = parseInt(sizeSlider.value);
    const chunkSize = Math.floor(this.sampleRate / secondSize);

    // Split positive and negative numbers
    if(this.Audio !== undefined) {
      console.time('RUST POS');
      const AudioData = this.Audio.resize(chunkSize);
      console.timeEnd('RUST POS');

      const factor = 200;

      const positive = AudioData.get_positive();
      const negative = AudioData.get_negative();

      for(let i = 0; i < positive.length; i++) {
          const posSample = positive[i];
          const negSample = negative[i]; 
          if(posSample != 0) ctx.fillRect(i, 100, 1, Math.floor(posSample * -factor));
          if(negSample != 0) ctx.fillRect(i, 100, 1, Math.floor(negSample * -factor));
      }
    }
  }
}
</script>
