import type { Nuxt } from '@nuxt/schema'

export interface ShortCut {
  key: string
  description: string
  action: (meta: {
    nuxt: Nuxt | null
    urls: NuxtDevServerUrl[]
  }) => void | Promise<void>
}

export interface ModuleOptions {
  rawMode: boolean
}

export interface NuxtDevServerUrl {
  url: string
  type: string
}
