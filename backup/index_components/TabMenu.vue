<template>
  <div class="tab-container">
    <v-tabs>
      <v-tab class="tab">
        人気ランキング
      </v-tab>
      <v-tab class="tab">
        KINTO専用車
      </v-tab>
      <v-tab class="tab">
        お気に入り
      </v-tab>
      <v-tab-item>
        <CarLineup />
      </v-tab-item>
      <v-tab-item>
        <KintoCar />
      </v-tab-item>
      <v-tab-item>
        <LikeCar />
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import CarLineup from "./CarLineup.vue"
import KintoCar from "./KintoCar.vue"
import LikeCar from "./LikeCar.vue"
export default {
  components: {
    CarLineup,
    KintoCar,
    LikeCar
  },
  data () {
    return {
      tab: null,
      items: ["人気ランキング", "KINTO専用車"],
    }
  },
}
</script>

<style lang="scss" scoped>
  @use "../../../../style/foundation/global" as g;
  .tab {
    color: #2C353B;
  }

::v-deep {
  .v-tab {
    font-size: 14px;
    @include g.mq {
      font-size: 16px;
    }
  }

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
