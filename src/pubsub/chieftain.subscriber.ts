import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import { IAchievementDoc } from '../models/achievement.model';
import { IUserAchievement } from '../models/user.model';

export async function chieftainSubscriber(userId: string, pointsAdded: number) {
  const achievement = await AchievementService.getAchievementByName('Høvding');
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const userPoints = await UserService.getUserPoints(userId);

  if (userPoints >= 1000) {
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