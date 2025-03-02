<template>
	<div class="app-container">
		<el-card body-style="padding:10px" class="mb10">
			<div class="flex-space-between">
				<div class="nav-title"><span class="xian"></span>电池堆信息</div>
				<el-button type="primary" size="mini" @click="">配置</el-button>
			</div>
		</el-card>
		
		<el-card body-style="padding-top:10px" class="mb10">
			<el-row :gutter="30">
				<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">在线</div>
							<div>在线状态</div>
						</div>
					</div>
					<ul class="infoList">
						<li>
							<div>电池容量(kWH)</div>
							<div>221</div>
						</li>
						<li>
							<div>电池类型</div>
							<div>磷酸铁锂</div>
						</li>
						<li>
							<div>电池簇数目</div>
							<div>221</div>
						</li>
						<li>
							<div>单体数目</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">正常</div>
							<div>告警状态</div>
						</div>
					</div>
					<ul class="infoList">
						<li>
							<div>日充电电量(kWh)</div>
							<div>221</div>
						</li>
						<li>
							<div>日放电电量(kWh)</div>
							<div>212</div>
						</li>
						<li>
							<div>电池总电流(A)</div>
							<div>221</div>
						</li>
						<li>
							<div>电池堆绝缘电阻(KΩ)</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-info">闭合</div>
							<div>接触器状态</div>
						</div>
					</div>
					<ul class="infoList">
						<li>
							<div>单体最高电压(mV)</div>
							<div>221</div>
						</li>
						<li>
							<div>单体最低电压(mV)</div>
							<div>磷酸铁锂</div>
						</li>
						<li>
							<div>单体最高电压簇号</div>
							<div>221</div>
						</li>
						<li>
							<div>单体最低电压簇号</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">充电</div>
							<div>充放电状态</div>
						</div>
					</div>
					<ul class="infoList">
						<li>
							<div>单体最高温度(℃)</div>
							<div>221</div>
						</li>
						<li>
							<div>单体最低温度(℃)</div>
							<div>磷酸铁锂</div>
						</li>
						<li>
							<div>最高温度簇号</div>
							<div>221</div>
						</li>
						<li>
							<div>最低温度簇号</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
			</el-row>
		</el-card>
<!--	电池簇表格	-->
		<el-card body-style="padding:10px 20px" class="mb10">
			<div class="card-title mb10"><span class="dian"></span>电池簇</div>
			<el-table :data="tableData" style="width: 100%">
				<el-table-column prop="name" label="簇"></el-table-column>
				<el-table-column prop="a" label="簇电压"></el-table-column>
				<el-table-column prop="b" label="簇电流"></el-table-column>
				<el-table-column prop="c" label="簇SOC"></el-table-column>
				<el-table-column prop="d" label="单体最高电压"></el-table-column>
				<el-table-column prop="e" label="单体最底电压"></el-table-column>
				<el-table-column prop="f" label="单体最高温度"></el-table-column>
				<el-table-column prop="g" label="单体最低温度"></el-table-column>
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="150">
					<template slot-scope="scope">
						<el-button size="small" type="text" style="padding:5px;" @click="detailed(scope.row)">修改</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		
		<el-row :gutter="10" class="mb10">
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<el-card body-style="padding:10px">
					<div class="card-title"><span class="dian"></span>SOC</div>
					<circular-progress :progress="75" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<el-card body-style="padding:10px">
					<div class="card-title"><span class="dian"></span>SOH</div>
					<circular-progress :progress="100" />
				</el-card>
			</el-col>
<!--	仪表盘  -->
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<el-card body-style="padding:10px">
					<div class="card-title"><span class="dian"></span>平均温度</div>
					<temperature-gauge :temperature="30" />
				</el-card>
			</el-col>
		</el-row>
		
<!--	运行数据折线图	-->
		<el-card body-style="padding:10px;" class="mb10">
			<div class="card-title"><span class="dian"></span>运行数据</div>
			<time-line ref="timeLine" :option-set="option" :series-data="series" :height="300"></time-line>
		</el-card>
<!--	电压柱状图	-->
		<el-row :gutter="10" class="mb10">
			<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
				<el-card body-style="padding:10px;">
					<div class="card-title"><span class="dian"></span>电压</div>
					<bar-chart :xAxisData="xAxisData" :seriesData="seriesData" y-axis-name="V" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
				<el-card body-style="padding:10px;">
					<div class="card-title"><span class="dian"></span>SOC</div>
					<bar-chart :xAxisData="xAxisData" :seriesData="seriesData" y-axis-name="%" />
				</el-card>
			</el-col>
		</el-row>
		<!--	双柱状图	-->
		<el-row :gutter="10" class="mb10">
			<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
				<el-card body-style="padding: 10px;">
					<two-bar-chart :seriesData1="seriesData1" :series-data2="seriesData2" :x-axis-name-show="false" :legend-data="['日充电电量', '日放电电量']" y-axis-name="kWh" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
				<el-card body-style="padding: 10px;">
					<two-bar-chart :seriesData1="seriesData1" :series-data2="seriesData2" :legend-data="['累计充电电量', '累计放电电量']" y-axis-name="kWh" />
				</el-card>
			</el-col>
			<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8">
				<el-card body-style="padding: 14px;">
					<div class="card-title"><span class="dian"></span>BMS1详情</div>
					<ul class="infoList">
						<li>
							<div>名称</div>
							<div>值</div>
						</li>
						<li>
							<div>电池容量(kWH)</div>
							<div>1000.0</div>
						</li>
						<li>
							<div>电池类型</div>
							<div>磷酸铁锂</div>
						</li>
						<li>
							<div>电池簇数目</div>
							<div>10</div>
						</li>
						<li>
							<div>单体数目</div>
							<div>221</div>
						</li>
						<li>
							<div>工作状态</div>
							<div>221</div>
						</li>
						<li>
							<div>单体最高温度簇号</div>
							<div>221</div>
						</li>
						<li>
							<div>SOC(%)</div>
							<div>34</div>
						</li>
						<li>
							<div>SOH(%)</div>
							<div>100</div>
						</li>
					</ul>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import CircularProgress from "@/views/frontend/components/CircularProgress";
import TemperatureGauge from "@/views/frontend/components/TemperatureGauge";
import TimeLine from "@/views/frontend/components/timeLine";
import BarChart from "@/views/frontend/components/BarChart";
import TwoBarChart from "@/views/frontend/components/twoBarChart";

export default {
	name: "batteryBMS",
	components: {
		TimeLine,
		CircularProgress,
		TemperatureGauge,
		BarChart,
		TwoBarChart
	},
	data() {
		return {
			tableData: [
				{ name: '簇1', a: '716.9V', b: '101A', c: '80.2%', d: '3210mV', e: '3210mV', f: '37.2℃', g: '37.2℃' },
			],
			option: {
				title: {
					text: '',
					left: 'center'
				},
				legend: {
					data: ['SOC', '电压'],
					top: 30
				},
				yAxis: {
					type: 'value',
					name: '功率(kW)',
					min: -150,
					max: 150
				},
				series: [
					this.createSeries('SOC', '#5470C6'),
					this.createSeries('电压', '#91CC75'),
				]
			},
			series: {
				'SOC': Math.random() * 100 - 50,
				'电压': Math.random() * 100 - 50,
			},
			xAxisData: ['簇1', '簇2', '簇3', '簇4', '簇5'],
			seriesData: [600, 200, 345, 700, 100],
			seriesData1: [899],
			seriesData2: [390],
		}
	},
	mounted() {},
	methods: {
		detailed(row) {
			this.$router.push('/energy/batteryBMS/clusters/' + '1')
		},
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

</style>