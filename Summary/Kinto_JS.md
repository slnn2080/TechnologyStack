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