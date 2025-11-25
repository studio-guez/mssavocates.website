// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  devServer: {
    port: 3001,
    https: true,
  },
  css: [
    '@/assets/_main.scss'
  ],
  ssr: true,
})
