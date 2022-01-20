"use strict";
// 分别定义mongodb mysql的类
// 定义一个操作mysql的类
// 注意当我们要实现一个泛型接口的时候 这个类也必须是一个泛型类
var MysqlDb = /** @class */ (function () {
    function MysqlDb() {
    }
    MysqlDb.prototype.add = function (info) {
        console.log(info);
        return true;
    };
    MysqlDb.prototype.update = function (info, id) {
        return true;
    };
    MysqlDb.prototype.delete = function (id) {
        return true;
    };
    MysqlDb.prototype.get = function (id) {
        return [];
    };
    return MysqlDb;
}());
// 给mysql的表增加数据 操作用户表
// 1 定义一个User类和数据表做映射
var User = /** @class */ (function () {
    function User() {
    }
    return User;
}());
// 给用户表增加数据
var u = new User();
u.username = "sam";
// 调用MysqlDB给它的表里面增加数据 使用User类做为参数对我们传入的参数进行验证
var oMysql = new MysqlDb();
oMysql.add(u);
