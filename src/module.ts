import { defineNuxtModule } from '@nuxt/kit'
import { createShortCuts } from './shortcuts'
import type { ModuleOptions } from './types'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-module-cli-shortcuts',
    configKey: 'shortcuts',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    rawMode: true,
    customShortCuts: [],
  },
  setup(options, nuxt) {
    nuxt.hook('listen', async (_, listener) => {
      const { setUrl } = createShortCuts(options)
      const urls = await listener.getURLs()
      setUrl(urls)
    })
  },
})
