<template>
	<div class="project-aside">
		<el-scrollbar :native="false" class="page-component__scroll">
			<layout-menu-index v-on="$listeners" v-bind="$attrs"></layout-menu-index>
		</el-scrollbar>
	</div>
</template>

<script>
export default {
	name: 'project-aside',
	components: {
		'layout-menu-index': () => import('@/components/layout/menu/index.vue'),
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
.project-aside {
	height: 100%;
	/* .aside-menus {
		height: 100%;
	} */
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
			// justify-content: space-between;
			transition: all 0.8s;
			span {
				padding-left: 25px;
				font-size: 16px;
			}
			&:hover {
				@extend %menu-item_active;
			}
		}
		.el-submenu {
			.el-submenu__title {
				@extend %menu-item;
				span {
					// font-weight: bold;
				}
				.el-icon-arrow-down{
					color: $--color-text-regular;
					&:before {
						content: "\e790";
					}
				}
			}
			/* .el-submenu__icon-arrow {
				display: none;
			} */
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
