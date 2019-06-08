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
    }
  ]
}