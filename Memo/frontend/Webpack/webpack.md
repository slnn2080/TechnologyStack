### 技巧
- 使用 npm 下载资源

- 1. 下载了 jquery
- npm i jquery

- 2. 引入 
- import $ from "jquery"

----------------

### Webpack是什么
- webpack是一种前端资源构建工具 一个静态模块打包器 在webpack看来 *前端的所有资源文件都会作为模块处理* 它将根据模块的依赖关系进行静态分析 打包生成对应的静态资源(bundle)

> 示例:
- 我们创建了一个 html 页面 当中使用了
- 1. less
- 2. import es6的语法

- 但是上述的东西 浏览器是解析不了的 为了解决上面的需求 我们会维护一个个的小工具 

> 构建工具的概念:
- 找一个大的工具 这个大的工具将小的工具的功能都包含进来了 这样我们只需要关心大的工具如何使用就ok了
<!-- 
  它将前端要做的一系列的小操作 把它整合成了一个大的工具 使其一次性的能处理所有的需求 webpack就是构建工具中的一种
 -->


> 静态模块打包器概念:
- 我们在开发vue react的时候 喜欢在main.js文件中 引入所有的资源 引入的资源都需要交给构建工具去处理
```js
// 引入js资源
import $ from "jquery"

// 引入样式资源
import "./index.less"

// 引入 图片 字体 等其他的资源

......

```

> 那webpack怎么处理呢？ 指定入口文件
- 首先 我们要告诉webpack打包的起点, 也就是入口文件
- 接下来webpack就会根据这个入口文件作为起点开始进行打包 它会将main.js中的每一个依赖记录好 形成一个依赖关系树状结构图
<!-- 
    index.js
    ↙     ↘
  jQ      Less

       ↓

     chunk  --  将上面的依赖形成代码块

       ↓    --  对代码块进行处理 形成 bundle

     boudle
 -->

- 然后它会根据这个树状的结构图中的先后顺序 依次将资源引入进来形成一个chunk(代码块) 然后再对这个代码块进行各项的处理 比如将less编译为css js资源编译成浏览器可以识别的语法等 这些操作统一的概括一下 这个处理的过程 就可以称之为打包 将打包好的资源输出出去(输出出去的东西叫做bundle)
<!-- 
  将代码都引进来形成一个代码块 
 -->

----------------

### webpack的五个核心概念
- 这5个核心的概念也是我们要在 webpack.config.js 中*必须要写*的5个属性(配置项)

> 1. Entry
- 指示webpack从哪个文件作为入口起点开始打包 分析构建内部依赖图

> 2. Output
- 指示webpack打包后的资源 bundles 输出到哪里去 以及如何命名

> 3. module (翻译官) 用于配置Loader
- loader让webpack能够去处理那些非js文件(webpack自身只理解js)
<!-- 
  webpack只认识js 那么它在处理css和图片等资源的时候 就处理不了 会报错 所以要借助loader将它们转化为webpack能看懂的东西 这样webpack才能处理这些资源
 -->

> 4. Plugins
- 用于执行范围更广的任务 插件的范围包括 从打包优化和压缩一直到重新定义环境中的变量等
<!-- 
  上述的loader只能翻译一下 如果还想做些功能更加强大的事儿 还要借助与 plugins

  它也是配合让webpack能够认识更多的东西 让webpack可以对其打包处理 通过安装插件的方式
 -->

> 5. Mode
- webpack使用相应模式的配置 内置的两种模式 

- development(开发模式)
- 描述:
- 会将 process.env.NODE_ENV的值设为 development
- 在开发模式中会自动的启用 NamedChunksPlugin 和 NamedModulesPlugin 

- 特点:
- 能让代码本地调试运行的环境


- production(生成模式)
- 描述:
- 会将 process.env.NODE_ENV的值设为 production
- 在生产模式中会自动的启用 
  FlagDependencyUsagePlugin
  FlagIncludedChunksPlugin
  ModuleConcatenationPlugin
  NoEmitOnErrorsPlugin
  OccurrenceOrderPlugin
  SideEffectsFlagPlugin
  UglifyJsPlugin

- 特点:
- 能让代码优化上线运行的环境 考虑优化措施 以及兼容性处理 这时候我们就要写些生产环境的配置 把项目做好


> 代码展示:
```js
module.exports = {

  entry: "",

  output: {
    
  },
  module: {
    rules: [
      {
       ...
      },
  },

  plugins: [
    
  ],

  mode: ""
}
```

----------------

### 开发环境: webpack基础演示
- 这节我们不通过 配置文件 的方式 输出打包命令

> webpack的指令分为 开发环境指令 和 生产环境指令

> 开发环境指令:
- webpack ./src/index.js -o ./build/build.js --mode=development

> 格式:
- webpack指令 + 要加工的文件(入口文件开始打包) -o 将以加工的文件输出到 + 目标目录路径

> 解析:
- --mode参数:
- 用来指定打包环境

- --mode=development 会只用开发环境去打包

- *在根目录下执行上面的命令*


> 生产环境指令:
- webpack ./src/index.js -o ./build/build.js --mode=production
<!-- 
  生产环境会压缩我们的js代码
 -->


> 安装 + 准备
- 1. npm i webpack webpack-cli -g
- 我们先进行全局安装
<!-- 
  webpack-cli 可以让大家可以通过指令去使用webpack的功能

  最新的版本是
  webpack: 5.72.1
  webpack-cli: 4.9.2

  老师的版本是 
  webpack: 4.41.6
  webpack-cli: 3.3.11
 -->

 
- 2. npm i webpack webpack-cli -D
- 然后再进行局部安装 项目内安装下 (开发时依赖)

- 3. 我们整理一个项目的结构
  | - src       (源代码目录)
    - index.js  (入口起点文件)
  | - build     (webpack处理后输出的目录)


> 验证: webpack可以处理 js 文件
> 终端的结果:
- Hash:
- 每次打包的时候 都会生成一个唯一的hash 相当于id
- 将来我们可以利用上它作为文件命令的一种方式

```js
webpack ./src/index.js -
o ./build/build.js --mode=development

// 输出结果
Hash: 68a1b2f62d3d5b90678c
Version: webpack 4.41.6
Time: 21ms
Built at: 2022/05/14 上午12:06:02

   Asset      Size  Chunks             Chunk Names
build.js  3.84 KiB    main  [emitted]  main
```


> build.js 里面的结果:

```js
/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let add = (x, y) => {\n  return x + y\n}\n\nconsole.log(add(1, 2))\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })
```

- 我们还可以通过 node命令来执行下打包后的js文件 node ./build.js


> 总结:
- 1. webpack能处理 js/json 资源
<!-- 
  我们发现 es6的语法并没有被转 也就是说仅仅是打包了
  疑问: 那既然没转 打包是干嘛用的
 -->

- 2. json文件不用显示暴露 默认就暴露了 所以可以直接import
<!-- 
  improt data from "./src/data.json"
 -->

- 3. webpack不能处理css文件 img文件
- 4. 我们的代码被包含在 eval() 函数里面去了
- 5. 生产环境和开发环境将*es6模块化*编译成浏览器成识别的模块化
<!-- 
  比如 js文件中 有 import等语法 正常浏览器是不认的 但是 打包后 浏览器可以识别了
 -->

----------------

### 开发环境: 打包样式资源
- 上面我们说到 webpack 只能打包js json资源 这里我们看看webpack怎么打包样式资源

- 准备工作:
```js
// 入口文件中 引入样式资源
import "./index.css"
...

```

> Loader的使用
- 我们前面说过一个概念叫做loader 帮助webpack解析一些它不能识别的模块
- 当我们配置loadere后 loader会自动读取对应的配置文件 


> 配置文件可以写在
- 1. package.json中
- 2. .xxxrc
- 3. .xxxrc.js
<!-- 
  写在 js 文件中比较灵活 因为可以写代码来动态的设置值
 -->


> webpack.config.js
- webpack的配置文件 

- 作用：
- 指示webpack干哪些活(当运行webpack指令的时候 会加载里面的配置 以里面的配置去干活)

- *注意*:
- *在配置文件中 我们要使用commonjs的语法*
- 所有的构建工具都是基于nodejs平台运行的 而node的模块化标准采用commonjs
<!-- 
  src: 是项目的源代码
  webpack: 是配置的的代码

  项目代码我们用的是es6 
  配置代码因为基于的node平台所以使用的是commonjs
 -->

- 方式:
- 在 配置文件我们 我们要先暴露一个对象 在对象中我们写webpack的配置
```js
module.exports = {
  // webpack的配置
}
```

- 我们可以在 配置对象中 写webpack的5个核心配置 和 其他的配置项


> 1. entry
- 入口起点 指示webpack以哪个文件为起点开始打包的
- 它会分析入口文件中的内部依赖图
- 类型: String | [字符串数组]
```js
module.exports = {
  entry: "./index.js",
}
```

- 使用 String 的时候 指定的是入口文件
- 使用 array 的时候 入口文件写在最后的位置 前面的js文件是引入到入口文件中的js文件
```js
module.exports = {
  entry: ['./polyfill.js', './index.js'],
}
```
  

> 2. output
- 输出到哪里
- 类型: {}
- 对象中的属性值:
- filename: string 输出到的文件名
- path: string 输出的路径
- path一般使用resolve()函数来拼接路径
<!-- 
  这里会利用path模块 来拼写绝对路径
  const {resolve} = require("path")
  path: resolve(__dirname, "build")

  __dirname: nodejs的变量 代表当前文件的目录的绝对路径
  比如: 
    | - webpack_local
      - webpack.config.js

  __dirname: 就指 webpack_local 这个文件目录
 -->


> 3. module
- loader的配置
- 类型: {}

- 对象中的属性值:
- rules: []

- 数组中写loader的详细配置 每一个loader都是一个对象
```js
module: {
  rules: [
    // 写详细的loader配置
    {
      test: 正则,
      use: [] | loader: ""
      options: {loader的配置}
    }
  ]
}
```


> 4. plugins
- 配置插件 
- loader帮webpack做翻译 插件帮助webpack扩展功能

- 类型: []
- 数组中写详细的配置
- 如果是一个插件 那么我们可以直接new 或者写 ""
- 如果插件需要有配置对象 那么plugins数组里面 每一个插件的类型也是一个数组
[["插件",{插件的配置对象}]]

```js
plugins: [
  // 写详细的插件配置
],
```


> 5. mode
- 配置环境
- 类型: string
- 值为: development | production 只能写一个
```js
mode: "development",
// mode: "production"
```

> webpack来处理css样式资源
- 这里我们需要使用到
  - css-loader 
  - style-loader

- 在 module - rules 中 每一个loader都是以一个对象的形式出现
- loader会去遍历所有的文件 一旦发现 *test属性匹配的文件(css结尾的文件)* 就会对它*进行use属性中定义的loader来处理文件*

```js
module: {
  rules: [
    {
      // 用来匹配哪些文件
      test: /\.文件后缀名$/  // 匹配以xxx后缀名结尾的文件

      // 使用哪些loader来处理文件
      use: [
        "style-loader",
        "css-loader"
      ]
    }
  ]
},
```

> rules数组中的对象中的属性:
- **test** : 对哪些文件进行匹配
- 值为正则

- **use** : 使用多个loader的时候用
- 值为 数组 是要对匹配文件使用多个loader
  - 对匹配的文件 使用loader
  - use数组中配置的选项的执行顺序为: 从右往左(从下到上)
  - 当要使用 css兼容的时候 less-loader在最后 兼容loader在倒数第二个位置

- **loader** : 使用一个loader的时候用
- 值为 字符串 是只使用一个loader

- **options** : 配置loader
- loader的配置项


> 处理样式文件要使用 如下的loader
- "style-loader"
- "css-loader"

> css-loader的作用:
- 将css文件变成commonjs模块加载到js中, 里面的内容是样式的字符串
<!-- 
  可能是在eval()中 我觉得的
 -->

> style-loader的作用:
- 创建一个style标签 将js中的样式资源插入进去 添加到head中生效

**注意：**
- 了解了 两个loader的作用 那么他们的顺序就应该是 先进行css-loader 然后进行 style-loader

---

> 测试下打包样式资源
**技巧:**
- 1. node在找包的时候 会先在当前的目录找 如果找不到会向上一级目录找 所以我们可以在根目录中下包 这样内部的文件目录里面都可以用

- 2. 我们下载的loader看来都是开发依赖

- 3. 我们用的是webpack 4.41.6 cli 3.3.1 所以会出现loader的版本可能过高 跟现在的webpack版本不符合的情况 
- 这时我们可以去github找loader的版本 tags(在分支那)
- 然后查看 package.json 文件 看看webpack的版本 
- https://github.com/webpack-contrib/style-loader
- webpack -v
- webpack-cli -v


> 1. 下包
- npm i style-loader@1.1.3 css-loader@3.4.2 -D
<!-- 
  这里应该是 
  npm i webpack webpack-cli -D
  npm i style-loader css-loader -D

  但是由于我们webpack版本的问题 所以我们在下loader的时候要指定版本
 -->

> 2. 执行 webpack 指令
- 当我们执行webpack指令之后 就会读取配置文件中的信息 按照配置执行
```js
// 结果
[./node_modules/css-loader/dist/cjs.js!./src/index.css] 329 bytes {main} [built]

[./src/index.css] 561 bytes {main} [built]
[./src/index.js] 58 bytes {main} [built]
```

- 我们会发现有个index.css资源 webpack把它打包成模块 然后整理到了index.js文件中

- 我们也可以看看css样式在html中有没有生效
- 我们需要创建html文件将打包后的build.js引入html文件中查看效果

---

> webpack来处理less资源
- 对不同的文件打包那么就要配置不同的loader

```js
// 入口文件中 引入样式资源
import "./index.css"
import "./index.less"
```

- 1. 下载需要的loader 这里我们需要 less less-loader css-loader style-loader 其中less不用配置到webpack.config.js中
<!-- 
  vscode的插件会将less文件在保存的时候自动变成css文件 所以我们还需要下载less
 -->

- "style-loader", : 
  创建style标签 将js文件中的样式资源添加进去 然后放入到head中

- "css-loader",   : 
  将css文件编译为commonjs模块加载到js中

- "less-loader"   : 
  将less文件编译为css文件

- npm i 
  style-loader@1.1.3 
  css-loader@3.4.2 -D
  less@3.11.1
  less-loader@5.0.0

- 2. 在rules中配置翻译less的loader
```js
module: {
  rules: [
    {
      test: /\.less$/,
      use: [
        "style-loader",
        "css-loader",
        "less-loader"
      ]
    }
  ]
},
```

- 3. 执行 webpack

----------------

### 开发环境: 打包html资源
- 这里我们需要 plugins配置 需要下载 html-webpack-plugin 插件

> 1. 下载插件
- npm i html-webpack-plugin -D
<!-- 
  @3.2.0
 -->

- html-webpack-plugin:
- 作用:
- 默认会创建一个空的html文件 引入打包输出的所有资源(js/css)

- 如果我们需要有结构的html文件 我们可以在 new htmlWebpackPlugin({}) 中传入配置项 template 

> template属性
- 根据指定的html文档作为打包后的html页面(复制指定的html文档中的内容 并自动引入打包输出的所有资源)

**注意:**
- 模版html页面中不要自己再引入资源 不然会引入两次

```js
  plugins: [
    new htmlWebpackPlugin({
      template: "指向一个有结构的.html",
      title: ""
      favicon: ""
    })
  ]
```
> title
> favicon
- 字面意思


> 2. 引入 插件
- webpack.config.js 中 先引入插件
```js
const htmlWebpackPlugin = require("html-webpack-plugin")
```

> 3. 在 plugins配置项 中 配置
- 使用插件的方式竟然是new下

```js
  plugins: [
    new htmlWebpackPlugin()
  ]

  // 如果想html页面有内容的话 可以这样
  plugins: [
    // 写详细的插件配置
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
```

> 4. webpack 打包 查看结果


> 代码部分:
```js
const htmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")

module.exports = {

  // 入口起点 指示webpack以哪个文件为起点开始打包的
  entry: "./src/index.js",

  // 输出到哪里
  output: {
    // 输出到的文件名
    filename: "build.js",
    // 输出的路径 这里我们会利用path模块来写绝对路径]
    // __dirname: nodejs的变量代表当前文件的目录的绝对路径 
    path: resolve(__dirname, "build")
  },


  // loader的配置 
  module: {
    rules: [
      // 写详细的loader配置
      {
        // 匹配的文件 值通常为正则表达式 以.css结尾的文件
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },

  // 配置插件 loader帮webpack做翻译 插件帮助webpack扩展功能
  plugins: [
    // 写详细的插件配置
    new htmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],

  // 模式
  mode: "development",
  // mode: "production"
}
```

----------------

### 开发环境: 打包 图片资源
- 当有webpack不识别的资源的时候 我们第一时间要考虑的就是 loader
- 这里我们需要下载两个包

- url-loader
- file-loader: 这个loder不用配置到 module配置项中

- url-loader依赖于file-loader做事情
- npm i url-loader file-loader -D
<!-- 
  url-loader :  @3.0.0
  file-loader : @5.0.2
 -->


> 我们先做些准备工作
- 1. index.less
- 我们在样式文件中也引入了图片

```less
#box1 {
  width: 100px;
  height: 100px;
  background-image: url(../assets/img-1.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box2 {
  width: 100px;
  height: 100px;
  background-image: url(../assets/img-2.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

#box3 {
  width: 100px;
  height: 100px;
  background-image: url(../assets/img-3.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
```

- 2. index.js
- 我们在js文件中引入index.less
- html文件不需要在入口文件中引入 它会被插件自动引入

```js
import "./index.less"
```


> webpack.config.js中的loader配置
- 这个部分我们说两种情况:

> 情况1:
- 只有 less 文件中 通过 background-imgae: url() 的形式引入了图片资源 然后我们要使用webpack对其less进行打包
<!-- 
  一般 不仅仅只有 less文件或者css文件中 有url() 引入的资源
  更多的是html页面里面引入了图片资源
 -->

> 情况2:
- less文件中 和 html文件中 都引入了图片资源

> 要点:
- 1. 打包图片资源所要用到的包
- **url-loader**
- 用来处理 样式中的 url 图片路径的 
<!-- 
  @3.0.0
 -->

- **file-loader**
- url-loader要依赖于file-loader 该loader不用配置在 module 中
- url-loader比file-loader多了一个limit功能
- file-loader就是将资源原封不动的输出出去
<!-- 
  @5.0.2
 -->

- **html-loader**
- 用于处理 html 文件中的 img 图片的 
- 它负责引入图片(加入依赖树 相当于引入到了入口文件中) 从而能被url-loader进行处理
<!-- 
  @0.5.5
 -->

- 2. 因为我们还要解析less代码 所以要配置less-loader
```js
{
  test: /\.less$/,
  use: [
    "style-loader",
    "css-loader",
    "less-loader"
  ]
},
```

- 3. 因为我们要解析url()引入的图片资源 所以要配置url-loader

> options配置项:
- 作用: 用于配置loader

> limit: 
- 用于对指定字节以下的图片进行base64的编码的格式
<!-- 
  url-loader在打包图片的时候 并不是原封不动的输出 
  当发现图片大小 < 8kb 的时候 就会被 base64 处理 将图片转换为base64编码的方式 编码成字符串 浏览器解析这个字符串就会当做是图片的内容去解析

  优点: 减少请求数量(减轻服务器压力)
  缺点: 图片体积会更大(文件请求速度更慢) 一般不会对大图片进行base64的处理 一般在8-12kb以下会
 -->

> esModule: false
- url-loader默认是使用es6模块化标准来进行解析 所以解析的结果也是es6模块化的产物
- 但是 html-loader 是基于commonjs模块化标准进行解析 解析出来的结果是commonjs模块化的产物
- 而我们html页面中的图片也需要解析 html-loader解析后结果要给url-loader去解析 但是两种模块化的产物不匹配 所以我们关闭es6 相当于开启了commonjs

> name
- 对打包后的图片资源进行命名
- name: "[hash:10].[ext]"
- 使用 hash值的前10位来命名

- name: "[name].[ext]"
- 使用 图片原来的文件来命名


```js
  // 图片的loader
  {
    test: /\.(jpg|png|gif)$/,
    loader: "url-loader",
    // loader的配置项
    options: {
      limit: 8 * 1024,
      esModule: false,

      // name: "[hash:10].[ext]",
      // 原来图片的名字还可以这么设置
      name: "[name].[ext]"
    },
  },
```

- 4. 因为我们要解析html页面 img引入的图片资源 所以要配置html-loader
**这个就必须配置 不配置会报错 也就是说 处理图片资源的时候 就配置这两个loader**
```js
{
  test: /\.html$/,
  loader: "html-loader"
}
```

> 完整代码
```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      // 图片的loader
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-loader",
        // loader的配置项
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[name].[ext]"
        },
      },

      // html文件中的img src
      {
        test: /\.html$/,
        loader: "html-loader"
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development"
}
```

----------------

### 开发环境: 打包 其他资源
- 其他资源: 比如字体图标
<!-- 
  这种资源不需要做其他的处理 不需要优化 不需要压缩等 我们只需要输出出去就可以了
 -->

> 对上述知识体系进行扩展
- 我们在配置loader的时候 在rules数组对象中都写过
```js
{
  test:
  use:
  loader:

  // 现在又多了一个 
  exclude: /正则/
}
```

> exclude属性:
- 排除正则匹配的文件 相当于打包其他资源
- 不用经过特殊处理的资源都可以用 file-loader 来进行处理


- 准备工作:
- iconfont - 选择 - 购物车 - 下载代码
- 打开 压缩包 中的 index.html

> 图标字体的使用
- 我们可以看到有3种用法
- 1. unicode 
<!-- 支持ie6 但是不支持多色 -->

- 2. font class  
<!-- 支持ie8以上 -->
- 使用方式:
- 引入 iconfont.css 样式文件
- 通过span标签指定class去写

- 3. symbol
<!-- 只要是通过svg使用这样的图片 -->


> 要点:
- 1. 我们要使用阿里的字体图片 使用方式分为两步
- 引入样式
- span里面写class
- *注意:* 我们没有在html页面中通过link的方式引入资源 而是在入口文件中引入的资源哦
```js
import "../assets/iconfont/iconfont.css"
```

- 2. 我们要打包的是 样式资源 html资源 字体图标资源
- 这类资源都有一个统一的特性就是不用经过特殊的处理
- 所以我们可以在loader配置中 使用 exclude属性 进行排除


> 全部代码
```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const {resolve} = require("path")
module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },

      // 打包其他资源(除了html js css以外的资源)
      {
        // 排除 正则匹配的文件 相当于打包其他资源
        exclude: /\.(css|js|html)$/,
        // 其他资源都会通过file-loader来处理
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development"
}
```

----------------

### 开发环境: devServer
- 情景:
- 我们会将src源代码目录中的代码打包到build目录下
- 但是当我们再在src源代码中做修改之后 必须再次的重新进行打包

- 那是不是说我们又要写新的结构 每次就需要重复的进行打包 太麻烦了
- 所以webpack提供了devServer 帮我们自动的打包 自动的做一些事情

- 这样开发者只需要写源代码就可以了

> 配置项: devServer
- 它不属于前面的5个核心的属性 可以额外的单独的配置
- 作用:
- 用来自动化(自动编译 自动打开浏览器 自动刷新浏览器等)

- 类型: {}
```js
devServer: {

  contentBase: 运行项目的目录 一般都是以绝对路径书写 指向打包后的目录 不是源代码目录,

  compress: true 启动gizp压缩 代码体积会更小 传输速度越快,

  port: 端口号,

  open: true 自动打开默认浏览器,

  // 控制台上会有输出效果 [WDS] 96%
  progress: true 打包进度

}
```

> 特点:
- 只会在内存中编译打包 不会有任何文件的输出
<!-- 
  我们可以将build目录删掉 然后重新构建一次 发现并没有输出build

  当我们运行的是 npx webpack-dev-server 那么仅是在内存层面打包处理

   当我们运行的是 webpack 那么才会有真正的输出
   
   一旦我们终止程序的运行 就会将内存里面的东西删掉
 -->
 
- 它会监视src下的源代码的变化 一旦变化就会自动进行打包 刷新等处理

> 启动devServer的指令: npx webpack-dev-server
- 我们要用这个指令 那么就得下这个包
- npm i webpack-dev-server -D
<!-- 
  @3.10.3

  // webpack5 的时候
  弹幕上说 将 contentBase 改成 static
  然后使用 npx webpack serve 命令
 -->


> 启动命令后 我们通过 localhost:3000 去查看
- 我们修改html代码后 保存后 页面就会刷新

```js
// 服务器
devServer: {
  // 项目构建后的路径
  contentBase: resolve(__dirname, "build"),

  // 端口号
  port: 3000,

  // 启动 gzip 压缩
  compress: true,

  // 自动打开浏览器
  // open: true,

  // 打包进度
  // progress: true
}
```

----------------

### 开发环境: 对上述的知识的整合
- 我们将前面的内容综合在一起 来形成一个开发环境的配置
- 开发环境的配置的目的:
- 就是能让代码运行即可 我们要多种情况都要进行处理 一个处理不好就报错了

> 要点:
- 每一个loader配置项里面都会有 options选项 用于配置loader
- options - outputPath 用于将对应的资源输出到 打包目录下的哪个目录

```js
module: {
  rules: [
    {
      test:
      use:
      
      options: {
        limit:
        name:
        esModule:

        // 首先我们要知道 output 中我们指定了 打包文件要输出到哪里 这里直接指定 打包目录的下层目录就可以

        // 比如这样就是将图片打包后输出到 build/imgs/ 下
        outputPath: "imgs"
      }

    }
  ]
}
```

**注意:**
- 样式loader下没有outputPath 因为样式会打包到js里面去 在样式的loader里面配置outputPath会报错

```js
const HtmlWebpackPlugin = require("html-webpack-plugin")
const { resolve } = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "js/build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: "url-loader",
        options: {
          limit: 8 * 1024,
          esModule: false,
          name: "[hash:10].[ext]",
          outputPath: "img"
        }
      },
      {
        test: /\.html$/,
        loader: "html-loader"
      },
      {
        exclude: /\.(html|css|less|jpg|png|gif|js|json)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    })
  ],
  mode: "development",
  devServer: {
    contentBase: resolve(__dirname, "build"),
    compress: true,
    port: 3000
  }
}
```

----------------

### 生产环境: 构建环境介绍
- 之前我们已经介绍了两种模式 开发模式 和 生产模式 这两种模式就对应着 开发环境 和 生产环境

- 前面我们说过

> 开发环境:
  就是能保证代码在本地调试运行的环境 比如
  源代码中的es6的语法 less文件 -- webpack处理后 -- 资源文件
  将资源文件在浏览器端运行 我们还做了自动化的操作 自动刷新 自动打开浏览器 让开发的效率更高

> 生产环境:
  让代码能够优化上线的环境 比如
  样式问题:
  我们的样式资源在经过webpack处理后是整合在js中的(css-loader将样式文件整合到js中了) 我们的样式在js中就会让js的体积变大 加载的速度就会很慢 因为它是先加载js 才能通过创建style标签 插入到页面中 所以会出现闪屏现象 我们需要做的是将css文件从js中提取出来

> 代码压缩问题:
  html css js代码都在一起 所以要对其进行压缩

> 样式和js代码是有兼容性问题: 
  比如flex和animation等需要加前缀 在低版本的浏览器中运行

> 生产环境目的:
  让我们的代码更好的运行 速度更快 性能更好
  让我们的代码在各个浏览器中都能平稳的运行

  因为生产环境的事儿比较多 如果都放在开发环境中解决 极大程度上会拖慢构建的速度 不利于我们开发 所以这些事情我们要放在生产环境中来做

- 下面我们就对上述的问题 一一在生产环境中如何来配置

----------------

### 生产环境: 提取css成单独文件
- 开发环境中 我们使用的是 style-loader 因为其内部实现了*HMR功能* 可以局部更新 

- 而生产环境中 我们要提取css单独的文件


- 之前通过 style-loader 和 css-loader 的方式 是将样式通过style标签的形式引入到项目中的

- 提取成css文件后 会通过link标签引入css文件



- 准备工作:
- 创建了2个css文件 然后在入口文件中引入

```js
 module: {
  rules: [
    {
      test: /\.css$/,
      use: ["style-loader", "css-loader"]
    }
  ]
},
```
- 如果还像上面的方式进行配置的话 我们css文件在打包后还会在js文件中
- 那怎么才能将css文件单独的从js文件中提取出来 不让js文件的体积那么大呢？ *我们要使用插件*

- 我们的目的是要将css文件单独的提取出来做为一个样式文件 但是经过css-loader之后处理之后 样式文件就整合到js中了 而style-loader是创建一个style标签将样式添加到页面上

- 而我们现在的流程是 要将css-loader整合到js中的样式文件通过下面的插件提取出来成为一个单独的css文件 所以style-loader就不能要了 我们要用下面的插件身上的loader来处理css-loader加工后的js文件
<!-- 
  style-loader不需要的原因是
  我们已经将css提取成单独文件了 所以就不需要创建style标签了
 -->

- 也就是说:
- 之前:
  style-loader
  css-loader

- 现在:
  MiniCssExtractPlugin.loader
  css-loader


> 插件: mini-css-extract-plugin
- 将css提取成一个单独的文件

> 1. 下载:
- npm i mini-css-extract-plugin -D
<!-- 
  @0.9.0
 -->

> 2. 引入
- const MiniCssExtractPlugin = require("mini-css-extract-plugin")

> 3. 在 plugins配置项中配置
```js
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html"
  }),
  new MiniCssExtractPlugin({
    title: '王二狗',
    filename: "css/build.css",
    favicon: "src/assets/images/favicon.ico"
  })
],
```

- 在 new MiniCssExtractPlugin({配置对象}) 的时候可以传递参数
- filename: 可以对我们整合的css文件进行 文件夹的设定和重命名
<!-- 
  之前整合后的文件夹 main.css
  现在可以指定文件夹的同时在对main.css 重命名

  | - css
    - build.css
 -->

- favicon: 图标
- title: 标题


> 4. 修改 loader 配置
- 将原先的style-loader替换为插件上的loader
- 解析:
- style-loader的作用是创建style标签 将样式从js文件中提取出来放入标签插入到页面中

- 而插件的loader是将样式从js文件中提取为单独的一个css文件 通过link的方式引入到项目中

```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        // 创建style标签 将样式放入
        // "style-loader", 

        // 这个loader取代style-loader 作用: 提取js中css成单独文件
        MiniCssExtractPlugin.loader,
        "css-loader"
      ]
    }
  ]
},
```

> 5. webpack命令测试
- 上面我们是在入口文件中引入了 a.css b.css
- 经过我们上面的调整:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>提取css文件</title>
<link href="main.css" rel="stylesheet"></head>
<body>
  <div id="box1">box1</div>
  <div id="box2">box2</div>
<script type="text/javascript" src="build.js"></script></body>
</html>
```

- build目录下多了一个 main.css
- 也就是说将我们项目中的css文件都整合到了 main.css 文件中 并在html页面中通过link标签引入了

- 这样css文件和js文件分割开了 这样js文件的体积也没有那么大 解析速度也会更好一些

----------------

### 生产环境: css的兼容性的处理
- 我们要做css的兼容性处理 都会使用一个库 postcss
- 而 postcss 要想在 webpack 中的使用的话 就需要postcss-loader

- 除了postcss库 我们要需要使用插件 postcss-preset-env
- 这个插件能够帮助postcss识别某些环境从而加载指定的配置 能够让我们的兼容性做的精确到某一个浏览器的版本

- 所以我们需要
  - postcss
  - postcss-loader
  - postcss-preset-env

<!-- 
  - webpack的网址:
  - https://webpack.docschina.org/loaders/postcss-loader
  - 版本不同 写配置的方式也不同 我们这里使用的是视频老师的webpack一系列的版本
 -->


> postcss-loader
- 作用:
- 要将使用postcss就要通过postcss-loader


> postcss-preset-env
- 作用:
- 帮postcss找到*package.json*中的*browserslist*里面的配置
- 通过配置加载指定的兼容性样式

> 下载:
- npm i postcss-loader postcss-preset-env postcss -D
<!-- 
  postcss-loader: @3.0.0
  postcss-preset-env: @6.7.0
  postcss: @7.0.39
 -->


> browserslist
- 要写在package.json中
- browserlist 还可以写成一个数组的形式 里面直接定义下面的写法
```js
"browserlist": {
  // 开发环境的配置
  "development": [
    // 兼容最近的一个chrome版本
    "last 1 chrome version"

    // 还有以下的写法
    "defaults",
    "last 2 version",
    "not ie <= 11",
    ">1%"
  ],

  // 生产环境的配置
  "production": [
    // 生产环境下兼容市场占有率99.8%份额的浏览器
    ">0.2%",
    // 不要已经死了的浏览器
    "not dead",
    // op_mini all 早就死了 也不要
    "not op_mini all"
  ]
}
```

> 要点:
- 开发的环境下我们不要求太多 主要兼容写主要浏览器的版本就可以
<!-- 
  npx browserslist 可以查看自己配置的究竟是哪些浏览器
  我们也可以去github上去搜索browserslist 上面有介绍这里可以写哪些参数
 -->

- 该配置项 还可以写在 项目根目录下 .browserslistrc 配置文件中 在运行loader的时候会自动读取


> 兼容性处理的位置:
- 既然是css的兼容性处理 肯定要写在 css的loader配置里面
- 写在css-loader的下面
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        **这里是postcss-loader的配置位置**,
        *后面如果有less, scss等可以加在这个不分*
      ]
    }
  ]
}
```

> 配置写法:  -- 不使用该方式
- 默认的loader写法 就是以字符串的方式 下面的方式我们不用
- 如果使用下面的方式还有使用配置对象的话就要在项目的根目录中 创建 postcss.config.js 文件 写法参照官网

```js 
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        // 默认配置的写法
        "postcss-loader"
      ]
    }
  ]
},
```

> 配置写法:  -- 使用该方式
- 如果要对loader加上配置的话 就要将loader写成对象的形式
```js
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        MiniCssExtractPlugin.loader,
        "css-loader",
        {
          loader: "postcss-loader",
          options: {
            ident: "postcss",
            plugins: () => [
              // postcss的插件
              require("postcss-preset-env")()
            ]
          }
        }
      ]
    }
  ]
},
```

> 解析:
- 我们将 postcss-loader 写成了对象 在对象中配置下面的属性
**loader属性**
  指明 要使用的loader

**options属性:**
  对该loader的配置 类型为对象

**options对象 >> ident:**
  固定写法 指明要使用的是 postcss 库

**options对象 >> plugins: () => []**
  指明要使用 postcss 库中的什么插件
  类型是一个函数 函数的返回值为数组
  数组中通过 *require("postcss-preset-env")()* 的方式指明要使用的插件
  <!-- 
    postcss中还有很多插件 没事的时候可以看看

    所有的插件都要下载 npm i ... 然后才能使用
   -->


**browserslist 注意:**
- 我们 browserlist 中也是分 development 和 production 的
- browserlist默认是看生产环境的 所以当我们运行项目的时候 browserlist会看生产环境 要想让browserlist看开发环境的配置 我们要在webpack.config.js文件中设置node环境变量

- process.env.NODE_ENV = development
- 这样设置了后才可以

- 默认的话会走production里面的配置


> 完整代码:
```js
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量
// process.env.NODE_ENV = 'development';

module.exports = {
  entry: './index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/built.css'
    })
  ],
  mode: 'development'
};

```

----------------

### 生产环境: 压缩css
- 压缩css的话 我们只需要引入一个插件就可以了
- 到这里我们发现 有的工作会使用loader做 有的工作会使用plugins做

- loader能做的事情一般比较少 大部分的工作都是依靠插件去完成的
<!-- 
  兼容性处理是靠loader去做的
 -->

> 下载插件:
- optimize-css-assets-webpack-plugin
- 作用:
- 压缩css

- npm i optimize-css-assets-webpack-plugin -D

<!-- 
  @5.0.3
 -->


> 引入插件
```js
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")
```


> 使用插件
- 不用再修改它的配置 内部的配置已经足够我们压缩css了
```js
plugins: [
  // 压缩css
  new OptimizeCssAssetsWebpackPlugin()
]
```

- 效果就是css整体会被压成一行 当我们项目的样式越来越多的时候 压缩可以让文件体积很小 请求速度就越快 加载速度也快 用户看的效果就会更快一些 在*上线之前*一定要压缩代码

----------------

### js语法检查eslint
- 我们希望团队的代码的风格是差不多的 或者 语法错误 这样就可以利用 eslint

> 1. 下载
- 我们要是在webpack中使用的话 就需要使用eslint-loader
- eslint-loader 依赖于eslint库

- 所以我们要准备如下的库:
- eslint (不用配置在loader里面)
- eslint-loader
<!-- 
  eslint: @7.32.0
  eslint-loader: @4.0.2
 -->


- 同时 我们要使用代码风格标准 这里推荐 airbnb 所以我们要下载
- eslint-config-airbnb-base
- eslint
- eslint-plugin-import

<!-- 
  eslint-config-airbnb-base: @15.0.0
  eslint-plugin-import: @2.26.0

  ---

  eslint-config-airbnb
    会包含 react的风格代码

  eslint-config-airbnb-base
    没有包含 react的风格代码 有es6语法

  eslint-config-airbnb-base/legacy
    没有包含 react的风格代码 有es5及以下语法
 -->
 

**注意：**
- 语法检查我们只针对js文件来做 同时只检查用户写的源代码 要排除第三方的库(node-modules)

- 可以在loader的配置中 使用 exclude: 正则 来进行排除



> 2. 在package.json中配置 eslint的语法的检查规则
- 我们只配置eslint-loader是不够的 因为loader不知道怎么检查 所以还要配置 风格

- 我们在 package.json 文件中通过 eslintConfig 配置项设置语法的检查规则

- 我们通过 继承的方式 得到airbnb的风格指南
```js
// package.json
"eslintConfig": {
  "extends": "airbnb-base"
}
```

- 视频中说还可以通过 .eslintrc 文件中配置
- 以下是kinto项目的 .eslintrc.json 文件
```json
  {
  "extends": [
    "@nuxtjs",
    "plugin:nuxt/recommended",
    "eslint:recommended",
    "plugin:vue/recommended"
  ],
  "env": {
    "browser": true,
    "node": true
  },
  "plugins": [
    "vue"
  ],
  "rules": {
    "require-jsdoc":"off",
    // タグの最後で改行しないで
    "vue/html-closing-bracket-newline": [2, {"multiline": "never"}],
    // 不要なカッコは消す
    "no-extra-parens": 1,
    // 無駄なスペースは削除
    "no-multi-spaces": 2,
    // 不要な空白行は削除。2行開けてたらエラー
    "no-multiple-empty-lines": [2, {"max": 1}],
    // 関数とカッコはあけない(function hoge() {/** */})
    "func-call-spacing": [2, "never"],
    // true/falseを無駄に使うな
    "no-unneeded-ternary": 2,
    // セミコロンは禁止
    "semi": [2, "never"],
    // 文字列はシングルクオートのみ
    "quotes": [2, "double"],
    // varは禁止
    "no-var": 2,
    // jsのインデントは２
    "indent": [2, 2],
    // かっこの中はスペースなし！違和感
    "space-in-parens": [2, "never"],
    // コンソールは許可
    "no-console": 0,
    // カンマの前後にスペース入れる？
    "comma-spacing": 2,
    // 配列のindexには空白入れるな(hogehoge[ x ])
    "computed-property-spacing": 2,
    // キー
    "key-spacing": 2,
    // キーワードの前後には適切なスペースを
    "keyword-spacing": 2,
    "no-new": 0
  },
  "globals": {
    "$": false
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  }
}
```

> 3. webpack.config.js 中配置 eslint 的loader
```js
rules: [
  {
    // 对js文件进行检查
    test: /\.js$/,

    // 排除 node_modules
    exclude: /node_modules/,

    // 使用 eslint-loader
    loader: "eslint-loader",

    // 配置eslint loader的自动修复功能
    options: {
      // 自动修复eslint错误 这样就不用手动去改了
      fix: true
    }
  }
]
```

> 验证
- 我们发现 我们在index.js文件中故意写的不好的代码 在运行webpack命令后 自动修复成规整的样子了


> 技巧
- 还可以通过注释:
// eslint-disable-next-line

- 取消对下一行的检查
```js
// 下一行eslint所有规则都失效 对下一行不进行eslint检查
// eslint-disable-next-line
console.log(add(3, 3));
```

- 在上线的代码中最好不要有console

----------------

### js兼容性的处理
- 我们做下准备工作 index.js 我们使用了 es6 语法

**最终方案看最下面 babel扩展部分**

```js
const add = (x, y) => x + y
console.log(add(3, 3))
```

> 问题:
- 我们直接用 webpack打包 查看打包后的结果 发现在build.js文件中 还是es6的语法 并没有做兼容性的处理
```js
// 能看到还是箭头函数
eval("const add = (x, y) => x + y\nconsole.log(add(3, 3))\n\n//# sourceURL=webpack:///./index.js?");
```

- 当我们的代码在chrome中的打开是没有的问题的 但是在ie中会报 script1002语法错误 说明ie不认识es6中的语法


> js兼容性的处理 阶段1: 基本的兼容性处理
- 该阶段只能 转换基本的es6语法 (箭头函数 扩展运算符等) 
- 如promise set maps iterator等高级语法就不能进行转换

> 使用方式:
> 1. 下包
- 所以必然要做兼容性的处理 我们要使用 babel 要想在webpack中使用babel就要使用babel-loader

- babel-loader
- @babel/core
- @babel/preset-env
<!-- 
  babel-loader: @8.0.6
  @babel/core: @7.14.6
  @babel/preset-env: @7.14.7
 -->

- npm i babel-loader @babel/core @babel/preset-env -D


> webpack.config.js 中的配置
- 我们在配置文件中配置loader
```js
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
      // 在options写清楚 babel-loader 的配置
      options: {
        // 预设 babel-loader 要进行何种转换 何种兼容性处理 预设环境的兼容性处理 "@babel/preset-env"
        presets: [
          ["@babel/preset-env", {targets: {"chrome": "58", "ie": "11", "firefox": "60", "safari": "11", "edge": "11"}}]
        ]
      }
    }
  ]
},
```

> 要点:
- 1. 我们只检查js文件
```js
test: /\.js$/
```

- 2. 排除 node_modules 因为不能对node_modules里面的代码进行转换
```js
exclude: /node_modules/,
```

- 3. options是对loader的配置 在里面我们要指明进行何种兼容性的处理
- presets的类型是一个数组
- 里面的值还是数组
- presets: [ [xxx, {配置对象}] ]
```js
options: {
  presets: [
    [
      "@babel/preset-env", 
      {
        // 指定兼容性做到哪个版本的浏览器
        targets: {
          "chrome": "58", 
          "ie": "11", 
          "firefox": "60", 
          "safari": "11", 
          "edge": "11"
        }
      }
    ]
  ]
}
```


> js兼容性的处理 阶段2: 处理全部的兼容性问题(相当于引入全部的element-ui组件样式)
- 上面的配置只能转换一些基本的语法 一些高级的es6语法仍然不能转换 所以当我们 new Promise 所以ie会报 promise 未定义的错误

```js 
  eval("var add = function add(x, y) {\n  return x + y;\n};\n\nconsole.log(add(3, 3));\nvar p = new Promise(function (resolve) {\n  setTimeout(function () {\n    console.log(\"定时器执行完了\");\n    resolve(\"成功\");\n  }, 1000);\n});\nconsole.log(p);\n\n//# sourceURL=webpack:///./index.js?");
``` 

- 这时候我们就要使用一个库 *@babel/polyfill*
- 这个包可以做全部的js兼容性处理

- npm i @babel/polyfill@7.8.3 -D


> @babel/polyfill的使用方式
- 这个不是插件 不是loader 不用在webpack.config.js里面配置 我们可以在 index.js 入口文件中引入即可
```js
// index.js
import "@babel/polyfill"
```

- 效果:
- 打包后的js文件变大了 因为里面包含了各种js的兼容性处理
<!-- 
  eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/polyfill */ \"./node_modules/@babel/polyfill/lib/index.js\");\n/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_0__);\n\n\nvar add = function add(x, y) {\n  return x + y;\n};\n\nconsole.log(add(3, 3));\nvar p = new Promise(function (resolve) {\n  setTimeout(function () {\n    console.log(\"定时器执行完了\");\n    resolve(\"成功\");\n  }, 1000);\n});\nconsole.log(p);\n\n//# sourceURL=webpack:///./index.js?");
 -->

> 原理:
- @babel/polyfill 定义好了浏览器不识别的方法 一旦发现浏览器不识别 就直接拿出来这个方法挂载到对应的结构上 这样就可以直接用了 不管识别还是不识别

*问题:*
- 我只要解决部分兼容性问题 但是将所有的兼容性代码全部引入 体积太大了


> js兼容性的处理 阶段3: 按需加载
- 加载指定兼容性的库 而不是引入全部 这里我们就要使用 corejs 库

> corejs的使用方式
- 1. 下载
- npm i core-js -D
<!-- 
  @3.6.4
 -->

- 2. webpack.config.js配置
```js
rules: [
  {
    test: /\.js$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
      presets: [
        [
          "@babel/preset-env", 
          {
            // 按需加载
            useBuiltIns: "usage",
            // 指定按需加载的内容 指定core-js的版本
            corejs: {
              version: 3
            },
            // 指定兼容性做到哪个版本的浏览器
            targets: {
              chrome: "60",
              firefox: "50",
              ie: "9",
              safari: "10",
              edge: "17"
            }
          }
        ]
      ]
    }
  }
]
```

> 预设的配置项中的可传属性
> targets
- 该参数项可以取值为字符串、字符串数组或对象，不设置的时候取默认值空对象{}。
- 该参数项的写法与browserslist是一样的，下面是一个例子

```js
module.exports = {
  presets: [["@babel/env", {
    targets: {
      "chrome": "58",
      "ie": "11"
    }
  }]],
  plugins: []
}
```

- 如果写了 targets 配置项会忽略 根目录中的 browserslist的配置
- 如果没写 targets 配置项 会使用browserslist的配置
- 如果都没写 那么@babel/preset-env就对所有ES6语法转换成ES5的。

---

> useBuiltIns
- 可选值:
- "usage" | "entry" | false(默认值)

- useBuiltIns这个参数项主要和polyfill的行为有关。
- 默认会将polyfill中的所有兼容性处理都引入打包后的代码中
- useBuiltIns取值为"entry"或"usage"的时候，会根据配置的目标环境找出需要的polyfill进行部分引入

**entry:**
- 这种方式不会根据我们实际用到的API进行针对性引入polyfill
- 在使用的时候，'entry'需要我们在项目入口处手动引入polyfill

- 我们在入口文件用import语法引入polyfill（也可以在webpack的entry入口项）。此时的Babel配置文件如下：
```js
npm install --save-dev @babel/cli @babel/core  @babel/preset-env
npm install --save @babel/polyfill

module.exports = {
  presets: [["@babel/env", {
    useBuiltIns: "entry"
  }]],
  plugins: []
}
```

- 注意:
- 使用'entry'这种方式的时候，只能import polyfill一次，一般都是在入口文件。如果进行多次import，会发生错误。


**usage:**
- 这种方式可以根据我们实际用到的API进行针对性引入polyfill
- 在使用的时候，'usage'不需要我们在项目入口处手动引入polyfill


- "usage"在Babel7.4之前一直是试验性的，7.4之后的版本稳定。
- 这种方式不需要我们在入口文件（以及webpack的entry入口项）引入polyfill，Babel发现useBuiltIns的值是"usage"后，会自动进行polyfill的引入。

```js
npm install --save-dev @babel/cli @babel/core  @babel/preset-env
npm install --save @babel/polyfill

module.exports = {
  presets: [["@babel/env", {
    useBuiltIns: "usage"
  }]],
  plugins: []
}
```

- 使用useBuiltIns:"usage"后，Babel除了会考虑目标环境缺失的API模块，同时考虑我们项目代码里使用到的ES6特性。只有我们使用到的ES6特性API在目标环境缺失的时候，Babel才会引入core-js的API补齐模块。

---

> corejs
- 可选值: 2(默认值) | 3
- 这个参数项只有useBuiltIns设置为'usage'或'entry'时，才会生效。

- 2:
- Babel转码的时候使用的是core-js@2版本（即core-js2.x.x）

- 3:
- 某些新API只有core-js@3里才有，例如数组的flat方法，我们需要使用core-js@3的API模块进行补齐，这个时候我们就把该项设置为3。
<!-- 
  corejs取值为2的时候，需要安装并引入core-js@2版本，或者直接安装并引入polyfill也可以。

  如果corejs取值为3，必须安装并引入core-js@3版本才可以，否则Babel会转换失败并提示：
 -->

---

> modules
- 可选值:
- "amd"
  "umd"
  "systemjs"
  "commonjs"
  "cjs"
  "auto"    -- 默认值
  false

<!-- 
  - 我们常见的模块化语法有两种：
  （1）ES6的模块法语法用的是import与export；
  （2）commonjs模块化语法是require与module.exports。
 -->  

- 设置为 false:
- 不会对ES6模块化进行更改，还是使用import引入模块。（不转）

- 设置为 auto | 其他
- 会将es6模块化转换为commonjs或其他指定的模块化方式


**注意:**
- 我们使用了这种方案 就不能用 @babel/polyfill 方案 要把index.js 引入@babel/polyfill的代码注释掉

--- 

> 扩展:

> babel的配置文件
- 1. babel.config.js    -- 采取这个比较好
- babel在执行的时候会默认在当前目录寻找babel的配置文件

- 2. .babelrc | .babelrc.js 配置文件

- 3. package.json 配置文件

- 上述的3种配置方式使用一种就可以 作用都是一样的


> @babel/core
- @babel/cli依赖@babel/core，因此也需要安装@babel/core这个Babel核心npm包。

> @babel/preset-env
- ES6转换ES5的语法转换规则，我们在Babel配置文件里指定使用它。

> Babel的主要工作有两部分
- 1. 语法转换
- 2. 补齐API

> 理解:
- Babel默认只转换新的JavaScript语法（syntax），而不转换新的 API。

- 新的API分类两类:
- 1. Promise、Map、Symbol、Proxy、Iterator等全局对象及其对象自身的方法
- 例如Object.assign，Promise.resolve

- 2. 新的实例方法
- 例如数组实例方法[1, 4, -5, 10].find((item) => item < 0)
- 如果想让ES6新的API在低版本浏览器正常运行，我们就不能只做语法转换。

- 3. babel7的命名是 @babel/ babel6的命名是 babel- 本质是一样的 只是版本不一样


- presets: 预设数组 (所有的预设都要先npm i 然后才能使用)
- plugins: 插件数组 (所有的插件都要先npm i 然后才能使用)

- 每一个插件或预设都是一个npm包
- 这些插件或者预设在编译过程中将我们的es6代码转成es5 但是babel插件的数量非常的多 处理es2015的就好几个 es2018也有很多 如果只配置插件数组 那么我们的plugins配置项中就会特别的臃肿

- presets预设就是帮我们解决这个问题的 预设是一组babel的插件集合(插件包) 这样我们只需要用一个预设代替就可以了


> 插件和预设的配置
- 每个插件是插件数组的一成员项
- 每个预设是预设数组的一成员项
- 默认情况下，成员项都是用字符串来表示的，例如"@babel/preset-env"。

- 如果我们要对插件或预设进行设置参数的话 那么成员项就要写成["插件或预设名",{配置项}]

- 例如:
```js
 {
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "entry"
      }
    ]
  ]
}
```

- Babel官方的preset，我们实际可能会用到的其实就只有4个：
  @babel/preset-env   -- 一般这个就够用了
  @babel/preset-flow
  @babel/preset-react
  @babel/preset-typescript


> @babel/polyfill
- 由两个npm包*core-js*与*regenerator-runtime*组合而成的

- 上面我们就使用它进行了js兼容性的处理(全部引入)

> 使用方式
- 1. 直接在html文件引入Babel官方的polyfill.js脚本文件
- 2. 在前端工程的入口文件里引入polyfill.js
```js
import './polyfill.js';
import '@babel/polyfill';

// 还可以在 webpack 的配置文件中引入
const path = require('path');
module.exports = {
  // 这里
  entry: ['./polyfill.js', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
```

- 3. 在前端工程的入口文件里引入core-js/stable与regenerator-runtime/runtime
- 该方法需要我们单独安装单独安装core-js与regenerator-runtime这两个npm包，这种方式core-js是默认是3.x.x版本
<!-- 
  注意:
  - 如果选择该方式 就不能再安装 @babel/polyfill

  npm install --save core-js regenerator-runtime

  import "core-js/stable";
  import "regenerator-runtime/runtime";
 -->

> 4. (推荐) 在前端工程构建工具的配置文件入口项引入core-js/stable与regenerator-runtime/runtime
```js
npm install --save core-js regenerator-runtime

const path = require('path');
module.exports = {
  entry: ['core-js/stable', 'regenerator-runtime/runtime', './a.js'],
  output: {
    filename: 'b.js',
    path: path.resolve(__dirname, '')
  },
  mode: 'development'
};
```

**注意:**
- 从babel7.4开始，官方不推荐再使用@babel/polyfill了

-----------

> @babel/plugin-transform-runtime
- 在我们利用babel做语法转换的时候 babel内部需要在转换后的代码里面注入一些函数才能正常工作
- _classCallCheck
- _defineProperties
- _createClass

- 我们会看到转换后的代码上面 会有这些函数的声明 这些函数就是辅助函数
- @babel/preset-env在做语法转换的时候，注入了这些函数声明，以便语法转换后使用。

- 但样这做存在一个问题。在我们正常的前端工程开发的时候，少则几十个js文件，多则上千个。如果每个文件里都使用了class类语法，那会导致每个转换后的文件上部都会注入这些相同的函数声明。这会导致我们用构建工具打包出来的包非常大。


> 使用方式:
- 1. 下载
- npm install --save @babel/runtime
  npm install --save-dev @babel/core  @babel/preset-env @babel/plugin-transform-runtime

- 2. 在 *babel.config.js* 里面进行配置
```js
{
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    "@babel/plugin-transform-runtime"
  ]
}

//  或者这样
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

- 还可以传入配置
```js
{
  "plugins": [
    ["transform-runtime", {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": "babel-runtime"
    }]
  ]
}
```

- helpers:
- 默认值: true
- 表示是否开启内联的babel helpers(即babel或者环境本来的存在的垫片或者某些对象方法函数)(clasCallCheck,extends,etc)在调用模块名字(moduleName)时将被替换名字。

- polyfill:
- 默认值: true
- 表示是否把内置的东西(Promise,Set,Map,tec)转换成非全局污染垫片。

- regenerator:
- 默认值: true
- 是否开启generator函数转换成使用regenerator runtime来避免污染全局域。

- moduleName
- 默认值: babel-runtime
- 当调用辅助（内置垫片）设置模块（module）名字/路径.

- https://lequ7.com/guan-yu-babelbabeltransformruntime.html

--- 

**js兼容的最终方案:**
- @babel/cli: babel-cli是通过命令行输入指令执行

```js
npm install --save @babel/runtime-corejs3
npm install --save-dev @babel/cli @babel/core  @babel/preset-env @babel/plugin-transform-runtime

// babel.config.js
module.exports = {
  "presets": [
    "@babel/env"
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

> @babel/plugin-transform-runtime
- 而 @babel/plugin-transform-runtime 有3大作用
- 1. 自动移除语法转换后内联的辅助函数（inline Babel helpers），使用@babel/runtime/helpers里的辅助函数来替代。这样就减少了我们手动引入的麻烦。

- 2. 当代码里使用了core-js的API，自动引入@babel/runtime-corejs3/core-js-stable/，以此来替代全局引入的core-js/stable;

- 3. 当代码里使用了Generator/async函数，自动引入@babel/runtime/regenerator，以此来替代全局引入的regenerator-runtime/runtime；


> 演示 js兼容方案的最终处理方式
- 1. 使用 babel.config.js 
```js
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}


// 我以为的按需加载的配置 实际上打包的结果比上面的大
module.exports = {
  presets: [
    ["@babel/preset-env", 
      {
        useBuiltIns: "usage",
        corejs: 3,
        targets: {
          "chrome": "58", 
          "ie": "11", 
          "firefox": "60", 
          "safari": "11", 
          "edge": "11"
        }
      }
    ]
  ],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

- 2. webpack.config.js
```js
// loader配置项
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: "babel-loader",
    }
  ]
},
```

- 3. package.json里面使用的版本
```js
"devDependencies": {
  "@babel/core": "^7.17.10",
  "@babel/plugin-transform-runtime": "^7.17.10",
  "@babel/preset-env": "^7.14.7",
  "@babel/runtime-corejs3": "^7.17.9",
  "babel-loader": "^8.0.6",
  "core-js": "^3.22.5",
},
```

- 其实我们感觉 都使用项目根目录 配置文件 的方式可能会更清晰些

----------------

### 压缩 js
- js压缩很简单 在最初始的webpack配置下 只需要将 
- mode: development -> production 就可以启动js压缩

- 因为生产环境下会自动压缩js代码 我们不需要操心这些事
- 上面说过在生产环境中 webpack会加载很多的插件 其中有一个 UglifyJsPlugin插件 该插件就会压缩js代码

```js
const {resolve} = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
  ],

  // 修改为 production
  mode: "production"
}
```

- 如果我们不写 mode 配置项 默认就是 production

----------------

### 压缩 html
- 前面css做了兼容性处理 postcss-preset-env js做了兼容性处理 @babel/preset-env 
- html没办法做兼容性处理 浏览器认识就认识 不认识就是不认识 所以我们不需要对html做兼容性处理 只需要考虑html的压缩

- 通过我们前面的插件: HtmlWebpackPlugin插件来压缩 html代码
<!-- 
  htmlWebpackPlugin:
  前面我们使用该插件用来进行html资源的打包
 -->

- 我们在该插件的配置项里面添加 minify

> minify
- 类型: {}

- 对象内的选项:
- collapseWhitespace: true
- removeComments: true

```js
plugins: [
  new HtmlWebpackPlugin({
    template: "./src/index.html",

    // 压缩html代码的配置项
    minify: {
      // 移除空格
      collapseWhitespace: true,
      // 移除注释
      removeComments: true
    }
  }),
],
```

----------------

### 生产环境: 对上述的知识的整合
- 结合上面的所有知识体系 然后完成一个生产环境的配置 

> 要点
- 1. less的loader配置中 也要做css的兼容性处理

- 2. 我们对 .js 文件做了 eslint 处理 又对 .js 文件做了兼容性的处理 正常来讲 一个文件只能被一个loader处理 当一个文件要被多个loader处理的时候 那么一定要指定loader的执行先后顺序

- 我们要先执行 eslint 再执行 babel
  - 1. eslint-loader是做语法检查的 一旦我们检查出语法错误 后面的操作就没有意义了

  - 2. babel-loader会将es6语法转换为es5语法 一旦转换之后再进行eslint检查就会报语法错误

  - 我们要在 loader 配置项中 和 test 同级 加上 *enforce: "pre"*
  - 加上这个属性后 这个类型的文件对应的loader会是 加上该属性的loader先执行

```js
{
  test: //,
  exclude: //,

  // 优先执行
  enforce: "pre",

  loader: ""
  ...
}
```

> 完整的代码展示部分
```js
// package.json
{
  "name": "webpack_pro",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "jquery": "^3.6.0",
    "webpack-dev-server": "^3.10.3"
  },
  "devDependencies": {
    "@babel/core": "^7.17.10",
    "@babel/plugin-transform-runtime": "^7.17.10",
    "@babel/preset-env": "^7.14.7",
    "@babel/runtime-corejs3": "^7.17.9",
    "babel-loader": "^8.0.6",
    "core-js": "^3.22.5",
    "css-loader": "^3.4.2",
    "eslint": "^7.32.0",
    "eslint-config-airbnb-base": "^15.0.0",
    "eslint-loader": "^4.0.2",
    "eslint-plugin-import": "^2.26.0",
    "file-loader": "^5.0.2",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "less-loader": "^5.0.0",
    "mini-css-extract-plugin": "^0.9.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss": "^7.0.39",
    "postcss-loader": "^3.0.0",
    "postcss-preset-env": "^6.7.0",
    "style-loader": "^1.1.3",
    "url-loader": "^3.0.0",
    "webpack": "^4.41.6",
    "webpack-cli": "^3.3.11"
  },
  "browserslist": {
    "development": [
      "defaults",
      "last 2 version",
      "not ie <= 11",
      ">1%"
    ],
    "production": [
      ">0.1%",
      "not dead",
      "not op_mini all"
    ]
  },
  "eslintConfig": {
    "extends": "airbnb-base"
  }
}



// webpack.config.js
const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin")


// 配合css js兼容性处理
process.env.NODE_ENV = "production"

// 生成环境配置
module.exports = {
  entry: "./index.js",
  output: {
    filename: "build.js",
    path: resolve(__dirname, "build")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MniCssExtractPlugin.loader,
          "css-loader",
          // css的兼容性处理 还需要在定义 browserslist
          {
            loader: "postcss-laoder",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")()
              ]
            }
          }
        ]
      },

      // less文件也需要做兼容性处理 位置倒数第二位
      {
        test: /\.less$/,
        use: [
          MniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-laoder",
            options: {
              ident: "postcss",
              plugins: () => [
                require("postcss-preset-env")()
              ]
            }
          },
          // 经过less-loader就是css文件了
          "less-loader"
        ]
      },
      // js的语法检查 在package.json中要添加eslintConfig配置项
      {
        test: /\.js$/,
        exclude: /node_modules/,
        // 优先执行
        enforce: "pre",
        loader: "eslint-loader",
        options: {
          fix: true
        }
      },
      // js兼容性处理 项目根目录下要创建babel-config.js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
      // 图片的处理
      {
        test: /\.(jpg|png|gif)$/,
        loader: "url-laoder",
        options: {
          limit: 8 * 1024,
          name: "[hash:10].[ext]",
          outputPath: "imgs",
          esModule: false
        }
      },
      // 处理html结构中的图片
      {
        test: /\.html$/,
        loader: "html-loader",
      },
      // 处理其他资源s
      {
        exclude: /\.(js|jpg|png|gif|html|css|less)/,
        loader: "file-loader",
        options: {
          outputPath: "media"
        }
      }
    ]
  },
  plugins: [
    // 提取css文件
    new MniCssExtractPlugin({
      filename: "build.css"
    }),
    // html文件打包 以及 压缩
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    // 压缩css文件
    new OptimizeCssAssetsWebpackPlugin()
  ],
  // 压缩js
  mode: "production"
}


// babel.config.js
module.exports = {
  presets: ["@babel/preset-env"],
  plugins: [
    ["@babel/plugin-transform-runtime", {
      "corejs": 3
    }]
  ]
}
```

----------------

### webpack 性能优化: 
- 从环境的角度 谈性能优化 分两种
- 1. 开发环境性能优化
- 2. 生产环境性能优化


> 开发环境性能优化
- 优化webpack的性能 这里我们从两个角度来看
- 1. 优化打包构建速度(能够更快的看到效果)
- 2. 优化代码调试 让其更加友好
<!-- 
  代码出错了 要告诉我们错在哪里 sourceMap
 -->


> 生产环境性能优化
- 1. 优化打包构建速度
- 2. 优化代码运行的性能(代码在浏览器端运行的性能)

----------------

### 优化 开发环境 的打包构建速度 HMR
- 我们现在项目中存在的问题
- 描述:
- 我们在入口文件中 index.js
```js
import "./assets/style/index.less"

console.log("js文件被加载了")
const add = (x, y) => x + y
console.log(add(3,3))
```

- 我们发现当我们修改 index.less 文件里面的内容时 index.js 文件也会被加载

- 看似我们只修改了样式文件 实际上是把js文件也重新打包了一次
- 假如我们js文件中 引入了其它的模块 当其它模块的内容被修改后 整个关系树也会被重新渲染

- 问题:
- 假如我们有100个js模块 100个样式模块 只要我修改了其中的某一个模块 整个这200个模块都要重新打包 这样的话 打包构建速度是非常慢的
<!-- 
  假如有 10000 个模块是不是更加的恐怖
 -->

- 我们想实现的是 当只有一个模块发现了变化 仅只打包这一个文件就可以了 其他模块是不变的 相当达到这点 就要使用webpack中的HMR功能


> HMR (hot module replacement) 热模块替换
- 作用:
- 一个模块发生变化 只会重新打包这一个模块 而不是打包所有
- 极大的提升代码的构建速度
 
> 实现:
- devServer中支持HMR功能 我们只需要在 devServer配置项中 添加 hot 属性 设置为 true 即可
```js
// 服务器
devServer: {
  contentBase: resolve(__dirname, "build"),
  port: 3000,
  compress: true,
  open: true,
  progress: true,

  // 开启 HMR 功能
  hot: true
}
```

- 新配置项要生效 必须要重启 webpack 服务
- npx webpack-dev-server

- 检查是否开启了 HMR 功能:
- 在 console 面板上会有
- [WDS] Hot Module Replacement enabled


> 我们要检测的目标文件有
- 1. 样式文件
- 2. html文件
- 3. js文件

- 当我们开启了 HMR后 (hot: true) 我们看下上述的3种文件类型有什么样的变化

> 1. 样式文件
- 当我们修改样式文件后 可以热更新了
- 因为 style-loader 里面实现了 HMR功能 它会自动的做 所以我们不需要做了
<!-- 
  所以这也是我们在开发环境使用的style-loader 而生产环境中我们提取css单独文件

  因为开发环境借助style-loader可以让我们的性能更好 打包速度更快
  但是上线的时候我们考虑的是代码的性能优化 所以不能用style-loader
 -->

---

> 2. js文件
**问题:**
- 当我们修改js文件后 发现没有热更新 所有模块全部打包了
- 所以 默认情况下 js文件不能使用HMR功能的

> ↑ 解决 js文件的 问题: module.hot.accept()方法包裹目标js文件
- 比如:
- 我们在 index.js 文件中 引入了 print.js 文件
- 要想修改 print.js 文件不会更新整个依赖树的话 我们需要在 调用print() 的外成做判断处理

```js
if(module.hot) {
  module.hot.accept("要导入(监视)的js文件路径", function() {
    // 当监视的js文件发生变化的时候 执行回调里面的逻辑
  })
}
```

- 整体代码
```js
import print from "./assets/js/print"

import "./assets/style/a.css"
import "./assets/style/b.css"

const add = (x, y) => x + y;
console.log(add(3, 3));


// 会去全局找 module 变量 看看 module 上面有没有 hot属性
if(module.hot) {
  // 一旦有 hot 说明: 说明开启了HMR功能
  module.hot.accept("./assets/js/print", function() {
    // module.hot.accept() 会监听 print.js 文件的变化 一旦发生变化 其他模块不会重新打包构建 会执行回调函数 回调函数中 我们执行 引入js文件的相关代码
    print()
  })
}

// 如果我们不使用 module.hot.accept() 一旦一个js模块发生变化 所有的模块都会重新打包
```

- 当还有其他js模块的时候 继续写 if(module.hot) { ... }

**注意:**
- js文件的HMR 我们只会针对非入口文件的js文件去做HMR功能

---

> 3. html文件
- 当我们修改html文件后(<h3>title</h3> -> <h3>title!!!</h3>)发现
- [HMR] Nothing hot updated

**问题1:**
- 默认情况下 html文件不能使用HMR功能的 会将所有模块全部打包重新渲染

**问题2:**
- html文件不能热更新了(我们本地修改的代码 它并没有重新编译 并没有重新刷新浏览器)
- 页面上没有显示我们修改后的结果 没有出现 !!!

> ↑ 解决 html文件的 问题2: 修改 entry 的写法
- 当我们设置了 devServer - hot: true 后 入口文件的书写方式 要改成 这样当我们修改html页面的内容后 页面会实时更新了
```js
// 换成数组的写法 元素1为入口文件 元素2为模版html文件
// 将html文件引入(是不是说 也将html文件添加到依赖关系树里)
entry: ["./index.js", "./src/index.html"],
```


> ↑ 解决 html文件的 问题1: html文件不需要 HMR 功能
- html文件只有一个 所以一旦html文件发生变化 它没有其他文件 所以它只需要更新这一个文件 就是不管怎么做 这一个html文件肯定会发生变化的 既然一定要变化 那就意味着没有办法优化
<!-- 
  不像js js模块有n个 其中一个变 那其他的不变
 -->

----------------

### 优化 开发环境 sourceMap
