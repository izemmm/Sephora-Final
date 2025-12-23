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
        let rawPrice = item.price
        let finalPrice = 0

        if (typeof rawPrice === 'number') {
          finalPrice = rawPrice
        } else {
          // "1.250 TL" gibi string fiyatları sayıya çevir
          let cleanString = String(rawPrice)
          cleanString = cleanString.replace(/\./g, '') // Binlik ayırıcıyı sil
          cleanString = cleanString.replace(',', '.')  // Virgülü nokta yap
          cleanString = cleanString.replace(/[^0-9.]/g, '') // Harfleri sil
          finalPrice = parseFloat(cleanString)
        }

        let quantity = item.quantity || 1
        if (!isNaN(finalPrice)) {
          total += finalPrice * quantity
        }
      })
      // Sonucu Türk Lirası formatında döndür
      return total.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " TL"
    },
    
    // Tek bir ürünün toplam fiyatını hesapla (Adet x Birim Fiyat)
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

    addToCart(newItem: any) {
      // 1. Sepette bu ürün zaten var mı diye kontrol et
      const existingItem = this.items.find(item => item.id === newItem.id)

      if (existingItem) {
        // VARSA: Sadece miktarını 1 arttır
        existingItem.quantity = (existingItem.quantity || 1) + 1
      } else {
        // YOKSA: Yeni ürün olarak ekle ve miktarını 1 yap
        // (Reaktifliği koparmak için {...newItem} ile kopyalıyoruz)
        this.items.push({ ...newItem, quantity: 1 })
      }

      this.saveToLocalStorage()
    },

    updateQuantity(itemId: any, quantity: number) {
      const item = this.items.find(i => i.id === itemId)
      if (item) {
        item.quantity = parseInt(String(quantity))
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

    // YENİ EKLENEN: Sipariş tamamlanınca sepeti boşaltmak için
    clearCart() {
      this.items = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      if (process.client) {
        localStorage.setItem('mySephoraCart', JSON.stringify(this.items))
      }
    }
  }
})