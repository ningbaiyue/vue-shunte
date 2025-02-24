<template>
	<div class="app-container">
		<!-- 主要内容区域 -->
		<el-row :gutter="10">
			<!-- 左列 -->
			<el-col :span="8">
				<!-- 电站概览 -->
				<el-card class="mb10">
					<el-row>
						<el-col :span="20">
							<div class="card-title">电站概览</div>
							<div class="li-span">
								<span>总数：1999</span>
								<span>在线：1999</span>
								<span>离线：1999</span>
							</div>
						</el-col>
						<el-col :span="4" class="button-right">
							<el-button type="primary" plain size="mini" @click="handleAdd">新建电站</el-button>
						</el-col>
					</el-row>
					
					<el-row class="mt10 flex align-end mb20">
						<el-col :span="20">
							<el-row>
								<el-col>
									<el-row>
										<el-col :span="12">
											<div class="middle-title mt10">装机总量</div>
											<div class="middle-title"><span>4553</span> KWh</div>
										</el-col>
										<el-col :span="12">
											<div class="middle-title mt10">总功率</div>
											<div class="middle-title"><span>455</span> KW</div>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="4" class="button-right">
							<el-button type="primary" size="mini" @click="handleAdd">电站列表</el-button>
						</el-col>
					</el-row>
					
					<div class="list-item" style="height: 280px;">
						<div v-for="(station, index) in stations" :key="index" class="station-item mt10">
							<el-row>
								<el-col :span="6">
									<el-image style="width: 110px; height: 60px; border-radius: 6px;" :src="url" fit="fill" class="station-image"></el-image>
								</el-col>
								<el-col :span="18">
									<div class="flex justify-between align-center">
										<span class="card-title">{{ station.name }}</span>
										<svg-icon class="item" icon-class="wifi_4"/>
										<!--									<svg-icon class="item" icon-class="wifi_3"/>
																			<svg-icon class="item" icon-class="wifi_2"/>
																			<svg-icon class="item" icon-class="wifi_1"/>
																			<svg-icon class="item" icon-class="wifi_0"/>-->
									</div>
									<div class="flex justify-between align-center">
										<div class="text-item">
											<div>容量：{{ station.capacity }}kWh</div>
											<div class="text-muted">位置：{{ station.location }}</div>
										</div>
										<div><i class="el-icon-arrow-right"></i></div>
									</div>
								</el-col>
							</el-row>
						</div>
					</div>
				</el-card>
				
				<!-- 充放电量图表 -->
				<energy-chart></energy-chart>
			</el-col>
			
			<!-- 右列 -->
			<el-col :span="16">
				<!-- 收益统计 -->
				<!-- 当前电站详情 -->
				<el-card class="">
					<div class="card-title">参考收益</div>
					<el-row :gutter="20">
						<el-col :span="6" v-for="(item, key, index) in earnings" :key="key" class="mt10">
							<div class="earning-item">
								<div class="value" :style="{ color: index > 3 ? '#1DAB52' : '#FF9700' }">{{ item }}</div>
								<div class="label">{{ key }}</div>
							</div>
						</el-col>
					</el-row>
					<map-view></map-view>
					<el-row :gutter="20">
						<el-col :span="6" v-for="(item, key, index) in dischargeData" :key="key" class="mt10">
							<div class="earning-item">
								<div class="label">{{ key }}</div>
								<div class="value mt5" :style="{ color: index > 3 ? '#1DAB52' : '#FF9700' }">{{ item }}</div>
							</div>
						</el-col>
					</el-row>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import EnergyChart from './components/EnergyChart.vue'
import MapView from "@/views/frontend/components/MapView.vue";

export default {
	name: 'Index',
	components: { EnergyChart, MapView },
	data() {
		return {
			url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
			stations: [
				{ name: '双轴输出区加件xxxxx电站', capacity: '100000.00', location: '美国加件xxxxxxxxxx...' },
				{ name: '双轴输出区xxxxx电站', capacity: '100000.00', location: '美国加件xxxxxxxxxx...' },
				{ name: '系统配置xxxxx电站', capacity: '100000.00', location: '美国xxxxxxxxxx...' }
			],
			earnings: {
				'日收入($)': '0.7',
				'月收入($)': '331.5',
				'年收入($)': '1.5',
				'累计收入($)': '25330.2',
				'日节约($)': '44440.3',
				'月节约($)': '30.2',
				'年节约($)': '40.3',
				'累计节约($)': '651.52',
			},
			dischargeData: {
				'日充放电量(kWh)': '21.2/2.15',
				'月充放电量(kWh)': '21.1/2.15',
				'年充放电量(kWh)': '22.1/2.15',
				'累计充放电量(kWh)': '12.3/2.15'
			},
		}
	},
	mounted() {
	},
	methods: {
		handleAdd() {
			this.$message('新建电站')
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

</style>