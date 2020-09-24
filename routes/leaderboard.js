const router = require('express').Router();
const userModel = require('../models/user.model');

/**
 * @swagger
 * path:
 *   /leaderboard/top:
 *     get:
 *       summary: Returns a ordered list of users of a specified size beginning at a specified cursor placement.
 *       tags: [Leaderboard]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: query
 *           name: next
 *           schema:
 *             type: string
 *           description: A cursor string consisting of a point score and a user id separated by an underscore.
 *         - in: query
 *           name: limit
 *           schema: 
 *             type: integer
 *           required: true
 *           description: The number of items to return.
 *       responses:
 *         "200":
 *           description: Contains a page of users, whether there are more users, and iff there are more users; a cursor string to use in the subsequent query. 
 *           content:
 *             application/json:
 *               schema:
 *                 oneOf:
 *                   - type: object
 *                     properties:
 *                       rankings:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/User'
 *                       last:
 *                         type: boolean
 *                       next:
 *                         type: string
 *                   - type: object
 *                     properties:
 *                       rankings:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/User'
 *                       last:
 *                         type: boolean
 *         "400":
 *           description: Error message
 *           content:
 *             application/json:
 *               schema: 
 *                 type: string
 */

function buildResult(users, limit) {
    let result = {};

    result.rankings = [];
    users.forEach((user) => result.rankings.push(JSON.stringify(user)));

    if (result.rankings.length > limit) {
        result.rankings.pop();
        result.last = false;

        let lastItem = result.rankings[result.rankings.length-1];
        result.next = `${lastItem.points}_${lastItem._id}`;
    } else {
        result.last = true;
    }

    return result;
}

router.route('/top').get((req, res) => {
    const limit = req.query.limit * 1;
    
    if (!req.query.next) {
      userModel.find({})
      .lean()
      .sort({ points: 'desc', _id: 'desc' })
      .limit(limit + 1)
      .then((users) => res.status(200).json(buildResult(users, limit)))
      .catch((err) => res.status(400).json(err));
    } else {
      let [nextPoints, nextId] = req.query.next ? req.query.next.split('_') : [0, null];
      nextPoints = nextPoints * 1;

      userModel.find({})
      .lean()
      .or([{ points: { $lt: nextPoints }}, { points: nextPoints, _id : { $lt: nextId } }])
      .sort({ points: 'desc', _id: 'desc' })
      .limit(limit + 1)
      .then((users) => res.status(200).json(buildResult(users, limit)))
      .catch((err) => res.status(400).json(err));
    }
})

/**
 * @swagger
 * path:
 *   /leaderboard/{userId}:
 *     get:
 *       summary: Get the leaderboard ranking of a given user
 *       tags: [Leaderboard]
 *       produces:
 *         - application/json
 *       parameters:
 *         - in: path
 *           name: userId
 *           schema:
 *             type: string
 *           required: true
 *           description: Id of the user
 *       responses:
 *         "200":
 *           description: A leaderboard position object
 *           content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/User'
 *         "400":
 *           description: Error message
 *           content:
 *             application/json:
 *               schema: 
 *                 type: string
 */

router.route('/user/:userId').get((req, res) => {
    userModel.findOne({ _id: req.params.userId })
      .then((user) => {
        userModel.find({})
          .lean()
          .or([{ points: { $gt: user.points }}, { points: user.points, _id: { $gt: user._id }}, { points: user.points, _id: user._id }])
          .sort({points: 'desc', _id: 'desc'})
          .then((users) => {
            let result = {};
            users.forEach((user, index) => { 
                if (req.params.userId == user._id) {
                  result = {ranking:index+1, username:user.username, points:user.points};
                }
            });
          
            if (result == {}) res.status(404).json(`${req.params.userId} not found!`);
            res.status(200).json(result);
          })
        })
        .catch((err) => res.status(400).json('Error: ' + err))
      .catch((err) => res.status(400).json('Error: ' + err));

      
});

module.exports = router;