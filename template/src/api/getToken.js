import API from '@/assets/js/request/index.js'

import UrlParams from './urlParams.js'

import store from '@/store'

import Cookies from 'js-cookie'

import setting from '@/setting'

import { Notify } from 'vant';

function getTicket () {
	return new Promise( (resolve,reject) => {
		/* 获取ticket；开发环境通过接口获取，生产环境通过浏览器URL获取 */
		if (process.env.NODE_ENV == 'development' && (!Cookies.get('AccessToken') || _.isEmpty(store.state.USERINFO)) ) {
			API.commonAutoLogin({
				baseURL:setting.defaultBaseURL,
				params:{
					platformCode:UrlParams.platformCode,
					account:UrlParams.account
				},
				token:false,
				extra:{
					loading:false
				}
			})
			.then(res => {
				resolve(res.ticket)
			})
			.catch( () => {
				Notify({ type: 'danger', message: '接口获取ticket失败' });
			})
		}
		else {
			resolve(UrlParams.ticket)
		}
		
	})
}


function getToken () {
	return new Promise( (resolve,reject) => {
		/* token获取地址 */
		// '/serv-platform/api/usersession/getAccessToken'
		let url = '/serv-platform/api/usersession/getAccessToken'
		if (url) {
			getTicket()
			.then( (ticket) => {
				if (!Cookies.get('AccessToken') || _.isEmpty(store.state.USERINFO)) {
					API.commonToken({
						params:{
							platformCode:UrlParams.platformCode,
							ticket:ticket,
							appId:UrlParams.appId
						},
						token:false,
						extra:{
							loading:false
						}
					})
					.then(res => {
						const accessToken = res.accessToken;
						
						Cookies.set("AccessToken", accessToken, {
							expires: 0.08
						})
						
						const USERINFO = Object.assign({},res.userSession,{
							USERROLE:{}
						})
						
						store.commit('$store', {
							name:'USERINFO',
							value:USERINFO
						})
						
						console.log('%c此处可以添加登陆账号的其他信息，例如：用户权限、角色等信息','color:#fff;background-color: #e6a23c;padding: 12px 20px;border-radius: 4px;font-size: 14px;font-weight: 500;');
						/* API.commonUserRole().then( resp => {
							// console.log(resp)
							const USERINFO = Object.assign({},res.userSession,{
								USERROLE:resp
							})
							
							store.commit('$store', {
								name:'USERINFO',
								value:USERINFO
							})
							
							resolve(USERINFO)
						}) */
						
						
						resolve(USERINFO)
					})
					.catch( () => {
						Notify({ type: 'danger', message: '接口获取Token和用户信息失败' });
					})
				}
				else {
					resolve('AccessToken已存在')
				}
			})
		}
		else {
			console.error('请设置token和用户信息获取地址')
			resolve()
		}
	})
}

export default getToken
