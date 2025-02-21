<template>
	<div>
		<el-tabs type="border-card">
			<el-tab-pane label="属性上报">
				<el-row :gutter="20">
					<el-col class="running-item" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-for="(item, index) in runningList" :key="index">
						<el-card :body-style="{ padding: '10px 20px' }" shadow="hover" class="card-item">
							<div class="text">c相电压（TAG-2-11）</div>
							<div class="text"><span style="color: #486ff2">233</span>KW</div>
							<div class="text">时间：2025-02-19 10:06:47.209</div>
						</el-card>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane label="服务下发">服务下发</el-tab-pane>
			<el-tab-pane label="在线模式" disabled>
				<div slot="label" style="margin-left: 50px;">
					<span style="color: #486ff2; margin-right: 10px;">在线模式1</span>
					<el-select v-model="onlineValue" placeholder="请选择设备从机" clearable size="mini" style="width: 200px;">
						<el-option v-for="item in onlineOptions" :key="item.value" :label="item.label" :value="Number(item.value)" />
					</el-select>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>

import { serviceInvoke } from '@/api/iot/runstatus';

export default {
	name: 'running-status',
	props: {
		device: {
			type: Object,
			default: null,
		},
	},
	watch: {
		// 获取到父组件传递的device后，刷新列表
		device: function (newVal, oldVal) {
			if (newVal && newVal.deviceId != 0) {
				this.deviceInfo = newVal;
				this.$nextTick(function () {
				});
			}
		},
	},
	data() {
		return {
			deviceInfo: {},
			onlineValue: '',
			onlineOptions: [],
			runningList: [1, 2, 3, 4, 5,6,7,8,9,10],
		};
	},
	created() {},
	methods: {
	
	},
};
</script>

<style scoped>
.card-item {
	margin-bottom: 20px;
}
.card-item .text {
	font-size: 12px;
	color: #333;
	margin: 6px 0;
}
</style>

