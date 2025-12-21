<script setup lang="ts">
import { ref } from 'vue'
// Firebase kütüphanelerini import ediyoruz
import { initializeApp, getApps } from 'firebase/app'
import { fetchSignInMethodsForEmail, signInWithEmailAndPassword, getAuth } from 'firebase/auth'

const router = useRouter()

// --- 1. FIREBASE BAŞLATMA (AYNI ANAHTARLARI BURAYA DA KOYDUK) ---
const firebaseConfig = {
  apiKey: "AIzaSyC0f37SFaytuQasCYivzzGnGcl1xvZ4f3k",
  authDomain: "sephora-final-30172.firebaseapp.com",
  projectId: "sephora-final-30172",
  storageBucket: "sephora-final-30172.firebasestorage.app",
  messagingSenderId: "567702651968",
  appId: "1:567702651968:web:ffa05b3d9a214e87368ba5"
};

// Uygulama başlatılmadıysa başlat
if (getApps().length === 0) {
  initializeApp(firebaseConfig);
}
// ----------------------------------------------------------------

const email = ref('')
const password = ref('')
const step = ref(1) // 1: Email Sor, 2: Şifre Sor
const isLoading = ref(false)
const errorMessage = ref('')

const checkEmail = async () => {
  if (!email.value) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    // getAuth() kullanarak yetkiyi alıyoruz
    const auth = getAuth()
    
    // Firebase'e soruyoruz: Bu mail var mı?
    console.log("Mail kontrol ediliyor:", email.value)
    const methods = await fetchSignInMethodsForEmail(auth, email.value)
    console.log("Bulunan yöntemler:", methods)

    if (methods.length > 0) {
      // Yöntem geldiyse KULLANICI VARDIR -> Şifre Sor
      step.value = 2
    } else {
      // Yöntem boşsa KULLANICI YOKTUR -> Kayıta Git
      console.log("Kullanıcı bulunamadı, kayıt sayfasına gidiliyor...")
      await navigateTo(`/register?email=${email.value}`)
    }
  } catch (error: any) {
    console.error("Hata:", error)
    // Eğer güvenlik ayarı (Enumeration) açıksa hata verebilir, yine de Register'a atalım
    await navigateTo(`/register?email=${email.value}`)
  } finally {
    isLoading.value = false
  }
}

const handleLogin = async () => {
  if (!password.value) return
  isLoading.value = true
  errorMessage.value = ''

  try {
    const auth = getAuth()
    await signInWithEmailAndPassword(auth, email.value, password.value)
    // Başarılıysa anasayfaya
    router.push('/')
  } catch (error: any) {
    console.error("Giriş Hatası:", error)
    if (error.code === 'auth/wrong-password') {
      errorMessage.value = "Şifre hatalı, lütfen kontrol et."
    } else {
      errorMessage.value = "Giriş yapılamadı. Bilgilerini kontrol et."
    }
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-wrapper">
    <div class="login-card">
      
      <h1 class="login-title">Giriş yap / Üye ol</h1>
      <p class="login-subtitle">
        {{ step === 1 ? 'Giriş yapmak ya da üye olmak için email adresini gir' : 'Lütfen şifreni gir' }}
      </p>

      <form @submit.prevent="step === 1 ? checkEmail() : handleLogin()" class="login-form">
        
        <div v-if="step === 1" class="input-group">
          <input 
            type="email" 
            v-model="email" 
            placeholder="Email*" 
            required
            class="email-input"
            :disabled="isLoading"
          />
          <button type="submit" class="ok-btn" :disabled="isLoading">
            {{ isLoading ? '...' : 'OK' }}
          </button>
        </div>

        <div v-else class="password-group">
          <div class="email-display">
            <span>{{ email }}</span>
            <button type="button" @click="step = 1" class="change-btn">(Değiştir)</button>
          </div>
          
          <input 
            type="password" 
            v-model="password" 
            placeholder="Şifre*" 
            required
            class="full-input"
          />
          
          <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

          <div class="actions">
             <button type="submit" class="submit-btn" :disabled="isLoading">
               {{ isLoading ? 'GİRİŞ YAPILIYOR...' : 'GİRİŞ YAP' }}
             </button>
             <a href="#" class="forgot-pass">Şifreni mi unuttun?</a>
          </div>
        </div>

        <p class="legal-text">
          Kişisel verileriniz, KVK Politikası ve mevzuatına uygun olarak Sephora tarafından yurtdışına aktarılabilir.
        </p>
        <p class="required-note">*Zorunlu alan</p>

        <div class="info-text">
          Sephora'nın avantajlarla dolu dünyasına katılarak, güzellik ipuçları, sürprizler ve sana özel fırsatlardan yararlanabilirsin.
        </div>

      </form>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');

.login-wrapper {
  background-color: #F2F2F2;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 160px;
  padding-bottom: 60px;
  font-family: 'Inter', sans-serif;
}

.login-card {
  background-color: white;
  width: 100%;
  max-width: 600px;
  padding: 50px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  height: fit-content;
}

.login-title { font-size: 24px; font-weight: 700; color: #000; margin-bottom: 20px; }
.login-subtitle { font-size: 16px; color: #333; margin-bottom: 25px; }

.input-group { display: flex; margin-bottom: 25px; height: 50px; }
.email-input { 
  flex: 1; 
  background-color: #F6F6F6; 
  border: 1px solid #ccc; 
  border-right: none; 
  padding: 15px; 
  font-size: 14px; 
  outline: none; 
}
.ok-btn { 
  background-color: #000; 
  color: white; 
  border: none; 
  padding: 0 30px; 
  font-weight: 700; 
  font-size: 14px; 
  cursor: pointer; 
}

.password-group { display: flex; flex-direction: column; gap: 15px; margin-bottom: 25px; }
.email-display { font-size: 14px; color: #666; margin-bottom: 5px; }
.change-btn { background: none; border: none; text-decoration: underline; cursor: pointer; color: #000; font-size: 12px; margin-left: 5px; }
.full-input { width: 100%; background-color: #F6F6F6; border: 1px solid #ccc; padding: 15px; font-size: 14px; outline: none; box-sizing: border-box; }

.submit-btn { width: 100%; background-color: #000; color: white; padding: 15px; font-weight: 700; border: none; cursor: pointer; margin-top: 10px; }
.submit-btn:hover { opacity: 0.9; }

.error-msg { color: red; font-size: 13px; font-weight: 600; }
.forgot-pass { font-size: 12px; color: #666; text-decoration: underline; text-align: right; display: block; margin-top: 5px; }
.legal-text, .info-text { font-size: 12px; color: #666; line-height: 1.5; margin-bottom: 15px; }
.required-note { font-size: 12px; color: #999; margin-bottom: 20px; }
</style>