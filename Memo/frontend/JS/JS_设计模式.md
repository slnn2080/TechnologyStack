### 设计模式
- 一种书写代码的方法
- 为了解决特定的问题给出的简洁而优化的解决方案

### 单例模式
- 一个构造函数一生只能由一个实例 不管new多少次都是这一个实例

- 应用场景:
- 自定义弹出层
<!-- 
  我们alert的弹出层很丑 不适合我们高大上的页面 这时候我们就自己写一个弹出层
 -->

> html结构:
- div
    - xxx
- 默认隐藏 在一定条件下显示

> 思考:
- 那这个弹出层每次显示都是一个新的div 还是一个div来回来去的显示

- 应该是一个div来回显示 只是里面的内容不一样 这时候我们就可以使用单例模式 不管是new多少次 我们只是改里面的文本内容


> 单例模式逻辑
- 核心代码如下：
<!-- 
  function Person() {
    this.name = "sam"
  }

  // 定义全局的变量 用于创建共通实例对象
  let instance = null
  
  function singleTon() {

    if(!instance) {
      instance = new Person()
    }

    return instance
  }


  // 创建实例对象
  let p1 = singleTon()
  let p2 = singleTon()

  console.log(p1 == p2);      // true
 -->

- 代码解析：
- 当我们第一次调用 singleTon() 时候 instance = null
- 这时候我们走的是 如下的逻辑
    if(!instance) {
      instance = new Person()
    }
  
- 我们在堆空间中创建了一个对象 将地址值给了 instance 这时候instance中保存的就是堆空间中 new Person() 这个对象的地址值

- 然后 return instance 这个地址值 赋值给了 p1

- 当我们第二次调用 singleTon() 时候 因为 instance 不是空了 所以直接走了 return instance 这个逻辑 *再一次* 同一个地址值给了p2

- 所以我们以后不管调用几次 都是同一个地址值 也就是指向了同一个对象


> 单例模式代码
- 上面在介绍逻辑的时候 代码太多零散 现在我们整合好一个函数中
- 1. 我需要把 instance 变量保存下来
- 2. 我需要通过一个函数来实现创建单例对象的逻辑

- 3. 单例模式一般是不传递参数的 因为只有第一次传递的参数才有效

- 代码部分
<!-- 
  // singleTon 让它得到的是 return的function
  const singleTon = (function() {

    // 我们将构造函数 和 原型型添加的方法逻辑 都利用闭包保存在函数内部
    function Person(name, age) {
      this.name = name
      this.age = age
    }

    Person.prototype.sayHi = function() {
      console.log(this.name)
    }

    let instance = null


    return function(...args) {
      if(!instance) instance = new Person(...args)
      return instance
    }
  })()

  // 单词模式一般不传递参数
  const p1 = singleTon("sam", 18)
 -->

- 改造成es6的语法结构
<!-- 
  class Person {
    static name = "sam"
    static age = 18

    static instance = null

    static createInstance() {
      if(!Person.instance) {
        Person.instance = new Person()
      }

      return Person.instance
    }
  }


  let p1 = Person.createInstance()
  p1.name = "sam"
  console.log(p1.name);

  let p2 = Person.createInstance()
  console.log(p2.name)

  console.log(p1 == p2)
 -->

- 根据java延伸的思路 饿汉式单例
<!-- 
  class Person {
    static instance = new Person()
    static createInstance() {
      return Person.instance
    }
  }

  const p1 = Person.createInstance()
  const p2 = Person.createInstance()

  console.log(p1 == p2)
 -->


### 观察者模式
- 观察者 和 发布订阅 是两个设计模式 (vue作者认为它俩是一个东西)

- 思路:
- 我们想想 监控
- 我们在教室里就是 *被观察者* 在监控后面的老师就是 *观察者*
- 当被观察者触发了一些条件的时候 观察者就会触发一些技能

> 观察者模式
- 就是监控一个对象的状态 一旦状态发生变化 马上触发技能

- 我们需要两个构造函数来实现
- 1. 创建被观察者
- 2. 创建观察者
<!-- 
  观察者的技能是看 被观察者什么时候触发条件
 -->

- 思路：
- 首先有两个角色
- 1. 被观察者
- 2. 观察者

- 当被观察者的状态发生变化的时候 会触发被观察者的事件

> 创建观察者类
- 构造器中要写上当被观察者的状态发生变化的时候 触发的事件
<!-- 
  class Observer {

    // name 观察者的身份, fn技能 默认这为空函数 不至于调用的时候报错
    constructor(name, fn = () => {}) {
      this.name = name
      this.fn = fn
    }
  }
 -->


> 创建被观察者类
- 这个类中应该有 
- 1. 状态
- 2. 观察者列表
  - 用于保存观察的人

- 3. 改变状态的方法
- 4. 添加观察者的方法
- 5. 删除观察者的方法

- 核心:
- 当我们调用改变被观察者的状态方法的时候 同时触发保存在队列中对象中的方法
<!-- 
  class Subject {
    constructor(state) {
      // 记录自己的状态
      this.state = state

      // 这个数组用来保存观察着我们的人
      this.observers = []
    }

    // 设置自己的状态
    setState(state) {
      this.state = state

      // 一旦状态改变 那么我们就触发所有观察者的技能 遍历this.oobservers 依次触发技能
      this.observers.forEach(item => {

        // 并且把我改变的状态传回去 告诉他我改变了什么状态
        item.fn(this.state)
      })
    }

    // 添加观察者
    addObserver(obs) {
      // some只要有一个是true就返回true
      const res = this.observers.some(item => item == obs)
      if(!res) {
        this.observers.push(obs)
      }
    }

    delObservere(obs) {
      // 把obs观察者删除就可以了
      this.observers = this.observers.filter(item => item !== obs)
    }
  }
 -->
