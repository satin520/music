<template>
	<div class="singerlist">
		<headNav2 :title='title'></headNav2>
		<ul class="panel-img-list">
			<li v-for="item in list">
				<router-link :to="{name:'singerinfo',params:{singerid:item.singerid}}">
					<div class="panel-img-left">
						<img :src="item.imgurl.replace('{size}','400')" />
					</div>
					<div class="panel-img-content">
						<p>{{item.singername}}</p>
					</div>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>
	import loading from './../loading.vue'
	import headNav2 from './../header/headNav2.vue'
	export default {
		data() {
			return {
				list: [],
				isloading: true,
				title:''
			}
		},
		activated() {
			this.getList();
		},
		methods: {
			getList: function() {
				this.$http.get('mapi/singer/list/'+this.$route.params.classid+'?json=true').then(({
					data
				}) => {
					this.isloading = false
					this.title=data.classname
					this.list=data.singers.list.info
				}).then(() => {})
			}
		},
		components: {
			loading,
			headNav2
		}
	}
</script>
<style scoped>
	.panel-img-list{
		width: 100%;
		overflow: hidden;
	}
	.panel-img-list a {
		display: block;
		position: relative;
		margin-left: 0.2rem;
		padding: 0.2rem;
		height: 1.4rem;
		border-bottom:1px solid #ddd;
	}
	
	.panel-img-left {
		position: absolute;
		left: 0;
		top: 0.2rem;
		width: 1rem;
		height: 1rem;
	}
	.panel-img-left img{
		width: 100%;
	}
	.panel-img-content{
		line-height: 1rem;
		padding-left: 1.2rem;
		color: #333;
	}
</style>