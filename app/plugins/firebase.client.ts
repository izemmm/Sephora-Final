import { defineNuxtPlugin } from '#app'
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'

export default defineNuxtPlugin((nuxtApp) => {
  // Senin verdiğin GERÇEK ayarlar
  const firebaseConfig = {
    apiKey: "AIzaSyC0f37SFaytuQasCYivzzGnGcl1xvZ4f3k",
    authDomain: "sephora-final-30172.firebaseapp.com",
    projectId: "sephora-final-30172",
    storageBucket: "sephora-final-30172.firebasestorage.app",
    messagingSenderId: "567702651968",
    appId: "1:567702651968:web:ffa05b3d9a214e87368ba5"
  }

  // Firebase daha önce başlatılmadıysa başlat
  const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]
  const auth = getAuth(app)

  // Uygulamanın her yerinden erişebilmek için 'auth'u sunuyoruz
  return {
    provide: {
      auth
    }
  }
})