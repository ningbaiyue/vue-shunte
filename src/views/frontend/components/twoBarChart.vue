<template>
	<div class="bar-chart">
		<div ref="barChart" style="width: 100%; height: 376px;"></div>
	</div>
</template>

<script>
export default {
	name: 'BarChart',
	props: {
		xAxisData: {
			type: Array,
			default: null
		},
		yAxisName: {
			type: String,
			default: ''
		},
		seriesData1: {
			type: Array,
			default: null
		},
		seriesData2: {
			type: Array,
			default: null
		},
		legendData: {
			type: Array,
			default: null
		},
		xAxisNameShow: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	},
	mounted() {
		this.renderChart();
	},
	methods: {
		renderChart() {
			// 初始化 ECharts 实例
			const chartDom = this.$refs.barChart;
			const myChart = this.$echarts.init(chartDom);
			
			// ECharts 配置项
			const option = {
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'shadow' // 鼠标悬停时显示阴影
					}
				},
				grid: {
					left: '2%',
					right: '4%',
					bottom: '0',
					containLabel: true
				},
				legend: {},
				xAxis: {
					type: 'category',
					data: this.xAxisData, // X 轴数据
					show: this.xAxisNameShow,
				},
				yAxis: {
					type: 'value',
					name: this.yAxisName,
					nameTextStyle: { color: '#909399' },
					axisLabel: { color: '#909399' },
					splitLine: { lineStyle: { type: 'dashed' } }
				},
				series: [
					{
						name: this.legendData[0],
						type: 'bar',
						data: this.seriesData1,
						itemStyle: {
							color: '#3ba272' // 柱状图颜色
						}
					},
					{
						name: this.legendData[1],
						type: 'bar', // 柱状图类型
						data: this.seriesData2, // 柱状图数据
						itemStyle: {
							color: '#ff6f20' // 柱状图颜色
						}
					}
				]
			};
			
			// 设置配置项并渲染图表
			myChart.setOption(option);
			
			// 窗口大小变化时，调整图表大小
			window.addEventListener('resize', () => {
				myChart.resize();
			});
		}
	}
};
</script>