// 合并为一个文件是为了模拟后台不同权限账号获取路由接口的返回值
/*
{
	// 外层和vue-router属性保持一致
	name:'',
	path:'', //如果有path则使用path没有则使用['/'+name]
	component:'', //需要将字符串转成组件模式
	props:'',
	meta:{
		label:'',
		iconfont/iconpark:'', // 阿里字体库/字节字体库
		hidden:'',  //当设置 true 的时候该路由不会再侧边栏出现，比如：详细页面 
					//例如：设置：hidden:!['admin','teacher'].includes(permission())
		noRoute:'', //当设置 true 的时候该路由不会加载，比如：判断菜单权限时
					//例如：设置：noRoute:!['admin','teacher'].includes(permission())
		parent:'' //上级菜单名，image有值时，children里面必需填写parent，建议children里面都写的
		clickRefresh:'' //当设置为true时，点击侧边栏页面刷新
		//当不使用icon时，使用图片替代--未选中；
		//需要注意不能直接使用根目录（'/assets/images/icon.png'）报错，正确使用为：'assets/images/icon.png'
		// style -- 样式
		image:{
			normal:'',
			active:'',
			style:{}
			[styleActive]:{
				// 选中的样式；默认都是使用style
			}
		},
		keep: true/false //是否缓存，如果设置了keep:true，*****注意：必须需要路由的name和组件的name是一样的****
	},
	children:[]
}
*/

/* 
菜单权限说明:【根据项目来确定】
*/

// import store from '@/store/index.js'

import isMobile from '@/assets/js/util/isMobile.js'
import setting from '@/setting/index.js'

import web from './data/web.js'
import mobile from './data/mobile.js'

function routerData () {
	
	return new Promise( (resolve,reject) => {
		
	  	const data = mobile().length == 0 ? web() : isMobile() ? mobile() : web()
		
		if (isMobile() && mobile().length == 0) {
			document.querySelector('body').style.overflow = 'auto'
			document.querySelector('body').style.minWidth = '1200px'
		}
	  	resolve({data,mobile:isMobile() && mobile().length != 0})
	})
}


export default routerData
