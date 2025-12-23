<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { getFirestore, doc, getDoc } from 'firebase/firestore' 
import { useOrderStore } from '~/stores/orderStore'

const orderStore = useOrderStore()
const router = useRouter()
const activeItem = ref('SİPARİŞLERİM') 
const currentUser = ref<any>(null)
const currentUserName = ref('')

// MENÜ DATALARI (SVG İKONLARI - ORİJİNAL)
const menuItems = [
  { 
    name: 'HESABIM', 
    link: '/favorites',
    svgPath: 'M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z' 
  },
  { 
    name: 'SEPHORA KART PROGRAMI', 
    link: '#',
    svgPath: 'M1 4h22v16H1z M13 10l-2 4h4l-2 4' 
  },
  { 
    name: 'SİPARİŞLERİM', 
    link: '/orders',
    svgPath: 'M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0'
  },
  { 
    name: 'FAVORİLERİM', 
    link: '/favorites',
    svgPath: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z'
  },
  { 
    name: 'İLETİŞİM TERCİHLERİM', 
    link: '#',
    svgPath: 'M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6'
  },
  { 
    name: 'FAVORİ MAĞAZAM', 
    link: '#',
    svgPath: 'M3 21v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8 M9 10a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2'
  },
  { 
    name: 'RANDEVU AL', 
    link: '#',
    svgPath: 'M19 4H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z M16 2v4 M8 2v4 M3 10h18'
  },
  { 
    name: 'HESAP AYARLARI', 
    link: '#',
    hasArrow: true,
    svgPath: 'M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4' 
  },
  { 
    name: 'ŞİFRE DEĞİŞTİR', 
    link: '#',
    svgPath: 'M17 11H7A2 2 0 0 0 5 13V21A2 2 0 0 0 7 23H17A2 2 0 0 0 19 21V13A2 2 0 0 0 17 11ZM12 7A4 4 0 0 1 12 7 16 11V7Z'
  },
  { 
    name: 'YARDIMA MI İHTİYACINIZ VAR?', 
    link: '#',
    svgPath: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3 M12 17h.01'
  }
]

const handleMenuClick = (item: any) => {
  if (item.link && item.link !== '#') {
    router.push(item.link)
  }
}

const handleLogout = async () => {
    const auth = getAuth()
    await signOut(auth)
    window.location.href = '/'
}

onMounted(() => {
  const auth = getAuth()
  const db = getFirestore()

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      currentUser.value = user
      await orderStore.fetchOrders()
      try {
        const docRef = doc(db, "users", user.uid)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
          currentUserName.value = docSnap.data().name 
        } else {
          currentUserName.value = user.displayName || 'MİSAFİR'
        }
      } catch (e) {
        currentUserName.value = user.displayName || 'MİSAFİR'
      }
    } else {
      router.push('/login')
    }
  })
})
</script>

<template>
  <div class="page-wrapper">
    <div class="layout-container">
      
      <aside class="sidebar-container">
        <div class="sidebar-header">
          <div class="header-content">
            <h2 class="welcome-text">HOŞ GELDİN {{ currentUserName.toUpperCase() }}</h2>
            
            <img src="~/assets/images/sephora-white.png" alt="Sephora White" class="card-img" />
            
          </div>
        </div>

        <ul class="menu-list">
          <li 
            v-for="(item, index) in menuItems" 
            :key="index" 
            class="menu-item"
            :class="{ 'active-item': activeItem === item.name }"
            @click="handleMenuClick(item)"
          >
            <div v-if="activeItem === item.name" class="active-line"></div>
            
            <div class="icon-box" :class="{ 'red-icon': activeItem === item.name }">
              <svg 
                viewBox="0 0 24 24" 
                width="20" height="20" 
                fill="none" 
                stroke="currentColor" 
                stroke-width="1.8" 
                stroke-linecap="round" 
                stroke-linejoin="round"
              >
                <path :d="item.svgPath" />
              </svg>
            </div>

            <span class="menu-text">{{ item.name }}</span>
            <span v-if="item.hasArrow" class="arrow-down">⌄</span>
          </li>
        </ul>

        <div class="logout-wrapper">
          <button @click="handleLogout" class="logout-btn">Çıkış yap</button>
        </div>
      </aside>

      <main class="main-content">
        <h1 class="page-heading">Siparişlerim</h1>
        
        <div v-if="orderStore.loading" class="status-msg">
          Siparişlerin yükleniyor...
        </div>

        <div v-else-if="orderStore.orders.length === 0" class="content-body">
             <p class="description-text">Henüz vermiş olduğun bir sipariş bulunmuyor.</p>
             <NuxtLink to="/" class="continue-link">Alışverişe Başla</NuxtLink>
        </div>

        <div v-else class="orders-list">
            <div v-for="order in orderStore.orders" :key="order.id" class="order-card">
                <div class="order-header">
                    <div class="header-left">
                        <span class="date-label">Sipariş Tarihi:</span>
                        <span class="order-date">{{ order.formattedDate }}</span>
                        <span class="status-badge">{{ order.status }}</span>
                    </div>
                    <div class="header-right">
                        <span class="total-label">Toplam:</span>
                        <span class="total-price">{{ order.totalAmount }}</span>
                    </div>
                </div>

                <div class="order-items">
                    <div v-for="(item, idx) in order.items" :key="idx" class="order-item-row">
                        <div class="item-img">
                             <img v-if="item.image" :src="item.image" :alt="item.name">
                             <div v-else class="placeholder"></div>
                        </div>
                        <div class="item-info">
                            <p class="item-name">{{ item.name }}</p>
                            <p class="item-qty">Adet: {{ item.quantity || 1 }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </main>

    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.page-wrapper {
  background-color: #FAFAFA;
  min-height: 100vh;
  padding-top: 50px; 
  padding-bottom: 80px;
  font-family: 'Inter', sans-serif;
  color: #000;
}

.layout-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 30px; 
  display: flex;
  gap: 50px; 
  align-items: flex-start;
}

/* SIDEBAR TASARIMI */
.sidebar-container {
  width: 340px; 
  flex-shrink: 0;
  background-color: transparent; 
}

.sidebar-header {
  margin-bottom: 20px;
  padding: 10px 0;
}

.header-content {
  display: flex;
  justify-content: space-between; /* İsim sola, Kart sağa */
  align-items: center;
}

.welcome-text { 
  font-size: 20px; 
  font-weight: 800; 
  text-transform: uppercase; 
  margin: 0;
  color: #000;
}

/* KART RESMİ BOYUTU */
.card-img {
  width: 70px; /* Görsel boyutunu buradan ayarlayabilirsin */
  height: auto;
  object-fit: contain;
}

/* Menü Listesi */
.menu-list { list-style: none; padding: 0; margin: 0; margin-bottom: 30px; }

.menu-item { 
  display: flex; 
  align-items: center; 
  padding: 14px 0; 
  cursor: pointer; 
  position: relative; 
  color: #000;
}

/* Aktif Durum Çizgisi */
.active-line { 
  position: absolute; 
  left: -20px; 
  height: 24px; 
  width: 5px; 
  background-color: #D3004C; 
}

.icon-box { 
  width: 24px; 
  margin-right: 15px; 
  display: flex; 
  justify-content: center; 
  color: #000; 
}

/* Kırmızı İkon ve Yazı */
.red-icon { color: #D3004C; } 
.active-item .menu-text { color: #D3004C; font-weight: 800; }

.menu-text { 
  font-size: 14px; 
  font-weight: 800; 
  text-transform: uppercase; 
  flex: 1;
}

.arrow-down { font-size: 12px; color: #000; font-weight: bold; }

/* Çıkış Yap Butonu */
.logout-wrapper { margin-top: 10px; }
.logout-btn { 
  width: 100%; 
  padding: 15px; 
  background-color: white; 
  border: 1px solid #000; /* Siyah Çerçeve */
  font-weight: 700; 
  font-size: 15px;
  cursor: pointer; 
  border-radius: 8px; /* Köşeler Oval */
  color: #000;
  transition: all 0.2s;
}
.logout-btn:hover { 
  background-color: #000; 
  color: white; 
}

/* SAĞ İÇERİK */
.main-content { flex: 1; }
.page-heading { font-size: 28px; font-weight: 800; margin-bottom: 25px; }
.status-msg { padding: 40px; text-align: center; color: #666; font-style: italic; }
.content-body { padding: 40px 0; }
.description-text { font-size: 14px; line-height: 1.6; margin-bottom: 25px; color: #333; }
.continue-link { color: #D3004C; font-weight: 700; text-decoration: underline; }

/* SİPARİŞ LİSTESİ */
.orders-list { display: flex; flex-direction: column; gap: 20px; }

.order-card {
    background-color: white;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    overflow: hidden; 
}

.order-header {
    background-color: #f9f9f9;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
}

.header-left { display: flex; gap: 10px; align-items: center; }
.date-label, .total-label { font-size: 13px; color: #666; }
.order-date { font-weight: 700; font-size: 14px; margin-right: 10px; }
.status-badge { 
    background-color: #fff3cd; color: #856404; 
    padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;
}
.header-right { display: flex; gap: 10px; align-items: center; }
.total-price { font-weight: 800; font-size: 16px; color: #000; }

.order-items { padding: 20px; }
.order-item-row { display: flex; gap: 20px; margin-bottom: 15px; align-items: center; border-bottom: 1px solid #f5f5f5; padding-bottom: 15px; }
.order-item-row:last-child { border-bottom: none; margin-bottom: 0; padding-bottom: 0; }
.item-img { 
    width: 70px; height: 70px; border: 1px solid #eee; 
    display: flex; align-items: center; justify-content: center; 
    border-radius: 4px; padding: 5px;
}
.item-img img { max-width: 100%; max-height: 100%; object-fit: contain; }
.placeholder { width: 100%; height: 100%; background-color: #eee; }
.item-info { display: flex; flex-direction: column; }
.item-name { font-size: 14px; font-weight: 700; margin: 0 0 5px 0; color: #000; }
.item-qty { font-size: 13px; color: #666; margin: 0; }

@media (max-width: 1000px) {
  .layout-container { flex-direction: column; gap: 30px; }
  .sidebar-container { width: 100%; }
}
</style>