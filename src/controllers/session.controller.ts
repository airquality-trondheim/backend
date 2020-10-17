import { Request, Response, NextFunction } from 'express';
import { ISession } from '../models/session.model';
import * as SessionService from '../services/session.service';
import * as UserService from '../services/user.service';

export async function registerUserSession(req: Request, res: Response, next: NextFunction) {
  // validation
  const userId = req.params.userId as string;
  const sessionData = req.body as ISession;

  try {
    const newSession = await SessionService.registerUserSession(userId, sessionData);
    const updatedUser = await UserService.addUserPoints(userId, newSession.sessionResult.sumPoints);

    const result = {
      sessionResult: newSession.sessionResult,
      updatedUser: updatedUser
    }
    
    return res.status(201).json(result);

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getAllUserSessions(req: Request, res: Response, next: NextFunction) {
  // validation
  const userId = req.params.userId as string;
  
  try {
    const sessions = await SessionService.getAllUserSessions(userId);
    return res.status(200).json(sessions);
  
  } catch (error) {
    return res.status(503).json(error);
  }
}