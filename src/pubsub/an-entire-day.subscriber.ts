import { ISession, Session } from '../models/session.model';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IUserAchievement } from '../models/user.model';
import * as UserIdMiddleware from '../middlewares/user-id.middleware';

export async function anEntireDaySubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('En hel dag');

  const userId = await UserIdMiddleware.getDbUserId(newSession.userId);
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const sessions = await SessionService.getAllUserSessions(newSession.userId);

  let accumulatedTime = 0;
  sessions.forEach(session => accumulatedTime += session.sessionResult.millisecondsElapsed);

  const hours = accumulatedTime / 3_600_000;
  
  if (hours > 24) {
    const userAchievement: IUserAchievement = {
      timestampEarned: (new Date()).toISOString(),
      achievementId: achievement._id
    }

    await UserService.addUserAchievement(userId, userAchievement);
    await UserService.addUserPoints(userId, achievement.pointValue);
  }
}