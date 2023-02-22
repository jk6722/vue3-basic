module.exports = {
  env: {
    browser: true,
    node: true
  },
  extends: [
    // 코드 검사를 할 규칙들을 명시
    // vue
    // 'plugin:vue/vue3-essential', // Lv1
    'plugin:vue/vue3-strongly-recommended', //Lv2
    // 'plugin:vue/vue3-recommended', // Lv3
    // js
    'eslint:recommended'
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  rules: {
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "never"
    }],

    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "never",
        // "normal"을 always로 하면 <div></div>처럼 닫히는 태그가 있을 때 사이에 content가 없으면 <div />이렇게 self-closing을 해주어야 한다.
        // 기본적으로 div 태그는 열고 닫히는 태그라고 생각되기 때문에 이는 어색할 수 있다.
        // 그래서 normal을 never로 사용하는 것이 편할 것이다.
        "component": "always"
      },
      "svg": "always",
      "math": "always"
    }],

    "vue/multi-word-component-names": ["error", {
      "ignores": "always"
    }]
  }
  
}