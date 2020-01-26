/* --------------------------------- IMPORTS ---------------------------------*/
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

/* --------------------------------- CONTENT ---------------------------------*/
const routes = new Router();

/** Define rota post para criar novo usuario */
routes.post('/users', UserController.store);
/** Define rota post para criar nova session */
routes.post('/sessions', SessionController.store);

/* --------------------------------- EXPORTS ---------------------------------*/
export default routes;
