<template>
	<keep-alive :include="KEEPALIVE">
		<router-view class="app-page"></router-view>
	</keep-alive>
</template>

<script>
export default {
	
}
</script>

<style lang="scss">
	.app-page {
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: $--bg-color-app;
	}
	.van-button-group {
		display: flex;
		.van-button {
			flex: 1;
			border: none;
			& + .van-button {
				margin-left: 10px;
			}
		}
	}
</style>
