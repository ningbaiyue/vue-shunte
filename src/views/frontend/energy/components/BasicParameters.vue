<template>
	<div class="ml20 mr20">
		<div class="nav-title mr20 mb10"><span class="xian"></span>基本参数</div>
		<el-divider />
		<el-row>
			<el-form ref="form" :model="form" label-width="200px">
				<el-col :span="8">
					<el-form-item label="储能单元装机容量(铭牌/标称)" prop="">
						<el-input v-model="form.installedCapacity" placeholder="请输入" disabled />
						<span>(50~5000kwh)</span>
					</el-form-item>
					<el-form-item label="储能单元额定容量" prop="">
						<el-input v-model="form.ratedCapacity" placeholder="请输入" disabled />
						<span>(50~5000kwh)</span>
					</el-form-item>
					<el-form-item label="储能单元铭牌功率" prop="">
						<el-input v-model="form.nameplatePower" placeholder="请输入" disabled />
						<span>(25~2500kw)</span>
					</el-form-item>
					<el-form-item label="系统电池类型">
						<el-select v-model="form.type" placeholder="请选择">
							<el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="电池单体数" prop="">
						<el-input v-model="form.monomer" placeholder="请输入" disabled />
						<span>(1~600)</span>
					</el-form-item>
					<el-form-item label="PCS台数" prop="">
						<el-input v-model="form.pcsNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
					<el-form-item label="空调台数" prop="">
						<el-input v-model="form.airNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
				</el-col>
				
				<el-col :span="8">
					<el-form-item label="运行模式">
						<el-select v-model="form.mode" placeholder="请选择">
							<el-option v-for="item in modeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="系统电网频率">
						<el-select v-model="form.frequency" placeholder="请选择">
							<el-option v-for="item in frequencyOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="额定电池总电压" prop="">
						<el-input v-model="form.totalVoltage" placeholder="请输入" disabled />
						<span>(0~38400V)</span>
					</el-form-item>
					<el-form-item label="电池安时数" prop="">
						<el-input v-model="form.ampereHours" placeholder="请输入" disabled />
						<span>(100~360Ah)</span>
					</el-form-item>
					<el-form-item label="电池簇数" prop="">
						<el-input v-model="form.clusters" placeholder="请输入" disabled />
						<span>(1~20)</span>
					</el-form-item>
					<el-form-item label="BMS台数" prop="">
						<el-input v-model="form.bmsNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
					<el-form-item label="消防控制台数" prop="">
						<el-input v-model="form.firefightingNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
				</el-col>
				
				<el-col :span="8">
					<el-form-item label="并机模式">
						<el-select v-model="form.parallelMode" placeholder="请选择">
							<el-option v-for="item in parallelModeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="WP台数" prop="">
						<el-input v-model="form.wpNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
					<el-form-item label="DCDC台数" prop="">
						<el-input v-model="form.dcdcNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
					<el-form-item label="本地EMS台" prop="">
						<el-input v-model="form.emsNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
					<el-form-item label="充电桩台数" prop="">
						<el-input v-model="form.chargingPilesNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
					<el-form-item label="PV台数" prop="">
						<el-input v-model="form.pvNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
					<el-form-item label="液冷机台数" prop="">
						<el-input v-model="form.coolerNum" placeholder="请输入" disabled />
						<span>(1~4)</span>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		
		<div class="flex">
			<div class="mr20">
				<div class="select-label">预设运行模式</div>
				<el-select v-model="runMode" placeholder="请选择">
					<el-option v-for="item in modeOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="mr20">
				<div class="select-label">预设运行功率工作模式</div>
				<el-select v-model="jobMode" placeholder="请选择">
					<el-option v-for="item in jobModeOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="mr20">
				<div class="select-label">电网或微网优先</div>
				<el-select v-model="gridOrMicrogrid" placeholder="请选择">
					<el-option v-for="item in gridOrMicrogridOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="mr20">
				<div class="select-label">配电功能使能禁止</div>
				<el-select v-model="enableOrDisable" placeholder="请选择">
					<el-option v-for="item in enableOrDisableOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="mr20">
				<div class="select-label">系统调度方式</div>
				<el-select v-model="schedulingMode" placeholder="请选择">
					<el-option v-for="item in schedulingModeOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div class="mr20">
				<div class="select-label">系统调度策略</div>
				<el-select v-model="schedulingPolicies" placeholder="请选择">
					<el-option v-for="item in schedulingPoliciesOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				<div class="select-label">功率调度优先级</div>
				<el-select v-model="schedulingPriority" placeholder="请选择">
					<el-option v-for="item in schedulingPriorityOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
		</div>
		
		<el-row :gutter="20">
			<el-col :span="12">
				<el-table :data="tableData1" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
					<el-table-column prop="name" label="参数名称"></el-table-column>
					<el-table-column prop="currentValue" label="当前值" width="150"></el-table-column>
					<el-table-column prop="valueRange" label="取值范围" width="150"></el-table-column>
				</el-table>
			</el-col>
			<el-col :span="12">
				<el-table :data="tableData2" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
					<el-table-column prop="name" label="参数名称"></el-table-column>
					<el-table-column prop="currentValue" label="当前值" width="150"></el-table-column>
					<el-table-column prop="valueRange" label="取值范围" width="150"></el-table-column>
				</el-table>
			</el-col>
		</el-row>
		
		<div class="nav-title mr20 mb10 mt20"><span class="xian"></span>空调</div>
		<el-divider />
		<el-row>
			<el-form ref="form" :model="ariForm" label-width="200px">
				<el-col :span="8">
					<el-form-item label="空调控制模式">
						<el-select v-model="ariForm.controlMode" placeholder="请选择">
							<el-option v-for="item in controlModeOptions" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="空调温度告警上限" prop="">
						<el-input v-model="ariForm.installedCapacity" placeholder="请输入" disabled />
						<span>(35~50°C)</span>
					</el-form-item>
					<el-form-item label="空调温度告警下限" prop="">
						<el-input v-model="ariForm.installedCapacity" placeholder="请输入" disabled />
						<span>(35~50°C)</span>
					</el-form-item>
				</el-col>
				<el-col :span="8">
					<el-form-item label="空调温度告警上限恢复值" prop="">
						<el-input v-model="ariForm.upperLimitRecovery" placeholder="请输入" disabled />
						<span>(18~30°C)</span>
					</el-form-item>
					<el-form-item label="空调温度告警下限恢复值" prop="">
						<el-input v-model="ariForm.lowerLimitRecovery" placeholder="请输入" disabled />
						<span>(18~30°C)</span>
					</el-form-item>
				</el-col>
			</el-form>
		</el-row>
		
		<div class="dialog-footer">
			<el-button @click="cancel(false)">取 消</el-button>
			<el-button type="primary" plain @click="appAll">应用全部</el-button>
			<el-button type="primary" @click="submitForm">保 存</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "BasicParameters",
	data() {
		return {
			form: {
				installedCapacity: '100',
				ratedCapacity: '200',
				nameplatePower: '200',
				type: '1',
				monomer: '240',
				pcsNum: '1',
				airNum: '1',
				mode: '1',
				frequency: '1',
				totalVoltage: '920',
				ampereHours: '280',
				clusters: '1',
				bmsNum: '1',
				firefightingNum: '1',
				parallelMode: '1',
				wpNum: '1',
				dcdcNum: '1',
				emsNum: '1',
				chargingPilesNum: '1',
				pvNum: '1',
				coolerNum: '1',
			},
			typeOptions: [
				{ value: '1', label: '磷酸铁锂电池' },
				{ value: '2', label: '三元锂电池' },
			],
			modeOptions: [
				{ value: '1', label: '并网' },
				{ value: '2', label: '离网' },
				{ value: '3', label: '并离网' },
			],
			frequencyOptions: [
				{ value: '1', label: '50Hz'},
				{ value: '2', label: '60Hz'},
			],
			parallelModeOptions: [
				{ value: '1', label: '单机' },
				{ value: '2', label: '双机' }
			],
			jobModeOptions: [
				{ value: '1', label: '交流恒功率' },
				{ value: '2', label: '直流恒流' },
				{ value: '3', label: '直流恒压' },
			],
			gridOrMicrogridOptions: [
				{ value: 'grid', label: '电网' },
				{ value: 'microgrid', label: '微网' },
			],
			enableOrDisableOptions: [
				{ value: 'enable', label: '启用' },
				{ value: 'disable', label: '禁止' },
			],
			schedulingModeOptions: [
				{ value: 'localScheduling', label: '本地调度' },
				{ value: 'coordinatedControl', label: '协调控制' },
				{ value: 'remoteScheduling', label: '远程调度' },
				{ value: 'hostAllocation', label: '主机分配' },
			],
			schedulingPoliciesOptions: [
				{ value: 'trackTheLoad', label: '跟踪负载' },
				{ value: 'fixedPower', label: '固定功率' },
				{ value: 'peaksAndValleys', label: '峰谷套利' },
				{ value: 'chargingPiles', label: '充电桩' },
				{ value: 'newEnergy', label: '新能源消纳' },
			],
			schedulingPriorityOptions: [
				{ value: 'have', label: '有功调度方式' },
				{ value: 'no', label: '无功调度方式' },
			],
			runMode: '1',
			jobMode: '1',
			gridOrMicrogrid: 'grid',
			enableOrDisable: 'enable',
			schedulingMode: 'localScheduling',
			schedulingPolicies: 'trackTheLoad',
			schedulingPriority: 'have',
			tableData1: [
				{ name: '预设运行功率(V)', currentValue: '300', valueRange: '300~2000' },
				{ name: '电网变压器功率容量(kW)', currentValue: '0', valueRange: '0~100000' },
				{ name: '电网变压器功率容量上限比值(%)', currentValue: '50', valueRange: '0~100' },
				{ name: '系统额定功率(kW)', currentValue: '300', valueRange: '0~4500' },
				{ name: '交流侧额定电压(V)', currentValue: '300', valueRange: '300~2000' },
				{ name: '放电交流侧限制功率点(kW)', currentValue: '50', valueRange: '0~4500' },
				{ name: '充电交流侧限制功率点(kW)', currentValue: '300', valueRange: '0~4500' },
				{ name: '放电交流限制流点(A)', currentValue: '0', valueRange: '0~4500' },
				{ name: '充电交流侧限制流点(A)', currentValue: '50', valueRange: '0~4500' },
				{ name: '最高SOC保护(‰)', currentValue: '300', valueRange: '800~1000' },
				{ name: '最低SOC保护(‰)', currentValue: '300', valueRange: '0~200' },
				{ name: '需量控制值(kW)', currentValue: '300', valueRange: '0~100000' },
				{ name: 'PCS设置无功功率（kVar）', currentValue: '50', valueRange: '0~100000' },
			],
			tableData2: [
				{ name: 'PCS额定功率(kW)', currentValue: '300', valueRange: '300~2000' },
				{ name: 'PCS设置有功功率(kW)', currentValue: '0', valueRange: '0~100000' },
				{ name: '交流侧额定功率(kW)', currentValue: '50', valueRange: '0~10000' },
				{ name: '交流侧额定电压(V)', currentValue: '0', valueRange: '0~800' },
				{ name: '需量控制使能', currentValue: '300', valueRange: '300~2000' },
				{ name: '需量控制值(kW)', currentValue: '50', valueRange: '0~4500' },
				{ name: '防逆流', currentValue: '300', valueRange: '0~4500' },
				{ name: '容量控制使能', currentValue: '0', valueRange: '0~4500' },
				{ name: '容量控制值(kW)', currentValue: '50', valueRange: '0~4500' },
				{ name: '电池单体最高温度制冷点(℃)', currentValue: '0', valueRange: '0~30' },
				{ name: '电池单体最低温度制冷点(℃)', currentValue: '30', valueRange: '0~30' },
				{ name: '电池平均温度制冷点(℃)', currentValue: '0', valueRange: '0~30' },
				{ name: '电池平均温度制热点(℃)', currentValue: '0', valueRange: '0~30' },
			],
			ariForm: {
				controlMode: 'auto',
				upperLimit: 35,
				lowerLimit: 10,
				upperLimitRecovery: 18,
				lowerLimitRecovery: 18,
			},
			controlModeOptions: [
				{ value: 'auto', label: '自动' },
				{ value: 'close', label: '关闭' },
				{ value: 'cool16', label: '制冷16°C' },
				{ value: 'cool18', label: '制冷18°C' },
			]
		}
	},
	mounted() {},
	methods: {
		cancel(flay) {
			flay = typeof flay != "boolean" ? false : flay;
			this.$emit('close', flay)
		},
		appAll() {},
		submitForm() {}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

::v-deep .el-form .el-input, ::v-deep .el-form .el-select {
	width: 70% !important;
	margin-right: 6px;
}
::v-deep .el-form .el-select .el-input {
	width: 100% !important;
	margin-right: 0;
}
::v-deep .el-divider--horizontal {
	margin: 10px auto;
}
.dialog-footer {
	text-align: center;
	margin-top: 30px;
}
.select-label {
	font-weight: bold;
	font-size: 14px;
	margin-bottom: 6px;
	margin-top: 20px;
}
</style>