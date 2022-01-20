<template>
  <div class="index_common_hdg">
    <h2
      class="hdg"
      v-html="hdg" />
  </div>
</template>

<script>
export default {
  /**
   * 見出しコンポーネント
   * @typedef {Object} String
   * @return {Strings}
   */
  props: {
    hdg: {
      type: String,
      default: ""
    }
  }
}
</script>

<style lang="scss">
  @use "../../../../style/foundation/global" as g;
  .index_common_hdg {
    .hdg {
      font-weight: bold;
      color: #2C353B;
      font-size: 24px;
       @include g.mq {
        font-size: 36px;
       }

      .is-sp {
        display: block;
        @include g.mq {
          display: none;
        }
      }
    }
  }
</style>
