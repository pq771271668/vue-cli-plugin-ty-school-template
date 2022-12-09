<!-- 

继承el-pagination属性，同时需要开启page-size和current-page的sync

新增:
pages页数，可传[Boolean,Number,String]

top:顶部的margin-top值，默认为15px

model:[Boolean,String] [false,'normal' | 'single']

height: 高度默认为38px
 
合并 @sizeChange和@currentChange 为@on-pagination

 -->
 
<template>
	<div class="pagination-index" :style="{'margin-top':top,'--height':height}" :class="[paginationClass]">
		<el-pagination
			
			v-bind="attrs"
			v-on="$listeners"
			@size-change="sizeChange"
			@current-change="currentChange" 
			>
			<slot>
				<template v-if="model =='normal' && pages !== false">
					<span class="el-pagination__total m-l-10 m-r-0">
						共{{pages}}页，
					</span>
				</template>
				
				<template v-else-if="model =='single'">
					<span class="pagination-index_single-current-page">
						{{attrs.currentPage}}
					</span>
				</template>
				
			</slot>
		</el-pagination>
	</div>
</template>

<script>
export default {
    inheritAttrs:false,
    name:'pagination-index',
	computed:{
		'attrs' () {
			
			let prop = {}
			
			if (typeof this.model == 'string') {
				if (this.model == 'normal') {
					prop = {
						layout: 'total, sizes, prev, pager, next,slot, jumper',
						background: true
					}
					
				}
				else if (this.model == 'single') {
					prop = {
						layout: 'total, prev, slot, next,sizes, jumper',
						background: false
					}
				}
			}
			
			return Object.assign({},prop,this.$attrs)
		},
		'paginationClass' () {
			return this.model ? 'pagination-index_'+this.model : ''
		}
	},
    props:{
        'pages':{
            type:[Boolean,Number,String],
            default:0,
            required:true
        },
        'top':{
            type:String,
            default:'15px'
        },
		model:{
			type:[Boolean,String],
			default:'normal',
			validator:function (value) {
				return !value || ( typeof value == 'string' && ['normal','single'].includes(value))
			}
		},
		'height':{
			type:String,
			default:'38px'
		}
    },
    data () {
        return {
        }
    },
    methods:{
        sizeChange () {
            this.$emit('on-pagination')
        },
        currentChange () {
            this.$emit('on-pagination')
        }, 	
    }
}
</script>

<style lang="scss">
	.pagination-index {
		$--pagination-button-height:var(--height) !default;
		%pagination-height {
			height: $--pagination-button-height;
			line-height: $--pagination-button-height;
			min-width: $--pagination-button-height;
		}
		.el-pagination {
			&.is-background {
				.btn-prev,.btn-next {
					padding: 0 10px;
				}
			}	
		}
		&[class*="pagination-index_"] {
			.btn-next ,.btn-prev{
				width: 85px;
			}
			.el-pager li ,.el-input .el-input__inner,.btn-prev,.btn-next,.btn-prev span,.btn-next span,.el-pagination__total,.pagination-index_single-current-page{
				@extend %pagination-height; 
			}
		}
		&.pagination-index_normal {
			.el-pagination {
				&.is-background {
					.btn-prev,.btn-next {
						border: 1px solid $--border-color-base;
					}
					.el-pager {
						li {
							border: 1px solid $--border-color-base;
							&:not(.disabled).active {
								border-color: $--color-primary;
							}
							&.more {
								background-color: transparent;
								border: none;
								line-height: $--pagination-button-height;
							}
						}
					}
				}
			}
		}
		&.pagination-index_single {
			.el-pagination {
				.btn-prev,.btn-next {
					margin: 0;
					border: 1px solid $--border-color-base;
				}
				.btn-prev {
					border-right: none;
					border-top-left-radius: 4px;
					border-bottom-left-radius: 4px;
				}
				.btn-next {
					border-left: none;
					border-top-right-radius: 4px;
					border-bottom-right-radius: 4px;
				}
				.pagination-index_single-current-page {
					background-color: $--color-primary;
					color: #fff;
				}
				.el-pagination__jump {
					margin-left: 0;
				}
			}
		}
	}
</style>
