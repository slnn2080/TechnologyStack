### 为什么要用 Rust
- 它可以用来替换 c/c++ rust和他们具有同样的性能 但是很多常见的bug在编译时就可以被消灭

- rust是一种通用的编程语言 但是它更善于以下的场景
- 1. 需要运行时的速度
- 2. 需要内存安全
- 3. 更好的利用多处理器

> 与其它语言的比较
- c/c++性能非常好 但类型系统和内存都不太安全
- java/c# 拥有GC 能保证内存安全 也有很多优秀的特性 但是性能不行

> rust拥有上述的两种语言的优点
- 1. 安全
- 2. 无需GC 性能好
- 3. 易于维护 调试 代码安全高效

> Rust特别擅长的领域
- 1. 高性能的web service
- 2. webassembly
- 3. 命令行工具
- 4. 网络编程
- 5. 嵌入式设备
- 6. 系统编程


> rust的用户和案例
- Google: 
  新操作系统Fuschia 其中rust代码量大约占30%

- Amazon:
  基于Linux开发的直接可以在裸机 虚拟机上运行容器的操作系统 rust编写的

- System76:
  纯rust开发了下一代安全操作系统 Redox

- 蚂蚁金服:
  库操作系统 Occlum rust编写

- 微软
  正在使用 Rust 重写 windows 系统中的一些低级组件


> Rust难学
- 如果会c++可能就很容易
- rust有很多独有的概念 他们和现在大多主流语言都不同

> 参考教程
- Rust权威指南 2018 我们看这个

> Rust体系课程的规划
- 1. 这门课是入门级教程 参考 Rust权威指南 1-12 章的内容讲的

- 2. 未来还有rust进阶教程 也会参考此书的13章以后的内容

- 3. rust算法教程
- 4. rust数据结构教程
- 5. rust web开发教程


> 安装
- 官网: www.rust-lang.org
- 1. 点击 install 或者 get started

- 2. curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
- 运行命令安装

- 3. source $HOME/.cargo/env
- 安装好了之后运行上面的命令

- 4. 检查是否安装成功
- rustc --version
<!-- 
  rustc 1.60.0 (7737e0b5c 2022-04-04)
  版本号 commit hash commit 日期
 -->

> 更新rust
- rustup update

> 卸载rust
- rustup self uninstall

> 运行本地文档
- rustup doc


> 开发工具
- Visual Studio Code
- 插件: rust

----------------

### 编写 Rust 程序
- 程序文件后缀名: rs
- 文件命名规范: hello_world.rs

```rs
fn main() {
  println!("Hello World")
}
```

- fn: 定义函数
- main: 方法名
- println!: 输出语句

- main函数: 入口函数
- 它是每个rust可执行程序最先运行的代码


**注意:**
- rust的缩进是4个空格而不是tab
- println! 是一个rust macro(宏) 如果是函数的话 就没有!
- Hello World字符串 它是println! 的参数
- 语句要以分号结尾
<!-- 
  Macro 一种用代码生成代码的手段 中文是宏
  rust的宏是基于ast语法树 而不是c/c++那种#define简单的文本替换 其作用类似于 elixir里面的macro 
 -->


> 编译rs文件
- rustc 文件名.rs
- 编译之后会生成一个二进制的文件 .exe结尾(window下)
- mac的下面没有后缀

```shell
rustc hello_world.rs
```

> 运行rs文件
- ./文件名
```shell
./hello_world
```


> 编译和运行是单独的两步
- 运行rust程序之前必须先编译 命令: rustc 文件名.rs

- 编译成功后 会生成一个二进制文件
- 在windows上还会生成一个 .pdb 文件 里面包含调试信息

- rust是 ahead-of-time 编译的语言
- 可以先编译程序 然后把可执行文件交给别人运行(无需安装Rust)

- rustc 只适合简单的Rust程序
<!-- 
  如果程序比较复杂 我们再使用 rustc 编译就不合适了 我们要使用 Cargo
 -->

----------------

### Cargo
- 小项目的话我们可以使用 rustc
- 但是一些比较大的项目 我们必须使用其他的工具 这个工具就叫做 cargo

> cargo
- 它是rust的构建系统的包管理工具 它可以构建代码 下载依赖的库 构建这些库

- 安装rust的时候会安装cargo

> cargo --version
- 查看cargo是否被正确的安装


> 使用 cargo 创建项目
- cargo new 项目名
<!-- 
  cargo new rust_test_cargo_pro

  可以使用其它的VCS或不使用VCS: 
    cargo new --vcs 项目名
 -->

> 项目结构

  | - rust_test_cargo_pro 

    | - src
      - main.rs

    - .gitignore
    - Cargo.toml

> src目录
- 用来放源代码

> Cargo.toml
```js
[package]
name = "rust_test_cargo_pro"
version = "0.1.0"
edition = "2021"    // 使用的rust版本

# See more keys and their definitions at https://doc.rust-lang.org/cargo/reference/manifest.html

[dependencies]
```

- .toml 是Cargo的配置格式
> [package]
- 区域的标题 表示下方内容是用来配置包(package)的

> [dependencies]
- 另一个区域的开始 它会列出项目的依赖项
- 在rust里面 代码的包或者代码的库叫做 crate
- 比如我们安装一个第三方的库 这个库在rust里面就叫做 crate


> src/main.rs
- cargo生成的main.rs在src目录下 而Cargo.toml在项目顶层下 源代码都应该在src目录下

- 顶层目录(和配置文件同级的目录) 可以放置:
- readme
- 许可信息
- 配置文件
- 其它与程序源码无关的文件


- 如果创建项目的时候没有使用 cargo 也可以把项目转化为使用 cargo 的形式
- 很简单:
- 1. 把源代码文件移动到src下
- 2. 创建 Cargo.toml 并填写响应的配置


> 使用 Cargo 构建项目
> cargo build
- 这个命令会创建可执行文件
- target/debug/hello_cargo 或
- target/debug/hello_cargo.exe(windows)

- 运行可执行文件 就是执行这个程序了
- 运行可执行文件的方式
- ./target/debug/hello_cargo

- 第一次运行 cargo build 会在顶层目录生成 cargo.lock 文件

- .lock文件负责追踪项目依赖的精确版本 不需要手动修改该文件


> 运行 Cargo 项目
> cargo run
- 上面我们是先通过 cargo build 才构建项目 然后执行可执行文件 

- cargo run命令 可以构建 + 运行 项目
- 该命令是两步操作 编译代码生成可执行文件 + 执行结果
- 如果之前编译成功过 并且源码没有改变 那么就会直接运行二进制文件


> cargo check
- 该命令用于检查代码 确保能通过编译 但是不产生任何可执行文件
- 该命令会比 cargo build 快的多
- 所以在编写代码的时候可以连续反复的使用 cargo check
 检查代码 提高效率


> 为发布构建
> cargo build --release
- 默认情况下 cargo build 命令是开发时用的 用于调试的 如果我们的程序已经写完了 已经准备发布了

- 那我们就要使用 cargo build --release 这时候编译会进行优化 代码会运行的更快 但是编译时间更长

- 该命令生成的可执行文件 会在 target/release目录
- 而不是 target/debug 目录下生成可执行文件

- cargo build
  - 开发时用的命令

- cargo build --release
  - 正式发布时用的命令

> 总结:
- 尽量使用 cargo

----------------

### 猜数字 游戏

```rs
// rust里面的导包要使用 use 关键字
// use 标准库中的io
use std::io;

fn main() {
    println!("猜数");
    println!("猜测一个数");

    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("无法读取行");

    // 使用{}作为占位符 我们把变量传递进去
    println!("你猜测的数是: {}", guess);
}
```

> 代码解析:
- 我们要获取用户的输入 然后再把用户的输入 打印出来作为输出 我们就需要使用到 io 这个库

- io这个库是在标准库里面的
- std就是标准库
<!-- 
  默认情况下 rust会把prelude模块的内容导入到每个程序的作用域中

  如果我们使用的类型不在 prelude 里面 就需要显式的将导入该类型
 -->

> use 关键字
- 用于将 一个模块或者类型 显式的导入到程序中 
- 相当于 import require

```rs
use std::io
```
- 导入进来后 我们就可以做输入或输出的操作了


> println!("内容")
- 是宏 它的作用就是将 内容 输出到屏幕上

> let 关键字 
- 用来声明变量
```rs
let foo = 1; 
let bar = foo;
```

**注意:**
- rust中所有的变量默认情况下是不可变的
```rs
let foo = 1;
foo = 2;    // 报错
```


> mut 关键字
- 指明该变量是可变的 (相当于加上了就是let 不加mut就是const)


> String::new()
- 返回字符串的新的实例 rust中 字符串类型就是String 它是由标准库所提供的 它内部使用了utf-8格式的编码 并且可以按照需求扩展自己的大小

- :: 表示 new() 是String类型的关联函数
- 关联函数是针对类型本身来实现的 而不是针对字符串某个特定的实例来实现的

- new()
- 会创建一个空白的字符串 在rust中很多类型都有new()
- 因为它是创建类型实例的惯用函数

> io::stdin()
- io库下的stdin()

- stdin()会返回 Stdin的实例 它会作为句柄(handle)处理终端中的标准输入

> read_line(&mut 变量)
- 这个方法用于获取用户的输入 该方法就是将用户的输入放到一个字符串中

- 所以我们要传递一个字符串类型作为参数
- 这个字符串类型的参数需要是可变的 因为这个方法会随着用户的输入来修改字符串的内容 所以我们在 guess 前面加上了 *mut* 关键字

> & 取地址符号
- 表示这个参数是一个引用 通过引用就可以在代码的不同地方来访问同一块数据 

- read_line(&mut guess)
- 就代表方法的参数是用引用来传递的

```rs
let mut guess = String::new();
io::stdin().read_line($mut guess)
```

- 上面两个guess因为使用了 & 指向同一块内存
- 而引用在rust里面是比较复杂的特性 而rust的核心竞争力之一 它可以保证我们可以简单并且安全的使用 引用功能

- &引用在rust里面表示也是不可变的 
- 当我们加上mut关键字后 这个引用也变成了可变的
```rs
// 不加 mut 就会报错
io::stdin().read_line($ guess)
io::stdin().read_line($mut guess)
```


- read_line()方法 无论用户输入什么 都会读取
- read_line() 返回值:
- io::Result<usize> 类型

- 在rust的标准库中有很多的类型都叫做 Result 既有通用的result 也有特定版本的子模块的result比如io::Result

- Result类型实际上就是枚举类型 一个枚举类型会有几个固定的值 这些值就是枚举类型的变体

- io::Result类型就有两个变体(另个值)
- Ok
- Err

- 如果我们read_line()方法返回的是 Ok 变体的话 就表示这个操作成功了 而且Ok 里面还有结果值

- 如果我们read_line()方法返回的是 Err 变体的话 就表示这个操作失败了 在Err中 还会附带失败的原因

- 而io::Result枚举类型 它上面还定义了一系列的方法

> expect("中断时的提示信息")
- io::Result枚举类型定义的方法之一
- 假如io::Result返回的是Err expect()方法就会终端当前的程序 并将传入的字符串信息显示出来

- 假如io::Result返回的是Ok expect()方法就会提取出ok中附加的值 并将这个值作为结果返回给用户


> {} 表示占位符
- 它的值在输出的时候就会替换成 后面变量的值
```rs
println("你猜测的数是: {}", guess);
```

- 如果一个{} 就对应后面第一个变量的值
- 如果二个{} 后面就应该传入两个变量的值

----------------

### 猜数字 生成神秘的数字
- 我们要生成1-100之间的随机数 rust标准库里面 没有包含生成随机数的功能 但是 rust团队提供了 生成随机数公功能的库 

> rand
- 生层 随机数的 crate 的包
- rand(crate包 可以理解为npm里面的包或者理解为一个模块)
- https://crates.io/crates/rand

<!-- 
  在rust中一个库(crate)就是一堆的rust源代码文件
  rust中的crate一共分为两种

  - 我们自己创建的程序 就是一个 二进制的crate
  - 而rand这个crate是不可以独立运行的 它属于lib crate 叫做 库包 像这种crate就是为其它程序所用的
 -->

> 项目中添加依赖
- 相当于怎么 npm i 一个包
- rust中 我们可以直接在 Cargo.toml 中 [dependencies] 的位置写 写完后重新构建下 可能就下完了

- 也可以:
- cargo install rand

- 格式:
- rand = "版本"

- 完整写fa:
- rand = "^版本"
- 表示和指定版本兼容的版本都可以
- 比如我们指定了 0.3.14 那么就是和这个版本兼容的版本都可以

```toml
[package]
name = "rust_test_cargo_pro"
version = "0.1.0"
edition = "2021"


[dependencies]
rand = "0.3.14"
```

> 重新构建
- 安装完包后 可能要 cargo build 下 重新构建
- 重新构建的时候 会检查 dependencies 有没有下载的依赖项 如果没有就会自动下载

> ctrl + shift + p
- 输入 rust 能看到
- runst start the rust server
- 手动开启服务器 开启之后可能下载依赖的时候就不用 手动构建了 没有尝试


> 代码部分
```rs
use std::io;
 // trait 它相当于其它语言的接口 
 // Rng trait就是定义了随机数生成器需要实现的方法
use rand::Rng; 

fn main() {
  println!("猜数");

  // 定义一个不可变的变量
  let secret_number = rand::thread_rng().gen_range(1, 101);

  println!("神秘数字是: {}", secret_number);
}
```

> 代码解析:
> rand::thread_rng()
- 返回值
- ThreadRng 类型 返回的是一个随机数生成器
<!-- 
  这个随机数生成器是位于本地线程空间 并通过操作系统获得随机数的种子
 -->

> rand::thread_rng().gen_range(1, 101);
- gen_range(low, height)
- 该方法就是Ran接口中定义的方法 它需要两个参数 最小值 和 最大值
- 1 - 101 之间生成一个随机值 包括1 不包括101

----------------

### 猜数字 比较猜测的数字 与 神秘数字 
- 我们要做的是 比较 guess 和 secret_number 的大小

> 知识要点:
> 1. 类型推荐
- let mut guess = String::new();
- rust是静态强类型的语言 它还具有类型推断的能力 我们在声明 guess 变量的时候 并没有声明其类型 但是通过 后面的 String::new() 表达式就能推断出来 guess变量的类型就是string

> 2. 字符串.cmp(&字符串变量)
- 用来进行比较 就是compare的方法 它和另外的一个值进行比较

> 3. 字符串.parse()
- 将字符型的数字转换为 真正的数字
- 可以搭配 expect("请输入一个数字"); 使用
- 因为我们要写个 abc 还转换不了

> 4. use std::cmp::Ordering;
- 标准库中的枚举类
- Ordering是枚举类型 它有3个值(变体) Less Greater Equal 分别表示小于大于或者是等于

> 5. 类型遮盖
- rust中允许声明同名变量用来隐藏上面定义好的同名变量
```rs
let mut guess = String::new();

// 遮盖上面的变量
let guess:u32 = guess.trim().parse().expect("请输入一个数字");
```

- 也就是将 字符串类型的guess转换为 u32无符号整数类型的变量了

> 6. match 表达式 {}
- 相当于 switch case 
- 它会根据表达式的结果 返回的枚举类型的值 来决定下面我们执行哪个对应的语句

```rs
match guess.cmp(&secret_number) {
  Ordering::Less => println!("小了"),
  Ordering::Greater =>  println!("大了"),
  Ordering::Equal =>  println!("赢了")
}
```

> 完成代码部分
```rs
use rand::Rng;

use std::cmp::Ordering;
use std::io;
fn main() {
  println!("猜数");

  let secret_number = rand::thread_rng().gen_range(1, 101); // i32 u32 i64

  println!("神秘数字是: {}", secret_number);

  println!("猜测一个数");
  let mut guess = String::new();

  io::stdin().read_line(&mut guess).expect("无法读取行");
  
  // 这里我们是隐藏上面同名的就变量 也就是从这样开始 guess就是u32新的guess了
  let guess:u32 = guess.trim().parse().expect("请输入一个数字");
  println!("你猜测的数是: {}", guess);
  
  match guess.cmp(&secret_number) {
    // 小于
    Ordering::Less => println!("小了"),
    Ordering::Greater =>  println!("大了"),
    Ordering::Equal =>  println!("赢了")
  }
}
```

> 优化:
- 为了让用户进行多次猜测 我们需要做一个无限循环

> loop {} 关键字
- loop表示无限循环 而不是while(true) rust里面有while关键字
```rs
loop {
  // break 用于跳出循环
  break;
}
```

> break;
- 用于跳出循环

> continue;
- 用于跳出本次循环

> match的应用技巧
- 我们不要程序需要报错就崩溃的时候 我们可以这么处理
- guess.trim().parse() 会返回 Result类型 该类型有 Ok Err
- 这时候我们就可以使用 match 分支来解决 当遇到用户输入 abc parse()转换不了的时候 continue跳出本次循环进入下一次循环

```rs
let guess:u32 = match guess.trim().parse() {
  Ok(num) => num,
  Err(_) => continue
};
```



```rs
use rand::Rng;

use std::cmp::Ordering;
use std::io;
fn main() {
  println!("猜数");

  let secret_number = rand::thread_rng().gen_range(1, 101); // i32 u32 i64

  loop {
    println!("猜测一个数");
    let mut guess = String::new();

    io::stdin().read_line(&mut guess).expect("无法读取行");
    
    // 这里我们是隐藏上面同名的就变量 也就是从这样开始 guess就是u32新的guess了
    let guess:u32 = match guess.trim().parse() {
      Ok(num) => num,
      Err(_) => continue
    };

    println!("你猜测的数是: {}", guess);
    
    match guess.cmp(&secret_number) {
      // 小于
      Ordering::Less => println!("小了"),
      Ordering::Greater =>  println!("大了"),
      Ordering::Equal => {
        // 使用 break 跳出玄幻
        println!("赢了");
        break;
      }
    }
  }
}
```