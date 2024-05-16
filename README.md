# ⌨️ Nuxt Module CLI Shortcuts

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
- [🏀 Online playground](https://stackblitz.com/github/yuyinws/nuxt-module-cli-shortcuts?file=playground%2Fapp.vue)

## Features

<!-- Highlight some of the features your module provide here -->

- 🚠 Rich built-in shortcuts.
- 🔧 Support Stdin raw mode.
- 🕹️ Support Custom shortcuts.

## Quick Setup

1. Add `nuxt-module-cli-shortcuts` dependency to your project

```bash
npx nuxi module add nuxt-module-cli-shortcuts
```

2. Add `nuxt-module-cli-shortcuts` to the `modules` section of `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    'nuxt-module-cli-shortcuts',
  ],
  shortcuts: {
    rawMode: true,
    customShortcuts: []
  }
})
```

## Configuration

### RawMode

Whether to enable stdin raw mode. It may cause [some problems](https://github.com/vitejs/vite/pull/14342).

When disable it , every shortcuts needs to be followed with an <kbd>Enter</kbd> press to execute it.

### CustomShortcuts

```ts
customShortcuts: [
  {
    key: 't',
    description: 'test custom shortcuts',
    action({ nuxt }) {
      console.log('Nuxt Instance', nuxt)
    }
  }
]
```

> You can refer [built-in shortcuts](https://github.com/yuyinws/nuxt-module-cli-shortcuts/blob/main/src/builtin.ts) to learn more.

## Contribution

<details>
  <summary>Local development</summary>

  ```bash
  # Install dependencies
  npm install

  # Generate type stubs
  npm run dev:prepare

  # Develop with the playground
  npm run dev

  # Build the playground
  npm run dev:build

  # Run ESLint
  npm run lint

  # Run Vitest
  npm run test
  npm run test:watch

  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/nuxt-module-cli-shortcuts/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-module-cli-shortcuts

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-module-cli-shortcuts.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-module-cli-shortcuts

[license-src]: https://img.shields.io/npm/l/nuxt-module-cli-shortcuts.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-module-cli-shortcuts

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
