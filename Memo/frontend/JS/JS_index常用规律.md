### n * i + m, 隔n个, 从m个开始
<!-- 
    4*i+3 = 3，7，11，15，19    
            隔4个数字 从索引3的位置开始

    4*i+1 = 1，5，9，13，17     
            隔4个数字 从索引1的位置开始


    0 -- 1
    1 -- 5
    2 -- 9
    3 -- 13

    4是固定的 i是变量
-->

```js
let arr = [0,1,2,3,4,5,6,7,8,9,10]
for (let i = 0; i < arr.length; i++) {
    if((2*i+2) > arr.length-1) break
    console.log(arr[2*i+2])
}
```


### n % 5
- 用在了轮播上
- index = index % imgArr.length;
- img1.src = imgArr[index];
<!-- 0 1 2 3 4 0 1 2 3 4 -->


### 每次比前一次自增1
> j<i+1

### 每次比前一次自减1
> j<5-i
5   0
4   1
3   2
2   3
1   4
0   5


### 0 n 0 n / 0 1 0 1
> 当出现0 这个数 0 这个数的规律时就可以用
> i%2
- 这里利用了 取模的时候 值不会超过被模数 0 1


### 0 0 n n / 0 0 1 1
>当出现 00 11 22 33这种规律时 我们可以考虑对 i/2 向下取整
<!-- 
    1, left:0   top:0           0       0
    2, left:-w  top:0          -1       0
    3, left:0   top:-h          0      -1
    4  left:-w  top:-h         -1      -1

                               0%2 0     0/2 0
                               1%2 1     1/2 0
                               2%2 0     2/2 1
                               3%2 1     3/2 1

    // 那怎么同时分别改4个图片???
    imgNode.style.left =-(i%2)*w +'px'
    imgNode.style.top = Math.floor(i/2)*h +'px'

### i%2 对下标 0 1 2 3 来说 -- i%2 的结果就是 0 1   0 1

### i/2 对下标 0 1 2 3 来说 -- i/2 的结果就是 0 0.5 1 1.5 向下取整 0 1 0 1
 -->


> 1 2 3 4 5 4 3 2 1
<!-- 
let num = 0;
let ratio = 0;

setInterval(function(){
    if(num == 0){
        ratio = 1
    }else if(num == 10){
        ratio = -1
    }

    num += ratio;
    console.log(num);
}, 500);
 -->

> num % 5   0 1 2 3 4 0 1 2 3 4
<!-- 
    num++;
    num = num % 10;
    console.log(num);
 -->