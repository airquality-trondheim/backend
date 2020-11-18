import { ISession } from '../models/session.model';
import { differenceInCalendarDays } from 'date-fns';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IUserAchievement } from '../models/user.model';

export async function theWholeWeekLongSubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('Hele uken lang');
  
  const userId = newSession.userId;
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const sessions = await SessionService.getAllUserSessions(userId);
  const sessionsCount = sessions.length;

  // Early return if impossible in terms of number of sessions, or it being
  // the last day of the week.
  if (sessionsCount < 7 || newSession.stopTime.getDay() != 0) return;
  
  // Sort sessions by date in descending order.
  sessions.sort((a, b) => b.stopTime.getTime() - a.stopTime.getTime());
  
  let consecutiveDays = 0;

  for (let i = 0; i < sessionsCount; i++) {
    const diff = differenceInCalendarDays(sessions[i].stopTime, sessions[i+1].stopTime);
    
    // If consecutivity is broken, then return.
    if (diff > 1) return;
    
    // Possibility for multiple hikes per day, only increment once per unqiue day.
    if (diff == 1) consecutiveDays++;
    
    if (consecutiveDays >= 7) {
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