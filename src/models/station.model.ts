import { Schema, Document, model } from 'mongoose';

interface IOmrade {
  name: string;
  areacode: string;
}

export interface IStation {
  name: string;
  eoi: string;
  height: number;
  longitude: number;
  latitude: number;
  grunnkrets: IOmrade;
  delomrade: IOmrade;
  kommune: IOmrade;
}

interface IStationDoc extends IStation, Document {}

const stationSchema = new Schema(
  {
    name:         { type: String, required: true }
    , eoi:        { type: String, required: true }
    , height:     { type: Number, required: true }
    , longitude:  { type: Number, required: true }
    , latitude:   { type: Number, required: true }
    , grunnkrets: {
      name:       { type: String, required: true }
      , areacode: { type: String, required: true }
    }
    , delomrade:  {
      name:       { type: String, required: true }
      , areacode: { type: String, required: true }
    }
    , kommune:  {
      name:       { type: String, required: true }
      , areacode: { type: String, required: true }
    }
  }
);

export const Station = model<IStationDoc>('Station', stationSchema);