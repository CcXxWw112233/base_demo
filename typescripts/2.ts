// <!-- https://juejin.cn/post/6844903796997357582 -->
// 巧用ts

// 函数重载
interface User {
  name: string;
  age: number;
}
const user = {
  name: "张三",
  age: 24,
};
class Demo {
  public fn(para: User): number;
  public fn(para: number, flag?: boolean): number;
  public fn(para: User | number, flag?: boolean): number {
    return 11;
  }
}

// 映射类型
type ObjectDescriptor<D, M> = {
  data?: D;
  methods?: M & ThisType<D & M>;
};
function makeObject<D, M>(dec: ObjectDescriptor<D, M>): D & M {
  let data: object = dec.data || {};
  let methods: object = dec.methods || {};
  return { ...data, ...methods } as D & M;
}
let obj = makeObject({
  data: { x: 0, y: 0 },
  methods: {
    move(dx: number, dy: number) {
      this.x += dx;
      this.y += dy;
    },
  },
});
obj.x = 10;
obj.y = 20;
obj.move(5, 5);
console.log("ss_0", obj);
