{
  "parser": "babel-eslint",
  "extends": "eslint-config-airbnb",
  "env": {
    "browser": true,
    "node": true,
    "es6": true
  },
  "globals": {
    "If": true,
    "For": true,
    "connect": true
  },
  "rules": {
  " react/jsx-no-bind": 0,
    "react/jsx-indent-props": 0,
    "react/jsx-closing-bracket-location": 0,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    "react/react-in-jsx-scope": 2,
    "react/jsx-no-duplicate-props": 2,
    "react/sort-comp": 0,
    "react/prefer-stateless-function": 0,
    "react/jsx-indent": [2, "tab"],
    "react/prop-types": 0,
    "react/jsx-first-prop-new-line": 0,
    "react/jsx-space-before-closing": 0,
    "block-scoped-var": 0,
    "padded-blocks": 0,
    "func-names": 0,
    "no-console": 0,
    "indent": [2, "tab", {"SwitchCase": 1}],
    "comma-dangle": [2, "never"],
    "max-len": [1, {"code": 200}],
    "camelcase": 0,
    "new-cap": 0,
    "id-length": 0,
    "no-undef": 0,
    "no-param-reassign": 0,
    "object-curly-spacing": 0,
    "prefer-template": 0,
    "arrow-body-style": 0,
    "spaced-comment": 0,
    "no-underscore-dangle": 0,
    "no-mixed-spaces-and-tabs": 0,
    "newline-per-chained-call": 0,
    "no-case-declarations": 0,
    "consistent-return": 0,
    "block-spacing": 0,

    "import/no-unresolved": 0
  },
  "plugins": [
    "react"
  ]
}
