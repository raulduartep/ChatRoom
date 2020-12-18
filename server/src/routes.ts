import { Router } from 'express';

import AuthController from '@controllers/AuthController';
import ChatController from '@controllers/ChatController';

const routes = Router();

routes.post('/login', AuthController.login);

routes.get('/messages', ChatController.index);

export default routes;
