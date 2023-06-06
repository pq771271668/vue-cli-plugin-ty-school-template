<template>
	<el-avatar v-bind="$attrs" :src="src"><slot></slot></el-avatar>
</template>

<script>
export default {
    name:'avatar',
	props:['id','text'],
	computed:{
		'src' () {
			return this.id ? `http://jxb.huijiaoyun.com:22003/msapi/face/b/${this.TOKENINFO.platformCode}/${this.TOKENINFO.platformCode}/${this.id}`:'default'
		}
	},
    data () {
        return {
				
        }
    },
    methods:{
        
    }
}
</script>

<style lang="scss">
</style>