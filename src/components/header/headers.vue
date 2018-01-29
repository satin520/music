<template>
	<div id="header">
		<div class="top-hd">
			<a class="logo"></a>
			<router-link to="/search/index" class="btn-search"></router-link>
		</div>
	</div>
</template>

<script>
	
</script>

<style scoped>
	#header {
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		height: 1rem;
		z-index: 3;
	}
	.top-hd {
		width: 100%;
		height: 1rem;
		line-height: 0.9rem;
		background: #d43c33;
		position: relative;
		vertical-align: middle;
	}
	.top-hd a.logo{
		width: 2.3rem;
		height: .55rem;
		background: url(../../assets/logo.png) 0 0 no-repeat;
		background-size:contain;
		vertical-align: middle;
		margin-left: .2rem;
		display: inline-block;
		background-size:100%;
	}
	.top-hd a.btn-search{
		position: absolute;
		right: 0.2rem;
		top: 0.33rem;
		width: 0.34rem;
		height: 0.34rem;
		background: url(../../assets/search.png) 0 0 no-repeat;
		background-size:contain;
	}
</style>