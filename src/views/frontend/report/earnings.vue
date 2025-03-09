<template>
	<div class="app-container">
		<el-row :gutter="10">
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="top-box">
					<div>
						<div class="blue-num">50806.3</div>
						<div>当日参考收益($)</div>
					</div>
					<svg-icon icon-class="riLine-hand"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="top-box">
					<div>
						<div class="blue-num">26363</div>
						<div>当月参考收益($)</div>
					</div>
					<svg-icon icon-class="iconPark-funds"/>
				</div>
			</el-col>
			<el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
				<div class="top-box">
					<div>
						<div class="blue-num">65</div>
						<div>累计参考收益($)</div>
					</div>
					<svg-icon icon-class="finance"/>
				</div>
			</el-col>
		</el-row>
		
		<el-card body-style="padding-bottom:4px;" class="mb10">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
				<el-form-item label="时间维度" prop="city">
					<el-select v-model="queryParams.city" placeholder="请选择时间维度" clearable>
						<el-option
								v-for="item in cityList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="统计时间">
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
					<div class="nav-title mr20"><span class="xian"></span>收益报表</div>
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
				<el-table-column label="时间" align="left" prop="installTime" width="180" sortable>
					<template slot-scope="scope">
						<span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="光伏自发自用收益（$）" align="left" prop="country" />
				<el-table-column label=" 光伏馈入电网收益($)" align="left" prop="address" />
				<el-table-column label="容量收益" align="left" prop="city" />
				<el-table-column label="当前电价($/度)" align="left" prop="axis" />
				<el-table-column label="放电补贴($)" align="left" prop="axis" />
				<el-table-column label="需量收益($)" align="left" prop="axis" />
				<el-table-column label="累计收益($)" align="left" prop="axis" />
			</el-table>
			
			<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum"
									:limit.sync="queryParams.pageSize" @pagination="getList" />
		</el-card>
	</div>
</template>

<script>
export default {
	name: "earnings",
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

.top-box {
	background: #fff;
	padding: 20px 14px;
	margin-bottom: 10px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 14px;
	border-radius: 6px;
	.blue-num {
		font-size: 30px;
		font-weight: bold;
		color: #486ff2;
	}
	.svg-icon {
		font-size: 50px;
	}
}
</style>












