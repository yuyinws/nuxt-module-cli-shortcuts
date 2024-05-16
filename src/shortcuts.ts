import readline from 'node:readline'
import process, { stdin } from 'node:process'
import open from 'open'
import colors from 'picocolors'
import { tryUseNuxt } from '@nuxt/kit'
import { logger } from './logger'
import type { ModuleOptions, ShortCut } from './types'

export function createShortCuts(options: ModuleOptions) {
  const { rawMode } = options
  let url = ''
  let actionRunning = false
  let rl: readline.Interface | null = null

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
      action(nuxt) {
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
        // eslint-disable-next-line no-console
        console.clear()
      },
    },
    {
      key: 'q',
      description: 'exit',
      async action(nuxt) {
        await nuxt?.callHook('close', nuxt).finally(() => {
          process.exit(1)
        })
      },
    },
  ]

  async function onInput(input: string) {
    const nuxt = tryUseNuxt()

    if (rawMode) {
      if (input === '\x03' || input === '\x04') {
        await nuxt?.callHook('close', nuxt).finally(() => {
          process.exit(1)
        })
      }
    }

    if (actionRunning)
      return

    if (input === 'h') {
      for (const shortcut of shortcuts) {
        logger.info(
          colors.dim('  press ')
          + colors.bold(`${shortcut.key}${rawMode ? '' : ' + enter'}`)
          + colors.dim(` to ${shortcut.description}`),
        )
      }

      return
    }

    const shortcut = shortcuts.find(shortcut => shortcut.key === input)
    if (!shortcut || shortcut.action == null)
      return

    actionRunning = true
    await shortcut.action(nuxt)
    actionRunning = false
  }

  function close() {
    if (rawMode)
      stdin.off('data', onInput).pause()
    else
      rl!.close()
  }

  function bindShortCuts() {
    logger.log(
      colors.dim(colors.green('  ➜'))
      + colors.dim(' press ')
      + colors.bold(`h${rawMode ? '' : ' + enter'}`)
      + colors.dim(' to show help\n'),
    )

    if (rawMode) {
      stdin.setRawMode(true)
      stdin.on('data', onInput).setEncoding('utf8').resume()
    }
    else {
      rl = readline.createInterface({ input: stdin })
      rl.on('line', onInput)
    }
  }

  function setUrl(_url: string) {
    url = _url
  }

  bindShortCuts()

  return {
    setUrl,
    close,
  }
}
