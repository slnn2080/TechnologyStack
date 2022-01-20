<template>
  <div class="index_common_container service_container">
    <div class="service_heading">
      <Heading
        hdg="KINTOファミリー" />
    </div>
    <div class="p-index_service_inner">
      <div
        v-for="(item, index) in bnr"
        :key="index"
        class="bnr_item">
        <a
          :href="item.url">
          <img
            :src="`/assets/img/index/service/${item.img}.jpg`"
            :alt="item.alt">
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "./Heading.vue"
export default {
  components: {
    Heading
  },
  data() {
    return {
      bnr: [
        {
          url: "",
          img: "bnr_01",
          alt: "モビリティマーケット　新プログラム続々登場！"

        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/system/foundation/global" as g;
.service_heading {
  margin: 0 auto;
  text-align: center;
  margin-bottom: 32px;
}

.service_container {
  padding-top: 100px;
  padding: 0 24px;
  margin-bottom: 110px;
  @include g.mq {
    padding: 0;
    margin-bottom: 125px;
  }
  &:before {
    content: "";
    background: url(/assets/img/index/service/bg_service.svg) top left no-repeat;
    background-size: contain;
    display: block;
    z-index: -1;
    position: absolute;
    top: 0;
    left: 0;
    width: 72.8%;
    min-height: 62px;
    @include g.mq {
    width: 582px;
    height: 110px;
    }
  }

  .bnr_item {
    margin: 0 auto;
    max-width: 808px;
    width: 100%;

    a {
      display: block;
    }
    img {
      width: 100%;
      border-radius: 10px;
      box-shadow: -2px 5px 8px 4px rgba(0, 0, 0, 0.2);
    }

  }
}

</style>
