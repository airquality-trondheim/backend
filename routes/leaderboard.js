const router = require('express').Router();
const userModel = require('../models/user.model');

router.route('/').get((req, res) => {
    userModel.find({})
      .select('points')
      .limit(10)
      .sort({points: 'desc'})
      .then((users) => {
          let results = [];
          users.forEach((user, index) => results.push({ranking:index+1, username:user.username}));
          res.status(200).json(results);
        })
      .catch((err) => res.status(400).json('Error: ' + err));
})

router.route('/:id').get((req, res) => {
    userModel.find({})
      .select('points')
      .sort({points: 'desc'})
      .then((users) => {
          let result = {};
          users.forEach(user => { if (req.params.id == user.id) result = user; })
          
          if (result == {}) res.status(404).json(`${req.params.id} not found!`);
          res.status(200).json(result);
        })
      .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/populate').get((req, res) => {

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
            points: 6
        },
        {
            username: "Gine",
            points: 7
        },
        {
            username: "Hanne",
            points: 9
        },
        {
            username: "Ine",
            points: 10
        },
        {
            username: "Jonas",
            points: 11
        }
    ])
      .then(() => {
          console.log("Populate")
          res.status(200).json('DB Populated');
        })
      .catch((err) => res.status(400).json('Error: ' + err));
})

module.exports = router;