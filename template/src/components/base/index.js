import Vue from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
	// 其组件目录的相对路径
	'@/components/base',
	// 是否查询其子目录
	true,
	// 匹配基础组件文件名的正则表达式
	/\.(vue)$/
)

requireComponent.keys().forEach(fileName => {
	// 获取组件配置
	const componentConfig = requireComponent(fileName)

	// 获取组件的 PascalCase 命名
	const componentName = upperFirst(
		camelCase(fileName.replace(/\.\/(.*)\.vue/,'$1').split('/'))
	)
	// 全局注册组件
	Vue.component(
		componentName,
		// 如果这个组件选项是通过 `export default` 导出的，
		// 那么就会优先使用 `.default`，
		// 否则回退到使用模块的根。
		componentConfig.default || componentConfig
	)
})
