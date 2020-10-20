import { Schema, Document, model, Types } from 'mongoose';

export interface IUserAchievement extends Types.Subdocument {
  timestampEarned: Date;
  achievementId: string;
}

export interface IUserSettings extends Types.Subdocument {
  pushNotifications: boolean;
}

export interface IUser extends Document {
  username: string;
  points?: number;
  level: number;
  achievements?: IUserAchievement[];
  settings?: IUserSettings;
}

interface IUserDoc extends IUser, Document {}

const userSchema = new Schema(
  {
    username:           { type: String, required: true, unique: true, trim: true, minlength: 3 }
    , points:           { type: Number, index: true, default: 0 }
    , level:            { type: Number, default: 0 }
    
    , achievements:   [{
      timestampEarned:  { type: Date, required: true}
      , achievementId:  { type: Types.ObjectId, required: true }
    }]
    
    , settings:         {
      pushNotifications: { type: Boolean, default: false }
    }
  },
  {
    timestamps: true,
  }
);

export const User = model<IUserDoc>('User', userSchema);