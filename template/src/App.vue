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
        if (this.isMobile !== this.$util.isMobile()) {
		    this.$router.replace('/')
			
		    this.$vuex('isMobile',this.$util.isMobile())
        }
    }
};
</script>

<style lang="scss">
</style>
