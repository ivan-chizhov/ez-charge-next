export let serviceWorkerRegistration = null

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js', { scope: '/' }).then(
      (registration) => {
        serviceWorkerRegistration = registration
        console.log('Service worker has been registered with scope:', registration.scope)
      },
      (error) => {
        console.log('Service worker registration failed:', error)
      }
    )
  })
}
