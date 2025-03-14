<template>
	<div class="ml20 mr20">
		<el-form :model="configForm">
			<el-form-item label="控制策略">
				<el-radio v-model="configForm.controlStrategies" label="1" border>削峰填谷</el-radio>
			</el-form-item>
			<el-form-item label="控制策略">
				<el-checkbox-group v-model="configForm.extendedControl" size="small">
					<el-checkbox label="a" border>需量控制</el-checkbox>
					<el-checkbox label="b" border>防逆流控制</el-checkbox>
					<el-checkbox label="c" border>PV交流耦合</el-checkbox>
					<el-checkbox label="d" border>PV直流耦合</el-checkbox>
					<el-checkbox label="e" border>容量控制</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
		</el-form>
		<div class="nav-title mr20 mb10"><span class="xian"></span>分时控制</div>
		<el-table :data="tableList" stripe border>
			<el-table-column label="序号" type="index" align="center" width="50">
				<template slot-scope="scope">
					<span>{{ scope.$index + 1}}</span>
				</template>
			</el-table-column>
			<el-table-column prop="timeRange" label="时间段(hh:mm)" width="150"></el-table-column>
			<el-table-column label="运行模式">
				<template slot-scope="scope">
					<el-select v-model="scope.row.operationMode" placeholder="请选择运行模式">
						<el-option label="并网" value="并网"></el-option>
						<el-option label="离网" value="离网"></el-option>
						<el-option label="并离网" value="并离网"></el-option>
						<el-option label="尖峰" value="尖峰"></el-option>
						<el-option label="低谷" value="低谷"></el-option>
					</el-select>
				</template>
			</el-table-column>
			<el-table-column prop="functionControlMode" label="功能控制模式"></el-table-column>
			<el-table-column prop="gridFunction" label="并网功能(110~110kW)"></el-table-column>
		</el-table>
		
		<div class="dialog-footer">
			<el-button @click="cancel(false)">取 消</el-button>
			<el-button type="primary" @click="submitForm">保 存</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "ControlPolicy",
	data() {
		return {
			configForm: {
				controlStrategies: '1',
				extendedControl: []
			},
			tableList: [
				{ timeRange: '00:00~00:30', operationMode: '并网', functionControlMode: '键合套利', gridFunction: '-20' },
				{ timeRange: '00:30~01:00', operationMode: '并网', functionControlMode: '键合套利', gridFunction: '-20' },
			]
		}
	},
	methods: {
		submitForm() {},
		cancel(flay) {
			flay = typeof flay != "boolean" ? false : flay;
			this.$emit('close', flay)
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

.dialog-footer {
	text-align: center;
	margin-top: 30px;
}
</style>