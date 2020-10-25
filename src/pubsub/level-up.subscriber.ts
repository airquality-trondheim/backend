import { ISession, IWaypoint } from '../models/session.model';
import * as LevelService from '../services/level.service';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import { PollutionLevels } from '../constants';
import { IUserAchievement } from '../models/user.model';

export async function levelUpSubscriber(userId: string, points: number) {
  const user = await UserService.getUser(userId);
  const level = await LevelService.getLevel(user.level);

  if (user.points > (level.pointsRequired + level.pointThreshold)) {
    await UserService.increaseUserLevel(userId);

    // Build push-notification
  }
}