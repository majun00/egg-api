# bxg-api



## QuickStart

<!-- add docs here for user -->

see [egg docs][egg] for more detail.

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

- 安装 nginx
- 安装 node
- 安装 MongoDB

在 MongoDB 数据库中插入超管账户

```javascript
db.teachers.insert({
  username: 'admin',
  password: '14e1b600b1fd579f47433b88e8d85291',
  real_name: '管理员',
  gender: 0,
  join_date: '2017-12-24',
  type: 0
})
```

```bash
$ npm start
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.
- Use `npm run autod` to auto detect dependencies upgrade, see [autod](https://www.npmjs.com/package/autod) for more detail.


[egg]: https://eggjs.org
