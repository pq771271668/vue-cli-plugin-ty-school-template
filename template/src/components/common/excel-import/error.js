import Vue from 'vue'
import error from './error.vue'

function Error(data) {
	//判断data类型并初始化部分属性 相当于vue里面data属性
	data = Object.assign({}, {
		visible: true,
		alertParams:{
		},
		refresh:null,
		tableData:[],
		confirm:null
	}, data)
	// console.log(data);
	//通过Vue构造器，创建子类，然后实例化并进行挂载
	const ErrorConstructor = Vue.extend(error) //此处可以使用JSX
	const instance= new ErrorConstructor({
		data
	}) //此处的instance相当于vue的this
	
	//在挂载之前，先设置当前实例化对象显示
	// instance.visible = true 
	
	//挂载
	instance.$mount()
}

// Vue.prototype.$error = showError
/* //暴露方法然后在main.js调用
function registryError () {
    //把showError添加到vue的原型中实现直接调用；当调用时就执行函数的内容
    Vue.prototype.$error = showError
}

export default registryError */
export default Error
