import permission from './module/permission.js'
import draggable from './module/draggable.js'

let directives = {
	permission,
	draggable
}

export default {
	install(Vue) {
		Object.keys(directives).forEach((key) => {
			Vue.directive(key, directives[key])
		})
	},
}
