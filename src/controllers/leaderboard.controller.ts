import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';
import * as LeaderboardService from '../services/leaderboard.service';
import * as UserIdMiddleware from '../middlewares/user-id.middleware';

interface IResult {
  rankings: IUser[];
  last: boolean;
  next?: string;
}

async function buildResult(users: IUser[], limit: number) {
  const result = {} as IResult;

  result.rankings = [];
  users.forEach((user) => result.rankings.push(JSON.parse(JSON.stringify(user))));

  if (result.rankings.length > limit) { 
    result.rankings.pop();
    result.last = false;

    const lastItem = result.rankings[result.rankings.length-1];

    result.next = `${lastItem.points}_${lastItem._id}`;
  } else {
    result.last = true;
  }

  return result;
}

export async function getUserLeaderboard(req: Request, res: Response, next: NextFunction) {
  // validator
  const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const areaName = req.query.areaName as string;
  
  try {
    let users;
    
    // Try to get one more user, than is requested, so that we can determine whether 
    // there are any more users left.
    if (!req.query.next) {
      users = await LeaderboardService.getUserLeaderboard(limit + 1, areaName) as IUser[];

    } else {
      const next = req.query.next as string;
      const splitNext = next.split('_');
      const nextPoints = parseInt(splitNext[0]);
      const nextId = splitNext[1];

      users = await LeaderboardService.getUserLeaderboardWithCursor(limit + 1, nextPoints, nextId, areaName) as IUser[];
    }

    const result = await buildResult(users, limit);
    return res.status(200).json(result);
  
  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function getUserLeaderboardPosition(req: Request, res: Response, next: NextFunction) {
  // validator
  let userId = req.params.userId as string;
  const areaName = req.query.areaName as string;

  try {
    userId = await UserIdMiddleware.getDbUserId(userId);
    const users = await LeaderboardService.getUserLeaderboardPosition(userId, areaName);
    const user = users[users.length - 1];
    const result = { rank: users.length, user: user};
    res.status(200).json(result);

  } catch (error) {
    res.status(503).json(error);
  }
}