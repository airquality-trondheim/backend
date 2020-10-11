import { Schema, Document, model, Types } from 'mongoose';

interface IWaypoint extends Types.Subdocument {
  longitude: number;
  latitude: number;
  timestamp: Date;
  pollution: string;
}

export interface ISession extends Document {
  userId: Types.ObjectId;
  sessionType: string;
  startTime: Date;
  stopTime: Date;
  waypoints: [IWaypoint];
}

const sessionSchema = new Schema(
  {
    userId:               { type: Types.ObjectId, required: true, }
    , sessionType:        { type: String, required: true, }
    , startTime:          { type: Date, required: true, }
    , stopTime:           { type: Date, required: true, }
    , waypoints:          [{
      longitude:          { type: Number, required: true, }
      , latitude:         { type: Number, required: true, }
      , timestamp:        { type: Date, required: true, }
      , pollutionLevel:   { type: String, required: true, }
    }]
  },
  {
    timestamps: true,
  }
);

export const Session = model<ISession>('Session', sessionSchema);