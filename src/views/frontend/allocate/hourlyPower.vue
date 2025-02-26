<template>
	<div class="app-container">
		<slot name="title"></slot>
		<el-form ref="form" :model="formData" :rules="rules" size="medium" :inline="true">
			<el-form-item label="策略名称" prop="tacticsName">
				<el-input v-model="formData.tacticsName" placeholder="请输入策略名称" clearable :style="{width: '100%'}">
				</el-input>
			</el-form-item>
			<el-form-item label="生效时间" prop="effectiveTime">
				<el-date-picker v-model="formData.effectiveTime" format="yyyy-MM-dd" value-format="yyyy-MM-dd"
												:style="{width: '100%'}" placeholder="请选择生效时间" clearable></el-date-picker>
			</el-form-item>
		</el-form>
		<el-table :data="tableData" border style="width: 100%; margin-bottom: 20px" class="validation-table">
			<!-- 开始时间列 -->
			<el-table-column prop="startTime" label="开始时间">
				<template slot-scope="scope">
					<el-time-select
							v-model="scope.row.startTime"
							:picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59'
              }"
							placeholder="选择开始时间"
							value-format="HH:mm"
							:class="{ 'is-invalid': showErrors && !scope.row.startTime }"
							@change="validateTimeRange(scope.row)"
					></el-time-select>
				</template>
			</el-table-column>
			
			<!-- 结束时间列 -->
			<el-table-column prop="endTime" label="结束时间">
				<template slot-scope="scope">
					<el-time-select
							v-model="scope.row.endTime"
							:picker-options="{
                start: '00:00',
                step: '00:30',
                end: '23:59',
                minTime: scope.row.startTime
              }"
							placeholder="选择结束时间"
							value-format="HH:mm"
							:class="{ 'is-invalid': showErrors && !scope.row.endTime }"
							@change="validateTimeRange(scope.row)"
					></el-time-select>
				</template>
			</el-table-column>
			
			<!-- 峰谷类型列 -->
			<el-table-column prop="remarkType" label="峰谷类型">
				<template slot-scope="scope">
					<el-select
							v-model="scope.row.remarkType"
							placeholder="请选择类型"
							:class="{ 'is-invalid': showErrors && !scope.row.remarkType }"
							@change="validateRow(scope.row)"
					>
						<el-option
								v-for="item in remarkOptions"
								:key="item.value"
								:label="item.label"
								:value="item.value"
						/>
					</el-select>
				</template>
			</el-table-column>
			
			<!-- 电价列 -->
			<el-table-column prop="price" label="电价($)">
				<template slot-scope="scope">
					<el-input
							v-model="scope.row.price"
							placeholder="请输入价格"
							type="number"
							min="0"
							:class="{ 'is-invalid': showErrors && !scope.row.price }"
							@blur="validateRow(scope.row)"
					>
						<!--							<template slot="append">元</template>-->
					</el-input>
				</template>
			</el-table-column>
			
			<!-- 操作列 -->
			<el-table-column label="操作" width="100">
				<template slot-scope="scope">
					<el-button type="danger" icon="el-icon-delete" circle @click="deleteRow(scope.$index)" :disabled="tableData.length === 1"/>
				</template>
			</el-table-column>
		</el-table>
		
		<!-- 操作按钮和提示信息 -->
		<div class="table-actions">
			<el-button type="primary" icon="el-icon-plus" circle @click="handleAddRow"></el-button>
			<div v-if="errorMessage" class="error-message">
				<i class="el-icon-warning"></i> {{ errorMessage }}
			</div>
		</div>
		<slot name="footer"></slot>
	</div>
</template>

<script>
export default {
	props: {
		initData: {
			type: Object,
			default: () => ({})
		}
	},
	data() {
		return {
			formData: { ...this.initData },
			rules: {
				tacticsName: [{
					required: true,
					message: '请输入策略名称',
					trigger: 'blur'
				}],
				effectiveTime: [{
					required: true,
					message: '请选择生效时间',
					trigger: 'change'
				}],
			},
			tableData: this.initData.tableData,
			remarkOptions: [
				{ label: '各', value: '各' },
				{ label: '峰', value: '峰' },
				{ label: '平', value: '平' },
				{ label: '尖峰', value: '尖峰' },
				{ label: '深谷', value: '深谷' }
			],
			showErrors: false,
			errorMessage: ''
		}
	},
	watch: {
		initData: {
			deep: true,
			handler(newVal) {
				console.log(newVal, '第二步骤')
				this.formData = { ...newVal }
				this.tableData = [...newVal.tableData]
			}
		}
	},
	methods: {
		validate() {
			return new Promise((resolve) => {
				this.$refs.form.validate((valid) => {
					if (valid) {
						resolve({
							valid: true,
							data: {
								...this.formData,
								tableData: this.tableData,
							},
						});
					} else {
						resolve({ valid: false });
					}
				});
			});
		},
		// 新增行处理
		handleAddRow() {
			if (this.tableData.length !== 0) {
				const lastRow = this.tableData[this.tableData.length - 1]
				if (!this.validateRow(lastRow, true)) {
					this.errorMessage = '请先完整填写当前行的必填内容'
					this.showErrors = true
					this.$nextTick(() => {
						this.scrollToFirstError()
					})
					return
				}
				
				this.tableData.push({
					startTime: '',
					endTime: '',
					remarkType: '',
					price: ''
				})
				this.showErrors = false
				this.errorMessage = ''
			} else {
				this.tableData.push({
					startTime: '',
					endTime: '',
					remarkType: '',
					price: ''
				})
			}
		},
		// 修改后的时间范围验证方法
		validateTimeRange(row) {
			// 结束时间不能早于开始时间
			if (row.startTime && row.endTime) {
				const start = this.parseTime(row.startTime)
				const end = this.parseTime(row.endTime)
				
				if (end <= start) {
					this.$message.error('结束时间必须晚于开始时间')
					row.endTime = ''
				}
			}
			
			// 触发整体验证
			this.validateRow(row)
		},
		// 时间转换方法
		parseTime(time) {
			const [hours, minutes] = time.split(':')
			return parseInt(hours) * 60 + parseInt(minutes)
		},
		// 行验证方法
		validateRow(row, showError = false) {
			const requiredFields = [
				{ key: 'startTime', name: '开始时间' },
				{ key: 'endTime', name: '结束时间' },
				{ key: 'remarkType', name: '备注类型' },
				{ key: 'price', name: '电价' }
			]
			
			const missingFields = requiredFields
			.filter(field => !row[field.key])
			.map(field => field.name)
			
			// 添加时间顺序验证
			if (row.startTime && row.endTime) {
				const start = this.parseTime(row.startTime)
				const end = this.parseTime(row.endTime)
				if (end <= start) {
					missingFields.push('时间顺序')
				}
			}
			
			if (showError && missingFields.length > 0) {
				this.errorMessage = `存在以下问题：${missingFields.join('、')}`
			}
			
			return missingFields.length === 0
		},
		
		// 删除行
		deleteRow(index) {
			if (this.tableData.length > 1) {
				this.tableData.splice(index, 1)
				this.errorMessage = ''
			} else {
				this.$message.warning('至少需要保留一行数据')
			}
		},
		
		// 滚动到第一个错误位置
		scrollToFirstError() {
			const firstError = document.querySelector('.is-invalid')
			if (firstError) {
				firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
				firstError.focus()
			}
		}
	}
}
</script>

<style scoped lang="scss">
.el-date-editor.el-input, .el-date-editor.el-input__inner, .el-select {
	width: 100%;
}
/* 错误提示样式 */
.is-invalid {
	border-color: #ff4d4f !important;
}

.is-invalid ::v-deep .el-input__inner {
	border-color: #ff4d4f;
}

.error-message {
	margin-top: 10px;
	color: #ff4d4f;
	font-size: 14px;
	display: flex;
	align-items: center;
}

.el-icon-warning {
	margin-right: 5px;
}

.table-actions {
	display: flex;
	flex-direction: column;
	align-items: end;
}

/* 调整表格行高 */
.validation-table ::v-deep .el-table__row {
	height: 65px;
}
</style>