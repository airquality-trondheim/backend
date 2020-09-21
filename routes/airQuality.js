const router = require('express').Router();
const airData = require('../models/airData.model');

const axios = require('axios');
let url = "https://api.nilu.no/aq/utd?areas=trondheim&components=pm10";
    

router.route('/add').get((req, res) => {
    axios.get(url)
        .then(response => {
            response.data.forEach(element => {
                const newAirData = new airData(element);
                //airData.findByIdAndDelete(id='5f6203f6a8a6c12854ea3cd1')
                //console.log('delete',airData.findById('5f6203f6a8a6c12854ea3cd1'))
                console.log(element.id)
                newAirData.save()
                .then(() => console.log(element))
                .catch((err) => res.status(400).json('Error: ' + err));
                
            });
        })    
  });



router.route('/').get((req, res) => {
  airData.find()
    .then((data) => res.json(data))
    .catch((err) => res.status(400).json('Error: ' + err));
});



module.exports = router;
