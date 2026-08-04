/*****************************************************************
 * KOLEKSI LIRIK LAGU
 * File      : sw.js
 * Versi     : 1.0.0
 * Developer : Selsires Kirihio
 *****************************************************************/

const CACHE_NAME = "koleksi-lirik-v1";

const FILES_TO_CACHE = [
  "/lirik-lagu-rohani/",
  "/lirik-lagu-rohani/index.html",
  "/lirik-lagu-rohani/manifest.json",
  "/lirik-lagu-rohani/css/style.css",
  "/lirik-lagu-rohani/js/app.js",
  "/lirik-lagu-rohani/icons/icon-192.png",
  "/lirik-lagu-rohani/icons/icon-512.png"
];

//==================================================
// INSTALL
//==================================================

self.addEventListener("install", event => {

  console.log("Service Worker : Install");

  event.waitUntil(

    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_CACHE))

  );

  self.skipWaiting();

});

//==================================================
// ACTIVATE
//==================================================

self.addEventListener("activate", event => {

  console.log("Service Worker : Activate");

  event.waitUntil(

    caches.keys().then(keys => {

      return Promise.all(

        keys.map(key => {

          if (key !== CACHE_NAME) {

            return caches.delete(key);

          }

        })

      );

    })

  );

  self.clients.claim();

});

//==================================================
// FETCH
//==================================================

self.addEventListener("fetch", event => {

  if (event.request.method !== "GET") {
    return;
  }

  event.respondWith(

    caches.match(event.request)

      .then(response => {

        if (response) {
          return response;
        }

        return fetch(event.request)

          .then(networkResponse => {

            if (
              !networkResponse ||
              networkResponse.status !== 200
            ) {
              return networkResponse;
            }

            const clone = networkResponse.clone();

            caches.open(CACHE_NAME)

              .then(cache => {

                cache.put(event.request, clone);

              });

            return networkResponse;

          })

          .catch(() => {

            return caches.match("/lirik-lagu-rohani/index.html");

          });

      })

  );

});
