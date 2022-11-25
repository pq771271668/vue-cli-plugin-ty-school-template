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
 拓展了两个方法：$axios.name.alert和$axios.name.delete
 */
// 进一步封装axios，目的是为了更好的关联request.js和src/api/目录里面的数据，统一管理接口

// API中name值最好和router路由的name值一致


import service from '@/assets/js/request/request.js'

import {camelCase,merge,isObject,isFunction,isEmpty} from 'lodash'  //驼峰写法 合并

import isMobile from '@/assets/js/util/isMobile.js'
import tyAlert from '@/components/common/Alert';
import { Dialog  } from 'vant';

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

HTTPJSON = HTTPJSON.filter( http => {return http.name && isObject(http) && !isFunction(http) && (http.children || http.url) })

// console.log(HTTPJSON)


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
				
				return new Promise( function (resolve,reject) {
					setService(key,config,resolve,reject)
				})
			}
			
			API[_name].alert = API[Name].alert = function (config = {},AlertConfig = {}) {
				return new Promise( function (resolve,reject) {
					serviceAlert('alert',key,config,AlertConfig,resolve,reject)
				})
			}
			
			
			API[_name].delete = API[Name].delete = function (config = {},deleteConfig = {}) {
				return new Promise( function (resolve,reject) {
					serviceAlert('delete',key,config,deleteConfig,resolve,reject)
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

function setService (key,config,resolve,reject) {
	config = merge({},{
		// method:'post'
	},key,config)
	service(config)
	.then ( response => {
		resolve(response)
	}).catch ( error => {
		reject(error)
	})
}

function serviceAlert (name,key,config,AlertConfig,resolve,reject) {
	
	let _AlertConfig = {}
	
	if (name == 'delete') {
		_AlertConfig = {
			title:'删除',
			message:'确认删除吗？删除该数据之后将无法恢复',
		}
	}
	else if (isEmpty(AlertConfig)){
		_AlertConfig = {
			message:'请设置alert'
		}
	}
	
	_AlertConfig = merge({},_AlertConfig,AlertConfig)
	
	if (isMobile()) {
		
		Dialog.confirm(_AlertConfig).then(() => {
			setService(key,config,resolve,reject)
		})
		
	}
	else {
		if (AlertConfig.option && AlertConfig.option.length > 2) {
			tyAlert({
				type:'error',
				message:'接口API拓展的tyAlert.option只允许拥有两个'
			})
			return false;
		}
		
		if (name == 'delete') {
			_AlertConfig = merge({},_AlertConfig,{
				type:'warning',
				option:['取消','确定'],
			})
		}
		
		tyAlert(merge({},_AlertConfig,
			{
				onConfirm: ($this) => {
					$this.close()
					setService(key,config,resolve,reject)
				},
				onClick: ($this) => {
					$this.close()
					setService(key,config,resolve,reject)
				}
			}
		))
		
	}
	
}


server('',HTTPJSON)

// console.log(API)

export default API
