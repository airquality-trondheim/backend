import express from 'express';
import { LeaderboardRouter} from './leaderboard.router';
import { AchievementRouter } from './achievement.router';
import { SessionRouter } from './session.router';
import { LevelRouter } from './level.router';
import { UserRouter } from './user.router';
import { StationRouter } from './station.router';
import { Application } from 'express';
import { AreaRouter } from './area.router';

const router = express.Router();

export = (app: Application) => {
    app.use('/leaderboard', LeaderboardRouter);
    app.use('/achievements', AchievementRouter);
    app.use('/sessions', SessionRouter);
    app.use('/levels', LevelRouter);
    app.use('/users', UserRouter);
    app.use('/stations', StationRouter);
    app.use('/areas', AreaRouter);
};