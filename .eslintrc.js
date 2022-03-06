module.exports = {
  extends: ['@nekohack/eslint-config-vue', 'plugin:tailwindcss/recommended'],
  plugins: ['@typescript-eslint', 'tailwindcss'],
  root: true,
  env: { node: true, es6: true },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'tailwindcss/no-custom-classname': [
      'off',
      {
        tags: [
          'item-class-accordion',
          'item-class',
          'item-class-name',
          'item-count',
          'item-name',
          'item-list',
          'item-list-item',
          'add-tag-btn',
          'add-tag',
        ],
      },
    ],
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/no-deprecated-slot-scope-attribute': 'off',
    'vue/no-v-for-template-key-on-child': 'off',
    'vue/require-explicit-emits': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        ignores: ['index', 'default', 'error'],
      },
    ],
    'vue/v-on-event-hyphenation': 'off',
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
    'vuejs-accessibility/label-has-for': 'off',
  },
}
