### React
- 官网:
- 英文官网: https://reactjs.org/
- 中文官网: https://react.docschina.org/


- 用于构建用户界面(视图)的js库
- 用户界面对于前端来说 就是HTML页面 或者专业一些就是构建web应用的
<!-- 
  比如我们要在页面上展示一些学生的信息 如果利用js的话 我们大概可能分为3步
  1. 发送请求获取数据
  2. 处理数据(过滤 整理格式)
  3. 操作DOM呈现页面

  之前我们都是通过js jQ来完成将数据展示到页面上, 现在React来帮我们呈现页面
  React是一个将数据渲染为HTML视图的开源的js库
 -->

- React的核心 你给我数据 我帮你渲染视图

- 如果从 MVC 的角度来看 React就是视图层的 V 也就是只负责视图的渲染 而并非提供完整的 M 和 C 的功能


> 为什么要学
- 1. 原生js操作dom繁琐, 效率低(DOM-API 操作 UI)
- 2. 使用js直接操作DOM 浏览器会进行大量的重绘重排
- 3. 原生js没有组件化编码方案, 代码复用率低
<!-- 
  例如:
  document.getElementById('app')
  document.querySelector('#app')

  上面的代码上体现的繁琐, 效率低: 因为我们每一次操作DOM浏览器都会重新排列和重新渲染等, 我们之前的模式都使用DOM的API去操作UI
-->


> 模块化:
- 一个大的js文件 按照功能去分成 一个个的小js文件 如果只知道模块化的话只会拆js文件


> 组件化:
- html / css / js 不仅仅js要拆 结构和样式同样要拆 不仅仅拆这3个 构成这个局部功能的图片啊 字体啊 就是页面展示的一个部分叫做一个组件 这个部分的实现是通过 图片 文字 css html js 共同实现的


> React的特点
- 1. 采用组件化模式, 声明式编码, 提高开发效率及组件复用率
<!-- 
  命令式: 
  1. 改变页面上一个盒子的样式 通过js或者jq拿到盒子 
  2. .style的方式修改样式, 
  3. 这就是命令式的编码 少做任何一步都达不到目的

  
  声明式:
  通过一定的语法, 我们只是表达一下 你应该是蓝色的, 
  react就帮助我们操作DOM 将盒子改成蓝色的

  我们只需要描述 ui（HTML）看起来是什么样子的 就跟写html页面一样 
  react负责渲染ui 并在数据变化的时候更新ui

  const jsx = (
    <div className="app">
      <h1>Hello, React!  动态变化数据: {count}</h1>
    </div>
  )
 -->


- 2. 在React Native中可以使用React语法进行移动端开发
<!-- 
  我们学完React之后 可以再学习一下React Native 
  这门技术是让前端人员通过js去编写ios和安卓应用的技术

  正常我们编写安卓得用JAVA 编写ios得用OC / swift
  这样的话我们只要懂react就能做手机应用的开发

  同时我们还可以使用 react360 来开发VR技术
 -->


- 3. 使用虚拟DOM + 优秀的Diffing算法 尽量减少和真实DOM的交互
<!-- 
  之前我们使用js jQ都是操作的真实的DOM

  虚拟DOM是React操作的DOM 虚拟DOM没有放在页面上而是代码运行的时候放在了内存里
 -->


> 我们看看 Js和React 操作数据的区别
- 原生js实现 将数据渲染到页面上
- 这里我们使用了js操作了DOM元素, 向里面添加内容
 
- 要点:
- 当我们要往页面上追加元素的时候
- 我们可以选择 innerHTML 和 appendChild 方法

- 两种方法的区别是
- *innerHTML* 我们往里面*添加*的应该*是字符串*
- *appendChild* 我们往里*添加*的是*元素节点*

```html
<ul id="list"></ul>

<script>
  let personArr = [
      {id: '001', name:'鹿晗', age:19},
      {id: '002', name:'李现', age:18}
  ]

  // 创建节点
  let htmlStr = ''
  personArr.forEach((person) => {
      htmlStr =+ `<li>${person.name} - ${person.age}</li>`
  })

  // 这里因为 htmlStr 是字符串 所以我们不能使用 ul.appendChild方法
  document.getElementById('list').innerHTML = htmlStr
</script>
```

- 上面是只有两个人, 假如请求回来的数据是多个多了个李翔, 那是不是还要继续遍历 拼接然后插入到页面上, 

- 但是是把原有的页面上的结构用新结构覆盖了吧 鹿晗 李现都被替换掉了 因为是innerHTML 没有一个复用的动作 所以效率很低

- 比如原来有100个 现在请求回来的数据多了一个 101 可页面上100个人都没有复用上


> React高效的原因
- 1. 使用虚拟(virtual)DOM, 不总是直接操作页面真实DOM。
- 2. DOM Diffing算法, 最小化页面重绘。

<!-- 
  还是 李现 和 鹿晗两个人的数据, 
  react在拿到数据后并没有马上动真是的DOM, 

  它是把这两个人的数据对应成了2个虚拟DOM 随后将虚拟DOM映射到真实DOM上

  当多了一个数据肖战的时候, react还是根据3条数据生成3条虚拟DOM, 

  刚才的两条李现和鹿晗的虚拟DOM并没有被React丢弃 
  原来是2条虚拟DOM 现在是3条虚拟DOM 

  随后, React开始在内部进行虚拟DOM的比较, 
  如果相同的话 就不在生成真实的DOM, 将不同的映射到真实的DOM中, 

  相同的 被复用 
  不同的 虚拟DOM进行比较 不同部分再插入真实的DOM中
-->

----------------------------

### react的两个版本 与 js文件夹中的文件解析
- 旧版本: 16.8
- 新版本

```js 
  // jsx => js  or  ES6 => ES5  or  模块化
  babel.min.js           
  
  // props验证
  prop-types.js

  // react 核心库
  react.development.js       
  
  // react 扩展库 (react帮我们操作DOM)
  react-dom.development.js    
```

----------------------------

### React的基本使用
> js文件在文件中的引入顺序
- 1. 引入 react 核心库
- react.development.js

- 2. 引入 react-dom 用于支持react操作DOM
- react-dom.development.js

- 3. 用于将jsx转为js
- babel.min.js


> 2. 使用React的注意事项
- 1. js文件的引入顺序

- 2. <script type='text/babel'>  要写type='text/babel'
<!-- 
  意思是<script>中是jsx但是需要babel给我翻译 不写type默认就是js
 -->

- 3. 创建虚拟DOM的时候不加''
```js 
  // 这里不加引号
  const VDOM = <h1>hello, Reacta</h1>    

  // 如果加了页面上就会是 不会将其解析成标签
  "<h1>hello, Reacta</h1>" 
```


> React的基本使用
- 1. 创建<div>容器
- 2. 创建虚拟DOM
<!-- 
  就是声明变量, 给变量赋值(值为DOM结构)
 -->

- 3. 使用ReactDOM.render()方法将虚拟DOM渲染到页面上


> React 和 ReactDOM
- 我们在引入react核心库 和 扩展库的时候 全局就会多了 React 和 ReactDOM 两个全局对象


> ReactDOM.render(虚拟DOM, 容器) - 挂载
- 将虚拟DOM节点挂载到页面上

- 此操作是替换 并不是追加
- render() 会调用1+n次
<!-- 
  render() 
  初始化调用一次 每次页面更新的时候也会调用一次

  ReactDOM.render(VDOM, document.getElementById('app'))
 -->


> ReactDOM.unmountComponentAtNode(容器) - 卸载
- 卸载组件
```js 
  ReactDOM.unmountComponentAtNode(document.getElementById('app'))
```


- 代码示例：
```js
  <div id="app"> </div>

  // 引入react的核心库等结构
  <script src='../js/react.development.js'></script>
  <script src="../js/react-dom.development.js"></script>
  <script src="../js/babel.min.js"></script>

  // 这里要改写成 type='text/babel'
  <script type='text/babel'>

    const VDOM = <h1>hello, Reacta</h1>

    ReactDOM.render(VDOM, document.getElementById('app'))

  </script>
```


> React基本使用方式2
- 通过npm的形式下载 react react-dom等文件
- 然后从 node_modules 文件夹中 引入js文件

- 1. 使用 node 初始化一个文件夹
- npm init -y
- npm i react react-dom
<!-- 
  这是两个包 react包是核心， 提供创建元素 组件等功能 

  react-dom包 提供dom相关功能
  也就是说react用来创建元素 而 react-dom用来将元素放入到页面中
-->


- 2. 在项目文件夹中 创建html文件 
- 在html文件中从 node_modules 文件夹中引入 react 和 react-dom的js文件
```html 
  <div id="app"> </div>
  <script src="./node_modules/react/umd/react.development.js"></script>
  <script src="./node_modules/react-dom/umd/react-dom.development.js"></script>

  <script>
    const title = React.createElement("h1", null, "Hello React")

    ReactDOM.render(title, document.getElementById("root"))
  </script>
```

----------------------------

### 虚拟DOM的两种创建方式
- 使用jsx创建虚拟DOM节点的时候 DOM结构部分还是用()包裹起来, 用来调整结构
```js 
  const VDOM = (
    <h1>
      <span> ... </span>
    </h1>
  )
```

> 方式1:
> React.createElement('标签名', {标签属性kv可以是空}, '标签内容')
- 创建虚拟DOM
```js 
  const VDOM = React.createElement('h1', {id:'title'}, 'hello, React-js')
```


> 为什么不用原生的js 而是要使用jsx
- 我们看看下面的例子 看看两种方式创建虚拟dom有什么不同

- 1. 使用jsx创建虚拟DOM <h1 id='title'>hello, React</h1>
```js 
  // 使用jsx创建一层结构的DOM
  const VDOM = <h1 id='title'>hello, React</h1>

  // 使用jsx创建二层结构的DOM
  const VDOM = (
    <h1 id='title'>
      <span> hello, React </span>
    </h1>
  )

  ReactDOM.render(VDOM, $('app'));


  function $(id) {
    return document.getElementById(id)
  }
```

- 2. 使用原生js创建虚拟DOM
```js 
  // 使用原生js创建一层结构的DOM
  const VDOM = React.createElement('h1', {id:'title'}, 'hello, React-js')

  // 使用原生js创建二层结构的DOM
  const VDOM = React.createElement('h1', {id:'title'}, React.createElement('span', {}, 'hello, React-js'))

  ReactDOM.render(VDOM, $('app'));
```

- 从代码量上就能够看出 使用原生js创建虚拟DOM 和 jsx创建虚拟DOM的区别是什么了

- 因为原生js创建虚拟DOM实在太繁琐了 有了jsx可以让编码人员更加简单的创建虚拟DOM


**注意:**
- 我们使用babel翻译jsx其实就是将
```js
  const VDOM = 
    <h1 id='title'>hello, React</h1>

  // 编译为

  const VDOM = 
    React.createElement('h1', {id:'title'}, 'hello, React-js')
```

- 浏览器最终运行的就是这些代码


> 总结:
- jsx创建虚拟DOM的方式就是原生js创建虚拟DOM的语法糖

----------------------------

### 虚拟DOM 和 真实DOM
- 1. 本质是Object类型的对象(一般对象)
- 2. 虚拟DOM身上的属性比较少(轻), 真实DOM身上的属性比较多(重) 
<!-- 
  因为虚拟DOM是react内部在用, 
  无需真实DOM上那么多的属性 
-->

- 3. 虚拟DOM最终会被React转化为真实DOM, 从内存中呈现在页面上
```html 
<div id="app"></div>
<div id="demo"></div>

<script type='text/babel'>

  // 虚拟DOM
  const VDOM = (
    <h1>
      <span>hello, react</span>
    </h1>
  )
  

  // 真实DOM
  const TDOM = $('demo')

  console.log(VDOM)
    // 结果
    // 好多属性了 可以debugger查看一下

  console.log(TDOM)
    // 结果
    // {$$typeof: Symbol(react.element), type: "h1", key: null, ref: null, props: {…}, …}
</script>
```

----------------------------

### jsx
- 全称 Javascript XML 是react定义的一种类似于 XML 的js扩展语法 js + xml

- 本质是 React.createElement(component, props, ...children)方法的*语法糖*

> XML的简单用法 -- 扩展
- XML 早期用于存储和传输数据
- 比如 我们存个学生, 我们就可以创建下面的样式, 用于传输

```xml
  <student>
    <name>TOM</name>
    <age>19</age>
  </student>
```

- 后来我们就不使用xml去存信息了 使用JSON 因为我们真正存储的数据就是 TOM 和 19 但是结构比要存储的内容都要多

- JSON
  "{"name":"TOM", "age":19}"

- 这样存储起来不是方便了很多么? 
- 但也不是说xml就完全不用了 微信公总号和开发者公众号打交道 还是使用的XML


> JSX的语法规则
- 1. 定义虚拟DOM时, 不要写引号 结构使用小括号包裹
- 2. 当我们要写js表达式的时候 使用{ }
<!-- 
  这里要注意表达式和语句的区别,
  { }里面放的是js表达式 并不是语句
-->

- 3. *样式的类名指定*不要用class 而是要*用className*
- react元素的属性名使用驼峰命名法
<!-- 
  // 有一些特殊的属性名是特殊的写法
  label标签的for属性 -- 需要替换成 -- htmlFor
 -->

- 4. 内联样式要用
    style={{key:value}}

- 的形式去写, 属性名使用驼峰

<!-- 
  添加内联样式的时候 一层{ } 是写表达式
  再一层{{ }}是style要求的对象形式
 -->

- 属性名： 驼峰， 
- 属性值： "字符串"
```js 
  <h3 
    className="title" 
    style={{border: "1px solid #212121"}}>React</h3>
```

- 5. jsx中的标签*一定要闭合* <input />  或者 <input></input>

- 6. jsx中*只能有一个根标签*, 当要创建多个标签的时候 我们外层要用一个<div>进行包裹

- 7. 标签首字母
- jsx中标签首字母小写开头 
- 则将该标签转为html中同名元素 若html中无同名元素就报错

- jsx中标签首字母大写开头
- react就会去渲染对应的组件, 若组件没有定义 则报错


- 需求1 
- 将 你好呀 和 id 是通过变量的形式在读取 而不是写死

- 需求2 
- 给h1应用样式 active

- 需求3 
- 使用内联样式给span添加样式, 文字白色 背景黑色

- 需求4 
- 在<h1>的下方添加<input>

- 需求5： 
- 根据变量渲染结构

```js 
  // 标准:
  const VDOM = (
    <h1 id='demo'>
      <span>你好呀</span>
    </h1>
  )

  // 解答1: 虚拟DOM中想使用js表达式 要是 { }
  const myData = 'abcdefg'
  const myId = 'test'

  const VDOM = (
    <h1 id={myId}>
      <span>{myData}</span>
    </h1>
  )


  // 解答2: 虚拟DOM中想给标签添加class 使用className
  const VDOM = (
    <h1 className='active' id={myId}>
      <span>{myData}</span>
    </h1>
  )


  // 解答3: 在虚拟DOM中使用内联样式 要用{{K:V}} 属性名驼峰  
  const VDOM = (
    <h1 className='active' id={myId}>
      <span style={{color:'pink', backgroundColor: 'black'}}>{myData}</span>
    </h1>
  )


  // 解答4: JSX中只能有一个根元素 使用<div>把多个结构包裹起来
  const VDOM = (
    <div>
      <h1 className='active' id={myId}>
        <span style={{color:'pink', backgroundColor: 'black'}}>{myData}</span>
      </h1>
      <input type='text' />
    </div>
  )


  // 解答5: 这里利用了3元表达式 前后结构使用()进行包裹
  render() {
    return (
      this.flag ? (
        <div 
          style={{width: "20px", height: "20px", background: "red"}}
        >
          <h3>我是App组件</h3>
        </div>
      ) : (
        <div>
          <h3>我是默认的</h3>
        </div>
      )
    )
  }
```

> 技巧：
- 当我们想渲染两个不同的结构的时候 我们可以使用三元表达式的形式的方式

    条件 ? (结构1) : (结构2)


> jsx语法的转化过程
- jsx仅仅是 createElement 方法的语法糖
- jsx语法被 babel插件便以为 createElement方法 最后会再次的被转化为react元素

- jsx - createElement - react元素

```js 
  const el = (
    <h1 className="test"> hello </h1>
  )

  ↓

  const el = React.createelement(
    "h1",
    {className: "test"},
    "hello"
  )
  
  ↓

  const el = {
    type: "h1",
    props: {
      className: "test",
      children: "hello"
    }
  }
```

----------------------------

### React的小练习
- 动态创建一个框体, 里面显示标题和ul列表

- 动态标题:
```js 
  // 标题
  let title = '前端js框架列表'

  // 数据
  let list = ['Angula', 'React', 'Vue']
```

> 具体步骤
- 1. 创建虚拟DOM
```js 
  const VDON = (
    // 在jsx中对虚拟DOM加样式, 需要使用className
    <div className='box'>

      // 在jsx中使用变量或者表达式需要使用{ }
      <h3>{title}</h3>
      <ul>
        {
          // 这里只能写表达式, 而不能写语句 我们在这里对list数组中的值进行加工 我们选择使用map方法
          list.map((item, index) => {
            return <li key={index}>{item}</li>
          })
        }
      </ul>
    </div>
  )
```
 

> 总结:
> 1. 在jsx中想使用变量都需要使用{ }括起来
 
  { 这里只能是表达式 不能是语句 }

- 一定注意区别 [js语句(代码)] 与 [js表达式]

- 1. 表达式: 
- 一个表达式会产生一个值 可以放在任何一个需要值的地方

- 下面这些都是表达式
  1. a  
      我们可以理解为a是一个变量名 我们在取变量a的值

  2. a+b
  3. demo(1)   
      函数调用表达式

  4. arr.map()
  5. function test() {}
      这个函数也有返回值 返回值是函数本身

- 总结 在上面这些值的左边 定义一个const x = 能接到值的就是表达式


- 2. 语句(代码)
- 下面这些都是语句(代码)
  1. if() { }
  2. for() { }
  3. switch() { }



> 2. 在对节点或者数据进行遍历的时候我们要在DOM结构中*使用KEY确保唯一值*
```js 
  list.map((item, index) => {
    return <li key={index}>{item}</li>
  })
```

- 3. react会自动帮我们遍历数组, 但是不能遍历对象
```js 
  let list = ['Angula', 'React', 'Vue']

  <ul>
    // 结果: AngulaReactVue
    {list}      
  </ul>
```

----------------------------

### jsx的条件渲染

> 场景
- 我们请求数据的时候 会有一段的时间 在这段时间里为了正在用户体验我们可以定义加载动画效果 当请求数据回来后 结束loading动画 展示数据

> 技巧:
- 我们都会在render函数中渲染结构 当结构比较复杂的时候
- 我们也可以定义方法将结构封装到方法里面 然后在render中调用

> 方式
- 条件 ? (结构1) : (结构2)
```js 
  const loadingData = () => {
    if(isLoading) {
      return (<div>数据加载中, 请稍后...</div>)
    }

    // 一旦符合上面的条件 因为有return 下面的就不会执行了
    return (
      <div>
        数据加载完成后, 此处显示加载后的数据
      </div>
    )
  }

  const VDOM = (
    <div>
      // 我们在render()函数中 可以调用方法
      { this.loadingData() }
    </div>
  )

  // ---- 方式2

  const loadingData = () => {
    return loading 
      ? (<div>数据加载中, 请稍后...</div>) 
      : (<div>数据加载完成后, 此处显示加载后的数据</div>)
  }


  export default class App extends Component {
  
    isLoading = false
    list = ['Angula', 'React', 'Vue']

    loadingData = () => {
      if(this.isLoading) {
        return (
          // 这里只渲染的li
          this.list.map((item,index) => {
            return (
              <li key={index}>{item}</li>
            )
          })
        )
      } else {
        return (<div>数据正在加载中...</div>)
      }
    }

    render() {
      return (
        <ul>
          {
            this.loadingData()
          }
        </ul>
      )
    }
  }

  // ---- 方式3 下面的方式适合 要么展示要么隐藏的情况

  return isLoading && (<div>数据加载中, 请稍后...</div>)
  
  // 它只能达到一种效果 当isLoading为true的时候展示数据加载中 但是没有办法在isLoading为false的时候展示另一种样式
```

> 总结:
- 在类的方法中 和 render 中要是想使用变量或者方法的话 *都要通过this*

----------------------------

### jsx的列表渲染
- 如果我们要渲染一组数据 应该使用数组的map()方法
- 遍历谁把key加给谁
```js 
  <ul>
    {
      songs.map((item, index) => {
        return <li key={index}>{item.name}</li>
      })
    }
  </ul>
```

----------------------------

### 模块与组件, 模块化与组件化的理解
- 组件是react的一等公民 使用react就是在用组件
- 组件标识页面中的部分功能 组合多个组件实现完整的页面功能

> 特点
- 可复用 独立 可组合 跟拼乐高似的

- 1. 模块
- 理解: 向外提供特定功能的js程序, 一般就是一个js文件
<!-- 
  为什么要拆成模块, 随着业务逻辑的增加, 代码越来越多且复杂, 复用js 简化js的编写, 提供js的运行效率
 -->

- 2. 组件
- 理解: 用来实现局部功能效果的代码和资源的集合(html css js image等)
<!-- 
  一个页面的功能更复杂 复用编码 简化项目编码 提高运行效率
 -->

- 3. 模块化
- 当应用的js都以模块来编写, 这个应用就是一个模块化的应用

- 4. 组件化
- 当应用是以多组件的方式实现, 这个应用就是一个组件化的应用

----------------------------

### 组件的创建
- 一个组件里应该包括 结构, 样式, 交互, 资源(html css js img...)
- 我们下面介绍两种组件的创建方式

### 函数式组件
> 约定1：
- 使用函数的方式(函数名首字母大写)创建组件 函数名就是组件标签名
<!-- 
  函数会被React调用 所以函数内部必须使用return 将虚拟DOM暴露出去 
-->

> 约定2：
- 函数组件必须有返回值 表示该组件的结构

> 约定3：
- 如果我们返回的是null 表示不渲染任何内容


- 1. 创建函数组件
- 2. 使用ReactDOM.render渲染到页面上

```js
  // 创建函数组件
  function Demo() {
    return (
      <h2>
        我是用函数定义的组件(适用于简单的组件的定义)
      </h2>
    )

    // 或者

    return null
  }

  // 将组件渲染到页面
  ReactDOM.render(<Demo />, app)


  // ---- 箭头函数的形式

  // 返回一个结构 + 函数名大写 就是函数式组件
  const Hello = () => <h2>我是用函数定义的组件</h2>
```


> 函数组件中的this
- 正常我们直接在Demo函数中打印 this 应该是window 
- 但是输入结果却是undefined
```js
function Demo() {
  console.log("Demo", this) // undefined

  return (
    <div>
      <h3>Demo组件</h3>
    </div>
  )
}
```
- 原因:
- 因为 我们的代码要经过 babel 的翻译
(type="text/babel") 

- babel在翻译完下面的东西后会开启严格模式 *严格模式中禁止 自定义的函数中的this 指向window 所以undefined*


> 执行了 ReactDOM.render(<Demo />, app)之后发生了什么?
- 1. react会解析组件标签, 找到Demo组件
- 2. 发现组件是使用函数定义的, 随后调用该函数 将返回的虚拟DOM转为真实DOM 随后呈现在页面上


> 注意:
- 1. 函数名首字母必须大写
- 2. 函数名必须使用标签形式
- 3. react中组件必须闭合
<!-- 
  function Demo() {  }

  <Demo />
 -->

----------------------------

### 类式组件
- 顾名思义 通过创建类的方式创建一个组件
- 使用类创建一个组件必须

- 1. 使用 extends继承 React.Component
- 类组件应该继承 React.Component 父类 从而可以使用父类中提供的方法或属性

- 2. *内部必须写render* 且有返回值 同时类名也要以大写字母开头

**注意:**
- react要求 我们在使用类式组件的时候,  我们*创建的类必须继承*react的内置类 *React.Component*

```js
  class Demo extends React.Component {
      
    // 这个render 是用在Demo的原型对象上 供实例使用
    render() {

      // render中的this 是组件实例对象(new Demo出来的实例)
      console.log(this)

      return (
        <h3>我是类创建的组件</h3>
      )
    }
  }
```

- *类组件中*的render中的*this为 组件实例对象*


> 类组件的 ReactDOM.render(<Demo />, app) 做了什么
- 1. react解析组件标签, 找到了Demo组件
- 2. 发现组件是使用类定义的 随后new出来该类的实例(Demo类), 并通过该实例调用到原型上的render方法
- 3. 将render返回的虚拟DOM转为真实DOM 随后呈现在页面中

------

> 复习 类 的相关知识

- 1. 类中的*构造器*不是必须写的 要*对实例进行一些初始化的操作*的时候才写

- 2. 如果a类继承了b类, 且a类中写了构造器, 那么a类构造器中的super是必须要调用的

- 3. 类中的定义的方法 都是在原型对象上
```js 
  // 创建一个Person类
  class Person {

    // 初始化类的属性
    constructor(name, age) {

      // 将属性放到实例的自身使用this 构造器的this是 类的实例对象
      this.name = name
      this.age = age
    }

    // 一般方法
    speak() {
      console.log(`我叫${this.name}, 我的年龄是${this.age}`)

      // 这里的this也是指向 实例对象
    }

  }

  // 创建一个Person的实例对象
  const p1 = new Person('sam', 18)

  console.log(p1)
    // 结果 Person {}, {}代表是实例对象 前面的Person代码是通过谁new出来的

  p1.speak()
    // 结果 我叫sam 我的年龄是18
```

- speak是一般方法 但是在控制台打印p1的时候并没有看到speak方法

- 那speak方法放在了哪里? 在Person类的原型对象上, 放在原型对象上的方法是给实例用的



- 继承
```js
  // 创建一个Student类 继承于Person类
  class Student extends Person {

  }
    // 上面只要写上 extends 就继承了 Person 中的属性和方法

  const s1 = new Student('小张', 15)
  console.log(s1)
    // 正常输出


  // 当Student有自己的属性的时候, 就可以在student类中添加constructor
  class Student extends Person {

    // 扩展学生自己的属性 且实例是小张 15 高一的顺序传递的 这边也要按照这个顺序接
    constructor(name, age, grade) {

      // 注意:
      - 当我们定义了子类 且使用了extends继承了父类
      - 那么子类中的constructor里必须使用super() 
      - 不然就会报错,super帮你调用父类中的构造器
      - super必须在最前面调用

      super(name, age)
        - 把创建学生实例时传递的实参 name age 通过super(name, age)递到Person类里面去 

      this.grade = grade
    }
  }
  const s1 = new Student('小张', 15, '高一')
```

----------------------------

### 简单组件 复杂组件
- 如果我们的组件是 有状态(state)的 就是 复杂组件 
- 如果我们的组件是 没有状态的 就是简单组件(简单组件适合使用函数的方式创建)


> 组件实例的三大核心属性1 : State(存放数据)
- 状态 state

- 状态是组件实例对象身上的(不是组件类本身上的, 而是组件缔造的实例对象身上的)
```js
export default class App extends Component {
  // 我们通过这样的方式定义state会在组件实例身上 
  state = {
    name: "app"
  }
}
```

- *state是组件实例对象最重要的属性*, 值是对象(可以包含多个kv组合)

- 组件被称为状态机, 通过更新组件的state来更新对应的页面显示(重新渲染组件)
<!-- 
  生活中的状态机是红绿灯
 -->

 > 组件的状态驱动页面
- 之前我们说过学了react就把数据交给react 
- 它会拿着数据 生成虚拟DOM 进而生成真实DOM
            
    数据 -- 虚拟DOM -- 真实DOM


- 上面的数据不能随便的放 我们需要把数据放在指定位置(把数据放在 *状态* 里)

- *组件的状态里面存放着数据 数据的改变就会驱动页面的展示*

- 状态就是数据 是组件内部私有数据 只能在组件内部使用

- state的值是一个对象 表示一个组件中可以有多个数据 放在同一对象中统一管理


> 为什么 函数组件 适合简单组件
- 上面说了 简单组件和复杂组件的区别是有没有状态, 状态只能在实例对象中, 谈到实例对象只有class的方式才能创建实例对象, 所以拥有state的只能是复杂组件类型(class)
<!-- 
  新版的函数组件可以通过hooks来使用 组件实例的三大核心属性
 -->

> state
> 定义格式: state = {} 
- 作用:
- 组件内部定义状态

- state的值并不一定要求是对象 而是因为会存放很多的数据 所以推荐是对象


> this.setState({ ... }) 修改状态的方法
- react中修改状态的指定方法


> 总结:
- 1. 组件中render方法中的this为组件实例对象

- 2. 组件自定义的方法this为undefined 如何解决?

  - 解决方案:
  - 1. 在构造器中强制绑定this 通过函数对象的bind()
  - 2. 在构造器外使用赋值语句 + 箭头函数
  <!-- 
    handleClick = () => { }
    相当于给实例身上添加放法 需要通过 this 来调用
   -->

- 3. 状态数据 *不能直接修改或更新*
  - 必须借助 setState 方法


> setState方法
- 状态是可以改变的 但是要通过 setState 来修改状态中的值

> 格式:
- this.setState({要修改的数据})

- 要点:
- 先对state中的数据进行操作的时候 要先获取原数据
```js
  // 获取原来的值后(this.state.count原来的值) + 1
  this.setState({ count: this.state.count + 1})
```

> 思考:
- 那如果 state 中有两条数据 我修改的时候需要将两条数据都放进 setState 里面么？

- 不需要react内部会进行处理 它只会修改你放进来的数据 *没有放进来的不会对其进行处理*
```js
  state = { name: "sam", age: 18 }

  // 在我只想修改name的时候 用把age放进来么？  -- 不用
  this.setState({ name: "erin", age: ?? })
```

- 示例:
```js
state = {
  name: "sam",
  age: 18
}

// 定义方法 修改state中的数据
handleClick = () => {
  // 先获取state中原有的数据 修改后赋值回到state中
  let {name} = this.state
  name = "erin"

  // 我们发现我们只赋值回了name 页面上age还是有的 也就是说这里不是替换的操作
  this.setState({
    name
  })
}

render() {
  let {name, age} = this.state
  return (
    <div className="app-wrap">
      <div>
        <h3>{name} - {age}</h3>
      </div>
      <button onClick={this.handleClick}>click</button>
    </div>
  )
}
```

> setState的作用：
- 1. 修改 state 
- 2. 更新界面 当状态中的数据改变的时候 react会更新界面


> react的编程思想：
- 数据驱动视图，数据先发生改变 驱动着页面发生更新

- 也就是说 *假如有一些数据 我们不希望它是响应式的时候 就可以添加到 实例身上*
```js 
  export default class App extends Component {

    // 直接赋值的形式就是添加到组件实例的身上 通过this可以调用
    flag = true 
  }
```

- *假如我们希望这个数据是响应式的* 那么我们就需要将这个数据放入到 state 中

```js 
  export default class App extends Component {
    state = {
      flag: true
    }
  }

  // 在修改state中的数据的时候 我们可能会有如下的操作
  let {flag} = this.state
  this.setState({
    // 这个flag也是个变量 所以在之前我们要先有这个变量
    flag: !flag
  })
```


> 组件更新机制
- setState的两个作用
- 1. 修改state
- 2. 更新组件

- 过程：
- 父组件重新渲染的时候 也会重新渲染子组件 *但只会渲染当前组件子树*
<!-- 
  当前组件及其所有子组件, 这个分叉上所有相关的子组件
 -->

- 也就是说当我们更新一个组件的时候 它所包含的所有子组件也会更新 后代组件也会更新

----------------------------

### 事件处理
> 需求 点击框体改变文字 
- <h3>今天天气很炎热</h3> 
- 上面中的炎热会发生改变   炎热 --- 凉爽

> 思路:
- 既然是两种情况 那我们可以定义一个标识 isHot
  当 isHot = true  炎热
  当 isHot = false 凉爽 

- 我们将 isHot 放在 state 里面, 而state存放在组件的实例对象中, 

- 我们要将isHot放在组件的实例对象的state里面, 需要在类本身的constructor里面操作, 因为构造器的属性会反应的实例对象上

```js
  class Weather extends React.Component {

    /*
      这里有一个问题, 构造器的参数写什么? 
      正常来说构造器的形参能接收到什么取决于在通过new创建实例对象的时候传递了什么样的实参, 

      但是这里是react帮助我们创建的new的实例 我们先传props 为什么后面会学到
    */
    constructor(props) {
      // 我们是子类 使用构造器的话 必须要带super
      super(props)

      // 初始化状态: state中需要存放很多值, 所以官方推荐使用{ }的形式
      this.state = {
        isHot: true
      }
    }

    render() {
      return (
        // 读取状态: state存放在组件的实例对象上, 而this指向实例对象, 所以我们可以通过this拿到state取出里面的isHot 来进行判断
         <h3>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h3>
      )
    }
  }
```

- 部分一的完整代码
```js 
  class Weather extends React.Component {
    
    constructor(props) {
      super(props)

      this.state = {
        isHot: true
      }
    }

    render() {
      return (
        <h3>今天天气很{this.state.isHot ? '炎热' : '凉爽'}</h3>

        // 解构赋值
        const {isHot} = this.state
        <h3>今天天气很{isHot ? '炎热' : '凉爽'}</h3>
      )
    }
  }

  ReactDOM.render(<Weather />, document.querySelector('#app'))
```

- 接下来我们想下怎么给标题添加点击事件, 然后我们对state中的isHot进行取反


> react中的事件绑定
- react事件绑定语法与DOM事件语法相似

- 语法：
- on + 事件名(驼峰) = {this.事件处理函数}
- 我们推荐直接在标签内部绑定事件

```html
<button 
onClick={this.handleClick}>click</button>
```


> 注意要点
- 1. *事件名必须是驼峰写法*(因为react内部对事件名进行了格式上的*重写*)

- 2. 回调的事件写在类中

- 3. 事件回调必须加上{ } 而且回调的事件名前面要加上this, 并且事件回调不要加小括号
 
  <h3 onClick={this.changeWeather}>

- 为什么要加 { } ?
- onClick后面必须是一个函数, 因为我们写的不是原生, 想要提取变量要使用{ }


- 为什么不能加()
  <h3 onClick={this.changeWeather()}>

- 上面的写法会直接被调用 
- React在渲染组件的时候, 发现我们是通过类的方式创建的组件, 所以React帮我们new了实例 

- 调用了render 想拿到返回值就要执行<h3 onClick={this.changeWeather()}> 里面的代码 onClick 接到的是 changeWeather的返回值

- onClick = changeWeather() 
- 终归是一个赋值语句 我们把事件回调的返回值赋值给了onClick 因为事件回调里面没有return 所以是undefined, 

- 结果是第一次调用了但是之后就没有作用了, 不报错的原因是react内部做了处理

- 而我们把()删掉就是 onClick = changeWeather 还是一个赋值语句 我们把这个函数作为onClick的回调


- 为什么要加上this?
    <h3 onClick={changeWeather}>

- 假如我们不加this会报changeWeather未定义的错误, 
- 因为我们将这个方法放入了类中, changeWeather只有通过Weather的实例对象才能调用 

- 所以我们要在函数的前面加上this = > this.changeWeather


- 4. 函数组件中绑定事件的方式
- 不用加this
```js 
  // 因为在一个组件内部所以 变量可以直接使用吧
  return (<button onClick={handleClick}>)
```  


> <h3 onClick={this.changeWeather}> 类中定义的函数产生的this的问题

- 我们定义函数有多种方式 比如
- changeWeather() { ... }
- changeWeather = () => { ... }

- 两种定义函数的方式有什么样的区别么？ this！！！
```js
changeWeather() {
  
  console.log(this)
    // 这里的this是undefined

    - 因为只有通过Weather实例对象调用的changeWeather 
    
    - react在解析组件的时候 会自己帮助我们new实例 也就是说react帮我们利用实例调用的 changeWeather 方法

    - 它内部的this才是实例对象否则就是undefined

    // render和constructor中的this都是实例对象为什么? 
    - 我们的changeWeather不是通过实例调用的

    // <h3 onClick={this.changeWeather}> 
    - 我们是通过this.changeWeather把方法交给了onClick 然而 点击的时候 是onClick直接调用changeWeather方法 而不是通过实例调用的 
    所以this的指向会是undefined(因为类中开启了严格模式)

    console.log(this.state)  
    // 报错 不能从undefined上读取state
}
```

> 解决方式
- 我们是想给h3绑定事件, 从而控制isHot变量的值, 目的是驱动更新页面上的数据

- 但是我们上面解决了给h3如何绑定事件, 同时在绑定事件的过程中需要注意什么

- 但是也出现了一个问题, 就是我们在类中定义的方法中, 不能通过 this.state 获取到存放在state中的值, 显示是this是undefined
```js 
  changeWeather() {
    console.log(this.state)  // undefined
  }
```
- this出现了问题, 原因上面我们分析了 是因为我们是将这个函数赋值给了onClick 
- 当点击的时候 changeWeather函数属于直接调用, 那么函数中的this就是undefined



> 解决方式1
- 我们在constructor中给changeWeather绑定this
```js
constructor(props) {

  super(props)
  this.state = {isHot:true}

  this.changeWeather = this.changeWeather.bind(this)

    // 解析:
    1. 记住类中的方法都是添加在类的原型对象上
    2. bind能做两件事情1给你生成一个新的函数 2帮助我们修改函数中的this 我们将构造器中this传递进去了, 构造器中的this就是实例对象

    - 也就是说等号的右侧是一个this是实例对象的新的函数 然后我们把这个函数放到了实例的自身 然后给函数还起了一个名字是changeWeather 

    这样我们实例对象自身就多了一个方法(不是再在类的原型对象上找changeWeather方法了 而是自身就有一个changeWeather方法)
}
```


> 事件对象
- 通过事件回调的参数获取到事件对象
- 这个事件对象叫做 合成事件对象

- 合成事件 兼容所有浏览器 无需担心跨浏览器兼容性的问题
<!-- 
  handleClick = (e) => { e.preventDefault() }
 -->


> setState({})方法
- 通过react指定的API修改 或者理解成更新 state中的状态 *并不是覆盖的操作*

- 比如我们state中有3个属性 我们一个方法中只写了一个属性的变化 它只会更新那个我们制定的

```js 
  state = {name:sam, age:18}   
  
  - 方法中 this.setState({age:19})
  - 注意 不是覆盖 是更新 只将age的属性更新为新的了
```
 
- 严重注意: 
- 状态(state)不可直接更改
- 修改state中的值, 要通过setState()api去更改, 
- setState在React.Component的原型对象上, 
- 此操作是一个合并的操作 并不是覆盖(同名的复写, 不同名的留住)

```js
  changeWeather() {
    const isHot = this.state.isHot

    // 通过setState API才修改 状态
    this.setState({
      isHot:!isHot
    })
  }
```


**原生事件绑定的方式**
- 1. addEventListener
- 2. onclick
- 3. <button id="btn1" onclick="demo()">

- react推荐直接在标签里面写事件

- 因为前2种直接在用documen.的方式操作DOM 不太合适 我们是用的是react


**类中方法this的指向**
- 如果Person类中的方式是通过实例来调用的 类中的所有this指向的是实例

- 如果是直接调用的 类中的所有this指向的是undefined

```js 
  class Person {
    constructor(name, age) {
      this.name = name
      this.age = age
    }

    speak() {
      console.log(this)
    }
  }

  const p1 = new Person('sam', 18)

  p1.speak()    // this是实例对象 通过实例调用speak方法

  const x = p1.speak
  x()           // this是undefined
```

- 为什么this的指向不一样?
- speak是放在Person原型对象上 给实例对象用 实例p1自身没有speak 调用的时候不会报错会顺着原型链找过去
 
- 而 const x = p1.speak 是赋值语句 注意这里并没有调用 我把p1身上speak属性交给x
- p1身上没有speak 没关系顺着原型链找到了speak

  
  p1.speak()属于实例调用
  而
  x()属于直接调用 

- 既然是直接调用this也应该是window 为什么是undefined呢? 
- 因为类中的方法都开启了 严格模式 所以类中的方法中的this指向了undefined


- 也就是说
  speak() {} 
- 这种方式定义的方法是在原型对象身上 并不是在实例自身身上

  speak = () => {}
- 这种方式定义的方法是在组件实例自身的身上


> 总结:
- 在严格模式中, 禁止自定义的函数中的this指向window
- 1. 在构造器中初始化状态
- 2. 在构造器中解决方法中的this的指向问题
    this.method = this.method.bind(this)
    将构造器中的this给前面的方法生成一个新的函数

- 3. render中做的最常见的事就是从状态里面读东西 然后去做展示
- 4. 在changeWeather方法中 获取原来的值 在setState中做展示


> 完整代码
```js 
  class Weather extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        isHot: true
      }
      this.changeWeather = this.changeWeather.bind(this)
    }

    render() {
      let {isHot} = this.state
      return (
        <p onClick={this.changeWeather}>今天天气: 很 '{isHot ? '炎热' : '凉爽'}'</p>
      )
    }

    changeWeather() {
      const isHot = this.state.isHot
      this.setState({
        isHot:!isHot
      })
    }
  }

  ReactDOM.render(<Weather/>, document.querySelector('#app'))
```

----------------------------

### state的简写方式
- 因为类方式创建的组件, 组件中的方法都是当事件回调来用 如果作为事件的回调用来的话, 类中的方式中的this的指向都是undefined 但是我们想解决这个问题 就又得在constructor中使用bind的方式将新函数赋值给实例对象中方法
```js 
  constructor(props) {
    super(props)
    this.demo = this.demo.bind(this)
  }
```

- 但我们类中的方法特别多的时候, 我们就会在构造器中写更多的 bind
```js 
  constructor(props) {
    super(props)
    this.demo = this.demo.bind(this)
    this.demo1 = this.demo1.bind(this)
    this.demo2 = this.demo2.bind(this)
  }
```

- 所以
- 当我们有一个属性 都是固定的 不需要通过创建实例对象后传递进来, 那么我们不需要在构造器中写
```js 
  constructor(name, age) {
    this.name = name
    this.age = age

    // 这个就不需要通过new实例对象后 通过实参传递进来
    this.wheel = 4
  }

  // 直接在类中
  class Demo {
    wheel = 4;

    constructor(name, age) {
      this.name = name
      this.age = age

      this.wheel = 4    // X 删除
    }
  }
```

- *类中可以直接写赋值语句, 该属性会在实例对象身上*
```js 
  class Car {
    constructor(name, price) {
      this.name = name
      this.price = price
    } 

    // 类中可以直接写赋值语句 下面代码的含义是, 给Car的实例对象添加一个属性, 名为a 值为1
    a = 1

      // 我并没有写在构造器的里面, 而是写在了外面, 实例对象上也有a=1
  }
```

- 我们再看下我们上面的小例子
- 我们就想在Weather的实例对象上追加 state 属性 它的值是一个对象 {isHot: true}
```js
  class Weather extends React.Component {

    constructor(props) {
      super(props)
      this.state = { isHot: true }
          // 我们把这行代码写在外面

      this.changeWeather = this.changeWeather.bind(this)
          // 我们这行也可以删掉 那删掉后怎么解决this的问题呢?
    }


    state = { isHot: true }
        // 我们往Weather的实例对象上 添加一个属性state 值是一个对象

    changeWeather = () => {
      const isHot = this.state.isHot
      this.setState({
        isHot:!isHot
      })
    } 
    // 这样是不是就相当于 a = 1 的格式了? 这样写的话 changeWeather 就相当于放在 实例对象身上了 Weather的原型上已经没有changeWeather了

    // 还是有this的问题, 我们把function转成箭头函数

    render() {
      let {isHot} = this.state
      return (
        <p onClick={this.changeWeather}>今天天气: 很 '{isHot ? '炎热' : '凉爽'}'</p>
      )
    }
  }
```

> 完整的简写形式
```js 
  class Weather extends React.Component {
    
    // 使用赋值语句的形式 会在实例对象上
    state = {isHot: true}

    // 使用赋值语句的形式 会在实例对象上
    changeWeather = () => {

      // 我们要先获取isHot原先的值 不能省略这不 不然就会报isHot未定义的错误
      let isHot = this.state.isHot
      this.setState({
        isHot:!isHot
      })
    }

    render() {
      const { isHot } = this.state

      return (
        <p onClick={this.changeWeather}>今天天气: 很 '{isHot ? '炎热' : '凉爽'}'</p>
      )
    }
  }

    ReactDOM.render(<Weather/>, document.querySelector('#app'))
```

> 总结
- 以后我们使用类创建一个组件的时候, 组件中的所有自定义方法 *都写成赋值的形式(函数表达式) 使用箭头函数*

----------------------------

### 有状态组件 和 无状态组件
- 函数组件又叫做无状态组件 类组件又叫做有状态组件
- 状态 state 即数据
- 函数组件没有自己的状态 只负责数据展示(静)
- 类组件有自己的状态 负责更新ui 让页面 动 起来

- 数据 - 驱动 - 页面 - 更新

----------------------------

### 组件的通信介绍
- 默认情况下 组件是独立且封闭的单元 默认情况下 只能使用组件自己的数据 在组件化过程中 我们将一个完整的功能拆分成多个组件 以便更好的完成整个应用的功能

- 而在这个过程中 多个组件之间不可避免的要共享某些数据，为了实现这些功能 就需要打破组件的独立封闭性 让其与外界沟通 这个过程就是组件通讯

------

### 组件的三大核心属性 props
- 我们借助一个案例了解下 props

- 需求:
- 自定义用来显示一个人员信息的组件
<!-- 
  姓名: Tom
  性别: 女
  年龄: 18

  姓名: Jack
  性别: 男
  年龄: 17
 -->

- 我们创建一个用来显示人的信息的组件, 但是每一个组件都需要传递进去不同的信息, 用来显示在页面上, 从外部传递信息的话, 那么我们学过的state就不够用了

- 组件中有一个属性 叫做 props

> 父组件通过 props 在标签属性 中传递值
- 我们在组件标签里面 像写id='xxx'的形式 往props中传递值
```js 
  <Person name='sam' age='18' sex='男'/>
  // react在newPerson实例的时候就会将 name='sam'做为一组kv值, 放在子组件的props中 
```

> 子组件中调用 this.props 中的属性
- 我们通过this.props.xxx的形式调用
```js 
  // 子组件

  render() {
    // 在return的外侧 来可以通过解构赋值的方式取变量
    const {name, age, sex} = this.props
    
    return (
      <ul>
        <li>姓名: {this.props.name}</li>
        <li>性别: {this.props.sex}</li>
        <li>年龄: {this.props.age}</li>
      </ul>
    )
  }

  // 子组件在render中打印： this 显示：
  props: {name: 'sam', age: '18'}
```


> 批量往props中传递数据  {...obj} / 批量传递标签属性
- 上面我们在向 组件标签内 传递数据的时候只传递了3个 如果我们传递很多的数据应该怎么处理?

- 真实的开发中 我们的数据肯定都是发ajax请求回来的 然后去做展示 那怎么将数据批量的传递进去呢
```js 
  <Person name='sam' age='18' sex='男'/>

  // 批量往props中传递数据的示例
  const p = { name: 'erin', age: 18, sex: '女' }
  ReactDOM.render(<Person {...p}/>, document.querySelector('#app'))
```

> {...对象}
- 这种写法是 
  <Person name='sam' age='18' sex='男'/> 
  写法的语法糖

- 但需要注意的是:
- 我们捞回来的数据 必须和 模板中使用的数据 变量名一致

```js
  // 这个 p 就是我们模拟从ajax请求回来的结果
  const p = { name: 'erin', age: 18, sex: '女' }

  ReactDOM.render(<Person {...p}/>, document.querySelector('#app'))
      // 这里我们使用...将对象p展开

  // 但是我们要保证 p中的变量名 和 模板中的使用是一致的(render()中)


  render() {
    const {name, age, sex} = this.props
    
    return (
      <ul>
        // 和这里保持一致
        <li>姓名: {name}</li>     
        <li>性别: {sex}</li>
        <li>年龄: {age}</li>
      </ul>
    )
  }
```

**注意:*
- ...p是不能展开对象的, 但是在react中可以使用...展开一个对象

- 但*仅适用于标签属性中的数据传递* 也就是说...对象的形式 只能在标签内部用
<!-- 
  jsx中的{...p} 和 原生 {...p} 是不一样的
 -->


> 待留问题:
- 数据在render函数中定义 数据在类中定义也一样
- 通过上述的方式传递过来的数据 子组件中是可以进行更改的
- 而且子组件修改的数据并不会影响到父组件

- 解答:
- 1. 传递基本数据类型的时候 我们在子组件中修改传递过来的数据会报错

- 2. 如果传递到子组件身上的是一个对象 那么在子组件中修改对象中的属性的时候 不会报错 但也不会更新页面(是不是只有修改了state中的数据才引起页面的更新)

```js
// 父组件传递了 props
render() {
  return (
    <div className="app-wrap">
      <Demo gender={this.gender}/>
    </div>
  )
}


// 子组件 通过changeData方法进行修改 我们发现报错了
// Cannot assign to read only property 'gender' of object '#<Object>'
function Demo(props) {

  function changeData() {
    console.log(props.gender)
    props.gender = "女"
  }

  return (
    <div>
      <h3>{props.gender}</h3>
      <button onClick={changeData}>click</button>
    </div>
  )
}
```


>  props
- 组件是封闭的 要接收外部数据 就应该通过props实现

- props：
- 接收传递给组件的数据

- 父组件传递数据的方式：
- 在组件标签内部 添加 标签属性
```js
<Demo {...this.state}/>
<Demo name="sam"/>
<Demo name={this.state.name}/>
```

- 子组件接收数据的方式：
- 函数组件： 通过参数 props 接收数据 (props)
- 类式组件： 通过 this.props 来接收数据 (this.props)


> props的特点
> 1. 可以给组件传递*任意类型的数据 数据 对象 函数 布尔 还能传递一个标签*
```js
// 父组件 传递一个标签
render() {
  return (
    <div className="app-wrap">
      <Demo 
        tag={<h3 style={{background: "red"}}> 我是传递过来的标签</h3>} />
    </div>
  )
}

// 函数式子组件
function Demo(props) {
  return (
    <div>
      {props.tag}
    </div>
  )
}



// 演示2 父组件传递一个标签
render() {
  return (
    <div className="app-wrap">
      <h3>App</h3>
      <Home tag={<a href="www.baidu.com">link</a>} />
    </div>
  )
}

// 类式子组件
render() {
  let {tag} = this.props
  return (
    <div className="home-wrap">
      <ul>
        <li>{tag}</li>
      </ul>
    </div>
  )
}
```

> 2. props 是只读的对象 
- 只能读取属性的值 无法修改对象(但可以修改基本数据类型)

> 3. 如果使用的是类组件 如果写了 constructor 而是还传递了 props 那么就应该将props传递给 super 否则无法在构造函数constructor中获取到props


----------------------------

### 组件通讯的三种方式
- 1 父组件 - 子组件
- 2 子组件 - 父组件
- 3 兄弟组件


> 父组件传递数据给子组件
- 1. 父组件提供要传递的state数据
- 2. 给子组件标签添加标签属性 值为state中的数据
- 3. 子组件通过props接收到父组件中传递的数据
<!--
    <Child name={this.state.name}>
-->
    

> 子组件传递数据给父组件
- 思路:
- *利用回调函数* 父组件提供回调 子组件调用 将要传递的数据作为回调函数的参数

- 弹幕：
- 有人说setState是异步 是不是异步不管 他说可以在后面加一个回调函数进行同步更新

- 小例子
- 我们将接收到的参数 在页面上展示
- 以往我们都是直接那 this.props.name 在 html 结构中展示

- 但是 我们也可以 将拿到的数据 保存在state中 然后将state中数据展示到页面上
```js
state = { parentMsg: "" }

getChildMsg = (data) => { 
  this.setState({parentMsg: data })
}

render() { 
  return ( 
    <div>{this.state.parentMsg }</div>
  ) 
}

-------

// 父组件
export default class App extends Component {

  obj = {name: "erin", age: 18}

  // 定义一个函数 通过props 传递过去
  handleData = (data) => {
    console.log(data)
  }

  render() {
    return (
      <div className="app-wrap">
        <h3>App</h3>
        <Home 
          tag={<a href="www.baidu.com">link</a>} 
          // 传递一个函数过去
          method={this.handleData}
        />
      </div>
    )
  }
}


// 子组件
// 还可以在render函数中调用
componentDidMount() {
  this.props.method(this.data)
}
```


> 兄弟组件
- 思路:
- 将共享状态提升到最近的公共父组件中 由公共父组件管理这个状态
- 也就是把数据放在 A B 组件的 亲爸爸 身上

- 公共父组件的职责
- 1. 提供共享状态
- 2. 提供操作共享状态的方法
- 因为状态是组件内部的私有数据 所以父组件还要提供操作状态的方法


> props的children属性可以完成插槽的概念
> props深入： children 属性
- children属性： 
- 表示组件标签的子节点 *当组件标签有子节点(标签体)的时候 props就会有该属性*
<!-- 
  <Home>我是内容</Home>

  props:
    children: "我是内容"      // props.children
 -->

- 也就是说 我们通过标签体传递过去的 数据 就会在该组件的props.children身上
<!--
    // 通过组件标签体传递过去的内容
    <Hello>我是子节点</Hello>

    // 会在子组件的 props.children 身上
    props.children = 我是子节点
-->

- 演示下
```js
// 父组件
render() {
  return (
    <div className="app-wrap">
      <h3>父组件title: {this.state.job.backend}</h3>
      <Demo>
        <ul>
          <li>
            我是要展示的静态数据
          </li>
        </ul>
      </Demo>
    </div>
  )
}


// 子组件
const Demo = props => {
  return (
    <div>
      {props.children}
    </div>
  )
}
```

- *props.children属性*与普通的props一样 值可以是*任意值*(文本 React元素 *组件* 甚至是函数 数组)

- 我们通过 this.props.children 来调用
```js
    <Hello>文本节点</Hello>

    <Hello>
      <p>jsx作为子节点</p>
    </Hello>

    <Hello>
      <Test />  这是一个组件
    </Hello>

    <Hello>
      {
        () => console.log("这是一个函数子节点")
      }
    </Hello>

    - 然后我们可以通过 props.children() 调用

  -------

  <Home>
    <ul>
      <li>a</li>
      <li>b</li>
      <li>c</li>
      <li>d</li>
    </ul>
  </Home>

  render() {
    return (
      <div className="home-wrap">
        <h3>Home</h3>
        {
          this.props.children
        }
      </div>
    )
  }

  // 结果
  Home
  ・　a
  ・　b
  ・　c
  ・　d
```


> 这不是插槽么？
- 调用 Hello 组件的人 可以通过标签体 传递数据 然后Hello组件接收到后 可以渲染不同的内容


> props深入： 校验
- 对于组件来说 props 是外来的 我们无法保证组件使用者传入什么格式的数据

- 如果我们传入的数据格式不对 就会导致组件内部报错 关键问题 组件的使用者不知道明确的错误原因

> 安装
- npm i prop-types
- import PropTypes from "prop-types"

- props校验：允许在创建组件的时候 就指定props的类型 格式等
<!--
  static propTypes = {
      colors: PropTypes.array
  }
-->


> 常见的约束规则
- 1. 常见类型:  这里也是 PropTypes.后面应该接的
  - array 
  - bool 
  - func 
  - number 
  - object 
  - string  


- 2. element 
- 我们还可以指定该prop属性为 React元素
- propAttr: PropTypes.element


- 3. 必填写项 isRequired
- colors: PropTypes.array.isRequired


- 4. shape({ })  指定特定的结构 
- 用来约束属性是一个对象时候 对其内部属性进行约束
- shape函数的参数是一个对象
- propAttr: PropTypes.shape({
    color: Protypes.string.isRequired
  })

- 文档在官方网站里
- https://reactjs.org/docs/typechecking-with-proptypes.html


> props深入： 默认值
- 场景
- 分页组件 -- 每页显示条数
- 我们在使用分页组件的时候 会需要很多的属性 比如当前页 每页显示多少条 total等
- 这个每页显示多少条就可以使用默认值 因为每页显示多少条可以设置为固定的

<!--
    static defaultProps = { pageSize: 10 }
-->



**扩展运算符的回顾**
> ...在es6中是用来展开数组的 连接数组 函数传参
```js 
  // 展开一个数组
  let arr = [1,2,3,4]
  console.log(...arr)     1 2 3 4


  // 连接两个数组
  let arr = [1,2,3]
  let arr2 = [4,5,6]

  let arr3 = [...arr1, ...arr2]
      //  [1, 2, 3, 4, 5, 6]

  
  // 函数传参
  用于批量的接受参数
  function sum(...args) {
    console.log(args)   // [1,2,3,4]

    // 求和
    return args.reduce((tmp, value) => {
         return tmp + value
      }, 0)
    }
  let res = sum(1,2,3,4)
  console.log(res)


  // ... 可以应用到对象上么?  所以展开运算符不能展开一个对象
  let person = {name: 'sam', age: 18}
  console.log(...person)   // 报错 对象上没有可遍历的接口
```

> ... 还可以用于复制一个对象 {...person}
- 构造字面量对象时 使用展开语法
```js
  let person = {name: 'tom', age: 18}
  let person2 = {...person}
    // 直接写 ...person 肯定不能展开一个对象 但是外面包裹一层{...person} 可以复制一个对象

    // 如果对象中还有对象的话 我们克隆的是对内层对象的引用 就是浅拷贝 这是试验过后的结果

  console.log(person2)
```


> 复制对象时 修改属性
- 复制对象的同时, 修改对象内的属性
```js 
  let person = { name: 'tom', age: 18 }
  let person2 = {...person, name: 'erin'}

  console.log(person2)
```

----------------------------

### props 标签属性相关
- 我们上面通过props 将数据传递到组件的内部做了展示

- 当我们想在标签内部添加 kv 的形式的时候, 只能填 key='value', 当想在标签内部填写的值为别的类型的时候, 我们要使用{ }的形式

```js 
  <Person name='sam' age='19' sex='男' />
  
  // 有些情况下 我们需要对数据进行计算, 比如: 让展示的数据比真实数据 - 1

  render() {
    const { name, sex, age } = this.props
    return (
      <div>
        <ul>
          <li>姓名: {name}</li>
          <li>性别: {sex}</li>
          <li>年龄: {age + 1}</li>
                // 结果是 191
        </ul>
      </div>
    )
  }

  // 因为我们在标签内部传递的属性是字符串的类型 所以拼串了 我们要是想在标签内部 填写 number类型的数据的话, 需要用{ }

  <Person name='sam' age={19} sex='男' />

  // 这样age的值就是number类型的
```


- 上面的问题还会延伸出来一个问题, 就是我们定义的组件 内部是对真实数据进行了+1的处理, 

- 别人在使用我们定义的组件的时候, 不能知道我们传递的标签属性应该是什么类型
```js 
  <ul>
    <li>姓名: {name}</li>
    <li>性别: {sex}</li>
    <li>年龄: {age + 1}</li>
  </ul>
```

- 所以我们需要对我们定义的组件的props, 进行各种的限制
- 1. 限制标签属性的类型
- 2. 给标签属性定义默认值
- 3. 必须传的标签属性(必要性的限制)


- 对组件实例对象 props 进行限制也就是说 对下面的标签内部我们传递的kv的v进行限制
<!-- 
  <Person name='sam' age='19' sex='男' />
 -->

- 比如:
- 1. 姓名必须指定, 且为字符串类型
- 2. 性别为字符串类型, 如果没有性别指定, 默认为男
- 3. 年龄为字符串类型, 且为数字类型, 默认为18


> 对标签属性 props 进行 类型 和 必要性 的限制
- 我们给 类组件添加 propTypes 属性 在内部进行具体的规则制定
- 我们在类上添加 propTypes 属性 值是一个对象
<!-- 
  类(Person).propTypes = {
    
  }
 -->


> 内部规则的制定
- 16.xx的版本以上通过, 引用 prop-types.js 库 来对标签属性的类型进行限制

> 引入 prop-types.js 库之后 全局就会多出 PropTypes 对象 内部规则使用PropTypes全局对象
```js
  // 用于对组件的标签属性 进行限制
  <script src='../js/prop-types.js'></script>
  <script type='text/babel'>
  
  </script>


  // 引入下方的js文件, 全局多了 React 对象
  <script src="../js/react.development.js"></script>

  // 引入下方的js文件, 全局多了 ReactDOM 对象
  <script src="../js/react-dom.development.js"></script>


  // 引入下方的js文件, 全局多了 PropTypes 对象
  <script src='../js/prop-types.js'></script>
```

> 扩展:
<!-- 
  15.xx的版本是通过 React.PropTypes.string 内置对象的方式 来对标签属性进行限制
  
  该方法已弃用

  Person.propTypes = {
    name: React.PropTypes.string,
  }

  因为React觉得 所有的类型限制都加在了React对象本身上 未来React会变的特别的大
  所以
 -->


> 具体写法

> 类型限制    PropTypes.string / number / func
> 必传性限制  PropTypes.string.isRequired
<!-- 
  Person.propTypes = {
    name: PropTypes.string,
        // 属性名的类型限制: 类型必须是 字符串型

    name: PropTypes.string.isRequired
        // 属性名必须传递
  }


  // string number func 都是PropTypes对象里面设定好的属性名
 -->


> 默认性限制
- 我们给 类组件添加 default 属性 在内部进行具体的规则制定
- 我们不传递 标签属性 就会使用下面的默认值
```js
  Person.defaultProps = {
    sex: '不男不女',
    age: 18
  }
```


> 完整代码
```js 
  class Person extends React.Component {
    render() {
      const { name, sex, age } = this.props
      return (
        <div>
          <ul>
            <li>姓名: {name}</li>
            <li>性别: {sex}</li>
            <li>年龄: {age + 1}</li>
          </ul>
        </div>
      )
    }
  }


  // 对标签属性进行类型, 必要性的限制
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number
  }


  // 对标签属性进行默认值的设置
  Person.defaultProps = {
    sex: '不男不女',
    age: 18
  }


  const obj = { name: 'sam', age: 18, sex: '男' }
  ReactDOM.render(<Person {...obj} />, document.querySelector('#app'))
  
  // ReactDOM.render(<Person name={123} age={19} sex='男' />, document.querySelector('#app'))
```

----------------------------

### props的简写方式

> props是只读的
- *如果props是一个对象 它的内部属性 我们修改的时候它不会报错*

- 但是简单的数据类型 或者 直接改变对象的地址值 那就会报错
```js 
  <Person name='sam' age={19} sex='男' />

  // 我要是想改props中的数据, 可以在标签属性中更改
  <Person name='erin' age={19} sex='男' />

  // 但是我们要是在class中使用这中方式更改的话
  class Person {

    render() {
      const {name, age, sex} = this.props

      // 假如我们在这里通过这种方式修改props的话
      this.props.name = 'erin'
          // 报错 我们不能在只读的name属性上 做出修改

      return (

      )
    }
  }
```


> props校验的简写方式
- static propTypes = { k: PropTypes.string.isRequired }
- static defaultProps = { sex: '男' }

- 上面我们用class定义了组件, 但是对标签属性 和 类型 必须性的限制却写在了class的外面, 最好的方式是, 当我们把class折叠起来之后, 所有对标签属性的限制 也被折叠起来

- 从语法上来讲, 我们就是给Person类的自身添加了属性 我们使用 static 关键字
```js
  class Person extends React.Component {

    // 使用static关键字 给标签属性添加类型 和 必须性 默认值等限制
    static propTypes = {
      name: PropTypes.string.isRequired,
      sex: PropTypes.string,
      age: PropTypes.number
    }

    static defaultProps = {
      sex: '不男不女',
      age: 18
    }

    render() {
      const { name, sex, age } = this.props
      return (
        <div>
          <ul>
            <li>姓名: {name}</li>
            <li>性别: {sex}</li>
            <li>年龄: {age + 1}</li>
          </ul>
        </div>
      )
    }
  }
```


**类的复习**
- 前面我们创建了一个car的类
```js 
  class Car {
    constructor(name, price) {
      this.name = name
      this.price = price
    }

    // 给实例对象添加属性 在类中使用赋值的形式 添加的属性
    wheel = 4

    // 给Car本身添加属性 使用关键字 static 就会将属性添加给类的本身
    static demo = 100
        // 给Car类本身添加了demo属性
  }

  const c1 = new Car('奔驰', 199)
```


> 总结
- 我们使用类定义组件的时候
```js 
class Person {
  // 添加状态 state 使用赋值语句的形式 直接写
  state = {  }

  // 添加自定义方法 使用函数表达式 + 箭头函数的方式 直接写
  changeWeather = () => {   }


  // 给props做必须性 类型 默认值的限制的时候 使用static
  static propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number
  }

  static defaultProps = {

  }
}
```

----------------------------

### 类式组件中的构造器 和 props
- 之前我们在使用constructor的时候我们添加过props, 现在我们就来看看props和constructor之间的关系

> 总结
- 1. 类中的构造器可以完全不写
- 2. 在写constructor和super的时候 都要传递props 不然 我们没有办法通过this.props获取到值(也就是希望不希望在构造器中通过实例(this)去访问props)

```js 
  constructor(props) {
    super(props)

    我这里我们研究几个问题
    1. 我们接收到props后 不传递给super()有什么问题
    2. 类中的构造器到底有什么作用呢 要是不省略构造器的时候都要做些什么事呢

    问题1的解释:
    // 如果接了props 也在super中传了props
    constructor(props) {
      super(props)
      
      // 输入实例自身的props
      console.log(this.props)     // 有结果
    }
          
    // 如果接了props 也在super中传了props
    constructor() {
      super()

      // 输入实例自身的props
      console.log(this.props)     // undefined
    }

    问题2的解释:
    通常在react中, 构造函数仅用于以下两种情况
    1. 通过给this.state赋值对象来初始化内部的state
    2. 为事件处理函数绑定实例
    (this.changeWeather = this.changeWeather.bind(this))
  }

  我们在标签属性中传递的name='sam' age=18 还有默认的sex 都会被props接收到
```


> 总结:
- 通常在react中, 构造函数(constructor)仅用于以下两种情况
- 1. 通过给this.state赋值对象来初始化内部的state
- 2. 为事件处理函数绑定实例

----------------------------

### 函数式组件的使用props
- 对于函数式组件, 因为它没有this(也就是实例对象)它没办法使用 state, refs, 但是它也可以使用props
<!-- 
  不是说没有实例那么实例的三大核心属性都用不了么? 
  那为什么函数式组件可以使用props呢?

  答:
  因为函数有一个特点 因为它可接收参数
 -->

> 函数组件的形参 props
- 在react中, 我们在组件标签内部写的所有属性, react都会帮你收集好放到形参中，形参props是一个对象的形式
```js 
  ReactDOM.render(<Person name='sam' age={18}/>, document.querySelector('#app'))

  function Person(props) {

    console.log(props);
        // 结果 {name: 'sam', age: 18}
      
    const {name, age, sex} = props
      return (
        <ul>
          <li>姓名: {name}</li>
          <li>性别: {sex}</li>
          <li>年龄: {age}</li>
        </ul>
      )
    }
```


> 函数式组件也可以对props进行类型 必须性 默认的限制
- 我们在函数的外侧 给函数添加属性 PropTypes 和 defaultProps
```js 
  Person.propTypes = {
    name: PropTypes.string.isRequired,
    sex: PropTypes.string,
    age: PropTypes.number
  }

  Person.defaultProps = {
    sex: '不男不女',
    age: 18
  }
```

> 扩展 
- 新版react函数式组件 可以通过 hooks 来使用state

----------------------------

### props的相关总结
- props的作用通过标签属性从组件外向组件内传递变化的数据

- 注意:
- 组件内部不要修改props数据
<!-- 
  state是自己家里面的事
  props是从外部往家里面带东西
 -->


- 1. 这属于标签属性
```js 
  <Person name='sam' age={18}/>
```

- 2. 我们可以使用{...obj}的形式 在react中批量传递props
```js 
  const obj = {name: 'sam', age: 18}
  <Person {...obj} />
```

- 3. 对于类式组件来说, react帮我们将标签属性收集到了props里
- 通过this.props获取 函数式组件的props是通过形参props调用

- 4. props的限制, 并不是说一定要对props进行限制 但是对于标准一些来说还是需要进行一些限制
**要是想使用props限制 要引入prop-types.js库 全局才会多出PropTypes对象**
```js 
  类式组件:
  // 写在class里面 使用static关键字
  static propTypes = {
    name: PropTypes.string.isRequired,
  }

  static defaultProps = {
    sex: '不男不女',
  }


  函数式组件:
  // 写在函数的外面
  构造函数名.propTypes = { }
  构造函数名.defaultProps = { }
```

----------------------------

### 组件的三大核心属性 refs 与 事件处理
- ref一般是给组件和dom节点打标记的 相当于id

- 给组件打ref属性 相当于拿到了该组件的实例对象 可以通过ref调用子组件中的props state等属性

- 给dom元素打ref相当于拿到了dom元素的节点

- 案例
- 需求: 自定义组件
  - 1. 点击按钮, 提示第一个输入框中的值
  - 2. 当第二个输入框失去焦点时, 提示这个输入框的值


> 1. 字符串型的 ref --- 从 this.refs身上获取
- ref的值 input1 是字符串的类型 所以叫做字符串型 ref
<!-- 
  <input ref='input1'>
 -->

- 作用: 
- 组件内的标签可以定义ref属性来标识自己 然后被react收集到实例对象的refs属性(refs是一个对象)中
- 简单的说 用法类似 id
<!-- 
  <input type="text" ref='inp1'/>

  当我们在标签内部写上ref的时候, react就会将ref这组kv 收集到 实例对象的refs属性中
  refs: {inp1: input}

  refs中的key:    是inp1
  refs中的value:  是被ref标记的节点
 -->


- 注意:
- 这里要注意的是 我们虽然是给虚拟DOM打上的ref标识, 但获取到的*不是虚拟DOM*, 而是该虚拟DOM转成*真实DOM后的节点*

**字符串类型的ref已经不被react官方推荐使用了 以后可能会被废弃掉**
- 因为string类型的refs存在一些问题
- 字符串类型的ref存在着效率上的问题, 当写多了效率就不高了


> 完整代码
```js
  class InputComponent extends React.Component {

    render() {
      return (
        <div>
          <input ref='inp1' type="text" placeholder='点击按钮提示文字'/> 
          
          <button ref='btn' onClick={this.inputClick}>点击</button> 

          <input ref='inp2' type="text" placeholder='失去焦点提示文字' onBlur={this.inputBlur} />

        </div>
      )
    }

    inputClick = () => {
      
      console.log(this)
      // 这样输入this 是InputComponent的实例对象

      // console.log(this.refs.inp1)
      // 通过this获取到实例对象上的refs属性 找到inp1 就是对应的节点

      // console.log(this.refs.inp1.value)


      // 解构赋值
      const {inp1} = this.refs
      console.log(inp1.value)
      
    }

    inputBlur = () => {
      const {inp2} = this.refs
      console.log(inp2.value)
    }
  }

  ReactDOM.render(<InputComponent />, document.querySelector('#app'))
```


> 2. 回调形式的 ref {c => this.refname = c}  --  从 this 身上获取
- 所谓的回调形式的ref 就是给 ref的值设置一个回调函数(箭头函数), jsx中要在结构中使用js 要用到{ }
<!-- 
  ref = { (currentNode) => { this.inp1 = currentNode } }
 -->

- ref属性要指定一个回调, 回调中的形参currentNode就是当前节点 
- 我们将ref标识的节点放在了组件实例对象自身身上


- 解析:
<!-- 
  既然要在ref中写回调 那么就要用到 { }
  ref = { }

  我们直接在{ }中定义一个函数
  ref = { () => {} }

  我们可以试验一下 这个回调函数执行了没
  ref = { () => { console.log('test')} }
      // 结果 react 在执行jsx中的代码的时候 会帮我们调用 回调函数


  我们实验一下 看看 这个函数接收到了什么参数
  ref = { (params) => { console.log(params)} }
      // params是 这个使用ref属性的这个节点 <input>


  // 一般我们在这个回调中 做这么一件事情
  ref = { c => this.inp1 = c }
      // 把当前节点a 放在了组件实例自身上 然后起了一个名字叫做inp1

  
  整体的流程:
    我们在页面上展示东西 肯定要new一个组件实例 react通过这个实例帮我们调用render 调用render后需要执行里面的jsx 执行jsx来到ref=回调 这个时候就触发了这个回调的执行

    react在调用这个函数的时候, 会把当前处于的节点作为参数传递进去
    ref = { (currentNode) => { this.inp1 = currentNode } }
        // 那这里的this是谁呢? 箭头函数没有自己的this 它会往外找 会找到render render里面的this 就是组件实例
 -->


> 完整代码
```js  
  class InputComponent extends React.Component {
      render() {
        return (
          <div>
            <input ref={ currentNode => this.inp1 = currentNode } type="text" placeholder='点击按钮提示文字'/>
            
            <button onClick={this.inputClick}>点击</button> 

            <input ref= { currentNode => this.inp2 = currentNode } type="text" placeholder='失去焦点提示文字' onBlur={this.inputBlur} />
          </div>
        )
      }

      inputClick = () => {

        // 我们不是从refs中取变量了, 而是从实例自身上取
        let {inp1} = this

        console.log(inp1.value)
        console.log(this.inp1.value)
      }

      inputBlur = () => {
        console.log(this.inp2.value)
      }
    }

    ReactDOM.render(<InputComponent />, document.querySelector('#app'))
```


**回调ref中调用次数的问题**
- 我们来看一个比较细节的地方 就是ref的回调 的调用次数
<!-- 
  <input ref={ currentNode => this.inp1 = currentNode } type="text" />
 -->


> 内联函数的ref 带来的可以忽略不计的问题
- 上面的注释里就是内联的函数的形式
- 官方文档上说明:
- 如果ref回调函数是以内联函数的方式定义的, 在更新过程中它会被执行两次
<!-- 
  前面说过 render 的执行次数是1+n次, 1是挂载, n才是更新的次数
  这里说的更新过程 就是除了挂载之外的n
 -->

- 为什么会执行两次 是因为为了保证标签内部的回调中是干净的 一次null是清空 一次才是传递DOM节点
<!-- 
  一次传入参数null
  一次传入参数DOM元素

  第一次渲染的时候react会执行到ref回调 将真实DOM传递进来 调用了一次ref回调

  我们点击更新按钮的时候, 状态一更改 就会驱动页面显示 怎么驱动页面显示 我们需要重新调用一次render 那就说明render又要执行一次 那么就说明ref回调也需要重新执行一次

  这时react 会再次执行ref的回调, 这时这个回调就是第一次那个了 
  之前那个执行完了被释放了 没了 这是一个新的 
  第二次的时候react不知道之前做了什么接收到了什么, 
  为了保证这个函数被完美的清空所以调用了第一次传递了一个null 
  然后紧接着它调用第二次才把当前的DOM节点放了进来 是为了有一个清空的动作
 -->


> 官方给出的解决办法
- 通过将ref的回调函数中调用我们在类中定义好的方法 该方法内部 做
   c => this.name = c, 的逻辑
  但是大多情况下它是无关紧要的
<!-- 
  说白了就是像vue一样 在标签里面定义方法, 然后在类里面 定义方法写逻辑
  <input 
    ref={this.saveInput} 
    type="text" 
    placeholder='点击按钮提示文字' />

  class InputComponent {
    saveInput = (c) => {
      this.inp1 = c;
    }
  }
 -->

- 以后直接写成内联的没什么影响


> 3. React.createRef() 创建ref容器  --- this.refname.current.value
- React.createRef() 调用后可以返回一个容器, 该容器可以存储被ref所标识的节点 

- 最新的写法 也是目前react最为推荐的一种写法

- 1. 我们在类中, 使用赋值的形式 创建ref容器

    myRef = React.createRef()

- 2. 然后在标签内部使用该容器 ref={this.myRef}

    <input ref={this.myRef} type="text"/>

<!-- 
  myRef = React.createRef()

  <input ref={this.myRef} type="text"/>

  当执行到 <input ref={this.myRef} type="text" /> 的时候 会把input所在的节点直接存储到这个myRef的容器里面
 -->

- 3. this.myRef.current 取到当前节点
- 我们console myRef 容器 结果是一个对象 {current: input}

- 要是获取保存在里面的节点 需要通过 myRef.current 来获取
<!-- 
  console.log(this.myRef.current)
  // 获取input节点

  console.log(this.myRef.current.value)
  // 获取input节点的value
 -->

**注意:**
- 该容器是专人专用的 里面只能存储一个 后放进去的会覆盖前一个 要想有多个 就需要通过React.create() 创建多个ref容器


> 完整代码
```js
  class Demo extends React.Component {

    // 专人专用
    inputRef = React.createRef()
    inputRef2 = React.createRef()

    render() {
      return (
        <div>
          <input ref={this.inputRef} type="text" />

          <button onClick={this.showData1}>点击我</button>

          <input ref={this.inputRef2} onBlur={this.showData2} type="text" />
        </div>
      )
    }

    showData1 = () => {
      let input1 = this.inputRef.current
      console.log(input1.value)
    }

    showData2 = () => {
      let input2 = this.inputRef2.current
      console.log(input2.value)
    }
  }

  ReactDOM.render(<Demo />, document.querySelector('#app'))
```

----------------------------

### react中的事件处理
- 1. react中通过onXxx的形式指定事件处理函数(注意大小写)
  - 1.1 react使用的是自定义(合成)事件, 而不是使用的原生DOM事件
  - 1.2 react中的事件是通过事件委托方式处理的(委托给组件最外层的元素)

- 2. 通过 event.target 得到发生事件的DOM元素对象

**注意：**
- 我们绑定的事件其实都委托给了最外层的div
```js 
  <div className="app-wrap" onClick={this.handleClick}>
    <button onClick={this.handleClick}>click</button>
  </div>


  num = 0

  handleClick = () => {
    console.log(this.num += 1)

    // 扩展
    如果我们在函数内部定义 let num = 0
    每次console num++
    我们每次得到的都是0 每点击一次 打印的就是一个0
  }

  现在div和button都绑定了相同的事件 事件内的逻辑或执行两次
```

- 对上面部分的解释说明

  1.1 解释:
    react把原生里面的事件都重新的写了一套 为了更好的兼容性

  1.2 解释:
    <div>
      <input ref={this.inputRef} type="text" />
      <button onClick={this.showData1}>点击我</button>

      <input ref={this.inputRef2} onBlur={this.showData2} type="text" />
    </div>

    我们绑定的onClick 和 onBlur 其实都委托给了最外层的 div 事件委托的原因是为了高效


  2. 解释:
  上面我们学习的ref的使用 是为了像id那样获取指定的节点, 但是react官网并不推荐过渡的使用ref

  比如
  <input ref={this.inputRef2} onBlur={this.showData2} type="text" />

  这个就没必要写ref, 因为事件的DOM元素 和 要操作的DOM元素是同一个

  // react会自动传递进去event
  showData2 = (event) => {
    alert(event.target.value)
  }


> 总结:
- 1. 不要过渡的使用ref
- 2. react中会在事件回调中自动传入 event 事件对象 react会在事件回调中假如 事件对象

- 3. 假如我们在事件回调使用了高阶函数 也就是返回一个函数的形式的话 那么我们交给react的就是函数的返回值函数 react会往拿到手的函数的形参中加入 事件对象
<!-- 
  <div onClick={this.handleClick}>
  handleClick= (e) => { }

  handleClick= (参数) => {
    return (e) => {
      因为react拿到的是这个函数
    }
  }
 -->

----------------------------

### 非受控组件

- 包含表单的组件分类
  - 1. 受控组件
  - 2. 非受控组件

- 什么是非受控组件
- 表单中所有输入类的DOM的值(text checkbox radio) 对于这些DOM节点中的值
- 是通过现用现取的就是非受控组件


- 案例:
- 定义一个包含表单的组件, 输入用户名和密码 点击登录提示输入信息
- 这个案例就是非受控组件


> 完整代码
```js 
  class Login extends React.Component {

    // 使用的创建ref容器
    textRef = React.createRef()
    passwordRef = React.createRef()

    render() {
      return (
        
        // 这里给表单绑定的submit
        <form onSubmit={this.handleSubmit}>

          用户名:<input ref={this.textRef} type="text" name='uname'/>

          密&emsp;码:<input ref={this.passwordRef} type="password" name='pwd'/>

          <button>Login</button>

        </form>
      )
    }

    
    handleSubmit = (e) => {
      // 这里使用阻止表单的提交的默认行为
      e.preventDefault()

      // 通过ref获取节点的value值
      let user = this.textRef.current.value
      let pwd = this.passwordRef.current.value

      console.log(`您的用户名是${user}, 密码是${pwd}`)
    }
  }

  ReactDOM.render(<Login/>, document.querySelector('#app'))
```


> form相关的知识点
- 1. 不指定请求方式的时候, form表单默认是get请求
<!-- 
  带的参数默认是query参数
  /?是携带qurey参数的一种形式
 -->

- 2. 如果表单项中没有name属性, 我们取不到用户输入的数据
<!-- 
  // 没指定name属性
  https://www.baidu.com/?

  // 指定了name属性
  https://www.baidu.com/?uname=sam&pwd=123
 -->

- 3. 有 form 的情况下 我们用 onsubmit 事件来提交数据
- 4. 原生form提交后 页面会跳转 或 刷新 数据会置空, 但是ajax不会

----------------------------

### 受控组件
- 非受控组件:
- 表单中所有输入类的DOM的值(text checkbox radio) 对于这些DOM节点中的值, 是通过现用现取的就是非受控组件

- 说白了类似 通过点击按钮从该input中获取到值进行操作的就是非受控组件

- 受控组件:
- 表单中所有输入类的DOM 随着我们的输入 就能把value维护到state里面去 等需要用的时候直接从state里面取出来 这就是受控组件


- 总结:
- 就是获取值采用的事件不一样, onClick就是非受控, onChange就是受控(因为我们会把value存放到state中)
<!-- 
  典型的vue中的v-model
 -->

> 受控组件
- html中的表单元素是可以输入的 也就是有自己的可变状态
- 而 react中可变状态通常保存在state中 并且只能通过 setState 方法来修改

- 这样就有有思想上的冲突 html表单元素有自己的状态 而react又希望将数据的状态放在state中

- 解决冲突的方式
- react将state与表单元素值绑定到一起 由 state 的值来控制表单元素的值


> 有点像实现v-model的感觉
- 1 动态绑定 input 的 value 为 state 中的对应数据 -- 控制表单的来源

- 2 然后给 input 绑定 input /  change 事件 -- 控制表单元素值的变化
- 
- <input type="text" value={this.state.text} />
- onChange={e => { this.setState({ text: e.target.value })}}


> 富文本框(textarea) react实现v-model的逻辑 受控组件
```js 
  state = {
      text: ""
  }

  handleContent = (e) => {
      this.setState({text: e.target.value})
  }
  <textarea value={this.state.text} onChange={ this.handleContent }>
```

> 下拉框(select)
```js
    state = { city: "bj" }
    <select value={this.state.city}>
        <option value="sh"> 上海
        <option value="bj"> 北京 

    handleContent = (e) => {
        this.setState({text: e.target.value})
    }
    onChange={ this.handleContent }
```

> 复选框
- 因为复选框是可以选中和不选中 它操作的不是value 而是 checked
```js
    state = { isCheck: false }
    <input type="checkbox" checked={ this.state.isCheck }>

    handleContent = (e) => {
        this.setState({isCheck: e.target.value})
    }
    onChange={ this.handleContent }
```

> 多表单元素优化步骤：
- 1. 给表单元素添加 name 属性 名称与 state 相同
- 2. 根据表单元素类型获取对应值

- 这里是通过 target.type 和 target.name 的方式 拿到节点的种类 和 name属性

```html
  <input 
    type="text"
    name="text"
    value={this.state.text}
    onChange={this.handleForm}
  />

  const value = target.type === "checkbox" ? target.checked : target.value

  const name = target.name
  this.setState({[name]: value})
```



> 完整代码
```js 
  class Login extends React.Component {
      
    // 初始化状态
    state = {
      uname: '',
      password: ''
    }

    render() {
      
      return (
        <form onSubmit={this.handleSubmit}>

          用户名:<input type="text" name='uname' onChange={this.saveUname}/>

          密&emsp;码:<input type="password" name='pwd' onChange={this.savePassword}/>

          <button>Login</button>

        </form>
      )
    }

    // 保存用户名到状态中
    saveUname = (e) => {
      this.setState({
        uname: e.target.value
      })
    }

    // 保存密码到状态中
    savePassword = (e) => {
      this.setState({
        password: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault()

      // 展示的时候 我们将数据从state中取出来做为展示
      const {uname, password} = this.state
      console.log(`您输入的用户名: ${uname}, 您输入的密码是: ${password}`)
    }
  }

  ReactDOM.render(<Login/>, document.querySelector('#app'))
```


> 总结:
- 1. 我们要是在项目中使用state的话, 一定要先*对state进行初始化*
```js 
  // 初始化状态
  state = {
    uname: '',
    password: ''
  }

  不要state连初始化都没做 直接将uname存放到state里
```

- 2. 现用现取 就是 非受控 | 随着输入维护状态 就是 受控
<!-- 
  建议还是写受控组件 受控式组件里面一个ref也没有用
  而非受控组件里面有几个输入项就要写几个ref

  受控组件的优势就在于能够省略ref
 -->


> 技巧要点:
- 我们创建了一个中间变量type 这个中间变量对应的是state中的key
```js
  handleSave = (type) => {
    return (e) => {
      this.setState({
        [type]: e.target.value
      })
    }
  }

  <input type="text" name="username" onChange={this.handleSave("username")} />
```

----------------------------

### 评论区的练习
- 评论人 评论内容 发表评论 展示信息
- 我分成了两个组件 评论人 评论内容 发表评论 和 展示信息

- 我将数据放在了app组件里面
- 功能组件收集数据 app通过prop传过来的函数 将数据返送回去
- app组件将收到的数据 prop传给展示组件

> 要点
- 通过三元表达式来决定渲染哪个结构
- 条件? (结构1) : (结构2)

```js 
  // 功能组件
  handleContent = () => {
    let {inp, area} = this

    if(inp.value.trim() === "" || area.value.trim() === "") return alert("请输入评论人 或 评论内容") 

    let msgObj = {
      auth: inp.value,
      content: area.value
    }

    this.props.saveData(msgObj)
  }
  
  render() {
    return (
      <div className="feature-wrapper">
        <div className="feature-commentator">
          <input ref={c => this.inp = c} type="text" name="commentator" placeholder="请输入评论人"/>
        </div>
        <div className="feature-comment">
          <input ref={c => this.area = c} type="textarea" name="comment" placeholder="请输入评论内容"/>
        </div>
        <div>
          <button onClick={this.handleContent}>发表评论</button>
        </div>
      </div>
    )
  }


  // app组件
  state = {
    msg: []
  }

  // 将收到的obj对象放入msg中 msg中原有的对象将会在obj的后面
  saveData = (obj) => {
    let {msg} = this.state
    this.setState({
      msg: [obj, ...msg]
    })
  }

  render() {
    return (
      <div className="app-wrap">
        <Feature saveData={this.saveData}/>
        <Comment msg={this.state.msg}/>
      </div>
    )
  }


  // 展示组件
  state = {
    hasContent: false
  }

  render() {
    console.log(this)
    return (
      <div className="comment-wrapper">
        <span className="title">评论区</span>
        <div className="comment-area">
          {
            this.props.msg.length === 0 
              ? (<div>暂无评论</div>)
              : (
                <ul>
                  {
                    this.props.msg.map((item, index) => {
                      return (
                        <li key={index}>
                          <div>{item.auth}</div>
                          <span>{item.content}</span>
                        </li>
                      )
                    })
                  }
                </ul>
              )
          }
        </div>
      </div>
    )
  }
```


> 代码优化
- 因为上面的js逻辑都放在了 html结构里面 就显得很多清晰
- 我们可以把复杂的逻辑放在 方法里 然后在 html结构中 调用方法就可以了
- 注意：
- 这里我们一定要加上小括号 因为我们渲染的是返回值
```js
  <div className="comment-area">
    {
      this.renderList()
    }
  </div>

  renderList = () => {
    return this.props.msg.length === 0 
      ? (<div>暂无评论</div>)
      : (
        <ul>
          {
            this.props.msg.map((item, index) => {
              return (
                <li key={index}>
                  <div>{item.auth}</div>
                  <span>{item.content}</span>
                </li>
              )
            })
          }
        </ul>
      )

    
    ----

    if(this.props.msg.length === 0) {
      return (
        <div>暂无评论</div>
      )
    } 

    return (
      <ul>
        {
          this.props.msg.map((item, index) => {
            return (
              <li key={index}>
                <div>{item.auth}</div>
                <span>{item.content}</span>
              </li>
            )
          })
        }
      </ul>
    )
  }
```


> 三元表达式的连续写法
```js 
  {
    isFirst
      ? <h3>欢迎使用, 输入关键字, 随后点击搜索</h3>
      : isLoading
        ? <h3>Loading...</h3>
        : err 
          ? <h3>{err}</h3>
          : users.map...
  }
```


> 清空文本框
- 如果我们是用受控组件 关联着state我们将state对应的值置空

----------------------------

### 高阶函数 函数柯里化
- 上面的案例中, 我们使用了受控组件的形式, 将input中的值取出来放在了state中, 然后从state中做了展示

- 但是上面的代码还是存在了一些的问题, 我们的案例中只是需要在state中保存uname 和 password, 假如我们的组件是一个注册功能
```js 
  <input type="text" name='uname' onChange={this.saveUname}/>

  saveUname = () => {}
  savePassword = () => {}
```

- 那是不是说我们还需要定义saveUname savePassword saveTel saveMail等方法, 而其目的就是为了在state中保存一个值?

- 所以 我们要想办法 定义一个方法, 在这个方法中 写在state中保存数据的逻辑
- 定义一个 saveFormData 方法

- 但是有问题, 我怎么告诉这个方法 我要在state中保存什么? 保存uname? password? tel? 函数能传递参数, 我们可以通过传参的形式 告诉saveFormData我们要保存什么
```js
  <input type="text" name='uname' onChange={this.saveFormData('uname')}/>
```

- 但是又出现了一个新的问题 我们看看有什么问题
```js 
  <input type="text" name='uname' onChange={this.saveFormData('uname')}/>

  问题1
    该函数react会帮我们直接调用 因为 saveFormData后面加了() 直接调用了

  问题2
    由于我们自己传递了参数, saveFormData('uname') 那么我们类中定义的saveFormData方法 接收到的参数就不是 event对象了

    因为react在帮我们调用方法的时候会传递event, 但是我们自己传的话参数就是我们自己传递的

  问题3
    而且 onChange={this.saveFormData('uname') 这种形式的写法, 也会失去效果
    因为这种写法 是将saveFormData()的返回值 交给onchange做为回调 

    而saveFormData的返回值是undefined 所是react不会帮我们调用undefined 所以就会没效果
```

- 从上面总结的问题上来看, 我们只需要让saveFormData返回一个函数就可以了, 这样交给onChange做为回调的就不再是一个函数的返回值, 而是一个函数
```js 
  saveFormData = () => {
    return () => {}
  }

  // 我们通过实参传递进来的参数在外层形参中接收
  saveFormData = (dataType) => {
    return (event) => {
      this.setState({

        // 这里要注意, {}中的属性名其实都是'字符串'类型, 而我们需要读的是dataType这个变量,  所以要加上[]
        [dataType]: event.target.value
      })
    }
  }

  我们是要在state中添加dataType(我们传递进来的属性名)和值 比如我们传递进来的是 'username'
  但是我们如果这么写
  this.setState({
    dataType: event.target.value
  })

  相当于在 state中保存了 dataType 这个属性名 
  所以我们要将 dataType 改成 [dataType] 这样才能当变量去找值
```


> 高阶函数
- 如果一个函数符合下面2个规范中的任何一个 那么该函数就是高阶函数
  1. 若A函数 接收的参数是一个函数, 那么A就是高阶函数
  2. 若A函数 调用的返回值依然是一个函数, 那么A就是高阶函数

<!-- 
  常见的高阶函数有哪些?
    Promise
    new Promise(() => {})  参数是函数  === > 高阶函数

    setTimeout(() => {})  参数是函数  === > 高阶函数

    数组身上常见的方法都是高阶函数map reduce forEach
 -->


> 函数的柯里化
- 通过函数调用继续返回函数的方式, 实现多次接收参数最后统一处理参数的函数编码形式
```js 
  // 需求 求3个数的和
  function sum(num1, num2, num3) {
      return num1 + num2 + num3
  }

  let res = sum(1, 2, 3)
  console.log(res)        // 6

  // 上面没有用到函数的柯里化


  function sum(a) {
    // sum的返回一个函数接收到一个b
    return (b) => {

        // 它继续返回函数接收到一个c
        return (c) => {

            // 这个函数做的统一处理
            return a+b+c
        }
    }
  }

  let result = sum(1)(2)(3)
  console.log(result)


  // 我们的案例其实就用到了函数的柯里化技术
  saveFormData = (dataType) => {
    return (event) => {
      this.setState({
        [dataType]: event.target.value
      })
    }
  }

  saveFormData接收到了一个参数dataType, 而saveFormData返回的也是一个函数
  而saveFormData返回的函数也接收到了参数event, 最终做了统一的处理

  我们案例中, 我们保存用户名 保存密码 我想共用一个saveFormData方法 如果不用高阶函数 如果不用函数的柯里化 有没有写不下去了?

  比如 这样为什么不行
  saveFormData = (dataType, event) => {

  }

  <input type="text" name='uname' onChange={this.saveFormData('uname')}/>
  // 这个回调是React帮我们调用的 而event也是react帮我们传递的, 所以我们一次性的获取不到所有的参数
```


**复习: 对象相关的知识**
```js 
  let a = 'name'
  let obj = {}

  - 需求:
  - 我想让最后的结果是 {name: 'tom'}

  let a = 'name'
  let obj = {}

  // obj.a = 'tom'
  // console.log(obj)        // { a: "tom" }

  obj[a] = 'tom'
  console.log(obj)            // {name: "tom"}
```


> 完整代码
```js 
  class Login extends React.Component {
      
    // 初始化状态
    state = {
      uname: '',
      password: ''
    }

    render() {
      
      return (
        <form onSubmit={this.handleSubmit}>
          用户名:<input type="text" name='uname' onChange={this.saveFormData('uname')}/>
          密&emsp;码:<input type="password" name='pwd' onChange={this.saveFormData('password')}/>
          <button>Login</button>
        </form>
      )
    }

    // 保存表单数据到state中
    saveFormData = (dataType) => {
      return (event) => {
        this.setState({
          [dataType] : event.target.value
        })
      }
    }

    handleSubmit = (e) => {
      e.preventDefault()
      const {uname, password} = this.state
      console.log(`您输入的用户名: ${uname}, 您输入的密码是: ${password}`)
    }
  }

  ReactDOM.render(<Login/>, document.querySelector('#app'))
```

----------------------------

### 对上面知识点的补充 - 不用柯里化的写法
```js
  saveFormData = (dataType) => {
    return (event) => {
      this.setState({
        [dataType]: event.target.value
      })
    }
  }

  // 上面我们提到了 没办法在 saveFormData 方法中同时接到 dataType和event 因为event不是我们自己传递的 我们要用event.target.value得到input的值

  // 我们将方法改成这样
  saveFormData = (dataType, value) => {
    this.setState({
      [dataType]: value
    })
  }

  // 那怎么同时接到 dataType 和 input的值呢? 假如能接到那么方法内部就不用return函数了
  
  // 怎么写? 
  <input type="text" name='uname' onChange={这里必须交给左边一个函数}/>

  onChange={(event) => {}}
  // 那就给你一个函数, 而且这个函数是react帮我们调用的 那么这个回调就能收到event

  // 那我在这个函数里面是不是可以调用 saveFormData
  onChange={(event) => {this.saveFormData('uname', event.target.value)}}


  // 以上就完成了不用函数柯里化达到的同样的效果
```

----------------------------

### 组件的生命周期
- 生命周期回调函数, 我们自己写了该函数, react在适合的实际帮我们调用

- 这节课里面我们主要引出生命周期函数的应用

- 我们简单的说下需求
- 页面有一个<h3> 有一个<button>用来卸载组件, <h3>每200ms会改变opacity -0.1 当到0的时候一下子opacity会改变为1, 点击<button>后卸载组件

- 我们应该怎么做
- 思路:
- 我们在 state 中创建一个opacity
- 然后关联到标签内部
<!-- 
  页面的改动是因为state中的数据发生了改变, 驱动页面的更新 更新就会调用render函数

  <h3 style={{opacity: this.state.opacity}}>React学不会怎么办?</h3>
 -->

- 然后开启定时器 改变state中的数据, 推动页面的更新

- 但是我们的定时器写在哪里比较合适
- 1. 首先不能直接写在类里!!!
<!-- 
  class Life {

    // 这样会报错
    setInterval(() => {}, 2000)

  }
 -->

- 2. 定义一个自定义方法? 也不行, 我们定义的自定义方法都是事件的回调, 需要点击才能触发, 我们需要放在一个自动会被调用的函数里面

- 3. 选择一: render函数
- 我们尝试一下, 将定时器的逻辑放在的render函数里面, 发生了以下的错误
<!-- 
  无限递归:

  render函数会被调用1+n次, 1是组件挂载到页面上 2只要state里面的数据发生改变 页面也会再次调用render

  我们将定时器放在render里面 会导致定时器越来越快

  因为

  页面一上来 react帮我们new了一个Life实例, 通过这个实例.render就调用了定时器 定时器每隔200ms执行一次 我们在定时器中修改了状态 改了状态之后就会调render 一改状态又一个定时器就开起来了 这就是一个无限循环的递归
 -->

- 4. componentDidMount() 生命周期函数, 我们把定时器放在这里
- 组件挂载到页面之后会调用一次

- 5. 清除定时器的逻辑可以放在 componentWillUnmount() 生命周期函数里
- 该函数将在组件即将被销毁的时候 被调用


> 关于this
- componentDidMount它跟render是同一个级别 componentDidMount是通过实例.的形式调用的 所以componentDidMount里面的this指向的是实例对象

- 所以我们在componentDidMount里可以通过this.timer的形式给定时器加上id
  this.timer =

- 我们在death方法里清除定时器的时候, 由于death方法是事件的回调 该函数是箭头函数加赋值形式 所以里面的this也没有问题



> 完整代码
```js
  class Life extends React.Component {

    state = {
      opacity: 1
    }

    // 组件挂载完成
    componentDidMount() {

      // 这里不能 let timer 因为其它的声明周期函数中拿不到
      this.timer = setInterval(() => {

        // 下面这部分逻辑不能拿到定时器的外部
        let {opacity} = this.state
        opacity -= 0.1
        if(opacity<=0) {
          opacity = 1
        }

        this.setState({opacity})
      }, 200);
    }

    
    // 组件将要被卸载之前 这个钩子没有要被移除
    componentWillUnmount() {
      clearInterval(this.timer)
    }

    death = () => {
      ReactDOM.unmountComponentAtNode(document.querySelector('#app'))
    }



    render() {      
      return (
        <div>
          <h3 style={{opacity: this.state.opacity}}>React学不会怎么办?</h3>
          <button onClick={this.death}>不活了</button>
        </div>
      )
    }
  }

  ReactDOM.render(<Life/>, document.querySelector('#app'))
```


> 总结
> render() 
<!-- 
  该函数会被调用1+n次, 1次为挂载 n为更新
 -->

> componentWillUnmount()
- 组件即将被销毁
<!-- 
  一般做一些收尾工作
 -->

> componentDidMount()
- 组件被挂载完毕

----------------------------

### 生命周期(旧) 组件挂载流程
- 组件从创建到死亡 它会经历一些特定的阶段
- react组件中包含一系列钩子函数, 会在特定的时刻调用
- 我们在定义组件的时候, 会在特定的生命周期回调函数中做特定的工作


### 初始化 | 挂载时 的生命周期 流程图
<!-- 
  挂载时
  第一次会调用  constructor(构造器)

        ↓

  第二次会调用  componentWillMount() 组件将要挂载的时候会被调用
  
        ↓
  
  第三次会调用  render()
  
        ↓
  
  第四次会调用  componentDidMount() 组件挂载完毕的时候会被调用


  // componentWillMount 组件将要出生, 然后使用render挂载, 然后挂载完毕
 -->

> componentWillUnmount()  组件即将被卸载时会被调用

-----

### 更新时 的生命周期 流程图
- 在更新的时候 一共可能会有3条路线

> 路线1: setState - shouldComponentUpdate
- 正常更新的路线 比如我们更新状态里面的数据, 数据一改就驱动着页面的显示
- 正常更新的前提是我们真的去改了状态里面的数据然后引起的更新
<!-- 
      setState()

      ↓

      // 控制组件是否更新的'阀门'
      shouldComponentUpdate()   

      ↓

      // 组件将要更新
      componentWillUpdate()

      ↓

      render()

      ↓

      // 组件更新完毕时调用
      componentDidUpdate()

      ↓

      componentWillUnmount()
 -->

> shouldComponentUpdate: 钩子
- 它是一个阀门, 之前我们说调了setState react帮我们更新状态 更新完之后帮助我们调用render其实之前我们说的不够具体

- 其实我们调用 setState 之后react会调用shouldComponentUpdate, react会问这个钩子 程序员调了setState我们应该不应该更新页面 或 更改状态

- 如果这个钩子返回的是true 那么之后的流程都能走下去 如果是否false就终止

- 它就像一个阀门 返回true就开启, 返回false就关闭
- 如果我们不写这个钩子, 它的默认返回值就是true

      shouldComponentUpdate() {
        return false
      }

- 如果我们返回false的话, 页面不会更新

- 应用场景:
- 比如 我们可以改状态 但是我不希望页面更新 是不是就可以利用这个阀门


> 路线2: forceUpdate - componentWillUpdate
> this.forceUpdate()
- 强制更新

- 正常来说我们必须修改 state 中的数据 页面才会更新 会走上面的生命周期流程 但有些时候我们不改状态里面的数据, 也想更新页面 forceUpdate() 方法就是强制更新的方法

- 我们不对状态进行任何的修改 组件也能更新
- 强制更新就是比正常更新少走了一个环节(阀门阶段没了)

- 强制更新的使用场景:
- 不想对状态修改, 然后还想更新下组件
<!-- 
      // 强制更新
      forceUpdate()
      ↓
      componentWillUpdate()
      ↓
      render()
      ↓
      componentDidUpdate()
      ↓
      componentWillUnmount()
 -->

```js
// 示例:
force = () => {
  this.forceUpdate()
}
```


> 路线3: 父组件render - componentWillReceiveProps
- 我们在案例中做了这样的需求, 定义两个组件A 和 B 
- 我们在A组件中 调用了B组件, 这样AB之间就是父子关系
- 然后我们在A组件中定义了按钮, 用来修改A组件中state中的数据 同时A组件中定义的state中的数据 A组件自己并没有展示

- 然后将该数据使用标签属性props传递给B组件, 在B组件中做了展示

<!-- 
      父组件 render

      ↓

      // 组件将要接收参数 或者 标签属性
      // 组件将要接收props的时候调用
      componentWillReceiveProps(props)
      ↓
      shouldComponentUpdate()
      ↓
      componentWillUpdate()
      ↓
      render()
      ↓
      componentDidUpdate()
      ↓
      componentWillUnmount()
 -->

> componentWillReceiveProps: 钩子
- 我们点击按钮会修改A组件中state中的数据, 也就是父组件更新了state中的数据 会导致render

- 一旦父组件render 就会调用子组件的 componentWillReceiveProps 生命周期

- 但是componentWillReceiveProps有一个坑 第一次传递的标签属性不算, 有人在网上说这个组件的名字应该改成componentWillReceiveNewProps 组件将要接收新的props

- 注意的是 
- 这个钩子是接收到新的props的时候会调用 第一次的不算

- componentWillReceiveProps(props) 是可以接收到传递过来的参数的

      props: carName: '奥拓'


> componentWillReceiveProps(props)
- 参数: props 是一个对象
- 形参: props: {carname: '奥拓', age: 18}

- 坑点：
- 我们在刷新页面 或者说第一次渲染页面的时候 这个钩子不会被调用
<!-- 
  源代码中父组件将数据通过props传递给了子组件 父组件初次渲染 连带子组件渲染
  但是子组件初次渲染的时候 componentWillReceiveProps 被没用被调用
 -->

```js  
  class A extends React.Component {

    state = {
      carname: "奔驰"
    }

    changeCar = () => {
      this.setState({carname: "奥拓"})
    }

    render() {
      let {carname} = this.state
      return (
        <div>
          <h3>我是A组件</h3> 
          <button onClick={this.changeCar}>换车</button>
          <hr />

          // 我们给 B组件传递数据的时候 不能因为同名就使用es6的语法
          <B carname={carname}/> 
        </div>
      )
    }
  }

  class B extends React.Component {

    componentWillReceiveProps(props) {
        console.log("父子关系的组件，父组件在render的时候，我就被调用了")
        console.log(props)  // {carname: '奥拓', age: 18}
      }
    
    render() {
      let {carname} = this.props
      return (
        <div>
          <h3>我是B组件, 我要展示的信息是：{carname}</h3>  
        </div>
      )
    }
  }
```


### 生命周期的总结:
- 生命周期的三个阶段(旧)

> 1. 初始化阶段: 由ReactDOM.render()触发 --- 初次渲染

  1. constructor
  2. componentWillMount
  3. render
  4. componentDidMount ----------- 常用(页面一上来就做点事)
<!-- 
  componentDidMount
      一般在这个钩子中做一些初始化的事情 比如 开启定时器 发送网络请求 订阅消息
 -->


> 2. 更新阶段: 由组件内部 this.setState() 或 父组件 render 触发

  1. shouldComponentUpdate
  2. componentWillUpdate
  3. render
  4. componentDidUpdate


> 3. 卸载组件: 由ReactDOM.unmountComponentAtNode() 触发

  1. componentWillUnmount -------- 常用(一般做一些收尾的事)
<!-- 
  componentWillUnmount
      一般在这个钩子中做一些收尾的事儿, 比如 关闭定时器 取消订阅
 -->

----------------------------

### 对比新旧生命周期
- 我们新版本的react讲的是17.0.1版本的, 应该也算新的了
- 在新版本中还是可以用旧版本的钩子函数的 就是会有警告

> 新版本中需要加前缀使用的 3个钩子
- 下面3个组件前面必须要加上 UNSAFE_前缀 而且18.x版本不能用了
- 记忆方式:
- 所有带Will的钩子 
<!-- 
  除了 componentWillUnmount
 -->

- componentWillMount
- componentWillUpdate
- componentWillReceiveProps
<!-- 
  UNSAFE_componentWillMount
  UNSAFE_componentWillUpdate
  UNSAFE_componentWillReceiveProps
 -->


> 为什么要加上UNSAFE_
- React正在设计异步渲染 react认为上述的三个生命周期函数是过时的
- 这三个生命周期方法经常被误解和滥用, react预计 在异步渲染中 它们潜在的误用的问题可能会更大, 这三个声明周期可能在未来的版本中出现bug 尤其是在推出异步渲染之后


> 挂载时
- 挂载时的新旧对比的结果就是 componentWillMount 的消失 和 新的getDerivedStateFromProps的到来

<!-- 

    旧的生命周期                  新的生命周期

    constructor                 constructor

    componentWillMount(废弃)     getDerivedStateFromProps(新的)

    render                      render

    componentDidMount           componentDidMount

 -->


> 更新时
- getDerivedStateFromProps 它横跨了挂载和更新
<!-- 
  旧的生命周期                  新的生命周期

  componentWillReceiveProps(废弃)     

                                getDerivedStateFromProps(新的)

  shouldComponentUpdate         shouldComponentUpdate

  componentWillUpdate(废弃)

  render                        render

                                getSnapshotBeforeUpdate(新的)

  componentDidUpdate            componentDidUpdate
 -->


> 新 旧 区别
- 新的声明周期 和 旧的生命周期相比 即将废弃了3个钩子, 它又提出2个新的钩子

- getDerivedStateFromProps
- getSnapshotBeforeUpdate
- 上面两个钩子 官方说了 使用的情景及其罕见

----------------------------

### 新版的钩子 getDerivedStateFromProps
- 这个钩子是任何组件在更新 挂载时都会被调用的组件

> static getDerivedStateFromProps(nextProps, prevState)
- 从props中获取state

- 作用:
- 将传入的props映射到state上面。

- 该回调函数接受两个参数 (nextProps, prevState)
- nextProps: 我们在组件标签中 传递的kv
- prevState: 当前组件中state的初始化值

- 特点：
- 1. 这个函数会在render前被调用
<!-- 
  意味着即使子组件的props没有任何变化 而父组件state发生了变化 也会导致子组件重新render

  这个生命周期依然会被调用 看似一个非常小的修改 缺可能导致很多隐含的问题
 -->

- 2. 这个生命周期函数是为了替代componentWillReceiveProps存在的，所以在你需要使用componentWillReceiveProps的时候，就可以考虑使用getDerivedStateFromProps来进行替代了。

- 3. 这个钩子是static修饰的 意味着它不能通过this访问到类中的属性
- 而是应该通过参数提供的nextProps以及prevState来进行判断，根据新传入的props来映射到state。

- 4. 需要注意的是，如果props传入的内容不需要影响到你的state，那么就需要返回一个null，这个返回值是必须的，所以尽量将其写到函数的末尾。


- 注意
- 1. 使用这个钩子的时候 组件必须要有state
- 2. 该方法前 需要加 static 关键字
- 3. 该方法内部必须return null 或者 return 状态对象


> 使用方法:
- 我们从获取到的props中拿到父组件传递过来的数据 和 我们自己组件中的state(子组件)的数据进行对比 如果不一样 就更新state(拿着父组件传递进来的props存到自己组件的state中)
```js 
  static getDerivedStateFromProps(nextProps, prevState) {
      const {type} = nextProps;
      // 当传入的type发生变化的时候，更新state
      if (type !== prevState.type) {

          // 我们要return一个对象
          return { type };
      }
      // 否则，对于state不进行任何操作
      return null;
  }
```

```js 
  state = { count: 0 }
  static getDerivedStateFromProps(props, state) {
    return null

    return { count: 199 }

    // 因为我们可以接收props 作为参数, 所以我们可以让props作为状态对象 注意我们传递的标签属性也要和state中的东西一样

    return props
  }

  ReactDOM.render(<Count count='199' />, document.querySelector('#app'))
```

- 我们把接收到的props return出去 return的是状态对象 相当于我们将父组件传入的props当状态用了 也就是我从props中得到了一个状态 不是我们自己写的状态 而是从props中得到的 这就是一个派生的状态

- 该函数横跨挂载和更新两个阶段 一旦开启该钩子所有的事情都要听props的
<!-- 
  也就是像我们这么写

    static getDerivedStateFromProps(props) {
      return props
    }
 -->

- 那么就是说 我们的状态值在任何时候都取决于props 无论我们的初始化和修改都是不起作用的 完全听props的指挥 但是官方说 派生状态会导致代码冗余 并使组件难以维护


> 总结:
- 一旦我们返回了一个状态对象, 就会以这个对象为主, 页面上的相关状态以后永远也改不了了
- https://www.jianshu.com/p/50fe3fb9f7c3


- 应用场景
- 即state的值在任何时候都取决于props

----------------------------

### 新版的钩子 getSnapshotBeforeUpdate
- 有点像获取快照的钩子, 因为这个钩子会把更新前的一个环节 传递给更新后, 比如更新前的内容区的高度

- 官方推荐的应用场景:
-  在组件发生更改之前从DOM中捕获一些信息(例如 滚动位置) 
  
- 此生命周期的任何返回值将作为参数传递给componentDidUpdate()

  getSnapshotBeforeUpdate() {
    return height
  }

  componentDidUpdate(preProps, preState, height) {
    // 第三个参数就是 getSnapshotBeforeUpdate 返回的参数
  }



> componentDidUpdate(preProps, preState, height)
- 该组件会在组件更新后调用
- 参数
- 1. 组件更新之前的props
- 2. 组件更新之前的state
- 3. getSnapshotBeforeUpdate的返回值

> 注意：
- 如果你在 componentDidUpdate中立即执行了 setState,需要额外注意的是你可能引入了死循环，

- 这是因此每次 setState 都会执行到 componentDidUpdate，然后又进行 setState，

- 从而导致整个应用挂掉。如果真的需要 setState，是必须放在条件中的
```js 
  componentDidUpdate(prevProps) {
    if (this.props.userID !== prevProps.userID) {
      this.fetchData(this.props.userID);
    }
  }
```


> 案例:
- 我们通过一个案例来讲解一下 getSnapshotBeforeUpdate 的应用场景

- 需求
- 我们有一个新闻列表, 每秒都会返回一条新的新闻, 现在的情况就是 新的新闻不断的返回 内容会不断的增加 导致我们想浏览的新闻 没办法保持在一个位置上 供我们浏览

- 我们希望的是 我们滚动 滚动条到一个位置后 这个滚动条的位置保持不动, 供我们浏览新闻, 新返回的数据也在增加
<!-- 
  ------------      我们看的是这里 这里不会动
  新的内容          新的内容会在 --- 的下方不断的增加
  新的内容
  新的内容


  意思是持续的有新的新闻返回  那滚动条的位置就持续的往上串 保持滚动条的位置不改变
 -->


- 在做案例之前 我们看下新版的 更新部分的 生命周期图
<!-- 

          render

          ↓

          getSnapshotBeforeUpdate

          ↓

          componentDidUpdate
 -->

- 我们看下新的生命周期图中的render往下的部分

- render是因为我要更新 调完render之后会调用getSnapshotBeforeUpdate 
  
- 它是更新之前也就说内部还没有被放在页面上调用的getSnapshotBeforeUpdate

- 调用componentDidUpdate就代表 内容已经更新完了已经放到页面上了


- 结合案例:
- getSnapshotBeforeUpdate 和 componentDidUpdate 差了一条新闻 

- 因为是这条新闻渲染前 和 渲染后, 所以我们可以在两个周期中分别获取到盒子的高度 算出差值 动态决定内容区往上或者往下差多少 就能实现新的新闻不断的返回 还不影响我们看新闻


> 完整的代码部分 + 笔记
- 页面在不断的更新(新的新闻会返回) 那就说明state在不断的变化, state驱动页面的更新

- 我们在state中定义一个数组, 然后开启定时器 不断的更新state中的数据, 我们再从state中将数据放到页面上, 驱动页面的更新

- 我们使用定时器来模拟 服务器返回的数据, 这样每一秒在state的数组中添加新闻
- 定时器我们放在 componentDidMount() 函数中 组件一挂载开启定时器

```js
  class NewsList extends React.Component {

    // 初始化 state
    state = {
      newsArr: []
    }

    // 组件一挂载调用的钩子
    componentDidMount() {

      // 每隔一秒钟回来一条新闻
      setInterval(() => {

        // 获取state中新闻数据的原状态
        let { newsArr } = this.state

        // 模拟一条新闻 新闻格式都是新闻加个数字 不希望第一条新闻是0
        let news = '新闻' + (newsArr.length + 1)

        this.setState({
          // 我们把最新的一条新闻放在前面, 原来的新闻也不要丢放到后面
          // newsArr 打头的是新生成的 后面是原来的
          newsArr: [news, ...newsArr]
        })
      }, 1000)
    }
    
    
    //为了保持鼠标滚动滚动到一定位置 就不要继续滚动了 这样我能看到我们自己滚动到的位置的信息 新的新闻也在返回但是不要打断我正在看的新闻12

    // 这种效果的实现就可以利用 getSnapshotBeforeUpdate钩子

    getSnapshotBeforeUpdate() {

      // 在这里获取内容区的高度, 我要知道新的新闻返回之前 内容区有多高 我们给节点打上ref

      // 这个周期中的返回值 会作为参数传递给componentDidUpdate()
      return this.refs.list.scrollHeight
    }

    // componentDidUpdate它能接收3个参数 preProps, preState, height
    componentDidUpdate(preProps, preState, height) {

      // 如果调用componentDidUpdate代表组件已经更新完, 内容区的高度已经增加 所以我们要拿到现在的高度 然后 减去传递过来的高度

      // 这里我们调整内容区往上串多少
      this.refs.list.scrollTop += this.refs.list.scrollHeight - height

        // 这个差值永远是30px 因为一条新闻 渲染前 和 渲染后 如果我们要让滚动条真的停在一个问题 就必须是+= 不能是= +=的意思是持续的有新的新闻回来  那滚动条的位置就持续的往上串

        // 这样完成的效果就是 会停在一个位置 而新返回来的位置 会往下增加, 不会应该我们滚动到的位置
    }

    render() {
      return (
        <div className='list' ref='list'>
          {
            this.state.newsArr.map((item, index) => {
              return <div className='news' key={index}>{item}</div>
            })
          }
        </div>
      )
    }
  }
  
  ReactDOM.render(<NewsList />, document.getElementById('app'))
```


> 总结技巧
- 之前我做过一个点击删除表格中的行, 然后发现 每次点击删除按钮的时候 页面的高度发生了变化, 鼠标还需要重新去找 删除按钮的位置

- 跟上面的案例很像 案例中我希望滚动条的位置 在我调整后就不要再发生变化, 即使有新的数据返回也不要影响, 滚动条的位置

- 上面的理念是
- 控制滚动条的位置 在组件更新后的生命周期里面完成, 也就是说 每次组件更新 都会让滚动条保持在原位置

- 我们先是在 组件更新前 获取到数据没有增加的内容区高度, 组件更新后内容区的高度
```js 
  // 组件更新前
  getSnapshotBeforeUpdate() { 
    return this.refs.list.scrollHeight
  }

  // 组件更新后
  componentDidUpdate(preProps, preState, height) {
    this.refs.list.scrollTop += this.refs.list.scrollHeight - height
  }
```
- 更新后高度 - 更新前的高度 = 数据每次返回的时候 滚动条需要调整的距离

- 要点是 += 这样, +=的意思是持续的有新的新闻回来, 那滚动条的位置就持续的往上串

----------------------------

### 总结声明周期(新)

> 初始化阶段
- 由ReactDOM.render()触发   ----   初次渲染
  - 1. constructor()
  - 2. getDerivedStateFromProps
  - 3. render()
  - 4. componentDidMount()       //常用


> 更新阶段:
- 由组件内部this.setState() 或 父组件重新render触发
  - 1. getDerivedStateFromProps
  - 2. shouldComponentUpdate()
  - 3. render()
  - 4. getSnapshotBeforeUpdate    // 马上更新了想不想拍一个快照啊?
  - 5. componentDidUpdate()

<!-- 
  getDerivedStateFromProps 横跨 挂载 和 更新两大阶段, 我们要用这个方法的时候再调用, 但用的概率几乎很小

  一旦我们用了个这个钩子, 那就意味着 我们state的状态 完全取决于 props
 -->

> 卸载组件:
- 由ReactDOM.unmountComponentAtNode()触发
  - 1. componentWillUnmount()    //常用


> 三个重要的钩子
- 1. render
<!-- 
  初始化渲染 或 更新渲染调用
 -->

- 2. componentDidMount
<!-- 
  开启监听 发送ajax请求
 -->

- 3. componentWillUnmount
<!-- 
  做一些收尾工作 如 清除定时器
 -->


> 即将废弃的钩子
- 1. componentWillMount
- 2. componentWillReceiveProps
- 3. componentWillUpdate
<!-- 
  现在使用会出现警告, 下一个大版本需要加上前缀, UNSAFE_ 才能使用, 以后可能会被彻底废弃, 不建议使用
 -->

----------------------------

### 另一个老师对生命周期的总结
> 组件的生命周期
- 组件的生命周期： 
    组件从被创建到挂载到页面中运行 再到组件不用时的卸载的过程

- 生命周期的每个阶段总是伴随着一些方法的调用 这些方法就是生命周期的钩子函数 

- 钩子函数的作用： 为开发人员在不同阶段操作组件提供了时机


> 生命周期的三个阶段
- 创建时 更新时 卸载时
- render贯穿创建 和 更新

    constructor        
                         newprops  setState  forceUpdate

    -------------      render      ------------

    -------------   更新dom和refs   ------------
    
    componentDidMount        componentDidUpdate      componentWillUnmount


> 创建时(挂载阶段)
- 执行时机
- 组件创建时(页面加载时) 也就是一进页面
- constructor - render - componentDidMount

- constructor
- 创建组件 最先执行 
- 作用
- 初始化state 和 为事件处理程序绑定this
 
- render
- 每次组件渲染都会被触发
- 作用
- 渲染ui 不要在render中调用setState 栈溢出

- componentDidMount
- 组件挂载 完成dom渲染 后
- 作用
- 发送网络请求 DOM操作


> 更新时(更新阶段)
- 有三种情况会导致页面的更新
- 1 newprops 当一个页面接收到新属性的时候 会触发更新 重新渲染
<!-- 
  - 当父组件更新的时候 因为我们把最新的state会传递给子组件 所以子组件也会更新
 -->

- 2 调用setState的时候 会重新渲染

- 3 调用forceUpdate的时候 会重新渲染 只要调用它不管状态有没有更新都会重新渲染的
<!-- 
  handleClick = () => {
    this.forceUpdate()
  }
 -->


> 更新阶段 钩子函数的执行顺序
- render -- componentDidUpdate

- render
- 每次组件渲染都会触发
- 作用
- 渲染ui

- componentDidUpdate
- 组件更新 完成dom渲染 后 被触发
- 作用
- 1 发送网络请求
- 2 dom操作 
- 注意: 如果在这个函数中进行setState操作 必须放在一个if条件中
<!--
    componentDidUpdate(prevProps) {
        这里可以获取渲染后的最新dom

        网络请求
        如果要调用setState更新状态 必须放在一个if条件中 不然会栈溢出 死循环
        在这里我们一般判断一下更新前后的props是否相同 来决定是否调用setState更新组件
        当前的props 可以通过this.props获取到
        如果上一次的props 和 这一次的props不同 我再调用setState来更新状态
        if(prevProps.count !== this.props.count) { 
            this.setState 

            发送网络请求也写在if判断里面
            既然要发送请求就是为了拿数据 拿数据就会有渲染数据的逻辑 这里也会有setState的操作
        }
    }
 -->


> 卸载时(卸载阶段)
- 执行时机： 组件从页面中消失的时候就会触发对应的钩子

- componentWillUmmount
- 作用：
- 执行清理工作 比如 清理定时器等

<!-- 
  // 没什么关联的功能 就是想记录下 三元表达式 的结构渲染
  return (
    <div>
      {
        this.state.count > 3 
          ? (<p>豆豆被打死了</p>)
          : (<Count count={this.state.count}>)
      }
    </div>
  )

  componentDidMount() {
    this.id = setInterval()
  }

  componentWillUnmount() {
    clearInterval(this.id)
  }
 -->

 > 不常用的生命周期函数
 - 在旧版的生命周期中 有即将要废弃的生命周期函数
 - 1. componentWillMount
 - 2. componentWillReceiveProps
 - 3. componentWillUpdate


 - 在新版的生命周期中 
 - 1. getDerivedStateFromProps
 - 2. getSnapshotBeforeUpdate
 - 3. shouldComponentUpdate
 - 虽然是官方出来的新的钩子 但是使用场景特别的少 还可以使用其它的场景代替这两个钩子 所以不太使用

----------------------------

### 书签

----------------------------

### 组件的复用 -- render-props 和 高阶组件(HOC) 

> react组件复用概述
- 思考：
- 如果两个组件中的部分功能相似 或 相同 该如何处理
- 一个A页面中 随着鼠标的移动 页面上会打印 鼠标的坐标
- 一个B页面中 随着鼠标的移动 小猫图片会跟着鼠标一起走

- 这两个页面中有共通的部分 我们复用的时候 需要复用什么呢？
- 复用鼠标的坐标
- 鼠标的坐标在react中的体现就是一个状态 而且这个状态还会发生变化 还有操作状态的方法

- 1. 复用状态 
- 2. 复用操作state的方法

- 那在react中怎么进行组件逻辑的复用呢？
- 我们可以通过 render props 和 高阶组件的模式

- 注意
- 这两种方式不是新的api 而是利用react自身特点的编码技巧 演化而成的固定模式(写法)
<!-- 
  本来是没有这种方式的但是前人发现这种写法很好用 所以总结出来的
 -->

- 那怎么写代码是 render props模式 和 高阶组件的模式呢？


> render props 模式  循环一圈半
- 要点：
- 1. 子组件利用形参将子组件内部的数据传回去(父组件)
- 2. 子组件利用返回值渲染结构
- 3. 父组件拿到数据 创建返回值
<!-- 
      函数props

          父组件
  (利用形参 -- 创建返回值结构)   

                      ↘ 2 利用形参 -- 创建返回值结构
        传回数据 1 ↖
                          ↘ 3 利用返回值渲染结构

                      子组件
              (利用形参传回数据 -- 利用返回值渲染结构)
 -->


- 思路：
- 将要复用的state和操作state的方法封装到一个组件中 
- 假设 我们封装好了一个组件 <Mouse /> 这里面有鼠标的状态 和 操作鼠标的方法

- 我们要在B页面中使用A页面关于鼠标状态(位置信息)和操作state的方式，然后我们将A页面中的关于鼠标的逻辑封装成了一个组件
<!-- 
  原生js中 想要达到复用是不是也是将相同的逻辑封装函数 然后在别的页面调用

  现在我们把相同的state和操作state的方法封装成了组件 但是怎么在另一个页面使用呢？ 直接引入？？ 又不是页面结构
 -->

- 但是又会产生新的问题 怎么复用呢？我们先思考两个问题


> 1. 如何拿到该组件中复用的state
> 传递函数prop 通过形参接收 组件内部的state
<!-- 
  状态是存在组件内部的 那么我们要使用这个 <Mouse /> 内部的状态 怎么办？
  也就是在外部拿到内部的state
 -->

 - 思路：
 - 在使用组件的时候 添加一个值为函数的prop 通过函数参数 来获取(需要组件内部实现)
 <!-- 
  也就是父组件传递函数通过形参接收子组件的state
  -->


> 2. 如何渲染任意的ui结构？
> 传递函数prop 通过该函数的返回值 来决定要渲染的ui结构
- 我们拿到核心功能后 怎么使用核心功能来渲染不同的ui结构呢？
- 使用该函数的返回值 作为要渲染的ui内容(需要组件内部实现)

<!-- 
  A组件中的ui结构是 文本信息： 当前鼠标坐标为：x y
  B组件中的ui结构是 小猫图片

  怎么渲染指定的ui呢？

  <Mouse render={(mouse) => {}}>
  我们向 Mouse组件传递一个 函数prop

  我们可以通过 
  mouse形参 接收到state
  
  通过
  这个函数prop返回值来作为要渲染的内容

  类似这样

  <Mouse render={ (mouse) => (
    <p>鼠标当前位置: {mouse.x}, {mouse.y}
  ) }>

  我们假如要渲染文本 我们就在return中写上p标签里面写上文本
  我们假如要渲染图片 我们就在return中写上图片
 -->

> 呃 react中插槽的综合应用么？ 相当于作用域插槽

- 接下来我们看看代码部分
> 实现步骤
- 1. 创建Mouse组件 在组件中提供复用的状态逻辑代码(1状态 2操作状态的方法)
<!-- 
  import React, {Component} from "react"
  export default class Mouse extends Component {

    // 鼠标的位置的状态信息
    state = {
      x: 0,
      y: 0,
    }

    // 操作状态的方法 当鼠标移动的时候 状态会更新
    // 监听鼠标移动事件
    componentDidMount() {
      window.addEventListener("mousemove", this.handleMouseMove)
    }

    handleMouseMove = (e) => {
      this.setState({
        x: e.clientX,
        y: e.clientY
      })
    }

    render() {
      // 复用组件的ui结构是看父组件函数的返回值
      return this.props.render(this.state)
    }
  }
 -->


- 2. 将要复用的状态作为 props.render(state)方法的参数 暴露到组件外部
- 在Mouse组件内部 render函数里面 return 后面的位置 调用 父组件传递进来的 prop函数
- 要点
  - 1. 我们可以将Mouse组件中的state通过父组件传递进来的 prop函数 通过实参 将state暴露出去
  - 2. 写在render的后面 就可以让父组件决定 Mouse 组件来渲染什么样的ui结构
  - 3. 使用 props.render()的返回值作为要渲染的内容
  - 要渲染什么内容由父组件的prop函数的返回值决定
<!-- 
  class Mouse extends Component {
    // ... 省略state和操作state的方法

    render() {
      return this.props.render(this.state)
    }
  }
 -->

<!-- 
  // app组件 在html结构中的render函数 的返回值 决定 Mouse组件渲染什么ui结构

  import React, {Component} from "react"
  import Mouse from "./components/Mouse"
  import "./App.less"
  export default class App extends Component {
    
    // 这部分逻辑是为了获取 img的高度和宽度
    state = {
      imgW: 0,
      imgH: 0
    }

    componentDidMount() {
      let {img} = this
      this.setState({
        imgW: img.clientWidth,
        imgH: img.clientHeight
      })
    }

    render() {
      return (
        <div className="app-wrap">

          {/* 文本展示 */}
          <Mouse render={mouse => {
            return (
              <p>
                鼠标位置: {mouse.x} - {mouse.y}
              </p>
            )
          }}/>


          {/* 猫捉老鼠 */}
          <Mouse render={mouse => {
            return (
              <img src={cat} alt="cat" style={{
                position: "absolute",
                top: mouse.y - this.state.imgH / 2,
                left: mouse.x  - this.state.imgW / 2
              }} />
            )
          }}/>
        </div>
      )
    }
  }
 -->


- 上面我们通过父组件向子组件传递函数 通过形参接收数据 通过返回值确定ui结构的方式来实现的

- 但是 并不是该模式叫render props 就必须使用名为render的prop 实际上可以使用任意的prop

- 上面是把prop是一个函数 并且告诉组件要渲染什么内容的技术 叫做 render porps模式


> children 代替 render 属性 --- 推荐
<!-- 
  <Mouse>
    {
      // 这个位置是函数的返回值 是一个结构 所以要加上括号
      ({x, y} => <p>鼠标的位置是: {x} - {y} </p> )
    }
  </Mouse>

  // Mouse组件内部：
  this.props.children(this.state)
 -->

> 代码部分：
<!-- 
  // Mouse组件

  render() {
    return (
      <div>
        <h3>我是mouse组件</h3>
        <div>
          {this.props.children(this.state)}
        </div>
      </div>
    )
  }



  // App组件
  return (
    <div className="app-wrap">
      {/* 文本展示 */}
      <Mouse>
        {
          ({x, y}) => {
            return (
              <p>
                鼠标坐标为: {x} - {y}
              </p>
            )
          }
        }
      </Mouse>
    </div>
  )
 -->

- 这里我们在联想一下 context 中用法 这里其实也是使用的render props模式 并且使用的是children的模式
<!-- 
  <Consumer>
    {
      data => <span>data表示接收到的数据</span>
    }
  </Consumer>
 -->


> render props 模式的 优化
- 1. 给 render props 模式添加 props 校验
<!-- 
  Mouse.propTypes = {
    children: PropTypes.func.isRequired
  }
 -->

- 2. 应该在组件卸载的时候 接触 mousemove 事件绑定
<!-- 
  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove)
  }
 -->

----------------------------

### 高阶组件 实现状态逻辑复用
- 目的：
- 实现状态逻辑复用，采用 包装(装饰)模式 比如说：手机壳 

- 手机：为了获取保护功能
- 手机壳：提供保护功能
- 包装之后 手机就具备了原来手机所不具备的功能

- 高阶组件就相当于手机壳 通过包装组件 增强组件功能 

> 思路分析：
- 高阶组件(HOC hgiher-order component)是一个函数 它的返回值为增强功能后的全新组件
- 高阶组件函数内部需要：
    + 形参(UI组件) 
    + 函数内部类(提供可复用的逻辑 比如鼠标位置 state数据)
    + 在内部类中的render函数里面 调用 UI组件 并传入 state数据

<!-- 
  EnhanceComponent为返回的增强功能后的组件
  const EnhanceComponent = withHoc(WrappedComponent)
 -->

- 高阶组件的内部创建一个类组件 在这个类组件中提供复用的状态逻辑 通过prop将复用的状态传递给被UI组件 WrappedComponent

<!-- 
  const EnhanceComponent = withHoc(WrappedComponent)

  function withHoc(WrappedComponent) {

    - 这个组件 只是为了提供可复用的逻辑代码 自身不渲染ui结构
    - 负责渲染 ui结构的还是 WrappedComponent 组件
    class Mouse extends React.Component {
      render() {

        // 这样 WrappedComponent 就能拿到 x y 的坐标了
        return <WrappedComponent {...this.state}>
      }
    }
  }

  withHoc(UI组件 or html结构组件)
 -->


> 总结下思路
- 1. 高阶组件的使用是在 App组件(类外声明一个函数 跟app一个文件)
    该函数接收一个 UI结构 的组件形参


- 2. 函数内部要创建一个类  
    该类的作用是提供复用的逻辑 比如鼠标位置 state数据
    最后将创建的类return出去

    在该类的渲染结构的 render函数中 调用 UI类(传入的形参组件) 并将state数据传入到UI组件中
    UI组件内部利用数据（父组件state中的数据是实时更新的） 渲染UI结构

  
- 3. 在App类外 创建变量接收函数返回的增强功能后的组件
    并在App组件的render函数中调用



> 使用步骤
- 1. 创建一个函数， 名称约定以with开头
<!-- 
  该函数就是一个壳，用来返回内部类组件的

  假如我们起名为widthXxx 那么该函数内部就创建一个Xxx的类组件
 -->

- 2. 指定函数参数，参数应该以大写字母开头(作为要渲染的组件)
<!-- 
  这个参数是要被渲染出来的 组件就要以大写字母开头
 -->

- 3. 在函数内部创建一个类组件，提供复用的状态逻辑代码 并返回
- 这步是在组件的上面创建的一个函数 比如我们要在app组件中 渲染一个状态可复用的ui结构组件

- 那么我们就将高阶组件和app写在一个文件里
<!-- 
  function withMouse(WrappedComponent) {

    class Mouse extends Component {
      ....
    }

    return Mouse
  }
 -->

- 4. 在该组件中，渲染参数组件 同时将状态通过prop传递给参数组件
<!-- 
  Mouse组件中 render方法里
  return <WrappedCompent {...this.state}>
 -->

- 5. 调用该高阶组件 传入要增强的组件(要使用复用逻辑带ui结构的组件) 通过返回值拿到增强后的组件 并将其渲染到页面中
<!-- 
  // App组件内部的逻辑
  import React, {Component} from "react"

  // 引入要渲染的ui组件
  import MouseUI from "./components/MouseUI"

  import "./App.less"

  // 创建高阶组件
  // 参数为 ui组件 我们要在这个函数内部的类组件 将状态和状态的方法 通过props传递到ui组件中
  function withMouse(WrappedComponent) {

    // 这个组件中提供要复用的逻辑
    class Mouse extends Component {
      
      // 这个组件中提供状态 和 提供修改状态的逻辑
      state = {
        x: 0,
        y: 0
      }

      handleMouseMove = (e) => {
        this.setState({
          x: e.clientX,
          y: e.clientY
        })
      }

      // 控制鼠标状态的逻辑
      componentDidMount() {
        window.addEventListener("mousemove", this.handleMouseMove)
      }

      componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove)
      }


      // ui结构是通过传递进来的参数决定的
      render() {
        return (
          <WrappedComponent {...this.state}></WrappedComponent>
        )
      }
    }

    return Mouse
  }


  // 获取增强后的组件
  // 将ui组件当做实参传递进去 得到一个新的组件 也就是加工后的组件
  let MousePosition = withMouse(MouseUI)

  // 将加工后的组件渲染出来
  export default class App extends Component {
    render() {
      return (
        <div className="app-wrap">
          <MousePosition />
        </div>
      )
    }
  }




  // ui结构组件 
  也就是我们将这个组件作为实参传递进去它就会接收到 上面传递进来的props

  import React, {Component} from "react"
  export default class Position extends Component {

    render() {
      return (
        <div>
          鼠标当前位置: x: ${this.props.x}, y: ${this.props.y}
        </div>
      )
    }
  }


  // 猫捉老鼠的组件  函数组件
  import img from ""
  const Cat = props => (
    <img src={img} alt="" style={{
      position: "absolute",
      top: this.props.y,
      left: this.props.x,
    }}>
  )

  这个组件自身是没有状态和操作状态的逻辑的 鼠标的逻辑代码封装在高阶组件里面了
 -->

> 设置displayName
- 使用高阶组件存在的问题：
- 得到的两个组件名称是相同的
<!-- 
  假如我们多次通过高阶组件来返回新组件的话 它们的名字都会是同一个
  因为高阶组件函数的返回值 是同一个 需要参数不一样
  
  上面的高阶组件函数 内部都是一个 class Mouse 。。。 组件
  多次调用后 所有使用高阶组件的地方 在开发者工具中看的话 都会是
  <Mouse />
  <Mouse />
 -->

- 因为默认情况下 react是根据 组件名称作为 displayName 的
- 解决方式：
- 为高阶组件 设置 displayName 便于调试时区分不同的组件

> displayName的作用：
- 用于设置调试信息(React Developer Tools信息)

 
> 设置方式
- 在高阶组件函数 return前设置
<!-- 
  Mouse.displayName = `withMouse${getDisplayName(WrappedComponent)}`

  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component"
  }
 -->

<!-- 
  // App组件
  // 创建高阶组件
  function withMouse(WrappedComponent) {

    class Mouse extends Component {
      state = { x: 0, y: 0 }

      handleMouseMove = (e) => {
        this.setState({
          x: e.clientX,
          y: e.clientY
        })
      }

      componentDidMount() {
        window.addEventListener("mousemove", this.handleMouseMove)
      }

      componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove)
      }

      render() {
        return (
          <WrappedComponent {...this.state}></WrappedComponent>
        )
      }
    }

    // 设置displayName 注意 WithMouse 是大写 因为它要作为组件的名称在开发者工具中呈现
    Mouse.displayName = `WithMouse${getDisplayName(WrappedComponent)}`
    return Mouse
  }

  // 预定义的函数
  function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || "Component"
  }

  // 获取增强后的组件
  let MousePosition = withMouse(MouseUI)

  export default class App extends Component {
    render() {
      return (
        <div className="app-wrap">
          <MousePosition />
        </div>
      )
    }
  }
 -->


> 高阶组件 向高阶组件(我们封装后的组件 MousePosition)传递props
- 问题：props丢失
- 我们向 MousePosition 高阶组件 传递了 props
- MousePosition其实是 withMouse 的返回值 它的返回值是 Mouse
- MousePosition -- withMouse -- Mouse

- 也就是说我们给 Mouse 传递了 a="1" 的props
- 但是 Mouse 并没有再将 prop 传递给 它的WrappedComponent组件

<!-- 
  let MousePosition = withMouse(MouseUI)

  export default class App extends Component {
    render() {
      return (
        <div className="app-wrap">
          <MousePosition a="1"/>
        </div>
      )
    }
  }
 -->

- 那我们要想向高阶组件传递 prop 的时候怎么办？
- 解决方式：
- 渲染 WrappedComponent 时 将state 和 this.props 一起传递给组件
<!-- 
  <WrappedComponent {...this.state} {...this.props}>


  function withMouse(WrappedComponent) {

    class Mouse extends Component {
      state = { x: 0, y: 0 }

      handleMouseMove = (e) => {
        this.setState({
          x: e.clientX,
          y: e.clientY
        })
      }

      componentDidMount() {
        window.addEventListener("mousemove", this.handleMouseMove)
      }

      componentWillUnmount() {
        window.removeEventListener("mousemove", this.handleMouseMove)
      }

      render() {
        return (
          <WrappedComponent {...this.state} {...this.props}>
        )
      }
    }
 -->

**在使用高阶组件的时候**
- 不仅仅要传递 state 再传递个 props

----------------------------

### setState() 说明

> setState更新数据的时候是异步的
- setState这个方法本身是同步的方法 只要我们调用立马在主线程上执行
- 但是setState引起react的后续的更新动作是异步的更新
<!-- 
  this.state = {count: 1}
  
  this.setState({
    count: this.state.count + 1
  })
  // 如果在setState方法之后立即调用了console 我们发现是修改之前的值
  console.log(this.state.count)   // 1
 -->

- 说明这个方法是调用了 但是状态并没有立即改变 更新数据是异步的

- 所以 我们需要注意的是 后面的setState 不要依赖于前面的setState
<!-- 
  handleClick = () => {

    // 这里我们连续的调用两次 setState 会怎么样
    this.setState({
      count: this.state.count + 1
    })

    this.setState({
      count: this.state.count + 1
    })
  }

  虽然我们调用了两次 但结果是2 也就是说 state中的count 值只加了一次

  第一次调用的时候 setState肯定是会更新为2的但是它的更新时异步的
  紧接着我们再次的调用 第二次setState中的count值也是1 
  也就是第二次中setState 还是 1+1

  虽然我们调用了2次 但是后面的setState并没有依赖于第1次的结果 也就是说并不是 拿到第一次setState的结果2 再进行+1的
 -->

- 我们是可以调用多次的 setState 但是只会触发一次render 也就是只会触发一次重新渲染

- 因为要考虑到性能 如果我们调用了一次setState就render一次 再调一次 再render一次 性能上会不好 所以 实际上它会将多次调用的setState最终合并 将最终的结果一次性的调用render方法 将最终的结果渲染到页面中


> setState((state, props) => { return 状态对象 }, 状态更新后立即执行的回调)   推荐语法
- 上面说了 如果调用了两次setState后面的是无法基于第一次setState的结果去做一些操作的

- 回调中的return里 原先的state对象 return { }
- 参数：
- state: 表示最新的state 总为最新的state 依赖于上次的state的结果
- props: 标表示最新的props
<!-- 
  这个方法跟普通的方式没有什么区别也是异步更新数据 但是

  state总是为最新的state 也就是说 假如我们调用两次setState后 第二次setState中的state参数是最新的数据 也就是基于第一次setState的结果
 -->

<!-- 
  this.setState((state, props) => {
    return {
      count: state.count + 1    // 2
    }
  })

  this.setState((state, props) => {
    return {
      count: state.count + 1    // 3
    }
  })
 -->


> setState的第二个参数
- 上面我们将setState方法的第一个参数由普通对象 改写为回调的形式
- 这里我们再说说第二个参数

- 场景
- 在状态更新(页面dom完成重新渲染)后立即执行某个操作 像不像this.$nextTick
<!-- 
  状态更新后 并且页面重新渲染后 立即执行
  比如我们要想操作dom的话 在回调中写逻辑
 -->

- 语法：
- this.setState(
  (state, props) => { return {} },
  () => {  console.log(这个回调会在状态更新后立即执行) }
)

<!-- 
  // 当状态更新后 操作dom 比如更新页面的标题
  this.setState(
    (state, props) => {},
    () => {
      document.title = "更新state后的标题:" + this.state.count
    }
  )
 -->

----------------------------

### 组件的性能优化
> 1. 减轻state
- 只存储跟组件渲染相关的数据(比如 count 列表数据 loading)
- 注意
- 不用做渲染的数据 不要放在state中 比如定时器的id等

- 对于这种需要在多个方法中用到的数据 应该放在this中
- 因为state中的数据越多 react在渲染的时候性能就会越低


> 2. 避免不必要的重新渲染
- 组件的更新机制 父组件更新会引起子组件也被更新 这种思路很清晰
- 但是这种方式也会造成一个问题 就是如果子组件没有任何变化时 也会重新渲染

- 解决方式：
- 使用钩子函数 shouldComponentUpdate(nextProps, nextState)
- 组件是否应该重新渲染
- 参数：
- nextProps nextState 表示最新的(更新后)props 和 state
- 这个钩子函数中 this.state this.props是更新之前的状态

- 作用
- 通过这个钩子函数的返回值决定该组件是否重新渲染 返回true重新渲染 false表示不重新渲染 false后render不会执行

- 钩子函数触发时机
- 更新阶段的钩子函数 组件重新渲染前执行 shouldComponentUpdate - render

<!--  
  class Hello extends Component {

    shouldComponentUpdate(nextProps, nextState) {

      // 根据条件 决定是否重新渲染组件

      // 在这个钩子函数中 通过this.state 和 this.props获得的是更新之前的state和props

      // 我们可以根据nextState 和 this.state 来决定是否更新组件

      return false
    }

    render() {}
  }
 -->


> 避免不必要的重新渲染的案例 -- 随机数
- 我们创建一个点击按钮生成1-3随机数的功能
- 同时 我们思考一下 如果这一次随机数是2 上次的也是2 那页面还用更新么？ 没有必要吧
<!-- 
  export default class App extends Component {

    state = {
      num: 0
    }

    randomNum = () => {
      let rnum = Math.floor(Math.random() * 3)
      this.setState(() => {
        return {
          num: rnum
        }
      })
    }

    // 因为两次生成的随机数可能相同 如果相同 此时没有必要重新渲染
    shouldComponentUpdate(nextProps, nextState) {

      console.log("最新state 或者说 更新后：", nextState, "更新前的state:", this.state)

      // 判断两次的state是否相同 如果相同 没有必要更新
      if(nextState.num === this.state.num) {
        return false
      } 
      return true

      // 优化
      if(nextState.num !== this.state.num) {
        return true
      } 
      return false

      // 优化
      我们看看下面的条件是否成立 如果成立就会是true 如果不成立就会是false
      反向思维方式 要理解这个地方先看看上面的逻辑 一步一步的优化到这里
      return nextState.num !== this.state.num
    }

    render() {
      console.log("render")
      return (
        <div className="app-wrap">
          <h3>随机数：{this.state.num}</h3>
          <button onClick={this.randomNum}>重新生成</button>
        </div>
      )
    }
  }
 -->


> 当状态不在组件自身的时候
- 上面的案例中是通过 shouldComponenUpdate 生命周期中的state来阻止了不必要的页面更新 接下来我们看看 怎么通过 props 来实现

- 我们在子组件中 添加 shouldComponentUpdate 
<!-- 
  class ChildrenComponent extends Component {

    // 如果前后两次的props不相同 我们就让组件更新
    shouldComponentUpdate(nextProps) {
      return nextProps.num !== this.props.num
    }
  }
 -->

- 总结：
- 如果状态是自己的 那我们就使用 state 来做判断
- 如果状态不是自己的 那我们就使用 props 来做判断


### 纯组件 React.PureComponent
- 上面我们为了避免渲染不必要的更新使用了 shouldComponentUpdate 钩子
- 我们还可以在创建类组件的时候 继承 React.PureComponent 实现同样的逻辑

- class App extends React.PureComponent { ... }

- React.Component 和 React.PureComponent 的区别就是React.PureComponent 中以浅层对比 prop 和state 的方式来实现了该函数。

- 纯组件内部的对比是 shallow compare (浅层对比)


> 值类型：
- 比较两个值是否相同(直接赋值即可 没有坑)
<!-- 
  let num = 0
  let newNum = num

  newNum = 2
  console.log(num === newNum)    // false
 -->

- 如果state中有一个变量也是值类型的 那么我们可以给state中的变量直接赋值是没有坑的 比如
<!-- 
  state = { num: 0}
  setState({
    num: Math.floor(Math.random() * 3)
  })

  PureComponent 内部对比
  最新的state.num == 上一次的state.num  // false 重新渲染组件
 -->


> 引用类型:
- 对于 引用类型 来说 只比较对象的引用(地址)是否相同
<!-- 
  const obj = {num: 0}
  const newObj = obj
  newObj.num = 2
  console.log(newObj === obj)  // true
 -->

- 解析
- 我们使用的是引用类型的数据 当我们把引用类型赋值个一个新的变量的时候 实际上obj和newObj都会指向同一个对象

- 不管是通过哪个变量修改了这个对象的值 改的都是同一个对象 最终我们在进行比较的时候 obj 和 newObj 还是相同的

- 但是这种方式用在了react的state里的时候 就会出问题

<!-- 
  // 错误的写法
  state = {
    obj: {num:0}
  }

  handleClick = () => {

    // 如果我们通过这样的形式直接修改了 state 中的数据
    const newObj = this.state.obj
    newObj.num = Math.floor(Math.random() * 3)

    // 然后将newObj赋值给了obj 其实这里他们两个是同一个对象
    this.setState(() => {
      return {
        obj: newObj
      }
    })
  }
  
  // 将来 PureComponent 内部比较的时候 拿着最新的和上一次的比较的时候
  // 因为是浅比较
  最新的state.obj === 上一次的state.obj   // true
 -->

- 上面就是浅对比对引用类型的影响
- 所以 在state 或 props 中属性值为 引用类型的时候 应该创建新数据 不要直接修改原数据
<!-- 
  // 正确的做法 创建新数据
  const newObj = {...this.state.obj, num: 2}
  setState({obj: newObj})

  // 数组 不要使用push等直接影响原数组的方法 要使用concat slice等返回新新数组的方法
  this.setState({
    list: [...this.state.list, {新数据}]
  })
 -->

----------------------------

### DOM的diffing算法
- React最大的优势就是 它不是每一次都将页面上的真实DOM做出修改 每一个真实的DOM都是对应一个虚拟DOM的

- 当生成一个新的虚拟DOM树 它会和 旧的虚拟DOM树 进行比较, 如果有没有变化的虚拟DOM, 那么页面上这两个虚拟DOM对应的真实DOM是没有任何改变的, 只把新增加的一条映射成新的真实DOM

<!-- 
    虚拟DOM                               真实DOM

    // 旧的虚拟DOM树
    001对应的虚拟DOM    --- 复用
    002对应的虚拟DOM    --- 复用
    

    // 新的虚拟DOM树
    001对应的虚拟DOM    --- 复用
    002对应的虚拟DOM    --- 复用

    003对应的虚拟DOM  -- 对比结果(新)   --- 渲染
 -->

- 也就是说 每次更新页面的时候 新的虚拟DOM树都会对上一次(旧)的虚拟DOM树进行对比, 看看有没有不一样的节点, 如果有更新新的节点, 复用没有变化的节点

> 验证上面说的对不对
- 我们在页面中放3个结构, 结构3是一个定时器来展示的数据, 每秒更新一次
- 我们先说下结果 就是 结构1 和 结构2被复用, 而结构3会更新
- 怎么验证:
- 我们在结构2中的文本框中输入文字, 如果 每次文字都消失, 证明input每次都是新的
- 如果没有消失证明结构2被复用
  - 结果: 文字没有消失

- 我们在看看<span> 中的 <input>是被复用还是每次都随着<span>更新
  - 结果: 文字没有消失
  - 疑问:
  - 不是说 diffing 算法最小的更新单位是 节点么? 那为什么不连着内部的<input>一起更新呢?

  - 答案:
  - diffing算法并不是只比较一层, 而是标签内部还有标签的时候 也会对子标签进行 新旧的虚拟DOM树对比, 如果子标签对比结果没有变化 子标签也会复用
<!-- 
  // 结构1
  <h1>hello</h1>        

  // 结构2
  <input type="text" /> <br /><br />

  // 结构3
  <span>
    现在是: {this.state.date.toTimeString()}
    <input type="text" />
  </span>
 -->


> 验证用的代码
<!-- 
  class Time extends React.Component {

      // 状态里面维护着时间
      state = { date: new Date() }

      // 一挂载开启定时器
      每一次都把最新的时间放进去 state发生改变 页面就会更新
      componentDidMount() {
        setInterval(() => {
          this.setState({
            date: new Date()
          })
        }, 1000)
      }

      render() {
        return (
          <div>
            <h1>hello</h1>

            <input type="text" /> <br /><br />

            <span>
              现在是: {this.state.date.toTimeString()}
              <input type="text" />
            </span>
          </div>
        )
      }
    }

    ReactDOM.render(<Time />, document.querySelector('#app'))
 -->


> 总结:
- diffing算法是逐层对比 最小的力度是标签

----------------------------

### 经典面试题
- 1. react / vue 中的key有什么作用? (key的内部原理是什么)
- 2. 为什么遍历列表的时候, key最好不要用index
<!-- 
  上面是一个问题的两种问法
 -->

> 回答:
- 1. 虚拟DOM中key的作用
  - 1.1 简单的说: 
    key是虚拟DOM对象的标识, 在更新显示的时候 Key起来及其重要的作用

  - 1.2 详细的说:
    当状态中的数据发生变化的时候, react会根据'新数据'生成'新的虚拟DOM' 随后React进行'新虚拟DOM'与'旧虚拟DOM'的diff比较, 比较规则如下

      a: 旧虚拟DOM中找到了与新虚拟DOM相同的key
        aa: 若虚拟DOM中的内容没有变, 直接使用之前的真实DOM
        bb: 若虚拟DOM中的内容变了, 则生成新的真实DOM 随后替换掉页面中之前的真实DOM

      b: 旧虚拟DOM中未找到与新虚拟DOM相同的key
        根据数据创建新的真实DOM 随后渲染到页面


- 2. 用index作为key可能会引发的问题 (在数组的前面添加就会出现破坏顺序操作)
  - 2.1 若对数据进行: 逆序添加, 逆序删除等破坏顺序操作 
      会产生没有必要的真实DOM更新 --- > 界面效果没问题 但效率低

  - 2.2 如果结构中还包含输入类的DOM
      会产生错误DOM更新 --- > 界面有问题

  - 2.3 注意:
      如果不存在对数据的逆序添加 逆序删除等破坏顺序操作
      仅用于渲染列表用于展示, 使用index作为key是没有问题的

- 3. 开发中如何选择key
  - 3.1 最好使用每条数据的唯一标识作为key, 比如id 手机号, 身份证号, 学号等唯一值
  - 3.2 如果确定只是简单的展示数据, 用index也是可以的
<!-- 
  数据的唯一标识就应该是后端给我们处理好的
 -->



- 案例:
- 我们在页面中创建一个列表
- 然后做一个按钮, 点击后向列表中添加小王的信息
<!-- 
  <h3>展示人物信息</h3>

  \ 添加一个小王 \      按钮

  小张, 18         小王, 20  
  小李, 19         小张, 18 
                  小李, 19 


  <ul>
    {this.state.persons.map((item, index) => {
      return <li key={index}>{item.name}, {item.age}</li>
    })}
  </ul>

  注意 我们的key是用的index, 看似页面上正常显示了, 控制台也没有报错, 但是有很严重的问题 有严重的效率问题

  慢动作回放 --- 使用index索引值做key

  初始state数据:
    { id: 1, name: '小张', age: 18 },
    { id: 2, name: '小李', age: 19 }

  ↓

  初始的虚拟DOM
    几条数据? 2条, 几条虚拟DOM? 2条, 先遍历的是0 后遍历的是1
    <li key={0}>{小张}, {18}</li>
    <li key={1}>{小李}, {19}</li>

  ↓

  将虚拟DOM(初始的)转为真实DOM挂载到页面


  更新后的数据
    { id: 3, name: '小王', age: 20 },
    { id: 1, name: '小张', age: 18 },
    { id: 2, name: '小李', age: 19 }
        // 我们点击按钮后 修改了state中的数据 小王在前面了 注意小王的id是数组的长度+1 是3

  ↓

  更新数据后的虚拟DOM
    <li key={0}>{小王}, {20}</li>
    <li key={1}>{小张}, {18}</li>
    <li key={2}>{小李}, {19}</li>
        // 因为小王是新遍历的所以小王的index是0 小张1 小李是2

  ↓

  旧的虚拟DOM树 和 新的虚拟DOM树进行对比
  <li key={0}>{小张}, {18}</li>     <li key={0}>{小王}, {20}</li>
  <li key={1}>{小李}, {19}</li>     <li key={1}>{小张}, {18}</li>
                                    <li key={2}>{小李}, {19}</li>

  进行对比
  先在旧的虚拟DOM中去找key=0的, 发现key一样, 则比较内容
      然后 小王(新)因为内容不一样 被挂载到页面上

  然后在找key=1的, 发现内容不一样 小张(新)被挂载到页面上
  然后在找key=2的, 发现内容不一样 小李(新)被挂载到页面上

  这是我们使用index带来的结果, 命名小张 和 小李是可以被复用的, 但是因为我们在数组的前面加入了小王, 原数组的顺序被打乱了 导致index的顺序发生了变化, 导致虚拟DOM因为key和内容都不一样 不能被复用


  现在是3条数据, 假如有2000条数据, 我们在数组的前方加入了一条数据, 我们还使用了index作为key, 那么就会导致2000条数据没办法复用
 -->

> 解决方式:
- 我们不用index作为key, 而是用数据的唯一标识作为key item.id

------

- 还是上面的案例 我们看下 使用index作为key 引发的渲染数据出错的问题
- 我们在每一个里面里面 都放一个<input>, 然后我们点击添加小王的按钮, 观察下index作为key会发生什么问题
<!-- 
  <li key={index}>{item.name}, {item.age} <input type='text' /></li>
 -->

> 页面展示信息
<!-- 
  \ 添加小王 \

  index作为key
  小张, 18      \input  小张, 18 \
  小李, 19      \input  小李, 19 \


  id作为key
  小张, 18      \input  小张, 18 \
  小李, 19      \input  小李, 19 \

  ------

  点击按钮后

  index作为key
  小王, 20      \input  小张, 18 \
  小张, 18      \input  小李, 19 \
  小李, 19      \input  空       \


  id作为key
  小王, 20      \input  空       \
  小张, 18      \input  小张, 18 \
  小李, 19      \input  小李, 19 \


  使用index作为key的数据串了, id作为key的数据没有乱
 -->

> 总结:
- 一旦结构中出现输入类的DOM节点的时候, 使用index作为key 会产生数据错乱

----------------------------

### 初始化React脚手架
- 我们使用vue 和 react创建的页面叫做 SPA应用, 所以就一个index.html文件

> create-react-app 项目名

- 使用创建react应用:
- create-react-app 
<!-- 
  create-react-app 是一个库 这个库要安装到电脑上, 有了这个库才能创建出来react脚手架
 -->

- 脚手架是基于webpack搭建
- 项目的整体技术架构为 react + webpack + es6 + eslint

- 使用脚手架开发的项目的特点: 
- 模块化, 组件化, 工程化
<!-- 
  在项目中用了webpack这种构建工具 我们写了一段代码 它能帮我们进行语法检查 压缩 兼容性处理 语法转换等等一系列自动的东西 我们就可以称之为工程化的项目

  一条龙服务 代码写完了 剩下的流程自动走下去 编译 压缩等 那就是工程化的项目就像汽车的生产线 批量的生产汽车的这种
 -->


- 创建项目并启动
- 1. 全局安装(create-react-app这个库)
- npm i -g create-react-app

- 2. 切换到想创建的项目的目录 使用命令创建 项目文件夹
- create-react-app hello-react

- 3. 进入项目文件夹
- cd hello-react

- 4. 启动项目
- npm start


> 项目文件的目录结构
- 说明 解释

  | - node_modules  // 依赖存放的位置

  
  | - public        // 一般存放静态资源文件 页面 样式 js不在这方
    - favicon.icon ------ 网站页签图标
		- index.html -------- 主页面(用于承装各个组件)
		- logo192.png ------- logo图
		- logo512.png ------- logo图
		- manifest.json ----- 应用加壳的配置文件
		- robots.txt -------- 爬虫协议文件

<!-- 
  // public 解释说明


  index.html:
    里面有很多多余的东西 我们可以删删
    1. 注释

    // 引入网站页签图标
    <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />


    // %PUBLIC_URL%
    react脚手架的关键词的写法 代表public文件夹的路径 功能类似 别名


    // 用于配置浏览器页签 + 地址栏的颜色 这个配置只针对安卓手机浏览器 ios不可以 开发里面很少用 兼容性不是很好
    <meta name="theme-color" content="#000000" />


    // 描述网站信息的 搜索引擎在收入网站的时候 会看这里面的描述
    <meta
      name="description"
      content="Web site created using create-react-app"
    />


    // 当我们把网页 添加到主屏幕 网站在屏幕上用什么图标 受下面的控制 只支持苹果手机
    <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />


    // 应用加壳的配置文件
    对于一个手机应用来说 我们要配置应用名字 图标 访问权限 如果是应用加壳在下面的json文件里配置相关信息
    <link rel="manifest" href="%PUBLIC_URL%/manifest.json" />
        应用加壳: 前端人员写出的代码都要放在浏览器端运行 都是html文件 因为浏览器只认识js css html

        应用加壳又是什么意思? 我们按照手机的布局去写一些页面(html), 我在写完的页面上套一个安卓的壳 我们写的网站就会变成安卓手机的应用

        安卓手机上的安装包都是apk吧, 我们要是想开发安卓的手机应用必须学java, 要想开发ios应用必须用OC 或者 Swift

        就是假如我们想做客户端开发(我们属于web人员), 就要学java 和 OC等技术

        如果我们会了应用加壳技术, 我们就在写好的html页面上面加一个壳 就能生成一个.apk文件 就可以安装在安卓手机上 用户点击图标的时候其实打开了一个壳 壳里面内嵌了一个网页

        一些简单的应用可以这么做, 先找前端人员写页面, 页面写好了再套壳 加一个安卓的壳就变成安卓应用 加一个ios的壳就是ios应用


  
  robots.txt
    爬虫协议文件, 在别人爬取我们的页面的时候, 可以定一些规矩 什么东西能爬 什么东西不能爬
 -->

  | - src         // 源码文件夹
    - App.css -------- App组件的样式
		- App.js --------- App组件

		- App.test.js ---- 用于给App做测试
		- index.css ------ 样式
		- index.js ------- 入口文件
		- logo.svg ------- logo图

		- reportWebVitals.js
		- 	--- 页面性能分析文件(需要web-vitals库的支持)

		- setupTests.js
			---- 组件单元测试的文件(需要jest-dom库的支持)

<!-- 
  // src 解释说明

  App是创建的组件, 名字叫做App

  App.js
    里面
    import 导入依赖
    export default App  导出App组件

  
  App.test.js
    做测试用的 专门用于App 几乎不用


  index.css
    通用性样式, 可以让如public文件夹中 引入index.html文件

  index.js
    入口js文件
    之前是在html文件里面引入核心库等js文件 现在是在入口文件中做操作 这里就相当于在html文件里面引入的操作

    import React from 'react';
    import ReactDOM from 'react-dom';
    import './index.css';

    // 引入App组件
    import App from './App';

    // reportWebVitals.js文件用于记录页面的性能 实现了一些页面的性能上的检测, 想要使用也要进行各种配置
    import reportWebVitals from './reportWebVitals';

    ReactDOM.render(

      // 为什么app的外侧要包裹 <React.StrictMode> 它会检查App和App内的子组件写的是否合理 比如 react的ref字符串类型的方式不推荐使用 它也会提出警告
      <React.StrictMode>
        <App />
      </React.StrictMode>,

      document.getElementById('root')
    );


    reportWebVitals();



  reportWebVitals.js
    文件用于记录页面的性能 实现了一些页面的性能上的检测, 想要使用也要进行各种配置


  setupTests.js
    用来做应用的整体测试的 模块拼在一起的单元测试 它是做组件测试的里面也应用了第三方的库做支持



  我们只把一个组件放到 <div id='root'> 容器里面 就是App
  其它组件作为App组件的子组件
 -->


> 文件之间的执行顺序
- 1. 页面启动之后, 会先来到src文件夹下的index.js 当看到<App>组件要渲染到root容器的时候, 就会去public里面找index.html文件中的root
<!-- 
  但是 index.js 也没有被引入 index.html 里面啊 那是因为底层有webpack做支持
 -->

- 2. 上面的完成后<App>组件就跑到了页面上, <App>组件的样式, 是在App.js文件中通过import 引入的css文件

----------------------------

### npx知识扩展
- 在没有npx的时候 我们想要使用react脚手架 需要先全局安装脚手架 然后通过create-react-app命令来创建项目

- 但是这个全局的包如果长时间不用放在那边是没有任何意义的 所以有了npx命令
- 有了npx 无需安装脚手架包 就可以直接使用这个包提供的命令

> npx create-react-app 项目名 -- 推荐
- 也可以使用 npm init react-app 项目名初始化项目 但是不推荐

----------------------------

### 图片的引入方式
- 一切皆模块
- import logo from "./logo.svg"

----------------------------

### 我们自己创建 public 和 src
- 我们把脚手架自带的文字整理到了一个文件夹中, 我们自己创建这两个文件夹 自己在里面写文件

| - public
  - index.html  主页面


| - src
  | - components    因为index.js app.js是上层文件 我们将子组件都放在这里面 每一个组件单独建立文件夹

  - index.js  入口文件 (相当于在html页面里面引入js文件的步骤)
  - App.js

<!-- 
  入口文件中需要做的事情
  1. 引入react核心库(脚手架让我们安装好了)
  import React from 'react'
  import ReactDOM from 'react-dom'

  import App from './App'

  // 渲染App组件到页面
  ReactDOM.render(<App/>, document.querySelector('#root'))
 -->


<!-- 
  App组件中要做的事情

  // 创建外壳组件 父组件
  import React from 'react'

  // 因为我们要继承 React.Component 所以这个文件中也要引入 React
  class App extends React.Component {
    render() {
      return (
        <div>
          hello.react
        </div>
      )
    }
  }

  export default App  


  ---- 这个文件的另一种写法 ---- 

  import React from 'react'
  const {Component} = React

  // 还可以这么写, react这个文件里面用了多种暴露的形式, 单独暴露和默认暴露
  import React, {Component} from 'react'

  import Hello from './Hello'

  // 直接暴露出去 创建并暴露
  export default class App extends Component {
    render() {
      return (
        <div>
          // 这里不直接放 hello.react 也是将hello, react也作为一个组件

          <Hello />
        </div>
      )
    }
  }


  // 定义Hello组件
  export default function Hello() {
    return (
      <h3>hellow, react</h3>
    ) 
  }

 -->


- 接下来 我要给 Hello组件 里面的文字加上css样式
- 我们也在 components文件夹中 创建css样式
- 然后在 Hello.js组件中 使用 import './Hello.css' 引入css文件
<!-- 
  import './Hello.css'

  export default function Hello() {
    return (
      <h3 className='title'>hellow, react</h3>
    ) 
  }
 -->


<!-- 
  Welcome组件

  import React from 'react'
  import './Welcome.css'        css文件必须在上方引入

  const {Component} = React

  export default class Welcome extends Component {
    render() {
      return (
        <h3 className='demo'>
          Welcome
        </h3>
      )
    }
  }
 -->


> 总结:
- import '.css' 必须放在上面
- css样式的样式名不能重复
<!-- 
  因为所有的css样式都会汇总到App组件里面, 就会发生 下面的同名样式会将上面的样式覆盖掉, 为了避免这种情况的发生 我们会将样式模块化
 -->


- react中 js文件 和 jsx文件都是可以不写后缀的

- 因为所有的js文件都是以.js结尾的 这样我们没有办法分清楚 什么是组件, 什么是单纯的js文件
<!-- 
  解决办法:
  1. 组件名大写
  2. 组件的.js 改成 .jsx
 -->

- 我们在App组件中引入其它组件的时候
<!-- 
  import Hello from './components/Hello/Hello'
  import Welcome from './components/Welcome/Welcome'
 -->
- 我们写了/Hello/Hello /Welcome/Welcome 这样会比较麻烦
- 所以我们还可以这样, 都将子组件的js文件改成index, 这样react连index都不用写
<!-- 
  | - components
    | - Hello
      - index.js
      - index.css

  import Welcome from './components/Welcome' 
      // 这样就能找到子组件文件夹下面的index.js文件
 -->

----------------------------

### 样式的模块化
- 上面的案例中 我们发现, 子组件中的css文件里, 类名不能重复
<!-- 
  因为所有的css样式都会汇总到App组件里面, 就会发生 下面的同名样式会将上面的样式覆盖掉, 为了避免这种情况的发生 我们会将样式模块化
 -->


> 解决方式1:
- 使用less 嵌套的话 就不会出现同名覆盖的问题


> 解决方式2:
- 样式的模块化:
- 1. 我们把index.css文件名 改成 index.module.css
<!-- 
  index.css   --- >   index.module.css
 -->

- 2. 我们在组件的js文件中 使用导入模块的方式导入css文件
- 这样所有hello相当的样式都会保存在hello对象里面
<!-- 
  import hello from './index.module.css'

  下面使用样式的方式是 hello.title的形式
  export default class Welcome extends Component {
    render() {
      return (
        <h3 className={hello.title}>    // 看这里
          Welcome
        </h3>
      )
    }
  }
 -->

----------------------------

### ES7 React插件

> rcc 类式组件

> rfc 函数组件

----------------------------

### 组件化编码流程
- 1. 拆分组件: 
  - 拆分界面, 抽取组件

- 2. 实现静态组件:
  - 使用组件实现静态页面的效果

- 3. 实现动态组件
  - 3.1 动态显示初始化数据(数据是动态加载进来的)
    - 1. 数据类型
    - 2. 数据名称
    - 3. 保存在哪个组件

  - 3.2 交互(从绑定事件监听开始)

----------------------------

### 书签
### 案例: ToDoList -- 结构 样式的拆分
- 下面大概是ToDoList的结构
<!-- 
  \  输入框   \           组件Header

  \  展示区域  \          组件List  /  组件item 
      // List里面的每一项都差不多, 所以我们把每一项也拆分成一个组件

  \   已完成0 / 全部3  \  组件footer
 -->

> 怎么拆分组件的技巧
- 1. 我们把所有的页面结构都放在App组件的return()里面
- 2. 将所有的class 转成 className
- 3. 将所有的style='' 转成 style={{ }}
<!-- 
  style='display:none'

  style={{display:'none'}}    这里注意 none 的引号
 -->

- 4. 关于整体的css文件怎么拆分? 我们创建App.css 将所有的样式放进去, 搭配App.js组件 我们确保功能能够完整的展示了 再去拆分


> 怎么拆分结构?
- todo-container todo-wrap 这两个包裹容器怎么办?
- 包裹容器那就放在App组件里面, 只将里面的对应结构拆出去
<!-- 
  <div className="todo-container">
          
    <div className="todo-wrap">

      <div className="todo-header"> </div>
      <ul className="todo-main"> </ul>
      <div className="todo-footer"> </div>

    </div>

  </div>
 -->

- 我们换成这样的结构, 然后把对应结构放到对应的组件里
<!-- 
  <div className="todo-container">
          
    <div className="todo-wrap">

      <Header />
      <List />
      <Footer />

    </div>

  </div>
 -->


> 拆分css样式
- 拆分css样式是很痛苦的一件事情, 假如css样式连注释也没有, 或者一个header的样式写在了css文件里的各个地方 都是需要要注意的事情

- 技巧:
- 1. 公共样式可以放在App组件里面
- 2. 各个部分的样式带到各个子组件里面

----------------------------

### 案例: ToDoList --- 动态初始化列表
<!-- 
  <List />

  <ul className="todo-main">
    <Item/>
  </ul>
 -->

- 这里我们在说的就是 主要区域的列表, 我们前面一直在说状态中的数据驱动页面的显示, 现在有一个问题, 我要展示列表项, 那列表项的数据放在哪里? 每一个组件都有自己的状态, 那我们的列表项的数据放在哪个组件的状态里?

- 我们把列表项的数据, 放在App组件的state中, List组件要做展示, 父子之间传递东西使用props很合适

- 也就是说 我们把他们要用的数据都放在App组件里面
<!-- 
  List    拿到App中的数据做展示
  Header  是往App中的state里面追加数据
 -->

> 怎么设计 todos数据结构
<!-- 
  state = {
    todos: [
      {
        id:'001',
        name: '吃饭',
        done: true
      },
      {
        id:'002',
        name: '睡觉',
        done: true
      },
      {
        id:'003',
        name: '敲代码',
        done: true
      },
    ]
  }
 -->

- 我们在App组件里面定义好了 todos数据, 接下来 我们要传递给哪个子组件? 谁做展示传递给谁吧
<!-- 
  <App /> 组件里面

  <List todos={this.state.todos}/>


  <List /> 组件里面
  从props中取到App组件传递过来的数据, todos数组的长度决定我们渲染几个item
  const {todos} = this.props
 -->

> List展示数据
- 现在我们在App的state中定义了todos的数据结构里面就是我们要做的事情
<!-- 
  state = {
    todos: [
      {
        id:'001', name: '吃饭', done: true
      },
      {
        id:'002', name: '睡觉', done: true
      },
      {
        id:'003', name: '敲代码', done: true
      }
    ]
  }
 -->

- 接下来<App />组件 通过 props 标签属性传递给了 <List todos={this.state.todos}/> 组件

- 那么<List>组件就接收到了 todos 的数据 我们要通过todos的数据遍历展示内容
<!-- 
  <ul className="todo-main">
    <Item />
  </ul>
 -->

- 以前我们都是通过数据直接格式化成我们想要的样子, 但现在是一个组件, 很多想要改变的内容都是在组件里面封闭的 我们格式化不了 怎么办?
<!-- 
  首先我们能根据 todos 来展示几个item组件 就是todos 的length

  <ul className="todo-main">
    {
      // 遍历这个todos数据, 这样数组的长度 就是展示数据的条数
      todos.map((item) => {

        // 这样就根据 todos的length展示几个item key使用内部的唯一标识
        return <Item key={item.id}/>
      })
    }
  </ul>
 -->

- 可是<List>接到的todos数据 怎么传递给<Item> 因为<Item>要用啊
- 还是通过 标签属性来传递
<!-- 
  <ul className="todo-main">
    {
      todos.map((item) => {

        return <Item key={item.id} {...item}/>

        下面这种方式属性少可以, 属性多的话比较麻烦, 我们可以使用上面的{...item} 语法糖
        return <Item key={item.id} id={item.id} name={item.name} done={item.done}/>
      })
    }
  </ul>
 -->


- 上面<List>使用标签属性的方式给<Item>传递了数据, 接下来<Item>组件就要接收<List>传递过来的数据
<!-- 
  let {name, done} = this.props

  <div>
    <li>
      <label>

        <input type="checkbox" defaultChecked={done}/>
        <span>{name}</span>

      </label>

      <button className="btn btn-danger" style={{ display: 'none' }}>删除</button>
    </li>
  </div>

  有一个问题, 我们复选框的勾选应该根据done属性的值来决定
  假如我们这么写
  <input type="checkbox" checked={done}/> 会报错

  // 报错信息:
  index.js:1 Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

  1. 页面显示已勾选,但是不能更改状态 如果想要更改状态必须要使用 onChange

  我们先改成这样 也是有问题的
  <input type="checkbox" defaultChecked={done}/>

 -->

> 知识扩展: defaultChecked
- 默认是否勾选 后续是可以改的 它只管第一次上来勾选还是不勾选

----------------------------

### 案例: ToDoList --- 通过输入框 添加todo
- 在文本框中输入文字, 敲回车就会将文本放到App的state中, 然后驱动后续的展示
- 我们给<input>绑定 onKeyUp事件, 因为绑定事件的元素 和 要获取文本值的元素是同一个 所以我们可以不用给<input>打ref, 而是通过event.target
<!-- 
  <input type="text" onKeyUp={this.handleKeyUp} placeholder="请输入你的任务名称，按回车键确认" />

  handleKeyUp = (e) => {
    if(e.keyCode !== 13) return
    
    我们已经能在这个处理函数中得到文本框的值, 现在怎么才能用 <List>组件 将值 添加到<App>组件里面去呢?
  }
 -->

- 也就是说, 我们在Header中的输入得影响着App state中的数据的变化
> 子传父怎么操作?


> 函数的新理解 --- 子组件向父组件传递数据
- 函数不仅仅可以用户调用 写逻辑 做功能, 以前我们的使用函数都是通过调用函数的时候传递实参, 然后在函数内容来使用实参完成逻辑和功能

- 函数的另一种用法可以用做传值, 两个组件中用函数来传递数据

- A组件给B组件通过<标签属性>发送一个函数, 函数内部定义形参
- B组件使用函数, 将需要传递的数据, 当做实参传递给函数, A组件的形参就接到了B组件的数据, 从而做各种处理
<!-- 
  App组件
  a = (data) => {
    console.log('App:', data)
  }

  // 给Header组件传递一个函数
  <Header a={this.a}/>
 -->

> 组件间的通信
- 父组件 向 子组件传递数据:
  - 父组件通过<标签属性>来进行传递数据, 子组件通过this.props来接收数据
  - 传递的数据类型 变量 函数

- 子组件 向 父组件传递数据:
  - 父组件通过<标签属性>来传递一个函数, 子组件调用函数通过实参的形式给父组件传递数据



- 子组件<Item>中要组织好一个对象传递到父组件
<!-- 
  因为父组件中的state todos=[{}, {}]的形式, 每一条数据都是一个对象, 所以我们要组织成一个对象再传递给父组件<App>

  let todoObj = {
    // 确保唯一标识 我们使用了nanoid库
    id: nanoid(),
    name: target.value,

    // 要添加的事情 肯定是没有做的
    done: false
  }
  this.props.addTodo(todoObj)


  // App组件
  addTodo = (todoObj)=>{
		//获取原todos
		const {todos} = this.state

		//追加一个todo
		const newTodos = [todoObj,...todos]

		//更新状态
		this.setState({todos:newTodos})
	}


  <Header addTodo={this.addTodo}/>


  // header组件
  handleKeyUp = (event)=>{
		//解构赋值获取keyCode,target
		const {keyCode,target} = event

		//判断是否是回车按键
		if(keyCode !== 13) return

		//添加的todo名字不能为空
		if(target.value.trim() === ''){
			alert('输入不能为空')
			return
		}

		//准备好一个todo对象
		const todoObj = {id:nanoid(),name:target.value,done:false}

		//将todoObj传递给App
		this.props.addTodo(todoObj)

		//清空输入
		target.value = ''
	}
 -->

- 接下来 我们能够接到子组件传递的数据了, 那么我们就可以在父组件中的处理函数中做对应的处理
<!-- 
  addTodo = (todoObj) => {
    // 我们要获取state中的数据, 然后将新的对象放入到数据的前面
    const { todos } = this.state

    // 追加一个todos
    const newTodos = [todoObj, ...todos]

    // 更新状态
    this.setState({
      todos: newTodos
    })

    console.log(todoObj);
  }
 -->

----------------------------

### uuid
- 专门生成唯一标识的库 生成一个一长串全世界都唯一的标识
- npm i uuid --save-dev
<!-- 
  这个库有些大 还有一个
 -->

- npm i nanoid

> 使用方式
- 在组件中 引入这个库
- 它里面用了分别暴露的形式 暴露了nanoid
<!-- 
  import {nanoid} from 'nanoid'
 -->

- 这个nanoid是一个函数, 每一次调用这个nanoid()会生成一个字符串 这个就是唯一的标识

----------------------------

### 案例: ToDoList --- List列表项中 移入高亮 显示删除按钮
- 那我们给每一个item添加一个鼠标移入和移出的事件
- 我们要给<Item>添加事件, 那么就要在对应的组件中写逻辑
<!-- 
  <li onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>
    <label>
      <input type="checkbox" defaultChecked={done}/>
      <span>{name}</span>
    </label>
    <button className="btn btn-danger" style={{ display: 'none' }}>删除</button>
  </li>

  虽然是引入移出两个事件, 我们可以传递一个函数, 通过传入true 和 false来判断写移入还是移出的逻辑

  但是这么写也会引发一个问题
  onMouseEnter={this.handleMouse(true)}

  函数会被直接调用, 所以我们要保证handleMouse(true)返回的是一个函数

  handleMouse = (flag) => {
    return (event) => {
      console.log(flag);
    }
  }
 -->

- 现在我知道鼠标是进来了还是出去了, 然后我要在state中维护一个变量 标识鼠标有没有在当前的item身上
<!-- 

  // 我们定义一个变量, 默认false 代表一上来鼠标没有在任何人身上
  state = {
    mouse: false
  }

  // 当鼠标移入item之后, 我们就更新state中的状态
  handleMouse = (flag) => {
    return (event) => {
      this.setState({
        mouse: flag
      })
    }
  }

  // 然后我们通过
  <li style={{backgroundColor: this.state.mouse ?'#eee' :''}} onMouseEnter={this.handleMouse(true)} onMouseLeave={this.handleMouse(false)}>

  <button className="btn btn-danger" style={{ display: this.state.mouse ? 'block' : 'none' }}>删除</button>



  // 我的做法
  思路, 根据true写移入的逻辑, 根据false写移出的逻辑, 背景的实现都是通过添加个删除class完成

  handleMouse = (flag) => {
    return (event) => {
      
      if(flag) {
        event.target.classList.add('active')
      } else {
        event.target.classList.remove('active')
      }
    }
  }
 -->

- 实现上面的互动逻辑 老师和我的做法做下总结
- 我的做法是: 
- 我的缺点感觉不是在用react的逻辑写项目, 而是在有同行的按钮显示隐藏的话, 还要再对按钮来写逻辑 相当于 我直接使用js操作css
<!-- 
  先定义css样式, 通过原生的思路, 当移入目标和移出目标的时候 添加或删除class 
-->

- 老师的做法: 一切都是根据state状态来写逻辑, 面向state变成, 老师的做法更像在写react, 在用state驱动页面的更新
<!-- 
  先在state中定义一个变量, 然后鼠标移入移出的时候修改这个变量的值, 然后页面上根据这个变量, 在标签内部写三元表达式
 -->

----------------------------

### 案例: ToDoList --- Item中的复选框的勾选和取消勾选
- 在做react开发的时候, 我们除了关注页面的效果, 还要考虑是否能引发state中数据的变化

- 我们这个部分, 主要处理一下, 点击复选框后, 它的状态能够同步到<App>组件中的状态
<!-- 
  Item中的复选框 如果是false

  那么<App>组件中
  state = {
    todos: [{done: 也是false 同步到这里}]
  }
 -->


- 完成思路:
- 所以我们要给 <input> 绑定 onChange 事件, 在这个事件的处理函数中, 我们要想办法将我们要修改哪条数据对应的id, 和checkbox的checked状态 告诉<App>组件 让它将state中的对应数据做出对应的修改

- 我们看下组件之间的关系 <Item> <List> <App> 他们3个依次是父子关系, 但是<Item>和<App>是祖孙关系, 子传父 需要层层传递

- 数据的id是<List>组件传递给<Item>的, checked的状态也可以通过e.target.checked来获取

- 整理好这些 我们就开始写逻辑
<!-- 
  // 1. 在<Item>组件中给<input>绑定onChange事件
   let {id, name, done} = this.props
        // 数据的id是<List>组件传递给<Item>的

  <input onChange={this.handleCheck(id)} type="checkbox" defaultChecked={done}/>

        // 注意: 因为我们要将id传递到处理函数中, 标签里面的函数加了小括号, 所以函数内部要使用高阶函数


  // 2. 在<Item>组件定义处理onChange的处理函数
  handleCheck = (id) => {
    return (e) => {

      // 这个是<App>传递过来的 用于接收我们传递的数据的函数
      this.props.updateTodo(id, e.target.checked)
    }
  }


  // 3. 我们通过标签属性给<List>传递一个 更新checked的函数 让它给<Item>
  <List todos={this.state.todos} updateTodo={this.updateTodo}/>

  同时 我们在<App>组件里面写逻辑
  updateTodo = (id, done) => {
    // 参数: id改的是谁, done的情况
    
    // 获取状态中的todos
    const {todos} = this.state

    // 匹配处理数据
    let newTodos = todos.map((item) => {
      if(item.id === id) {
        // 如果匹配上了 我就给你返回一个新的对象, 而且done的值被我改了
        return {...item, done:done}
      } else {

        // 如果没匹配上, 原数据返给你
        return item
      }
    })

    // 更新todos
    this.setState({
      todos: newTodos
    })
  }
 -->



**复习es6小知识**
<!--  
  let obj = {a:1, b:2}

  // 复制obj 然后对里面的值不满意, 可以在后面修改
  let obj2 = {...obj, b:3}

  console.log(obj2)
    // {a:1, b:3}
 -->


> 总结:
- 状态定义在哪里操作状态的方法就在哪里

----------------------------

### 案例: ToDoList --- 对props进行限制
- 前面我们为了更改<App>组件中的state, 给子组件通过标签属性传递了函数, 但是子组件应该对父组件传递过来数据进行props的类型显示

- props的类型限制是子组件对传递过来的数据进行类型限制

<!-- 
  <Header addTodo={this.addTodo} />
  <List todos={this.state.todos} updateTodo={this.updateTodo}/>
  <Footer />
 -->

- <App>给<Header> 和 <List>都传递props了
- 接下来我们在<Header> 和 <List>组件中, 依次写对props进行限制的逻辑
<!-- 
  props类型限制是子组件中定义的
 -->


- 怎么对传递的标签属性进行类型以及必要性的限制?
- 首先我们要借助 prop-types 库

- 1. 下载这个库 并且在组件中引入
- npm i prop-types
- import PropTypes from 'prop-types'
<!-- 
  react脚手架没有帮我们下载这个库 我们需要自己安装
 -->

- 2. 接下来就是固定模板了
- App 给 Header 传递了一个addTodo, 我们站在Header的角度就是接收, 站在App的角度就是传递
<!--  
  // 对接收的props进行 类型以及必要性的限制
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  App必须给我传递一个func
 -->

- 如果<App>没有给<Header> 和 <List>传递对应的必传属性就会报错

----------------------------

### 案例: ToDoList --- 删除一个todo
- 这个部分我们完成点击 删除按钮后, 删除一条信息
- 我们在<Item>组件里完成相关逻辑
- 思路:
- 我们拿到要删除这个数据的id, 告诉<App> 让App删除就可以了 
<!-- 
  id我们知道, 当初父组件传递过来的 在props里面 我们可以从props解构
  let {id, name, done} = this.props
 -->

- 然后我们做点击按钮的处理函数, 在处理函数中 使用父组件传递过来的函数将id通过实参的方式传递到该函数里面
<!-- 
  // 两种方式写法
  <button onClick={()=>this.handleDelete(id)}>删除</button>
  <button onClick={this.handleDelete(id)}>删除</button>

  // 删除按钮的回调
  handleDelete = (id) => {
    return (event) => {
      if(window.confirm('确定删除吗？')){
        this.props.deleteTodo(id)
      }
    }
  }
 -->

- 我们在父组件<App>中定义一个通过props传递过来的函数, 目的一是让子组件传递数据供父组件来删除state中的数据
<!-- 
  deleteTodo = (id) => {
    // 获取原来的todos
    const {todos} = this.state

    // 从数组里面删除指定id的元素 我们可以使用数组里面的过滤 比如我们要删除002, 那么我就用filter方法, 将除了002的item返回 那是不是就相当于删除了002
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })

    // 状态更新 驱动页面显示
    this.setState({
      todos: newTodos
    })
  }
 -->

- 这个函数要先从<App>组件中 传递给<List> 然后再传递给<Item>
<!-- 
  // 先传递给<List>
  <List deleteTodo={this.deleteTodo} todos={this.state.todos} updateTodo={this.updateTodo}/>

  // 然后<List>从props中解构出来 传递给<Item>
  const { todos, updateTodo, deleteTodo } = this.props
  <Item key={item.id} {...item} updateTodo={updateTodo} deleteTodo={deleteTodo}/>

  
 -->


**父组件: 更新 删除 添加数据的方法**

- 我们都是利用更新state中数据, 来驱动页面的显示, 这是中心思想, 所以我们都是对sate中的数据 进行更新的操作

- 下面中的方法 都是子组件为了传递给父组件信息, 要求父组件传递的函数 内部都是在对state做更新的操作


> 添加数据的方法
- 1. 获取state中的原数据
- 2. 创建一个新对象, 用于将修改后的新对象覆盖state中的数据
    - 这里利用了...obj将原来的数据展开, 然后前面放子组件传递过来的数据

- 3. 通过this.setState方法更新数据
<!-- 
  // addTodo用于给state中添加一条信息, 接收的参数是一个todo对象
  addTodo = (todoObj) => {

    // 我们要获取state中的数据, 然后将新的对象放入到数据的前面
    const { todos } = this.state

    // 追加一个todos
    const newTodos = [todoObj, ...todos]

    // 更新状态
    this.setState({
      todos: newTodos
    })
  }
 -->


> 更新state中的数据(修改state中的数据)
- 1. 形参就是改谁?(id), 改什么(具体内容)
- 2. 获取state中的原数据
- 3. 我们要遍历state中的数据, 使用map(), 返回一个新数据对象用于替换state中的数据, 我们可以利用判断找到指定数据, 然后利用[...item, done:done]扩展运算符展开并对指定项进行修改
- 4. 更新state中的数据 用新数据对象 替换 旧数据
<!-- 
  这里遍历没有选择forEach 因为它是直接修改state中的数据, 我们只能通过setState来修改
 -->
<!-- 
  // updateTodo 用于更新一个todos对象
  updateTodo = (id, done) => {
    // 这里需要的参数是 改的是谁, done的情况
    
    // 获取状态中的todos
    const {todos} = this.state
    
    -------
    这个方式不可以
    todos.forEach((item, index) => {
      if(item.id === id) {
        item[done] = done
      }
    })
    -------

    // 匹配处理数据
    let newTodos = todos.map((item) => {
      if(item.id === id) {
        // 如果匹配上了 我就给你返回一个新的对象, 而且done的值被我改了
        return {...item, done:done}
      } else {

        // 如果没匹配上, 原数据返给你
        return item
      }
    })

    // 更新todos
    this.setState({
      todos: newTodos
    })
  }
 -->


> 删除state中的数据
- 说是删除 也是创建一个新的对象, 然后用它覆盖掉state中旧的对象
- 1. 获取state中原来的数据
- 2. 删除一条数据, 我们使用了filter方法, 将不是目标数据的其它数据返回就相当于删除了, 我们利用了 id!==id 的方式
- 3. 更新state
<!-- 
  // 删除 用于删除一个todo
  deleteTodo = (id) => {
    // 获取原来的todos
    const {todos} = this.state

    // 从数组里面删除指定id的元素 我们可以使用数组里面的过滤 比如我们要删除002, 那么我就用filter方法, 将除了002的item返回 那是不是就相当于删除了002
    let newTodos = todos.filter((item) => {
      return item.id !== id
    })

    // 状态更新 驱动页面显示
    this.setState({
      todos: newTodos
    })
  }
 -->

**完了**

----------------------------

### 案例: ToDoList --- 实现底部功能
- □　已完成0 / 全部2    | 清除已完成任务 |

- 需求:
- 1. 点击已完成前面的复选框, 上面的复选框都会全选上, 同时已完成后面的数字, 会根据复选框的数量进行变化

- 2. 点击 清除已完成任务 按钮 所有被勾选的项目都会被删除掉

- 思路
- 已完成0 / 全部2 数字的展示
- 只要<App>将todos交给<Footer> 那么<Footer>就能根据todos筛选出来有多少个打钩的, 其实就是看有多少人的done值为true
<!-- 
  // <App> 组件中
  <Footer todos={todos} />
  

  // <Footer> 组件中
  render() {
    const {todos} = this.props

    // 获取 已完成的个数
    我们需要做的就是对数组进行 条件统计 如果done为true 那么+1 我们看看数组中有多少对象的done值为true

    数组身上有一个方法专门做统计的 reduce 它能对数组进行条件统计 和 条件求和 筛选最值

    // pre是上一次的返回值, 第一次没有上一次就是item, 第二次调用的时候就是第一次的返回值
    const doneCount = todos.reduce(() => {}, 0)
    let count = todos.reduce((pre, item) => {
      return pre + (item.done ?1:0)
      /* 
        第一次调用reduce因为没有上一次, pre为0 让 pre + 1
        第二次调用reduce pre 就是上一次的返回值 1 然后让pre + 1
        第三次调用reduce pre 就是上一次的返回值 2 然后让pre + 1

        那什么时候+1呢? 我们可以看下item.done
    */
    }, 0)

    // 获取 要做事项的总数
    const total = todos.length

    return ()
  }

  我们在<Footer> 组件中根据todos就能知道有多少个完成的


  // 以上都是在render() {} 里面完成的逻辑 所以<span>中可以直接使用变量
  <span>已完成{doneCount}</span> / 全部{total}
 -->

- 当待做事项里都打上勾之后, □　已完成 它的前面的对号也应该可以勾上
<!-- 
  <input type="checkbox" checked={doneCount === total && total !== 0 ? true : false}/>

  total !== 0 为什么?
  如果都把待办事项删掉了 那是不是doneCount === total也是true 那就会导致一个问题, 都没有待办事项了, 下面的全选还勾着


  这里面有一个问题, 当像上面那么写之后 □　已完成 前面的确实会根据 待做事项都被选中 它的状态也是会选中 但是有一个问题, 页面会报错

  // 报错信息
  index.js:1 Warning: You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.

  提示 如果你写了 checked 那么页面上的 按钮的状态就不能改了, 你应该使用onChange

  前面我们也出现了这个问题, 解决的办法是 写了defaultChecked, 但是defaultChecked也有问题 待办事项全选, 但是已完成前面的却没有勾选

  defaultChecked 只在第一次起作用 看下面页面一加载后 它就会判断 ount === total 肯定不等啊 所以 defaultChecked的值就被设置成了false
  checked={doneCount === total && total !== 0 ? true : false}

  以后再根据判断想修改defaultChecked的值 也做不到 因为它只能生效一次
  所以我们还是要使用checked

  但是 我们要给它绑定 onChange 事件 也就是 复选框 勾选 和 取消勾选的回调

  <input type="checkbox" onChange={this.handleCheckAll} checked={doneCount === total && total !== 0 ? true : false}/>

  // 全选checkbox的回调
  handleCheckAll = (e) => {

    // 这里告诉父组件 根据<Footer>组件复选框的状态修改state中的done的值
    this.props.checkAllTodo(e.target.checked)
  }


  上面的函数是处理全选是么, 那是不是要将App组件中的所有done的值都改为true
  对吧, 所以又是子传父, 还是要父组件 发一个函数过来

  // App组件中
  // 参数 done 是<Footer>组件传递过来值, 用于告诉父组件修改done的时候是全选还是全不选
  checkAllTodo = (done)=>{
		//获取原来的todos
		const {todos} = this.state

		//加工数据
		const newTodos = todos.map((todoObj)=>{

      // 根据done来决定done的值是true 还是false
			return {...todoObj, done: done}
		})

		//更新状态
		this.setState({todos:newTodos})
	}
 -->


- 清除所有已完成 逻辑
- 
<!-- 
  Footer组件
  <button onClick={this.handleClearAllDone} className="btn btn-danger">清除已完成任务</button>

  告诉App组件 你把所有done为true都删掉吧
  handleClearAllDone = ()=>{
		this.props.clearAllDone()
	}


  App组件
  //clearAllDone用于清除所有已完成的
	clearAllDone = ()=>{
		//获取原来的todos
		const {todos} = this.state

		//过滤数据
    我们还是使用filter 逆向思维 我们把done为true的 都过滤掉, 我们把done: false都交出去
		const newTodos = todos.filter((todoObj)=>{
			return !todoObj.done
		})

		//更新状态
		this.setState({todos:newTodos})
	}
 -->


> 项目总结
- 1. 我们在react中 如果写checked 就一定要搭配onchange使用 否则这个按钮就再也不能改变了

- 2. 我们将数据放在哪个组件的state中?
  - 如果该数据是某一个组件使用, 那就放在自身的state中
  - 如果该数据是某一些组件使用, 那就放在它们共同的父组件中, 这也叫状态提升

- 3. 关于 父子之间的通信
  - 父组件 给 子组件 传递数据, 通过props传递
  - 子组件 给 父组件 传递数据:
    通过props传递, 要求父提前给子传递一个函数

- 4. 状态在哪里, 操作状态的方法就在哪里

----------------------------

### 脚手架配置代理
- react本身只关注界面, 并不包含发送ajax请求的代码, 前端应用需要通过ajax请求与后台进行交互(JSON数据), react应用中需要继承第三方ajax库(或自己封装)

> 常用的ajax请求库
- 1. jQ: 
    比较重, 如果需要另外引入不建议使用

- 2. axios: 
    轻量级 建议使用
    - 封装XmlHttoRequest对象的ajax
    - promise风格
    - 可以用在浏览器端和node服务器端


- 项目中都是使用axios库来发送请求:
- 使用方式:

> 安装axios
- npm i axios --save

> 发送get请求
- axios等封装并不是把服务器的返回给我们的数据全都放在res里面了 而是放在res.data中

> axios.get(url).then()
<!-- 
  axios.get('url').then(res => {
      console.log(res.data)
    }, err => {
      console.log(err)
    })
 -->


- 案例: 
- 点击按钮从服务器获取学生信息, 服务器是我们自己搭的
<!-- 
  - 服务端接口:       http://localhost:5000/student
  - webpack服务器:    http://localhost:3000/

  这不会跨域么? 是的 我们点击按钮后报了跨域的错误

  // 跨域请求的报错信息:
  Access to XMLHttpRequest at 'http://localhost:5000/student' from origin 'http://localhost:3000' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
 -->


- 跨域产生的原因是ajax引擎把响应给拦住了, 也就是说因为跨域我的ajax请求能发送但是数据回不来

- 那怎么解决? 我们在react脚手架里面通过代理去解决


> 那什么是代理
- 白话点, 就是自己搞不定的事情 我们找一个中间人帮我们去解决

- 我们目前所处的情况是这样, 我们客户端是3000的端口, 服务端是5000的端口
<!-- 

  client: 3000            server: 5000

  当我们一个请求从client端送出去的时候, 肯定会经过ajax引擎, ajax引擎看了下说哥们你在3000啊 你找5000是么? 行 我让你去 ajax引擎会放行这次请求

  该请求会达到服务器, 当时当响应返回的时候, ajax引擎直接把响应拦在外侧了 说你别回来你走开 因为你跨域了
 -->

- 所谓的代理就是 出现了一个中间人, 这个中间人也是开在3000端口上的, 也就是说3000端口跑着一个脚手架, 3000端口也跑着一台微小的服务器

- 那我们发请求现在走的是什么样的线路?
<!-- 

    client: 3000                         server: 5000
                |
              ajax引擎
                |
                      中间人: 3000

    我们client:3000 会给 中间人:3000端口发请求, ajax引擎一看你在3000给3000发 行啊, 没问题
    然后中间人(代理服务器)就把刚才的请求转发给5000端口的server

    server:5000 给中间人:3000 的响应结果, 中间人是能收到的 因为中间人没有ajax引擎, 
    产生跨域的本质问题是ajax引擎把响应给拦住了 中间人是通过请求转发的形式给服务器, 
    没有ajax引擎所以也不存在跨域的问题

    同源策略压根不限制它, 所以响应数据可以到中间人这里 回来之后中间人再把数据交给浏览器
    ajax的引擎是在3000端口的, 它一看从3000端口回来的数据 回的也是3000所以会放行
 -->


> React中配置代理有两种方式
> 方式1:
- 仅适合建立一个代理
- 在package.json中的最后, 加一个"proxy": "url", 只写到端口, 不用继续往下写接口

<!-- 
  3000没有的资源代理会找5000要, 3000有的资源代理会直接冲public中返回
 -->

> "proxy": "http://localhost:5000"
<!--
  // package.json文件中
  {
    ...
  },
  "proxy": "http://localhost:5000"



  这样写之后所有发给3000端口的请求 都转发给了5000

  那是所有的请求都被转发给5000么?  不是
  当我们请求的路径是public文件夹里面有的东西的时候, 代理会直接返回public中已有的资源

  因为:
  public文件夹是脚手架帮我们开启的服务器的根路径, 3000有的资源 代理就不会再转发给5000服务器了
  也就是说3000没有的再转发给5000
-->

- 配置完之后 我们还要修改前端代码, 将axios中请求地址改为3000端口(改为同源地址改到端口号)
<!-- 
  最开始我们要从客户端3000端口 往 服务器端5000端口 发请求
  因为我们配置了代理, 我们要往代理的端口发请求 所以要将请求地址改为代理的地址
  而代理的地址其实就是和我们跑在一个端口的小型服务器

  // 原来:
  axios.get('http://localhost:5000/student')  是直接往服务器发请求

  // 现在:
  axios.get('http://localhost:3000/student')  走代理往自己所在的端口号发请求
 -->

- 注意:
- 当我们改了package.json文件后脚手架必须重启 刚才写的这句话才奏效


> 方式2: 配置多个代理
- 建立多个代理
<!-- 
  这里我们设计了一个场景, 一个是学生信息5000端口的server, 一个是汽车信息5001端口的server

  上面我们只是简单的写了下"proxy": "http://localhost:5000" 那就有一种情况, 我们需要学生和汽车的信息, 但是我们只配置了一个让代理将请求转发到哪的路径那怎么办?

  如果我们是想配置两个转发目的地 那就不是在package.json里面了
 -->

> 1. src文件夹下 创建 setupProxy.js 文件
- react会自动找这个文件 将这个文件加到webpack的配置里面, 因为webpack里面都是用的node语法写的都是commonjs 所以我们 setupProxy.js文件中要使用commonjs的语法

<!-- 
  我们看下前端代码:
  axios.get('http://localhost:3000/student')
      去3000找student数据, 而我们的public里面没有student数据 就会走代理

  axios.get('http://localhost:3000/cars')
      去3000找cars数据


  但是我们在setupProxy.js文件中 又是这么配置的代理, 也就是说请求路径中必须要有api1才会走代理
  const proxy = require('http-proxy-middleware')
  module.exports = function(app) {
    app.use(
      proxy('/api1', {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      }),

      // 再配置一个代理
      proxy('/api2', {
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      })
    )
  }
  

  上面配置好了我们也要把前端代码改成
  axios.get('http://localhost:3000/api1/student')
      如果3000没有学生数据, 就走api1所配置的代理, 这样就会访问5000下的students

  axios.get('http://localhost:3000/api2/cars')
 -->

- 这样特别的灵活, 如果想走代理到5000 就写/api1 想走代理到5001 就写/api2 如果不想要代理就不写/api


> 解析代理的配置文件
<!-- 
  app.use(
    proxy('/api1', {  
      target: 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: {'^/api1': ''}
    })
  )

  proxy()中有两个参数
  参数1: 
    /api1 是需要转发的请求 (所有带有/api1前缀的请求都会转发给5000)
    相当于代理人的名字

  参数2: 配置对象
    target: 'url'
        配置转发目标地址(能返回数据的服务器地址)

    changeOrigin: true
        控制服务器接收到的请求头中host字段的值 一般将changeOrigin值设为true
        changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000

        changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:3000

        服务器是能看到我们请求的地址是什么的 如果我们是false服务器能看到我们跨域请求, 如果设置为true, 那me服务器会看到是同源请求

    pathRewrite: {'^/api1': ''}
        去除请求前缀，保证交给后台服务器的是正常请求地址(必须配置)
 -->


**配置多个代理 代码部分 复制用**
<!-- 
  const proxy = require('http-proxy-middleware')
  module.exports = function(app) {
    app.use(
      proxy('/api1', {  
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      }),

      proxy('/api2', {
        target: 'http://localhost:5001',
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      })
    )
  }
 -->


**复习: index.js app.jsx里都写什么**
<!-- 
  // index.js文件中 入口文件
  import React from 'react'
  import ReactDOM from 'react-dom'
  import App from './App'

  ReactDOM.render(<App/>, document.querySelector('#root'))


  // App组件中
  import React, {Component} from 'react'
  import axios from 'axios'

  export default class App extends Component {

    getStudentData = () => {
      axios.get('url').then(res => {
        console.log(res)
      }, err => {
        console.log(err)
      })
    }

    render() {
      return (
        <div>
          <button onClick={this.getStudentData}>点我获取学生数据</button>
        </div>
      )
    }
  }
 -->

----------------------------

### 案例: github搜索
- 在文本框输入文字后, 点击按钮 检索数据, 然后将检索到的数据展示到页面上
- 我们将这个案例拆成3个组件, App and Search and 展示区域

- 这个案例中使用了 Bootstrap

- 将静态页面拆成组件, 看看需要什么步骤
<!-- 
  1. 检查结构
  我们看看最外层结构有没有上样式, 没有的话 我们就不用带最外层的结构, 我们将其余的结构放入到

  2. 将筛选出的结构放入App组件中 

  3. 将class 改为 className, 将style='' 改成style={{}}

  4. 将css文件也拿到App.css文件中, 并在App.js文件中引入App.css样式

  5. BootStrap放在public文件夹中的css文件夹里面

  6. 创建对应组件, 将结构和样式拆分到对应组件中, 组件的名字都是index.jsx

  7. 在App组件中引入子组件
 -->


> 注意:
- Bootstrap库, 我们放在public文件夹中的css文件夹里面, 在public的index.html文件中引入bootstrap文件

**注意:<a target='_blank'> 和 <img> 需要其他标签属性配合使用**
- 使用 <target="_blank"> 不使用标签属性 rel="noreferrer" 就会报错
-  rel="nofollow noopener noreferrer" 
<!-- 
  rel =“noopener”一般都是搭配 target="_blank"同时使用

  因为 target="_blank" 也是一个安全漏洞：新的页面可以通过 window.opener 访问您的窗口对象，并且它可以使用 window.opener.location = newURL 将您的页面导航至不同的网址。

  新页面将与您的页面在同一个进程上运行，如果新页面正在执行开销极大的 JavaScript，您的页面性能可能会受影响。

  noreferrer 属性则是为了兼容旧版本的浏览器，功能是一样的。

  超链接 target="blank" 要增加 rel="nofollow noopener noreferrer" 来堵住钓鱼安全漏洞。如果你在链接上使用 target="blank"属性，并且不加上rel="noopener"属性，那么你就让用户暴露在一个非常简单的钓鱼攻击之下。

  当你浏览一个页面点击一个a标签连接 <a href="www.baidu.com" target="_blank"> 跳转到另一个页面时，

  在新打开的页面（baidu）中可以通过 window.opener获取到源页面的部分控制权， 即使新打开的页面是跨域的也照样可以（例如 location 就不存在跨域问题）
  
  ---

  // html结构这么写会有警告:
  <a href="https://github.com/reactjs" target="_blank">

  ---

  Using target="_blank" without rel="noreferrer" is a security risk: see https://html.spec.whatwg.org/multipage/links.html#link-type-noopener  react/jsx-no-target-blank

  使用target="_blank"而不使用rel="noreferrer"会有安全风险:参见https://html.spec.whatwg.org/multipage/links.html#link-type-noopener react/jsx-no-target-blank  
 -->


- 使用 <img> 不使用标签属性 alt='' 就会报错
<!-- 

  // html结构这么写会有警告
  <img src="https://avatars.githubusercontent.com/u/6412038?v=3" style='width: 100px'/>

  img elements must have an alt prop, either with meaningful text, or an empty string for decorative images

  Img元素必须有一个Alt prop，要么是有意义的文本，要么是用于装饰图像的空字符串  

 -->


-------

- 上面完成了静态页面, 接下来的逻辑就是用户在文本框输入内容, 我们根据输入的值发起网络请求, 比如用户输入的是abc, 我们就问服务器关于abc相关的用户都有哪些呢? 然后我们完成展示

- 1. 我们给按钮添加点击事件
<!-- 
  // <Search>
  react当中获取指定节点没办法像操作DOM那样根据DOM树找到要操作的节点, 而是使用ref获取指定的节点

  给元素添加ref有两种方式, 一种是标签内的回调, 一种是创建ref容器
  1. 创建ref容器
  inputRef = React.create()
  this.inputRef.current.属性

  2. 标签内回调
  ref={c = this.keyWordElement = c}
  this.keyWordElement.value


  Search = () => {
    // 获取用户的输入
    let value = this.inputRef.current.value

    // 发送网络请求 给谁发 往哪发? 发送方式? 带什么过去?
    axios.get(`https://api.github.com/search/user?q=${value}`).then(res => {
      console.log(res.data)
    })
  }
 -->


- 2. 我们先获取文本框内用户输入的值, 然后拿着值去服务器请求数据, 然后我们做展示
<!-- 
  这里我们使用了 github给我们提供的接口, 会根据我们输入的值, 返回对应的数据
  https://api.github.com/search/user?q=xxxxxx xxx是关键词

  但是有一个问题, 连续请求多次后 页面直接会变成401 github就会认为你是非法请求
  我们在这个案例中是这么设计的

  :3000                       github
  客户端                       cors解决了跨域问题
          ↘               ↗
                :5000
                服务器

  我们在5000端口的服务器上做了两个接口, 一个接口会向github请求数据, 这个接口也会有被github定为非法请求的情况

  但是我们还做了一个接口, 我们在这个接口模拟了一少部分的数据, 访问这个接口的时候会返回固定的我们模拟好的数据
 -->


- 3. 接下来我们开始请求数据的逻辑
- 注意 我们在3000, 要向5000端口发送请求, 是不是跨域, 是不是要配置代理
- 上线的网站很少有用cors解决跨域的


- 配置完代理后前端代码需要改下 改成同源 代理也在跟你一个端口的位置
<!-- 
  // 本来我们要给5000发
  axios.get(`http://localhost:5000/search/users?q=${value}`)

  // 配置完代理后给3000发
  axios.get(`http://localhost:3000/api1/search/users?q=${value}`)


  // 前端代码:
  Search = () => {
    // 获取用户的输入
    let value = this.inputRef.current.value
    
    // 发送网络请求 给谁发 往哪发? 发送方式? 带什么过去?
    axios.get(`http://localhost:3000/api1/search/users?q=${value}`).then(res => {
      console.log(res.data)
    })
  }


  // 代理
  const proxy = require('http-proxy-middleware')
  module.exports = function(app) {
    app.use(
      proxy('/api1', {  
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      })
    )
  }
  我们只配置到包含端口号就可以

  // 服务器
  app.get('/search/users', (req, res) => {
    // 获取参数
    const {q} = req.query

    // 发送请求
    axios({
      url: 'https://api.github.com/search/users',

      // 这个参数会拼接到url的后面 ?分割
      params: q
    }).then(value => {
      res.json(value.data)
    })
  })

  据说mock和axios有冲突 后端用不了
 -->

- 4. 上面的数据已经可以请求回来, 接下来我们将数据展示在页面上, 我们要在<List>组件中展示, 而我们是<Search>组件搜索回来的东西要交给<List>进行展示, 但是<Search>和<List>是兄弟组件, 他们之间要进行沟通, 但是我们目前没有办法解决这个事情

- 所以我们将<Search>组件请求回来的数据, 给<App>, 然后再由<App>给<List>
- 注意这里, <App>拿到数据放在哪里? state的吧? 所以我们要先初始化state
<!-- 
  // App组件中

  // 初始化状态
  state = {users: []}

  // 状态在哪操作状态的方法就在哪里
  saveUsers = (users) => {
    // 请传递给我users 我好放到状态中
    this.setState({
      users
    })
  }

  // 将saveUsers函数给<Search>
  <Search saveUsers={this.saveUsers}></Search>

  // 将从Search组件里收到的数据交给<List>


  // <Search>组件里面将返回的数据交给App
  axios.get(`http://localhost:3000/api1/search/users?q=${value}`).then(res => {
    let { saveUsers } = this.props

    // 我们交过去的是一个数组
    saveUsers(res.data.items)
  })
 -->


- 5. 上面交接完数据, 也已经把数据交给了<List> 那么我们就可以利用数据做页面的展示
- 有多少个结构直接遍历就好, 我们对拿到的数据进行map遍历
<!-- 
  render() {
    let {users} = this.props
    return (
      <div className="row">
        {
          // 需要展示多少个item 遍历他们
          users.map((item) => {
            return (
            // key 加在这里
            <div className="card" key={item.id}>

              <a href={item.html_url} target="_blank" rel='noreferrer'>
                <img alt='avatar' src={item.avatar_url} style={{ width: '100px' }} />
              </a>
              <p className="card-text">{item.login}</p>

            </div>
            )
          })
        }
      </div>
    )
  }
 -->

- 6. 上面完成了展示工作, 接下来我们完善一下这个案例
- 一上来 <List>组件中应该有欢迎词
- 点击搜索按钮的时候 <List>应该展示loading动画

- 那我们想想<List>组件的区域都能展示什么
- 1. 刚加载的时候要展示欢迎词
- 2. 展示loading
- 3. 展示数据
- 4. 请求失败的err提示语句

- 也就是说效果应该是页面刚加载完 我们<List>组件需要展示初次展示的欢迎词, 加载的时候展示的loading, 失败的时候的err提示

- 那List需要展示不同的东西, 我们一直在说state中的数据驱动着页面的展示, 我们想让List有4种不同的展示, 那就意味着我们应该有4种不同的状态数据, 根据改变这4个状态数据, 驱动页面的4种变化

- 比如isfirst为true我们应该展示初次欢迎词的组件, 如果isLoading为true那就应该展示Loading动画的组件

- <Search>组件中的逻辑
- 那什么时候在哪里改变这些标识变量呢? 我们在点击search按钮函数里面写逻辑

- 点击search按钮代表正在获取数据需要展示Loading动画 关闭欢迎词组件

- 所在当点击了按钮后, 在回调中我们要将isfirst改为false, isLoading改为true

- 数据回来后, 我们也要通知App修改状态和将请求回来的数据存放到state的users里面, 通知数据回来也不用展示loading组件了, 也将isLoading改为false等

- 如果我们请求数据出错了 我们还要更新状态 我们要把错误信息存在err里面
<!-- 
  // 初始化状态
  state = {
    users: [],

    // 用于标识该应用或者该页面是否是第一次打开
    isfirst: true,

    // 标识是否处于加载中
    isLoading: false,

    // 存储请求相关错误信息, 
    err: false
  }
 -->

- 逻辑我们想完了接下来看看 App中我们应该定义什么样的方法
- 所以我们需要在App组件中定义如下的方法 并全部传递给<Search>
<!-- 
  
  saveUsers = (users) => {
    this.setState({users})
  }
  changeIsFirst = (isfirst) => {
    this.setState({isfirst})
  }
  changeIsLoading = (isLoading) => {
    this.setState({isLoading})
  }
  saveErr = (err) => {
    this.setState({err})
  }
 -->

- 可是我们发现 每一个方法内部都是在更新状态 那我们定义一个通用的方法, 用来做这4种逻辑的处理
<!-- 
  // 参数: stateObj 请给我传递一个state obj
  updateAppState = (stateObj) => {
    this.setState(
      stateObj        // stateObj本身就是一个状态对象直接丢进去
    )
  }
 -->

<!-- 
  Search = () => {
    let value = this.inputRef.current.value

    // 这是点击搜索按钮后的逻辑
       获取完用户输入的值之后 马上就要发送网络请求了 我们在发送网络请求之前
      
       通知App组件更新状态 
       1. isFirst改为false(用于关闭欢迎词组件) 
       2. isLoading改为true(用于展示Loading动画)
    
    this.props.updateAppState({
      isFirst: false,
      isLoading: true
    })

    axios.get(`http://localhost:3000/api1/search/users?q=${value}`).then(res => {
      
      // 数据回来之后 也要通知App更新状态
         1. isLoading改为false(用于关闭Loading动画)
         2. 数据回来后将请求回来的数据存放在users里面

         1. 如果请求失败将错误信息放到state中的err对象
         2. isLoading改为false(用于关闭Loading动画, 请求成功和请求失败都是请求有结果了) 

      this.props.updateAppState({
        isLoading: false,
        users:res.data.items

      }, err => {
        
        this.props.updateAppState({
          isLoading: false,
          err
        })

      })
    })
  }
 -->

- 我留下了一个问题????
<!-- 
  // state中是一个对象 一共有4个状态
  {
    users: [],
    isfirst: true,
    isLoading: false,
    err: false
  }

  // 但是我们写的逻辑 每一种逻辑里面只改变1-2种 但是传递过去的也是一个对象, 改两种不会将4种都覆盖掉么?

  // 比如这个就会改两种, 这种丢过去 不会覆盖掉state中的状态么
  this.props.updateAppState({ isLoading: false, err})
 -->

- 测试一下
<!-- 
  // 这是state中原始状态
  err : false
  isFirst : true
  isLoading : false
  users : []

  // 我们点下搜索按钮, 改改修改后的状态 和 会不会覆盖的问题
  err : false
  isFirst : false
  isLoading : false
  users : []


  诶? 不会覆盖啊
 -->

- <App>创建状态, <Search>负责修改状态, <List>根据App传递过来的状态做展示工作
<!-- 
  // 我们也要将 数据 传递给 <List>
  <List {...this.state}></List>

  那<List>就能接到
  err isFirst isLoading users
 -->

- 上面我们已将状态维护好了, 标识什么时候展示什么画面的变量的逻辑写好了, 接下来就要考虑展示的画面
<!-- 
  err的时候展示什么 ?
  isFirst   -- true -- 展示 欢迎 的页面
  isLoading -- true -- 展示 loading 的页面


  <div className="row">
  -------     A 这个是users回来之后才能展示的画面
    {
      // 需要展示多少个item 遍历他们
      users.map((item) => {
        return (
        <div className="card" key={item.id}>
          <a href={item.html_url} target="_blank" rel='noreferrer'>
            <img alt='avatar' src={item.avatar_url} style={{ width: '100px' }} />
          </a>
          <p className="card-text">{item.login}</p>
        </div>
        )
      })
    }
  -------     A 结束

  我们的做判断 可以jsx里面没有办法写if语句 我们使用 三元表达式的连续写法
  {
    isFirst ? <h3>欢迎使用, 输入关键字, 随后点击搜索</h3> :
    isLoading ? <h3>Loading...</h3> :
    err ? <h3>{err}</h3> : 
    users.map...
  }
  </div>

  注意:
  state: {err} 这里我们存的是错误对象, 我们在页面上展示的也是错误对象, 这样就会报错, 因为我们不能展示一个对象, 所以我们在结构中应该展示的错误信息
  <h3>{err.message}</h3>

  这里不要
 -->


> 技巧补充:
- 如果我们站在3000给3000发请求的时候, 端口号(包含)都可以不写 直接写接口就可以

- 连续的结构赋值:
- 连续结构赋值 解出来的是最终值 也就是value
<!-- 
  我给一个input绑定了ref, 我们从input中取到value值
  let {value} = this.inputRef.value

  我们还可以从this上取出节点, 再取出节点上的值
  let {inputRef:{value}} = this
      先从this上取出input节点, 然后再从节点上取值

  --- 

  练习: 连续解构赋值
  let obj = { a: { b: { c: 1 } } }
  console.log(obj.a.b.c)

  let {a:{b:{c}}} = obj
  console.log(c)


  练习: 链接结构赋值 + 对c重命名
  let {a:{b:{c:data}}} = obj
  console.log(data)
 -->

----------------------------

### 消息订阅与发布技术 (兄弟组件之间通信 or 任意组件之间的通信)
- 这节里面我们看看兄弟组件之间怎么直接进行数据的交互
- 我们开始的时候为什么把状态放到App组件里面 
- 这四个状态是List在用, Search来操作, 由于兄弟组件之间没有办法直接通信, 然后我们把东西放在App组件里了
<!-- 
  父子之间通信使用 <标签属性直接传递>
  子父之间通信使用 父通过<标签属性传处理函数>, 子接函数将数据作为实参传过去
 -->

- 那兄弟之间怎么互相进行通信呢? 什么又是消息订阅呢?
<!-- 
  // 我们先看看订阅报纸
  订阅报纸:
    1. 我们需要交钱, 说好地址, 说好订阅哪一种报纸
    2. 我们等着收报纸 邮递员送报纸


  订阅消息 和 订阅报纸 是一样的, 首先要互相商量好消息名是什么
    1. 消息名 
      比如两个人要是用对讲机通话最好调整成一个频段 这样互相才能收到信息

    2. 发布消息
      只有发布消息, 另一边才能接收的到
 -->

- 总结一下:
- 我们要先订阅消息, 别人发布这个消息的时候你才能收的到


> 消息订阅  -  发布机制  -  PubSubJS
- 它是一种机制 或者说是理念, 有很多的库去实现这种机制
- PubSubJS是比较主流消息订阅与发布的JS库

> pubsub-js库的使用方式
- 1. npm install pubsub-js --save
<!-- 
  https://github.com/mroderick/PubSubJS
 -->

- 2. 官网案例
<!-- 
  // 引入
  // es6的引入方式
  import PubSub from 'pubsub-js'

  // cjs的引入方式 代表服务器端也能用
  const PubSub = require('pubsub-js');


  // 使用方式

  // 参数1: 消息名
  // 参数2: 别人想交给你的数据
  var mySubscriber = function (msg, data) {
      console.log( msg, data );
  };


  
  我们订阅了什么消息的名字 MY TOPIC;   
  // 参数1: 消息名
  // 参数2: 回调函数
    如果有人发布了MY TOPIC的消息 我们的订阅就起作用了, 我们收到消息之后就会调用这个回调函数
  var token = PubSub.subscribe('MY TOPIC', mySubscriber);


  // 发布消息
  参数1: 消息名
  参数2: 携带的数据
  PubSub.publish('MY TOPIC', 'hello world!');
  PubSub.publishSync('MY TOPIC', 'hello world!');


  // 单词解析:
  subscribe: 订阅的意思
 -->


- 2. 我们在需要接收数据的组件里订阅消息(指定消息名MY TOPIC), 如果有人发布消息了, 就会调用回调函数 mySubscriber
<!-- 
  // token 就是每一次订阅消息产生的id 以后不想订阅消息的时候(比如组件被卸载了就不需要订阅消息了)
  var token = PubSub.subscribe('MY TOPIC', mySubscriber);

  // 取消订阅
  PubSub.unsubscribe(token)


  // 回调函数 可以直接写在PubSub.subscribe第二个参数里面
  var mySubscriber = function (msg, data) {
    console.log( msg, data);
  };



  -------               -------
  A组件:                B组件:

  // 想想上面订阅报纸的流程
  A组件想收到B组件给的东西(B提供东西给A),  A组件就要在自己的组件里(家里)使用命令订阅消息(这样别人知道你在哪里好送报纸啊)

  B组件里通过某种语法 发布这个消息, 发布消息的同时在把数据带过去
 -->

- 3. 发布消息
<!-- 
  // 发布消息
  参数1: 消息名
  参数2: 携带的数据
  PubSub.publish('MY TOPIC', 'hello world!');
  PubSub.publishSync('MY TOPIC', 'hello world!');
 -->


> 总结:
- 1. 引入PubSub模块
- 2. 接收方在本组件里面订阅消息
- 3. 发布者在自己组件里面发布消息
- 4. 组件没了的时候取消消息

- 1. 
- 我们把消息的订阅和发布 应用在上面的案例中
- <List>订阅消息, <Search>把自己搜索出来的结果通过消息发布的形式交给<List>
<!-- 
  我们在上面的案例中 使用一下pubsub-js库

  之前是因为 没办法兄弟组件之间传递数据, 所以我们将state放在了App组件里面, 
  现在我们使用 消息订阅和发布的方式 完成逻辑 所以 App组件中的state, 可以删掉了
  
  我们在<List>组件中定义这个state, 因为是List组件根据状态里面的标识变量去展示具体的信息, 直接的使用者

  但是我们在List组件中定义了状态, 然后List组件内使用根据该状态展示内容, 但是谁来改变这个状态呢?

  <Search>是执行搜索拿到数据 然后把什么时候展示什么内容(标识变量的改变的结果)交给<List>
 -->

- 2. 
- <List>需要接收东西 它就要订阅消息, 那<List>组件什么时候订阅消息合适?
<!-- 
  组件一旦放在页面上了 就要马上订阅消息吧 componentDidMount

  // 页面一加载开始订阅消息
  componentDidMount() {
    PubSub.subscribe('viewData', (_, data) => {
      console.log(data);
    })
  }
 -->
  
- 3. 
- <List>组件订阅了消息, <Search>组件发布消息吧
> PubSub.subscribe('msg', (msg, data)=>{})   订阅
> PubSub.publish('msg', data)                发布

<!-- 
  <List>组件订阅消息:

  // 页面一加载开始订阅消息
  componentDidMount() {
    PubSub.subscribe('viewData', (_, stateObj) => {
      // 只要给我状态对象 我就更新状态对象
      this.setState(stateObj)
    })
  }



  <Search>组件发布消息

  Search = () => {
    // 获取用户的输入
    let value = this.inputRef.current.value

    // 通知List组件更新状态
    PubSub.publish('viewData', {isFirst:false, isLoading:true})

    axios.get(`http://localhost:3000/api1/search/users?q=${value}`).then(
      res => {
        // 数据回来之后 也要通知List更新状态
        PubSub.publish('viewData', { users: res.data.items, isLoading: false })
      }, 
      err => {
        // 请求失败后通知List更新状态
        PubSub.publish('viewData', { err, isLoading: false })
    })
  }
 -->

**注意: 我发现发布消息的时候, 里面使用的变量不用事先获取和定义**


> 总结
- 1. 订阅消息需要组件一挂载的时候开始订阅 componentDidMount 这里面做一些初始化的事儿 开启定时器 订阅消息

- 2. 函数中有一些形参不想用, 我们可以用_来占位
<!-- 
  PubSub.subscribe('viewData', (_, data) => {
      console.log(data);
    })
 -->

- 3. 以后谁用状态 状态就放在谁那里, 别人想改这个状态, List订阅消息, Search发布消息来修改, List里面接到状态对象就存(修改), 别人通过发布修改

- 4. 什么时候订阅 什么时候取消订阅
<!-- 
  componentDidMount() {
    this.token = PubSub.subscribe('viewData', (_, stateObj) => {
      // 只要给我状态对象 我就更新状态对象
      this.setState(stateObj)
    })
  }

  componentWillUnmount() {
    PubSub.Unsubscribe(this.token)
  }
 -->

----------------------------

### Fetch发送请求
- 以前我们使用ajax发送的请求的时候大多数都使用的jQ 和 axios, 那么能发送ajax的方式有哪些呢?
<!-- 
  1. 创建XmlHttpRequest对象的实例对象 xhr
  2. jQuery
  3. axios

  而jQuery和axios其实都是对xhr的封装(axios后端里是http的封装), jQ和axios都是第三方的组织都需要下载
 -->

- 其实还有一个人也能发送ajax请求, 它不是对xhr的封装, 返回的对象也是promise, 它是window的一个内置对象 有浏览器就能用 它就是fetch函数
<!-- 
  真正项目里面用的不是很多 兼容性有问题 老版本的浏览器
 -->


> fetch(参数1, 参数2)
- fetch()是属于全局对象的 可以直接去调用返回的结果是一个promise对象
- 响应的结果在then()方法中获取

- 参数
- 1. 是一个请求资源的服务器地址
- 2. 一个配置对象, 包括所有对请求的设置
- method:   请求方法
- headers:  自定义请求头
- body:     请求体


> post请求 (先看下面 这仅仅是后期的知识补充)
<!-- 
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),

  }).then(function(data) {
    console.log(data)

  }).catch(function(e) {
    console.log(e)
  })
 -->

> 我们可以直接传入参数1 url然后then中取结果 (默认get请求) 
<!-- 
  fetch(`http://localhost:3000/api1/search/users2?q=${value}`).then(

    // 看看服务器能不能联系成功
    res => {console.log('联系服务器成功了', res)},

    // 断网了才会走失败, 不然都会联系服务器成功 即使服务器里面没有对应接口可是会走成功的回调, 只是服务器返回的信息里面, 标识着具体信息 比如404
    err => { console.log('联系服务器失败了', err)}
  )
 -->

- 出现个问题, 我们发送请求 然后响应也表示成功返回, 但是我们在res中找不到数据在哪里, 这就是fetch所用的关注分离思想
<!-- 
  - 关注分离:
  - 复杂的事儿拆成一步步的, 我们把一个比较复杂的事情 拆分成一块快的 不至于我们从头到尾的关注整个事情

  上面的fetch可以分成, 第一步 我们先看看和服务器联系成功了没? 响应是200但是没数据的原因是, 服务器告诉你成功了

  我们找服务器要东西要先联系服务器吧(不是发请求成功就把数据带回来了), 看联系上了之后我们再拿数据
 -->

- 那怎么取数据?
- then中第一个参数 res 响应结果身上有一个json(), 我们的数据就保存在这个json()方法中, log(res.json()), 它返回的是一个promise对象, 我们要是想取数据, 应该这样
<!-- 
  fetch(`http://localhost:3000/api1/search/users2?q=${value}`).then(
      res => {
        return res.json()
      },
      err => { console.log('err', err)}
    ).then(data => {
      console.log(data)
    })

  上面的有两个then()方法, A和B
  因为 return res.json() 它是一个promise对象, 就意味着A then()的返回值也是一个promise实例对象, 这个返回值的状态和 res.json()是一样的, 也就是说res.json()返回的promise实例对象 就作为A then的返回值使用了
  
  相当于把return res.json()返回的promise对象, 交给A then了, 所以A then的返回值也是一个promise对象, 状态和res.json()一样

  res.json()是成功那么A的then就是成功, res.json()是失败那么A then就是失败, 所以才能
 -->

> 总结:
- 使用fetch采用的是关注分离理念, 第一个then代理 询问服务器状态是否可连接, 数据要通过第一个then中的res.json()方法, 它是一个promise对象, 我们把它return出来, 数据在第二个then中获取
<!-- 
  // 先联系服务器询问状态
  fetch(`http://localhost:3000/api1/search/users2?q=${value}`).then(
      res => {
        // 返回 promise对象
        return res.json()
      },
      err => { console.log('err', err)}

    // 真正的拿数据
    ).then(data => {
      console.log(data)
    })
 -->

- 上面的情况我们模拟了一下断网, 发现显示 先联系服务器成功失败, 获取数据成功 数据为undefined? 为什么都断网了还会显示获取数据成功?

- 我们断网了 走的是请求失败的回调, 失败的回调有返回值值为undefined

- Athen中如果err返回的是一个非promise的值, 那么A then返回的promise实例状态就为成功的 值就为undefined, 所以B then中会走第一个res回调

> 中断promise链 return new Promise(() => {})
- 但是这并不好, 如果是服务器链接失败 就不应该到B then里面了
<!-- 
  A
  then(
    res => {},
    err => {
      console.log(err, '服务器链接失败')

      // 这里因为失败了不想走B then了, 所以中断promise链式调用 我们返回一个初始的promise实例
      return new Promise(() => {})
    }
  ).
  B
  then(
    res => {},
    err => {}
  ).

  // 其实我们可以在最后统一处理错误 A B then中的错误回调都不用写
  catch(err => {console.log(err)})
    catch用于统一处理错误
 -->

> 我们使用async await 进行优化
- 我们把上面的请求再继续优化一下, 因为我们想要获取一个promise对象成功时的结果可以使用async await, 上面需要获取两次成功的结果, 先取出一个成功的结果 发现是一个promise实例, 再用await再取一次

- 要点1: async加在里await最近的函数身上
- 要点2: await的右侧必须是一个promise对象
- 要点3: await只能等到成功的结果, 异常它不管

> 由于await 只能等到成功的结果, 我们处理异常的时候要使用try catch
- 将可能出现错误的代码写在try里面, 一旦出现错误了就会到catch里
<!-- 
  Search = async() => {
    
    // 解决错误的 try catch

    try {

      // async await 对上面的请求进行优化
      const res = await fetch(`http://localhost:3000/api1/search/users2?q=${value}`)

      // res.json() 返回的是一个promise对象
      const data = await res.json()
      console.log(data)

    } catch(err) {
      console.log(err)
    }
  }
 -->

----------------------------

### 案例: Github搜索案例结束 总结
- 1. 设计状态的时候要考虑全面, 例如带有网络请求的组件, 要考虑请求失败怎么办
- 2. 解构赋值 + 重命名
- 3. 消息订阅与发布机制
  - 先订阅 再发布(理解: 有一种隔空对话的感觉)
  - 适用于任意组件间的通信
  - 在组件挂载 销毁的生命周期里面做订阅和取消订阅的操作

- 4. fetch发送请求(关注分离的设计思想)

----------------------------

### React路由
- 我们使用Vue和React写的网页都是SPA页面, 都是单页面
- 以前我们多页面应用, 会发现一个场景有10个按钮, 那就有对应的10个html文件, 而且在页面切换的过程中, 会整体的刷新页面


> SPA的理解
- 单页Web应用（single page web application，SPA）
- 整个应用只有一个完整的页面。
- 点击页面中的链接不会刷新页面，只会做页面的局部更新。
- 数据都需要通过ajax请求获取, 并在前端异步展现

- spa页面它的用户体验会更好 对服务器的压力更新 比如多应用的程序中 页面中可能会有相同的部分 在多应用的程序中就会被加载两次 如果是单应用的程序只需要加载一次就可以了 

- 为了有效的使用单个页面管理原来多页面的功能 前端路由就应运而生
- 前端路由的功能 就是让用户从一个视图(页面)导航到另一个视图(页面)


> react路由做了什么?
- 我们点击链接按钮后, 页面不刷新只是改变地址栏中的URI的部分, 然后路由中有一个人专门检测浏览器路径的变化, 一旦看见了变成那个URI了就会展示对应的组件

- 说白了 前端路由就靠浏览器地址栏中的路径, 这就是一种映射关系, 每一种URI都会对应一个组件(多页面的应用是每一个路径对应一个真实的页面)
<!-- 
  比如 我们一上来是
  127.0.0.1:5000

  点击链接按钮后
  127.0.0.1:5000/home
 -->


> 路由的理解
- 一个路由就是一个映射关系(key:value)
- key为路径, value是组件
- 前端路由是一套映射规则 在React中 是url路径 与 组件的对应关系
<!-- 
  根据key 找value
  使用react路由简单来说 就是配置路径 和 组件 (配对)
 -->


> 路由分类
- 1. 后端路由
  - 理解： value是function, 用来处理客户端提交的请求
  - 注册路由： router.get(path, function(req, res))

  - 工作过程：
    当node接收到一个请求时, 根据请求路径找到匹配的路由, 调用路由中的函数来处理请求, 返回响应数据


- 2.前端路由：
  - 浏览器端路由，value是component，用于展示页面内容。
  - 注册路由: <Route path="/test" component={Test}>

  - 工作过程：
    当浏览器的path变为/test时, 当前路由组件就会变为Test组件


> 前端路由的原理
- winodw(BOM) document(DOM)

- 前端路由也要靠着一个人 它是浏览器的历史记录history
- 前端BOM浏览器对象身上有一个历史记录history, 

- history专门用来管理浏览器路径, 历史记录, 我们可以使用history身上的API进行直接操作, 但是不是很好用 所以我们借助了一个js库来帮我们进行操作


> 不使用vue 和 react 实现不刷新页面 跳转页面
- 1. 下载history.js文件
- 2. 创建 history 对象


> 方法一，直接使用H5推出的history身上的API
- 这个方法是H5推出的 比较老的浏览器不支持这些API 可以使用方法2
<!-- 
  // 创建一个浏览器history对象
  let history = History.createBrowserHistory()
-->


> 方法二，hash值（锚点）
- 这个方法利用了hash值, 属于锚点跳转
- 下面的方法都可以用产生的效果是 /的前面多出一个#  #/test1
- 锚点跳转不会刷新页面, 但是会留下历史记录

- 效果看起来不好看但是效果极佳
<!-- 
  let history = History.createHashHistory()

  方法1的效果
  http://127.0.0.1:5500/test1


  方法2的效果
  http://127.0.0.1:5500#/test1
 -->


> history.push(path)
- 往浏览器的历史记录中推一条数据
- 当我们页面没有产生历史记录的时候, 是没有办法前进和后退的, 当我们可以点击后退的时候, 代表浏览器的历史记录里面多了一条
<!-- 
  <a href="http://www.atguigu.com" onclick="return push('/test1') "></a>

  function push (path) {
    history.push(path)
    return false
  }

  上面我们将 /test1 推到历史记录中 一个一个往里推, 最后一个推进去的就是我们正在浏览的页面
 -->


> history.replace(path)
- 也是往历史数据里面推数据, 但是是替换掉栈顶的记录


> history.goBack()
- 后退


> history.goForward()
- 前进


> history.listen((location) => { ... })
- 监听地址是否变化 发生变化就会执行回调函数
- 参数是地址栏对象, 包含
<!-- 
  hash: ""
  pathname: "/test1"
  search: ""
 -->

<!-- 
  history.listen((location) => {
    console.log('请求路由路径变化了', location)
  })
 -->


- 什么是push 什么是replace?

> push
- 浏览器的历史记录是一个栈的结构, 我们结合自己的案例来说, 当我们初始页面的时候, 地址栏里 我们看下注释
<!-- 
  3.   127.0.0.1:5500/test2               再点击又会往历史记录里面添加一条
  2.   127.0.0.1:5500/test1               当我们往历史记录里面push的时候
  1.   127.0.0.1:5500/前端路由的基石.html
 -->

- 上面我们能看见 栈顶是3, 栈底是1, 而栈顶的一定是我们正在看的, 当我们点击浏览器的后退按钮, 它就会让3出栈2就会露出来我们就会看到2

- 我们点击前进的时候 会再把3压入栈, 我们的当前页面就又是3(栈顶)


> replace
- 我们再来看看这个, 初始页面是1, push了2次是2 3, 而replace翻译过来叫做替换, 如果我们点击replace按钮的话
<!-- 
  3.   127.0.0.1:5500/test2               push动作
  2.   127.0.0.1:5500/test1               push动作
  1.   127.0.0.1:5500/前端路由的基石.html  初始页面

  当我们点击 replace按钮的时候, 我们是对栈顶的那条记录 进行了一个替换的动作

  3.   127.0.0.1:5500/test3               replace动作 原3被替换掉
  2.   127.0.0.1:5500/test1               push动作
  1.   127.0.0.1:5500/前端路由的基石.html  初始页面

  所以我们点后退按钮的时候 不会回到/test2了, 会回到/test1 因为/test2 没了被替换掉了
 -->

----------------------------

### react路由的基本使用
- react-router 
- 是react的一个插件库, 专门用来实现一个SPA应用, 基于react的项目基本都会用到这个库

- 原理:
- 点击导航引起路由器变化, 路径变化被路由器检测到 进行匹配组件, 从而将组件进行展示


- react这个库有 它下属有3个子库, 分别给3种平台去用
- 1. web 给我们前端用   --  我们学习这个  react-router-dom
- 2. 用react做原生开发react native的人使用的
- 3. any 在哪都能用

<!-- 
  路由:   route
  路由器: router

  我们家里面的猫可以理解为路由器, 而路由器后面的插口就是路由

  路由和路由器
  路由器是用来管理各个路由的
 -->

- 脚手架中并没有帮我们下载 react-router-dom


- 印记中文 -- 中国人维护的文档网站
- https://react-router.docschina.org/web/guides/philosophy


> 使用方式
- npm i react-router-dom


> 前端路由的实现方式
- 1. 点击导航区 影响路径的变化
- 2. 检测路径变化, 匹配组件


- 引入我们下载好的 路由库react-router-dom
<!-- 
  React里面有很多的功能, 所以是靠{ }来取, 我们用什么从React中取什么?
  import {BrowserRouter, Link} from 'react-router-dom'
 -->

> 路由的三个核心组件 <Router> <Route> <Link>

> 路由器: <Router>(<BrowserRouter> / <HashRouter>)
- 用来管理 路由链接
- 我们的路由链接都应该在<Router>的内部, 路由链接都交给路由器来管理

- <Router> 分为两种, 下面的两种就相当于我们上面使用history-js库中的两种使用方式, 一种是hash模式, 一种是H5新增的模式

- 1. <BrowserRouter>
- 2. <HashRouter>

- 当我们使用<Router>的时候 我们要指定使用哪一种路由器
- 使用 <BrowserRouter> 的时候 路径中 没有#
- 使用 <HashRouter> 的时候 路径中 会有#

**同时要使用选择的路由器 将整个应用包裹起来**
- 也就是使用 路由器 包裹整个应用 我们才能使用路由功能
<!-- 
  <BrowserRouter>
    <div className="App">
      // 省略页面内容
    </div>
  </BrowserRouter>
 -->

- 还可以这样
- 我们在index.js入口文件, 将整个<App>组件使用<BrowserRouter>包裹起来
<!-- 
  import {BrowserRouter, Link} from 'react-router-dom'

  <BrowserRouter> 
    <App /> 
  </BrowserRouter>


  还可以这样
  import {BrowserRouter as Router, Route, Link} from "react-router-dom"

  引入 BrowserRouter 的时候 起一个别名 Router
 -->


> 路由链接: <Link to> (router-link / <a>)
- 上面我们用<BrowserRouter>包裹了整个应用 然后在内部 我们使用<Link>组件来达到a标签的效果

- 我们在index.js入口文件, 将整个<App>组件使用<BrowserRouter>包裹起来
<!-- 
  <BrowserRouter> <App /> </BrowserRouter>
 -->

- 单独使用的时候 也要用<BrowserRouter>包裹起来 我们可以使用它包裹app组件的div
<!-- 
  <BrowserRouter> <Link /> </BrowserRouter>
 -->

- 和原生HTML <a> 标签一样的功能, <Link>来实现组件之间的切换

> 标签内部属性 to :
- <Link to='/路径'>, 将URI修改为对应组件的路径，请求该资源, 和href一样的功能

> 标签内部属性 children :
- <Link children='Home'>, 可以指定标签体内容
<!-- 
  <BrowserRouter>
    <Link className="list-group-item" to='/home'>Home</Link>
    <Link className="list-group-item" to='/about'>About</Link>
  </BrowserRouter>
 -->


> 注册路由: <Route path component> (router-view / 路由的出口)
- 不要忘记外侧要包裹路由器标签 <BrowserRouter>
- 用来配置 路径 和 组件之间的映射管理, 也叫做注册路由

- 点击<Link>后会查看路径上的变化, 然后我们要实现切换到与路径匹配的组件 这里就需要通过<Route>组件来实现 它也决定我们的页面在哪个位置显示

- 标签属性
- <Route path='/home' component={引入的组件}>
<!-- 
  <Route path='/about' component={About} />
 -->

- <Route exact> 开启精准匹配
- 没有耽误我们页面的呈现, 我们就不开启严格匹配, 比如点击都往一个地方跳 这时候我们再开启严格匹配


**注意:**
- 1. 标签内部的属性中, 不要用大写(实际上大小写是一样的), html不认识
- 2. <Link>是改变路径, 是在url上进行拼接, 所以直接写 /about 不要写 .
- 3. 整个应用(页面)或者说是组件都必须用一个<BrowserRouter>去管理, 所以我们可以直接将<App>组件包裹起来
  - 不要如下操作 下面这种就属于整个应用 用了两个 路由器去管理
  <!-- 
    <BrowserRouter>
      <Link></Link>
    <BrowserRouter>

    <BrowserRouter>
      <Route></Route>
    <BrowserRouter>
   -->

- 完整代码
<!-- 
  index.js 文件
  ReactDOM.render(
    <BrowserRouter><App /></BrowserRouter>, 
    document.querySelector('#root')
  )
 -->


> 总结:
- 把页面拆分成组件的时候, 我们可以看看哪个部分变了, 将变化的部分拆分成组件
- 明确好界面中的导航区 和 展示区
- 导航区的a标签改为Link标签
<!-- 
  <Link to>
 -->

- 展示区的route标签进行路径的匹配
<!-- 
  <Route path component>
 -->

- <App>的最外侧包裹一个<BrowserRouter>或<HashRouter>

> 常用组件的说明
- <BrowserRouter> 应该包裹整个应用 一个React应用只需要使用一次
- <Link> 最终会被编译成a标签 to会成为href to的值就是pathname(location.pathname)
- <Route>指定路由展示组件的相关信息 它写在哪里渲染出来的组件就展示在哪里


> 扩展
- www.baidu.com/#
- #号后面的叫做hash值, 也叫作锚点值
<!-- 
  比如 我们把 /home 拼接到url上的时候 会是

  www.baidu.com/# + /home

  www.baidu.com/#/home
 -->

- hash值的特点就是
- #后面的东西都不会作为资源发送给服务器, #后面的东西都属于前台资源不会带给服务器

----------------------------

### 路由的执行过程
- 1. 点击 link 修改了浏览器地址栏中的url
- 2. react路由监听到地址栏 url 的变化
- 3. react路由内部遍历所有 Route 组件 使用路由规则(path)与pathname进行匹配
<!-- 
  拿着Route path属性对应的值 去和 地址栏中pathname进行比较
 -->
- 4. 当路由规则path能够匹配地址栏中的pathname的时候 就展示该Route组件的内容

----------------------------

### 默认路由
- 问题：
- 现在的路由都是点击导航菜单后展示 如何在进入页面的时候就展示组件呢
- 默认路由
- 表示进入页面时候就会匹配的理由
- 默认路由path为 /
<!-- 
  <Route path="/" component={home} />
 -->

----------------------------

### 匹配模式

> 模糊匹配
- 问题
- 当link组件的to属性值为 "/login" 时 为什么默认路由也被匹配成功? 
<!-- 
  <Link to="/login">登录页面</Link>
  <Route path="/" component={Home} />    它也会被匹配

  当我们点击 登录页面 按钮的时候 正常来讲页面就应该只显示login页面的内容
  因为路径应该是 /login 所以只展示匹配的对应的组件内容

  但是我们发现页面上不仅有 login 的内容 还有默认路由的内容 也就是说 它还匹配上了 /
 -->

- 因为默认情况下 react的路由是模糊匹配的
- 模糊匹配的规则
- 只要pathname以path开头就会匹配成功
<!-- 
  pathname 就是 Link to属性的值
  也就是说 只要to属性的值/login 是以path开头的/ 就会匹配成功

  因为拿着 Route 中的属性path的值 去匹配 Link的to属性的值
  基准就是 path的值 开头 就会匹配成功

  我们的例子里 Route - path 的值为 /
  然后就去看 Link - to 的值为 /login 是以/开头 所以匹配成功
 -->

- 再看些例子
- 默认路由会被所有的路径匹配上 因为都是以/开头的
<!-- 
    path 代表Route组件的path属性
    pathname 代表Link组件的to属性 也就是location.pathname


    path        能匹配的pathname

    /           所有的pathname

    /first      /first 或 /first/a 或 first/a/b
 -->


> 精准匹配
- 上面说了默认路由会匹配所有的路径 但有些情况我们不希望这种现象发生怎么处理
- 比如 我们点击首页的时候 希望展示的是默认路由
- 但是 点击登录页面的时候 就不希望默认路由的信息出现了 只显示登录的内容

- 我们给Route组件添加 exact 属性 就可以让其变为 精确匹配模式

> <Route exact path="/" component={...}>
- 只有当path和pathname完全匹配的时候 才会展示该路由

**推荐**
- 给默认路由添加 exact 属性

----------------------------

### 路由组件与一般组件
- 我们上面的小案例当中, 我们虽然在App组件里面引入了 Home组件和About组件, 但是我们并没有在结果中调用组件
<!-- 
  <div>
    <Home />
  </div>
 -->

- 而是通过 <Link to='/home'> 和配合 <Route path='/home' component={Home}> 的形式使用的Home组件是么

- 我们自己调用的<Home />组价 称之为 一般组件
- 而 <Route path='/home' component={Home}> 这样的情况下, Home组件就是路由组件, 也就是说路由组件是靠路由匹配 然后展示的Home


> 一般组件的文件夹 components

> 路由组件的文件夹 pages
- 只要是路由组件就不应该放在 components文件夹里面 也是应该创建一个 pages 的文件夹里面


> 一般组件
- 我们可以通过props给<Home>组件传递数据, 我们传递什么 <Home>组件就会搜到什么, 但是路由组件不同


> 路由组件
- 路由组件最大的特点就是如果能匹配上路径, 路由器就会帮我们去渲染<Home>组件
<!-- 
  path='/home' component={Home}
 -->

- 而路由器在帮我们渲染组件的都会往该组件里面传递一些东西, 我们可以log下this.props
<!-- 
  路由器会往props中 传递以下对象

  history对象
  location对象
  match对象
 -->


> 总结:
- 路由组件 和 一般组件的区别
    1. 写法不同
      一般组件: <Home />
      路由组件: <Route path component>

    2. 存放位置不同:
      一般组件: | - components
      路由组件: | - pages

    3. 接收到的props不同
      一般组件: 我们传什么组件就能收到什么
      路由组件: 接收到三个固定的属性
<!-- 
  // history对象
  history:
      action: "PUSH"
      block: ƒ block(prompt)
      createHref: ƒ createHref(location)
      go: ƒ go(n)
      goBack: ƒ goBack()
      goForward: ƒ goForward()
      length: 8
      listen: ƒ listen(listener)
      location: {pathname: "/home", search: "", hash: "", state: undefined, key: "l6x4sh"}
      push: ƒ push(path, state)
      replace: ƒ replace(path, state)


  // location对象
  location:
      hash: ""
      key: "l6x4sh"
      pathname: "/home"
      search: ""
      state: undefined


  // match对象
  match:
      isExact: true
      params: {}
      path: "/home"
      url: "/home"


  history.location 和 Localtion是一样的, 我们精简一下上面的东西, 把不经常用的删掉

  // history对象
  history:
      go: ƒ go(n)
      goBack: ƒ goBack()
      goForward: ƒ goForward()
      push: ƒ push(path, state)
      replace: ƒ replace(path, state)


  // location对象
  location:
      pathname: "/home"
      search: ""
      state: undefined


  // match对象
  match:
      isExact: true     // 模糊匹配还精准匹配
      params: {}
      path: "/home"
      url: "/home"
 -->

----------------------------

### NavLink的使用
- 我们这个小节做一下点击导航按钮后, 按钮的高亮展示
<!-- 
  高亮也就是给 <Link> 加一个active的类
  <Link className="list-group-item active" to='/home'>Home</Link>
 -->

- 如果我们要让 这个导航按钮点击后有高亮的提示 在react中, 我们不使用<Link>
- 使用 <NavLink> 它是 <Link>的升级版

- 引入 <NavLink> import { NavLink} from 'react-router-dom'


> <NavLink>
- 我们使用这个标签后 点谁就给谁加了一个active, 这也是NavLink的设计理念, 类名必须是active

- 我们也可以指定自己想要的类

- 标签属性:
- <NavLink activeClassName='demo'>
- 指定样式的类
<!-- 
  <NavLink 
    activeClassName='demo' 
    className="list-group-item" 
    to='/home'>Home</NavLink>
 -->


**注��:**
- bootstrap的样式 权重有些高, 如果有些样式不起作用 或者有很怪的事情, 我们加上!important

----------------------------

### 封装 NavLink 组件
- 如果我们的页面上 有很多的导航链接 肯定会写出如下的代码 里面重复性的东西会比较多
<!-- 
  <NavLink activeClassName='demo' className="list-group-item" to='/about'>About1</NavLink>
  <NavLink activeClassName='demo' className="list-group-item" to='/about'>About2</NavLink>
  <NavLink activeClassName='demo' className="list-group-item" to='/about'>About3</NavLink>
  <NavLink activeClassName='demo' className="list-group-item" to='/about'>About4</NavLink>
  <NavLink activeClassName='demo' className="list-group-item" to='/about'>About5</NavLink>
 -->

- 比如我们要求所有的导航按钮上都指定特定的demo类, 那么就意味着 页面上所有的<NavLink>上面都要追加上 activeClassName='demo' 标签属性 和 标签本身的样式

- 在真是的开发中 我们会将重复一样的部分封装起来, 接下来我们对NavLink进行一下封装

- 我们将 <NavLink> 封装成一个组件, <MyNavLink> 以后想写<NavLink>的时候 我们要写我们的封装的组件
<!-- 
  <NavLink> Home </NavLink>

  <MyNavLink to='去哪'> Home </MyNavLink>

  公共的部分我们都封装到 MyNavLink 里了
 -->


> 封装的步骤
- 1. 在<MyNavLink>组件里面 引入 NavLink
<!-- 
  import { NavLink } from 'react-router-dom'
 -->

- 2. 我们将要封装之前的 导航按钮 暴露出去
<!-- 
  return (
    <NavLink className="list-group-item" to='/about'>About</NavLink>
  )
 -->

- 3. 我们要需要动态的部分改掉, 固定的部分留着, 我们需要利用props, 动态的部分让使用组件的人通过props传进来, 我们从props获取然后使用
<!-- 
  比如 我们在想使用<NavLink>的位置使用我们自己定义的组件 MyNavLink
  然后在组件标签中 传递属性
  <MyNavLink to='/home' title='Home'>

  MyNavLink组件中我们有两种方式接收
  1. 我们把传递过来的数据从props中取出来 然后用到各个需要动态展示的位置上
  const {to, title} = this.props
  <NavLink className="list-group-item" to={to}>{title}</NavLink>


  2. 当传递的属性过多的时候, 比如调用者传递了10多个标签属性 我们还可以这么写
  const {title} = this.props
  <NavLink className="list-group-item" {...this.props}>{title}</NavLink>
      将this.props整个放到标签属性中, 单独取出来title使用
 -->

- 但是我们希望NavLink怎么使用 <NavLink to='/home'>Home</NavLink>
- 我们的MyNavLink就怎么使用 <MyNavLink to='/home'>Home</MyNavLink>

- 那我们就要考虑一个问题, 标签属性可以用props, 那么标签体里面的内容用什么解决呢?


> props 还可以通过标签体将内容带过去
- 其实标签体内容也是一个特殊的标签属性 上面的标签体内容Home就算一个特殊的标签属性
<!-- 
  <NavLink to='/home'>Home</NavLink>

  {to: "/home", children:'Home'}

  当我们在标签内部 使用标签属性的方式 传递数据的时候, 我们自己指定了
  key=value

  但是 我们在组件标签的标签体部分 写的Home 也会在 this.props 中
  标签体的内容, 相当于我们指定了value, key是react帮我们指定的 叫children
  children: Home
 -->

> <NavLink children='Home'>
- children属性可以指定标签体内容

- 既然 <组件>标签体内容</组件> 标签体内容也可以传递到组件里的props中那么我们就可以接着封装了
<!-- 
  当导航按钮过多的时候, 标签属性重复的部分太多 我们选择了封装, 想将一样的部分封装起来, 不一样的部分 通过调用组件的人动态传递, 相当于我们想做一个模板
  <NavLink className="list-group-item" to='/home'>Home</NavLink>

  // 我们想呈现的样式, 也是最终的使用方式
  <MyNavLink to='/home'>Home</MyNavLink>


  // MyNavLink组件内
  return (
    <NavLink className="list-group-item" {...this.props}/>
  )

  props中有 to='/home' children='Home'
  {...this.props} 相挡雨将 props 中所有属性都放在标签属性里了

  相当于我们这么写的
  const {to, children}
  <NavLink className="list-group-item" to={to}, children={children}/>

  children用于指定标签体内容
 -->


> 总结:
- NavLink可以实现路由链接的高亮, 可以通过acitveClassName指定样式名
- 标签体内容是一个特殊的标签属性
- 通过this.props.children可以获取组件标签体内容

----------------------------

### Switch的使用
- react中路由的内置组件

- 我们看下下面的情况 这面上有两个 链接按钮, 下面<Route>负责检测地址栏上的变化 匹配路径 匹配上了后展示组件, 但是一个路径匹配了两个组件Home Test, 那最终会展示谁?
<!-- 
  <MyNavLink to='/home'>Home</>
  <MyNavLink to='/about'>About</>


  <Route path='/home' component={Home} />
  <Route path='/about' component={About} />
  <Route path='/home' component={Test} />
 -->

- 我们发现当我们点击 Home 按钮的时候 <Home> <About>组件都展示出来了, 说明一个问题, Route在匹配路径的时候是从上到下的匹配 匹配到<Home>后不会停, 会接着向下匹配, 那当我们注册的路由特别多的时候, 就会产生效率问题

- 那怎么让路径匹配到一个组件后 直接展示 不要再继续向下匹配了呢?

- 我们从 react-router-dom 路由库里面将 Switch 组件 请出来


> Switch 组件
- import { Route, Switch } from 'react-router-dom'

- 如果我们不用<Switch>包裹路由, 那么匹配成功后 仍然会继续往下匹配
- 如果使用<Switch>包裹路由后, 匹配成功后 不会继续匹配
<!-- 
  <Switch>
    <Route path='/about' component={About} />
    <Route path='/home' component={Home} />
  </Switch>
 -->

> 总结:
- 通常情况下, path和component是一一对应的关系
- Switch可以提高路由匹配效率(单一匹配)

----------------------------

### 解决样式丢失的问题
- 我们对上面的案例提一个小需求, 在我们的资源URL前面添加公司的名字或者项目名, 形成二级路由的形式
<!-- 
  com/home
  com/yihui/home

  <MyNavLink to='/atguigu/home'>Home</MyNavLink>
  <MyNavLink to='/atguigu/about'>About</MyNavLink>

  <Switch>
    <Route path='/atguigu/about' component={About} />
    <Route path='/atguigu/home' component={Home} />
  </Switch>
 -->

- 我们多点击几次后发现样式丢了, 上面的小案例是使用bootStrap搭建的, 所以说明一个问题, boot没有加载进来 就意味着有网络请求没有回来

- 我们看下network 却发现 bootstrap 的状态码是 200, 如果是404比较好理解, 说明我们public里面没有或者没有引入, 但是却是200

- 我们点击network里面的boot 观察一下 req.url 我们看下是去哪请求的
<!-- 
  我们先看下正确的请求路径
  req.url
  localhost:3000/css/bootstrap

  3000是一个内置的服务器(依靠devServer搭建起来的)
  public是3000端口服务器的根路径, 你请求啥 我给你啥, 但是你请求的东西没有 我也要给你点啥, 给的就是根路径下的index.html

  脚手架里写了这样的一个配置, 如果我们请求了一个不存在的资源 那么它就会把根路径中的index.html返给你
 -->

- 因为我们在请求路径的前面 添加了/atguigu 点击刷新页面后boot丢失 我们看看当发生错误的时候, 它去哪请求的页面
<!-- 
  <MyNavLink to='/atguigu/home'>Home</MyNavLink>

  正确的请求路径
  localhost:3000/css/bootstrap

  错误的请求路径
  localhost:3000/aiguigu/css/bootstrap


  虽然是错误的请求, 但是由于react内部有配置, 即使我们请求了一个不存在的资源也会将index.html返给你, 所以状态码是200 但是却没有返回boot的资源
 -->

> 那什么时候样式会丢失?
- 当我们的路由路径是多层级的结构, 当页面刷新的时候, 样式就会丢失
- 原因就是它认为多级目录下的atguigu也是3000中的一个路径


> 我们有三种解决办法
- 1. 我们不要使用相当路径 删掉.
<!-- 
  <link rel="stylesheet" href="./css/bootstrap.css">

  删掉 .
  <link rel="stylesheet" href="/css/bootstrap.css">
 -->

- 2. "%PUBLIC_URL% 代替 . 的位置 绝对路径, 该方法只适用于react脚手架
<!-- 
  <link rel="stylesheet" href="%PUBLIC_URL%/css/bootstrap.css">
 -->

- 3. 我就想用. 怎么办? 那么我们就在入口文件中 将<BrowserRouter> 替换成 <HashRouter>

----------------------------

### 路由的模糊匹配与严格匹配
- 我们观察下下面的情况, 我们使用 链接按钮, 将路径修改为com/home/a/b
- 然后路由器监听url的变化, 如果路径为/home 我就给你映射的组件
<!-- 
  <MyNavLink to='/home/a/b'>Home</MyNavLink>

  <Route path='/home' component={Home} />
 -->

- 但是上面路径是 /home/a/b, 路由的匹配规则是 /home, 明明不一样为什么还会展示/home 映射的Home组件?

- 上面的情况就是模糊匹配

> 模糊匹配
- 以Route的属性path='home'为准, 去匹配Link组件的属性to='/home/a/b', to可以给多但是不能少顺序不能串, 

- react会将to中的home a b都拿出来 和 path中的home进行匹配, 第一位一样就返回给你组件
<!-- 
  我们通过 按钮 修改的路径
  /home/a/b

  包含了 /home
  path='/home'
 -->


> 精准匹配 exact={true}
- path 和 to的值必须一样
- 当我们注册路由的时候使用 exact={true} 开启精准匹配
<!-- 
  <Route exact={true} path='/about' component={About} />
 -->


> 总结:
- 默认使用的是模糊匹配 (简单记: 输入的路径 必须包含 匹配的路径, 且顺序要一致)

- 开启严格匹配 <Route exact path='/about' component={About}>
- 严格匹配不要随便开启, 需要再开 有些时候开启会导致无法继续匹配二级路由

----------------------------

### Redirect的使用 重定向
- 我们希望当页面打开后, 默认展示一个组件给我们查看, 我们就需要借助 react-router-dom 中的内置组件 Redireact

- import { Redireact } from 'react-router-dom'
- <Redireact>组件我们放在路由的最下方, 默认展示哪个组件

> <Redirect to='/home'>
- 我们输入首页的时候是/ 或者/也没有 www.baidu.com
- 因为是/或者空 所以这时候react会拿'' 和 <Route path> path中的值进行比对, 但是发现没有匹配上 所以页面中没有展示任何组件

- 我们将<Redirect to>放在所有路由的最下方, 这样当都匹配不上的时候 展示<Redirect>指定的组件
<!-- 
  <Switch>
    <Route exact={true} path='/about' component={About} />
    <Route path='/home' component={Home} />

    <Redirect to='home' />
  </Switch>
 -->

----------------------------

### 嵌套路由 (二级+ 路由)
- 主页面有导航区 和 展示区, 子页面里面也有导航区和展示区
<!-- 

    ------------------------

    \about\
    \home\          Home组件内容
                    \news\   \message\

                    - message01
                    - message02
                    - message03
 -->

- 那我们也需要定义news组件 和 message组件
- 我们要想一下逻辑, 我是不是要看到/home, 然后我才有机会点击 news按钮 和 message按钮? 

- 而我们的news 和 message 都会 home的子组件
- 我们在写二级路由的时候 要带着父组件的名字 <Link to='父/子'>


- 我们看下逻辑 如果我们这么写了
<!-- 
  <Link to='/home/news'>

  每一次路由的匹配都是按照当时路由注册的先后顺序 从头走到尾进行匹配
  react会拿着 /home/news 去找一级路由的path进行匹配(一级路由先注册的)

  然后会在 path中找到 /home 

  那/home/news 和 /home 匹配么? 匹配 模糊匹配

  匹配成功了后给你展示home组件的内容 home组件中有两个 按钮 news message

  我们点击了news 按钮, 修改了路径 于是乎又触发了 路由匹配
  react 又会拿着 /home/news 从一级路由开始进行匹配

  会找到 path='/home' 所以我们才能看到home组件的内容, 而且home组件的内容也没有丢 展示home组件 那home组件必须要挂载

  而home组件里面又注册路由了 所以接着进行匹配 所以这次真的找到 path='/home/news'了
 -->

- 代码部分
<!-- 
  <li>
    <MyNavLink to='/home/news'>News</MyNavLink>
  </li>
  <li>
    <MyNavLink to='/home/message'>Message</MyNavLink>
  </li>

  <Switch>
    <Route path='/home/news' component={News}></Route>
    <Route path='/home/message' component={Message}></Route>
    <Redirect to='/home/news'></Redirect>
  </Switch>
 -->


**注意:**
- 每当我们点击一个路由链接的时候 要改变地址的时候 react都会从最开始注册的路由进行逐层匹配 也就是说我们点击 <Link> 会把路径改为我们指定的路径 然后紧随其后就会触发路由的匹配

- 路由会按照当时路由注册的顺序(一级路由 二级路由 一级路由肯定要比二级路由先注册) react会到一级以注册的路由中开始匹配(查看path)
<!-- 
  比如 我们要是在二级路由中的<Link>里面这么写

  <Link to='/news'> 直接写了我们要请求的路径

  那么react在看到你修改了路径后 就会按照路由注册的顺序去匹配组件
  Home About是第一批注册的, react就会拿着 /news 去和 path='/about or /home' 进行匹配

  发现 /news 和谁也没有匹配上就会走 Redirect
 -->

- 记住:
- 路由的匹配都是按照从开始注册的路由 到 最后注册的路由匹配下去的

- 记住:
- 我们写多级路由的时候 要带上父组件的名字
<!-- 
  <Link to='/home/news'>
 -->  

----------------------------

### 向路由组件传递params参数

- 接着对上面的案例进行扩展, 点击message按钮后 展示message的内部 该内容仍然可以点击, 点击message01 展示对应的 id1的内容
<!-- 
  三级路由

    ------------------------

    \about\
    \home\          Home组件内容
                    \news\   \message\

                    - message01
                    - message02
                    - message03

                    --------

                    - id: 1
                    - Title: Message001     这个部分可以划分为共通组件
                    - Content: 我爱你中国
 -->

- 这个组件就是用来展示信息用的, 点击按钮01 该组件就展示id1的内容, 点击按钮02 该组件就展示id2的内容, 我们创建一个 Detail 组件

- 需求：
- 点击message01 展示这个 Detail 组件, 点击message02 也展示这个组件, 只是展示的内容不同
- 同时我希望上面message的按钮是动态生成的, 所以我们在state中定义了一份数据通过遍历的形式动态生成
<!-- 
  // message组件里面

  state = {
    message: [
      {id:'01', title:'消息1'},
      {id:'02', title:'消息2'},
      {id:'03', title:'消息3'}
    ]
  }

  {
    message.map(item => {
      
      return (
        <li key={item.id}>

          // 因为不需要高亮的效果 我们选择的是Link组件
          // to因为是3级路由我们的路径要写完整 
          <Link to='/home/message/detail'>{item.title}</Link>
        </li>
        )
    })
  }
 -->

- 然后我们将message01-03的共通显示区定义成一个组件
<!-- 
  // 共通组件 message01-03的展示区
  import React, {Component} from 'react';

  // 这里存放Content里面的内容 是每一个消息按钮要展示的详情， 这个数据是我们模拟的正常是组件一挂载我们去服务器要 正常的逻辑是 我们去服务要id为01的具体消息是什么
  // 只要你带id过来 我就给你展示对应的详情
  const data = [
    {id:'01', content:'你好中国'},
    {id:'02', content:'你好日本'},
    {id:'03', content:'你好美国'}
  ]

  export default class Detail extends Component {
    render() {

      return (
        <ul>
          <li>Id:???</li>
          <li>Title:???</li>
          <li>Content:???</li>
        </ul>
      )
    }
  }
 -->

- 既然我们要做成点击按钮后 展示共通组件的展示区， 那么我们就要使用Link组件改变路径，注册路由展示组件，这样我们不管点击哪个按钮都会展示 详情页面组件
<!-- 
  return (
    <div>
      <ul>
        {
          message.map(item => {
            return <li key={item.id}><Link to='/home/message/detail'>{item.title}</Link></li>
          })
        }
      </ul>
      
      <hr/>

      <Route path='/home/message/detail' component={Detail}></Route>
    </div>
  )
 -->

- 现在我们能做到点击哪个按钮都会展示共通内容，那我们就面临一个问题，我要告诉共通组件展示什么内容是么 因为现在展示的内容都是一样的

- 那我们怎么给路由组件传递参数呢？怎么才能在跳转的时候将参数带过来呢？
- 我们要在点击 message01按钮的时候 将id传递到Detail组件， 然后Detail组件根据id展示对应的详情信息
<!-- 
  以前我们发送ajax传递参数的时候 我们用几种方式
  1. query
  2. params
  3. body ： urlencoded and json
 -->

### 方式一 向路由组件传递 params 参数
- 有种感觉很像express中的动态路由呢

> 传递参数
- 直接就在路径中传递 使用模板字符串拼接 使用模板字符串的时候 外层要包裹{ }
- to={`/home/message/detail/${item.id}/${item.title}`}
<!-- 
  message: [
    {id:'01', title:'消息1'},
    {id:'02', title:'消息2'},
    {id:'03', title:'消息3'}
  ]

  const {message} = this.state

  message.map(item => {
    return (
      <li key={item.id}>
        <Link to='/home/message/detail/{item.id}'>{item.title}</Link>
      </li>
      )
  })
 -->

> 声明接收
> 注册路由的位置要声明接收params参数  /:传递过来的变量名/:传递过来的变量名
- path='/home/message/detail/:id/:title'
<!-- 
  // Message组件
  <Route path='/home/message/detail' component={Detail}></Route>

  但是有一个问题，我们是在路径中传递过去了id 但是 Detail 根本没有收到
  因为我拿着
  /home/message/detail/01 

  去和path=’/home/message/detail‘进行匹配， 但是路由只匹配到/detail后面的根本不看了

  所以我们要声明接收params参数
 -->

> 取出使用
> 怎么使用params
- 上面核心还是组件间的数据传递 其实还是props, 前面也说了 路由组件的props里面有react给我们传递的对象 我们关注一下 match对象

- this.props.match.params.变量
<!-- 
  history
  location
  match
    > params: {id:'01', title:'消息1'}
 -->


- 那结合上面的案例 我们怎么将从props中获取到的数据 动态的渲染到页面上呢？
- 思路 我们获取了id 那么我们就拿着id去data数据中查找，这里我们使用的是数组的新方法 find
<!-- 
  const data = [
    {id:'01', content:'你好中国'},
    {id:'02', content:'你好日本'},
    {id:'03', content:'你好美国'}
  ]

  export default class Detail extends Component {
    render() {
      let {id, title} = this.props.match.params
      let res = data.find(item => {
        return item.id === id
      })
      console.log(res)
      return (
        <ul>
          <li>Id:{id}</li>
          <li>Title:{title}</li>
          <li>Content:{res.content}</li>
        </ul>
      )
    }
  }
 -->


> 总结：
- 我们要是想传递 params 就得这么传
<!-- 
  <li key={item.id}>
    <Link to={`/home/message/detail/${item.id}/${item.title}`}>
      {item.title}
    </Link>
  </li>
 -->

- 同时 我们注册路由的时候 声明好这个组件以后会接到一个id一个title
- 也就是分为两步 1直接传 2接收
<!-- 
  接收的时候相当于定义变量
  :id     定义一个id变量
  :title  定义一个title变量

  <Link to='/home/message/tom/8'>
  <Route path='/home/message/:name/:age'>

  使用参数
  const {name, age} = this.props.match.params
 -->


**复习:数组的方法 arr.find(回调)**
- 从数组中找到指定的元素， 我们找到的是对象
<!-- 
  let res = data.find(item => {
    return item.id === id
  })
 -->

----------------------------

### 方式二 向路由组件传递 search 参数
- 这种方式传递的时候会省心一点，接收的时候费劲一点
- 有一点想ajax里面的query参数

> 参数传递：
> search参数  /?id=01&titele=xx
- 就是拼接成地址栏里key:value的样子 /?id=01&titele=消息01

- 直接就在路径中传递 使用模板字符串拼接 使用模板字符串的时候 外层要包裹{ }
- to={`/home/message/detail/?id=${item.id}&title=${item.title}`}
<!-- 
  <Link to={`/home/message/detail/?id=${item.id}&title=${item.title}`}>
    {item.title}
  </Link>
 -->


> 声明接收
- search不用声明接收 因为有？号的原因， 参数也会在props里面


> 取出使用
- 使用search传递过来的参数 因为是相当于拼接在地址栏里面 所以我们要去找location对象
<!-- 
  history
  location
    > search :'?id=01&title=消息1'

  match
 -->

- 我们发现需要我们自己处理search参数 其实不用react-router-dom里面有这个库 我们直接引入就可以 不用下载

- 注意：
- 我们这里从this.props.location里面取出的search是带有?的
<!-- 
  let {search} = this.props.location 

  // 去掉？
  let xx = search.substr(1)
 -->



> querystring 用于处理search参数
- import qs from 'querystring';

- qs上有两个方法
- 方式1 将对象转为 search参数形式
<!-- 
  let obj = {name:'tom', age:18}

  转为

  name=tom&age=18
  多组key value中间使用=连接用&做分割 这种形式叫做urlencoded编码
 -->

> qs.stringify(obj)
- 将对象转换为urlencoded编码格式

> qs.parse(str)
- 将urlencoded编码格式转换为对象


> 看下完整的代码
<!-- 
  // 接收search参数
  let {search} = this.props.location 

  // search  是 ?id=01&title=消息1
  let searchData = search.substr(1)

  // 使用qs将urlencoded编码格式转换为对象
  let {id, title} = qs.parse(searchData)


  let res = data.find(item => {
    return item.id === id
  })

  
  return (
    <ul>
      <li>Id:{id}</li>
      <li>Title:{title}</li>
      <li>Content:{res.content}</li>
    </ul>
  )
 -->

> 总结
- 路由连接（携带参数） ：
  - <Link to='/demo/test?name=tom&age=18'>

- 注册路由： 
  - 无需声明 正常注册即可
  - <Route path='/demo/test'>

- 接收参数：
  - const {search} = this.props.location
  - search = search.substr(1)

  - 获取到的search参数是urlencoded编码字符串 我们使用querystring解析成对象后使用

----------------------------

### 向路由组件传递state参数
- 这是路由组件上独有的state属性 不要和组件中的状态state搞混了
- 上面我们学习两种向路由组件传递参数的方式
- 1. params 在地址栏中写 /tom/18  --  /:name/:age
- 2. search 在地址栏中写 ?name=tom&age=18

- 上面的两种方式都是在地址栏中暴露出来了， 两种方式用的都很多

- state方式不会将参数在地址栏中显示出来， 在地址栏中是隐藏的

> 参数传递
- 之前接触的我们都是在<Link to=’这里面是字符串类型‘>
- 我们要是使用state传递参数的话 我们要在to={{}}写一个对象
- 对象中有两个属性：
  - pathname: '/home/message/detail' 写到组件就结束
  - state: {key:value}  我们使用state属性来传递参数

- <Link to={{pathname:’‘, state:{参数}}}
<!-- 
  <Link to={{pathname:'/home/message/detail', state:{id:item.id, title:item.title}}}>
    {item.title}
  </Link>
 -->


> 声明接收
- state参数无需声明接收 正常注册即可
<!-- 
  <Route path='/home/message/detail' component={Detail}></Route>
 -->


> 取出使用
- 传递过来的参数也是会在 this.props 中 的的location对象中的state属性里面
- 我们使用state传递参数就是location中的state属性里面
- 我们使用search传递参数就是location中的search属性里面 没记错吧？

- state属性中已经帮我们整理为一个对象了
<!-- 
  history
  location
    > state: {id: name: }
  match
 -->

> 完整代码
<!-- 
  // 注意这里 当我们页面清空缓存后，会报错， 因为所有的路由传递参数都是靠history来维护， 如果缓存清空了 相当于没有历史记录了 所以 this.props.location.state 就是空 就会报错， 我们在后面加上个空对象， 防止页面渲染不了

  const {id, title} = this.props.location.state || {}




  // 跟上面有关系， 因为上面没有历史记录了 相当于我们从{}里面取的id 和 title 那下面就没有办法判断了不是 为了解决报错问题 我们也在后面加上 || {}

  let res = data.find(item => {
    return item.id === id
  }) || {}
    
  return (
    <ul>
      <li>Id:{id}</li>
      <li>Title:{title}</li>
      <li>Content:{res.content}</li>
    </ul>
  )
 -->

> 总结
- 路由连接（携带参数） ：
  - <Link to={{ptahname:'url', state:{name:'sam'}}}>

- 注册路由： 
  - 无需声明 正常注册即可
  - <Route path='/demo/test'>

- 接收参数：
  - const {obj} = this.props.location.state

----------------------------

> 老师说使用情况而言
params > search > state

----------------------------

### push 和 replace
- 前面我们了解过 push是一个压栈的过程，可以回退， 而replace是一个替换的过程不能够回退

- 路由的跳转默认使用的是push模式

- 那怎么开启replace模式呢?

- 我们在<Link>组件中使用属性 replace属性 replace={true}

> <Link replace to=’‘>
- 开启replace模式 不会留下历史模式 没有回退

----------------------------

### 编程式路由导航
- 上面的案例中 不管是 home about的导航按钮还是， news message的导航按钮 实现切换都是依靠<Link / NavLink> 是吧 如果没有路由链接根本没有办法实现路由的跳转
<!-- 
  因为我们是通过路由链接修改的 地址
 -->

- 那假如现在有这样的一个需求： 页面有一张图片点击图片跳转到一个路由我们应该怎么实现
- 图片不能写<Link / NavLink>吧 那怎么实现路由的跳转呢？
<!-- 
  其实我们可以这样
  <Link><img><img><Link>
 -->

- 那假如我希望展示页面3秒后，往message组件上跳？ 那怎么实现？
- <Link / NavLink>这两个路由连接都需要依靠别人点击吧 我们在不依靠这两个按钮 通过代码的形式进行路由跳转就叫做编程式的路由导航

- 接下来我们有这样一个需求 我们在message01的后面添加两个按钮，点击分别是push查看和replace查看消息1

<!-- 
  三级路由

    ------------------------

    \about\
    \home\          Home组件内容
                    \news\   \message\

                    - message01   |push|  |replace|
                    - message02
                    - message03

                    --------

                    - id: 1
                    - Title: Message001     这个部分可以划分为共通组件
                    - Content: 我爱你中国
 -->

- 那我们先添加两个按钮 然后我们给按钮绑定事件，在回调中实现用代码的形式跳转到Detail组件
<!-- 
  <button onClick={this.replaceShow}>replace</button>

  replaceShow = () => {
    // 编写一段代码 点击按钮让其跳转到Detail组件， 但是 是replace跳转
    // 这就要借助路由组件上独有的API了
  }
 -->

- 回调中的逻辑就需要借助路由组件独有的API了, 直接我们介绍过路由组件的props中有几个默认的对象， 我们这次就要借助 路由组件里history对象中的操作历史记录的对象history
<!-- 
  // history对象
  history:
      go: ƒ go(n)
      goBack: ƒ goBack()
      goForward: ƒ goForward()
      push: ƒ push(path, state)
      replace: ƒ replace(path, state)


  // location对象
  location:
      pathname: "/home"  // 获取当前所处的路由路径
      search: ""
      state: undefined


  // match对象
  match:
      isExact: true     // 模糊匹配还精准匹配
      params: {}
      path: "/home"     // 获取当前所处的路由路径
      url: "/home"      // 获取当前所处的路由路径
 -->

- 我们可以从props中的histroy中使用replace方法

> this.props.history.replace('URL', state)
> this.props.history.push('URL', state)
- 当使用state传递参数的时候，第二个参数才有用处

<!-- 
  // 注意这里我们要将id 和 title传递过去 所以我们写成高级函数的形式
  <button className='btn' onClick={this.replaceShow(item.id, item.title)}>replace</button>

  replaceShow = (id, title) => {
    return () => {
      const {replace} = this.props.history

      // params参数
      replace(`/home/message/detail/${id}/${title}`)

      // query参数
      replace(`/home/message/detail/?id=${item.id}&title=${item.title}`)

      // state参数
      replace(`/home/message/detail`, {id, title})
    }
  }

  pushShow = (id, title) => {
    return () => {
      const {push} = this.props.history
      push(`/home/message/detail/${id}/${title}`)
    }
  }
 -->

- 注意当我们携带参数的时候，下面注册路由的地方就要匹配声明，和对应接收

> go: ƒ go(n)               指定 1 -1 前进一步 后退一步
> goBack: ƒ goBack()        回退
> goForward: ƒ goForward()  前进
- 没事自己试试


> 总结
- 编程式路由导航就是借助this.props.history身上的方法了来实现的

----------------------------

### withRouter 函数的使用
- 现在我们有一个需求 我们在头部的组件中加上两个按钮 用来控制回退 跟 前进
- 但是有一个问题，我们是通过this.props.history中的方法来实现前进和回退的， 但是Header组件并不是路由组件所以并没有这些方法
<!-- 
  我们是亲自使用<Header/>调用的所以不是路由组件， 不是通过路由匹配的
 -->

- 那如何让一般组件也用上路由组件的API呢 Vue就没有这些事Vue实例上都有这些方法，但是react就分一般组件和路由组件


> withRouter(一般组件)
> export default withRouter(Header)
- withRouter可以加工以班组间， 让一般组件具备路由组件特有的东西
- withRouter的返回值是一个新组件

- 1. 我们是想在 <Header>组件里用到路由组件里面的API 那我们就在<Header>组件里面从路由对象中导入
<!-- 
  import {withRouter} from 'react-router-dom';
 -->

- 2. 我们使用这个函数，把组件当做实参传递进去，这样暴露出去的组件就会有 路由组件的功能
  - 我们往外暴露 withRouter加工完后的东西, 或者说暴露的是withRouter函数的返回值
<!-- 
  // 这是我们以前的写法
  export default class Header extends Component { ... }

  改成

  class Header extends Component { ... }

  // 暴露的时候 我们使用这个函数 将组件传递进去
  export default withRouter(Header)
 -->


> 完整代码
<!-- 
  import React, {Component} from 'react'

  // 在一般组件里面 导入 withRouter
  import {withRouter} from 'react-router-dom';

  class Header extends Component {


    // 一般组件本身是没有 路由组件上的方法的 我们使用withRouter包裹一下
    go = () => {
      this.props.history.go(1)
    }
    back = () => {
      this.props.history.go(-1)
    }


    render() {
      return (
        <div>
          <h3>React Router Demo</h3> <button onClick={this.back}>回退</button> <button onClick={this.go}>前进</button>
        </div>
      )
    }
  }

  // 注意这里
  export default withRouter(Header)
 -->

----------------------------

### BrowserRouter 和 HashRouter 的区别
- 1. 底层原理不一样
  - BrowserRouter 使用的是H5的history API 不兼容IE9以下的版本
  - HashRouter    使用的是URL的哈希值

- 2. path的表现形式不一样
  - BrowserRouter 的路径中没有# 例如 :3000/demo/test
  - HashRouter    的路径中有# 例如 :3000/#/demo/test

- 3. 页面刷新后 使用state往路由组件传递的参数的影响
  - BrowserRouter 没有任何影响 因为state保存在history对象中
  <!-- 因为保存在历史记录中 浏览器没关历史记录就不会丢失 -->

  - HashRouter    刷新后会导致路由state参数的丢失
  <!-- 因为HashRouter没有使用history的api没人帮我们记着参数 -->

- 4. 备注：
  - HashRouter 可以用于解决一些路径错误相关的问题
  <!-- 比如样式丢失 -->

----------------------------

### redux
- 学习文档
<!-- 
  中文文档:
    http://www.redux.org.cn
 -->

- redux 和 react的关系类似javascript 和 java之间的关系 他们两个没有什么联系
- 它就是一个团队的作品 在react里面用的比较多 能帮我们管理状态


> redux是什么？
- redux是一个专门用于做 状态管理 的js库 （不是react插件库）
- 它可以用在react angular vue等项目中， 但基本与react配合使用
- 作用：
  - 集中式管理 react 应用中多个组件共享的状态


> 什么情况下需要使用redux
- 某个组件的状态 需要让其他组件可以随时拿到（共享）
- 一个组件需要改变另一个组件的状态（通信）
<!-- 
  A组件的状态交给B组件， B组件把收到的状态作为自己的状态
  A组件里面的状态改了 由于是B组件接到自己用的 所以A改了得画 B也会改

  A组件也可以将状态交给redux B组件直接去取 或者说B组件也不用有自己的状态 AB公用redux里面的状态
 -->

- 总体原则：
  - 能不用就不用 如果不用比较吃力才考虑使用
<!-- 
  如果没有大量的组件要共享的情况下 就不用使用redux

  很深层次的组件要传递数据的时候 我们就可以用redux
  -->


- 下面的情况如果我们选择用redux就很好解决了
<!-- 
  下面是App组件内部的组件关系

  App
    > A

    > B
      > C
        > D
        > F

    > E

  需求1：  B组件的状态 E组件要用 有几种方式
  1. 父组件逐层传递
      B组件的状态交给App 通过App再传递给E组件

  2. 消息订阅 与 发布
      E组件里面进行消息的订阅 B组件里面发送消息 E组件就能收到 消息的订阅和发布适合任意组件之间的交互



  需求2： D组件的状态 A B C E F组件都要用
  D组件了里面有一个对象 {a:1, b:2, c:3} 现在 a b属性A B C E F都要用 这就有一些共享的感觉了ab属性其它组件都要用

  1. 我们也可以通过逐层传递 传递到App组件 但是太麻烦了我们要需要传递函数 然后再由App发送到其它的组件

  2. 我们还可以 A里订阅 B里订阅 CEF都订阅 D组件发布消息别人也能接收到 也麻烦是么
 -->


- redux解决上面的需求
<!-- 
  redux是独立于App组件之外的

  现在的需求是 D组件中的对象{a:1, b:2, c:3}  ab 其它的组件都要使用， 我们就可以将D组件的ab属性交给redux来管理 redux帮我们存着ab

  将{a:1, b:2}交给redux后 D组件本身就不用再存着{a:1, b:2}了 把那些人人都要用的交给redux

  其它组件谁要是想要使用redux中的数据， 可以直接去取

                      redux
                      {a:1, b:2}

  App
    > A
                          ↑  交给redux后 D组件本身就不用存a:1, b:2了
    > B
      > C
        > D：{c:3}
        > F

    > E
 -->

----------------------------

### redux的工作流程图 原理图

<!-- 

  // 这是一个组件 Count 求和   有点像计算器的案例
  一上来页面会展示一句话 当前求和为0 然后有一个下拉框 下拉框里面可以选择数字， 下拉框的右侧 有 加减乘除四个按钮

  比如我们可以选择2 然后点击 + 就是+2

  0

  下拉框    | + |   | - |   | x |   | / |   
    1
    2
    3

  如果我们只有一个组件， 那完全可以在自己的组件里面定义state， state中的数据变化就会驱动页面的变化是吧

  const {count} = this.state
  this.setState({count:count+2})

  这是在自己的组件里面我们可以这么做， 但是我们要使用redux了， 我们的状态都在redux里面 所以我们选择了2 我们点了+ 我们要想办法通知redux去把值+2  

  那怎么告诉redux呢？
  就要走下面的图里面的(do what) 这条线  将我们要做的事情 告诉 Action Creators

  既然我们已经在组件中（React Components）明确要做什么了 这个时候我们就把+2的这件事 告诉 Action Creators（行动的创造者）
  action对象里面包含了两个属性（比如我们要告诉redux我们要+2， +就是类型 2就是数据）：
  1. 动作的类型
  2. 操作的数据

  
  然后我们通过dispatch函数 将action(动作对象) 交给了Store(指挥者)
      比如我们本意是+1 然后Action Creators就知道这哥们要+1 然后它会创建一个动作对象类型是+ 数据是1
      然后它会把动作对象继续往下交， 交给一个能操作状态的人 这个人必须要得到动作对象 这个人才知道怎么工作 我们不告诉这个人类型 数据 他怎么知道怎么工作 比如我们不告诉他是+还是- -多少他就不知道怎么工作了


  我们通过dispatch的调用就将action对象交给了store store是一个指挥者本身不干活 store会把action对象和之前的状态(previousState)交给 Reducers

  Reducers会帮我们修改状态（比如+3）+3是必须在原来的基础上+3吧 那就要知道原来的状态是多少是么？previousState

  Reducers会将加工完的状态return, newState（新状态）返回给store 

  算完的新状态会在store里面， 组件需要调用getState()方法从store中获取到新的加工完的状态
 -->

- redux的原理图
<!--                  

                                    ↗  1. type：'things type'
            dispion对象里面atch(action)    act的属性
                                    ↘  2. type：'things data'
                      ↑            

  Action Creators   ----- >   Store   ---(previousState, action)--- >    Reducers
                                      < --- (return, newState) ------   
                                ↓
                                ↓ getState()
    （do what？） ↖              ↓
                    ↖
                        React Components



  React Components：
    组件们


  do what：
    做什么 


  Action Creators
    将我们要做的事情包装成一个action对象
   

  dispatch:
    分发函数， 比如发牌
    将包装好的action对象分发给store


  action对象：
    在redux中叫做动作对象 它包含里本次动作的类型 以及 本次操作的数据
    type：'things type'   这里面的值 都是字符串
    type：'things data'


  Store：
    调度者相当于十字路口的交警 它负责分发不负责干活

  
  previousState：
    之前的状态
    图里面的previousState 指的是第二次 因为必须有了一次之后我才能知道之前的状态吧
    初始化的时候 
    previousState第一次的是时候是undefined
    action的type初始化的值是 @@init@@   data的初始化值压根就没有


  Reducers：
    真正加工状态的人 它主要负责两件事
    初始化状态  初始化状态它只做一次
    加工状态


  getState()
    组件中使用这个方法得到store中加工完的新数据
 -->


- 我们对上面的案例整体的旅顺一下
<!-- 
  页面有加有减 比如我们+2， 这个事就被 Action Creators 知道了
  Action Creators 就制造了一个动作对象 action 动作的类型是+ 数据是2 
  Action Creators 就是将我们要做的事情 包装成了一个动作对象 分发到store

  store 会将组件之前的状态和action动作对象交给 Reducers 
  Reducers 拿到两个参数后 将更新好的新状态返回给 store

  store将新状态放在自己这里， 等到组件调用 getState() 获取 更新后的状态
 -->


- 我们对上面的图整体的旅顺一下
<!-- 
  我们可以把整个图想象成一个餐厅

  React Components ： 客人
  Action Creators ： 服务员
  Store ： 老板
  Reducers ： 后厨团队

  客人点餐  ---  
        
        服务员 拿出点餐的机器 写上蛋炒饭一份 她按下发送 将客人的要求包装成 点餐对象 type是点餐 data是蛋炒饭  ---

              老板收到信息后 将点餐对象 发送到后厨 第一次由于还没有前状态 我们传递的是undefined  ---

                    后厨看到undefined就会明白这个人是第一次点餐 然后就做好了蛋炒饭放在了老板的台子上  ---

                          客人取回来吃  
 -->


> redux的三个核心概念
>>> action: 动作对象
    - 包含两个属性
      - type： 标识属性 值为字符串 唯一 必要属性
      - data： 数据属性 值为任意类型  可选属性
      - eg： {type:'ADD_STUDENT', data:{name:'tom', age:18}}


>>> reducer
    - 用于初始化状态 加工状态
    - 加工时 根据旧的state 和 action 产生新的state的纯函数


>>> store
    - 将state action reducer联系在一起的对象
    - 如何得到此对象？
      - 1. import {createStore} from 'redux'
      - 2. import reducer from './reducers'
      - 3. const store = createStore(reducer)

    - 此对象的功能
      - 1. getState() 得到state
      - 2. dispatch(action) 分发action 触发reducer调用 产生新的state
      - 3. subscribe(listener) 注册监听 当产生了新的state时 自动调用

----------------------------

### 案例 计算器  纯React版本
- 我们通过一个案例来了解一下redux的API， 我们先看一下我们要做出来的效果
<!-- 
    求和的值的位置： 0

    下拉框    | + |   | - |   | 奇数再加 |   | 异步的加 |
      1
      2
      3

  下拉框是用来选择数值的
  increment if odd 是用来做判断的 当总和的值是 奇数的时候我们才能+
  increment async  异步的加法 等等再加
 -->

- 我们先看看用react的方式写一下上面的案例
- 要点：
- 1. 组件之间的样式 比如A组件的margin-top我们要在各自的组件内部写css样式控制

- 2. 我们在render函数里面查看节点 注意节点是否会被渲染 要不就是undefined 或者 null

- 3. react中要获取节点的话
  - c => this.变量名 = c
  - myRef = React.createRef()  /  this.myRef.current

- 4. 下面的代码中我们写了4个方法 我们还可以通过传入不同的type值 定义一个方法
<!-- 
  import React, {Component} from 'react'
  import './index.css'

  export default class Count extends Component {

    // 我们需要更改状态才能引起页面的更新
    state = {
      count: 0 
    }

    // 加法
    increment = () => {
      // 获取用户输入
      let value = this.selectNumber.value
      
      // 获取原来的状态值
      let {count} = this.state

      count += Number(value)
      this.setState({count})
    }

    // 减法
    decrement = () => {
      let value = this.selectNumber.value
      let {count} = this.state

      count -= Number(value)
      this.setState({count})
    }

    // 奇数再加
    oddIncrement = () => {
      let value = this.selectNumber.value
      let {count} = this.state

      if(count % 2 !== 0) {  // Expected '===' and instead saw '=='  eqeqeq
        count += Number(value)
        this.setState({count})
      }
    }

    // 异步加
    asyncIncrement = () => {
      let value = this.selectNumber.value
      let {count} = this.state

      setTimeout(() => {
        this.setState({count:count+value*1})
      }, 500)
    }


    render() {

      // 之所以这打印 select 为null 是因为还有没渲染呢
      // console.log(this.selectRef.current)

      let {count} = this.state
      return (
        <div className='count'>
          <h3>当前求和为：<span>{count}</span></h3>
          <hr/>

          <select ref={ c => this.selectNumber = c } name="number" id="number">
            <option value="0">请选择基数</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <hr/>
          <button onClick={this.increment}>+</button>&emsp;
          <button onClick={this.decrement}>-</button>&emsp;
          <button onClick={this.oddIncrement}>奇数再加</button>&emsp;
          <button onClick={this.asyncIncrement}>异步的加</button>
        </div>
      )
    }
  }
 -->

----------------------------

### 案例 计数器 Redux 精简版本
- 下面我们使用Redux来写一下计数器， 但是我们先精简一下 不写Redux的完整版本， 我们先省略掉 Action Creators 的环节

- 要点：
- 我们要到redux原理图的时候会发现 叫做 Reducers 为什么后面还有s呢  因为
<!-- 
  比如 有一个A组件 A想把自己的状态交给redux 那就要为A组件构建一个reducer
  比如 有一个B组件 它也想把状态交给redux 那也要给B组件构建一个reducer
 -->

- 每一个组件必须要有对应的一个 Reducer 文件   
- 但是一个redux中只有一个 store 文件
<!-- 
  我们创建 count_reducer.js 文件 用来为count进行初始化 和 加工状态
 -->


> redux 目录结构

  | - redux     所谓redux的相关文件都放在这里面
    - store.js
    - count_reducer.js


> redux 的使用
> 1. 安装 redux
- npm i redux


> 2. 创建store.js文件， 用于创建 store 对象
- 该文件专门用于暴露一个store对象， 整个应用只有一个store对象

> createStore(组件的reducer文件)
- 参数：
- 组件的reducer文件
- 暴露出去的是一个store对象
<!-- 
  1. 引入 createStore 专门用来创建 store
  import {createStore} from 'redux'

  2. 引入 为count组件服务的 reducer.js
  import countReducer from './count_reducer'

  3. 创建一个store对象
  const store = createStore(countReducer)

  4. 把store暴露出去
  export default store


  // 关于 createStore() 参数的记忆方式
  谁为store卖命服务啊 reducer 吧 所以我们在创建store的时候就要指定好 reducer
  我们怎么记呢？ store相当于餐厅里面的老板 reducer 是做菜的后厨
  老板在开饭店之前就会找好后厨团队 所以我们的参数要传一个人进去
  所以我们要引入 count_reducer
 -->


> 3. 创建 count_reducer.js 文件
- 该文件是为了创建一个为count组件服务的reducer 它的本质就是一个函数
- 我们先看看 reducer 文件主要能处理什么事情
<!-- 
  1. reducers能够初始化状态 和 加工状态
  2. reduers会接收到store给它的两个东西
    - 之前的状态 preState
    - action

  3. reducers接到东西之后 会根据 之前的状态 和 action 里 type 的类型 处理一些状态相关的东西 然后把新的状态交出去
-->

- 组件一加载 store会自动帮我们调用这个函数 为了让我们拿到初始值

- 我们看看reducer函数内部应该处理什么样的逻辑
- 要点：
  - 1. reducer函数是一个纯函数， 它只负责最最基本的事情， 不管其他的细节
    - 比如： 
    - 进行判断 奇数再加或者异步加的逻辑， 如果有该逻辑请在组件中进行判断 比如组件中 我们进行判断 如果现在不是奇数 我们就不告诉reducer加

  - 2. reducer只负责+- +几-几 reducer是一个纯函数 
  - 3. 我们一般使用switch来处理逻辑
  - 4. reducer函数要有返回值

  - 5. 初始值 一旦进入default就是初始化的阶段， 初始值有两种写法
    - 5.1. 可读性比较高

      const initState = 0
      \\ 如果没有传preState 或者说 值为undefined 那么它就使用默认值
      function countReducer(preState=initState, action) {
        。���。
      }

    - 5。2. if判断

      \\ 函数内部一进去 如果是初始化的时候 我们给preState进行数据 和 数据类型的指定
      if(preState === undefined) preState = 0

<!-- 
  export default function countReduer (preState, action) {

    // 如果是初始化的时候 我们给preState进行数据 和 数据类型的指定
    if(preState === undefined) preState = 0

    // 我们首先要从动作对象里面取出 type 和 data 一个是要干什么 和 干的数据
    const {type,data} = action


    // 我想看看preState的样子， 因为老师直接用preState进行计算了
    console.log(preState, action, data);

    // 结果：
    preState 0 是我们在这个函数内部给初始化状态赋的值
    action 初始化的时候
            type： @@redux/INITv.2.q.c.3.o
            data： undefined


    // type 是字符串 那就需要在定义 action 的时候 写好要做什么 这里我们会选择switch
    switch(type) {

      case 'increment':

        // 这个函数要有返回值
        return preState + data

      case 'decrement':
        return preState - data

      default:
        return preState
    }
  }


  // 关于初始值
  如果进入default这里是什么意思？ 
  action中的type里也没说加 也没说减
  
  有没有这样的一个场景reducer被调用了 但是不加也不减 这就是初始化的时候

  始化的动作并不是我们程序员对reducer进行操作 进行初始化 是整个页面一进来 store.js一加载 store就帮助我们做了一件事 它分发给了reducers一个action 但是里面不说加 也不说减 也不给data 请进行初始化 

  初始化的时候 之前的preState是undefined 那我们return出去什么比较合适？ 我们在函数一进来就进行判断， 如果preState是undefined 那么给它赋值0（初始值）然后这里我们可以返回 preState
 -->


- 上面 关于 redux 的逻辑已经都写完了 但是页面中的代码我们应该怎么修改？
- 比如 我们不能从组件内的state中获取数据了吧 因为state已经交给redux来管理了
- 怎么从 store 中获取里面的属性呢？


> 组件中想要获取 redux 中的数据 首先要引入
- import store from '../redux/store'

> store.getState()
- 用于获取store中保存的属性
- 组件一加载 store 就会调用reducers中的函数 用于让我们获得初始值
<!-- 
  - 我们来整理一个逻辑
  - 我们在页面中 使用store.getState() 直接能从store中获取到属性， 但是逻辑不应该是这样的么？ 我们能在页面上显示redux中的数据， 那就说明有人调用了 reducer中的函数 没人调用这个函数我们不可能拿到返回值

  - 但是reducer想要被调用肯定是我们在组件中做了什么比如加减然后走了store - reducers的流程是吧

  - 但是现在的问题是 我们根本没有写什么代码 为什么直接就能获取到redux中的数据了呢？
  - 那是因为store帮我们调用的 它不调用我们怎么拿到初始值呢？
 -->


- OK 我们知道怎么从redux中获取初始值了，一上来我们就可以通过上来的方法来调用得到初始值
- 但是页面中加减的点击逻辑是怎么完成的？ 我们通知redux让它完成对应的逻辑， 复杂的逻辑我们在组件内部完成 只告诉redux什么时候加 什么时候减


> store.dispatch(action)
- 我们使用这个方法 将动作对象整理好送给store 由store交给reducers处理
- 所以我们在 加法的函数中这么写 将我们要干什么 操作什么数据 打包成对象对象， 通知redux来修改
<!-- 
  increment = () => {
    let value = this.selectNumber.value
    
    let action = {
      type: 'increment',
      data: value*1
    }
    store.dispatch(action)
  }
 -->


> store.subscribe(() => {})
- 该方法用于监听redux中的状态 只要状态一发生变化 就会执行该回调
- 在组件一挂载的时候 我们定义该方法
<!-- 
  我们发现 我们在加法的方法里面使用store.dispatch(action)后 确实是修改了 但是页面并没有重新渲染

  原因是redux只是负责帮我们修改在redux中保存的数据 并不负责帮我们渲染页面 所以有了这个方法 我们监听redux中数据的变化， 一旦变化就会触发回调

  我们在回调中完成对应的render逻辑

  但是render不能由我们自己调用 所以我们借助了 this.setState({})方法 我们传递一个空对象 用于触发render



  / 组件一挂载就检测redux中状态的变化 只要发生变化 就调用render
  componentDidMount() {

    store.subscribe(() => {
      this.setState({})
    })
  }
 -->


> redux里面只负责修改 更新redux中的数据 不负责帮我们渲染页面所以 我们进行如下操作
<!-- 
  / 组件一挂载就检测redux中状态的变化 只要发生变化 就调用render
  componentDidMount() {

    // 只要redux中的任意状态发生变化 都会执行该回调
    store.subscribe(() => {

      // 不能自己调用render 那怎么更新页面？ 
      // this.render()

      // 我们这么做 传入空对象代表什么也不更新 只是想触发render
      this.setState({})
    })
  }
 -->


> 假如组件多了得时候 那么每一个组件为了要更新页面 都会在组件内部写 下面的代码
- 一样是一种方法， 但是组件多了得时候 有些麻烦， 因为每一个组件都要写这样的逻辑
<!-- 
  componentDidMount() {
    store.subscribe(() => {
      this.setState({})
    })
  }
 -->

- 推荐一种一劳永逸的办法
- 我们在index.js入口文件中写逻辑
<!-- 
  import React from 'react'
  import ReactDOM from 'react-dom'
  import { BrowserRouter } from 'react-router-dom'
  import store from './redux/store'

  import App from './App'

  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.querySelector('#root'))

  // 只要redux中的数据发生变化 我直接渲染整个App组件
  store.subscribe(() => {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.querySelector('#root'))
  })
 -->


> 总结
- 1. 文件的暴露方式
<!-- 
  count_reducer.js文件
      一般采用 默认暴露 因为它是专门为一个组件服务的文件
-->

- 2. 我们交给redux管理的是一些属性 并不是整个的状态对象， 比如案例中我们将state中的count属性交给redux来管理了， 所以老师可以直接用preState进行计算

- 3. 老师在reducer.js文件中 直接在函数内部使用preState参数进行计算了 当时比较好奇
  - 好奇原因 我理解的是在redux的store中保存的是整个的state对象
  - 1. redux中是我们组件想要交出去的属性（也可以是对象， 主要是看我们想要交出去什么）也不能说交出去，而是定义在redux里面的属性是共有的 所以不用在组件内部重复定义

  - 2. reducer文件里定义的函数参数 preState 是什么？
    - 初始化的时候 preState 是我们在函数内部自己返回的默认值
    - action中的type是@@redux/INITv.2.q.c.3.o   data是undefined

- 4. 注意：
  - redux中的状态更改默认是不会引起页面的更新的


> 精简版的redux的完整代码
<!-- 
  import React, {Component} from 'react'

  // 引入store 用于获取redux中的状态
  import store from '../redux/store'

  import './index.css'

  export default class Count extends Component {


    // 我们将交给redux的属性从组件内部的state中删除， 但是组件可以有自己的状态属性
    // state = { count: 0 }
    state = { carName: 'Benz' }


    // 下面的逻辑我们在index.js入口文件里面写了
    
    // 组件一挂载就检测redux中状态的变化 只要发生变化 就调用render
    // componentDidMount() {

    //   // 只要redux中的任意状态发生变化 都会执行该回调
    //   store.subscribe(() => {

    //     // 不能自己调用render 那怎么更新页面？ 
    //     // this.render()

    //     // 我们这么做 传入空对象代表什么也不更新 只是想触发render
    //     this.setState({})
    //   })
    // }


    // 加法
    increment = () => {
      // 获取用户输入
      let value = this.selectNumber.value
      
      // 通知redux加value
      let action = {
        type: 'increment',
        data: value*1
      }
      store.dispatch(action)
      /* 
        我们发现上面的逻辑都对但是页面没有更新， 之前我们知道只要是在组件内部的state中的数组发生了变化比如我们调用了this.setState react就会帮助我们更新页面

        用了上面的方法之后 react不仅更帮我们更新状态， 还能帮我们调用render 然后页面就刷新了

        而

        整个 redux 中的 reducers 仅仅是负责帮我们改状态 但是页面是否更新它不负责 它没有帮我们render

        redux中的状态更改默认是不会引起页面的更新的

        那是不是应该有一种办法 我们检测一下 如果redux中保存的状态发生了改变 那我就自己调用组件的render

        怎么监听redux中的状态的改变呢？
      */
    }

    // 减法
    decrement = () => {
      let value = this.selectNumber.value
      let action = {
        type: 'decrement',
        data: value * 1
      }
      store.dispatch(action)
    }

    // 奇数再加
    oddIncrement = () => {
      let value = this.selectNumber.value
      let count = store.getState()

      if(count % 2 !== 0) {  // Expected '===' and instead saw '=='  eqeqeq
        let action = {
          type: 'increment',
          data: value * 1
        }
        store.dispatch(action)
      }
    }

    // 异步加
    asyncIncrement = () => {
      let value = this.selectNumber.value

      setTimeout(() => {
        let action = {
          type: 'increment',
          data: value * 1
        }
        store.dispatch(action)
      }, 500)
    }


    render() {

      // 这里就不能从自身的state中获取count了 因为已经交给了redux来管理
      // let {count} = this.state
      return (
        <div className='count'>

          {/* 我们使用store.getState()API来获取 初始值， 初始值的得来是store帮我们调用的reducer里面的函数 */}
          <h3>当前求和为：<span>{store.getState()}</span></h3>

          <hr/>
          <select ref={ c => this.selectNumber = c } name="number" id="number">
            <option value="0">请选择基数</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
          <hr/>
          <button onClick={this.increment}>+</button>&emsp;
          <button onClick={this.decrement}>-</button>&emsp;
          <button onClick={this.oddIncrement}>奇数再加</button>&emsp;
          <button onClick={this.asyncIncrement}>异步的加</button>
        </div>
      )
    }
  }
 -->
  
> 精简版的redux 求和案例 总结
- 1. 去除count组件自身的状态
- 2. src文件夹下建立
  | - src
    | - redux
      - store.js
      - count_reducer.js

- 3. store.js
  - 1. 引入redux中的createStore函数 创建一个store
  - 2. createStore调用时要传入一个为其服务的reducer
  - 3. 记得暴露reducer对象

- 4. count_reducer.js
  - 1. reducer的本质是一个函数 接收 preState action 返回加工后的状态
  - 2. reducer有两个作用 初始化状态 加工状态
  - 3. reducer被第一次调用时， 是store自动触发的 传递的preState是undefined

- 5. 在index.js文件监测store中状态的改变， 一旦发生改变重新渲染App组件
  - 备注：
    redux只负责管理状态， 至于状态的改变 驱动着页面的展示 要靠我们自己写 
    this.setState({})

----------------------------

### 案例 计数器 Redux 完整版本
- 上面我们做的案例是redux的精简版本， 为什么这么说？
- 从原理图上 我们能知道 应该是由 组件 --- Action Creators 让 Action Creators创建 动作对象， 在精简版本中 我们是自己在方法内部调用的dispatch自己创建的动作对象

- 要点：
- 每一个组件都有自己的 Action Creator

> 怎么降缺失的拼图 action creators 利用上
> 1. redux文件中 创建 count_action.js 文件
- 该文件是为count组件服务的 Action Creators
- 该文件专门为Count组件生产action对象
<!-- 
  | - redux
    - store.js
    - count_reducer.js
    - count_action.js
 -->


> 2. 在 count_action.js 文件中创建方法来生成 action 对象
- 我们有几种操作？或者说有几种type类型？ 不是加 就是减吧
- 那我们就根据行为创建一个个的函数 调用加的返回就返回加的action对象
<!-- 
  function  createIncrementAction(data) {
    return {type:'increment', data}
  }

  function  createDecrementAction(data) {
    return {type:'decrement', data}
  }


  我们有几种操作？ 不是加 就是减 那我们就根据行为创建一个个的函数 调用加的返回就返回加的action对象
 -->


> 3. 组件中 我们在使用action对象的地方 调用我们刚才写好的方法
- 首先要引入 我们的 count_action.js 从中拿到我们的方法
<!-- 
  之前我们是自己创建action对象 然后调用的dispatch方法
  let action = {
    type: 'decrement',
    data: value * 1
  }
  store.dispatch(action)

  改成 

  // 将 data 传递进去
  store.dispatch(createIncrementAction(value))
 -->

- 由于我们定义的 action对象中的 type属性的值 都是字符串 而且在多个文件之间都要使用
- action creators要使用 reducer文件要使用，所以极有可能出现拼写错误 匹配不上
- 我们把这些常亮最好也单独的组织一个文件 定义一个 常量模块
- 我们在redux文件夹里面再定义一个 constant.js 文件 

- 优点：
- 不容易出错 和 方便管理
<!-- 
  | - redux
    - store.js
    - count_reducer.js
    - count_action.js

    - constant.js    用于放置常量


  // 该模块是用于定义action对象中type类型的常量值
  export const INCREMENT = 'increment'
  export const DECREMENT = 'decrement'
 -->



> 总结：
- 1. 当函数的返回值是一个{}的时候 要在外层包裹一个() 不然会被认为是函数体
<!-- 
  const createIncrementAction = data => ({type:'increment', data})
 -->

- 2. 上面就是redux的完整版本 利用了action creator创建动作对象 store对象帮我们分发， reducer帮我们初始化和更新


- 3. 求和案例 redux完整版
  - 新增文件
  - count_action.js 专门用于创建action对象
  - constant.js 放置容易写错action中的type值

----------------------------

### redux 中的 action creators
- 上面我们按照原理图上 由action creators来创建动作对象
- 我们在count_action.js里面使用了函数 使用调用函数 返回对象的方式 创建了 action对象
- 然后组件中使用store.dispatch(action)来通知store对我们的对象进行下一步的处理

- 上面的环节中在action creators创建的动作对象，由于方法返回的是一个一般对象 object类型的 我们叫它 同步action

- 而action还可以有第二种类型 异步action


> action的两种类型
- 1. 同步action
  - action.js文件中 方法 返回值 是一个对象 称之为 同步action

- 2. 异步action
  - action.js文件中 方法 返回值 是一个函数 称之为 异步action

<!-- 
  // 同步action
  function  createDecrementAction(data) {
    return {type:'decrement', data}
  }


  // 异步action
  createIncrementAsyncAction = (data, time) => {
    // 返回一个函数
    return () => {}
  }
 -->

- 异步action由于它返回的是一个函数，只有函数中才可以封装异步方法 所以叫做异步action


> 异步action的应用场景
- 上面的案例中我们是在组件内部创建了 异步的加 的方法 在组件内部等了500ms通知了store修改状态(异步任务有可能是一个ajax回调)
- 当我们不想在组件内部做异步的逻辑的时候 就可以将异步的逻辑放在action里面进行
<!-- 
  之前是在组件内部完成 等待的逻辑，组件里面不等，我们将等一等的动作交给action
  
  这个时候我们就必须要借助异步action才能实现 也就是说我们的action不是一个普通的对象了 而是一个函数

  我们可以这么理解：
  我们把组件当做是客人  action creators当做是服务员 现在有两种方式可以让菜上的慢一些
  1. 客人磨成会（组件里面等500ms 定时器的操作）
  2. 告诉服务员一份蛋炒饭5分钟后上来, 那等500ms就不是由客人做的了 是服务员做的
 -->


> count_action.js 文件中 异步action 的代码
<!-- 

  createIncrementAsyncAction = (data, time) => {
    // 返回一个函数
    return (dispatch) => {

      // 函数内部书写 异步逻辑
      setTimeout(()=>{

        dispatch(createIncrementAction(data))

      }, time) 

    }
  }
 -->


> 异步action Component --- Action Creators --- Store --- Reducer 的逻辑
<!-- 
  // 组件内部

  asyncIncrement = () => {
    let value = this.selectNumber.value
    store.dispatch(createIncrementAsyncAction(value*1, 500))
  }

  组件内部使用 store.dispatch() 方法 用于通知redux修改数据
  参数为：
  action动作对象  我们这里传入的参数是 异步action createIncrementAsyncAction
  store.dispatch(createIncrementAsyncAction(value*1, 500))



  // Action Creators内部
  由于参数是调用异步action 就会执行该函数，这个异步action的返回值是一个函数
  函数内部是异步的逻辑，同时包含了 真正通知store修改数据的 dispatch() 方法

  这个dispatch()方法的参数是 同步action 用于创建 活动对象

  export const createIncrementAsyncAction = (data, time) => {
    return (dispatch) => {
      setTimeout(() => {
        dispatch(createIncrementAction(data))
      }, time)
    }
  }



  // 注意
  组件内部 使用 store.dispatch() 推到 store 的是一个函数， 但是store要求接收到的数据类型 必须是一个 object 这样才能分析交给 reducer 来更新数据

  但是我们推到 store 里的是一个函数 所以会报错
  Actions must be plain objects use custom middleware for async actions

  报错解析：
    action必须是一个一般对象 请你使用一个中间件来使用异步action

  
  也就是我们必须要使用一个中间件
  异步action需要一个中间件， 中间件会跟store对象对话，请store允许 可以给store传递一个函数 
  
  中间件跟store说 你不用给reducer 请在接收到函数的时候 帮忙执行一下这个函数
  

  // store文件中
  当我们使用了中间件之后 当我们发送给store一个函数的时候 就不会报错了， 而是store帮我们先调用这个函数 执行内部逻辑的时候 触发 真正的
  dispatch(createIncrementAction(data))

  这样才会走正常的流程，store也能拿到一个object的对象 能够交给reducer来处理
 -->


> 为了使用 异步action 我们需要 thunk 中间件
- 1. 安装 thunk 中间件
<!-- 
  npm i redux-thunk  
 -->

- 2. 在store.js文件中 引入下载好的中间件
<!-- 
  import thunk from 'redux-thunk'
 -->

- 3. 再从redux身上引入 applyMiddleware（执行中间件）
<!-- 
  import {createStore, applyMiddleware} from 'redux'
 -->

- 4. 使用 applyMiddleware() 执行我们下载好的中间件 并在创建store对象的时候当做第二个参数传递进去
<!-- 
  const store = createStore(countReducer, applyMiddleware(thunk))
 -->

- 要使用异步action的时候 store.js文件中的代码
<!-- 

  import {createStore, applyMiddleware} from 'redux'
  import thunk from 'redux-thunk'
  import countReducer from './count_reducer'

  const store = createStore(countReducer, applyMiddleware(thunk))
  export default store
 -->

- 当在store.js文件中配置好中间件后，store当接收到一个函数的时候 就会自动调用这个函数 并传递进去一个dispatch方法
<!-- 
  export const createIncrementAsyncAction = (data, time) => {

    // 由于下面的函数是store调用的 所以会传递进去一个dispatch方法
    return (dispatch) => {
      setTimeout(() => {
        dispatch(createIncrementAction(data))
      }, time)
    }
  }
 -->


> 总结
- 1. 明确： 延迟的动作不想交给组件自身 想交给action
- 2. 何时需要异步action： 想要对状态进行操作 但是具体的数据靠异步任务返回

- 3. 具体编码
  - 下载中间件 并配置在store中 npm i redux-thunk
  - 创建action的函数 不再返回一般对象 而是一个函数 该函数中写异步任务
  - 异步任务有结果后 分发一个同步的action去真正操作数据

- 4. 异步action不是必须要写的 完全可以自己等待异步任务的结果 再去分发同步action

----------------------------

### react-redux的理解
- 真实开发中 facebook 发现很多编码人员都喜欢在react中使用 redux库来进行集中的状态管理，但是react和redux是两个团队开发得结果，react发现这点它自己推出了一个库 就是react-redux

- react-redux是facebook出品的react的插件库 使用了这个插件库我们就能更加方便和轻松的使用redux


> react-redux 模型图
- react-redux库 把组件分为两类 ：
  - 1. 容器组件   (可以随意和redux打交道 可以使用任何redux的api)
  - 2. UI组件    (UI组件只负责做界面的呈现，不能使用任何redux的api)

  - 容器组件 包裹着 UI组件 它们是父子关系



- 所有的UI组件都应该包裹一个容器组件 他们是父子关系
- 容器组件是真正和redux打交道的 里面可以随意的使用redux的api
- UI组件中不能使用任何redux的api

- 容器组件会传给UI组件2种东西：
  - 1. redux中所保存的状态
  - 2. 用于操作状态的方法
<!-- 
  UI组件是负责做呈现的 写页面的 绑定用户的各种事件的 也就是说界面的呈现以及监听都是在UI组件里面写的

  那我是不是要在监听里面操作redux吧 但是UI组件又没有操作redux的api 那么只能麻烦父组件
  比如我们想初始化展示 当前求和的0
  UI组件不能自己去找redux 我们要让容器组件去redux里面把0取出来 父亲再通过props的形式再传递给UI组件

  UI组件负责：展示redux里面的状态 根据用户的行为操作redux里面的状态
 -->

- 备注
- 容器给UI传递： redux状态 操作redux状态的方法 均通过props传递

<!-- 

        Count(容器组件)
  +--------------------------+
  |                          |
  |     Count(UI组件)         |
  |   +--------------+       |
  |   |              | props |         store.getState()
  |   |              | < -- >|   < ---------------------- >   Redux
  |   |              | 父子间 |      store.dispatch(action)
  |   |              |       |
  |   |              |       |
  |   +--------------+       |
  |                          |
  +--------------------------+
  
 -->

- 所有跟redux打交道的都要交给容器组件 容器组件通过props传递给UI组件去做展示
- 总感觉 react-redux 不想让我们在展示页面的组件里面随意的去写redux相关的东西 是不是担心redux跟项目的耦合度太高 担心redux以后不维护 我们修改起来特别的麻烦

----------------------------

### 连接容器组件与UI组件
- 容器组件 和 UI组件的目录结构
<!-- 
  | - src
    | - components    UI组件的文件夹
      | - Count       Count UI组件

    | - container     容器组件的文件夹
      | - Count       Count UI组件的容器组件
-->

- 我们创建好UI组件（内部不能用关于redux的代码）同时也创建好容器组件


> 容器组件的定义
- 容器组件是一个桥梁  UI组件  ---  容器组件  ---  redux
- 左手边是UI组件 右手边是redux 它是一个很重要的东西 不是我们自己定义rcc创建出来的模板 它需要借助react-redux去生成

- 1. 安装 react-redux
- npm i react-redux

- 2. 引入 UI组件
- 引入左手
<!-- 
  它是一个桥梁 我们要引入左手边 和 右手边的东西
  // 引入左手边的UI组件
  import CountUI from '../../components/Count'
 -->

- 3. 从react-redux上引入connect 用于连接容器组件
- 连接左手
<!-- 
  import {connect} from 'react-redux'
 -->


- 4. 创建左手链接 UI组件 和 容器组件 的链接
- 使用 connect()() 创建一个跟 UI组件 建立好链接的 容器组件
- const 容器组件 = connect()(UI组件)
<!-- 
  const CountContainer = connect()(CountUI)
 -->

- 5. 将容器组件暴露出去
<!-- 
  export default CountContainer
 -->

> App组件中应该渲染的是UI组件还是容器组件
- 注意我们的结构 是 容器组件包裹着UI组件吧 那我们就应该在页面渲染容器组件 容器组件一渲染由于UI组件是容器组件的子组件 子组件也会出来

- 所以我们在<App>组件里面 要挂载的是 <CountContainer>容器组件
<!-- 
  // App组件中
  // 由于是默认暴露我们可以自己起名字 这里起了Count
  import Count from './containers/Count'

  <div className='container'>
    App...

    <Count/>
  </div>
 -->

- 6. 引入右手
- 容器组件用于连接左手的(容器组件)和右手的(redux的store)
<!-- 
  为什么是redux的store？
  因为store是redux的核心部分有了它我们就有了更新数据的dispatch方法 和 得到数据的getState方法
 -->

- 但是右手store的引入并不是通过import简单的引入 而是要在App组件中的容器标签内部通过props的形式引入（通过容器组件的上层传递过来的）

- 方式：
- 1. App组件中 引入 store.js 文件
- 2. 通过props在容器组件的标签内部 使用props的形式传递store
<!-- 
  // App组件

  import React, {Component} from 'react'
  import store from './redux/store'
  import Count from './containers/Count'

  export default class App extends Component {
    render() {
      return (
        <div className='container'>
          App...

          // 在这里我们使用props的形式 引入 store
          <Count store={store}/>

        </div>
      )
    }
  }
 -->

----------------------------

### react-redux的基本使用
- 上一节中我们使用了connect()()方法连接了UI组件创建了容器组件 也在App组件中使用props的形式传递了store对象，相当于完成了连接左手和右手

- 我们先验证一下 CountContainer组件和Count组件是不是父子关系，从代码的角度上看并不能体现出他们两个是父子关系
<!-- 
  const CountContainer = connect()(CountUI)

  这并不能看出是不是父子关系
 -->

- 我们可以借助开发者工具可以观察到父子关系

- 我们回过头在看一下react-redux的模型图 
- 容器组件 要给 UI组件传递
  - 1. redux中所保存的状态
  - 2. 用于操作状态的方法
<!-- 
  由于他们是父子关系 可以借助props来进行传递 props都是一组组的key：value

  可以正常是 我要打开容器组件 然后在UI组件的标签里面 使用props的形式传递数据
  但是。。。。。。

  容器组件怎么打开？
 -->

- 在容器组件中写逻辑：
> connect(fn1, fn2)(UI组件)
- 用于容器组件 给 UI组件 传递数据
- 容器组件本身是由store对象的(App组件传递进来的)

- 在第一次调用的时候需要传递两个参数 在调connect的返回值的时候传递UI组件
- 这两个参数是函数
> fn1:
- fn1函数的返回的对象中的key:value 就是传递给UI组件props中的key:value
- 作用：将参数传递给UI组件 本质是把状态带到UI组件

<!-- 
  由于我们没有正常通过props的形式给UI组件传递数据
  <App>
    <Count a={1}/>
  </App>

  所以我们将 a={1} 做为fn1的返回值 交给UI组件

  // 第一个fn1 的作用
  function fn1(state) {
    console.log(state)
    return {n:900}
  }
  
  const CountContainer = connect(fn1, fn2)(CountUI)
  第一个fn1 将参数传递给 UI组件 相当于 <Count n={900} />

  注意：
  形参state就是redux中store中保存的数据 因为fn1的作用就是将store中保存的数据传递到UI组件里面，所以这里可以直接获取到
 -->

> fn1的形参state
- 注意：
- react-redux帮我们调用的回调 所以fn1中的形参就是 redux中store中保存的结果(状态)
- 我们直接将state传递到UI组件即可 相当于就是将状态传递到UI组件
<!-- 
  // 定义向UI组件传递数据的参数1
  function uiData(state) {
    console.log(state)      // reducer中初始化的0
    return {count:state}
  }

  const CountContainer = connect(uiData, uiMethod)(CountUI)

  // UI组件
  <h3>当前求和为：<span>{this.props.count}</span></h3>
 -->


> fn2:
- fn2函数用于操作状态的方法
- fn2函数也要有返回值，返回值是一个{ }

- fn2的作用是修改store中的数据(状态)，那既然要修改，UI组件内部不能直接修改 所以就需要UI组件把要修改的数据data 传递回容器组件 容器组件接到data 在容器组件的方法内部做相对应的逻辑

- 比如 我们在fn2内部 通知redux +1

> fn2的形参 dispatch
- 可以使用此方法通知store修改状态
<!-- 
  // 定义想UI组件传递 操作状态的 方法 参数2

  它会收到一个参数 dispatch 用于通知store修改状态
  function uiMethod(dispatch) {
    return {

      // 该方法的形参可以接收到UI组件传递过来的数据
      increment: (data) => {
        // 在这里我们通知store来修改状态

        // 因为我们要传递动作对象 还是需要把 count_action.js 引入 里面用方法用于创建动作对象
        dispatch(
          createIncrementAction(value)
        )
      }
    }
  }

  该方法就会在UI组件的this.props中 this.props.increment()

  //UI组件
  increment = () => {
    let value = this.selectNumber.value
    this.props.increment(value)
  }
  UI组件需要将data传递回容器组件内部
 -->



- 我们看下代码部分 并且看一下 UI组件Count中 this.props的结果是什么
<!-- 
  // 容器组件
  import CountUI from '../../components/Count'
  import {connect} from 'react-redux'

  // 引入 创建动作对象的js文件
  import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action'


  // 定义向UI组件传递数据的参数1
  function uiData(state) {
    console.log(state)
    return {count:state}
  }

  // 定义想UI组件传递 操作状态的 方法 参数2
  function mapDispatchToProps(dispatch) {
    return {
      increment: (value) => {
        dispatch(
          createIncrementAction(value)
        )
      },
      decrement: (value) => {
        dispatch(
          createDecrementAction(value)
        )
      },
      asyncAdd: (value, time) => {
        console.log(value, time);
        dispatch(
          createIncrementAsyncAction(value, time)
        )
      }
    }
  }

  // 创建容器组件
  const CountContainer = connect(uiData, uiMethod)(CountUI)
  export default CountContainer



  // UI组件中
  console.log('UI组件接收到props是',this.props)

  props的结果是
  1. name: sam
  2. increment: ƒ
  3. store对象
    - @@observable: ƒ observable()
    - dispatch: ƒ (action)
    - getState: ƒ getState()
    - replaceReducer: ƒ replaceReducer(nextReducer)
    - subscribe: ƒ subscribe(listener)
 -->


> 总结
- 1. 获取容器组件 向 UI组件传递的数据 在UI组件中通过this.props获取
- 2. 容器组件 向 UI组件 会传递两个东西
    1: store中保存的数据(状态)
    2: 发送一个函数用于从UI组件中获取数据，容器组件拿到数据后 在内部通知redux

    1: 利用connect(fn1, fn2) fn1完成
        fn1函数的形参会接收到redux中的store中的状态(数据)
        <!-- (state) => {} -->
        
    2: 利用connect(fn1, fn2) fn2完成
        fn2函数的形参是dispatch 用于拿到数据后通知redux来进行修改
        <!-- 
          (dispatch) => {
            return {
              increment: (会接到UI组件的数据) => {
                dispatch(利用创建动作对象的js文件中的方法(value))
              }
            }
          }
        -->

- connect(fn1, fn2) 有自己的名字
  - fn1: mapStateToProps
  - fn2: mapDispatchToProps


- 明确两个概念
  - UI组件： 不能使用任何redux的api 只负责页面的呈现 交互等
  - 容器组件：负责和redux通信 将结果交给UI组件

- 如何创建一个容器组件 -- 靠react-redux的connect函数
  - connect(mapStateToProps, mapDispatchToProps)(UI组件)
    - mapStateToProps  将redux中的状态映射到UI组件中 返回值是一个对象
    - mapDispatchToProps  映射操作状态的方法 返回值是一个对象

- 备注：
  - 容器组件中的store是靠props传进去的 而不是在容器组件中直接引入

----------------------------

### 优化：简写 mapDispatchToProps 
- 从这个小节开始我们对上面react-redux中的代码进行优化
- 我们先从connect()()的fn2开始

> 代码书写格式上的优化
- 看上去是方便写了 但是可读性 和 规整方面不高啊
<!-- 
  之间我们是定义了两个函数
  function fn1() { }
  function fn2() { }

  connect(fn1, fn2)(UIcomponent)

  ==优化成== >

  export default connect(() => {}, () => {})(UIcomponent)
 -->


> API层次上的优化
- mapDispatchToProps (它也是fn2) 它提供了给我们简写的方式
- mapDispatchToProps 可以写成function 也可以写成{K:V}
<!-- 
  // function的形式
  dispatch => (
    {
      increment: (value) => {
        dispatch(
          createIncrementAction(value)
        )
      },
      decrement: (value) => {
        dispatch(
          createDecrementAction(value)
        )
      }
    }
  )


  // {} 的简写形式
  {
    increment: createIncrementAction
    decrement: createDecrementAction
  }

  createIncrementAction 是 count_action.js 文件中的 用于创建action对象的方法
  我们把这个方法提供给UI组件， UI组件会将数据 给createIncrementAction的形参 用于创建对象

  而 react-redux 会自动帮我们调用dispatch 在创建好action对象后 将对象分发的store
 -->

----------------------------

### 优化：provider组件的使用
- 我们在入口js文件里面使用 store.subscribe(回调) 用来监听 redux 中的数据变化， 好让我们重新的渲染App组件
<!-- 
  // 监测redux中的状态的改变 如果redux的状态发生了改变 那么就重新渲染App组件
  store.subscribe(() => {
    ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, document.querySelector('#root'))
  })
 -->

> 优化： store.subscribe() 不用了
- 在我们使用 react-redux 之后
- 我们就可以将上面的 store.subscribe() 部分的逻辑删掉了 因为使用了react-redux之后不用我们自己监测了
<!-- 
  监测redux中的数据变化 当我们调用了connect()()后 就默认拥有了监测redux中状态改变的能力
 -->


> 优化： 容器组件
- 我们再想想容器组件里面的 store 是怎么得到的？
- 是通过容器组件的上层组件App 用props的形式将引入的store传递进去的吧
<!-- 
  import store from './redux/store'
  <Count store={store}/>
 -->

- 那假如页面中还有别的组件 也需要传递 store 而且数量很多 而且每一个组件都是容器组件的话 我们是不是要传递很多遍 怎么办？

- 那有没有办法 我写一行 就会找到应用里面所有的容器组件 都把store给他们传递过去呢？


> Provider组件的使用
- 该组件会将store对象 添加给每一个需要store的容器组件

- 我们在入口文件index.js文件中 
- 分别从 react-redux 身上 引入 store Provider组件
<!-- 
  import {Provider} from 'react-redux'
  import store from './redux/store'

  我们将所有容器组件都需要使用的store交给 Provider 
  Provider 会自动分析整个应用里面的容器组件 把store精准的传递给需要store的容器组件


  ReactDOM.render(

    // 我们将store交给Provider组件 然后将整个<App>包裹起来
    <Provider store={store}>
      <BrowserRouter><App /></BrowserRouter>
    </Provider>, 

    document.querySelector('#root')
  )


  // App组件中 也不用通过这种形式传递store了
  <Count store={store}/>

  === >

  <Count/>
 -->



> 总结
- App的上层文件 竟然是 index.js的入口文件

----------------------------

### 优化：整合UI组件和容器组件
- 这节里面我们主要看下怎么从文件层面对应用来进行优化
- 我们学习了react-redux 它的要求是一个组件要拆分成容器组件和UI组件
<!-- 
  比如 我们页面中有80个组件，但是其中20个组件要跟redux打交道 那是不是要将这20个组件拆分成20个组件
 -->

- 在实际开发得时候 我们通常会将 容器文件 和 组件文件做一个整合 不用拆成两个文件来写
- 我们可以将她们两个写成下面的样子
<!-- 
  比如下面是一个jsx文件 但是里面定义了两个组件 一个UI 一个容器 我们在容器组件里面调用了UI组件 并将容器组件暴露出去：

  import React, {Component} from 'react'

  class UIcomponent extends Component {

  }

  export default class UIcontainer extends Component {
    render() {
      return (
        <div>
          <UIcomponent />
        </div>
      )
    }
  }
  
 -->

- 那我们的项目中应该怎么写呢？
<!-- 
  也一样 我们要注意几点
  1. import都放在上面
  2. 我们默认暴露的是容器组件

  import {connect} from 'react-redux'
  import React, {Component} from 'react'

  import {createIncrementAction, createDecrementAction, createIncrementAsyncAction} from '../../redux/count_action'

  // 定义UI组件
  class Count extends Component { }

  // 创建容器组件 将容器组件暴露出去
  export default connect()(Count)
 -->


> 总结
- 我们看看这3小节我们都做什么怎么样的一个优化

- 1. 容器组件和UI组件混成一个问卷

- 2. 无需自己给容器组件传递store，给<App>包裹一个<Provider store={store}>即可

- 3. 使用了react-redux后也不用再自己检测redux中状态的改变了， 容器组件可以自动完成这个工作

- 4. mapDispatchToProps也可以简单的写成一个对象

- 5. 一个组件要和redux 打交道 要经过哪几步
  - 5.1 定义好UI组件 --- 不暴露
  - 5.2 引入connect生成一个容器组件 并暴露 写法如下
    connect(
      state => ({key:value}),
      {key: xxxAction}
    )(UI组件)
  - 5.3 在UI组件中通过this.props.xxx 读取和操作状态

----------------------------

### redux - 数据共享
- 这里开始我们研究下如何借助redux来完整多个组件之间的数据共享
- 上面的案例中 我们始终用了一个组件和redux来进行交互 而实际上多组件的时候才是需要redux的时候
<!-- 
  比如
  Count组件 把 求和的那个和 放在redux里
  Person组件 把 学生的信息 放在redux里

  这样Count组件可以 使用 Person组件 里的数据 而Person组件也可以使用Count保存在redux中的数据 这才是多组件之间的数据共享
 -->

> 整理 redux文件夹中的结构
- 因为每一个组件都要有自己的action 和 reducer所以当组件特别多的时候 我们就要整理成下面的结构 方便我们管理
<!-- 
  | - src
    | - redux
      | - actions
      | - reducers
    
    - store.js
    - constant.js
 -->

- 接下来我们创建一个 Person 组件 保存一堆人的数据 将这些数据交给redux去管理
<!-- 
  | - src
    | - containers
      | - Count
      | - Person
 -->


- 我们再来看下新的需求 我们希望
- Count组件能够展示自己的组件内容外，展示一堆人的信息
- Person组件能够展示自己的组件内容外，求和的和
<!-- 
    Count

                redux (Count的和  Person一堆人的数组[])

    Person  
 -->


- Person组件我们准备好了 因为逻辑很简单就没有写
- 同时
- 我们还要为Person组件创建一套属于它的redux 因为我们每次添加的学生信息要放在redux中才能引起页面的显示变化

- 分析：
- redux文件夹中 都应该有什么样的变化
<!-- 
  // store.js文件 用不用有什么变化？
  一个项目只有一个store 但是 我们之前创建store对象的时候传入的厨师是count组件的厨师
  const store = createStore(countReducer, applyMiddleware(thunk))
  那Person组件的厨师怎么传入？


  // constant.js文件 用不用有什么变化？
  这里面定义的是 action活动对象中的type 代表作什么事情吧 我们添加一个
  export const ADD_PERSON = 'add_person'


  // 接下来 创建 Person组件的action
  import {ADD_PERSON} from '../constant'
  export const createAddPersonAction = data => ({type:ADD_PERSON, data})

  import {ADD_PERSON} from '../constant'

  let initState = [
    {id: '001', name: 'sam', age: 18}
  ]
  export default function personReducer(preState=initState, action) {
    let {type, data} = action

    switch(type) {
      case ADD_PERSON:
        return [data, ...preState]
      default:
        return preState
    }
  }
 -->

> store 和 redux 中的问题
- 1. 当只有一个组件的时候 我知道redux中保存的数据是 这个组件交过去的 我们使用的时候从redux中取的也是这个组件的存进行的数据
<!-- 
  A组件        redux
            A组件的数据
 -->

- 2. 当有多个组件都要在redux中存放数据的时候 问题
  - 1. 每一个组件都要有自己的reducer 多个组件怎么在store中挂载reducer
  <!-- 
    const store = createStore(countReducer, applyMiddleware(thunk))
    目前我们只挂载了一个count组件的reducer
   -->
  - 2. 我们读取数据的时候怎么知道读的是什么？因为都是通过getState()来获取数据 当多个组件都往redux中放数据的时候 里面就是乱七八糟的


> redux 中的数据结构
- 当多个组件都在redux存放数据的时候， 为了能取出我们指定想要的数据 redux中的数据必须有结构

- 当有多个reducer工作的时候代表redux要管理多组状态 所以redux中的数据结构是一个对象 对象里每一个组件存放的状态都是以key:value来存储的 我们可以根据key来取出value

- 也就是说redux中所保存的数据结构必须是一个对象
<!-- 
          redux
      {
        count: 0,
        person: []
      }
 -->


> 为了整理redux管理多个reducer的问题，我们需要在store中对多个组件的reducer进行合并，合并的前提是 从 redux 中导出 
> import {combineReducers} from 'redux'
- 我们要使用 combineReducers({redux中保存的总状态对象}) 这个函数 合并多个reducer

- 参数：
- 参数是一个对象 我们在combineReducers里面传入的对象 就是redux中帮我们保存的总状态对象
- 这个对象中要写一组组的key
- 数据变量名: 初始化、加工这个数据的reducer

<!-- 
  比如 我们现在有两个组件都要在 redux 中存放数据 分别是
  count组件中的   和
  person组件中的  一堆人

  combineReducers() 需要传入一个对象作为参数 而传入的这个对象 就是redux中帮我们保存的总状态对象 为了方便我们能从状态对象中获取到 值 

  redux中的对象的数据结果必须是一个对象， 也就是说往combineReducers函数中传入的也必须是一个对象 所以 我们要组织下对象的结构

  const allReducers = combineReducers({

    // 为什么value是countReducer 因为he是靠countReducer返回的
    // 谁以后能初始化这个he 能加工这个he就写谁
    he: countReducer,     
    rens: personReducer
  })




  上面的 对象结构 组织好后 redux 中的对象结构 我们也知道了
  combineReducers({
    he: countReducer,     
    rens: personReducer
  })

  // 真实的值是reducer的返回值
  {
    he: 0,
    rens: {id:xxx, name:'sam', age:18}
  }
 -->


- 看看store.js中的完整代码
<!-- 
  // store.js文件

  // 引入 createStore 专门用来创建 store
  import {createStore, applyMiddleware, combineReducers} from 'redux'

  // 引入redux-thunk 用于支持异步action
  import thunk from 'redux-thunk'

  // 引入 为count组件服务的 reducer.js
  import countReducer from './reducers/count'
  import personReducer from './reducers/person'

  // 用于合并多组 组件的reducer 并组织成一个redux中保存数据的对象 便于我们通过key取到value
  const allReducers = combineReducers({
    he:countReducer,
    rens:personReducer
  })

  // 创建一个store对象
  // 这里我们传入的时候 也不要传入一个reducer 而是传入一个all
  const store = createStore(allReducers, applyMiddleware(thunk))

  // 把store暴露出去
  export default store
-->


- A组件从redux中读取B组件的数据
- B组件从redux中读取A组件的数据
- 那该怎么实现呢？
- 读取redux中的数据是容器组件干的事情，我们可以在映射数据的fn1参数中读取数据，这样数据就会在UI组件的props中
<!-- 
  Count组件展示Person组件存在redux中的数据
  <h3>Count组件，下方组件总人数为{this.props.rens}人</h3>

  export default connect(

    // 我们是通过容器组件和redux进行交互 fn1是映射数据 我们在容器组件里读取数据 UI组件能从props中获取数据
    state => ({ count:state.he, rens:state.rens.length}), 
    fn2
  )(UI组件)
 -->

> 总结
- 1. 定义一个Person组件 和 Count组件通过redux共享数据
- 2. 为Person组件编写 reducer action 配置constant常量
- 3. 重点： Person和reducer 和 count的reducer要使用combineReducers进行合并
     合并后的总状态是一个对象!!!
- 4. 交给store的是总reducer 最后注意在组件中取出状态的时候 记得 取到位

----------------------------

### 纯函数
- 我们在添加一个人的时候 使用的是下面的方式 包括前面的逻辑很多都是用下面的方式
<!-- 
  switch(type) {
    case ADD_PERSON:
      return [data, ...preState]

    default:
      return preState
  }
 -->

- 我们很少用push()等方法 为什么不用操作数组的这些方法呢？前面加 后面插 里面删除一个人的方法呢？
<!-- 
  preState是之前的状态 那我这么写行不行 我觉得没问题啊

  preState.unshift(data)
  return preState
 -->

- 但是我们发现 我们使用unshift()方法添加一个人的时候 是添加进去了 但是页面却没有显示

- 因为在redux的底层做了一个判断 如果我们返回的preState 和之前的preState是一样的 我们就不进行页面的更新
<!-- 
  redux比较的是preState的地址值 我们使用push等方法往数组里面追加数据 对象本身的地址值并没有发生变化


  而
  return [data, ...preState]

  则是拿到preState中的一堆人展开 放到了一个 新新新数组里面
 -->

- 所以我们发现 我们在react 和 redux里面很少使用 push系列的方法 一般都是弄出一个新的数组 和 对象出来

> 纯函数的定义
- 它是一类特别的函数 只要是有同样的输入(实参) 必定得到同样的输出(返回)
<!-- 
  比如
  我们调用demo传入1 返回1  传入2 返回2 demo(1) = 1   demo(2) = 2
  它就是一个纯函数

  但是 比如 好久之后 我们传入1 返回9 那么demo就不是一个纯函数
  因为同样的输入(1) 并没有得到同样的输出1 反而是9

  函数传入的函数一样 返回的不也一定应该一样么？
  不是纯函数的demo
  function demo(a) {
    return Math.random() + a
  }

  这样前一秒 和 后一秒调用demo 我们传入的a是一样的 但是结果就不一样了吧
 -->

- 纯函数必须遵守以下一些约束
  - 1. 不得改写参数数据
  <!-- 
    function demo(a) {

      函数内部不能改写参数数据 如下的话 函数不纯了
      a = 9

      return Math.random() + a
    }

    我们上面的reducer案例也是
    preState 是一个参数数据吧 假如我们这样
    preState.push(data) 它会影响原数组吧 我们是不是把preState给改了 这就属于改写参数数据了
   -->

  - 2. 不会产生任何副作用 例如网络请求 输入和输出设备
  <!-- 
    网络请求 可能数据一断网就没了 所以纯函数中不能发送网络请求 不靠谱的事纯函数里面不能做
   -->

  - 3. 不能调用 Date.now() 或者 Math.random() 等不纯的方法

- redux的reducer函数必须是一个纯函数
<!-- 
  注意这里不能这么写 这样会导致preState被改写了 personReducer就不是一个纯函数了 就会导致redux不能识别状态的改变
  preState.unshift(data)


  应该这么写
  return [data, ...preState]
 -->

----------------------------

### redux开发者工具
- 我们自己的写的组件 或者 组件少的时候还好 我们自己知道redux中保存的是什么 结构是什么样的 当这个项目是多人开发得时候 我们怎么知道 或维护 或管理 redux中的数据呢？

- redux中也有开发者工具
- redux的开发者工具需要一些代码的操作 和 一个库的配合才能起作用

- 1. npm i redux-devtools-extension

- 2. 我们要在store.js文件中 做编码操作
  - 2.1 store.js文件中 引入上面下载的库 并且 从中拿到 composeWithDevTools
  <!-- 
    import {composeWithDevTools} from 'redux-devtools-extension'
   -->

- 3. 在创建 store对象的createStore({}, 第二个参数) 的第二个参数的位置 执行composeWithDevTools就可以了
<!-- 
  const store = createStore(allReducers, composeWithDevTools())


  // 但是 我们第二个参数的位置上 已经写了一个执行中间件的代码了 那我们放在那里？
  const store = createStore(allReducers, applyMiddleware(thunk))

  如果我们已经有一个参数的情况下 那么我就把这个参数作为composeWithDevTools的参数传递进去
  const store = createStore(allReducers, composeWithDevTools(applyMiddleware(thunk)))

 -->
  
----------------------------

### 修改上面案例中不合理的一些问题
> store.js 文件
- 我们在这个文件里做了一些 合并reducer的操作， 当我们的项目有40多个组件的话 那是不是说明store.js文件中 有40多个引入的操作 那这个文件就有些太大了

- 一般reducer的合并工作 都会在一个js文件里面进行 合并后 再引入store文件

- 总结：
- store文件中不引入任何的reducer 只引入一个汇总之后的结果


- 我们在 redux文件夹中创建一个index.js
- 该文件用于汇总所有的reducer为一个总的reducer

> 总结
- 所有变量名字要规范，尽量触发对象的简写形式
- reducers文件夹中 编写index.js专门用于汇总并暴露所有的reducer

----------------------------

### 将上面的案例 打包
- npm run build

- 打包之后的东西就不能右键用live server查看了 它们需要部署到服务器上运行
- 有两种方式
- 1. 我们自己使用nodejs搭一个服务器
- 2. 使用一个库 serve

- 这个库的功能是让我们以指定的文件夹快速的开启一台服务器

- 全局安装
- npm i serve -g
- 然后进入到这个文件夹 开启终端 输入 serve 命令


- 假如我们现在在test文件夹里 想让a做为根目录开启一台服务器 我们可以输入 两种方式都可以
- serve a
- serve ./a
<!-- 
  | - test
    | - a
 -->

----------------------------

### 扩展的知识体系 -- setState
- 这节我们来说说setState的扩展用法

> setState的第一种写法： 对象式的setState
> setState(参数1， 参数2)
- 参数1：
  - 传入一个对象， 这个对象也叫做 状态改变对象 因为这个对象是用来改变状态的

- 参数2[可选参数]：
  - 传入一个回调， 该回调在状态更新完毕并且界面也更新后(render调用后)才被调用
  - 比如我们可以在回调中读取state修改后的值


> 这里面有一个点 react的界面更新时异步的：
- setState是一个同步的方法 只要我们调用立马在主线程上执行 但是setState引起react的后续的更新动作是异步的更新 比如 我们看下下面代码的执行顺序
<!-- 
  state = {
    count: 0
  }

  add = () => {
    const {count} = this.state
    this.setState({
      count : count + 1
    })
    console.log('setState后面的输出', this.state.count);
  }

  我们会发现 先是0 后是1 说明setState方法是异步更新 如果我们在add的逻辑里想要拿到我们修改后的值 我们就需要在回调里写逻辑
 -->


> setState的第二种写法： 函数式的setState
> setState(参数1， 参数2)
- 参数1：
  - 传入一个函数， 这个函数的返回值为状态被修改之后的对象，就也可以说状态改变对象作为函数的返回值了
  - 这个参数函数是可以接到state 和 props的
  <!-- 
    this.setState((state, props) => { ... })
   -->

- 参数2[可选参数]：
  - 传入一个回调， 该回调在状态更新完毕并且界面也更新后(render调用后)才被调用
  - 比如我们可以在回调中读取state修改后的值
  - 该方法需要返回一个 return {}
<!-- 
  // 函数式的setState可以不用获取原来的值
  this.setState((state, props) => {

    // 返回一个对象
    return {count:state.count+1}

  }, ()=>{
    console.log(this.state)
  })

  简写：
  this.setState(state => ({count: state.count+1}))
      因为返回是一个对象 我们要用()包裹{}
 -->


> 总结
- 对象式的是函数式的语法糖
- 使用原则：
- 如果新状态不依赖原状态 --- 使用对象方式
<!-- 
  不管原来状态中的数据是多少 直接改成99
  this.setState({count:99})
      // 不用获取原状态 在原状态的基础上进行操作的时候 叫做 不依赖
 -->

- 如果新状态依赖于原状态 --- 使用函数式
- 如果需要在setState()执行后获取最新的状态数据 要在第二个callback函数中读取

----------------------------

### 扩展的知识体系 -- lazyLoad
- 如果我们的项目特别大 组件特别多 懒加载这件事是必须要做的
- 用的时候我再加载你 不用不加载

- 在react中懒加载用的最多的就是路由组件的懒加载
- 当我们在点击<Link>按钮的时候，是将所有的路由组件全部的请求回来 假如我们有几百个路由组件 也是一样的一起请求回来

- 那是不是我们应该是点哪个<Link>按钮 请求回来对应的内容比较好一些


> 路由组件的懒加载
- 1. 我们找到引入路由组件的组件， 也就是路由组件的父组件

- 2. 从react中引入 Lazy函数
- import React, {Component, lazy} from 'react'

- lazy(参数)
  - 参数：
  - 回调 
  <!-- 
    lazy(() => {import('路径')})
   -->

- import的使用方式 有两种
<!-- 
  import可以这么如下使用
  import ''
  import('./Home')   
 -->

- 3. 修改路由组件的引入方式， 使用定义变量的形式
<!-- 
  import Home from './Home'
  import About from './About'

  改成

  const Home = lazy(() => import('./Home'))
  const Home = lazy(() => import('./About'))
 -->

- 4. react考虑到当网速慢 懒加载的组件迟迟不返回的时候 我们要使用<Suspense fallback=...> 中的fallback给我们指定一个组件
- 从react中引入 Suspense组件
- import React, {Component, lazy, Suspense} from 'react'

- 我们使用<Suspense fallback={组件}>组件将所有 注册路由<Route>包裹起来
<!-- 
  <Suspense fallback={<h1>加载中...</h1>}>
  <Suspense fallback={<Loading />}>
    <Route path='/home' component={Home} />
    <Route path='/about' component={About} />
  </Suspense>
 -->

- 利用<Suspense fallback={组件}>可以让用户的体验更好，当请求过慢的时候我们可以定义一个动画加载的组件 放到fallback里面

- fallback={组件}中的组件不能用懒加载的形式，只能正常引入 因为Suspense组件渲染的组件必须提前就位

----------------------------

### 扩展的知识体系 -- react Hooks
- Hook是React 16.8.0版本增加的新特性/新语法
- react推出了一些hook 所以叫做hooks

> 作用：
- 可以让你在函数组件中使用 state 以及其他的 React 特性

- 之前我们讲过函数式组件，函数式组件最大的问题就是没有this 没有实例对象 函数里面的this是undefined 导致了函数式组件不能使用state refs 生命周期 之前我们说函数式的组件只能定义一些很简单的组件


> 三个常用的Hook

> 函数组件的Hook
- 作用：
- 让函数组件也能拥有state，来存放数据

- 总结：
- 1. 函数组件的使用，因为整个的数据(state)，操作的方法(一些事件回调), DOM结构 素有的都在函数内部，所以利用作用域的原因 整个函数中可以直接使用变量，随意定义变量 随意定义方法，方法的定义 函数声明式就可以 也没有需要注意this的方法 使用起来比较方便和舒服
<!-- 
  比如上面的定义的数据 下面DOM结构中直接拿着变量使用就可以
 -->

- 2. 整个函数组件也会被调用1+n次，1为初始的渲染，n为每次数据变化该组件都会被重新渲染，但内部的state中的数据，react底层会做缓存处理 不会因为函数的再次调用被覆盖
<!-- 
  // state的初始化的时候我们在函数组件内部 定义为0
  const [age, setAge] = React.useState(0)

  如果函数再次被调用那么下面的结果会被覆盖为0，但是事实上并没有 因为react底层做了处理
  function add() {
    setAge(age+1)     age应该是1
  }
 -->

- 3. 当要往state中存放多个数据的时候 就要写多次的React.useState()
<!-- 
  const [name, setName] = React.useState('sam')
  const [age, setAge] = React.useState(18)
 -->  


> React.useState(参数1, 参数2)
- 该方法用于给函数式组件添加state状态
- 该方法会返回一个数组，数组中第一个元素时state 第一个元素时操作state的方法

- 所以该方法的返回值一般使用 解构赋值 的方式来操作
<!-- 
  const [count, setCount] = React.useState(state的初始值)
 -->
 
- 使用方式：
- 1. React.useState()的参数里要放 我们想存在state中的数据
- 2. 这个方法会返回一个数组，里面保存着初始化的数据 和 修改数据的方法
  - 参数1： 数据
  - 参数2： 修改数据的方法
<!-- 
  const [name, setName] = React.useState('sam')
  我们在state中存放了sam， 在接收返回值的时候定义了变量 和 修改sam数据的方法
 -->

- 注意：
- 修改state的方法 并不是一个回调 而是直接可以调用的一个函数 我们通过将要修改的结构通过实参的形式传递进去
<!-- 
  // 直接传递进去state的最新的结果 这个内置函数就会将state修改为erin
  setName("erin")

  // 还可以利用 解构出来的第一个元素也就是state的值
  const [count, setCount] = React.useState()
  setName(count + 1)
 -->


> 关于参数2的解析：
- 修改数据的方法有两种方式
- 方式1：
- setName(新数据)
- 参数直接是新的数据
<!-- 
  // 该函数为 react html 中点击按钮后的回调
  function changeName() {

    // 下面的setName 和 setAge为修改解构出来修改状态的方法
    setName('tom')
    setAge(age+1)
  }
 -->

- 方式2：
- setName(回调)
- 参数是一个回调 回调的参数是保存在state中的数据，函数需要返回一个新的数据, 内部用其覆盖原来的状态值
<!-- 
  function changeName() {
    setAge(age => age+1)
  }
 -->

<!-- 
  function Demo() {

    a是一个数组 里面只包含了两个元素 第一个元素时状态 第二个就是更新状态的方法 它是一个内置的函数 可以更新第一个元素 也就是状态
    const a = React.useState(state的初始值)

    这里我们使用结构赋值
    const [count, setCount] = React.useState(0)
    
    // setCount的第一种方式
    function add() {
      setCount(count + 1)
    }

    // setCount的第二种方式
    function add() {
      setCount((value) => {return newValue})
      setCount(value => newValue)
    }

    return (
      <div> 
        <h2>当前求和为:{count}</h2>
        <button onClick={add}>点击+1</button>
      </div>
    )
  }
 -->
 
- 但是我们时候statehook 每次都会有这样的代码出现 尤其是在函数组件中要设置的state多了的情况下
<!-- 
  const [name, setName] = React.useState("tom")
  const [count, setCount] = React.useState(0)
 -->

------

> React.useEffect(参数1, 参数2)
- Effect Hook
- 作用：
- 在函数式组件里面使用生命周期钩子

- 使用：
- 参数1：回调函数
- 如果我们不传递 参数2 所有的状态发生改变的时候 都会执行 参数1的回调 相当于监测所有人(state中的所有数据) 它会执行 1+n 次 初始化一次 只要更新还会继续调用该回调

- 参数2：数组
  - 传递[] 则谁也不监测
  - 传递[count,name] 则代表监测指定元素 因为是数组可以监测多个数据
  - 不写 监测所有 只要数据有变化就会引起页面更新

<!-- 
  React.useEffect(() => {
    console.log('@')
        回调中的打印 只会在count数据发生改变的时候被调用
  }, [count])
 -->

- 技巧：
- 当我们 参数2 不传的时候 相当于 componentDidMount() 和 componentDidUpdate()
- 当我们 参数2 传递空数组 相当于 componentDidMount()
- 当我们 参数1 返回一个函数的话返回的函数相当于 componentWillUnmount()

- 如果我们想使用 componentWillUnmount() 生命周期的话 需要 参数1 返回一个函数 参数1返回的函数 就相当于 componentWillUnmount()


- 示例：
- 相当于 componentDidMount的用法
<!-- 
  React.useEffect(() => {
    setInterval(() => {
      setCount(count => count+1)
    }, 1000)
  }, [])
 -->

- 相当于 componentWillUnmount的用法
<!-- 
  React.useEffect(() => {
    let timer = setInterval(() => {
      setCount(count => count+1)
    }, 1000)


    // 这个函数相当于 componentWillUnmount()
    return () => {
      clearInterval(timer)
    }

  }, [])
 -->

- 生命周期中能干的时候 都可以在函数中的hook使用
- 比如：
- 发送ajax 设置订阅 / 启动定时器 / 手动修改真是的DOM(极其罕见)

------

> React.useRef()
- Ref Hook
- 我们在类式组件中 可以直接在 DOM结构中给节点打ref，那函数式组件中怎么使用呢？

- 使用方式：
- 1. 创建 ref 容器
  - const myRef = React.useRef()

- 2. 给DOM节点打ref
  - <input type="text" ref={myRef}/></p>

- 3. 值的读取
  - myRef.current.value

- 要点：
- 专人专用

----------------------------

### 扩展的知识体系 -- Fragment
- Fragment 英语含义 ： 碎片

- 我们的DOM结构如果想是多级的结构 那么结构中的外围必须要包裹一个<div> 那可能会造成一个问题 感觉没用的层级包裹的太多了
<!-- 
  真是的DOM结构中可能会是这个样子的
  <div id='root'>
    <div>                           ---- App的外层div
      <div>                         ---- Fdemo的外层div
        <input type="text"/>
        <input type="text"/>
      </div>
    </div>
  </div>
 -->


> <Fragment>
- 我们借助Fragment就能解决这个问题 来解决无关没用的div
- 只接收一个标签属性 key

- 1. 我们从react中引入 Fragment
- import React, {Component, Fragment} from 'react'

- 2. 当我们不得不包裹一个标签的时候 我们不用div 使用Fragment 最终编译后这个<Fragment>会被react丢掉
<!-- 
  <Fragment>
    <h3>Fragment</h3>
  </Fragment>

  最终就是一个
  <h3>Fragment</h3>
 -->

> 技巧：
- <></> 这种空标签也能达到和Fragment一样的效果

- 区别：
- 在遍历一堆结构的时候 我们会需要唯一标识 key
- 我们使用<Fragment key={1}> 可以指定标识 空标签不可以
- 空标签不能写任何的属性


> 总结：
- 如果我们的结构需要参与遍历的时候 我们就使用Fragment 或者也可以使用空标签

----------------------------

### 扩展的知识体系 -- Context
- 用于组件之间通信的一种方式，这种方式常用语【祖组件】和【后代组件】间的通信
<!-- 
  A >
    B >
      C > 
        D

  Context就适合于 A 和 C D 之间的通信
  A 和 B 之间也可以 但是有更简单的方式 props

  或者

  - 思考
  - App组件要传递数据给Child组件 该如何处理 这种情况我们需要层层传递
    App - Node - SubNode - Child
 -->

- 组件的实例对象身上有 props / refs / state 这3个对象我们都使用过， 组件身上还有一个对象就是 context


> context的使用方式：

> 1. 创建 context 容器对象  React.createContext()
- 这个对象必须要放在一个公共区域(A B C组件都能访问到的位置)
- 我们可以定义在 类式组件的外侧 比如import的下方
- 接收的变量首字母要大写
<!-- 
  import './index.css'
  const UserNameContext = React.createContext()

  class A extends Component { }
 -->


> 2. 在调用子组件的时候 使用 context容器对象.Provider 将子组件包裹起来
> context容器对象.Provider
- context容器对象.Provider它是一个标签
- 传递值的时候使用该context对象标签里的value属性传递
<!-- 
  <UserNameContext.Provider value={this.state.name}>
    <B/>
  </UserNameContext.Provider>

  或者 

  const {Provider} = UserNameContext
  <Provider>
    <B/>
  </Provider>
 -->

- 当传递多组数据的时候，我们的value值可以是一个对象
<!-- 
  <UserNameContext.Provider value={{name:name, age:age}}>
 -->

- 这样使用context对象标签包裹起来之后B组件 以及B组件中调用的C组件都能收到到我们传递过去的数据了

- 但是后代组件中 谁声明 谁使用


> 3. 后代组件读取数据 需要声明 我要用（谁用谁举手） 
> 使用数据方式一：只适用于接收数据的组件是类式组件
> static contextType

- 在类式组件中 使用 static contextType 来声明接收

- static contextType = UserNameContext
              （接收我们创建的context对象）

- 举手的组件使用 this.context 就是数据



> 使用数据方式二：函数组件 与 类组件都可以
> context容器对象.Consumer
- 使用context容器对象身上的Consumer属性 它是一个标签 标签内部写函数 函数的形参value就是接收到的值

- 函数内部返回什么就是展示什么

- <context容器对象.Consumer><context容器对象.Consumer> 这组标签在DOM结构中使用(return ())


> 示例
<!-- 
  // 使用Provider包裹子组件的 父组件
  class A extends Component {
    state = {name:'sam'}
    render() {
      return (
        <div className='big'>
          <h2>我是A组件</h2>
          <h3>我的用户名是：{this.state.name}</h3>
          <hr/>

          // 包裹的子组件 子组件里调用的后代组件只要声明都能收到
          <UserNameContext.Provider value={this.state.name}>
            <B/>
          </UserNameContext.Provider>
          
        </div>
      )
    }
  }
  
  // 举手的后代组件
  class C extends Component {
    static contextType = UserNameContext
    render() {
      return (
        <div className='small'>
          <h2>我是C组件</h2>
          <h3>我从A组件中接收到的用户名是：{this.context}</h3>
        </div>
      )
    }
  }

  // 函数式组件
  function C() {

    return (
      <div className='small'>
        <h2>我是C组件</h2>
        <h3>我从A组件中接收到的用户名是：

          <UserNameContext.Consumer>
            {
              (value) => {
                return (
                  // 还可以包一个span
                  value
                )
              }
            }
          </UserNameContext.Consumer>

        </h3>
      </div>
    )
  }

  相当于 我从A组件中接收到的用户名是：value
 -->

> 总结：
- 只要是想用context传递数据 那么一定要引入 context对象的Provider
- 至于需不需要使用Consumer 那要看是不是有函数式的组件


### 另一个老师的讲解
> 通信方式： Context
- 思考
- App组件要传递数据给Child组件 该如何处理 这种情况我们需要层层传递
<!--
    App - Node - SubNode - Child
-->

- 更好的姿势就是使用Context 它的作用就是 跨组件传递数据(比如： 主题 语言等数据)
- 有了Context我们就可以从App组件直接传递给Child组件

- 这两个组件都是用在了 html结构中 provider包裹最外层的div consumer调用在想用数据的位置

> 使用步骤
- 1 调用 React.createContext() 创建 Provider(提供数据) 和 Consumer(消费数据) 两个组件
  - const { Provider, Consumer } = React.createContext()
  - 这两个组件一个是提供数据的(数据的发出方) 一个是使用数据的(数据的接收方)

- 2 使用 Provider 组件作为父节点 
- 一般情况下 我们会使用 Provider 包裹整个 app html部分
<!--
    render() {
        return (
            <Provider value={data}>
                <div className="app">
                    <Node />
                </div>
            </Provider>
        )
    }  
-->

- 3 在 Provider 组件标签中通过 value="数据" 
- <Provider value={data}> 必须是value provider是提供数据 就是通过value标签属性来传递

- 4 调用 Consumer 组件接收数据
- 在 Consumer 组件中 通过回调函数的参数 就能得到数据
<!--
    下面返回了 jsx 结构 
    <Consumer>
        { data => <span> data参数表示接收到的数据-- {data} } </span>
    </Consumer>
-->

> 完整代码
<!--
    class App extends Component {
        render() {
            return (
                <Provider value={data}>
                    <div className="app">
                        <Child />
                    </div>
                </Provider>
            )
        }
    }
    
    class Child extends Component {
        render() {
            return (
                <div className="child">
                    <Consumer>
                        {
                            data => {
                                return (
                                    <span>{data}</span>
                                )
                            }
                        }
                    </Consumer>
                </div>
            )
        }
    }
    
    export default App
-->

----------------------------

### 扩展的知识体系 -- PureComponent
- 这节我们讲一下组件的优化

- 我们先说下案例
- 我们定义了父子组件，父组件中有state，我们将state中的数据(carName)传递给了子组件 在子组件中做了展示

- 那我点击父组件中的点我换车 更改了父组件中的state中的数据 我们传递给子组件中的数据变还是不变？ 

- 会
<!-- 
  我们点击按钮后 触发了更新父组件的状态 父组件中的状态只要一更新，父组件就会帮我们调render

  一调render 我们使用props给子组件传递的数据就会重新传递 所以子组件中的信息也会更新
 -->

- 但我们思考一个问题 假如我们的页面是这样的 父子组件吧 我们现在并没有向子组件传递数据 只是调用了子组件，当我更新父组件的状态的时候 父组件肯定调用render，但是子组件也会重新渲染（不太合理 因为子组件并没有用父组件中的数据）
<!-- 
  <Parent>
    <Child />
  </Parent>
 -->

- 虽然不合理但也能说的通 因为我们父组件毕竟调用render了，父组件中的子组件也肯定会随之被解析

- 综上


> Component的2个问题 
- 1. 只要执行setState(),即使不改变状态数据, 组件也会重新render() ==> 效率低

- 2. 只当前组件重新render(), 就会自动重新render子组件，纵使子组件没有用到父组件的任何数据 ==> 效率低
<!-- 
  这么说的前提最好是，当子组件没有使用父组件的任何数据的时候
 -->


> 效率高的做法
- 只有当组件的state或props数据发生改变时才重新render()

> 原因
- Component中的shouldComponentUpdate()总是返回true


> 我们利用 阀门 来达到这一点
- 根本原因在于 假如我们没有更新state中的数据 那么就没必要render是么
- 而shouldComponentUpdate生命周期函数就是这样的一个功能
- return true 更新
- return false 不更新

- 那我是不是只需要判断 现在state中的数据 和 要更新成的数据 是否相等 如果相等说明 没必要更新是么？

- 我们看下生命周期的顺序 shouldComponentUpdate 在render的前面
<!-- 
    setState()
    shouldComponentUpdate()  
    componentWillUpdate()
    render()
    componentDidUpdate()
 -->


- 我们尝试解决一下上面说的两个问题
- 1. this.setState({}) 我们这样操作后不要调render了
<!-- 
  因为state中的数据 并没有更改
 -->


> shouldComponentUpdate(nextProps, nextState)
- 参数:
  - nextProps 即将要变成的目标props
  - nextState 即将要变成的目标state
  - 注意它们是目标还没有更新呢

- 是一个控制组件更新的阀门 如果这个函数不做特殊的处理永远返回true 默认的返回值
<!-- 
  shouldComponentUpdate(nextProps, nextState) {

    if(this.state.carName === nextState.carName) {
      return false
    } else {
      return true
    }
     
  }

  // 子组件中 也应该进行判断
  shouldComponentUpdate(nextProps, nextState) {
    
    // 因为是子组件 我们看的是props
    if(this.props.carName === nextProps.carName) {
      return false
    } else {
      return true
    }

    // 简写
    return !this.props.carName === nextProps.carName
      如果相等返回false
  }
 -->

- 上面判断的是一个属性 但state或者props中的属性特别多的时候怎么处理呢？

- 一个个写么？


> PureComponent
- 在实际开发中 我们会使用 PureComponent
- 它能帮我们重写阀门里面的对比逻辑 自己会判断现在的props和state和即将要改成的props和state是否一样 一样就不render

- 我们在创建类式组件的时候都是写的什么？
import React, {Component} from 'react'
export default class Parent extends Component { }

- 现在改成
import React, {PureComponent} from 'react'
export default class Parent extends PureComponent { }


> PureComponent中的一点点问题
- 假如我们这么修改的state
<!-- 
  // 正常我们这么改state
  this.setState({carName: '马巴赫'})
        页面是可以render的 因为state前后两次结果不一样

  // 假如我们这么改
  const obj = this.state
  obj.carName = '马巴赫'
  this.setState(obj)
        页面却没有render


  原因正常的方式 我们传递的是一个新的对象
  下面的方式我们传递的是同一个对象 地址值一样 我们在原对象上做了修改
 -->

- PureComponent在底层做了一个前对比 它没有看对象里面的东西变没变 它只看的是地址值 如果对象没有发生变化 shouldComponentUpdate 都是返回false

----------------------------

### 扩展的知识体系 -- renderProps 动态渲染组件 react中的插槽技术
- 这就是Vue里面的插槽

- 该方法对于展示组件特别的灵活 父组件可以动态的决定子组件中显示什么，父组件传递什么组件，子组件中就会展示什么组件
<!-- 
  该方法区别于以前固定的调用组件的模式，我调用哪个只能展示哪个组件
 -->

- 我们使用
  this.props.render(数据，用到再写)
在子组件占一个组件的显示位置

- 父组件使用
  <子组件 render={(数据) => <任意组件 数据={数据} />}/>
这种形式传递要显示的组件
<!-- 
  <A render={(name) => <B name={name}/>}/>

  我们给A组件传递的是一个renderProps render是标签里的一个特殊的属性 并不是渲染页面的render函数 

  标签属性 render 返回值是一个函数
 -->

- 总结：this.props.render()预留位置， <父组件 render={传递组件}>




- 解析：
- 我们以前在写组件标签的时候 很多情况下都是使用的自闭合 <A />
- 其实组件标签还可以这么写 有 开始标签 和 结束标签 <A></A>

- 既然可以这么写组件标签 <A></A> 那组件标签就可以有标签体内容
  <A>hello</A>

- 但是页面上 并不会展示hello，不会像<h3>我是A组件</h3> 普通标签那样展示标签体内容

- 组件标签的标签体内容是父组件传递给子组件的属性，可以在子组件的props中接收

  
> 标签体内容是一个特殊的标签属性 属性名是children 值是标签体内容

  children: 标签体内容
  this.props：{children: "hello"}


- 思考：
- 那我们再思考一下这个问题 下面这么写B组件会展示到页面上么？
  <A> <B /> </A>

- 不会，正常的HTML标签 <h3> 标签体内部会被解析到页面上，但是组件标签的标签体内容(父组件传递的)会在组件内部的props的children属性里

- 那么我们调用子组件是不是就有了两种方式
- 父组件：
  <div>
    <h3>我是父组件组件</h3>
    <A> <B /> </A>
        --- 我向A组件里面传递了B组件
  </div>

- 1. 那么A组件展示B组件的方式一
  <div>
    <h3>我是A组件</h3>
    <B/>
        --- 直接调用B组件
  </div>

- 2. 
  <div>
    <h3>我是A组件</h3>
    {this.props.children}
        --- 因为B组件是父组件通过标签体传递过来的 A组件就能在chlidren里面接收到
  </div>

> 组件之间形成父子关系的两种方式
> 方式1：
- A组件内部调用B组件
<!-- 
  <div>
    <h3>我是A组件</h3>
    <B/>
  </div>
 -->

**A-B组件之间数据传递：方式1可以直接使用props在B组件的标签属性里面传递数据**


> 方式2-1：
- 第一种写法
- 1. 父组件通过A组件的标签体内容 将B组件传递给A组件的标签体
  <A> <B /> </A>

- 2. A组件在props接收到children，通过调用{this.props.children}来调用B组件
<!-- 
  <div>
    <h3>我是A组件</h3>
    {this.props.children}
  </div>
 -->

- 总结：
- 上面的是通过 标签体 和 props传递 值在children里面

**A-B组件之间数据传递：没办法通过props形式传递数据 因为A组件内看不到<B />**


> 方式2-2：
- 还有另外一种写法：
- 1. 父组件中调用A组件，但使用自闭合标签
  <Parent>
    <A />
  </Parent>

- 2. 在A组件标签中 内部传递render属性 值是一个回调 回调内部返回B组件
<!-- 
  <div>
    <h3>我是parent组件</h3>
    <hr/>
    <A render={() => <B />}/>
  </div>
 -->

- 3. 父组件这么传递的那么A组件在props中就能收到render render是一个函数，所以
<!-- 
  <div>
    <h3>我是A组件</h3>
    {this.props.render()}
        --- 我们要写render() 拿的是返回值
  </div>
 -->

**A-B组件之间数据传递：**
上述方式组织成的父子关系 可以通过函数传参的方式 在组件之间传递参数
1. 在步骤3中(A组件中)将数据传递给render(数据)的实参
<!-- 
  {this.props.render(name)}
 -->

2. 在步骤1中(AB组件的父组件)的render回调中定义形参接收实参 并用props的形式传递给B组件
<A render={(name) => <B name={name}/>}/>


> 总结：
- Vue中：使用slot技术 也就是通过组件标签体传入结构 <A> <B /> </A>
- React中：
  - 使用children props： 通过组件标签体传入结构
  - 使用render props：通过组件标签属性传入结构，一般用render属性

> children props
- React中展示固定的数据 使用children props就可以
<!-- 
  <A>
    <B> xxxx </B>
  </A>

  this.props.children
 -->

- 如果展示组件和子组件之间要传递数据 就要使用 render props
<!-- 
  父组件：
    <A render={(data) => <C data={data}/>> </A>

  子组件
    {this.props.render(data)}

  要被展示的组件：
    this.props.data   
      这个数据是 子组件传递给父组件 父组件传递给展示组件
 -->

----------------------------

- npm run build 打包命令

----------------------------

### 扩展的知识体系 -- 错误边界 Error boundary
- 我们在写前台代码的时候经常会有这种情况根据后端返回来的数据，遍历生成对应的结构

- 但这一切都建立在 后台返回的数据类型是和前台的代码匹配的 比如users是一个数组 我们对users.map来遍历，但如果后端给你返回的users里是字符串 你怎么办？页面崩掉 整个页面都是报错信息

- 我们在做项目的时候肯定会有很多问题 有一些问题很可能出现在与后台对接的时候，但是我们展示页面的时候不能后代显示的数据不正常 我直接给用户看的是报错的页面吧 比如服务器崩溃了 后台对接数据出错了 undefined引起的报错等等

> 错误边界
- 我们不可能对所有的情况都做预先的判断 所以我们要选择错误边界
- 比如 现在 A组件里有B组件，B组件出错了 但是我让A组件渲染出来 同时B组件的位置 出现一句话 网络繁忙请稍后重试

- 所谓的错误边界就是不要因为一个子组件的错误，影响整个页面都出不来 为什么要做错误边界呢？ 我把这个错误控制在一定的范围之内 比如 
<!-- 
  <A>
    // 需要做逻辑处理的是B组件 我们找到容易出错的C组件的父组件
    <B>
      <C></C>     C组件出错 就限制在c组件 不要让错误影响到AB组件
    </B>
  </A>
 -->


> 错误边界的使用
- 我们需要在父组件中做一些处理 而不是出错的子组件里面
- 或者说 在容易发生错误的组件的父组件里面 做一些逻辑 ***


> 注意：
- 错误边界只适用于生产环境 不适合开发环境，开发环境中能看到一下效果，麻烦还得告诉我们报错

- 我们的项目经过一个build打包 错误边界就生效了


> 错误边界的使用：
- 逻辑：
- 1. 当子组件发生错误后，会调用父组件的getDerivedStateFromError生命周期函数

- 2. 父组件中
  2.1 初始化state state = {hasError:''}
  2.2 当getDerivedStateFromError被调用的时候 return state对象
      return {hasError:err}
- 这样就相当于通过getDerivedStateFromError修改了state对象 页面就会重新render

- 3. 结构中 根据 state里的 hasError 做判断
<!-- 
  // 如果有问题展示 提示语句或404页面 如果没有问题展示组件
  {this.state.hasError ? <h2>网络错误请稍后重试</h2> : <Child />}
 -->
      

> static getDerivedStateFromError(err) {}
- 如果该组件(父组件)的子组件出现了任何的报错 都会调用这个钩子函数
- 而且调用的时候它会把错误传递进来
- 该方法前要使用static 关键字
- 该方法必须要return 一个状态对象
<!-- 
  static getDerivedStateFromError(err) {
    
    // 我们要先初始化状态对象 如果子组件有错误就会给state对象传递err 然后出发页面更新
    return {hasError:err}
  }
 -->


> componentDidCatch(err) {}
- 如果组件在渲染的过程当中由于子组件出现了问题 引发了一些错误 就会调用下面的函数
- 我们一般在这个回调里面 统计错误的次数 反馈给服务器用于通知编码人员进行bug的解决
<!-- 
  componentDidCatch(err) {
    console.log('子组件出错了')
    console.log(err)
  }
 -->

- 两个生命周期函数配合使用一个告诉前台用户 一个通知后台人员 和 编码人员


> 总结：
- 1. 只能捕获后代组件生命周期产生的错误，不能捕获自己组件产生的错误和其他组件在合成事件、定时器中产生的错误

- 2. 只能是生命周期函数(render函数也是生命周期)函数
- 3. 只能捕获后台组件的错误 不能是自己

----------------------------

### 组件之间的通信方式 总结

> 组件之间的关系
- 1. 父子组件
- 2. 兄弟组件（也叫做：非嵌套组件）
- 3. 祖孙组件（也叫做：跨级组件）

> 我们学过的通信方式
- 1.props：
  - children props
  - render props

- 2.消息订阅-发布：
  pubs-sub

- 3.集中式管理：
  redux

- 4.conText:
  生产者-消费者模式


> 搭配方式
- 父子组件：props

- 兄弟组件：消息订阅-发布、集中式管理

- 祖孙组件(跨级组件)：消息订阅-发布、集中式管理、conText(开发用的少，封装插件用的多)

----------------------------

### React 移动端的适配
- rem适配方案
<!-- 
  function adapter() {
    const dip = document.documentElement.clientWidth
    const rootFontSize = dip / 10
    document.documentElement.style.fontSize = rootFontSize + 'px'
  }
  adapter()
  window.onresize = adapter
 -->

> 引入js文件
- 一般在成型的项目中 有一个utils文件夹 或者 tools文件夹
<!-- 
  | - src
    | - utils
      - rem.js    // 我们将上面的函数 放进去
 -->

- 这个js文件无需暴露 让它参与一次运行就可以 我们随便在一个js文件中引入 我们可以在index.js引入
<!-- 
  import './utils/rem'
  一引入就会执行
 -->

> 安装：
- npm i postcss-px2rem react-app-rewired customize-cra
- postcss-px2rem 能将px转成rem 但是有前提它要知道设计稿有多宽


> 根目录下建立 config-overrides.js 内容如下
- 
<!-- 
  const {override, addPostcssPlugins} = require('customize-cra')
  module.exports = override(
    // 此处是375是设计稿宽度
    addPostcssPlugins([require('postcss-px2rem')({remUnit:375/10})])
  )
 -->

> 修改 package.json 启动命令
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",

<!-- 
  // 配置具体的修改规则
  const { override, fixBabelImports, addLessLoader, addPostcssPlugins } = require('customize-cra')

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true,        // 更改主题
      // style: 'css',    // 按需引入
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        // modifyVars: { '@primary-color': 'red' }
      }
    }),

    // 375是设计稿
    addPostcssPlugins([require('postcss-px2rem')({remUnit:375/10})])
  );
 -->

----------------------------

### 好客租房 案例


----------------------------

### 移动端案例
- 我们做一个登陆的小案例
- 输入手机号
- 输入验证码
- 验证码有倒计时
- 拿着手机号 验证码给后台
- 登录
- 登录后会往个人中心跳

- 这个案例中有两个组件 Login 和 User


> 案例第一步 重置样式 和 搭建路由
- 重置样式：
- 我们在这个网站上复制的css
- https://github.com/jgthms/minireset.css
<!-- 
  /*! minireset.css v0.0.6 | MIT License | github.com/jgthms/minireset.css */
  html, body, p, ol, ul, li, dl, dt, dd, blockquote, figure,
  fieldset, legend, textarea, pre, iframe, hr, h1, h2, h3,
  h4, h5, h6 {
    margin: 0;
    padding: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
    font-weight: normal;
  }

  ul {
    list-style: none;
  }

  button,
  input,
  select {
    margin: 0;
  }

  html {
    box-sizing: border-box;
  }

  *, *::before, *::after {
    box-sizing: inherit;
  }

  img,
  video {
    height: auto;
    max-width: 100%;
  }

  iframe {
    border: 0;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  td, th {
    padding: 0;
  }
 -->

- 上面的样式是公共样式我们可以放在public文件夹里面 创建reset.css文件不能用less 因为该文件是直接引入到index.html里面的
<!-- 
  <link rel="stylesheet" href="%PUBLIC_URL%/css/reset.css">
 -->

> 搭建路由
- 1. index.js入口文件中
<!-- 
  import {BrowserRouter} from 'react-router-dom'
  <BrowserRouter> <App /> </BrowserRouter>
 -->

- 2. App.jsx中进行路由的匹配你什么路径我给你展示什么样的组件
- 这就是不需要导航区的项目 只要符合要求自然而然的让你看
<!-- 
  import {Switch, Route} from 'react-router-dom'

  <Switch>
    <Route path='/login' component={Login} />
    <Route path='/user' component={User} />
  </Switch>

  这里我以为Route组件必须和Link组件搭配使用呢 老师的动作是在地址栏输入网址对应跳到这个组件 就是没有做首页的展示 用输入网址的形式做跳转
 -->

- 在真实的项目开发中并不会直接在App组件里面写N条<Route>而是会创建一个js文件专门统一的管理路由配置
<!-- 
  | - src
    | - config      该文件夹里都是配置的文件 比如网络请求 路由配置等
      - routes.js

  // 该文件专门用于统一管理路由
  import Login from '../pages/Login'
  import User from '../pages/User'

  const routes = [
    // 这里是一个个的路由配置对象 每一个路由都有两个信息 path 和 component
    {
      path: '/login',
      component: Login
    },
    {
      path: '/user',
      component: User
    }
  ]
  export default routes
 -->

- 然后App组件中 引入routes文件 然后遍历routes中导出的路由配置对象routes
<!-- 
  import routes from './config/routes'

  <Switch>
    {
      routes.map((item, index) => {
        return (
          <Route key={index} path={item.path} component={item.component} />

          <Route key={index} {...item} />
        )
      })
    }

    // 没有路由匹配的时候自动往 login 页面跳转
    <Redirect to='/login'></Redirect>
  </Switch>
 -->


> 案例第二步 怼页面
- 我们使用antd-mobile来开发移动端的页面
- 用到哪个说说哪个

> <NavBar> 组件
- mode：
    dark light 颜色模式 深(主题颜色) 浅

- icon={<Icon type="left" />}
    导航图标

<!-- 
  <NavBar
    mode="light"
    icon={<Icon type="left" />}
    onLeftClick={() => console.log('onLeftClick')}
    rightContent={[
      <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
      <Icon key="1" type="ellipsis" />,
    ]}
  >NavBar</NavBar>
 -->


> 文本框 <InputItem>
- {...getFieldProps('autofocus')} 最早是出现在antd里面的 用于获取当前的input里面的值 我们可以使用ref 或者 受控组件的形式

- clear 加了这个属性 文本框有快速清空的功能
<!-- 
  <InputItem
    {...getFieldProps('autofocus')}
    clear
    placeholder="auto focus"
    ref={el => this.autoFocusInst = el}
  >标题</InputItem>
 -->


> antd 中的felx
- 案例中我们想让获取验证码和 input在一行 我们可以拿个div给他们包裹起来开启flex


> antd的默认颜色
- 我们要是想重置框架里面的css默认颜色的话 我们可以创建一个公共的css样式 public --- index.css 
<!-- 
  我们在这里对整个项目的颜色进行重置，比如antd的body色是淡淡的灰 我们要白色
  body, html {
    background:white !important;
  }
 -->

- 然后在index.html文件中 引入css样式 %%这样引入


> antd里面的弹窗样式
- 轻提示



> antd使用了 componentWillReceiveProps 即将废弃的API
- 这个解决不了 antd-mobile还没来得及修正
- 引入 Toast 组件
- Toast.fail('Load failed !!!', 1, true);  相当于 alert 第几个参数是几秒消失
<!-- 
  if(!tel) return Toast.fail('请输入合法的手机号', 3)
  if(!code) return Toast.fail('请输入合法的验证码', 3)
 -->
- 还有 放置触摸穿透 mask 参数 true 防止


> onTouchEnd
- 移动端的点击事件


> 该案例做成受控组件
- 我们想给input框绑定onChange事件 这样可以通过e.target拿到输入的值，但是由于该input框是antd的组件
  - 对于原生的input框：onChange指定的回调 我们是通过 e.target.value 取值
  - 对于组件的input框：onChange指定的回调 能够直接的拿到输入的值
<!-- 
  state = {
    tel:'',
    code:''
  }

  savaData = (type) => {
    return (value) => {
      this.setState({[type]:value})
    }
  }

  这样用户输入的值能够实时的到state中
 -->


> 输入校验
- 1. 可以进行实时校验(一般是PC端)
- 2. 可以进行失去焦点校验，当手机的输入框失去焦点的时候我们再校验
- 3. 可以进行统一校验，当点击登录的时候
    
- 我们做成受控组件的时候 合法的数据我们再收集到state中 不合法的不收集

- 既然我们要做正则的校验 那肯定要写很多的正则表达式，我们会在 config 文件夹里面创建 reg.js 用于放正则的常量
<!-- 
  | - config
    - reg.js

  export const codeReg = /^\d{6}$/


  savaData = (type) => {
    return (value) => {
      if(type === 'tel' && telReg.test(value)) {
        this.setState({[type]:value})
      } 
      else if(type === 'code' && codeReg.test(value)) {
        this.setState({[type]:value})
      } 
      else {
        this.setState({[type]:''})
      }
    }
  }

  还可以这么写
  if(type === 'tel' && !telReg.test(value)) value = ''
  else if(type === 'code' && !codeReg.test(value))  value = ''
  else {
    this.setState({[type]:value})
  }

  type是tel 且校验未通过 值为空
 -->


> 登录逻辑
- 我们点击登录按钮的时候同样也要校验数据是否正确 上面的校验只是针对能否保存到state中
- 但是在登录的校验里我们只需要判断value是否为空就可以 因为存到state中的数据一定是合法的

- 这里 用户输入的值有两种情况 1 value为空undefined 2手机号不合法 在移动端里面我们遵从一次性的提示文字
- 我们可以提示 请输入合法的手机号
<!-- 
  const {tel, code} = this.state;

    // 完善前： 属于多次提示 用户每输错一个 改一个 下面错的话还提示 发送请求前的验证
    // if(!tel) return Toast.fail('请输入合法的手机号', 2)
    // if(!code) return Toast.fail('请输入合法的验证码', 2)

    // 完善下：统一提示 不然多次提示 用户体验不好
    // 这个this是实例对象 我们在实例对象身上维护两个变量 默认没有错误
    this.telErr = false
    this.codeErr = false

    // 当不对的时候 将我们维护的变量修改为 true
    if(!tel) this.telErr = true
    if(!code) this.codeErr = false

    // 利用三元 动态 拼接 错误提示信息
    let errMsg = '请输入合法的'
    errMsg += this.telErr ? '手机号' : '' 
    errMsg += this.codeErr ? '验证码' : '' 

    if(this.telErr || this.codeErr) Toast.fail(errMsg, 2)

 -->

- 这个逻辑中我们使用了统一提示的方式
- 出现错误了我们不提示 我们只是把标识错误的变量设置为true 到底有什么错误我们拼接出来 统一判断 统一提示


> 获取验证码
- 在真实开发中如果有详细的文档说明 会有点完验证码之后多久能再点

- 这个部分需要完成的逻辑如下
- 点击验证码之前要判断 手机号是否合法
- 点击验证码要禁止按钮的再次点击 并显示禁止的状态
- 点击验证码要有倒计时提示

- 解析：
- 倒计时的提示：
- 页面想要不断更新 显示倒计时 说明 state中的数据一直在变化 所以驱动着页面的更新所以我们要初始化一个time的变量
-开启定时器 取state中的值重新赋值回去
<!-- 
  state = {
    tel:'',
    code:'',
    time: 10
  }
 -->

- 按钮的点击：
- 什么时候能点 什么时候不能点 我们也要在state中初始化一个变量 canClick
- 这个变量可以标识按钮是否能点 还能根据这个变量做样式 和 倒计时数字是否展示

- 一旦触发点击回调首先要将canClick的值改为false 定时器关闭的时候再重置回来


- 下面还包括了样式的展示 和 文字是否展示的功能都是根据canClick变量来的
- 这种方式很常见
<!-- 
  state = {
    tel:'',
    code:'',
    time: 10,
    canClick: true  // 标识按钮能否点击
  }

  // 验证码的逻辑
  getCode = () => {
    const {canClick, tel} = this.state

    // 如果不能点 停掉逻辑 第一次肯定能进来的因为是true
    if(!canClick) {
      return
    }

    // 如果手机号为空 或者没输入 或者输入不对
    if(!tel) {
      Toast.fail('请输入合法的手机号', 2)
      return
    }

    // 让按钮不可点击
    this.setState({canClick: false})

    // 开启定时器 更新事件
    this.timer = setInterval(() => {

      // 获取原来的时间 -1 赋值回去
      this.setState((state) => ({time: state.time-1}))

      // 如果时间小于0 清除定时器 让按钮能再次点击 在定时器里每次需要拿最新的时间
      if(this.state.time <= 0) {
        clearInterval(this.timer)

        // 时间还要归位
        this.setState({canClick: true, time: 10})
      }
    }, 1000)
    console.log('发送请求')
  }

  // 解决样式问题
  <button 
    className={this.state.canClick ? 'code-btn' : 'code-btn disable'} 
  >获取验证码
  </button>
 -->

**disabled**
- 可以从视觉效果上呈现不能点击的状态 同时让onclick事件不起作用
- 但是disabled 不能禁止 ontouchend 事件
- pc端的都行 但是移动端不行
- 移动端的解决方法：
- pointer-events: none
  - 让任何一个元素失去事件

- 在事件的回调中 根据变量 做判断 如果变量为false 则return


> 登录发送请求
- 我们拿到验证码 手机号开始发送请求 给谁发 用什么方式 带什么参数都会在接口文档里面

- 完整的验证码发送过程：
- 比如我们做的教育系统
- 教育系统服务器  

- 短信服务商：
- 在联通 移动批量买短信接口 帮我们发短信的人
- 比如容联云通讯

- 短信运营商：
- 移动 电信 联通 只有他们才能往外发短信
<!-- 
  我们的过程是

     教育系统服务器
  （程序员开发得东西）

        教育系统web页面

                    短信服务商

                                    短信运营商

  短信服务商在 短信运营商 花钱买了些接口(授权 然后它们就能调用联通机房的机器发短信) 短信服务商再加工润色下再将服务卖给教育系统

  短信服务商 没有验证码服务 都卖给 短信服务商了


  教育系统web页面 的页面上有一个按钮 获取验证码 在用户点击了获取验证码后

  教育系统web页面 就会给 教育系统服务器 发送请求 告诉服务器有人想要验证码
  教育系统服务器就拿到了 手机号
  然后
  教育系统服务器会生成 验证码 验证码是服务器生成的

  教育系统服务器会生成验证码后找到短信服务商 然后给短信服务商提供 手机号 和 验证码 短信服务商 拿着手机号 验证码 去找联通 让他们发
 -->


> 获取验证码 发送请求的逻辑
- 






### 扩展
- react中的 <a>标签必须使用href 不写就会有警告 href的属性不能是javascript:; 和 #， 因为react底层有eslint 它进行了语法检查

- 我们可以这样让eslint不检查下一行代码 eslint会找以eslint开头的然后执行注释里面的规则
<!-- 
  {/* eslint-disable-next-line */}
  <a href="javascript:;">获取验证码</a>
 -->

- 在vue react中能不用<a>就不要用它 我们可以用button也能实现同样的效果

> 技巧
- 在真实开发中只要是涉及验证码类的操作一会能点一会不能点 倒计时能点 设计两个变量特别的好time canClick

----------------------------

### postman 测试接口
- 在真实开发中 我们在发送请求之前都会测试接口 也叫做 接口联调
- 我们要确保接口是可用的
- 开发当中一定会用到的

- postman不仅仅可以测试http请求 tcp也能测试 udp也能测试

- 请求方式：
- get     查
- post    增
- put     改
- delete  删

- 服务器返回的数据不是那么简单 我要一个人 就给我一个人的信息
- 它会给我数据的同时带点其它的东西 比如
<!-- 
  {
    'code': 20001
    'data': {}
    'message': '手机号为空 验证码下发失败'
    ‘success’: false
  }

  code是服务器跟程序员约定好的东西 20001 是错误
 -->

- 使用方式：
- 1. 点击 + 
- 2. 选择请求方式 和 输入请求地址 点击 send 发送


- 发送参数
- 选择 params 选项卡 发送的query参数 ?name=sam
- params格式的参数 直接在url后面拼接 com/tom/12
- 选择 body 选项卡 是携带请求体参数
- body选项卡下面是请求体参数的编码形式
- none form-data x-www-urlencoded raw binay graphQL
- 当我们想携带 请求体参数 的时候 选择 x-www-urlencoded

<!-- 
  axios携带query参数
  axios({
    method:'post',

    // 携带params参数在url上写
    url:'xxx/sam'

    // query参数
    params: {
      name: 'sam'
    }
  })

  axios携带params参数要在url上拼接 com/tom/12
 -->

- 当我们这个接口测试通过了 我们主要测接口 和 携带什么类型的参数过去 服务器能返回结果 测试通过后可以保存这个项目 创建一个集合 保存到这里

----------------------------

### 请求相关

> 请求方式：
- HTTP有8大请求 但常用的是4个 分别对应的 查 增 改 删：
- GET POST PUT DELETE


> 请求参数：
- 常用的有三种：
- query：
  查询字符串参数

- params：
  参数

- body：
  请求体参数

- 假如URL接口已经确定 我们需要决定的就是用什么方式发请求 携带哪种类型的参数
- 从理论上来讲 请求方式和请求参数的类型可以混搭

> axios发送请求 携带参数
- query参数：
  - 在params属性中写
  - params: {name:'sam', age:18}

- params参数
  - 在url后面拼接，完全在url体现
  - url/sam/18
  - 后端接口要对应的顺序接收 /url/:name/:age

- body参数
  - 在data属性中写
  - data:{name:'sam'}


\\ axios get请求 携带各种参数的示例
- GET请求不能携带请求体参数 它没请求体
<!-- 
  // axios发送get请求 不携带参数
  axios({
    url:'localhost:8080/test1',
    method: 'GET',
  }).then(res => {console.log(res.data)})

      // axios发送的请求拿回的结果在res.data上

-----

  // axios发送get请求 携带query参数
  axios({
    url:'localhost:8080/test1',
    method: 'GET',

    // query参数, 此处写的params但是携带的参数类型叫做query
    params: {name:'sam', age:18}

  }).then(res => {console.log(res.data)})



  // 简写get请求带参数的形式
  axios.get('url', {params: {name:sam}})

-----

  // axios发送get请求 携带params参数 
  axios({

    // params要在url的后面/ / 的形式拼接
    url:'localhost:8080/test1/老刘/女/18',
    method: 'GET',

  }).then(res => {console.log(res.data)})
 -->


\\ axios post请求 携带各种参数的示例
- post请求可以携带 query 和 params参数
- post请求不支持简写形式携带query参数

- post请求最为推荐使用的的参数类型： 请求体参数
- post请求发送body参数 使用data属性，简写形式第二个参数位置传递{name:'sam'}

- axios发送post请求 使用body参数 默认的编码类型是 json
- 也就是说我们的data里面写的数据 会被编译为json对象

<!-- 
  // axios发送post请求 携带query参数
  axios({
    url:'localhost:8080/test1',
    method: 'POST',

    // query参数, 此处写的params但是携带的参数类型叫做query
    params: {name:'sam', age:18}

  }).then(res => {console.log(res.data)})

-----

  // axios发送post请求 携带params参数 
  axios({

    // params要在url的后面/ / 的形式拼接
    url:'localhost:8080/test1/老刘/女/18',
    method: 'POST',

  }).then(res => {console.log(res.data)})

-----

  // axios发送post请求 携带body参数 
  axios({

    url:'localhost:8080/test1',
    method: 'POST',

    // body参数使用data属性 
        - data的值如果是对象，请求体参数自动使用json编码
    data: { name: 'sam', age: 18 }
        - data的值如果是字符串，请求体参数自动使用urlencoded编码
    data: 'name=sam&age=18'

  }).then(res => {console.log(res.data)})
 -->

**请求体参数的两个编码格式：**
- 1. json
- 2. urlencoded

- query参数 和 params参数 这两种类型的参数都是体现在url上的 都是经过url上的编码（跟乱码似的 为了更好的兼容性 转为一种特殊的编码）

- 使用post发送的body参数
  - data的值如果是对象，请求体参数自动使用json编码
  - data的值如果是字符串，请求体参数自动使用urlencoded编码


> 总结
- 形如下面格式的参数叫做 urlencoded 参数：
- com?name=sam&age=18 

- 从理论上讲 一次请求的参数 可以通过3种形式携带 但一般不这么做
  - 有请求体的请求（post put delete） 一般使用 body参数形式

----------------------------

### React中使用Mock
- npm install mockjs
- import Mock from 'mockjs'

----------------------------


### Antd相关

### Antd的基本使用
- react周边有很多成型的组件库（样式）开箱即用
- react流行的开源的UI组件库

- 1. material-ui  国外
  - 官网：    http://www.material-ui.com/#/
  - github:  https://github.com/callemall/material-ui

- 2. ant-design   蚂蚁金服
  - 官网：    https://ant.design/index-cn
  - github:   https://github.com/ant-desing/ant-design

> 安装 antd UI组件库
- npm i antd

> import { 要使用的组件 } from 'antd';
> import 'antd/dist/antd.css'
- 把要使用的组件从 antd 中导入
- 再把antd的样式也要导入进来


- antd也有很多的子库，antd把一些其它的设计没有都放在 antd 库中 我们要是想使用子库需要自己重新引入
<!-- 
  比如图标的字库：
    @ant-design/icons
 -->

- 我们要用的东西可以说是都是组件 所以我们要是想要使用的话 都要从库里面导出来使用


> 按钮组件
> import { 要使用的组件 } from 'antd';
> import 'antd/dist/antd.css'
- 把要使用的组件从 antd 中导入
- 再把antd的样式也要导入进来

- 在结构中使用 组件标签 <Button>

<!-- 
  import { Button } from 'antd';
  import 'antd/dist/antd.css'

  <Button type="primary">Primary Button</Button>
 -->

- 网页中每一个组件的右侧的侧边栏里面都有一个叫做 API 的选项卡 里面是介绍都有哪些属性可以设置
<!-- 
  https://ant.design/components/button-cn/#API
 -->


> 字体图标库 @ant-design/icons
- 我们要是想要使用 字体图标库的话 也要先引入字体图标库 然后从里面拿出对应的想要使用的组件
<!-- 
  import {WechatFilled, SearchOutlined} from '@ant-design/icons'

  // 这个是复制网站上的
  <WechatFilled />

  // icon={<SearchOutlined /> 按钮里面的图标
  <Button type="primary" icon={<SearchOutlined />}>
    Search
  </Button>
 -->


> 日期选择器 DatePicker
- 这个日期选择器有一个onchange时间 有两个参数 选择日期的回调函数
- 参数1： 时间对象
- 参数2： 时间字符串

- 其他的看API
<!-- 
  import { Button, DatePicker, Space } from 'antd';

  dateChange = (data, dataString) => {
    console.log('1', data)
    console.log('2', dataString)
  }

  <Space direction="vertical">
    <DatePicker onChange={this.dateChange}/>
  </Space>
 -->

- 那什么项目都能用antd么？ 不能
- 适用于成型的后台的管理系统 不关心界面 只关心功能 前端页面不太适合 但是后台页面在乎的是系统的本身所以选择antd比较合适

- react也可以使用 elementUI
- 移动端的话 vantUI 是给Vue用的组件库

-----

### Antd 栅格系统
- antd的栅格化系统使用的是flex布局

- 使用方式：
- 1. 引入<Row> 和 <Col>栅格组件
- 所有的Col必须放在Row里面, Col使用 span={number} 的形式表达占的份数

- 2. 引入 antd 的css样式
<!-- 
  import { Row, Col } from 'antd';
  import 'antd/dist/antd.css';
 -->


> 区块间隔
- 使用方式：
- 1. 间隔的设置
- <Row gutter={number}> 推荐使用 (16+8n)px 作为栅格间隔。(n 是自然数)
- 8 16 24 32 40 48 56 以8px增加
<!-- 
  <Row gutter={24}>
 -->

- 2. 间隔是对Col中的div起作用的，Col相当于容器，间隔主要是div和div之间的间隔
<!--  
  <Row gutter={24}>
    <Col span={12} className='bg'>
      <div className="gutter-box">hello</div>     1
    </Col>
    <Col span={12} className='bg'>
      <div className="gutter-box">hello</div>     2
    </Col>
  </Row>

  间隔主要体现在div1 和 div2 上
 -->

- 间隔支持响应式：
- <Row gutter={ xs: 8, sm: 16, md: 24, lg: 32 }>

- 垂直之间的间隔：
- <Row gutter=[水平间距, 垂直间距]>
- 也可以写成响应式


> 列偏移
- 使用方式：
- <Col offset={number}> 往右侧偏移几列


> 列排序
- 使用方式：
- <Col push={number}>   往右 会压住其他的列
- <Col pull={number}>   往左 会压住其他的列


> order排序
- 使用方式：
- 一行当中指定的列 通过order可以任意排序
- <Col order={number}>


> 开启flex
- 使用方式：

- 水平方向：
- <Row type='flex' justify='对齐方式'>
- 对Row组件使用 type=‘flex’ 
- justify：start  center  end  space-between  space-around

- 垂直方向：
<Row type="flex" align="对齐方式">
- align：top  middle  bottom


> 响应式布局
- 预设六个响应尺寸：xs sm md lg xl  xxl。
<!-- 
  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
 -->

-----

### Table组件
- 表格的使用，好麻烦啊

- antd库中 导出 Table 组件
- import {Table} from 'antd'
- const { Column } = Table;

- 表格的简单使用
- 准备好 dataSource columns 数据源 在标签属性中使用该属性 指向 数据源
- <Table dataSource={dataSource} columns={columns}/>
    dataSource: 这个步骤就是准备表格中要用的数据 没必要和每一列对上 它多出的就不显示因为没有对应的列
    columns： 主要用于创建几列 是一个对象数组 每一个对象代表一列
    dataIndex： 是表格每一列的内容 这列展示什么内部 要和columns里面的dataIndex对上

<!-- 
  <Table 
    dataSource={dataSource} 
    columns={columns}
    bordered
    pagination={false}
  />
 -->

- 关于列的配置 也可以在 columns数据源中定义
<!-- 
  const columns = [
    { title: 'To', key: 'to', render:() => <Checkbox />, 
      onHeaderCell: () => ({style:{textAlign: 'center', background:'#1890ff', color:'#fff'}}),
      align:'center'
    },
    { title: 'CC', key: 'age', render:() => <Checkbox />, 
      onHeaderCell: () => ({style:{textAlign: 'center', background:'#1890ff', color:'#fff'}}),
      align:'center'
    },
 -->



- 下列所有的属性都可以在下面的配置对象中配置好
<!-- 
  const dataSource = [
  { key: '1', name: '胡彦斌', age: 32, address: '西湖区湖底公园1号'},
  { key: '2', name: '胡彦祖', age: 42, address: '西湖区湖底公园1号'},
];

const columns = [
  { title: '姓名', dataIndex: 'name', key: 'name'},
  { title: '年龄', dataIndex: 'age', key: 'age', },
  { title: '住址', dataIndex: 'address', key: 'address'},
];
 -->


- 表的详细配置
- 上述的是根据数据源自动生成的表格 没办法对每行 每列进行单独的设置
- 使用的表格组件也是<Table /> 标签


- 如果要对表格每行每列进行详细的设置 需要引入 Column 组件
- 写成 <Table> <Column> <Column> </Table>的形式


- 在指定 <Column> 内容的时候 需要使用下面格式
- <Column title='姓名' dataIndex='name' key='name'></Column>
- dataIndex是为了告诉该列 去哪找对应的数据 'name'指向dataSource的name值
- title就是显示在页面的表头 同时也要指定key


> <Table> 组件中的属性
- dataSource：
    指定表格体的内容 格式在上面

- bordered:
    指定表格是否带边框

- loading： true / false
    表格整体会有加载动画

- pagination： true / false
    表格下方会出现分页

- showHeader： true / false
    是否显示表头

- rowClassName：
    表格每一行是这么加类名

- scroll：
    表格是否可滚动，也可以指定滚动区域的宽、高

- onHeaderRow: 表头的属性 值为一个回调
    columns：表头行的每个单元格
    index：是第几行
<!-- 
  onHeaderRow={(columns, index) => {
    return {
      onClick: () => {
        console.log(columns,index);
      }
    };
  }}
 -->

- rowKey='' 
    用来指定每行的key值 直接写dataSource中的属性名即可
    rowKey='_id'


> <Column> 组件中的属性
- align:  left | right | center
    每列内容的对齐方式

- className：
    列样式类名

- colSpan：number
    合并单元格 colSpan='2'

-  width:
    指定列的宽度 width={200}  width='200px'

- render:
    用来生成一片html区域 也可以理解成一个复杂的结构 比如这个结构中可以有 button span等
    
    生成复杂数据的渲染函数，参数分别为当前行的值，当前行数据，行索引，@return 里面可以设置表格行/列合并

    render: (这个参数是当前行的数据 也就是是 dataSource 里面的数据 或者是从后台请求回来的数据) => {}
<!-- 
  function(text, record, index) {}
  当前行的值
  当前行数据  是一个对象
      {key: "1", name: "John Brown", age: 32, address: "New York No. 1 Lake Park", tags: Array(2)}
  行索引

  // columns
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',

    // text就是data中的数据， 该列将数据放在a标签中
    render: text => <a>{text}</a>,
  }

  // data data里都是填在页面上的数据
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  }


  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },


Invite John Brown   Delete
 -->


> 表头的设置
- 在columns中配置 或者列的属性标签里面
- onHeaderCell: {值是一个回调 回调中药return { }}
- onHeaderCell: () => ({style:{textAlign: 'center'}})
<!--  
  onHeaderCell={() => {
  return {
    style: {
      textAlign: 'center',
      background: '#69c0ff'
    }
  }

  {
    title: '取引先名',
    dataIndex: 'company',
    key: 'company',
    onHeaderCell: () => ({style:{textAlign: 'center'}})
  },

  这特么要加在属性标签里面 疯了吧
 -->


> 单元格的设置
- onCell: {值是一个回调 回调中药return { }}
- 回调中的参数 record(行内容), rowIndex(行index)
<!-- 
  const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    onCell: ((record, rowIndex)=>{
      if(rowIndex % 2 === 0){
        return {
            style:{
                backgroundColor: 'red', //此处需注意
            },
        };
      }
    },
    render: text => <a>{text}</a>,
  }
 -->

-----

### Space组件 间距
- 设置组件之间的间距。避免组件紧贴在一起，拉开统一的空间。
- 适合行内元素的水平间距。可以设置各种水平对齐方式。
- 使用方式：
- <Space>其他组件</Space>
- 属性：
- direction： vertical | horizontal
    间距方向
<!-- 
   <Space direction="vertical">
 -->


- size：  'small' | 'middle' | 'large' | number
    间距大小
    size={[8, 16]} wrap(换行)
<!-- 
  <Space size={size}>
 -->


- align：  start | end |center |baseline
    对齐方式

-----

### Form组件
- 表单组件也好难啊
- 首先要从antd中引入
- import { Form, Input, Button, Checkbox } from 'antd';

> <Form>组件
- 我们看下Form组件都有什么样的属性，这里先说下我们html中的form的name通常都是保存用户输入的数据， 也是服务器中的字段名

- 下面的属性在 标签属性中使用 用来配置整个表单的样式

- className:
    用于给form表达添加样式

- name：
    From组件的id

- autoComplete=“off”
    取消自动显示输入历史
<!-- 
  <Form autoComplete = "off">
 -->


- colon：true / false
    用于配置 Form.Item组件 的 colon 的默认值。表示是否显示 label 后面的冒号
    colon={true}


- component:  true / false
    为 false 则不创建 DOM 节点 页面会报错


- initialValues： 值是一个对象{{ }}
    表单内部元素的初始值 
    语法：
      initialValues={{ remember: true, }}
    作用：
    表单内部元素的默认值，只有初始化以及重置时生效，通过表单内部元素的nama来找对对应的元素 并配置默认值
<!-- 
  // 表单内部的一个子元素 name是remember
  <Form.Item name="remember">
    <Checkbox>Remember me</Checkbox>
  </Form.Item>

  // Form组件通过name找到  指定的 Form.Item 组件 并设置它的默认值
  <Form initialValues={{ remember: true, }}>
 -->


- labelAlign：  left | right
    label 标签的文本对齐方式


- labelCol： 值是一个对象 {span: 3, offset: 12}
    同 <Col> 组件 设置 span offset 值 或 sm: {span: 3, offset: 12}
<!-- 
  labelCol={{ span: 8 }}
 -->


- wrapperCol
    用法同 labelCol
    需要为输入控件设置布局样式时，使用该属性


- layout：horizontal | vertical | inline
    表单布局
<!-- 
  const layout = {
    labelCol: {
      span: 4,
    },
    wrapperCol: {
      span: 16,
    },
  };

  <Form {...layout}>
 -->


- scrollToFirstError：
    提交失败自动滚动到第一个错误字段


- validateMessages
    验证提示模板


- validateTrigger
    统一设置字段触发验证的时机


- 表单事件：
  - onFieldsChange： 字段更新时触发回调事件
      function(changedFields, allFields)

  - onFinish： 提交表单且数据验证成功后回调事件
      function(values)

  - onFinishFailed： 提交表单且数据验证失败后回调事件
      function({ values, errorFields, outOfDate })

  - onValuesChange： 字段值更新时触发回调事件
      function(changedValues, allValues)


**注意：**
- Form组件中的按钮必须要指定 htmlType="submit"  要不Form组件身上的onSubmit事件不会触发
<!-- 
  onSubmit={this.handleSubmit}

  <Button 
    type="primary" 
    htmlType="submit" 
    className="login-form-button">
    登录
  </Button>
 -->


> <Form.Item>
- Form表单内部的每一个子项 用于包裹真正的DOM元素比如text checkbox等
<!-- 
  <Form.Item>
    <Input>
  </Form.Item>
 -->

- 如果一个 <Form.Item> 内部控件前后还有一些文案或样式装点 或者一个表单项内有多个控件，你可以使用内嵌的 Form.Item 完成
- noStyle 内部嵌套的 <Form.Item> 里面要添加 noStyle 要不然垂直部分有间距
<!-- 
<Form.Item label="Field">

  // 直接包裹才会绑定表单
  <Form.Item name="field" noStyle>
    <Input />
  </Form.Item> 

  <span>description</span>
</Form.Item>
 -->



- name:
    字段名，支持数组


- valuePropName:
    子节点的值的属性，如 Switch 的是 'checked'。该属性为 getValueProps 的封装，自定义 getValueProps 后会失效
    不知道啥意思


- colon： 
    配合 label 属性使用，表示是否显示 label 后面的冒号
    label属性也是写在<Form.Item label>里面的


- label： label 标签的文本
<!-- 
  <Form.Item
    label="Username"
    name="username"
  >
    <Input />
  </Form.Item>
 -->


- labelAlign：  left | right
    标签文本对齐方式


- labelCol：  {span: 3, offset: 12} 或 sm: {span: 3, offset: 12}
    label 标签布局，同 <Col> 组件，设置 span offset 值


- wrapperCol：
    需要为输入控件设置布局样式时，使用该属性，用法同 labelCol。
    你可以通过 Form 的 wrapperCol 进行统一设置，不会作用于嵌套 Item。当和 Form 同时设置时，以 Item 为准


- rules： 数组
    里面应该是对Form.Item每一个子元素的规则 所以是一组组的对象
    校验规则，设置字段的校验逻辑。

    len: 
      string 类型时为字符串长度；number 类型时为确定数字； array 类型时为数组长度

    min:
    max: 
      必须设置 type：string 类型为字符串最大长度；number 类型时为最大值；array 类型时为数组最大长度

    message:
        错误信息，不设置时会通过模板自动生成

    pattern
        正则表达式匹配

    transform
        将字段值转换成目标值后进行校验

    whitespace
        如果字段仅包含空格则校验不通过，只在 type: 'string' 时生效

    validator
        自定义校验，接收 Promise 作为返回值
        写在rules里面 (rule, value) => Promise
    <!-- 
      rules={[
        {
          validator: this.validateUser
        }
      ]}

      validateUser = (rule, value) => {

        if(value.length >= 6 && value.length<=10) {

            // 返回的必须是promise对象 不传东西代表验证通过
            return Promise.resolve()
        }else{
            return Promise.reject('密码长度必须是6~10位')
        }

      }
     -->


- required：
    必填样式设置。如不设置，则会根据校验规则自动生成
<!-- 
  rules={[
    {
      required: true,
      message: 'Please input your username!',
    },
  ]}
 -->


- validateFirst：   boolean | parallel
    当某一规则校验不通过时，是否停止剩下的规则的校验。   
    设置 parallel 时会并行校验


- validateStatus： string
    校验状态，如不设置，则会根据校验规则自动生成，可选：'success' 'warning' 'error' 'validating'


- validateTrigger
    设置字段校验的时机
    validateTrigger='onBlur / onFocus / onChange'
    还可以写 'onBlur | onFocus'


- dependencies：
    设置依赖字段




**注意：**
> Form.Item组件 设置 name 后 需要注意的地方
- 被设置了 name 属性的 Form.Item 包装的控件，表单控件会自动添加 value onChange（或 trigger 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

  - 1. 你不再需要也不应该用 onChange 来做数据收集同步 但还是可以继续监听 onChange 事件。
  <!-- 
    收集数据应该使用 Form 的 onValuesChange 事件
   -->

  - 2. 你不能用控件的 value 或 defaultValue 等属性来设置表单域的值，默认值可以用 Form 里的 initialValues 来设置。
  <!-- 
    注意 initialValues 不能被 setState 动态更新 
    需要用 setFieldsValue 来更新
  -->

  - 3. 你不应该用 setState，可以使用 form.setFieldsValue 来动态改变表单值。


> dependencies 
- 当字段间存在依赖关系时使用
- 如果一个字段设置了 dependencies 属性。那么它所依赖的字段更新时，该字段将自动触发更新与校验。

- 应用场景
- 注册用户表单的“密码”与“确认密码”字段。“确认密码”校验依赖于“密码”字段，设置 dependencies 后，“密码”字段更新会重新触发“校验密码”的校验逻辑。

- 注意事项
- dependencies 不应和 shouldUpdate 一起使用，因为这可能带来更新逻辑的混乱。


> shouldUpdate
- 当 shouldUpdate 为 true 时，Form 的任意变化都会使该 Form.Item 重新渲染。
<!-- 
  <Form.Item shouldUpdate>
 -->

- 当 shouldUpdate 为方法时，表单的每次数值更新都会调用该方法，提供原先的值与当前的值以供你比较是否需要更新。
<!-- 
  <Form.Item shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}>
    {() => {
      return (
        <Form.Item name="other">
          <Input />
        </Form.Item>
      );
    }}
  </Form.Item>
 -->


> <Input>组件
- input输入框类
- import { Input } from 'antd';
- 我发现所有标签上都可以有style={{属性}}

- 下面是两种写法
<Input.TextArea></Input.TextArea>

const { TextArea } = Input;
<TextArea></TextArea>

- 属性：
- addonAfter： 带标签的 input，设置后置标签
- addonBefore： 带标签的 input，设置前置标签
- defaultValue: 输入框默认内容
<!-- 
  <Input 
    addonBefore="http://" 
    addonAfter=".com" 
    defaultValue="mysite" 
  />
 -->
    

- allowClear：boolean
    可以点击清除图标删除内容

- bordered: boolean
    是否有边框


- disabled:
    是否禁用状态，默认为 false


- maxLength： number
    最大长度


- prefix：  
    带有前缀图标的 input

- suffix：
    带有后缀图标的 input


- size： large | middle | small
    控件大小。注：标准表单内的输入框大小限制为 large


- onChange：
    输入框内容变化时的回调


- onPressEnter
    按下回车的回调


> Input.TextArea
- 属性：
- allowClear：  boolean
    可以点击清除图标删除内容


- autoSize：  boolean | object
    自适应内容高度，可设置为 true | false 或对象：{ minRows: 2, maxRows: 6 }


- bordered：  boolean
    是否有边框


- defaultValue：
    输入框默认内容


- showCount
    是否展示字数


- onPressEnter
    按下回车的回调


- onResize
    resize 回调


> <Input.Search>
> <Input.Group>
> <Input.Password>
> Input Methods blur focus

-----

### Button组件
- type：primary / dashed / danger / link / ghost / default / text
- 不写type就是默认框

-----

### Message组件
- 也是引入后使用
<!-- 
  message.success(content, [duration], onClose)
  message.error(content, [duration], onClose)
  message.info(content, [duration], onClose)
  message.warning(content, [duration], onClose)
  message.warn(content, [duration], onClose) // alias of warning
  message.loading(content, [duration], onClose)
 -->

-----

### Card组件
- 通用卡片容器。最基础的卡片容器，可承载文字、列表、图片、段落，常用于后台概览页面。
- <Card title="卡片标题">卡片内容</Card>

- 属性：
  - bodyStyle：   CSSProperties
    内容区域自定义样式

  - bordered：    	boolean
    是否有边框

  - defaultActiveTabKey   string	第一个页签
    初始化选中页签的 key，如果没有设置 activeTabKey

  - headStyle：   CSSProperties
    自定义标题区域样式
<!-- 
  <Card 
    title={title} 
    extra={extraNode}
    headStyle={{fontSize: '14px', fontWeight: 400}}
  >
 -->

  - hoverable   	boolean	false	
    鼠标移过时可浮起

  - size    default | small	default	
    card 的尺寸

  - title  	ReactNode
    卡片标题 card组件上部分文本

  - extra   ReactNode
    卡片右上角的操作区域 More部分的 或者可以定义成按钮

  - onTabChange   	(key) => void
    页签切换的回调

-----

### Modal对话框
- https://ant.design/components/modal-cn/
- 有点像 confirm 的效果

- 属性：
  - afterClose： function
    Modal 完全关闭后的回调

  - bodyStyle： CSSProperties
    Modal body 样式

  - cancelText：  	ReactNode  默认值 取消
    取消按钮文字

  - okText
    确认按钮文字

  - okType    string	primary
    确认按钮类型

  - centered	    boolean	  false	
    垂直居中展示 Modal	

  - closable      boolean
    是否显示右上角的关闭按钮

  - mask：    	boolean
    是否展示遮罩

  - maskClosable  boolean
    点击蒙层是否允许关闭

  - visible：   	boolean
    对话框是否可见

  - title
    标题 提示内容

  - width
    宽度

  - wrapClassName
    对话框外层容器的类名

  - zIndex
    设置 Modal 的 z-index

  - onCancel
    点击遮罩层或右上角叉或取消按钮的回调

  - onOk
    点击确定回调

  - destroyOnClose
    关闭时销毁 Modal 里的子元素
    用于重新渲染里面最新的元素 很有用

> 使用方式1 调用函数confirm
- 这个Modal是一个函数 函数的话 就需要给按钮绑定点击事件 这个就相当于事件的回调吧
- 点击的时候出现对话框
<!-- 
  function showConfirm() {

    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });

  }
 -->


> 使用方式2 将 <Modal> 写成标签的格式 
- 试用于对话框内有复杂的结构

-----

### Select组件
- 属性：
  defaultValue：  
      string | string[] number | number[] LabeledValue |  LabeledValue[]
      指定默认选中的条目

- Option
- 属性：
  className	
      Option 器类名	

  disabled
      是否禁用

  title
      选中该 Option 后，Select 的 title

  value
      默认根据此属性值进行筛选

-----

###  Icon组件
- 4.x以后没有<Icon>这样的写法了 我们要使用的话 要从下面引入
<!-- 
  import { 引入组件 } from '@ant-design/icons';
 -->

- 属性：
  - rotate：  number
    图标旋转角度（IE9 无效）

  - spin    	boolean
    是否有旋转动画

  - style     	CSSProperties
    设置图标的样式，例如 fontSize 和 color

  - className   设置图标的样式名

  - twoToneColor	string (十六进制颜色)
    仅适用双色图标。设置双色图标的主要颜色
<!-- 
  import { PlusOutlined } from '@ant-design/icons'
  <PlusOutlined />
 -->

-----

### Antd布局
> 设计规则
- 顶部导航（大部分系统）：一级导航高度 64px，二级导航 48px。
- 顶部导航（展示类页面）：一级导航高度 80px，二级导航 56px。
- 顶部导航高度的范围计算公式为：48+8n。
- 侧边导航宽度的范围计算公式：200+8n。

- 12px、14px 是导航的标准字号，14 号字体用在一、二级导航中。字号可以考虑导航项的等级做相应选择。

-----

### 布局组件的使用
- import { Layout } from 'antd';
- const { Header, Footer, Sider, Content } = Layout;

> Layout
- 整体的一大片布局 比如我们页面中就有两个layout 外面一个 里面一个 里面的包裹了 上中下三个部分 Header Content Footer
- 属性：
  className 
      容器 className

  style
      指定样式


> Sider
- 侧边栏
- 属性：
  className： string
      容器 className

  style
      指定样式

  width
      宽度

  theme： light | dark
      主题颜色	

  reverseArrow： boolean
      翻转折叠提示箭头的方向，当 Sider 在右边时可以使用

  collapsed： 	boolean
      当前收起状态

  breakpoint： 触发响应式布局的断点

-----

### Menu菜单 组件
- 我们先来了解一下 菜单组件的概念
- 菜单可能是多级的结构
- 那它会分成菜单 菜单项 和 子菜单(如果一个菜单项是一个子菜单的话)
<!-- 
  Menu        是菜单组件
  Menu.Item   是菜单项
  SubMenu     子菜单  

  SubMenu 子菜单通过title属性来指定 显示的文字
 -->

- 菜单组件的每一项都要按类别指定 key 的值

> Menu
- 属性：
  - 初次 和 动态选中功能
  defaultSelectedKeys: string[]
    - 写的是对应的key的值
    初始选中的菜单项 key 数组
    defaultSelectedKeys={['1']}

  selectedKeys： string[]
    当前选中的菜单项 key 数组
    这个跟上面的相比 它是动态的 指定什么值就会根据这个值动态的去匹配 而defaultSelectedKeys值会在初始的时候匹配一次

  - 初次 和 动态 展开谁
    defaultOpenKeys： string[]
    初始展开的 SubMenu 菜单项 key 数组 最开始的时候展开哪个菜单项
    defaultOpenKeys={['sub1']}


----------------------------

### antd的按需引入css样式
- 上面我们只引入了几个按钮和几个图标，但却把所有的样式都引入进来了 这个文件是很大的
<!-- 
  import 'antd/dist/antd.css'
 -->

- 其实我们应该是用到哪个组件的样式 我们就引入哪个组件的样式 叫做按需引入
- 我们在查看antd的文档的时候 推荐查看3.x的版本， 4.x的版本的介绍不是那么的详细
- 我们只要看 create-react-app中使用的 选项卡
<!-- 
  https://3x.ant.design/docs/react/use-with-create-react-app-cn
 -->

- 那怎么按需引入样式呢？
- 我们先看看怎么暴露默认文件
<!-- 
  我们需要对 create-react-app 的默认配置进行自定义 可配置在哪呢？
  react将webpack的配置隐藏了，那怎么开启将隐藏的配置暴露出来了呢？

  > 命令：
  - 用于暴露隐藏的配置， 但是一旦暴露出来之后就没办法回去了 会将react的核心配置都暴露出来 包括webpack的核心配置
  npm eject

  上面的命令完事后 项目文件夹中会多两个文件夹
  1. config
      这里所有的东西都是支撑脚手架运行的

  2. script
 -->

- 但是更改上面的配置文件很可能会引发其他的问题， 我们并不推荐在webpack里面更改配置
- 我们使用文档推荐的方式 修改配置文件，达到按需引入的效果


> 1. 下载所需要的依赖库
- npm i react-app-rewired customize-cra
<!-- 
  react-app-rewired   这个库的用作是， 在默认配置被修改后启动脚手架的库
  customize-cra       这个库的作用是执行修改配置的
  
  如果使用了customize-cra这个库按照config-overrides.js的规则修改了脚手架
  我们就不能用脚手架中原来启动脚手架的命令了

  我们启动脚手架 上面一直使用的是
  npm start 
      这个短命令对应着 "start": "react-scripts start",
      使用这个短命令的前提是 我们的脚手架不能被修改 如果我们把脚手架的规则改了 我们就不能用原来的方式启动脚手架了 我们就必须要使用 react-app-rewired 这个库启动脚手架
 -->


> 2. 修改package.json文件
- 我们修改react的默认配置后 我们就要修改启动命令
<!-- 
  -   "start": "react-scripts start",
  +   "start": "react-app-rewired start",
  -   "build": "react-scripts build",
  +   "build": "react-app-rewired build",
  -   "test": "react-scripts test",
  +   "test": "react-app-rewired test",

  - 是原先的
  + 是我们要修改成的样子
 -->


> 3. 创建 config-overrides.js 文件 里面告诉react我们要修改什么配置
- 用于说明我们要改谁，改成什么样子 这个文件只是用来写规则
- 写完的规则我们就要执行规则， 那么就需要这个库 customize-cra
- 这个库就是专门找到这个文件来进行修改的

- 1. 我们要在项目的根目录创建config-overrides.js 文件
<!-- 
  跟package.json同级的目录 
-->

- 2. 在这个文件中我们要需要下载 引入 babel-plugin-import
<!-- 
  babel-plugin-import 是一个用于按需加载组件代码和样式的 babel 插件（原理）
 -->

- 下载:
  - npm i babel-plugin-import

- 下载后复制下面的东西到js文件内
<!-- 
  // 配置具体的修改规则
  const { override, fixBabelImports } = require('customize-cra');

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: 'css',
    }),
  );

  // import 指定使用bael-plugin-imoprt工具包
  // antd   我们要做antd的按需引入
  // es     antd里面用了es的模块化规范
  // css    我们要按需引入的是css 自动打包css样式

  fixBabelImports 功能是根据 import 来按需加载css样式
 -->

- 3. 我们在App.jsx里面不要自己引入antd的样式了
<!-- 
  - import 'antd/dist/antd.css'     - 是删掉的意思
 -->

----------------------------

### antd自定义主题
- antd的主题颜色 我们会发现整个网站的配色都是蓝色为主， 我们可以修改antd主题颜色的变量，antd所有的样式都是使用less写的

- 我们的目的是去找到官方在less里面写的主题的颜色 我们将管颜色的变量改掉就可以了


> 修改主题
- 使用老师的方式最后会报错， 我们需要删掉之前看视频的时候安装的less版本 换了less版本后就好了 如果是less的版本高了

> 1. 安装less 和 less-loader
- npm i less@3.12.2 less-loader@7.1.0


> 2. config-overrides.js文件中加入规则
<!-- 
  结合上面的按需引入 我们往里面加了修改主题的配置

  // 配置具体的修改规则
  const { override, fixBabelImports, addLessLoader } = require('customize-cra');

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,        // 更改主题 修改antd的源码文件
      // style: 'css',    // 按需引入 
    }),

    // 更改主题
    addLessLoader({
      javascriptEnabled: true,

      // 修改存储主题颜色的变量值
      modifyVars: { '@primary-color': 'red' },
    })
  );
 -->

**比较棘手的报错问题**
- 文档是旧的写法 lessloader其实已经更新了
<!-- 
  在使用框架的时候 我们有的时候会碰到一些报错， 但是像下面的错误就比较棘手 因为都是框架的底层问题， 并不是我们编码的过程当中逻辑代码出问题了

  /Users/liulin/Desktop/Sam/node_modules/antd/es/space/style/index.less (./node_modules/css-loader/dist/cjs.js??ref--5-oneOf-8-1!./node_modules/postcss-loader/src??postcss!./node_modules/resolve-url-loader??ref--5-oneOf-8-3!./node_modules/less-loader/dist/cjs.js??ref--5-oneOf-8-4!/Users/liulin/Desktop/Sam/node_modules/antd/es/space/style/index.less)
  TypeError: this.getOptions is not a function
 -->


> 总结：
- 我们总结一下这节的内容，antd的按需引入和自定义主题

- 1. npm i react-app-rewired customize-cra babel-plugin-import less less-loader

- 2. 修改package.json
<!-- 
  "scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
 -->

- 3. 根目录下创建config-overrides.js文件
<!-- 
  // 配置具体的修改规则
  const { override, fixBabelImports, addLessLoader } = require('customize-cra')

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,        // 更改主题
      // style: 'css',    // 按需引入
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        modifyVars: { '@primary-color': 'red' }
      }
    })
  );
 -->

- 4. 不用再组件里亲子引入样式了
<!-- 
  比如 import 'antd/dist/antd.css' 删掉
 -->

-------

> 官方网站的解决方式 注意这不是老师教的 上面的也好用 减低less版本后
> 修改主题
- 1. 安装 craco 并修改 package.json 里的 scripts 属性
- npm i @craco/craco
- npm i craco-less

- 2. 修改package.json文件
<!-- 
  "scripts": {
  -   "start": "react-scripts start",
  -   "build": "react-scripts build",
  -   "test": "react-scripts test",
  +   "start": "craco start",
  +   "build": "craco build",
  +   "test": "craco test",
  }
 -->

- 3. 首先把 src/App.css 文件修改为 src/App.less，然后修改样式引用为 less 文件。
<!-- 
  /* src/App.js */
  - import './App.css';
  + import './App.less';


  /* src/App.less */
  - @import '~antd/dist/antd.css';
  + @import '~antd/dist/antd.less';
 -->

- 4. 项目根目录创建一个 craco.config.js 用于修改默认配置。
- 跟package.json文件一个层级
<!-- 
  // 修改 craco.config.js 文件
  const CracoLessPlugin = require('craco-less');

  module.exports = {
    plugins: [
      {
        plugin: CracoLessPlugin,
        options: {
          lessLoaderOptions: {
            lessOptions: {
              modifyVars: { '@primary-color': '#1DA57A' },
              javascriptEnabled: true,
            },
          },
        },
      },
    ],
  };
 -->

----------------------------

### React中less的使用
> 1. 下载：
- npm i react-app-rewired customize-cra
- npm i babel-plugin-import
- npm i less@3.12.2 less-loader@7.1.0

> 2. 配置 package.json 文件
-   "start": "react-scripts start",
+   "start": "react-app-rewired start",
-   "build": "react-scripts build",
+   "build": "react-app-rewired build",
-   "test": "react-scripts test",
+   "test": "react-app-rewired test",

> 3. 根目录创建 config-overrides.js 文件
- 如果想要配置主题颜色 解开下面的注释，现在的状态已经可以使用less了
<!-- 
  const { override, fixBabelImports, addLessLoader } = require('customize-cra')

  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd-mobile',
      libraryDirectory: 'es',
      style: true,        // 更改主题
      // style: 'css',    // 按需引入
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        // modifyVars: { '@primary-color': 'red' }
      }
    })
  );
 -->

> 注意：
- 我们要引入的是less
- 我们要将easy less的插件禁用

----------------------------

### Antd-moblile的基本使用
- 移动端的UI两家 一家公司出的

- 官方网站：
- https://mobile.ant.design/docs/react/use-with-create-react-app-cn

- 下载：
- npm i antd-mobile

- 基本使用：
- 1. 和上面的一样 导出要使用的组件 然后在页面中使用
- 2. 引入css样式
<!-- 
  import { Button } from 'antd-mobile';
  import 'antd-mobile/dist/antd-mobile.css'
 -->


> 按需引入
- 可以参考上面的antd的代码
- 需要修改 libraryName 为 antd-mobile

- 按需引入后删除 antd-mobile的整体css样式

> 修改主题颜色
- 需要修改 modifyVars 为
{ '@brand-primary': 'red', '@brand-primary-tap': 'red'}

- 分别是展示色 和 点击色

<!-- 
  module.exports = override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true,        // 更改主题
      // style: 'css',    // 按需引入
    }),

    // 更改主题
    addLessLoader({
      lessOptions: {
        javascriptEnabled: true,

        // 修改存储主题颜色的变量值
        modifyVars: { '@primary-color': 'red' }
      }
    })
  );
 -->

----------------------------

**总结**

- 1. 生命周期中的回调要用箭头函数, 不然this会有undefined的问题, 那就不能通过this取到实例中的数据 比如 this.state
<!-- 
  componentDidMount() {
    setTimeou(function() {})    如果这里使用function 那么this就是undefined
  }
 -->


- 2. 不能往页面中放对象
<!-- 
  <span>现在是: {typeof this.state.date}</span>

  会报错 因为 date: new Date() 是一个对象

  // 报错信息
  Objects are not valid as a React child
 -->


- 3. 注意 页面想要有变化要修改state里面的数据, 不要想着直接对什么操作, 先继承面向state开发

- 4. 父给子传递数据, 我们通过标签属性传递
<!-- 
  <Son name='sam'/>
 -->

- 5. 子传父 让父组件通过标签属性 传递一个处理函数, 子组件通过实参传递数据, 父组件中的函数通过形参, 转移数据或者更新状态

- 6. 更新state中的状态, 可以定义一个新的数组或者对象, 然后将新的数组对象组成自己想要的样子, 然后将整个对象, 覆盖掉state中的数据

- 7. 我们要使用confirm的时候 要在前面加上winodw.

- 8. disable对移动端的点击事件不起作用

- 9. 我们想改变什么做什么效果 都是根据state中的变量来做判断

- 10. 动态决定 提示信息 利用了三元表达式 和 字符串的拼接
<!-- 
  // 完善下：统一提示 不然多次提示 用户体验不好
  // 这个this是实例对象 我们在实例对象身上维护两个变量 默认没有错误
  this.telErr = false
  this.codeErr = false

  // 当不对的时候 将我们维护的变量修改为 true
  if(!tel) this.telErr = true
  if(!code) this.codeErr = false

  // 利用三元 动态 拼接 错误提示信息
  let errMsg = '请输入合法的'
  errMsg += this.telErr ? '手机号' : '' 
  errMsg += this.codeErr ? '验证码' : '' 

  if(this.telErr || this.codeErr) Toast.fail(errMsg, 2)
 -->

**总结**