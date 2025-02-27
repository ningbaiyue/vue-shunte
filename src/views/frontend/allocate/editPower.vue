<template>
	<div class="app-container">
		<!-- 步骤1：创建电站 -->
		<el-form ref="step1Form" :model="step1Data" :rules="rules" size="medium" label-width="100px">
			<el-row :gutter="10">
				<!-- 左列 -->
				<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="7">
					<el-card :body-style="{ paddingBottom: '0' }">
						<div class="form-title">基础信息</div>
						<el-form-item label="电站名称" prop="mobile">
							<el-input v-model="step1Data.mobile" placeholder="请输入电站名称" clearable :style="{width: '100%'}"></el-input>
						</el-form-item>
						<el-form-item label="安装时间" prop="time">
							<el-select v-model="step1Data.time" placeholder="请选择安装时间" clearable :style="{width: '100%'}">
								<el-option v-for="(item, index) in timeOptions" :key="index" :label="item.label" :value="item.value"
													 :disabled="item.disabled"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="业主姓名" prop="name">
							<el-input v-model="step1Data.name" placeholder="请输入业主姓名" clearable :style="{width: '100%'}"></el-input>
						</el-form-item>
						<el-form-item label="联系方式" prop="contact">
							<el-input v-model="step1Data.contact" placeholder="请输入联系方式" clearable :style="{width: '100%'}">
							</el-input>
						</el-form-item>
					</el-card>
					
					<el-card class="mt10" style="height: calc(100vh - 369px)">
						<div class="form-title">地理位置</div>
						<el-form-item label="国家" prop="country">
							<el-select v-model="step1Data.country" placeholder="请选择国家" clearable :style="{width: '100%'}">
								<el-option v-for="(item, index) in countryOptions" :key="index" :label="item.label"
													 :value="item.value" :disabled="item.disabled"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="省份" prop="province">
							<el-select v-model="step1Data.province" placeholder="请选择省份" clearable :style="{width: '100%'}">
								<el-option v-for="(item, index) in provinceOptions" :key="index" :label="item.label"
													 :value="item.value" :disabled="item.disabled"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="城市" prop="city">
							<el-select v-model="step1Data.city" placeholder="请选择城市" clearable :style="{width: '100%'}">
								<el-option v-for="(item, index) in cityOptions" :key="index" :label="item.label" :value="item.value"
													 :disabled="item.disabled"></el-option>
							</el-select>
						</el-form-item>
						<el-form-item label="详细地址" prop="address">
							<el-input v-model="step1Data.address" placeholder="请输入详细地址" clearable :style="{width: '100%'}">
							</el-input>
						</el-form-item>
						<el-form-item label="上传电站照片" prop="upload">
							<el-upload ref="upload" :file-list="uploadfileList" :action="uploadAction"
												 :before-upload="uploadBeforeUpload">
								<el-button size="small" type="primary" icon="el-icon-upload">点击上传</el-button>
							</el-upload>
						</el-form-item>
					</el-card>
				</el-col>
				<!-- 中列 -->
				<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="7">
					<el-card class="row-height" style="position: relative;">
						<div class="form-title">电站信息</div>
						<el-form-item label="电站类型" prop="powerType">
							<el-input v-model="step1Data.powerType" placeholder="请输入电站类型" :disabled='true' clearable
												:style="{width: '100%'}"></el-input>
						</el-form-item>
						<el-form-item label="装机容量" prop="installedCapacity">
							<el-input v-model="step1Data.installedCapacity" placeholder="请输入装机容量(kWh)" clearable
												:style="{width: '100%'}"></el-input>
						</el-form-item>
						<el-form-item label="装机功率" prop="installedPower">
							<el-input v-model="step1Data.installedPower" placeholder="请输入装机功率(kW)" clearable
												:style="{width: '100%'}"></el-input>
						</el-form-item>
						<el-form-item label="并网时间" prop="gridTime">
							<el-date-picker v-model="step1Data.gridTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
															:style="{width: '100%'}" placeholder="请选择并网时间" clearable></el-date-picker>
						</el-form-item>
						<el-form-item label="管理员" prop="field114">
							<el-input v-model="step1Data.field114" placeholder="请输入管理员" clearable :style="{width: '100%'}">
							</el-input>
						</el-form-item>
						<el-form-item label="管理员电话" prop="field115">
							<el-input v-model="step1Data.field115" placeholder="请输入管理员电话" clearable :style="{width: '100%'}">
							</el-input>
						</el-form-item>
						<el-form-item label="分时电价配置">
							<el-button type="primary" size="mini" @click="hourlyUpdate">修改</el-button>
						</el-form-item>
						<el-form-item label="绑定的设备">
							<el-button type="primary" size="mini" @click="deviceUpdate">修改</el-button>
						</el-form-item>
						<div class="footer-btn flex">
							<el-button type="info" size="large" plain @click="back">取消</el-button>
							<el-button type="primary" size="large" @click="handleFinalSubmit">保存</el-button>
						</div>
					</el-card>
				</el-col>
				<!-- 右列 -->
				<el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="10">
					<el-card>
						<div class="form-title">
							<span>经纬度定位</span>
							<span style="color: #b1b1b1; font-size: 14px; margin-left: 10px">(拖动红色标点定位地址)</span>
						</div>
						<bd-map ref="bdMap"></bd-map>
					</el-card>
				</el-col>
			</el-row>
		</el-form>
		<!-- 步骤2：电价配置弹出框 -->
		<el-dialog :title="title" :visible.sync="openHourly" width="900px">
			<hourly-power ref="hourlyPower" :init-data="step2Data"></hourly-power>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitFormHourly">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
		<!-- 步骤3：绑定设备弹出框 -->
		<el-dialog :title="title" :visible.sync="openDevice" width="500px">
			<el-form ref="form" :model="step2Data" :rules="rulesDevice" label-width="80px">
				<el-form-item label="设备ID" prop="deviceID">
					<el-input v-model="step2Data.deviceID" placeholder="请输入设备ID" clearable :style="{width: '100%'}">
					</el-input>
				</el-form-item>
				<el-form-item label="EMS ID" prop="emsID">
					<el-input v-model="step2Data.emsID" placeholder="请选择EMS ID" clearable :style="{width: '100%'}">
					</el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitFormDevice">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import bdMap from "@/views/frontend/components/bdMap";
import hourlyPower from "@/views/frontend/allocate/hourlyPower";

export default {
	name: 'editPower',
	components: {
		bdMap,
		hourlyPower
	},
	data() {
		return {
			hasUnsavedChanges: false, // 是否有未保存的更改
			step1Data: {
				mobile: '',
				time: undefined,
				name: undefined,
				contact: undefined,
				country: undefined,
				province: undefined,
				city: undefined,
				address: undefined,
				upload: null,
				powerType: undefined,
				installedCapacity: undefined,
				installedPower: undefined,
				gridTime: null,
				field114: undefined,
				field115: undefined,
			},
			step2Data: {
				tacticsName: '',
				effectiveTime: '',
				tableData: []
			},
			step3Data: {
				deviceID: '',
				emsID: ''
			},
			title: "", // 弹出层标题
			openHourly: false, // 是否显示弹出层
			openDevice: false, // 是否显示弹出层
			// 步骤1验证规则
			rules: {
				mobile: [{
					required: true,
					message: '请输入电站名称',
					trigger: 'blur'
				}],
				time: [{
					required: true,
					message: '请选择安装时间',
					trigger: 'change'
				}],
				name: [{
					required: true,
					message: '请输入业主姓名',
					trigger: 'blur'
				}],
				contact: [{
					required: true,
					message: '请输入联系方式',
					trigger: 'blur'
				}],
				country: [{
					required: true,
					message: '请选择国家',
					trigger: 'change'
				}],
				province: [{
					required: true,
					message: '请选择省份',
					trigger: 'change'
				}],
				city: [{
					required: true,
					message: '请选择城市',
					trigger: 'change'
				}],
				address: [{
					required: true,
					message: '请输入详细地址',
					trigger: 'blur'
				}],
				installedCapacity: [{
					required: true,
					message: '请输入装机容量(kWh)',
					trigger: 'blur'
				}],
				installedPower: [{
					required: true,
					message: '请输入装机功率(kW)',
					trigger: 'blur'
				}],
				gridTime: [{
					required: true,
					message: '请选择并网时间',
					trigger: 'change'
				}],
			},
			rulesDevice: {
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
			uploadAction: 'https://jsonplaceholder.typicode.com/posts/',
			uploadfileList: [],
			timeOptions: [{"label": "选项一", "value": 1}],
			countryOptions: [{"label": "选项一", "value": 1}, {"label": "选项二", "value": 2}],
			provinceOptions: [{"label": "选项一", "value": 1}],
			cityOptions: [{"label": "选项一", "value": 1}, {"label": "选项二", "value": 2}],
		}
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		// 页面保存--提交
		async handleFinalSubmit() {
			const payload = {
				...this.step1Data,
				...this.step2Data,
				...this.step3Data,
			};
			console.log('最终提交', payload)
			// 调用API提交
			// await api.submitData(payload);
			this.hasUnsavedChanges = false;
			this.$message.success('提交成功');
		},
		/** 电价配置---修改按钮操作 */
		hourlyUpdate(row) {
			this.title = "编辑分时电价";
			this.reset();
			this.openHourly = true;
			const postId = row.postId || this.ids
			/*getPost(postId).then(response => {
				this.form = response.data;
				this.openHourly = true;
			});*/
		},
		/** 电价配置---提交按钮 */
		submitFormHourly: function() {
			this.$refs["form"].validate(valid => {
				if (valid) {
					/*updatePost(this.form).then(response => {
					
					});*/
					this.$modal.msgSuccess("修改成功");
					this.openHourly = false;
				}
			});
		},
		/** 绑定设备---修改按钮操作 */
		deviceUpdate(row) {
			this.title = "编辑绑定的设备";
			this.reset();
			this.openDevice = true;
		},
		/** 绑定设备---提交按钮 */
		submitFormDevice: function() {
			this.$modal.msgSuccess("提交成功");
			this.openDevice = true;
		},
		// 取消按钮
		cancel() {
			this.openHourly = false;
			this.openDevice = false;
			this.reset();
		},
		// 表单重置
		reset() {
			this.form = {
				postId: undefined,
				postCode: undefined,
			};
			this.resetForm("form");
		},
		/*resetForm() {
			this.$refs['step1Form'].resetFields()
		},*/
		uploadBeforeUpload(file) {
			let isRightSize = file.size / 1024 / 1024 < 2
			if (!isRightSize) {
				this.$message.error('文件大小超过 2MB')
			}
			return isRightSize
		},
		back() {
			this.$router.push('/power/list')
		}
	},
	// 路由离开守卫
	beforeRouteLeave(to, from, next) {
		if (this.hasUnsavedChanges) {
			this.$confirm('数据未保存，确定离开吗？', '提示', {
				type: 'warning'
			}).then(() => next()).catch(() => {})
		} else {
			next()
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";
.el-dialog .app-container {
	padding: 0;
}
.app-container {
	.el-steps {
		width: 780px;
		align-content: center;
		::v-deep .el-step__head {
			position: relative;
			.el-step__icon {
				width: 32px;
				height: 32px;
			}
		}
		::v-deep .el-step__line {
			left: calc(12% + 76px);
			right: calc(12% - 30px);
			top: 15px;
		}
		::v-deep .el-step__main {
			position: absolute;
			top: 0;
			left: 42px;
			width: 68px;
			.el-step__title {
				line-height: 32px;
			}
		}
		::v-deep .is-success .el-step__line-inner {
			border-color: #6d8cf5;
		}
		::v-deep .is-success .is-text {
			background-color: #6d8cf5;
			color: #FFF;
			border-color: #6d8cf5;
		}
		::v-deep .el-step__title.is-success {
			color: #6d8cf5;
		}
	}
	.isColor ::v-deep .is-text {
		background-color: #6d8cf5;
		border-color: #6d8cf5;
		color: #fff;
	}
}
.box-card {
	min-height: calc(100vh - 140px);
	margin-top: 10px;
	position: relative;
}
.btn-group {
	position: absolute;
	bottom: 30px;
	right: 30px;
	.el-button {
		width: 180px;
		height: 54px;
		margin-left: 20px;
	}
}
</style>