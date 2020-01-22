/* --------------------------------- IMPORTS ---------------------------------*/
import { Router } from 'express';
import User from './app/models/User';

/* --------------------------------- CONTENT ---------------------------------*/
const routes = new Router();

/* Define rota raiz */
routes.get('/', async (req, res) => {
  /*
   ** Cria usuario teste na rota raiz para avaliar se loader de models esta
   ** funcionando. Utiliza await async para aguardar retorno da base de dados.
   */
  const user = await User.create({
    name: 'name two',
    email: 'email2@gmail.com',
    password_hash: 'mypasswordhash',
  });

  /* Retorna dados do usuario criado */
  return res.json(user);
});

/* --------------------------------- EXPORTS ---------------------------------*/
export default routes;
