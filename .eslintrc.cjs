module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended', // Используем рекомендованные правила Vue 3
    'plugin:prettier/recommended', // Включает Prettier
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue', // Плагин Vue
  ],
  rules: {
    'prettier/prettier': 'warn', // Ошибки Prettier будут 'предупреждениями'
    'vue/multi-word-component-names': 'off',
  },
}
