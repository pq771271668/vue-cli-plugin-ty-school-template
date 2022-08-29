import axios from '@/assets/js/request/request.js'

import UrlParams from './urlParams.js'

import store from '@/store'

import Cookies from 'js-cookie'

import CONFIG from './getBaseURL.js'

function getTicket () {
	return new Promise( (resolve,reject) => {
		
		const baseURL = CONFIG.baseURL
		
		let ticket = UrlParams.ticket
		
		const path = '/serv-platform/api'
		
		if (ticket || (Cookies.get('AccessToken') && !_.isEmpty(store.state.USERINFO))) {
			resolve ({baseURL,ticket,path})
		}
		else {
			axios({
				baseURL:baseURL,
				url:`${path}/login/autoLogin?platformCode=${UrlParams.platformCode}&account=${UrlParams.account}`,
				token:false,
				extra:{
					loading:false
				}
			})
			.then(res => {
				ticket = res.ticket
				resolve({baseURL,ticket,path})
			})
		}
		
		
	})
}


function getToken () {
	return new Promise( (resolve,reject) => {
		getTicket()
		.then( (data) => {
			console.log('getTicket-data:'+JSON.stringify(data));
			if (!Cookies.get('AccessToken') || _.isEmpty(store.state.USERINFO)) {
				axios({
					baseURL:data.baseURL,
					url:`${data.path}/usersession/getAccessToken?platformCode=${UrlParams.platformCode}&ticket=${data.ticket}&appId=${UrlParams.appId}`,
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
					
					// 权限获取 isAppAdmin lastUserType
					axios({
						extra:{loading:false},
						baseURL:data.baseURL,
						url:`/app-calendar/rest/separate/week/opt/checkUserAudit`
					})
					.then( permission => {
						
						const USERINFO = Object.assign({},res.userSession,{
							checkUserAudit:permission.result
						})
						
						store.commit('$store', {
							name:'USERINFO',
							value:USERINFO
						})
						
						resolve(USERINFO)
						
					})
					
				})
			}
			else {
				resolve('AccessToken已存在')
			}
		})
	})
}

export default getToken
