// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,

  modules: [
    '@nuxtjs/tailwindcss',
  ],

  devtools: { enabled: true },
  compatibilityDate: '2024-12-31',
})