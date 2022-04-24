## commonjs

在 webpack4， tree shaking 的前提是代码的编码规范是 esm，这应该和 commonjs 是动态加载有关系。

倘若我们使用 commonjs 来编写代码，构建输出会是怎么样呢？在当前基础上新增 c.js 模块

:bookmark: git tag: `babel-preset-env-demo`

```js
// c.js
exports.foo4 = () => {
  console.log('foo4')
}

// index.js
import { foo1, foo2 } from './modules/a'
import { foo3 } from './modules/b'
import './index.css'

const { foo4 } = require('./modules/c')

foo1()
```

输出

```js
function(module, exports) {
    exports.foo4 = function() {
        console.log("foo4");
    };
}
```

可以看到 foo4 仍然被打包进来
