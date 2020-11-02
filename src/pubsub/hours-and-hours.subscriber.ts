import { ISession, Session } from '../models/session.model';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as SessionService from '../services/session.service';
import { IUserAchievement } from '../models/user.model';
import { differenceInCalendarDays } from 'date-fns';

export async function hoursAndHoursSubscriber(newSession: ISession) {
  const achievement = await AchievementService.getAchievementByName('Tre om dagen');

  const userId = newSession.userId;
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const sessions = await SessionService.getAllUserSessions(userId);
  const sessionsCount = sessions.length;

  // Sort sessions by date in descending order.
  sessions.sort((a, b) => b.stopTime.getTime() - a.stopTime.getTime());

  let numberOfHours = 0;
  let accumulatedTime = sessions[0].sessionResult.millisecondsElapsed;

  for (let i = 0; i < sessionsCount; i++) {
    const diff = differenceInCalendarDays(sessions[i].stopTime, sessions[i+1].stopTime);
    
    // If day changed, then return.
    if (diff > 0) return;
    
    accumulatedTime += sessions[i+1].sessionResult.millisecondsElapsed;
    numberOfHours = accumulatedTime / 3_600_000;
    
    if (numberOfHours >= 3) {
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