const router = require('express').Router();
import { User } from '../models/user.model';
import { Achievement } from '../models/achievement.model'; 
import { Request, Response } from 'express';

router.route('/')
.get((req: Request, res: Response) => {
  Achievement.find({})
    .lean()
    .then((achievements) => res.status(200).json({achievements: achievements}))
    .catch((err) => res.status(400).json(err));
})
.post((req: Request, res: Response) => {
  try {
    const newAchievement = new Achievement({
      id: req.body.id,
      name: req.body.name,
      iconUrl: req.body.iconUrl,
      description: req.body.description
    });

    newAchievement.save()
      .then((achievement) => res.status(200).json(achievement))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.log(error);
    res.status(500);
  }
});

router.route('/:achievementId')
.delete((req: Request, res: Response) => {
  Achievement.findOneAndDelete({ _id: req.params.achievementId })
    .then(() => res.status(200).json(`Achievement with _id ${req.params.achievementId} successfully deleted.`))
    .catch((err) => res.send(400).json(err));
})
.get((req: Request, res: Response) => {
  Achievement.findById({ _id: req.params.achievementId })
    .then((achievement) => res.status(200).json(achievement))
    .catch((err) => res.status(400).json(err));
})
.patch((req: Request, res: Response) => {
  if (!req.body) res.status(400).json('No request body found.');
  Achievement.findOneAndUpdate({ _id: req.params.achievementId }, req.body, { new: true })
    .then((user) => res.status(200).json(user))
    .catch((err) => res.status(400).json(err));
});

// Kan sikkert fjernes.
router.route('user/:userId').get((req: Request, res: Response) => {
  User.findById(req.params.userId)
    .lean()
    .then((user => {
      Achievement.find({})
        .lean()
        .where('id')
        .in(user.achievementIds)
        .then((achievements) => res.status(200).json(achievements))
        .catch((err) => res.status(400).json(err));
    }))
    .catch((err) => res.status(400).json(err));
});

module.exports = router;