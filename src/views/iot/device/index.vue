<template>
	<div class="iot-device app-container">
		<el-card class="card-search">
			<el-form :model="queryParams" ref="queryForm" :inline="true" style="margin-bottom: -20px">
				<el-form-item label="" prop="deviceName">
					<el-input v-model="queryParams.deviceName" placeholder="请输入设备名称" clearable size="small"
										@keyup.enter.native="handleQuery"/>
				</el-form-item>
				<el-form-item label="" prop="serialNumber">
					<el-input v-model="queryParams.serialNumber" placeholder="请输入设备编号" clearable size="small"
										@keyup.enter.native="handleQuery"/>
				</el-form-item>
				<el-form-item label="" prop="status">
					<el-select v-model="queryParams.status" placeholder="请选择设备状态" clearable size="small">
						<el-option v-for="dict in dict.type.iot_device_status" :key="dict.value" :label="dict.label"
											 :value="dict.value"/>
					</el-select>
				</el-form-item>
				<el-form-item label="">
					<el-select v-model="queryParams.groupId" placeholder="请选择我的分组" clearable size="small">
						<el-option v-for="group in myGroupList" :key="group.groupId" :label="group.groupName"
											 :value="group.groupId"/>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
					<el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
				</el-form-item>
				<el-form-item style="float: right">
					<el-button type="primary" plain icon="el-icon-plus" size="mini" @click="handleEditDevice(0)"
										 v-hasPermi="['iot:device:add']">新增
					</el-button>
					<el-button type="primary" plain icon="el-icon-s-grid" size="mini" @click="handleChangeShowType"
										 v-hasPermi="['iot:device:add']">切换
					</el-button>
				</el-form-item>
			</el-form>
		</el-card>
		
		<el-card v-if="showType == 'list'">
			<el-table v-loading="loading" :data="deviceList" border>
				<el-table-column label="编号" align="center" header-align="center" prop="deviceId" width="50"/>
				<el-table-column label="设备名称" align="center" header-align="center" prop="deviceName" min-width="120"/>
				<el-table-column label="设备编号" align="center" prop="serialNumber" min-width="130"/>
				<el-table-column label="所属产品" align="center" prop="productName" min-width="120"/>
				<el-table-column label="协议" align="center" prop="transport" min-width="50"/>
				<el-table-column label="通讯协议" align="center" prop="protocolCode" min-width="100"/>
				<el-table-column label="子设备数" align="center" prop="subDeviceCount" width="80">
					<template slot-scope="scope">
						{{ scope.row.subDeviceCount }}
					</template>
				</el-table-column>
				<el-table-column label="设备影子" align="center" prop="isShadow" width="80">
					<template slot-scope="scope">
						<el-tag type="success" size="small" v-if="scope.row.isShadow == 1">启用</el-tag>
						<el-tag type="info" size="small" v-else>禁用</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="状态" align="center" prop="status" width="80">
					<template slot-scope="scope">
						<dict-tag :options="dict.type.iot_device_status" :value="scope.row.status" size="small"/>
					</template>
				</el-table-column>
				<el-table-column label="信号" align="center" prop="rssi" width="60">
					<template slot-scope="scope">
						<svg-icon v-if="scope.row.status == 3 && scope.row.rssi >= '-55'" icon-class="wifi_4"/>
						<svg-icon v-else-if="scope.row.status == 3 && scope.row.rssi >= '-70' && scope.row.rssi < '-55'"
											icon-class="wifi_3"/>
						<svg-icon v-else-if="scope.row.status == 3 && scope.row.rssi >= '-85' && scope.row.rssi < '-70'"
											icon-class="wifi_2"/>
						<svg-icon v-else-if="scope.row.status == 3 && scope.row.rssi >= '-100' && scope.row.rssi < '-85'"
											icon-class="wifi_1"/>
						<svg-icon v-else icon-class="wifi_0"/>
					</template>
				</el-table-column>
				<el-table-column label="定位方式" align="center" prop="locationWay">
					<template slot-scope="scope">
						<dict-tag :options="dict.type.iot_location_way" :value="scope.row.locationWay" size="small"/>
					</template>
				</el-table-column>
				<el-table-column label="固件版本" align="center" prop="firmwareVersion">
					<template slot-scope="scope">
						<el-tag size="mini" type="info">Ver {{ scope.row.firmwareVersion }}</el-tag>
					</template>
				</el-table-column>
				<el-table-column label="激活时间" align="center" prop="activeTime">
					<template slot-scope="scope">
						<span>{{ parseTime(scope.row.activeTime, '{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" align="center" prop="createTime">
					<template slot-scope="scope">
						<span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
					</template>
				</el-table-column>
				
				<el-table-column label="操作" align="center" class-name="small-padding fixed-width" width="200">
					<template slot-scope="scope">
						<el-button size="small" type="text" style="padding: 5px" icon="el-icon-delete"
											 @click="handleDelete(scope.row)" v-hasPermi="['iot:device:remove']">删除
						</el-button>
						<el-button size="small" type="text" style="padding: 5px" icon="el-icon-view"
											 @click="handleEditDevice(scope.row)" v-hasPermi="['iot:device:add']">查看
						</el-button>
						<el-button size="small" type="text" style="padding: 5px" @click="openSummaryDialog(scope.row)"
											 v-if="form.deviceId != 0">二维码
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
									:pageSizes="[12, 24, 36, 60]" @pagination="getList"/>
		</el-card>
		
		<el-card v-if="showType == 'card'">
			<el-row :gutter="20" v-loading="loading">
				<el-col class="device-item" :xs="24" :sm="12" :md="12" :lg="8" :xl="6" v-for="(item, index) in deviceList"
								:key="index">
					<el-card :body-style="{ padding: '0px' }" shadow="never" class="card-item">
						<div class="item-title">
							<div>
								<el-image class="img" :preview-src-list="[baseUrl + item.imgUrl]" :src="baseUrl + item.imgUrl"
													fit="cover" v-if="item.imgUrl != null && item.imgUrl != ''"></el-image>
								<el-image class="img" :preview-src-list="[require('@/assets/images/gateway.png')]"
													:src="require('@/assets/images/gateway.png')" fit="cover"
													v-else-if="item.deviceType == 2"></el-image>
								<el-image class="img" :preview-src-list="[require('@/assets/images/video.png')]"
													:src="require('@/assets/images/video.png')" fit="cover"
													v-else-if="item.deviceType == 3"></el-image>
								<el-image class="img" :preview-src-list="[require('@/assets/images/product.png')]"
													:src="require('@/assets/images/product.png')" fit="cover" v-else></el-image>
							</div>
							<div class="title" @click="handleEditDevice(item)">
								<!--								<svg-icon icon-class="device" v-if="item.isOwner == 1" />-->
								<div class="name">{{ item.deviceName }}</div>
								<div class="tag-wrap">
									<dict-tag :options="dict.type.iot_device_status" :value="item.status" size="mini"
														style="line-height: 15px;"/>
									<!-- <el-tag type="success" size="small" v-if="item.isShadow == 1">影子</el-tag>
                    <el-tag type="info" size="small" v-else>影子</el-tag> -->
									<el-tag style="margin-left: 6px;" type="info" size="mini" v-if="item.protocolCode">
										{{ item.protocolCode }}
									</el-tag>
									<el-tag style="margin-left: 6px;" type="info" size="mini" v-if="item.transport">{{ item.transport }}
									</el-tag>
									<!-- <dict-tag :options="dict.type.iot_location_way" :value="item.locationWay" size="small" style="display:inline-block;" /> -->
									<!-- <dict-tag :options="dict.type.iot_transport_type" :value="item.transport" size="small" style="display: inline-block" /> -->
								</div>
							</div>
							<div style="width: 45px;"></div>
							<div class="status">
								<div class="icon-wrap">
									<svg-icon class="item" style="cursor: pointer;" icon-class="qrcode" @click="openSummaryDialog(item)"/>
									<svg-icon class="item" v-if="item.status == 3 && item.rssi >= '-55'" icon-class="wifi_4"/>
									<svg-icon class="item" v-else-if="item.status == 3 && item.rssi >= '-70' && item.rssi < '-55'"
														icon-class="wifi_3"/>
									<svg-icon class="item" v-else-if="item.status == 3 && item.rssi >= '-85' && item.rssi < '-70'"
														icon-class="wifi_2"/>
									<svg-icon class="item" v-else-if="item.status == 3 && item.rssi >= '-100' && item.rssi < '-85'"
														icon-class="wifi_1"/>
									<svg-icon class="item" v-else icon-class="wifi_0"/>
								</div>
							</div>
						</div>
						<el-row :gutter="10">
							<el-col class="card-item-desc" style="margin-left: -5px; margin-right: -5px;">
								<el-col :span="14" style="padding: 0px 0px 0px 30px; margin-bottom: -10px;">
									<el-descriptions class="card-item-desc-item" :column="1" size="small"
																	 style="margin-top: 10px; white-space: nowrap; overflow: hidden;">
										<el-descriptions-item label="编号">
											{{ item.serialNumber }}
										</el-descriptions-item>
									</el-descriptions>
								</el-col>
								<el-col :span="10" style="padding: 0px 30px 0px 0px; margin-bottom: -10px;">
									<el-descriptions class="card-item-desc-item" :column="1" size="small"
																	 style="margin-top: 10px; white-space: nowrap; overflow: hidden;">
										<el-descriptions-item label="产品">
											{{ item.productName }}
										</el-descriptions-item>
									</el-descriptions>
								</el-col>
							</el-col>
						</el-row>
						<el-row :gutter="10">
							<el-col class="card-item-desc" style="margin-left: -5px; margin-right: -5px;">
								<el-col :span="14" style="padding: 0px 0px 0px 30px; margin-bottom: -10px;">
									<el-descriptions class="card-item-desc-item" :column="1" size="small"
																	 style="margin-top: 10px; white-space: nowrap; overflow: hidden;">
										<el-descriptions-item label="激活时间">
											{{ parseTime(item.activeTime, '{y}-{m}-{d}') }}
										</el-descriptions-item>
									</el-descriptions>
								</el-col>
							</el-col>
						</el-row>
						<el-divider class="divider"></el-divider>
						<div class="card-item-btns">
							<el-button size="mini" type="text" @click="handleDelete(item)" v-hasPermi="['iot:device:remove']">删除
							</el-button>
							<span class="btn-item-line">|</span>
							<el-button size="mini" type="text" @click="handleEditDevice(item, 'basic')"
												 v-hasPermi="['iot:device:add']">查看详情
							</el-button>
							<span class="btn-item-line">|</span>
							<el-button size="mini" type="text" @click="handleRunDevice(item)" v-hasPermi="['iot:device:add']">
								运行状态
							</el-button>
						</div>
					</el-card>
				</el-col>
			</el-row>
			<el-empty description="暂无数据，请添加设备" v-if="total == 0"></el-empty>
			<pagination v-show="total > 0" :total="total" :page.sync="queryParams.pageNum" :limit.sync="queryParams.pageSize"
									:pageSizes="[12, 24, 36, 60]" @pagination="getList"/>
		</el-card>
		<!-- 二维码 -->
		<el-dialog :visible.sync="openSummary" width="300px" append-to-body>
			<div style="border: 1px solid #ccc; width: 220px; text-align: center; margin: 0 auto; margin-top: -15px">
				<vue-qr :text="qrText" :size="200"></vue-qr>
				<div style="padding-bottom: 10px">设备二维码</div>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import vueQr from 'vue-qr';
import {delDevice, listDeviceShort} from '@/api/iot/device';
import {listGroup} from '@/api/iot/group';
import {delSipDeviceBySipId} from '@/api/iot/sipdevice';
import {parseTime} from "../../../utils/ruoyi";

export default {
	name: 'Device',
	dicts: ['iot_device_status', 'iot_is_enable', 'iot_location_way', 'iot_transport_type'],
	components: {
		vueQr,
	},
	data() {
		return {
			// 二维码内容
			qrText: 'fastbee',
			// 打开设备配置对话框
			openSummary: false,
			// 展示方式
			showType: 'card',
			// 遮罩层
			loading: true,
			// 总条数
			total: 0,
			// 设备列表数据
			deviceList: [],
			// 我的分组列表数据
			myGroupList: [],
			// 根路径
			baseUrl: process.env.VUE_APP_BASE_API,
			// 查询参数
			queryParams: {
				pageNum: 1,
				pageSize: 13,
				deviceName: null,
				productId: null,
				groupId: null,
				productName: null,
				userId: null,
				userName: null,
				tenantId: null,
				tenantName: null,
				serialNumber: null,
				status: null,
				networkAddress: null,
				activeTime: null,
			},
			// 表单参数
			form: {
				productId: 0,
				status: 1,
				locationWay: 1,
				firmwareVersion: 1.0,
				serialNumber: '',
				deviceType: 1,
				isSimulate: 0,
			},
			isSubDev: false,
		};
	},
	created() {
		// 产品筛选
		let productId = this.$route.query.productId;
		if (productId != null) {
			this.queryParams.productId = Number(productId);
			this.queryParams.groupId = null;
			this.queryParams.serialNumber = null;
		}
		// 分组筛选
		let groupId = this.$route.query.groupId;
		if (groupId != null) {
			this.queryParams.groupId = Number(groupId);
			this.queryParams.productId = null;
			this.queryParams.serialNumber = null;
		}
		// 设备编号筛选
		let sn = this.$route.query.sn;
		if (sn != null) {
			this.queryParams.serialNumber = sn;
			this.queryParams.productId = null;
			this.queryParams.groupId = null;
		}
		this.connectMqtt();
	},
	activated() {
		const time = this.$route.query.t;
		if (time != null && time != this.uniqueId) {
			this.uniqueId = time;
			// 页码筛选
			let pageNum = this.$route.query.pageNum;
			if (pageNum != null) {
				this.queryParams.pageNum = Number(pageNum);
			}
			// 产品筛选
			let productId = this.$route.query.productId;
			if (productId != null) {
				this.queryParams.productId = Number(productId);
				this.queryParams.groupId = null;
				this.queryParams.serialNumber = null;
			}
			// 分组筛选
			let groupId = this.$route.query.groupId;
			if (groupId != null) {
				this.queryParams.groupId = Number(groupId);
				this.queryParams.productId = null;
				this.queryParams.serialNumber = null;
			}
			// 设备编号筛选
			let sn = this.$route.query.sn;
			if (sn != null) {
				this.queryParams.serialNumber = sn;
				this.queryParams.productId = null;
				this.queryParams.groupId = null;
			}
			this.getList();
		}
	},
	methods: {
		parseTime,
		/* 连接Mqtt消息服务器 */
		async connectMqtt() {
			if (this.$mqttTool.client == null) {
				await this.$mqttTool.connect();
			}
			this.mqttCallback();
			this.getList();
		},
		/* Mqtt回调处理  */
		mqttCallback() {
			this.$mqttTool.client.on('message', (topic, message, buffer) => {
				let topics = topic.split('/');
				let productId = topics[1];
				let deviceNum = topics[2];
				message = JSON.parse(message.toString());
				if (!message) {
					return;
				}
				if (topics[3] == 'status') {
					console.log('接收到【设备状态】主题：', topic);
					console.log('接收到【设备状态】内容：', message);
					// 更新列表中设备的状态
					for (let i = 0; i < this.deviceList.length; i++) {
						if (this.deviceList[i].serialNumber == deviceNum) {
							this.deviceList[i].status = message.status;
							this.deviceList[i].isShadow = message.isShadow;
							this.deviceList[i].rssi = message.rssi;
							return;
						}
					}
				}
			});
		},
		openSummaryDialog(row) {
			let json = {
				type: 1, // 1=扫码关联设备
				deviceNumber: row.serialNumber,
				productId: row.productId,
				productName: row.productName,
			};
			this.qrText = JSON.stringify(json);
			this.openSummary = true;
		},
		/* 订阅消息 */
		mqttSubscribe(list) {
			// 订阅当前页面设备状态和实时监测
			let topics = [];
			for (let i = 0; i < list.length; i++) {
				let topicStatus = '/' + '+' + '/' + list[i].serialNumber + '/status/post';
				topics.push(topicStatus);
			}
			this.$mqttTool.subscribe(topics);
		},
		/** 查询设备分组列表 */
		getGroupList() {
			this.loading = true;
			let queryParams = {
				pageSize: 30,
				pageNum: 1,
				userId: this.$store.state.user.userId,
			};
			listGroup(queryParams).then((response) => {
				this.myGroupList = response.rows;
			});
		},
		/** 查询所有简短设备列表 */
		getList() {
			this.loading = true;
			this.queryParams.params = {};
			this.getGroupList();
			listDeviceShort(this.queryParams).then((response) => {
				this.deviceList = response.rows;
				this.total = response.total - 1;
				// 订阅消息
				if (this.deviceList && this.deviceList.length > 0) {
					this.mqttSubscribe(this.deviceList);
				}
				this.deviceList = this.deviceList.filter((device) => device.deviceId !== 118);
				this.loading = false;
			});
		},
		/** 搜索按钮操作 */
		handleQuery() {
			this.queryParams.pageNum = 1;
			this.getList();
		},
		/** 重置按钮操作 */
		resetQuery() {
			this.queryParams.productId = null;
			this.queryParams.groupId = null;
			this.queryParams.serialNumber = null;
			this.resetForm('queryForm');
			this.handleQuery();
		},
		/** 切换显示方式 */
		handleChangeShowType() {
			this.showType = this.showType == 'card' ? 'list' : 'card';
		},
		/** 修改按钮操作 */
		handleEditDevice(row, activeName) {
			let deviceId = 0;
			let isSubDev = 0;
			if (row != 0) {
				deviceId = row.deviceId || this.ids;
				isSubDev = row.subDeviceCount > 0 ? 1 : 0;
			}
			this.$router.push({
				path: '/iot/device-edit',
				query: {
					deviceId: deviceId,
					isSubDev: isSubDev,
					pageNum: this.queryParams.pageNum,
					activeName: activeName,
				},
			});
		},
		/** 运行状态按钮操作 */
		handleRunDevice(row) {
			let deviceId = 0;
			let isSubDev = 0;
			if (row != 0) {
				deviceId = row.deviceId || this.ids;
				isSubDev = row.subDeviceCount > 0 ? 1 : 0;
			}
			if (row.deviceType === 3) {
				this.$router.push({
					path: '/iot/device-edit',
					query: {
						deviceId: deviceId,
						isSubDev: isSubDev,
						pageNum: this.queryParams.pageNum,
						activeName: 'sipChannel',
					},
				});
			} else {
				this.$router.push({
					path: '/iot/device-edit',
					query: {
						deviceId: deviceId,
						isSubDev: isSubDev,
						pageNum: this.queryParams.pageNum,
						activeName: 'runningStatus',
					},
				});
			}
		},
		/** 删除按钮操作 */
		handleDelete(row) {
			const deviceIds = row.deviceId || this.ids;
			this.$modal
			.confirm('是否确认删除设备编号为"' + deviceIds + '"的数据项？')
			.then(function () {
				if (row.deviceType === 3) {
					delSipDeviceBySipId(row.serialNumber);
				}
				return delDevice(deviceIds);
			})
			.then(() => {
				this.getList();
				this.$modal.msgSuccess('删除成功');
			})
			.catch(() => {
			});
		},
		/** 未启用设备影子*/
		shadowUnEnable(device, thingsModel) {
			// 1-未激活，2-禁用，3-在线，4-离线
			if (device.status != 3 && device.isShadow == 0) {
				return true;
			}
			if (thingsModel.isReadonly) {
				return true;
			}
			return false;
		},
	},
};
</script>

<style scoped>
.iot-device {
	padding: 20px
}

.iot-device .card-search {
	margin-bottom: 15px;
	width: 100%;
	border-radius: 8px
}

.iot-device {
	padding: 20px
}

.iot-device .el-upload-dragger {
	width: 510px
}

.iot-device .el-dropdown-menu__item {
	font-size: 12px
}

.iot-device .device-item {
	margin-bottom: 20px;
	text-align: center
}

.iot-device .device-item .card-item {
	background: #fff;
	border-radius: 8px;
	border: 1px solid #dcdfe6
}

.iot-device .device-item .card-item .item-title {
	display: -webkit-box;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-direction: row;
	flex-direction: row;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	position: relative;
	padding: 18px
}

.iot-device .device-item .card-item .item-title .img {
	height: 58px;
	width: 58px;
	border-radius: 10px
}

.iot-device .device-item .card-item .item-title .title {
	-webkit-box-flex: 1;
	-ms-flex: 1;
	flex: 1;
	text-align: left;
	margin-left: 16px
}

.iot-device .device-item .card-item .item-title .title .name {
	font-weight: 500;
	font-size: 16px;
	color: #303133;
	line-height: 22px;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	cursor: pointer
}

.iot-device .device-item .card-item .item-title .title .tag-wrap {
	margin-top: 10px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-direction: row;
	flex-direction: row
}

.iot-device .device-item .card-item .item-title .status {
	position: absolute;
	right: -1px;
	top: 24px
}

.iot-device .device-item .card-item .item-title .status .icon-wrap {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-orient: horizontal;
	-webkit-box-direction: normal;
	-ms-flex-direction: row;
	flex-direction: row;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	padding: 0 8px
}

.iot-device .device-item .card-item .item-title .status .icon-wrap .item {
	width: 22px;
	height: 22px;
	margin: 0 5px;
	color: #909399
}

.iot-device .device-item .card-item .card-item-btns {
	height: 39px;
	padding: 0px 10px;
	display: flex;
	align-items: center;
	justify-content: space-evenly;
}

.iot-device .btn-wrap {
	background-color: #fff !important;
	color: #606266 !important;
	border-radius: 4px !important;
	border: 1px solid #dcdfe6 !important
}

.divider {
	margin: 20px 0 0;
	height: 1px;
	background: #dcdfe6
}

.button-group {
	width: 65px;
	margin-right: 10px
}

.button-group .toggle-button, .button-group {
	height: 32.5px;
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	-webkit-box-align: center;
	-ms-flex-align: center;
	align-items: center;
	background: #fff
}

.button-group .toggle-button {
	width: 32.5px;
	-webkit-box-pack: center;
	-ms-flex-pack: center;
	justify-content: center;
	border: 1px solid #dcdfe6
}

.button-group .el-button:focus, .button-group .el-button:hover {
	color: unset
}

.button-group .active {
	background-color: #e0e0e0;
	border-color: #dcdfe6
}

.button-group .card-button {
	border-radius: 4px 0 0 4px !important
}

.button-group .list-button {
	border-radius: 0 4px 4px 0 !important
}

.button-group .separator {
	width: 1px;
	height: 32px;
	background: #dcdfe6
}
</style>
