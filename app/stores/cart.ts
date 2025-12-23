import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[], 
  }),

  getters: {
    totalItems: (state) => state.items.reduce((total, item) => total + (item.quantity || 1), 0),

    // SEPETİN GENEL TOPLAMI (Tüm ürünler)
    totalPrice: (state) => {
      let total = 0
      state.items.forEach(item => {
        // Fiyat temizleme mantığını tekrar kullanmamak için aşağıda helper yaptık ama
        // mevcut yapını bozmadan burayı böyle bırakıyorum, mantık doğru.
        let rawPrice = item.price
        let finalPrice = 0

        if (typeof rawPrice === 'number') {
          finalPrice = rawPrice
        } else {
          let cleanString = String(rawPrice)
          cleanString = cleanString.replace(/\./g, '')
          cleanString = cleanString.replace(',', '.')
          cleanString = cleanString.replace(/[^0-9.]/g, '')
          finalPrice = parseFloat(cleanString)
        }

        let quantity = item.quantity || 1
        if (!isNaN(finalPrice)) {
          total += finalPrice * quantity
        }
      })
      return total.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL"
    },
    
    // YENİ EKLENEN: Tek bir ürünün toplam fiyatını hesaplamak için (Adet x Birim Fiyat)
    // Bunu ürün kartında "3.015 TL" yazan yerde kullanacaksın.
    getItemTotal: (state) => (item: any) => {
        let rawPrice = item.price
        let finalPrice = 0
        if (typeof rawPrice === 'number') {
          finalPrice = rawPrice
        } else {
          let cleanString = String(rawPrice).replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '')
          finalPrice = parseFloat(cleanString)
        }
        
        let quantity = item.quantity || 1
        let total = finalPrice * quantity
        
        return total.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL"
    }
  },

  actions: {
    initializeCart() {
      if (process.client) {
        const savedCart = localStorage.getItem('mySephoraCart')
        if (savedCart) {
          try {
            this.items = JSON.parse(savedCart)
          } catch (e) {
            localStorage.removeItem('mySephoraCart')
          }
        }
      }
    },

    addToCart(item: any) {
      // Ürüne varsayılan olarak quantity 1 ekleyelim (yoksa)
      if(!item.quantity) {
          item.quantity = 1;
      }
      this.items.push(item)
      this.saveToLocalStorage()
    },

    // --- YENİ EKLENEN FONKSİYON ---
    // Dropdown değişince bunu çağıracaksın
    updateQuantity(itemId: any, quantity: number) {
      const item = this.items.find(i => i.id === itemId)
      if (item) {
        item.quantity = parseInt(String(quantity)) // Gelen veriyi sayıya çevirip kaydet
        this.saveToLocalStorage()
      }
    },

    removeFromCart(itemId: any) {
      const index = this.items.findIndex(i => i.id === itemId)
      if (index !== -1) {
        this.items.splice(index, 1)
        this.saveToLocalStorage()
      }
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('mySephoraCart', JSON.stringify(this.items))
      }
    }
  }
})