import UrlParams from './urlParams.js'

import xhr from '@/assets/js/util/xhr.js'

// 设置默认baseURL地址
let baseURL = process.env.NODE_ENV == 'production' ? 'https://zhxy-gateway-7.huijiaoyun.com':'http://zhxy-gateway-7.d.huijiaoyun.com'

let CONFIG = {
	baseURL:baseURL,
	data:[]
}

xhr({
	url:'./config.json',
	success:function (resp) {
		CONFIG.data = resp
		for (let key of resp) {
			if ( key.code ==  UrlParams.platformCode) {
				CONFIG.baseURL = key.url
			}
		}
	}
})
export default CONFIG