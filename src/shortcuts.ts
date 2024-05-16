import readline from 'node:readline'
import process, { stdin } from 'node:process'
import colors from 'picocolors'
import { tryUseNuxt } from '@nuxt/kit'
import { logger } from './logger'
import type { ModuleOptions, NuxtDevServerUrl } from './types'
import { builtinShortcuts } from './builtin'

export function createShortCuts(options: ModuleOptions) {
  const { rawMode, customShortCuts } = options
  const mergedShortCuts = [...builtinShortcuts, ...customShortCuts || []]

  const nuxt = tryUseNuxt()

  let devServerUrls: NuxtDevServerUrl[] = []

  function setUrl(urls: NuxtDevServerUrl[]) {
    devServerUrls = urls
  }

  let rl: readline.Interface | null = null
  let actionRunning = false
  async function onInput(input: string) {
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
      for (const shortcut of mergedShortCuts) {
        logger.info(
          colors.dim('  press ')
          + colors.bold(`${shortcut.key}${rawMode ? '' : ' + enter'}`)
          + colors.dim(` to ${shortcut.description}`),
        )
      }

      return
    }

    const shortcut = mergedShortCuts.find(shortcut => shortcut.key === input)
    if (!shortcut || shortcut.action == null)
      return

    actionRunning = true
    await shortcut.action({
      nuxt,
      urls: devServerUrls,
    })
    actionRunning = false
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

  bindShortCuts()

  nuxt?.hook('close', () => {
    if (rawMode)
      stdin.off('data', onInput).pause()
    else
      rl?.close()
  })

  return {
    setUrl,
  }
}
