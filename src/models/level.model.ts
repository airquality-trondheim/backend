import { Schema, Document, model } from 'mongoose';

export interface ILevel {
  levelNo: number;
  name: string;
  iconUrl: string;
  pointThreshold: number;
  pointsRequired: number;
  qty: number;
}

interface ILevelDoc extends Document, ILevel {}

const levelSchema = new Schema({
  levelNo:          { type: Number, required: true, unique: true }
  , name:           { type: String, required: true }
  , iconUrl:        { type: String, required: true }
  , pointThreshold: { type: Number, required: true }
  , pointsRequired: { type: Number, required: true }
  , qty:            { type: Number, required: true }
});

export const Level = model<ILevelDoc>('Level', levelSchema);