<template>
	<el-dialog
		:title="'选择'+title"
		:visible.sync="visible"
		append-to-body
		width="800px"
		custom-class="user-tree-dialog"
		@closed="close"
		>
		<div class="user-tree">
			<div class="user-tree-section">
				<el-input
					clearable
					:placeholder="'输入'+title+'姓名进行过滤'"
					v-model="filterText">
				</el-input>
				<div class="user-tree-section-container">
					<el-scrollbar :native="false" class="page-component__scroll" ref="myScrollbar">
						<el-tree
							ref="tree"
							v-bind="treeAttributes"
							:filter-node-method="filterNode"
							@check="onCheck"
							>
						</el-tree>
					</el-scrollbar>
				</div>
			</div>
			<div class="user-tree-table">
				<div class="table-top">
					<div class="top-count">
						<p v-if="limit">
							已选{{muitlLists.length}}/{{limit}}人
						</p>
					</div>
					<el-button type="text" icon="el-icon-delete" @click="clear">清空</el-button>
				</div>
				<el-table
					:data="muitlLists"
					border
					max-height="500px"
					>
					<el-table-column
						v-for="col in column"
						:key="col.prop"
					    v-bind="col"
					    >
					</el-table-column>
					<el-table-column prop="userName" label="操作" width="80px" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="remove(scope.$index)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<el-button @click="close">取 消</el-button>
			<el-button type="primary" @click="confirm">确 定</el-button>
		</span>
	</el-dialog>
</template>

<script>
	export default {
		name:'user-tree',
		watch:{
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		data () {
			return {
				muitlLists:[],
				onConfirm:null,
				filterText:'',
			}
		},
		methods:{
			filterNode(value, data) {
				if (!value) {
					return true;
				}
				else {
					if (data.isLeaf) {
						return data[this.treeAttributes.props.label].indexOf(value) !== -1;
					}
				}
			},
			
			onCheck (data) {
				const node = this.$refs.tree.getNode(data)
				const checkedNodes = this.$refs.tree.getCheckedNodes(true)
				
				if (checkedNodes.length > 0) {
					// 新增的节点信息（有可能有最后一级也有可能其他级别的信息）
					const checkedNodes_add = _.xorBy(checkedNodes,this.muitlLists,this.treeAttributes.props.id)
					// 新增的节点信息中是否包含了最后一级
					const isChecked = checkedNodes_add.some(checked => checked.isLeaf)
					if (isChecked) {
						// 获取最后一级全部选中节点
						const muitlLists = checkedNodes.filter( checked => checked.isLeaf)
						if (this.limit) {
							const length = muitlLists.length - this.limit
							if (length > 0) {
								this.$tyToast({
									message:`最多只能选择${this.limit}个人`,
									onLeave:function () {
									}
								})
								// 获取新增的最后一级节点
								const diffs = _.xorBy(muitlLists,this.muitlLists,this.treeAttributes.props.id)
								this.muitlLists = this.muitlLists.concat(diffs.slice(0,this.limit - this.muitlLists.length)) 
							}
							else {
								this.muitlLists = muitlLists
							}
						}
						else {
							this.muitlLists = muitlLists
						}
						
					}
					else {
						let label = checkedNodes_add.map( node => {
							return node[this.treeAttributes.props.label]
						})
						this.$tyToast(label+'没有'+this.title+'！')
					}
					this.setCurrentCheckedKeys()
				}
				else {
					this.muitlLists = []
				}
			},
			remove (index) {
				this.muitlLists.splice(index,1)
				this.setCurrentCheckedKeys()
			},
			setCurrentCheckedKeys () {
				let keys = this.muitlLists.map(list => {
					return list[this.treeAttributes.props.id]
				})
				
				this.$nextTick( () => {
					this.$refs.tree.setCheckedKeys(keys)
				})
			},
			clear () {
				this.muitlLists = []
				this.$nextTick( () => {
					this.$refs.tree.setCheckedKeys([])
				})
			},
			close () {
				this.visible = false
				this.clear()
			},
			confirm () {
				this.onConfirm && this.onConfirm(this.muitlLists)
				this.close()
			}
		},
		mounted () {
			/* 设置默认选中值 */
			this.$nextTick( () => {
				this.muitlLists = this.$refs.tree.getCheckedNodes(true)
			})
		}
	}
</script>

<style lang="scss">
	.user-tree-dialog {
		.el-dialog__body {
			padding: 0;
		}
		.user-tree {
			display: flex;
			border-bottom: 1px solid $--border-color-base;
			.user-tree-section {
				padding: 20px;
				width: 50%;
				position: relative;
				&:after {
					content: '';
					position: absolute;
					top: 0;
					right: 0;
					width: 1px;
					height: 100%;
					background-color: $--border-color-base;
				}
				.user-tree-section-container {
					height: 500px;
					margin-top: 10px;
				}
				.el-checkbox {
					&.is-disabled {
						// display: none;
					}
				}
			}
			.user-tree-table {
				padding: 20px;
				width: 50%;
				.table-top {
					display: flex;
					align-items: center;
					justify-content: space-between;
				}
			}
		}
	}
</style>
