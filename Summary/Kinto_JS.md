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