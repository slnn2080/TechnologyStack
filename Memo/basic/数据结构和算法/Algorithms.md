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
// 因为 stack.size() 会发现变化 所以只能打印出来两个
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

> removeAt(data)
- 根据数据 删除对应的节点
- 直接调用上面定义好的方法 indexOf() removeAt()
```js
remove(data) {
  let position = this.indexOf(data)
  // removeAt()里面有越界判断了
  let res = this.removeAt(position)

  this.length--
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
- 无论多少珊瑚橘 插入和删除值需要接近常量的时间, 即O(1)的时间级 实际上 只需要几个机器指令即可完成

- 2. 哈希表的速度比树还要快 基本可以瞬间找到想要的元素 哈希表相对于树来说编码要容易很多


> hash表的不足
- hash表中的数据是*没有顺序*的 所以不能以一种固定的方式 比如从小到大 来遍历其中的元素

- 通常情况下 hash表中的*key是不允许重复*的 不能放置相同的key 用于保存不同的元素


- 集合和字典的实现一般都是基于hash表的 都是没有顺序 key不允许重复


> hash表是什么?
- 它不像数组和链表 甚至是树一样 直接画出来你就知道它的结构了 甚至原理了 

- *它的结构就是数组* 但是它神奇的地方在于*对下标值的一种变换* 这种变换我们称之为hash函数 通过函数可以获取到 HashCode


> 案例:
- 1. 公司使用一种数据结构来保存所有员工的信息
- 2. 设计一个数据结构 保存联系人和电话
- 3. 使用一种数据结构存储单词信息 比如有50000个单词 找到韩次后每个单词有自己的翻译&读音&应用等






