import { Schema, Document, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *           required: true
 *         points:
 *           type: number
 *         achievementIds:
 *           type: array
 *           items: 
 *             type: string
 *         __v:
 *           type: number
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *       example:
 *          _id: 6f6bc60a7ee72d1db47d4e55
 *          username: Alexander
 *          points: 24
 *          __v: 0
 *          createdAt: 2020-09-23T22:02:50.221Z
 *          updatedAt: 2020-09-23T22:02:50.221Z
 */

export interface IUser extends Document {
  username: string,
  points: number,
  achievementIds: string[]
}

const userSchema = new Schema(
  {
    username:         { type: String, required: true, unique: true, trim: true, minlength: 3}
    , points:         { type: Number, required: false, index: true, default: 0}
    , achievementIds: { type: [String], default: []}
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>('User', userSchema);