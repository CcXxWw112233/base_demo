//组合继承

function SuperClass(current) {
  //引用类型共有属性
  this.courses = ["语文", "数学", "英语"];
  // 值类型共有属性
  this.current = current;
}

SuperClass.prototype.getCourses = function () {
  console.log(this.courses);
};

SuperClass.prototype.getCurrent = function () {
  console.log(this.current);
};

// 声明子类
function SubClass(current, time) {
  //构造函数继承父类属性
  SuperClass.call(this, current);
  this.time = time;
}
//类式继承 子类原型继承父类
SubClass.prototype = new SuperClass();
//子类原型方法
SubClass.prototype.getTime = function () {
  console.log(this.time);
};

var instance1 = new SubClass("语文", "9:00");
instance1.getTime(); //9:00
instance1.courses.push('化学')
instance1.getCourses(); //["语文", "数学", "英语", "化学"]
instance1.getCurrent(); //语文
console.log(instance1.current)//语文

var instance2 = new SubClass("数学", "10:00");
instance2.getTime(); //10:00
instance2.getCourses(); //["语文", "数学", "英语"]
instance2.getCurrent(); //数学
console.log(instance2.current)//数学
