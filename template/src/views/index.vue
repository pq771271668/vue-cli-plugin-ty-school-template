<template>
	<el-container
		:class="[
			'layout-'+$setting.layout
		]">
		<el-header>
			<layout-header :logo="logo">
				<layout-aside v-if="$setting.layout == 'simple'"></layout-aside>
			</layout-header>
		</el-header>
		<el-container>
			<el-aside :width="width" v-if="$setting.layout !== 'simple'">
				<div class="aside-narrow" v-if="$setting.layout == 'narrow' && !COLLAPSE">
					<el-image fit="contain" :src="logo"></el-image>
					<p>{{$setting.title}}</p>
				</div>
				
				<layout-aside></layout-aside>
			</el-aside>
			<el-main>
				<template v-if="refresh">
					<keep-alive :include="KEEPALIVE">
						<router-view class="main-page" :style="{'--sideWidth':width}"></router-view>
					</keep-alive>
				</template>
			</el-main>
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
			return this.COLLAPSE ? '64px':'220px'
		}
	},
    data () {
        return {
            refresh:true,
			logo:require('@/assets/images/logo.png'),
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
