<template>
	<div class="app-container">
		<el-card body-style="padding:10px" class="mb10">
			<div class="flex-space-between">
				<div class="nav-title"><span class="xian"></span>消防信息</div>
				<!--				<el-button type="primary" size="mini" @click="">配置</el-button>-->
			</div>
		</el-card>
		<el-card body-style="padding-top:10px" class="mb10">
			<div class="card-title mb10"><span class="dian"></span>DI</div>
			<el-row :gutter="30">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<ul class="infoList">
						<li>
							<div>急停按钮状态</div>
							<div class="status-green">正常</div>
						</li>
						<li>
							<div>火灾烟感状态</div>
							<div class="status-green">正常</div>
						</li>
						<li>
							<div>并网开关报警</div>
							<div class="status-green">正常</div>
						</li>
						<li>
							<div>门禁开关状态</div>
							<div class="status-green">关</div>
						</li>
					</ul>
				</el-col>
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<ul class="infoList">
						<li>
							<div>浪涌保护状态</div>
							<div class="status-green">正常</div>
						</li>
						<li>
							<div>消防干节点状态</div>
							<div class="status-green">正常</div>
						</li>
						<li>
							<div>并网辅触状态</div>
							<div class="status-green">合</div>
						</li>
						<li>
							<div>水浸传感器状态</div>
							<div class="status-green">正常</div>
						</li>
					</ul>
				</el-col>
			</el-row>
		</el-card>
		
		<el-card body-style="padding-top:10px" class="mb10">
			<div class="card-title mb10"><span class="dian"></span>DO</div>
			<el-row :gutter="30">
				<el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
					<ul class="infoList">
						<li>
							<div>运行灯状态</div>
							<div class="status-green">亮</div>
						</li>
						<li>
							<div>声光报警状态</div>
							<div class="status-green">关</div>
						</li>
						<li>
							<div>排风扇状态</div>
							<div class="status-green">开</div>
						</li>
						<li>
							<div>故障灯状态</div>
							<div class="status-green">灭</div>
						</li>
						<li>
							<div>并网点脱扣状态</div>
							<div class="status-green">合</div>
						</li>
					</ul>
				</el-col>
			</el-row>
		</el-card>
	</div>
</template>
<script>
export default {
	name: "fire",
	data() {
		return {}
	},
	mounted() {},
	methods: {}
}
</script>
<style scoped lang="scss">
@import "@/assets/styles/fontend";
</style>