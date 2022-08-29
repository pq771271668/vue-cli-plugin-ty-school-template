<!--
 * @Author: your name
 * @Date: 2021-09-15 09:32:37
 * @LastEditTime: 2022-01-10 09:48:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \tyedu-ui\packages\alert\src\main.vue
-->
<template>
	<div class="ty-alert-main">
		<div class="ty-alert-mask" @touchmove.prevent @mousewheel.prevent :style="bgStyle" v-if="mask"></div>
		<div class="ty-alert" :class="classStr">
			<div class="ty-alert-head">
				<span class="ty-alert-title" v-if="!style2">{{ title }}</span>
				<button class="ty-alert-close" v-if="showClose" @click="close()"></button>
			</div>
			<div class="ty-alert-content">
				<div class="ty-alert-content-inner"><p class="ty-alert-content-text" v-html="message"></p></div>
				<div class="ty-alert-option" v-if="showOption" :class="{ 'ty-alert-option_center': center }">
					<!-- <button
						v-for="(btn, idx) in option"
						:key="idx"
						:class="btn === '取消' ? 'ty-alert-cancel' : 'ty-alert-confirm ' + btnAni"
						@click="btn === '取消' ? _cancel() : _confirm()"
					>
						{{ btn }}
					</button> -->
					<template v-for="(btn, idx) in option">
						<template v-if="typeof btn == 'string'">
							<el-button
								:type="btn ==='取消'?'':'primary'"
								size="medium"
								@click="btn === '取消' ? _cancel() : _confirm()"
								:class="btn === '取消' ? '' : btnAni"
								>
								{{ btn }}
							</el-button>
						</template>
						<template v-else>
							<el-button
								v-bind="btn"
								size="medium"
								@click="_Click(btn)"
								:class="btn.text === '取消' ? '' : btnAni"
								>
								{{ btn.text }}
							</el-button>
						</template>
					</template>
					
				</div>
			</div>
		</div>
	</div>
</template>
<script>
const typeMap = {
	success: 'success',
	info: 'info',
	error: 'error',
	wran: 'wran'
};
export default {
	name: 'TyAlert',
	data() {
		return {
			type: '',
			title: '提示',
			message: '',
			option: null,
			center: true,
			mask: true,
			bgColor: '',
			onConfirm: null,
			onCancel: null,
			onClose: null,
			onClick: null,
			style2: false,
			enterAni: 'ty-alert-enter',
			leaveAni: 'ty-alert-leave',
			classAni: '',
			btnAni: '',
			duration: 0,
			timer: null,
			showClose: true
		};
	},
	computed: {
		bgStyle() {
			return this.bgColor ? { 'background-color': this.bgColor } : null;
		},
		classStr() {
			let typeClass = '';
			if (this.type) {
				typeClass = 'ty-alert-' + typeMap[this.type];
			}
			if (this.style2) {
				typeClass += ' ty-alert-style2';
			}
			return typeClass + ' ' + this.classAni;
		},
		showOption() {
			return this.option && Object.prototype.toString.call(this.option) == '[object Array]' && this.option.length > 0;
		}
	},
	created() {
		this.classAni = this.enterAni;
	},
	methods: {
		leave() {
			this.timer = setTimeout(() => {
				clearTimeout(this.timer);
				this.classAni = this.leaveAni;
				this.removeEl();
			}, this.duration);
		},
		removeEl() {
			this.timer = setTimeout(() => {
				clearTimeout(this.timer);
				this.$destroy(true);
				this.$el.parentNode && this.$el.parentNode.removeChild(this.$el);
				this.onClose && this.onClose();
			}, 300);
		},
		close() {
			this.btnAni = '';
			this.duration = 0;
			this.leave();
		},
		_cancel() {
			if (this.btnAni) return;
			this.duration = 0;
			this.onCancel && this.onCancel(this);
			this.leave();
		},
		_confirm() {
			this.btnAni = 'ty-alert-confirm-load';
			this.onConfirm && this.onConfirm(this);
		},
		_Click (btn) {
			if (btn.text == '取消') {
				this._cancel()
			}
			else if (btn.text == '确定') {
				this._confirm()
			}
			else {
				this.btnAni = 'ty-alert-confirm-load';
				this.onClick && this.onClick(this,btn);
			}
		}
	}
};
</script>
<style lang="scss" scoped>
@import './alert.scss';
</style>
