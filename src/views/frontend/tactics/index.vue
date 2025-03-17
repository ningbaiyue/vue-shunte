<template>
	<div class="app-container">
		<el-card body-style="padding:10px" class="mb10">
			<div class="flex-space-between">
				<div class="nav-title"><span class="xian"></span>策略管理</div>
				<div class="current-status">
					<span class="mr20">当前运行模式：<span style="color: #6d8cf5">自动模式</span></span>
					<span class="ml20">当前执行策略：<span style="color: #6d8cf5">削峰填谷-谷充峰放</span></span>
				</div>
				<el-button type="primary" size="mini" @click="handoff">切换</el-button>
			</div>
		</el-card>
		
		<div class="energy-management">
			<!-- 左侧模式选择 -->
			<div class="left-panel">
				<div class="mode-title">控制模式</div>
				<div
						v-for="mode in modes"
						:key="mode.value"
						class="mode-item"
						:class="{ 'active': currentMode === mode.value }"
						@click="switchMode(mode.value)"
				>
					<div class="mode-content">
						<svg-icon class="item" :icon-class="mode.icon"/>
						<h3>{{ mode.label }}</h3>
						<p>{{ mode.description }}</p>
					</div>
				</div>
			</div>
			
			<!-- 右侧内容区域 -->
			<div class="right-panel">
				<!-- 手动模式 -->
				<div v-show="currentMode === 'manual'" class="strategy">
					<div class="str">
						<div class="navItem">
							<svg-icon class="item" icon-class="lidianchi"/>
							<div class="title">储能系统</div>
							<div class="desc">控制储能系统的启动、停止以及PCS有功无功设置等操作</div>
						</div>
						<div class="str_main">
							<div class="str_brn">
								<div class="disioc btnColor1">开机</div>
							</div>
							<div class="str_brn">
								<div class="disioc btnColor2">关机</div>
							</div>
						</div>
						
						<div class="power-control">
							<div class="power-item">
								<span>有功功率：</span>
								<el-input v-model="activePower" style="width: 320px">
									<template slot="append">
										<span>kW, 当前: 0</span>
									</template>
								</el-input>
								<el-button type="primary" plain>确定</el-button>
								<div class="tip">输入值为正代表放电，为负代表充电</div>
							</div>
							
							<div class="power-item">
								<span>无功功率：</span>
								<el-input v-model="reactivePower" style="width: 320px">
									<template slot="append">
										<span>kVar, 当前: 0</span>
									</template>
								</el-input>
								<el-button type="primary" plain>确定</el-button>
								<div class="tip">输入值为正代表放电，为负代表充电</div>
							</div>
						</div>
					</div>
					
					<div class="str">
						<div class="dashed"></div>
						<div class="navItem">
							<svg-icon class="item" icon-class="yunhangshi"/>
							<div class="title">STS</div>
							<div class="desc">控制储能系统的并网、离网操作（要求PCS支持STS功能）</div>
						</div>
						<div class="str_main">
							<div class="str_brn">
								<div class="disioc btnColor3">并网</div>
							</div>
							<div class="str_brn">
								<div class="disioc btnColor4">离网</div>
							</div>
						</div>
					</div>
					<div class="bottom">
						<div class="flex">
							<div class="allTime">
								当前模式运行时长：
								<span>--</span>
								天
								<span>--</span>
								小时
								<span>--</span>
								分
							</div>
							<div class="startTime">本次启用时间：<span>--</span></div>
						</div>
						<el-button type="primary" plain>启用</el-button>
					</div>
				</div>
				
				<!-- 自动模式 -->
				<div v-show="currentMode === 'auto'" class="strategy">
					<div class="strategy_header">
						<!-- 自定义标签页 -->
						<div class="custom-tabs">
							<div class="tab-item" :class="{ 'active': activeTab === 'template' }" @click="switchTab('template')">
								<svg-icon class="item" icon-class="template-settings"/>
								<span>策略模板</span>
							</div>
							<div class="tab-item" :class="{ 'active': activeTab === 'management' }" @click="switchTab('management')">
								<svg-icon class="item" icon-class="task"/>
								<span>策略管理</span>
							</div>
						</div>
						<div class="subtitle">
							<span>预置不同策略类型下的参数模板，便于在策略管理中将不同参数模板绑定到不同的执行时间</span>
							<svg-icon class="item" icon-class="guanli"/>
						</div>
					</div>
					
					<!-- 内容区域 -->
					<div class="tab-content">
						<!-- 策略模板内容 -->
						<div v-show="activeTab === 'template'" class="template-content">
							<cl-template />
						</div>
						
						<!-- 策略管理内容 -->
						<div v-show="activeTab === 'management'" class="management-content">
							策略管理面板
						</div>
					</div>
				</div>
				
				<!-- 代理模式 -->
				<div v-show="currentMode === 'proxy'" class="strategy">
					<div class="exist">
						<div class="exist_header">调用日志</div>
						<el-form :model="queryParams" ref="queryForm" size="small" :inline="true">
							<el-form-item label="" prop="content">
								<el-input
										v-model="queryParams.content"
										placeholder="请输入内容"
										clearable
										@keyup.enter.native="handleQuery"
								/>
							</el-form-item>
							<el-form-item label="" prop="status">
								<el-select v-model="queryParams.status" placeholder="请选择状态" clearable>
									<el-option
											v-for="item in statusList"
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
								<el-button type="primary" plain icon="el-icon-refresh-left" size="mini" @click="handleFlushed">刷新</el-button>
							</el-form-item>
						</el-form>
						
						<el-table v-loading="loading" :data="tableProxyList" border style="height: 500px;">
							<el-table-column label="状态" align="center" prop="status" width="200" />
							<el-table-column label="内容" align="center" prop="content" />
							<el-table-column label="发生时间" align="center" prop="happenTime" width="200">
								<template slot-scope="scope">
									<span>{{ parseTime(scope.row.happenTime, '{y}-{m}-{d}') }}</span>
								</template>
							</el-table-column>
						</el-table>
						
						<pagination :total="total" :page.sync="queryParams.pageNum"
												:limit.sync="queryParams.pageSize" @pagination="getList" />
					</div>
					<div class="bottom">
						<div class="flex">
							<div class="allTime">
								当前模式运行时长：
								<span>--</span>
								天
								<span>--</span>
								小时
								<span>--</span>
								分
							</div>
							<div class="startTime">本次启用时间：<span>--</span></div>
						</div>
						<el-button type="primary" plain>启用</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import clTemplate from "./components/clTemplate.vue";

export default {
	components: { clTemplate },
	data() {
		return {
			currentMode: 'auto',
			modes: [
				{
					value: 'manual',
					icon: 'manual',
					label: '手动模式',
					description: '手动切换站点各个子系统的启动停止，并网网络操作'
				},
				{
					value: 'auto',
					icon: 'auto',
					label: '自动模式',
					description: '站点确定运行时根据预制策略控制各个子系统的运行状态'
				},
				{
					value: 'proxy',
					icon: 'proxy',
					label: '代理模式',
					description: '第三方管理系统通过本系统对站点各个子系统进行操作控制'
				}
			],
			activePower: '-500',
			reactivePower: '0',
			/** 自动 **/
			activeTab: 'template', // 当前激活的标签页
			/** 代理 **/
			// 遮罩层
			loading: false,
			// 查询参数
			queryParams: {
				content: undefined,
				status: undefined,
				pageNum: 1,
				pageSize: 20,
			},
			statusList: [{value: 'succeed', label: '成功'}, {value: 'fail', label: '失败'}],
			tableProxyList: [],
			// 总条数
			total: 0,
		}
	},
	methods: {
		/** 切换模式 **/
		handoff() {},
		switchMode(mode) {
			this.currentMode = mode
		},
		/** 自动模式 **/
		switchTab(tabName) {
			this.activeTab = tabName
		},
		/** 代理模式 **/
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
		/** 刷新按钮操作 */
		handleFlushed() {
			// this.reset();
			this.$router.push({ path: '/power/addPower' });
		},
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

.energy-management {
	display: flex;
	height: calc(100vh - 130px);
	background: #f5f7fa;
}
/* 调整原有样式 */
.left-panel {
	width: 200px;
	background: #fff;
	padding: 20px;
	border-right: 1px solid #ebeef5;
	position: relative; /* 确保三角显示在面板内 */
	display: flex;
	flex-direction: column;
}

.mode-title {
	font-size: 16px;
	font-weight: bold;
	color: #303133;
	margin-bottom: 20px;
	text-align: center;
}

.mode-item {
	position: relative;
	padding: 15px;
	margin-bottom: 15px;
	border: 1px solid #ebeef5;
	border-radius: 4px;
	cursor: pointer;
	transition: all 0.3s;
	overflow: visible; /* 允许三角溢出 */
	flex: 1;
	align-content: center;
	&:hover {
		border-color: #486ff2;
	}
	/* 新增三角指示器样式 */
	&.active {
		position: relative;
		border: 2px solid #486ff2;
		background-color: #ecf5ff;
		&::after {
			content: '';
			position: absolute;
			right: -12px;
			top: 50%;
			transform: translateY(-50%);
			width: 0;
			height: 0;
			border-top: 10px solid transparent;
			border-bottom: 10px solid transparent;
			border-left: 12px solid #486ff2;
			z-index: 1;
		}
		&::before {
			content: '';
			position: absolute;
			right: -10px;
			top: 50%;
			transform: translateY(-50%);
			width: 0;
			height: 0;
			border-top: 8px solid transparent;
			border-bottom: 8px solid transparent;
			border-left: 10px solid #ecf5ff;
			z-index: 2;
		}
		.svg-icon {
			fill: #486ff2;
		}
		h3 {
			color: #486ff2;
		}
	}
}

.mode-content {
	text-align: center;
	.item {
		font-size: 36px;
		fill: #808080;
	}
	h3 {
		font-size: 18px;
		color: #303133;
		margin: 10px 0;
	}
	p {
		font-size: 12px;
		color: #909399;
		line-height: 1.5;
		text-align: left;
	}
}

.right-panel {
	flex: 1;
	padding: 10px 20px;
	background: #fff;
	margin-left: 20px;
	border-radius: 4px;
	box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
.strategy {
	width: 100%;
	height: 100%;
	position: relative;
	transition: all .5s linear;
	.dashed {
		border-top: 1px dashed #595959;
		margin-top: 30px;
		width: 100%;
		height: 2px;
	}
	.navItem {
		height: 50px;
		color: #486ff2;
		display: flex;
		align-items: center;
		transition: all .3s linear;
		.item {
			font-size: 22px;
			margin: 3px 12px 0;
			fill: #486ff2;
		}
		.title {
			letter-spacing: 1px;
			font-size: 22px;
		}
		.desc {
			margin-left: 24px;
			font-size: 16px;
			color: #808080;
		}
	}
	.str_main {
		height: 250px;
		padding: 0 100px;
		display: flex;
		align-items: center;
		.str_brn {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.disioc {
			width: 120px;
			height: 120px;
			border-radius: 50%;
			color: #fff;
			text-align: center;
			line-height: 120px;
			font-size: 36px;
			cursor: pointer;
			-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
			&:hover {
				box-shadow: 0 0 30px #a2a2a2 !important;
			}
		}
		.btnColor1 {
			background-image: linear-gradient(180deg, #9bd3ef, #0ee4ec, #55dcee);
			border: 5px solid #156389;
		}
		.btnColor2 {
			background-image: linear-gradient(180deg, #f49fac, #ec5f74, #ec5f74);
			border: 5px solid #941225;
		}
		.btnColor3 {
			background-image: linear-gradient(180deg, #6dd1a1, #50d095, #40bf85);
			border: 5px solid #226e4b;
		}
		.btnColor4 {
			background-image: linear-gradient(180deg, #ffd699, #ffbc4d, #e5a839);
			border: 5px solid #aa6500;
		}
	}
	.bottom {
		justify-content: space-between;
		display: flex;
		position: absolute;
		bottom: 10px;
		width: 100%;
		.startTime {
			margin-left: 60px;
		}
	}
}
.power-control {
	display: flex;
	text-align: center;
	.power-item {
		flex: 1;
		::v-deep .el-button {
			margin-left: 10px;
		}
		.tip {
			font-size: 14px;
			color: #bcbcbc;
			margin-left: -100px;
			margin-top: 10px;
		}
	}
}

.exist {
	.exist_header {
		height: 90px;
		color: #486ff2;
		line-height: 90px;
		font-size: 30px;
		padding-left: 30px;
	}
}
.strategy_header {
	display: flex;
	align-items: center;
	font-size: 18px;
	justify-content: space-between;
	.custom-tabs {
		display: flex;
		align-items: center;
		box-sizing: border-box;
		.tab-item:first-child {
			border-right: #bfbfbf solid 1px;
			padding-right: 6px;
		}
		.tab-item {
			display: flex;
			justify-content: center;
			align-items: center;
			cursor: pointer;
			.item {
				fill: #808080;
				font-size: 30px;
				padding: 0 4px;
			}
			&.active {
				color: #486ff2;
				.item {
					fill: #486ff2;
				}
			}
		}
	}
	.subtitle {
		font-size: 14px;
		color: #808080;
		box-sizing: border-box;
		width: 72%;
		display: flex;
		justify-content: space-between;
		.item {
			font-size: 24px;
			cursor: pointer;
		}
	}
}
.tab-content {
	margin-top: 14px;
}
</style>





