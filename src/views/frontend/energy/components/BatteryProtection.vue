<template>
	<div class="ml20 mr20">
		<div class="nav-title mr20 mb10"><span class="xian"></span>分时电价管理</div>
		<el-row :gutter="20" class="mt10">
			<el-col :span="12">
				<div class="flex justify-between mb10">
					<span style="font-size: 16px; font-weight: bold">电池保护参数</span>
					<el-switch v-model="batteryValue1" active-color="#13ce66" inactive-color="#c7c7c7"></el-switch>
				</div>
				<el-table :data="tableData1" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
					<el-table-column prop="name" label="参数名称"></el-table-column>
					<el-table-column prop="currentValue" label="当前值" width="150"></el-table-column>
					<el-table-column prop="valueRange" label="取值范围" width="150"></el-table-column>
				</el-table>
			</el-col>
			<el-col :span="12">
				<div class="flex justify-between mb10">
					<span style="font-size: 16px; font-weight: bold">电池总电压保护</span>
					<el-switch v-model="batteryValue2" active-color="#13ce66" inactive-color="#c7c7c7"></el-switch>
				</div>
				<el-table :data="tableData2" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
					<el-table-column prop="name" label="参数名称"></el-table-column>
					<el-table-column prop="currentValue" label="当前值" width="150"></el-table-column>
					<el-table-column prop="valueRange" label="取值范围" width="150"></el-table-column>
				</el-table>
			</el-col>
		</el-row>
		
		<div class="nav-title mr20 mb10 mt20"><span class="xian"></span>电池三级告警保护参数</div>
		<el-row :gutter="20" class="mt10">
			<el-col :span="8">
				<el-table :data="tableData3" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
					<el-table-column label="一级报警门限设置" align="center" class-name="green">
						<el-table-column prop="name" label="参数名称"></el-table-column>
						<el-table-column prop="unit" label="单位" width="80"></el-table-column>
						<el-table-column prop="alarm" label="告警"></el-table-column>
						<el-table-column prop="recover" label="恢复"></el-table-column>
						<el-table-column prop="valueRange" label="取值范围"></el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="8">
				<el-table :data="tableData3" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
					<el-table-column label="二级报警门限设置" align="center" class-name="yellow">
						<el-table-column prop="name" label="参数名称"></el-table-column>
						<el-table-column prop="unit" label="单位" width="80"></el-table-column>
						<el-table-column prop="alarm" label="告警"></el-table-column>
						<el-table-column prop="recover" label="恢复"></el-table-column>
						<el-table-column prop="valueRange" label="取值范围"></el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
			<el-col :span="8">
				<el-table :data="tableData3" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
					<el-table-column label="三级报警门限设置" align="center" class-name="orange">
						<el-table-column prop="name" label="参数名称"></el-table-column>
						<el-table-column prop="unit" label="单位" width="80"></el-table-column>
						<el-table-column prop="alarm" label="告警"></el-table-column>
						<el-table-column prop="recover" label="恢复"></el-table-column>
						<el-table-column prop="valueRange" label="取值范围"></el-table-column>
					</el-table-column>
				</el-table>
			</el-col>
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
	name: "BatteryProtection",
	data() {
		return {
			batteryValue1: false,
			batteryValue2: true,
			tableData1: [
				{ name: 'SOC保护上限2级', currentValue: '300', valueRange: '0~100%' },
				{ name: 'SOC保护上限2级恢复', currentValue: '0', valueRange: '0~100%' },
				{ name: 'SOC保护上限1级', currentValue: '80', valueRange: '0~100%' },
				{ name: 'SOC保护上限1级恢复', currentValue: '100', valueRange: '0~100%' },
				{ name: 'SOC保护下限1级恢复', currentValue: '100', valueRange: '0~100%' },
				{ name: 'SOC保护下限1级', currentValue: '50', valueRange: '0~100%' },
				{ name: 'SOC保护下限2级恢复', currentValue: '100', valueRange: '0~100%' },
				{ name: 'SOC保护下限2级', currentValue: '0', valueRange: '0~100%' },
				{ name: 'SOC保护浮动滞后值', currentValue: '50', valueRange: '0~5%' },
				{ name: 'SOC控制告警延迟时间', currentValue: '0', valueRange: '0~60s' },
				{ name: 'SOC控制告警恢复时间', currentValue: '60', valueRange: '0~60s' },
			],
			tableData2: [
				{ name: '电池总电压保护上限2级', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护上限2级恢复', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护上限1级', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护上限1级恢复', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护下限1级恢复', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护下限1级', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护下限2级恢复', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护下限2级', currentValue: '300', valueRange: '0-2500V' },
				{ name: '电池总电压保护浮动滞后值', currentValue: '300', valueRange: '0-20V' },
				{ name: '电池总电压控制告警延迟时间', currentValue: '300', valueRange: '0-60s' },
				{ name: '电池总电压控制告警恢复时间', currentValue: '300', valueRange: '0-60s' },
			],
			tableData3: [
				{ name: '单体过压', unit: '(mv)', alarm: '3500', recover: '3500', valueRange: '3500~3750' },
				{ name: '单体欠压', unit: '(mV)', alarm: '2500', recover: '2500', valueRange: '2500~2900' },
				{ name: '系统过压', unit: '(0.1V)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '系统欠压', unit: '(0.1V)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '充电过流', unit: '(0.1A)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '放电过流', unit: '(0.1A)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '绝缘过低', unit: '(Ω/V)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '单体压差过高', unit: '(mV)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '充电过温', unit: '(0.1°C)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '放电过温', unit: '(0.1°C)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '放电欠温', unit: '(0.1°C)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '极耳过温', unit: '(0.1°C)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '高压箱过温', unit: '(0.1°C)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: '温差过大', unit: '(0.1°C)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
				{ name: 'SOC LoW', unit: '(0.1%)', alarm: '7700', recover: '7900', valueRange: '3500~3750' },
			]
		}
	},
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

.dialog-footer {
	text-align: center;
	margin-top: 30px;
}
::v-deep .el-table__header {
	.green {
		background: #BFEED0 !important;
	}
	.yellow {
		background: #FFFFCA !important;
	}
	.orange {
		background: #FBE1BD !important;
	}
}
</style>