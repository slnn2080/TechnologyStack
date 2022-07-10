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