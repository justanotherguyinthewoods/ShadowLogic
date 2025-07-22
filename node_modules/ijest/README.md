# ijest

封装 jest 测试工具，提供了更加快捷和语义化的断言，支持指定测试单一模块

### 安装使用

```
yarn add ijest
```

运行匹配的测试

```
jest -t assert.use
```

> 只运行 title 匹配 assert.use 的测试用例

### 初始化配置

```js
import http from 'http';
import ijest from 'ijest';

const { tests, run } = ijest<
  {
    name: 'shushu';
    httpServer: http.Server;
  },
  {
    isStringNumber: (v) => unknown;
  }
>({
  context: {
    name: 'shushu',
    httpServer: http.createServer((req, res) => {
      res.end('666');
    }),
  },
  assert: (assert) => ({
    isStringNumber(value) {
      assert.isString(value);
      assert.isMatch(value, /^\d+$/);
    },
  }),
  before(ctx) {
    ctx.httpServer.listen();
  },
  after(ctx) {
    ctx.httpServer.close();
  },
  count: 10
});

export default tests;

run();
```

### 测试示例

```js
import tests from '@ijest';

// test为创建测试
// assert提供断言方法
// ctx为上下文环境
tests('测试组title', (test, assert) => {
  // 异步测试，ctx为上下文对象
  test('测试title1', (ctx) => {
    assert.isFunction(assert.isStringNumber);
  });

  test('测试title2', (ctx) => {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        assert.isTrue(true);
        resolve();
      }, 100);
    });
  });
});
```

### API

#### ijest

`ijest<Context, CustomAssert>(option)` 声明一个测试对象

#### option

- option.context 执行上下文，在此处注入环境中需要的对象
- option.assert: (asset) => CustomAssert 返回自定义定义断言，用于测试环境中调用
- option.count 定义每个单元测试运行的测试，这个对应测试一些随机函数和有用，比如类似`@smartx/mock-value`
- option.before：(ctx) => void 测试前执行
- option.after：(ctx) => void 测试完成后执行

#### preset.assert 系统内置断言

- assert.isTrue(value) 值是否为 true
- assert.isFalse(value) 值是否为 false
- assert.isTruly(value) 值是否可以转化为 true
- assert.isFalsy(value) 值是否可以转化为 false
- assert.isBoolean(value) 值是否是布尔值
- assert.isFunction(value) 值是否是函数
- assert.isArray(value) 值是否是数组
- assert.isNull(value) 值是否是 null
- assert.isNumber(value) 值是否是数字，不包含 NaN
- assert.isObject(value) 值是否是对象，不包括 null
- assert.isString(value) 值是否是字符串
- assert.isEqual(value1, value2) 值是否相等，2 个有相同 key，value 的对象可以使用该方法
- assert.isBe(value1, value2) 值恒等，对象比的是引用
- assert.isLength(value, length) 值的长度是否等于 length
- assert.isLength(value, min, max) 值的长度是否属于[min,max]区间
- assert.isMatch(value, regexp) 值是否被 regexp 匹配，允许数字和字符串
- assert.isBelong(value, array) 值是否属于 array
