import { env } from 'node:process'
import { defineNuxtModule } from '@nuxt/kit'
import { createShortCuts } from './shortcuts'

export interface ModuleOptions {}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-module-cli-shortcuts',
    configKey: 'cliShortcuts',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, nuxt) {
    if (env.NODE_ENV === 'development') {
      const { setUrl, close } = createShortCuts()

      nuxt.hook('listen', async (_, listener) => {
        setUrl(listener.url)
      })

      nuxt.hook('close', () => {
        close()
      })
    }
  },
})
