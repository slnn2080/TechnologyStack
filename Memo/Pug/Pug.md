### Pug模版
- npm i pug

- pug文件默认路径就是 views的文件夹里面 
-  app.set("views", "./views")


> app.use()
- 该项目文件夹里面的部分文件 变成静态的文件 提供给服务器 这样在客户端直接就可以访问到静态资源文件夹里面的文件
<!-- 
  我们可以 npm i bootstrap
  然后将 node_modules / bootstrap 设置为静态资源文件夹
  这样前端就能访问到这个文件夹中的文件

  app.use(express.static("/lib/bootstrap", "node_modules/bootstrap/dist"))


  前端可以通过 /lib/bootstrap 这个路径 访问到 node_modules/bootstrap/dist 这个路径里面的资源
 -->

<!-- 
  | - views
    - index.pug

  // 将模板引擎设置为 pug
  app.set("view engine", "pug")

  // 设置模板存放目录为 views文件夹
  app.set('views', path.join(__dirname, 'views'));
  app.set("views", "./views")

  // 设置服务器端的静态资源文件夹 让前端通过 /lib/bootstrap 路径访问到bootstrap
  app.use("/lib/bootstrap", express.static("node_modules/bootstrap/dist"))

  app.get("/", (req, res) => {
    res.render("index")
  })
 -->


> pug语法
- pug的语法是靠缩进 指定标签
<!-- 
  html
    head
      title Home

      // 这里通过 /lib/bootstrap 路径 引入服务器端的文件
      link(rel="stylesheet" href="/lib/bootstrap/css/bootstrap.min.css")
      script(src="/lib/bootstrap/js/bootstrap.js")

      style

  body
    div
      h3
 -->

- 标签属性 写在括号里面
<!-- 
  div(class="box")
 -->

- 标签内容 直接写在标签的后面
<!-- 
  h3 内容
 -->

> include
- 载入字符 css中的所有内容都会以字符的形式 加载到pug里面
- 在pug中加入自己的css文件 使用 include 关键字
<!-- 
  style
    include style.css

  scrip
    include script.js
 -->


> pug如何使用后台传递过来的数据
<!-- 
  const data = {
    name: "sam"
  }
  res.render("index", data)


  pug模板中使用 #{name}
 -->  


 > pug里面后台传递到前端的数据 我们还可以保存在js中的变量里面
 > script.
- 加上.后我们可以取到后台传递过来的name的值
 <!-- 
  script.
    const name = #{name}
  --> 