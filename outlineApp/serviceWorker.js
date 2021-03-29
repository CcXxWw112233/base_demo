this.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open("v2").then(function (cache) {
      return cache.addAll(["/"]);
    })
  );
});

this.addEventListener("fetch", function (event) {
  event.respondWith(
    // magic goes here
    caches.match(event.request)
  );
});
console.log(this);
