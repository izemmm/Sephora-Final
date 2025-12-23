<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useProductStore } from '~/stores/productStore'
// YENİ: Favori Store'u ekledik
import { useFavoriteStore } from '~/stores/favoriteStore'

const productStore = useProductStore()
const favoriteStore = useFavoriteStore() // Store'u tanımladık
const sliderRef = ref<HTMLElement | null>(null)

// Buton durumları
const isAtStart = ref(true)
const isAtEnd = ref(false)

// Progress Bar Değişkenleri
const progressWidth = ref(15) 
const progressLeft = ref(0)

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
  checkScrollPosition()
  window.addEventListener('resize', checkScrollPosition)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkScrollPosition)
})

// --- YENİ: FAVORİ EKLEME FONKSİYONU ---
const addToFavorites = async (product: any) => {
  try {
    await favoriteStore.addFavorite(product)
    alert("❤️ Ürün favorilere eklendi!")
  } catch (error: any) {
    // Eğer store'dan hata dönerse (giriş yapılmamışsa)
    if (error.message === "Giriş yapmalısın!") {
       alert("Favorilere eklemek için lütfen giriş yapın.")
    } else {
       console.error(error)
       alert("Bir hata oluştu.")
    }
  }
}
// --------------------------------------

const checkScrollPosition = () => {
  if (!sliderRef.value) return
  
  const { scrollLeft, scrollWidth, clientWidth } = sliderRef.value
  
  isAtStart.value = scrollLeft <= 1
  isAtEnd.value = Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 1

  const maxScroll = scrollWidth - clientWidth
  
  if (maxScroll <= 0) {
    progressLeft.value = 0
    return
  }

  const scrollRatio = scrollLeft / maxScroll
  const availableTrack = 100 - progressWidth.value
  progressLeft.value = scrollRatio * availableTrack
}

const scrollSlider = (direction: 'left' | 'right') => {
  if (sliderRef.value) {
    const scrollAmount = 300 
    if (direction === 'left') {
      sliderRef.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
    } else {
      sliderRef.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
    // Scroll sonrası durumu tekrar kontrol et
    const checkInterval = setInterval(checkScrollPosition, 50)
    setTimeout(() => clearInterval(checkInterval), 500)
  }
}
</script>

<template>
  <div class="products-section">
    
    <div class="section-header">
      <h2 class="section-title">Sephora Collection</h2>
      <NuxtLink to="/category/sephora-collection" class="header-link-btn">
        KEŞFET
      </NuxtLink>
    </div>

    <div class="slider-wrapper">
      
      <button 
        class="nav-btn left" 
        :class="{ 'disabled': isAtStart, 'active': !isAtStart }"
        :disabled="isAtStart"
        @click="scrollSlider('left')"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
      </button>

      <div v-if="productStore.loading" class="loading-state">
        Ürünler Yükleniyor...
      </div>

      <div 
        v-else 
        class="product-list" 
        ref="sliderRef"
        @scroll="checkScrollPosition"
      >
        <div v-for="product in productStore.products" :key="product.id" class="product-card">
          <div class="card-badge">2 Ve Üzeri İndirim</div>
          
          <div class="wishlist-icon" @click="addToFavorites(product)">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="black" stroke-width="1.5"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </div>
          
          <NuxtLink :to="`/product/${product.id}`" class="image-container">
            <img :src="product.image" :alt="product.name" />
          </NuxtLink>

          <div class="card-info">
            <span class="brand-name">SEPHORA COLLECTION</span>
            <h3 class="product-name">{{ product.name }}</h3>
            <p class="product-variant">Standart Boy</p>
            <div class="price">{{ product.price }}</div>
            <div class="rating-container">
              <div class="stars">
                <span v-for="i in 5" :key="i" class="star">★</span>
              </div>
              <span class="review-count">(23)</span>
            </div>
          </div>
          
          <NuxtLink :to="`/product/${product.id}`" class="add-btn">
            Keşfet
          </NuxtLink>

        </div>
      </div>

      <button 
        class="nav-btn right" 
        :class="{ 'disabled': isAtEnd, 'active': !isAtEnd }"
        :disabled="isAtEnd"
        @click="scrollSlider('right')"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
      </button>

    </div>

    <div class="progress-container">
      <div class="progress-track">
        <div 
          class="progress-thumb" 
          :style="{ width: progressWidth + '%', left: progressLeft + '%' }"
        ></div>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

.products-section {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 40px 30px;
  font-family: 'Inter', sans-serif;
  box-sizing: border-box;
}

/* BAŞLIK */
.section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 25px; }
.section-title { font-size: 26px; font-weight: 800; color: #000; letter-spacing: -0.5px; margin: 0; }

/* Buton -> Link olduğu için display ve text-decoration eklendi */
.header-link-btn {
  background: white; border: 1px solid #dcdcdc; padding: 10px 20px;
  font-size: 12px; font-weight: 700; color: #000; border-radius: 30px; 
  cursor: pointer; text-transform: uppercase; transition: all 0.2s;
  text-decoration: none; display: inline-block;
}
.header-link-btn:hover { border-color: #000; }

/* SLIDER */
.slider-wrapper { position: relative; display: flex; align-items: center; min-height: 480px; }
.loading-state { width: 100%; text-align: center; padding: 50px; color: #666; font-style: italic; }

.product-list {
  display: flex; gap: 15px; overflow-x: auto; scroll-behavior: smooth;
  padding: 5px 0 20px 0; width: 100%; scrollbar-width: none; 
}
.product-list::-webkit-scrollbar { display: none; }

/* OKLAR */
.nav-btn {
  width: 44px; height: 44px; border-radius: 4px; border: none;
  display: flex; align-items: center; justify-content: center;
  z-index: 10; position: absolute; transition: all 0.3s ease;
}
.nav-btn.active { background-color: #000; color: #fff; cursor: pointer; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }
.nav-btn.active:hover { background-color: #333; }
.nav-btn.disabled { background-color: #e0e0e0; color: #a0a0a0; cursor: default; pointer-events: none; }
.nav-btn.left { left: -22px; }
.nav-btn.right { right: -22px; }

/* KARTLAR */
.product-card {
  flex: 0 0 auto; width: 270px; background: white; border: 1px solid #e5e5e5;
  border-radius: 8px; padding: 15px; position: relative;
  display: flex; flex-direction: column; justify-content: space-between;
  transition: box-shadow 0.2s; min-height: 480px;
}
.product-card:hover { box-shadow: 0 10px 25px rgba(0,0,0,0.08); border-color: #ccc; }
.card-badge { position: absolute; top: 15px; left: 15px; background: black; color: white; font-size: 10px; font-weight: 700; padding: 5px 8px; border-radius: 2px; z-index: 2; }
.wishlist-icon { position: absolute; top: 15px; right: 15px; cursor: pointer; z-index: 2; }

/* Link olduğu için cursor eklendi */
.image-container { 
  width: 100%; height: 240px; display: flex; align-items: center; justify-content: center; 
  margin-bottom: 15px; margin-top: 10px; cursor: pointer; 
}
.image-container img { max-width: 100%; max-height: 100%; object-fit: contain; }

.card-info { text-align: left; flex-grow: 1; display: flex; flex-direction: column; }
.brand-name { font-size: 15px; font-weight: 800; color: #000; margin-bottom: 6px; text-transform: uppercase; }
.product-name { font-size: 14px; font-weight: 700; color: #000; margin: 0 0 6px 0; line-height: 1.4; height: 38px; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.product-variant { font-size: 14px; color: #757575; margin-bottom: 12px; }
.price { font-size: 15px; font-weight: 800; color: #000; margin-bottom: 10px; }
.rating-container { display: flex; align-items: center; gap: 5px; margin-bottom: 20px; margin-top: auto; }
.star { color: #000; font-size: 13px; letter-spacing: 1px; }
.review-count { font-size: 11px; color: #757575; margin-left: 2px; }

/* GÜNCELLENEN BUTON STİLİ */
.add-btn { 
  width: 100%; 
  background: white; 
  border: 2px solid #000; 
  color: #000; 
  font-size: 14px; 
  font-weight: 700; 
  padding: 12px 0; 
  border-radius: 15px; 
  cursor: pointer; 
  transition: all 0.2s;
  
  /* Link olduğu için eklenenler: */
  display: block; 
  text-align: center;
  text-decoration: none;
  box-sizing: border-box;
}
.add-btn:hover { background: #000; color: white; }

/* --- PROGRESS BAR --- */
.progress-container {
  width: 100%;
  margin-top: 25px; 
  display: flex;
  justify-content: center;
}

.progress-track {
  width: 100%; 
  height: 8px; 
  background-color: #e0e0e0; 
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.progress-thumb {
  height: 100%;
  background-color: #000; 
  border-radius: 4px;
  position: absolute;
  top: 0;
  transition: left 0.1s linear; 
}

@media (max-width: 900px) {
  .nav-btn { display: none; }
  .products-section { padding: 20px 15px; }
  .product-card { width: 200px; min-height: auto; }
  .image-container { height: 180px; }
}
</style>