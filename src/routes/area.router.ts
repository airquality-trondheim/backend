import { Router } from "express";
import * as AreaController from '../controllers/area.controller';

export const AreaRouter: Router = require('express').Router();

AreaRouter
  .route('/')
  .get(AreaController.getAreas)

AreaRouter
  .route('/update')
  .post(AreaController.updateAreas)