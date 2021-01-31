var Observer = (function () {
  var _message = {};
  return {
    //注册订阅信息
    register: function (type, fn) {
      //如果该消息类型尚未存在则先创建一个消息类型
      if (typeof _message[type] === "undefined") {
        _message[type] = [fn];
      } else {
        //如果此消息类型存在了，则向该类型的消息序列中推入一条执行方法
        _message[type].push(fn);
      }
    },
    //取消订阅信息
    remove: function (type, fn) {
      //如果该消息动作队列存在
      if (_message[type] instanceof Array) {
        var i = _message[type].length - 1;
        for (; i >= 0; i--) {
          //如果该动作存在则在消息动作序列中移除相应动作
          _message[type][i] == fn && _message[type].splice(i, 1);
        }
      }
    },
    //发送订阅信息
    send: function (type, args) {
      //校验当前消息队列中有没有注册该类型
      if (!_message[type]) return;
      //定义消息信息
      var events = {
        type: type,
        args: args || {},
      };
      i = 0;
      len = _message[type].length;
      //遍历消息动作
      for (; i < len; i++) {
        //依次执行注册消息对应的动
        _message[type][i].call(this, events);
      }
    },
  };
})();

var fn_1 = function (param) {
  console.log("type_1_1", param);
};
var fn_2 = function (param) {
  console.log("type_1_2", param);
};
var fn_3 = function (param) {
  console.log("type_2_1", param);
};
var fn_4 = function (param) {
  console.log("type_2_2", param);
};
Observer.register("type_1", fn_1);
Observer.register("type_1", fn_2);

Observer.register("type_2", fn_3);
Observer.register("type_2", fn_4);

Observer.remove("type_2", fn_4);

Observer.send("type_1", "吃饭啦！");
Observer.send("type_2", "唱k啦");
