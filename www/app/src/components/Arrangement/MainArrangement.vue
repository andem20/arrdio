<template>
    <div class="arrangement-container">
        <div class="arrangement-timeline">
            <div>00:00</div>
            <div>00:05</div>
            <div>00:10</div>
            <div>00:15</div>
            <div>00:20</div>
            <div>00:25</div>
        </div>
        <div class="arrangement-grid">
            <Bar :beat="i" v-for="i in this.barsAmount" :key="i" />
        </div>
        <div class="arrangement-tracks-container" ref="arrangement-tracks-container">
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

    @Component({
        components: {
            Bar,
            Track
        }
    })

    export default class MainArrangement extends Vue {
        barsAmount = this.$root.$data.barAmount;

        showEvent(): void {
            this.barsAmount = this.$root.$data.barAmount;
        }
    }
</script>

<style scoped>
    .arrangement-container {
        font-size: 0.8rem;
        min-height:calc(100vh - 16rem);
        position: relative;
        top: 13rem;;
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

    .arrangement-timeline > div {
        margin-right: 17rem;
    }

    .arrangement-tracks-container {
        margin-top: 5rem;
    }

    .arrangement-tracks-container > :last-child > :nth-child(2) {
        border-bottom: 1px solid #2a3131;
    }
</style>