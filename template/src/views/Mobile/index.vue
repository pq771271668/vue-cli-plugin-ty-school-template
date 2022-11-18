<template>
	<router-view class="app-page"></router-view>
</template>

<script>
	// const VConsole = require('@/assets/js/vconsole');
	export default {
		beforeDestroy() {
			this.$vuex('appWeeklyDetail',{})
		}
	}
</script>

<style lang="scss">
	/* @media screen  and (max-width:1200px){
		html,body {
			min-width: auto;
			// overflow: auto;
		}
	} */
	.app-page {
		width: 100%;
		height: 100%;
		overflow: auto;
		background-color: $--bg-color-app;
	}
	.weekly-page_icon-fixed {
		position: fixed;
		// z-index: 1;
		right: 10px;
		bottom: 35px;
		width: 54px;
		height: 54px;
		border-radius: 50%;
		background-color: $--color-primary;
		// box-shadow: 0 0 10px 0px $--color-primary;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30px;
		color: #FFFFFF;
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
