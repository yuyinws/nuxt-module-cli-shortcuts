export default defineNuxtConfig({
  modules: ['../src/module'],
  shortcuts: {
    rawMode: true,
    customShortCuts: [
      {
        key: 't',
        description: 'test custom shortcuts',
        action() {
          // eslint-disable-next-line no-console
          console.log('custom shortcuts works!')
        },
      },
    ],
  },
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
  },
})
