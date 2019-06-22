module.exports = {
  extends: 'jnmorse',
  parser: 'babel-eslint',
  rules: {
    // temporaly disabling cause editor plugin doesn't like
    'import/no-unused-modules': 'off',
    'react/state-in-constructor': 'off',
    'react/prefer-read-only-props': 'off',
    'react/static-property-placement': 'off'
  },
  overrides: [{
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
        browser: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    },
    {
      files: ['client/**/*.js'],
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
}