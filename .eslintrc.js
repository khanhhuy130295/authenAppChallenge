module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 11,
    ecmaFeatures: {
      tsx: true,
      modules: true
    }
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'react',
    'react-hooks'
  ],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'plugin:react/recommended'
  ],
  root: true,
  env: {
    node: true,
    jest: true,
    commonjs: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'react-hooks/exhaustive-deps': 'warn',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    "no-var": [
      2
    ],
    "quotes": [
      2,
      "single"
    ],
    "no-unneeded-ternary": [
      1
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "arrow-spacing": [
      1,
      {
        "before": true,
        "after": true
      }
    ],
    "prefer-const": [
      1
    ],
    "comma-dangle": [
      1
    ],
    "semi": [
      2,
      "never"
    ],
    "no-dupe-keys": [
      2
    ],
    "eqeqeq": [
      2,
      "always"
    ],
    "no-console": [
      1
    ],
    "block-spacing": [
      2
    ],
    "comma-spacing": [
      2,
      {
        "before": false,
        "after": true
      }
    ],
    "@typescript-eslint/no-inferrable-types": [
      0
    ],
    "@typescript-eslint/camelcase": [
      0,
      {
        "properties": "never"
      }
    ],
    "@typescript-eslint/explicit-function-return-type": [
      0
    ],
    "@typescript-eslint/member-delimiter-style": [
      0
    ],
    "@typescript-eslint/no-var-requires": [
      0
    ]
  },
};
