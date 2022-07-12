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


> append() 实现
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
    while(current.next) {
      // 如果 current.next 不为空 那么我就让 current(第一个节点) = 下一个节点
      current = current.next
    }

    // while循环结束后 current 就是最后一个节点 那么我们就让最后一个节点的next指向新追加的元素
    current.next = node
  }

  // 添加新节点后 修改 length  ++ 也可以但是python就不支持++
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
    str += current.data + " -- "

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