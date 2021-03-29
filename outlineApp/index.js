console.log("网络状态：", navigator.onLine ? "在线" : "离线");
window.addEventListener(
  "online",
  function () {
    console.log("您已上线");
  },
  false
);
window.addEventListener(
  "offline",
  function () {
    console.log("您已下线");
  },
  false
);

if (navigator.serviceWorker) {
  window.addEventListener("load", function () {
    navigator.serviceWorker
      .register("./serviceWorker.js", { scope: "./" })
      .then(function (registration) {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration.scope
        );
      })
      .catch(function (err) {
        console.log("ServiceWorker registration failed: ", err);
      });
  });
}
