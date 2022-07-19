### 数组:
- 数组是一种线性结构 并且可以在数组的 *任意位置 插入 和 删除 数据* 但有时候 我们为了实现某些功能功能 必须*对这种任意性加以限制*

- 而 栈 和 队列 就是比较常见的 受限的线性结构

----------------

### 栈结构 (栈顶)
> 要点:
- 1. 栈结构只能操作 *栈顶(数组末尾push)* 的元素

    |    Top    |
    |           |
    |           |
    |           |
    |   Bottom  |
    -------------

> 栈:
- 它是一种受限的线性表
- 其限制是仅允许在 表的一端 进行插入和删除运算 
- 这一端被称为栈顶 相对的 把另一端称为栈底

- 进栈
- 向一个栈插入新元素又称作进栈 入栈 压栈 它是把新元素放到栈顶元素的上面 使之成为新的栈顶元素

- 出栈
- 从一个栈删除元素又称作出栈或退栈 它是把栈顶元素删除掉 使其相邻的元素成为新的栈顶元素


> 特点:
- 后进先出(LIFO)
- LIFO(last in first out)表示就是后进入的元素 第一个弹出栈空间 类似自助餐准备的托盘架 *最后放上的托盘 往往先被拿出去使用*


> 栈结构在程序中的应用
- 函数调用栈
- 我们知道函数之间 互相调用: a 调用 b, b 调用 c, c 又调用 d
- 那么在执行的过程中 会将 a 压入栈 a 没有执行完 所以不会弹出栈

- 在 a 执行的过程中 调用了 b 那么会将 b 压入栈 这时候 b 在栈顶 a 在栈底

- 如果这个时候 b 可以执行完 那么 b 会弹出栈 但是 b 有执行完么? 没有 它调用了 c

- 所以 c 会压栈 并且在栈顶 而 c 调用了 d, d 会压入到栈顶 所以当前的栈顺序是

    |   D   |
    |   C   |
    |   B   |
    |   A   |
    ---------

- d 执行完会弹出栈 c b a 依次弹出栈 所有我们有函数调用栈的称呼 就来自于他们内部的实现机制

**注意:**
- 递归就是不断的在压栈 没有出口的话 会抛出栈溢出的错误

----------------

### 栈结构的实现
- 实现栈结构有两种比较常见的方式:
- 1. 基于数组的实现
- 2. 基于链表的实现

- 我们下面利用数组来封装一个栈结构, 其实就是对数组的一层封装 让它有栈的特性 其实本质来说就是一个数组


> 栈常见的操作
- 1. push(el)
- 添加一个新元素到栈顶的位置

- 2. pop()
- 移除栈顶的元素(出栈) 同时返回被移除的元素

- 3. peek()
- 返回栈顶的元素(查看栈顶元素) 不对栈做任何修改(这个方法不会移除栈顶元素 仅仅是返回它)

- 4. isEmpty()
- 如果栈里没有任何元素返回 true 否则返回false

- 5. size()
- 返回栈里的元素个数
- 这个方法和数组的length属性很类似

- 6. toString()
- 将栈结构的内容以字符串的形式返回


> 代码实现
> 要点:
- 1. 下面是采用 class 类的方式 定义的方法 在class中定义的方法会在其 原型对象 上
- 当我们没有使用 class(使用的function) 创建类的时候 我们在定义方法的时候 要采用下面的方式
```js
Stack.prototype.push = function(el) { ... }
```

- 2. 要注意 size()方法 因为它内部返回的是 数组length 所以它的值是动态的 所以最好不要根据size()方法的返回值 决定for循环的次数


```js
class Stack {

  items = []

  // 入栈
  push(el) {
    this.items.push(el)
  }

  // 出栈
  pop() {
    return this.items.pop()
  }

  // 查看栈顶元素
  peek() {
    return this.items[this.items.length - 1]
  }

  // 判断是否为空
  isEmpty() {
    return this.items.length == 0
  }

  // 栈中元素个数
  size() {
    return this.items.length
  }

  // toString
  toString() {
    console.log(JSON.stringify(this.items, null, 2))
  }

}

```

- 使用:
```js
let stack = new Stack()

stack.push("a")
stack.push("b")
stack.push("c")
stack.push("d")

let len = stack.size()

for(let i=0; i<len; i++) {
  console.log(stack.pop())  // d c b a
}


// 为什么不直接只用stack.size()
for(let i=0; i<stack.size(); i++) {
  console.log(stack.pop())  // d c
}
// 因为 stack.size() 是 lenth 是动态变化的 所以只能打印出来两个
```


> 栈的应用: 10进制转为2进制
- 思路:
- 将10进制数字和2整除 直到结果为0为止

- 除以2取余的逆
- 这个数除以2得到的商继续除以2 看余数的部分

- 20 / 2  = 商 10  余数 0
- 10 / 2  = 商 5   余数 0
- 5 / 2   = 商 2   余数 1
- 2 / 2   = 商 1   余数 0
- 1 / 2   = 商 0   余数 1

- 取余数的逆: 10100

- 当我们做从后往前依次取结果的时候 就跟栈的特性一致了

> 思路:
- 我们可以把每一步的余数压入栈 然后出栈 是不是就是取逆

- 我们要在每次循环中得到 *商 和 余数*

> 循环退出的条件:
- 商 <= 0 的时候退出循环 那么同理 一直循环的条件就是 商 > 0

```js
function dec2bin(decNum) {

  let stack = new Stack()

  // 我们要得到 每次的 商 和 余数
  while(decNum > 0) {
    // 获取余数 放入栈中
    stack.push(decNum % 2)

    // 获取商 作为下一次运算的数字
    decNum = Math.floor(decNum / 2)
  }

  // 出栈
  let binString = ""

  // 说明还有元素
  while(!stack.isEmpty()) {
    binString += stack.pop()
  }

  return Number(binString)  
}

let res = dec2bin(20)
console.log(res)    // 10100
```

> 还有: 中缀表达式 转为 后缀表达式
- https://zhuanlan.zhihu.com/p/102592396

----------------

### 队列结构 (先进先出 核酸排队) FIFO
- 队列只允许在
  表的前端进行删除(元素)操作 shift()
  表的后端进行插入(元素)操作 push()

<!-- 
    前端                           后端
    ---------------------------------

    ← 出队列                   ← 入队列

    ---------------------------------
 -->


> 队列的应用
- 1. 打印队列:
- 有5份文档需要打印 这些文档会按照次序放入到 打印队列里面 打印机会依次从队列中取出文档 优先放入的文档 优先被取出 并且对该文档进行打印 直到队列中不再有新的文档

- 2. 线程队列:
- 在开发中为了让任务可以并行处理 通常会开启多个线程 但是我们不能让大量的线程同时运行处理任务(占用过多的资源) 这个时候 如果有需要开启线程处理任务的情况 我们就会使用线程队列 线程队列会依照次序来启动线程 并且处理对应的任务


> 队列的实现
- 实现方式2种:
- 1. 基于数组
- 2. 基于链表(队列基于链表的话 性能会更高)
<!-- 
  因为用数组实现的队列 在元素出队列也就是shift()的时候 第一个元素删除了 后面的元素都会依次的前移 那假如有几万个元素呢? 
 -->


> 队列的常见的操作
- 1. enqueue(el)
- 向队列尾部添加一个或多个新的项

- 2. dequeue()
- 移除队列的第一(最前面)的项 并返回被移除的元素

- 3. front()
- 返回队列中的第一个元素(最先被添加的) 队列不做任何变动(只返回第一个元素)
- 也就是索引为0的元素

- 4. isEmpty()
- 如果队列里没有任何元素返回 true 否则返回false

- 5. size()
- 返回队列里的元素个数
- 这个方法和数组的length属性很类似

- 6. toString()
- 将栈结构的内容以字符串的形式返回


> 代码实现
```js
class Queue {

  items = []

  // 入队列
  enqueue(el) {
    this.items.push(el)
  }

  // 出队列
  dequeue() {
    return this.items.shift()
  }

  // 队列中元素的个数
  size() {
    return this.items.length
  }

  // 查看队列前端元素
  front() {
    return this.items[0]
  }

  // 检查队列是否为空
  isEmpty() {
    return this.items.length == 0
  }

  // 打印队列
  toString() {
    console.log(JSON.stringify(this.items, null, 2))
  }
}


// 演示:
let queue = new Queue()

queue.enqueue("a")
queue.enqueue("b")
queue.enqueue("c")

let str = ""

// 使用 while 循环
while(!queue.isEmpty()) {
  str += queue.dequeue()
}

console.log(str)
```


> 队列的应用: 击鼓传花
- 原游戏规则:
- 班级中玩一个游戏 所有学生围成一圈 从某位同学手里开始向旁边的同学传一束花 这个时候某个人(比如班长)在击鼓 鼓声停下的一刻 花落在谁手里 谁就出来表演节目

- 修改游戏规则:
- 几个朋友一起玩一个游戏 围成一圈 开始数数 数到某个数字(5的人自动淘汰 最后剩下的这个人会获得胜利 请问最后剩下的*是原来在哪一个位置上的人(或者是谁 name 或者剩下最后那个人所在的下标)*


> 思路:
- 利用队列
- 1. 从第一个人开始 让人依次加入队列里面
- 2. 从1开始数 数1的人去队列的尾部 依次类推 当到目标值的时候(5) 的时候 删除这个人

- 3. 然后再继续 数1的人去队列的尾部 以此类推
- 4. 当 size == 1 的时候 停掉 我们拿着这个人去原数组取它的下标值
```js

function passGame(nameList, num) {

  // 创建队列
  let queue = new Queue()

  // 将人加到队列中
  nameList.forEach(item => {
    queue.enqueue(item)
  })

  // 开始数数 不是num的时候重新加入到队列的尾部 是num的元素删掉
  /*
    i < num - 1: 
      比如 num 为 3

      ["sam", "erin", "nn", "laoye", "bobo"]

      sam erin 会移动队列的末尾 nn会被淘汰 应为从0开始所以是 num - 1
        1       2      3
      "sam", "erin", "nn"
  */

  // 条件剩最后一个人
  while(queue.size() > 1) {
    // 这个部分的逻辑要重复执行所以外层套一个while
    for(let i = 0; i < num - 1; i++) {
      // 先把这些人从前端删掉 再加到队列的尾部 把删除的元素加到队列的尾部
      queue.enqueue(queue.dequeue())
    }
    // num数字之前的人重新放到队列的末尾 然后删掉 前端的人(num对应的人)
    queue.dequeue()
  }

  // 获取剩下的那个人
  console.log(queue.front())

  let target = queue.dequeue()
  // 返回那个人的下标(位置)
  console.log(nameList.indexOf(target))
  
}

passGame(["sam", "erin", "nn", "laoye", "bobo"], 3)
```

----------------

### 优先级队列结构
- 普通的队列插入一个元素 数据会被放在*后端* 并且需要前面所有的元素都处理完成后才会处理该元素

- 但是优先级队列 在插入一个元素的时候会考虑*该数据的优先级 和 其它数据优先级进行比较*

- 比较完成后 可以*得到这个元素在队列中正确的位置* 其它的处理方式和基本队列的处理方式一样

- 也就是说在每个元素不再只是一个数据 而是包含数据的优先级 *在插入的时候根据优先级放入正确的位置*


> 优先级队列的应用
- 现实的例子: 机场登机的顺序
- 头等舱的商务舱的优先级要高于经济舱 在有些国家老年人和孕妇登机时也享有高于其他乘客的优先级

- 计算机中
- 我们可以通过优先级队列来重新排序队列中的任务的顺序
- 比如每个线程处理的任务重要性不同 我们可以通过优先级的大小 来决定该线程在队列中被处理的次序


> 要点:
- 当我们要往队列中插入数据的时候 需要提供两个数据
- 1. 准备插入的元素
- 2. 当前这个元素的优先级

- 比如, 我们以数字做为它的优先级 *数字越小, 优先级越高*
- 每一个数据项不仅仅要包含数据还要包含该数据的优先级

```js
// 数据项
class QueueItem {
  constructor(el, priority) {
    this.el = el
    this.priority = priority
  }
}


// 优先级队列
class priorityQueue {

  // 保存数据用的数组 数组的类型应该是 {数据项}[] 每一个数据项里面应该既包含数据也包含该数据的优先级
  items = []

  // 将元素插入队列的时候 要传入数据和该数据的优先级
  enqueue(el, priority) {
    let queueEl = new QueueItem(el, priority)
    
  }
}
```

- 上面的要点:
- 我们创建了一个类 专门用于表示 数据项
- 其中有 数据 和 优先级


> 接下来的部分就是 按照优先级 将数据插入队列
- 我们分为两种情况考虑
- 1. 原来的队列中没有任何的数据 这时候我们可以直接插入
- 2. 原来的队列中有数据 我们需要拿出队列中数据的优先级 和 要插入的数据的优先级 进行比较

- 如果发现 优先级比队列中的数据的优先级小 则放在队列中已有数据的前面(我们要将要插入的数据和队列中已有数据依次比较找到位置)

- 我们要将队列中的数据使用for循环一个个取出来 和 我们要插入的数据 进行比较


> 代码实现:
```js
// 数据项
class QueueItem {
  constructor(el, priority) {
    this.el = el
    this.priority = priority
  }
}


// 优先级队列
class priorityQueue {

  items = []

  enqueue(el, priority) {
    let queueEl = new QueueItem(el, priority)
    
    // 判断队列是否为空
    if(this.isEmpty()) {
      // 直接插入数据
      this.items.push(queueEl)
    } else {
      // 队列中有数据的情况 我们要进行比较

      let flag = false

      for(let i=0; i < this.items.length; i++) {

        if(queueEl.priority < this.items[i].priority) {
          // 使用splice()在指定元素 指定位置前面 插入元素
          this.items.splice(i, 0, queueEl)

          // 当插入后 我们将 flag 修改为true 表示已经插入了
          flag = true

          // 后面就不用继续比较了
          break

        }
      }

      // 判断 如果上面没有添加的话 说明依次比较后 要插入的数据的优先级数字最大 那就要放在队列的最后
      if(!flag) {
        this.items.push(queueEl)
      }
    }
  }

  isEmpty() {
    return this.items.length == 0
  }

  toString() {
    console.log(JSON.stringify(this.items, null, 2))
  }

  // ... 其它方法和普通队列的方法一样
}


// 验证
let pq = new PriorityQueue()
pq.enqueue("sam", 100)
pq.enqueue("erin", 2)
pq.enqueue("nn", 3)

pq.toString()
```

----------------

### 链表结构
- 链表和数组一样 可以用于存储一系列的元素 但是链表和数组的实现机制是完全不同

> 数组的缺陷:
- 要存储多个元素 数组(或成为列表) 可能是最常用的数据结构 但是数组也有很多的缺点

- 1. 数组的创建通常需要申请一段连续的内存空间(一整块的内存) 并且大小是固定的 所以当当前数组不能满足容量需求时 需要扩容(一般情况下是申请一个更大的数组 比如2倍 然后将原数组的元素复制过去)

- 2. 在数组开头或中间位置插入数据的成本很高 需要进行大量元素的位移 尽管我们学的js的Array封装的十分便利 但背后的原理仍然是这样


> 链表的优势
- 我们在存储多个元素的时候 还可以考虑使用链表的结构 它与数组不同 链表中的元素在内存中不必是连续的空间 

- 链表的每个元素由一个存储*元素本身的节点* 和一个 *指向下一个元素的引用*(有些语言成为指针或者连接)组成


- 优势:
- 1. 内存空间不是必须连续的 可以充分利用计算机的内存 实现灵活的内存动态管理
- 2. 链表不必在创建时就确定大小 并且大小可以无限的延伸下去
- 3. 链表在 *插入* 和 *删除* 数据时 *时间复杂度*可以达到O(1) 相对数组的效率高很多


> 链表的缺点
- 数组的话 在访问元素这点 十分效率 可以通过下标直接访问到 但是链表...

- 链表访问任何一个位置的元素的时候 都需要从头开始访问(无法跳过第一个元素访问任何一个元素)

- 无法通过下标直接访问元素 需要从头一个个访问 直到找到对应的元素


> 链表到底是什么?
- 链表的一个项中有两个元素 *数据 + 指针*

- 链表类似于火车 有一个火车头 火车头会连接一个节点(车厢) 节点上有乘客(数据) 并且这个几点会连接下一个节点 以此类推

<!-- 
            node              node
         ------------     ------------
head  →  item | next   →   item | next  →  null
         ------------     ------------



- 或者这样的图: ↓

        ------    ------
         data      data
        ------    ------
head →   next      next   →  null
        ------    ------
 -->


- head 指向 第一个节点 相当于 火车头
- 当没有下一个节点的时候 next 指向 null

- 默认情况下 链表中是一个节点都没有的 那就是
- head -> null


> 链表的封装
- 封装 LinkedList 的类 用于表示我们的链表结构
- 在 LinkedList 类中有一个Node类 用于封装每一个节点上的信息(和优先级队列的封装一样)

- 链表中我们保存两个属性 
    一个是链表的长度 
    一个是链表中的第一个节点

> 链表中的属性: head
- 链表类中一定会有一个属性 *head* 因为它会指向第一个节点 因为只有找到第一个节点才能依次往后找到其它的节点

> 链表中的属性: node
- data
- next (下一个节点的引用)

> 链表中的属性: length
- 用于记录链表的长度 (数组的话自带 链表我们自定义)


> 链表的基本结构
```js
class Node {
  constructor(data, next) {
    this.data = data
    this.next = next
  }

  /*
    还可以后期往对象中添加next 
    constructor(data) {
      this.data = data
      this.next = null
    }
  */
}

class LinkedList {

  // 属性 (指向第一个节点的指针 默认指向null)
  head = null

  // 用于记录链表的长度
  length = 0
}
```


> 链表中的常见操作
- append(el)
- 向列表*尾部*添加一个新的node

- insert(position, el)
- 向列表的*特定位置*插入一个新的node

- get(position)
- 获取对应位置的元素

- indexOf(el)
- 根据给定元素返回元素在列表中的索引 如果列表中没有该元素返回-1

- update(position)
- 修改某个位置的元素

- removeAt(position)
- 从列表的*特定位置*移除一项

- remove(el)
- 从列表中移除一项(移除指定的数据)

- isEmpty()
- 如果链表中不包含任何元素返回true 否则返回false(length>0)

- size()
- 返回链表包含的元素个数 

- toString()
- 由于列表项使用了Node 就需要重写继承自js默认的toString方法 让其只输出元素的值


> append(data) 实现
- 向链表尾部追加数据可能有两种情况
- 1. 链表本身为空 新添加的数据是唯一的节点
- 2. 链表本身非空 需要向其它节点后面追加节点

- 刚开始的时候 head = null

- 如果我们添加第一个节点 我们需要将 head 指向 第一个节点
- 同时需要将新添加的节点的next指向null (next = null)

- 如果我们添加第二个节点 然后我们需要将前一个节点的next指向刚添加的节点 同时将刚添加的节点的next指向null

- 要点:
- 我们要从 head 出发一个个节点去找 找到最后一个节点 用于追加新的节点
(通过head找到第一个节点 判断该节点的next有没有下一个节点 有的话就说明该节点不是最后一个节点 继续判断知道 next == null 说明它是最后一个节点)

- 然后把我们的新节点加进来 并调整上面我们找到最后一个节点的next指向新的节点


> 代码部分
```js
append(data) {

  // 先创建一个新节点
  let node = new Node(data)

  // 判断是否添加的是第一个节点
  if(this.length == 0) {
    // 如果是第一个节点 将head指向第一个节点
    this.head = node

  } else {
    // 不是第一个节点 找到最后一个节点 从head开始找到最后一个节点 让最后一个节点的next指向新的节点
    // 因为head就是指向第一个节点 现在这个current就也指向第一个节点
    let current = this.head

    // 判断 current.next 是否为空 为空表示为最后一个
    // current.next表示下一个节点  -- 节点 节点 null
    while(current.next) {
      // 如果 current.next 不为空 那么我就让 current(第一个节点) = 下一个节点

      // 让 current 指针不断的移动 直到最后一个
      current = current.next
    }

    // while循环结束后 current 就是最后一个节点 那么我们就让最后一个节点的next指向新追加的元素
    current.next = node
  }

  // 添加新节点后 修改 length  ++ 也可以但是python就不支持++
  // 注意 因为最开始我们是根据length来判断是否往第一个节点位置添加节点的 所以这里要+1 不然只会在第一个节点的位置添加节点
  this.length += 1
}
```

**所谓的添加就是指针的引用 引用了一个对象 通过该引用就能找到内存中的对象 this.head = node 就这样**


> toString()
- 该方法主要是获取每一个元素 从head开头 因为获取链表的任何元素必须从第一个节点开头

- 循环遍历每一个节点 并且取出其中的data 拼接成字符串 将最终的字符串返回

```js
toString() {
  // 拿到第一个节点
  let current = this.head

  let str = ""
  
  // 如果有东西就一直循环 这里while 不能是current.next 不然获取不到最后一个node
  while(current) {
    str += current.data + " -- "    // 这个必须要放在上面

    // 如果有值的话 就让当前节点指向下一个节点
    current = current.next
  }

  console.log(str)
  // return str
}


// 测试代码
let ll = new LinkedList()
ll.append("sam")
ll.append("erin")

ll.toString()
console.log(ll)
```

---

> insert(position, data) 实现
- 在任意位置插入数据

> 思路:
- 1. 添加到第一个位置(position = 0)
  - 添加到第一个位置 表示新添加的节点是头 就需要将原来的头节点做为新的节点的next 另外这个时候的head应该指向新节点

- 2. 添加到其它位置
  - 如果是添加到其它位置 就需要先找到这个节点的位置
  - 我们通过while循环 一点点向下找 并且在这个过程中 保存上一个节点 和 下一个节点
  - 找到正确的位置后 将新节点的next指向下一个节点 将上一个节点的next指向新的节点


> 分析:
<!-- 
           new node
         ------------
          item | next
         ------------

      ↗               ↘     node1
                        ------------
head                     item | next 
                        ------------
 -->


> 参数:
- 1. position (0为第一个元素)
- 2. data

> 实现:
- 1. 首先我们要对 position 进行越界判断(如我们传递-100可以么?)
  - position不能为负数
  - position不能大于length(链表有4个元素 我们可以往4的后面插入5)

- 2. 然后我们开始插入新的节点 分为两种情况
 - 1. 新节点在 position: 0 的时候
 - 2. 新节点在 position: 任意 的时候
  - 这时候我们要找到指定位置的节点 while
  - 同时我们在while中要存 当前节点和前一个节点

```js
insert(position, data) {
  // 对 position 进行越界判断
  if(position < 0 || position > this.length) return false

  // 根据 data 创建 node
  let node = new Node(data)

  // 情况1: position=0 插入第一个节点的位置 我们需要让head指向新节点 新节点的next指向原来的第一个节点
  if(position == 0) {
    /*
      伪代码: 
      this.head = node
      node.next = 原来的第一个

      原来的第一个怎么获取? 我们把上面的代码上下换下位置 原来第一个就好获取了
      node.next = 原来的第一个 原来的第一个就是head
      this.head = node

              node
            ↗     ↘
      head          原来的第一个节点
    */
    
    // 让新节点的 next 指向原来的第一个元素
    node.next = this.head

    // 让head指向新节点 这样就完成了添加操作
    this.head = node

    /*
      这样行么? 保存原来的第一个
      current = this.head
      node.next = current
      this.head = node
    */

  // 情况2: postion为任意位置 比如 positon: 2
  // 0 1 2 如果position:2 那么就应该是 0 1 new 2 原来位置2上的元素后移动 新节点添加到位置2上
  } else {

    let index = 0

    // current就是第一个节点
    let current = this.head
    
    // current的前一个节点
    let previous = null

    // 只要index<position就一直往后找 一旦 index == position while就停了 就意味着找到了
    while(index++ < position) {
      // current会移动到指定的位置 在current被赋值之前 我们将current的值保存起来
      previous = current

      // 让 current 开始移动 到指定的位置 这是current就是指定位置的节点 而previous就是它前面的节点
      current = current.next
    }

    // 到这里就说明 current 到了指定位置 将 current 移动到 新节点的后面
    node.next = current
    previous.next = node

  }

  // length + 1
  this.length += 1
  
  // 因为下标越界的时候 return的false 插入成功的时候我们return true
  return true
}


// 多考虑了一种情况
insert(position, data) {
    if(position < 0 || position > this.length) return false
    let node = new Node(data)
    if(this.length == 0) {
      this.head = node
    } else {
      if(position == 0) {
        node.next = this.head
        this.head = node

      } else if(position == this.length - 1) {
        let current = this.head
        while(current.next) {
          current = current.next
        }

        current.next = node
        
      } else {
        let current = this.head
        let previous = null
        let index = 0
        while(index++ < position) {
          previous = current
          current = current.next
        }

        previous.next = node
        node.next = current
      }
    }

    this.length++

    return true
  }
```

---

> get(position) 实现
- 获取对应位置的元素 找到指定位置的节点后 返回data

**注意:**
- 我们获取的时候 最多获取 length - 1 位置的元素
<!-- 
  insert()插入的时候 我们可以插到length的位置没有问题
    length: 6
    0 1 2 3 4 5
  获取的时候不行 length的位置是没有东西的
 -->
```js
get(position) {
  // 越界判断 return null
  if(position < 0 || position >= this.length) return null

  // 从 head 开始找
  let current = this.head
  let index = 0
  
  // position:0 的时候 不满足条件 会直接到 return current.data 获取的就是第一个元素 
  while(index++ < position) {
    current = current.next
  }

  return current.data
}
```

---

> 总结:
- 一直往后找的话 就是 定义 current + while + current = current.next

- 如果要指定的循环次数 定义 index + while + index++ < position

---

> indexOf(data)
- 根据给定数据, 返回该数据在列表中的索引 如果没有该元素则返回-1

- 思路:
- 我们先让 current 指向链表中的第一个元素 然后对比下 current.data 和 给定的data 是否一样 不一样的话就接着往后找 如果找到最后仍然没有找到 则返回-1

- 我们需要两个变量:
- 1. current: 当前的节点
- 2. index: 用于记录找到第几个了

```js
indexOf(data) {
  // 拿到第一个节点
  let current = this.head
  let index = 0

  // 开始查找 一旦current指向null(最后一个节点就是指向null)
  while(current) {

    // 进来就开始判断 是否相同
    if(current.data == data) {
      return index
    }

    current = current.next
    index += 1
  }

  // 到这里就是没有找到 应该返回 -1
  return -1
}
```

---

> update(position, data)
- 根据指定位置信息 修改该位置上的元素的数据 为给定数据
- 跟 get() 方法很像

```js
update(position, data) {
  if(position < 0 || position >= this.length) return false

  // 查找正确的节点
  let index = 0
  let current = this.head

  while(index++ < position) {
    current = current.next
  }

  // 到这里就是目标节点 修改数据
  current.data = data

  return true
}
```

---

> removeAt(position)
- 根据指定的位置 删除指定的元素

> 思路:
- 删除数据的情况
- 1. position: 0 的情况
- head - 1 - 2 - null
- 我们删除第一个节点 那么我们可以让 head 指向 节点2
<!-- 
  head -> 节点2
        ↗
  节点1 

  虽然节点1的next属性仍然指向节点2 但是因为没有东西指向节点1(也就是节点1没有引用 过会节点1就会被回收掉)
 -->

- 2. position: 任意的情况
- 首先我们要先找到 position 位置的节点
- 然后找到该节点的 *前一个节点*
- 让 *前一个节点的next* 指向 该节点的 *下一个节点*
<!-- 
  节点1 节点2 节点3 节点4 节点5
                    ↑

  节点1 节点2 节点3   →  节点5

  找到前一个节点 3 让它直接指向 5

  它的前一个 = 它的下一个
 -->

```js
removeAt(position) {
  // = this.length 也是越界 因为没有这个东西 删啥 想想数组
  if(position < 0 || position >= this.length) return false

  if(position == 0) {
    // 让 head 跳过 第一个节点 指向 第二个节点
    this.head = this.head.next

  } else {

    let index = 0
    let current = this.head
    let previous = null

    // 移动到指定的位置 同时保存下前一个节点
    while(index++ < position) {
      previous = current
      current = current.next
    }

    // 出了循环就是找到正确的东西了 让 目标的前一个 指向 目标的下一个
    previous.next = current.next
  }

  // 注意: length-1
  this.length--

  // 还可以返回删除的数据 return current.data 记得把current放到公共的位置
  return true
}
```

---

> remove(data)
- 根据数据 删除对应的节点
- 直接调用上面定义好的方法 indexOf() removeAt()
```js
remove(data) {
  let position = this.indexOf(data)
  // removeAt()里面有越界判断了
  let res = this.removeAt(position)

  // this.length--  removeAt里面已经--了
  return res
}
```

--- 

> isEmpty()
- 判断当前链表是否为空 为空返回 true 
```js
isEmpty() {
  return this.length == 0
}
```

---

> size()
- 返回链表中的节点个数
```js
size() {
  return this.lenth
}
```


> 完整代码:
```js
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}

class LinkedList {

  head = null
  length = 0

  append(data) {
    let node = new Node(data)

    if(this.length == 0) {
      this.head = node
    } else {
      let current = this.head
      while(current.next) {
        current = current.next
      }

      current.next = node
    }

    this.length++
  }

  insert(position, data) {
    if(position < 0 || position > this.length) return false
    let node = new Node(data)

    if(position == 0) {
      node.next = this.head
      this.head = node
    } else {
      let current = this.head
      let previous = null
      let index = 0

      while(index++ < position) {
        previous = current
        current = current.next
      }

      previous.next = node
      node.next = current
    }
    this.length++
    return true
  }

  get(position) {
    if(position < 0 || position >= this.length) return null
    let index = 0
    let current = this.head
    while(index++ < position) {
      current = current.next
    }

    return current.data
  }


  update(position, data) {
    if(position < 0 || position >= this.length) return false

    // 查找正确的节点
    let index = 0
    let current = this.head

    while(index++ < position) {
      current = current.next
    }

    // 到这里就是目标节点 修改数据
    current.data = data

    return true
  }


  indexOf(data) {
    let index = 0
    let current = this.head

    while(current) {
      if(current.data == data) {
        return index
      }

      current = current.next
      index++
    }

    return -1
  }



  toString() {
    let str = ""
    let current = this.head

    while(current) {
      str += current.data + " -- "
      current = current.next
    }

    str = str.replace(/ -- $/, "")
    console.log(str)
  }

  removeAt(position) {
    if(position < 0 || position >= this.length) return false

    if(position == 0) {
      // 让 head 跳过 第一个节点 指向 第二个节点
      this.head = this.head.next

    } else {

      let index = 0
      let current = this.head
      let previous = null

      while(index++ < position) {
        previous = current
        current = current.next
      }

      // 出了循环就是找到正确的东西了 让 目标的前一个 指向 目标的下一个
      previous.next = current.next
    }

    // 注意: length-1
    this.length--
    return true
  }

  remove(data) {
    let position = this.indexOf(data)
    return this.removeAt(position)

    // 这里不用再--了 因为 removeAt 已经 - 过了
    // this.length--
    // return res
  }

  isEmpty() {
    return this.length == 0
  }

  size() {
    return this.lenth
  }
}
```

----------------

### 双向链表结构

> 回顾单向链表的特点:
- 1. 只能从头遍历到尾 或者 从尾遍历到头(一般头从到尾) 也就是链表相连的过程是单向的
- 2. 实现的原理是上一个链表中有一个指向下一个的引用


> 单向链表的缺点
- 我们可以轻松的到达下一个节点 但是回到前一个节点是很难的 但是 在实际开发中 经常会遇到需要回到上一个节点的情况


> 举例:
- 假设一个文本编辑用链表来存储文本 每一行用一个String对象存储在链表的一个节点中
- 当编辑器用户向下移动光标时 链表直接操作到下一个节点即可
- 但是当将光标向上移动呢？这个时候为了回到上一个节点 我们可能需要从head开始 依次走到想要的节点上


> 双向链表的特点
- 1. 既可以从头遍历到尾 又可以从尾遍历到头 也就是链表相连的过程是双向的 

- 2. 实现原理 一个节点既有向前连接的引用 也有一个向后连接的引用 双向链表可以有效的解决单向链表中提到的问题


> 双向链表的缺点
- 每次在插入或删除某个节点的时候 需要处理4个引用 而不是两个 也就是实现可以要困难一些 并且相当于单向链表 必然*占用内存空间更大*一些 但是这些缺点和我们使用起来的方便程度相比 是微不足道的

- java中的LinkedList就是一个双向链表

<!--      
                                   tail
                                    ↓
         -------------   -------------
  head →               →
         pre data next   pre data next → null
  null ←               ←
         -------------   -------------
 -->

- head指针: 指向第一个节点
- tail指针: 指向最后一个节点


> 双向链表的特点
- 1. 可以使用一个head和一个tail分别指向头部和尾部的节点
- 2. 每个节点都由3个部分组成
  - 前一个节点的指针 prev
  - 保存的元素      data
  - 后一个节点的指针 next

- 3. 双向链表的 *第一个节点* 的 *prev* 是 null
- 4. 双向链表的 *最后的节点* 的 *next* 是 null


> 双向链表的封装 -- 内部的属性
```js
class Node {
  constructor(data) {
    this.pre = null
    this.data = data
    this.next = null
  }
}


class LinkedList {

  // 会指向第一个节点的指针
  head = null

  // 会指向最后一个节点的指针
  tail = null

  // 链表的长度
  length = 0

}
```

**为什么 head prev 要为null**
- 因为要遍历吧 到空才能移动到末尾 才会退出循环


> 双向链表中的常见方法
- append(data)
- 向链表的尾部添加一个新的项

- insert(position, data)
- 向链表的特定位置插入一个新的项

- get(position)
- 获取对应位置的元素

- indexOf(data)
- 根据给定元素 找出该元素在链表中的索引 没有返回-1

- update(position, data)
- 修改某个位置的元素

- removeAt(position)
- 从链表的特定位置移除一项

- remove(data)
- 从链表中移除一项

- isEmpty()
- 查看链表是否为空 为空返回true

- size()
- 返回链表包含的元素的个数

- toString()
- 输出链表中元素的情况

- forwardString()
- 从后往前开始进行遍历, 返回字符串形式就可以

- backwordString()
- 从前往后开始进行遍历, 返回字符串形式就可以


> 我们要实时关注下面的5个变量的情况
- 1. head
- 2. tail *我们要实时更新 tail*
- 3. pre
- 4. next
- 5. length

---

> append(data)
- 往链表的末尾添加节点

> 思路:
- 向链表尾部追加数据可能有两种情况
- 1. 链表本身为空 新添加的数据是唯一的节点
  - 直接让 head 和 tail 指向这个新的节点
  - head = 新节点
  - tail = 新节点

- 2. 链表本身非空 需要向其它节点后面追加节点
  - 首先我们要找到原链表中的最后一个节点 也就是 tail
  - 我们要将 新节点的prev 指向 tail
  - 新节点的next 指向 null

  - 同时 新节点 已经变成最后一个节点了 我们要*更新 tail 指向 新节点*

- 3. 最后 length++

```js
append(data) {
  let node = new Node(data)
  if(this.length == 0) {
    // 让 head指针 指向新节点
    this.head = node

    // 让 tail指针 指向新节点(既是开头也是结尾)
    this.tail = node
  } else {
    // tail 就是 最后一个节点
    // 让原链表中最后一个元素的next 指向新节点 让新节点的prev指向原链表的最后一个节点
    this.tail.next = node
    node.prev = this.tail

    // 更新 tail 指针为最后一个节点
    this.tail = node
  }

  this.length++
}
```

---

> toString()
```js
toString() {
  let str = ""
  let current = this.head

  // 依次向后遍历
  while(current) {
    str += current.data + " -- "
    current = current.next
  }

  str = str.replace(/ -- $/, "")
  console.log(str)
}
```


> forwardString()
```js
forwardString() {
  let str = ""
  let current = this.tail

  // 依次向前遍历
  while(current) {
    str += current.data + " -- "
    current = current.prev
  }

  str = str.replace(/ -- $/, "")
  console.log(str)
}
```


> backwordString()
```js
backwordString() {
  this.toString()
}
```

---

> insert(position, data)

> 思路
- 当我们插入 新节点 的时候 分为两种情况 (单向链表中没有考虑下面这面详细 这个逻辑也可以用在单向链表中)

- 1. 链表为空的情况 也就是原链表中没有任何节点
  - 新节点既是 第一个节点 也是 最后一个节点
  - 所以我们插入进去之后 
  - head = 新节点
  - tail = 新节点

- 2. 链表中已经有节点了 这个部分也需要考虑几种情况
 - 1. position: 0的情况, 也就是原来有节点了 我们还要插入0的位置
 - 新节点在0的位置
 - 旧节点后移

 - 当我们将新节点插入到0的位置上后 我们要处理下面的逻辑
 - 旧节点.prev(原来head指向的这个节点) 指向 新节点
 - 新节点.next 指向 旧节点(原来head指向的这个节点)
 - 再让 head 指向 新节点

 - 2. position: this.length的情况 也就是要插入到最后一个节点的后面 也就是要插入null的位置
 - 节点1 节点2 节点3 null

 - 插入后我们要考虑
 - 原来最后一个节点.next = 新节点
 - 新节点.prev = 原来最后一个节点
 - 更新tail为新节点

 - 3. position: 任意 插入任意位置
 - 既然是插入任意位置 那么我们就要找到该位置上的节点 该节点就称之为旧节点 目标节点 

 - 节点1 节点2 节点3(旧节点)
 - 我们插入 新节点 那么原先的节点3就会变成旧节点(旧的节点3)
              *新节点*
 - 节点1 节点2          节点3(旧节点)

 - 我们插入后 就要考虑 以下的问题
 - 新节点.prev 指向 旧节点的前一个节点(节点2)
 - 新节点.next 指向 旧节点
 - 旧节点的前一个节点(节点2).next 指向 新节点
 - 旧节点.prev 指向 新节点

> 代码部分
```js
insert(position, data) {
  // 越界判断
  if(position < 0 || position > this.length) return false

  // 创建节点
  let node = new Node(data)

  // 根据 position 找到正确的位置
  if(this.length == 0) {
    // 能进入该if证明 原先的链表为空
    this.head = node
    this.tail = node
  } else {
    // 在链表中已有节点的情况下 要插入第一个节点的位置
    if(position == 0) {
      // 旧节点.prev = node 因为是0的位置 this.head 就是0位置的节点 就是旧节点
      this.head.prev = node
      // 让新旧节点互相引用
      node.next = this.head

      // 这时再让 head 指向正确的节点 新节点
      this.head = node

      // 插入目标为 链表中最后一个元素的后面的null的位置上
    } else if(position == this.length) {
      this.tail.next = node
      node.prev = this.tail
      
      // 更新 tail 为正确的节点
      this.tail = node

      // position为任意位置
    } else {
      // 我们要找到 position 的位置的节点
      let current = this.head
      let index = 0

      while(index++ < position) {
        current = current.next
      }

      // 到这就意味着找到了目标节点(旧节点)
      // 1. 新节点.prev 指向 旧节点的前一个节点
      // 2. 新节点.next 指向 旧节点
      // 3. 旧节点的前一个节点.next 指向 新节点
      // 4. 旧节点.prev 指向 新节点
      node.next = current
      node.prev = current.prev // current.prev 就是旧节点的前一个节点 双向链表维护了前一个后一个节点
      current.prev.next = node
      current.prev = node

      // 注意上面的顺序 不能颠倒 不然指向就乱了
    }
  }

  this.length++
  return true
}
```

---

> get(position)
- 获取指定位置的数据
```js
get(position) {
  if(position < 0 || position >= this.length) return null

  let index = 0
  let current = this.head

  while(index++ < position) {
    current = current.next
  }

  // 到这里就找到了
  return current.data
}
```

- 我们还可以考虑是从前往后 还是从后往前
```js
// 等式成立说明 position 比 一半还要小 所在从head开始查找
let flag = (this.length / 2) > position
let current = this.tail
let index = this.length -1
while(index-- ...)
```

--- 

> indexOf(data)
- 根据给定的元素 返回该元素在链表中的索引 没有返回-1
```js
indexOf(data) {

  let current = this.head
  let index = 0

  while(current) {

    if(data == current.data) return index

    current = current.next
    index++
  }

  return -1
}
```

---

> update(position, data)
- 根据给定的position 修改该节点的数据

```js
update(position, data) {
  // 越界判断
  if(position < 0 || position >= this.length) return false
  
  // 找到正确的节点
  let current = this.head
  let index = 0

  while(index++ < position) {
    current = current.next
  }

  current.data = data
  return false
}
```

---

> removeAt(position)
- 根据对应的信息将对应的节点删除掉

> 思路:
- 我们删除一个节点 也分几种情况
- 1. 只有一个节点的情况 我们需要做的就是 
  - head tail 指向 null
  - 我们可以根据 this.length == 1

- 2. 长度不为1的时候 还分3种情况
  - 1. 删除第一个节点的情况(position: 0) 
    - 我们需要做如下的操作
    - 让第二个节点.prev 指向 null (第一个节点的prev始终都会指向null)
    - 让head 指向 第二个节点

  - 2. 删除最后一个节点的情况(position: this.length - 1)
    - 拿到最后一个节点的前一个节点.next 指向 null
    - tail 指向倒数第二个节点

  - 3. 删除任意节点的情况
    - 找到指定位置的节点
    - 1. 目标位置的前一个节点.next 指向 目标位置的后一个节点
    - 2. 目标位置的后一个节点.prev 指向 目标位置的前一个节点


> 代码部分:
```js
removeAt(position) {
  // 这里我们设计下 将删除的信息返回 所以越界的情况下 我们返回null
  if(position < 0 || position >= this.length) return null

  let current = this.head

  // 只有一个节点的情况 判断是否只有一个节点
  if(this.length == 1) {
    this.head = null
    this.tail = null

    // 长度不为1的时候
  } else {
    
    // 判断删除的是否为第一个节点
    if(position == 0) {
      // 让第一个节点的下一个节点(第二个节点).prev指向 null
      this.head.next.prev = null
      // 让head指向第二个节点
      this.head = this.head.next

      // 删除最后一个节点
    } else if(position == this.length - 1) {
      // 我们最终要返回删除节点的数据 所以这么做 保存下未删除之前的tail
      current = this.tail


      this.tail.prev.next = null
      this.tail = this.tail.prev

      // 删除任意位置的节点
    } else {
      let index = 0

      // 我们把current提出去了 所以这里注释掉
      // let current = this.head 

      while(index++ < position) {
        current = current.next
      }

      // 找到了 目标位置(要删除的节点)
      // 1. 目标位置的前一个节点.next 指向 目标位置的后一个节点
      // 2. 目标位置的后一个节点.prev 指向 目标位置的前一个节点
      current.prev.next = current.next
      current.next.prev = current.prev
    }
  }

  this.length--
  return current.data
}
```

--- 

> remove(data)
- 根据指定的元素删除节点
```js
remove(data) {
  let position = this.indexOf(data)
  return this.removeAt(position)
}
```

---

> isEmpty()
> size()
> getHead()
> getTail()
```js
isEmpty() {
  return this.length == 0
}

size() {
  return this.length
}

getHead() {
  return this.head.data
}

getTail() {
  return this.tail.data
}
```

> 开发场景: 双向链表的应用场景比较多一些

----------------

### 集合
- 几乎每种编程语言中 都有集合结构
- 集合比较常见的实现方式是 *哈希表* 我们这里来实现一个封装的集合类

- 我们先使用 *Object* 类来封装一个集合类

> 集合的特点
- 集合通常是由一组 *无序的* *不能重复* 的元素构成
- 和数学中的集合名词比较相似 但是数学中的集合范围更大一些 也允许集合中的元素重复 在计算机中 集合通常表示的结构中元素是 不允许重复 的

- 在开发中 我们可以把集合 看做是一个 *特殊的数组*
- 特殊之处在于里面的元素 没有顺序 也不能重复 没有顺序意味着 不能通过下标值进行访问 不能重复意味着*相同的对象在集合中只会存在一份*

- 2015年6月份发布的set类 所以其实我们可以不封装 直接使用它 但是这里 为了明确集合的内部实现机制 我们自己封装一个 Set 类


> 封装 Set 类
- 集合和优先级队列 链表结构不一样 不用单独的创建一个内部类 
- 它就是直接在类中存放数据

- 理解方式:
- 我们可以把集合看做是一个特殊的数组 我们也是往集合中 单独的丢元素 但是我们集合类的内容是通过 对象 的形式实现的
- 也就是 key 和 value 都是 我们要添加的数据 比如
```js
let items = {
  "张三": "张三"
}
```


> 集合中的属性
- items = {}
- 我们在集合中创建一个对象用来保存数据


> 集合中的方法
- add(val)
- 向集合中添加一个新的项

- remove(val)
- 从集合中移除一个值

- has(val)
- 如果值在集合中 返回ture 否则返回false

- clear()
- 移除集合中的所有项

- size()
- 返回集合所包含元素的数量 与数字的length属性类似

- values()
- 返回一个包含集合中所有值的数组


> has(val)
- 检查下该item是否在集合中

- 注意:
- 这样不能监测对象类型 因为地址值

```js
has(val) {
  // 判断一下当前集合中是否包含了该属性名(因为 key 和 value 都一样)
  return this.items.hasOwnProperty(val)
}
```


> add(val)
- 添加一个item到集合中

- 要点:
- 我们在集合类中创建了一个对象用来保存数据
- 我们往对象中添加 val 的时候 key value 都是 val

- 注意:
- 集合(特殊数组 or 对象)中不能添加重复的元素 所以我们在添加的时候要进行判断

```js
add(val) {

  // 判断元素是否存在集合中 有的则添加成功
  if(this.has(val)) return false

  // 这样保存到 items 对象中的 key value 都是一样的
  this.items[val] = val
  return true
}
```

- 问题:
- 我们添加字符串2 和 添加数字2 会添加不进去 因为对象的key是string类型的问题


> remove(val)
- 删除集合中的一个元素

- 注意:
- 要判断是否有该元素
```js
remove(val) {
  // 判断该集合中是否包含该元素 没有的话 直接返回false
  if(!this.has(val)) return false

  // 将元素从属性中删除
  delete this.items[val]
  return true
}
```


> clear()
```js
clear() {
  this.items = {}
}
```


> size() 
```js
size() {
  return Object.keys(this.items).length
}
```


> values()
- 返回集合中所有的数据 因为key 和 value是一样的 所以调用下面的方法

```js
values() {
  // 这里使用 values() 比较好 因为key的类型都是string
  return Object.keys(this.items)
}
```


> toString()
```js
toString() {
  let content = Object.keys(this.items).join(" -- ")
  console.log(content)
}
```

---

> 集合和集合之间的操作
- 通常有如下的操作

> 并集: 
- 给定的两个集合 返回一个*包含两个集合中所有元素的新集合*
- x存在于A中 或者 x存在于B中

- 代码解析:
- 首先我们需要创建一个新的集合 代表两个集合的并集
- 遍历集合1中所有的值 并且添加到新集合中
- 遍历集合2中所有的值 并且添加到新集合中(判断新集合中是否已经包含了这个元素 如果包含就不往里面添加了)
- 将最终的新集合返回

> union(otherSet)
- this:     表示当前的集合 
- otherSet: 表示另一个集合

```js
union(otherSet) {

  let unionSet = new Set()

  // 将A集合中所有的元素添加到新集合中
  let values = this.values()
  for(let i=0; i<values.length; i++) {
    unionSet.add(values[i])
  }

  // 取出B集合中的所有元素 判断是否需要添加到 新集合中
  values = otherSet.values()
  for(let i=0; i<values.length; i++) {
    // 因为add方法中已经有判断了 所以这里可以直接添加
    unionSet.add(values[i])
  }

  return unionSet

}


// 测试:
let set1 = new Set()
set1.add(1)
set1.add(2)
set1.add(3)

let set2 = new Set()
set2.add("a")
set2.add("b")
set2.add("c")

let unionSet = set1.union(set2)
unionSet.toString()
// 1 -- 2 -- 3 -- a -- b -- c
```


> 交集:
- 给定的两个集合 返回一个*包含两个集合中共有元素的新集合*
- x存在A集合中 且x存在B集合中

- 代码解析
- 创建一个新的集合
- 遍历集合1中所有的元素 判断是否该元素在集合2中
- 同时在集合2中 将该元素添加到新集合中
- 最终将新的集合返回

```js
intersection(otherSet) {
  let intersectionSet = new Set()

  // 遍历 集合A 取出一个个元素 判断是否同时存在于集合B中 如果存在就放入新集合中
  let values = this.values()

  for(let i=0; i<values.length; i++) {
    if(otherSet.has(values[i])) {
      intersectionSet.add(values[i])
    }
  }

  return intersectionSet
}
```


> 差集:
- 给定的两个集合 返回一个*包含所有存在第一个集合且不存在第二个集合的元素的新集合*
- x存在于A集合中 且x不存在于B集合中

- 代码解析:
- 创建一个新的集合
- 遍历集合1中所有的元素 判断是否在集合2中
- 不存在于集合2中的 将该元素添加到新集合中 
- 将集合返回

```js
difference(otherSet) {
  let differenceSet = new Set()

  let values = this.values()

  for(let i=0; i<values.length; i++) {
    // 求差集的话 取反就可以了
    if(!otherSet.has(values[i])) {
      differenceSet.add(values[i])
    }
  }

  return differenceSet
}
```


> 子集:
- 验证一个给定集合是否是另一个集合的子集(A集合包含B集合)
- A集合中的每一个x元素 都在B集合中

- 代码解析
- 判断集合1 是否大于 集合2 如果大于 那么肯定不是集合2的自己
- 不大于的情况下
  - 判断集合1中的元素是否都在集合2中
  - 存在则是集合2的子集 有一个不存在 那么不是集合2的子集

```js
// 方式1: 优先
subSet(otherSet) {
  // 判断集合A的length是否大于集合B
  if(this.size() > otherSet.size()) return false

  let values = this.values()

  for(let i=0; i<values.length; i++) {
    if(!otherSet.has(values[i])) {
      return false
    }
  }

  // 到这里就说明是自己
  return true
}



// 方式2: 我写的
subSet(otherSet) {
  // 判断集合A的length是否大于集合B
  if(this.size() > otherSet.size()) return false

  let values = this.values()
  let flag = true

  for(let i=0; i<values.length; i++) {
    if(!otherSet.has(values[i])) {
      flag = false
      break 
    }
  }

  return flag
}
```

----------------

### 字典 (了解)
- 字典的实现 是基于 hash表 是比较常见的方式
- 倒是使用 {} 也可以做 只是会跟上面的集合非常的像 所以这里我们只是了解一下字典的相关概念

- 数组 - 集合 - 字典 几乎编程语言都会默认提供的数据类型
- 在js中默认提供了数组 es6中增加了集合 和 字典


> 生活中的字典
- 中文字典我们可以根据拼音去查找汉字 并且找到汉字对应的词以及解释
- 英文字典也是类似 根据英文字母找到对应的单词 再查看其翻译和应用场景


> 字典的特点
- 字典的主要特点是 一一对应的关系
- 比如保存一个人的信息 在合适的情况下取出这些信息

- 使用数组的方式 [18, "sam", 1.7] 可以通过下标取出信息
- 使用字典的方式 {age: 18, name: "sam", height: 1.7} 可以通过 key 取出 value

- 另外字典中的key是不可以重复的 而value可以重复 并且字典中的key是无序的


> 字典 和 map 之间的关系
- 有些编程语言中称这种映射关系为字典 因为它确实和生活中的字典比较相似 
- 有些编程语言中称这种映射关系为map 

- 字典和数组
- 字典和数组对比的话 字典可以非常方便的通过key来搜索对应的value key可以包含特殊含义 也更容易被人们记住

- 字典和对象
- 很多编程语言(java)中对字典和对象区分比较明显 对象通常是一种编译器就确定下来的结构 
- 而字典通常使用类似哈希表的数据结构去实现一种可以*动态的添加数据的结构*

- 但在js中 似乎对象本身就是一种字典 所有在早期的js中 没有字典这种数据类型 因为你完全可以使用对象取代替

----------------

### 哈希表(重要) -- 认识 
- 哈希表是一种非常重要的数据结构
- 几乎所有的编程语言都有直接或间接应用这种数据结构(js中的object对象就跟哈希表有关系) 


> 回顾数组在增删改查时候的特点
- 在基于下标查找操作的情况下 效率很高 但其它的操作的时候 效率不是那么高

- 比如
```js
[
  {name:x, age:1}, 
  {name:y, age:2}, 
  {name:z, age:3}
]
```
- 加入现在有一个{name:a, age:0}对象要插入第一个位置

- 我们之前数组说过在前面插入的话 效率不高 因为其它的元素要先往后移动 腾出位置

- 数组进行查找的效率分为两种情况:
- 1. 如果是基于下标进行查找操作 效率非常高
- 2. 如果是基于内容去进行查找 这时候我们就需要从头开始查找

- 数组进行删除操作的效率:
- 因为删掉一个元素 其它的元素也会进行位移

- 同时数组在进行修改操作的时候跟查找很像也需要挨个找到元素

- 既然数组存在着上面的问题 那是不是可以对这些问题进行一些变换 让数组在进行上述的操作的时候 效率变得高一点

- 在经过变换之后形成的新的数据结构就是hash表


> hash表特点:
- *哈希表通常是基于数组进行实现的* 但是相对于数组 它也有很多的优势:

- 1. 它可以提供非常快速的 插入 删除 查找 操作
- 无论多少数据 插入和删除值需要接近常量的时间, 即O(1)的时间级 实际上 只需要几个机器指令即可完成

- 2. 哈希表的速度比树还要快 基本可以瞬间找到想要的元素 哈希表相对于树来说编码要容易很多


> hash表的不足
- hash表中的数据是*没有顺序*的 所以不能以一种固定的方式 比如从小到大 来遍历其中的元素

- 通常情况下 hash表中的*key是不允许重复*的 不能放置相同的key 用于保存不同的元素


- 集合和字典的实现一般都是基于hash表的 都是没有顺序 key不允许重复


> hash表是什么?
- 它不像数组和链表 甚至是树一样 直接画出来你就知道它的结构了 甚至原理了 

- *它的结构就是数组* 但是它神奇的地方在于*对下标值的一种变换* 这种变换我们称之为hash函数 通过函数可以获取到 HashCode

- 下面我们看看 3个案例 还体会下 hash表

----------------

### Hash表案例1: 公司员工存储
> 需求:
- 假如一家公司有10000个员工 现在我们需要将这些员工的信息使用某种数据结构保存起来 会采用什么数据结构

> 方案1: 数组
- 一种方案是按照顺序将所有的员工依次存入一个长度为10000的数组中 每个员工的信息都保存在数组的某个位置上

- 但是我们要查看某个员工的信息怎么办 一个一个找么 不太好找 比如我们要是想看 tom 的信息 那么就需要遍历数组 拿到名字来查看

- 数组最大的优势是通过下标值去获取信息 所以为了可以通过数组快速定位到某个员工 最好给员工信息中添加一个员工编号(工号) 

- 而编号对应的就是员工的下标 当查找某个员工的信息的时候 通过员工编号可以快速的定位到员工的信息位置


> 方案2: 链表
- 链表对应插入和删除数据有一定的优势 但是对应获取员工的信息 每次必须从头到尾的遍历 这种方式显示不是特别适合这里

- 查找的时候效率低 删除 插入的效率高 但是并不是每天都有员工离职或假如 查看的时候会更多些


> 最终方案: Hash表
- 这样看最终方案似乎就是数组了 但是数组还是有缺点

- 假如我想查看一下 tom 这位员工的信息 但是我不知道 tom 的员工编号 你怎么办

- 当然你说我可以问他 但是你每查找一个员工都是问一下这个员工的编号么 不合适

 - 线性查找? 效率非常的低 能不能有一种办法 让 tom 的名字和他的员工编号产生直接的关系呢？

 - 也就是通过 tom 这个名字 我就能获取到它的索引值 而再通过索引值我就能获取到 tom 的信息呢？

 - 这样的方案已经存在了 就是使用 哈希函数 *让某个key的信息和索引值对应起来*

 - 比如 通过 sam 找到 sam在数组中对应的下标

----------------

### Hash表案例2: 联系人和电话存储

> 需求:
- 选择一个数据结构 保存联系人和电话

> 方案1: 数组
- 使用数组来存储联系人和电话不是非常合适
- 因为如果需要查询某个联系人 那肯定是通过姓名去查找 这样就需要从数组中一个个取出数据和查询的联系人进行比较 效率非常的低


> 方案2: 链表
- 链表和数组一样 效率非常低


> 方案3: Hash表
- 有没有一种方案 可以将联系人姓名 和 数组的下标值对应?
- 但是联系人的名字(字符串)可以作为下标值么? 当然不可以
- 所以你需要一种方案*将字符串转换成下标值* 就是 哈希函数

----------------

### Hash表案例3: 50000个单词的存储
- 使用一种数据结构存储单词信息 比如有50000个单词 找到单词后每个单词有自己的翻译 读音 应用等

> 方案1: 数组
- 这个案例更加明显能感受到数组的缺陷 我们拿到一个单词python 我想知道这个单词的翻译信息 怎么可以从数组中查找到这个单词的位置呢？

- 线性查找? 50000次比较？ 如果你使用数组来实现这个功能 效率会非常非常低 而且你一定没有学过数据结构


> 方案2: 链表
- 不需要考虑了吧


> 方案3: Hash表
- 有没有一种方案 可以将单词转成数组的下标值呢？
- 如果单词转成数组的下标 那么以后我们要查找某个单词的信息 直接按照下标值一步即可访问到想要的元素


> 总结:
- 上面的3个案例最终都指向了一个目标 将字符串转成下标值

----------------

### 字符编码 扩展
> 计算机概述:
- 计算机一开始发明出来的时候 是用来解决数学计算的问题 后来人们发现 计算机还可以做更多的事情 例如文本处理 图像显示 视频播放等
- 但是计算机只能表示二进制 所以如果你希望进行文本 图像 视频处理 就必须将这些转化成二进制的东西来存储


> 为什么是二进制:
- 我们在学习编程过程中 会经常接触到2 8 16进制 为什么不是3 7等其它的进制 其实我们最熟悉的应该是10进制 从学数学开始 就使用的一直是十进制 但是十进制本质上再计算机中是用二进制表示的

- 这就和计算机原理有关系了 现在的计算机用的是晶体二极管 晶体二极管一个方向通电 一个方向不供电 那么我们就说通电的时候表示1 不通电的时候表示0 这样就可以表示出很多的01 

- 另外计算机最基础的原理它基于布尔代数 任何的信息都可以用布尔逻辑来表示 其实也可以理解成 01


- 进制:
- 而其他进制 例如8 16进制都是2进制的整数倍 所以我们在编程时会经常使用这些进制
- 十进制的话是必须转成2进制进行存储的


- 结论:
- 计算机中所有的信息 最终都是以01来进行存储的


> 计算机编码:
- 编码概念:
- 例如我们现在想用计算机表示 a 和 b 因为只有两个 所以我拿出一个bit位来表示 并且规定0表是a 1表示b
- 当我们在计算机中发现所有为0的东西时 都认为它是a 所有为1的东西时都认为它是b 我就可以标识很多的a和b了 这就是编码

- 但问题是 怎么可能只表示a和b 我们有很多的字母 很多的符号 很多的汉字 所以一个bit位远远不够

- 而科学家们又识别到一个bit能做的事儿太少了 所以就规定8个bit为一个btye字节 所以计算机中通过使用的最小的单位是byte

- 但是一个byte就够了么 没有什么一顿烧烤不能解决的 如果有 那么就两顿 信息的表示也是这样


- 文字信息:
- 我们要讲的字符编码 就是将文字信息转化成二进制的过程 也是要深入讲解的东西


- 图像信息:
- 图像 视频呢? 图像视频方面的编码涉及到另外一个领域 包含很多的东西 rgba通道 yuy通道 一些编码算法h264 265 ffmpeg框架 这些不是我们的重点


> 字符编码的发展
> Ebcdic
- 概述:
- 最开始出现了 ebcdic 扩展二进制编码的十进制交换码 
- 这是ibm在1964年为大型机操作系统而开发涉及的编码标准

- 问题:
- 在ebcdic码中 英文字母不是连续排列的 中间出现多次断续 这带来了一些困扰和麻烦 因此 ibm 的个人计算机和工作站操作系统上也没有使用该编码


> ASC2
- 概述:
- ASC2码 由美国国家标准学会ANSI制定

- 优势:
- ASC2码去除了IBM推出编码的缺点 在此基础上进行了优化 将英文字母进行连续排列 并且ASC2编码是我们后续所有编码中最基础 最重要 也一直延续至今的编码方式

- 特点:
- ASC2码占用一个Byte字节 并且在英文中所有的字母和符号加上一起128个就足够表示了 所以ASC2码中最前面的1位统一规定为0 后7位分别对应字母和符号


> ISO-8859-1 (对ASC2进行了扩充)
- 概述:
- 如果ASC2只用来表示英语 那么128个就足够了 但是一些西方国家的语言 会在英文的基础上添加一些符号 比如法语中 字母上方有注音符号 它就无法用ASC2吗表示 于是一些欧洲国家 利用字节中闲置的最高位编入新的符号

- 这样一来 这些欧洲国家使用的编码体系 可以标识最多256个符号

- 特点:
- 仍然采用一个字节来表示 对于西方国家来说已经足够使用


> GBxxxx
- 概述:
- 计算机发明之处以及后面很长一段时间 只应用于美国以及西方一些发达国家 ISO-8859-1 能够很好满足用户的需求 但是当天朝也有了计算机之后 为了显示中文 必须设计一套编码规则用于将汉字转换为计算机可以接受的数字系统的数


> GB2312:
- GB2312采用两个字节来表示所有的字符 其中大约收录了6763个汉字 这些汉字已经包含了99%常用的汉字 因此已经能满足汉字在计算机中的常用需求 GB2312编码通行于中国大陆 新加坡等地


> GBK:
- GB2312基本满足了汉语的需求 但是对应古汉语等方面出现的 生僻字 仍然是不能用计算机表示出来 这也是一个问题 微软利用GB2312-80未使用的编码空间 *收录了一些生僻字* 指定了GBK编码(汉字仍然占两个字节) 在中文版windows操作系统下 通常使用的编码方式都是GBK编码


> GB18030:
- 汉字保罗万象 包含的汉字大约在10万 GBK占用两个字节就算所有都编码成汉字 也最多表示65536个汉字 因此GBK已经满足了大部分的需求但是为了将尽可能多的汉字收录到计算机中 又出现了 GB18030 编码 它采用1个或2个或4个字节来进行编码 但是实际系统中应用并不是非常的广泛


> 问题:
- 当计算机传到世界各个国家的时候 为了适合当地的语言和字符 设计和实现了各种编码方案 这样各搞一套 在本地使用没有问题 一旦出现在网络中 由于不兼容 互相访问的时候就是乱码


- 为了解决这个问题 一个伟大的创想产生了 -- unicode


> Unicode
- 为表达任意语言的任意字符而设计 它使用4字节的数字来表达每个字母 符号 或者 表意文字

- 在计算机科学领域中 unicode(统一码 万国码)是业界的一种标准

- unicode是一个很大的集合 现在规模可以容纳100多万个符号 每个符号的编码都不一样 但是需要注意的是 unicode只是一个符号集 *它只规定了符号的二进制 而没有规定这个二进制代码应该如何存储*


> Unicode的实现
- utf-32
- utf-32就是采用 对每个字符采用4个字节来表示
- 问题: 非常浪费空间 空间效率很低 应用并不广泛


- utf-16:
- 尽管unicode字符非常多 但是实际上大多数人不会用到超过65535个字符以外的字符 因此就有了另外一种unicode编码方式 utf-16 (因为16 = 2个字节) 这种编码最明显的优点就是在空间效率上比utf-32高两倍 因为每个字符只需要两个字节来存储

- 问题:
- 但是65535以外的字符难免会出现问题

- 应用:
- java中的char类型采用的就是 utf-16 那生僻字怎么办？ 这就是设计到另外一个问题了 


- utf-8
- 概述:
- 它是一种针对 unicode 的可变长度字符编码 它可以用来表示 unicode标准中的任何字符 且其编码中的第一个字节扔与ASC2兼容 这使得原来处理ASC2字符的软件无须或只须做少部分的修改 即可继续使用

- 编码:
- 解读utf-8编码非常简单 
  如果一个字节的第一位是0 则这个字节单独就是一个字节
  如果第一位是1则连续有多少个1 就表示当前字符占用多少个字节

----------------

### 字母 转 数字
- 怎么才能将一个字符串转成数组的下标值呢？
- 单词 / 字符串 转 下标值 
- 其实就是 *字母 / 文字* -> *数字*  怎么转?


- 现在我们需要设计一种方案 可以将单词转成适当的下标
- 其实计算机中很多的编码方案就是用 数字 代替 单词的字符
- 就是 *字符编码* 
<!-- 
  字符编码最终的目的是转成2进制的数字 
  但为了更好的展现 用10进制来表示 但底层存储还是二进制
 -->

- 比如 ASC2编码: a是97 b是98 以此类推122代表z 
- 比如如果是英文 我们选择了 ASC2编码那是不是每一个字母都有一个对应的数字 cat
- c: 99
- a: 97
- t: 117

- 我们将这些数字结合起来 就是 *下标值: 9997117*


> 自己定义的字符编码
- 上面计算起来太麻烦还要对应去找字母对应的数字 我们设计一套自己编码 用于学习

- 比如a是1 b是2 c是3 以此类推 z是26
- 当然我们可以加上空格用0代替 就是27个字符(不考虑大写的问题) 


> 那一个单词怎么转成数字呢? 也有几种方案

> 1. 数字相加
- 一种将单词转换为数字的 简单方案 就是把每个单词每个字母的编码求和

- 如单词 cat 转成数字 3 + 1 + 20 = 24 那么 24就作为cat单词的下标存在数组中

**问题:**
- 按照这种方案有一个很明显的问题就是很多单词最终的下标可能都是24 我们知道数组中一个下标值的位置只能存储一个数据 如果存入后来的数据 必然会造成数据的覆盖 一个下标存储这么多的单词显然是不合理的


> 2. 幂的连乘
- 现在我们想通过一种算法 让cat转成数字后不那么普通 (上面的方案得到的结果太小 就非常容易重复)
- 数字相加的方案就有些过于普通了 有一种方案就是 幂的连乘 

- 什么是幂的连乘
- 其实我们平时使用的大于10的数字 可以用一种幂的连乘来表示它的唯一性:
- 幂的连乘也需要一个基数

  7 6 5 4 = 
    7 * 10^3 +
    6 * 10^2 + 
    5 * 10^1 +
    4 * 10^0


- 那我们的单词可以使用这种方案来表示 我们这里就不使用数字相加了 而是每个数字使用 幂的连乘

  cat = 3 1 20
    3  * 27^2 + 
    1  * 27^1 +
    20 * 27^0

  结果: 2234

- 为什么是27呢？因为我们的自定义编码就是27个
- 这样得到的数字可以 基本保证他的唯一性 不会和别的单词重复

**问题:**
- 如果一个单词是zzzzzzzz(一般英文单词不会超过10个字符)那么得到的数字超过70000000000
- 数组可以标识这么大的下标值么？ 而且就算能创建这么大的数组 事实上有很多是无效的单词 创建这么大的数组是没有意义的

- 幂的连乘优点是基本上*确保了下标的唯一性* 但是将数组扩展的太多了 同时*浪费了大量的空间*


> 两种方案的总结
- 第一种方案(把数字相加求和)产生的数组下标太少
- 第二种方案(与27的幂相乘求和)产生的数组下标又太多

- 上面的两个方案都有不好的地方 选择哪个呢？
- 我们选择 幂的连乘的形式 但是要改进 我们将 幂的连乘的方式得到的结果 将结果转成较小的数字 并且存到数组里面 

- 这种改进的方案就是 哈希化

----------------

### 哈希化
- 根据上面延伸出来的问题 我们现在需要一种 压缩方法 
- 把幂的连乘方案系统中得到的 
- *巨大整数范围* 压缩到 *可接受的数组范围*中


> 可接受数组范围
- 对于英文词典 多大的数组才合适呢？
- 如果只有50000个单词 可能会定义一个长度为50000的数组 

- 但是实际情况中 我们不能保证通过这个算法 得到的数字 能映射到数组中的每一个位置上 有些位置可能是没有的 有些位置可能是有两个的

- 所以一般情况下不是像我们数组 存几个东西就创建对应长度的数组 *哈希表一般情况下使用的数组往往比它需要存储数据量更大一些*

- 所以 往往需要 更大的空间 来存储这些单词 因为我们不能保证单词会映射到每一个位置 *比如两倍的大小* 100000


> 如何压缩
- 上面我们知道了 哈希表数组的长度要比实际数据的量要大一些 那还有一个问题 我们通过幂的连乘得到的数字很多 我们怎么把这个数字 进行压缩呢？

- 比如 把0到超过70000000000000范围 压缩到0到100000

- 有一种简单的方法就是使用 *取余操作符*
- 它的作用是得到 一个数 被 另外一个数 整除后的 *余数*


> 取余操作的实现
- 为了看到这个方法是如何工作 我们先来看一个 小点的数字范围 压缩到一个 小点的空间 中

- 假设把从 0 - 199 的数字 使用 largeNum 代表
- 压缩为从 0 - 9 的数字 使用 smallRange 代表

- 下标值的结果:
- index = largeNum % smallRange

- 当一个数被10整除时 余数一定在 0 - 9 之间
- 所以就是 


> 公式:

  目标数据(要压缩的数) % 下标范围 = *0 ~ 下标范围 - 1*

- 比如:
- 13  % 10 = 3
- 157 % 10 = 7
- 199 % 10 = 9

- 当然 这中间还是会有重复 不过重复的数量明显变小了 因为我们的数组是100000 而只有50000个单词 

- 就好比 你在 0-199中间选5个数字 放在这个长度为10的数组中 也会重复 但是重复的概率非常小(后面我们会讲到真的发生了重复 应该怎么解决)


- 上面就是 哈希化的过程


> 哈希化的概念
- 上面我们是说了哈希表的原理了 我们下面看看几个概念


> 哈希化
- 将大数字转化成数组范围内下标的过程 我们称之为 哈希化


> 哈希函数:
- 函数中一般包括两个部分
- 首先 通常我们会将单词转成大数字
- 然后 大数字压缩成小数字 

- 这些进行哈希化的代码实现放在一个函数中 这个函数我们称之为哈希函数


> 哈希表:
- 我们上面得到下标了(小数字) 将数据按照下标插入到数组中
- 然后我们再封装一些增删改查的操作 最后我们封装好的数据结构 就是一个哈希表

- 哈希表是我们所有封装之后的统称


- 但是 我们还有问题需要解决
- 虽然 我们在一个 100000 的数组中 放50000个单词已经足够了 但是通过哈希化后的下标值仍然可能会重复 如何解决这种重复的问题呢？


> 什么是哈希化的总结:
- 1. 我们会对 一个数据 转换成 下标值(数字) *这个部分是怎么实现的可能是那个hashcode*

- 2. 为了确保我们转换的结果 不会重复 或者基本上保证数据不会重复 我们会使用 幂的连乘 让结果不再普通(变的很大)

- 3. 压缩结果, 很大的结果会使用数组变的很长 所以我们有必要压缩这个结果至我们定义数组的长度范围内 这个过程使用的就是 取余

- 目标数据(要压缩的数) % 下标范围 = *0 ~ 下标范围 - 1*

- 将一个大数字压缩成一个小数字 这个过程就是哈希化

----------------

### 哈希表的冲突
- 上面我们了解了 尽管50000个单词 我们使用了100000个位置来存储 并且通过一种相对比较好的哈希函数来完成 但是依然有可能发生冲突

- 比如 melioration 这个单词 通过哈希函数得到它数组的下标值后 发现那个位置上已经存在一个 demystify 单词

- 因为它经过哈希化后和melioration得到的下标相同
- 这种情况就是 *冲突*

- 虽然我们不希望这种情况发生 当然更希望每个下标对应一个数据项 但是通常这是不可能的 *冲突不可避免 我们只能解决*


- 就像之前 0 - 199 的数字选取5个放在长度为10的数组中
- 如果我们随机选出来的是 33 82 11 45 90 那么最终他们的位置会是 3 - 2 - 1 - 5 - 0
<!-- 
  33 % 5
  82 % 5
  ...
 -->

<!-- 
  数据: 33 82 11 45 90 

  数组: 
                   73
  ----------------------------------------------
  | 90 | 11 | 82 | 33 |   | 45 |   |   |   |   |
  ----------------------------------------------
    0     1    2    3   4    5   6   7   8   9
 -->

- 如果还有一个 73 呢? 还是发生了冲突
- 即使冲突的可能性很小 我们依然要考虑到这种情况 以便发生的时候进行对应的处理代码


> 解决方案
- 如何解决这种冲突 常见的情况有*两种方案*
- 1. 链地址法(拉链法)
- 2. 开放地址法

----------------

### 链地址法(拉链法)
- 链地址法是一种比较常见的解决冲突的方案(也叫做拉链法)
- 其实 如果你理解了为什么会产生冲突 看到图后就可以立马理解链地址法是什么含义了

- 我们会根据 数据(编码数字) % 数组长度 得到 下标位置 那么下面这些数据避免不了会出现在同一个下标位 如果直接放到下标位 后放入的就会将前面的数据覆盖掉

<!-- 
  数组 arr

  -------
0      -> 30 -> 110
  -------
1      
  -------
2      -> 82 -> 2 -> 142
  -------
3      -> 93 -> 123
  -------
4      -> 144 -> 64 -> 194 -> 4
  -------
5  
  -------
6  
  -------
7      -> 77 -> 167
  -------
8      -> 8 -> 28
  -------
9      -> 189 -> 29
  -------

-->

- 为了避免这种情况 我们在数组的下标位上就不再单纯的存放一个数字 而是*在数组的每一个下标位 存放一个链表 或者 存储一个数组*

- 比如上面图里 arr[0] 的位置上我们放一个数组 或 链表
- 当数据30进来的时候它就作为  链表 或 数组 中的第一个元素
- 当数据110进来的时候它就作为 链表 或 数组 中的第二个元素
<!-- 
  每个下标位到底是放数组 还是 链表后面再说
-->

- 当我们进行查找的时候 先拿到我们哈希化后的下标值 通过下标值获取到链表 或 数组 然后在链表 或 数组中依次查找数据

- 这样就解决了冲突的问题 而且冲突的情况是比较少的 一般情况下很少会产生某个冲突导致一个链表非常的长


> 图片解析
- 从图片中我们可以看出 链地址法解决冲突的办法是 每个数组单元 中存储的不再是单个数据 而是一个链条

- 这个链条使用什么数据结构呢? 常见的是数组或者链表 比如是链表 也就是每个数组单元中存储着一个链表 一旦发现重复 将重复的元素插入到链表的首端或者末端即可 

- 当查询的时候 先根据哈希化后的下标值找到对应的位置 再取出链表依次查询找到数据


> 链表还是数组?
- 数组或者链表在这里其实都可以 效率上也差不多 因为根据哈希化的index找出这个数组或者链表时 通常就会使用 线性查找 这个时候数组和链表的效率是差不多的 

- 当然在某些实现中 *会将新插入的数据放在 数组 或者 链表的最前面 因为觉得新插入的数据 用于 取出的可能性更大*

- *这种情况最好采用链表* 因为数组在首位插入数据是需要所有其他项目后移 链表就没有这样的问题

- 当然 我觉得出于这个也看业务需求 不见得新的数据就访问次数会更多 比如我们微信新添加的好友 可能是刚认识的 练习的频率不见得比我们的老朋友更多 甚至新加的只是聊一两句 

- 所以这里个人觉得选择数组还是链表都是可以的

----------------

### 开放地址法
- 开放地址法的主要工作方式是 *寻找空白的单元格(数组上空的位置)* 来添加重复的数据

<!-- 
  数组 arr

  -------
0      
  -------
1   21    
  -------
2   82    
  -------
3     
  -------
4   144  
  -------
5  
  -------
6   96
  -------
7   127 
  -------
8   198    
  -------
9      
  -------
 -->

- 上面我们插入一波数据了 82在下标2 那假如新插入32(如果通过取余计算的话会插入到下标2的位置) *会产生冲突*

- 新插入的32应该在什么位置呢?


> 开放地址法解决方案
- 新插入的32本来应该插入到82的位置 但是该位置上已经包含数据了 我们发现下标3 5 9的位置是没有任何内容的 这个时候就可以寻找到对应的空白位置 来放这个数据

- 也就是说一旦要插入的位置上有数据了 就去找空的位置


- 但是到底使用哪一个位置？ 这里又需要分一些情况了 探索这个位置的方式不同 有三种方法来寻找空白的位置


> 1. 线性探测
- 线性的查找空白的单元

\\ 插入32:
- 经过哈希化得到的 index = 2 但是在插入的时候 发现该位置已经有了82 怎么办?

- 线性探测就是从 *index+1的位置* 开始一点点查找 *合适的位置* 来放置32 什么是合适的位置呢?

- *空的位置就是合适的位置* 在我们上面的例子中就是 index = 3 的位置 这个时候32就会放在该位置


\\ 查询32:
- 查询32和插入32的过程比较相似
- 首先经过哈希化得到 index = 2 
- 然后取出 index = 2 位置的元素 和查询的数值进行比较 看是否相同 相同那么就直接返回

- 不相同 从index+1的位置开始查找和32一样的

- *注意:*
- 情况1
- 如果32的位置我们之前没有插入 比如数组就是个空的 
- 这时候是否将整个哈希表查询一遍来确定32存在不存在? 

- 不用! 
- 查询过程有一个约定就是 *查询到空位置就停止* 
- 因为我们根据哈希化后会得到 下标值 如果这个下标值的位置是空的 就说明你肯本没有往里面插 也就不用看其它的空位置


- 情况2:
- 如果我们根据 下标值 查看到该位置不是 要查询的数值 就会从该位置 + 1开始继续查找 如果查找到空位置还不是要查询的数值 也停止 因为也证明这个数组中没有你要找的元素

- 因为我们就是根据这个规律进行添加的


\\ 删除32:
<!-- 
  -------
0      
  -------
1   21    
  -------
2   82    -> 32本来应该在这里但是这有值 32就会插入空位 
  -------
3         -> 32
  -------
4   144  
  -------
5         -> 62
  -------
6   96
  -------
7   127 
  -------
8   198    
  -------
9      
  -------
 -->

- 我们把32插入在index=3的位置 62插入到index=5的位置
- 有一天我们需要将32从hash表中删除 那么 index=3 就是null 比如后续的92要插入的时候就会插入到 index=3 的位置

- 但是我们在删除32的时候 将该位置置为null会产生问题 有一天我要查找62的时候怎么办? 

- 62哈希后的结果是2 为空 那么就会停止查找 而我们62原本就是在 index=5 的位置上 所以在删除某一个数据项的时候 会进行特殊的处理 比如设置为-1

- 删除操作 和 插入查询比较类似 但是也有一个特别注意点 删除操作一个数据项的时候 *不可以将这个位置下标的内容设置为null*

- 因为将它设置为null可能会影响我们之后查询其它操作 *所以通常删除一个位置的数据时 我们可以将它进行特殊处理比如设置为-1*

- 当我们之后*看到-1* 位置的数据时 就知道*查询时要继续查询* 但是*插入时这个位置可以放置数据*


> 线性探测的问题
- 线性探测有一个比较严重的问题 就是聚集 什么是聚集?
- 比如我在没有任何数据的时候 插入的是 22 23 24 25 26 那么意味着下标值 2 3 4 5 6 位置都有元素

- 这种*一连串填充单元*就叫做*聚集*

- 聚集会影响哈希表的性能 无论是插入 查询 删除都会影响
- 比如我们插入一个32 *会发现连续的单元都不允许我们放置数据* 我们会发现为了插入一个元素我们会跳过很多单元格才能找到允许放入的位置 这就需要探索多次

- 但是二次探测可以解决一部分这个问题

---

> 2. 二次探测
- 上面我们说过 线性探测存在的问题 *如果之前的数据是连续插入的* 那么新插入的一个数据可能*需要探测很长的距离*

- 二次探测主要优化的是 *探测时的步长* 

- 线性探测 我们可以看成是步长为1的探测 比如从下标值x开始 那么线性探测就是依次探测
- x+1, x+2, x+3

- 二次探测(依次平方探测) 对步长做了优化 比如从下标值x开始 
- x+1^2, x+2^2, x+3^2
<!-- 
  3+1, 3+4, 3+9 = 4, 7, 12
-->

- 二次探测依次可以探测很多步 这样就可以避免聚集带来的问题 将聚集的部分跳过去了以解决聚集的问题


> 二次探测的问题
- 但是二次探测依然存在问题 
- 比如我们的数组中已经有
  22 23 24 25 26

- 这时我们再插入
  32 112 82 2 192

- 他们哈希化后的下标值都是2 那它们在插入数组的时候 使用二次探测的步长都是一样的 

- 当插入32的时候 探测一两次可能就探测完了 可以插入了
- 但是插入112的时候 因为插入了32所以还要加一次探测 82 2 192也是一样 都需要依次加一次探测 它们探测的步骤也是慢慢的变的很多

- 也就是这种情况下会造成 *步长不一的一种聚集* 还是会影响效率(当然这种可能性相对于连续的数字会小一些)

- 怎么根本解决这个问题? 虽然要插入的数字的哈希化后的结果一样 但是让其步长不一样 接下来看 再哈希法

---

> 3. 再哈希法
- 为了消除线性探测和二次探测中无论步长+1 还是步长+平方中存在的问题 还一种*最常用的解决方案 再哈希法*

- 二次探测的算法产生的探测序列步长是固定的 1 4 9 16 以此类推已 现在需要一种方法 产生一种*依赖关键字的探测序列*
<!-- 
  关键字:
    我们存放在 hash表中的一项 仍然是一个数组 数组中每一个元素项为 [key, value]
    而上面和接下来说的关键字就是说的 key

    key的作用:
    - 根据 key 得到 hashCode 相当于在哈希表中的具体位置
 -->

- 而不是每个关键字都一样
- 比如
  2关键字 就决定2的步长是多少
  22关键字 就决定22的步长是多少
  112关键字 就决定112的步长是多少
<!-- 
  这是根据要插入的数据 再做一次哈希化么?
  第一次哈希化是为了确认该数据在数组中的位置
  第二次哈希化是为了确认该数据在使用二次探测时候的步长
 -->

- 那么 *不同的关键字*即使映射到相同的数组下标 也可以使用不同的探测序列

> 再哈希法的做法:
- 把关键字用另外一个哈希函数 *再做一次哈希化* 用这次哈希化的结果作为步长

- 对于 
  指定的关键字的步长在整个探测中是不变的 
  不过不同的关键字使用不同就是不同的步长

 
> 第二次哈希化需要具备如下特点:
- 和第一个哈希函数不同(不要再使你用上次的哈希函数 不然结果还是原来的位置)

- 不能输出为0(否则将没有步长 没吃探测都是原地踏步 算法就进入死循环)

- 总结:
- 1. 和确认下标值的哈希函数不能一样(取模那个)
- 2. 结果不能为0


- 那除了取模的哈希化还有什么方式??
- 其实我们不用费脑细胞来设计了 计算机专家 已经设计出一种工作很好的哈希函数


> 二次哈希函数
- *stepSize = constant - (key % constant)*

- stepSize:
  要求的步长

- constant: 
  常量(质数 且 小于数组的容量)

- key:
  [k, v]中的key

- eg:
- stepSize = 5 - (key % 5) 满足需求 并且结果不可能是0 最小是1

----------------

### 哈希化的效率
- 上面我们讲了 两种解决冲突的方法
- 1. 链地址
- 2. 开放地址

- 而开放地址法中寻找空白单元又分成了3种情况

- 那针对于上面的两种方案 哪个效率会比较高一些

---

- 哈希表中执行插入和搜索操作效率是非常高的
- 如果没有产生冲突 那么效率就会更高
- 如果发生冲突 存取时间就依赖后来的探测长度(找几个空白单元)
<!-- 
  链地址法产生冲突跟链表的长度有关系 存取时间就依赖链表的长度
 -->

- 所以产生冲突的情况下就依赖于后面的探测长度(链表长度)
- 而探测长度又跟 *填装因子* 有关系

- 随着填装因子变大 探测长度也越来越长 效率下降的情况 在不同开放地址方案中比链地址法更严重 所以我们来对比下他们的效率 再决定我们选取的方案


> 装填因子
> 装填因子 = 总数据项 / 哈希表长度
- 填装因子:
  当前哈希表中已经*包含的数据项* 和 *整个哈希表长度*的 比值

- 比如我们有一个长度为10(数组长度)的哈希表 现在已经存放了5个元素了

- 5 / 10 = 0.5
- 0.5就是当前哈希表的填装因子

- 开放地址法的装填因子 最大是多少呢? 1
- 因为我们要寻找空白单元一旦没有空就没有办法往里填充东西了 开放地址中我们最多也就是将整个哈希表装满 所以最大为1

- 10 / 10 = 1 (装满不就是 10 / 10)


- 链地址法的装填因子 最大是多少呢? 可以大于1
- 链地址法就有点无限了 *因为链表可以不断的往后加*
- 那么我们填充的个数 可能就会大于数组的长度

- 填装因子跟探测的长度是有关系的 
- 比如长度为10的数组原来里面一个元素也没有 那就不需要探测 当我们添加了一个 二个 三个 当元素越来越多的情况下 那么需要进行探测的可能性就越来越大 而且探测的长度也会越来越长 因为元素越来越满了 所以空白格越来越少了 (拉链法的话 就是i链条会变的越来越长) 空白格越来越少了 再在探测的时候需要的步长就会越来越多 需要探测次数也就越来越多了 

- 所以填充因子决定探测的长度(填充因子越高说明元素越多 开放地址法的话1就满了)

- 而探测长度又决定了哈希表的效率
- 那么两种解决冲突的方案 哪个效率比较高呢？


> 开放地址 二次探测和再哈希的性能
- 二次探测和再哈希比线性探测性能要好点 但是它们也会随着填充因子越来越大 最后效率变的越来越低 需要探测的次数也会越来越多


> 链地址
- 链地址法的效率也会随着填充因子的增加而增加但是不是像开放地址法那样呈指数的增加 而是平缓的增加

- 所以在真实开发中我们使用连地址法的情况比较多 因为它不会因为添加了某元素后性能急剧下降 比如java的hashmap中使用的就是链地址法


> 推荐: 哈希表结构建议使用 链地址法 解决冲突

----------------

### 优秀的哈希函数
- 讲了很久的哈希表理论知识 有没有发现在整个过程中 一个非常重要的东西 *哈希函数*

- 好的哈希函数应该尽可能让计算的过程变得简单 提高计算的效率 哈希表的主要优点是它的速度 所以在速度上不能满足 那么就达不到设计的目的了

- 提高速度的一个办法就是让哈希函数中 *尽量少的有乘法和除法* 因为它们的性能比较低的

- 设计好的哈希函数应该具备哪些优点呢？


> 1. 快速的计算
- 哈希表的优势就在于效率 所有快速获取到对应的hashCode非常重要 我们需要通过快速的计算来获取到元素对应的hashCode

> 霍纳法则
- 在前面 我们计算哈希值的时候使用的是幂的连乘方式
- cats = 03 * 27^3 +
         01 * 27^2 +
         20 * 27^1 +
         17 
       = 60337

- 这种方式是直观的计算的结果 但是这种方式的效率非常的第 那么这种计算方式会进行 几次乘法 几次加法 呢？

- 当然 我们可能不止4项 可能有更多的项 我们抽象一下 这个表达式其实是一个多项式

  a(n)x^n + a(n-1)x^(n-1) + ... + 1 = n(n+1) / 2

- 乘法次数: n + (n-1) + ... + 1 = n(n+1)/2
- 加法次数: n次 (有几项就是有几次加法)


- 多项式的优化: 霍纳法则
- 解决这类求值为题的高效算法 -- 霍纳法则 在中国 霍纳法则也被称为 秦九韶算法(对多项式进行的优化)

- 其实就是对上面的公式提取x

- 通过如下变化我们可以得到一个 快得多 的算法 即
 Pn(x) = anx^n + a(n-1)x^(n-1) + ... + a1x + a0 = 
 ((...(((anx + an - 1)x + an -2)x + an - 3) ... )x+a1)x + a0


- 变换后 我们需要多少次乘法 多少次加法呢？
- 乘法次数: n次
- 加法次数: n次
- 有几项就有几次加法 和 几次乘法

- 如果使用大O表示时间复杂度的话 我们直接从O(n^2)降到了O(n)

---

> 2. 均匀分布
- 哈希表中 无论是链地址法还是开放地址法 当多个元素映射到同一个位置的时候 都会影响效率 所以优秀的哈希函数应该尽可能的将元素映射到不同的位置 让元素在哈希表中均匀分布

- 在设计哈希表的时候 我们已经有办法处理 映射到相同下标值 的情况 链地址法 或 开放地址法

- 但是无论哪种方案 为了提供效率 最好的情况还是让数据在哈希表中均匀分布 因此*我们需要在使用常量的地方 尽量使用质数*

- 哪些地方我们会使用到常量呢？


> 质数的使用
- 1. 哈希表的长度(初始长度)
- 2. n次幂的底数(我们之前使用的是27)

- 为什么使用质数 会让哈希表分布更加的均匀呢? 


> 哈希表的长度
- 上面说了 哈希表的长度最好使用质数

- *开放地址法中的再哈希表中质数的重要性*
 
- 假设表的容量不是质数 例如 表长为15(下标值0 ~ 14) 有一个特定关键字(数据)映射到0 如果这个位置已经有数据了 那么我们需要继续探测吧 再哈希的话 会进行另外的哈希算法 

- 常量 - (key % 常量) = 步长

- 比如步长为5 探测序列是多少？
- 0 - 5 - 10 - 0 - 5 - 10 依次类推 循环下去 它会只探测这几个下标值的位置 如果这三个单元已经有了数据 那么会一直循环下去 直到程序崩溃

- 如果容量是一个质数 比如13 探测序列是多少呢？
- 0 - 5 - 10 - 2 - 7 - 12 - 4 - 9 - 1 - 6 -11 - 3 一直这样下去

- 不仅不会产生循环 而且可以让数据在哈希表中更加的均匀的分布

> 在开发地址法中 使用质数作为哈希表的长度 探测的次数会明显的减少

*链地址法中质数没有那么重要 甚至在java中故意是2的n次幂*

---

> Java中的HashMap
- java中的哈希表采用的是 链地址法
- HashMap的初始长度是16 每次自动扩展 长度为2的n次幂
- 这是为了服务于从 Key 映射到 index 的算法

- HashMap中为了提高效率 采用了位运算的方式
- HashMap中的index的计算公式

  index = HashCode(key) & (length - 1)

- 比如计算book的hashCode 结果为
  十进制的302937 
  二进制的101110001110101110 1001

- 假定HashMap长度是默认的16 那它的 length - 1 的结果为十进制的15 15的二进制为1111

- 把以上两个结果做与运算 
  
  1011100011101011110 1001 & 
                      1111 = 1001

- 前面少的为用0补齐 找 11为1 的到 1001
 
- 十进制是9 index = 9

- 这样的方式相对于取模来说性能是高的 因为计算机直接计算二进制数据

---

> 问题:
- 但是我个人发现js中进行较大数据的位运算时会出问题 所以我的代码中还是使用了*取模*
- 另外我这里为了方便代码之后向 开放地址法中迁移 容量还是选择使用*质数*

----------------

### 哈希函数的实现
- 老师这里的哈希函数的设计
- 1. 哈希表的长度使用了质数
- 2. 用了取模运算


> 哈希函数的目的
- 1. 将字符串(关键字) 转成 HashCode (比较大的数字)
- 2. 将 HashCode 压缩到数组的范围内

```js
function hashFn(str, size) {

}
```

- 参数:
- str:  要转换的字符串
- size: 数组范围(数组长度)


> 要点:
- 调用 字符串.charCodeAt(index) 获取指定字符的 unicode编码
```js
let str = "cats"
let code = str.charCodeAt(str[0]) 
console.log(code) // 99
```

- 霍纳法则:
- hashCode = 37 * hashCode + str.charCodeAt(i)


> 代码部分
```js
function hashFn(str, size) {

  // 1. 定义 hashCode 保存比较大的数字
  let hashCode = 0

  // 2. 使用霍纳法则 计算hashCode的值 得到的是比较大的hashCode的值
  for(let i = 0; i < str.length; i++) {

    // 幂的底数最好使用质数 一般情况下使用 37 的比较多(上面的章节中我们使用的是27)
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }

  // 3. 取余操作
  let index = hashCode % size
  console.log(hashCode) 
    // abc对应的hashCode为: 136518

  return index
}


// 测试: 计算字符串abc 应该在数组中的index 数组的长度为7
console.log(hashFn("abc", 7))   // 4
```

----------------

### 封装哈希表
- 经过了前面那么多的内容学习 我们接下来自己分装hash表
- 下面我们采用 *链地址法* 来实现哈希表

- 实现哈希表(storage), 
- 每个index对应的是一个数组(bucket, 当然链表也是可以的)

- bucket中存放的是什么? 
- 我们最好将 key 和 value 都放进去 我们继续使用一个数组(其实其他语言使用元组更好) 
```js
[ // hash表(数组)
  [ // hash表数组中的每一个元素 也是数组
    [ // 链表部分 或者 数组部分的每一项 使用数组存k,v
      k, v
    ]
  ]
]

/*
  - 哈希表数组 
    - 链表结构(或数组) 
      - 数组类型的元素项 k,v
*/
[[[k,v], [k,v]]] 
```

- 最终我们的哈希表的数据格式为:

  [
    [[k, v], [k, v], [k, v]], 
    [[k, v], [k, v]], 
    [[k, v]]
  ]

- key: 
  通过哪个key放进来的 也就是关键字 
  我们往 哈希表 中放东西肯定需要关键字 通过关键字存储另外一个数据
  <!-- 
    比如 英语字典 员工信息

    key: value
    python: python的相关释义
    tom: 员工的相关信息

    我们是通过key才决定放在hash表中的哪个位置的
   -->

- value: 真正想保存的值


<!-- 
  HashTable  storage
  当我们保存元素的时候 不仅仅是保存一个东西 而是两个

  -------
0      -> [元素, 元素]
  -------
1      -> [[k,v], [k,v]]
  -------
2      -> []
  -------
3      -> []
  -------
4      -> []
  -------
5      -> []
  -------
6      -> []
  -------
7      -> []
  -------
-->

- 上面说过 元素项是 链表 和 数组 没有那么大的差别


> 哈希表的基本结构 -- 属性
```js
class HashTable {

  // 主体数组: 做为主体结构 数组中存放相关的元素
  storage = []

  // 主体数组已经存多少元素了
  count = 0

  // 用于标记hash表可以存放多少个元素(总长度)
  limit = 7

}
```

> 参数:
> storage: 
- 主体数组

> count:
- 主体数组的长度(当前hash表中已经存放了多少元素)

- count的作用: 计算装填因子
- count为已经存放了多少元素 / hash表的总长度 = 装填因子(loadFactor)

- 当 loadFactor > 0.75 的时候 我们需要对数组进行扩容
<!-- 
  当>0.75之后性能就会变低了
-->

- 当 loadFactor < 0.25 的时候 我们需要对数组进行减容
<!-- 
  如果前期我们的hash表扩容到10000了 后期我们做了很多的删除操作 hash表中没有那么多元素了 就剩5个了 这时候我们要根据它减小数组的长度
 -->


> limit:
- 当前hash表的总长度
- 我们最好保证 每次扩容hash表的时候 长度都是质数

---

> 常见方法:
> hashFn
```js
hashFn(str, size) {
  let hashCode = 0
  for(let i=0; i<str.length; i++) {
    hashCode = 37 * hashCode + str.charCodeAt(i)
  }

  return hashCode % size
}
```

---

> put(key, value) -- 插入 和 修改 数据
- hash表的插入 和 修改操作是同一个函数
- 因为 当使用者传入一个 <key, value> 的时候
  如果原来不存该key 那么就是插入操作
  如果原来存在该key 那么就是修改操作


> 参数:
- key: 
  key决定了元素要插入在 主体数组中的哪个位置
  key的作用是索引的转换 不管是之后的查找 还是插入修改删除 key都是相当于索引的作用

- value: 
  真正想保存的值


> 代码解析:
- 1. 根据传入的 key 获取对应的 hashCode 也就是数组的index 找到数组应该插入到 主体数组 中的位置

- 2. 主体数组的元素项为 bucket数组的初始化操作
- 比如我们得到的index为3 那么怎么把数据插入该index的位置呢？数组例: "age": 18
- 首先我们会根据 age 得到 这个数据在主体数组中的对应位置
- 然后为了解决冲突 主体数组中该位置要么是链表 要么是数组 我们选择的是数组
- 所以每个索引中并不是直接保存数据 而应该是索引值对应的另一个数组(bucket)里面

- 根据 index 找到 hash表中的该位置 拿出index位置的项 判断是否为null
- 为null说明 该位置不是一个数组 首先我们要确保hash表中的每一项都是数组 
- 所以进行 元素项为数组的初始化操作
```js
let bucket = this.storage[index]
if(!bucket) {
  bucket = []
  this.storage[index] = bucket
}
```

- 3. 上面2的操作能确保 主体数组的每一项都是一个 bucket
- 那么我们就可以判断 该次操作是添加操作 还是 修改操作

- 方式:
- 取出 bucket 的每一项 线性查找 根据指定的key 和 bucket的元素项[k, v]中的key做判断 找到的情况下 就进行修改 并 return

- 上面的修改的操作 如果到下面的逻辑 就是添加的操作
```js
bucket.push([key,value])
```

- 4. hash表的长度+1

> 代码部分:
```js
put(key, value) {

  // 1. 根据 key 获取 元素应该在主体数组中的正确位置
  let index = this.hashFn(key, this.limit)

  // 2. 根据 index 取出桶(为了解决冲突的数组)
  let bucket = this.storage[index]

  // 3. 判断 bucket 是否为 null
  if(!bucket) {
    // 初始化该位置为一个数组 这样保证该index的位置一定是有一个桶的
    bucket = []

    // 将bucket插入指定的位置
    this.storage[index] = bucket
  }

  // 上面做了初始化操作 到这里 index 的位置一定是有一个桶的
  // 4. 判断是否是修改数据(线性查找 根据key遍历)
  for(let i=0; i<bucket.length; i++) {
    // 每个桶里面存的元素是 [k,v]
    let tuple = bucket[i]

    // 如果 [k,v] 的k 和 参数key一样 就是修改 所以让 v = value
    if(tuple[0] == key) {  
      tuple[1] = value
      return
    }
  }

  // 5. 如果来到这个位置说明不是修改数据 进行添加操作
  bucket.push([key,value])

  // 6. 哈希表长度 + 1
  this.count++
}
```
