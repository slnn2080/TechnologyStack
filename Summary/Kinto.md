### nuxt化
- 1. http://store.kinto-jp.com/
- 2. http://store.kinto-jp.com/tool/
- 3. http://store.kinto-jp.com/lexus/


- vuetify:
- 打不开的网站
- https://kinto-dev.atlassian.net/wiki/spaces/KINTO/pages/1193954642/MIL



- 注意点:
- nodeのバージョンを16.3.0
- ローカルのnode_modulesを削除して再度インストール
- pug→HTMLにするのでご注意を


- 什么意思?
- nuxt2系でもcomposition APIが使えるので使いたい


> 问题:
- 1. 确认源文件的位置 从哪个分支开始比较好呢
<!-- 
  どのブランチから切ってから作業しますでしょうか
  それともローカルでnuxtのプロジェクトを作って　ローカルで作業しますでしょうか
 -->

- 2. 上面的网站在家的时候打不开
<!-- 
   このみつのURLは家で開けませんでしたが　会社で開けます。
   自分原因ですか？それとも何か設定がありますでしょうか？
 -->

- 3. 项目中使用vuetify框架么 ルール是学习会的时候讲的么
<!-- 
  このプロジェクトでvuetifyフレームワークを使いますでしょうか？　それとも　現在の状態を踏襲しますでしょうか

  使い方について先日岡安さんが勉強会で教えてくれた内容ですか？
  そのvuetifyルールのファイルがどこにありますでしょうか？
  vuetifyで出来上がったコンポーネントがありますでしょうか？
 -->

- 4. composition API具体指的是什么
- 5. vuetify的链接地址打不开
- 6. 如果需要用到vuetify的话 我们有做好的组件么？ 在哪？





### 学习会
vuetify / data

global kinto design system daft ver 1.0

uiガイドライン


g导入vuetify 提供scss文件 前后端导入vuetify

怎么导入？
pug template

css部分
temp - /systembase link css
js怎么导入截图的

全体使用 v-app 包裹
<v-app>
  原本的内容
<v-app>


localhost:3000/development/system
- 这好像是一个 指南的页面


599 sp
600 904 pad
905-1239
1240-1439 pc
1440 以上

sp 4 4
pad 8 8

pc 1440  12 12


stretch 
折り返し

- 我在这已经待了快两个月了 公司的氛围特别的好 每个人都很热情 在这里很开心
- 也有一些在意的地方 日语的原因 说出来的话可能不是那么的日本 语气可能很硬 是因为日语的原因
- 不足 css样式这块 我还需要多写 争取能达到和大家一样的程度
<!-- 
  そういえばここですぐに２ヶ月になります
  会社の雰囲気がとても良くて、みんなも親切でここで仕事をするのは本当に楽しいです

  私の日本語がそんなに上手ではないですので,チャットでの内容とか話した内容とか　きっと失礼なところがあって、
  すみませんね、今後だんだんに直します

  仕事上にはcssのところがまだ不足なところがありますので、皆さんと同じ程度になるように頑張ります
 -->

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











### 需要问的东西
- https://kinto-dev.atlassian.net/jira/software/projects/BACKLOG/boards/192/roadmap?selectedIssue=BACKLOG-710
- 能从上面的url中得到什么样的信息 起票是什么意思
<!-- 
  毎回会議してる時に、いつもこの画面を見ていて、上記のURLから　何のメッセージをもらえますでしょうか
  起票ってどういう意味でしょうか
 -->

- css中的vw是计算出来的结果 还是自己一点点的调试的结果
<!-- 
  vwの方はこれが何を基づいて計算した結果でしょうか
  それとも少しずつ微調整した結果でしょうか
 -->

- v-btn heading 组件的使用方式
<!-- 
  v-btnの使用方
  headingのコンポーネントどんな効果がありますでしょうか
 -->

- github的问题
<!-- 
  今朝pullして、こうになってました、どうやって解決しますでしょうか
 -->

- xdのことですが、この前にやった仕事が全部xdを参照して作業しますよね
- xdデータは毎回池田さんが私に共有してくれますか？それとも私自分が探すことができるデータでしょうか


### 文件路径的问题
- pdf文件在
- preview/kinto_one/lineup/toyota

- 确认pdf的url
- http://localhost:3000/kinto_one/lineup/toyota/alphard/


### 关于页面布局总结

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


### 車種Vue化作業
- PLB-696
- 作业内容简单的来说 应该是用 prius 作为模版 然后做其他的新的车种

- 是不是说我需要在下面的文件夹下 建立其他的车种
- src/javascripts/contents/kinto_one/lineup/toyota/其它车种
<!-- 
  prius模版的地址
  src/html/kinto_one/lineup/toyota/prius/
  src/javascripts/contents/kinto_one/lineup/toyota/prius
 -->

- http://localhost:3000/kinto_one/lineup/toyota/voxy
- https://kinto-jp.com/kinto_one/lineup/toyota/車種名/
- 上面的链接可能是浏览页面的网址


> 理解 与 问题集锦
- 现阶段我的理解是 pug 和 prius 是一对儿 其它的车种也是这样的组合
- 1. pug负责页面的结构， prius负责啥？
- 而且我发现 prius 里面只有data配置项定义了数据，将数据传递给了 Wrap 模版 通过props

- 2. 怎么根据 pug 文件使用prius模版 进行数据的迁移？
<!-- 
  pug, wrap, priusどういうふうに連動しますでしょうか
 -->

- 3. Prius中data配置项中的数据来着哪里？新文件中的数据在哪里？
<!-- 
  例えば、この車種の必要なデータがどこにありますでしょうか？
 -->

- 4. 那数据有了最终要做成的样子有么
<!-- 
  データはこれですが、
  最終的な画面の大体な様子がありますでしょうか、何か参照できるファイルがありますでしょうか?
 -->

- 5. 我需要用哪几个文件？
<!-- 
  どのファイルを使って、この仕事が終わらせるかな
 -->

- Prius.vue 和 index.pug 文件 对比起来 发现 数据上是没有关系的 也就是说 数据不是从pug文件copy到prius.vue 文件里面的
- 但是Prius.vue 中的数据 确实是 传到了 Warp 组件里面的 那Prius.vue中的数据是从哪里来的

- pug文件
- 继承了base
- 定义了头部
- 定义了 json 数据
- 也就是说pug文件主要是用来布局的 也就是定义页面的结构


- 6. 桌面上的文件有什么样的作用
<!-- 
  このファイルですね、なの作用がありますでしょうか?
 -->

- 7. 我制作的车种怎么在页面上看到
<!-- 
  私が完成してる部分がどうやってサイトで見られますでしょうか
  例えば、何のurlを入力するどか
 -->

- 8. 下方 yaris 部分的3 4 5也是我需要问的问题


> 我需要负责的部分
<!-- 
  kinto-jp.com/kinto_one/lineup/toyota/roomy/       ルーミー
  kinto-jp.com/kinto_one/lineup/toyota/sienta/      シエンタ
  kinto-jp.com/kinto_one/lineup/toyota/yaris/       ヤリス
  kinto-jp.com/kinto_one/lineup/toyota/yariscross/  ヤリス　クロス
 -->


> 作业整理
- 整理了一下 我现在的主要工作就是将pug里面的数据 复制粘贴到vue里面
- 而且vue的模版也已经就是现成的了 需要注意的地方就是 怎么去找数据

- 最后 我们在pug的最后 粘贴的是 el里的部分
- 关于数据 我需要在 cardata.json 里面找
- 关于是否能拖动 我需要在 dropcardata.json 里面找

- 关于价格
- 这边希望是最低的价格 我们需要选择一个 价格是最低的
- yearmax_bonusmax_taxin
- 我觉得是在降价的dropcardada里面找

- 是现在pug里面定义一个id为xxx的div
- 然后再在wrap组件里面挂载到这个div中

- isDrop
- 拿着车的英文名字去 dropcardata 里面找如果有 那就是true 如果没有就是false

- minPrice: [
    {
      pattern: "year7_bonus10m_taxin",
      period: "7年",
      bonus: "110,000円×14回",
      bonusTax: "110,000円(税込)",
    }
  ],
- year7_bonus10m_taxin 中间的位置就是 价格 10万 然后自己去算消费税 和 税入一样

- slideCaptionFlag
- 看看轮播图有没有 标题 有的话 就是true
- 标题内容可能是网站上的 也可能是pug文件里面的 标题找的是这个部分
<!--  
  section.l-cnt__main
    //-  車種詳細スライダー
    +imgCarousel(class="p-cardetail__slide--caption")
    p.m-txt__normal.p-cardetail__slideBottom
      | すっきりコンパクトサイズながら居心地バツグンの広さが魅力！
    +btnSimulate("sim1")
 -->


- headDescription
- 复制的是 pug 文件里面的 这个部分
<!-- 
  main.p-cardetail(data-ga="true")
    section.l-cnt__full
      +m-hero-heading-caption('ルーミー','コンパクトカー、ルーミーの特徴や主要スペックをご紹介します')
 -->


- carPoint
- 复制的是 pug 文件里面的 这个部分
<!-- 
  section.l-cnt__main
    +recommendPoint([
      {
        ttl: "シャープかカジュアルか。選べる2つの顔",
        txt: "シャープで「映える」カスタムか、カジュアルなスタンダードか選べる2つのフロントフェイス。",
      },
      {
        ttl: "後席足元と頭上に解放感を",
        txt: "コンパクトカーであることを感じさせないゆとりを実現。小さなお子様なら室内で立って着替えることも可能です。",
      },
      {
        ttl: "コンパクトながら充実の安全装備を搭載",
        txt: "ブレーキ制御付誤発信抑制機能など、次世代のスマートアシストで、より大きな安心を！",
      }
    ])
 -->


- carDetail
- lpUrl的部分 如果没有跟prius对应的地方 就可以不用填了 貌似
<!-- 
  section.p-cardetail__main.l-cnt__main
      +noFixedDetailTable
 -->


> 留存问题
- 先週が4車種の仕事があって、ルーミー車種はすでに終わりましたが、残りの車種がルーミーがマージされてから作業した方が良くて、そうでないと、このようなbugが出てきました。
- でもsourcetreeで見るとこの車種がまだマージされてませんよね

- 先ほど2車種をつくて、シエンタとヤリス　シエンタはbugが出てません、もうマージしました。でも、ヤリスの方がこのbugが出てきました


> yaris的情况下
- 需要在下面的路径里新建一个文件夹

1. 下記の場所にフォルダを新規作成
  src/javascripts/contents/kinto_one/lineup/toyota/yaris

2. フォルダ内にapp.js、Wrap.vueを新規作成（prius/からコピーでOK）

3. pugファイル → Wrap.vue へデータを移設
src/html/kinto_one/lineup/toyota/yaris/index.pug

4. pugファイルから余分な記述を削除

5. pugファイルに#yarisを追加（#detailとか#contentでもOK）

<!-- 
  src/javascripts/contents/kinto_one/lineup/toyota/yaris

  | - yaris
    - app.js
    - Wrap.vue

  这些可以从 prius 里面copy
 -->

- 作业内容：
- 我感觉应该是将 pug文件 做成 vue文件
<!-- 
  // pug文件的路径
  src/html/kinto_one/lineup/toyota/yaris/index.pug

  注意点：
  1. 要将pug文件中多余的描述删除
  2. 在pug文件中追加 #yaris 或者 #detail #content 都可以
 -->


> 关于分支
- 我们可以从 /develop_planb 分支里 新分出一个分支 起名为
- /feature/plan_b/PLB-696-xxx
- xxx的部分 只要跟现有的分支 没有重复 都可以

<!-- 
  https://github.com/kinto-dev/kinto-jp.com-frontend#git-%E9%81%8B%E7%94%A8%E3%83%95%E3%83%AD%E3%83%[…]A9%E3%83%B3%E3%83%81%E3%82%92%E4%BD%9C%E6%88%90
 -->


> 总结性问题
<!-- 
  // git的问题
  如果我做完了 要开始提交了 提交后的url在哪里获取
  也就是说想让你们review代码的流程是什么样的 
  如果有修改 我应该在哪里看到呢？



  // 作业相关的问题
  因为我对整个项目认识上的不足， 不知道这份工作应该从哪开始入手
  可以给我讲解下这份工作么？ 比如我应该怎么做？
  今のプロジェクトには認識が不足ですから、この仕事がどこから手をつけばいいかわかりません
  この仕事を説明してもよろしいでしょうか、例えばどこからどうやって作業しますかって

  
  
  岡安さんがくれた仕事の進捗：
  午前中BACKLOG-698を対応してる時に、nodeのセッティングがあまり良くないのを発見して、いろんなエラー出てきました、午後ずっとnode再インストールするなどかやってました。
  Vue化の仕事をまだ入ってません。
  作業環境を
  昨日は一日中パソコンの環境整備に追われた
  この仕事も見てみたがわからなかった
  プロジェクトを知らないのでwrapファイルにデータを移動する方法がわからない


  上午我看了一下 她给我的工作 是由pug 做成 vue的作业是么
  午前中は岡安さんがくれた仕事を見て、どこから手をつけるかわかりません
  作業内容はpugをvueに作る作業ですよね

  でも、pugをどうやってvueに作るか　わかりません
  ちなみにこのページをサイトの中でどうやって探しますでしょうか
 -->

-----------------------------

### 1125
- ハリアーLP修正

- 対象ページ
- https://kinto-jp.com/lp/harrier/
<!-- 
  簡易ヘッダーへの差し替えが必要ですので合わせて対応ください
 -->

- 外部制作テンプレート
- https://kip.kinto-jp.com/2021/09/16/%e9%96%8b%e7%99%ba%e7%b7%a8%e6%88%90%e9%83%a8/

-----------------------------

### 1124工作

> BACKLOG-805
- 1. feature/1201/developから新しいブランチを作りますでしょうか
- 2. 作业内容
  - この３つのページでしょうか
  - げんのコードを新しいコードに差し替え作業ですね、でも
  - あたらしいコードはどんなものでしょうか
  <!-- 
    https://kinto-dev.atlassian.net/wiki/spaces/KINTO/pages/847846584

    https://kintojp.sharepoint.com/:x:/r/sites/intranet/_layouts/15/Doc.aspx?sourcedoc=%7B55346235-70F6-4AE0-ACB8-D95543F2156F%7D&file=%E2%98%85%E4%BE%A1%E6%A0%BC%E3%83%9E%E3%82%B9%E3%82%BF%E9%80%B2%E6%8D%97%E7%AE%A1%E7%90%86%E8%A1%A8.xlsx&action=default&mobileredirect=true&cid=7c75e8fd-eb6c-4fa2-b9c4-4c1db8ac7d35  

    打不开
   -->

- 3. 文件路径
  - src/javascript/contentsからソースコードを探しますでしょうか


> BACKLOG-738  这个还给池田了
- https://kinto-jp.com/kinto_one/lineup/ 
- https://kinto-jp.com/kinto_one/lineup/toyota/
<!-- 
  ＜上段＞
    【ルーミー】・コード変更
    【GR86、RAIZE】・新登場フラグ削除
    【RAV4(モデリスタ含)】
      ・追加
      ・直売CS、乗り換えフラグ入力
      ・ランキング修正

  ＜下段＞
    【RAV4(モデリスタ含)】・適用終了：20211201
 -->

- 【ルーミー】・コード変更
<!-- 
  どのコードに変更しますでしょうか 
-->

- 【RAV4(モデリスタ含)】・追加・直売CS、乗り換えフラグ入力・ランキング修正
<!-- 
  この車種を追加して、
  直売CS、乗り換えのフラグを作って

  ランキング修正はどんな作業でしょうか
 -->

- ＜下段＞
  【RAV4(モデリスタ含)】・適用終了：20211201
<!--  
  この部分はどこに修正すればいいでしょうか
 -->


> BACKLOG-741
- ラインアップ画像作成
<!-- 
  こちらご対応お願いします。
  画像を下記フォルダに格納するだけでOKです。
  画像格納場所：　/_preview/assets/img/car_image/

  画像ファイル名：Lineup -> lineup に変更してください
 -->

- このページの作業は　４つの画像をそのまま　/_preview/assets/img/car_image/　に入れる作業だけでしょうか

- ファイル名が　Lineup -> lineup　変更必要がありますでしょうか
- もともと　小文字となってますが


> BACKLOG-753
- 本番：https://kinto-jp.com/kinto_one/selection/
- devtest3：https://devtest3-www.kinto-jp.com/kinto_one/selection/

- 1. ファイルも　src/javascript/contentsから　探しますですよね
- 2. 照着excel去问下


> BACKLOG-785
- rav4、ルーミー、passo以外のグレード表pdf更新

- 1. pdfファイルはどのフォルダーにありますでしょうか
- 2. roomyとrav4のpdfはどのような役割がありでしょうか
- 3. もしこの仕事を完成した場合に、どうやってアップロードしますでしょうか

-----------------------------

### 1108工作

> 手边有的资料
- https://kinto-dev.atlassian.net/browse/BACKLOG-707

- 対象ページURL
- https://kinto-jp.com/kinto_one/morizo/gryaris/

- 还有一个xd 里面是设计稿
- https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox/FMfcgzGlkjhDLDfnXhbblcnngXMXBfMP

- 简单的说
- 在现有的页上追加新的要素 可能还要顺便的改一下结构
<!-- 
  現行のページに要素を追加に伴い構成を見直したい。
 -->


- 头说
- 复制一下这个文件 然后替换下文本 稍微修改一下就好了
<!-- 
  こちらのタスクお願いします。先程XDは招待致しました。
  URLはこちらで。
  /kinto_one/morizo/gryaris/column/vol2

  /kinto_one/morizo/gryaris/column/vol1
  をコピーして要素の入れ替えと少しの修正ですむかと思います！よろしくお願いします
 -->


- 图片从xd中取出应该是存放在 assets文件夹里面
- src外侧的html文件中 有html文件
- src里面的html文件中 应该是pug


- 图片的起名方式应该是有规则的，而且pc在一个分界点会呈现不同的图片
- 也就是说pc端有两张图片 



> 问题：
- 1. 从哪个分支建立自己的分支? 提交的时候提交到哪个分支呢？
<!-- 
  どのブランチから新しいブランチを作りますでしょうか？ 
  pushする時にどのブランチにpushしますでしょうか？
-->

- 2. 要确认要做的文件在哪里 是src下的么
<!-- 
  私が このpathのファイルをコピーして、コピしたもので作業しますよね

     src/html/kinto_one/morizo/gryaris/column/vol1
 -->

- 3. 
- 我是只需要插入 vol2 就可以了么 其它的地方不用管是么? 
- 要做成什么样子 是跟设计稿一样么 数据的话是从设计稿里面获取是么? 够需要修改哪些地方
<!-- 
  私が　vol2 の部分だけ作りますでしょうか、他のところが修正する必要がありますでしょうか

  例えば　vol2 を除いて、XDと今の画面と比べて、異なってるところもありますが
  どちらに参照しますでしょうか
 -->

- 4. News的位置的内容不一样
<!-- 
  画面のNews部分の内容とXDの内容と比べて、異なってます
  もし修正必要があったら、このリンクの内容がどうしようかな
 -->

- 6. xd里面的图片怎么导出 导出什么样的格式 导出后存放在哪里 图片的名字怎么取？
<!-- 
  xdから画像をどうやって書き出ししますでしょうか？
  何の格式ですか？
  書き出した後　picの保存場所？
  画像の名前のそのままにしますでしょうか

  一枚写真に３つフォーマットがありますよね？　pcは1x と　２x　あと　sp
  ピクチャーネーミングしてる時に何か特別なルールか要求がありますでしょうか？
 -->

----

- 作业中的问题
- 1. 書き出した画像はどこに入れますでしょうか？　
- html/assets/img/kinto_one/morizo/gryaris/column/vol2　に入れましたが、画像が表示できません

- 2. スタイルの問題は　
- 既存のスタイルと統一したいんですが、それぞれのクラスが何をしてるか注意点があるかちょっとわかりません。時間がかかりました。
- もし私がスタイルを調整したい場合にどのファイルで調整すればいいでしょうか

- 3. ビデオのところ　alt属性の値

-----------------------------

### 1110
- media 835px

- 1. mediaの修正ファイルはどこにありますでしょうか
- 2. ダイヤログボクスはcssで書きますかそれとも, この部分を画像にして配置しますでしょうか


- wrap
  - left.div
    - img

  - right
    - div.content + before
  

- 关于 媒体查询 
- 他刚才说的意思是 外层是手机端的 内层使用pc的应该没问题

-----------------------------

### 1116
- 1. 图片放在哪里呢？
- preview

- 2. 24px 16px

-----------------------------

### 1126
- https://kinto-dev.atlassian.net/browse/BACKLOG-688

- 移动端
- 版心是 327 两边各 24的padding

> 样式

- pc端
- wrap 1440

- 版心 1392
- padding 左右各是24px
<!-- 
  Margin 0 auto
  Width 100%
  Max-width 1392
  Padding 0 24
 -->

- 蒙版
<!-- 
  width: 376px;
  height: 540px;
  background: linear-gradient(#000 0%, #121212 100%);
 -->


- 按钮
width: 272px;
height: 48px;
border-radius: 24px;
background: #00708d;

- title
width: 327px;
height: 56px;
background: linear-gradient(#ecc990 0%, #ba9260 100%);


<picture>
  <source
    srcset="/assets/img/index/offers/offers_tilte_sp.png"
    media="(max-width: 750px)">
  <source
    srcset="/assets/img/index/offers/offers_tilte_pc.png 1x, /assets/img/index/offers/offers_tilte_pc@2x.png 2x"
    media="(min-width: 751px)">
  <img srcset="/assets/img/index/offers/offers_tilte_pc.png">
</picture>