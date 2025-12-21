<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProductStore } from '~/stores/productStore'
import { useCartStore } from '~/stores/cart'
import { onMounted, computed, ref, watch } from 'vue'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const activeImageIndex = ref(0)

onMounted(async () => {
  if (productStore.products.length === 0) {
    await productStore.fetchProducts()
  }
})

const product = computed(() => {
  const currentId = route.params.id as string
  return productStore.products.find(p => p.id === currentId)
})

// --- GÜNCELLENEN RESİM MANTIĞI ---
const imageList = computed(() => {
  const p = product.value
  if (!p) return []

  // 1. ÖNCELİK: Firebase 'images' dizisi varsa SADECE onu kullan.
  // Ana resmi ('image') buraya karıştırmıyoruz.
  if ((p as any).images && Array.isArray((p as any).images) && (p as any).images.length > 0) {
    return (p as any).images
  }

  // 2. FALLBACK: Eğer 'images' dizisi hiç yoksa (eski ürünse),
  // mecburen ana resmi gösterelim ki sayfa boş kalmasın.
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

const prevImage = () => {
  if (imageList.value.length <= 1) return 
  if (activeImageIndex.value > 0) {
    activeImageIndex.value--
  } else {
    activeImageIndex.value = imageList.value.length - 1
  }
}

const nextImage = () => {
  if (imageList.value.length <= 1) return 
  if (activeImageIndex.value < imageList.value.length - 1) {
    activeImageIndex.value++
  } else {
    activeImageIndex.value = 0
  }
}

const setImage = (index: number) => {
  activeImageIndex.value = index
}

watch(() => route.params.id, () => {
    activeImageIndex.value = 0
})

const handleAddToCart = () => {
  if (product.value) {
    cartStore.addToCart(product.value)
  }
}
</script>

<template>
  <div class="product-page-wrapper">
    
    <div v-if="productStore.loading" class="loading-state">Yükleniyor...</div>
    <div v-else-if="!product" class="error-state">Ürün bulunamadı.</div>

    <div v-else class="content-container">
      
      <nav class="breadcrumb">
        <span>Ana Sayfa</span> / <span>Makyaj</span> / <span>Setler</span> / <span class="current">Makyaj Seti</span>
      </nav>

      <div class="product-grid">
        
        <div class="images-section">
          
          <div class="thumbnails-column" v-if="imageList.length > 0">
            <button class="nav-arrow up" @click="prevImage" v-if="imageList.length > 1">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
            </button>

            <div class="thumb-wrapper">
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

            <button class="nav-arrow down" @click="nextImage" v-if="imageList.length > 1">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </button>
          </div>

          <div class="main-image-container">
            <transition name="fade-img" mode="out-in">
                <img :key="currentMainImage" :src="currentMainImage" :alt="product.name" class="main-img" />
            </transition>
          </div>
        </div>

        <div class="details-section">
          
          <div class="badge-wrapper">
            <span class="pink-badge">2 VE ÜZERİ İNDİRİM</span>
          </div>

          <a href="#" class="brand-link">SEPHORA COLLECTION</a>

          <h1 class="product-title">{{ product.name }}</h1>

          <div class="rating-row">
            <div class="stars">★★★★★</div>
            <a href="#" class="review-link">0 Ürün Yorumu</a>
          </div>

          <p class="description-preview">
            Set içeriği: Çanta (U150 mm x G170 mm x Y100 mm) Waterproof 12H Retractable eyeliner - 01 matte black...
            <a href="#" class="read-more">Devamını oku</a>
          </p>

          <div class="price-row">
            {{ product.price }}
          </div>

          <div class="variant-box selected">
            <div class="variant-img-small">
              <img :src="imageList[0]" alt="small" v-if="imageList.length > 0" />
            </div>
            <span class="variant-text">0,30 g + 14 ml + 5 ml + 6 ml + 3,5 g + 6,5 ml</span>
          </div>

          <button @click="handleAddToCart" class="add-to-cart-btn">
            Sepete ekle
          </button>

          <div class="extras-row">
            <div class="points-info">
              <span class="wallet-icon">💳</span>
              <span>+ {{ Math.floor(parseInt(product.price) || 0) }} puan</span>
            </div>
            <div class="payment-icons">
              <span class="secure-text">Güvenli ödeme</span>
              <div class="cards">
                <span class="card-icon">VISA</span>
                <span class="card-icon mc">MasterCard</span>
                <span class="card-icon troy">Troy</span>
              </div>
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
  max-width: 1300px;
  margin-left: 5%; /* Sola hizalama korundu */
  margin-right: auto;
  padding: 30px 0;
  font-family: 'Inter', sans-serif;
  color: #000;
}

.loading-state, .error-state { text-align: center; padding: 50px; font-size: 16px; color: #666; }

/* Breadcrumb */
.breadcrumb { font-size: 12px; color: #666; margin-bottom: 25px; }
.breadcrumb span { cursor: pointer; }
.breadcrumb .current { font-weight: 700; color: #000; }

/* Grid Layout */
.product-grid {
  display: flex;
  gap: 60px;
}

/* --- SOL TARAF (GALERİ) --- */
.images-section {
  flex: 0 0 55%;
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.thumbnails-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px; 
  width: auto;
  padding: 5px 0;
}

.thumb-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.nav-arrow {
  background: white;
  border: none;
  border-radius: 50%;
  width: 40px; 
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1); 
  transition: transform 0.2s, box-shadow 0.2s;
  z-index: 2;
  color: #000;
}

.nav-arrow:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.nav-arrow svg { width: 18px; height: 18px; stroke-width: 2; }

.thumb-item {
  width: 70px; 
  height: 70px; 
  border: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  overflow: hidden;
  transition: all 0.2s ease;
  background: #fff;
  padding: 2px;
}

.thumb-item.active { border: 2px solid #000; }

.thumb-item img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  display: block;
}

.main-image-container {
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #fff;
  height: 520px; 
}
.main-img {
  width: auto;
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
.fade-img-enter-active, .fade-img-leave-active { transition: opacity 0.2s ease; }
.fade-img-enter-from, .fade-img-leave-to { opacity: 0; }


/* --- SAĞ TARAF (DETAYLAR) --- */
.details-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-top: 5px;
}

.badge-wrapper { margin-bottom: 12px; }
.pink-badge {
  background-color: #D3004C;
  color: white;
  font-size: 11px;
  font-weight: 800;
  padding: 5px 10px;
  border-radius: 2px;
  text-transform: uppercase;
}

.brand-link {
  text-decoration: underline;
  font-size: 13px;
  font-weight: 700;
  color: #000;
  text-transform: uppercase;
  margin-bottom: 5px;
  display: block;
}

.product-title {
  font-size: 28px;
  font-weight: 800;
  margin: 0 0 10px 0;
  line-height: 1.2;
}

.rating-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
}
.stars { color: #e0e0e0; letter-spacing: 1px; font-size: 14px; }
.review-link { text-decoration: underline; font-size: 13px; color: #000; }

.description-preview {
  font-size: 15px;
  line-height: 1.5;
  color: #000;
  margin-bottom: 25px;
}
.read-more { text-decoration: underline; font-weight: 700; color: #000; margin-left: 5px; cursor: pointer; }

.price-row {
  font-size: 26px;
  font-weight: 800;
  margin-bottom: 25px;
}

/* Varyant Kutusu */
.variant-box {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  display: flex;
  align-items: center;
  gap: 15px;
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 30px;
  width: 100%;
  box-sizing: border-box;
}
.variant-img-small { width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; }
.variant-img-small img { max-width: 100%; max-height: 100%; object-fit: contain; }
.variant-text { font-size: 13px; font-weight: 600; color: #000; }

/* Buton */
.add-to-cart-btn {
  width: 100%;
  background-color: #000;
  color: #fff;
  font-size: 15px;
  font-weight: 700;
  padding: 18px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: opacity 0.2s;
  margin-bottom: 30px;
  text-transform: none; 
}
.add-to-cart-btn:hover { opacity: 0.85; }

/* Footer Altı */
.extras-row {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end; 
  gap: 10px;
  margin-top: auto;
  padding-top: 15px;
  border-top: 1px solid #e5e5e5;
}

.points-info {
  font-size: 12px;
  font-weight: 600;
  text-decoration: underline;
  display: flex;
  align-items: center;
  gap: 5px;
  cursor: pointer;
}
.wallet-icon { font-size: 16px; }

.payment-icons { text-align: right; }
.secure-text { font-size: 11px; font-weight: 500; display: block; margin-bottom: 5px; color: #000; }
.cards { display: flex; gap: 5px; justify-content: flex-end; }
.card-icon {
  background: #f0f0f0;
  padding: 3px 6px;
  font-size: 9px;
  font-weight: bold;
  border-radius: 2px;
  color: #555;
  display: flex; align-items: center;
}
.card-icon.mc { background: #333; color: white; }
.card-icon.troy { background: #26C6DA; color: white; }
.card-icon svg { width: 20px; height: auto; }

@media (max-width: 900px) {
  .product-page-wrapper { margin: 0 auto; padding: 20px; }
  .product-grid { flex-direction: column; gap: 30px; }
  .images-section { flex-direction: column-reverse; width: 100%; flex: auto; gap: 20px; }
  .thumbnails-column { flex-direction: row; justify-content: center; width: 100%; gap: 15px; padding: 0; }
  .nav-arrow { transform: rotate(90deg); box-shadow: none; border: 1px solid #eee; }
  .main-image-container { height: auto; max-height: 400px; }
}
</style>