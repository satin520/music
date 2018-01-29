<template>
	<div id="list" :class="{ ftBox: $store.state.isPlayer }">
		<headNav></headNav>
		<swiper :options="swiperOption" ref="mySwiper" class="mySwiper">
			<swiper-slide v-for="item in songs.banner" >
				<a :href="item.extra.tourl"><img :src="item.imgurl" /></a>
			</swiper-slide>
			<div class="swiper-pagination" slot="pagination"></div>
		</swiper>
		<ul class="songslist">
			<li v-for="(item,index) in songs.data" @click="getSong(item.hash,index)">
				<div class="songs-item-name">
					<span>{{item.filename}}</span>
				</div>
				<div class="songs-item-download">
					<a :href="$store.state.cursong.play_url" download='music'></a>
				</div>
			</li>
		</ul>
		<loading v-show="isloading"></loading>
	</div>
</template>
<script>
	require('swiper/dist/css/swiper.css')
	import loading from './loading.vue'
	import headNav from './header/headNav.vue'
	export default {
		data() {
			return {
				swiperOption: { //http://www.swiper.com.cn/api/
					notNextTick: true,
					autoplay: 3000,
					pagination: {
						el: '.swiper-pagination'
					},
					loop: true,
					width:window.innerWidth
				},
				songs: [],
				list:[],
				isloading: true
			}
		},
		activated() {
			this.getList();
		},
		methods: {
			getList: function() {
				this.$http.get('mapi/?json=true').then(({
					data
				}) => {
					this.isloading = false
					this.songs = data
					for(var i in data.data){
						this.list[i]=data.data[i].hash
					}
					this.$store.dispatch('getList',this.list)
				}).then(() => {})
			},
			getSong: function(hash,index){
				this.$store.commit('player')
				this.$store.commit('getIndex',index)
				this.$store.dispatch('getSong',hash);
			}
		},
		components: {
			loading,
			headNav
		}
	}
</script>
<style scoped>
	.mySwiper img {
		width: 100%;
	}
	.swiper-pagination-bullet {
		background: #fff;
		opacity: 0.8;
		width: 0.16rem;
		height: 0.16rem;
	}
	.swiper-pagination-bullet-active {
		background: #d43c33;
		opacity: 1;
	}
	ul.songslist{
		width: 100%;
		overflow: hidden;
	}
	ul.songslist li {
		display: table;	
		margin-left: 0.2rem;
		padding-left: 0.1rem;
		width: 100%;
		position: relative;
		border-bottom: 1px solid #ddd;
		height: 1.2rem;
	}
	
	ul.songslist li div.songs-item-name {
		display: table;
		height: 100%;
		width: 100%;
		padding-right: 1rem;
	}
	
	ul.songslist li span {
		display: table-cell;
		height: 100%;
		width: 100%;
		font-size: 0.26rem;
		vertical-align: middle;
	}
	
	.songs-item-download {
		position: absolute;
		right: 0;
		width: 0.8rem;
		top: 0.4rem;
	}
	
	.songs-item-download a {
		background: url(../assets/download_icon_2.png) 0 0 no-repeat;
		width: 0.29rem;
		height: 0.3rem;
		display: block;
		background-size: cover;
	}
	.ftBox{
		padding-bottom: 1.2rem;
	}
	
</style>