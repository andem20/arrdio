<template>
    <div class="header-fixed">
        <div class="header-container">
            <div class="title-container">
                <Logo class="header-logo" />
                <div class="header-title">
                    ARRDIO
                </div>
            </div>
            <ControlPanel />
        </div>
    </div>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import Logo from '../Logo.vue';
    import ControlPanel from './ControlPanel.vue';

    @Component({
        components: {
            Logo,
            ControlPanel
        },
    })

    export default class MainHeader extends Vue {
   
    }
</script>

<style scoped>
    .header-fixed {
        position: fixed;
        width: 100%;
    }

    .header-container {
        display: grid;
        height: 13rem;
        background-color: #293233;
        grid-template-columns: auto auto auto;
        align-content: center;
    }

    .title-container {
        display: flex;
    }

    .header-logo {
        height: 5rem;
        margin-left: 3rem;
    }

    .header-title {
        font-size: 5rem;
        font-weight: 100;
        margin-left: 1rem;
    }
</style>