<template>
	<div class="ml20 mr20">
		<div class="nav-title mr20 mb10"><span class="xian"></span>控制命令</div>
		<el-divider />
		<el-row :gutter="20">
			<el-col :span="12">
				<div class="switch-title">开关机控制</div>
				<el-radio-group v-model="currentState" class="custom-radio-group">
					<el-radio
							v-for="item in states"
							:key="item.value"
							:label="item.value"
							class="custom-radio"
					>
						<div class="switch-button">
							<div class="square-layer">
								<div class="outer-circle">
									<div class="inner-circle">
										<div class="core" :class="{ active: currentState === item.value }"></div>
									</div>
								</div>
							</div>
							<span class="label">{{ item.label }}</span>
						</div>
					</el-radio>
				</el-radio-group>
			</el-col>
			<el-col :span="12">
				<div class="switch-title">远程调试</div>
				<el-radio-group v-model="currentState" class="custom-radio-group">
					<el-radio
							v-for="item in states"
							:key="item.value"
							:label="item.value"
							class="custom-radio"
					>
						<div class="switch-button">
							<div class="square-layer">
								<div class="outer-circle">
									<div class="inner-circle">
										<div class="core" :class="{ active: currentState === item.value }"></div>
									</div>
								</div>
							</div>
							<span class="label">{{ item.label }}</span>
						</div>
					</el-radio>
				</el-radio-group>
			</el-col>
			<el-col :span="12" style="margin-top: 40px;">
				<div class="switch-title">电池接触器</div>
				<el-radio-group v-model="currentState" class="custom-radio-group">
					<el-radio
							v-for="item in batteryStates"
							:key="item.value"
							:label="item.value"
							class="custom-radio"
					>
						<div class="switch-button">
							<div class="square-layer">
								<div class="outer-circle">
									<div class="inner-circle">
										<div class="core" :class="{ active: currentState === item.value }"></div>
									</div>
								</div>
							</div>
							<span class="label">{{ item.label }}</span>
						</div>
					</el-radio>
				</el-radio-group>
			</el-col>
			
			<el-col :span="24" style="margin-top: 40px;">
				<div class="switch-title mb20">清除故障</div>
				<el-button class="clearBtn" @click=""><svg-icon class="item" icon-class="iconPark-clear" /></el-button>
			</el-col>
		</el-row>
		
		<div class="dialog-footer">
			<el-button @click="cancel(false)">取 消</el-button>
			<el-button type="primary" plain @click="appAll">应用全部</el-button>
			<el-button type="primary" @click="submitForm">保 存</el-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "ControlCommands",
	data() {
		return {
			currentState: 'ON',
			states: [
				{ label: '开', value: 'ON' },
				{ label: '关', value: 'OFF' },
				{ label: '待机', value: 'Standby' }
			],
			batteryStates: [
				{ label: '闭合', value: 'ON' },
				{ label: '断开', value: 'OFF' },
			],
		};
	},
	methods: {
		cancel(flay) {
			flay = typeof flay != "boolean" ? false : flay;
			this.$emit('close', flay)
		},
		appAll() {},
		submitForm() {}
	}
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/fontend";

::v-deep .el-form .el-input, ::v-deep .el-form .el-select {
	width: 70% !important;
	margin-right: 6px;
}
::v-deep .el-form .el-select .el-input {
	width: 100% !important;
	margin-right: 0;
}
::v-deep .el-divider--horizontal {
	margin: 10px auto;
}
.dialog-footer {
	text-align: center;
	margin-top: 30px;
}
.select-label {
	font-weight: bold;
	font-size: 14px;
	margin-bottom: 6px;
	margin-top: 20px;
}

.switch-title {
	font-size: 16px;
	font-weight: bold;
}
.custom-radio-group {
	display: flex;
	gap: 30px;
}

.custom-radio {
	margin-right: 0 !important;
}

.custom-radio ::v-deep .el-radio__input {
	display: none;
}

.switch-button {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	cursor: pointer;
}

.square-layer, .clearBtn {
	width: 132px;
	height: 132px;
	background: #F0F0F0;
	border: 1px solid #CBCBCB;
	border-radius: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	transition: border-color 0.3s;
}
.clearBtn .item {
	width: 64px;
	height: 64px;
}

.custom-radio.is-checked .square-layer {
	border-color: #00A53D;
}
.custom-radio.is-checked .label {
	color: #00A53D;
}

.outer-circle {
	width: 96px;
	height: 96px;
	border-radius: 50%;
	background: linear-gradient(to bottom, #fdfdfd, #c6c6c6);
	box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
	display: flex;
	justify-content: center;
	align-items: center;
}

.inner-circle {
	width: 80px;
	height: 80px;
	border-radius: 50%;
	background: linear-gradient(to bottom, #dfdfdf, #d1d1d1);
	display: flex;
	justify-content: center;
	align-items: center;
}

.core {
	width: 32px;
	height: 32px;
	background: linear-gradient(0deg, #a1a1a1, #D9D9D9);
	border-radius: 50%;
	transition: background 0.3s;
}

.core.active {
	background: linear-gradient(180deg, #31C467 30%, #67FF67);
}

.label {
	font-size: 14px;
	color: #666;
}
</style>