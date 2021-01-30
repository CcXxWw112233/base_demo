//构造函数继承

function SuperClass(current) {
  this.courses = ["语文", "数学", "英语"];
  this.current = current;
}

//父类声明原型方法
SuperClass.prototype.getCourses = function () {
  console.log(this.courses);
};

//声明子类
function SubClass(current) {
  SuperClass.call(this, current);
}

var instance1 = new SubClass("语文");
var instance2 = new SubClass("数学");

instance1.courses.push('化学')
console.log(instance1.courses); //["语文", "数学", "英语"， "化学"]
console.log(instance1.current); //语文
console.log(instance2.courses); //["语文", "数学", "英语"]
console.log(instance2.current); //数学

instance1.getCourses() //TypeError: instance1.getCourses is not a function