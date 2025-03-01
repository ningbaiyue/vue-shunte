<template>
	<div class="app-container">
		<el-card body-style="padding:10px" class="mb10">
			<div class="flex-space-between">
				<div class="nav-title">
					<span class="xian"></span>
					<el-select v-model="selectValue" placeholder="请选择">
						<el-option
								v-for="item in options"
								:key="item.value"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</div>
				<el-button type="primary" size="mini" @click="back">返回</el-button>
			</div>
		</el-card>
		
		<el-card body-style="padding-top:10px" class="mb10">
			<el-row :gutter="30" class="mb10">
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-green">在线</div>
							<div>在线状态</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-green">充电</div>
							<div>充放电状态</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-green">无告警</div>
							<div>告警状态</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">721 V</div>
							<div>总电压</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">101.1 A</div>
							<div>总电流</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">30.1 ℃</div>
							<div>平均温度</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">30.2  %</div>
							<div>SOC</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">145 kWh</div>
							<div>日充电量</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">101.1  kWh</div>
							<div>日放电量</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">145 kWh</div>
							<div>累计充电电量</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">101.1  kWh</div>
							<div>累计放电电量</div>
						</div>
					</div>
				</el-col>
				<el-col :xs="12" :sm="8" :md="6" :lg="4" :xl="4">
					<div class="status-text flex align-center">
						<div class="blue-line"></div>
						<div>
							<div class="one-text bigText status-info">3 KΩ</div>
							<div>绝缘电阻</div>
						</div>
					</div>
				</el-col>
			</el-row>
			
			<el-row :gutter="20">
				<el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
					<ul class="infoList">
						<li>
							<div>最高温度(℃)</div>
							<div>43.1</div>
						</li>
						<li>
							<div>最底温度(℃)</div>
							<div>32.5</div>
						</li>
						<li>
							<div>最高电压(mV)</div>
							<div>221</div>
						</li>
						<li>
							<div>最低电压(mV)</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
				<el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
					<ul class="infoList">
						<li>
							<div>最高电压单体号</div>
							<div>43.1</div>
						</li>
						<li>
							<div>最低电压单体号</div>
							<div>32.5</div>
						</li>
						<li>
							<div>最高温度单体号</div>
							<div>221</div>
						</li>
						<li>
							<div>最低温度单体号</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
				<el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
					<ul class="infoList">
						<li>
							<div>可充电电量(kWh)</div>
							<div>43.1</div>
						</li>
						<li>
							<div>可放电电量(kWh)</div>
							<div>32.5</div>
						</li>
						<li>
							<div>最大充电电压(V)</div>
							<div>221</div>
						</li>
						<li>
							<div>最大放电电压(V)</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
				<el-col :xs="12" :sm="12" :md="8" :lg="6" :xl="6">
					<ul class="infoList">
						<li>
							<div>最大充电电流(A)</div>
							<div>43.1</div>
						</li>
						<li>
							<div>最大放电电流(A)</div>
							<div>32.5</div>
						</li>
						<li>
							<div>最大充电功率(kW)</div>
							<div>221</div>
						</li>
						<li>
							<div>最大放电功率(kW)</div>
							<div>221</div>
						</li>
					</ul>
				</el-col>
			</el-row>
		</el-card>
		
<!--	单体信息	-->
		<el-card>
			<el-row class="mb10">
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
					<el-row>
						<el-col :xs="24" :sm="24" :md="3" :lg="3" :xl="3">
							<div class="nav-title"><span class="xian"></span>单体信息</div>
						</el-col>
						<el-col :xs="24" :sm="24" :md="21" :lg="21" :xl="21" class="flex">
							<span class="info-text"><span class="big-dian"></span>最低单体温度</span>
							<span class="info-text red"><span class="big-dian red"></span>最高单体温度</span>
							<span class="info-text orange"><span class="big-dian orange"></span>单体最低电压</span>
							<span class="info-text yellow"><span class="big-dian yellow"></span>单体最高电压</span>
						</el-col>
					</el-row>
				</el-col>
				<el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12" class="flex justify-end">
					<el-radio-group v-model="viewMode" size="medium">
						<el-radio-button label="graphics">图形</el-radio-button>
						<el-radio-button label="list">图表</el-radio-button>
					</el-radio-group>
					<div class="flex" style="margin-left: 10px">
						<el-input
								v-model="searchQuery"
								placeholder="请输入编号"
								clearable
								style="margin-right: 10px;"
						></el-input>
						<el-button type="primary" size="mini" @click="handleSearch">搜索</el-button>
					</div>
				</el-col>
			</el-row>
<!--	切换图形		-->
			<div v-if="viewMode === 'graphics'">
				<el-row :gutter="20" class="list-wrapper">
					<div v-for='(item,index) in filteredData' :key="index" class="battery-box">
						<div :class="getColClass(item)" class="top"></div>
						<div :class="getColClass(item)" class="border">
							<p>#{{item.id}}</p>
							<p :class="voltageClass(item.voltage)">{{item.voltage}}mV</p>
							<p :class="temperatureClass(item.temperature)">{{item.temperature}}℃</p>
						</div>
					</div>
				</el-row>
			</div>
<!--	切换图表		-->
			<div v-if="viewMode === 'list'">
				<!-- 显示分割后的表格 -->
				<el-row :gutter="20" class="mb10 list-wrapper">
					<el-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" v-for="(tableData, index) in splitTables" :key="index" class="mb20">
						<el-table
								:data="tableData"
								style="width: 100%"
								stripe
								@sort-change="handleSortChange"
						>
							<el-table-column prop="id" label="序号" sortable></el-table-column>
							<el-table-column prop="voltage" label="电压" sortable>
								<template slot-scope="{ row }">
									<span :class="voltageClass(row.voltage)">{{ row.voltage }}</span>
								</template>
							</el-table-column>
							<el-table-column prop="temperature" label="温度" sortable>
								<template slot-scope="{ row }">
									<span :class="temperatureClass(row.temperature)">{{ row.temperature }}</span>
								</template>
							</el-table-column>
						</el-table>
					</el-col>
				</el-row>
			</div>
		</el-card>
	</div>
</template>

<script>
import Template from "@/views/iot/template/index.vue";

export default {
	name: "batteryClusters",
	components: {Template},
	data() {
		return {
			selectValue: '',
			options: [
				{ value: '1', label: '电池簇1' },
				{ value: '2', label: '电池簇2' },
				{ value: '3', label: '电池簇3' },
			],
			viewMode: 'graphics',
			filteredData: [], // 过滤后的数据 (用于卡片视图)
			iconListData: [
				{ id: 1, voltage: 3200, temperature: '' },
				{ id: 2, voltage: 3200, temperature: 19.9 },
				{ id: 3, voltage: 3200, temperature: 60.9 },
				{ id: 4, voltage: 3000, temperature: 29.1 },
				{ id: 5, voltage: 4200, temperature: 29.1 },
				{ id: 6, voltage: 3000, temperature: 60.9 },
			], // 所有数据
			splitTables: [], // 分割后的表格数据
			searchQuery: '', // 搜索关键字
			sortProp: '', // 当前排序字段
			sortOrder: '' // 当前排序顺序 (ascending/descending)
		}
	},
	created() {
		this.generateData(); // 在 created 钩子中生成数据
		this.splitDataIntoTables(); // 分割数据
		this.filteredData = this.iconListData
	},
	methods: {
		generateData() {
			// 生成 60 条数据
			const data = [];
			for (let i = 7; i < 120; i++) {
				data.push({
					id: i, // ID
					voltage: 3200, // 随机数值 (0~99)
					temperature: 29.1 // 随机年龄 (0~99)
				});
			}
			this.iconListData = [...this.iconListData, ...data] ; // 将生成的数据赋值给 listData
		},
		// 将数据分割成多个表格
		splitDataIntoTables() {
			const chunkSize = 12; // 每个表格显示 12 条数据
			this.splitTables = [];
			for (let i = 0; i < this.iconListData.length; i += chunkSize) {
				this.splitTables.push(this.iconListData.slice(i, i + chunkSize));
			}
		},
		// 处理搜索
		handleSearch() {
			const query = this.searchQuery.toLowerCase();
			if (!query) {
				this.splitDataIntoTables(); // 如果没有搜索关键字，恢复原始数据
				this.filteredData = this.iconListData;  // 恢复图标视图的数据
				return;
			}
			
			// 过滤数据
			const filteredData = this.iconListData.filter(
					(item) =>
							item.id.toString().includes(query) ||
							item.voltage.toString().includes(query) ||
							item.temperature.toString().includes(query)
			);
			
			// 重新分割数据
			const chunkSize = 20;
			this.splitTables = [];
			for (let i = 0; i < filteredData.length; i += chunkSize) {
				this.splitTables.push(filteredData.slice(i, i + chunkSize));
			}
			
			// 更新图标视图的数据
			this.filteredData = filteredData;
		},
		// 处理排序
		handleSortChange({ prop, order }) {
			this.sortProp = prop;
			this.sortOrder = order;
			this.sortData();
		},
		// 排序数据
		sortData() {
			if (!this.sortProp || !this.sortOrder) {
				this.splitDataIntoTables(); // 如果没有排序条件，恢复原始数据
				this.filteredData = this.iconListData;  // 恢复图标视图的数据
				return;
			}
			
			// 排序逻辑
			const sortedData = this.iconListData.slice().sort((a, b) => {
				if (this.sortOrder === 'ascending') {
					return a[this.sortProp] - b[this.sortProp];
				} else {
					return b[this.sortProp] - a[this.sortProp];
				}
			});
			
			// 重新分割数据
			const chunkSize = 20;
			this.splitTables = [];
			for (let i = 0; i < sortedData.length; i += chunkSize) {
				this.splitTables.push(sortedData.slice(i, i + chunkSize));
			}
			// 更新图标视图的数据
			this.filteredData = sortedData;
		},
		back() {
			this.$router.go(-1);
		},
	},
	computed: {
		// 根据 temperature和voltage 的值返回对应的样式类
		temperatureClass() {
			return (temperature) => {
				if (temperature <= 20 && temperature) return "text-blue"
				if (temperature >= 40 && temperature) return "text-red"
				return ''
			}
		},
		voltageClass() {
			return (voltage) => {
				if (voltage <= 3000 && voltage) return "text-orange"
				if (voltage >= 4000 && voltage) return "text-yellow"
				return ''
			}
		},
		// 根据返回整行的背景样式类
		getColClass() {
			return (row) => {
				if (row.temperature <= 20 && row.temperature) return "blue"
				if (row.temperature >= 40 && row.temperature) return "red"
				if (row.voltage <= 3000 && row.voltage) return "orange"
				if (row.voltage >= 4000 && row.voltage) return "yellow"
				if (!row.temperature) return "info"
				return ''
			}
		}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

.blue-line {
	width: 10px;
	height: 36px;
	background: #486ff2;
	margin-right: 30px;
	border-radius: 10px;
}
.info-text {
	font-size: 14px;
	color: #486ff2;
	line-height: 20px;
	display: flex;
	align-items: center;
	&.red {
		color: #FF3A3A;
	}
	&.orange {
		color: #DE6A00;
	}
	&.yellow {
		color: #FFB30E;
	}
	.big-dian {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		background: #486ff2;
		display: inline-block;
		margin-right: 4px;
		margin-left: 10px;
		&.red {
			background: #FF3A3A;
		}
		&.orange {
			background: #DE6A00;
		}
		&.yellow {
			background: #FFB30E;
		}
	}
}
/* 列表容器 */
.list-wrapper {
	height: 600px; /* 固定高度 */
	overflow-y: auto; /* 启用垂直滚动条 */
	margin-left: 10px!important;
}
.battery-box {
	width: 74px;
	height: 90px;
	display: inline-block;
	margin: 10px 10px 10px 0;
	.top {
		width: 21.6px;
		height: 5.87px;
		line-height: 17px;
		border-radius: 8px 8px 0 0;
		background: #1DAB52;
		margin: 0 auto;
		border: 1px solid #1DAB52;
		&.blue {
			background: #486ff2;
			border-color: #486ff2;
		}
		&.red {
			background: #FF3A3A;
			border: 1px solid #FF3A3A;
		}
		&.info {
			background: #6C6C6C;
			border: 1px solid #6C6C6C;
		}
		&.orange {
			background: #DE6A00;
			border: 1px solid #DE6A00;
		}
		&.yellow {
			background: #FFB30E;
			border: 1px solid #FFB30E;
		}
	}
	.border {
		width: 74px;
		height: 84px;
		border: 2px solid #1DAB52;
		border-radius: 8px;
		font-size: 12px;
		padding: 18px 6px;
		&.blue {
			border-color: #486ff2;
		}
		&.red {
			border-color: #FF3A3A;
		}
		&.info {
			border-color: #6C6C6C;
		}
		&.orange {
			border-color: #DE6A00;
		}
		&.yellow {
			border-color: #FFB30E;
		}
		.text-blue {
			color: #486ff2;
		}
		.text-red {
			color: #FF3A3A;
		}
		.text-orange {
			color: #DE6A00;
		}
		.text-yellow {
			color: #FFB30E;
		}
	}
}
</style>