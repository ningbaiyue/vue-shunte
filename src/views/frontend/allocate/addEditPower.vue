<template>
	<div class="app-container">
		<el-card class="flex justify-center">
			<el-steps :active="activeStep" finish-status="success">
				<template v-for="(item, index) in stepList">
					<el-step :title="item" :class="{isColor: index === activeStep}">
					</el-step>
				</template>
			</el-steps>
		</el-card>
		<!-- 步骤1：创建电站 -->
		<div v-show="activeStep === 0">
			<el-form ref="step1Form" :model="step1Data" :rules="step1Rules" size="medium" label-width="100px">
				<el-row :gutter="10" class="mt10">
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
						
						<el-card class="mt10">
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
						<el-card>
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
							<el-form-item size="large">
								<el-button type="primary" @click="validateStep1">完成创建</el-button>
							</el-form-item>
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
			
		</div>
		<!-- 步骤2：电价配置 -->
		<el-card class="box-card" v-show="activeStep === 1">
			<hourly-power ref="hourlyPower" :init-data="step2Data">
				<template slot="title">
					<div class="form-title text-center">分时电价配置</div>
				</template>
				<template #footer>
					<div class="btn-group">
						<div>
							<el-button type="info" size="large" plain @click="activeStep = 0">跳过</el-button>
							<el-button type="primary" size="large" @click="handleStep2Next">下一步</el-button>
						</div>
					</div>
				</template>
			</hourly-power>
		</el-card>
		<!-- 步骤3：绑定设备 -->
		<el-card class="box-card" v-show="activeStep === 2">
			<device-power ref="devicePower" :init-data="step3Data">
				<template slot="title">
					<div class="form-title text-center">绑定设备信息</div>
				</template>
				<template #footer>
					<div class="btn-group">
						<div>
							<el-button type="info" size="large" plain @click="activeStep = 1">跳过</el-button>
							<el-button type="primary" size="large" @click="handleFinalSubmit">完成</el-button>
						</div>
					</div>
				</template>
			</device-power>
		</el-card>
	</div>
</template>

<script>
import bdMap from "@/views/frontend/components/bdMap";
import hourlyPower from "@/views/frontend/allocate/hourlyPower";
import devicePower from "@/views/frontend/allocate/devicePower";

export default {
	name: 'addEdit',
	components: {
		bdMap,
		hourlyPower,
		devicePower,
	},
	data() {
		return {
			activeStep: 0,
			stepList: ['创建电站', '电价配置', '绑定设备'],
			hasUnsavedChanges: false, // 是否有未保存的更改
			// 各步骤数据独立存储
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
			// 步骤1验证规则
			step1Rules: {
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
			uploadAction: 'https://jsonplaceholder.typicode.com/posts/',
			uploadfileList: [],
			timeOptions: [{
				"label": "选项一",
				"value": 1
			}, {
				"label": "选项二",
				"value": 2
			}],
			countryOptions: [{
				"label": "选项一",
				"value": 1
			}, {
				"label": "选项二",
				"value": 2
			}],
			provinceOptions: [{
				"label": "选项一",
				"value": 1
			}, {
				"label": "选项二",
				"value": 2
			}],
			cityOptions: [{
				"label": "选项一",
				"value": 1
			}, {
				"label": "选项二",
				"value": 2
			}],
		}
	},
	watch: {},
	created() {},
	mounted() {},
	methods: {
		// 步骤1验证
		async validateStep1() {
			try {
				await this.$refs['step1Form'].validate()
				this.activeStep = 1
				this.hasUnsavedChanges = true
				this.step1Data = { ...this.step1Data, ...this.$refs['bdMap'].form}
				console.log(this.step1Data,this.$refs['bdMap'].form,'获取位置')
			} catch (error) {
				console.error('表单验证失败:', error)
			}
		},
		// 步骤2下一步
		async handleStep2Next() {
			const result = await this.$refs.hourlyPower.validate();
			if (result.valid) {
				console.log(result, '异步第二步')
				this.step2Data = result.data
				this.activeStep = 2;
			}
		},
		// 最终提交
		async handleFinalSubmit() {
			const result = await this.$refs.devicePower.validate();
			if (result.valid) {
				this.step3Data = result.data
				const payload = {
					...this.step1Data,
					...this.step2Data,
					...this.step3Data,
				};
				console.log('最终提交', result, payload)
				// 调用API提交
				// await api.submitData(payload);
				this.hasUnsavedChanges = false;
				this.$message.success('提交成功');
			}
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