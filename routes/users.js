const router = require('express').Router();
const User = require('../models/user.model');

router.route('/').get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json('Error: ' + err));
});

/**
 * @swagger
 * path:
 *   /users/count/:
 *     get:
 *       summary: Get the total count of all user documents.
 *       tags: [Users]
 *       produces:
 *         application/json
 *       responses:
 *         "200":
 *           description: Count successful
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   count:
 *                     type: number
 *         "400":
 *           descrption: Count unsuccessful
 *           content:
 *             application/json:
 *               schema:
 *                 type: string
 */

router.route('/count').get((req, res) => {
  User.countDocuments({})
    .then((count) => res.status(200).json({ result: count }))
    .catch((err) => res.status(400).json(err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json('User added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then((user) => {
      user.username = req.body.username;

      user
        .save()
        .then(() => res.json('User updated.'))
        .catch((err) => res.status(400).json('Error: ' + err));
    })
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
