import store from '@/store'

/* 
isAppAdmin:教师是否是管理员，true:可以有所有菜单权限，false:userType == 1 || 3普通教师

用户类型 0:学生，1:老师，2:家长，3:工作人员，4:机构人员，5:企业人员，12:市民
 */
const permission = function () {
	const USERROLE = store.state.USERINFO.USERROLE
	let role = ''
	
	/* admin管理员  teacher普通教师 student学生、家长*/
	if (USERROLE.isAppAdmin && (USERROLE.userType == 1 || USERROLE.userType == 3)) {
		role = 'admin'
	}
	else if (!USERROLE.isAppAdmin && (USERROLE.userType == 1 || USERROLE.userType == 3)) {
		role = 'teacher'
	}
	else if ([0,2].includes(USERROLE.userType)) {
		role = 'student'
	}
	
	return role
}


export default permission
