import { ISession, IWaypoint } from '../models/session.model';
import * as SessionService from '../services/session.service';
import * as AchievementService from '../services/achievement.service';
import * as UserService from '../services/user.service';
import { PollutionLevels } from '../constants';
import { IUserAchievement } from '../models/user.model';

export async function lowPollutionSubscriber(newSession: ISession) {
  const userId = newSession.userId;
  const isLowPollution = (waypoint: IWaypoint) => waypoint.pollutionLevel === PollutionLevels.Low;
  const isAirPollutionAvoided: boolean = newSession.waypoints.every(isLowPollution);

  if (isAirPollutionAvoided) {
    const achievement = await AchievementService.getAchievementByName('En helgrønn tur');

    const userAchievement: IUserAchievement = {
      timestampEarned: (new Date()).toISOString(),
      achievementId: achievement._id
    }

    await UserService.addUserAchievement(userId, userAchievement);
    await UserService.addUserPoints(userId, achievement.pointValue);

    // Build push-notification
  }
}