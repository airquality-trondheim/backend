import { ISession } from '../models/session.model';
import { differenceInCalendarDays } from 'date-fns';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IUserAchievement } from '../models/user.model';
import * as UserIdMiddleware from '../middlewares/user-id.middleware';

export async function aroundTheEquatorSubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('Rundt ekvator');
  
  const userId = await UserIdMiddleware.getDbUserId(newSession.userId);
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const sessions = await SessionService.getAllUserSessions(newSession.userId);

  let meterDistance = 0;
  sessions.forEach(session => meterDistance += session.sessionResult.metersTraveled)

  const kilometerDistance = meterDistance / 1000;

  if (kilometerDistance >= 40_075) {
    const userAchievement: IUserAchievement = {
      timestampEarned: (new Date()).toISOString(),
      achievementId: achievement._id
    }

    await UserService.addUserAchievement(userId, userAchievement);
    await UserService.addUserPoints(userId, achievement.pointValue);

    // Push notification
    return;
  }
}