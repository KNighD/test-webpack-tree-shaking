## usedExports

🔖 git tag: used-export-demo

在 webpack.config.js 中添加一行配置 `optimization.usedExports: true`

```js
// webpack.config.js
const path = require('path')

module.exports = {
  // ...
  optimization: {
    usedExports: true,
  },
}
```

执行 `npm run build`，主要输出如下

```js
"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return foo1; });
/* unused harmony export foo2 */
const foo1 = () => {
  console.log('foo1')
}

const foo2 = () => {
  console.log('foo2')
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export foo3 */
const foo3 = () => {
  console.log('foo3')
}
```

可以看到有两行注释变更了

```js
/* unused harmony export foo2 */
/* unused harmony export foo3 */
```

那么这里 webpack 成功识别出了 foo2 和 foo3 是引入但未被使用到的模块。
