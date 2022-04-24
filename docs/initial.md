## 起始 demo

为了避免 webpack 的 mode 为 `development` 或者 `production` 默认的配置项带来的干扰，我们将 mode 设置为 `none`。

:bookmark: git tag: `initial-demo`

代码及配置如下

```js
// webpack.config.js
const path = require('path')

module.exports = {
  mode: 'none',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
}

// index.js
import { foo1, foo2 } from './modules/a'
import { foo3 } from './modules/b'

foo1()

// modules/a.js
export const foo1 = () => {
  console.log('foo1')
}

export const foo2 = () => {
  console.log('foo2')
}

export const foo3 = () => {
  console.log('foo3')
}
```

这里 index.js 导入了 a.js 与 b.js 里的方法，但是仅使用 a.js 中的 foo1，在 b.js 中有一个我们预期永远不会执行的代码 `console.log('never excute')`

运行一下 `npm run build`，主要的输出如下

```js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foo1", function() { return foo1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foo2", function() { return foo2; });
const foo1 = () => {
  console.log('foo1')
}

const foo2 = () => {
  console.log('foo2')
}

/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "foo3", function() { return foo3; });
const foo3 = () => {
  console.log('foo3')
}
```

可以看到不论是否变量有被使用到，都会被打包到结果，并且都是 harmony export，并没有进行区分，下面来着手修改
