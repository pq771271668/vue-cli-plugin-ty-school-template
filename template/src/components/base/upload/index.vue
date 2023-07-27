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
        	let type = file.type.split('/')
        	 let accept = this.$attrs.accept.split(',')
        	
        	const index = accept.findIndex( _accept => _accept.includes(type[0]) )
        	
        	/* type 第一个格式包含在 accept，在判断当前_accept是否为*，否则在判断当前的_accept是否包含type的第二个格式 */
        	if (index > -1) {
        		if (accept[index].includes('*') || accept[index].includes(type[1])) {
        			return true
        		}
        		else {
        			this.$tyToast(`上传的文件格式不正确!`);
        			return false
        		}
        	}
        	else {
        		this.$tyToast(`上传的文件格式不正确!`);
        		return false
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
