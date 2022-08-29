import permission from './module/permission.js'

let directives = {
	permission
}

export default {
	install(Vue) {
		Object.keys(directives).forEach((key) => {
			Vue.directive(key, directives[key])
		})
	},
}
