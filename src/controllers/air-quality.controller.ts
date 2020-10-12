const router = require('express').Router();
import { Request, Response } from 'express';
import { AirData, IAirData } from '../models/air-quality.model';
import axios from 'axios';

const url = "https://api.nilu.no/aq/utd?areas=trondheim&components=pm10";
   
router.route('/').get((req: Request, res: Response) => {
    axios.get<IAirData[]>(url)
    .then(response => {
        /*
        response.data.forEach(element => {
            const newAirData = new AirData(element);
            newAirData.save()
            .then(() => console.log("Added data"))
            .catch((err) => res.status(400).json('Error: ' + err));
            
        });*/
        res.status(200).json(response.data);
    })
    .catch((err) => res.status(400).json(err));   
    
    /*
    AirData.find()
      .then((data) => res.json(data))
      .catch((err) => res.status(400).json('Error: ' + err));
    */
  });
  

router.route('/add').get((req: Request, res: Response) => {
    axios.get<IAirData[]>(url)
        .then(response => {
            /*
            response.data.forEach(element => {
                const newAirData = new AirData(element);
                newAirData.save()
                .then(() => console.log("Added data"))
                .catch((err) => res.status(400).json('Error: ' + err));
                
            });*/
            res.status(200).json(response.data);
        })
        .catch((err) => res.status(400).json('Error: ' + err));   
  });


module.exports = router;

