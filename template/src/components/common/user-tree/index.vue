<template>
	<el-dialog
		:title="'选择'+title"
		:visible.sync="visible"
		append-to-body
		width="800px"
		:custom-class="dialogCustomClass"
		@closed="close"
		>
		<div class="user-tree">
			<div class="user-tree-section">
				<el-input
					size="small"
					clearable
					:placeholder="placeholderStr"
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
						<p>
							已选 {{muitlLists.length}} <span v-if="limit">/{{limit}}</span>{{selectUnit}}
						</p>
					</div>
					<el-button type="text" icon="el-icon-delete" @click="clear">清空</el-button>
				</div>
				<el-table
					:data="muitlLists"
					size="mini"
					border
					height="300px"
					>
					<!-- <el-table-column
						type="index"
						width="50"
					    >
					</el-table-column> -->
					<el-table-column
						v-for="col in tableAttributes.column"
						:key="col.prop"
					    v-bind="col"
					    >
					</el-table-column>
					<el-table-column prop="userName" label="操作" width="80px" align="center">
						<template slot-scope="scope">
							<el-button type="text" @click="remove(scope)" class="padding-0">删除</el-button>
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
    computed: {
        dialogCustomClass() {
            const _customClass = this.$data.customClass
            return _customClass ? 'dialog-center user-tree-dialog '+_customClass : 'dialog-center user-tree-dialog'
        },
        placeholderStr () {
            return this.placeholder || '输入'+this.title+'进行过滤'
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
        filterNode(value, data,node) {
            node.expanded = Boolean(value)
            if (!value) {
                return true;
            }
            else {
                if (data[this.treeAttributes.props.isLeaf]) {
                    return data[this.treeAttributes.props.label].indexOf(value) !== -1;
                }
            }
        },
        onCheck (data,{checkedNodes,checkedKeys,halfCheckedNodes,halfCheckedKeys}) {
			
            // 获取当前选择的node
            const node = this.$refs.tree.getNode(data)
            // console.log(node)
            // 根据当前选择的node，判断的是否有最后一级
            const nodesData = this.nodeToData(node)
            const childNodesFlat = this.$util.flatArrayDeep(nodesData)
            const isLastChild = childNodesFlat.some( node => node[this.treeAttributes.props.isLeaf])
            // 当不是选择最后一级，并且里面没有最后一级【leaf为true】时，提示
            if ( (!data[this.treeAttributes.props.isLeaf] && !isLastChild)) {
			    this.$tyToast({
				    message:`<p class="">${data[this.treeAttributes.props.label]}没有${this.title}</p>`
			    })
            }
            else {
                const muitlLists = checkedNodes.filter( node => node[this.treeAttributes.props.isLeaf])
                if (this.limit && muitlLists.length > this.limit) {
                    this.$tyToast({
					    message:`最多只能选择${this.limit}${this.selectUnit}`,
					    onLeave:function () {
					    }
                    })
                }
                else {
                    this.muitlLists = muitlLists
                }
            }
			
			
        },
        remove ({row,$index}) {
            this.muitlLists.splice($index,1)
			
            this.$refs.tree.setChecked(row[this.treeAttributes.props.id],false)
            
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
            if (this.treeAttributes.lazy) {
                const data = this.nodeToData(this.$refs.tree.root)
                this.onClose && this.onClose(data)
            }
            this.visible = false
            this.clear()
        },
        confirm () {
		    const data = _.uniqBy(this.muitlLists,this.treeAttributes.props.id)
		    this.onConfirm && this.onConfirm(data)
		    this.close()
        },
        nodeToData (nodes) {
            const _data = this.XEUtils.mapTree(nodes.childNodes,node => {
			    return {
			        ...node.data,
			        [this.treeAttributes.props.children]:node.childNodes
			    }
            },{
			    'children':'childNodes'
            })
            return this.XEUtils.mapTree(_data,d => {
			    d[this.treeAttributes.props.children] = d.childNodes
			    delete d.childNodes
			    return d
            })
        }
    },
    mounted () {
        /* 设置默认选中值 */
        /* */
        this.muitlLists = this.tableAttributes.data
    	
    	if (this.treeAttributes.lazy) {
    		this.$nextTick( () => {
    			const defaultCheckedKeys = this.treeAttributes['default-checked-keys']
    			if (defaultCheckedKeys) {
    				this.$refs.tree.setCheckedKeys(defaultCheckedKeys)
    			}
    			else {
    				const setCheckedKeys = this.tableAttributes.data.map( user => {
    					return user[this.treeAttributes.props.id]
    				})
    				this.$refs.tree.setCheckedKeys(setCheckedKeys)
    			}
    		})
    	}
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
			border-top: 1px solid $--border-color-base;
			border-bottom: 1px solid $--border-color-base;
			height: 100%;
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
					// height: 500px;
					padding-top: 10px;
					height: calc(100% - 32px);
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
					height: 32px;
					display: flex;
					align-items: center;
					justify-content: space-between;
					margin-bottom: 10px;
				}
				.el-table {
					height: calc(100% - 32px) !important;
				}
			}
		}
	}
</style>
