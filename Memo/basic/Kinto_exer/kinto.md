### Kinto项目 页面练习 要点集锦

### css3属性
> ::before ::after
- 它们是伪元素 但也可以理解为 *目标元素的第一个子元素* 会插入到其它子元素的前面


> -webkit-text-size-adjust: 100%
- 在移动端为防止字体变大, 添加-text-size-adjust属性为100%可防止字体变大
- 放在body会导致页面缩放失效, 可以使body继承html的样式
- CSS 控制将一些手机或平板设备上使用的文本溢出算法(text inflation algorithm)。其他类型的设备上的浏览器会忽略此属性。

> 作用:
- 检索或设置移动端页面中对象文本的大小调整。

> 要点:
- 该属性只在移动设备上生效
- *如果你的页面没有定义meta viewport, 此属性定义将无效*


    因为许多网站还没有适配屏幕较小的设备, 移动设备的浏览器和桌面浏览器在渲染网页时可能会有不同。
    
    他们不是以设备屏幕宽度布局网页, 而是用比屏幕宽一些的 视窗 去布局网页, 通常是 800 到 1000 像素。
    
    为了将视窗上的布局映射到原始设备屏幕上, 手机浏览器要么只渲染整个页面的一部分, 要么将视窗缩放至原始屏幕大小。

    因为缩放适配小屏幕而导致文字会变得很小, 许多手机浏览器会使用文本溢出算法放大文本, 改善可读性。
    
    当一个包含文本的元素使用了 100% 的屏幕宽度, 该算法会增加文本大小, 但是不会修改布局。
    
    *text-size-adjust* 这个属性允许开发者去除或者修改浏览器的这种行为, 比如, 当网页已经适配了小屏幕之后, 就不需要这么做了。


------

> initial属性值
- 修改所有元素属性 或 父元素的值为其 *初始化值(浏览器的默认值)*


> inherit属性值
- 修改所有元素属性 或 父元素的值为其 *父元素的值*(是继承的意思, 跟随父元素的值的变化而变化)


> unset属性值
- 修改所有元素属性 或 父元素的值为其 *父元素的值*(如果有继承)或其初始值(具有继承特性的CSS, 则使用继承, 例如color)

------

> @media
> 格式: @media [媒体类型] (媒体特性) { ... }
- 每条媒体查询语句都由一个 *可选的媒体类型* 和 *任意数量的媒体特性* 表达式构成。
- 可以使用 *多种逻辑操作符* 合并多条媒体查询语句。

- 当媒体类型(如果指定)与在其上显示文档的设备匹配并且所有媒体功能表达式都计算为 true 时, 媒体查询将计算为 true。涉及未知媒体类型的查询始终为 false。

> 媒体类型:
- 指的就是设备类型

- all
  所有设备

- print
  打印设备

- screen
  带屏幕的设备

- speech
  屏幕阅读器

- projection
  手持设备

- tv
  电视

- braille
  盲文触觉设备

- embossed
  盲文打印机

- speech
  "听觉"类似的媒体设备

- tty
  不适用像素的设备


> 媒体特性:
- width：
  视口的宽度, 一般情况下不管宽度只管高度

- height：
  视口的高度

- min-width
  视口的最小宽度  >500 样式生效

- max-width
  视口的最大宽度  <500 样式生效

- device-width (max min)
  设备独立尺寸

- device-pixel-ratio(必须加-webkit-前缀) (max min)
  像素比

- orientation     portrait竖屏
  landscape横屏
  横竖屏切换

- resolution
  输出设备的像素密度(分辨率)


> 逻辑操作符:
  only        让老的浏览器失效 处理兼容的问题
  and         同时满足多条规则
  ,           满足a生效 或者 满足b也生效
  not         取反

```css
/* ,的用法 当 大于500 或者 小于700 的时候样式生效*/
@media (min-width: 500px), (max-width: 700px) {

}

/* > 500px  和  <700px  同时要求满足  */
@media (min-width:500px) and (max-width:700px) {
    
}

/* 必须是屏幕 在500-700之间 */
@media only screen and (min-width:500px) and (max-width:700px) {
    background-color:#bfa;
}
```

> 结合scss的使用方式:
```scss
@use "./assets/style/foundation/global" as g;

$breakpoint: (
  md: "only screen and (min-width: 835px)"
);

@mixin mq($key: md) {
  @media #{map-get($breakpoint, $key)} {
    @content;
  }
}

.l-cnt__main {
  width: 100%;
  max-width: 1008px;
  margin: 0 auto 60px;
  background-color: gold;

  @include mq() {
    background-color: palevioletred;
  }
}
```

------



----------------

### Google fonts 的使用
> 1. 通过 google 地址请求指定的css
- 方式1:
```html
<!-- 先请求指定的 字体库 -->
<link rel="stylesheet" type="text/css" href="http://fonts.googleapis.com/css?family=Tangerine">

<!-- 然后使用该字体 -->
<style>
  body {
    /* 使用字体的时候 还要后面跟着一个备用的字体 */
    font-family: 'Tangerine', serif;
    font-size: 48px;
  }
</style>
```

- 方式2:
- 这个 @import url() 可能是css里面的用法
```css
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap");
```

**注意:**
- 当在CSS样式表中定义一个网络字体时, 总是要*列出至少一个网络安全的回退字体*(fallback web-safe font)用来避免不希望的行为。

- 特别是在列表的最后*添加一个CSS默认字体*, 像名为"serif"或者"sans-serif"的字体。这样的话在必要的时候浏览器可以回退到它的默认字体。
```scss
body {
  font-family: 'Tangerine', serif;
}
```


> Google Fonts Api的使用方式
- 谷歌字体目录: 
  http://www.google.com/fonts

- 谷歌字体API的BaseUrl: 
  http://fonts.googleapis.com/css

> 参数: 
> ?family=字体名称
- 字体名称之间有空格的情况下要使用 + 连接
- 请求多个字体集时: 要用竖线 *|* 来隔开名字

- 请求字体的样式:
  字体API默认情况下提供了所请求字体的普通版本。要请求其它的样式或大小, 在字体的名字后面加一个冒号 : 
  跟随在后的一系列的样式和大小用逗号(, )分割
```css
@import "url(http://fonts.googleapis.com/css?family=Tangerine:bold,bolditalic|Inconsolata:italic|Droid+Sans)"
```  

- 对于您所请求的每一个样式, 您既可以提供全名也可以提供缩写, 对于大小, 您可以另外指定一个数字：

  样式	符号

  斜体	italic 或 i
  粗体	bold 或 b 或者是一个数字, 就像700
  粗体  斜体	bolditalic 或 bi

- 文档:
- https://developers.google.com/fonts/docs/getting_started
- https://fonts.google.com/ (这个是官网)

> &display=swap
- 让字体文件本身变成异步的——浏览器会先显示我们的回退(fallback)文本, 等Web字体可用时再切换过去。
```scss
@import url("https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700&display=swap");
```

----------------

### scss文件存放位置
- scss 文件应该存放在 src/assets/ 文件目录下

----------------

### 图片存放的位置
- 比如 background-image: url()
- cli3的情况下 放在 public 里面

- 比如:
  | - public
    | - image
      - pic1.png

```scss
div {
  background-image: url(/image/pic1.png);
}
```

----------------

### scss 的前缀名 _ & scss样式组件
- 组件有组件树
  | - 根组件
    | - loginPage组件
      - loginPageParts组件...

    | - cartPage组件
      - cartPageParts组件...


- scss文件也可以组织成样式树

  | - 根样式: 该样式也是最终引入到页面里面的样式
    | - loginPage组件的样式
      - loginPageParts组件的样式...

    | - cartPage组件样式
      - cartPageParts组件样式...


- 所有的 scss文件 也类似一个样式树 那有一个最外层的样式文件 用来包含各个样式组件

- 最终:
- main.js 应该引入一个 style.scss (类似app组件)

- 如果一个目录正在被Sass程序监测, 该目录下的所有scss/sass源文件都会被编译, 但通常不希望局部文件被编译, 
- 因为局部文件是用来被导入到其他文件的。如果不想局部文件被编译, 文件名可以以下划线 （_）开头。

- 每一个模块下对应应该有一个 _all.scss 然后 style.scss 引入各个模块下的 _all.scss

  - style.scss
    | - base
      - _reset.scss
      - _fonts.scss
      - _all.scss

> 要点:
- 1. 这样 style.scss 文件中 引入各个样式组件
- 2. 各个 样式组件 前面需要加上 _ 这样单独的样式组件不会被编译

**注意:**
- 我发现在vue项目里面 我们是用 @use 可以达到样式组件化的目的 但是在普通的vscode里面的项目使用 @use 引入的文件并没有被编译
- 类似 vscode 这种情况我们不能使用 @use 而是要使用 @import

----------------

### _xxx.scss 引入的问题
- 我们在引入 _xxx.scss 文件的时候 不用带 _ 和 后缀
```scss
@use "../../../../node_modules/reset-css/sass/reset"
```

----------------

### Kinto 样式名的命名规则
> .l-cnt__main
- l: 
  是文件夹名字的首字母 kinto的项目在样式目录规划上做了细分 l 可以迅速的定位在哪个样式目录下

- cnt:
  这个样式是管什么的

- __main:
  具体作用于哪一个部分

----------------

### base (文件夹)
- 该文件夹中里面包括 
  1. 使用reset.css修改网站的默认样式 
  2. 内部添加了 自定义的网站的默认样式
  3. 使用的 Google Fonts


> 1. reset.css
- 清除浏览器的默认样式 该scss文件内部 引入了 从下方下载的 reset.css 文件
- npm i reset-css@5.0.1


> 2. font-smoothing
- 作用:
- 该属性的作用就是让页面上的字体变得更加清晰。
- webkit在自己的渲染引擎中*增加的对字体的抗锯齿的调整*, 这个调整在iOS中表现明显, 在Windows中表现不明显

- 一般就是像下面这样使用
```scss
body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

> 3. html font-size: 62.5%
- 一般的, 各大主流浏览器的font-size默认值为 16px, 此时 

  1rem = 16px (12px = 0.75rem)

- 把 html 设置成 font-size: 62.5%, 此时 

  1rem = 16px * 62.5% = 10px( 12px = 1.2rem)
  <!-- (1：10的比例更好换算) -->

```scss
html {
  font-size: 62.5%;
}
```


> 4. device-pixel-ratio 设备像素比
- 参考资料:
- https://blog.csdn.net/xueli_2017/article/details/91492971

> 作用:
- dips可以用来辅助区分 视网膜设备 还是 非视网膜设备, *devicePixelRatio = 几倍屏*

- window.devicePixelRatio是*设备物理像素*和*设备独立像素*之间的比率

  window.devicePixelRatio = 物理像素 / 设备独立像素(dips)

- 设备独立像素也叫做:
- dip或dp(device independent pixels, 设备独立像素)与屏幕密度有关

- 像素比为1的时候 一个发光的二极管就显示1个像素的内容
- 像素比为2的时候 四个发光的二极管就显示1个像素的内容 (2倍 但是长宽各2就是4)
- 像素比为3的时候 九个发光的二极管就显示1个像素的内容


> 扩展:
- 所有非视网膜屏幕的iphone在垂直的时候, 宽度为320物理像素。
- 当你使用<meta name="viewport" content="width=device-width">的时候, 会设置*视窗*布局宽度(不同于视觉区域宽度, 不放大显示情况下, 两者大小一致, 见下图)为320px, 于是, 页面很自然地覆盖在屏幕上

- 这样, 非视网膜屏幕的iphone上, 屏幕物理像素320像素, 独立像素也是320像素, 因此, window.devicePixelRatio等于1.

- 而对于视网膜屏幕的iphone, 如iphone4s, 纵向显示的时候, 屏幕物理像素640像素。同样, 当用户设置<meta name="viewport" content="width=device-width">的时候, 其视区宽度并不是640像素, 而是320像素, 这是为了有更好的阅读体验 – 更合适的文字大小。

- 这样, 在视网膜屏幕的iphone上, 屏幕物理像素640像素, 独立像素还是320像素, 因此, window.devicePixelRatio等于2.


> 设备物理像素:
- 是一个物理概念, 比如设备的分辨率, Phone 5 的分辨率 640 x 1136px。
- 一个个发光的2极管


> 设备独立像素 device-independent pixels (dips):
- 是一个抽象像素, 用于向CSS中的宽度、高度、媒体查询 和 meta 的 viewport 中的 device-width 提供信息。
- 通过观察retina和非retina设备之间的区别, 可以最好地解释它们。

- 比如我们可以自己调节 屏幕的分辨率 1920px 的我们可以调节成 1440px
- 比如 原先用一个1个物理像素 表达 一个像素 现在我们用2个物理像素 表达 一个像素 这时候分辨率就缩小了一半

- 逻辑像素就是用多个发光的二极管显示一个像素的内容


> CSS像素:
- 指的是CSS中使用的逻辑像素。在CSS规范中, 长度单位可以分为两类, 绝对(absolute)单位以及相对(relative)单位。px是一个相对单位, 相对的是设备物理像素。

- 比如iPhone 5 使用的是Retina屏幕, 使用 
  2px x 2px 的设备物理像素  代表 1px x 1px 的 CSS像素, 
  
- 所以设备物理像素为640 x 1136px, 而CSS逻辑像素数为320 x 568px。

- 也就是说 我们可以从两点上来考虑
- 1. 如果 dpr 是 2 的话 那么我们写的css像素当中的 1px 在retina屏下 代表 2px
- 2. 同理 我们设计稿 如果是640px 那么css像素我们就是320px


> dpr就是设置像素比
- 获得设备像素比后, 便可得知 *设备物理像素 与 CSS像素 之间的比例*。
  - 当这个比率为1:1时, 使用1个设备物理像素显示1个CSS像素。
  - 当这个比率为2:1时, 使用4个设备物理像素显示1个CSS像素, 
  - 当这个比率为3:1时, 使用9(3*3)个设备物理像素显示1个CSS像素。

- 关于设计师和前端工程师之间如何协同：
  一般由设计师按照设备像素(device pixel)为单位制作设计稿
  前端工程师, 参照相关的设备像素比(device pixel ratio), 进行换算以及编码。

> 思考:
- 一般普通图在的1920*1080, 是很正常的, 但是如果放在的2k或者4K屏幕里面, 背景图就是模糊掉, 为什么呢？

- 在不同的屏幕上(普通屏幕 vs retina屏幕), css像素所呈现的大小(物理尺寸)是一致的, 不同的是1个css像素所对应的物理像素个数是不一致的。

  普通屏幕:
    1个css像素 对应 1个物理像素(1:1)

  retina屏幕:
    1个css像素对应 4个物理像素(1:4)


```scss
// 引入 reset.css 样式
@use "../../../node_modules/reset-css/sass/reset";

html {
  font-size: 62.5%;
}

// 当大于 dpr > 2 的时候 使文字更加的清晰
@media only screen and (-webkit-min-device-pixel-ratio: 2),
  (-webkit-min-device-pixel-ratio: 2),
  (min-resolution: 2dppx) {
  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
}

body {
  // 默认值: 在大多数non-retina显示这将给最锋利的文本
  -webkit-font-smoothing: subpixel-antialiased;
  // unset: 修改所有元素属性或父元素的值为其父元素的值(如果有继承)或其初始值
  -moz-osx-font-smoothing: unset;
  // 检索或设置移动端页面中对象文本的大小调整。
  -webkit-text-size-adjust: 100%;

  // 使用了 Noto Sans JP 的谷歌字体 并指定了默认字体
  font-family: "Noto Sans JP", sans-serif;
  font-size: 1.4rem;
  -webkit-font-smoothing: subpixel-antialiased;
  line-height: 1.75;
}
```

> 1像素问题
- 在手机上会比较明显
- 由于移动端设备大多数像素比都是大于1的
```html
<style>
  .box {
    width: 500px;
    height: 1px;
    background: red;

    /* 解决方式 像素比为3的时候 2的时候就是0.5 */
    transform: scale(1, 0.333)
  }
</style>
<div></div>
```

---

> 移动端适配相关概念

> 1. 英寸(屏幕对角线的长度)
- 一般用英寸描述屏幕的物理大小，如电脑显示器的17、22，手机显示器的4.8、5.7等使用的单位都是英寸。

> 2. 设备独立像素
- 智能手机发展非常之快，在几年之前，我们还用着分辨率非常低的手机，比如下面左侧的白色手机，它的分辨率是320x480，我们可以在上面浏览正常的文字、图片等等。

- 但是，随着科技的发展，低分辨率的手机已经不能满足我们的需求了。很快，更高分辨率的屏幕诞生了，比如下面的黑色手机，它的分辨率是640x940，正好是白色手机的两倍。

- 理论上来讲，在白色手机上相同大小的图片和文字，在黑色手机上会被缩放一倍，因为它的分辨率提高了一倍。这样，岂不是后面出现更高分辨率的手机，页面元素会变得越来越小吗？

- 然而，事实并不是这样的，我们现在使用的智能手机，不管分辨率多高，他们所展示的界面比例都是基本类似的。乔布斯在iPhone4的发布会上首次提出了Retina Display(视网膜屏幕)的概念，它正是解决了上面的问题，这也使它成为一款跨时代的手机。

- 在iPhone4使用的视网膜屏幕中，把2x2个像素当1个像素使用，这样让屏幕看起来更精致，但是元素的大小却不会改变。

- 如果黑色手机使用了视网膜屏幕的技术，那么显示结果应该是下面的情况，比如列表的宽度为300个像素，那么在一条水平线上，白色手机会用300个物理像素去渲染它，而黑色手机实际上会用600个物理像素去渲染它。

- 我们必须用一种单位来同时告诉不同分辨率的手机，它们在界面上显示元素的大小是多少，这个单位就是设备独立像素(Device Independent Pixels)简称DIP或DP。上面我们说，列表的宽度为300个像素，实际上我们可以说：列表的宽度为300个设备独立像素。

- 打开chrome的开发者工具，我们可以模拟各个手机型号的显示情况，每种型号上面会显示一个尺寸，比如iPhone X显示的尺寸是375x812，实际iPhone X的分辨率会比这高很多，这里显示的就是设备独立像素。


> 设备像素比
- 设备像素比device pixel ratio简称dpr，即物理像素和设备独立像素的比值。在web中，浏览器为我们提供了window.devicePixelRatio来帮助我们获取dpr 在css中，可以使用媒体查询min-device-pixel-ratio，区分dpr：
```css
@media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2){ }

```

- 当然，上面的规则也有例外，iPhone 6、7、8 Plus的实际物理像素是1080 x 1920，在开发者工具中我们可以看到：它的设备独立像素是414 x 736，设备像素比为3，设备独立像素和设备像素比的乘积并不等于1080 x 1920，而是等于1242 x 2208。

- 实际上，手机会自动把1242 x 2208个像素点塞进1080 * 1920个物理像素点来渲染，我们不用关心这个过程，而1242 x 2208被称为屏幕的设计像素。我们开发过程中也是以这个设计像素为准。

- 为了适配所有机型，我们在写样式时需要把物理像素转换为设备独立像素：例如：如果给定一个元素的高度为200px(这里的px指物理像素，非CSS像素)，iphone6的设备像素比为2，我们给定的height应为200px/2=100dp。

- 当然，最好的是，你可以和设计沟通好，所有的UI图都按照设备独立像素来出。


> 视口
- 视口(viewport)代表当前可见的计算机图形区域。在Web浏览器术语中，通常与浏览器窗口相同，但不包括浏览器的UI， 菜单栏等——即指你正在浏览的文档的那一部分。

一般我们所说的视口共包括三种：布局视口、视觉视口和理想视口，它们在屏幕适配中起着非常重要的作用。

> 布局视口
- 布局视口(layout viewport)：当我们以百分比来指定一个元素的大小时，它的计算值是由这个元素的包含块计算而来的。当这个元素是最顶级的元素时，它就是基于布局视口来计算的。

- 所以，布局视口是网页布局的基准窗口，在PC浏览器上，布局视口就等于当前浏览器的窗口大小（不包括borders 、margins、滚动条）。

- 在移动端，布局视口被赋予一个默认值，大部分为980px，这保证PC的网页可以在手机浏览器上呈现，但是非常小，用户可以手动对网页进行放大。

- 我们可以通过调用document.documentElement.clientWidth / clientHeight来获取布局视口大小


> 视觉视口
- 用户通过屏幕真实看到的区域。
- 视觉视口默认等于当前浏览器的窗口大小（包括滚动条宽度）。当用户对浏览器进行缩放时，不会改变布局视口的大小，所以页面布局是不变的，但是缩放会改变视觉视口的大小。

- 例如：用户将浏览器窗口放大了200%，这时浏览器窗口中的CSS像素会随着视觉视口的放大而放大，这时一个CSS像素会跨越更多的物理像素。所以，布局视口会限制你的CSS布局而视觉视口决定用户具体能看到什么。

- 我们可以通过调用window.innerWidth / innerHeight来获取视觉视口大小。


> 理想视口
- 布局视口在移动端展示的效果并不是一个理想的效果，所以理想视口(ideal viewport)就诞生了：网站页面在移动端展示的理想大小。

- 如上图，我们在描述设备独立像素时曾使用过这张图，在浏览器调试移动端时页面上给定的像素大小就是理想视口大小，它的单位正是设备独立像素。

- 上面在介绍CSS像素时曾经提到页面的缩放系数 = CSS像素 / 设备独立像素，实际上说页面的缩放系数 = 理想视口宽度 / 视觉视口宽度更为准确。

- 所以，当页面缩放比例为100%时，CSS像素 = 设备独立像素，理想视口 = 视觉视口。我们可以通过调用screen.width / height来获取理想视口大小。


> vw 适配的缺点
- px转换成vw不一定能完全整除，因此有一定的像素差。
- 比如当容器使用vw，margin采用px时，很容易造成整体宽度超过100vw，从而影响布局效果。当然我们也是可以避免的，例如使用padding代替margin，结合calc()函数使用等等...

- https://blog.csdn.net/weixin_42981560/article/details/124241357


> 图片模糊问题
- 我们平时使用的图片大多数都属于位图（png、jpg...），位图由一个个像素点构成的，每个像素都具有特定的位置和颜色值：

- 理论上，位图的每个像素对应在屏幕上使用一个物理像素来渲染，才能达到最佳的显示效果。

- 而在dpr > 1的屏幕上，位图的一个像素可能由多个物理像素来渲染，然而这些物理像素点并不能被准确的分配上对应位图像素的颜色，只能取近似值，所以相同的图片在dpr > 1的屏幕上就会模糊:

- 为了保证图片质量，我们应该尽可能让一个屏幕像素来渲染一个图片像素，所以，针对不同DPR的屏幕，我们需要展示不同分辨率的图片。

- 在dpr=2的屏幕上展示两倍图(@2x)，在dpr=3的屏幕上展示三倍图(@3x)。

----------------

### foundation (文件夹)
- 作用:
- 管理变量
- 管理混合
- 动画定义
- 类似 工具 的一个样式目录

**注意:**
- 哪个组件中需要使用 混合 变量 等样式工具了 可以在页面组件内 引入 _global.scss


- 目录结构

  | - foundation
    - _animations.scss
    - _extend.scss
    - _mixin.scss
    - _variable.scss
    - _global.scss    // 内部使用 @forward 引入混合 和 变量scss文件

- 我们在页面组件中 想要使用 混合 和 变量 需要引入 global 文件 来使用通过它暴露出来的其它样式组件
```scss
// _global.scss 文件
@forward "./mixin";
@forward "./variable"


// 其他的页面组件
@use "./foundation/global" as g
```

- 也就是说我们既可以通过 g 获取变量 还可以通过 g 获取混合


> variable.scss
- 用来管理变量: color width margin
- 利用这里公共的变量 在多个地方使用 达成共同管理的目的


> 要点示例1:
- 示例:
- 下面定义了一个map(scss中的对象) 我们要操作scss中的对象的话 还要借助scss中的内置函数 比如: *map-get($map, "key")*
```scss
$breakpoints: (
  'sm': 'screen and (min-width: 320px)',
  'md': 'screen and (min-width: 835px)',
  'xl': 'screen and (min-width: 1001px)',
) !default;
```

- 使用:
```html
<style lang="scss">
@use "./assets/style/foundation/global" as g;

#app {
  div {
    /* 调用 map-get() 函数 根据 key 获取 $color 对象中的 value*/
    color: map-get(g.$color, "md")
  }
}
</>
```

> 要点示例2:
- 定义的宽度变量 都是包含 padding 的数值
```scss
// width 页面宽度, 要点: pc sp 两端都要保留12px
$w-full: 100%;
$w-main: 1008px;  // 这个结果是包含 左右padding 实际是: 984px
$w-mid: 828px;
$w-small: 702px;

// padding
$w-padding: 0 12px;
```

---

> mixin.scss
> 要点1:
- @mixin mq()
  我们调用 mq() 的时候 其实使用的是 mq() { 结构... } 里面包裹的结构
- @content:
  我们在调用 mq() { 这里写的规则 } 会替换掉 @content 的部分

> 要点2:
- @function 是为了拿 @return 的返回值
- 比如下面的示例中 根据我们传入的参数 获取我们在变量文件中定义好的数据

> 要点3:
- 我们在写mixin的时候 不用想着特别的东西 就是在写css 比如
```scss
div {
  // 原本我们打算在这里写 width height
  width: 100px;
  height: 100px;
}

// 现在定义一个 混合
@mixin init($w, $h) {
  width: $w;
  height: $h
}

div {
  +init("200px", "200px")
}
```
  
```scss
// 引入 变量
@use "./variable" as val;

// 定义 根据参数 选择指定尺寸的媒体查询条件
// 参数: 断点, 默认值 md 835px
@mixin mq($breakpoint: "md") {
  @media #{map-get(val.$breakpoints, $breakpoint)} {
    @content;
  }
}

// 获取margin: 根据设备 和 想要获取指定区域的 margin 
// $device: "sp", 默认值为sp
// $mg_type: 想要获取指定区域的 字符串
@function getMargin($mg_type, $device: "sp") {

  // 如果我们传递的是 section 
  @if $mg_type=='section' and $device=="pc" {
    // 返回 variable 里面定义好的内容
    @return val.$mgn-xl;
  }

  @if $mg_type=='section' and $device=="sp" {
    @return val.$mgn-l;
  }

  @if $mg_type=='content' and $device=="pc" {
    @return val.$mgn-l;
  }

  @if $mg_type=='content' and $device=="sp" {
    @return val.$mgn-m;
  }

  // TODO: PC, SPそれぞれのマージンを調整, 現状共通
  @if $mg_type=='block' {
    @return val.$mgn-m;
  }

  @if $mg_type=='element' {
    @return val.$mgn-s;
  }

  @if $mg_type=='min' {
    @return val.$mgn-ss;
  }
  @return 'auto';
}


// 设置margin: 给某一个具体的margin属性设置 margin 比如: margin-bottom
// 参数: $margin: margin-bottom
@mixin setMargin($margin, $mg_type) {
  // sp的时候设置为
  #{$margin}: getMargin($mg_type, "sp");

  // pc的时候设置为
  @include mq {
    #{$margin}: getMargin($mg_type, "pc");
  }
}


// 单独设置pc 和 sp时候的margin 比如: 设置 margin-top
@mixin setMarginPC($margin, $mg_type) {
  #{$margin}: getMargin($mg_type, "pc");
}

@mixin setMarginSP($margin, $mg_type) {
  #{$margin}: getMargin($mg_type, "sp");
}

@mixin heading($size : 2.8rem, $mb : 4.8rem) {
  font-family: val.$title;
  font-weight: bold;
  font-size: $size;
  margin-bottom: $mb;
  line-height: val.$title-height;
}

// @mixin button($bg-color : val.$col_primary , $color : val.$white) {
//   display: inline-block;
//   background-color: $bg-color;
//   color: $color;
//   border-radius: .5rem;
//   line-height: val.$title-height;
//   cursor: pointer;
//   position: relative;
//   text-decoration: none;
//   transition: all .2s;

//   // 数値系のスタイリングはどうしましょう・・
//   padding: 2rem 1.2rem;
//   width: 27rem;
//   font-size:1.6rem;
// }


@mixin Text($size:1.4rem, $weight: normal, $mb: val.$mgn-s) {
  font-weight: $weight;
  font-size: $size;
  line-height: val.$text-height;
  margin-bottom: $mb;
}

// 我们传递的参数是用来设置最大宽度的
@mixin Width($m-width: val.$w-main) {
  @include setMargin('margin-bottom', 'section');
  margin-left: auto;
  margin-right: auto;
  width: 100%;
  max-width: $m-width;
  padding: val.$w-padding;
}


// image hover 时候的混合
@mixin imageHover($opacity:.7) {
  transition: .2s ease-out opacity;

  &:hover {
    opacity: $opacity;
  }
}
```

----------------

### layout (文件夹)
- 作用:
- 作用设置 布局的样式组件

- 目录下的结构:
  | - layout
    - _all.scss
    - _header.scss
    - _footer.scss
    - _container.scss

> 要点1: width 和 max-width 的区别
- min-width: 用来限制元素的 *最小宽度*
- max-width: 用来限制元素的 *最大宽度*
- 也就是说当元素的 width > max-width | width < min-width 的时候, 就被它们的值所代替, 尤其适用于网站的自适应。

- min-width 和 max-width 是两堵墙 如果 width > max-width 那么容器的宽度是 max-width 
```scss
div {
  width: 100px;
  max-width: 200px;     // 这时候元素宽度为100px 因为元素宽度没有超过 max-width
  
  
  width: 300px;
  max-width: 200px;    // 这时候元素宽度为200px 因为元素宽度超过 max-width
}
```

- 尤其是搭配100%使用的情况, 小于1008px的时候以width为准 大于1008px的时候会居中
```scss
div {
  width: 100%;
  max-width: 1008px;
  margin: auto;
}
```


> 项目代码:
```scss
.l-cnt__main {
  @include g.Width;
}

// pc固定 SPwidh100%
.l-cnt__main02 {
  margin: auto;
  @include g.setMargin('margin-bottom', 'section');
  width: 100%;
  max-width: g.$w-main;
  @include g.mq {
    padding: g.$w-padding;
  }
}

.l-cnt__full {
  width: 100%;

  &--border {
    border-bottom: 1px solid g.$col_border;
    margin-bottom: 4.8rem;
  }

  &--black {
    background: #000;
  }

  &--gray {
    background: g.$bggray;
  }

  &--lightgray {
    background: g.$bglightgray;
  }

  &--primary {
    background: g.$bgprimary;
  }

  &--darkprimary {
    background: g.$col_primary;
  }

}

// max-width: 828px
.l-cnt__mid {
  @include g.Width(g.$w-mid);
}

// max-width: 702px
.l-cnt__small {
  @include g.Width(g.$w-small);
}


.l-cnt__wrap {
  padding-top: g.getMargin('content', "sp");
  padding-bottom: g.getMargin('content', "sp");
  position: relative;
  @include g.mq {
    padding-top: g.getMargin('content', "pc");
    padding-bottom: g.getMargin('content', "pc");
  }
}

```