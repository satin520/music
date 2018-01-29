import Vue from 'vue'
import Router from 'vue-router'
import list from '@/components/list'
import search from '@/components/search/search'
import rank from '@/components/rank/rank'
import info from '@/components/rank/info'
import plist from '@/components/plist/plist'
import sslist from '@/components/plist/sslist'
import singer from '@/components/singer/singer'
import singerlist from '@/components/singer/singerlist'
import singerinfo from '@/components/singer/info'
Vue.use(Router)

export default new Router({

	routes: [{
			path: '/',
			name: 'list',
			component: list
		},
		{
			path: '/search/index',
			name: 'search',
			component: search
		},
		{
			path: '/rank/list',
			name: 'rank',
			component: rank
		},
		{
			path: '/rank/info/:rankid',
			name: 'info',
			component: info
		},
		{
			path: '/plist/index',
			name: 'plist',
			component: plist
		},
		{
			path: '/plist/list/:specialid',
			name: 'sslist',
			component: sslist
		},
		{
			path: '/singer/class',
			name: 'singer',
			component: singer
		},
		{
			path: '/singer/list/:classid',
			name: 'singerlist',
			component: singerlist
		},
		{
			path: '/singer/info/:classid',
			name: 'singerinfo',
			component: singerinfo
		}
	],
	scrollBehavior(to, from, savedPosition) {
		if(savedPosition) {
			return savedPosition
		} else {
			return {
				x: 0,
				y: 0
			}
		}
	}
})