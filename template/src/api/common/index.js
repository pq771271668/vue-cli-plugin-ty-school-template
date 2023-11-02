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
			method:'post',
			/* 
			params: {
			    platformCode: this.USERINFO.platformCode,
			},
			data:{
			    orgId:this.USERINFO.lastTopOrgId,
			    orgType,
			    parentId
			} 
			*/
		},
		{
			label:'查询校区下的年级班级下拉',
			name:'gradeClass',
			url:'/serv-platform/rest/gradeClass',
			method:'get',
			/* 
			params:{
				campusId
			}
			*/
		},
		{
			label:'校区，班级下成员',
			name:'listSchoolUser',
			url:'/serv-platform/rest/org/listSchoolUser',
			method:'post',
			/* 
			params: {
				platformCode: this.USERINFO.platformCode,
			},
			data: {
				name,
				studentType, //学生类别(0:未知, 1:走读生, 2:住校生)，多个用”,”分割）
				topOrgId: this.USERINFO.lastTopOrgId,
				orgId,
				orgRecursion, //1 包含所有下级部门成员 0 不包含下级部门成员 默认为0
				topSchoolId,
				userType, //用户类型，学生:0 教师:1（支持复合值，用半角逗号分隔，例如：0,1）不支持家长类型，当只传入机构或学校编号，未设置用户类型时，默认查部门成员类型| 
				page,
				limit
			} 
			*/
		},
		
		
		{
			label:'文件上传',
			name:'cosUploadFile',
			url:'/serv-platform/rest/cosUploadFile',
			method:'post'
		},
		
		{
			label:'获取教师',
			name:'listTeacherTree',
			url:'/serv-platform/rest/org/listTeacherTree',
			method:'get',
			/* 
			params: {
			    platformCode: this.USERINFO.platformCode,
			    orgId: this.USERINFO.lastTopOrgId,
			} 
			*/
		},{
			label:'登录教师的班级',
			name:'userClass',
			url:'/serv-platform/rest/user/classs',
			method:'get',
			/*  */
		},
		
		{
			label:'查询部门树',
			name:'listDeptTree',
			url:'/serv-platform/rest/org/listDeptTree',
			method:'get',
			/* 
			params:{
			    platformCode:this.USERINFO.platformCode,
			    orgId:this.USERINFO.lastTopOrgId,
			} 
			*/
		},
		{
			label:'部门下成员列表',
			name:'listDeptUser',
			url:'/serv-platform/rest/org/listDeptUser',
			method:'post',
			/* 
			{
			    page,
			    limit,
			    topOrgId: this.USERINFO.lastTopOrgId,
			    orgId,
			    orgRecursion, //1 包含所有下级部门成员 0 不包含下级部门成员 默认为0
			} 
			*/
		},
		{
			label:'获取组织成员详细列表',
			name:'getNoPrivacyOrgMemberList',
			url:'/serv-platform/rest/org/getNoPrivacyOrgMemberList',
			method:'post'
		},
		
		{
			label:'登录人的孩子',
			name:'childrens',
			url:'/serv-platform/rest/childrens',
			method:'get',
			/*  */
		},
		
		
	]
}