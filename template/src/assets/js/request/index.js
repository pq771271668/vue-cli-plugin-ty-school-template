/* 
 {
	label:'',
	name:'', 
	children:[
		...同上，//其他的参数可以参考axios
		url:'',
		method:'',
		[baseURL]:'' //可选
	] 
	 
 }
 调用：$axios.parantName[childrenName] 或者 $axios.name
 */
// 进一步封装axios，目的是为了更好的关联request.js和src/api/目录里面的数据，统一管理接口

// API中name值最好和router路由的name值一致

let HTTPJSON = []

//普通页面路由
const requireHTTP = require.context(
	'@/api',
	true,
	/\.(js)$/
)
requireHTTP.keys().forEach(fileName => {
	const componentConfig = requireHTTP(fileName)
	if (componentConfig.default) {
		HTTPJSON.push(componentConfig.default)
	}
})

import service from '@/assets/js/request/request.js'

import camelCase from 'lodash/camelCase'  //驼峰写法
import merge from 'lodash/merge' //合并

let API = {} 

function server (parent,data) {
	for (let key of data) {
		// 当对象是最后一层时，
		if (!key.children && !Array.isArray(key.children)) {
			const parentName = parent.name
			let Name = key.name  //驼峰式写法
			let _name = key.name //短横线写法
			
			if (parentName) {
				Name = camelCase(parentName+'-'+key.name)
				_name = (parentName+'_'+key.name)
			}
			API[_name] = API[Name] = function (config = {}) { 
				//config为当前调用接口时，传递过来的自定义配置参数
				//key为api目录下定义的接口参数
				
				config = merge({},{
					method:'post'
				},key,config)
				
				// config.parent = parent
				
				return new Promise( function (resolve,reject) {
					service(config)
					.then ( response => {
						resolve(response)
					}).catch ( error => {
						reject(error)
					})
				})
			}
		}
		// 当对象下面还有层级结构时
		else {
			let parent = key
			server (parent,key.children)
		}
	}
}

server('',HTTPJSON)

export default API