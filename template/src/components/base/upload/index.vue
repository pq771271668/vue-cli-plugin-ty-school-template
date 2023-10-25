<!-- 

手动上传文件

v-model:[{
	name:'',
	url:''
}]

buttonText

tipText

axiosName

axiosParams:axios参数

max-size : 文件大小【M】

submit()

@on-success

继承el-upload 

注意：如果是需要设置drag，需设置为:drag="true"
 -->


<template>
	<el-upload
		ref="upload"
		action=""
		
		v-bind="$attrs"
		
		:auto-upload="$attrs['auto-upload'] || false"
		
		:file-list="value"
		
		:http-request="httpRequest"
		:on-exceed="handleExceed"
		:before-upload="beforeUpload"
		:on-change="onChange"
		:on-remove="onRemove"

		>
		
		<slot>
			<template v-if="$attrs.drag">
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">将{{buttonText}}拖到此处，或<em>点击上传</em></div>
			</template>
			<template v-else>
				<el-button size="small" type="primary">{{buttonText}}</el-button>
			</template>
		</slot>
		
		<slot name="file" slot-scope="{file}" slot="file" :file="file"></slot>
		
		<slot name="tip" slot="tip" v-if="tipText">
			<div class="el-upload__tip">{{tipText}}</div>
		</slot>
		
	</el-upload>
</template>

<script>
export default {
    name:'upload',
    props:{
        value:{},
        buttonText:{
            type:String,
            default:'上传文件'
        },
        tipText:{
            type:String,
            default:''
        },
        maxSize:{},
        axiosName:{
            type:String,
            required:true,
            default:''
        },
        axiosParams:{
            type:Object,
            default:() => {
                return {}
            }
        },
        conversion:{
            type:Function
        }
    },
    data () {
        return {}
    },
    methods:{
        handleExceed(files, fileList) {
            this.$tyToast(`<p class="line-height-24 font-16">当前限制选择 ${this.$attrs.limit} 个文件</p><p class="line-height-24 font-16">本次选择了 ${files.length} 个文件</p><p class="line-height-24 font-16">共选择了 ${files.length + fileList.length} 个文件</p>`);
        },
			
        beforeUpload(file) {
            const size = file.size/1024/1024
			
            if (this.$attrs.accept && !this.$attrs.accept.includes(file.type)) {
                this.$tyToast(`${this.buttonText}格式不正确`);
                return false
            }
            else if (this.maxSize && this.maxSize < size) {
                this.$tyToast(`${this.buttonText}超出大小`);
                return false
            }
            else {
                return true
            }
        },
        async httpRequest (param) {
            // console.log('httpRequest',param)
            let file = param.file
            if (typeof this.conversion == 'function') {
                file = await this.conversion(file)
            }
			
            const formData = new FormData()
            formData.append('file', file)
				
            formData.append('data', this.$attrs.data)
				
            this.$axios[this.axiosName](Object.assign({},this.axiosParams,{
                data:formData
            }))
                .then( res => {
                    // console.log(res);
                    this.$emit('on-success',res,file)
                })
        },
        onChange (file, fileList) {
            this.onRefresh(fileList)
        },
        onSuccess (response, file, fileList) {
            this.onRefresh(fileList)
        },
        onRemove(file, fileList) {
            this.onRefresh(fileList)
        },
        onRefresh (fileList) {
            this.$emit('input',fileList)
        },
        submit () {
            this.$refs.upload.submit();
        }
    }
}
</script>

<style lang="scss">
</style>
