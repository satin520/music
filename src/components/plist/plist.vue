<template>
	<div class="plist">
		<headNav></headNav>
		<ul class="panel-img-list">
			<li v-for="item in list">
				<router-link :to="{name:'sslist',params:{specialid:item.specialid}}">
					<div class="panel-img-left">
						<img :src="item.imgurl.replace('{size}','400')" />
					</div>
					<div class="panel-img-content">
						<p class="panel-img-content-first">{{item.specialname}}</p>
						<p class="panel-img-content-sub"><i></i>{{item.playcount}}</p>
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
				this.$http.get('mapi/plist/index&json=true').then(({
					data
				}) => {
					this.isloading = false
					this.list = data.plist.list.info
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
		padding-left: 1.7rem;
		color: #333;
	}
	.panel-img-content p.panel-img-content-first{
		font-size: 0.3rem;
		line-height: 0.46rem;
		margin-top: 0.4rem;
	}
	.panel-img-content p.panel-img-content-sub{
		margin-top: 0.05rem;
		line-height: 0.3rem;
		font-size: 0.26rem;
		color: #9b9b9b;
	}
	.panel-img-content p.panel-img-content-sub i{
		width: 0.22rem;
		height: 0.22rem;
		display: inline-block;
		background: url(../../assets/icon_music.png) 0 0 no-repeat;
		background-size:contain;
		margin-right: 0.05rem;
	}
</style>