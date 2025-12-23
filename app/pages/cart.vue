<script setup lang="ts">
import { useCartStore } from '~/stores/cart'

// 1. Store'u çağır
const cartStore = useCartStore()

// 2. Çift Header sorununu çözmek için bu sayfada boş layout kullan
definePageMeta({
  layout: 'custom'
})

// NOT: Elle 'computed' hesaplamasına gerek yok!
// cartStore.totalPrice zaten bize en doğru sonucu veriyor.
</script>

<template>
  <div class="checkout-page">
    
    <div class="top-banner">
      Black Friday Sephora Collection ile Başladı!
    </div>

    <header class="simple-header">
      <div class="header-container">
        <NuxtLink to="/" class="logo">SEPHORA</NuxtLink>
        
        <div class="steps">
          <div class="step active">
            <span class="step-num">1</span>
            <span class="step-text">Adres ve Kargo Bilgileri</span>
          </div>
          <div class="step">
            <span class="step-num inactive">2</span>
          </div>
          <div class="step">
            <span class="step-num inactive">3</span>
          </div>
        </div>
      </div>
    </header>

    <div class="main-content">
      
      <div class="left-col">
        <div class="cart-box">
          <h2>Sepet ({{ cartStore.items.length }})</h2>
          
          <div v-if="cartStore.items.length === 0" class="empty-state">
            <p>Sepetin şu an boş.</p>
            <NuxtLink to="/" class="continue-link">Alışverişe Devam Et</NuxtLink>
          </div>

          <div v-else class="cart-list">
            <div v-for="item in cartStore.items" :key="item.id" class="cart-item">
              
              <div class="item-img">
                <img v-if="item.image" :src="item.image" :alt="item.name">
                <div v-else class="placeholder-img"></div>
              </div>

              <div class="item-details">
                <div class="brand-row">
                  <h3>SEPHORA COLLECTION</h3>
                  <span class="heart-icon">♡</span>
                </div>
                <p class="item-name">{{ item.name }}</p>
                <p class="item-variant">Standart Boy</p>

                <div class="actions">
                  <select class="qty-select" :value="item.quantity || 1">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                  <button @click="cartStore.removeFromCart(item.id)" class="remove-btn">KALDIR</button>
                </div>
              </div>

              <div class="item-price">
                {{ typeof item.price === 'number' ? item.price + ' TL' : item.price }}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="right-col">
        
        <div class="promo-box">
          <div class="box-header">
            <span>Bir promosyon kodu girin</span>
            <span class="arrow-up">^</span>
          </div>
          <p class="label">Promosyon kodu</p>
          <div class="input-group">
            <input type="text">
            <button class="ok-btn">Ok</button>
          </div>
          <p class="helper-text">Sipariş başına yalnızca bir promosyon kodu kullanabilirsiniz.</p>
        </div>

        <div class="summary-box">
          <h3>Sipariş özeti</h3>
          
          <div class="summary-row">
            <span>Ara toplam</span>
            <span>{{ cartStore.totalPrice }}</span>
          </div>
          
          <div class="summary-row">
            <span>Mağazadan Teslimat ⓘ</span>
            <span>Ücretsiz</span>
          </div>

          <div class="progress-section">
            <div class="progress-labels">
              <span>0 TL</span>
              <span>2.000 TL</span>
            </div>
            <div class="progress-bar">
              <div class="progress-fill" style="width: 40%"></div>
            </div>
            <p class="free-shipping-text">Ücretsiz kargo için sepetine ürün ekle!</p>
          </div>

          <div class="total-row">
            <span>Ürünlerin Toplam Tutarı</span>
            <span>{{ cartStore.totalPrice }}</span>
          </div>
          <p class="tax-info">KDV dahil</p>

          <button class="checkout-btn">Alışverişi tamamla</button>

        </div>

      </div>

    </div>
  </div>
</template>

<style scoped>
/* Genel Sayfa Ayarları */
.checkout-page {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background-color: #f6f6f6; 
  min-height: 100vh;
}

/* 1. Üst Banner */
.top-banner {
  background-color: #feeef3;
  color: #000;
  text-align: center;
  padding: 10px;
  font-size: 13px;
  font-weight: 700;
}

/* 2. Header */
.simple-header {
  background-color: white;
  padding: 20px 0;
  margin-bottom: 30px;
  border-bottom: 1px solid #eee;
}

.header-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 28px;
  letter-spacing: 2px;
  font-weight: 600;
  color: black;
  text-decoration: none;
}

.steps {
  display: flex;
  align-items: center;
  gap: 15px;
}

.step {
  display: flex;
  align-items: center;
  gap: 10px;
}

.step-num {
  width: 24px;
  height: 24px;
  background-color: #d1245e; 
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
}

.step-num.inactive {
  background-color: #eee;
  color: #999;
}

.step-text {
  font-size: 14px;
  font-weight: 600;
}

/* 3. Ana İçerik */
.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px 50px 20px;
  display: flex;
  gap: 30px;
}

/* Sol Sütun */
.left-col {
  flex: 2; /* Sol taraf daha geniş */
}

.cart-box {
  background-color: white;
  padding: 30px;
}

.cart-box h2 {
  font-size: 20px;
  margin-bottom: 20px;
  font-weight: 700;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #666;
}
.continue-link {
  color: #d1245e;
  text-decoration: underline;
  font-weight: 700;
}

.cart-item {
  display: flex;
  gap: 20px;
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-bottom: 20px;
}

.item-img {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.item-img img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.placeholder-img {
  width: 100%;
  height: 100%;
  background-color: #eee;
}

.item-details {
  flex: 1;
}

.brand-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 14px;
  margin-bottom: 5px;
}

.heart-icon {
  cursor: pointer;
  font-size: 18px;
}

.item-name { font-size: 14px; margin-bottom: 5px; color: #333; }
.item-variant { font-size: 13px; color: #666; margin-bottom: 20px; }

.actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.qty-select {
  padding: 5px 10px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 4px;
}

.remove-btn {
  background: none;
  border: none;
  font-size: 12px;
  font-weight: bold;
  cursor: pointer;
  text-decoration: underline;
  color: #333;
}

.remove-btn:hover {
  color: #d1245e; 
  text-decoration: none;
}

.item-price {
  font-weight: 700;
  font-size: 16px;
}

/* Sağ Sütun */
.right-col {
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Promo ve Özet Kutuları */
.promo-box, .summary-box {
  background-color: white;
  padding: 20px;
}

/* Promo Kodu */
.box-header {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  margin-bottom: 15px;
  font-size: 14px;
}

.label { font-size: 12px; margin-bottom: 5px; }

.input-group {
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
}

.input-group input {
  flex: 1;
  border: 1px solid #ddd;
  padding: 10px;
  font-size: 14px;
}

.ok-btn {
  background-color: black;
  color: white;
  border: none;
  padding: 0 20px;
  font-weight: bold;
  cursor: pointer;
}

.helper-text {
  font-size: 11px;
  color: #666;
  line-height: 1.4;
}

/* Sipariş Özeti */
.summary-box h3 {
  font-size: 18px;
  margin-bottom: 20px;
  font-weight: 800;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  margin-bottom: 15px;
}

.progress-section {
  background-color: #f9f9f9;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 4px;
}

.progress-labels {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  margin-bottom: 5px;
  color: #666;
}

.progress-bar {
  height: 6px;
  background-color: #ddd;
  border-radius: 3px;
  margin-bottom: 8px;
  overflow: hidden;
}

.progress-fill {
  width: 100%; 
  height: 100%;
  background-color: black;
}

.free-shipping-text {
  font-size: 11px;
  font-weight: bold;
  color: #333;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 16px;
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.tax-info {
  font-size: 11px;
  color: #999;
  margin-bottom: 20px;
  margin-top: 5px;
}

.checkout-btn {
  width: 100%;
  background-color: black;
  color: white;
  padding: 16px;
  border: none;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
  text-transform: uppercase;
}

.checkout-btn:hover {
  opacity: 0.9;
}

/* Mobil */
@media (max-width: 900px) {
  .main-content { flex-direction: column; }
}
</style>