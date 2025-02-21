<template>
  <div>
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span
          v-if="item.raw.listClass == 'default' || item.raw.listClass == ''"
          :key="item.value"
          :index="index"
          :class="item.raw.cssClass"
          :size="size"
          >{{ item.label }}</span>
				<span class="status" :class="item.raw.listClass" v-else-if="listClass === 'text'">
					<span class="dot" :class="item.raw.listClass" :style="item.raw.listClass"></span>
					<span>{{ item.label }}</span>
				</span>
        <el-tag
          v-else
          :disable-transitions="true"
          :key="item.value"
          :index="index"
          :type="item.raw.listClass == 'primary' ? '' : item.raw.listClass"
          :class="item.raw.cssClass"
          :size="size">
          {{ item.label }}
        </el-tag>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  name: "DictTag",
  props: {
    options: {
      type: Array,
      default: null,
    },
    value: [Number, String, Array],
    size:{
      type: String,
      default:"big"
    },
    listClass:{
			type: String,
			default:""
		}
  },
  computed: {
    values() {
      if (this.value !== null && typeof this.value !== 'undefined') {
        return Array.isArray(this.value) ? this.value : [String(this.value)];
      } else {
        return [];
      }
    },
  },
};
</script>
<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.status {
	position: relative;
	margin-left: 4px
}
.status.warning {
	color: #ffba00;
}
.status.success {
	color: #67c23a;
}
.status.info {
	color: #909399;
}
.status.danger {
	color: #ff4949;
}
.status .dot {
	position: absolute;
	top: 3px;
	left: -8px;
	width: 4px;
	height: 4px;
	border-radius: 50%
}
.status .dot.warning {
	background-color: #ffba00
}
.status .dot.success {
	background-color: #67c23a
}
.status .dot.info {
	background-color: #909399
}
.status .dot.danger {
	background-color: #ff4949
}
</style>