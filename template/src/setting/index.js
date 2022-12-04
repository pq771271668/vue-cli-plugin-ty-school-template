import isMobile from '@/assets/js/util/isMobile.js'
const setting= {
	// 默认账号名，用于开发使用
	account:process.env.NODE_ENV == 'production' ? '':'bieke',
	// 默认平台码，用于开发使用
	platformCode:process.env.NODE_ENV == 'production' ? '':'420100',
	// 默认的appId
	appId:'',
	//项目名
	title:'<%= options.ProjectName %>',
	// 默认baseUrl，仅用于开发环境获取ticket和项目走网关时候默认baseUrl
	defaultBaseURL:process.env.NODE_ENV == 'production' ? 'https://zhxy-gateway-7.huijiaoyun.com':'http://zhxy-gateway-7.d.huijiaoyun.com',
	// 全局设置点击右边菜单是否刷新页面 setting.clickRefresh < route.meta.clickRefresh
	clickRefresh:false,
	// 设置动态title
	dynamicTitle:isMobile() ? true : false,
}
export default setting