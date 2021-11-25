### Promise
- ES6中一个非常重要和好用的特性就是Promise, 它是异步编程的一种解决方案
- 那什么时候我们来处理异步事件呢? 
<!-- 
  一种很常见的场景应该就是网络请求, 我们封装一个网络请求的函数, 因为不能立即拿到结果, 所以不能像简单的3+4=7一样将结果返回, 所以往往我们会传入另一个函数, 在数据请求成功时, 将数据通过传入的函数回调出去, 如果只是一个简单的网络请求, 那么这种方案不会给我们带来很大的麻烦, 但是当网络请求非常复杂的时候, 就会出现回调地狱 
-->

> 简单的promise 和 普通的异步回调对比(回调地狱)
- 我们拿延时定时器当做异步任务(网络请求), 哪里面的console做为对请求回来的结果做处理的逻辑代码
<!-- 
  // 网络请求
  setTimeout(() = {

    // 对响应结果做处理的逻辑代码
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  })
 -->

- 接下来我们看下发Ajax中的回调地狱, 下面只有3次回调, 如果出现10次甚至更多的时候会变成什么样子
<!-- 
  $.ajax({
      url:'xxx',
      dataType: 'json',
      success(data1) {
          $.ajax({
              url:'xxx',
              dataType: 'json',
              success(data2) {
                  $.ajax({
                      url:'xxx',
                      dataType: 'json',
                      success(data3) {
                          // 完事了
                      },
                      error() {
                          alert('错了');
                      }
                  })
              },
              error() {
                  alert('错了');
              }
          })
      },
      error() {
          alert('错了');
      }
  })
 -->

- 接下来我们利用promise对上面的异步任务(网络请求)进行下封装
<!-- 
  new Promise((resolve, reject) => {
    
    // 第一次网络请求
    setTimeout(() => {
      resolve();
    }, 1000)
  }).then(() => {

    // 对第一次的请求结果进行处理
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')

    // 我们可以再返回一个Promise对象对第一次的返回结果里面的回调进行二次promise封装
    return new Promise((resolve, reject) => {

      // 第二次网络请求
      setTimeout(() => {
        resolve();
      }, 1000)
    }).then(() => {

      // 对第二次的请求结果进行处理
      console.log('我是内部处理数据的逻辑')
      console.log('我是内部处理数据的逻辑')
      console.log('我是内部处理数据的逻辑')

      // 继续返回promise对象, 再次封装
      return new Promise((resolve, reject) => {

        // 第三次网络请求
        setTimeout(() => {
          resolve();
        }, 1000)
      }).then(() => {

        // 对第三次的请求结果进行处理
        console.log('我是内部处理数据的逻辑')
        console.log('我是内部处理数据的逻辑')
        console.log('我是内部处理数据的逻辑')
      })
    })
  })
 -->

- 总结:
- 我们可以清晰的观察到首先我们使用promise避免了回调地狱
- 其次逻辑特别的清晰, 网络请求的部分都在promise对象里, 对请求返回的结果都在上一次promise对象中的网络请求所对应的then()放法里

- promise对网络请求的代码 和 处理请求回来的数据的代码做了分离
<!-- 这就是链式编程 -->


> 异步操作有哪些
- fs 文件操作
- 数据库操作
- ajax
- 定时器


> Promise优点
- 1. 支持链式调用, 可以解决回调地狱的问题
- 2. 指定回调函数的方式更加的灵活


> 我们简单对上面的promise使用做一个解析
- promise很简单就是对异步操作进行一些封装


> new Promise(参数是函数)
- Promise对象里面是函数, 函数中有两个参数
- 1. resolve  (解决)
  - 成功的时候调用resolve

- 2. reject   (拒绝)
  - 失败的时候调用reject
<!-- resolve 和 reject 本身又是两个函数 -->

- 一旦我们在Promise内部异步任务里调用resolve()方法, Promise的最后就会对应有then()方法来对成功的结果进行处理

- 一旦我们再Promise内部异步任务里调用reject()放法, Promise的最后就会对应有catch()方法来对错误信息进行处理

<!-- 
  new Promise((resolve, reject) => {

    ````````````````
    我们把异步任务放在这里, 而请求回来的数据, 对数据处理的逻辑放在then中
    ````````````````

  }).then(() => {
    
    ````````````````
    这里对处理异步任务的逻辑
    ````````````````
  })
-->

> 总结
- 也就是说promise对象, 把异步任务的请求 和 处理结果进行了分离
<!-- 
  new Promise((resolve, reject) => {

    // 异步任务(网络请求)
    setTimeout(() => {

      // 当成功的时候 我们要处理获取的请求结果, 并对请求结果进行处理, 我们调用resolve方法, 在这里我们获取的结果, 传递给then方法, 在then里进行
      resolve(data)

      // 当失败的时候, 我们调用reject()方法, 将错误信息传递给处理错误信息的地方
      reject('err msg')

    }, 1000)
  }).then((data, 接收的resolve传递过来数据) => {
    
    // 我们在这里对获取的数据做处理

  }).catch((err) => {

    // 我们在这里对错误信息进行处理

  })
 -->


- 下面我们用promise对异步任务进行一个封装
<!--

````````````````
  // 网络请求
  setTimeout(() = {

    // 对响应结果做处理的逻辑代码
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  })
````````````````

  // 我们对上面的网络请求使用promise对象进行封装
  new Promise((resolve, reject) => {
    
    setTimeout(() => {

      // 一旦在这里调用resolve()方法 我们可以同做resolve方法把data传到then里
      resolve(data);

    }, 1000)
  
  // 这里就会出现then()方法
  }).then((data) => {

    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  }
 -->

> Promise new之后的内部执行过程
- 当我们进行异步操作的时候就需要用到promise, 一般情况下是有异步操作时, 使用promise对这个异步操作进行封装

- 当执行new的时候, 它内部会执行构造函数, 构造函数内部(首先会保存一些状态信息, 然后执行我们传入的函数)

- 所以promise对象里面的回调并不是我们手动执行的, 而是构造函数内部在我们new了之后自动执行我们传入的函数

- 而在执行我们传入的回调函数时, 又传入了两个参数, resolve 和 reject 它俩本身又是函数

--------------------------

### Promise三种状态
- 首先, 当我们开发中有异步操作时, 就可以给异步操作包装一个Promise
- 异步操作之后会有三种状态
- 1. pending
  - 等待状态, 比如正在进行网络请求或者定时器没有到时间

- 2. fulfill
  - 满足状态, 当我们主动回调了resolve时, 就处于该状态, 并且会回调.then()

- 3. reject
  - 拒绝状态, 当我们主动回调了reject时, 就处于该状态, 并且会回调.catch()
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // 成功
      resolve('成功了');

      // 失败
      reject('失败了')
    }, 1000)

  }).then((data) => {
    console.log(data)   // 成功了

  }).catch(err => {
    console.log(err)    // 失败了
  })
 -->

        将这个异步操作包裹在   在Promise对象中      pending   
        Promise对象中         进行异步操作      ↗
异步操作    -- >    Promise    -- >            →   fulfill→resolve→then 
                                              ↘
                                                   reject→reject→catch
<!-- pending:  发送网络请求的过程就是一个等待的过程 -->


> Promise的另一种形式
- 原理和内部的流程都是一样的 只是书写格式不一样
- 1. 
  new Promise((resolve, reject) => {

  }).then().catch()

- 2. 
- 我们还可以在then方法中传入两个函数, 当成功的时候会执行第一个回调, 当失败了会执行第二个回调

  new Promise((resolve, reject) => {

  }).then(函数1, 函数2)

--------------------------

### Promise链式调用
> 链式调用1
- 上面我们接触了第一种链式调用的方式
- 我们在then()方法的最后, 使用return new Promise((resolve, reject) => {})的方式进行了链式调用
<!-- 
  new Promise((resolve, reject) => {
    
    setTimeout(() => {
      resolve();
    }, 1000)

  }).then(() => {

    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        resolve();
      }, 1000)
    })
  }.then(() => {

    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  }
 -->

> 注意 then()是连着下一个then()的后面的 上面的代码then()的位置我写错了
- 下面的例子中 我们看下 链式调用时, then()方法写在哪里
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa');
    }, 1000)

  }).then((data) => {
    // 1. 自己处理的10行代码
    console.log(data, '第一层的10行处理代码')

    return new Promise((resolve, reject) => {
      resolve(data + '111');
    })

  }).then((data) => {
    console.log(data, '第二层的10行处理代码');

    return new Promise((resolve, reject) => {
      resolve(data + '222');
    })

  }).then(data => {
    console.log(data, '第三层的10行处理代码');
  })
 -->


> 链式调用2
- 我们再来看看第二种链式调用
- 上面的链式调用我们是通过return new Promise((resolve, reject) => {})来实现的而我们new Promise的目的就是为了使用回调函数中的resolve函数, 所以Promise干脆提供了一个Api

> Promise.resolve()
- 将数据包装成Promise对象
- 是 new Promise(resolve => { })的简写

> Promise.reject()
- 将数据包装成Promise对象
- 是 new Promise(reject => { })的简写

- 我们就可以这样
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa');
    }, 1000)
  }).then((data) => {
    console.log(data, '第一层的10行处理代码')

    // 使用了Promise.resolve()方法
    return Promise.resolve(data + '111');


  }).then((data) => {
    console.log(data, '第二层的10行处理代码');

    // 使用了Promise.resolve()方法
    return Promise.resolve(data + '222');


  }).then(data => {
    console.log(data, '第三层的10行处理代码');
  })
-->


> 链式调用3
- 上面的方法我们还可以更加的简洁
- 当结果在then()方法中的时候, 我们直接return 内部会对结果进行自动包装成Promise对象, 并且内部会自动调用resolve()方法
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa');
    }, 1000)
  }).then((data) => {
    console.log(data, '第一层的10行处理代码')

    // 我的结果是在 then() 方法中可以直接return
    return data + '111';
    
  }).then((data) => {
    console.log(data, '第二层的10行处理代码');

    // 我的结果是在 then() 方法中可以直接return
    return data + '222'

  }).then(data => {
    console.log(data, '第三层的10行处理代码');
  })
 -->

> throw 'err'  catch() 捕获
- 之前的例子中, 我们大部分都写的是resolve, 而在网络请求的过程中, 我们还有请求失败的时候, 当请求失败的时候, 我们会将错误信息通过reject()传递给catch()或者then()的第二个回调来进行处理

- 这里不仅仅可以使用reject()来传递异常, 我们还可以通过 throw 手动抛出异常 让catch()来捕获之后进行处理

- 注意:
- 我是在第一次成功的基础上使用的throw 也就是说我是在then()方法中使用的throw
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa')
    }, 1000)
  }).then(data => {
    console.log(data);

    throw 'err'
  }).catch(err => {
    console.log(err)
  })
 -->


> 在NodeJs中的知识点总结
> 链式调用的部分
- 1. then().then() 第一个then()不管成功与否会执行第二个 
- 这就是链式调用的特点
<!-- 
  p1.then((data) => {}, (err) => {}).then((data) => {}, (err) => {})

  不管第一个then()是成功还是失败 第二个then()都会执行 
 -->

- 2. then() 方法中可以有返回值 这个返回值会被第二个then()中的形参接收
<!-- 
  p1.then(data => {
    console.log(data);

    return 123

  }).then(num => {
    console.log(num)  // 123
  })
 -->

- 3. 如果返回的是一个promise对象, 下一个then()的形参接收的不是promise对象, 而是promise对象中的resolve的实际参数
- 相当于把第一个then()方法中的promise对象中的成果结果 传递到第二个then()中
<!-- 
  let p1 = new Promise((resolve, reject) => {
    fs.readFile(filePath1, 'utf-8', (err, data) => {
      if(err) {
        reject(err)
      }
      resolve(data);    // data如果是 哈哈哈  返回的是 resolve(data) 中的参数
    })
  }).then((data) => {
    console.log(data);

    return p1
  }).then((data) => {
    console.log(data);  // 哈哈哈
  })
 -->

--------------------------

### Promise.all()方法
- 在实际开发中, 我们可能会遇到一种情况, 我们需要发送多次请求, 当所有的结果都返回后才能执行下一步的操作, 以前我们可能会这么做
<!-- 
  // 请求1
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果1')
    }
  })

  // 请求2
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果2')
    }
  })
 -->

- 我们用jQ的方式发送了两次请求, 但是网络请求没办法确定哪个先返回, 所有的结果有没有全部拿到
- 为了结果这个问题 我们进行了如下的操作
- 我定义了两个变量, 然后当两个变量能够进入成功的回调中的时候改成true, 然后我们在处理函数中进行判断, 处理
<!-- 
  定义两个变量, 默认都没有拿到
  let isResult1 = flase
  let isResult2 = flase


  // 请求1
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果1')

      // 一旦进来这里 我就将变量改为true
      isResult1 = true

      handleResult()
    }
  })

  // 请求2
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果2')

      isResult2 = true
      handleResult()
    }
  })


  定义最终处理数据的函数
  function handleResult() {
    if(isResult1 && isResult2) {

      // 如果两个变量都为true 意味着两次结果都返回了 然后再处理结果

    }
  }
 -->

- 以前我们遇到上面的需求需要这样操作, 现在我们可以利用Promise.all()方法

> Promise.all([])
- 一个个都得成功 一个不能缺一个不能少, 都成功后才会执行then()方法
- 参数:
- Promise.all() 中需要传入数组, 数组中包含每一个promise对象
- then() 中的参数也是一个数组, 包含着每一个成功的结果
<!-- 
  Promise.all([
    new Promise((resolve, reject) => {
      $.ajax({
        url:'url1',
        success: function(data) {
          resolve(data)
        }
      })
    }),

    new Promise((resolve, reject) => {
      $.ajax({
        url:'url2',
        success: function(data) {
          resolve(data)
        }
      })
    }),
  ]).then(results => {
    // results 是一个数组 我们通过下标的方式 获取上面的每一次和请求结果
    results[0]
    results[1]
  })
 -->

--------------------------

### 系统学习

### Promise

> 异步操作有哪些
- fs 文件操作
- 数据库操作
- ajax
- 定时器


> Promise优点
- 1. 支持链式调用, 可以解决回调地狱的问题
- 2. 指定回调函数的方式更加的灵活

--------------------------

### 案例模块

> 抽奖
- 点击按钮, 2s显示是否中奖(30%的概率)
  - 中奖 弹出 恭喜恭喜 奖品为10w
  - 未中 弹出 再接再厉


--

### Promise
- ES6中一个非常重要和好用的特性就是Promise, 它是异步编程的一种解决方案
- 那什么时候我们来处理异步事件呢? 
<!-- 
  一种很常见的场景应该就是网络请求, 我们封装一个网络请求的函数, 因为不能立即拿到结果, 所以不能像简单的3+4=7一样将结果返回, 所以往往我们会传入另一个函数, 在数据请求成功时, 将数据通过传入的函数回调出去, 如果只是一个简单的网络请求, 那么这种方案不会给我们带来很大的麻烦, 但是当网络请求非常复杂的时候, 就会出现回调地狱 
-->

> 简单的promise 和 普通的异步回调对比(回调地狱)
- 我们拿延时定时器当做异步任务(网络请求), 哪里面的console做为对请求回来的结果做处理的逻辑代码
<!-- 
  // 网络请求
  setTimeout(() = {

    // 对响应结果做处理的逻辑代码
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  })
 -->

- 接下来我们看下发Ajax中的回调地狱, 下面只有3次回调, 如果出现10次甚至更多的时候会变成什么样子
<!-- 
  $.ajax({
      url:'xxx',
      dataType: 'json',
      success(data1) {
          $.ajax({
              url:'xxx',
              dataType: 'json',
              success(data2) {
                  $.ajax({
                      url:'xxx',
                      dataType: 'json',
                      success(data3) {
                          // 完事了
                      },
                      error() {
                          alert('错了');
                      }
                  })
              },
              error() {
                  alert('错了');
              }
          })
      },
      error() {
          alert('错了');
      }
  })
 -->

- 接下来我们利用promise对上面的异步任务(网络请求)进行下封装
<!-- 
  new Promise((resolve, reject) => {
    
    // 第一次网络请求
    setTimeout(() => {
      resolve();
    }, 1000)
  }).then(() => {

    // 对第一次的请求结果进行处理
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')

    // 我们可以再返回一个Promise对象对第一次的返回结果里面的回调进行二次promise封装
    return new Promise((resolve, reject) => {

      // 第二次网络请求
      setTimeout(() => {
        resolve();
      }, 1000)
    }).then(() => {

      // 对第二次的请求结果进行处理
      console.log('我是内部处理数据的逻辑')
      console.log('我是内部处理数据的逻辑')
      console.log('我是内部处理数据的逻辑')

      // 继续返回promise对象, 再次封装
      return new Promise((resolve, reject) => {

        // 第三次网络请求
        setTimeout(() => {
          resolve();
        }, 1000)
      }).then(() => {

        // 对第三次的请求结果进行处理
        console.log('我是内部处理数据的逻辑')
        console.log('我是内部处理数据的逻辑')
        console.log('我是内部处理数据的逻辑')
      })
    })
  })
 -->

- 总结:
- 我们可以清晰的观察到首先我们使用promise避免了回调地狱
- 其次逻辑特别的清晰, 网络请求的部分都在promise对象里, 对请求返回的结果都在上一次promise对象中的网络请求所对应的then()放法里

- promise对网络请求的代码 和 处理请求回来的数据的代码做了分离
<!-- 这就是链式编程 -->


> 异步操作有哪些
- fs 文件操作
- 数据库操作
- ajax
- 定时器


> Promise优点
- 1. 支持链式调用, 可以解决回调地狱的问题
- 2. 指定回调函数的方式更加的灵活


> 我们简单对上面的promise使用做一个解析
- promise很简单就是对异步操作进行一些封装


> new Promise(参数是函数)
- Promise对象里面是函数, 函数中有两个参数
- 1. resolve  (解决)
  - 成功的时候调用resolve

- 2. reject   (拒绝)
  - 失败的时候调用reject
<!-- resolve 和 reject 本身又是两个函数 -->

- 一旦我们在Promise内部异步任务里调用resolve()方法, Promise的最后就会对应有then()方法来对成功的结果进行处理

- 一旦我们再Promise内部异步任务里调用reject()放法, Promise的最后就会对应有catch()方法来对错误信息进行处理

<!-- 
  new Promise((resolve, reject) => {

    ````````````````
    我们把异步任务放在这里, 而请求回来的数据, 对数据处理的逻辑放在then中
    ````````````````

  }).then(() => {
    
    ````````````````
    这里对处理异步任务的逻辑
    ````````````````
  })
-->

> 总结
- 也就是说promise对象, 把异步任务的请求 和 处理结果进行了分离
<!-- 
  new Promise((resolve, reject) => {

    // 异步任务(网络请求)
    setTimeout(() => {

      // 当成功的时候 我们要处理获取的请求结果, 并对请求结果进行处理, 我们调用resolve方法, 在这里我们获取的结果, 传递给then方法, 在then里进行
      resolve(data)

      // 当失败的时候, 我们调用reject()方法, 将错误信息传递给处理错误信息的地方
      reject('err msg')

    }, 1000)
  }).then((data, 接收的resolve传递过来数据) => {
    
    // 我们在这里对获取的数据做处理

  }).catch((err) => {

    // 我们在这里对错误信息进行处理

  })
 -->


- 下面我们用promise对异步任务进行一个封装
<!--

````````````````
  // 网络请求
  setTimeout(() = {

    // 对响应结果做处理的逻辑代码
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  })
````````````````

  // 我们对上面的网络请求使用promise对象进行封装
  new Promise((resolve, reject) => {
    
    setTimeout(() => {

      // 一旦在这里调用resolve()方法 我们可以同做resolve方法把data传到then里
      resolve(data);

    }, 1000)
  
  // 这里就会出现then()方法
  }).then((data) => {

    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  }
 -->

> Promise new之后的内部执行过程
- 当我们进行异步操作的时候就需要用到promise, 一般情况下是有异步操作时, 使用promise对这个异步操作进行封装

- 当执行new的时候, 它内部会执行构造函数, 构造函数内部(首先会保存一些状态信息, 然后执行我们传入的函数)

- 所以promise对象里面的回调并不是我们手动执行的, 而是构造函数内部在我们new了之后自动执行我们传入的函数

- 而在执行我们传入的回调函数时, 又传入了两个参数, resolve 和 reject 它俩本身又是函数

--------------------------

### Promise三种状态
- 首先, 当我们开发中有异步操作时, 就可以给异步操作包装一个Promise
- 异步操作之后会有三种状态
- 1. pending
  - 等待状态, 比如正在进行网络请求或者定时器没有到时间

- 2. fulfill
  - 满足状态, 当我们主动回调了resolve时, 就处于该状态, 并且会回调.then()

- 3. reject
  - 拒绝状态, 当我们主动回调了reject时, 就处于该状态, 并且会回调.catch()
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      // 成功
      resolve('成功了');

      // 失败
      reject('失败了')
    }, 1000)

  }).then((data) => {
    console.log(data)   // 成功了

  }).catch(err => {
    console.log(err)    // 失败了
  })
 -->

        将这个异步操作包裹在   在Promise对象中      pending   
        Promise对象中         进行异步操作      ↗
异步操作    -- >    Promise    -- >            →   fulfill→resolve→then 
                                              ↘
                                                   reject→reject→catch
<!-- pending:  发送网络请求的过程就是一个等待的过程 -->


> Promise的另一种形式
- 原理和内部的流程都是一样的 只是书写格式不一样
- 1. 
  new Promise((resolve, reject) => {

  }).then().catch()

- 2. 
- 我们还可以在then方法中传入两个函数, 当成功的时候会执行第一个回调, 当失败了会执行第二个回调

  new Promise((resolve, reject) => {

  }).then(函数1, 函数2)

--------------------------

### Promise链式调用
> 链式调用1
- 上面我们接触了第一种链式调用的方式
- 我们在then()方法的最后, 使用return new Promise((resolve, reject) => {})的方式进行了链式调用
<!-- 
  new Promise((resolve, reject) => {
    
    setTimeout(() => {
      resolve();
    }, 1000)

  }).then(() => {

    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')

    return new Promise((resolve, reject) => {

      setTimeout(() => {
        resolve();
      }, 1000)
    })
  }.then(() => {

    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
    console.log('我是内部处理数据的逻辑')
  }
 -->

> 注意 then()是连着下一个then()的后面的 上面的代码then()的位置我写错了
- 下面的例子中 我们看下 链式调用时, then()方法写在哪里
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa');
    }, 1000)

  }).then((data) => {
    // 1. 自己处理的10行代码
    console.log(data, '第一层的10行处理代码')

    return new Promise((resolve, reject) => {
      resolve(data + '111');
    })

  }).then((data) => {
    console.log(data, '第二层的10行处理代码');

    return new Promise((resolve, reject) => {
      resolve(data + '222');
    })

  }).then(data => {
    console.log(data, '第三层的10行处理代码');
  })
 -->


> 链式调用2
- 我们再来看看第二种链式调用
- 上面的链式调用我们是通过return new Promise((resolve, reject) => {})来实现的而我们new Promise的目的就是为了使用回调函数中的resolve函数, 所以Promise干脆提供了一个Api

> Promise.resolve()
- 将数据包装成Promise对象
- 是 new Promise(resolve => { })的简写

> Promise.reject()
- 将数据包装成Promise对象
- 是 new Promise(reject => { })的简写

- 我们就可以这样
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa');
    }, 1000)
  }).then((data) => {
    console.log(data, '第一层的10行处理代码')

    // 使用了Promise.resolve()方法
    return Promise.resolve(data + '111');


  }).then((data) => {
    console.log(data, '第二层的10行处理代码');

    // 使用了Promise.resolve()方法
    return Promise.resolve(data + '222');


  }).then(data => {
    console.log(data, '第三层的10行处理代码');
  })
-->


> 链式调用3
- 上面的方法我们还可以更加的简洁
- 当结果在then()方法中的时候, 我们直接return 内部会对结果进行自动包装成Promise对象, 并且内部会自动调用resolve()方法
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa');
    }, 1000)
  }).then((data) => {
    console.log(data, '第一层的10行处理代码')

    // 我的结果是在 then() 方法中可以直接return
    return data + '111';
    
  }).then((data) => {
    console.log(data, '第二层的10行处理代码');

    // 我的结果是在 then() 方法中可以直接return
    return data + '222'

  }).then(data => {
    console.log(data, '第三层的10行处理代码');
  })
 -->

> throw 'err'  catch() 捕获
- 之前的例子中, 我们大部分都写的是resolve, 而在网络请求的过程中, 我们还有请求失败的时候, 当请求失败的时候, 我们会将错误信息通过reject()传递给catch()或者then()的第二个回调来进行处理

- 这里不仅仅可以使用reject()来传递异常, 我们还可以通过 throw 手动抛出异常 让catch()来捕获之后进行处理

- 注意:
- 我是在第一次成功的基础上使用的throw 也就是说我是在then()方法中使用的throw
<!-- 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('aaa')
    }, 1000)
  }).then(data => {
    console.log(data);

    throw 'err'
  }).catch(err => {
    console.log(err)
  })
 -->


> 在NodeJs中的知识点总结
> 链式调用的部分
- 1. then().then() 第一个then()不管成功与否会执行第二个 
- 这就是链式调用的特点
<!-- 
  p1.then((data) => {}, (err) => {}).then((data) => {}, (err) => {})

  不管第一个then()是成功还是失败 第二个then()都会执行 
 -->

- 2. then() 方法中可以有返回值 这个返回值会被第二个then()中的形参接收
<!-- 
  p1.then(data => {
    console.log(data);

    return 123

  }).then(num => {
    console.log(num)  // 123
  })
 -->

- 3. 如果返回的是一个promise对象, 下一个then()的形参接收的不是promise对象, 而是promise对象中的resolve的实际参数
- 相当于把第一个then()方法中的promise对象中的成果结果 传递到第二个then()中
<!-- 
  let p1 = new Promise((resolve, reject) => {
    fs.readFile(filePath1, 'utf-8', (err, data) => {
      if(err) {
        reject(err)
      }
      resolve(data);    // data如果是 哈哈哈  返回的是 resolve(data) 中的参数
    })
  }).then((data) => {
    console.log(data);

    return p1
  }).then((data) => {
    console.log(data);  // 哈哈哈
  })
 -->

--------------------------

### Promise.all()方法
- 在实际开发中, 我们可能会遇到一种情况, 我们需要发送多次请求, 当所有的结果都返回后才能执行下一步的操作, 以前我们可能会这么做
<!-- 
  // 请求1
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果1')
    }
  })

  // 请求2
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果2')
    }
  })
 -->

- 我们用jQ的方式发送了两次请求, 但是网络请求没办法确定哪个先返回, 所有的结果有没有全部拿到
- 为了结果这个问题 我们进行了如下的操作
- 我定义了两个变量, 然后当两个变量能够进入成功的回调中的时候改成true, 然后我们在处理函数中进行判断, 处理
<!-- 
  定义两个变量, 默认都没有拿到
  let isResult1 = flase
  let isResult2 = flase


  // 请求1
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果1')

      // 一旦进来这里 我就将变量改为true
      isResult1 = true

      handleResult()
    }
  })

  // 请求2
  $.ajax({
    url: '/server',
    success: function() {
      console.log('结果2')

      isResult2 = true
      handleResult()
    }
  })


  定义最终处理数据的函数
  function handleResult() {
    if(isResult1 && isResult2) {

      // 如果两个变量都为true 意味着两次结果都返回了 然后再处理结果

    }
  }
 -->

- 以前我们遇到上面的需求需要这样操作, 现在我们可以利用Promise.all()方法

> Promise.all([])
- 一个个都得成功 一个不能缺一个不能少, 都成功后才会执行then()方法
- 参数:
- Promise.all() 中需要传入数组, 数组中包含每一个promise对象
- then() 中的参数也是一个数组, 包含着每一个成功的结果
<!-- 
  Promise.all([
    new Promise((resolve, reject) => {
      $.ajax({
        url:'url1',
        success: function(data) {
          resolve(data)
        }
      })
    }),

    new Promise((resolve, reject) => {
      $.ajax({
        url:'url2',
        success: function(data) {
          resolve(data)
        }
      })
    }),
  ]).then(results => {
    // results 是一个数组 我们通过下标的方式 获取上面的每一次和请求结果
    results[0]
    results[1]
  })
 -->


--------------------------

### 案例模块

> 抽奖
- 点击按钮, 2s显示是否中奖(30%的概率)
  - 中奖 弹出 恭喜恭喜 奖品为10w
  - 未中 弹出 再接再厉