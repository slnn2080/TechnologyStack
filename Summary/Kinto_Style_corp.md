### Kinto定义的变量

**コーポレートの場合に**

### 变量:
> width的变量
- $w-full:  100%;
- $w-main:  996px;  // ≒ 984px    12px
- $w-mid:   828px;  // ≒ 816px    12px
- $w-small: 702px;  // ≒ 690px    12px


> padding的变量
- $w-padding: 0 12px;


> margin的变量
- $mgn-xl:  60px;
- $mgn-l:   48px;
- $mgn-m:   32px;    -- 与下一档差了8px
- $mgn-s:   24px;
- $mgn-ss:  12px;


> line-height的变量
- 正文的行高:   $text-height  : 1.6;
- 标题的行高:   $title-height : 1.5;


> color的变量
- 线:
- $border : #eaeaea;

- 灰背景
- $bggray : #e7e7e7;

- 主题颜色
- $primary : #00708d;

- 黑色
- $black: #3e3e3e;

- 白色
- $white : #fff;

- 链接色
- $link: #00708d;


> font的变量
- 标题:
- $title : ''Noto Sans JP', sans-serif';

- 文本:
- $text : ''游ゴシック体', '游ゴシック Medium', 'Yu Gothic Medium','ヒラギノ角ゴ ProN W3', 'Hiragino Kaku Gothic ProN', 'Hiragino Sans','ヒラギノ角ゴ W3', 'メイリオ', Meiryo, sans-serif';

- 字号:
- 正文:
- $text-size:    14px;

- $text-size-md: 16px;
- $text-size-sm: 12px;
- $text-size-ss: 10px;


> 断点的变量
```scss
$breakpoints: (
  'sm': 'screen and (min-width: 320px)',
  'md': 'screen and (min-width: 835px)',
  'xl': 'screen and (min-width: 1001px)',
) !default;
```

- 上面变量的作用
- 是利用 scss提供的内置函数 map-get()

> map-get(对象, key)
- 返回对象中的key对象的value

```scss
// 导入 变量文件 起别名为 v 通过v. 的方法可以调用 变量文件的中的结构
@use "src/lib/style/foundation/_variable" as v;

@mixin mq($breakpoint: md) {
  @media #{map-get(v.$breakpoints, $breakpoint)} {
    @content;
  }
}


// 样式中的应用
.l-header__cnt {
  padding: 13px 0 0;
  margin-bottom: 30px;

  @include mq {
    padding: 27px 0 25px;
  }
}
```

----------------

### 混合
> 媒体查询的混合
- 要点:
- 1. 形参的默认值 赋值不是用 = 而是使用:
- 2. 出现在混合的方法体中的样式 就是我们复用的样式
- 3. 要活用 #{} 插值语法 可以将这个部分当做是变量 里面可以写表达式
- 4. 思考我们定义的混合中是否需要使用 插槽

```scss
@mixin mq($breakpoint: md) {
  @media #{map-get(v.$breakpoints, $breakpoint)} {
    @content
  }
}
```


> title的混合
- 定义了字体 粗细 字号 下外边距 行高 当中有使用我们定义好的全局变量
```scss
@mixin heading($size : 28px , $mb : 48px) {
  font-family: $title;
  font-weight: bold;
  font-size: $size;
  margin-bottom: $mb;
  line-height: $title-height;
}
```


> 正文的混合
- 定义了字号 粗细 下外边距

```scss
@mixin Text($size:14px , $weight: normal,$mb: $mgn-s) {
  font-weight: $weight;
  font-size: $size;
  line-height: $text-height;
  margin-bottom: $mb;
}
```


> width的混合
- 最大宽度有指定值 $w-main 是996px 然后margin auto
```scss
@mixin Width ($m-width : v.$w-main) {
  margin: auto;
  width: 100%;
  max-width: $m-width;
  padding: v.$w-padding;
}
```


> 按钮icon _blank的时候 混合
```scss
@mixin blankicon ($b-color:$primary) {
  width: 17px;
  height: 11px;
  border: 1px solid $b-color;
  position: relative;
  margin-top: -2px;

  // 定义了inline-block 那就要设置 vertical-align: middle 不然可能会出现问题
  vertical-align: middle;
  display: inline-block;

  &:after {
    content: '';
    display: block;
    width: 17px;
    height: 11px;
    position: absolute;
    border-bottom: 1px solid;
    border-left: 1px solid;
    border-color:$b-color;
    left: -3px;
    bottom: -3px;
  }
}
```

----------------

### heading的样式
```scss
[class*="heading"] {
  line-height: 1.5;
  letter-spacing: 0.03em;
  font-feature-settings: "palt";
  // @include g.mgn-bottom();

  // sup
  sup {
    display: inline-block;
    letter-spacing: normal;
    transform: translateX(-0.17em);
  }
}
```
- 解析如上:
- 只要有类名中出现 heading 字样的 那么嵌套使用了sup的时候 会※进行了处理
- ※ 的部分使用了 inline-block 并向左移动了 em 距离

----------------

### 图片的样式
- 要点:
- 1. 图片尺寸100%展示 vertical-align: bottom; 是为了解决底部间距的问题

```scss
%img-100 {
  img {
    width: 100%;
    height: auto;
    vertical-align: bottom;
  }
}

.image {
  &\:normal {
    @extend %img-100;
  }

  &\:block {
    display: block;
    margin-bottom: g.$mgn-s;
    @include g.mq {
      margin-bottom: g.$mgn-m;
    }

    @extend %img-100;
  }
}
```

----------------

### 容器样式

> container-bottom
- 要点:
- 1. 写样式的时候断点的默认顺序 这样下面写的能覆盖上面写的样式
- 默认就是s - sm - md
- 2. 在不同的尺寸下 使用媒体查询的混合 修改了 *容器的下部间距*
```scss
%container-bottom {
  margin-bottom: calc(#{g.$mgn-s} * 2);
  @include g.mq(sm) {
    margin-bottom: calc(#{g.$mgn-s} * 2);
  }
  @include g.mq(md) {
    margin-bottom: calc(#{g.$mgn-s} * 3);
  }
}
```


> l-container
- 要点:
- 1. 注意 断点的顺序 默认是 手机端的
- 2. 手机端的尺寸时 width: 100% 两边留白 12px

- 3. 当 sm 尺寸的时候 就有最大宽度了 左右居中对齐 小平板还是左右12px的留白
- 也就是说在不同的尺寸下 屏幕的宽度和左右的留白是不一样的

```scss
%l-container {
  width: 100%;
  padding-left: calc(#{g.$mgn-s} / 2);
  padding-right: calc(#{g.$mgn-s} / 2);
  @include g.mq(sm) {
    max-width: g.$w-main;
    // padding-left: 0;
    // padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  @include g.mq(md) {
    width: calc(100vw - 400px + #{g.$mgn-s});
    padding-left: 0;
    padding-right: 0;
    margin-left: calc(200px - #{g.$mgn-s} / 2);
    margin-right: calc(200px - #{g.$mgn-s} / 2);
  }
  @include g.mq(xl) {
    width: g.$w-full;
    padding-left: 0;
    padding-right: 0;
    margin-left: auto;
    margin-right: auto;
  }

  @extend %container-bottom;

  > .layout-container {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
  }
}
```


> layout
```scss
.layout {
  &-container {
    @extend %l-container;

    // 画面幅100%（MVなど）
    &\:fluid {
      width: 100%;
      padding-left: 0;
      padding-right: 0;
      margin-left: 0;
      margin-right: 0;
      @extend %container-bottom;

      > .layout-container {
        margin-left: auto;
        margin-right: auto;
        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    // 帯背景
    &\:fill {
      padding-top: g.$mgn-m;
      overflow: hidden;

      @include g.mq(md) {
        padding-top: g.$mgn-l;
      }

      &:not(.layout-container\:fluid) {
        @extend %l-container;
      }
    }

    // インナー (layout-container 配下のdivなど)
    &\:inner {
      margin-bottom: g.$mgn-l;
      @include g.mq {
        margin-bottom: g.$mgn-xl;
      }
    }
  }
}
```

----------------

### br换行
- 要点:
- 利用了 display: block 属性 在媒体查询的配合下
- 在合适的断点下 做block处理
```scss
.u-s-br--show--pc {
  display: none;
  @include g.mq {
    display: block;
  }
}

.u-s-br--show--sp {
  display: block;
  @include g.mq {
    display: none;
  }
}

.u-icon-inine {
  display: inline-block;
  margin: 0 .4rem;
  position: relative;
  top: 1px;
}
```