import { ISession, Session } from '../models/session.model';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IUserAchievement } from '../models/user.model';
import { differenceInCalendarDays } from 'date-fns';
import * as UserIdMiddleware from '../middlewares/user-id.middleware';

export async function threeADaySubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('Tre om dagen');

  const userId = await UserIdMiddleware.getDbUserId(newSession.userId);
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const sessions = await SessionService.getAllUserSessions(newSession.userId);
  const sessionsCount = sessions.length;

  // Early return if impossible in terms of number of sessions
  if (sessionsCount < 3) return;

  // Sort sessions by date in descending order.
  sessions.sort((a, b) => b.stopTime.getTime() - a.stopTime.getTime());
  
  let numberOfSessions = 0;

  for (let i = 0; i < sessionsCount; i++) {
    const diff = differenceInCalendarDays(sessions[i].stopTime, sessions[i+1].stopTime);
    
    // If day changed, then return.
    if (diff > 0) return;
    
    numberOfSessions++;
    
    if (numberOfSessions >= 3) {
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

}