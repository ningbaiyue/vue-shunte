<template>
	<div class="bar-chart">
		<div ref="barChart" style="width: 100%; height: 300px;"></div>
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
		seriesData: {
			type: Array,
			default: null
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
					bottom: '2%',
					containLabel: true
				},
				xAxis: {
					type: 'category',
					data: this.xAxisData, // X 轴数据
					axisLabel: {
						color: '#333', // X 轴标签颜色
						fontSize: 12
					},
					axisLine: {
						lineStyle: {
							color: '#999' // X 轴线颜色
						}
					}
				},
				yAxis: {
					type: 'value',
					name: this.yAxisName,
					nameTextStyle: {
						fontWeight: 'bold',
						fontSize: 16,
						align: "right",
					},
					axisLabel: {
						color: '#333', // Y 轴标签颜色
						fontSize: 12
					},
					axisLine: {
						lineStyle: {
							color: '#999' // Y 轴线颜色
						}
					},
					splitLine: {
						lineStyle: {
							color: '#eee' // Y 轴分割线颜色
						}
					}
				},
				series: [
					{
						name: '数据',
						type: 'bar', // 柱状图类型
						data: this.seriesData, // 柱状图数据
						itemStyle: {
							color: '#36a2eb' // 柱状图颜色
						},
						barWidth: '40%' // 柱状图宽度
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