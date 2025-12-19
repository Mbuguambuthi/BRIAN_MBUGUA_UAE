self.addEventListener("install", event => {
    event.waitUntil(
        caches.open("ewf-counter-v1").then(cache =>
            cache.addAll([
                "/",
                "/index.html",
                "/Styles/counter.css"
            ])
        )
    );
});

self.addEventListener("fetch", event => {
    event.respondWith(
        caches.match(event.request).then(response =>
            response || fetch(event.request)
        )
    );
});
