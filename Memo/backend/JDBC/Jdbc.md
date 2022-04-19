### JDBC概述

> 数据的持久化
- 以前我们说的对象 数组 集合等存储数据的结构都是内存层面的 不能达到数据的持久化

- 数据持久化的方式
- 1. 文件:
- 我们在java基础的部分 可以通过io来将数据写到一个真实的文件里面 这也是数据持久化的一种
<!-- 
  简洁的几个小数据 我们用文件也是ok的
 -->

- 2. 数据库

------

>  Java中的数据存储技术
- 在Java中，数据库存取技术可分为如下几类：
- **JDBC**直接访问数据库
- JDO (Java Data Object )技术

- **第三方O/R工具**，如Hibernate, Mybatis 等

- JDBC是java访问数据库的基石，JDO、Hibernate、MyBatis等只是更好的封装了JDBC。

------

> JDBC介绍
- jdbc不是跟某一个具体的数据库深度耦合的 或者说jdbc不是用来专门操作某个数据库的

- jdbc是通用的操作数据库的接口 是一种规范 如何使用java程序操作数据库的规范


- 如果没有JDBC 那么java程序访问数据库是这样的
<!-- 
              Java程序
      ↗     ↗     ↖       ↖
  Mysql  Oracle  SQLServer  DB2


  // 这样也行 但是可移植性差
  mysql插入一条数据库: 命令是 add
  Oracle插入一条数据库: 命令是 insert
  ...

  一样的目的 但是每个数据库的类型不一样命令细节等却不一样 这时候我们用java程序去操作一个具体的数据库是很痛苦的一件事情 最起码 你要知道所有数据库的基本语法
 -->

- 为了能进行统一 或者让程序员在操作数据库的时候 有一个统一的规范 定义了一套规范 这套规范就指出要想用java程序操作数据库 进行了统一

- 有了jdbc java程序访问数据库时是这样的
<!-- 
              Java程序

                ↓   调用

               JDBC   ← 一组规范: 接口

      ↗     ↗     ↖       ↖

   驱动    驱动       驱动    驱动   ← JDBCImpl

    ↓       ↓         ↓      ↓

  Mysql  Oracle  SQLServer  DB2
 -->

- jdbc是接口 接口中定义了规范

- 驱动:
- 但对于不同的数据库厂商来讲 比如要是想通过调用jdbc中的add()方法 实现添加数据的操作 那么肯定要提供一个有方法体的add()

- 驱动就是各个数据库厂商来编写的 jdbc是标准 然后各个厂商根据这个标准(接口) 厂商去提供各个接口的实现类 实现类中需要将接口中的抽象方法进行重写 这套实现类的集合封装在一起 就是各个厂商的驱动

- JDBC是sun公司提供一套用于数据库操作的接口，java程序员只需要面向这套接口编程即可。

- 不同的数据库厂商，需要针对这套接口，提供不同实现。*不同的实现的集合，即为不同数据库的驱动*

------

> JDBC介绍程序的编写步骤
- 1. 导入 java.sql 包
<!-- 
  导包的目的 将jdbc的接口标准导进来
 -->
          ↓

1.1 JDBC-ODBC桥方式(建立数据源ODBC)  或
<!-- 
  sql server 
  ODBC是微软提供的一套操作不同数据库的一套api

  微软的逻辑是 java - jdbc - odbc - 各个数据库
-->

1.2 纯JAVA驱动方式  (附加相应产商提供的驱动)
<!-- 
  mysql oracle 
  我们直接把mysql驱动也就是厂商写的jdbc接口的实现类的集合加载进来
-->

          ↓

- 2. 加载并注册驱动程序

          ↓

- 3. 创建 Connection 对象
<!-- 
  我们想想 在我们使用客户端的时候 我们要操作数据 需要先使用客户端去连接数据库 比如

  用户名: root
  密码: xxx
  端口: 3306

  连接  取消  测试连接

  现在我们不是用客户端 我们要用java程序 所以我们要先获取 Connection 对象 也就是java层面 先获取对数据库的连接

  怎么叫连接上了 就是我拿到了一个连接对象 这个对象是非空的就表示我获取到了连接 拿到连接后对数据表进行增删改查的操作
 -->

          ↓

- 4. 创建 Statement 对象
<!-- 
  Statement对象用于对 数据表进行增删改查的操作
  它帮我们操作数据库去做增删改查
 -->

          ↓

- 5. 执行 Sql 语句

          ↓

- 分支1: 查询情况: 使用 ResultSet 对象
<!-- 
  查询 跟 增删改 的区别就是涉及到是否有结果集的问题 
  我们在学数据库的时候 当我们查询完后都会有一个结果

  mysql中的结果集在java层面 就是ResultSet对象
 -->

          ↓

- 关闭 ResultSet 对象

---

- 分支2: 更新情况(增删改): 通过 Statement对象执行sql完成
<!-- 
  更新情况不需要结果集 所以不涉及到 操作 ResultSet 对象
 -->

          ↓

- 6. 关闭 Statement 对象
          ↓
- 7. 关闭 Connection 对象
          ↓
- 8. 结束

-----------------

### 获取数据库连接的 方式1:
- java.sql下提供的接口 我们使用这个接口来获取连接 接口叫 Driver

  | - jdbc_test
    | - com.sam.connection
      - ConnectionTest

- 既然 Driver 是接口 那么我们就要使用 Driver接口的实现类对象
- Driver接口是son公司定义的 我们要提供Driver接口的实现类对象 这个实现类对象 是各个厂商(mysql db2等)根据Driver接口自己开发的实现类 这些实现类的集合也叫做驱动

> 对应厂商驱动的安装
- 1. 要下载对应的数据库驱动 比如我们使用的mysql8 那么我们就要下载mysql8的驱动 使用的mysql5 那么我们就要下载mysql5的驱动

- 下载驱动完成后(就是一个jar包)
- 1. 在工程下(module)创建一个lib文件夹 跟src同级
- 2. 然后把下载好的jar包放入 lib文件夹下 并 add as lib ...

**注意:**
- mysql 5
- mysql 8
- 这两种驱动 创建Driver接口的实现类对象也不一样
- com.mysql.jdbc.Driver驱动是 mysql-connector-java *5* 中的
- com.mysql.cj.jdbc.Driver驱动是 mysql-connector-java *8* 中的

```java
// mysql 5
Driver driver = new new com.mysql.jdbc.Driver();

// mysql 8
Driver driver = new new com.mysql.cj.jdbc.Driver();
```

- 同时 我们在配置文件中 driverClassName 也不一样
```js
// mysql5
driverClassName=com.mysql.jdbc.Driver

// mysql8
driverClassName=com.mysql.cj.jdbc.Driver
```


> 具体 方式1 的使用步骤
- 1. 提供 Driver 的具体实现类对象
```java
// mysql8
Driver driver = new com.mysql.cj.jdbc.Driver();
```

- 2. 调用 driver 对象的 connect(String url, Properites info) 方法获取连接

> driver.connection(String url, Properites info)
- 用过获取连接

- 异常:
- SQLException

> 参数:
> String url:

- url是统一资源定位符 用于定位互联网上的一个资源 我们要定位的就是要连接哪个数据库
- 类似我们在通过客户端登录的时候 会输入哪个主机地址下的 哪个端口下的 哪个数据库名
- 现在就是要通过url告诉我们要连哪个数据库 就像我们输入百度地址 看百度哪个页面是一样的
- jdbc url用于表示一个被注册的驱动程序 驱动程序管理器通过这个url选择正确的驱动程序 从而建立到数据库连接


- url的书写规则:

  jdbc:mysql://主机名称:mysql服务端口号/数据库名称?参数=值&参数=值

- JDBC URL的标准由3个部分组成 各个部分间用冒号分隔


> jdbc:子协议:子名称
- 1. 协议: jdbc url中的协议总是jdbc
- 2. 子协议: 子协议用于标识一个数据库驱动程序
- 3. 子名称: 一种标识数据库的方法 子名称可以依不同的子协议而变化 用子名称的目的就是为了定位数据库提供足够的信息 

- 包含 主机名(对应服务端的ip地址) 端口号 数据库名

- 示例: jdbc:mysql://localhost:3306/test数据库名


- 几种常用数据库的 jdbc url 
- jdbc:mysql://主机名称:mysql服务端口号/数据库名称?参数=值&参数=值

- jdbc:mysql://localhost:3306/atguigu
- jdbc:mysql://localhost:3306/atguigu?useUnicode=true&characterEncoding=utf8（如果JDBC程序与服务器端的字符集不一致，会导致乱码，那么可以通过参数指定服务器端的字符集）

- jdbc:mysql://localhost:3306/atguigu?user=root&password=123456


> url参数的部分
- useUnicode=true
- characterEncoding=utf8
- 如果JDBC程序与服务器端的字符集不一致，会导致乱码，那么可以通过参数指定服务器端的字符集

- 时区的概念:
- serverTimezone=UTC

- UTC是国际时，UTC+8就是国际时加八小时，是东八区时间，是北京时间
- 在设定时区的时候，如果设定serverTimezone=UTC，会比中国时间早8个小时，如果在中国，可以选择
    中国:
    Asia/Shanghai
    Asia/Hongkon

    日本:
    Asia/Tokyo

- 北京时间==东八区时间！=北京当地时间
  serverTimezone=GMT%2B8
  serverTimezone=GMT%2B9  -- 是不是也是东京


> Properties info
- Properties 里面是key=value型 要包含用户名和密码
- 将用户名和密码封装在Properties中
```java
Properties info = new Properties();
info.setProperty("user", "root");
info.setProperty("password", "qwer6666");
```

**注意:**
- 用户名就是固定的 user
- 密码就是固定的 password


> 方式1: 完整代码
```java
import org.junit.Test;

import java.sql.Connection;
import java.sql.Driver;
import java.sql.SQLException;
import java.util.Properties;

@Test
  public void testConnection1() throws SQLException {
    
    // 提供实现类对象
    Driver driver = new com.mysql.cj.jdbc.Driver();

    // 参数整理
    String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";

    // 将用户名和密码封装在Properties中
    Properties info = new Properties();
    // 固定就是 user 和 password 作为key
    info.setProperty("user", "root");
    info.setProperty("password", "qwer6666");

    // 调用 driver对象的方法
    Connection connection = driver.connect(url, info);
    System.out.println(connection);
  }
```

-----------------

### 获取数据库连接的 方式2:
- 这里面的几种方式 是依次递进的关系
- 方式2是对方式1的一个迭代 为什么要迭代？
- 我们写的java程序是面向接口编程的 我们希望有更好的可移植性 那就期望在代码中不要出现第三方的api

- 比如上面的代码中 我们 new com.mysql.cj.jdbc.Driver() 就是第三方的
- 这是我们不想看到的 我们期望我们的代码有更好的可移植性 比如我们想切换到Oracle最好能很顺畅的切换过去

- 那怎么获取mysql的Driver接口的实现类对象呢？ 反射 
- 利用反射我们就可以很好的对这部分代码包装起来 实现动态的获取(反射能体现出动态性)

> 代码部分:
- 跟方式1比较起来就是在获取 Driver接口的实现类 的时候用到反射了
- 使得我们获取连接的方式更具有通用性 代码里面都是sun公司提供的api这样可移植性就会高

```java
@Test
public void testConnection2() throws Exception {

  // 获取 Driver 接口的实现类对象 利用反射
  // 获取com.mysql.cj.jdbc.Driver的Class实例
  Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");

  // newInstance()要想调用成功必须要具有空参构造器 权限也要够 得到的是Object类型 然后进行强转
  Driver driver = (Driver)clazz.newInstance();

  // 提供要连接的数据库
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";

  // 提供连接需要的用户名和密码
  Properties info = new Properties();
  info.setProperty("user", "root");
  info.setProperty("password", "qwer6666");

  // 获取连接
  Connection connection = driver.connect(url, info);
  System.out.println(connection);
}
```

-----------------

### 获取数据库连接的 方式3:
- 使用 *DriverManager 替换 Driver*
- java.sql.DriverManager
<!-- 
  DriverManager是son公司提供的具体的类 不是一个接口
 -->

- 我们获取连接的操作 *更习惯使用 DriverManager 才操作*

> 具体步骤:
- 1. 利用反射 获取 实现类对象
```java
  Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");
  Driver driver = (Driver)clazz.newInstance();
```


- 2. 注册驱动
> DriverManager.registerDriver(Driver driver)
```java
DriverManager.registerDriver(driver);

// driver就是上面获取的实现类对象
```

- 3. 提供连接数据库所需的基本信息
```java
String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
String user = "root";
String password = "qwer6666";
```

- 4. 获取数据库连接
> DriverManager.getConnection(String url)
> DriverManager.getConnection(String url, Properties info)
> DriverManager.getConnection(String url, String user, String password)
- 上面的三个方法都是用来 获取连接 我们*使用第3个*
```java
Connection connection = DriverManager.getConnection(url, user, password);
```


> 完整代码
```java
@Test
public void testConnection3() throws Exception {

  // 1. 获取 Driver 实现类对象
  Class clazz = Class.forName("com.mysql.cj.jdbc.Driver");
  Driver driver = (Driver)clazz.newInstance();

  // 2. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";

  // 3. 注册驱动
  DriverManager.registerDriver(driver);

  // 4. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```

-----------------

### 获取数据库连接的 方式4:
- 它是在3的基础上做的优化
- 可以只是通过反射加载驱动不用显示的去注册驱动

```java
@Test
public void testConnection4() throws Exception {
  // 1. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";


  // 2. 获取 Driver 实现类对象
  Class.forName("com.mysql.cj.jdbc.Driver");
  // 相较于方式3 可以省略如下的操作
  /*
    Driver driver = (Driver)clazz.newInstance();
    DriverManager.registerDriver(driver);
  */

  // 3. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```

- 我们发现上面的代码 没有创建变量clazz 然后通过clazz创建实例对象 得到driver 也没有调用DriverManager.registerDriver()方法 注册驱动

- 但是也可以 为什么不用注册驱动呢？  

- Class.forName("com.mysql.cj.jdbc.Driver");
- 这行代码 相当于把 Driver 加载到内存中了 我们观察了下 Driver 类的源码发现 该类中有下面的静态代码块
```java
static {
  try {
    java.sql.DriverManager.registerDriver(new Driver())
  } catch(SQLException E) {
    throw new RuntimeException("Can't register driver!")
  }
}
```

- 我们回想下静态代码块什么时候执行 随着类的加载而执行 而
- Class.forName("com.mysql.cj.jdbc.Driver"); 这就是类的加载 一加载就会执行静态代码块中的逻辑 自动注册驱动了


> 静态注释后的代码 -- 标准模板
```java
public void testConnection4() throws Exception {
  // 1. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";

  // 2. 获取 Driver 实现类对象
  Class.forName("com.mysql.cj.jdbc.Driver");

  // 3. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```


> 扩展: -- 了解就可以
- 然后 我们发现 我们还可以省略这行代码
- Class.forName("com.mysql.cj.jdbc.Driver");

- 就是加载也不用了 代码就变成 直接通过DriverManager 调用获取连接的方法 getConnection() 也可以
```java
public void testConnection4() throws Exception {
  // 1. 提供连接数据库所需要的基本信息
  String url = "jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC";
  String user = "root";
  String password = "qwer6666";

  // 2. 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);

  System.out.println(connection);
}
```

- 因为我们将 mysql 驱动加载到类路径 add as lib 后 自动帮我们加载该类了 所以可以省 但是 ...

- 不要省略 因为 mysql 好用 别的数据库并不好用

-----------------

### 获取数据库连接的 方式5:  (最终版)
- 我们上面的方式中 会先准备好 url user password 和 加载 mysql驱动 Class.forName("全类名")

- 像这些都属于是配置信息 配置信息最好不要以 硬编码的方式 写在代码当中 应该把这些配置信息写到配置文件中 然后我们去读配置文件 然后将这些信息加载进来

- 配置文件
- 后期从web的角度考虑 *我们需要将配置文件放在src下 因为放在工程下的话 配置文件在部署到Tomcat服务器时候 文件就缺失了* 不会帮我们部署过去

| - src
  - jdbc.properties

- 配置文件中的书写顺序 无所谓 但是配置文件中不要有空格
```js
user=root
password=qwer6666
url=jdbc:mysql://localhost:3306/test?useUnicode=true&characterEncoding=UTF-8&useSSL=false&serverTimezone=UTC
driverClass=com.mysql.cj.jdbc.Driver
```

```java
@Test
public void testConnection5() throws Exception {
  // 将数据库连接需要的4个基本信息声明在配置文件中 通过读取配置文件的方式 获取连接

  // 1. 读取配置文件中的4个基本信息
  // 获取系统类加载器
  InputStream is = ConnectionTest.class.getClassLoader().getResourceAsStream("jdbc.properties");

  Properties properties = new Properties();
  properties.load(is);

  String user = properties.getProperty("user");
  String password = properties.getProperty("password");
  String url = properties.getProperty("url");
  String driverClass = properties.getProperty("driverClass");

  // 加载并注册驱动
  Class.forName(driverClass);

  // 获取连接
  Connection connection = DriverManager.getConnection(url, user, password);
  System.out.println(connection);
}
```

> 方案5的好处是？
- 1. 当我们不是要连接mysql的时候 我们只需要修改 配置文件就可以了 也就是我们实现了*数据和代码的分离* 也是实现了解耦

- 2. 如果需要修改配置文件信息 可以避免程序重新打包
<!-- 
  当我们把程序写完后 真正要部署到Tomcat服务器上 我们需要将java代码打包到jar文件 将编译后的程序部署到服务器上 如果我们要对获取连接中的某个参数 要进行修改的话 就要修改源代码 就意味着我们的java要重新打包 而我们的properties文件 打包的时候还是单独以一个文件的形式进行存储 所以我们要是修改参数 只需要替换properties文件就可以 
-->

-----------------

### Statement操作数据库的弊端演示
- 上面我们在讲流程的时候 讲到过 当我们获取连接 connection 对象后 就要创建一个 Statement 对象 让这个对象拿着sql语句 去操作数据库 实际上我们需要创建的是 Statement对象 但是我们现在却要使用 PreparedStatement 对象
<!-- 
    Statement -- 接口
      PreparedStatement -- 子接口
 -->

- 我们真正的开发中用的都是 PreparedStatement 而不是 Statement 因为 Statement 存在着一些弊端


- 数据库连接被用于*向数据库服务器发送命令 和 sql 语句* 并接受数据库服务器返回的结果 其实一个数据库连接是一个socket连接

 
- 在 java.sql 包中有 *3个接口* 分别定义了对数据库的调用的不同方式 用来发送sql语句

> 1. Statement:  (不用它了)
  用于执行静态 sql 语句并返回它所生成结果的对象

> 2. PerparedStatement:  (用它)
  sql语句被预编译并存储在此对象中 可以使用此对象多次高效的执行该语句

> 3. CallableStatement:  (放到框架里面再说)
  用于执行 sql 存储过程 当我们使用存储过程的时候 我们再用它

<!-- 
                Driver Manager

connection       connection         connection
    ↓                 ↓                 ↓
statement     PerparedStatement   CallableStatement
    ↓                 ↓                 ↓
  result            result            result
 -->


> 演示 statement对象 的弊端
- 我们数据库中有一个 user 表
<!-- 
  user  password  balance
  aa    123456    1000
  bb    654321    1000
  cc    abcd      2000
  dd    abcder    3000
 -->

- 需求:
- 我们在java层面输入用户名和密码 如果正确的情况下 你告诉我登录成功 如果我们要是输入错误 告诉我们登录失败

```java
@Test
public void testLogin() {
  Scanner scan = new Scanner(System.in);

  System.out.print("用户名：");
  // 为了演示 这里要改成nextLine() next的话 只要是空格也算获取数据结束 而 nextLine() 只把换行当做获取数据的结束
  String userName = scan.nextLine();

  System.out.print("密   码：");
  String password = scan.nextLine();

  // SELECT user,password FROM user_table WHERE USER = '1' or ' AND PASSWORD = '
  // ='1' or '1' = '1';

  // 查询语句 注意 sql引号拼接的问题 这就是拼串操作 麻烦！
  String sql = "SELECT user,password FROM user_table WHERE USER = '" + userName + "' AND PASSWORD = '" + password
      + "'";

  // User.class 返回的对象的类型
  User user = get(sql, User.class);

  if (user != null) {
    System.out.println("登陆成功!");
  } else {
    System.out.println("用户名或密码错误！");
  }
}
```

**弊端:**
> 1. 需要用变量 和 sql语句进行拼接

> 2. sql注入的问题
- 在*用户名和密码输入不正确的情况下* 我们也可以对数据库进行恶意操作 (也就是用户名和密码不对 也能登录成功)

- 上面代码中 本身我们 sql 语句的逻辑是:
```sql
SELECT user, password 
FROM user_table 
WHERE user = '' and password = ''
```

- 现在我们拼一个串
```sql
SELECT user, password 
FROM user_table 
WHERE user = '1' or ' and password = '=1 or '1' = '1'
```

- 现在我们输入用户名:
- WHERE user = '用户名'   用户名的部分替换成下面的
- *1' or*

- 就变成了
- user = '1' or '


- 现在我们输入密码:
- password = '密码'   密码的部分替换成下面的
- *=1 or '1' = '1*

- 就变成了
- password = '=1 or '1' = '1'

- 也就是当我们在控制台 如上输入的时候
- 请输入用户名: 1' or
- 请输入密码:   =1 or '1' = '1
- *登录成功*

- 以上就是sql注入 明明写的不对但是还是登录成功了
- 究其原因 就是我们使用了 Statement

- 原来sql中 想表达的是条件 xx and xx 是且的关系
- 当sql注入的时候 结果发生了变化 变成
- xx or xx or xx 
- 也就是说 只要有一个满足就可以
- 而最后的 '1' = '1' 是恒成立的

```sql
SELECT user, password 
FROM user_table 
WHERE user = '' and password = ''

-- 现在
SELECT user, password 
FROM user_table 
WHERE user = '1' or ' and password = '=1 or '1' = '1'
```


> 如何避免出现sql注入
- 只要用 PreparedStatement 取代 Statement 就可以了
<!-- 
  比如花多少钱弄个学历 就是利用数据库的漏洞 把我们的数据强行的塞进去

  但是网站也是有备份的 定期会清理数据 回滚一下 我们的数据也有可能被清掉了 也就是说只有一段时间是好用的
 -->

-----------------

### PreparedStatement 的使用
- 我们回顾上面的内容

- 首先我们要获取数据库的连接
- (有5种方式 - 第5种 - 我们使用DriverManager管理器来做的 其它它底层也在创建 Driver对象)

- 在获取连接之后 就是在java层面写sql语句 发送到数据库中去做执行 
<!-- 
    Driver代表数据库驱动
    ↓

    Connection代表数据库连接
    ↓

    PreparedStatement预编译的Statement
          ↙             ↘
        增删改          查询
                        ↓
                        ResultSet代表查询结果
 -->

---

> PreparedStatement的使用 实现数据库的 增删改 操作

  | - com.sam.preparedstatement
    - PreparedStatementUpdateTest

- 增: insert
- 删: delete from
- 改: update

- 查: select

- 增删改操作: 完成后是不需要有什么返回的 相当于 void
- 查询操作: 一定是由返回的

---

### 使用 PreparedStatement 向数据库表中 插入数据

> 要点:
> 1. 关于 sql 语句的要点
- 在sql语句中 我们要使用 *?* 占位符
- 占位符的位置 要与我们添加的数据 一一对应
```java
String sql = "insert into customers(name,email,birth)values(?,?,?)";
```

- 占位符的使用位置 就是 过滤条件那


> 2. 获取 PreparedStatement接口 的实例对象
> 连接对象.prepareStatement(String sql)
- 我们要先获取连接对象 连接对象怎么获取 可以看看上面的 第5种方式

- 返回值:
- PreparedStatement 类型的实例 *ps*

```java
ps = connection.prepareStatement(sql);
```


> 3. 通过 ps 实例对象 调用 setXxx() 方法 向占位符 的位置填入数据

> ps.setString(int 索引, String x)
- 索引:
- 指向步骤2中的占位符的位置 在与数据库的交互中 索引都是从1开始的 比如我们添入 1 就意味着在第一个 ? 处 填入数据
```java
ps.setString(1, "哪吒");
ps.setString(2, "nezha@gmail.com");

SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
java.util.Date date = sdf.parse("1000-01-01");
ps.setDate(3, new Date(date.getTime()));
```

**注意:**
- 1. 我们可以往 ? 填入各种类型的数据 那么调用的也是setXxx()方法
- 2. 我们存入什么类型的数据 x的位置也对应是什么类型的数据

- ps.setString()
> ps.setObject()   存什么都可以 setObject 通用
- ps.setDate()
- ps.setArray()
- ps.setString()
- ps.setAsciiStream()
- ps.setBinaryStream()
- ps.setBlob()
- ps.setBytes()
- ps.setCharacterStream()
- ps.setClob()
- ps.setDouble()
- ps.setFloat()
- ps.setInt()
- ps.setLong()


> 4. ps.execute();
- 执行操作

> 5. 最后要关闭资源 使用 try catch
- 我们要关闭 ps connection

> 完整代码:
```java
@Test
public void testInsert() {
  Connection connection = null;
  PreparedStatement ps = null;
  try {
    // 1. 获取数据库连接
    InputStream is = PreparedStatementUpdateTest.class.getClassLoader().getResourceAsStream("jdbc.properties");
    // 下面这行代码也能获取 系统类加载器
    // InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");
    Properties properties = new Properties();
    properties.load(is);

    String user = properties.getProperty("user");
    String password = properties.getProperty("password");
    String url = properties.getProperty("url");
    String driverClass = properties.getProperty("driverClass");

    Class.forName(driverClass);
    connection = DriverManager.getConnection(url, user, password);


    // 2. 预编译sql语句 返回PreparedStatement实例对象;  ? 叫做占位符
    String sql = "insert into customers(name,email,birth)values(?,?,?)";
    ps = connection.prepareStatement(sql);


    // 3. 填充占位符 int parameterIndex String x 跟数据库交互的索引是从1开始的 1指向第一个占位符 有几个占位符就调用几次 x为要加入的值
    ps.setString(1, "哪吒");
    ps.setString(2, "nezha@gmail.com");
    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    java.util.Date date = sdf.parse("1000-01-01");
    ps.setDate(3, new Date(date.getTime()));


    // 4. 执行操作
    ps.execute();

    
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 5. 资源关闭 PreparedStatement 和 connection 都要关 涉及到资源的关闭 我们就不要throws了
    try {
      if(ps != null) ps.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
    try {
      if(connection != null) connection.close();
    } catch (SQLException e) {
      e.printStackTrace();
    }
  }
}
```

-----------------

### 封装数据库连接和关闭操作
- 我们不管说 增加 修改 删除 不管哪个操作 有几件事情是一定要做的
- 1. 先要获取连接
- 2. 中间是增删改查的操作
- 3. 关闭连接

- 我们把 1 3 封装到一个方法当中 抽离到一个包里面

  | - com.sam.utils
    - JDBCUtils  

- 工具类中都是静态方法

- 需要的包:
```java
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Properties;
```

> 获取连接的方法
- 最后return一个连接对象
```java
public static Connection getConnection() throws Exception {
  // 利用 ClassLoader 获取系统类加载器 这样
  InputStream is = ClassLoader.getSystemClassLoader().getResourceAsStream("jdbc.properties");

  Properties properties = new Properties();
  properties.load(is);

  String user = properties.getProperty("user");
  String password = properties.getProperty("password");
  String url = properties.getProperty("url");
  String driverClass = properties.getProperty("driverClass");

  Class.forName(driverClass);
  Connection connection = DriverManager.getConnection(url, user, password);

  return connection;
}
```


> 关闭连接的方法
- 要点:
- 1. 参数的定义:
- Connection connection
- PreparedStatement ps
- 参数2可以定义为 Statement
- 因为PreparedStatement是Statement的子接口 参数我们也可以定义的大一些

- 2. 方法没有返回值

```java
public void closeResource(Connection connection, PreparedStatement ps) {
  try {
    if(ps != null) ps.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
  try {
    if(connection != null) connection.close();
  } catch (SQLException e) {
    e.printStackTrace();
  }
}
```

-----------------

### 使用 PreparedStatement 修改数据库表中的数据
- 操作数据库的5步

```java
// 1. 获取数据库的连接

// 2. 通过连接对象 获取 preparedstatement对象 预编译sql语句

// 3. 填充占位符

// 4. 执行

// 5. 资源的关闭
```

- 步骤2中我们提到了 预编译 什么是预编译?
```java
String sql = "update customers set name = ? where id = ?";

PreparedStatement ps = connection.prepareStatement(sql);
```
- 在我们根据sql生成PrepareStatement实例的时候(也就是得到ps的时候) ps中已经携带了我们要做的事情(sql语句体现的) 这就是预编译

- 跟statement比较起来 statement的实例出生的时候不知道它要做什么 但是 ps 出生的时候就知道它要做什么


- 其实我们看看 增删改 的操作中 1 4 5 都是固定的 维度 2 3 需要有变化 等我们做完修改的操作 我们会尝试封装个通用的 增删改 


> 修改数据库的操作
```java
@Test
public void testUpdate() throws Exception {
  // 1. 获取数据库的连接
  Connection connection = JDBCUtils.getConnection();

  // 2. 通过连接对象 获取 preparedstatement对象 预编译sql语句
  String sql = "update customers set name = ? where id = ?";
  PreparedStatement ps = connection.prepareStatement(sql);

  // 3. 填充占位符
  // 我们填充String name 和 int id也可以用setObject()
  ps.setObject(1, "莫扎特");
  ps.setObject(2, 18);

  // 4. 执行
  ps.execute();

  // 5. 资源的关闭
  JDBCUtils.closeResource(connection, ps);
}
```

- 加上 try catch 的逻辑
```java
@Test
public void testUpdate() throws Exception {
  Connection connection = null;
  PreparedStatement ps = null;
  try {
    // 1. 获取数据库的连接
    connection = JDBCUtils.getConnection();

    // 2. 通过连接对象 获取 preparedstatement对象 预编译sql语句
    String sql = "update customers set name = ? where id = ?";
    ps = connection.prepareStatement(sql);
    // 什么叫预编译sql语句 在我们生成PrepareStatement实例的时候(也就是得到ps的时候) ps中已经携带了我们要做的事情(sql语句体现的)

    // 3. 填充占位符
    // 我们填充String name 和 int id也可以用setObject()
    ps.setObject(1, "莫扎特");
    ps.setObject(2, 18);

    // 4. 执行
    ps.execute();
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 5. 资源的关闭
    JDBCUtils.closeResource(connection, ps);
  }
}
```

-----------------

### 使用 PreparedStatement 实现通用的增删改操作
- 上面也说了 只是sql语句和填充占位符的地方不一样
- 我们把随时可能会变的信息定义为参数

> 要点:
- 参数:
- String sql: sql语句
- Object ...args: 占位符
- 类型都可以定义为Object
- 要求: 有几个占位符 我们就传入几个实参 可变形参的个数 要与 sql中占位符的个数是一样的

```java
// 这里不要忘记要try catch
public void update(String sql, Object ...args) {
  Connection connection = JDBCUtils.getConnection();
  PreparedStatement ps = connection.prepareStatement(sql);

  // 使用 ...args 填充占位符
  for(int i = 0; i < args.length; i++) {
    // 小心index从1开始 args数组要从0开始
    ps.setObject(i + 1, args[i]);
  }

  ps.execute();
  JDBCUtils.closeResource(connection, ps);
}
```


- 测试1:  OK
```java
@Test
public void testCommonUpdate() {
  // 删除表中数据
  String sql = "delete from customers where id = ?";

  update(sql, 3);
}
```


- 测试2:  报错
```java
@Test
public void testCommonUpdate() {
  String sql = "update order set order_name = ? where order_id = ?";

  update(sql, "DD", "2");
}
```

- 错误信息:
- java.sql.SQLSyntaxErrorException: *You have an error in your SQL syntax; check the manual that corresponds to your MySQL* server version for the right syntax to use near 'from order set order_name = 'DD' where order_id = '2'' at line 1


- 上面的sql语句写的有问题
- order是表名 order还是关键字 所以记得使用 ``
```java
String sql = "update `order` set order_name = ? where order_id = ?";
```

-----------------

### 使用 PreparedStatement 实现 查询操作
- 整体来说套路是一样的 但是查询的话 还要处理查询到的结果
- 因为查询结果会有结果集 结果集在java中万事万物都是对象 也就是说我们查到的结果集 要拿一个java类的对象来充当 我们要操作java对象

- jdbc中对于结果集 有 ResultSet 我们要知道怎么处理 ResultSet

> 针对于 具体的表(Customers) 的查询操作

  | - com.sam.preparedstatement
    - CustomersForQuery

- 前面的步骤都一样
- 1. 获取连接
- 2. 预编译 sql 创建 PreparedStatement

- 在增删改的时候我们调用的都是 ps.execute() 但是因为我们这里是查询 我们要对查询回来的结果集做处理 所以要调用

> ps.executeQuery();
- 执行sql 并返回结果集

- 返回值:
- ResultSet resultSet
- resultSet也是资源 也需要关闭

```java
ResultSet resultSet = ps.executeQuery();
```

- 遍历数据:
- java基础部分的时候 我们讲过怎么使用 遍历器来遍历集合
```java
while(iterator.hasNext()) {
  // iterator.hasNext()判断当前集合中是否还有元素 有元素就进入循环体 没有就不要进去了
  System.out.println(iterator.next());
}
```

- 回顾下:
- 指针会在集合首位元素的前面 hasNext() 会判断下面有没有元素 有元素 我们在调用 next() 获取元素

- 结果集也有一个指针 它也指向第一条数据的上面 我们也是调用某一个方法 判断下面还有没有数据 有的话接着操作 没有的话就退出了 这个方法就是next() 

> resultSet.next()
- 作用:
- 1. 判断结果集的下一条是否有记录
- 2. 指针下移(如果是true 说明下面有元素 指针自动下移, false指针不下移直接结束)

- 返回值:
- boolean 
<!-- 
  - 有点类似 hasNext() 但是还不同与 hasNext() 
  - hasNext()的作用就一个 判断下面还有没有元素 而指针下移的事儿 是iterater.next() 做的 
 -->


> resultSet.getInt(从1开始的索引)
> resultSet.getString(从1开始的索引)
> resultSet.getObject(从1开始的索引) - 通用
- 每个字段是什么类型 我们就对应的调用 getXxx()
- 索引的位置就要看你读取的是哪个字段的数据
<!-- 
    id    name    email   birth
    1       2       3       4
 -->

```java
// 处理结果集
if(resultSet.next()) {
  // 进来说明下一条是有记录的 然后我们就要获取当前这条数据的各个字段值

  int id = resultSet.getInt(1);

  String name = resultSet.getString(2);

  String email = resultSet.getString(3);
  // 是sql下的Date

  Date birth = resultSet.getDate(4);
}
```


> Java 与 SQL 对应数据类型的转换表

    java类型            sql类型
    boolean             BIT
    byte                TINYINT
    short               SMALLINT
    int                 INTEGER
    long                BIGINT
    String              CHAR VARCHER LONGVARCHAR
    byte array          BINARY VAR BINARY
    java.sql.Date       DATE
    java.sql.Time       TIME
    java.sql.Timestamp  TIMESTAMP

<!-- 
  Blob类型 在java中 没有对应的类型
  比如有个视频4个g java不能拿个属性去对接4个g吧

  可以是个file
 -->


> 处理结果集中每个字段的数据
- 上面我们从结果集中拿到了 每个字段的数据 那我们把这些数据保存到哪里？

- 方式1: (不推荐)
- 保存到数组中

- 方式2: 
- 将每一个属性封装到java对象中
- 一个java类对应数据库中的一个表 
- 表中有什么字段 类中就对应有什么属性
- 表中是什么类型 类中的属性就对应什么类型
<!-- 
  ORM映射:
    一个数据表 对应 一个java类
    表中的一条记录 对应 java类中的一个对象
    表中的一个字段 对应 java类中的一个属性
 -->

    customers表 -> Customer类

 | - com.sam.bean
   - Customer

- JavaBean类中public的属性是private
```java
package com.sam.bean;

import java.sql.Date;

public class Customer {
   private int id;
   private String name;
   private String email;
   private Date birth;    // 这里和数据库的Date类型对接 也是 java.sql.Date

  public Customer() {
  }

  public Customer(int id, String name, String email, Date birth) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.birth = birth;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Date getBirth() {
    return birth;
  }

  public void setBirth(Date birth) {
    this.birth = birth;
  }

  @Override
  public String toString() {
    return "Customer{" +
        "id=" + id +
        ", name='" + name + '\'' +
        ", email='" + email + '\'' +
        ", birth=" + birth +
        '}';
  }
}

```


> 使用 PreparedStatement 查询数据库 代码部分
```java
package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

// 针对 Customers 表的查询操作
public class CustomersForQuery {

  @Test
  public void testQuery1() throws Exception {
    Connection connection = JDBCUtils.getConnection();

    String sql = "select id, name, email, birth from customers where id = ?";
    PreparedStatement ps = connection.prepareStatement(sql);

    // 补充 占位符
    ps.setObject(1, 1);

    // 增删改的操作的时候 这里我们调用的是 ps.execute() 我们这里要执行后还要返回一个结果集 所以我们要调用
    // 调用ps对象的 执行并返回结果集的方法
    ResultSet resultSet = ps.executeQuery();

    // 处理结果集
    if(resultSet.next()) {
      // 进来说明下一条是有记录的 然后我们就要获取当前这条数据的各个字段值
      int id = resultSet.getInt(1);
      String name = resultSet.getString(2);
      String email = resultSet.getString(3);
      // 是sql下的Date
      Date birth = resultSet.getDate(4);

      // 上面拿到了每个字段的数据 我们怎么处理这些数据
      // 方式1: 保存到数组中
      // Object[] data = new Object[] {id, name, email, birth};

      // 方式2: 保存到对象中(封装到类的对象中)
      Customer customer = new Customer(id, name, email, birth);
      System.out.println(customer);
    }

    // 关闭资源
    JDBCUtils.closeResource(connection, ps, resultSet);
  }
}
```

- 改成 try catch 的形式
```java
@Test
public void testQuery1() {
  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet resultSet = null;
  try {
    connection = JDBCUtils.getConnection();

    String sql = "select id, name, email, birth from customers where id = ?";
    ps = connection.prepareStatement(sql);

    // 补充 占位符
    ps.setObject(1, 1);

    // 增删改的操作的时候 这里我们调用的是 ps.execute() 我们这里要执行后还要返回一个结果集 所以我们要调用
    // 调用ps对象的 执行并返回结果集的方法
    resultSet = ps.executeQuery();

    // 处理结果集
    if(resultSet.next()) {
      // 进来说明下一条是有记录的 然后我们就要获取当前这条数据的各个字段值
      int id = resultSet.getInt(1);
      String name = resultSet.getString(2);
      String email = resultSet.getString(3);
      // 是sql下的Date
      Date birth = resultSet.getDate(4);

      // 上面拿到了每个字段的数据 我们怎么处理这些数据
      // 方式1: 保存到数组中
      // Object[] data = new Object[] {id, name, email, birth};

      // 方式2: 保存到对象中(封装到类的对象中)
      Customer customer = new Customer(id, name, email, birth);
      System.out.println(customer);
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    // 关闭资源
    JDBCUtils.closeResource(connection, ps, resultSet);
  }
}
```

-----------------

### 封装 某一张表的 通用的 查询操作
- 我们在查询一张表的时候 每次查询的字段多少可能不一样
<!-- select ? from -->

- 上面的字段不一样 也会影响到 我们通过 resultSet 对象 去取字段的数据 也不一样

- 写成通用的也就是将这些变的东西 写成通用的

- 首先我们想想 哪部分应该提取为参数部分
- sql:
- 因为查几个字段不确定 有的情况查2个 有的情况查3个

- args:
- 用于补充占位符 我们在sql中写了几个 ? 就要传递几个实参 该实参都会在 args数组中

```java
public Customer queryForCustomers(String sql, Object ...args) throws Exception {
  
  // 获取连接
  Connection connection = JDBCUtils.getConnection();

  // 传入sql参数 进行预编译
  PreparedStatement ps = connection.prepareStatement(sql);

  // 补充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i + 1, args[i]);
  }

  // 获取结果集
  ResultSet rs = ps.executeQuery();

  ...

```

- ok 现在我们根据sql得到了结果集 接下来我们就要 通过调用 rs.getObject() 方法 将结果集中的每一个列(字段)的值 拿出来封装到java的对象中

- 那我们考虑下 我们需要什么信息
> 问题1. 我们要调用 rs.getObject() 几次?
<!-- 
  调用几次是由 select 几个字段 form 决定的
  这几个字段决定了我们结果集有几列 结果集有几列就意味着我们要调用几次 rs.getObject() 方法

  那怎么获取结果集的列数？ 
  获取结果集的列数的方法被封装到结果集的元数据当中了
 -->

> rs.getMetaData();
- 获取 结果集 的元数据
- 用来修饰结果集的数据 叫做元数据
<!-- 
  结果集如果看成 td 里面的具体数据
  那么元数据 相当于 theah 表头啊 列数啊 这些附加的信息
 -->

- 返回值
- ResultSetMetaData rsmd


> rsmd.getColumnCount()
- 获取 结果集 的*总列数*

- 返回值
- int


> rsmd.getColumnName(int column)
- 获取 结果集中 指定列数的 *列名*

> rsmd.getColumnLabel(int column)
- 获取 结果集中 指定列数的 *别名*
- *当没有给表指定别名的时候 检索结果就是列名 所以这个方法通用*

- 返回值
- String

- ok 知道了上面的这些 我们写下逻辑
```java
public Customer queryForCustomers(String sql, Object ...args) throws Exception {
  
  // 获取连接
  Connection connection = JDBCUtils.getConnection();

  // 传入sql参数 进行预编译
  PreparedStatement ps = connection.prepareStatement(sql);

  // 补充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i + 1, args[i]);
  }

  // 获取结果集
  ResultSet rs = ps.executeQuery();


  // 获取结果集的元数据
  ResultSetMetaData rsmd = rs.getMetaData();

  // 获取结果集中的列数 用于遍历使用
  int columnCountcount = rsmd.getColumnCount();

  // 判断结果集中有数据
  if(rs.next()) {
    // 判断有数据后 我们创建 customer 对象 用于接收查询到的结果到 对象中

    Customer customer = new Customer();

    // 根据列数决定调用几次 rs.getObject()
    for(int i=0; i<columnCountcount; i++) {
      // 获取每个字段的值
      Object columnValue = rs.getObject(i + 1); 

      // 获取每个字段的列名(也就是属性名)
      String columnName = rsmd.getColumnName(i + 1);

      ... 
    }
  }
```


> 问题2: 我们现在也拿到字段名(属性名) 也知道属性值了 现在就要添加到对象中

- 通过反射 给customer对象指定的columnName属性 赋值为columnValue

- 下面的代码添加到 ... 的部分
```java
// 获取运行时类的指定属性
Field field = Customer.class.getDeclaredField(columnName);
field.setAccessible(true);

// 将这个属性名的值设置为
field.set(customer, columnValue);
```


> 完整代码
```java
public Customer queryForCustomers(String sql, Object ...args) throws Exception {
  
  // 获取连接
  Connection connection = JDBCUtils.getConnection();

  // 传入sql参数 进行预编译
  PreparedStatement ps = connection.prepareStatement(sql);

  // 补充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i + 1, args[i]);
  }

  // 获取结果集
  ResultSet rs = ps.executeQuery();


  // 获取结果集的元数据
  ResultSetMetaData rsmd = rs.getMetaData();

  // 获取结果集中的列数 用于遍历使用
  int columnCountcount = rsmd.getColumnCount();

  // 判断结果集中有数据 使用if意味着我们查询结果只有一条数据
  if(rs.next()) {
    // 判断有数据后 我们创建 customer 对象 用于接收查询到的结果到 对象中

    Customer customer = new Customer();

    // 根据列数决定调用几次 rs.getObject()
    for(int i=0; i<columnCountcount; i++) {
      // 获取每个字段的值
      Object columnValue = rs.getObject(i + 1); 

      // 获取每个字段的列名(也就是属性名)
      String columnName = rsmd.getColumnName(i + 1);

      // 通过反射 给customer对象指定的columnName属性 赋值为columnValue
      // 获取运行时类的指定属性
      Field field = Customer.class.getDeclaredField(columnName);

      field.setAccessible(true);

      // 将这个属性名的值设置为
      field.set(customer, columnValue);
    }
    return customer;
  }

  // 关闭资源
  JDBCUtils.closeResource(connection, ps, rs);
  return null;
}
```

- 加入 try catch 的代码
```java
public Customer queryForCustomers(String sql, Object ...args) {
  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  try {
    connection = JDBCUtils.getConnection();
    ps = connection.prepareStatement(sql);
    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }

    rs = ps.executeQuery();


    // 获取结果集的元数据 修饰结果集的数据 都在 rsmd 中
    ResultSetMetaData rsmd = rs.getMetaData();

    // 通过 rsmd 获取结果集中的列数
    int columnCountcount = rsmd.getColumnCount();

    if(rs.next()) {

      // 写到if里面 当有结果的时候 我们再造对象
      Customer customer = new Customer();

      // 处理结果集一行数据中的每一个列
      for(int i=0; i<columnCountcount; i++) {
        // 获取每个字段的值
        Object columnValue = rs.getObject(i + 1);

        // 获取 每个列的列名 也在结果集的元数据中
        String columnName = rsmd.getColumnName(i + 1);
        // 通过反射 给customer对象指定的columnName属性 赋值为columnValue
        // 获取运行时类的指定属性
        Field field = Customer.class.getDeclaredField(columnName);
        field.setAccessible(true);

        // 将这个属性名的值设置为
        field.set(customer, columnValue);
      }

      return customer;
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(connection, ps, rs);
  }

  return null;
}
```

- 测试:
```java
@Test
public void testQueryForCustomers() {
  // 字段的顺序 这里无所谓 因为上面我们是利用反射 set value的
  String sql = "select id, name, birth, email from customers where id = ?";
  Customer customer = queryForCustomers(sql, 13);
  System.out.println(customer);
}
```

-----------------

### 针对 order 表 通用的 查询操作

- 看看 表中的字段 的类型 好用来定义JavaBean中属性的类型
```sql
CREATE TABLE `order` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `order_name` varchar(20) DEFAULT NULL,
  `order_date` date DEFAULT NULL,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=gb2312
```

> 要点:
- 1. 表中的字段名是 order_id 
- java类中属性的定义方式:
  - 和表中的字段名 保持一致: order_id 不推荐

  - java中定义为驼峰 orderId
  - 1. 指定sql语句的时候 我们给字段起别名 *别名要保证和java类中的属性名一致都是驼峰*
  ```sql
    String sql = "select order_id orderId, order_name orderName, order_date orderDate from `order` where order_id = ?";
  ```


  - 2. rsmd.getColumnLabel(int column)
  - 使用该方法 替换 下面的 getColumnName()


```java
package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.bean.Order;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class OrdersForQuery {

@Test
public void testQueryForOrder() {
  String sql = "select order_id, order_name, order_date from `order` where order_id = ?";
  Order order = queryForOrder(sql, 1);
  System.out.println(order);
}

public Order queryForOrder(String sql, Object ...args) {

  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  try {
    connection = JDBCUtils.getConnection();
    ps = connection.prepareStatement(sql);

    for(int i=0; i<args.length; i++) {
      ps.setObject(i + 1, args[i]);
    }

    rs = ps.executeQuery();
    ResultSetMetaData rsmd = rs.getMetaData();
    int columnCount = rsmd.getColumnCount();

    // 一条数据(记录)的时候用 if
    if(rs.next()) {
      Order order = new Order();

      for(int i=0; i<columnCount; i++) {
        Object columnValue = rs.getObject(i + 1);


        // String columnName = rsmd.getColumnName(i + 1);

        // 以后就使用该方法来获取列名 或者 列的别名
        // 优点 在java类中 可以将属性设置为 驼峰
        String columnName = rsmd.getColumnLabel(i + 1);


        Field field = Order.class.getDeclaredField(columnName);
        field.setAccessible(true);
        field.set(order, columnValue);
      }

      return order;
    }
  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(connection, ps, rs);
  }
  return null;
}
}

```

-----------------

### 使用 PreparedStatement 实现 针对不同表的通用查询操作

  | - com.sam.preparedstatement
    - PreparedStatementQueryTest

> 通过 PreparedStatement 查询数据库 获取 一条记录(一个对象)

> 问题1: 
- 因为是通用的表的查询操作 那么我们方法的返回值类型是什么？
- 比如:
- 我们查询 order表 返回的是 Order类型
- 我们查询 user表  返回的是 User类型


- 我们先看看 指定表的通用查询操作 看看 哪些部分可以改成通用的代码

```java
// **问题1**: 方法的返回值
public Object getInstance(String sql, Object ...args) throws Exception {

  // 获取连接
  Connection connection = JDBCUtils.getConnection();
  // 预编译sql
  PreparedStatement ps = connection.prepareStatement(sql);

  // 填充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i+1, args[i]);
  }

  // 执行并获取结果集
  ResultSet rs = ps.executeQuery();

  // 获取列数
  ResultSetMetaData rsmd = rs.getMetaData();
  int columnCount = rsmd.getColumnCount();

  // 一条数据
  if(rs.next()) {

    // **问题2**: 我们创建的不知道是哪个类的对象
    Order order = new Order();

    for(int i=0; i<columnCount; i++) {
      // 获取列名
      String columnLabel = rsmd.getColumnLabel(i + 1);

      // 获取列值
      Object columnValue = rs.getObject(i + 1);

      // 通过反射 将查询到的结果添加到对象的属性里
      Field field = Order.class.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(order, columnValue);
    }
    return order;
  }

  JDBCUtils.closeResource(connection, ps, rs);
  return null;
}
```

- 获取连接
- 预编译sql
- 填充占位符
- 执行并获取结果集
- 获取列数
- 一条数据 if(rs.next())
- 这些都是通用的

> 问题1: 方法的返回值
- 那我们定义方法的返回值类型应该是什么？ 
- 修改为 泛型方法 为什么结合问题2再看
```java
public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception { }
```

- 传参的时候: Order.class


> 问题2: 
- 我们创建的不知道是哪个类的对象
- 或者换句话说 这个位置 我们造的对象 就决定了 整个方法的返回值的类型

- 所以这个部分我们不能直接 new Order 不能在编译的期间确定 所以这个部分 我们要替换成反射

- 那反射的话 我们要告诉程序 造哪个类的对象 哪个类的对象也可以由参数传递进来

  Class clazz

- 并且 Class 都带泛型 所以我们在定义形参的时候 可以带上泛型 

  Class<T> clazz

- 这样问题1也能解决 返回值就是 T 类型的
- 也就是说 我们整个方法 就是泛型方法

```java
// 之前:
if(rs.next()) {
  // **问题2**: 我们创建的不知道是哪个类的对象
  Order order = new Order();
}


// 之后:
// 加形参 Class clazz
public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception {
  
  ...

  if(rs.next()) {
    // 返回值类型就是 T 类型
    T t = clazz.newInstance();

    for(int i=0; i<columnCount; i++) {

      String columnLabel = rsmd.getColumnLabel(i + 1);
      Object columnValue = rs.getObject(i + 1);

      // 这里是clazz 因为clazz相当于Order 而t相当于order对象 不一样的
      Field field = clazz.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(t, columnValue);

    }

    return t;
}
``` 

- 也就是说 我们上面解决完 问题1 问题2 就ok了
- 测试 + 完整代码:
```java
package com.sam.preparedstatement;

import com.sam.bean.Customer;
import com.sam.bean.Order;
import com.sam.utils.JDBCUtils;
import org.junit.Test;

import java.lang.reflect.Field;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;

public class PreparedStatementQueryTest {

@Test
public void testGetInstance() throws Exception {
  String sql = "select id, name, email, birth from customers where id = ?";
  Customer customer = getInstance(Customer.class, sql, 1);
  System.out.println(customer);
}

public <T> T getInstance(Class<T> clazz, String sql, Object ...args) throws Exception {

  // 获取连接
  Connection connection = JDBCUtils.getConnection();
  // 预编译sql
  PreparedStatement ps = connection.prepareStatement(sql);

  // 填充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i+1, args[i]);
  }

  // 执行并获取结果集
  ResultSet rs = ps.executeQuery();

  // 获取列数
  ResultSetMetaData rsmd = rs.getMetaData();
  int columnCount = rsmd.getColumnCount();

  // 一条数据
  if(rs.next()) {

    // **问题**: 我们创建的不知道是哪个类的对象
    // Order order = new Order();
    T t = clazz.newInstance();

    for(int i=0; i<columnCount; i++) {
      String columnLabel = rsmd.getColumnLabel(i + 1);
      Object columnValue = rs.getObject(i + 1);

      // 这里是clazz 因为clazz相当于Order 而t相当于order对象 不一样的
      Field field = clazz.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(t, columnValue);
    }
    return t;
  }

  JDBCUtils.closeResource(connection, ps, rs);
  return null;
}
}

```

--- 

> 通过 PreparedStatement 查询数据库 获取 多条记录(多个对象)
- 多个对象的话 我们就应该返回一个集合

- 要点:
- 1. 上面一系列的方法中 我们使用的都是 if(rs.next()) 这是如果有数据(一条数据)的情况下 我们执行 { 逻辑 }

- 现在 我们要使用 while 来进行多条数据的逻辑

- if(rs.next())   改成:
- while(rs.next()) 
- 当没有数据的时候 就是false

- 2. 我们在 while循环的外面 创建一个 list 结合

- 3. 查询如果没有查到 的情况
  - 1. 抛异常了
  - 2. 可能是没查到数据 list.size() == 0

```java
public <T> List<T> getForList(Class<T> clazz, String sql, Object ...args) throws Exception {

  // 获取连接
  Connection connection = JDBCUtils.getConnection();
  // 预编译sql
  PreparedStatement ps = connection.prepareStatement(sql);

  // 填充占位符
  for(int i=0; i<args.length; i++) {
    ps.setObject(i+1, args[i]);
  }

  // 执行并获取结果集
  ResultSet rs = ps.executeQuery();

  // 获取列数
  ResultSetMetaData rsmd = rs.getMetaData();
  int columnCount = rsmd.getColumnCount();

  // 创建一个承装对象的结合
  ArrayList<T> list = new ArrayList<>();


  // 多条记录
  while(rs.next()) {

    // 循环中 每次都创建一个t对象
    T t = clazz.newInstance();

    // 通过 for 将t对象的所有的属性都附上值了
    for(int i=0; i<columnCount; i++) {
      String columnLabel = rsmd.getColumnLabel(i + 1);
      Object columnValue = rs.getObject(i + 1);

      Field field = clazz.getDeclaredField(columnLabel);
      field.setAccessible(true);
      field.set(t, columnValue);
    }

    // 把对象添加到集合中
    list.add(t);
  }

  JDBCUtils.closeResource(connection, ps, rs);

  // while循环结束后
  return list;
}
```

- 加上 try catch 的代码 + 测试
```java
@Test
public void testGetForList() {
  String sql = "select id, name, email, birth from customers where id < ?";
  List<Customer> list = getForList(Customer.class, sql, 12);

  // lamda表达式
  list.forEach(System.out :: println);
}

public <T> List<T> getForList(Class<T> clazz, String sql, Object ...args) {
  Connection connection = null;
  PreparedStatement ps = null;
  ResultSet rs = null;
  ArrayList<T> list = null;

  try {
    // 获取连接
    connection = JDBCUtils.getConnection();
    // 预编译sql
    ps = connection.prepareStatement(sql);

    // 填充占位符
    for(int i=0; i<args.length; i++) {
      ps.setObject(i+1, args[i]);
    }

    // 执行并获取结果集
    rs = ps.executeQuery();

    // 获取列数
    ResultSetMetaData rsmd = rs.getMetaData();
    int columnCount = rsmd.getColumnCount();

    // 创建一个承装对象的结合
    list = new ArrayList<>();


    // 多条记录
    while(rs.next()) {
      // 循环中 每次都创建一个t对象
      T t = clazz.newInstance();

      // 通过 for 将t对象的所有的属性都附上值了
      for(int i=0; i<columnCount; i++) {
        String columnLabel = rsmd.getColumnLabel(i + 1);
        Object columnValue = rs.getObject(i + 1);

        Field field = clazz.getDeclaredField(columnLabel);
        field.setAccessible(true);
        field.set(t, columnValue);
      }

      // 把对象添加到集合中
      list.add(t);
    }

    // while循环结束后
    return list;

  } catch (Exception e) {
    e.printStackTrace();
  } finally {
    JDBCUtils.closeResource(connection, ps, rs);
  }

  return null;
}
```

-----------------

### 使用 PreparedStatement 解决 sql注入的问题
- 我们在上面封装sql的时候 都会使用占位符 而不是将sql语句写死
```java
// 有占位符
String sql = "select id, name, email, birth from customers where id < ?";


// 写死
String sql = "select id, name, email, birth from customers where id < 12";
```

- 占位符的使用 就是PreparedStatement才有的
- Statement没有 正因为Statement没有才会有sql注入的问题

- 那为什么 PreparedStatement 这么写不会有sql注入的问题呢？

> 原理:
- 核心点就是占位符起到了很大的作用
- PreparedStatement是预编译 就是说 当我们上面定义完sql
- 并把sql丢到里面 生成ps的时候

  String sql = "select id, name, email, birth from customers where id < ?";

  
  ps = connection.prepareStatement(sql);


- ps里面的sql就执行过了 预编译了 它会把 ? 的地方空不来 相当于挖了一个坑 但是sql语句的其它结构都是确定的 规定的 是 & 就是 & 的关系 是 | 就是 | 的关系 不会因为我们拼串传入恶意代码 就能改变这样的关系

- 所以 PreparedStatement 比 Statement 更加的安全


> 其它优点
- 1. 可以操作Blob类型的数据 比如 图片 视频 
- 因为 是一个 ? 占位符 所以我们可以拿一个流的方式去填充
<!-- 
  要是普通的sql语句 想往里面写一个流不现实
 -->

- 2. 可以实现更高效的批量插入
- Statement因为sql是写死的 没有? 所以我们要写1万条sql 并且 都有校验功能 所以也需要校验1万次

- PreparedStatement 当预编译的时候 就有校验的功能 因为结构都是固定的 只是 ？ 的部分不一样 当预编译的时候 它已经校验完了 只校验了一遍 剩下的我们就是往里丢数据就可以了 所以更加的高效