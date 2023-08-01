<template>
	<div id="app">
		<router-view />
	</div>
</template>

<script>
export default {
    data() {
        return {
        };
    },
    mounted() {
        if (this.ISMOBILE !== this.$util.isMobile()) {
            this.$router.replace('/')
        	
            this.$vuex('ISMOBILE',this.$util.isMobile())
        }
    }
};
</script>

<style lang="scss">
	/* 布局容器 */
	#app {
		height: 100%;
		background-color: #FFFFFF;
	}
</style>
