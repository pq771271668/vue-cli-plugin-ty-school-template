/* 
 {
	label:'',
	name:'', 
	children:[
		...同上，//其他的参数可以参考axios
		url:'',
		method:'',
		[baseURL]:'' //可选
	] 
	 
 }
 调用：$axios.parantName[childrenName] 或者 $axios.name
 */

// API中name值最好和router路由的name值一致
export default {
	label:'API接口',
	name:'common',
	children:[
		{
			label:'用户开发环境自动登录autoLogin获取ticket',
			name:'autoLogin',
			url:'/serv-platform/api/login/autoLogin',
			method:'get'
		},
		{
			label:'获取token和用户信息',
			name:'token',
			url:'/serv-platform/api/usersession/getAccessToken',
			method:'get'
		},
		{
			label:'获取学校教育属性的子列表 部门类型(3校区，5学段，6年级，7班级)',
			name:'listEduChild',
			url:'/serv-platform/rest/org/listEduChild',
			method:'post'
		},
		{
			label:'查询校区下的年级班级下拉{campusId}',
			name:'grade',
			url:'/serv-platform/rest/gradeClass',
			method:'get'
		},
		{
			label:'文件上传',
			name:'cosUploadFile',
			url:'/serv-platform/rest/cosUploadFile',
			method:'post'
		},
		{
			label:'登录人的孩子',
			name:'childrens',
			url:'/serv-platform/rest/childrens',
			method:'get'
		},
	]
}