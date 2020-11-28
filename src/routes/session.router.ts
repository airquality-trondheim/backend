import express, { Router } from 'express';
import { Session } from '../models/session.model';
import * as SessionController from '../controllers/session.controller';
import * as Validators from '../middlewares/validation.middleware';

export const SessionRouter: Router = express.Router();


SessionRouter.route('/').get(async (req: any, res: any) => { res.json(await Session.find({})); })

SessionRouter
  .route('/users/:userId')
  .get(SessionController.getAllUserSessions)
  .post(Validators.session, SessionController.registerUserSession);