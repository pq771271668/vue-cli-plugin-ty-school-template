/**
 * 使用
 * <el-button v-draggable>拖拽按钮</el-button>
 */
const draggable = {
	bind(el, binding) {
		el.style.cursor = 'move'
	},
	inserted: function(el) {
		el.ontouchstart = function(e) {
			var dragStartTime = '';
			var dragEndTime = '';
			var target = e.target;        
			target.setAttribute('drag-flag', false);
			dragStartTime = new Date().getTime()
			
			// el.offsetTop/Left 元素到父元素上边/左边的距离
			let disx = e.targetTouches[0].clientX - el.offsetLeft
			let disy = e.targetTouches[0].clientY - el.offsetTop
			document.ontouchmove = function(e) {
				let x = e.targetTouches[0].clientX - disx
				let y = e.targetTouches[0].clientY - disy
				
				let maxX = document.body.clientWidth - parseInt(window.getComputedStyle(el).width)
				let maxY = document.body.clientHeight - parseInt(window.getComputedStyle(el).height)
				if (x < 0) {
					x = 0
				} else if (x > maxX) {
					x = maxX
				}

				if (y < 0) {
					y = 0
				} else if (y > maxY) {
					y = maxY
				}

				el.style.left = x + 'px'
				el.style.top = y + 'px'
				
				dragEndTime = new Date().getTime();
				if (dragEndTime - dragStartTime > 300) {
					target.setAttribute('drag-flag', true)
				};
				
			}
			document.ontouchend = function() {
				document.ontouchmove = document.ontouchmove = null
			}
		}
	},
}
export default draggable
