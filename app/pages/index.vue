<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div class="home-page-container">
    <div class="section-block">
      <TheHero />
    </div>
    
    <div class="section-block">
      <TheCampaigns />
    </div>
    
    <div class="section-block">
      <TheProducts />
    </div>

  </div>
</template>

<style scoped>
/* Bu stil bileşenlerin kesinlikle alt alta durmasını 
   ve tam genişlik kaplamasını sağlar 
*/
.home-page-container {
  display: flex;
  flex-direction: column; /* Alt alta diz */
  width: 100%;
  max-width: 100vw; /* Ekran dışına taşmayı önle */
  overflow-x: hidden; /* Yatay kaydırmayı engelle */
}

.section-block {
  width: 100%;
  display: block;
  position: relative; /* Üst üste binmeleri engeller */
}
</style>