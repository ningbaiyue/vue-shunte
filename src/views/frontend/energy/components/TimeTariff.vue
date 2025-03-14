<template>
	<div class="ml20 mr20">
		<div class="flex justify-between">
			<div class="nav-title mr20 mb10"><span class="xian"></span>分时电价管理</div>
			<el-button type="primary" @click="addForm">新增策略</el-button>
		</div>
		<el-divider />
		<el-table v-loading="loading" :data="tableData" :span-method="objectSpanMethod" border>
			<el-table-column prop="series" label="策略名称"></el-table-column>
			<el-table-column prop="station" label="应用的电站"></el-table-column>
			<el-table-column prop="date" label="生态时间"></el-table-column>
			<el-table-column prop="startTime" label="开始时间"></el-table-column>
			<el-table-column prop="endTime" label="结束时间"></el-table-column>
			<el-table-column prop="type" label="峰谷类型"></el-table-column>
			<el-table-column prop="price" label="电价($)"></el-table-column>
			<el-table-column label="操作" align="center" width="180">
				<template slot-scope="scope">
					<el-button type="primary" size="mini" @click="handleEdit(scope.row)">编辑</el-button>
					<el-button size="mini" @click="handleDelete(scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<div class="dialog-footer">
			<el-button @click="cancel(false)">取 消</el-button>
			<el-button type="primary" @click="submitForm">保 存</el-button>
		</div>
		
		<!-- 电价配置弹出框 -->
		<el-dialog :title="title" :visible.sync="openHourly" width="1600px" append-to-body>
			<hourly-power ref="hourlyPower" :init-data="timeData" :isApp="true" :is-footer="true" @close="cancelChild" />
		</el-dialog>
	</div>
</template>

<script>
import hourlyPower from "@/views/frontend/components/hourlyPower";

export default {
	name: "TimeTariff",
	components: {hourlyPower},
	data() {
		return {
			tableData: [
				{
					series: '峰谷系列',
					station: '南非共和国JG电站',
					date: '2024-10-15 00:00',
					startTime: '0000',
					endTime: '0008',
					type: '低谷',
					price: '0.25'
				},
				{
					series: '峰谷系列',
					station: '南非共和国JG电站',
					date: '2024-10-15 00:00',
					startTime: '0800',
					endTime: '1200',
					type: '尖峰',
					price: '1.55'
				},
				{
					series: '峰谷系列',
					station: '南非共和国JG电站',
					date: '2024-10-15 00:00',
					startTime: '1200',
					endTime: '1800',
					type: '峰谷',
					price: '0.88'
				},
				{
					series: '峰谷系列',
					station: '南非共和国JG电站',
					date: '2024-10-15 00:00',
					startTime: '1800',
					endTime: '2359',
					type: '平谷',
					price: '0.5'
				},
				{
					series: '前端峰谷',
					station: '南非Exo电站',
					date: '2024-10-15 00:00',
					startTime: '0000',
					endTime: '0008',
					type: '低谷',
					price: '0.25'
				},
				{
					series: '前端峰谷',
					station: '南非Exo电站',
					date: '2024-10-15 00:00',
					startTime: '0800',
					endTime: '2359',
					type: '尖峰',
					price: '1.55'
				}
			],
			spanArr: [], // 用于存储合并的行数
			loading: false, // 加载状态
			openHourly: false, // 是否显示弹出层
			timeData: {
				tacticsName: '',
				effectiveTime: '',
				application: '',
				tableData: []
			},
			title: '策略编辑'
		}
	},
	mounted() {
		this.fetchData();
	},
	methods: {
		submitForm() {},
		cancel(flay) {
			flay = typeof flay != "boolean" ? false : flay;
			this.$emit('close', flay)
		},
		addForm() {
			this.openHourly = true;
		},
		cancelChild() {
			this.openHourly = false;
		},
		// 获取表格数据
		async fetchData() {
			this.loading = true;
			try {
				// const response = await getTimeOfUsePricingData(); // 调用接口获取数据
				// this.tableData = response.data; // 假设接口返回的数据格式为 { data: [...] }
				this.calculateSpanArr(); // 计算合并的行数
			} catch (error) {
				this.$message.error('数据加载失败: ' + error.message);
			} finally {
				this.loading = false;
			}
		},
		// 计算需要合并的行数
		calculateSpanArr() {
			this.spanArr = [];
			let pos = 0;
			while (pos < this.tableData.length) {
				let count = 1;
				while (
						pos + count < this.tableData.length &&
						this.tableData[pos + count].series === this.tableData[pos].series &&
						this.tableData[pos + count].station === this.tableData[pos].station &&
						this.tableData[pos + count].date === this.tableData[pos].date
						) {
					count++;
				}
				this.spanArr.push(count);
				pos += count;
			}
		},
		// 合并单元格的方法
		objectSpanMethod({ row, column, rowIndex, columnIndex }) {
			if (columnIndex === 0 || columnIndex === 1 || columnIndex === 2 || columnIndex === 7) {
				for (let i = 0; i < this.spanArr.length; i++) {
					if (rowIndex === this.spanArr.slice(0, i).reduce((a, b) => a + b, 0)) {
						return {
							rowspan: this.spanArr[i],
							colspan: 1
						};
					}
				}
				return {
					rowspan: 0,
					colspan: 0
				};
			}
		},
		handleEdit(row) {
			this.openHourly = true;
		},
		handleDelete(row) {}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

::v-deep .el-divider--horizontal {
	margin: 10px auto;
}
.dialog-footer {
	text-align: center;
	margin-top: 30px;
}
</style>