<template>
	<div class="page-container" 
		:class="{'page-container_gap':gap,'page-container_height':isHeight}">
		<div 
			v-if="header"
			class="page-header" 
			:class="[headerBorderStyle ? 'page-header_border-'+headerBorderStyle : '']" 
			:style="headerStyle">
			<slot name="header">
				<div class="page-search">
					<el-form inline :model="form" label-width="0" @submit.native.prevent>
						<el-form-item  class="input-search">
							<el-input
								size="small"
								v-bind="$attrs"
							    v-model="form.searchKey"
								@keyup.enter.native="onSearch"
								clearable
								@clear="onSearch"
								>
								<el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
							</el-input>
						</el-form-item>
					</el-form>
				</div>
				<div class="page-toolbar">
					<el-button 
						v-for="action in actions"
						:key="action.name"
						class="is-plain--reverse" 
						size="small" 
						plain 
						v-bind="action"
						@click="onAction(action)">{{action.text}}</el-button>
				</div>
			</slot>
		</div>
		<div class="page-body" :style="bodyStyle">
			<el-scrollbar :native="native" class="page-component__scroll" ref="myScrollbar">
				<slot></slot>
			</el-scrollbar>
		</div>
	</div>
</template>

<script>
	export default {
		inheritAttrs:false,
		name:'page-container',
		props:{
			gap:{
				type:Boolean,
				default:false
			},
			actions:{
				type:Array,
				default: function () {
					return []
				}
			},
			'header-border-style':{
				type:String,
				default:'',
				validator: function (value) {
					return ['full', 'none',''].includes(value)
				}
			},
			'is-height':{
				type:Boolean,
				default:false
			},
			'native':{
				type:Boolean,
				default:false
			},
			'header-style':{
				type:Object,
				default: function () {
					return {
						'height':'70px'
					}
				}
			},
			'body-style':{
				type:Object,
				default: function () {
					return {}
				}
			},
			'header':{
				type:Boolean,
				default:true
			},
		},
		data () {
			return {
				form:{
					searchKey:''
				}
			}
		},
		methods:{
			onSearch () {
				this.$emit('on-search',this.form.searchKey)
			},
			onAction (action) {
				this.$emit('on-action',action)
			}
		}
	}
</script>

<style lang="scss">
	.page-container {
		height: 100%;
		display: flex;
		flex-direction: column;
		@extend %box-style;
		.page-header {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding: 10px 20px;
			margin-bottom: 10px;
			position: relative;
			&:after {
				content: '';
				position: absolute;
				left: 20px;
				right: 20px;
				bottom: 0;
				height: 1px;
				background-color: $--border-color-base;
				transform: scaleY(0.5);
			}
			.el-form {
				.el-form-item {
					margin-bottom: 0;
				}
			}
		}
		.page-body {
			padding:10px 20px 20px;
			// height: 100%;
			flex: 1;
			overflow: hidden;
		}
		&.page-container_gap {
			background-color: transparent;
			.page-header {
				@extend %box-style;
				&:after {
					display: none;
				}
			}
			.page-body {
				@extend %box-style;
				padding-top: 20px;
			}
		}
		&.page-container_height {
			.el-scrollbar__view {
				height: 100%;
			}
			/* .body-table {
				height: 100%;
				display: flex;
				flex-direction: column;
				.el-table {
					&::before {
						display: none;
					}
				}
			} */
		}
		.page-header_border-full {
			&.page-header {
				&:after {
					left: 0;
					right: 0;
				}
			}
		}
		.page-header_border-none {
			&.page-header {
				margin-bottom:0;
				&:after {
					display: none;
				}
			}
			& + .page-body {
				padding-top: 0;
			}
		}
	}
</style>
