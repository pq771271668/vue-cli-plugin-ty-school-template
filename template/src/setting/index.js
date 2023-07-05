import isMobile from '@/assets/js/util/isMobile.js'
const setting= {
	layout:'normal', //normal和simple
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
	// 默认baseUrl，仅用于开发环境获取ticket和项目走网关时候默认baseUrl
	defaultBaseURL:process.env.NODE_ENV == 'production' ? 'https://zhxy-gateway-7.huijiaoyun.com':'http://zhxy-gateway-7.d.huijiaoyun.com',
	// 全局设置点击右边菜单是否刷新页面 setting.clickRefresh < route.meta.clickRefresh
	clickRefresh:false,
	// 设置动态title
	dynamicTitle:isMobile() ? true : false,
	// 设置移动端VConsole
	VConsole:true,
	// 是否有APP页面；否则PC端可以在移动端使用（是否适配需要看PC端页面做没有适配移动端）
	hasAPP:false,
}
export default setting