/* 
三种下载模式：blob模式、xhr后端接口模式、href文件路径模式 
 
 */

import axios from 'axios'
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
		onDownload(data,fileName,type)
	}
	else if (model == 'xhr') {
		axios(
			Object.assign({},{
				responseType: "blob",
			},data)
		)
		.then ( res => {
			if(!res) return
			onDownload(res.data,fileName,type)
		})
	}
	else if (model == 'href') {
		createDOM(data,fileName)
	}
}


export default download