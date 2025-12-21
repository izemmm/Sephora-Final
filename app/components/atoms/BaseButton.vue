<script setup lang="ts">
// --- HOCANIN İSTEDİĞİ TYPESCRIPT KISMI ---
// Butonun alabileceği özellikleri (Props) tanımlıyoruz.
// 'variant' özelliği sadece 'primary' (Siyah) veya 'secondary' (Beyaz) olabilir.

interface Props {
  variant?: 'primary' | 'secondary' | 'danger'
  fullWidth?: boolean
}

// Varsayılan değerleri atıyoruz (Bir şey seçilmezse Siyah olsun)
withDefaults(defineProps<Props>(), {
  variant: 'primary',
  fullWidth: false
})
</script>

<template>
  <button 
    class="base-button" 
    :class="[variant, { 'full-width': fullWidth }]"
  >
    <slot />
  </button>
</template>

<style scoped>
.base-button {
  padding: 12px 24px;
  font-size: 14px;
  font-weight: 700; /* Kalın yazı */
  border-radius: 4px; /* Hafif yuvarlak köşe */
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: inherit;
}

/* --- VARYASYONLAR --- */

/* Primary: Siyah Zemin (Sepete Ekle gibi) */
.primary {
  background-color: black;
  color: white;
  border-color: black;
}
.primary:hover {
  background-color: #333; /* Biraz daha açık siyah */
}

/* Secondary: Beyaz Zemin (Giriş Yap gibi) */
.secondary {
  background-color: white;
  color: black;
  border-color: #ddd;
}
.secondary:hover {
  background-color: #f5f5f5;
  border-color: black;
}

/* Danger: Kırmızı (Silme işlemleri) */
.danger {
  background-color: #dc3545;
  color: white;
}

/* Full Width: Tam genişlik */
.full-width {
  width: 100%;
}
</style>