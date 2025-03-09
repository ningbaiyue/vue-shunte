<template>
	<div class="app-container">
		<el-card body-style="padding-bottom:4px;" class="mb10">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
				<el-form-item label="储能单元" prop="menuName">
					<el-select v-model="queryParams.city" placeholder="请选择储能单元" clearable>
						<el-option
								v-for="item in cityList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="事件源" prop="userName">
					<el-select v-model="queryParams.city" placeholder="请选择事件源" clearable>
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
				<el-form-item label="级别" prop="city">
					<el-select v-model="queryParams.city" placeholder="请选择级别" clearable>
						<el-option
								v-for="item in cityList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="设备名称" prop="name">
					<el-input
							v-model="queryParams.userName"
							placeholder="请输入设备名称"
							clearable
							@keyup.enter.native="handleQuery"
					/>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
					<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-card style="padding-bottom:100px;">
			<div class="flex-space-between mb10">
				<div class="nav-title"><span class="xian"></span>当前事件</div>
				<el-button type="primary" plain size="mini" @click="">导出</el-button>
			</div>
			<el-table v-loading="loading" :data="tableList" stripe :header-cell-style="{'background': '#F7F7F7'}" border>
				<el-table-column label="序号" type="index" align="center">
					<template slot-scope="scope">
						<span>{{ scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="级别" align="left" prop="categoryName" sortable />
				<el-table-column label="储能单元" align="left" prop="country" min-width="150" />
				<el-table-column label="设备名称" align="left" prop="city"></el-table-column>
				<el-table-column label="事件号" align="left" prop="address" sortable />
				<el-table-column label="事件名称" align="left" prop="axis" />
				<el-table-column label="开始时间" align="left" prop="installTime" width="180" sortable>
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
	name: "current",
	data() {
		return {
			// 遮罩层
			loading: false,
			// 查询参数
			queryParams: {
				menuName: undefined,
				userName: undefined,
				city: undefined,
				pageNum: 1,
				pageSize: 20,
			},
			cityList: [{value: 1, label: '广州'}, {value: 2, label: '深圳'}],
			// 日期范围
			dateRange: [],
			// 总条数
			total: 0,
			// 产品分类表格数据
			tableList: [
				{categoryName: '勤勤', country: '中国', city: '广州'}
			],
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
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";
</style>
