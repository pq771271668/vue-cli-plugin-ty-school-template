/* 关于ElementUI组件的props默认设置 */
import elementUI from 'element-ui'
import merge from 'lodash/merge';
const ElementUI = merge(elementUI,{
	Global:{
		size: 'small', 
		zIndex: 100
	},
	Table:{
		props:{
			size:{
				type: String, 
				default: 'medium'
			},
			border:{
				type: Boolean,
				default: true
			},
			stripe:{
				type: Boolean,
				default: true
			}
		}
	},
	Empty:{
		props:{
			image:{
				type: String, 
				default: require('@/assets/images/empty.png')
			}
		}
	},
	Pagination:{
		props:{
			'prev-text':{
				type: String, 
				default: '上一页'
			},
			'next-text':{
				type: String, 
				default: '下一页'
			}
		}
	}
})
export default ElementUI