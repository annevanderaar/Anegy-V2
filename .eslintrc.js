module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-strongly-recommended',
    '@vue/standard',
    '@vue/typescript/recommended',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'no-unused-expressions': 'off',
    'arrow-parens': [1, 'as-needed'],
    'no-console': 'off',
    'no-debugger': 'off',
    semi: [1, 'always'],
    'max-len': [
      'error',
      {
        code: 150,
        tabWidth: 2,
      },
    ],
    'comma-dangle': ['error', 'always-multiline'],
    // Is recommended to keep this off in Typescript projects
    'no-undef': 'off',
    'vue/max-attributes-per-line': ['warn', {
      singleline: 2,
      multiline: 1,
    }],
    'vue/html-closing-bracket-spacing': ['warn', {
      startTag: 'never',
      endTag: 'never',
      selfClosingTag: 'never',
    }],
    'vue/component-name-in-template-casing': ['error', 'PascalCase', {
      registeredComponentsOnly: true,
      ignores: [],
    }],
    'vue/attributes-order': ['error', {
      order: [
        'DEFINITION',
        'LIST_RENDERING',
        'CONDITIONALS',
        'RENDER_MODIFIERS',
        'GLOBAL',
        ['UNIQUE', 'SLOT'],
        'TWO_WAY_BINDING',
        'OTHER_DIRECTIVES',
        'ATTR_DYNAMIC',
        'ATTR_STATIC',
        'ATTR_SHORTHAND_BOOL',
        'EVENTS',
        'CONTENT',
      ],
      alphabetical: false,
    }],
    'vue/no-reserved-component-names': [0],
  },
  overrides: [
    {
      files: ['*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
    {
      files: ['resources/js/vue/app.ts'],
      rules: {
        '@typescript-eslint/ban-ts-comment': 'off',
      },
    },
  ],
  ignorePatterns: [
    'shims-vue.d.ts',
    'models.d.ts',
  ],
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@enums', './resources/vue/enums'],
          ['@components', './resources/vue/components'],
          ['@models', './resources/vue/models'],
          ['@permissions', '/resources/vue/permissions'],
          ['@stores', './resources/vue/stores'],
          ['@services', './resources/vue/services'],
          ['@mixins', './resources/vue/mixins'],
          ['@support', './resources/vue/support'],
          ['@utilities', './resources/vue/utilities'],
        ],
        extensions: ['.js', '.ts', '.vue'],
      },
      node: {
        extensions: ['.js', '.ts', '.vue'],
      },
    },
  },
};
