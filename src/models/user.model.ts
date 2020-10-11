import { Schema, Document, model, Types } from 'mongoose';

export interface IUserSettings extends Types.Subdocument {
  pushNotifications: boolean;
}

export interface IUser extends Document {
  username: string;
  points?: number;
  achievementIds?: string[];
  settings?: IUserSettings;
}

interface IUserDoc extends IUser, Document {}

const userSchema = new Schema(
  {
    username:           { type: String, required: true, unique: true, trim: true, minlength: 3 }
    , points:           { type: Number, index: true, default: 0 }
    , achievementIds:   { type: [String], default: [] }
    , settings:         {
      pushNotifications: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true,
  }
);

export const User = model<IUserDoc>('User', userSchema);