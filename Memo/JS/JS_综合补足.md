### 锁住变量不让其修改
> Object.freeze(变量)
- 在const定义的对象中, 对象的属性是可以被修改的 如果 我们连对象的属性也不想让其被修改 那我们就可以使用这个方法
<!-- 
  const HOST = {
      port: 80
    }

  Object.freeze(HOST)
 -->


### null 和 undefined 初始化
- 我们给引用类型的变量赋null
- 我们给基本类型的变量赋undefined


### 字符串.repeat(整数)
- 将一个字符串复制几次
<!-- 
  console.log('abc'.repeat(2));   abcabc
 -->

> 案例: 电话号码的模糊处理
<!-- 
  思路:
  将电话号码使用slice提取 提取留下几个字符, 使用*来拼接
  let num = 18698712060

  function handleP(num, len=3) {

    // 提取到18698712  剩下的使用 *** 代替(拼接)
    return String(num).slice(0, len*-1)+'*'.repeat(len)
  }

  let res = handleP(num, 3)
  console.log(res);
 -->


### 转换时间戳
let date = new Date()
console.log(date);  // Sat Jul 03 2021 19:23:25 GMT+0900 (日本标准时间)

console.log(date * 1);      // 1625307824651
console.log(Number(date));  // 1625307824651


### Moment.js
- 时间格式化库的使用方式

- 1. 获取当前系统的时间
<!-- 
  moment().format('YYYY-MM-DD HH:mm:ss')
 -->

- 2. 指定时间格式化
<!-- 
  moment('1992-02-22 10:10:10').format('YYYY-MM-DD HH:mm:ss')

  或者

  let date = moment('1992-02-22 10:10:10')
  date.format('YYYY-MM-DD HH:mm:ss')
 -->

- 3. 查看10天之后是什么日期
<!-- 
  let date = moment('1992-02-22 10:10:10')

  // 看看10天之后
  date.add(10, 'days').format('YYYY-MM-DD HH:mm:ss')
 -->


### Array.of() 创建数组
- 平时 我们使用 new Array(6) 创建数组时 输入了一个参数 则会创建一个长度为6的空数组

- 使用 Array.of() 可以正常创建数组 不会在输入一个数字时, 创建长度数组
<!-- 
  let arr = Array.of(6)

  console.log(arr)    // [6]
 -->


### Array.from(元素节点集合)
- 可以使用这个语法将元素节点 变成数组
<!-- 
  let divs = document.querySelectorAll('div')

  Array.from(div).map(item => {
    console.log(item)
  })

  [...divs].map
 -->


### 清空数组的技巧
- 1. 赋空值     相当于将数组引向一个空对象
<!-- 
  let hd = [1,2,3]
  hd = []
 -->

- 2. 修改长度   修改原数组 彻底清除数组的好方式
<!-- 
  let hd = [1,2,3]
  hd.length = 0
 -->

- 3. 使用splice()
<!-- 
  let hd = [1,2,3]
  hd.splice(0)
 -->


### 数组中查找元素   
> indexOf()
- 我们写的参数是严格匹配, 查找到返回的是元素第一个出现的索引 否则为-1
<!-- 
  let arr = [1,2,3,4,5]
  if(arr.indexOf(1) != -1) {
    console.log('找到了');
  }
 -->

> includes()
- 这个方法也是查找数组中的元素, 但返回的是boolean
<!-- 
  let arr = [1,2,3,4,5]
  if(arr.includes(1)) {
    console.log('找到了');
  }
 -->


### includes查找的原理
<!-- 
  let arr = [1,2,3,4,5]
    
  function includes(arr, find) {
    for(let value of arr) {
      if(value === find) {
        return true
      } else {
        return false
      }
    }
  }
 -->


### 数组.find()
- 数组中有几个元素就会调用几次回调, 内部如果返回true 就会把元素返回出来
- 也是禁止贪婪原则, 找到一个就完事了
- 找到的话就返回该值, 如果没找到就返回undefined
<!-- 
  let arr = [1,2,3,4,5]
    
  let res = arr.find(item => {
    return true                 // 1 禁止贪婪原则

    return item === 2           // 查找2
  })
 -->

> find()方法适合查找引用类型
<!-- 
  let lesson = [{name: 'js'}, {name: 'css'}]

  // 不能这样 即使长的一样也不行, 因为在查找引用类型的值的时候 我们查找的是内存地址
  lesson.includes({name: 'css'})    


  这种情况下 我们可以使用find()
  let res = lessons.find(function(item) {
    return item.name === 'css'        // 将{name: 'css'}这个对象找出来了
  })
 -->

> findIndex()
- 查找的是索引位置


### 异步编程
- js中只有一个线程来干活, 比如请求数据如果是单线程的那就要等待后台去响应数据, 如果后台的代码效率不高 前端就可能等好长的时间 那能不能同时呢? js不行 js就是单线程的
<!-- 
  比如我一天的工作有 打扫卫生, 洗衣服, 做饭 就我一个人干(单线程)
  那么我打扫卫生(1小时) -- 洗衣服(1小时) -- 做饭(1小时) 

  那好 我找一些人安排下 a帮我打扫卫生, b帮我洗衣服, c做饭 这种模式就是(多线程)
 -->

- 那为了解决上面的需求怎么办
- 我们可以将
  - 做饭交给  [电饭锅模块] [电饭锅模块]模块做好饭后放在宏任务队列里面 滴一声通知你
  - 洗衣服交给[洗衣机模块] [洗衣机模块]模块洗好了后放在宏任务队列里面 滴一声通知你

- 然后我洗完衣服之后了, 去宏任务队列里面轮询(看看什么好了) 那到主线程处理(放桌子)

- 以上解决了我作为一个单线程 不会出现阻塞的问题

- 请求后台数据也一样 我们不能等它 因为这个时间可能很长, 比如定时器延时5秒 我们也不能等这个5秒再去做其他的事情, 所以我们把请求数据交给[数据请求模块], 定时器交给[定时器模块], 你们处理完各自的任务后把结果让在任务队列里面 我主线程做完东西之后 我去任务队列里面去轮询(去找有没有新的任务)

- 所以我们的js就是周而复始的去任务队列里面找这个任务 提高我们的效率 防止出现阻塞的问题


### 异步加载图片
- 整个加载图片的过程其实是比较慢的 所以这个加载图片的任务就会交给一个模块去处理
- 所以如果是
<!-- 
  function loadImage(src) {
    let image = new Image();
    image.src = src
  }
  loadImage()

  console.log('sam')
 -->
      
- 我们会发现先打印的会是sam
- 既然图片加载会比较慢, js会把文件加载的任务也会交给[文件加载模块]来处理 处理完毕后 放在任务队列里面 主线程的任务完成之后去轮询任务队列
<!-- 
  我们来看看上面的代码的执行
  1. 系统会先执行 loadImage() 函数 会把文件加载的函数交给 [文件加载] 的模块
  [文件加载]模块处理完成之后 就会把结果放在 任务队列 里面

  2. js开始从下到下执行 执行完console.log('sam') 就会轮询任务队列 然后就会刨除图片加载成功的结果
 -->
      
> 代码部分
<!-- 
  // src      用来告诉我们加载哪一张图片
  // resolve  图片加载完成之后的处理函数
  function loadImage(src, resolve, reject) {
    let image = new Image();
    image.src = src

    // image.onload = resolve
    // 修改一下 把结果传递出去 让外面的函数处理结果
    image.onload = () => {
      resolve(image)
    }

    image.onerror = reject
  }


  loadImage('./upload/focus1.jpg', (image) => {
    document.body.appendChild(image)
    
  }, () => {
    console.log('图片加载失败');
  });
  console.log('sam');
 -->


### 异步处理当中的任务排列
- 任务队列里面是先进先出, 谁先放进去的干谁的活
- 我们看下下面的情况
<!-- 
  我们定义了两个js文件 hd.js   和   houduanren.js

  // hd.js文件中的代码
  function hd() {
    console.log('hd.js');
  }

  // houdunren.js中的代码
  function houduren() {
    hd();
    console.log('houdunren.js')
  }


  我们能看到 houdunren.js是依赖hd.js的 如果没有加载hd.js直接运行 houdunren.jd会报错
  hd is not defind

  所以在运行这两个js文件的时候 我们一定要确保 hd.js是先加载的 而 houdunren.js是后加载的



  // 我们定义一个加载函数
  function load(src, resolve) {
    let script = document.createElement('script)
    script.src = src

    // 当script加载成功后 执行resolve
    script.onload = resolve
    document.body.appendChild(script)
  }


  // 我们先看下下面的情况
  load('./js/hd.js', () => {
    hd()
  })

  load('./js/houdunren.js', () => {
    houdunren()
  })

  console.log(123432)

  首先说下console.log的问题 它肯定是最先打印的 因为是在主线程里面 只有主线程的任务执行完毕才会轮询任务队列

  而文件加载会交给文件加载模块, 当加载完毕后会抛给任务队列 然后主线程的任务完成后 开始轮询任务队列, 输出hd()的结果

  但是我们直接像上面那样写两个加载js文件的函数, 并不能保证hd.js会先进入任务队列被先加载, 而是看这两个js文件谁快 谁快谁先进

  所以可能会报 hd is not defined的问题 如果这两个js文件分布在不同的服务器上的话 这个问题暴露的可能性就会越高

  为了解决上面的问题 我们必须保证先加载hd.js 然后再加载houdunren.js

  所以我们要这样操作 嵌套 
  load('./js/hd.js', () => {
    load('./js/houdunren.js', () => {
      houdunren()
    })
  })

  我们先执行加载hd.js的任务, 加载完成后将hd.js放到任务队列里面 然后再来执行加载houdunren.js的任务
  houdunren.js加载完成后再把该任务放在任务队列里面

  也就是说 等执行houdunren.js的时候前面都加载完了
 -->

- 我们把上面的案例封装成promise
<!-- 
  function loadScript(src) {
    return new Promise((resolve, reject) => {
      let script = document.createElement(script)
      script.src = src

      script.onload = () => {
        resolve(script)
      }

      script.onerror = reject
      document.body.appendChild(script)
    })
  }

  loadScript('./js/hd.js').then(script => {
    console.log(script)  // <script src='hd.js'></script>

    // 在这里我们再继续加载houdunren 因为上面的hd.js已经加载完了
    loadScript('./js/houdunren.js').then(script => {
      // 这里就可以执行houdunren.js
      houdunren()
    })
  })


  // 上面还是嵌套 我们这么写
  loadScript('./js/hd.js').then(script => {
    return loadScript('./js/houdunren.js')
  })
  .then(script => {
    houdunren()
  })
 -->


### Promise微任务处理机制
- 我们举一个肯德基的例子
- 同步的概念就是 我点餐后 要10分钟做好 我要站在那等10分钟
- 异步的概念就是 我点餐完 去椅子上等待 等待广播叫我 我再去取

- 接下来我们看下promise

> promise的三种状态
- 1. <pending>      准备阶段
- 2. <fulfilled>    成功状态
- 3. <rejected>     拒绝状态
<!-- 
  new Promise((resolve, reject) => { }) 
  上面的代码 就相当于 肯德基再准备给我们做餐 所以 这时候我们打印
  console.log(new Promise((resolve, reject) => { }));

  当调用resolve()的时候就是 成功状态
  当调用reject() 的时候就是 拒绝状态

  .then() 方法就是处理 成功 或者 失败的状态 它有两个回调函数

  其实核心还是一样的 但是结构上来看更加的清晰了
 -->

> 微任务队列
- 对于promise来讲 还有一个队列 这个队列叫做微任务队列
- 当then()中的方法放入到微任务队列当中 当事件轮询的时候就会把微任务队列中的任务拿到主线程去执行 与宏任务队列相比 会以 微任务队列为主
<!-- 
  主体部分是同步的
  then的部分是异步的
 -->


### 宏任务与微任务执行顺序
- 在Promise构造函数的代码也是同步执行的
<!-- 
  // 1. 定义一个定时器 宏任务
  setTimeout(() => {
    console.log('setTimeout');
  }, 0)


  // 定义一个promise 主体中的代码是同步的, then中的是微任务
  new Promise((resolve, reject) => {
    console.log('promise')
    resolve();
    
  }).then((value) => {
    console.log('then 成功')
  })

  // 定义一个同步
  console.log('sam')

  打印顺序: promise  -- sam  -- then 成功  -- setTimeout
  
  执行到then的时候 会将then中的处理逻辑放入到微任务中 等待主线程内的任务执行完毕开始轮询微任务队列
 -->


### promise单一状态 与 状态中转
- promise中状态是不可逆的
- 如果在promise构造函数中已经先调用的 resolve 那么状态就是成功 即使在resolve的下面我们又调用了reject也没有用, 执行的还是then中的第一个回调
<!-- 
  因为我们第一次 调用 resolve() 后 已经把then放到了微任务里面了 已经上路了 也不能撤销了
 -->

- 如果 我们 resolve(p1) p1是一个别的promise对象, 那么别的promise对象的结果决定着我们执行then()中的第几个回调


### Promise.then 也是一个Promise
- 我们看看promise主体 和 then之间的关系
<!-- 
  let p1 = new Promise((resolve, reject) => {
      // 这里就相当于干活的人 

      // 如果这里一直没有发通知, then中就会一直在等待
      // 除非我发个通知 resolve('一瓶水')
  })

  p1.then(
    // 干完活需要交给then 看看满意不满意

    在这里我们会接到一个值, 就相当于我们让别人去买瓶水 这里就会接到一瓶水
  )     
 -->

- 上面我们知道 then是对上面promise状态的改变的一个处理
- 每一个 then() 返回的也是一个promise
<!-- 
  let p1 = new Promise((resolve, reject) => {
    resolve('一瓶可乐')
  })

  p1.then((value) => {
    console.log(value)    // 一瓶可乐
  })

  ------- 

  每一个then其实也是一个promise, 我们把p1赋值给p2
  let p2 = p1.then((value) => { 
    console.log(value)    // 一瓶可乐
  })

  console.log(p2)   // <pending>
  console.log(p1)   // <resolved>  '一瓶可乐'

  p1 是一个对构造函数中的处理
  p2 是一个新开的promise

  这个新开的promise会被放在微任务中, 等待主线程的任务执行完毕在去微任务里面轮询
 -->

- 假如我们.then().then() 最后一个then()是对上一个promise的处理



### Promise.then 返回值的处理技巧
<!-- 
  let p1 = new Promise((resolve, reject) => {
    resolve('fulfilled')
  }).then(
    value => console.log(value)
    reason => console.log(reason)
  );

  解析一下上面的代码
  p1的构造函数里 我们返回的是成功的状态 resolve('fulfilled') 里面的值就交给then来处理

  上面也分析了 上面代码中的.then()也是一个promise

  let p1 = new Promise((resolve, reject) => {
    resolve('fulfilled')
  }).then(

    // 因为第一个then()也是一个promise 默认返回的就是成功状态
    如果这里返回的是一个普通的值的话 那么下一个then()就会接到
    value => return 'houdnren'


  ).then(
    // 因为第一个then也是一个promise对象 默认是成功 所以这个then里面会执行第一个回调函数 打印成功的结果
    value => console.log(value)     // 后盾人
  );

  为什么要像上面这样设计呢? 比如 有的时候
  第一个任务是从后台抓取用户资料, 
  第二个任务是根据用户信息再把他所学的课程抓过来 

  有的时候是需要一步步的往下走的 这就是then存在的价值
 -->


> 应用场景
- 上面第一个then()中返回的是一个普通的值 如果第一个then()中返回的是一个promise对象
<!-- 
  let p1 = new Promise((resolve, reject) => {

    resolve('fulfilled')

  }).then(
    value => {
      return new Promise((resolve, reject) => {
        第一个then中返回的是一个Promise
      })
    }
  ).then(
    那么第二个then中就是对第一个then中的promise的处理
  )


  但是第一个then中的promise中没有调用resolve和reject也就是还没有进行处理 也就是准备状态(<pending>)所以第二个then中一直在等待 等待第一个then中的promise的完成

  也就是 比如

  p1 主体的promise中 是获取用户信息 然后走到了 第一个then中 就能拿到value
  然后根据value再从后台抓取用户的课程 在抓取用户的课程中 第二个then是不处理的
  除非我们在第一个then中调用的resolve代表处理完了

  那么第二个then就是对第一个then中的promise的处理 第二个then中的value就是用户的课程
 -->


- 注意:
- 第一个then中得return出来promise
<!-- 
  let p1 = new Promise((resolve, reject) => {

    resolve('fulfilled')

  }).then(
    value => {

      // 这里得return出来 
      return new Promise((resolve, reject) => {
      })
    }
  ).then(
  )

  第一个then中return出来 第二个then才是对第一个then中return出来的promise的处理

  如果不加return 那么 第二个then就是对第一个then的处理(因为then本身也是一个promise), 因为第一个then的promise前面没有return 它就是一个独立的promise
 -->

- 总结:
- 后面的then就是对前面返回的promise的处理


### 使用Promise封装AJAX异步请求
- 上面我们使用promise都是直接写的 它会立刻执行然后交给then方法来进行处理
<!-- 
  new Promise((resolve, reject) => {
    resolve('成功')
  }).then(value => console.log(value))
 -->

- 但是实际上我们不会让它立即执行 一般我们都是将它封装成函数 来进行调用
<!-- 
  function request() {
    new Promise((resolve, reject) => {
      resolve('成功')
    })
  }

  request().then(value => console.log(value))
 -->

- ajax的封装也是一样的
<!-- 
  function ajax(url) {
    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url)
      xhr.send()
      xhr.onload = function() {
        if(this.status == 200) {
          resolve(JSON.parse(this.response))
        } else {
          reject('加载失败')
        }
      }
    })
  }

  ajax(url).then(value => console.log(value))
 -->


### 使用finally实现异步加载动画
- 它无论成功还是失败都会执行
- 在我们异步请求任务的时候肯定会费时间 这段时间里我希望有动画加载的效果
<!-- 
  div {
    width: 100px;
    height: 100px
    background: red
    color:#fff

    display:none;     默认的时候是隐藏的
  }

  <div>Loading...</div>



  function ajax(url) {

    // 当发送ajax的时候 显示出来 loading div
    document.querySelector('div').sytle.display ='block'

    return new Promise((resolve, reject) => {
      let xhr = new XMLHttpRequest();
      xhr.open('GET', url)
      xhr.send()
      xhr.onload = function() {
        if(this.status == 200) {
          resolve(JSON.parse(this.response))
        } else {
          reject('加载失败')
        }
      }
    })
  }


  ajax('url').then(这里对数据进行处理).fanilly(这里让元素再消失 div.style.display:none)


  // 自己做的案例
  let div = document.querySelector('div')
  let btn = document.querySelector('button')
  btn.addEventListener('click', function() {

    new Promise((resolve, reject) => {
      div.style.display = 'block'
      setTimeout(function() {
        resolve('数据读取成功')
      }, 6000)
      
    }).then(value => console.log(value)).finally(() => {
      div.style.display = 'none'
    })

  })
 -->


### Promise加载图片
- 我们可以在图片加载完成后对图片进行二次处理
<!-- 
  function loadImage(src) {
    return new Promise((resolve, reject) =>{
      const image = new Image()
      image.src = src
      image.onload = () => {
        resolve(image)
      }

      image.onerror = reject

      document.body.appendChild(image)
    })
  }

  // 这里能得到加载后图片的对象, 比如加载完成后 再对图片进行处理
  loadImage('img/links/1.jpg').then((image) => {
    image.style.border = '1px solid red'
  })
 -->


### Promise.resolve 缓存后台数据
<!-- 
  Promise.resolve('后盾人').then(value => {     <resolved>
    console.log(value)
  })
 -->

- 有的时候我们在写单页面复应用的时候, 我们会在不同的组件里面可能会请求同一个数据, 既然是同一个数据 那么我希望走本地的缓存 不要反复的请求后台 减少请求次数 减少服务器的压力 前台用户的访问也会变快
<!-- 
  // name 请求的用户 请求谁
  function query(name) {
    return ajax('url').then(user => {   users就是请求的数据
      return user
    })
  }

  // 使用封装的query函数 请求 后盾人
  query('后盾人').then(user => {
    console.log(user)
  })


  // 现在有还有一个 1秒钟后的请求  但是 我不希望这个请求还要从后台读取 我希望它走缓存
  setTimeout(() => {
     query('后盾人').then(user => {
      console.log(user)
    })
  }, 1000)

 -->

- 我们先铺垫一个前提, 函数也是对象 我们也可以往函数中添加属性
<!-- 
  // 1. 我们创建一个空函数, 
  function hd() {} 

  // 2. 函数也是对象, 所以也可以添加属性
  hd.site = 'slnn2080.com'
  console.dir(hd)   // 里面有我们添加的site属性
-->

- 修改上面的函数
<!-- 
  function query(name) {

    // 定义缓存 我们先看看函数中有没有定义的缓存 如果没有这个属性就给它加上 是一个map类型
    const cache = query.cache || (query.cache = new Map())
  
    // 每次取的时候 我们要检查一下 在我们的缓存中是否有这个数据 如果有直接返回出去
    if(cache.has(name)) {

      // 返出去一个成功状态的promise
      return Promise.resolve(cache.get(name))
    }

    return ajax('url').then(user => {   users就是请求的数据

      // 当我们取完数据的时候 就把数据压入map中
      cache.set(name, user)   // key就是name 值为user
      return user
    })
  }

  走缓存了 实际上是没有发生异步请求的 因为return的是if里面的 还有一个需要注意地方 因为下面的ajax的请求是异步的 需要花费时间, 所以直接走缓存的时候 还没有取到数据 所以我们再调用的时候, 要加个延时定时器 确保先取到数据 之后再走缓存

  确保从后台拿完数据再走缓存

  setTimeout(() => {
     query('后盾人').then(user => {
      console.log(user)
    })
  }, 1000)

 -->



### async 与 await 语法糖
- 体验一下 promise的语法糖 享受一下甜甜的感觉
- 我们先复习一下 promise 怎么写
<!-- 
  new Promise((resolve, reject) => {
    console.log('后盾人');

    // 改变状态后 就会走then方法
    resolve('houdunren.com')
  }).then(value => console.log(value))

  上面是通过promise创建出来的对象, then是都状态改变的处理
 -->

- 我们在函数的前面加上 async 就类似于一个promise
<!-- 
  async function hd() {}
  console.log(hd())       // Promise <resolved>

  函数前加上async 就是promise已解决的状态
  那按道理来讲

  async function hd() {
    return 'houdunren.com'
  }

  // 既然async返回的是一个promise的成功状态 我们函数调用的后面就应该可以加上then
  hd().then(value => console.log(value))


  上面就是使用 async 创建的 Promise 主体部分的语法糖(成功状态下的语法糖)
  我们再来看看 then 的语法糖 await

  async function hd() {
    let name = await 'houdunren.com'
    console.log(name)
  }

  await就相当于then
  比如: 第一个then返回一个promise对象, 第二个then会接收到前一个promise对象的值
  .then(v => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve('后盾人')
      }, 2000)
    })
  })
  .then(v => {
    console.log('后盾人')     // 第二个then就能取到第一个then中promise的结果
  })

  就相当于使用await 就是then的简写
  async function hd() {
    let name = await 'houdunren.com'   它返回了一个结果 我们就let name来接收
    console.log(name)
  }

 -->