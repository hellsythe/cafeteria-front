export class SaveOfflineRequest {
  async save(request: Request) {
    // const storedRequests = await (await caches.open('offline-requests')).match('offline-requests') || [];
    // storedRequests.push({ url: request.url, options: { method: request.method, headers: request.headers, body: request.body } });
    // await caches.open('offline-requests').then(cache => cache.put('offline-requests', new Response(JSON.stringify(storedRequests))));
  }
}