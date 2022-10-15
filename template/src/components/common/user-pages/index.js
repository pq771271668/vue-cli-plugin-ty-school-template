import Vue from 'vue'
import userPages from './index.vue'

import store from "@/store"

let instances = [] //多个组件对象实例

function UserPages(data) {
	//判断data类型并初始化部分属性 相当于vue里面data属性
	data = Object.assign({}, {
		visible: false,
		title:'人员',
		params:{},
		props:{},
		onConfirm:null,
		value:[]
	}, data)
	// console.log(data);
	//通过Vue构造器，创建子类，然后实例化并进行挂载
	const UserPagesConstructor = Vue.extend(userPages) //此处可以使用JSX
	const instance= new UserPagesConstructor({
		data
	}) //此处的instance相当于vue的this
	
	//在挂载之前，先设置当前实例化对象显示
	instance.visible = true 
	instance.$store = store;
	
	//挂载
	instance.$mount()
	
	document.body.appendChild(instance.$el)
	
	instances = instance
}

export default UserPages