const router = require('express').Router();
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user.model';
const CognitoExpress = require('cognito-express');

const cognitoExpress = new CognitoExpress({
  region: 'eu-central-1',
  cognitoUserPoolId: 'eu-central-1_Qt8vhCEWi',
  tokenUse: 'access',
  tokenExpiration: 3600000, // In ms (3600000 => 1 hour)
});

// Routes that don't need authentication

router.route('/').get((req: Request, res: Response) => {
  User.find()
    .then((users) => res.json({ users: users }))
    .catch((err) => res.status(400).json('Error: ' + err));
});

// Authentication middleware

router.use((req: Request, res: Response, next: NextFunction) => {
  let accessTokenFromClient = req.headers.accesstoken;

  if (!accessTokenFromClient)
    return res.status(401).send('Access Token missing from header');

  cognitoExpress.validate(accessTokenFromClient, (err: any, response: any) => {
    if (err) return res.status(401).send(err);

    // Access token authenticated, proceed.
    res.locals.user = response;
    next();
  });
});

// Routes below this uses the authentication middleware

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

router.route('/:id/settings').put((req: Request, res: Response) => {
  User.findByIdAndUpdate({ pushNotification: req.body.pushNotification }, req.body, { new: true })
    .then(() => res.json('User updated.'))
    .catch((err) => res.status(400).json('Error: ' + err));
});

module.exports = router;
