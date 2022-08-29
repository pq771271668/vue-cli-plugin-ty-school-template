// 获取文件后缀名
const ext = function (str) {
	const index = str.lastIndexOf(".")
	return str.substr(index+1)
}
export default ext