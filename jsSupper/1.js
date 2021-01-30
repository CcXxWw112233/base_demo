//类式继承

// //声明父类
// function SuperClass() {
//   this.superValue = true;
// }
// //为父类添加共有方法
// SuperClass.prototype.getSuperValue = function () {
//   return this.superValue;
// };

// //声明子类
// function SubClass() {
//   this.subValue = false;
// }

// //继承父类
// SubClass.prototype = new SuperClass();
// //为子类添加共有方法
// SubClass.prototype.getSubValue = function () {
//   return this.subValue;
// };

// var instance = new SubClass();
// console.log(instance.getSuperValue()); //true
// console.log(instance.getSubValue()); //false


//缺点 
function SuperClass() {
    this.courses = ['语文', '数学', '英语']
}
function SubClass() {}
SubClass.prototype = new SuperClass();

var instance1 = new SubClass()
var instance2 = new SubClass()

console.log(instance2.courses) //['语文', '数学', '英语']
instance1.courses.push('化学')
console.log(instance2.courses) //['语文', '数学', '英语', '化学']
