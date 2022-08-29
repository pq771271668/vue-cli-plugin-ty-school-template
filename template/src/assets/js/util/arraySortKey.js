/* 
key：需要比较得属性名
desc：升降序
 */
const arraySortKey = function (key = 'index',desc = true) {
	return function (a, b) {
		var value1 = a[key];
		var value2 = b[key];
		if(desc==true){
			// 升序排列
			return value1 - value2;
		}else{
			// 降序排列
			return value2 - value1;
		}
	}
	
}


export default arraySortKey