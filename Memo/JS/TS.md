### Type Script是什么?
- 以JS为基础构建的语言, 是一个js的超集
- 可以在任何支持js的平台中执行
- 由动态的js语言变成了静态的js语言, 扩展了js并添加了类型
- TS不能被JS解析器直接执行, 要编译后才能通过js执行


> 安装Ts编译器
- 将我们的ts文件转换为js文件
- npm i typescript -g
<!-- 
  输入命令 tsc 看看安装成功没
 -->

> 通过 tsc .ts文件 编译
- 在.ts文件的目录下
- tsc 文件名.ts
<!-- 
  同目录下会出现js文件
 -->

------------------

### TS的编译选项

> 监听指定文件 进行编译
- 命令
- tsc app.ts -w
<!-- 
  监听app.ts文件的变化, 实时编译 跟nodemon 像不像

  ctrl+c 停止监听
 -->


> 编译 / 监听 所有文件
- 1. 先在项目中创建 tsconfig.json 文件
<!-- 
  ts编译的配置文件 里面留个 { ... } 啥也不行都行 但是编译文件必须要有这个 tsconfig.json
 -->

- 2. 执行命令
- tsc / tsc -w
- 编译该目录下的所有ts文件, 或者监听所有的ts文件
<!-- 
  该项目下的所有ts文件都会被监听或者编译
 -->

------------------

> tsconfig.json 配置
- 这是ts编译器的配置文件, ts编译器可以根据它的信息来对代码进行编译

- ** 表示任意目录
- *  表示任意文件
<!-- "include": ["./src/**/*"] src文件夹下的任意目录任意文件 -->

  {
    "include": ["./src/**/*"],
  <!-- 
    include 包含 指定要编译的文件:
    include 的值是一个数组, 数据里面放需要编译ts文件的路径

    我们直接执行tsc命令 编译的是所有ts文件 在开发中并不是所有的ts文件都需要编译
    include用来指定哪些ts文件需要被编译
  -->


    "exclude": ["./src/hello/**/*"]
  <!-- 
    exclude 定义需要排除在外的目录:
    exclude 的值是一个数组, 数据里面放不需要编译ts文件的路径

    src下的hello文件夹里面的ts文件不需要被编译
    
    有一些文件我们是不希望被编译的 必须我们的项目里会有一些我们下载的模块node_module这些模块是不需要被编译的

    默认值:
    ["node_modules", "bower_components", "jspm_packages"]
    不写exclude也会排除上面的文件夹
  -->


    "extends": "继承配置文件的目录"
  <!-- 
    当配置文件特别的复杂 并不想重复写的时候 比如我想把xxx.json放在tsconfig.json里面 还不想自己写 就可以写这个属性
  -->


    "files": ["core.ts"]
  <!-- 
    include是可以文件夹设置的
    files是直接给指定文件设置

    也就是说 只编译 core.ts 文件
    -->

    "compilerOptions": {
      
      // target 用来指定ts被编译为的ES版本
      "target": "ES3",

      // 指定要使用的模块化的规范
      "module": "CommonJS",

      // lib用来指定项目中要使用的库
      "lib": ['示例:dom'],

      // 指定编译后文件所在的目录
      "outDir": "./dist",

      // 将代码合并成一个文件, 将编译后的文件合并到app.js文件中
      "outFile": "./dist/app.js",

      // 指定代码的根目录
      "rootDir": "./src",

      // 是否对js文件编译 默认是false
      "allowJs": true / false,

      // 使用ts的规范检查js代码是否符合ts的语法规范 默认值是false;
      "checkJs":true,

      // 是否删除注释 js文件中不会有注释了 默认false
      "removeComments": true / false,

      // 不对代码进行编译
      "noEmit": true / false,

      // 当有错误的时候就不生成编译文件 默认值为false
      "noEmitError": true / false,

      // 用来设置编译后的文件是否使用严格模式 默认值为false
      "alwaysStrict": true / false,

      // 是否不允许隐式的any类型 默认值为false
      "noImplicitAny": true / false,

      // 不允许不明确类型的this
      "noImplicitThis": true / false,

      // 
      "strictNullChecks" : true / false,


    }
  <!-- 
    下面的可选值都是小写:


    compilerOptions:
    编译器的选项, 它决定了编译器如何对ts文件进行编译, 它里面有很多的子选项


    target: 
    可选值:
    ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext


    module:
    js最开始没有模块化的概念, 但慢慢的有很多的模块化的概念
    可选值:
    CommonJS、UMD、AMD、System、ES2020、ESNext、None


    lib:
    在前端运行的话 是没必要改lib的
    库 比如我们操作的DOM DOM就是一个库 这个lib里指定上我们使用的库 然后ts就会按照有的库对我们的文件进行提示和检查
    我们可以写个错了 看提示 会看到默认值


    outFile:
    将多个ts文件, 编译成一个js文件
    设置outFile以后, 所有的全局作用域中的代码会合并到同一个文件中
    用了模块化的文件 模块化规范必须是 amd或者system 否则合并不了


    rootDir:
    指定代码的根目录
    默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过rootDir可以手动指定根目录


    allowJs:
    是否对js文件编译 默认是false
    有的时候我们需要使用模块 这个模块是js写的 但是js如果不编译过去的话 是不正常的 这个时候我们就把这个属性改为true


    checkJs:
    使用ts的规范检查js代码是否符合ts的语法规范 默认值是false;
    但是也不是绝对的 有的时候我们引入的模块就是不符合ts的语法, 这种情况下我们就需要把这个关上

    allowJs  checkJs 要么都用要么都不用


    removeComments:
    是否删除注释  默认值：false
    我们在编译ts文件的时候, ts里面的注释会原封不动的拿到js文件里面
    如果不希望编译过去 我们可以改为true


    noEmit:
    不对代码进行编译  默认值：false
    比如有的时候 我们使用ts的编译功能只想检查下语法 我们就可以使用这个功能


    noEmitError:
    当有错误的时候就不生成编译文件 默认值为false
    改成true的话, 有错误的话就不会对文件进行编译了


    alwaysStrict:
    总是以严格模式对代码进行编译, 严格模式的语法比普通语法要严格一些 性能也会好一些
    如果想在我们编译后的js中使用严格模式 就设置这个配置 默认值false
    当js文件中模块代码的时候 默认就在严格模式下了


    noImplicitAny
    禁止隐式的any类型, 默认值为false
    显示any类型是值 我们自己定义的
    function fn():any {}
    隐式any类型 是我们忘记给变量指定类型的时候就会是隐式的any
    如果我们期望ts能为我们检查 有隐式any 我们可以开启这个配置
    any是一个类型, 当我们整一个变量不指定类型的时候默认就是any, any一旦设置了后就会关闭ts对这个变量的类型的检查 不推荐使用any 但是并不是绝对不能用


    noImplicitThis
    禁止类型不明确的this
    function fn() {console.log(this)} 前面我们学过this是跟调用者有关系, 但是这种情况下 我们没办法知道将来谁调用这个函数 也就是说不明确this是谁
    如果我们希望ts能帮我们检查这个this 我们就可以开启这个配置
    我们可以指定this的类型 ts就不会报错了
    function fn(this:window) {}


    strictBindCallApply
    严格检查bind、call和apply的参数列表


    strictNullChecks
    严格的空值检查
    let btn = document.querySelector('.btn')
    btn.addEventListener('click', function() {
      alert(1)
    })
    上面是很简单的一段代码, 但是有的时候 btn 可能获取不到 也就是会是空值
    如果我们希望ts能帮我们检查 空值 那就开启这个配置
    在ts中我们就要这么写了
    if(btn !== 'null') {
      btn.addEventListener('click', function() {
        alert(1)
      })
    }
    还可以使用?运算符 有就执行 没有就不绑定
    btn?.addEventListener('click', function() {
      alert(1)
    })


    strict
    所有严格检查的总开关 一般开发建议开启这个


    strictFunctionTypes
    严格检查函数的类型
   

    strictPropertyInitialization
    严格检查属性是否初始化


    额外检查


    noFallthroughCasesInSwitch
    检查switch语句包含正确的break
    noImplicitReturns
    检查函数没有隐式的返回值
    noUnusedLocals
    检查未使用的局部变量
    noUnusedParameters
    检查未使用的参数


    高级


    allowUnreachableCode
    检查不可达代码
    可选值：
    - true，忽略不可达代码
    - false，不可达代码将引起错误


    noEmitOnError
    有错误的情况下不进行编译
    默认值：false
  -->

  }

------------------

### webpack 打包ts代码
- 一般情况下我们在开发一个项目都会结合打包工具去使用ts

> 1. 生成package.json
- npm init -y

> 2. npm i -D webpack webpack-cli typescript ts-loader
- ts-loader ts的加载器

> 3. 跟目录下创建 webpack.config.js 文件
<!-- 
  const path = require('path')

// webpack中的所有配置信息都应该写在module.exports中
module.exports = {

  // 指定入口文件 一般会创建src文件夹, 里面定义index.js作为入口文件
  entry:"./src/index.ts",

  // 指定打包文件所在的目录
  output: {

    // 指定打包文件的目录 直接写 './dist' 也可以 下面用path拼接了完整的路径
    path: path.resolve(__dirname, 'dist'),

    // 打包后文件的名字
    filename: "bundle.js",

    // 高版本的webpack放弃了对ie的支持, 所以打包文件的时候创建了使用箭头函数创建了作用域 如果还要支持老版本的ie那么就要告诉webpack我们要支持老版本的 会使用到下面的属性
    // 配置打包的环境 不使用箭头函数
    environment: {
      arrowFunction: false
    }

  },

  // ts是要编译的 编译成js 如何编译呢?
  // 指定webpack打包时要使用的模块(loader)
  module: {
    // 我们的项目里可能有很多的文件需要处理js css less等等

    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件(比如我们要使用ts-loader 但是这个ts-loader对谁生效啊) test的值是正则表达式 通过正则表达式匹配文件的名字
        test: /\.ts$/,

        // 匹配的文件怎么处理啊 跟上面的连起来就是我用ts-loader去处理ts结尾的文件
        use: "ts-loader",

        // 要排除的文件(不编译它) 一般要排除node_module文件夹 也是个正则
        exclude: /node_module/
      }
    ]
  },

  // 用来设置引用模块
  resolve: {
    // 凡是以ts结尾 和 以js结尾的文件都可以当做模块来互相引入
    extensions: ['.ts', '.js']
  }
}
 -->

> 4. 配置ts的编译规范
- 根目录下创建 tsconfig.json 文件
<!-- 
  // 一般这样就可以
  {
    "compilerOptions": {
      
      "target": "ES2015",
      "module": "ES2015",
      "strict": true
  }
 -->

> 5. 修改package.json文件中
- script属性里添加 'build': 'webpack'
- 通过 npm run build 指定webpack命令
<!-- 
  "script" : {
    "build" : "webpack"
  }
 -->


### webpack 配置扩展

> 自动创建html文件
- 现在是ts已经成功的转换为js文件了但是文件要运行最终还是需要有html文件, 我们也可以手动创建html文件, 但是有点麻烦 一是我要自己创建html文件, 二是当文件改变了比如以后要在html文件引入多个js文件 多个css文件的情况下还需要手动的一个个去改

- 我们希望html文件是自动被创建的 网页里面引入哪些资源都是根据项目的实际情况自己去做的调整
<!-- 
  比如有两个js就引入两个js 有10个就引入10个
 -->

- 要实现上面的操作就要下载一个webpack插件

> 1. npm i -D html-webpack-plugin
- 帮我们自动的生成html文件, 并且引入相关的资源

> 2. 在webpack.config.js中引入下载好的html-webpack-plugin
<!-- 
  const HTMLWebpackPlugin = require('html-webpack-plugin')
 -->

> 3. 在webpack.config.js中配置
- 在外层结构的最后面添加
<!-- 
  plugins: [

    // 对生成的html文件进行配置的情况下, 在括号中传入对象
    new HTMLWebpackPlugin({
      title: 'hello, Ts',

      // 根据模板创建html文件
      template: './src/index.html',

      // 不设置这个属性的话 默认值会是 defer script标签内会有defer
      scriptLoading: 'blocking',

      // true || ‘head’ || ‘body’ || false  引入资源的位置 在底部还是头部(true | body)
      inject: 'head'
    }),
  ]
 -->

- 配置完后 输入命令 npm run build 就会在dist文件夹下出现 index.html文件

-----

> 添加webpack服务器
- npm i -D webpack-dev-server
- 装上这个后 可以让项目直接在这个webpack的服务器上运行 这个服务器跟webpack之间是关联的它会根据整个项目的改变自动刷新

> 1. 在package.json中 script属性里 添加命令
<!-- 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",

    // 启动webpack服务器并用 谷歌浏览器打开
    "start": "webpack serve --open chrome.exe"
  },
 -->

> 2. 执行 npm start命令
- 启动服务器 我们再在ts文件里做任何的操作都会实时的反馈到页面上

-----

> 清空dist文件夹再编译
- 上面是每次在编译文件后 其实是新的文件 覆盖掉 旧的文件
- 这个插件的作用就是在每次编译前清空dist文件夹

> 1. 下载
- npm i -D clean-webpack-plugin

> 2. 在webpack.config.js中引入下载好的clean-webpack-plugin

> 3. 在webpack.config.js中配置
<!-- 
  plugins: [ 
    new CleanWebpackPlugin()
  ]
 -->

-----

> babel
- 将新语法转换为旧语法
- 将浏览器中不支持的让它们变的支持

> 1. 下载babel
- npm i -D @babel/core @babel/preset-env babel-loader core-js
<!-- 
  @babel/preset-env 是运行环境 我们写的代码需要兼容不同的浏览器, 在这里它给我们预置了不同的环境 你是什么环境就转换为什么样的代码

  babel-loader 带loader的都是将这个包 和webpack结合在一起的工具

  core-js 让老的浏览器运行新技术
 -->

> 在webpack.config.js中进行配置
- 编译过程ts文件会先去找ts loader转换为js js再去找babel转换为浏览器适合的代码
<!-- 
  // ts是要编译的 编译成js 如何编译呢?
  // 指定webpack打包时要使用的模块(loader)
  module: {
    // 我们的项目里可能有很多的文件需要处理js css less等等

    // 指定要加载的规则
    rules: [
      {
        // test指定规则生效的文件(比如我们要使用ts-loader 但是这个ts-loader对谁生效啊) test的值是正则表达式 通过正则表达式匹配文件的名字
        test: /\.ts$/,

        // 匹配的文件怎么处理啊 跟上面的连起来就是我用ts-loader去处理ts结尾的文件 对这个文件再添加别的加载器 注意是又向左执行
        use: [
          {
            // 指定加载器
            loader:"babel-loader",

            // 设置babel 设置兼容的浏览器
            options: {
              // 设置预定义的环境, 假设我们的代码在哪去运行
              presets:[
                [
                  // 指定环境的插件
                  "@babel/preset-env",

                  // 配置信息
                  {
                    // 我的代码要运行在哪个浏览器里啊 里面是浏览器的版本 要兼容的目标浏览器
                    targets: {
                      "chrome":"88",

                      // 如果写了ie肯定会是var 如果没有因为chrome版本高会是const
                      "ie":"11",

                    },
                    // 指定使用哪个版本的corejs
                    "corejs":"3",

                    // 使用corejs的方式 usage表示按需加载
                    "useBuiltIns":"usage"
                  }
                ]
              ]
            }
          }, 
          "ts-loader"
        ],

        // 要排除的文件(不编译它) 一般要排除node_module文件夹 也是个正则
        exclude: /node_module/
      }
    ]
  },
 -->



------------------

### Ts给变量指定类型
> 类型声明
- 类型声明是TS非常重要的一个特点
- 通过类型声明可以指定TS中变量（参数、形参）的类型
- 指定类型后，当为变量赋值时，TS编译器会自动检查值是否符合类型声明，符合则赋值，否则报错
- 简而言之，类型声明给变量设置了类型，使得变量只能存储某种类型的值

- ts文件可以被编译为任意版本的js文件


> 类型声明 方式一 :
- let 变量: 类型;
- let a: string;
- 一旦给变量指定了类型, 那么在以后的使用过程中这个变量只能是这个类型
<!-- 
  js中的变量可以是任何的类型, 但在一个项目中, 一不小心给这个变量重新赋值了其它的类型, 那么就相当于埋下了一个隐患, 为了排查错误的时候会非常的困难
 -->

> 示例
<!-- 
  // 声明一个变量b 同时指定它的类型是number
  let b: number;

  // b的类型设置为了number 在以后的使用过程中b的值只能是数字
  b = 'aaa';    // 此行代码会报错 b的类型是number 不能赋值字符串
 -->


> 类型声明 方式二 :
- let 变量: 类型 = 值
- let a: boolean = true;


> 类型声明 方式三 :   常用
- 如果变量的声明和赋值是同时进行的(变量的初始化), TS可以自动对变量指定该类型
- let a = 123;
<!-- 
  a以后的类型就是123 number类型
 -->

------------------

> 函数 -- > 添加类型
- js在函数中是不考虑参数的类型和个数的, 有可能就会造成在传递参数的时候a:string b:number 结果就会是拼串, 会导致以后一系列的问题

- 1. ts可以给形参定义类型
- 2. ts会限制实参的个数, 如果形参是2个, 实参也必须是两个
- 3. (形参):类型  -- > 给函数的返回值定义类型

  function sum(a:number, b:number): number {
    return a + b;
  }


- 上面我们了解了 给变量定义 number string boolean类型 还可以定义很多其他的类型


> ts中可以定义的类型

  类型          例子                描述
  number        1, 33             任意数字
  string        'hi', "hi",       任意字符串
  boolean       true、false       布尔值true或false
  字面量        其本身             限制变量的值就是该字面量的值
  any           *                 任意类型
  unknown       *                 类型安全的any
  void          空值（undefined） 没有值（或undefined）
  never         没有值            不能是任何值
  object        {name:'孙悟空'}   任意的JS对象
  array         [1,2,3]           任意JS数组
  tuple         [4,5]             元素，TS新增类型，固定长度数组
  enum          enum{A, B}        枚举，TS中新增类型

------------------

> 字面量 定义变量 类型
- let 变量:10
<!-- 
  变量的初始值是10 类型是number 固定了 已经指定了下面就不能修改了
  
  整的有点想常量似的赋值一次不能修改了 一般不用这中方式
 -->


> 联合类型
- 可以定义我们的变量的类型, 值可以是在某几个值之间

- let b: 'male' | 'female';
<!-- 
  一般可以这么用, 这样b的值只能是male 或者 female其中的一个
  b = 'male';     // ok
  b = 'female';   // ok
  b = 'hello'     // err
 -->

- let c: boolean | string;
- 我们可以通过这种方式来限制我们的变量在哪些值之间

------------------

> 变量类型: any
- 变量: any
- 这个变量的值可以是任意类型, 可以任意赋值, 一个变量设置类型为any后相当于对该变量关闭了TS的类型检测
<!-- 
  使用ts的时候, 不建议使用any类型, 那不跟js一样了


  let d:any;    变量d可以是任意类型
  d=10;
  d='hello'
  d=true
 -->

- 声明变量如果不指定类型, 则TS解析器会自动判断变量的类型为any (隐式的any)
<!-- 
  let d;    隐式any
  d = 10;
  d = 'hello'
 -->

> 注意:
- any类型的值 可以赋值给任意变量, 不仅霍霍自己还霍霍别人
<!-- 
  let s: string;    // s 是字符串类型
  let d;            // d 是any类型 没指定就是any

  s = d;            // 这时 我们将any类型的值 赋值给 s(string) 不会报错

  我们使用TS的时候就是为了检测变量的类型, 当使用了any类型后 会导致和使用js一样的隐患
 -->

------------------

> 变量类型: unknown
- 变量: unknown
- 表示未知类型的值
- 在ts中就是有些情况我们不知道该变量具体应该是什么类型的时候 我们可以使用unknown
- 当遇到类型不确定的时候 能用unknown就用unknown

<!-- 
  它跟any有些像 也是可以给变量赋值任意类型的值
  let e: unknown;
  e = 10;
  e = 'hello';
  e = true;

  let s: string;
  s = e;            // 报错

  unknown类型的值不能赋值给别的类型, 说白unknown只霍霍自己 自己愿意是啥类型就是啥类型, 但是不能赋值给别人
 -->

- unknown实际上就是一个类型安全的any unknown类型的变量, 不能直接赋值给其他的变量


> 那要是就是想把unknown的值赋值给其他的变量呢?
- 1. 赋值之前需要做类型检测
- 检测unknown自身的数据类型, 如果和目标变量类型一致的时候 才可以赋值
<!-- 
  let e: unknown;
  let s: string;

  e = '我是文本'

  if(typeof e === 'string') {
    s = e;
  }

  麻烦是麻烦 但是可以避免以后出各种的问题
  -->

- 2. 类型断言
- 语法:
- <类型>变量
- 变量 as 类型

- 告诉编辑器 变量的实际类型, e的类型就是字符串别给我报错了
<!-- 
  let e: unknown;
  let s: string;

  // 两种写法
  s = e as string;    告诉编辑器e就是string
  s = <string>e;      告诉编辑器e就是string
 -->

------------------

> 变量类型: void
- 用来表示空值, 以函数为例 就表示没有返回值 
<!-- 某种程度来说undefined也是返回值 -->

> 变量类型: never
- 和void有点像, 表示没有值 以函数为例 表示永远不会返回结果 连空(undefined null)也没有

<!-- 
  前面我们可以直接给函数的返回值设置类型
  function fn(): number {
    return 123;
  }


  // void
  但函数没有返回值的时候 比如函数内部的结果是 console alter等
  这时候我们可以给函数的返回值设置类型
  function fn(): void {
    // 报错 只要有返回值就会报错, 因为我们设置了void表示我们的函数根本就不能有返回值
    return 123;   

    // 可以返回 undefined null等 不会报错
  }


  // never
  function fn(): never {
    在js中有一种函数 不会返回结果 连undefined也不会返回 用来报错的
    当程序出错的时候 我们利用这种函数来报错

    throw new Error('报错了')

    就类型这种函数只要一调用就会报错 一旦报错了, 程序就不往下执行了, 就不会有返回值了

    这种函数就没有返回值, 这种函数就可以设置为never
  }
 -->

------------------

> 变量类型: object
- obj表示一个js对象
- let a: object;
<!-- 
  以这种形式给上面给变量指定类型不太实用 因为js里面一切皆对象, 定义一个变量的类型为object则相当于对这个对象没有任何的限制 在开发的时候不太用 
-->


- 一般我们使用{ } 给一个变量指定类型, 类面指定必须包含有哪些的属性
- 语法:
- let b = { name : string | 里面可以指定多个属性名和属性值 }
- 指定变量b的类型是对象, 同时里面必须有name属性, 且类型为string
<!-- 
  let b: {name : string};

  b = {}              // 报错 因为里面没有name属性
  b = { name: 'sam'}  // OK

  要求 我们指定的对象 和 结构 必须一某一样, 比如 我们上面定义了name
  b = {name: 'sam', age:19}   // 报错

  多了不行 少了不行
 -->


>> 属性名?   定义可选属性 
- 有一些时候, 我们定义多个属性名, 可能用不到 我们我们可以通过 ? 让这个属性名可选
let b: { name:string, age?: number }
<!-- 
  b = {name: 'sam'}    // 也不会报错
 -->


>> [属性名(自定义): string] : any   定义任意属性
- 有的时候 我们除了必须要填写的属性名外, 后面的属性可以任意的时候 我们就可以采用这种方式
- let c: {name: string, [propName: string]: any}
- [propName: string]  表示任意属性名
- : any               表示任意类型
<!-- 
  let c: {name: string, [propName: string]: any}

  要求 我的对象里必须有一个name属性, 其它的属性我不管
 -->


> 定义函数的类型, 具体有什么参数, 返回值的类型是什么样的
- let d: (a: number, b: number) => number;
- 定义d的类型是一个函数, 形参有两个a b且类型都是number 返回值也是number
- 使用箭头函数的形式 定义函数的结构
<!-- 
  // 定义
  let d: (a: number, b: number) => number;
  d = function(n1: number, n2:number): number {
    return n1 + n2
  }
 -->

------------------

> 变量类型: array
- 在js中数组里面的值是没有类型的概念的, 数组中想存什么样的值都可以, 但是在开发中我们的数组一般都存放相同的值
- 我们要声明数组的时候, 都是声明我们要什么样的数组

> 方式一:  类型[]
- let a: string[]
- 希望我们的a是一个数组, 数组里面存放的都是字符串
<!-- 
  a = ['a', 'b'];
 -->
- let b: number[];
- b是一个装数字的数组


> 方式二: Aarray<类型>
- let c = Array<number>
- 跟上面的意思一样
<!-- 
  再举一个不推荐的用法
  let c = Array<any>
 -->

------------------

> 变量类型: tuple
- 元组, 就是固定长度的数组
- 当我们数组里面的值是固定的时候, 使用元组比较好一些

- let h = [string, string]
- 表示h是一个数组, 数组里面有两个值 且 类型都是string
<!-- 
  let h = [string, string]
  h = ['abc', 'cbv']          // ok
  h = ['abc', 'cbv', 123]     // err
  h = ['abc']                 // err
 -->

------------------

> 变量类型: enum
- 枚举 把所有可能的情况全部的列出来
<!-- 
  人有性别比如男 女 
  let i: {name: string, gender: string}
  i = {
    name: 'sam',
    gender: '男'
  }

  我们在开发的时候一般不会这么这样存
  存gender的目的就是为了判断 gender是男 还是女

  所以 我们判断gender是男是女可以这样 i.gender === '男'

  但是 我们对象里的gender 不管是存 '男'也好 还是存 'male'也好 都是字符串
  字符串存储在数据库中占地儿比较大, 所以我们期望我们存的数据尽可能的小

  类似 gender 这种东西, 要么是 男 要么是女 最多来个保密, 3个值也就够了
  所以像这种值在一定的范围之内的

  比如 我们把gender的类型改成number
  let i: {name:string, gender:number}
  i = {
    name: 'sam',
    gender: 1
  }

  这样接下来我再判断的时候就可以这样 i.gender === 1
  比如我们还可以给gender设置范围
  let i: {name:string, gender: 0|1}

  但是上面写还是有问题, 我们是想以后拿去给别人做判断的, 我们设置的女生是0男生是1但是这个值, 不是我们自己用吧有可能别人用 但是别人不知道0 1代表男还是女

  所以这时候我们就可以用到枚举了
 -->

>> 枚举的使用

- 定义一个枚举类
  enum Gender {
    Male = 0,
    Female = 1
  }

- 在定义变量类型的时候 类型为 枚举类
  let i: { name: string, gender: Gender}

- 设置性别
  i = {
    name: 'sam',
    gender: Gender.Male
  }

- 判断的时候
- i.gender === Gender.Male
<!-- 
  enum Gender {
    Male,
    Female
  }

  let a: {name: string, gender: Gender}
  a = {
    name: 'sam',
    gender: Gender.Male
  }

  console.log(a.gender === Gender.Male);
 -->


> |   &
- 上面简单的说了下 | 的用法
- let c: boolean | string; 变量c的类型可以是布尔 或者是字符串

- 还有 & 的用法
- let a: { name: string } & { age: number }
- 表示变量a 两者之间进行 & 也就是说 变量a既要满足 { name: string } 也要满足 { age: number } 再直接点说 变量a中要有两个值
<!-- 
  a = {
    name: 'sam',
    age: 18
  }
 -->


> 类型的别名
- 有一种情况 我们定义了一个类型, 这个类型比较繁琐, 然后还需要在别的地方用
- 我们就可以给这个类型起个别名( 有点像 less中的变量 啊)

- 语法:
- type 自定义名 = 类型
<!-- 
  type myType = 1|2|3|4|5;
  let k: myType;
 -->

------------------

### 面向对象
- 任何操作都是通过对象去操作, 在写程序的过程当中所有的操作都是通过对象进行的

- 面向对象是程序中一个非常重要的思想，它被很多同学理解成了一个比较难，比较深奥的问题，其实不然。面向对象很简单，简而言之就是程序之中所有的操作都需要通过对象来完成。

- 举例来说：
  - 操作浏览器要使用window对象
  - 操作网页要使用document对象
  - 操作控制台要使用console对象

- 一切操作都要通过对象，也就是所谓的面向对象，那么对象到底是什么呢？这就要先说到程序是什么，计算机程序的本质就是对现实事物的抽象，抽象的反义词是具体，比如：照片是对一个具体的人的抽象，汽车模型是对具体汽车的抽象等等。程序也是对事物的抽象，在程序中我们可以表示一个人、一条狗、一把枪、一颗子弹等等所有的事物。一个事物到了程序中就变成了一个对象。

- 在程序中所有的对象都被分成了两个部分数据和功能，以人为例，人的姓名、性别、年龄、身高、体重等属于数据，人可以说话、走路、吃饭、睡觉这些属于人的功能。数据在对象中被成为属性，而功能就被称为方法。所以简而言之，在程序中一切皆是对象。

- 一个具体的事物到程序里 就会以对象的形式存在


> 类 (class)
- 要想面向对象，操作对象，首先便要拥有对象，那么下一个问题就是如何创建对象。要创建对象，必须要先定义类，所谓的类可以理解为对象的模型，程序中可以根据类创建指定类型的对象，举例来说：可以通过Person类来创建人的对象，通过Dog类创建狗的对象，通过Car类来创建汽车的对象，不同的类可以用来创建不同的对象。

  class 类名 {

    对象(类)中主要包含两个部分:

    实例属性
      - 直接在类里面定义的属性就是实例属性

    静态属性
      - 在属性前使用static关键字可以定义类属性(静态属性)

    实例方法
      - 直接在类里面定义的方法就是实例方法

    静态方法
      - 如果方法以static开头则方法就是类方法 可以直接通过类去调用


    关键字
      - static
        - 如果使用static关键字 则需要

      - readonly  
        - 加上readonly关键字, 实例对象只能访问 

      - static readonly
        - 关键字还可以连用 只读的静态属性 static 放在前面

  }

<!-- 
  class Person {
    /*
      对象(类)中主要包含两个部分
      属性:
        实例属性
          - 直接在类里面定义的属性就是实例属性

        类属性  
          - 在属性前使用static关键字可以定义类属性(静态属性)

      方法:
    */

    // 定义实例属性, 必须创建实例对象 通过实例对象来访问
    // 这么写 实例对象可以对这个属性 可读可写
    name:string = '孙悟空';

    // 加上readonly关键字, 实例对象只能访问 
    readonly age:number = 18;

    // 关键字还可以连用 只读的静态属性 static 放在前面
    // static readonly aaa: string = '试试';

    // 定义类属性(静态属性)
    static gender: string = 'male';

    // 定义实例方法
    sayHello() {
      console.log('hello, 大家好')
    }

    // 定义类方法 如果方法以static开头则方法就是类方法 可以直接通过类去调用
    static sayHi() {
      console.log('hello, Hi')
    }
  }

  console.log(Person.gender);   // male


  // 实例属性前面如果没有加关键字 readonly 那么就是可读可写, 如果加了readonly就是可读不能写
  const per = new Person();
  console.log(per.name)         // 孙悟空
  per.name = '猪八戒'
  console.log(per.name)         // 猪八戒
 -->


> constructor构造函数 和 this
- 我们的类一般不会只创建一个对象, 所以通常情况下我们的类都是会创建多个对象
- 但是有个问题 上面我们简单的了解类的时候 我们是这么定义类的
<!-- 
  class Person {
    name: string = 'sam';
    age: number = 30;
  }
 -->

- 这样会有一个问题, 当我们创建实例的时候 实例里面的属性都是 sam 30
<!-- 
  const per1 = new Person();    // 内部的属性都是一样的
  const per2 = new Person();    // 内部的属性都是一样的
 -->

- 我们并不希望这样, 我们希望在创建实例的时候, 我们可以自己传入想要的实例
- 这时候我们就需要将实例属性写在 constructor里面, 构造函数会在对象创建的时候调用
<!-- 
  class Person {
    constructor(name:string, age:number) {
      写在这里面的属性, 会在new的时候被自动调用

      这里的this
      在实例方法中, this就表示当前的实例
      在构造函数中当前对象就是当前新建的那个对象

      下面sam就是new出来的 this就是sam这个实例
      如果我在创建erin实例对象, 那么this就是erin这个实例

      我们可以通过this向新建的对象中添加属性
      this.name = name;
      this.age = age
    }
  }

  当我们new的时候 实际上就相当于调用了 constructor
  const sam = new Person()
 -->

> 演练代码
<!-- 
  class Dog {

    // 这里要定义下name age 相当于let const下
    name: string;
    age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    bark() {
      // 在方法中可以通过this表示当前调用方法的对象
      console.log(this)
    }
  }

  const dog = new Dog('小黑', 4);
  const dog2 = new Dog('小白', 4);

  console.log(dog, dog2);
 -->



> 继承 extends
- 当我们定义多个类的时候, 会有一些方法或者属性是相同的, 那每定义一个类都要写遍这些方法和属性, 会比较繁琐, 所以我们可以把相同的代码抽取到一个类中, 称之为父类(超类)

- 让其它新的类继承于父类就可以了 通过继承可以将多个类中共有的代码写在一个父类中, 这样只需要写一次即可让所有的子类都同时拥有父类中的属性和方法
<!-- 
  相当于将Animal中的代码 ctrl+A C 粘贴到Cat里
 -->

>>> 这节我们先谈谈子类的方法:
- 扩展子类独有的方法
- 扩展独有的方法, 如果希望在子类中添加父类中没有的属性或方法直接添加即可

- 覆盖掉父类中的同名方法, 如果在子类中添加了和父类相同的方法, 则子类方法会覆盖掉父类的方法
- 我们称之为方法的重写
**注意当我们在子类中写了跟父类一样的属性名 和 方法名 都会发生重写现象 包括 constructor**

<!-- 
  // 父类
  class Animal {
    name: string;
    age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    sayHello() {
      console.log('动物在叫');
    }
  }


  // 子类
  class Cat extends Animal {
    /* 
      Cat extends Animal
      此时Animal被称为父类, Cat被称为子类 使用继承后 子类会拥有父类的所有方法和属性
    */

      // 扩展独有的方法, 如果希望在子类中添加父类中没有的属性或方法直接添加即可
      run() {
        console.log(`${this.name}在跑~`);
      }

      // 覆盖掉父类中的同名方法, 如果在子类中添加了和父类相同的方法, 则子类方法会覆盖掉父类的方法
      // 这中形式 我们称之为方法的重写
      sayHello() {
        console.log('喵喵喵')
      }
  }
 -->


>>> 这节我们谈谈子类的属性
- 上面讲了 子类如何拥有自己的方法(重写 和 直接新增)
- 这节 我们说说 子类如何拥有自己的属性

> super 关键字
- 我们可以通过super关键字 来调用父类中的方法
<!-- 
  super.sayHello();

  sayHello() {
    super.sayHello();
  }
  在类的方法中 super 就表示当前类的父类 这样写相当于 我们在通过Dog的实例对象调用sayHello的时候相当于内部在调用父类(super)中的sayHello
 -->

- 我们也可以通过 super() 调用父类的constructor
- 我们在子类中要定义自己的独有属性还是要通过constructor构造函数, 但是如果我们直接在之类中写了constructor, 因为父类中也有constructor 就会发生重写的现象
<!-- 
  constructor() {

    如果直接写 constructor 构造函数 会报错, 相当于重写了父类中的constructor(名字相同的函数会发生重写), 
    
    也就是说父类中的constructor就不会执行了 父类中的constructor中的属性就没有了 会报错
  }
 -->

- 所以在子类中调用 constructor 的时候 必须在子类的constructor内部调用 super() 
- 注意父类中的参数 也要写进子类的constructor的形参中, 同时super(实参)也要传入实参
<!-- 
  class Dog extends Animal {

    // 添加子类独有的属性
    age: number;

    constructor(name:string, age:number) {
      // 如果在子类中写了构造函数, 在子类构造函数中必须对父类的构造函数进行调用
      
      // super()调用父类的构造函数 父类中的形参也要在子类的constructor里写上, super(实参)也要写上父类实参

      super(name);      // 调用父类的构造函数 不写不行 语法错误
      this.age = age;
    }
  }
 -->


> 抽象类 abstract
- 我们会把相同部分的属性和方法 抽取出来做成一个基类 父类 超类
- 这个类是专门用来继承的, 我们不希望通过这个基类去创建对象 这时候我们可以使用 abstract 关键字
<!-- 禁止一个类创建对象 -->

- 抽象类是专门用来被其他类所继承的类，它只能被其他类所继承不能用来创建实例
- 抽象类中可以添加抽象方法
- 抽象方法使用 abstract 开头 没有方法体
- 抽象方法只能定义在抽象类中, 子类必须对抽象方法进行重写
<!-- 
  我们在父类中定义的方法是固定的 子类继承的时候都会有这个同一个方法, 需要重写因为不能满足每一个类的需求

  抽象方法只是定义这个方法的结构 不定义这个方法的具体实现, 具体的实现由子类来决定
 -->


<!-- 

  // 使用abstract定义抽象类
  abstract class Animal {

    name: string;
    constructor(name:string) {
      this.name = name;
    }

    // 定义个抽象方法, 子类必须对这个抽象方法重写, 并且抽象方法只能在抽象类中
    abstract sayHello():void;   没有返回值的类型
  }
 -->

------------------

### 接口
<!-- 
  在说接口之前我们想回顾一个 假如我们描述对象的类型应该怎么写?
  下面的对象的类型就是用来描述 一个对象中可以包含哪些属性
  type myType = {
    name: string,
    age: number,
    [propname:string]:any   // 任意属性 建议不写
  }

  上面定义完对象的类型后 我们就可以创建对象了
  const obj = {
    name:'sam',
    age: 18
  }

  上面myType的作用就是对 对象的类型做了一个限制
 -->

- 接口是用来定义一个类的结构, 用来定义一个类中应该包含哪些属性和方法, 同时接口也可以当做类型声明去使用(接口和上面的type声明非常的类似)
- 所以接口完全可以当做type类型去使用
<!-- 
  接口的作用类似于抽象类，不同点在于接口中的所有方法和属性都是没有实值的，换句话说接口中的所有方法都是抽象方法。
  
  接口主要负责定义一个类的结构，接口可以去限制一个对象的接口，对象只有包含接口中定义的所有属性和方法时才能匹配接口。
  
  同时，可以让一个类去实现接口，实现接口时类中要保护接口中的所有属性。
-->


> type 和 interface 的区别
- 上面说了接口也可以当做类型声明去使用, 但是两者还是有区别的
- type 只能声明一次, 再次声明会报错
- interface 同名的接口可以声明多次, 接口中的规则按同名内容相加处理

<!-- 
  interface myInterface {
    name: string
  }

  interface myInterface {
    age: number
  }

  myInterface的接口最终会有两条规则 name 和 age
 -->


> interface 定义一个接口
- 定义类是以class开头, 定义一个接口是以interface开头
- 语法:
- interface 接口名 { ... }
<!-- 
  interface myInterface {
    name: string,
    age: number
  }

  这个接口的意思是 定义一个类, 规定了这个类的结构, 这个结构里面有两个属性

  const obj: myInterface = {
    name: 'sam',
    age: 18
  }
  创建obj并使用myInterface的接口类型, obj中属性名必须和接口中定义的一样不能多也不能少
 -->  

> 类中的接口
- interface可以在定义类的时候限制我们类的结构(这一点接口有点像抽象类)
- 接口就是规定类的结构
- 接口中的所有属性不能有实际的值
- 接口只定义对象的结构, 而不考虑实际值
  - 在接口中所有的方法都是抽象方法
<!-- 
  interface myInterface {
    name: string,     // 定义一个name没有赋值
    
    sayHello():void;  // 定义一个方法没有方法体
  }
 -->


> 接口的实现 implements
- 继承一个类 我们使用 extends
- 实现一个接口 我们使用 implements

- 实现接口就是使类满足接口的要求
<!-- 
  interface myInterface {
    name: string;

    sayHello():void;
  }


  // 用 Cat 这个类 去实现 myInterface 这个接口
  class Cat implements myInterface {
    为了满足 myInterface 接口的要求 我们的类中也必须有 name 和 sayHello

    // 1. 定义name属性
    name: string;

    // 2. 将name初始化
    constructor(name:string) {
      this.name = name;
    }

    // 3. 实现接口的方法
    sayHello() {
      console.log('大家好')
    }
  }
 -->


> 接口的作用
- 两个水管拧到一起, 中间就得有个接口, 我们的usb电脑上得有个typec的接口我们才能使用usb存读电脑中的数据吧, 接口其实就是定义了一个规范, 只要实现了接口就意味着满足了这个规范, 满足了规范就可以在我们指定的场景中使用

- 其实接口就是对我们类的一个限制
<!-- 
  比如:
  我们做了一个游戏 射击游戏, 里面有各种的枪械 对我们游戏玩家来说只要是枪我们就能开

  那怎么才算是枪? 要满足特定的需求吧 有枪口 扳机 能装子弹 它满足这个需求我们就能使用吧

  接口也是一样的 实现了接口就相当于满足了要求 满足了要求就能在特定的场景中使用
 -->


> 接口 和 抽象类
- 两者非常的相似, 也有一些区别
- 抽象类既可以有抽象方法, 也可有普通方法, 但是接口中都是抽象方法, 也就是说接口中定义方法属性就是让你实现的 并不会指定实际的值

- 再就是抽象类我们使用的关键字是 extends 实现接口的时候我们使用的 implements

- 接口最主要的特点还是定义了一个标准 限制了我们的类型去符合标准

------------------

### 属性的封装
- 之前我们创建的类的方式实际上是存在了一些的问题, 一些安全性的问题
<!-- 

  我们class类中的属性, 可以随时任意的在实例对象中被修改
  
  class Person {
    name: string;
    age: number;
    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }
  }

  const per = new Person('sam', 19);

  // 实例对象可以任意的修改类中的属性
  per.name = 'erin'
  per.age = -30
 -->

- 上面所说的不安全的地方在哪? 人的年龄是不可能出现负数的吧, 一旦我们的程序中以后需要用到年龄去计算, 那么一定会出错, 之所以属性被修改了就是因为 属性能在外面被访问到, 那怎么去避免这个现象


> TS中 类中属性的修饰符
> 1. public
- public 修饰的属性可以在任意位置修改(访问) 只要是public就可以随便改
- 任意位置 父类 子类 外部
<!-- 
  属性不设置修饰符的情况下 默认就是public
  class Person {

    // 给属性设置 public 修饰符
    public name: string;
    public age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }
  }
 -->


> 2. private
- private 私有属性, 私有属性只能在类的内部进行修改(访问)
<!-- 
  比如我们可以在constructor中访问和修改, 但是出了这个类就不行了 比如per.name就会报错 
-->
- 通过在类中添加方法使得私有属性可以被外部访问 我们可以通过暴露方法 让外部间接的访问这个属性

<!-- 
  给属性添加了 private 修饰符后 属性变得只能在类内部使用 类的外部访问不到, 但是还是有需要让外部可以访问到情况 我们可以通过方法让 private 属性暴露出去
  class Person {
    private name: string;
    private age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    // 定义方法 用来让外部获取name属性
    getName() {
      return this.name
    }

    // 定义方法 用来让外部设置name属性
    setName(value:string) {

      // 我们可以通过在方法中定义判断 来判断外部修改的值是否合法
      if(value < 0) {
        alert(输入参数格式错误)
      }
      return this.name = value
    }
  }


  // 创建实例
  const per = new Person('sam', 19);
    
  类外部通过调用方法 间接的访问类内部的属性 这种拿到不是通过 name属性, 而是通过方法得到的

  // 读取
  console.log(per.getName())

  // 设置
  per.setName('猪八戒');
  console.log(per.getName())

  上述还是可以修改到类中的属性, 不也不安全么?
  当我们把一个属性私有化后 private 就不能在外部访问了 如果想在外部访问 我们就得提供方法

  现在外部的修改都是通过内部提供的方法去修改对象中的属性, 这样的好处就是控制权在写类的人, 不想让对方设置类中的私有属性就不提供对应的修改方法

  数据安全性的问题也好解决, 既然是我自己提供的方法, 那么我就可以在set方法写上判断, 判断输入的值是否合法
 -->


> 3. protected
- protected 受保护的属性, 只能在当前类和当前类的子类中访问(修改)


> TS中的getter setter方法
- 在 private 修饰符后 类中的变量外部无法访问, 我们是通过自己定义的方法将属性暴露出去了, 其实TS中也给我们提供getter 和 setter方法

- ()前的name相当于属性名 类外部可以直接点属性名 per.name 能获取到类中name的值
- per.name 当我们的属性被设置为私有的情况下, .name并不是去找属性名, 而是去调用get方法

<!-- 
  class Person {
    private name: string;
    private age: number;

    constructor(name:string, age:number) {
      this.name = name;
      this.age = age;
    }

    get name() {
      return this.name
    }

    set name(value:string) {
      this.name = value;
    }
  }

  // 创建实例
  const per = new Person('sam', 19);

  // 读取内部属性
  per.name
    - 当类中属性私有化都 我们.name 跟属性使用的方式一样 但是内部还是在调用get方法

  // 设置内部属性
  per.name = '猪八戒'
    - 使用方式还是跟以前一样 但是内容调用的是set方法
 -->


> class 类中 定义属性 和 属性初始化的语法糖
- 直接我们创建类定义属性的时候都是这么干的
<!-- 
  class C {
    name: string;
    age: number;

    constructor(name:string, age:number) {

    } 
  }
 -->

- 上面的有点麻烦 我们可以这样 定义属性, 初始化的语法糖
- 直接将属性定义在构造函数中 要使用修饰符 而且还不用写this了 下面的写法等价于上面的
<!-- 
  class C {
    constructor(public name:string, public age: number) {
      // 这里不用写this.name=name this.age=age了
    }
  }
 -->

------------------

### 泛型
<!-- 
  比如我们创建一个函数 我们不知道参数的类型是什么 可能是任意类型, 那返回值也就不确定了
  function fn(a:any): any {
    return a
  }

  可是使用any的时候会关闭掉ts的类型检查 那ts就没有意义了
  另外 从这个函数的定义上来看 并不能直观的看出返回值的类型和a是一样的

  所以凡是跟上面类型不明确的时候, 我们就可以使用泛型
 -->

- 在定义函数或者类时, 如果遇到类型不明确的就可以使用泛型
- 泛型就是一个不确定的类型 不知道具体的类型是什么
<!-- 
  因为我们要根据实际的调用情况来看 比如我调用的时候传递的是string 那么a的类型就是string 我传的是number  a就是number
 -->


> 定义泛型
- 指定一个泛型T(名字任意) 有点像变量

    function fn<T>(a:T):T {
      return a
    }

- T是什么类型不知道, 只有在调用的时候才可以确定 好处是我们不用any 不用any就代表我们不用跳过类型检查了
- 这样我们从函数定义上看就能知道第一个参数和函数的返回值是相同的
<!-- 不用指出具体类型, 也能看出返回值和参数的类型相同 -->


> 泛型的调用
- 1. 直接调用具有泛型的函数
- 不指定泛型 TS可以自动对类型进行推断
<!-- 
  // 这样就知道T的类型是number 相当于在传参的时候把number赋值给了T
  fn(10)
    - 也就是说明我们这次调用的时候, 参数 和 返回值都是number
 -->

- 2. 指定泛型T的类型
- 手动的指定T的类型是string
<!--  
  fn<string>('sam')
 -->

- 上面的好处就是我们拿到的变量的类型是明确的 结构会变得更加清晰


> 泛型可以指定多个

  function fn<T, K>(a:T, b:K):T {
    return a;
  }

  fn<number, string>(123, 'sam')    // 手动指定两个形参的类型
  fn(123, 'sam')                    // 自动推断两个形参的类型


> <T extends Inter> 这种写法是 泛型T必须是 Inter 的实现类或者是子类
- 上面的写法 泛型的范围还是太大了 我们定义了T 和 K 相当于我们的泛型是任意类型 如果我想限制一下泛型的范围

  interface Inter {
    length:number;
  }

  // 这里我希望泛型的范围是Inter的子类(或者说是实现Inter接口这个类)
  function fn<T extends Inter>(a: T): number {
    return a.length
  }
  <!-- 
    T是一个泛型 并且必须实现 Inter 这个接口 这里所有的都用extends
   -->

  // 这时候我们调用fn并传递参数的时候 必须要实现Inter接口 也就是参数必须要有length这个属性
  fn('123')       // 可以 字符串有length属性
  fn(123)         // 不可以


> 除了在函数中使用泛型 在类中也可以有泛型

  class MyClass<T> {
    name: T;
    constructor(name:T) {
      this.name = name;
    }
  }

  const mc = new MyClass<string>('sam');

> 总结:
- 泛型就是在类型不明确的时候 整一个变量 用这个变量表示类型
- 泛型和接口属于锦上添花的东西