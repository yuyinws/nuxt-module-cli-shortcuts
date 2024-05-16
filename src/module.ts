import { env } from 'node:process'
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
    rawMode: false,
  },
  setup(options, nuxt) {
    if (env.NODE_ENV === 'development') {
      const { setUrl, close } = createShortCuts(options)

      nuxt.hook('listen', async (_, listener) => {
        setUrl(listener.url)
      })

      nuxt.hook('close', () => {
        close()
      })
    }
  },
})
