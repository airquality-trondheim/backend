import { Schema, Document, model } from 'mongoose';

export interface IAchievement {
  name: string;
  category: string;
  iconUrl: string;
  description: string;
  value: string;
  pointValue: number;
  qty: number;
}

export interface IAchievementDoc extends IAchievement, Document { }

const achievementSchema = new Schema(
  {
    name:           { type: String, required: true, trim: true, minLength: 1, }
    , category:     { type: String, required: true, }
    , iconUrl:      { type: String, required: true, }
    , description:  { type: String, required: true, }
    , value:        { type: String, required: true, }
    , pointValue:   { type: Number, required: true, }
    , qty:          { type: Number, default: 0, }
  },
  {
    timestamps: true,
  }
);

export const Achievement = model<IAchievementDoc>('Achievement', achievementSchema);