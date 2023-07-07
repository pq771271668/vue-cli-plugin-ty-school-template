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
		name: 'Layout',
		type: 'list',
		message: '请选择项目布局：',
		default:'normal',
		choices:[
			{
				name:"normal（默认）",
				value:"normal"
			},
			{
				name:"simple",
				value:"simple"
			},
			{
				name:"narrow",
				value:"narrow"
			}
		]
	}
]
