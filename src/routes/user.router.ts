import { Router } from "express";
import * as UserController from '../controllers/user.controller';
import * as AuthMiddleware from '../middlewares/auth.middleware';

export const UserRouter: Router = require('express').Router();

UserRouter
  .route('/')
  .get(UserController.getAllUsers)
  .post(UserController.addUser);

// Authentication middleware.
// Routes below use the authentication middleware.
UserRouter.use(AuthMiddleware.authenticate);

UserRouter
  .route('/count')
  .get(UserController.getUserCount);

UserRouter
  .route('/:userId')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

UserRouter
  .route('/:userId/points')
  .get(UserController.getUserPoints);

UserRouter
  .route('/:userId/settings')
  .put(UserController.updateUserSettings);