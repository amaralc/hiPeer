// IMPORTS  --------------------------------------------------------------------
import { Router } from 'express';

// CONTENT ---------------------------------------------------------------------
const routes = new Router();

// define rota raiz
routes.get('/', (req, res) => {
  res.json({ message: 'Hello World!' });
});

// EXPORTS  ---------------------------------------------------------------------
export default routes;
