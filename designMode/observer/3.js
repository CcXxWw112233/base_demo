document.title = '策略模式'
// 加权映射关系
var levelMap = {
  S: 10,
  A: 8,
  B: 6,
  C: 4
}
// 组策略
var scoreLevel = {
  basicScore: 80,
  S: function() {
    return this.basicScore + levelMap['S']
  },
  A: function() {
    return this.basicScore + levelMap['A']
  },
  B: function() {
    return this.basicScore + levelMap['B']
  },
  C: function() {
    return this.basicScore + levelMap['C']
  },
}
// 调用
function getScore(level) {
  return scoreLevel[level] ? scoreLevel[level]() : 0;
}
console.log(
  getScore('S'),
  getScore('A'),
  getScore('B'),
  getScore('C'),
  getScore('D')
); // 90 88 86 84 0