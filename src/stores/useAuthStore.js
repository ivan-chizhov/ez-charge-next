import { create } from 'zustand'
import vapidKeys from '../../vapid-keys.json'
import { serviceWorkerRegistration } from '../serviceWorkerRegistration'
import { fetchJson, getJsonMessage } from '../utils/fetch'

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const useAuthStore = create((set, get) => ({
  isLoggedIn: !!localStorage.getItem('gpn'),
  gpn: localStorage.getItem('gpn'),
  error: null,
  clearError: () => {
    set({ error: null })
  },
  login: async ({ gpn, password }, onSuccess = undefined, onError = undefined) => {
    if (!gpn) {
      set({ error: 'No GPN provided' })
      return
    }

    const [response, json] = await fetchJson(`/api/users/${gpn}/login`, { password })
    if (!response.ok) {
      set({ error: getJsonMessage(json) || 'Error logging in' })
      return
    }

    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        const applicationServerKey = urlBase64ToUint8Array(vapidKeys.publicKey)
        const subscription = await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        })

        const [subscribeResponse, subscribeJson] = await fetchJson(`/api/users/${gpn}/subscribe`, subscription.toJSON())
        if (!subscribeResponse.ok) {
          set({ error: getJsonMessage(subscribeJson) || 'Error subscribing to notifications' })
          return
        }
      }
    }

    localStorage.setItem('gpn', gpn)
    set({ isLoggedIn: true, gpn })
  },
  logout: async () => {
    if (serviceWorkerRegistration) {
      const subscription = await serviceWorkerRegistration.pushManager.getSubscription()
      if (subscription) {
        const [unsubscribeResponse, unsubscribeJson] = await fetchJson(
          `/api/users/${get().gpn}/unsubscribe`,
          subscription.toJSON()
        )
        if (!unsubscribeResponse.ok) {
          set({ error: getJsonMessage(unsubscribeJson) || 'Error unsubscribing from notifications' })
          return
        }
      }
    }

    localStorage.removeItem('gpn')
    set({ isLoggedIn: false, gpn: null })
  },
}))

export default useAuthStore
