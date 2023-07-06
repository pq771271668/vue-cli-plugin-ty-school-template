<template>
	<el-container
		:class="{
			'layout-simple':$setting.layout == 'simple',
			'layout-PC_at_APP':$util.isMobile() && !$setting.hasAPP()
		}">
		<el-header>
			<layout-header>
				<layout-aside v-if="$setting.layout == 'simple'"></layout-aside>
			</layout-header>
		</el-header>
		<el-container>
			<template v-if="$router.getRoutes().length == 1">
				<div class="flex w-100_per row-center">
					<el-result icon="warning" title="设置路由数据">
					</el-result>
				</div>
			</template>
			<template v-else>
				<el-aside :width="width" v-if="$setting.layout !== 'simple'">
					<layout-aside></layout-aside>
				</el-aside>
				<el-main>
					<template v-if="refresh">
						<keep-alive :include="KEEPALIVE">
							<router-view class="main-page"></router-view>
						</keep-alive>
					</template>
				</el-main>
			</template>
		</el-container>
	</el-container>
</template>
<script>
import layoutHeader from '@/components/layout/header.vue'
import layoutAside from '@/components/layout/aside.vue'
	
export default {
    name:'project-index',
    components:{
        layoutHeader,layoutAside
    },
	computed:{
		width () {
			return this.COLLAPSE ? 'auto':'220px'
		}
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

<style lang="scss">
	/* 抽离出滚动条样式，区分移动端，移动端不需要重置滚动条样式 */
	::-webkit-scrollbar {
		width: 15px;
		height: 15px;
	}
	::-webkit-scrollbar-track{
		background-color: rgba(0,0,0,0.05);
	}
	::-webkit-scrollbar-thumb {
		background-color: rgba(0,0,0,.1);
	}
	
	.el-container {
		height: 100%;
		& > .el-header {
			background: linear-gradient(90deg, #00A5FD 17.7%, #0068FF 83.2%);
			padding: 0 50px;
			& + .el-container {
				height: calc(100% - 60px);
				.el-aside {
				}
				& > .el-main {
					padding: 20px;
					height: 100%;
					position: relative;
					background-color: $--bg-color;
					.main-page {
						height:100%;
					}
				}
			}
		}
	}
	
</style>
