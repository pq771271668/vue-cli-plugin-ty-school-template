import dict from './index.js'

/* 	key:属性名 
	value:值 [String,Array]
	property: [String] == 返回属性值，否则返回全部
*/

function getValue (options,value,property) {
	const option = options.find(option => option.value == value)
	if (option) {
		return Object.keys(option).includes(property) ? option[property]: option
	}
	else {
		return value
	}
} 

const getDict = function (key,value,property = 'label') {
	
	const options = dict[key]
	
	if (value) {
		if (options && Array.isArray(options)) {
			if (_.isString(value) || _.isNumber(value)) {
				return getValue(options,value,property)
			}
			else if (_.isArray(value)) {
				let _val = []
				for (let val of value) {
					_val.push(getValue(options,val,property))
				}
				return _val
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