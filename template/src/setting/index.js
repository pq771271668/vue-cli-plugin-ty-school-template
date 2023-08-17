import isMobile from '@/assets/js/util/isMobile.js'

const setting= {
	layout:'<%= options.Layout %>', //normal和simple、narrow
	urlParams:{
		// 默认账号名，用于开发使用
		account:process.env.NODE_ENV == 'production' ? '':'bieke',
		// 默认平台码，用于开发使用
		platformCode:process.env.NODE_ENV == 'production' ? '':'420100',
		// 默认的appId
		appId:'',
	},
	// 操作手册地址
	handlerURL:'',
	//项目名
	title:'<%= options.ProjectName %>',
	// 全局设置点击右边菜单是否刷新页面 setting.clickRefresh < route.meta.clickRefresh
	clickRefresh:false,
	// 设置动态title
	dynamicTitle:isMobile() ? true : false,
	// 设置移动端VConsole
	VConsole:true
}
export default setting