### import "intersection-observer"
- 导入这些包是为了要解决 IntersectionObserver API 兼容性的问题

> ScrollAnimation.js  -- 监视目标元素
- 该js的用处就是 当目标元素到达进入视口的时候 添加样式 
- 要点:
- 1. 目标元素上要添加: p-selection__index__lineup__cartypehdg
- 2. 要先引入 intersection-observer 包 用来解决兼容性的问题

```js
export default class ScrollAnimation {

  constructor() {
    this.getParam()
    this.eventBind()
  }

  // 获取标记为 p-selection__index__lineup__cartypehdg 的元素
  getParam() {
    this.title = document.querySelectorAll(".p-selection__index__lineup__cartypehdg")
  }

  // 
  eventBind() {
    /**
     * InterSection Observer関連
     */
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("is-show")

          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px",
      threshold: 0,
      root: null,
    })

    /**
     * getParamwで定義したやつをconst observerを回してる
     */
    Array.prototype.forEach.call(this.title, (element) => {
      observer.observe(element)
    })
  }
}

```


> HeightAdjust.js  -- 调整高度
- 调整的是 车种展示区域
- 作用:
- 当在视口小于874的时候 统一图片下方文本区域的高度
```js
export default class HeightAdjust {
  constructor() {
    this.getParam()
    this.eventBind()
  }

  // 获取 li .text-area text-area 下的元素 对象是图片card下方的文本区域
  getParam() {
    this.el = document.querySelectorAll(".p-selection__common__lineup > li .text-area")
  }

  eventBind() {

    // 当屏幕 < 874px 的时候 我们做什么样的逻辑
    if (matchMedia("(max-width: 874px)").matches) {

      // 设置最大的高度
      let elemMaxHeight = 0
      let elemArray = new Array

      // 因为 我们获取的 el是一个类数组 没有forEach方法所以采用的这种格式
      Array.prototype.forEach.call(this.el, (elemChild) => {
        // 先将高度设置为0 然后push每一个元素的高度 但为什么要先将它设置为0呢？
        elemChild.style.height = ""
        elemArray.push(elemChild.clientHeight)
      })

      // 我们往数组里面push里很多高度 选一个最高的 设置为文本区域的高度
      elemMaxHeight = Math.max.apply(null, elemArray)

      Array.prototype.forEach.call(this.el, (elemChild) => {
        elemChild.style.height = elemMaxHeight + "px"
      })
    }
  }
}
```


> commonAnimation.js
- 该js文件依托于 animejs 所以使用之前必须要先引入

- 作用:


- 要点:
- 1. 获取元素 
- 获取目标元素

- 2. 每个目标元素 分别添加不同的动画效果
- 比如我给div1绑定一种动画效果 再给div2绑定一种动画消化 是通过事件来完成的

```js
import anime from "animejs"

export default class commonAnimation {
  constructor() {
    this.getParam()
    this.lineupBind()
    this.commonFadein()
  }

  getParam() {
    this.el = document.querySelectorAll(".p-selection__common__lineup")
    this.fadeinEl = document.querySelectorAll("[data-animation=\"fadein\"]")
  }

  // 相当于给div1 添加动画效果
  lineupBind() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {

          const entryChild = entry.target.querySelectorAll("li")

          // 添加里这种动画效果
          anime({
            targets: entryChild,
            easing: "easeInOutSine",
            duration: 750,
            opacity: 1,
            translateY: ["-5", "0"],
            delay: anime.stagger(300),
          })

          // 不用执行第二次回调所以移除
          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px",
      threshold: 0,
      root: null,

    })

    Array.prototype.forEach.call(this.el, (element) => {
      observer.observe(element)
    })
  }

   // 相当于给div2 添加动画效果
  commonFadein() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {

          anime({
            targets: entry.target,
            easing: "easeInOutSine",
            duration: 750,
            opacity: 1,
            translateY: ["5", "0"],
            delay: anime.stagger(300),
          })

          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px",
      threshold: 0,
      root: null,

    })

    Array.prototype.forEach.call(this.fadeinEl, (element) => {
      observer.observe(element)
    })
  }
}

```


> Accordion.js
- 效果:
- 我们点击标题 就能打开内容的区域
- 比如我们页面上有4个Q 那每一个Q就算是一个item

- 我们看看每一个Q的html结构:

- div data-module="accordion"       -- *一个item的容器里面有 标题区域 和 收起来的文本区域*
    - div data-accordion="toggle"   -- *标题区域 该区域也相当于按钮 点击可展开下面的文本区域*
    - div data-accordion="content"  -- *被隐藏起来的文本区域*

- div data-module="accordion" 上在打开的时候会添加 is-open 样式该类为将原本的内容的透明度有0-1
- div data-accordion="content" 在div data-module="accordion"添加上is-open后 会有maxHeight的高度变化

```js
import ResizeManage from "../util/ResizeManage"

export default class Accordion {

  constructor(isDefaultOpen = false) {
    // 是否默认打开 默认值为false
    this.isDefaultOpen = isDefaultOpen
    this.getParam()
    this.init()
  }

  // 获取 所有的 折叠item项 相当于获取每一个Q
  getParam() {
    this.accordion = document.querySelectorAll("[data-module='accordion']")
    // 设置 折叠起来的内容区的高度 默认是0
    this.contentInit = 0
  }


  init() {
    this.resizeManage = new ResizeManage(835)
    this.bindEvent()
  }


  bindEvent() {
    // 将获取的所有Q伪数组进行遍历
    Array.prototype.forEach.call(this.accordion, (elem) => {

      // 得到 标题区域 和 内容区域
      const acToggle = elem.querySelector("[data-accordion=\"toggle\"]")
      const content = elem.querySelector("[data-accordion=\"content\"]")

      // 设置内容区域的高度 初始值为0
      let contentHeight = this.contentInit


      // 展开 合并 高度
      const toggleHeight = () => {
        // 内容区的高度没有写死 是最大高度 如果内容区和标题区域的容器wrap有is-open 那么就设置告诉为contentInit 没有的话contentHeight
        content.style.maxHeight = acToggle.parentNode.classList.contains("is-open") ? `${this.contentInit}px` : contentHeight

        // 给wrap添加is-open
        acToggle.parentNode.classList.toggle("is-open")
      }

      // 点击时候的时候
      const active = () => {
        const contentPosition = content.getBoundingClientRect()
        // 先看看内容区的告诉是不是 不等于0 如果不等于0的话 就设置内容区的高度为获取的高度
        contentHeight = contentPosition.height != 0 ? `${contentPosition.height}px` : "none"

        // 设置内容区的最大高度
        content.style.maxHeight = `${this.contentInit}px`

        // init
        acToggle.parentNode.classList.remove("is-open")

        // clickイベント
        acToggle.addEventListener("click", toggleHeight)

        // デフォルトOPEN
        if (this.isDefaultOpen) {
          toggleHeight()
        }
      }

      const inactive = () => {
        content.style.maxHeight = "none"
        acToggle.parentNode.classList.add("is-open")
        acToggle.removeEventListener("click", toggleHeight)
      }

      const onResize = (isMobile) => {
        // data-accordion-size 属性が指定されている場合、SPのみ/PCのみで実行する
        if (!isMobile && elem.dataset.accordionSize === "sp") {
          inactive()
        } else if (isMobile && elem.dataset.accordionSize === "pc") {
          inactive()
        } else {
          active()
        }
      }

      // 読み込み時
      onResize(this.resizeManage.isMobile)

      // リサイズ時 リセット
      this.resizeManage.on("resizeManage", () => {
        onResize(this.resizeManage.isMobile)
      })
    })
  }
}

```


> Carousel.js
- 里面包含了 swiper
- swiper要想滚动 比如有指定一个swiper的容器
- 该容器里面有滚动的图片区域 和 导航点等区域

- 回顾下 swiper 的基本结构
```html
<!-- 外层容器 类名: swiper-container -->
<div class="swiper-container">

  <!-- 滚动区域 类名: swiper-wrapper -->
  <div class="swiper-wrapper">

    <!-- item 类名: swiper-slide -->
    <div class="swiper-slide">Slide 1</div>
    <div class="swiper-slide">Slide 2</div>
    <div class="swiper-slide">Slide 3</div>
  </div>

  <!-- 如果需要分页器 -->
  <div class="swiper-pagination"></div>
  
  <!-- 如果需要导航按钮 -->
  <div class="swiper-button-prev"></div>
  <div class="swiper-button-next"></div>
  
  <!-- 如果需要滚动条 -->
  <div class="swiper-scrollbar"></div>
</div>
```

- 要点:
- 1. https://kinto-jp.com/kinto_one/selection/ktsyaris/
- 在上面的网址中 公司将导航点做成了图片

- 2. 公司项目中并没有上来给容器绑定 swiper 需要的各种类名 而是通过 [data-*] 属性选择器 选择了目标都 通过js部分添加类名

```js
import Swiper from "swiper"
/**
 * カルーセル(Swiper)設定
 */
export default class Carousel {
  /**
   * @classdesc カルーセル設定
   */
  constructor() {
    this.init()
  }

  /**
   * Swiper対象要素を設定
   */
  init() {

    // 通过属性选择器 找的外层容器 swiper-container
    const $container = document.querySelector("[data-module='carousel']")

    // 根据外层容器 找到的 滚动区域的容器 swiper-wrapper
    const $list = $container.querySelector("[data-carousel='list']")

    // 找到items集合
    const $item = $list.querySelectorAll("li")

    // 外围容器身上有 data-alt-prefix 和 data-alt-prefix-base 该部分的作用是给导航点图片 动态绑定alt属性
    // 看看altPrefix的值是不是空 如果不是空就用传入的值 如果是空就用 ""
    const $prefix = $container.dataset.altPrefix !== "undefined" ? $container.dataset.altPrefix: ""
    const $prefixBase = $container.dataset.altPrefixBase !== "undefined" ? $container.dataset.altPrefixBase: ""


    // 给外围容器添加上 swiper-container
    $container.classList.add("swiper-container")

    // 给滚动区域添加上  swiper-wrapper
    $list.classList.add("swiper-wrapper")

    // 给里面的每一个item添加 swiper-slide
    Array.prototype.forEach.call($item, (el) => {
      el.classList.add("swiper-slide")
    })


    // 导航点(把导航点做成图片了)区域是ul -- ul(data-carousel="nav" data-thumb-path=`${img_path}pic_carousel_0`)
    // ul 中的 li 不是写入html结构中的 而是js动态创建的

    // 我们获取到这个ul 取到它身上的 thumbPath 也就是 导航点图片的路径
    const $thumbPath = document.querySelector("[data-carousel='nav']").dataset["thumbPath"]


    // 轮播图的每一个item项是li li当中包含了两个部分 图片区域 和 图片上的文字caption区域
    // $item 就是每一个轮播项
    const thumbTextArray = Array.prototype.map.call($item, (d) => {

      // 我们拿到 li -> 文字区域中的指定 DOM节点 querySelector(".text") 然后将它们身上的thumbtext 放到一个数组中
      const text = d.querySelector(".text")
      return text.dataset["thumbtext"]
    })


    new Swiper($container, {
      centeredSlides: true,
      loop: true,
      effect: "fade",
      fadeEffect: {
        crossFade: false,
      },
      speed: 500,
      pagination: {
        el: ".swiper-pagination",
      },

      breakpoints: {
        750: {
          pagination: {
            // 定义pagination 分页器内当前活动块的指示小点的类名。
            bulletActiveClass: "_active",

            // 此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。
            clickable: true,

            // 分页器容器的css选择器或HTML标签。分页器等组件可以置于container之外，不同Swiper的组件应该有所区分，如#pagination1，#pagination2。
            // 指定分页器的容器
            el: "[data-carousel='nav']",

            // 渲染分页器小点。这个参数允许完全自定义分页器的指示点。
            // 接受指示点索引和指示点类名作为参数。 className是swiper自己对小圆点添加的特有样式 swiper-pagination-bullet _active
            renderBullet: (index, className) => {
              const imgPath = $thumbPath + (index + 1) + "_thumb"
              const altPrefix = thumbTextArray[index] !== "ベースモデル" ? $prefix: $prefixBase
              return `
                <li class="${className}"><div class="thumb-wrap">
                  <picture>
                    <source srcset="${imgPath}.jpg 1x, ${imgPath}@2x.jpg 2x" media="(min-width: 835px)">
                    <img src="${imgPath}.jpg" alt="${altPrefix} - ${thumbTextArray[index]} -">
                  </picture>
                  <div class="thumb-absolute-grad">
                    <p class="thumb-absolute-text">${thumbTextArray[index]}</p>
                  </div>
                  </div>
                </li>
              `
            },
          },
        }
      },
      navigation: {
        nextEl: "[data-carousel='next']",
        prevEl: "[data-carousel='prev']",
      },
      slidesPerView: 1,
      spaceBetween: 0,
      on: {
        // 事件函数， 初始化后执行。
        init: () => {
          const swipeContainer = document.querySelector(".p-selection__cardetail__carousel__inner")
          swipeContainer.classList.add("is-show")
        }
      }
    })
  }
}
```