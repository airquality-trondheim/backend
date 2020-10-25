import { Router } from 'express';
import * as AirQualityController from '../controllers/air-quality.controller';

export const AirQualityRouter: Router = Router();
/*
AirQualityRouter
  .route('/current')
  .get(AirQualityController.getCurrent)
*/
AirQualityRouter
  .route('/forecast/:areaName')
  .get(AirQualityController.getForecast)

// Update forecast should be an authorized function, e.g. admin/sys

AirQualityRouter
  .route('/forecast/update')
  .post(AirQualityController.updateForecast)