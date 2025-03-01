<template>
	<div>
		<div ref="gaugeChart" style="width: 100%; height: 220px;"></div>
	</div>
</template>

<script>
export default {
	name: 'TemperatureGauge',
	props: {
		// 进度值，范围 0~100
		temperature: {
			type: Number,
			default: 70
		}
	},
	data() {
		return {}
	},
	mounted() {
		this.renderChart();
	},
	methods: {
		renderChart() {
			// 初始化 ECharts 实例
			const chartDom = this.$refs.gaugeChart;
			const myChart = this.$echarts.init(chartDom);
			
			// ECharts 配置项
			const option = {
				series: [
					{
						type: 'gauge', // 使用仪表盘图
						center: ['50%', '50%'], // 仪表盘中心位置
						radius: "100%",
						color: '#3ba272',
						progress: {
							show: true,
							length: '60%', // 指针长度
							width: 12 // 指针宽度
						},
						detail: {
							valueAnimation: true,
							offsetCenter: [0, '70%'],
							formatter: '{value}℃' // 显示温度值
						},
						data: [
							{
								value: this.temperature, // 当前温度值
								name: '' // 标题
							}
						]
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