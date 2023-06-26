import Vue from 'vue'
import userTree from './index.vue'

import store from "@/store"

let instances = [] //多个组件对象实例

function UserTree(data) {
	//判断data类型并初始化部分属性 相当于vue里面data属性
	data = _.merge({}, {
		visible: false,
		title:'人员',
		treeAttributes:{  //继承el-tree的属性
			'node-key':'id', //必须设置
			props:{ //必须设置
				label:'name',
				id:'id', 
				isLeaf:'isLeaf'
			},
			'show-checkbox':true,
			'default-expand-all':true
		},
		onConfirm:null,
		onClose:null, //懒加载时候可以返回获取的数据data
		limit:null,
		selectUnit:'人',
		column:[
			{
				prop:'name',
				label:'Name'
			}
		]
	}, data)
	// console.log(data);
	//通过Vue构造器，创建子类，然后实例化并进行挂载
	const UserTreeConstructor = Vue.extend(userTree) //此处可以使用JSX
	const instance= new UserTreeConstructor({
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

export default UserTree
