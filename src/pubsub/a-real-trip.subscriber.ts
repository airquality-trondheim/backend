import { ISession } from '../models/session.model';
import { differenceInCalendarDays } from 'date-fns';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IAchievementDoc } from '../models/achievement.model';
import { IUserAchievement } from '../models/user.model';
import * as UserIdMiddleware from '../middlewares/user-id.middleware';

export async function aRealTripSubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('Real tur');
  
  const userId = await UserIdMiddleware.getDbUserId(newSession.userId);
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  let meterDistance = newSession.sessionResult.metersTraveled;

  const kilometerDistance = meterDistance / 1000;

  if (kilometerDistance >= 10) {
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