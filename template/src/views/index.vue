<template>
	<el-container>
		<el-header>
			<layout-header></layout-header>
		</el-header>
		<el-container>
			<template v-if="this.$router.options.routes.length == 0">
				<div class="flex w-100_per row-center">
					<el-result icon="warning" title="设置路由数据">
					</el-result>
				</div>
			</template>
			<template v-else>
				<el-aside width="220px">
					<layout-aside></layout-aside>
				</el-aside>
				<el-main>
					<template v-if="refresh">
						<template v-if="$setting.keepAlive">
							<keep-alive :exclude="/NOTKEEP/">
								<router-view class="main-page"></router-view>
							</keep-alive>
						</template>
						<template v-else-if="!$setting.keepAlive">
							<keep-alive :include="/KEEP/">
								<router-view class="main-page"></router-view>
							</keep-alive>
						</template>
						<template v-else>
							<router-view class="main-page"></router-view>
						</template>
					</template>
				</el-main>
			</template>
		</el-container>
	</el-container>
</template>
<!-- <el-scrollbar :native="false" class="page-component__scroll" ref="myScrollbar">
	<keep-alive>
		<router-view class="main-page"></router-view>
	</keep-alive>
</el-scrollbar> -->
<script>
import layoutHeader from '@/components/layout/header.vue'
import layoutAside from '@/components/layout/aside.vue'
	
export default {
    name:'project-index',
    components:{
        layoutHeader,layoutAside
    },
    data () {
        return {
            refresh:true
        }
    },
    methods:{
			
    },
    created() {
    },
    beforeDestroy() {
        this.$bus.off('click-refresh')
    },
    mounted() {
        this.$bus.on('click-refresh',() => {
            this.refresh = false
            this.$nextTick(()=>{
                this.refresh = true
            })
        })
    }
}
</script>

<style>
</style>
