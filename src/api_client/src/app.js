/* --------------------------------- IMPORTS ---------------------------------*/
import express from 'express';
import routes from './routes';
/*
 ** Importa arquivo que faz conexao com banco de dados. Nao é necessario passar
 ** o caminho completo com '.../index.js', pois ele ja assimila automaticamente
 ** esse nome.
 */
import './database';

/* --------------------------------- CONTENT ---------------------------------*/
class App {
  /* Chamado automaticamente quando classe for instanciada */
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  /* Cadastro dos middlewares da aplicacao */
  middlewares() {
    /* Prepara app para receber requisicoes em formato json */
    this.server.use(express.json());
  }

  routes() {
    /* Importa rotas de outro arquivo e usa no servidor */
    this.server.use(routes);
  }
}

/* --------------------------------- EXPORTS ---------------------------------*/
export default new App().server;
