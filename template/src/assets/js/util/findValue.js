/* 从一个数组对象里面根据给定的值，返回集合对象里面的值  */

/* 	options:数组 
	value:值 [String,Array]
	property: [String] == 需要返回的属性值，为空则返回全部，默认为label
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

const findValue = function (options,value,property = 'label') {
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
		else {
			return value
		}
	}
	else {
		return value
	}
}


export default findValue