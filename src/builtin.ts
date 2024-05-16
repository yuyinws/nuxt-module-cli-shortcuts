import process from 'node:process'
import open from 'open'
import colors from 'picocolors'
import type { ShortCut } from './types'
import { logger } from './logger'
import { upperCaseFirst } from './utils'

export const builtinShortcuts: ShortCut[] = [
  {
    key: 'u',
    description: 'show server url',
    async action({ urls }) {
      for (const url of urls) {
        logger.info(
          colors.green(` ➜ ${upperCaseFirst(url.type)}: `)
          + colors.cyan(colors.underline(url.url)),
        )
      }
    },
  },
  {
    key: 'r',
    description: 'restart the nuxt server',
    action({ nuxt }) {
      nuxt?.callHook('restart')
    },
  },
  {
    key: 'o',
    description: 'open in browser',
    action: async ({ urls }) => {
      await open(urls[0].url)
    },
  },
  {
    key: 'c',
    description: 'clear console',
    action() {
      // eslint-disable-next-line no-console
      console.clear()
    },
  },
  {
    key: 'q',
    description: 'exit',
    async action({ nuxt }) {
      await nuxt?.callHook('close', nuxt).finally(() => {
        process.exit(1)
      })
    },
  },
]
