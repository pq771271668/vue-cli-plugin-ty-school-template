<template>
	<el-drawer
		size="460px"
		append-to-body
		title="提示"
		:visible.sync="visible"
		>
			<div class="drawer-body p-l-30">
				<el-alert
					class="el-alert-text-black is-border el-alert-medium"
					:closable="false"
				    v-bind="alertParams"
				    >
					<!-- <p class="alert-content">
						<span>{{tableData.length}} 条数据错误</span>，请在下方表格中查看错误原因更改后再重新导入
					</p> -->
				</el-alert>
				
				<div class="m-t-20" v-if="tableData.length > 0">
					<el-table
						class="radius-4 table-color_base"
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
			
		<div class="drawer-footer text-right">
		    <el-button size="small" type="danger" @click="onRefresh">重新上传</el-button>
		    <el-button size="small" type="primary" @click="onConfirm">确定</el-button>
		</div>
	</el-drawer>
</template>

<script>
	export default {
		name:'export',
		data () {
			return {
				
			}
		},
		methods:{
			onRefresh () {
				if (typeof this.refresh == 'function') {
					this.visible = false
					this.refresh();
				}
			},
			onConfirm () {
				if (typeof this.refresh == 'function') {
					this.visible = false
					this.confirm();
				}
			}
		}
	}
</script>

<style lang="scss">
</style>
