module.exports = {
  extends: 'jnmorse',
  rules: {
    'import/no-unused-modules': 'off'
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