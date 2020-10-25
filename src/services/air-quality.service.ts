import { IForecast, Forecast } from '../models/air-quality-forecast.model';

export async function getForecast(areacode: string) {
  try {
    // Query on embedded field, i.e. IForecast#location.name seems to work only when enclosing in quotation marks. 
    const forecast = await Forecast.findOne({ "location.areacode": areacode }) as IForecast;
    return forecast;

  } catch (error) {
    throw Error('Could not get area forecast. \n' + error);
  }
}

export async function updateForecast(forecast: IForecast) {
  try {
    // Query on embedded field, i.e. IForecast#location.areacode seems to work only when enclosing in quotation marks. 
    const oldForecast = await Forecast.findOne({ "location.areacode": forecast.location.areacode });
    const newForecast = await Forecast.create(forecast);
    
    if (oldForecast) {
      await Forecast.deleteOne({ _id: oldForecast._id });
    }
    
    return newForecast;

  } catch (error) {
    throw Error('Could not update area forecast. \n' + error);
  }
}

