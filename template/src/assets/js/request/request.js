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

import isMobile from '@/assets/js/util/isMobile.js'

import {intersection} from 'lodash'

import {
	Loading
} from 'element-ui'

import { Toast,Notify  } from 'vant';

import tyToast from '@/components/common/Toast';

let HTTPLOADING = null
let HTTPLOADINGCOUNT = 0

let HTTPERRORCOUNT = 0
// STATUS 后台的返回码的字符串 MSG后台返回信息的字符串 DATA后台返回的数据 SUCCESSCODE请求成功返回码
const STATUS = ['code','status']
const MSG = ['msg','message'] 
const DATA = ['data','result']
const SUCCESSSTATUS = ['000000','200','0']

//打印错误
function showError(error,callback,confirmButtonText) {
	if (HTTPERRORCOUNT == 0) {
		HTTPERRORCOUNT ++
		
		const KEYS = Object.keys(error)
		let ERRORSTATUS = intersection(KEYS,STATUS)
		let ERRORMSG = intersection(KEYS,MSG)
		
		let message = error && error[ERRORSTATUS] ? error[ERRORMSG] : '系统开小差了，请稍后再试！'
		if (!isMobile()) {
			tyToast({
				type:'error',
				message:message,
				onLeave:() => {
					HTTPERRORCOUNT --
					callback && callback()
				}
			})
		}
		else {
			Notify({
				type: 'danger', 
				message: message ,
				onClose:() => {
					HTTPERRORCOUNT --
					// callback && callback()
				}
			});
		}
		
	}
}

//显示/取消遮罩弹框
function showLoading() {
	if (!isMobile()) {
		if (HTTPLOADINGCOUNT == 0) {
			HTTPLOADING = Loading.service({
				fullscreen: true,
				lock: true,
				background: 'rgba(0, 0, 0, 0.5)'
			})
		}
		HTTPLOADINGCOUNT ++
	}
	else {
		HTTPLOADING = Toast.loading({
			forbidClick:true,
			duration: 0
		});
	}
}

function hideLoading () {
	if (!isMobile()) {
		HTTPLOADINGCOUNT --
		if (HTTPLOADINGCOUNT == 0) {
			HTTPLOADING && HTTPLOADING.close()
			return false
		}
	}
	else {
		HTTPLOADING && HTTPLOADING.clear();
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
		/* 获取接口的参数key值 */
		const KEYS = Object.keys(resp)
		let RESPSTATUS = response.config.status || intersection(KEYS,STATUS)
		let RESPDATA = (typeof response.config.resp == 'string' && response.config.resp) || intersection(KEYS,DATA)
		let RESPMSG = response.config.msg || intersection(KEYS,MSG)
		
		if (!resp[RESPSTATUS]) {
			return resp
		}
		else if ( SUCCESSSTATUS.includes(resp[RESPSTATUS].toString()) ) {
			if (response.config.resp && typeof response.config.resp == 'boolean') {
				return resp
			}
			else {
				return resp[RESPDATA]
			}
		} 
		else if (resp[RESPMSG].includes('accessToken') || resp[RESPMSG].includes('Ticket')) {
			showError(Object.assign({},resp,{
				[RESPMSG]:resp[RESPMSG].includes('Ticket')?'用户登录信息已过期，请重新登录':resp[RESPMSG]
			}),()=> {
				if (process.env.NODE_ENV == 'production') {
					window.location.href = store.state.USERINFO.userSpaceUrl || 'https://www.wuhaneduyun.cn/index.php?r=center/person/index'
				}
			})
		}
		else {
			showError(resp)
			return Promise.reject(resp)
		}
	}
}, error => {
	hideLoading()
	showError(error)
	return Promise.reject(error)
})

export default instance
