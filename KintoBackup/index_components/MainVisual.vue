<template>
  <div class="mainvisual-container">
    <div class="mainvisual-inner">
      <v-carousel
        v-model="model"
        :cycle="false"
        :interval="4000"
        :show-arrows="false"
        transition="fade-transition"
        height="auto">
        <v-carousel-item
          v-for="(item, i) in carousel"
          :key="i">
          <div class="item">
            <a
              v-if="item.target !== 0"
              :href="item.link"
              target="_blank"
              rel="noopener">
              <picture>
                <source
                  media="(max-width:750px)"
                  :srcset="`${relativePath}kv_0${i+1}_sp.jpg`">
                <source
                  media="(min-width:751px)"
                  :srcset="`${relativePath}kv_0${i+1}.png x1 , ${relativePath}kv_0${i+1}@2x.png x2`">
                <img
                  :src="`${relativePath}kv_0${i+1}.png`"
                  :alt="item.alt">
              </picture>
            </a>
            <a
              v-else
              :href="item.link">
              <picture>
                <source
                  media="(max-width:750px)"
                  :srcset="`${relativePath}kv_0${i+1}_sp.jpg`">
                <source
                  media="(min-width:751px)"
                  :srcset="`${relativePath}kv_0${i+1}.png x1 , ${relativePath}kv_0${i+1}@2x.png x2`">
                <img
                  :src="`${relativePath}kv_0${i+1}.png`"
                  :alt="item.alt">
              </picture>
            </a>
          </div>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>

export default {
  /**
   * カルーセルコンポーネント
   * @typedef {Object|Strings} Props
   * @return {Object|Strings}
   * @description targetの 0||1 でtarget属性をつけたりつけなかったりしています
   */
  data() {
    return {
      model: 0,
      relativePath: "/assets/img/index/mainvisual/",
      carousel: [
        {
          link: "#",
          target: 0,
          alt: "hogehoheg"
        },
        {
          link: "#",
          target: 1,
          alt: "hogehoheg"
        },
        {
          link: "#",
          target: 1,
          alt: "hogehoheg"
        },
      ]
    }
  },

}
import "../../../../../node_modules/vuetify/dist/vuetify.css"
</script>

<style lang="scss" scoped>

.mainvisual-container {
  display: block;

  .mainvisual-inner {
    .item {
      a {
        display: block;
      }

      img {
        width: 100%;
      }
    }
  }
}

::v-deep {
  .v-carousel__controls {
    background: none;
    height: auto;
    bottom: 40px;
  }

  .v-btn--icon {
    width: 10px;
    height: 10px;
  }
  .v-btn {
    width: 10px;
    height: 10px;
    background: #fff;
    margin: 0 8px;
    opacity: .7;
    &:after {
      display: none;
    }

    &--active {
      opacity: 1;
      width: 40px;
      border-radius: 10px;
    }
  }
}
</style>
