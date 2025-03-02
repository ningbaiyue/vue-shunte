<template>
	<div class="app-container">
		<el-card body-style="padding:10px" class="mb10">
			<div class="flex-space-between">
				<div class="nav-title"><span class="xian"></span>电表信息</div>
<!--				<el-button type="primary" size="mini" @click="">配置</el-button>-->
			</div>
		</el-card>
		<!--	储能电表表格	-->
		<el-card class="mb10">
			<div class="card-title mb10"><span class="dian"></span>储能电表</div>
			<el-row :gutter="30">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">49.99</div>
							<div>频率 (Hz)</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">14696.4</div>
							<div>正向有功总电能 (kWh)</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">14696.4</div>
							<div>反向有功总电能 (kWh)</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-table :data="tableData1" show-summary sum-text="总计" stripe style="width: 100%">
				<el-table-column prop="phase" label="名称" width="180"></el-table-column>
				<el-table-column prop="voltage" label="电压 (V)"></el-table-column>
				<el-table-column prop="current" label="电流 (A)"></el-table-column>
				<el-table-column prop="activePower" label="有功功率 (kW)"></el-table-column>
				<el-table-column prop="reactivePower" label="无功功率 (kVar)"></el-table-column>
				<el-table-column prop="apparentPower" label="视在功率 (kVA)"></el-table-column>
				<el-table-column prop="powerFactor" label="功率因数"></el-table-column>
			</el-table>
		</el-card>
		<!--	负载电表表格	-->
		<el-card class="mb10">
			<div class="card-title mb10"><span class="dian"></span>负载电表</div>
			<el-row :gutter="30">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">49.99</div>
							<div>频率 (Hz)</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">14696.4</div>
							<div>正向有功总电能 (kWh)</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">14696.4</div>
							<div>反向有功总电能 (kWh)</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-table :data="tableData1" show-summary sum-text="总计" stripe style="width: 100%">
				<el-table-column prop="phase" label="名称" width="180"></el-table-column>
				<el-table-column prop="voltage" label="电压 (V)"></el-table-column>
				<el-table-column prop="current" label="电流 (A)"></el-table-column>
				<el-table-column prop="activePower" label="有功功率 (kW)"></el-table-column>
				<el-table-column prop="reactivePower" label="无功功率 (kVar)"></el-table-column>
				<el-table-column prop="apparentPower" label="视在功率 (kVA)"></el-table-column>
				<el-table-column prop="powerFactor" label="功率因数"></el-table-column>
			</el-table>
		</el-card>
		<!--	电网电表表格	-->
		<el-card class="mb10">
			<div class="card-title mb10"><span class="dian"></span>电网电表</div>
			<el-row :gutter="30">
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">49.99</div>
							<div>频率 (Hz)</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">14696.4</div>
							<div>正向有功总电能 (kWh)</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="12" :md="8" :lg="8" :xl="8" class="mb10">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">14696.4</div>
							<div>反向有功总电能 (kWh)</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<el-table :data="tableData1" show-summary sum-text="总计" stripe style="width: 100%">
				<el-table-column prop="phase" label="名称" width="180"></el-table-column>
				<el-table-column prop="voltage" label="电压 (V)"></el-table-column>
				<el-table-column prop="current" label="电流 (A)"></el-table-column>
				<el-table-column prop="activePower" label="有功功率 (kW)"></el-table-column>
				<el-table-column prop="reactivePower" label="无功功率 (kVar)"></el-table-column>
				<el-table-column prop="apparentPower" label="视在功率 (kVA)"></el-table-column>
				<el-table-column prop="powerFactor" label="功率因数"></el-table-column>
			</el-table>
		</el-card>
	</div>
</template>
<script>
export default {
	name: "meters",
	data() {
		return {
			tableData1: [
				{ phase: 'A相', voltage: 412.8, current: 28.79, activePower: 9.96, reactivePower: 6.12, apparentPower: 11.7, powerFactor: 0.852 },
				{ phase: 'B相', voltage: 413.1, current: 28.2, activePower: 0, reactivePower: 0, apparentPower: 0, powerFactor: 0 },
				{ phase: 'C相', voltage: 413.2, current: 28.2, activePower: 10.2, reactivePower: -5.52, apparentPower: 11.64, powerFactor: 0.879 },
			],
		}
	}
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/fontend";

</style>