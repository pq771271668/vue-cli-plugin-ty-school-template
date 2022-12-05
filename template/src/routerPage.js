import routerData from '@/router/data.js'

import flatArrayDeep from '@/assets/js/util/flatArrayDeep'

import router from './router'

import getToken from '@/api/getToken.js'

import Cookies from 'js-cookie'

import store from '@/store/index.js'

import isMobile from '@/assets/js/util/isMobile.js'

import Vue from 'vue'

// 获取动态路由
let oneRun = true;

router.beforeEach( (to, from, next) => {
	// console.log(router.options.routes)
	if (oneRun) {
		/* 注意：这里需要先获取token在获取路由，不然从根目录进来会出现有些页面找不到 */
		getToken()
		.then( (resp) => {
			routerData()
			.then( data => {
				oneRun = false;
				
				let routerPageFlat = flatArrayDeep(data)
				
				let routerPage = []
				
				for (let key of routerPageFlat) {
					if (key.component && !key.meta.noRoute) {
						const path = key.path ? key.path : '/'+key.name 
						const component =  key.component instanceof Vue ? key.component : () => import(`@/views${key.component}`)
						routerPage.push(Object.assign({},key,{
							path,
							component
						}))
					}
				}
				
				let routers = []
				
				if (routerPage.length == 0) {
					console.error('请在router/data.js设置路由数据')
					routers = [{
						path: '/',
						name: '/',
						component: () =>  import('@/views/index')
					}]
				}
				else {
					routers = [{
						path: '/',
						name: '/',
						component: () =>  isMobile() ? import('@/views/Mobile/index') : import('@/views/index'),
						redirect:{
							name:routerPage[0].name
						},
						children: routerPage
					},{
						path: '*',
						name: 'error',
						component: () => import('@/views/common/error')
					}]
				}
				
				router.addRoutes(routers)
				next({ ...to, replace: true }) // hack方法 确保addRoutes已完成
				
			})
		})
	}
	else {
		next()
	}
})

// router.options.routes.push(...routers);
