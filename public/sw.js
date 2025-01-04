self.addEventListener('install', () => {
  console.log('service worker installed')
});

self.addEventListener('activate', () => {
  console.log('service worker activated')
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  if (request.method === "POST") {
    event.respondWith(
      handlePostRequest(request.clone())
    );
  }
});

const CACHE_NAME = 'offline-posts';


async function handlePostRequest(request) {
  // if (!navigator.onLine) {
  console.log('Offline');
  if (true) {
    const body = await request.clone().text();
console.log(body);
    // const storedRequests = await (await caches.open(CACHE_NAME)).match('offline-requests') || [];
    // storedRequests.push({ url: request.url, options: { method: request.method, headers: request.headers, body } });
    // await caches.open(CACHE_NAME).then(cache => cache.put('offline-requests', new Response(JSON.stringify(storedRequests))));

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  return fetch(request);
}

self.addEventListener('sync', event => {
  if (event.tag === 'sync-offline-posts') {
    event.waitUntil(sendStoredRequests());
  }
});

async function sendStoredRequests() {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match('offline-requests');
  if (!response) return;

  const requests = await response.json();

  for (const { url, options } of requests) {
    try {
      await fetch(url, options);
      requests.splice(requests.indexOf({ url, options }), 1);
    } catch (error) {
      console.error('Failed to send request:', error);
    }
  }

  await cache.put('offline-requests', new Response(JSON.stringify(requests)));
}

// Listeners para verificar la conectividad
self.addEventListener('online', () => {
  self.registration.sync.register('sync-offline-posts');
});

self.addEventListener('message', event => {
  if (event.data === 'online') {
    self.registration.sync.register('sync-offline-posts');
  }
});