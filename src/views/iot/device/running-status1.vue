<template>
	<div style="padding-left: 20px">
		<el-row :gutter="120">
			<el-col :xs="24" :sm="24" :md="24" :lg="10" :xl="14">
				<!-- 设备监测图表-->
				<el-row :gutter="20" style="background-color: #f5f7fa; padding: 20px 10px 20px 10px; border-radius: 15px; margin-right: 5px" v-if="deviceInfo.chartList.length > 0">
					<el-col :xs="24" :sm="12" :md="12" :lg="24" :xl="8" v-for="(item, index) in deviceInfo.chartList" :key="index">
						<el-card shadow="hover" style="border-radius: 30px; margin-bottom: 20px">
							<div ref="map" style="height: 230px; width: 185px; margin: 0 auto"></div>
						</el-card>
					</el-col>
				</el-row>
			</el-col>
		</el-row>
	</div>
</template>

<script>
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
			console.log(newVal, 'newVal')
			if (newVal && newVal.deviceId != 0) {
				this.deviceInfo = newVal;
				this.$nextTick(function () {
					this.MonitorChart();
				});
			}
		},
	},
	data() {
		return {
			// 设备信息
			deviceInfo: {
				chartList: [],
			},
			// 监测图表
			monitorChart: [
				{
					chart: {},
					data: {
						id: '',
						name: '',
						value: '',
					},
				},
			]
		};
	},
	created() {},
	methods: {
		/**图表展示*/
		MonitorChart() {
			console.log(this.deviceInfo, ',,,,,,,,,,,,,,,,')
			for (let i = 0; i < this.deviceInfo.chartList.length; i++) {
				this.monitorChart[i] = {
					chart: this.$echarts.init(this.$refs.map[i]),
					data: {
						id: this.deviceInfo.chartList[i].id,
						name: this.deviceInfo.chartList[i].name,
						value: this.deviceInfo.chartList[i].shadow ? this.deviceInfo.chartList[i].shadow : this.deviceInfo.chartList[i].datatype.min,
					},
				};
				var option;
				option = {
					tooltip: {
						formatter: ' {b} <br/> {c}' + this.deviceInfo.chartList[i].datatype.unit,
					},
					series: [
						{
							name: this.deviceInfo.chartList[i].datatype.type,
							type: 'gauge',
							min: this.deviceInfo.chartList[i].datatype.min,
							max: this.deviceInfo.chartList[i].datatype.max,
							colorBy: 'data',
							splitNumber: 10,
							radius: '100%',
							// 分割线
							splitLine: {
								distance: 4,
							},
							axisLabel: {
								fontSize: 10,
								distance: 10,
							},
							// 刻度线
							axisTick: {
								distance: 4,
							},
							// 仪表盘轴线
							axisLine: {
								lineStyle: {
									width: 8,
									color: [
										[0.2, '#409EFF'], // 0~20%
										[0.8, '#12d09f'], // 40~60%
										[1, '#F56C6C'], // 80~100%
									],
									opacity: 0.3,
								},
							},
							pointer: {
								icon: 'triangle',
								length: '60%',
								width: 7,
							},
							progress: {
								show: true,
								width: 8,
							},
							detail: {
								valueAnimation: true,
								formatter: '{value}' + ' ' + this.deviceInfo.chartList[i].datatype.unit,
								offsetCenter: [0, '80%'],
								fontSize: 20,
							},
							data: [
								{
									value: this.deviceInfo.chartList[i].shadow ? this.deviceInfo.chartList[i].shadow : this.deviceInfo.chartList[i].datatype.min,
									name: this.deviceInfo.chartList[i].name,
								},
							],
							title: {
								offsetCenter: [0, '115%'],
								fontSize: 16,
							},
						},
					],
				};
				option && this.monitorChart[i].chart.setOption(option);
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
