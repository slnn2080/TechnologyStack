### XML
- xml是可扩展的标记性语言 可扩展是指xml中的标签都不是html中定义好的标签

- 作用：
- 1. xml的主要作用是 用来保存数据 而且这些数据*具有自我描述性*
- 2. 它还可以作为项目或者模块的配置文件
<!-- 很多框架的配置文件都是xml -->

- 3. 还可以作为网络传输数据的格式(现在JSON为主)

- 数据：
- 我们有这样的数据要存储起来 
  - Student[id=1, name="华仔"]
  - Student[id=2, name="张三"]

```xml
<students>
  <student>
    <id>1</id>
    <name>华仔</name>
  </student>

  <student>
    <id>2</id>
    <name>张三</name>
  </student>
</students>
```

> XML文件的声明
- <?xml version="1.0" encoding="UTF-8" ?>
- version xml的版本 一直没有变过
- encoding 文件的编码


> 标签属性 是自定义的
- xml文件
```xml
<books>
  <!-- 自定义的标签属性 sn图书的序列号 -->
  <book sn="SN12234234">
    <name>时间简史</name>
    <author>霍金</author>
    <price>100</price>
  </book>

  <!-- 单标签 -->
  <book sn="SN12234234" name="辟邪剑法" author="林平之"/>
</books>
```


> xml语法

> 注释 和 html一样

> 标签(元素)
- 元素就是标签

> 标签的命名规范
- 1. 名称可以包含字母 数字 以及其它字符
- 2. 名称不能以字符"xml"开始
- 3. 名称不能包含空格
- 4. 标签必须都要关闭
- 5. xml对大小写敏感
- 6. 标签必须正确的嵌套
- 7. 文档必须有根元素 根元素是没有父标签的顶级元素 而且是唯一的一个才行
<!-- 
  vue template div
 -->
- 8. 标签体中的符号要转义

> 标签属性
- xml的标签属性和html的标签属性时非常类似的 属性可以提供元素的额外信息
- 在标签上可以书写属性
- 一个标签上可以书写多个属性 *每个属性的值必须使用 引号 引起来*
```xml
<books>
  <!-- 单标签 -->
  <book sn="SN12234234" name="辟邪剑法" author="林平之"/>
</book
```


> CDATA语法
- 该语法可以告诉xml解析器 CDATA里面的文本内容不需要xml解析

- 格式：
> <![CDATA[ 文本内容 ... ]]>

```xml
<author>
  <![CDATA[ <嘿嘿> ]]>
</author>
```


> xml解析技术介绍
- 我们把数据保存在xml文件当中 当打开xml文件的时候程序需要解析里面的数据

- 不管是html文件还是xml文件都是标记型语言都可以使用w3c组织制定的dom技术来解析

- xml文件也会有 *document对象*

- 早期JDK为我们提供了两种xml解析技术 DOM 和 SAX (已经过时了)
- dom解析技术是w3c组织制定的 而所有的编程语言都对这个解析技术使用了自己语言的特点进行了实现 java对dom技术也做了实现

- 第三方解析
  jdom 在 dom 基础上进行了封装
  *dom4j* 又对 jdom 进行了封装
  pull 主要用在 android手机 开发 是在跟sax非常类似都是事件机制解析xml文件

- 这个*dom4j*它是第三方的解析技术 我们需要使用第三方给我们提供好的类库才可以解析xml文件


> dom4j 解析技术
- 由于dom4j它不是 sun公司的技术 而属于第三方公司的技术 我们需要使用 dom4j 就需要到 dom4j官网下载dom4j的jar包

- https://dom4j.github.io/
- java1.4 -- 1.6.1
- java5+ -- 2.0.3
- java8+ -- 2.1.3

- 目录结构
<!-- 
  | - docs   文档 我们可以进去找 index.html quick start
  | - lib  
  | - src
 -->


> 解析步骤
- 我们将每一个book标签都解析成对应的一个book类
```xml
<books>
  <!-- 自定义的标签属性 sn图书的序列号 -->
  <book sn="SN12234234">
    <name>时间简史</name>
    <author>霍金</author>
    <price>100</price>
  </book>

  <!-- 单标签 -->
  <book sn="SN12234234" name="辟邪剑法" author="林平之"/>
</books>
```

- 1. 在项目下创建src文件夹 
- 2. src文件夹里面创建一个包 里面存放 book.java 文件

```java
public class Book {
  private String sn;
  private String name;
  private BigDecimal price;
  private String anthor;

  // 对上面的属性提供get set方法
  // 有参 无参的构造器
  // toString()
}
```

- 3. 跟src文件夹同级 创建lib 把解压后的dom4j的jar包复制进来
<!-- 
  - dom4j-1.6.1.jar
  - hamcrest-core-1.3.jar
  - junit-4.12.jar
 -->

- 4. idea中 选择我们要添加的jar包 右键 选择 add as Library...
<!-- 
  将jar包添加到类路径
 -->

- 5. 跟book.java同级 创建Dom4jTest.java
```java
  import org.dom4j.Document;
  import org.dom4j.Element;
  import org.dom4j.io.SAXReader;
  import org.junit.Test;

  // 因为是测试类 我们也要将测试类需要用到的jar包添加到类路径
  public class Dom4jTest {
    @Test
    public void test1() throws Exception {
      // 创建一个SaxReader输入流 去读取xml配置文件 生成Document对象
      SAXReader saxReader = new SAXReader();

      // 在junit测试中 相对路径时从模块名开始算
      Document document = saxReader.read("src/books.xml");

      // 有document对象说明成功
      System.out.println(document)
    }

    // 读取books.xml文件 生成book类
    @Test
    public void test2() throws Exception {
      // 1. 读取books.xml文件
      SAXReader saxReader = new SAXReader();
      Document document = saxReader.read("src/books.xml");

      // 2. 通过document对象获取根元素(books)
      Element rootElement = document.getRootElement();
        - 根元素就是books

      // 3. 通过根元素获取book标签对象
      List<Elemeenet> books = rootElement.elements("book")

      // 4. 遍历 处理每个book标签转换为book类
      for(Element book : books) {
        // book 就是每一个 <book> 可以打印一下看看
        System.out.println(book.asXML());

        // 这就得到了<name>标签对象
        Element nameElement = book.element("name")
        // getText()获取标签中的文本内容
        String nameText = nameElement.getText();

        // 获取指定标签中的内容 比上面的方法省事一点点
        String priceText = book.elementText("price");
        String authorText = book.elementText("author");

        // 获取sn属性
        String snValue = book.attributeValue();

        new Book(snValue, nameText, Double.parseDouble(priceText), authorText)
      }
    }
  }

  - 要点：
  - rootElement.element()
  - rootElement.elements()  -- 多个子元素的时候用这个
  - 上述两个方法都是通过标签名获取子元素

  - book.asXML()
  - 把标签对象 转换为标签字符串
```
