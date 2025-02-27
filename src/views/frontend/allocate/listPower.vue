<template>
	<div class="app-container">
		<el-card body-style="padding-bottom:4px;" class="mb10">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
				<el-form-item label="电站名称" prop="menuName">
					<el-input
							v-model="queryParams.menuName"
							placeholder="请输入电站名称"
							clearable
							@keyup.enter.native="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="用户名" prop="userName">
					<el-input
							v-model="queryParams.userName"
							placeholder="请输入用户名"
							clearable
							@keyup.enter.native="handleQuery"
					/>
				</el-form-item>
				<el-form-item label="城市" prop="city">
					<el-select v-model="queryParams.city" placeholder="请选择城市" clearable>
						<el-option
								v-for="item in cityList"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
					<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
				</el-form-item>
				<el-form-item style="float:right;">
					<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd">新建电站
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-card style="padding-bottom:100px;">
			<el-table v-loading="loading" :data="tableList" border>
				<el-table-column label="序号" type="index" align="center">
					<template slot-scope="scope">
						<span>{{ scope.$index + 1}}</span>
					</template>
				</el-table-column>
				<el-table-column label="电站名称" align="center" prop="categoryName" />
				<el-table-column label="国家" align="left" header-align="center" prop="country" min-width="150" />
				<el-table-column label="城市" align="center" prop="city"></el-table-column>
				<el-table-column label="详细地址" align="center" prop="address" />
				<el-table-column label="坐标" align="center" prop="axis" />
				<el-table-column label="装机容量" align="center" prop="orderNum" />
				<el-table-column label="装机数量" align="center" prop="volume" />
				<el-table-column label="安装时间" align="center" prop="installTime" width="180">
					<template slot-scope="scope">
						<span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="所属用户" align="center" prop="affiliatedUser" />
				<el-table-column label="状态" align="center" prop="state" />
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="150">
					<template slot-scope="scope">
						<el-button size="small" type="text" style="padding:5px;" icon="el-icon-edit"
											 @click="handleUpdate(scope.row)">修改</el-button>
						<el-button size="small" type="text" style="padding:5px;" icon="el-icon-delete"
											 @click="handleDelete(scope.row)">删除</el-button>
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
	name: "listPower",
	data() {
		return {
			// 遮罩层
			loading: true,
			// 查询参数
			queryParams: {
				menuName: undefined,
				userName: undefined,
				city: undefined,
				pageNum: 1,
				pageSize: 20,
			},
			cityList: [{value: 1, label: '广州'}, {value: 2, label: '深圳'}],
			// 总条数
			total: 0,
			// 产品分类表格数据
			tableList: [
				{categoryName: '勤勤', country: '中国', city: '广州'}
			],
		}
	},
	created() {
		this.getList()
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
		/** 新增按钮操作 */
		handleAdd() {
			// this.reset();
			this.$router.push({ path: '/power/addPower' });
		},
		/** 修改按钮操作 */
		handleUpdate(row) {
			this.$router.push('/power/list/edit/' + '2');
			const categoryId = row.categoryId || this.ids
			/*getCategory(categoryId).then(response => {
				this.form = response.data;
				this.open = true;
				this.title = "修改产品分类";
			});*/
		},
		/** 删除按钮操作 */
		handleDelete(row) {
			const categoryIds = row.categoryId || this.ids;
			let msg = "";
			this.$modal.confirm('是否确认删除产品分类编号为"' + categoryIds + '"的数据项？').then(function () {
				/*return delCategory(categoryIds).then(response => {
					msg = response.msg;
				});*/
			}).then(() => {
				this.getList();
				this.$modal.msgSuccess(msg);
			}).catch(() => {
			});
		},
	}
}
</script>

<style scoped lang="scss">

</style>