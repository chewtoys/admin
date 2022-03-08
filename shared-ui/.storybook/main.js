const path = require('path')

module.exports = {
  stories: ['../src/components/**/**/*.stories.@(ts|js|mdx)'],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: { actions: false },
    },
    '@storybook/addon-links',
    '@storybook/addon-storysource',
  ],
  core: {
    builder: 'webpack5',
  },
  webpackFinal: (config) => {
    config.resolve.alias['@'] = path.resolve(__dirname, '../src')
    return config
  },
}
