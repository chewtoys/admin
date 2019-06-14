import { Configuration } from 'webpack';
import { Context } from '@nuxt/vue-app';

export default {
  head: {
    title: 'admin',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://s3-ap-northeast-1.amazonaws.com/jiyuujinlab/bakeneko.png' }
    ]
  },

  loading: {
    color: '#fff'
  },

  build: {
    extend (config: Configuration, { isClient }: Context) {
      if (isClient) {
        config.devtool = '#source-map'
      }
    },
    typescript: {
      typeCheck: true // or ForkTsChecker options
    }
  },

  modules: [
    '@nuxtjs/pwa',
    '@nuxtjs/apollo',
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  plugins: [
    '~plugins/axios.ts',
    '~plugins/firebase.ts',
  ],

  apollo: {
    clientConfigs: {
      default: '~/apollo/client-configs/default.ts'
    }
  },

  css: [
    '~/assets/main.scss',
  ],

  env: {
    API_KEY: process.env.API_KEY,
    AUTH_DOMAIN: process.env.AUTH_DOMAIN,
    PROJECT_ID: process.env.PROJECT_ID,
    GRAPH_API: process.env.GRAPH_API,
    APOLLO_KEY: process.env.APOLLO_KEY,
  },
}
