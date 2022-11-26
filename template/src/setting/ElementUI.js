/* 关于ElementUI组件的props默认设置 */
import elementUI from 'element-ui'
import merge from 'lodash/merge';
const ElementUI = merge(elementUI,{
	Table:{
		props:{
			size:{
				type: String, 
				default: 'medium'
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
	}
})
export default ElementUI