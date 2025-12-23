import { defineStore } from 'pinia'
import { 
  getFirestore, 
  collection, 
  addDoc, 
  serverTimestamp, 
  query, 
  where, 
  getDocs
  // orderBy'ı sildik, çünkü veritabanı ayarı gerektiriyor ve listeyi engelliyor
} from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [] as any[], 
    loading: false
  }),

  actions: {
    // 1. SİPARİŞ OLUŞTURMA
    async createOrder(cartItems: any[], totalPrice: string) {
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) throw new Error("Kullanıcı girişi yapılmamış!")

      const db = getFirestore()
      
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        userEmail: user.email,
        items: cartItems,
        totalAmount: totalPrice,
        status: 'Hazırlanıyor',
        orderDate: serverTimestamp()
      })
    },

    // 2. SİPARİŞLERİ ÇEKME (DÜZELTİLMİŞ HALİ)
    async fetchOrders() {
      const auth = getAuth()
      const user = auth.currentUser

      if (!user) {
        this.orders = []
        return
      }

      this.loading = true
      const db = getFirestore()
      
      try {
        // --- DÜZELTME: SADECE KULLANICI FİLTRESİ ---
        // orderBy("orderDate", "desc") kısmını kaldırdık.
        // Artık veritabanı hatası vermeden verileri çekecek.
        const q = query(
          collection(db, "orders"), 
          where("userId", "==", user.uid)
        )

        const querySnapshot = await getDocs(q)
        
        this.orders = querySnapshot.docs.map(doc => {
          const data = doc.data()
          
          // Tarih formatlama işlemleri
          let dateStr = 'Tarih Bilgisi Yok'
          if (data.orderDate) {
             const dateObj = data.orderDate.toDate ? data.orderDate.toDate() : new Date(data.orderDate.seconds * 1000)
             dateStr = dateObj.toLocaleDateString('tr-TR', {
                day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
             })
          }
          
          return {
            id: doc.id,
            ...data,
            formattedDate: dateStr
          }
        })
      } catch (error) {
        console.error("Siparişler çekilirken hata:", error)
      } finally {
        this.loading = false
      }
    }
  }
})