<script setup lang="ts">
import { ref, onMounted } from 'vue'
// Firebase importlarını kaldırdık, çünkü artık Store kullanıyoruz
import { useUserStore } from '~/stores/userStore'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore() // Store'u çağırdık

// Form Verileri
const form = ref({
  name: '',
  surname: '',
  email: '',
  password: '',
  phone: '',
  birthDate: '',
  gender: 'kadın',
  cardNumber: ''
})

const isLoyaltyMember = ref<string | null>(null)
const agreements = ref({
  contract: false,
  email: false,
  sms: false,
  dataProcessing: false
})

const isLoading = ref(false)
const errorMessage = ref('')
const showPassword = ref(false)

onMounted(() => {
  if (route.query.email) {
    form.value.email = route.query.email as string
  }
})

const goBackToLogin = () => {
  router.push('/login')
}

const handleRegister = async () => {
  // Sadece "Hayır" seçiliyse kayıt işlemi
  if (isLoyaltyMember.value === 'hayir') {
    // Zorunlu alan kontrolü
    if (!form.value.password || !form.value.name || !form.value.surname || !agreements.value.contract) {
      errorMessage.value = "Lütfen zorunlu alanları (*) ve Üyelik Sözleşmesini onaylayın."
      return
    }

    isLoading.value = true
    errorMessage.value = ''

    try {
      // --- BURASI DEĞİŞTİ: ARTIK STORE KULLANIYORUZ ---
      // userStore içindeki registerUser fonksiyonu hem Auth kaydını yapıyor
      // hem de 'users' koleksiyonuna verileri yazıyor.
      await userStore.registerUser(form.value)
      
      console.log("Kayıt başarılı")
      router.push('/')
      
    } catch (error: any) {
      console.error("Kayıt Hatası Detayı:", error)
      if (error.code === 'auth/email-already-in-use') errorMessage.value = "Bu e-posta adresi zaten kullanımda."
      else if (error.code === 'auth/weak-password') errorMessage.value = "Şifreniz çok zayıf (En az 6 karakter)."
      else errorMessage.value = "Kayıt hatası: " + error.message
    } finally {
      isLoading.value = false
    }
  } else {
    // "Evet" seçiliyse
    alert("Kart numarası ile eşleştirme işlemi yapılacak.")
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="register-card">
      
      <h1 class="page-title">Üye ol</h1>

      <div class="email-row">
        <span class="email-text">{{ form.email }}</span>
        <span class="chevron">›</span>
        <button @click="goBackToLogin" class="edit-btn">Düzenle</button>
      </div>

      <div class="loyalty-box">
        <h3 class="section-title">Sephora Sadakat Programı üyesi misin?</h3>
        <p class="section-desc">Kolayca Sephora Sadakat Programı üyesi olup tüm ayrıcalıklardan yararlanabilirsin.</p>

        <div class="radio-options main-radios">
          <label class="radio-item">
            <input type="radio" value="evet" v-model="isLoyaltyMember">
            <span class="radio-label">Evet</span>
          </label>
          <label class="radio-item">
            <input type="radio" value="hayir" v-model="isLoyaltyMember">
            <span class="radio-label">Hayır</span>
          </label>
        </div>
      </div>

      <div v-if="isLoyaltyMember === 'evet'" class="form-section fade-in">
        <h3 class="section-title">Kişisel bilgiler</h3>
        
        <input type="text" v-model="form.cardNumber" placeholder="Kart numarası*" class="grey-input full" />
        
        <div class="phone-group">
          <div class="country-code">🇹🇷 +90 ⌄</div>
          <input type="tel" v-model="form.phone" placeholder="Telefon Numarası*" class="grey-input phone-input" />
        </div>

        <div class="info-alert">
          <span class="info-icon">!</span>
          <p>Sana iletilen Sephora emaillerinden Sephora kart numaranı öğrenebilirsin.</p>
        </div>

        <button class="submit-btn gray-btn">ÜYE OL</button>
      </div>

      <div v-if="isLoyaltyMember === 'hayir'" class="form-section fade-in">
        <h3 class="section-title">Kişisel bilgiler</h3>

        <div class="gender-section">
          <label class="input-label">Cinsiyet*</label>
          <div class="radio-options">
            <label class="radio-item">
              <input type="radio" value="kadın" v-model="form.gender">
              <span class="radio-label">Kadın</span>
            </label>
            <label class="radio-item">
              <input type="radio" value="erkek" v-model="form.gender">
              <span class="radio-label">Erkek</span>
            </label>
          </div>
        </div>

        <input type="text" v-model="form.surname" placeholder="Soyad*" class="grey-input full" />
        <input type="text" v-model="form.name" placeholder="Ad*" class="grey-input full" />
        
        <div class="password-wrapper">
          <input :type="showPassword ? 'text' : 'password'" v-model="form.password" placeholder="Şifre*" class="grey-input full" />
          <button type="button" @click="showPassword = !showPassword" class="eye-btn">
             {{ showPassword ? 'Gizle' : 'Göster' }} 👁️
          </button>
        </div>

        <div class="password-rules">
          <p class="rule-title">Şifre içeriği:</p>
          <ul>
            <li>En az 8 karakter</li>
            <li>En az 1 küçük harf (Örn: abcd)</li>
            <li>En az 1 büyük harf (Örn: ABCD)</li>
            <li>En az 1 rakam (Örn: 1234)</li>
          </ul>
          <div class="security-bar"></div>
        </div>

        <div class="phone-group">
          <div class="country-code">🇹🇷 +90 ⌄</div>
          <input type="tel" v-model="form.phone" placeholder="Telefon Numarası*" class="grey-input phone-input" />
        </div>

        <div class="checkbox-row">
          <input type="checkbox" id="contract" v-model="agreements.contract">
          <label for="contract"><a href="#">Üyelik Sözleşmesini</a> okudum ve kabul ediyorum.*</label>
        </div>

        <input type="text" v-model="form.birthDate" placeholder="Doğum Tarihi" class="grey-input full" onfocus="(this.type='date')" />

        <div class="prefs-section">
          <h3 class="section-title">İletişim tercihleri</h3>
          <p class="prefs-desc">İletişim bilgilerime reklam, promosyon, kampanya ve benzeri ticari elektronik ileti gönderilmesini kabul ediyorum:*</p>
          
          <div class="pref-options">
            <div class="checkbox-row">
              <input type="checkbox" id="email" v-model="agreements.email">
              <label for="email">Email</label>
            </div>
            <div class="checkbox-row">
              <input type="checkbox" id="sms" v-model="agreements.sms">
              <label for="sms">SMS</label>
            </div>
          </div>

          <div class="checkbox-row top-align">
            <input type="checkbox" id="data" v-model="agreements.dataProcessing">
            <label for="data">Müşteri Aydınlatma Metni kapsamında kişisel verilerimin işlenmesini kabul ediyorum.*</label>
          </div>
        </div>

        <p v-if="errorMessage" class="error-msg">{{ errorMessage }}</p>

        <button @click="handleRegister" class="submit-btn black-btn" :disabled="isLoading">
          {{ isLoading ? 'KAYDEDİLİYOR...' : 'ÜYE OL' }}
        </button>
      </div>

      <div class="footer-content">
        <p class="legal-text">Kişisel verileriniz, KVK Politikası ve mevzuatına uygun olarak Sephora tarafından yurtdışına aktarılabilir.</p>
        <p class="required-note">*Zorunlu alan</p>
        
        <p class="marketing-text">
          Sephora'nın avantajlarla dolu dünyasına katılarak, güzellik ipuçları, sürprizler ve sana özel fırsatlardan yararlanabilirsin.
        </p>

        <div class="legal-links">
          <p class="legal-title">Kişisel verilerin kullanımı:</p>
          <p class="legal-desc">Bu formda sağlanan kişisel veriler Sephora Kozmetik A.Ş. tarafından işlenecektir.</p>
          <a href="#" class="details-link">Verilerinin kullanımı ve hakların hakkında daha fazla bilgiye buradan ulaşabilirsin. ⌄</a>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&display=swap');

.page-wrapper {
  background-color: #F2F2F2;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 140px;
  padding-bottom: 60px;
  font-family: 'Inter', sans-serif;
}

.register-card {
  background-color: white;
  width: 100%;
  max-width: 600px;
  padding: 50px;
}

.page-title { font-size: 26px; font-weight: 800; color: #000; margin-bottom: 20px; }
.email-row { font-size: 14px; color: #333; margin-bottom: 25px; display: flex; align-items: center; gap: 5px; }
.chevron { font-size: 16px; color: #666; }
.edit-btn { background: none; border: none; text-decoration: underline; cursor: pointer; color: #333; padding: 0; font-size: 14px; }

.section-title { font-size: 16px; font-weight: 700; color: #000; margin-bottom: 10px; margin-top: 20px; }
.section-desc { font-size: 13px; color: #333; margin-bottom: 15px; }
.radio-options { display: flex; gap: 30px; }
.main-radios { margin-bottom: 30px; }
.radio-item { display: flex; align-items: center; gap: 8px; cursor: pointer; font-size: 14px; }
input[type="radio"] { transform: scale(1.3); accent-color: black; }

.grey-input {
  width: 100%;
  background-color: #F6F6F6;
  border: none;
  padding: 16px;
  font-size: 14px;
  color: #000;
  outline: none;
  box-sizing: border-box;
  margin-bottom: 15px;
}
.grey-input::placeholder { color: #999; }

.phone-group { display: flex; gap: 10px; margin-bottom: 15px; }
.country-code { 
  background-color: #F6F6F6; padding: 16px; font-size: 14px; display: flex; align-items: center; white-space: nowrap; 
}
.phone-input { margin-bottom: 0; }

.info-alert {
  background-color: #F6F6F6;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}
.info-icon {
  color: #D32F2F;
  font-weight: bold;
  font-size: 20px;
  border: 2px solid #D32F2F;
  border-radius: 50%;
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
}
.info-alert p { font-size: 12px; color: #333; margin: 0; }

.password-wrapper { position: relative; }
.eye-btn {
  position: absolute; right: 15px; top: 15px; background: none; border: none; cursor: pointer; font-size: 12px; color: #666;
}
.password-rules { margin-bottom: 20px; }
.rule-title { font-size: 12px; font-weight: 700; margin-bottom: 5px; }
.password-rules ul { list-style: disc; padding-left: 20px; margin: 0; }
.password-rules li { font-size: 11px; color: #666; margin-bottom: 2px; }
.security-bar { height: 2px; background-color: #eee; margin-top: 10px; width: 100%; }

.checkbox-row { display: flex; align-items: center; gap: 10px; margin-bottom: 15px; font-size: 12px; color: #333; }
.checkbox-row.top-align { align-items: flex-start; }
.checkbox-row a { color: #000; text-decoration: underline; font-weight: 600; }
input[type="checkbox"] { transform: scale(1.1); accent-color: black; }

.submit-btn {
  width: 100%; padding: 16px; font-weight: 700; border: none; cursor: pointer; text-transform: uppercase; margin-top: 10px;
}
.gray-btn { background-color: #757575; color: white; }
.black-btn { background-color: #000; color: white; }

.legal-text, .marketing-text, .footer-content p { font-size: 11px; color: #666; line-height: 1.5; margin-bottom: 10px; }
.required-note { font-size: 11px; color: #999; margin-bottom: 20px; }
.legal-title { font-weight: 700; text-decoration: underline; margin-bottom: 5px; }
.details-link { font-size: 11px; color: #666; text-decoration: underline; }

.error-msg { color: red; font-size: 13px; font-weight: bold; margin-bottom: 10px; }
.fade-in { animation: fadeIn 0.3s ease-in; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
</style>