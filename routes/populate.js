
const router = require('express').Router();
const userModel = require('../models/user.model');

router.route('/users').get((req, res) => {
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