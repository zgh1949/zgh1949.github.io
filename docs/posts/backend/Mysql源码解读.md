# 源码概览

## 克隆源码

可以直接在github上获取mysql最新源码：

```bash
git clone -depth=1 https://github.com/mysql/mysql-server.git
```

注：加上参数`-depth=1`可以忽略 git的提交历史，可有效减少克隆的大小

## 包结构分析

### 查看包结构

通过tree可以看到包结构

```bash
tree -dL 2  #d代表只展示文件夹，L表示目录深度
```

.
└── mysql-server
    ├── Docs
    ├── client
    ├── cmake
    ├── components
    ├── doxygen_resources
    ├── extra
    ├── include
    ├── libbinlogevents
    ├── libchangestreams
    ├── libmysql
    ├── libs
    ├── libservices
    ├── man
    ├── mysql-test
    ├── mysys
    ├── packaging
    ├── plugin
    ├── router
    ├── scripts
    ├── share
    ├── sql
    ├── sql-common
    ├── storage
    ├── strings
    ├── support-files
    ├── testclients
    ├── unittest
    ├── utilities
    └── vio

包那么多，我们捡主要的看。



### 主要的包

**sql**包：解析sql、查询优化、事务管理、表操作，是 mysql的核心包。

**storage**包：包含了许多存储引擎的实现，每个存储引擎都有自己的目录。

**client** 包：mysql 客户端，实现服务器如何交互。

**mysys**包：mysql的依赖库及对底层系统的封装。



# sql包的解析

## sql包概览

通过 `tree` 命令可以看到，sql 包下有几十个文件夹和几百个文件。文件很多，我们可以根据其文件名进行分类；

|     文件名含      |    功能    |      |
| :---------------: | :--------: | ---- |
| transaction \| xa |    事务    |      |
|       table       |     表     |      |
|       index       |    索引    |      |
|        sql        |  sql 语句  |      |
|   thread \| thd   |    线程    |      |
|   binlog \| log   |    日志    |      |
|        rpl        | 复制与集群 |      |
|  protocol \| ssl  |  网络相关  |      |
|        opt        | 查询优化器 |      |
|       parse       |   解析器   |      |
|        sp         |  存储过程  |      |
|      trigger      |   触发器   |      |

注意：仅仅列出一部分。

## 线程类 THD

**基本信息**

- 位置：这个类位于sql_class.h。
- 作用：每建立一个连接，都会有一个THD对象与之对应，记录连接的状态信息。

主要的属性：

- `mysql_data_buffer`: 用于存储客户端发送的数据缓冲区。
- `db`: 当前数据库名称。
- `current_stmt_id`: 当前语句的 ID。
- **`current_stmt_in_trans`:** 当前语句是否在事务中。
- `current_stmt_is_fatal`: 当前语句是否可能导致致命错误。
- **`server_status`:** 服务器状态标志，如 SERVER_STATUS_IN_TRANS、SERVER_STATUS_AUTOCOMMIT 等。
- `variables`: 包含会话和全局变量的结构。
- **`variables.option_bits`**: 包含会话级别的选项标志。
- `variables.session_track_transaction_info`: 用于跟踪事务信息的选项。
- **`variables.transaction_isolation`**: 当前事务的隔离级别。
- `variables.transaction_read_only`: 当前事务是否只读。
- **`m_transaction`:** 包含与事务相关的上下文信息的 `Transaction_ctx` 对象。
- **`m_transactional_ddl`**: 用于事务处理的数据字典变更的上下文。
- **`m_transaction_psi`**: 用于性能schema的事务上下文。
- **`transaction_rollback_request`**: 指示是否请求事务回滚的标志。

主要的方法：

## 事务源码 ↓

相关的源代码文件有：

- transaction.h
- transaction.cc
- transaction_info.h
- transaction_info.cc

其中`.h` 文件定义的是接口，`.cc`文件是接口的实现

## transaction.h

这是事务的抽象接口，定义了提交、回滚、保存点等功能。操作对象是负责执行的线程对象。

```cpp
// 声明THD类，THD是Thread Handler的缩写，表示线程处理器，是MySQL中用于处理用户查询的类  
class THD;  
  
// 检查当前线程（THD）的事务状态，可能用于判断事务是否已经开始、是否处于特定状态等  
bool trans_check_state(THD *thd);  
  
// 重置线程（THD）的某些一次性特性，这些特性可能与事务的开始或结束相关  
void trans_reset_one_shot_chistics(THD *thd);  
  
// 跟踪事务的结束，可能用于统计、日志记录或其他与事务结束相关的操作  
void trans_track_end_trx(THD *thd);  
  
// 开始一个新的事务  
bool trans_begin(THD *thd, uint flags = 0);  // flags参数用于指定事务开始的选项  
  
// 提交当前事务  
bool trans_commit(THD *thd, bool ignore_global_read_lock = false);  // 如果设置了ignore_global_read_lock，则忽略全局读锁  
  
// 隐式提交当前事务（在某些操作后自动提交）  
bool trans_commit_implicit(THD *thd, bool ignore_global_read_lock = false);  
  
// 回滚当前事务  
bool trans_rollback(THD *thd);  
  
// 隐式回滚当前事务（在某些操作后自动回滚）  
bool trans_rollback_implicit(THD *thd);  
  
// 提交当前语句的事务（在支持语句级事务的情况下）  
bool trans_commit_stmt(THD *thd, bool ignore_global_read_lock = false);  
  
// 回滚当前语句的事务（在支持语句级事务的情况下）  
bool trans_rollback_stmt(THD *thd);  
  
// 提交一个可附加的事务（这种事务可能具有特殊的提交逻辑或条件）  
bool trans_commit_attachable(THD *thd);  
  
// 创建一个保存点  
bool trans_savepoint(THD *thd, LEX_STRING name);  // name参数指定保存点的名称  
  
// 回滚到指定的保存点  
bool trans_rollback_to_savepoint(THD *thd, LEX_STRING name);  
  
// 释放指定的保存点（使其不再有效）  
bool trans_release_savepoint(THD *thd, LEX_STRING name);  
```

## transaction.cc

### trans_begin 开启事务

```c++
bool trans_begin(THD *thd, uint flags) {
  // ...
    
  // 设置线程对象两个标识位，代表开启事务
  thd->variables.option_bits |= OPTION_BEGIN;   // 事务开启
  thd->server_status |= SERVER_STATUS_IN_TRANS; // 线程处于事务中

  // ...
}
```

### trans_commit 提交事务

```c++
bool trans_commit(THD *thd, bool ignore_global_read_lock) {
  
  // ... 
    
  // 设置线程对象的标识位，代表关闭事务
  thd->server_status &=
      ~(SERVER_STATUS_IN_TRANS | SERVER_STATUS_IN_TRANS_READONLY);  // 线程不处于事务中

  // 调用存储引擎提交事务
  res = ha_commit_trans(thd, true, ignore_global_read_lock);
    
  // 如果提交失败就抛出异常
  if (res == false)
  // ...

  // 修改线程对象的事务标识位, 一些资源回收
  thd->server_status &= ~SERVER_STATUS_IN_TRANS; // 防止全局事务模式下，server_status又被开启
  thd->variables.option_bits &= ~OPTION_BEGIN;
  // ...
  
    
  // 更新数据字典表，或者回滚更新
  if (!thd->is_attachable_rw_transaction_active()) {
    if (res)
      thd->dd_client()->rollback_modified_objects();
    else
      thd->dd_client()->commit_modified_objects();
  }

  // ...

  return res;
}
```

> [!TIP]   
>
> **数据字典表**（DD）
>
> 存储了数据库的元数据，方便取用的一个表 [^1]

由上面的源码可知，核心代码在`ha_commit_trans()`方法中

### ha_commit_trans

```c++
int ha_commit_trans(THD *thd, bool all, bool ignore_global_read_lock) {
  // ...

  // 准备阶段
  if (!trn_ctx->no_2pc(trx_scope) && (trn_ctx->rw_ha_count(trx_scope) > 1))
    error = tc_log->prepare(thd, all);
  }
 
  // ...

  // 提交阶段
  if (error || (error = tc_log->commit(thd, all))) {
    ha_rollback_trans(thd, all);  // 失败回滚
    error = 1;
    goto end;
  }

  // ...
     
}
```

```c++
// prepare
int TC_LOG_MMAP::prepare(THD *thd, bool all) {
  // 通知存储引擎进行准备
  const int error = ha_prepare_low(thd, all);  // 遍历存储引擎列表，分别调用他们的prepare()方法
  if (error != 0) return error;  // 失败则返回
   
  // 通知事务协调器，已经准备完毕
  return trx_coordinator::set_prepared_in_tc_in_engines(thd, all);
}
```

```c++
// commit
TC_LOG::enum_result TC_LOG_MMAP::commit(THD *thd, bool all) {
  DBUG_TRACE;
  ulong cookie = 0;
  const my_xid xid =
      thd->get_transaction()->xid_state()->get_xid()->get_my_xid();

  if (all) {
    CONDITIONAL_SYNC_POINT_FOR_TIMESTAMP("before_commit_in_tc");
    if (xid)
      if (!(cookie = log_xid(xid)))
        return RESULT_ABORTED;  // Failed to log the transaction
  }

  if (trx_coordinator::commit_in_engines(thd, all))
    return RESULT_INCONSISTENT;  // Transaction logged, if not XA , but not
                                 // committed

  /* If cookie is non-zero, something was logged */
  if (cookie) unlog(cookie, xid);

  return RESULT_SUCCESS;
}
```

```c++
int TC_LOG_MMAP::rollback(THD *thd, bool all) {
  if (all) {
    CONDITIONAL_SYNC_POINT_FOR_TIMESTAMP("before_rollback_in_tc");
  }
  return trx_coordinator::rollback_in_engines(thd, all);
}
```









[^1]: https://zhuanlan.zhihu.com/p/709035902

