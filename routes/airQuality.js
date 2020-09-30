const router = require('express').Router();
const airData = require('../models/airData.model');

const axios = require('axios');
let url = "https://api.nilu.no/aq/utd?areas=trondheim&components=pm10";
   
router.route('/').get((req, res) => {
    airData.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json('Error: ' + err));
  });
  
  router.route('/delete').get((req, res) => {
    airData.deleteMany({zone: "Trondheim"})
        .then(() => res.json('Data deleted'))
        .catch((err) => res.status(400).json('Error: ' + err));
  });

router.route('/add').get((req, res) => {
    axios.get(url)
        .then(response => {
            response.data.forEach(element => {
                const newAirData = new airData(element);
                newAirData.save()
                .then(() => console.log("Added data"))
                .catch((err) => res.status(400).json('Error: ' + err));
                
            });
        })
        .catch((err) => res.status(400).json('Error: ' + err));   
  });







module.exports = router;
