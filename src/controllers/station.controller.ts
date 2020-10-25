import { Request, Response, NextFunction } from 'express';
import { IStation } from '../models/station.model';
import * as StationService from '../services/station.service';
import axios from 'axios';

export async function getStations(req: Request, res: Response, next: NextFunction) {
  try {
    const stations = await StationService.getStations();
    return res.status(200).json(stations);

  } catch (error) {
    return res.status(503).json({ message: error })
  }
}

export async function refreshStations(req: Request, res: Response, next: NextFunction) {
  try {
    const stationUrl = 'https://api.met.no/weatherapi/airqualityforecast/0.1/stations';
    const axiosResponse = await axios.get<IStation[]>(stationUrl);

    const trondheimAreacode = '5001'
    const trondheimStations: IStation[] = []

    axiosResponse.data.forEach((station: IStation) => {
      if (station.kommune.areacode === trondheimAreacode) {
        trondheimStations.push(station);
      }
    });

    const refreshedStations = await StationService.refreshStations(trondheimStations);
    return res.status(201).json(refreshedStations);

  } catch (error) {
    return res.status(503).json({ message: error });
  }
}