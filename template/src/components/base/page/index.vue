<!-- 页面级别组件 search、table、pagination -->
<template>
	<div class="page-container" 
		:class="{'page-container_gap':gap}">
		<div 
			v-if="header"
			class="page-header" 
			:class="[{'page-header_search':search},headerBorderStyle ? 'page-header_border-'+headerBorderStyle : '']"
			:style="headerStyle">
			<slot name="header"></slot>
		</div>
		<div class="page-body" :style="bodyStyle">
			<el-scrollbar :native="native" class="page-component__scroll" :class="{'page-body-scroll-height':scrollFull}" ref="myScrollbar">
				<slot></slot>
			</el-scrollbar>
		</div>
		<div class="page-footer" v-if="footer" :style="footerStyle">
			<slot name="footer">
				<pagination-index v-bind="$attrs" v-on="$listeners"></pagination-index>
			</slot>
		</div>
	</div>
</template>
 
 'gap':header和body是否分开，默认不分开
 
 'header':是否显示头部，默认显示
 
 'header-style':头部样式，默认高度为70
 
 'header-border-style':头部下边框的样式，默认没有
 
 'search':头部是否为表单搜索，默认true
 
 'scroll-full':scroll的高度是否为100%，默认为true
 
 'native':是否使用原生滚动条，默认为false
 
 'body-style':body样式，默认没有
 
 'footer':是否需要footer，默认为true
 
 'footer-style':footer的样式
 
 'getScrollHieght()':获取滚动条的高度
 
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
                    'min-height':'70px'
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
        'search':{
            type:Boolean,
            default:true
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
		'footer':{
			type:Boolean,
			default:true
		},
		'footer-style':{
			type:Object,
			default: function () {
			    return {}
			}
		}
    },
    data () {
        return {
        }
    },
    methods:{
		getScrollHieght () {
			return this.$refs.myScrollbar.$el.offsetHeight
		}
    },
	mounted() {
	}
}
</script>

<style lang="scss">
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		@extend %box-style;
		.page-header {
			flex-shrink: 0;
			padding: 20px;
			// margin-bottom: 10px;
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
			&.page-header_search {
				.el-form--inline {
					margin-top: -5px;
					margin-bottom: -5px;
					.el-form-item {
						margin-bottom: 5px;
						margin-top: 5px;
						margin-right: 0;
						padding-right: 5px;
						display: inline-flex;
						.el-form-item__label {
							width: 100px;
						}
						.el-form-item__content {
							flex: 1 0 0;
						}
					}
				}
			}
		}
		.page-body {
			padding:20px;
			flex: 1 0 0;
			overflow: hidden;
		}
		&.page-container_gap {
			background-color: transparent;
			.page-header {
				@extend %box-style;
				margin-bottom: 10px;
				&:after {
					display: none;
				}
			}
			.page-body,.page-footer {
				@extend %box-style;
			}
			.page-body + .page-footer {
				margin-top: -4px;
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
		.page-footer {
			padding-bottom: 20px;
		}
	}
</style>
