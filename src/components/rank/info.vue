<template>
	<div class="info" :class="{ ftBox: $store.state.isPlayer }">
		<headTl :title='info.rankname'></headTl>
		<div class="banner">
			<img :src="info.banner7url.replace('{size}','400')"/>
			<div class="rank-info-time">上次更新时间：{{updateDate}}</div>
		</div>
		<ul class="songslist">
			<li v-for="(item,index) in songs" @click="getSong(item.hash,index)">
				<div class="ranking">
					<i :class="{one:index===0,two:index===1,three:index===2}">{{index+1}}</i>
				</div>
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
	import headTl from './../header/headTl.vue'
	import loading from './../loading.vue'
	export default {
		data() {
			return {
				list: [],
				songs:[],
				isloading: true,
				info:{banner7url:'none'}
			}
		},
		activated(){
			this.getList()
		},
		methods: {
			getList: function() {
				this.$http.get('mapi/rank/info/?rankid='+this.$route.params.rankid+'&page=1&json=true').then(({
					data
				}) => {
					this.isloading = false
					this.info=data.info
					this.songs=data.songs.list
					for(var i in this.songs){
						this.list[i]=this.songs[i].hash
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
		computed:{
			updateDate:function(){
				let date = new Date() 
				return date.getFullYear()+"-" + (date.getMonth()+1) + "-" + date.getDate()
			}
		},
		components: {
			loading,
			headTl
		}
	}
</script>

<style scoped>
	.banner{
		width: 100%;
		height: 5rem;
		position: relative;
		overflow: hidden;
		margin-top: -2rem;
		
	}
	.banner img{
		width: 100%;
		max-height: none;
	}
	.banner .rank-info-time{
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 0.8rem;
		padding-top: 0.1rem;
		left: 0;
		padding-left: 0.4rem;
		font-size: 0.26rem;
		background: -webkit-linear-gradient(bottom,rgba(0,0,0,.6),transparent);
		color: #fff;
	}
	ul.songslist{
		width: 100%;
		overflow: hidden;
	}
	ul.songslist li {
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
		padding-left: 0.5rem;
	}
	
	ul.songslist li span {
		display: table-cell;
		height: 100%;
		width: 100%;
		overflow: hidden;
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
	ul.songslist .ranking{
		position: absolute;
		left: 0rem;
		height: 0.3rem;
		margin-top: -0.15rem;
		top: 50%;
	}
		ul.songslist .ranking i{
			height: 0.3rem;
			display: block;
			text-align:center;
			width: 0.4rem;
			line-height: 0.3rem;
			font-size: 0.24rem;
			font-style: normal;
			color: #888;
			border-radius: 0.2rem;
		}
		ul.songslist .ranking i.one{
			background: #e80000;
			color: #fff;
		}
		ul.songslist .ranking i.two{
			background: #ff7200;
			color: #fff;
		}
		ul.songslist .ranking i.three{
			background: #f8b300;
			color: #fff;
		}
</style>