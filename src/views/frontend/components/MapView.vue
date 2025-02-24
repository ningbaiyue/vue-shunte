<template>
	<div class="app-container">
		<div ref="mapChart" style="width: 100%; height: 600px;"></div>
		
		<el-dialog
				:visible.sync="dialogVisible"
				title="点位详细信息"
				width="30%">
			<div v-if="selectedData">
				<p>城市：{{ selectedData.name }}</p>
				<p>日收入：{{ selectedData.dayIncome }} 起</p>
				<p>累计植树：{{ selectedData.trees }}棵</p>
				<p>累计减排：{{ selectedData.emission }}tbs</p>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import '@/utils/echarts/map/js/china.js' // 引入中国地图

export default {
	name: 'MapChart',
	data() {
		return {
			dialogVisible: false,
			selectedData: null,
			mapData: [
				{ name: '北京', value: [116.40, 39.90], dayIncome: 20.0, trees: 65152, emission: 549.65 },
				{ name: '上海', value: [121.47, 31.23], dayIncome: 25.3, trees: 44520, emission: 432.10 },
				// 添加更多城市数据...
			]
		}
	},
	mounted() {
		this.initChart()
	},
	methods: {
		initChart() {
			const chart = this.$echarts.init(this.$refs.mapChart)
			
			// 自定义图标路径（图片放在public目录下）
			const iconPath = '/images/marker.png'
			
			const option = {
				geo: [
					// 地图轮廓投影
					{
						map: 'china',
						layoutCenter: ['50%', '50%'], // 地图位置
						layoutSize: '100%', // 地图大小
						silent: true, // 不响应鼠标事件
						itemStyle: {
							borderWidth: 6,
							borderColor: '#ffffff', // 边框颜色
							shadowColor: 'rgba(215,224,232,0.53)', // 阴影颜色
							shadowBlur: 3, // 阴影大小
						},
						// 隐藏
						regions: [{ // 选中的区域
							name: '南海诸岛',
							itemStyle: {
								opacity: 0
							},
						}],
					},
					// 上层交换图层
					{
						map: 'china',
						layoutCenter: ['50%', '50%'], // 地图位置
						layoutSize: '100%', // 地图大小
						label: { // 标签
							show: false,
							color: '#bbd0fd',
							fontSize: 14,
						},
						emphasis: {
							label: {
								show: true,
								color: '#ffffff',
							},
							itemStyle: {
								areaColor: '#486ff2',
							},
						},
						itemStyle: {
							areaColor: 'rgba(220,238,255,0.9)', // 地图颜色
							borderColor: '#b8c3d6',
							borderWidth: 1,
						},
						regions: [{
							name: '南海诸岛',
							label: {
								show: true,
								color: '#486ff2',
							},
							itemStyle: {
								borderWidth: 1.5,
								borderColor: '#486ff2',
								shadowColor: 'rgba(0, 132, 254, 0.83)',
								shadowBlur: 1,
							},
						}],
					},
					// 下层投影效果图层，实现立体感
					{
						map: 'china',
						zlevel: -1, // 图层深度
						layoutCenter: ['50%', '53%'], // 地图位置
						layoutSize: '100%', // 地图大小
						silent: true, // 不响应鼠标事件
						label: {
							show: false,
						},
						emphasis: {
							label: {
								show: false,
							},
							itemStyle: {
								areaColor: '#cdced3',
							},
						},
						itemStyle: {
							areaColor: 'rgba(217,237,255,0.83)',
							borderColor: '#eceef4',
							borderWidth: 1,
							shadowOffsetY: 0,
							shadowBlur: 20,
						},
						// 隐藏
						regions: [{
							name: '南海诸岛',
							itemStyle: {
								opacity: 0,
							},
						}],
					}
				],
				series: [
					{
						name: '',
						type: 'effectScatter',
						coordinateSystem: 'geo',
						data: this.mapData,
						symbolSize: 10, // 图标大小
						showEffectOn: 'render', // 渲染时显示特效
						rippleEffect: {
							brushType: 'stroke',
						},
						emphasis: {
							scale: true,
						},
						tooltip: {
							show: false,
						},
						label: {
							show: true,
							formatter: params => params.data.value,
							position: 'top',
							distance: 10,
							backgroundColor: '#112a06',
							padding: [4, 7, 2, 7],
							borderWidth: 1,
							borderColor: '#fabe00',
							color: '#fabe00',
							fontSize: 16,
							fontWeight: 'bold',
						},
						itemStyle: {
							color: '#fabe00',
						},
						zlevel: 1,
					},
				]
			}
			
			chart.setOption(option)
			
			// 点击事件绑定
			/*chart.on('click', params => {
				this.selectedData = params.data
				this.dialogVisible = true
			})*/
			
			// 窗口自适应
			window.addEventListener('resize', () => chart.resize())
		}
	}
}
</script>

<style scoped>

</style>