import { Request, Response, NextFunction } from 'express';
import { IForecast } from '../models/air-quality-forecast.model'
import * as AirQualityService from '../services/air-quality.service';
import axios from 'axios';

export async function getForecast(req: Request, res: Response, next: NextFunction) {
  // validator
  const area = req.params.areaName as string;

  try {
    

    const result = AirQualityService.getForecast(area)
    return res.status(200).json(result);

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function updateForecast(req: Request, res: Response, next: NextFunction) {
  try {
    const axiosResponse = await axios.get<IForecast[]>('https://api.met.no');


    
    return res.status(201).json();

  } catch (error) {
    return res.status(503).json(error);
  }
}