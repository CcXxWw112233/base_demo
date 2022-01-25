// 单例模式
document.title = '单例模式'
function SetManager(name) {
  this.manager = name
}
SetManager.prototype.getName = function() {
  return this.manager
}
var SingletonSetManager = (function() {
  var manager = null
  return function(name) {
    if(!manager) {
      manager = new SetManager(name)
    }
    return manager
  }
})()
console.log(SingletonSetManager('a').getName()) // a
console.log(SingletonSetManager('b').getName()) // a
console.log(SingletonSetManager('c').getName()) // a

// ====> 继续抽

// 提取出通用的单例
function getSingleton(fn) {
  var instance = null
  return function() {
    if (!instance) {
      instance = fn.apply(null, arguments)
    }
    return instance
  }
}
var managerSingleton  = getSingleton(function(name) {
  var manager = new SetManager(name)
  return manager
})

console.log(managerSingleton('d').getName())
console.log(managerSingleton('e').getName())