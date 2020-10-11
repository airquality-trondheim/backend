import { Router } from "express";
import * as AchievementController from '../controllers/achievement.controller';

export const AchievementRouter: Router = require('express').Router();

AchievementRouter
  .route('/')
  .get(AchievementController.getAllAchievements)
  .post(AchievementController.addAchievment);

AchievementRouter
  .route('/:achievementId')
  .delete(AchievementController.deleteAchievement)
  .get(AchievementController.getAchievement)
  .put(AchievementController.updateAchievement);
