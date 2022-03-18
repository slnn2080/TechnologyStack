### 移行手顺

> pug的情况下
- 1. 将原本在 src/html/xxx/index.pug的内容 复制到 pages/xxx/index.vue 里面

- 2. 在 template 中导入通用的pug组件 
- include/components/temporary/_all

```pug
<template lang="pug">
  //- 这里可以引入别的 pug 组件
  include /components/temporary/_all
        //- include ./button/_button
        //- include ./heading/_heading
        //- include ./hero/_hero
        //- include ./text/_text
        //- include ./anchor/_anchor
        //- include ./navi/_footer

  div
    section.l-cnt__full
      +m-hero-heading-caption('特定商取引法に基づく表記', 'NOTATIONS BASED ON THE ACT ON SPECIFIED COMMERCIAL TRANSACTIONS')
          
</template>
<script>
export default {
  data () {
    return {
      layoutData: {
        breadcrumbs: [
          {
            text: "特定商取引法に基づく表記",
            href: "/commercial_transaction/"
          }
        ]
      },
      meta: {
        title: "特定商取引法に基づく表記",
        description: "KINTOの「特定商取引法に基づく表記」についてのご案内です。【KINTO】クルマのサブスク、トヨタから",
        keywords: "toyota,トヨタ自動車,トヨタ,KINTO,キント,サブスクリプション,subscription,サブスク,KINTO ONE,愛車,愛車ポイント,フルサービスリース,リース,借りる,クルマのサブスク、トヨタから",
        path: "/commercial_transaction/",
        og: {
          imagePath: "/assets/img/pic_ogimage_002.jpg",
          type: "article"
        }
      }
    }
  },
  created () {
    this.updateLayout()
    this.updateHeader()
  },
  methods: {
    updateLayout () {
      this.$nuxt.$emit("updateLayout", this.layoutData)
    },
    updateHeader () {
      this.$nuxt.$emit("updateHeader", this.meta)
    }
  }
}
</script>
<style lang="scss">
@use '~assets/style/source/style' as g;
@use '@/assets/style/contents/commercial_transaction/style' as p;
</style>
```

- 3. 如果页面里面有 这个页面单独需要的 局部组件 配置在
- components/pages/XXX/
- 然后使用 include 导入

- 4. pug文件删除
- 5. 就得style样式 在下面的路径下 导入使用 使用 @use
- assets/style/source/style.scss

- 6. 每个文件单独的导入style样式
- 7. 旧sytle文件的位置发生了变化 如下
<!-- 
  以下の記述は旧style（現/assets/style/source/配下）のfoundationを読み込んでいる
  @use "../../foundation/global" as g;
  @use "../../parts/print";

  ↓以下に変更

  @use "../../source/foundation/global" as g;
  @use "../../source/parts/print";
 -->  

- 8. 页面的组件问题
- 以前: src/javascripts/contents/XXX/components/
- 现在: components/pages/XXX/
<!--  
  移動先

  /components/pages/index/
  -> YYYY.vue（各ページで使用しているvueコンポーネント）
  -> _parts.pug（pugパーツが存在している場合）
  -> /mixin(必要に応じて)/
  -> /styles/_foundation.scss
 -->

- 9. 修改 导入文件的路径

- 10. 将 src/javascripts/contents/XXX/app.js 的内容 移动到 mounted中

- 11. 图片不在 /assets/img/ 的情况下 页面固有的情况下 将图片移动到static下面
<!-- 
  _preview/lp/roomy/assets/img => static/lp/roomy/assets/img
 -->  

- 12. 表示确认
- 13. 将pug文件和_preview配下のHTML文件删除


> Vue的情况下:
- 1. 
- 原来: src/javascripts/contents/XXX/app(wrap).vue 
- 现在: pages/XXX/index.vue

- 将文件内容整理到现在的文件下

- 2. app.js里面的内容移动 或者 删除
- 3. 组件类的文件 整理到 components/pages/XXX/ 导入使用
- 4. 要导入旧的style.scss的情况下 
- assets/style/source/style.scss をimport

- 5. 页面单独的scss样式 在 
- assets/style/contents/XXX/style.scss
- 导入使用

- 6. 各文件中原有的路径要进行修改
- 7. 页面内使用的图片要整理到 static 的下面
- 8. 删除pug文件 和 _preview配下のHTML文件
- 9. 看看能不能显示


> 项目根目录是 @
- 比如 @/components/pages

> 模板中的img路径
- 图片都是 static 中 模板中直接可以 以 static 中的文件夹开头
- assets/img/bnr_step03_pc.jpg
- /campaign/cp-creditpoint/assets/img/pic_mv_pc.png









### Kinto index page
- 翻做一下 index 页面 然后记录一下 翻做过程中的要点

> xd取图相关:
- 1. 从xd上取图的时候 如果图片*有形状型的遮罩*我们要把这层遮罩单独的拿下来
- pc端和sp端各一个 然后我们要添加在 目标元素的外成容器的after伪元素上
```css
content: "";
background: url(/assets/img/index/mainvisual/bg_semicircle_sp.svg) center top no-repeat;
```

- 2. 从xd上取图的时候 sp端取两倍图 pc端取1倍图 和 2倍图


> 页面布局
- 1. 首先引入了公共样式 然后 v-app上加了 <v-app class="p-index-container">
```html
<style lang="scss">
@use "../mixin/style/_common.scss";
@use "../mixin/style/_lineup.scss";

.p-index-container {
  overflow: hidden;
  display: block;
  position: relative;
  width: 100%;
  max-width: 100%;

  * {
    box-sizing: border-box;
  }
}
</style>
```

- 2. 内部用了kinto自定的class类 layout-container 来定版心
- class="layout-container" 最大的特色就是 <1240px 的时候 宽度是840px 居中
- class="layout-container" 是用个wrap容器 内部的结构还需要使用 class="layout-content" 结构容器

- 也就是说 class="layout-content" 相当于 row
- 也就是说 class="layout-column"  相当于 col

- 当我们给 ayout-column: 值 指定值的时候 不是说1就是各个断点占1列 而是不同的断点的时候 占的比例不同


> 轮播相关
- 轮播图它们自己封装了一个组件 叫做 MainVisual
- MainVisual组件内部使用了 vuetify库里面的 v-carousel 和 v-carousel-item 组件

- 该组件的整体结构
  <div class="layout-container mainvisual-container">
    <div class="layout-content:center">
      <v-carousel>

- 这里注意下 最外层的容器上面添加了 mainvisual-container class


- 要点:
- 1. 轮播图的图片 是使用了 Picture组件
- 里面指定了sp pc retina断点时候的图片地址 同时设置了 图片的宽度和高度
- 这里图片尺寸的指定应该是跟xd里面sp端的尺寸是一致的

```html
<Picture 
  :sp-img="`${relativePath}kv_0${item.id}_sp.jpg`"
  :pc-img="`${relativePath}kv_0${item.id}.jpg`"
  :retina-img="`${relativePath}kv_0${item.id}@2x.jpg`"
  :alt="item.alt"
  width="375"
  height="444"
/>
```

- 轮播部分的简单应用:
- 下面没有配置任何功能相关的控制项 只是基本的一个展示
- 默认效果:
- 下方有导航点 有前后点击按钮

```html
<v-carousel>
  <v-carousel-item
    v-for="(item, i) of carousel"
    :key="i"
  >
    <Picture 
      :sp-img="`${relativePath}kv_0${item.id}_sp.jpg`"
      :pc-img="`${relativePath}kv_0${item.id}.jpg`"
      :retina-img="`${relativePath}kv_0${item.id}@2x.jpg`"
      :alt="item.alt"
      width="375"
      height="444"
    />
  </v-carousel-item>
</v-carousel>
```

- <v-carousel> 的标签属性
- v-model="visitedmodel"
  - 可以绑定一个变量 该变量是当前显示的图片的索引

- :cycle="true"
  - 是否循环播放

- :interval="1000"
  - 循环播放的间隔时间

- :show-arrows="false"
  - 是否显示 上一张 下一章的按钮

- transition="fade-transition"
  - 没看到效果 应该是过渡

- height="auto"
  - 设置组件的高度

- :hide-delimiter-background="true"
  - 隐藏导航点区域的背景色

- :hide-delimiters="true"
  - 隐藏导航点


- <v-carousel-item>当中的结构
- div class="mainvisual-item"
  - a class="link-block"
    - Picture组件

- 点击a标签的时候 会触发 @click="gaEvent(`top-kv-${item.id}`)"
- gaEvent事件是一个混合 但是不知道是用来做什么的
```js
import GaEvent from "./GaEvent.vue"

mixins: [GaEvent],

export default {
  methods: {
    gaEvent(val) {
      if (typeof window.dataLayer !== "undefined") {
        window.dataLayer.push({
          "event": "clickeventtrigger",
          "event_category": "top",
          "event_action": "click",
          "event_label": val
        })
      }
    },
  },
}
```


> 轮播的样式相关
> 轮播整体区域部分
- 首先我们要明白轮播图的组件的结构
- <div class="layout-container mainvisual-container">
    <div class="layout-content:center">
      <v-carousel>

- 也就是 整个轮播区域的组件都是通过 mainvisual-container 来控制的
- 比如 wrap容器的padding margin等

```scss
.mainvisual-container {
  position: relative;

  // 默认的情况下 layout-container 左右会有12px的padding 我们这里取消下 确保图片能贴边
  padding: 0;

  // 默认情况下 layout-container 下面会有48px的外边距 我们这里做下清除
  margin-bottom: 0;
}
```

- 要点:
- 1. 轮播区域的下方 有一个椭圆的遮罩
- 我们把这个遮罩单独的从xd文件里面提取出来了 然后通过after伪元素来定义到具体的位置
- 因为我们添加的是背景图片 所以我们要通过 padding-bottom 来把背景图片的区域露出来
<!-- 
  padding-bottom为0的时候 是整个图片填充着区域 是看不到背景的
  但是 我们加大padding-bottom的值 就可以发现 我们把背景图片露出来了
 -->

```scss
.mainvisual-container {
  position: relative;
  padding: 0;
  margin-bottom: 0;

  // 整个轮播区域下方的遮罩使用了after伪元素 和 配置的是配置图片
  &::after {
    content: "";
    background: url(/assets/img/index/mainvisual/bg_semicircle_sp.svg) center top no-repeat;
    position: absolute;
    left: 0;
    bottom: 0;
    background-size: cover;
    width: 100%;
    height: auto;
    padding-bottom: 5.25vw;
  }
}
```


> 轮播每一个item部分
- 我们先看在每个item部分的html结构是什么样子的
- <v-carousel-item>
    <div class="mainvisual-item">
      <a class="link-block" @click="gaEvent(`top-kv-${item.id}`)">
        <Picture />

- 每一个item的外层div是通过 class="mainvisual-item" 来控制的

- 要点:
- 1. 当我们移入图片的时候 要有过渡的效果 是透明度的效果 这个过渡效果 我们加在a元素上
- 首先 我们让a元素的display设置为block 然后设置了 transition 属性

- 2. 因为每一个item内部的img尺寸需要调整 而img又是在vuetifu组件的内部 所以这里 我们使用了 样式穿透
- 样式穿透的格式
- ::v-deep {
    其他的样式或者元素
  }

```scss
.mainvisual-item {
  .link-block {
    transition: .2s ease-out opacity;
    display: block;

    &:hover {
      opacity: 0.8;
    }

    ::v-deep {
      img {
        width: 100%;
        height: auto;
      }
    }
  }
}
```


> 导航点区域的样式
- 这部分的样式都是在vuetify组件里面的 所以我们要使用 ::v-deep 来进行设置
- 整个导航点的区域都是在一个div里进行包裹 整个结构为
- <div class="v-carousel__controls">
    <div class="">

- 下面的效果就是 导航点的背景没有了 导航点本身发生了写变化
```scss
::v-deep {
  .v-carousel__controls {
    // 用来控制导航点区域的背景色
    background: none;

    // 用来控制导航点区域的高度 如果设置为auto 那么它的高度就和小圆点一遍高 如果不设置 会是默认的高度50px
    height: auto;

    // 控制导航点区域和整个轮播区域之间的下面的位置空多少
    bottom: 40px;
  }

  .v-btn--icon {
    width: 10px;
    height: 10px;
  }
  .v-btn {
    width: 10px;
    height: 10px;
    background: #fff;
    margin: 0 8px;
    opacity: .7;
    
    &:after {
      display: none;
    }

    &--active {
      opacity: 1;
      width: 40px;
      border-radius: 10px;
    }
  }
  .v-btn--icon.v-size--small {
    width: 10px;
    height: 10px;
    &.v-btn--active {
      // 激活小圆点的宽度吧
      width: 40px;
    }
  }
  .mdi-circle::before {
    display: none;
  }
  .v-icon.v-icon::after {
    display: none;
  }
}
```

> CarTouchPoint部分
- 我发现 如果页面上有背景文件之类的东西的时候 他们比较喜欢使用 before after伪元素来设置

- 整个部分分为4个大的部分
- 1. 标题部分

- 2. tabs 按钮的部分
- 3. 展示车 点击左右可以切换的部分
  - 展开说明
  - 在大屏的时候 展示车是有透视效果的 前大后面的小
  - 在小屏的时候 展示车是铺满全屏的

- 4. 文件 + 按钮 区域的部分 
  - 展开说明
  - 在大屏的时候 文字区域 和 按钮区域是左右排列的
  - 在小屏的时候 文字区域 和 按钮区域是上下排列的


- 我们剖析一下原有的结构问题
- <div class="cartouchpoint-container layout-container:fluid">
    <div class="cartouchpoint-inner">
      <div class="layout-content:center">
        <h2 class="layout-column:12 heading:4:center">
          ぴったりのマイカーを選ぼう
        </h2>
      </div>
      <TabMenu />
    </div>
  </div> 

- 首先每一个组件都会有一个外层的wrap 然后这个wrap使用了流式布局
- <div class="cartouchpoint-container layout-container:fluid">

- .layout-container:fluid 的特点就是 不管什么尺寸下都是全屏 所以它里面必须再嵌套一层div来对版心进行控制
- <div class="cartouchpoint-container layout-container:fluid">
    <div class="cartouchpoint-inner">
      test
    </div>
  </div>

- 但是我发现 版心的控制 并不是由<div class="cartouchpoint-inner">来完成的 
- 而是在<div class="cartouchpoint-container layout-container:fluid">上通过.cartouchpoint-containerd的css属性控制的
- 也就是说 当我们使用layout-container:fluid的时候 我们也可以通过css样式来控制版心是么？
- *疑问:*: 为什么要给外围的容器上流式布局呢
- 因为需要
- 在pc端的时候 设计就是有在1440px内 宽度最大的设计

- 所以外层的wrap设置了流式布局 然后版心通过wrap身上的css样式来控制

```scss
cartouchpoint-container {
  // 要点1: 我们给一个max-width最大宽度
  width: 100%;
  max-width: g.$wd-lg;

  // 有了最大宽度后 通过margin left right auto达到居中的目的
  margin-left: auto;
  margin-right: auto;

  // 这个是用来调整这个模块和上一个模块之间的距离问题
  position: relative;
  top: 0vw;

  // 这个是控制innerdiv内部元素的居中
  .cartouchpoint-inner {
    margin: 0 auto;
    text-align: center;
  }
}
```


> 标题的部分
- 结构
- <div class="layout-content:center">
    <h2 class="layout-column:12 heading:4:center">
      ぴったりのマイカーを選ぼう
    </h2>
  </div>

- 能看出 我们在定义一个标题的时候
- 要点:
- 1. 页面中的标题 他们使用的是 h2
- 2. 页面中的标题不是只放一个 h2元素上去的 而是用了 layout-content 和 layout-column 也就是row col

- layout-column:12
- 用来指定 不管在什么屏幕尺寸下 都是满屏

- heading:4:center
- 用来指定 文字的大小 和 对齐方式
- 大屏36px 小屏24px 还指定的对齐的方法

- :center的用法总结:
- 在复习的时候我们知道 :center可以用在
  - layout-content:center
  - layout-align:center
  - text-align:center

- 这里又可以总结一种 heading:4:center 那是不是说 只要是文本的样式后面都可以追加这种写法呢？

```html
<div class="cartouchpoint-container layout-container:fluid">
  <div class="cartouchpoint-inner">
    <div class="layout-content:center">
      <h2 class="layout-column:12 heading:4:center">
        ぴったりのマイカーを選ぼう
      </h2>
    </div>
  </div>
</div> 
```

- 上面我们又发现并不是说 layout-column:12 只能用在div上 还可以用在 其他的元素让应该使用在块级元素上

> 背景文字的部分
- 我们发现这个页面还有背景文字 这个背景文字是作为整个这个区域部分的before伪元素出现的
```scss
&:before {
  // before伪元素需要这个属性
  content: "";

  // 相当于把伪元素变成块状的结构
  position: absolute;
  top: 0;
  left: 50%;

  // 既然成为了块元素 那么就会有宽高
  width: 53.6%;
  min-height: 40px;
  transform: translateX(-50%);

  // 放入背景图片 然后以内容为主进行缩放
  background: url(/assets/img/index/mainvisual/bg_lineup.svg) top center no-repeat;
  background-size: contain;
  
  z-index: 0;
  @include g.mq {
    width: 500px;
    height: 110px;
  }
}
```



### 主视图页面的总结
- 问题：
- 1. 他们不是将整个主视图的区域 拿图片来做 而是将主视图当中的元素 切成一张张的图片 然后放到这个主视图的区域中 然后使用定义来做

<!-- 
    主视图区域的结构如下
    http://localhost:3000/lp/alphard

    section   // css: margin: 0 auto
      div 整个主视图区域的包裹    // css: min-height: 500px flex... width: 100%
        div 图片区域    
        div 文本区域    css: width: 444px 

  
  整个主视图区域的包裹 的文本区域 它有款 位置是relative 和 padding来控制

  图片区域 
    整个是一个div 图片当做div的背景来配置
        background: url(/lp/alphard/assets/img/kv/kv_pc@2x.jpg) center center no-repeat;
        background-size: cover;
    它的宽度 基本上是100% 
            但是左侧如果有内容的话  width: calc(100% - 444px);

    它的高度 padding: 24% 0; 是用csspadding来控制的

  .kv-img-area {
    width: 100%;
    padding-top: 75%;
    background: url("/lp/alphard/assets/img/kv/kv_sp.jpg") center center no-repeat;
    background-size: cover;
    
    @include base.mq {
      background: url("/lp/alphard/assets/img/kv/kv_pc@2x.jpg") center center no-repeat;
      background-size: cover;
      width: calc(100% - 444px);
      padding: 24% 0;
    }
  }
 -->


- 他们把图片当做一个盒子的背景 



### rem
- 375px的图 24px的标题是多少rem
- 100 / 375 = 0.267 1px = 0.267vw
- 36 28 / 24 17
- 0.067 2.4vw / 1.87vw

> 外围容器
- 要先看设计稿
- 0. 最最外围的包裹容器是没有定宽的 连width都没写 这样就是自动全屏
- 1. 看看最最外围容器的直接包裹性布局容器的最大的宽度是多少 定位 max-width width: 100%
- 2. 有了具体的宽度后 就可以利用margin居中
- 3. 然后再看看设计稿 内部左右两侧需要空多少 padding
<!-- 
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  padding: 60px 20px 36px;

  我们的项目中：
  PC端：
  最外围的宽度 1224
  有左右内边距 80
  版心就是 1064

  SP端：
  最外围的宽度 328
  有左右内边距 16
  版心就是 296
 -->

- 4. 当缩小到小屏时 
 

> 贯穿屏幕的外围容器
- 要点
- 1. 宽度 100%


> 可以利用-margin 将内部元素拉出去


### 关于响应式的总结
- @include g.mq 是在 @media screen and (min-width: 835px) 屏幕尺寸大于 835px 的时候生效

- 那也就是说 我们正常写的样式 会被媒体查询的规则覆盖掉，也就是说我们可以正常写 想分响应式的时候我们就加上媒体查询
- 那也就是说 我们在分响应式的时候 我们写的样式是 835px以下 的样式
<!-- 
  &__inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1024px;
    padding: 0 20px;
    margin-bottom: 50px;

    @include g.mq {
      margin-bottom: 100px;
    }
  }
  
  ------

  在浏览器上的显示结果 屏幕尺寸大于 835px 的时候
  @media screen and (min-width: 835px)
    .p-morizo-cl__inner {
      margin-bottom: 100px;
    }
  }


  // 正常样式
  .p-morizo-cl__inner {
    margin: 0 auto;
    width: 100%;
    max-width: 1024px;
    padding: 0 20px;
    ~margin-bottom: 50px;~    因为上面的生效了 这行就失效了
  }
 -->

> 总结:
- 1. 媒体查询规则中的样式 会覆盖掉 原本选择器中的样式
- 2. 如果小屏幕尺寸没有 但是样式 但是大屏幕尺寸有 小屏幕下也要写样式对大屏幕的样式进行覆盖

> min-width & max-width
- min-width用来限制元素的最小宽度
- max-width用来限制元素的最大宽度

- 当元素的width大于max-width 或者小于min-width 就被它们的值所代替
- 也就是说 跟 width 也是有关系的
<!-- 
  所以才会出现当不设置 width 但设置了 min-width 的时候 div会应用 min-width 的值
  因为 width 比 min-width 小了 就会被 min-width 的尺寸所代替
 -->


- 注意：
- 当min-width的值大于了max-width的值的时候，元素最终的宽度显示min-width的值


- 扩展:
- 利用max-width可以实现元素逐渐变宽的效果
<!-- 
  当我们不知道元素的具体宽度，可以结合transition来实现动画延迟效果，如下：
  div{
    max-width: 0;
    overflow: hidden;
    transition: max-width 0.25s;
  }
  div.active {
    max-width: 600px; 
  }
 -->


> 2列 左文字 右图片的响应式部分
<!-- 
  // 解析：
  - 正常是flex布局 竖排 排列 当考虑响应式的时候 835px以上的时候 就会变成 横排
  .p-morizo-cl__clm {
    display: flex;
    flex-direction: column;

    @include g.mq {
      flex-direction: row;
    }

    // 解析：
    - 首先开启相对定位 在 大屏的时候 该div为block 右内边距384
    &__clm_insert {
      position: relative;
      @include g.mq {
        display: block;
        padding-right: 384px;

        // 解析：
        - 
        .clm-item {
          width: auto;
          &.picture {
            width: 100vw;
            margin: 56px -20px;
            @include g.mq {
              position: absolute;
              right: 0;
              top: 0;
              margin: 0;
              width: 320px;
              height: auto;
            }
          }
        }
      }
  }
  
-->


### flex的相关总结
- flex-grow:    
- 指定弹性元素伸展的系数 默认值为0，不伸展，当父元素有多余的空间时，子元素如何伸展 
- 父元素的剩余空间，会按照比例进行分配

- flex-shrink:  
- 指定弹性元素收缩的系数
- 当父元素中的空间不足以容纳所有的子元素时，如何对子元素进行收缩 默认值是1 等比例进行收缩 0就是不收缩 也就是元素会溢出

- auto:
- 相当于      flex: 1 1 auto;

- none:
- 相当于      flex: 0 0 auto;     弹性元素没有弹性



### branch的命名规则
- feature/这个位置接上下方网址最后的 BACKLOG部分 - 任意内容
- https://kinto-dev.atlassian.net/browse/BACKLOG-698


### 三角形绘制工具
- http://apps.eky.hk/css-triangle-generator/


### 关于媒体查询
- @里写的是大屏幕的 min-width 835 也就是说 g.mq 里面是对大屏的逻辑
- 我们可以先正常的写 小屏的逻辑 然后再用大屏的逻辑进行覆盖

- 我觉得覆盖的规则是同名覆盖 不同保留


### 关于图片的混合
- imgsetretina
- 应该是针对sp端的
- 使用这个混合的情况下 就要从sp端 取两张图片
- 
- 这个的起名规则就是不拖了_

- resimgSet
- 这个是针对两端的
- 起名规则 复制到_pc的前面
- 小于750的时候看sp的画面 sp端的是两倍图
- 大于751的时候看pc的画面 默认的话看pc的画面

- 我感觉是大图的时候用 resimgSet  小图的时候用 imgsetretina


### 关于类名
> 变量

- 媒体查询 小屏幕的时候使用 @include g.mq 835以下
<!-- 
  @include g.mq {
    margin-bottom: 100px;
  }
 -->
  $breakpoints: ('sm': 'screen and (min-width: 320px)',
    'md': 'screen and (min-width: 835px)',
    'xl': 'screen and (min-width: 1001px)',
  ) !default;


  // 835px default
  @mixin mq($breakpoint: md) {
    @media #{map-get(val.$breakpoints, $breakpoint)} {
      @content;
    }
  }


### 关于混合
> hdg
- 传入字号
- 设定文字字号 加粗 行高 下外边距48 左线 4 实心 黄 左内边距16
<!-- 
  @mixin hdg($size) {
    font-size: $size;
    font-weight: bold;
    line-height: (42/28);
    margin-bottom: 48px;
    border-left: 4px solid $yellow;
    padding-left: 16px;
  }
 -->


### 关于类名
- 整个内容在p-morizo-cl__wrapper里面 它的里面有一个个的section
- 每一个section使用的是p-morizo-cl__inner
- 文字区域使用的是.p-morizo__common__text

> .p-morizo-cl__wrapper
- 黑色背景 溢出隐藏
<!-- 
  background: #000;
  color: #fff;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding-bottom: 50px;
 -->


> .p-morizo-cl__inner
- 居中 宽度100% 最大宽度1024 内边距上下0 左右20 下外边距50
<!-- 
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  padding: 0 20px;
  margin-bottom: 50px;

  @include g.mq {
    margin-bottom: 100px;
  }
 -->


> .p-morizo__common__inner
- margin居中 宽度100% 最大宽度 内边距上下60 左20 右36
  - lastitem
    - 内边距为0 移动端 内边距上2px

  - sp-nospace
    - 内边距上下60 左20 右36
<!-- 
  - max-width 从小放大的最大宽度 超过就是留白增加
  - min-width 从大到小的最小宽度  
-->
<!-- 
  margin: 0 auto;
  width: 100%;
  max-width: 1024px;
  padding: 60px 20px 36px;

  &.last-item {
    padding: 0;
    @include g.mq {
      padding-top: 2px;
    }
  }

  &.sp-nospace {
    padding: 60px 0 36px;
    @include g.mq {
      padding: 60px 20px 36px;
    }
  }
 -->


> .p-morizo__common__text
- 字号16 自建局0。0025rem 下外边距28
<!-- 
  font-size: 16px;
  line-height: (28/16);
  letter-spacing: 0.025rem;
  margin-bottom: 28px;
 -->
  

> .p-morizo-cl__highlight
- 黄色的提示文字
<!-- 
  color: config.$yellow;
 -->


> .p-morizo-cl__txt--strong
- 字号20px 加粗 行高1.5 下外边距24
<!-- 
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5;
  margin-bottom: 24px;
 -->


> .p-morizo-cl__btn--back
- 按钮的文本 左内边距 2rem 右内边距0
- 过渡效果 和 hover效果
<!-- 
  .m-btn__text {
    padding-left: 2rem;
    padding-right: 0;

    &:after {
      transform: translate(0, -50%) scaleX(-1);
      right: auto;
      left: 0;
    }

    &:hover {
      &:after {
        margin-right: 0;
        margin-left: -2px;
      }
    }
  }
 -->


> .p-morizo__pic_gap
- 下边距 150
<!-- 
  margin-bottom: 150px;
 -->

> .p-morizo__content_link
<!-- 
  color:#fff;
 -->


> .p-morizo-cl__contents_wrp
- 转块 有边框 4 实 黑色 四周内边距24 下外边距100
<!-- 
  display: block;
  border: 4px solid #272727;
  padding: 24px;
  margin-bottom: 100px;
 -->


> .p-morizo-cl__contents_list
- 这个类名下面的li - a
- 定位re 块 左内边距24 字号16 白色文字 没有线 下外边距8
- before
<!-- 
  li {
    a {
      position: relative;
      display: block;
      padding-left: 24px;
      font-size: 16px;
      line-height: 1.5;
      color: #fff;
      text-decoration: none;
      margin-bottom: 8px;

      &:before {
        content: "";
        position: absolute;
        left: 0;
        top: calc(16px * 1.6 / 2);
        transform: translateY(-50%);
        display: block;
        width: 20px;
        height: 20px;
        background: url(#{config.$path}ic_link_arrow.svg) left top no-repeat;
        background-size: 20px 40px;
      }

      &:hover {
        @include g.mq {
          color: config.$yellow;
          &:before {
            background-position: 2px bottom;
          }
        }
      }
    }
  }
 -->


> .p-morizo-cl__kv_inner
- 宽度100% 最大宽度1024 相对定位 居中 下外边距24
- spmedia 左右内边距20 上下0 下外边距12px

- 图片
- 宽度100% 高度自动 vertical
<!-- 
  width: 100%;
  max-width: 1024px;
  position: relative;
  margin: 0 auto;
  margin-bottom: 24px;

  @include g.mq {
    padding: 0 20px;
    margin-bottom: 12px;
  }

  img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }
 -->


> .p-morizo-cl__kv_copy
- 绝对定位 左0 下0 下外边距0 背景线性渐变 下边框1px 白色 实
- 在sp页面
- 外边距 上下0 左右20px 宽度 100% -40px
<!-- 
  position: absolute;
  left: 0;
  bottom: 0;
  margin-bottom: 0;
  background: linear-gradient(0deg, black, transparent);
  border-bottom: 1px solid #fff;
  @include g.mq {
    margin: 0 20px;
    width: calc(100% - 40px);
  }
 -->


> .p-morizo-cl__kv_hdg
- 字号20 家族 下内边距12 白色文字
- sp
- 字号28 下内边距16

- before
- 转块 内容column 字号14 黄 斜体
<!-- 
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5;
  padding-bottom: 12px;
  color: #fff;
  @include g.mq {
    font-size: 28px;
    padding-bottom: 16px;
  }

  &:before {
    content: "Column";
    position: relative;
    display: block;
    font-size: 14px;
    font-weight: bold;
    color: config.$yellow;
    font-style: italic;
  }
 -->


> .p-morizo-cl__kv_logo
- 宽度100% 背景渐变 内边距上下16 左右20
- sp页面 相对定义

- 该类下面的 .log
- flex 上下剧中 
- sp页面
- 最大宽度1024 居中 内边距上下0 左右20px
<!-- 
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    @include g.mq {
      max-width: 1024px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .logo-txt {
      display: flex;
      align-items: center;
    }

    .image {
      width: 135px;
      margin-right: 8px;
      @include g.mq {
        width: 114px;
      }
    }

    .text {
      color: #fff;
      font-size: 12px;
      line-height: 1.5;
      @include g.mq {
        font-size: 14px;
      }
    }
  }
 -->

> 图片的宽度都是100% 高度自动 vertical
- 该类下的 img
<!-- 
  img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }
 -->



### 修改中需要注意的问题
- 1. meta的部分

- 2. 图片的部分
- 它们这的图片 每张图片会有3种格式 
- pc端的图片是 1倍 和 2倍 图
- sp端的图片是 2倍图
- ogp的图片是  1倍图
- 需要放在 这个部分
<!-- 
  - title = "..."
  - meta.description = "..."
  - meta.url = "https://kinto-jp.com/kinto_one/morizo/gryaris/column/vol2/"
  - meta.ogp_image_url = "https://kinto-jp.com/assets/img/kinto_one/morizo/gryaris/column/vol2/ogimage.jpg"
 -->

- github 修改部分的话 重新再 add commit push下 然后对方就能看见
- 或者用命令行
- 或者用vscode中的 循环按钮

- 3. target="_blank" rel="noopener noreferrer"
- a标签下添加rel="noopener noreferrer"来防止钓鱼网站，因为它获取的window.opener的值为null


> commit的时候
- git commit -m "BACKLOG-698"
- 可能 commit 之后就可以去 github 网站上 请求合并吧 我门可以试试到时候

- commit的时候还要注意的是 


> 创建request的方式
- 1. 前端页面 命令行到commit - 然后vscode里面只用git工具提交 - 去github主页 - pullrequest - 前面选择到哪个分支 后面选择自己的分支 然后写什么已经截图了 
<!-- 
  https://kinto-dev.atlassian.net/browse/PLB-696
  附上发给你指示的网址
 -->


> 当主分支有新的东西需要下载 或者说 我们的现有分支因为没有对应的东西报错的时候
- 我们可以先在主分支上 pull 最新的数据
- 然后在我们自己的分支上合并主分支的数据就好了


> 在push操作的时候
- git push origin feature/plan_b/PLB-696-s-roomy
- 我们要push到自己的远程分支上 没有的话就会创建吧 自信点是会创建


> 在下拉操作的时候
- git pull --rebase origin master


> 在执行了  git fetch 之后
- 我们还要执行 git merge origin/分支名


> 现在的状态就是等待 远程的操作合并后 再开始新的作业
- 我现在基于A分支 创建的B分支，但是A分支有问题了 导致了很多错误
- 我需要等A分支上做修复后 重新pull下

- 那就是说 A分支会将1合并到A分支里面 其实我应该等远程修复完再进行新的作业

-----------------

### 作业整理相关：
- 现在我需要将 /kinto_one/selection/ 下面的所有文件Vue化 
- 接下来从每页开始整理下思路是什么样的

- 这个系列的页面有5种车型:
- 1. compact: 紧凑型车
- 2. suv
- 3. minivan: 居家车
- 4. sedan: 轿车
- 5. coupe: 双门骄跑


- _common.pug 里面有上述的车类型的数据 是数组对象
```js
var suvArray = [
  {
    href:`${urlbase}aeroraize/`,
    img:"aeroraize",
    text:"RAIZE モデリスタ仕様 ADVANCE BLAST STYLE",
    type:"mdl, grp",
    power:"hvgas, gas, hv, gasdsl",
    status: "comingSoon, SoldOut, new"
  },
]
```

- 这个 lineup 区域的页面内锚点连接
```js
var fixedlinkArray = [
  {
    href:"/kinto_one/selection#compact",
    text:"COMPACT",
  },
  {
    href:"/kinto_one/selection#suv",
    text:"SUV",
  },
  {
    href:"/kinto_one/selection#minivan",
    text:"MINIVAN",
  },
  {
    href:"/kinto_one/selection#sedan",
    text:"SEDAN",
  },
  {
    href:"/kinto_one/selection#coupe",
    text:"COUPE",
  }
]
```

- 还有一个 var dropFlag = false



> http://localhost:3000/kinto_one/selection/
- 1. 页面结构分析：

> kv区:
- 它是一个展示车的区域 点击按钮切换展示汽车部件
  - 1. 正常贩卖的:
    - 按钮是 お見積りはこちら:
    - 下方有车的价格区域

  - 2. 敬请通知的:
    - 按钮是 メンバーシップ登録はこちら
    - 下方没有车的价格区域 直接是 同车类型的其他类型区域

  
> 同车类型的其它类型车辆区:
- 比如 有4辆suv 那么这个区域就展示其它3辆

> 其它的lineup区

> BRANDS区

> よくある質問区

> 其它区
