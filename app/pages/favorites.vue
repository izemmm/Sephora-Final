<script setup lang="ts">
import { ref } from 'vue'

// KART RESMİ IMPORT KODUNU KALDIRDIM ÇÜNKÜ DOSYA YOK VE HATA VERİYOR.
// İleride resim eklersen buraya tekrar yazabilirsin.

const activeItem = ref('FAVORİLERİM') 

const menuItems = [
  { name: 'HESABIM', icon: 'user' },
  { name: 'SEPHORA KART PROGRAMI', icon: 'card' },
  { name: 'SİPARİŞLERİM', icon: 'bag' },
  { name: 'FAVORİLERİM', icon: 'heart' },
  { name: 'İLETİŞİM TERCİHLERİM', icon: 'mail' },
  { name: 'FAVORİ MAĞAZAM', icon: 'store' },
  { name: 'RANDEVU AL', icon: 'calendar' },
  { name: 'HESAP AYARLARI', icon: 'settings', hasArrow: true },
  { name: 'ŞİFRE DEĞİŞTİR', icon: 'lock' },
  { name: 'YARDIMA MI İHTİYACINIZ VAR?', icon: 'help' }
]

const selectItem = (name: string) => {
  activeItem.value = name
}
</script>

<template>
  <div class="favorites-page-wrapper">
    <div class="layout-container">
      
      <aside class="sidebar-container">
        <div class="sidebar-header">
          <h2 class="welcome-text">HOŞ GELDİN İZEM</h2>
          
          </div>

        <ul class="menu-list">
          <li 
            v-for="(item, index) in menuItems" 
            :key="index" 
            class="menu-item"
            :class="{ 'active-item': activeItem === item.name }"
            @click="selectItem(item.name)"
          >
            <div v-if="activeItem === item.name" class="active-border"></div>
            
            <div class="icon-box" :class="{ 'red-icon': activeItem === item.name }">
              <svg v-if="item.icon === 'user'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <svg v-if="item.icon === 'card'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
              <svg v-if="item.icon === 'bag'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <svg v-if="item.icon === 'heart'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
              <svg v-if="item.icon === 'mail'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <svg v-if="item.icon === 'store'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M3 21h18v-8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"></path><polyline points="17 21 17 13 7 13 7 21"></polyline><path d="M2 11h20v-2l-2-5H4l-2 5z"></path></svg>
              <svg v-if="item.icon === 'calendar'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <svg v-if="item.icon === 'settings'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1.29 1.07 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
              <svg v-if="item.icon === 'lock'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <svg v-if="item.icon === 'help'" viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" stroke-width="1.5" fill="none"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>

            <span class="menu-text">{{ item.name }}</span>
            <span v-if="item.hasArrow" class="arrow-down">⌄</span>
          </li>
        </ul>

        <button class="logout-btn">Çıkış yap</button>
      </aside>

      <main class="main-content">
        <h1 class="page-heading">Favorilerim</h1>
        
        <div class="content-body">
          <p class="description-text">
            Favorilerini eklemeye hemen başla!<br>
            Favori ürünlerini kaydetmek ve paylaşmak için giriş yap.
          </p>
          
          <NuxtLink to="/login" class="main-login-btn">Giriş</NuxtLink>
        </div>
      </main>

    </div>
  </div>
</template>

<style scoped>
/* SAYFA GENEL YAPISI (HİZALAMA İÇİN GEREKLİ) */
.favorites-page-wrapper {
  background-color: #FAFAFA;
  min-height: 100vh;
  /* Header yüksekliğine göre boşluk */
  padding-top: 170px; 
  padding-bottom: 80px;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}

.layout-container {
  /* Header ile hizalamak için genişlik sınırlaması */
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px; 
  display: flex;
  gap: 50px; /* Sidebar ile sağ taraf arası boşluk */
  align-items: flex-start;
}

/* --- SENİN SIDEBAR CSS KODLARIN --- */
.sidebar-container {
  width: 350px; /* Senin kodundaki genişlik */
  flex-shrink: 0;
  background-color: white; 
  padding: 30px 20px;
  border: 1px solid #eee;
  color: black; 
}

/* Header */
.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
  background-color: white; 
}

.welcome-text {
  font-size: 18px;
  font-weight: 800;
  margin: 0;
  color: black; 
  letter-spacing: -0.5px;
  text-transform: uppercase;
}

/* Menü Listesi */
.menu-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.menu-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s; 
}

/* Fare ile üzerine gelince hafif gri olsun diye */
.menu-item:hover {
  background-color: #fafafa;
}

/* Aktif elemanım için */
.active-border {
  position: absolute;
  left: -20px;
  height: 24px;
  width: 4px;
  background-color: #d1245e; 
}

.icon-box {
  width: 30px;
  margin-right: 10px;
  color: black;
  display: flex;
  justify-content: center;
}

.red-icon {
  color: #d1245e; 
}

.menu-text {
  font-size: 14px;
  font-weight: 800;
  color: black;
  text-transform: uppercase;
}

/* Aktif olan yazının rengi pembe olsun diye */
.active-item .menu-text {
  color: #d1245e;
}

.arrow-down {
  margin-left: auto;
  font-weight: bold;
}

/* Çıkış Yap Butonum */
.logout-btn {
  width: 100%;
  padding: 15px;
  background-color: white;
  border: 2px solid black;
  font-weight: 800;
  font-size: 16px;
  margin-top: 30px;
  cursor: pointer;
  border-radius: 6px;
  color: black;
  transition: background 0.2s;
}

.logout-btn:hover {
  background-color: black;
  color: white;
}

/* --- SAĞ TARAF İÇERİK STİLLERİ --- */
.main-content {
  flex: 1;
  padding-top: 0;
}

.page-heading {
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 25px;
  color: #000;
}

.description-text {
  font-size: 14px;
  line-height: 1.6;
  color: #000;
  margin-bottom: 25px;
  font-weight: 400;
}

.main-login-btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background-color: #000;
  color: #fff;
  width: 250px;
  height: 48px;
  font-weight: 700;
  font-size: 15px;
  text-decoration: none;
  border-radius: 4px;
  transition: opacity 0.2s;
}
.main-login-btn:hover { opacity: 0.9; }

/* Responsive */
@media (max-width: 1000px) {
  .layout-container { flex-direction: column; gap: 30px; }
  .sidebar-container { width: 100%; box-sizing: border-box; }
}
</style>