/*****************************************************************
 * KOLEKSI LIRIK LAGU
 * File      : sw.js
 * Versi     : 1.1.0
 * Developer : Selsires Kirihio
 *****************************************************************/

const CACHE_NAME = "koleksi-lirik-v2";

const BASE = "/lirik-lagu-rohani/";

const FILES_TO_CACHE = [
  BASE,
  BASE + "index.html",
  BASE + "manifest.json",
  BASE + "css/style.css",
  BASE + "js/app.js",
  BASE + "icons/icon-192.png",
  BASE + "icons/icon-512.png"
];


/* ==================================================
   INSTALL
================================================== */

self.addEventListener("install", event => {

  console.log("Service Worker: INSTALL");

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => {

        return cache.addAll(FILES_TO_CACHE);

      })

  );

  self.skipWaiting();

});


/* ==================================================
   ACTIVATE
================================================== */

self.addEventListener("activate", event => {

  console.log("Service Worker: ACTIVATE");

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


/* ==================================================
   FETCH
================================================== */

self.addEventListener("fetch", event => {

  const request = event.request;

  /* Hanya GET */
  if (request.method !== "GET") {
    return;
  }

  /* Hanya request HTTP/HTTPS */
  if (
    request.url.startsWith("http://") === false &&
    request.url.startsWith("https://") === false
  ) {
    return;
  }

  /* Hanya request dari origin website kita */
  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  event.respondWith(

    caches.match(request)

      .then(cachedResponse => {

        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)

          .then(networkResponse => {

            if (
              !networkResponse ||
              networkResponse.status !== 200
            ) {
              return networkResponse;
            }

            const clone =
              networkResponse.clone();

            caches.open(CACHE_NAME)

              .then(cache => {

                cache.put(request, clone);

              });

            return networkResponse;

          })

          .catch(() => {

            return caches.match(
              BASE + "index.html"
            );

          });

      })

  );

});
