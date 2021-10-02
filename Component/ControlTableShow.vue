<template>
  <div class="control-table">
    <div slot="header" class="header-wrap">
      <span class="title">履歴</span>
      <el-button
        ref="btn"
        type="danger"
        @click="tableHide"
        :icon="isShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
      >
        <span>{{ tipCon }}</span>
      </el-button>
    </div>

    <transition name="tableshow">
      <div v-show="isShow">
        <slot>デフォルト</slot>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ControlTableShow",
  data() {
    return {
      isShow: true,
    };
  },
  computed: {
    tipCon() {
      return this.isShow ? "閉じる" : "開く";
    },
  },
  methods: {
    tableHide() {
      this.isShow = !this.isShow;
    },
  },
};
</script>

<style scoped>
.control-table {
  padding: 24px;
}

.header-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.header-wrap .title {
  font-size: 20px;
  font-weight: 600;
}

.tableshow-enter-active,
.tableshow-leave-active {
  transition: opacity 0.3s;
}

.tableshow-enter,
.tableshow-leave-to {
  opacity: 0;
}
</style>
