/**
 * 分隔数字，每隔3位使用逗号进行分隔
 * @param {number} num
 * @return {string} 
 */
const toThousandFilter = function (num) {
	if (!num) {
		return '';
	}
	return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}
export default toThousandFilter