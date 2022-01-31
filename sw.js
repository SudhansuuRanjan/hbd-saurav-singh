var GHPATH = '/hbd-saurav-singh';
var APP_PREFIX = 'hbdss_';
var VERSION = 'version_002';
var URLS = [    
  `${GHPATH}/`,
  `${GHPATH}/index.html`,
  `${GHPATH}/css/styles.css`,
  `${GHPATH}/img/icon.png`,
  `${GHPATH}/img/img1.jpg`,
  `${GHPATH}/img/img2.jpg`,
  `${GHPATH}/img/img3.jpg`,
  `${GHPATH}/img/img4.jpg`,
  `${GHPATH}/img/img5.jpg`,
  `${GHPATH}/img/img6.jpg`,
  `${GHPATH}/img/img7.jpg`,
  `${GHPATH}/img/img8.jpg`,
  `${GHPATH}/img/img9.jpg`,
  `${GHPATH}/img/img10.jpg`,
  `${GHPATH}/img/img11.jpg`,
  `${GHPATH}/img/img12.jpg`,
  `${GHPATH}/img/img13.jpg`,
  `${GHPATH}/img/img14.jpg`,
  `${GHPATH}/js/app.js`
]

var CACHE_NAME = APP_PREFIX + VERSION
self.addEventListener('fetch', function (e) {
  console.log('Fetch request : ' + e.request.url);
  e.respondWith(
    caches.match(e.request).then(function (request) {
      if (request) { 
        console.log('Responding with cache : ' + e.request.url);
        return request
      } else {       
        console.log('File is not cached, fetching : ' + e.request.url);
        return fetch(e.request)
      }
    })
  )
})

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log('Installing cache : ' + CACHE_NAME);
      return cache.addAll(URLS)
    })
  )
})

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      var cacheWhitelist = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX)
      })
      cacheWhitelist.push(CACHE_NAME);
      return Promise.all(keyList.map(function (key, i) {
        if (cacheWhitelist.indexOf(key) === -1) {
          console.log('Deleting cache : ' + keyList[i] );
          return caches.delete(keyList[i])
        }
      }))
    })
  )
})