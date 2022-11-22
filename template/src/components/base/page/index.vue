<template>
	<div class="page-container" 
		:class="{'page-container_gap':gap}">
		<div 
			v-if="header"
			class="page-header" 
			:class="[headerBorderStyle ? 'page-header_border-'+headerBorderStyle : '']" 
			:style="headerStyle">
			<slot name="header">
				
			</slot>
		</div>
		<div class="page-body" :style="bodyStyle">
			<el-scrollbar :native="native" class="page-component__scroll" :class="{'page-body-scroll-height':scrollFull}" ref="myScrollbar">
				<slot></slot>
			</el-scrollbar>
		</div>
	</div>
</template>

<!-- 
 
 'gap':header和body是否分开，默认不分开
 
 'header':是否显示头部，默认显示
 
 'header-style':头部样式，默认高度为70
 
 'header-border-style':头部下边框的样式，默认没有
 
 'scroll-full':scroll的高度是否为100%，默认为true
 
 'native':是否使用原生滚动条，默认为false
 
 'body-style':body样式，默认没有
 
 -->
<script>
	export default {
		inheritAttrs:false,
		name:'page-container',
		props:{
			full:{
				type:Boolean,
				default:true
			},
			gap:{
				type:Boolean,
				default:false
			},
			'header':{
				type:Boolean,
				default:true
			},
			'header-style':{
				type:Object,
				default: function () {
					return {
						'height':'70px'
					}
				}
			},
			'header-border-style':{
				type:String,
				default:'',
				validator: function (value) {
					return ['full', 'none',''].includes(value)
				}
			},
			'scroll-full':{
				type:Boolean,
				default:true
			},
			'native':{
				type:Boolean,
				default:false
			},
			'body-style':{
				type:Object,
				default: function () {
					return {}
				}
			},
		},
		data () {
			return {
			}
		},
		methods:{
		}
	}
</script>

<style lang="scss">
	.page-container {
		display: flex;
		flex-direction: column;
		@extend %box-style;
		.page-header {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 20px;
			margin-bottom: 10px;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				left: 20px;
				right: 20px;
				bottom: 0;
				height: 1px;
				background-color: $--border-color-base;
				transform: scaleY(0.5);
			}
			.el-form {
				.el-form-item {
					margin-bottom: 0;
				}
			}
		}
		.page-body {
			padding:10px 20px 20px;
			flex: 1 0 0;
			overflow: hidden;
		}
		&.page-container_gap {
			background-color: transparent;
			.page-header {
				@extend %box-style;
				&:after {
					display: none;
				}
			}
			.page-body {
				@extend %box-style;
				padding-top: 20px;
			}
		}
		.page-header_border-full {
			&.page-header {
				&:after {
					left: 0;
					right: 0;
				}
			}
		}
		.page-header_border-none {
			&.page-header {
				margin-bottom:0;
				&:after {
					display: none;
				}
			}
			& + .page-body {
				padding-top: 0;
			}
		}
		.page-body-scroll-height {
			.el-scrollbar__view {
				height: 100%;
			}
		}
	}
</style>
