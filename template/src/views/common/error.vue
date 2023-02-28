<template>
	<div class="project-error">
		<template v-if="IsMobile">
			<van-empty description="页面找不到">
				<van-button round type="info" @click="backIndex">返回首页</van-button>
				<van-button round type="info" @click="backPrev" style="margin-left: 20px;">返回上一页</van-button>
			</van-empty>
		</template>
		<template v-else>
			<el-empty :image="image" description="页面找不到" :image-size="300">
				<el-button type="primary" @click="backIndex">返回首页</el-button>
				<el-button type="primary" @click="backPrev">返回上一页</el-button>
			</el-empty>
		</template>
	</div>
</template>

<script>
export default {
    name:'project-error',
    data () {
        return {
			IsMobile:this.$util.isMobile(),
            image:require('@/assets/images/empty.png')
        }
    },
    methods:{
        backIndex () {
            this.$router.replace('/')
        },
        backPrev () {
            this.$router.back()
        }
    }
}
</script>

<style>
	.project-error {
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
