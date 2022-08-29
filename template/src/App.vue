<template>
	<div id="app">
		<transition :name="transitionName"><router-view /></transition>
	</div>
</template>

<script>
export default {
	data() {
		return {
			transitionName: '',
		};
	},
	// 监听,当路由发生变化的时候执行
	watch: {
		$route(to, from) {
			//实现路由跳转动画
			this.transitionName = 'slide-left';
		}
	},
	mounted() {
	}
};
</script>

<style lang="scss">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
	will-change: transform;
	transition: all 1.2s;
	// position: absolute;
}

.slide-right-enter {
	opacity: 0;
	transform: translate(-100%);
}

.slide-right-leave-active {
	opacity: 0;
	transform: translateX(100%);
}

.slide-left-enter {
	opacity: 0;
	transform: translateX(100%);
}

.slide-left-leave-active {
	opacity: 0;
	transform: translateX(-100%);
}
</style>
