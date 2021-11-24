### Event Loop
- 异步和多线程的实现是通过event loop事件循环机制来实现的, 大体有三个部分组成
- 调用栈
        call stack

- 消息队列
        message queue

- 微任务队列
        microtask queue

- js是单线程的 干活的时候只有一个人在干活
- js中有一个主线程, 同一时间只能干一件事 不能干多个事情, 所以有一个队列
- js主线程的任务处理完成后, 再去队列里面抓取任务去处理, 没有任务就休眠


> 宏任务队列
- 同步代码会放到主线程中立刻执行, 异步代码会放到队列中等待同步代码执行完毕后再执行
<!-- 
    setTimeout(function() {
        console.log(1)
    }, 0)

    console.log(2)

    顺序 2 1
 -->


> 微任务队列
- promise也一样, promise会放到微任务队列里面
<!-- 
    setTimeout(function() {
        console.log(1)
    }, 0)

    Promise.resolve().then(value => {
        console.log(2)
    })

    console.log(3)

    顺序 3 2 1
 -->


> 微任务的优先级要 高于 宏任务
- 微任务里面执行完后再去宏任务里面找

------------------------

### 定时器的任务编排
- 我们系统里面有一个 定时器模块 专门记录定时器的, 
- 当解析到定时器的代码部分的时候就会记录定时器, 当时间到的时候就会把任务放在队列当中等待下一次的轮询 把任务拿到主线程来执行
<!-- 
    setTimeout(function() {
        console.log(1)
    }, 4)       这个位置即使是写0 其实也会4毫秒后执行

    console.log(3)
 -->

- 上面不会到时间了立刻输出 还是需要排队的 等待线程里面的工作完成, 然后再去轮询队列 再把你取出来执行

- 还有 比如我们有一个定时器 那是什么时间开始计时?
- 1. 等排队到它之后开始计时(等主线程的任务完成之后开始计时?)
- 2. 定时器模块记录的时候就开始计时?
<!-- 
    当系统解析到定时器代码的时候 已经放入定时器模块里了 它已经开始计时了 到时间后定时器模块会把任务放到任务队列里面 
    等主线程空了之后 直接拿过来直接执行
 -->

- 假如我们有两个定时器
<!-- 
    情况1 都是2秒

    setTimeout(function() {
        console.log(1)
    }, 2000) 


    setTimeout(function() {
        console.log(2)
    }, 2000) 

    定时器模块等定时器到时间后把它们放到任务队列里面, 主线程里面没有任务里就从任务队列中取出任务执行

    +---------+     队列前面
    +   定1   +
    +---------+
    +---------+
    +   定2   +
    +---------+     队列后面

    执行顺序 1 2




    情况2 时间不同
    setTimeout(function() {
        console.log(1)
    }, 2000) 


    setTimeout(function() {
        console.log(2)
    }, 1000) 

    意味着2会被先放到任务队列里面 1会被放到2的下面

    +---------+     队列前面
    +   定2   +
    +---------+
    +---------+
    +   定1   +
    +---------+     队列后面

    因为2的时间是1秒会先放入上面 2秒的1放到下面
    
 -->

> 总结:
- 放到任务队列里面是从上到下的顺序放 所以输出也是从上到下的顺序输出

------------------------

### promise微任务处理逻辑
- promise是微任务的代表
<!-- 
    setTimeout(function() {
        console.log('定时器')
    }, 0)

    new Promise(resolve => {
        console.log('promise')
        resolve()
    })

    console.log('console')


    执行顺序  promise   console   定时器



    情况2
    - 我们给promise的后面加上一个then

    setTimeout(function () {
        console.log('定时器')
    }, 0)

    new Promise(resolve => {
        console.log('promise')
        resolve()
    }).then(() => {
        console.log('then')
    })

    console.log('console')

    执行顺序  promise   console   then   定时器



    情况3 
    - 我们再在定时器里面加上 new Promise
    setTimeout(function () {
        congsole.log('定时器')                      它
        new Promise(resolve => {                        是一起执行的
            console.log('setTimeout promise')       它
            resolve()
        }).then(() => {
            console.log('setTimeout then')
        })
    }, 0)

    new Promise(resolve => {
        console.log('promise')
        resolve()
    }).then(() => {
        console.log('then')
    })

    console.log('console')

    执行顺序  promise console then setTimeout promise setTimeout then
 -->

- new Promise() 括号中的代码是会立即执行的 这个部分的代码是同步代码
- new Promise().then() 其中的then()会放到微任务里面

- 情况3中 是等setTimeout的宏任务被执行之后, 再往微任务里面放的

------------------------

### 进度条实例 体验任务轮询
<!-- 
    function handle() {
        let i=0;
        (function run() {
            setTimeout(run, 100)
        })()
    }
    handle()

    我们先来看看上面的代码
    我们调用 handle() 函数, handle函数里面有一个立即执行函数会生成一个定时器
    我们在定时器里面又调用了run函数 又生成定时器 周而复始

    定时器不会马上执行 而是通过定时器模块放入到 宏任务队列里面

    所以在任务队列里面就会不断的抛进去很多的定时器任务
    当我们主线程的代码执行完毕后这些任务就会依次的放入到主线程当中 依次执行

    上面我们定义了变量 i=0 它是立即执行的代码(同步) 执行的时候就会在内存中创建数据, i=0

    宏任务里面的任务最终都会被调入到主线程里面执行 所以主线程中内存中的数据是可以享用的到的
    也即使说每一个定时器里面也可以读到这个i的

    function handle() {
        let i=0;
        (function run() {
            setTimeout(function() {
                console.log(i)      // 0
                run();              // 换个结构还原下上面的例子
            }, 100)
        })()
    }
    handle()

    屏幕上会不断的打印 0000000000000
    因为我们无休止的创建定时器, 每个定时器都能不断的打印i 读到i

    因为队列里面的任务, 在主线程中执行, 数据是可以共享的(i在主线程中的内存里)

    接下来我们不能无休止的往宏任务队列里面添加任务
    来个条件
    function handle() {
        let i=0;                这个数据放在了函数体外 做为共享
        (function run() {
            if(++i<=100) {
                console.log(i)
                setTimeout(run, 100)
            }
        })()
    }
    handle()
 -->

- 接下来我们看看进度条的实现原理

- 要点：
- 循环内部的条件的考虑方式
- 1. 停止循环的条件
- 2. 在哪个范围内持续的条件(返回来就是停止循环的条件)

**注意：**
- (function run() {})() 的前面一定要加上分号
<!-- 
    function handle() {
        let i=0;
        (function run() {
            hd.innerHTML = i;
            hd.style.width = i + '%'
            if(++i<=100) {
                console.log(i)
                setTimeout(run, 100)
            }
        })()
    }
    handle()

    1. 我们创建了一个handle函数 里面包裹了立即执行函数run 
    2. run函数里面创建了定时器 定时器中又会执行run函数, 这样就会不断的往宏任务队列中抛任务 该任务会在主线程中没有任务后调入到主线程中执行

    3. 在run函数外层 我们创建了 let i=0 因为是外层是自己执行 相当于在主线程的内容里面创建了一个变量, 因为宏任务之后也会调入主线程中执行 所以该数据是共享的

    4. 在run函数中不断的往div中输出数字 不断的改变长度, 同时我们还加上了终止的条件

    这就是进度条的原理 

    注意一点 ++i 得让1自增 要不就没有变化
 -->

------------------------

### 将复杂的任务拆分成一个个的小任务
<!-- 
    let num = 98765
    let count = 0
    function hd() {
        for(let i=0; i<num; i++) {
            count += num--
        }
        console.log(count)
    }
    hd()
    console.log('laoshi')

    打印结果 数字   laoshi

    上面的代码中 我们定义了一个num 让它在hd函数中不断的相加直到num为0
    当上面的数字太大的时候, console的语句就得等hd执行完毕 才能得到执行

    假如我们想让console语句先执行 至于相加的操作你以后再执行 不要影响console的输出那么应该怎么做?
 -->

<!-- 
    let num = 98765
    let count = 0

    // 我将要计算量大的整个逻辑放在一个函数里面 然后在合适的条件的位置 将这个函数放到setTimeout里面去执行
    function hd() {
        for(let i=0; i<num; i++) {
            if(num <= 0) break
            count += num--
        }
        if(num > 0) {
            setTimeout(hd)
        } else {
            console.log(count)
        }
    }
    hd()
    console.log('laoshi')

    hd函数是用来做累加操作的 我们在hd函数里面执行定时器 在定时器里面再次执行hd
    整个的过程又是在不断的往宏任务队列里面抛任务 这样就把主线程让出来了 会先打印老师

    总结:
    同步执行的时候 上面的代码如果计算量太大 那么就会阻塞下面代码的执行 所以这时候我们就可以将计算量大的部分拿到宏任务队列里面去执行 把主线程让出来
-->

------------------------

### 这里我们使用promise解决上面的问题
- 我们希望把数字的累加的过程在异步来完成而不是同步





------------------------

- event loop开始时 会从全局代码一行一行的执行
- 遇到函数调用会把它压入调用栈中 被压入的函数叫做帧 frame
- 当函数返回后会从调用栈里面弹出
<!-- 
    比如这段代码

    function func1() {
        console.log(1);
    }

    function func2() {
        console.log(2);
        func1();
        console.log(3);
    }

    func2();

    这段代码在执行时, 
    7.                  然后func2执行完毕                               弹出整个调用栈被清空 
    6. console.log(3)   最后console.log(3)压入调用栈中                  打印出3   然后弹出调用栈
    5.                  然后func1执行完毕                               弹出调用栈
    4. console.log(1)   去执行func1中代码, console.log(1)被压入栈       打印出2   然后弹出调用栈
    3. func1()          然后依次执行到func1() 把它压入调用栈中
    2. console.log(2)   遇到console.log(2) 把它再压入调用栈中           打印出2   然后弹出调用栈
    1. func2            会先把func2压入调用栈中 执行它里面的代码
 -->

> js中的延时器等异步任务会进去到消息队里中, 在调用栈被清空后依次压入调用栈执行
<!-- 
    function func1() {
        console.log(1);
    }

    function func2() {
        setTimeout(function(){
            console.log(2);
        },1000)

        func1();
        console.log(3);
    }

    func2();

    这段代码在执行时,

    2. setTimeout(function(){       然后把setTimeout整体压入调用栈                  console.log(2)会被压入 --- > 消息队列中
            console.log(2);
        },1000)
    1. func2();                     会先把func2压入调用栈中 执行它里面的代码


    >>> 消息队列会在调用栈被清空的时候再执行 这也是setTimeout的延迟参数只是最小的延迟时间

    >> 当调用栈的任务队列清空后, 消息队列的任务会被压入调用栈中 最后打印出2

    // 最后结果 1 3 2
 -->

> 使用promise创建的异步任务会添加到微任务队列中, 它会在调用栈被清空后立即执行, 并且处理期间新加入的异步任务也会一同执行
>> 微任务队列 先执行 完毕后 再执行消息队列中的任务
<!-- 
    例如下面代码

    let p = new Promise(resolve => {
        console.log(4)
        resolve(5)
    })

    function fun1() {
        console.log(1);
    }

    function func2() {
        setTimeout(function(){
            console.log(2);
        },1000)

        func1();
        console.log(3);
        p.then(resolve => {
            console.log(resolved)
        }
        .then(()=> {
            console.log(6);
        })
        )

    func2();

    4.                      内部代码执行完毕后, 弹出栈
    3. resolve(5)           压入调用栈然后被执行, 然后弹出栈
    2. console.log(4);      压入调用栈然后被执行, 然后弹出栈
    1. new Promise          这个构造函数首先被压入调用栈中
 -->