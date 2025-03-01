<template>
	<div>
		<div ref="chart" style="width: 100%;" :style="{'height': height + 'px'}"></div>
	</div>
</template>

<script>
export default {
	props: {
		optionSet: {},
		height: {
			type: Number,
			default: 320
		},
		seriesData: {
			type: Object,
			default: ({})
		}
	},
	data() {
		return {
			chart: null,
			option: {
				...this.optionSet,
				tooltip: {
					trigger: 'axis',
					axisPointer: {
						type: 'cross'
					}
				},
				legend: {
					top: '0',
				},
				grid: {
					left: '2%',
					right: '4%',
					bottom: '2%',
					containLabel: true
				},
				xAxis: {
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
				},
			},
			startTime: new Date().setHours(0, 0, 0, 0), // 当天00:00
			currentTime: null,
			maxDuration: 24 * 60 * 60 * 1000, // 24小时
			interval: 15000 // 15秒
		}
	},
	methods: {
		initChart() {
			this.chart = this.$echarts.init(this.$refs.chart)
			// 初始化时间范围
			this.currentTime = this.startTime
			this.option.xAxis.min = this.startTime
			this.option.xAxis.max = this.startTime + this.interval
			this.chart.setOption(this.option)
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
				// console.log(series, 888)
				series.data.push({
					name: newTime,
					value: [newTime, newData[series.name]]
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
	},
	mounted() {
		this.initChart()
		// 每15秒更新数据
		this.timer = setInterval(() => {
			this.updateData()
		}, this.interval)
		
		window.addEventListener('resize', () => this.chart?.resize())
	},
	beforeDestroy() {
		clearInterval(this.timer)
		window.removeEventListener('resize', () => this.chart?.resize())
		this.chart?.dispose()
	}
}
</script>