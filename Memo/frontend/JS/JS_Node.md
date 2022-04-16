### 待看前端的设计模式
- FileReader Blob ArrayBuffer FormData URL.createObjectURL 上传文件 后台接收



### 奇葩的初始化逻辑
- 我们可以先从一个地方取出一个变量先用 然后会其进行空判断 如果为空就赋初始值 然后在放回那个地方
```js
let obj = {}

let res = obj.num + 1
```




### defaultValue
- 场景
- 我想让文本框中的值 进行 修改前 和 修改后的对比
- 关于修改前的值 可以用 this.defaultValue 来获取

- defautValue是页面加载出来后input中的初始值
- value是当前input中的值

- 当input中的值未修改时，value == defaultValue，
- 当修改input值时，value为修改后的值，defaultValue仍为之前的。



### if else 减少嵌套
- https://www.jianshu.com/p/ea22123d4f62

> 场景1:
```js
if(a为真) {
    a = a
} else {
    a = b
}

-- 修改为:

a = a || b
```

> 场景2:
```js
if(a==b){
    a = c
}else{
    a = d
}

-- 修改

a = (a == b) ? c : d
```


> 场景3:
- 后台接口通常会返回这种数据：
```js
task: 0 // 0=紧急， 1=日常， 2=临时

-- 这种时候不能用判断 我们可以这样

let mapData = ["紧急", "日常", "临时"]
let res = mapData[task]
```

> 优化 if 逻辑
- 把最可能出现的情况放在最前面，最不可能出现的情况放在最后面

> 使用Array的方法或者Map等数据结构
- 如果是苹果 或者 草莓的话 输出 red
```js
function test(){
    if(fruit == 'apple' || fruit == 'strawberry'){
        console.log('red');
    }
}
```

- 那如果我们要添加更多的条件的时候 怎么办？ 不能一直 || || || || || || 吧
- 所以我们可以修改成如下的逻辑
```js
function test(fruit) {
    const redFruit = ['apple','strawberry','cherry','cranberry'];
    if(redFruit.includes(fruit)) {
        console.log("red")
    }
}
```

- 那如果我们有更多的颜色呢 不光光只输出红色的水果 我们可以将
- 颜色 : 水果 
- 组织成键值对的形式 根据key 去找对应的value

```js
const fruitColor = new Map()
fruitColor.set("red", ['apple','strawberry'])
fruitColor.set('yellow',['banana','pineapple']);
fruitColor.set('purple',['grape','plum']);

function test(color) {
    return fruitColor.get(color) || []
}
```

> 策略模式
```js
function func() {
  if (type === 'a') {
    // 执行内容 1
  } else if (type === 'b') {
    // 执行内容 2
  } else if (type === 'c') {
    // 执行内容 3
  }
  // 后续代码
}

-- 修改为

// 使用策略模式优化
function func() {
  let handlerA = () => { console.log('执行内容1') }
  let handlerB = () => { console.log('执行内容2') }
  let handlerC = () => { console.log('执行内容3') }
  
  let handlerMap = {
    a: handlerA,
    b: handlerB,
    c: handlerC
  }
  handlerMap[type] && handlerMap[type]()
  // 后续代码
}
```




### 栈结构
- 栈是一种特殊的线性表,它的存储空间是连续的。
- *栈的操作只能在表尾进行*, 因此栈的特点有一个是“*先入后出*”（LIFO）

- 栈就像一个杯子 
    栈底就是杯底
    栈顶就是杯顶

- 栈的头部(杯子),叫做栈底,  有一个指针始终指向栈底。
- 栈的最后一个元素,叫做栈顶, 也有一个指针指着。


> 加入元素的时候
- 会在栈尾加入,叫做：进栈, 入栈, 或压栈。
- 元素入栈后，尾指针会指向它的地址。

> 删除元素时
- 删除尾部最后一个,叫做出栈或退栈。


> 栈的操作
- 对于数组来讲 栈顶就是 数组的末尾

> push(element): 
- 添加一个新元素到栈顶位置.

> pop()
- 移除栈顶的元素，同时返回被移除的元素。

> getTopElement()
- 返回栈顶的元素，不对栈做任何修改（这个方法不会移除栈顶的元素，仅仅返回它）

> isEmpty()
- 如果栈里没有任何元素就返回 true，否则返回 false。

> size()
- size()：返回栈里的元素个数，这个方法和数组的 length 属性很类似。

> toString()
- 展示当前栈内所有元素


> 使用js来实现栈
```js
function Stack() {
    // 初始化一个栈(数组)
    this.list = []

    // 入栈
    Stack.prototype.push = function(e) {
    this.list.push(e)
    }


    // 出栈
    Stack.prototype.pop = function() {
    return this.list.pop()
    }

    // 获取栈顶的元素
    Stack.prototype.getTopElement = function() {
    return this.list[this.list.length - 1]
    }

    // 判断栈是否为空
    Stack.prototype.isEmpty = function() {
    let size = this.list.length
    return size === 0
    }

    // 展示当前栈内所有元素
    Stack.prototype.toString = function() {
    let string = ""
    for(let i in this.list) {
        string += `${this.list[i]}`
    }

    return string
    }
}
```

> 栈结构应用
- 十进制转二进制

- 思路
- 目标数字除以2的商继续除以2 得到的余数取逆

- 注意:
- 里面的循环条件

```js
function d2b(number) {
    // new 栈
    let stack = new Stack()

    // 循环入栈
    while (number > 0) {
        stack.push(number % 2)
        number = Math.floor(number / 2)
    }

    // 循环出栈
    let string = ''
    while (!stack.isEmpty()) {
        string += stack.pop()
    }

    return string
}

console.log(d2b(168)) // 10101000
```


### 队列结构
- 上面我们说了 栈结构 栈结构的特点是先入后出
- 我们可以把栈结构想象成一个杯子

- 这里我们再了解一下 队列结构
- 队列结构的特点就是 先入先出

- 队列是一种受限的线性结构
- 受限之处在于它只允许在
    表的前端（front）进行删除操作
    而在表的后端（rear）进行插入操作

> 我们把队列想象成一根管子
- 左手边 出去 (删除操作)
- 右手边 进来 (插入操作)


- 生活中类似队列的场景有很多，比如：
- 食堂排队打饭（喜欢插队的小伙伴除外）
- 排队上厕所蹲坑（坑位只有一个）
- 超市排队结账


> 队列的实现
- 队列的实现我们也利用 数组 
- 实现栈的时候 我们用的是 pop() push() api

- 实现队列的时候 我们用的是 shift() push() api


> enqueue(element)
- 向队列尾部添加一个（或多个）新的项。

> dequeue()
- 移除队列的第一（即排在队列最前面的）项，并返回被移除的元素。

> front()
- 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。

> isEmpty()
- 如果队列中不包含任何元素，返回 true，否则返回 false。

> size()
- 返回队列包含的元素个数，与数组的 length 属性类似。

> toString()
- 返回当前队列，字符串形式。


> 代码实现一个队列
```js
 function Queue() {
    // 初始化一个栈(数组)
    this.list = []

    // 入队列
    Queue.prototype.enqueue = function(e) {
    this.list.push(e)
    }


    // 出队列
    Queue.prototype.dequeue = function() {
    return this.list.shift()
    }

    // 返回队列中的第一个元素
    Queue.prototype.front = function() {
    return this.list[0]
    }

    // 判断队列是否为空
    Queue.prototype.isEmpty = function() {
    let size = this.list.length
    return size === 0
    }

    // 返回队列中元素个数
    Queue.prototype.size = function () {
    return this.list.length
    }

    // 返回当前队列
    Queue.prototype.toString = function() {
    let string = ""
    for(let i in this.list) {
        string += `${this.list[i]}`
    }

    return string
    }
}


// 创建队列对象
var queue = new Queue()

// 在队列中添加元素
queue.enqueue("Vue")
queue.enqueue("React")
queue.enqueue("Angular")

// 查看一下队列前端元素
console.log(queue.front())

// 查看队列是否为空和元素个数
console.log(queue.isEmpty())
console.log(queue.size())

// 从队列中删除元素
console.log(queue.dequeue())
console.log(queue.dequeue())
console.log(queue.dequeue())
```

> 应用1
- 击鼓传花队列实现

- 这里我们的游戏规则可能和现实中的规则有一些不一样,具体游戏规则如下:

- 几个人围成一圈,开始数数,数到某个数字的人自然被淘汰
最后剩下的那个人获得胜利,求出最后那个人的位置
```js
//传入人员个数以及每次数数的个数
function passFlower(member, num) {
    let queue = new Queue()

    for(let i=0; i < member.length; i++) {
        queue.enqueue(member[i])
    }

    while (queue.list.length !== 1) {
        for(let i=0; i < num - 1; i++) {
            queue.enqueue(queue.dequeue())
        }
        queue.dequeue()
    }
    return queue.list[0]
}

console.log(passFlower(['V', 'W', 'X', 'Y', 'Z'], 3))
```


> 优先级队列的实现
- 实现优先级队列主要有四个方面需要考虑
- 1. 封装元素和优先级放在一起(可以封装一个新的构造函数)

- 2. 添加元素时, 将当前的优先级和队列中已经存在的元素优先级进行比较

- 3. 一旦优先级, 大于某个元素, 就将该元素插入到元素这个元素的位置. 其他元素会依次向后移动.

- 4. 如果遍历了所有的元素, 没有找到某个元素被这个新元素的优先级低, 直接放在最后即可.

```js
// 定义队列
function PriorityQueue() {
    this.list = []

    function EachElement(e, num) {
        // 元素
        this.element = e
        // 优先级
        this.priority = num
    }

    //入列
    PriorityQueue.prototype.enqueue = function (e, priority) {
        let element = new EachElement(e, priority)

        if(this.list.length === 0) {
            this.list.push(element)
            return;
        }

        for(let i in this.list) {
            if(element.priority < this.list[i].priority) {
                this.list.splice(i, 0, element)
                return;
            }
        }

        this.list.push(element)
    }

    //出列
    PriorityQueue.prototype.dequeue = function () {
        return this.list.shift()
    }

    //返回当前队列的元素个数
    PriorityQueue.prototype.size = function () {
        return this.list.length
    }

    //返回当前队列第一个元素
    PriorityQueue.prototype.front = function () {
        return this.list[0]
    }

    //判断优先级队列是否为空
    PriorityQueue.prototype.isEmpty = function() {
        if(this.list.length === 0) {
            return true
        }
        else {
            return false
        }
    }

    //返回当前队列
    PriorityQueue.prototype.toString = function () {
        let string = ''
        for(let i in this.list) {
            string += `${this.list[i].element}:${this.list[i].priority} `
        }
        return string
    }
}

export default PriorityQueue


// 使用队列
// 创建优先级队列对象
var pQueue = new PriorityQueue()

// 添加元素
pQueue.enqueue("Vue", 10)
pQueue.enqueue("React", 5)
pQueue.enqueue("Angular", 12)
pQueue.enqueue("Svelte", 3)

// 遍历所有的元素
var size = pQueue.size()
for (var i = 0; i < size; i++) {
    var item = pQueue.dequeue()
    console.log(item.element + "-" + item.priority)
}
```


### 单向链表
- 要存储多个元素，数组（或列表）可能是最常用的数据结构。
- 每种语言都实现了数组。这种数据结构非常方便，提供了一个便利的[]语法来访问它的元素。然而，这种数据结构有一个缺点：

- 在大多数语言中，数组的大小是固定的，从数组的起点或中间``插入或移除项的成本很高，因为需要移动元素；尽管 JavaScript 中的Array类方法可以帮我们做这些事，但背后的处理机制同样如此。

> 什么是链表
- 链表存储有序的元素集合，但不同于数组，链表中的元素在内存中并不是连续放置的。

- 每个元素由 一个存储元素本身的节点 和 一个指向下一个元素的引用(也称指针或链接)组成。下图展示了链表的结构:

       node
        □□
        ↙↘
    item  next

- 相对于传统的数组，链表的一个好处在于，添加或移除元素的时候不需要移动其他元素。然而，链表需要使用指针，因此实现链表时需要额外注意。


- 数组的另一个细节是可以直接访问任何位置的任何元素，而要想访问链表中间的一个元素，需要从起点(表头)开始迭代链表直到找到所需的元素。

- 现实中有许多链表的例子：一列火车是由一系列车厢/车皮组成的，每节车厢/车皮都相互连接，你很容易分离一节车皮，改变它的位置，添加或移除它。下图演示了一列火车，每节车皮都是链表的元素，车皮间的连接就是指针：


> 创建一个链表类
- 1. 封装LinkedList的类, 用于表示我们的链表结构
- 2. 在 LinkedList 类中有一个Node类, 用于封装每一个节点上的信息
- 3. 链表中我们保存两个属性, 一个是链表的长度, 一个是链表中第一个节点

```js
/ 封装链表的构造函数
function LinkedList() {
    // 表示链表的长度
    this.length = 0

    // 表示链表的第一个节点
    this.head = null

    // 封装一个Node类, 用于保存每个节点信息
    function Node(element) {
        // 节点信息
        this.element = element

        // 指针
        this.next = null
    }
}

```

> 封装一些常见操作
- 这里我们可以模拟类似数组的一些增删改查的方法来封装一个关于链表的常见操作:

> append(element)：
- 向列表尾部添加一个新的项

**注意:**
- 链表为空的情况：新添加的节点直接赋值给 head
- 链表不为空的情况：将新添加的节点赋值给最后一个节点 next
- 当然了，要记得在添加完成后给链表的 length 加 1

```js
// 链表尾部追加元素方法
LinkedList.prototype.append = function (element) {

    // 1.根据新元素创建节点
    var newNode = new Node(element)

    // 2.判断原来链表是否为空
    if (this.head === null) { // 链表尾空
        this.head = newNode
    } else { // 链表不为空

        // 2.1.定义变量, 保存当前找到的节点
        var current = this.head

        while (current.next) {
            current = current.next
        }

        // 2.2.找到最后一项, 将其next赋值为node
        current.next = newNode
    }

    // 3.链表长度增加1
    this.length++
}
```

> insert(position, element)：
- 向列表的特定位置插入一个新的项。

**注意:**
- 插入位置校验：比如当前链表长度为 2，插入的位置为 5，这种情况是肯定不允许的
- 找到正确插入的位置：想要找到正确的插入位置，需要对链表进行循环操作
- 注意插入式中间插入还是头部插入

```js
// 根据下标删除元素
LinkedList.prototype.insert = function (position, element) {
    // 1.检测越界问题: 越界插入失败
    if (position < 0 || position > this.length) return false

    // 2.找到正确的位置, 并且插入数据
    var newNode = new Node(element)
    var current = this.head
    var previous = null
    index = 0

    // 3.判断是否列表是否在第一个位置插入
    if (position == 0) {
        newNode.next = current
        this.head = newNode
    } else {
        while (index++ < position) {
            previous = current
            current = current.next
        }

        newNode.next = current
        previous.next = newNode
    }

    // 4.length+1
    this.length++

    return true
}
```

> indexOf(element)：
- 返回元素在列表中的索引。如果列表中没有该元素则返回-1。
- indexOf()方法返回元素在列表中的索引，可以直接循环当前链表元素，获取下标位置：

```js
// 根据元素获取链表中的位置
LinkedList.prototype.indexOf = function (element) {
    // 1.定义变量, 保存信息
    var current = this.head
    index = 0

    // 2.找到元素所在的位置
    while (current) {
        if (current.element === element) {
            return index
        }
        index++
        current = current.next
    }

    // 3.来到这个位置, 说明没有找到, 则返回-1
    return -1
}
```

> remove(position)：
- 从列表的特定位置移除一项。

**注意:**
- remove()方法从列表中移除一项，移除数据有两种常见的方式：
- 根据位置移除对应的数据
- 根据数据, 先找到对应的位置, 再移除数据

- 根据位置移除对应的数据
- 同insert方法类似，需要对位置进行判断是否在可移除范围内
- 移除第一项时, 直接让head指向第二项信息就可以
- 移除其他项的信息时，我们需要通过while循环, 找到正确的位置；找到正确位置后, 就可以直接将上一项的next指向current项的next, 这样中间的项就没有引用指向它, 也就不再存在于链表后, 会面会被回收掉.

```js
// 根据位置移除节点
LinkedList.prototype.remove = function (position) {
    // 1.检测越界问题: 越界移除失败, 返回null
    if (position < 0 || position >= this.length) return null

    // 2.定义变量, 保存信息
    var current = this.head
    var previous = null
    var index = 0

    // 3.判断是否是移除第一项
    if (position === 0) {
        this.head = current.next
    } else {
        while (index++ < position) {
            previous = current
            current = current.next
        }

        previous.next = current.next
    }

    // 4.length-1
    this.length--

    // 5.返回移除的数据
    return current.element
}
```

> removeEl(element)：
- 从列表中移除一项元素。
- 可以直接利用 indexOf() 方法查询出元素所在的位置，再根据位置移除元素

```js
// 根据元素删除信息
LinkedList.prototype.removeEl = function (element) {
    var index = this.indexOf(element)
    return this.remove(index)
}
```

> isEmpty()：
- 如果链表中不包含任何元素，返回 true，如果链表长度大于 0 则返回 false。
- 直接根据链表的长度length来封装：
```js
// 判断链表是否为空
LinkedList.prototype.isEmpty = function () {
    return this.length == 0
}
```

> size()：
- 返回链表包含的元素个数。与数组的 length 属性类似。
- 直接根据链表的长度length来封装：
```js
// 获取链表的长度
LinkedList.prototype.size = function () {
    return this.length
}
```

> toString()：
- 由于列表项使用了 Node 类，就需要重写继承自 JavaScript 对象默认的 toString 方法，让其只输出元素的值。

- toString()方法将链表转换成字符串形式，直接使用循环拼接即可：
```js
// 链表的toString方法
LinkedList.prototype.toString = function () {
    // 1.定义两个变量
    var current = this.head
    var listString = ""

    // 2.循环获取链表中所有的元素
    while (current) {
        listString += "," + current.element
        current = current.next
    }

    // 3.返回最终结果
    return listString.slice(1)
}
```


### 双向链表
- 在上一篇文章中，我们对图片单向列表做了详解，单向列表主要有哪些特点呢？

- 只能从头部遍历到尾部，或者从尾部遍历到头部
- 单向的，上一个链表中有一个指向``下一个的引用
- 通过以上两个特点也能看出单向链表有一个非常明显的缺点：

- 单向链表中我们可以轻易的获取到下一个节点，但是想要获取上一个节点，就得从链表头部开始遍历才能获取到想要的节点

- 但是在实际开发中，想获取上一个节点的情况还是很多的，那么如何解决这个问题呢？

- 答案：双向链表

> 什么是双向链表
- 双向链表可以有效的解决单向链表中提到的问题，那么双向链表主要有哪些特点？

- 既可以从头遍历到尾, 又可以从尾遍历到头；链表相连的过程是双向的
- 一个节点既有向前连接的引用, 也有一个向后连接的引用


> 双向链表有什么缺点呢?
- 每次在插入或删除某个节点时, 需要处理四个节点的引用, 而单向链表只有两个
- 并且相当于单向链表, 必然占用内存空间更大一些.
- 但是这些缺点和我们使用起来的方便程度相比, 是微不足道的


> 创建一个双向链表类
- 创建双向链表类的思路基本上和创建单向链表类的思路很类似，由于一个节点既有向前连接的引用, 也有一个向后连接的引用的特性，需要增加以下属性：

- 在单向链表的基础上增加 prev 属性，该属性用于指向上一个节点
- 添加 tail 属性，用于指向末尾节点

```js
// 创建双向链表的构造函数
function DoublyLinkedList() {
    // 创建节点构造函数
    function Node(element) {
        this.element = element
        this.next = null
        this.prev = null // 新添加的
    }

    // 定义属性
    this.length = 0
    this.head = null
    this.tail = null // 新添加的
}

```

> 封装一些常见操作
- 常见的操作方法和单向链表的常见操作方法基本一样，这里就不一一阐述；但是在实现的过程中，双向链表可能会更加的复杂一点。主要的复杂点：一个节点既有向前连接的引用, 也有一个向后连接的引用

> append()方法
- append()方法向尾部增加数据，有两种情况：

- 链表中原来没有数据：直接让head和tail指向这个新的节点即可
- 链表中存在数据：
- 新节点的next/tail目前都是 null. 但是作为最后一个节点, 需要有一个指向前一个节点的引用. 所以这里我们需要newNode.prev = this.tail

- 因为目前newNod已经变成了最后的节点, 所以 this.tail 属性的引用应该指向最后: this.tail = newNode即可

- 记得最后一步：this.length++

```js
// 在尾部追加数据
DoublyLinkedList.prototype.append = function (element) {
    // 1.根据元素创建节点
    var newNode = new Node(element)

    // 2.判断列表是否为空列表
    if (this.head == null) {
        this.head = newNode
        this.tail = newNode
    } else {
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
    }

    // 3.length+1
    this.length++
}
```


> insert() 方法
- insert() 方法主要用来向链表任意位置插入数据，相对于单向链表来说，这里就稍微复杂点

- 插入元素主要可以分为三种情况：头部插入、中间插入、尾部插入

- 以下分为三种情况详解：

- 头部插入元素
- 将元素插入到头部是比较简单只需要分成了两种情况：

- 列表为空：那么直接让head/tail指向newNode即可
- 列表不为空：这个时候需要修改原来head的prev指向新节点,新节点的next指向原来的head. 并且head现在要指向newNode


- 中间位置插入元素
- 将元素插入到中间的某个位置，这种可能需要考虑的情况要稍微多点

- 我们需要找到正确的插入位置, 通过while循环, 这个并不难, 因为我们在单向链表的时候已经找过了.
- 首先, 你的newNode的next/prev必然要指向前后的节点, 也就是current和previous
- 其次, 而current的prev需要指向newNode, 而previous的next需要指向newNode.


- 尾部插入元素
- 插入尾部其实就是append() 方法，详情看图解：
```js
// 在任意位置插入数据
DoublyLinkedList.prototype.insert = function (position, element) {
    // 1.判断越界的问题
    if (position < 0 || position > this.length) return false

    // 2.创建新的节点
    var newNode = new Node(element)

    // 3.判断插入的位置
    if (position === 0) { // 在第一个位置插入数据
        // 判断链表是否为空
        if (this.head == null) {
            this.head = newNode
            this.tail = newNode
        } else {
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
        }
    } else if (position === this.length) { // 插入到最后的情况
        // 思考: 这种情况是否需要判断链表为空的情况呢? 答案是不需要, 为什么?
        this.tail.next = newNode
        newNode.prev = this.tail
        this.tail = newNode
    } else { // 在中间位置插入数据
        // 定义属性
        var index = 0
        var current = this.head
        var previous = null

        // 查找正确的位置
        while (index++ < position) {
            previous = current
            current = current.next
        }

        // 交换节点的指向顺序
        newNode.next = current
        newNode.prev = previous
        current.prev = newNode
        previous.next = newNode
    }

    // 4.length+1
    this.length++

    return true
}
```

> remove() 方法
- remove()方法从列表的特定位置移除一项，和插入基本类似，也可以分为三种情况：移除头部、移除中间、移除末尾

- 移除头部
- 删除头部元素分为两种情况：
- 链表只有一个元素：那么将head/tail直接设置为null即可
- 链表有多个元素：这个时候删除头部的元素 head = head.next;head.prev = null


- 移除中间元素
- 删除中间的元素其实也很简单，只需要使用while循环找到删除元素的正确位置，将previous的next直接设置成current的next, 将current.next的prev设置成previous即可


- 移除尾部元素
- 删除尾部元素直接将tail设置为 tail 的prev；tail 的next设置为null即可

```js
// 根据位置删除对应的元素
DoublyLinkedList.prototype.removeAt = function (position) {
    // 1.判断越界的问题
    if (position < 0 || position >= this.length) return null

    // 2.判断移除的位置
    var current = this.head
    if (position === 0) {
        if (this.length == 1) {
            this.head = null
            this.tail = null
        } else {
            this.head = this.head.next
            this.head.prev = null
        }
    } else if (position === this.length -1) {
        current = this.tail
        this.tail = this.tail.prev
        this.tail.next = null
    } else {
        var index = 0
        var previous = null

        while (index++ < position) {
            previous = current
            current = current.next
        }

        previous.next = current.next
        current.next.prev = previous
    }

    // 3.length-1
    this.length--

    return current.element
}
```

> indexOf()方法
- indexOf()方法用于获取元素在链表中的位置，这个和单向链表的实现方式一样，直接使用while循环获取，这里不做过多讲解，直接上代码：
```js
// 根据元素获取在链表中的位置
DoublyLinkedList.prototype.indexOf = function (element) {
    // 1.定义变量保存信息
    var current = this.head
    var index = 0

    // 2.查找正确的信息
    while (current) {
        if (current.element === element) {
            return index
        }
        index++
        current = current.next
    }

    // 3.来到这个位置, 说明没有找到, 则返回-1
    return -1
}
```

> isEmpty()方法
- 直接根据链表的长度length来封装：
```js
// 判断链表是否为空
DoublyLinkedList.prototype.isEmpty = function () {
    return this.length == 0
}
```

> size()方法
- 直接根据链表的长度length来封装：
```js
// 获取链表的长度
DoublyLinkedList.prototype.size = function () {
    return this.length
}
```

> getHead()方法
```js
// 获取第一个元素
DoublyLinkedList.prototype.getHead = function () {
    return this.head.element
}
```

> getTail()方法
```js
// 获取最后一个元素
DoublyLinkedList.prototype.getTail = function () {
    return this.tail.element
}
```



### 装饰器
- 装饰器（Decorator）是一种与类（class）相关的语法
- *装饰器是一种函数*，写成 *@ + 函数名*

- 它可以放在类和类方法的定义前面。

- 例如: 
- 下面代码一共使用了四个装饰器，一个用在类本身，另外三个用在类方法。
```js
@frozen class Foo {

  @configurable(false)
  @enumerable(true)

  method() {}

  @throttle(500)

  expensiveMethod() {}

}
```

> 装饰器的定义
- 装饰器就是一个函数 所以定义装饰器的方式 就是定义一个函数
- 装饰器是一个对类进行处理的函数。装饰器函数的第一个参数，就是所要装饰的目标类。

- 参数
- 形参就是 被装饰的类

- 通过装饰器 可以给 目标类 添加属性

> 定义格式:
- 装饰器的定义和使用 

> 为类添加 静态属性:
- 相当于给 MyTestableClass 类本身添加属性 因为 target就是类本身
```js
// 定义装饰器 target就是被装饰的类
function testable(target) {
    target.isTestable = true
}


// 将装饰器 装饰 整个类 装饰哪个类 target就是哪个类
@testable
class MyTestableClass {

}

// 装饰器给类添加了静态属性 isTestable 
MyTestableClass.isTestable // true
```


- 默认装饰器只有一个参数就是被装饰类 如果想给装饰器添加参数 可以使用高阶函数的形式
```js
// 外层函数用于接收参数
function testable(isTestable) {

  // 内部 return 的这个函数的参数 才是 被装饰类
  return function(target) {
    // 利用外层的参数 我们对类中的静态属性进行赋值操作
    target.isTestable = isTestable;
  }
}
```

- 像上面 高阶函数的形式定义的装饰器 就可以接收额外的参数了
```js
@testable(true)
class MyTestableClass {}
MyTestableClass.isTestable  // true
```


> 为类添加实例属性 
- 添加实例属性 可以通过 prototype 来操作

```js
// 定义装饰器
function testable(target) {
    // 给类的原型对象上添加属性 这样它的实例对象就能拿到
    target.prototype.isTestable = true;
}

// 将装饰器应用在 类上
@testable
class MyTestableClass { }

// 查看类的实例对象身上有没有该属性
let obj = new MyTestableClass();
obj.isTestable // true
```


> 例子:
```js
// mixins.js
// 将传递进来的参数 添加到 类的原型对象上
export function mixins(...list) {
    return function(target) {
        Object.assign(target.prototype, ...list)
    }
}


// import {mixins} from "./mixins.js"
// 定义个数据
const foo = {
    foo() {
        console.log("foo")
    }
}


// 在类上使用定义的装饰器 并把上面定义的数据传递进去
@mixins(foo)
class MyClass {}

// 测试
let obj = new MyClass()
obj.foo()
```

- 实际开发中，React 与 Redux 库结合使用时，常常需要写成下面这样。
```js
class MyReactComponent extends React.Component {}
export default connect(mapStateToProps, mapDispatchToProps)(MyReactComponent);
```

- 有了装饰器，就可以改写上面的代码。
```js
@connect(mapStateToProps, mapDispatchToProps)
export default class MyReactComponent extends React.Component {}
```


> 方法的装饰
- 装饰器不仅可以装饰类，还可以装饰类的属性。
```js
class Person {
    @readonly
    name() {
        return `${this.first} ${this.last}`
    }
}

// 上面代码中，装饰器readonly用来装饰“类”的name方法。

// 定义 readonly 装饰器
function readonly(target, name, decriptor) {
    // descriptor对象原来的值如下
    {
        value: specifiedFunction,
        enumerable: false,
        configurable: true,
        writable: true
    };

    descriptor.writable = false;
    return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);
```

- 参数:
- 装饰器第一个参数是类的原型对象
<!-- 
    上例是Person.prototype
    装饰器的本意是要“装饰”类的实例，但是这个时候实例还没生成，所以只能去装饰原型（这不同于类的装饰，那种情况时target参数指的是类本身）；
-->

- 第二个参数是所要装饰的属性名，
- 第三个参数是该属性的描述对象。

- 上面代码说明，装饰器（readonly）会修改属性的描述对象（descriptor），
- 然后被修改的描述对象再用来定义属性。


- 我们看下下面的例子:
- 修改属性描述对象的enumerable属性，使得该属性不可遍历。
```js
class Person {
    @nonenumerable
    get kidCount() {
        return this.children.length
    }
}

// 定义装饰器
function nonenumerable(target, name, decriptor) {
    decriptor.enumerable = false;
    return decriptor
}
```



### insertAdjacentHTML() 
- 将指定的文本解析为HTML或XML，并将结果节点插入到DOM树中的指定位置。它不会重新解析它正在使用的元素，因此它不会破坏元素内的现有元素。这避免了额外的序列化步骤，使其比直接innerHTML操作更快。

> element.insertAdjacentHTML(position, text);
- position是相对于元素的位置，并且必须是以下字符串之一：
- beforebegin:  元素自身的前面。
  afterend:     元素自身的后面。
  
  afterbegin:   插入元素内部的第一个子节点之前。
  beforeend:    插入元素内部的最后一个子节点之后。
  



### Window.matchMedia(mediaQueryString) 
- eg:
- "(max-width: 874px)"

- 可以直接使用 matchMedia() 方法

> 使用方式
- let mqList = matchMedia(mediaQueryString)

> mqList.matches
- 如果当前document匹配该媒体查询列表则其值为true；反之其值为false。*只读*


- 作用:
- 可以返回一个表示指定媒体查询字符串的已解析结果的新MediaQueryList对象
- 可被用于判定Document是否匹配媒体查询, 或者监控一个document 来判定它匹配了或者停止匹配了此媒体查询。

- 说白了就是:
- 视口满足 我们传入的 "(max-width: 874px)" 规则 那就返回true 否则就返回false

- 举例:
- 运行媒体查询(max-width: 600px)并在<span>;中显示MediaQueryList的matches属性值。
- 如果视口的宽度小于或等于600像素，则输出将为true，而如果窗口的宽度大于此宽度，则将输出false。
```js
let mql = window.matchMedia('(max-width: 600px)');
document.querySelector(".mq-value").innerText = mql.matches;
```


### 焦点元素
> activeElement 
- 属性返回文档中当前获得焦点的元素

> document.activeElement.tagName;
- 返回元素的标签名

> element.focus() 
- 为元素设置焦点

> document.hasFocus() 
- 查看当前元素是否获取焦点。



### 面向对象编程 - 后盾人
- 我们先看下函数式编程 求平均成绩
```js
let name = "Sam"
let grade = [
    {
        name: "js",
        score: 99
    },
    {
        name: "docker",
        score: 76
    }
]

function average(grade, name) {
    let total = grade.reduce((pre, item) => pre + item.score, 0)
    return `${name}: ${total / grade.length}`
}

console.log(average(grade, name))
```

- 上面我们将逻辑都暴露在全局 就会有函数名重复 覆盖等问题 也会让程序变得错综复杂

- 上面这些都是对用户的操作 我们可以把它们变成对象

- 我们可以将上面的逻辑放在对象中 对象中的属性可以存储不同的值
```js
let user = {
    name: "Sam",
    grade: [
        {
            name: "js",
            score: 99
        },
        {
            name: "docker",
            score: 76
        }
    ],

    // 这个函数就是方法 函数中需要的数据都在这个对象中 所以我们可以通过this来调用我们需要的属性 不用传递了
    average: function() {
        let total = this.grade.reduce((pre, item) => pre + item.score, 0)

        return `${this.name}: ${total / this.grade.length}`
    }
}

console.log(user.average())
```


> 技巧1:
- 有一个场景 下面的upload函数 里面有一个config属性 我们调用函数的时候要求传递进去一个配置对象

- 但要求是 如果我们只传递了type 那么只修改type 如果我们只传递了size 那么只修改size

```js
function upload(params) {
    let config = {
    type: ".jpeg",
    size: 10000
    }

    // 我们利用对象的展开语法 同名属性会被覆盖
    config = {...config, ...params}

    console.log(config)
        // {type: '.jpeg', size: 20000}
}

upload({size: 20000})

```


> 技巧2:
- 情景: 
- 当用户没有传递必要的参数的时候 报错

```js
function oss(config) {
    if(config.hasOwnProperty("host")) {
        throw new Error("必须设置主机地址")
    }
}

oss({user: "sam"})
```

> 技巧3:
- 修改数组对象的结构

- 要点:
- JSON.stringify(目标, 保留所有属性, 缩进2)

```js
const lessons = [
    {
        title: "媒体查询",
        category: "css"
    },
    {
        title: "Flex",
        category: "css"
    },
    {
        title: "Mysql",
        category: "mysel"
    },
]

// 我们要将上面的数组对象变为对象的形式 数组对象中的每一个对象元素作为value key为category的值就编号

let res = lessons.reduce((obj, item, index) => {
    obj[`${item["category"]} - ${index + 1}`] = item
    console.log(obj)
    return obj
}, {})

// JSON.stringify(目标, 保留所有属性, 缩进2)
console.log(JSON.stringify(res, null, 2))
```


> 对象浅拷贝的多种赋值方式
- 我们先回忆一下对象的深浅拷贝
- 浅拷贝值得是目标对象中只有一层数据
- 深拷贝值得是目标对象中有2层数据格式

> 浅拷贝方式1: 循环赋值
- 该方式适合将数据进行修改
```js
let hd = {name: "sam", url: "www.baidu.com"}

let obj = {}
// 这样取到的是值 存在了一个新对象obj里面 这样属于 深拷贝
for (const key in hd) {
    obj[key] = hd[key]
}
```

> 浅拷贝方式2: 对象的结构赋值
```js
// 方式2 把hd中的值压入到了新对象中
let obj = Object.assign({}, hd)
```

> 浅拷贝方式3: 
```js
// {} 相当于新开辟了一块空间
let obj = {...hd}
```



> 对象的深拷贝
> 情景1 对象中只有对象的情况:
```js
let obj = {
    name: "sam",
    user: {
        name: "erin"
    }
}

// 深拷贝的实现思路就是一层一层的处理
// 递归
function copy(obj) {
    let res = {} 
    for(let key in obj) {
    // 这个操作也很骚啊
    res[key] = typeof obj[key] == "object" ? copy(obj[key]) :obj[key]
    }

    return res
} 
let ret = copy(obj)
console.log(JSON.stringify(ret, null, 2))
console.log(JSON.stringify(obj, null, 2))
```


> 情景2: 对象中还有数组的情况
- 数据情况:
```js
let obj = {
    name: "sam",
    user: {
        name: "erin"
    },
    arr: []
}
```

- 要点:
- 1. 判断是对象还是数组 我们可以使用 instanceof 来进行判断
```js
{} instanceof Object  // true
[] instanceof Array   // true
```

- 2. 我们将对象内部的元素 是数组也好 还是对象也好 都转成对数组的操作方式
- 我们先看看下面的预习部分
```js
// 我们看看原始数据 使用Object.entries()方法后的样式
let obj = {
    name: "sam",
    user: {
        name: "erin"
    },
    arr: []
}

-- 

console.log(JSON.stringify(Object.entries(obj), null, 2))
[
  [
    "name",
    "sam"
  ],
  [
    "user",
    {
      "name": "erin"
    }
  ],
  [
    "arr",
    []
  ]
]
```
- 我们发现 原本的数组对象变成了二维数组 Object.entries() 将一个对象的
- key: value
- ["key", value]

- 比如 原始数据中的 user
- ["user", {name: "erin"}]

- 上面我们实现了不管原始数据中是对象也好 还是数组也好都转成 对数组的处理方式

```js
function copy(obj) {
    // 判断 参数的形式是数组还是对象 在递归调用的时候obj的类型会改变
    let res = obj instanceof Array ? [] : {}

    // 这时候res就是跟原始数据一个类型
    console.log(res)

    // 我们将参数obj转为二维数组 通过数组的方式遍历元素
    for(let [key, value] of Object.entries(obj)) {
        console.log(key) // name user arr
        console.log(value) // sam 对象 数组

        // 当value的值为数组的时候 arr: []
        // 当value的值为对象的时候 我们进行递归操作 对象会被再次的分解成["key", value]的形式 再到这个逻辑的时候 就是普通赋值
        res[key] = typeof value == "object" ? copy(value) : value
    }

    return res
}
let ret = copy(obj)
console.log("ret", ret)
```

> 技巧3: 闭包的特性也可以用来体现函数的封装性
- 比如我们创建了下面的构造函数 但是发现 构造函数的外部是可以通过 user对象修改里面的属性的

- 有的时候我们希望的是我们只向外暴露功能 并不希望它能够修改我们对象中的属性

```js
function User(name, age) {
    this.name = name
    this.age = age

    this.show = function() {
        console.log(this.name)
    }

    this.info = function() {
        return this.age > 50 ? this.name + "老年人" : this.name + "年轻人"
    }
}

let user = new User("Sam", 33)
// 这时候在函数外部是可以
user.name = "erin"
user.show()
```

- 我们可以利用闭包的方式来解决问题
```js
function User(name, age) {

    let data = {name, age}

    let info = function() {
        return age > 50 ? name + "老年人" : name + "年轻人"
    }

    this.show = function() {
        console.log(data.name + info())
    }
}
```


> 对象的访问器
- 使用场景：
- 现在我们有一个对象
```js
const user = {
    name: "sam"
    age: 18
}
```

- 上面这个对象中的年龄我在外面可以随便的改 我们可以在对象的外部 user.age = 进行随意的复制操作

- 那这个数据很容器变的不稳定

- 那怎么做呢
- 方式1:
```js
const user = {
    data: {name: "sam", age: 18},
    setAge(value) {
        if(typeof value != "number" || value < 10 || value > 100) {
            throw new Error("年龄格式不匹配")
        }
    },
    getAge() {

    }
}
```

- 上面方式有一个不好的地方 就是我们在给属性赋值的时候 需要调用的是 user.setAge(999) 方法

- 那我们能不能直接通过 user.age = 999 的方式给对象设置属性呢？

- 这时候我们就可以使用访问器 将属性写成计算属性函数的样式 前面用关键字set来修饰

> set 属性() { ... }
> get 属性() { ... }
- 对象中的属性 通过这种方式设置的时候 当我们通过
- obj.属性 = 赋值的时候 就会触发回调中的逻辑

```js
const user = {
    data: {name: "sam", age: 18},
    set age(value) {
        if(typeof value != "number" || value < 10 || value > 100) {
            throw new Error("年龄格式不匹配")
        }

        this.data.age = value
    },
    get age() {
        return "abc"
        return this.data.age
    }
}
```

- 这时候我们可以还通过 user.age = 999 的方式赋值


> 访问器的应用 -- 计算属性
- 我们希望 我们调用对象中的属性就能获取到总价格

```js
let lesson = {
    lists: [
        {name: "js", price: 100},
        {name: "mysql", price: 212},
        {name: "vue", price: 99},
    ],
    get total() {
        return this.lists.reduce((pre, item) => {
            return pre + item.price
        }, 0)
    }
}

console.log(lesson.total)
```


> 访问器的应用 - 批量设置属性 -- 骚操作
- 下面有这样的一个对象
```js
const web = {
    name: "sam",
    url: "www.baidu.com"
}
```

- 如果我们要设置里面的属性的话 都是
- web.name = ""
- web.url = ""

- 那有没有一种方法 web.site = "erin, www.taobao.com"
- 当我们这么设置的时候 可以一次搞定 name url 的赋值操作呢?

- 可以 我们可以通过访问器
```js
const web = {
    name: "sam",
    url: "www.baidu.com",

    set site(value) {
        // 将解构出来的数据 直接通过this给name和url了
        let [this.name, this.url] = value.split(",")
    }
}
```


> 访问器的应用 -- token的读写处理
- 我们从后台获取的token需要存在本地 我们会使用到本地存储
```js
let Request = {
    set token(content) {
        localStorage.setItem("token", content)
    },
    get token() {
        let token = localStorage.getItem("token", content)

        if(!token) {
            // 跳转到登录页面的操作
        }

        return token
    }
}

// 当我们调用token属性的时候 就会触发保存到本地存储的逻辑
Requset.token = "293423g5jghj342g5jhghj"
```


> 对象代理 proxy
- 访问器只是对单个属性的控制 对象代理是对整个对象进行控制
- 我们不是直接操作数据 而是通过代理来操作数据

- 我们先定义一个数据
```js
const hd = {name: "sam"}
```

> new Proxy(对哪个对象进行代理, 配置对象)
- 代理后 可以通过 代理对象proxy 方法原对象中的属性
- 相当于proxy就是原对象

- 参数2: 
- get(obj, prop) { return obj[prop] }
- obj 为代理的对象
- prop为代理的对象中的属性

- set(obj, prop, value) { obj[prop] = value }
- obj 为代理的对象
- prop为代理的对象中的属性
- value 为我们修改的时候的值

```js
const hd = {name: "sam"}
// 代理指定的对象
const proxy = new Proxy(hd, {
  get(obj, prop) {
    return obj[prop]
  },
  set(obj, prop, value) {
    console.log(value)
    obj[prop] = value

    // 在严格模式中 要返回true 不然会报错
    return true
  }

})
console.log(proxy.name)
```

**注意:**
- 1. 严格模式中 我们需要在set方法中return true 不然会报错
- 2. 配置对象是必须要传递的


> 代理对函数的控制
- 代理后proxy就是原函数 以前我们是通过 fn() 调用函数
- 代理后 proxy() 调用函数

- new Proxy(函数名, 配置对象)
- 参数2:
- 配置对象里需要传递 apply(fn, obj, args)
- fn  就是代理的函数
- obj 就是上下文对象相当于this 我们可以通过 proxy.apply() 的方法传入this指向的对象
- args 就是传递进来的实参 
    - args是数组
    - proxy.apply({}, [参数])
    - 使用apply()方法传递参数的时候 要把参数放在数组中

- 示例:
```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1)
}


// 使用代理来调用对象
let proxy = new Proxy(factorial, {

  // 当调用proxy()的时候 会执行里面的逻辑
  apply(fn, obj, args) {
    console.log(fn)   // 被代理的函数
    console.log(obj)  // 我们传递的是this 那么obj就是window
    console.log(args) // 参数会在数组中
  }
})
// 普通调用
proxy(5)

// 使用apply调用 并传递上下文对象 和 数组传参
proxy.apply(this, [5])
```


> 举例1:
- 计算函数的运行时间
```js
function factorial(num) {
  return num == 1 ? 1 : num * factorial(num - 1)
}

console.log(factorial(5)) 

let proxy = new Proxy(factorial, {
  
  apply(fn, obj, args) {
    
    console.time("run")

    // 将收到的参数传递到原函数中
    fn.apply(this, args);

    console.timeEnd("run")
  }
})

proxy.apply({}, [5])
```


> 代理对数组的控制
- 需求:
- 通过代理对原数组进行加工 如果数组对象中的对象的title的长度大于5进行截断处理

- 也就是对数组的拦截处理

- new Proxy(数组, 配置对象)
- 代理数组后 proxy就是数组 可以通过 proxy[0] 的方式访问原数组中的元素

- 参数2:
- get(arr, index)
- arr就是原数组 index就是proxy[0]对应的索引值

- 好像没有set


```js
let lessons = [
  {
    title: "媒体查询知多少",
    category: "css"
  },
  {
    title: "FLEX",
    category: "css"
  },
  {
    title: "MYSQL",
    category: "mysql"
  },
]

// 当获取元素的时候我们对title的长度进行截断处理
let proxy = new Proxy(lessons, {
  get(arr, key) {
    const title = arr[key].title
    const len = 5
    
    arr[key].title = title.length > len 
      ? title.substr(0, len) + ".".repeat(3) 
      : title

    return arr[key]
  }
})
console.log(proxy[0])
```

> 通过代理实现双向绑定
```html
<input type="text" v-model="title" />
<input type="text" v-model="title" />

<h4 v-bind="title">这里也会发生更新</h4>
```
```js
function View() {
    // 创建代理 {}里面用来存放 公共数据 相当于 data
    let proxy = new Proxy({}, {
        get(obj, prop) {

        },
        set(obj, prop, value) {
            document.querySelectAll(`[v-model="${prop}"]`).forEach(item => {
                item.value = value
            })
        }
    })

    // 绑定事件
    this.init = function() {
        const els = document.querySelectorAll("[v-model]")

        els.forEach(item => {
            item.addEventListener("keyup", function() {
                proxy[this.getAttribute("v-model")] = this.value
            })
        })
    }
}

new View().init()
```


> 代理处理表单验证
```js
// 工具类
class Validate {
  // 检查value是否超过最大长度
  max(value, len) {
    return value.length < len
  }

  // 检查value是否超过最小长度
  min(value, len) {
    return value.length > len
  }

  isNumber(value) {
    return /^\d+$/.test(value)
  }
}

// 创建代理工厂 将对象加工成代理对象
function ProxyFactory(target) {
  return new Proxy(target, {
    get(target, key) {
      return target[key]
    },

    // 键盘抬起的时候就会触发set方法
    set(target, key, value) {
       // value就是this 因为外面 proxy[i] = this 代表每一个表单
       // 获取表单元素上的规则
       const rule = el.getAttribute("rule")

       // 创建验证类
       const validate = new Validate()

       let state = rule.split(",").every(rule => {

          // 第一个参数是验证类中的函数 二个函数的参数
          // info ["max", "12"]
          const info = rule.split(":")

          // value是表单元素 就是this 就是input
          return validate[info[0]](value.value, info[1])
       })
       console.log(state)
    }
  })
}

// 对NodeList进行了代理
let proxy = ProxyFactory(document.querySelectorAll("[validate]"))

// 当表单触发键盘抬起事件的时候触发表单验证处理
proxy.forEach((item,i) => {
  console.log(item)
  item.addEventListener("keyup", function() {
    // 这相当于set的第三个参数就是this
    proxy[i] = this
  })
})
```


> JSON
> JSON.stringify(目标对象, 参数2, 参数3)
- 参数2:
- 数组字符串 ["属性名"]
- 代表要保留的属性 可以传递多个
- 传递null 代表全部保留

```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    }
}

JSON.stringify(hd, ["title"])
// {"title": "sam"}
```

- 参数2:
- 制表符缩进


> 自定义json返回
- 我们需要在目标对象里面设置 *toJSON: function() { return }* 方法
```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    },

    // 设置toJSON方法
    toJSON: function() {
        return {
            title: this.title
        }
    }
}

let json = JSON.stringify(hd)
```


> JSON.parse(目标对象, callback)
- 参数2
- 当我们想对返回得JSON对象的格式进行处理的时候 可以传递一个回调
```js
let hd = {
    title: "sam"
    url: "www.baidu.com",
    teacher: {
        name: "erin"
    }
}


let obj = JSON.parse(hd, (key, value) => {
    if(key == "sam") {
        value = "[加油] - " + value
    }
})
```

----------------


### 执行上下文
```js
// 情况1:
console.log(a)  // a is not defined

// 情况2:
console.log(a)  // undefined
var a

// 情况3:
console.log(a)  // undefined
var a = 10
```

- 上面我们发现:
- 第一句:
    报错 a未定义

- 第二句:
- 第三局:
    输出都是undefined

- 说明浏览器在执行console.log(a)时，已经知道了a是undefined，但却不知道a是10

- 其实, 在一段js代码拿过来真正一句一句运行之前，浏览器已经做了一些“准备工作”

- 其中就包括对变量的声明(而不是赋值)
- 变量赋值是在赋值语句执行的时候进行的

- 比如 我们在 console.log(this) 的时候 都会知道无论在哪个位置获取this，都是有值的

- 上面说的是属性的问题
- 下面我们看看函数的两种情况
```js
// 情况1
console.log(fn1)    // 能输出整个函数
function fn1() {
    console.log("fn1")
}


// 情况2
console.log(fn1)    // undefined
var fn2 = function() {
    console.log("fn2")
}

// 情况2 相当于
var fn2;
console.log(fn2)
fn2 = function() {
    console.log("fn2")
}
```

- 在“准备工作”中，对待函数表达式就像对待“ var a = 10 ”这样的变量一样，只是声明。

- 对待函数声明时，却把函数整个赋值了。

> “准备工作”中完成了哪些工作
- 1. 变量、函数表达式——变量声明，默认赋值为undefined
- 2. this——赋值
- 3. 函数声明——赋值

- 这三种数据的准备情况我们称之为“执行上下文”或者“执行上下文环境”。

- javascript在执行一个代码段之前，都会进行这些“准备工作”来生成执行上下文。

- 这个“代码段”其实分三种情况——全局代码，函数体，eval代码。


- 如果在函数中，除了以上数据之外，还会有其他数据。
```js
function fn(x) {
    console.log(arguments) // [10]
    console.log(x) // 10
}
fn(10)
```

- 以上代码展示了在函数体的语句执行之前，arguments变量和函数的参数都已经被赋值。

- 从这里可以看出，*函数每被调用一次，都会产生一个新的执行上下文环境*。因为不同的调用可能就会有不同的参数。

- 外一点不同在于，*函数在定义的时候（不是调用的时候），就已经确定了函数体内部自由变量的作用域。*
<!-- 至于“自由变量”和“作用域”是后面要专门拿出来讲述的重点，这里就先点到为止。用一个例子说明一下： -->

```js
var a = 10
function fn() {
    console.log(a)
    // a是自由变量 函数创建的时候 就确定了a要取值的作用域
}


function bar(f) {
    var a = 20;
    f() // 打印的是10 而不是20
}
bar(fn)
```


> 结合作用域 上下文环境 我们看看下面的知识点
```js
var a = 10, b = 20              // 全局作用域

function fn(x) {
    var a = 100, c = 300;       // fn的作用域

    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }

    bar(100)
    bar(200)
}

fn(10)
```

- 我们在上文中已经介绍了，除了全局作用域之外，每个函数都会创建自己的作用域
- *作用域在函数定义时就已经确定了。而不是在函数调用时确定。*

- 我们看看结合作用域 上下文环境是怎么样的
- 1. 在加载程序时，已经确定了全局上下文环境，并随着程序的执行而对变量就行赋值。
```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }



    bar(100)
    bar(200)
}

fn(10)
```

- 当我们程序执行到 fn(10) 调用的时候 此时生成fn函数的上下文环境压栈，并将此上下文环境设置为活动状态。
```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域
    }



    bar(100)
    bar(200)
}

fn(10)
```


- 当程序执行到bar(100)的时候 调用bar(100) 生成此次bar函数的上下文环境 压栈，并设置为活动状态

```js
var a = 10, b = 20

            全局上下文环境
            a       10
            d       20


function fn(x) {
    var a = 100, c = 300;       // fn的作用域

            fn(10)上下文环境
            x       10
            a       100
            c       300



    function bar(x) {
        var a = 1000, d = 3000  // bar的作用域

            bar(100)上下文环境
            x       100
            a       1000
            d       3000
    }



    bar(100)
    bar(200)
}

fn(10)
```

- 当执行完bar(100)这行代码 bar(100)调用完成 *则bar(100)上下文环境被销毁* 

- 接着执行bar(200)，调用bar(200)，则又生成bar(200)的上下文环境，压栈，设置为活动状态。

- 当执行完bar(200)这行代码 则bar(200)调用结束 其上下文环境被销毁 此时就会回到fn(10)上下文环境中 变为活动状态
<!-- 
    bar(200)     ->  上下文环境
    bar(100)     ->  上下文环境
    fn(10)       ->  上下文环境

    当bar(200) bar(100)都调用完毕后 其上下文环境销毁
    只剩下fn(10)处于激活状态
 -->

- 当执行完fn(10)这行代码后 fn(10)执行完成之后 fn(10)上下文环境被销毁 全局上下文环境又回到了活动状态

- 连接起来看，还是挺有意思的。作用域只是一个“地盘”，一个抽象的概念，其中没有变量。要通过作用域对应的执行上下文环境来获取变量的值。同一个作用域下，不同的调用会产生不同的执行上下文环境，继而产生不同的变量的值。所以，作用域中变量的值是在执行过程中产生的确定的，而作用域却是在函数创建时就确定了。

- 所以，如果要查找一个作用域下某个变量的值，就需要找到这个作用域对应的执行上下文环境，再在其中寻找变量的值。



### 番外篇

### ArrayBuffer对象
- ArrayBuffer 对象表示一段二进制数据，用来模拟内存里面的数据。
- 可以通过'视图'进行操作(TypedArray, DataView), 视图内部署了数组的接口 这意味着可以用数组的方法操作内存
- 也就是说它不能直接读写 只能通过视图才操作 视图的作用是以指定的格式解读二进制数据

- 它是以数组的语法处理二进制数据 所以统称为二进制数组
<!-- 
    ArrayBuffer对象
    TypedArray视图
    DataView视图

    它们是操作二进制数据的一个接口
 -->

- 上述接口出现原因:
- 为了满足js与显卡之间大量的数据实时交换 它们之间的数据必须是二进制的 而不能是传统的文本格式
- 文本格式传递一个32位整数 两端的js脚本和显卡都要进行格式化的转化 将非常的耗时
- 所以我们需要一个能够直接操作字节 将4个字节的32位整数 以二进制形式原封不动地送入显卡


> TypedArray 和 DataView 视图支持的数据类型:
- 一共9种(DataView视图支持除Uint8C以外的其他 8 种)
<!-- 
    数据类型	字节长度	含义	                对应的 C 语言类型
    Int8	    1	    8 位带符号整数	                signed char
    Uint8	    1	    8 位不带符号整数	            unsigned char
    Uint8C	    1	    8 位不带符号整数（自动过滤溢出）    unsigned char       -- DataView不支持
    Int16	    2	    16 位带符号整数	                short
    Uint16	    2	    16 位不带符号整数	            unsigned short
    Int32	    4	    32 位带符号整数	                int
    Uint32	    4	    32 位不带符号的整数	             unsigned int
    Float32	    4	    32 位浮点数	                   float
    Float64	    8	    64 位浮点数	                   double
 -->


> ArrayBuffer实例化
> let buf = new ArrayBuffer(整数)
- 作用
- 用来分配一段可以存放数据的连续内存区域(表示这段二进制数据占用多少字节)

- 默认值:
- 每一个字节的默认值是0

- 参数
- 整数 

```js
let buf = new ArrayBuffer(8)

// 结果:  buf占用了8个字节
byteLength: 8
[[Prototype]]: ArrayBuffer
[[Int8Array]]: Int8Array(8)
[[Uint8Array]]: Uint8Array(8)
[[Int16Array]]: Int16Array(4)
[[Int32Array]]: Int32Array(2)
[[ArrayBufferByteLength]]: 8
[[ArrayBufferData]]: 2
```

> buf.byteLenth
- 表示当前实例占用的内存长度(字节)


> buf.slice(startIndex, endIndex)
- 用来*复制*一部分内存
- 拷贝生成一个新的ArrayBuffer对象。

- 包括开始不包括结束
- 如果省略第二个参数 则表示一直复制到结束
```js
const buffer = new ArrayBuffer(8);
const newBuffer = buffer.slice(0, 3);
```

> buf.isView()
- ArrayBuffer有一个静态方法isView，返回一个布尔值，表示参数是否为ArrayBuffer的视图实例。这个方法大致相当于判断参数，是否为TypedArray实例或DataView实例。
```js
const buffer = new ArrayBuffer(8);
ArrayBuffer.isView(buffer) // false

const v = new Int32Array(buffer);
ArrayBuffer.isView(v) // true
```

------

> 视图
- 我们创建buf对象后 通过视图构造器将buf转换为我们可以操作的数组 
- 接下来就是以数组的形式操作二进制buf

- ArrayBuffer对象作为内存区域，可以存放多种类型的数据。
- 同一段内存，不同数据有不同的解读方式，这就叫做“视图”（view）。

- ArrayBuffer有两种视图，
- 1. TypedArray视图 - 同类型数据
- 2. DataView视图   - 可以是不同类型数据

- 前者的数组成员都是同一个数据类型，后者的数组成员可以是不同的数据类型。

- 目前，TypedArray视图一共包括 9 种类型，每一种视图都是一种构造函数。

Int8Array：     8 位有符号整数，    长度 1 个字节。
Uint8Array：    8 位无符号整数，    长度 1 个字节。
Uint8ClampedArray：8 位无符号整数， 长度 1 个字节，溢出处理不同。
Int16Array：    16 位有符号整数，   长度 2 个字节。
Uint16Array：   16 位无符号整数，   长度 2 个字节。
Int32Array：    32 位有符号整数，   长度 4 个字节。
Uint32Array：   32 位无符号整数，   长度 4 个字节。
Float32Array：  32 位浮点数，       长度 4 个字节。
Float64Array：  64 位浮点数，       长度 8 个字节。


- 特点:
- 这 9 个构造函数生成的数组，统称为TypedArray视图。
- 它们很像普通数组，都有length属性，都能用方括号运算符（[]）获取单个元素，所有数组的方法，在它们上面都能使用。

- 与普通数组的区别:
- 1. TypedArray 数组的所有成员，都是同一种类型。
- 2. TypedArray 数组的成员是连续的，不会有空位。
- 3. TypedArray 数组成员的默认值为 0。比如，new Array(10)返回一个普通数组，里面没有任何成员，只是 10 个空位；new Uint8Array(10)返回一个 TypedArray 数组，里面 10 个成员都是 0。

- 4. TypedArray *数组只是一层视图，本身不储存数据*，它的数据都储存在底层的ArrayBuffer对象之中，要获取底层对象必须使用buffer属性。


> DataView视图
> new DataView(buf)
- DataView视图用来操作ArrayBuffer对象
- 当创建好ArrayBuffer独享之后 需要为该buf对选哪个指定视图
```js
const buf = new ArrayBuffer(32)
const dataView = new DataView(buf)

// 以不带符号的8位整数格式 从头读取8位二进制数据 得到0
dataView.getUint8(0)    // 0
```


> TypedArray视图
- 该视图与DataView视图的区别 TypedArray不是一个构造函数 而是一组构造函数 代表不同的数据格式
```js
const buf = new ArrayBuffer(32)

const x1 = new Int32Array(buffer);
x1[0] = 1;


const x2 = new Uint8Array(buffer);
x2[0]  = 2;

x1[0] // 2
```
- 上面代码对同一段内存，分别建立两种视图：32 位带符号整数（Int32Array构造函数）和 8 位不带符号整数（Uint8Array构造函数）。由于两个视图对应的是同一段内存，一个视图修改底层内存，会影响到另一个视图。

- TypedArray视图的构造函数，除了接受ArrayBuffer实例作为参数，还可以接受普通数组作为参数，直接分配内存生成底层的ArrayBuffer实例，并同时完成对这段内存的赋值。

```js
const typedArray = new Uint8Array([0,1,2]);
typedArray.length // 3

typedArray[0] = 5;
typedArray // [5, 1, 2]
```

- 上面代码使用TypedArray视图的Uint8Array构造函数，新建一个不带符号的 8 位整数视图。可以看到，Uint8Array直接使用普通数组作为参数，对底层内存的赋值同时完成。


> 二进制数组的应用
- 大量的 Web API 用到了ArrayBuffer对象和它的视图对象。

> 1. AJAX
- 传统上，服务器通过 AJAX 操作只能返回文本数据，即responseType属性默认为text。
- XMLHttpRequest第二版XHR2允许服务器返回二进制数据，这时分成两种情况。
    - 1. 如果明确知道返回的二进制数据类型，可以把返回类型（responseType）设为arraybuffer；
    - 2. 如果不知道，就设为blob。
```js
let xhr = new XMLHttpRequest();
xhr.open('GET', someUrl);
xhr.responseType = 'arraybuffer';

xhr.onload = function () {
  let arrayBuffer = xhr.response;
  // ···
};

xhr.send();
```

- 如果知道传回来的是 32 位整数，可以像下面这样处理。
```js
xhr.onreadystatechange = function () {
  if (req.readyState === 4 ) {
    const arrayResponse = xhr.response;
    const dataView = new DataView(arrayResponse);
    const ints = new Uint32Array(dataView.byteLength / 4);

    xhrDiv.style.backgroundColor = "#00FF00";
    xhrDiv.innerText = "Array is " + ints.length + "uints long";
  }
}
```


> 2. File API
- 如果知道一个文件的二进制数据类型，也可以将这个文件读取为ArrayBuffer对象。
```js
// 获取节点 并获取文件 
const fileInput = document.getElementById('fileInput');
const file = fileInput.files[0];

// 使用reader读成2进制数据
const reader = new FileReader();
reader.readAsArrayBuffer(file);

// 不光能从e.target上获取 也可以直接从this.result reader.result上获取
reader.onload = function () {
  const arrayBuffer = reader.result;
  // ···
};
```

- 下面以处理 bmp 文件为例。假定file变量是一个指向 bmp 文件的文件对象，首先读取文件。
```js
const reader = new FileReader();
reader.addEventListener("load", processimage, false);
reader.readAsArrayBuffer(file);
```

- 然后，定义处理图像的回调函数：
- 1. 先在二进制数据之上建立一个DataView视图，
- 2. 再建立一个bitmap对象，用于存放处理后的数据，最后将图像展示在Canvas元素之中。
```js
function processimage(e) {
  const buffer = e.target.result;
  const datav = new DataView(buffer);
  const bitmap = {};
  // 具体的处理步骤
}
```
- https://www.wangdoc.com/es6/arraybuffer.html
- 太多了 没看完 我觉得自己用不到呢


### Blob对象
- Blob 对象表示一个二进制文件的数据内容，比如一个图片文件的内容就可以通过 Blob 对象读写。
- 它通常用来读写文件，它的名字是 Binary Large Object （二进制大型对象）的缩写。

- Blob对象 与 ArrayBuffer 的区别在于:
- Blob对象 用于操作二进制文件
- ArrayBuffer 用于操作内存。

> Blob对象的实例化
> new Blob(array [, options])
- 参数
- 1. *数组*
- 成员是字符串或二进制对象，表示新生成的Blob实例对象的内容

- 2. 配置对象
- 参数类型是对象 对象属性type 它的值是一个字符串
- 表示数据的 MIME 类型，默认是空字符串。
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});
        // Blob {size: 43, type: 'text/html'}
```

```js
// 对象的话 我们要先序列化 然后装到数组里面作为参数
var obj = { hello: 'world' };
var blob = new Blob([ JSON.stringify(obj) ], {type : 'application/json'});
```

> 实例对象.size
> 实例对象.type
- 分别返回数据的大小和类型。
```js
var htmlFragment = ['<a id="a"><b id="b">hey!</b></a>'];
var myBlob = new Blob(htmlFragment, {type : 'text/html'});

myBlob.size // 32
myBlob.type // "text/html"
```

> 实例对象.slice(start, end, contentType)
- 用来拷贝原来的数据，返回的也是一个Blob实例。

- 参数: 三个参数，都是可选的。
- contentType : 新实例的数据类型（默认为空字符串）。


> 获取文件信息
- 文件选择器<input type="file">用来让用户选取文件。出于安全考虑，浏览器不允许脚本自行设置这个控件的value属性，即文件必须是用户手动选取的，不能是脚本指定的。一旦用户选好了文件，脚本就可以读取这个文件。

- 文件选择器返回一个 FileList 对象，该对象是一个类似数组的成员，每个成员都是一个 File 实例对象。(inp.files)

- File 实例对象是一个特殊的 Blob 实例，增加了name和lastModifiedDate属性。
```js
// HTML 代码如下
// <input type="file" accept="image/*" multiple onchange="fileinfo(this.files)"/>

function fileinfo(files) {
  for (var i = 0; i < files.length; i++) {
    var f = files[i];
    console.log(
      f.name, // 文件名，不含路径
      f.size, // 文件大小，Blob 实例属性
      f.type, // 文件类型，Blob 实例属性
      f.lastModifiedDate // 文件的最后修改时间
    );
  }
}
```


> 下载文件
- AJAX 请求时，如果指定responseType属性为blob，下载下来的就是一个 Blob 对象

<!-- 
    比如 然后我们可以通过URL.createObjectURL 方法将blob对象转成一个url对象 给有src href属性的 

    function download(url) {
        const xhr = new XMLHttpRequest()
        xhr.open("get", url)
        xhr.responseType = "blob"
        xhr.send()
        xhr.onload = function() {
            const fileBlob = xhr.response
            let imgUrl = URL.createObjectURL(fileBlob)

            let a = document.createElement("a")
            a.href = imgUrl
            a.download = "testImg"
            a.innerHTML = "hello"
            document.querySelector("body").appendChild(a)
        }
    }
    let url = "https://img1.baidu.com/it/u=2648389307,756086504&fm=26&fmt=auto"
    download(url)
-->

```js
function getBlob(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.responseType = 'blob';
  xhr.onload = function () {
    callback(xhr.response);
  }
  xhr.send(null);
}

// 上面代码中，xhr.response拿到的就是一个 Blob 对象。
```


> 生成 URL -- URL.createObjectURL()
- 浏览器允许使用URL.createObjectURL()方法，针对 Blob 对象生成一个临时 URL，以便于某些 API 使用。

- 这个 URL 以blob://开头，表明对应一个 Blob 对象，协议头后面是一个识别符，用来唯一对应内存里面的 Blob 对象。

```js
var droptarget = document.getElementById('droptarget');

droptarget.ondrop = function (e) {
  var files = e.dataTransfer.files;
  for (var i = 0; i < files.length; i++) {
    var type = files[i].type;
    if (type.substring(0,6) !== 'image/')
      continue;

    var img = document.createElement('img');

    // 将文件对象转成url 方便其他地方使用
    img.src = URL.createObjectURL(files[i]);

    img.onload = function () {
      this.width = 100;
      document.body.appendChild(this);
      URL.revokeObjectURL(this.src);
    }
  }
}
```

- 上面代码通过为拖放的图片文件生成一个 URL，产生它们的缩略图，从而使得用户可以预览选择的文件。

- 浏览器处理 Blob URL 就跟普通的 URL 一样，如果 Blob 对象不存在，返回404状态码；如果跨域请求，返回403状态码。Blob URL 只对 GET 请求有效，如果请求成功，返回200状态码。由于 Blob URL 就是普通 URL，因此可以下载。


> 读取文件
- 取得 Blob 对象以后，可以通过FileReader对象，读取 Blob 对象的内容，即文件内容。

> FileReader实例化
```js
let reader = new FileReader()
```

- FileReader 对象提供四个方法，处理 Blob 对象。Blob 对象作为参数传入这些方法，然后以指定的格式返回。

> FileReader.readAsText(目标)：
- 返回文本，需要指定文本编码，默认为 UTF-8。

> FileReader.readAsArrayBuffer(目标)：
- 返回 ArrayBuffer 对象。

> FileReader.readAsDataURL(目标)：
- 返回 Data URL。

> FileReader.readAsBinaryString(目标)：
- 返回原始的二进制字符串。


> 例子:
- FileReader.readAsText()方法的例子，用来读取文本文件。

```js
// HTML 代码如下
<input type="file" onchange="readfile(this.files[0])"></input>
<pre id="output"></pre>

function readfile(f) {
  var reader = new FileReader();
  reader.readAsText(f);

  reader.onload = function () {
    var text = reader.result;

    var out = document.getElementById('output');
    out.innerHTML = '';
    out.appendChild(document.createTextNode(text));

  }
  reader.onerror = function(e) {
    console.log('Error', e);
  };
}
```

- 上面代码中，通过指定 FileReader 实例对象的onload监听函数，在实例的result属性上拿到文件内容。


> 例子:
- FileReader.readAsArrayBuffer()方法的例子，用于读取二进制文件。

```js
// HTML 代码如下
<input type="file" onchange="typefile(this.files[0])"></input>


function typefile(file) {
  // 文件开头的四个字节，生成一个 Blob 对象
  var slice = file.slice(0, 4);
  var reader = new FileReader();

  // 读取这四个字节
  reader.readAsArrayBuffer(slice);

  reader.onload = function (e) {
    var buffer = reader.result;

    // 将这四个字节的内容，视作一个32位整数
    var view = new DataView(buffer);
    var magic = view.getUint32(0, false);

    // 根据文件的前四个字节，判断它的类型
    switch(magic) {
      case 0x89504E47: file.verified_type = 'image/png'; break;
      case 0x47494638: file.verified_type = 'image/gif'; break;
      case 0x25504446: file.verified_type = 'application/pdf'; break;
      case 0x504b0304: file.verified_type = 'application/zip'; break;
    }

    console.log(file.name, file.verified_type);
  };
}
```

- 读取的结构要在 onload的回调里面 通过this / reader / e.target 上的result属性身上获取



### URL
- 网页的 URL 只能包含合法的字符。合法字符分成两类。
- URL 元字符：
- 分号（;），逗号（,），斜杠（/），问号（?），冒号（:），at（@），&，等号（=），加号（+），美元符号（$），井号（#）


- 语义字符：
- a-z，A-Z，0-9，连词号（-），下划线（_），点（.），感叹号（!），波浪线（~），星号（*），单引号（'），圆括号（()）

- 除了以上字符，其他字符出现在 URL 之中都必须转义，规则是根据操作系统的默认编码，将每个字节转为百分号（%）加上两个大写的十六进制字母。

- JavaScript 提供四个 URL 的编码/解码方法。

<!-- 
  比如，UTF-8 的操作系统上，http://www.example.com/q=春节这个 URL 之中，汉字“春节”不是 URL 的合法字符，所以被浏览器自动转成

  http://www.example.com/q=%E6%98%A5%E8%8A%82。其中，“春”转成了%E6%98%A5，“节”转成了%E8%8A%82。这是因为“春”和“节”的 UTF-8 编码分别是E6 98 A5和E8 8A 82，将每个字节前面加上百分号，就构成了 URL 编码。
 -->

> 编码
> encodeURI("url字符串")
- 用于转码整个 URL。
- 它的参数是一个字符串，代表整个 URL。它会将元字符和语义字符之外的字符，都进行转义。

- 返回值
- 编码后的字符串

```js
  encodeURI('http://www.example.com/q=春节')
  // "http://www.example.com/q=%E6%98%A5%E8%8A%82"

  let url = "www.baidu.com?name=杉"
  let res = encodeURI(url)
  console.log(res);
```


> encodeURIComponent("春节")
- 该方法适用于转码url上的某一个部分


> 解码
> decodeURI()
- 用于整个 URL 的解码。它是encodeURI()方法的逆运算。它接受一个参数，就是转码后的 URL。

```js
  decodeURI('http://www.example.com/q=%E6%98%A5%E8%8A%82')
  // "http://www.example.com/q=春节"


  let url2 =`www.baidu.com?name=${encodeURIComponent("杉")}`
  console.log(url2);
  // www.baidu.com?name=%E6%9D%89
```

> decodeURIComponent('%E6%98%A5%E8%8A%82')
- 解码一个片段



### url构造函数
- 用来构造、解析和编码 URL。一般情况下，通过window.URL可以拿到这个构造函数。

- 用于解析url相关的信息

> new URL()
- new URL()作为构造函数，可以生成 URL 实例。

- 参数:
- 它接受一个表示 URL 的字符串作为参数。如果参数不是合法的 URL，会报错。

```js
  var url = new URL('http://www.example.com/index.html');
  url.href
  // "http://www.example.com/index.html"
```

- 如果 URL 字符串是一个相对路径，那么需要表示绝对路径的第二个参数，作为计算基准。
```js
var url1 = new URL('index.html', 'http://example.com');
url1.href
// "http://example.com/index.html"
```


> 实例属性
- url.href：返回整个 URL
```js
let str = "http://www.baidu.com:80/?name=杉&age=16"

let url = new URL(str)
console.log(url.href);
// http://www.baidu.com/?name=%E6%9D%89&age=16
```

- url.protocol：返回协议，以冒号:结尾
<!-- 
    http:
 -->

- url.hostname：返回域名
<!-- 
    www.baidu.com
 -->

- url.host：返回域名与端口，包含:号，默认的80和443端口会省略
<!-- 
    www.baidu.com
 -->
- url.port：返回端口

- url.origin：返回协议、域名和端口(没返回端口啊)
<!-- 
    http://www.baidu.com
 -->

> url.pathname：返回路径，以斜杠/开头
<!-- 
    /login
 -->

> url.search：返回查询字符串，以问号?开头
<!-- 
    ?name=%E6%9D%89&age=16
 -->

> url.searchParams：返回一个URLSearchParams实例，该属性是Location对象没有的
- 该对象的相关方法在下面详细的给出
```js
let queryObj = url.searchParams
```

- URL.hash：返回片段识别符，以井号#开头
- URL.password：返回域名前面的密码
- URL.username：返回域名前面的用户名



> 静态方法
> URL.createObjectURL()
- 用来为上传/下载的文件、流媒体文件生成一个 URL 字符串。这个字符串代表了File对象或Blob对象的 URL。

```js
  // HTML 代码如下
  <div id="display"/>
  <input
    type="file"
    id="fileElem"
    multiple
    accept="image/*"
    onchange="handleFiles(this.files)"
   >
```
```js
  var div = document.getElementById('display');
  let inp = document.querySelector("#inp")
  inp.addEventListener("change", handleFile)

  function handleFile(e) {
    let file = e.target.files[0]

    let img = document.createElement("img")

    let imgSrc = window.URL.createObjectURL(file)

    img.src = imgSrc
    document.querySelector("#wrap").appendChild(img)
  }
```

- URL.createObjectURL()方法用来为上传的文件生成一个 URL 字符串，作为<img>元素的图片来源。

**注意:**
- 每次使用URL.createObjectURL()方法，都会在内存里面生成一个 URL 实例。如果不再需要该方法生成的 URL 字符串，为了节省内存，可以使用URL.revokeObjectURL()方法释放这个实例。


> URL.revokeObjectURL()
- 用来释放URL.createObjectURL()方法生成的 URL 实例。它的参数就是URL.createObjectURL()方法返回的 URL 字符串
- 一旦图片加载成功以后，为本地文件生成的 URL 字符串就没用了，于是可以在img.onload回调函数里面，通过URL.revokeObjectURL()方法卸载这个 URL 实例。

```js
  // 当图片加载完成后 我们释放这个url对象
  var div = document.getElementById('display');

  function handleFiles(files) {
    for (var i = 0; i < files.length; i++) {
      var img = document.createElement('img');

      img.src = window.URL.createObjectURL(files[i]);

      div.appendChild(img);
      img.onload = function() {
        window.URL.revokeObjectURL(this.src);
      }
    }
  }
```


> new URLSearchParams(search参数)
- 为了要处理参数部分 我们即可以通过 URL的实例对象
- url.searchParams 属性获取

- 还可以直接new URLSearchParams 实例化解析search参数

- 是浏览器的原生对象，用来构造、解析和处理 URL 的查询字符串（即 URL 问号后面的部分）。

- 它本身也是一个构造函数，可以生成实例。参数可以为查询字符串，起首的问号?有没有都行，也可以是对应查询字符串的数组或对象。

> 方法一：传入字符串
```js
  var params = new URLSearchParams('?foo=1&bar=2');
  // 等同于
  var params = new URLSearchParams(document.location.search);
```

> 方法二：传入数组
```js
  var params = new URLSearchParams([['foo', 1], ['bar', 2]]);
```
  
> 方法三：传入对象
```js
  var params = new URLSearchParams({'foo' : 1 , 'bar' : 2});
```

- URLSearchParams会对查询字符串自动编码。
```js
var params = new URLSearchParams({'foo': '你好'});
params.toString() // "foo=%E4%BD%A0%E5%A5%BD"
```


> 实例对象.toString()
- toString方法返回实例的字符串形式。
- 返回得是去掉? 的字符串形式
- 该方法通过实例对象来调用

```js
var url = new URL('https://example.com?foo=1&bar=2');
var params = new URLSearchParams(url.search);
params.toString() // "foo=1&bar=2'
```
  


> 实例对象.append()
- 用来追加一个查询参数。它接受两个参数，第一个为键名，第二个为键值，没有返回值。
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.append('baz', 3);
  params.toString() // "foo=1&bar=2&baz=3"
```

> 实例对象.delete()
- 用来删除指定的查询参数。它接受键名作为参数
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.delete('bar');
  params.toString() // "foo=1"
```

> 实例对象.has()
- 返回一个布尔值，表示查询字符串是否包含指定的键名。
```js
  var params = new URLSearchParams({'foo': 1 , 'bar': 2});
  params.has('bar') // true
  params.has('baz') // false
```

> 实例对象.set()
- set()方法用来设置查询字符串的键值
```js
  var params = new URLSearchParams('?foo=1');
  params.set('foo', 2);
  params.toString() // "foo=2"
```

> 实例对象.get()
- 用来读取查询字符串里面的指定键。它接受键名作为参数。
```js
  var params = new URLSearchParams('?foo=1');
  params.get('foo') // "1"
```

> 实例对象.getAll(指定属性名)
- 会将获取的内容放到一个数组中返回


> URLSearchParams.sort()
- 对查询字符串里面的键进行排序，规则是按照 Unicode 码点从小到大排列。



### File 对象
- File 对象代表一个文件，用来读写文件信息。它继承了 Blob 对象，或者说是一种特殊的 Blob 对象，所有可以使用 Blob 对象的场合都可以使用它。

- 最常见的使用场合是表单的文件上传控件（<input type="file">），用户选中文件以后，浏览器就会生成一个数组，里面是每一个用户选中的文件，它们都是 File 实例对象。

- https://www.wangdoc.com/javascript/bom/file.html


> FileReader
- FileReader 对象用于读取 File 对象或 Blob 对象所包含的文件内容
- 浏览器原生提供一个FileReader构造函数，用来生成 FileReader 实例。
```js
var reader = new FileReader();
```

> reader.error
- 读取文件时产生的错误对象


> reader.readyState
- 整数，表示读取文件时的当前状态。一共有三种可能的状态
- 0表示尚未加载任何数据
- 1表示数据正在加载
- 2表示加载完成。
<!-- 
    终止读取操作，readyState属性将变成2。
 -->


> reader.result
- 读取完成后的文件内容，有可能是字符串，也可能是一个 ArrayBuffer 实例。


> 事件:
> reader.onabort
- abort事件（用户终止读取操作）的监听函数。


> reader.onerror
- error事件（读取错误）的监听函数。


> reader.onload
- load事件（读取操作完成）的监听函数，通常在这个函数里面使用result属性，拿到文件内容。


> reader.onloadstart
- loadstart事件（读取操作开始）的监听函数。


> reader.onloadend
- loadend事件（读取操作结束）的监听函数。


> reader.onprogress
- progress事件（读取操作进行中）的监听函数。


> 读取方式:
> reader.readAsText(目标)：
- 读取完成后，result属性将返回文件内容的文本字符串。该方法的第一个参数是代表文件的 Blob 实例，第二个参数是可选的，表示文本编码，默认为 UTF-8。


> reader.readAsArrayBuffer(目标)：
- 以 ArrayBuffer 的格式读取文件，读取完成后result属性将返回一个 ArrayBuffer 实例。


> reader.readAsDataURL(目标)：
- result属性将返回一个 Data URL 格式（Base64 编码）的字符串，代表文件内容。对于图片文件，这个字符串可以用于<img>元素的src属性。注意，这个字符串不能直接进行 Base64 解码，必须把前缀data:*/*;base64,从字符串里删除以后，再进行解码。


> reader.readAsBinaryString(目标)：
- result属性将返回原始的二进制字符串。



### js获取输入光标的位置
- https://cloud.tencent.com/developer/article/1753347?from=15425

> <p contenteditable="true">
- 我们给一个标签添加上 contenteditable 属性则该标签的内部元素则变为可编辑状态


> 如何获取光标的位置
> window.getSelection();
- selection对象是用户再页面上选择的范围的对象
```js
let selection = window.getSelection();
```

> selection.getRangeAt(0)
- selection对象里面包含0个或多个range对象 通过range对象的属性和方法就可以获取到鼠标光标所在的位置 和 鼠标光标处插入dom节点
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0);
```

> range.endContainer 光标所在的节点
> range.endOffset 光标所在节点的偏移量
- 使用range对象的endContainer属性获取光标所在的dom对象
- 使用range对象的endOffset获取光标所在dom对象的偏移量



> 创建要插入的dom节点
```js
let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"
```

> 在光标处插入dom元素
> range.insertNode(node)
```js
let selection = window.getSelection();
let range = selection.getRangeAt(0)

let endDom = range.endContainer
let offset = range.endOffset

let node = document.createElement("span")
node.setAttribute("class", "at")
node.innerHTML = "测试"

range.insertNode(node)
```


### onsubmit事件
- 我们一般会阻止表单的自动提交
- 阻止表单提交事件的步骤
- 1. 给表单绑定submit事件
- 2. 在事件内部调用 e.preventDefault();
- 3. 按钮使用 <input type="submit">
<!-- 
  button类型必须指定为 submit 要不不会触发表单的提交
 -->

```js
let submit = document.querySelector("#sub")
form.onsubmit = function(e) {
  e.preventDefault();
}
```


### 自定义实现 监听事件 和 触发事件 逻辑
<!-- 
- 1. 定义 事件对象 内包含 
    - 事件名: 对应事件处理函数
    - 绑定事件的方法
    - 触发事件的方法

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

- 上面我们就完成了 "自定义事件的逻辑"
- 通过去订阅我们自己设定的事件 监听触发完成回调
 -->

### 视频全屏相关
- 全屏api可以控制浏览器的全屏显示 让一个element节点以及它的子节点占满用户的整个屏幕

- 现在各大浏览器都支持这个api 但是使用的时候需要加上浏览器前缀

> 全屏的方法 requestFullscreen()
- 这个方法可以使整个节点全屏状态 但是该方法必须用户手动触发才能生效
<!-- 
    btn.onclick = function() {
      el.requestFullscreen()
    }

    // 要加上浏览器前缀 判断有这个方法你再进行调用
    if(el.requestFullscreen) {
        el.requestFullscreen()
    }

    el.requestFullscreen
    el.mozRequestFullScreen
    el.msRequestFullscreen
    el.webkitRequestFullscreen
 -->

- 放大一个节点时， firefox和chrome在行为上略有不同
- firebox自动为该节点增加一条css规则 将该元素放大至全屏状态 width 100% height 100%

- 而chrome则是将该节点 放在屏幕的中央 保持原来的大小 其它的部分变黑 
- 为了让chrome的行为与firebox保持一致 可以自定义一条css规则
<!-- 
    :-webkit-full-screen #myvideo {
        width: 100%;
        height: 100%;
    }
 -->


> document.exitFullscreen()
- 用于取消全屏 该方法也带有浏览器前缀
<!-- 
    document.exitFullscreen()
    document.msExitFullscreen()
    document.mozCancelFullScreen()
    document.webkitExitFullscreen()
 -->

> 如何判断节点是否为全屏
> 方式1: document.fullscreenElement
- 该属性返回正处于全屏状态的el节点 如果当前没有节点处于全屏状态 则返回null
<!-- 
    document.fullscreenElement
    document.mozFullScreenElement
    document.webkitFullscreenElement
 -->

> 方式2: document.fullScreen
<!-- 
    const isFullScreen = 
        document.fullScreen ||
        document.mozFullScreen ||
        document.webkitIsFullScreen ||
        document.msFullscreenElement

    这个变量会返回 true / false
 -->


> document.fullscreenEnabled
- 该属性返回一个布尔值 表示当前文档是否可以切换到全屏状态
- 判断当前浏览器是否可以全屏可以用它


> 全屏事件
> fullscreenchange事件
- 浏览器进入或离开全屏的时候触发


> fullscreenerror事件
- 浏览器无法进入全屏时触发 可能是技术或者是用户拒绝

<!-- 
    document.addEventListener("fullscreenchange", () => {
        if(document.fullscreenElement) {
            console.log("进入全屏")
        } else {
            console.log("退出全屏")
        }
    })
 -->

- 上面的代码发生fullscreenchange时 通过fullscreenElement属性判断到底是进入全屏还是退出全屏


> 全屏状态的css
- 全屏状态下 大多数的浏览器css支持 
    :full-screen伪类 

- 只有ie11支持 :fullscreen伪类 使用这个伪类 可以对全屏状态设置单独的css属性
<!-- 
    :-webkit-full-screen
    :-moz-full-screen
    :-ms-fullscreen
    :full-screen
    :fullscreen
    
    :-webkit-full-screen video {
        width: 100%;
        height: 100%;
    }
 -->



### 滚动到底部
- 当一个盒子内部的内容增加的时候 并且超过该盒子的高度的时候 我们希望它自动滚动到底部

    element.scrollTo({
        top: 100,
        left: 100,
        behavior: 'smooth'
    });

    element.scrollTo(0, 1000);

- 两种使用方式


### WebSocket
- WebSocket 是一种网络通信协议，很多高级功能都需要它。
- 叩丁狼 笔记： http://codesohigh.com/subject/websocket/websocket.html
<!-- 
    初次接触 WebSocket 的人，都会问同样的问题：我们已经有了 HTTP 协议，为什么还需要另一个协议？它能带来什么好处？

    因为 HTTP 协议有一个缺陷：通信只能由客户端发起。
    举例来说，我们想了解今天的天气，只能是客户端向服务器发出请求，服务器返回查询结果。

    HTTP 协议做不到服务器主动向客户端推送信息。

    HTTP 协议的这种单向请求的特点，注定了如果服务器有连续的状态变化，客户端要获知就非常麻烦。

    如果我们还需要用ajax的方式去访问服务器 那么
    我们只能使用“轮询”：每隔一段时候，就发出一个询问，了解服务器有没有新的信息。最典型的场景就是聊天室。

    轮询的效率低，非常浪费资源（因为必须不停连接，或者 HTTP 连接始终打开）。因此，工程师们一直在思考，有没有更好的方法。WebSocket 就是这样发明的。
 -->

> Ajax轮询
- ajax轮询一般分为两种。
- 1. 设定一个定时器，无论有无结果返回，时间一到就会继续发起请求，这种轮询耗费资源，也不一定能得到想要的数据，这样的轮询是不推荐的。

- 2. 在第一次请求的时候，如果返回数据了那么就在成功的回调里面再次发起这个请求，就像递归一样，调用本方法。如果时间太久，失败了，同样的再次调用这个请求，也就是本函数。当然，长轮询也需要后台配合，没有数据改变的时候就不用返回，或者约定好逻辑。

- 3. 客户端按规定时间定时向服务端发送ajax请求，服务器接到请求后马上返回响应信息并关闭连接。
- Ajax轮询需要服务器有很快的处理速度与快速响应。

- 客户端是按照规定时间（这个时间由你设定，此处默认为1秒）像服务端发送请求，前一次请求完成后，无论有无结果返回，一秒之后下一次请求又会发出。这就叫做Ajax轮询。

- https://www.cnblogs.com/-wenli/p/10982264.html


> websocket的特点
- 服务器可以主动向客户端推送信息，客户端也可以主动向服务器发送信息，是真正的双向平等对话，

- 1. 属于服务器推送技术的一种
<!-- 
    HTTP 协议有点像发电子邮件，发出后必须等待对方回信；
    WebSocket 则是像打电话，
    
    服务器端和客户端可以同时向对方发送数据，它们之间存着一条持续打开的数据通道。
 -->

- 2. 与 HTTP 协议有着良好的兼容性。默认端口也是80和443，并且握手阶段采用 HTTP 协议，因此握手时不容易屏蔽，能通过各种 HTTP 代理服务器。

- 3. 数据格式比较轻量，性能开销小，通信高效。
- 4. 可以发送文本，也可以发送二进制数据。
- 5. 没有同源限制，客户端可以与任意服务器通信，完全可以取代 Ajax。

- 6. 协议标识符是ws（如果加密，则为wss，对应 HTTPS 协议），服务器网址就是 URL。
<!-- 
    ws://example.com:80/some/path
 -->


> WebSocket 握手请求头 和 响应头 解析
- 浏览器发出的 WebSocket 握手请求类似于下面的样子：
```js 
    GET / HTTP/1.1

    // Connection字段表示浏览器通知服务器，如果可以的话，就升级到 WebSocket 协议
    Connection: Upgrade

    // Upgrade字段表示将通信协议从HTTP/1.1转向该字段指定的协议
    Upgrade: websocket
    Host: example.com
    Origin: null

    // Sec-WebSocket-Key则是用于握手协议的密钥，是 Base64 编码的16字节随机字符串。
    Sec-WebSocket-Key: sN9cRrP/n9NdMgdcy2VJFQ==
    Sec-WebSocket-Version: 13
```

- 服务器的 WebSocket 回应如下。
```js
    HTTP/1.1 101 Switching Protocols

    // Connection字段通知浏览器，需要改变协议。
    Connection: Upgrade
    Upgrade: websocket

    // Sec-WebSocket-Accept字段是服务器在浏览器提供的
    Sec-WebSocket-Accept: fFBooB7FAkLlXgRSz0BT3v4hq5s=
    Sec-WebSocket-Origin: null

    // Sec-WebSocket-Location字段表示进行通信的 WebSocket 网址。
    Sec-WebSocket-Location: ws://example.com/
```

- Sec-WebSocket-Accept字段是服务器在浏览器提供的Sec-WebSocket-Key字符串后面，添加 RFC6456 标准规定的
“258EAFA5-E914-47DA-95CA-C5AB0DC85B11”字符串，然后再取 SHA-1 的哈希值。浏览器将对这个值进行验证，以证明确实是目标服务器回应了 WebSocket 请求。Sec-WebSocket-Location字段表示进行通信的 WebSocket 网址。

- 完成握手以后，WebSocket 协议就在 TCP 协议之上，开始传送数据。


> 客户端 API 
- 浏览器对 WebSocket 协议的处理，无非就是三件事。
- 1. 建立连接和断开连接
- 2. 发送数据和接收数据
- 3. 处理错误


> 当创建ws实例对象后 客户端就会与服务器进行连接
> let ws = new WebSocket("服务器地址")
**注意:**
- 服务器地址的协议必须由 http - ws 该为ws
<!-- 
    let serverURL = "ws://localhost:8800/"  // ws
    let ws = new WebSocket(serverURL)
 -->


> 实例对象身上的属性
> ws.readyState
- 返回实例对象的当前状态，共有四种
- 1. CONNECTING：   值为0，表示正在连接。
- 2. OPEN：         值为1，表示连接成功，可以通信了。
- 3. CLOSING：      值为2，表示连接正在关闭。
- 4. CLOSED：       值为3，表示连接已经关闭，或者打开连接失败。
<!-- 
    console.log(ws.readyState)   // 0
 -->


> ws.onopen
- 用于指定连接成功后的回调函数
<!-- 
    如果要指定多个回调函数，可以使用addEventListener方法。
    ws.onopen = function(e) {
        if(e) console.log("open", e)
        let data = {msg: "我是数据呀"}
        ws.send(data)
    }
 -->


> ws.onclose
- 用于指定连接关闭后的回调函数。
<!-- 
    ws.onclose = function(e) {
        if(e) console.log("close", e)
    }
 -->


> ws.onmessage
- 用于指定 收到服务器数据 后的回调函数。
<!-- 
    注意，服务器数据可能是文本，也可能是二进制数据（blob对象或Arraybuffer对象）。
    ws.onmessage = function(event){
        if(typeOf event.data === String) {
            console.log("Received data string");
        }

        if(event.data instanceof ArrayBuffer){
            var buffer = event.data;
            console.log("Received arraybuffer");
        }
    }

    ws.onmessage = function(e) {
        if(e) console.log("message", e)
        console.log("onmessage, 这里能收到来自服务器的数据")
    }
 -->


> ws.onerror
- 用于指定报错时的回调函数。


> ws.send()
- 实例对象的send()方法用于向服务器发送数据。
<!-- 
    // 发送文本的例子。
    ws.send('your message');


    // 发送 Blob 对象的例子。
    var file = document
    .querySelector('input[type="file"]')
    .files[0];

    ws.send(file);


    // 发送 ArrayBuffer 对象的例子。
    var img = canvas_context.getImageData(0, 0, 400, 320);
    var binary = new Uint8Array(img.data.length);
    for (var i = 0; i < img.data.length; i++) {
        binary[i] = img.data[i];
    }
    ws.send(binary.buffer);
 -->


> 实例对象的属性
> ws.binaryType
- 显式指定收到的二进制数据类型。
<!-- 
    // 收到的是 blob 数据
    ws.binaryType = "blob";
    ws.onmessage = function(e) {
        console.log(e.data.size);
    };

    // 收到的是 ArrayBuffer 数据
    ws.binaryType = "arraybuffer";
    ws.onmessage = function(e) {
        console.log(e.data.byteLength);
    };
 -->


> ws.bufferedAmount
- 表示还有多少字节的二进制数据没有发送出去。它可以用来判断发送是否结束。
<!-- 
    var data = new ArrayBuffer(10000000);
    socket.send(data);

    if (socket.bufferedAmount === 0) {
        // 发送完毕
    } else {
        // 发送还没结束
    }
 -->


> 服务端的方法
- ws.send() 
    用于向客户端发送数据

- ws.on("message", () => { }) 
    用于接收客户端发送过来的数据

> 服务器端
- Web端我们主要借助 express 与 express-ws
- 这个项目里我们创建一个两个人实时对话的效果

- 1. npm init -y 项目初始化
- 2. npm express express-ws
- 3. 根目录下创建静态资源文件夹 创建index.html 创建角色A 和 角色B
<!-- 
    | - public
        - index.html
            这个页面主要的效果就是 点击头像跳转到 
            sam.html 或者 erin.tml

        - sam.html
        - erin.html

        - 两张图片.jpg
 -->

- 4. 写web端逻辑 自己看吧 随便一个网页都可以 逻辑都是一样的

- 5. 写服务端代码
<!-- 
    const express = require("express")

    // 引入 ws
    const expressWs = require("express-ws")

    const app = express()

    // 使用expressWs方法 将app传入 这样我们就能往页面中注入websocket功能
    expressWs(app)
 -->

- 6. 在根目录下创建 websocket.js 
<!-- 
    // 这个文件中也要用到路由 所以要导入express
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    // 给router注入websocket 注入后 router就会多了ws方法
    expressWs(router)

    // sam访问的路径为 ws://localhost:8800/ws/sam
    // app.use("/ws", websocket) 因为server.js文件里面 这么处理的 所以 这个js文件中的所有路径前都会拼接上/ws

    // 当sam访问这个路径的时候 我们就给它返回一个数据
    router.ws("/sam", (ws) => {
        ws.send("sam链接成功")
    })

    module.exports = router
 -->

- 7. 前端的ws逻辑
<!-- 
    // ws的方法
    // 一个页面对应一个服务端的路由规则 比如前端sam 要进入 后台sam 这才算链接在一起
    // 我们指定的url就是 后台 router定义的对应的路由规则 router.ws("/sam", (ws) => {})
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
      // 得到链接状态 值为1链接成功
      console.log(ws.readyState)
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {
      console.log(res)
      console.log(res.data)
    }
 -->


- 8. 上面做了下布局 和 ws的链接
- 现在我们思考一个问题 比如我在sam页面 发送了一条消息 怎么才能到erin页面呢？

- 当我们再输入框输入文本后 我们判断非空 上面的逻辑是 直接拿到 输入的值 然后拼装好结构 插入到了sam的页面中

- 其实这个部分的逻辑不对 我们应该是从 onmessage 中拿到内容 也就是从服务端拿到内容 在拼接 再放入到页面中
<!-- 
    我们应该是 按下回车 走服务端 从服务端返回数据 然后再做拼接 插入页面的逻辑

    这样数据经过服务端 服务端就可以存储起来 这样erin就可以接收到sam的消息

    // 服务端代码 服务端使用on方法接收客户端发送的数据 然后在给客户端
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        ws.send(msg)
    })
 -->

> 这个阶段的 客户端代码
<!-- 
    let txt = $("#txt")[0]
    let contentWrap = $(".contents")[0]
    let tips = $(".tips")[0]

    // ws的方法
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
      // 得到链接状态 值为1链接成功
      // console.log(ws.readyState)
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {

      let tNode = rightMsg(res.data, true)
      contentWrap.innerHTML += tNode

      contentWrap.scrollTo({
        top: contentWrap.scrollHeight,
        behavior: "smooth"
      })

      txt.value = ""
    }



    // 既然是回车的发起人 那么必然我们要添加到右侧
    txt.onkeyup = function(e) {
      if(e.keyCode == 13) {
        if(this.value.trim() == "") {
          tips.style.display = "block"
          this.timer = setTimeout(function(){
            tips.style.display = "none"
          }, 2500)
          this.value = ""
          return
        }

        let value = this.value

        // 将获取到的数据发送给服务端
        ws.send(value)
        
        // 下面添加到页面的逻辑 我们要在 onmessage 事件里面完成 因为它理由有服务端返回的数据
      }
    }

    function rightMsg(value, type) {
      if(type) {
        let rightHtml = `
          <div class="dialog right">
            <div>${value}</div>
            <img src="./sam.png" alt="">
          </div>
        `
        return rightHtml
      } else if(type == false) {
        let leftHtml = `
          <div class="dialog left">
            <img src="./erin.png" alt="">
            <div>${value}</div>
          </div>
        `
        return leftHtml
      }
    }

    function $(el) {
      return document.querySelectorAll(el)
    }
 -->


> 这个阶段的服务端代码
<!-- 
    // 这个文件中也要用到路由 所以要导入express
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    expressWs(router)

    router.ws("/sam", (ws) => {


    // 接收客户端发送过来的数据
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        ws.send(msg)
    })
    })

    // 注意每一个路由中必须有一个有效的send方法 send中有一个return 写在send后面的语句都不会执行

    module.exports = router
 -->


- 我们还要思考下 sam发送的数据 给了服务端 由服务端再返回 我们渲染到了页面上 但是sam的信息 erin那边也要收到吧

- erin那边怎么才能收到呢？

- 服务端的代码 发送数据 和 接收数据的逻辑最好是分离开 这样思路比较清晰
<!-- 
    // 存放sam的数据
    let samStr = []


    router.ws("/sam", (ws) => {
        ws.on("message", (msg) => {
            samStr.push(msg)    // 存储sam发送的数据
            ws.send(msg)
        })
    })


    // erin接收数据的接口
    router.ws("/erin", (ws) => {
    // 这里我们要将sam的数据 给前端erin的界面 我们不能使用for循环发依次send samStr数组 因为一个路由规则中只能有一个send方法

    // 这里我们采用定时器 每一秒发送一条数据 也就是用定时器的方式查看数组中是否有数组项 只要数组中是有数据的就返回给客户端第0项 顺便把第0项清掉

    setInterval(function() {
        if(samStr.length > 0) {
            // 因为send 里面有return 所以要做下面的逻辑
            let msg = samStr[0]
            samStr.shift()
            ws.send(msg)
            }    
        }, 1000)
    })


    这里的要点就是 使用定时器 每1秒就查看一下samStr数组中有没有数据 如果有数据 那么就将它返回给客户端 然后再将数组里面的数据删掉

    这样数组中始终都是一条数据 返回给客户端就删掉
 -->

- 几乎就是可以了 然后没事自己做一遍
- 要点：
- 我们前端一套ws方法 对应 后台一套ws接口
- 前端 new WebSocket 时填入的 接口url 这样前端这一套方法 才能与 后台路由接口中的方法配套 互相接发数据


> 完整代码总结
<!-- 
    // 客户端 sam
    let txt = $("#txt")[0]
    let contentWrap = $(".contents")[0]
    let tips = $(".tips")[0]

    // ws的方法
    let ws = new WebSocket("ws://localhost:8800/ws/sam")

    // 链接打开时的回调
    ws.onopen = function() {
    }

    ws.onclose = function() {
      console.log("链接已断开")
    }

    ws.onerror = function(err) {
      console.log("链接发生错误", err)
    }

    // 该方法用于接收服务端传递过来的数据
    ws.onmessage = function(res) {

      let tNode = rightMsg(res.data, true)
      contentWrap.innerHTML += tNode

      contentWrap.scrollTo({
        top: contentWrap.scrollHeight,
        behavior: "smooth"
      })

      txt.value = ""
    }

    txt.onkeyup = function(e) {
      if(e.keyCode == 13) {
        if(this.value.trim() == "") {
          tips.style.display = "block"
          this.timer = setTimeout(function(){
            tips.style.display = "none"
          }, 2500)
          this.value = ""
          return
        }

        let value = this.value
        ws.send(value)
        
        // 下面添加到页面的逻辑 我们要在 onmessage 事件里面完成 因为它理由有服务端返回的数据
      }
    }

    // 创建一个生成 对话框区域 的代码 传入true代表添加右侧结构 false左侧
    function rightMsg(value, type) {
      if(type) {
        let rightHtml = `
          <div class="dialog right">
            <div>${value}</div>
            <img src="./sam.png" alt="">
          </div>
        `
        return rightHtml
      } else if(type == false) {
        let leftHtml = `
          <div class="dialog left">
            <img src="./erin.png" alt="">
            <div>${value}</div>
          </div>
        `
        return leftHtml
      }
    }

    function $(el) {
      return document.querySelectorAll(el)
    }


    后台 websocket 逻辑
    const express = require("express")
    const expressWs = require("express-ws")

    const router = express.Router()

    // 给router注入websocket 注入后 router就会多了ws方法
    expressWs(router)


    // 存放sam的数据
    let samStr = []

    // sam访问的路径为 ws://localhost:8800/ws/sam
    // app.use("/ws", websocket) 因为server.js文件里面 这么处理的 所以 这个js文件中的所有路径前都会拼接上/ws
    // 当sam访问这个路径的时候 我们就给它返回一个数据
    router.ws("/sam", (ws) => {

    // send() ws的方法 用来想客户端发射数据的
    // ws.send("后台往客户端发送的数据")

    // 接收客户端发送过来的数据
    ws.on("message", (msg) => {
        // 重新把拿到的数据返回给客户端
        samStr.push(msg)    // 存储sam发送的数据
        ws.send(msg)
    })
    })

    // 注意每一个路由中必须有一个有效的send方法 send中有一个return 写在send后面的语句都不会执行



    // erin接收数据的接口
    router.ws("/erin", (ws) => {
    let timer = null

    // 当监听到链接断开的时候要清空定时器
    ws.on("close", () => {
        if(timer) {
        clearInterval(timer)
        }
    })

    // 这里我们要将sam的数据 给前端erin的界面 我们不能使用for循环发依次send samStr数组 因为一个路由规则中只能有一个send方法
    // 这里我们采用定时器 每一秒发送一条数据 也就是用定时器的方式查看数组中是否有数组项 只要数组中是有数据的就返回给客户端第0项 顺便把第0项清掉
    timer = setInterval(function() {
        if(samStr.length > 0) {
        // 因为send 里面有return 所以要做下面的逻辑
        let msg = samStr[0]
        samStr.shift()
        ws.send(msg)
        }    
    }, 1000)
    })

    module.exports = router


    const express = require("express")
    // 引入 ws
    const expressWs = require("express-ws")
    const websocket = require("./websocket.js")

    const app = express()
    // 使用expressWs方法 将app传入 这样我们就能往页面中注入websocket功能
    expressWs(app)


    // 利用中间件来充当路由 参数1的位置是路由 返回对应的静态资源文件夹中的html文件
    app.use("/sam", express.static("public/sam.html"))
    app.use("/erin", express.static("public/erin.html"))

    // 当我们访问的是 /ws 的路由的时候 我们就要调用 websocket
    // 我们要求访问的格式是 ws://localhost:3000/ws  不想要/ws的话 下面app.use那里去掉
    // websocket是我们导入的js文件 下面这样写的话 这个js文件中的所有路径前都会拼接上/ws
    app.use("/ws", websocket)

    app.use(express.static("public"))

    // 如果我们键入服务器网址后 没有任何对应页面的话 解决报错
    app.get("/*", (req, res) => {})


    app.listen(8800, () => {
    console.log("服务器已开启 监听8800")
    })
 -->


### bitbug
- 制作favicon图标
- https://www.bitbug.net/
- 正方形图片 图片尺寸不要过大


### postMessage
- postMessage是html5引入的API,
- postMessage()方法允许来自不同源的脚本采用异步方式进行有效的通信,

- 可以实现跨文本文档,
- 多窗口,
- 跨域消息传递
- 多用于窗口间数据通信,

- 这也使它成为跨域通信的一种有效的解决方案.

> 发送数据
> otherWindow.postMessage(message, targetOrigin, [transfer]);
- 解析：
- otherWindow
- 向该窗口发送数据
- otherWindow是窗口的一个引用,
<!-- 
    - 比如iframe的contentWindow属性,
    - 执行window.open返回的窗口对象,
    - 或者是命名过的或数值索引的window.frames.
 -->

- message
- 数据

- targetOrigin
- 通过窗口的origin属性来指定哪些窗口能接收到消息事件
- 指定后只有对应origin下的窗口才可以接收到消息,设置为通配符"*"表示可以发送到任何窗口,
<!-- 
    如果想要发送到与当前窗口同源的窗口,可设置为"/"
 -->

- transfer
- 是一串和message同时传递的**Transferable**对象,这些对象的所有权将被转移给消息的接收方,而发送一方将不再保有所有权.


> 接收数据
- 接收方 给 window 绑定 "message" 事件 事件的回调中的 event 身上有我们想要得数据
<!-- 
    window.addEventListener("message", fn, false) ;

    function fn(event) {
        var origin= event.origin;
        console.log(event);
    }
 -->

> event.data
- 指的是从其他窗口发送过来的消息对象

> event.type
- 指的是发送消息的类型;

> event.source
- 指的是发送消息的窗口对象;

> origin
- 指的是发送消息的窗口的源


> 应用场景
- 我们都知道JSONP可以实现解决GET请求的跨域问题,但是不能解决POST请求的跨域问题.而postMessage都可以

- 要点：
- 1. document.getElementById("otherPage").contentWindow
- 获取iframe的窗口对象

- 1. 父窗体创建跨域iframe并发送信息
<!-- 
    <script type="text/JavaScript">    
        function sendPost() { 
                      
            // 获取id为otherPage的iframe窗口对象       
            var iframeWin = document.getElementById("otherPage").contentWindow;       

            // 向该窗口发送消息       
            iframeWin.postMessage(document.getElementById("message").value, 'http://moweide.gitcafe.io');}   

            // 监听跨域请求的返回   
            window.addEventListener("message", function(event) {       
                console.log(event, event.data);
            }, false);
    </script>
 -->


### formData对象
- 用户点击“提交”按钮，每一个控件都会生成一个键值对，键名是控件的name属性，键值是控件的value属性，

- 所有的键值对都会提交到服务器。但是，提交的数据格式跟<form>元素的method属性有关。该属性指定了提交数据的 HTTP 方法。如果是 GET 方法，所有键值对会以 URL 的查询字符串形式，提交到服务器，比如/handling-page?user_name=张三

- 如果是 POST 方法，所有键值对会连接成一行，作为 HTTP 请求的数据体发送到服务器，比如user_name=张三&user_passwd=123&submit_button=提交。下面就是 POST 请求的头信息。

- 注意:
- 实际提交的时候，只要键值不是 URL 的合法字符（比如汉字“张三”和“提交”），浏览器会自动对其进行编码。


> new FormData(form)
- 原生当中根据form自动收集表单数据到 formData 对象中
<!-- 
    let formData = new FormData(document.querySelector("form"))
 -->

- 参数：
    - DOM表单元素
    - 构造函数会自动处理表单的键值对

    - 空
    - 那就创建一个空的表单对象 需要我们自己往里面添加值


> 实例方法
> formData.get(key)
- 获取指定键名对应的键值，参数为键名。如果有多个同名的键值对，则返回第一个键值对的键值。

> formData.getAll(key)
- 返回一个数组，表示指定键名对应的所有键值。
- 如果有多个同名的键值对，数组会包含所有的键值。

> formData.set(key, value)
- 设置指定键名的键值, 没有就添加 已有就更新
- 如果第二个参数是文件，还可以使用第三个参数，表示文件名。

> formData.delete(key)
- 删除一个键值对，参数为键名。

> formData.append(key, value)
- 添加一个键值对。如果键名重复，则会生成两个相同键名的键值对。
- 如果第二个参数是文件，还可以使用第三个参数，表示文件名。
<!-- 
    formData.append('userpic[]', myFileInput.files[0], 'user1.jpg');
 -->

> formData.has(key)
- 返回一个布尔值，表示是否具有该键名的键值对。

> formData.keys()
- 返回一个遍历器对象
- 用于for...of循环遍历所有的键名。

> formData.values()
- 返回一个遍历器对象
- 用于for...of循环遍历所有的键值。

> formData.entries()
- 返回一个遍历器对象
- 用于for...of循环遍历所有的键值对。
<!-- 
    如果直接用for...of循环遍历 FormData 实例，默认就会调用这个方法。
 -->

> 属性
> enctype
- 表单能够用四种编码，向服务器发送数据。编码格式由表单的enctype属性决定。

> GET
- 如果表单使用GET方法发送数据，enctype属性无效。
- 因为:
- ?foo=bar&baz=The%20first%20line.%0AThe%20second%20line.
<!-- 
    <form
        action="register.php"
        method="get"
        onsubmit="AJAXSubmit(this); return false;"
    >
    </form>
 -->


> POST
- application/x-www-form-urlencoded
- 如果表单用POST方法发送数据，并省略enctype属性，那么数据以application/x-www-form-urlencoded格式发送（因为这是默认值）。

<!-- 
    Content-Type: application/x-www-form-urlencoded
    foo=bar&baz=The+first+line.%0D%0AThe+second+line.%0D%0A
 -->

- text/plain
- 如果表单使用POST方法发送数据，enctype属性为text/plain，那么数据将以纯文本格式发送。
<!-- 
    Content-Type: text/plain

    foo=bar
    baz=The first line.
    The second line.
 -->

- multipart/form-data
- 如果表单使用POST方法，enctype属性为multipart/form-data，那么数据将以混合的格式发送。
<!-- 
    Content-Type: multipart/form-data; boundary=---------------------------314911788813839

    -----------------------------314911788813839
    Content-Disposition: form-data; name="foo"

    bar
    -----------------------------314911788813839
    Content-Disposition: form-data; name="baz"

    The first line.
    The second line.

    -----------------------------314911788813839--
 -->


> 文件上传
- 用户上传文件，也是通过表单。具体来说，就是通过文件输入框选择本地文件，提交表单的时候，浏览器就会把这个文件发送到服务器。
<!-- 
    <input type="file" id="file" name="myFile">
 -->

- 要点:
- 1. 将 form 的 method 设置为 post
- 2. enctype 设置为 multipart/form-data
<!-- 
    enctype属性决定了 HTTP 头信息的Content-Type字段的值，
    默认情况下这个字段的值是application/x-www-form-urlencoded，
    但是文件上传的时候要改成multipart/form-data。
 -->

- 3. 新建一个 FormData 实例对象 把选中的文件添加到这个对象上面。
<!-- 
    var formData = new FormData();

    for (var i = 0; i < files.length; i++) {
    var file = files[i];

    // 只上传图片文件
    if (!file.type.match('image.*')) {
        continue;
    }

    formData.append('photos[]', file, file.name);
    }
 -->

- 4. 最后，使用 Ajax 向服务器上传文件。
<!-- 
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'handler.php', true);

    xhr.onload = function () {
    if (xhr.status !== 200) {
        console.log('An error occurred!');
    }
    };

    xhr.send(formData)


    除了发送 FormData 实例，也可以直接 AJAX 发送文件。
    var file = document.getElementById('test-input').files[0];
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'myserver/uploads');
    xhr.setRequestHeader('Content-Type', file.type);
    xhr.send(file);
 -->


-----------------

### image对象
- Image 对象代表嵌入的图像
- <img> 标签每出现一次，一个 Image 对象就会被创建。

- 创建一个Image对象：var a=new Image();    定义Image对象的src: a.src=”xxx.gif”;    这样做就相当于给浏览器缓存了一张图片。

**注意:**
- 需要注意的是：src 属性一定要写到 onload 的后面，否则程序在 IE 中会出错。


> 属性
- complete: 返回一个布尔值
- 可以通过Image对象的complete 属性来检测图像是否加载完成
<!-- 
    每个Image对象都有一个complete属性，当图像处于装载过程中时，
    该属性值false,

    当发生了onload、onerror、onabort中任何一个事件后，则表示图像装载过程结束（不管成没成功），此时complete属性为true）
 -->

> 事件
- onabort
- 当用户放弃图像的装载时调用

- onload
- 当图像装载完毕时调用

- onerror
- 在装载图像的过程中发生错误时调用

<!-- 
    var img = new Image();    
    img.src = oImg[0].src = this.src.replace(/small/,"big");    
    oDiv.style.display = "block";    
    img.complete ? oDiv.style.display = "none" : (oImg[0].onload = function() {oDiv.style.display = "none"})  
 -->

----------------

### IntersectionObserver API
- 该API在兼容性上有很大的问题 所以w3c提供了一个 npm包 专门用来解决兼容性的问题
- 也就是我们 要我们要先使用这个包 然后才能接着用 IntersectionObserver API

- 安装:
- npm install intersection-observer

- 引入:
- import "intersection-observer"
- 确保它在最前面
- 在html页面里面的话 相当于如下:
```html
<script src="./js/intersection-observer.js" />
```


- 自动"观察"元素是否进入视口  
- 网页开发时，常常需要了解某个元素是否进入了“视口”（viewport），即用户能不能看到它。

- 传统的实现方法是，监听到scroll事件后，调用目标元素（绿色方块）的getBoundingClientRect()方法，得到它对应于视口左上角的坐标，再判断是否在视口之内。这种方法的缺点是，由于scroll事件密集发生，计算量很大，容易造成性能问题。

- IntersectionObserver API 的用法，简单来说就是两行。
```js 
    var observer = new IntersectionObserver(callback, options);
    observer.observe(target);
```


> new IntersectionObserver(callback, [option])
- IntersectionObserver是浏览器原生提供的构造函数
- 根据元素的可见性的变化, 就会调用观察器的回调函数, 回调函数会触发两次, 一次是目标刚刚进入视口, 另一次是完全离开视口

- 要点:
- 1. 通过它创建的构造函数 需要创建变量来接收实例
- 2. 调用实例对象.observe() 方法 指定要观察的DOM节点
```js  
    let observer = new IntersectionObserver(callback, options);
    
    // 开始观察
    observer.observe(document.getElementById('example'));

    // 停止观察
    observer.unobserve(element);

    // 关闭观察器
    observer.disconnect();
```


> 实例对象身上的方法
> observer.observe(document.getElementById('example'))
- 开始观察
- observe()的参数是一个 DOM 节点对象。如果要观察多个节点，就要多次调用这个方法。
```js 
    observer.observe(elementA);
    observer.observe(elementB);
```

> observer.unobserve(element);
- 停止观察
- 取消对某个目标元素的观察，延迟加载通常都是一次性的，observe 的回调里应该直接调用 unobserve() 那个元素
```js  
    let observer = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
            if(entry.isIntersecting){
                 entry.target.classList.add('active');

                 // 延迟加载通常都是一次性的
                 observer.unobserve(entry.target);
            }
        })
    })
```

> observer.disconnect();
- 关闭观察器

**注意:**
- IntersectionObserver API 是异步的，不随着目标元素的滚动同步触发。规格写明，IntersectionObserver的实现，应该采用requestIdleCallback()，即只有线程空闲下来，才会执行观察器。这意味着，这个观察器的优先级非常低，只在其他任务执行完，浏览器有了空闲才会执行。



> new IntersectionObserver(callback, [option])
- 该方法接受两个参数：回调函数callback和配置对象options。
- 当 目标元素的可见性变化时，就会调用观察器的回调函数callback。
<!-- 
    callback会触发两次。一次是目标元素刚刚进入视口（开始可见），另一次是完全离开视口（开始不可见）
 -->

> callback中的参数
- 参数1. entries:  
        是一个数组, 里面的元素为被观察的对象
<!-- 
    如果同时有两个被观察的对象的可见性发生变化，entries数组就会有两个成员。
 -->

 >      > entry对象
        - 该对象是 需要通过 遍历 entries 数组 然后在回调中指定entry 才能使用
        <!-- 
            let observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    console.log(entry)
                })
            }, {})
         -->

        每一个对象身上还有 entry对象 用于提供目标元素的信息(在回调中使用可以得到被观察元素的信息) 
        一共有6个属性
```js 
    {
        time: 3893.92,
        rootBounds: ClientRect {
            bottom: 920,
            height: 1024,
            left: 0,
            right: 1024,
            top: 0,
            width: 920
        },
        boundingClientRect: ClientRect {
            // ...
        },
        intersectionRect: ClientRect {
            // ...
        },
        intersectionRatio: 0.54,
        target: element
    }
```

> 属性解析:

    entry.target:   
        被观察的目标元素，是一个 DOM 节点对象

    entry.rootBounds:
        容器元素的矩形区域的信息
        getBoundingClientRect()方法的返回值，
        如果没有根元素（即直接相对于视口滚动），则返回null

    entry.boundingClientRect:
        目标元素的矩形区域的信息

    entry.intersectionRect:
        目标元素与视口（或容器元素）的交叉区域的信息

    entry.isIntersecting:
        如果是true， 则表示元素从视区外进入视区内。

    entry.intersectionRatio: 0 到 1 的数值
        目标元素的可见比例
        即intersectionRect占boundingClientRect的比例， 完全可见时为1， 完全不可见时小于等于0

    entry.time:     
        可见性发生变化的时间，是一个高精度时间戳，单位为毫秒



- 参数2. 创建的实例对象 observer
```js  
    var observer = new IntersectionObserver(
        (entries, observer) => {
            console.log(entries);
        }
    );
```

**要点:**
- 1. 在合适的位置上操作元素的话 需要用到 entry.target 属性 它是一个DOM节点

- 2. 这个回调内部逻辑一上来就会执行一次，然后目标元素再次进入视口和离开视口的时候都会再触发一次

- 所以 内部使用 entry.isIntersecting 来进行判断下比较好 当元素进入视口后 执行什么逻辑
```js  
    let observer = new IntersectionObserver((entries, observer) => {
        console.log("我进来了")
        entries.forEach((entry) => {
            if(entry.isIntersecting) {
                entry.target.style.background = "pink"
            } else {
                entry.target.style.background = ""
            }
        })
    }, {threshold: [0.25]})

    observer.observe($(".box")[0])
```


- 因为它会触发两次回调函数 为了解决这个问题 我们可以 当元素进入的时候就添加样式 随后下一行就移除监视
```js
eventBind() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          entry.target.classList.add("is-show")

          // 为了解决两次回调的问题 刚添加样式后就移除样式
          observer.unobserve(entry.target)
        }
      })
    }, {
      rootMargin: "0px 0px",
      threshold: 0,
      root: null,
    })

    Array.prototype.forEach.call(this.title, (element) => {
      observer.observe(element)
    })
  }
```


> option参数 intersection(function(){}, {option})
> option配置对象中的属性

> threshold: 
- 决定了什么时候触发回调函数, 即元素进入视口（或者容器元素）多少比例时，执行回调函数。
- 它是一个数组, 默认值为0 (目标元素与视口交叉面积大于多少时, 触发回调)

- 要点: 元素的比例
- 目标元素在容器中显示了多少? 在指定值的时候分别触发
<!-- 
    它是一个数组，每个成员都是一个门槛值，默认为[0]，即交叉比例（intersectionRatio）达到0时触发回调函数。
 -->
<!-- 
    {
        threshold: [0, 0.25, 0.5, 0.75, 1]
    }

    默认值为0, 当为1时, 元素完全显示后触发回调函数

    如果threshold属性是0.5， 当元素进入视口50%时，触发回调函数。
    如果值为[0.3, 0.6]， 则当元素进入30％和60％是触发回调函数。

    用户可以自定义这个数组。
    比如，上例的[0, 0.25, 0.5, 0.75, 1]就表示当目标元素 0%、25%、50%、75%、100% 
    可见时，会触发回调函数。
 -->


> root: 
- IntersectionObserver不仅可以观察元素相对于视口的可见性，还可以观察元素相对于其所在容器的可见性。容器内滚动也会影响目标元素的可见性

- root属性指定目标元素所在的容器节点。
<!-- 
    它有很多后代元素，想要做的就是判断它的某个后代元素是否滚动进了自己的可视区域范围。这个 root 参数就是用来指定根元素的，默认值是 null。

    如果它的值是 null，根元素就不是个真正意义上的元素了，而是这个浏览器窗口了，可以理解成 window，但 window 也不是元素（甚至不是节点）。这时当前窗口里的所有元素，都可以理解成是 null 根元素的后代元素，都是可以被观察的。
 -->

<!-- 
    var opts = {
        root: document.querySelector('.container'),
        rootMargin: '0px 0px -200px 0px'
    };

    var observer = new IntersectionObserver(
        callback,
        opts
    );

    表示容器的下边缘向上收缩200像素，导致页面向下滚动时，目标元素的顶部进入可视区域200像素以后，才会触发回调函数。

    这样设置以后，不管是窗口滚动或者容器内滚动，只要目标元素可见性变化，都会触发观察器
 -->

> rootMagin: 
- root如果代表视口 那么进去视口则进入的观察范围, rootMagin用来扩展, 或缩小观察范围, 正值为扩大, 负值为缩小

- 它的写法类似于 CSS 的margin属性，比如0px 0px 0px 0px，依次表示 top、right、bottom 和 left 四个方向的值。

- 减小根元素下方的观察范围, rootMagin:'0 0 -10% 0' 能变相的提高显示基线
<!-- 
    这个 API 的主要用途之一就是用来实现延迟加载，那么真正的延迟加载会等 img 标签或者其它类型的目标区块进入视口才执行加载动作吗？显然，那就太迟了。我们通常都会提前几百像素预先加载，rootMargin 就是用来干这个的。
 -->

> 基本用法解析
```js  
    let observer = new IntersectionObserver(function(entries){

        entries.forEach(function(entry){
            if(entry.isIntersecting){
                entry.target.classList.add('active');
            }
        })
    }, {
        threshold:[1]
    });


    document.querySelectorAll('.box').forEach(function(value){
        observer.observe(value);
    })
```
    1, 首先创建实例对象, observer
    2, 在回调函数中传递目标元素数组形参 entries
    3, 在回调内部 遍历数组 并传入 entry形参
    4, 判断 目标元素是否进入可视区域 如果进入 则添加什么效果
    5, option传入对象 threshold 1



> 图片的懒加载
- 我们希望某些静态资源（比如图片），只有用户向下滚动，它们进入视口时才加载，这样可以节省带宽，提高网页性能。这就叫做“惰性加载”。

- 1. 图像的 HTML 代码可以写成下面这样。
<!-- 
    <img src="placeholder.png" data-src="img-1.jpg">
    <img src="placeholder.png" data-src="img-2.jpg">
    <img src="placeholder.png" data-src="img-3.jpg">

    图像默认显示一个占位符， data-src属性是惰性加载的真正图像。
 -->

 - 2. 只有图像开始可见时，才会加载真正的图像文件。
```js  
    function query(selector) {
        return Array.from(document.querySelectorAll(selector));
    }

    var observer = new IntersectionObserver(
        function(entries) {
            entries.forEach(function(entry) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            });
        }
    );

    query('.lazy-loaded').forEach(function (item) {
        observer.observe(item);
    });
```


> 下拉加载更多
- 随着网页滚动到底部，不断加载新的内容到页面，它的实现也很简单。
```js  
    var intersectionObserver = new IntersectionObserver(
        function (entries) {
            // 如果不可见，就返回
            if (entries[0].intersectionRatio <= 0) return;
            loadItems(10);
            console.log('Loaded new items');
        }
    );

    // 开始观察
    intersectionObserver.observe(
        document.querySelector('.scrollerFooter')
    );
```
- 无限滚动时，最好像上例那样，页面底部有一个页尾栏（又称sentinels，上例是.scrollerFooter）。一旦页尾栏可见，就表示用户到达了页面底部，从而加载新的条目放在页尾栏前面。否则就需要每一次页面加入新内容时，都调用observe()方法，对新增内容的底部建立观察。


> 视频自动播放
- 下面是一个视频元素，希望它完全进入视口的时候自动播放，离开视口的时候自动暂停。
<!-- 
    <video src="foo.mp4" controls=""></video>
 -->

```js 
let video = document.querySelector('video');
let isPaused = false;

let observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.intersectionRatio != 1  && !video.paused) {
      video.pause();
      isPaused = true;
    } else if (isPaused) {
      video.play();
      isPaused=false;
    }
  });
}, {threshold: 1});

observer.observe(video);
```
上面代码中，IntersectionObserver()的第二个参数是配置对象，它的threshold属性等于1，即目标元素完全可见时触发回调函数。




### 零散小方法

> 判断是否是数组还是对象
> Object.prototype.toString.call(目标对象)
<!-- 
    let objRes = Object.prototype.toString.call(obj)
    console.log(objRes)     // "[object Object]"

    let arrRes = Object.prototype.toString.call(arr)
    console.log(arrRes)     // "[object Array]"
 -->

> 全屏 和 退出全屏
> documentElement.requestFullscreen()
> document.exitFullscreen();
- 全屏和退出全屏的方法不在一个元素上哦

<!-- 
    fullScreen() {
        this.isFullscreen = true
        if(this.isFullscreen) {
            // 打开全屏
            let documentElement = document.documentElement
            if(documentElement.requestFullscreen) {
                documentElement.requestFullscreen()
            } else if (documentElement.mozRequestFullScreen) {
                documentElement.mozRequestFullScreen()
            } else if(documentElement.webkitRequestFullScreen) {
                documentElement.webkitRequestFullScreen()
            }
        }
    }

    exitFullScreen() {
        this.isFullscreen = false
        if(document.exitFullscreen) {
            document.exitFullscreen()
        }
    }
 -->

> delete 对象
- 删除对象中的属性
<!-- 
    delete req.session['id']
 -->

- 删除数组中的指定元素
<!-- 
    let arr = [1, 2, 3]
    delete arr[1]
    console.log(arr)        [1, empty, 3]
 -->


> 数字对象.toFixed(2)
- 保留几位小数
- 会四舍五入

- 该方法会将结果转为字符串型 但是不会影响原数据
<!-- 
    let num = 1.123
    let res = num.toFixed(2)
    console.log(typeof num.toFixed(2))      // string
 -->


> 元素对象.setCapture()
- 针对鼠标按下事件
- 设置btn01对鼠标按下的相关的事件进行捕获 不管点击谁都显示元素对象身上的事件
<!-- 
    该方法是针对鼠标按下事件的一种解决方案
    不管点击谁 都会触发元素对象身上的事件(点击事件)
 -->
- 只有ie支持，但是在火狐中调用时不会报错, 而如果在chrome调用 会报错

- 使用的时候要先进行判断
<!-- 
    if(box1.setCapture){
        box1.setCapture();
    }

    box1.setCapture && box1.setCapture();
 -->
<!-- 
    我们去拖拽一个网页中的内容时，浏览器会默认去搜索引擎中去搜索内容, 此时会导致拖拽功能异常，这个是浏览器提供的默认行为 
    
    如果不希望发生这个行为，则可以通过return false 来取消默认行为
    最简单的方式在onmousedown的最后来个return false;, 
    
    但是ie8 不起作用 这时候我们就需要使用, 元素对象.setCapture()
 -->


> 元素对象.releaseCapture();
- 取消对事件的捕获

- 当调用一个元素的setCapture()方法以后，这个元素将会把下一次所有的鼠标按下相关的事件捕获到自身上 触发自己身上的事件

<!-- 
    比如:即使按下按钮2 也会提示alert1 
    换个说法 我给btn01设置完setCapture以后 btn01就像一个强盗一样 它把所有鼠标点击的事件都抢过来, 虽然页面上我点的02

    但btn01设置了setCapture就说 点02就相当于点我 所以弹出了1

    因为btn02的事件被btn01捕获了, 更横的是 不光点按钮，鼠标进行的点击相关所有事件都被btn01抢过来显示1了 
-->

- 因为setCapture是针对鼠标点击 按下等事件 解决ie浏览器的默认行为的现象
- 那我们可以在鼠标抬起的时候解绑setCapture
```js 
    document.onmouseup = function(){
        document.onmousemove = null;

        // 当鼠标抬起的时候 两种方式都可以
        document.releaseCapture?
        canvas
        document.releaseCapture && document.releaseCapture();
    };
```

> confirm()
- 用于弹出一个带有确认和取消按钮的提示框，需要一个字符串作为参数
- 该字符串作为提示文字显示出来
    确定返回true
    取消返回false
<!-- 
    let result = confirm('确定要点击么');
    console.log(result);
 -->


> prompt()可以弹出一个输入框
- 该提示框中会有一个文本框，用户可以在文本框中输入一段内容
- 该函数需要一个字符串作为参数，该字符串将会作为提示框的提示文字

- 这个函数的返回值，是String类型的
<!-- 
    用户输入的内容将会作为函数的返回值返回，可以定义一个变量来接受该内容
    var score = prompt("提示内容"); 
-->


> isNaN()
- 这个方法用来 判断非数字, 并且返回一个值, 
- 如果是数字        false, 
- 如果不是数字      true

- 原理：
- 它是判断一个值能否被 Number() 合法地转化成数字。
- 如果能转化那就算做是数字, 所以isNaN()的结果会是 false
> 1. 数字形式的字符串。
    例如 "123"、"-3.14"， 虽然是字符串型，
    但被 isNaN() 判为数字， 返回 false。（"12,345,678"，"1.2.3" 这些返回 true）

> 2. 空值。
    null、 空字符串""、 空数组[]， 都可被Number()合法的转为0，
    于是被isNaN认为是数，返回false。
            
    但是 （undefined、空对象{}、空函数等无法转数字，返回true） ！！！

> 3. 布尔值。
    Number(true)=1, 
    Number(false)=0， 所以isNaN对布尔值也返回false。

> 4. 长度为 1 的数组。
    结果取决于其中元素，即：isNaN([a])=isNaN(a)，可递归。
    例如isNaN([["1.5"]])=false。

> 5. 数字特殊形式
    例如"0xabc"、"2.5e+7"，这样的十六进制和科学计数法，即使是字符串也能转数字，所以也返回false。


> Math.sqrt()
- 可以通过Math.sqrt()对一个数进行开方
<!-- 
    var result = Math.sqrt(4);
    console.log(result);        //值为2 
-->


> console.time("") 和 console.timeEnd("")
- 开发代码的过程中，我们要考虑提升性能，也就是提升处理速度
- console.time / timeEnd 用来测试花费的毫秒数，可以用来测试性能
- 它需要一个字符串作为参数，这个字符串将会作为计时器的标识 或者理解为计时器的name
<!-- 
    console.time("test");开始
    +
    程序
    +
    console.timeEnd("test");停止
 -->
    

> for...in -- 枚举(遍历)对象中的属性
- 语句：

    for(let 变量 in 对象) {
        
    }
<!-- 
    for(let key in obj) {
        console.log(key)
    }
 -->

- for...in语句 对象中有几个属性，循环体就会执行几次, 每次执行时，会将对象中的一个属性的名字赋值给变量
<!-- 
    var obj = {
        name:"sunwukong",
        age:18,
        gender:"男",
        address:"花果山"
    }

    for(var n in obj){
        console.log(obj[n]);       
        []的特点就是可以传变量，假如直接写obj.n的话，就是在obj中找叫n的属性 
    }
 -->

- key         -- >     属性名
- obj[key]    -- >     属性值



> in 运算符：
- 通过该运算符可以检查一个对象中是否含有指定的属性，
- 如果有返回true，没有返回false
- 语法：

    "属性名" in 对象
<!-- 
    检查obj中是否含有test2这个属性：
    console.log("test2" in obj);
-->
    

> instanceof 运算符
- 使用instanceof可以检查一个对象是否是一个类的实例
<!-- 
    class Demo {
        name = "sam"
    }
    let d = new Demo()
    console.log(d instanceof Demo)      // true
 -->


- 比如我们可以利用instanceof来判断一个对象是不是数组
<!-- 
    console.log(arr instansof Array) 

    function checkType(target) {
        return target instanceof Array
    }
    let arr = []
    let obj = {}
    let res = checkType(obj)
    console.log(res)            // false
-->

> 对象 instanceof 构造函数
- 检查这个对象是不是这个构造函数的实例, 是为true，否为false 

**注意：**
- 所有的对象都是object的后代，所以任何对象和object做instanceof检查时都会返回true 
<!-- 
    console.log(per instanceof Person);
-->


> Array.isArray(arr)
- 是返回true 不是false 这个方法会优先于instanceof
- H5新增 ie9以上才支持

-------------------------

### JS
- 一种运行在客户端的脚本语言(script是脚本意思)
- 脚本语言不需要编译, 运行过程中有js解释器来逐行来进行解释并执行

> JS能做的事情
- 表单的动态校验(密码强度检测)
- 网页特效
- 服务器开发(Node.js)
- 桌面程序(Electron)
- APP(Cordova)
- 控件硬件-物联网(Ruff)
- 游戏开发(cocosd.js)

-------------------------

### 浏览器执行JS简介
- 浏览器分为两个部分, 渲染引擎 和 JS引擎

> 渲染引擎:
- 用来解析HTML CSS 俗称内核, 比如chrome浏览器的blink 老版本的webkit


> JS引擎: 
- 也成为JS解释器, 用来读取网页中的js代码, 对其处理后运行, 比如chrome浏览器的v8
<!-- 
    浏览器本身并不会执行js代码, 而是通过内置js引擎(解析器)来执行js代码,
    js引擎执行代码时逐行解释每一句源码转换为机器语言, 然后由计算机去执行
    所以js语言归为脚本语言, 会逐行解释执行
 -->

-------------------------

### 解释型语言 编译型语言
- 计算机是不能直接理解任何除机器语言以外的语言, 所以必须要把程序员所写的程序语言翻译成机器语言才能执行程序, 程序语言翻译成机器语言的工具, 被称为翻译器

- 编程语言 -> 翻译器 -> 机器语言(二进制)
- 翻译器翻译的方式有两种: 一种是编译(java), 另外一种是解释(js), 两种方式之间的区别在于翻译的时间点不同

- 编译器在代码执行之前进行编译, 生成中间代码文件
- 解释器是在运行时进行及时解释, 并立即执行(当编译器以解释方式运行的时候, 也称之为解释器)
<!-- 
    编译语言: 先把所有的菜做好, 才能上桌吃饭
    解释语言: 好比吃火锅, 边吃边涮, 同时进行
 -->

-------------------------

### 标识符 关键字 保留字

> 标识符(不能是关键字 或 保留字)
- 就是指开发人员为变量 属性 函数 参数取的名字

> 关键字
- 是指js本身已经使用了的字 不能再用他们充当变量名 方法名
<!-- 
    break case catch continue default delete do else等
 -->

> 保留字
- 预留的关键字, 意思是现在虽然还不是关键字, 但是未来可能会成为关键字, 同样不能使用他们当变量名 或 方法名
<!-- 
    boolean byte char class const debugger double enum export
    fimal float goto等 
 -->

-------------------------

### 表达式 和 返回值
> 表达式: 是由数字 运算符 变量等组成的式子
- 是由数字, 运算符 变量等以能求得数值的有意义排列方法所得的组合

> 返回值:
- 表达式最终都会有一个结果, 返回给我们, 我们称为返回值
<!-- 
    等式的右边表达式计算完毕把返回值给左边
 -->

-------------------------

### JS的组成
- ES5
- DOM
- BOM

-------------------------

### 变量
- 变量就是一个装东西的盒子
- 变量是用于存放数据的容器, 我们通过变量名来获取数据, 修改数据

- 变量可以保存字面量，而且变量的值是可以任意改变的
- 变量更加方便使用，所以在开发中我们都是通过变量去保存一个字面量

> 变量本质
- 变量是程序在内存中申请的一块用来存放数据的空间, 每次创建变量都会创建一个空间
<!-- 
    比如去酒店住, 空间就相当于房间, 房间号相当于变量名
 -->

> 变量的使用
- 声明变量 和 赋值

> 声明变量 & 赋值：
- 在js中使用 var关键字 来声明一个变量 variable
- 使用关键字声明变量后, 计算机会自动为变量分配一个内存空间

    var a;              // 声明一个变量，但是没有值。
    a = 123;            // 给a赋值。

> 变量的初始化
- 声明一个变量的同时赋值 叫做变量的初始化

    var b = 789;        // 或者在声明变量的同时赋值  

<!-- 
    很多情况下，对于单纯的数字来讲没办法知道它所表达的含义是什么，所以可以通过变量给字面量进行描述。
 -->

> 变量的修改(更新)
- 一个变量被重新赋值后, 它原有的值就会被覆盖, 以最后一次的为准
- 在原有的空间里修改, 不会新创建变量(房间)

> 声明多个变量

    let age = 18, 
        address = '火影村',
        gz = 2000;

> 声明变量的特殊情况
- 只声明没有赋值, 结果是:   undefined
- 不声明不赋值, 结果是:     报错
- 不声明直接赋值, 结果是:   会成为全局变量可以使用, 不推荐

> 变量的命名规范
- 在js中所有的可以由我们自主命名的都可以成为标识符
- 1.标识符可以含有字母，数字，_ $
- 2.标识符不能以数字开头
- 3.标识符不能是JS中的关键字或者是保留字
- 4.标识符一般都采用驼峰命名法
- 5.严格区分大小写

-------------------------

### 数据类型：
- 在计算机中, 不同的数据所需占用的存储空间是不同的, 为了把数据分成所需内存大小不同的数据, 充分利用储存空间, 于是定义了不同的数据类型
<!-- 
    一个瘦的人睡单人床, 一个胖的人睡双人床, 占用的空间大小是不一样的
 -->

> 变量的数据类型
- 变量是用来存储值的所在处, 它们有名字和数据类型, 变量的数据类型决定了如何将代表这些值的位存储到计算机的内存中

- js是一种弱类型或者说动态语言, 这意味着不用提前声明变量的类型, 在程序运行过程中, 类型会自动确定
<!-- 
    js的变量数据类型是只有程序在运行过程中, 根据等号右边的值来确定的
    let num = 10;

    当 = 后是10的时候才知道 num的数据类型是什么
 -->

- 指的就是字面量的类型，在js种一共有7种数据类型
    String      字符串   
    Number      数值
    Boolean     布尔值
    Null        空值
    Undefined   未定义

    Object      对象

- 前5个是属于基本数据类型，Object属于引用数据类型。
<!-- 
    // 对以往的数据类型总结  USONB  you are so niubility
    - u = undefined
    - s = string symbol
    - o = object
    - n = null number
    - b = boolean 
 -->

> 数字型 Number
- 在js中所有的数值都是Number类型，包括整数和浮点数（小数）

- 数字型进制:
- 二进制, 八进制, 十六进制


\\ 八进制: 我们程序里面数字前面加0, 表示8进制, 0 ~ 7
    let num = 010;
    console.log(num);    // 010 八进制转换为10进制 就是 8
<!-- 
    7 再加1 需要进位 个位变为0 十位为1 所以是10 八进制前面要加0 最后为010 
-->

\\ 十六进制: 数字的前面加0x为16进制, 0 ~ 9 a ~ f
    let num = 0x9;
    console.log(num);    // 9

> 数字型的范围
- js中数值的最大 和 最小值
- Number.MAX_VALUE      1.7976931348623157e+308
- Number.MIN_VALUE      5e-324
<!-- 
    Number.MAX_VALUE 数字的最大值是 而Number.MAX_VALUE是保存这个值的常量
    Number.MIN_VALUE 大于0的最小值
 -->

> 数字型的三个特殊值
- Infinity      代表无穷大
- -Infinity     代表无穷小
- NaN           Not a number 不是一个数字
<!-- 
    如果使用Number表示的数字超过了最大值
    （Number.MAX_VALUE * Number.MAX_VALUE，最大值x最大值）

    则会返回一个
    Infinity，  表示正无穷        //Infinity就是一个字面量
    -Infinity， 表示负无穷
 -->

> NaN
- 是一个特殊的数字，表示Not A Number 表示非数字，NaN也是字面量也属性数值类型

<!-- 
    在js中正数的运算基本可以保证精确，但如果使用js进行浮点数运算，可能会得到一个不精确的结果。 

    千万不要用js进行精确度比较高的运算，比如    钱

    eg：
    var c = 0.1 + 0.2;
    console.log(c);

    结果是：0.30000000000000004
-->
    
-------------------------

> BigInt
- BigInt数据类型的目的是比 Number数据类型支持的范围更大的整数值。
- 在对大整数执行数学运算时，以任意精度表示整数的能力尤为重要。使用 BigInt，整数溢出将不再是问题。
<!-- 
    对于学过其他语言的程序员来说，JS中缺少显式整数类型常常令人困惑。许多编程语言支持多种数字类型，如浮点型、双精度型、整数型和双精度型，但JS却不是这样。在JS中，按照IEEE 754-2008标准的定义，所有数字都以双精度64位浮点格式表示。

    在此标准下，无法精确表示的非常大的整数将自动四舍五入。确切地说，JS 中的 Number类型只能安全地表示 -9007199254740991(-(2^53-1)) 和 9007199254740991(2^53-1)之间的整数，任何超出此范围的整数值都可能失去精度。

    该整数大于JS Number 类型所能表示的最大整数，因此，它被四舍五入的。意外四舍五入会损害程序的可靠性和安全性。

    JS 提供 Number.MAX_SAFE_INTEGER常量来表示 最大安全整数， Number.MIN_SAFE_INTEGER常量表示最小安全整数
 -->

> BigInt 创建
- 1. 要创建 BigInt，只需在整数的末尾追加n即可。比较:
```js
console.log(9007199254740995n)
```

- 2. 用 BigInt()构造函数
```js
BigInt("9007199254740995")
```

- BigInt文字也可以用二进制 八进制 十六进制表示
```js
console.log(0b888776666n)
console.log(0x888776666n)
console.log(0o888776666n)
console.log(04888776666n)
```

**注意:**
- 不能使用严格相等运算符将 BigInt与常规数字进行比较，因为它们的类型不同：
```js
console.log(10n === 10)     false
console.log(typeof 10n)     bigint
console.log(typeof 10)      number
```

- 可以使用等号运算符，它在处理操作数之前执行隐式类型转换
```js
console.log(10n == 10)      true
```

- 除一元加号( +)运算符外，所有算术运算符都可用于 BigInt
```js
10n + 20n;    // → 30n	
10n - 20n;    // → -10n	
+10n;         
        // → TypeError: Cannot convert a BigInt value to a number	
-10n;         // → -10n	
10n * 20n;    // → 200n	
20n / 10n;    // → 2n	
23n % 10n;    // → 3n	
10n ** 3n;    // → 1000n	
const x = 10n;	
++x;          // → 11n	
--x;          // → 9n
```
<!-- 
    不支持一元加号（ +）运算符的原因是某些程序可能依赖于 +始终生成 Number的不变量，或者抛出异常。 更改 +的行为也会破坏 asm.js代码。
 -->

- 与 BigInt操作数一起使用时，算术运算符应该返回 BigInt值。因此，除法( /)运算符的结果会自动向下舍入到最接近的整数。例如:
```js
25 / 10;      // → 2.5	
25n / 10n;    // → 2n
```

> 隐式类型转换
- 因为隐式类型转换可能丢失信息，所以不允许在 bigint和 Number 之间进行混合操作。当混合使用大整数和浮点数时，结果值可能无法由 BigInt或 Number精确表示。思考下面的例子：
```js
(9007199254740992n + 1n) + 0.5
```

- 这个表达式的结果超出了 BigInt和 Number的范围。小数部分的 Number不能精确地转换为 BigInt。大于 2^53的 BigInt不能准确地转换为数字。

- 由于这个限制，不可能对混合使用 Number和 BigInt操作数执行算术操作。还不能将 BigInt传递给Web api和内置的 JS 函数，这些函数需要一个 Number 类型的数字。尝试这样做会报 TypeError错误
```js
10 + 10n;    // → TypeError	
Math.max(2n, 4n, 6n);    // → TypeError
```

- 请注意，关系运算符不遵循此规则，如下例所示：
```js
10n > 5;    // → true
```

- 如果希望使用 BigInt和 Number执行算术计算，首先需要确定应该在哪个类型中执行该操作。为此，只需通过调用 Number()或 BigInt()来转换操作数：
```js
BigInt(10) + 10n;    // → 20n	
// or	
10 + Number(10n);    // → 20
```

- 当 Boolean 类型与 BigInt 类型相遇时， BigInt的处理方式与 Number类似，换句话说，只要不是 0n， BigInt就被视为 truthy的值：
```js
if (5n) {	
    // 这里代码块将被执行	
}	
if (0n) {	
    // 这里代码块不会执行	
}
```

- 排序 BigInts和 Numbers数组时，不会发生隐式类型转换：
```js
const arr = [3n, 4, 2, 1n, 0, -1n];	
arr.sort();    // → [-1n, 0, 1n, 2, 3n, 4]
```

- 位操作符如 |、&、<<、>>和 ^对 Bigint的操作方式与 Number类似。下面是一些例子
```js
90 | 115;      // → 123	
90n | 115n;    // → 123n	
90n | 115;     // → TypeError
```

> BigInt构造函数
- 与其他基本类型一样，可以使用构造函数创建 BigInt。传递给 BigInt()的参数将自动转换为 BigInt:
```js
BigInt("10");    // → 10n	
BigInt(10);      // → 10n	
BigInt(true);    // → 1n

// 无法转换的数据类型和值会引发异常:
BigInt(10.2);     // → RangeError	
BigInt(null);     // → TypeError	
BigInt("abc");    // → SyntaxError

// 可以直接对使用构造函数创建的 BigInt执行算术操作
BigInt(10) * 10n;    // → 100n

// 使用严格相等运算符的操作数时，使用构造函数创建的 Bigint与常规 Bigint的处理方式类似
BigInt(true) === 1n;    // → true

```

-------------------------

> 字符串型 String：
- 在js中的字符串需要使用引号引起来
- 推荐使用单引号

    var str = "hello";
    str = "还可以修改已赋值的字面量";


> 字符串转义符
- 类似HTML中的特殊符号, 字符串中也有特殊字符, 我们称之为转义符
- 在字符串中我们可以使用\作为转义字符，当表示一些特殊符号时可以用\进行转义
    \"
    \'
    \n  表示换行
    \t  表示制表符
    \\  自己转义自己 是\
    \b  表示退格符
    \r  表示回车

<!-- 
    字符串转移字符, 都是用 \ 开头 但是这些转义字符写到引号里面
    console.log("今天天气\n真不错！！！")
 -->

> str.length 字符串的长度 
- 字符串是由若干字符组成的, 这些字符的数量就是字符串的长度, 通过字符串的属性length可以获取整个字符串的长度


> 字符串的拼接 '' + (数值相加, 字符相连)
- 多个字符串之间可以用 + 进行拼接, 拼接方式 字符串 + 任意类型 = 拼接之后的字符串
- 拼接前会把与字符串相加的任何类型转为字符换, 再拼接成一个新的字符串
<!-- 
    // 字符串中加变量
    引引加加
    'pink老师今年'++'岁'
 -->

-------------------------

> 布尔型 Boolean：
- 布尔值只有两个，用来进行逻辑判断
    true    - 表示 真
    false   - 表示 假

<!-- 布尔值在进行加法运算时 true当1, false当0 -->

-------------------------

> Null 空值：
- 这个类型的值 只有一个 就是null，null这个值专门用来表示一个为空的对象
- 使用typeof检查null值时，会返回object

    var x = null;
    console.log(x);                 //null的值为 null
    console.log(typeof x);          //null的对象类型是 Object

    let x = null;
    console.log(x + 1);             // 1 因为null为空
<!-- 
    一个声明变量给null值, 里面存的值为空
 -->

-------------------------

> Undefined 未定义:
- 这个类型的值 只有一个 就是undefined，
- 当我们声明一个变量但不给这个变量赋值时，它的值就是undefined

    let a = undefined;
    console.log(a + '123')      //undefined123  拼串

-------------------------

> typeof
- 可以使用一个运算符typeof，来检查 一个变量 的类型。
- 语法： typeof 变量名

    console.log(typeof a);

- 检查字符串时      
            会返回string

- 检查数字时        
            会返回number

- 检查布尔时        
            会返回boolean

- 检查null时        
            会返回object

- 检查undefined     
            会返回undefined

-------------------------

### 字面量
- 字面量是在源代码中一个固定值的表示法, 通俗来说, 就是字面量表示如何表达这个值
- 数字字面量:   8 9 10
- 字符串字面量:  '黑马程序员'
- 布尔值字面量: true false

-------------------------

### 强制的类型转换:
- 指将一个数据类型强制转换为其他的数据类型
- 类型转换主要指，将其他的数据类型，转换为 String Number Boolean

- 比如：
- 使用表单, prompt获取过来的数据默认是字符串类型的, 此时就不能直接简单的进行加法运算, 需要转换变量的数据类型

- 经常转换的3种类型

- 转换为 字符串型
- 转换为 数字型
- 转换为 布尔型

-------------------------

### 转换为 String：
> 方式一：toString()
- 调用被转换数据类型的toString()方法，该方法不会改变原变量的类型, 它会将转换的结果返回
<!-- 
    注意：
    null和undefined这两个值没有toString()方法，如果调用他们的方法，会报错

    let num = 123
    let res = num.toString()
    console.log(res, typeof res)        // string
-->

- 方法:
- 调用 变量a的toString()，就是a.toString()

    var a = 123;

- 1. 将原先为Number类型的变量a 转换为String类型
    a.toString();

- 2. 因为不会影响原变量，它会将转换的结果返回，所以类型还是number，值是123
    console.log(typeof a);      

- 3. 数据类型转换为String的结果赋值给b
    var b = a.toString();
    a = a.toString();           //不想另定义一个新的变量b 就想改a

    console.log(typeof b);      
    

> 扩展
- 使用toString()对 数字 进行转换时, 可以在()中传递一个整数作为参数
- 它将会把数字转换为指定的进制, 如果不指定则默认转换为10进制
<!-- 
    var a = 255;
    a = a.toString(2);

    console.log(a);
    console.log(typeof a);
 -->


> 方式二：String(变量)
- 调用String()函数，并将被转换的数据作为参数传递给函数
<!-- 
    使用String()函数做强制转换时，对于Number和Boolean实际上就是调用的toString()方法 
-->

- 这种方式可以改变 null和undefined这个类型

    var a = 123;                //调用String()函数，来将a转换为字符串String
    a = String(a);              //转谁就把它写在括号里，这个a叫做参数

    let arr = [1, 2, 3]
    let result = String(arr);   // 1,2,3

**注意：**
- String() 能转换一维数组 不能转换对象


> 方法三：隐式转换 b = b + ""
- 利用任何值和字符串做加法运算时，都会先把该值转换为字符串，然后再进行运算的原理

    b = b + "";
<!-- 
    let arr = [1, 3, 4]
    let res = arr + ""
    console.log(res)
 -->

------------------------------

### 转换为 Number

> 方式一:
- parseInt()        从一个字符串中 提取整数部分 并转换为Number类型
- parseFloat()      从一个字符串中 提取小数部分 并转换为Number类型
- 使用上述两个方法可以将 一个字符串类型的数字 转换为 对应的 number类型结果

- 参数1：
    要被转换的数字

- 参数2: 
    进制

- 扩展:
- parseInt(), parseFloat()中还可以传第二个参数，代表进制

- 注意：
- 如果是对 非字符串类型 使用上述方法转换 它会先将其转换为String然后在操作
- 123：number - > "123" - > pareseInt()

<!-- 
    // 这是一个字符串，接下来把它转成Number数据类型
    var a = "070"           
    a = parseInt(a);    

    console.log(typeof a);  
    console.log(a);          // 70

    所以为了统一，
    我们可以在parseInt()中传递第二个参数， 来指定数字的进制
    a = parseInt(a, 8)       // 56
 -->

> 扩展:
- 可以使用 isNaN() 来对 parseInt() 和 parseFloat() 的结果做判断看看得到的结果合不合法
<!-- 
    let num = parseInt(prompt("请输入一个数字"))
    if(isNaN(num)) {
        alert("您输入的数字不合法")
    } else {
        console.log(num)
    }
 -->


> 方式二：  +(正)
- 利用一元运算符 + -正号负号的运算方式，可以把非Number类型的数据，强制转换为Number

    var a = "123";
    a = +a;


> 方式三：  - * /
- 任何值- * / 运算时都会自动转换为Number, 所以我们可以用 -0，*1，/1的方式把它们转换为Number。

    var a = "123";
        a = true;
        a = false;
        a = " ";

    a = a - 0;


> 方式四：
- 使用Number()函数，它可以转换任意类型的数据
<!-- 
    []        转为 数字 是 0
    ''        转为 数字 是 0
    null      转为 数字 是 0

    长度为1的数字数组 会被转化为该数字
    十六进制   也能转化为数字

    undefined {} 空函数 无法转为数字
 -->

> 字符串 --> 数字
- 1. 如果是纯数字字符串，则直接将其转换为数字           //var a = "123";
- 2. 如果字符串有非数字内容，则转换为NaN               //var a = "12fff3";
- 3. 如果字符串中是空串或者全是空格的字符串，值会是0     //var a = "" 或者 " ";
            

> 布尔 --> 数字
    true    转成 1
    false   转成 0
                    
> Null --> 数字
    结果是0
        
> undefined --> 数字
    结果是NaN

> 扩展:
- null、空字符串""、空数组[]，
        - 都可被Number() 合法的转为0

- undefined、空对象{}、空函数等   
        - Number() 的结果是NaN

----------------------------------

### 转换为 Boolean

> 方法一：!运算
- 利用逻辑运算中的 !运算 来对非布尔值进行运算，会将会将其转化为布尔值让后进行取反 我们可以利用该特点，来将一个其他的数据类型，转换为布尔值
    
    !!b
<!-- 
    let flag = 1
    console.log(!flag)      // false
    console.log(!!flag)     // true
 -->


> 方法二：
- 使用Boolean()函数
- 代表 空 否定的值会转换为false, 其它的都是true
<!-- 
    // 代表 空 否定的值
    0 null NaN undefined
 -->

> 数字 --> 布尔
- 除了0 和 Nan是false，其余的都是true；

> 字符串 --> 布尔
- 除了空串是false，其余的都是true

> Null / undefined--> 布尔  都是false


**注意：**
- 对象也会转换为true

    var a = 123;
    a = Boolean(a);         //调用Boolean()函数来将a转换为布尔值

    console.log(type a);    // "boolean"
    console.log(a);         // true

------------------------------------

### 运算符
- 运算符也叫作操作符，通过运算符可以对一个或者多个值进行运算，并获取运算结果
- typeof就是一个运算符，可以来获得一个值的类型，它会将该值的类型以字符串的形式返回

### 算数运算符    
    + - * / %
<!-- 
    3 % 5 余数为 3      3 < 5 余数就是本身
 -->

- 浮点数 算数运算里面会有问题
<!-- 
    0.1 + 0.2 = 0.300004
    0.07 * 100 = 7.000001

    原因:
    因为小数已经很小了, 还要转换为2进制 让2进制再进行运算 这时候就会有误差
    不仅仅是js java也一样
-->

- 所以我们不能拿着浮点数来进行比较
<!-- 
    let num = 0.1 + 0.2
    console.log(num == 0.3)     //false
 -->

**注意：**
- 算数运算符也有优先级 先乘除后加减, 有小括号先算小括号
- 当对非Number类型的值进行运算时，会将这些值转换为Number然后再运算（除了字符串的加法）
- 任何值和NaN做运算都得NaN

> +
+   可以对两个值进行加法运算，并返回一个结果(都不会对原变量产生影响)
<!-- 
    // 如果对两个字符串进行加法运算， 则会进行拼串
    "123"+"456"      //  "123456"
-->

> js中常用的运算符:
-   可以对两个值进行减法运算，并返回一个值
*   可以对两个值进行乘法，并返回一个值
/   可以对两个值进行除法，并返回一个值

%   取模运算（取余数） 9 % 3 = 9除以3，取余数，余数为0，结果为0

--------------------------------------

### 递增 递减 运算符
- 如果需要反复给数字变量添加 或 减去1, 可以使用++ -- 运算符来完成
- js中 递增 和 递减 既可以放在变量的前面, 也可以放在变量的后面

- 放在前面时, 我们称为前置递增(递减)运算符
- 放在后面时, 我们称为后置递增(递减)运算符

**注意:** 
- 递增和递减运算符必须和变量配合使用 num++

> 前置递增运算符 ++num (等于原变量自增后的值，也就是新值)
- 就是自加1, 类似num = num + 1
<!-- 
    口诀:
    先自加, 后返回值
 -->

> 后置递增运算符 num++ (等于原变量的值，自增前的值，也就是原值)
- 前置自增 和 后置自增如果单独使用效果是一样的
- 先表达式返回原值, 后面变量再自加1, 也就是说变量永远比表达式大1
<!-- 
    口诀:
    先返回原值, 后自加
 -->

<!-- 
    let num = 10;
    num++;                      // 11
    let result = num++ + 2;     // num++ 是11(原值), 11+2
    console.log(result);        // 13

    num++ 单独使用都是自加1, 但是连在一起使用时, 
    num++ + 2  -- >  num++代表的就是原值, 

    ---

    let a = 10;
    let b = a++ + ++a;
    console.log(b);             //22    不是21

    a++为原值10 --- 这时变量a为11 --- ++a在新值12 --- 最后10+12
 -->

- 开发时, 大多使用后置递增, 并且代码独占一行

--------------------------------------

### 比较运算符
- 两个数据进行比较时所使用的运算符, 比较运算后, 会返回一个布尔值作为比较运算的结果

**注意：**
- 非数值比较时，会将其转换为Number类型，然后再比较
- NaN不和任和值相等，包括它本身

    <
    >
    >=
    <=
    ==      判等号(有隐式转换)  只要求值相等
            console.log(18 == '18');    //true

    !=      不等号
    ===     全等 要求值和数据类型都一致
    !==


> 总结
- 1. 非数值比较时，会将其转换为Number类型，然后再比较
- 2. 任何值和NaN比较都是false
- 3. 如果符号两侧的值都是字符串时，将比较 unicode 编码
<!-- 
    不会将其转换为Number进行比较，而会分别比较字符串中字符的Unicode编码，可以用这种方式排序英文名

    console.log("a" < "b");
        //比较的是字符编码，16进制小a是0061，小b是0062

    console.log("abc" < "b"); 
        //比较字符编码时，是一位一位进行比较，abc，
            先同时比较左侧位，
            然后比较中间位（右侧没有中间位所以是false），
            最后比较最后位

        // 如果第一位小 那么后面的也不用看了吧
 -->

- 4. 比较中文时没有意义
- 比较两个字符串的数字，可能会得到不可预期的结果，一定要转型，只要把一个数字字符串转为Number类型就可以正常比较了
<!-- 
    console.log("1123457654" < "5");    //正常结果是false
    console.log("1123457654" < +"5");   //进行Number转换之后才是true

    比如：网购时的购物车，可以填写购买的数量，但这时候填写的都是字符串而非数字，
    这时候可能限制用户的购物量不能超过20, 不能超过最大库存，这时候比较可能就会出现问题  
 -->


> ==
- 比较两个值是否相等，如果相等会返回true，否则会返回false
- 当使用==来比较两个值时，如果值的类型不同，则会自动进行类型转换，将其转换为相同的类型，然后再比较
<!-- 
    转换成什么，不一定，但大部分情况都会转换为数字
    undefined 衍生自 null， 所以这两个值做相等判断时，会返回true
 -->


> 扩展知识:
- 1. 任何对象转换为boolean值都为true
- 2. undefined null对应的boolean值为false
- 3. == 操作符不会尝试将左右操作数转换为boolean值后再进行比较
- 4. 如果一个值为对象，另一个为数字或字符串，那么向将对象转换为原始值，先使用valueOf转化为原始值,不能转换为原始值的再尝试使用toString方法转换为原始字符串


>> 目标.valueOf()
- 该方法会将对象转换为基本类型，如果无法转换为基本类型，则返回原对象。

--------------------------------------

### 逻辑运算符
- 逻辑运算符是用来进行布尔值运算的运算符, 其返回值也是布尔值, 经常用于多个条件的判断

    与  &&    and     true && false
    或  ||    or      true || false
    非  !     not     !true           
<!-- !非运算可以将其他数据类型转换为布尔 !!b -->

> 与 &&
- 两侧都为true 结果才是true 只要有一侧是false 结果就是false
<!-- 
    3 > 5 && 3 > 2      //false
    3 < 5 && 3 > 2      //true
 -->

> 或 ||
- 两侧都为false 结果才是false 只要有一侧为true 结果就是true
<!-- 
    3 > 5 || 3 > 2      // true
    3 > 5 || 3 < 2      // false
 -->

> 非 !
- 也叫作取反符, 用来取一个布尔值相反的值, 如: true的相反值就是false
- 如果对非布尔值进行运算，则会将其转化为布尔值让后进行取反
- 我们可以利用该特点，来将一个其他的数据类型，转换为布尔值，!!b
<!-- 
    var b = 10;
    b = !b;

    console.log(typeof b);      //b = false
    console.log(b);             //Boolean
 -->


### 短路运算(逻辑中断)
- 短路运算的原理: 当有多个表达式(值)时, 
- 左边的表达式值可以确定结果时, 就不再继续运算右边表达值的值


> 逻辑与的短路运算
- 语法: 表达式1 && 表达式2
    - 如果第一个表达式的值为真, 则返回表达式2
    - 如果第一个表达式的值为假, 则返回表达式1
<!-- 
    123 && 456                  // 456
    0 && 456                    // 0
    0 && 1 + 2 && 456*789       // 0 因为0是false后面的就不看了

    如果有空 或者 否定的为假, 其余的都是真 0 null undefined NaN ''
 -->


> 逻辑或的短路运算
- 语法: 表达式1 || 表达式2
    - 如果第一个表达式的值为真, 则返回表达式1
    - 如果第一个表达式的值为假, 则返回表达式2
<!-- 
    123 || 456                  // 123 第一个表达式为true返回表达式1
 -->

> 练习:
<!-- 
    let num = 0;
    console.log(123 || num++);
    console.log(num);           // 0 num++没有执行 逻辑中断了
 -->

--------------------------------------

### 赋值运算符
- 用来把数据赋值给变量的运算符

> =         直接赋值
    - 可以将符号右侧的值赋值给符号左侧的变量，eg：var a = 10

> += -=     加 减一个数后 再赋值
    - a += 5 等价于 a = a + 5，a变量增加5

>   加 减一个数后 再赋值
    - a -= 5 等价于 a = a - 5，a变量减5

> *= /= %=  乘, 除, 取模后 再赋值
    - a *= 5 等价于 a = a * 5，a变量乘以5
    - a /= 5 等价于 a = a / 5，a变量除以5
    - a %= 5 等价于 a = a % 5，a变量除以5取余数  

    - a++ 等价于 a = a + 1

------------------------------------------

### 一元运算符
- 只需要一个操作数, 比如++num !num (2个操作数 2+3)
- 对于非Number类型的值，先转成Number然后再运算

- 可以对一个其他的数据类型(任意值 string boolean 都可以)使用 + ，
    来将其转换为Number，它的原理和Number函数一样

+ 正号      
- 正号不会对数值产生任何影响

    a = "18";       //我想通过一元运算符对String类型进行强制Number类型转换
    a = +a;
    console.log(typeof a);
    console.log("a="+a);


- 负号      
- 负号可以对数字进行负号的取反

    var a = 1 + "2" + 3;
    console.log("a="+a);        //结果是123

    var a = 1 + +"2" + 3;
    console.log("a="+a);        //结果是6, 在字符串前添加了 “ + ”

-------------------------------------------

### 运算符的优先级
- 在js中有一个运算符优先级的表，在表中越高上则优先级越高，就会越优先计算
    如果优先级一样，则从左往右计算

1       小括号          ()
2       一元运算符      ++ -- !
3       算数运算符      先 * / % 后 + -
4       关系运算符      > >= < <=
5       相等运算符      == != === !==
6       逻辑运算符      先&& 后||
7       赋值运算符      =
8       逗号运算符      ,   
<!-- 
    逗号运算符:
    使用, 可以分割多个语句，一般可以在声明多个变量时使用。 
-->


- 一元运算符里面 逻辑非 优先级很高

- 根据逻辑运算符来区分

<!-- 
    let c = 2 === '2'       ===的优先级比较高, 先看2 === '2'
    c       false

    let d = !c || b && a    !的优先级高
 -->

-------------------------------------------

### 位运算符
- 位运算符是在数字底层（即表示数字的 32 个数位）进行操作的。

- ES当中整数有两种类型, 所有的整数字面量默认都是有符号的整数
- 1. 有符号的整数(正数, 负数)
- 2. 无符号的正数(只允许正数)

> 有符号的整数
- 符号位为最高位

    符号位(第31位)      -     (第0位)
    0(正数)
    1(负数)

- ES中有两种不同的方式存储二进制形式的有符号整数
- 1. 用于存储负数
- 2. 用于存储正数

- 正数是以真二进制形式存储的，前 31 位中的每一位都表示 2 的幂
    4      3      2      1      0
    2^4    2^3    2^2    2^1    2^0   

- 没用到的位用 0 填充，即忽略不计。例如，下图展示的是数 18 的表示法。 
<!-- 
    我们可以使用js中的 toString(2) 来看一下指定数字的2进制
    let num = 4;
    console.log(num.toString(2));   // 100
-->


> 解读 2进制的方式1
- 可以理解为每一个数字都有对应的标 处于i位的值就是 
- 当前数字 * 2^下标次幂
<!-- 
    1   0   0
    1*2^2 + 0*2^1 + 0*2^0 = 4

    也就是说我们只看 1 的就可以 因为 0*2^n也是0
 -->
    
<!-- 
    let num = 4
    num = num.toString(2)
    console.log(num)        // 100
 -->


- 负数也存储为二进制代码，不过采用的形式是二进制补码。
- 计算数字二进制补码的步骤有三步：

- 1. 确定该数字的非负版本的二进制表示  -- 原码
<!-- 
    （例如，要计算 -18的二进制补码，首先要确定 18 的二进制表示） 
    要展示全的32位
-->

- 2. 求得二进制反码，即要把 0 替换为 1，把 1 替换为 0   -- 反码

- 3. 在二进制反码上加 1
<!-- 
    要确定 -18 的二进制表示，首先必须得到 18 的二进制表示，如下所示：
    0000 0000 0000 0000 0000 0000 0001 0010

    计算二进制反码
    1111 1111 1111 1111 1111 1111 1110 1101

    在二进制反码上加 1
    1111 1111 1111 1111 1111 1111 1110 1101
                                            1
    1111 1111 1111 1111 1111 1111 1110 1110
 -->

> 注意:
- 记住，在处理有符号整数时，开发者不能访问 31 位。
- 有趣的是，把负整数转换成二进制字符串后，ECMAScript 并不以二进制补码的形式显示，而是用数字绝对值的标准二进制代码前面加负号的形式输出。例如：

    num = 4   // 100    二进制的显示
    num = -4  // -100   二进制的显示

- 这是为避免访问位 31。为了简便，ECMAScript 用一种简单的方式处理整数，使得开发者不必关心它们的用法。



> 位运算 NOT
- 位运算 NOT 由否定号（~）表示

- 位运算 NOT 是三步的处理过程：
- 1. 把运算数转换成 32 位数字
- 2. 把二进制数转换成它的二进制反码
- 3. 把二进制数转换成浮点数
<!-- 
    num = 25    

    1. 00000000000000000000000000011001
    2. 11111111111111111111111111100110
    3. 结果是26

    位运算 NOT 实质上是对数字求负，然后减 1，
    因此 25 变 -26。用下面的方法也可以得到同样的方法：
 -->

<!-- 
    let num = 18
    let num2 = ~18
    console.log(num2);      // -19
 -->


> 位运算 AND    &
- 位运算 AND 由和号（&）表示 直接对数字的二进制形式进行运算。
- 它把每个数字中的数位对齐，然后用下面的规则对同一位置上的两个数位进行 AND 运算：
<!-- 
    // 规则
    - 相同数字 结果为该数字, 不同就是0

    数字1中的数位	数字2中的数位	结果
    1	            1	            1
    1	            0	            0
    0	            1	            0
    0	            0	            0
 -->

- 要对数字 25 和 3 进行 AND 运算，代码如下所示：
<!-- 
    let num = 25
    console.log(num.toString(2));   // 11001

    let num2 = 3
    console.log(num2.toString(2));  // 11

    let result = 25 & 3
    console.log(result);

    11001
    00011
    00001

    result = 1;
 -->


> 位运算 OR     |
- 位运算 OR 由符号（|）表示，也是直接对数字的二进制形式进行运算
- 在计算每位时，OR 运算符采用下列规则：
<!-- 
    // 规则     相同数字 结果为该数字, 不同就是1
    数字1中的数位	数字2中的数位	结果
    1	            1	            1
    1	            0	            1
    0	            1	            1
    0	            0	            0
 -->

- 要对数字 25 和 3 进行 OR 运算，代码如下所示：
<!-- 
    let num = 25
    console.log(num.toString(2));   // 11001

    let num2 = 3
    console.log(num2.toString(2));  // 11

    let result = 25 | 3
    console.log(result);

    11001
    00011
    11011

    2^4 + 2^3 + 2^2 + 2^1 + 2^0  = 16 + 8 + 2 + 1 = 27

    result = 27;
 -->


> 位运算 XOR    ^
- 为什么当布尔类型的值进行 ^ 运算的时候 得到的是数字呢？

```js
let a = true
let b = false

let flag = a ^ b;
console.log(flag)       // 1
```

- 位运算 XOR 由符号（^）表示 当然，也是直接对二进制形式进行运算
- XOR 不同于 OR，当只有一个数位存放的是 1 时，它才返回 1。真值表如下：
<!-- 
    // 规则     两个数的数位比较该数位只有一个1时 返回1 其它都是0
    数字1中的数位	数字2中的数位	结果
    1	            1	            0
    1	            0	            1
    0	            1	            1
    0	            0	            0
 -->

- 对 25 和 3 进行 XOR 运算，代码如下
<!-- 
    let num = 25
    console.log(num.toString(2));   // 11001

    let num2 = 3
    console.log(num2.toString(2));  // 11

    let result = 25 ^ 3
    console.log(result);

    11001
    00011
    11010

    2^4 + 2^3 + 2^1  = 16 + 8 + 2

    result = 26;
 -->


> 左移运算 << 左移运算保留数字的符号位
- 左移运算由两个小于号表示（<<）
- 它把数字中的所有数位向左移动指定的数量
- 注意：在左移数位时，数字右边多出 5 个空位。左移运算用 0 填充这些空位，使结果成为完整的 32 位数字。
<!-- 
    例如:
    把数字 2（等于二进制中的 10）左移 5 位，结果为 64
    （等于二进制中的 1000000）：

    如果是-2
    那结果就是-64
 -->

> 注意:
<!-- 
    左移运算保留数字的符号位。
    例如，如果把 -2 左移 5 位，得到的是 -64，而不是 64。
    “符号仍然存储在第 32 位中吗？”

    是的，不过这在 ECMAScript 后台进行，开发者不能直接访问第 32 个数位。
    即使输出二进制字符串形式的负数，显示的也是负号形式
    （例如，-2 将显示 -10。） 
-->


> 有符号右移运算    >>
- 有符号右移运算符由两个大于号表示（>>）
- 它把 32 位数字中的所有数位整体右移，同时保留该数的符号（正号或负号）。
- 有符号右移运算符恰好与左移运算相反。例如，把 64 右移 5 位，将变为 2：

- 同样，移动数位后会造成空位。这次，空位位于数字的左侧，但位于符号位之后。ECMAScript 用符号位的值填充这些空位，创建完整的数字，如下图所示：
<!-- 
    num = 64            // 1000000
    result = num >> 5   // 0000010

    result = 2
 -->

-------------------------------------------

### 编码
- 在js中想用Unicode编码，就是 \u四位编码，编码为16进制
- 在网页中想用Unicode编码，就是 &#编码; ，编码为10进制

> &编码;
- 正常是&开头，;结尾，比如&nbsp;，但要输入Unicode编码则要如下
     
<!-- 
    使用转义字符，&#编码;  
    但这里的编码是需要10进制的，可以打开计算机，选择程序员，转换 
-->

-----------------------------

### 语句
- 我们的程序是由一条一条语句构成的，语句是按照自上向下的顺序一条一条执行的, 在JS中我们可以使用{}来为语句进行分组
    
- 同一个{ }中的语句我们称为一组语句，它们要么都执行，要么都不执行, 一个{ }中的语句我们也称为一个代码块

    {
        alert("");
        console.log("");
        document.write("");
    }

-----------------------------

### 流程控制
- 在一个程序执行的过程中, 各条代码的执行顺序对程序的结果是有直接影响的, 很多时候我们要通过控制代码的执行纯属来实现我们要完成的功能

- 简单理解:
- 流程控制就是来控制我们的代码按照什么结构顺序来执行

- 流程控制的三种结构:
- 顺序结构, 分支结构, 循环结构


        顺序结构        分支结构            循环结构     

        顺序执行        条件执行            循环执行
           ↓               ↓ 
           A             判 断                A   ←
           ↓               ↓                  ↓      ↑
           B           A       B            判 断    yes
           ↓           ↓       ↓              ↓


> 分支结构
- 由上到下执行代码的过程中, 根据不同的条件, 执行不同的路径代码
- 执行代码多选一的过程, 从而得到不同的结果

- if语句
- switch语句

> 条件判断语句
- 使用条件判断语句可以在执行某个语句之前进行判断，如果条件成立才会执行语句，不成立不执行

> if语句 -- 语法一：

    if(条件表达式){
        语句 .....   
    }

> 执行思路:
- if语句在执行时，会先对条件表达式进行求值判断，
- 如果条件表达式的值为true  则执行if后的语句, 
- 如果条件表达式的值为false 则不会执行if后的语句 
<!-- 
    if语句只能控制紧随其后的语句，如果希望if语句可以多条语句，可以将这些语句，统一放入代码块中, if语句后的代码块不是必须的，但在开发过程中尽量写上代码块 

    if(true)
        alert("你猜我出来么？");

    var a = 10;
    if(a > 10) {
        alert("a比10大");
        alert("谁也管不了我");
    }

    var a = 5;
    //当想加入多个条件时，可以用与运算，只有两端同时都是true都满足时，才会执行下面的语句
    if(a > 10 && a <= 20){
        alert("a大于10，并且小于等于20");
    }
-->


> if...else语句 -- 语法二：

    if(条件表达式){
        语句。。。。。
    }else{
        语句。。。。。
    } 

> 执行思路:   
- if...else...语句：当该语句执行时，会先对我们if后的表达式求值判断
- 如果该值为true，则执行if后的语句
- 如果该值为false，则执行else后的语句
- 不管是if 还是 else 执行哪个整个结构都执行完毕
<!-- 
    var age = 50;
    if(age >= 60) {
        alert("你已经60退休了");
    }else {
        alert("你还得继续工作")
    }
 -->


> if...else if...else语句 -- 语法三：
- 多分支语句 就是利用多个条件来选择不同的语句执行, 得到不同的结果 多选1的过程

    if(条件表达式){
        语句。。。。。
    } else if(条件表达式) {
        语句。。。。。
    } else if(条件表达式) {
        语句。。。。。
    } else {
        语句。。。。。
    }

> 执行思路:
- if...else if...else语句：当该语句执行时，会从上到下一次对条件表达式进行求值判断
- 如果求值结果为true，则执行当前的语句
- 如果求值结果为false，则继续向下判断
- 如果所有的条件都不满足，则执行最后的else语句, 该语句中只会有一个代码块被执行，一旦代码块被执行，则直接结束语句
<!-- 
     var age = 50;
    if(age > 100){
        alert("活着挺没意思的");
    }else if(age > 80){
        alert("你也老大不小的了");
    }else if(age > 60){
        alert("你退休了");
    }else if(age > 30){
        alert("你已经中年了");
    }else if(age > 17){
        alert("你已经成年了")；
    }else{
        你还是个孩子
    }
 -->

-----------------------------

### 三元表达式(二选一的过程)
- 由三元运算符组成的式子我们称为三元表达式 ? :

> 语法：条件表达式 ? 表达式1 : 表达式2
- 执行流程：条件运算符在执行时，首先对条件表达式进行求值
- 如果该值为真，则执行 表达式1，并返回执行结果
- 如果该值为假，则执行 表达式2，并返回执行结果
<!-- 
    条件表达式 ? 表达式1 : 表达式2   这个部分是一个表达式, 既然是表达式就会有返回值
 -->
<!-- 
    let num = 10;
    let result = num > 5 ? '是的' : '不是的';
    console.log(result);
 -->

> 常用的形式: 变量 = 表达式 ? 值1 : 值2
- 动态给变量赋值

-----------------------------

### 分支流程控制 --- switch 语句
- switch语句也是多分支语句, 它用于基于不同的条件来执行不同的代码, 当要针对 @变量@ 设置一系列的特定值的选项时, 就可以使用switch语句

> switch语句 语法：

    switch(条件表达式){
        case 常量：
            语句。。。
            //使用break可以来退出switch语句，不会向下执行所有的case代码
            break;

        case 常量：
            语句。。。
            break;

        //如果没有case和switch全等的条件，则会执行default后的语句
        default:                
            语句。。。
            break;
    }


> 执行思路：
- switch...case...语句
- 在执行时会依次将case后的表达式的值和switch后的条件表达式的时进行全等比较
- 如果比较结果为true（全等），则从当前case处开始执行代码
- 如果比较结果为false，则继续向下比较
- 如果所有的比较结果都为false，则只执行default后的语句
<!-- 
    当前case后的代码都会执行，可以在case后面跟上break，
    这样可以确保只会执行当前case的语句，而不会执行其他的case后的语句
    var num = 1;
    switch(num){
        //先会看此处case值和switch条件表达式进行全等比较，如果全等则输出下面代码
        case 1:                     
            console.log("一");

            //使用break可以来退出switch语句
            break;                  
        case 2:
            console.log("二");
    }
 -->

    
> 开发时会把 switch(变量) 这么写

    let num = 3;
    switch(num){
        case 1：
    }


> switch语句的练习
- 一：对于成绩大于60分的，输出 合格，低于60分的，输出 不合格
<!-- 
    var score = 60;
    //假如写具体的分数的话，情况得从60-100都写上，太长所以用除以10
    变成 10种情况，但是这么写的话，只对整数才有意义, 所以应该对条件表达式里的结果，取整

    switch(score/10){ ... }  

    //利用parseInt来对结果取整
    switch(parseInt(score/10)){        

        case 10:                       
        case 9:
        case 8:
        case 7:
        case 6:
            console.log("合格");
            break;
    }
-->

- 二: 水果价格查询
- 思路:
    - 创建变量保存用户输入的水果名
    - 将这个变量作为条件表达式
    - case后面的值写几个不同的水果名称 --- 注意 --- 一定要加上引号, 因为是全等匹配

    - 弹出不同价格即可, 同样注意每个case之后加上break 以使退出switch语句
    - 都没有就设置default

-----------------------------

### switch语句 和 if else if 区别
- 一般情况下, 他们两个语句可以相互替换的
- switch语句通常在处理case为比较确定值的情况
- if else语句更加的灵活, 常用语范围判断(大于等于某个范围)

- switch语句进行条件判断后会直接执行到程序的条件语句, 效率更高
- if else语句有几种条件, 就得判断多少次

- 分支比较少的时候 if else语句的执行效率比switch语句高
- 分支比较多的时候 switch语句的执行效率比较高 而且结构清晰

-----------------------------

### 循环
- 在程序中, 一组被重复执行的语句称之为循环体, 能否继续重复执行, 取决于循环的终止条件
- 由循环体 和 循环终止条件 组成的语句 称之为循环语句

> for循环
- 重复执行某些代码, 通常跟计数有关系
- 在for循环中，为我们提供了专门的位置用来放三个表达式：

    - 1. 初始化表达式     通常用于作为计数器使用
    - 2. 条件表达式       当不满足条件表达式的时候会终止循环
    - 3. 更新表达式       每次循环最后执行的代码, 用于对初始化表达式进行更新
    
- 语法：
    for(1初始化表达式; 2条件表达式; 4更新表达式){
        3语句。。。
    }
<!-- 1   2 3 4   2 3 4   2 3 4 的执行顺序 -->

- 执行流程：
    1. 执行初始化表达式，初始化变量 此处只会执行一次
    ↓
    2. 执行条件表达式，判断是否执行循环
        如果是true，则执行循环  →   3.语句
        如果是false，终止循环
    ↓
    4. 执行更新表达式，更新表达式执行完毕后，继续重复
    ↓
    2


> while 和 for 的语法结构对比:
<!-- 
    // 创建一个10次的while循环
    var a = 0;                  //1 初始化表达式，初始化一个变量
    while (a < 10){             //2 条件表达式
        document.write(a++);    //3 更新表达式
    }

    // 把上面的while循环转换成for循环：

    for (var a = 0; i < 10; i++){
        alert(i);
    }
-->

- 


> 利用for循环重复执行不同的代码
- for循环可以重复执行不同的代码, 这主要是因为使用了计数器i的存在, 计数器i在每次循环过程中都会有变化

    for(let i=1; i<100; i++){
        console.log('这个人今年'+ i +'岁')
    }

<!-- 
    for(let i=1; i<=100; i++){
        if(i == 1){
            console.log('1岁了')
        }else if(i == 100){
            console.log('这个人shi掉了')
        }
    }
 -->

- 总结: 
- 我们可以利用到for循环了i的值, 用if判断语句来写的话 并不是会把for {...} 执行多少次, 而是只输出了 if 里 符合判断的的语句 会一起出来

-----------------------------

### while循环：
- 语法：

    while(条件表达式){
        语句。。。（循环体）
    }

- 执行流程：
    while语句在执行时，先对条件表达式进行判断，
    如果值是true，  则执行循环体，循环体执行完毕以后，继续对表达式进行判断
    如果值为true，  则继续执行循环体，以此类推
    如果值为false， 则终止循环

<!-- 
    var n = 1;

    //像这种将条件表达式写死的true的循环，叫做死循环
    while(true){            
        alert("n++");       

        //n等于10的时候，再执行break                            
        if(n == 10){
            break;          
        }
    } 
-->

- 创建一个循环，往往需要三个步骤
    1. 创建一个初始化的变量                     var a = 0；
    2. 再在循环中设置一个条件表达式             while(a < 10)
    3. 在定义一个更新表达，每次更新初始化变量    a++;
    4. 终止条件

        var i = 0;
        while(i < 10){
            document.write(i++ + "<br />")
        }

<!-- 
    let message = prompt('你爱我么?');
    while(message !== '我爱你'){
        message = prompt('你爱我么?');
    }
 -->


> do...while循环
- 它是while语句的一个变体, 该循环会先执行一次代码块, 然后对条件表达式进行判断, 如果条件为真, 就会重复执行循环体, 否则退出循环

- 语法：
    do {
        循环体语句。。。
    } while(条件表达式)

<!-- 
    var i = 0;
    do{
        document.write(i++ + "<br />")
    } while(i < 10) 
-->

- 执行流程
    do...while语句在执行时，会先执行循环体
    循环体在执行完毕后，再对while后的表达式进行判断
    如果结果为true，    则继续执行循环体，执行完毕继续判断，
    如果结果为false，   则终止

<!-- 
    实际上这两个语句类似，功能类似，while是先判断再执行，do是先执行后判断
    区别为：
    do...while可以保证循环体至少执行一次，而while不行 
-->

-----------------------------

### break 和 continue 和 return

> continue
- continnue关键字用于立即跳出本次循环, 继续下一次循环(本次循环中continue之后的代码就会少执行一次), 并不会结束整个循环。

- continue只能在循环中使用，不能出现在其他的结构中。
<!-- 
    例如:
    吃5个包子 第3个有虫子, 就扔掉第3个 继续吃第4个第5个包子
 -->
<!-- 
    for(let i=1; =<=5; i++){
        if(i==3){
            continue;
        }
        console.log(`我正在吃第${i}个包子`)
    }

    当i为3时, 会跳出本次循环的所有内容 不会输出console语句, 会直接跳到i为4
 -->

<!-- 
    求1 - 100之间, 除了能被7整除之外的整数和

    let sum = 0;
    for(let i = 0; i<=100; i++){

        // 跳出这个部分
        if(i%7 == 0){
            continue;
        }
        sum += i;
    }
    console.log(sum);
-->


> break
- 关键字可以立刻退出最近的循环语句，强制执行循环后面的语句，不能用于if
- 退出整个循环
<!-- 
    例如:
    吃5个包子 吃到第3个发现里面有 半个虫子, 剩下的都不吃了
 -->

<!-- 
    for(let i = 0; i<=5; i++){

        if(i == 3){
            break;
        }
        console.log(`我正在吃第${i}个包子`)
    }
 -->
    

<!-- break和continue语句只在循环和switch语句中使用。 -->


> lable:
语法：
    
    label：
    循环语句

- break 和 continue都可以使用lable

<!-- 
    // 为这下面的for循环起了一个hello的名字
    hello: for(i=0; i<5; i++){
        console.log("@外层循环" + i)

        for(j=0; j<5; j++){

            //看这里在break后输入了 我们为这个循环创建的名字
            break hello;                  
            console.log("内层循环" + j)
        }
    } 
-->

> return
- 不仅可以退出循环, 还能够返回return语句中的值, 同时还可以结束当前的函数体内部的代码

-----------------------------

### 数组简介：
- 数组是指一组数据的集合, 其中的每个数据被称为元素, 在数组中可以存放任意类型的元素, 数组是一种将一组数据存储在单个变量名下的优雅方式

- 内建对象
- 宿主对象
- 自定义对象

- 目前我们应用最多的都是内建对象，和宿主对象
- 内建对象：数组


> 数组（Array）
- 数组也是一个对象，它和普通的对象功能类似，也是用来存储数据的
- 不同的是普通对象是使用字符串作为属性名，而数组是使用数字来作为索引操作元素的, 在对象中称之为属性，在数组中叫元素


> 索引：
- 用来访问数组元素的序号(数组下标从0开始)
<!-- 
    数组的存储性能比普通对象要好，在开发中我们经常使用数组来存储一些数据 
-->
        
        正常对象是                          而数组是

     属性名 和 属性值                    索引（index） 和 值
     name     孙悟空                     0             10
<!-- 
    一个索引一个值 叫做一个 元素 arr[0] = 10;
 -->

-----------------------------------

### 数组的创建
- js中创建数组有两种方式

- 1. 利用 new 创建数组
- 2. 利用数组字面量创建数组


### 创建数组对象 ---- 构造函数 new
> 创建数组
    var arr = new Array();

**注意:**
- 使用typeof检查下数组的类型, 会返回object
<!-- 
    console.log(typeof arr);    // object
 -->


> 构造函数 new 的初始化
- var arr = new Array(10, 20, 30);
- 创建数组时直接向里面添加了3个元素
<!-- 
    使用构造函数的方式也可以在创建的时候就指定数组中的元素，可以将要添加的元素作为构造函数的参数来传递，用逗号隔开 
-->

- 如果()中只有一个整数值时, 创建一个长度为该整数值的数组
<!-- 
    var arr = new Array(10);
    长度为10的数组
 -->


> 向数组中添加元素
- 语法：
    数组[索引] = 值
<!-- 
    arr[0] = 10;
    console.log(arr); 
-->


> 读取数组中的元素
- 语法：

    数组[索引];
    arr[0];
<!-- 
    如果读取不存在的索引，他不会报错而是返回undefined 
-->


> 数组的 length 属性
- length属性来获取数组的长度，也就是元素的个数
<!-- 
    最大索引(index)+1 就是元素的个数 
-->

- 语法：
    数组.length
<!-- 
    console.log(arr.length);        //3 
-->

- 对于连续的数组，可以获取数组的长度也就是元素的个数
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    arr[3] = 40;
    console.log(arr.length);    //4

- 但是对于非连续的数组，会获取到最大的索引+1
    arr[0] = 10;
    arr[1] = 20;
    arr[2] = 30;
    arr[3] = 40;
    arr[10] = 90;
    arr[30] = 100;

    //[10, 20, 30, 40, empty × 6, 90, empty × 19, 100]
    console.log(arr.length);    
<!-- 
    非连续的数组 会把中间的地方给你空出来，会留地方，所以尽量不要写非连续的数组 
-->


> 修改length, 也可以理解为修改数组的长度
- 如果修改的length大于原长度，则多出的部分会空出来
- 如果修改的length小于原长度，则多出的元素会被删除

    arr.length = 10;
    arr.length = 3;
<!-- 所以我们可以通过修改length来删除一些元素 -->


> 向数组的最后一个位置添加元素
- 语法： 
    数组[数组.length]=值；
<!-- 
    因为打印length时的值 比索引大1 比如最后一个索引是[3]，arr.length的值是4，把这个length的值作为索引数的话 就是最后一个位置 

    arr[arr.length] = 70;
    arr[arr.length] = 80;
    arr[arr.length] = 90;
-->    

-----------------------------------

### 创建数组对象 ---- 数组的字面量

> 使用字面量来创建数组
- 语法：

    var arr = [];


> 数组的初始化
- 使用字面量创建数组时，可以在创建时就指定数组中的元素
    var arr = [1,2,3,4,5,10]            
<!-- 
    在创建数组时，同时向数组内添加了6个元素，索引为1的值为1，索引为2的值为2,。。。。 
-->


> 数组内元素的类型
- arr = ["hello", 1, true, null, undefined]

- 可以是对象
<!-- 
    var obj ={
        name:"孙悟空"
    };

    //向它最后添加一个元素，是对象
    arr[arr.length] = obj;      

    //数组里放了3个对象
    arr = [
        {name:"孙悟空"}，
        {name:"猪八戒"}，
        {name:"沙和尚"}，
    ]  
 -->
                             

- 可以是个函数
<!-- 
    arr = [
        function(){},
        function(){},
        function(){}
    ]  
 -->
    

- 可以是个数组，这种数组叫做二维数组
<!-- 
    arr = [[1,2,3], [3,4,5], [4,5,6]];
    console.log(arr[0]);
 -->
    
> 想数组中新增元素
- 可以通过修改length长度 以及 索引号增加数组元素

-----------------------------------

### 数组的遍历
> 利用for循环来遍历数组中的元素。

    var arr = ["孙悟空","猪八戒","沙和尚"];

- 所谓的遍历数组，就是将数组中所有的元素都取出来
- arr.length 统计数组的长度
<!-- 数组的长度是元素个数, 不要跟索引号混淆 -->


> arr.length 可以动态监测数组元素的个数
<!-- 
    数组里面的元素怎么取出来呢？
    console.log(arr[0]);
    console.log(arr[1]);
    console.log(arr[2]);

    我们看下0123都是索引吧，都是从0开始的整数吧都是有规律的吧，
    arr是定的 最关键的是获取到索引

    for (i=o; i<10; i++) {
        //这是10次的for循环，0-9的整数是不是跟我们的索引的数字是一样的，
        console.log(arr[i]);      
    }

    写死了也不好，假如我在数组中添加或者增减元素时，还得同时改变i的值，要不有的输出不出来, 所以写死了不好，我们可以发现，

    当数组里面有4个元素的时候，i<4, 5个元素的时候，i<5, 
    所以我们能看出 这小于的是数组的长度, 所以我们要这么写
    for(i=0; i<arr.length; i++){
        console.log(arr[i]);
    }
 -->


> 数组.forEach()
- 数组的方法，一般我们都是使用for循环去遍历数组，js中还为我们提供了一个方法来遍历数组
<!-- 
    这个方法只支持ie8以上的浏览器,8以及以下的浏览器不兼容 
-->

- forEach方法需要一个函数作为参数

    forEach(回调);
    forEach(function(value, index, arr){ ... });

- 浏览器会在回调函数中传递三个参数
<!-- 
    第一个参数（value），   就是当前正在遍历的元素  ----  孙悟空
    第二个参数（index），   就是当前正在遍历的元素的索引  ----  0 1 2 3 4
    第三个参数（obj），     就是当前遍历的数组  -----  整个数组里的内容
 -->

- 像这种函数，由我们创建但是不由我们调用的，我们称为回调函数，浏览器调的回调函数是异步执行


> 执行原理:
- 我们数组中有几个元素，函数就会执行几次，每次执行时, 浏览器会将遍历到的元素以实参的形式传递进来我们可以来定义形参，来读取这些内容

-----------------------------------

### 数组的方法：
> push()
- 在数组的末尾添加多个元素

- 参数:
    - 直接写数组元素

- 返回值:
    - 为新的长度(可以创建新的变量 接受这个方法的返回值)

- 是否影响原数组:
    - 是
<!-- 
    arr.push("唐僧");
    var result = arr.push("唐僧");
 -->
    

> pop()
- 可以删除最后一个元素 一次删除一个

- 参数:
    - 没有参数

- 返回值:
    - 删掉的元素

- 是否影响原数组:
    - yes

<!-- 
    arr.pop(); 
    var result = arr.pop();
 -->
    
- 注意：
- 以上两个方法是向数组的末尾进行操作


> unshift()
- 在数组前面添加多个元素    
- 参数:
    - 直接写数组元素

- 返回值:
    - 新的长度(可以创建变量 接收这个方法的返回值)

- 是否影响原数组:
    - yes


> shift()
- 可以删除第一个元素，一次删除一个
- 参数:
    - 没有参数

- 返回值:
    - 删掉的元素

- 是否影响原数组:
    - yes

**注意:**
- 以上两个方法是向数组的前面进行操作


> slice()  
- 提取指定元素

- 参数:
    - 开始索引（包括）
    - 结束索引（不含）
    - 参数1不写 从0开始提取后面所有
    - 参数2为负值 代表从后往前


- 是否影响元素组:
    - no

- 返回值
    - 需要创建变量接收 提取的指定元素
<!-- 
    let arr = [1, 3, 5]
    let res = arr.slice(0, 2)
    console.log(res)
 -->

> 技巧
- 提取一个元素：
    两个参数为相邻： 0 1 和 1 2 和 2 3
    
- 正值 和 负值：
    0,-1    提取 从0开始到倒数第二个 留下最后一个 
  

> splice()
- 可以删除（插入 替换）数组中的指定元素，并将被删除元素作返为回值返回

- 参数:
    - 1. 开始位置（包含）
    - 2. 删除几个
    - 3. 传递新的元素，会插在开始索引的前面

- 返回值:
    - 删掉的元素(删除的元素也是在一个数组当中)

- 是否影响原数组:
    - yes

> 技巧
- 1. 我们经常会重数组中删除一个指定的元素 那就需要知道该元素在数组中的索引值
- 所以我们会使用 indexOf() 方法 它会返回该元素的索引值
<!-- 
    let arr = [1, 3, 5]
    let index = arr.indexOf(3)
    
    arr.splice(index, 1)
 -->

- 2. 删除指定元素：
- 第一个参数决定位置 第二个参数为1就是删一个

- 3. 插入元素
- 第二个元素为0（代表不删），第一个元素决定插入位置（前面）
<!-- 
    从头插入新的元素 arr.splice(0,0,"新的元素")  
 -->    

- 4. 替换元素：
- 可以删除的同时，添加新元素就起到了替换的效果 
- 原位置替换
<!-- 
    var result = arr.splice(0,1,"新插入的元素");
    console.log(result);
    console.log(arr);
 -->
    

> concat()
- 链接
- 可以连接两个或者多个数组，并将新的数组返回，不仅能传数组还能传元素

- 语法：
    arr.concat(arr2, arr3, "牛魔王", "铁扇公主");
    往arr中添加arr2 和 arr3 

- 参数:
    - 要连接的元素

- 返回值:
    - 连接后新的数组

- 是否影响原数组:
    - no


> join()
- 该方法可以将数组转换为一个字符串

- 参数:
    - 指定连接数组元素的符号
    - 它默认是使用，号连接的, 还可以输入 空串 或者 &

- 返回值:
    - 转换后的字符串

- 是否影响原数组:
    - no

- 语法：
    arr.join();   或者  arr.join("+");
<!-- 
    result = arr.join();
    console.log(result);        //把元素转换为字符串，连接来了
 -->
    
> 技巧
- 这个方法可以将2维数组 直接转换成字符串
<!-- 
    let arr = [[1,2], [3,4]]
    let res = arr.join()        // 1,2,3,4
 -->


> 数组.toString()
- 把数组转换为字符串, 逗号分隔每一项

- 参数:
    - 貌似没有

- 返回值:
    - 转换后的字符串

- 是否影响原数组:
    - no


> reverse()
- 翻转数组
- 该方法用来反转数组，前边的去后边，后边的去前面

- 参数:
    - 貌似没有

- 返回值:
    - 没有

- 是否影响原数组:
    - yes


> sort()
- 排序
- 可以用来对数组中的元素进行排序

- 参数:
    - 回调

- 返回值:
    - 没有

- 是否影响原数组:
    - yes

- 语法：
    arr.sort();
    console.log(arr);
        
**注意:**
- 如果是单位还可以, 双位会出现问题
- 默认按照unicode编码进行排序
<!-- 
    var arr = ["a","b","d","c"]

    arr = [3,4,2,11,5]      
    // 11在最前面了，
    即使对于纯数字的数组，排序使用sort排序，也会按照unicode排，所以对数字, 
    进行排序时，可能会得到错误的结果 
 -->
    
> sort(function(a, b){ return a-b or b-a})
- 我们可以在sort()中添加一个回调函数，来指定排序规则
- 回调函数需要定义两个形参

 
    浏览器会根据回调函数的返回值来决定元素的顺序
    
    如果返回一个大于0的值，则会交换位置
    如果返回一个小于0的值，则元素位置不变
    如果返回一个等于0的值，则认为两个元素相等，位置也不变
    
    return a-b;     升序排列          
    return b-a;     降序排列


> 定义排序规则
- 我们可以自己指定排序的规则
```js
var arr = [5,4,2,1,3,6,8,7];
arr.sort(function(a,b){
    if(a>b{
        return 1;

    }else if(a<b){
        return -1;
        
    }else{
        return 0;
    })
});

console.log(arr);
```

**注意:**
- 1. 元素数组为字符串的时候
- 方式1:
- 我们可以直接使用 sort()

- 方式2:
- 我们可以按照 字符串的length进行排序 但是 字符一样的时候 没办法
- (a, b) => a.length - b.length

- 方式3:
> str1.localeCompare(str2)
- 如果 str1 < str2 则返回-1
- 如果 str1 > str2 则返回 1
- 如果相当 则返回0 

```js
arr.sort((a, b) => {
  return b.localeCompare(a)
})
```

- vue里
```js
<li><button @click="changeSort(true)">升序</button></li>
<li><button @click="changeSort(false)">降序</button></li>

data() {
    return {
        list: ["abc", "zan", "bde", "cdf"],
    }
},

changeSort(flag) {
    flag
        ? this.list.sort((a, b) => a.localeCompare(b))
        : this.list.sort((a, b) => b.localeCompare(a))
} 
```



    

> indexOf()     根据元素 返回索引
- 数组中查找给定元素的第一个索引
- 返回值: 如果存在返回索引号, 如果不存在则返回-1
- 只返回第一个满足条件的索引号
<!-- 
    let arr = ['blue', 'red'];
    arr.indexOf('blue');
 -->

> lastIndexOf()     根据元素 返回索引
- 从后往前查找
- 返回值: 如果存在返回索引号, 如果不存在则返回-1

> 当有两个参数的时候
- 参数1: 表示查找的起始位置
- 参数2: 表示找要查找的元素


-----------------------------

### 对象(具体的事物)
- 现实生活中, 万物皆对象, 对象是一个具体的事物, 看得见摸得着的实物, 例如. 一本书, 一辆汽车, 一个人, 都可以是对象, 一个数据库, 一张网页, 一个与远程服务器的链接也可以是对象

<!-- 
    非对象      对象
    明星        周星驰

    女朋友      迪丽热巴
    班主任      咱班班主任

    苹果        这个苹果
    手机        小米手机
    游戏        刺激战场

    左列都是泛指的 右列才是具体的事物
 -->

- js中的对象, 是一组无序的相关属性 和 方法的集合, 所有的事物都是对象, 例如:字符串, 数值, 数组, 函数等


> 对象是由属性 和 方法组成的
- 属性: 事物的特征, 在对象中用属性来表示(常用名词)
- 方法: 事物的行为, 在对象中用方法来表示(常用动词)

<!-- 
        大小, 颜色, 重量                打电话, 发短信, 玩游戏

                            手机
            属性                                方法
 -->

> 为甚么需要对象
- 保存一个值的时候, 可以使用变量, 保存多个值(一组值)时, 可以使用数组, 如果要保存一个人的完整信息(体重 身高 年龄)
<!-- 数组也可以但是结构不清晰, 比如let arr = [128, 134] 这是什么? --> 

- js中的对象表达结构更清晰, 更强大
<!-- 
    let zsf = {
        age:128,
        height:154
    }
 -->


> js中的数值类型：

- String
- Number
- Boolean
- Null
- Undefined
<!-- 以上的五种为基本数据类型，以后我们看到的值只要不是上面的5种，都是对象 -->

- Object

> 基本数据类型的不足：
- 基本数据的类型都是单一的值，值和值之间没有任何的联系，但如果在js中表示人的信息，比如:姓名，性别，年龄，如果用基本数据类型怎么表示

        var name = "孙悟空"
        var gender = "男"
        var age = 18
        
- 数据类型也能表示人的信息，但是他们之间没有关系，互相都是独立的，并不是一个整体, 但将这三个数据，放到一个塑料袋里就成为一个整体了，塑料袋就是对象

- 装在一起，好处：关系明确，方便操作


> 对象属于一种复合的数据类型，在对象中可以保存多个不同数据类型的属性
- 对象的分类：
1. 内建对象
    - 由ES标准中定义的对象，在任何的ES的实现中都可以使用
    - 比如：Math String Number Boolean Function Object

2. 宿主对象
    - 由JS的运行环境提供的对象，目前来讲主要指由浏览器提供的对象
    - 比如：BOM（浏览器对象模型） DOM（文档对象模型）

3. 自定义对象
    - 由开发人员自己创建的对象，这个最难，从这个开始学习


### 变量, 属性, 函数, 方法的区别
> 变量和属性的相同点
- 都是存储数据的

> 变量和属性的不同点
- 变量 单独声明并赋值 使用的时候直接写变量名,   单独存在
- 属性 在对象里面 不需要声明, 使用的时候必须是  对象.属性

> 函数和方法的相同点
- 都是实现某种功能, 某件事

> 函数和方法的不同点
- 函数 单独声明, 并且调用的时候  函数名()       单独存在
- 方法 在对象里面 调用的时候     对象.方法()


### 创建对象的方式
> 对象字面量 创建对象
- 里面的属性或方法我们采取键值对的形式, 键: 属性名,  值: 属性值
- 多个属性或者方法中间用逗号隔开的
- 方法冒号后面跟的是一个匿名函数

    let obj = {
        uname: '张三疯',
        age: 18,
        sex: '男',

        sayHi: function() {
            console.log('hi~');
        }
    };


**注意:**
- 使用对象字面量可以在创建对象时，直接指定我们对象中的属性
- 属性名可以加引号也可以不加，但属性名太怪的话，要加上 引号
<!-- 
    'default-name': "sam"
 -->


> 使用对象
- 调用对象的属性, 采取 . 我们理解为 的, 

    对象名.属性名
    对象名[属性名]


- 调用对象的方法, 别忘记添加小括号

    对象名.方法名();


> new Object(); 创建对象
- 构造函数是专门用来创建对象的函数, 使用typeof检查一个对象时，会返回object

    var obj = new Object();     // 创建了一个空对象
<!-- 使用new关键字调用的函数，是构造函数constructor -->


> 添加属性语法：

    对象.属性名 = 属性值;

    var obj = new Object();

    obj.name = "孙悟空";    // 向obj中添加一个name属性
    obj.gender = "男";      // 向obj中添加一个gender属性
    obj.age = 18;           // 向obj中添加一个age属性

- 我们是利用 等号 = 赋值的方法 添加对象的属性和方法
- 每个属性和方法之间用 分号结束


> 读取对象属性 和 方法语法：
    
    对象.属性名

    obj.name;
    obj.gender;
    obj.age;

    obj.sayHi();

    console.log(obj.name);
<!-- 如果读取对象中没有的属性，不会报错，而是返回undefined -->


> 修改属性语法：

    对象.属性名 = 新值
    obj.name = "tom";


> 删除对象属性语法：
    delete obj.name

<!-- 
    如果输出：
    say；       //会是一个对象
    say();      //会是内部语句产生的结果
        
    如果函数内部没有return，输出时：
    say();      //会是内部语句产生的结果+undefined
 -->


> 使用工厂方法创建对象
- 工厂方法可以大批量创建对象

    function creatPerson(name, age, gender){

        // 在函数内部创建一个新的对象
        var obj = new Object();

        // 创建完新的对象后，向我们的新对象添加属性 
        obj.name=name;
        obj.age=age;
        obj.gender=gender;
        obj.sayName=function(){
            alert(this.name);
        }

        // 将新的对象返回
        return obj；
    }

    var obj2 = creatPerson("孙悟空",18,"男");      
    var obj3 = creatPerson("白骨精",16,"女");      
    var obj4 = creatPerson("蜘蛛精",18,"女"); 

> 利用工厂函数创建的对象的区别
- 使用工厂方法创建的对象，使用的构造函数都是Object, 所以创建的对象都是Object这个类型，就导致我们无法区分出不同类型的对象

-----------------------------

### 构造函数与原型
- class的概念是es6的时候提出的, 在以前的时候我们是通过构造函数 和 原型来做的

- 在典型的OOP的语言中(java), 都存在类的概念, 类就是对象的模板, 对象就是类的实例, 但是在es6之前 js中并没有引入类的概念

- es6是2015年的时候发布, 但是目前浏览器的js是es5版本, 大多数高版本的浏览器也支持es6, 但是只不过实现了es6的部分功能

- 在es6之前, 对象不是基于类创建的, 而是用一种称为构造函数的特殊函数来定义对象和他们的特征
<!-- 
    面向对象的主要思路
    就是把公共的部分抽取出来 抽成一个类 通过这个类来创建对象
 -->

> 创建对象可以通过以下的3种方式
- 1. 对象字面量
- 2. new Object()
- 3. 自定义构造函数

-----------------------------

### 构造函数 创建对象
- 前面的两种方式创建对象时, 一次只能创建一个对象, 里面很多的属性和方法是大量相同的, 我们只能复制, 因此可以利用函数的方法, 重复这些相同的代码, 我们就把这个函数称为 构造函数

- 为什么是构造函数?
<!-- 
    里面封装的不是普通的代码, 而是对象
 -->

- 构造函数封装的是一个对象 所以才叫构造函数？？？？？？？ 卧槽

> 构造函数:
- 是一种特殊的函数, 主要用来初始化对象, 即为对象成员变量赋初始值
- 它总与new运算符一起使用, 把我们对象里面一些相同的属性 和 方法抽象出来封装到函数里面
- 调用构造函数必须使用new
- 我们只要new Star() 调用函数就创建一个对象
- 属性和方法前 必须写this

>语法格式:
- 构造函数的首字母要大写
- 构造函数不需要 return 就可以返回结果

    function 构造函数名() {
        this.属性 = 值;         // this可以理解当前的意思 表示是哪个对象
        this.方法 = function() {};
    }

    new 构造函数名();           // 使用的使用要用new

<!-- 
    这里就相当于把公共部分抽取了出来, 然后通过实例来创建对象
    function Star(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.sing = function(sang) {
            console.log(sang)
        }
    };

    let ldh = new Star('刘德华', 18, '男');
    ldh.sing('冰雨');
 -->
    
- 对象的属性值可也是任何的数据类型, 能是对象也能是函数
<!-- 
    函数也可以成为对象的属性，如果一个函数作为对象的属性来保存，
    那我们称这个函数是这个对象的方法，调用函数就是说调用对象的方法（method）, 
    但是它只是名称上的区别，没有其它的区别 
-->

> new 关键字执行过程
- 1 当我们构造函数遇见new时候 会在内存中创建一个空的对象
- 2 this都会指向这个空的对象
- 3 执行构造函数里面的代码, 给这个空对象添加属性 和 方法
- 4 返回这个对象
<!-- new的最后会返回这个对象, 所以就不需要return了 -->

-----------------------------------

### 静态成员 实例成员
- js的构造函数中可以添加一些成员(构造函数中的属性和方法我们叫成员, 成员可以添加, 因为构造函数的本质就是一个对象 所以叫做添加成员把), 

- 可以在构造函数本身上添加, 也可以在构造函数内部的this上添加, 通过这两种方式添加的成员, 就分别称为静态成员和实例成员

> 静态成员
- 在构造函数本身添加的成为成为静态成员, 只能由构造函数本身来访问

> 实例成员:
- 在构造函数内部创建的对象成员成为实例成员, 只能由实例化的对象来访问


> 实例成员: 就是构造函数内部通过this添加的成员
<!-- 
    构造函数中的name age sing就是实例成员 他们都是通过this来添加的 
    添加到new时创建的实例对象身上
-->

- 实例成员只能通过实例化对象后 通过实例化的对象来访问
<!-- 
    name age sing 只能通过实例化的 ldh 来访问
    let ldh = new Star("刘德华", 18, "冰雨")
    console.log(ldh.name)
 -->

- 实例成员不能通过构造函数来访问
<!-- 
    console.log(Star.name)     // undefined
    不可以通过构造函数来访问实例成员
-->


> 静态成员: 在构造函数本身上添加的成员
<!-- 
    function Person(name, age) {
            this.name = name;
            this.age = age;

            Person.sex = 'erin';
        }

    let per1 = new Person('sam', 18)
    console.log(Person.sex)

    Person.sex = '男';        我在构造函数Star身上直接添加了一个成员
    这个sex就是一个静态成员, 它不是通过this添加的 而是直接在构造函数本身上添加的
 -->

- 静态成员只能通过构造函数来访问
<!-- console.log(Person.sex) -->

- 不能通过实例对象来访问
<!-- console.log(ldh.sex)   // undefined -->


> 在构造函数中 给实例对象添加 固定死的数据
- es5
<!-- 
    function Father() {
        this.name = "张三"
    }
 -->

- es6
<!-- 
    class Father {
        name = "张三"
    }
 -->

- 如果需要通过 实例对象的实参传递数据的话
- es5
<!-- 
    function Father(name, age) {
        this.name = name
        this.age = age
    }
 -->

- es6
<!-- 
    class Father {
        constructor(name) {
            this.name = name
            this.age = age
        }
    }
 -->

-----------------------------------

### 构造函数的问题
- 构造函数方法很好用, 但是存在浪费内存的问题

    function Star(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
        this.sing = function(sang) {
            console.log(sang)
        }
    };

    let ldh = new Star('刘德华', 18);
    let zxy = new Star('张学友', 19);


> 解析：
<!-- 
    当创建第一个实例对象的时候 new就开辟了一个空间name age sex还好简单的数据类型 
    但是 sing是个函数 函数也是对象 也就是说 它还要单独开辟一个空间用来存放这个函数对象

    zxy的实例对象也是一样需要单独开辟一个存放函数对象的空间, 而且, 这两个空间还是同一个功能的函数对象

    这就是浪费内存的问题

    ldh.sing === zxy.sing   // false   
    因为比较的是内存地址, 说明每一个空间都是独立的

    这样不好吧 因为功能是一样的, 你还单独开辟空间
 -->

-----------------------------------

### 构造函数原型 prototype
- 构造函数通过原型, 原型上的属性和方法都是所有实例对象所共享的
- js规定, 每一个构造函数都有一个prototype属性, 指向另一个对象, 注意这个prototype就是一个对象, 这个对象的所有属性和方法 都会被构造函数所拥有

- 我们可以把那些不变的方法, 直接定义在prototype对象上, 这样所有的对象的实例都可以共享这些方法

    function Star(name, age, sex) {
        this.name = name;
        this.age = age;
        this.sex = sex;
    };

    \\ 向构造函数的原型对象上添加方法
    Star.prototype.sing = function(sang) {
        console.log(sang);
    }

    ldh.sing('冰雨');
<!-- 
    原型对象的主要作用就是共享方法 不需要开辟新的内存空间 节约资源
 -->

> 一般情况下, 我们的公共属性定义到构造函数里面, 公共的方法我们放到原型对象上
<!-- 
    ldh.sing === zxy.sing   // true
 -->

> 整理要点:
- 1. 可以给在原型上的方法传递参数
- 2. 虽然是原型上的方法 但是因为是实例对象调用的 当中的this就会指向实例对象
<!-- 
    function Star(name, age) {
        this.name = name
        this.age = age
    }

    Star.prototype.sing = function(music) {
        console.log(`我会唱: ${music}`)
        console.log("this", this.name, this.age)
    }

    let p = new Star("刘德华", 18)
    p.sing("冰雨")
 -->

-----------------------------------

### 实例对象身上的 __proto__
- 实例对象都会有一个属性 __proto__指向构造函数的prototype原型对象, 
- 之所以我们对象可以使用构造函数prototype原型对象的属性和方法, 就是因为实例对象有__proto__原型的存在
<!-- 
    console.log(ldh);
    对象身上系统自动添加了一个__proto__ 指向我们构造函数的原型对象
 -->

> __proto__对象原型和原型对象prototype是等价的
    ldh.__proto__ === Star.prototype    // true

> 方法的查找规则:
- 首先先看ldh对象身上有没有sing方法, 如果有就执行这个对象上的sing方法
- 如果没有sing这个方法, 因为有__proto__的存在, 就去构造函数原型对象身上去查找sing这个方法

> __proto__ 不能赋值, 它只是指明了一条可以查找的线路

-----------------------------------

### constructor 构造函数
- 对象原型(__proto__)和构造函数(prototype)原型对象里面都有一个属性 constructor属性, constructor我们称为构造函数, 因为它指回构造函数本身
<!-- 
    实例对象__proto__
    构造函数prototype
            它们都指向了 构造函数本身
 -->

> constructor的作用
- constructor主要用于记录该对象引用于哪个构造函数, 它可以让原型对象重新指向原来的构造函数

<!-- 
    从构造函数上你能看出来他们两个是通过哪个构造函数创造出来的
    console.log(Star.prototype);
    console.log(ldh.__proto__);  

    这样能看的更明确一切
    console.log(Star.prototype.constructor);
    console.log(ldh.__proto__.constructor);  
 -->


> 很多情况下我们需要手动的利用constructor这个属性指回原来的构造函数
- 如果我们是以对象的形式修改了prototype的话(进行了对象的赋值操作), 我们必须手动的把constructor修改回去

<!-- 
    我们可以把一些公共的方法放到原型对象里面, 所以里面的方法可能不只有一个

    Star.prototype.sing = function() {
        console.log('我会唱歌')
    }
    Star.prototype.movie = function() {
        console.log('我会演电影')
    }

    console.log(Star.prototype.constructor);    
    console.log(ldh.__proto__.constructor);
        // 这是指向的还是原来的构造函数 Star

    这么添加的话方法有点多, 为什么不用对象的方式创建它们呢? 对象的结构比较清晰

    Star.prototype = {
        sing: function() {
            console.log('我会唱歌')
        }, 
        movie: function() {
            console.log('我会演电影')
        }
    }
    console.log(Star.prototype.constructor);    
    console.log(ldh.__proto__.constructor);
        // 此时指向的就不是原来的构造函数了, Object

    原因:
    Star.prototype是一个对象, 如果是通过 . 的形式 就是在这个对象里面添加新的方法 

    但是如果是Star.prototype = { }, 相当于把原先的给覆盖点了, 覆盖后里面就没有constructor这个属性了, 它被覆盖掉了 

    要是没有constructor的话就没办法指回Star了
    这时候我们就要手动的指回去, 这样
 -->

    Star.prototype = {

>       constructor: Star,      手动添加, 这样又指回构造函数

        sing: function() {
            console.log('我会唱歌')
        }, 
        movie: function() {
            console.log('我会演电影')
        }
    }

-----------------------------------

### 构造函数 实例 原型对象三者之间的关系

                Star.prototype
Star构造函数        ---- >          Star原型对象
      ↓                              prototype
                   < ----           
            Star.prototype.constructor
      ↓                                 ↑

            通过new创建了               ↗
            ldh实例对象         ldh.__proto__

-----------------------------------

### 原型：prototype(超哥对原型讲解)
- 我们所创建的每一个函数，我们的解析器都会向函数中添加一个属性prototype
<!-- 
    函数中也能添加属性？我们的函数也是一个对象，对象能干什么函数就能干什么 
-->
<!-- 
    function Person(){ }

    我们创建了一个函数，我们看看函数Person有没有prototype属性
    console.log(Person.prototype);      //[object Object] 还真有


    我们再创建个
    function Myclass(){ }

    看看Myclass中有没有这个属性
    console.log(Myclass.prototype);      //也有

    那么我们看看两个
    console.log(Mycalss.prototype == Person.prototype);     // false
 -->

- 总结：
- 每一个函数都有自己的prototype


> 这个prototype是干什么的呢？
<!-- 这个属性对应一个对象，这个对象就是我们的原型对象 -->

> 图解:
Myclass函数对象         原型对象（ox123）
prototype(ox123)   ↗              
<!-- 
    文字描述：
    我们可以理解为Myclass函数对象下面有个属性是prototype, 
    这个prototype的值为内存空间地址，链接这另一个对象的内存空间，这个另一个对象就是原型对象在函数对象中有一个属性，属性指向着原型对象，每个函数都用而且都是不一样的 
-->


> 构造函数的prototype属性
- 当我们的函数作为普通函数调用 这个prototype没有任何作用
- 当函数以构造函数调用时，

    function Myclass(){ ... }
    var mc = new Myclass();

- 以构造函数调用，就有了原型对象的概念
<!-- 现在是通过Myclass()函数创建了对象 mc -->
    console.log(Myclass.prototype);


> 实例对象的__proto__属性
- 用Myclass创建了一个对象叫做mc，Myclass函数有个属性叫做protptype，由于mc是由Myclass创建的, 所以mc里面也会有一个属性指向prototype，
- 换句话说mc里面有个隐含属性，也指向ox123, 这个隐含属性，我们可以通过__Proto__来访问该属性

<!-- 也就是说 实例对象可以通过 __proto__ 来访问 构造函数的原型对象 -->

- 我们用图和文字分别描述下上行的状态：
- 图1：
    Myclass函数对象                         原型对象（ox123）
    prototype      ox123       指向↗
                        
- 图2：
    实例对象 mc                  指向↗
    隐含属性        ox123

- 而且这个 mc.__proto__ == Myclass.prototype   // true
- 意味着它们指向了同一个对象


> 原型对象的作用
- 这个原型对象有什么用的，别忘了 这个原型对象包括我们的构造函数 包括我们的实例都能看见, 所以原型对象就相当于一个公共的区域，所有同一个类的实例 都可以访问到这个原型对象

- mc1 mc2 mc3 都可以访问到__proto__这个属性, 所以我们可以将对象中共有的内容，统一设置到原型对象中


> 查找属性和方法时, 会沿着原型链查找
- 所以当我们访问对象的一个属性或方法时，它会先在对象自身中寻找，如果有则直接使用，没有就去原型对象中寻找


> 总结：
- 以后再出现每一个类都需要用的属性或者方法，我们就添加到原型里, 
- 以后我们创建构造函数时，可以将这些对象共有的属性和方法，统一添加到构造函数的原型对象中，

- 这样不用分别为每一个对象添加，也不会影响到全局作用域，就可以使每个对象都具有这些属性和方法了

-----------------------------------

### 检查某属性是否在对象中
> '属性名' in 对象
- 返回的是布尔值, 如果对象中没有但是原型中有 也会返回ture 
<!-- console.log('name' in obj); -->

> 对象.hasOwnProperty("属性名")
- 检查该对象自身是否有这个属性 不会检查原型上的属性

-----------------------------------

### 原型链
- Star.prototype 是 Star构造函数的原型对象, 既然是对象那么就会有__proto__, 
- Star.prototype.__proto__它指向了另一个原型对象

<!-- 
    ldh实例对象 通过ldh.__proto__指向了Star.prototype

    Star.prototype原型对象通过Star.prototype.__proto__指向了Object.prototype
    Object.prototype原型对象通过Object.prototype.__proto__指向了null

    这就是原型链
 -->

- Star.prototype.__proto__ == Object.prototype
- Object.prototype.__proto__ == null


> js中的成员查找机制(规则);
- 当访问一个对象的属性(包括方法)时, 首先查找这个对象自身有没有该属性
- 如果没有就查找它的原型(也就是__proto__指向的prototype原型对象)
- 如果还没有就查找原型对象的原型(Object的原型对象)
- 依次类推一直找到Object为止(null)
<!-- 
    object对象的原型没有原型，如果在object原型中依然没有找到，则返回undefined, 一般2层就完事了  
-->

-----------------------------------

### 垃圾回收(GC)：

- 一个程序运行时间长了，也会产生垃圾，这些垃圾积攒过多程序的运行速度就会过慢,所以我们需要一个垃圾回收的机制，来处理程序运行过程中产生的垃圾

    var obj = new Object();
    obj = null
<!-- 
    这样就不会指向堆内存的对象，断开连接了，这样堆内存中就没有任何变量可以进行引用了 这个对象就不能进行任何操作了          
-->
                        

- 当一个对象没有任何的变量或属性对它进行引用，此时我们将永远无法操作该对象, 此时这种对象就是一个垃圾，这种对象过多会占用大量的内存空间，导致程序运行变慢, 所以这种垃圾必须进行清理

- 在js中拥有自动的垃圾回收机制，会自动将垃圾对象从内存中销毁, 我们不需要也不能进行垃圾回收操作

> 需要回收就要写上obj = null，这样浏览器才会识别出 该对象需要被回收

--------------------------------------- 

### 函数的调用方式
> 普通函数
    function fn() {
        console.log(111);
    }

    fn()


> 对象的方法
    let obj = {
        sayHi:function() {
            console.log(111);
        }
    }
    obj.sayHi();


> 构造函数
    function Star() { }
    new Star();

> 绑定事件函数
    btn.onclick = function() {}
    点击按钮调用


> 定时器函数
    这个函数是定时器自动1秒钟调用一次


> 立即执行函数
    (function(){})()
    自动调用

---------------------------------------

### this
- 解析器在调用函数时，每次都会向函数内部传递进一个隐含的参数
- 这个隐含的参数就是this，this是一个参数，跟ab没区别，只是浏览器传进来的


### this的指向
- this的指向在函数定义的时候是确定不了的, 只有函数执行的时候才能确定this到底指向谁, 一般情况的最终指向的是那个调用它的对象

- 定时器的this也是window, 因为window.setInterval()

> 根据的是调用的方式不同，this会指向不同的对象
- 1. 以函数形式调用，this永远是window
- 2. 以方法形式调用，this就是调用方法的那个对象
<!-- 
    obj.sayName();      //这个是调用的obj的方法，this指向的就是obj
 -->

- 3. 当函数以构造函数调用的时候，this就是那个新创建的对象
<!-- 
    在构造函数中的this指向对象实例 new的时候会创建空对象, 让this指向这个空的对象
-->

**注意：**
- 构造函数的原型对象中的this指向的是谁? 原型对象函数里面的this 指向的是 实例对象ldh
- this可以根据调用者的不同变成不同的值

> 总结:调用方式       this指向
- 普通函数调用        window
- 构造函数调用        实例对象(原型对象里面的方法也指向实例对象)
- 对象方法调用        该方法所属对象
- 事件绑定方法        绑定事件对象
- 定时器函数          window
- 立即执行函数        window

-----------------------------

### 改变函数内部 this 指向
- js中为我们提供了一些函数方法来帮我们更优雅的处理函数内部this的指向问题, 
- 常用的bind(), call(), apply()

> call(目标) 方法
- 它可以改变函数的this指向 让目标临时有这个方法 该函数中的this就指向这个目标
- 它可以调用函数


- 它的主要作用可以实现继承
    fun.call()
<!-- 
    let obj = {name: 'sam'}
    name = 'erin'


    function fn() {
        console.log(this);
        console.log(this.name);
    }

    fn()                // erin window
    fn.call(obj);       // sam  obj


    // 继承
    function Father(name, age) {
        this.name = name;
        this.age = age;
    }

    function Son(name, age) {

        // 这里要继承父类的属性, 使用call方法调用Father函数, 别忘记把this指向Son
        Father.call(this, name, age)
        // 把Father的函数调用过来 并且把this指向了Son
    }

    let son =new Son('刘德华', 18)

    解析: 
    我们实现化的是Son子构造函数, 把'刘德华' 18传递给了 Son中的name, age形参
    当我们读到 Father.call(this, name, age) 这句的时候 就会调用父构造函数

    我们调用的时候必须把Father中的this 修改为Son中this
 -->

- 参数：
    - 参数1： this 或者是 目标对象
    - 参数2： 数据
<!-- 
    参数2：
        我们传递的数据可以在函数的形参中被接收到
    function fn(a, b, c) {
        console.log(this.name)
        console.log(a,b,c)
    }
    fn.call(obj, "a", "b", [1,2,3])


    假如我们使用...args形参接收实参的话 我们传递的数据都会在数组中体现
    function fn(...args) { }   // ["a", "b", [1,2,3]]
 -->


> apply() 方法
- 用法跟call()一样 但是传递参数的时候必须要以数组的形式传递
- 在传递实参的时候 是字符串的形式拿到的就是字符串的形式, 是数组的形式拿到的就是数组的形式
- 返回值就是函数的返回值, 因为它就是调用函数

    fn.apply(o, ['pink']);

- 技巧:
- 我们可以利用apply 借助于数学内置对象求最大值
<!-- 
    let arr = [1, 66, 3, 99, 4];
    // 以前的话我们需要遍历数组

    Math.max.apply()
    Math.max是求数字中的最大值, 但是它求的是数字的 不是数组的 
    Math.max()

    Math.max.apply(null, arr)  我们可以写个空不需要改变this指向 
    写null也不太好, 就好让它指向函数的调用者, Math调用的吧 

    Math.max.apply(Math, arr)
    让它重新指回Math
 -->


> bind() 方法
- bind()方法不会调用函数, 但是能改变函数内部的this指向
- 把原函数改造完产生一个新的函数返回给我们 需要一个变量来接收

- 语法:
    fun.bind(thisAsg, arg1, arg2);
- 参数:
    thisAsg:    在fun函数运行时指定的this值
    arg1:       传递的其它参数

- 返回由指定的this值和初始化参数改造的原函数拷贝
<!-- 返回的是原函数改变this之后产生的新函数 -->
<!-- 
    fun.bind()改造完的原函数的拷贝, 把原函数改造完产生一个新的函数返回给我们

    let o = {
        name:'andy'
    }

    function fn() {
        console.log(this);
    }

    普通函数指向的是window, 我想让它指向o

    fn.bind(o);  给fn绑定bind这个方法,  它不会调用这个函数 只会改变this的指向 

    它会返回一个bind完新的函数
    let f = fn.bind(o);
    f();
 -->

> bind的应用
- 如果有的函数我们不需要立即调用, 但是又想改变这个函数内部的this指向此时用bind是最合适的

- 需求:
- 当我们有一个按钮, 当我们点击了之后, 就禁用这个按钮, 3秒钟之后开启这个按钮
```js 
    let button = document.querySelector('button');
    button.onclick = function(){
    
    // 事件函数的this指向的是btn
    this.disabled = true;

    setTimeout(function(){
        // 我能这么写么? 不能因为定时器函数this指向的是window
        this.disabled = false;  
    }, 3000)
    }

    // 以前的做法
    button.onclick = function(){
        // 以前我们的做法是
        let that = this;
        this.disabled = true;

        setTimeout(function(){
            that.disabled = false;  
        }, 3000)
    }

    // 高级做法
    button.onclick = function(){
        this.disabled = true;

        setTimeout(function(){
        
        // 现在我就想让定时器函数里面的this指向btn 同时定时器里面的函数并不是马上执行 所以我们选择bind(), bind()写在定时器的外面
            this.disabled = false;  
        }.bind(this), 3000)

        // 这个bind()是在定时器函数的外面, 这个this又是在button函数的里面, 这个this指向的就是btn

        setTimeout(funcion(){}.bind(button), 3000)
        // 给定时器函数绑定了一个bind方法, 它不会立即调用函数, 同时我让这个定时器函数里面的this 指向了btn 因为点了谁, 谁就是this, 说以bind(button) 里面不要写button 改成this
    }
```

### 总结 call apply bind总结
> 相同点
- 都可以改变函数内部的this指向

> 区别点:
- call apply会调用函数, 并且改变函数内部的this指向
- call和apply传递的参数不一样, call传递参数aru1 aru2形式, apply必须是数组的形式[args]

- bind 不会调用函数, 可以改变函数内部this指向

> 应用场景
- call经常做继承
- apply经常跟数组有关系的, 比如借助于数学对象实现数组最大值最小值
- bind 不调用函数, 但是还想改变this指向, 比如改变定时器内部的this指向
<!-- 定时器不需要我们调用 是每隔一段时间自动 改变this时 -->
        
-----------------------------

### 原型对象的应用 -- 扩展内置对象
- 可以通过原型对象, 对原来的内置对象进行扩展自定义的方法, 比如给数组增加自定义求偶数和的功能
- 数组里已经有了很多方法 比如翻转数组, 数组排序等 我们再添加一个求偶数和

<!-- 看看数组的原型对象中有什么样的方法 -->
console.log(Array.prototype);

<!-- 添加求和方法 -->
Array.prototype.sum = function() {
    let sum = 0;

    // 谁调用这个方法就是谁的length
    for(let i=0; i<this.length; i++) {
        if(this[i] % 2 == 0) {
            sum += this[i];
        }
        return sum;
    }
}

// 这个arr其实是new Array出来的 所以它可以使用原型对象中的方法
let arr = [1,2,3];
arr.sum();

> 注意:
- 数组和字符串内置对象不能给原型对象覆盖操作 Array.prototype = {}, 
- 只能是 Array.prototype.xxx = function(){}的形式

-----------------------------

### 当我们打印一个对象的时候 输出的是对象.toString()方法的返回值

function Person(name, age, gender){
    this.name = name;
    this.age = age;
    this.gender = gender;
}

<!-- 创建一个Person的实例 -->
var per = new Person("孙悟空"， 18, "男");

<!-- 这里有个问题，为什么打印per是[object Object] 而不是别的 -->
console.log(per);                         //[object Object]
console.log(per.toString());              //[object Object]

<!-- 
    有没有想过为什么输出的时候 输出的是 [object Object]
    当我们直接在页面中打印一个对象时，实际上是输出的对象的toString()方法的返回值 
-->

console.log(per); 和 console.log(per.toString());是一样的

<!-- 我们看看它是什么 -->
    var result = per.toString();
    console.log(result);
<!-- 
    结果是[Object Object]，为什么打印出来这么一个鬼玩意，就是因为toString()方法的返回值是它 
-->

<!-- Person里面也没有toString()哪来的？ -->
console.log(per.hasOwnProperty("toString"));    // false

<!-- 结果是 false，没有看看原型里面有没有 -->
console.log(per.__proto__.hasOwnProperty("toString"));

<!-- 也没有，看看原型的原型里有没有 -->
console.log(per.__proto__.__proto__.hasOwnProperty("toString"));    //true
<!-- 在这个原型里 -->

- 如果我们希望在输出对象时，不输出[Object Object]，可以为对象添加一个toString()方法
per.toString = function(){
    return "我是一个快乐的小person"
};

var result = per.toString();
console.log(per);
<!-- 结果是我是一个快乐的小person -->

<!-- 打印上面的也没有用啊，我希望在打印的时候能打印出来详细信息，比如： -->
Person[name=孙悟空，age=18，gender=男]
<!-- 可以 -->
per.toString = function(){
    return "Person["name="+this.name+",age="+this.age+",gender="+this.gender]"
};
<!-- 这样就能打印出具体信息了 -->

<!-- 那假如我现在再创建 -->
var per2 = new Person("猪八戒", 18， "男");
console.log(per2);      //结果还是[Object Object] 为什么呢？

<!-- 
    因为我的toString()添加到了per对象中，per2里没有所以这种修改只修改了一个对象 
-->
<!-- 
    我希望，所有person实例的toString都可以变, 这时候怎么办，是不是可以修改原型的toString, 修改： 
-->
Person.prototype.toString = function(){
    return "Person["name="+this.name+",age="+this.age+",gender="+this.gender]"
}

-----------------------------------

### 继承
- 比如我们在父类中已经写好了很多的方法, 在子类直接拿来使用继承父类的方法, 代码就会更简单
- 在es6之前并没有给我们提供extends继承, 我们可以通过 构造函数+原型对象 模拟实现继承, 被称为组合继承

- 要点：
> call()
- 调用这个函数, 并且修改函数运行时的this指向
    fun.call(thisArg, arg1, arg2...)
- 参数
- 1. thisArg: 当前调用函数this的指向对象
- 2. 后面的两个就是传递的普通参数


### 借用构造函数 继承父类型属性
- 核心原理:
- 通过 call() 把父类型的this改成子类型中的this, 这样父类中的this.name = name 中的this就是子类的this 也就相当于在子类中书写了this.name = name 是一样的

\\ 定义父构造函数
function Father(uname, age) {
    this.name = name;
    this.age = age;
}

\\ 定义子构造函数
function Son(uname, age, score) {
<!-- 
    现在我想让子构造函数使用父构造函数中的属性, 但是现在父 子构造函数并没有相连的关系 

    而且父 子构造函数中的this指向也不一样 
    父构造函数 指向 父构造函数的对象实例
    子构造函数 指向 子构造函数的对象实例 那子构造函数怎么才能拿父构造函数中的属性呢? 

    我们在这里把父构造函数调用过来 借用父构造函数

    我们把父构造函数当做一个普通的函数来调用 但是注意在父构造函数里面的this是父构造函数的实例对象, 子构造函数是指向子构造函数中的实例对象

    父构造函数里面的uname是在父构造函数身上的, 那么子构造函数想要使用父构造函数中的属性, 一定要把父构造函数的this改成子构造函数, 然后我就可以使用这个属性了

    现在就指向了自构造函数的实例对象
    还可以创建自己的属性
-->
    Father.call(this, uname, age);
    this.score = score;

}

let son = new Son('刘德华', 18, 100);
console.log(son);

**Father.call(this, uname, age);**
- 这种方式只能继承 实例 身上的属性和方法
<!-- 
    this.name = name
    this.age = age
    this.run = function 

    这些都是往实例身上添加的属性和方法 使用 .call(this) 的形式
    继承的都是this. 的属性和方法
 -->

- 要想继承原型链上的属性和方法需要下面的知识


### 借用原型对象 继承 父类型的方法
- 一些共有的属性 我们写在构造函数里面, 但是共有的方法 我们要写在原型对象上比较合适

\\ 定义父构造函数
function Father(uname, age) {
    this.name = name;
    this.age = age;
}

\\ 往父构造函数中添加方法
Father.prototype.money = function() {
    console.log(10000);
};

- 怎么样继承方法呢?
- 方式1： 这样可以么？
- Son.prototype = Father.prototype
<!-- 
    这么做是不行的, 这样直接赋值会有问题, 如果修改了子原型对象, 父原型对象也会同样被修改
 -->


- 这样做呢？ 可以
> Son.prototype = new Father();
<!-- 
    new Father() 相当于实例化了父构造函数

    new Father相当于创建了一个Father的实例对象, 这是Father实例对象 和 Father的原型对象不在一个内存机制里

    然后我又把 创建的Father实例对象 赋值给了 Son.prototype 相当于
    son构造函数 的 son原型对象 指向了刚才创建的Father实例对象

    Father的实例对象 能访问 Father原型对象里面的方法
    而son原型对象 也可以通过Father实例对象访问到 Father原型对象里面的方法
 -->


                Father.prototype
Father构造函数      ----- >        Father原型对象

        ↘                               ↑

    new Father()后创建了一个
    Father实例对象                  Father.__proto__

                    ↘           ↗

                    Father实例对象

                                ↖
               Son.prototype
Son构造函数      ----- >        Son原型对象


> 总结下:
\\ 定义父构造函数
function Father() {

};

\\ 向父构造函数的原型对象里添加方法
Father.prototype.sing = function() {
    console.log(1);
}

\\ 让子构造函数的原型对象指向Father的实例对象
<!-- 
    new Father()会创建一个Father的实例对象, 将这个实例对象的地址 给 Son构造函数的原型对象

    因为Father的实例对象可以访问到在Father原型对象身上的方法,
    而
    Son构造函数的原型对象和Father的实例对象又是一个 所以同样可以访问到Father原型对象身上的方法

    Son.prototype = Father的实例对象  指向  Father的原型对象
-->
    Son.prototype = new Father();

    function Son() {

    };
    let son = new Son();
    son.sing();

> 但是这么做同时会产生一个问题
    Son.prototype = new Father();
<!-- 
    上面这样做相当于:
    Son.prototype = {};

    这样就会把Son.prototype里面的东西覆盖掉, 所以Son.prototype里面就没有constructor了
    console.log(Son.prototype.constructor)  //Father

    这就是问题 按道理Son.prototype.constructor应该指向Son才对 因为是一个覆盖操作
 -->
    
- 如果利用对象的形式修改了原型对象, 别忘了利用constructor指回原来的构造函数

> 解决方案
- Son.prototype.constructor = Son


> 整理:
<!-- 
    function Father(name, age) {
        this.name = name 
        this.age = age
    }

    Father.prototype.sing = function() {
        console.log("hi")
    }

    function Son(name, age, gender) {
        Father.call(this, name, age)
    }

    Son.prototype = new Father()
    Son.prototype.constructor = Son
    let s = new Son("nn", 5)
    s.sing()
 -->

> 注意:Father的constructor要指向Father, Son的constructor要指向 Son

-----------------------------------

### 构造函数 和 对象的相互联系
- 构造函数 如Stars() 抽象了对象的公共部分, 封装到了函数里面 它泛指某一大类
- 创建对象 如new Stars() 特指, 某一个, 通过new关键字创建对象的过程我们称为对象实例化

- 构造函数: 泛指的某一大类, 它类似于java语言里的类
- 对象:     是一个具体的事物

- 我们利用构造函数创建对象的过程也成为对象的实例化
<!-- 
    比如: 按照汽车图纸生成的宝马汽车, 图纸就是构造函数, 宝马汽车就是对象实例
 -->
    
-----------------------------

### new 关键字执行过程
- 1 当我们构造函数遇见new时候 会在内存中创建一个空的对象
- 2 this都会指向这个空的对象
- 3 执行构造函数里面的代码, 给这个空对象添加属性 和 方法
- 4 返回这个对象
<!-- new的最后会返回这个对象, 所以就不需要return了 -->

-----------------------------

### 原型链的总结
- 首先我们要明确
- 函数（Function）才有prototype属性，对象（除Object）拥有__proto__。
- https://www.cnblogs.com/libin-1/p/5820550.html?ivk_sa=1024320u

-----------------------------

### for...in 遍历
- for...in用于对数组或者对象的属性 进行循环操作, 建议对对象使用
- 我们使用for in 里面的变量 我们喜欢用key 或者 k
    let obj = {
        name: '',
        age: 18,
        sex: '男'
    };

    for (let 变量 in 对象) {
        
    }

    变量:       属性名(键名)
    对象[变量]: 属性值(通过对象[键名]的形式获取元素)

> for...in 的特点
- 遍历数组
- 1. index索引为字符串型数字，不能直接进行几何运算
- 2. 遍历顺序有可能不是按照实际数组的内部顺序
- 3. 使用for in会遍历数组所有的可枚举属性，包括原型。例如上栗的原型方法method和name属性
所以for in更适合遍历对象，不要使用for in遍历数组

> for...in 变遍历整个原型链



### for...of ES6中的新语法
- 如果说for...in遍历的是数组的索引(键名)
- 那么for...of遍历的是数组的元素的值(直接就是属性值)

- 它适合遍历数组 字符串等 不能遍历对象

    for (let 变量 in 对象) {

    }

    console.log(变量);       // 属性值



-----------------------------

### 内置对象
- js中对象分为3中: 自定义对象, 内置对象, 浏览器对象
- 前两种对象是js基础内容, 属于ES, 第三个浏览器对象属于我们js独有的

- 内置对象
- 内置对象就是指JS语言自带的一些对象, 这些对象供开发者使用, 并提供了一些常用的或者最基本而必要的功能(属性方法等)


### 查阅文档
- MDN 学习一个内置对象的使用, 只要学会其常用成员的使用即可, 我们可以通过查文档学习, w3c和mdn 推荐使用MDN

- 查阅该方法的功能
- 查看里面参数的意义和类型
- 查看返回值的意义和类型
- 通过demo进行测试

-----------------------------

### Math对象
- Math数学对象 不是一个构造函数, 所以我们不需要new 来调用 直接使用即可

> Math.PI
- 圆周率

> Math.floor()
- 向下取整
- 往小了取值

> Math.ceil()
- 向上取整
- 有小数就进1

> Math.abs() 
- 可以用来计算一个数的绝对值
- 隐式转换 会把字符串型的-1 转换为数字型
- 如果不是数字型的 会是NaN
<!-- Math.abs('-1'); -->

> Math.round()
- 可以对一个数进行四舍五入 取整
- .5会往大了取 所以当为-1.5的时候 会取-1 而不是 -2 因为-1 比 -2大

> Math.random()
- 可以用来生成一个0-1之间的随机数 0-1之间 不会出现0 和 1

    生成一个0-10的随机数：
    Math.random()*10;

    生成一个0-x之间的随机数, 可以对结果四舍五入下，能取得包括0和10的0-10之间的随机数
    Math.round(Math.random()*x);

    生成一个x-y之间的随机数
    Math.round(Math.random()*(y-x))+x

    生成一个1-10之间的随机数，可以先生成0-9之间的数+1 这样最小数+1 等于1 最大数+1 等于10
    Math.round(Math.random()*9)+1;

    生成一个2-10之间的随机数
    Math.round(Math.random()*8)+2;



    得到一个两数之间的随机整数
    Math.floor(Math.random() * (max - min)) + min 

    得到一个两数之间的随机整数，包括两个数在内
    Math.floor(Math.random() * (max - min + 1)) + min
 -->
<!-- 
    function getRandom(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
 -->

> Math.max()
- 可以获取多个数中的最大值

> Math.min()
- 可以获取多个数中的最小值

> Math.pow()
- Math.pow(x,y) 返回x的y次幂

> Math.sqrt()
- 开方

-----------------------------

### Date对象 (日期对象)
- Date对象是一个构造函数, 必须使用new来调用创建我们的日期对象
- 在js中使用Date对象来表示一个时间
<!-- 
    let arr = new Array();
    new Array() 是一个构造函数, 数组是一个泛指的, 假如我要某一个数组 就得new一下
    new Object() 也就一个泛指的, 假如我们要创建一个实实在在的 那就new一下
 -->

> 使用Date对象
- 创建一个Date对象, 构造函数
    var date = new Date();
    alert(date);                // 当前时间 中国标准时间(系统时间)

- 如果没有输入任何参数, 返回系统的当前时间
<!-- 
    Sat Nov 20 2021 19:30:01 GMT+0900 (日本標準時)
 -->

- 如果输入参数 就是指定时间

- 参数常用的写法
- 数字型: 2019,10,01
- 字符型: '2019-10-1 08:08:08' or "12/03/2016 11:10:30"
<!-- 
    但是如果简写成12/03/16，会出现问题，有的浏览器会出现歧义
 -->

> new Date().toLocaleString();
> 时间对象.toLocaleString();        // 2021/11/20 19:30:45
- 当前系统时间:
- 格式:
<!-- 
    new Date();
    Fri Jun 04 2021 22:26:18 GMT+0900 (日本标准时间)

    new Date().toLocaleString();
    "2021/6/4下午10:27:55"

    new Date().toLocaleDateString()
    "2021/6/4"

    new Date().toLocaleTimeString()
    "下午10:27:29"
 -->


> 注意:
- 如果输入的是 数字型 
- 返回的是11月 不是10月 比实际月份大1
<!-- 
    let date = new Date(2019, 10, 1)
    console.log(date); 
    字符串型没有问题
 -->


> getFullYear();
- 该方法可以获取当前对象所封装的日期中的        年份。

> getMonth();   得到的月份要+1    getMonth()+1
- 该方法可以获取当前对象所封装的日期中的        月份（0-11）。
- 它会返回0-11的值，0是1月，11是12月

> getDate();
- 该方法可以获取当前对象所封装的日期中的        几号（1-31）。

    var d2 = new Date("12/03/2016 11:10:30");
    var date = d2.getDate();
    console.log("date = " + date);

> getDay();     周日是0
- 该方法可以获取当前对象所封装的日期中的        周几（0-6）。
- 它会返回0-6的值，0是周日，1是周1
    
    var d2 = new Date("12/03/2016 11:10:30");
    var date = d2.getDate();
    var day = d2.getDay();
    console.log("day = " + day);

> .getHours()       时
> .getMinutes()     分
> .getSeconds()     秒

> valueOf();
> getTime();
> +new Date();      常用
> Date.now();       不需要new了 H5新增 低版本的浏览器不支持
- 获取距离1970年1月1日开始到现在总的毫秒数(当前日期的时间戳);
- 指的是从格林威治标准时间的1970年1月1日，0时0分0秒, 到当前日期所花费的毫秒数
<!--
    从  1970年1月1日，0时0分0秒
    到  12/03/2016 11:10:30
    经过的毫秒数    1秒 = 1000毫秒

    时间的单位极乱，因为年可以理解为12进制，月是12进制，日是30进制，时是60进制，分秒毫秒, 所以就导致想在计算机里储存时间 特别麻烦，单位不统一

    所以统一转换为毫秒，为了好保存, 计算机底层在保存时间时使用的都是时间戳
-->

    let time = +new Date();
    var time = d2.getTime();
    console.log(time);          //time/1000/60/60/24/365
<!-- 它返回的是一串数字 -->
    
    var d3 = new Date("1/1/1970 0:0:0");
    time = d3.getTime();
    console.log(time);      //正常来讲的话应该是0 可是结果是 -28800000

<!-- 
    1/1/1970 0:0:0 这个时间是中国时间（中文系统），
    -28800000除完后正好是8小时，也就是时差 
-->


> Date.now()
- 获取时间戳
    time = Date.now();
    console.log(time);
<!-- 
    我们获取到了一个时间戳，这个时间戳是在3377代码执行时的时间戳，相当于在执行的时候 盖了一个章
-->
                                        

> 我们可以利用时间戳来干很多事情 - 测试代码的执行性能
    var start = Date.now();

    for(var i=0; i<100; i++){
        console.log(i);
    }

    var end = Date.now();
    console.log(end - start);
<!-- 
    我们来看看100次for循环用多长时间，我们可以在执行前获取一个时间戳在执行后获取一个时间戳我们再来做减法
-->


-----------------------------

### 函数
- 在js里面, 可能会定义非常多的相同代码或者功能相似的代码, 这些代码可能需要大量重复使用, 虽然for循环语句也能实现一些简单的重复操作, 但是比较具有局限性, 此时我们就可以使用js中的函数

- 就是封装了一段可被重复调用执行的代码块, 通过它可以实现大量代码的重复使用
<!-- 
    普通对象像一个塑料袋，只是一个容器，而函数对象可以封装一些功能（代码），在需要时可以执行这些功能（代码） 
-->

- 使用typeof来检查一个对象时，会返回 "function"
    
- 函数的使用分为两大步
- 声明函数
- 调用函数


> 创建一个函数对象（构造函数）：
- 语法:
    var fun = new Function();

- 可以将要封装的代码以字符串的形式传递给构造函数

    // 这个相当于把我们的代码，装到了字符串里
    var fun = new Function("console.log('hello,这是我的第一个函数')");

- 封装到我们函数中的代码不会立即执行，仅仅是存起来了, 函数中的代码，会在函数被调用的时候执行

- 调用函数
- 语法：
    函数对象()

- 当调用函数时，函数中封装的代码会按照顺序执行
<!-- 函数对象具有所有普通对象的功能 -->


> 创建一个函数（函数声明）：
- function 声明函数的关键字, 全部小写
- 函数是做某件事情, 函数名一般是动词 sayHi
- 函数不调用自己不执行

- 语法：
    function 函数名([形参1，形参2.....形参N]){
        语句。。。
    }

- 调用：
    fun2();


> 函数表达式
- 语法:
    let 变量名 = function() { ... };
    let fn = function() {};
<!-- 这个函数没有名字, fn是变量名, 它也称之为匿名函数 -->

- 函数表达式声明方式 跟 声明变量差不多, 只不过变量里面存的是值, 而 函数表达式里存的是函数

- 调用:
    变量名();


> 函数的封装的概念
- 就是把一个或者多个功能通过函数的方式封装起来, 对外只提供一个简单的函数借口
- 简单理解: 封装类似于将电脑配件整合组装到机箱中

-----------------------------

### 函数的参数

    function 函数名([形参1，形参2.....形参N]){
        语句。。。
    }

    fun2(实参1, 实参2.....);

- 在声明函数的小括号里面是形参
- 在函数调用的小括号里面是实参

- 我们可以在函数的()中来指定一个或者多个形参（形式上的参数，没有任和值，占地用）, 多个形参之间用逗号隔开，声明形参，就相当于在函数的内部声明了对应的变量, 但是并不赋值

- 在调用函数时，可以在()中指定实参（实际参数），实参将会赋值给函数中对应的形参


> 形参 和 实参的执行过程
    function sum(a, b){
        console.log(a+b);
    }
    sum(1,2);

- 代码读到function sum(){}这 不会执行, 会跳过到 sum()函数调用这
- sum(1,2)一调用再回头找function函数声明, 然后把实参传递给形参
- 然后再执行


<!-- 
    定义一个用来求 两个数和 的函数
    function sum(){
        console.log(1+1);
    }
    sum();

    function sum(a, b){
        console.log(a+b);
    }

    注意：
    调用函数时，解析器不会检查实参的类型，所以要注意，是否有可能会接受到非法的参数，如果有可能则需要对我们的参数的类型进行一个检查

    sum(123, hello);        //会拼串

 -->

> 如果实参的数量多于形参的数量，多余的实参不会被赋值
> 如果实参的数量少于形参的数量，则没有对应的实参的形参将是undefined
<!-- 解析器不会检查实参的数量 -->

-----------------------------

### 函数的返回值

    function cook(aru) {
        console.log(aru);
    }
    cook('大肘子')

- 其实把输出语句写在函数内部是不合理的, 写在函数内部就好比是厨师把大肘子自己吃了, 不合理把 按道理来说函数只是为了实现某种功能, 菜抄完了应该端给使用者

- 所以函数应该返回一个结果给调用者, 这么做才是合理的

- 在实际开发里面, 我们经常用一个变量来接受函数的返回结果

> return
- 有的时候, 我们希望函数将值返回给调用者, 此时通过使用return 语句就可以实现
- 只要函数遇到return 就把后面的结果 返回给函数的调用者

> 相当于 函数名() = return后面的结果
<!-- 将return后面的结果赋值给函数名() -->

- 语法：

    function 函数名() {
        return 需要返回的结果;
    }
    函数名();   // 把返回的结果给调用者(函数名())

<!-- return后面的值将会作为函数的执行结果返回 -->

<!-- 
    函数一般是用来返回结果的，并不需要函数做一些特殊处理, 在函数中return后的语句，都不会执行，因为结果已经被装进 return 值中了
-->

> return 终止函数
- return之后的代码不被执行

> return 只能返回一个值
- 返回的结果是最后一个值

    function fn(num1, num2) {
        return num1, num2;
    }
    console.log(fn(1,2));       // 2

- 如果想返回多个结果 可以利用数组

    return [num1+num2, num1*num2];

> 函数没有return 返回undefined

-----------------------------

### arguments --- 装实参的类数组
- 当我们不确定有多少个参数传递的时候, 可以用arguments来获取, 在js中, arguments实际上它是当前函数的一个内置对象, 所有函数都内置了一个arguments对象, arguments对象中存储了传递的所有实参

> arguments的使用

    function fn() {
        console.log(arguments)
        console.log(arguments[0] + arguments[1] + arguments[2])
    }
    fn(1,2,3);

<!-- 
    在调用函数时，浏览器每次都会传递进两个隐含参数
    1. 函数的上下文对象，this
    2. 封装实参的对象，arguments 
-->

> arguments是一个 伪 数组对象，不是数组 类似数组
<!-- 
    验证方法：
    console.log(arguments instanceof Array)     //false
    或者
    Array.isArray(arguments)                    //false 
-->

- 它也可以通过索引来操作数组，也可以获取长度
- 具有数组的length属性
- 按照索引的方式存储的
- 它没有真正数组的方法
- 在调用函数时，我们所传递的实参都会在arguments中保存
- 我们即使不定义形参，也可以通过arguments来使用实参

    arguments[0]        第一个实参
    arguments[1]        第二个实参


> arguments.callee
- 这个属性对应一个函数对象，就是当前正在执行的函数对象，调用谁, callee就是谁
<!-- 
    console.log(arguments.callee);      // 打印出了函数对象的整个内容 
-->

-----------------------------

### 函数的实参可以是任意值

创建一个函数，可以在控制台中输出一个人的信息
可以输出人的name，age，gender，address

    function sayHello(name,age,gender,address){
        console.log(name,age,gender,address)
    }
    sayHello("猪八戒", 28, 男, "高老庄");
<!-- 现在需要4个参数，参数太多了，当参数太多的时候容易乱 -->

    var obj = {
        name = "猪八戒",
        age = 18,
        gender = "男",
        address = "花果山"
    }


> 实参可以是任意数据类型，也可以是一个对象

- 当我们的参数过多时，可以将参数封装到一个对象，然后通过对象传递

    function sayhello(o){
        console.log(o.name,o.age,o.gender,o.address);
    }
    sayhello(obj);

- 形参那里是相当于定义了一个变量，o

    o.name
    o.age
    o.gender

- 实参那里传进去一个对象的内容，就相当于obj.name


> 实参既然可以是对象，那么实参还可以是个函数

    function fun(a){
        console.log("a = " + a );
    }
    fun(123);

- 接下来实参里面传递一个函数；
- fun(sayhello);          //我把实参传进去了，现在a相当于sayhello

<!-- 在开发的时候经常会用到，将一个匿名函数作为实参，传递给函数 -->

mianji()
- 调用函数
- 相当于使用的函数的返回值 eg：fun(mianji(10));

mianji
- 函数对象

<!-- 
    你要想你到底想要传函数本身，还是想传函数的返回值
    不加()就是函数对象，加了()就是函数的返回值 
-->

-----------------------------

### 立即执行函数
- 函数定义完，立即被调用，这种函数叫做立即执行函数，立即执行函数往往只会执行一次
    function(){
        alert("我是一个匿名函数");          //匿名函数会报错
    }

- 用一个括号用来圈起来一个函数，代表一个整体，直接写那会报错

    (function () {
        alert("我是一个匿名函数");  
    })

- 调用:
    (function(){
        alert("我是一个匿名函数");     
    })();

<!-- 
    上面的就是立即执行函数，往往只会执行一次, 假如上面的函数我只想调用一次，调用一次之后就丢了，这种函数假如我要是创建一个对象的话，有点亏了 
-->

- 上面的函数是立即执行函数, 
- 主要作用:创建一个独立的作用域

> 立即执行函数的两种写法
- (function(a){ ... })(1)
- (function(a,b){ ... }(1,2))

- 立即执行函数 也可以写函数名

> 立即执行函数的最大作用就是 独立创建了一个作用域
- 所有的变量都是局部变量, 函数执行完毕变量自动释放

-----------------------------

### 函数对象的方法：
- 让这个函数临时成为obj的方法
> call()
> apply()   ---- 传递实参时 必须以数组的方式

- 这两个都是函数对象的方法 需要通过函数对象来调用
- 当对函数调用call()和apply()时，都会调用函数 执行函数中的alert(this.name)
    
    function fun(){
        alert(this.name);
    }

> fun.call();
> fun.apply();

fun.call() fun.apply() fun()这三个效果都是一样的
- 都会调用函数 执行函数中的alert(this.name);

- 在调用call()和apply()时，可以将一个对象指定为第一个参数
- 此时这个对象将会成为函数执行时的this

    function fun(){
        alert(this.name);
    }

    var obj = {name:"obj"};
    var obj2 = {name:"obj2"};

    fun();              // object window
    fun.call(obj);      // object object
    fun.apply(obj);     // object object

<!-- 
    那么这个对象将会成为函数执行的this，换句话说，这个参数传的是谁，这个函数里面执行的this就是谁，
    传递的是obj，那么this指向的就是obj, 指定谁this就是谁

    这两个可以修改函数执行时的this 
-->


> call() 传递实参的方式
- call()方法可以将实参在对象之后依次传递

    function fun(a, b){
        console.log("a = " + a);
        console.log("b = " + b);
    }
    fun.call(obj, 2,3)
    <!-- 第一个参数是指定this，后两个是实参 -->


- apply()方法需要将实参封装到一个数组中统一传递
    
    fun.apply(obj, [2,3])         // 要把实参放到一个数组里


> 我们再来总结一下 this
1. 以函数形式调用时，this永远都是window
2. 以方法的形式调用时，this是调用方法的对象
3. 以构造函数的形式调用时，this是新创建的那个实例
4. 使用call和apply调用时，this是指定的那个对象

-----------------------------

### 作用域
- 通常的来说, 一段程序代码中所用到的名字并不总是有效和可用的, 而限定这个名字的可用性的代码范围就是这个名字的作用域
- 作用域的使用提高了程序逻辑的局部性, 增强了程序的可靠性, 减少了名字的冲突

- 简单的来说, 就是代码名字在某个范围内起作用和效果, 作用域指一个变量的作用的范围

- 作用域就分为两种

> 全局作用域
- 整个script标签, 或者 是一个单独的js文件
- 全局作用域中的变量都是全局变量, 在页面的任意部分都可以访问的到

<!-- 
    全局作用域在页面打开时创建，在页面关闭时销毁, 在全局作用域中，有一个全局对象window，它代表的是一个浏览器窗口, 它由浏览器创建我们可直接使用 
-->

- 在全局作用域中：
- 创建的变量都会作为window对象的属性保存
- 创建的函数都会作为window的方法来保存
<!-- 
    var a = 10;
    console.log(a);         //这个a是保存在window的属性里
    console.log(window.a)   //我们来试一下，看看能不能打出 10

    function fun(){
        console.log("我是fun函数");
    }
    window.fun();
    window.alert(); 
-->


> 局部作用域(函数作用域)
- 在函数内部就是局部作用域 这个代码的名字值在函数内起效果和作用
- 如果全局作用域像一个学校的话，那么函数作用域就相当于一个个的班级
<!-- 
    function fn() {
        // 局部作用域
    }
 -->

<!-- 
    调用函数时创建函数作用域，函数执行完毕后，函数作用域销毁, 每调用一次函数就会创建一个新的函数作用域，它们之间相互是独立的

    班级中可以访问到全局作用域里的变量, 在全局作用域中无法访问到函数作用域的变量 
-->

-----------------------------

### 变量的作用域
- 在js中 根据作用域的不同, 变量可以分为两种
- 全局变量:  在全局作用域下的变量, 在全局在都可以使用
<!-- 在函数内部没有声明 直接赋值的变量也是全局变量 -->

- 局部变量:  在局部作用域下的变量, 或者在函数内部的变量就是 局部变量, 局部变量只能在函数内部使用
<!-- 函数的形参也是局部变量 -->

- 从执行效率来看全局变量和局部变量:
- 1 全局变量 只有浏览器关闭的时候才会销毁, 比较占内存资源
- 2 局部变量 当我们程序执行完毕后就会销毁, 比较节约资源

-----------------------------

### 作用域链 (查找变量的规则)
- 只要是代码就有作用域
- 写在函数内部的就是局部作用域
- 如果函数中还有函数, 那么在这个作用域中就又可以诞生一个作用域

- 根据在内部函数可以访问外部函数变量的这种机制, 用链式查找决定哪些数据能被内部函数访问, 就称作作用域链
<!-- 
    let num = 10;
    function fn() {              // 外部函数
        let num1 = 20;

    function fn2() {            // 内部函数
            console.log(num1);      // 内部函数可以访问外部函数的变量
        }
    }
 -->

> 总结: 内部函数访问外部函数的变量, 采取的是链式查找的方式来决定取哪个值, 这种结构我们称为作用域链 --- 就近原则
- 一层一层依次向外层查找

<!-- 
    多个上下级关系的作用域形成的链，它的方向是从下向上或者从内到外, 查找变量时就是沿着作用域链来查找的 
-->

- 最外层的可以叫做0级链


> 变量的查找规则
- 当在函数作用域中，操作一个变量时，会先在自身的作用域中寻找，如果有就直接使用
    如果没有就向上一级进行寻找，注意是上一级，直到找到全局作用域
    如果全局作用域也没有会报错

- 在函数中要访问全局变量可以使用window对象

- 在函数作用域中也有声明提前的特性
    使用var关键字声明的变量，会在函数中所有的代码执行之前被声明
    函数声明也会在函数中所有的代码执行之前执行

-----------------------------

### 预解析
- js代码是由浏览器中的js解析器(引擎)来执行的, js解析器在运行js代码的时候分为两步:
- 预解析
- 代码执行

> 预解析:
- js引擎会把js里面所有的var 还有 function 提升到 当前作用域 的最前面
- 预解析分为 变量预解析(变量提升) 和 函数预解析(函数提升)

**注意：**
- 提升按照书写顺序提升 不分变量 和 函数提升的优先级的问题

>变量提升:
- 就是把所有的变量声明提升到当前的作用域的最前面 只提升声明 不提升赋值
<!-- 
    console.log(num)    //undefined
    var num = 10;

        ↓
    
    var num;
    console.log(num);
    num = 10;
 -->
<!-- 
    fun();                  // 报错 fun不是一个函数
    var fun = function() {
        console.log(22);
    }

        ↓
    
    var fun;
    fun();
    fun = function() {
        console.log(22);
    }
 -->

> 函数提升
- 就是把所有的函数声明提升到当前作用域的最前面, 不调用函数
<!-- 
    fn();
    function fn() {
        console.log(2);
    }
    
        ↓
    
    function fn() {         // 把整个函数声明提升到作用域的最前面
        console.log(2);
    }
    fn();
 -->

> 代码执行:
- 按照代码书写的顺序从上往下执行

> 案例:
<!-- 
    f1();
    console.log(c);
    console.log(b);
    console.log(a);

    function f1() {
        var a=b=c=9;
        console.log(a);
        console.log(b);
        console.log(c);
    }

        ↓
    // 函数先提升到最前面
    function f1() {             
        var a=b=c=9;
        // 相当于: var a = 9;  b = 9;  c = 9;

        // 如果想多个赋值的话: var a = 9, b = 9, c = 9

        console.log(a);
        console.log(b);
        console.log(c);
    }
    f1();
    console.log(c);
    console.log(b);
    console.log(a);         // 报错  函数内部的变量访问不到会报未定义的错
 -->

-----------------------------

### 基本包装类型

    let str = 'andy';
    console.log(str.length);

> 思考:
- 为什么会有str.length的属性, 前面说过, 只有复杂的数据类型才有 属性和方法
- 简单数据类型为什么length属性呢?

> 基本包装类型: 就是把简单数据类型 包装成为了 复杂数据类型
- 简单的两行代码 其实内部进行了如下的操作
<!-- 
    // 包装的类型

    let str = 'andy';
    console.log(str.length);

    // 1把简单数据类型包装为复杂数据类型
    let temp = new String('andy');
    
    // 把临时变量的值 给str 这样str就变成复杂数据类型就有属性和方法了
    str = temp;

    // 销毁临时变量
    temp = null;
 -->

- 在js中为我们提供了三个包装类，通过这三个包装类可以将基本数据类型的数据转换为对象, 三个包装类都是什么呢？

> String()
- 可以将基本数据类型的字符串转换为String对象
    var str = new String();


> Number()
- 可以将基本数据类型的数值转换为Number对象
    var num = new Number();
    
> Boolean()
- 可以将基本数据类型的布尔值转换为Boolean对象
    var bool = new Boolean();

    var num = new Number(3);
    var num2 = new Number(3);
    var str = new String("hello");
    var str2 = new String("hello");
    var bool = new Boolean(true);

<!-- 
    注意：
    我们在实际应用中不会使用基本数据的对象, 因为在用基本数据类型的对象，做比较时会带来一些不可预料的结果 

    既然不让我们用，它们有什么用呢？ 浏览器底层自己会用
    方法和属性只能添加给对象，不能添加给数据类型
-->
 
-----------------------------

### 字符串不可变
- 指的是里面的值不可变, 虽然看上去可以改变内容, 但是其实是地址变了, 内存中新开辟了一个内存空间
- 因为我们的字符串的不可变所以不要大量的拼接字符串

    let str = 'andy';
    console.log(str);   // andy

    str = 'red'
    console.log(str)    // red
<!-- 
    上面看上去虽然字符串值发生了变化 实际上在重新赋值为red时, 是新开辟了一个块空间, str指向了这个空间, 而andy还是在的

    所以不要大量的对字符串进行重新赋值, 也不要大量拼接字符串, 因为都会开辟新的空间
 -->

-----------------------------

### 字符串对象
- 字符串的所有方法, 都不会修改字符串本身(字符串是不可变的), 操作完成后会返回一个新的字符串

> str.length属性：
    可以获取字符串的长度


> str[index]
- H5 IE8+支持, 和charAt()等效


> str.charAt(index)：
- 根据索引返回指定位置的字符
    eg：
    str = "hello,Atguigu";
    var result = str.charAt(0);

    //索引为0的元素上面的式子还可以这么写
    var result = str[6];
    console.log(result);         //h


> str.charCodeAt(index)
- 根据索引返回指定位置的字符的ASCII编码
- 我们键盘上的每一个键位都会对应一个ASCII码 我们可以判断用户按了哪个键
    var result = str.charCodeAt(0);  //72


> String.fromCharCode()
- 可以根据字符编码去获取字符, 这个方法是构造函数对象的 得通过构造函数对象取调用
- 表示16进制的时候要以0x开头, 另外它可以获取Unicode编码中的字符，跟我们之前的var 没关系
    
    result = String.fromCharcode(72);
    console.log(result);            //H


> str.indexOf()
- 可以检索一个字符串中是否含有指定内容
- 如果字符串中含有该内容，则会返回第一次出现的索引, 如果没有找到指定的内容则返回 -1

- 还可以传递第二个参数
- 指定开始查找的位置，("h",7) 从第7个位置开始查找h 不包括这个位置

    str = "hello atguigu";
    result = str.indexOf("h");      //我要看看str字符串中有没有h的字符
    console.log(result);


> str.lastIndexOf()
- 该方法的用法跟indexOf一样，不同的是indexOf是从前往后找, 而lastIndexOf是从后往前找
- 可以传递第二个参数，来决定开始查找的位置


> str.slice()
- 可以从字符串中截取指定的内容， 不影响原数组，而是将截取到的内容返回
- 第一个参数是开始的索引，包括开始
- 第二个参数是结束的索引，不包括结束
- 第二个参数省略的话 就是从1开始的全部
- 第二个参数如果是负数的话，将会从后边计算
 
        str = "abcderrtg";
        result = str.slice(0,2);

        console.log(result);        //（1,2）就是b


> str.substring()
- 可以用来截取一个字符串，和slice类似
- 第一个参数是开始的索引，包括开始
- 第二个参数是结束的索引，不包括结束
- 第二个参数省略的话 就是从1开始的全部

<!-- 
    不同的是：
    这个方法不能接受负值，如果传递了一个负值，则默认使用0
    他会自动调整参数的位置，如果第二个参数小于第一个，则自动交换
    （1， 0） 自动交换 （0，1） 
-->
   
        result = str.substring(0,2);
        console.log(result);            //ab


> str.substr()      --- 重点
- 用来截取字符串，对原数组没有影响
- 参数
    1，截取开始位置的索引
    2，截取的长度


> str.concat()
- 可以连接两个或者多个字符串 作用和 + 一样
- 对原字符串不会产生影响
    
    result =  str.concat("你好")
<!-- 什么意思？把我们的str和你好拼一起 -->


> str.replace('被替换的字符', '替换为的字符')
- 替换(和删除)
- 可以将字符串中指定的内容替换为新的内容
- 参数
- 第一个参数：被替换的内容（正则选中的部分）
- 第二个参数：新的内容

> 默认只会替换第一个，设置为正则表达式后 修改为全局匹配模式g
- 空串是删除

    str = "hello abc hello abc aec afc"
    result = str.replace("/a/gi", "@_@");

> arr.join()    将数组转为字符串
> str.split()   将字符串转为数组
- 可以将一个字符串拆分为一个数组
- 当发现字符串中有一个定的规律，比如下面的 都是用逗号隔开的

- 参数
    需要一个字符串作为参数，将会根据该字符串去拆分数组

    var str = "abc,bcd,efg,hij";
    result = str.split(",");        //根据，来拆分数组

    console.log(result);

- 如果不传递参数则整个字符串会被转成一个数组
    

> toLowerCase()
- 把字符串转换为小写, 并返回 不会影响到原字符串
  
        str = "abcffsdf"
        result = str.toLowerCase();
        console.log(result);


> toUpperCase()
- 把字符串转换为大写, 并返回 不会影响到原字符串

-----------------------------

### 正则表达式 (它也是一个对象)

- 用于定义一些字符串的规则，我们的计算机可以根据正则表达式，来检查一个字符串是否符合规则, 或者将字符串符合规则的内容提取出来
- 正则表达式是一个对象，所以第一步我们要创建正则表达式的对象

> 正则表达式的作用
1. 验证表单
    - 用户名表单只能输入英文字母, 数字 或者下划线 昵称输入框中可以输入中文
    - 密码框的位数限制 6-16位
2. 过滤掉页面内容中的一些敏感词(替换)
3. 从字符串中获取我们想要的特定部分(提取)等
    - 比如搜索框 输入两个字 提取相关信息


> 正则表达式的特点
- 灵活性, 逻辑性 功能性非常的强
- 可以迅速的用极简单的方式达到字符串的复杂控制
<!-- 
    验证邮箱的正则表达式
    ^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$

    验证用户名
    /^[a-z0-9_-]{3,16}$/
 -->

### 创建正则表达式的二种方式
- 正则表达式里面不需要加引号, 不管是数字型还是字符串型

    let reg = /123/;
    let reg = /今天天气真不错/


> var reg = new RegExp(/正则/);
- 通过构造函数的方式来创建正则表达式

    var reg = new RegExp("a");
    var str = "a";

- 语法：
    var 变量 = new RegExp("正则表达式", "匹配模式");
<!-- 严格区分大小写，内容要被""包起来 -->

- 在构造函数中可以传递一个匹配模式作用第二个参数
    可以是：
    i   忽略大小写
    g   全局匹配模式
<!-- 
    找这个字符串中有没有a，并且忽略大小写
    var reg = new RegExp("a");
    var reg = new RegExp("a", "i");
 -->


> var reg = /正则/
- 通过字面量来创建正则表达式
- 语法：
    var 变量 = /正则表达式/匹配模式（ig）
    var reg = /a/i;    ==   var reg = new RegExp("a", "i");

<!-- 
    使用字面量创建更加简单，但是使用构造函数创建更加的灵活
    使用构造函数创建，因为它里面传递的是字符串，所以可以传递变量，查找变量更加灵活 而 使用字面量，字面量没办法变化，相当于写死了 
-->


> 正则表达式参数
- 有三种值

- g :   全局匹配
- i :   忽略大小写
- gi:   全局匹配 + 忽略大小写



> 正则对象.test('字符串')
- 创建一个正则表达式检查一个字符串中的情况

    var reg = / /
    reg.test()  


> 正则对象.exec("字符串")
- 返回匹配的字符串
- 返回一个数组 找不到的话返回null

- 数组中第一个元素是 与正则表达式相匹配的文本
- 数组中第二个元素是 正则表达式的第 1 个子表达式相匹配的文本（如果有的话）

- 当我们使用()进行分组的时候 我们匹配的结果会体现在数组的的一个个元素上
<!-- 
    let reg = /<a href="(.*)">(.*)<\/a>/igs
    这就是两个组 () ()

    我们在获取结果的时候就是 res[1] res[2]
 -->
- 


### 正则表达式的组成
- 一个正则表达式可以由简单的字符构成, 比如/abc/ 也可以是简单的特殊字符的组合, 比如/ab*c/, 其中特殊字符也被称为元字符 


> 边界符
^           表示匹配行首的文本(以xx开始)
$           表示匹配行尾的文本(以xx结束)


> 字符类
[]          有一系列字符可供选择, 只要匹配其中一个就可以了
    let reg = /[abc]/; 
<!-- 只要是包含有a或者包含有b或者包含有c -->

    reg.test('andy')        // true
    reg.test('baby')        // true
    reg.test('color')       // true

    reg = /^[abc]$/
<!-- 比如是以a开头以a结尾, 或者以b开头以b结尾, 或者以c开头以c结尾 -->


> 范围
[A-z]       当中的任意字符
[0-9]       任意数字


> 字符组合
[A-Za-z0-9]


> 内部取反
[^ ]        除了    [^ab] 除了ab 检索其它 或者理解为 除了括号里的东西都可以


> 量词符
- 量词符用来设定某个模式出现的次数
- 使用量词的时候中间不要有空格

*           重复零次或更多次
<!-- 
    - 相当于 >= 0, 可以出现0次或很多次
    - eg:   reg= /^a*$/     允许a出现0次或很多次
    - reg.test('');         // true
    - reg.test('a');        // true
    - reg.test('aaaa');     // true
 -->
   
+           重复一次或更多次
<!-- 
    - 相当于 >= 1, 可以出现1次或很多次
    - eg:   reg= /^a*$/     允许a出现0次或很多次
    - reg.test('');         // false
    - reg.test('a');        // true
    - reg.test('aaaa');     // true
 -->

?           重复零次或一次
<!-- 
    - 相当于 1 || 0
    - reg.test('');         // true
    - reg.test('a');        // true
    - reg.test('aaaa');     // false
 -->

{n}         重复n次
<!-- 
    {3}     就是重复3次
    - reg.test('');         // false
    - reg.test('a');        // false
    - reg.test('aaa');      // true
 -->

{n,}        重复n次或更多次
<!-- 
    {3,}    大于等于3
 -->

{n,m}       重复n到m次
<!-- 
    {3,16}  大于等于3 并且 小于等于16
 -->


> 括号总结
- [ ]       字符集合 匹配方括号中的任意字符     a || b || c   [abc]
- { }       量词符 里面表示重复次数

- ( )       表示优先级
<!-- 
    let reg = /^abc{3}$/
    str = abccc

    let reg = /^(abc){3}$/
    str = abcabcabc
 -->


> 预定义类
- 预定义类指的是某些常见模式的简写方式

\w          任意字母和数字和_       [A-z0-9_]
\W          除了字母 和 数字 和 _   [^A-z0-9_]

\d          任意数字                [0-9]
\D          除了数字                [^0-9]

\s          空格(包括换行符 制表符 空格符) 相当于 [\t\r\n\v\f]
\S          除了空格                [^\t\r\n\v\f]

\b          单词边界
\B          除了单词边界



> 转义字符
- 创建一个正则表达式检查一个字符串中是否含有 . 

    var reg = /./;                  
<!-- 
    //var reg = /\./;   要加上转义字符
 -->
    console.log(reg.test("."));

<!-- 
    需要注意的是, 假如用构造函数创建的话
    reg = new RegExp("\.");
    console.log(reg);       //结果就是一个. 没有\
    
    总结，字面量里有转义字符一个\就可以，但是构造函数中得是\\ 
-->

> 单词边界
- 创建一个正则表达式检查一个字符串中是否含有单词child

    reg = /child/
    console.log(reg.test("child"));     //true
        
    reg = /\bchild\b/
    console.log(reg.test("hello children"));
<!-- 只能找child这个单词 -->


> /指定字符(?=空格n)/
- 匹配紧跟n的指定字符
<!-- 
    <p>this is all ok this</p>

    let reg = /is(?= all)/;
    let res = pStr.match(reg)       // is
 -->

> /指定字符(?!空格n)/
- 匹配没有紧跟n的指定字符
<!-- 
    <p>this this all ok this</p>

    let reg = /this(?! all)/g;
    let res = pStr.match(reg)    // ['this', 'this']
 -->


> 对目标文本后面的情况作为条件
    // 查找abc 条件是abc的后面是d
    let reg1 = /abc(?=d)/g

    // 查找abc 条件是abc的后面不是d
    let reg2 = /abc(?!d)/g


> 对目标文本前面的情况作为条件
    // 查找d 条件是d的前面是abc
    let reg3 = /(?<=abc)d/g

    // 查找d 条件是d的前面不是abc
    let reg4 = /(?<!abc)d/g


-----------------------------

https://c.runoob.com/front-end/854

### 正则的小练习:
> 案例 用户名的验证 

    let reg = /^[a-zA-Z0-9_-]$/;
<!-- 
    这个模式勇士孰能输入英文字母 数字 下划线 短横线但是有边界符 和 []
    这就限定了只能 出现1次

    reg.test('a')       // true
    reg.test('1')       // true
    reg.test('18')      // false
 -->

- 所以我们可以使用量词 让这个模式出现的次数是6-16之间 这样就能匹配多个字符
    let reg = /^[a-zA-Z0-9_-]{6,16}$/;
<!-- 
    reg.test('aaasdf'); // true
 -->


> 案例 验证座机号码
- 座机号验证: 全国座机号 两种格式
    010-12345678
    0530-1234567

    let reg = /^\d{3}-\d{8}|\d{4}-\d{7}$/;


> 案例 验证手机号
- 创建一个正则表达式，用来检查一个字符串是否是一个合法手机号
- 手机号规则：
    1. 1 3 5670123
    2. 以1开头
    3. 第二位为3-9的任意数字
    4. 3位以后任意数字

    var phoneStr = "135670123"
    var phoneReg = /^1[3-9][0-9]{9}$/;
    console.log(phoneReg.test(phoneStr));


> 案例 验证邮箱：
-电子邮件：

    hello@abc.com.cn

任意字母数字下划线   .任意字母下划线   @   任意字母数字   .任意字母（2-5位）   .任意字母（2-5位）

<!-- 
    /\w+\.\w*@\[A-z0-9]+\.\w{2,5}(\.\w{2,5})?/g

    ^\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$      //^$不要省略

    var emailReg = /\w{3, }(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}/
    var email = "hello@abc.com.cn";
    console.log(emailReg.test(email));
 -->


> 案例 去除空格
- 接收一个用户输入
    var str = prompt("请输入你的用户名");

去除字符串中的多余空格：使用空串来替换掉空格 替换的str.replace();

    str = "     hello     ";
    str.replace(/\s/, "");
<!-- 这样不行 输出str不会有变化，因为不会影响到原字符串 -->

    str = str.replace(/\s/, ""); 
<!-- 要把值再重新的赋回去 -->

    console.log(str);
<!-- 就替换掉了一个空格 要加上g 才是全局匹配模式(/\s/g, "") -->

- 假设有些空格我们不想删掉
    str = "     he llo     ";
    str = str.replace(/^\s*|\s*$/g, "");



> 案例: 将is前面的this选中 修改字体颜色为pink
- 思路:
- 我们先利用正则把符合条件的文本选中 并且替换成带标签的样式 replace()
- 然后利用正则把目标文字选中 配合replace()替换到指定位置
- 最后把修改好的内容重新插入到标签中
<!-- 
    <p>this is all ok this</p>

    let p = document.querySelector('p');

    // 1. 定义正则 检索什么字符
    let reg = /^this/g

    // 2. 获取标签内部的文本
    let pContent = p.innerHTML

    // 3. 将目标字符串提取出来, match的结果是数组 转成字符串
    let targetTxt = pContent.match(reg) + '';

    // 4. 将标签内部的文本 根据正则 替换成 指定样式
    let newContent = pContent.replace(reg, `<span style='color:red'>${targetTxt}</span>`)
    
    // 5. 将标签内部文本替换成修改好的样式
    p.innerHTML = newContent
 -->
       

---------------------------------

### 和正则相关的字符串方法

> split()
- 拆成数组
- 可以将一个字符串拆分为一个数组
- 方法可以传递一个正则表达式作为参数，这样方法将会根据正则表达式去拆分字符串

- 如果不传递参数 代表将整个字符串转为数组

    var str = "1a3f4g5h6h7j7"
    var result = str.split(g);
<!-- 以g开始拆分字符串成数组 g没了 -->

    var result = str.split(/[A-z]/);
<!-- 根据任意字母将字符串拆分 -->


> search()
- 检索
- 可以搜索字符串中是否含有指定内容
- 如果搜到指定内容，则会返回第一次出现的索引，如果没有搜索到返回-1

- 它可以接收一个正则表达式作为参数，然后会根据正则表达式去检索字符串

    str = "hello abc hello abc aec afc"
    result = str.search("abc");

<!-- 搜索字符串中是否含有abc 或aec 或afc -->
    str = "hello abc hello abc aec afc"
    result = str.search(/a[A-z]c/);


> match(正则)
- 提取
- 可以根据正则表达式，从一个字符串中将符合条件的内容提取出来 封装到一个数组中返回
- ()里传递一个正则表达式

> match返回的是数组
- 返回的为数组 Array.isArrray()
- match()会将匹配到的内容封装到一个数组中返回，即使只查询到一个结果
<!-- 
    默认情况下 我们的match 只会找到第一个符合要求的内容，找到以后就停止检索
    我们可以设置正则表达式为全局匹配模式，这样就会匹配到所有内容
    可以为一个正则表达式设置多个匹配模式，且顺序无所谓 
-->
    
    var str = "1a3f4g5h6h7j7"
<!-- 把上面的变量中的所有字母提取出来 -->

    result = str.match(/[A-z]/);    //提取出任意字母 提了个['a']
    result = str.match(/[A-z]/g);   // ['a', 'f', 'g', 'h', 'h', 'j']


> replace(被替换的内容, 新的内容)
- 替换(和删除)
- 可以将字符串中指定的内容替换为新的内容
- 参数
    第一个参数：被替换的内容（正则选中的部分）
    第二个参数：新的内容

- 默认只会替换第一个，设置为正则表达式后 修改为全局匹配模式g
- 空串是删除

    str = "hello abc hello abc aec afc"
    result = str.replace("/a/gi", "@_@");

> 过滤敏感词汇
<!-- 
    let text = document.querySelector('textarea')
    let btn = document.querySelector('button');
    btn.onclick = function() {
        div.innerHTML = text.value.replace(/激情/, '**');
    }
 -->

---------------------------------

### 遍历字符串
- 利用charAt()方法
<!-- 
    for(let i=0; i<str.length; i++) {
        console.log(str.charAt(i));
    }
 -->

-----------------------------

### 引用数据类型：

- js中的数值类型：
- String
- Number
- Boolean
- Null
- Undefined
            
- 引用数据类型：
- Object

> 例1:  
    var a = 123;
    var b = a;

    a++;            // a自增后，b的值是多少？
<!-- 
    答案是b并没用发生改变，a和b的值完全是独立的，一个值发生了变化并不影响另外一个值 
-->

> 例2:
    var obj = new Object();
    obj.name = "孙悟空";

    var obj2 = obj

    console.log(obj.name);      //孙悟空
    console.log(obj2.name);     //孙悟空
    
<!-- obj.name 和 obj2.name都是孙悟空 -->

- 接下来我们修改obj的name属性：

    obj.name = "猪八戒";
    console.log(obj.name);      // 猪八戒
    console.log(obj2.name);     // ?  猪八戒
<!-- 
    也就是说修改一个变量也影响到另一个了！
    这就是引用数据类型和基本数据类型的区别 
-->

> 基本数据类型 和 引用数据类型的区别
- js中的变量都是保存在栈内存，按照 变量和值的模式 保存


> 基本数据类型：
- 基本数据类型的值直接在栈内存中存储，值与值之间是独立存在的, 修改一个变量并不会影响其他的变量，解释如下
<!-- 
    想象成两列的表，左边的是变量，右边的是值
    var a = 123;
    就是我在栈内存的左列存了个a，右列存了值123

    var b = a;
    就是我在栈内存的左列存了个b，右列的值是从a的值复制过来的，
    a和b都是123，但是a的123和b的123没关系是互相独立的

    a++;
    a现在自增了，此时对变量b产生影响了么？没有，a爱咋变咋变，和b没关系
 -->

> 结构图:
- 变量和值在内存中的结构

    var a = 123;
    var b = a;

        栈内存                              堆内存
    
    属性名      属性值
      a          123
      b          123(从a的123复制来的)

    
> 引用数据类型：
- 引用数据类型的值（对象）是保存在堆内存中的，每创建一个新的对象，就会在堆内存中开辟出一个新的空间

- 而变量保存的是对象的内存地址（对象的引用），如果两个变量保存的是同一个对象引用时，当一个通过一个变量修改属性时，另一个也会受到影响, 解释如下：
<!-- 
    想象成左边是栈内存为2列的表，右边是堆内存为一个整体
    var obj = new object();

    首先是创建了一个变量，所以把变量保存在左侧栈内存左列中的格子里，值保存在哪？
    一旦看见new，就意味着 我要在堆内存里开辟出一个新的空间，这个空间专门用来保存这个对象的
    因为变量在栈内存中，而对象在堆内存中，所以它们之间没有关系，要用变量就操作不了对象

    既然对象保存在堆内存的一个空间里，那么这块空间就会有一个对应的内存地址（比如是ox123）

    这个内存空间的地址就是专门来保存 obj这个对象的

    那堆内存中的对象和栈内存中的变量是怎么建立联系的？
    所以在我们变量里保存的其实是内存地址

    想象成 栈内存左列中为obj，右列中为 对象的内存地址ox123
    通过这个内存地址0x123，把变量和对象联系起来了

    也就是说对象本身是没有名字的，有的只是一串内存地址
 -->


    var obj = new object();
    obj.name = "孙悟空";

<!-- 
    现在我往obj里添加了一个name属性叫孙悟空，那么我是我往变量里面添加的么？
    不是吧，我们是往变量里对应的地址对应的对象里添加的
    所以我们是通过地址在右侧堆内存中 刚才创建的对象空间中 添加的孙悟空 
-->

    如果：
    var obj2 = obj;         //相当于把内存地址给了obj2

<!-- 
    所以我们是新创建了一个变量吧，所以我们在栈内存左列中 添加了一个obj2
    这时我们要思考，我们有没有在右侧堆内存中开辟一个新的空间？
    没有
    相当于，我们把obj的地址，复制了下，保存在obj2 右列的格子里
    也就是obj2指向的也是，刚才我们在右侧堆内存中开辟的空间 

    所以，obj.name 和 obj2.name是同一个东西
    接下来我们通过修改obj name的值

    obj.name = "猪八戒";
    这时obj2的对象变没变？ 变了
-->

> 结构图:

            栈内存                                  堆内存
    变量名              值                       
    a                   123                    内存地址：0x123
    obj             内存地址：0x123      ↗       name:孙悟空
    obj2            内存地址：0x123


    接上假如：
    obj2 = null;

<!-- 
    相当于我修改了obj2的值，之前存的是 内存地址，现在为null，但只是少了链接地址，并没有对堆内存的空间产生影响，只是断了联系 
-->

> 两个一模一样的对象 做全等比较 也是false
    var c = 10;
    var d = 10;

    console.log(c == d);    // 判断c和d相等不，等啊
<!-- 比较两个基本数据类型的值时，就是比较值1 == 1 -->

- 比较两个引用数据类型时，比较的对象的内存地址，如果两个对象虽然一模一样，但地址不同，它也会返回false

-----------------------------

### 简单类型 和 复杂类型
- 简单类型又叫做基本数据类型或者值类型, 复杂类型又叫做引用类型

> 值类型:
- 简单数据类型 / 基本数据类型, 在存储时变量中存储的是值本身, 因此叫做值类型

    string number boolean undefined null

- null 返回的是 空的对象
<!-- 
    如果有个变量我们以后打算存储为对象, 暂时没想好放啥, 这个时候就给null
 -->

> 复杂数据类型 引用类型
- 在存储时变量中存储的仅仅是地址(引用) 因此叫做引用数据类型, 通过new关键字创建的对象(系统对象, 自定义对象), 如Object Array Date等


### 堆和栈
> 栈(操作系统): 
- 简单数据类型 是存放在栈里面, 里面直接开辟一个空间 存放的是 值

> 堆(操作系统):
- 复杂数据类型 首先在栈里面存放地址, 16进制表示 然后这个地址指向堆里面的 数据


### 简单类型传参
- 函数的形参也可以看做是一个变量, 当我们把一个值类型变量作为参数传给函数的形参时, 其实是把变量在栈空间里的值复制了一份给形参, 那么在方法内部对形参做任何修改, 都不会影响到外部变量

<!-- 
    function fn(a) {
        a++;
        console.log(a);     11
    }
    let x = 10;
    fn(x);
    console.log(x);         10

    简单类型的传参是 值传递
 -->


### 复杂数据类型的传参
- x 赋值给 p 是地址 两个变量指向同一个对象 其中一个修改后 另一个也有影响
<!-- 
    function Person(name) {
        this.name = name;
    }

    function f1(x) {
        console.log(x.name);        刘德华
        x.name = '张学友'
        console.log(x.name);        张学友
    }

    let p = new Person('刘德华')
    console.log(p.name);            刘德华
    f1(p);
    console.log(p.name)             张学友
 -->

---------------------------------

### API
- 预定义的函数, 给程序员提供的一种工具, 以便能更轻松的实现想要完成的功能

### Web API
- 是浏览器提供的一套操作浏览器功能 和 页面元素的API(BOM DOM)

### DOM
- DOM 全称 document object model 文档对象模型
<!-- 
    js中通过DOM来对HTML文档进行操作，只要理解了DOM就可以随心所欲的操作web页面 
-->

- 文档：
    就是整个的HTML网页文档

- 对象：
    表示将网页中的每一个部分都转换为了一个对象

- 模型：
    使用模型来表示对象之间的关系，这样方便我们获取对象

- 我们获取过来的DOM元素是一个对象(object), 所以称为文档对象模型


### DOM树：
<!-- 
    <!DOCTYPE html>
    <html>
    <head>
        <title>Document</title>
    </head>

    <body>
        <a href="#">超链接</a>
    </body>
    </html> 
-->

上面的页面比如1.html也是个对象，html下面有谁？html标签

            文档
             ↓
            html
        ↙       ↘
    head            body
      ↓               ↓
    title             a  →  属性：href
      ↓               ↓
标签里的文字       标签里的文字
（文本节点）       （文本节点）


> 文档: DOM中使用document表示
> 元素: DOM中使用element表示(页面中的所有标签都是元素)
> 节点: 网页中所有内容都是节点(标签 属性 文本 注释) DOM中使用node表示

> 节点：
- 我们的互联网就是由一个个节点构成的 每一个计算机 每一个路由器 每一个交换机都是节点, 是节点构成了整个网络

> 节点Node
- 是构成我们网页的最基本的组成部分，网页中的每一个部分都可以成为是一个节点
<!-- html标签，属性，文本，注释，整个文档等都是一个节点 -->

- 虽然都是节点，但是实际上他们的具体类型是不同的
- 比如标签我们称为元素节点，属性称为属性节点，文本称为文本节点，文档称为文档节点, 节点的类型不同，属性和方法也都不仅相同


> 常用的节点分为四类：
1. 文档节点：整个html文档
2. 元素节点：html文档中的html标签
3. 属性节点：元素的属性
4. 文本节点：html标签中文本内容

<p id="pId">This is a pargraph</p>
<p></p>                 是元素节点
id="pId"                是属性节点
This is a pargraph      文本节点


> 节点的属性
- nodeName 都是大写 DIV

    nodeName   nodeType    nodeValue       这是节点中都有的属性

    文档节点    #document       9               null

    元素节点    标签名           1              null

    属性节点    属性名           2              属性值

    文本节点    text            3               文本内容 空格换行都是
<!-- 通过值可以判断文档类型 -->


> 文档节点 document ：
- 代表的是整个html文档，网页中的所有节点都是它的子节点
- document对象作为window对象的属性存在的，我们不用获取可以直接使用
<!-- 
    通过该对象我们可以在整个文档访问内查找节点对象，并可以通过该对象创建各种节点对象 
-->

> 元素节点 Element：
- html中的各种标签都是元素节点，这也是我们常用的一个节点, 浏览器会将页面中所有的标签都转换为一个元素节点, 我们可以通过document的方法来获取元素节点

    document.getElementById()
<!-- 根据id属性值获取一个元素节点对象 -->

> 文本节点Text：
- 文本节点表示的是html标签以外的文本内容，任意非html的文本都是文本节点, 它包括可以字面解释的纯文本内容
- 文本节点一般是作为元素节点的子节点存在的
- 获取文本节点时，一般要先获取元素节点，在通过元素节点获取文本节点

\\ 元素节点.firstChild;
<!-- 获取元素节点的第一个子节点，一般为文本节点 -->
    
> 属性节点 Attr：
- 属性节点表示的是标签中的一个一个的属性，这里要注意的是属性节点并非是元素节点的子节点, 而是元素节点的一部分
- 可以用过元素节点来获取指定的属性节点

    元素节点.getAttributeNode("属性名");

---------------------------------

### 文档的加载
<!-- 
    <button id="btn">我是一个按钮</button>
    
    var btn = document.getElementById('btn');

    btn.onclick = function(){
        alert("你还点？");
    }
-->

- 浏览器加载一个页面时，是按照自上向下的顺序加载的，读取到一行就运行一行
- 如果将script标签写在页面的上面时，在代码执行时，页面还没有加载, 页面没有加载，DOM对象也没有加载，会导致无法获取到DOM对象

> 写上面好还是写下面好
如果追求性能的话，写下面 后加载后执行, 写在上面好管理 好修改


> onload事件会在整个页面加载完成之后才触发
- 为window绑定一个onload事件
- 该事件对应的响应函数将会在页面加载完成之后执行, 这样可以确保代码执行时，所有的dom对象已经加载完毕了

    window.onload = function(){ };

---------------------------------

### DOM查询

> console.dir()
- 打印我们返回的元素对象, 更好的查看里面的属性和方法


### 获取body html
> document.body
> document.documentElement
<!-- 
    let body = document.body
    console.log(body)       // <body>...</body>

    let html = document.documentElement
    console.log(html)       // <html>...</html>
 -->


### 获取页面元素
> document.getElementById("id")
- 通过 id属性 获取 一个 元素节点对象


> document.getElementsByName("")
- 通过 name属性 获取 一组 元素节点对象
- 以伪数组的形式存储, 得到的元素是动态的, 上面html部分的内部变了 下面js的结果也会变

- 页面中只有一个 也是以数组返回
- 页面中没有这个元素的话, 返回的是空的伪数组


> document.getElementsByClassName('类名')
- H5新增的方法, ie678不支持, 但是移动端没有问题
- 返回的也是伪数组

> document.querySelector('选择器');
- H5新增的方法, ie8可以使用这个代替className 但是移动端没有问题

> document.getElementsByTagName("")
- 通过 标签名 获取 一组 元素节点对象

>   > 元素对象.getElementsByTagName("")
- 获取元素节点的子节点
<!-- 
    通过具体的元素节点调用，就不是document来调用的，而是通过具体元素来调用的 
-->


### 获取父节点 子节点 兄弟节点
- 利用DOM提供的方法获取元素(id TagName等), 逻辑性不强, 繁琐
- 利用节点层级关系获取元素(父子兄)节点关系获取元素, 逻辑性强, 但兼容性差, 但是节点操作获取元素更简单一些

- 页面中所有的东西都是节点 比如空格

> 具体的节点.parentElement
> 具体的节点.parentNode（不会获取到空白文本因为父元素就一个）
- 属性 表示当前节点的父节点
- 得到的是离元素最近的父级节点(亲爸爸) 找不到父节点就为null
<!-- 
    let erweima = document.querySelec('.erweima')
    erweima.parentNode;
 -->

> 元素对象.childNodes (标准, 一般不使用) :     只找子元素不找后代
- 属性 表示 当前节点 的所有 子节点
- 这个属性 会获取 包括文本在内的所有节点, 根据dom标签和标签之间的空白也会当成文本节点
- 但是在ie8以及以下的浏览器中，不会将空白文本当成子节点, 所以该属性在ie8中会返回4个子元素而其他浏览器是9个
<!-- 
    可以利用 nodeType 来挑选元素节点, 不要文本节点(空格)
    
    let ul = document.querySelector('ul');
    console.log(ul.childNodes);

    for(let i=0; i<ul.childNodes.length; i++) {
        if(ul.childNodes[i].nodeType == 1) {
            console.log(ul.childNodes[i]);
        }
    }
 -->


> 元素对象.children （和上面比，推荐）:     只找子元素不找后代
- 各个浏览器都支持
- 属性 可以获取 当前元素 的所有 子元素(一说元素肯定是标签了，也就是不会返回空白了)


> 元素对象.firstChild
- 属性 表示当前节点的第一个子节点（包括空白文本节点）


> 元素对象.firstElementChild（不建议使用）
- 属性 获取 当前元素 的 第一个子元素
- 兼容性的问题 只兼容ie9以上，如果做pc端的话肯定要兼容ie8的


> 元素对象.lastChild
- 属性 表示当前节点的最后一个子节点（包括空白文本节点）


> 元素对象.lastElementChild（不建议使用）
- 属性 获取 当前元素 的 最后一个子元素
- 兼容性的问题 只兼容ie9以上，如果做pc端的话肯定要兼容ie8的


### 实际开发中 关于如果获取第一个 最后一个节点的问题
- 我们使用 父元素节点.children[0] 的用法 来解决兼容性的问题
> 第一个元素子节点  ul.children[0]
> 最后一个元素子节点  ul.children[ul.children.length-1]


> 元素对象.previousSibling（也可能获取到空白文本）
- 属性 表示当前节点的前一个兄弟节点
- 会获取到空格 #text


> 元素对象.previousElementSibling（不会获取到空白文本）
- 属性 表示获取前一个兄弟元素，IE8以下不支持


> 元素对象.nextSibling（也可能获取到空白文本）
- 属性 表示当前节点的后一个兄弟节点
- 会获取到空格 #text


> 元素对象.nextElementSibling
- 属性 表示当前节点的后一个兄弟节点, IE8以下不支持


> 元素对象.innerHTML：
- 通过这个属性可以获取到元素内容的html代码
- 可以获取到标签内的内容，但是对于自结束标签 没有意义 获取到的内容为空


> 元素对象.innerText:
- 该属性可以获取到元素内部的文本内容
- 它和innerHTML类似，不同的是它会自动将HTML标签去除
<!-- innerHTML有标签，innerText没有标签 就这么个区别 -->



### 创建节点
> document.createElement("")
- 可以用于创建一个元素节点对象，需要一个标签名作为参数, 将会根据该标签名创建元素节点对象，并将创建好的对象作为返回值返回
- document.createElement("")


> document.createAttribute("属性名")
- 创建属性节点
- document.createAttribute("")

    let attr = document.createAttribute('class');
    attr.value = 'box1';
    h1.setAttributeNode(attr)

**注意：**
- 元素节点.setAttributeNode()
- 该方法可以只设置属性名

- 元素节点.setAttribute('属性名', '属性值')
- 该方法就需要同时设置属性名 和 属性值


> document.createTextNode("")    
- 可以用于创建一个文本节点对象，需要一个文本内容作为参数, 将会根据该内容创建文本节点，并将新的节点返回
- createTextNode("")



### 插入 删除 替换
> 父元素对象.appendChild()                  -- 后面添加
- 调用父元素的方法，向一个父节点中添加新的子节点 
- 语法：
    父节点.appendChild(子节点);

**注意:**
- 该方法是用来添加节点 而不是内容


> 父元素对象.inserBefore(新节点，旧节点)     -- 前面添加
- 调用父元素的方法，在指定的子节点前面插入新的子节点
- 需要条件：
    1.父元素
    2.子节点
<!-- 
    let li = document.createElement('li');
    ul.insertBefore(li, ul.children[0]);
 -->

> 父元素对象.removeChild()
- 删除子节点
- 语法：
    父节点.removeChild(子节点);
<!-- 更常用的方式：
    子节点.parentNode.removeChild(子节点); -->
<!-- 
    当已经没有内容可以删除后, 就禁用按钮

    if(ul.children.length == 0) {
        this.disabled = true;
    } else {
        ul.removeChild('li')
    }
 -->


> 父元素对象.replaceChild()
- 可以使用指定的子节点替换已有的子节点
- 语法：
    父节点.replaceChild(新节点，旧节点);


### 复制节点(克隆节点)
> 要克隆的对象.cloneNode(浅拷贝(false) / 深拷贝(true))
- 这个方法返回调用该方法的节点的一个副本, 也成为克隆节点 / 拷贝节点

- 如果括号参数为空 或者 false, 则是 浅拷贝, 即只克隆复制节点本身, 不克隆里面的子节点
<!-- 
    let ul = document.querySelector('ul');

    let lili = ul.children[0].cloneNode(false / true);
    ul.appendChild(lili);
 -->


### 获取和设置属性：
> 元素对象.属性值
- 获取内置属性值(元素本身自带的属性)
<!-- 
    <div id='demo'></div>
    div.id
 -->

> 元素对象.getAttribute('属性名')
- 返回指定的属性值

    元素对象.getAttribute('id');            // demo
    元素对象.getAttribute('自定义属性')


> 元素对象.setAttribute('属性名', ‘属性值)
- 把指定属性设置或修改为指定的值, 可以获取自定义属性
- ie8以及以下不支持该属性

    元素对象.setAttribute('type', 'button');


> 元素对象.setAttributeNode('class')
- 在指定元素对象中设置属性

1.创建属性 或者说 创建属性节点
    let class = document.createAttribute('class');
2.在创建的属性中添加值
    class.value/nodeValue = 'box1'；
3.在指定元素对象内部 添加属性节点
    元素对象.setAttributeNode('class')
<!-- 
    属性名才有value
    节点的话只能用innerHTML
-->

---------------------------------

### JS自定义属性 data-
- 往HTML标签上添加自定义属性来存储和操作数据
- 自定义属性 是为了保存并使用数据, 有些数据可以保存到页面中而不用保存到数据库中
<!-- 
    应用场景: 
    比如京东左侧的导航栏 一组一组的有手机 有家用电器 有家具等等
    这时我们再有东西需要放在一组一组的归类中, 那么怎么区分应该放到哪组里(是家具还是手机还是家用电器的)
    这是时候我们就习惯用自定义属性来进行区分, 比如data-index='1' 
-->

> 在标签内部加上自定义 data-属性名 = '属性值'
<div id="test" data-src='links/1.jpg'></div>


> 读取属性值:
getAttribute('data-src');
<!-- 
    let box = document.querySelector('#test');
    let result = box.getAttribute('data-src');
    console.log(result);
 -->


 > 设置:
setAttribute('data-src', 'value')
<!-- 
    let box = document.querySelector('#test');
    box.setAttribute('data-src', 'haha');
    console.log(box);
-->


### dataset
> dataset属性存取data-*自定义属性的值
- data-前缀属性 可以在js中通过dataset取值，更加方便


> 读取:
> dom对象.dataset.属性名


> 赋值:
> dom对象.dataset.属性名 = '属性值'

\\ 驼峰式属性名 会被转换为 xxx-xxx的形式
<!-- 
    box.dataset.otherName = 'otherValue'
    console.log(box);   data-other-name="otherValue"
 -->


> 删除: 设置成null 或者delete
> dom对象.dataset.属性名 = null;
> delete dom对象.dataset.属性名;


> jQ方法
let obj = $('obj');
console.log(obj.data('属性名'));

---------------------------------

### 改变元素的内容
> 元素对象.innerHTML
- 起始位置到终止位置的全部内容, 包括html标签 同时保留空格和换行


> 元素对象.innerText
- 起始位置到终止位置的内容, 但它取出html标签, 同时空格和换行也会去掉


> 区别:
- innerText 不识别html标签, 写在里面的标签会会直接显示, 非标准
- innerHTML 识别标签, w3c推荐

- 这两个属性是可读写的
<!-- 
    div.innerText = getDate();
    getDate()是我们封装的获取时间的函数, 里面return返回的是格式化好的日期
 -->

---------------------------------

### 三种创建元素的区别
- document.write()
- element.innerHTML
- document.createElement()

> document.write()
- 这种方法是直接将内容写入页面的内容流, 但是文档流执行完毕 则它会导致页面的全部重绘
<!-- 
    document.write("<div>haha</div>")
 -->

> 重绘
- 文本流执行完毕 就是代码从上到下走了一遍, 重绘相当于创建了一个新页面 新页面里只有div
<!-- 
    我们会经常 点击一个按钮后创建一个元素 如果使用这个方式会创建一个新页面
    btn.onclick = function() {
        document.write('<div>123</div>')
    }
 -->

> element.innerHTML
- 这种方式是将内容写入某个dom节点 不会导致全部重绘
- 单个标签的话 innerHTML和createElement 性能没有太大的区别 当特别多的时候 这种方式很慢, 但结合数组的形式会快很多
<!-- 
    元素对象.innerHTML = `<a>百度</a>`
 -->

<!-- 
    结合数组的方式, 性能会更好
    let arr = [];
    for(let i=0; i<100; i++){
        arr.push('<a>百度</a>');
    }
    元素对象.innerHTML = arr.join('');
 -->

> document.createElement()
- 创建多个元素的效率稍微低一点点, 没有innerHTML数组性能好 但是结构更清晰
<!-- 
    let a = document.createElement('a');
    元素对象.appendClild(a);
 -->

---------------------------------

### 表单元素的属性操作
- 利用DOM可以操作如下表单元素的属性
- type value checked selected disabled

- 如果想要某个表单被禁用, 不能再点击 disabled 

<!-- 
    let input = 
    input.value = 
 -->

---------------------------------

### 设置样式属性操作
- 我们可以通过js修改元素的大小, 颜色, 位置等样式

> 元素对象.style
- 通过style样式操作, 产生的是行内样式, css权重比较高
- 如果样式比较少 功能比较少的时候 可以用这个


> 元素对象.className
- 当样式比较多的时候, 功能复杂的时候 我们可以使用className这个方法
- 会覆盖原先的类名 可以这样 '原先的类名 类名' 也可以这样 +=
- 先定义一个类
<!-- 
    this.className = '原先的类名 类名'
 -->


### DOM classList属性:
- 该属性用于在元素中添加，移除及切换 CSS 类。　该系列方法是对class的操作
- ie10以上才支持 使用于移动端

> 只读：
> 元素对象.classList
- 返回的是列表 伪数组的形式 可以通过索引号来获取

> 添加：
> 元素对象.classList.add('类名')
- 在元素中添加一个或多个类名。如果指定的类名已存在，则不会添加

> 删除：
> 元素对象.classList.remove('类名')
- 移除元素中一个或多个类名。注意： 移除不存在的类名，不会报错。
- 可以删除指定类名

> 切换：
> 元素对象.classList.toggle("类名", [true|false])
- 在元素中切换类名。
- 参数：
    - 1. 要在元素中移除的类名，并返回 false。如果该类名不存在则会在元素中添加类名，并返回 true。
    - 2. true | false 可选参数，是否强制添加或移除类，不管该类名是否存在。

> 判断：
> 元素对象.classList.contains()
判断是否有这个类


### 获取 修改对象的样式             
> 修改 样式 --- （内联样式）
- 通过js修改元素的样式：
- 在js中 样式名 采用驼峰命名法

- 语法：
    元素.style.样式名 = 样式值


> 读取 样式 --- （内联样式）
- 通过style属性设置和读取都是内联样式，无法读取样式表中的样式
- 语法：
    元素.style.样式名
<!-- 
    通过style属性设置的样式都是内联样式，而内联样式有较高的优先级, 所以通过js修改的样式往往会立即显示, 但是如果在样式中写了!important，则此时样式会有最高的优先级，即使通过js也不能覆盖该样式, 此时将会导致js修改样式失效，所以尽量不要为样式添加!important
 -->


> 元素对象.currentStyle.样式名      只有IE支持
- 读取当前元素显示的样式：
- 它可以用来读取当前元素正在显示的样式，如果当前元素没有设置样式，则获取它的默认值
- currentStyle只有ie浏览器支持，其他浏览器都不支持


> getComputedStyle(元素对象, null)    直接使用      带单位的
- 在其他浏览器中可以使用
- 这个方法是window的方法，可以直接使用，支持ie9以上的浏览器

- 参数:
    1：要获取样式的元素
    2：可以传递一个伪元素 一般不用 一般传null
    - 比如我们可以获取 before after 的属性值
<!-- 
    let div = document.querySelector(".test")
    let target = getComputedStyle(div, "after")

    console.log(target.getPropertyValue("top"))
    getPropertyValue方法用于获取css中给定属性的属性值
-->
     
- 该方法会返回一个对象，对象中封装了当前元素对应的样式
- 可以通过：
    对象.样式名     来读取样式

    var obj = getComputedStyle(获取样式的元素, null);
    obj.width;
    或者
    getComputedStyle(获取样式的元素, null).width;

**注意：**
- 如果获取的样式没有设置，则会获取到真实的值，而不是默认值
- 没有设置width，它不会获取auto，而是一个长度

- 但是该方法不支持ie8 以及以下浏览器 如果想兼容ie8 就的用
<!-- 
    box1.currentStyle.backgroundColor;
 -->
    
- 通过currentStyle 和 getComputedStyle()读取的样式都是只读的，不能修改，如果要修改，必须通过style属性


> 自定义 获取样式函数 

* 参数：
* 		obj 要获取样式的元素
* 		name 要获取的样式名
* 
function getStyle(obj, name){

    // 这里要是不加window会报错，不加window getComputedStyle是个变量会沿着作用域寻找 函数内部没有 全局没有就会报错，但是加上window变成了 属性 变量没找到会报错 但是属性没找到会返回undefined
    if(window.getComputedStyle){

        // 用return是让后面的内容作为结果返回
        return getComputedStyle(obj, null)[name];
    }else{
        return obj.currentStyle[name];
    }
};
<!-- 
    这是第一次处理兼容性的问题，思路都是一样的，如果有就用... 没有就用... 
 -->

> 复制用代码部分:
function getStyle(obj, name){
    if(window.getComputedStyle){
        return getComputedStyle(obj, null)[name];
    }else{
        return obj.currentStyle[name];
    }
};

---------------------------------

### 事件基础
- js使我们有能力创建动态页面, 而事件是可以被js侦测到的行为
- 简单的理解: 触发 --- 响应 的机制

- 事件是有三部分组成的 事件源 事件类型 事件处理程序 这就是事件三要素

- 事件源:   事件被触发的对象
- 事件类型: 如果触发 什么时间
- 处理程序: 通过一个函数赋值的方式完成

---------------------------------

### 书签

### 注册事件
- 注册事件有两种方式: 传统方式 和 方法监听注册方式

### 传统注册方式
- 利用 on 开头的时间 onclick
- 这种方式的注册事件 具有 唯一性
- 同一个元素同一个事件只能设置一个处理函数, 最后注册的处理函数将会覆盖前面注册的处理函数


### addEventListener 方法监听注册方式
- w3c推荐的方式

> 元素对象.addEventListener() 移动端开发使用比较多
- ie9之前不支持此方法, 可使用 attachEvent() 代替

- 参数:
- type: 事件类型字符串, 比如click mousever 不要 on
- listener: 事件处理函数, 事件发生时, 会调用该监听函数
- useCapture: 可选参数 默认false

- 同一个元素 同一个事件可以添加多个监听器 依次触发

<!-- 里面的时间类型是字符串 必定加引号 而且不带on -->
<!-- 
    let div
    div.addEventListener('click', fn)
    div.addEventListener('mouseover', fn)
    div.addEventListener('mouseout', fn)
 -->


### 事件的解绑 解绑方式
> 传统方式
- eventTarget.onclick = null
- 在回调函数内部解绑
<!-- 
    btn.onclick = function() {
        alert(1);
        btn.onclick = null
    }
 -->

> addEventListener 解绑方式
> 元素对象.removeEventListener()   解绑事件

> 把 回调函数 提取出来
<!-- 
    document.body.addEventListener('mousemove', default, false);

    document.body.removeEventListener('mousemove', default, false);

    function default(){  };

    另一种写法

    btn.addEventListener('click', fn);

    function fn() {
        alert(2);
        btn.removeEventListener('click', fn)
    }
 -->

> 元素对象.attachEvent()
> 元素对象.detachEvent(eventName, callback)
- 解绑的写法跟addEventListener一样


### addEventListener 取消默认行为
> event.preventDefault()
- 使用addEventListener()绑定的事件 取消默认行为时不能用return false，而是使用event.preventDefault()
<!-- 
    document.body.addEventListener('mousemove', function (event) {
        event.preventDefault();
    },false)；
 -->


### attachEvent() ie9以下 绑定多个事件的方式
> 元素对象.attachEvent();
- 在IE8中可以使用attachEvent()来绑定事件
- MDN不推荐使用
- 参数
1. 事件的字符串，要on
2. 回调函数
<!-- 这个方法也可以同时为一个时间绑定多个处理函数 不同的是它是后绑定先执行，执行顺序和addEventListener()相反 -->

    btn01.attachEvent("onclick", function(){...});

### attachEvent 中的this
    btn01.addEventListener("click", function(){
        alert(this);
    },false);                  //btn01

    btn01.attachEvent("onclick", function(){
        alert(this)
    });                        //window

    addEventListener()中的this，是绑定事件的对象
    attachEvent()中的this，是window



### 自定义函数 绑定事件 兼容ie9以下

- 参数：
    obj 要绑定事件的对象
    eventStr 要绑定哪个事件（不要on）
    callback 回调函数


    function bind(obj, eventStr, callback){ ... };



<!-- 
接下来要想attachEvent 要on，a
ddEventListener不要on，那传event的时候传不传on, 
加上on容易还是去掉on容易 加上on容易吧, 
所以这个地方我不要on 那么就有问题了 那ie8不就少个on么？
所以在ie8那手动加一个 
-->

<!-- 
判断obj里是否有addEventListener()这个方法，
如有有的话就用它，没有的话用另一个没必要去判断什么浏览器 
-->

- 解决this问题
<!-- 
返回来再看this的问题, ie8里是window，
就意味着你在这里就不能用this了 因为不一样了 一个是btn01 一个是window 容易出问题 

我希望统一this 是btn 是被点击的对象 是obj, 我们想想this是谁 是不是由调用方式来决定的, ie8是window，那么肯定底层是采用函数形式调用的

那既然是调用方式决定的 那我们只能去改函数的调用方式吧, 函数是谁调的呢？
可以这个函数是浏览器调用的 我们还控制不了, 要是能控制的话 怎么改 call()修改函数的this
callback.call(obj); 

现在callback是浏览器调用的，我不让浏览器调，我希望把调用回调函数的权利拿回来怎么拿回来
-->

else{
    obj.attachEvent("on"+eventStr,callback);
}
<!-- 在这里部分我不传callback了 我直接传一个匿名函数 -->
else{
    obj.attachEvent("on"+eventStr,function(){});
}
<!-- 然后在匿名函数中调用 回调函数 callback -->
else{
    obj.attachEvent("on"+eventStr,function(){
        callback.call(obj);
    });
}

<!-- 
    这样浏览器在调用的时候会先调用匿名函数吧，而匿名函数调用的是回调函数吧 所以效果是一样的这样就都统一了 
-->


function bind(obj, eventStr, callback){

    if(obj.addEventListener){
        obj.addEventListener(eventStr,callback,false);
    }else{
        obj.attachEvent("on"+eventStr,callback);
    }
};

bind(btn01, "click", function(){
    alert("1");
});

---------------------------------

### 常用的事件
> onfocus   获得焦点
> onblur    失去焦点

> onscroll
- 该事件会在元素的滚动条滚动时触发

> onmousemove
- 该事件将会在鼠标在元素中移动时被触发

> onmousedown
> onmouseup

> onmouseover
> onmouseout
- 会冒泡

> onmouseenter
> onmouseleave
- 不会冒泡

> contextmenu
- 弹出右键菜单时触发该回调
- 给document绑定

- 主要控制应该何时显示上下文菜单, 主要用于程序员取消默认的上下文菜单
- 比如鼠标的右键菜单
<!-- 
    禁止鼠标右键菜单

    document.addEventListener('contextmenu', function(e){
        e.preventDefault();
    })
 -->

> selectstart    
- 这个事件会在选中文字后触发
- 点击也有效果
<!-- 
    禁止鼠标选中

    document.addEventListener('selectstart', function(e){
        e.preventDefault();
    })
 -->


### input 常用的事件
> onchange      当状态被改变时会触发
> oninput       当input的value值发生变化时就会触发
- 与onchange的区别是不用等到失去焦点就可以触发了

> onselect      当input里的内容文本被选中后执行，只要选择了就会触发，不是全部选中


### 常用的键盘事件
> onkeyup
- 某个键盘按键被松开时触发

> onkeydown
- 某个键盘按键被按下时触发
- 对于onkeydown来说如果一直按着某个按键不松手，则事件一直触发
<!-- 
    当onkeydown连续触发时，第一次和第二次之间会卡顿一下，之后会连续触发非常快，为了防止误操作的发生
 -->

> onkeypress
- 某个键盘按键被按下时触发, 但是它不识别功能键, 比如ctrl shift 箭头等
- 区分按下键的大小写

<!-- 
    三个事件的执行顺序, keydown --- keypress --- keyup

    keydown 和 keyup 不区分大小写
    keypress 区分大小写
 -->

- 注意：
- 键盘事件一般都要绑定给一些可以获取到焦点的对象，或者是document 文档对象 一般是表单项 或者 document 
- 比如鼠标插入了一个文本框 有光标在闪 这就叫做获取到了焦点，在文本框再点下，光标没了，叫做失去焦点

---------------------------------

### onmouseover 和 onmouseenter的区别
- 当鼠标移动到元素上时, 就会触发mouseenter事件

> onmouseover 给父盒子绑定mouseover事件 经过父盒子会触发(正常), 经过父盒子里面的子盒子也会触发事件

- mouseover 鼠标听过自身盒子会触发, 经过子盒子还会触发
<!-- 
    鼠标移动到子盒子上 得到鼠标经过, 但是没有事件 所以会往上冒泡
    冒泡 是 沿着 dom树 子 往 父上冒
 -->

- mouseenter 只会经过自身盒子触发

> 原因:
- mouseenter mouseleave不会冒泡

---------------------------------

### 滚轮事件
> onmousewheel
- 鼠标滚轮滚动事件，会在滚轮滚动时触发
- 但火狐不支持该属性

> DOMMouseScroll
- 在火狐中需要使用 DOMMouseScroll 来绑定滚动事件
- 注意该事件 需要用addEventListener()函数来绑定


### 滚轮事件中的事件对象
> event.wheelDelta
- 可以获取鼠标滚轮滚动的方向
- 向上 值为120
- 向下 值为-120     我们不看值的大小只看正负
- 但是火狐不支持

    event.wheelDelta;
    alert(event.wheelDelta);

> event.detail      火狐 特殊
- 在火狐中 可以获取鼠标滚轮滚动的方向
- 向上 值为-3
- 向下 值为3

    event.detail;
    
<!--    
    document.addEventListener("mousewheel", wheel)
    function wheel(e) {
      let flag;

      if(e.wheelDelta < 0 || e.detail > 0) {
        flag = "down"
      } else {
        flag = "up"
      }

      switch(flag) {
        case "up":
          console.log("我往上滚啦")
          break
        case "down":
          console.log("我往下滚啦")
          break
      }
    }
 -->

---------------------------------

### 滚动窗口至文档中的特定位置

> window.scroll(x, y);
- 可以让窗口的滚动到指定位置
- 不用加单位 直接写数字即可
    window.scroll(0, 100)

---------------------------------

### 排他思想
- 如果有同一组元素, 我们想要某一个元素实现某种样式, 需要用到循环的排他思想算法
- 把所有的去掉要用for循环去 而不是直接写btns[i]
- 排他其他人, 设置自己的样式
<!-- 
    for(let i=0; i<btns.length; i++) {
        btns[i].onclick = function() {
            for(let i=0; i<btns.length; i++){
                btns[i].style.backgroundColor = '';
            }
            this.style.backgroundColor = 'pink'
        }
    }
 -->

---------------------------------

### 案例 百度换肤
- 这个案例联系的是给一组元素注册事件
- 给4个小图片利用循环注册点击事件
- 当我们点击了这个图片, 让我们页面背景改为当前图片
- 核心算法 把当前图片的src路径取过来 给body做为背景

<!-- 
    document.body.style.backgroundImage = 'url('+this.src+')'
 -->

---------------------------------

### 案例 表单全选取消全选
- 全选和取消全选: 
    - 让下面的所有复选框的checked属性 跟随 全选按钮即可
<!-- 
    j_tbs[i].checked = this.checked
 -->

- 下面复选框需要全部选中, 上面全选按钮才能选中的做法:
    - 给下面所有复选框绑定点击事件, 每次点击, 都要循环查看下面所有的复选框是否有没选中的, 如果有一个没选中的 上面全选就不选中

- 可以设置一个变量 来控制全选是否选中

<!-- 
    for(let i=0; i<j_tbs.length; i++) {
        j_tbs[i].onclick = function() {

            // 声明一个变量 默认是选中状态
            let flag = ture;

            for(let i=0; i<j_tbs.length; i++) {

                // 一上来都是没选中的 所以取反
                if(!j_tbs[i].checked) {         
                    flag = flase;
                    break;
                }
            }

            // 检查完毕后
            j_cbAll.checked = flag;
        }
    }
 -->


---------------------------------

### 案例: 分时显示不同图片, 显示不同的问候语
- 根据不同时间, 页面显示不同图片, 同时显示不同的问候语
- 如果上午打开页面, 显示上午好, 显示上午的图片
- 如果下午打开页面, 显示下午好, 显示下午的图片
...

<!-- 
    分析:
    根据系统不同时间判断, 所以需要用到日期内置对象
    利用多分支语句设置不同的图片
    需要一个图片, 并且根据时间修改图片 操作元素的src属性
    需要一个div元素 显示不同的问候语, 修改元素内容即可

    let date = new Date();
    let h = date.getHours();
    if(h<12) {
        img.src = 
        div.innerHTML = 
    }else if (h < 18) {
        img.src = 
        div.innerHTML = 
    }
 -->

---------------------------------

### 点击切换练习
<!-- 
    <style>
    * {
        margin:0;
        padding:0;
    }
    #outer{
        width:500px;
        padding:10px;
        background-color:cornflowerblue;

        text-align:center;
        margin:50px auto;
    }
    </style>
    <body>
    <p id="info">一共 5 张图片，当前第 1 张</p>
    <div id="outer">
        <img src="./links/1.jpg" alt="">
        <button id="prev">上一张</button>
        <button id="next">下一张</button>
    </div>
    </body> 
-->

window.onload = function(){
<!-- 点击按钮切换图片,首先要找到两个按钮 并为按钮设置单击响应函数 -->
    var prev = document.getElementById("prev");
    var next = document.getElementById("next");

<!-- 创建一个数组 用来保存5张图片的路径 -->
    var imgArr = [
        "links/1.jpg",
        "links/2.jpg",
        "links/3.jpg",
        "links/4.jpg",
        "links/5.jpg"
    ];

<!-- 
    创建一个变量，来保存当前正在显示的图片的索引, 因为默认显示的是第一个 所以索引为0 
-->
    var index = 0;

(优化相关：
<!-- 设置提示文字 -->
    var info = document.getElementById("info");

<!-- 怎么设置提示文字？info.innerHTML是读 写的话就是赋值 -->
    info.innerHTML = "一共 5 张图片，当前第 1 张";

<!-- 
    写死了不好，因为以后图片要是多了怎么办？, 5张 是数组的长度, 当前第几张怎么办？, 当前第 index 张，那index是0开始的 所以应该是 当前第 index+1 张 
-->

    info.innerHTML = "一共"+imgArr.length+"张图片，当前第"+(index+1) + "张";
<!-- 这么写的话，会拼串 出现 当前 第21张的现象 用括号括起来 -->

<!-- 
    可是这么写还是没变 为什么？,我原本希望点的时候，我的提示文字跟着变化，可是我的提示文字什么时候设置的？, 一上来就设置的，当我点按钮的时候 我没有设置, 所以 在最后, 当点击按钮以后，应该重新设置信息, 我每次点按钮 都应该把这段代码执行一遍 
-->
    info.innerHTML = "一共"+imgArr.length+"张图片，当前第"+(index+1) + "张";)

<!-- 要切换图片就是要修改 img标签的src属性   要先找到img标签 -->
    var img = document.getElementsByTagName("img");

<!--     
    我们获取到的是一个数组，是一个只有一个元素的数组, 可我们不能直接操作数组，我们要操作里面的元素 

    既然我们已经确定只有一个元素了，我们可以把它直接装进img中
-->
    var img = document.getElementsByTagName("img")[0];
    
    prev.onclick = function(){

<!-- 切换图片就是修改src属性 -->
        img.src = imgArr[0];

<!-- 
    可这么改的话永远在1和2之间切换，我们的需求是在5张图片中来回切换，也就是有5个路径那是不是得有个地方 把5个路径装起来啊，所以我们要在上面创建一个数组 用来保存图片路径 
-->
    img.src = imgArr[0];

<!-- 
    但是这么写还是不行，也是永远在两张图片来回换，所以我们要创建一个变量用来保存正在显示的图片的索引，然后我们想 切换到上一张 是不是索引自减啊 
-->
    index--;
    };

- 修改下：

    prev.onclick = function(){
        index--;
        img.src = imgArr[index];
    };

    next.onclick = function(){
        // 切换到下一张 是index自增
        index++;
        img.src = imgArr[index];
    };
            };

<!-- 
    但是按照上面的改完了还是有问题, 5张图片没有循环. 当到最后一张的时候，索引应该是4，再点一下 索引会自增到5, 但是没有5啊，所以显示的会是undefined, 所以内部还需要进行判断，判断index是否小于0 
-->

    prev.onclick = function(){
        index--;
        
        if(index < 0){
            index = 0;
        };

<!-- 
    因为最小值就是0，所以当你小于0的时候 让你等于0,说白了就是你翻到0的位置，还能不能往下翻了，翻不动了吧 
-->

        img.src = imgArr[index];
    };

    同理

    next.onclick = function(){
        index++;
<!-- 这里的index++也应该有个最大值吧 -->
        if(index > 4){
                index = 4;
            };
<!-- 这样设置完 再翻到最后一张就翻不动了吧       -->
        img.src = imgArr[index];
    };

<!-- 但是 if 写上index > 4 好么？, 假如图片再多几张的话 怎么办, 所以要写上 imgArr.length 但是 imgArr.length 不是最后一个索引, 而是最大所以 +1, 所以要改成index < imgArr.length-1 -->

    改完：
    prev.onclick = function(){
        index--;
        if(index < 0){
            index = 0;
            };

---------------------------------

### a的索引问题    
var delbtn = document.getElementsByTagName("a");
    for(var i=0; i<delbtn.length; i++){
        delbtn[i].onclick = delA;
    }

- 我们知道delbtn[i] == this 那我这么写行不行
    var tr = this.parentNode.parentNode;
- 改成:
    var tr = delbtn[i].parentNode.parentNode;

    行不行  不行   delbtn[i] is undefined 为什么


<!-- 
我们正常理解是 [i] = 0 加载一个 [i] = 1 加载一个 [i] = 3 加载一个
但实际上 allA[i]的索引是3

为什么？

因为for循环会在页面加载完成之后立即执行，而响应函数是在超链接点击时被执行
for循环先执行，响应函数后执行, 当响应函数执行时，for循环早已执行完毕
for循环是从0开始的 ++ 变成1 再++变成2 再++变成3 3是不是小于allA.length的长度了, 所以不执行了, 也就是说当for循环停止时 i是3, 所以响应函数能看到的i是3 
-->

---------------------------------

### DOM事件流
- 事件流描述的是从页面中接受事件的顺序
- 事件发生时会在元素节点之间按照特定的顺序传播, 这个传播的过程就是DOM事件流

- 事件传播的过程
- DOM事件流分为3个阶段

- 注意:
    js代码中只能执行捕获或者冒泡其中的一个阶段

    捕获阶段
    目标阶段
    冒泡阶段

- onclick(传统事件) 和 attachEvent 只能得到冒泡阶段



### 事件的传播
- 关于事件的传播 网景公司和微软公司有不同的理解

> 微软公司:
- 事件应该是由内向外传播 也就是当事件触发时，应该先触发当前元素上的事件，然后再向当前元素的祖先元素上传播  --- 事件的冒泡

> 网景公司
- 时间应该是由外向内传播，也就是当事件触发时, 应该先触发当前元素的最外层的祖先元素的事件，然后再向内传播给后代元素  --- 捕获阶段

> w3c
- 综合了两个公司的方案，将事件的传播分成了三个阶段


>>第一阶段： 事件的捕获阶段
    在捕获阶段时，从最外层的祖先元素从window，向目标元素进行事件的捕获 但是默认此时不会触发事件

>>第二阶段：目标阶段
    事件捕获到目标，捕获结束后开始在目标元素上执行事件 或者说 是触发事件    中间阶段执行 冒泡往上走

>> 第三阶段：冒泡阶段
    事件从目标元素向他的祖先元素传递，依次触发祖先元素上的事件

<!-- 
    假如我希望在捕获阶段就开始执行 可以将addEventListener()的第三个参数设置为true，一般情况下我们不会希望在捕获阶段触发事件 很少传true

    ie8 以及浏览器 没有捕获阶段 
-->

<!-- 
    - 分别为三个div绑定 单击响应函数
    var box1 = document.getElementById("box1");
    var box2 = document.getElementById("box2");
    var box3 = document.getElementById("box3");

    bind(box1, "click", function(){
        alert("我是box1的响应函数");
    });
    bind(box2, "click", function(){
        alert("我是box2的响应函数");
    });
    bind(box3, "click", function(){
        alert("我是box3的响应函数");
    });

    function bind(obj, eventStr, callback){
        if(obj.addEventListener){
            obj.addEventListener(eventStr,callback,false);
        }else{
            obj.attachEvent("on"+eventStr,function(){
            callback.call(obj);
        });
    };
 -->

---------------------------------

### 事件的冒泡
- 所谓的冒泡指的就是事件的向上传导，当后代元素上的事件被触发时，其祖先元素的相同事件也会被触发
- 在开发中大部分情况都是非常有用的 如果不希望事件的冒泡 可以通过事件对象来取消冒泡

> 取消冒泡 event.cancelBubble = true;
- 可以将事件对象的cancelBubble设置为true，即可取消冒泡；
    event.cancelBubble = true;

- 要取消冒泡 就要在对应的响应函数里 先传递一个形参event
<!-- 兼容性要event = event || window.event; -->
<!-- 
    window.onload = function(){

    为s1绑定点击响应函数
    var s1 = document.getElementById("s1");

    s1.onclick = function(){
        alert("我是s1的单击响应函数");
    };

    为box1绑定点击响应函数
    var nox1 = document.getElementById("box1");
    box1.onclick = function(){
        alert("我是div的单击响应函数");
    };

    为body绑定点击响应函数
    document.body.onclick=function(){
        alert("我是body的单击响应函数");
    };

    我现在给div span body都绑定了点击响应函数，那它们三个是什么关系 祖先 后代吧
    我现在点击span文字上，发现分别出现了我是s1的单击响应函数   我是div的单击响应函数   我是body的单击响应函数
    这种情况就叫做事件的冒泡
    };
 -->

---------------------------------

### 事件委派 ---- 冒泡的应用
- 指将事件统一绑定给元素的共同的祖先元素，这样当后代元素上的事件触发时，会一直冒泡到祖先元素, 从而通过祖先元素的响应函数 来 处理事件
<!-- 
    事件的委派是利用了冒泡 通过委派可以减少事件绑定的次数，提高程序的性能 
-->

- 解析: 我点击的是li, 但这个操作会冒泡到ul上, ul上有事件所以会触发

> event.target
- 返回触发此事件的元素（事件的目标节点）

> 重点:
<!-- 
    方式1:

    if(event.target.className=="link"){
        alert("看看效果");
    }
 -->

<!-- 
    解析案例:

    window.onload=function(){

    点击按钮以后添加超链接 先获取按钮并为按钮绑定点击响应函数
    var btn01 = document.getElementById("btn01");
    var u1 = document.getELemengtById("u1");

    btn01.onclick = function(){

    创建一个li
    var li = document.createElement("li");
    li.innerHTML = "<a href='javascript:;' class='link'>新建的超链接<a>"

    将li添加到ul中，需要先在外面获取到一个ul
    u1.appendChild(li);      
    //新加进去的超链接 没有点击响应函数 
};

    为每一个超链接都绑定点击响应函数
    思考：
    这里我们为每一个超链接都绑定了单击响应函数，这种操作比较麻烦 而且这些操作 只能为已有的超链接设置事件，而新添加的超链接必须重新绑定 麻烦 而且 性能不好
    
    我们希望只绑定一次事件 即可应用到所有的元素 多个元素上，即使元素时候添加的我们可以尝试将其绑定给共同的祖先元素

    那超链接共同的祖先元素是谁？ 不是li a各有各的li 应该是ul吧  

    推荐使用：
    为ul绑定单击响应函数
    u1.onclick = function(event){
    
    思考：
    我给ul绑定的响应函数，也就是说我点击ul的区域都会触发
    alert("我是ul的超链接");            // 这就是事件的委派


    重要！！！   如果触发事件的对象是期望的元素 就执行 否则不执行

    要判断
    那要先干什么，得知道事件是由谁触发的吧
    那this行不行，以前说过 事件给谁绑定的this就是谁, 所以绑定给ul this只能是ul 没办法通过this去判断触发的是谁


    事件对象知道
    event.target
    - 返回触发此事件的元素（事件的目标节点）
    - event中的target表示触发事件的对象

        eg:event.target

    既然是事件对象 就要先获取事件对象，也就是往这个函数内部传递一个形参 event 然后解决兼容性问题
    event = event || window.event;
    alert(event.target);

    如果触发事件的对象是期望的元素 就执行 否则不执行

    if(event.target.className=="link"){
        alert("看看效果");
    }

    正常是给ul绑定的单击响应函数，所以ul的所有区域被点击都会触发点击响应函数
    但是 如果 通过evenet.target 可以让 被点击目标 触发点击响应函数

    event.target.className=="link" 
-->

---------------------------------

### 事件对象
- 当事件的响应函数被触发时，浏览器每次都会将一个事件对象作为实参传递进响应函数 event

- event就是一个事件对象, 写到我们监听函数的小括号里面 当形参来看
- 事件对象只有 有了事件才会存在
- 事件对象 是 我们事件的一系列相关数据的集合

- 在事件对象中封装了当前事件相关的一切信息，比如：鼠标的坐标，键盘哪个案件被按下，鼠标滚轮滚动的方向

- 事件的响应函数都是被浏览器调用的

- 所以以后想知道事件的相关信息，或者对事件进行相关的操作 都找event DOM事件

- 事件对象也有兼容性问题, ie 678 通过window.event

> 使用事件对象时, e = e || window.event

---------------------------------

### 事件对象的属性 和 方法

> event.target的兼容性处理

    event = event || window.event
    let target = event.target || event.SRCElement;

> 阻止事件冒泡的兼容性处理

    if(event && event.stopPropagation) {
        event.stopPropagation();
    } else {
        window.event.cancleBubble = true;
    }


> event.target
- 返回触发事件的对象            标准

> event.srcElement
- 返回触发事件的对象            非标准 ie678使用

> event.type
- 返回事件的类型, 比如click 不带on

> event.stopPropagation()
- 阻止冒泡                      标准
- 有兼容性的问题 ie678要使用cancleBubble
<!-- 
    event.stopPropagation();
    event.cancleBubble = true;
 -->

> event.cancelBubble
- 该属性阻止冒泡                非标准 ie678使用

> event.preventDefault()
- 该方法阻止事件(默认行为)      标准 比如 不让链接跳转

> event.returnValue
- 该属性阻止默认事件(默认行为)  非标准 ie678使用 比如 不让链接跳转


### 鼠标事件对象
> event.clientX     不包括滚动区域
> event.clientY
- 返回当事件被触发时，可以获取鼠标指针在 当前的 可见窗口的 水平 和 垂直 坐标
- 它不管页面拖不拖动(滚动条) 就是相对于 可见窗口 的坐标


> event.pageX       包括滚动区域
> event.pageY
- 可以获取鼠标相对于当前文档页面的坐标
- 包括滚动区域
- 但是这两个属性在ie8中不支持，所以如果需要兼容ie678 则不要使用


> event.screenX
> event.screenY
- 返回鼠标相对于电脑屏幕的X坐标
- 返回鼠标相对于电脑屏幕的Y坐标


### 键盘事件对象
> event.keyCode
- 返回相应的键的ASCII值
- 我们的keyup和keydown事件不区分字母大小写 a 和 A得到的都是65

> event.altKey
> event.ctrlKey
> event.shiftKey
- 这三个用来判断alt ctrl shift是否被按下 如果按下则返回true 没有按下返回false

    document.onkeyup = function(event){
        event = event || window.event;

<!-- 判断一个y键是否按下 -->
        if(event.KeyCode === 89){
            console.log("y被按下了");
        }

<!-- 判断y和ctrl是否同时被按下 -->
        if(event.KeyCode ===89 && event.ctrlKey){
            console.log("ctrl+y被按下了");
        }


<!-- 以下是给input绑定的 -->

    var input = document.getElementsByTagName("input")[0];
    input.onkeydown = function(){

    return false; 
<!-- 
    取消默认行为，在文本框中输入内容属于onkeydown的默认行为，如果使用return false取消默认行为 则输入的文本不会在文本框中
-->
    };

> 需求： 在文本框中不能输入数字
input.onkeydown = function(event){
    event = event || window.event;
    
<!-- 
1. 先判断用户输入的是什么，得问event吧, 我们先看看数字的编码是多少 48 - 57 
-->
    console.log(event.keyCode);     //0-9 48-57
    if(event.keyCode >=48 && event.keyCode <=57){
        return false; 
    }

// 0 - 9 :      48 - 57
// L T R X ：   37 - 40
// a - z ：     65 - 90

---------------------------------

### this 和 event.target
> this      返回的是绑定事件的对象
> target    返回的是触发事件的对象  点击了哪个元素就返回哪个元素

- 比如 div - span 我们给div绑定事件
- this就是div
- 但是 target 我点div的时候target是div 但是我点击span的时候 target就是span
<!-- 
    <ul>
        <li></li>
        <li></li>
        <li></li>
    </ul>

    let ul = document.querySelector('ul');
    ul.addEventListener('click', function(evnet){

        // this 是 ul, 绑定事件的对象
        console.log(this)

        // target 是触发事件的对象 比如我点的是li
        console.log(event.target)
    })
 -->

---------------------------------

### this 和 event.currentTarget
- event.currentTarget ie678不支持
- 他们都是绑定谁 就是谁

---------------------------------

### PC端的特效

### 元素偏移量 offset 系列
- offset翻译过来就是偏移量 我们使用offset系列相关属性可以动态的得到该元素的位置 大小等

- 可以获取元素距离带有定位父元素的位置
- 可以获取元素自身的大小(宽度 高度)
<!-- 注意返回的数值都不带单位 -->

### offset系列常见的属性
> 元素对象.offsetParent
- 可以用来获取当前元素的定位父元素
- 会获取到当前元素最近的开启了定位的祖先元素 如果所有的祖先元素都没有开启定位则返回body

<!-- 
    之前我们还学了DOM节点的 元素对象.parentNode 返回父级元素 区别
    元素对象.parentNode 返回的是亲爸爸 不管父亲有没有定位
    元素对象.offsetParent 返回的是带有定位的父亲 父级没有定位 就向上查找, 知道找到body
 -->
<!-- 
    <div id="box1" style="position: relative;">
        <div id="box2" style="position: relative;">
            <div id="box3"></div>
        </div>
    </div>

    var op = box1.offsetParent;
    alert(op);
    alert(op.id);   //找的是box2 都没定位找body
 -->
    

> 元素对象.offsetTop
- 当前元素相对于其 定位父元素 的垂直偏移量
> 元素对象.offsetLeft
- 当前元素相对于其 定位父元素 的水平偏移量

    alert(box1.offsetLeft); 

<!-- 
    如果父元素都没有开启定位 则相对于body 值为8（默认margin）, 假如把box2开启定位, #box2 {position:relative; padding:100px; background-color:red;}, 就是相对于box2说的 值为100 box1 和 box2 左侧的距离 
-->


> 元素对象.offsetWidth
> 元素对象.offsetHeight
- 可以获取元素的整个宽度和高度，包括 内容区 和 内边距 和 边框 和 滚动条的位置

    alert(box1.offsetWidth);



### client系列常见的属性
- client翻译过来就是客户端的意思, 我们使用client系列的相关属性来获取元素可视区的相关信息, 通过client系列的相关属性可以动态的得到该元素的边框大小, 元素大小等

> 元素对象.clientWith
> 元素对象.clientHeight  可见框的大小
- 这两个属性获取可见框的宽度和高度
- 这些属性都是不带px的，返回的都是一个数字，可以直接进行计算

- 会获取元素的宽度和高度 包括：内容区和内边距 不包括border
- 这些属性都是只读的 不能修改 改只有一种方式 就是用Style属性（以下通用）

- 如果有滚动条的话，会刨除滚动条的位置，注意是可见框的大小

    alert(box1.clientWidth);


> 元素对象.clientTop
- 返回元素上边框的大小
> 元素对象.clientLeft
- 返回元素左边框的大小
<!-- 上面的很少去用 -->

---------------------------------

### offset 和 style 区别
- 这两种都能得到元素的大小等属性 区别是什么?

> offset 角度
- offset可以得到任意样式表中的样式值
- offset系列可以获得的数值是没有单位的
- offsetWidth 包含padding border width
- offsetWidth 等属性是只读属性 只能获取不能赋值
<!-- 所以我们想要获取元素大小位置 用offset更合适 -->

> style 角度
- style只能得到行内样式表中的样式值
- style.width 获得的是带有单位的字符串
- style.width 获得不包含padding 和 border的值
- style.width 是可读可写属性, 可以获取也可以赋值
<!-- 所以我们想要给元素更改值 则需要用style改变 -->


---------------------------------

### 元素scroll系列属性
- 跟滚动条相关的

> 元素对象.scrollWidth
- 元素的实际大小(包含超出部分), 获取滚动区域的宽度, 不含边框
> 元素对象.scrollHeight
- 元素的实际大小(包含超出部分), 获取滚动区域的高度, 不含边框
> 当没有溢出的时候, 跟client很像

    alert(box4.clientHeight);   //300 可见的高度
    alert(box4.scrollHeight);   //600 可以获得整个滚动区域的高度

            
> 元素对象.scrollLeft
- 可以获取水平滚动条滚动的距离, 被卷进去的左侧距离

> 元素对象.scrollTop
- 可以获取垂直滚动条滚动的距离, 被卷进去的上侧距离

    alert(box4.clientHeight);       //283
    alert(box4.scrollHeight);       //600

    alert(box4.scrollTop);          //没往下滚动的时候是0
    alert(box4.scrollHeight - box4.scrollTop)        //600

<!-- 当垂直滚动条到底时 -->
    alert(box4.scrollHeight - box4.scrollTop)       //283

> 当满足scrollHeight - scrollTop == clientHeight
- 说明垂直滚动条 滚动到底了

> 当满足scrollWidth - scrollLeft == clientWidth
- 说明水平滚动条 滚动到底了

<!-- 有的时候上网会要注册，注册时候会有一堆的条款让你去读， 下面有个√ 它要确保你阅读协议了 才让你注册 什么时候才能注册呢，当滚动条滚动到底了 就视为你阅读完了 才让你注册 -->

---------------------------------

# window.pageYOffset 页面被卷进去的距离

> window.pageYOffset / pageYOffset
> window.pageXOffset / pageXOffset
- 这两个属性 可以获取 页面被卷去了多少
- 设置或返回当前页面相对于窗口显示区左上角的 X 位置。
- 设置或返回当前页面相对于窗口显示区左上角的 Y 位置。

- 页面被卷去的头部(scrollTop) 可以通过window.pageYOffset获得, 如果是被卷去的左侧 window.pageXOffset 

> 注意: 
- 元素的内容被卷进去多少是 ele.scrollTop获取的, 比如是某个盒子被卷进去多少
- 如果是页面被卷进去多少则是window.pageYOffset

> 兼容性注意:
- 页面被卷去的头部, 有兼容性问题, 因此被卷去的头部通常有如下的几种写法

> 声明了DTD 使用document.documentElement.scrollTop;

> 未声明DTD 使用document.body.scrollTop;

> 新方法    window.pageYOffset / pageYOffset  ie9以上支持

> 自定义函数写法(pink)
<!-- 
    function getScroll() {
        return {
            left:window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0,

            top:window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
        }
    }

    // 使用的时候
    getScroll().left / top
 -->

> DTD
- <!DOCTYPE html> 这个就是DTD 加上这个就可以使用 document.documentElement.scrollTop;


> 最高兼容性写法(网上)
<!-- 

    \\判断是否支持 PageOffset (给 supportPageOffset赋值 true 或 false)
    var supportPageOffset = window.pageXOffset !== undefined;
 
    \\检测浏览器渲染属性是否标准模式 (isCSS1Compat赋值 true 或 false)
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    
    \\如果不支持PageOffset，则要使用 scrollLeft; 
    \\scrollLeft 根据浏览器模式（标准模式、怪异模式），使用不同语法
            \\标准模式： document.documentElement 语法
            \\怪异模式： document.body 语法
    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;

    ----

    var supportPageOffset = window.pageXOffset !== undefined;
    var isCSS1Compat = ((document.compatMode || "") === "CSS1Compat");
    var x = supportPageOffset ? window.pageXOffset : isCSS1Compat ? document.documentElement.scrollLeft : document.body.scrollLeft;
    var y = supportPageOffset ? window.pageYOffset : isCSS1Compat ? document.documentElement.scrollTop : document.body.scrollTop;
-->

---------------------------------

### 对offset client scroll系列的总结
- 它们都可以返回元素大小

- offsetWidth   返回自身包括padding, border width的宽度 返回值不带单位
- clientWidth   返回自身包括padding, width, 不包括border 返回值不带单位
- scrollWidth   返回自身的实际宽度, padding, 不包含边框, 返回数值不带单位

- 它们主要用法
- offset系列 主要用于获取元素的位置
- client系列 主要获取元素的大小
- scroll系列 主要获取滚动的距离

> 页面的滚动的距离是通过 window.pageXOffset 获取的

---------------------------------

### 淘宝 flexible.js 源码分析
(function flexible(window, document){

})(window, document)

- 上面的函数是立即执行函数, 主要作用:创建一个独立的作用域
- 使用的立即执行函数的第二种书写方式
> 这种方式的好处就是我们引入了flexible.js 再引入其它js文件不会用 变量名冲突的情况, 都是局部变量

> window, document 当实参传递进去, 这样立即执行函数就可以使用这两个参数了

> window.devicePixelRatio 是物理像素比
- pc端输出的结果会是1
- 移动端输出的结果会是2

> var dpr = window.devicePixelRatio || 1
- 检查当前浏览器有没有window.devicePixelRatio这个属性, 有的话就获取这个属性, 没有的话就设定为1

<!-- 
    (function flexible(window, document) {
    // 获取的 html 的根元素
    var docEl = document.documentElement
        // dpr 物理像素比
    var dpr = window.devicePixelRatio || 1


    // adjust body font size  设置我们body 的字体大小
    function setBodyFontSize() {
        // 如果页面中有body 这个元素 就设置body的字体大小
        if (document.body) {
            // 我的物理像素比是1 如果是pc端打开的就是 12 X 1
            // 如果是移动端打开的, 就是12 X 物理像素比了
            document.body.style.fontSize = (12 * dpr) + 'px'
        } else {
            // 如果没有body? 因为整个代码没有加载onload事件, 如果我的这个js文件是在head标签里引入的j
            // 如果页面中没有body 这个元素，则等着 我们页面主要的DOM元素加载完毕再去设置body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    // 代码加载先执行这个函数
    setBodyFontSize();


    // set 1rem = viewWidth / 10    设置我们html 元素的文字大小
    function setRemUnit() {
        var rem = docEl.clientWidth / 10
        docEl.style.fontSize = rem + 'px'
    }

    setRemUnit()

    // reset rem unit on page resize  当我们页面尺寸大小发生变化的时候，要重新设置下rem 的大小
    window.addEventListener('resize', setRemUnit)
        // pageshow 是我们重新加载页面触发的事件
    window.addEventListener('pageshow', function(e) {
        // e.persisted 返回的是true 就是说如果这个页面是从缓存取过来的页面，也需要从新计算一下rem 的大小
        if (e.persisted) {
            setRemUnit()
        }
    })

    // detect 0.5px supports  有些移动端的浏览器不支持0.5像素的写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body')
        var testElement = document.createElement('div')
        testElement.style.border = '.5px solid transparent'
        fakeBody.appendChild(testElement)
        docEl.appendChild(fakeBody)
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairlines')
        }
        docEl.removeChild(fakeBody)
    }
}(window, document))
 -->

---------------------------------

### 滚轮事件

> onmousewheel
    - 鼠标滚轮滚动事件，会在滚轮滚动时触发
    - 但火狐不支持该属性
> DOMMouseScroll
    - 在火狐中需要使用 DOMMouseScroll 来绑定滚动事件
    - 注意该事件 需要用addEventListener()函数来绑定

> event.wheelDelta
    - 可以获取鼠标滚轮滚动的方向
    - 向上 值为120
    - 向下 值为-120
        我们不看值的大小只看正负
    - 但是火狐不支持

        event.wheelDelta;
        alert(event.wheelDelta);

> event.detail
    - 在火狐中 可以获取鼠标滚轮滚动的方向
    - 向上 值为-3
    - 向下 值为3

        event.detail;

---------------------------------

### 定时器
- window对象给我们提供了2个非常好用的方法 - 定时器

> setInterval(function() {}, 毫秒数)
- 按照指定的周期（以毫秒计）来调用函数或计算表达式
- 如果希望一段程序，可以间隔一段时间执行一次，可以使用定时调用, 可以将一个函数 每隔一段时间执行一次

- 参数：
1. 回调函数，该函数会每隔一段时间被调用一次
2. 每次调用间隔的时间，单位是毫秒 1000毫秒 = 1秒
    setInterval(function(){ ... }, 1000);

> 返回值:
返回一个Number类型的数据，返回的数字作为定时器的唯一标识 开一个定时器 返回值是1 开两个就是2，也就是一个页面可能开启N个定时器，就是靠这些返回值来区分


> setTimeout()
- 用于设置一个定时器, 该定时器在定时器到期后执行调用函数
- 在指定的毫秒数后调用函数或计算表达式


> clearInterval()
- 取消 由 setInterval() 设置的timeout
- 可以用来关闭一个定时器，方法中需要一个定时器的标识作为参数

> clearTimeout()
- 取消 由 setTime() 设置的timeout    

---------------------------------

### 回调函数
- 普通函数是按照代码顺序直接调用
- 而这个函数 需要等待时间, 时间到了才去调用这个函数, 因此成为回调函数
- 简单理解, 回调就是回头调用的意思, 上一件事干完, 再回头再调用这个函数

比如: onclick = function 也是回调函数

---------------------------------

### JS的执行机制
> js是单线程
- js语言的一大特点就是单线程, 也就是说, 同一个事件只能做一件事, 这是因为js这门脚本语言诞生的使命所致, js是为了处理页面中的用户的交互, 以及操作DOM而诞生的, 比如我们对某个DOM进行添加和删除操作, 不能同时进行, 应该先进行添加, 之后再删除 要不这个代码还没有呢 怎么删

> 单线程就意味着
- 所有任务需要排队 前一个任务结束, 才会执行后一个任务, 这样所导致的问题是: 如果某一个js代码执行的时间过长, 后面的代码就需要排队, 等好长时间 这样就会造成页面的渲染不连贯, 导致页面渲染加载阻塞的感觉


### 同步 异步
- 为了解决前一个代码执行完 才能执行后一段代码的问题, 我们利用了多核cpu的计算能力, HTML5提出了web worker标准, 允许js脚本创建多个线程, 于是js中出现了同步和异步

> 同步:
- 前一个任务结束后再执行后一个任务, 程序的执行顺序与任务的排列顺序是一致的, 同步的
- 比如: 做饭的同步做法, 我要烧水煮饭, 等水开了(10分钟) 再去切菜 炒菜

> 异步:
- 在做一件事情的时候, 因为这件事情会花费很长时间, 在做这件事的同时, 你还可以去处理其他的事情, 比如做饭的异步做法, 我们在烧水的同时, 利用这10分钟去切菜 炒菜

<!-- 总结: 本质区别就是 这条流水线上各个流程的执行顺序不同 -->


> js为了解决排队或者等待时间较长的问题 把我们的任务分为了两大类

> 同步任务
- 同步任务都在主线程上执行, 形成一个执行栈

> 异步任务
- js的异步是通过回调函数实现的
- 异步任务相关的回调函数 添加到 任务队列中(任务队列也成为消息队列)

- 常见的异步任务
- 普通事件,     onclick
- 资源加载,     load error
- 定时器,       setInterval


<!-- 
    console.log(1);

    setTimeout(function(){
        console.log(2);
    }, 0);

    console.log(3);
 -->

    执行栈                      任务队列        
    console.log(1)              function(){ console.log(3) }

    setTimeout(fn, 0);

    console.log(3)


> js的执行顺序
- 先执行 执行栈中的同步任务
- 异步任务(回调函数)先放到 任务队列中 先不执行

- 一旦执行栈中的所有同步任务执行完毕, 系统就会按次序读取任务队列中的异步任务, 于是被读取的异步任务结束等待状态, 进行执行栈(放入执行栈的下方代码的后面), 开始执行
<!-- 
    任务队列有点像应急车道
    执行栈有点像主车道
 -->

---------------------------------

### URL
- URL全称：Uniform Resource Location 译为：统一资源定位符；
- 是互联网上标准资源的地址, 互联网上每个文件都有一个唯一的url, 它包含的信息指出文件的位置以及浏览器应该怎么处理它

如：
    “http://www.baidu.com/index.html?name=mo&age=25#dowell”

这算是一个比较完整的URL了 ，我就拿这个为例作为讲解；
包括：协议部分、域名、端口、路径（虚拟路径）、携带的参数、哈希值；

> url一般的语法格式
- protocol://host[:port]/path/[?query]#fragment
- http://www.itcast.cn/index.html?name=andy&age=18#link

> protocol  通信协议 常用的http ftp matito等
> host      主机(域名) www.itheima.com
> port      端口号 可选 省略时使用方案的默认端口 如http默认端口80
> path      路径由零或多个/符号隔开的字符串, 一般用来表示主机上的一个目录或文字地址

> query     参数, 以键值对的形式 通过&符号分隔开来
> fragment  片段 #后面内容 常见于链接 锚点


> 协议部分：http https；
传输协议是用来完成客户端和服务器端之间数据传输的；这个使用的是http协议，在internet中可以使用多种协议，
如：http  ftp等，本例中使用的是http协议，http后面. 为“//”为分隔符；


>> http协议：
客户端和服务器端传输的内容除了文本以外，
还可以传输图片、音频和视频等文件流（二进制编码 | base64码），以及XML格式的数据等，是目前应用最广泛的。


>> https协议：
https它比http更加安全，因为数据内容的传输通道是经过SSL加密的（需要在服务器端进行特殊的处理），涉及金融类的网站一般都是使用https;


>> ftp资源文件传输协议：
用于客户端把资源文件（不是代码）上传到服务器端，
或者从服务器端下载一些资源文件（一般传输的内容会比http这类协议传输的内容多）


> 域名：www.baidu.com
- 网站的域名，baidu.com为一级域名，www为服务器；

1. 用于解析对应的IP地址，便于记忆（ 一个URL中也可以使用IP地址作为域名使用）；
2. 顶级域名（一级域名）：baidu.com;
3. 二级域名：www.baidu.com    sports.baidu.com    ai.baidu.com；
4. 三级域名：my.sports.baidu.com;


> 端口：在没有填写的情况下默认端口就是80；
- 在服务器发布项目的时候，我们可以通过端口号区分当前服务器上不同的项目。
如：www.baidu.com:8080，一台服务器的端口号取值范围在 0 ~ 65535 之间，
如果电脑上安装了很多程序，有一些端口号是被占用的；

- 端口不是一个URL必须的部分 如果省略端口部分将采用默认端口，
- 如果有的话就是跟在域名后面的就是端口（www.baidu.com:80），域名和端口之间使用“ ：”作为分隔符；
<!-- 
    http：默认端口号80 ；    https：默认端口号443  ；  ftp：默认端口号21 
-->

- 对于以上三个端口号其实很重要，如果被其他程序占用，则我们就不能使用了，所以服务器上一般是禁止安装其他程序的。

> 路径（虚拟路径）：index.html虚拟目录；
（ http://www.baidu.com/路径1/路径2 ；    “ / ”表示根目录）

- 在服务器中发布项目的时候，我们一般都会配置一些默认文档，
即使用户不输入文件的名称，服务器也会默认找到配置好的文档（一般默认文档都是index.**）；
- 为了做SEO优化，会把一些动态页面的地址（xxx.php、xxx.aspx、xxx.asp、 xxx.jsp）进行URL重写（需要服务器处理）。


> 携带的参数：?name=mo     多个参数用&连接；


> 问号传参（可有可无）
- 把一些值通过 “key=value” 的方式放在一个URL的末尾，通过?传递；
- 作用：
- 在ajax请求中，我们可以通过问号传递参数的方式，在客户端把一些信息传递给服务器，服务器根据传递信息的不一样，返回不同的数据；

- 清除ajax get方法的缓存，?math_random=0.123456；
- 通过URL传递参数的方式，实现页面之间的通信；


> 哈希值：#dowell；HASH值（可有可无）
- 作用：
1. 可做页面中的锚点定位
2. 在单页应用开发中作为前端路由使用（Vue Router、React Router）；

---------------------------------

### 动画函数

> 动画实现原理
- 通过定时器 setInterval() 不断移动盒子的位置

> 实现步骤:
1. 获得盒子当前的位置
2. 让盒子在当前位置的基础上 再加一个移动距离
3. 然后利用定时器不断重复这个操作
4. 加一个结束定时器的条件
5. 注意此元素需要添加定位, 才能使用ele.style.left

---------------------------------

### 动画函数的简单封装
- 注意函数需要传递2个参数, 动画对象 和 移动距离

> 给不同的元素记录不同的定时器
- 如果多个元素都使用这个动画函数, 每次都要var声明定时器, 我们可以给不同的元素使用个不同的定时器(自己专门用自己的定时器)

- 核心原理:利用js是一门动态语言, 可以很方便的给当前对象添加属性

    function animate(obj, taret) {
        obj.timer = setInterval(function() {
            if(obj.offsetLeft >= target) {
                clearInterval(obj.timer);
            }
            obj.style.left = obj.offsetLeft + 1 + 'px';
        }, 30)
    }

---------------------------------

### 缓动效果原理
- 缓动动画就是让元素运动速度有所变化, 最常见的是让速度慢慢停下来
- 让元素的运动速度 有一定的变化 比如我们停车前后会踩刹车

- 思路:
- 1. 让盒子每次移动的距离慢慢变小, 速度就会慢慢的降下来

> 核心算法: (目标值 - 现在的位置) / 10 作为每次移动的距离 (我们称之为步长)
> obj.style.left = obj.offsetLeft + ((target - obj.offsetLeft) / 10) + 'px';

> 注意: 步长值一定要写在定时器里面 这样才能不断的更新最新的位置

<!-- 
    匀速运动:
    盒子在0的位置, 目标位置为100, 每次步长为10  ---  这就是匀速运动

    缓速运动
    (目标值 - 现在的位置) / 10

    (100 - 0) / 10  = 10
    (100 - 10) / 10  = 9
    (100 - 19) / 10  = 8.1

    定时器每次都会获取到现在的位置, 因为现在位置的值不断增加, 步长就会不断减少
 -->

- 2. 停止的条件: 让当前盒子位置等于目标位置就停止定时器

<!-- 
    移动函数:
    function animate(obj, taret) {
        obj.timer = setInterval(function() {

            // 步长值
            let step = (target - obj.offsetLeft) / 10;
            if(obj.offsetLeft >= target) {
                clearInterval(obj.timer);
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 30)
    }

    之所以是匀速运动就是因为
    obj.style.left = obj.offsetLeft + 1 + 'px';

    1的值是固定的, 我们把这个步长值改为一个慢慢变小的值
    obj.style.left = obj.offsetLeft + step + 'px';
 -->

> 匀速动画 就是 盒子当前的位置 + 固定的值
> 缓动动画 就是 盒子当前的位置 + 变化的值(目标位置 - 现在位置) / 10
<!-- 变化在值 在定时器里面写 -->

> 当是正方向的时候:
- 对步长值取整 使用向上取整Math.ceil((target - obj.offsetLeft) / 10);
<!-- 假如是8.1 我们要让它是9 而不是8, 往前走 不要让它往后倒 -->

> 当是反方向的时候:
- 对步长值取整 使用向下取整Math.floor((target - obj.offsetLeft) / 10);
<!-- 假如是-8.1 我们要让它是-9 而不是-8, 往前走 不要让它往后倒 -->

> 而且这种写法不用判断speed是正还是负的问题
- 如果是回退的话  (目标位置 - 现在位置) / 10    的计算结果会是 负数

> 因为考虑到两个条件(是正方向 还是反方向) 所以我们要判断
- step = step > 0 ? Math.ceil(step) : Math.floor(step);

> 整理后:
<!-- 
    function animate(obj, target) {
        obj.timer = setInterval(function() {

            // 步长值
            let step = (target - obj.offsetLeft) / 10;
            // 避免停的不准的情况发生, 我们要对小数的步长值取整, 因为是两个方向的原因 我们要对两种情况来进行判断
            step = step > 0 ? Math.ceil(step) : Math.floor(step);

            if(obj.offsetLeft >= target) {
                clearInterval(obj.timer);
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15)
    }
 -->
> 注意: 终止定时器的条件不要写成 >= 而是== 要不会出问题


### 缓动动画中添加 回调函数
> 回调函数
- 上一件事件执行完毕后 才会调用回调函数

> 回调函数原理:
- 函数可以作为一个参数, 将这个函数作为参数传到另一个函数里面, 当那个函数执行完后, 再执行传进去的这个函数, 这个过程就叫做回调

> 需求: 当移动到800后变色, 这里就用到了回调函数
<!-- 
    就看这个函数: 如果添加回调函数

    function animate(obj, target, callback) {
        clearInterval(obj.timer);
        obj.timer = setInterval(function () {
            let step = (target - obj.offsetLeft) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            if (obj.offsetLeft == target) {
                clearInterval(obj.timer);
                callback && callback();
            }
            obj.style.left = obj.offsetLeft + step + 'px';
        }, 15);
    }

    调用的时候
    animate(div, 800, function(){ ... });


    接下来是回调函数在哪去调用
    >>> 定时器结果的位置调用 去找判断条件里

    当进入这个条件, 代表前一个函数结束, 在这里调用
    if(obj.offsetLeft >= target) {
        clearInterval(obj.timer);
        callback && callback();
    }
 -->


### 动画函数的封装
- 以后有经常要使用的函数, 可以封装到一个js文件中 然后用的时候引入这个js文件

- 1. 新建js文件
- 2. 粘贴代码

> 小案例:
- 需求: 鼠标经过div 里面滑动出去一条信息框
<!-- 
    html结构
    <div class='sliderbar'>
        <span>←</span>
        <div class='con'>问题反馈<>
    </div>

    鼠标经过sliderbar con滑动到左侧

    - 当动画执行完毕后 ← 变为 →
    这时候就要用到回调函数了, 因为是动画执行完了 才改变 箭头的方向

    animate(con, -160, function(){
        当动画执行完毕后 ← 变为 →
        sliderbar.children[0].innerHTML = '→';
    })
 -->

---------------------------------

### 类的操作

<button id="btn01">点击按钮以后修改box的样式</button>
<br /><br />
<div id="box" class="b1 b2"></div>

window.onload = function(){
var box = document.getElementById("box");
var btn01 = document.getElementById("btn01");

btn01.onclick = function(){

> style修改元素样式
- 通过style属性来修改元素的样式，每修改一个样式，浏览器就需要重新渲染一次页面 这样执行的性能是比较差的，而且这种形式当我们要修改多个样式时，也不太方便

    box.style.width = "200px";
    box.style.height = "200px";
    box.style.backgroundColor = "yellow";
<!-- 
    上面是js直接修改css样式吧 js是行为 css是表现 这么一改 行为和表现又耦合了 
-->

<!-- 
    我希望一行代码 可以同时修改多个样式, 这个box的样式都是通过b1的class设置的 
-->
    .b2{
        height: 300px;
        background-color: yellow;
    }
<!-- 我创建一个classb2，假如我将box的class修改为b2, 样式是不是就变了 -->
    box.className = "b2";

<!-- 
    我们可以通过修改元素的class属性来间接的修改样式 这样一来，我们只需要修改一次，即可同时修改多个样式， 浏览器只需要重新渲染页面一次，性能比较好， 并且这种方式，可以使表现和行为进一步的分离 
-->

<!-- 
    现在我不想修改width 我只想该height 和 background 这样一改 box宽度100%了 因为b1的样式去了 去了之后b1的样式都没了 但是有的时候 我不希望去掉b1 只希望加上b2 也就是在原有值的基础上增加b2 
-->

    box.className += "b2";      //都没了 因为classname 变成"b1b2"了
    box.className += " b2";     //b2的前面要加个空格 别忘了


> 自定义给对象添加类的函数
- 参数：
    1. 给谁加 obj 要添加class属性的元素
    2. cn 要添加的class值 

    function addClass(obj, cn){
        obj.className += " " + cn;
    };

<!-- 
    有没有什么问题, 点一下 加进去了 class="b1 b2"
    多点几下后class="b1 b2 b2 b2 b2 b2 b2 b2 b2 b2 b2", 有了一次b2后 就不要加了 有没有个方法能判断下 这个class里有没有b2 
-->

> 自定义 检查元素的类名中是否已有 要设置的类名
- 判断一个元素中是否含有指定的class属性值, 如果有该class，则返回true，没有则返回false
- 参数
1. obj 要判断的元素
2. cn class的名 换句话说就是判断obj中有没有cn

function hasClass(obj, cn){

<!-- 判断obj中有没有cn class, 创建一个正则表达式 -->
<!--
    var reg = /\bb2\b/; 上面用字面量创建的 就写死了, 因为有变量 所以换下面的 
 -->
    var reg = new RegExp("\\b"+cn+"\\b");
    return reg.test(obj.className);
};

function addClass(){
<!-- 检查obj中是否含有cn -->
    if(!hasClass(obj , cn)){
<!-- 如果有就不管了, 没有的话往里加吧 所以要写成!hasClass(obj , cn) -->
        addClass(obj , cn);
    };

<!-- 
    还有什么问题？, 我觉得还需要一个删除一个类的功能, 删除元素中指定的class属性, 怎么删 把b2 替换成一个 空串, 是不是还得创建一个正则表达式 
-->

> 自定义删除一个类
    function removeClass(obj , cn){
<!-- //创建一个正则表达式 -->
    var reg = new RegExp("\\b"+cn+"\\b");
    
<!-- //删除class -->
    obj.className = obj.className.replace(reg , "");
}

    toggleClass可以用来切换一个类, 如果元素中具有该类，则删除, 如果元素中没有该类，则添加


> 自定义切换一个类
    function toggleClass(obj , cn){
    
<!-- //判断obj中是否含有cn -->
    if(hasClass(obj , cn)){
<!-- //有，则删除 -->
        removeClass(obj , cn);
    }else{
<!-- //没有，则添加 -->
        addClass(obj , cn);
    }
    };
};

-------------------------------------

### JSON

- 创建一个对象
var obj = {name:"孙悟空"};
<!-- 以前说过 写属性名的时候 可以加引号或者不加 加了也不算错 name "name" -->

var obj = {
    "name":"孙悟空",
    "age":18,
    "gender":"男"
};

console.log(obj.age);

> obj 和 json之间的关系
- 以后我们开发的时候 不是只有一个页面 往往有前端和后台服务器, 网页和服务器之间要交互数据

<!-- 
    现在我要把上面的对象传递给服务器 服务器是java写的能传过去么？不能传 js 和 java互相不认识, 也就是js中的对象只有js自己认识，其他的语言都不认识，现在的问题就是 需要把对象传递给java, 能不能将这个对象 转换成 所有语言都认识的东西, 既然对象不认识 能不能将这些东西转换成 大家都认识的东西呢 比如 number string boolean, 那给对象 转换为 字符串
 -->

var obj = {
    "name":"孙悟空",
    "age":18,
    "gender":"男"
};

<!-- 转换 -->

var obj = "{
    "name":"孙悟空",
    "age":18,
    "gender":"男"
}";

> JSON就是一个特殊格式的字符串，这个字符串可以被任意的语言所识别，
- 并且可以转换为任意语言中的对象，JSON在开发中主要用来数据的交互

> JSON
- JavaScript Object Notation JS对象表示法
- JSON和JS对象的格式一样，只不过JSON字符串中的属性名必须加双引号, 其他的和JS语法一致

> JSON的写法：
1.对象 {}
    var obj = '{"name":"孙悟空", "age":18, "gender":"男"}';

2.数组 []
    var arr = '{1,2,3}'; 

- JSON中允许的值：
1.字符串
2.数值
3.布尔值
4.null
5.对象(普通对象)
6.数组

<!-- 函数和undefined不行 函数只有js自己认识 -->

<!-- 
    json对象写好了，数据到后台了 那怎么才能用？
    要是想取的话 得把var obj = '{"name":"孙悟空", "age":18, "gender":"男"}'; 
    转换为对象, 我需要一个方法 将一个字符串 转换为 对象

    将JSON字符串转换为JS中的对象, 在JS中，为我们提供了一个工具类，就叫JSON
    这个对象可以帮助我们将一个JSON转换为JS对象，也可以将一个JS对象转换为JSON
 -->


var json = '{"name":"孙悟空", "age":18, "gender":"男"}'; 

### json --> js对象

> JSON.parse()
- 可以将以JSON字符串转换为js对象
- 它需要一个JSON字符串作为参数，会将该字符串转换为JS对象并返回
    
    var o = JSON.parse(json);   //它的返回值应该是对象
    console.log(o.age);



var obj3 = {name:"猪八戒" , age:28 , gender:"男"};

### JS对象 ---> JSON
> JSON.stringify()
- 可以将一个JS对象转换为JSON字符串
- 需要一个js对象作为参数，会返回一个JSON字符串
    
    var str3 = '{"name":"孙悟空","age":18,"gender":"男"}';
    JSON.stringify(str3);

<!-- JSON这个对象在IE7和以下浏览器不支持，所以在这些浏览器中会报错 -->

<!-- 整个JSON -->
var str = '{"name":"孙悟空","age":18,"gender":"男"}';

> IE7和以下浏览器
> eval()
- 这个函数可以用来执行一段字符串形式的JS代码，并将执行结果返回
- 如果使用eval()执行的字符串中含有{},它会将{}当成是代码块
<!-- 如果不希望将其当成代码块解析，则需要在字符串前后各加一个() -->
    var str = '({"name":"孙悟空","age":18,"gender":"男"})';

- eval()这个函数的功能很强大，可以直接执行一个字符串中的js代码，
    但是在开发中尽量不要使用，首先它的执行性能比较差，然后它还具有安全隐患

        var str2 = "alert('hello');";
<!-- 这是个字符串吧 字符串中是alert代码吧 -->

<!-- 但是我就想让上面的代码执行, 这时候我们就可以用eval() -->
    eval(str2);

<!-- 
    那现在我想把var str = '{"name":"孙悟空","age":18,"gender":"男"}';, 转换为js对象啊
 -->
    eval(str);      //报错了 缺少分号 问题在{}这
        
    var str = '({"name":"孙悟空","age":18,"gender":"男"})';
<!-- 也可以写成下面这样 -->
    var obj = eval("("+str+")");
        
<!-- 如果需要兼容ie7以及以下的json操作，则可以通过引入一个外部的js文件来处理, 外部文件 叫 json2.js -->


---------------------------------

### 移动端的事件

### 触屏事件概述
- 移动端浏览器兼容性较好, 我们不需要考虑以前js的兼容性问题, 可以放心的使用原声js书写效果, 但是移动端也有自己独特的地方, 比如 触屏事件 touch, android 和 ios都有

- 移动端没有鼠标的概念
- touch对象代表一个触摸点, 触摸点可能是一根手指 也可能是一根触摸笔, 触屏事件可响应用户手指(或触控笔)对屏幕或者触控板操作

> touchstart 事件
- 相当于click事件
<!-- 
    div.addEventListener('touchstart', function(){});
 -->

> touchmove 事件
- 相当于mousemove事件

> touchend 事件
- 相当于mouseup


### 触摸事件对象(TouchEvent)
- TouchEvent是一类描述手指在触摸平面(触摸屏, 触摸板等)的状态变化的时间, 这类事件用于描述一个或多个触点, 使开发者可以检测触点的移动 触点的增加 和 减少等
<!-- 
    比如手指移动了多少像素啊 有几个手指啊
 -->

- touchstart touchmove touchend 三个事件都会有各自的事件对象

### 触摸事件列表
> TouchEvent.touches
- 正在触摸屏幕的所有手指的一个列表 能得到所有的触摸点(检测屏幕)
<!-- 
    一个手指是0 length为1
    如果监听的是DOM元素 touches 和 targetTouches是一样的
 -->

> TouchEvent.targetTouches
- 正在触摸当前DOM元素上的手指的一个列表(检测DOM元素)
<!-- 
    有几个手指在触摸我的div
 -->

> TouchEvent.changedTouches
- 手指状态发生了改变的列表, 从无到有 从有到无
<!-- 
    原来屏幕上没有手指 有了手指, 或者 有手指 然后离开了
 -->

> 当我们手指离开屏幕的时候, 就没有了touches 和 targetTouches 但是会有changedTouches

> 因为我们一般都是触摸元素, 所以最经常使用的是 targetTouches

> 因为是一个手指列表 当我们得到某个触点(手指)的话 可以event.targetTouches[0]
<!-- 
    targetTouches[0] 就可以得到正在触摸dom元素的第一个手指的相关信息
    比如:
    手指的坐标等等
    clientXY
    pageXY
    screenXY

    target:div 正在触摸div这个元素
 -->

---------------------------------

### 案例 移动端拖动
- touchstart touchmove touchend可以实现拖动元素
- 但是拖动元素需要当前手指的坐标值, 我们可以使用 targetTouches[0]里面的pageX, pageY
- 移动端拖动的原理: 手指移动中, 计算出手指移动的距离, 然后用盒子原来的位置 + 手指移动的距离

- 没办法拿到手指的移动距离, 但是我们得到手机的当前坐标
- 手指移动的距离: 手指滑动中的位置 减去 手指刚开始触摸的位置
<!-- 
    比如第一次触摸div的时候位置是10px 然后手指移动到了30px的位置上 30-10移动了20px的距离
 -->


> 拖动元素三部曲:
1. 触摸元素 touchstart: 获取手指初始坐标, 同时获得盒子原来的位置
2. 移动手指 touchmove:  计算手指的移动距离, 并且移动盒子
3. 离开手指 touchend
<!-- 
    注意: 手指移动也会触发滚动屏幕所以这里我阻止默认的屏幕滚动
    event.preventDefault();
 -->


let div = document.querySelector('div');
// 计算手指的初始坐标 盒子的初始位置 应该在全局范围来定义, 因为另一个move的函数也要使用它
let startX = 0;
let startY = 0;

// 盒子原来的位置
let x = 0;
let y = 0;

div.addEventListener('touchstart', function(e){
    
<!-- 当手指点击屏幕上的初始位置, 用第一根就可以 -->
    startX = e.targetTouches[0].pageX;
    startY = e.targetTouches[0].pageY;

<!-- 盒子原来的位置 -->
    x = this.offsetLeft;
    y = this.offsetTop;
})

div.addEventListener('touchmove', function (e) {
<!-- 计算手指的移动距离 手指移动之后的坐标 - 手指初始的坐标 -->
<!-- 手指不断的移动就能得到最新的坐标e.targetTouches[0].pageX -->
    let moveX = e.targetTouches[0].pageX - startX;
    let moveY = e.targetTouches[0].pageY - startY;

<!-- 移动盒子 盒子原来的位置 + 手指移动的距离 -->
    this.style.left = x + moveX + 'px';
    this.style.top = y + moveY + 'px';

<!-- 取消滚动屏幕的默认行为 -->
    e.preventDefault();
})

<!-- 松开手move就停止了不像pc端还要用到onmouseup -->

---------------------------------

### 移动端常见特效

### 案例 移动端的轮播图

> 移动端移动, 可以使用translate 移动
> 无缝滚动的要点:
- 我们要实现无缝滚动 就要当自动播放到最后一张1的时候, 让它跳到其实是第二张的1, 但是我们的缓动效果是用过渡实现的, 只要有过渡 就是有时间的消耗 时间还没到, 过渡还没有走完 就开始判断是不合适的

- 所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
<!-- 
    ul.style.transition = 'all .3s';
 -->
- 此时我们要使用 transitionend 事件 检测过渡是否完成


- 移动端轮播图功能基本和pc端一致
1. 可以自动播放图片
2. 手指可以拖动播放轮播图

> 要点:
1. 用手在轮播图上可以左右拉动, 所以在html的结构里 4 1 2 3 4 1 在图片的前后分别要插入一张图片
<!-- 
    <ul id='imgBox' class='test'>
        <li>
            <div class='item'>3</div>
        </li>
        <li>
            <div class='item'>1</div>
        </li>
        <li>
            <div class='item'>2</div>
        </li>
        <li>
            <div class='item'>3</div>
        </li>
        <li id='last-li'>
            <div class='item' id='last-item'>1</div>
        </li>
    </ul>
 -->

2. ul的宽度
- 5张图片可以把ul的width设置为500%, 但是img的width如果设置为100%的话, 效果也会显示为500%, 所以我们手动给li也设置宽度为20%


> 案例分析:
- 1. 自动播放功能
- 2. 开启定时器
- 3. 移动端移动, 可以使用translate 移动
- 4. 想要图片优雅的移动, 请添加过渡效果

> 无缝滚动
- 1. 我们判断条件是要等到图片滚动完毕再判断, 就是过度完成后判断
- 2. 此时需要添加检测过渡完成事件 transitionend
- 3. 判断条件: 如果索引号等于3 说明走到了最后一张图片, 此时索引号要复原为0  
- 4. 此时我们要给它去掉过渡效果, 
- 5. 如果索引号小于0 说明是倒着走, 索引号等于2
- 6. 此时图片, 去掉过渡效果, 然后移动

> 导航点的新做法
- 小圆点跟随变化效果
- 把ol里面li带有current类名的选出来去掉类名remove
- 让当前索引号的小li添加current add
- 但是 也是要等着过渡结束之后变化, 所以这个写到transitionend事件里面

> 手指滑动轮播图
- 本质就是ul跟随手指移动, 简单的说就是移动端拖动元素
<!-- 
    // 复习下:
    当手指触摸到这个元素, 拿到手指的初始坐标, 当手指移动的时候会拿到移动之后手指的坐标 让两个坐标相减就能得到手指的移动距离 然后盒子在原来的基础上加上移动的距离盒子就实现移动效果了 
-->
- 触摸元素 touchatart:  获取手指的初始坐标
- 移动手指 touchmove:   计算手指的滑动距离 并且移动盒子

> 手指拖动图片时的吸附效果
- 当拖动ul的程度小于某个值的时候 就会回到原来的图片
- 当拖动ul的程度大于某个值的时候 就会到目标图片

- 离开手指touchend      根据滑动的距离分不同的情况
- 如果移动距离小于50px 就回弹原来的位置
- 如果移动距离大于50px 就上一张下一张滑动

<!-- 
    // 获取元素
    let focus = document.querySelector('.focus');
    let ul = focus.children[0];

    // 获得focus的宽度
    let w = focus.offsetWidth;

    // 利用定时器自定轮播
    let index = 0;
    let timer = setInterval(function(){
        // 外面定义了一个index变量 让这个变量每次++, ul的移动距离就是index*图片的宽度
        index++;
        let translatex = -index * w;

        ul.style.transition = 'all .3s';
        ul.style.transform = `translateX(${translatex})`;
    },1000)

    
    // 无缝滚动, 当到最后一张1的时候 快速掉到其实是第二张的1
    无缝滚动的要点:
    我们要实现无缝滚动 就要当自动播放到最后一张1的时候, 让它跳到其实是第二张的1, 但是我们的缓动效果是用过渡实现的, 只要有过渡 就是有时间的消耗 时间还没到, 过渡还没有走完 就开始判断是不合适的

    所以我们判断条件是要等到图片滚动完毕再去判断, 就是过渡完成后判断
    此时我们要使用 transitionend 事件 检测过渡是否完成

    // 我们检测ul 因为它做的过渡效果 和 移动
    ul.addEventListener('transitionend', function(){
        // 走到最后一张再后退, 那怎么知道走到了最后一张呢?
        我们可以通过index判断, 页面一上来我们看到的第一张就是0
        3 1 2 3 1
          0 1 2 3 -- > 索引号
        所以当走到索引号为3的时候我们就跳到0

        if(index >= 3) {
            index = 0;
            // 去掉过渡效果, 这样让我们的ul 快速的跳到目标位置
            ul.style.transition = 'none';
            // 重新计算 按照最新的index滚动, 用我们最新的index * 图片的宽度
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;
        } else if(index < 0) {
            还有一种特殊情况, 如果处于第一张的时候 我们往右拉会出现倒着的情况
            3 1 2 3 1
            在1的时候往右拉 会到3
            1的索引号是0 要是倒着走的话 肯定是一个负数才对 -1
            如果索引号小于0 肯定是倒着走的, 当到3的时候 迅速的跳到右手倒数第二张(索引号是2的身上)

            index = 2;
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;

            // 导航点的部分
            以前的做法是利用for循环 先把active类去掉 再让当前的小li添加类

            // 把ol(导航点的容器)里面的li带有current类名的选出来, 去掉类名 remove
            ol.querySelector('.current').classList.remove('current');

            // 让当前索引号的小li 加上current add
            ol.children[index].classList.add('current');
        }
    });

    // 手指滑动轮播图
    // 触摸元素 touchstart: 获取手指初始坐标
    let startX = 0;
    let moveX = 0;  后面要使用这个移动距离所以定义全局变量

    ul.addEventListener('touchstart', function(e){
        startX = e.targetTouches[0].pageX;

        // 在手指拉动图片的时候是不需要轮播效果的
        clearInterval(timer)
    })
    // 移动手指 touchmove 计算手指的滑动距离 并且移动盒子
    ul.addEventListener('touchmove', function(e){
        // 计算移动距离
        moveX = e.targetTouches[0].pageX - startX;
        // 移动盒子: 盒子原来的位置 + 手指移动的距离
        // -index*w 是ul的原来位置, 因为滚动到第几张就是index*w
        let translatex = -index*w + moveX;
        // 手指拖动的话 是一点点的拖 所以不需要做动画效果
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${translatex})`;
    })

    // 手指离开, 根据移动距离去判断是回弹还是播放上下一张
    // 不管回弹还是滑动过去都是等到手指离开的时候发生的
    ul.addEventListener('touchend', function(e){
        // 如果移动距离大于50px 就播放上下一张
        // 因为moveX是手指移动的距离 是根据两次触摸点的不同差值求出来的 所以可能是一个负值 这里我们不管正还是负 只要是大于50就可以 所以取绝对值
        if(Math.abs(moveX) > 50) {
            // 播放上一张还是下一张呢?
            // 手指右滑是上一张 因为moveX是正值
            // 手指左滑是下一张 因为moveX是负值
            if(moveX > 0) {
                index--;
            } else {
                index++;
            }
            
            // 求最新的index的值
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        } else {
            // 如果拖动小于50px 那就回弹到当前的图片
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        }

        // 当手指离开的时候 我们再开启定时器
        // 但是开启之前我们要清除上一个定时器, 保证页面中只有一个定时器
        clearInterval(timer);

        // 重新开启定时器 把上面的代码复制一下
        timer = setInterval(function(){
            index++;
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        },1000)
    })
 -->

> 有一种情况 当我们点击轮播上的时候 不想拖动, 所以就没必要计算里面的代码(moveX>50<50什么的)
<!-- 
    这么我们就在外面声明一个全局变量
    let flag = false;

    只有我们手指移动过了 我们才让它计算, 否则不用
    // 我们声明一个全局变量 定为false, 在move逻辑里修改为true 意思是只有移动过了才用计算 否则不用
    let flag = false;

    let focus = document.querySelector('.focus');
    let ul = focus.children[0];
    let w = focus.offsetWidth;

    let index = 0;
    let timer = setInterval(function(){
        index++;
        let translatex = -index * w;
        ul.style.transition = 'all .3s';
        ul.style.transform = `translateX(${translatex})`;
    },1000)

    
    ul.addEventListener('transitionend', function(){

        if(index >= 3) {
            index = 0;
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;
        } else if(index < 0) {
            index = 2;
            ul.style.transition = 'none';
            let translatex = -index * w;
            ul.style.transform = `translateX(${translatex})`;

            ol.querySelector('.current').classList.remove('current');
            ol.children[index].classList.add('current');
        }
    });

    let startX = 0;
    let moveX = 0;

    ul.addEventListener('touchstart', function(e){
        startX = e.targetTouches[0].pageX;
        clearInterval(timer)
    })


    ul.addEventListener('touchmove', function(e){
        moveX = e.targetTouches[0].pageX - startX;
        let translatex = -index*w + moveX;
        ul.style.transition = 'none';
        ul.style.transform = `translateX(${translatex})`;

        // 在这里修改为true 如果用户手指移动过我们再去判断否则不做判断效果
        flag = true;

        // 取消拖动手指会滚动屏幕的默认行为
        e.preventDefault(); 
    })


    ul.addEventListener('touchend', function(e){

        // 在这里根据flag来 进行 相应内容的进行, 如果flag是true 那就是代码移动过了 再进行下面的逻辑判断
        if(flag) {
            if(Math.abs(moveX) > 50) {
                if(moveX > 0) {
                    index--;
                } else {
                    index++;
                }
                
                let translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = `translateX(${translatex})`;
            } else {
                let translatex = -index * w;
                ul.style.transition = 'all .3s';
                ul.style.transform = `translateX(${translatex})`;
            }
        }
        

        clearInterval(timer);

        timer = setInterval(function(){
            index++;
            let translatex = -index * w;
            ul.style.transition = 'all .3s';
            ul.style.transform = `translateX(${translatex})`;
        },1000)
    })
 -->


### 案例 移动端的返回顶部
- 当页面滚动到某个地方 就显示 返回顶部的按钮 否则隐藏

> 案例分析 
- 页面滚动到某个地方, 我们需要事件 scroll 页面滚动事件
- 只要屏幕滚动就会产生一个卷进去的头部, 虽然有兼容性的问题 但是我们是移动端所有没问题

- 点击 window.scroll(0,0) 返回顶部
<!-- 
    比如到 div7的位置上 让返回按钮显示 卷进去的头部的的值 如果 > div的offsetTop
 -->

<!-- 
    // 返回顶部模块的制作
    let goBack = document.querySelector('.goBack');
    let nav = document.querySelector('nav');

    window.addEventListener('scroll', function(e){
        if(window.pageYoffset >= nav.offsetTop) {
            goBack.style.display = 'block';
        } else {
            goBack.style.display = 'none';
        }
    })

    goBack.addEventListener('click', function(e){
        window.scroll(0,0);
    })
 -->

---------------------------------

### 移动端 Click事件 延时解决方案
- 移动端 click 事件会有300ms的延时, 原因是移动端屏幕双击会缩放(double tap to zoom) 页面
- 它会看再300ms之内有没有点击两下, 如果没有就当做点击事件来处理
<!-- 
    因为屏幕可以放大 双指拉动, 缩小的时候双击屏幕
 -->
- 那我就想点击一下马上执行 不要等300ms应该怎么办?

> 解决方式
- 1. 禁用缩放, 浏览器禁用默认的双击缩放行为 并且去掉300ms的点击延迟
<!-- 
    <meta name='viewport' content='user-scalable=no'>

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
 -->

- 2. 如果有的页面要求有缩放的功能, 我们就不能添加刚才的内容, 我们利用touch事件自己封装这个事件解决300ms延迟的问题
    - 原理:
    - 当我们手指触摸屏幕, 就记录当前触摸的时间
    - 当我们手指离开屏幕, 又会产生一个时间, 用离开的时间减去触摸的时间
    - 如果时间小于150ms 并且没有滑动过屏幕 那么我们就定义为点击

<!-- 
    // 封装tap 解决click 300ms 延迟
    function tap(obj, callback) {

        // 不移动我们的手指永远是false
        let isMove = false;

        let startTime = 0;  //记录触摸时候的时间变量
        obj.addEventListener('touchstart', function(e) {

            // 记录触摸时间, 只要触摸元素就把这个时间记入下来
            startTime = Date.now();     
        })
        obj.addEventListener('touchmove', function(e) {
            isMove = true;     // 看看是否有滑动 有滑动算拖拽 不算点击
        })
        obj.addEventListener('touchend', function(e) {

            // 手指离开的时候也有一个时间Date.now()
            if(!isMove && (Date.now()-startTime) < 150) {
                // 如果手指触摸和离开时间小于150ms算点击
                callback && callback();   // 执行回调函数
            }
            isMove = false;
            startTime = 0;
        })
    }

    // 调用
    tap(div, function() {  执行代码 ... })
 -->    

> 方法2 一次只能给一个元素解决这个问题 如果页面有100个元素 就得调用100次

> 方法3
- 为了解决方案2的弊端 我们可以使用插件 fastclick插件解决300ms延迟
- GitHub官网: https://github.com/ftlabs/fastclick

> 使用方法:
- 引入js文件
- 把这个代码复制到页面中, 就ok了
<!-- 如果document有addEventListener的方法 -->
    if ('addEventListener' in document) {
        document.addEventListener('DOMContentLoaded', function() {
            FastClick.attach(document.body);
        }, false);
    }

---------------------------------

### 移动端常用的开发插件
> Swiper
- https://www.swiper.com.cn

- 引入插件相关文件
- 按照规定语法使用

> superslide
- http://www.superslide2.com
- 网站上常用的“焦点图/幻灯片”“Tab标签切换”“图片滚动”“无缝滚动”等只需要一个SuperSlide即可解决！

> iscroll
- https://github.com/cubiq/iscroll


> 移动端视频插件 zy.media.js
- https://github.com/ireaderlab/zyMedia

- h5给我们提供了video标签, 但是浏览器的支持情况不同
- 不同的视频格式文件, 我们可以通过source解决
- 但是外观样式, 还有暂停 播放 全屏等功能我们只能自己写代码解决, 这个时候我们可以使用插件方式来制作

---------------------------------

### 移动端常用的开发框架
- 框架
- 就是一套架构, 它会基于自身的特点想用户提供一套较为完整的解决方法, 框架的控制权再框架本身, 使用者要按照框架所规定的某种规范进行开发

- BootStrap 可以做轮播图

---------------------------------

### ES5中新增的方法

### ES5中新增的数组方法
- 下面的方法都是根据true和false来继续判断的 都是在内部添加return true


> arr.forEach(function(value, index, arr) { ... })
- 遍历数组
- 参数:
    - value:    数组当前的值
    - index:    数组当前的索引
    - arr:      数组对象本身
<!-- 
    let arr = [1, 2, 3];
    let sum = 0;
    arr.forEach(function(value, index, arr) {
        sum += value;
    })
 -->

<!-- 
    它内部的下标控制不了

    举个例子来说
    要是用for循环删除一个数组中的元素
    我可以这样
    let arr = [1, 2, 3];
    for(let i=0; i<arr.length; i++) {
        arr.splice(i, 1);
        i--;
    }
    console.log(arr);
    我可以循环走完一轮 i--下 能控制下标

    但是forEach不行
    let arr = [1, 2, 3];
    arr.forEach(function(value,index){
        arr.splice(index, 1);
        index--;
    })
    console.log(arr);
    forEach内部会让index++ 我控制不了

    https://www.cnblogs.com/echolun/p/11544045.html
 -->

> arr.filter(function(value, index, arr) { ... })
- filter的回调函数的要求: 必须返回一个布尔值
    如果为true 函数内部会自动将这次回调的value 加入到新的数组中
    如果为false 函数内部会过滤掉这次的value

- 每遍历一次元素就会执行一次这个回调函数

\\\\ → 主要是用于筛选数组的
- 注意它直接返回一个新的数组

- 参数
    - value:    数组当前的值
    - index:    数组当前的索引
    - arr:      数组对象本身
<!-- 
    筛选大于20的元素

    let arr = [12, 66, 4, 88];
    
    返回的是一个数组 创建一个变量用来接收
    let result = arr.filter(function(value, index, arr) {
        return value >= 20;
        return value % 2 == 0;
    })
    console.log(result);
 -->

> arr.some(function(value, index, arr) {})
- 这个方法用于检测数组中的元素是否满足指定条件, 通俗点查找数组中是否有满足条件的元素
<!-- 有没有大于20的元素, 有没有pink的元素 -->

- 注意它返回值是布尔值 如果查找到这个元素, 返回true, 如果查不到就返回false

\\\\ → 如果找到第一个满足条件的元素, 则终止循环, 不再继续
\\\\ → 如果查询数组中唯一的元素, 用some()方法更合适

- 参数
    - value:    数组当前的值
    - index:    数组当前的索引
    - arr:      数组对象本身
<!-- 
    筛选大于20的元素
    let arr = [12, 66, 4, 88];
    
    查找数组中大于20的元素
    arr.some(function(value, index, arr) {
        return value >= 20;
    })

    console.log(result);        //true

    查找元素
    let arr = ['red', 'blue', 'pink']
    let result = arr.some(function(value) {
        return value === 'pink'
    })

    console.log(result);        //true
 -->

> some()的高级用法
<!-- 
    let arr = [];
    data.some(function(value) {
        // some方法返回的是布尔值 所以在内部可以这么写
        // 如果用户输入的商品 和 当前产品的名称一样
        if(value.pname === product.value) {

            console.log(value);     // 找到的数据

            // 但是返回的是一个对象, 我们上面定义的函数必须传递进去一个数组
            arr.push(value);

            // 如果找到就会返回true 必须这么写 现在就属于拿到这个数据了
            return true;
        } 
    });

    // 把拿到的数据渲染到页面中
    setData(arr);
 -->

> 总结:
- filter: 也是查找满足条件的元素, 返回的是一个数组, 而且是把所有满足条件的元素都返回回来

- some: 也是查找满足条件的元素是否存在, 返回的是一个布尔值 true false,
<!-- 如果查找到第一个满足条件的元素就会终止循环 -->

> every()
- 会遍历元素当所有元素全部满足条件的时候才会返回true 有一个返回false则整体结果就是false


> map();
- 一个对一个, 我给你10个 返回来还是10个
- 对数组里每一个元素进行变化的时候就可以使用map函数
- 映射

- map函数 会取出数组中的每一个元素 来进行回调 将return的结果给一个新数组, 所以要创建一个新数组用来接收

> 小例子:
- 需求: 让上面的数组里面元素 变成2倍
    let arr = [12,5,8];
<!-- 
    上面每一个数组里面的东西都会在function里面走一遭 
-->
    let result = arr.map(function(value, index){
        return value * 2
    })
    console.log(result)

> 小例子2:

    let arr = [12,90,8];

    let result = arr.map(value=>value>60 ?'及格':'不及格')
    console.log(result)

    结果:
    result = ["不及格", "及格", "不及格"]


> reduce()
- 汇总
- 一堆出来一个, 算个总数 比如两张银行卡 一张10 一张20 一共多少
- 对数组中所有的内容进行汇总的 要么全部相乘 要么全部相加

> 对于数组里面是对象的结构来说, 它遍历出来就是对象, reduce遍历的跟for of一样都是属性值

- 语法:

    arr.reduce(function(){}, initiaValue)
        
- 参数:
- callback
    - accumulator 累加器累加回调函数的返回值
        - 如果指定了初始值，则将累加器设置为 initialValue 作为初始元素
        - 否则，将累加器设置为数组的第一个元素作为初始元素。

        - 累加器的值 是上一次回调函数return的结果
        
    - currentValue (处理数组的当前元素。)
    - currentIndex
    - array
        
- initiaValue(初始值)   一般为0

<!-- 

    let arr = [10,20,30];

    // 算个总数
    let result = arr.reduce(function(preValue, value, index){
        return preValue + value;
    })
    console.log(result);

    回调函数会作用在每一个元素身上, 一共会调用3次回调函数
    如果设置了初始值, 初始累加器里面是0
    preValue = 0

    第一次
    preValue    0
    value       10

    第二次
    preValue    10 (return preValue + value 0 + 10)
    value       20

    第三次
    preValue    30
    value       30

    结果就是60

    
    // 算个平均数 求和除个数 先求和 到最后一
    let a = arr.reduce(function(tmp, item, index){

        // index == arr.length-1          // 说明是最后一次
        if(index != arr.length-1) {       // 不是最后一次
            return tmp+item;
        } else {
            // 到了最后一次不光要求和还要除以个数
            return (tmp+item) / arr.length;
        }
    })
    console.log(a);


    // 数组中是对象的情况
    let books = [
        { id: 1, name: 'unix编程艺术', price: 119 },
        { id: 2, name: '代码大全', price: 105 },
        { id: 3, name: '深入理解计算机原理', price: 98 },
        { id: 4, name: '现代操作系统', price: 87 }
    ]

    let result = books.reduce(function(tmp, item, index){
        return tmp + item.price * item.count;
    }, 0)

    console.log(result);
 -->

---------------------------------

### forEach() 和 some()的区别
> 在forEach中return不会终止迭代
> 在some中return会终止迭代

> some()一定要写return true 意思是找到元素就不要继续遍历了, 如果写false说明没有找到这个元素 会一直往下去找

    let arr = ['red', 'green', 'blue', 'pink'];
    arr.forEach(function(value) {
        if(value == 'green') {
            console.log('找到了该元素');

            // 想到找元素后就退出
            return true;        // 在forEach中return不会终止迭代
        }

        console.log(11);        // 依然输出了3次
    })


    arr.some(function(value) {
        if(value == 'green') {
            console.log('找到了该元素');

            // 想到找元素后就退出
            // 在some里面遇到return true就会终止遍历 迭代效率更高
            return true;        
        }

        console.log(11);        // 没有输出
    })


> filter是满足条件的所有元素放入到一个新数组里面
- 那filter能不能 return true来终止循环呢?
- filter和forEach一样的 遇到return true不会终止循环

---------------------------------

### ES5中新添加的字符串的方法
> str.trim()    去除两端空格
- 去除字符串两端的空白字符, 并不会去除单词中间的问题
- 这个方法并不影响字符串本身, 它返回的是一个新的字符串

    let str = '   andy   ';
    let str1 = str.trim();
    console.log(str1);

> 以前案例中我们会判断文本框内的值是否为空 input.value.trim()
- 这里面会有一些小的bug, 比如拿到的值的里面可能会有空格
- 比如 我们判断的时候可能会不严谨
<!-- 
    if(input.value === '') {
        alert('请输入内容');
    } else {
        div.innerHTML = input.value;
    }

    if(input.value.trim() === '')
 -->

---------------------------------

### ES5中新增的对象方法
> Object.keys() 获取对象身上所有的属性名
- 用于获取对象自身所有的属性名

    Object.keys(obj)

- 效果类似for...in
- 返回一个由属性名组成的数组

<!-- 
    let obj = {
        id:1,
        pname:'小米',
        price:1999,
        num:2000
    }
    let arr = Object.keys(obj);   // [id, pname, price, num]
 -->


> Object.defineProperty(obj, 'prop', descriptor)
- 我们可以通过该方法, 在对象中添加属性 和 属性值, 同时可以对属性值进行限制以及控制

- 参数:
- 1. obj:   目标对象(必传项)
- 2. prop:  需要定义或修改的属性的名字(原先没有的会添加)
- 3. descriptor:
    - 3.1  数据描述符: configurable enumerabl value writable 配置项。
    - 3.2  访问器描述符:  get set configurable enumerable 配置项。
<!-- 
    数据描述符和访问器描述符不能混合使用
-->
    value:    设置属性的值, 默认为undefined
    writable: 值是否可以重写, true | false, 默认为false
    <!-- 
        我们的对象中有很多属性是很重要的, 不可以修改的, 这时候可以通过这个属性限定不允许被修改
    -->

    enumerable: 目标属性是否可以被枚举, true | false, 默认为false
    <!-- 
        比如买了个东西 我往对象里添加了用户的地址, 这个地址比较隐私, 不想让被枚举出来, 这时候就可以用这个属性
     -->

    configurable: 目标属性是否可以被删除或是否可以再次修改特性, 默认为false
    <!-- 
        添加的属性不允许被删除, 并且不能给这个属性的第三个参数再次修改特性
     -->


>>> 当我们需要设置或获取对象的某个属性的值的时候，我们可以使用 setter/getter方法。
    get: 当我们读取给定属性的时候会调用get函数, get函数的返回值就是给定属性的属性值

    set: 当我们修改给定属性的时候会调用set函数, set函数的形参value就是新修改之后的值
    

> 案例一: 使用 Object.defineProperty 给对象添加属性
- 数据描述符
<!-- 
   let obj = {
        id:1,
        pname:'小米',
        price:1999,
        num:2000
    }
    
    Object.defineProperty(obj, 'sex', {
        value:1000,
        writable:
    })
 -->


> 案例二: 使用 Object.defineProperty 实现双向绑定
- 访问器描述符
<!-- 
    <input type="text" id="demo" />
    <div id="xxx">{{name}}</div>

    const obj = {};

    Object.defineProperty(obj, 'name', {
        set: function (value) {
            document.getElementById('xxx').innerHTML = value;
            document.getElementById('demo').value = value;
        }
    });

    document.querySelector('#demo').oninput = function (e) {
        obj.name = e.target.value;
    }
    obj.name = '';
 -->


> Object.defineProperties(对象, {
    name: {
        value: ""
        ...
    },
    age: {

    }
})

- 设置多个属性
        
---------------------------------

### JS高级部分

### 面向对象编程介绍
> 面向过程(POP)
- 面向过程就是分析出解决问题所需要的步骤, 然后用函数把这些步骤一步一步实现, 使用的时候再一个一个的一次调用就可以了
<!-- 
    比如大象装进冰箱, 面向过程做法
    - 打开冰箱门 - 大象装进去 -装进去
 -->

> 面向对象(OOP)
- 面向对象是把事物分解成为一个个对象, 然后由对象之间分工与合作
<!-- 
    比如大象装进冰箱 面向对象做法
    - 先找出对象 并写出这些对象的功能

    - 大象对象 -- 功能: 进去
    - 冰箱对象 -- 功能: 打开 和 关闭 

    - 最后我们做一个调度者 使用大象和冰箱的功能
 -->
- 面向对象是以对象功能来划分问题, 而不是步骤

> 面向对象编程的优点
- 在面向对象程序开发思想中, 每一个对象都是功能中心具有明确分工
- 面向对象编程具有灵活性 代码可服用 容易维护和开发的优点, 更适合多人合作的大型软件项目

> 面向对象的特性
- 封装性
- 继承性    一个对象是爸爸 一个对象是儿子 儿子可以继承爸爸的属性 
- 多态性    同一个对象在不同时刻有不同的状态



### 面向对象 和 面向对象的对比
> 面向过程:
- 优点:
- 性能比面向对象高 适合跟硬件联系很紧密的东西
- 例如:
- 单片机就采用的面向过程变成

- 缺点:
- 没有面向对象易维护, 易复用, 易扩展
<!-- 比如我们程序之间都很紧密 一个部分错了 另一个部分调试很难 -->

> 面向对象
- 优点:
- 易维护, 易复用, 易扩展, 由于面向对象有封装 继承 多态的特性, 可以设计出低耦合的系统 使系统 更加灵活 更加易于维护

- 缺点:
- 性能比面向过程低

<!-- 
    面向过程的方法 写出来的程序是一份蛋炒饭, 比如不喜欢吃鸡蛋 没办法 已经混在一起了, 但蛋炒饭也有优点啊, 把鸡蛋的美味和米饭的香味 混在了一起

    而用面向对象写出来的程序是一份盖浇饭, 我准备了一份白米饭, 又准备了份浇汁
    可以根据不同的口味做出不同的盖浇饭来 

    简单的程序还是面向过程 大型项目程序复杂的都是面向对象 维护起来比较方便
 -->

---------------------------------

### ES6中的类和对象
- 面向对象更贴近我们的实际生活 可以使用面向对象描述现实世界事物, 但事物分为具有的事物和抽象的事物
<!-- 
    比如 抽象的(泛指的):    手机        它是一个类别
         具体的(特指的):    我的手机    就是有具体的
 -->

> 面向对象的思维特点
- 抽取(抽象)对象共用的属性和行为组织(封装)成一个类(模板)
- 对类进行实例化, 获取类的对象
- 面向对象编程 我们考虑是有哪些对象, 按照面向对象的思维特点 不断的创建对象, 使用对象, 指挥对象做事情
<!-- 
    比如:
    首先我们把手机的公共的行为和属性抽取出来, 封装为一个模板 这个模板里面有我们共用的属性和方法 手机都可以打电话发短信 手机有屏幕尺寸和重量之类的

    根据这个类(模板) 生产出很多对象  
 -->

> 类 class
- 在es6中新增加了类的概念, 可以使用class关键字声明一个类, 之后以这个类实例化对象

> 类抽象了对象的公共部分, 它泛指某一大类(class)

> 对象特质某一个 通过类实例化一个具体的对象



### 创建 类
- 语法:

    class name {
        // classbody
    }


> 创建类 创建一个明星类
class Star {

}

> 利用类创建实例对象 new
new Star()
<!-- 怎么传递参数呢 -->

> 类constructor 构造函数 有了它就可以传递参数了
- constructor()方法是类的构造函数(默认方法), 用于传递参数 返回实例对象, 有了它就不用return了 

- 通过 new 命令生成对象实例时, 自动调用该方法, 如果没有显示定义, 类内部会自动给我们创建一个constructor()

> 使用方法:
class Star {
    constructor(形参uname) {
        this.uname = uname;
    }
}

let ldh = new Star('刘德华');
<!-- 
    只要用new创建的实例 就会自动调用constructor函数

    实参(刘德华) 传递给 形参uname, 形参uname会把刘德华传递给this.uname
    this指向的是ldh这个创建的实例
 -->

>> 注意:
- 通过class关键字 创建类 类名我们还是习惯定义首字母大写
- 类里面有个constructor函数, 可以接受传递过来的参数, 同时返回实例对象

- constructor函数只要new生成实例时, 就会自动调用这个函数, 如果我们不写这个函数, 类也会自动生成这个函数

- 生成实例 new 不能省略
- 最后注意语法规范, 创建类 类名后面不要加小括号, 生成实例, 类名后面加小括号, 构造函数不需要加function

> 总结:
<!-- 
class Star {

    // 我们使用constructor构造函数来传递参数, 它会返回实例对象
    constructor(name, age) {
        // 这里注意 因为constructor中的属性会返回给实例对象, 所以必须要用this动态的指回实例对象
        this.name = name;
        this.age = age;
    }
};

// 通过new来生成实例对象时, 会自动调用constructor方法
let ldh = new Star('刘德华', 18);
console.log(ldh);
 -->



> 在类里, 添加方法
- 直接将函数写在Star { ... }构造函数里面就可以了
- 不需要写function
- 在类里 多个函数 方法之间不需要添加逗号分隔 不需要写 ,

class Star {
    // 传递参数用的
    constructor(name) {
        this.name = name;
    }

    // 方法直接写在class部分里,写在这里, 在这里所有的函数不需要加 function 关键字
    say() {
        console.log(this.name+'你好')
    }
}

ldh.sing();     也可以传递参数



> 类的继承 extends
- 在程序里 子类可以继承父类的一些属性 和 方法
- 使用 extends 关键字
- 语法:
    // 创建 父类
    class Father {
        constructor() {

        }

        // 创建一个方法 等着别的类过来继承
        money() {
            console.log(100)
        }
    }

    // 创建一个子类
    class Son extends Father { 

    }

    let son = new Son();

    // 使用extends后就可以继承到父类中的方法
    son.money();

    --------

> 用父类型中的方法, 使用子类型中的参数怎么办?
    class Father {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

        sum() {
            console.log(this.x + this.y);
        }
    }

    class Son extends Father { 
        // 孩子需要传递参数 所以
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

    }

    let son = new Son(1,2);
    son.sum();      // 报错了
<!-- 
    原因很简单, 我们本意是想把1 2传递给父类中调用父类的方法输出3

    但是 我们传递进去的参数只能传递到自己类的constructor里
    那么怎么才能做到呢?
 -->

> Super 关键字
- super关键字用于访问和调用对象父类上的函数 可以调用父类的构造函数, 也可以调用父类的普通函数

    class Father {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

        sum() {
            console.log(this.x + this.y);
        }
    }

    class Son extends Father { 
        
        constructor(x,y) {
            // 这里就不要写this.x = x了, 直接调用super关键字
            super(x, y);        // 调用了父类中的构造函数
            // 相当于把父类中的构造函数内容粘贴到了这里 this指向还是父类的
            // 使用super()方法 调用了父类型中的constructor中的属性, 数据以 实参 --- 子类型constructor中的形参x,y --- 传递给super(x,y) --- 传递给父类型中干的constructor中的 x,y

        }

    }

    let son = new Son(1,2);
    son.sum(); 
<!-- 
    执行流程:
    let son = new Son(1,2); 
    我们传递了实参

    实参会传递到子类中的constructor(x,y) 形参里

    然后子类的构造函数里调用了super(x,y) 然后又把得到的实参传递给了super里的形参

    super里的形参又链接着父类的构造函数, 所以就能变相的访问到了 父类构造函数中的数据
    -->

> 继承中的属性或者方法查找原则
- 继承中 如果实例化子类输出一个方法, 先看之类有没有这个方法 如果有就先执行子类的
- 继承中 如果子类里面有, 就去找父类有没有这个方法 如果有 就执行父类的这个方法
<!-- 
    就近原则
 -->

> 通过super关键字 在之类中可以调用父类中的方法

    class Father {
        say() {
            return '我是爸爸'
        }
    }

    \\ 这样子类就继承了父类的属性和方法
    class Son {  

        say() {
            return '我是儿子';
        }
    }

    let son1 = new Son();
    son1.say();     我是儿子


    \\ 调用父类中的方法
    class Son extends Father {
        say() {

            // 通过super关键字调用了父类中的say
            console.log(super.say())
        }
    }
    let son1 = new Son();
    son1.say();     我是爸爸



> 还有一种情况 儿子继承了爸爸的方法, 但是儿子自己还有新方法
- 需求: 子类继承父类加法的方法, 同时 扩展减法的方法

    \\ 父类
    class Father {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }

        sum() {
            console.log(this.x + this.y);
        }
    }

    \\ 子类
    class Son {
        constructor(x,y) {
            this.x = x;
            this.y = y;
        }
        \\ 定义个减法的方法 这个减法是儿子独有的
        subtract() {
            console.log(this.x - this.y);
        }
    }
    let son = new Son(5, 3);

    // 不继承的时候 正常使用到了子类中的减法
    son.subtract();     // 2

    \\ 子类继承父类加法的方法
    class Son extends Father {
        constructor(x,y) {
            // 因为this的指向是不同的, 各自指向各自的类 这里利用super关键字调用父类的构造函数

            // 一定要在this的上方 
            super(x,y)

            this.x = x;
            this.y = y;
        }
    }
    let son = new Son(5, 3);
    son.subtract();     // 2
    son.sum();          // 8 

> 总结:
- 当使用extends后 既可以使用父类中的方法, 又可以使用子类中的方法
- 但是 super(x, y), 一定要在子类constructor中的参数的最前面

> 注意 super必须在子类的构造函数中的this之前, 也就是说必须要先调用父类的构造方法 再使用子类的构造方法

<!-- 
    执行流程:
    首先 先把5 和 3 传递给 子类中的构造函数 开始的this指向子类内部, 这样我们子类的减法可以拥有形参 

    然后通过super调用了父类中的构造函数 相当于通过这个中介 把实参5 3传递了给父类构造函数中 再调用父类中的sum
 -->

---------------------------------

### 类和对象 在使用时的三个注意点

- 1. 在es6中类没有变量提升, 所以必须先定义类, 才能通过类实例化对象
- 2. 类里面的共有的属性和方法一定要加this使用, 说白了就是构造函数里都要加this

- 3. 类里面this指向的问题
<!-- 
    constructor里面会有this
        -- 主要的作用是创建实例, this指向的就是这个创建出来的实例

    类的方法里会有this
        -- 方法里面的this 是看谁调用了这个方法, this就是谁 这里ldh调用了这个方法
 -->

- 总结:
- constructor里面的this指向实例对象, 方法里面的this指向这个方法的调用者
<!-- 
    我们想用别的部分的this 可以把this存到全局变量that
    我们输出that
 -->

<!-- 
    class Star {
        constructor(name, age) {
            this.name = name;
            this.age =age;

            this.sing(); 写在这里的一定要加this
            --2--
            如果我把sing()方法写在constructor里面, 那么用new来创建实例的时候会自动调用该方法

        }

        // --1-- 如果方法写在类了 需要通过实例来手动调用比如ldh.sing()
        sing() {
            console.log(this.name)
        }
    }

    let ldh = new Star();

--1--
    ldh.sing();
 -- >    如果是 --2-- 是不需要这么调用了 因为new的原因会自动调用方法


> 我们做个按钮点击后 再调用sing()的案例
<!-- 
    class Star {
        constructor(name, age) {
            this.name = name;
            this.age =age;
            this.btn = ducument.querySelector('button');
            this.btn.onclick = this.sing;
            // 这里不要加() 要不new下就自己调用了 我们要点击后再调用
        }

        sing() {
            console.log(this.name)
        }
    }

    首先我们要获取button, 因为用new调用时, 会自动执行constructor里面代码
    所以我们把获取btn的动作写在构造函数里面

    同时btn属于哪个对象的 ldh吧 所以前面要加上this

    绑定点击事件的时候 不能直接写btn.onclick 也是 我们要知道哪个按钮被点击了this.btn.onclick
 -->

---------------------------------

### 函数高级模块

### 函数的定义的方式
> 函数声明方法 function 关键字(命名函数)
- function fn() {   }

> 函数表达式(匿名函数)
- let fn = function() {   }

> 利用new Function('参数1', '参数2', '函数体')
- let f = new Function();
- 参数和函数体都要有引号
<!-- 
    let f = new Function('a', 'b', 'console.log(a+b)');
    f(1, 2);
 -->

> 注意: 
- 通过第三种方式我们可以得到这样的一个结果, 所有的函数 都是new Function出来的, 所有函数都是Function的实例(对象)


> 验证:
- 前面说过只要是对象都有原型 如果有原型肯定都是对象
- console.dir(f)    // __proto__ 说明这个函数是对象
- console.log(f instranceof Object)     // true


> 结论:
- 函数也属于对象 万物皆对象


> 图解:
Function   Function.prototype  Function
构造函数        --- >           原型对象
               < ---
      Function原型对象.constructor

                            ↗ f.__proto__
            f对象实例       
    (let f = new Function())

-----------------------------

### 严格模式

- js除了提供正常的模式外还有严格模式(strict mode)
- es5的严格模式是采用具有限制性js变体的一种方式, 即在严格条件下运行js代码

- ie10以上才支持

> 严格模式对正常的js语义做了一些更改
- 效果js语法的一些不合理 不严谨的地方 减少了一些怪异行为
- 消除代码原型的一些不安全的地方, 保证代码运行的安全
- 提高编译器效率 增加运行速度
- 禁用了es的未来版本中可能会定义的一些语法, 为未来新版本的js做好铺垫, 比如一些保留字 class enum export extends import super不能做变量名

### 开启严格模式
- 可以在js中开启
- 可以在个别函数内部开启

- 因此在使用时, 我们可以将严格模式分 为脚本开启严格模式 和 为函数开启严格模式两种情况

> 为脚本开启严格模式
- 为整个脚本文件开启严格模式, 需要在所有语句之前放一个特定语句

    "user strict";
<!-- 
    <script>
        "user strict";
    </script>

    或者

    <script>
        (function(){
            "user strict";
            把所有的代码都写在这个立即执行函数里面
        })()
    </script>
 -->

> 为函数开启严格模式
- 给某个函数开启严格模式, 需要把 "user strict"; 声明放在函数体所有语句之前
<!-- 
    function fn() {
        "user strict";

        函数体;
    }
 -->

---------------------------------

### 严格模式中的变化

> 1. 变量规定
- 在正常模式中 如果一个变量没有声明就被赋值, 默认是全局变量, 严格模式禁止这种用法, 变量都必须先用var命令声明, 然后再使用
<!-- 变量名先声明 再使用 -->

> 2. 严禁删除已经声明的变量
- 例如 delete x; 语法是错误的
<!-- 不能随意删除已经声明好的变量 -->

> 3. 全局作用域中函数中的this是undefined
- 以前在全局作用域函数中的this指向window对象
- 严格模式下全局作用域中函数中的this是undefined

> 4. 严格模式下, 构造函数不加new调用 this指向undefined 会报错
- 以前构造函数时, 不加new也可以调用当做普通函数 里面this指向全局对象
- 加了this去调用还是指向创建的对象实例
<!-- 
    // 不加new调用作为普通函数调用 这时的this指向window
    function Star() {
        this.sex = 'nan'
    }

    Star();
    console.log(window.sex)     // 因为this指向window所以可以输出 男
 -->

> 5. 定时器里面的this还是指向window


### 函数的变化
- 函数不能有重名的参数
<!-- 
    // 以前是可以这样的
    function fn(a, a) {
        console.log(a + a);
    }
    fn(1, 2)    4

    首先不在严格模式下是可以声明重名参数的
    其次上面打印出4到的原因是
    实参1 传递给a
    a = 1
    实参2 传递给a
    a = 2

    现在都被改成 a=2 a=2 所以结果是4
 -->

- 函数必须声明在顶层, 新版本的js会引入'块级作用域' 为了与新版本接轨, 不允许在非函数的代码块内声明函数
 - - 非函数代码块
<!-- 
    if(true) {
        function fn() {}
        fn();               !!!语法错误
    }

    for(let i=0; i<5; i++) {
        function fn() {}
        fn();               !!!语法错误
    }
 -->

> 严格模式中也不允许使用8进制

---------------------------------

### 高级函数 高阶函数
- 高阶函数是对其它函数进行操作的函数, 它接收函数作为参数, 或将函数作为返回值输出
<!--    
    // 参数是个函数
    function fn(callback) {
        callback&&callback();
    }
    fn(function() {alert(1)});

    // 函数作为返回值
    function fn() {
        return function() {}
    }
    fn()
 -->

- 函数也是一种数据类型, 同样可以作为参数, 传递给另一个参数使用, 最典型的就是作为回调函数
<!-- 
    function fn(a, b, callback) {
        console.log(a+b);

        // 这条语句写在最下面
        callback && callback();
    }

    fn(1,2,function() {

        // 当fn中的代码执行完毕才会执行回调函数
        console.log('我是最后调用的');
    })
 -->

---------------------------------

### 什么是闭包
- 闭包(closure)指有权访问另一个函数作用域中变量的函数
- 被访问的变量所在的函数就是闭包函数

> 闭包的作用
- 延伸了变量的作用范围
<!-- 
    闭包是一个函数
    简单的理解就是 一个作用域可以访问另外一个函数内部的局部变量
 -->
<!-- 
    我们fun这个函数作用域 访问了另外一个函数 fn 里面的局部变量 num 此时就满足了闭包的条件

    function fn() {
        let num = 10;               // 访问了这个作用域中的变量
                                            ↑
        function fun() {                    ↑
            console.log(num)        // 这个作用域
        }
        fun()
    }
    fn()
 -->

> fn外面的作用于可以访问fn内部的局部变量
<!-- 
    function fn() {
        let num = 10;
        function fun() {
            console.log(num)
        }
        
        return fun;
    }
    let f = fn();

    类似于:

    f = function fun() {
            console.log(num)
        }
    
    这里f里存的就是一个函数, 既然是函数就可以调用
    这里是就全局作用域 访问到了局部作用域里的值
    f();
 -->


### 我们通过几个例子观察下闭包

> 例子0:
- 一个函数, 可以访问它相同的作用域的外部变量
    var a = 0;

    function m1(){
        console.log(a++);
    };

\\\\    ↓    \\\\

>> 接下来有这么两个函数, m2函数显然是不能访问到变量a的 因为不在一个作用域里, 那怎么才让m2访问到m1中的私有变量呢?

    function m1(){
        var a = 100;
        console.log(a++);
    };

    function m2(){
        console.log(a++);
    }

\\\\    ↓    \\\\

>> 为了是m2能够访问到m1中的私有变量, 我们可以这样
- 1: 在 m1 的内部创建 m3 函数, 这是m3函数访问变量a肯定是没有问题的

    function m1(){
        var a = 100;
<!-- 或者在这写也可以 -->
        return function m3(){
            console.log(a++);
        }
<!-- 一般这么写 -->
        return m3;

<!-- 然后我们把 m3 当做对象 return 出去, 在编程中函数可以被当做对象使用 -->
    };


- 2: 我们在全局范围内调用 m1

    function m1(){
        var a = 100;

        function m3(){ 
            console.log(a++);
        }
        return m3;                         
    };

    var _m3 = m1();
<!-- 
    我们再全局范围内又做了一个变量_m3 而_m3是和m3是等价的, 可以理解为在全局范围内给m3创建了一个快捷方式

    由于作用域的关系, m2 是可以条用 _m3 的
 -->

    function m1(){
        var a = 100;

        function m3(){ 
            console.log(a++);
        }
        return m3;                         
    };

    var _m3 = m1();

    function m2(){
        _m3();
    }
<!-- 
    由于作用域的关系, m2可以调用m3等价于m2间接访问了变量a
    在这个过程当中函数m3 起到了最关键的作用, 函数m3就是一个闭包
 -->

<!-- 
    垃圾回收:
    正常来讲 当m1执行结束的时候, 内部变量a就应该被回收, 之所以没有被回收 因为m3还在引用a
 -->



> 例子1:
    function fn(){
        var a = 2;

        function fn2(){
            console.log(a);
        };

        return fn2;
    };

<!-- 
    我们将fn()的返回值(也就是fn2函数赋予一个变量func) 
    然后我们实际调用func(), 理所当然的调用fn2(), 只不过通过不同的标识符
-->
    var func = fn();
    func();
<!-- 
    fn()在执行后按理来说它内部的作用域应该被垃圾回收机制回收, 但因为fn2的声明位置在fn的内部, fn2()拥有一个词法作用域闭包, 覆盖着fn()的内部作用域(fn2的作用域气泡 覆盖着fn的作用域气泡)

    fn2()的作用域闭包为了使fn2()以后在任意时刻都能引用这个作用域而保持它的存在, 这就叫做闭包

    当func()在调用时(调用的其实是fn2的内部函数), fn2理所应当的拥有对编写fn2时的词法作用域的 访问权, 所以fn2()可以访问到 a
 -->


> 例子2:
    for(var i=0; i<5; i++){

        setTimeout(function timer(){
            cosole.log(i)
        },i*1000)
    }
<!-- 
    我们的需求是 每隔一秒分别打印数字, 1 2 3 4 5 一秒一个

    但是 实际得到的结果却是打印了5个6, 一秒一个

    上面for循环的终止条件是, i不<=5, 也就是当i满足终止循环的条件时,i的值为6 
    所以输出的结果反映的是 i在循环结束后的最终值

    那上面的代码缺少了什么? 让我们不能打印出需求
 -->
<!-- 
    for循环在每次进行时, 都会 捕捉 一次 i, 循环体每执行一次, 就会创建一个函数, 执行5次就会创建5个函数, 虽然这5个函数在循环中分离定义, 由于作用域的工作方式, 他们都闭包在同一个共享的全局作用域中, 而事实上只有一个i, 这样所有的函数共享一个i的引用
-->

> ↑ 修改下上面的代码, 这样会好用么?
    for(var i=0; i<5; i++){

        (function(){
            setTimeout(function timer(){
                cosole.log(i)
            },i*1000)
        })()
    }
<!-- 
    依然不好用, 这样做确实把 超时函数 放在了一个封闭的函数作用域中, 但有用一个被闭包的 空的作用域 是不够的, IIFE只是一个空的什么都不做的作用域, 它内部还需要一些东西 才能变得对我们有用

    IIFE需要一个自己的变量 每次循环时都能持有一份对 i 的值的拷贝
 -->
    for(var i=0; i<5; i++){
        (function(){

            var j = i;          --->  这里

            setTimeout(function timer(){
                cosole.log(j)
            },j*1000)
        })()
    }

> 还可以改成这样 ↓ 

    for(var i=0; i<5; i++){
        (function(j){
            setTimeout(function timer(){
                cosole.log(j)
            },j*1000)
        })(i)
    }

---------------------------------

### 闭包的案例

### 实例1:
> 需求: 点击li 输出当前li的index
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){
<!-- 给li绑定点击事件 -->
    lis[i].onclick = function(){

<!-- 在这个事件回调用不能直接打印 i -->
        console.log(i);
<!-- 
    因为事件回调是异步任务, 循环是同步任务循环会立马执行, 停止循环的条件是5, 所以点击任何的 li 输出的结果都会是5
-->
    };
}

> 那为了达到我们的需求, 我们会给lis[i] 添加一个index属性
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){

    lis[i].index = i;               // 给lis[i] 添加了 index 属性

    lis[i].onclick = function(){
        console.log(this.index);
    };
}

> 闭包的方式 得到 li 的当前index
var lis = document.querySelector('.nav').querySelectorAll('li');
for(var i=0; i<lis.length; i++){
<!-- 立即实行函数 立马会执行 这里利用for循环创建了4个的立即执行函数 -->
    (function(){    
                
    })()      
<!-- 立即执行函数就相当于独立的作用域 块级 -->
}

\\\\    ↓   \\\\ 

for(var i=0; i<lis.length; i++){

    (function(i){       // 2, 定义形参i 用来接收实参 IFEE的i的值是实参传递进来的

        console.log(i); // 4, 这时打印i 就会是0 1 2 3 4

    })(i)               // 1, 这个小括号可以接收一个参数, 我们把 i 传递进去
}
<!-- 
    3, 当第一次循环时 i=0, 我们就会把0 传递到IFEE的实参中, 这时实参i就为0

    5, 因为每次循环都会创建一个立即执行函数 第一轮循环时 把i=0传递进了IFEE中
    打印出了0
    第二轮循环时, 再次创建一个IFEE, 并把i=1传递进了IFEE中, 打印出了1 ...

    这个IFEE每次都会创建IFEE, 而IFEE存的是当次循环里面的i值
 -->

\\\\    ↓   \\\\ 

for(var i=0; i<lis.length; i++){

    (function(i){
        lis[i].onclick = function(){
            console.log(i);
        };
    })(i)
}
<!-- 
    那有闭包的产生么?
    有, 事件回调是一个函数, IFEE也是一个函数, 现在事件回调里的 i  是IFEE中的变量
    也就是里面的函数, 使用了外部函数的变量 这就是一个闭包
 -->

### 实例2:循环中的setTimeout()

- 需求: 3秒钟后, 打印所有li中的内容
var lis = document.querySelector('.nav').querySelectorAll('li');

for(var i=0; i<lis.length; i++){

    setTimeout(function(){

        console.log(lis[i].innerHTML);
<!-- cannot read property 'inndeHTML' of undefind -->

    },3000)

}
<!-- 
    定时器的回调函数也是异步任务, 所以还是会出现和实例1中一样的情况
    解决办法还是一样的, 我们每次循环的时候传递进去独一无二的i就可以了
 -->

\\\\    ↓    \\\\

for(var i=0; i<lis.length; i++){

    (function(i){
        setTimeout(function(){
            console.log(lis[i].innerHTML);
        },3000)
    })(i)
    
}
<!-- 
    只要在IFEE中的任何函数都可以使用IFEE中的变量, 这就是闭包的应用
 -->


### 实例3:打车价格
- 需求: 打车起步价格为13(3公里内), 之后每多一公里增加5块钱, 用户输入公里数就可以计算打车价格, 如果有拥堵的情况, 总价格要多收10块钱的拥堵费

- 之前我们都会先声明一个函数, 那这个函数最终一定会执行, 又要声明又要调用很麻烦, 所以我们就直接写在匿名函数里面, 就不需要调用了
    function fn(){};
    fn();

\\\\    ↓     \\\\

var car = (function(){

    let start = 13;     //起步价
    let total = 0;      //总价

<!-- 这里有两个功能: 1 正常价格, 2 拥堵时的价格, 既然是两个函数我们可以这样 -->
    return {
        // 1
        price:function(n){      //n为用户传递进来的参数, 代表公里数

            if(n<=3>){
                total = start;
            }else{
                total = start+(n-3)*5
            }

            return total;       // 最终把总价返回
        },

        // 2
        yd:function(flag){
<!-- 这里我们要判断是否是拥堵, 如果拥堵在原价上加10, 如果没有是原价 -->
            return flag ?total+10 :total;
        }
    }
})()

car.price(5);
car.yd(true);

<!-- 
    这是一个立即执行函数, 一执行后返回了两个函数, 既然有返回值, 我们就可以创建变量把返回值接回来, 我们定义了一个car 来接收返回的对象

    car里有两个方法, 我们可以通过点的方式使用这两个方法
 -->



> 名词解释:
<!-- 
    词法作用域: 
    也就是在词法阶段定义的作用域。
    词法作用域意味着作用域是由书写代码时函数声明的位置来决定的。

    js中其实只有词法作用域，并没有动态作用域，this的执行机制让作用域表现的像动态作用域，this的绑定是在代码执行的时候确定的。

    迭代:
    迭代计算是指迭代计算是重复计算工作表直到满足特定数值条件为止

    异步任务主要的三种情况:
    1 回调函数
    2 定时器中的回调函数
    3 事件中的回调函数
    4 ajax中的回调函数

    异步任务多是, 只有你触发了才会执行 比如定时器(setTimeout(function(){}.3000)) 3秒后 才执行,没有到时间是不会执行的,即使我们把3000改为0, 它也不立马执行

    而是把函数放到任务队列里

 -->

---------------------------------

### 思考题 下面的题中有没有闭包的产生

    let name = 'the Window';
    let obj = {
        name:'my object',
        getNameFunc: function() {
            return function() {         // 匿名函数中的this指向window
                return this.name;
            }
        }
    }

    console.log(obj.getNameFunc()())      // the Window
    let f = obj.getNameFunc();

<!-- 相当于 -->
    f = function () {
        return this.name;
    }
<!-- 普通函数调用this指向window -->
    f();     

> ↑ 对上解答 没有闭包的产生 因为内部函数没有用到外部函数的变量

---------------------------------

### 闭包 (另一个老师的理解)
> 如何产生闭包？
- 当一个嵌套的内部（子）函数引用了嵌套的外部（父）函数的变量（函数）时，就产生了闭包
    function fn1(){
        var a = 2;
        function fn2(){
<!-- 
    这里我引用了外部函数的变量a fn2中的闭包里才有a属性
 -->
            console.log(a);     
            };
        };
<!-- 
    假如我只执行fn1 不执行fn2 fn2中的console能输出么？ 
    那fn2这个函数对象有没有产生 产生了
 -->
    fn1();  


> 闭包到底是什么？
- 我们可以通过chrome工具 通过debug调试来查看 
    理解一：闭包是嵌套的内部函数（绝大部分人）
    理解二：包含被引用变量（函数）的对象（极少数人）
<!-- 注意，闭包存在于嵌套的内部函数中 -->


> 产生闭包的条件？ 
- 执行函数定义就会产生闭包（不用调用内部函数）
- 函数嵌套,内部函数引用了外部函数的数据（变量/函数） 还要执行外部函数

    <button>测试1</button>
    <button>测试2</button>
    <button>测试3</button>

- 需求：点击某个按钮，提示 点击的是第N个按钮

    var bts = documen.getElementsByTagName("button");
<!-- 
    这里的bts是个数组么？不是 它是一个伪数组 而且.length不是一个固定的值，而是在for循环内每次需要通过计算才能得到结果
    如果写bts.length要计算多遍
    那怎么做呢？ 要不然拿出去在外边定义，
 -->
    for(var i=0; i<bts.length; i++){        
        var obj = bts[i];
    }

    for(var i=0, length=bts.length; i<length; i++){
<!-- 减少多次计算, 提供性能 把bts[i] 存放到一个变量里面 -->
        var btn = bts[i];
        btn.onclick = function(){
<!-- 这么写不对，因为i是从0开始的  -->
            alert("第"+  i +"个")
            alert("第"+  (i+1) +"个")   
        }
    }
<!-- 
    向上面这么写完，点击按钮后全是第4个 那就说明i是3, 因为
    我们的函数在后面的某一个时刻才执行 当我这个函数执行的时候 循环已经结束了
    整个过程中产生了几个i 就一个i i是一个全局变量 在外面也能看到i 而我的函数还是在for循环执行完毕之后才执行, for循环执行完毕后 i是3, 也就是说这种写法不行
 -->
}

<!-- 
    循环遍历加监听 肯定是要加的 就是最后我怎么才能得到一个正确的i呢？
    我们要把每一个i 要跟 btn 对应起来吧 也就是说 每一个btn都要知道自己的下标才行, 那我就把下标 等于 i
    btn.index = i;
 -->
    for(var i=0, length=bts.length; i<length; i++){
        var btn = bts[i];
<!-- 将btn所对应的下标 保存在btn上 -->
        btn.index = 1;
        btn.onclick = function(){
            alert("第"+  (this.index+1) +"个")   
    }   

> 换个写法： 下面的写法就是闭包

    for(var i=0, length=bts.length; i<length; i++){
        (function(i){
<!-- 我把这段代码放在了 匿名函数自调用 里面 -->
            var btn = btns[i];                  
            btn.onclick = function(){
                alert("第"+  (i+1) +"个")  
            };
        })(i);
    }


### 闭包的常用写法
function aaa() {
    var a = 1;

    return function(){
        a++;
        alert(a)
    }
}

    var bbb = aaa();
    bbb();          // 2
    bbb();          // 3
    bbb();          // 4


> 函数表达式的写法
    var aaa = (function () {
        var a = 1;
        return function () {
            a++;
            alert(a)
        }
    })()

    aaa()       // 2
    aaa()       // 3
    aaa()       // 4

-------------------------------------------------

### 常见的闭包

> 将函数作为另一个函数的返回值
    function fn1(){
        function fn2(){

        };
<!-- 将内部函数作为外部函数的返回值 -->
        return fn2;     
    };
    fn1();
<!-- 
    上面的还没有产生闭包 正常要在fn1里定义一个变量，然后fn2里引用这个变量才会产生闭包 
-->

- 这次我换个引用方式
    function fn1(){
        var a = 2;
        function fn2(){
            a++;
<!-- 引用就是使用 -->
            console.log(a);     
        };
        return fn2;     
    };
    fn1();
<!-- 
    我外部执行得到了什么？ 得到了整个fn2
    那我可以用一个变量来存 没有输出a 没执行呢 但闭包产生了
    如果没有闭包 这行一执行var a = 2 就消失了
-->

<!-- 外部函数调用了一次 -->
    var f = fn1();

<!-- 实际上是执行fn2 相当于 fn1()() 也就是调用的内部函数 -->
    f();        // 3       
    f();        // 4       
<!-- 
    这里a在不断的累加 那就说明了一个问题 a没有消失 a是一个局部变量吧 是fn1里的局部变量
 -->

<!-- 
    a什么时候产生 执行fn1的时候产生 局部变量在函数调用的时候产生，调用结束后就会死亡 但是如果是3和4 那它就没有死亡
-->
        
> 上述的代码块中一共产生了几个闭包
- 一个
- 如果我想产生两个闭包 该怎么办？ 就看你产生了几个内部函数对象 就看你调用了几次外部函数
<!-- 
    fn1() 这么一执行 我又把内部函数执行一次吧 说白了 怎么看闭包产生了几个 就看外部函数执行了几次
    因为你在执行外部函数的时候 才会执行内部函数对象 跟内部函数执行几次没有关系,     那也就是说 我在反复执行内部函数过程中 我闭包里的数据并没有消失 为什么没有消失呢？
 -->


> 将函数作为实参传递给另一个函数调用

    function showDelay(msg, time){
        setTimeout(function(){
            alert("msg");
        }, time)
    }
    showDelay('atguigu', 2000);

有没有闭包？ 有 首先有外部函数 有内部函数 内部函数引用了外部函数变量 是因为msg 不是因为time

-------------------------------------------

### 闭包的作用
1. 使用函数的变量在函数执行后，仍然存活在内存中（延长了局部变量的生命周期）
2. 让函数外部可以操作（读写）到函数内部的数据（变量/函数）

    function fn1(){
        var a = 2;
        function fn2(){
            a++;
            console.log(a); 
        };
    <!-- 把fn2暴露出去 让外部能看见 -->
        return fn2;                      
    };
    fn1(); 
    var f = fn1();  
    f();        // 3       
    f();        // 4  
<!-- 
    如果没有闭包 函数一执行完 局部变量就会立即释放 后面再想访问就不行了
    作为局部变量在外面看不见，但事实上 我们却能在外部操作局部变量

    我们又看不见���部变量 但我们能用闭包的技术能够在外部操作局部变量 相当于间接可以访问, 譬如 我现在在函数内部有一个变量，希望外部能读到这个a 但不希望被改变
 -->

 > 问题：
1. 函数执行完后，函数内部声明的局部变量是否还存在？
    一般情况下是不存在的 但是存在于闭包中的变量才可能存在

2. 在函数外部能直接访问函数内部的局部变量么？
    不能，但是通过闭包这个技术 让外部操作

    function fn1(){
<!-- 这里的a 在函数执行后还存在么？ 存在 因为在闭包里 -->
        var a = 2;
<!-- 
    那这个fn2整个函数对象还在不在？ 不在了 没有人引用它 成为了垃圾对象
 -->

<!-- 
    括号前的fn2，相当于一个局部变量 闭包里没有fn2 所以自动释放
 -->
        function fn2(){
        a++;                        
        console.log(a); 
    };



<!-- 
    fn3呢？有自动释放么？fn3也不在闭包里 闭包里只有a 所以fn3这个变量在函数执行完后会被自动释放
 -->
    function fn3(){
<!-- 
    那你说连fn3都自动释放了，函数对象不成为垃圾对象了么？可函数对象没有成为垃圾对象 为什么？

    是哪行导致fn3没有被释放的？ 是第11708行 我用变量f 指向了 11706行console.log(a);  函数对象

    也就是说闭包还存在没消失的原因是谁导致的？var f = fn1(); 中的f导致的
 -->
    a--;                    
    console.log(a);             
};                                              
                        
<!-- 
    把fn3暴露出去（把内部函数 return）     return fn3 实际上 return的fn3的地址吧 里面保存的内容，一旦返回后 fn3本身这个变量还在不在

    fn3本身不在了，fn3虽然不在了但并不代表我函数对象成为垃圾对象了 为什么？因为 f 引用着
    只要有一个引用对象 指向着 这个对象，这个对象是不会成为垃圾对象的 
 -->
    return fn3;
                          
};
    fn1(); 
<!-- 
    这个函数对象关联这个闭包，闭包里有a 关键点在于var f = fn1() f把返回值存起来了 
    假如这里改成fn1(); 后 执行完 fn3就不会存在了 
-->
    var f = fn1();          
    f();        // 1       
    f();        // 0  

-------------------------------------------

### 闭包的生命周期
> 产生： 
- 在嵌套内部函数定义执行完时就产生了（不是在调用），定义执行不是函数执行 只是创建了函数对象

> 死亡： 
- 在嵌套的内部函数成为垃圾对象时

    function fn1(){
<!-- 在这行闭包就存在了 因为函数提升 内部函数对象已经创建了 -->
    var a = 2;

    function fn2(){ 
        a++;             
        console.log(a); 
    };
    return fn2;                             
};
<!-- 这时候产生了闭包 -->
var f = fn1();
f();        // 1       
f();        // 0
<!-- 
这时候闭包死亡 因为包含闭包的函数对象成为了垃圾对象，也就是引用它的变量不再引用它了 
-->
f = null

<!-- 
    闭包是一个对象，一个对象就有产生和死亡 执行完函数定义创建完内部函数就产生 
-->

    function fn1(){
        var a = 2;    
<!-- 11750-11753 全部执行完后 才会产生闭包 -->
        var fn2 = function(){       
            a++;             
            console.log(a); 
        };

        return fn2;           
    };

-------------------------------------------

### 闭包的应用 ---- js自定义模块
- 什么是js模块, 具有特定功能的js文件, 将所有的数据和功能都封装在一个函数内部（私有的） 只向外暴露一个包含n个方法的对象或函数
- 模块的使用者 只需要通过模块暴露的对象调用方法来实现对应的功能

<!-- 
    把下面的文件写在js文件中，在外面还能看到下面的内容么？ 看不见 它是私有的数据 
-->
    function myModule(){
        ar msg = 'My aiguigu'
        function doSometing(){
            console.log('doSomething()' + msg.toUpperCase())
        }

        function doOtherthing(){
            console.log('doOtherthing()' + msg.toLowerCase())
        }
    }

<!-- 将上面的js文件引入 -->
script type="text/javascript"sc="myModule.js"

    myModule(); 
<!-- 
    执行它没意义啊 我执行它以后 js文件中的数据又释放掉了 还是不能去操作里面的msg 我得向外面暴露一些东西
 -->

    function myModule(){
    var msg = 'My aiguigu'

<!-- 操作数据的函数 -->
    function doSometing(){
        console.log('doSomething()' + msg.toUpperCase())
    }

    function doOtherthing(){
        console.log('doOtherthing()' + msg.toLowerCase())
    }

<!-- 向外暴露 -->
    return doSometing;
    }

<!-- 暴露doSometing出去后怎么用？ -->
    var fn = myModule();  
<!-- 
    执行后 得到的是函数 把它放进fn中
 -->
<!-- 这样再执行 相当于myModule()() -->
fn();  


- 假如现在我想向外暴露doSometing doOtherthing怎么做？
- 现在我要暴露两个数据怎么办呢？
    是不是用一个容器把这两个数据封装起来啊, 用什么容器？ 对象呗

<!-- 向外暴露 给外部使用的方法 -->
    return {
        doSometing:doSometing,
    <!-- 名字起成一样的吧 前面的是字符串：后面的是函数名 -->
        doOtherthing:doOtherthing      
    }

<!-- 这么调用 -->
var module = mymodule();
module.doSometing()
module.doOtherthing()



> 换一个写法

(function(){

    var msg = 'My aiguigu' 
    function doSometing(){
        console.log('doSomething()' + msg.toUpperCase())
    } 
<!-- 这部分还是私有的 不向外部暴露的话 外部是看不见的 -->
    function doOtherthing(){    
        console.log('doOtherthing()' + msg.toLowerCase())
    }

> 之前是用return向外暴露，如果是匿名函数自调用怎么向外暴露呢？,把这个要暴露的东西 添加到 window的属性
    window.myModule2 = {
        doSometing:doSometing,
        doOtherthing:doOtherthing   
    }
})();



> 外部是用匿名函数自调用写的
- 上面的js文件写好后怎么用呢？
script type="text/javascript"src="myModule2.js">

<!-- 我直接就能看见我的模块对象 直接 -->
myModule2.doSometing();
myModule2.doOtherthing();


> 这两种方式哪个好一些？ 第二种
- 第一种 要想获取 js模块 必须要先执行函数才行 var module = mymodule();
- return后, 执行函数后 才能得到想要的闭包吧

- 第二种 一引用就能用了

> 有的时候我们会这么写

    (function(window){
        var msg = 'My aiguigu'       
        function doSometing(){
            console.log('doSomething()' + msg.toUpperCase())
        }                                                     
        function doOtherthing(){    
            console.log('doOtherthing()' + msg.toLowerCase())
        }  

        window.myModule2 =  {
            doSometing:doSometing,
            doOtherthing:doOtherthing   
        }

    })(window);
<!-- 
    这种写法有一个好处，在代码压缩的时候 会把局部变量一些函数 变成abcd 也就是说 ，window可能会被压缩成w. 如果没有定义，就不能压缩成w
 -->

-------------------------------------------

### 闭包有什么样的缺点

1. 缺点
- 函数执行完后，函数内的局部变量没有释放，占用内存时间会变长, 容易造成内存泄漏

2. 解决
- 能不用闭包就不用, 及时释放

function fn1(){
    var arr = new Array[100000];
    function fn2(){
        console.log(arr.length);
    };
    return fn2;
}
<!-- 
    产生闭包了么？ 产生了 闭包死了么？ 没有 因为 f 在, 但是也有问题，f在就会导致我的数组一直没有被释放
 -->
var f = fn1();   
<!-- 解决办法 让内部函数 成为垃圾对象 回收闭包 -->
f = null 



### 内存溢出 以及 内存泄漏

1. 内存溢出
一种程序运行出现的错误, 当程序运行需要的内存超过了剩余内存时，就抛出内存溢出的错误
- 一个程序能拥有的内存空间是有限的 超出了这个空间程序就没办法运行 就崩溃了

    var obj = {};
    for(var i=0; i<10000; i++){
        obj[i] = new Array(100000000)
    }
<!-- 这个循环遍历会产生很多个Array对象，我要把所有的对象都放在obj里面去 怎么放进去 -->
    obj[i] = new Array(100000000)

<!-- 也就是obj占用的内存会特别大 -->

2. 内存泄漏  意思是本来我有很大的内存可以用，但是你泄漏了一部分的内存 我可用的内存变小了, 占用的内存没有及时释放, 内存泄漏积累多了就容易导致内存溢出

> 常见的内存泄漏
- 意外的全局变量
    function fn(){
<!-- 这里程序员以为是局部变量 -->
        a = 3; 
        console.log(a);
    }
<!-- 
    如果a =3 是局部变量的话 fn()调用完 a就会被释放 这就是意外的全局变量
 -->
    fn()

- 没有及时清理的计时器或回调函数
<!-- 启动定时器后不清理 -->
    var a = setInterval(function(){
        console.log('---');
    },1000)

    clearInterval(a);

---------------------------------

### 递归函数
- 如果一个函数在内部可以调用其本身, 那么这个函数就是递归函数
- 简单的说就是自己调用自己的函数就是递归函数

- 递归函数的作用 和 循环效果一样 反复执行
- 由于递归很容易发生'栈溢出'的错误 所以必须要加条件 return
<!-- 
    因为每次调用函数都会开辟内存空间, 越开越多就死了
 -->

> 简单的写法
<!-- 
    在内部又调用了次自己
    function fn() {
        fn();
    }
    fn();

    先执行全局中fn() 然后进入到fn函数内部 又再次调用fn, 又进入到这个函数内部
    有点像for循环
 -->

> 利用递归打印6句话
<!-- 
    let num = 1;
    function fn() {
        console.log(num);
        if(num == 6) {
            return;         // 递归里面必须加退出条件
        }
        num++;
        fn();
    }
    fn();

    开启函数 然后打印console 然后判断等于6么 num++ 成为了2
    再次调用fn 它会再回到函数内部的开头 再执行 再打印 再判断

    当到6的时候 退出 因为console在上面所以会打印完6句
 -->


### 利用递归的小案例
> 求1 ~ n的阶乘 用户输入几 求1-n之间的阶乘
    function fn(n) {
<!-- 后一个数比前一个数大一 -->
        if(n == 1) {
            return 1;
        }
        return n * fn(n-1);
    }
    fn(3);

<!-- 
    解析:
    假如用户输入的是3

    return 3 * fn(3-1)   =>   3 * fn(2)
    到这里并不能返回一个值, 因为它必须得把fn(2)的结果拿到后才能返回
    也就是说必须要把fn(2)的结果算出来才能返回
    那fn(2)相当于再次调用fn这个函数此时里面传递的就是2了
    return 3 * fn(2)    =>   3 * (2 * fn(2-1))
    然后还是因为fn(2-1)并不是个结果 它会继续求值
    fn(1)是多少? 1把 ok, 现在都有结果了
    3 * (2 * 1)
 -->

> 利用递归函数求斐波那契数列(兔子序列)
- 1, 1, 2, 3, 5, 8, 13, 21...
- 用户输入一个数字n, 就可以求出, 这个数字对应的兔子序列值, 就是我输入的是位数, 返回的是这个位数所对应的数字

- 前两项相加正好等于第三项的和, 所以我们只需要知道用户输入的n的前面两项就可以计算出n对应的序列值

- 前两项 n-1 前面的第一项, n-2前面的第二项


> 利用递归求: 根据id返回对应的数据对象
let data = [
    {
        id:1,
        name:'家电',
        goods: [
            {
                id:11, 
                gname:'冰箱'
            },
            {
                id:12, 
                gname:'洗衣机'
            }
        ]
    }, 
    {
        id:2,
        name:'服饰'
    }
]
- 需求:
    我们想要输入id号, 就可以返回数据的对象

<!-- 
    查询数组的每一个对象 我们用forEach来做, 既然我们想输入id号, 那么我们可以封装成一个函数 
-->
    function getId(obj, id) {
        obj.forEach(function(value, index){
<!-- 
    里面有两个元素, 第一个是id为1的对象, 第二个是id为2的对象 
-->
    // console.log(value);
    <!-- 
        两个对象, 和一个undefined, undefined的原因是函数调用了但是没有返回值 所以是undefined
     -->

<!-- 
    那现在我们就相当于拿到了两个最大的数组元素 分别是id1 id2的两个对象  
    接下来我们根据id去找元素 进行判断 每个元素都有一个id, 那么我们可以拿着用户输入的id和元素的id进行对比, 一样的话我们就返回
    如果元素的id 等于 用户输入的id
-->
        if(value.id == id) {
<!-- 
    这里我们就可以拿到数据了 但是我想要的是 用户输入id 我这边返回任意对象 
    现在是最外成的得到了 里层的呢?
-->
            console.log(value);

<!-- 
    那怎么得到里层的数据呢? 继续forEach, 比如我们拿到了goods的数组 这个数组里面也有数组元素 我再次forEach然后根据id判断一下就可以拿到里面的相应数据了  
    那是不是相当于把现在这个函数再整体的执行一次呢? 这里我们就可以使用递归
    那怎么写呢?
    我么是先在外层来判断, 当外层没有的情况下我们再去里层判断 
    所以if是判断外层的, 那么我们可以写else if就是判断里层的
-->
 

<!-- 
    在这里面怎么判断, 首先得有goods这个数组吧 而且这个里面不能为空把 如果是一个空数组就不用遍历的 所以这里应该有两个条件 
    里面应该有个goods数组并且数组的长度不为0
-->
        } else if (value.goods && value.goods.length > 0) {
<!-- 在这个情况下我们去遍历数组, 在这里就没必要再去写forEach了 -->
            getId(value.goods, id);
        }
    })
}
<!-- 
    可是递归不是要加退出条件的么? 递归是在forEach里面它里面有一个if和else 通过if else来判断到底要不要递归 
    我们再遍历的时候数组肯定是有一条两条之类的情况 果然条数遍历完了我就不在进行递归了 相当于给我加了退出条件
-->
    getId(data,11);

> 总结
<!-- 
    function getId(json, id) {
        json.forEach(function(value, index){
            if(value.id == id) {
                console.log(value);                  
            } else if (value.goods && value.goods.length > 0) {
                getId(value.goods, id);
            }
        })
    }
    getId(data,11);

    执行过程
    首先传入id11, 然后走到elseif因为外层没有 进入内层 elseif里面再次调用函数, 
    又回到最上方 这时传入的就是内部的value.goods 走到if部分 输出语句
 -->


> 上面只是把数据打印出来了, 那怎么得到数据呢?

    function getId(json, id) {

<!-- 用来接收返回的数据 -->
        let obj = {};

        json.forEach(function(value, index){
            if(value.id == id) {

<!-- 把获取到的外层数据保存到obj中 -->
                obj = value;
<!-- 
    这里把结果返回 为什么把返回结果写在if里面呢? 因为结果都是在if里面得到的
    elseif只是负责递归函数而已
-->
                return obj;

            } else if (value.goods && value.goods.length > 0) {
<!-- 
    这里会收到上面return value返回的结果, 也就是会获取到外层得到的结果
    然后我们拿着这个结果去找value.goods

    因为函数调用必要要有返回值
 -->
                obj = getId(value.goods, id);
            }
        })

<!-- 我们在forEach的外面把obj返回来 -->
        return obj
    }
<!-- 有返回值了 那就必须要接受结果 -->
    let result = getId(data,11);
    console.log(result);    { 空对象 } 
<!-- 
    因为getId(value.goods, id); 这句 
    调用完函数必须要有个返回的结果 得重新更新一下我们的obj, 因为上面的obj只是外成的结果 所以我们必须要把用里层的结果把外层的obj结果覆盖掉

    返回值可以在外层的if里面得到
-->

---------------------------------

### 浅拷贝 和 深拷贝
- 浅拷贝只是拷贝一层, 更深层次对象级别的只拷贝引用
- 深拷贝拷贝多一层, 每一级别的数据都会拷贝

- 在以前如果想拷贝数据到另外一个对象里面 需要用到for in遍历对象
<!-- 
    // 需求 把这个对象拷贝给另外一个对象

    let obj = {
        id:1,
        name:'andy'
    };

    let obj2 = {};
        
    // 我们可以使用for...in 遍历obj
    for(key in obj) {
        console.log(key);       //属性名
        console.log(obj[key]);  // 属性值

        // 给一个对象添加属性的时候 obj.name = value, 给obj2添加属性
        obj2[key] = obj[key];
    }
    console.log(obj2);

    结果:
        id: 1
        name: "andy"

        msg: {age: 1}
 -->
> ↑ 总结:
 - 结果看似没有问题, 其实拷贝的是msg的地址, 这个地址存的还是obj里面的地址值
- 也就是说明一个问题 既然是地址值拷贝给了o, 那么我通过o修改msg里面的值 会影响到原来obj里面的值
<!-- 
    // 我们修改o中的数据 会影响到obj里面的数据
    o.msg.age = 2;
    console.log(o.msg.age);     //2
    console.log(obj.msg.age);   //2

    这就是浅拷贝, 把更深层次的对象的地址值拷贝给了o o和obj指向了同样的数据 修改其中的任何数据, 都会影响另外的数据
 -->

> Object.assign(拷贝给谁, 拷贝哪个对象);
- ES6中的浅拷贝的新方法
<!-- 
    Object.assign(o, obj);
    console.log(o);
 -->


### 深拷贝
- 深拷贝就是拷贝多层, 每一层的数据都会拷贝
- 深拷贝会把更深层次的对象, 重新开启一个新的空间, 把数据复制到新空间里, 再把新空间返回给对象, 这两新对象和被拷贝的对象互补干扰

<!-- 
    let obj = {
        id: 1,
        name: 'andy',

        msg: {
            age:1
        },
        color: ['pink', 'red', 'blue']
    };

    let o = {}

    // 核心思路:
    obj中id 和 name都是简单数据类型 msg是一个对象, 如果是一个对象那就利用for in来遍历里面的属性名

    // 封装一个拷贝函数 参数: 拷贝给谁, 拷贝谁 
    function deepCopy(newobj, oldobj) {
        for(let k in oldobj) {

判断是简单类型的数据 还是 复杂类型的数据 如果是简单的就是浅拷贝的方法, 如果是复杂的类型那就再次进入

            // 获取属性值 oldobj[k]
            let item = oldobj[k];

            // 判断这个值是否是数组
            if(item instanceof Array) {

                // 如果是一个数组 就把这个数组给新对象的属性
                newobj[k] = [];

deepCopy(newobj, oldobj);
相当于 o.color = []
重新再次递归一下 拷贝是color: ['pink', 'red', 'blue']
['pink', 'red', 'blue'] 这是部分是属性值 也就是 let item = oldobj[k];
也就是item
给谁呢? 也就是newobj是谁呢? 给新对象的属性名

                deepCopy(newobj[k], item);

            // 判断这个值是否是对象
            } else if (item instanceof Object) {  
                newobj[k] = {};
                deepCopy(newobj[k], item);
            } else {

                // 属于简单数据类型
                newobj[k] = item;
            }
        }
    }
    deepCopy(o, obj)
    console.log(o);
    // 最终格式
    // {id: 1, name: "andy", msg: {…}, color: Array(3)} 
 -->

> 完整代码:
<!-- 
    function deepCopy(newObj, oldObj) {
        for(let k in oldObj) {
            let item = oldObj[k]

            if(item instanceof Array) {
            newObj[k] = []
            deepCopy(newObj[k], item)
            } else if(item instanceof Object) {
            newObj[k] = {}
            deepCopy(newObj[k], item)
            } else {
            newObj[k] = item
            }
        }
    }
 -->

---------------------------------

### 一、基础总结深入 - 数据类型

> 基本类型（值类型）
    string      值为    任意字符串
    number      值为    任意的数字
    boolean     值为    true false
    undefined   值为    undefined
    null        值为    null

> 对象类型（引用类型）
    Object      值为    任意对象
    Function    值为    一种特别的对象（可以执行 内部包含着可运行的代码）
    Array       值为    一种特别的对象（数值下标（操作数据要用数值下标、内部数据是有序的））


### 判断数据类型
- 如何判断，因为不同数据类型 行为不一样  不知道类型的话就不知道怎么操作

### 对数据类型进行判断的方式:
> typeof
- 返回值：数据类型的字符串表达
<!-- 说白了返回的是字符串，既然是字符串 那就是要加上引号 -->
- 可以判断一个值是否是
    undefined / number / string / boolean / function
- 不能判断的是
    null / Object / Array


> ===  
- 可以判断一个值是否是undefined / null  ---> 因为这两个类型就一个值

    var a = null;
    console.log(a === null);
    var a = undefined;
    console.log(a === undefined);
                
    
> instanceof
- 返回值:   布尔值
- 语法：    A instanceof B    A是不是B的实例
- 它可以间接的判断A的类型 是不是一个对象？ 或者 是不是一个数组？
    A instanceof B
<!-- 
    A是不是B的实例 那也就是说B应该是一个 构造函数（因为在JS里类型是通过构造函数去表达的）,判断对象的具体类型（它会判断这是一个函数 还是一个数组） 
-->

### 具体使用的方式:
> 

> 使用typeof 和  === 判断基本类型
- 返回的是：数据类型的字符串表达（说白了返回的是字符串）
- 可以判断一个值是否是undefined / number / string / boolean

    var a;
    console.log(a, typeof a)                    //undefined 'undefined'
    console.log(undefined === 'undefined')      //false
<!-- 
    我们判断typeof a 等不等于 一个类型要这么写  typeof a === "undefined" 
    引号不要忘记 因为typeof返回值为一个字符串

    var a = undefined;
    console.log(a === undefined);           //true
    var a = 3;
    console.log(typeof a === "number");     //判断a的类型
    var a = "aiguigu";
    console.log(typeof a === "string");     //判断a 等不等于 字符串类型
-->


> 使用 instanceof 判断对象      是 数组 / 对象 / 函数?
- 语法：
    A instanceof B    A是不是B的实例
<!-- 它可以间接的判断A的 具体类型 是 数组 / 对象 / 函数 -->

    console.log(b1 instanceof Object);
    console.log(b1 instanceof Array);
    console.log(b1 instanceof Function);

<!-- 其中 函数 还可以用typeof来判断 -->
    console.log(typeof b1.b3 === 'function')       //别忘了typeof的值是一个字符串 'function'

>>> 案例1:
<!-- 创建一个对象 -->
var b1 = {
<!-- b2是一个数组，里面有number，string，函数 -->
    b2:[1, 'abc', console.log],

<!-- 
    怎么知道console.log是什么数据类型
    
    console.log(typeof b1.b2[2] === 'function')  true
    那b1.b2[2]既然是个function, 那就可以b1.b2[2]()

    b1.b2[2](4); === console.log(4);
 -->
    b3:function(){
        console.log(b3);
    }
};

- 需求:
- 区别上面这b1,2,3的类型

> 判断 b1 的类型： 
    console.log(b1 instanceof Object);      //true
<!-- 
    A instanceof B --- > A是不是B的实例

    那也就是说B应该是一个 构造函数（因为在JS里类型是通过构造函数去表达的）
    Object是一个 构造函数（平时的时候对象是 new Object()创建的吧，所以Object是一个构造函数）

    b1 是一个实例对象
 -->
 
> 判断 b2 的类型：
    console.log(b1.b2 instanceof Array, b1.b2 instanceof Object,);  //true true
<!-- 判断b2是数组还是对象 ---> 既是数组 也是对象 -->
        
> 判断 b3 的类型：
    console.log(b1.b3 instanceof Function, b1.b3 instanceof Object);
<!-- 判断b3是函数还是对象 ---> 既是函数 也是对象 -->


>>> 案例2:
- 我在函数内部 return一个函数, 那么这个函数怎么调用?
    var b1 = {
        b2:[1, 'abc', console.log], 
        b3:function(){
            console.log(b3);

            return function(){
                return 'xfzhang'
            };    
        }
    };

<!-- 
    b1.b3(); 
    现在我得到的是 第一个return

    return function(){
        return 'xfzhang'
    }; 

    b1.b3()();
    得到的是 第二个return  return 'xfzhang'

    怎么打印？
    console.log(b1.b3()());
    不要纠结于表面我们要看 我们得到的是什么类型的数据 才能知道下一步怎么操作
 -->

---------------------------------------

### 关于数据类型的三个问题
> undefined与null的区别？
- 都代表什么东西都没有

    undefined   代表 定义了    没赋值
    null        代表 定义了    并赋值   值为null

    var a;
    console.log(a);     //undefined

    var a = null;
    console.log(a);     //null


> 什么时候给变量赋值为null呢？
- 初始赋值，表明将要赋值为对象
- 结束赋值，让对象成为垃圾对象
    var b = null;
<!-- 
    初始赋值为null，表明将要的赋值为对象，这样可以让下一个人知道 这个b即将要被赋值一个对象 
    确定对象（或者数据来了） 就赋值
-->

    b = [12, 'atguigu'];
    b = null;
<!-- 最后释放数组所占用的内存，让b指向的对象成为垃圾对象（被 垃圾回收器 回收） -->


> 严格区别变量类型与数据类型？
- 数据的类型
    基本类型 和 对象类型

- 变量的类型（变量内存值的类型，变量本身是没有类型的）        
    基本类型 和 引用类型 

> 变量什么时候是基本类型：
- 保存的是基本数据类型的数据 

> 变量什么时候是引用类型：
- 保存的是地址值 
    
    var c = {};
<!-- 
    这是我的对象数据，这是数据是个对象 有人会说这是引用类型 何为引用类型？ 
    c里面存的是什么？ 存的是内存地址这个类型的引用 对象在堆内存里 c在栈内存里c保存的不是对象 保存的是地址值 c本身不是对象，只是说c能找到对象，它保存的是内存地址
 -->

- 很多时候我们判断变量的类型 其实是在判断 值的类型

    var c = function(){ ... }; 
<!-- 
    这个c是不是引用变量？是吧 函数是一个对象 我们将函数对象的地址值保存在c中
    那我们用typeof c

    console.log(typeof c);      //返回的是 "function"  
    它是怎么知道的？只看c 只看值？是function的  它只能根据存储的内容找到这个内存才能发现它是个函数对象 
-->

---------------------------------------

### 什么数据？
- 存储在内存中代表特定信息的'东西'，本质是010101...
- 数据的特点：
1. 可传递
2. 可运算

- 一切皆数据
- 内存中所有操作的目标是：数据
1. 算术运算
2. 逻辑运算
3. 赋值运算
    var a = 3;
    var b = a;      //拷贝a的内容赋值给b
4. 运行函数

<!-- 一种特定类型的数据类型 应该是特定的 所以上面才会先考虑怎么判断一个数据的类型，只有知道是什么数据类型了 才能知道怎么操作这个类型的数据 -->

    var age = 18;
<!-- 这个18就是一个数据，它代表了特定信息 -->

    var a = 2;
<!-- 这个2仅仅是一个数值而已，真正在写项目的时候 都有特定的信息 -->

---------------------------------------

### 什么是内存？
- 内存条通电以后产生的可存储数据的空间（临时的，因为要通电嘛）
- 内存产生和死亡：
- 内存条（电路板）---> 产生内容空间 ---> 存储数据 ---> 处理数据 ---> 断电 ---> 内存空间和数据都消失

- 一块小内存的两个数据
1. 内部存储的数据
2. 地址值数据 标识一块内存的

    var obj = {name:"tom"};
    console.log(obj.name);

> ↑ 思考：
<!-- 
    输出obj.name先找obj吧，读的obj内部存储的内容还是内部存储的地址？
    读的是内容 只是这个内容是个地址值   .的作用是什么？

    .的作用相当于 拿着ox123沿着箭头找到对应的内存
    是不是所有的变量都能 . 呢？什么样的变量才能 . 呢？

    是不是这个变量存的是内存地址才能 . 啊
    name:'tom'      内存中的小标识 ：内存中存储的数据
 -->
        

- 内存中 每一个小内存都有对应的地址值 这个内存是个对象 它的地址值我们就用 其他的都不用 其他的用内存中存储的数据

    栈内存              堆内存
    a = 0x123           ox123
    obj：0x123          name:'tom'

    var a = obj;
<!-- 
    我们是在用obj的地址值么？不是
    是将obj的地址值赋值给a么？不是

    而是将里面的数据拷贝一份保存到a中，只有一种情况才会读地址值 将一个对象赋值给谁的时候读的才是
    地址值 其他的时候都是在读内存内容，只是内存里有两种数据 一种是基本数据 一种是地址值数据
 -->

> 栈空间的小内存它可以存基本类型的数据 也可以存地址类型的数据 如果它存的是地址数据 我们称之为引用变量

> 内存的分类
    栈  ---> 全局变量 和 局部变量
    堆  ---> 对象
<!-- 函数名在 栈 里面，因为它本身是变量名 对象本身在堆空间里 -->

---------------------------------------

### 什么是变量？
- 可变化的量，它由变量名 和 变量值 组成 每个变量都对应一块小内存

    变量名：用来查找对应的内存
    变量值：内存中保存的数据

    var age = 18;
    console.log(age);
<!-- console.log的执行过程就是，拿着age的名字去找到名为age存18的空间，找到以后读取内部保存的数据 -->

    内存，数据，变量三者之间的关系
    内存：用来存储数据的空间（临时空间），硬盘是永久空间（慢）
    变量：内存的标识

---------------------------------------

### 变量中保存的是什么?

-  a内存中到底保存的是什么？
    var a = xxx;    

- xxx是基本数据，保存的就是这个数据
    var a = 3;

- xxx是对象，保存的是对象的地址值
    var a = {};
<!-- xxx是变量，保存的是xxx的内存内容（可能是基本数据，也可能是地址值） -->

---------------------------------------

### 引用变量赋值的问题
- 将变量的内容赋值给另一个变量，如果是对象的话 就是将内容内的内存地址赋值给另一个

- N个引用变量指向同一个对象，通过一个变量修改对象内部数据，其他所有变量看到的是修改之后的数据
- 两个引用变量指向一个对象，让其中一个引用变量指向另一个对象，另一个引用变量依然指向前一个对象

> 情况1:
    var obj1 = {name:"tom"};

<!-- 
    将obj1的内存内容保存到obj2 只是obj1的内存内容是地址值 让两个obj指向同一个对象
 -->
    var obj2 = obj1;    

    obj1.name = "jack";
    console.log(obj2.name);     //jack 


<!-- 定义一个函数 接收obj -->
    function fn(obj){     
        obj.name = "bob";
    };

    fn(obj1);  
<!-- 
    执行的时候是 实参 赋值给 形参，就是将obj1的内容（内存地址） 赋值给了形参，也就是说 现在有3个变量指向了同一个对象
    然后都指向了 name:tom 然后在函数内部被修改为bob
 -->
                        

console.log(obj2.name);     // 是tom 是bob？  bob

> 情况2:
    var a = {age:12};
<!-- 两个引用变量指向一个对象 -->
    var b = a; 

    a = {name:"bob"};
    console.log(b);         // b里有name的属性么？ 没有

    a = {name:"bob", age:13};
<!-- 
    这里不是自己想的 对var a = {age:12};这个进行了修改，而是直接指向了别的对象
 -->
    console.log(b.age, a.name, a.age);      //12 bob 13
<!-- b还是a = {age:12}; 这个对象 a已经指向了别的对象，分离了 各是各的 -->
>> 让其中一个引用变量指向另一个对象，另一个引用变量依然指向前一个对象

> 接着来
    function fn2(obj){
        obj = {age:15}
    };
    fn2(a);

    console.log(a.age);     //a是多少？     13还是15？      13
<!-- 
    将a = {name:"bob", age:13};作为实参 传递给了 形参obj 
    这时候他俩同时指向一个 都是13

    但是函数内部把obj指向了另一个对象，所以 这时候 他们分别指向了各自的对象
    上面有两个要点，一是a没有变，二是仍然指向的是a之前的内容 所以是13

    obj = {age:15}这个是函数内部的 它将成为垃圾对象，因为函数执行完，函数就会关闭，局部变量就会释放
 -->


> 再来一题

    function fn(obj) {
        obj.name = "bob";
    }

    and

    function fn(obj) {
        obj = {age:15};
    }

- - obj.name = "bob";  和  obj = {age:15}  是不一样的

    obj.name = "bob"是原有的对象上增添属性
    obj = {age:15}是修改引用变量的值(内存地址)

<!-- a.age 中的 . 是找对象的意思 先可以这么理解 -->

---------------------------------------

### 调用函数时 传递变量参数，是值传递 还是 引用传递
> 理解1：
- 都是值传递，无论是基本数据还是引用变量 传递的都是变量的内容 或者说是值，只是这个值 有两种情况 基本值还是地址值 都是变量内部存储的数据

> 理解2：
- 可能是值传递 也可能是引用传递（地址值）

<!-- 
    首先要知道 这里的a 和 函数中的形参a 不是一个东西 虽然长的一样
 -->
    var a = 3;

    function fn(a){
        a = a+1;
    };

    fn(a);               
    console.log(a);     //为啥不是4？

> ↑ 解析：
<!-- 这里的a是一个变量 -->
    var a = 3;

<!-- 这里的形参a是一个新的变量 -->
    function fn(a){ ... }

<!-- 
    这里我传递的不是a 一定要记住 传递的是3
    也就是说传递完后 跟var a = 3;中的a 就没有关系了 使用的只是数据而已
 -->
    fn(a);


- 我们说对一块内存有哪些操作? 
- 两种 要么就读 要么就写
- 一般 = 号左边的就是写（被赋值），= 号右边就是读
<!-- 
    这里相当于var a = 3里的a的值赋值给 function fn(a)中的a(形参变量a) = a(全局变量) 
-->
    function fn(a) { ... }


> 对于值传递的时候, 对引用类型的值传递的解释
1.  function fn2(obj){
2.      console.log(obj.name);
3.  };
4.  var obj = {name:"Tom"};
5.  fn2(obj);
<!-- 
    5中fn2(obj); 调用fn2函数 传了一个obj, 那就要先读到obj的值（4. obj是对象只能读地址值吧） 

    读到这个对象{name:"Tom"}的地址值

    5中的obj读到地址值后 把地址值 赋值 给 1中的 形参obj

    最怕这么理解
    var obj = {name:"Tom"}; 把5中的{name:"Tom"}对象 直接传递形参obj
 -->

---------------------------------------

### JS引擎如何管理内存
var a = 3;
<!-- 执行这条语句的时候 需要被分配一个小空间 -->

var obj = {};
<!-- 首先上面的两条语句 占用了3个空间 a obj {} -->

obj = null;
<!-- 对象的空间释放了，但是obj自己没有释放 -->

function fn(){
<!-- 
    这行的时候还没有产生变量，局部变量要在被调用时产生，函数完毕后死亡 自动释放 
-->
    var b = 4;      
};
fn();


> 内存生命周期
1. 分配小内存空间 得到使用权 
2. 存储数据，可以反复进行操作
3. 释放当前的小内存空间，不释放的话 内存一直被占用着


> 释放内存
1. 局部变量 函数执行完自动释放
2. 对象     首先要成为垃圾对象，在后面由垃圾回收器回收

---------------------------------------

### 对象相关问题

> 什么是对象
- 对象可以存储多个数据 变量只能存一个，或者是用来保存多个数据的容器
- 一个对象代表现实世界中的一个事物，一个事物身上有多个数据，用编程语言来描述显示世界的事物 就用对象来描述
    var p = {
        name:"Tom",
        age:18,
        setName:function(name){
            this.name = name;
        }
        setAge:function(age){
            this.age = age;
        }
    }


> 为什么要用对象
- 统一管理多个数据


> 对象的组成
- 属性    属性名(字符串) 和 属性值(任意类型) 组成 
- 方法    一种特别的属性 setName setAge 属性值是函数的就是方法


> 如何访问对象内部数据
console.log(p.name);
- 访问对象内部方式之一
> .属性名
- 才能得到属性值
<!-- 之后得判断数据类型是什么 如果是一般的属性可以读 -->
     
<!-- 
    假如我想调用setName 这么写行不行p.setName 这么写会输出p.setName的值 它的值是整个函数 首先你得先知道前面得到的是一个函数  后面才知道怎么调用
    平常函数是用来执行的

    p.setName();
 -->

    
- 访问对象内部方式之二
> ["属性名"]

- 现在我还是要调用setAge
    p['setAge'](123);
    p['age']

<!-- 方式一比方式二简单一些 方式一有的时候不能用 方式二可以通用 -->

> 什么时候必须使用['属性名']的方式？
1. 属性名包含特殊字符： - 空格
<!-- 
    不确定的东西用什么存储，变量名也是个数据吧（字符串） 用一个变量来存储这个变量名 
-->

    var p = { ... };

<!-- 给p对象添加一个属性：content-type:text/json -->
    p.content-type = "text/json"    //报错了
    p['content-type'] = "text/json" // p['content-type']


2. 变量名不确定
    var propName = 'myAge';
    var value = 18;

    怎么把这个属性添加到p上面去
    p.propName = value;

    p[propName]= value;     // propName 是变量名 所以不用加''

---------------------------------------

### 函数相关问题

> 什么是函数？
- 具有实现特定功能的n条语句的封装体, 只有函数是可以执行的 其他类型的数据不能执行

> 为什么要用函数？
- 提高代码复用, 便于阅读交流
- 代码写出来之后 是程序员之间互相查看的 函数体现的是一种封装的思想 看一遍函数的封装体之后就懂了

> 如何定义函数？

>函数声明
    function fun(){
        console.log();
    };
<!-- 变量提升 -->

> 函数表达式
    var fun = function(){ ... };


> 如何调用函数？
- 执行调用： 
test();

- 通过对象调用： 
obj.test();

- 通过new调用：
new test();

> test.call(obj) / apply(obj);
- 临时让test成为obj的方法进行调用
- 这种方法相当于 obj.test(); 但是obj上面没有test方法
    
        var obj = {};

        function test2(){
            this.xxx = "aiguigu";
        };
<!-- 
    假如我想用obj调用test2 能直接这么写么？
    obj.test2(); 不行吧 它没有这么方法怎么调呢？
    JS中强大的地方就在这里，我可以让一个函数 成为任意一个对象的方法 来进行调用
    test2.call(obj);    
    可以让一个函数成为 指定任意对象的方法来进行调用
 -->

---------------------------------------

### 回调函数

> 什么是回调函数？
1. 你定义的
2. 你没有调
3. 最终它执行了 在某个时候或者某个条件下（比如 定时器 或者 点击按钮）具备这三点就是回调函数


> 常见的回调函数？
1. dom事件回调函数      与用户交互最关键的点
2. 定时器回调函数

3. ajax请求             与后台交互最关键的点
4. 生命周期回调函数


> 前端主要是
1. 制作页面
2. 交互, 这里的交互指的是两个方面
    1. 点它 它有反应 怎么才能有反应 得绑定事件监听吧
    2. 前后台交互，因为数据是从后端动态获取的 页面不是静态不变的吧 我需要发请求去获取数据显示 一个界面与人的交互 操作 一个是与后台的交互

---------------------------------------

### IIFE
- 立即执行 调用函数表达式
- 作用：
    隐藏实现，我的实现不是完全暴露在外面的
    不会污染外部（全局）命名空间
    用它来编写 JS 模块

    function(){
        console.log();
    };

<!-- 
    这么写完会报错的，要么存起来 要么用起来 名字也不取 也不执行 就没意义
-->
    (function(){
        console.log();
    })();
<!-- 
    匿名函数自调用向上面这么写真是一点意义也没有, 但是有的时候是：
 -->
    (function(){
        var a = 3;
        console.log(a+3);
    })();
    var a = 3;
    console.log(a+3);
<!-- 
    上面两行写在函数外面和函数里面有什么区别？
    写在外面里面都执行 写在外面会产生全局变量a 写在里面就没有产生全局变量
 -->


(function(){
    var a = 1;                  //定义一个变量

@1      function test(){
        console.log(++a);       //定义一个函数 超过变量
    };
    window.$ = function(){      //定义了一个$ 一个函数
        return {                //返回了一个对象
            test:test
        }
    }
})();

<!-- 我想取a 想执行 console.log(++a) 能不能看见 看不见 -->
test();         可以么？不行
$().test();     可以    

<!-- 解析 ↑ ： -->
window.$ = function(){          //向外暴露一个全局函数
@2            return {  
            test:test
        }
<!-- 
    这个部分相当于 向外暴露了一个函数 我最终执行 是把 @1 暴露出去了吧 
    @1 暴露出去后 得到了一个@2对象
-->

$().test();
<!-- $是个函数名, $执行后 返回的是一个对象 -->


---------------------------------------

### 变量的小总结

- 形参的本质是 变量
- 实参的本质是 数据
- 也就是变量的值也就是 传进去的是内存中存储的数据 不管是基本类型的变量 还是 引用类型的变量 传递的都是值 不是他们本身 是值内保存的内容

- 引用变量赋值的问题
- 改变某一个变量本身就是重新赋值 就相当于改变它 比如 两个变量都指向同一个对象，这时候给其中一个对象赋值，那就相当于让它指向了另一个对象

---------------------------------------

### 原型链

### 函数的prototype属性

> 每个函数(和对象)都有一个prototype属性，它默认指向一个Object空对象（即称为：原型对象fun.prototype这就是）
- 原型对象中有一个属性 constructor，它指向函数对象
<!-- 什么叫做空对象： 没有我们的属性 -->

> 给原型对象添加属性（一般都是方法）
- 作用：
    函数的所有实例对象自动拥有原型中的属性（方法）

<!-- 
    每一个函数都有一个prototype属性，那Date()是函数吧
    那它就有prototype
    console.log(Date.prototype);    object的实例对象 里面封装了很多的方法供实例去使用

    原型上的方法是给实例对象使用的
    function fun(){};
    console.log(fun.prototype);     //Object 它默认指向一个Object空对象（没有我们的属性）

    Date.prototype 和 fun.prototype 它们都指向了一个Object对象，它俩相比，Date.prototype里面封装了很多的方法
    而fun.prototype里 有个属性叫constructor 还有个属性叫__proto__
 -->

> 那假如我想在fun.prototype中加一个方法怎么加？
    fun.prototype.test = function(){};     // 这个时候我们里面就有个属性了 test:function(){};


> 原型对象中有一个属性 constructor，它指向函数对象
- 我们来验证下这个事, 首先我们获取原型对象, Date.prototype

    console.log(Date.prototype.constructor === Date);       //true

<!-- 上面说到constructor指向，说明它是一个引用变量属性 它指向函数对象 -->
console.log(fun.prototype.constructor === fun);         //true

> 图解:

    Type(函数名)    → Type.prototype 指向 →    Type原型对象
                   
                   ← Type.prototypeconstructor

- 假设我的函数名是Type 它有一个属性prototype 它指向Type.prototype（它指向Type的原型对象）
- 而原型对象中有个constructor 它指向原型Type
- 也就是说我的构造函数跟它的原型对象之间是相互引用
    A B
- 我是A 你是B A的里面有个属性能找到B  B里有个属性能找到A


> 那原型有什么用？
- 那我给原型对象添加属性（一般是方法） 是给实例对象来访问用的
    Fun.prototype.test = function(){
        console.log('test()');          //这里为什么要加引号 等测试的时候试试
    };

- 我们来创建个实例对象验证下
    var fun = new Fun();        创建一个实例
    fun.test();                 调用test



### 显式原型 与 隐式原型

1. 每个函数function都有一个prototype，即是显式原型（属性）
2. 每个实例对象都有一个__proto__，可称为隐式原型（属性）
3. 实例对象的隐式原型的值 为其对应 构造函数的显式原型的值
4. 内存结构
5. 总结
- 函数的prototype属性：   在定义函数时自动添加的，默认值是一个空对象
- 实例对象的__proto__属性：创建对象时自动添加的，默认值为构造函数的prototype属性值
<!-- 程序员能直接操作显式原型，但不能直接操作隐式原型（ES6之前） -->

1. 每个函数function都有一个prototype，即是显式原型（属性）
    function Fn(){

    };
    console.log(Fn.prototype);      //object

2. 每个实例对象都有一个__proto__，可称为隐式原型（属性）
<!-- 创建一个实例 -->
    var fn = new Fn();
    console.log(fn.__proto__);      //object

3. 对象的隐式原型的值为其对应构造函数的显式原型的值
    console.log(Fn.prototype === fn.__proto__);     //应该返回true

<!-- 
    开始的时候我们都说过每个函数function都有一个prototype，即是显式原型（属性），那显示原型属性是一个引用变量吧 它指向的是一个空的object对象
    那隐式原型指向谁 一样吧，现在相当于我有两个变量一个是 prototype 一个 __proto__ 它们两个都保存的是地址值 而且它们两个的值是一样的
    相等的，所以它们才共同指向原型对象
 -->

- function Fn(){ ... };
- Fn.prototype    解释 → 读函数对象的这个属性
<!-- 
    这里 Fn. .是什么意思？ Fn相当于一个变量 函数变量么？函数名称不就是它的变量么？
    找它的对象 一个函数是不是就是一个对象 那个对象的内部又一个什么属性？ prototype属性
    函数对象一创建就加进去了，那函数对象什么时候创建，定义的时候就创建了
-->

- fn.__proto__那这个属性是什么时候添加的呢？
<!-- 这个属性在实例对象new Fn()身上吧，创建对象的时候引擎加的，也就是在这个函数创建的时候 它的内部做了一件事情 -->
    fn(this).__proto__ = Fn.prototype
<!-- 就是说隐式原型的值 等于 对应 显式原型的值 -->

- 那在它function Fn(){};的内部做了什么事情
<!-- 在创建函数对象的时候 内部做了什么事情, this.prototype = {}; -->

> 结构图:

    function Fn(){ };
    var fn = new Fn();

    console.log(Fn.prototype, fn.__proto__);
    console.log(Fn.prototype === fn.__proto__);

    Fn.prototype.test = function(){
        console.log("test()");
    };
    fn.test();


1. 创建了一个对象
function Fn(){};
2. 接下来干了下面的事情
var fn = new Fn();

3. 我打印fn.__proto__ 最终找到的是 0x234的空对象

4. Fn.ptototype.test = function(){console.log("test()");};
给原型添加方法

5. 通过实例对象调用原型的方法 fn.test();
<!-- 
    fn. .找谁？ 找2中的0x345吧 可是没有test 但最后找到了 说明它的内部去找谁去了？ 找隐式原型属性 __proto__ 最终找到了原型对象里的test方法
    也就是说 通过对象调用了某个方法或者是属性 先在本身上的属性找 ， 没有的话 去原型上找 那是看显示原型属性么？ 不看 看的是隐式原型属性
    那跟显式原型有关系么？ 找的时候是没关系的 但是 隐式原型的值 最先开始赋值的时候 赋值的是显式原型的值
 -->

> 图解:
    栈内存                                  堆内存

2. 创建实例对象                  2. Fn的实例对象(地址值是:0x345)
    fn:0x345            →       实例对象上都有 __proto__属性 它的值是？
                                因为内部都执行 fn(this).__proto__ = Fn.prototype
                                __proto__: 0x234    
                                                        ↘
                                                            空Object对象
                                                            (地址值是:0x234)
                                                            4. 在这里添加了一个方法
                                                            test=function
                                                        ↗
    1. 对象对应的函数名          1. 创建了一个Fn对象
    Fn:0x123                    (地址值:0x123 )                              
    (这里面存的是地址值 )   → 
                                Function里面有个prototype属性
                                (Fn.prototype:0x234(地址值))

---------------------------------------

### 原型链

1. 原型链（图解）
- 访问一个对象的属性时，先在自身属性中查找，找到返回
    - 如果没有，再沿着__proto__这条链向上查找，找到返回
    - 如果最终没找到，返回undefined
<!-- 原型链的尽头是 Object的原型对象，我们的原型链是沿着 隐式原型去找的 -->

- 别名：
    隐式原型链  --- 本质
- 作用：
    查找对象的属性（方法）
<!-- 原型链是用来查找对象属性的 不是用来查找变量的 找变量 去 找作用域链 -->
                                            
2. 构造函数 / 原型 / 实体对象的关系1（图解）
3. 构造函数 / 原型 / 实体对象的关系2（图解）

- 最后看
    函数对象是Function的实例 Function是个什么类型的数据，函数呗 
    所有函数都有两个属性 一个显式原型 一个隐式原型属性 隐式原型属性 指向Function的显式原型

function Foo(){};
    一般这么写 其实都是  var Foo = function(){};

Fucntion = new Function;
    只有这么写 才能保证 它的显式原型 和它自身的隐式原型是相等的 别的函数就没有这个特点
    别的函数 函数的显式原型是一个什么值？ 是一个new的Object 
    所有函数的隐式原型( __proto__) 都是一样的 为什么？ 因为都是new Function 产生的 都是通过这种方式产生的 所以 隐式原型应该都一样

> Object 是 Function的实例 这是咋回事？
- 因为任何函数都是 new Function产生的 无论是内置函数 还是我们定义的函数 都是new Function产生的 当然对了



    function Fn(){
        this.test1 = function(){
            console.log('test1()');
        };
    };

    Fn.prototype.test2 = function(){
        console.log('test2()');
    };

- 创建实例对象
    var fn = new Fn();

    fn.test1();         //能不能调用 可以吧
    fn.test2();         //能不能调用 可以吧

    console.log(fn.toString());         //能不能调用 可以吧
    fn.test3();         //能不能调用？ 不能 fn.test3 is not a function undefined

<!-- 
    当我们去访问一个对象的属性时, 就这上面的这句话 我们看这个Fn.test1(); 这是访问属性么？ 是 可这不是在调用方法么？ 调用方法 方法是不是属性
    首先我是不是根据test1的属性名找到的对应属性值 而且这个属性值 还必须是一个函数 我才能加上() test1(), 那怎么查找的 它应该有一个查找的流程 
-->


### 原型链的属性
1. 读取对象的属性时，会自动到原型链中查找
2. 设置对象的属性值时，不会查找原型链，如果当前对象中没有此属性，直接在当前对象里添加此属性并设置其值
<!-- 一般情况下 我们不会在原型中添加属性，属性一般添加在对象自身身上 方法放在原型上 -->
    Person.prototype.setName = function(name){
        this.name = name;
    };
<!-- 因为每个对象的属性不一样，而方法一样 所以属性添加在自身的身上，而方法添加在原型上 -->
3. 方法一般定义在原型中，属性一般通过构造函数定义在对象本身上


> 小例子
    function Fn(){

    };
    Fn.prototype.a = "xxx";
    var fn1 = new Fn();
    console.log(fn1.a);     //现在能不能看到这个a呢？ 原型上面的属性 实例对象都可见

    var fn2 = new Fn();
    fn2.a = 'yyy';          //改变a的值
    console.log(fn1.a);     //是xxx 还是yyy  结果是xxx 为什么？ fn2.a 是yyy

> fn1.a 为什么不是 yyy 解析 ↓
- 我们在查找fn1中的a时是利用原型链去查找，这个a是在fn自身对象里面有的么？不是 明显放在原型里面了嘛

> 那为什么fn2.a = 'yyy' 没有把xxx覆盖掉呢？
- 我们看下fn2本身 console一下看看 结果是fn2上面多了一个a属性：yyy，而原型上面也有个a属性 值是xxx

    原型链是用来查找对象属性，只有读取对象属性值的时候才会看原型链
    而
    当我设置属性值的时候 不看原型链

---------------------------------------

### 探索 instanceof 
- A instanceof B   判断A 是不是B的实例

1. instanceof 是如何判断的？
    表达式 A instanceof B
<!-- 如果B函数的显式原型对象在A对象的原型链上，返回true 否则返回false -->
2. Function是通过new自己产生的实例

> 案例1：
    function Foo(){};
    var f1 = new Foo();
    console.log(f1 instanceof Foo);         //很明显 是
    console.log(f1 instanceof Object)       //也对

A instanceof B  判断的标准 也就是什么时候返回true呢？
- 函数有什么属性？B有什么属性 显示原型属性（prototype）
- A有隐式原型属性，对象有一个原型链的问题
- B是个函数对吧，它的显式原型所指向的那个对象在A对象的原型链上就，就返回true

    Object instanceof Function      //true
    Object instanceof Object        //true
    Function instanceof Function    //true
    Function instanceof Object      //true
    Object instanceof Foo           //false

---------------------------------------

### 测试题
> 第一题
var A = function(){};
A.prototype.n = 1;

var b = new A();

A.prototype = {     //更新了prototype本身 指向了一个对象
n:2
m:3             //b 能看到 n么
}

var c = new A();
console.log(b.n, b.m, c.n, c.m)  1   undefined  2   3


> 第二题
var F =function(){};
Object.prototype.a = function(){
console.log('a()');
};

Function.prototype.b = function(){
console.log('b()');
};

var f = new F();
f.a()       本身没有a方法，去找原型 a和toString 是在一个容器里
f.b()       找不到
F.a()       相当于 把F看成实例对象 F 能调用
F.b()

---------------------------------------

### 变量提升 与 函数提升(其实就是预处理)

> 变量声明提升
- 通过var 定义（声明）的变量，在定义语句之前就可以访问到
- 值：undefined

> 函数声明提升
- 通过function声明的函数，在之前可以直接调用
- 值：函数定义（对象）

    fun();      //我是一段测试文字    
    function fun(){
        console.log("我是一段测试文字")
    };

\\ 问题：变量提升和函数提升是如何产生的

var a = 3;
    function fn(
    console.log(a);
    var a = 4;
)
fn();       //undefined 
- 运行流程，在函数体执行前，var a; 


> 函数声明提升
fun();      //能不能调用？ 能 因为是函数提升 结果：我是一段测试文字    

function fun(){
    console.log("我是一段测试文字")
};

fn3();                  //能不能调用 不能 因为它遵循的是变量提升
var fn3 = function(){
    console.log('fn3()')
};

---------------------------------------

### 执行上下文
1. 代码分类（位置）
    全局代码
    局部代码

2. 全局执行上下文
- 在执行全局代码前 将window确定为全局执行上下文
- 对全局数据进行预处理，就是要收集数据了 在这步的时候 全局代码还没有执行
    var定义的全局变量 ---> undefined，添加为window属性
    function声明的全局函数 ---> 赋值（fun），添加为window方法
    this ---> 赋值（window）
- 开始执行全局代码 


<!-- 我在下面定义的a2 我在上面能直接访问到a2 -->
a2();            

<!-- 
    我在下面定义的a1 我在上面能直接访问到a1
    我找a1的时候 是去全局上下文里找因为 已经被作为属性添加在window里了window.a1
 -->
console.log(a1);    

console.log(this);  
<!-- 
    我一上来就能访问这个 我能访问说明它已经在了 说明在执行全局代码之前 它要做一些准备工作
 -->

<!-- 
    那a1 a2去哪找的？ 要知道a1相当于 window.a1; a2相当于 window.a2 这些东西都在window里面
    也就是说无论是要查找函数还是变量都要去window里面找
 -->


var a1 =3;
function a2(){ };


> 函数执行上下文
- 函数执行上下文
- 在调用函数，准备执行函数体之前，创建对应的函数执行上下文对象
- 对局部数据进行预处理
    形参变量 ---> 要赋值（赋值的是实参数据） ---> 添加为执行上下文的属性
    arguments ---> 赋值（所有的实参列表） ---> 添加为执行上下文的属性
<!-- 在我执行函数体之前 arguments已经在了 而且还有值 -->

    var定义的局部变量 ---> undefined，添加为执行上下文的属性
    function声明的函数，---> 赋值（fun），添加为执行上下文的方法
    this ---> 赋值（调用函数的对象）
- 开始执行函数体代码

<!-- 我们的内存空间是隔离的 你在你的区域 我在我的区域 不影响 -->


function fn(a1){
    console.log(a1)             //2
    console.log(a2)             //undefined
    a3();                       //a3()
    console.log(this)           //window
    console.log(ararguments)    //[2,3]
<!-- 
         类数组或者叫伪数组, 这里能访问到下面的哪些东西   
 -->

    var a2 = 3;
    function a3(){
        console.log('a3()');
    }
};
fn(2, 3);

> 测试题：
console.log('gb：' + i);                //undefined
00      var i = 1;
11      foo(1);
22      function foo(i){
33          if(i == 4){return}          // 如果i=4 停止
44          console.log('fb:' + i);     //1
55          foo(i+1);
<!-- 
    这里调了一个当前函数foo 这种调用成为 递归调用：在函数内部调用自己
    递归函数一般都会有退出终止的条件if(i == 4){return} 要不就是一个死循环
    i在不断的增加吧
 -->
66          console.log('fe:' + i);     //1

};

console.log('ge' + i);                  //1


讲一下函数的执行流程
00  var i = 1;
11  foo(1);
22  function foo(i){
33      if(i == 4){return} 
44      console.log('fb:' + i);
55      foo(i+1);
66      console.log('fe:' + i); 
};
console.log('ge' + i);


var i
function foo(i) {
    if(i==4) return
    console.log('fb'+i);
    foo(i+1);
    console.log('fe'+i)
}
console.log('gb：' + i);
i=1;
foo(1);
console.log('ge'+i)
<!-- 
    首先开始输出44行fb，因为11行开始调用，直接到44行开始输出第一条语句 fb：1
    我们想开始传了1进来输出fb：1 

    接下来 又开始执行55行 foo(i+1);，这时候传进去的是1+1=2
    然后又会输出第44行 输出fb：2

    然后又开始调用foo(i+1);，这时候传进去的是2+1=3
    然后又会输出第44行 输出fb：3

    接着又开始调用foo(i+1);，这时候传进去的是3+1=4
    然后遇到了33行，就结束了

    i=4结束了，开始执行i=3 所以输出fe：3
    i=3 输出 fe：3后 当前调用就结束了 结束就要移除
    开始执行i=2 输出fe：2结束就要移除
    开始执行i=1 输出fe：1

    也就是最后调用的函数结束了 前面的函数没有结束
    66行其实每调用一次foo(i+1); 66行都会执行 只是执行的时机不一样
 -->


> 测试题1     答案function
    function a(){};     // 来个a 定义了一个函数
    var a;              // var了个a
    console.log(typeof a)
<!-- 
    无非就是两种可能性 一个undefined 一个是函数 这里面涉及到了变量提升 和 函数提升 谁先谁后的问题 
    先执行变量提升，再执行函数提升 最终 typeof a是function
-->
    
- 最终的顺序应该这样的 所以是function:
var a；
function a(){}; 
console.log(typeof a)



> 测试题2     答案undefined
    if(!(b in window)){
        var b = 1;
    }
    console.log(b);    
<!-- 
    先看 b in window 是true还是false 如果是true就不能进到var b = 1 所以最后的值就是undefined
 -->



> 测试题3     答案 c is not a function
    var c = 1;
    function c(c){
        console.log(c);   
    }
    c(2);

- 首先存在变量提升 和 函数提升
    function c(c){
        console.log(c);   
    }       
- 实际上代码应该是这样的结构
    var c;
    function c(c){
        console.log(c);   
    } 
    c=1;
    c(2); 
<!-- 
    c=1 是个数字类型了 就不能调用函数了 c不是函数了
 -->

---------------------------------------

### 复习:

> 栈结构用一句话概括后进先出

> 函数对象才有这个属性prototype
> 平时使用这个属性时是 函数. 一旦用.了 是把函数做为函数看还是对象看？ 作为对象看
- 但是这个对象不是函数对象 就没有这个属性，比如new Object产生的对象就没有 因为它不是一个函数对象
- 那Object有没有这个属性，它本身就有 因为它就是函数对象 所有的函数对象都有 显式原型属性（prototype）
- prototype是个引用变量的属性 说明它指向的是一个对象，指向的对象被称为原型对象

- prototype是函数被创建的时候添加进去的，什么创建的函数对象呢？定义函数的时候被创建，

> 执行函数定义：
    就是编写函数体，定义函数的时候其实就是执行函数定义，函数体并没有执行，只是创建了一个函数对象
    定义函数 它创建函数对象时内部要执行一条语句
    this.prototype = {}     //创建了一个空的函数对象 这个对象也就是原型对象
    this是 创建的函数对象 

> 执行函数
    就是fn()，这才是执行了函数对象


- 实例对象就有隐式原型属性 那实例对象又分为两类
- 一类是函数（函数是实例对象 这个实例对象有些特别 它同时又有显式原型对象），一般情况下 我们说的实例对象不是指的函数
- 但函数它是实例对象 平时我们说创建实例对象 那肯定不是说定义一个函数 有时候我们把函数对象称之为类型对象 比如我们定义一个Person 这个Person是一个类型吧


> 函数对象是Function的实例
- 我们一般说的实例对象是 new Person产生的 也就说 new 构造函数产生的对象
- 实例对象的隐式原型和函数的显式原型有什么样的关系 是相等 或者说指向同一个对象 属性说白了就是变量
- prototype和__proto__ 这两个数形变量都是引用变量 引用变量用来指向对象，他们都指向同一个对象

> __proto__属性是new实例时产生的
- 也就是说我们创建实例对象时 它的内部会产生一条语句 this.__proto__ = fun.prototype(假设叫fun) 结果就是它们指向了同一个对象

this.__proto__ = fun.prototype
- 我们现在赋值 相当于把prototype里面的值 这个内存的值 这个内里里面存了个地址值 赋值给__proto__
- 怎么样才能让两个引用变量都指向同一个对象，将一个引用变量 赋值给 另一个引用变量就可以了 因为 赋值的是地址值

> 构造函数 和 它的实例对象都指向了一个空对象，这个空对象真的是空的么？
- 它的里面还有 所有的实例对象 都有一个 隐式原型属性__proto__，还有一个constructor（它叫构造器，想想我一个实例对象我得知道我的构造器是谁吧）


### 原型链：
- 用来查找对象的属性，准确的说是查找实例对象的属性，隐式原型组成的链 
- 找不到返回undefined

    如果输出一个变量没有 它会报错           找变量是沿着作用域链找
    如果输出一个属性没有，它会undefined     找属性是沿着原型链找


- JS的继承是基于原型的继承 原型是个对象吧，有的时候也会说js是基于对象的继承
- 一个实例的原型对象可能有多个 顶部默认是object的原型 这也就是说 所有new出来的实例对象 都有toString方法 一个函数本身也是一个实例对象，平常我们只观察函数身上的显示原型属性

- 这么理解
    obj.test()
<!-- 根据test这个属性名去找这个属性 这个属性里面对应的值是一个函数 -->

> 有个地方要注意一下, 所有构造函数的实例对象的隐式原型 指向 构造函数的显式原型
- 所有我们定义函数，它的原型对象的是object的实例, 有一个例外 是object自己 它指向它自己

> 实例对象的隐式原型 等于 它所对应的显式原型
- 那我们想 一般情况下 object是不是实例对象 , 一个函数既有显式原型又有隐式原型 它自身的隐式原型和显式原型相等么？ 不相等，但有一个例外

A.prototype = {};           //这种的意思是 把原型对象指向了另一个对象，不会影响之前创建好的实例，但会影响之后创建的实例
A.prototype.xx = value;     //这种是在原型上添加属性或者方法 会影响到之前和之后创造的实例



### 执行上下文 与 执行上下文栈 是根据变量提升和函数提升引申出来的

变量提升（）和函数提升（） 是执行上下文 与 执行上下文栈的结果 

> 变量先提升 接下来是函数再提升
> 函数的优先级更高 是指提升的晚 后执行

- 变量提升后 var a 的a去哪去了 放在执行上下文里去了 执行上下文有两个 一个是全局上下文，一个是函数上下文
- 得看这条语句是写在函数外面 还是写在函数里面 如果是全局的语句 那就是提高到window里面去了 如果你是一个函数内部的语句, 只有在执行调用函数的时候 才能产生提升

> 在执行上下文中 代码分为全局代码和函数内部代码 两种类型
- 一个对应的是全局上下文 一个是函数上下文
- 什么时候确定全局执行上下文 在全局代码执行前 将window确定为执行上下文 确定好了以后 做预处理操作 也就是收集数据
- 也就是用var定义的全局变量，还有函数声明的函数 还有this 收集的时候给它们赋值 变量是undefined 函数是函数对象，this是window

- 而且把函数和变量放到哪去？ 放到window里面去 也就是保存到全局执行上下文里去了

> 整个过程分3步
1. 确定执行全局上下文 window
2. 预处理
3. 执行全局代码

> 函数执行上下文，调用函数的时候产生，跟调用了几次函数
1. 创建一个函数执行上下文
2. 预处理 收集数据
3. 函数内部的局部变量 一个是形参，var定义的局部变量 functon声明的函数 this  arguments 都会放在执行上下文中, 放之前要先赋值，形参也要赋值 赋实参的值，arguments是实参列表 局部变量undefined 函数为函数对象

<!-- 
    做好这件事情后 就存在函数执行上下文里去, 下一步 执行函数体 就涉及到找某一个变量，去执行上下文里去查
    执行上下文没在对空间里面
    执行上下文栈用来管理和保存执行上下文对象，栈底是window 上面是函数的执行上下文  
    比如下面结构，栈底是window 上面是两个函数， f1和f2是什么关系，f1内部调用f2才会产生这种现象
 -->

---------------------------------------

### 作用域
- 就是一块 地盘， 一个代码段所在的区域, 它是静态的（相对于上下文对象），在编写代码时就确定了

> 分类
- 全局作用域
- 函数作用域
- 没有块作用域, 什么是块作用域，相当于大括号作用域
    if(true){
        var c = 3;
    }
    console.log(c);
<!-- 我在外面能不能见到c 能看到就不是块作用域 -->

> 作用
- 隔离变量 不同作用域下同名变量不会有冲突

var a = 10, b = 20;
function fn(x){
    var a = 100, c = 300;
    console.log('fn()',a,b,c,x);
                // a:100, b:20, c:300, x:10

    function bar(x){
        var a = 1000, d = 400;
        console.log('bar()', a, b,c,d,x)
                // a:1000, b:20, c:300, d:400, x:100/200
    };
    bar(100);
    bar(200);
};
fn(10);

- 上面产生了几个作用域？
- 执行上下文对象是什么原则，是n+1原则，是调用了几次函数+1


### 产生作用域的原则
- 是N+1原则 N是定义了几个函数 就是几个函数作用域，1是全局作用域

> 作用域和执行上下文的区别
- 区别1
- 全局作用域之外，每个函数都会创建自己的作用域，作用域在函数定义时（编码时）就已经确定了，而不是在函数调用时

- 全局执行上下文环境是在全局作用域确定之后，js代码马上执行之前创建，动态创建的
函数执行上下文环境是在调用函数时，函数体代码执行之前创建

- 区别2
- 作用域是静态的，只要函数定义好了就一直存在，且不会再变化
- 执行上下文环境是动态的，调用函数时创建，函数调用结束时上下文环境就会自动释放

- 联系
- 执行上下文环境（对象） 是从属于所在的作用域
    全局上下文环境 --- 全局作用域
    函数上下文环境 --- 对应的函数使用域

-------------------------------------------------

### 作用域链
- 嵌套的作用域 产生的 由内向外 由下向上的一个过程
- 多个上下级干洗的作用域形成的链，它的方向是从下向上或者从内到外, 查找变量时就是沿着作用域链来查找的

> 查找一个变量的查找规则
- 在当前作用域的执行上下文中查找对应的属性，如果有直接返回，否则进入2
- 在上一级作用域的执行上下文中查找对应的属性，如果有直接返回，否则进入3
- 再次执行2的相同操作，直到全局作用域，如果还找不到就抛出找不到的异常

-------------------------------------------------

### 作用域 --- 面试题

var x = 10;
function fn(){
    console.log(x);
};

function show(f){
    var x =20;
    f();
<!-- 这里就是把console.log(x); 这条语句拿到这执行 -->
};
show(fn)       答案是10, 为什么是10不是20 
<!-- 
    执行这个函数 f(); 相当于 执行fn()；
    那执行fn我的先找x x怎么找 我们看看作用域

    一个大全局作用域里 包含了两个正方形，上面的正方形是fn的函数作用域 下面的是show的函数作用域

    首先我要在fn的函数作用域里面找x，有么？ 没有吧 没有的话去哪找？ 外部作用域找吧 外部x是10
 -->



var fn = function(){
    console.log(fn);
};
fn()    输出的是整个函数

var obj = {
    fn2:function(){
        console.log(fn2)
    }
}
obj.fn2();      //上面的报错了
fn2:function(){
    console.log(fn2)
<!-- 
    我在函数输出fn2 函数内部有fn2么？ 没有吧 去全局里面找 全局里面没有fn2 所以报错了, 那(fn2) 为什么不找 fn2: 呢？ 要想找 fn2: 得写this.fn2, 如果我要找这个对象内部的fn2: 我就得this.
 -->


### 闭包 -- 面试题

var name = "The Window";
var object = {
    name:'My Object',
    getNameFunc : function(){
        return function(){
            return this.name;
        }
    }
};
alert(object.getNameFunc()());    //The window
<!-- 
    为什么不是My Object 不是通过object它调用的么？
    object.getNameFunc
    getNameFunc是通过object调用的
    object.getNameFunc() 调用后得到一个函数 后面加个括号 直接执行这个函数
    我直接执行函数，函数体内部的this就是window
 -->


var name2 = "The Window";
var object2 = {
    nam2e:'My Object',
    getNameFunc : function(){
        var that = this;        这种情况 经常用 因为this 是经常变化的
        return function(){
            return that.nam2e;
        }
    }
};
alert(object2.getNameFunc()()); 

- 执行object2.getNameFunc() 得到的是
function(){
    return that.name;
}
<!-- 
    这个函数 接着执行这个函数 函数中的this是谁？ this是window没问题
    但这里面是that
    that里面保存的是 调用getNameFunc时的this
    那调用getNameFunc的this是谁 object2嘛
 -->
    




function fun(n, o){
    console.log(o);
    return {
                            ------------------
        fun:function(m){
            return fun(m, n)    1. 返回的是这个对象
        }
                            ------------------
    }
}

var a = fun(0); 
<!-- 
    这个调用的是外面的fun
    1.执行它的时候返回的是一个对象
    此时闭包产生了 闭包产生没有就看内部的函数对象有没有创建

    闭包是n 那n的值是0
 -->

                    
a.fun(1);
<!-- 
    接着a去调用fun 传了一个1 调用的是谁 调用的是 上面1.的对象吧
    传的1 传给的是m 里面的n 是0
    这个a.fun 调用的是里面的fun：

    调用它（a.fun）有没有产生新的闭包 有没有看 有没有调用外部函数 调用a.fun有没有执行外部函数？
    我执行1.里面的对象 最终会执行 return fun(m, n) 执行这个fun 就是执行了外部的fun 执行外部的fun就会产生新的闭包
    但是马上就消失了

    无论传什么我始终用的都是a里面的闭包 因为 有var a = 关联着
    假如我var b = a.fun(x); 那这时候也会有新的闭包 这个闭包就不会消失
 -->
                        

a.fun(2);
a.fun(3);
            undefined 0 0 0

var b = fun(0).fun(1).fun(2).fun(3);
            undefined 0 1 2

var c = fun(0).fun(1); 
c.fun(2);
c.fun(3);

---------------------------------------

### 原型链的继承

> 方式一： 原型链的继承
1. 套路
    1.1     定义父类型构造函数
    1.2     给父类型的原型添加方法
    1.3     定义子类型的构造函数
    1.4     创建父类型的对象赋值给子类型的原型
    1.5     将子类型原型的构造属性设置为子类型
    1.6     给子类型原型添加方法
    1.7     创建子类型的对象：可以调用父类型的方法

2. 关键
    2.1     子类型的原型为父类型的一个实例对象

<!-- 定义父类型 -->
    function Supper(){
        this.supProp = 'Supper property'
    };

<!-- 给父类型添加方法，加方法最好在原型上加 -->
    Supper.prototype.showSupperProp = function(){
        console.log(this.supProp);
    };

<!-- 定义子类型 -->
    function Sub(){
        this.subProp = 'Sub property'
    };

<!-- 为了让Sub能看到Supper原型上的方法，指向Supper的实例 -->
    Sub.protptype = new Supper(); 
<!-- 
    要想继承有一个最关键的点，就是 子类型的原型为父类型的一个实例对象
    子类型的原型：Sub.prototype = 父类型的一实例对象: 必须new 父类型 就是实例嘛

    想想看 以前是不是    var obj = new Object();        obj是Object的实例
    Sub.protptype = new Supper();                               
 -->

> 再让子类型的原型的constructor指向子类型的构造函数
    Sub.prototype.constructor = Sub
<!--
    这样就能保证 让Sub的实例看到的constructor都是Sub 不然后的话 一看一个错的就不好了 就是说 我写这个 不影响我读父类型的方法 但是constructor指向一个错误的地方不好
  -->

<!-- 给子类型添加方法，加方法最好在原型上加 -->
    Sub.prototype.showSubProp = function(){
        console.log(this.SubProp);
    };

    var sub = new Sub();
    sub.showSupperProp(); 
<!-- 
    我希望 它能够调用 父元素原型中的方法 如果能调用就说明有 继承的效果 说白了就是它的东西我能拿到

    showSupperProp这一方法 所有Supper的实例都能看到 如果sub能看见是不是形成了继承关系

    报错了 sub showSupperProp is not a function 代表现在showSupperProp的值是undefined

    我们现在是通过sub 点 showSupperProp 去找对象属性 找对象属性查找的是 对象的原型链 无非就两个

    要么找原型链 要么 找作用域链 什么时候找作用域链啊 变量

    sub.showSupperProp();   我找它 先找什么？ 先找sub 找sub用的是作用域链因为是一个变量

    找到sub后 知道 sub是一个对象（var sub = new Sub();） 接着我在new Sub() 这个对象找showSupperProp这个属性
    
    这时候用的是原型链 这个值必然得是个函数才能加括号执行 只要它不是函数就会报错, 关键是 怎么样 才能 看到父类型的原型上添加的方法呢？

    先不管上面的 我们想想 我们能不能看到 sub.toString() 能吧

    能的原因是什么？ 内部执行了什么语句？ 我们说过实例对象找方法 先是在本身里面找 找不到就去原型上找 

    而现在我的原型对象是一个Object的实例 而Object的实例对象能找到哪里的方法？
    Object原型上的方法 而谁在原型上面 toString()

    那 Supper.prototype.showSupperProp 中的showSupperProp这个方法在哪？
    在Supper的原型上 那谁能看到它 Supper的实例 那我要想办法让Supper的实例？

    我之所以能看到 toString() 是因为内部有这样一条语句
    Sub.prototype = new Object();

    也就是说 Sub.prototype这个原型对象 是Object的实例 所以它能看到Object原型上的方法

    那我们怎么才能让sub看到父类型原型上的方法 是不是让Sub.prototype这个原型指向谁？
    指向Supper的实例 而Supper的实例能看到Supper.prototype.showSupperProp = function() 原型上面的方法嘛

    所以： Sub.protptype = new Supper();
 -->
 
console.log(sub.constructor) 
<!-- 查看实例对象sub的构造函数是谁   应该是Sub  而现在是 Supper -->
     
     
<!-- 
    为什么是Supper？
    constructor这个属性在new Sub()这个对象里面了么？ 没有 只有原型对象有constructor这个属性
    那原型对象有 我的实例对象能不能看见 可以 
    只是我现在的原型对象是new Supper(); 这个实例
    那Supper的实例去读constructor的时候 读的是谁？ 就是Supper呗

    那constructor属性有没有在new Supper()上面 ？
    在Object实例对象身上 可以console.log(sub)查看原型
    Object实例对象的constructor指向Supper函数对象

    可以这样不对啊 这很恐怖
    现在是Sub的实例 它的构造属性 竟然指向的是 Supper 这样不对 应该让它指向Sub
 -->


> 方式二： 借用构造函数继承（假的）
1. 套路：
    1.1 定义父类型构造函数
    1.2 定义子类型构造函数
    1.3 在子类型构造函数中调用父类型的方法

2. 关键：
    在子类型构造函数中通过call(this)调用父类型构造函数

function Person(name, age){
                                        ----------------
    this.name = name;
    this.age = age;
<!-- 
    这两句      有人说this不是Person的实例么？ 我写在下面是谁了？
 -->
                                        ----------------
};                  

function Student(name, age, price){
<!-- 
    相当于this.Person(name, age) 相当于把上面那两句话 搬到这里来执行
 -->
    Person.call(this, name, age); 
    this.price = price;                         
}

var s = new Student('Tom', 20, 14000);
console.log(s.name, s.age, s.price); 
<!-- 
    能不能取调用s.name, s.age？ 能 那为什么不用 this.Person(name, age) 这句话呢？

    不能写这句 因为new Student('Tom', 20, 14000);这个实例的时候 没有Person(name, age)这个函数方法
    没有的话 能不能借用一下啊？可以吧
    看这句Person.call(this, name, age);
    call干嘛去啦？是借用执行，谁来执行这个Person 是括号里的this this是谁？ new出来的s

    相当于Student借用了 Person的函数
 -->
                                            

> 方式三：组合继承
1. 利用原型链+借用构造函数的组合继承
2. 利用super()借用父类型构造函数初始化相同属性



function Person(name, age){
    this.name = name;
    this.age = age; 
};    
<!-- 上面的Person构造函数也会有一些方法 方法应该放到原型上面的吧 -->
Person.prototype.setName = function(name){
    this.name = name;
}; 

function Student(name, age, price){
<!-- 为了得到属性 最终属性和方法都可见 -->
    Person.call(this, name, age);
    this.price = price;                         
}
<!-- 要想真正产生继承关系 一定要写两条语句, 子类型的原型 等于 父类型的实例 -->
Student.prototype = new Person(); 
<!-- 
    new Person()括号里什么也不用填写，这么做是为了能看到父类型中的方法 
    属性在上面的call已经处理好了 call是为了初始化属性的
 -->
                                            
2.  Student.prototype.constructor = Student  //修正一下

Student.prototype.setPrice = function(price){
    this.price = price;
}; 

var s = new Student('Tom', 20, 14000);
s.setName('bob');
s.setPrice('1600');
console.log(s.name, s.age, s.price); 

---------------------------------------

### 复习：

- 作用域的作用是用来隔离变量 在不同的作用域里定义相同的变量 不冲突

- 作用域链用来查找变量 沿着作用域链找变量, 找到就返回 找不到就要报错
<!-- 
    比如a.b 找a是沿着作用域链找，找b是沿着原型链找 找不到就返回undefined
 -->

<!-- 
    如果我找window.a 会是undefined, 如果直接找a 会报错
    那平时 我们说 直接写a 相当于 window.a, 还是有点区别 区别就是找不到以后 它怎么处理
 -->


- 作用域是代码一书写时就确定了
- 作用域是N+1个 N是定义了多少个函数，1是全局


- 执行上下文也是N+1 N是执行函数的次数 1是全局
- 执行上下文是动态产生的 尤其是函数执行上下文 不会一直存在，调用的时候产生 函数执行完就死亡

- 查找一个变量 找的是作用域链 而作用域链是根据我代码定义（书写）的位置确定的, 跟调用位置没关系



> 什么是执行上下文栈（执行栈），执行上下文（可执行代码）

首先说一下 可执行代码的类型有什么
1. 全局代码
例如加载外部的js文件或者本地标签内的代码。全局代码不包括 function 体内的代码
2. 函数代码
function体内的代码
3. eval代码

当js引擎遇到这三种类型的代码的时候，都会进行一些准备工作，这些准备工作，专业的说法就叫执行上下文。
或者说js引擎遇到这三种类型的代码的时候，就会进入到一个执行上下文。

每当js代码在运行的时候它都是在执行上下文中运行。
执行上下文可以理解为当前代码的执行环境，它会形成一个作用域

1.2 那么js引擎在遇到可执行代码的时候，它究竟会做哪些准备工作呢？
全局执行上下文：
全局执行上下文：
*浏览器引擎在执行全局代码前将window确定为全局执行上下文
*对全局数据进行预处理
var定义的全局变量==>undefined,添加为window的属性
function声明的全局函数==>赋值为fun，添加为window的方法
this==>赋值为window,表示全局执行上下文
*开始执行全局代码
一个程序中只会有一个全局执行上下文。

var num = 2;
function pow(num) {
return num * num;
}
引擎如何读取上面的代码？
引擎：第一行，它是变量！将它存储在全局存储器中。
引擎：第二行，我看到了一个函数声明。让我们也把它存储在全局存储器中。

全局存储器：
    全局内存包含全局变量和函数声明供以后使用。

    当Javascript引擎运行你的代码时，它会创建：
        全局执行上下文
        全局存储器（也称为全局作用域或全局变量环境）




函数执行上下文：每当一个函数被调用时，都会为该函数创建一个新的上下文。每个函数都有自己的执行上下文，不过是在函数被调用时创建的。函数上下文可以有任意多个。每当一个新的执行上下文被创建，它会按定义的顺序执行一系列步骤。
*在调用函数，准备执行函数体之前， 创建对应的函数执行上下文对象
*对局部数据进行预处理
形参变量==>赋值(实参)==>添加为执行上下文的属性
    arguments==>赋值(实参列表)，添加为执行上下文的属性
    *var定义的局部变量==>undefined,添加为执行上下文的属性
    function声明的函数==> 赋值(fun),添加为执行上下文的方法
    this==>赋值( 调用函数的对象)
*开始执行函数体代码

3.执行上下文的生命周期：
创建过程： 1.创建变量：即初始化函数的参数arguments，提升函数及变量的声明
            2.建立作用域和作用域链，
            3.确定this的指向。
执行过程：1.变量赋值，2.函数引用，3.执行其他代码。
销毁阶段：执行完毕后出栈，等待被回收。

创建阶段：
在全局执行上下文中，this的值指向全局对象，在浏览器中，this的值➡window对象；在nodejs中指向的是➡module对象
在函数执行上下文中，this的值取决于函数的调用方式（即如何被调用的）。当它被一个引用对象调用，则将的值this设置为该对象，否则this的值设置为全局对象或undefined（在严格模式下）


执行上下文栈
在一个javascript程序中，必定会产生多个执行上下文，javascript引擎会以栈的方式来处理它们，也就是执行上下文栈

执行上下文栈
每个函数都有自己的执行环境，当执行流进入一个函数时，函数的环境就会被推入一个环境栈中。函数执行完后，栈将其环境弹出，把控制权返回给之前的执行环境。
一个程序代码中包含多个函数，也就是包含多个函数执行上下文，为了管理好多个执行上下文之间的关系，JavaScript中创建了执行上下文栈来管理执行上下文。执行上下文栈是具有后进先出结构的栈结构，用于存储在代码执行期间创建的所有执行上下文。
当JavaScript引擎运行JavaScript代码时它会创建一个全局执行上下文并将其push到当前调用栈。（函数还没解析或者是执行、调用）仅存在全局执行上下文，每当引擎发现函数调用时，引擎都会为该函数创建一个新的函数执行上下文，并将其推入到堆栈的顶部（当前执行栈的栈顶）。当引擎执行其执行上下文位于堆栈顶部的函数之后，将其对应的函数执行上下文将会从堆栈中弹出，并且控件到达当前堆栈中位于其下方的上下文（如果有下一个函数的话）


---------------------------------------

### 进程与线程
- 有的程序是多进程的 有的是单进程的
- 如果一个程序的进程中 有多个线程 那它就是多线程的程序 只有一个线程就是单线程程序

> 进程：
- 程序启动了一个对应的进程就启动了，程序的一次执行，它占有一片独有的内存空间
可以通过window任务管理器查看进程

> 线程：
是进程内的一个独立的执行单元，是程序执行的一个完整流程 是cpu的最小单元

> 相关知识：
- 我们应用程序的代码必须运行在某个进程的某个线程上，也就是说一个程序启动后一个线程都没有能运行代码么？ 不能
- 一个进程中至少有一个运行的线程： 主线程，进程启动后自动创建，因为要运行代码 在运行之前必要要创建一个主线程
- 一个进程中也可以同时运行多个线程，我们会说程序是多线程运行的
- 一个进程内的数据可以供其中的多个线程直接共享
- 多个进程之间的数据是不能直接共享的（因为进程之间的内存是独立的）
- 线程池：保存多个线程对象的容器，实现线程对象的反复利用

> 何为多进程与多线程
- 多进程运行：一个应用程序可以同时启动多个实例运行
- 多线程：在一个进程内，同时有多个线程运行

>比较单线程与多线程
多线程
    优点：
        能有效提升CPU的利用率
    缺点：
        1. 创建多线程需要开销的（需要费工夫的 不是随便就有的）
        2. 线程间切换开销
        3. 死锁与状态同步问题
单线程
    优点：
        顺序编程简单易懂  单线程说白了就是从上往下执行 这时候编码比较简单，多线程的话 编码要复杂一些
    缺点：
        效率低

> JS是单线程还是多线程
- JS是单线程运行的, 但使用H5中的web Workers可以多线程运行   
- 启动分线程的语法

> 浏览器运行是单线程还是多线程
都是多线程运行的

> 浏览器运行是单进程还是多进程
- 有的是单进程的
    firefox
    老板ie
- 有的是多进程
    chrome
    新版ie

> 双核cpu 
- 在同一个时间点 同时做两件事 这样两个线程在同一个时刻可以同时运行

> 单核cpu
- 也能创建多线程 创建2个线程 但它只能处理一个线程，另外一个线程暂停 
-它不会等一个线程执行完再执行另一个 它会在两个线程间跳转运行 这个叫线程间的切换 不是

---------------------------------------

### 浏览器内核
- 支撑浏览器运行的最核心的程序
<!-- 
    浏览器也是软件也是应用 也是很多代码组成 在这些代码中 有支撑它运行最核心的代码 这就是内核
 -->

- 不同的浏览器内核可能不一样
    chrome safari ：        使用的是 webkit 内核
    firefox：               Gecko
    ie：                   Trident
    360 搜狗等国内浏览器：  Trient+webkit   设计到钱的时候 会切换到Trident 安全性比较高

> 内核由多个模块组成 有哪些呢？
- 主线程运行的模块
    JS引擎模块：负责JS程序的编译与运行
<!-- （也是程序 同时也是代码 浏览器内部就有的 内核中） -->
    html，css文档解析模块：负责页面文本的解析

    DOM/CSS模块：负责dom/css在内存中的相关处理

    布局和渲染模块：负责页面的布局和效果的绘制（内存中的对象）

- 分线程运行的模块
    定时器模块：负责定时器的管理
    DOM事件响应模块：负责事件的管理
    网络请求模块：负责ajax请求


> 定时器引发的思考
1. 定时器真的是定时执行的么？
- 定时器并不能保证真正的定时执行
- 一般会延迟一丁点（可以接受），也可能延迟很长时间（不能接受） 设定200 实际580

2. 定时器回调函数是在分线程执行的么？
- 在主线程执行的，js是单线程的

3. 定时器是如何实现的？
- 事件循环模型（后面讲）
<!-- 
    var start = Date.now();
    console.log('启动定时器前')

    setTImeout(function(){
        console.log('定时器执行了'，Date.now()-start)
    },200)

    console.log('启动定时器后')
 -->
    

> js是单线程执行的
1. 如何证明js执行是单线程的
    setTimeout()的回调函数是在主线程执行的
    定时器回调函数只有在运行栈中的代码全部执行完后才有可能执行

2. 为什么js要用单线程模式，而不用多线程模式
    js的单线程，与它的用途有关
    作为浏览器脚本语言，js的主要用途是与用户互动 以及操作DOM
    这决定了它只能是单线程，否则会带来很复杂的同步问题

3. 代码的分类
    初始化代码
    回调代码    回调函数中的代码

4. js引擎执行代码的基本流程
    先执行初始化代码：包含一些特别的代码    回调函数（异步执行）
        设置定时器
        绑定监听
        发送ajax请求
    后面在某个时刻才会执行回调代码


    setTimeout(function(){
        console.log('timeout 2222')
    },2000);

    setTimeout(function(){
        console.log('timeout 1111')
    },1000);

    function fn(){
        console.log('fn');
    };
    fn();

打印顺序应该是: 
    fn ---- timeout1 ---- timeout2

console.log('alert之前');
alert('-----') 
<!-- 
    它有个特点 暂停当前主线程的执行 同时暂停计时，点击确定后，恢复程序执行的执行 
-->
console.log('alert之后');
<!-- 
    alert除了暂停当前主线程的执行 还暂停了计时 要是没停的话 点确定立马会出来 
-->

---------------------------------------

### 浏览器的事件循环（轮询）模型

> 所有代码分类
- 初始化执行代码（同步代码）：
<!-- 包含绑定dom事件监听，设置定时器，发送ajax请求的代码 -->
- 回调执行代码（异步代码）：处理回调逻辑

> JS引擎执行代码的基本流程：
- 初始化代码 ---> 回调代码

> 模型的2个重要组成部分
- 事件（定时器/DOM事件/ajax）管理模块
- 回调队列

> 模型的运转流程
- 执行初始化代码，将事件回调函数交给对应模块管理
- 当事件发生时，管理模块会将回调函数及其数据添加到回调列队中
- 只有当初始化代码执行完后（可能要一定时间），才会遍历读取回调队列中的回调函数执行
<!-- 启动定时器 绑定事件监听 是初始化代码中特别的部分 -->

                                                ----------
setTImeout里 将function和1000 交给定时器管理模块
绑定事件监听 将回调函数 交给dom事件的管理模块       这两部分是浏览器负责的
                                                -----------

- 初始化代码 执行完毕只有 才能处理 回调代码 回调代码会在一个队列里 待执行



### 执行栈
- execution stack, 所有的代码都是在此空间中执行的

### 浏览器内核
browser core
js引擎模块（在主线程处理）
其他模块（在主/分线程处理）
运行原理图

-----------------------------------------

### H5 Web Workers（多线程）
- H5规范提供了js分线程的实现，取名为 Web Workers
- 它是H5提供的一个js多线程解决方案, 我们可以将一些大计算量的代码 交给web worker运行而不冻结用户界面

- 但是子线程完全受主线程控制，且不得操作DOM（只能是主线程操作页面）
<!-- 所以，这个新标准并没有改变js单线程的本质 -->

> 相关Api
worker：构造函数，加载分线程执行的js文件
worker.prototype.onmessage: 用于接收另一个线程的回调函数
worker.prototype.postMessage: 向另一个线程发送消息

> 不足：
worker内代码不能操作DOM（更新UI）
不能跨越加载JS, 不是每个浏览器都支持这个新特性
<!-- 
    编程实现 斐波那锲数列 (Fibonacci sequence)的计算
    F(0)=0, F(1)=1, F(n)=F(n-1)+F(n-2)

    <input type="text" placeholder="数值" id="number">      
    <button id="btn">计算</button>

    怎么设计一个函数 给它一个值 能对应的返回 斐波那契呢？
 -->


function fibonacci(n){
<!-- 
    递归调用 函数内部调用自己  递归的效率是比较低的
 -->
    return n<=2 ?1 :fibonacci(n-1) + fibonacci(n-2);
};

    var input = document.getELementById("number")
    var btn = document.getELementById("btn");
    btn.onclick = function(){
    var number = input.value;               
    var result = fibonacci(number);    // 我们要把这条语句交给分线程
    alert(result);
};
<!-- 
    上面的计算量太大，导致在计算的时间中 用户不能操作浏览器等待时间过长
    怎么把长时间的操作 放在 分线程里操作
    我要把number 传递给 分线程 分线程去计算 计算完以后把结果（result在分线程产生）返回主线程，主线程拿到结果更新页面提示 
 -->

### web worker
> 创建在分线程执行的JS文件
<!-- 不能用函数声明 -->
    var onmessage = function(event){    
        console.log('onMessage()22');
<!-- 通过event.data获得发送来的数据 -->
        var upper = event.data.toUpperCase();
<!-- 将获取到的数据发送回主线程 -->
        postMessage(Upper);
    }

> 在主线程中的我们向分线程发消息并设置回调
<!-- 创建一个worker对象 并向它传递将在新线程中执行的脚本的url -->
    var worker = new Worker('worker.js');
<!-- 接受worker传过来的数据函数 -->
    worker.onmessage = function(event){
        console.log(event.data);
    };
<!-- 向worker发送数据      向分线程发送消息 -->
    worker.postMessage('hello, world');


> 在主线程里的代码
var input = document.getELementById("number")
var btn = document.getELementById("btn");
btn.onclick = function(){
    var number = input.value;    

<!-- 将number想办法传递给分线程 -->

<!-- 创建一个worker对象 -->
    var worker = new Worker(这里写 在分线程里执行的 js文件地址比如'worker.js');

<!-- 绑定接收消息的监听 -->
    worker.onmessage = function(event){
        console.log('主线程接收分线程返回的数据'+event.data);
        console.log(event.data);
    };

<!-- 向分线程发送消息 -->
    worker.postMessage(number);
    console.log('主线程向分线程发送数据'+number);
};

<!-- 下面写分线程的代码 要在一个js文件中写 要写一些固定的东西 -->
function fibonacci(n){
    return n<=2 ?1 :fibonacci(n-1) + fibonacci(n-2);
};

var onmessage = function(event){  
    var number = event.data;
    console.log('分线程接收到主线程发送的数据'+number);

<!-- 计算 -->
    var result = fibonacci(number); 
<!-- 将获取到的数据发送回主线程 -->
    postMessage(result);
    console.log('分线程向主线程返回数据'+result);  
}


我们思考下 在分线程 打印this this是谁 全局上面的属性和方法我们直接可以使用
分线程中的this指向了 DedicatedWorkerGlobalScope这个全局对象

我们平时在全局里面可以直接使用document 因为document是window的属性嘛

问题是 我在分线程里能不能调用主线程的方法
因为主线程的全局对象是window
分线程的全局对象是DedicatedWorkerGlobalScope

比如 alert是window的方法 能在 分线程里使用么？ 不能

前面说过在分线程里不能操作界面 因为在分线程里看不到window

分线程中的全局对象不再是window所以在分线程中不可能更新界面 因为更新界面要用window和document里的方法

-----------------------------------------

### 本地存储 (localStorage, sessionStorage)
- 随着互联网的快速发展, 基于网页的应用越来越普通, 同时也变的越来越复杂, 为了满足各种各样的需求, 会经常性在本地存储大量的数据, HTML5规范提出了相关解决方案
<!-- 
    以前我们会把数据放在数据库里, 还要去服务器里面取过来再拿来使用 
    也有些东西根本就没有必要放在数据库里面
 -->


> 位置查看
- F12 --- Application --- 左侧 Storage Session Storage


> 本地存储的特性
- 1. 数据存储在用户浏览器中
- 2. 设置, 读取方便, 甚至页面刷新都不会丢失数据
- 3. 容量较大
    - sessionStorage    约5M
    - localStorage      约20M

- 4. 只能*存储字符串*, 可以*将对象JSON.stringify()*编码后存储


> 5M的单位
- 10M字节空间。
- 而根据 UTF-16编码规则，要么2个字节，要么四个字节，所以不如说是 10M 的字节数，更为合理。

```js
"a".length      // 1
"人".length     // 1
"𠮷".length     // 2
```

- key的长度也会占用空间


> window.sessionStorage
- 生命周期为关闭浏览器窗口
- 在同一个窗口(页面)下数据可以共享
- 以键值对的形式存储使用的

>sessionStorage.setItem(key, value);
- 存储数据
- 把数据存储在浏览器里 不关闭页面数据会一直存在

- 修改数据
- 在原来的数据上再次存储就是修改呗


> sessionStorage.getItem(key);
- 获取数据

> sessionStorage.removeItem(key);
- 删除数据

> sessionStorage.clear();
- 清空数据
```js 
    let set = document.querySelector('.set');
    let get = document.querySelector('.get');
    let remove = document.querySelector('.remove');
    let del = document.querySelector('.del');
    let text = document.querySelector('input');

    set.addEventListener('click', function(){
        // 当我们点击了之后, 就可以把表单里面的值存储起来
        let val = text.value;

        sessionStorage.setItem('uname', val);

        // 点击一次存到uname中 再点击一次存到pwd中
        sessionStorage.setItem('pwd', val);
        console.log(val);
    })

    get.addEventListener('click', function(){
        sessionStorage.getItem('uname')
        // let result= sessionStorage.getItem('uname');
        console.log(result);
    })

    remove.addEventListener('click', function(){
        sessionStorage.removeItem('uname')
    })

    del.addEventListener('click', function(){
        sessionStorage.clear()
    })
```

---

> window.localStorage
- 声明周期永久生效, 除非手动删除 否则关闭页面也会存在
- 可以*多窗口(页面)共享*, 同一浏览器都可以使用这个数据
- 以键值对的形式存储使用

>> localStorage.setItem(key, value);
- 存储数据

- 修改数据
- 在原来的数据上再次存储就是修改呗

> localStorage.getItem(key);
- 获取数据

> localStorage.removeItem(key);
- 删除数据

> localStorage.clear();
- 清空数据

-----------------------------------------

### 案例 记住用户名
- 如果勾选记住用户名, 下次用户打开浏览器 就在文本框里面自动显示上次登录的用户名

- 案例分析:
- 把数据存起来, 用到本地存储
- 关闭页面, 也可以显示用户名, 所以用到localStorage
- 打开页面, 首先先判断是否有用户名这个数据, 如果有, 就在表单里面显示用户名, 并且勾选复选框

- 当复选框发生改变的时候 change事件
    - 如果勾选, 就存储 否则就移除

-----------------------------------------

### 数据结构 和 算法

### 链表
- 
