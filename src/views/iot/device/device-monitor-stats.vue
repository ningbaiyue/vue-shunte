<template>
	<div>
		<el-row :gutter="20" v-if="monitorThings.length > 0">
			<el-col v-for="(item, index) in monitorThings" :key="index" style="margin-bottom: 20px">
				<!-- 设备监测图表-->
				<el-card shadow="hover" :body-style="{ paddingTop: '10px', marginBottom: '-20px', width: '100%' }">
					<div ref="monitor" style="height: 300px; padding: 0"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
let base = +new Date(2025, 1, 1);
let oneDay = 24 * 3600 * 1000;
let date = [];
let data = [Math.random() * 300];
for (let i = 1; i < 20000; i++) {
	var now = new Date((base += oneDay));
	date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
	data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

export default {
	name: 'running-status',
	props: {
		device: {
			type: Object,
			default: null,
		},
	},
	watch: {
		// 获取到父组件传递的device后，刷新列表
		device: function (newVal, oldVal) {
			console.log(newVal, '监测统计')
			if (newVal && newVal.deviceId != 0) {
				this.monitorThings = newVal.chartList;
				this.$nextTick(function () {
					this.MonitorChart();
				});
			}
		},
	},
	data() {
		return {
			// 监测图表
			monitorThings: [],
			// 图表集合
			chart: [],
		};
	},
	created() {},
	methods: {
		/**图表展示*/
		MonitorChart() {
			let color = ['#1890FF', '#91CB74', '#FAC858', '#EE6666', '#73C0DE', '#3CA272', '#FC8452', '#9A60B4', '#ea7ccc'];
			for (let i = 0; i < this.monitorThings.length; i++) {
				// 设置宽度
				this.$refs.monitor[i].style.width = document.documentElement.clientWidth / 2 + 500 + 'px';
				this.chart[i] = this.$echarts.init(this.$refs.monitor[i]);
				let option = {
					tooltip: {
						trigger: 'axis',
						position: function (pt) {
							return [pt[0], '10%'];
						}
					},
					title: {
						left: 'center',
						text: this.monitorThings[i].name + ' （单位 ' + (this.monitorThings[i].datatype.unit != undefined ? this.monitorThings[i].datatype.unit : '无') + '）',
						textStyle: {
							fontSize: 14,
						}
					},
					toolbox: {
						feature: {
							dataZoom: {
								yAxisIndex: 'none'
							},
							restore: {},
							saveAsImage: {}
						}
					},
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: date
					},
					yAxis: {
						type: 'value',
						boundaryGap: [0, '100%']
					},
					dataZoom: [
						{
							type: 'inside',
							start: 0,
							end: 10
						},
						{
							start: 0,
							end: 10
						}
					],
					series: [
						{
							name: 'Fake Data',
							type: 'line',
							symbol: 'none',
							sampling: 'lttb',
							itemStyle: {
								color: i > 9 ? color[0] : color[i]
							},
							areaStyle: {
								color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
									{
										offset: 0,
										color: i > 9 ? color[0] : color[i]
									},
									{
										offset: 1,
										color: i > 9 ? color[1] : color[(i + 1) % color.length]
									}
								])
							},
							data: data
						}
					]
				};
				option && this.chart[i].setOption(option);
			}
		},
	},
};
</script>

<style>
/* 重写滑动块样式 */
.el-slider__bar {
	height: 18px;
}

.el-slider__runway {
	height: 18px;
	margin: 5px 0;
}

.el-slider__button {
	height: 18px;
	width: 18px;
	border-radius: 10%;
}

.el-slider__button-wrapper {
	top: -9px;
}
</style>
