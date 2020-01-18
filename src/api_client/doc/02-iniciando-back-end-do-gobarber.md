# Iniciando back end do gobarber

## 00 Configurando estrutura

  Objetivo: estruturar pastas e arquivos basicos da aplicacao.

  * (terminal) inicializa projeto: `yarn init -y` ;
  * (terminal) instala express: `yarn add express` ;
  * cria estrutura:

    src/
      app.js
      server.js
      routes.js

  * define arquivo **app.js**;
  * define arquivo **server.js**;
    * estrutura da aplicacao (app.js) separado do servidor e das rotas para facilitar trabalho com testes unitarios e de integracao que trabalha diretamente com a classe App;
  * define arquivo **routes.js** ;
  * (terminal) testa projeto: `node src/server.js` ;

## 01 Nodemon & Sucrase

  Objetivo: utilizar sintaxe de 'import' e 'export'com *sucrase*, automatizar acionamento do servidor com *nodemon* e adapta debugger para rodar com sucrase;

  * (terminal) instala sucrase e nodemon como dependencia de desenvolvimento: `yarn add sucrase nodemon -D`;
  * altera sintaxe de import e export nos arquivos:

    Imports:
    * de: const foo = require('Foo');
    * para: import foo from 'Foo';

    Exports:
    * de: module.exports = new Foo();
    * para: export default new Foo();

  * cria script personalizado 'dev' em **package.json** para rodar nodemon:

  ```
      "scripts": {
      "dev": "nodemon src/server.js"
    },
  ```

  * cria arquivo **nodemon.json** para que nodemon utilize sucrase-node ao inves de node:

  ```
  {
    "execMap: {
      "js": "node -r sucrase/register"
    }
  }
  ```
    ... para todo arquivo '.js' rode node mas antes, registre (-r) sucrase/register;

  * adiciona script em **package.json** para que debugger rode com *sucrase*:

    ```
    "scripts": {
      "dev": "nodemon src/server.js",
      "dev:debug":"nodemon --inspect src/server.js"
    },

    ```

  * cria nova configuracao na aba do bug do VSCode:

    aba bug > add configuration... > node.js e altera **launch.json**:

    de: "request": "launch"
    para: "request": "attach"

    deleta: "program": "${workspaceFolder}/index.js"
    cria: "protocol": "inspector"

    cria: "restart": true,

    cria: "skipFiles": [
            "<node_internals>/**",
            "${workspaceRoot}/node_modules/**/*.js"
          ],

  * testa debugger com: `yarn dev:debug`
  * ATENCAO: mantenha pasta *.vscode* para manter configuracoes do debugger com *sucrase*

## 02 Conceitos do Docker

  * Como funciona?

    * Funciona como um ambiente isolado na maquina (container);

    * Containers expoem portas para comunicacao. Ex.:

      App
        > :5432 (PostgreSQL)
        > :2707 (MongoDB)

  * Principais conceitos

    * Imagem: servico disponivel do docker. Tecnologias e ferramentas que podemos colocar em containers;

    * Container: instancia de uma imagem. Ex.: se imagem for PostGreSQL, podemos ter tres containers rodando esta imagem;

    * Docker Registry (Docker Hub): analogo ao npm do node, que contem os registros das dependencias em nuvem. O registro do docker é o docker register. Podemos até cadastrar nossas próprias imagens lá.

    * Dockerfile:

      * Receita de uma imagem: define como nossa aplicacao pode rodar em um ambiente a partir do zero. Ex.:


        ```
        # Partimos de uma imagem existente
        FROM node:10

        # Definimos a pasta e copiamos os arquivos
        WORKDIR /usr/app
        COPY . ./

        # Instalamos as depencias
        RUN yarn

        # Qual porta queremos expor?
        EXPOSE 3333

        # Executamos nossa aplicacao
        CMD yarn start

        ```

## 03 Configurando o Docker

  * Instala Docker CE

    * Navega para: https://docs.docker.com/install/
    * Seleciona sistema operacional e segue etapas. Em caso de windows: https://docs.docker.com/docker-for-windows/install/
    * Confere requisitos do sistema;
    * Faz download do Docker Desktop for Windows e faz instalacao;
    * (terminal) confere se foi instalado: `docker -v` ;
    * (terminal) lista todos os comandos: `docker help` ;

  * Cria servico de banco de dados PostGreSQL

    * Busca por 'docker postgres' no google;
    * Acessa: https://hub.docker.com/_/postgres;
    * Cria servico passando:
      * Nome do container: --name database
      * Password do container: -e POSTGRES_PASSWORD=docker
      * Redirecionamento de porta da porta da maquina para a porta do container: -p 5432:5432
      * (terminal) Comando: `docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432`

      Obs: username padrao (postgres) nao precisa ser passado como parametro;

  * (terminal) Verifica se container esta rodando: `docker ps` ;

  * Instala PostBird (interface visual GUI para visualizar dados no banco de dados): https://electronjs.org/apps/postbird

  * Faz conexao com banco de dados utilizando PostHBird:

    * Host: localhost
    * Port: 5432
    * Username: postgres (default username)
    * Password: docker

    * Clica em 'Test Connection'
    * Clica em 'Save & Connect'

  * Cria nova database clicando em 'select database' > 'create database'

  * Renomeia database;

  * (terminal) Interrompe conexao com container: `docker stop database` ;

  * (terminal) Visualiza todos os containers que tem na maquina: `docker ps -a` ;

  * (terminal) Inicia conexao com container: `docker start database` ;

  * (terminal) Confere se container esta rodando: `docker ps` ;

  * (terminal) Visualiza log de erros do container: `docker logs database`

## 04 Sequelize & MVC

  * O que é Sequelize?

    * ORM para node.js para bancos de dados relacionais (sql);
    * Mesma sintaxe funciona para mySQL, PostGreSQL, SQLite;
    * Serve como tradutor de JS para query language;

  * O que é um ORM?

    * ORM: Object-relational mapping;
    * Uma forma de abstracao de banco de dados;
      * Muda forma com que nossa aplicacao se comunica com o banco de dados;

    * Considerando arquitetura MVC:
      * Tabelas viram models. Ex.:

      table users -> User.js
      table companies -> Company.js
      table projects -> Project.js

  * Manipulacao de dados

    * Nao usa INSERT nem UPDATE nem DELETE para manipulacao de dados, mas sim codigo JS.
    * Sequelize traduz JS para SQL no dialeto especificado no arquivo de configuracao. Ex:

    De:
    ```javascript
    User.create({
      name: 'Joao da Silva',
      email: 'joao@email.com.br',
    })
    ```

    Para:
    ```sql
    INSERT INTO users(name,email)
      VALUES (
        "Joao Silva",
        "joao@email.com.br"
      )
    ```

    Outro exemplo:

    De:
    ```javascript
    User.findOne({
      where: {
        email: 'joao@email.com.br'
      }
    })
    ```

    Para:
    ```sql
    SELECT *
    FROM users
    WHERE email = 'joao@email.com.br'
    LIMIT 1
    ```


  * Migrations

    * Controle de versao para base de dados;
    * Cada arquivo de migration contem instrucoes para criacao, alteracao ou remocao de tabelas ou colunas;
    * Mantem a base atualizada entre todos desenvolvedores do time e tambem no ambiente de producao;
    * Cada arquivo é uma migration e sua ordenação ocorre por data;

    Exemplo:

    ```javascript
    module.exports = {
      up:(queryInterface,Sequelize)=>{

        // Instrucao para criar nova tabela
        return queryInterface.createTable('users',{

          // Criacao de 3 campos com suas propriedades.
          // O ID é a chave primária e auto incremental.
          id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
          name:{
            allowNull: false,
            type: Sequelize.STRING
          },
          email:{
            allowNull:false,
            unique: true,
            type: Sequelize.STRING
          }
        })
      },

      down: (queryInterface,Sequelize)=>{

        // Instrução para deletar a tabela caso haja um rollback
        return queryInterface.dropTable('users')
      }
    }
    ```

    * É possível desfazer uma migração se errarmos algo enquanto estivermos desenvolvendo a feature;

    * Depois que a migration foi enviada para outros desenvolvedores ou para ambiente de produção ela JAMAIS poderá ser alterada. Uma nova migration deverá ser criada se for necessário mudar ou criar campo, tabela ou coluna.

    * Cada migration deve realizar alterações em APENAS UMA tabela. Você pode criar várias migrations para alterações maiores;

  * Seeds

    * Popula base de dados para desenvolvimento;
    * Muito utilizado para popular dados para testes;
    * Executável apenas por código;
    * Jamais será utilizado em produção;
    * Caso sejam dados que precisam ir para produção, a própria migration pode manipular dados das tabela;

  * Arquitetura MVC

    * Forma de estruturar pastas e arquivos na aplicação para separar as responsabilidades de cada tipo de arquivo;

    * **Model**: armazena a abstração do banco, utilizado para manipular os dados contidos nas tabelas do banco. Não possuem responsabilidade sobre a regra de negócio da nossa aplicação;

    * **View**: A view é o retorno ao cliente. Em aplicações que não utilizam o modelo de API REST isso pode ser um HTML, mas no nosso caso a view é apenas nosso JSON que será retornado ao front-end e depois manipulado pelo ReactJS ou React Native.

    * **Controller**: O controller é o ponto de entrada das requisições da nossa aplicação. Uma rota geralmente está associada diretamente com um método do controller. Podemos incluir a grande parte das *regras de negócio* da aplicação nos controllers (conforme a aplicação cresce podemos isolar as regras).

  * A face de um controller

    * São classes;
    * Sempre retorna um JSON;
    * Deve funcionar sozinho. Cada método controller não pode chamar outro método de outro controller nem dele mesmo.
    * Quando criar um novo controller:
      * Quando tivermos uma nova entidade na aplicação;
      * Deve conter apenas 5 métodos;

      Exemplo:

      ```javascript
      class UserController{
        index(){}   // Listagem de usuarios
        show(){}    // Exibir um unico usuario
        store(){}   //  Cadastrar usuario
        update(){}  // Alterar usuario
        delete(){}  // Remover usuario
      }
      ```

## 05 ESLint, Prettier & EditorConfig

  Objetivo: configurar ferramentas que irão ajudar a padronizar o código (manter padrão de escrita de código entre todos os desenvolvedores);

  * Usar padrão Airbnb;
  * (terminal) instalar eslint copmo dependencia de desenvolvimento: `yarn add eslint -D` ;
  * (terminal) inicializar eslint: `yarn eslint --init` ;
  * Configura eslint:

    * How would you like to use ESLint?
      * To check syntax, find problems, and enforce code style;

    * What type of modules does your project use?
      * JavaScript modules (import/export);

    * Which framework does your project use?
      * None;

    * Does your project use TypeScript?
      * No;

    * Where does your code run?
      * Node;

    * How would you like to define a style for your project?
      * Use a popular style guide;

    * Which style guide do you want to follow?
      * Airbnb;

    * What format do you want your config file to be in?
      * JavaScript;

    * Would you like to install them now with npm?
      * Y;

    Obs.: eslint faz instalacao das dependencias utilizando 'npm' ao inves de 'yarn'. Entao ele cria um arquivo **package-lock.json**;

  * Deleta arquivo **package-lock.json**;
  * (terminal) Mapeia novas dependencias no **yarn.lock**: `yarn` ;
  * (extensao VS Code) Instala extensão **ESLint** no VSCode;
  * Abre configurações do VSCode em formato de JSON: Ctrl + Shift + p > open settings (JSON);
  * Insere atributo para forçar autofix:

    ```javascript
    // Aplica autofix do ESLint
    "editor.codeActionsOnSave": {"source.fixAll.eslint": true},
    "eslint.validate": ["javascript", "javascriptreact","typescriptreact"],
    ```

  * Altera end of line sequence para: LF
  * Sobrescreve regras do eslint no arquivo **.eslintrc.js**:

    ```javascript
    rules: {

          // torna desecessario usar 'this' nos metodos da classe
      "class-method-use-this": "off",

      // permite receber parametro e fazer alteracoes nesse parametro (usado pelo sequelize)
      "no-param-reassign":"off",

      // desabilita obrigatoriedade do camelcase notation (necessario para as conexoes do database)
      "camelcase":"off",

      // gera erro para variaveis nao utilizadas com excessao da variavel next dos middlewares
      "no-unused-vars":["error",{"argsIgnorePattern":"next"}],
    },

    ```

    * (terminal) Instala dependencias do prettier: `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D` ;
    * Altera propriedade 'extends' do arquivo **.eslintrc.js**:

      ```javascript
      extends: [
        'airbnb-base',
        'prettier'
      ],
      ```

    * Cria propriedade 'plugins':

    ```javascript
    plugins: ['prettier'],
    ```

    * Cria arquivo **.prettierrc** e sobrescreve algumas regras para manter padrao Airbnb:

    ```javascript
    {
      "singleQuote": true,
      "trailingComma": "es5"
    }
    ```

    * (terminal) Fixa arquivos em src automaticamente: `yarn eslint --fix src --ext .js` ;
    * (extensao VS Code) Instala **Editor Config for VS Code** no VS Code;
    * Vai na raiz do repositorio > botao direito > **generate .editorconfig**;
    * Troca ultimas duas variaveis de 'false' para 'true':

    ```
      trim_trailing_whitespace = true
      insert_final_newline = true
    ```

## 06 Configurando Sequelize

  Objetivo: configurar sequelize e o inicio da estrutura de pastas da aplicação

  * Cria estrutura de pastas e arquivos:

    * src/

      * app/
        * controllers/
          * .gitkeep
        * models/
          * .gitkeep

      * config/
        * **database.js**

      * database/
        * migrations/
          * .gitkeep

  * (terminal) Instala dependencia 'sequelize': `yarn add sequelize`
  * (terminal) Instala 'sequelize-cli' como dependencia de desenvolvimento: `yarn add sequelize-cli -D`
    * sequelize-cli: interface de linha de comando para facilitar criacao de migrations, models, etc;
  * Cria arquivo **.sequelizerc**:
    * (arquivo que vai exportar caminho onde estao arquivos e pastas criados com sequelize);
    * Ex.: exporta caminhos até as pastas de config de database, pasta de migrations, pasta de models, etc;
    * Usa sintaxe do common JS e **nao utiliza sintaxe import/export**;
  * Transforma arquivo para sintaxe de JavaScript (canto inferior direito no VS Code);
  * Cria conteudo do arquivo **.sequelizerc**:

    ```javascript
    // IMPORTS
    // padroniza caminhos no windows, linux e mac
    const {resolve} = require('path');

    // EXPORTS
    // exporta objeto
    module.exports = {

      // caminho para arquivo de configuracao do database
      config: resolve(__dirname, 'src', 'config', 'database.js'),

      // caminho para pasta de models
      'models-path': resolve(__dirname,'src', 'app', 'models'),

      // caminho para pasta de migrations
      'migrations-path': resolve(__dirname,'src','database','migrations'),

      // caminho para pasta de seeds
      'seeds-path': resolve(__dirname,'src','database','seeds')

    };

    ```

    * (terminal) Adiciona dependencias 'pg' e 'pg-hstore': `yarn add pg pg-hstore` ;
      * dependencias sao necessarias para usar 'sequelize' e 'sequelize-cli' com o dialeto 'postgres' ;
      * para utilizacao com outros dialetos, [checar documentação](https://sequelize.org/master/manual/dialect-specific-things.html);

    * Cria conteudo do arquivo de configuracao do banco de dados **src/config/database.js**:
      * Arquivo tambem utiliza sintaxe do common JS;
      * Sera acessado tanto pela aplicacao quanto pelo sequelize-cli;

      ```javascript
      // EXPORTS
      // exporta objeto
      module.exports = {

        // define dados para conexao com banco de dados
        dialect: 'postgres', // informa qual sera o dialeto utilizado
        host: 'localhost', // informa o host onde se encontra a base de dados
        username: 'postgres', // informa username para acesso
        password: 'docker', // password para acesso
        database: 'gostack-gobarber', // nome do banco de dados criado

        // define funcinalidades extra
        define: {
          timestamps: true, // garante coluna 'created_at' e 'updated_at' em cada tabela do banco de dados
          underscored: true, // padroniza nomenclatura de tabelas
          underscoredAll: true, // padroniza nomenclatura de colunas com o padrao underscore '_'
        }
      }

      ```









