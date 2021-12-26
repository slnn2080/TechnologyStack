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