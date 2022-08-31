import UrlParams from './urlParams.js'

import xhr from '@/assets/js/util/xhr.js'

// 设置默认baseURL地址
let CONFIG = {
	baseURL:'',
	data:[]
}

xhr({
	url:'./config.json',
	success:function (resp) {
		if (resp.length > 0) {
			/* 走config.json配置网关 */
			CONFIG.data = resp
			for (let key of resp) {
				if ( key.code ==  UrlParams.platformCode) {
					CONFIG.baseURL = key.url
				}
			}
			/* 如果没有匹配到平台码,则得到一个默认的地址 */
			/* 默认地址首先取json文件默认地址(code为空),如果没有在取内置的默认地址 */
			if (!CONFIG.baseURL) {
				let defaultUrl = resp.find(res => res.code == '')
				if (defaultUrl) {
					CONFIG.baseURL = defaultUrl.url
				}
				else {
					CONFIG.baseURL = process.env.NODE_ENV == 'production' ? 'https://zhxy-gateway-7.huijiaoyun.com':'http://zhxy-gateway-7.d.huijiaoyun.com'
				}
			}
		}
		else {
			/* 全国一套 */
			CONFIG.baseURL = 'https://zhxy-app-factoryrecord.huijiaoyun.com'
		}
	}
})

export default CONFIG