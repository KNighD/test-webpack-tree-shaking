# Terser

目前为止，我们已经能正确标识出 dead code 了，但代码依然被打包进去了。webpack 移除这些代码需要通过压缩工具，如 uglifyjs-webpack-plugin（已经处于维护状态）或者 terser-webpack-plugin 等。

:bookmark: git tag: `terser-demo`

那么我们在 usedExports-demo 的基础上，给 webpack.config.js 添加 terser-webpack-plugin

```js
// webpack.config.js
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
  // ...
  optimization: {
    // ...
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,
          output: {
            beautify: true,
          },
        },
      }),
    ],
  },
}
```

为了方便观察打包结果，将 terser 的 `mangle` 设置成 false 以及 output.beautify 设置为 true。

运行 `npm run build`

```js
;[
  function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    __webpack_require__.r(__webpack_exports__)
    var _modules_a__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1)
    __webpack_require__(2)
    Object(_modules_a__WEBPACK_IMPORTED_MODULE_0__.a)()
  },
  function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
    __webpack_require__.d(__webpack_exports__, 'a', function () {
      return foo1
    })
    const foo1 = () => {
      console.log('foo1')
    }
  },
  function (module, __webpack_exports__, __webpack_require__) {
    'use strict'
  },
]
```

看到仅 `foo1` 被保留下来，其他未被使用到的导出则是被移除了

这里额外提一句，如果 mode 为 development 是没有效果的，这是因为 development 默认 devtool 为 eval，而 terser-webpack-plugin 仅在 webpack 的 devtool 为 source-map, inline-source-map, hidden-source-map 及 nosources-source-map 有效。
