module.exports = {
  extends: ['@nekohack/eslint-config-vue'],
  plugins: ['@typescript-eslint'],
  root: true,
  env: { node: true, es6: true },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  rules: {
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
    'vuejs-accessibility/click-events-have-key-events': 'off',
    'vuejs-accessibility/form-control-has-label': 'off',
  },
}
