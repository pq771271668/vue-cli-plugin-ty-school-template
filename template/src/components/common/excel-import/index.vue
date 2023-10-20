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
						<div v-html="message"></div>
					</el-form-item>
					<el-form-item label="上传文件：" prop="fileList">
						<upload-index v-model="form.fileList" v-bind="uploadAttrs" v-on="$listeners" @on-success="uploadSuccess" ref="upload"></upload-index>
					</el-form-item>
				</el-form>
			</div>
			
		<div class="drawer-footer text-right">
		    <el-button size="medium" @click="closed">取消</el-button>
		    <el-button size="medium" type="primary" @click="onImport">导入</el-button>
		</div>
	</el-drawer>
</template>

<script>
// import Error from  './error.js'
export default {
    name:'excel-import',
	computed:{
		uploadAttrs () {
			return Object.assign({},{
				limit:1,
				accept:'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
				axiosParams:{
					resource:true
				}
			},this.upload)
		}
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
            
        }
    },
    methods:{
        onDownload () {
            this.$util.download(this.download.model,this.download.data,this.download.fileName)
        },
        cancel () {
            this.show = false
            this.visible = false
        },
        resetForm() {
            this.$refs['form'].resetFields();
        },
        closed () {
            this.cancel()
            this.resetForm()
        },
        onImport () {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    this.$refs.upload.submit();
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
		uploadSuccess (res) {
			const resp = res.data
			// console.log(resp)
			
			let arr = _.compact(resp.data.split('<br>'))
			// console.log(arr)
			let description = arr[arr.length - 1]
			
			arr.pop()
			let errorData = []
			if (arr.length > 0) {
				errorData = arr.map( item => {
					const _item = item.split('，')
					return {
						rowIndex:_item[0],
						msg:_item[1]
					}
				})
			}
			// console.log(errorData,description)
			this.$error({
				alertParams:{
					type:resp.code == 0?'success':'error',
					title:resp.code == 0?'导入成功':'导入失败',
					description
				},
				tableData:errorData,
				refresh:()=> {
					this.form.fileList = []
				},
				confirm:() => {
					this.visible = false
					this.onSuccess && this.onSuccess()
				}
			})
			
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
