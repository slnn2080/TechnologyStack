<template>
  <div class="cartouchpoint-container">
    <div class="cartouchpoint-inner">
      <Heading hdg="ぴったりのマイカーを選ぼう" />
      <TabMenu />
    </div>
  </div>
</template>

<script>
/**
 * クルマの触れ合いコーナーとやら
 * @typedef {Object} Props
 * @return {Object|Strings}
 * @description targetの 0||1 でtarget属性をつけたりつけなかったりしています
 */

import Heading from "./Heading.vue"
import TabMenu from "./TabMenu.vue"
export default {
  components: {
    Heading,
    TabMenu,
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/foundation/global" as g;

.cartouchpoint-container {
  display: block;
  margin: 0 auto;
  position: relative;
  &:before {
    position: absolute;
    top: -4vw;
    left: 50%;
    transform: translateX(-50%);
    content:"";
    background: url(/assets/img/index/mainvisual/bg_lineup.svg) top center no-repeat;
    background-size: contain;
    width: 53.6%;
    min-height: 40px;
    z-index: -1;
    @include g.mq {
      width: 500px;
      height: 110px;
    }
  }

  .cartouchpoint-inner {
    margin: 0 auto;
    text-align: center;
  }

}
</style>
