document.title = "装饰器模式";

// 是为对象动态加入行为，经过多重包装，可以形成一条装饰链

function Person() {}

Person.prototype.skill = function () {
  console.log("数学");
};

// 装饰器，还会音乐
function MusicDecorator(person) {
  this.person = person;
}

MusicDecorator.prototype.skill = function () {
  this.person.skill();
  console.log("音乐");
};

// 装饰器，还会跑步
function RunDecorator(person) {
  this.person = person;
}

RunDecorator.prototype.skill = function () {
  this.person.skill();
  console.log("跑步");
};

var person = new Person();

// 装饰一下
var person1 = new MusicDecorator(person);
person1 = new RunDecorator(person1);

person.skill(); // 数学
person1.skill(); // 数学 音乐 跑步

// 在JS中，函数为一等对象，所以我们也可以使用更通用的装饰函数

// 装饰器，在当前函数执行前先执行另一个函数
function decoratorBefore(fn, beforeFn) {
  return function () {
    var ret = beforeFn.apply(this, arguments);

    // 在前一个函数中判断，不需要执行当前函数
    if (ret !== false) {
      fn.apply(this, arguments);
    }
  };
}

function skill() {
  console.log("数学");
}

function skillMusic() {
  console.log("音乐");
}

function skillRun() {
  console.log("跑步");
}

var skillDecorator = decoratorBefore(skill, skillMusic);
skillDecorator = decoratorBefore(skillDecorator, skillRun);

skillDecorator(); // 跑步 音乐 数学
