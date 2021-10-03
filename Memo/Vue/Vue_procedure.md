### https://www.cnblogs.com/haiyan123/p/9765447.html


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


> 首页路由的重定向
- 现在的效果是 当我们登陆成功后 会跳转到 /home 的页面
- 现在我们要在 home组件里面 放入一个 欢迎组件 当登陆成功后就会自动到home下的 欢迎组件 也就是说 要把 欢迎组件 当做是 home组件的子路由 

- 关于路由的配置信息 那么就要放在 router 的配置文件里面
<!-- 
  {
    path: "/home",
    component: Home,

    //重定向的时候写 /uri 二级路由要带上完整的路径
    redirect: "/home/welcome",
    children: [
      {
        // 二级路由的前面不要加斜线
        path:"welcome",
        component: Welcome
      }
    ]
  }
 -->

 - 不要忘记放置 <router-view>


> <menu :router="true">
 > 导航菜单的每一项改成 router-link的形式
 - 我们左侧的每一个菜单项都是通过 el-menu-item来实现的 如下：
 <!-- 
  <el-menu-item :index="i.id + ''" v-for="i of item.children" :key="i.id">
    <template slot="title">
      <i class="el-icon-menu menu-icon-color"></i>
      <span>{{i.authName}}</span>
    </template>
  </el-menu-item>
  -->

- 我们要将每一个二级菜单改成路由连接 利用 <menu router> 属性
- 是否使用 vue-router 的模式，启用该模式会在激活导航时
- 以 <el-menu-item index> 的index属性作为 path 进行路由跳转
<!-- 
  // 当我们给 el-menu 绑定 router 的时候 此菜单栏就会以
  <el-menu :router="true">

  // 就会以 index 的值为 跳转路径 
  <el-menu-item :index="`/${i.path}`" >

  下面是以id为跳转的路径 我们应该以 path 做为 index 属性的值
  但是 服务器返回的结果是

  menuList是一个数组对象 其中的path属性
  path:"users"

  要知道我们的路由地址都是以 / 开头 所以我们要 这样修改下
  <el-menu-item :index="`/${i.path}`" >
 -->

 -----------------

### 用户列表

> 点击 导航按钮 跳转到对应组件
- 创建用户列表连接对应的组件页面
- 我们登录后直接渲染的是home组件 而我们在home组件里布局的 所以包括导航栏和对应的展示区
- 所以所有的路由组件都可以看做是home.vue的子组件
- 那么就意味着它的子组件都要定义在router配置文件中的 children 属性里面


> 这里有需要注意的地方
- 1. 如果 我希望 我的路径是 /home/user 那么配置的时候要这样
- 二级嵌套路由的前面不要加上 / vue会自动帮我们组成这样的形式
<!-- 
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "user",
        component: User
      }
    ]
  }
 -->

- 2. 如果 我希望虽然我是在home组件下 但希望我的路径是 /user 那么我们就要这样
- path的部分要加上/ 就更新开了一个号似的
<!-- 
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "/user",
        component: User
      }
    ]
  }
 -->

-----------------

> 保存 菜单栏的激活状态
- 现在我们点击完导航区的按钮后 也展示了对应的组件 但是 按钮并没有高亮
- 我们刷新页面后 虽然用户列表的组件展示了 但是导航区都处于合并状态 没有对应的展开

> <el-menu default-active>
- 当前激活菜单的 index  接收的值是一个str
- 也是 NavMenu 组件的属性 我们需要将当前菜单项 <el-menu-item index> 的index赋值给 这个属性

- 而我们现在<el-menu-item index>是 path /users
<!-- 
  // 这里我们写死了 所以展开和刷新后，高亮的都是 el-menu-item 里的index 值
  <el-menu
    :router="true"
    default-active="/users"
  >
 -->

- 那怎么样才能动态的调整呢 而不是写死呢？
> 老师的思路：
- 我们可以把 <el-menu-item index> index对应的值 也就是 path 地址 保存在 sessionStorage中
- 当我们刷新页面的时候可以把这个值从sessionStorage中取出来 动态的赋值给 <el-menu default-active>
<!-- 
  我的思路：
  按钮区都在 home 组件中，我们可以在展示users的时候 通过$route将路径存起来 然后利用子传父 传回home组件


  弹幕的思路：
  既然 index 里面存的是路径 那么 :default-active="$route.path"
  这种方式也可以把
 -->

- 1. 点击链接的时候 将对应的地址保存在 sessionStorage 中
<!-- 
  那就要给所有的菜单绑定单击事件 在单击事件中 存储path值
  这样都能在一个组件中完成哦 那我们的做法好费劲哦
 -->

- 2. 当再次刷新页面的时候 也就是home组件刚被创建的时候 就立即再将值取出来 赋值给左侧的菜单就可以了

<!-- 
  <el-menu
    :router="true"
    :default-active="activePath"
  >

  data() {
    return {
      activePath: "",


  methods: {
    saveNavState(value) {
      window.sessionStorage.set("activePath", value)

      // 当点击链接的时候 不光要将 值存到 session中 还要将赋值给 menu
      this.activePath = value
    },

  
  created() {
    this.getMenuList(),
    this.activePath = window.sessionStorage.getItem("activePath")
  }
 -->

-----------------

 > 绘制 用户列表 的结构
 > 头部： 面包屑 导航 区域
 - 我们使用 element 提供的 Breadcrumb 组件 
 <!-- 
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    <el-breadcrumb-item>用户列表</el-breadcrumb-item>
  </el-breadcrumb>
  -->

-----------------

> 用户列表区：Card 组件
- 这里再提一下 我们可以直接将组件名作为类名 进行样式的覆盖 如果没有效果可以考虑
- >>> 样式穿透 或者是 /deep/ 用来修改组件样式的时候

-----------------

> 带搜索的输入框 
<!-- 
  <el-card class="usersList">
    <el-row :gutter="24">

      <el-col :span="8">
        <div>
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>

      <el-col :span="4">
        <el-button type="primary">添加用户</el-button>
      </el-col>

    </el-row>
  </el-card>
 -->

- 问题1：
- 这个 input 框占满了整体屏幕 为了解决宽度的问题 我们可以使用 栅格系统来解决

-----------------

> 获取用户列表数据
- 我们在created里面发起请求首屏的 获取数据 用户展示列表

> API：
- 请求路径：users
- 请求方法：get
- 请求参数：
  - query     查询参数      可以为空
  - pagenum   当前页码      不能为空
  - pagesize  每页显示条数   不能为空
<!-- 
  - 响应参数

    totalpage   总记录数
    pagenum     当前页码
    users       用户数据集合

  
  - 数据格式
  {
    "data": {
      "totalpage": 5,
      "pagenum": 4,
      "users": [
        {
          "id": 25,
          "username": "tige117",
          "mobile": "18616358651",
          "type": 1,
          "email": "tige112@163.com",
          "create_time": "2017-11-09T20:36:26.000Z",
          "mg_state": true, // 当前用户的状态
          "role_name": "炒鸡管理员"
        }
      ]
    },
    "meta": {
      "msg": "获取成功",
      "status": 200
    }
  }
 -->

-----------------

> 分页请求的逻辑
- 思路：
- 我们在一刷新页面的时候就要请求数据 发起axios请求 请求数据用于展示

> 1. 发起get请求的时候要注意请求参数 在vue中一般请参数在data配置项中定义
- 同时 get 参数 在 params 中定义

  - get请求需要传递的参数一般会有：
    - 查询条件
    - 当前页码
    - 一页显示多少数据


**注意：**
- 我们返回的数据 user数据列表和 total 和 pagenum 是同级的说明一样重要


- 其中服务器返回的数据里面的参数有：
  - total： 所有的用户记录数量 可以通过它来实现数据的分页
  - users： 是一个数组 包含第一页中的两条记录
<!-- 
  total: 0,
  queryInfo: {
    query: "",

    // 当前页码 表格中一页显示的数据 当前是第几页 
    pagenum: 1,

    // 一页显示多少条数据
    pagesize: 2
  }

  async getUsersList() {
    let {data :res} = await request({
      url: "/users",
      method: "get",
      params: this.queryInfo
    })
    console.log(res)
  }


  // 返回数据的格式：
  pagenum: 1
  total: 4
  users: (2) [{…}, {…}]
      create_time: 1486720211
      email: "adsfad@qq.com"
      id: 500
      mg_state: true
      mobile: "12345678"
      role_name: "超级管理员"
      username: "admin"

  meta: {msg: '获取管理员列表成功', status: 200}
 -->


> 2. 当获取数据成功的时候 我们将数据保存在 data 配置项里面
- 我们在data配置项中 初始化了两个数据
<!-- 
  data() {
    return {
      userList: [],
      total: "",      这里我们最好是 total: 0 要不element会报错
    }
  }
 -->


> 3. pagination组件 的使用方式
- 为了实现分页效果 我们要使用 element ui 中的 Pagination 组件

- 属性：
  - size-change： 
  - 切换每页显示多少条的下拉菜单 只要切换就触发回调 在回调中可以拿到最新的pagesize
  - 例：拿到的是 5 10 15
  - 一般我们在这个回调中会处理 将用户选择的值 赋值给我们保存在data配置项中的 pagesize


  - current-change:
  - 页码值发现了切换就会触发这个回调 在回调中可以拿到最新的页码值
  - 一般我们在这个回调中会处理 将用户选择的值 赋值给我们保存在data配置项中的 pagenum


  - current-page：
  - 当前显示的第几页的数据（我们可以通过服务器返回的数据中会有当前显示第几页的数据 queryInfo.pagenum ）


  - page-sizes:
  - 它的类型是一个字符串数组 会有下拉框展示我们数组中的值 供我们选择 100条/页


  - page-size：
  - 当前每页显示多少条数据


  - layout：
  - 它的类型是一个字符串 用于展示页面上有哪些功能组件
  - total：例： 共 400 条
  - sizes：例： 5条/页  10条/页  30条/页  50条/页


  - total：
  - 一共有多少条数据 这个是服务器返回给我们的结果
  - element 这里要求 total 要是一个 number 类型的数据

<!-- 
  <el-pagination
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
    :current-page="queryInfo.pagenum"
    :page-sizes="[5, 10, 30, 50]"
    :page-size="queryInfo.pagesize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total"
  >
  </el-pagination>
 -->

> 完整代码
<!-- 
  // 监听 pagesize 改变的事件
  handleSizeChange(newSize) {
    console.log("newSize", newSize)

    // 我们将用户选择的newSize 赋值给 data配置项中的  queryInfo.pagesize
    this.queryInfo.pagesize = newSize

    // 既然我们用户选择了最新的 pagesize 那么我们就需要拿着这个最新的pagesize 去请求数据
    this.getUsersList()
  },

  // 监听 页码值 改变的事件
  handleCurrentChange(newPage) {
    console.log("newPage", newPage)
    this.queryInfo.pagenum = newPage
    this.getUsersList()
  },

  async getUsersList() {
    let {data :res} = await request({
      url: "/users",
      method: "get",
      params: this.queryInfo
    })
      
    // 根据服务器返回的状态码判断
    if(res.meta.status !== 200) return this.$message({
      message: "获取用户数据失败",
      type: "error",
      duration: 1000
    })

    // 如果没有return出去那么代表用户获取成功
    this.userList = res.data.users
    this.total = res.data.total
    }
  },
  created() {
    this.getUsersList()
  },
 -->


> 逻辑梳理
- 1. 我们 首先 要参考 get请求 需要的参数 发送请求 这里要注意我们需要什么必传参数
<!-- 
   - get请求需要传递的参数一般会有：
    - 查询条件
    - 当前页码
    - 一页显示多少数据
 -->

- 2. 我们从服务器请求回来的数据里面 会有关于分页的信息
- 比如用户数据 总记录数 
- 我们将获取的数据 报错到data配置项里面 方便其他的地方使用

- 3. 导入 分页组件 需要使用以下的属性和方法
<!-- 
  // 当用户选择每页显示多少条记录的时候触发
  @size-change="handleSizeChange"
      内部逻辑： 将用户选择的结果 保存在 data配置项中 重新发起请求


  // 当用户选择点击了第几页的时候触发
  @current-change="handleCurrentChange"
      内部逻辑： 将用户选择的结果 保存在 data配置项中 重新发起请求

  // 现在是第几页
  :current-page="queryInfo.pagenum"


  :page-sizes="[5, 10, 30, 50]"
  :page-size="queryInfo.pagesize"
  layout="total, sizes, prev, pager, next, jumper"

  // 服务器返回的总记录数 应该是一个数字
  :total="total"
 -->

-----------------

> 根据数据渲染列表
- 我们使用 table 组件

- 配置索引列：
- 我们格外添加一个列 注意设置 type="index" 属性
<!-- 
  <el-table-column type="index" label="序号" align="center"></el-table-column>
 -->


 - 动态生成 column 的时候 一定要注意的是 v-bind="item"

 - 修改表格的字号 我们自己设置的class没有作用的时候
 - 1. 重置 组件名类名
 - 2. 使用 deep


 > 表格中的作用域插槽
 - 当该列指定作用域插槽后 该列的prop就不再生效了
 - 我们返回的数据里面 有一个 用户状态的字段 mg_state 它是一个布尔值
 - table没办法把布尔值渲染成 内容 而且我们要将这个 mg_state 设置成 单选框 的样式
 - 所以这里我们就要使用作用域插槽
 - 只要我们拿到这一行的数据 就能.mg_state 具体的值 然后我们就可以根据值 渲染对应的单选框

 - 我们要想在表格中使用 作用域插槽 就要在 table-column 组件里面写上 template 并且指定上 slot-scope="scope" 其中 scope.row 就是这一行的数据
 <!-- 
  <el-table-column>
    <template slot-scope="scope">

    <template>
  </el-table-column>
  -->

- 那我们拿到数据了 怎么才能渲染成开关呢？
- 这里我们使用 element ui 提供的 Switch 开关
<!-- 
  <el-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949">
  </el-switch>

  绑定v-model到一个Boolean类型的变量。可以使用active-color属性与inactive-color属性来设置开关的背景色。
 -->

- 一个表格中 不同单元格 渲染不同类型的数据
<!-- 
  <el-table-column 
    v-for="item of this.columnData" 
    :key="item.id" 
    v-bind="item"
  >

    <template scope="scope" v-if="item.type == 'switch'">
      <el-switch
        v-model="scope.row.mg_state"
      >
      </el-switch>
    </template>

    <template scope="scope" v-else>
      {{showData(scope.row, item.prop)}}
    </template>
  </el-table-column>


  computed: {
    showData() {
      return (row, prop) => {
        return row[prop]
      }
    }
  }
 -->

-----------------

 > 表格中 操作本行数据的按钮
- 因为不管编辑还是删除我们都需要本行的id 也就是本行的数据 所以 我们还是要通过 表格中的作用域插槽来做
- 比如我们可以访问 姓名 id 等等
- 我们要在这里面放置，修改 删除 分配角色按钮

- 这里我们使用 elementui的 图标按钮
<!-- 
  <el-table-column label="操作" width="200">
    <template scope="scope">
      <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
      <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
      <el-button type="warning" icon="el-icon-share" size="mini"></el-button>
    </template>
  </el-table-column>
 -->

-----------------

> 按钮的提示组件
- Tooltip 组件
- 我们使用这个组件 将我们的按钮包裹起来就可以了
  - content： 提示文字
  - effect： 风格
  - placement： 出现的位置
  - enterable: 将它设置为false 要不然会挡住其它的内容
<!-- 
  <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
    <el-button type="warning" icon="el-icon-share" size="mini"></el-button>
  </el-tooltip>
 -->

-----------------

> 用户状态的修改
- 我们的表格中有用户的状态 它是一个开关，现在的问题是 当我们改变这个状态的时候 刷新页面 用户的状态又回到未修改之前了

- 没有保存下来的原因 只是因为我们在前台把用户的状态进行了修改 但是并没有同步到后台的数据库里面 所以在刷新页面的时候 会变回去了

- 解决问题的方式很简单 只需要将这次的修改 保存到数据库中

- 思路：
- 1. 我们需要监听到 Switch开头的改变 从而拿到最新的状态
- 2. 调用对应的api接口 把这次的修改 同步到数据库中

- 1. 完成1的话 我们要使用 <el-switch> 的 change 事件
- 该事件会在 switch 状态发生变化时的回调函数 调用 我们在回调中可以拿到最新的状态值
<!-- 
  <el-switch
    v-model="scope.row.mg_state"
    @change="userStateChange(scope.row)"
  >

  用户选择的最新的状态值，双向绑定到了 scope.row.mg_state 这个属性中
  所以我们将 scope.row 这行的数据 也就是最新的数据 传到事件回调里面

  userStateChange(userInfo) {

    // 这里我们就能获取到 修改后的 这个用户的最新数据
    console.log(userInfo)
  },
 -->

- 2. 接下来我们就要在这个事件回调中 使用对应的api接口 发送请求
- 这里我们使用这个接口

- API：
- 该接口用于 修改用户状态

- 1. put请求
<!-- 
  post和put的区别：

  post 用于 新建一条记录
  put  用于 更新一条记录 
    理论上要求前端传递一个完整的userInfo对象
    如果你用了put，但却没有提供完整的UserInfo，那么缺了的那些字段应该被清空

  patch 用于 局部更新一条记录 
    表示该请求是一个局部更新，后端仅更新接收到的字段。
 -->

  - 请求路径：users/:uId/state/:type
  - 请求参数
    - uId   用户ID      不能为空`携带在url中`
    - type  用户状态     不能为空`携带在url中`，值为 true 或者 false

<!-- 
  // 响应数据

  {
    "data": {
      "id": 566,
      "rid": 30,
      "username": "admin",
      "mobile": "123456",
      "email": "bb@itcast.com",
      "mg_state": 0
    },
    "meta": {
      "msg": "设置状态成功",
      "status": 200
    }
  }
 -->


- 前面我们的mg_state数据应该是true和false 这里的请求结果是 1 0 ？ 这样会不会影响显示效果呢？
<!-- 
  data:
    email: "asdf@qq.com"
    id: 502
    mg_state: 1
    mobile: "1213213123"
    rid: 34
    username: "linken"

  meta: {msg: '设置状态成功', status: 200}
 -->

- 完整代码部分：
<!-- 
  // 监听 switch 开关状态的改变
    async userStateChange(userInfo) {
    console.log(userInfo)

    // 获取到最新的用户状态之后 发起请求 修改数据库
    let {data: res} = await request({
      url: `users/${userInfo.id}/state/${userInfo.mg_state}`,
      method: "put"
    })

    console.log(res)
    if(res.meta.status !== 200) {
      // 这里要注意 因为没有成功修改数据库 但是前端页面的显示效果发生了变化 变成了true 所以我们要将true修改回去false
      userInfo.mg_state = !userInfo.mg_state

      return
      this.$message({
        type: "error",
        message: "更新用户数据出错",
        duration: 1000
      })
    }

    // 更新状态成功
    this.$message({
      type: "success",
      message: "更新状态成功",
      duration: 1000
    })

  },
 -->

**注意：请求部分的注意事项**
- 我们发送请求的时候一定要看接口文档 因为每一种接口传递参数和携带参数的位置都不一样
- 比如这次的put 请求 使用的就是 pathInfo 格式 在url上拼接的方式
- 我觉得这是因为后台在设计接口的方面 采取的就是这种模式 所以需要让前端按照这种模式来传递数据

-----------------

> 使用 搜索框 搜索用户
- 在用户输入了用户名称的时候 根据输入结果展示对应的用户
- 这部分的逻辑放在了后台 根据前端发请求时传递的查询条件 进行了模糊匹配 然后返回数据


- 思路：
- 我们要将 input 文本框 和 data 中的数据做双向绑定
- 然后点击按钮的时候调用获取用户列表的函数 进行数据的查询就可以了


- 1. 设计 input 的 v-model 绑定给谁
- 我们在页面一渲染的时候 会发起 用户列表的请求 这个时候 服务器会返回给我们下面的数据格式 而其中query就是用于查询的字段 我们就把input绑定到这个属性上
<!-- 
  query: "",
  pagenum
  pagesize
 -->

- 2. 我们给 搜索按钮 绑定一个单击事件 只要点击了它就会根据 input 的关键字进行搜索 只要点击了按钮就要发起查询用户的请求
<!-- 
  // 这里将用户输入的结果 绑定在了 queryInfo 里面的 query 中 这个queryInfo就是查询用户列表数据的时候 作为查询参数的 params的参数对象
  <el-input placeholder="请输入内容" size="small" v-model="queryInfo.query">

    <el-button
      size="small"
      slot="append"
      icon="el-icon-search"

      // 这里直接调用的是 请求用户列表的函数
      @click="getUsersList"
    ></el-button>

  </el-input>
 -->


- 3. 优化：
- 当我们再想看全部内容的时候，我们在input框里面提供一个清空按钮 当用户点击清空文本框的按钮之后 展现全部的数据

- <el-input clearable v-model="queryInfo.query">
- 给input添加可清空功能 添加 clearable 属性
            
- 当点击清空按钮时触发的回调 
- clear 事件

- 当我们点击 清空按钮就会触发 clear事件 我们在clear事件中重新发起请求就可以获取全部用户数据了
<!-- 
  <el-input 
    clearable placeholder="请输入内容" 
    size="small" 
    v-model="queryInfo.query"

    // 当点击清空按钮的时候 发起获取用户数据的请求
    @clear="getUsersList"
  >
 -->


**注意： 数据查询**
- 这里的数据查询是 利用发送请求的方式 也就是说 后端做了数据查询的处理 比如模糊查询

- 而我在工作中用的方式是 前端处理方式，筛选数据 做显示而已 数据还是后端的那些数据

-----------------

> 添加用户
- 我们点击添加按钮 会弹出 dialog 对话框
- 这里我们就使用了 element ui 的 Dialog 组件
- 放的位置随意

> Dialog 组件
- 属性：
  - title：
  - 对话框的标题

  - visible.sync
  - 用户控制对话框的显示和隐藏

  - width
  - 用于控制对话框的宽度

  - before-close
  - 在对话框关闭之前的事件

<!-- 
  <el-dialog
    title="提示"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">

    // 这就是内容主体区
    <span>这是一段信息</span>

    // 对话框底部的按钮区
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>
 -->


> 在 添加用户的对话框中 渲染一个 添加用户的表单
- 我们要在对话框中 添加一个 表单
<!-- 
  其中有 用户名 密码 邮箱 手机 同时这4项都要有表单验证的效果
 -->

- html代码部分
<!-- 
  <el-form 
    :model="addForm" 
    :rules="addFormRules" 
    ref="addFormRef" 
    label-width="70px" 
  >
    <el-form-item label="用户名" prop="username">
      <el-input v-model="addForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="addForm.password"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="addForm.email"></el-input>
    </el-form-item>
    <el-form-item label="手机" prop="mobile">
      <el-input v-model="addForm.mobile"></el-input>
    </el-form-item>
  </el-form>

  // 添加用户的表单数据
  addForm:{
    username: "",
    password: "",
    email: "",
    mobile: ""
  },

  // 添加用户表单的验证规则
  addFormRules:{
    username: [
      {required: true, message: "请输入用户名", trigger: "blur"},
      {min:4, max: 10, message: "用户名的长度要在3 ~ 10个字符之间", trigger: "blur"}
    ],
    password: [
      {required: true, message: "请输入密码", trigger: "blur"},
      {min:6, max: 15, message: "密码的长度要在6 ~ 15个字符之间", trigger: "blur"}
    ],
    email: [
      {required: true, message: "请输入邮箱", trigger: "blur"},
    ],
    mobile: [
      {required: true, message: "请输入邮箱", trigger: "blur"},
    ]
  },
 -->

- 我们将form中的数据 同步到了 data配置项中的addForm里 而我们的每一个子项都在addForm中的每一个属性身上，这样我们收集的数据都会在这个addForm里面


- 但是 上面针对 邮箱和手机号的验证规则 肯定是不对的 那如何自定义校验规则呢？


> form表单的自定义校验规则
- element在data配置项里面定义了一个 箭头函数 这个函数就是自定义校验规则
- 在箭头函数中包含了 3个 参数
- rule: 
    验证规则

- value：
    需要验证的那个值

- callback：
    如果雁阵通过了 我们就可以直接调用callback 代表验证通过 这个效果可能是element配置好的
      if(value) {return callback()}

    如果验证失败了 我们就需要在callback中传递一个 错误对象
      if(!value) {return  callback(new Error("年龄不能为空"))}

<!-- 
  data() {
    
    form表单的自定义校验规则 在这个部分配置 使用箭头函数的形式
    var checkAge = (rule, value, callback) => { ... }

    return {
      平时的时候 我们都是在这里配置数据
    }
  }
 -->

- 如何使用呢？
- 我们定义好自定义规则函数后 在 data配置项的校验规则对象中 使用
- validator:
    该关键字 可以指向 自定义校验函数
<!-- 
  rules: {
    age: [
      { validator: checkAge, trigger: 'blur' }
    ]
  }
 -->


> 代码部分
<!-- 
  data() {

    // 定义 添加用户 时的校验规则
    let checkMail = (rule, value, callback) => {
      let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
      if(reg.test(value)) {

        // 合法的邮箱
        return callback()
      } else {
        return callback(new Error("您输入的邮箱不合法"))
      }
    }

    let checkMobile = (rule, value, callback) => {
      let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/
      if(reg.test(value)) {

        // 合法电话
        return callback()
      } else {
        return callback(new Error("您输入的电话不合法"))
      }
    }

    return {
      // 添加用户的表单数据
      addForm:{
        username: "",
        password: "",
        email: "",
        mobile: ""
      },

      // 添加用户表单的验证规则
      addFormRules:{
        username: [
          {required: true, message: "请输入用户名", trigger: "blur"},
          {min:4, max: 10, message: "用户名的长度要在3 ~ 10个字符之间", trigger: "blur"}
        ],
        password: [
          {required: true, message: "请输入密码", trigger: "blur"},
          {min:6, max: 15, message: "密码的长度要在6 ~ 15个字符之间", trigger: "blur"}
        ],
        email: [
          // 校验是否输入了邮箱
          {required: true, message: "请输入邮箱", trigger: "blur"},
          // 校验输入的是否合法
          {validator: checkMail, trigger: "blur"}
        ],
        mobile: [
          {required: true, message: "请输入邮箱", trigger: "blur"},
          {validator: checkMobile, trigger: "blur"}
        ]
      },
    }
  },
 -->


> 添加用户的重置操作
- 当我们先点击 取消 再次点击打开对话框的时候 上次输入的结果并没有消失 我们希望是一个重置的状态 

- 思路：
- 我们在关闭对话框的时候 重置整个表单就可以了
- 我们监听对话框关闭的事件 在事件中做重置表单的操作

> Dialog close事件
- 该事件在对话框关闭的时候会触发
<!-- 
  <el-dialog
    title="添加用户"
    :visible.sync="dialogVisible"
    width="50%"
    @close="dialogClose"
  >

  dialogClose() {
    this.$refs.addFormRef.resetFields()
  },
 -->


> 添加表单前的预校验操作
- 当我们在 添加用户 的表单对话框中 点击 确定按钮的时候
- 应该进行下表单预验证

- 这里我们要使用 表单组件身上的 validate() 方法

> formref对象.validate((valid) => { ... })
- 对整个表单进行校验的方法，参数为一个回调函数。
- 该回调函数会在校验结束后被调用，并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise

<!-- 
  // 当我们点击 确定后 先进行 表单的预验证 也就是取得 各个表单的验证 结果

  valid：
    当验证全部通过 它是 true
    当验证失败     它是 false

  参数2： 是验证失败的字段


  addUser() {
    // 在这里 我们首先要对整个表单进行预校验
    this.$refs.addFormRef.validate((valid,a) => {
      console.log(valid,a)
    })
  },
 -->


> 发起 添加用户的请求
- 上面的逻辑已经都完成了 也就是说我们可以在点击确定的时候 添加用户信息

- 我们还是要先看api文档 看看我们要发送什么样的请求 和 所需的参数是什么？
- 请求路径：users
- 请求方法：post
- 请求参数：
    username
    password
    email
    mobile

<!-- 
  // 响应数据格式：

  "data": {
    "id": 28,
    "username": "tige1200",
    "mobile": "test",
    "type": 1,
    "openid": "",
    "email": "test@test.com",
    "create_time": "2017-11-10T03:47:13.533Z",
    "modify_time": null,
    "is_delete": false,
    "is_active": false
  },
  "meta": {
    "msg": "用户创建成功",
    "status": 201
  }
 -->

- 完整代码：
<!-- 
  // 在添加用户的对话框中 点击确定 添加用户
  addUser() {
    // 在这里 我们首先要对整个表单进行预校验
    this.$refs.addFormRef.validate(async (valid) => {

      // 如果验证没有通过 我们就不走 添加的逻辑了
      if(!valid) return

      // 如果验证没有通过 那么我们就可以开始 走添加的逻辑了 发起添加用户的请求
      let {data: res} = await request({
        url: "/users",
        method: "post",
        data: this.addForm
      })

      console.log(res)
      if(res.meta.status !== 201) {
        this.$message({
          type: "error",
          message: "添加用户失败",
          duration: 1000
        })
      }

      this.$message({
        type: "success",
        message: "添加用户成功",
        duration: 1000
      })

      this.dialogVisible = false

      // 我们添加了一个新用户后 别忘记还需要刷新用户列表
      this.getUsersList()
    })
  },
 -->

- 要点：
- 因为我们添加了一条数据 那么就要获取用户列表数据 用于显示最新数据

-----------------

> 编辑用户信息
- 当我们点击 编辑按钮 的时候 会弹出 修改用户信息的对话框
- 用户名是只读的 用户可以修改 邮箱和手机 点击确定 发起修改请求

- 思路：
- 1. 我们点击 编辑按钮 后 展示 修改用户信息的对话框
- 2. 点击 编辑按钮 后 我们还要将用户信息 添加到 input 里面
<!-- 
  用户名： linken
  邮箱： xxxx@mail.com
  收集： 12123123
 -->

- 也就是说在点击 编辑按钮 的时候 我们要根据用户的id 查询到用户所对应的旧数据 并且给它保存起来 用我们在表单中进行填充

- 那我们怎么能拿到id呢？ html模板中 可以通过 scope.row 拿到改行的所有数据 我们可以把当前用户的id传递过来
<!-- 
  // 点击 编辑按钮 会弹出 对话框
  <el-button 
    @click="openUpdateUser(scope.row.id)" 
    type="primary" 
    icon="el-icon-edit" 
    size="mini"
  >
  </el-button>


  // 编辑按钮的回调
  // 打开编辑用户信息的回调
  openUpdateUser(id) {

    // 点击 编辑按钮 后的第一件事 打开编辑用户信息的表单对话框
    this.updateDialogVisible = true
    console.log(id)
  },
 -->


- id拿到了 紧接着就是调用对应的接口 获取用户的信息
- 请求路径：users/:id     不能为空`携带在url中`
- 请求方法：get
- 请求参数
<!-- 
  // 响应对象
  {
    "data": {
        "id": 503,                用户id
        "username": "admin3",
        "role_id": 0,             角色id
        "mobile": "00000",
        "email": "new@new.com"
    },
    "meta": {
        "msg": "查询成功",
        "status": 200
    }
  }
 -->

> 完整代码
<!-- 
  // 打开编辑用户信息的回调
  async openUpdateUser(id) {
    let {data: res} = await request({
      url: `users/${id}`,
      method: "get"
    })

    if(res.meta.status !== 200) {
      return this.$message({
        type: "error",
        message: "查询用户信息出错",
        duration: 1000
      })
    }

    // 如果没有return出去说明查询用户信息成功 那我们就把查询到的结果 保存起供页面来使用
    this.updateForm = res.data

    this.updateDialogVisible = true
  },
 -->

- 逻辑梳理：
- 为了在我们点击编辑按钮之后 在随之打开的对话框中 填入 这个用户的信息
- 我们要在点击编辑按钮的回调里面 根据这个用户的id请求数据， 将请求回来的数据保存到data配置项中 然后做展示


> 编辑按钮 -- 对话框中的表单
- 要点：
- 1. 所有的功能表单 我们都要 创建一个form数据对象 让input里面的v-model都绑定到这个form数据对象中的一个属性中

- 2. 这个数据对象中的属性名都是后台接口要求的字段

- 3. 如果其中的一个input不想被编辑 那么就给它设置为 disabled

- 4. 需要验证规则的input项 就使用prop 如果不需要的话 就不用写
<!-- 
  <el-form 
    :model="updateForm" 
    :rules="updateFormRules" 
    ref="updateFormRef" 
    label-width="70px"
  >
    <el-form-item label="用户名">
      <el-input disabled v-model="updateForm.username"></el-input>
    </el-form-item>
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="updateForm.email"></el-input>
    </el-form-item>
    <el-form-item label="电话" prop="mobile">
      <el-input v-model="updateForm.mobile"></el-input>
    </el-form-item>
  </el-form>


  因为 上面所有的input的值都是v-model绑定了 updateForm 
  而 updateForm 的数据都是 打开对话框时发起了请求 将请求结果放到了 updateForm中

  所以我们打开后input里面就有默认值了
 -->

> 技巧：
- 让input框有默认值，不一定要将请求回来的数据 使用js等方法渲染到input中
- 而是可以利用一个data配置项中的对象 我们把请求数据的结果保存到这个对象中 然后利用v-model 让input和这个数据对象进行绑定 进行关联
