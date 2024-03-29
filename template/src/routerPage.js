import routerData from '@/router/data.js'

import flatArrayDeep from '@/assets/js/util/flatArrayDeep'

import router from './router'

import getToken from '@/api/getToken.js'

import Cookies from 'js-cookie'

import store from '@/store/index.js'

import isMobile from '@/assets/js/util/isMobile.js'
import setting from '@/setting/index.js'

function getRouter (data,array) {
	for (let key of data) {
		if (key.meta && !key.meta.noRoute) {
			if (key.component) {
				// const path = key.path ? key.path : '/'+key.name 
				
				let obj = Object.assign({},key,{
					// path:path,
					component:() => import(`@/views${key.component}`)	
				})
				if (key.children && key.children.length  > 0) {
					obj.children = []
					getRouter(key.children,obj.children)
				}
				
				array.push(obj)
			}
			else if (!key.component && key.children && key.children.length  > 0) {
				getRouter(key.children,array)
			}
		}
		
	}
}

// 获取动态路由
let oneRun = true;

router.beforeEach( (to, from, next) => {
	// console.log(router.options.routes)
	if (oneRun) {
		/* 注意：这里需要先获取token在获取路由，不然从根目录进来会出现有些页面找不到 */
		getToken()
		.then( (resp) => {
			routerData()
			.then( ({data,mobile}) => {
				oneRun = false;
				
				let routerPage = []
				
				getRouter(data,routerPage)
				
				/* console.log(data)
				console.log(routerPage) */
				
				let routers = []
				
				routers = [{
					path: '/',
					name: '/',
					component: () =>  mobile ? import('@/views/h5/index') : import('@/views/index'),
					redirect: () => {
						let redirectName = routerPage.length == 0 ? 'noPermission': routerPage[0].name
						return {
							name:redirectName
						}
					},
					children: routerPage
				},{
				path: '/no-permission',
				name: 'noPermission',
				component: () => import('@/views/common/no-permission')
				},{
					path: '*',
					name: 'error',
					component: () => import('@/views/common/error')
				}]
				
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
