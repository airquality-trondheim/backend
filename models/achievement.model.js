//import { Schema, model } from 'mongoose';
const mongoose = require('mongoose');

/**
 * @swagger
 * components:
 *   schemas:
 *     Achievement:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         id:
 *           type: string
 *           description: Id to be removed, only for mock data
 *         name:
 *           type: string
 *           required: true
 *         iconUrl:
 *           type: string
 *           required: true
 *         description: 
 *           type: string
 *           required: true
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
 *          id: Bare random tall for enkel mock data
 *          name: Til Andromedagalaksen
 *          iconUrl: https://cdn.myhost.com/images/
 *          qty: 26
 *          __v: 0
 *          createdAt: 2020-09-23T22:02:50.221Z
 *          updatedAt: 2020-09-23T22:02:50.221Z
 */

const achievementSchema = new mongoose.Schema(
  {    
    id: { // TODO: Remove
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLength: 1,
    },
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
  },
  {
    timestamps: true,
  }
);


const Achievement = mongoose.model('Achievement', achievementSchema);

module.exports = Achievement;