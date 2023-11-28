<template>
	<div class="h5-table">
		<el-table
			:highlight-current-row="false"
			v-bind="$attrs"
			v-on="$listeners"
			:header-cell-style="{
				'background-color':'#fff',
				'color':'#9B9B9B',
				'border':'none',
				'font-size':'14px'
			}"
			:cell-style="{
				'border-color':'#F5F5F5',
				'font-size':'14px',
				'color':'#000'
			}"
			cell-class-name="h5-table-cell"
			header-cell-class-name="h5-table-cell"
			>
			<slot></slot>
		</el-table>
	</div>
</template>

<script>
	export default {
		inheritAttrs:false,
		name:'h5-table',
		data () {
			return {
			}
		},
		methods:{},
		created() {
			
		}
	}
</script>

<style lang="less">
	.h5-table {
		padding-left: 5px;
		padding-right: 5px;
		background-color: #fff;
		.el-table {
			&::before {
				height: 0;
			}
			.h5-table-cell {
				.cell {
					padding-left: 6px;
					padding-right: 6px;
				}
			}
			&.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
				background-color:#fff;
			}
		}
	}
</style>