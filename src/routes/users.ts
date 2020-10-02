const router = require('express').Router();
import { Request, Response } from 'express';
import { User } from '../models/user.model';

router.route('/').get((req: Request, res: Response) => {
  User.find()
    .then((users) => res.json({ users: users }))
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

router.route('/count').get((req: Request, res: Response) => {
  User.countDocuments({})
    .then((count) => res.status(200).json({ result: count }))
    .catch((err) => res.status(400).json(err));
});

router.route('/add').post((req: Request, res: Response) => {
  const username = req.body.username;
  const newUser = new User({ username });

  newUser
    .save()
    .then(() => res.json('User added'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req: Request, res: Response) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').put((req: Request, res: Response) => {
  User.findByIdAndUpdate({ _id: req.params.achievementId }, req.body, { new: true })
    .then(() => res.json('User updated.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req: Request, res: Response) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => res.json('User deleted.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
