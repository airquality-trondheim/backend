import express, { Router } from 'express';
import * as SessionController from '../controllers/session.controller';

export const SessionRouter: Router = express.Router();

SessionRouter
  .route('/users/:userId')
  .get(SessionController.getAllUserSessions)
  .post(SessionController.registerUserSession);