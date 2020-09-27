
const router = require('express').Router();
const userModel = require('../models/user.model');
const achievementModel = require('../models/achievement.model');

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
    { username: 'Anders',   points: 1 },
    { username: 'Bjarne',   points: 2 },
    { username: 'Charles',  points: 3 },
    { username: 'Dolf',     points: 4 },
    { username: 'Eline',    points: 5 },
    { username: 'Fjodor',   points: 5 },
    { username: 'Gine',     points: 6 },
    { username: 'Hanne',    points: 7 },
    { username: 'Ine',      points: 8 },
    { username: 'Jonas',    points: 9 },
    { username: 'Karl',     points: 9 },
    { username: 'Lone',     points: 10 }
  ])
    .then(() => res.status(200).json('User Collection Populated'))
    .catch((err) => res.status(400).json(err));
})


router.route('/achievements').get((req, res) => {
  userModel.insertMany([
    { name: 'Jomfruturen',        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør din første tur.'},
    { name: 'Hele uken lang',     iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur hver dag i én uke.'},
    { name: 'Tre om dagen',       iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør tre turer på én dag.'},
    { name: 'En helgrønn tur',    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur fullstendig i grønn sone.'},
    { name: 'Vaskeekte turgåer',  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur hver dag i én måned.'},
    { name: '', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: ''},
    { name: '', iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: ''}
  ])
    .then(() => res.status(200).json('Achievement Collection Populated'))
    .catch((err) => res.status(400).json(err));
})

module.exports = router;