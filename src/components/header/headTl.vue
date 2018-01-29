<template>
	<div class="top-nav">
		<p class="page-title">
			{{title}}
		</p>
		<div class="goBack">
			<i @click="goBack"></i>
		</div>
	</div>
</template>
	
<script>
	export default {
    	props: ['title'],
    	methods:{
    		goBack:function(){
    			this.$router.go(-1)
    		}
    	}
	}
</script>

<style scoped>
.top-nav{
		top: 1rem;
		position: fixed;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 99;
		background: -webkit-linear-gradient(top,rgba(0,0,0,.6),transparent);
		line-height: 0.8rem;
	}
	.top-nav p.page-title{
		color: #fff;
		padding: 0 0.8rem;
		text-align: center;
	}
	.goBack i{
		position: absolute;
		left: 0.2rem;
		top: 50%;
		display: block;
		margin-top: -0.2rem;
		background: url(../../assets/goback_1.png) 0 0 no-repeat;
		background-size:contain;
		width: 0.24rem;
		height: 0.4rem;
	}
</style>