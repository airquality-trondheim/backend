import { Request, Response, NextFunction } from 'express';
import { IStation } from '../models/station.model';
import * as StationService from '../services/station.service';
import axios from 'axios';
import { Urls } from '../constants';

export async function getStations(req: Request, res: Response, next: NextFunction) {
  try {
    const stations = await StationService.getStations();
    return res.status(200).json(stations);

  } catch (error) {
    return res.status(503).json({ message: error })
  }
}

export async function updateStations(req: Request, res: Response, next: NextFunction) {
  try {
    const stationUrl = `${Urls.apiBaseUrl}/stations`;
    const axiosResponse = await axios.get<IStation[]>(stationUrl);

    const trondheimAreacode = '5001'
    const trondheimStations: IStation[] = []

    axiosResponse.data.forEach((station: IStation) => {
      if (station.kommune.areacode === trondheimAreacode) {
        trondheimStations.push(station);
      }
    });

    const updatedStations = await StationService.updateStations(trondheimStations);
    return res.status(201).json(updatedStations);

  } catch (error) {
    return res.status(503).json({ message: error });
  }
}