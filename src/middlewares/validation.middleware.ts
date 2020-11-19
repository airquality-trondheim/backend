import { NextFunction, Request, Response } from 'express';
import { validator } from '../helpers/validate';

export const session = function (req: Request, res: Response, next: NextFunction) {
  const validationRule = {
    "userId": "required|string",
    "sessionType": "required|string",
    "startTime": "required|string",
    "stopTime": "required|string",
    "waypoints.*.longitude": "required|numeric",
    "waypoints.*.latitude": "required|numeric",
    "waypoints.*.timestamp": "required|string",
    "waypoints.*.pollutionLevel": "required|string",
  }
  
  validator(req.body, validationRule, {}, (err, status) => {
    if(!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err,
        });
    } else {
      next();
    }
  });
}

export const area = function (req: Request, res: Response, next: NextFunction) {
  const validationRule = {
    "homeArea": "required|string|validArea"
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if(!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err,
        });
    } else {
      next();
    }
  });
}

export const settings = function (req: Request, res: Response, next: NextFunction) {
  const validationRule = {
    "pushNotifications": "required|boolean",
    "pushToken": "required|string",
  }

  validator(req.body, validationRule, {}, (err, status) => {
    if(!status) {
      res.status(412)
        .send({
          success: false,
          message: 'Validation failed',
          data: err,
        });
    } else {
      next();
    }
  });
}
