import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as any[], 
  }),
  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) => {
      // Fiyatları toplama mantığı
      if (state.items.length === 0) return "0 TL"
      let total = 0
      state.items.forEach(item => {
        // "1.149 TL" gibi stringleri sayıya çeviriyoruz
        let price = parseFloat(item.price.replace(' TL', '').replace('.', '').replace(',', '.'))
        if (!isNaN(price)) total += price
      })
      return total.toLocaleString('tr-TR') + " TL"
    }
  },
  actions: {
    addToCart(item: any) {
      this.items.push(item)
    },
    // İŞTE EKSİK OLAN VE HATA VERDİREN FONKSİYON BU:
    removeFromCart(itemId: any) {
      const index = this.items.findIndex(i => i.id === itemId)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    }
  }
})