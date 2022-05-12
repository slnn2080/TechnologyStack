### 技巧
- 使用 npm 下载资源

- 1. 下载了 jquery
- npm i jquery

- 2. 引入 
- import $ from "jquery"

----------------

### Webpack是什么
- webpack是一种前端资源构建工具 一个静态模块打包器 在webpack看来 *前端的所有资源文件都会作为模块处理* 它将根据模块的依赖关系进行静态分析 打包生成对应的静态资源(bundle)

> 演示:
- 我们创建了一个 html 页面 当中使用了
- 1. less
- 2. import es6的语法

- 但是上述的东西 浏览器是解析不了的 为了解决上面的需求 我们会维护一个个的小工具 

> 构建工具的概念:
- 找一个大的工具 这个大的工具将小的工具的功能都包含进来了 这样我们只需要关系大的工具如何使用就ok了
<!-- 
  它将前端要做的一系列的小操作 把它整合成了一个大的工具 使其一次性的能处理所有的需求 webpack就是构建工具中的一种
 -->


> 静态模块打包器
- 我们在开发vue react的时候 喜欢在main.js文件中 引入所有的资源 引入的资源都需要交给构建工具去处理
```js
// 引入js资源
import $ from "jquery"

// 引入样式资源
import "./index.less"

// 引入 图片 字体 等其他的资源


......
```

- 那webpack怎么处理呢？
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

> 1. Entry
- 指示webpack从哪个文件作为入口起点开始打包 分析构建内部依赖图

> 2. Output
- 指示webpack打包后的资源 bundles 输出到哪里去 以及如何命名

> 3. Loader (翻译官)
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
- 在生产模式中会自动的启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin

- 特点:
- 能让代码优化上线运行的环境 考虑优化措施 以及兼容性处理 这时候我们就要写些生产环境的配置 把项目做好
