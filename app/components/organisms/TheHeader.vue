<script setup lang="ts">
import { ref } from 'vue'
// --- PINIA STORE BAĞLANTISI ---
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

const categories = [
  'Yeni Yıl', 'Sephora Collection', 'En Yeniler', 'Özel Setler', 
  'Trendler', 'Makyaj', 'Parfüm', 'Cilt Bakımı', 
  'Vücut ve Banyo', 'Saç', 'Minis & More', 'Markalar', 'Kampanyalar'
]

// --- YENİ YIL MENÜ DATASI ---
const newYearSubItems = [
  'Öne Çıkanlar', 'Makyaj', 'Parfüm', 'Cilt Bakım', 'Saç Bakım',
  'Özel Setler', 'Kadın Hediye Önerileri', 'Erkek Hediye Önerileri',
  "%50'ye varan", 'Sephora Collection'
]
const highlightItems = ['Özel Setler', 'Kadın Hediye Önerileri', 'Erkek Hediye Önerileri']
const thinItems = ['Kadın Hediye Önerileri', 'Erkek Hediye Önerileri']

// --- SEPHORA COLLECTION MENÜ DATASI ---
const sephoraMenuData = {
  col1: {
    topLinks: [
      { text: 'Gift Finder', isBold: true },
      { text: 'Tüm Ürünler', isBold: true },
      { text: 'Özel Setler', isBold: true, isPink: true },
      { text: 'Sephora Collection', isBold: true },
      { text: 'En Yeniler', isBold: true },
      { text: 'Çok Satanlar', isBold: true },
      { text: 'Sosyal Medya Favorileri', isBold: true },
    ],
    group: { title: 'Makyaj', items: ['Ten', 'Göz', 'Dudak', 'Kaş', 'Makyaj Setleri'] }
  },
  col2: [
    { title: 'Fırça ve Aksesuarlar', items: ['Tüm Ürünler', 'Makyaj Aksesuarları', 'Cilt Aksesuarı', 'Vücut ve Banyo Aksesuarları', 'Saç Bakım Aksesuarları'] },
    { title: 'Cilt Bakım', items: ['Serum', 'Günlük Nemlendirici', 'Gece Nemlendiricisi', 'Göz Kremi', 'Dudak Bakım', 'Maske', 'Cilt & Makyaj Temizleyiciler', 'Cilt Bakım Setleri'] }
  ],
  col3: [
    { title: 'Vücut ve Banyo', items: ['Vücut Bakım', 'Duş ve Banyo Bakım', 'Vücut ve Banyo Setleri'] },
    { title: 'Saç Bakım', items: ['Şampuan', 'Maske', 'Saç Bakım', 'Saç Bakım Setleri'] }
  ]
}

const hoveredCategory = ref<string | null>(null)
const isStoreMenuOpen = ref(false)
const isUserMenuOpen = ref(false)
</script>

<template>
  <div class="header-wrapper">
    
    <div class="top-notification">
      <div class="content-wrapper">
        <div class="title">Sevdiklerine Güzel Bir Hediye Ver</div>
        <div class="subtitle">Senin için seçtiğimiz hediye setlerini keşfet!</div>
      </div>
    </div>

    <div class="main-header-container">
      <header class="main-header">
        <a href="/" class="logo-link">
          <img src="~/assets/images/sephora-logo.png" alt="Sephora" class="main-logo-img" />
        </a>

        <div class="search-wrapper">
          <div class="search-bar">
            <svg class="search-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Ürün, marka, kategori ara..." />
          </div>
        </div>

        <div class="user-actions">
          
          <div class="action-wrapper" :class="{ 'menu-open': isStoreMenuOpen }" @mouseenter="isStoreMenuOpen = true" @mouseleave="isStoreMenuOpen = false">
            <a href="#" class="action-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              <span class="action-text">Mağazalar ve Servisler</span>
            </a>
            <div v-if="isStoreMenuOpen" class="mega-dropdown store-dropdown-pos">
              <div class="dropdown-inner">
                <div class="arrow-up store-arrow"></div>
                <div class="dropdown-content">
                  <div class="col-left">
                    <h3>Mağaza bul</h3>
                    <label>Posta kodu, il</label>
                    <div class="input-group">
                      <input type="text" placeholder="Örn: 34000,Istanbul" />
                      <svg class="target-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="22" y1="12" x2="18" y2="12"></line><line x1="6" y1="12" x2="2" y2="12"></line><line x1="12" y1="6" x2="12" y2="2"></line><line x1="12" y1="22" x2="12" y2="18"></line><circle cx="12" cy="12" r="3"></circle></svg>
                    </div>
                    <p class="small-title">Mağazalarımızı keşfet:</p>
                    <ul class="store-list">
                      <li>Adres ve Telefon Bilgileri</li>
                      <li>Çalışma saatleri</li>
                      <li>Güzellik servisleri</li>
                      <li>Güzellik hizmetleri için rezervasyon yaptır</li>
                    </ul>
                  </div>
                  <div class="col-right">
                    <h3>Mağaza hizmetleri</h3>
                    <p class="description">Mağazada sunduğumuz cilt bakım, makyaj ve kaş servisi, makyaj dersleri, canlı sipariş hattı ve kişiye özel hediye paketi hizmetlerimizi keşfet!</p>
                    <button class="btn-black">Randevu al</button>
                    <button class="btn-white">Tüm hizmetleri keşfet</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="action-wrapper" :class="{ 'menu-open': isUserMenuOpen }" @mouseenter="isUserMenuOpen = true" @mouseleave="isUserMenuOpen = false">
            <NuxtLink to="/login" class="action-item">
              <img src="~/assets/images/user-icon.png" alt="Giriş Yap" class="icon-img" />
              <span class="action-text">Giriş yap / Üye ol</span>
            </NuxtLink>
            
            <div v-if="isUserMenuOpen" class="mega-dropdown user-dropdown-pos">
              <div class="dropdown-inner">
                <div class="arrow-up user-arrow"></div>
                <div class="user-dropdown-content">
                  <div class="user-col-welcome">
                    <h3>Merhaba!</h3>
                    <p class="welcome-text">Sephora ayrıcalıklarından yararlanmak için giriş yap veya üye ol.</p>
                    <NuxtLink to="/login" class="btn-black btn-login" style="text-decoration:none; display:block; text-align:center;">
                      Giriş yap veya üye ol
                    </NuxtLink>
                  </div>
                  <div class="user-col-list border-left">
                    <ul class="icon-list">
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg><a href="#">Hesabım</a></li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg><a href="#">Siparişlerim</a></li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg><a href="#">Sipariş takibi</a></li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg><a href="#">Sephora Kartım</a></li>
                    </ul>
                  </div>
                  <div class="user-col-list">
                    <ul class="icon-list">
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg><a href="#">Randevu al</a></li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg><a href="#">Kişisel bilgilerim</a></li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg><a href="#">İletişim tercihlerim</a></li>
                      <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg><a href="#">Sıkça Sorulan Sorular</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <NuxtLink to="/favorites" class="icon-btn">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </NuxtLink>
          
         <NuxtLink to="/cart" class="icon-btn cart-btn">
  <div class="cart-icon-wrapper">
    <img src="~/assets/images/icon-cart-original.png" alt="Sepet" class="cart-icon-img" />
    <span v-if="cartStore.totalItems > 0" class="cart-badge">
      {{ cartStore.totalItems }}
    </span>
  </div>
</NuxtLink>

        </div>
      </header>
    </div>

    <div class="nav-container">
      <nav class="nav-content">
        <ul class="main-nav-list">
          <li v-for="(item, index) in categories" :key="index" class="nav-item" @mouseenter="hoveredCategory = item" @mouseleave="hoveredCategory = null">
            
            <a href="#" :class="{ 'pink-text': index === 0, 'active-link': hoveredCategory === item }">{{ item }}</a>
            
            <div v-if="item === 'Yeni Yıl' && hoveredCategory === 'Yeni Yıl'" class="category-dropdown">
              <div class="category-menu-wrapper">
                <ul class="vertical-menu">
                  <li v-for="(sub, sIndex) in newYearSubItems" :key="sIndex">
                    <a href="#" :class="{ 'special-text': highlightItems.includes(sub), 'thin-text': thinItems.includes(sub) }">{{ sub }}</a>
                  </li>
                </ul>
              </div>
            </div>

            <div v-if="item === 'Sephora Collection' && hoveredCategory === 'Sephora Collection'" class="category-dropdown">
              <div class="category-menu-wrapper">
                <div class="sephora-menu-grid">
                  <div class="menu-column">
                    <ul class="clean-list">
                      <li v-for="(link, i) in sephoraMenuData.col1.topLinks" :key="i">
                        <a href="#" :class="{ 'bold-text': link.isBold, 'pink-text-force': link.isPink }">{{ link.text }}</a>
                      </li>
                    </ul>
                    <div class="menu-group group-spacing">
                      <h4 class="menu-header">{{ sephoraMenuData.col1.group.title }}</h4>
                      <ul class="clean-list">
                        <li v-for="sub in sephoraMenuData.col1.group.items" :key="sub"><a href="#">{{ sub }}</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="menu-column">
                    <div v-for="(group, i) in sephoraMenuData.col2" :key="i" class="menu-group mb-large">
                      <h4 class="menu-header">{{ group.title }}</h4>
                      <ul class="clean-list">
                        <li v-for="sub in group.items" :key="sub"><a href="#">{{ sub }}</a></li>
                      </ul>
                    </div>
                  </div>
                  <div class="menu-column">
                    <div v-for="(group, i) in sephoraMenuData.col3" :key="i" class="menu-group mb-large">
                      <h4 class="menu-header">{{ group.title }}</h4>
                      <ul class="clean-list">
                        <li v-for="sub in group.items" :key="sub"><a href="#">{{ sub }}</a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

/* GENEL YAPILAR */
.header-wrapper { width: 100%; font-family: 'Inter', sans-serif; color: #000; }
.top-notification { background-color: #FFEBF6; padding: 6px 0; display: flex; justify-content: center; border-bottom: 1px solid #f0f0f0; }
.content-wrapper { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 2px; }
.title { font-size: 15px; font-weight: 800; line-height: 1.6; }
.subtitle { font-size: 15px; font-weight: 400; line-height: 1.2; color: #111; }
.main-header-container { background-color: white; padding: 10px 0; position: relative; z-index: 50; }
.main-header { max-width: 95%; margin: 0 auto; padding: 0 0px; display: flex; align-items: center; justify-content: space-between; gap: 5px; }
.logo-link { display: flex; align-items: center; text-decoration: none; }
.main-logo-img { width: 220px; height: auto; display: block; max-width: 300px; }
.search-wrapper { flex-grow: 1; max-width: 720px; }
.search-bar { display: flex; align-items: center; background-color: #F6F6F8; border-radius: 999px; padding: 0 20px; height: 48px; border: 1px solid transparent; }
.search-bar input { background: transparent; border: none; outline: none; margin-left: 12px; width: 100%; font-size: 14px; color: #000; }
.search-icon { color: #000; opacity: 0.8; }
.user-actions { display: flex; align-items: center; gap: 24px; position: relative; }
.action-item { display: flex; align-items: center; gap: 8px; text-decoration: none; color: #000; cursor: pointer; }
.icon-img { width: 33px; height: 29px; object-fit: contain; }
.action-text { font-size: 15px; font-weight: 500; white-space: nowrap; border-bottom: 2px solid transparent; transition: border-color 0.2s; }
.action-wrapper:hover .action-text, .action-wrapper.menu-open .action-text { border-bottom: 2px solid #000; }
.icon-btn { display: flex; align-items: center; justify-content: center; color: #000; margin-left: 5px; }
.action-item:hover, .icon-btn:hover { opacity: 0.7; }
.cart-icon-img { width: 39px; height: auto; display: block; }
.action-wrapper { position: relative; height: 100%; display: flex; align-items: center; }

/* ÖNEMLİ DEĞİŞİKLİK: 
  mega-dropdown artık transparan bir kapsayıcı. 
  Üstten boşluk (padding-top) vererek görünmez bir "köprü" oluşturduk.
  Böylece mouse butondan menüye geçerken menü kapanmıyor.
*/
.mega-dropdown { 
  position: absolute; 
  top: 100%; /* Butonun tam altından başlar */
  margin-top: -10px; /* Biraz yukarı çekip */
  padding-top: 25px; /* İçeriden boşluk vererek hover alanını genişletiyoruz */
  z-index: 1000; 
  cursor: default; 
}

/* DROPDOWN'UN İÇİNDEKİ ASIL BEYAZ KUTU */
.dropdown-inner {
  background-color: white; 
  border-radius: 4px; 
  box-shadow: 0 10px 40px rgba(0,0,0,0.15); 
  padding: 40px; 
  border: 1px solid #e0e0e0; 
  position: relative;
}

.store-dropdown-pos { right: -100px; width: 750px; }

/* GENİŞLİK ESKİ HALİNE GELDİ */
.user-dropdown-pos { right: -80px; width: 950px; }

.arrow-up { position: absolute; top: -9px; width: 18px; height: 18px; background-color: white; transform: rotate(45deg); border-left: 1px solid #e0e0e0; border-top: 1px solid #e0e0e0; }
.store-arrow { right: 185px; }
.user-arrow { right: 155px; }
.dropdown-content { display: flex; gap: 50px; }
.col-left { flex: 1; border-right: 1px solid #e0e0e0; padding-right: 40px; text-align: left; }
.col-left h3, .col-right h3 { font-size: 20px; font-weight: 800; margin: 0 0 25px 0; color: #000; }
.col-left label { display: block; font-size: 15px; margin-bottom: 10px; color: #000; font-weight: 500; }
.input-group { position: relative; margin-bottom: 25px; }
.input-group input { width: 100%; padding: 14px 45px 14px 15px; background-color: #f5f5f5; border: 1px solid transparent; border-radius: 6px; font-size: 14px; box-sizing: border-box; color: #000; transition: all 0.2s; }
.input-group input:focus { background-color: #fff; border-color: #000; outline: none; }
.target-icon { position: absolute; right: 15px; top: 50%; transform: translateY(-50%); width: 22px; height: 22px; color: #000; cursor: pointer; }
.small-title { font-size: 15px; font-weight: 700; margin-bottom: 15px; color: #000; }
.store-list { list-style: disc; padding-left: 20px; margin: 0; }
.store-list li { font-size: 14px; margin-bottom: 8px; color: #000; line-height: 1.4; }
.col-right { flex: 1; text-align: left; }
.description { font-size: 14px; line-height: 1.6; margin-bottom: 30px; color: #000; }
.user-dropdown-content { display: flex; width: 100%; gap: 40px; }
.user-col-welcome { flex: 1.2; text-align: left; padding-right: 20px; }
.user-col-welcome h3 { font-size: 20px; font-weight: 800; margin-bottom: 15px; color: #000; }
.welcome-text { font-size: 14px; line-height: 1.5; color: #000; margin-bottom: 25px; }
.user-col-list { flex: 1; text-align: left; }
.border-left { border-left: 1px solid #e0e0e0; padding-left: 40px; }
.icon-list { list-style: none; padding: 0; margin: 0; }
.icon-list li { display: flex; align-items: center; gap: 15px; margin-bottom: 24px; }
.icon-list svg { color: #000; width: 22px; height: 22px; stroke-width: 1.5px; }
.icon-list a { text-decoration: none; color: #000; font-size: 15px; font-weight: 500; transition: color 0.2s; }
.icon-list a:hover { text-decoration: underline; }
.btn-black { width: 100%; background-color: #000; color: #fff; border: none; padding: 14px; font-size: 15px; font-weight: 700; border-radius: 6px; cursor: pointer; margin-bottom: 12px; transition: opacity 0.2s; }
.btn-black:hover { opacity: 0.85; }
.btn-login { text-transform: none; }
.btn-white { width: 100%; background-color: #fff; color: #000; border: 2px solid #000; padding: 12px; font-size: 15px; font-weight: 700; border-radius: 6px; cursor: pointer; transition: background-color 0.2s; }
.btn-white:hover { background-color: #f9f9f9; }
.nav-container { width: 100%; background-color: white; margin-top: 8px; padding-bottom: 15px; border-bottom: 1px solid #E5E5E5; position: relative; }
.nav-content { max-width: 1400px; margin: 0 auto; padding: 0 30px; position: static; } 
.main-nav-list { display: flex; justify-content: space-between; align-items: center; list-style: none; padding: 0; margin: 0; overflow: visible; }
.nav-item { padding: 5px 0; flex-shrink: 0; }

/* MENÜ LİNKLERİ */
.nav-item > a { 
  text-decoration: none; 
  color: #000; 
  font-size: 14px; 
  font-weight: 500; 
  white-space: nowrap; 
  letter-spacing: 0.2px; 
  padding-bottom: 15px; 
  border-bottom: 3px solid transparent; 
}

/* 1. YENİ YIL İÇİN ÖZEL STİL */
.pink-text { color: #D3004C !important; font-weight: 600; }
.pink-text:hover, .pink-text.active-link { border-bottom: 3px solid #D3004C !important; }

/* 2. DİĞER LİNKLER */
.nav-item > a:not(.pink-text):hover,
.nav-item > a:not(.pink-text).active-link {
  color: #000 !important; 
  border-bottom: 3px solid #000 !important; 
}

/* DROPDOWN STİLLERİ */
.category-dropdown { position: absolute; top: 100%; left: 0; width: 100%; background-color: white; z-index: 900; border-top: 1px solid #e0e0e0; box-shadow: 0 15px 30px rgba(0,0,0,0.05); padding: 30px 0; }
.category-menu-wrapper { max-width: 1400px; margin: 0 auto; padding: 0 30px; display: flex; }
.vertical-menu { display: flex; flex-direction: column; list-style: none; padding: 0; margin: 0; width: 250px; text-align: left; }
.vertical-menu li { margin-bottom: 15px; }

/* ALT MENÜ LİNKLERİ (Temizlendi) */
.vertical-menu a, .clean-list a { 
  border-bottom: none !important; 
  padding-bottom: 0 !important;   
  text-decoration: none; 
  color: #000; 
  font-size: 14px; 
  font-weight: 700; 
}

/* HOVER İŞLEMİ (Renk SİYAH, sadece altı çizili) */
.vertical-menu a:hover, .clean-list a:hover { 
  color: #000 !important; /* Burası Siyah Kalsın */
  text-decoration: underline !important; 
}

.special-text { font-size: 16px !important; font-weight: 900 !important; margin-top: 25px; display: block; }
.thin-text { font-weight: 400 !important; font-size: 13px !important; color: #333 !important; padding-left: 10px; }

/* SEPHORA COLLECTION STİLLERİ */
.sephora-menu-grid { display: flex; width: 100%; gap: 60px; }
.menu-column { display: flex; flex-direction: column; flex: 1; text-align: left; }
.menu-header { font-size: 15px; font-weight: 900; color: #000; margin: 0 0 15px 0; }
.clean-list { list-style: none; padding: 0; margin: 0; }
.clean-list li { margin-bottom: 10px; }
.bold-text { font-weight: 700 !important; }
.pink-text-force { color: #D3004C !important; }
.group-spacing { margin-top: 30px; }
.mb-large { margin-bottom: 30px; }

/* SEPET BADGE STİLİ */
.cart-icon-wrapper { position: relative; display: inline-block; }
.cart-badge { position: absolute; top: -5px; right: -8px; background-color: #D3004C; color: white; font-size: 11px; font-weight: 700; height: 18px; width: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; }
</style>