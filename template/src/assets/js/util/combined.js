// arr1,arr2,对比的key值，不存在的是否合并;返回arr2
const combined = function (arr1 = [],arr2 = [],key = 'id',isPush = false) {
	const data = arr1.reduce((acc, cur) => {
		const target = acc.find(e => e[key] === cur[key]);
		if (target) {
			Object.assign(target, cur);
		} else if (isPush){
			acc.push(cur);
		}
		return acc;
	}, arr2);
	return data
}

export default combined
