### 设计模式
- 一种书写代码的方法
- 为了解决特定的问题给出的简洁而优化的解决方案

### 单例模式
- 一个构造函数一生只能有一个实例 不管new多少次都是这一个实例

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
  // singleTon 让它得到的是 return的function 让它的值等于一个自执行函数 这样相当于直接赋值
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

  // 单例模式一般不传递参数
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


### 发布订阅模式
- 这个模式和观察者模式很像
- 思路
- 有一个对象 有人一直看着他 当这个对象发生变化的时候 第三方通知这个看着的人 触发技能

- 例子：
- 普通程序员买书 -- 去书店 -- 问 -- 没有 -- 回家
- 这个过程反复一直到买到书了为止

- 发布订阅程序员 -- 去书店 -- 没有 -- 留联系方式 -- 一旦有了书就会接到电话 -- 触发技能去买书

- 上面的逻辑还是跟观察者模式很像 但是实现的逻辑 一个函数就够

- 只需要一个构造函数 创建一个第三方店员的身份
<!-- 
  其实我们在开发中用的特别多 addEventListener 
  由浏览器在给你看着div 一旦触发了click行为 马上执行回调
 -->

> 视频中的逻辑整理
- 我们想想 on函数 off函数 调用的时候 是不是也要传入事件名 和 回调
- 我们创建一个事件队列 类型是一个对象 因为对象可以承载 事件名 和 事件数组的形式
- 我们创建on方法 调用on函数的时候 将事件名 和 事件回调传入事件队列中
- 我们创建emit方法 当发射事件名的时候 遍历调用事件队列中的函数

> 逻辑整理
- 消息的订阅与发布 还是理解为 
- 一方发布消息 比如发布 callbackSuccess 事件 并发送数据
- 一方订阅此消息 当发布的时候 就会调用回调 并拿到数据

- 所以我们先完成发布消息方的逻辑



> 分析构造函数
- 属性：
- 任务队列 也叫做消息队列
  {
    click: [fn1, fn2, fn3],
    change: [fn1, fn2, fn3]
  }
- 一旦用户触发了click行为 就执行click对应的 函数

- 方法：
- 向消息队列中添加内容

- 方法：
- 删除消息队列里面的内容

- 方法：
- 能触发消息队列里面的内容


> 理解上的要点:
- 1. if else逻辑 和 if(!xx) code... 逻辑的区别

- A
<!-- 
  if(this.message[type]) {
    this.message[type].push(fn)
  } else {
    this.message[type] = []

    // 我们可以在这里添加这样的逻辑就可以了
    this.message[type].push(fn)
  }
 -->

- B
 <!-- 
  if(!this.message[type]) {
    this.message[type] = []
  } 
  this.message[type].push(fn)
  -->

- 上面两块代码的区别是什么
- A的逻辑咋一看没有问题 第一次走else进行初始化 第二次往数组里push元素
- 但实际操作的时候 发现 调用两次 o.on("click", fn1) o.on("click", fn2) 只push进去一个fn2
- 原因第一次走的确实是初始化的逻辑 但是 if else 整体就会执行一次 既然走了else的逻辑 就没有push的操作
- 所以第二次调用的时候 才会push元素进去

- 而B是 可以看做两条语句 先执行if判断确实没有click 设置[] 然后下一行就是push 所以好好考虑下


- 2. 有时候我们要进行严谨的判断 所以经常要使用 这种方式 

    if(!this.message[type]) return 


- 视频中的代码部分
<!-- 
class Observer {

  constructor() {
    // 消息队列 或者称为 任务队列
    this.message = {}
  }

  // 向消息队列里面添加内容
  on(type, fn) {

    if(!this.message[type]) {
      this.message[type] = []
    } 
    this.message[type].push(fn)

  }

  // 删除消息队列里面的内容
  off(type, fn) {

    // 判断 如果fn不存在 只有一个参数的情况下
    if(!fn) {

      // fn不存在代表我们要 代表我要情况click对应的事件队列
      this.message[type] = []
      // delete this.message[type]
      return
      
    }
    
    // 代表能来到这里表示fn存在
    if(!this.message[type]) return 
    this.message[type] = this.message[type].filter(item => {
      return item !== fn
    })
  }

  // 触发消息队列
  emit(type) {
    if(!this.message[type]) return
    this.message[type].forEach(item => item())
  }

}

// 创建实例
const p = new Observer()

let handleClickA = () => {
  console.log("handleClickA")
}
let handleClickB = () => {
  console.log("handleClickB")
}

p.on("click", handleClickA)
// console.log(p);
p.on("click", handleClickB)
// console.log(p);


// p.off("click")

// 删除指定事件
// p.off("click", handleClickA)

// 这个人一旦触发a行为 就要吧后面的所有事件处理函数执行掉
p.emit("click")
 -->  


> 爬虫中的启示
<!-- 
  let eventObj = {
    // 事件对象
    event: {
      // 我们绑定什么事件 比如我们可以绑定 fileSuccess 事件
      fileSuccess: [],
    }
        

    // 绑定事件的on方法
    on: function(eventName, eventFn) {
      // 我们绑定的事件名称在事件对象里面的话
      - 比如我们绑定的是 fileSuccess事件 那就把回调push到 fileSuccess对应的事件数组中
      if(this.event[eventName]) {
        this.event[eventName].push(eventfn)
      } else {
      // 如果不在的话 就创建一个该事件kv 整理成
      - 新事件: []
      - 然后将回调push到新事件对应的事件数组中 做初始化的路基
      this.event[eventName] = []
      this.event[eventName].push(eventfn)
      }
    },
        
    // 定义触发事件的逻辑函数
    emit: function(eventName, data) {
      if(this.event[eventName]) {
        this.event[eventName].forEach(itemFn => {
          itemFn(data)
        });
      }
    }
  }

// 当读取数据后触发 自定义事件的回调
let fs = require("fs")
fs.readFile("./output.txt", "utf-8", (err, data) => {
  if(!err) lcEvent.emit("fileSuccess", data)
})


// 自定义事件的逻辑部分
lcEvent.on("fileSuccess", (data) => {
  console.log("查看数据库")
})

lcEvent.on("fileSuccess", (data) => {
  console.log("统计年龄比例")
})

lcEvent.on("fileSuccess", (data) => {
  console.log("查看所有用户的信息")
})
 -->


### 策略模式
- 一个问题匹配多个解决方案 但是不一定要用到哪一个方案 而且有可能随时还会继续增加多个方案

- 比如:
- 购物车结算 我们有好多种结算方式
- 1. 满100减10元
- 2. 满200减25元
- 3. 纯8折

- 4. 有一天可能突然打7折
- 5. 突然有一天还取消7折


> 逻辑代码
- 参数1： 商品原价格
- 参数2： 折扣活动种类 因为什么活动打折
function calcPrice(price, type) {
  if(type == "100_10") {
    price -= 10
  } else if(type == "200_25") {
    price -= 25
  } else if(typeof == "80%") {
    price *= 0.8
  } else {
    console.log("没有这种折扣")
  }

  return price
}

- 商品原价格为320元
- 折扣活动为 满100减10元
const res = calcPrice(320, "100_10")
console.log(res)

------

- 上面的代码完成基本的逻辑是没有问题的
- 但是一旦加一种折扣或者删除一种折扣 就需要回程序中改写源代码


> 自执行函数 + return函数 和 普通函数的区别 要点：
- 下面两种方式的结果是一样 在调用的时候都是 calcPrice() 只不过第一种自执行函数可以利用闭包保存数据

    const calcPrice = (function() {内部return函数})()
    const calcPrice = () => {}


> 策略模式的思路
- 把我们的多种方案 以闭包的形式保存起来 按照传递进来的折扣和价格计算最终价格返回

- 对外留一个接口 可以添加和减少 折扣种类
<!-- 
  // 1. 自执行函数 得到的结果就是内部的return fn
  const calcPrice = (function() {

      // 折扣方案放在这里

      return function() {}
    }
  )()
 -->

- 阶段1
- 下面的逻辑实现了一部分 但是并没有对外提供添加折扣种类 和 删除折扣种类的接口
<!-- 
  const calcPrice = (function() {

      const sale = {
        // 满100减10
        "100_10": price => price -= 10,
        "200_25": price => price -= 25,
        "80%": price => price *= 0.8,
      }

      // 被return出去的函数 才是calcPrice本体 闭包只是为了存放数据
      return function(price, type) {

        // 判断对象中有没有这个折扣类型
        if(!sale[type]) return '没有这个折扣'

        // 如果有就执行对象中对应的逻辑 找到sale里面指定的哪个函数执行计算出结果 返回给外边
        const ret = sale[type](price)
        return ret
      }
    })()

    const res = calcPrice(320, "100_10")
 -->

- 阶段2
- 留下添加 删除折扣种类的接口
- 我们要知道函数也是一个对象 向里面添加一些成员
<!--  
  const calcPrice = (function() {

    const sale = {
      "100_10": price => price -= 10,
      "200_25": price => price -= 25,
      "80%": price => price *= 0.8,
    }

    function calcPrice(price, type) {
      if(!sale[type]) return '没有这个折扣'
      return sale[type](price)
    }

    // 把函数当做一个对象 向里面添加一些成员
    // 专门添加折扣的方法 使用的时候 calcPrice.add("70%", (price) => {return price *= 0.7})
    calcPrice.add = function(type, fn) {
      // 判断折扣是否存在
      if(sale[type]) return "该折扣已存在"

      // 代码来到这里 表示折扣不存在 因为是闭包 数据会存在这里面
      sale[type] = fn
      return "添加成功"
    }

    calcPrice.del = function(type) {
      // 把对应的折扣删除调
      delete sale[type]
    }

    return calcPrice
  })()

  const res = calcPrice(320, "100_10")
 -->


> 用类改造一下上面的逻辑
<!-- 
  class SaleCampaign {
    static sale = {
      "100_10": price => price -= 10,
      "200_25": price => price -= 25,
      "80%": price => price *= 0.8,
    }

    static add(type, fn) {
      if(SaleCampaign.sale[type]) return "该折扣已存在"
      SaleCampaign.sale[type] = fn
      console.log("折扣添加成功")
    }

    static del(type) {
      delete SaleCampaign[type]
    }

    static showCampaign() {
      console.log(SaleCampaign.sale)
    }

    calc(price, type) {
      if(!SaleCampaign.sale[type]) {
        console.log("没有这个折扣")
        return
      }

      return SaleCampaign.sale[type](price)
    }
  }

  // SaleCampaign.add("70%", price => price *= 0.7)
  // SaleCampaign.showCampaign()
  
  const instance = new SaleCampaign()
  let res = instance.calc(320, "100_10")
  console.log(res);
 -->