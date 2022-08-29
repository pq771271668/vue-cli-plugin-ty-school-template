<template>
	<el-dialog
		title="选择学生"
		:visible.sync="visible"
		append-to-body
		width="800px"
		custom-class="select-user-dialog"
		@closed="close"
		>
		<div class="select-user">
			<div class="select-user-tree">
				<el-input
					clearable
					placeholder="输入学生姓名进行过滤"
					v-model="filterText">
				</el-input>
				<div class="select-user-tree-container">
					<el-scrollbar :native="false" class="page-component__scroll" ref="myScrollbar">
						<el-tree
							ref="tree"
							:load="loadNode"
							lazy
							show-checkbox
							node-key="id"
							:default-expanded-keys="defaultExpandedKeys"
							:default-checked-keys="defaultCheckedKeys"
							:props="defaultProps"
							@check="onCheck"
							:default-expand-all="defaultExpandAll"
							:filter-node-method="filterNode"
							check-strictly
							>
						</el-tree>
					</el-scrollbar>
				</div>
			</div>
			<div class="select-user-table">
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
				        prop="className"
				        label="班级名称"
				        >
					</el-table-column>
					<el-table-column
				        prop="userName"
				        label="姓名"
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
		name:'select-user',
		/* props:{
			'checkedLists':{
				type:Array,
				default: function () {
					return []
				}
			},
			'limit':{
				type:[Number,String],
				default:null
			},
			show:{
				type:Boolean,
				type:false
			}
		}, */
		watch:{
			// show:{
			// 	handler (newVal) {
			// 		this.visible = newVal
			// 	}
			// },
			'checkedLists':{
				handler (newVal) {
					if (newVal.length > 0) {
						this.muitlLists = newVal
						
						let keys = this.muitlLists.map(list => {
							return list.userId
						})
						
						
						this.defaultExpandedKeys = keys
						this.defaultCheckedKeys = keys
					}
				},
				immediate:true
			},
			filterText(val) {
				this.$refs.tree.filter(val);
			}
		},
		data () {
			return {
				// visible:this.show,
				defaultExpandedKeys:[],
				defaultCheckedKeys:[],
				defaultProps:{
					isLeaf:'isLeaf'
				},
				muitlLists:[],
				onConfirm:null,
				defaultExpandAll:true,
				filterText:'',
			}
		},
		methods:{
			filterNode(value, data) {
				if (!value) {
					if (data.isLeaf) {
						this.$nextTick(() => {
							data.parent.expanded = false;
						});
					}
					return true;
				}
				else {
					if (data.isLeaf) {
						this.$nextTick(() => {
							data.parent.expanded = true;
						});
						return data.label.indexOf(value) !== -1;
					}
				}
			},
			async listEduChild (data) {
				return new Promise( (resolve,reject) => {
					this.$axios.select_listEduChild({
						params:{
							platformCode:this.USERINFO.platformCode,
						},
						data:data
					})
					.then( resp => {
						const result = resp.map( item => {
							return Object.assign({},item,{
								id:item.orgId,
								label:item.orgName,
								orgType:data.orgType,
								disabled:true
							})
						})
						resolve(result)
					})
				})
			},
			loadNode(node, resolve) {
				const orgType = [3,5,6,7]
				// console.log(node)
				if (node.level <= 3) {
					this.listEduChild({
						orgId:this.USERINFO.lastTopOrgId,
						schoolId:this.treeNode.campusId,
						parentId:(node.data && node.data.id) || '',
						orgType:orgType[node.level]
					})
					.then( data => {
						
						return resolve(data)
					})
				}
				else if (node.level == 4){
					this.$axios.select_getNoPrivacyOrgMemberList({
						params:{
							platformCode:this.USERINFO.platformCode,
						},
						data:{
							topOrgId:this.USERINFO.lastTopOrgId,
							orgId:node.data.id,
							orgRecursion:'',
							topSchoolId:'',
							userType:0,
							page:1,
							limit:500
						}
					})
					.then( resp => {
						const result = resp.list.map( item => {
							return Object.assign({},item,{
								label:item.name,
								id:item.userId,
								isLeaf:true
							},{
								parent:node
							})
						})
						this.$nextTick(() => {
							node.expanded = false;
						});
						
						for (let key of result) {
							const ishas = this.muitlLists.find( list => list.userId == key.userId)
							if (ishas) {
								this.$nextTick(() => {
									const _node = this.$refs.tree.getNode(ishas.userId)
									_node.parent.expanded = true;
								});
							}
						}
						
						return resolve(result)
					})
					
				}
				else {
					return resolve([])
				}
				
				
			},
			
			getChild (array) {
				let childNodes = this.$util.flatArrayDeep(array,'childNodes')
				return childNodes
				// console.log(childNodes)
			},
			
			onCheck (data) {
				
				/* console.log(data)
				console.log(this.$refs.tree.getCheckedNodes(true))
				console.log(this.$refs.tree.getNode(data)) */
				
				/* 1.默认值上级节点需要展开展开 2.可以选择上面层级的节点来获取table需要的值 */
				
				const node = this.$refs.tree.getNode(data)
				// console.log(node)
				
				// 最后节点有可能是学生也有可能是班级或者其他的上级节点
				if(node.childNodes == 0) {
					// 有userId--学生节点 -- 当非班级节点为disabled时，其实就这段代码有用
					if (data.userId) {
						
						this.setMuitlLists(data)
						
						const _this = this
						if (this.muitlLists.length > this.limit) {
							this.$tyToast({
								message:`最多只能选择${this.limit}个人`,
								onLeave:function () {
								}
							})
							this.remove(this.muitlLists.length - 1)
						}
					}
					// 不是学生节点
					else {
						this.$tyToast(node.data.label+'没有学生！')
						this.setCurrentCheckedKeys()
					}
				}
				// 还存在下级节点
				else {
					let childNodes = this.getChild(node.childNodes)
					
					let checkedNodes = []
					// 获取学生节点信息
					for (let node of childNodes) {
						const data = node.data
						if (data.userId) {
							checkedNodes.push({
								userName:data.name,
								userId:data.userId,
								classId:data.parent.data.orgId,
								className:data.parent.data.orgName
							})
						}
					}
					
					// 节点不存在学生
					if (checkedNodes.length == 0) {
						this.$tyToast(node.data.label+'没有学生！')
						this.setCurrentCheckedKeys()
					}
					else {
						// 合并去重
						const items = _.unionBy(checkedNodes,this.muitlLists,'userId')
						// 不同
						const diffs = _.xorBy(checkedNodes,this.muitlLists,'userId')
						
						this.setCurrentCheckedKeys()
						
						this.$tyToast({
							message:'请选择学生',
							onLeave:function () {
							}
						})
						
					}
					
					// console.log(checkedNodes)
				}
			},
			remove (index) {
				this.muitlLists.splice(index,1)
				this.setCurrentCheckedKeys()
			},
			setMuitlLists (data) {
				const index = this.muitlLists.findIndex( list => list.userId == data.userId )
				
				if (index == -1) {
					this.muitlLists.push({
						userName:data.name,
						userId:data.userId,
						classId:data.parent.data.orgId,
						className:data.parent.data.orgName
					})
				}
				else {
					this.muitlLists.splice(index,1)
				}
			},
			setCurrentCheckedKeys () {
				let keys = this.muitlLists.map(list => {
					return list.userId
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
				// this.$emit('update:show',false)
				this.visible = false
				this.clear()
			},
			confirm () {
				this.onConfirm(this.muitlLists)
				// this.$emit('on-confirm',this.muitlLists)
				this.close()
			}
		},
		created () {
			
		}
	}
</script>

<style lang="scss">
	.select-user-dialog {
		.el-dialog__body {
			padding: 0;
		}
		.select-user {
			display: flex;
			border-bottom: 1px solid $--border-color-base;
			.select-user-tree {
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
				.select-user-tree-container {
					height: 500px;
				}
				.el-checkbox {
					&.is-disabled {
						// display: none;
					}
				}
			}
			.select-user-table {
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
