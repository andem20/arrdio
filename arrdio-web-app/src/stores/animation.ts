import { defineStore, storeToRefs } from "pinia";
import { useAudioStore } from "./audio";
import { ref, type Ref } from "vue";
import { useSettingsStore } from "./settings";

export type AnimationCallback = (animation: Animation) => void;

export interface Animation {
    isRunning: boolean,
    currentAnimationFrame: number,
    startTime?: number,
    previousTime?: number,
    isDone: boolean,
    elapsedTime: Ref<number>,
    startX: number,
    callbacks: AnimationCallback[],
    toggle(startCallback: () => void, stopCallback: () => void): void,
    start(): boolean,
    update(timestamp: number): void,
    stop(): boolean
}

export const useAnimationStore = defineStore("animation", () => {
    const { audioManager } = useAudioStore();

    const playbackAnimation: Animation = {
        isRunning: false,
        currentAnimationFrame: 0,
        isDone: false,
        elapsedTime: ref(0),

        toggle(): void {
            this.isRunning = this.isRunning ? this.stop() : this.start();
        },

        start(): boolean {
            audioManager.play();
            this.currentAnimationFrame = window.requestAnimationFrame(this.update);
            return true;
        },

        update(timestamp: number): void {
            const self = playbackAnimation;
            self.startTime = self.startTime ?? timestamp;

            self.elapsedTime.value = (timestamp - self.startTime) / 1000; // Time to seconds

            if (self.previousTime !== timestamp) {
                self.callbacks.forEach(cb => cb(self));
            }

            self.previousTime = timestamp;

            if (!self.isDone && self.isRunning) {
                self.currentAnimationFrame = window.requestAnimationFrame(self.update);
            }
        },
        stop(): boolean {
            this.startTime = undefined;
            this.previousTime = undefined;
            audioManager.stop();
            window.cancelAnimationFrame(this.currentAnimationFrame);
            return false;
        },
        callbacks: [],
        startX: 0,
    }

    return {
        playbackAnimation
    }
});