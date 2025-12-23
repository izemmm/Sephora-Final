<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductStore } from '~/stores/productStore'
import { useCartStore } from '~/stores/cart'
import { useFavoriteStore } from '~/stores/favoriteStore' // Favori Store eklendi
import { onMounted, computed, ref, watch } from 'vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()
const favoriteStore = useFavoriteStore() // Store'u çağır

const activeImageIndex = ref(0)

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
  // Sayfa yüklendiğinde favorileri de çekelim ki ikon dolu/boş görünsün
  await favoriteStore.fetchFavorites()
})

const product = computed(() => {
  const currentId = route.params.id as string
  return productStore.products.find(p => p.id === currentId)
})

// --- FAVORİ KONTROLÜ ---
const isFavorite = computed(() => {
  if (!product.value) return false
  // Store'daki listede bu ürün var mı kontrol et
  return favoriteStore.items.some((item: any) => item.id === product.value.id)
})

const toggleFavorite = () => {
  if (product.value) {
    favoriteStore.toggleFavorite(product.value)
  }
}

// --- RESİM MANTIĞI ---
const imageList = computed(() => {
  const p = product.value
  if (!p) return []
  if ((p as any).images && Array.isArray((p as any).images) && (p as any).images.length > 0) {
    return (p as any).images
  }
  if (p.image) {
    return [p.image]
  }
  return []
})

const currentMainImage = computed(() => {
  if (imageList.value.length > 0) {
    return imageList.value[activeImageIndex.value]
  }
  return product.value?.image 
})

const setImage = (index: number) => {
  activeImageIndex.value = index
}

watch(() => route.params.id, () => {
    activeImageIndex.value = 0
})

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
    alert('Ürün sepete eklendi!')
  }
}
</script>

<template>
  <div class="product-page-wrapper">
    
    <div v-if="productStore.loading" class="loading-state">Yükleniyor...</div>
    <div v-else-if="!product" class="error-state">Ürün bulunamadı.</div>

    <div v-else class="content-container">
      
      <nav class="breadcrumb">
        <span>Ana Sayfa</span> / <span>Vücut ve Banyo</span> / <span class="current">Banyo Ve Duş Setleri</span>
      </nav>

      <div class="product-grid">
        
        <div class="images-section">
          <div class="thumbnails-column" v-if="imageList.length > 0">
            <div 
              v-for="(img, index) in imageList" 
              :key="index"
              class="thumb-item" 
              :class="{ active: index === activeImageIndex }"
              @click="setImage(index)"
            >
              <img :src="img" alt="thumbnail" />
            </div>
          </div>

          <div class="main-image-container">
             <img :src="currentMainImage" :alt="product.name" class="main-img" />
          </div>
        </div>

        <div class="details-section">
          
          <button class="fav-btn-absolute" @click="toggleFavorite">
            <svg v-if="isFavorite" width="24" height="24" viewBox="0 0 24 24" fill="#D3004C" stroke="#D3004C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>

          <div class="badge-wrapper">
            <span class="pink-badge">2 Ve Üzeri İndirim</span>
          </div>

          <a href="#" class="brand-link">SEPHORA COLLECTION</a>

          <h1 class="product-title">{{ product.name }}</h1>

          <div class="rating-row">
            <div class="stars">
               <span style="color:#dcdcdc">★★★★★</span> 
               <span class="review-link">0 Ürün Yorumu</span>
            </div>
          </div>

          <p class="description-preview">
            %100 Hindistan cevizi kokulu banyo ve vücut setiyle keyifli bir bakım molası yaşayın. Banyo ve vücut...
            <a href="#" class="read-more">Devamını oku</a>
          </p>

          <div class="price-row">
            {{ product.price }}
          </div>

          <div class="variant-selector">
            <div class="variant-box selected">
              <img :src="currentMainImage" class="variant-img-small" />
              <span class="variant-text">5 ml</span>
            </div>
          </div>

          <button @click="handleAddToCart" class="add-to-cart-btn">
            Sepete ekle
          </button>

          <div class="extras-row">
            <div class="points-info">
              <span class="wallet-icon">💳</span>
              <span>+ <strong>{{ Math.floor(parseInt(product.price) || 15) }} puan</strong></span>
            </div>
          </div>

          <div class="payment-info">
             <span class="payment-label">Güvenli ödeme</span>
             <div class="card-icons">
               <span class="card visa">VISA</span>
               <span class="card mc">MasterCard</span> 
               <span class="card troy">Troy</span>
             </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.product-page-wrapper {
  max-width: 1250px;
  margin: 0 auto;
  padding: 30px 20px;
  font-family: 'Inter', sans-serif;
  color: #000;
}

.loading-state, .error-state { text-align: center; padding: 50px; font-size: 16px; color: #666; }

.breadcrumb { font-size: 11px; color: #666; margin-bottom: 30px; letter-spacing: 0.3px; }
.breadcrumb span { cursor: pointer; }
.breadcrumb .current { font-weight: 700; color: #000; }

.product-grid {
  display: flex;
  gap: 50px;
}

/* --- SOL TARAF --- */
.images-section {
  flex: 1.3;
  display: flex;
  gap: 15px;
}

.thumbnails-column {
  display: flex;
  flex-direction: column;
  gap: 10px; 
}

.thumb-item {
  width: 55px; 
  height: 55px; 
  border: 1px solid #e0e0e0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  overflow: hidden;
  padding: 2px;
  transition: border-color 0.2s;
}
.thumb-item.active { border: 1px solid #000; }
.thumb-item img { max-width: 100%; max-height: 100%; object-fit: contain; }

.main-image-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
.main-img {
  width: 100%;
  max-width: 500px;
  height: auto;
  object-fit: contain;
}

/* --- SAĞ TARAF --- */
.details-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  position: relative; /* Kalp ikonunu konumlandırmak için gerekli */
}

/* FAVORİ BUTONU KONUMLANDIRMA */
.fav-btn-absolute {
  position: absolute;
  top: 0;
  right: 0;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 5px;
}
.fav-btn-absolute:hover svg {
  opacity: 0.7;
}

.badge-wrapper { margin-bottom: 12px; }
.pink-badge {
  background-color: #D3004C;
  color: white;
  font-size: 10px;
  font-weight: 700;
  padding: 5px 10px;
  border-radius: 2px;
  text-transform: uppercase;
}

.brand-link {
  text-decoration: underline;
  font-size: 12px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 8px;
  display: block;
}

.product-title {
  font-size: 22px;
  font-weight: 800;
  margin: 0 0 10px 0;
  line-height: 1.3;
  padding-right: 40px; /* Kalp ikonuna yer açmak için */
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 15px;
}
.stars { font-size: 14px; letter-spacing: 1px; }
.review-link { text-decoration: underline; font-size: 12px; color: #555; margin-left: 5px; cursor: pointer; }

.description-preview {
  font-size: 13px;
  line-height: 1.5;
  color: #000;
  margin-bottom: 25px;
  max-width: 90%;
}
.read-more { text-decoration: underline; font-weight: 700; color: #000; margin-left: 3px; font-size: 12px; }

.price-row {
  font-size: 20px;
  font-weight: 900;
  margin-bottom: 20px;
}

.variant-selector {
  width: 100%;
  margin-bottom: 30px;
}
.variant-box {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  background-color: #fff;
  width: 100%;
  box-sizing: border-box;
}

.variant-img-small { width: 30px; height: 30px; object-fit: contain; }
.variant-text { font-size: 13px; font-weight: 700; color: #000; }

.add-to-cart-btn {
  width: 100%;
  background-color: #000;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  padding: 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-bottom: 20px;
  text-transform: none; 
}
.add-to-cart-btn:hover { opacity: 0.9; }

.extras-row {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 40px;
}

.points-info {
  font-size: 11px;
  font-weight: 400;
  color: #000;
  display: flex;
  align-items: center;
  gap: 5px;
}
.wallet-icon { font-size: 14px; }

.payment-info {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 15px;
  border-top: 1px solid transparent; 
}
.payment-label { font-size: 12px; font-weight: 600; color: #000; }

.card-icons { display: flex; gap: 5px; }
.card {
  font-size: 8px; font-weight: bold; padding: 2px 5px; 
  background: #f2f2f2; border-radius: 2px; color: #333;
  display: flex; align-items: center; justify-content: center;
  min-width: 25px;
}
.visa { color: #1a1f71; }
.mc { background: #333; color: white; }
.troy { color: #00afda; }

@media (max-width: 900px) {
  .product-page-wrapper { margin: 0 auto; padding: 20px; }
  .product-grid { flex-direction: column; gap: 30px; }
  .images-section { flex-direction: column-reverse; width: 100%; }
  .thumbnails-column { flex-direction: row; justify-content: center; width: 100%; gap: 10px; }
  .main-image-container { height: auto; max-height: 400px; }
}
</style>