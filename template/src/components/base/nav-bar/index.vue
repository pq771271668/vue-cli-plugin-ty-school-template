<template>
	<div class="nav-bar">
		<div class="nav-bar__left" @click="$emit('back')"
			:style="Object.assign({'width':sliderWidth},leftStyle)"
			>
			<i :class="icon"></i>
			<div class="nav-bar__title">
				<slot name="title">{{ title }}</slot>
			</div>
		</div>
		
		<div class="nav-bar__content" :class="'text-'+align">
			<slot name="content">
				{{ content }}
			</slot>
		</div>
		
		<div class="nav-bar__right" :style="{'width':sliderWidth}"><slot name="right"></slot></div>
		
	</div>
</template>

<script>
export default {
	name: 'nav-bar',

	props: {
		icon:{
			type: String,
			default() {
				return 'el-icon-arrow-left';
			}
		},
		title: {
			type: String,
			default() {
				return '返回';
			}
		},
		content: String,
		'slider-width':{
			type:String,
			default:'120px'
		}, //两侧宽度
		'align':{  //中间文字对齐方式
			type:String,
			default:'center'
		},
		'left-style':{
			type:Object,
			default () {
				return {}
			}
		}
	}
};
</script>
<style lang="scss">
	.nav-bar {
		width: 100%;
		display: flex;
		align-items: center;
		.nav-bar__left {
			display: flex;
			align-items: center;
			color: $--color-text-secondary;
			cursor: pointer;
			i {
				font-size: 18px;
				font-weight: bold;
				margin-right: 6px;
				align-self: center;
			}
			.nav-bar__title {
			    font-size: 14px;
			    font-weight: 500;
			}
		}
		.nav-bar__content {
			flex: 1;
			font-size: 18px;
			color: $--color-text-primary;
		}
	}
</style>
