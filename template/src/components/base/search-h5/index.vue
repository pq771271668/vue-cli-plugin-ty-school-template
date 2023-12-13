<!-- 

移动端的查询组件

props:
	items.sync[Array]
	--注意：items必须sync，否则修改选项会初始化其他选项
	--label（默认值）、value（默认值）、name必填
	--disabled
	--nameStr:如果需要返回item[label]，请设置nameStr
	--datetime为true时为时间组件，format自定义时间格式
	
	props[Array]
	--columns可以异步
	其他参数和vant一致
	
	fixed:默认true，是否固定为顶部
	
事件：
	@on-comfirm(params)
	
	
方法：
	getValue(items)：得到根据item里面的name为key值的数据
	
 -->
<template>
	<ul class="search-h5 van-hairline--bottom" :class="{'search-h5_fixed':fixed}">
		<li v-for="(item,index) in lists" :key="index" @click="onShow(item,index)" v-if="!item.hidden">
			<span class="line-1">{{item.label}}</span>
			
			<van-icon name="arrow-down" v-if="!item.disabled" />
			
			
			<van-popup v-model="item.show" position="bottom" get-container="body" round>
				<van-datetime-picker
					v-if="item.datetime"
					v-bind="props[index]"
					@confirm="onConfirm"
				/>
				
				<van-picker
					v-else
					v-bind="props[index]"
					@confirm="onConfirm"
				/>
				
			</van-popup>
			
			
		</li>
	</ul>
</template>

<script>
export default {
    name:'search-h5',
    props:{
        'items':{
		    type:Array
        },
        'props':{
            type:Array
        },
        'fixed':{
            type:Boolean,
            default:true
        }
    },
    watch:{
        'items':{
            handler (newVal) {
                this.lists = newVal
            },
            immediate:true
        }
    },
    data () {
        return {
            currentItem:'',
            currentIndex:'',
            lists:[]
        }
    },
    methods:{
        onShow (item,index) {
            if (!item.disabled) {
                this.currentIndex = index
                this.currentItem = item
                this.toggle(true)
            }
        },
        onConfirm (value) {
            if (this.currentItem.datetime) {
                this.currentItem = Object.assign({},this.currentItem,{
				    label:this.$moment(value).format(this.currentItem.format),
				    value:value
                })
            }
            else {
                if (!Array.isArray(value)) {
                    this.currentItem = Object.assign({},this.currentItem,value)
                }
                else {
                    this.currentItem = Object.assign({},this.currentItem,{
                        label:_.last(value)
                    })
                    let _value = []
                    const columns = this.$util.flatArrayDeep(this.props[this.currentIndex].columns)
                    for (let label of value) {
                        const column = columns.find( column => column.label == label)
                        if (column) {
                            _value.push(column.value)
                        }
                    }
                    // this.currentItem.value = _value
                    this.currentItem = Object.assign({},this.currentItem,{
					    value:_value
                    })
                }
            }
            this.toggle(false)
            const params = this.getValue()
            this.$emit('on-confirm',params)
        },
        toggle (show) {
            let lists = _.cloneDeep(this.items)
            lists.splice(this.currentIndex,1,{
                ...this.currentItem,
                show
            })
            this.lists = lists
            this.$emit('update:items',lists)
        },
        getValue () {
            let params = {}
            this.lists.forEach( (list,i) => {
                if (Array.isArray(list.name)) {
                    for (let index in list.name) {
                        const name = list.name[index]
                        const value = list.value[index]
                        params[name] = value
                        if (list.nameStr) {
                            const nameStr = list.nameStr[index]
                            const columns = this.$util.flatArrayDeep(this.props[i].columns)
                            const column = columns.find(column => column.value == value)
                            params[nameStr] = column.label
                        }
                    }
                }
                else if (list.datetime) {
                    params[list.name] = list.label
                    if (list.nameStr) {
                        params[list.nameStr] = list.label
                    }
                }
                else {
                    params[list.name] = list.value
                    if (list.nameStr) {
                        params[list.nameStr] = list.label
                    }
                }
            })
            return params
        }
    }
}
</script>

<style lang="less">
	.search-h5 {
		display: flex;
		align-items: center;
		height: 44px;
		width: 100%;
		background-color: #fff;
		&.search-h5_fixed {
			position: fixed;
			top:0;
			left:0;
			z-index:1;
		}
		li {
			padding: 0 10px;
			flex:1 0 0;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			span {
				padding-right: 5px;
				min-width: 60px;
			}
		}
	}
</style>