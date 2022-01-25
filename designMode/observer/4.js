document.title = "代理模式";

// 缓存代理,对于消耗比较高的操作进行缓存
// 缓存加法操作
// 主体
function add() {
  var arg = [].slice.call(arguments);
  return arg.reduce(function (a, b) {
    return a + b;
  });
}
// 代理
var proxyAdd = (function () {
  var cache = [];
  return function () {
    var arg = [].slice.call(arguments).join(",");
    if (cache[arg]) {
      return cache[arg];
    } else {
      return add.apply(null, arguments);
    }
  };
})();

console.log(
  add(1, 2, 3, 4),
  add(1, 2, 3, 4),
  proxyAdd(10, 20, 30, 40),
  proxyAdd(10, 20, 30, 40)
);
