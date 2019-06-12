module.exports = {
  extends: 'jnmorse',
  rules: {
    // temporarly disabling some rules tht vscode is complaining about
    'import/no-unused-modules': 'off',
    'react/state-in-constructor': 'off',
    'react/prefer-read-only-props': 'off',
    'react/static-property-placement': 'off'
  },
  overrides: [
    {
      files: [
        '**/__tests__/**/*.js',
        '*.test.js'
      ],
      env: {
        jest: true
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
    },
    {
      files: ['client/src/reducers/**/*.js'],
      rules: {
        'import/no-relative-parent-imports': 'off'
      }
    }
  ]
}