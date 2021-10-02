### 项目概述
> 1. 电商后台管理系统的功能
- 用户登录

- 退出登录

- 用户管理

- 权限管理
  - 角色列表
  - 权限列表

- 商品管理
  - 商品列表
  - 分类管理
  - 参数管理

- 订单管理

- 数据统计


> 2. 电商后台管理系统的开发模式
- 电商后台管理系统整体采用前后端分离的开发模式，其中前端项目是基于vue技术栈的spa项目
<!-- 
  后端主要操作数据库 并向前端暴露一些api接口
  前端负责页面 然后利用ajax调用接口

  后端负责写接口 前端负责调接口的模式 就是前后端分离的模式
 -->


> 3. 前端项目的技术栈
- vue
- vue-router
- element-ui
- axios
- echarts


> 4. 后端技术栈
- nodejs
- express
- jwt         状态保持的工具 有了它可以模拟session登录记录功能
- mysql
- sequelize   这个是操作数据库的框架

-----------------

### 测试接口
- 我们可以根据接口文档查看该接口需要什么样的参数 和 地址是多少 在postman中进行测试
- 注意点：
- 1. 什么方式的请求
- 2. 请求参数是什么
<!-- 
  参数可能就几个 但是返回的数据确实一堆
  比如：
  login接口：
  需要参数：1. username   2. password   admin 123456
  {
    "data": {
      "id": 500,
      "rid": 0,
      "username": "admin",
      "mobile": "12345678",
      "email": "adsfad@qq.com",
      "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MzI2NDI3MDgsImV4cCI6MTYzMjcyOTEwOH0.nUh3oWuBgISWO1h2paCpOduUpEI7bkrVfniRlrypWBU"
    },
    "meta": {
      "msg": "登录成功",
      "status": 200
    }
  }
 -->

-----------------

### 登录概述
> 1. 登录业务流程
  - 1. 在登录页面输入用户名 和 密码
  - 2. 调用后台接口进行验证 发送登录请求
  - 3. 后台根据提交过去的用户名和密码 进行验证 验证的结果是失败 或者 成功
  <!-- 
    如果登录失败 需要在前端提示用户登录失败
    如果登录成功 需要根据响应的状态跳转到项目的主页
   -->


> 2. 登录业务的相关技术点
- 1. http是无状态的
  所以登录成功后需要记住用户的登录状态
  1. 通过 cookie 在客户端记录状态
  2. 通过 session 在服务器端记录状态
  3. 通过 token 方式维持状态
  <!-- 
    什么时候用 cookie 和 session 和 token
    我们现在vue项目运行在一个端口号 而我们的服务器在另一个端口号 它们之间就会存在一个跨域的问题

    如果前端和后台之间不存在跨域的问题 推荐使用cookie 和 session
    如果前端和后台之间存在跨域问题 推荐使用token的方式

    为什么？
    cookie session 
   -->


> 3. 登录 - token 原理分析
- 场景：
- 客户端和服务器之间存在着跨域的情况，客户端要发送ajax请求到服务器 请求数据

- 流程：
- 1. 客户端用户登录 输入用户名和密码 发送登录请求
- 2. 服务器接收到客户端的参数开始验证登录 如果成功 服务器会生成当前用户所对应的 token 并且服务器会将token通过网络请求返回给客户端
  - token 是由服务器生成的 每个用户对应的token都是不一样的

- 3. 客户端拿到token之后需要存储token值 因为这个token 相当于记录了客户端登录的状态
- 4. 客户端后续的所有请求都需要携带该token 发送请求
<!-- 
  客户端在发送下一次请求的时候 携带了这个token 服务器就会根据提交过来的token 去验证你是哪个用户 从而根据你的操作返回不同的结果

  token就是客户端与服务器之间的用户的身份验证校验的
 -->

- 5. 服务器验证token是否通过 如果存在代表你已经登录 然后给你返回不同的数据


> 扩展知识点：
- 关于身份验证流程
> 1. session 认证流程：
<!-- 
  - 1. 用户第一次请求服务器的时候，服务器根据用户提交的相关信息，创建对应的 Session

  - 2. 请求返回时将此 Session 的唯一标识 SessionID 返回给浏览器

  - 3. 浏览器接收到服务器返回的 SessionID 后，会将此信息存入到 Cookie 中，同时 Cookie 记录此 SessionID 属于哪个域名

  - 4. 当用户第二次访问服务器的时候，请求会自动把此域名下的 Cookie 信息也发送给服务端，服务端会从 Cookie 中获取 SessionID，再根据 SessionID 查找对应的 Session 信息，如果没有找到说明用户没有登录或者登录失效，如果找到 Session 证明用户已经登录可执行后面操作。
 -->


> 2. Acesss Token
- 简单 token 的组成：
  - uid(用户唯一的身份标识)、time(当前时间的时间戳)、sign（签名，token 的前几位以哈希算法压缩成的一定长度的十六进制字符串）

- 服务器对 Token 的存储方式：
- 1. 存到数据库中，每次客户端请求的时候取出来验证（服务端有状态）
- 2. 存到 redis 中，设置过期时间，每次客户端请求的时候取出来验证（服务端有状态）
- 3. 不存，每次客户端请求的时候根据之前的生成方法再生成一次来验证（JWT，服务端无状态）


- 特点：
- 服务端无状态化、可扩展性好
- 支持移动端设备
- 安全
- 支持跨程序调用


- token 的身份验证流程：
<!-- 
  - 1. 客户端使用用户名跟密码请求登录
  - 2. 服务端收到请求，去验证用户名与密码
  - 3. 验证成功后，服务端会签发一个 token 并把这个 token 发送给客户端
  - 4. 客户端收到 token 以后，会把它存储起来，比如放在 cookie 里或者 localStorage 里

  - 5. 客户端每次向服务端请求资源的时候需要带着服务端签发的 token
  - 6. 服务端收到请求，然后去验证客户端请求里面带着的 token ，如果验证成功，就向客户端返回请求的数据
 -->


**注意：**
- 每一次请求都需要携带 token，需要把 token 放到 HTTP 的 Header 里
- token 完全由应用管理，所以它可以避开同源策略

- 登录时 token 不宜保存在 localStorage，被 XSS 攻击时容易泄露。
- 所以比较好的方式是把 token 写在 cookie 里。
- 为了保证 xss 攻击时 cookie 不被获取，还要设置 cookie 的 http-only。
- 这样，我们就能确保 js 读取不到 cookie 的信息了。再加上 https，能让我们的请求更安全一些。


> 3. Token 和 Session 的区别
- Session 是一种记录服务器和客户端会话状态的机制，使服务端有状态化，可以记录会话信息。

- 而 Token 是令牌，访问资源接口（API）时所需要的资源凭证。Token 使服务端无状态化，不会存储会话信息。

- Session 和 Token 并不矛盾，作为身份认证 Token 安全性比 Session 好，因为每一个请求都有签名还能防止监听以及重复攻击，而 Session 就必须依赖链路层来保障通讯安全了。如果你需要实现有状态的会话，仍然可以增加 Session 来在服务器端保存一些状态。


> 什么是 JWT
- JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。是一种认证授权机制。
- JWT 是为了在网络应用环境间传递声明而执行的一种基于 JSON 的开放标准。JWT 的声明一般被用来在身份提供者和服务提供者间传递被认证的用户身份信息，以便于从资源服务器获取资源。比如用在用户登录上。可以使用 HMAC 算法或者是 RSA 的公/私秘钥对 JWT 进行签名。因为数字签名的存在，这些传递的信息是可信的。

- 这个部分看看这个网站吧 写的很好
https://www.cnblogs.com/gaodi2345/p/13864532.html


-----------------

### 登录功能实现
- 通过 element ui 组件来实现布局
- 要使用的组件：
<!-- 
  el-form
  el-form-item
  el-input
  el-button
  图标字体
 -->

- 记录：
- 登录的布局中 含有登录的表单 有用户名 和 密码 和 按钮区域
- 用户名 是一个 form-item 项
- 密码 是一个 form-item 项
- 登录按钮 和 重置按钮 也是一个 form-item 项


> element-ui的使用方式
- <el-from label-width="80px">
- label-width 是给input框左侧文字区域的宽度
- 当不想要左侧区域的时候 删掉它是没有用的 必须设置为0
<!-- 
  <el-from label-width="0">

  注意 假如只有一项不想要左侧label的占位距离 可以单独设置
  <el-form-item label-width="0">
 -->

- 当发现 form 框没有占满整个宽度的时候 我们要给它一个width: 100%的设置
- 占满后想让 form 框和左右之间有空隙 那就使用 padding 
- 发现 form 超过父元素区域的时候 我们就使用 box-sizing 试试
<!-- 
  .login-form {
    position:absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    .btn-wrap {
      background-color: red;
      text-align: center;
    }
  }
 -->


- <el-form-item label="文本框前面的文字">
- input框左侧文字的内容


- <el-from class="test">
- <el-form-item class="test">
- form 和 formItem是可以添加类名的


- <input prefix-icon="el-icon-search"> 给input框内 添加图标的方式有两种
- 1. 属性的方式添加 图标字体
- 2. slot的方式添加 图标字体
<!-- 
  可以通过 prefix-icon 和 suffix-icon 属性在 input 组件首部和尾部增加显示图标
  也可以通过 slot 来放置图标。
 -->


- <input type="password">
- 可以为input框指定类型


> form组件的数据收集
- 在 form 组件上 有一个 :model 我们在这个表单中填写的所有数据 都会自动同步到 绑定的对象身上
- 1. <form :model="form">
- 将form组件中的所有提交数据都绑定在form对象上，form在data中定义

- 2. <el-input v-model="form.username">
- 在每一个 输入框或者下拉框上使用 v-model 绑定到 form 对象上的属性上
<!-- 
  表单中的所有数据都会在这个form对象上
  <el-form :model="form">
  <el-input v-model="form.username">

  form对象是在data配置项中定义的
  data() {
    return {
      username: ''
      password: ''
    }
  }
 -->


> form组件的数据验证
- 当我们输入完信息之后 会对文本框中的内容进行数据的验证
- 1. 在 <form :rules="rules">
- 给 form 绑定一个 验证规则对象 rules 也在data数据中定义 它当中是一组组的kv 
- k：form数据对象中的一个值 比如 username
- v：类型是一个数组 数组中是一个个对象 每一个对象就是一条验证规则
      v 中可以定义的规则有 required message trigger min max type
<!-- 
  rules: {
    username: [
      { required: true, message: '请输入活动名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请选择活动区域', trigger: 'change' }
    ],
    date1: [
      { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
  }
 -->

- 2. <el-form-item prop="name">
- 使用prop属性 指定 哪条验证规则对它生效
<!-- 
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min:4, max:10, message: "长度在 4 到 10 个字符", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min:4, max:10, message: "长度在 4 到 10 个字符", trigger: "blur"}
        ]
      }
    }
  }

  <el-form 
    class="login-form" 
    size="small"
    :model="loginForm"
    :rules="loginRules"
  >
    <el-form-item prop="username">
      <el-input 
        prefix-icon="el-icon-user-solid"
        v-model="loginForm.username"
      >
      </el-input>
    </el-form-item>
 -->


> form组件的 重置按钮
> resetFields
- 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
- 只要我们获取了表单的实例对象 通过实例对象调用resetFields函数就可以了
- 我们可以给 form 组件 使用ref属性 来获取这个组件的实例对象

- 要点：
- 我们通过 ref 给组件绑定的的时候 获取的是组件实例对象

<!-- 
  <el-form 
    ref="loginFormRef"
  >

  methods: {
    resetLogin() {
      this.$refs.loginFormRef.resetFields()
    }
  }
 -->


> form组件的 登录的预校验
- 我们点击登录按钮之后不应该直接发起网络请求 应该在发起请求之前先对表单数据进行校验 当验证通过之后才能发起网络请求

- 思路：
- 点击登录之后 调用表单的某个函数 进行预验证


> validate
- 通过表单的实例对象 调用该方法 参数是一个回调函数

- 对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
<!-- 
  this.$refs.loginFormRef.resetFields((valid, object) => {
    boolean 为 true 校验通过 为false 校验不通过
    if(!valid) return

  })
 -->


> form组件的 点击登录 发起请求
- 1. 配置 axios 在入口文件中 像下面这样操作 每一个组件都可以通过this访问到$axios 从而发起ajax请求
<!-- 
  import axios from "axios"

  // 配置请求根路径
  axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/"
  Vue.prototype.$axios = axios

  我没用这种方式 使用的是 王红元的网络封装axios
 -->

- 要点：
- let {data: res} = await request()
- 可以解构赋值 + 重命名

<!-- 
  loginSubmit() {
    this.$refs.loginFormRef.validate(async (valid) => {
      if(!valid) return
      try {
        let {data: res} = await request({
          url: "/login",
          method: "post",
          data: this.loginForm
        })
        if(res.meta.status !== 200) return console.log(res.meta.msg)
        console.log("登录成功", res)

      } catch(err) {
        console.log(err)
      }
    })
  }
 -->

- 2. 发起登录请求后 我们可以判断返回的数据中的状态码 如果不是200 那么就说明登录失败
<!-- 
  {
    data: null
    meta: {msg: '用户名不存在', status: 400}
  }
 -->

- 总结思路：
- 在点击登录的时候先进行了预校验 如果为true 我们开始发送 ajax请求
- 我们对拿到的后台结果 进行判断 也就是说 一般后台返回的结果 都会有 status 之类的东西楼？


> Message消息提示
- 它的使用方式比较特殊 不是注册插件 而是全局挂载
- 相当于将弹窗组件挂载到了Vue的原型上 这样每一个组件都可以通过this来访问到$message
<!-- 
  import {
    Message
  } from 'element-ui'

  Vue.use(Input)
  Vue.prototype.$message = Message


  // 两种使用方式
  this.$message({
    message: res.meta.msg,
    type: "error",
    duration: "1000"
  })

  this.$message.success("登录成功")
  console.log(res)

  // res的结果

  // data
  email: "adsfad@qq.com"
  id: 500
  mobile: "12345678"
  rid: 0
  token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE2MzI3NDg3NjcsImV4cCI6MTYzMjgzNTE2N30.EfPp-yowYV3UBuH_74veodpdWvUL3S9pJKT8XHBBEP4"
  username: "admin"


  // meta
  {msg: '登录成功', status: 200}

  res.data是数据
  res.meta是登录是否成功的信息

  res.data.token 就是颁发的令牌
 -->


> form组件的 点击登录 token的逻辑
- 1. 将登录成功之后的token 保存到客户端的 sessionStorage中
  - 1.1 项目中出了登录之外的其它api接口 必须在登录之后才能访问
  <!-- 
    我们在访问其它接口的时候 携带token token是用户登录成功后 服务器颁发的 所以当访问其它接口的时候 携带token 证明成功登录的 
   -->

  - 1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage中

> 要点：window.sessionStorage.setItem("token", res.data.token)
  <!-- 
    为什么是session不是local 因为session是关闭页面后就失效了 所以保存在session比较合适一些
   -->

- 2. 通过编程式导航跳转到后台主页 路由地址是 /home

<!-- 
  loginSubmit() {
    
    ...

        this.$message.success("登录成功")
        console.log(res)

        // 我们将从服务器获取的token保存在 sessionStorage 中
        window.sessionStorage.setItem("token", res.data.token)

        // 既然成功登录 就让它跳转到首页
        this.$router.push("/home")

      } catch(err) {
        console.log(err)
      }
    })
  }
 -->


> 通过路由导航守卫控制访问权限
- 我们的需求除了login页面 其它的页面都是登录成功后才能访问
- 也就是没有登录的状态 是不允许看到其它的页面的 也就是当没有token的时候 我们要自动定向到 /login

- 思路：
- 如果用户没有登录 但是直接通过url访问特定页面 需要重新导航到登录页面
- 我们需要用到路由导航守卫

> 要点：
> router.beforeEach((to, from, next) => { ... })

- 如果用户访问的登录页 直接放行 
- to代表目标页面 如果我们要去的页面 是 login 那么就直接放行

- 如果访问的不是登录页 那我们就要判断 session 中是否存了一个token 我们把token取出来 判断是有token 如果没有 就让它重定向到 login 页面


> 要点：
> next("/login")
- 它有两种放行的写法
- 1. next()
- 2. next(路径)


- 我们需要在路由的配置文件里面写逻辑 在export default router 之间设置全局路由守卫
- /router/index.js
<!-- 
  router.beforeEach((to, from, next) => {

    // 解析：
    to将要访问的路径
    from代表从哪个路径跳转而来
    next是一个函数表示放行
    要return么？要return 这样放行后 后面的逻辑就不执行了
    if(to.path === "/login") return next()

    // 如果没有return出去 那么就说明要访问的是有权限的页面就需要进行判断
    const tokenStr = window.sessionStorage.getItem("token")
    if(!tokenStr) return next("/login")

    // 如果没有return出去就是没有return到login 就说明token是存在的 直接放行
    next()

  })
 -->


> 退出逻辑
- 基于token的方式实现退出比较简单 只需要销毁本地的token即可，这样，后续的请求就不会携带token，必须重新登录生成一个新的token之后才可以访问页面

- 核心代码
- 1. 清空 token
- window.sessionStorage.clear()

- 2. 跳转到登录页
- this.$router.push("/login")
<!-- 
  loginOut() {
    window.sessionStorage.clear()
    this.$router.push("/login")
  }
 -->


> 在访问需要授权的api时 必须要携带 token
- 也就是必须在请求头中使用 authorization 字段提供 token 令牌
- 也就是除了登录接口之外 其它所有接口必须要授权才能调用

- 要点：
- 通过 axios 请求拦截添加 token 保证拥有获取数据的权限
<!-- 
  interceptors.request
  就是一个请求拦截器 我们通过use函数 为请求拦截器挂载一个回调函数
  只要我们通过axios发送请求 在发送请求前优先调用use函数

  export function request(config) {
    const instance = axios.create({
      baseURL: "http://127.0.0.1:8888/api/private/v1"
    })

    instance.interceptors.request.use(config => {
      // 为请求头对象 添加 token 验证的 authorization 字段
      config.headers.Authorization = window.sessionStorage.getItem("token")
      return config
    }, err => {
      console.log(err)
    })

    return instance(config)
  }
 -->


- 方式二
- 全局配置：
<!-- 
  axios.defaults.baseURL = "http"
  axios.interceptors.request.use(config => {
    config.headers.Authorization = window.sessionStorage.getItem("token")
    return config
  })
  Vue.prototype.$http = axios
 -->



> 问题集：
- 1. html body app高度不撑开的问题
<!-- 
  先在下面的文件夹里面创建 css 文件 
  | - src
    | - assets
      | - css
        - common.css

  html, body, .app {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  然后在main.js中引入
  import "./assets/css/common.less"
 -->

- 2. 设置按需引入element-ui后的使用方式
- 在main.js中文中 按照下面的方式使用 写的是 Form 大写的部分
<!-- 
  import Vue from 'vue'
  import {Form, FormItem, Button, Input} from 'element-ui'

  Vue.use(Form)
  Vue.use(FormItem)
  Vue.use(Button)
  Vue.use(Input)
 -->


> Git相关要点：
- 当我们每次开发一个新功能的时候 都要建立一个新分支 当功能开发完毕后 我们再把分支合并到main主分支上

- 我们在开发登录功能的时候 可以创建一个login分支
<!-- 
  git checkout -b login
  我们创建了一个子分支 并且切换到了 这个 login 分支上

  git branch
  查看当前所有的分支
 -->

- 我们开发完了登录功能后 需要提交 因为我们是在login分支上做的 所以本地提交的时候也是在login分支上

- 接下来我们把login分支上的代码合并到master上
- 1. 切换到 master
<!-- 
  git checkout main
  git branch
  git merge login
 -->

- 2. 将本地的main分支推送到远程仓库
<!-- 
  git push origin main
  git push 就可以哦 哈哈
 -->

- 我们注意一下 本地有两个分支 login 和 main 而远程仓库只有一个分支 main
- 那怎么把本地的login也推送到远程仓库里面呢？
- 1. 切换到login分支
- 2. 这是我们第一次将 login 推送到云端 所以我们要-u
<!-- 
  git push -u origin login
 -->


> 语法处理 处理项目中eslint语法报错的问题
- 我们根目录下创建 .prettierrc 文件
- 1. 格式化的时候 不加分号 双引号格式化的时候为单引号
<!-- 
  {
    "semi": false           // 格式化代码的时候就不会加分号了
    "singleQuote": true     // 设置成单引号
  }
 -->

- 2. 如果函数小括号前没有空格会报错的话 我们配置一下 eslint 文件
- .eslintrc.js
- 我们找到 rules配置项 它就是语法规则
<!-- 
  在下面添加：
  "space-before-function-paren": 0
 -->


-----------------

### 主页部分

> 1. 整体布局
- 先上下划分，再左右划分 这里我们需要用 elment组件
- 1. el-container
- 2. el-header      头部
- 3. el-aside       侧边栏
- 4. el-main        右侧主体

- 要点：
- elementui的组件名称就是它的类名
- el-container 没有全屏 设置它的样式 height 100%
<!-- 
  <template>
    <el-container class="home-container">
      <el-header>Header</el-header>
      <el-container>
        <el-aside width="200px">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </template>

  .home-container {
    height: 100%;
  }
 -->


> 2. 菜单部分的样式
- 这里我们使用了 el-menu 和 el-submenu el-submenu-item 组件
<!-- 
  el-menu     包裹器
  el-submenu  1级菜单
  el-submenu-item   2级菜单
 -->

- 菜单项中的图标和文本要自己配置
<!-- 
  <template slot="title">
    <i class="el-icon-location"></i>
    <span>导航一</span>
  </template>
-->


<!-- 
  <el-menu
    default-active="2"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"      菜单栏的背景色
    text-color="#fff"               菜单栏文字区域的颜色
    active-text-color="#ffd04b">    激活的文本颜色
 -->


> 获取菜单栏数据
- 请求路径： menus
- 请求方法： get
- 响应数据： 
<!-- 
  {
    "data":
      {
        "id": 101,
        "authName": "商品管理",
        "path": null,
        "children": [
          {
            "id": 104,
            "authName": "商品列表",
            "path": null,
            "children": []
          }
        ]
      }
    "meta": {
      "msg": "获取菜单列表成功",
      "status": 200
    }
  }
 -->

- 整个页面在一加载的时候应该立即获取左侧菜单
<!-- 
  data() {
    return {
      menuList: []
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push("/login")
    },

    // 获取所有菜单
    async getMenuList() {
      let {data: res} = await request({
        url: "/menus",
        method: "get"
      })
      if(res.meta.status !== 200) return this.$message.error(res.meta.$message)
      this.menuList = res.data
      console.log(res.data)
    }
  },

  created() {
    this.getMenuList()
  }
 -->


> 使用请求回来的菜单数据 动态渲染菜单
- 1级菜单的渲染
<!-- 
  <el-submenu :index="item.id + ''" v-for="item of menuList" :key="item.id">

  index：
  主要它只接收字符串 所以我们要强制的类型转换

  每一个菜单都要有自己的index 如果index一样点击它的时候会一起打开
 -->

- 2级菜单的渲染
<!-- 
  <el-menu-item :index="i.id + ''" v-for="i of item.children" :key="i.id">
 -->


> 菜单栏的手风琴效果
- 也就是只允许展开一个菜单 展开一个的同时其它的菜单关闭
- el-menu 属性 - unique-opened - boolean


> 菜单栏的展开和合并
- 左向右展开的效果
- el-menu 身上有一个属性 collapse 我们可以通过控制这个值达到控制展开关闭的效果
<!-- 
  <el-menu
    background-color="#00BCD4"
    text-color="#fff"
    active-text-color="#ffd04b"
    :unique-opened="true"
    :collapse="isCollapse"          控制这个值
    :collapse-transition="false"    展开合并动画关闭
  >

  data() {
    return {
      isCollapse: false,
    }
  }

  toggleMenu()  {
    this.isCollapse = !this.isCollapse
  },

  侧边栏也要跟着收缩
  <el-aside :width="isCollapse ? '64px' : '200px' ">
 -->


> 问题1：我们的菜单都是通过v-for循环统一设置的 那怎么在v-for中给菜单添加不一样的图标呢？
- 定义和id一样的key 然后定义图标数组 通过key去找对应的图标
<!-- 
  <i :class="icons[item.id]" class="menu-icon-color"></i>

  icons: {
    // 因为每一个1级菜单都有自己的key 这个key是通过id来定义的 所以我们以id的值作为key 值为字体图标
    "125": "el-icon-user-solid",
    "103": "el-icon-star-on",
    "101": "el-icon-goods",
    "102": "el-icon-s-help",
    "145": "el-icon-s-platform"
  }
 -->


> 问题2：导航栏右侧有一条线多余
- .el-menu {border-right: none}