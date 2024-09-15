import React, { useState, useCallback } from 'react'
import { serviceWorkerRegistration } from './serviceWorkerRegistration'
import vapidKeys from '../vapid-keys.json'

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/')

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

const PushNotification = () => {
  const [isSubscribed, setIsSubscribed] = useState(false)

  const subscribeUser = useCallback(async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      try {
        const permission = await Notification.requestPermission()
        if (permission !== 'granted') {
          alert('Permission defied for notifications')
          return
        }

        const applicationServerKey = urlBase64ToUint8Array(vapidKeys.publicKey)
        const subscription = await serviceWorkerRegistration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey,
        })

        const result = await fetch('/subscribe', {
          method: 'POST',
          body: JSON.stringify(subscription.toJSON()),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (result.ok) {
          setIsSubscribed(true)
          console.log('Subscribed for push notifications')
        }
      } catch (error) {
        console.error('Subscription failed:', error)
      }
    }
  }, [])

  return (
    <div>
      <button onClick={subscribeUser} disabled={isSubscribed}>
        {isSubscribed ? 'Subscribed' : 'Enable push notifications'}
      </button>
    </div>
  )
}

export default PushNotification
