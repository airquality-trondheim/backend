import { Schema, Document, model, Types } from 'mongoose';

export interface ISessionResult extends Types.Subdocument {
  millisecondsElapsed: number;
  metersTraveled: number;
  avgKmph: number;
  distancePoints: number;
  safeZonePoints: number;
  sumPoints: number;
}

export interface IWaypoint extends Types.Subdocument {
  longitude: number;
  latitude: number;
  timestamp: Date;
  pollutionLevel: string;
}

export interface ISession extends Document {
  userId: Types.ObjectId;
  sessionType: string;
  startTime: Date;
  stopTime: Date;
  waypoints: IWaypoint[];
  sessionResult: ISessionResult;
}

const sessionSchema = new Schema(
  {
    userId:               { type: String, required: true, }
    , sessionType:        { type: String, required: true, }
    , startTime:          { type: Date, required: true, }
    , stopTime:           { type: Date, required: true, }
    
    , waypoints:          [{
      longitude:          { type: Number, required: true, }
      , latitude:         { type: Number, required: true, }
      , timestamp:        { type: Date, required: true, }
      , pollutionLevel:   { type: String, required: true, }
    }]
    
    , sessionResult:      {
      millisecondsElapsed:{ type: Number, required: true, }
      , metersTraveled:   { type: Number, required: true, }
      , avgKmph:          { type: Number, required: true, }
      , distancePoints:   { type: Number, required: true, }
      , safeZonePoints:   { type: Number, required: true, }
      , sumPoints:        { type: Number, required: true, }
    }
  },
  {
    timestamps: true,
  }
);

export const Session = model<ISession>('Session', sessionSchema);