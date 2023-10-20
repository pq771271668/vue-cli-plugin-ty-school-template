import Vue from 'vue'
import excelImport from './index.vue'

function ExcelImport(data) {
	//判断data类型并初始化部分属性 相当于vue里面data属性
	data = Object.assign({}, {
		visible: false,
		message:`<p>1.下载导入模板，批量填写信息 。</p>
		<p>2.上传填好的信息表。</p>
		<p>3.导入时间，与你导入的内容量有关，请耐心等待。</p>
		<p>4.若导入失败，请根据错误原因修改后重新上传。</p>`,
		// 文件下载地址
		download:{
		},
		// upload参数
		upload:{
		},
		// 成功回调
		onSuccess:null,
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
