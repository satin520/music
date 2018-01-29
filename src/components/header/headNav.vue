<template>
	<div class="top-nav" id="topNav">
		    <ul>
		        <li><router-link to='/'>新歌</router-link></li>
		        <li><router-link to='/rank/list'>排行</router-link></li>
				<li><router-link to='/plist/index'>歌单</router-link></li>
				<li><router-link to='/singer/class'>歌手</router-link></li>
		    </ul>
		</div>
</template>

<script>
	 
</script>

<style scoped>
	#home .top-nav{
		top: 1rem;
		position: fixed;
		left: 0;
		width: 100%;
		background: #fff;
		z-index: 99;
		border-bottom: 1px solid #ddd;
		line-height: 0.7rem;
	}
	#home .top-nav ul{
		display: flex;
		justify-content: space-around;
	}
	#home .top-nav li a{
		color: #333;
		font-size: 0.28rem;
		line-height: 0.7rem;
		display: inline-block;
		margin-bottom: -1px;
		padding: 0 0.1rem;
		padding-bottom: 0.05rem;
		
	}
	#home .top-nav li a.router-link-exact-active{
		padding-bottom: 0;
		color: #d43c33;
		border-bottom: 0.05rem solid #d43c33;
	}
</style>