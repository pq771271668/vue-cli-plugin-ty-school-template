<template>
	<div class="project-error">
		<el-empty :image="image" description="页面找不到" :image-size="300">
			<el-button type="primary" @click="backIndex">返回首页</el-button>
			<el-button type="primary" @click="backPrev">返回上一页</el-button>
		</el-empty>
	</div>
</template>

<script>
	export default {
		name:'project-error',
		data () {
			return {
				image:require('@/assets/images/empty.png')
			}
		},
		methods:{
			backIndex () {
				this.$router.replace('/')
			},
			backPrev () {
				this.$router.back()
			}
		}
	}
</script>

<style lang="scss">
	.project-error {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
