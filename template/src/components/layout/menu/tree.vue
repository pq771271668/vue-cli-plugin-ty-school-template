<template>
	<fragment>
		<el-menu-item
			v-for="(menu, index) in menus"
			:key="index"
			:index="menu.name"
			v-if="(!menu.children || (menu.name && menu.children && menu.children.length == 0)) && !menu.meta.hidden"
		>
			
			<template v-if="!_.isEmpty(menu.meta.image)">
				<template v-if="keyPath.indexOf(menu.name) == -1">
					<el-image :style="menu.meta.image.style" :src="require('@/'+menu.meta.image.normal)"></el-image>
				</template>
				<template v-else>
					<el-image :style="menu.meta.image.styleActive || menu.meta.image.style" :src="require('@/'+menu.meta.image.active)"></el-image>
				</template>
			</template>
			<template v-else-if="menu.meta.iconfont">
				<i class="item-icon iconfont" :class="menu.meta.icon"></i>
			</template>
			<template v-else-if="menu.meta.iconpark">
				<iconpark-icon :name="menu.meta.icon" width="18px" height="18px"></iconpark-icon>
			</template>
			<template v-else>
				<i class="item-icon"></i>
			</template>
		
			<span>{{ menu.meta.label }}</span>
		</el-menu-item>
		<el-submenu :index="menu.name" v-else-if="menu.name && menu.children && menu.children.length != 0 && !menu.meta.hidden">
			<template slot="title">
				
				<template v-if="!_.isEmpty(menu.meta.image)">
					<template v-if="keyPath.indexOf(menu.name) == -1">
						<el-image :style="menu.meta.image.style" :src="require('@/'+menu.meta.image.normal)"></el-image>
					</template>
					<template v-else>
						<el-image :style="menu.meta.image.styleActive || menu.meta.image.style" :src="require('@/'+menu.meta.image.active)"></el-image>
					</template>
				</template>
				<template v-else-if="menu.meta.iconfont">
					<i class="item-icon iconfont" :class="menu.meta.icon"></i>
				</template>
				<template v-else-if="menu.meta.iconpark">
					<iconpark-icon :name="menu.meta.icon" width="18px" height="18px"></iconpark-icon>
				</template>
				<template v-else>
					<i class="item-icon"></i>
				</template>
				
				<span>{{ menu.meta.label }}</span>
			</template>
			<menu-tree :menus="menu.children"></menu-tree>
		</el-submenu>
	</fragment>
</template>

<script>
export default {
	name: 'menu-tree',
	props: ['menus','keyPath'],
	data() {
		return {
		};
	},
	methods: {
	}
};
</script>

<style lang="scss" scoped>
	::v-deep .el-image {
		width: 18px;
		height: 18px;
	}
	.item-icon {
		width: 18px;
		height: 18px;
	}
</style>
