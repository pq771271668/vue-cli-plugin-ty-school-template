const setting= {
	//项目名
	title:'<%= options.name %>',
	// 默认baseUrl，仅用于开发环境获取ticket和项目走网关时候默认baseUrl
	defaultBaseURL:process.env.NODE_ENV == 'production' ? 'https://zhxy-gateway-7.huijiaoyun.com':'http://zhxy-gateway-7.d.huijiaoyun.com',
	// 是否设置全局页面缓存 keepAlive为false，可以通过vue单页面的name包含KEEP设置为缓存，keepAlive为true时，可以通过name包含NOTKEEP设置为不缓存（注意关键字是大写的）
	keepAlive:false,
	// 全局设置点击右边菜单是否刷新页面 setting.clickRefresh < route.meta.clickRefresh
	clickRefresh:false,
	// 设置动态title
	dynamicTitle:false
}
export default setting