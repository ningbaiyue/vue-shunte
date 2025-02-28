<template>
	<div class="chart-card">
		<!-- 标题和选项卡 -->
		<div class="header-container">
			<h3 class="chart-title">{{chartTitle}}</h3>
			<el-radio-group v-model="activeTab" size="small" @input="handleTabChange">
				<el-radio-button label="day">七天</el-radio-button>
				<el-radio-button label="month">月</el-radio-button>
				<el-radio-button label="year">年</el-radio-button>
<!--				<el-radio-button label="total">累计</el-radio-button>-->
			</el-radio-group>
		</div>
		
		<!-- 图表容器 -->
		<div ref="chartRef" class="chart-container"></div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			chartTitle: '全站充放电量',
			activeTab: 'month',
			chartInstance: null,
			chartData: {
				month: {
					xAxis: Array.from({ length: 14 }, (_, i) => `${i + 1}月`),
					charge: [120, 132, 101, 134, 90, 230, 210, 132, 101, 134, 90, 230, 210, 180],
					discharge: [80, 92, 71, 104, 60, 180, 160, 92, 71, 104, 60, 180, 160, 140]
				},
				year: {
					xAxis: ['2020', '2021', '2022', '2023'],
					charge: [2800, 3200, 2950, 4100],
					discharge: [1800, 2100, 1950, 2800]
				},
				total: {
					xAxis: ['累计'],
					charge: [15800],
					discharge: [11200]
				}
			}
		}
	},
	mounted() {
		this.initChart()
		window.addEventListener('resize', this.handleResize)
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.handleResize)
		if (this.chartInstance) {
			this.chartInstance.dispose()
		}
	},
	methods: {
		initChart() {
			this.chartInstance = this.$echarts.init(this.$refs.chartRef)
			this.updateChart()
		},
		updateChart() {
			const option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: { type: 'shadow' }
				},
				legend: {},
				xAxis: {
					type: 'category',
					data: this.chartData[this.activeTab].xAxis,
					axisLabel: { color: '#606266' }
				},
				yAxis: {
					type: 'value',
					name: 'kWh',
					nameTextStyle: { color: '#909399' },
					axisLabel: { color: '#909399' },
					splitLine: { lineStyle: { type: 'dashed' } }
				},
				grid: {
					left: '3%',
					right: '4%',
					bottom: '10%',
					containLabel: true
				},
				series: [
					{
						name: '充电电量',
						type: 'bar',
						data: this.chartData[this.activeTab].charge
					},
					{
						name: '放电电量',
						type: 'bar',
						data: this.chartData[this.activeTab].discharge
					}
				]
			}
			option && this.chartInstance.setOption(option)
		},
		handleTabChange() {
			this.$nextTick(() => {
				this.updateChart()
			})
		},
		handleResize() {
			if (this.chartInstance) {
				this.chartInstance.resize()
			}
		}
	}
}
</script>

<style scoped>
.header-container {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}
.chart-title {
	margin: 0;
	font-size: 16px;
	font-weight: 600;
}
.chart-container {
	height: 350px;
}
/* 深度选择器处理Element UI样式 */
::v-deep .el-tabs__header {
	margin: 0;
}
::v-deep .el-tabs__nav-wrap::after {
	height: 0;
}
::v-deep .el-tabs__item {
	padding: 0 16px;
	height: 32px;
	line-height: 32px;
}
</style>