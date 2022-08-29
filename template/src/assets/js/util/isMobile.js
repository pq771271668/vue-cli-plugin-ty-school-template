const isMobile = function () {
	let userAgent = navigator.userAgent,Agents = ["Android", "iPhone","SymbianOS", "Windows Phone","iPad", "iPod"];
	return Agents.some((i)=>{
		return userAgent.includes(i)
	})
}

// 返回的值是true（移动端）/false（web端）

export default isMobile