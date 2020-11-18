import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import * as LeaderboardService from '../services/leaderboard.service';
import { IUserAchievement } from '../models/user.model';

export async function localChampionSubscriber(userId: string, pointsAdded: number) {
  const achievement = await AchievementService.getAchievementByName('Lokal mester');
  
  // If user already has this achievement, then return.
  const hasAchievement = await UserService.userHasAchievement(userId, achievement._id);
  if (hasAchievement) return;

  const user = await UserService.getUser(userId);
  const users = await LeaderboardService.getUserLeaderboardPosition(userId, user.homeArea);
  const userRank = users.length;

  if (userRank == 1) {
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