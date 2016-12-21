module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module'
  },
  extends: [
    'eslint:recommended',
    'plugin:ember-suave/recommended'
  ],
  env: {
    'browser': true
  },
  rules: {
    'camelcase': 0,
    'ember-suave/require-access-in-comments': 0,
    'ember-suave/no-direct-property-access': 0
  }
};
