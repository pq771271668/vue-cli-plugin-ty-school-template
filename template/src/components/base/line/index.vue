<template>
	<div class="line-index" :style="[lineStyle]" :class="[lineClass]"></div>
</template>

<script>
	/**
	 * line 线条
	 */
	export default {
		name: 'line-index',
		props: {
			color:{
				type:String
			},
			width:{
				type:String,
				default:'3px'
			},
			height:{
				type:String,
				default:'1em'
			},
			type:{
				type:String,
				default:'info'
			},
		},
		computed: {
			lineStyle() {
				let style = Object.assign({},{
					width:this.width,
					height:this.height,
					'background-color':this.color,
				},this.style)
				return style;
			},
			lineClass () {
				if (!this.color) {
					return `bg-${this.type}-deep`
				}
			}
		}
	}
</script>

<style scoped lang="scss">
	
	.line-index {
		vertical-align: middle;
		display: inline-block;
	}
</style>
