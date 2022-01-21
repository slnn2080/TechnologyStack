<template>
  <div class="offers-wrap">
    <div class="offers-title">
      <picture>
        <source
          srcset="/assets/img/index/offers/offers_tilte_sp.png"
          media="(max-width: 750px)">
        <source
          srcset="/assets/img/index/offers/offers_tilte_pc.png 1x, /assets/img/index/offers/offers_tilte_pc@2x.png 2x"
          media="(min-width: 751px)">
        <img srcset="/assets/img/index/offers/offers_tilte_pc.png">
      </picture>
      <div class="offiser_title">
        <Heading hdg="KINTO ONEなら<br class='is-sp' />うれしい特典も！" />
      </div>
    </div>

    <div class="offers-container offers-inner">
      <div
        v-for="(item, index) in offersData"
        :key="index">
        <div
          v-if="item.category === 1"
          class="title hidden merge1">
          <h3>ご利用者</h3>
        </div>
        <div
          v-else-if="item.category === 2"
          class="title hidden merge2 cyan">
          <h3>検討中・ご利用者</h3>
        </div>
        <div
          v-else-if="item.category === 3"
          class="title hidden green">
          <h3>検討中</h3>
        </div>
        <a
          class="item"
          :href="item.link">
          <div class="pic">
            <picture>
              <source
                :srcset="`/assets/img/index/offers/offers_pic_${item.img}_sp.jpg`"
                media="(max-width: 750px)">
              <source
                :srcset="`/assets/img/index/offers/offers_pic_${item.img}_pc.jpg 1x, /assets/img/index/offers/offers_pic_${item.img}_pc@2x.jpg 2x`"
                media="(min-width: 751px)">
              <img :srcset="`/assets/img/index/offers/offers_pic_${item.img}_pc.jpg`">
            </picture>
            <span
              v-if="item.caption !== ''"
              class="caption"
              v-html="item.caption" />
          </div>
          <div
            v-if="item.category === 1"
            class="tag">
            <span class="blue">ご利用者</span>
          </div>
          <div
            v-else-if="item.category === 2"
            class="tag">
            <span class="cyan">検討中・ご利用者</span>
          </div>
          <div
            v-else-if="item.category === 3"
            class="tag">
            <span class="green">検討中の方</span>
          </div>
          <p v-html="item.text" />
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
      offersData: [
        {
          link: "#",
          category: 1,
          img: "mobima",
          caption: "",
          text: "KINTO ONEのクルマで出かけよう! 30,000円相当のポイントプレゼント"
        },
        {
          link: "#",
          category: 1,
          img: "warikan",
          caption: "",
          text: "仲間でKINTO ONEをシェアするのに便利なアプリ"
        },
        {
          link: "#",
          category: 2,
          img: "mykinto",
          caption: "MY KINTO",
          text: "無料のメンバー会員専用ページ。<br>お得情報＆お役立ちコンテンツが満載。"
        },
        {
          link: "#",
          category: 3,
          img: "campaign",
          caption: "",
          text: "おトクで楽しいキャンペーン随時実施中"
        },
        {
          link: "#",
          category: 2,
          img: "area",
          caption: "おすすめサービス・イベント特集<br>エリア限定・販売店",
          text: "仮テキスト仮テキスト仮テキスト仮テキスト"
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/foundation/global" as g;
.offers-wrap {

  .offers-title {
    width: 100%;
    margin-bottom: 40px;
    position: relative;
    z-index: -1;

    img {
      width: 100%;
      height: auto;
    }
  }

  .offers-inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1224px;
    padding: 0px 16px;

    @include g.mq {
      padding: 0px;
    }
  }

  .offers-container {
    display: flex;
    flex-wrap: wrap;
    margin-top: -40vw;
    flex-direction: column;
    @include g.mq {
      display: flex;
      flex-direction: row;
    }
    > div {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      margin-bottom: 24px;

      @include g.mq  {
        display: block;
        width: 32%;
        max-width: 392px;
        margin-right: 24px;
        margin-bottom: 40px;
      }

      &:nth-child(3n) {
        margin-right: 0;
      }
    }

    .title {
      background-color: #00708D;
      padding: 0px 6px;
      color: #fff;
      text-align: center;
      border-radius: 2px;
      width: 24px;
      display: flex;
      align-items: center;

      h3 {
        font-size: 12px;
      }
    }

    .merge1 {
    }
    .merge2 {

    }

    .item {
      text-decoration: none;
      display: block;
      @media screen and (max-width:750px) {
        width: calc(100% - 32px);
      }
      p {
        color: #2C353B;
        text-decoration: none;
        margin-top: -10px;
        font-size: 14px;

        @include g.mq {
          margin-top: 0px;
          font-size: 16px;

        }
      }

      .tag {
        display: none;

        span {
          display: inline-block;
          border-radius: 4px;
          padding: 6px 16px;
          color: #fff;
          margin:0px 10px 16px;
          font-size: 14px;
        }

        @include g.mq {
          display: block;
        }
      }

      .pic {
        position: relative;
        border-radius: 8px;
        box-shadow: -4px 2px 20px -12px rgba(0, 0, 0, 0.58);
        overflow: hidden;
        margin-bottom: 10px;
        @include g.mq {
          box-shadow: 10px;
        }

        .caption {
          position: absolute;
          bottom: 24px;
          left: 20px;
          z-index: 2;
          font-size: 14px;
          color: #fff;
          @include g.mq {
            font-size: 16px;
          }
        }
        img {
          width: 100%;
          vertical-align: top;
          height: auto;
          z-index: 1;
          position: relative;
        }
      }
    }

    .blue {
      background: #1b809f;
    }

    .cyan {
      background-color: #27BDC9;
    }

    .green {
      background-color: #16C9B2;
    }

    @include g.mq {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      margin-top: -29vw;

      &::after {
        content: "";
        width: 31.5%;
      }

      .hidden {
        display: none;
      }
    }
  }
}

@include g.mq {
  .hidden {
    display: none;
  }
}

::v-deep {
  .offiser_title {
    width: 100%;
    position: absolute;
    top: 24%;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 1.5;

    .hdg {
      font-size: 6.4vw;
      font-weight: bold;
      color: #fff;

      @include g.mq {
        font-size: 2.4vw;
        bottom: 1.8vw;
      }
    }

  }
}

</style>
