import UrlParams from './urlParams.js'

import xhr from '@/assets/js/util/xhr.js'
import Alert from '@/components/common/Alert'

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
					Alert({
						type:'error',
						showClose:false,
						message:`当前平台码没有在config.json文件中匹配到<br />
						同时config.json文件也没有设置code为空的默认值<br >
							{
							    "code": "",
							    "url": " https://zhxy-gateway-7.huijiaoyun.com"
							}
						`
					})
				}
			}
		}
	}
})
console.log("baseURL:"+CONFIG.baseURL)
export default CONFIG
