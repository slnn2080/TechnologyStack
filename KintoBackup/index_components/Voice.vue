<template>
  <div class="p-index_voice_container">
    <div class="p-index_voice_inner">
      <div class="p-index_voice_list_inner">
        <Heading
          hdg="みんなに聞いてみよう"
          class="voice_hdg" />
        <ul class="p-index_voice_lists">
          <li
            v-for="(voice, index) of voice_list"
            :key="index">
            <picture>
              <source
                :srcset="`/assets/img/index/voice/icon_voice_0${index+1}.png`"
                media="(max-width: 834px)">
              <source
                :srcset="`/assets/img/index/voice/icon_voice_0${index+1}.png 1x, /assets/img/index/voice/icon_voice_0${index+1}@2x.png 2x`"
                media="(min-width: 835px)">
              <img
                :src="`/assets/img/index/voice/icon_voice_0${index+1}.png`"
                :alt="voice"
                loading="lazy"
                width="72"
                height="72">
            </picture>
            <p
              class="text"
              v-html="voice" />
          </li>
        </ul>
        <div class="button_common_container">
          <v-btn
            class="button:light"
            href="https://magazine.kinto-jp.com/voc?_ga=2.230762143.1689081413.1637138617-315513332.1635249732&_gl=1*iyz59b*_ga*MzE1NTEzMzMyLjE2MzUyNDk3MzI.*_ga_ECCTV2RF6P*MTYzNzIyNTI0OC42NC4xLjE2MzcyMjUyNTMuNTU.">
            お客様の声を見る
          </v-btn>
        </div>
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
      voice_list: ["全てコミコミWEBで<br>完結できるなんて最高だよ", "クルマのこと全然分からない<br>私でも新車に乗れるKINTOで即決"]
    }
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/system/foundation/global" as g;
.p-index_voice_container {
  background: url(/assets/img/index/voice/bg_voice_sp.jpg) top left no-repeat;
  background-size: cover;
  @include g.mq {
  background: url(/assets/img/index/voice/bg_voice.jpg) top left no-repeat;
  background-size: cover;
  }

  .p-index_voice_list_inner {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    color: #fff;
    padding-top: 137vw;
    padding-bottom: 20vw;
    @include g.mq {
    padding-top: 35%;
    padding-bottom: 170px;
    }
  }

  .p-index_voice_lists {
    margin-top: 32px;
    padding: 0 16px;
    @include g.mq {
      padding: 0;
    }
    li {
      display: flex;

      .text {
        border-radius: 10px;
        padding: 18px 25px 25px 25px;
        text-align: center;
        line-height: 1.6;
        background: #fff;
        color: #1B809F;
        position: relative;
        margin-right: 0;
        margin-left: 40px;
        &:after {
          content:"";
          width: 0;
          height: 0;
          border-style: solid;
          border-width: 24px 0 24px 32px;
          border-color: transparent transparent transparent #ffffff;
          position: absolute;
          top: 50%;
          transform: translateY(-50%) rotate(180deg);
          right: auto;
          left: -32px;
          display: block;
        }
      }

      &:nth-child(odd) {
        flex-direction: row-reverse;
        .text {
          margin-left: 0;
          margin-right: 40px;
          &:after {
            transform: translateY(-50%);
            right: -32px;
            left:auto;
          }
        }
      }
    }
  }
}

::v-deep {
  .voice_hdg {
    .hdg {
      text-align: center;
      color: #fff;
    }
  }
}
</style>
