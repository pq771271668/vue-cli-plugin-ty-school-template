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
		<div class="page-body" :style="bodyStyle" ref="pageBody" @mouseenter="mouseEnter">
			<template v-if="scroll">
				<el-scrollbar v-bind="$attrs" ref="scroll" class="page-component__scroll" :class="{'page-body-scroll-height':scrollFull}" >
					<slot></slot>
				</el-scrollbar>
			</template>
			<template v-else>
				<slot></slot>
			</template>
		</div>
		<div class="page-footer" v-if="footer" :style="footerStyle">
			<slot name="footer">
				<pagination-index v-bind="$attrs" v-on="$listeners">
					<slot name="pagination"></slot>
				</pagination-index>
			</slot>
		</div>
	</div>
</template>

/**
 *  'gap':header和body是否分开，默认false不分开
 
 *  'header':是否显示头部，默认true显示
 
 *  'header-style':头部样式，默认高度为70
 
 *  'header-border-style':头部下边框的样式，'full', 'none','default'，默认default
 
 *  'search':头部是否存在表单搜索，默认true
 
 *  'scroll':是否需要el-scroll，默认为true
 
 *  'scroll-full':scroll的高度是否为100%，默认为true
 
 *  'body-style':body样式，默认{}没有
 
 *  'footer':是否需要footer，默认为true
 
 *  'footer-style':footer的样式，默认{}没有
 
 *  'getBodyHeight()':获取滚动区域的高度
 
 *  'getScrollTop()':获取滚动条的top
 
 *  'setScrollTop(top)':设置滚动条的top
 
 *  'updateScroll()':scroll为true，更新滚动条
 
 * slot:default 、 header 、 pagination
 */

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
            default:'default',
            validator: function (value) {
                return ['full', 'none','default'].includes(value)
            }
        },
        'search':{
            type:Boolean,
            default:true
        },
        'scroll':{
            type:Boolean,
            default:true
        },
        'scroll-full':{
            type:Boolean,
            default:true
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
        // 获取滚动区域的高度
        getBodyHeight () {
            const pageBody = this.$refs.pageBody
            const height = this.$refs.pageBody.clientHeight
            const paddingTop = getComputedStyle(pageBody).paddingTop.replace(/\s+|px/gi,"")
            const paddingBottom = getComputedStyle(pageBody).paddingBottom.replace(/\s+|px/gi,"")
            return height - Number(paddingTop) - Number(paddingBottom)
        },
        // 获取滚动条的高度
        getScrollTop () {
            return this.$refs.scroll.moveY * this.getBodyHeight() / 100
        },
        // 设置滚动条的高度
        setScrollTop (top) {
            this.$refs.scroll.wrap.scrollTop = top || 0
        },
        updateScroll () {
            setTimeout(()=> {
                //解决滚动条初始化消失的问题
                if (this.scroll && this.$refs.scroll) {
                    this.$refs.scroll.update()
                }
            },0)
        },
        mouseEnter () {
            if (this.scroll) {
                this.updateScroll()
            }
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
			&.page-header_search {
				.el-form--inline {
					margin-top: -5px;
					margin-bottom: -5px;
					.el-form-item {
						margin-bottom: 5px;
						margin-top: 5px;
						margin-right: 0;
						padding-right: 20px;
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
		&.page-container_gap {
			background-color: transparent;
			& > .page-header {
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
		.page-header_border-default {
			&.page-header {
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
			}
		}
		.page-header_border-full {
			@extend .page-header_border-default;
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
		.page-body {
			padding:20px;
			flex: 1 0 0;
			overflow: hidden;
		}
		.page-footer {
			flex-shrink: 0;
			padding-bottom: 20px;
		}
	}
</style>
