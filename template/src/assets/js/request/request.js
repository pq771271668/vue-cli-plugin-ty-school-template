/* 
 axios二次封装
 
 统一的错误处理：请求拦截错误处理，响应拦截错误处理
 
 只有保存数据才使用data类型
 
 */

import axios from 'axios'
import router from '@/router/index.js'
import store from '@/store'

import Cookies from 'js-cookie'

import CONFIG from '@/api/getBaseURL.js'

import getToken from '@/api/getToken.js'

import {
	Loading
} from 'element-ui'

import tyToast from '@/components/common/popups/Toast';

let HTTPLOADING = null
let HTTPLOADINGCOUNT = 0

let HTTPERRORCOUNT = 0
// STATUS 后台的返回码的字符串 MSG后台返回信息的字符串
const STATUS = 'code'
const MSG = 'msg'

//打印错误
function showError(error,callback,confirmButtonText) {
	if (HTTPERRORCOUNT == 0) {
		HTTPERRORCOUNT ++
		
		let ERRORMSG = error && error[STATUS] ? error[MSG] : '系统开小差了，请稍后再试！'
		
		tyToast({
			type:'error',
			message:ERRORMSG,
			onLeave:() => {
				HTTPERRORCOUNT --
				callback && callback()
			}
		})
	}
}

//显示/取消遮罩弹框
function showLoading() {
	if (HTTPLOADINGCOUNT == 0) {
		HTTPLOADING = Loading.service({
			fullscreen: true,
			lock: true,
			background: 'rgba(0, 0, 0, 0.5)'
		})
	}
	HTTPLOADINGCOUNT ++
}

function hideLoading () {
	HTTPLOADINGCOUNT --
	if (HTTPLOADINGCOUNT == 0) {
		HTTPLOADING && HTTPLOADING.close()
		return false
	}
}

// 设置axios全部配置的baseUrl、timeout
axios.defaults.baseURL = CONFIG.baseURL
axios.defaults.timeout = '60000'
// axios.defaults.withCredentials = true

/* 创建实例 -- 请求拦截 -- 响应拦截 */
/* extra:额外添加的自定义属性；loading:是否需要loading弹框 error:是否需要错误提示 success:是否设置成功之后的提示信息 source:返回数据是否原封不动返回*/
let instance = axios.create({extra:{loading:true}})
// 请求拦截
instance.interceptors.request.use(config => {
	
	if (config.extra.loading) {
		showLoading()
	}
	
	//处理RESTful风格 uri [String,Array,Object]
	if (config.uri) {
		if ( typeof config.uri == 'string' || typeof config.uri == 'number') {
			config.url += '/'+config.uri
		}
		else if (Array.isArray(config.uri)) {
			let uri = config.uri.join('/')
			config.url += '/'+uri
		}
		else {
			for (let key in config.uri) {
				config.url = config.url.replace(key,key+'/'+config.uri[key])
			}
		}
	}
	
	if (config.token === undefined) {
		const AccessToken = Cookies.get('AccessToken')
		
		// config.params.accessToken = AccessToken
		
		config.params = Object.assign({},config.params,{
			accessToken:AccessToken
		})
		
	}
	
	return config
}, error => {
	hideLoading()
	return Promise.reject(error)
})

// 重新请求函数
function tautology(err) {
    let back = new Promise(function (resolve) {
        console.log('接口' + err.config.url + '请求失败，重新请求');
        resolve();
    })
    return back.then(function () {
        return instance(err.config);
    })
}

// 响应拦截
instance.interceptors.response.use(response => {
	// 对响应数据做点什么
	if (response.config.extra.loading) {
		hideLoading()
	}
	
	if (response.config.resource) {
		return response
	}
	else {
		const resp = response.data
		
		if (resp[STATUS] == 200 || resp[STATUS] == 0) {
			return resp.data
		} 
		
		else if (resp[MSG].includes('accessToken') || resp[MSG].includes('Ticket')) {
			if ( store.state.USERINFO.userSpaceUrl ) {
				showError(Object.assign({},resp,{
					[MSG]:resp[MSG].includes('Ticket')?'用户登录信息已过期，请重新登录':resp[MSG]
				}),()=> {
					window.location.href = store.state.USERINFO.userSpaceUrl
				})
			}
			else {
				showError(resp)
			}
		}
		
		else if (!resp[STATUS]) {
			return resp
		}
		else {
			showError(resp)
			return Promise.reject(resp)
		}
	}
}, error => {
	hideLoading()
	showError()
	return Promise.reject(error)
})

export default instance
