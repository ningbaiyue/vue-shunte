<template>
  <div class="app-container">
		<el-card body-style="padding-bottom: 0px" style="margin-bottom: 10px">
			<el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
				<el-form-item label="电站名称" prop="stationName">
					<el-input v-model="queryParams.stationName" placeholder="请输入电站名称" clearable @keyup.enter.native="handleQuery" />
				</el-form-item>
				
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
					<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-card>
			<el-row :gutter="10" class="mb8">
				<el-col :span="1.5">
					<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleAdd" v-hasPermi="['iot:info:add']">新增</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="success" plain icon="el-icon-edit" size="mini" :disabled="single" @click="handleUpdate" v-hasPermi="['iot:info:edit']">修改</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="danger" plain icon="el-icon-delete" size="mini" :disabled="multiple" @click="handleDelete" v-hasPermi="['iot:info:remove']">删除</el-button>
				</el-col>
				<el-col :span="1.5">
					<el-button type="warning" plain icon="el-icon-download" size="mini" @click="handleExport" v-hasPermi="['iot:info:export']">导出</el-button>
				</el-col>
				<right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
			</el-row>
			
			<el-table v-loading="loading" :data="infoList" @selection-change="handleSelectionChange">
				<el-table-column type="selection" width="55" align="center" />
				<el-table-column label="序号" align="center" prop="id" />
				<el-table-column label="电站名称" align="center" prop="stationName" />
				<el-table-column label="电站位置" align="center" prop="stationAddress" />
				<el-table-column label="投运时间" align="center" prop="operationTime" width="180">
					<template slot-scope="scope">
						<span>{{ parseTime(scope.row.operationTime, '{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="装机功率" align="center" prop="installedPower" />
				<el-table-column label="站点容量" align="center" prop="stationCapacity" />
				<el-table-column label="投运状态" align="center" prop="operationStatus" />
				<el-table-column label="电站类型" align="center" prop="stationType" />
				<el-table-column label="电池类型" align="center" prop="cellType" />
				<el-table-column label="电池厂商" align="center" prop="cellMakers" />
				<el-table-column label="单体容量" align="center" prop="cellCapacity" />
				<el-table-column label="省份" align="center" prop="province" />
				<el-table-column label="城市" align="center" prop="city" />
				<el-table-column label="区域" align="center" prop="county" />
				
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
					<template slot-scope="scope">
						<el-button size="mini" type="text" icon="el-icon-edit" @click="handleUpdate(scope.row)" v-hasPermi="['iot:info:edit']">修改</el-button>
						<el-button size="mini" type="text" icon="el-icon-delete" @click="handleDelete(scope.row)" v-hasPermi="['iot:info:remove']">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			
			<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize" @pagination="getList" />
		</el-card>

    <!-- 添加或修改储能站点信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="电站名称" prop="stationName">
              <el-input v-model="form.stationName" placeholder="请输入电站名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电站位置" prop="stationAddress">
              <el-input v-model="form.stationAddress" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="投运时间" prop="operationTime">
              <el-date-picker clearable v-model="form.operationTime" type="date" value-format="yyyy-MM-dd" placeholder="请选择投运时间"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="装机功率" prop="installedPower">
              <el-input v-model="form.installedPower" placeholder="请输入装机功率" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="站点容量" prop="stationCapacity">
              <el-input v-model="form.stationCapacity" placeholder="请输入站点容量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电站照片" prop="stationIamge">
              <el-input v-model="form.stationIamge" placeholder="请输入电站照片" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="电池厂商" prop="cellMakers">
              <el-input v-model="form.cellMakers" placeholder="请输入电池厂商" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="单体容量" prop="cellCapacity">
              <el-input v-model="form.cellCapacity" placeholder="请输入单体容量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否梯次利用" prop="isEchelonUse">
              <el-input v-model="form.isEchelonUse" placeholder="请输入是否梯次利用" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="站控层设备" prop="stationControl">
              <el-input v-model="form.stationControl" placeholder="请输入站控层设备" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="并网点" prop="sites">
              <el-input v-model="form.sites" type="textarea" placeholder="请输入内容" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="语言设置" prop="language">
              <el-input v-model="form.language" placeholder="请输入语言设置" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="纬度" prop="latitude">
              <el-input v-model="form.latitude" placeholder="请输入纬度" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="经度" prop="longitude">
              <el-input v-model="form.longitude" placeholder="请输入经度" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="节点代码" prop="nodeCode">
              <el-input v-model="form.nodeCode" placeholder="请输入节点代码" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="省份" prop="province">
              <el-input v-model="form.province" placeholder="请输入省份" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="城市" prop="city">
              <el-input v-model="form.city" placeholder="请输入城市" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="区域" prop="county">
              <el-input v-model="form.county" placeholder="请输入区域" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
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
import { listInfo, getInfo, delInfo, addInfo, updateInfo } from '@/api/energy/station';

export default {
  name: 'station',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 储能站点信息表格数据
      infoList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        stationName: null,
        stationAddress: null,
        operationTime: null,
        installedPower: null,
        stationCapacity: null,
        operationStatus: null,
        stationIamge: null,
        stationType: null,
        cellType: null,
        cellMakers: null,
        cellCapacity: null,
        isEchelonUse: null,
        stationControl: null,
        sites: null,
        language: null,
        latitude: null,
        longitude: null,
        nodeCode: null,
        province: null,
        city: null,
        county: null,
        tenantId: null,
        tenantName: null,
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        tenantId: [{ required: true, message: '租户ID不能为空', trigger: 'blur' }],
        tenantName: [{ required: true, message: '租户名称不能为空', trigger: 'blur' }],
      },
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询储能站点信息列表 */
    getList() {
      this.loading = true;
      listInfo(this.queryParams).then((response) => {
        this.infoList = response.rows;
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
        id: null,
        stationName: null,
        stationAddress: null,
        operationTime: null,
        installedPower: null,
        stationCapacity: null,
        operationStatus: null,
        stationIamge: null,
        stationType: null,
        cellType: null,
        cellMakers: null,
        cellCapacity: null,
        isEchelonUse: null,
        stationControl: null,
        sites: null,
        language: null,
        latitude: null,
        longitude: null,
        nodeCode: null,
        province: null,
        city: null,
        county: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        remark: null,
        tenantId: null,
        tenantName: null,
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
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = '添加储能站点信息';
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids;
      getInfo(id).then((response) => {
        this.form = response.data;
        this.open = true;
        this.title = '修改储能站点信息';
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateInfo(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功');
              this.open = false;
              this.getList();
            });
          } else {
            addInfo(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功');
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal
        .confirm('是否确认删除储能站点信息编号为"' + ids + '"的数据项？')
        .then(function () {
          return delInfo(ids);
        })
        .then(() => {
          this.getList();
          this.$modal.msgSuccess('删除成功');
        })
        .catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'energy/station/export',
        {
          ...this.queryParams,
        },
        `info_${new Date().getTime()}.xlsx`
      );
    },
  },
};
</script>
