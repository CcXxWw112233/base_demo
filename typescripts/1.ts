// https://zhuanlan.zhihu.com/p/40311981
// 泛型一些工具的使用
interface Foo {
  name: string
  age: number
}
type T = keyof Foo // -> "name" | "age"
type Keys = "a" | "b"
type Obj = {
  [p in Keys]: any // -> { a: any, b: any }
}
type PartialL<T> = {[P in keyof T]?: T[P]}

type RequiredL<T> = {[P in keyof T]-?: T[P]}

type ReadonlyL<T> = {
  readonly [P in keyof T]: T[P];
}

interface a {
  name: string
  age: number
}

type b = Readonly<a>

const c: b = {
  name: '1',
  age: 2
}
