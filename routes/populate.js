
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
    { username: 'Anders',   points: 1,  achievementIds: ['1', '2', '4'] },
    { username: 'Bjarne',   points: 2,  achievementIds: ['1', '2', '4'] },
    { username: 'Charles',  points: 3,  achievementIds: ['1', '2', '4'] },
    { username: 'Dolf',     points: 4,  achievementIds: ['1', '2', '4', '3'] },
    { username: 'Eline',    points: 5,  achievementIds: ['1', '2', '3'] },
    { username: 'Fjodor',   points: 5,  achievementIds: ['1', '3'] },
    { username: 'Gine',     points: 6,  achievementIds: ['1', '2', '3', '4'] },
    { username: 'Hanne',    points: 7,  achievementIds: ['1', '3', '4'] },
    { username: 'Ine',      points: 8,  achievementIds: ['1', '4', '5'] },
    { username: 'Jonas',    points: 9,  achievementIds: ['1', '4', '5'] },
    { username: 'Karl',     points: 9,  achievementIds: ['1', '4', '5'] },
    { username: 'Lone',     points: 10, achievementIds: ['1', '4', '7'] }
  ])
    .then(() => res.status(200).json('User Collection Populated'))
    .catch((err) => res.status(400).json(err));
});

/**
 * @swagger
 * path:
 *   /populate/achievements:
 *     get:
 *       summary: Populate database with seven (7) achievements with set quantities.
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

router.route('/achievements').get((req, res) => {
  achievementModel.insertMany([
    { id: '1', name: 'Jomfruturen',        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør din første tur.',                             qty: 12},
    { id: '2', name: 'Hele uken lang',     iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur hver dag i én uke.',                   qty: 6},
    { id: '3', name: 'Tre om dagen',       iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør tre turer på én dag.',                        qty: 5},
    { id: '4', name: 'En helgrønn tur',    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur fullstendig i grønn sone.',            qty: 10},           
    { id: '5', name: 'Vaskeekte turgåer',  iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør en tur hver dag i tretti dager.',             qty: 3}, 
    { id: '6', name: 'Rundt ekvator',      iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør turer tilsvarende avstanden rundt ekvator.',  qty: 0},
    { id: '7', name: 'Pol til pol',        iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Circle_-_black_simple.svg', description: 'Fullfør turer tilsvarende avstanden mellom polene.',  qty: 1}
  ])
    .then(() => res.status(200).json('Achievement Collection Populated'))
    .catch((err) => res.status(400).json(err));
});

/**
 * @swagger
 * path:
 *   /populate/clear-all:
 *     get:
 *       summary: Drop all User documents and Achievement documents.
 *       tags: [Populate]
 *       produces:
 *         application/json
 *       responses:
 *         "200":
 *           description: Dropping of documents successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 *         "500":
 *           description: Error message
 *           content:
 *             application/json:
 *               schema: 
 *                 type: string
 */

router.route('/clear-all').get((req, res) => {
  try {
    userModel.collection.drop()
      .then(achievementModel.collection.drop()
        .then(res.status(200).json('User documents and achievement documents successfully dropped.')));
  } catch (err) {
    res.status(500).json('Deletion attempt unsuccessful. An internal server error has occured.');
  }
});

module.exports = router;