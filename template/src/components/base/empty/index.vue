<template>
	<div class="page-empty">
		<el-image :src="url"></el-image>
		<p class="text" v-if="text">{{text}}</p>
		<el-button type="primary" v-show="btnShow" @click="onBtn" size="medium">{{btnText}}</el-button>
	</div>
</template>

<script>
	export default {
		name:'page-empty',
		props:{
			text:{
				type:[String,Boolean],
				default:'~~暂无数据~~'
			},
			btnShow:{
				type:Boolean,
				default:false
			},
			btnText:{
				type:String,
				default:'按钮'
			}
		},
		data () {
			return {
				url:require('@/assets/images/empty.png')
			}
		},
		methods:{
			onBtn () {
				this.$emit('onBtn')
			}
		}
	}
</script>

<style lang="scss">
	.page-empty {
		@extend %box-style;
		width: 100%;
		height: 100%;
		/* border-radius:4px;
		background-color:#fff; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		.text {
			font-size: 17px;
			color: $--color-text-regular;
			// padding: 30px 0px;
			margin-top: 30px;
		}
		.el-button {
			margin-top: 30px;
		}
	}
</style>
