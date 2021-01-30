// 寄生式继承

function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var course = {
  name: "语文",
  alikeCourse: ["数学", "英语"],
};

function createCourse(obj) {
  //通过原型继承方式创建新对象
  var o = new inheritObject(obj);
  console.log(o);
  // 拓展新对象
  o.getName = function () {
    console.log(this.name);
  };
  return o;
}

const newCourse = createCourse(course);
newCourse.getName(); //语文
newCourse.alikeCourse.push("音乐");
console.log(newCourse.alikeCourse); //["数学", "英语", "音乐"]

const otherCourse = createCourse(course);
otherCourse.getName(); //语文
console.log(otherCourse.alikeCourse); // ["数学", "英语", "音乐"]
