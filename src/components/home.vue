<template>
	<div id="home">
		<div class="content">
			<keep-alive>
				<router-view></router-view>
			</keep-alive>
			<!--<router-view v-if="!$route.meta.keepAlive"></router-view>-->
		</div>
		<ftplayer v-show="$store.state.isPlayer"></ftplayer>
	</div>
</template>

<script>
	import ftplayer from './ftplayer.vue'
	export default {
		components: {
			ftplayer
		}
	}
</script>

<style scoped>
	.content {
		margin-top: 1.9rem;
	}
</style>