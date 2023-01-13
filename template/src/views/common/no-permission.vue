<template>
	<div class="no-permission">
		<el-empty :image="image" description="您暂时没有权限,请联系管理员" :image-size="300"></el-empty>
	</div>
</template>

<script>
	export default {
		name:'no-permission',
		data () {
			return {
				image:require('@/assets/images/empty.png')
			}
		},
		methods:{}
	}
</script>

<style lang="scss">
	.no-permission {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
