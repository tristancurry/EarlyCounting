let CACHE_NAME = 'counting-cache-t00W';
let urlsToCache = [
	'index.html',
	'manifest.json',
	'css/styles.css',
	'css/layout.css',
	'assets/images/apple.png',
	'assets/audio/zero.mp3',
	'assets/audio/one.mp3',
	'assets/audio/two.mp3',
	'assets/audio/three.mp3',
	'assets/audio/four.mp3',
	'assets/audio/five.mp3',
	'assets/audio/six.mp3',
	'assets/audio/seven.mp3',
	'assets/audio/eight.mp3',
	'assets/audio/nine.mp3',
	'scripts/swHandling.js',
	'scripts/app.js',
	'scripts/setup.js',
];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then(
          function(response) {
            // Check if we received a valid response
            if(!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // IMPORTANT: Clone the response. A response is a stream
            // and because we want the browser to consume the response
            // as well as the cache consuming the response, we need
            // to clone it so we have two streams.
            var responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then(function(cache) {
                cache.put(event.request, responseToCache);
              });

            return response;
          }
        );
      })
    );
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames){
			return Promise.all(
				cacheNames.filter(function(cacheName){
					return cacheName.startsWith('counting-') && cacheName != CACHE_NAME;
				}).map(function(cacheName){
					return caches.delete(cacheName);
				})
			)
		})
	);


});

self.addEventListener('message', function(event){
	if(event.data.action == 'skipWaiting'){
		self.skipWaiting();
	}
});
