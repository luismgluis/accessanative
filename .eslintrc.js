module.exports = {
  root: true,
  extends: ["@react-native-community", "airbnb-typescript", "prettier", "prettier/@typescript-eslint", "prettier/react"],
  rules: {
    "linebreak-style": 0,
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "quote-props": ["error", "as-needed"],
    "object-curly-newline": ["error", { multiline: true }],
    "object-property-newline": [
      "error",
      { allowAllPropertiesOnSameLine: false },
    ],
    "consistent-this": ["error", "that"],
    "@typescript-eslint/no-this-alias": [
      "error",
      {
        allowDestructuring: true, // Allow `const { props, state } = this`; false by default
        allowedNames: ["that"], // Allow `const self = this`; `[]` by default
      },
    ],
  },
};
