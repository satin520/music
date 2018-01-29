<template>
	<div class="ft-player">
		<div class="ft-left" @click="playerShow">
			<img :src="$store.state.cursong.img" :class="{play:!play}" />
		</div>
		<div class="ft-center" @click="playerShow">
			<p class="song-name">{{$store.state.cursong.song_name}}</p>
			<p class="author-name">{{$store.state.cursong.author_name}}</p>
		</div>
		<div class="ft-right">
			<i @click="playMusic" v-show="play" class="btn-pause"></i>
			<i @click="playMusic" v-show="!play" class="btn-play"></i>
			<i class="btn-next" @click="next"></i>
			<a class="icon-download" :href="$store.state.cursong.play_url" download='music'></a>
		</div>
		<audio :src="$store.state.cursong.play_url" :autoplay="play" ref="player" @ended="next" ></audio>
		<div class="panel-play" v-show="playBox">
			<div class="panel-play-content">
				<div class="logo"></div>
				<div class="panel-play-img-box" :class="{play:!play}" @click="playMusic">
					<img class="songImg" :src="$store.state.cursong.img" />
					<i class="play-icon"></i>
					<div class="play-box-line"></div>
					<img class="play-box-line-bg" src="../assets/needle-plus-bg.png"/>
				</div>
				<div class="panel-play-title">{{$store.state.cursong.song_name}} - <b>{{$store.state.cursong.author_name}}</b></div>
				<div class="paner-play-lrc">
					
					<div class="lrc-roll" ref="lrcRoll" :style="{marginTop:mTop}">
						<p v-for="(item,index) in $store.state.lrcArr.lrc" :class="{on:index===$store.state.playIndex-1}">{{item}}</p>
					</div>
				</div>
				<div class="play-btns">
					<a @click="goBack" class="btn-back">返回</a>
					<a class="icon-download" :href="$store.state.cursong.play_url" download='music'>下载</a>
				</div>
			</div>
			<div class="play-bg" :style="{backgroundImage: 'url(' + $store.state.cursong.img + ')'}"></div>
		</div>
	</div>
</template>
<script>
	
	export default {
		data() {
			return {
				play: true,
				playBox: false,
				lrcArr:{},
				playIndex:0
			}
		},
		props: ['cursong1'],
		methods: {
			playMusic:function(){
				if(this.play) {
					this.$refs.player.pause()
					this.$store.commit('pause')
					this.play = false
				} else {
					this.$refs.player.play()
					this.$store.dispatch('play')
					this.play = true
				}
			},

			goBack:function(){
    			this.playBox=false
    			document.getElementsByTagName('body')[0].style.overflow='visible'
    		},
			next: function() {
				this.$store.dispatch('next')
				
			},
			playerShow: function() {
				this.playBox = true
				document.getElementsByTagName('body')[0].style.overflow='hidden'
				
			}
		},
		
		computed:{
			mTop:function(){
				return (-(this.$store.state.playIndex-2)*0.4)+'rem'
			}
		}
	}
</script>

<style scoped>
	.ft-player {
		position: fixed;
		z-index: 99;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1.2rem;
		background: rgba(0, 0, 0, .9);
		display: flex;
	}
	
	.ft-player .ft-left {
		padding: 0.1rem;
		width: 1.2rem;
	}
	div.logo{
		width: 2rem;
		height: .45rem;
		position: absolute;
		top: 0.2rem;
		left: 0.2rem;
		background: url(../assets/logo.png) 0 0 no-repeat;
		background-size:100%;
	}
	.ft-player .ft-left img {
		width: 1rem;
		width: 1rem;
		-webkit-animation: rotate 20s infinite linear;
		animation: rotate 20s infinite linear;
		border-radius: 50%;
	}
	
	.ft-player .ft-left img.play {
		animation-play-state: paused;
		-webkit-animation-play-state: paused;
	}
	
	@keyframes rotate {
		0% {
			transform: rotate(0);
			-webkit-transform: rotate(0);
		}
		100% {
			transform: rotate(360deg);
			-webkit-transform: rotate(360deg);
		}
	}
	
	.ft-player .ft-center {
		padding: 0.1rem;
		flex: 1;
	}
	
	.ft-player .ft-center p {
		color: #fff;
		overflow: hidden;
		line-height: 0.4rem;
		height: 0.4rem;
	}
	
	.ft-player .ft-center p.song-name {
		font-size: 0.3rem;
		margin-top: 0.1rem;
	}
	
	.ft-player .ft-center p.author-name {
		font-size: 0.26rem;
		color: #888;
	}
	
	.ft-player .ft-right {
		width: 2rem;
	}
	
	.ft-player .ft-right i,
	.ft-player .ft-right a {
		width: 0.5rem;
		height: 0.5rem;
		margin-top: 0.35rem;
		display: inline-block;
		background-size: contain;
	}
	
	.ft-player .ft-right i.btn-pause {
		background: url(../assets/pause_icon.png) 0 0 no-repeat;
		background-size: contain;
	}
	
	.ft-player .ft-right i.btn-play {
		background: url(../assets/play_icon.png) 0 0 no-repeat;
		background-size: contain;
	}
	
	.ft-player .ft-right a.icon-download {
		background: url(../assets/download_icon.png) 0 0 no-repeat;
		background-size: contain;
	}
	
	.ft-player .ft-right i.btn-next {
		background: url(../assets/next_icon.png) 0 0 no-repeat;
		background-size: contain;
	}
	
	.panel-play {
		width: 100%;
		height: 100%;
		position: fixed;
		z-index: 9;
		top: 0;
		left: 0;
	}
	
	.panel-play-content {
		position: fixed;
		left: 0;
		top: 0;
		height: 100%;
		z-index: 2;
		width: 100%;
		transition-timing-function: cubic-bezier(0.1, 0.57, 0.1, 1);
		transition-duration: 0ms;
		transform: translate(0px, 0px) translateZ(0px);
	}
	
	.panel-play-img-box {
		position: relative;
		height: 100%;
	}
	
	.panel-play-img-box img.songImg {
		position: absolute;
		left: 50%;
		top: 1.9rem;
		margin-left: -1.6rem;
		width: 3.2rem;
		height: 3.2rem;
		z-index: 6;
		border-radius: 50%;
		border: 0.05rem solid #000;
		-webkit-animation: rotate 20s infinite linear;
		animation: rotate 20s infinite linear;
	}
	
	div.play img.songImg {
		animation-play-state: paused;
		-webkit-animation-play-state: paused;
	}
	div.play i{
		display: block;
	}
	.panel-play-img-box:before {
		content: '';
		position: absolute;
		left: 50%;
		top: 1rem;
		margin-left: -2.5rem;
		z-index: 1;
		width: 5rem;
		height: 5rem;
		background: url(../assets/disc-plus.png) 0 0 no-repeat;
		background-size: cover;
	}
	
	.panel-play-img-box .play-box-line {
		transition: all 0.3s;
		position: absolute;
		z-index: 9;
		margin-left: -0.1rem;
		width: 1.43rem;
		height: 2.16rem;
		left: 50%;
		top: 0;
		background: url(../assets/needle-plus.png) 0 0 no-repeat;
		background-size: cover;
	}
	img.play-box-line-bg{
		position: absolute;
		top: 0;
		left: 50%;
		z-index: 99;
		margin-left: -0.25rem;
		width: 0.5rem;
		height: 0.19rem;
		border: 0;
	}
	.play .play-box-line {
		transform: rotate(-20deg);
		top: 0.05rem;
		margin-left: -0.05rem;
		transform-origin: top left;
	}
	.lrc-roll{
		transition: all .4s;
	}
	.play-icon {
		position: absolute;
		left: 50%;
		top: 2.8rem;
		display: none;
		margin-left: -0.6rem;
		z-index: 9;
		background: url(../assets/play-icon-big.png) 0 0 no-repeat;
		background-size: cover;
		width: 1.2rem;
		height: 1.2rem;
		position: absolute;
	}
	
	.panel-play-title {
		position: absolute;
		z-index: 9;
		top: 6.7rem;
		width: 100%;
		text-align: center;
		color: #fff;
		line-height: 0.3rem;
		overflow: hidden;
		padding:0 0.2rem;
		font-size: 0.26rem;
	}
	
	.panel-play-title b {
		font-weight: normal;
		color: hsla(0, 0%, 100%, .6)
	}
	.paner-play-lrc{
		position: absolute;
		width: 100%;
		text-align: center;
		top: 7.2rem;
		left: 0;
		padding: 0 0.2rem;
		
		height: 1.2rem;
		overflow: hidden;
		line-height: 0.4rem;
	}
	.paner-play-lrc p{
		height: 0.4rem;
		width: 100%;
		font-size: 0.22rem;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: hsla(0, 0%, 100%, .6);
		
	}
	.paner-play-lrc p.on{
		color: #fff;
		font-size: 0.24rem;
	}
	.play-btns{
		position: absolute;
		bottom: 0.3rem;
		left: 0;
		display: flex;
		
		width: 100%;
	}
	.play-btns a{
		flex: 1;
		text-align: center;
		line-height: 0.6rem;
		margin: 0 0.2rem;
		border-radius: 0.5rem;
	}
	.play-btns a.btn-back{
		color: #d33a31;
		border: 1px solid #d33a31;
	}
	.play-btns a.icon-download{
		
		color: #fff;
		background: #d33a31;
	}
	.play-bg {
		position: fixed;
		left: 0;
		top: -25%;
		height: 100%;
		width: 100%;
		background-size: cover;
		overflow: hidden;
		z-index: -1;
		background-position: 50%;
		background-repeat: no-repeat;
		transform: scale(1.5);
		filter: blur(10px);
		transform-origin: center top;
	}
	
	.play-bg:after {
		content: '';
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: rgba(0, 0, 0, .5);
	}
	
</style>