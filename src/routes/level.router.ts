import { Router } from "express";
import * as LevelController from '../controllers/level.controller';

export const LevelRouter: Router = Router();

LevelRouter
  .route('/')
  .post(LevelController.addLevel);

LevelRouter
  .route('/:levelNo')
  .get(LevelController.getLevel)
  .put(LevelController.updateLevel);
