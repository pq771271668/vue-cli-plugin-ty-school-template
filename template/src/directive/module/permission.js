/**
 * 使用: str 标志当前元素展示权限
 * <el-button v-permission="str">按钮1</el-button>
 */
function checkArray(key) {
	let arr = [1, 2, 3, 4]
	return arr.indexOf(key) > -1
}

const permission = {
	inserted: function(el, binding) {
		let permission = binding.value // 获取到 v-permission的值
		if (permission) {
			let hasPermission = checkArray(permission)
			if (!hasPermission) {
				// 没有权限 移除Dom元素
				el.parentNode && el.parentNode.removeChild(el)
			}
		}
	},
}

export default permission
