//阿拉伯数字转中文
const toCN = function(num) {
	const arr1 = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];

	const arr2 = [

		'',

		'十',

		'百',

		'千',

		'万',

		'十',

		'百',

		'千',

		'亿',

		'十',

		'百',

		'千',

		'万',

		'十',

		'百',

		'千',

		'亿'

	]; // 可继续追加更高位转换值

	if (!num) {
		return '零';

	}

	const splitNumberArr = num

		.toString()

		.split('')

		.reverse();

	let result = '';

	for (let i = 0; i < splitNumberArr.length; i++) {
		const index = splitNumberArr[i];

		result = arr1[index] + arr2[i] + result;

		// console.log('b.result', result);

	}

	// 将【零千、零百、零十】换成【零】 【十零】换成【十】

	result = result.replace(/零(千|百|十)/g, '零').replace(/十零/g, '十');

	// 将【零亿】换成【亿】【零万】换成【万】

	result = result.replace(/零亿/g, '亿').replace(/零万/g, '万');

	// 将【亿万】换成【亿】

	result = result.replace(/亿万/g, '亿');

	// 移除末尾的零

	result = result.replace(/零+$/, '');

	// 将【一十】换成【十】（一开头的两位数）

	result = result.replace(/^一十/g, '十');

	return result;

}

export default toCN
