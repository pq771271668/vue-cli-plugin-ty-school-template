const invalidChar = function (str) {
	const pattern=/[`~!@#$^\-&*()=|{}':;',\\\[\]\.<>\/?~！@#￥……&*（）——|{}【】'；：""'。，、？\s]/g
	str = str.replace(pattern,'')
	
	str.replace(/(^\s*)/g, '') // 去掉左边空格
	str.replace(/(\s*$)/g, '') // 去掉右边空格
	str.replace(/[ ]/g, '') // 去掉中间空格
	str.replace(/(^\s*)|(\s*$)/g, '') // 去掉前后空格
	str.trim() // 去掉前后空格 方法用于删除字符串的头尾空白符，空白符包括：空格、制表符 tab、换行符等其他空白符等。不会改变原始字符串。null, undefined, Number 类型。
	
	str.replace(/\s+/g, '') // 去掉所有空格，包括换行符
	return str
}
export default invalidChar