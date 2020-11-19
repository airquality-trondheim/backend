import { ISession, Session } from '../models/session.model';
import { differenceInCalendarDays } from 'date-fns';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IUserAchievement } from '../models/user.model';
import * as UserIdMiddleware from '../middlewares/user-id.middleware';

export async function realHikerSubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('Vaskeekte turgåer');

  const userId = await UserIdMiddleware.getDbUserId(newSession.userId);
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const sessions = await SessionService.getAllUserSessions(newSession.userId);
  const sessionsCount = sessions.length;

  // Early return if impossible in terms of number of sessions.
  if (sessionsCount < 30) return;
  
  // Sort sessions by date in descending order.
  sessions.sort((a, b) => b.stopTime.getTime() - a.stopTime.getTime());
  
  let consecutiveDays = 0;

  for (let i = 0; i < sessionsCount; i++) {
    const diff = differenceInCalendarDays(sessions[i].stopTime, sessions[i+1].stopTime);
    
    // If consecutivity is broken, then return.
    if (diff > 1) return;
    
    // Possibility for multiple hikes per day, only increment once per unqiue day.
    if (diff == 1) consecutiveDays++;
    
    if (consecutiveDays >= 30) {
      const userAchievement: IUserAchievement = {
        timestampEarned: (new Date()).toISOString(),
        achievementId: achievement._id
      }

      await UserService.addUserAchievement(userId, userAchievement);
      await UserService.addUserPoints(userId, achievement.pointValue);

      return;
    }
  }
}