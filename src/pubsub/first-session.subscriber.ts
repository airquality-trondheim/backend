import { ISession } from '../models/session.model';
import * as SessionService from '../services/session.service';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import { IUserAchievement } from '../models/user.model';
import * as UserIdMiddleware from '../middlewares/user-id.middleware';

export async function firstSessionSubscriber(newSession: ISession) {
  try {
    const userId = await UserIdMiddleware.getDbUserId(newSession.userId);
    const userSessions = await SessionService.getAllUserSessions(newSession.userId);

    if ((userSessions.length == 0) || (userSessions.length == 1 && userSessions[0]._id === newSession._id)) {
      const achievement = await AchievementService.getAchievementByName('Jomfruturen');

      const userAchievement: IUserAchievement = {
        timestampEarned: (new Date()).toISOString(),
        achievementId: achievement._id
      }

      await UserService.addUserAchievement(userId, userAchievement);
      await UserService.addUserPoints(userId, achievement.pointValue);
      
      // Build push-notification
    }
  } catch (error) {
    throw Error('Could not check subscriber. \n' + error);
  }
}