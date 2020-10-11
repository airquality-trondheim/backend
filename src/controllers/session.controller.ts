import { Request, Response, NextFunction } from 'express';
import { ISession } from '../models/session.model';
import * as SessionService from '../services/session.service';

export async function addUserSession(req: Request, res: Response, next: NextFunction) {
  // validation
  const userId = req.params.userId as string;
  const sessionData = req.body as ISession;
  console.log(userId);
  console.log(sessionData);
  try {
    console.log("TRYING")
    const newSession = await SessionService.addUserSession(userId, sessionData);
    console.log(newSession);
    return res.status(201).json(newSession);

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