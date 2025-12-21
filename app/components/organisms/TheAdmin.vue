<script setup lang="ts">
import { ref } from 'vue'
import { useProductStore } from '~/stores/productStore'

const productStore = useProductStore()

// Form Verileri
const name = ref('')
const price = ref('')
const image = ref('')
const status = ref('')

const handleAddProduct = async () => {
  if (!name.value || !price.value || !image.value) {
    status.value = 'Lütfen tüm alanları doldur!'
    return
  }

  status.value = 'Ekleniyor...'
  
  try {
    // Store'daki ekleme fonksiyonunu çağır
    await productStore.addProduct({
      name: name.value,
      price: price.value, // Fiyatı string veya number olarak gönderebilirsin
      image: image.value
    })
    
    status.value = '✅ Ürün Başarıyla Eklendi!'
    // Formu temizle
    name.value = ''
    price.value = ''
    image.value = ''
  } catch (error) {
    console.error(error)
    status.value = '❌ Hata oluştu!'
  }
}
</script>

<template>
  <div class="admin-panel">
    <h3>🛠️ Hızlı Ürün Ekleme Paneli</h3>
    
    <div class="form-group">
      <input v-model="name" placeholder="Ürün Adı (Örn: Sephora Ruj)" type="text" />
      <input v-model="price" placeholder="Fiyat (Örn: 500)" type="text" />
      <input v-model="image" placeholder="Resim Linki (URL)" type="text" />
      
      <button @click="handleAddProduct">Veritabanına Kaydet</button>
    </div>

    <p v-if="status" class="status-msg">{{ status }}</p>
  </div>
</template>

<style scoped>
.admin-panel {
  background-color: #f3f4f6;
  border: 2px dashed #9ca3af;
  padding: 30px;
  margin: 50px auto;
  max-width: 600px;
  text-align: center;
  border-radius: 12px;
  font-family: sans-serif;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
input {
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 14px;
}
button {
  background-color: #000;
  color: white;
  padding: 12px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  border: none;
}
button:hover { background-color: #333; }
.status-msg { margin-top: 15px; font-weight: bold; }
</style>