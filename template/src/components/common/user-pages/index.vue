<template>
	<el-dialog
		:title="'选择'+title"
		:visible.sync="visible"
		append-to-body
		width="800px"
		custom-class="user-pages-dialog"
		@closed="close"
		>
		<div class="user-pages">
			<el-transfer
				:filterable="false"
				:filter-method="filterMethod"
				:filter-placeholder="'请输入'+title+'搜索'"
				:titles="['请选择','已选择']"
				v-model="value"
				:data="lists"
				:right-default-checked="value"
				:props="props"
				@change="change"
			>
				<template slot="left-footer">
					<div class="flex h-100_per col-center row-center">
						<el-pagination
							:pager-count="5"
							small
							layout="prev, pager, next"
							:page-size.sync="pageSize"
							@current-change="onPagination"
							:total="total">
						</el-pagination>
					</div>
				</template>
				<template slot="right-footer">
					<div class="flex h-100_per col-center row-center">
						<el-button type="primary" @click="confirm">确定</el-button>
					</div>
				</template>
			</el-transfer>
		</div>
	</el-dialog>
</template>

<script>
	export default {
		name:'user-pages',
		data () {
			return {
				lists: [],
				filterMethod(query, item) {
					if (!query) {
						return item
					}
					else {
						return item.name.indexOf(query) > -1;
					}
				},
				pageNo:1,
				pageSize:10,
				name:'',
				total:0,
				checkedLists:[]
			}
		},
		methods:{
			onPagination (value) {
				this.pageNo = value
				this.getData()
			},
			getData () {
				this.$axios.common_teacherPage({
					params:Object.assign({},{
						name:this.name,
						pageNo:this.pageNo,
						pageSize:this.pageSize
					},this.params)
				})
				.then( resp => {
					this.total = Number(resp.total)
					this.lists = resp.records
				})
			},
			clear () {
			},
			close () {
				this.visible = false
				this.clear()
			},
			confirm () {
				this.onConfirm && this.onConfirm(this.checkedLists)
				this.close()
			},
			change (cur,dic,arr) {
				// console.log(cur,dic,arr)
				if (dic == 'right') {
					for (let id of arr) {
						let item = this.lists.find( list => list.userId == id)
						if (item) {
							this.checkedLists.push(item)
						}
					}
				}
				else {
					for (let id of arr) {
						let index = this.checkedLists.findIndex( list => list.userId == id)
						if (index > -1) {
							this.checkedLists.splice(index,1)
						}
					}
				}
				
			}
		},
		created() {
			this.getData()
		}
	}
</script>

<style lang="scss">
	.user-pages {
		display: flex;
		justify-content: center;
		.el-transfer {
			.el-transfer-panel {
				.el-transfer-panel__body.is-with-footer {
					min-height: 312px;
					padding-bottom: 0;
					.el-transfer-panel__list {
						height:312px;
					}
				}
				.el-transfer-panel__footer {
					position:static;
				}
			}
		}
	}
</style>