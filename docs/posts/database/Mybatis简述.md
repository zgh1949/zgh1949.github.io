## 依赖

1. spring-boot-starter-jdbc： 让spring自动根据配置处理mysql的连接、执行、事务等
2. mysql-connector-java：Java与Mysql间的驱动，使得Java操作mysql成为了可能
3. mybatis-spring-boot-starter: 让spring自动根据配置处理mybatis

```xml
 <!-- 实现对数据库连接池的自动化配置 -->
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-jdbc</artifactId>
</dependency>
<dependency>
   <groupId>mysql</groupId>
   <artifactId>mysql-connector-java</artifactId>
   <version>5.1.48</version>
</dependency>

<!-- 实现对 MyBatis 的自动化配置 -->
<dependency>
   <groupId>org.mybatis.spring.boot</groupId>
   <artifactId>mybatis-spring-boot-starter</artifactId>
    <version>2.1.1</version>
</dependency>

<!-- 实现对 MyBatis Plus 的自动化配置 -->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.2.0</version>
</dependency>
```

## 必要的配置

1. 告知mybatis，mapper的位位置: `@MapperScan(basePackages="xxx")`加在配置类上
2. application.yaml中的datasource
3. application.yaml中的mybatis配置

## mapper.java文件的注解

1. @Mapper注解，让mybatis扫描到
2. @Repository注解，让Spring直接管理这个Bean，非必须
3. @Param注解，多个参数必须加，用于参数映射

## mapper.xml文件的标签

1. mapper标签的属性
   1. namespace：指定Mapper.java文件
2. sql标签：代表一个SQL片段
   1. `<sql id="sqlid">xxx</sql>` 来定义
   2. `<include refid="sqlid">`来引用
3. insert标签属性
   1. id
   2. parameterType : 指定参数类型
   3. useGeneratedKeys=“true”  // 自动生成主键
   4. keyProperty=“id” // 指定主键
4. select标签的属性
   1. resultType=“UserDO” // 返回值的类型



## Mybatis Plus的简单使用

1. 设置MapperScan
2. 在application.yaml中配置datasource
3. 在application.yaml中[配置](https://mybatis.plus/config/#mapperlocations)mybatis-plus
4. 在DO中加入@TableName注解，方便生成CRUD
5. Mapper.java继承BaseMapper