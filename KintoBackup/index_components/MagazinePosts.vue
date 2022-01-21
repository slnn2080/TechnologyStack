<template>
  <div class="index_common_container magazine_posts info_container">
    <div class="magazine_hdg">
      <Heading hdg="車のお役立ち情報" />
    </div>
    <div class="info_inner">
      <div class="tab-container">
        <v-tabs>
          <v-tab class="tab">
            おすすめ
          </v-tab>
          <v-tab class="tab">
            人気記事
          </v-tab>
          <v-tab-item>
            <MagazinePostsList
              :category="'column'"
              :num="'5'" />
          </v-tab-item>
          <v-tab-item>
            <MagazinePostsList
              :tag="'popular'"
              :category="'column'"
              :num="'5'" />
          </v-tab-item>
        </v-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import MagazinePostsList from "./MagazinePostsList"
import Heading from "../components/Heading.vue"

export default {
  components: {
    MagazinePostsList,
    Heading
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/foundation/global" as g;

.info_container {
  margin: 0 auto;
  width: 100%;
  margin-bottom: 64px;
  &:before {
    content: "";
    background: url(/assets/img/index/info/bg_info.svg) top left no-repeat;
    background-size: cover;
    width: 126px;
    height: 46px;
    position: absolute;
    top: -30px;
    left:30px;
    display: block;
    z-index: -1;
    @include g.mq {
      width: 266px;
      height: 110px;
      top: -60px;
      right:166px;
      left: auto;
    }
  }
}

.info_inner {
  width: 100%;
  max-width: 808px;
  position: relative;
  margin: 0 auto;
  text-align: center;
}
.magazine_hdg {
  text-align: center;
  .hdg {
    text-align: center;
  }
}
::v-deep {
  .v-slide-group__content {
    justify-content: center;
  }
  .v-tabs-slider-wrapper {
    border-color: #00708D;
    .v-tabs-slider {
      background-color: #00708D;
    }
  }
  &.v-tab--active {
    color: #00708D;
  }
}

</style>
