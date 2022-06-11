let CACHE_NAME = 'counting-cache-t01s';
let urlsToCache = [
	'index.html',
	'manifest.json',
	'css/styles.css',
	'css/layout.css',
	'assets/images/apple.png',
	'assets/images/favicon.png',
	'assets/audio/voice_000.mp3',
	'assets/audio/voice_001.mp3',
	'assets/audio/voice_002.mp3',
	'assets/audio/voice_003.mp3',
	'assets/audio/voice_004.mp3',
	'assets/audio/voice_005.mp3',
	'assets/audio/voice_006.mp3',
	'assets/audio/voice_007.mp3',
	'assets/audio/voice_008.mp3',
	'assets/audio/voice_009.mp3',
	'assets/audio/voice_010.mp3',
	'assets/audio/voice_011.mp3',
	'assets/audio/voice_012.mp3',
	'assets/audio/voice_013.mp3',
	'assets/audio/voice_014.mp3',
	'assets/audio/voice_015.mp3',
	'assets/audio/voice_016.mp3',
	'assets/audio/voice_017.mp3',
	'assets/audio/voice_018.mp3',
	'assets/audio/voice_019.mp3',
	'assets/audio/voice_020.mp3',
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
