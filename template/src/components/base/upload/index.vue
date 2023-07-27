<!-- 

手动上传文件

v-model:[{
	name:'',
	uel:''
}]

tipText

axiosName

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
		
		:auto-upload="false"
		
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
				<div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
			</template>
			<template v-else>
				<el-button size="small" type="primary">上传文件</el-button>
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
        tipText:{
            type:String,
            default:''
        },
        axiosName:{
            type:String,
            required:true,
            default:''
        },
    },
    data () {
        return {}
    },
    methods:{
        handleExceed(files, fileList) {
            this.$tyToast(`<p class="line-height-24 font-16">当前限制选择 ${this.$attrs.limit} 个文件</p><p class="line-height-24 font-16">本次选择了 ${files.length} 个文件</p><p class="line-height-24 font-16">共选择了 ${files.length + fileList.length} 个文件</p>`);
        },
			
        beforeUpload(file) {
            if (this.$attrs.accept) {
                if (Array.isArray(this.$attrs.accept) && !this.$attrs.accept.includes(file.type)) {
                    this.$tyToast(`上传的文件格式不正确!`);
                    return false
                }
                else if (typeof this.$attrs.accept == 'string' && !this.$attrs.accept.split('/')[0] == file.type.split('/')[0]) {
                    this.$tyToast(`上传的文件格式不正确!`);
                    return false
                }
                else {
                    return true
                }
            }
            else {
                return true
            }
        },
        httpRequest (param) {
            const formData = new FormData()
            formData.append('file', param.file)
				
            formData.append('data', this.$attrs.data)
				
            this.$axios[this.axiosName]({
                data:formData
            })
                .then( res => {
                    // console.log(res);
					
                    this.$emit('on-success',res)
					
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
