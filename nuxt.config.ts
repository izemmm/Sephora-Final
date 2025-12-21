// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  modules: [
    '@pinia/nuxt'
  ],

  // --- İŞTE ÇÖZÜM BURASI ---
  // Nuxt'a diyoruz ki: app/components/atoms içindekileri
  // 'AtomsBaseButton' diye değil, direkt 'BaseButton' diye tanı.
  components: [
    { path: 'components/atoms', pathPrefix: false },
    { path: 'components/molecules', pathPrefix: false },
    { path: 'components/organisms', pathPrefix: false },
    'components'
  ],

  typescript: {
    strict: true,
    typeCheck: true
  }
})