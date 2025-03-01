<template>
	<div>
		<div ref="progressChart" style="width: 100%; height: 220px;"></div>
	</div>
</template>

<script>
export default {
	name: 'CircularProgress',
	props: {
		// 进度值，范围 0~100
		progress: {
			type: Number,
			default: 70,
			validator: (value) => value >= 0 && value <= 100
		}
	},
	mounted() {
		this.renderChart();
	},
	methods: {
		renderChart() {
			// 初始化 ECharts 实例
			const chartDom = this.$refs.progressChart;
			const myChart = this.$echarts.init(chartDom);
			
			// ECharts 配置项
			const option = {
				series: [
					{
						type: 'pie', // 使用饼图实现圆形进度条
						radius: ['75%', '90%'], // 内半径和外半径
						center: ['50%', '50%'], // 圆心位置
						startAngle: 90, // 起始角度
						avoidLabelOverlap: false,
						label: {
							show: true,
							position: 'center',
							formatter: `{a|${this.progress}%}`, // 显示进度值
							rich: {
								a: {
									fontSize: 24,
									fontWeight: 'bold',
									color: '#333'
								}
							}
						},
						data: [
							{
								value: this.progress,
								name: '进度',
								itemStyle: {
									color: '#3ba272' // 进度颜色
								}
							},
							{
								value: 100 - this.progress,
								name: '剩余',
								itemStyle: {
									color: '#eee' // 剩余部分颜色
								}
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
	},
	watch: {
		// 监听 progress 变化，动态更新图表
		progress() {
			this.renderChart();
		}
	}
};
</script>