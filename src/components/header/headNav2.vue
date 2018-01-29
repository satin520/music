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
		z-index: 99;
		background: #fff;
		line-height: 0.8rem;
		box-shadow: 0 0.05rem 0.05rem 0 #f4f4f4;
	}
	.top-nav p.page-title{
		color: #333;
		padding: 0 0.8rem;
		text-align: center;
	}
	.goBack i{
		position: absolute;
		left: 0.2rem;
		top: 50%;
		display: block;
		margin-top: -0.2rem;
		background: url(../../assets/goback.png) 0 0 no-repeat;
		background-size:contain;
		width: 0.24rem;
		height: 0.4rem;
	}
</style>