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
