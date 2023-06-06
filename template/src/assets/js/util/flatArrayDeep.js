/* 拉伸 建议使用loadsh */
function flatArrayDeep(array,key='children',index,value = []) {
	array.reduce((pre, cur,currentIndex) => {
		value.push(Object.assign(cur,{
			currentIndex,parentIndex:index
		}));
		if (cur[key] && cur[key].length != 0) {
			flatArrayDeep(cur[key],key,currentIndex,value);
		}
	}, []);
	
	return value
	
}

export default flatArrayDeep