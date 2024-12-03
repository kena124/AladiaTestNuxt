// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  plugins: ['~/plugins/element-plus'],
  modules: ['@nuxtjs/tailwindcss'],
  css: [
    '~/assets/styles/tokens.scss',
    '@fortawesome/fontawesome-free/css/all.min.css',
  ],
  
})
