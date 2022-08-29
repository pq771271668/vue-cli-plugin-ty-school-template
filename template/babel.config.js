const plugins = []
// 判断当前为开发阶段 development 还是发布阶段  production
if (process.env.NODE_ENV === 'production') {
	plugins.push('transform-remove-console')
}

module.exports = {
	presets: [
		'@vue/cli-plugin-babel/preset'
	],
	plugins:[...plugins]
}