import readline from 'node:readline'
import open from 'open'
import colors from 'picocolors'
import { tryUseNuxt } from '@nuxt/kit'
import { logger } from './logger'
import type { ShortCut } from './types'

export function createShortCuts() {
  let url = ''
  let actionRunning = false

  const rl = readline.createInterface({ input: process.stdin })

  const shortcuts: ShortCut[] = [
    {
      key: 'u',
      description: 'show server url',
      action() {
        logger.log(
          colors.green(' ➜ Local: ')
          + colors.cyan(colors.underline(url)),
        )
      },
    },
    {
      key: 'r',
      description: 'restart the nuxt server',
      action() {
        const nuxt = tryUseNuxt()
        nuxt?.callHook('restart')
      },
    },
    {
      key: 'o',
      description: 'open in browser',
      action: async () => {
        await open(url)
      },
    },
    {
      key: 'c',
      description: 'clear console',
      action() {
        console.clear()
      },
    },
  ]

  function bindShortCuts() {
    logger.log(
      colors.dim(colors.green('  ➜'))
      + colors.dim(' press ')
      + colors.bold('h + enter')
      + colors.dim(' to show help\n'),
    )

    rl.on('line', async (input: string) => {
      if (actionRunning) return

      if (input === 'h') {
        for (const shortcut of shortcuts) {
          logger.info(
            colors.dim('  press ')
            + colors.bold(`${shortcut.key} + enter`)
            + colors.dim(` to ${shortcut.description}`),
          )
        }

        return
      }

      const shortcut = shortcuts.find(shortcut => shortcut.key === input)
      if (!shortcut || shortcut.action == null) return

      actionRunning = true
      await shortcut.action()
      actionRunning = false
    })
  }

  function setUrl(_url: string) {
    url = _url
  }

  function close() {
    rl.close()
  }

  bindShortCuts()

  return {
    setUrl,
    close,
  }
}
