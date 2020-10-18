import { ISession } from '../models/session.model';
import * as SessionService from '../services/session.service';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import { IUserAchievement } from '../models/user.model';

export async function firstSessionSubscriber(newSession: ISession) {
  const userId = newSession.userId;
  const userSessions = await SessionService.getAllUserSessions(userId);

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
}