import { defineStore } from 'pinia'

interface AudioClip {
    audioBuffer: AudioBuffer,
    delay: number,
    track: number | undefined,
    position: number
}

interface AudioManager {
  audioCtx: AudioContext,
  sources: AudioBufferSourceNode[],
  play: () => void,
  stop: () => void
}

export const useAudioStore = defineStore('audio', () => {
  const audioClips: AudioClip[] = [];

  const audioManager: AudioManager = {
    audioCtx: new AudioContext(),
    sources: [],
    play: function () {
      const clock = this.audioCtx.currentTime;
      audioClips.forEach(clip => {
          const source = this.audioCtx.createBufferSource();
          source.buffer = clip.audioBuffer;
          source.connect(this.audioCtx.destination);
          this.sources.push(source);
          source.start(clock + clip.delay);
      });
    },
    stop: function () {
      this.sources.forEach(source => {
        source.stop(0);
      });

      this.sources = [];
    }
  }

  return { audioManager, audioClips }
})
