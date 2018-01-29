<template>
	<div class="singer">
		<headNav></headNav>
		<ul class="singer-class-list">
			<li v-for="(item,index) in list" v-if="index===0">
				<router-link :to="{name:'singerlist',params:{classid:item.classid}}">{{item.classname}}</router-link>
			</li>
		</ul>
		<ul class="singer-class-list">
			<li v-for="(item,index) in list" v-if="index>=1&&index<=3"><router-link :to="{name:'singerlist',params:{classid:item.classid}}">{{item.classname}}</router-link></li>
		</ul>
		<ul class="singer-class-list">
			<li v-for="(item,index) in list" v-if="index>=4&&index<=6"><router-link :to="{name:'singerlist',params:{classid:item.classid}}">{{item.classname}}</router-link></li>
		</ul>
		<ul class="singer-class-list">
			<li v-for="(item,index) in list" v-if="index>=7"><router-link :to="{name:'singerlist',params:{classid:item.classid}}">{{item.classname}}</router-link></li>
		</ul>
		<loading v-show="isloading"></loading>
	</div>
</template>

<script>
	import loading from './../loading.vue'
	import headNav from './../header/headNav.vue'
	export default {
		data() {
			return {
				list: [],
				isloading: true
			}
		},
		created() {
			this.getList();
		},
		methods: {
			getList: function() {
				this.$http.get('mapi/singer/class&json=true').then(({
					data
				}) => {
					this.isloading = false
					this.list=data.list
				}).then(() => {})
			}
		},
		components: {
			loading,
			headNav
		}
	}
</script>

<style>
	.singer{
		padding-top: 0.1rem;
	}
	ul.singer-class-list{
		margin: 0 0.2rem 0.3rem 0.2rem;
		border: 1px solid #ddd;
		border-radius: 0.1rem;
	}
	ul.singer-class-list li{
		
		font-size: 0.3rem;
		border-bottom:1px solid #ddd;
	}
	ul.singer-class-list li a{
		display: block;
		color: #333;
		height: 100%;
		padding: 0.2rem;
	}
	ul.singer-class-list li:last-child{
		border-bottom: 0;
	}
</style>