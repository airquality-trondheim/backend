import { Schema, model } from 'mongoose';

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *         iconUrl:
 *           type: string
 *         qty:
 *           type: number
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
 *          name: 
 *          iconUrl: https://cdn.myhost.com/images/
 *          qty: 26
 *          __v: 0
 *          createdAt: 2020-09-23T22:02:50.221Z
 *          updatedAt: 2020-09-23T22:02:50.221Z
 */

const achievementSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minLength: 1,
    },
    iconUrl: {
      type: String,
      required: true,
      minlength: 1,
    },
    description: {
      type: String,
      required: true,        
    },
    qty: {
      type: Number,
      default: 0,
    }
  }
);


const Achievement = model('Achievement', achievementSchema);

export default Achievement;