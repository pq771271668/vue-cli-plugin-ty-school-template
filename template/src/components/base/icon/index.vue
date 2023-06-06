<!-- 自定义图片ICON -->
<template>
	<img 
		:src="src || require(`@/assets/images/icon/${name}.png`)" 
		:style="{
			'width':size,
			'height':size,
			'object-fit':fit
		}"
	/>
</template>

<script>
export default {
    name:'icon',
    props:{
        'src':{
            type:String
        },
        'name':{
            type:String
        },
        'size':{
            type:String,
            default:'14px'
        },
        'fit':{
            type:String
        }
    },
    data () {
        return {
				
        }
    }
}
</script>