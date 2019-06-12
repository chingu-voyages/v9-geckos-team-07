module.exports = {
  extends: 'jnmorse',
  rules: {
    // temporarly disabling some rules tht vscode is complaining about
    'import/no-unused-modules': 'off',
    'react/state-in-constructor': 'off',
    'react/prefer-read-only-props': 'off',
    'import/no-relative-parent-imports': 'off',
    'react/static-property-placement': 'off'
  },
  overrides: [
    {
      files: [
        'client/**/__tests__/**/*.js',
        'client/**/*.test.js',
        'client/src/setupTest.js'
      ],
      env: {
        browser: true,
        jest: true
      },
      rules: {
        'import/no-extraneous-dependencies': 'off'
      }
    },
    {
      files: ['server/**/*.js'],
      rules: {
        'no-console': 'off'
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