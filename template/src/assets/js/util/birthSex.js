//根据身份证取 生日，性别
const birthSex = function(value) {
	let sex = ''
	let birth = ''
	if (value.length == 18) {          
		sex = value.slice(16, 17) % 2 ? "1" : "2";
		const year = value.substring(6, 10);
		const month = value.substring(10, 12);
		const date = value.substring(12, 14);
		birth = new Date(year + "-" + month + "-" + date);
	} else if (value.length == 15) {
		sex = value.slice(14, 15) % 2 ? "1" : "2";
		const year = "19" + value.substring(6, 8);
		const month = value.substring(8, 10);
		const date = value.substring(10, 12);
		birth = new Date(year + "-" + month + "-" + date);
	}
	
	return {
		sex:sex,
		birth:birth
	}
	
}

export default birthSex