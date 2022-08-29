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
						<p>1.下载导入模板，批量填写信息 。</p>
						<p>2.上传填好的信息表。</p>
						<p>3.导入时间，与你导入的内容量有关，请耐心等待。</p>
						<p>4.若导入失败，请根据错误原因修改后重新上传。</p>
					</el-form-item>
					<el-form-item label="上传文件：" prop="fileList">
						<el-upload
							ref="upload"
							action=""
							:limit="limit"
							:file-list="form.fileList"
							
							:auto-upload="false"
							:http-request="httpRequest"
							
							:on-exceed="handleExceed"
							:before-upload="beforeUpload"
							:on-change="onChange"
							:on-remove="onRemove"
							
							:accept="accept"
							>
							<el-button size="medium" type="primary">选择文件</el-button>
							<div slot="tip" class="el-upload__tip">只能上传{{limit}}个excel文件</div>
						</el-upload>
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
	import axios from 'axios'
	export default {
		name:'import',
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
				axios.get(Object.assign({},this.download,{
					responseType: "blob"
				}))
				.then ( res => {
					if(!res) return
					const blob = new Blob([res.data], { type: 'application/vnd.ms-excel' }) // 构造一个blob对象来处理数据，并设置文件类型
					 
					const filename = this.name+'模板_'+this.$util.timeFormat(new Date(),'yyyy_MM_dd_hh_mm_ss') 
					if (window.navigator.msSaveOrOpenBlob) { //兼容IE10
						navigator.msSaveBlob(blob, filename)
					} else {
						const href = URL.createObjectURL(blob) //创建新的URL表示指定的blob对象
						const a = document.createElement('a') //创建a标签
						a.style.display = 'none'
						a.href = href // 指定下载链接
						a.download = filename //指定下载文件名
						a.click() //触发下载
						URL.revokeObjectURL(a.href) //释放URL对象
					}
				})
			},
			handleExceed(files, fileList) {
				this.$tyToast(`<p class="line-height-24 font-16">当前限制选择 ${this.limit} 个文件</p><p class="line-height-24 font-16">本次选择了 ${files.length} 个文件</p><p class="line-height-24 font-16">共选择了 ${files.length + fileList.length} 个文件</p>`);
			},
			
			beforeUpload(file) {
				const xls = file.type === 'application/vnd.ms-excel';
				const xlsx = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
		
				if (!xls && !xlsx) {
				  this.$tyToast('上传文件只能是Excel格式文件!');
				}
				return xls || xlsx;
			},
			httpRequest (param) {
				const formData = new FormData()
				formData.append('file', param.file)
				
				this.$axios[this.upload.axiosName]({
					data:formData
				})
				.then( res => {
					// console.log(res);
					
					this.$axios[this.import.axiosName]({
						data:Object.assign({},this.import.data,{
							excelUrl:res
						})
					})
					.then( resp => {
						// console.log(resp)
						if (resp.successCount == -1) {
							let arr = _.compact(resp.message.split('<br>'))
							
							let errorData = arr.map( item => {
								const _item = item.split('，')
								return {
									rowIndex:_item[0],
									msg:_item[1]
								}
							})
							// console.log(errorData)
							Error({
								tableData:errorData
							}) 
							
						}
						else {
							this.$tyToast({
								type:'success',
								message:'导入成功'
							})
							this.closed()
							this.onSuccess && this.onSuccess()
						}
						
					})
					
				})
				
			},
			onChange (file, fileList) {
				this.form.fileList = fileList
			},
			onSuccess (response, file, fileList) {
				this.form.fileList = fileList
			},
			onRemove(file, fileList) {
				this.form.fileList = fileList
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
						this.$refs.upload.submit();
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
