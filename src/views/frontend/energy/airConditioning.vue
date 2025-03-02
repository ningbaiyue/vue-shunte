<template>
	<div class="app-container">
		<el-card body-style="padding:10px" class="mb10">
			<div class="flex-space-between">
				<div class="nav-title"><span class="xian"></span>空调信息</div>
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
							<div>通讯状态</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">开机</div>
							<div>开关机状态</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-info">制冷</div>
							<div>模式控制</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="6" :xl="6">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="bigText status-green">无告警</div>
							<div>告警状态</div>
						</div>
					</div>
				</el-col>
			</el-row>
			<!--	空调每个看多少	-->
			<el-row :gutter="20">
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">15.3℃</div>
						<div>室内温度</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">38.3℃</div>
						<div>室外温度</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">41.2℃</div>
						<div>冷凝温度</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">0.0℃</div>
						<div>蒸发温度</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">61.2 %</div>
						<div>室内湿度</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">关闭</div>
						<div>除湿阀</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">关闭</div>
						<div>送风机</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum status-green">开启</div>
						<div>压缩机</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">关闭</div>
						<div>电加热</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">关闭</div>
						<div>加湿器</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">2.3℃</div>
						<div>制冷回差</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">20.0℃</div>
						<div>制热设定</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">2.0℃</div>
						<div>制热回差</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">2.0℃</div>
						<div>制冷设定</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="kd-box">
						<div class="bigNum">开启</div>
						<div>室外风机</div>
					</div>
				</el-col>
			</el-row>
		</el-card>
		<!--	实时室内温湿度	-->
		<el-card body-style="padding: 10px" class="mb10">
			<div class="card-title"><span class="dian"></span>实时室内温湿度</div>
			<div ref="line" style="width: 100%; height: 320px;"></div>
		</el-card>
	</div>
</template>
<script>
export default {
	name: "airConditioning",
	data() {
		return {
			chart: null,
			option: null,
			legendData: ['温度', '湿度'],
			seriesData: {
				'温度': Math.floor(Math.random() * 61),
				'湿度': Math.floor(Math.random() * 100 - 50),
			},
			startTime: new Date().setHours(0, 0, 0, 0), // 当天00:00
			currentTime: null,
			maxDuration: 24 * 60 * 60 * 1000, // 24小时
			interval: 15000 // 15秒
		}
	},
	mounted() {
		this.renderChart();
		// 每15秒更新数据
		this.timer = setInterval(() => {
			this.updateData()
		}, this.interval)
		
		// 窗口大小变化时，调整图表大小
		window.addEventListener('resize', () => this.chart?.resize());
	},
	beforeDestroy() {
		clearInterval(this.timer)
		window.removeEventListener('resize', () => this.chart?.resize())
		this.chart?.dispose()
	},
	methods: {
		renderChart() {
			// 初始化 ECharts 实例
			this.chart = this.$echarts.init(this.$refs.line);
			// ECharts 配置项
			this.option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross',
						crossStyle: {
							color: '#999'
						}
					}
				},
				grid: {
					left: '2%',
					right: '4%',
					bottom: '2%',
					containLabel: true
				},
				legend: {
					data: this.legendData
				},
				xAxis: [
					{
						type: 'time',
						boundaryGap: false,
						min: null,  // 动态设置
						max: null,  // 动态设置
						axisLabel: {
							formatter: (value) => {
								const date = new Date(value)
								return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
							}
						}
					}
				],
				yAxis: [
					{
						type: 'value',
						name: this.legendData[0],
						min: 0,
						max: 60,
						axisLabel: {
							formatter: '{value} ℃'
						}
					},
					{
						type: 'value',
						name: this.legendData[1],
						min: 0,
						max: 100,
						axisLabel: {
							formatter: '{value} %'
						}
					}
				],
				series: [
					{
						name: this.legendData[0],
						type: 'line',
						tooltip: {
							valueFormatter: function (value) {
								return value + ' ℃';
							}
						},
						data: []
					},
					{
						name: this.legendData[1],
						type: 'line',
						tooltip: {
							valueFormatter: function (value) {
								return value + ' %';
							}
						},
						data: []
					},
				]
			}
			// 初始化时间范围
			this.currentTime = this.startTime
			this.option.xAxis.min = this.startTime
			this.option.xAxis.max = this.startTime + this.interval
			
			// 设置配置项并渲染图表
			this.chart.setOption(this.option);
		},
		generateMockData() {
			return this.seriesData
		},
		updateData() {
			if (this.currentTime - this.startTime >= this.maxDuration) {
				return // 达到24小时停止更新
			}
			
			// 生成新时间点
			this.currentTime += this.interval
			const newTime = this.currentTime
			
			// 生成模拟数据
			const newData = this.generateMockData()
			
			// 更新各系列数据
			this.option.series.forEach(series => {
				series.data.push({
					name: newTime,
					value: [newTime, newData[series.name]],
				})
			})
			
			// 动态扩展时间轴
			this.option.xAxis.max = newTime
			
			// 自动滚动时间轴（保持显示最近4小时）
			if (newTime - this.option.xAxis.min > 4 * 60 * 60 * 1000) {
				this.option.xAxis.min = newTime - 4 * 60 * 60 * 1000
			}
			
			// 更新图表配置
			this.chart.setOption({
				xAxis: {
					min: this.option.xAxis.min,
					max: this.option.xAxis.max
				},
				series: this.option.series.map(s => ({ data: s.data }))
			})
		}
	}
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/fontend";

.kd-box {
	border: 1px #486ff2 solid;
	padding: 10px;
	border-radius: 6px;
	margin-top: 20px;
	.bigNum {
		font-size: 28px;
		font-weight: 600;
	}
}
</style>