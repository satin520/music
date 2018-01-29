<template>
	<div class="search" :class="{ ftBox: $store.state.isPlayer }">
		<headNav2 title='搜索'></headNav2>
		<div class="search-box">
			<span class="search-icon"></span>
			<input ref="key" type="text" placeholder="歌手/歌名/拼音" />
			<button class="search-btn" @click="search($refs.key.value)">搜索</button>
		</div>
		<div class="hot-search" v-show="hotSearch">
			<div class="hot-search-hd">
				最近热门
			</div>
			<ul class="hot-search-list" >
				<li @click="search(item.keyword)" v-for="item in hotlist">{{item.keyword}}</li>
			</ul>
		</div>
		<div class="search-result-hd" v-show="!hotSearch">共有{{total}}搜索结果</div>
		<ul class="songslist">
			<li v-for="(item,index) in songs" @click="getSong(item.hash,index)">
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
	import loading from './../loading.vue'
	import headNav2 from './../header/headNav2.vue'
	export default {
		data() {
			return {
				hotlist:{},
				isloading: true,
				songs:{},
				list:[],
				hotSearch:true,
				total:''
			}
		},
		created() {
			this.getHot()
		},
		methods: {
			getHot: function() {
				this.$http.get('capi/api/v3/search/hot?format=json&plat=0&count=30').then(({
					data
				}) => {
					this.isloading = false
					this.hotlist=data.data.info
				}).then(() => {})
			},
			getList: function(keyword) {
				this.$http.get('capi/api/v3/search/song?format=json&keyword='+keyword+'&page=1&pagesize=20&showtype=1').then(({
					data
				}) => {
					this.isloading = false
					this.songs = data.data.info
					this.total =data.data.total
					for(var i in this.songs){
						this.list[i]=this.songs[i].hash
					}
					this.$store.dispatch('getList',this.list)
				}).then(() => {})
			},
			search:function(keyword){
				this.isloading =true
				this.hotSearch=false
				this.getList(keyword)
			},
			getSong: function(hash,index){
				this.$store.commit('player')
				this.$store.commit('getIndex',index)
				this.$store.dispatch('getSong',hash);
			}
		},
		components: {
			loading,
			headNav2
		}
	}
</script>

<style>
	.search-box {
		padding: 0.2rem;
		position: relative;
		display: flex;
	}
	.search-result-hd{
		background: #e6e6e6;
		color: #5d5d5d;
		font-size: 0.24rem;
		padding: 0.06rem 0.3rem;
	}
	.search-box span.search-icon {
		position: absolute;
		left: 0.26rem;
		top: 0.2rem;
		margin-top: 1px;
		height: 0.56rem;
		width: 0.36rem;
		background: url(../../assets/search_icon.png) 0 0 no-repeat;
		background-size: contain;
	}
	
	.search-box input {
		flex: 1;
		height: 0.6rem;
		line-height: 0.6rem;
		padding-left: 0.48rem;
		font-size: 0.24rem;
		border: 1px solid #ddd;
		border-radius: 0.1rem;
		margin-right: 0.2rem;
	}
	
	.search-box .search-btn {
		width: 17%;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size: 0.3rem;
		background: #d43c33;
		color: #fff;
		border-radius: 0.1rem;
	}
	
	.hot-search-hd {
		color: #d43c33;
		padding-left: 0.25rem;
		font-size: 0.24rem;
		line-height: 0.8rem;
		border-bottom: 1px solid #ddd;
	}
	ul.hot-search-list{
		padding-left: 0.2rem;
	}
	ul.hot-search-list li{
		line-height: 1rem;
		font-size: 0.3rem;
		border-bottom: 1px solid #ddd;
	}
	ul.songslist{
		width: 100%;
		overflow: hidden;
	}
	ul.songslist li {
		margin-left: 0.2rem;
		padding-left: 0.1rem;
		width: 100%;
		display: table;
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
		background: url(../../assets/download_icon_2.png) 0 0 no-repeat;
		width: 0.29rem;
		height: 0.3rem;
		display: block;
		background-size: cover;
	}
	.ftBox{
		padding-bottom: 1.2rem;
	}
</style>