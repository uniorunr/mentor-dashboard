module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": true,
    "jest": true,
  },
  "rules": {
    "react/prefer-stateless-function": "off",
    "react/prop-types": ["error", { "ignore": ["name", "greet"] }],
    "react/jsx-one-expression-per-line": "off",
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  }
};
