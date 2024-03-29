import Vue from 'vue'
import Router from 'vue-router'

import setting from '../setting/index.js'

import store from '../store'

Vue.use(Router)

const routes = [
]

const router = new Router({
  routes
})

router.beforeResolve((to, from, next) => {
	if (setting.dynamicTitle) {
		document.title = to.meta.label || setting.title
	}
	else {
		document.title = setting.title
	}
	
	if (to.meta.keep) {
		store.commit('ADDKEEPALIVE',to.name)
	}
	
	next()
}) 

export default router
