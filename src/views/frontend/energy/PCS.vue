<template>
	<div class="app-container">
		<el-card body-style="padding:10px" class="mb10">
			<div class="flex-space-between">
				<div class="nav-title"><span class="xian"></span>PCS1</div>
				<el-button type="primary" size="mini" @click="">配置</el-button>
			</div>
		</el-card>
		
		<el-row :gutter="20" class="mb10">
			<!--	左列内容	-->
			<el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
				<el-card body-style="padding-top:10px" class="mb10">
					<el-row :gutter="30" class="mb10">
						<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="bigText status-green">在线</div>
									<div>在线状态</div>
								</div>
							</div>
						</el-col>
						<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="bigText status-green">开机</div>
									<div>工作状态</div>
								</div>
							</div>
						</el-col>
						<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="bigText status-green">无告警</div>
									<div>告警状态</div>
								</div>
							</div>
						</el-col>
						<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="bigText status-info">充电</div>
									<div>充放电状态</div>
								</div>
							</div>
						</el-col>
						<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="bigText status-info">145 kWh</div>
									<div>日充电电量</div>
								</div>
							</div>
						</el-col>
						<el-col :xs="12" :sm="8" :md="6" :lg="6" :xl="4">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="bigText status-info">101.1  kWh</div>
									<div>日放电电量</div>
								</div>
							</div>
						</el-col>
					</el-row>
					
					<el-row :gutter="20">
						<el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
							<ul class="infoList">
								<li>
									<div>运行模式</div>
									<div>并网</div>
								</li>
								<li>
									<div>总有功功率</div>
									<div>3.4V</div>
								</li>
								<li>
									<div>总无功功率</div>
									<div>3.4V</div>
								</li>
							</ul>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
							<ul class="infoList">
								<li>
									<div title="逆变器平均功率因数">逆变器平均功率因数</div>
									<div>1.0</div>
								</li>
								<li>
									<div>逆变器总视在功率</div>
									<div>145 kVA</div>
								</li>
								<li>
									<div>交流侧调度总功率</div>
									<div>100 kW</div>
								</li>
							</ul>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
							<ul class="infoList">
								<li>
									<div>直流电压</div>
									<div>3.4V</div>
								</li>
								<li>
									<div>直流电流</div>
									<div>142.3 A</div>
								</li>
								<li>
									<div>直流功率</div>
									<div>N/A kW</div>
								</li>
							</ul>
						</el-col>
						<el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="6">
							<ul class="infoList">
								<li>
									<div>交流功率</div>
									<div>N/A kW</div>
								</li>
								<li>
									<div>总充电量</div>
									<div>145 kWh</div>
								</li>
								<li>
									<div>总放电量</div>
									<div>101.1 kWh</div>
								</li>
							</ul>
						</el-col>
					</el-row>
				</el-card>
				
				<!--	功率曲线折线图	-->
				<el-card class="mb10">
					<div class="card-title"><span class="dian"></span>功率曲线</div>
					<time-line ref="timeLine" :option-set="option" :series-data="series" :height="300"></time-line>
				</el-card>
				
				<!--	实时数据折线图	-->
				<el-card class="mb10">
					<div class="card-title">
						<span class="dian"></span>实时数据
						<el-select v-model="selectValue" placeholder="请选择">
							<el-option
									v-for="item in selectOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
							</el-option>
						</el-select>
					</div>
					<time-line ref="timeLine" :option-set="option" :series-data="series" :height="300"></time-line>
				</el-card>
			</el-col>
			<!--	右列内容	-->
			<el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="6" class="mb10">
				<el-card body-style="padding-top:10px">
					<div class="card-title mb20"><span class="dian"></span>实时信息</div>
					<el-table :data="tableData" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
						<el-table-column prop="name" label="信号名称"></el-table-column>
						<el-table-column prop="value" label="值" width="100"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
<!--	多个单柱状图	-->
		<el-row :gutter="20" class="mb10">
			<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
				<el-card body-style="padding:10px;">
					<bar-chart :xAxisData="xAxisDataV" :seriesData="dataV" y-axis-name="(V)" series-color="#3ba272" height="240px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
				<el-card body-style="padding:10px;">
					<bar-chart :xAxisData="xAxisDataA" :seriesData="dataA" y-axis-name="(A)" series-color="#3ba272" height="240px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
				<el-card body-style="padding:10px;">
					<bar-chart :xAxisData="xAxisDataKVA" :seriesData="dataKVA" y-axis-name="(KVA)" series-color="#3ba272" height="240px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
				<el-card body-style="padding:10px;">
					<bar-chart :xAxisData="xAxisDataKW" :seriesData="dataKW" y-axis-name="(KW)" series-color="#3ba272" height="240px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
				<el-card body-style="padding:10px;">
					<bar-chart :xAxisData="xAxisDataKVar" :seriesData="dataKVar" y-axis-name="(KVar)" series-color="#3ba272" height="240px" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
				<el-card body-style="padding:10px;">
					<bar-chart :xAxisData="xAxisDataKPF" :seriesData="dataKPF" y-axis-name="" series-color="#3ba272" height="240px" />
				</el-card>
			</el-col>
		</el-row>
		
<!--	最底双柱状图	-->
		<el-card body-style="padding: 10px;">
			<two-bar-chart :seriesData1="seriesData1" :series-data2="seriesData2" :legend-data="['日充电量', '日放电量']" y-axis-name="kWh" :x-axis-data="xaisDate" />
		</el-card>
	</div>
</template>
<script>
import TimeLine from "@/views/frontend/components/timeLine.vue";
import TwoBarChart from "@/views/frontend/components/twoBarChart.vue";
import BarChart from "@/views/frontend/components/BarChart.vue";

export default {
	name: "PCS",
	components: {BarChart, TwoBarChart, TimeLine},
	data() {
		return {
			option: {
				title: {
					text: '',
					left: 'center'
				},
				legend: {
					data: ['总有功功率', '直流功率'],
					top: 30
				},
				yAxis: {
					type: 'value',
					name: 'kW',
					min: -150,
					max: 150
				},
				series: [
					this.createSeries('总有功功率', '#5470C6'),
					this.createSeries('直流功率', '#91CC75'),
				]
			},
			series: {
				'总有功功率': Math.random() * 100 - 50,
				'直流功率': Math.random() * 100 - 50,
			},
			selectValue: '',
			selectOptions: [
				{ value: '1', label: '相电压' },
				{ value: '2', label: '相功率' },
				{ value: '3', label: '相电流' },
			],
			tableData: [
				{ name: '充放电状态', value: '充电'},
				{ name: '逆变器AB线电压', value: '403.3 V'},
				{ name: '逆变器BC线电压', value: '403.3 V'},
				{ name: '逆变器CA线电压', value: '403.3 V'},
				{ name: '逆变器A相电压', value: '403.3 V'},
				{ name: '逆变器B相电压', value: '403.3 V'},
				{ name: '逆变器C相电压', value: '403.3 V'},
				{ name: '逆变器A相电流', value: '142 A'},
				{ name: '逆变器B相电流', value: '142 A'},
				{ name: '逆变器C相电流', value: '142 A'},
				{ name: '逆变器A相有功功率', value: '100 kvar'},
				{ name: '逆变器B相有功功率', value: '100 kvar'},
				{ name: '逆变器C相有功功率', value: '100 kvar'},
				{ name: '逆变器A相功率因数', value: 'N/A'},
				{ name: '逆变器B相功率因数', value: 'N/A'},
				{ name: '逆变器C相功率因数', value: 'N/A'},
				{ name: '逆变器总有功功率', value: 'N/A'},
				{ name: '逆变器总无功功率', value: 'N/A'},
				{ name: '逆变器总视在功率', value: 'N/A'},
				{ name: '逆变器频率', value: 'N/A'},
				{ name: 'PCS交流功率设置值', value: 'N/A'},
				{ name: 'PCS模块控制模式', value: 'N/A'},
			],
			xAxisDataV: ['Vab', 'Vbc', 'Vca'],
			dataV: [600, 200, 345],
			xAxisDataA: ['la', 'lb', 'lc'],
			dataA: [98.4, 43.3, 43],
			xAxisDataKVA: ['Sa', 'Sb', 'Sc', 'S'],
			dataKVA: [98.4, 43.3, 43, 100.2],
			xAxisDataKW: ['Pa', 'Pb', 'Pc', 'P'],
			dataKW: [0.4, 0.3, 0.9, 0.2],
			xAxisDataKVar: ['Qa', 'Qb', 'Qc', 'Q'],
			dataKVar: [98.4, 43.3, 43, 100.2],
			xAxisDataKPF: ['Qa', 'Qb', 'Qc', 'Q'],
			dataKPF: [98.4, 43.3, 43, 100.2],
			seriesData1: [60, 80, 50, 50, 90, 81, 64],
			seriesData2: [30, 30, 90, 20, 30, 23, 74],
			xaisDate: ['2025-02-01', '2025-02-02', '2025-02-03', '2025-02-04', '2025-02-05', '2025-02-06', '2025-02-07'],
		}
	},
	methods: {
		createSeries(name, color) {
			return {
				name: name,
				type: 'line',
				data: [],
				itemStyle: { color },
				animation: false
			}
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

::v-deep .el-table--medium .el-table__cell {
	padding: 8px 0;
}
</style>