### lp系列
- 目标地址:
- https://kinto-jp.com/lp/compactcar/

- 接下来我们看看页面中的各个部分的逻辑是什么

> MainVisual部分
- 内容结构:
  文字标题部分
  +
  banner车部分
  +
  按钮部分


> 文字标题部分 - html结构部分
- 手軽 簡単 安心の KINTO ONE ではじめる 月々1,0000円台からの カーライフ

- 就是这样的一个标题 竟然不是用文字做的 而是用图片
- 每一张图片都是pc
- 链接中的图片格式如下:
```html
<img
  :src="`/lp/compactcar/assets/img/ttl_word0${ index + 1 }.png`"
  :srcset="`/lp/compactcar/assets/img/ttl_word0${ index + 1 }.png 1x, /lp/compactcar/assets/img/ttl_word0${ index + 1 }@2x.png 2x`"
  width=""
  height=""
  :alt="word" />
```

- 然后利用v-for将图片都渲染到页面上, 数组是每一张图片的alt值
- 也就是说 一张图片 对应了 一个alt的值 他们把 [alt1, alt2, ... ] 装成了一个数组 与图片的数量一一匹配

- <img> <br v-if>
- 当第3张图片 和 第5张图片的时候显示换行

- 整体的结构代码:
- 要点:
- 每一张图片不是用div容器承装的 而是span容器 这样他们都能在一行上
```html
<h1>
  <template v-for="(word, index) of words">
    <span
      :key="'word' + index"
    >
      <img
        :src="`/lp/compactcar/assets/img/ttl_word0${ index + 1 }.png`"
        :srcset="`/lp/compactcar/assets/img/ttl_word0${ index + 1 }.png 1x, /lp/compactcar/assets/img/ttl_word0${ index + 1 }@2x.png 2x`"
        width=""
        height=""
        :alt="word">
    </span>
    <br :key="'br' + index" v-if="[2,4].includes(index)">
  </template>
</h1>
```

> 文字标题部分 - 样式部分
- 要点:
- 1. 他们把 统一的样式放在了 自定义样式的后面 (这样统一样式不是覆盖了自定义样式么?)
```html
<section class="p-compact__mv layout-container">
<!-- p-compact__mv 就是自定义样式 但是它为什么要在前面 -->
```

- 2. 图片宽度没有设置百分比的情况下 当屏幕尺寸缩小 图片并不会跟着缩小 而是原尺寸 这样就会造成图片溢出超出父盒子
- 所以我们给 section(class="p-compact__mv") 里面设置了 overflow: hidden 属性

- 3. 布局容器盒子之间的间距 不是用 margin-top 或者 margin-bottom 来调整的 而是 padding 来调整的