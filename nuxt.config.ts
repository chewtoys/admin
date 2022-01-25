import { Configuration } from 'webpack'
import { Context } from '@nuxt/types'

require('dotenv').config()

const sass = require('sass')
const fiber = require('fibers')

import { useESBuildMinify, useESBuildLoader } from './client/modules/useESBuild'

const GITHUB_API_V4: string = 'https://api.github.com/graphql'

export default {
  srcDir: 'client/',

  mode: 'universal',

  router: {
    base: process.env.NODE_ENV === 'production' ? '/admin/' : '/',
  },

  head: {
    title: 'admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'https://s3-ap-northeast-1.amazonaws.com/jiyuujinlab/bakeneko.png',
      },
    ],
  },

  loading: { color: '#fff' },

  css: [
    {
      src: '~/assets/main.scss',
      lang: 'css',
    },
  ],

  build: {
    extend(config: Configuration, { isClient }: Context) {
      useESBuildMinify(config)
      useESBuildLoader(config, {
        loader: 'jsx',
        target: 'es2017',
      })
      useESBuildLoader(config, {
        loader: 'tsx',
        target: 'es2017',
      })
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    presets({ isServer }: Context) {
      return [
        [
          require.resolve('@nuxt/babel-preset-app'),
          {
            buildTarget: isServer ? 'server' : 'client',
            corejs: {
              version: 3,
            },
          },
        ],
      ]
    },
    loaders: {
      scss: {
        implementation: sass,
        sassOptions: {
          fiber: fiber,
        },
      },
    },
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer')({
          cascade: false,
          grid: true,
        }),
        require('cssnano')({
          preset: 'default',
          discardComments: { removeAll: true },
          zindex: false,
        }),
      ],
    },
  },

  buildModules: [
    [
      '@nuxt/typescript-build',
      {
        typeCheck: true,
        ignoreNotFoundWarnings: true,
      },
    ],
    '@nuxtjs/composition-api/module',
  ],

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv',
    '@nuxtjs/apollo',
    '@nuxtjs/device',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ja',
            iso: 'ja_JP',
            file: 'ja.json',
          },
          {
            code: 'en',
            iso: 'en-US',
            file: 'en.json',
          },
        ],
        defaultLocale: 'ja',
        vueI18n: {
          fallbackLocale: 'ja',
        },
        langDir: 'i18n/',
        lazy: true,
        vueI18nLoader: true,
      },
    ],
  ],

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: GITHUB_API_V4,
      },
    },
  },

  plugins: [
    '~/plugins/axios.ts',
    '~/plugins/firebase.ts',
    '~/plugins/j-stylebook.ts',
    '~/plugins/picker.ts',
    '~/plugins/vue-chart.ts',
    { src: '~/plugins/mock', mode: 'client' },
    // {
    //   src: '~/plugins/vue-cookie.ts',
    //   mode: 'client'
    // },
    // '~/plugins/vue-toasted.ts'
  ],

  env: {
    NUXT_APP_API_KEY: process.env.NUXT_APP_API_KEY,
    NUXT_APP_AUTH_DOMAIN: process.env.NUXT_APP_AUTH_DOMAIN,
    NUXT_APP_PROJECT_ID: process.env.NUXT_APP_PROJECT_ID,
    NUXT_APP_GITHUB_TOKEN: process.env.NUXT_APP_GITHUB_TOKEN,
    NUXT_APP_MEETUP_API: process.env.NUXT_APP_MEETUP_API,
  },
}
