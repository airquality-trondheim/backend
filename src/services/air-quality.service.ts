import { IForecast, Forecast } from '../models/air-quality-forecast.model';

export async function getForecast(areacode: string) {
  try {
    // Query on embedded field, i.e. IForecast#location.name seems to work only when using quotation marks,
    // defeating the point of TypeScript. 
    const forecast = await Forecast.findOne({ "location.name": areacode }) as IForecast;
    return forecast;

  } catch (error) {
    throw Error('Could not get area forecast. \n' + error);
  }
}

