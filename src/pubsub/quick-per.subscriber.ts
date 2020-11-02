import { ISession } from '../models/session.model';
import { differenceInCalendarDays } from 'date-fns';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IUserAchievement } from '../models/user.model';

export async function quickPerSubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('Hurtigper');
  
  const userId = newSession.userId;
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const sessions = await SessionService.getAllUserSessions(userId);

  let count = 0;
  sessions.forEach(session => { if (session.sessionResult.avgKmph >= 10) count++; });

  if (count >= 3) {
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