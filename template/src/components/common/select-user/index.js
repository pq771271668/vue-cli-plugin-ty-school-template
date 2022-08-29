import Vue from 'vue'
import selectUser from './index.vue'

import store from "@/store"

let instances = [] //多个组件对象实例

function SelectUser(data) {
	//判断data类型并初始化部分属性 相当于vue里面data属性
	data = Object.assign({}, {
		visible: false,
		onConfirm:null,
		limit:null,
		checkedLists:[]
	}, data)
	// console.log(data);
	//通过Vue构造器，创建子类，然后实例化并进行挂载
	const SelectUserConstructor = Vue.extend(selectUser) //此处可以使用JSX
	const instance= new SelectUserConstructor({
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

// Vue.prototype.$selectUser = showSelectUser
/* //暴露方法然后在main.js调用
function registrySelectUser () {
    //把showSelectUser添加到vue的原型中实现直接调用；当调用时就执行函数的内容
    Vue.prototype.$selectUser = showSelectUser
}

export default registrySelectUser */
export default SelectUser