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


> 进入mysql界面的命令
> source d:\mysqldb.sql(文件的全路径名)
- 数据导入指令
- 在命令行客户端登录mysql，使用source指令导入

- desc employees;


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
> 基本规则:
- 1. SQL 可以写在一行或者多行。为了提高可读性，各子句分行写，必要时使用缩进

- 2. 每条命令以 ; 或 \g 或 \G 结束
<!-- 
  \g or \g 会把原先成列式呈现的字段信息 转成 成行呈现
 -->

- 3. 关键字不能被缩写也不能分行
- 4. 关于标点符号
  - 必须保证所有的()、单引号、双引号是成对结束的
  - 必须使用英文状态下的半角输入方式

  - *字符串型和日期时间类型的数据可以使用单引号（' '）表示*

  - *列的别名，尽量使用双引号（" "），而且不建议省略as*


> SQL大小写规范 （建议遵守）
- MySQL 在 Windows 环境下是*不区分大小写的*
- MySQL 在 Linux 环境下是*区分大小写的*

  - Linux系统下区分大小写的结构:
  - 数据库名、表名、表的别名、变量名是严格区分大小写的

  - 关键字、函数名、列名(或字段名)、列的别名(字段的别名) 是忽略大小写的。

- *推荐采用统一的书写规范:*
  - 数据库名、表名、表别名、字段名、字段别名等都小写
  - *SQL关键字、函数名、绑定变量等都大写*


> 注释
- 可以使用如下格式的注释结构

- 单行注释：
  #注释文字 (MySQL特有的方式)

- 单行注释：
  -- 注释文字 (--后面必须包含一个空格。)

- 多行注释：
  /* 注释文字 */


> 命名规则 （暂时了解）
- 数据库、表名不得超过30个字符，变量名限制为29个

- 必须只能包含 A–Z, a–z, 0–9, _共63个字符

- 数据库名、表名、字段名等对象名中间不要包含空格

- 同一个MySQL软件中，数据库不能同名；
- 同一个库中，表不能重名；同一个表中，字段不能重名

- 必须保证你的字段没有和保留字、数据库系统或常用方法冲突。如果坚持使用，请在SQL语句中使用``（着重号）引起来

- 保持字段名和类型的一致性，在命名字段并为其指定数据类型的时候一定要保证一致性。假如数据类型在一个表里是整数，那在另一个表里可就别变成字符型了

```sql
-- 以下两句是一样的，不区分大小写
show databases;
SHOW DATABASES;

-- 创建表格
-- 表名错误，因为表名有空格
create table student info(...); 
create table student_info(...); 

-- 其中order使用``飘号，因为order和系统关键字或系统函数名等预定义标识符重名了
CREATE TABLE `order`(
    id INT,
    lname VARCHAR(20)
);

-- 起别名时，as都可以省略
select id as "编号", `name` as "姓名" from t_stu; 

-- 如果字段别名中没有空格，那么可以省略""
select id as 编号, `name` as 姓名 from t_stu; 

-- 错误，如果字段别名中有空格，那么不能省略
select id as 编 号, `name` as 姓 名 from t_stu; ""
```

------------------

### 基本的SELECT语句

> 关键字: DUAL 
- 伪表


- 我们的select查询语句的结构为:
- select ...(结构1) from ...(结构2)

> 情况1:
- 我们没有写结构2的部分
- select ...

```sql
select 1 + 1;
select 3 * 2;
```

> 情况2:
- 如果我们没有具体的表要查询 但是还想保持select语句的结构
- 那我们可以使用 *DUAL* 关键字还充当结构2的部分

```sql
select 1 + 1 from dual;
```


> 关键字: *
- 表示表中的所有字段(所有的列)


> SELECT 字段1, 字段2 FROM 表名
- 多个字段之间使用 , 来分隔

------------------

### 列的别名
- 给列的名字起一个别名 支持汉字
- 给列起别名一共有3种方式

> 1. 字段 AS 别名
- 修改后 结果集中的列名就会呈现别名
- as: alias别名的意思 AS可以省略

> 2. 字段 别名
- 字段和别名之间 只用空格

> 3. 字段 "别名"
- 别名使用一段双引号引起来 当要起的别名有奇怪的符号或者空格的时候 使用""包起来 *不要使用''*

```sql
SELECT employee_id AS emp_id, salary FROM employees;

-- 省略别名的方法 AS用空格代替
SELECT employee_id emp_id, salary FROM employees;

-- 省略别名的方法 别名加上双引号
SELECT employee_id "emp_id", salary FROM employees;
```

------------------

### 去重重复行
- 当我们查询一个表的时候 默认情况下，查询会返回全部行，包括重复行。

- 比如我们有一种场景 我们想知道员工表中的员工所在 都有哪些部门

- 我们发现 107个员工所在的部分都列出来了 但是有很多员工都在同一个部门

- 而我们的诉求就是想知道公司有多少个部分 不需要这些重复的部分

```sql
null  -- 有的员工没有部门
10
20
20
30
30
30
30
```

- 所以这时候我们想将重复的数据只留一条就可以了

> 关键字 DISTINCT
- 去除重复行
```sql
SELECT DISTINCT department_id
FROM employees;

-- 报错 员工一共107人 工资的列就是107 去重后的部分id是12 结构有逻辑性的问题
SELECT salary, DISTINCT department_id
FROM employees;

-- 仅仅是没有报错 但是没有实际的意义
SELECT DISTINCT department_id, salary
FROM employees;
```

**注意:**
- 1. DISTINCT *需要放到所有列名的前面*，如果写成`SELECT salary, DISTINCT department_id FROM employees`会报错。

- 2. DISTINCT 其实是对后面所有列名的组合进行去重，你能看到最后的结果是 74 条，因为这 74 个部门id不同，都有 salary 这个属性值。

- 如果你想要看都有哪些不同的部门（department_id），只需要写`DISTINCT department_id`即可，后面不需要再加其他的列名了。

------------------

### 空值参与运算
- 什么是空值:
- 如果一个字段是null 它就代表空值的意思
- null不等同于0, '' 'null'

> 字段中的值是可以参数运算的
- 目前自己总结 当字段中的数据是可以被计算的时候 是可以参与运算的
```sql
-- 计算该员工的年收入
SELECT last_name "员工姓名", salary * 12 "员工薪资"
FROM employees;
```


> null参与运算
- 所有运算符或列值遇到null值，*运算的结果都为null*


**注意:**
- 这里你一定要注意，在 MySQL 里面， 空值不等于空字符串。
- 一个空字符串的长度是0，而一个空值的长度是空。
- 而且，在 MySQL 里面，空值是占用空间的。

------------------

### 着重号 ``
- 作用:
- 当我们的表名 字段名和保留字 关键字重名的时候 我们在使用的时候要用``将重名的表名或者字段名包起来

- 比如我们有一个order表 但是order在mysql中是关键字
- 当我们查询这个表的时候 会报错
```sql
-- 这里因为表order和关键字ORDER重名 所以使用着重号
SELECT * FROM `order`
```

------------------

### 查询常数
- 就是在 SELECT 查询结果中增加一列固定的常数列。这列的取值是我们指定的，而不是从数据表中动态取出的。


- 我们在查询某一张表的时候 会使用如下命令
- select * from employees;

- 这样会把employees表中的所有字段全部的查询出来

- 我们还可以手动的加入 employees表中没有的字段
```sql
SELECT '尚硅谷', last_name, employee_id 
FROM employees;
```

- 我们自己添加的字段 会在每一条记录的前面都添加上 这就是 查询常数

- 比如我们表中的每一条记录前面都要加上尚硅谷 但是该字段又没有在表的结构里面 我们就可以使用常数来表示

------------------

### 显示表结构

> DESCRIBE 表
> DESC 表
- 显示创建该表时候的 表中字段的详细信息
- 每一个字段都会在结果表中有详细的体现 比如我们想查看该表中有什么样的字段的时候 什么类型 就可以用这个命令

- type:
  该字段对应的数据类型

- null
  该字段是否可以取值为null

- key
  刻画约束的

- default
  默认值

```sql
field       type    null    key   default   extra
employee_id	int   	NO	    PRI	    0
first_name	varchar
            (20)	  YES	

last_name	  varchar
            (25)	  NO		
```
------------------

### 过滤数据 WHERE
- 我们在查询一个表的结构的时候 可以查询指定的字段 但也是查询的表中所有的记录

- 现在我只想查询满足某些条件的数据 不是所有的数据 相当于我们想将员工表中的107条数据过滤下 看看哪些是满足的 然后再把这些数据返回来 这样的诉求就是过滤数据


> WHERE 条件
- 将要过滤的条件写在 where关键字的后面

- 要求:
- WHERE一定要声明在FROM结构的后面 紧挨着FROM *基友*
- 即使有别的关键字和不能插在 FROM WHERE 的中间

- 需求:
- 查询90号员工部门的信息
```sql
SELECT * 
FROM employees 
WHERE department_id = 90;
```

- 需求:
- 查询last_name为'king'的员工信息
```sql
SELECT * 
FROM employees 
WHERE last_name = 'King'; -- 字符串要用 '' 包起来
```


> 练习
- 1.查询员工12个月的工资总和，并起别名为ANNUAL SALARY 
```sql
-- 别名要使用 " "
SELECT employee_id, last_name, salary * 12 "ANNUAL SALARY" 
FROM employees;
```

- 2.查询employees表中去除重复的job_id以后的数据
```sql
SELECT DISTINCT job_id FROM employees;
```

- 3.查询工资大于12000的员工姓名和工资
```sql
SELECT last_name, salary 
FROM employees 
WHERE salary > 12000;
```

- 4.查询员工号为176的员工的姓名和部门号
```sql
SELECT last_name, department_id 
FROM employees 
WHERE employee_id = 176;
```

- 5.显示表 departments 的结构，并查询其中的全部数据
```sql
DESC departments;
SELECT * FROM departments;
```

------------------

### 运算符

> 算术运算符
- 算术运算符主要用于数学运算，其可以连接运算符前后的两个数值或表达式，对数值或表达式进行运算
  加（+）
  减（-）
  乘（*）
  除（/)  除了/ 还可以使用 *div* 来表示
  取模（%）除了% 还可以使用 *mod* 来表示

- 主要针对于数值类型的变量或常量来进行运算

- 加减的示例:
```sql
SELECT 100, 100 + 0, 100 - 0, 100 + 50, 100 + 50 -30, 100 + 35.5, 100 - 35.5 FROM dual;
```

**注意:**
- 在sql中 + 没有连接的作用 就表示加法运算
 ```sql
 SELECT 100 + '1' 
 FROM DUAL;
```

- 上面的结果不是 1001 而是*会将字符串转成数值* 再参与运算
- 隐式转换

 ```sql
 SELECT 100 + 'a' 
 FROM DUAL;
```

- 上面的结果不是 nan 而是100 *当遇到不能正常转换的时候* 会将其*转成0* 然后参与运算
- 如果遇到非数值类型，先尝试转成数值，如果转失败，就按0计算。

- null参与运算 结果就为null


> 加减结论:
- 1. 一个整数类型的值对整数进行加法和减法操作，结果还是一个整数；

- 2. 一个整数类型的值对浮点数进行加法和减法操作，结果是一个浮点数；

- 3. 加法和减法的优先级相同，进行先加后减操作与进行先减后加操作的结果是一样的；

- 4. 在Java中，+的左右两边如果有字符串，那么表示字符串的拼接。但是在MySQL中+只表示数值相加。如果遇到非数值类型，先尝试转成数值，如果转失败，就按0计算。*补充：MySQL中字符串拼接要使用字符串函数CONCAT()实现*


- 乘除的示例:
```sql
SELECT 100, 100 * 1, 100 * 1.0, 100 / 1.0, 100 / 2,100 + 2 * 5 / 2,100 /3, 100 DIV 0 FROM dual;
```

- 我们发现 100 div 2 的时候 结果是50.0000
- 在sql中 除法默认是除不尽的 所以会保留小数位 也就是*除法结果是就浮点型*

- 我们发现 100 div 0 的时候 结果是null 注意下
- 分母不能为0 结果会是null


> 乘除结论:
- 1. 一个数乘以整数1和除以整数1后仍得原数；

- 2. 一个数乘以浮点数1和除以浮点数1后变成浮点数，数值与原数相等；

- 3. 一个数除以整数后，不管是否能除尽，结果都为一个浮点数；

- 4. 一个数除以另一个数，除不尽时，结果为一个浮点数，*并保留到小数点后4位；*

- 5. 乘法和除法的优先级相同，进行先乘后除操作与先除后乘操作，得出的结果相同。

- 6. 在数学运算中，0不能用作除数，在MySQL中，一个数除以0为NULL。


> 取模结论:
- 结果的符号与被模数的符号相同 跟模数没有关系
- 被模数 % 模数


- 需求:
- 查询员工id为偶数的员工信息
```sql
SELECT * 
FROM employees 
WHERE employee_id % 2 = 0;
```

------------------

### 比较运算符
- 比较运算符用来对表达式左边的操作数和右边的操作数进行比较，比较的结果：
  - 1. 结果为真则返回1，
  - 2. 结果为假则返回0，
  - 3. 其他情况则返回NULL。

- 比较运算符经常被用来作为SELECT查询语句的条件来使用，返回符合条件的结果记录。


> = 
- 在sql中 = 就是等于 跟小学学的是一样的 没有赋值的意思
```sql
1 = 2;       -- 0
1 != 2;      -- 1
1 = '1';     -- 1   隐式转换
1 = 'a';     -- 0 

0 = 'a'      -- 1
-- 字符串存在隐式转换 如果转换数值不成功 则是0

'a' = 'a'    -- 1
'a' = 'b'    -- 0
-- 等号两边的值都是字符串 则按照字符串的ANSI编码进行比较

NULL = NULL
-- 主要有null参与判断 结果就为null
```

- 比如下面的 我们想查询 值为NULL的结果
```sql
SELECT last_name, salary 
FROM employees 
WHERE salary = 6000;
-- 这时候程序执行的过程是: 有一个指针会一条一条的获取表中的每一条记录

-- 第一条记录 取出该记录的salary 拿出来跟6000进行比较 结果不相等返回0 当结果为0的时候该数据就不要了

-- 当比较的结果为1的时候 该数据会保留 然后查询结果就是0 和 1 然后会返回所有为1的数据



SELECT last_name, salary 
FROM employees 
WHERE commission_pct = NULL;
-- 结果是一条数据都没有
-- 指针会取出每一条记录中的commission_pct字段对应的值 去跟null比较 但是只要跟null比较结果都是null

-- 所以不会有任何结果
```

> <=>  为NULL而生
- 安全等于
- 安全等于就是为了解决跟NULL比较的问题:
- 安全等于运算符（<=>）与等于运算符（=）的作用是相似的，`唯一的区别`是‘<=>’*可以用来对NULL进行判断*。

- 在*两个操作数均为NULL*时，其*返回值为1*，而不为NULL；
- 当*一个操作数为NULL*时，其*返回值为0*，而不为NULL。

```sql
1 <=> NULL;      -- 0
NULL <=> NULL;   -- 1


SELECT last_name, salary 
FROM employees 
WHERE commission_pct <=> NULL;
```


> <> or !=
- 不等于


> < > <= >=
- 只要符号的左右两边 有NULL的参与 结果就是NULL

---

> 非符号运算符

> IS NULL
- 为空运算符
- 判断值 字符串 或 表达式 是否为空
```sql
SELECT B FROM employees WHERE A IS NULL;


-- 查询奖金系数为NULL的
SELECT last_name, salary, commission_pct
FROM employees
WHERE commission_pct IS NULL;
```

> IS NOTNULL
- 不为空运算符
- 判断值 字符串 或 表达式 是否不为空
```sql
SELECT B FROM employees WHERE A IS NOT NULL;


SELECT last_name, salary, commission_pct
FROM employees
WHERE commission_pct IS NOT NULL;
```

> ISNULL(字段)
- 为空运算符 它相当于一个函数了
- 判断一个值 字符串 或 表达式 是否为空 
```sql
SELECT B FROM employees WHERE A ISNULL(字段);


SELECT last_name, salary, commission_pct
FROM employees
WHERE ISNULL(commission_pct);
```

---

> LEATS
- 最小值运算符
- 在多个值中返回最小值
```sql
SELECT B FROM employees WHERE C LEAST(A,B);


SELECT LEAST('a','b','g'), GREATEST('g','t','m')
FROM DUAL;
-- a 和 t
```

> GREATEST
- 最大值运算符
- 在多个值中返回最大值
```sql
SELECT B FROM employees WHERE C GREATEST(A,B);
```

---

> 字段 BETWEEN 条件1 AND 条件2
- 两值之间的运算符
- 查询条件1和条件2范围内的数据 包含边界
- 判断一个值是否在两个值之间 包括 条件1 和 条件2
```sql
SELECT B FROM employees WHERE C BETWEEN A AND B;

-- 查询工资在6000-8000之间的员工信息
SELECT employee_id, last_name, salary
FROM employees
WHERE salary BETWEEN 6000 AND 8000;
```

**注意:**
- 条件1为下限
- 条件2位上限
- 条件1 和 条件2 的位置不能交换

---

> IN (set)
- 属于运算符  在 一个集合中吗？
- 判断一个值是否为列表中的任意一个值
```sql
SELECT B FROM employees WHERE C IN (A,B);


SELECT last_name, department_id
FROM employees
WHERE department_id IN (10, 20, 30);


-- 不能这么写 20 30 非0就是1 所以全部给找出来了
WHERE department_id = 10 OR 20 OR 30;
-- 我们要将OR前后的条件写完整
WHERE department_id = 10 OR department_id = 20 OR department_id =  30;
```

> NOT IN (set)
- 不属于运算符  不在 一个集合中吗？
- 判断一个值是否不是一个列表中的任意一个值
```sql
SELECT B FROM employees WHERE C NOT IN (A,B);


SELECT last_name, department_id
FROM employees
WHERE department_id NOT IN (10, 20, 30);
```

---

> LIKE 模糊条件
- 模糊匹配运算符
- 判断一个值是否符合模糊匹配规则
```sql
SELECT B FROM employees WHERE A LIKE B;

-- 查询 last_name 中包含字符'a'的员工信息
SELECT last_name 
FROM employees
WHERE last_name LIKE '%a%'


-- 查询 last_name 中包含'a' 且 'e' 的员工信息
SELECT last_name
FROM employees
WHERE last_name LIKE '%e%' AND last_name LIKE '%a%';


SELECT last_name
FROM employees
WHERE last_name LIKE '%a%e%' OR last_name LIKE '%e%a%';


-- 查询 last_name 中第二个字符是a的 员工信息
SELECT last_name
FROM employees
WHERE last_name LIKE '_a%';


-- 查询 last_name 中第二个字符是_ 第3个字符是a的 员工信息
SELECT last_name
FROM employees
WHERE last_name LIKE '_\_a%'; -- 转义了 _
```

> %:
- 代表不确定个数的字符 相当于正则里面的 * 不确定的0-多个字符
- 0个 1个 或 多个

> _
- 代表任意一个字符

> \
- 转义字符

---

> REGEXP '正则'
- 正则表达式运算符
- 判断一个值是否符合正则表达式的规则
```sql
SELECT B FROM employees WHERE A REGEXP B;
```


> RLIKE '正则'
- 正则表达式运算符
- 判断一个值是否符合正则表达式的规则
```sql
SELECT B FROM employees WHERE A RLIKE B;
```

- REGEXP运算符用来匹配字符串，


> 语法格式为： `expr REGEXP 匹配条件`。
- 如果expr满足匹配条件，返回1；
- 如果不满足，则返回0。
- 若expr或匹配条件任意一个为NULL，则结果为NULL。

- REGEXP运算符在进行匹配时，常用的有下面几种通配符：

> ^
- 匹配以该字符后面的字符开头的字符串。

> $
- 匹配以该字符前面的字符结尾的字符串。

> [...]
- 匹配在方括号内的任何字符
- “[abc]”匹配“a”或“b”或“c”
- “[a-z]”匹配任何字母
- “[0-9]”匹配任何数字

> *
- 匹配零个或多个在它前面的字符
- x*  匹配任何数量的‘x’字符，
- [0-9]*  匹配任何数量的数字

```sql
SELECT 
  'shkstart' REGEXP '^s', 
  'shkstart' REGEXP 't$', 
  'shkstart' REGEXP 'hk';
FROM DUAL;
```

------------------

### 逻辑运算符
- 逻辑运算符主要用来判断表达式的真假，
- 在MySQL中，逻辑运算符的返回结果为1、0或者NULL。

- mysql中支持4中逻辑运算符

> NOT 或 !
- 逻辑非
- 取反
```sql
NOT A

SELECT last_name, department_id 
FROM employees
-- 条件的前面加了 NOT
WHERE salary NOT BETWEEN 6000 AND 8000;
```

> AND 或 &&
- 逻辑与
- 左右变量都为真 结果就是1
- 前面要满足 后面也要满足
```sql
A AND B
A && B

--既是10号部门的员工 又是 20号部门的员工
SELECT last_name, department_id 
FROM employees
WHERE department_id = 10 AND department_id = 20;
```

> OR 或 ||
- 逻辑或
- 左右两边只要有一个是真 结果就是1
```sql
A OR B
A || B

-- 10号部门 或 20号部门 的员工
SELECT last_name, department_id 
FROM employees
WHERE department_id = 10 OR department_id = 20;
```

> XOR 追求的是不同
- 逻辑异或
- 只要左右两边的情况不一样 就是true 也就是1
```sql
A XOR B

SELECT last_name, department_id 
FROM employees
WHERE department_id = 10 OR salary > 6000;

-- 当满足部门为10的时候 工资一定是小于6000
-- 当满足工资大于6000的时候 部门肯定不为10
```


**注意:**
- OR 可以和 AND 一起使用，但是在使用时要注意两者的优先级，由*于AND的优先级高于OR*，因此先对AND两边的操作数进行操作，再与OR中的操作数结合。

------------------

### 位运算符
- 位运算符的左右必须是数值

- 位运算符是在二进制数上进行计算的运算符。位运算符会先将操作数变成二进制数，然后进行位运算，最后将计算结果从二进制变回十进制数。

- mysql中支持的位运算符:

> &
- 按位与(位AND)
- 只有上下都是1的时候 结果才是1 其他情况为0

- 比如:
- 1的二进制数为0001，
- 10的二进制数为1010，
- 所以 1 & 10 的结果为0000，

- 0001
- 1010
- 0000


> |
- 按位或(位OR)
- 上下只要有1结果就是1 其他情况为0

- 1的二进制数为0001，
- 10的二进制数为1010，
- 所以 1 | 10 的结果为1011，

- 0001
- 1010
- 1011


> ^ 不同为1 否则为0
- 按位异或(位XOR)
- 上下情况不同为1 情况相同为0

- 1的二进制数为0001，
- 10的二进制数为1010，
- 所以 1 ^ 10的结果为1011，

- 0001
- 1010
- 1011


```sql
SELECT 12 | 5, 12 & 5, 12 ^ 5
FROM DUAL;

13,
4,
9

12: 1100
5: 0101

12 | 5
1100
0101
1101  -- 13


12 & 5
1100
0101
0100  -- 4


12 ^ 5
1100
0101
1001  -- 9
```


> ~
- 按位取反
- 1变0 0变1

> >>
- 按位右移

> <<
- 按位左移
- 在一定范围内满足 每向左移动一位x2 
- 移动一位 是指数

- 2 << 1 -- 2^1
- 2 << 2 -- 2^2
- 2 << 3 -- 2^3

- 乘以的也是指数的结果 x2 x4 x8


> 练习
- 1. 选择工资不在5000到12000的员工的姓名和工资 
```sql
SELECT last_name, salary
FROM employees
WHERE salary NOT BETWEEN 5000 AND 12000;

WHERE salary < 5000 OR salary > 12000;
```


- 2. 选择在20或50号部门工作的员工姓名和部门号
```sql
SELECT last_name, department_id
FROM employees
WHERE department_id IN (20, 50);
```


- 3. 选择公司中没有管理者的员工姓名及job_id
```sql
SELECT last_name, job_id
FROM employees
WHERE manager_id IS NULL;
```


- 4. 选择公司中有奖金的员工姓名，工资和奖金级别 
```sql
SELECT last_name, salary, commission_pct
FROM employees
WHERE commission_pct IS NOT NULL;
```


- 5. 选择员工姓名的第三个字母是a的员工姓名
```sql
SELECT last_name
FROM employees
WHERE last_name LIKE '__a%';
```


- 6. 选择姓名中有字母a和k的员工姓名
```sql
SELECT last_name
FROM employees
WHERE last_name LIKE '%a%' AND last_name LIKE '%k%';
```


- 7. 显示出表 employees 表中 first_name 以 'e'结尾的员息
```sql
SELECT first_name
FROM employees
WHERE first_name LIKE '%e';
```


- 8. 显示出表 employees 部门编号在 80-100 之间的姓名
```sql
SELECT last_name, department_id
FROM employees
WHERE department_id BETWEEN 80 AND 100;
```


- 9. 显示出表 employees 的 manager_id 是 100,101,110 的员工姓名、工资、管理者id
```sql
SELECT last_name, salary, manager_id
FROM employees
WHERE manager_id IN (100, 101, 110);
```

------------------

### 排序与分页
- 我们没有指定排序操作的时候 每次查询返回的数据的顺序都是默认的

- 默认顺序:
- 我们往数据库中添加记录(数据)的顺序


> 排序数据
- 使用 ORDER BY 对查询到的数据 进行排序操作

> ORDER BY 字段 [ASC / DESC]
- 格式:
- ORDER BY 字段 没有显式指明排序的方式的话 *则默认按照升序排列*

- ORDER BY ASC: 升序
- ORDER BY DESC: 降序
<!-- 
  ascend  descend
 -->

- 注意:
- 子句在SELECT语句的*结尾*

- 需求:
- 按照salary从高到低的顺序显示员工信息
```sql
SELECT last_name, salary
FROM employees
ORDER BY salary DESC;
```

- 使用列的别名进行排序操作：
- 我们定义了一个年工资的字段 起了别名 "annual_sal"
- 然后按照别名 进行排序

```sql 
SELECT last_name, salary, salary * 12 "annual_sal"
FROM employees
ORDER BY annual_sal;
```

**注意:**
- 列的别名只能在order by中使用 不能在where中使用 因为在where语句执行的时候还没有起别名呢 

- sql语句的执行顺序如下:
- sql语句在执行的时候不是按照 从上到下的顺序走的
- 而是先从 from 开始走
- 然后再从 where 开始走 看看有什么过滤条件
- 然后再看 select 后面想要查什么 这个阶段才会起别名
- 最后才会执行 order by

- where需要声明在from后order之前
- *from* where *order by*


```sql
SELECT last_name, salary, salary * 12 "annual_sal"
FROM employees
WHERE department_id IN (50, 60, 70, 80)
ORDER BY annual_sal DESC;
```


> 二级排序
> ORDER BY 字段 规则, 字段 规则
- 1. ASC 可以省略
- 2. 多级排序 使用,分开

- 需求:
- 显示员工信息 按照 department_id 的降序排序 然后按照 salary的升序排列
```sql
 SELECT employee_id, salary, department_id
 FROM employees
 ORDER BY department_id DESC, salary ASC;
```

**注意:**
- 在对多列进行排序的时候，首先排序的第一列必须有相同的列值，才会对第二列进行排序。如果第一列数据中所有值都是唯一的，将不再对第二列进行排序。

------------------

### 

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