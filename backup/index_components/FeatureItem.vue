<template>
  <div class="feature-area">
    <div
      class="feature-content"
      :class="{'odd-content':itemData.reverse}">
      <h3>
        <span>{{ itemData.title }}</span>
      </h3>
      <ul class="feature-content__list">
        <li
          v-for="(v, i) in itemData.list"
          :key="i">
          <span>
            <img
              :src="`${imgBaseURL}feature_cursor_sp.png`"
              alt="">
          </span>
          <span
            v-if="itemData.wrap"
            v-html="v" />
          <span v-else>{{ v }}</span>
        </li>
      </ul>
    </div>
    <div
      class="feature-pic"
      :class="{'odd-pic':itemData.reverse}">
      <picture>
        <source
          :srcset="`/assets/img/index/feature/${itemData.img}_sp.png`"
          media="(max-width: 750px)">
        <source
          :srcset="`/assets/img/index/feature/${itemData.img}_pc.png 1x, /assets/img/index/feature/${itemData.img}_pc@2x.png 2x`"
          media="(min-width: 751px)">
        <img :srcset="`/assets/img/index/feature/${itemData.img}_pc.png`">
      </picture>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeatureItem",
  props: {
    itemData: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      imgBaseURL: "/assets/img/index/feature/"
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/foundation/global" as g;
.feature-area {
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;

  @include g.mq {
    flex-direction: row;
    margin-bottom: 0px;
  }

  .feature-content {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @include g.mq {
      width: 50%;
      padding-left: 80px;
      box-sizing: border-box;
    }

    h3 {
      font-size: 20px;
      font-weight: bold;
      text-align: center;

      span {
        border-bottom: 2px solid #21D5BE;
      }

      @include g.mq {
        font-size: 32px;
      }
    }

    &__list {
      font-size: 14px;
      margin: 0 auto;
      padding: 0 40px;

      @include g.mq {
        font-size: 24px;
      }

      li {
        display: flex;
        align-items: flex-start;
        margin: 0 auto 16px;

        @include g.mq {
          margin: 0 auto 24px;
        }

        &:first-child {
          margin-top: 16px;

          @include g.mq {
            margin-top: 40px;
          }
        }

        &:last-child {
          margin-bottom: 24px;
        }

        span:nth-child(1) {
          width: 16px;
          height: 17px;
          margin-right: 8px;
          flex: 0 0 auto;
          padding-top: 3px;

          @include g.mq {
             width: 32px;
            height: 35px;
            padding-top: 6px;
          }

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }
  }

  .feature-pic {
    text-align: right;
    padding-left: 24px;

    @include g.mq {
      width: 50%;
    }

    img {
      width: 100%;
      height: auto;
    }
  }

  .odd-content {
    @include g.mq {
      order: 1;
      padding-left: 0;
      padding-right: 80px;
    }
  }

  .odd-pic {
    padding-left: 0px;
    padding-right: 24px;
    text-align: left;

    @include g.mq {
      padding-left: 0;
    }
  }
}
  
</style>