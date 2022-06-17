## 要点:
如果样式名中要使用 : 的话 我们要使用 \ 来进行转义
\:

```scss
.heading {
  &\:1 {
    @extend %hdg1;
  }
}
```

## 在 Vscode 里面快捷编写html
https://www.jianshu.com/p/5432d194f7e5

-------------------

## Sass的简介:
在大家去找sass相关的教程的时候 肯定会搜到 sass 和 scss 相关信息, 这里可能会有的小伙伴比较迷惑

1. 它俩嘛关系?
2. 我学哪个？  

可能会是一脸懵逼的状态 这节课带大家简单的了解一下 sass 同时也说说他们之间的一个区别

说到sass那就简单的说提下haml sass算是haml的一个部分 都是由玩ruby的大大开发的一门语言

当时写ruby的大大们觉得写html太费劲了 还要写标签名 还要闭合标签等等 太费劲啊 这时候从他们身上就体现了一种程序员独有的特质 懒

既然这么费劲 那我们就自己开发一门语言 来写html 所以haml的诞生了 我们可以说haml是html的模版引擎 预处理器 或者简单理解为 html的另一种简洁 且 优雅的写法 我们简单来看下

```html
<p>你好, sam</p>
%p
  你好, sam

<p id="name">sam</p>
%p#name
  sam

<p id="name" data-index="1">sam</p>
%p#name(data-index=1)
  sam
```

我们会发现它使用了一些预定的符号来代替标签 使用了缩进语法来表示子元素 除了看的不太习惯 确实让html代码简洁了很多 其实要真写多了 也会觉得haml写起来很舒服

我们再把话题拉回来 拉到sass sass也是haml的一部分 haml是让html写起来更加的简洁

那么sass就让css写起来 更加的简洁和优雅 同时扩展了css的功能 让css可以变的更加的强大 比如

1. 定义变量
2. 嵌套
3. 混合
4. 循环
5. 函数

后续我们都会陆续的进行讲解 我们简单的来体验下 sass 的写法

```css
p {
  color: red;
}

p
  color: red
```

```html
<div>
  <h1>你好呀, <span>sam</span></h1>
</div>
```

```css
div {
  background: red;
}

div h1 {
  color: green;
}

div h1 span {
  font-size: 20px;
}
```

```scss
div
  color: red
  h1
    color: green
    span
      font-size: 20px


div {
  color: red;

  h1 {
    color: green;

    span {
      font-size: 20px;
    }
  }
}
```

我们会发现 写法简洁了很多 通过 一套缩进的语法 就能代替我们以前要写两套样式 结构上也更加清晰

但是我们也会发现 这种没括号 结尾没分号的语法 看起来还是有些别扭 所以sass为了让熟悉css的人能够更加的平稳的过渡到sass

在sass 3.0之后将 将.sass结尾的文件 改成 .scss结尾

那有人说了 哥们就改了一个后缀名么？ 不是 语法规则也不一样了 3.0版本的scss和css的写法更加的贴近 更加的舒服

scss是彻底和 css 兼容的，这意味着学习scss几乎是零成本。或者说scss就是增加了一些功能的css。<br><br>


> 总结下:  
sass 和 scss 它俩是一个东西都是css的预处理器, 只是在sass3.0之后 写scss的风格发生了变化 本套课程也毋庸置疑以scss为主<br><br>

-------------------

## Scss(Sass)
css预处理器你可以简单的理解为 就是用来写css的 但不同的是它额外的提供了很多编程语言才有的特性 比如变量 函数 逻辑控制等等 让css的功能更加的强大了 

但是用预处理器的写出来的代码并不能被浏览器直接解析 所以必须要将它们编译成css代码 才能被浏览器识别

-------------------

## 为什么使用 sass 呢?
回答这个问题之前我们看下 下面的场景
```html
<div class="controls">
  <div class="progress">
      <!-进度条 -->
      <div class="progress-bar">
          <!-内部创建拖动按钮 -->
          <div class="progress-bar-btn"></div>
      </div>
      <!-和进度条 同级的 进度 -->
      <div class="rate-progress"></div>
  </div>


  <div class="sound">
      <!-音量按钮的容器 -->
      <div class="switch">
          <span></span>
      </div>
      <!-空间信息区域的进度条 -->
      <div class="progress">
          <!-进度条 -->
          <div class="progress-bar">
              <!-内部创建拖动按钮 -->
              <div class="progress-bar-btn"></div>
          </div>
          <!-和进度条 同级的 进度 -->
          <div class="rate-progress"></div>
      </div>
  </div>
</div>
```

我们都用过一些播放器是吧 播放器上都有一根很长的进度条 通过在调节音量的地方也有可以拖动的进度条
而且长的进度条的样式 和 调节音量的进度条的样式 还不一样 对么
如果我们想修改 进度条上 拖动按钮的样式的话 势必会出现下面的css代码
```css
.controls > .progress .progress-bar .progress-bar-btn {
  ...
}

.controls > .sound > .progress .progress-bar .progress-bar-btn {
  ...
}
```

兄dei你写的太长了 我可以直接这样 这样多简单呀 但这样操作是同时修改两个部分的进度条吧
```css
.progress-bar-btn {
  ...
}
```

当我们写个复杂的页面的时候 肯定会遇到 嵌套层级很深的结构 或者 我们在写css选择器的时候 还要考虑权重的问题 不然很有可能我们写的样式 元素却没有添加上
也就是说 为了准确 精确的找到目标元素 不会影响到其它的元素 我们会写很长的选择器 这样我们修改起来才是指哪打哪且不用考虑权重的问题

-------------------

## node环境下的安装

- node-sass 安装:　　

  npm i -g node-sass

- 检查是否安装成功：node-sass -v  

      安装的时候可能会出现版本上的错误 我使用的是node17 sass不知道 应该是最新吧
      经过测试这种搭配在 node: 14版本下可以正常的运行


### vue环境下
1. 首先运行命令:  
  npm install --save-dev node-sass sass-loader

2. 指定各个版本
```js
"node-sass": "^4.14.1",
"sass-loader": "^8.0.2",

"sass": "1.32.13",  // 这个并没有指定 没写这行 备忘用
```


### 编译文件
#### 单文件编译 语法格式:  
```
node-sass 原有的scss文件 生成的css文件  
node-sass 原有的scss文件 -o 生成目录

node-sass a.scss b.css
nod-sass a.scss -o css_file
```


#### 多文件编译 语法格式:  
    node-sass 原有的scss文件目录 -o 生成的css文件目录
    node-sass c -o d


#### 文件监听模式
当文件改变的时候 自动编译 在 单 和 多 的基础上添加 -w 命令行参数即可  
```
node-sass -w 原有的scss文件 -o 生成目录
node-sass -w 原有的scss文件目录 -o 生成的css文件目录
```


> dart-sass 安装
npm i -g sass
该模块为第三方库 所以可以考虑使用 npm i sass -D(-D == --save-dev)


> dart-sass 使用
需要手动的调用dart语言的api 来去执行一些命令
<!-
  let sass = require("sass")
  sass.render({file: scss_filename}, function(err, res) { ... })

  // or

  let res = sass.renderSync({file: scss_filename})

  默认情况下 renderSync的速度是render的两倍以上 这是由于异步回调所带来的开销导致的
 -->

-------------------

## Vscode 下安装 Sass
1. 在扩展商店 下载 easy sass

2. 打开扩展设置
点击插件右下角的设置图标后点击扩展设置 最后点击在 settings.json 中编辑 开始设置关于easy sass的配置

3. 配置: (也可以可视化配置)
package.json中可以配置如下 关于 sass 配置

1. easysass.compileAfterSave: 
启用或禁用保存后自动编译功能

2. easysass.formats
指定导出文件的扩展名和格式。
格式:
[{}]
```js
"easysass.formats": [
  {
    "format": "expanded",
    "extension": ".css"
  },

  // 下面的可以注释掉
  {
    "format": "compressed",
    "extension": ".min.css"
  },
],
```

3. easysass.targetDir:
设置编译后文件的输出目录 说白了就是编译后的css的位置
相对路径为 当前基于vscode打开的文件夹

格式: 字符串
```js
"easysass.targetDir": "./css/"
```

4. easysass.excludeRegex
使用正则排除指定的文件目录

---

会自动生成下方图片内的配置
```json
  "easysass.formats": [
    {
      "format": "expanded",
      "extension": ".css"
    },

    // 下面的可以注释掉
    {
      "format": "compressed",
      "extension": ".min.css"
    },
  ],

  // 可以将编译后的文件输出到指定的目录 比如下面这样的当前目录 默认就是当前目录
  "easysass.targetDir": "./css/"
```

-------------------

## 嵌套规则
scss里面在写css的时候 可以使用嵌套语法

比如:
```html
<div>
  <p>我是内容<p>
</div>
```

需求:
1. 给div添加高度和宽度
2. 给div里面的p元素设置 背景色

这节里我们写几个css样式 来与scss进行下对比 以后咋就不写了哈 编译后的结果我们在编译后的css里面查看

```css
div {
  width: 100px;
  height: 10px;
}

div p {
  background-color: red;
}
```

我们再看下同样的需求 我们使用scss怎么来实现
```scss
// 需求1:
// 我们发现是不是就是在写css啊 没两样吧 这也就是学习scss几乎是0成本且能由css平稳的过渡到scss的语法
div {
  width: 100px;
  height: 100px;
}

// 上面说了 scss里面可以使用嵌套的写法是么
div {
  p {
    background-color: red;
  }
}

// 有没有发现这样的结构跟 html 的结构是一样的呀?
```

比如:
```html
<div>
  <p>我是内容<a href="">点击领取优惠卷</a><p>
</div>
```

需求:
让 a链接的颜色文字变成红色

我们按照html结构的层级 使用嵌套规则写scss
div的子元素是p p的子元素是a 指定a的样式 是不是和 html 的结构一样？
```scss
div {
  p {
    a {
      color: red;
    }
  }
}


div {
  width: 100px;
  height: 100px;

  p {
    background-color: red;

    a {
      color: red;
    }
  }
}
```

我们发现结构是清晰了 那还有没有什么好处?
我们想象以往我们要是写上面的需求 css 是什么样的？
```css
div {
  width: 100px;
  height: 100px;
}

div p {
  background-color: red;
}

div p a {
  color: red;
}
```

我们在写子元素的样式的时候 需要一直带着它爸爸的类名呀 这是元素选择器 如果是自定义的class选择器 那样式名可能更长

我们再来看一个例子:
我们要让 ul 里面 的 li 里面的 span 里面的文本变成红色
```html
<ul>
  <li><span>我是内容1</span></li>
  <li><span>我是内容2</span></li>
  <li><span>我是内容3</span></li>
  <li><span>我是内容4</span></li>
  <li><span>我是内容5</span></li>
  <li><span>我是内容6</span></li>
</ul>
```

```scss
ul {
  li {
    span {
      color: red;
    }
  }
}
```

我们稍微来点复杂点的 然后观察下编译后的结果 再次的验证使用嵌套规则写css的好处
```scss
ul {
  width: 300px;
  margin: 50px auto;
  background-color: #eee;

  li {
    padding: 10px;

    span {
      color: red;
    }
  }
}
```

```css
ul {
  width: 300px;
  margin: 50px auto;
  background-color: #eee;
}

ul li {
  padding: 10px;
}

ul li span {
  color: red;
}
```

> 总结下:
使用嵌套语法 可以是css的结构更加的清晰 同时避免了重复输入父选择器 写起来更加的舒服

-------------------

## 父选择器 &
这节课我们介绍下嵌套规则里面的几个符号 首先就是 & 它代表父选择器

&: 
  1. 写在内层嵌套里面 说白了它要写在括号的里面
  2. 选择器的位置上 
  3. 代表上一层级的选择器 说白了它代表的是括号外的选择器

```html
<ul>
  <li>我是文字</li>
</ul>
```

```scss
  ul {
    // 写在内层里面 写在选择器的位置上 代表上一层的选择器 ul
    & > li { ... }  == ul > li

    & + li { ... }  == ul + li

    &:hover { ... } == ul:hover

    &:last-child { ... } == ul:last-child
  }
```

还是直接看例子 我们看下下面的结构
```html
  <ul>
    <li>我是文字</li>
    <li>我是文字</li>
    <li>我是文字</li>
    <li>我是文字</li>
    <li>我是文字</li>
  </ul>
```

1. 修改li里面的文字的颜色 为红色
```scss
ul {
  li {
    color: red;
  }
}
```

2. 修改最后一个li的文字颜色 为黑色
```scss
ul {
  li {
    color: red;

    // 我们也可以 利用 嵌套的方式 &代表 括号外的选择器吧
    &:last-child {
      color: #000;
    }
  }

  // 我们可以这么写
  // li:last-child {
  //   color: #000;
  // }
}
```

3. 将 我是span 的颜色修改为红色
```html
<section>
  <span>我是span</span>
  <div>我是div<span>我是内联span</span></div>
  <a>我是a链接</a>
</section>
```

- 我能这么写么? 不能吧 因为这么写 div里面的所有span元素都会变成红色是么
```scss
section {
  span {
    color: red;
  }
}
```

- 那应该怎么改:
```scss
section {
  & > span {
    color: red;
  }
}
```


我们再来看下下面的例子
```html
  <ul>
    <li><a href="">我是链接1</a></li>
    <li><a href="">我是链接2</a></li>
    <li><a href="">我是链接3</a></li>
    <li><a href="">我是链接4</a></li>
    <li><a href="">我是链接5</a></li>
    <li><a href="">我是链接6</a></li>
  </ul>
```

需求:
当我hover到li上面的时候 修改其背景色

简单的写些样式哈
```scss
ul {
  width: 350px;
  margin: 50px auto;
  background-color: palevioletred;
  padding: 20px;
  list-style: none;

  li {
    padding: 10px;

    // 这里的 & 就代表了 外层选择器 li 也就是说 等价于 li:hover
    &:hover {
      background-color: #eee;
    }
  }
}
```

追加一个需求 hover到li上的同时 我们也修改 a链接的文件颜色
```scss
ul {
  width: 350px;
  margin: 50px auto;
  background-color: palevioletred;
  padding: 20px;
  list-style: none;

  li {
    padding: 10px;

    // 这里的 & 就代表了 外层选择器 li 也就是说 等价于 li:hover
    &:hover {
      background-color: #eee;

      a {
        color: palevioletred;
      }
    }
  }
}
```

我们看下编译结果:
```css
ul {
  width: 350px;
  margin: 50px auto;
  background-color: palevioletred;
  padding: 20px;
  list-style: none;
}

ul li {
  padding: 10px;
}

ul li:hover {
  background-color: #eee;
}

ul li:hover a {
  color: palevioletred;
}
```

ok到这里我相信大家对嵌套的写法 和 &符号的用法有一定的了解了 有人会说兄dei 我知道了
&代表 括号外的选择器 同时它的后面可以加 :link > + ~ ::before 

那还有没有其他的用法, 有

在一些公司 他们对 类名 有要求 他们会在类名上体现出来 做的是什么类型的页面 做的是这个页面中的什么部分 比如
```scss
// 我做的是一个page 页面的类型是lp 做的是yaris车种 这个样式是关于 header部分的
.p-lp-yaris__header { ... }
.p-lp-yaris__footer { ... }
.p-lp-yaris__wrap { ... }
.p-lp-yaris__title { ... }
```

- 当然我们可以像上面这样写 但也可以利用 & 将上面的样式整合在一起
```scss
// 你不是 & 代表括号外面的选择器么
.p-lp-yaris {
  &__header { ... }
  &__footer { ... }
  &__wrap { ... }
  &__title { ... }
}
```

- 当然公司开发中尽可能的写代码的风格要统一 如果你去了一个项目组 大家都这么写 那咱也别另类了哈

- 还有一个 % 占用符 这个等到我们讲继承的时候 我们再展开讲讲 这节课就到这里

## 占位选择器 %
使用方式和 .className #className 相似

%className

需要和 @extend 选择器名; 配合使用

需要定义一套样式并不是给某个元素用，而是定义样式模板

比如:
我定义了一套样式模板

```scss
%sample {
  border-radius: 10px;
}
```

占位选择器 % 需要和 @extend 选择器名; 配合使用

```scss
.app_inner {
  @extend %sample;
  width: 300px;
  height: 150px;
  border: 1px solid black;
} 


// 相当于

.app_inner {

  border-radius: 10px;

  width: 300px;
  height: 150px;
  border: 1px solid black;
} 
```


```scss
#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}

.notice {
  @extend %extreme;
}

// 编译结果
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em; 
}
```

-------------------

## 注释
- 这个部分比较轻松 关于注释 
- 注释是什么? 
- 注释说白了 就是对我们写的代码的解释和说明 目的是为了让别人 和 自己都能很容易得看懂这段代码是做什么用的。

- 让别人懂:
- 我们写项目 很可能是多人协作开发 我们写的代码 有可能将来来修改的时候 改的人不是你 所以我们写注释的目的就是让这个改的人 能快速的定位到目标 改起来更轻松

- 要知道 未来的css文件里面的代码也是很多的 那我们是不是可以稍微进行下注释 比如

  // 登录窗口

- 让自己动:
- 举个例子 五一放假前 我做了7个页面 放假回来了 看着一团团的代码 懵逼了 我要接着哪写？

写代码养成写注释是比较好的一样习惯 注释

sass中的注释的写法有两种
1. 单行注释
2. 多行注释

```scss
// 登录窗口
.login { ... }

/*
  这是多行注释
  这是多行注释
  这是多行注释
*/
.login { color: red; }
```

注意: 多行注释会被编译到css文件里面 单行注释不会哦

-------------------

## 变量
哪门计算机语言里面都有变量这个概念 为了照顾一些可能没有听过这个概念的小伙伴们 我们建档说下 变量的含义

变量变量 代表一个可变的量, 举个例子:
wai 老王 听说你昨天从3楼掉下来了 我今天买点 水果 去看看你 等到了你再聊聊是因为没藏好么？

我说买点水果 这个水果就可以当看成一个变量 具体是什么水果 那就要看我去市场买什么了
买香蕉 水果就是香蕉 买苹果 水果就是苹果

  水果 = 香蕉

等我见到老王了 nuo 这是我给你买的水果 这时候的水果指的就是香蕉是什么

我在举一个例子啊, 我们都打游戏 一般游戏都会有个小地图 小地图下面 经常会有 x y
x: 123, y: 677
这代表了人物的坐标 x y 就是变量名 里面的值是变化的是么

这时候有人说了 好滴 兄dei我大概知道变量的作用了 就是我定义一个变量 里面的值是可变的
那变量具体应用在哪里呢？

这个问题问得好哈, 用在哪里呢 我们来看一个例子
我们应该知道 每一个网站的设计 都会有一套对应的配色 整个网站几十个页面都是根据这一套配色来的

ok现在我做了一个网站 整个网站的配色如下 
产品经理来需求了 说我们现在这个网站啊 受众全体不在是女性 而是男人 所以整体的配色方案必须要换 ok那你怎么 要知道这一套配色方案应用的地方实在是太多了 什么几十个页面的 背景色 边框 文字色 都需要一一去变 那这样的工作量实在是太大了 这个时候我们就可以使用变量
```html
  <div class="electric">
    <h3>电子产品</h3>
  </div>
  <div class="beddings">
    <h3>床上用品</h3>
  </div>
  <div class="spare">
    <h3>汽车配件</h3>
  </div>
```

```scss
div {
  width: 350px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #212121;

  text-align: center;
}

.electric {
  background-color: #C2185B;

  h3 {
    color: #fff;
  }
}

.beddings {
  background-color: #f15b6c;

  h3 {
    color: #fff;
  }
}

.beddings {
  background-color: #f58f98;

  h3 {
    color: #fff;
  }
}

.spare {
  background-color: #d71345;

  h3 {
    color: #fff;
  }
}
```

我们先看下变量的定义方式:


> 变量定义: $变量名: 值;
变量以美元符号开头，赋值方法与 CSS 属性的写法一样
```scss
$electric-bgcolor: #f15b6c;
$beddings-bgcolor: #f58f98;
$spare-bgcolor: #d71345;
```

- 上面我们就定义了3个变量 变量名就是$ electric-bgcolor ok接下来我们看看怎么使用变量
- 也很简单 你就把这个部分复制到你想用的位置就可以了


> 变量使用 $变量名
直接使用 $变量名 即可调用变量

```scss
.electric {
  // 这里我们使用的是这个变量 然后编译的时候 就会去找对应的值
  background-color: $electric-bgcolor;

  h3 {
    color: #fff;
  }
}


.beddings {
  background-color: $beddings-bgcolor;

  h3 {
    color: #fff;
  }
}

.spare {
  background-color: $spare-bgcolor;

  h3 {
    color: #fff;
  }
}
```

- 那有什么好处呢, 这时候 我们再整体网站的配色的时候 直接修改变量值就可以了



> 变量的作用域
- 接下来我们介绍下一个概念 就是变量的作用域 说白了就是指变量生效的范围
- 如果我们定义在 嵌套规则里面 那么它只在当前的{ } 内使用 这种变量也叫做局部变量
```scss
.electric {
  background-color: $electric-bgcolor;

  h3 {
    // 定义一个变量
    $title-color: #afdfe4;

    // 使用这个变量
    color: $title-color;
  }
}


.beddings {
  // 我们能在这里使用上面 { } 里面定义的变量么？
  background-color: $beddings-bgcolor;

  h3 {
    color: $title-color;
  }
}
```
- 结果是不行: Undefined variable 编译期报错了 说未定义的一个变量
- 当我们不在嵌套规则里面定义的时候 在任何地方都能使用

-------------------

## 数据类型
scss在css的基础上提供了一些scssscript的新功能 听听这个词哈 scsscript scss脚本语言 它为扩展了可以使用变量啊 算数运算等功能

既然说是scssscript那么就会跟其他的语言一样 会有变量 和 数据类型的概念 上一节中我们介绍了变量的概念 这里我们讲讲在scss中的数据类型

SassScript 支持 7 种主要的数据类型：

> 字符串:
- scss支持两种字符串类型
- 1. 有引号的字符串
  - 比如 
  - content: "你好 可以认识一下嘛"
  - "字符串"

- 2. 无引号的字符串 比如类似
  - hello
  - solid black
  - bold
  - center


> 数字类型
1, 2, 13, 10px
px在这里也属于属性型 但是5a类似这种格式也属于数字型 需要注意
只要是带数字的都是数字类型


> 颜色类型
blue, #04a3f9, rgba(255,0,0,0.5)
上面都是我们平常定义颜色的方式是么 这就是颜色类型


> 布尔型
true, false

> 空值
null

> 数组 (list)
用空格或逗号作分隔符，1.5em 1em 0 2em, Helvetica, Arial, sans-serif

> maps
相当于 JavaScript 的 object，(key1: value1, key2: value2)

SassScript 也支持其他 CSS 属性值，比如 Unicode 字符集，或 !important 声明。然而Sass 不会特殊对待这些属性值，一律视为无引号字符串。


> type-of($value)
判断数据类型的方式

-------------------

## 字符串 (Strings)
SassScript 支持 CSS 的两种字符串类型：
有引号字符串 (quoted strings)
无引号字符串 (unquoted strings)
<!-
  $name1: "wang"
  $name2: 'li'
  $name3: zhang

  body { color: $name1 }  以上3种都会被编译到css里
 -->

**注意：**
在编译 CSS 文件时不会改变其类型。有引号的不会编译为无引号的
只有一种情况例外，使用 `#{}` (相当于${}) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名

-------------------

## 数字(Numbers)
SassScript支持两种数字类型：`带单位数字`和`不带单位数字`。（可正可负可为零，可正可浮点）

**注意：** 
这里前面是数字 后面是字母 的格式也算是数字的类型 5a
单位会和数字当做一个整体，进行算数运算

<!-
  $width: 19;
  $height: 19.5;
  $opacity: 120px;
 -->

-------------------

## 空值(Null)
只有一个取值`null`

**注意：**
由于它代表空，所以不能够使用它与任何类型进行算数运算
<!-$value: null; -->

-------------------

## 布尔型(Booleans)
只有两个取值：`true`和`false`
<!-
  $a: true;
  $b: false;
 -->

**注意：**
只有自身是false和null才会返回false，其他一切都将返回true

-------------------

## 数组 (Lists)
scss中的数组一般处理css中的
margin: 10px 15px 0 0
font-face: Helvetica, Arial, sans-serif
这样通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组。

通过空格或者逗号分隔的一系列的值。事实上，独立的值也被视为数组 —— 只包含一个值的数组。索引从`1`开始
<!-
  const arr1 = [1,2,5,6]      一维数组
  const arr2 = [[1,2],[5,6]]  二维数组


  // 一维 scss 数组
  $list0: 1px 2px 5px 6px;
      区别 不用写中括号，不用写逗号 但是必须有空格


  // 二维 scss 数组
  $list1: 1px 2px, 5px 6px;  $list2: (1px 2px) (5px 6px);
      区别 使用 逗号 或者 括号 以子数组为单位进行分割 子数组之间用空格分割
 -->

数组中可以包含子数组，比如 `1px 2px, 5px 6px` 是包含 `1px 2px` 与 `5px 6px` 两个数组的数组。如果内外两层数组使用相同的分隔方式，需要用圆括号包裹内层，所以也可以写成 `(1px 2px) (5px 6px)`。变化是，之前的 `1px 2px, 5px 6px` 使用逗号分割了两个子数组 (comma-separated)，而 `(1px 2px) (5px 6px)` 则使用空格分割(space-separated)。

当数组被编译为 CSS 时，Sass 不会添加任何圆括号（CSS 中没有这种写法），所以 `(1px 2px) (5px 6px)` 与 `1px 2px, 5px 6px` 在编译后的 CSS 文件中是完全一样的，但是它们在 Sass 文件中却有不同的意义，前者是包含两个数组的数组，而后者是包含四个值的数组。

用 `()` 表示不包含任何值的空数组（在 Sass 3.3 版之后也视为空的 map）。空数组不可以直接编译成 CSS，比如编译 `font-family: ()` Sass 将会报错。如果数组中包含空数组或空值，编译时将被清除，比如 `1px 2px () 3px` 或 `1px 2px null 3px`。

基于逗号分隔的数组允许保留结尾的逗号，这样做的意义是强调数组的结构关系，尤其是需要声明只包含单个值的数组时。例如 `(1,)` 表示只包含 `1` 的数组，而 `(1 2 3,)` 表示包含 `1 2 3` 这个以空格分隔的数组的数组。


> 扩展：
> nth()函数   可以  直接访问数组中的某一项
> join()函数  可以  将多个数组连接在一起
> append()函数可以  在数组中添加新值
> @each指令   可以  遍历数组中的每一项

-------------------

## 映射(Maps)

Maps必须被圆括号包围，可以映射任何类型键值对（任何类型，包括内嵌maps，不过不推荐这种内嵌方式）
<!-
  const map = {
    key: "value1"
    key: "value2"
    key: "value3"
  }


  // map类似于js中的对象 也是变量 值 的形式 当是scss中的map是以小括号为块 区别于js中的 { }
  $map: ( 
    $key1: value1, 
    $key2: value2, 
    $key3: value3 
  )
 -->

-------------------

## 7.颜色 (Colors)
CSS原有颜色类型，十六进制、RGB、RGBA、HSL、HSLA和色彩单词
SCSS提供了内置Colors函数，从而更方便地使用颜色
比如 我们从网上下载下来的颜色都是16进制的字符 如果我们还想给这个颜色加上透明度就非常的麻烦 scss里面提供了 rgba() 函数
<!-
  $color: rgba(#212121, 0.3)

  body {color: $color}
 -->

-------------------

## 运算
所有数据类型均支持相等运算 == 或 !=，此外，每种数据类型也有其各自支持的运算方式。

> 1. 数字运算符
SassScript 支持数字的加减乘除、取整等运算 (`+, -, *, /, %`)，如果必要会在不同单位间转换值

如果要保留运算符号，则应该使用插值语法

我们在对数值进行运算的时候需要考虑它是什么样的类型
比如 会存在数字和数字 数字和字符串 字符串和字符串之前的运算

`+`

> 纯数字
这里注意 scss 中 2px 也是数字类型
两个数字都不带单位结果就不带单位，两个数字其中有一个带单位 结果就是那个单位

  $add1: 1 + 2;	    // 3
  $add2: 1 + 2px;   // 3px
  $add3: 1px + 2;   // 3px
  $add4: 1px + 2px; //3px
  

> 纯字符串
纯字符串进行运算的时候 我们要关注带不带引号
如果前面的带引号结果就会带引号
如果前面的不带引号结果也不带引号

  $add5: "a" + "b";   // "ab"
  $add6: "a" + b;	    // "ab"
  $add7: a + "b";	    // ab
  $add8: a + b;	      // ab

  
> 数字和字符串
第一位有引号，结果必为引号；第一位对应数字非数字且最后一位带有引号，则结果必为引号
  $add9: 1 + a;	// 1a
  $adda: a + 1;	// a1
  $addb: "1" + a; // "1a"
  $addc: 1 + "a"; // "1a"
  $addd: "a" + 1; // "a1"
  $adde: a + "1"; // a1
  $addf: 1 + "1"; // "11"
  ```


`-`
减法和加法一样
每个字段必须前部分为数字，且两个字段只能一个后部分是字符(因为此时后缀被当被单位看待了)。
只要其中一个值首位不为数字的，结果就按顺序去除空格后拼接起来

  $add1: 1 2;	    // -1
  $add2: 1 2px;   // -1px
  $add3: 1px 2;   // -1px
  $add4: 1px 2px; //-1px
  
  $sub1: a 1;     // a-1
  $sub2: 1 a;     // 1-a
  $sub3: "a" 1;   // "a"-1
  $sub4: a "1";   // a-"1"



`*`
每个字段必须前部分为数字，且两个字段只能一个后部分是字符(因为此时后缀被当被单位看待了)。
总结来说两个数都带代码 编译就会不通过

  $num1: 1 * 2;     // 2
  $mul2: 1 * 2px;   // 2px
  $num3: 1px * 2;   // 2px
  $num4: 2px * 2px; // 编译不通过
  
  $num5: 1 * 2abc; // 2abc



`/`
不会四舍五入，精确到小数点后5位
每个字段必须前部分为数字，且当前者只是单纯数字无单位时，后者(除数)后部分不能有字符。其余结果就按顺序去除空格后拼接起来。(因为此时后缀被当被单位看待了)
在使用除法的时候 需要使用 () 进行包裹 要不 / 会被视为分隔符


`%`
值与"%"之间必须要有空格，否则会被看做字符串
<!-
  $num: 2px % 2px   // 值与值之间必须有空格
 -->

-------------------

## 函数 (Functions)
SassScript 定义了多种函数，有些甚至可以通过普通的 CSS 语句调用：

```scss
p {
  color: hsl(0, 100%, 50%);
}

// 编译为:
p {
  color: #ff0000; }
```


scss中的函数也可以传递参数
```scss
p {
  color: hsl($hue: 0, $saturation: 100%, $lightness: 50%);
}
```

-------------------

## 插值语句 #{}
通过 #{} 插值语句可以在选择器或属性名中使用变量：

```scss
$name: foo;
$attr: border;

p.#{$name} {
  #{$attr}-color: blue;
}


// 编译为:
p.foo {
  border-color: blue; }
```

-------------------

## @import  --> @use
允许其导入 SCSS 或 Sass 文件。被导入的文件将合并编译到同一个 CSS 文件中，另外，被导入的文件中所包含的变量或者混合指令 (mixin) 都可以在导入的文件中使用。

-------------------

## @extend 选择器名;
在设计网页的时候常常遇到这种情况：一个元素使用的样式与另一个元素完全相同，但又添加了额外的样式。

通常会在 HTML 中给元素定义两个 class，一个通用样式，一个特殊样式。

比如:
现在要设计一个普通错误样式与一个严重错误样式，一般会这样写：

```html
<div class="error seriousError">
  Oh no! You've been hacked!
</div>

<style>
.error {
  border: 1px #f00;
  background-color: #fdd;
}

.seriousError {
  border-width: 3px;
}
</style>
```

那我们在应用样式的时候 共通样式 和 特殊的样式的类名都在添加在元素上

这个时候我们可以这样做
```scss
.error {
  border: 3px #f00 solid;
  background-color: #fdd;
}

.seriousError {
  @extend .error;
  border-width: 10px;
}
```

告诉 Sass 将.error选择器下的所有样式继承给.seriousError选择器。

这样我们在应用样式的时候 只需要使用 一个类名就可以了
```html
<div class="seriousError">
  Oh no! You've been hacked!
</div>
```

-------------------

## @media
Sass 中 @media 指令与 CSS 中用法一样，只是增加了一点额外的功能：允许其在 CSS 规则中嵌套。如果 @media 嵌套在 CSS 规则内，编译时，@media 将被编译到文件的最外层，包含嵌套的父选择器。这个功能让 @media 用起来更方便，不需要重复使用选择器，也不会打乱 CSS 的书写流程。

```scss
.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}

// 编译为
.sidebar {
  width: 300px; 
}

// 吧
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px; 
  } 
}
```

-------------------

## 关系运算符
大前提：两端必须为`数字` 或 `前部分数字后部分字符`
返回值：true or false


`>`

  ```scss
  $a: 1 > 2; // false
  ```

`<`

  ```scss
  $a: 1 > 2; // true
  ```

`>=`

  ```scss
  $a: 1 >= 2; // false
  ```

`<=`

  ```scss
  $a: 1 <= 2; // true
  ```

-------------------

## 相等运算符

作用范围：相等运算 `==, !=` 可用于所有数据类型

返回值：`true` or `false`

  $a: 1 == 1px; // true
  $b: "a" == a; // true

**总结：**
前部分为不带引号数字时，对比的仅仅是数字部分；反之，忽略引号，要求字符一一对应

-------------------

## 布尔运算符
SassScript 支持布尔型的 `and` `or` 以及 `not` 运算。
返回布尔值
布尔运算符前后要有空格

<!-
  $a: 1>0 and 0>=5; // fasle
 -->

-------------------

## 颜色值运算
颜色值的运算是分段计算进行的，也就是分别计算红色，绿色，以及蓝色的值

`颜色值与颜色值`
16进制和16进制来进行运算
16进制分3个部分 比如 #010203  01 02 03
16进制在进行运算的时候 是分3个部分相加得到结果的

<!-
  p {
    color: #010203 + #040506;
  }

  // 计算 
    01 + 04 = 05
    02 + 05 = 07
    03 + 06 = 09

  // 结果
    color: #050709;
 -->


`颜色值与数字`
分3个部分 分别去乘
<!-
  p {
    color: #010203 * 2;
  }

  01 * 2 = 02
  02 * 2 = 04
  03 * 2 = 06


  color: #020406;
 -->


`RGB和HSL`
如果颜色值包含 alpha channel（rgba 或 hsla 两种颜色值），必须拥有相等的 alpha 值才能进行运算，因为算术运算不会作用于 alpha 值。

这个注意 前面如果是rgba 后面也要是rgba才能进行运算
<!-
  p {
    color: rgba(255, 0, 0, 0.75) + rgba(0, 255, 0, 0.75);
  }

  color: rgba(255, 255, 0, 0.75);
 -->

-------------------

## 运算优先级
0. `()`
1. `*`、`/`、`%`
2. `+`、`-`
3. `>` 、`<`、`>=`、`<=`

-------------------

## 嵌套语法
举例说明
<!-
  #app {
    span { }
    .font {
      a { }
    }
  }
 -->

-------------------

## 插值语法

> #{}
通过 `#{}` 插值语句可以在选择器、属性名和属性值中使用变量。
js中的 ${ }

但大多数情况下，这样使用属性值可能还不如直接使用变量方便，但是使用 `#{}` 可以避免 Sass 运行运算表达式，直接编译 CSS。

<!-
  $name: foo;
  $attr: border;
  p.#{$name} {
    #{$attr}-color: $name;
  }

  // 编译后：
  p.foo {
    border-color: foo;
  }
 -->


> 父选择器 &
`&`为父选择器

<!-
  a {
    color: yellow;
    &:hover{
        color: green;
    }
    &:active{
        color: blank;
    }
  }
 -->


> !default
语法：
$变量: "值" !default

如果变量已经被赋值，不会再被重新赋值，但是如果变量还没有被赋值，则会被赋予新的值。

也就是说 该变量没有被定义过的时候 该值才会生效
<!-
  $content: "First content";
  $content: "Second content?" !default;
  $new_content: "First time reference" !default;

  #main {
    content: $content;
    new-content: $new_content;
  }

  // 编译为：
  #main {
    content: "First content";
    new-content: "First time reference"; }
 -->

注意：变量是 null 空值时将视为未被定义 会被 `!default` 赋值。



> !global
将局部变量提升为全局变量
正常来说我们定义在一个块里面的变量 另一个块里是不能够使用的
但是使用 !global 之后该变量就会被提升到全局作用域下
<!-
  #foo {
    $width: 5em !global
  }

  #bar {
    width: $width
  }
 -->


> !optional
如果 `@extend` 失败会收到错误提示，比如，这样写 `a.important {@extend .notice}`，当没有 `.notice` 选择器时，将会报错，只有 `h1.notice` 包含 `.notice` 时也会报错，因为 `h1` 与 `a` 冲突，会生成新的选择器。

如果要求 `@extend` 不生成新选择器，可以通过 `!optional` 声明达到这个目的.

简而言之：当`@extend`相关代码出现语法错误时，编译器可能会给我们"乱"编译为css，我们加上这个参数可以在出现问题后不让他编译该部分代码

-------------------

## 控制指令

> if(expression, value1, value2)
*三元运算符*
如果没有理解错的话 如果表达式是true 那么会返回value1 否则函数 value2

```scss
p {
  color: if(1 + 1 = 2, green, yellow);
}

// compile:
p{
  color: green;
}
```



> @if 表达式 { 样式... }
当表达式成立的话 会输出 {} 内的表达式
@if 是写在 .p { 内部的 }

`@if` 声明后面可以跟多个 `@else if` 声明，或者一个 `@else` 声明。

如果 `@if` 声明失败，Sass 将逐条执行 `@else if` 声明，如果全部失败，最后执行 `@else` 声明

> `单@if`

```scss
p {
  @if 1 + 1 == 2 {
    color: red;
  }
}

// compile:
p {
  color: red;
}
```

> `@if @else`

```scss
p {
  @if 1 + 1 != 2 {
    color: red;
  } @else {
    color: blue;
  }
}

// compile:
p {
  color: blue;
}
```

> `@if @else if @else`
```scss
$age: 19;

p {
  @if $age == 18 {
    color: red;
  } @else if $age == 19 {
    color: blue;
  } @else {
    color: green;
  }
}

// compile:
p {
  color: blue;
}
```


> @for
指令可以在限制的范围内重复输出格式，每次按要求（变量的值）对输出结果做出变动

*循环语句*

这个指令包含两种格式:

> @for $var from <start> through <end> { ... }
> @for $var from <start> to <end> { ... }
循环输出 { ... } 中的逻辑 

start
end
必须是整数值


区别在于 through 与 to 的含义：
当使用 through 时, 条件范围包含 <start> 与 <end> 的值
<!-
  包含两端
 -->

当使用 to 时条件范围
  *只包含 <start> 的值*
  *不包含 <end> 的值*


```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}

// compile:
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```

```scss
@for $i from 1 through 3 {
  .item-#{$i} { width: 2em * $i; }
}

// compile:
.item-1 {
  width: 2em; }
.item-2 {
  width: 4em; }
.item-3 {
  width: 6em; }
```


> @each $var in <list>
list
是一连串的值 也就是值列表

遍历值列表

```scss
@each $animal in puma, sea-slug, egret, salamander {
  .#{$animal}-icon {
    background-image: url('/images/#{$animal}.png');
  }
}
```

```scss
@each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
  #{$header} {
    font-size: $size;
  }
}
```

一维列表

  ```scss
  @each $animal in puma, sea-slug, egret, salamander {
    .#{$animal}-icon {
      background-image: url('/images/#{$animal}.png');
    }
  }
  
  // compile:
  .puma-icon {
    background-image: url('/images/puma.png'); }
  .sea-slug-icon {
    background-image: url('/images/sea-slug.png'); }
  .egret-icon {
    background-image: url('/images/egret.png'); }
  .salamander-icon {
    background-image: url('/images/salamander.png'); }
  ```

二维列表

  ```scss
  @each $animal, $color, $cursor in (puma, black, default),
                                    (sea-slug, blue, pointer),
                                    (egret, white, move) {
    .#{$animal}-icon {
      background-image: url('/images/#{$animal}.png');
      border: 2px solid $color;
      cursor: $cursor;
    }
  }
  
  // compile:
  .puma-icon {
    background-image: url('/images/puma.png');
    border: 2px solid black;
    cursor: default; }
  .sea-slug-icon {
    background-image: url('/images/sea-slug.png');
    border: 2px solid blue;
    cursor: pointer; }
  .egret-icon {
    background-image: url('/images/egret.png');
    border: 2px solid white;
    cursor: move; }
  ```

maps

  ```scss
  @each $header, $size in (h1: 2em, h2: 1.5em, h3: 1.2em) {
    #{$header} {
      font-size: $size;
    }
  }
  
  // compile:
  h1 {
    font-size: 2em; }
  h2 {
    font-size: 1.5em; }
  h3 {
    font-size: 1.2em; }
  ```

-------------------

## 混合指令
混合指令（Mixin）用于定义可重复使用的样式

> 定义混合指令
> @mixin 样式名 { 样式... }

```scss
// 格式：
@mixin name {
    // 样式....
}
```

```scss
// example：
@mixin large-text {
  font: {
    family: Arial;
    size: 20px;
    weight: bold;
  }
  color: #ff0000;
}
```

> @mixin 样式名($参数, $参数) { 样式... }
参数用于给混合指令中的样式设定变量，并且赋值使用


> 引用混合
> @include 混合名称
引用指令时，按照参数的顺序，再将所赋的值对应写进括号：
```scss
.page-title {
  @include large-text;
  padding: 4px;
  margin-top: 10px;
}
```


> @include 混合名称(实参, 实参)
```scss
@mixin sexy-border($color, $width) {
  border: {
    color: $color;
    width: $width;
    style: dashed;
  }
}

p { 
  @include sexy-border(blue, 1in); 
}
```

> @mixin 可以用 = 表示，
> @include 可以用 + 表示


> 混合中插槽 @content
上面我们知道 我们定义混合 @mixin name[()] { ... }
然后我们可以通过 @include name 的方式来调用混合

也就是我们写在混合中的样式 当我们@include的时候 会被复制到该位置
有的时候 我们不喜欢混合中的内容是定死的 我们希望在调用的时候 由我们自己传递样式

所以就有了 混合中插槽
1. 在混合中使用插槽 @content
2. 在调用@include的时候 写在方法体中的样式 会出现在 @content的区域

```scss
@mixin bgColor {
  @content
}

.banner {
  @include bgColor {
    background: red;
  }
}
```


-------------------

## 函数指令
Sass 支持自定义函数，并能在任何属性值或 Sass script 中使用：

> 自定义函数:

```scss
// 定义变量:
$grid-width: 40px;
$gutter-width: 10px;

@function grid-width() {
  @return $n * $grid-width + ($n 1) * $gutter-width;
}


#sidebar { width: grid-width(5); }
```

  @function 函数名(形参列表) {
    @return 返回值
  }

调用:
函数名()

---

> 内置函数

> 字符串函数
索引第一个为1，最后一个为-1；切片两边均为闭区间

| 函数名和参数类型                        |                  函数作用                   |
| :-------------------------------------| :-----------------------------------------: |
| quote($string)                          |                  添加引号                   |
| unquote($string)                        |                  除去引号                   |
| to-lower-case($string)                  |                  变为小写                   |
| to-upper-case($string)                  |                  变为大写                   |
| str-length($string)                     |        返回$string的长度(汉字算一个)        |
| str-index($string，$substring)          |        返回$substring在$string的位置        |
| str-insert($string, $insert, $index)    |       在$string的$index处插入$insert        |
| str-slice($string, $start-at, $end-at） | 截取$string的$start-at和$end-at之间的字符串 |



> 数字函数

| 函数名和参数类型        |                           函数作用                           |
| ----------------------| :----------------------------------------------------------: |
| percentage($number)     |                       转换为百分比形式                       |
| round($number)          |                        四舍五入为整数                        |
| ceil($number)           |                         数值向上取整                         |
| floor($number)          |                         数值向下取整                         |
| abs($number)            |                          获取绝对值                          |
| min($number...)         |                          获取最小值                          |
| max($number...)         |                          获取最大值                          |
| random($number?:number) | 不传入值：获得0-1的随机数；传入正整数n：获得0-n的随机整数（左开右闭） |



> 数组函数

| 函数名和参数类型                 |                           函数作用                           |
| -------------------------------| :----------------------------------------------------------: |
| length($list)                    |                         获取数组长度                         |
| nth($list, n)                    |                      获取指定下标的元素                      |
| set-nth($list, $n, $value)       |                   向$list的$n处插入$value                    |
| join($list1, $list2, $separator) | 拼接$list1和list2；$separator为新list的分隔符，默认为auto，可选择comma、space |
| append($list, $val, $separator)  | 向$list的末尾添加$val；$separator为新list的分隔符，默认为auto，可选择comma、space |
| index($list, $value)             |                返回$value值在$list中的索引值                 |
| zip($lists…)                     | 将几个列表结合成一个多维的列表；要求每个的列表个数值必须是相同的 |



> 映射函数

| 函数名和参数类型        |                 函数作用                 |
| ----------------------| :--------------------------------------: |
| map-get($map, $key)     |        获取$map中$key对应的$value        |
| map-merge($map1, $map2) |     合并$map1和$map2，返回一个新$map     |
| map-remove($map, $key)  |     从$map中删除$key，返回一个新$map     |
| map-keys($map)          |            返回$map所有的$key            |
| map-values($map)        |           返回$map所有的$value           |
| map-has-key($map, $key) | 判断$map中是否存在$key，返回对应的布尔值 |
| keywords($args)         |  返回一个函数的参数，并可以动态修改其值  |



> 颜色函数

**RGB函数**

  | 函数名和参数类型               |                           函数作用                           |
  | -----------------------------| :----------------------------------------------------------: |
  | rgb($red, $green, $blue)       |                     返回一个16进制颜色值                     |
  | rgba($red,$green,$blue,$alpha) | 返回一个rgba；$red,$green和$blue可被当作一个整体以颜色单词、hsl、rgb或16进制形式传入 |
  | red($color)                    |                   从$color中获取其中红色值                   |
  | green($color)                  |                   从$color中获取其中绿色值                   |
  | blue($color)                   |                   从$color中获取其中蓝色值                   |
  | mix($color1,$color2,$weight?)  |     按照$weight比例，将$color1和$color2混合为一个新颜色      |

**HSL函数**

  | 函数名和参数类型                         | 函数作用                                                     |
  | ---------------------------------------| -----------------------------------------------------------|
  | hsl($hue,$saturation,$lightness)         | 通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色 |
  | hsla($hue,$saturation,$lightness,$alpha) | 通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色 |
  | saturation($color)                       | 从一个颜色中获取饱和度（saturation）值                       |
  | lightness($color)                        | 从一个颜色中获取亮度（lightness）值                          |
  | adjust-hue($color,$degrees)              | 通过改变一个颜色的色相值，创建一个新的颜色                   |
  | lighten($color,$amount)                  | 通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色           |
  | darken($color,$amount)                   | 通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色           |
  | hue($color)                              | 从一个颜色中获取亮度色相（hue）值                            |

**Opacity函数**

  |                                                             |                  |
  | ----------------------------------------------------------| ---------------|
  | alpha($color)/opacity($color)                               | 获取颜色透明度值 |
  | rgba($color,$alpha)                                         | 改变颜色的透明度 |
  | opacify($color, $amount) / fade-in($color, $amount)         | 使颜色更不透明   |
  | transparentize($color, $amount) / fade-out($color, $amount) | 使颜色更加透明   |



> Introspection函数

| 函数名和参数类型               |                           函数作用                           |
| -----------------------------| :----------------------------------------------------------: |
| type-of($value)                |                       返回$value的类型                       |
| unit($number)                  |                      返回$number的单位                       |
| unitless($number)              |           判断$number是否带单位，返回对应的布尔值            |
| comparable($number1, $number2) | 判断$number1和$number2是否可以做加、减和合并，返回对应的布尔值 |
