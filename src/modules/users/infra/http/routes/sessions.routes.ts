/* eslint-disable camelcase */
import { Router } from 'express';

import SessionsController from '../controllers/SessionsController';

import validateCreateSession from '../validators/CreateSession';

const sessionsRouter = Router();
const sessionsController = new SessionsController();

sessionsRouter.post('/', validateCreateSession, sessionsController.create);

export default sessionsRouter;
