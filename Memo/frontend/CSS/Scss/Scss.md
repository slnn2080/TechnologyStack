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

---

### @use @forward @import scss的模块化
- https://zhuanlan.zhihu.com/p/413294236

> @use:
- 从其他 sass 样式表中加载 mixins, functions, variables, *并将来自多个样式表的 CSS 组合在一起*

- *由 @use 加载的样式表被称为模块*
- 也就是说 我们使用 @use 引入的文件 可以在当前文件中使用 比如
```scss
// a.scss 文件中 引入了 variable.scss
@use "variable.scss" as var

// 引入的变量文件里面的内容只能在 a.scss 文件中使用
var.$red
```


> 优点:
- 通过 @use 加载的模块不管被引用了多少次，都只会在编译后输出一次到 css 中。
- Sass 一些内置模块，其中有很多实用的函数。*但是使用 @import 多次引入同一模块，会反复输出到 css 中。*


> 查找:
- 2. 通过 @use "module" 使用模块时，不需要写扩展名，程序会自动查找：
  查找 ./module.scss，没有则进行下一步
  查找 ./module.sass，没有则进行下一步
  查找 ./module.css，没有则进行下一步
  查找 node_modules/module/sass/module.scss


> _ 的使用
- 如果 Sass文件只打算作为模块加载，而不是自己编译，文件名以 _ 开头即可，这些被称为部分（partials），它们告诉 Sass 工具不要尝试自己编译这些文件。
- *但是在导入这些模块时可以不用书写 _ 符号。*

---

> @forward:
- @forward 和 @use 使用方式相同，但作用却完全不一样。
- 使用 @forward 的文件 更像是一个公共的文件 将不同的scss文件引入到这个公共的文件内 通过这个公共的文件 可以实现在不同的scss文件中访问公共文件使用 @forward 引入的scss文件

- 一个scss文件使用 使用 @forward 引入了其它文件的情况下
```scss
// global.scss 公共文件 该文件引入了 variable.scss mixin.scss
@forward "variable.scss";
@forward "mixin.scss";


// 别的文件 可以引入 公共文件(global.scss) 通过公共文件来访问 forward 指定的文件 这样实现了 不同样式组件内部可以使用公共文件中定义的多个scss功能
// index.scss
@use "../global" as g
g.$red
g.get()
```

- 文档释义:
- 当本样式表被其他样式表使用 @use 加载之前，先加载一个 Sass 样式表，并且使其 mixins, functions, variables 可用

- 当使用 @use 加载一个文件时， 这个文件中可以使用 @forward 来使另一个文件中的 mixin、函数和变量可以暴露出去。通常用于跨多个文件组织 Sass 库。

- @forward 的作用是转发模块成员，而不是引入成员到当前文件使用，也就是说，通过 @forward 加载一个模块的成员，这些成员并不能在当前文件内访问，而仅仅是将这些成员当作自己的成员对外暴露出去。


> @import 
- 扩展自 css 的 @import，用来加载其他样式表的 styles, mixins, functions, variables

- css 中本身就有 @import，sass 在其基础上进行扩展，可以用来导入模块中的变量，mixin，函数等，以及模块的样式。

- 和 css 中的 @import 不同之处在于，*css 中的 @import 可以是一个线上 url 地址，浏览器会在运行时下载这个文件*，而 *sass 中的 @import 只能在编译打包阶段运行，所以在 sass 中只能导入一个本地存在的 sass/scss/css 文件。*

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

-------------------

### vue环境下
1. 首先运行命令:  
  npm install --save-dev node-sass sass-loader

2. 指定各个版本
```js
"node-sass": "^4.14.1",
"sass-loader": "^8.0.2",

"sass": "1.32.13",  // 这个并没有指定 没写这行 备忘用
```

**注意:**
- 在指定上方的软件版本的情况下 还要注意对应的 node 的版本 
- 比如: 上面的版本在 node -v 14 的时候不会报错 但是 node -v 16 的时候就报错

-------------------

### 编译文件
#### 单文件编译 语法格式:  
```
node-sass 原有的scss文件 生成的css文件  
node-sass 原有的scss文件 -o 生成目录

node-sass a.scss b.css
nod-sass a.scss -o css_file
```

-------------------

#### 多文件编译 语法格式:  
node-sass 原有的scss文件目录 -o 生成的css文件目录
node-sass c -o d

-------------------

#### 文件监听模式
当文件改变的时候 自动编译 在 单 和 多 的基础上添加 -w 命令行参数即可  
```
node-sass -w 原有的scss文件 -o 生成目录
node-sass -w 原有的scss文件目录 -o 生成的css文件目录
```

-------------------

### dart-sass 安装
npm i -g sass
该模块为第三方库 所以可以考虑使用 npm i sass -D(-D == --save-dev)


> dart-sass 使用
需要手动的调用dart语言的api 来去执行一些命令
```js
  let sass = require("sass")
  sass.render({file: scss_filename}, function(err, res) { ... })

  // or

  let res = sass.renderSync({file: scss_filename})

  // 默认情况下 renderSync的速度是render的两倍以上 这是由于异步回调所带来的开销导致的
```

-------------------

### node-sass 和 dart-sass 的区别
- node-sass 和 dart-sass 都是将 sass 文件编译为css文件的工具

- 通过 npm i sass -g 安装的是 dart-sass

> 区别:
- node-sass 是用 node(调用 cpp 编写的 libsass)来编译 sass, 而dart-sass 是用 drat VM 来编译 sass。
- node-sass是自动编译实时的, dart-sass需要保存后才会生效。
- node-sass不包含最新语法, 而dart-sass包含。

> Easy Sass
- VScode的一款插件, 可以自动编译SASS/SCSS文件生成.css和.min.css（去空格注释的压缩文件）保存。您还可以快速编译项目中的所有SCSS/SASS文件。

**注意:**
- 使用easy sass自动编译产生的文件不支持sass的最新语法（可能是该插件支持的是node-sass, 是不包含最新语法, 而我们下载的是dart-sass是包含最新语法的）, 例如下面语法介绍中的模块化（@use）语法就不支持。出现如下提示：

-------------------

## node-sass sass 版本的问题
- vue中欲想使用sass，需要下载sass-loader，sass-loader需要依托于node-sass运行，node-sass的运行环境是node，所以说需要下载sass-loader和node-sass两个包，同时node-sass要兼容node版本。

> 以当前node版本为起点，寻找兼容的node-sass，根据node-sass版本寻找兼容的sass-loader版本，依次安装即可安然使用。(为啥以node为起点呢？因为如果sass是项目开发中途加入的话，肯定以项目为基础)

- node-sass版本库：
  https://github.com/sass/node-sass/tags

- sass-loader版本库：
  https://github.com/webpack-contrib/sass-loader/releases/tag

- 参考链接
- https://blog.csdn.net/weixin_43193877/article/details/122221052


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
easysass.formats表示生成2种文件的格式。

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
哪门计算机语言里面都有变量这个概念 为了照顾一些可能没有听过这个概念的小伙伴们 我们简单说下 变量的含义

变量变量 代表一个可变的量, 举个例子:
打电话, wai 老王 听说你昨天扒窗台从3楼掉下来了 我今天买点 *水果* 去看看你等到了 你再跟我聊聊咋掉下来的 是因为没藏好么？

我说买点水果 这个水果就可以当看成一个变量 具体是什么水果 那就要看我去市场买什么了
买香蕉 水果就是香蕉 买苹果 水果就是苹果

  水果 = 香蕉

等我见到老王了 nuo 这是我给你买的水果 这时候的水果指的就是香蕉是什么

我再举一个例子啊, 我们都打游戏 一般游戏都会有个小地图 小地图下面 经常会有 x y
x: 123, y: 677
这代表了人物的坐标 x y 人物不断地在界面上移动 x y的值就会发现变化 x就是变量名 123就是变量的值 这个值是可以发生变化的

我们可以定义一个变量 就相当于定义了一个容器 一个塑料袋 里面可以存放各种类型的值

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
scss在css的基础上提供了一些scssscript的新功能 听听这个词哈 scsscript scss脚本语言 或者说有点更贴近编程语言了 它为扩展了可以使用变量啊 算数运算 函数 判断等功能

既然说是scssscript那么就会跟其他的语言一样 会有变量 和 数据类型的概念 上一节中我们介绍了变量的概念 这里我们讲讲在scss中的数据类型

SassScript 支持 7 种主要的数据类型：

> 字符串:
- scss支持两种字符串类型
- 1. 有引号的字符串
  - 比如
```scss
$str: "你好 可以认识一下嘛";
$str: "滚"
```

- 2. 无引号的字符串 
  - 比如
```scss
$str: hellonicetomeetyou;
$str: getout
```

```scss
$str: "你好呀";

.view {
  width: 100%;
  padding: 30px;
  background: #003449;
  color: #D3D9DD;

  position: relative;

  &::before {
    // 我们在这里使用下变量
    content: $str;
    padding: 10px;
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);

    color: #2C353B;
    background: #EEEFF0;
  }
}
```

> 插值语法: #{变量名}
- 通过该语法 可以将变量的值插入
- 1. 字符串中
- 2. css属性位置
- 3. 选择器的位置

- 比如:
- 我们定义一个变量 用于保存小伙告白时说的话
```scss
$content: "小张, 我喜欢你很久了 能做我的女朋友么？";

  小张: 滚！ 完了 没戏了

// 小伙再接再厉 又定义了一个变量
$content: "小王, 我喜欢你很久了 能做我的女朋友么？";

  小王: 滚！ 完了 又没戏了
```

- 我们就上面的例子看 有没有发现 两句话中只有 姓名的地方不一样呀 那我是不是可以 把姓名单独定义成一个变量 这样其他的文本都不变 我只需要该姓名的位置就可以了
- 为了满足小伙的愿望 我决定帮助他
```scss
$name: "小张";

// 那我们能不能把 $name 放进下面的字符串里面呢 可以
$content: "小张, 我喜欢你很久了 能做我的女朋友么？";

// 改成:
$content: "#{$name}, 我喜欢你很久了 能做我的女朋友么？";

// 这样是不是我们每次只需要改变量里面保存的名字就可以了呀 我成功的为小伙的表白节省了大量的时间
```

- 上面我们说了 字符串的形式有两种 一种是带引号的 一种是不带引号的字符串
- 其实不带引号的字符串就是为了将变量插在 选择器 和 属性名 的位置上用的

```scss
$selector-name: div;
$attr-name: width;

#{$selector-name} {
  #{$attr-name}: 100px;
  height: 100px;
  background: red;
}
```

- 这里就简单了解下 以后我们讲函数的时候 会有更好玩的用法

**注意：**
在编译 CSS 文件时不会改变其类型。有引号的不会编译为无引号的
只有一种情况例外，使用 `#{}` (相当于${}) 时，有引号字符串将被编译为无引号字符串，这样便于在 mixin 中引用选择器名

------

> 数字类型
- 可以简单的理解 只要有数字出现就是 数字类型
- 我们验证一下
  1, 1px 1em 1rem 100% 1.5

```scss
$num: 1a;
$type: type-of($num);

.view {
  width: 100%;
  padding: 30px;
  background: #003449;
  color: #D3D9DD;

  position: relative;

  &::before {
    content: "#{$num} -- #{$type}";
    padding: 10px;
    position: absolute;
    left: 50px;
    top: 50%;
    transform: translateY(-50%);

    color: #2C353B;
    background: #EEEFF0;
  }
}
```

**注意：** 
单位会和数字当做一个整体，进行算数运算

------

> 布尔型
- 在讲布尔类型之前 我们先讲两个运算符 == !=
- 这两个运算符有什么用呢? 用来比较 运算符两端的值 是否相等 或 不等
- 比如:
  1 == 1    // true 真
  1 == 2
  2 != 3

- 返回值为: 布尔类型
- true / false

- 不知道你们看没看过 一款王自健主持的 是真的么？ 的节目
- 崴过一次脚后,很容易再次扭伤是真的吗? 是 真的就是 true 假的就是 false

- 我们来验证一下:
```scss
$num: 1.5;
$result: $num == 1.5;
$type: type-of($result);    // true  --  bool


$num: 1.5;
$result: $num == 2;
$type: type-of($result);    // false  --  bool
```

- 布尔值有什么用呢? 
- 举个例子 但具体的东西我们拿到 @if 的部分去讲
- 举例:
- 我们进行过html布局都知道 会将整个网页分为几个大的部分 那部分和部分之间是不是有间距呀 margin-bottom 
- 这是一种情况 每一个部分里面可能还会有 标题 和 正文 标题下面是不是会有间距呀 margin-bottom

- 这时候我们就可以这么做
- 如果 是情况1 那么margin-bottom的值为60px
- 如果 是情况2 那么margin-bottom的值为24px

-------

> maps
- map是scssscript中的一种类型 相当于javascript里面的对象
- 它呢也是保存数据的一种方式 我们前面了解过变量 我们前面都是将数据保存到变量里面

- 比如:
```scss
  $name: "青青";
  $age: 18;
  $adress: "江南";
```

- 我们利用变量相展示一个人的信息 但是它们都是单一的一个值 值与值之前并没有联系
- 那我们想体现一个人的完整的信息 也就是将上面的定义的数据 变成一个整体 就可以利用对象
- 我们把上面的3个变量放在一个塑料袋里 它们就变成一个整体的 怎么放呢

> map定义的格式:
```scss
$person: (
  $name: "青青";
  $age: 18;
  $adress: "江南";
);
```

- 现在 name age address 就作为person身上的一个属性出现了
- 我们将这些变量装在一起的好处就是关系明确 方便操作 

- 比如:
- 一般我们都会将 定义的变量放到一个 文件里面 variable.scss 这个文件里面全是变量
- 我们也知道起变量名的时候要见名知意

- 那现在有个需求 我要存下 青青 小兰 的信息怎么办?
```scss
// 青青
$name: "青青";
$age: 18;
$address: "江南";

// 小兰
$name2: "小兰";
$ag2e: 18;
$address2: "江苏";

// 小花 我再来个name3么 既然我们定义的都是一个人的属性 那我是不是在定义变量的时候 定义这个人就好了 将这个人定义成一个map
$qingqing: (
  name: "青青",
  age: 18,
  address: "江南"
);

$xiaolan: (
  name: "小兰",
  ag: 18,
  address: "江苏"
);
```

- 这样这些数据之间的关系是不是明确了很多 也方便管理
- 有人这时候说了 兄嘚啊 我们定义成普通变量的时候 直接可以使用
```scss
$w-full: 100%;

width: $w-full;
```

- 那我们定义成对象 该怎么使用呢?
- scss里面呀 有很多的内置函数 方便我们去操作我们现在在讲的数据类型
- 比如: 字符串 有字符串相关的内置函数 或者 你们就理解为 操作字符串的工具 数组呢 有操作数组的工作 对象map也有操作对象的工具

- 这些工具我们放在后面再讲 这里我们先介绍一个

> map-get(我们定义的对象, 对象中的key)
- 比如我们想把青青的名字取出来 在页面中显示
```scss
&::before {
  content: "#{map-get($qingqing, name)}";
}
```

------

> 空值
- null 代表空
- 比如我们上面定义了 map
```scss
$qingqing: (
  name: "青青",
  age: 18,
);

// 如果我们把对象中的name 取出来展示到页面上 是ok的没有问题的
&::before {
  content: "#{map-get($qingqing, name)}";
}

// 如果我们要展示 address 可以么 对象中没有address吧 我们看看
// 我们将 address 取出来放在一个变量里面
$res: map-get($obj, address);

// 然后检测下 这个变量的类型
$type: type-of($res);

// 然后展示到页面上查看效果
&::before {
  content: "#{$res} -- #{$type}";   // -- null
}
```

- 这就是null 在后续还会有具体的应用 来巩固 不要着急

**注意：**
由于它代表空，所以不能够使用它与任何类型进行算数运算

-------

> 数组 (list)
- 数组呢 也是存储数据的一种方式
- 我们先看看数组的定义: 
- 用空格或逗号作分隔符都属于数组 被分隔的每一项就称之为数组的成员

```scss
div {
  font-family: 'Courier New', Courier, monospace;
  border: 1px solid black;
  padding: 1px 2px 3px 4px;
}
```

- 我们可以想象成 它将被分隔的每一项(也就是每一个成员)放在了一个个的小格子里面
- 每一个小格子都会有一个编号 这个编号 叫做下标

- 下标是从1开始的

- 在scss里面 这个数组本身我觉得没有太大的作用 平时我们存个数据也不会特意去用这个数组, 但是scssscript给这个数组提供了一些内置函数 用来操作这个数组 配合一些条件判断 也有很好玩的用法

- 也就是我们先了解完整个scss的语法 api 功能 然后才能进行综合应用
- 还是一样 这里我们先简单的介绍下操作数组的内置函数 也就是操作数组的工具

- 例子:
```html
<div class="box1"></div>
<div class="box2"></div>
<span class="target"></span>
```

```scss
// 定义个数组
$margin-arr: 50px 100px;


div {
  width: 300px;
  height: 200px;
}

.box1 {
  background: #EF5A40;
}


// 应用在这个盒子里面
.box2 {
  background: #00708D;
  margin: $margin-arr;
}
```

> length(数组)
- 获取数组的长度 有几个成员就是几

```scss
$margin-arr: 50px 100px;
$len: length($margin-arr);    // 2
```

> nth(数组, 下标)
- 我们说了数组的下标是从1开始的
```scss
$margin-arr: 50px 100px;
$item: nth($margin-arr, 1);  // 50px
```

- 还有几个以后再说 这个章节我们主要讲的是数组类型 不在这里介绍太多别的知识

------

> 颜色类型
- 表示颜色的值 都属于颜色类型
- 比如
  blue, #004961, rgba(255,0,0,0.5)

```scss
// 以下的值都是 color
$bg-color: #004961;
$bg-color: red;
$bg-color: rgba(255,0,0,0.5)

$type: type-of($bg-color);

&::before {
  content: "#{$type}";   // color
}
```

- 颜色类型之间也是可以计算的 用的不多 比如一个16进制的数
- 它会分成3段
  11 | 11 | 11
  +
  22 | 22 | 22
  得到
  33 | 33 | 33

-  但一般没有对颜色进行运算的 即使有也是使用 scss提供的函数 比如

> mix(color1, color2, 比例(0-1))
- 将两个颜色按照一定的比例 混合在一起
- 比例的默认值是50%
```scss
$color1: #F7AD25;
$color2: #EF5A40;

background: mix($color1, $color2, 20%);
```

-------------------

## 运算
> 相等运算符 == 和 != 
- 相等操作符常用于条件语句 用来判断 运算符两端的值是否相等 或 不等 返回值为布尔类型
- 前面我们在说布尔类型的时候 简单的使用过 相等运算符 这里就不在展开说了哈 比较简单

---

> 算术操作符 + - * / %
- 这些操作符的作用 就跟我们小时候学的数学是一样的
- 这里我们主要关注下 需要注意的部分

> 1. 数字类型之间的运算

> 加法:
```scss
// 两个数字没有单位 结果也不带单位
1 + 2   // 3 

// 两个数字有单位 结果也带单位 单位也一样
1 + 2px   // 3px
1px + 2   // 3px
1px + 2px // 3px

// 需要注意的是: 如果两个数字带的单位不一样会报错
1px + 2em // 编译期就报错了
```

> 减法:
- 跟加法一样
```scss
10 - 1     // 9
10px - 1   // 9px
10 - 1px   // 9px
10px - 1px // 9px

10px - 1em  // 编译器报错
```

> 乘法:
```scss
10 * 2    // 20
10px * 2  // 20px
10 * 2px  // 20px

// 注意: 两个数字都带单位的话 会报错
10px * 2px  // 报错
10px * 1em  // 单位不一致报错
```

> 除法:
- / 操作符 本身就是css简写语法的一部分 
- 比如
- font-size: 16px / 24px  代表字号/行高

- 差不多的情况还有background属性
- background: url("http://example.com") no-repeat fixed center / cover;

- 所以我们要进行除法计算的时候 要区别于上面的情况的是么 不然就被当做是简写语法是么

- 所以想要被当做是除法 要满足下面的情况
- 1. 计算的时候使用 () 包起来
- 2. 第二个数字后面不能带单位
- 3. 或者两个操作数其中的任意一个作为变量出现的时候 可以不用() 但还是要注意 2 必须是满足的


```scss
10 / 2  // 5
10 / 3  // 3.3333333333


$num: 100px
width: (100px / 2);   // 50px 
width: $num / 2       // 50px


width: 100px / 200px  // 会被直译为 100px / 200px
```

> 取模 %
- 两个数字相除 取余数部分

```scss
10px % 7      // 3px
10 % 7px      // 3px
10px % 7px    // 3px

// 单位不同会报错
10em % 7px
```

> 2. 字符串类型 和 任意类型 做 + 运算 结果会是拼串
- 什么叫拼串呢? 简单的说就是两个串拼接在一起

- 比如:
```scss
 "你好" + "中国"     // "你好中国"
 "你好" + 2         // 你好2
 true + "你好"      // true你好
```

- 其实里面还有一些细节, 比如说在进行拼串的时候
- 我们在前面讲解了字符串有两种类型 一个是带引号的 一个是不带引号
- 上面在示例中我们使用的都是带引号的情况 那么不带引号 和 带引号的字符串进行拼串的时候 结果是什么样的呢？

- 这个留作作业 你们自己去验证 我就不在这里进行过多的总结 什么情况拼串带引号 什么情况拼串不带引号 太繁琐

- 那要说 兄嘚 我较真 我就想总结明白 ok 
- 上面在做演示的时候 我们都是通过 ::before content 属性来在页面上显示的
- 接下来我们使用另一种方式
- 1. 打开终端 全局安装 sass
- npm i sass -g
<!-- 
  卸载的话:
    打开终端 npm uninstall sass -g
 -->

- 2. sass -i
- 进入交互模式

- 3. 开始验证: 比如
```scss
>> "你好" + 1
>> "你好1"

>> "你好" + "小花"
>> "你好小花"

>> 你好 + "小花"
>> 你好小花   // 看到了么 这种情况的字符串结果就不带 ""
```

- 简单的说句就是开始的字符串带引号 结果就带引号
- 开始的字符串不带引号 结果就不带引号 自己验证下哈

- 4. 退出交互模式
- ctrl + c

- 交互模式下还可以验证一些运算哈 自己可以课后玩会

------

> 比较运算符 < > <= >=
- 比较运算符 用来比较的是 数值类型
- 比较运算符 用来比较 符号两端的数值 是 大于 还是 小于 是大于等于 还是小于等于

- 返回的结果是 布尔型
```scss
$res: 2px > 1px;    // true
```

- 比较运算符一般用于条件判断 等待我们后面讲到 @if 的时候 再详细的展开

------

> 逻辑操作符 and or not
- and: 
  我们理解为 且 的关系 也就是 and操作符的两端的表达式 结果都要满足 都要为true的时候 结果才是 true 两端有任意一端不满足条件 结果就是false
```scss
$num: 10px;

// num必须大于1px 同时且 num必须小于20px res的结果才是true 如果任意一段不满足 则结果就是false
$res: $num > 1px and $num < 20px;

---

$num: 2px;

// num必须要大于1px 同时且 num的类型必须是字符串 res的结果是
$res: $num > 1px and type-of($num) == string;   // false
```

- or:
- 我们理解为 或 的关系 也就是 or操作符的两端的表达式 只要有一端是true 那么结果就是true 如果全是false 结果就是false
```scss
$num: 10px;
// 两端 只要任意一段结果为true 那么res的结果就是true
$res: $num > 1px or $num > 20px;
```


- not:
- 取反, true 变 false, false 变 true
```scss
$bool: true;

content: "#{not $bool}";
```

-------------------

## @extend 继承
- 从字面意思也能很好理解, 比如我老爹有钱 我继承了我老爹的资产 那资产是不是就属于我了
- 再比如:
- 你说个很有意思的笑话 结果我笑死了 你成功的继承了我的花呗(当然你只能继承我的欠款)

- 在写网页的时候也是一样的, 有的时候一个元素使用的样式与另一个元素完全相同，相同的样式没有必要再写 这时候我们就可以使用继承 相当于 将一个元素的样式 复制到另一个元素中一样 而且还可以扩展额外的样式。

- 比如:
```html
<div class="box1"></div>
<div class="box2"></div>
```

```scss
.box1 {
  width: 500px;
  height: 300px;
  background: #F7AD25;
}

.box2 {
  // 使用 extend 继承 .box1 中的样式 相当于 复制了一份
  @extend .box1;

  // 还可以扩展自己的样式
  background: #00708D;
}
```

> 格式: @extend 目标选择器
- 在{ }使用 @extend 选择器 记住就*相当于*将目标选择器里面的css内容复制一份 到元素里面

> 特点:
- 1. 可以继承多个;
```scss
.box1 {
  width: 500px;
  height: 300px;
  background: #F7AD25;
}

.error {
  background: red;
}

.box2 {
  @extend .box1;
  @extend .error;
}
```

- 2. 可以连锁继承
- box2继承了box1和error里面的内容 box3继承了box2
```scss
.box1 {
  width: 500px;
  height: 300px;
  background: #F7AD25;
}

.error {
  background: red;
}

.box2 {
  @extend .box1;
  @extend .error;
}

.box3 {
  @extend .box2;
  background: #4493B1;
}
```


> % 占位符选择器
- 我们上面介绍了 @extend 继承的使用方式 但实际上我们不太会直接继承一个元素的样式
- 更多的是 @extend 和 % 配合使用

- 我们先看看怎么定义 占位符选择器
- 我们定义class id的时候 都是这样是么
```scss
// id
#content { ... }

// class
.item { ... }

// 定义占位符选择器
%base { ... }
```

- 那占位符选择器有什么样的用处呢?
- 1. 占位符选择器里面的内容 不会被编译到 css 文件中

- 
- 有种情况 被继承的css类并没有被实际应用，也就是说html代码中没有使用该类，它的唯一目的就是给别人继承的

- 对于这样的类，我们不希望被编译输出到最终的css文件中，编译过去只会增加CSS文件的大小，永远不会被使用。这时候我们就会选择用占位符选择器
```scss
%content-base {
  width: 500px;
  height: 100px;
  border: 1px solid black;
}

.box1 {
  @extend %content-base;
  background: #F7AD25;
}
.box2 {
  @extend %content-base;
  background: #00A65E;
}
```


- % 和 @extend 配合最大的好处就是 逻辑清晰 方便管理 方便复用
- 我们体会下下面的例子

- 需求:
- 正常的链接 点我跳转 >
- 加上 target="_blank" 窗口图标
- 加上 连接 pdf 的时候 我们显示的是 pdf图标

```scss
.btn {
  width: 200px;
  height: 40px;
  border-radius: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  // background: g.$color-primary;
}


%link-base {
  text-decoration: none;
  font-size: 1.4rem;
  position: relative;
  padding-right: calc(1em + 12px);
  line-height: 1.5;

  &::after {
    content: "";
    display: block;

    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    
    background-repeat: no-repeat;
    transition: all 0.2s;
  }

  &:hover {
    opacity: .8;
  }
}

%arrow {
  background-image: url("/image/ic_arrow.svg");
  background-size: 1.5em 3em;
  width: 1.5em;
  height: 1.5em;
}

%blank {
  background-image: url("/image/ic_blank.svg");
  background-size: 1.5em 3em;
  width: 1.5em;
  height: 1.5em;
}

%pdf {
  background-image: url("/image/ic_pdf.svg");
  background-size: 1.75em 7em;
  width: 1.75em;
  height: 1.75em;
}

.link\:normal {
  @extend %link-base;

  &::after {
    @extend %arrow;
  }

  &[target="_blank"] {
    &::after {
      @extend %blank;
    }
  }

  &[href*=".pdf"] {
    &::after {
      @extend %pdf;
    }
  }
}
```

-------------------
### 书签
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

- https://baijiahao.baidu.com/s?id=1707847578036700250&wfr=spider&for=pc