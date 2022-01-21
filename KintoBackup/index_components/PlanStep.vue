<template>
  <div class="planstep_container">
    <div class="planstep_inner">
      <div class="plan_hdg">
        <Heading hdg="ニーズにあわせて選べる<br>２つのプラン" />
      </div>
      <div class="plan_item_container">
        <div class="plan_item_inner">
          <div
            v-for="(item, index) in plans"
            :key="index"
            class="plan_item">
            <h3 class="hdg">
              {{ item.title }}
            </h3>
            <figure class="plan_icon">
              <img
                :src="`/assets/img/index/planstep/icon_plan_0${index+1}.svg`"
                :alt="item.title">
            </figure>
            <p class="plan_text">
              {{ item.text }}
            </p>
          </div>
        </div>
        <div class="button_common_container">
          <v-btn
            class="button:light"
            href="plan">
            プラン内容
          </v-btn>
        </div>
      </div>
      <div class="step_item_container">
        <span class="step_en_caption">
          <img
            src="/assets/img/index/planstep/bg_steps.svg"
            alt="STEPS"
            width="408"
            height="97">
        </span>
        <div class="step_hdg">
          <Heading hdg="わくわく納車までの流れ" />
        </div>
        <div class="step_item_inner">
          <div
            v-for="(item, index) in steps"
            :key="index"
            class="step_item">
            <figure class="step_icon_num">
              <img
                :src="`/assets/img/index/planstep/icon_step_num_0${index+1}.svg`"
                :alt="`${index+1}`">
            </figure>
            <h3
              class="step_title"
              v-html="item.title" />
            <figure class="step_icon">
              <img
                :src="`/assets/img/index/planstep/icon_step_0${index+1}.svg`"
                :alt="item.title">
            </figure>
            <div
              class="step_text">
              <h3
                class="sp-only"
                v-html="item.title" />
              <p
                v-if="index < 2"
                v-html="item.text" />
            </div>
          </div>
        </div>
        <div class="button_common_container">
          <v-btn
            class="button:normal"
            href="plan">
            マイカーを探す
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Heading from "../components/Heading.vue"
export default {
  components: {
    Heading
  },
  data() {
    return {
      plans: [
        {
          title: "初期費用フリープラン",
          text: "初期費用0円で手軽。ライフスタイルの変化に合わせた車の乗り換えがOK"
        },
        {
          title: "解約金フリープラン",
          text: "短期間利用でも安心の解約料0円。さらに、継続利用で月額が最大30%OFF"
        }
      ],
      steps: [
        {
          title: "乗りたい車を選ぶ&見積り",
          text: "プランとグレードやカラー、<br>オプションを選びます。"
        },
        {
          title: "審査申し込み・契約",
          text: "審査に必要な情報を入力。<br>免許証の画像が必要です。"
        },
        {
          title: "必要書類の提出",
          text: "販売店から車両登録に関する書類が届きます。本人確認書類が必要です。"
        },
        {
          title: "販売店で<br>マイカーを受け取り",
          text: null,
        }
      ]
    }
  }
}

</script>

<style lang="scss" scoped>
@use "../../../../style/system/foundation/global" as g;

.planstep_container {
  margin-bottom: 32px;
  background: url(/assets/img/index/planstep/bg_planstep_sp.png) top center no-repeat;
  background-size: cover;
  width: 100%;
  padding: 0 8px;
  padding-top: 13vw;
  @include g.mq {
    background: url(/assets/img/index/planstep/bg_planstep.png) top center no-repeat;
    background-size: cover;
    padding: 0;
    padding-top: 133px;
  }

  .planstep_inner {
    max-width: 1224px;
    margin: 0 auto;
    width: 100%;
  }
}

.plan_item_container {
  margin-bottom: 64px;
  @include g.mq {
    margin-bottom: 120px;
  }
}
.plan_item_inner {
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

}
.plan_item {
  background: #fff;
  border-radius: 5px;
  text-align: center;
  width: 47%;
  padding: 24px 8px;
  margin: 0 8px;
  @include g.mq {
    padding: 25px 63px;
    width: 392px;
    margin: 0 12px;

  }

  .plan_icon {
    margin-bottom: 24px;
    @include g.mq {
      margin-right: 0;
    }
    img {
      max-width: 100%;
    }
  }

  .hdg {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 20px;
    color: #1B809F;
    @include g.mq {
      font-size: 24px;
    }
  }
  .plan_text {
    font-size: 12px;
    text-align: left;
    color: #707070;
    @include g.mq {
      font-size: 16px;
    }
  }
}
::v-deep {
  .plan_hdg {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 32px;
    .hdg {
      color: #fff;
    }
  }
  .step_hdg {
    margin: 0 auto;
    text-align: center;
    margin-bottom: 56px;
    .hdg {
      color: #fff;
    }
  }
}

.step_item_container {
  padding-bottom: 144px;

  .step_en_caption {
    margin: 0 auto;
    display: block;
    text-align: center;
    margin-bottom: 8px;
    width: 59%;
    @include g.mq {
      width: 408px;
    }
    img {
      width: 100%;
      height: auto;
    }

  }

  .step_item_inner {
    display: flex;
    justify-content: space-between;
    margin-bottom: 32px;
    flex-direction: column;
    @include g.mq {
      flex-direction: row;
    }

    .step_item {
      height: auto;
      width: 100%;
      max-width: auto;
      background: #fff;
      border-radius: 5px;
      padding: 20px 16px;
      position: relative;
      display: flex;
      align-items: center;
      flex-direction: row;
      margin-bottom: 24px;
      @include g.mq {
        height: 232px;
        width: 23.25%;
        max-width: 288px;
        padding: 23px 30px;
        margin-bottom: 0;
        flex-direction: column;
        justify-content: space-evenly;
      }
      &:after {
        content: "";
        width: 12px;
        height: 28px;
        display: block;
        background: url(/assets/img/index/planstep/icon_triangle_step.svg) center center no-repeat;
        background-size: contain;
        margin: 0 auto;
        position: absolute;
        bottom: -36px;
        left: 50%;
        transform: translateY(-50%) rotate(90deg);
        @include g.mq {
          bottom: auto;
          top: 50%;
          right: -21px;
        }
      }

      &:last-child {
        &:after {
          display: none;
        }
      }

      .step_icon_num {
        width: 28px;
        margin-right: 16px;
        @include g.mq {
          width: 48px;
          margin-right: 0;
          position: absolute;
          top: -32px;
          margin: 0 auto;
          text-align: center;
        }
        img {
          max-width: 100%;
        }
      }

      .step_icon {
        max-width: 48px;
        margin-right: 16px;
        @include g.mq {
          margin-right: 0;
          max-width: auto;
        }
        img {
          max-width: 100%;
        }
      }

      .step_title {
        display: none;
        @include g.mq {
        font-size: 18px;
        color: #1B809F;
        text-align: center;
        font-weight: bold;
        display: block;

        }
      }
      .step_text {
        font-size: 16px;
        color: #5C717E;
        p {
          font-size: 14px;
        }
      }
      .sp-only {
        display: block;
        font-size: 16px;
        color: #1B809F;
        text-align: left;
        font-weight: bold;
        @include g.mq {
          display: none;
        }
      }
    }
  }
}

</style>
