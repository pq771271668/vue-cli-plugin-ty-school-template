/* 身份证获取生日和性别 */
import birthSex from '@/assets/js/util/birthSex.js'

/* 获取文件后缀名 */
import ext from '@/assets/js/util/ext.js'

import queryParams from '@/assets/js/util/queryParams.js'
import getUrlParams from '@/assets/js/util/getUrlParams.js'

/* 随机数 */
import random from '@/assets/js/util/random.js'

/* 校验 */
import test from '@/assets/js/util/test.js'

/* 时间格式化 */
import timeFormat from '@/assets/js/util/timeFormat.js'


/* 去除空格 */
import trim from '@/assets/js/util/trim.js'

/* 两个对象数组 根据相同的[key=id]进行合并 */
import combined from '@/assets/js/util/combined.js'

/* 数组对象根据key[默认：'index']值排序 */
import arraySortKey from '@/assets/js/util/arraySortKey.js'

/* 实现对象数组的扁平化处理 */
import flatArray from '@/assets/js/util/flatArray.js'
import flatArrayDeep from '@/assets/js/util/flatArrayDeep.js'

/* xhr */
import xhr from '@/assets/js/util/xhr.js'

/* 阿拉伯数字转中文 */
import numberfilter from '@/assets/js/util/numberfilter.js'

/* 判断是否是移动端 */
import isMobile from '@/assets/js/util/isMobile.js'

const util = {
	birthSex,
	ext,
	queryParams,
	getUrlParams,
	random,
	test,
	timeFormat,
	trim,
	combined,
	arraySortKey,
	flatArray,
	flatArrayDeep,
	xhr,
	numberfilter,
	isMobile
}

export default util