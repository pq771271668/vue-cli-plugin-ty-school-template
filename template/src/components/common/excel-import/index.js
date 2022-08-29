import Vue from 'vue'
import excelImport from './index.vue'

function ExcelImport(data) {
	//判断data类型并初始化部分属性 相当于vue里面data属性
	data = Object.assign({}, {
		visible: false,
		// 文件名
		name:'',
		// 文件下载地址
		download:{
			url:'',
		},
		// 文件上传地址，后台返回一个上传完整地址
		upload:{
			axiosName:''
		},
		// 文件导入接口信息
		import:{
			axiosName:'',
			data:{}
		},
		// 成功回调
		// onSuccess:null,
	}, data)
	// console.log(data);
	//通过Vue构造器，创建子类，然后实例化并进行挂载
	const excelImportConstructor = Vue.extend(excelImport) //此处可以使用JSX
	const instance= new excelImportConstructor({
		data
	}) //此处的instance相当于vue的this
	
	//在挂载之前，先设置当前实例化对象显示
	// instance.visible = true 
	
	//挂载
	instance.$mount()
}

// Vue.prototype.$excelImport = showImport
//暴露方法然后在main.js调用
// function registryImport () {
//     Vue.prototype.$excelImport = showImport
// }

export default ExcelImport
