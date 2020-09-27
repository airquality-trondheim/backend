const router = require('express').Router();
import userModel from '../models/user.model';
import achievementModel from '../models/achievement.model'; 

router.route('/')
.post((req, res) => {
  try {
    const newAchievement = new achievementModel({
      name: req.body.name,
      iconUrl: req.body.iconUrl,
      description: req.body.description
    });

    newAchievement.save()
      .then(() => res.status(200).json(''))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    
  }
})
.get((req, res) => {
  achievementModel.find({})
    .lean()
    .then((achievements) => res.status(200).json(achievements))
    .catch((err) => res.status(400).json(err));
});

router.route('user/:userId').get((req, res) => {
  userModel.findById(req.params.userId)
    .lean()
    .then((user => {
      achievementModel.find({})
        .lean()
        .where('_id')
        .in(user.achievementIds)
        .then((achievements) => res.status(200).json(achievements))
        .catch((err) => res.status(400).json(err));
    }))
    .catch((err) => res.status(400).json(err));
});

router.route('/:achievementId')
.get()
.patch()
.put()
.delete();