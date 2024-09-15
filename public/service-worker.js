self.addEventListener('push', (event) => {
  console.log('Push event received:', event)

  let data = {}
  if (event.data) {
    data = event.data.json()
  }

  const title = data.title || 'Notification'
  const options = {
    body: data.body || 'Open application...',
    icon: 'manifest-icon-192.maskable.png',
    badge: 'manifest-icon-192.maskable.png',
    data: data.url || '/',
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification)

  event.notification.close()

  event.waitUntil(clients.openWindow(event.notification.data || '/'))
})
