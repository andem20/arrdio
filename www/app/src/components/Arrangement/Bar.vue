<template>
    <div class="beat-container">
        <div class="beat" :style="{'width': beatSize + 'px'}">{{beat}}</div>
        <div :style="{'width': beatSize + 'px'}"></div>
        <div :style="{'width': beatSize + 'px'}"></div>
        <div :style="{'width': beatSize + 'px'}"></div>
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        @Prop() beat!: number;
        @Prop() beatSize?: number;
    }
</script>

<style scoped>
    .beat-container {
        height: 100%;
        display: flex;
        margin-left: 2px;
    }

    .beat-container > div {
        width: 3rem;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
        margin-top: 2rem;
    }

    .beat-container > .beat {
        margin-top: 0rem;
        color: #ffffff;
    }

    .beat-container > .beat::before {
        content: " ";
        margin-left: 0.3rem;
    }
</style>