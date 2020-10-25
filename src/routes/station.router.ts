import express, { Router } from 'express';
import * as StationController from '../controllers/station.controller';

export const StationRouter: Router = express.Router();

StationRouter
  .route('/')
  .get(StationController.getStations)

// Update stations should be an authorized function, e.g. admin/sys

StationRouter
  .route('/update')  
  .post(StationController.updateStations);