<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
// Bileşenlerin otomatik import edildiğini varsayıyoruz, edilmiyorsa importları ekle.

// --- YUKARI ÇIK BUTONU MANTIĞI ---
const showScrollButton = ref(false)

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div class="layout-wrapper">
    <TheHeader />

    <main class="page-content">
      <slot />
    </main>

    <TheFooter />

    <transition name="fade">
      <button 
        v-show="showScrollButton" 
        class="scroll-to-top-btn" 
        @click="scrollToTop"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </transition>
  </div>
</template>

<style scoped>
.layout-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  font-family: 'Helvetica Neue', Arial, sans-serif;
}

.page-content {
  flex: 1; /* Footer'ı aşağı iter */
  width: 100%;
  min-height: 80vh;
}

/* --- YUKARI ÇIK BUTONU STİLLERİ --- */
.scroll-to-top-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 45px;
  height: 45px;
  background-color: #000;
  border: none;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 9999; 
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  transition: background-color 0.3s, transform 0.2s;
}

.scroll-to-top-btn:hover {
  background-color: #333;
  transform: translateY(-3px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
/* GLOBAL CSS */
body, html {
  margin: 0 !important;
  padding: 0 !important;
  width: 100%;
  overflow-x: hidden;
  box-sizing: border-box;
}
</style>