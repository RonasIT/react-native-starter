module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 6,
    project: 'tsconfig.json'
  },
  ignorePatterns: [
    'node_modules',
    'dist',
    'coverage',
    '.expo',
    '.expo-shared',
    'web-build'
  ],
  plugins: [
    '@typescript-eslint',
    'unused-imports',
    'react',
    'react-hooks'
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'prettier'
  ],
  rules: {
    'indent': ['warn', 2, { SwitchCase: 1 }],
    'quotes': ['error', 'single'],
    'arrow-parens': ['warn', 'always'],
    'comma-dangle': ['warn', 'never'],
    'no-var': 'error',
    'no-dupe-class-members': 'off',
    'import/prefer-default-export': 'off',
    'implicit-arrow-linebreak': ['warn', 'beside'],
    'newline-per-chained-call': ['warn', { ignoreChainWithDepth: 2 }],
    'function-call-argument-newline': ['warn', 'consistent'],
    'function-paren-newline': ['warn', 'consistent'],
    'array-element-newline': ['warn', 'consistent'],
    'array-bracket-newline': ['warn', { multiline: true }],
    'padding-line-between-statements': ['warn', { blankLine: 'always', prev: '*', next: 'return' }],
    '@typescript-eslint/no-use-before-define': ['warn', { variables: false }],
    '@typescript-eslint/lines-between-class-members': ['warn', { exceptAfterSingleLine: true }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/no-inferrable-types': ['warn', { ignoreParameters: true }],
    '@typescript-eslint/explicit-module-boundary-types': ['warn', { allowArgumentsExplicitlyTypedAsAny: true }],
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['warn', { accessibility: 'explicit', overrides: { constructors: 'no-public' } }],
    '@typescript-eslint/explicit-function-return-type': ['warn', { allowExpressions: true }],
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/array-type': ['warn', { default: 'generic', readonly: 'generic' }],
    'unused-imports/no-unused-imports-ts': 'warn',
    'unused-imports/no-unused-vars-ts': [
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'jsx-quotes': ['error', 'prefer-single'],
    'react/jsx-boolean-value': 'off',
    'react/self-closing-comp': ['warn', { component: true, html: true }],
    'react/jsx-max-props-per-line': [1, { maximum: { single: 2, multi: 1 } }],
    'react/jsx-first-prop-new-line': ['warn', 'multiline'],
    'react/prop-types': 'off'
  },
  overrides: [
    {
      'files': ['*actions.ts'],
      'rules': {
        'function-call-argument-newline': ['warn', 'always'],
        'function-paren-newline': ['warn', { minItems: 1 }]
      }
    },
    {
      'files': ['*selectors.ts'],
      'rules': {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off',
        'function-call-argument-newline': ['warn', 'always'],
        'function-paren-newline': ['warn', 'multiline-arguments']
      }
    }
  ]
};
