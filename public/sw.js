self.addEventListener('install', () => {
  console.log('service worker installed')
});

self.addEventListener('activate', () => {
  console.log('service worker activated')
});

self.addEventListener("fetch", (event) => {
  if (event.request.method === "POST") {
    console.log("Fetch event for:", event.request.url);
  }
});