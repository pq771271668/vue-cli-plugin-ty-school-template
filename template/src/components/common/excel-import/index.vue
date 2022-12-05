<template>
	<el-drawer
		size="460px"
		append-to-body
		title="导入"
		v-if="show"
		:visible.sync="visible"
		@closed="closed"
		>
			<div class="drawer-body">
				<el-form :model="form" :rules="rules" ref="form" label-width="100px" size="small">
					<el-form-item label="导入模板：" >
						<el-link type="primary" @click="onDownload">点击下载导入模板</el-link>
					</el-form-item>
					<el-form-item label="导入说明：" >
						<slot name="message">
							<p>1.下载导入模板，批量填写信息 。</p>
							<p>2.上传填好的信息表。</p>
							<p>3.导入时间，与你导入的内容量有关，请耐心等待。</p>
							<p>4.若导入失败，请根据错误原因修改后重新上传。</p>
						</slot>
					</el-form-item>
					<el-form-item label="上传文件：" prop="fileList">
						<upload v-bind="$attrs" v-on="$listeners"></upload>
					</el-form-item>
				</el-form>
			</div>
			
		<div class="drawer-footer text-center">
		    <el-button size="medium" @click="closed">取消</el-button>
		    <el-button size="medium" type="primary" @click="onImport">导入</el-button>
		</div>
	</el-drawer>
</template>

<script>
import Error from  './error.js'
import upload from '@/components/base/upload/index.vue'
// import axios from 'axios'
export default {
    name:'import',
    components: {
        upload
    },
    data () {
        return {
            show:false,
            form:{
                fileList:[]
            },
            rules:{
                fileList:[
                    { required: true, message: '请选择上传文件', trigger: 'blur' },
                ]
            },
            limit:1,
            accept:'.xls,.xlsx'
        }
    },
    methods:{
        onDownload () {
            const filename = this.name+'模板_'+this.$util.timeFormat(new Date(),'yyyy_MM_dd_hh_mm_ss') 
            this.$util.download('xhr',this.download,filename)
        },
        cancel () {
            this.show = false
            this.visible = false
        },
        resetForm(formName) {
            this.$refs['form'].resetFields();
        },
        closed () {
            this.cancel()
            this.resetForm()
        },
        onImport (success) {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // this.$refs.upload.submit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
    created() {
        this.show = true
        this.$nextTick( () => {
            this.visible = true
        })
    }
}
</script>

<style lang="scss" scoped>
</style>
