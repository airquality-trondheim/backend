import express from 'express';
import { LeaderboardRouter} from './leaderboard.router';
import { AchievementRouter } from './achievement.router';
import { SessionRouter } from './session.router';
import { UserRouter } from './user.router';
import { Application } from 'express';

const router = express.Router();

export = (app: Application) => {
    app.use('/leaderboard', LeaderboardRouter);
    app.use('/achievements', AchievementRouter);
    app.use('/sessions', SessionRouter);
    app.use('/users', UserRouter);
};