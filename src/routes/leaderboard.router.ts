import { Router } from "express";
import * as LeaderboardController from '../controllers/leaderboard.controller';

export const LeaderboardRouter: Router = Router();

LeaderboardRouter
  .route('/users/top')
  .get(LeaderboardController.getUserLeaderboard);

LeaderboardRouter
  .route('/users/:userId')
  .get(LeaderboardController.getUserLeaderboardPosition);
