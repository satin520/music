<template>
	<div class="loading">
			<div class="bounce1"></div>
			<div class="bounce2"></div>
			<div class="bounce3"></div>
		</div>
</template>
<script>
</script>

<style scoped>
	.loading {
		text-align: center;
		padding-top: 0.5rem;
	}
	.loading div {
		width: 0.15rem;
		height: 0.15rem;
		background-color: #666;
		border-radius: 100%;
		display: inline-block;
		-webkit-animation: bouncedelay 1.4s infinite ease-in-out;
		animation: bouncedelay 1.4s infinite ease-in-out;
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}
	
	.loading .bounce1 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}
	
	.loading .bounce2 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}
	
	@-webkit-keyframes bouncedelay {
		0%,
		80%,
		100% {
			-webkit-transform: scale(0.0)
		}
		40% {
			-webkit-transform: scale(1.0)
		}
	}
	
	@keyframes bouncedelay {
		0%,
		80%,
		100% {
			transform: scale(0.0);
			-webkit-transform: scale(0.0);
		}
		40% {
			transform: scale(1.0);
			-webkit-transform: scale(1.0);
		}
	}
</style>