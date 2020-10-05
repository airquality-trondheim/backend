import { Schema, Document, model } from 'mongoose';

export interface IAchievement extends Document {
  id: string;
  name: string;
  iconUrl: string;
  description: string;
  qty: number;
}

const achievementSchema = new Schema(
  {
    id:             { type: String, required: true, unique: true, trim: true, minLength: 1, } // TODO: Remove
    , name:         { type: String, required: true, trim: true, minLength: 1, }
    , iconUrl:      { type: String, required: true, minlength: 1, }
    , description:  { type: String, required: true, }
    , qty:          { type: Number, default: 0, }
  },
  {
    timestamps: true,
  }
);

export const Achievement = model<IAchievement>('Achievement', achievementSchema);