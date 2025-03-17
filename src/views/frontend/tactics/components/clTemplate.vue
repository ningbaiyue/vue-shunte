<template>
	<div>
		<!-- 轮播容器 -->
		<div style="background: #f5f7fa;">
			<div class="carousel-container">
				<div class="arrow left" @click="slide(-1)" :class="{ disabled: currentIndex === 0 }">
					<i class="el-icon-arrow-left"></i>
				</div>
				
				<div class="carousel-wrapper">
					<div class="carousel-track" :style="{ transform: `translateX(${translateX}px)` }">
						<div v-for="(card, index) in cards" :key="index" class="strategy-card"
								 :class="{ 'active': activeIndex === index, 'filled': card.templateName }"
								 @click="activateCard(index)"
						>
							<div v-if="!card.templateName" class="empty-card">
								<i class="el-icon-plus"></i>
							</div>
							<div v-else class="filled-card">
								<div class="template-name">{{ card.templateName }}</div>
								<div class="strategy-type">{{ card.strategyType }}</div>
							</div>
						</div>
					</div>
				</div>
				
				<div class="arrow right" @click="slide(1)" :class="{ disabled: currentIndex >= maxIndex }">
					<i class="el-icon-arrow-right"></i>
				</div>
			</div>
		</div>
		
		<!-- 详情容器 -->
		<div class="detail-container">
			<el-form v-if="activeCard" :model="activeCard" label-width="100px" class="detail-form">
				<el-row>
					<el-col :span="10">
						<el-form-item label="模板名称" required>
							<el-input v-model="activeCard.templateName" placeholder="请输入模板名称" maxlength="8" show-word-limit class="template-input"></el-input>
							<span style="color: #aaaaaa">（最多8个字符）</span>
						</el-form-item>
					</el-col>
					<el-col :span="10">
						<el-form-item label="策略类型" required>
							<el-select v-model="activeCard.strategyType" placeholder="请选择策略类型" class="strategy-select">
								<el-option v-for="type in strategyTypes" :key="type" :label="type" :value="type"></el-option>
							</el-select>
							<el-tooltip class="pre-wrap" effect="dark" :content="tipContent" placement="top">
								<i class="el-icon-question ml10" style="font-size: 18px;"></i>
							</el-tooltip>
						</el-form-item>
					</el-col>
					<el-col :span="4">
						<el-button type="primary" icon="el-icon-circle-plus-outline" @click="">新增</el-button>
					</el-col>
				</el-row>
				
				<el-divider />
			</el-form>
			
			<div class="time-slots-section">
			
			</div>
			<el-table :data="activeCard.timeSlots" border class="time-table">
				<el-table-column prop="index" label="序号" width="80" align="center"></el-table-column>
				<el-table-column label="开始时间" prop="time"></el-table-column>
				<el-table-column label="结束时间" prop="name"></el-table-column>
				<el-table-column label="控制类型" prop="type"></el-table-column>
				<el-table-column label="计划功率(kW)" prop="power"></el-table-column>
				<el-table-column label="无功功率(kW)" prop=""></el-table-column>
				<el-table-column label="操作">
					<template #default="{ $index }">
						<el-button type="text" @click="editTimeSlot" icon="el-icon-edit" class="table-action">编辑</el-button>
						<el-button type="text" style="color: #F56C6C" icon="el-icon-delete" @click="deleteTimeSlot($index)" class="table-action">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		
<!--	新增/编辑弹窗	-->
	
	</div>
</template>

<script>
export default {
	data() {
		return {
			cards: [{}], // 初始化包含一个空白卡片
			activeIndex: 0,
			currentIndex: 0,
			translateX: 0,
			cardWidth: 200,
			cardMargin: 30,
			strategyTypes: ['削峰填谷', '动态填谷'],
			controlTypes: [ '充电', '放电', '待机', '停机'],
			screenWidth: 0,
			tipContent: '是指EMS控制策略，目前支持削峰填谷和动态增容两种策略类型。' +
					'\n削峰填谷：储能系统在夜间谷时充电，在峰时放电。' +
					'\n动态增容：监测变压器实时功率，根据变压器功率和需量，调整储能放电功率。'
		}
	},
	computed: {
		visibleCount() {
			if (this.screenWidth >= 1400) return 5
			if (this.screenWidth >= 1200) return 4
			if (this.screenWidth >= 992) return 3
			return 2
		},
		maxIndex() {
			return Math.max(this.cards.length - this.visibleCount, 0)
		},
		activeCard() {
			return this.cards[this.activeIndex]
		}
	},
	mounted() {
		this.screenWidth = window.innerWidth
		window.addEventListener('resize', this.handleResize)
		this.handleResize()
	},
	beforeDestroy() {
		window.removeEventListener('resize', this.handleResize)
	},
	methods: {
		handleResize() {
			this.screenWidth = window.innerWidth
			this.$nextTick(() => {
				this.currentIndex = Math.min(this.currentIndex, this.maxIndex)
				this.translateX = -this.currentIndex * (this.cardWidth + this.cardMargin)
			})
		},
		slide(direction) {
			const newIndex = this.currentIndex + direction
			if (newIndex >= 0 && newIndex <= this.maxIndex) {
				this.currentIndex = newIndex
				this.translateX = -this.currentIndex * (this.cardWidth + this.cardMargin)
			}
		},
		activateCard(index) {
			this.activeIndex = index
			if (!this.cards[index].templateName) {
				this.$set(this.cards, index, {
					templateName: '',
					strategyType: '',
					timeSlots: []
				})
			}
		},
		saveTemplate() {
			if (!this.activeCard.templateName?.trim()) {
				this.$message.warning('请输入模板名称')
				return
			}
			if (!this.activeCard.strategyType) {
				this.$message.warning('请选择策略类型')
				return
			}
			
			if (this.activeIndex === this.cards.length - 1) {
				this.cards.push({})
			}
			
			this.$message.success('保存成功')
			this.adjustCarousel()
		},
		adjustCarousel() {
			this.$nextTick(() => {
				if (this.cards.length > this.visibleCount) {
					this.currentIndex = Math.min(
							this.activeIndex - Math.floor(this.visibleCount/2),
							this.cards.length - this.visibleCount
					)
					this.translateX = -this.currentIndex * (this.cardWidth + this.cardMargin)
				}
			})
		},
		editTimeSlot() {
		
		},
		deleteTimeSlot(index) {
			this.activeCard.timeSlots.splice(index, 1)
			this.updateIndexes()
		},
		updateIndexes() {
			this.activeCard.timeSlots.forEach((item, index) => {
				item.index = index + 1
			})
		},
		resetCard() {
			this.$set(this.cards, this.activeIndex, {})
			this.activeIndex = this.cards.length - 1
		}
	}
}
</script>

<style scoped>
/* 轮播容器 */
.carousel-container {
	width: 1400px;
	max-width: 90%;
	margin: 0 auto;
	position: relative;
	padding: 30px 0;
	display: flex;
	align-items: center;
}

.carousel-wrapper {
	width: calc(100% - 100px);
	overflow: hidden;
	margin: 0 20px;
}

.carousel-track {
	display: flex;
	gap: 30px;
	transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.strategy-card {
	flex: 0 0 200px;
	height: 100px;
	border: 2px solid #ebeef5;
	border-radius: 12px;
	cursor: pointer;
	transition: all 0.3s;
	background: #fff;
	box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.strategy-card.active {
	border-color: #486ff2;
	box-shadow: 0 4px 16px rgba(64, 158, 255, 0.2);
}

.empty-card {
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	color: #c0c4cc;
	font-size: 32px;
	transition: color 0.3s;
}

.filled-card {
	padding: 15px;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	.template-name {
		font-size: 16px;
		font-weight: 600;
		color: #303133;
		margin-bottom: 8px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.strategy-type {
		font-size: 12px;
		color: #909399;
		letter-spacing: 0.5px;
	}
}

/* 箭头样式 */
.arrow {
	font-size: 28px;
	padding: 12px;
	cursor: pointer;
	color: #606266;
	background: rgba(255,255,255,0.9);
	border-radius: 50%;
	box-shadow: 0 2px 12px rgba(0,0,0,0.1);
	transition: all 0.3s;
	&:hover:not(.disabled) {
		color: #486ff2;
		transform: scale(1.1);
	}
	&.disabled {
		color: #c0c4cc;
		cursor: not-allowed;
		opacity: 0.6;
	}
}

/* 详情容器 */
.detail-container {
	width: 100%;
	padding: 20px;
	background: #fff;
	box-shadow: 0 -2px 16px rgba(0,0,0,0.04);
}

.detail-form {
	.template-input, .strategy-select {
		width: 200px;
		max-width: 400px;
	}
}

.time-slots-section {
	margin-top: 40px;
	.time-table {
		margin-top: 15px;
		::v-deep .el-table__header th {
			background: #f8f9fa;
		}
	}
}

/* 响应式适配 */
@media (max-width: 1600px) {
	.carousel-container {
		width: 90%;
	}
	.detail-container {
		padding: 40px 10%;
	}
}

@media (max-width: 1200px) {
	.carousel-container {
		width: 95%;
		padding: 20px 0;
	}
	.strategy-card {
		flex: 0 0 180px;
		height: 90px;
	}
	.detail-container {
		padding: 30px 5%;
	}
}

@media (max-width: 992px) {
	.carousel-wrapper {
		width: calc(100% - 80px);
	}
	.strategy-card {
		flex: 0 0 160px;
		height: 80px;
	}
	.arrow {
		font-size: 24px;
		padding: 10px;
	}
	.detail-container {
		padding: 20px;
	}
}

@media (max-width: 768px) {
	.carousel-container {
		width: 100%;
		padding: 15px;
	}
	.strategy-card {
		flex: 0 0 140px;
		height: 70px;
		border-radius: 8px;
	}
	.empty-card {
		font-size: 24px;
	}
	.filled-card {
		padding: 10px;
		.template-name {
			font-size: 14px;
		}
	}
	.detail-form {
		.time-table {
			overflow-x: auto;
		}
	}
}
</style>
<style>
.el-tooltip__popper {
	white-space: pre-wrap !important;
}
.el-divider--horizontal {
	margin: 10px 0 !important;
}
</style>