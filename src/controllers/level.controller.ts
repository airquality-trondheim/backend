import { Request, Response, NextFunction } from 'express';
import { ILevel } from '../models/level.model';
import * as LevelService from '../services/level.service';

export async function getAllLevels(req: Request, res: Response, next: NextFunction) {
  try {
    const levels = await LevelService.getAllLevels();
    return res.status(201).json(levels);
    
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function addLevel(req: Request, res: Response, next: NextFunction) {
  // validator
  const levelData = req.body as ILevel;

  try {
    const newLevel = await LevelService.addLevel(levelData);
    return res.status(201).json(newLevel)

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getLevel(req: Request, res: Response, next: NextFunction) {
  // validator
  const levelNo = parseInt(req.params.levelNo as string);

  try {
    const level = await LevelService.getLevel(levelNo);
    return res.status(200).json(level);

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function updateLevel(req: Request, res: Response, next: NextFunction) {
  // validator
  const levelNo = parseInt(req.params.levelNo as string);
  const levelData = req.body as ILevel;

  try {
    const updatedLevel = await LevelService.updateLevel(levelNo, levelData);
    return res.status(200).json(updatedLevel)

  } catch (error) {
    return res.status(503).json(error);
  }
}