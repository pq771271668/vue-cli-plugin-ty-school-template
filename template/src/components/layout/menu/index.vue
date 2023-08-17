<template>
	<el-menu
		:collapse="$setting.layout != 'simple' && COLLAPSE"
		:collapse-transition="false"
		:default-active="activeIndex" @select="handleSelect" unique-opened>
		<layout-menu-tree :menus="menus" v-if="menus" :keyPath="keyPath"></layout-menu-tree>
	</el-menu>
</template>

<script>
/* 
menu.json
{
	label:"菜单名称",
	name:"菜单router里的name值，用于跳转",
	icon: '菜单icon',
	limit: '菜单权限',
	children: [{菜单下级目录}],
}
*/

/* 
menu.json中的hidden是控制不在el-menu中显示 
router.js中的meta.hidden是控制浏览器URL进行跳转时不修改el-menu组件的activeIndex值即不修改el-menu的选中状态
 */

/* 
 v-if="menus"  ---- 错误页面返回时，刷新菜单不然菜单会没有
 
 */

import routerData from '@/router/data.js'

export default {
	name: 'menu-index',
	components:{
		'layout-menu-tree': () => import('./tree.vue')
	},
	inheritAttrs: false,
	data() {
		return {
			activeIndex: '',
			// menus: require('@/assets/resource/menu.json')
			menus: null,
			current:null,
			keyPath:[]
		};
	},
	methods: {
		handleSelect(index, keyPath) {
			// 这里手动设置了路由的跳转就不用el-menu组件中设置router="true"属性了
			// 直接使用router属性，如果路由中path带参数，之后在点击菜单跳转会出现跳转错乱问题
			if (index !== this.activeIndex) {
				// this.keyPath = keyPath
				this.$router.push({ name: index || 'error' })
			}
			if ( (_.isBoolean(this.current.meta.clickRefresh)  && this.current.meta.clickRefresh) || (!_.isBoolean(this.current.meta.clickRefresh ) && this.$setting.clickRefresh) ) {
				// console.log('clickRefresh')
				this.$bus.emit('click-refresh')
			}
		}
	},
	watch: {
		// 监控路由的变化，修改左边菜单栏的高亮选择
		$route: {
			handler: function(to, oldVal) {
				this.current = to
				if (!to.meta.hidden) {
					this.activeIndex = to.name;
				}
				else {
					this.activeIndex = to.meta.parent
				}
				
				this.keyPath = [to.name]
				to.meta.parent && this.keyPath.push(to.meta.parent)
				
			},
			// deep: true,
			immediate: true
		}
	},
	created() {
		routerData()
		.then( data => {
			this.menus = data
		})
	},
	mounted() {
	}
};
</script>

<style lang="scss">
</style>
