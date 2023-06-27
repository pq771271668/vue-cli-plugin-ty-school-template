/* 
三种下载模式：blob模式、href文件路径模式 、api通过项目的api设置过了的、xhr纯后端接口模式
 
 */

import axios from 'axios'

import request from '@/assets/js/request/index.js'

function onDownload (data,fileName,type ) {
	
	const blob = new Blob([data], { type: type }) // 构造一个blob对象来处理数据，并设置文件类型
	 
	if (window.navigator.msSaveOrOpenBlob) { //兼容IE10
		navigator.msSaveBlob(blob, fileName)
	} else {
		const href = URL.createObjectURL(blob) //创建新的URL表示指定的blob对象
		createDOM(href,fileName)
	}
}

function createDOM (href,fileName) {
	const a = document.createElement('a') //创建a标签
	a.style.display = 'none'
	a.href = href // 指定下载链接
	a.download = fileName //指定下载文件名
	a.click() //触发下载
	URL.revokeObjectURL(a.href) //释放URL对象
}

function download (model,data,fileName = '下载',type = 'application/vnd.ms-excel') {
	if (model == 'blob') {
		/* data:文件 */
		/* 如果是流文件下载，请注意在请求中一定一定要设置responseType: 'blob'，否则文件excel无法打开 */
		onDownload(data,fileName,type)
	}
	else if (model == 'xhr') {
		/* data：请求参数 */
		axios(
			Object.assign({},{
				responseType: "blob",
			},data)
		)
		.then ( resp => {
			if(!resp) return
			// onDownload(resp.data,fileName,type)
			createDOM(resp.data,fileName)
		})
	}
	else if (model == 'href') {
		/* data：url */
		createDOM(data,fileName)
	}
	else if (model == 'api') {
		/* data: 接口名和【接口参数】*/
		let axiosName = ''
		let payload = {}
		if (typeof data == 'string') {
			axiosName = data
		}
		else {
			axiosName = data.axiosName
			payload = data.payload
		}
		request[axiosName](payload).then( resp => {
			createDOM(resp,fileName)
		})
	}
}


export default download
