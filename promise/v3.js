document.title = "链式调用";

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
  let promise2;
  switch (self.status) {
    case STATUS_TERM.PENDING:
      promise2 = new myPromise((resolve, reject) => {
        self.onFullfilledArray.push(function () {
          try {
            let temple = onFullfilled(self.value);
            resolve(temple);
          } catch (e) {
            reject(e); //error catch
          }
        });
        self.onRejectedArray.push(function () {
          try {
            let temple = onRejected(self.reason);
            reject(temple);
          } catch (e) {
            reject(e); // error catch
          }
        });
      });

      break;
    case STATUS_TERM.REJECTED:
      promise2 = new myPromise(function (resolve, reject) {
        try {
          let temple = onFullfilled(self.value);
          //将上次一then里面的方法传递进下一个Promise的状态
          resolve(temple);
        } catch (e) {
          reject(e); //error catch
        }
      });
      break;
    case STATUS_TERM.REJECTED:
      promise2 = new myPromise(function (resolve, reject) {
        try {
          let temple = onRejected(self.reason);
          //将then里面的方法传递到下一个Promise的状态里
          resolve(temple);
        } catch (e) {
          reject(e);
        }
      });
      break;
    default:
  }
  return promise2;
};
var p = new myPromise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 300);
});
p.then(function (x) {
  console.log("s_1", x);
}).then((e) => {
  console.log("s_2", e);
});

//第二阶段，可处理异步,已实现链式调用
var p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(2);
  }, 300);
});
