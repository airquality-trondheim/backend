import { Request, Response, NextFunction } from 'express';
import { IUserSettings, IUser } from '../models/user.model';
import * as UserService from '../services/user.service';

export async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getAllUsers();
    return res.status(200).json(users);

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getUserCount(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await UserService.getAllUsers();
    const count = users.length;
    return res.status(200).json({ count: count });
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function addUser(req: Request, res: Response, next: NextFunction) {
  // validator
  const user = req.body as IUser;

  try {
    const newUser = await UserService.addUser(user);
    return res.status(201).json({ user: newUser });

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getUser(req: Request, res: Response, next: NextFunction) {
  // validator
  const userId = req.params.userId as string;

  try {
    const user = await UserService.getUser(userId);
    return res.status(200).json({ user: user });
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction) {
  // validator
  const userId = req.params.userId as string;
  const user = req.body as IUser;

  try {
    const updatedUser = await UserService.updateUser(userId, user);
    return res.status(200).json({ user: updatedUser });

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function deleteUser(req: Request, res: Response, next: NextFunction) {
  // validator
  const userId = req.params.userId as string;

  try {
    await UserService.deleteUser(userId);
    return res.status(200).json(`User with _id ${userId} successfully deleted.`);

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getUserPoints(req: Request, res: Response, next: NextFunction) {
  // validator
  const userId = req.params.userId as string;

  try {
    const userPoints = await UserService.getUserPoints(userId);
    return res.status(200).json({ points: userPoints });
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function updateUserSettings(req: Request, res: Response, next: NextFunction) {
  // validators
  const userId = req.params.userId as string;
  const newSettings = req.body as IUserSettings;

  try {
    const updatedUser = await UserService.updateUserSettings(userId, newSettings);
    return res.status(200).json({ user: updatedUser });

  } catch (error) {
    return res.status(503).json(error);
  }
}
