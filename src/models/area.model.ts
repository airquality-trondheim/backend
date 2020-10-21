import { Schema, Document, model } from 'mongoose';

export interface IArea {
  name: string;
  path: string;
  longitude: number;
  latitude: number;
  areacode: string;
  areaclass: string;
  superareacode: string;
}

interface IAreaDoc extends IArea, Document {}

const areaSchema = new Schema(
  {
    name:             { type: String, required: true, unique: true }
    , path:           { type: String, required: true }
    , longitude:      { type: Number, required: true }
    , latitude:       { type: Number, required: true }
    , areacode:       { type: String, required: true }
    , areaclass:      { type: String, required: true }
    , superareacode:  { type: String, required: true }
  }
);

export const Area = model<IAreaDoc>('Area', areaSchema);