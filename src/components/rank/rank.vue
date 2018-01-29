<template>
	<div class="rank">
		<headNav></headNav>
		<ul class="panel-img-list">
			<li v-for="item in list">
				<router-link :to="{name:'info',params:{rankid:item.rankid}}">
					<div class="panel-img-left">
						<img :src="item.imgurl.replace('{size}','400')" />
					</div>
					<div class="panel-img-content">
						<p>{{item.rankname}}</p>
					</div>
				</router-link>
			</li>
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
				this.$http.get('mapi/rank/list&json=true').then(({
					data
				}) => {
					this.isloading = false
					this.list=data.rank.list
				}).then(() => {})
			}
		},
		components: {
			loading,
			headNav
		}
	}
</script>

<style scoped>
	.rank{
		margin-top: -0.2rem;
	}
	.panel-img-list a {
		display: block;
		position: relative;
		margin-left: 0.2rem;
		padding: 0.2rem;
		height: 2rem;
		border-bottom:1px solid #ddd;
	}
	
	.panel-img-left {
		position: absolute;
		left: 0;
		top: 0.2rem;
		width: 1.6rem;
		height: 1.6rem;
	}
	.panel-img-left img{
		width: 100%;
	}
	.panel-img-content{
		line-height: 1.6rem;
		padding-left: 1.8rem;
		color: #333;
	}
</style>