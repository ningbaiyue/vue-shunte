<template>
	<div class="app-container">
		<el-card body-style="padding-bottom:4px;" class="mb10">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
				<el-form-item label="" prop="city">
					<el-select v-model="queryParams.city" placeholder="请选择站点" clearable>
						<el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value"/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		<el-row :gutter="10">
		<!-- 左边区域 -->
			<el-col :span="10">
				<el-card body-style="padding:14px;" class="mb10">
					<div class="card-title">电站运行概览</div>
					<el-row>
						<el-col :span="6" class="text-center">
							<span>告警状态：</span>
							<span class="status-col">在线</span>
						</el-col>
						<el-col :span="6" class="text-center">
							<span>运行状态：</span>
							<span class="status-col">在线</span>
						</el-col>
						<el-col :span="6" class="text-center">
							<span>SOC：</span>
							<span class="status-col">在线</span>
						</el-col>
						<el-col :span="6" class="text-center">
							<span>在线状态：</span>
							<span class="status-col">99.9%</span>
						</el-col>
					</el-row>
					
					<el-row class="mt10 mb10">
						<el-col :span="6" class="iconText">
							<svg-icon icon-class="tree-table"/>
							<div class="r-text">
								<div class="t-big">103.3</div>
								<div>储能功率(kW)</div>
							</div>
						</el-col>
						<el-col :span="6" class="iconText">
							<svg-icon icon-class="tree-table"/>
							<div class="r-text">
								<div class="t-big">103.3</div>
								<div>储能功率(kW)</div>
							</div>
						</el-col>
						<el-col :span="6" class="iconText">
							<svg-icon icon-class="tree-table"/>
							<div class="r-text">
								<div class="t-big">103.3</div>
								<div>储能功率(kW)</div>
							</div>
						</el-col>
						<el-col :span="6" class="iconText">
							<svg-icon icon-class="tree-table"/>
							<div class="r-text">
								<div class="t-big">103.3</div>
								<div>储能功率(kW)</div>
							</div>
						</el-col>
					</el-row>
				</el-card>
				<!-- 充放电概览图表 -->
				<el-card body-style="padding:14px;">
					<el-tabs v-model="activeChart" @tab-click="handleClick">
						<el-tab-pane label="收益指标" name="first">
							<energy-chart></energy-chart>
						</el-tab-pane>
						<el-tab-pane label="电量指标" name="second">
							<energy-chart></energy-chart>
						</el-tab-pane>
					</el-tabs>
				</el-card>
				<!-- 实时告警 -->
				<el-card body-style="padding:14px;" class="mt10">
					<div class="card-title mb10">实时告警</div>
<!--					<el-row class="alertIcon">
						<el-col :span="12">
							<svg-icon icon-class="alert"/>
						</el-col>
					</el-row>-->
					<el-table :data="tableData" stripe :header-row-style="{'background-color': '#FF9700'}" style="width: 100%">
						<el-table-column prop="date" label="储能单元" width="180"></el-table-column>
						<el-table-column prop="name" label="通知" width="180"></el-table-column>
						<el-table-column prop="address" label="告警"></el-table-column>
						<el-table-column prop="address" label="故障"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
		<!-- 右边区域 -->
			<el-col :span="14">
				<el-card body-style="padding-bottom:90px;">
					<el-row :gutter="50" class="mb10">
						<el-col :span="8" class="iconText">
							<div class="earning-item flex justify-center">
								<svg-icon icon-class="tree-table"/>
								<div class="r-text ml10">
									<div class="t-big">103.3</div>
									<div>当日收益($)</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8" class="iconText">
							<div class="earning-item flex justify-center">
								<svg-icon icon-class="tree-table"/>
								<div class="r-text ml10">
									<div class="t-big">103.3</div>
									<div>当日充电量(kWh)</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8" class="iconText">
							<div class="earning-item flex justify-center">
								<svg-icon icon-class="tree-table"/>
								<div class="r-text ml10">
									<div class="t-big">103.3</div>
									<div>当日放电量(kWh)</div>
								</div>
							</div>
						</el-col>
					</el-row>
					<el-row :gutter="50">
						<el-col :span="8" class="iconText">
							<div class="earning-item flex justify-center">
								<svg-icon icon-class="tree-table"/>
								<div class="r-text ml10">
									<div class="t-big">103.3</div>
									<div>累计收益($)</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8" class="iconText">
							<div class="earning-item flex justify-center">
								<svg-icon icon-class="tree-table"/>
								<div class="r-text ml10">
									<div class="t-big">103.3</div>
									<div>累计充电量(kWh)</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8" class="iconText">
							<div class="earning-item flex justify-center">
								<svg-icon icon-class="tree-table"/>
								<div class="r-text ml10">
									<div class="t-big">103.3</div>
									<div>累计放电量(kWh)</div>
								</div>
							</div>
						</el-col>
					</el-row>
					<!-- 能量流转git图 -->
					<div class="centerBg">
						<svg class="energy-path" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
							<!-- 储能 -->
							<circle class="light-point1" cx="193" cy="168" r="3.5" fill="white"/>
							<!-- 电网 -->
							<circle class="light-point1" cx="491" cy="97" r="3.5" fill="white"/>
							<!-- 负载 -->
							<circle class="light-point1" cx="505" cy="260" r="3.5" fill="white"/>
							<!--交汇点 -->
							<circle class="light-point1" cx="350" cy="168" r="3.5" fill="white"/>
							<!-- 储能 -->
							<circle class="light-point" cx="193" cy="168" r="3.5" fill="white" id="storage-point">
								<animate attributeName="cx" from="193" to="350" dur="8s" repeatCount="indefinite" begin="0s" />
								<animate attributeName="cy" from="168" to="168" dur="8s" repeatCount="indefinite" begin="0s" />
							</circle>
							<!-- 电网 -->
							<circle class="light-point" cx="491" cy="97" r="3.5" fill="white" id="grid-point">
								<animate attributeName="cx" from="491" to="350" dur="8s" repeatCount="indefinite" begin="0s" />
								<animate attributeName="cy" from="97" to="168" dur="8s" repeatCount="indefinite" begin="0s" />
							</circle>
							<!-- 负载 -->
							<circle class="light-point" cx="505" cy="260" r="3.5" fill="white" id="load-point">
								<animate attributeName="cx" from="505" to="350" dur="8s" repeatCount="indefinite" begin="8s" />
								<animate attributeName="cy" from="260" to="168" dur="8s" repeatCount="indefinite" begin="8s" />
							</circle>
							<!-- 交汇点 -->
							<circle class="light-point" cx="350" cy="168" r="3.5" fill="white" id="intersection-point">
								<animate attributeName="cx" from="350" to="350" dur="8s" repeatCount="indefinite" begin="0s" />
								<animate attributeName="cy" from="168" to="168" dur="8s" repeatCount="indefinite" begin="0s" />
							</circle>
						</svg>
						<div class="git-text top-right">
							<div class="width-text">电网</div>
							<div><span class="width-text">实时功率：</span><span class="t-blue">23.89</span>kW</div>
						</div>
						<div class="git-text bottom-left">
							<div><span class="width-text">储能</span><span class="t-blue">充电</span></div>
							<div><span class="width-text">SOC：</span><span class="t-blue">55</span>%</div>
							<div><span class="width-text">实时功率：</span><span class="t-blue">23.89</span>kW</div>
							<div><span class="width-text">可用电量：</span><span class="t-blue">23.89</span>kWh</div>
						</div>
						<div class="git-text bottom-right">
							<div class="width-text">负载</div>
							<div><span class="width-text">实时功率：</span><span class="t-blue">23.89</span>kW</div>
						</div>
					</div>
				</el-card>
<!--		实时运行折线图		-->
				<el-card class="mt10">
					<time-line ref="timeLine" :option-set="option" :series-data="series"></time-line>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import EnergyChart from './components/EnergyChart'
import TimeLine from "@/views/frontend/components/timeLine";

export default {
	components: { EnergyChart, TimeLine },
	data() {
		return {
			queryParams: {
				city: ''
			},
			selectList: [{value: 1, label: '广州'}, {value: 2, label: '深圳'}],
			activeChart: 'first',
			tableData: [
					{
				date: '2016-05-02',
				name: '王小虎',
				address: '上'
			}, {
				date: '2016-05-04',
				name: '王小虎',
				address: '上海市普'
			}, {
				date: '2016-05-01',
				name: '王小虎',
				address: '上海市'
			}, {
				date: '2016-05-03',
				name: '王小虎',
				address: '上海'
			}],
			chart: null,
			option: {
				title: {
					text: '实时功率监控曲线',
					left: 'center'
				},
				legend: {
					data: ['储能单元1', '储能单元2', '储能单元3', '电网', '负载', '光伏'],
					top: 30
				},
				yAxis: {
					type: 'value',
					name: '功率(kW)',
					min: -150,
					max: 150
				},
				series: [
					this.createSeries('储能单元1', '#5470C6'),
					this.createSeries('储能单元2', '#91CC75'),
					this.createSeries('储能单元3', '#FAC858'),
					this.createSeries('电网', '#EE6666'),
					this.createSeries('负载', '#73C0DE'),
					this.createSeries('光伏', '#3BA272')
				]
			},
			series: {
				'储能单元1': Math.random() * 100 - 50,
				'储能单元2': Math.random() * 100 - 50,
				'储能单元3': Math.random() * 100 - 50,
				'电网': Math.random() * 100 - 50,
				'负载': Math.random() * 100 - 50,
				'光伏': Math.random() * 100 - 50
			}
		}
	},
	mounted() {
		this.getAllList();
		this.updateLightPoints();
	},
	methods: {
		createSeries(name, color) {
			return {
				name: name,
				type: 'line',
				showSymbol: false,
				smooth: true,
				data: [],
				itemStyle: { color },
				animation: false
			}
		},
		getAllList() {},
		/** 搜索按钮操作 */
		handleQuery() {
			this.getAllList();
		},
		/** 标签页触发操作 */
		handleClick(tab, event) {
			console.log(tab, event);
		},
		// 设置光点动画的方法
		setAnimation(startPoint, fromCx, toCx, fromCy, toCy) {
			const cxAnimate = startPoint.querySelector('animate[attributeName="cx"]');
			const cyAnimate = startPoint.querySelector('animate[attributeName="cy"]');
			cxAnimate.setAttribute('from', fromCx);
			cxAnimate.setAttribute('to', toCx);
			cyAnimate.setAttribute('from', fromCy);
			cyAnimate.setAttribute('to', toCy);
		},
		// 更新光点位置的方法
		updateLightPoints() {
			const storagePoint = document.getElementById('storage-point');
			const gridPoint = document.getElementById('grid-point');
			const loadPoint = document.getElementById('load-point');
			const intersectionPoint = document.getElementById('intersection-point');
			/*console.log(this.mainInfo.storageInfo_status)
			switch (this.mainInfo.storageInfo_status) {
				case 0:
					// 静置状态
					this.setAnimation(storagePoint, 193, 193, 168, 168); // 储能点动画保持不变
					this.setAnimation(intersectionPoint, 350, 350, 168, 168); // 交汇点到储能动画保持不变
					this.setAnimation(storagePoint, 491, 350, 97, 168); // 电网到交汇点
					this.setAnimation(loadPoint, 350, 505, 168, 260); // 交汇点到负载
					break;
				case 1:
					// 充电状态
					this.setAnimation(storagePoint, 193, 193, 168, 168); // 储能到交汇点保持不变
					this.setAnimation(gridPoint, 491, 350, 97, 168); // 电网到交汇点
					this.setAnimation(intersectionPoint, 350, 193, 168, 168); // 交汇点到储能
					this.setAnimation(loadPoint, 350, 505, 168, 260); // 交汇点到负载
					break;
				case 2:
					// 放电状态
					this.setAnimation(gridPoint, 491, 350, 97, 168); // 电网到交汇点
					this.setAnimation(storagePoint, 193, 350, 168, 168); // 储能到交汇点
					this.setAnimation(intersectionPoint, 350, 350, 168, 168); // 交汇点到储能保持不变
					this.setAnimation(loadPoint, 350, 505, 168, 260); // 交汇点到负载
					break;
				default:
					// 其他状态或错误处理
					break;
			}*/
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

.text-center {
	font-size: 14px;
	text-align: left;
	font-weight: 600;
}
.status-col {
	color: #1DAB52;
}
.iconText {
	display: flex;
	justify-content: center;
	align-items: center;
	&.bg-icon {
		background-color: #f4f6f8;
		border: 1px solid  #E4E7EA;
		border-radius: 6px;
		color: #101010;
		padding: 10px;
		margin-bottom: 10px;
	}
	.svg-icon {
		font-size: 32px;
		fill: #003bfa;
		margin-right: 12px;
	}
	.r-text {
		font-size: 12px;
		color: #0D2253;
		.t-big {
			font-size: 20px;
		}
	}
}
.centerBg {
	height: 329px;
	position: relative;
	width: 740px;
	background-image: url('../../assets/images/indexBg.png');
	background-size: cover; /* 图片等比例放大以覆盖整个容器，可能会裁剪 */
	background-repeat: no-repeat; /* 不重复背景图片 */
	background-position: center center; /* 图片居中显示 */
	margin: 20px auto;
	.git-text {
		font-size: 14px;
		background-color: #e4f4fa;
		opacity: .8;
		border-radius: 4px;
		width: 160px;
		padding: 10px;
	}
	.top-right {
		position: absolute;
		top: 0;
		right: 0;
	}
	.bottom-left {
		position: absolute;
		bottom: 18px;
		left: 46px;
	}
	.bottom-right {
		position: absolute;
		bottom: 0;
		right: 0;
	}
	.width-text {
		width: 70px;
		display: inline-block;
	}
	.t-blue {
		color: #486ff2;
		margin-right: 4px;
	}
}
</style>