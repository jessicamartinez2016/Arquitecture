;
const CACHE_NAME='V1_cache_Construccion';
urlsToCache = [
    './',
    './img/favicon-16x16.png',
    './manifest.json',
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,600;1,700&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Work+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&display=swap',
    'assets/vendor/bootstrap/css/bootstrap.min.css',
    'assets/vendor/bootstrap-icons/bootstrap-icons.css',
    'assets/vendor/fontawesome-free/css/all.min.css',
    'assets/vendor/aos/aos.css',
    'assets/vendor/glightbox/css/glightbox.min.css',
    'assets/vendor/swiper/swiper-bundle.min.css',
    'assets/css/main.css',
    './script.js'
]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache =>{
          return cache.addAll(urlsToCache)
          .then(()=>self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

self.addEventListener('activate', e =>{
    const cacheWhitelist = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames =>{
            return Promise.all(
                cacheNames.map(cacheName =>{
                    if (cacheWhitelist.indexOf(cacheName)=== -1){
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        .then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', e => {
   e.respondWith(
    caches.match(e.request)
    .then(res => {
        if(res){
            return res
        }
           return fetch(e.request)
    })
   )
})