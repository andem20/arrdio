<template>
    <div>
        {{value}}
    </div>
</template>

<script lang="ts">
    import { Component, Prop, Vue } from 'vue-property-decorator';

    @Component
    export default class TimeStamp extends Vue {
        @Prop({required: true}) value!: string;
    }
</script>

<style scoped>

</style>