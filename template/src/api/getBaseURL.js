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
		if (resp.length == 0) {
			console.error('config.json文件不能为空！！！')
		}
		else {
			CONFIG.data = resp
			for (let key of resp) {
				if ( key.code ==  UrlParams.platformCode) {
					CONFIG.baseURL = key.url
				}
			}
			
			if (!CONFIG.baseURL) {
				let defaultUrl = resp.find(res => res.code == '')
				if (defaultUrl) {
					CONFIG.baseURL = defaultUrl.url
				}
				else {
					console.error('当前项目不走网关，请在config.json文件设置一个平台码为空的baseURL')
				}
			}
		}
	}
})
console.log("baseURL:"+CONFIG.baseURL)
export default CONFIG
