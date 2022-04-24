## sideEffects

### 加一点副作用

通过 usedExports + terser 我们可以将代码中的 dead code 移除。

而如果是存在副作用的代码，如 引入样式 / 引入 polyfill 等，webpack 也会将这些存在副作用（sideEffects）的代码打包进来，让我们给模块加点副作用。

:bookmark: git tag: `sideEffects-demo-1`

```js
// a.js
window.a = 'a'

export const foo1 = () => {
  console.log('foo1')
}

export const foo2 = () => {
  console.log('foo2')
}

// b.js
window.b = 'b'

export const foo3 = () => {
  console.log('foo3')
}
```

在 a.js 和 b.js 中，分别给 `window` 挂上了 `a` 和 `b` 两个属性，这就是一个带有副作用的代码。

打包后输出

```js
[ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _modules_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
    __webpack_require__(2);
    Object(_modules_a__WEBPACK_IMPORTED_MODULE_0__.a)();
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return foo1;
    })), window.a = "a";
    const foo1 = () => {
        console.log("foo1");
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    window.b = "b";
} ]
```

可以看到，即使没有用到 b.js 中的任何代码，依然会将 `window.b = 'b'` 打包进来。

### 配置 sideEffects

但是往往这个时候的期望是如果我们没有使用到 b.js 的任何代码，那么就不需要引入 b.js 模块中的副作用的代码。

这就需要通过 sideEffects 来告知 webpack 了。

我们需要在两个地方配置 sideEffects

1. 在 webpack.config.js 中添加一个配置项 `optimization.sideEffects: true`
2. 在 package.json 中配置 `sideEffects: false`

:bookmark: git tag: `sideEffects-demo2`

```js
// package.json
{
  // 一些其他配置
  "sideEffects": false
}

// webpack.config.js
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // ...
  optimization: {
    // ...
    sideEffects: true,
  },
}
```

配置完成后打包结果如下

```js
[ function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.r(__webpack_exports__);
    var _modules_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
    Object(_modules_a__WEBPACK_IMPORTED_MODULE_0__.a)();
}, , function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return foo1;
    })), window.a = "a";
    const foo1 = () => {
        console.log("foo1");
    };
} ]
```

可以看到 由于 a.js 中的 foo1 被使用了，所以 a.js 中的副作用 `window.a='a'` 是被打包进来了，而 b.js 中的 `window.b='b'` 则被移除掉了。

在 webpack.config.js 中配置的 sideEffects 的作用是是开启 sideEffects 优化，这个选项在 `development` 模式下是关闭的，而在 `production` 模式下是开启的。

注意这里的 sideEffects 的含义是：引入的文件是否存在模块内副作用。引入的文件不存在模块内副作用，则**如果没有使用到文件中导出的模块，直接跳过这个文件中的所有代码**。

sideEffects 默认为 true，配置成 false，即说明所有文件都不存在副作用。

### sideEffects 配置具体文件

当然我们也可以将 sideEffects 配置成数组以更精确地匹配到目标文件，例如当我们引入样式文件时

:bookmark: git tag: `sideEffects-demo-3`

```js
// webpack.config.js
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}

// index.css
body {
  background-color: red;
}

// index.js
import { foo1, foo2 } from './modules/a'
import { foo3 } from './modules/b'

import './index.css'

foo1()
```

由于引入样式是 `import './index.css'`, webpack 认为我们没有使用到 `index.css` 中导出的模块，并且 package.json 中的 sideEffects 还为 false，webpack 将不会打包 index.css 中的代码。

那么此时我们需要做的调整是将 package.json 中的 sideEffects 调整为 `"sideEffects": ["*.css"]`。

:bookmark: git tag: `sideEffects-demo-4`

此时再次打包，输出的代码中就包含了样式代码

```js
 ___CSS_LOADER_EXPORT___.push([ module.i, "body {\n  background-color: red;\n}", "" ])
```

再次说明：如果没有使用到文件中导出的模块，直接跳过这个文件中的代码。

例如 b.js 引入了一个样式文件 b.css，但我们实际上没有用到 b.js 中的代码，而 b.css 被声明为有副作用的时候，我们是否会将 b.css 引入进来呢？

:bookmark: git tag: `sideEffects-demo-5`

```js
// modules/a.css
body {
  background-color: green;
}

// modules/a.js
import "./a.css"

window.a = 'a'

export const foo1 = () => {
  console.log('foo1')
}

export const foo2 = () => {
  console.log('foo2')
}

// modules/b.css
body {
  background-color: blue;
}

// modules/b.js
import './b.css'

window.b = 'b'

export const foo3 = () => {
  console.log('foo3')
}
```

打包后，我们可以找到 red 和 green，但是无法找到 blue。可见即便此时 b.css 被声明存在副作用，也将被直接跳过。
```js
 ___CSS_LOADER_EXPORT___.push([ module.i, "body {\n  background-color: red;\n}", "" ])

 ___CSS_LOADER_EXPORT___.push([ module.i, "body {\n  background-color: green;\n}", "" ])
```

