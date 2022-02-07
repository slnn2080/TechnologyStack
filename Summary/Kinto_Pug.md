### 整理要点:
- 1. 给mixin上添加class的格式
```js
+m-txt(...)(class="xxx")
```

---------------

### 按钮相关
- 按钮她封装了一个mixin 
- *可以给mixin添加class样式 (class="hoge")* 如下

> 格式:

- 按钮1
- 按钮2
- 按钮3


- 按钮类型1:
- 效果：
- 蓝绿色背景 文字后面有 icon

```js
// 普通格式: icon是箭头
+m-btn("/","プライマリーボタン")

// 新窗口打开格式: icon是新窗口的图标
+m-btn("/","プライマリーボタン")(target="_blank")(class="hoge")

// 别窗口打开格式: icon是pdf图标
+m-btn("hoge.pdf","プライマリーボタン")(target="_blank")
```


- 按钮类型2:
- 效果：
- icon都是箭头 但是颜色不一样

```js
// 白色按钮
+m-btn-w("/","プライマリーボタン")

// 红色按钮
+m-btn-r("/","プライマリーボタン")

// 禁用了的按钮
+m-btn-disable("/","プライマリーボタン")
```


> 格式:
- 一排两列的按钮格式

- 按钮1 按钮2

```js
+m-btn-2col("/","プライマリーボタン","/","プライマリーボタン")
```


> 格式:
- 一排三列的按钮格式

- 按钮1 按钮2 按钮3

```js
+m-btn-3col("/","プライマリーボタン","/","プライマリーボタン","/","プライマリーボタン")
```

---------------

### 見出し相关
- 見出し一共有4种类型

- 区别:
- 在于字号

- 1. +m-hdg-01("見出し01234 + ABCDEFG")
- 1. +m-hdg-02("見出し01234 + ABCDEFG")
- 1. +m-hdg-03("見出し01234 + ABCDEFG")
- 1. +m-hdg-04("見出し01234 + ABCDEFG")

> +m-hdg-01
```css
{
  font-family: "Noto Sans JP", sans-serif;
  font-weight: bold;
  font-size: 2.8rem;
  margin-bottom: 4.8rem;
  line-height: 1.5;
}
```

> +m-hdg-02
```css
{
  font-family: "Noto Sans JP", sans-serif;
  font-size: 2.4rem;
}
```

> +m-hdg-03
```css
{
  font-size: 2rem;
}
```

> +m-hdg-04
```css
{
  font-size: 1.6rem;
}
```


> Hero标题
- 这个应该是一个满屏 背景色是浅灰的一个效果

- 格式1:
- 只有大标题

```js
+m-hero-heading("見出し01234 + ABCDEFG")
```


- 格式2:
- 大标题 和 caption

```js
+m-hero-heading-caption("見出し01234 + ABCDEFG","テキスト01234 + ABCDEFG")
```

---------------

### 正文相关
- 普通文本的字号都是14px
- 强调文本的字号都是16px 加粗

- 文本的对象方式 是通过类名来控制的
- 此部分中包含了各种对齐的方法 和 修改的方法

> 普通文本14px的情况下
> 左对齐
- 此为正常的方式

```css
class="m-txt__normal"
```

> 右对齐
```css
class="m-txt__normal m-txt__normal--right "
```

> 居中对齐
```css
class="m-txt__normal m-txt__normal--center "
```

> 加粗显示
```css
class="m-txt__normal m-txt__normal--bold "
```


> 强调加粗文本16px的情况下
> 左对齐
- 此为正常的方式

```css
class="m-txt__strong"
```

> 右对齐
```css
class="m-txt__strong m-txt__strong--right "
```

> 居中对齐
```css
class="m-txt__strong m-txt__strong--center "
```

> 加粗显示
```css
class="m-txt__strong m-txt__strong--bold "
```


> 注释文本 12px
> 左对齐
- 此为正常的方式
```css
class="m-txt__caption"
```

> 右对齐
```css
class="m-txt__caption m-txt__caption--right "
```

> 居中对齐
```css
class="m-txt__caption m-txt__caption--center "
```


> 注释文本 10px
> 左对齐
- 此为正常的方式
```css
class="m-txt__annotation"
```

> 右对齐
```css
class="m-txt__annotation m-txt__annotation--right "
```

> 居中对齐
```css
class="m-txt__annotation m-txt__annotation--center "
```


> 红色强调文本14px
- m-txt__correction


> 有缩进的段落文本 首行左-1em 段落整体右1em
> 普通文本
- m-txt__normal m-txt__indent

> 红色强调文本
- m-txt__correction m-txt__indent

> 黑色强调文本
- m-txt__strong m-txt__indent

---------------

### a标签的使用相关
- 点击a标签页面内利用锚点的形式进行跳转
- 在sp的情况下 会变成一列
- 还准备了修改的方式

- 效果: 想想自己的做campaign

- 基本样式的类名都是:
- m-nav__anchor

> 默认的页面跳转a连接
- 这是pug中定义的组件
<!-- 
  .components-area
    +anchor-default(anchorArray)
 -->
- 我们需要传入下面的配置项

```js
var anchorArray = [
  {
    link:'#',
    text:'anchor - first'
  },
  {
    link:'#',
    text:'anchor - second'
  },
  {
    link:'#',
    text:'anchor - third'
  },
  {
    link:'#',
    text:'anchor - fourth'
  }
]
```

> 当连接有两行以上的时候
- 看下面的样子 要在原有的基础上 追加一个样式
- 同时也要传入准备好的数据
<!-- 
  .components-area
    +anchor-default(anchorArrayLong)(class="m-nav__anchor--long")
 -->


> 当连接中的内容有两行以上的时候
- 我们要追加这样的样式
<!-- 
  .components-area
    +anchor-default(anchorArrayMultiLine)(class="m-nav__anchor__2row")
 -->


> 当连接的宽度是规定的时候
- 我们要追加这样的样式
<!-- 
  .components-area
    +anchor-default(anchorArray)(class="m-nav__anchor--fixed")
 -->

---------------

### pug的使用方式
> 1. 使用pug给html结构添加样式的方式
- 要点:
- : 要进行转义 \:
```html
<div class="l-content:center">

div(class="l-content\:center")
```

---------------

### 容器 .layout-container
- 一个外层的容器 相当于Wrap用于承装其他的html结构
- 通过类名来指定

                      Extra Small       Small         Small         Medium          Large
                      < 600px           < 905px       < 1240px      < 1440px        >= 1440px

.layout-container     100%              100%          840px         100%-400px      1440px
(default)


.layout-container     100%              100%          100%          100%            100%
:fluid                
(流式布局)


.layout-container     100%              100%          840px         100%-400px      1440px
:fill                 
(有背景色)

<!-- 
  .layout-container:fluid   
      屏幕尺寸大于1440的时候 容器的宽度也是100%
      通常都是添加背景的时候 使用该容器

      在包含内容时，请嵌套。 layau -container。 ！！！！
 -->


> .layout-container:fill .layout-bgcolor:gray
- 是给容器添加背景色 当我们要指定颜色的时候 需要添加类名 layout-bgcolor:gray
```html
<!-- 正常的容器 -->
<section class="layout-container">通常</section>

<!-- 流式布局的容器 内部要嵌套 layout-container 使用 -->
<section class="layout-container:fluid">
  <div class="layout-container">
    <div class="layout-content">横幅100%</div>
  </div>
</section>

<!-- 指定有背景色的容器 指定颜色 -->
<section class="layout-container:fill layout-bgcolor:gray">
  <div class="layout-content">背景色あり グレー</div>
</section>
```

---------------

### 给内容div上的样式
- 该div内容主要用来承装内容结构 通过类名来控制
- div如果上了这个样式后 div内的内容 有各种的对齐方式

> layout-content 相当于 行

- .layout-content
    - x: *左对齐*
    - y: 上对齐
    - h: 100%
    - 换行: 换行


- .layout-content:center
    - x: *居中*
    - y: 上对齐
    - h: 100%
    - 换行: 换行


- .layout-content:right
    - x: *右对齐*
    - y: 上对齐
    - h: 100%
    - 换行: 换行


- .layout-content:row
    - x: 左对齐
    - y: 上对齐
    - h: 100%
    - *换行*: Small的时候换行 Medium以上不换行


- .layout-content:vertical:top
    - x: 左对齐
    - y: *上对齐*
    - h: auto
    - 换行: 换行


- .layout-content:vertical:middle
    - x: 左对齐
    - y: *居中*
    - h: auto
    - 换行: 换行


- .layout-content:vertical:bottom
    - x: 左对齐
    - y: *下对齐*
    - h: auto
    - 换行: 换行


- .layout-content:reverse
    - x: 左对齐
    - y: *下对齐*
    - h: auto
    - 换行: 换行
    - 反转

```html
<section class="layout-container">
  <div class="layout-content">
    <div class="layout-column:3">通常：3/12カラム</div>
    <div class="layout-column:3">通常：3/12カラム</div>
  </div>
</section>

<section class="layout-container">
  <div class="layout-content:center">
    <div class="layout-column:3">センター寄せ:3/12カラム</div>
    <div class="layout-column:3">センター寄せ:3/12カラム</div>
  </div>
</section>
```

---------------

### 栅格 列
> layout-column
- Extra Small   (≒モバイルサイズ)               手机之类的移动端设备
- Small         (≒モバイル〜タブレットサイズ)     平板
- Medium        (≒ラップトップサイズ)            笔记本电脑
- Large         (≒PCサイズ) でコンテナ幅を分割。  Pc



                    Extra Small       Small         Small         Medium          Large
                    < 600px           < 905px       < 1240px      < 1440px        >= 1440px

容器的宽度            0~599px          600~904px      840px         840~1039px      1440px

列数                  4                 8              12            12              12

.layout-column:1    1/4               1/8           2/12            2/12            1/12

.layout-column:2    2/4               2/8           3/12            3/12            2/12

.layout-column:3    3/4               4/8           4/12            4/12            3/12

.layout-column:3    4/4               4/8           4/12            4/12            3/12
:stretch

.layout-column:4    4/4               4/8           6/12            6/12            6/12

.layout-column:5    4/4               4/8           6/12            6/12            5/12

.layout-column:6    4/4               4/8           6/12            6/12            6/12

.layout-column:7    4/4               8/8           8/12            8/12            7/12

.layout-column:8    4/4               8/8           12/12           12/12           8/12

.layout-column:9    4/4               8/8           12/12           12/12           9/12

.layout-column:10   4/4               8/8           12/12           12/12           10/12

.layout-column:11   4/4               8/8           12/12           12/12           11/12

.layout-column:12   4/4               8/8           12/12           12/12           12/12

.layout-column:stretch: 配合邻接的列伸缩。请一定要和layot -content:row搭配使用。

<!-- 
    / 满屏

    当屏幕调节为对应的尺寸的时候 该列占满屏的多少
 -->

```html
<section class="layout-container">
<div class="layout-content">
  <div class="layout-column:6"></div>
  <div class="layout-column:6"></div>
    ...
</div>

<!-- 使用layout-column:stretch的时候 外层一定要用 layout-content:row -->
<div class="layout-content:row">
  <div class="layout-column:3"></div>
  <div class="layout-column:stretch"></div>
</div>
</section>
```

---------------

### 列内的配置
- 比如我们每一个列是一个div的情况下 该配置就是调整div内的对齐方式
- 也是通过类名来控制

> .layout-align
- 控制列内元素的*水平方向的对齐方式*

- .layout-align:left
- .layout-align:center
- .layout-align:right

```html
<section class="layout-container">
  <div class="layout-content">
    <div class="layout-column:3 layout-align:left"></div>
    <div class="layout-column:3 layout-align:center"></div>
    <div class="layout-column:3 layout-align:right"></div>
  </div>
</section>
```

---------------

### 控制标题的样式
- 也是通过样式来控制

> .heading:num

                      Extra Small, Small         Medium          Large
                      < 1240px                   < 1440px        >= 1440px

heading:1
  - font-size:        40px                       88px             88px
  - margin-bottom:    24px                       24px             32px
  - weight:           700                        700              700
  - line-height:      1.5                        1.5              1.5


heading:2
  - font-size:        32px                       64px             64px
  - margin-bottom:    24px                       24px             32px
  - weight:           700                        700              700
  - line-height:      1.5                        1.5              1.5


heading:3
  - font-size:        28px                       48px             48px
  - margin-bottom:    24px                       24px             32px
  - weight:           500                        500              500
  - line-height:      1.5                        1.5              1.5


heading:4
  - font-size:        24px                       36px             36px
  - margin-bottom:    24px                       24px             32px
  - weight:           500                        500              500
  - line-height:      1.5                        1.5              1.5


heading:5
  - font-size:        20px                       28px             28px
  - margin-bottom:    24px                       24px             32px
  - weight:           500                        500              500
  - line-height:      1.5                        1.5              1.5


heading:6
  - font-size:        16px                       24px             24px
  - margin-bottom:    24px                       24px             32px
  - weight:           500                        500              500
  - line-height:      1.5                        1.5              1.5

```html
<h1 class="heading:2">見出し2</h1>
```


> heading:en
- 当标题是英文的时候 可能标题中包含英文的时候 我们使用该class
```html
<h1 class="heading:2">
  見出し2
  <span class="heading:en">
    Heading02
  </span>
</h1>
```

---------------

### 控制文本的样式
- 这个部分的样式 指定了本文的字号和行间 下外边距 字体粗细等

> .text
                      Extra Small, Small         Medium          Large
                      < 1240px                   < 1440px        >= 1440px

.text
  - font-size:        14px                       16px             16px
  - margin-bottom:    24px                       24px             32px
  - weight:           normal                     normal           normal
  - line-height:      2                          2                2


.text:strong  - *太字*
  - font-size:        14px                       16px             16px
  - margin-bottom:    24px                       24px             32px
  - weight:           500                        500              500
  - line-height:      2                          2                2


.text:sub  - *キャプション、注釈などに使用します。*
  - font-size:        12px                       14px             14px
  - margin-bottom:    24px                       24px             32px
  - weight:           normal                     normal           normal
  - line-height:      2                          2                2


.text:hairline  - *画像のキャプションなど、より小さいサイズの文字列に使用します。*
  - font-size:        10px                       12px             12px
  - margin-bottom:    24px                       24px             32px
  - weight:           normal                     normal           normal
  - line-height:      2                          2                2



> .text:en
- 给英文的部分添加该样式
```html
<p class="text">
  利用規約
  <span class="text:en">
    TERMS AND CONDITIONS(TOYOTA) [2022.01.01]
  </span>
</p>
```


> .text-align
- 控制文本的对齐方式
- 该样式可以对文本以外的元素使用

- text-align:left
  - 文本左对齐

- text-align:center
  - 文本居中对齐

- text-align:right
  - 文本右对齐

- text-align:float
  - <1240左对齐  <1440居中对齐  >1440居中对齐

```html
<p class="text-align:left">左寄せ</p>
<p class="text-align:center">センター寄せ</p>
<p class="text-align:right">右寄せ</p>
<p class="text-align:float">左寄せ/センター寄せ</p>
```

---------------

### 列表相关的样式
- 这个部分的样式是添加在 ul ol 上的

> .list:normal
- 样式:   小圆点
- 字号:   14px


> .list:plane
- 样式:   无
- 字号:   14px


> .list:sub
- 样式:   小圆点
- 字号:   12px


> .list:caption
- 样式:   米字型
- 字号:   12px


> .list:caption:counter
- 样式:   米字型+可变数字
- 字号:   14px

```html
<ul class="list:normal">
  <li>normal 1</li>
  <li>normal 2</li>
  <li>normal 3</li>
</ul>

<ul class="list:plane">
  <li>plane 1</li>
  <li>plane 2</li>
  <li>plane 3</li>
</ul>

<ul class="list:sub">
  <li>sub 1</li>
  <li>sub 2</li>
  <li>sub 3</li>
</ul>

<ul class="list:caption">
  <li>caption 1</li>
  <li>caption 2</li>
  <li>caption 3</li>
</ul>

<ul class="list:caption:counter">
  <li>caption-counter 1</li>
  <li>caption-counter 2</li>
  <li>caption-counter 3</li>
</ul>

```

---------------

### a标签相关的样式
- 该部分的样式是添加在a标签上的 可以设定文本的状态和链接上的图标
- 当我们给a链接添加 target="_blank" 的时候 链接上的图标就会变成对应的样式
- 当我们给a链接添加 href="xxx.pdf" 的时候 链接上的图标就会变成对应的样式
- 

> .link:normal
- font-size: 14px
- font-weight: normal
- text-decoration: underline


> .link:strong
- font-size: 14px
- font-weight: 500
- text-decoration: underline


> .link:noline
- font-size: 14px
- font-weight: normal
- text-decoration: none

```html
<a href="#" class="link:normal">テキストリンク</a>
<a href="#" target="_blank" class="link:normal">別窓テキストリンク</a>
<a href="#xxx.pdf" class="link:normal">PDFテキストリンク</a>
<a href="#" class="link:strong">太字テキストリンク</a>
<a href="#" class="link:noline">下線なしテキストリンク</a>
```

---------------

### 画像相关的样式操作
> .image
- 该样式是给 *包裹img图片的外层容器上添加的样式* 内包的img的宽度和下边距会根据class 自动调整

> .image:normal
- 内层的画像宽度是100%
- 内层的画像的下外边距是0


> .image:block
- 内层的画像宽度是100%
- 内层的画像的下外边距是24

```html
<div class="image:block">
  <img src="/assets/img/car_image/lineup_ux.png">
</div>
<div class="text">image:block(margin-bottomあり)</div>

<div class="image:normal">
  <img src="/assets/img/car_image/lineup_ux.png">
</div>
<div class="text">image:normal(marginなし)</div>
```

---------------

### margin相关的操作
- 这个部分我们可以给元素 添加控制影响外边距的class
- .margin:left:xs など、マージンを付与する辺とサイズを指定することができます。
- :gutterを指定すると、breakpointに応じた要素間マージンが適用されます。


> .margin:left:0      - 0px
- 左边距为 0 (<1440px)
- 左边距为 0 (>=1440px)


> .margin:left:gutter - 24px
- 左边距为 24px (<1440px)
- 左边距为 32px (>=1440px)


> .margin:left:xs     - 4px
- 左边距为 4px (<1440px)
- 左边距为 4px (>=1440px)


> .margin:left:sm     - 8px
- 左边距为 8px (<1440px)
- 左边距为 8px (>=1440px)


> .margin:left:md-sm  - 16px
- 左边距为 16px (<1440px)
- 左边距为 16px (>=1440px)


> .margin:left:md     - 24px
- 左边距为 24px (<1440px)
- 左边距为 24px (>=1440px)


> .margin:left:md-lg  - 32px
- 左边距为 32px (<1440px)
- 左边距为 32px (>=1440px)


> .margin:left:lg     - 48px
- 左边距为 48px (<1440px)
- 左边距为 48px (>=1440px)


> .margin:left:xl     - 64px
- 左边距为 64px (<1440px)
- 左边距为 48px (>=1440px)


> .margin:left:xxl    - 80px
- 左边距为 80px (<1440px)
- 左边距为 80px (>=1440px)

> .margin:bottom:[*] 的规律和上面的一样
- 不知道有没有right 和 top

```html
<p class="text">通常テキスト(margin-bottom:gutter)</p>
<p class="text margin:bottom:0">通常テキスト margin-bottom:0</p>
<p class="text margin:bottom:xl">通常テキスト margin-bottom:xl</p>
```

---------------

### 元素的显示和隐藏操作
- 在这个部分 我们通过给元素添加  .show class样式 在下面的各个断点的时候 控制元素的显示和隐藏

                  Extra Small       Small         Small         Medium          Large
                  < 600px           < 905px       < 1240px      < 1440px        >= 1440px

show:sm           block             block         block         none            none        Smallまで表示

show:sm:inline    block             block         block         none            none        Smallまで表示

show:sm-md        block             block         block         block           none        Small〜Mediumまで表示

show:sm-md:inline block             block         block         block           none        Small〜Mediumまで表示

show:md           none              none          none          block           block       Medium以上で表示

show:md:inline    block             block         block         none            none        Medium以上で表示

show:lg           none              none          none          none            block       Large以上で表示

show:lg:inline    none              none          none          none            block       Large以上で表示

```html
<div class="show:sm">Smallまで表示</div>
<div class="show:sm-md">Small〜Mediumまで表示</div>
<div class="show:md">Medium以上で表示</div>
<div class="show:lg">Large以上で表示</div>
```

---------------

### 电话号码上的样式
- 项目中的电话号码是通过a标签创建的 可以点击的
- 这个部分中 我们可以通过 class样式 控制 在各个断点的时候 电话号码是否可以被点击

> .enable-tel:sm
- md以下的断点均可以点击 也就是说它认为pc端不用点击功能 移动端才可以点击

  Extra Small       Small         Small         Medium          Large
  < 600px           < 905px       < 1240px      < 1440px        >= 1440px

  enable            enable        enable        disable         disable 

---------------

### 改行位置的调整
> .word-break 
- 外层容器上的样式 写上该样式的容器 表示内部的元素要进行换行处理

> .word-break:child
- 被该样式包裹的元素 *当屏幕尺寸不够的时候 不会折行* 没有包上的部分会折行

- 相当于使用 .word-break:child 将一行文本分成了几段 当屏幕尺寸不够的时候 会在连接处折行

<!-- 
  <span class="word-break">とすると、<span class="word-break">で囲まれた箇所をinline-blockとして扱います。
 -->

```html
<h3 class="heading:3 word-break">
  <!-- KINTOなら被word-break:child包裹上了 说明这个部分不会折行 -->
  <span class="word-break:child">
    <span class="heading:en">KINTO</span>なら
  </span>

  <span class="word-break:child">
    頭金0円〜！
  </span>
  
  <span class="word-break:child red--text">
    初期費用
  </span>
  
  <span class="word-break:child red--text">
    フリープラン
  </span>
</h3>


<h3 class="heading:3">
  <span class="word-break">
    <span class="word-break:child">
      <span class="heading:en">KINTO</span>なら
    </span>
    
    <span class="word-break:child">
      頭金0円〜！
    </span>
  </span>
  

  <span class="word-break red--text">
    <span class="word-break:child">
      初期費用
    </span>
    <span class="word-break:child">
      フリープラン
    </span>
  </span>
</h3>
```

---------------

### 颜色  -- 背景色
- 我们可以通过类名给元素添加背景色
- .颜色名

> .primary
- kinto的蓝色

> .secondary
- 浅蓝色

> .accent
- 黄色

> .red
- 红色

> .black
- 黑色

> .white
- 白色

```html
<div class="primary">primary：KINTOブルー</div>
<div class="secondary">secondary：セカンダリカラー(#E7F7F7)</div>
<div class="accent">accent：アクセントカラー(#FED935)</div>
<div class="red">red：注意喚起・エラー等</div>
<div class="black">black：黒(#000)</div>
<div class="white">white：白(#FFF)</div>
```

---------------

### 颜色  -- 文字颜色
- 我们可以通过类名给元素内的文字添加字体颜色
- .颜色名--text

> .primary--text
- kinto的蓝色

> .secondary--text
- 浅蓝色

> .accent--text
- 黄色

> .red--text
- 红色

> .black--text
- 黑色

> .white--text
- 白色

```html
<p> class="text primary--text">primary：KINTOブルー</p>
<p> class="text secondary--text">secondary：セカンダリカラー(#E7F7F7)</p>
<p> class="text accent--text">accent：アクセントカラー(#FED935)</p>
<p> class="text red--text">red：注意喚起・エラー等</p>
<p> class="text black--text">black：黒文字(#000)</p>
<p> class="text white--text">white：白文字(#FFF)</p>
```

---------------

### Sass变量 -- Sass变量的使用
- 该部分的内容是写在<style>标签里面的 通过下面的方式 使用sass中定义的变量

> $col-{colorName}

```html
<template>
  <div class="layout-column:4 text color-sample-primary">$col-primary：KINTOブルー</div>
  ...
  <div class="color-sample-anchor">$col-anchor：リンクテキスト(#009DC5)</div>
</template>


<style lang="scss" scoped>
  @use "/src/style/system/foundation/global" as g;
  .color-sample-primary { background-color: g.$col-primary; }
  ...
  .color-sample-anchor { background-color: g.$col-anchor; }
</style>
```

---------------

### 媒体查询的使用方式 -- Sass变量的使用
- 该部分的使用方式也是通过Sass变量的使用方式来使用
- 前提:
- 需要引入scss文件:
- @use "/src/style/system/foundation/global" as g;

> @include g.mq(屏幕尺寸变量md) { ... }
- 在对应的断点的位置 会执行方法体中的逻辑


- 屏幕尺寸变量:
- xs:     当屏幕尺寸 < 600px    (Extra Small)

- sm:     当屏幕尺寸 < 905px    (Small)

- sm-md:  当屏幕尺寸 < 1240px   (Small)

- md:     当屏幕尺寸 < 1440px   (Medium)

- lg:     当屏幕尺寸 >= 1440px  (Large)

```html
<template>
  <p class="text:strong text-color:responsible">breakpointに応じてテキストカラーを変更します。</p>
<template>


<style lang="scss" scoped>
@use "/src/style/system/foundation/global" as g;

.text-color-responsible {
  color: black;
  @include g.mq(sm) {
    color: red;
  }
  @include g.mq(sm-md) {
    color: purple;
  }
  @include g.mq() {
    color: orange;
  }
  @include g.mq(lg) {
    color: green;
  }
}
</style>
```

---------------

### MarginBottom -- Sass变量的使用
- 这个也是通过sass变量的使用方式 在各个断点的位置 会有不同的marginBottom

- 前提:
- @use "/src/style/system/foundation/global" as g;

- 使用方式:
> @include g.mgn-bottom();
- 作用:
                    Extra Small       Medium        Large
                    Small
                    < 1240px          < 1440px      >= 1440px

  margin-bottom:    24px              24px          32px

```html
<template>
  <p class="margin-sample">Paragraph1</p>
  <p class="margin-sample">Paragraph2</p>
<template>


<style lang="scss" scoped>
@use "/src/style/system/foundation/global" as g;

.margin-sample {
  @include g.mgn-bottom();
}
</style>
```

---------------

### ElementWidth -- Sass变量的使用
- 这个也是通过sass变量的使用方式 
- 出去左右margin(也就是元素之前的gutter) 在各个断点的时候 动态计算元素的width
- 也可以说在各个断点 保持gutter的宽度

- 前提:
- @use "/src/style/system/foundation/global" as g;

- 使用方式:
> @include g.element-width(传入相对于父元素的百分比)

- 作用:
            Extra Small       Medium        Large
            Small
            < 1240px          < 1440px      >= 1440px

  width:    百分比-24px       百分比-24px     百分比-32px

```html
<template>
  <p class="width-sample">Paragraph1</p>
  <p class="width-sample">Paragraph2</p>
<template>


<style lang="scss" scoped>
@use "/src/style/system/foundation/global" as g;

.width-sample {
  @include g.element-width('50%');
}
</style>
```

---------------

### TextBody -- Sass变量的使用
- 可以通过sass变量的使用方式 在各个断点的点上 动态的决定本文的字号大小

- 前提:
- @use "/src/style/system/foundation/global" as g;

> @include g.text-body();
- 作用:
                Extra Small       Medium        Large
                Small
                < 1240px          < 1440px      >= 1440px

  font-size:    14px              14px          16px

```html
<template>
  <p class="text-body-sample">Paragraph1 テキスト</p>
<template>

<style lang="scss" scoped>
@use "/src/style/system/foundation/global" as g;

.text-body-sample {
  @include g.text-body();
}
</style>
```

---------------

### TextSub -- Sass变量的使用
- 可以通过sass变量的使用方式 在各个断点的点上 动态的决定caption文字的字号大小

- 前提:
- @use "/src/style/system/foundation/global" as g;

> @include g.text-sub();

- 作用:
                Extra Small       Medium        Large
                Small
                < 1240px          < 1440px      >= 1440px

  font-size:    12px              12px          14px

```html
<template>
  <p class="text-sub-sample">Caption1 テキスト</p>
<template>

<style lang="scss" scoped>
@use "/src/style/system/foundation/global" as g;

.text-sub-sample {
  @include g.text-sub();
}
</style>
```

---------------

### Gutter -- Sass变量的使用
- 这部分也是使用sass变量 在各个断点的位置上 动态的决定元素和元素之间的间距
- 或者说是动态的给元素上margin值

> css属性名: gutter("断点")
> css属性名: gutter-half("断点")
- border-left-width: gutter("lg")
- border-left-width: gutter-half("lg")

- 前提：
- @use "/src/style/system/foundation/global" as g;

- 作用:
            gutter(参数)    gutter-half(参数)
  xs        24px            12px

  sm        24px            12px

  sm-md     24px            12px

  md        24px            12px

  ls        32px            16px


```html
<template>
  <p class="text gutter-sample:lg">border-left-width: gutter("lg")</p>
  <p class="text gutter-half-sample:lg">border-left-width: gutter-half("lg")</p>
<template>

<style lang="scss" scoped>
@use "/src/style/system/foundation/global" as g;

.gutter-sample {
  &\:lg {
    border-left-width: g.gutter("lg");
  }
}
.gutter-half-sample {
  &\:lg {
    border-left-width: g.gutter-half("lg");
  }
}
</style>
```

---------------

### Column -- Sass变量的使用
- 这部分也是使用sass变量 在各个断点的位置上 动态的决定元素占几列

> column($mq: "xs", $num: 1)
> width: g.column("sm", 4);
- 我们指定在什么断点的情况下 该元素占几列


```html
<template>
  <div class="text column-sample">常に4カラム幅</div>
<template>

<style lang="scss" scoped>
@use "/src/style/system/foundation/global" as g;

.column-sample {
  width: g.column("xs", 4);

  @include g.mq(sm) {
    width: g.column("sm", 4);
  }

  @include g.mq(sm-md) {
    width: g.column("sm-md", 4);
  }

  @include g.mq(md) {
    width: g.column("md", 4);
  }

  @include g.mq(lg) {
    width: g.column("lg", 4);
  }
}
</style>
```