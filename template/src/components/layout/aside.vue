<template>
	<div class="project-aside" :class="{'project-aside_simple':$setting.layout == 'simple'}">
		<template v-if="$setting.layout !== 'simple'">
			<el-scrollbar :native="false" class="page-component__scroll">
				<layout-menu-index v-on="$listeners" v-bind="$attrs"></layout-menu-index>
			</el-scrollbar>
		</template>
		<template v-else>
			<layout-menu-index v-on="$listeners" v-bind="$attrs"></layout-menu-index>
		</template>
	</div>
</template>

<script>
export default {
	name: 'project-aside',
	components: {
		'layout-menu-index': () => import('./menu/index.vue'),
	},
	inheritAttrs: false,
	data() {
		return {};
	},
	methods: {
	},
	mounted() {}
};
</script>

<style lang="scss">
.project-aside:not(.project-aside_simple) {
	height: 100%;
	.el-menu {
		border-right: none;
		%menu-item_active {
			background-color: $--color-primary-light;
			border-left: 3px solid $--color-primary;
		}
		%menu-item {
			border-left: 3px solid #FFFFFF;
			height: 48px;
			padding-left: 45px !important;
			display: flex;
			align-items: center;
			transition: all 0.8s;
			span {
				padding-left: 15px;
				font-size: 16px;
			}
			&:hover {
				@extend %menu-item_active;
			}
		}
		&.el-menu--collapse {
			%menu-item {
				padding-left: 20px !important;
				padding-right: 0;
			}
		}
		.el-submenu {
			.el-submenu__title {
				@extend %menu-item;
				span {
				}
				.el-icon-arrow-down{
					color: $--color-text-regular;
					&:before {
						content: "\e790";
					}
				}
			}
			&.is-active {
				.el-submenu__title {
					color: $--color-primary;
				}
			}
		}
		.el-menu-item {
			@extend %menu-item;
			&.is-active {
				@extend %menu-item_active;
			}
		}
	}
}
</style>
