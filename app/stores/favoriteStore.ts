import { defineStore } from 'pinia'
import { getFirestore, collection, addDoc, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const useFavoriteStore = defineStore('favorite', {
  state: () => ({
    items: [] as any[], // Favori ürün listesi
    loading: false
  }),

  actions: {
    // 1. FAVORİLERİ GETİR
    async fetchFavorites() {
      const auth = getAuth()
      const user = auth.currentUser
      
      if (!user) {
         this.items = []
         return
      }

      this.loading = true
      const db = getFirestore()
      
      try {
        // Sadece bu kullanıcının favorilerini çek
        const q = query(collection(db, "favorites"), where("userId", "==", user.uid))
        const querySnapshot = await getDocs(q)
        
        this.items = querySnapshot.docs.map(doc => ({
          docId: doc.id, // Silme işlemi için belgenin kendi ID'si
          ...doc.data()
        }))
      } catch (error) {
        console.error("Favoriler çekilemedi:", error)
      } finally {
        this.loading = false
      }
    },

    // 2. FAVORİ EKLE
    async addFavorite(product: any) {
      const auth = getAuth()
      const user = auth.currentUser
      if (!user) {
        alert("Favorilere eklemek için giriş yapmalısın!")
        return
      }

      const db = getFirestore()
      
      try {
        // Frontend kontrolü: Zaten listede varsa tekrar ekleme
        if (this.items.some(item => item.id === product.id)) return

        await addDoc(collection(db, "favorites"), {
          userId: user.uid,
          id: product.id,             // Mantıksal kontrol için ürün ID'si
          productName: product.name,  // Ekranda göstermek için İsim
          productPrice: product.price,// Ekranda göstermek için Fiyat
          productImage: product.image,// Ekranda göstermek için Resim
          addedAt: new Date()
        })
        
        // Listeyi güncelle
        await this.fetchFavorites()
      } catch (error) {
        console.error("Favori eklenirken hata:", error)
      }
    },

    // 3. FAVORİ SİL
    async removeFavorite(docId: string) {
      const db = getFirestore()
      try {
        await deleteDoc(doc(db, "favorites", docId))
        // Listeden anlık olarak sil (performans için)
        this.items = this.items.filter(item => item.docId !== docId)
      } catch (error) {
        console.error("Favori silinirken hata:", error)
      }
    },

    // 4. TOGGLE (VARSA SİL, YOKSA EKLE) - [id].vue sayfası için gerekli
    async toggleFavorite(product: any) {
      const auth = getAuth()
      if (!auth.currentUser) {
        alert("Favorilere eklemek için lütfen giriş yapın.")
        return
      }

      // Bu ürün zaten favorilerde mi? (ID kontrolü)
      const existingItem = this.items.find(item => item.id === product.id)

      if (existingItem) {
        // Varsa sil (docId kullanarak)
        await this.removeFavorite(existingItem.docId)
      } else {
        // Yoksa ekle
        await this.addFavorite(product)
      }
    }
  }
})