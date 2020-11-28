import { Request, Response, NextFunction } from 'express';
import { IForecast, IForecastUnit, ILocation, IMeasure, IVariables } from '../models/air-quality-forecast.model'
import { IArea } from '../models/area.model';
import { IStation } from '../models/station.model';
import * as AirQualityService from '../services/air-quality.service';
import * as AreaService from '../services/area.service';
import * as StationService from '../services/station.service';
import axios, { AxiosResponse } from 'axios';
import { Urls } from '../constants';

export async function getForecast(req: Request, res: Response, next: NextFunction) {
  const areacode = req.params.areaName as string;

  try {
    const result = await AirQualityService.getForecast(areacode);

    if (!result) return res.status(404).json({ message: `No forecasts for areacode ${areacode}`});

    return res.status(200).json(result);

  } catch (error) {
    return res.status(503).json(error);
  }
}

export async function updateForecast(req: Request, res: Response, next: NextFunction) {
  try {
    const areas: IArea[] = await AreaService.getAreas();
    areas.forEach(async (area: IArea) => {
      const forecastUrl = `${Urls.apiBaseUrl}/?lon=${area.longitude}&lat=${area.latitude}&areaclass=delomrade`;
      const axiosResponse = await axios.get(forecastUrl);
      const forecast = await parseForecastData(axiosResponse);

      await AirQualityService.updateForecast(forecast);
    });

    const stations: IStation[] = await StationService.getStations();
    stations.forEach(async (station: IStation) => {
      const forecastUrl = `${Urls.apiBaseUrl}/?station=${station.eoi}`;
      const axiosResponse = await axios.get(forecastUrl);
      const forecast = await parseForecastData(axiosResponse);

      await AirQualityService.updateForecast(forecast);
    });

    return res.status(201).json({ message: "Forecasts successfully updated!"});

  } catch (error) {
    return res.status(503).json(error);
  }
}

async function parseForecastData(axiosResponse: AxiosResponse<any>): Promise<IForecast> {
  const forecastData = axiosResponse.data;
  const datalist: IForecastUnit[] = [];

  for (const forecastUnit of forecastData.data.time) {
    const variablesData = forecastUnit.variables;

    const AQI: IMeasure = {
      value: variablesData.AQI.value,
      unit: variablesData.AQI.units
    }
    
    const AQI_no2: IMeasure = {
      value: variablesData.AQI_no2.value,
      unit: variablesData.AQI_no2.units
    }

    const AQI_pm10: IMeasure = {
      value: variablesData.AQI_pm10.value,
      unit: variablesData.AQI_pm10.units
    }

    const AQI_pm25: IMeasure = {
      value: variablesData.AQI_pm25.value,
      unit: variablesData.AQI_pm25.units
    }

    const no2_concentration: IMeasure = {
      value: variablesData.no2_concentration.value,
      unit: variablesData.no2_concentration.units
    }

    const pm10_concentration: IMeasure = {
      value: variablesData.pm10_concentration.value,
      unit: variablesData.pm10_concentration.units
    }

    const pm25_concentration: IMeasure = {
      value: variablesData.pm25_concentration.value,
      unit: variablesData.pm25_concentration.units
    }
    
    const variables: IVariables = {
      AQI: AQI,
      AQI_no2: AQI_no2,
      AQI_pm10: AQI_pm10,
      AQI_pm25: AQI_pm25,
      no2_concentration: no2_concentration,
      pm10_concentration: pm10_concentration,
      pm25_concentration: pm25_concentration
    }

    const data: IForecastUnit = {
      from: forecastUnit.from,
      to: forecastUnit.to,
      variables: variables
    }

    datalist.push(data);
  }
  
  const metaData = forecastData.meta;

  const location: ILocation = {
    name: metaData.location.name,
    longitude: metaData.location.longitude,
    latitude: metaData.location.latitude,
    areacode: metaData.location.areacode
  }

  const forecast: IForecast = {
    location: location,
    reftime: forecastData.meta.reftime,
    data: datalist,
  }

  return forecast;
}