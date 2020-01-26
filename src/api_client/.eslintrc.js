module.exports = {
  env: {
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {

    // todos os problemas que prettier encontrar, retornam erro no ESLint
    "prettier/prettier":"error",

    // torna desecessario usar 'this' nos metodos da classe
    "class-methods-use-this": "off",

    // permite receber parametro e fazer alteracoes nesse parametro (usado pelo sequelize)
    "no-param-reassign":"off",

    // desabilita obrigatoriedade do camelcase notation (necessario para as conexoes do database)
    "camelcase":"off",

    // gera erro para variaveis nao utilizadas com excessao da variavel next dos middlewares
    "no-unused-vars":["error",{"argsIgnorePattern":"next"}],
  },
};
