<template>
	<div class="container">
		<MainHeader />
		<MainArrangement />
	</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import MainHeader from '../components/Header/MainHeader.vue';
import MainArrangement from '../components/Arrangement/MainArrangement.vue';

@Component({
	name: 'Main',
	components: {
		MainHeader,
		MainArrangement,
	},
})
export default class Main extends Vue {}
</script>

<style scoped>
.container {
	color: #ffffff;
	width: fit-content;
}
</style>