<template>
	<div class="app-container">
		<el-card body-style="padding-bottom:4px;" class="mb10">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
				<el-form-item label="储能单元" prop="city">
					<el-select v-model="queryParams.city" placeholder="请选择储能单元" clearable>
						<el-option
								v-for="item in cityList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="时间">
					<el-date-picker
							v-model="dateRange"
							style="width: 240px"
							value-format="yyyy-MM-dd"
							type="daterange"
							range-separator="-"
							start-placeholder="开始日期"
							end-placeholder="结束日期"
					></el-date-picker>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
					<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-card style="padding-bottom:100px;">
			<div class="flex-space-between mb10">
				<div class="flex">
					<div class="nav-title mr20"><span class="xian"></span>功率报表</div>
					<el-radio-group v-model="dateTab" size="small" @input="handleTabChange">
						<el-radio-button label="day">日</el-radio-button>
						<el-radio-button label="month">月</el-radio-button>
						<el-radio-button label="year">年</el-radio-button>
					</el-radio-group>
				</div>
				<el-button type="primary" plain size="mini" @click="">导出</el-button>
			</div>
			<el-table v-loading="loading" :data="tableList" show-summary sum-text="总计" stripe :header-cell-style="{'background': '#F7F7F7'}" border>
				<el-table-column label="序号" type="index" align="left">
					<template slot-scope="scope">
						<span>{{ scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="储能单元" align="left" prop="categoryName" />
				<el-table-column label="总有功功率" align="left" prop="country" />
				<el-table-column label="直流功率" align="left" prop="address" />
				<el-table-column label="A相有功功率" align="left" prop="city" />
				<el-table-column label="B相有功功率 " align="left" prop="axis" />
				<el-table-column label="C相有功功率" align="left" prop="axis" />
				<el-table-column label="总放电量(kWh)" align="left" prop="axis" />
				<el-table-column label="总无功功率" align="left" prop="axis" />
				<el-table-column label="交流功率" align="left" prop="axis" />
			</el-table>
			
			<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
									:limit.sync="queryParams.pageSize" @pagination="getList" />
		</el-card>
	</div>
</template>

<script>
export default {
	name: "power",
	data() {
		return {
			// 遮罩层
			loading: false,
			cityList: [{value: 1, label: '广州'}, {value: 2, label: '深圳'}],
			// 日期范围
			dateRange: [],
			tableList: [],
			// 总条数
			total: 0,
			// 查询参数
			queryParams: {
				city: undefined,
				pageNum: 1,
				pageSize: 20,
			},
			dateTab: 'day'
		}
	},
	methods: {
		getList() {
			this.loading = false
		},
		/** 搜索按钮操作 */
		handleQuery() {
			this.getList();
		},
		/** 重置按钮操作 */
		resetQuery() {
			this.resetForm("queryForm");
			this.handleQuery();
		},
		handleTabChange(val) {
			console.log(val)
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

</style>