<template>
	<div id="home">
		<div class="content">
			<transition name='trans'>
				<keep-alive>
					<router-view></router-view>
				</keep-alive>
			</transition>
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
	.trans-enter-active{
		transition: all .3s
	}
	.trans-enter{
		margin-left: -30%;
	}
</style>