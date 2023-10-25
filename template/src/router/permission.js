import store from '@/store'

/* 
isAppAdmin:教师是否是管理员，true:可以有所有菜单权限，false:lastUserType == 1 || 3普通教师

用户类型 0:学生，1:老师，2:家长，3:工作人员，4:机构人员，5:企业人员，12:市民
 */

/* 尽量使用数组返回 */
/* 可以使用provide/inject依赖注入方便之后使用 */

const permission = function () {
	const USERINFO = store.state.USERINFO
	let role = []
	
	/* admin管理员  teacher普通教师 student学生、家长*/
	if (USERINFO.isAppAdmin && (USERINFO.lastUserType == 1 || USERINFO.lastUserType == 3)) {
		role.push('admin')
	}
	else if (!USERINFO.isAppAdmin && (USERINFO.lastUserType == 1 || USERINFO.lastUserType == 3)) {
		role.push('teacher')
	}
	else if (USERINFO.lastUserType == 0) {
		role.push('student')
	}
	else if (USERINFO.lastUserType == 2) {
		role.push('parent')
	}
	
	return role
}


export default permission
