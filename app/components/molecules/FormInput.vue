<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '~/components/molecules/FormInput.vue'

const form = ref({
  email: '',
  password: ''
})

const handleLogin = () => {
  console.log("Giriş yapılıyor:", form.value)
  // İleride buraya Firebase giriş kodunu ekleyeceğiz
}
</script>

<template>
  <div class="login-page">
    <div class="form-container">
      
      <h1 class="page-title">GİRİŞ YAP</h1>
      <p class="subtitle">Hesabına giriş yap ve ayrıcalıkların tadını çıkar.</p>

      <form @submit.prevent="handleLogin" class="login-form">
        
        <FormInput 
          label="E-posta Adresi" 
          type="email" 
          v-model="form.email" 
          placeholder="ornek@email.com" 
        />
        
        <FormInput 
          label="Şifre" 
          type="password" 
          v-model="form.password" 
          placeholder="Şifreniz" 
        />

        <div class="forgot-password">
          <a href="#">Şifremi Unuttum</a>
        </div>

        <button type="submit" class="submit-btn">GİRİŞ YAP</button>
      
      </form>
      
      <div class="register-link">
        Hesabın yok mu? <NuxtLink to="/register">Hemen Üye Ol</NuxtLink>
      </div>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');

.login-page {
  display: flex;
  justify-content: center;
  padding: 60px 20px;
  font-family: 'Inter', sans-serif;
  background-color: #fff;
}

.form-container {
  width: 100%;
  max-width: 420px;
}

.page-title {
  font-size: 26px;
  font-weight: 800;
  text-align: center;
  margin-bottom: 10px;
  color: #000;
}

.subtitle {
  text-align: center;
  font-size: 14px;
  color: #666;
  margin-bottom: 40px;
}

.forgot-password {
  text-align: right;
  margin-bottom: 25px;
  margin-top: -10px;
}

.forgot-password a {
  font-size: 13px;
  color: #666;
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  background-color: #000;
  color: #fff;
  padding: 16px;
  font-size: 15px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s;
  text-transform: uppercase;
}

.submit-btn:hover {
  opacity: 0.9;
}

.register-link {
  margin-top: 30px;
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #eee;
  padding-top: 25px;
}

.register-link a {
  font-weight: 700;
  text-decoration: underline;
  color: #000;
  margin-left: 5px;
}
</style>