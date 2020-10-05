import { Schema, Document, model } from 'mongoose';

export interface IUser extends Document {
  username: string,
  points: number,
  achievementIds: string[],
  pushNotification: boolean
}

const userSchema = new Schema(
  {
    username:           { type: String, required: true, unique: true, trim: true, minlength: 3 }
    , points:           { type: Number, required: false, index: true, default: 0 }
    , achievementIds:   { type: [String], default: [] }
    , pushNotification: { type: Boolean, default: false }
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);