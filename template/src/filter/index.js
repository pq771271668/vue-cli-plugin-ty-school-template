import toThousand from './module/toThousand.js'
import toCN from './module/toCN.js'

let filters = {
	toThousand,
	toCN
}

export default {
	install(Vue) {
		Object.keys(filters).forEach((key) => {
			Vue.filter(key, filters[key])
		})
	},
}
