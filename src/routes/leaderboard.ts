const router = require('express').Router();
import { IUser, User } from '../models/user.model';
import { Request, Response } from 'express';

interface IResult {
  rankings: IUser[];
  last: boolean;
  next?: string;
}

function buildResult(users: Pick<IUser, "_id" | "username" | "points" | "achievementIds">[], limit: number) {
  let result = {} as IResult;

  result.rankings = [];
  users.forEach((user) => result.rankings.push(JSON.parse(JSON.stringify(user))));

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

interface topParams {
  limit: number;
  next?: string;
}

router.route('/top').get(async (req: Request, res: Response) => {
  const limit: number = req.query.limit ? parseInt(req.query.limit as string) : 10;
  
  if (!req.query.next) {
    User.find({})
      .lean()
      .sort({ points: 'desc', _id: 'desc' })
      .limit(limit + 1) // Try to grab one extra user to check if there are more left.
      .then((users) => res.status(200).json(buildResult(users, limit)))
      .catch((err) => res.status(400).json(err));
  
  } else {
    const next = req.query.next as string;
    const splitNext = next.split('_');
    const nextPoints = parseInt(splitNext[0]);
    const nextId = splitNext[1];
    
    User.find({})
      .lean()
      .or([{ points: { $lt: nextPoints }}, { points: nextPoints, _id : { $lt: nextId } }])
      .sort({ points: 'desc', _id: 'desc' })
      .limit(limit + 1) // Try to grab one extra user to check if there are more left.
      .then((users) => res.status(200).json(buildResult(users, limit)))
      .catch((err) => res.status(400).json(err));
  }
});

router.route('/user/:userId').get((req: Request, res: Response) => {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      User.find({})
        .lean()
        .or([{ points: { $gt: user.points }}, { points: user.points, _id: { $gt: user._id }}, { points: user.points, _id: user._id }])
        .sort({points: 'desc', _id: 'desc'})
        .then((users) => {
          let result = {};
           users.forEach((user, index) => { 
              if (req.params.userId == user._id) {
                result = {ranking: index+1, user: user};
              }
          });
        
          if (result == {}) res.status(404).json(`${req.params.userId} not found!`);
          res.status(200).json(result);
        })
        .catch((err) => res.status(400).json(err))
    })
    .catch((err) => res.status(400).json(err));      
});

module.exports = router;