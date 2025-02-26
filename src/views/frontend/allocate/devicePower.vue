<template>
	<div>
		<slot name="title"></slot>
		<el-form ref="form" :model="formData" :rules="rules"  size="medium" :inline="true">
			<el-form-item label="设备ID" prop="deviceID">
				<el-input v-model="formData.deviceID" placeholder="请输入设备ID" clearable :style="{width: '100%'}">
				</el-input>
			</el-form-item>
			<el-form-item label="EMS ID" prop="emsID">
				<el-input v-model="formData.emsID" placeholder="请选择EMS ID" clearable :style="{width: '100%'}">
				</el-input>
			</el-form-item>
		</el-form>
		<slot name="footer"></slot>
	</div>
</template>
<script>
export default {
	props: {
		initData: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			formData: { ...this.initData },
			rules: {
				deviceID: [{
					required: true,
					message: '请输入设备ID',
					trigger: 'blur'
				}],
				emsID: [{
					required: true,
					message: '请选择EMS ID',
					trigger: 'blur'
				}],
			},
		}
	},
	watch: {
		initData: {
			deep: true,
			handler(newVal) {
				console.log(newVal, '第三步数据')
				this.formData = { ...newVal };
			},
		},
	},
	methods: {
		validate() {
			return new Promise((resolve) => {
				this.$refs.form.validate((valid) => {
					if (valid) {
						resolve({
							valid: true,
							data: { ...this.formData },
						});
					} else {
						resolve({ valid: false });
					}
				});
			});
		},
	}
}

</script>
<style>
</style>
