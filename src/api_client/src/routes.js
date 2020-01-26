/* --------------------------------- IMPORTS ---------------------------------*/
import { Router } from 'express';
import UserController from './app/controllers/UserController';

/* --------------------------------- CONTENT ---------------------------------*/
const routes = new Router();

/** Define rota post para criar novo usuario */
routes.post('/users', UserController.store);

/* --------------------------------- EXPORTS ---------------------------------*/
export default routes;
