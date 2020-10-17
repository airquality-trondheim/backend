import { Schema, Document, model } from 'mongoose';

export interface IAchievement extends Document {
  name: string;
  category: string;
  iconUrl: string;
  description: string;
  value: string;
  qty: number;
}

const achievementSchema = new Schema(
  {
    name:           { type: String, required: true, trim: true, minLength: 1, }
    , category:     { type: String, required: true, }
    , iconUrl:      { type: String, required: true, }
    , description:  { type: String, required: true, }
    , value:        { type: String, required: true, }
    , qty:          { type: Number, default: 0, }
  },
  {
    timestamps: true,
  }
);

export const Achievement = model<IAchievement>('Achievement', achievementSchema);