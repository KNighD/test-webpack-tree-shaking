## @babel/preset-env

> 确保没有编译器将您的 ES2015 模块语法转换为 CommonJS 的（顺带一提，这是现在常用的 @babel/preset-env 的默认行为，详细信息请参阅文档） --webpack 文档

现在 @babel/preset-env 默认 modules 为 auto，而 auto 的含义是根据 caller 来决定是否将 ESM 转为其他模块规范，这个配置项允许 plugins 以及 presets 来决定是否支持 ESM，如果支持则不会将 ESM 转 CommonJS。

目前来说 webpack 使用 @babel/preset-env 应该是不存在文档中提到的转成 CommonJs 的问题

:bookmark: git tag: `babel-preset-env-demo`

```ts
// webpack.config.js

module.exports = {
  // ...
  module: {
    rules: [
      // ...
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
```

输出

```ts
const foo1 = () => {
  console.log('foo1')
}

      ↓ ↓ ↓ ↓ ↓ ↓

var foo1 = function () {
  console.log('foo1')
}
```

打包后输出结果将原先的箭头函数转成了 function，可见 @babel/preset-env 是生效的，但并未影响到 webpack 的 tree shaking。
