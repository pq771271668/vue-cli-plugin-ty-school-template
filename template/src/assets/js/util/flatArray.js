/* 返回最后一层 */
function flatArray(array,key='children') {
	const flat = array.reduce((pre, cur) => {
		return cur[key] ? pre.concat(cur[key]) : pre.concat(cur);
	}, []);
	return flat
}

export default flatArray

