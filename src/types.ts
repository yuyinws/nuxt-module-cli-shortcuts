import type { Nuxt } from '@nuxt/schema'

export interface ShortCut {
  key: string
  description: string
  action: (nuxt?: Nuxt | null) => void | Promise<void>
}

export interface ModuleOptions {
  rawMode: boolean
}
