document.title = "初始版本";

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

  function resolve(value) {
    if (self.status === STATUS_TERM.PENDING) {
      self.status = STATUS_TERM.RESOLVED;
      self.value = value;
    }
  }
  function reject(reason) {
    if (self.status === STATUS_TERM.PENDING) {
      self.status = STATUS_TERM.REJECTED;
      self.reason = reason;
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
    case STATUS_TERM.RESOLVED:
      onFullfilled(self.value);
      break;
    case STATUS_TERM.REJECTED:
      onRejected(self.reason);
      break;
    default:
  }
};
var p = new myPromise(function (resolve, reject) {
  resolve(1);
});
p.then(function (x) {
  console.log(x);
});

//第一阶段，尚无法处理异步
