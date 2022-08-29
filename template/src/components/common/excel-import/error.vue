<template>
	<el-drawer
		size="460px"
		append-to-body
		title="提示"
		:visible.sync="visible"
		>
			<div class="drawer-body p-l-30">
				<el-alert
					:closable="false"
				    title="导入失败"
				    type="error"
				    >
					<p class="error-content">
						<span>{{tableData.length}} 条数据错误</span>，请在下方表格中查看错误原因更改后再重新导入
					</p>
				</el-alert>
				
				<div class="m-t-20">
					<el-table
						class="radius-4 table-color_base"
						header-cell-class-name="header-danger-light"
						size="small"
						:data="tableData"
						border
						max-height="500px"
						style="width: 100%">
						<el-table-column
						  prop="rowIndex"
						  label="位置"
						  width="140px">
						</el-table-column>
						<el-table-column
						  prop="msg"
						  label="错误原因">
						</el-table-column>
					</el-table>
				</div>
				
			</div>
			
		<!-- <div class="drawer-footer">
		    <el-button size="small" type="primary" @click="refreshExport">重新上传</el-button>
		</div> -->
	</el-drawer>
</template>

<script>
	export default {
		name:'export',
		data () {
			return {
				refresh:null,
				tableData:[]
				/* tableData:[
					{
						position:'第二行',
						result:'楼栋未填写',
					},{
						position:'第二行',
						result:'床位数超过99',
					},
				] */
			}
		},
		methods:{
			refreshExport () {
				// if (typeof this.refresh == 'function') {
				// 	this.refresh();
				// }
			}
		}
	}
</script>

<style lang="scss" scoped>
	::v-deep .el-alert {
		color: $--color-text-primary;
		padding: 20px 15px;
		border: 1px solid $--color-danger;
		.el-alert__content {
			.el-alert__title {
				font-size: 16px;
			}
			.el-alert__description {
				color: $--color-text-primary;
				margin-top: 10px;
				font-size: 14px;
			}
		}
		.error-content {
			span {
				color: $--color-danger;
			}
		}
	}
</style>
