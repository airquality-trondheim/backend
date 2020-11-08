import { Schema, Document, model, Types } from 'mongoose';

export interface IUserAchievement {
  timestampEarned: string;
  achievementId: string;
}

export interface IUserSettings extends Types.Subdocument {
  pushNotifications: boolean;
  pushToken: string;
}

export interface IUser extends Document {
  username: string;
  awsId: string;
  points: number;
  level: number;
  homeArea: string;
  zodiac: string;
  achievements?: IUserAchievement[];
  settings?: IUserSettings;
}

interface IUserDoc extends IUser, Document {}

const userSchema = new Schema(
  {
    username:           { type: String, required: true, unique: true, trim: true, minlength: 3 }
    , awsId:            { type: String, required: true, unique: true }
    , points:           { type: Number, index: true, default: 0 }
    , level:            { type: Number, default: 1 }
    , homeArea:         { type: String, default: "Sverresborg" }
    , zodiac:           { type: String, default: "Steinbukk"}
    
    , achievements:     [{
      timestampEarned:  { type: String, required: true}
      , achievementId:  { type: String, required: true }
    }]
    
    , settings:         {
        pushNotifications: { type: Boolean, default: false },
        pushToken: { type: String, default: '' }
    }
  },
  {
    timestamps: true,
  }
);

export const User = model<IUserDoc>('User', userSchema);