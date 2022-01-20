<template>
  <div class="feature-wrap">
    <div class="feature-title">
      <picture>
        <source
          srcset="/assets/img/index/feature/feature_tilte_sp.png"
          media="(max-width: 750px)">
        <source
          srcset="/assets/img/index/feature/feature_tilte_pc.png 1x, /assets/img/index/feature/feature_tilte_pc@2x.png 2x"
          media="(min-width: 751px)">
        <img srcset="/assets/img/index/feature/feature_tilte_pc.png">
      </picture>
      <!-- <div>
        <h3>自慢のオールインワン</h3>
      </div> -->
      <div class="feature_text_hdg">
        <Heading hdg="自慢のオールインワン" />
      </div>
    </div>
    <FeatureItem
      v-for="item in itemList"
      :key="item.id"
      :item-data="item" />
    <div class="feature-btn">
      <div class="button_common_container features_button">
        <v-btn
          class="button:normal"
          href="#">
          すべてのラインアップを見る
        </v-btn>
      </div>
      <div class="button_common_container features_button">
        <v-btn
          class="button:light cvbutton"
          href="#">
          サービス内容
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import FeatureItem from "./FeatureItem.vue"
import Heading from "./Heading.vue"
export default {
  name: "Feature",
  components: {
    FeatureItem,
    Heading
  },
  data() {
    return {
      imgBaseURL: "/assets/img/index/feature/",
      itemList: [
        {
          id: 1,
          title: "理想的なスタート",
          list: ["複雑な手続きは気にしなくてOK", "ラインアップは新車ばかり"],
          img: "feature_list_01",
          reverse: false
        },
        {
          id: 2,
          title: "魅力的な月々定額",
          list: ["税金&保険&メンテナンス<br />クルマに必要な費用がコミコミ", "急な出費がなく安心"],
          img: "feature_list_02",
          reverse: true,
          wrap: true,
        },
        {
          id: 3,
          title: "安心してドライブ",
          list: ["充実すぎる、自動車保険", "メンテナンスは正規店が実施"],
          img: "feature_list_03",
          reverse: false
        },
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/foundation/global" as g;

.feature-wrap {
  letter-spacing: 0.025rem;
  color: #2C353B;

  .feature-inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1224px;
    padding: 0px 16px;
    background-color: #eee;

    @include g.mq {
      padding: 0px 80px;
    }
  }

  .feature-title {
    width: 100%;
    margin-bottom: 40px;
    position: relative;

    img {
      width: 100%;
      height: auto;
    }
  }

  .feature-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    margin: 40px 0 115px;

    @include g.mq {
      margin: 40px auto 115px;
      flex-direction: row;
      font-size: 18px;
    }
  }
}

::v-deep {
  .feature_text_hdg {
    .hdg {
      width: 100%;
      font-size: 6.4vw;
      font-weight: bold;
      text-align: center;
      position: absolute;
      bottom: 4.5vw;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;

      @include g.mq {
        font-size: 2.4vw;
        bottom: 1.8vw;
      }
    }
  }

  .features_button {
    @include g.mq {
      margin: 0 12px;
    }
  }

}

</style>
