<template>
  <div class="index_common_container news_container">
    <div class="news_hdg">
      <Heading hdg="お知らせ" />
    </div>
    <div class="news_inner">
      <ul class="news_list">
        <li
          v-for="(item, index) in news_data"
          :key="index">
          <div class="news_item">
            <span>{{ item.pubDate.slice(0,10) }}</span>
            <a
              :href="item.link"
              target="_blank">
              <p>{{ item.title }}</p>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import Heading from "../components/Heading.vue"
export default {
  components: {
    Heading
  },
  data() {
    return {
      news_data: [],
      toJSON: "https://api.rss2json.com/v1/api.json?rss_url=",
      service: "https://about.kinto-jp.com/m/m770073954f17/rss",
      media: "https://about.kinto-jp.com/m/md27cbd72fc5c/rss"
    }
  },
  mounted() {
    const self = this
    function service_get() {
      return axios.get(`${self.toJSON}${self.service}`)
    }
    function media_get() {
      return axios.get(`${self.toJSON}${self.media}`)
    }
    Promise.all([service_get(), media_get()])
      .then(function (res) {
        let toArr = []
        const servicedata =res[0].data.items
        const mediadata = res[1].data.items
        const addArray = toArr.concat(servicedata, mediadata)
        addArray.sort(function(a, b){
          return a > b ? 1 : -1
        })
        self.news_data = addArray
        console.log(self.news_data)
      })
  }
}
</script>

<style lang="scss" scoped>
@use "../../../../style/system/foundation/global" as g;
.news_container {
  margin-bottom: 150px;
  padding: 0 24px;
  padding-top: 100px;
  @include g.mq {
    padding: 0;
    padding-top: 100px;
  }
  &:after {
    position: absolute;
    top: 0;
    left: 24px;
    width: 174px;
    height: 63px;
    content: "";
    background: url(/assets/img/index/news/bg_news.svg) top left no-repeat;
    z-index: -1;
    background-size: contain;
    @include g.mq {
      width: 465px;
      left: 120px;
      height: 187px;

    }
  }

  .news_hdg {
    text-align: center;
    margin: 0 auto;
    margin-bottom: 32px;
  }

  .news_inner {
    margin: 0 auto;
    width: 100%;
    max-width: 880px;
    overflow: scroll;
    max-height: 304px;
    border: 2px solid #00708D;
    border-radius: 5px;
    position: relative;
    background: #fff;
    &:before {
      content: "";
      display: block;
      z-index: -1;
      position: absolute;
      top: 20px;
      left: 20px;
      background: #27BDC9;
      width: calc(100% + 20px);
      height: calc(100% + 20px);
      border-radius: 5px;
    }
  }

  .news_list {
    padding: 32px 16px;
    height: auto;
    min-height: 400px;
    @include g.mq {
      padding: 40px;
    }
    .news_item {
      display: flex;
      margin-bottom: 24px;
      font-size: 16px;
      flex-direction: column;
      @include g.mq {
        flex-direction: row;
      }
      span {
        width: 100%;
        font-weight: bold;
        display: inline-block;
        @include g.mq {
          margin-right: 24px;
          width: 120px;
        }
      }

      a {
        color: #00708D;
        line-height: 1.6;
        text-decoration: none;
      }
    }

  }

}
</style>
