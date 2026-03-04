// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },

  app: {
    baseURL: '/',
  },

  runtimeConfig: {
    secret_API_AUTH_EMAIL: process.env.API_AUTH_EMAIL,
    secret_API_AUTH_PASSWORD: process.env.API_AUTH_PASSWORD,
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE,
    }
  },

  devServer: {
    port: 3001,
  },
  css: [
    '@/assets/_main.scss'
  ],
  ssr: true,
})
