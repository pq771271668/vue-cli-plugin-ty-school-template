import store from '@/store'

const permission = {
	inserted:function (el,binding) {
		let value = binding.value // 获取到 v-permission的值
		if (value) {
			/* if (!store.state.login.authorities.includes(value)) {
				// 没有权限 移除Dom元素
				el.parentNode && el.parentNode.removeChild(el)
			} */
		}
	}
}

export default permission