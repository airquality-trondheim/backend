import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import * as LeaderboardService from '../services/leaderboard.service';

interface IResult {
  rankings: IUser[];
  last: boolean;
  next?: string;
}

async function buildResult(users: IUser[], limit: number) {
  let result = {} as IResult;

  result.rankings = [];
  users.forEach((user) => result.rankings.push(JSON.parse(JSON.stringify(user))));

  if (result.rankings.length > limit) { 
    result.rankings.pop();
    result.last = false;

    let lastItem = result.rankings[result.rankings.length-1];

    result.next = `${lastItem.points}_${lastItem._id}`;
  } else {
    result.last = true;
  }

  return result;
}

export async function getUserLeaderboard(req: Request, res: Response, next: NextFunction) {
  // validator
  const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;

  try {
    let users;
    
    // Try to get one more user, than is requested, so that we can determine whether 
    // there are any more users left.
    if (!req.query.next) {
      users = await LeaderboardService.getUserLeaderboard(limit + 1) as IUser[];

    } else {
      const next = req.query.next as string;
      const splitNext = next.split('_');
      const nextPoints = parseInt(splitNext[0]);
      const nextId = splitNext[1];

      users = await LeaderboardService.getUserLeaderboardWithCursor(limit + 1, nextPoints, nextId) as IUser[];
    }

    const result = await buildResult(users, limit);
    return res.status(200).json(result);
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getUserLeaderboardPosition(req: Request, res: Response, next: NextFunction) {
  // validator
  const userId = req.params.userId as string;
  try {
    const users = await LeaderboardService.getUserLeaderboardPosition(userId);
    const user = users[users.length - 1];
    let result = { rank: users.length, user: user};
    res.status(200).json(result);

  } catch (error) {
    res.status(503).json(error);
  }
}

export async function getAreaLeaderboard(req: Request, res: Response, next: NextFunction) {
  // validator
  const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;

  try {
    let users;
    
    // Try to get one more user, than is requested, so that we can determine whether 
    // there are any more users left.
    if (!req.query.next) {
      users = await LeaderboardService.getUserLeaderboard(limit + 1) as IUser[];

    } else {
      const next = req.query.next as string;
      const splitNext = next.split('_');
      const nextPoints = parseInt(splitNext[0]);
      const nextId = splitNext[1];

      users = await LeaderboardService.getUserLeaderboardWithCursor(limit + 1, nextPoints, nextId) as IUser[];
    }

    const result = await buildResult(users, limit);
    return res.status(200).json(result);
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getAreaLeaderboardPosition(req: Request, res: Response, next: NextFunction) {
  // validator
  const userId = req.params.userId as string;
  console.log("FUCK");
  try {
    const users = await LeaderboardService.getUserLeaderboardPosition(userId);
    const user = users[users.length - 1];
    let result = { rank: users.length, user: user};
    res.status(200).json(result);

  } catch (error) {
    res.status(503).json(error);
  }
}