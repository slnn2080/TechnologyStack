// 定义一个操作数据库的接口 同时添加数据的时候 我们要在add方法中传入数据 但是什么类型不知道 所以我们要把这个接口定义为泛型接口
interface DBI<T> {
  add(info:T):boolean;
  update(info:T, id:number):boolean;
  delete(id:number):boolean;
  get(id:number):any[];
}

// 分别定义mongodb mysql的类

// 定义一个操作mysql的类
// 注意当我们要实现一个泛型接口的时候 这个类也必须是一个泛型类
class MysqlDb<T> implements DBI<T> {
  add(info:T):boolean {
    console.log(info)
    return true
  }
  update(info:T, id:number):boolean {
    return true
  }
  delete(id:number):boolean {
    return true
  }
  get(id:number):any[] {
    return []
  }
}

// 给mysql的表增加数据 操作用户表
// 1 定义一个User类和数据表做映射
class User {
  username: string | undefined;   // 防止编辑器报错再给一个undefined
}

// 给用户表增加数据
let u = new User()
u.username = "sam"

// 调用MysqlDB给它的表里面增加数据 使用User类做为参数对我们传入的参数进行验证
let oMysql = new MysqlDb<User>() 
oMysql.add(u)
