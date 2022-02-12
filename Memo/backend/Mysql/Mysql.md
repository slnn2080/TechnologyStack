### 给文件夹修改读写权限
- sudo chmod -R a+rwx /usr/local/mysql/data 

- https://www.jianshu.com/p/3a4e245d43b1

### 数据库的root密码
- qwer6666


### 概述
- 版本: 
- 针对Mysql8.0.26版本讲解

- 特性:
- 融合几乎所有的语法 调忧 底层新特性

> 为什么要使用数据库
- 持久化(persistence)：**把数据保存到可掉电式存储设备中以供之后使用**。(内存中存储数据不靠谱)
<!-- 
  大多数情况下，特别是企业级应用，**数据持久化意味着将内存中的数据保存到硬盘上加以”固化”**，
  
  而持久化的实现过程大多通过各种关系数据库来完成。
-->

- 持久化的主要作用是**将内存中的数据存储在关系型数据库中**，当然也可以存储在磁盘文件、XML数据文件中。 


> 数据库的相关概念
> 数据库(Datebase)
- 即存储数据的“仓库”，其本质是一个文件系统。它保存了一系列有组织的数据。


> DBMS：数据库管理系统（Database Management System）
- 是一种操纵和管理数据库的大型软件，用于建立、使用和维护数据库，对数据库进行统一管理和控制。用户通过数据库管理系统访问数据库中表内的数据。 

- 比如: Mysql 它是一个软件层面的概念
- mysql是数据库的管理软件 通过这个软件来操作具体的数据库
<!-- 
  比如 xxx.doc 就相当于数据库

  而我们是通过 word软件来操作.doc文件 word软件就相当于mysql
 -->


> SQL：结构化查询语言（Structured Query Language）
- 专门用来与数据库通信的语言。


> 常见的数据库管理系统排名(DBMS)
- 目前互联网上常见的数据库管理软件有Oracle、MySQL、MS SQL Server、DB2、PostgreSQL、Access、Sybase、Informix这几种。以下是2021年**DB-Engines Ranking** 对各数据库受欢迎程度进行调查后的统计结果：

- 查看数据库最新排名:
- https://db-engines.com/en/ranking



> 常见的数据库介绍

**Oracle**
- 1979 年，Oracle 2 诞生，它是第一个商用的 RDBMS（关系型数据库管理系统）。随着 Oracle 软件的名气越来越大，公司也改名叫 Oracle 公司。

- 2007年，总计85亿美金收购BEA Systems。

- 2009年，总计74亿美金收购SUN。此前的2008年，SUN以10亿美金收购MySQL。意味着Oracle 同时拥有了 MySQL 的管理权，至此 Oracle 在数据库领域中成为绝对的领导者。

- 2013年，甲骨文超越IBM，成为继Microsoft后全球第二大软件公司。

- 如今 Oracle 的年收入达到了 400 亿美金，足以证明商用（收费）数据库软件的价值。


**SQL Server**
- SQL Server 是*微软开发*的大型商业数据库，诞生于 1989 年。C#、.net等语言常使用，与WinNT完全集成，也可以很好地与Microsoft BackOffice产品集成。


**DB2**
- IBM公司的数据库产品, 收费的。常应用在银行系统中。


**PostgreSQL**
- PostgreSQL 的稳定性极强，最符合SQL标准，开放源码，具备商业级DBMS质量。PG对数据量大的文本以及SQL处理较快。


**SyBase**
- 已经淡出历史舞台。提供了一个非常专业数据建模的工具PowerDesigner。 


**SQLite**
- 嵌入式的小型数据库，应用在手机端。 零配置，SQlite3不用安装，不用配置，不用启动，关闭或者配置数据库实例。当系统崩溃后不用做任何恢复操作，再下次使用数据库的时候自动恢复。


**informix**
- IBM公司出品，取自Information 和Unix的结合，它是第一个被移植到Linux上的商业数据库产品。仅运行于unix/linux平台，命令行操作。 性能较高，支持集群，适应于安全性要求极高的系统，尤其是银行，证券系统的应用。  


> Mysql介绍
- MySQL是一个`开放源代码的关系型数据库管理系统`，由瑞典MySQL AB（创始人Michael Widenius）公司1995年开发，迅速成为开源数据库的 No.1。

- 2008被`Sun`收购（10亿美金），2009年Sun被`Oracle`收购。`MariaDB`应运而生。（MySQL 的创造者担心 MySQL 有闭源的风险，因此创建了 MySQL 的分支项目 MariaDB）

- MySQL6.x 版本之后分为`社区版`和`商业版`。

- MySQL是一种关联数据库管理系统，将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。
- MySQL是开源的，所以你不需要支付额外的费用。

- MySQL是可以定制的，采用了`GPL（GNU General Public License）`协议，你可以修改源码来开发自己的MySQL系统。

- MySQL支持大型的数据库。可以处理拥有上千万条记录的大型数据库。

- MySQL支持大型数据库，支持5000万条记录的数据仓库，32位系统表文件最大可支持`4GB`，64位系统支持最大的表文件为`8TB`。

- MySQL使用`标准的SQL数据语言`形式。

- MySQL可以允许运行于多个系统上，并且支持多种语言。这些编程语言包括C、C++、Python、Java、Perl、PHP和Ruby等。


> 关于MySQL 8.0
- `MySQL从5.7版本直接跳跃发布了8.0版本`，可见这是一个令人兴奋的里程碑版本。MySQL 8版本在功能上做了显著的改进与增强，开发者对MySQL的源代码进行了重构，最突出的一点是多MySQL Optimizer优化器进行了改进。不仅在速度上得到了改善，还为用户带来了更好的性能和更棒的体验。
<!-- 
  我们主要看看 5.7 和 8.0 版本
 -->


> Why choose MySQL?
- 为什么如此多的厂商要选用MySQL？大概总结的原因主要有以下几点：	

- 1. 开放源代码，使用成本低。
- 2. 性能卓越，服务稳定。
- 3. 软件体积小，使用简单，并且易于维护。
- 4. 历史悠久，社区用户非常活跃，遇到问题可以寻求帮助。
- 5. 许多互联网公司在用，经过了时间的验证。


> Oracle vs MySQL
- Oracle 更适合大型跨国企业的使用，因为他们对费用不敏感，但是对性能要求以及安全性有更高的要求。

- MySQL 由于其**体积小、速度快、总体拥有成本低，可处理上千万条记录的大型数据库，尤其是开放源码这一特点，使得很多互联网公司、中小型网站选择了MySQL作为网站数据库**（Facebook，Twitter，YouTube，阿里巴巴/蚂蚁金服，去哪儿，美团外卖，腾讯）。

------------------

### RDBMS 与 非RDBMS
- 关系型数据库 和 非关系型数据库
- 从排名中我们能看出来，关系型数据库绝对是 DBMS 的主流，其中使用最多的 DBMS 分别是 Oracle、MySQL 和 SQL Server。这些都是关系型数据库（RDBMS）。

<!-- 
  非关系型数据库
  MongoDB 是基于文档的
  Redis   是基于key value
 -->

> 关系型数据库(RDBMS)

> 关系型数据库的本质
- 这种类型的数据库是`最古老`的数据库类型，关系型数据库模型是把复杂的数据结构归结为简单的`二元关系`（即二维表格形式）。
<!--  
  想想excel表格的形式
 -->

- 关系型数据库以`行(row)`和`列(column)`的形式存储数据，以便于用户理解。这一系列的行和列被称为`表(table)`

- *一组表组成了一个库(database)*。
<!-- 很多张table合在一起就构成了一个库(database) -->


- 表与表之间的数据记录有关系(relationship)。现实世界中的各种实体以及实体之间的各种联系均用`关系模型`来表示。关系型数据库，就是建立在`关系模型`基础上的数据库。

- SQL 就是关系型数据库的查询语言。


> 优势
- **复杂查询**
  可以用SQL语句方便的在一个表以及多个表之间做非常复杂的数据查询。

- **事务支持**
  使得对于安全性能很高的数据访问要求得以实现。

---

> 非关系型数据库(非RDBMS)
- 介绍:
- **非关系型数据库**，可看成传统关系型数据库的功能`阉割版本`，基于键值对存储数据，不需要经过SQL层的解析，`性能非常高`。同时，通过减少不常用的功能，进一步提高性能。

- 目前基本上大部分主流的非关系型数据库都是免费的。


> 有哪些非关系型数据库
- 相比于 SQL，NoSQL 泛指非关系型数据库，包括了榜单上的键值型数据库、文档型数据库、搜索引擎和列存储等，除此以外还包括图形数据库。也只有用 NoSQL 一词才能将这些技术囊括进来。


**键值型数据库 Redis**
- 键值型数据库通过 Key-Value 键值的方式来存储数据，其中 Key 和 Value 可以是简单的对象，也可以是复杂的对象。Key 作为唯一的标识符，优点是查找速度快，在这方面明显优于关系型数据库，缺点是无法像关系型数据库一样使用条件过滤（比如 WHERE），如果你不知道去哪里找数据，就要遍历所有的键，这就会消耗大量的计算。

- 键值型数据库典型的使用场景是作为`内存缓存`。`Redis `是最流行的键值型数据库。


**文档型数据库 MongoDB**
- 此类数据库可存放并获取文档，可以是XML、JSON等格式。在数据库中文档作为处理信息的基本单位，一个文档就相当于一条记录。文档数据库所存放的文档，就相当于键值数据库所存放的“值”。MongoDB 是最流行的文档型数据库。此外，还有CouchDB等。


**搜索引擎数据库**
- 虽然关系型数据库采用了索引提升检索效率，但是针对全文索引效率却较低。搜索引擎数据库是应用在搜索引擎领域的数据存储形式，由于搜索引擎会爬取大量的数据，并以特定的格式进行存储，这样在检索的时候才能保证性能最优。核心原理是“倒排索引”。

典型产品：Solr、*Elasticsearch*、Splunk 等。


**列式数据库**
列式数据库是相对于行式存储的数据库，Oracle、MySQL、SQL Server 等数据库都是采用的行式存储（Row-based），而列式数据库是将数据按照列存储到数据库中，这样做的好处是可以大量降低系统的 I/O，适合于分布式文件系统，不足在于功能相对有限。典型产品：*HBase*等。


**图形数据库**
- 图形数据库，利用了图这种数据结构存储了实体（对象）之间的关系。图形数据库最典型的例子就是社交网络中人与人的关系，数据模型主要是以节点和边（关系）来实现，特点在于能高效地解决复杂的关系问题。

- 图形数据库顾名思义，就是一种存储图形关系的数据库。它利用了图这种数据结构存储了实体（对象）之间的关系。关系型数据用于存储明确关系的数据，但对于复杂关系的数据存储却有些力不从心。如社交网络中人物之间的关系，如果用关系型数据库则非常复杂，用图形数据库将非常简单。典型产品：Neo4J、InfoGrid等。


> NoSQL的演变
- 由于 SQL 一直称霸 DBMS，因此许多人在思考是否有一种数据库技术能远离 SQL，于是 NoSQL 诞生了，但是随着发展却发现越来越离不开 SQL。到目前为止 NoSQL 阵营中的 DBMS 都会有实现类似 SQL 的功能。下面是“NoSQL”这个名词在不同时期的诠释，从这些释义的变化中可以看出 `NoSQL 功能的演变`：

- NoSQL 对 SQL 做出了很好的补充，比如实际开发中，有很多业务需求，其实并不需要完整的关系型数据库功能，非关系型数据库的功能就足够使用了。这种情况下，使用`性能更高`、`成本更低`的非关系型数据库当然是更明智的选择。比如：日志收集、排行榜、定时器等。

- NoSQL 的分类很多，即便如此，在 DBMS 排名中，还是 SQL 阵营的比重更大，影响力前 5 的 DBMS 中有 4 个是关系型数据库，而排名前 20 的 DBMS 中也有 12 个是关系型数据库。所以说，掌握 SQL 是非常有必要的。整套课程将围绕 SQL 展开。

------------------

### 关系型数据库设计规则
- 关系型数据库的典型数据结构就是`数据表`，这些数据表的组成都是结构化的（Structured）。

- 将数据放到表中，表再放到库中。
<!-- 
  一个库就相当于 一个文件夹
  一个表就相当于 文件夹中的一个文件
 -->

- 一个数据库中可以有多个表，每个表都有一个名字，用来标识自己。表名具有唯一性。

- *表具有一些特性*，这些特性定义了数据在表中如何存储，*类似Java*和Python中 *“类”的设计*。


> 表、记录、字段
- ORM思想: 对象关系映射 ORM的体现如下：
- 数据库中的一个表 相当于 java中的一个类 一一对应
- 表中的一条数据 相当于 java中的一个对象(或实体)
- 表中的一个列 相当于 java中的类中的一个字段(field 属性)

<!-- 
    字段    学号    姓名    年龄    性别   属性
    记录    1001   sam     20     男    实体 对象
           1002   erin    20     女
           1003   nn      5      女
 -->

- E-R（entity-relationship，实体-联系）模型中有三个主要概念是：`实体集`、`属性`、`联系集`。

- 一个实体集（java中的class）对应于数据库中的一个表（table），

- 一个实体（instance java中的对象）则对应于数据库表中的一行（row），也称为一条记录（record）。

- 一个属性（attribute）对应于数据库表中的一列（column），也称为一个字段（field）。


> 表的关联关系
- 表跟表之间是怎么刻画的？
- 表中的一条记录 和 另外一张表中的一条记录的关系

- 表与表之间的数据记录有关系(relationship)。现实世界中的各种实体以及实体之间的各种联系均用关系模型来表示。

- 四种：
- 1. 一对一关联 -- 一夫一妻制
- 2. 一对多关联 -- 一父对多子
- 3. 多对多关联 -- 社交网络
- 4. 自我引用


> 一对一关联（one-to-one）
- one理解为表中的一条记录
- 表A中的一条记录 对应 表B中的一条记录

- 在实际的开发中应用不多，因为一对一可以创建成一张表。

- 举例：
- 设计`学生表`：学号、姓名、手机号码、班级、系别、身份证号码、家庭住址、籍贯、紧急联系人、...
- 将上述的学生表拆为两个表：
  一个表放学生的常用信息
  另一个表放学生的不常用的信息

- 这时候基础信息表和一条记录 和 档案信息表的一条记录 就是一一对应的关系
<!-- 
  基础信息表: 1001
  档案信息表: 1001

  两个表都是张三的信息
 -->

  - `基础信息表`（常用信息）：
    学号、姓名、手机号码、班级、系别

  - `档案信息表`（不常用信息）：
    学号、身份证号码、家庭住址、籍贯、紧急联系人、...

- 一对一的关系 为什么不将两张表合成一张表呢？
- 设计成一张表 sql语句可能会简洁一些 但是也有弊端 比如一个表中有很多很多字段 但有些字段不是那么常用 常用的只有3个字段 那我们加载这个表的时候 就会有很多的冗余字段 加载的冗余字段多的情况下 占用的内存就会多 就会导致我们的io的次数就会偏多 效率就会低
<!-- 
  数据表的设计优化上
  把不常用的字段放在一个表中 把常用的字段放在一个表中
 -->


> 两种建表原则： 
- 外键唯一：
  主表的主键和从表的外键（唯一），形成主外键关系，外键唯一。 

- 外键是主键：
  主表的主键和从表的主键，形成主外键关系。


> 一对多关系（one-to-many）
- 表A中的一条记录 对应着 表B中的多条记录

- 常见实例场景：
  `客户表和订单表`，    一个客户可以有多个订单
  `分类表和商品表`，    某个大的门类下面有多种商品
  `部门表和员工表`。    一个部门中有多个员工
<!-- 
  前面的称之为 主表
  后面的称之为 从表
 -->

- 举例：
  - 员工表：
      编号(员工编号)、姓名、...、所属部门

  - 部门表：
      编号(部门编号)、名称、简介

> 一对多建表原则：
  在从表(多方)创建一个字段，字段作为外键指向主表(一方)的主键


> 多对多（many-to-many）
- 要表示多对多关系，必须创建第三个表，
- 该表通常称为`联接表`，它将多对多关系划分为两个一对多关系。将这两个表的主键都插入到第三个表中。 

<!-- 
      --------              --------
      表A                   表B
      id                    id
      x1                    y1
      x2                    y2

 
              --------------
              连接表 或 中间表

              x1          y1
              x2          y2


中间表和 表A 形成一对多的关系
中间表和 表B 形成一对多的关系
 -->

- **举例1：学生-课程**
- `学生信息表`：
    一行代表一个学生的信息（学号、姓名、手机号码、班级、系别...）
    一个学生对应这多门课
    一门课也对应着多个学生
    
- `课程信息表`：
    一行代表一个课程的信息（课程编号、授课老师、简介...）

- 也就是说`学生信息表`和`课程信息表`之间就是多对多的关系 这种多对多的关系是在 下面的`选课信息表`中体现出来的

- `选课信息表`： 中间表 连接表
    一个学生可以选多门课，一门课可以被多个学生选择

  ```
  学号     课程编号  
  1        1001
  2        1001
  1        1002
  ```


- **举例2：产品-订单**
- “订单”表和“产品”表有一种多对多的关系，这种关系是通过与“订单明细”表建立两个一对多关系来定义的。一个订单可以有多个产品，每个产品可以出现在多个订单中。
  
  - `产品表`：
      “产品”表中的每条记录表示一个产品。

  - `订单表`：
      “订单”表中的每条记录表示一个订单。

  - `订单明细表`：
      每个产品可以与“订单”表中的多条记录对应，即出现在多个订单中。一个订单可以与“产品”表中的多条记录对应，即包含多个产品。

- 一个产品对应着多个订单
- 一个订单可以有多个产品
- 那`产品表`和`订单表`就是多对多的关系 这种关系体现在`订单明细表`中


- **举例3：用户-角色**
- 多对多关系建表原则：
    需要创建第三张表，
    中间表中至少两个字段，这两个字段分别作为外键指向各自一方的主键。

------------------

### Mysql的安装
- Windows下我们安装mysql的时候 有一些结构

- 数据库管理软件的目录:
  是自己指定的目录

- 数据库的目录:
  里面的结构:
  - 1. Date文件夹 
    装数据的地方 它就是数据库 每一个文件夹就是一个数据库

  - 2. my.ini 设置数据库的配置信息

------------------

### Mysql图形化管理工具的安装
- 相当于我们安装了一个vscode
- https://xclient.info/s/navicat-premium.html#versions

------------------

### 修改数据库的编码集
- https://www.jb51.net/article/136582.htm

- 1. 关闭mysqld后台进程
- Stop MySQL Server

- 2. 修改mysql配置文件/etc/my.cnf
- sudo cp /usr/local/mysql/support-files/my-medium.cnf /etc/my.cnf
<!-- 
  在Mac OS X 中默认是没有my.cnf 文件，
  
  如果需要对MySql 进行定制，拷贝/usr/local/mysql/support-files/目录中任意一个.cnf文件粘贴到/etc目录下，
  
  并且重命名为my.cnf ，
  然后修改 my.cnf 即可进行定制了。
 -->

- support-files文件夹里面没有my-default.cnf或my.cnf文件,那么就要在/etc下新建my.cnf
  - 1. cd /etc
  - 2. sudo vim my.cnf
- 然后复制 本md最下方的东西 到新文件里面

- sudo vi /etc/my.cnf
<!-- 
  [client]部分加入：
  default-character-set=utf8

  [mysqld]部分加入：
  character-set-server=utf8
 -->

- 3. 修改完毕之后再启动mysql

- 4. 检查结果
- mysql> show variables like '%char%';

------------------

### Mysql的命令行命令

> mysql --version
- 查看mysql的版本 检查安装是否成功

> 登录后:
> select version();
- 查看版本信息

> mysql -uroot -p
- 输入用户名 和 密码 登录数据库管理软件

- 参数:
- u: 
  表示用户名 后面有没有空格都可以

- p: 
  表示密码 -p紧接密码 *不要有空格*
<!-- 
  mysql -uroot -pqwer6666
 -->

- P: 
  指定端口号 可以访问另一个mysql版本(已设置对应的端口号的版本)
- mysql -uroot -P 3306 -p

- h: 
  代表host主机 访问指定服务器下的数据库 可以写对方的ip地址
- mysql -uroot -P 3306 -h localhost -p

- 如果我们访问的就是本机和3306 -P -h可以省略

> quit
- 退出数据库软件软件

> net start mysql
- 启动mysql服务

> net stop mysql
- 停止mysql服务


> show variables like 'character_%';
- 查看当前数据库的编码集

- 当我们创建一个数据库 或 创建一个表的时候 如果我们没有显式的指定字符集 那就和默认的字符集一样了
<!-- 
  character_set_database  utf8mb4
  character_set_server    utf8mb4
 -->


> show variables like 'collation_%';
- 每种字符集都会有对应的比较规则 比如拉丁的字符集就有对应的拉丁的比较规则


--- 连接上服务器后的命令 --- 

> alter database 数据库名称 charset utf8
> alter table 表名称 charset utf8
- 修改数据库的编码集
- 注意: 这不是修改基本配置 只是针对一个数据库 或 一张表的操作


> show databases;
- 查看已有的数据库 里面有数据库服务器自带的4个database
<!-- 
  information_schema
    用来保存数据库服务器的基本信息 数据库的名称 表的名称 存储权限等

  mysql
    用来保存数据库在运行的时候的系统信息 数据库文件夹 字符集

  performance_schema
    用来存储监测mysql各种行踪指标的

  sys
    用来性能指标 用数据库管理员 或 开发人员 进行监控mysql性能的
 -->

 
> create database 数据库名称;
- 创建一个数据库


> drop database 数据库名称;
- 删除一个数据库


> use 数据库名称;
- 选择指定的数据库


> show tables;
- 查看当前数据库下的表


> create table 表名称(字段 类型, [字段 类型,])
- 创建表
- create table employee(id int, name varchar(15));


> show create table 表名;
> show create databse 数据库名;
- 查看表的信息
- 查看数据库的信息


> select * from 表名
- 查看表中的所有数据


> insert into 表名 values(对应数值)
- 向表中插入数据
- insert into employee values(1001, "sam");


**注意:**
- mysql5版本中：
- 表格的字符集是 CHARSET=latin
<!-- 
  就意味着 当我们在版本5中往表里面添加中文的话 会报错
 -->

- mysql8版本中：
- 表格的字符集是 CHARSET=utf8mb4

------------------

### SQL概述(Structured Query Language)
- 结构化查询语言
- 不同的数据库生产厂商都支持SQL语句，但都有特有内容。

- sql规范(普通话)
- mysql特有(方言)
- Oracle特有(方言)

- 大部分常见的 查询之类的语句 都是一样的 但是细小的部分还是由区别的


> SQL分类
- SQL语言*在功能上*主要分为如下3大类：
- 同时我们下面的学习也是从下面的3条主线展开的


> 1. DDL （Data Definition Languages）
- *数据定义语言*

- 这些语句定义了不同的数据库、表、视图、索引等数据库对象，还可以用来创建、删除、修改数据库和数据表的结构。


> DDL中主要的语句关键字包括: 
- DDL语句 主要是从无到有的创建数据库中的对象(表 视图 存储过程 函数 事件等等)

- create
  创建

- drop
  删除

- alter
  修改

- rename
  重命名

- truncate
  清空表中数据 表结构还在



> 2. DML（Data Manipulation Language）
- *数据操作语言*

- 用于添加、删除、更新和查询数据库记录，并检查数据完整性。
  
> DML中主要的语句关键字包括:
- 针对于一条记录的操作行为 叫做操作语言

- insert
  添加一条记录

- delete
  删除一条记录(drop是删除结构)

- update
  修改一条记录

- select
  查询操作 *SELECT是SQL语言的基础，最为重要。*



> 3. DCL（Data Control Language）
- 数据控制语言
- 用于控制我们前面的操作
- 用于定义数据库、表、字段、用户的访问权限和安全级别。

> DCL中主要的语句关键字包括:
- commit
  将修改后的结果进行提交 对数据库的修改就是永久性的了

- rollback
  撤销修改 回滚

- savepoint
  设置保存点 回滚到一个保存点上

- grant
  赋予相关的权限

- revoke
  回收相关的权限



- 因为查询语句使用的非常的频繁，所以很多人把查询语句单拎出来一类：*DQL（数据查询语言）*。

- 还有单独将`COMMIT`、`ROLLBACK` 取出来称为TCL （Transaction Control Language，事务控制语言）

------------------

### SQL语言的规则与规范

------------------

### 书签

------------------























































































### 修改数据库字符集用的文本
# Example MySQL config file for medium systems. 
#  
# This is for a system with little memory (32M - 64M) where MySQL plays  
# an important part, or systems up to 128M where MySQL is used together with  
# other programs (such as a web server)  
#  
# MySQL programs look for option files in a set of  
# locations which depend on the deployment platform.  
# You can copy this option file to one of those  
# locations. For information about these locations, see:  
# http://dev.mysql.com/doc/mysql/en/option-files.html  
#  
# In this file, you can use all long options that a program supports.  
# If you want to know which options a program supports, run the program  
# with the "--help" option.  
# The following options will be passed to all MySQL clients  
[client]
default-character-set=utf8
#password = your_password  
port = 3306  
socket = /tmp/mysql.sock  
# Here follows entries for some specific programs  
# The MySQL server  
[mysqld]
character-set-server=utf8
init_connect='SET NAMES utf8
port = 3306  
socket = /tmp/mysql.sock  
skip-external-locking  
key_buffer_size = 16M  
max_allowed_packet = 1M  
table_open_cache = 64  
sort_buffer_size = 512K  
net_buffer_length = 8K  
read_buffer_size = 256K  
read_rnd_buffer_size = 512K  
myisam_sort_buffer_size = 8M  
character-set-server=utf8  
init_connect='SET NAMES utf8' 
# Don't listen on a TCP/IP port at all. This can be a security enhancement,  
# if all processes that need to connect to mysqld run on the same host.  
# All interaction with mysqld must be made via Unix sockets or named pipes.  
# Note that using this option without enabling named pipes on Windows  
# (via the "enable-named-pipe" option) will render mysqld useless!  
#  
#skip-networking 

# Replication Master Server (default)  
# binary logging is required for replication  
log-bin=mysql-bin 

# binary logging format - mixed recommended  
binlog_format=mixed 

# required unique id between 1 and 2^32 - 1  
# defaults to 1 if master-host is not set  
# but will not function as a master if omitted  
server-id = 1 

# Replication Slave (comment out master section to use this)  
#  
# To configure this host as a replication slave, you can choose between  
# two methods :  
#  
# 1) Use the CHANGE MASTER TO command (fully described in our manual) -  
# the syntax is:  
#  
# CHANGE MASTER TO MASTER_HOST=<host>, MASTER_PORT=<port>,  
# MASTER_USER=<user>, MASTER_PASSWORD=<password> ;  
#  
# where you replace <host>, <user>, <password> by quoted strings and  
# <port> by the master's port number (3306 by default).  
#  
# Example:  
#  
# CHANGE MASTER TO MASTER_HOST='125.564.12.1', MASTER_PORT=3306,  
# MASTER_USER='joe', MASTER_PASSWORD='secret';  
#  
# OR  
#  
# 2) Set the variables below. However, in case you choose this method, then  
# start replication for the first time (even unsuccessfully, for example  
# if you mistyped the password in master-password and the slave fails to  
# connect), the slave will create a master.info file, and any later  
# change in this file to the variables' values below will be ignored and  
# overridden by the content of the master.info file, unless you shutdown  
# the slave server, delete master.info and restart the slaver server.  
# For that reason, you may want to leave the lines below untouched  
# (commented) and instead use CHANGE MASTER TO (see above)  
#  
# required unique id between 2 and 2^32 - 1  
# (and different from the master)  
# defaults to 2 if master-host is set  
# but will not function as a slave if omitted  
#server-id = 2  
#  
# The replication master for this slave - required  
#master-host = <hostname>  
#  
# The username the slave will use for authentication when connecting  
# to the master - required  
#master-user = <username>  
#  
# The password the slave will authenticate with when connecting to  
# the master - required  
#master-password = <password>  
#  
# The port the master is listening on.  
# optional - defaults to 3306  
#master-port = <port>  
#  
# binary logging - not required for slaves, but recommended  
#log-bin=mysql-bin 

# Uncomment the following if you are using InnoDB tables  
#innodb_data_home_dir = /usr/local/mysql/data  
#innodb_data_file_path = ibdata1:10M:autoextend  
#innodb_log_group_home_dir = /usr/local/mysql/data  
# You can set .._buffer_pool_size up to 50 - 80 %  
# of RAM but beware of setting memory usage too high  
#innodb_buffer_pool_size = 16M  
#innodb_additional_mem_pool_size = 2M  
# Set .._log_file_size to 25 % of buffer pool size  
#innodb_log_file_size = 5M  
#innodb_log_buffer_size = 8M  
#innodb_flush_log_at_trx_commit = 1  
#innodb_lock_wait_timeout = 50 

[mysqldump]  
quick  
max_allowed_packet = 16M 

[mysql]  
no-auto-rehash  
# Remove the next comment character if you are not familiar with SQL  
#safe-updates  
default-character-set=utf8 

[myisamchk]  
key_buffer_size = 20M  
sort_buffer_size = 20M  
read_buffer = 2M  
write_buffer = 2M 

[mysqlhotcopy]  
interactive-timeout