<template>
    <button class="control-button" :class="{active: isActive}" @click="activate">
        <slot></slot>
    </button>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component
    export default class  extends Vue {
        isActive = false;

        activate(): void {
            this.isActive = !this.isActive;
        }
    }
</script>

<style scoped>
    .control-button {
        background-color: #4A5756;
        border-radius: 3px;
        border: 1px solid #5E7573;
        color: #ffffff;
        width: 1.7rem;
        height: 1.7rem;
        margin-right: 1.5rem;
    }

    .control-button:hover {
        background-color: #586866;
    }

    .active, .control-button:active {
        background-color: #4CE0B3;
        color: #353535;
    }
</style>