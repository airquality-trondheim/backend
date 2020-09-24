
const router = require('express').Router();
const userModel = require('../models/user.model');

/**
 * @swagger
 * path:
 *   /populate/users:
 *     get:
 *       summary: Populate database with twelve (12) user entries with points.
 *       tags: [Populate]
 *       produces:
 *         application/json
 *       responses:
 *         "200":
 *           description: Populating process successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         "400":
 *           description: Error message
 *           content:
 *             application/json:
 *               schema: 
 *                 type: string
 */

router.route('/users').get((req, res) => {
    userModel.insertMany([
        {
            username: "Anders",
            points: 1
        },
        {
            username: "Bjarne",
            points: 2
        },
        {
            username: "Charles",
            points: 3
        },
        {
            username: "Dolf",
            points: 4
        },
        {
            username: "Eline",
            points: 5
        },
        {
            username: "Fjodor",
            points: 5
        },
        {
            username: "Gine",
            points: 6
        },
        {
            username: "Hanne",
            points: 7
        },
        {
            username: "Ine",
            points: 8
        },
        {
            username: "Jonas",
            points: 9
        },
        {
            username: "Karl",
            points: 9
        },
        {
            username: "Lone",
            points: 10
        }
    ])
      .then(() => {
          res.status(200).json('DB Populated');
        })
      .catch((err) => res.status(400).json('Error: ' + err));
})


module.exports = router;