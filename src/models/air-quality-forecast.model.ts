import { Schema, Document, model } from 'mongoose';

export interface ILocation {
  name: string;
  longitude: number;
  latitude: number;
  areacode: string;
  areaclass: string;
}

export interface IMeasure {
  value: number;
  unit: string;
}

export interface IVariables {
  AQI: IMeasure;
  AQI_no2: IMeasure;
  AQI_pm10: IMeasure;
  AQI_pm25: IMeasure;
  no2_concentration: IMeasure;
  pm10_concentration: IMeasure;
  pm25_concentration: IMeasure;
}

export interface IForecastUnit {
  from: string;
  to: string;
  variables: [IVariables];
}

export interface IForecast {
  location: ILocation;
  reftime: string;
  data: [IForecastUnit]
}

interface IForecastDoc extends Document {}

const forecastSchema = new Schema(
  {
    location:                 {
      name:                   { type: String, required: true }
      , longitude:            { type: Number, required: true }
      , latitude:             { type: Number, required: true }
      , areacode:             { type: String, required: true }
      , areaclass:            { type: String, required: true}
    }
    , reftime:                { type: String, required: true }
    , data:                   [{
      from:                   { type: String, required: true }
      , to:                   { type: String, required: true }
      , variables:            [{
        AQI:                  {
          value:              { type: Number, required: true }
          , unit:             { type: String, required: true }
        }
        , AQI_no2:            {
          value:              { type: Number, required: true }
          , unit:             { type: String, required: true }
        }
        , AQI_pm10:           {
          value:              { type: Number, required: true }
          , unit:             { type: String, required: true }
        }
        , AQI_pm25:           {
          value:              { type: Number, required: true }
          , unit:             { type: String, required: true }
        }
        , no2_concentration:  {
          value:              { type: Number, required: true }
          , unit:             { type: String, required: true }
        }
        , pm10_concentration: {
          value:              { type: Number, required: true }
          , unit:             { type: String, required: true }
        }
        , pm25_concentration: {
          value:              { type: Number, required: true }
          , unit:             { type: String, required: true }
        }
      }]
    }]
  }
);

export const Forecast = model<IForecastDoc>('forecast', forecastSchema);