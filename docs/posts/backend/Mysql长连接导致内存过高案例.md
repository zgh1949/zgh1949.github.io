### 背景

Web应用使用 Mysql作为后端数据库，初期采用短连接

**问题：**
因用户量增加，发现数据库建立频繁导致性能瓶颈

**措施：**
采用长连接提高性能

**问题2：**
后来发现Mysql内存占用过高

---

### 分析

**原因分析：**

1. 短连接在高并发下频繁建立连接，导致数据库性能下降
2. 长连接减少了连接的创建，提高了性能
3. 长连接管理不当导致内存过高，甚至 OOM

**解决思路：**

1. 定期断开连接池的连接，防止连接运行时间过长导致不断占用内存
2. 定期执行 mysql_reset_connection刷新连接，该命令会重置连接的资源，但不用重新进行鉴权等步骤

------

### 实践

**一、定期断开连接池的连接**

使用连接池，连接池一般可以设置：

- 最大连接数
- 最小空闲连接
- 最大空闲连接
- 连接超时时间
- 连接最大存活时间

```yaml
# druid的配置
spring:  
  datasource:  
    druid:  
      url: jdbc:mysql://localhost:3306/yourdatabase?useSSL=false&serverTimezone=UTC  
      username: root  
      password: yourpassword  
      driver-class-name: com.mysql.cj.jdbc.Driver  
      initial-size: 5  
      min-idle: 5  
      max-active: 20  
      max-wait: 10000  
      filters: stat
```



**二、mysql_reset_connection[^1]**

该命令的具体作用：

- 回滚所有活动事务并重置自动提交模式。
- 释放所有表锁。
- 关闭（并删除）所有临时表。
- 将会话系统变量重新初始化为对应全局系统变量的值，包括由诸如 `SET NAMES` 之类的语句隐式设置的系统变量。
- 丢失用户定义的变量设置。
- 释放预编译语句。
- 关闭 HANDLER 变量。
- 将 `LAST_INSERT_ID()` 的值重置为 0。
- 释放通过 `GET_LOCK()` 获取的锁。

可惜的是，这个API处于底层，无法在mybatis或spring data中使用。



[^1]: https://dev.mysql.com/doc/c-api/5.7/en/mysql-reset-connection.html