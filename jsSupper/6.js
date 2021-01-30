// 寄生组合式继承
function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}
function inheritPrototype(subClass, superClass) {
  //复制一份父类的原型副本保存在变量中
  var p = new inheritObject(superClass.prototype);
  //修正因为重写子类原型导致子类的constructor属性被修改
  p.constructor = subClass;
  //设置子类的原型
  subClass.prototype = p;
}

//test

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

//寄生式继承 子类原型继承父类
inheritPrototype(SubClass, SuperClass);

//类式继承 子类原型继承父类
// SubClass.prototype = new SuperClass();

//子类原型方法
SubClass.prototype.getTime = function () {
  console.log(this.time);
};

var instance1 = new SubClass("语文", "9:00");
var instance2 = new SubClass("数学", "10:00");

instance1.getTime(); //9:00
instance1.courses.push("化学");
instance1.getCourses(); //["语文", "数学", "英语", "化学"]
instance1.getCurrent(); //语文
console.log(instance1.current); //语文

instance2.getTime(); //10:00
instance2.getCourses(); //["语文", "数学", "英语"]
instance2.getCurrent(); //数学
console.log(instance2.current); //数学
