# Pure Annotation

如果有观察过 babel 编译 react 组件的输出结果，我们通常会发现 /\*#\_\_PURE\_\_\*/ 这样一个注释

```ts
const App = () => <div />

      ↓ ↓ ↓ ↓ ↓ ↓

"use strict";

var App = function App() {
  return /*#__PURE__*/React.createElement("div", null);
};
```

告诉 webpack 执行 React.createElement("div", null) 是无副作用的，在没有使用 var App 的话，可以安全将 React.createElement("div", null) 跳过。

这是一种相比于模块更细粒度的，基于函数的副作用控制。

:bookmark: git tag: `pure-demo-1`

```js
// modules/a.js
import './a.css'

window.a = 'a'

export const foo1 = () => {
  console.log('foo1')
}

export const foo2 = () => {
  console.log('foo2')
}

const init_impure_foo = () => {
  window.impure_foo = 'impure_foo'
  return 'impure_foo'
}

export const impure_foo = init_impure_foo()
```

在 a.js 中导出 `impure_foo`, `impure_foo` 初始化时会执行 `init_impure_foo`，`init_impure_foo` 会给 `window` 挂上一个 `impure_foo` 属性，而 index.js 未导入使用 `impure_foo`。

打包后输出

```js
function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    __webpack_require__.d(__webpack_exports__, "a", (function() {
        return foo1;
    }));
    __webpack_require__(9);
    window.a = "a";
    const foo1 = () => {
        console.log("foo1");
    };
    window.impure_foo = "impure_foo";
}
```
看到 `window.impure_foo = 'impure_foo'` 这行代码也被打包进来。

如果我们的期望是，当 `impure_foo` 未被导出使用时，`init_impure_foo` 也不会执行，那么我们可以声明*执行* `init_impure_foo` 是纯的

:bookmark: git tag: `pure-demo-2`

```js
// modules/a.js
import './a.css'

window.a = 'a'

export const foo1 = () => {
  console.log('foo1')
}

export const foo2 = () => {
  console.log('foo2')
}

const init_impure_foo = () => {
  window.impure_foo = 'impure_foo'
  return 'impure_foo'
}

export const impure_foo = /*#__PURE__*/ init_impure_foo()
```

再次打包 window.impure_foo = 'impure_foo' 将会被抹去。

注意这里注释的位置，是函数的执行，而非函数本身。
