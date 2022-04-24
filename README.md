# test-webpack-tree-shaking

这是一个测试 webpack tree shaking 的 demo 项目，由于是边写边补充不同 demo 的，因此文档以 main 分支为主，而 demo 则可切换到不同 tag 下自行测试。
例如 :bookmark: git tag: `initial-demo` 即表示接下来的代码示例在 `initial-demo` 这个 tag 里。
注意，本项目都是基于 webpack4。

## 背景

近期项目组的组件库需要维护，其中有关于组件按需加载采用 antd 组件库的方案，是通过 [umijs](https://github.com/umijs)/**[babel-plugin-import](https://github.com/umijs/babel-plugin-import)** 来实现的。

这个方案实际上是通过分析语法，在编译阶段将模块引用转成通过相对路径来实现的。即

```jsx
import { Button } from 'antd';
ReactDOM.render(<Button>xxxx</Button>);

      ↓ ↓ ↓ ↓ ↓ ↓

var _button = require('antd/lib/button');
ReactDOM.render(<_button>xxxx</_button>);
```

然而这个方案实际上早在很久之前已经被 antd 官方抛弃了，antd 目前的是通过 tree shaking 实现 _JS_ 部分的按需加载而， css 方面则认为性价比不高等原因没有额外处理，略有争议，详细可以参考 https://github.com/ant-design/ant-design/issues/23988 这个 issue 里的相关讨论。

鉴于 webpack 文档里关于 [tree shaking](https://webpack.docschina.org/guides/tree-shaking/) 的篇章写的比较晦涩。在早些时候有做过一些[测试以及总结]( [关于 webpack 的 tree shaking](https://knighd.github.io/2021/05/27/%E5%85%B3%E4%BA%8E-webpack-%E7%9A%84-tree-shaking/#more))，但当时的理解比较不够到位。

本次借着重新梳理组件库的机会，在这个 test-webpack-tree-shaking-demo 中再次更为全面地测试并整理 webpack tree shaking 相关内容，目前主要应用 webpack 的版本仍然处于 webpack4，因此本项目也都是基于 webpack4，如有理解不到位的地方还望指出探讨。

webpack 能标识出 dead code 的**前提**是使用 esm 规范来编写代码（[在 webpack5 是新增了部分 commonjs 的支持](https://webpack.js.org/blog/2020-10-10-webpack-5-release/#commonjs-tree-shaking)）。

而标识 dead code 主要通过一下三种方式：

1. 通过 usedExports 标识
2. 通过 sideEffects 标识
3. 通过 /\*#\_\_PURE\_\_\*/ 标识

标识出 dead code 之后需要移除代码：

1. 通过配置 terser 等压缩工具来移除 usedExports / 及 /#\_\_PURE\_\_/ 标识出的 DeadCode

2. 没有模块内部的 sideEffects 的且导出未被使用的文件则将整个跳过

下面是详细的 demo 及文档，可以顺序阅读

1. [起始 Demo](./docs/initial.md)
2. [usedExports](./docs/usedExports.md)
3. [terser](./docs/terser.md)
4. [sideEffects](./docs/sideEffects.md)
5. [/\*#\_\_PURE\_\_\*/](./docs/pure.md)
6. [commonjs](./docs/commonJs.md)

## webpack tree shaking 的结论

为了使用 tree shaking，webpack 文档中提到:

1. 使用 ES2015 模块语法（即 import 和 export）。
2. 确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请参阅文档）。
3. 在项目的 package.json 文件中，添加 "sideEffects" 属性。
4. 使用 mode 为 "production" 的配置项以启用更多优化项，包括压缩代码与 tree shaking。

经过这些测试，得出的结论是：

1. 第一点：必须使用 ESM 是正确的。
2. 第二点：确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 是正确的，但 @babel/preset-env 的默认行为已经不会影响到 tree shaking 了。
3. 第三点：package.json 添加 "sideEffects" 属性需要看场景，作为库开发者来说是很有必要的，而对于业务开发者来说，我觉得通常不需要，usedExports + terser 基本满足需求。
4. 第四点：使用 mode 为 "production" 的配置项，无非就是因为 production 模式开启了 tree shaking 所需要的优化项，如果熟悉 webpack，也可以自行配置以达到相同的效果。
