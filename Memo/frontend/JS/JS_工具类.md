### 数学工具类

> 开方: Math.sqrt()
- 可以通过Math.sqrt()对一个数进行开方

> Math.pow(x,y)
- 返回x的y次幂

> Math.PI
- 表示圆周率

> Math.abs()
- 计算一个数的绝对值

> Math.max()
- 获取多个数中的最大值
<!-- var max = Math.max(10,20,30); -->
> Math.min()

> Math.ceil()
- 一个数进行向上取整，小数位只要有值就自动进1

> Math.floor()
- 一个数进行向下取整，小数位部分会被舍掉

> Math.round()
- 个数进行四舍五入 取整

> Math.random()
- 生成一个0-1之间的随机数 0-1之间 不会出现0 和 1
- 0 - n
<!-- Math.round(Math.random() * n); -->
- n - m
<!-- Math.round(Math.random() * (m-n))+n -->

- 得到一个两数之间的随机整数
<!-- 
    Math.floor(Math.random() * (max - min)) + min 
-->
- 得到一个两数之间的随机整数，包括两个数在内
<!-- 
    Math.floor(Math.random() * (max - min + 1)) + min
 -->