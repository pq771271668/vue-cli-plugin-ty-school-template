/**
 * @desc 基于ElementUI Form rules 进行使用, 参考官方文档: http://element-cn.eleme.io/#/zh-CN/component/form [自定义校验规则]
 * @example  rules: {
 *  ip: [
 *    {required: true, message: '请输入矩阵IP', trigger: 'blur'},
 *    {validator: this.$validator.ipAddress, trigger: 'blur'}
 *  ]
 * }
 *
 
 */
const validator = {

	/**
	 * 校验 包括中文字、英文字母、数字和下划线
	 * 登录账号校验
	 */
	validateAccount(rule, value, callback) {
		let acount = /^(?!_)(?!.*?_$)[a-zA-Z0-9_\u4e00-\u9fa5]+$/
		if (value && (!(acount).test(value))) {
			callback(new Error('输入不符合规范'))
		} else {
			callback()
		}
	},

	/**
	 * IP地址校验
	 */
	ipAddress(rule, value, callback) {
		if (value && "..." === value) {
			callback(new Error('请输入IP地址'))
		}
		if (value && !(/((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))/).test(value)) {
			callback(new Error('IP地址不符合规范'))
		} else {
			callback()
		}
	},

	/**
	 * 手机号码校验
	 */
	phoneNumber(rule, value, callback) {
	  if (value && (!(/^1[0-9]{10}$/).test(value) || !(/^[1-9]\d*$/).test(value) || value.length !== 11)) {
	    callback(new Error('手机号码不符合规范'))
	  } else {
	    callback()
	  }
	},
	
	/**
	 * 电话号码校验
	 */
	telephoneNumber(rule, value, callback) {
	  if (value && (!(/^((0\d{2,3}-\d{7,8})|(^1[0-9]{10}))$/).test(value))) {
	    callback(new Error('电话号码不符合规范'))
	  } else {
	    callback()
	  }
	},

	/**
	 * 邮箱校验
	 */
	emailValue(rule, value, callback) {
		let temp = /^[\w.\-]+@(?:[a-z0-9]+(?:-[a-z0-9]+)*\.)+[a-z]{2,3}$/
		let tempOne = /^[A-Za-zd]+([-_.][A-Za-zd]+)*@([A-Za-zd]+[-.])+[A-Za-zd]{2,5}$/
		if (value && (!(temp).test(value))) {
			callback(new Error('邮箱格式不符合规范'))
		} else {
			callback()
		}
	},

	/**
	 * 身份证号码校验
	 */
	idCard(rule, value, callback) {
		
		/* if (value) {
			const arrVerifyCode = [1, 0, "x", 9, 8, 7, 6, 5, 4, 3, 2];
			const Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
			const Checker = [1, 9, 8, 7, 6, 5, 4, 3, 2, 1, 1];
			
			if (value.length != 18 && value.length != 15) {
				callback(new Error("身份证号长度错误！"));
			}else if (value.length == 18) {
				let Ai = value.length == 18 ? value.substring(0, 17) : value.slice(0, 6) + "19" + value.slice(6, 16);
				if (!/^\d+$/.test(Ai)) {
					callback(new Error("身份证除最后一位外，必须为数字！"));
				}
				const yyyy = Ai.slice(6, 10),
					mm = Ai.slice(10, 12) - 1,
					dd = Ai.slice(12, 14);
				const d = new Date(yyyy, mm, dd),
					year = d.getFullYear(),
					mon = d.getMonth(),
					day = d.getDate(),
					now = new Date();
				if (year != yyyy || mon != mm || day != dd || d > now || now.getFullYear() - year > 140) {
					callback(new Error("身份证出生年月日输入错误！"));
				}
				for (var i = 0, ret = 0; i < 17; i++) ret += Ai.charAt(i) * Wi[i];
				Ai += arrVerifyCode[ret %= 11];
				if (value.toLowerCase() != Ai) {
					callback(new Error("身份证最后一位校验码输入错误！"));
				} else {
					return Ai;
				}
			}else if (value.length == 15) {
				const regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!regIdNo.test(value)) {
					callback(new Error('请输入15位或18位身份证号或香港身份证号！'));
				}
			}
			
		}else {
			callback()
		} */
		if (value && (!(/\d{17}[\d|x]|\d{15}/).test(value) || (value.length !== 15 && value.length !== 18))) {
		  callback(new Error('身份证号码不符合规范'))
		} else {
		  callback()
		}
	},

	/**
	 * 正整数校验
	 */
	integerP(rule, value, callback) {
		if (value && !(/^[1-9]\d*$/).test(value)) {
			callback(new Error('只能填写正整数'))
		} else {
			callback()
		}
	},
	
	/**
	 * 验证整数
	 */
	digits(rule, value, callback) {
		if (value && !(/^\d+$/).test(value)) {
			callback(new Error('只能填写整数'))
		} else {
			callback()
		}
	},
	
	/**
	 * 负整数校验
	 */
	integerN(rule, value, callback) {
		if (value && !(/^-[1-9]\d*$/).test(value)) {
			callback(new Error('只能填写负整数'))
		} else {
			callback()
		}
	},

	/**
	 * 英文字符校验
	 */
	enText(rule, value, callback) {
		// let a = '',
		//   arr = value.split(" ")
		// for (let i = 0; i < arr.length; i++) { //删除行内空格
		//   a += arr[i];
		// }
		if (value && !(/^[A-Za-z]+$/).test(value)) {
			callback(new Error('只能填写英文字符'))
		} else {
			callback()
		}
	},
	/**
	 * 中文字符英文字符校验
	 */
	ChEnText(rule, value, callback) {
		if (value && !(/^[A-Za-z0-9]+$/).test(value)) {
			callback(new Error('只能填写数字和英文字符'))
		} else {
			callback()
		}
	},
	/**
	 * 中文字符校验
	 */
	cnText(rule, value, callback) {
		// let a = '',
		//   arr = value.split(" ")
		// for (let i = 0; i < arr.length; i++) { //删除行内空格
		//   a += arr[i];
		// }
		if (value && (/[^\u4e00-\u9fa5]/).test(value)) {
			callback(new Error('只能填写中文字符'))
		} else {
			callback()
		}
	},
	/**
	 * 只能输入英文或者数字
	 */
	enOrnunText(rule, value, callback) {
		if (value && !(/^[A-Za-z0-9]+$/).test(value)) {
			callback(new Error('只能填写英文或者数字'))
		} else {
			callback()
		}
	},
	/**
	 * 20位数字国标编码校验，且为正整数
	 */
	validateDeviceNo(rule, value, callback) {
		if (value && !(/^[1-9]\d*$/).test(value)) {
			callback(new Error('只能填写正整数'))
		} else {
			if (!/^[0-9]{20}$/.test(value)) {
				callback(new Error('请输入20位数字的编码！'));
			} else {
				callback();
			}
		}
	},
	/**
	 *校验电脑Mac地址
	 *以xx-xx-xx-xx-xx-xx的形式输入（xx为16进制数字）
	 */
	validateMac(rule, value, callback) {
		let temp = /[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}-[A-Fa-f0-9]{2}/;
		if (!temp.test(value)) {
			callback(new Error('请输入xx-xx-xx-xx-xx-xx形式的MAC地址！'));
		} else {
			callback();
		}
	},
	/**
	 * 校验地址代码或者分组代码
	 */
	validateCode(rule, value, callback) {
		let num = /^[1-9]\d*$/
		if (value && !(num).test(value)) {
			callback(new Error('只能填写正整数'))
		} else {
			let codeLen = value.toString().length
			console.log(codeLen)
			if (codeLen > 0 && codeLen % 3 !== 0) {
				callback(new Error('输入的长度必须是3的倍数'))
			} else if (codeLen > 18) {
				callback(new Error('输入的长度不能超过18位,请重新输入'))
			} else {
				callback()
			}
		}
	},

	/**
	 * 校验字符长度
	 */
	validateLength(rule, value, callback) {
		let codeLen = value.toString().length
		if (codeLen > 18) {
			callback(new Error('输入的长度不能超过20位,请重新输入'))
		}
	},

	/**
	 * 数字 ,两位
	 */
	validateTwoNum(rule, value, callback) {
		let temp = /^[1-9]{2}$/;
		if (!temp.test(value)) {
			callback(new Error('请输入两位正整数！'));
		} else {
			callback();
		}
	},

	/**
	 * 校验经度是否符合规范
	 * 
	 */
	checkLongitude(rule, value, callback) {
		let longrg = /^(\-|\+)?(((\d|[1-9]\d|1[0-7]\d|0{1,3})\.\d{0,6})|(\d|[1-9]\d|1[0-7]\d|0{1,3})|180\.0{0,6}|180)$/;
		if (!longrg.test(value)) {
			callback(new Error('经度整数部分为0-180,小数部分为0到6位!'));
		} else {
			callback();
		}
	},

	/**
	 * 校验纬度是否符合规范
	 * 
	 */
	checkLatitude(rule, value, callback) {
		let latreg = /^(\-|\+)?([0-8]?\d{1}\.\d{0,6}|90\.0{0,6}|[0-8]?\d{1}|90)$/;
		if (!latreg.test(value)) {
			callback(new Error('纬度整数部分为0-90,小数部分为0到6位!'));
		} else {
			callback();
		}
	}
}


export default validator
