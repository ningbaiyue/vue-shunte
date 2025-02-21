<template>
	<div style="padding-left: 20px">
		<el-row :gutter="10" class="mb8">
			<el-col :span="1.5">
				<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd"
						   v-if="productInfo.status == 1">新增
				</el-button>
			</el-col>
			<el-col :span="1.5">
				<el-button type="warning" plain icon="el-icon-refresh" size="mini" @click="getList">刷新</el-button>
			</el-col>
		</el-row>
		
		<el-table v-loading="loading" :data="tableList" size="mini">
			<el-table-column label="固件名称" align="center" prop="modelName" width="230"/>
			<el-table-column label="固件版本" align="center" prop=""/>
			<el-table-column label="状态" align="center" prop=""/>
			<el-table-column label="创建时间" align="center" prop="" width="75">
				<template slot-scope="scope"></template>
			</el-table-column>
			<el-table-column label="下载地址" align="center" prop=""/>
			<el-table-column label="固件描述" align="center" prop="fixedDescribe" width="300"/>
			<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
				<template slot-scope="scope">
					<el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)"
							   v-if="productInfo.status != 2">修改
					</el-button>
					<el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)"
							   v-if="productInfo.status != 2">删除
					</el-button>
				</template>
			</el-table-column>
		</el-table>
		
		<!-- 添加或修改物模型对话框 -->
		<el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
			<el-form ref="form" :model="form" :rules="rules" label-width="100px">
				<el-form-item label="固件名称" prop="fixedName">
					<el-input v-model="form.fixedName" placeholder="请输入固件名称" style="width: 385px"/>
				</el-form-item>
				<el-form-item label="固件版本" prop="num">
					<el-input-number v-model="form.num" placeholder="请输入固件版本" type="number" controls-position="right" style="width: 386px"></el-input-number>
				</el-form-item>
				<el-form-item label="最新固件">
					<el-switch v-model="form.newField" active-color="#486ff2" inactive-color="#dcdfe6"></el-switch>
					<el-link type="info" style="padding-left:10px; font-size: 12px" :underline="false">提示：产品中只能有一个最新固件</el-link>
				</el-form-item>
				<el-form-item label="固件上传" prop="fieldFile">
					<el-upload
						class="upload-demo"
						ref="upload"
						action="https://jsonplaceholder.typicode.com/posts/"
						:auto-upload="false">
						<el-button slot="trigger" size="small" type="primary">选取文件</el-button>
						<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
					</el-upload>
				</el-form-item>
				<el-form-item label="固件描述" prop="fixedDescribe">
					<el-input v-model="form.fixedDescribe" type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入固件描述" style="width: 385px"/>
				</el-form-item>
			</el-form>
			
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="submitForm">确 定</el-button>
				<el-button @click="cancel">取 消</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import {listModel, getModel, delModel} from '@/api/iot/model';

export default {
	name: 'product-fixed',
	props: {
		product: {
			type: Object,
			default: null,
		},
	},
	watch: {
		// 获取到父组件传递的productId后，刷新列表
		product: function (newVal, oldVal) {
			this.productInfo = newVal;
			if (this.productInfo && this.productInfo.productId != 0) {
				this.queryParams.productId = this.productInfo.productId;
				this.queryParams.isModbus = this.productInfo.isModbus;
				this.getList();
			}
		},
	},
	data() {
		return {
			// 父组件接收的产品信息
			productInfo: {},
			// 遮罩层
			loading: false,
			// 选中数组
			ids: [],
			// 总条数
			total: 0,
			// 表格数据
			tableList: [],
			// 弹出层标题
			title: '',
			// 是否显示弹出层
			open: false,
			// 查询参数
			queryParams: {
				productId: 0,
				pageNum: 1,
				pageSize: 100,
			},
			// 表单参数
			form: {},
			//是否是modbus
			isModbus: false,
			// 表单校验
			rules: {
				fixedName: [
					{
						required: true,
						message: '固件名称不能为空',
						trigger: 'blur',
					},
					{
						min: 1,
						max: 64,
						message: '固件名称不能少于1个字符和超过64字符',
						trigger: 'blur',
					},
				],
				num: [
					{
						required: true,
						message: '固件版本不能为空',
						trigger: 'change',
					},
				
				],
				fieldFile: [
					{
						required: true,
						message: '固定上传不能为空',
						trigger: 'change',
					},
				],
			},
		};
	},
	created() {
	},
	methods: {
		/** 查询产品物模型列表 */
		getList() {
			this.loading = true;
			listModel(this.queryParams).then((response) => {
				this.modelList = response.rows;
				this.total = response.total;
				this.loading = false;
			});
		},
		// 取消按钮
		cancel() {
			this.open = false;
			this.reset();
		},
		// 表单重置
		reset() {
			this.form = {
				templateName: null,
				userId: null,
				userName: null,
				tenantId: null,
				tenantName: null,
				remark: null,
			};
			this.resetForm('form');
		},
		/** 搜索按钮操作 */
		handleQuery() {
			this.queryParams.pageNum = 1;
			this.getList();
		},
		/** 重置按钮操作 */
		resetQuery() {
			this.resetForm('queryForm');
			this.handleQuery();
		},
		/** 新增按钮操作 */
		handleAdd() {
			this.reset();
			this.open = true;
			this.title = '添加产品固件';
		},
		/** 修改按钮操作 */
		handleUpdate(row) {
			this.reset();
			const modelId = row.modelId;
			getModel(modelId).then((response) => {
				let tempForm = response.data;
				this.open = true;
				this.title = '修改产品固件';
				this.form = tempForm;
			});
		},
		/** 提交按钮 */
		submitForm() {
			this.$refs['form'].validate((valid) => {
				if (valid) {
				
				}
			});
		},
		/** 删除按钮操作 */
		handleDelete(row) {
			const modelIds = row.modelId;
			// if (!this.queryParams.isModbus) {
			this.$modal
			.confirm('是否确认删除物模型编号为"' + modelIds + '"的数据项？')
			.then(function () {
				return delModel(modelIds);
			})
			.then(() => {
				this.getList();
				this.$modal.msgSuccess('删除成功');
			})
			.catch(() => {
			});
			// } else {
			//   this.$modal.alert('采集点删除请在采集点模板修改');
			// }
		},
	},
};
</script>
