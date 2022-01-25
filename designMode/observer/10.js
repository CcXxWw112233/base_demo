document.title = "职责链模式";

/**
 * 请求发送者只需要知道链中的第一个节点，弱化发送者和一组接收者之间的强联系，可以便捷地在职责链中增加或删除一个节点，同样地，指定谁是第一个节点也很便捷
 */

// 实现 以展示不同类型的变量为例，设置一条职责链，可以免去多重if条件分支

function ChainItem(fn) {
  this.fn = fn;
  this.next = null;
}

ChainItem.prototype = {
  constructor: ChainItem,
  // 设置下一项
  setNext(next) {
    this.next = next;
    return next;
  },
  // 开始执行
  start() {
    this.fn.apply(this, arguments);
  },
  toNext() {
    if (this.next) {
      this.start.apply(this.next, arguments);
    } else {
      console.log("无匹配的执行项目");
    }
  },
};

// 展示数字
function showNumber(num) {
  if (typeof num === "number") {
    console.log("number", num);
  } else {
    // 转移到下一项
    this.toNext(num);
  }
}

// 展示字符串
function showString(str) {
  if (typeof str === "string") {
    console.log("string", str);
  } else {
    this.toNext(str);
  }
}

// 展示对象
function showObject(obj) {
  if (typeof obj === "object") {
    console.log("object", obj);
  } else {
    this.toNext(obj);
  }
}
var chainNumber = new ChainItem(showNumber);
var chainString = new ChainItem(showString);
var chainObject = new ChainItem(showObject);
// 设置链条
chainObject.setNext(chainNumber).setNext(chainString);

chainString.start('12'); // string 12
chainNumber.start({}); // 无匹配的执行项目
chainObject.start({}); // object {}
chainObject.start(123); // number 123