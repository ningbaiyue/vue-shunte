<template>
	<div class="app-container">
		<el-card body-style="padding:10px">
			<div class="flex-space-between">
				<div class="nav-title"><span class="xian"></span>储能单元</div>
				<el-button type="primary" size="mini" @click="handleAllocate">配置</el-button>
			</div>
		</el-card>
		<el-row :gutter="20" class="mt10">
			<!-- 左列 -->
			<el-col :xs="24" :sm="24" :md="24" :lg="16" :xl="18">
				<el-row :gutter="10">
					<el-col :xs="24" :sm="16" :md="17" :lg="16" :xl="17" class="mb10">
						<el-card style="height: 250px;">
							<div class="picker-box">
								<el-image v-for="item in url" style="width: 130px; height: 130px; background: none;" :src="item" fit="contain"></el-image>
							</div>
						</el-card>
					</el-col>
					<el-col  :xs="24" :sm="8" :md="7" :lg="8" :xl="7">
						<el-card body-style="padding:10px;">
							<div class="mini-t-brn mt10">
								<div class="item">控制命令</div>
								<el-button type="success" plain size="mini" @click="">执行</el-button>
							</div>
							<div class="mini-t-brn">
								<div class="item">开关机控制</div>
								<el-radio-group v-model="activeTab1" size="small" @input="handleTabChange">
									<el-radio-button label="open">开</el-radio-button>
									<el-radio-button label="close">关</el-radio-button>
									<el-radio-button label="wait">待机</el-radio-button>
								</el-radio-group>
							</div>
							<div class="mini-t-brn">
								<div class="item">远程调试</div>
								<el-radio-group v-model="activeTab2" size="small" @input="handleTabChange">
									<el-radio-button label="open">开</el-radio-button>
									<el-radio-button label="close">关</el-radio-button>
									<el-radio-button label="wait">待机</el-radio-button>
								</el-radio-group>
							</div>
							<div class="mini-t-brn">
								<div class="item">电池接触器</div>
								<el-radio-group v-model="activeTab3" size="small" @input="handleTabChange">
									<el-radio-button label="close">闭合</el-radio-button>
									<el-radio-button label="disconnect">断开</el-radio-button>
								</el-radio-group>
							</div>
							<div class="mini-t-brn">
								<div class="item">清楚故障</div>
								<el-button plain size="mini" @click="">清除</el-button>
							</div>
						</el-card>
					</el-col>
				</el-row>
				<!--		拆线图			-->
				<el-row>
					<el-card body-style="padding:10px;">
						<time-line ref="timeLine" :option-set="option" :series-data="series" :height="300"></time-line>
					</el-card>
				</el-row>
				<!--		柱图			-->
				<el-card body-style="padding:10px;" class="mt10 mb10">
					<energy-chart type="dates" chart-title="充放电量" :height="280"></energy-chart>
				</el-card>
			</el-col>
			
			<!-- 右列 -->
			<el-col :xs="24" :sm="24" :md="24" :lg="8" :xl="6" class="mb10">
				<el-card>
					<div class="card-title"><span class="dian"></span>状态</div>
					<el-row :gutter="10">
						<el-col :span="8">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="one-text">并网运行</div>
									<div>工作状态</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="one-text">并网</div>
									<div>运行模式</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="one-text" style="color: #FF3A3A">有告警</div>
									<div>告警状态</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="one-text">放电</div>
									<div>电池充放电状态</div>
								</div>
							</div>
						</el-col>
						<el-col :span="8">
							<div class="status-text flex align-center">
								<div class="blue-line"></div>
								<div>
									<div class="one-text" style="color: #67C23A">在线</div>
									<div>PCS状态</div>
								</div>
							</div>
						</el-col>
					</el-row>
					
					<div class="card-title mt20 mb20"><span class="dian"></span>实时信息</div>
					<el-table :data="tableData" stripe :header-cell-style="{'background': '#F7F7F7'}" style="width: 100%">
						<el-table-column prop="name" label="信号名称"></el-table-column>
						<el-table-column prop="value" label="值" width="100"></el-table-column>
					</el-table>
				</el-card>
			</el-col>
		</el-row>
<!--	最底列表	-->
		<el-row :gutter="10">
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb10">
				<el-card body-style="padding: 10px 10px 20px 10px">
					<div class="flex-space-between">
						<div class="card-title"><span class="dian"></span>PCS</div>
						<div>
							<el-button plain size="mini" @click="handleAllocate">配置</el-button>
							<el-button plain size="mini" @click="detailPCS">详情</el-button>
						</div>
					</div>
					<ul class="nth mt10">
						<li class="table-list">
							<span>通讯状态</span>
							<span class="status-green">在线</span>
						</li>
						<li class="table-list">
							<span>工作状态</span>
							<span>运行中</span>
						</li>
						<li class="table-list">
							<span>运行模式</span>
							<span>并网</span>
						</li>
						<li class="table-list">
							<span>逆变器总功率</span>
							<span>70.1kW</span>
						</li>
						<li class="table-list">
							<span>PCS交流功率设置值</span>
							<span>70.1kW</span>
						</li>
						<li class="table-list">
							<span>日充电量</span>
							<span>70.1kW</span>
						</li>
						<li class="table-list">
							<span>日放电量</span>
							<span>70.1kW</span>
						</li>
					</ul>
				</el-card>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb10">
				<el-card body-style="padding: 10px 10px 20px 10px">
					<div class="flex-space-between">
						<div class="card-title"><span class="dian"></span>BMS</div>
						<div>
							<el-button plain size="mini" @click="handleAllocate">配置</el-button>
							<el-button plain size="mini" @click="detailBMS">详情</el-button>
						</div>
					</div>
					<ul class="nth mt10">
						<li class="table-list">
							<span>通讯状态</span>
							<span class="status-green">在线</span>
						</li>
						<li class="table-list">
							<span>主接触器状态</span>
							<span>运行中</span>
						</li>
						<li class="table-list">
							<span>电池堆充放电状态</span>
							<span>并网</span>
						</li>
						<li class="table-list">
							<span>电池总电流</span>
							<span>70.1kW</span>
						</li>
						<li class="table-list">
							<span>电池总电压</span>
							<span>70.1kW</span>
						</li>
						<li class="table-list">
							<span>堆可充电电量</span>
							<span>70.1kW</span>
						</li>
						<li class="table-list">
							<span>堆可放电电量</span>
							<span>70.1kW</span>
						</li>
					</ul>
				</el-card>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb10">
				<el-card body-style="padding: 10px 10px 20px 10px">
					<div class="flex-space-between">
						<div class="card-title"><span class="dian"></span>空调</div>
						<div>
							<el-button plain size="mini" @click="handleAllocate">配置</el-button>
							<el-button plain size="mini" @click="detailAir">详情</el-button>
						</div>
					</div>
					<ul class="nth mt10">
						<li class="table-list">
							<span>通讯状态</span>
							<span class="status-green">在线</span>
						</li>
						<li class="table-list">
							<span>室内湿度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>室内温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>蒸发温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>室外温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>开关机状态</span>
							<span>打开</span>
						</li>
						<li class="table-list">
							<span>模式</span>
							<span>制冷</span>
						</li>
					</ul>
				</el-card>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb10">
				<el-card body-style="padding: 10px 10px 20px 10px">
					<div class="flex-space-between">
						<div class="card-title"><span class="dian"></span>液冷</div>
						<div>
							<el-button plain size="mini" @click="handleAllocate">配置</el-button>
							<el-button plain size="mini">详情</el-button>
						</div>
					</div>
					<ul class="nth mt10">
						<li class="table-list">
							<span>通讯状态</span>
							<span class="status-green">在线</span>
						</li>
						<li class="table-list">
							<span>环境温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>排气温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>回水温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>出水温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>电芯最大温度</span>
							<span>28.7 ℃</span>
						</li>
						<li class="table-list">
							<span>电芯最小温度</span>
							<span>28.7 ℃</span>
						</li>
					</ul>
				</el-card>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb10">
				<el-card body-style="padding: 10px 10px 20px 10px">
					<div class="flex-space-between">
						<div class="card-title"><span class="dian"></span>消防</div>
						<div>
<!--							<el-button plain size="mini" @click="handleAllocate">配置</el-button>-->
							<el-button plain size="mini" @click="detailFire">详情</el-button>
						</div>
					</div>
					<ul class="nth mt10">
						<li class="table-list">
							<span>通讯状态</span>
							<span class="status-green">在线</span>
						</li>
						<li class="table-list">
							<span>BSPSPD反馈</span>
							<span class="status-green">正常</span>
						</li>
						<li class="table-list">
							<span>远程急停</span>
							<span class="status-green">正常</span>
						</li>
						<li class="table-list">
							<span>可燃气体检测一低浓度</span>
							<span class="status-green">正常</span>
						</li>
						<li class="table-list">
							<span>可燃气体检测-高浓度</span>
							<span class="status-green">正常</span>
						</li>
						<li class="table-list">
							<span>BSP急停按钮</span>
							<span class="status-green">正常</span>
						</li>
						<li class="table-list">
							<span>水浸</span>
							<span class="status-green">正常</span>
						</li>
					</ul>
				</el-card>
			</el-col>
			
			<el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4" class="mb10">
				<el-card body-style="padding: 10px 10px 20px 10px">
					<div class="flex-space-between">
						<div class="card-title"><span class="dian"></span>电表</div>
						<div>
<!--							<el-button plain size="mini" @click="handleAllocate">配置</el-button>-->
							<el-button plain size="mini" @click="detailMeters">详情</el-button>
						</div>
					</div>
					<ul class="nth mt10">
						<li class="table-list">
							<span>通讯状态</span>
							<span class="status-green">在线</span>
						</li>
						<li class="table-list">
							<span>总有功电能</span>
							<span>800 kWh</span>
						</li>
						<li class="table-list">
							<span>总有功功率</span>
							<span>0 kW</span>
						</li>
						<li class="table-list">
							<span>总无功功率</span>
							<span>0 kvar</span>
						</li>
						<li class="table-list">
							<span>总视在功率</span>
							<span>0 kVA</span>
						</li>
						<li class="table-list">
							<span>平均功率因数</span>
							<span>--</span>
						</li>
						<li class="table-list">
							<span>市电状态</span>
							<span class="status-green">正常</span>
						</li>
					</ul>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>
<script>
import pic1 from '../../../assets/images/frontend/pic1.png'
import pic2 from '../../../assets/images/frontend/pic2.png'
import pic3 from '../../../assets/images/frontend/pic3.png'
import TimeLine from "@/views/frontend/components/timeLine.vue";
import EnergyChart from "@/views/frontend/components/EnergyChart.vue";

export default {
	name: "index",
	components: {EnergyChart, TimeLine},
	data() {
		return {
			url: [pic1, pic2, pic3],
			activeTab1: 'open',
			activeTab2: 'open',
			activeTab3: 'close',
			option: {
				title: {
					text: '',
					left: 'center'
				},
				legend: {
					data: ['SOC', '功率'],
					top: 30
				},
				yAxis: {
					type: 'value',
					name: '功率(kW)',
					min: -150,
					max: 150
				},
				series: [
					this.createSeries('SOC', '#5470C6'),
					this.createSeries('功率', '#91CC75'),
				]
			},
			series: {
				'SOC': Math.random() * 100 - 50,
				'功率': Math.random() * 100 - 50,
			},
			tableData: [
				{ name: '储能单元装机容量', value: '221kWh'},
				{ name: '储能单元铭牌功率', value: '100kW'},
				{ name: '系统调度策略', value: '峰谷套利'},
				{ name: '系统总有功功率', value: '70.1kW'},
				{ name: '系统SOC', value: '29%'},
				{ name: '系统SOH', value: '100%'},
				{ name: '当前可放电电量', value: '58kWh'},
				{ name: '当前可充电电量', value: '142kWh'},
				{ name: '日充电电量', value: '206kWh'},
				{ name: '日放电电量', value: '140kWh'},
				{ name: '总充电电量', value: '0.23MWh'},
				{ name: '总放电电量', value: '0.35MWh'},
				{ name: '主从机', value: '从机'},
				{ name: '并机数', value: '3'},
			]
		}
	},
	mounted() {},
	methods: {
		createSeries(name, color) {
			return {
				name: name,
				type: 'line',
				data: [],
				itemStyle: { color },
				animation: false
			}
		},
		/**  配置弹窗  **/
		handleAllocate() {},
		handleTabChange(val) {
			console.log(val)
		},
		/** 最下面PCS跳转详情页 **/
		detailPCS() {
			this.$router.push('/energy/PCS')
		},
		/** 最下面BMS跳转详情页 **/
		detailBMS() {
			this.$router.push('/energy/BMS')
		},
		/** 最下面空调跳转详情页 **/
		detailAir() {
			this.$router.push('/energy/airConditioning')
		},
		/** 最下面电表跳转详情页 **/
		detailMeters() {
			this.$router.push('/energy/meters')
		},
		/** 最下面消防跳转详情页 **/
		detailFire() {
			this.$router.push('/energy/fire')
		}
	}
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/fontend";

.blue-line {
	width: 3px;
	height: 36px;
	background: #486ff2;
	margin-right: 10px;
}
.picker-box {
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 30px;
}
.mini-t-brn {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 13px;
}
.table-list {
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	line-height: 26px;
	padding: 0 10px;
}
.nth > :nth-child(2n + 1) {
	background: #e8e8e8;
}
</style>