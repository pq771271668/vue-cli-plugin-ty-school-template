module.exports = [
	{
		name: 'ProjectName',
		type: 'input',
		message: '请输入中文项目名：',
		validate:function (value) {
			if (!value) {
				return '请输入项目名' 
			}
			else {
				return true
			}
		}
	},
	{
	    name: 'FitMobile',
	    type: 'confirm',
	    message: '是否需要适配移动端（Vant2）?',
	    default: false
	}
]
