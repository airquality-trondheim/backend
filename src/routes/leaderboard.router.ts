import { Router } from "express";
import * as LeaderboardController from '../controllers/leaderboard.controller';

export const LeaderboardRouter: Router = require('express').Router();

LeaderboardRouter
  .route('/top')
  .get(LeaderboardController.getUserLeaderboard);

LeaderboardRouter
  .route('/user/:userId')
  .get(LeaderboardController.getUserLeaderboardPosition);
