document.title = "命令模式";

function IncrementCommand() {
  // 当前值
  this.value = 0;
  // 命令栈
  this.stack = [];
  // 栈指针位置
  this.stackPosition = -1;
}

IncrementCommand.prototype = {
  constructor: IncrementCommand,
  // 执行
  execute: function () {
    this.clearRedo();
    // 定义执行的处理
    var command = function () {
      this.value += 2;
    }.bind(this);
    // 执行
    command();
    // 缓存起来
    this.stack.push(command);
    this.stackPosition++;
    this.getValue();
  },
  // 撤销
  undo() {
    if (!this.canUndo()) {
      return;
    }
    this.stackPosition--;
    // 命令的撤销，与执行的处理相反
    var command = function () {
      this.value -= 2;
    }.bind(this);
    // 撤销后不需要缓存
    command();
    this.getValue();
  },
  redo() {
    if (!this.canRedo()) {
      return;
    }
    this.stack[++this.stackPosition]();
    this.getValue();
  },
  // 在执行时，已经撤销的部分不能再重做
  clearRedo() {
    this.stack = this.stack.slice(0, this.stackPosition + 1);
  },
  canUndo() {
    return this.stackPosition >= 0;
  },
  canRedo() {
    return this.stackPosition < this.stack.length - 1;
  },
  getValue() {
    console.log(this.value);
    return this.value;
  },
};

var incrementCommand = new IncrementCommand();
// 模拟事件触发，执行命令
var eventTrigger = {
  increment() {
    incrementCommand.execute();
  },
  incrementUndo() {
    incrementCommand.undo();
  },
  incrementRedo() {
    incrementCommand.redo();
  },
};

eventTrigger["increment"](); // 2
eventTrigger["increment"](); // 4
eventTrigger["incrementUndo"](); // 2
eventTrigger["increment"](); // 4
eventTrigger["incrementUndo"](); // 2
eventTrigger["incrementUndo"](); // 0
eventTrigger["incrementUndo"](); // 无输出
eventTrigger["incrementRedo"](); // 2
eventTrigger["increment"](); // 4
eventTrigger["incrementRedo"](); // 无输出
eventTrigger["increment"](); // 6
