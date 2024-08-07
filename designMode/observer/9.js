document.title = "享元模式";

/**
 * 运用共享技术来有效支持大量细粒度的对象。
 * 强调将对象的属性划分为内部状态（属性）与外部状态（属性）。内部状态用于对象的共享，通常不变；而外部状态则剥离开来，由具体的场景决定。
 */
// 健康测量
function Fitness(name, sex, age, height, weight) {
  this.name = name;
  this.sex = sex;
  this.age = age;
  this.height = height;
  this.weight = weight;
}

// 开始评判
Fitness.prototype.judge = function() {
  var ret = this.name + ': ';

  if (this.sex === 'male') {
      ret += this.judgeMale();
  } else {
      ret += this.judgeFemale();
  }

  console.log(ret);
};

// 男性评判规则
Fitness.prototype.judgeMale = function() {
  var ratio = this.height / this.weight;

  return this.age > 20 ? (ratio > 3.5) : (ratio > 2.8);
};

// 女性评判规则
Fitness.prototype.judgeFemale = function() {
  var ratio = this.height / this.weight;
  
  return this.age > 20 ? (ratio > 4) : (ratio > 3);
};


var a = new Fitness('A', 'male', 18, 160, 80);
var b = new Fitness('B', 'male', 21, 180, 70);
var c = new Fitness('C', 'female', 28, 160, 80);
var d = new Fitness('D', 'male', 18, 170, 60);
var e = new Fitness('E', 'female', 18, 160, 40);

// 开始评判
a.judge(); // A: false
b.judge(); // B: false
c.judge(); // C: false
d.judge(); // D: true
e.judge(); // E: true