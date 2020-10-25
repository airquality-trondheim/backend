import { Request, Response, NextFunction } from 'express';
import { IArea } from '../models/area.model';
import * as AreaService from '../services/area.service';
import axios from 'axios';
import { Urls } from '../constants';

export async function getAreas(req: Request, res: Response, next: NextFunction) {
  try {
    const areas = await AreaService.getAreas();
    return res.status(200).json(areas);

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function updateAreas(req: Request, res: Response, next: NextFunction) {
  try {
    const axiosResponse = await axios.get<IArea[]>(`${Urls.apiBaseUrl}/areas?areaclass=delomrade`);

    const trondheimAreaCodeMatch = /^5001\d+/; // All strings consisting only of number starting with 5001
    const trondheimAreas: IArea[] = [];

    axiosResponse.data.forEach((area: IArea) => {
      if (trondheimAreaCodeMatch.test(area.areacode)) {
        trondheimAreas.push(area);
      }
    });

    const updatedAreas = await AreaService.refreshAreas(trondheimAreas);
    return res.status(201).json(updatedAreas);
  
  } catch (error) {
    return res.status(503).json(error);
  }
}