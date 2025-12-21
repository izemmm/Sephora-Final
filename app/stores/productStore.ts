import { defineStore } from 'pinia'
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc // <-- Veri eklemek için bunu ekledik
} from 'firebase/firestore'

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [] as any[],
    loading: false
  }),
  actions: {
    // Ürünleri Çekme Fonksiyonu
    async fetchProducts() {
      this.loading = true
      const db = getFirestore()
      const querySnapshot = await getDocs(collection(db, 'products'))
      
      this.products = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))
      this.loading = false
    },

    // YENİ: Ürün Ekleme Fonksiyonu
    async addProduct(product: any) {
      const db = getFirestore()
      // 'products' koleksiyonuna yeni veri ekle
      await addDoc(collection(db, 'products'), product)
      
      // Listeyi güncellemek için yeniden çek
      await this.fetchProducts()
    }
  }
})