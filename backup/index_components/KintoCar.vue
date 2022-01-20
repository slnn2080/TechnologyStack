<template>
  <div class="carousel-wrapper">
    <div class="carousel-car">
      <ul
        data-carousel="list"
        class="list">
        <li
          v-for="(item, index) in results"
          ref="thiscar"
          :key="index"
          class="item">
          <div class="carousel-car-inner">
            <div class="car-image">
              <div class="image-block">
                <img
                  :src="item.imagePath"
                  :alt="item.name">
              </div>
            </div>
            <div class="carousel-car-detail">
              <div class="description">
                <h3 class="carname">
                  {{ item.name }}
                </h3>
                <p class="delivdate">
                  納車目処：{{ item.deliveryDateComment }}
                </p>
                <p class="price">
                  <span class="prefix">月額</span>
                  <span class="price-number">
                    {{ item.yearmax_bonusmax_taxin }}
                    <span class="price-notice">※1</span>
                  </span>
                  <span class="prefix:end">円〜</span>
                </p>
                <p class="notice">
                  ※1 初期費用フリープラン7年ボーナス併用払いの金額
                </p>
              </div>
              <div class="cv-area">
                <v-btn
                  class="button:light touchpoint-btn"
                  :href="`${item.linkUrl}`">
                  初期費用フリープランで見積り
                </v-btn>

                <v-btn
                  class="button:light"
                  :href="`${item.linkUrl}`">
                  解約金フリープランで見積り
                </v-btn>
                <div class="if">
                  <p class="if-text">
                    <span>または</span>
                  </p>
                  <v-btn
                    class="button:normal"
                    :href="`${item.linkUrl}`">
                    すべてのラインアップを見る
                  </v-btn>
                  <a
                    href="#"
                    class="company">法人のお客様はこちらへ</a>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
      <div class="nav">
        <div class="nav_btn">
          <div class="btn swiper-button-prev slide-prev" />
          <div class="btn swiper-button-next slide-next" />
        </div>
        <div
          class="like"
          @click="setCar()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"><rect
              width="24"
              height="24"
              fill="none" /><path
                d="M35.586,18.54a.55.55,0,0,0-.533.424.015.015,0,0,1-.03,0,.55.55,0,0,0-.534-.424.571.571,0,0,0-.1.009.549.549,0,0,0-.439.433.556.556,0,0,0,.146.5h0l0,0,0,0,.823.837a.156.156,0,0,0,.223,0l.823-.837,0,0,0,0h0a.556.556,0,0,0,.146-.5.549.549,0,0,0-.439-.433.572.572,0,0,0-.1-.009Z"
                transform="translate(-23.037 -6.954)"
                fill="#f9897d"
                opacity="0.997" /><line
                  x2="1"
                  transform="translate(15 12)"
                  fill="none"
                  stroke="#f9897d"
                  stroke-linecap="round"
                  stroke-width="1" /><line
                    x2="1"
                    transform="translate(14.027 13.946) rotate(45)"
                    fill="none"
                    stroke="#f9897d"
                    stroke-linecap="round"
                    stroke-width="1" /><line
                      x2="1"
                      y2="1"
                      transform="translate(8.794 8.429)"
                      fill="none"
                      stroke="#f9897d"
                      stroke-linecap="round"
                      stroke-width="1"
                      opacity="0.001" /><line
                        x2="1"
                        transform="translate(12 14.857) rotate(90)"
                        fill="none"
                        stroke="#f9897d"
                        stroke-linecap="round"
                        stroke-width="1" /><line
                          x2="1"
                          transform="translate(9.972 13.946) rotate(135)"
                          fill="none"
                          stroke="#f9897d"
                          stroke-linecap="round"
                          stroke-width="1" /><g
                            transform="translate(10 10)"
                            fill="none"
                            stroke="#f9897d"
                            stroke-width="1"><circle
                              cx="2"
                              cy="2"
                              r="2"
                              stroke="none" /><circle
                                cx="2"
                                cy="2"
                                r="1.5"
                                fill="none" /></g><line
                                  y2="1"
                                  transform="translate(12 9) rotate(180)"
                                  fill="none"
                                  stroke="#f9897d"
                                  stroke-linecap="round"
                                  stroke-width="1" /><line
                                    x2="1"
                                    transform="translate(9 11.8) rotate(180)"
                                    fill="none"
                                    stroke="#f9897d"
                                    stroke-linecap="round"
                                    stroke-width="1" /><line
                                      y2="1"
                                      transform="translate(9.972 9.429) rotate(135)"
                                      fill="none"
                                      stroke="#f9897d"
                                      stroke-linecap="round"
                                      stroke-width="1" /><line
                                        y1="1"
                                        transform="translate(14.381 9.429) rotate(-135)"
                                        fill="none"
                                        stroke="#f9897d"
                                        stroke-linecap="round"
                                        stroke-width="1" /><path
                                          d="M49.384,18.54a5.158,5.158,0,0,0-5.006,3.975.144.144,0,0,1-.283,0,5.16,5.16,0,0,0-5.007-3.975,5.356,5.356,0,0,0-.925.081,5.153,5.153,0,0,0-4.122,4.068,5.214,5.214,0,0,0,1.372,4.666h0l.019.018.034.035,7.727,7.852a1.464,1.464,0,0,0,2.089,0l7.726-7.851.037-.037.018-.018h0a5.215,5.215,0,0,0,1.373-4.666,5.155,5.155,0,0,0-4.122-4.068,5.369,5.369,0,0,0-.927-.081Z"
                                          transform="translate(-32.236 -15.12)"
                                          fill="#fff" /><path
                                            d="M51.94,7.234a4.073,4.073,0,0,1,.733.069,4.123,4.123,0,0,1,3.187,3.307,4.423,4.423,0,0,1-1.069,3.849l-.141.153L45.94,23.9l-8.7-9.279-.153-.165a4.419,4.419,0,0,1-1.069-3.849A3.963,3.963,0,0,1,39.94,7.234a4.041,4.041,0,0,1,3.889,3.249c.235,1.035,1.1,2.549,2.111,2.549s1.877-1.515,2.111-2.548A4.042,4.042,0,0,1,51.94,7.234m0-2.1A6.082,6.082,0,0,0,46.105,10a.167.167,0,0,1-.329,0A6.084,6.084,0,0,0,39.94,5.134a5.954,5.954,0,0,0-1.079.1,6.158,6.158,0,0,0-4.8,4.978,6.593,6.593,0,0,0,1.6,5.711h0l.023.022.04.043,9.005,9.61a1.65,1.65,0,0,0,2.435,0l9.005-9.608.043-.045.021-.022h0a6.594,6.594,0,0,0,1.6-5.711,6.156,6.156,0,0,0-4.8-4.977,5.849,5.849,0,0,0-1.08-.1Z"
                                            transform="translate(-33.94 -3.134)"
                                            fill="#2c353b"
                                            opacity="0.4" /></svg>
        </div>
        <div
          class="nav_num"
          data-carousel="nav" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
const url = "/assets/json/cardata.json"
const deliverydateJsonPath = process.env.NODE_ENV === "development"
  ? "/assets/json/deliverydate.json"
  : "/customer/assets/static/s3data/jsondata/deliverydate.json"
import Carousel from "../../../modules/Carousel"
export default {

  data() {
    return {
      results: []
    }
  },
  watch: {
    results() {
      this.$nextTick(() => {
        // カルーセル実行
        new Carousel({
          target: {
            container: ".carousel-car",
            list: ".list",
            item: ".item",
          },
          options: {
            centeredSlides: true,
            slidesPerView: 4,
            loopAdditionalSlides: 1,
            loop: true,
            spaceBetween: 64,
            // breakpoints: {
            //   835: {
            //     spaceBetween: 24,
            //   },
            //   1024: {
            //     spaceBetween: 24
            //   }
            // },
            navigation: {
              nextEl: ".slide-next",
              prevEl: ".slide-prev",
            },
            pagination: {
              type: "fraction",
              el: "[data-carousel='nav']",
              renderFraction: function (currentClass, totalClass) {
                return (
                  "<span class=\"" + currentClass + "\"></span>" + " / <span class=\"" +
                  totalClass + "\"></span>")
              },
            },
            // pagination: false,
          },
        })
      })
    },
  },
  mounted() {
    let self = this
    function carGet() {
      return axios.get(url)
    }
    function delivGet() {
      return axios.get(deliverydateJsonPath)
    }
    Promise.all([carGet(), delivGet()])
      .then(function (res) {
        const morizo = res[0].data.filter((i) => i.car_model_english_name === "gryarisms")
        const kts = res[0].data.filter((i) => i.car_model_english_name === "ktsyaris")
        const kintocar = morizo.concat(kts)
        const delivData = res[1].data.data
        console.log(kintocar)

        let carMaster = kintocar.map(item => ({
          ...delivData.find(({ car_model_code }) => item.car_model_code == car_model_code),
          ...item,
        }))
        console.log(carMaster)

        self.results = carMaster
      })
    function getCarSet() {
      const alreadyLikeString = localStorage.getItem("likecar")
      if (alreadyLikeString !== null) {
        let toArr = []
        const alreadyLikeArray = JSON.parse(alreadyLikeString)
        const addArray = toArr.concat(alreadyLikeArray)
        self.setArray = addArray
      }
    }
    getCarSet()
  },

  methods: {
    setCar() {
      // 追加する値
      const likecar = this.$refs.thiscar.filter(i => i.classList.contains("swiper-slide-active"))
      const likecarData = likecar[0].dataset.car
      // 既存の値があれば条件分岐
      if (!JSON.stringify(this.setArray).includes(likecarData)) {
        this.setArray.push(likecarData)
        localStorage.setItem("likecar", JSON.stringify(this.setArray))
      } else {
        // ある値をもってたら削除
        const currentRemoveItem = this.setArray.filter(i => i!=likecarData)
        this.setArray = currentRemoveItem
        localStorage.setItem("likecar", JSON.stringify(this.setArray))
      }

    }
  }

}
</script>

<style lang="scss" scoped>
@use "../../../../../node_modules/swiper/swiper.scss";

.carousel-wrapper {
  width: 100%;
  // max-width: 1440px;
  margin: 0 auto;
}

.carousel-car {
  position: relative;
}
.item {
  // max-width: 288px;
  // transform: scale(1);
  transition: 1s ease-out transform;
  &:before {
    opacity: 0;
  }
  .carousel-car-detail {
    opacity: 0;
    visibility: hidden;
    transition: .2s ease-out opacity;
    text-align: left;
  }
  .car-image {
    margin: 0 auto;
    position: relative;
    display: block;

    .image-block  {
      img {
        transform: scale(.7);
        height: auto;
      }
      transform-origin: center top;
      position: relative;
      &:before {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        z-index: 1;
        content: "";
        display: block;
        background: #EEEFF0;
        width: 288px;
        height: 59px;
        border-radius: 100%;
      }
    }
    // width: 85%;
    // width: 513px;
    img {
      position: relative;
      z-index: 2;
      // transform: scale(.63);
      // transform: scale(2.4);
      // transform-origin: center bottom;
      width: 100%;
    }
  }

  &.swiper-slide-active {
    transform: translateY(80px);
    // .carousel-car-detail {
    //   min-width: 680px;
    // }
    .carousel-car-detail {
      opacity: 1;
      width: 680px;
      visibility:visible;
      margin-left: -200px;
      margin-top: 80px;
    }
    .car-image {

     .image-block {
        // transform: scale(1);
        transform-origin: center bottom;
        position: relative;

        img {
          transform: scale(1.2);
        }
        &:before {
          position: absolute;
          left: 50%;
          bottom: 0;
          transform: translateX(-50%);
          z-index: 1;
          content: "";
          display: block;
          background: #1EB6C6;
          width: 600px;
          height: 121px;
          opacity: .2;
          border-radius: 100%;
        }
      }

    }

  }

  &.swiper-slide-next,
  &.swiper-slide-prev {
    transform: translateY(40px);
    .image-block {
      position: relative;
      img {
        transform: scale(.8);
      }
      &:before {
        position: absolute;
        left: 50%;
        bottom: 10px;
        transform: translateX(-50%);
        z-index: 1;
        content: "";
        display: block;
        background: #EEEFF0;
        width: 288px;
        height: 59px;
        border-radius: 100%;
      }
    }
  }

  &.swiper-slide-prev {
     transform: translateY(40px) translateX(-24%);
  }
  &.swiper-slide-next {
     transform: translateY(40px) translateX(24%);
  }

  .carousel-car-inner {
    img {
      width: 100%;
    }

    .carousel-car-detail {
      display: flex;
    }
    .description {
      width: 50%;
      .carname {
        font-size: 32px;
        font-weight: bold;
      }
      .delivdate {
        font-size: 18px;
      }

      .price {
        vertical-align: baseline;
      }
      .notice {
        font-size: 12px;
      }
      .price-number {
        font-size: 48px;
        position: relative;
        line-height: 1;
        .price-notice {
          position: absolute;
          top: 25px;
          right: -12px;
          font-size: 12px;

        }
      }
      .prefix {
        font-size: 21px;
      }
    }

    .cv-area {
      width: 50%;
    }
  }
}
</style>
<style>
.touchpoint-btn {
  margin-bottom: 0 !important;
}
</style>
