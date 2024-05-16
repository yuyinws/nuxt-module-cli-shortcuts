export default defineNuxtConfig({
  modules: ['../src/module'],
  shortcuts: {
    rawMode: false,
  },
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
})
