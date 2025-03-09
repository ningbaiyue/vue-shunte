<template>
	<div class="app-container">
		<el-card body-style="padding-bottom:4px;" class="mb10">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
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
				<el-form-item style="float:right;">
					<el-button type="primary" plain size="mini" @click="">导出</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-card style="padding-bottom:100px;">
			<div class="flex-space-between mb10">
				<div class="flex">
					<div class="nav-title mr20"><span class="xian"></span>事件报表</div>
					<el-radio-group v-model="eventTab" size="small" @input="handleTabChange">
						<el-radio-button label="all">全部事件</el-radio-button>
						<el-radio-button label="current">当前事件</el-radio-button>
						<el-radio-button label="history">历史事件</el-radio-button>
					</el-radio-group>
				</div>
				<el-radio-group v-model="dateTab" size="small" @input="handleTabChange">
					<el-radio-button label="day">日</el-radio-button>
					<el-radio-button label="month">月</el-radio-button>
					<el-radio-button label="year">年</el-radio-button>
				</el-radio-group>
			</div>
			<el-table v-loading="loading" :data="tableList" show-summary sum-text="总计" stripe :header-cell-style="{'background': '#F7F7F7'}" border>
				<el-table-column label="序号" type="index" align="left">
					<template slot-scope="scope">
						<span>{{ scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="级别" align="left" prop="categoryName" sortable />
				<el-table-column label="储能单元" align="left" prop="country" min-width="150" />
				<el-table-column label="事件号" align="left" prop="address" sortable />
				<el-table-column label="设备名称" align="left" prop="city" />
				<el-table-column label="事件名称" align="left" prop="axis" />
				<el-table-column label="开始时间" align="left" prop="installTime" width="180" sortable>
					<template slot-scope="scope">
						<span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="结束时间" align="left" prop="installTime" width="180" sortable>
					<template slot-scope="scope">
						<span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
			</el-table>
			
			<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
									:limit.sync="queryParams.pageSize" @pagination="getList" />
		</el-card>
	</div>
</template>

<script>
export default {
	name: "event",
	data() {
		return {
			// 遮罩层
			loading: false,
			tableList: [],
			// 日期范围
			dateRange: [],
			// 总条数
			total: 0,
			// 查询参数
			queryParams: {
				pageNum: 1,
				pageSize: 20,
			},
			eventTab: 'all',
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