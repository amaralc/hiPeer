// IMPORTS  --------------------------------------------------------------------
import { Router } from 'express';
import User from './app/models/User';

// CONTENT ---------------------------------------------------------------------
const routes = new Router();

// define rota raiz
routes.get('/', async (req, res) => {
  const user = await User.create({
    name: 'name two',
    email: 'email2@gmail.com',
    password_hash: 'mypasswordhash',
  });

  return res.json(user);
});

// EXPORTS  ---------------------------------------------------------------------
export default routes;
