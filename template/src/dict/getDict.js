import dict from './index.js'

/* 	key:属性名 
	value:值
	property: [Boolean] == true只返回label，否则全部返回 ; [String] == 返回属性值，否则返回全部
*/

const getDict = function (key,value,property = true) {
	
	const _dict = dict[key]
	
	if (value) {
		if (_dict && Array.isArray(_dict)) {
			const index = _dict.findIndex(option => option.value == value)
			if (index > -1) {
				
				const option = _dict[index]
				
				if (_.isBoolean(property)) {
					return property ? option.label : option
				}
				else if (_.isString(property)) {
					return Object.keys(option).includes(property) ? option[property]: option
				}
			}
			else {
				return '值为：'+value
			}
		}
		else {
			console.error(key+'========不存在或者不是数组=========')
		}
	}
	else {
		return ''
	}
	
}


export default getDict