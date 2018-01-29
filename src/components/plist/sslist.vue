<template>
	<div class="info" :class="{ ftBox: $store.state.isPlayer }">
		<headTl :title='info.list.specialname'></headTl>
		<div class="banner">
			<img :src="info.list.imgurl.replace('{size}','400')"/>
		</div>
		<div class="intro-box" :class="{auto:open}">
			<p>{{info.list.intro}}</p>
			<i class="intro-icon" @click="openClose"></i>
		</div>
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
	import headTl from './../header/headTl.vue'
	import loading from './../loading.vue'
	export default {
		data() {
			return {
				list: [],
				songs:[],
				isloading: true,
				info:{list:{imgurl:'none'}},
				open:false
			}
		},
		activated(){
			this.open=false
			this.getList()
		},
		methods: {
			getList: function() {
				this.$http.get('mapi/plist/list/'+this.$route.params.specialid+'?json=true').then(({
					data
				}) => {
					this.isloading = false
					this.info=data.info
					this.songs=data.list.list.info
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
			},
			openClose:function(){
				this.open?this.open=false:this.open=true
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
	.intro-box{
		position: relative;
		font-size: 0.3rem;
		height: 0.7rem;
		word-break: break-all;
		overflow: hidden;
		padding: 0.2rem 1rem 0.2rem 0.2rem;
	}
	.intro-box i.intro-icon{
		position: absolute;
		right: 0.25rem;
		top: 0.2rem;
		height: 0.4rem;
		width: 0.4rem;
		background: url(../../assets/close_icon.png) 0 0 no-repeat;
		background-size:contain;
		
	}
	.auto{
		height: auto;
	}
	.auto i.intro-icon{
		background: url(../../assets/open_icon.png) 0 0 no-repeat;
		background-size:contain;
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