<template>
    <div class="control-panel-container">
        <div class="control-panel-info">
            <div>TIME:</div>
            <div class="control-panel-highlight">00:02:58</div>
            <div>TEMPO:</div>
            <div class="control-panel-highlight">120</div>
            <div>BAR:</div>
            <div class="control-panel-highlight">2</div>
            <div>GRID:</div>
            <div class="control-panel-highlight">4</div>
            <div>BEAT:</div>
            <div class="control-panel-highlight">3/4</div>
        </div>
        <div class="control-panel-buttons">
            <ControlButton>
                <font-awesome-icon icon="play" />
            </ControlButton> 
            <ControlButton>
                <font-awesome-icon icon="stop" />
            </ControlButton> 
            <ControlButton>
                <font-awesome-icon icon="circle" />
            </ControlButton> 
            <ControlButton>
                <font-awesome-icon icon="repeat" />
            </ControlButton> 
        </div>
        <div>
            <input
                type="range"
                min="1"
                max="500"
                id="sizeSlider"
                @input="updateSizeText"
            />
            <span id="sizeText"></span>
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import ControlButton from './ControlButton.vue';

    @Component({
        components: {
            ControlButton
        }
    })

    export default class ControlPanel extends Vue {
        updateSizeText(): void {
            const sizeSlider = document.getElementById("sizeSlider") as HTMLInputElement;
            const sizeText = document.getElementById("sizeText") as HTMLElement;
            sizeText.innerText = sizeSlider.value;
        }
    }
</script>

<style scoped>
    .control-panel-container {
        width: 18rem;
    }

    .control-panel-info {
        background: #222A2B;
        height: 4rem;
        border-radius: 0.7rem;
        padding: 1rem;
        display: grid;
        grid-template-columns: 15% 50% 20% 15%;
        font-weight: 100;
        font-size: 0.8rem;
    }

    .control-panel-info > div {
        vertical-align: middle;
        display: flex;
        align-items: center;
    }

    .control-panel-highlight {
        font-weight: 400;
        font-size: 1rem;
    }

    .control-panel-buttons {
        margin-top: 0.5rem;
        display: flex;
        justify-content: center;
    }
</style>