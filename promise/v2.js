document.title = "可处理异步";

const STATUS_TERM = {
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

function myPromise(constructor) {
  let self = this;
  self.status = STATUS_TERM.PENDING;
  self.value = undefined;
  self.reason = undefined;
  self.onFullfilledArray = [];
  self.onRejectedArray = [];
  function resolve(value) {
    if (self.status === STATUS_TERM.PENDING) {
      self.status = STATUS_TERM.RESOLVED;
      self.value = value;
      self.onFullfilledArray.forEach(function (f) {
        f(self.value);
      });
    }
  }
  function reject(reason) {
    if (self.status === STATUS_TERM.PENDING) {
      self.status = STATUS_TERM.REJECTED;
      self.reason = reason;
      self.onRejectedArray.forEach(function (f) {
        f(self.reason);
        //如果状态从pending变为rejected，
        //那么就遍历执行里面的异步方法
      });
    }
  }
  try {
    constructor(resolve, reject);
  } catch (e) {
    reject(e);
  }
}

myPromise.prototype.then = function (onFullfilled, onRejected) {
  let self = this;
  switch (self.status) {
    case STATUS_TERM.PENDING:
      self.onFullfilledArray.push(function () {
        onFullfilled(self.value);
      });
      self.onRejectedArray.push(function () {
        onRejected(self.reason);
      });
      break;
    case STATUS_TERM.REJECTED:
      onFullfilled(self.value);
      break;
    case STATUS_TERM.REJECTED:
      onRejected(self.reason);
      break;
    default:
  }
};
var p = new myPromise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 2000);
});
p.then(function (x) {
  console.log(x);
});

//第二阶段，可处理异步,但尚未实现链式调用
