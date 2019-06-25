module.exports = {
  env: {
    es6: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    // temporaly disabling cause editor plugin doesn't like
    'import/no-unused-modules': 'off',
    'react/jsx-curly-newline': 'off',
    'react/state-in-constructor': 'off',
    'react/prefer-read-only-props': 'off',
    'react/static-property-placement': 'off',

    // disable rules when enabled for typescript
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'react/jsx-filename-extension': 'off',
    'import/first': 'off',
    'import/prefer-default-export': 'off',
    'import/exports-last': 'off',
    'no-underscore-dangle': 'off',
  },
  overrides: [
    {
      files: ['**/*.test.js', '**/__tests__/**/*.js'],
      env: {
        jest: true
      }
    },
    {
      files: [
        'client/**/__tests__/**/*.js',
        'client/**/*.test.js',
        'client/src/setupTest.js'
      ],
      env: {
        browser: true
      },
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    },
    {
      files: [
        'client/**/*.js',
        'client/**/*.tsx',
        'client/**/*.ts',
        'client/**/*.jsx'
      ],
      env: {
        browser: true
      }
    },
    {
      files: ['client/src/actions/**/*.js'],
      rules: {
        'import/prefer-default-export': 'off'
      }
    },
    {
      files: ['client/src/action/**/*.js', 'client/src/reducers/**/*.js'],
      rules: {
        'import/group-exports': 'off'
      }
    }
  ]
};
