### Vue Components的使用方式


### Hero标题
> <HeroHeading>
- 自定义组件:

- 属性:
- heading[必須]：标题文本
- description：标题下的富文本

- 特点
- 内部使用v-html渲染文本 所以可以使用标签

- 位置:
- /src/javascripts/components/HeroHeading

```html
<template>
  <HeroHeading
    heading="見出しテキスト"
    description="見出し下のリード文<br>htmlタグ使用可"
  />
</template>
```


### 按钮
> <v-btn>
- 对vuetify的btn组件的封装:
<!-- 
  vuetify的参考文档: 
    <v-btn> 上还有很多属性

  - https://vuetifyjs.com/ja/components/buttons/
 -->

- 按钮的宽度是4column固定的
- (如果按钮要放在4column的容器内的时候 btn的width是100% - margin)


- 特点
            Extra Small       Small         Small         Medium          Large
            < 600px           < 905px       < 1240px      < 1440px        >= 1440px

按钮的宽度    4/4               4/8           4/12          4/12            4/12
(column数)

字号          14px            14px          14px          16px             16px



- 属性:
- color: 颜色
<!-- 
  没有color属性的情况下
    background: #ffffff
    border: 2px #00708d solid
    color: #00708d

  有指定的color的情况下 color="primary"
    #00708d
    none
    #ffffff

 -->

- href: 
  正常的连接的话 就是 >
  连接的是pdf的话 就是pdf的图标

- target: "_blank"
  这时候就是一个窗口图标


```html
<v-btn href="#">Normalボタン</v-btn>
<v-btn href="#" color="primary">Conversionボタン</v-btn>
<v-btn href="#" target="_blank">別ウィンドウ</v-btn>
<v-btn href="xxx.pdf" target="_blank">PDFリンク</v-btn>
```


### 图片
> <Picture>
- 自定义组件

- 作用:
- 在pc sp的时候(根据断点的不同)分贝展现不用的尺寸的图片


- 属性:
- sp-img[必須]: sp尺寸的图片路径
- pc-img[必須]: pc尺寸的图片路径
- alt[必須]: 
- width[必須]: pc尺寸的图片宽度
- height[必須]: pc尺寸的图片高度
- loading: loading属性
- is-retina: Retina対応画像の有無 (Default: true)
<!-- 
  如果图片的路径是.svg的话 没有对应retina图片的设定
 -->

- 特点
            Extra Small       Small         Small         Medium          Large
            < 600px           < 905px       < 1240px      < 1440px        >= 1440px

表示画像     sp-img            sp-img        sp-img         pc-img          pc-img


- 位置:
- /src/javascripts/components/Picture

```html
<template>
  <Picture
    sp-img="/assets/img/campaign/bnr_talk_sp.jpg"
    pc-img="/assets/img/campaign/bnr_talk_pc.jpg"
    alt="KINTOアスリート トークセッション"
    width="448"
    height="640"
    lading="lazy"
    :is-retina="true"
  />
</template>
```


### Card
> <v-card class="card:grid">
- お役立ち記事等に 使用的组件
- 基于vuetify封装的组件

<!-- 
  https://vuetifyjs.com/ja/components/cards/#section-4f7f304465b9
 -->  

- 嵌套:
- Card组件的标签体里面可能承装html结构 
  .card-title 用于放标题
  .card-image 用于放图片
- <h3 class="card-title"> 
- <div class="card-image" :style="background-image:url(xxx.jpg)"></div>

- 特点:
              Extra Small       Small         Small         Medium          Large
              < 600px           < 905px       < 1240px      < 1440px        >= 1440px

Card宽度       4/4              4/8           4/12          4/12            3/12 
(column数)

.card-title
font-size     14px              14px          14px          16px            16px


.card-image   width:30%         width:100%    width:100%    width:100%      width:100%
图片的尺寸wh    (30:19.5)         (100:64)     (100:64)       (100:64)        (100:64)

```html
<div class="layout-content">
  <v-card class="card:grid">
    <a href="#">
      <div class="card-image" :style="background-image:url(xxx.jpg)"></div>
      <h3 class="card-title">タイトル</h3>
    </a>
  </v-card>
</div>


<v-card class="card:grid">
  <a href="#">
    <div class="card-image" :style="{backgroundImage:'url(xxx.jpg)'}"></div>
    <h3 class="card-title">タイトル</h3>
  </a>
</v-card>
```


> <v-card class="card:fill">
- 可以指定背景色带标题的Card组件

- 嵌套:
- Card组件的标签体里面可能承装html结构 
  .card-title   用于放标题
  .card-content 用于放内容


- 属性
- color[必須]：背景色
- outlined：影なしのフラグ(Default: false)


- 特点:
              Extra Small       Small         Small         Medium          Large
              < 600px           < 905px       < 1240px      < 1440px        >= 1440px

Card宽度       4/4              4/8           6/12          6/12            6/12 
(column数)

.card-title
font-size     16px              16px          16px          24px            24px


.card-content 24px              24px          24px          32px            32px
padding    

```html
<div class="layout-content">
  <v-card class="card:fill" color="primary">
    <h3 class="card-title">コンテンツタイトル1</h3>
    <div class="card-content">自由にコンテンツを配置できます</div>
  </v-card>

  <v-card class="card:fill" color="secondary">
    <h3 class="card-title">コンテンツタイトル2</h3>
    <div class="card-content">自由にコンテンツを配置できます</div>
  </v-card>

  <v-card class="card:fill" color="secondary" outlined>
    <h3 class="card-title">コンテンツタイトル3</h3>
    <div class="card-content">自由にコンテンツを配置できます</div>
  </v-card>
</div>
```


### 表格
- 基于vuetify封装的组件
<!-- 
  https://vuetifyjs.com/ja/components/simple-tables/
 -->

> <v-simple-table>
- 一般的表格组件

- 属性:
- color: 指定thead的背景色 文字色 border色
- fixed-header:
  需要配合height一起使用 用于固定thead的高度
  ie11不行

- <v-simple-table>里面要使用 <template #default>
    <v-simple-table>
        <template #default>

```html
<v-simple-table color="primary">
  <template #default>
    <thead>
      <tr>
        <th></th>
        <th>head:A<br>KINTO</th>
        <th>head:B<br>現金払い</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th>head1</th>
        <td>cell:A-1</td>
        <td>cell:B-1</td>
      </tr>
      <tr>
        <th>head2</th>
        <td>cell:A-2</td>
        <td>cell:B-2</td>
      </tr>
    </tbody>
  </template>
</v-simple-table>
```

- 如果要固定左边thead标题栏的情况下 我们使用类名来控制
> .table:fixed-left-header


### 表格 - SP Blockレイアウト
- 在Small断点的时候 左侧的标题单元格 会和内容承上下排列的方式

- 属性
- color: 可以指定标题单元格的背景色 文字色 边框色


- 特点:
              Extra Small       Small         Small         Medium          Large
              < 600px           < 905px       < 1240px      < 1440px        >= 1440px

tr
display       flex              flex          table-row     table-row       table-row


th, td
display       block             block         table-cell    table-cell      table-cell
(default)

---

给table上class
*table:responsive:2cols*
th,td 单元格的宽度
(th/td)
              100% / 50%        100% / 50%    20% / 40%     20% / 40%       20% / 40%

---

给table上class
*table:responsive:3cols*
th,td 单元格的宽度
(th/td)
              100% / 33%        100% / 33%    16% / 28%     16% / 28%       16% / 28%

---

给th上class
*th class="th:hidden"*
              none              none           table-cell   table-cell      table-cell
<!-- 
  top/left のボーダーを非表示にします。
  th:hiddenクラスはthead > th に付与してください。
 -->

---



### 折叠面板
> <UpwardExpansion>
- 基于vuetify完成的组件
<!-- 
  https://vuetifyjs.com/ja/components/expansion-panels/
 -->

- 效果:
- 点击按钮后 按钮向下移动 展现出内容


- 位置
- /src/javascripts/components/UpwardExpansion


```html
<template>
  <p class="text">デフォルトで表示されるコンテンツ</p>


  <UpwardExpansion>
    <p class="text">OPEN時に表示されるコンテンツ</p>
  </UpwardExpansion>
</template>
```


> FAQ折叠面板
> <FaqExpansionList>
- 这个就是FAQ专用的面板

- 属性
- list[必須]：
  Object{ question: "", answer: "" }のリスト

- hdg:
  見出しテキスト


- 位置:
- /src/javascripts/components/FaqExpansionList

```html
<template>
  <p class="text">デフォルトで表示されるコンテンツ</p>

  
  <FaqExpansionList :list="list" :hdg="よくある質問" />
</template>
```

```js
list: [
  {
    question: "クルマのサブスク「KINTO」とは何ですか？",
    answer:
      "好きなクルマ1台を、トヨタ車は3年/5年/7年間、レクサス車は3年間お楽しみいただけるサービスです。...",
  }
]
```


### お役立ち記事
> <MagazinePosts>
- 效果
- 还是并列的卡片 一行行的 使用的是Card组件的默认样式

- 属性:
- 如果没有指定 car-name title的情况下 默认是「車のお役立ち情報」

- car-name: 车种名
- car-en-name: 车种英文名
- title: [变量] + のお役立ち情報
- magazine-ids[必須]: 記事IDのリスト

- 位置:
- /src/javascripts/components/MagazinePosts


```html
<template>
  <MagazinePosts
    title="法人活用"
    :magazine-ids="magazineIds"
  />

  <MagazinePosts
    car-name="ルーミー"
    car-en-name="roomy"
    :magazine-ids="magazineIds_2"
  />
</template>
```

```js
 magazineIds: [
  "column_20200424-1",
  "column_201912-002",
  "column_202002-001",
],
magazineIds_2: [
  "column_20210219-1",
  "column_20210413-1",
],
```



### BannerArea
- 自定义的vue组件
- 就是一个长条形的Banner图片

- 属性:
- list[必须]: 数组对象
- link[必须]: url
- sp-img[必须]: sp尺寸时的图片路径
- pc-img[必须]: pc尺寸时的图片路径
- alt[必须]
- cation: banner上面的caption文本
- blank: 别的窗口打开 默认是false
- ga: GA标签(DataLayerにpushするObject)

```html
<template>
  <BannerArea
    :list="bannerList"
  />
</template>
```

```js
bannerList: [
  {
    link: "/kinto_one/lexus/",
    spImg: "/assets/img/kinto_one/lineup/lexus/common/bnr_kintoforlexus_sp.jpg",
    pcImg: "/assets/img/kinto_one/lineup/lexus/common/bnr_kintoforlexus.jpg",
    alt: "KINTO for LEXUS",
    caption: "<span class=\"heading:en\">KINTO ONE</span> (レクサス)の詳細",
    blank: false,
    ga: {
      "event": "clickeventtrigger",
      "event_category": "banner_area",
      "event_action": "click",
      "event_label": "bnr_online_counseling"
    }
  },
]
```


### 面包屑导航
- 自定义的组件
- 默认就是带着 ホーム 的

- 属性:
- list[必须]: 数组对象
  - text[必须]: 文本
  - href: 连接

- 位置:
- /src/javascripts/components/Breadcrumbs

```html
<template>
  <Breadcrumbs
    :list="breadcrumbList"
  />
</template>
```

```js
breadcrumbList: [
  {
    text: "KINTO ONEとは",
    href: "/kinto_one/"
  },
  {
    text: "契約プラン",
    href: "/select_plan/"
  },
  {
    text: "初期費用フリープラン"
  }
]
```


### 车种 見積りボタン
> <CarCvButtons>
- 自定义的组件
- 任意车种的价格和見積りボタン组合的时候用得

- 属性
- url[必须]: 
  見積りURL (パラメータ無し/../step1まで)

- show-price:
  価格の表示フラグ：(Default: true)

- price:
  show-price=trueの場合に表示する価格

- brand-type：ブランド


- 位置:
- /src/javascripts/components/CarCvButtons

```html
<template>
  <CarCvButtons
    url="/customer/simulation/roomy/step1"
    :show-price="true"
    price="14,630"
    brand-type="toyota"
  />
</template>
```


### CTAボタン
> <CtaBlock>
- CTAボタンと見出し、リード文のセットを表示するコンポーネントです。

- 属性:
- type[必须]: CTA種類(下記のいずれか)
  - payment_simulation
    料金比較ツール

  - replacement_simulation
    買い替えシミュレーション

  - dealers
    お近くのお店を探す

- type对应的值就是按钮上面的值


- 位置:
- /src/javascripts/components/CtaBlock

```html
<CtaBlock
  type="payment_simulation"
/>
<CtaBlock
  type="replacement_simulation"
/>
<CtaBlock
  type="dealers"
/>
```


### お問い合わせ
- 专用的组件
- 自定义组件
- お問い合わせのリンクセットを表示するコンポーネントです。

- 直接使用就可以 现成的

- 位置
- /src/javascripts/components/CtaContact

> <CtaContact>

```html
<template>
  <CtaContact />
</template>
```


### オンライン相談導線
- 一堆小女孩的banner

> <CtaOnlineMeeting>
- 里面使用了<BannerArea>

- 位置:
- /src/javascripts/components/CtaOnlineMeeting

```html
<template>
  <CtaOnlineMeeting />
</template>
```


### 契約プランについて
> <PlansDescription>
- 契約プランについての解説を表示するコンポーネントです。

- 使用下面的属性 指定标题
- disabled：開閉機能無しフラグ(Default: false)
- on-toggle：開閉時に実行する関数(Default: null)

- 位置:
- /src/javascripts/components/PlansDescription

```html
<template>
  <PlansDescription />
  <PlansDescription
    disabled="true" />
</template>
```


### 月額利用料に含まれる費用リスト (コミコミ内容)
- 一个イラスト图
> <SubscriptionOptions>

- 属性
- lead 小标题

- 位置:
- /src/javascripts/components/SubscriptionOptions

```html
<SubscriptionOptions
  lead="マイカーにかかる費用がコミコミ&定額"
/>
```


### 車種紹介「○○について」
> <CarModelOverview>
- 車種LPで車種について紹介を表示するコンポーネントです。

> ◯◯とは

- 属性
- carName[必須]：表示用車種名
- carEnName[必須]：車種英語名(車種詳細ページのパス、画像パスに使用)

- ga：GAタグ用ユニーク文字列
- hdgClass：見出しに追加付与するclass名 (任意の文字列)

- wrapClass：セクション全体に追加付与するclass名 ("dark", または任意の文字列)

- 位置
- /src/javascripts/contents/lp/components/CarModelOverview


```js
<template>
  // 画像指定なし/追加classなし/車種詳細あり
  <CarModelOverview
    car-name="ノア"
    car-en-name="noah">

    <template #inText>
      <p class="text">テキストが入ります。PCでは画像の右側に回り込みます。</p>
      <p class="text">テキストが入ります。テキストが入ります。テキストが入ります。</p>
    </template>

    <template #outText>
      <p class="text">テキストが入ります。PCでは画像の下にレイアウトされます。</p>
      <p class="text">テキストが入ります。テキストが入ります。テキストが入ります。</p>
    </template>
  </CarModelOverview>



  // 画像指定あり/追加classあり(dark)/車種詳細なし
  <CarModelOverview
    car-name="ノア・ヴォクシー"
    img-file="/lp/noah_voxy/assets/img/img_overview.jpg"
    width="327"
    height="317"
    wrap-class="dark">

    <template #inText>
      <p class="text">テキストが入ります。PCでは画像の右側に回り込みます。</p>
      <p class="text">テキストが入ります。テキストが入ります。テキストが入ります。</p>
    </template>

    <template #outText>
      <p class="text">テキストが入ります。PCでは画像の下にレイアウトされます。</p>
      <p class="text">テキストが入ります。テキストが入ります。テキストが入ります。</p>
    </template>

  </CarModelOverview>
</template>
```


### コスト比較表
> <CostCompareTable>
- 两个比较的表格

- 属性:
- data[必須]：
  料金比較表、維持コスト表の値Object

- hdg：
  見出しテキスト要素 (デフォルトから変更する場合のみ/html可)

- hdgClass
  見出しに追加付与するclass名 (任意の文字列)

- wrapClass
  セクション全体に追加付与するclass名 ("dark", または任意の文字列)

- slot#lead：
  リードテキスト要素

<!-- 
  タブ(SP)の背景色、およびテーブルのカラーリングは、:v-deepを利用して変更可能です。


  下記のテンプレートを親コンポーネントに配置し、各変数の値を変更してください。

  @use "/src/style/system/foundation/global" as g;

  ::v-deep {
    $p-col-tab-active: #333333;       // アクティブタブの背景色(白文字)
    $p-col-table-border: #cccccc;     // テーブルのボーダー色
    $p-col-table-bg-base: #ffffff;    // テーブルのセル基本背景色
    $p-col-table-bg-self: #ffffff;    // KINTOセルの背景色
    $p-col-table-header-sp: #aaaaaa;  // 見出しセルの背景色(SP)
    $p-col-table-header-pc: #aaaaaa;  // 見出しセルの背景色(PC)

    .cost-wrap {
    .tab {
    border-bottom-color: $p-col-tab-active;
    &-item.is-active {
    background: $p-col-tab-active;
    }
    }
    }
    .cost-table,
    .mainte-table {
    th,
    td {
    border-color: $p-col-table-border;
    }
    td.self {
    background: $p-col-table-bg-self;
    }
    }
    .cost-table {
    th:not(.self) {
    background: $p-col-table-header-pc;
    }
    tbody tr.term td {
    background: $p-col-table-header-sp;
    @include g.mq {
    background: $p-col-table-bg-base;
    }
    &.self {
    @include g.mq {
    background: $p-col-table-bg-self;
    }
    }
    }
    }
    .mainte-table {
    thead {
    th:not(.self) {
    background: $p-col-table-header-pc;
    }
    }
    tbody {
    th {
    background: $p-col-table-header-sp;
    @include g.mq {
    background: $p-col-table-header-pc;
    }
    }
    }
    }
    }
 -->

- 位置:
- /src/javascripts/components/CostCompareTable


```html
<template>
  <!-- 
    デフォルト見出し/リードなし/デフォルトカラー 
  -->
  <CostCompareTable :data="costData" />


  <!-- 
    見出しクラス付き/リードあり/ダークカラー 
  -->
  <CostCompareTable
    :data="costData"
    wrap-class="dark"
    hdg-class="hdg-highlight"
  >
    <template #lead>
      <h3 class="heading:6:center">ヴォクシーの場合</h3>
      <ul class="list:normal margin:bottom:0">
        <li>S-Gグレード(HEV/2WD)、オプション(ETC2.0ユニット、バックガイドモニター、フロアマット)にて算出</li>
      </ul>
    </template>
  </CostCompareTable>
</template>
```

```js
data() {
  return {
    costData: {
      self: {...},
      credit: {...},
      cash: {...},
    },
  }
}

<style lang="scss" scoped$gt;
  ::v-deep .hdg-highlight {...}
</style>
```