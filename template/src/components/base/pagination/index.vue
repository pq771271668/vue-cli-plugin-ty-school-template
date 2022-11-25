<!-- 

继承el-pagination属性，同时需要开启page-size和current-page的sync
新增pages页数，可传[Boolean,Number,String]
 
合并 @sizeChange和@currentChange 为@on-pagination

 -->
<template>
	<div class="pagination-index">
		<el-pagination
			layout="total, sizes, prev, pager, next,slot, jumper"
			prev-text="上一页"
			next-text="下一页"
			background 
			v-bind="$attrs"
			v-on="$listeners"
			@size-change="sizeChange"
			@current-change="currentChange" 
			>
			<span class="el-pagination__total m-l-10 m-r-0" v-if="pages !== false">
				共{{pages}}页，
			</span>
		</el-pagination>
	</div>
</template>

<script>
export default {
    inheritAttrs:false,
    name:'pagination-index',
    props:{
        'pages':{
			type:[Boolean,Number,String],
            default:0,
            required:true
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
		margin-top: 15px;
		.el-pagination {
			.btn-next ,.btn-prev{
				width: 85px;
			}
			.el-pager li {
				width: $--pagination-button-height;
			}
			.el-input .el-input__inner {
				height: $--pagination-button-height;
				line-height: $--pagination-button-height;
			}
			.el-pagination__jump {
				margin-left: 0;
			}
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
</style>
