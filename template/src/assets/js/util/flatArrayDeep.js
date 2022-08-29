function flatArrayDeep(array,key='children',value = []) {
	array.reduce((pre, cur) => {
		value.push(cur);
		if (cur[key] && cur[key].length != 0) {
			flatArrayDeep(cur[key],key,value);
		}
	}, []);
	
	return value
	
}

export default flatArrayDeep