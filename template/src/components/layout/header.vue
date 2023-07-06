<template>
	<div class="project-header">
		<div class="project-logo">
			<el-image fit="contain" :src="logo"></el-image>
			<p>{{$setting.title}}</p>
		</div>
		<slot></slot>
		<div class="user-prof">
			<el-avatar :src="USERINFO.avatarUrl"></el-avatar>
			<div class="name">
				你好，{{USERINFO.name}}
			</div>
			<template v-if="!$util.isMobile() && !$setting.hasAPP()">
				<el-divider direction="vertical"></el-divider>
				<el-dropdown>
					<span class="el-dropdown-link">
						<svg viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 20px;height: 20px;"><path data-follow-fill="#fff" d="M17.832 14.298a1.053 1.053 0 0 1-.974-1.453c.37-.903.558-1.86.558-2.845a1.053 1.053 0 1 1 2.107 0 9.56 9.56 0 0 1-.716 3.645c-.167.407-.56.653-.975.653Z" fill="#fff"/><path data-follow-fill="#fff" d="M9.916 19.607C4.619 19.607.309 15.297.309 10S4.62.393 9.916.393a9.577 9.577 0 0 1 8.891 5.963 1.053 1.053 0 0 1-1.95.8A7.477 7.477 0 0 0 9.917 2.5c-4.136 0-7.5 3.365-7.5 7.5 0 4.136 3.364 7.5 7.5 7.5 2.023 0 3.92-.793 5.34-2.234a1.053 1.053 0 1 1 1.5 1.48 9.537 9.537 0 0 1-6.84 2.86Z" fill="#fff"/><path data-follow-fill="#fff" d="M10.024 4.557a3.343 3.343 0 0 0-3.34 3.34h2.107a1.234 1.234 0 0 1 2.466-.001c0 .68-.553 1.233-1.233 1.233-.582 0-1.054.472-1.054 1.053v2.295h2.107v-1.411a3.345 3.345 0 0 0 2.286-3.17 3.343 3.343 0 0 0-3.34-3.339Zm0 8.795c-.582 0-1.054.471-1.054 1.053v.02a1.053 1.053 0 0 0 2.107 0v-.02c0-.582-.471-1.053-1.053-1.053Z" fill="#fff"/></svg>
						<!-- <iconpark-icon name="help" width="19px" height="19px" color="#fff"></iconpark-icon> -->
						<!-- 下拉菜单<i class="el-icon-arrow-down el-icon--right"></i> -->
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item v-for="item in items" :key="item.command" :command="item.command">
							<el-link :underline="false" :href="$setting.handlerURL" target="_blank">{{item.label}}</el-link>
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</template>
		</div>
	</div>
</template>

<script>
	export default {
		name:'project-header',
		data () {
			return {
				logo:require('@/assets/images/logo.png'),
				items:[
					/* {
						label:'更新说明',
						command:'update'
					}, */
					{
						label:'操作手册',
						command:'handler'
					},
					/* {
						label:'意见反馈',
						command:'feedback'
					} */
				]
			}
		},
		methods:{
			
		},
		created() {
		}
	}
</script>

<style lang="scss">
	.project-header {
		color: #FFFFFF;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.project-logo {
			display: flex;
			align-items: center;
			.el-image {
				height: 32px;
				// width: 32px;
			}
			p {
				font-size: 18px;
				margin-left: 14px;
				// color: #FFFFFF;
				font-weight: bold;
			}
		}
		.user-prof {
			display: flex;
			align-items: center;
			// color: #FFFFFF;
			.el-avatar {
				margin-right: 20px;
			}
			.name {
				
			}
			.el-divider {
				width: 2px;
				margin: 0 20px;
			}
		}
	}
</style>
