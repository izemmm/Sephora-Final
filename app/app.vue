<script setup>
import { onMounted } from 'vue'
import { useCartStore } from '~/stores/cart'

const cartStore = useCartStore()

// Sayfa yüklendiğinde: "Hafızada (LocalStorage) sepet var mı?" diye bak
onMounted(() => {
  cartStore.initializeCart()
})
</script>

<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>