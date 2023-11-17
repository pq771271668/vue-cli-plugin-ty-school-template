<template>
	<div 
		v-if="!_.isEmpty(options)"
		class="campus-query-fixed" 
		@click="onShow"
		@touchstart="onMousedown"
		@touchmove="onMousemove" 
		@touchend="onMouseup" 
		:style="{'top':Y+'px'}"
		>
		<span>校区</span>
		<van-icon name="arrow" />
		
		
		<van-popup v-model="show" position="center" get-container="body" class="campus-query-fixed_wrap">
			<div class="campus-query-fixed_campus">
				<p class="van-hairline--bottom">切换校区</p>
				<van-radio-group v-model="localStorageCampusId" @change="changeLocalStorageCampusId">
					<ul class="campus-query-fixed_items">
						<li 
							v-for="option in options" 
							:key="option.value">
							<label class="" @click.stop="onCampus(option)"
								:class="{'active':campusId == option.value}">
								{{option.label}}
							</label>
							<van-radio :name="option.value" :disabled="option.disabled">
								<template #icon="props">
									<img class="campus-icon" :src="props.checked ? activeIcon : inactiveIcon" />
								</template>
							</van-radio>
						</li>
					</ul>
				</van-radio-group>
			</div>
		</van-popup>
		
	</div>
</template>

<script>
	
/* 
@create-campus 
@change-campus 
 */	
export default {
    props:{
        /* 校区数据 */
        'options':{
            type:Array
        },
        /* 是否选择之后关闭弹框 */
        'immediate-show':{
            type:Boolean,
            default:false
        }
    },
    watch:{
        'options':{
            handler (newVal) {
                if (!_.isEmpty(newVal)) {
                    let appCampus = localStorage.getItem('appCampus')
                    if(appCampus && appCampus !=="undefined" && appCampus !=="null"){
					    appCampus = JSON.parse(appCampus)
					    if (!this.options.find( option => option.value == appCampus.value)) {
					        appCampus = {}
					    }
                    }
                    else {
					    appCampus = {}
                    }
					
                    this.localStorageCampusId = this.campusId = (!_.isEmpty(appCampus) && appCampus.value) || (!_.isEmpty(this.options) && this.options[0].value)
					
                    this.$emit('create-campus',this.campusId)
                }
            },
            immeidate:true
        },
	    'localStorageCampusId':{
	        handler (newVal) {
	            if (newVal) {
	                const campusOption = this.options.find( option => option.value == newVal) || {}
	                !_.isEmpty(campusOption) && localStorage.setItem('appCampus',JSON.stringify(campusOption))
	            }
	        },
	        immediate:true
	    },
    },
    data () {
        return {
			
            activeIcon: require('./campus-selected.png'),
            inactiveIcon: require('./campus-unselect.png'),
            localStorageCampusId:'',
			
            show:false,
            campusId:'',
            move:false,
            Y:'',
            maxY:0,
            minY:120,
        }
    },
    methods:{
        changeLocalStorageCampusId (campusId) {
		    const campusOption = this.options.find( option => option.value == campusId)
		    this.$tyToast({
		        type:'success',
		        message:'已将默认校区设置为<br /><span class="text-primary">'+campusOption.label+'</span>'
		    })
        },
        onShow () {
            this.show = true
        },
        onClose () {
            this.show = false
        },
        onCampus (option) {
            this.campusId = option.value
            this.immediateShow && this.onClose()
            this.$emit('change-campus',this.campusId)
        },
        onMousedown (e) {
		    this.move = true
		    this.maxY = e.view.innerHeight - 75
        },
        onMousemove (e) {
		    e.preventDefault();
		    if (this.move) {
		        this.Y = e.touches[0].pageY
		        if (this.Y >= this.maxY) {
		            this.Y = this.maxY
		        }
		        else if (this.Y <= this.minY) {
		            this.Y = this.minY
		        }
					
		    }
        },
        onMouseup () {
		    this.move = false
        },
    },
    created() {
		
       
        
    }
}
</script>

<style lang="scss">
	.campus-query-fixed {
		position: fixed;
		z-index: 2;
		background-color: #FFF;
		font-size: 12px;
		// width: 70px;
		padding: 12px 16px;
		// height: 36px;
		display: flex;
		align-items: center;
		justify-content: center;
		box-shadow: 0 0 10px 0px rgba(0,0,0,0.1);
		color: $--color-primary;
		border-radius: 0 36px 36px 0;
		top: 50%;
		margin-top: -18px;
	}
	.campus-query-fixed_wrap {
		border-radius: 6px;
	}
	.campus-query-fixed_campus {
		padding: 10px;
		width: 230px;
		// min-height: 180px;
		p {
			text-align: center;
			padding-bottom: 10px;
		}
	}
	.campus-query-fixed_items {
		max-height: 60vh;
		// padding: 10px 0;
		overflow: auto;
		li {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 10px 0;
			label {
				flex: 1;
				line-height: 16px;
				padding:7px 10px;
				width: 160px;
				margin-right: 20px;
				text-align: center;
				border-radius: 4px;
				color: $--color-text-secondary;
				@include ellipsis();
				&.active {
					background-color: $--color-primary;
					color: #FFFFFF;
				}
			}
			.campus-icon {
				width: 20px;
				height: 20px;
				vertical-align: baseline;
			}
		}
	}
</style>