module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'preact'
    ],
    rules: {

    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  };