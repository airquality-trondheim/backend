const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
 *         points:
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
 *          username: Alexander
 *          points: 24
 *          __v: 0
 *          createdAt: 2020-09-23T22:02:50.221Z
 *          updatedAt: 2020-09-23T22:02:50.221Z
 */

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    points: {
      type: Number,
      required: false,
      index: true,
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

module.exports = User;
