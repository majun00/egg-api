# 后台管理系统接口文档

## Api V1 说明

- 接口地址：`http://23.105.215.202:7001/v1`
- 服务端已开启 CORS ，客户端不需要做任何处理就可以访问服务器资源
- Api V1 认证统一使用 Token 认证（基于 JSON Web Token）
  - 主要关注为什么不采用 Cookie/Session 的认证方式
- 需要授权的 Api ，需要加 `X-Access-Token` 的 请求头
- 使用 HTTP Status Code 标识状态
- 分页列表参数使用 `_page` 和 `_limit`
- 时间日期格式：`2017-12-24 13:52:26`
- 数据返回格式统一使用 JSON
- 无特殊说明，接口默认支持 `application/x-www-form-urlencoded` 和 `application/json` 两种方式

### Api V1 Token 权限认证

- Api V1 认证统一使用 Token 认证（基于 JSON Web Token）
- 需要授权的 Api ，需要在请求头中加入 `X-Access-Token` 请求头

### 支持的请求方法

- GET（SELECT）：从服务器取出资源（一项或多项）。
- POST（CREATE）：在服务器新建一个资源。
- PUT（UPDATE）：在服务器更新资源（客户端提供改变后的完整资源）。
- PATCH（UPDATE）：在服务器更新资源（客户端提供改变的属性）。
- DELETE（DELETE）：从服务器删除资源。
- HEAD：获取资源的元数据。
- OPTIONS：获取信息，关于资源的哪些属性是客户端可以改变的。

### 通用的返回状态说明

| *状态码* | *含义*                  | *说明*                               |
| ----- | --------------------- | ---------------------------------- |
| 200   | OK                    | 请求成功                               |
| 201   | CREATED               | 创建成功                               |
| 204   | DELETED               | 删除成功                               |
| 400   | BAD REQUEST           | 请求的地址不存在或者包含不支持的参数                 |
| 401   | UNAUTHORIZED          | 未授权                                |
| 403   | FORBIDDEN             | 被禁止访问                              |
| 404   | NOT FOUND             | 请求的资源不存在                           |
| 422   | Unprocesable entity   | [POST/PUT/PATCH] 当创建一个对象时，发生一个验证错误 |
| 500   | INTERNAL SERVER ERROR | 内部错误                               |

### Api V1 返回结果

- GET /collection：返回资源对象的列表（数组）
- GET /collection/resource：返回单个资源对象
- POST /collection：返回新生成的资源对象
- PUT /collection/resource：返回完整的资源对象
- PATCH /collection/resource：返回完整的资源对象
- DELETE /collection/resource：返回一个空文档

### Api V1 错误

发生错误时，HTTP Status Code为4xx错，如 400，403，404

错误格式：

```
{
  error: 'username invalid'
}
```

---

## 权限管理

### 登陆

- `POST /auth`

- 请求体

| 参数名称     | 作用   | 是否必须 | 备注   |
| -------- | ---- | ---- | ---- |
| username | 用户名  | 是    |      |
| password | 密码   | 是    |      |


- 登陆成功返回结果示例

```json
状态码 201

{
  "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiI1YTNmM2Q1MzlkNmQzYzkxMmQyYjBlY2QiLCJleHAiOjE1MTQ3MDA0OTM4MTJ9.Sq_HHfIcilGcYvFTjtotjWol3PypAL47ugu_hc9IFvw",
  "expires": 1514700493812,
  "teacher": {
    "_id": "5a3f3d539d6d3c912d2b0ecd",
    "username": "admin",
    "real_name": "管理员",
    "gender": 0,
    "join_date": "2017-12-24T00:00:00.000Z",
    "type": 0,
    "updated_at": "2017-12-24T06:08:13.809Z",
    "created_at": "2017-12-24T06:08:13.808Z",
    "status": 0,
    "avatar": "/public/img/default.png",
    "bio": "",
    "email": "",
    "cellphone": "",
    "district": 0,
    "city": 0,
    "province": 0,
    "birthday": null,
    "nickname": ""
  }
}
```

- 登陆失败

```json
状态码 401

// 用户名无效
{
  error: 'invalid username'
}

// 密码无效
{
  error: 'password username'
}
```

### 退出登陆

- `DELETE /auth`

退出成功返回 204 状态码

## 商品管理

### 添加商品

- `POST /teachers`

- 请求体

| 参数名称      | 作用     | 是否必须 | 备注            |
| --------- | ------ | ---- | ------------- |
| username  | 登陆用户名  | 是    |               |
| password  | 登陆密码   | 是    |               |
| real_name | 商品真实姓名 | 是    |               |
| join_date | 入职日期   | 是    | 例如 2017-12-24 |
| type      | 用户类型   | 是    | 0 管理员、1 普通用户  |
| gender    | 商品性别   | 是    | 0 男、1 女       |

- 添加成功返回结果示例

```json
状态码 201
{
    "teacher_id": "5a3f7ef9f29c0c2aec258e33"
}
```

### 商品列表

- `GET /teachers`

- 查询参数

| 参数名称   | 作用      | 是否必须 | 备注          |
| ------ | ------- | ---- | ----------- |
| _page  | 要查看的页码  | 否    | 默认第 1 页     |
| _limit | 限制的结果条数 | 否    | 默认每页 20 条数据 |


- 返回结果示例

```json
状态码 200
[
    {
        "_id": "5a3bd91572aae926ec6e692e",
        "username": "admin",
        "password": "14e1b600b1fd579f47433b88e8d85291",
        "real_name": "李鹏",
        "gender": 0,
        "join_date": "2017-12-21T00:00:00.000Z",
        "type": 0,
        "__v": 0,
        "updated_at": "2017-12-21T15:53:57.293Z",
        "created_at": "2017-12-21T15:53:57.293Z",
        "status": 0,
        "avatar": "/public/img/default.png",
        "bio": "",
        "email": "",
        "cellphone": "",
        "district": 0,
        "city": 0,
        "province": 0,
        "birthday": null,
        "nickname": ""
    },
    {
        "_id": "5a3f7ef9f29c0c2aec258e33",
        "username": "zs",
        "real_name": "张三",
        "password": "14e1b600b1fd579f47433b88e8d85291",
        "join_date": "2017-12-24T00:00:00.000Z",
        "type": 1,
        "gender": 0,
        "__v": 0,
        "updated_at": "2017-12-24T10:18:33.812Z",
        "created_at": "2017-12-24T10:18:33.812Z",
        "status": 0,
        "avatar": "/public/img/default.png",
        "bio": "",
        "email": "",
        "cellphone": "",
        "district": 0,
        "city": 0,
        "province": 0,
        "birthday": null,
        "nickname": ""
    }
]
```

### 查看商品

- `GET /teachers/:teacherId`

- 返回结果示例

```json
{
    "_id": "5a3f7ef9f29c0c2aec258e33",
    "username": "zs",
    "real_name": "张三",
    "password": "14e1b600b1fd579f47433b88e8d85291",
    "join_date": "2017-12-24T00:00:00.000Z",
    "type": 1,
    "gender": 0,
    "__v": 0,
    "updated_at": "2017-12-24T10:18:33.812Z",
    "created_at": "2017-12-24T10:18:33.812Z",
    "status": 0,
    "avatar": "/public/img/default.png",
    "bio": "",
    "email": "",
    "cellphone": "",
    "district": 0,
    "city": 0,
    "province": 0,
    "birthday": null,
    "nickname": ""
}
```

### 删除商品

> 目前不提供删除

### 更新商品

- `PUT /teachers/:teacherId`

- 请求体
  + 所有可用的实体字段都支持更新

- 返回结果示例

```json
{
    "_id": "5a3bd91572aae926ec6e692e",
    "username": "admin",
    "password": "14e1b600b1fd579f47433b88e8d85291",
    "real_name": "李鹏",
    "gender": 0,
    "join_date": "2017-12-21T00:00:00.000Z",
    "type": 0,
    "__v": 0,
    "updated_at": "2017-12-21T15:53:57.293Z",
    "created_at": "2017-12-21T15:53:57.293Z",
    "status": 0,
    "avatar": "/public/img/default.png",
    "bio": "",
    "email": "",
    "cellphone": "17090086870",
    "district": 0,
    "city": 0,
    "province": 0,
    "birthday": null,
    "nickname": ""
}
```

---

## 课程管理

## 课程分类管理

## 课时管理

