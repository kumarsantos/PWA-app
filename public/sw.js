let cacheData = "appV1";

///step to cache the routes
this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(cacheData).then((cached) => {
      cached.addAll([
        "/static/js/main.chunk.js",
        "/static/js/0.chunk.js",
        "/static/js/bundle.js",
        "/index.html",
        "/users",
        "/about",
        "/",
      ]);
    })
  );
});

//getting file from caches
this.addEventListener("fetch", (event) => {
  //this below if check the main chunk url and prevent infinite notification
  //same code can be moved to show notification during offline mode
  if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
    event.waitUntil(
      this.registration.showNotification("Internet", {
        body: "internet not working",
      })
    );
  }

  //if offline then fetch from serviceWorker or cache
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((resp) => {
        if (resp) {
          return resp;
        }
        //this will triggered re-render for request, because above code wont let re-render
        let requestUrl = event.request.clone();
        return fetch(requestUrl);
      })
    );
  }
});
