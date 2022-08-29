/* let _array = [];

function flatArray(array,key='children') {
	array.reduce((pre, cur) => {
		if (cur[key] && cur[key].length != 0) {
			flatArray(cur[key]);
		} else {
			_array.push(cur);
		}
	}, []);
	
	return _array
	
}

export default flatArray
 */


function flatArray(array,key='children') {
	const flat = array.reduce((pre, cur) => {
		return cur[key] ? pre.concat(cur[key]) : pre.concat(cur);
	}, []);
	return flat
}

export default flatArray

