import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		cursong: [],
		list: [],
		isPlayer: false,
		index: 0,
		lrcArr: {},
		playIndex: 1,
		timer: '',
		time: 0
	},
	mutations: {
		curSong(state, obj) {
			state.cursong = { ...state.cursong,
				obj
			}
			//			state.cursong = {song_name:obj.song_name,
			//							 author_name:obj.author_name,
			//							 img:obj.img,
			//							 play_url: obj.play_url}

		},
		getLrc(state, obj) {
			state.lrcArr = obj

		},
		getList(state, obj) {
			state.list = obj
		},
		getIndex(state, index) {
			state.index = index
		},
		getTime(state, time) {
			state.time = time
		},
		player(state) {
			state.isPlayer = true
		},
		getPlayIndex(state, index) {
			state.playIndex = index
		},
		pause(state) {
			clearInterval(state.timer)
		}

	},
	actions: {
		getSong({
			commit,
			state
		}, hash) {
			axios.get('pcapi/yy/index.php?r=play/getdata&hash=' + hash + '').then(({
				data
			}) => {
				data = data.data
				state.cursong.lyrics = data.lyrics
				state.cursong.song_name = data.song_name
				state.cursong.author_name = data.author_name
				state.cursong.img = data.img
				state.cursong.play_url = data.play_url
				let lrc_arr = state.cursong.lyrics.split('\n')
				let lrcArr = {
					lrc: [],
					second: []
				}
				for(var i = 1; i < lrc_arr.length - 1; i++) {
					lrcArr.lrc[i] = lrc_arr[i].replace(/\[[\w\W]*\]/, "").replace(/^\s*|\s*$/g, "")
					lrcArr.second[i] = lrc_arr[i].match(/\[(.+?)\]/g)
					lrcArr.second[i] = parseInt(lrcArr.second[i][0].substr(1, 2)) * 60 + parseInt(lrcArr.second[i][0].substr(4, 2))

				}
				commit('getLrc', lrcArr)
				state.playIndex = 1
				state.time = 0
				clearInterval(state.timer)
				state.timer = setInterval(function() {
					state.time++
						commit('getTime', state.time)
					if(state.time >= state.lrcArr.second[state.playIndex]) {
						state.playIndex++
							commit('getPlayIndex', state.playIndex)
					}
				}, 1000)
				commit('curSong', state.cursong)

			})
		},
		play({
			commit,
			state
		}) {
			state.timer = setInterval(function() {
				state.time++
					commit('getTime', state.time)
				if(state.time >= state.lrcArr.second[state.playIndex]) {
					state.playIndex++
						commit('getPlayIndex', state.playIndex)
				}
			}, 1000)
		},
		next({
			dispatch,
			state
		}) {
			if(state.index < state.list.length - 1) {
				state.index++
					state.cursong.hash = state.list[state.index]
			} else {
				state.index = 0
				state.cursong.hash = state.list[state.index]
			}
			dispatch('getSong', state.cursong.hash);
		},
		getList({
			commit,
			state
		}, obj) {
			commit('getIndex', -1)
			commit('getList', obj)
		}
	}
})