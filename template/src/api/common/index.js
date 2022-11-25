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
	/* children:[
		{
			label:'',
			name:'',
			url:'',
			method:''
		}
	] */
}