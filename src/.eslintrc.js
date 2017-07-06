module.exports = {
  env: {
    es6: true,
    browser: true,
    commonjs: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    'class-property'
  ],
  extends: [
    'eslint:recommended'
  ],
  globals: {
    PRODUCTION: false
  },
  rules: {
    'no-console': [0],
    indent: [1, 2],
    'linebreak-style': [2, 'unix'],
    quotes: [1, 'single'],
    'semi-spacing': [2],
    semi: [2, 'always'],
    'class-property/class-property-semicolon': [2],
    'brace-style': [2, '1tbs'],
    camelcase: [2],
    'array-bracket-spacing': [2],
    'object-curly-spacing': [2],
    'key-spacing': [2],
    'no-trailing-spaces': [2],
    'comma-spacing': [2],
    'computed-property-spacing': [2],
    'keyword-spacing': [2],
    'space-infix-ops': [2],
    'space-unary-ops': [2],
    'no-multi-spaces': [1],
    'space-before-blocks': [2],
    'arrow-spacing': [2],
    'space-in-parens': [2, 'never'],
    'func-call-spacing': [2, 'never'],
    'space-before-function-paren': [2, 'never']
  }
};
