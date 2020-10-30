import { Request, Response, NextFunction } from 'express';
import { IAchievement } from '../models/achievement.model';
import * as AchievementService from '../services/achievement.service';

export async function getAllAchievements(req: Request, res: Response, next: NextFunction) {
  try {
    const achievements = await AchievementService.getAllAchievements();
    return res.status(200).json({ achievements: achievements })
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function addAchievment(req: Request, res: Response, next: NextFunction) { 
  // validator
  const achievment = req.body as IAchievement;

  try {
    const newAchievement = await AchievementService.addAchievement(achievment);
    return res.status(201).json(newAchievement);
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function deleteAchievement(req: Request, res: Response, next: NextFunction) {
  // validator
  const achievementId = req.params.achievementId as string;

  try {
    await AchievementService.deleteAchievement(achievementId);
    return res.status(200).json(`Achievement with _id ${achievementId} successfully deleted.`);

  } catch (error) {
      return res.status(503).json(error);
    }
  }

export async function getAchievement(req: Request, res: Response, next: NextFunction) {
  // validator
  const achievementId = req.params.achievementId as string;

  try {
    const achievement = await AchievementService.getAchievementById(achievementId);
    return res.status(200).json({ achievement: achievement });
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function updateAchievement(req: Request, res: Response, next: NextFunction) {
  // validator
  const achievementId = req.params.achievementId as string;
  const achievement = req.body as IAchievement;

  try {
    const updatedAchievement = await AchievementService.updateAchievement(achievementId, achievement);
    return res.status(200).json(updatedAchievement);
    
  } catch (error) {
    return res.status(503).json(error);
  }
}