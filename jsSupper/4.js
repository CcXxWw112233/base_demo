//原型式继承

function inheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

var course = {
  name: "语文",
  alikeCourse: ["数学", "英语"],
};

var newCourse = inheritObject(course);
newCourse.name = "化学";
newCourse.alikeCourse.push("物理");

var otherCourse = inheritObject(course);
otherCourse.name = "政治";
otherCourse.alikeCourse.push("历史");

console.log(newCourse.name); //化学
console.log(newCourse.alikeCourse); //["数学", "英语", "物理", "历史"]

console.log(otherCourse.name); //政治
console.log(otherCourse.alikeCourse); //["数学", "英语", "物理", "历史"]

console.log(course.name); //语文
console.log(course.alikeCourse); //["数学", "英语", "物理", "历史"]
