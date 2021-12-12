- 家产100%继承
  - flex-basis  就是分配固定的家产数量。
  <!-- 
    flex-basis则是指定了固定的分配数量，默认值是auto。如会忽略设置的同时设置width或者height属性
   -->

  - flex-grow   就是家产剩余家产仍有富余的时候该如何分配。
  <!-- 
    flex-grow指定了容器剩余空间多余时候的分配规则，默认值是0，多余空间不分配。
   -->
  - flex-shrink 就是家产剩余家产不足的时候该如何分配。
  <!-- 
    flex-shrink指定了容器剩余空间不足时候的分配规则，默认值是1，空间不足要分配。
   -->


### flex 文字表述

> 如果flex的属性值只有一个值，则：
  - 如果是数值，例如flex: 1，则这个1表示flex-grow
  <!-- 
    此时flex-shrink和flex-basis的值分别是1和0%
  -->

  - 如果是长度值，例如flex: 100px，则这个100px显然指flex-basis，因为3个缩写CSS属性中只有flex-basis的属性值是长度值。
  <!-- 
    此时flex-grow和flex-shrink都是1
  -->


> 如果flex的属性值有2个值，则：
- 则第1个值一定指flex-grow，第2个值根据值的类型不同表示不同的CSS属性

  - 如果第2个值是数值，例如flex: 1 2，则这个2表示flex-shrink
  <!-- 
    此时flex-basis计算值是0%
  -->

  - 如果第2个值是长度值，例如flex: 1 100px，则这个100px指flex-basis
  <!-- 
    此时flex-shrink使用默认值0。
  -->


> 如果flex的属性值有3个值，则：
- 如果flex的属性值有3个值，则这长度值表示flex-basis，其余2个数值分别表示flex-grow和flex-shrink。下面两行CSS语句的语法都是合法的，且含义也是一样的

----------

### 关键字属性值
> initial
- 初始值。flex:initial 等同于设置"flex: 0 1 auto"。
<!-- 
  flex-grow:0
  flex-shrink:1
  flex-basic:auto


  flex-grow:
      不会增长变大占据flex容器中额外的剩余空间

  flex-shrink:1
      会收缩变小以适合容器

  flex-basic:auto
      尺寸根据自身宽高属性进行调整
 -->


> auto
- flex:auto 等同于设置"flex: 1 1 auto"。
<!-- 
  flex-grow:1
  flex-shrink:1
  flex-basic:auto


  flex-grow:
      子项会增长变大占据flex容器中额外的剩余空间

  flex-shrink:1
      会收缩变小以适合容器

  flex-basic:auto
      尺寸根据自身宽高属性进行调整
 -->


> none
- flex:none 等同于设置"flex: 0 0 auto"。
<!-- 
  flex-grow:0
  flex-shrink:0
  flex-basic:auto


  flex-grow:
      子项会不会增长变大占据flex容器中额外的剩余空间

  flex-shrink:1
      不会收缩变小以适合容器

  flex-basic:auto
      尺寸根据自身宽高属性进行调整
 -->