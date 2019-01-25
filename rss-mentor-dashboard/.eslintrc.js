module.exports = {
  extends: 'airbnb',
  env: {
    browser: true,
    jest: true,
  },
  plugins: ['react', 'jsx-a11y', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  parser: 'babel-eslint',
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
};
